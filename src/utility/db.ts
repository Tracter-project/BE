import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = () => {
	mongoose.connect(process.env.MONGODB);
	const db = mongoose.connection;

	db.on('connected', () => console.log('connecting DB success'));
	db.on('disconnected', () => console.warn('disconnect'));
	db.on('error', err => {
		console.error(err);
		process.exit(1);
	});
	db.on('reconnectedFailed', () => console.error('reconnect failed'));
};

// import { Sequelize } from 'sequelize';
// import deotenv from 'dotenv';

// deotenv.config();

// export const connectDB = new Sequelize({
// 	host: process.env.DB_HOST,
// 	username: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME,
// });
