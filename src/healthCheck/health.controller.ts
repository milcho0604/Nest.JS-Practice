import { Controller, Get, Post } from '@nestjs/common';

@Controller('health') // health 경로 prefix 사용하는 컨트롤러
export class HealthCheckController {
  @Get('check')
  healCheckController(): string {
    return 'HealthCheck Complete';
  }

  @Post('server')
  healthCheckServerController(): string {
    const msg = 'ok';
    if (msg) {
      return 'server checking: ' + msg;
    } else {
      return 'server checking: ' + 'down';
    }
  }
}
