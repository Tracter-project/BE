import { Schema, model, Document } from 'mongoose';

export interface IPlace extends Document {
	placeName: string;
	price: number;
	description: string;
	category: Schema.Types.ObjectId;
	region: '서울' | '강원-강릉' | '전라-여수' | '경상-부산' | '제주';
	likeCount: number;
	bannerImage: string;
	mainImage: string;
	detailImage: string[];
	bookingURL: string;
}

const PlaceSchema = new Schema<IPlace>(
	{
		placeName: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		region: {
			type: String,
			enum: ['서울', '강원-강릉', '전라-여수', '경상-부산', '제주'],
			default: '서울',
		},
		likeCount: {
			type: Number,
			required: false,
		},
		bannerImage: {
			type: String,
			required: true,
		},
		mainImage: {
			type: String,
			required: true,
		},
		detailImage: {
			type: [String],
			required: false,
		},
		bookingURL: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model<IPlace>('Place', PlaceSchema);
