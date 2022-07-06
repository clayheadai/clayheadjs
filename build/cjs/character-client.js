"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
class CharacterClient {
    constructor(url, characterId) {
        this.characterId = characterId;
        // Connect to server
        this._socket = (0, socket_io_client_1.io)(url);
        // Server ID is assigned when connected
        this._socket.on("connect", () => {
            this.sessionId = this._socket.id;
            // Register character with server
            this._socket.emit("register/character", characterId);
        });
        // Handle connection error
        this._socket.on("connect_error", (err) => {
            console.error(`Connection error: ${err}`);
        });
    }
    perceiveLanguage(text) {
        this._socket.on("perception/language", text);
    }
}
exports.default = CharacterClient;
;
