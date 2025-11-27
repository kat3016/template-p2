import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';


@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  salary: number;

  @Column()
  employee: boolean;

 
  @OneToOne(() => Location, (loc) => loc.owner, { nullable: true })
  @JoinColumn()
  
  property: Location;


  @ManyToMany(() => Location, (loc) => loc.favCharacters, { cascade: true })
  @JoinTable()

  favPlaces: Location[];
}

