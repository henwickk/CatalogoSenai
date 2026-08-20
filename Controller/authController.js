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




