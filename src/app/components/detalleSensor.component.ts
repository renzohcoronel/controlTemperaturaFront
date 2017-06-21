import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Sensor } from '../modelo/sensor';
import { SensoresService } from './services/sensor.service';
import {ButtonModule} from 'primeng/primeng';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'detalleSensor',
    templateUrl: '../components/vistas/datalleSensor.component.html',
    styleUrls: ['../components/css/datalleSensor.component.css']
})

export class DetalleSensorComponent implements OnInit {
    sensorSelected: Sensor;

    constructor( private route: ActivatedRoute,
                 private location: Location,
                 private sensorService: SensoresService) {
     }

    ngOnInit(): void {
      this.route.params.switchMap((params: Params) => this.sensorService.getSenor(+params['id']))
      .subscribe((sensor) => this.sensorSelected = sensor);
     }

     modificarSensor(sensor: Sensor): void {
            this.sensorService.setSensorData(sensor).subscribe((sensor) => this.sensorSelected = sensor);
     }


    goBack(): void {
    this.location.back();
  }
}
