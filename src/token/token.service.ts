import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const entity = this.tokenRepo.create(createTokenDto);
    await this.tokenRepo.save(entity);
    return entity;
  }

  async isUsable(idToken: string): Promise<boolean> {
    const token = await this.tokenRepo.findOne({ where: { id: idToken } });
    if (!token) return false;
    return !!(token.active && token.reqLeft > 0);
  }

  async reduceReqLeft(idToken: string) {
    const token = await this.tokenRepo.findOne({ where: { id: idToken } });
    if (!token) return null;
    if (token.reqLeft > 0) token.reqLeft -= 1;
    await this.tokenRepo.save(token);
    return token;
  }
}

