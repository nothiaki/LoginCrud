import express from 'express';
import cors from 'cors';
import { conn } from './db/conn.js'
import userRoute from './routes/userRoute.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', userRoute);

conn.sync()
    .then(() => app.listen(3000, console.log('> Server on: http://localhost:3000')))
    .catch((err) => console.log(`Sync Error: ${err}`));