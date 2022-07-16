"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = exports.ClayheadClient = void 0;
const socket_io_client_1 = require("socket.io-client");
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
    /** Create the character on the server and store the server-assigned uuid.
     *
     * Register listeners for action events directed to this character.
    */
    initialize() {
        this._socket.emit("create", this.characterKey, (response) => {
            this.id = response.characterId;
        });
        // Listen to action events directed to this character
        this._socket.on("say", (characterId, action) => {
            if (characterId === this.id) {
                console.log(action.text);
            }
        });
    }
    /** Send perception of text to the server
     * @param percept Object containing perceptual data
    */
    seeText(percept) {
        this._socket.emit("see/text", this.id, percept);
    }
    /** Send perception of an inanimate object to the server
     * @param percept Object containing perceptual data
    */
    seeInanimate(percept) {
        this._socket.emit("see/inanimate", this.id, percept);
    }
    /** Send perception of an animate entity to the server
    * @param percept Object containing perceptual data
   */
    seeAnimate(percept) {
        this._socket.emit("see/animate", this.id, percept);
    }
}
exports.CharacterController = CharacterController;
/** Main client class which maintains a connection with the realtime server.
 * @param url A valid URL connection string.
*/
class ClayheadClient {
    constructor(url) {
        // Connect to server
        this._socket = (0, socket_io_client_1.io)(url);
        this._socket.on("connect", () => {
            console.log(`Connected as session: ${this._socket.id}`);
        });
        // Handle connection error
        this._socket.on("connect_error", (err) => {
            console.error(`Connection error: ${err}`);
        });
    }
    character(characterKey) {
        return new CharacterController(this._socket, characterKey);
    }
}
exports.ClayheadClient = ClayheadClient;
;
