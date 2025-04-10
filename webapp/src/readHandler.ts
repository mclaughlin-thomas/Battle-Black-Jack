//import { Transform } from "stream";
import { Request, Response } from "express";

export const readHandler = async (req: Request, resp: Response) => {
    if (req.headers["content-type"] == "application/json") {
        const payload = req.body;
        if (payload instanceof Array) {
            //resp.write(`Received an array with ${payload.length} items`)
            resp.json({arraySize: payload.length});
        }
        else {
            resp.write("Did not receive an array");}
            resp.end();
    }
    else {
        req.pipe(resp);
    }
}
