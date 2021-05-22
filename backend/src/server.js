const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes')

const express = require('express');
const server = express();

mongoose.connect(
    'mongodb+srv://admin:abobrinha123@cluster0.hlp4b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)

server.use(cors())
server.use(express.json())
server.use(routes)
server.listen(process.env.PORT || 3333)