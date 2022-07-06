import { io } from "socket.io-client";


class MonitorClient {
    socket;
    sessionId;
    cy;

    constructor(url, apiKey) {

        // Connect to server
        this.socket = io(url, { query: {key: apiKey} });

        // Server ID is assigned when connected
        this.socket.on("connect", () => {
            this.sessionId = this.socket.id;
        });

        // Handle connection error
        this.socket.on("connect_error", (err) => {
            console.error(`Connection error: ${err}`);
          });
    }

    attach(sessionId) {
        this.socket.emit("register/monitor", sessionId);
    }

    // TODO - add detach() to client and server
};

