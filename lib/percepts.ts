interface Vector3 {
    x: number,
    y: number,
    z: number,
}

interface Agent {
    name?: string,
}

interface Percept {
    timestamp: Date,
}

interface LanguagePercept extends Percept {
    text: string,
    source?: Agent,
}

interface ObjectPercept extends Percept {
    center: Vector3,
    extent: Vector3,
    velocity?: Vector3,
    synset?: string,
}

interface InanimatePercept extends ObjectPercept {}
interface AnimatePercept extends ObjectPercept, Agent {}

interface TextPercept extends LanguagePercept {
    medium?: ObjectPercept
}

// Exports
export {
    Vector3,
    Agent,
    Percept,
    LanguagePercept,
    TextPercept,
    ObjectPercept,
    InanimatePercept,
    AnimatePercept,
};