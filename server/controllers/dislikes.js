module.exports = {
    getAllDislikes: (req, res) => {
        const {id} = req.session.user
        req.app.get('db').dislikes.get_all_dislikes(id)
        .then(dislikes => res.status(200).send(dislikes))
    },
    addToDislikes: async (req, res) => {
        const {id} = req.session.user
        const {dateId} = req.params.id
        const db = await req.app.get('db')
        if(id){
            db.dislikes.add_to_dislikes(id, dateId)
        }else{
            return res.status(403)
        }

    },
    deleteDislike: (req, res) => {
        req.app.get('db').dislikes.delete_from_dislikes(req.params.id)
        .then(_ => res.sendStatus(200))
    }
}