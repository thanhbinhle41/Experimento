import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import StudentData from "../../components/admin/StudentData";
import {
  dataAnalyzingActions,
  dataExperimentSelector,
} from "../../services/dataAnalyzingSlice";
import { useDispatch, useSelector } from "react-redux";
import { mqttConnect, mqttSub } from "../../../../services/mqtt/mqttUtil";
import {
  mqttAction,
  mqttPayloadSelector,
} from "../../../../services/mqtt/mqttSlice";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();

  const dataExperiment = useSelector(dataExperimentSelector);
  const payload = useSelector(mqttPayloadSelector);

  const [clientMqtt, setClientMqtt] = useState(null);
  const [timeOutFuncArr, setTimeOutFuncArr] = useState([]);

  const findTimeOutById = (id) => {
    return timeOutFuncArr.find((data) => data.id === id);
  };

  useEffect(() => {
    const host = "broker.mqttdashboard.com";
    const port = 8000;
    const client = mqttConnect(host, port);
    setClientMqtt(client);
    // dispatch(mqttAction.setClient(client));
  }, []);

  useEffect(() => {
    setTimeOutFuncArr(
      dataExperiment.map((data) => ({
        id: data.id,
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
    }
  }, [clientMqtt]);

  useEffect(() => {
    if (payload) {
      console.log("hi");
      const message = payload.message;
      if (message.type && message.type === "online") {
        const id = message.id;
        const foundFunc = findTimeOutById(id);
        dispatch(dataAnalyzingActions.setOnlineById(id));
        if (foundFunc.timeout) {
          clearTimeout(foundFunc.timeout);
        }
        foundFunc.timeout = setTimeout(() => {
          dispatch(dataAnalyzingActions.setOfflineById(id));
        }, 5000);
      }
    }
  }, [payload]);

  return (
    <>
      <Card title="Danh sách máy">
        <AdminTable />
      </Card>
      <Card title="Thông tin chi tiết">
        {dataExperiment.map((student) => (
          <div key={student.id}>
            <StudentData id={student.id} dataExperiment={dataExperiment} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary">Xuất file</Button>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
};

export default AdminDashboardPage;
