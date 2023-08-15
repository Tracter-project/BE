import { Schema ,model, Document } from "mongoose";

export interface Ipost extends Document {
    subject: String;
    user: Schema.Types.ObjectId;
    title: String;
    contents: string;
    // contentImage: ;
    comments: Schema.Types.ObjectId;
}

// PostSchema
const PostSchema: Schema<Ipost> = new Schema<Ipost> (
    {
        subject: {
            type: String,
            enum: ['후기', '질문', '투표'],
            required: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
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
        // contentImage: {},
        comments: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            required: false
        }
    },
    {
        timestamps: true,
    }
)


export default model<Ipost>('Post', PostSchema)