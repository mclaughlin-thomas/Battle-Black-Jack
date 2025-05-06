"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const blackjackHandler_1 = require("./blackjackHandler");
const port = 5000;
const expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json()); // MIDDLEWARE FOR JSON
//expressApp.post("/read", readHandler); // Not needed now with the static middleware Below!!!!
expressApp.post("/blackjack/start", blackjackHandler_1.blackjackStart);
expressApp.post("/blackjack/hit", blackjackHandler_1.blackjackHit);
expressApp.post("/blackjack/stand", blackjackHandler_1.blackjackStand);
//MIDDLEWARE BELOW
expressApp.use(express_1.default.static("static"));
// the middleware component will attempt to match request URLs
// to files in the static directory
// games.html, game.html, index.html, etc.
expressApp.use(express_1.default.static("static/cards"));
// adding another middleware component for subdirectory
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
//middleware for bootstrap referenced in html
//MIDDLEWARE ABOVE
const server = (0, http_1.createServer)(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
