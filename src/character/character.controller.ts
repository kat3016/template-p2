import { Controller, Get, Post, Body, Patch, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { TokenGuard } from 'src/guards/token/token.guard';
import { ConsumeTokenInterceptor } from 'src/guards/token/consume-token.interceptor';

@UseGuards(TokenGuard)
@UseInterceptors(ConsumeTokenInterceptor)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }
  


  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  
  @Patch(':id/favorites/:locationId')
  favorite(@Param('id') id: string, @Param('locationId') locationId: string) {
    return this.characterService.addFavorite(+id, +locationId);
  }

  @Get(':id/taxes')
  taxes(@Param('id') id: string) {
    return this.characterService.taxes(+id);
  }
}
