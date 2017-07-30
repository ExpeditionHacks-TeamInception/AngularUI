import { Component, OnInit } from '@angular/core';
declare var H: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
     const calculateRouteFromAtoB = function (platform) {
      let router = platform.getRoutingService(),
        routeRequestParams = {
          mode: 'fastest;car',
          representation: 'display',
          routeattributes: 'waypoints,summary,shape,legs',
          maneuverattributes: 'direction,action',
          waypoint0: '52.5160,13.3779', // Brandenburg Gate
          waypoint1: '52.5206,13.3862'
        };


      router.calculateRoute(
        routeRequestParams,
        onSuccess,
        onError
      );
    };

    /**
     * This function will be called once the Routing REST API provides a response
     * @param  {Object} result          A JSONP object representing the calculated route
     *
     * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
     */
    const onSuccess = function (result) {
      let route = result.response.route[0];
      /*
       * The styling of the route response on the map is entirely under the developer's control.
       * A representitive styling can be found the full JS + HTML code of this example
       * in the functions below:
       */
      addRouteShapeToMap(route);
      addManueversToMap(route);

      addWaypointsToPanel(route.waypoint);
      addManueversToPanel(route);
      addSummaryToPanel(route.summary);
      // ... etc.
    };

    /**
     * This function will be called if a communication error occurs during the JSON-P request
     * @param  {Object} error  The error message received.
     */
    const onError = function (error) {
      alert('Ooops!');
    };


    /**
     * Boilerplate map initialization code starts below:
     */

// set up containers for the map  + panel
     let mapContainer = document.getElementById('map');
//    routeInstructionsContainer = document.getElementById('panel');
//
// //Step 1: initialize communication with the platform
    let platform = new H.service.Platform({
      app_id: 'DemoAppId01082013GAL',
      app_code: 'AJKnXv84fjrb0KIHawS0Tg',
      useCIT: true,
      useHTTPS: true
    });
     let defaultLayers = platform.createDefaultLayers();
    //Step 2: initialize a map - this map is centered over Berlin
    let map = new H.Map(mapContainer,
      defaultLayers.normal.map, {
        center: {lat: 53.430, lng: -2.961},
        zoom: 7
      });

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
     let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
//
// // Create the default UI components
     let ui = H.ui.UI.createDefault(map, defaultLayers);
