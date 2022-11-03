import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartData } from "../../components/HomePage/ChartData/ChartData";
import Connector from "../../components/HomePage/Connector/Connector";
import Publisher from "../../components/HomePage/Publisher/Publisher";
import { TableData } from "../../components/HomePage/TableData/TableData";
import { currentIDSelector } from "../../features/auth/services/authSlice";
import { mqttAction, mqttPayloadSelector } from "../../services/mqtt/mqttSlice";
import styles from "./HomePage.module.scss";
import mqtt from "../../../node_modules/mqtt/dist/mqtt";

const HomePage = () => {
  const dispatch = useDispatch();

  // STATE
  const [client, setClient] = useState(null);
  const [isDrawChart, setIsDrawChart] = useState(false);

  // SELECTOR
  const payload = useSelector(mqttPayloadSelector);
  const currentID = useSelector(currentIDSelector);

  const mqttConnect = (host, mqttOption) => {
    dispatch(mqttAction.setConnectionStatus("Connecting"));
    setClient(mqtt.connect(host, mqttOption));
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        dispatch(mqttAction.setConnectionStatus("Disconnected"));
      });
    }
  }

  const mqttPublish = (context) => {
    console.log(client);
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  }

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        dispatch(mqttAction.setIsSubed(true));
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        dispatch(mqttAction.setIsSubed(false));
      });
    }
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        dispatch(mqttAction.setConnectionStatus("Connected"));
        console.log("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        dispatch(mqttAction.setConnectionStatus("Reconnecting"));
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: JSON.parse(message) };
        dispatch(mqttAction.setMqttPayload(payload));
      });
    }
  }, [client]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.body_item}>
          <Connector mqttConnect={mqttConnect} mqttDisconnect={mqttDisconnect} mqttSub={mqttSub} mqttUnSub={mqttUnSub}/>
        </div>
        <div className={styles.body_item}>
          <Publisher mqttPublish={mqttPublish}/>
        </div>
        <div className={styles.body_item}>
          <TableData setIsDrawChart={setIsDrawChart}/>
        </div>
        <div className={styles.body_item}>
          <ChartData isDrawChart={isDrawChart} setIsDrawChart={setIsDrawChart}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
