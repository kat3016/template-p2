import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from 'src/api-key/entities/api-key.entity';


@Injectable()
export class ApiTokenGuard implements CanActivate {

    constructor(
        @InjectRepository(ApiKey)
        private readonly apiKeyRepo: Repository<ApiKey>,
    ) {}

    async canActivate(context:ExecutionContext):Promise<boolean> {

        const request = context.switchToHttp().getRequest();

        const apiToken = request.headers['api-token'] as string | undefined;

        // Validar existencia de token
        if (!apiToken || apiToken.trim().length === 0) {
            throw new UnauthorizedException('Falta encabezado api-token');
        }

        // Validar token contra la base de datos (tabla ApiKey)
        const apiKey = await this.apiKeyRepo.findOne({ where: { key: apiToken, isActive: true } });
        if (!apiKey) {
            throw new UnauthorizedException('Token inválido o inactivo');
        }

        // Si son exitosas las validaciones retorne true
        return true;

    }


}
