import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { PixKeyGrpcGenericError } from '../pix-key-grpc-generic-error';

@Catch(PixKeyGrpcGenericError)
export class PixKeyGrpcUnknownErrorFilter implements ExceptionFilter {
  catch(exception: PixKeyGrpcGenericError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    });
  }
}
