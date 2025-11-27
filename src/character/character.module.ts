import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { Token } from 'src/token/entities/token.entity';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [TypeOrmModule.forFeature([Character, Location, Token]), TokenModule]
})
export class CharacterModule {}
