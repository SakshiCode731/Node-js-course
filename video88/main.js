const express = require('express')
const app = express()
const port = 3000

//app.get or app.post or app.put or app.delete(path, handler)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('about us')
})

app.get('/contact', (req, res) => {
    res.send('contact me')
})

app.get('/blog', (req, res) => {
    res.send('blog posts')
})

app.get('/blog/:slug', (req, res) => {
    //logic to fetch {slug} from the database
    // from URL:http://localhost:3000/blog/intro-to-mongo?mode=dark&region=in
    console.log(req.params) // to check the value of slug parameter in the console will output { slug: 'intro-to-python' } if we access /blog/intro-to-python
    // console.log(req.query) // to check the value of query parameters in the console will ouput {mode: 'dark', region: 'in'} if we access /blog/intro-to-mongo?mode=dark&region=in
    res.send(`hello ${req.params.slug} `)
})
//request.prams ek object hota hai jisme hum url ke parameters ko access kar sakte hai, jaise ki yaha par slug parameter ko access kar rahe hai

// app.get('/blog/intro-to-python', (req, res) => { // to replace it we use express to become more easy
//     //logic to fetch intro to python from the database
//     res.send('Intro to Python blog post')
// })

// app.get('/blog/intro-to-javascript', (req, res) => {
//     //logic to fetch intro to javascript from the database
//     res.send('Intro to JavaScript blog post')
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
