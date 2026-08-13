const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./Routes/authRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
    secret: 'chavee-secreta-segura',
    resave: false,
    saveUninitialized: true,
}),
);

app.use('/', authRoutes);

app.listen(3000, () => 
    console.log('servidor rodando em http://localhost:3000')
);
