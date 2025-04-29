import { rename as fsRename, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const sourcePath = path.join(__dirname, 'files/wrongFilename.txt');
    const destPath = path.join(__dirname, 'files/properFilename.md');

    try {
        await access(sourcePath, constants.F_OK);

        try {
            await access(destPath, constants.F_OK);

            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }

            await fsRename(sourcePath, destPath);
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await rename();