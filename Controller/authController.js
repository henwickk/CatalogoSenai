import catalogosenai from '../Models/cards.js'

export const addusuario = async (req, res) => {
    const {nome, senha} = req.body;
    const hashedSenha = await bcrypt.hash(senha, 10);

    cards.create({ nome, senha: hashedSenha }, (err)=> {
        if (err) return res.status(500).send('Erro ao cadastrar usuário'+err.message)
            res.redirect('/login')
    })
}

export const login = async (req, res) => {
    const {nome, senha} = req.body;

    User.findByNome(nome, async (err, results) => {
        if (results.length === 0) 
            return res.status(401).send('Usuário não encontrado')
        const user = results[0]

        const match = await bcrypt.compare(senha, user.senha)

    if (match){
        req.session.userId = user.idusuario
        req.session.user=user
        res.redirect('/*')

    }
    else {
        res.status(401).send('Senha incorreta')
    }

})

}




const fs = require('fs');
const path = require('path');
let bcrypt;
try { bcrypt = require('bcryptjs'); } catch (e) { bcrypt = null; }

const usersFile = path.join(__dirname, '../data/users.json');

function ensureUsersFile() {
    if (!fs.existsSync(path.dirname(usersFile))) {
        fs.mkdirSync(path.dirname(usersFile), { recursive: true });
    }
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, '[]', 'utf8');
    }
}

function readUsers() {
    ensureUsersFile();
    const raw = fs.readFileSync(usersFile, 'utf8') || '[]';
    return JSON.parse(raw);
}

function writeUsers(users) {
    ensureUsersFile();
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

class AuthController {
    async register(req, res) {
        try {
            const { username, password } = req.body || {};
            if (!username || !password) return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });

            const users = readUsers();
            if (users.find(u => u.username === username)) return res.status(409).json({ error: 'Usuário já existe' });

            const hashed = bcrypt ? await bcrypt.hash(password, 10) : password;
            const user = { id: Date.now(), username, password: hashed };
            users.push(user);
            writeUsers(users);

            return res.status(201).json({ message: 'Usuário criado', user: { id: user.id, username: user.username } });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body || {};
            if (!username || !password) return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });

            const users = readUsers();
            const user = users.find(u => u.username === username);
            if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

            const match = bcrypt ? await bcrypt.compare(password, user.password) : password === user.password;
            if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });

            return res.json({ message: 'Autenticado', user: { id: user.id, username: user.username } });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno' });
        }
    }
}

module.exports = new AuthController();
