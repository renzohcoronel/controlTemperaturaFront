import { Component, OnInit } from '@angular/core';
import { Sensor } from '../modelo/sensor';
import {ButtonModule} from 'primeng/primeng';
import { Router } from '@angular/router';
import { SensoresService } from './services/sensor.service';

@Component({
    selector: 'dashboard',
    templateUrl: '../components/vistas/dashboard.component.html',
    styleUrls: ['../components/css/dashboard.component.css']
})



export class DashboardComponent implements OnInit  {
    sensores: Sensor[];

    constructor(private router: Router, private sensorService: SensoresService) {}

    ngOnInit(): void {
        this.sensorService.getSenores().subscribe((sensoreshttp: Sensor[]) => this.sensores = sensoreshttp);
     }

    onclick(sensor: Sensor): void {
       this.router.navigate(['/detalleSensor', sensor.id]);
    }
}

