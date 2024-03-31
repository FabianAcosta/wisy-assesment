import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forecastRegionAPI} from 'src/assets/enums/forecast-zones.enum'

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  basePath: string

  constructor(private http: HttpClient) {
    this.basePath = "https://api.weather.gov/gridpoints"
  }

  public getForecast (regionPath:string) {
    return this.http.get(`${this.basePath}${regionPath}`)
  }

}
