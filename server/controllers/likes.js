module.exports = {
    getAllLikes: (req, res) => {
        const {user_id} = req.session.user
        req.app.get('db').likes.get_all_likes(user_id)
        .then(likes => res.status(200).send(likes))
    },
    addToLikes: async (req, res) => {
        console.log(req.session.user)
        const {user_id} = req.session.user
        const dateId = +req.params.id
        const db = req.app.get('db')
        if(user_id){
            await db.likes.add_to_likes(user_id, dateId)
            return res.sendStatus(200)
        }else{
            return res.sendStatus(403)
        }

    }
}