//dependencies
const path = require('path');
const fs = require('fs');
const { title } = require('process');

// reads the db.json file and returns all saved notes as json
module.exports = (app) => {
    app.get('/public/notes.html', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    //adds notes to the db json and posts them
    app.post('/public/notes.html', (req, res) => {
        let db = fs.readFileSync('../db/db.json');
        db = JSON.parse(db);
        res.json(db);
        //the notes body
        let userNote = {
            title: req.body.title,
            text: req.body.text,
        };

        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);
    });
}