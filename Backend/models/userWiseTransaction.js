const mongoose = require("mongoose");
const Joi = require('joi');
const Schema = new mongoose.Schema({
    userId: String,
    transaction: Array
});



const Transaction = mongoose.model('userWiseTrasaction', Schema);


module.exports.Transaction = Transaction;
