import { Controller, Get } from '@nestjs/common';
import { Public } from './decorator/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('/status')
  getStatus(): { status: 'ok' } {
    return {
      status: 'ok',
    };
  }
}
