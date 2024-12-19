import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

// backend/index.js
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
const app = express();
const port = 8080;

// Middleware
app.use(cors);
app.use(express.json());

// MySQL Database connection
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root', 
    password: '441610', 
    database: 'mydb',
}).promise()

export async function getRecord() {
  const [rows] = await pool.query("SELECT * FROM recordings")
  return rows
}

export async function getRecordById(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM recordings
  WHERE recordId = ?
  `, [id])
  return rows[0]
}

export async function createRecord(workname,category,status) {
  const [result] = await pool.query(`
  INSERT INTO notes (workName,category,status)
  VALUES (?,?,?)
  `, [workname,category,status])
  const id = result.insertId
  return getRecordById(id)
}

// const db = mysql.createConnection({
//     host: '127.0.0.1',
//     port: '3306',
//     user: 'root', 
//     password: '441610', 
//     database: 'mydb',
//   });

// Check MySQL connection
// db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err.stack);
//       return;
//     }
//     console.log('Connected to MySQL database');
//   });
  
  // route to get data from the database
  // app.get('/', async (req, res) => {
  //   await db.query('SELECT * FROM mydb.recordings', (err, results) => {
  //     if (err) {
  //       console.error('Error fetching recordings:', err);
  //       res.status(500).send('Error fetching recordings');
  //       return;
  //     }
  //     return res.json(results);
  //   });
  // });

  // // Example route to get data from the database
  // app.get('/api/recordings', async (req, res) => {
  //   await db.query('SELECT * FROM mydb.recordings', (err, results) => {
  //     if (err) {
  //       console.error('Error fetching recordings:', err);
  //       res.status(500).send('Error fetching recordings');
  //       return;
  //     }
  //     return res.json(results);

      // if (error) throw error;
      //   console.log('response:', response);

      //   console.log('result: ', response) //works fine

      //   res.status(200).json({
      //       message: 'Data from Database :',
      //       result: response
      //   });
  //   });
  // });
  
  // Start server



// // backend/index.js
// const { Sequelize, DataTypes } = require('sequelize');
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Set up Sequelize connection
// const sequelize = new Sequelize('mydb', 'root', '441610', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// // Define User model
// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// sequelize.sync();  // Sync models with the database

// // Example route to get users
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).send('Error fetching users');
//   }
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

app.get("/recordings", async (req, res) => {
  const records = await getRecord()
  res.send(records)
})

app.get("/recordings/:id", async (req, res) => {
  const id = req.params.id
  const record = await getRecordById(id)
  res.send(record)
})

app.post("/recordings", async (req, res) => {
  const { workname,category,status } = req.body
  const record = await createRecord(workname,category,status)
  res.status(201).send(record)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something wrong')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.listen(5000, () => {
//   console.log('Server is running on port 5000')
// })