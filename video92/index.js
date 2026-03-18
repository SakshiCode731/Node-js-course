const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let sitename = "Adidas"
  let serchText = "Search Now"
  let arr = ["hello", 2, 3, 4, 5]

  res.render('index', { sitename, serchText, arr })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})