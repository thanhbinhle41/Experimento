import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { WEB_SOCKET_TYPE } from "../services/websocket/webSocketType";

function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export const webSocketSub = (ws, topic) => {
  const subscribeInfo = {
    clientId: Math.floor(Math.random() * 100),
    topic: topic,
    type: WEB_SOCKET_TYPE.SUBSCRIBE,
    payload: {},
  };
  console.log(subscribeInfo);
  ws.send(str2ab(JSON.stringify(subscribeInfo)));
};

export const webSocketUnSub = (ws, topic) => {
  const subscribeInfo = {
    clientId: Number(topic.substr(topic.length - 3)),
    topic: topic,
    type: WEB_SOCKET_TYPE.UNSUBSCRIBE,
    payload: {},
  };
  ws.send(str2ab(JSON.stringify(subscribeInfo)));
};

export const webSocketPublish = (ws, topic, payload) => {
  let newPayLoad = payload;
  newPayLoad.topic = topic;
  const publishInfo = {
    clientId: Math.floor(Math.random() * 100),
    topic: topic,
    type: WEB_SOCKET_TYPE.PUBLISH,
    payload: newPayLoad,
  };
  ws.send(str2ab(JSON.stringify(publishInfo)));
};
