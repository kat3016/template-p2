import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class ApiKey {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({unique:true})
    key: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date
    
    @Column({default:true})
    isActive: boolean

    @ManyToOne(() => Profesor, profesor => profesor.apiKeys)
    profesor: Profesor







}
