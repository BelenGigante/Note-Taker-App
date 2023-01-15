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
    const remindersPar = JSON.parse(data);
    res.json(remindersPar);
});

// const uui = () => {
//     return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
// };
app.post('/api/notes', (req,res) => {
    const data = fs.readFileSync('./db/db.json','utf8');
    const remindersPar = JSON.parse(data);
    const newReminder = {
        ...req.body,
        //reminderId: uui()
    };
    remindersPar.push(newReminder);
    const  remindersStr = JSON.stringify(remindersPar,null,2);
    fs.writeFileSync('./db/db.json', remindersStr);
    res.json('Reminder Saved');
});

// app.delete('/api/notes/:reminderId',(req,res) =>{
//     const data = fs.readFileSync('./db/db.json','utf8');
//     // const remindersPar = JSON.parse(data).filter(note=> note.id === req.params.reminderId);
//     const  remindersStr = JSON.stringify(notes,null,2);
//     fs.writeFileSync('./db/db.json', remindersStr);
//     res.json('Reminder Deleted');
// });


app.listen(PORT);
