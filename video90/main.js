const express = require('express')
const app = express()
const port = 3000
const blog = require('./routes/blog')
const fs = require('fs')


app.use('/blog', blog)

// app.use(express.static('public'))

//Middleware 1 - Logger for our application
app.use((req, res, next) => {
  console.log(req.headers)
  req.sakshi = "i am sakshi";
  fs.appendFileSync('log.txt', `${Date.now()} is a ${req.method} `) // append to log file
  console.log(`${Date.now()} is a ${req.method} `)
  // res.send("Hacked by Middleware 1") 
  next() 
  
  // when we send rquest request stuck here and never go to next middleware or route handler because we already send response to client
  // it not got o next middleware or route handler request will be stuck here
})

//Middleware 2
app.use((req, res, next) => {
  console.log('m2')
  req.sakshi = "i am sakshi from m2";
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('This is the about page.' + req.sakshi) // we can access sakshi variable in this route handler because we set it in previous middleware
})

app.get('/contact', (req, res) => {
  res.send('This is the contact page.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})