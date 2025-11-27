import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, tap } from 'rxjs';
import { Repository } from 'typeorm';
import { Token } from 'src/token/entities/token.entity';

@Injectable()
export class ConsumeTokenInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const tokenId: string | undefined = req.__tokenId || req.headers['token'];

    return next.handle().pipe(
      tap(async () => {
        if (!tokenId) return;
        const token = await this.tokenRepo.findOne({ where: { id: tokenId } });
        if (!token) return;
        if (token.reqLeft > 0) {
          token.reqLeft -= 1;
          await this.tokenRepo.save(token);
        }
      }),
    );
  }
}
