require('dotenv').config()
const massive = require('massive')
const session = require('express-session')
const express = require('express')
const userCtrl = require('./controllers/user')
const activitiesCtrl = require('./controllers/activities')
const likesCtrl = require('./controllers/likes')
const dislikesCtrl = require('./controllers/dislikes')
    

const app = express()
app.use(express.json())
const{SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

//Auth Endpoints
app.post('/auth/register', userCtrl.register)
app.post('/auth/login', userCtrl.login)
app.post('/auth/logout', userCtrl.logout)
app.get('/auth/me', userCtrl.getUser)

//activities Endpoint
app.get('/api/activities/:id', activitiesCtrl.getRandomDate)

//likes Endpoints
app.get('/api/likes', likesCtrl.getAllLikes)
app.post('/api/like/:id', likesCtrl.addToLikes)

//dislikes Endpoints
app.get('/api/dislikes', dislikesCtrl.getAllDislikes)
app.post('/api/dislike/:id', dislikesCtrl.addToDislikes)
app.delete('/api/dislike/:id', dislikesCtrl.deleteDislike)


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, console.log(`DB is connecting and server is running on ${SERVER_PORT}`))
})