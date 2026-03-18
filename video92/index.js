const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let sitename = "Adidas"
  let serchText = "Search Now"
  let arr = ["hello", 2, 3, 4, 5]
  res.render('index', { sitename: sitename, serchText: serchText,  arr })
})

app.get('/blog/:slug', (req, res) => {
  let blogtitle = "Adidas why and when?"
  let blogcontent = "its a sports brand"
  res.render('blogpost', { blogtitle: blogtitle, blogcontent: blogcontent })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
