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
  let newPayLoad = payload;
  newPayLoad.topic = topic;
  const publishInfo = {
    clientId: Number(topic.substr(topic.length - 3)),
    topic: topic,
    type: WEB_SOCKET_TYPE.PUBLISH,
    payload: newPayLoad
  };
  ws.send(JSON.stringify(publishInfo));
}