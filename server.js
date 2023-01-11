const { randomBytes } = require('crypto');
const express = require('express');
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

const uui = () => {
    return Math.floor((1+ Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
app.post('/api/notes', (req,res) => {
    const data = fs.readFileSync('./db/db.json','utf8');
    const reminders = JSON.parse(data);
    const newReminder = {
        ...req.body,
        id: uui()
    };
})

app.listen(PORT);
