import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/UserEntity';
import { Place } from '../places/PlaceEntity';
import { Article } from '../articles/ArticleEntity';
import { Base } from './BaseEntity';

@Entity('likes')
export class UserLikePlaces extends Base {
	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Article)
	@JoinColumn({ name: 'article_id' })
	article: Article;
}
