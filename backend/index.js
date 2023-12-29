const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

// db
const conn = require('./db/conn');

const user = require('./models/User');

// cors
app.use(cors());

// routes
const userRoute = require('./routes/userRoute');

app.use('/', userRoute);

// server
conn.sync()
    .then(() => app.listen(3000, console.log('> Server on: http://localhost:3000')))
    .catch((err) => console.log(`Sync Error: ${err}`));