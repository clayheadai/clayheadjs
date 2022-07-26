import { Socket } from "socket.io-client";
import { TextPercept } from "./percepts.js";
import { ClientOptions } from "./options.js";
/** Manages perception and action transfer between a single character and the realtime server.
 * @param socket Reference to a client's socket connection
 * @param characterKey An identifier for either a character or character group
 */
declare class CharacterController {
    private _socket;
    /** UUID assigned to this character by the server */
    id: string;
    characterKey: string;
    constructor(socket: Socket, characterKey: string);
    /** Create the character on the server and store the server-assigned uuid. */
    initialize(): void;
    /** VISUAL - Send perception of text to the server
     * @param percept Object containing perceptual data
     */
    seeText(percept: TextPercept): void;
    /** Register a function to be called whenever a specific action arrives from the server.
     * @param action name of the action
     * @param callback function to call when action data is recieved
     */
    registerActionHook(action: string, callback: (input: any) => void): void;
}
/** Main client class which maintains a connection with the realtime server.
 * @param url A valid URL connection string.
 */
declare class ClayheadClient {
    private _socket;
    private _latencyCheckInterval;
    constructor(url: string, options?: ClientOptions);
    controller(characterKey: string): CharacterController;
}
export { ClayheadClient, CharacterController };
