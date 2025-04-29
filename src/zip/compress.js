import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const compress = async () => {
    const sourcePath = path.join(__dirname, 'files/fileToCompress.txt');
    const destinationPath = path.join(__dirname, 'files/archive.gz');

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    const gzip = createGzip();

    readStream
        .pipe(gzip)
        .pipe(writeStream);
};

await compress();