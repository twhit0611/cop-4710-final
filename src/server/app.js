"use strict";
const express = require('express')
const DB = require('./db')
const config = require('./config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const EventsDB = require('./Schemas/Events');

const db = new DB("sqlitedb")
const app = express()
const router = express.Router()
 
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// CORS middleware
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
}

app.use(allowCrossDomain)

router.post('/register', (req, res) => {
    db.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        0
    ],
    (err) => {
        if (err) return res.status(500).send("There was a problem registering the user.")
        db.selectByEmail(req.body.email, (err,user) => {
            if (err) return res.status(500).send("There was a problem getting user")
            let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
            })
            res.status(200).send({ auth: true, token: token, user: user })
        })
    })
})

router.post('/register-admin', (req, res) => {
    db.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        1
    ],
    (err) => {
        if (err) return res.status(500).send("There was a problem registering the user.")
        db.selectByEmail(req.body.email, (err,user) => {
            if (err) return res.status(500).send("There was a problem getting the user.")
            let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
        }); 
    }); 
});

router.post('/register-super-admin', (req, res) => {
    db.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        2
    ],
    (err) => {
        if (err) return res.status(500).send("There was a problem registering the user.")
        db.selectByEmail(req.body.email, (err, user) => {
            if (err) return res.status(500).send("There was a problem getting the user.")
            let token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400
            })
            res.status(200).send({auth: true, token: token, user: user})
        })
    })
})

router.post('/login', (req, res) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.')
        if (!user) return res.status(404).send('No user found.')
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass)
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
        })
        res.status(200).send({ auth: true, token: token, user: user })
    })
})

router.post('/Events', (req, res) => {
    EventsDB.insertEvent([
        req.body.name,
        req.body.description,
        req.body.type
    ], //not sure if we are going to be hashing an event here, don't think so
    (err) => {

            if(err)
                res.status(500).send("There was a problem registering the event! " + JSON.stringify(err));

            EventsDB.selectByEventName(req.body.name, (err, Event) => {

                if(err){
                    return res.status(500).send("There was a problem getting the Event with error: "+ JSON.stringify(err));
                }

                    let token = jwt.sign({id: Event.id}, config.secret, {expiresIn: 86400});
                    res.status(200).send({ auth: true, token: token, Event: Event });

            });
    });
});

app.use(router)

let port = process.env.PORT || 3000;

(async () => {

    try {

        let server = await app.listen(port)
        console.log('Express server listening on port ' + port)

    }
    catch (err){

        console.log("There was a problem starting up the server with error: " + JSON.stringify(err));
    }


})()