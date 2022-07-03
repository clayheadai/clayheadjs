import { io } from "socket.io-client";

export default class ClayheadClient {
    #socket;
    sessionId;

    constructor(url, apiKey) {
        // Connect to server
        this.#socket = io(url, { query: {key: apiKey} });

        // Server ID is assigned when connected
        this.#socket.on("connect", () => {
            this.sessionId = this.#socket.id;
        });

        // Handle connection error
        this.#socket.on("connect_error", (err) => {
            console.error(`Connection error: ${err}`);
          });

        // Register actions
        this.#socket.on("action/speech", (content) => {
            console.log(`Saying: ${content}`);
        });
    }

    // Perception methods
    perceiveText(text) {
        this.#socket.emit("perception/visual/text", text);
    }
};