const EventsDB = require('../db');

class Events {

    constructor() {
        this.createEvents();
    }

//this is a async function that we've created to handle our asynchronously queuries
runAysnc(sql) {

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

async createEvents() 
    {   
    
    try {
        var createEventstable = (
                `CREATE TABLE IF NOT EXISTS Events(
                Eventid integer PRIMARY KEY, 
                name text,
                decription text,
                type, text,
                category text,
                time, integer,
                date integer,
                is_Admin integer,
                count_email integer,
                count_phone integer
                )`
    );

    return await this.EventsDB.runAysnc(createEventstable);
    }
    catch(err){
        console.log("There was a problem creating our table for events: " + JSON.stringify(err));
    }

}

insertEvents(Event, callback){
        var insertEVentsqueuey = (
            ` 'INSERT INTO Events (name,description,type,category,is_Admin) VALUES (?,?,?,?,?)' `
        );

        return this.EventsDB.run(insertEVentsqueuey, [Event], (err) => {
            callback(err);
        });
}

selectByEventName(name, callback){
    var selectEventquery = (
        ` SELECT * FROM Events WHERE name = ?`
    );

    return this.EventsDB.get(selectEventquery, [name], (err, row) => {

        callback(err, row);

    });
};

}



module.exports = EventsDB;


