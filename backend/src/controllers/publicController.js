const public = require("../model/public")

module.exports = {
    async store(req, res) {
        const cloudinary = upload()
        const {
            owner,
            content
        } = req.body

        if (content.size / 1000000 > 50)
            return res.json(-1)
        const aux = await cloudinary.uploader.upload(content, {
            upload_preset: 'ml_default'
        })
        auxContent = aux.url

        const result = await public.create({
            owner: owner,
            content: content
        })

        return res.json(result)
    },

    async findPublic(req, res) {
        return res.json(await public.find().sort({
            createdAt: -1
        }))
    }

}

function upload() {
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
        cloud_name: 'dfzp80pg3',
        api_key: 229566936416442,
        api_secret: 'rC6q3kExzB09hXeWnIxIijohM8Y',
    });
    return cloudinary
}