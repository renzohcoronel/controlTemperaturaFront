import { Component, OnInit } from '@angular/core';
import { Sensor } from '../modelo/sensor';
import {ButtonModule} from 'primeng/primeng';
import { Router } from '@angular/router';
import { SensoresService } from './services/sensor.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import { Subscription as RxSubscription } from 'rxjs/Rx';

@Component({
    selector: 'dashboard',
    templateUrl: '../components/vistas/dashboard.component.html',
    styleUrls: ['../components/css/dashboard.component.css']
})



export class DashboardComponent implements OnInit  {
    sensores: Sensor[];
    subcription: RxSubscription;
    constructor(private router: Router,
                private sensorService: SensoresService ) {

                }
    ngOnInit(): void {

        this.subcription = IntervalObservable.create(5000).subscribe(() => {
            this.sensorService.getSenores()
            .subscribe((sensoreshttp: Sensor[]) => this.sensores = sensoreshttp, (error: any) => {
                let jsonData = JSON.parse(error._body);
                if ( jsonData.status == '500' ) {
                          this.subcription.unsubscribe();
                          this.router.navigate(['/login']);
                }
            });
        });
     }

    onclick(sensor: Sensor): void {
         this.router.navigate(['/detalleSensor', sensor.id]);
    }

    onLogout(): void {
        this.sensorService.logout();
        this.router.navigate(['/login']);
    }
}

