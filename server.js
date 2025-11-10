import "dotenv/config";
import express from "express";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import pagesRouter from "./routes/pages.js";
import { fileURLToPath } from "url";
import path from "path";
import apiRoutes from "./src/api/routes/apiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔄 Configuração do LiveReload
if (process.env.NODE_ENV === "dev") {
  const liveReloadServer = livereload.createServer({
    host: "0.0.0.0",
    port: process.env.LIVERELOAD_PORT || 35729,
    exts: ["html", "css", "js", "png", "jpg", "jpeg", "gif", "svg"],
    usePolling: true,
    delay: 500,
  });

  liveReloadServer.watch(path.join(__dirname, "public"));

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => liveReloadServer.refresh("/"), 100);
  });

  // 🔄 Middleware do LiveReload
  // Deve vir ANTES de servir os arquivos estáticos para desabilitar o cache.
  app.use(connectLivereload());
  console.log(
    `🔄 Livereload rodando na porta ${process.env.LIVERELOAD_PORT || 35729}`
  );
}

// 📂 Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(
  "/bootstrap-icons",
  express.static(path.join(__dirname, "node_modules/bootstrap-icons/font"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use((req, res, next) => {
  const send = res.send;
  res.send = function (body) {
    if (typeof body === "string" && body.includes("</head>")) {
      const livereloadPort = process.env.LIVERELOAD_PORT || 35729;
      const isDev = process.env.NODE_ENV === "dev";

      const css = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/style.css">
      `;
      const js = `
        <script defer src="/js/jquery.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        ${
          isDev
            ? `<script defer src="http://localhost:${livereloadPort}/livereload.js?snipver=1"></script>`
            : ""
        }
      `;

      body = body.replace("</head>", `${css}${js}</head>`);
    }

    return send.call(this, body);
  };
  next();
});

app.use("/api", apiRoutes);

app.use("/", pagesRouter);

app.use((req, res) => {
  res.status(404).send("Página não encontrada");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
  if (process.env.NODE_ENV === "dev") {
    console.log(
      "🔥 Hot reload ativo — edite arquivos em ./public e veja as mudanças em tempo real."
    );
  }
});
