import { IncomingMessage, ServerResponse } from "http";

// Useful createServer configuration objects
// IncomingMessage // represents requests
// ServerResponse  // represents responses
// requestTimeout  // time allowed for client to send requests, afterwhich the request times out

// this code below omits the configuration object mentioned in server.ts
// which means that the default types will be used to represent the HTTP 
// request and response when the handler fcn for the request event is invoked.

// Detecting HTTPS requests
// The socket property defined by the IncomingMessage class will return
// an instance of the TLSSocket class for secure requests and this class
// defines an encrypted property that always returns true . Checking if this
// property exists allows HTTPS and HTTP connections to be identified so that
// different responses can be produced.

// import { TLSSocket } from "tls";
// import { URL } from "url";
import {Request, Response} from "express";

//REWRITE isHTTPS & adding redirectionHandler for HTTP to HTTPS redirection
// export const isHttps = (req: IncomingMessage) : boolean => {
//     return req.socket instanceof TLSSocket && req.socket.encrypted;
// }
export const redirectionHandler= (req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(302, {"Location": "https://localhost:5500"});
    // 302 denotes redirection and sets the Location header to new URL
    resp.end();
}

export const notFoundHandler = (req: Request, resp: Response) => {
    resp.sendStatus(404);
}
export const newUrlHandler = (req: Request, resp:Response) => {
    const msg = req.params.message ?? "(No Message)";
    resp.send(`Hello, ${msg}`);
}
export const defaultHandler = (req: Request, resp:Response) => {
    if (req.query.keyword) {
        resp.send(`Hello, ${req.query.keyword}`);
    }
    else {
        resp.send(`Hello, ${req.protocol.toUpperCase()}`);
    }
}
// This example generates 3 different responses.
//http://localhost:5000/favicon.ico ,
//http://localhost:5000?keyword=World , and
//http://localhost:5000