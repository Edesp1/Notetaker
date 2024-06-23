//dependencies
const path = require('path');
const fs = require('fs');

// reads the db.json file and returns all saved notes as json
module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    //adds notes to the db json and posts them
    app.post('/api/notes', (req, res) => {
        const dbPath = path.join(__dirname, '../db/db.json');
        //debugging
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if(err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to read data from the database.' });
                return;
            }
            const db = JSON.parse(data);
            //the notes body
            let userNote = {
                title: req.body.title,
                text: req.body.text,
            };
    
            //adds new notes
            db.push(userNote);
    
            //updates the db.json file with the updated notes
            fs.writeFile(dbPath, JSON.stringify(db), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to write data to the database.' });
                    return;
                }
                //returns update notes
            res.json(db);
            });
        }); 
    });
};
