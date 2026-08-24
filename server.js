const express = require('express');
const path = require('path');
const routes = require('./Routes/authRoutes');

const app = express();
const port = Number(process.env.PORT) || 3000;
const viewsPath = path.join(__dirname, 'Views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/Views', express.static(viewsPath));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/api', routes);
app.use('/', routes);

app.get('/', (req, res) => res.sendFile(path.join(viewsPath, 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(viewsPath, 'login.html')));
app.get('/gestao', (req, res) => res.sendFile(path.join(viewsPath, 'gestao.html')));
app.get('/gerenciamento-card', (req, res) => res.sendFile(path.join(viewsPath, 'gerenciamentoCard.html')));
app.get('/gerenciamentoCard', (req, res) => res.sendFile(path.join(viewsPath, 'gerenciamentoCard.html')));

app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

if (require.main === module) {
    app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
}

module.exports = app;