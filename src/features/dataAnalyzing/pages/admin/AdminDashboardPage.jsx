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
} from "../../../../services/mqtt/mqttType";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();

  const dataExperiment = useSelector(dataExperimentSelector);
  const payload = useSelector(mqttPayloadSelector);

  const [clientMqtt, setClientMqtt] = useState(null);
  const [timeOutFuncArr, setTimeOutFuncArr] = useState([]);
  const [isShowStudentData, setIsShowStudentData] = useState([]);

  const findTimeOutById = (id) => {
    return timeOutFuncArr.find((data) => data.id === id);
  };

  const findIsShowById = (id) => {
    return (
      isShowStudentData.length !== 0 &&
      isShowStudentData.find((data) => data.id === id)?.isShowData
    );
  };

  useEffect(() => {
    const host = "broker.mqttdashboard.com";
    const port = 8000;
    const client = mqttConnect(host, port);
    setClientMqtt(client);
  }, []);

  useEffect(() => {
    setTimeOutFuncArr(
      dataExperiment.map((data) => ({
        id: data.id,
      }))
    );
    setIsShowStudentData(
      dataExperiment.map((data) => ({
        id: data.id,
        isShowData: false,
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
      console.log("hi");
      const message = payload.message;
      if (message.type) {
        switch (message.type) {
          case ONLINE: {
            const id = message.id;
            const foundFunc = findTimeOutById(id);
            if (foundFunc === undefined) 
              return;
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

          default:
            break;
        }
      }
    }
  }, [payload]);

  return (
    <>
      <Card title="Danh sách máy">
        <AdminTable
          isShowStudentData={isShowStudentData}
          setIsShowStudentData={setIsShowStudentData}
        />
      </Card>
      <Card title="Thông tin chi tiết">
        {dataExperiment.map(
          (student) =>
            findIsShowById(student.id) && (
              <Card title={`Thông tin của ${student.id}`} key={student.id}>
                <StudentData id={student.id} dataExperiment={dataExperiment} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button type="primary">Xuất file</Button>
                </div>
              </Card>
            )
        )}
      </Card>
    </>
  );
};

export default AdminDashboardPage;
