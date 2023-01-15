const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req,res) =>{
    const data = fs.readFileSync('./db/db.json', 'utf8');
    const reminders = JSON.parse(data);
    res.json(reminders);
});

const uui = () => {
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
};
app.post('/api/notes', (req,res) => {
    const data = fs.readFileSync('./db/db.json','utf8');
    const reminders = JSON.parse(data);
    const newReminder = {
        ...req.body,
        id: uui()
    };
    reminders.push(newReminder);
    const  remindersStr = JSON.stringify(reminders,null,2);
    fs.writeFileSync('./bd/bd.json', remindersStr);
    res.json('Reminder Saved');
});

app.delete('/api/notes/:id',(req,res) =>{
    const data = fs.readFileSync('./db/db.json','utf8');
    const reminders = JSON.parse(data).filter(reminder=> reminder.id === req.params.id);
    const  remindersStr = JSON.stringify(reminders,null,2);
    fs.writeFileSync('./db/db.json', remindersStr);
    res.json('Reminder Deleted');
});


app.listen(PORT);
