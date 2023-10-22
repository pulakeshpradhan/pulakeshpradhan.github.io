var geo = ui.import && ui.import("geo", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -100.737109375,
            34.97516710867694
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-100.737109375, 34.97516710867694]),
    geometry1 = ui.import && ui.import("geometry1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -100.7262243782467,
                34.980583966065446
              ],
              [
                -100.7262243782467,
                34.97355115781239
              ],
              [
                -100.71678300251428,
                34.97355115781239
              ],
              [
                -100.71678300251428,
                34.980583966065446
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-100.7262243782467, 34.980583966065446],
          [-100.7262243782467, 34.97355115781239],
          [-100.71678300251428, 34.97355115781239],
          [-100.71678300251428, 34.980583966065446]]], null, false);
// Exected URL parameters:
// startTime : Defautls to 2000-01-01
// endTime : Defaults to todays date
// geoJson : This is the only parameter that MUST be filled
// plotId : The name of the plot being assessed, defaults to Plot
// call as https://biplov.users.earthengine.app/view/ceo-ce-gee#center=[90.274936148,30.641702593000005];radius=3000;
// OR https://biplov.users.earthengine.app/view/ceo-ce-gee#geoJson={%22type%22:%20%22Polygon%22,%20%22coordinates%22:[[[99.14201070894852,20.125251400267004],[99.14201070894852,20.146336642463694],[99.1644685910515,20.146336642463694],[99.1644685910515,20.125251400267004],[99.14201070894852,20.125251400267004]]]}
var mainScript = require("users/biplov/CE-CEO:main.js");
// The date that is used as the start of the chart ( if the dataset is available )
// You can change the start date manually and hit the button "Run""again to reload the charts using the different time series
var startTime = ui.url.get('startTime', "1990-01-01");
var now = new Date( Date.now() );
var today = now.getFullYear()+'-'+ ( now.getMonth() +1) +'-'+now.getDate();
var lastYearToday = ( now.getFullYear() -1 )+'-'+ ( now.getMonth() +1) +'-'+now.getDate();
// The last date for which the chart is generated.
var endTime = ui.url.get('endTime', today);
var plotId = ui.url.get('plotId', 'Plot');
var geometry;
var geoJson = ui.url.get('geoJson', null);
var radius = ui.url.get('radius', null);
// var radius = 3000;
var center = ui.url.get('center', null);
// var center = "[90.274936148,30.641702593000005]";
if (radius && center){
  if (center.substring(0, 1) === '[') {
    center = JSON.parse(center).map(function(item) { return parseFloat(item) });
  } else {
    center = center.split(",").map(function(item) { return parseFloat(item) });
  }
  geometry = ee.Geometry.Point(center[0], center[1]);
} else if (geoJson) {
  var obj = JSON.parse(geoJson);
  geometry = ee.Geometry( obj );
} else {
  geometry = geometry1;
}
mainScript.processPlotInfo( geometry, startTime, endTime, lastYearToday, null, plotId, radius  );