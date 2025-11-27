import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { ValidationException } from 'src/common/exceptions/validation.exception';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character) private readonly charRepo: Repository<Character>,
    @InjectRepository(Location) private readonly locRepo: Repository<Location>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const entity = this.charRepo.create(createCharacterDto);
    await this.charRepo.save(entity);
    return entity;
  }

  async findAll() {
    return this.charRepo.find({ relations: ['property', 'favPlaces'] });
  }

  async addFavorite(characterId: number, locationId: number) {
    const [character, location] = await Promise.all([
      this.charRepo.findOne({ where: { id: characterId }, relations: ['favPlaces'] }),
      this.locRepo.findOne({ where: { id: locationId } }),
    ]);
    if (!character) throw new ValidationException('Character not found');
    if (!location) throw new ValidationException('Location not found');

    character.favPlaces = character.favPlaces || [];
    const already = character.favPlaces.find((l) => l.id === location.id);
    if (!already) character.favPlaces.push(location);
    await this.charRepo.save(character);
    return character;
  }

  async taxes(characterId: number) {
    const character = await this.charRepo.findOne({ where: { id: characterId }, relations: ['property'] });
    if (!character) throw new ValidationException('Character not found');
    if (!character.property) return { taxDebt: 0 };

    const coef = character.employee ? 0.08 : 0.03;
    const taxDebt = character.property.cost * (1 + coef);
    return { taxDebt };
  }
}
