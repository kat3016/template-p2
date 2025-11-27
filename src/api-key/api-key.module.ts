import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { ApiKey } from './entities/api-key.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  controllers: [ApiKeyController],
  providers: [ApiKeyService, ApiTokenGuard],
  imports: [TypeOrmModule.forFeature([ApiKey, Profesor])]
})
export class ApiKeyModule {}
