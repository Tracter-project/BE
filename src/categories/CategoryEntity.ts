import { Place } from '../places/PlaceEntity';
import { Base } from '../entities/BaseEntity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('categories')
export class Category extends Base {
	@Column('varchar', { nullable: false })
	categoryName: string;

	@OneToMany(() => Place, place => place.category)
	places: Place[];
}
