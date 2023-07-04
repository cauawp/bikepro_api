const User = require('../../models/User')

const SessionController = {

    async createSession(req, res) {

        const { username } = req.body

        try {

            const user = await User.findOne({ username })
            return res.status(200).json(user) //, msg: 'Logado com sucesso!'}

        } catch(err) {

            return res.status(400).json(err)

        }

    }

}

module.exports = SessionController