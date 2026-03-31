const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Employee = require('./models/Employee.js');

mongoose.connect('mongodb://127.0.0.1:27017/company');

const port = 3000

app.set('view engine', 'ejs');

const getRandom = (arr) => {
  let rno = Math.floor(Math.random() * arr.length);
  return arr[rno];
}

app.get('/', (req, res) => {
  res.render('index', { foo: 'FOO' });
});

app.get('/generate', async (req, res) => {
  // clear the collection Employee
  await Employee.deleteMany({})
  //Generate random data

  let randomNames = ["Sakshi", "Rahul", "Anjali", "Priya"]
  let randomLang = ["JavaScript", "Python", "Java", "C++"]
  let randomCities = ["Bilaspur", "Moradabad", "Mysore", "Kolkata"]

  for (let index = 0; index < 10; index++) {
    let e = await Employee.create({
      name: getRandom(randomNames),
      salary: Math.floor(Math.random() * 22000),
      language: getRandom(randomLang),
      city: getRandom(randomCities),
      isManager: Math.random() > 0.5
    });

    console.log(e);
  }

  // ✅ IMPORTANT FIX
  res.json({ message: "Data generated successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});