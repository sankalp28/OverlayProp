import ReconnectingWebSocket from 'reconnecting-websocket';
import UriConstant from '@/constants/uri.constants'
export const WebSocket = {
  initWebsocketClient,
  sendMessage,
  close,
  webSocketEvents,
};

const webSocket = {
    client: null,
    joined: false,
    webSocketTimer:0,
}

function initWebsocketClient(sceneId,callback) {
    // console.log("::::::::::::::::::::::INIT WEBSOCKET CONNECTION:::::::::::::::::");
    webSocket.client = new ReconnectingWebSocket(UriConstant.socketUrl+"?sceneid="+sceneId+"&preview=true");
    webSocket.client.debug = true;
    webSocket.client.timeoutInterval = 500;
    webSocketEvents(callback);
}

function webSocketEvents(callback) {
    webSocket.client.onopen = function () {
        // console.log("::::::::::::::::::::::WEBSOCKET CONNECTION OPENED:::::::::::::::::");
        callback('ON_OPEN');
    };

    webSocket.client.onmessage = function (evt) {
        var received_msg = evt.data;
        console.log("::::::::::::::::::::::RECEIVING MESSAGE In Properties:::::::::::::::::");
        callback('ON_MESSAGE',JSON.parse(received_msg));
        keepAliveWebsocketConnection();
    };

    webSocket.client.onclose = function () {
      // console.log("::::::::::::::::::::::WEBSOCKET CONNECTION CLOSED:::::::::::::::::");
      callback('ON_CLOSE');
    };
}

function sendMessage(msg){
    const stingifyMsg = JSON.stringify(msg)
    console.log("::::::::::::::::::::::SENDING Message from Properties:::::::::::::::::",msg);
    webSocket.client.send(stingifyMsg);
}

function close(){
  webSocket.client.close();
}

function keepAliveWebsocketConnection() {
  clearTimeout(webSocket.webSocketTimer);
  webSocket.webSocketTimer = setTimeout(() => {
    sendMessage({"action": "HeartBeat"});
  }, 4.5 * 60 * 1000);
}
