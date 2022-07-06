var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CharacterClient_socket;
import { io } from "socket.io-client";
export default class CharacterClient {
    constructor(url, characterId) {
        _CharacterClient_socket.set(this, void 0);
        this.characterId = characterId;
        // Connect to server
        __classPrivateFieldSet(this, _CharacterClient_socket, io(url), "f");
        // Server ID is assigned when connected
        __classPrivateFieldGet(this, _CharacterClient_socket, "f").on("connect", () => {
            this.sessionId = __classPrivateFieldGet(this, _CharacterClient_socket, "f").id;
            // Register character with server
            __classPrivateFieldGet(this, _CharacterClient_socket, "f").emit("register/character", characterId);
        });
        // Handle connection error
        __classPrivateFieldGet(this, _CharacterClient_socket, "f").on("connect_error", (err) => {
            console.error(`Connection error: ${err}`);
        });
    }
    perceiveLanguage(text) {
        __classPrivateFieldGet(this, _CharacterClient_socket, "f").on("perception/language", text);
    }
}
_CharacterClient_socket = new WeakMap();
;
