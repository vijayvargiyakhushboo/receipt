let Sqlite3 = require('sqlite3').verbose();

class Query {
  constructor(db){
     this.db = db;
  }
  
  closeDB(){
    this.db.close();
  }
  
  createStudentTable(){
    this.db.run(`CREATE TABLE IF NOT EXISTS student(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name           TEXT    NOT NULL,
       address        CHAR(50) NOT NULL,
       mobile         INT NOT NULL,
       father         TEXT NOT NULL,
       mother         TEXT NOT NULL
       )`
     );
  }
  createRecieptTable(){
    this.db.run(`CREATE TABLE IF NOT EXISTS receipt (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       studentName    TEXT   NOT NULL,
       section        TEXT   NOT NULL,
       amount         INT    NOT NULL,
       date           TEXT   NOT NULL, 
      
       class        TEXT    NOT NULL,
       feeType      TEXT    NOT NULL
       )`
     );
  }

  insert(tableName ='', keys = [], values =[]){
    let p = new Promise((resolve, reject)=>{
      let columns = keys.map((key) => `${key}`).join(',');
      values = values.map((value) => `'${value}'`).join(',');
      let sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
      this.db.run(sql, [], (err, data)=>{
        if(err) reject(err);
        resolve(data);
      });
    });
    return p;
  }
  
};

module.exports = Query;
