import { Module } from '@nestjs/common';
import { MyLogger } from './my-logger.service';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Module({
  providers: [MyLogger],
  exports: [MyLogger]
})
export class LoggerModule {}

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
    
      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
      this.logger.log(['request', request.body]);
      this.logger.log(['response', response.statusMessage   ]);
    });

    next();
  }
}