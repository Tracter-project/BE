import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/UserEntity';
import { Article } from '../articles/ArticleEntity';
import { Base } from './BaseEntity';

@Entity('likesArticle')
export class UserLikeArticles extends Base {
	@ManyToOne(
		() => User,
		user => {
			user.likedArticles;
		}
	)
	user: User;

	@ManyToOne(
		() => Article,
		article => {
			article.id;
		}
	)
	article: Article;
}
