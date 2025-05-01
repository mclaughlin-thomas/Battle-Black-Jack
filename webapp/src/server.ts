import { createServer } from "http";
import express, {Express, Request, Response } from "express";
import { readHandler } from "./readHandler";
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

expressApp.use(express.static("static/cards"));

expressApp.use(express.static("node_modules/bootstrap/dist"));
//MIDDLEWARE ABOVE
const server = createServer(expressApp);

server.listen(port,() =>
    console.log(`HTTP Server listening on port ${port}`)
);
