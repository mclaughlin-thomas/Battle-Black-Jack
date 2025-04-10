"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHandler = exports.newUrlHandler = exports.notFoundHandler = exports.redirectionHandler = void 0;
//REWRITE isHTTPS & adding redirectionHandler for HTTP to HTTPS redirection
// export const isHttps = (req: IncomingMessage) : boolean => {
//     return req.socket instanceof TLSSocket && req.socket.encrypted;
// }
const redirectionHandler = (req, resp) => {
    resp.writeHead(302, { "Location": "https://localhost:5500" });
    // 302 denotes redirection and sets the Location header to new URL
    resp.end();
};
exports.redirectionHandler = redirectionHandler;
const notFoundHandler = (req, resp) => {
    resp.sendStatus(404);
};
exports.notFoundHandler = notFoundHandler;
const newUrlHandler = (req, resp) => {
    const msg = req.params.message ?? "(No Message)";
    resp.send(`Hello, ${msg}`);
};
exports.newUrlHandler = newUrlHandler;
const defaultHandler = (req, resp) => {
    if (req.query.keyword) {
        resp.send(`Hello, ${req.query.keyword}`);
    }
    else {
        resp.send(`Hello, ${req.protocol.toUpperCase()}`);
    }
};
exports.defaultHandler = defaultHandler;
// This example generates 3 different responses.
//http://localhost:5000/favicon.ico ,
//http://localhost:5000?keyword=World , and
//http://localhost:5000
