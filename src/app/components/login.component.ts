import { Component, OnInit } from '@angular/core';

import {ButtonModule} from 'primeng/primeng';
import { Router } from '@angular/router';
import { SensoresService } from './services/sensor.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { User } from '../modelo/user';

@Component({
    selector: 'login',
    templateUrl: '../components/vistas/login.component.html',
    styleUrls: ['../components/css/login.component.css']

})

export class LoginComponent implements OnInit {

    user: User = new User();
    login: any = false;
    error = '';

    constructor(private router: Router,
                private sensorService: SensoresService ) {

                }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log(this.user);
       this.sensorService.login(this.user).subscribe((response: boolean) => {
           if ( response ) {
                this.login = true;
                this.router.navigate(['/dashboard']);
           } else {
                this.error = 'Usuario o password incorrectos';
                this.login = false;
           }
    }, (error) => {
        let jsonData = JSON.parse(error._body);
        if ( jsonData.status == '401' ) {
             this.error = 'Usuario y contraseña no validos';
             this.login = false;
        } else {
             this.error = error;
             this.login = false;

        }

    });
    }

}