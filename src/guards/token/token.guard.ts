import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/token/entities/token.entity';
import { ValidationException } from 'src/common/exceptions/validation.exception';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const headerToken: string | undefined = req.headers['token'];

    if (!headerToken || typeof headerToken !== 'string' || headerToken.trim().length === 0) {
      throw new ValidationException('Falta header token');
    }

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(headerToken);
    const token = isUuid
      ? await this.tokenRepo.findOne({ where: { id: headerToken } })
      : await this.tokenRepo.findOne({ where: { token: headerToken } });

    if (!token) throw new ValidationException('Token no existe');
    if (!(token.active && token.reqLeft > 0)) throw new UnauthorizedException('Token inválido o sin solicitudes disponibles');

    req.__tokenId = token.id;
    return true;
  }
}
