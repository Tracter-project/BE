import { Entity, ManyToOne } from 'typeorm';
import { User } from '../users/UserEntity';
import { Place } from '../places/PlaceEntity';
import { Base } from './BaseEntity';

@Entity('likesPlace')
export class UserLikePlaces extends Base {
	@ManyToOne(
		() => User,
		user => {
			user.likedPlaces;
		}
	)
	user: User;

	@ManyToOne(
		() => Place,
		place => {
			place.id;
		}
	)
	place: Place;
}
