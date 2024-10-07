import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, '../../assets');

const readFileAsync = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
};

let gameAssets = {};

export const loadGameAssets = async () => {
    try {
        const [stages, items, itemUnlock] = await Promise.all([
            readFileAsync('stage.json'),
            readFileAsync('item.json'),
            readFileAsync('item_unlock.json'),
        ]);

        gameAssets = { stages, items, itemUnlock };
        return gameAssets;
    } catch (err) {
        throw new Error('assets error' + err.message);
    }
};

export const getGameAssets = () => {
    return gameAssets;
};