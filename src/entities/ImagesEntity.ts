import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './BaseEntity';
import { Place } from '../places/PlaceEntity';

@Entity('images')
export class Image extends Base {
	@Column('varchar', { nullable: false })
	imageUrl: string;

	@ManyToOne(() => Place, place => place.images)
	@JoinColumn({ name: 'placeId' })
	place: Place;
}
