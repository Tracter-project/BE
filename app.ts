import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './src/utility/db';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false })); // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함
app.use(express.json()); // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함

// DB 연결 mongoose 사용시
// connectDB();

// DB 연결 mysql 사용시
// connectDB
// 	.authenticate()
// 	.then(() => {
// 		console.log('connecting DB success');
// 	})
// 	.catch(error => {
// 		console.error('Unable to connect to the database:', error);
// 	});

// PORT
const port: string = process.env.PORT as string;

// run sever
app.listen(port, () => {
	console.log(`Server listening on ${port}`);
});
