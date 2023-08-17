import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false })); // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함
app.use(express.json()); // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함

// DB 연결
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on('connected', () => console.log('connecting DB success'));
db.on('disconnected', () => console.warn('disconnect'));
db.on('error', err => console.error(err));
db.on('reconnectedFailed', () => console.error('reconnect failed'));

// PORT
const port = process.env.PORT as string;
app.listen(port, () => {
	console.log(`Server listening on ${port}`);
});

// api
