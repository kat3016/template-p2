import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Token } from './entities/token.entity';
import { TokenGuard } from 'src/guards/token/token.guard';
import { ConsumeTokenInterceptor } from 'src/guards/token/consume-token.interceptor';

@Module({
  controllers: [TokenController],
  providers: [TokenService, TokenGuard, ConsumeTokenInterceptor],
  imports: [TypeOrmModule.forFeature([Token])],
  exports: [TokenGuard, ConsumeTokenInterceptor]
})
export class TokenModule {}
