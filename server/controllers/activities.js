module.exports = {
    getRandomDate: (req, res) => {
        req.app.get('db').activities.get_random_date(req.params.id).then(date => date[0] ? res.status(200).send(date[0]) : res.status(200).send({}))

    }
}