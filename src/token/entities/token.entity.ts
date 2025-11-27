import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: true })
	token?: string;

	@Column({ default: true })
	@Column({ default: true })
	active: boolean;

	@Column({ default: 10 })
	@Column({ default: 10 })
	reqLeft: number;
}
