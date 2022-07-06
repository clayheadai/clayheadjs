export default class CharacterClient {
    #private;
    sessionId: string;
    characterId: string;
    constructor(url: string, characterId: string);
    perceiveLanguage(text: any): void;
}
