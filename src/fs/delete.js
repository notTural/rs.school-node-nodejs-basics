import { unlink, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files/fileToRemove.txt');

    try {
        await access(filePath, constants.F_OK);

        await unlink(filePath);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await remove();