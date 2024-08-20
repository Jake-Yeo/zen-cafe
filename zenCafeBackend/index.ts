const express = require('express');
import mongoose from 'mongoose';
const app = express();

require('dotenv').config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => { // get method
    res.send("Hello from node api");
});

const productRoute = require('./routes/productRoute');
app.use('/api/products', productRoute);

import chatroomRouter from './routes/chatroomRoute';
app.use('/chatrooms', chatroomRouter);

import userRouter from './routes/userRoute';
app.use('/users', userRouter);

import zcByteVaultRouter from './routes/zcByteVaultRoute';
app.use('/zcByteVault', zcByteVaultRouter);

// cannot push this file because this has api key!
mongoose.connect(mongoUri)
    .then(() => {
        console.log("connected to mongodb")
        app.listen(port, () => {
            console.log("running on port ", port);
        });
    })
    .catch(() => { console.log("connection to mongodb failed") });

export { }