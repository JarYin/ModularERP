import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { POSITIONS_KEY } from '../decorators/positions.decorator';

@Injectable()
export class JobPositionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPositions = this.reflector.getAllAndOverride<string[]>(POSITIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPositions) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredPositions.some((pos) => user.positions?.includes(pos));
  }
}
