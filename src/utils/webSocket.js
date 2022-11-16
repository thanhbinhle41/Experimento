import { WEB_SOCKET_TYPE } from "../services/websocket/webSocketType";




export const webSocketSub = (ws, topic) => {
  const subscribeInfo = {
    clientId: Number(topic.substr(topic.length - 3)),
    topic: topic,
    type: WEB_SOCKET_TYPE.SUBSCRIBE,
    payload: {},
  }; 
  ws.send(JSON.stringify(subscribeInfo));
  
};

export const webSocketUnSub = (ws, topic) => {
  const subscribeInfo = {
    clientId: Number(topic.substr(topic.length - 3)),
    topic: topic,
    type: WEB_SOCKET_TYPE.UNSUBSCRIBE,
    payload: {},
  }; 
  ws.send(JSON.stringify(subscribeInfo));
};

export const webSocketPublish = (ws, topic, payload) => {
  const publishInfo = {
    clientId: Number(topic.substr(topic.length - 3)),
    topic: topic,
    type: WEB_SOCKET_TYPE.PUBLISH,
    payload: payload
  };
  ws.send(JSON.stringify(publishInfo));
}