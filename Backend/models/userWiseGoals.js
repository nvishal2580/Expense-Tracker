const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    userId: String,
    goals: Array
});



const Goals = mongoose.model('userWiseGoals', Schema);


module.exports.Goals = Goals;
