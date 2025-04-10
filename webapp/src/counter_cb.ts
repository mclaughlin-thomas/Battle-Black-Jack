import { Worker } from "worker_threads";

// the count function accepts args that describe work to be done

export const Count = (request: number, iterations: number, total: number, callback: (err: Error | null, update: number | boolean) => void) => {
    const worker = new Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations,
            total,
            request
        }
    });
    worker.on("message", async (iter: number) => {
        callback(null, iter);
    });
    worker.on("exit", async (code: number) => {
        callback(code === 0 ? null : new Error(), true);
    });
    worker.on("error", async (err) => {
        callback(err, true);
    });
}