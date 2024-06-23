//dependencies
const express = require('express');
const path = require('path');


module.exports = (app => {
    //gets the static files from the public directory
    app.use(express.static(path.join(__dirname, '../public')));
    //getting the notes html
    app.get('./notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

});