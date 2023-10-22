var gaul2 = ui.import && ui.import("gaul2", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    gaul1 = ui.import && ui.import("gaul1", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                104.50045804334887,
                -2.7841077090466513
              ],
              [
                104.50045804334887,
                -3.1927910199113256
              ],
              [
                105.05183438612231,
                -3.1927910199113256
              ],
              [
                105.05183438612231,
                -2.7841077090466513
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[104.50045804334887, -2.7841077090466513],
          [104.50045804334887, -3.1927910199113256],
          [105.05183438612231, -3.1927910199113256],
          [105.05183438612231, -2.7841077090466513]]], null, false),
    gpw = ui.import && ui.import("gpw", "table", {
      "id": "projects/sat-io/open-datasets/sedac/gpw-v4-admin-unit-center-points-population-estimates-rev11"
    }) || ee.FeatureCollection("projects/sat-io/open-datasets/sedac/gpw-v4-admin-unit-center-points-population-estimates-rev11"),
    bounds = ui.import && ui.import("bounds", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                101.78770457414123,
                -0.8862572743720171
              ],
              [
                101.78770457414123,
                -5.1092441319129085
              ],
              [
                106.45689402726623,
                -5.1092441319129085
              ],
              [
                106.45689402726623,
                -0.8862572743720171
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[101.78770457414123, -0.8862572743720171],
          [101.78770457414123, -5.1092441319129085],
          [106.45689402726623, -5.1092441319129085],
          [106.45689402726623, -0.8862572743720171]]], null, false),
    gsw = ui.import && ui.import("gsw", "image", {
      "id": "JRC/GSW1_4/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_4/GlobalSurfaceWater");
// Center to ROI
Map.centerObject(roi, 11);
// South Sumatera
var southSumatera = gaul1.filter(ee.Filter.eq('ADM1_NAME', 'Sumatera Selatan'));
// South sumatera subdivision
var southSumateraSubdivision = gaul2.filter(ee.Filter.eq('ADM1_NAME', 'Sumatera Selatan'));
// Elevation
var elevation = srtm.clipToCollection(southSumatera);
var hillshade = coolHillshade(elevation.multiply(10)); // Hilshade
elevation = hillshade.blend(elevation.visualize({ min: 0, max: 1000, palette: ['green', 'yellow', 'orange', 'sienna', 'white']}).updateMask(0.6));
elevation = ui.Map.Layer(elevation, {}, 'Elevation');
Map.add(elevation);
// River data
var river = gsw.select('occurrence').clipToCollection(southSumatera).visualize({ min: 0, max: 100, palette: ['white', 'lightskyblue'] });
river = ui.Map.Layer(river, {}, 'River');
Map.add(river);
// Road data
var grip4_south_east_asia = ee.FeatureCollection("projects/sat-io/open-datasets/GRIP4/South-East-Asia");
var road = grip4_south_east_asia.filterBounds(southSumatera);
road = road.style({ color: 'red', width: 0.5 }); // Visualize road dat
road = ui.Map.Layer(road, {}, 'Road'); // Make road as layer
Map.add(road); // Add road to layer
// Regency boundary
var boundary1 = ee.Image().toByte().paint(southSumateraSubdivision, 0, 1).visualize({ palette: 'white' });
var boundary2 = ee.Image().toByte().paint(southSumateraSubdivision, 0, 2).visualize({ palette: 'black' });
var boundary = ui.Map.Layer(boundary2.blend(boundary1), {}, 'Regency/City boundary');
Map.add(boundary);
// Population center
var popCenter = gpw.filterBounds(southSumatera).style({ color: 'black', fillColor: 'orange', width: 1, pointSize: 10, pointShape: 'square' });
popCenter = ui.Map.Layer(popCenter, {}, 'Population center');
Map.add(popCenter);
// Text packages
var draw = require('users/gena/packages:text').draw;
var popText = ee.ImageCollection(gpw.filterBounds(southSumatera).map(function(feat){
  var point = feat.geometry().centroid(1e4);
  var name = feat.get('NAME3');
  var text = draw(name, point, 150, { fontSize: 32, textColor: 'black', outlineOpacity: 1, outlineWidth: 2, textOpacity: 1, outlineColor: 'white' });
  return text;
})).mosaic();
popText = ui.Map.Layer(popText, {}, 'Toponym');
Map.add(popText);
// Create panel for map
var panel = ui.Panel([], ui.Panel.Layout.flow('vertical'), { position: 'top-right', padding: '10px', maxHeight: '700px', maxWidth: '400px' });
Map.add(panel);
// Title
var title = ui.Label('South Sumatera Topography Map', { textAlign: 'center', stretch: 'horizontal', fontSize: '25px', fontWeight: 'bold', maxWidth: '400px' });
panel.add(title);
// Some information
var crs = ui.Label('Coordinate Reference System: WGS 1984 Geographic', { textAlign: 'center', stretch: 'horizontal' });
panel.add(crs);
var projection = ui.Label('Projection: Web Mercator', { textAlign: 'center', stretch: 'horizontal' });
panel.add(projection);
// Legend
var legendLabel = ui.Label('Legend', { fontWeight: 'bold', color: 'black', stretch: 'horizontal', textAlign: 'center', fontSize: '15px' });
panel.add(legendLabel);
// Legend panel
var legendPanel = ui.Panel([], ui.Panel.Layout.flow('vertical'), { stretch: 'horizontal', padding: '5px' });
panel.add(legendPanel);
// Toponym checkbox
var topoCheck = ui.Panel([
  ui.Checkbox('', true, function(value){ value ? popText.setShown(true) : popText.setShown(false) }),
  ui.Label('Toponyms'),
], ui.Panel.Layout.flow('horizontal'));
legendPanel.add(topoCheck);
// Population center
var legendPop = ui.Panel([
  ui.Checkbox('', true, function(value){ value ? popCenter.setShown(true) : popCenter.setShown(false) }),
  ui.Label('', { backgroundColor: 'orange', height: '15px', width: '15px', border: '0.5px solid black' }),
  ui.Label('Administrative center'),
], ui.Panel.Layout.flow('horizontal'));
legendPanel.add(legendPop);
// Border legend
var legendBorder = ui.Panel([
  ui.Checkbox('', true, function(value){ value ? boundary.setShown(true) : boundary.setShown(false) }),
  ui.Label('', { backgroundColor: 'white', height: '5px', width: '30px', border: '0.5px solid black' }),
  ui.Label('Subdivision border'),
], ui.Panel.Layout.flow('horizontal'));
legendPanel.add(legendBorder);
// Road legend
var legendRoad = ui.Panel([
  ui.Checkbox('', true, function(value){ value ? road.setShown(true) : road.setShown(false) }),
  ui.Label('', { backgroundColor: 'red', height: '5px', width: '30px' }),
  ui.Label('Road'),
], ui.Panel.Layout.flow('horizontal'));
legendPanel.add(legendRoad);
// River legend
var legendRiver = ui.Panel([
  ui.Checkbox('', true, function(value){ value ? river.setShown(true) : river.setShown(false) }),
  ui.Label('', { backgroundColor: 'lightskyblue', height: '5px', width: '30px' }),
  ui.Label('River'),
], ui.Panel.Layout.flow('horizontal'));
legendPanel.add(legendRiver);
// Elevation legend
var elevationLegend = legendGradient('Elevation (m)', { min: 0, max: 1000, palette: ['green', 'yellow', 'orange', 'sienna', 'white']}, elevation);
legendPanel.add(elevationLegend);
// Source
var source = ui.Label('Data sources', { fontWeight: 'bold', fontSize: '15px', textAlign: 'center', stretch: 'horizontal' });
panel.add(source);
var sourceGAUL = ui.Label('FAO GAUL: Global Administrative Unit Layers 2015');
panel.add(sourceGAUL);
var sourceGPW = ui.Label('Doxsey-Whitfield, Erin, Kytt MacManus, Susana B. Adamo, Linda Pistolesi, John Squires, Olena Borkovska, and Sandra R. Baptista. "Taking advantage of the improved availability of census data: a first look at the gridded population of the world, version 4." Papers in Applied Geography 1, no. 3 (2015): 226-234.');
panel.add(sourceGPW);
var sourceSRTM = ui.Label('Farr, T.G., Rosen, P.A., Caro, E., Crippen, R., Duren, R., Hensley, S., Kobrick, M., Paller, M., Rodriguez, E., Roth, L., Seal, D., Shaffer, S., Shimada, J., Umland, J., Werner, M., Oskin, M., Burbank, D., and Alsdorf, D.E., 2007, The shuttle radar topography mission: Reviews of Geophysics, v. 45, no. 2, RG2004, at https://doi.org/10.1029/2005RG000183.');
panel.add(sourceSRTM);
var sourceGSW = ui.Label('Jean-Francois Pekel, Andrew Cottam, Noel Gorelick, Alan S. Belward, High-resolution mapping of global surface water and its long-term changes. Nature 540, 418-422 (2016).');
panel.add(sourceGSW);
var sourceGRIP = ui.Label('Meijer, Johan R., Mark AJ Huijbregts, Kees CGJ Schotten, and Aafke M. Schipper. "Global patterns of current and future road infrastructure." Environmental Research Letters 13, no. 6 (2018): 064006.');
panel.add(sourceGRIP);
// Create cool hillshade
function coolHillshade(image){
  var S = ee.Terrain.hillshade(image, 180, 80).multiply(0.1);
  var SW = ee.Terrain.hillshade(image, 225, 68).multiply(0.2);
  var W = ee.Terrain.hillshade(image, 270, 56).multiply(0.2);
  var NW = ee.Terrain.hillshade(image, 315, 44).multiply(0.5);
  var multi = ee.Image([S, SW, W, NW]).reduce(ee.Reducer.sum())
    .visualize({ min: 0, max: 255, palette: [ '#000000', '#ffffff' ] })
    .resample('bicubic');
  var slope = ee.Terrain.slope(image).multiply(2)
    .visualize({ min: 100, max: 180, palette: [ '#ffffff', '#000000' ]})
    .resample('bicubic');
  var final = ee.Image([multi, slope]).reduce(ee.Reducer.median());
  return final;
}
// gradient legend
function legendGradient(name, vis, layer){
  var geom = ee.Geometry({
    "geodesic": false,
    "type": "Polygon",
    "coordinates": [
      [
        [
          112.38333164500061,
          -0.4965121527071768
        ],
        [
          112.45199619578186,
          -0.4965121527071768
        ],
        [
          112.45199619578186,
          0.011599308565035363
        ],
        [
          112.38333164500061,
          0.011599308565035363
        ],
        [
          112.38333164500061,
          -0.4965121527071768
        ]
      ]
    ]
  });
  var panel = ui.Panel([], ui.Panel.Layout.flow('vertical'), { stretch: 'horizontal' });
  panel.add(ui.Panel([
    ui.Checkbox('', true, function(value){ value ? layer.setShown(true) : layer.setShown(false) }),
    ui.Label(name, { fontWeight: 'bold' })
  ], ui.Panel.Layout.flow('horizontal')));
  var lonLat = ee.Image.pixelLonLat().select('longitude').clip(geom);
  var minMax = lonLat.reduceRegion({
    scale: 1000,
    maxPixels: 1e13,
    reducer: ee.Reducer.minMax(),
    geometry: geom
  });
  var max = ee.Number(minMax.get('longitude_max'));
  var min = ee.Number(minMax.get('longitude_min'));
  var visualized = lonLat.visualize({ min: min, max: max, palette: vis.palette });
  var thumbnail = ui.Thumbnail(visualized, {}, null, { border: '0.5px solid black', textAlign: 'center', stretch: 'horizontal', height: '30px' });
  var labelPanel = ui.Panel([
    ui.Label(vis.min, { textAlign: 'left', stretch: 'horizontal' }),
    ui.Label(vis.max, { textAlign: 'right', stretch: 'horizontal'  })
  ], ui.Panel.Layout.flow('horizontal'), { stretch: 'horizontal' });
  panel.add(labelPanel);
  panel.add(thumbnail);
  return panel;
}