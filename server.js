import 'dotenv/config';
import express from "express";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import pagesRouter from "./routes/pages.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let liveReloadServer;
if (process.env.NODE_ENV === "dev") {
  liveReloadServer = livereload.createServer({
    host: "0.0.0.0",  
    port: process.env.LIVERELOAD_PORT || 35729,
    exts: ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg'], 
    usePolling: true,  
    delay: 500, 
  });
  
  liveReloadServer.watch(path.join(__dirname, "public"));

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => liveReloadServer.refresh("/"), 100);
  });

  app.use(connectLivereload());
  
  console.log(`🔄 Livereload rodando na porta - ${process.env.LIVERELOAD_PORT || 35729}`);
}

app.use((req, res, next) => {
  const send = res.send;
  res.send = function (body) {
    if (
      process.env.NODE_ENV === "dev" &&
      typeof body === "string" &&
      body.includes("</body>")
    ) {
      const livereloadPort = process.env.LIVERELOAD_PORT || 35729;
      body = body.replace(
        "</body>",
        `<script src="http://localhost:${livereloadPort}/livereload.js?snipver=1"></script></body>`
      );
    }
    return send.call(this, body);
  };
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", pagesRouter);

app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  if (process.env.NODE_ENV === "dev") {
    console.log(`🔥 Hot reload funcionando nessa bagaça - Edite arquivos html no path ./public para ver mudanças em realtime`);
  }
});