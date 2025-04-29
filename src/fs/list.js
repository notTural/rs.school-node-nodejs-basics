import { readdir, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {

    const dir = path.join(__dirname, 'files');

    try {
        await access(dir, constants.F_OK);

        const files = await readdir(dir);

        console.log(files);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await list();