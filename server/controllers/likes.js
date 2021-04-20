module.exports = {
    getAllLikes: (req, res) => {
        const {id} = req.session.user
        req.app.get('db').likes.get_all_likes(id)
        .then(likes => res.status(200).send(likes))
    },
    addToLikes: async (req, res) => {
        const {id} = req.session.user
        const {dateId} = req.params.id
        const db = await req.app.get('db')
        if(id){
            db.likes.add_to_likes(id, dateId)
        }else{
            return res.status(403)
        }

    }
}