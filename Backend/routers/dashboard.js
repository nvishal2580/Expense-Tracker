const express = require('express');
const { Transaction } = require('../models/userWiseTransaction');
const router = express.Router();
const auth = require('../middleware/auth');
const mongoose = require('mongoose');



router.get('/', auth, async (req, res) => {
    let userTransactionData = await Transaction.findOne({ userId: req.user._id });
    res.send(userTransactionData.transaction.reverse());
})

router.post('/', auth, async (req, res) => {
    console.log(req.user);
    let isUserTransactionExist = await Transaction.findOne({ userId: req.user._id });
    if (isUserTransactionExist) {

        let transactionArray = isUserTransactionExist.transaction;
        transactionArray.push(req.body);
        const result = await Transaction.findOneAndUpdate({ userId: req.user._id }, { transaction: transactionArray });
        transactionArray = transactionArray.reverse();
        res.send(transactionArray);
    } else {
        const { _id, title, date, amount } = req.body;
        let newTrasaction = {
            userId: req.user._id,
            transaction: [{
                _id: _id,
                title: title,
                amount: amount,
                date: date
            }]
        }
        const newUserTrasaction = new Transaction(newTrasaction);
        await newUserTrasaction.save();
        res.send(newTrasaction.transaction);
    }



})


router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    let userTransactionData = await Transaction.findOne({ userId: req.user._id });
    let transactionArray = userTransactionData.transaction;
    transactionArray = transactionArray.filter(transaction => transaction._id !== id);

    const result = await Transaction.findOneAndUpdate({ userId: req.user._id }, { transaction: transactionArray });
    res.send(transactionArray.reverse());
})

module.exports = router;