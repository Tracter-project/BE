import { Schema ,model, Document } from "mongoose";

export interface IComment extends Document {
    postId: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    comment: String;
}

// CommentSchema
const CommentSchema: Schema<IComment> = new Schema<IComment> (
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export default model<IComment>('Comment', CommentSchema)