import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
	categoryName: string;
}

const CategorySchema = new Schema<ICategory>({
	categoryName: { type: String, required: true },
});

export default model<ICategory>('Category', CategorySchema);
