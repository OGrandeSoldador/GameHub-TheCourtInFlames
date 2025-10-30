import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const publicPath = path.join(__dirname, '..', 'public', 'pages');

router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

router.get('/:page', (req,res,next) => {
    const { page } = req.params;
    const filePath = path.join(publicPath, `${page}.html`);

    res.sendFile(filePath, (err) => {
        if (err) {
            next();
        }
    });
})
export default router;