require('dotenv').config();

const { json } = require('express');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (err) =>  console.error(err));
db.on('open', () =>  console.log("Connected to database !"));

app.use(express.json());

require('./routes')(app);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})