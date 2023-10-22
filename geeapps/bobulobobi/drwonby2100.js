var dem = ui.import && ui.import("dem", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4"),
    population = ui.import && ui.import("population", "imageCollection", {
      "id": "WorldPop/GP/100m/pop"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop"),
    airport = ui.import && ui.import("airport", "table", {
      "id": "users/bobulobobi/bandara2015"
    }) || ee.FeatureCollection("users/bobulobobi/bandara2015"),
    NgurahRai = ui.import && ui.import("NgurahRai", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.1660643967681,
            -8.74788719329823
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#fbff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #fbff00 */ee.Geometry.Point([115.1660643967681, -8.74788719329823]),
    AdiSucipto = ui.import && ui.import("AdiSucipto", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            112.78785529096552,
            -7.379924685568756
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#fbff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #fbff00 */ee.Geometry.Point([112.78785529096552, -7.379924685568756]),
    SoekarnoHatta = ui.import && ui.import("SoekarnoHatta", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            106.66207804544699,
            -6.123518174570385
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#fbff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #fbff00 */ee.Geometry.Point([106.66207804544699, -6.123518174570385]);
// this script is for counting people that would be affected by rising sea level due to global warming
// layer clip
var border = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filter(ee.Filter.eq('country_na', 'Indonesia'));
// to see how bad the sea water level rise
// https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level
// 2m extreme
// 1m medium
var drownLevel = [2,3];
// print(drownLevel[0])
var elevation = dem.select('elevation').clip(border);
// show in the map
Map.addLayer(elevation
  .updateMask(elevation
    .lt(drownLevel[1]).updateMask(elevation.gt(-1))),
  {palette: 'red', },
  '2m sea level rise from 2000');
Map.addLayer(elevation
  .updateMask(elevation
    .lt(drownLevel[0]).updateMask(elevation.gt(-1))),
  {palette: 'blue', opacity: 0.50},
  '1m sea level rise from 2000');
Map.centerObject(NgurahRai, 12)
// make it vector
// var vectors = elevation.updateMask(elevation
//     .lt(drownLevel[0])
//       .updateMask(elevation.gt(0)))
//     .reduceToVectors({
//   geometry: border,
//   crs: elevation.projection(),
//   scale: 1000,
//   geometryType: 'polygon',
//   eightConnected: false,
//   labelProperty: 'zone',
// });
// Map.addLayer(vectors.draw({color: 'blue', strokeWidth: 1}))
// count people in 2021 that lives there
// var pop = population
//   .filterBounds(border)
//   .filterDate('2000-01-01', '2001-01-01')
//   .select('population')
//   .mean()
//   .clip (border);
// Map.addLayer(pop,{})
//make the