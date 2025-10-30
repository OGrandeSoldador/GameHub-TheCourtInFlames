import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import pagesRouter from './routes/pages.js';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const liveReloadServer = livereload.createServer({
  host: '0.0.0.0',
  port: 35729
});

liveReloadServer.watch(path.join(__dirname, 'public'));

app.use(connectLivereload());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pagesRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});


