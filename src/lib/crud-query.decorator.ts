import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class ICrudQuery {
  find?: any;
  limit?: number;
  page?: number;
  sort?: string | any;
}

export const CrudQuery = createParamDecorator(
  (name = 'query', ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();

    try {
      return JSON.parse(String(req.query[name] || ''));
    } catch (e) {
      return {};
    }
  },
);
