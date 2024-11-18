import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AppService
{
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache  // Inject ConfigService
  )
  {
    this.apiKey = this.configService.get<string>('NEST_APP_API_KEY');
    this.apiUrl = this.configService.get<string>('NEST_APP_API_URL'); // Access environment variable
  }

  async getWeather(lat: string = '35.5849', long: string = '-80.8101', typeAPI: string): Promise<any> 
  {
    // Use a unique cache key based on lat and long
    const cacheKey = `${lat}_${long}_${typeAPI}`;
    // Check if weather data is cached for these coordinates
    const cachedWeather = await this.cacheManager.get(cacheKey);
    // Catch a Queue and check if it exists or else run a API.
    if (cachedWeather)
    {
      console.log(cachedWeather)
      return cachedWeather;
    }
    const weather = await this.fetchWeatherFromCoordinates(lat, long, typeAPI);

    await this.cacheManager.set(cacheKey, weather);
    // Pass parameters to a queue funciton to find if the results exist
    return weather;
  }
  private async fetchWeatherFromCoordinates(lat: string, long: string, typeAPI: string): Promise<any>
  {
    // Logic to fetch weather based on coordinates
    // url
    const url = `${this.apiUrl}/${typeAPI}/?lat=${lat}&lon=${long}&units=imperial&APPID=${this.apiKey}`;
    console.log(url);
    return firstValueFrom(this.httpService.get(url).pipe(
      map(response => response.data)
    ));
  }
}
