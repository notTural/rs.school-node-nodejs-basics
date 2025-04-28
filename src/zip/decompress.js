import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const archivePath = path.join(__dirname, 'files/archive.gz');
    const destinationPath = path.join(__dirname, 'files/fileToCompress.txt');

    const readStream = createReadStream(archivePath);
    const writeStream = createWriteStream(destinationPath);
    const gunzip = createGunzip();

    readStream
        .pipe(gunzip)
        .pipe(writeStream);
};

await decompress();