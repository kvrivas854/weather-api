import { Controller, Get, Query } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController
{
  constructor(private readonly appService: AppService) { }

  @Get()
  getWeather(
    @Query('lat') lat: string,
    @Query('long') long: string,
  ): Observable<any>
  {
    return this.appService.getWeather(lat, long);
  }
}
