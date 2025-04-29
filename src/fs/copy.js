
import { access, cp } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    try {
        await access(sourceDir, constants.F_OK);

        try {
            await access(destDir, constants.F_OK);

            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }

            await cp(sourceDir, destDir, { recursive: true });
        }
    } catch (error) {
        throw new Error('FS operation failed')
    }
};

await copy();
