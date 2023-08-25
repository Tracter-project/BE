// import { Entity, ManyToOne, JoinColumn } from 'typeorm';
// import { User } from '../users/UserEntity';
// import { Place } from '../places/PlaceEntity';
// import { Post } from '../posts/PostEntity';
// import { Base } from './BaseEntity';

// @Entity('likes')
// export class LikeEntity extends Base {
// 	@ManyToOne(() => User)
// 	@JoinColumn({ name: 'user_id' })
// 	user: User;

// 	@ManyToOne(() => Post)
// 	@JoinColumn({ name: 'post_id' })
// 	post: Post;
// }
