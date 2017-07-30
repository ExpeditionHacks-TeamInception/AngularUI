import { Injectable } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiHelperService {

  constructor(private http: Http) { }

  getLatLong(url: string, address: string): Observable<{"Latitude": number, "Longitude":number}> {
    let header = this.getHeaders();
    let options = new RequestOptions({headers: header});
    let logLat = this.http
      .get(url + address)
      .map(item => item.json());
      return logLat;
  }

  getBadWeatherConditions(url: string, data: string): any {
    let header = this.getHeaders();
    let options = new RequestOptions({headers: header});
    return this.http
      .post(url, data, options)
      .map(item => item.json());
  }

  getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }
}
