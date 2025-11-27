import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  // GET /token/:idToken -> returns boolean (activo && reqLeft>0)
  @Get(':idToken')
  isUsable(@Param('idToken') idToken: string) {
    return this.tokenService.isUsable(idToken);
  }

  // PATCH /token/reduce/:idToken -> reduce reqLeft
  @Patch('reduce/:idToken')
  reduce(@Param('idToken') idToken: string) {
    return this.tokenService.reduceReqLeft(idToken);
  }
}
