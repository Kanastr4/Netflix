const user = require('../model/user')

module.exports = {
    async store(req, res) {
        const {
            foto,
            usuario,
            email,
            password,
            admin
        } = req.body

        var photo = ''

        let auxAdmin
        if (admin)
            auxAdmin = admin
        else
            auxAdmin = 0

        const exist = await user.findOne({
            email
        }).collation({
            locale: 'pt', strength: 2
        })

        if (exist)
            return res.json('E-mail ou número de telefone já cadastrado!')

        if (foto) {
            photo = await cloudinary.uploader.upload(foto, {
                upload_preset: 'ml_default'
            })
        }

        const result = await user.create({
            foto: {
				url: photo.url,
				_id: photo.public_id
			},
			usuario: usuario,
            password: password,
			email: email,
            admin: auxAdmin
        })
        return res.json(result)
    },
    async login(req, res) {
        const {
            email,
            password,
        } = req.headers

        const userExist = await user.findOne({
            email
        }).collation({
            locale: 'pt', strength: 2
        })

        if (!userExist)
            return res.json('Email não cadastrado')
        if (userExist.password !== password)
            return res.json('Senha Incorreta')
        return res.json('Login realizado com sucesso!')
    },

    async showAll(req, res) {
		return res.json(await user.find())
	},

	async showOne(req, res) {
		const {
			username
		} = req.body

		const exists = await user.findOne({
			usuario: username
		})

		if (!exists) {
			return res.json(1)
		}

		return res.json(exists)
	},

	async update(req, res) {
		const {
			usuario,
			email,
			foto
		} = req.body

		const exists = await user.findOne({ usuario })

		if(!exists) {
			return res.json(1)
		}

		var equals = {
			email: '',
			foto: {
				url: '',
				_id: ''
			}
		}

		if(foto != exists.foto.url) {
			if(exists.foto.url) {
				await cloudinary.uploader.destroy(exists.foto._id, {
					upload_preset: 'ml_default'
				})
			}
			const aux = await cloudinary.uploader.upload(foto, {
				upload_preset: 'ml_default'
			})
			equals.foto.url = aux.url
			equals.foto._id = aux.public_id
		} else {
			equals.foto._id = 1
		}
 
		if(email != exists.email) {
			equals.email = email
		} else {
			equals.email = exists.email
		}

		if(equals.foto._id == 1) {
			await user.updateOne({
				_id: exists._id
			}, {
				$set: {
					email: equals.email
				}
			})
		} else {
			await user.updateOne({
				_id: exists._id
			}, {
				$set: {
					'foto.url': equals.foto.url,
					'foto._id': equals.foto._id,
					email: equals.email
				}
			})
		}

		const aux = await user.findOne({
			usuario
		})

		return res.json(aux)
	},

	async delete(req, res) {
		const {
			usuario
		} = req.body

		const exists = await user.findOne({
			usuario
		})

		if (!exists) {
			return res.json(1)
		}

		if (exists.foto._id) {
			await cloudinary.uploader.destroy(exists.foto._id, {
				upload_preset: 'ml_default'
			})
		}

		await user.deleteOne({
			usuario
		})

		return res.json(2)
	}
}