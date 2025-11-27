import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get()
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  @UseGuards(ApiTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
    return this.profesorService.update(+id, updateProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}
