import Post, { IPost } from './PostSchema';

export class PostService {
    
    static instance: PostService;

    constructor() {
        if (PostService.instance) {
            return PostService.instance;
        }
    PostService.instance = this;
    }

    static async createPost(postData: IPost) {
        try {
            const newPost: IPost = new Post(postData);
            return await newPost.save();
            
        } catch(error) {
            throw error;
        }
    }
}