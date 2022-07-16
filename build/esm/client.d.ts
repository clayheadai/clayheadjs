import { Socket } from "socket.io-client";
import { TextPercept } from "./percepts.js";
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
    /** Create the character on the server and store the server-assigned uuid.
     *
     * Register listeners for action events directed to this character.
    */
    initialize(): void;
    /** Send perception of text to the server
     * @param percept Object containing perceptual data
    */
    seeText(percept: TextPercept): void;
    /** Send perception of an inanimate object to the server
     * @param percept Object containing perceptual data
    */
    seeInanimate(percept: string): void;
    /** Send perception of an animate entity to the server
    * @param percept Object containing perceptual data
   */
    seeAnimate(percept: string): void;
}
/** Main client class which maintains a connection with the realtime server.
 * @param url A valid URL connection string.
*/
declare class ClayheadClient {
    private _socket;
    constructor(url: string);
    character(characterKey: string): CharacterController;
}
export { ClayheadClient, CharacterController };
