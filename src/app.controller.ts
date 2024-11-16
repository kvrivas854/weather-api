import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController
{
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getWeather(
    @Query('lat') lat: string,
    @Query('long') long: string,
    @Query('typeAPI') typeAPI: string
  ): Promise<{ data: any; message: string }>
  {
    const data = await this.appService.getWeather(lat, long, typeAPI);
    const response = {
      data,
      message: 'Data fetched successfully'
    }
    return response;
  }
}
