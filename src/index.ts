import express, { Request, Response } from 'express';
import api from './Routes/api';
import mongoose from 'mongoose';
import cors from "cors";
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.use('/', api)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    mongoose.connect('mongodb://localhost:27017/zoesync-be').then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));
});