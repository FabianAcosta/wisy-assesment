import { Component, ElementRef, ViewChild } from '@angular/core';
import { ForecastService } from 'src/app/forecast.service';
import Chart from 'chart.js/auto';
import { ActivatedRoute } from '@angular/router';
import { forecastRegionAPI} from 'src/assets/enums/forecast-zones.enum'
import { debounceTime, fromEvent, take } from 'rxjs';

@Component({
  selector: 'app-forecast-data',
  templateUrl: './forecast-data.component.html',
  styleUrls: ['./forecast-data.component.scss']
})
export class ForecastDataComponent {

  chartLabels: Array<string> = []
  chartData: Array<number> = []
  regionCode: string | null= ''
  regionName = ''
  error= false
  loading= true
  @ViewChild('forecastChart', { static: false }) forecastChartt: ElementRef | undefined;
  chartConfig: any = {
    type: 'line',
    data: {
      labels: this.chartLabels,
      datasets: [{
        label: 'TEMPERATURE (°F)',
        data: this.chartData,
        fill: true,
        borderColor: 'rgb(39, 33, 209)',
        backgroundColor: 'rgb(39, 33, 209, 0.05)',
        tension: 0.1
      }]
    }
  };
  public chart: any;


  constructor(private readonly forecastService: ForecastService, private readonly route: ActivatedRoute){

  }

  ngOnInit(){
    this.regionCode = this.route.snapshot.paramMap.get('id')
    fromEvent(window, 'resize').pipe(debounceTime(200)).subscribe(() => {
      this.initChart()
    });

    if(this.regionCode !== null){
      this.regionName = forecastRegionAPI[this.regionCode as keyof typeof forecastRegionAPI].name
      this.forecastService.getForecast(forecastRegionAPI[this.regionCode as keyof typeof forecastRegionAPI].url).pipe(take(1)).subscribe(data => {
        this.formarChartData(data)
        this.initChart()
        this.loading = false
      }, (error) => {
        this.loading = false
        this.error = true
      })
    }
  }

  setGradient() {
    const ctx = this.forecastChartt?.nativeElement.getContext('2d');
    var gradient = ctx?.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient?.addColorStop(0, 'rgba(39, 33, 209,0.3)');
    gradient?.addColorStop(1, 'rgba(39, 33, 209,0.02)');
    this.chartConfig.data.datasets[0].backgroundColor = gradient
  }

  initChart(){
    this.chart?.destroy()
    this.chart = new Chart("forecastChart", {
      type: 'line',
      data: this.chartConfig.data,
    })
    setTimeout(()=>{
      this.setGradient()
      this.chart?.update()
    },100)
  }

  formarChartData(data: any){
    data.properties?.periods.forEach((period: any) => {
      this.chartLabels.push(period.name)
      this.chartData.push(period.temperature)
    });
  }

  ngOnDestroy(){
    this.chart.destroy()
  }

}
