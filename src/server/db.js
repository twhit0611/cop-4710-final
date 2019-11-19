"use strict";
const sqlite3 = require('sqlite3').verbose();

//this is our general database for now but in the future, we will need to seperate
//and create individual tables, thus creating indivi. schemas such as above

class DB {
    constructor(file) {
        this.DB = new sqlite3.Database(file)
        this.EventDB = new sqlite3.Database(file)
        this.createTable()
        this.createEventTable()
        //this.createEventTable()
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

    async createTable() {
        try {
            const sql = `
                CREATE TABLE IF NOT EXISTS user ( 
                    id integer PRIMARY KEY,
                    name text,
                    email text UNIQUE,
                    user_pass text,
                    is_admin integer)`
            return await this.DB.runAsync(sql);
        }
        catch(err) {
            console.log("Could not start database with error: "+ JSON.stringify(err));
        }
    }

    insertUser(user, callback){
        return this.DB.run(
            'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectByEmail(email, callback) {
        return this.DB.get(
            `SELECT * FROM user WHERE email = ?`,
            [email], (err,row) => {
                callback(err,row)
            })
    }

    selectAll(callback) {
        return this.DB.all(`SELECT * FROM user`, (err,rows) => {
            
            callback(err,rows)
        })
    }
async createEventTable() 
    {           
        try {
            const sql = ' \
                    CREATE TABLE IF NOT EXISTS event ( \
                    Eventid integer PRIMARY KEY, \
                    name text, \
                    description text, \
                    category text, \
                    time integer, \
                    date integer, \
                    is_Admin integer, \
                    count_email integer, \
                    count_phone integer)'
            return await this.EventDB.runAsync(sql)
        }
        catch(err) {
            return console.error(err);
        }
    }

    insertEvents(Events, callback){
        return this.DB.run(`INSERT INTO event (name,category,description,time,date,count_email,count_phone) VALUES (?,?,?,?,?,?,?)`, [Event], (err) => {
            callback(err);
        }); 
    }

    selectByEventName(name, callback){
        return this.EventsDB.get(`SELECT * FROM event WHERE name = ?`, [name], (err, row) => {
            callback(err, row);
        });
    };

    async createCommentstable(){

        try {
            var createComments = (
                `CREATE TABLE IF NOT EXISTS Comments(
                    CommentsID integer primary key,
                    comment text,
                    time integer,
                    date integer,
                    is_Admin integer
                )`
            )
            return await this.CommentsDB.runAysnc(createComments)
        }
        catch(err) {
            return console.error(err)
        }
    }

    async createRSOevent(){
        try {
    
            var createRSO = (`
            CREATE TABLE IF NOT EXISTS RSO(
            RSOid integer,
            name text,
            description text,
            type text,
            category text,
            time, integer,
            date integer,
            is_Admin integer,
            count_email integer,
            count_phone integer
            )
            `)
    
            return await this.EventsDB.runAysnc(createRSO);
    
        }
    
        catch(err){
            console.log("There was a problem creating an RSO event in the database");
        }
        
    }
    
    insertintoRSO(RSO, callback){
            var insertRSOqueue = (
                ` 'INSERT INTO event (name,description,type,category,is_Admin) VALUES (?,?,?,?,?)' `
            );
                
            return this.EventsDB.run(insertRSOqueue, [RSO], (err) => {
                callback(err);
            });
    }
    
    selectByRSOName(name, callback){
    
        var selectRSOquery = (
            ` SELECT * FROM RSO WHERE name = ?`
        );
    
        return this.EventsDB.get(selectRSOquery, [name], (err, row) => {
    
            callback(err, row);
    
        });
    };


}

module.exports = DB;