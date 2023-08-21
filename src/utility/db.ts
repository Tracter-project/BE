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
