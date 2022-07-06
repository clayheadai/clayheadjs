import { io, Socket } from "socket.io-client";


export default class CharacterClient {
    #socket: Socket;
    sessionId: string;
    characterId: string;

    constructor(url: string, characterId: string) {

        this.characterId = characterId;

        // Connect to server
        this.#socket = io(url);

        // Server ID is assigned when connected
        this.#socket.on("connect", () => {
            this.sessionId = this.#socket.id;
            // Register character with server
            this.#socket.emit("register/character", characterId);
        });

        // Handle connection error
        this.#socket.on("connect_error", (err) => {
            console.error(`Connection error: ${err}`);
          });
    }

    perceiveLanguage(text) {
        this.#socket.on("perception/language", text);
    }
};

