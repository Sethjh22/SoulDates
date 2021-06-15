const bcrypt = require('bcryptjs')


module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        let [user] = await db.user.find_user(username)
        if (user) {
            return res.status(400).send('username already exists')
        } 
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            let [newUser] = await db.user.create_user(username, hash)
            req.session.user = newUser

            res.status(200).send(newUser)
            console.log(newUser)
        

    },
    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        let [user] = await db.user.find_user(username)
        
        if (!user) {
            return res.status(401).send('Username or Password Incorrect. Please try again.')
        }
        let isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated) {
            return res.status(401).send('Username or Password Incorrect. Please try again.')
        }
        delete user.password
        req.session.user = user
        res.status(200).send(user)
        console.log(user)
    },
    logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    },
    getUser: async (req, res) => {
        let user = req.session.user
        const db = req.app.get('db')
        if(user){
            await db.user.find_user(username)
        }else{
            return res.status(404)
        }
    }
}