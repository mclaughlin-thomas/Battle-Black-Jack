"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const readHandler_1 = require("./readHandler");
const port = 5000;
const expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json()); // MIDDLEWARE FOR JSON
expressApp.post("/read", readHandler_1.readHandler);
expressApp.get("/sendcity", (req, resp) => {
    resp.sendFile("city.png", { root: "static" });
});
expressApp.get("/downloadcity", (req, resp) => {
    resp.download("static/city.png");
});
expressApp.get("/json", (req, resp) => {
    resp.json("{name: Bob}");
});
//MIDDLEWARE BELOW
expressApp.use(express_1.default.static("static"));
// the middleware component will attempt to match request URLs
// to files in the static directory
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
//MIDDLEWARE ABOVE
const server = (0, http_1.createServer)(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
