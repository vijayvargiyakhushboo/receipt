let Query = require('./query.js');
let sqlite3 = require('sqlite3').verbose();
const {app} = require('electron').remote;
const path = require('path');
let dir = app.getPath("appData");
let dbPath = path.join(dir, 'reciept.db');
let db = new sqlite3.Database(dbPath);
let q = new Query(db);
let ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('close-db', (event, message) => {
 db.close((err)=>{
   if(err) console.log('an error occured while closing db');
 });
 ipcRenderer.send('closed-db', 'thanks');
});

q.createStudentTable();
q.createRecieptTable();
