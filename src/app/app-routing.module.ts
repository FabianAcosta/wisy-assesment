import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastDataComponent } from './forecast-data/forecast-data.component';
import { ForecastListComponent } from './forecast-list/forecast-list.component';

const routes: Routes = [
  { path: 'weather/:id', component: ForecastDataComponent },
  { path: '', component: ForecastListComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
