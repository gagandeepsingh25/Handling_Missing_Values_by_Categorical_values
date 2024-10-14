(function() {
    var ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
    var ws_host = window.location.host;
    var ws_path = ws_scheme + '://' + ws_host + "/ws/stream/";

    var socket = new WebSocket(ws_path);

    socket.onopen = function() {
        console.log("WebSocket connection established.");
    };

    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        console.log("Received:", data);
        // Handle incoming streaming data
    };

    socket.onclose = function(event) {
        console.log("WebSocket connection closed.");
    };

    socket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };
})();
