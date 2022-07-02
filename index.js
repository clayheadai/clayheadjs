require("dotenv").config();
const { io } = require("socket.io-client");

class AIController {
    constructor() {
        this.socket = io(process.env.CLAYHEAD_URL, {
            query: {
                key: process.env.CLAYHEAD_API_KEY,
            },
        });
    }
};

export { AIController };