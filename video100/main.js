const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Employee = require('./models/Employee.js');

mongoose.connect('mongodb://127.0.0.1:27017/company');
const port = 3000

app.set('view engine', 'ejs');

const getRandom = (arr)=>{
  let rno = Math.floor(Math.random() * arr.length - 1);
  return arr[rno]
}

app.get('/', (req, res) => {
  res.render('index', { foo: 'FOO' });
});

app.get('/generate', async (req, res) => {
  //generate random data

  let randomNames = ["Sakshi", "Rahul", "Anjali", "priya"]
  let randomLang = ["JavaScript", "Python", "Java", "C++"]
  let randomCities = ["Bilaspur", "Moradabad", "Mysore", "kolkata"]
  for (let index = 0; index < 10; index++) {
    let e = await Employee.create({
      name: "Sakshi",
      salary: 450000,
      language: "JavaScript",
      city: "New York",
      isManager: true
    })

   console.log(e);

  }
  res.render('index', { foo: 'FOO' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
