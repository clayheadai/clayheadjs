import { io, Socket } from "socket.io-client";
import { TextPercept, InanimatePercept, AnimatePercept } from "./percepts.js";
import { ClientOptions } from "./options.js";

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

  /** Create the character on the server and store the server-assigned uuid. */
  initialize() {
    this._socket.emit("create", this.characterKey, (response) => {
      this.id = response.characterId;
    });
  }

  /** VISUAL - Send perception of text to the server
   * @param percept Object containing perceptual data
   */
  seeText(percept: TextPercept) {
    this._socket.emit("perception/sight/text", this.id, percept);
  }

  /** Register a function to be called whenever a specific action arrives from the server.
   * @param action name of the action
   * @param callback function to call when action data is recieved
   */
  registerActionHook(action: string, callback: (input: any) => void) {
    this._socket.on(`action/${action}`, (characterId: string, data: any) => {
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
  private _socket: Socket;
  private _latencyCheckInterval = 5000;

  constructor(url: string, options?: ClientOptions) {
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

  controller(characterKey: string): CharacterController {
    return new CharacterController(this._socket, characterKey);
  }
}

export { ClayheadClient, CharacterController };
