import { Injectable } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiHelperService {

  mySelectedPoint;
  private selectedPoint$ = new Subject<any>();


  constructor(private http: Http) {
    this.mySelectedPoint = [];
  }

  setSelectedPoint(point: any) {
    this.mySelectedPoint = point;
  }

  getSelectedPoint(){
    return this.mySelectedPoint;
  }

  getLatLong(url: string, address: string): any{
    let header = this.getHeaders();
    let options = new RequestOptions({headers: header});
    let logLat = this.http
      .get(url + address)
      .map(item => item.json());
      return logLat;
  }

  getBadWeatherConditions(url: string, data: any): any {
    let header = this.getHeaders();
    let options = new RequestOptions({headers: header});

    debugger;
    return this.http
      .post(url, JSON.stringify(data), options)
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

  getSelectedPoints() {
    return this.selectedPoint$;
  }
}
