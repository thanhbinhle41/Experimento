// import mqtt from "../../../node_modules/mqtt/dist/mqtt";
import mqtt from "mqtt/dist/mqtt";
import { mqttAction } from "./mqttSlice";

export const mqttConnect = (host, port, clientId = "admin") => {
  const url = `ws://${host}:${port}/mqtt`;
  const options = {
    clientId: clientId,
    // keepalive: 30,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    // reconnectPeriod: 1000,
    // connectTimeout: 30 * 1000,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: false,
  };

  const client = mqtt.connect(url);
  return client;
};

export const mqttDisconnect = (client, dispatch) => {
  if (client) {
    client.end(() => {
      dispatch(mqttAction.setConnectionStatus("Disconnected"));
    });
  }
};

export const mqttPublish = (client, context) => {
  // console.log(client);
  if (client) {
    const { topic, qos, payload } = context;
    client.publish(topic, JSON.stringify(payload), { qos }, (error) => {
      if (error) {
        console.log("Publish error: ", error);
      }
    });
  }
};

export const mqttSub = (client, subscription, dispatch) => {
  if (client) {
    const { topic, qos } = subscription;
    client.subscribe(topic, { qos }, (error) => {
      if (error) {
        console.log("Subscribe to topics error", error);
        return;
      }
      console.log("Topic subscribed: " + topic);
      dispatch(mqttAction.setIsSubed(true));
    });
  }
};

export const mqttUnSub = (client, subscription, dispatch) => {
  if (client) {
    const { topic } = subscription;
    client.unsubscribe(topic, (error) => {
      if (error) {
        console.log("Unsubscribe error", error);
        return;
      }
      dispatch(mqttAction.setIsSubed(false));
    });
  }
};
