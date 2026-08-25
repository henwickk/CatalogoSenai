const express = require("express");
const session = require("express-session");
const path = require("path");

const usuarioRoutes = require("./Routes/usuarioRoutes");
const cardRoutes = require("./Routes/cardRoutes");

const app = express();

// Configurações do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

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

// Rotas
app.use("/", usuarioRoutes);
app.use("/cards", cardRoutes);


// Servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});