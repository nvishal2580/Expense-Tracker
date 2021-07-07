const mongoose = require("mongoose");
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    date: String
});



const Transaction = mongoose.model('users', userSchema);

function validateTransaction(transaction) {
    const schema = Joi.object({

        title: Joi.string().min(1).max(255).required(),
        amount: Joi.number().required(),
        date: Joi.string().required()
    });
    const result = schema.validate(transaction);
    return result;
}

module.exports.Transaction = Transaction;
module.exports.validateTransaction = validateTransaction;
