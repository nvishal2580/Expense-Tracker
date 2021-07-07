const express = require('express');
const router = express.Router();
const { Goals } = require('../models/userWiseGoals');

router.get('/', auth, async (req, res) => {
    let userGoalsData = await Goals.findOne({ userId: req.user._id });
    res.send(userGoalsData.transaction.reverse());
})

router.post('/', auth, async (req, res) => {
    console.log(req.user);
    let isUserGoalsExists = await Goals.findOne({ userId: req.user._id });
    if (isUserGoalsExists) {

        let goalsArray = isUserGoalsExists.goals;
        goalsArray.push(req.body);
        const result = await Transaction.findOneAndUpdate({ userId: req.user._id }, { goals: goalsArray });
        goalsArray = goalsArray.reverse();
        res.send(transactionArray);
    } else {
        const { _id, startDate, endDate, amount } = req.body;
        let newGoal = {
            userId: req.user._id,
            goals: [{
                _id,
                startDate,
                endDate,
                amount,
                history: []
            }]
        }
        const newUserGoals = new Goals(newGoal);
        await newUserGoals.save();
        res.send(newGoal.goals);
    }



})
