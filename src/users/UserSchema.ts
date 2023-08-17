import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
	email: string;
	nickname: string;
	password: string;
	likes: Schema.Types.ObjectId;
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
		likes: {
			type: Schema.Types.ObjectId,
			ref: 'Place',
			required: false,
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
