"use strict";
const sqlite3 = require('sqlite3').verbose();

//this is our general database for now but in the future, we will need to seperate
//and create individual tables, thus creating indivi. schemas such as above

class DB {
    constructor(file) {
        this.DB = new sqlite3.Database(file)
        this.createTable()
        this.createEventTable()
        this.createCommentsTable()
        this.createRSOTable()
        this.createSchoolTable()
    }

    //asynchronous methods
    runAsync(sql) {
        var that = this;
        return new Promise( (resolve, reject) => {
            that.get(sql, (err, row) => {

                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    
    };
    getAsync(sql) {
        var that = this;
        return new Promise( (resolve, reject) => {
            that.get(sql, (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    
    };

    // create a table for users
    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user ( 
                id integer PRIMARY KEY,
                name text,
                email text UNIQUE,
                user_pass text,
                is_admin integer)`
        return this.DB.run(sql)
    }

    // create a table for events
    createEventTable()  {
        const sql = `
                CREATE TABLE IF NOT EXISTS event (
                    Eventid integer PRIMARY KEY,
                    name text,
                    category text,
                    type text,
                    RSO_name text,
                    description text,
                    date integer,
                    time integer,
                    address text,
                    admin_approved integer,
                    contact_email integer,
                    contact_phone integer)`
        return this.DB.run(sql)
    }

    createRSOTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS rso (
                RSOid integer PRIMARY KEY,
                name text,
                school text,
                description text,
                student_email text,
                student_signatures integer)`
        return this.DB.run(sql)
    }

    createSchoolTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS school (
                id integer PRIMARY KEY,
                name text,
                category text,
                description text)`
        return this.DB.run(sql)
    }

    // create a table for comments
    createCommentsTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS comments (
                CommentID integer primary key,
                comment text,
                time integer,
                date integer,
                is_Admin integer)`
        return this.DB.run(sql)
    }

    // insert a user into the database
    insertUser(user, callback) {
        return this.DB.run(
            'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    // insert an event into the database
    insertEvent(event, callback) {
        return this.DB.run(
            `INSERT INTO event (name,category,type,RSO_name,description,date, 
                time,address,contact_phone,contact_email) VALUES (?,?,?,?,?,?,?,?,?,?)`,
            event, (err) => {
                callback(err)
            })
    }

    insertRSO(rso, callback) {
        return this.DB.run(
            `INSERT INTO rso (name,school,description,student_email,student_signatures) VALUES (?,?,?,?,?)`,
            rso, (err) => {
                callback(err)
            })
    }

    insertSchool(school, callback) {
        return this.DB.run(
            `INSERT INTO school (name,category,description) VALUES (?,?,?)`,
            school, (err) => {
                callback(err)
            }
        )
    }

    selectByEmail(email, callback) {
        return this.DB.get(
            `SELECT * FROM user WHERE email = ?`,
            [email], (err,row) => {
                callback(err,row)
            })
    }

    selectAllEvents(callback) {
        return this.DB.all(`SELECT * FROM event`, (err, rows) => {
            callback(err, rows)
        })
    }

    selectAll(callback) {
        return this.DB.all(`SELECT * FROM user`, (err,rows) => {
            callback(err,rows)
        })
    }
}

module.exports = DB;