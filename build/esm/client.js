import { io } from "socket.io-client";
/** Manages perception and action transfer between a single character and the realtime server.
 * @param socket Reference to a client's socket connection
 * @param characterKey An identifier for either a character or character group
 */
class CharacterController {
    constructor(socket, characterKey) {
        this._socket = socket;
        this.characterKey = characterKey;
        this.initialize();
    }
    /** Create the character on the server and store the server-assigned uuid. */
    initialize() {
        this._socket.emit("create", this.characterKey, (response) => {
            this.id = response.characterId;
        });
    }
    /** VISUAL - Send perception of text to the server
     * @param percept Object containing perceptual data
     */
    seeText(percept) {
        this._socket.emit("seeText", this.id, percept);
    }
    /** VISUAL - Send perception of an inanimate object to the server
     * @param percept Object containing perceptual data
     */
    seeInanimate(percept) {
        this._socket.emit("seeInanimate", this.id, percept);
    }
    /** VISUAL - Send perception of an animate entity to the server
     * @param percept Object containing perceptual data
     */
    seeAnimate(percept) {
        this._socket.emit("seeAnimate", this.id, percept);
    }
    /** Register a function to be called whenever a specific action arrives from the server.
     * @param action name of the action
     * @param callback function to call when action data is recieved
     */
    addActionListener(action, callback) {
        this._socket.on(action, (characterId, data) => {
            if (characterId === this.id) {
                callback(data);
            }
        });
    }
}
/** Main client class which maintains a connection with the realtime server.
 * @param url A valid URL connection string.
 */
class ClayheadClient {
    constructor(url, options) {
        this._latencyCheckInterval = 5000;
        this._socket = io(url);
        this._socket.on("connect", () => {
            console.log(`Connected as session: ${this._socket.id}`);
        });
        this._socket.on("connect_error", (err) => {
            console.error(`Connection error: ${err}`);
        });
        setInterval(() => {
            const start = Date.now();
            this._socket.emit("ping", () => {
                const duration = Date.now() - start;
                console.log(`Latency: ${duration}`);
            });
        }, this._latencyCheckInterval);
    }
    controller(characterKey) {
        return new CharacterController(this._socket, characterKey);
    }
}
export { ClayheadClient, CharacterController };
