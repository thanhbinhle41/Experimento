import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import StudentData from "../../components/admin/StudentData";
import {
  dataAnalyzingActions,
  dataExperimentSelector,
} from "../../services/dataAnalyzingSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  mqttConnect,
  mqttSub,
  mqttUnSub,
  mqttPublish,
} from "../../../../services/mqtt/mqttUtil";
import {
  mqttAction,
  mqttPayloadSelector,
} from "../../../../services/mqtt/mqttSlice";
import {
  ONLINE,
  RETURN_HISTORY,
  RETURN_TOPIC,
  LIVE_DATA,
} from "../../../../services/mqtt/mqttType";
import { persistor } from "../../../../store/store";
import { useNavigate } from "react-router";
import ModalConfirmDeleteData from "../../components/admin/ModalConfirmDeleteData";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataExperiment = useSelector(dataExperimentSelector);
  const payload = useSelector(mqttPayloadSelector);

  const [clientMqtt, setClientMqtt] = useState(null);
  const [timeOutFuncArr, setTimeOutFuncArr] = useState([]);
  const [chosenStudent, setChosenStudent] = useState([]);
  const [isShowConfirmDelete, setIsShowConfirmDelete] = useState(false);

  const findTimeOutById = (id) => {
    return timeOutFuncArr.find((data) => data.id === id);
  };

  const handleShowResultBtn = () => {
    setChosenStudent(
      dataExperiment.filter((student) => student.isChosen === true)
    );
  };

  const handleRefreshBtn = () => {
    if (clientMqtt) {
      const context = {
        topic: "admin",
        qos: 0,
        payload: {
          type: "get-all-topic",
        },
      };
      mqttPublish(clientMqtt, context);
    }
  };
  const handleDeleteDataBtn = async () => {
    setIsShowConfirmDelete(true);
  };
  useEffect(() => {
    const host = "broker.emqx.io";
    const port = 8083;
    const client = mqttConnect(host, port);
    setClientMqtt(client);
  }, []);

  useEffect(() => {
    setTimeOutFuncArr(
      dataExperiment.map((data) => ({
        id: data.id,
        timeout: setTimeout(() => {
          dispatch(dataAnalyzingActions.setOfflineById(data.id));
        }, 5000),
      }))
    );
  }, [dataExperiment.length]);

  useEffect(() => {
    if (clientMqtt) {
      clientMqtt.on("connect", () => {
        dispatch(mqttAction.setConnectionStatus("Connected"));
      });
      clientMqtt.on("error", (err) => {
        console.error("Connection error: ", err);
        clientMqtt.end();
      });
      clientMqtt.on("reconnect", () => {
        dispatch(mqttAction.setConnectionStatus("Reconnecting"));
      });
      clientMqtt.on("message", (topic, message) => {
        const payload = { topic, message: JSON.parse(message) };
        dispatch(mqttAction.setMqttPayload(payload));
      });
    }
  }, [clientMqtt]);

  useEffect(() => {
    if (clientMqtt) {
      const subscription = {
        topic: "admin",
        qos: 0,
      };
      mqttSub(clientMqtt, subscription, dispatch);
      const context = {
        topic: "admin",
        qos: 0,
        payload: {
          type: "get-all-topic",
        },
      };
      mqttPublish(clientMqtt, context);
    }
  }, [clientMqtt]);

  useEffect(() => {
    if (payload) {
      console.log(payload);
      const message = payload.message;
      if (message.type) {
        switch (message.type) {
          case ONLINE: {
            const id = message.id;
            const foundFunc = findTimeOutById(id);
            if (foundFunc === undefined) return;
            dispatch(dataAnalyzingActions.setOnlineById(id));
            if (foundFunc.timeout) {
              clearTimeout(foundFunc.timeout);
            }
            foundFunc.timeout = setTimeout(() => {
              dispatch(dataAnalyzingActions.setOfflineById(id));
            }, 5000);
            break;
          }
          case RETURN_TOPIC: {
            const topicName = message.topicName;
            const subscription = {
              topic: topicName,
              qos: 0,
            };
            if (clientMqtt) {
              console.log(subscription);
              mqttSub(clientMqtt, subscription, dispatch);
              const context = {
                topic: topicName,
                qos: 0,
                payload: {
                  type: "get-history",
                },
              };
              console.log(context);
              mqttPublish(clientMqtt, context);
            }
            break;
          }
          case RETURN_HISTORY: {
            console.log("Halo");
            const id = message.id;
            const dataHistory = message.data;

            dispatch(dataAnalyzingActions.addData({ id, dataHistory }));
            break;
          }
          case LIVE_DATA: {
            const ID = message.id;
            const data = message.data;
            dispatch(
              dataAnalyzingActions.addVoltageByID({
                ID,
                data,
              })
            );
          }

          default:
            break;
        }
      }
    }
  }, [payload]);

  return (
    <>
      <ModalConfirmDeleteData
        isShowConfirmDelete={isShowConfirmDelete}
        setIsShowConfirmDelete={setIsShowConfirmDelete}
      />
      <Card
        actions={[
          <Button type="primary" onClick={handleShowResultBtn}>
            Xem kết quả
          </Button>,
          <Button type="primary" onClick={handleRefreshBtn}>
            Refresh
          </Button>,
          <Button type="danger" onClick={handleDeleteDataBtn}>
            Xóa data
          </Button>,
        ]}
        title="Danh sách máy"
      >
        <AdminTable />
      </Card>
      <Card title="Thông tin chi tiết">
        {chosenStudent.map((student) => (
          <StudentData
            key={student.id}
            id={student.id}
            dataExperiment={dataExperiment}
            chosenStudent={chosenStudent}
            setChosenStudent={setChosenStudent}
          />
        ))}
      </Card>
    </>
  );
};

export default AdminDashboardPage;
