import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const publicPath = path.join(__dirname, '..', 'public', 'pages');

router.get('/', (req, res) => {
    const filePath = path.join(publicPath, 'index.html');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Página não encontrada');
        }
        res.send(data);
    });
});

router.get('/:page', (req, res, next) => {
    const { page } = req.params;
    const filePath = path.join(publicPath, `${page}.html`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return next(); 
        }
        res.send(data);
    });
});

export default router;