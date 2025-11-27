import { Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { ApiKey } from './entities/api-key.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class ApiKeyService {

  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ){}

   async create(createApiKeyDto: CreateApiKeyDto) {
      try {
      const {profesorId, ...profesorData} = createApiKeyDto

      const profesor = await this.profesorRepository.findOneBy({id: profesorId});
      if (!profesor) {
        throw new Error('Profesor no encontrado');
      }

      const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const apiKey = this.apiKeyRepository.create({
        ...profesorData,
        key,
        profesor: {id: profesorId} ,
      });
      await this.apiKeyRepository.save(apiKey)
      return apiKey;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  findAll() {
    try {
      return this.apiKeyRepository.find({})
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} apiKey`;
  }

  update(id: number, updateApiKeyDto: UpdateApiKeyDto) {
    return `This action updates a #${id} apiKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} apiKey`;
  }
}


