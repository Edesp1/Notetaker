//dependencies
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

//easier to put paths instead of repeating it over and over
const dbPath = path.join(__dirname, '../db/db.json');

// reads the db.json file and returns all saved notes as json
module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.sendFile(dbPath);
    });

    //adds notes to the db json and posts them
    app.post('/api/notes', (req, res) => {
        //debugging
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if(err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to read data from the database.' });
                return;
            }
            const db = JSON.parse(data);
            //the notes body, the id property makes a unique id for each new note
            let userNote = {
                title: req.body.title,
                text: req.body.text,
                id: uniqid(),
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
    //delete the posted notes
    app.delete('/api/notes/:id', (req, res) => {
        //error handling
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to read data from the database.' });
            }
            let db = JSON.parse(data);
            //filteres the notes to check which to delete
            const deleteNotes = db.filter(item => item.id !== req.params.id);
            //writes in the db the updated version if deleted while also handling errors
            fs.writeFile(dbPath, JSON.stringify(deleteNotes), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Failed to write data to the database.' });
                }
                res.json(deleteNotes);
            });
        });
    });
};
