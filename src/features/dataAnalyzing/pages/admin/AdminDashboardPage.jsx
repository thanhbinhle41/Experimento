import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminDashboardPage.scss";

import {
  mqttAction,
  mqttPayloadSelector,
} from "../../../../services/mqtt/mqttSlice";
import {
  GET_HISITORY,
  LIVE_DATA,
  ONLINE,
  RETURN_HISTORY,
  RETURN_TOPIC,
} from "../../../../services/mqtt/mqttType";
import {
  mqttConnect,
  mqttDisconnect,
  mqttPublish,
  mqttSub,
} from "../../../../services/mqtt/mqttUtil";
import AdminTable from "../../components/admin/AdminTable";
import ModalConfirmDeleteData from "../../components/admin/ModalConfirmDeleteData";
import StudentData from "../../components/admin/StudentData";
import {
  dataAnalyzingActions,
  dataExperimentSelector,
} from "../../services/dataAnalyzingSlice";
import {
  authSliceActions,
  usernameAdminSelector,
} from "../../../auth/services/authSlice";
import { dataTypeConst } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataExperiment = useSelector(dataExperimentSelector);
  const payload = useSelector(mqttPayloadSelector);
  const userAdmin = useSelector(usernameAdminSelector);

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

  const getAllHistory = (topicName) => {
    let context = {
      topic: topicName,
      qos: 0,
      payload: {
        type: GET_HISITORY,
        message: dataTypeConst.AV,
      },
    };
    mqttPublish(clientMqtt, context);
    context = {
      topic: topicName,
      qos: 0,
      payload: {
        type: GET_HISITORY,
        message: dataTypeConst.CV,
      },
    };
    mqttPublish(clientMqtt, context);
    context = {
      topic: topicName,
      qos: 0,
      payload: {
        type: GET_HISITORY,
        message: dataTypeConst.TV,
      },
    };
    mqttPublish(clientMqtt, context);
  };

  useEffect(() => {
    const host = "broker.emqx.io";
    const port = 8084;
    const client = mqttConnect(host, port);
    setClientMqtt(client);

    return () => {
      mqttDisconnect(client, dispatch);
    };
  }, [dispatch]);

  useEffect(() => {
    setTimeOutFuncArr(
      dataExperiment.map((data) => ({
        id: data.id,
        timeout: setTimeout(() => {
          dispatch(dataAnalyzingActions.setOfflineById(data.id));
        }, 5000),
      }))
    );
    // eslint-disable-next-line
  }, [dataExperiment.length, dispatch]);

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
    // eslint-disable-next-line
  }, [clientMqtt, dispatch]);

  useEffect(() => {
    if (clientMqtt) {
      const subscription = {
        topic: userAdmin,
        qos: 0,
      };
      mqttSub(clientMqtt, subscription, dispatch);
      const context = {
        topic: userAdmin,
        qos: 0,
        payload: {
          type: "get-all-topic",
        },
      };
      mqttPublish(clientMqtt, context);
    }
    // eslint-disable-next-line
  }, [clientMqtt, dispatch]);

  useEffect(() => {
    if (payload) {
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
              mqttSub(clientMqtt, subscription, dispatch);
              getAllHistory(topicName);
            }
            break;
          }
          case RETURN_HISTORY: {
            const id = message.id;
            const dataHistory = message.data;
            const dataType = message["data-type"];

            dispatch(
              dataAnalyzingActions.addData({ id, dataHistory, dataType })
            );
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
            break;
          }

          default:
            break;
        }
      }
    }
    // eslint-disable-next-line
  }, [payload, clientMqtt, dispatch]);

  const onLogout = () => {
    dispatch(authSliceActions.setIsAdmin(false));
    dispatch(authSliceActions.setUsernameAdmin(""));

    navigate("/admin/login");
  };

  const renderHeader = () => {
    return (
      <div className="header_admin_page">
        <a href="#default" className="logo">
          Danh sách máy
        </a>
        <div className="user_info">
          <div>
            Mã phòng:
            <span className="user_name">{userAdmin}</span>
          </div>
          <Button type="primary" danger onClick={onLogout}>
            Đăng xuất
          </Button>
        </div>
      </div>
    );
  };

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
        title={renderHeader()}
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
