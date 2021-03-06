"use strict";
const express = require('express')
const DB = require('./db')
const config = require('./config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const db = new DB('sqlitedb')
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

// register a user
router.post('/register', (req, res) => {
    db.insertUser([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        req.body.is_admin
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

router.post('/register-event', (req, res) => {
    db.insertEvent([
        req.body.name,
        req.body.category,
        req.body.type,
        req.body.RSO_name,
        req.body.description,
        req.body.date,
        req.body.time,
        req.body.address,
        req.body.contact_phone,
        req.body.contact_email
    ],
    (err) => {
        if (err) return res.status(500).send('There was a problem creating the event.')
    })
})

router.post('/register-rso', (req, res) => {
    db.insertRSO([
        req.body.name,
        req.body.school,
        req.body.description,
        req.body.student_email,
        req.body.student_signatures
    ],
    (err) => {
        if (err) return res.status(500).send('There was a problem registering the RSO.')
    })
})

router.post('/register-school', (req, res) => {
    db.insertSchool([
        req.body.name,
        req.body.category,
        req.body.description
    ],
    (err) => {
        if(err) return res.status(500).send('There was a problem creating the school.')
    })
})

// access all events
router.post('/get-all-events', (req, res) => {
    db.selectAllEvents((err, rows) => {
        if (err) return res.status(500).send('Error on the server.')
        res.status(200).send({rows:rows})
    })
})

// access all RSOs
router.post('/get-all-RSOs', (req, res) => {
    db.selectAllRSOs((err, rows) => {
        if (err) return express.status(500).send('Error on the server.')
        res.status(200).send({rows:rows})
    })
})

// get unauthorized events for super-admin
router.post('/get-unauthorized-events', (req, res) => {
    db.selectUnauthorizedEvents((err, rows) => {
        if (err) return express.status(500).send('Error on the server.')
        res.status(200).send({rows:rows})
    })
})

router.post('/approve-event', (req, res) => {
    db.updateApproveEvent(req.body.Eventid, (err) => {
        if (err) return res.status(500).send('Error on the server.')
    })
})

router.post('/reject-event', (req, res) => {
    db.deleteRejectEvent(req.body.Eventid, (err) => {
        if (err) return res.status(500).send('Error on the server.')
    })
})

// login a user
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

//Our delete route for deleting a user from an event
router.delete('/delete-event', (req, res) => {

    db.deleteuserfromRSO(req.body.name, (err) => {

        if(err) return res.status(500).send("Error on the server!");
        else res.send("Succesfully deleted the name of the associated RSO")
    });

});


app.use(router)

let port = process.env.PORT || 3000;

(async () => {
    try {
        let server = await app.listen(port, function() {
            console.log('Express server listening on port ' + port)
        })
    }
    catch (err){
        console.log("There was a problem starting up the server with error: " + JSON.stringify(err));
    }


})()