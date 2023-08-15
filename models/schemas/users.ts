import { Schema, model ,Document } from "mongoose";

export interface Iuser extends Document {
    email: string;
    nickname: string;
    password: string;
    likes: Schema.Types.ObjectId;
    role: string;
    isDeleted: boolean;
}

// UserSchema
const UserSchema: Schema<Iuser> = new Schema<Iuser> (
    {
        email : {
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
            ref: "Place",
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
            required: false,
        },
        
    },
    {
        timestamps: true,
    }
)

export default model<Iuser>('User', UserSchema)