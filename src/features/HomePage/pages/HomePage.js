import { React, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Connector from "../components/Connector/Connector";
import Publisher from "../components/Publisher/Publisher";
import { mqttAction } from "../../../services/mqtt/mqttSlice";
import styles from "./HomePage.module.scss";
import { TableData } from "../components/TableData/TableData";
import { WEB_SOCKET_TYPE } from "../../../services/websocket/webSocketType";
import { webSocketPublish, webSocketSub, webSocketUnSub } from "../../../utils/webSocket";

const HomePage = () => {
  const dispatch = useDispatch();

  // REF
  const ws = useRef(null);

  // STATE
  const [client, setClient] = useState(null);

  const mqttConnect = (host, mqttOption) => {

    // dispatch(mqttAction.setConnectionStatus("Connecting"));
  };

  const mqttDisconnect = () => {
    if (client) {
      client.close();
    }
  }

  const mqttPublish = (topic, payload) => {
    if (client) {
      webSocketPublish(client, topic, payload);
    }
  }

  const mqttSub = (topic) => {
    if (client) {
      webSocketSub(client, topic);
      dispatch(mqttAction.setConnectionStatus("Connected"));
      dispatch(mqttAction.setIsSubed(true));
    }
  };

  const mqttUnSub = (topic) => {
    if (client) {
      webSocketUnSub(client, topic);
      dispatch(mqttAction.setIsSubed(false));
    }
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:4444");
    ws.current.onopen = () => {
      console.log("ws opened");
    };
    ws.current.onclose = () => {
      console.log("ws closed")
      dispatch(mqttAction.setConnectionStatus("Connect"));
    };
    ws.current.onmessage = (message) => {
      console.log(JSON.parse(message.data));
      dispatch(mqttAction.setMqttPayload(JSON.parse(message.data)));
    };

    const wsCurrent = ws.current;
    setClient(wsCurrent);

    return () => {
      wsCurrent.close();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.body_item}>
          <Connector mqttConnect={mqttConnect} mqttDisconnect={mqttDisconnect} mqttSub={mqttSub} mqttUnSub={mqttUnSub} mqttPublish={mqttPublish}/>
        </div>
        <div className={styles.body_item}>
          <Publisher mqttPublish={mqttPublish}/>
        </div>
        <div className={styles.body_item}>
          <TableData mqttPublish={mqttPublish}/>
        </div>
        {/* <div className={styles.body_item}>
          <ChartData isDrawChart={isDrawChart} setIsDrawChart={setIsDrawChart}/>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
