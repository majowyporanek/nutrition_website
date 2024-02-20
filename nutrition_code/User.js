const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MealPlan = require('./DietPlan')


async function connect() {
    try {
        await mongoose.connect(uri)

        console.log("connected to MongoDB")
    } catch(error){
        console.log(error);
    }
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    age: {type: Number, default: null},
    weight: {type: Number, default: null},
    height: {type: Number, default: null},
    dietPreferences: {type: [String], default: []},
    mealPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan', default: null,
    enum: ['Jesienny', 'Śródziemnomorski', 'Wegetariański']}

})

userSchema.methods.updatePassword = async function (currentPassword, newPassword) {
    const isMatch = await bcrypt.compare(currentPassword, this.password)

    if (!isMatch) {
        throw new Error('Incorrect password')
    }

    this.password = await bcrypt.hash(newPassword, 10)
    await this.save()
}

module.exports = mongoose.model("User", userSchema)