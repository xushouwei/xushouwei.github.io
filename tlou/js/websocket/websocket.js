function connectSocket() {
  ws = new WebSocket("ws://echo.websocket.org/echo");
  // Listen for the connection open event then call the sendMessage function
  ws.onopen = function(e) {
    console.log("Connected");
      sendMessage("这是发送的数据")
  }
  // Listen for the close connection event
  ws.onclose = function(e) {
    console.log("Disconnected: " + e.reason);
  }
  // Listen for connection errors
  ws.onerror = function(e) {
    console.log("Error ");
  }
  // Listen for new messages arriving at the client
  ws.onmessage = function(e) {
    console.log("Message received: " + e.data);
  // Close the socket once one message has arrived.
     ws.close();
  }
}