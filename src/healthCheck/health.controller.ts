import { Body, Controller, Get, HttpCode, Ip, Param, Post, Query, Redirect, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('health') // health 경로 prefix 사용하는 컨트롤러
export class HealthCheckController {
  // localhost:3100/health/check
  @Get('check')
  healCheckController(): string {
    return 'HealthCheck Complete';
  }

  // http://localhost:3100/health/server?msg=ok
  @Post('server')
  healthCheckServerController(@Query('msg') msg: string) {
    if (msg === 'ok') {
      return 'server checking: ' + msg;
    } else {
      return 'server checking: ' + msg;
    }
  }

  @Post('req')
  // request: Request 파라미터와 같이 express 타입을 활용하려면 @types/express 패키지를 설치해야 함
  // - GET → query, params, headers 등 사용
  // - POST → body 사용 가능
  // 권장되지 않는 방시
  healthCheckReqController(@Req() request: Request): string {
    const method = request.method;
    const url = request.url;
    const { name, age } = request.body as { name: string; age: number };
    return `method: ${method}, url: ${url}, status: UP!, 이름: ${name}, 나이: ${age} `;
  }

  // NestJs 권장 방식
  @Post('find')
  find(@Body() body: { name: string; age: number }) {
    return `이름: ${body.name}, 나이: ${body.age}`;
  }
  // 권장되지 않은 방식
  @Post('find2')
  @HttpCode(204)
  find2(@Req() req: Request) {
    const { name, age } = req.body as { name: string; age: number };
    return `이름: ${name}, 나이: ${age}`;
  }
  // Request가 필요한, 쓰는 경우 e.g: IP를 얻는 경우
  @Get('get/ip')
  getIp(@Req() req: Request) {
    const ip = req.ip;
    return ip;
  }

  @Get('get/ipTosString')
  getIpToString(@Req() req: Request): string {
    return req.ip ?? 'unknown'; // string인데 undefined이면 에러 발생하므로 예외 처리 필요
  }
  // IP 데코레이터
  @Get('get/ip2')
  getIp2(@Ip() ip: string) {
    return ip;
  }
  // Redirect 데코레이터
  @Redirect('https://nestjs.com', 301)
  @Get('go/nest')
  goNest() {
    return 'bye';
  }
  // 데코레이터에 전달된 인자 덮어쓰기
  @Get('docs')
  // http://localhost:3100/health/docs?version=5
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
  // param
  @Get(':id')
  getParam(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
}
