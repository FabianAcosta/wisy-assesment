import { Component } from '@angular/core';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent {

  regionList = [
    { label: 'District of Columbia', path: '/lwx', apiPath: '/TOP/31,80/forecast', code: 'LWX'},
    { label: 'Kansas', path: '/top', apiPath: '/LWX/31,80/forecast', code: 'TOP'}
  ]

}
