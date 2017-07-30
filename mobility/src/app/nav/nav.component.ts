import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ApiHelperService } from "../api-helper.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  startAddress: string;
  endAddress: string;
  baseUrl: string = "http://localhost:5056/here/v1/latlang/";
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;


  constructor(private router: Router, private http: Http, private apiHelperService: ApiHelperService) {

  }

  ngOnInit() {
  }
  
  navigation() {
    this.router.navigate(['navigation']);
    console.log("This is the result of the API call");

    this.apiHelperService.getLatLong(this.baseUrl, this.startAddress).subscribe(start => {
      this.startLat = start.Latitude;
      this.startLong = start.Longitude;
      console.log("Comming from start address");
      console.log(this.startLat, this.startLong);
    });
    this.apiHelperService.getLatLong(this.baseUrl, this.endAddress).subscribe(end => {
      this.endLat = end.Latitude;
      this.endLong = end.Longitude;
      console.log("Comming from end address");
      console.log(this.endLat, this.endLong);
    });
      

  }

  // getLatLong(address: string): Observable<{"Latitude": number, "Longitude":number}>{
    // let header = this.getHeaders();
    // let options = new RequestOptions({headers: header});
    // let logLat = this.http
    //   .get(`${this.baseUrl}` + address)
    //   .map(item => item.json());
    //   return logLat;
  // }

  getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // return headers;
  }
}
