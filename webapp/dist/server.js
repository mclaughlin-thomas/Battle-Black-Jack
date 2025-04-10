"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//HTTPS
const http_1 = require("http");
const handler_1 = require("./handler"); // adding redirectionHandler
const https_1 = require("https");
const fs_1 = require("fs");
const express_1 = __importDefault(require("express"));
// express fcn invoked to create an Express object.
const port = 5000;
const https_port = 5500;
const server = (0, http_1.createServer)(handler_1.redirectionHandler);
server.listen(port, () => console.log(`(Event) Server listening on port ${port}`));
const httpsConfig = {
    key: (0, fs_1.readFileSync)("key.pem"),
    cert: (0, fs_1.readFileSync)("cert.pem")
};
const expressApp = (0, express_1.default)();
expressApp.get("/favicon.ico", handler_1.notFoundHandler);
expressApp.get("/newurl/:message?", handler_1.newUrlHandler);
expressApp.get("*", handler_1.defaultHandler);
const httpsServer = (0, https_1.createServer)(httpsConfig, expressApp);
// The Express object is also a handler function that can be used
// with Node.js createServer functions... Express processes all the
// HTTP requests that Node.js receives and routes them to appropriate
// handler.
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));
// --------------------------------------------------
// HTTP
// import { createServer } from "http";
// import { handler } from "./handler";
// // The createServer fcn in the http module is used to create Server objects
// // These server objects can be used to listen for and process HTTP requests.
// // The server object needs configured before it starts listening for requests
// // listen(port)
// // this method starts listening for requests on a specified port
// // close()
// // this method stops listening for requests
// // requestTimeout
// // this property gets or sets the request timeout period, which can also
// // be used using the config object passed to the createServer function
// // Once the Server object is configured, it emits events that denote \
// // important changes.
// // Important server events
// // listening : triggered when the server starts listening for requests
// // request : event triggered when a new request is received
// //           The callback fcn that handles this event is invoked with
// //           args that represent the HTTP request and response.
// // error : triggered when there is a network error
// // "The request event will be
// // triggered each time an HTTP request is received, and the JavaScript
// // execution model means that only one HTTP request will be handled at a time."
// const port = 5000;
// const server = createServer(handler);
// // The arguments for the the above fcn are a configuration object
// // and a request-handling function. The config object is used to change
// // the way that requests are received.
// // That handler function is invoked when an HTTP request has been received
// // AND its parameters are objects whose types are those specified by the
// // IncomingMessage and ServerResponse properties, or the default types if
// // the config has not been changed.
// //server.on("request", handler);
// server.listen(port, () => console.log(`(Event) Server listening on port ${port}`));
// // server.on("listening", () => {
// //console.log(`(Event) Server listening on port ${port}`);
// // });
