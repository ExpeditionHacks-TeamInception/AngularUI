import { Component, OnInit } from '@angular/core';

declare var H:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  platform: any;
  map: any;

  ngOnInit() {
   





  /**
   * Boilerplate map initialization code starts below:
   */

//Step 1: initialize communication with the platform
  this.platform = new H.service.Platform({
    app_id: 'DemoAppId01082013GAL',
    app_code: 'AJKnXv84fjrb0KIHawS0Tg',
    useCIT: true,
    useHTTPS: true
  });
  var defaultLayers = this.platform.createDefaultLayers();

  //Step 2: initialize a map  - not specificing a location will give a whole world view.
  this.map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map);

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(this.map, defaultLayers);

  // Now use the map as required...
  this.moveMapToBerlin(this.map);
  }

   /**
   * Moves the map to display over Berlin
   *
   * @param  {H.Map} map      A HERE Map instance within the application
   */
  moveMapToBerlin(map){
    map.setCenter({lat:52.5159, lng:13.3777});
    map.setZoom(14);
  }
}
