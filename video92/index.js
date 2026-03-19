const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let sitename = "Flipkart"
  let searchname = "Search Now"
  let arr = ["sakshi", 54, 65]
  res.render('index', { sitename, searchname, arr })
})

app.get('/blog/:slug', (req, res)=>{
  let blogTitle = "why Flipkarts"
  let blogContent = "Flipkart is the best e-commerce platform in India. It offers a wide range of products at competitive prices. Flipkart also has a great customer service and a user-friendly website."
  res.render('blogpost', { blogTitle, blogContent })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
