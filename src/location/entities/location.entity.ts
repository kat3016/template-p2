import { Character } from 'src/character/entities/character.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany } from 'typeorm';


@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('float')
  cost: number;

  
  @OneToOne(() => Character, (char) => char.property)
  owner: Character;


  @ManyToMany(() => Character, (char) => char.favPlaces)
  favCharacters: Character[];
}
