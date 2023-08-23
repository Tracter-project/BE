// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// export const connectDB = () => {
// 	mongoose.connect(process.env.MONGODB);
// 	const db = mongoose.connection;

// 	db.on('connected', () => console.log('connecting DB success'));
// 	db.on('disconnected', () => console.warn('disconnect'));
// 	db.on('error', err => {
// 		console.error(err);
// 		process.exit(1);
// 	});
// 	db.on('reconnectedFailed', () => console.error('reconnect failed'));
// };

// import { Sequelize } from 'sequelize';
// import deotenv from 'dotenv';

// deotenv.config();

// export const connectDB = new Sequelize({
// 	dialect: 'mysql',
// 	host: process.env.DB_HOST,
// 	username: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME,
// });

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './users/UserEntity';
import { PlaceEntity } from './places/PlaceEntity';
import { PostEntity } from './posts/PostEntity';
import { CategoryEntity } from './categories/CategoryEntity';
import { CommentEntity } from './comments/CommentEntity';
import deotenv from 'dotenv';

deotenv.config();

export const connectDB = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [
		UserEntity,
		PlaceEntity,
		PostEntity,
		CommentEntity,
		CategoryEntity,
	],
	synchronize: true,
	logging: ['warn', 'error'],
	migrations: [],
	subscribers: [],
});
