export default class CharacterClient {
    private _socket;
    sessionId: string;
    characterId: string;
    constructor(url: string, characterId: string);
    perceiveLanguage(text: any): void;
}
