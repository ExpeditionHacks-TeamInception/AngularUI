import { Component, OnInit } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  platform: any;

  ngOnInit() {

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
      let locLan: any;
      let locLon: any;
      navigator.geolocation.getCurrentPosition(function (location) {
        locLan = location.coords.latitude;
        locLon = location.coords.longitude;
        map.setCenter({lat: locLan, lng: locLon});
        map.setZoom(14);
      });
      // debugger;
      // setTimeout(this.moveMapToLocation(this.map, locLan, locLon), 500000);
    }


    // Now use the map as required...
  }
}
