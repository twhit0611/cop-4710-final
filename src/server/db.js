"use strict";
const sqlite3 = require('sqlite3').verbose();
const Users = require('./Schemas/User'); //the data we have in this file will go in here eventually
const Events = require('./Schemas/Events');


//this is our general database for now but in the future, we will need to seperate
//and create individual tables, thus creating indivi. schemas such as above

class DB {
    constructor(file) {
        this.DB = new sqlite3.Database(file);
        this.createTable();
        
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY, 
                name text, 
                email text UNIQUE, 
                user_pass text,
                admin_type integer)`
        return this.DB.run(sql);
    }

    selectByEmail(email, callback) {
        return this.DB.get(
            `SELECT * FROM user WHERE email = ?`,
            [email], (err,row) => {
                callback(err,row)
            })
    }

    insertAdmin(user, callback) {
        return this.DB.run(
            'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectAll(callback) {
        return this.DB.all(`SELECT * FROM user`, (err,rows) => {
            
            callback(err,rows)
        })
    }

    insert(user, callback){
        return this.DB.run(
            'INSERT INTO user (name,email,user_pass,admin_type) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
        }
}

module.exports = DB;