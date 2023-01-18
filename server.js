const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//-------------------
app.get('/api/index', (req, res) => {
    const data = fs.readFileSync('./db/db.json', 'utf8');
    const remindersPar = JSON.parse(data);
    res.json(remindersPar);
});
//-------------------

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    console.log("Getting all notes")
    const data = fs.readFileSync('./db/db.json', 'utf8');
    console.log(data)
    const remindersPar = JSON.parse(data);
    console.log("+++++++++")
    console.log(remindersPar)
    res.json(remindersPar);
});

const uui = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};
app.post('/api/notes', (req, res) => {
    console.log("Posting notes")
    const data = fs.readFileSync('./db/db.json', 'utf8');
    console.log(data)
    const remindersPar = JSON.parse(data);
    console.log("+++++++++")
    console.log(remindersPar)
    const newReminder = {
        ...req.body,
        id: uui()
    };
    console.log(newReminder)
    remindersPar.push(newReminder);
    const remindersStr = JSON.stringify(remindersPar, null, 2);
    fs.writeFileSync('./db/db.json', remindersStr);
    res.json('Reminder Saved');
});

app.delete('/api/notes/:id', (req, res) => {
    console.log("Deleted by id")
    console.log(req.params)
    const data = fs.readFileSync('./db/db.json', 'utf8');
    const remindersPar = JSON.parse(data);
    console.log("==================")
    console.log(remindersPar)
    var newArr = remindersPar.filter(reminder => reminder.id != req.params.id);
    console.log("äfter the fact ********************")
    console.log(newArr)
    const remindersStr = JSON.stringify(newArr, null, 2);
    fs.writeFileSync('./db/db.json', remindersStr);
    res.json('Reminder Deleted');
});


app.listen(PORT, () => console.log('runing at port 3001'));
