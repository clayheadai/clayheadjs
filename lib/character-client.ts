import { io, Socket } from "socket.io-client";


export default class CharacterClient {
    private _socket: Socket;
    public sessionId: string;
    public characterId: string;

    constructor(url: string, characterId: string) {

        this.characterId = characterId;

        // Connect to server
        this._socket = io(url);

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
};

