import { Component, OnInit } from '@angular/core';
import { Sensor } from '../modelo/sensor';
import {ButtonModule} from 'primeng/primeng';
import { Router } from '@angular/router';
import { SensoresService } from './services/sensor.service';
import { StompService } from 'ng2-stomp-service';

@Component({
    selector: 'dashboard',
    templateUrl: '../components/vistas/dashboard.component.html',
    styleUrls: ['../components/css/dashboard.component.css']
})



export class DashboardComponent implements OnInit  {
    
    sensores: Sensor[];
    private subscription: any;

    constructor(private router: Router,
                private sensorService: SensoresService, 
                private stomp: StompService  ) {
                stomp.configure({
                    host: 'http://localhost:8080/sensoresSocket',
                    debug: true,
                    queue: { 'init': false, 'user': false}
                });

                stomp.startConnect().then(() => {
                    stomp.done('init');
                 });

                  stomp.after('init').then(() => {
                  this.subscription = stomp.subscribe('http://localhost:8080/topic/sensoresUpdate', (data) => console.log(data) )});

                 }

    ngOnInit(): void {
        this.sensorService.getSenores().subscribe((sensoreshttp: Sensor[]) => this.sensores = sensoreshttp);
     }

    onclick(sensor: Sensor): void {
        //this.stomp.send('http://localhost:8080/app/sensoresUpdate', "{text: 'nombre' }");
         this.router.navigate(['/detalleSensor', sensor.id]);
    }
}

