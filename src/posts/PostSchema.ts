import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
	subject: string;
	writer: Schema.Types.ObjectId;
	title: string;
	contents: string;
	postLikeCount: number;
	comments: Schema.Types.ObjectId[];
}

// PostSchema
const PostSchema = new Schema<IPost>(
	{
		subject: {
			type: String,
			enum: ['후기', '질문', '기타'],
			required: false,
		},
		writer: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		contents: {
			type: String,
			required: true,
		},
		postLikeCount: {
			type: Number,
			default: 0,
		},
		comments: {
			type: [Schema.Types.ObjectId],
			ref: 'Comment',
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

export default model<IPost>('Post', PostSchema);
