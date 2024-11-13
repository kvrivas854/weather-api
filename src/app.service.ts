import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';


@Injectable()
export class AppService
{
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService, // Inject ConfigService
  )
  {
    this.apiKey = this.configService.get<string>('NEST_APP_API_KEY');
    this.apiUrl = this.configService.get<string>('NEST_APP_API_URL'); // Access environment variable
  }

  getWeather(lat: string = '35.5849', long: string = '-80.8101')
  {
    // Catch a Queue and check if it exists or else run a API.

    // Pass parameters to a queue funciton to find if the results exist

    const url = `${this.apiUrl}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${this.apiKey}`;
    console.log(url);
    return this.httpService.get(url).pipe(
      map(response => response.data)
    );
  }
}
