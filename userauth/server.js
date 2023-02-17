//importing libraries that i downloaded
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config() // load environment variables
}


const express = require("express")
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const passport = require("passport")
const initializePassport = require("./passport-con")
const flash = require("express-flash")
const session = require("express-session")
//????
const ejs = require('ejs');
app.set('view engine', 'ejs')


initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )

//temp 'database'
const users = []

app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'staticpage')))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))

// function inside passport-con.js
app.use(passport.initialize())
app.use(passport.session())



app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: "/login",
    failureFlash: true 
}))


// register part
app.post("/register", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users)
        res.redirect("/login")
    } catch(e) {
        console.log(e);
        res.redirect("/register")
    }
})



//routes
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'static', 'index.html'))
    res.render('pages/index.ejs')
})

app.get('/login', (req, res) =>{
    res.render("login.ejs")
})

app.get('/register', (req, res)=>{
    res.render("register.ejs")
})
//end routes

app.listen(3000)