import { io, Socket } from "socket.io-client";
import { TextPercept } from "./percepts.js";


/** Manages perception and action transfer between a single character and the realtime server.
 * @param socket Reference to a client's socket connection
 * @param characterKey An identifier for either a character or character group
*/
class CharacterController {
    private _socket: Socket;
    /** UUID assigned to this character by the server */
    public id: string;
    public characterKey: string;

    constructor(socket: Socket, characterKey: string) {
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
    seeText(percept: TextPercept) {
        this._socket.emit("see/text", this.id, percept);
    }

    /** Send perception of an inanimate object to the server
     * @param percept Object containing perceptual data
    */
     seeInanimate(percept: string) {
        this._socket.emit("see/inanimate", this.id, percept);
    }

     /** Send perception of an animate entity to the server
     * @param percept Object containing perceptual data
    */
      seeAnimate(percept: string) {
        this._socket.emit("see/animate", this.id, percept);
    }
    
}

/** Main client class which maintains a connection with the realtime server. 
 * @param url A valid URL connection string.
*/
class ClayheadClient {
    private _socket: Socket;

    constructor(url: string) {
        // Connect to server
        this._socket = io(url);
        this._socket.on("connect", () => {
            console.log(`Connected as session: ${this._socket.id}`);
        });

        // Handle connection error
        this._socket.on("connect_error", (err) => {
            console.error(`Connection error: ${err}`);
        });
    }

    character(characterKey: string): CharacterController {
        return new CharacterController(this._socket, characterKey);
    }

};

export {
    ClayheadClient,
    CharacterController
};