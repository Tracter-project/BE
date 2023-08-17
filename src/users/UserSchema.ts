import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
	email: string;
	nickname: string;
	password: string;
	likedPlaces: Schema.Types.ObjectId[];
	likedPosts: Schema.Types.ObjectId[];
	role: string;
	isDeleted: boolean;
}

// UserSchema
const UserSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
		},
		nickname: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		likedPlaces: {
			type: [Schema.Types.ObjectId],
			ref: 'Place',
		},
		likedPosts: {
			type: [Schema.Types.ObjectId],
			ref: 'Post',
		},
		role: {
			type: String,
			enum: ['admin', 'member'],
			default: 'member',
			required: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default model<IUser>('User', UserSchema);
