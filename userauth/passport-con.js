const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initialize(passport, getUserByEmail, getUserById){
    // user authentication
    const authenticateUsers = async (email, password, done) => {
        const user = getUserByEmail(email)

        if(user == null){
            return done(null, false, {message: "Nie znaleziono takiego użytkownika"})
        }

        try {
            //password comparation
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else {
                return done(null, false, {message: "Niepoprawne hasło"})
            }
            
        } catch (e) {
            console.log(e);
            return done(e)
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
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize