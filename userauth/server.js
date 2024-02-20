//importing libraries that i downloaded
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // load environment variables
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-con");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const ejs = require("ejs");
app.set("view engine", "ejs");
app.use("/public/", express.static("./public"));

const uri =
  "mongodb+srv://majowyporanek:jtpwgdotw0101@nutritionwebsite.6fuodk3.mongodb.net/?retryWrites=true&w=majority";
const User = require("./User");
const { Meal, MealPlan } = require("./DietPlan");
const { ClientRequest } = require("http");
const { use } = require("passport");

// secret key
const crypto = require("crypto");

function generateSecretKey(length) {
  return crypto.randomBytes(length).toString("hex");
}

const secretKey = generateSecretKey(32); // Generate a 32-byte (256-bit) secret key
console.log("Generated Secret Key:", secretKey);

//database
// const users = []

async function connect() {
  try {
    await mongoose.connect(uri);

    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}
mongoose.set("strictQuery", true);
connect();

// database end
// password

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "staticpage")));
app.use(flash());

// Add a secret key for session
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(methodOverride("_method"));

// function inside passport-con.js
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// register in a database
app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    //   console.log(user)
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("pages/index2.ejs", { user: req.user });
  } else {
    res.render("pages/index.ejs");
  }
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.delete("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    req.session.destroy();
    res.redirect("/");
  });
});

app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).send("User not found");
    } else {
      res.redirect("/");
    }
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

// requests to /users/:id
app.get("/userpage/:id", checkAuthenticated, async (req, res) => {
  try {
    // const clientData = await User.findById(req.params.id).populate('mealPlan')

    const clientData = await User.findById(req.params.id).populate({
      path: "mealPlan",
      populate: {
        path: "meals",
      },
    });
    res.render("userpage.ejs", { user: clientData });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.get("/settings/:id", checkAuthenticated, async (req, res) => {
  try {
    const clientData = await User.findById(req.params.id);
    res.render("settings.ejs", { user: clientData });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.post("/settings/:id", async (req, res) => {
  const {
    name,
    email,
    age,
    weight,
    height,
    dietPreferences,
    dietType,
    currentPassword,
    newPassword,
  } = req.body;
  let dietTypeVal = req.body.dietType;
  console.log(dietTypeVal);

  try {
    const user = await User.findById(req.params.id);
    user.name = name;
    user.email = email;
    user.age = age;
    user.weight = weight;
    user.height = height;
    user.dietPreferences = dietPreferences;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        throw new Error("Niezgodne haslo");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.updatePassword(currentPassword, hashedPassword);
    }

    try {
      const dietTypeU = await MealPlan.findOne({ name: dietTypeVal });
      if (!dietTypeU) {
        throw new Error(`Typ diety '${dietTypeVal}' nie znaleziony`);
      }
      // console.log(dietTypeU);
      user.mealPlan = dietTypeU._id;
      user.markModified("mealPlan");
    } catch (err) {
      console.log(err);
    }

    try {
      // console.log("przed zapisem");
      await user.save();
      // console.log(user);
      // console.log("po zapisie");
      // console.log(user);
    } catch (err) {
      log("Blad zapisu: ", err);
    }

    console.log("Haslo zaaktualizowane");
    res.redirect("/userpage/" + user.id);
  } catch (err) {
    console.log(err);
  }
});

//end routes

//authentication

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(3000);
