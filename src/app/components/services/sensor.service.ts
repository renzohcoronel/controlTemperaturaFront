import {Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Sensor } from '../../modelo/sensor';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SensoresService {

    constructor(private http: Http) { }

    getSenores(): Observable<Sensor[]> {
       return this.http.get("http://localhost:8080/sensores").
       map( (response) => response.json() as Sensor[]);
    }

    getSenor(id: number): Observable<Sensor> {
        console.log('ID :' + id + " " + `http://localhost:8080/sensor/${id}`);
       return this.http.get(`http://localhost:8080/sensor/${id}`)
       .map(response => { 
           console.log(response.json());
           return response.json() as Sensor});
    }

    setSensorData(sensor: Sensor):  Observable<Sensor> {
          console.log("Sensor " + sensor);
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
         return this.http.post(`http://localhost:8080/sensor`,  sensor , options)
         .map((response) => response.json() as Sensor );
    }

}
