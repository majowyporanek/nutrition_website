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
const methodOverride = require("method-override") 
//????
const ejs = require('ejs');
const { off } = require("process")
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

app.use(methodOverride("_method"))

// function inside passport-con.js
app.use(passport.initialize())
app.use(passport.session())



app.post('/login',checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: "/login",
    failureFlash: true 
}))


// register part
app.post("/register",checkNotAuthenticated, async(req, res) => {
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
    if(req.isAuthenticated()){
        res.render('pages/index2.ejs')
    }else {
        res.render('pages/index.ejs')
    }
})

app.get('/login', checkNotAuthenticated, (req, res) =>{
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated,(req, res)=>{
    res.render("register.ejs")
})
//end routes

// app.delete("logout", (req, res) => {
//     req.logOut()
//     res.redirect("/")
// })

app.delete('/logout', (req, res) => {
    req.logout(req.user, err =>{
        if(err) return next(err)
        res.redirect("/")
    })
    // res.redirect('/');
  });


function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

app.listen(3000)