import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../entities/BaseEntity';
import { Place } from '../places/PlaceEntity';

@Entity('images')
export class Image extends Base {
	@Column('varchar', { nullable: true })
	imageUrl: string;

	@Column('varchar', { nullable: true })
	title: string;

	@Column('varchar', { nullable: true })
	description: string;

	@ManyToOne(() => Place, place => place.images)
	@JoinColumn({ name: 'placeId' })
	place: Place;
}
