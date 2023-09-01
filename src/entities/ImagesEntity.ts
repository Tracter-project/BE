import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './BaseEntity';
import { Place } from '../places/PlaceEntity';

@Entity('images')
export class Image extends Base {
	@Column('text', { nullable: true })
	imageUrl: string;

	@Column('varchar', { nullable: true })
	title: string;

	@Column('text', { nullable: true })
	description: string;

	@ManyToOne(() => Place, place => place.images)
	@JoinColumn({ name: 'placeId' })
	place: Place;
}
