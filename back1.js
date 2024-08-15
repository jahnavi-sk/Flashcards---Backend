// creating a table !


// var mysql = require('mysql2')

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root1234!",
//     database: "mydb"

// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE cards (card_id INT PRIMARY KEY, word VARCHAR(255),type VARCHAR(10), definition TEXT, example TEXT)";
//     con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
//   });

const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3001;

const db = mysql.createConnection({
    host:"localhost",
    user:"user",
    password:"pwd",
    database:"mydb"
});

db.connect((err)=>{
    if(err){
        console.log('Error connecting to the database');
    }

    console.log("Connected to SQL db!")
})

app.get('/api/cards', (req,res)=>{
    const query = 'SELECT card_id,word,type,definition,example FROM cards';

    db.query(query, (err,results)=>{
        if(err){
            console.log("Error executing query");
            res.json("Error executing query!")
            res.status(500).send("Database Error");
            return;
        }

        res.json(results)
    })
})

app.listen(port, ()=>{
    console.log("Server is running!")
})