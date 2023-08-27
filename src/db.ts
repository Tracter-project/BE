import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/UserEntity';
import { Place } from './places/PlaceEntity';
import { Article } from './articles/ArticleEntity';
import { Comment } from './comments/CommentEntity';
import { Category } from './categories/CategoryEntity';
import { Image } from './entities/ImagesEntity';
import { UserLikePlaces } from './entities/UserPlaceLikeEntity';
import { UserLikePosts } from './entities/UserPostLikeEntity';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [
		User,
		Place,
		Article,
		Comment,
		Category,
		Image,
		UserLikePlaces,
		UserLikePosts,
	],
	synchronize: true,
	logging: ['warn', 'error'],
	migrations: [],
	subscribers: [],
});
