import { Controller, Get } from '@nestjs/common';

@Controller('health') // health 경로 prefix 사용하는 컨트롤러
export class HealthCheckController {
  @Get()
  findAll(): string {
    return 'HealthCheck Complete';
  }
}
