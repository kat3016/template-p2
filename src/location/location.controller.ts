import { Controller, Get, Post, Body, Patch, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { TokenGuard } from 'src/guards/token/token.guard';
import { ConsumeTokenInterceptor } from 'src/guards/token/consume-token.interceptor';

@UseGuards(TokenGuard)
@UseInterceptors(ConsumeTokenInterceptor)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  
}
