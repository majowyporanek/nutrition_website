const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const User = require("./User")

function initialize(passport, getUserByEmail, getUserById){
    // user authentication
    const authenticateUsers = async (email, password, done) => {
        try {
            const user = await User.findOne({email: email})

            if(!user){
                return done(null, false, {message: "Nie znaleziono takiego użytkownika"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return done(null,false, {message: "Incorrect password"} )
            }

            return done(null, user)
        }catch(err){
            return done(err)
        }
    }

    passport.use(new localStrategy({usernameField: 'email'}, authenticateUsers))

    // serialize and deserialize -> maintain a user's authentication session and make easy for the app
    // to authenticate and authorize the user in subswquent req


    // when user logs in to web app
    // identify the user
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    // to retrieves the user obj associated with his identifier
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        }catch(err){
            return done(err)
        }
    })
}

module.exports = initialize