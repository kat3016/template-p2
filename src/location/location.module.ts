import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from './entities/location.entity';
import { Character } from 'src/character/entities/character.entity';
import { TokenModule } from 'src/token/token.module';
import { Token } from 'src/token/entities/token.entity';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [TypeOrmModule.forFeature([Location, Character, Token]), TokenModule]
})
export class LocationModule {}
