import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/UserEntity';
import { Article } from '../articles/ArticleEntity';
import { Base } from './BaseEntity';
import { Place } from '../places/PlaceEntity';

@Entity('likesArticle')
export class UserLikeArticles extends Base {
	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Article)
	@JoinColumn({ name: 'article_id' })
	article: Article;
	place: Place;
}
