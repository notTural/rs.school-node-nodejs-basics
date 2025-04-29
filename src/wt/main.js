import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const performCalculations = async () => {
    const numCPUs = os.cpus().length;
    const results = [];

    const workerPromises = [];

    for (let i = 0; i < numCPUs; i++) {
        workerPromises.push(new Promise((resolve) => {
            const worker = new Worker(path.join(__dirname, 'worker.js'));

            worker.on('message', (message) => {
                resolve(message);
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.postMessage(10 + i);
        }));
    }

    const settledResults = await Promise.all(workerPromises);

    console.log(settledResults);
};

await performCalculations();