import {Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Sensor } from '../../modelo/sensor';
import { User } from '../../modelo/user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SensoresService {

    constructor(private http: Http) { }

    getSenores(): Observable<Sensor[]> {
        let headers = new Headers({ 'Content-Type': 'application/json',
                                     'Authorization': 'Bearer ' + this.getToken() });
        let options = new RequestOptions({ headers: headers });

       return this.http.get('/sensores', options).
       map( (response) => response.json() as Sensor[]).catch((error: any) => this.handleError(error));
    }

    getSenor(id: number): Observable<Sensor> {
        console.log('Obtengo un sensor ');
         let headers = new Headers({ 'Content-Type': 'application/json',
                                     'Authorization': this.getToken() });
          let options = new RequestOptions({ headers: headers });
       return this.http.get(`/sensor/${id}`, options)
       .map(response => { 
           console.log('Response ' + response.json());
           return response.json() as Sensor}).catch((error: any) => this.handleError(error));
            }

    setSensorData(sensor: Sensor):  Observable<Sensor> {
        console.log('Envio datos a modificar');
          let headers = new Headers({ 'Content-Type': 'application/json',
                                     'Authorization': this.getToken() });
          let options = new RequestOptions({ headers: headers });
         return this.http.post(`/sensor`,  sensor , options)
         .map((response) => response.json() as Sensor );
    }

    login(user: User): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions(
            { headers: headers});
        console.log(options);
        return this.http.post(`/login`, user , options).map((response) => {
            let token = response.headers.get('Authorization');
            if ( token ) {
                  localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token }));
                  return true;
            } else {
                return false;
            }
        }).catch((error: any) => this.handleError(error))}

    getToken(): String {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser && currentUser.token;
        console.log('Obtener Token' + token);
        return token ? token : "";
    }

    logout(): void {
       localStorage.removeItem('currentUser');
    }

    public handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
  }



}
