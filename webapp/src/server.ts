import { createServer } from "http";
import express, {Express, Request, Response } from "express";
import { blackjackStart, blackjackHit, blackjackStand } from "./blackjackHandler";

const port = 5000;
const expressApp: Express = express();

expressApp.use(express.json()); // MIDDLEWARE FOR JSON

//expressApp.post("/read", readHandler); // Not needed now with the static middleware Below!!!!

expressApp.post("/blackjack/start", blackjackStart);
expressApp.post("/blackjack/hit", blackjackHit);
expressApp.post("/blackjack/stand", blackjackStand);

//MIDDLEWARE BELOW
expressApp.use(express.static("static"));
// the middleware component will attempt to match request URLs
// to files in the static directory
// games.html, game.html, index.html, etc.

expressApp.use(express.static("static/cards"));
// adding another middleware component for subdirectory

expressApp.use(express.static("node_modules/bootstrap/dist"));
//middleware for bootstrap referenced in html

//MIDDLEWARE ABOVE

const server = createServer(expressApp);

server.listen(port,() =>
    console.log(`HTTP Server listening on port ${port}`)
);
