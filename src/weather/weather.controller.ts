import { Controller, Get, Req } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
    @Get()
    findAll(@Req() request: Request): string
    {
        console.log(request);
        return 'This action returns all weather';
    }
}
