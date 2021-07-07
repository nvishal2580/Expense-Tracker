const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routers/users');
const auth = require('./routers/auth');
const dashboard = require('./routers/dashboard');
const cors = require('cors');
const mongoURI = 'mongodb+srv://vishal:vishal@expense-tracker.g9x7o.mongodb.net/test?retryWrites=true&w=majority';



mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb...'))
    .catch((err) => console.log('could not connected..', err));

app.use(cors());
app.use(express.json());
app.use('/users', users);
app.use('/login', auth);
app.use('/dashboard', dashboard);

app.get('/', (req, res) => {
    res.send('hello');
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})
