import { Injectable } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ApiHelperService {

  mySelectedPoint;
  selectedPoint$: BehaviorSubject<any[]>;

  constructor(private http: Http) { 
    this.mySelectedPoint = [];
  }
  
  setSelectedPoint(point: any){
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

  getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  getSelectedPoints(){
    return this.selectedPoint$;
  }
}
