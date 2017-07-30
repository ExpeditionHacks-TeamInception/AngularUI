import { Component, OnInit } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app';
  platform: any;

  constructor() {

  }

  ngOnInit() {

    var customStyle = {
      strokeColor: 'blue',
      fillColor: 'rgba(255, 255, 255, 0.5',
      lineWidth: 10,
      lineCap: 'square',
      lineJoin: 'bevel'
    };
    this.platform = new H.service.Platform({
      app_id: 'DemoAppId01082013GAL',
      app_code: 'AJKnXv84fjrb0KIHawS0Tg',
      useCIT: true,
      useHTTPS: true
    });
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(document.getElementById('map'),
      defaultLayers.normal.map);
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    let ui = H.ui.UI.createDefault(map, defaultLayers);

    if (navigator.geolocation) {
      let lacLan: any;
      let locLon: any;
      navigator.geolocation.getCurrentPosition(function (location) {
        lacLan = location.coords.latitude;
        locLon = location.coords.longitude;
        var circle = new H.map.Circle({lat: lacLan, lng: locLon}, 10, { style: customStyle });
        map.addObject(circle);
        map.setCenter({lat: lacLan, lng: locLon});
        map.setZoom(14);
      });
      // setTimeout(this.moveMapToLocation(this.map, locLan, locLon), 500000);
    }


    // Now use the map as required...
  }


}
