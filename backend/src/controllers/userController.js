const user = require('../model/user')

module.exports = {
    async store(req, res) {
        const {
            name,
            email,
            password
        } = req.body

        const exist = await user.findOne({
            email
        }).collation({
            locale: 'pt', strength: 2
        })

        if (exist)
            return res.json('E-mail ou número de telefone já cadastrado!')

        const result = await user.create({
            name, email, password
        })
        return res.json(result)
    },
    async login(req, res){
        const {
            email,
            password
        } = req.headers

        const emailExist = await user.findOne({
            email
        }).collation({
            locale: 'pt', strength: 2
        })
        const correctPassword = await user.findOne({
            password
        })

        if (emailExist && correctPassword)
            return res.json('Login realizado com sucesso!')    
        if (emailExist && !correctPassword)
            return res.json('Senha Incorreta')
        if (!emailExist && correctPassword)
            return res.json('Email Incorreto')
        else
            return res.json('Email ou número de telefone não cadastrado')
    }
}