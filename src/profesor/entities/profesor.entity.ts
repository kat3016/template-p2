import { ApiKey } from "src/api-key/entities/api-key.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Profesor {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nombre: string

    @OneToMany(() => ApiKey, apiKey => apiKey.profesor)
    apiKeys: ApiKey[]
}