//
// Hold a reference to any infobubble opened
    let bubble;

    /**
     * Opens/Closes a infobubble
     * @param  {H.geo.Point} position     The location on the map.
     * @param  {String} text              The contents of the infobubble.
     */
    let openBubble = function (position, text) {
      if (!bubble) {
        bubble = new H.ui.InfoBubble(
          position,
          // The FO property holds the province name.
          {content: text});
        ui.addBubble(bubble);
      } else {
        bubble.setPosition(position);
        bubble.setContent(text);
        bubble.open();
      }
    }


    /**
     * Creates a H.map.Polyline from the shape of the route and adds it to the map.
     * @param {Object} route A route as received from the H.service.RoutingService
     */
    function addRouteShapeToMap(route) {
       let strip = new H.geo.Strip(),
      routeShape = route.shape,
        // routeShape = getWayPoints(),
        polyline;

      routeShape.forEach(function (point) {
        debugger;
        let parts = point.split(',');
        strip.pushLatLngAlt(parts[0], parts[1]);
      });

      polyline = new H.map.Polyline(strip, {
        style: {
          lineWidth: 4,
          strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
      });
      // Add the polyline to the map
      map.addObject(polyline);
      // And zoom to its bounding rectangle
      map.setViewBounds(polyline.getBounds(), true);
    }


    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    let addManueversToMap = function (route) {
      let svgMarkup = '<svg width="18" height="18" ' +
          'xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="8" cy="8" r="8" ' +
          'fill="#1b468d" stroke="white" stroke-width="1"  />' +
          '</svg>',
        dotIcon = new H.map.Icon(svgMarkup, {anchor: {x: 8, y: 8}}),
        group = new H.map.Group(),
        i,
        j;

      // Add a marker for each maneuver
      for (i = 0; i < route.leg.length; i += 1) {
        for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
          // Get the next maneuver.
          let maneuver = route.leg[i].maneuver[j];
          // Add a marker to the maneuvers group
          let marker = new H.map.Marker({
              lat: maneuver.position.latitude,
              lng: maneuver.position.longitude
            },
            {icon: dotIcon});
          marker.instruction = maneuver.instruction;
          group.addObject(marker);
        }
      }

      group.addEventListener('tap', function (evt) {
        map.setCenter(evt.target.getPosition());
        openBubble(
          evt.target.getPosition(), evt.target.instruction);
      }, false);

      // Add the maneuvers group to the map
      map.addObject(group);
    }


    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    let addWaypointsToPanel = function(waypoints) {


      let nodeH3 = document.createElement('h3'),
        waypointLabels = [],
        i;


      for (i = 0; i < waypoints.length; i += 1) {
        waypointLabels.push(waypoints[i].label)
      }

      nodeH3.textContent = waypointLabels.join(' - ');

      // routeInstructionsContainer.innerHTML = '';
      // routeInstructionsContainer.appendChild(nodeH3);
    }

    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    let addSummaryToPanel = function (summary) {
      let summaryDiv = document.createElement('div'),
        content = '';
      content += '<b>Total distance</b>: ' + summary.distance + 'm. <br/>';
      content += '<b>Travel Time</b>: ' + toMMSS(summary.travelTime) + ' (in current traffic)';


      summaryDiv.style.fontSize = 'small';
      summaryDiv.style.marginLeft = '5%';
      summaryDiv.style.marginRight = '5%';
      summaryDiv.innerHTML = content;
      // routeInstructionsContainer.appendChild(summaryDiv);
    };

    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    let addManueversToPanel = function (route) {


      let nodeOL = document.createElement('ol'),
        i,
        j;

      nodeOL.style.fontSize = 'small';
      nodeOL.style.marginLeft = '5%';
      nodeOL.style.marginRight = '5%';
      nodeOL.className = 'directions';

      // Add a marker for each maneuver
      for (i = 0; i < route.leg.length; i += 1) {
        for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
          // Get the next maneuver.
          let maneuver = route.leg[i].maneuver[j];

          let li = document.createElement('li'),
            spanArrow = document.createElement('span'),
            spanInstruction = document.createElement('span');

          spanArrow.className = 'arrow ' + maneuver.action;
          spanInstruction.innerHTML = maneuver.instruction;
          li.appendChild(spanArrow);
          li.appendChild(spanInstruction);

          nodeOL.appendChild(li);
        }
      }
      // routeInstructionsContainer.appendChild(nodeOL);
    };

    let toMMSS = function (number) {
      return Math.floor(number / 60) + ' minutes ' + (number % 60) + ' seconds.';
    };


// Now use the map as required...
    calculateRouteFromAtoB(platform);

    const getWayPoints = function() {
      console.log("this is what?");
    };

    // INFO BUBBLE --------

//     const addMarkerToGroup = function (group, coordinate, html) {
//       let marker = new H.map.Marker(coordinate);
//       // add custom data to the marker
//       marker.setData(html);
//       group.addObject(marker);
//     };
//
//
//     /**
//      * Add two markers showing the position of Liverpool and Manchester City football clubs.
//      * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
//      * @param  {H.Map} map      A HERE Map instance within the application
//      */
//     const addInfoBubble = function(map) {
//       let group = new H.map.Group();
//
//       map.addObject(group);
//
//       // add 'tap' event listener, that opens info bubble, to the group
//       group.addEventListener('tap', function (evt) {
//         // event target is the marker itself, group is a parent event target
//         // for all objects that it contains
//         let bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
//           // read custom data
//           content: evt.target.getData()
//         });
//         // show info bubble
//         ui.addBubble(bubble);
//       }, false);
//
//       addMarkerToGroup(group, {lat: 53.439, lng: -2.221},
//         '<div><a href=\'http://www.mcfc.co.uk\' >Manchester City</a>' +
//         '</div><div >City of Manchester Stadium<br>Capacity: 48,000</div>');
//
//       addMarkerToGroup(group, {lat: 53.430, lng: -2.961},
//         '<div ><a href=\'http://www.liverpoolfc.tv\' >Liverpool</a>' +
//         '</div><div >Anfield<br>Capacity: 45,362</div>');
//
//     };
// // Now use the map as required...
//     addInfoBubble(map);

  }

}

