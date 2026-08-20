const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./Routes/authRoutes');

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
    secret: 'chavee-secreta-segura',
    resave: false,
    saveUninitialized: true,
}),
)

app.use('/', authRoutes);

app.listen(3000, () => 
    console.log('servidor rodando em http://localhost:3000')
)
