import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthz')
  @HttpCode(200)
  healthz(): string {
    return "OK";
  }

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return this.appService.getHelloName(name);
  }
}
