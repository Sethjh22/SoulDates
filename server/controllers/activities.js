module.exports = {
    getRandomDate: (req, res) => {
        req.app.get('db').activities.get_random_date(req.params.id).then(date => date[0] ? res.status(200).send(date[0]) : res.status(200).send({}))

    },
    addToDates: (req, res) => {
        const {activity, url, price, location, info} = req.body
        req.app.get('db').activities.add_to_dates([activity, url, price, location, info])
        .then(() => res.sendStatus(200))
        .catch(() => {
            res.status(500).send("Oops! That didn't work the way it was supposed to.")
        })
    }

}