var lugar1 = ui.import && ui.import("lugar1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -62.57367685663092,
            -35.95454536238682
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-62.57367685663092, -35.95454536238682]),
    lugar2 = ui.import && ui.import("lugar2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -60.52783939581074,
            -28.49251055682773
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-60.52783939581074, -28.49251055682773]),
    lugar3 = ui.import && ui.import("lugar3", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -56.527298321568225,
            -27.468725720827013
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([-56.527298321568225, -27.468725720827013]),
    lugar4 = ui.import && ui.import("lugar4", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -62.9455500739027,
            -33.89135761252315
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Point([-62.9455500739027, -33.89135761252315]);
var lugares = {
  "Trenque Lauquen": lugar1,
  "Bajos submeridionales": lugar2,
  "Yacyretá": lugar3,
  "Pueblo italiano": lugar4
}
// var links = ui.Label({
//                     value: ,
//                     targetUrl:,
//                     style:{color: 'blue', fontSize: '12px'},
//                   })
// var cita = ui.Label({
//   value: "Cita: ",
//   style: {fontSize: "11px"}
// })
var leyenda = ui.Label({value:'Leyenda'});
var image = ee.Image('users/javierreggae2/figura1_paper_floods/VISdecadal1975_2020originalColor_blind_palette');
var maps = [];
Object.keys(lugares).forEach(function(lugar) {
  var map = ui.Map();
  map.addLayer(image, {}, "");
  map.setOptions("HYBRID");
  map.add(ui.Label({value: lugar, style:{fontSize: "18px", fontWeight:"bold"}}));
  map.centerObject(lugares[lugar], 9);
  map.setControlVisibility(false);
  maps.push(map);
});
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[2].setControlVisibility({scaleControl: true});
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2], maps[3]], null, {stretch: 'both'}),
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
var panel = ui.Panel({
  widgets: [
    leyenda,
    // links, cita
    ],
  style: {
    width: '200px'
  }
});
ui.root.widgets().reset([mapGrid,panel]);