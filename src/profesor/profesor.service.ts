import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ){}

  async create(createProfesorDto: CreateProfesorDto) {

    try {
      const profesor = this.profesorRepository.create(createProfesorDto)
      await this.profesorRepository.save(profesor)
      return profesor;
    } catch (error) {
      console.log(error);
      return null;
    }
    
  }

  async findAll() {
     try {
    return await this.profesorRepository.find({})
   } catch (error) {
    console.log(error);
      return null;
   }
  }

  findOne(id: number) {
    return `This action returns a #${id} profesor`;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    try {
      const profesor = await this.profesorRepository.preload({ id, ...updateProfesorDto });
      if (!profesor) {
        return null;
      }
      await this.profesorRepository.save(profesor);
      return profesor;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
