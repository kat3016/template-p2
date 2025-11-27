import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Character } from 'src/character/entities/character.entity';
import { ValidationException } from 'src/common/exceptions/validation.exception';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private readonly locRepo: Repository<Location>,
    @InjectRepository(Character) private readonly charRepo: Repository<Character>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const owner = await this.charRepo.findOne({ where: { id: createLocationDto.ownerId }, relations: ['property'] });
    if (!owner) throw new ValidationException('Owner character not found');
    if (owner.property) throw new ValidationException('Owner already has a property');

    const { ownerId, ...data } = createLocationDto;
    const location = this.locRepo.create({ ...data, owner });
    await this.locRepo.save(location);
    return location;
  }

  async findAll() {
    return this.locRepo.find({ relations: ['favCharacters'] });
  }
}
