module.exports = {
    getAllDislikes: (req, res) => {
        const {user_id} = req.session.user
        req.app.get('db').dislikes.get_all_dislikes(user_id)
        .then(dislikes => res.status(200).send(dislikes))
    },
    addToDislikes: async (req, res) => {
        const {user_id} = req.session.user
        const dateId = req.params.id
        const db = await req.app.get('db')
        if(user_id){
            db.dislikes.add_to_dislikes(user_id, dateId)
        }else{
            return res.status(403)
        }

    },
    deleteDislike: (req, res) => {
        req.app.get('db').dislikes.delete_from_dislikes(req.params.id)
        .then(_ => res.sendStatus(200))
    }
}