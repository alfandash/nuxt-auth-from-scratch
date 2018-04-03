const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.sample');
const cors = require('cors');

const db = mysql.createConnection(config.db);
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.get('/test', (req, res) => {
    db.query('select 1+1', (error, result) => {
        if (error) return res.status(500).json({type: 'error', error})
        res.json({type: 'success', message: 'Test Ok', result})
    })
})

app.use('/auth', auth({db, express, bcrypt, jwt, jwtToken: config.jwtToken}))

app.listen(config.port)
console.log('App is running on port'+ config.port)