import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';
import { ApiKey } from 'src/api-key/entities/api-key.entity';

@Module({
  controllers: [ProfesorController],
  providers: [ProfesorService, ApiTokenGuard],
  imports: [TypeOrmModule.forFeature([Profesor, ApiKey])]
})
export class ProfesorModule {}
