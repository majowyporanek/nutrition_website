//importing libraries that i downloaded
const express = require("express")
const app = express()
const path = require('path')


//routes
app.use(express.static(path.join(__dirname, 'staticpage')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.get('/login', (req, res) =>{
    res.render("login.ejs")
})

app.get('/register', (req, res)=>{
    res.render("register.ejs")
})
//end routes

app.listen(3000)