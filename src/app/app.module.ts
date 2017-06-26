import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import {ButtonModule, InputTextModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { DetalleSensorComponent } from './components/detalleSensor.component';
import { SensoresService } from './components/services/sensor.service';
import { StompService } from 'ng2-stomp-service';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetalleSensorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    InputTextModule,
    AppRoutingModule
  ],
  providers: [SensoresService, StompService],
  bootstrap: [AppComponent]
})
export class AppModule { }
