import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { QueryFailedError } from 'typeorm';

export class DatabaseErrorHandlerInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (!(error instanceof QueryFailedError)) throw error;
        const code =
          (error.driverError as { code: string }).code ||
          (error as unknown as { code: string }).code;
        switch (code) {
          case '23505':
            throw new ConflictException();
          default:
            throw new InternalServerErrorException();
        }
      }),
    );
  }
}
