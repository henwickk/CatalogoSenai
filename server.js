const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

const usuarioRoutes = require("./Routes/usuarioRoutes");
const cardRoutes = require("./Routes/cardRoutes");

const app = express();

app.use(cors());

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "chavee-secreta-segura",
        resave: false,
        saveUninitialized: true,
    })
);

// Arquivos HTML, CSS e JS
app.use(express.static(path.join(__dirname, "Views")));

// Arquivos enviados
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/", usuarioRoutes);
app.use("/cards", cardRoutes);

// Servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});