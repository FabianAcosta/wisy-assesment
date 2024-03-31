import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastDataComponent } from './forecast-data/forecast-data.component';
import { HttpClientModule } from '@angular/common/http';
import { ForecastListComponent } from './forecast-list/forecast-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastDataComponent,
    ForecastListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
