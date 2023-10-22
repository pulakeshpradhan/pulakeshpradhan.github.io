var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              12.633508024864643,
              50.35639641402323
            ],
            [
              13.096307097130268,
              50.3905548894984
            ]
          ],
          "geodesic": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#37ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #37ff00 */ee.Geometry.LineString(
        [[12.633508024864643, 50.35639641402323],
         [13.096307097130268, 50.3905548894984]]);
var LSIB = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var SRTM = ee.Image("USGS/SRTMGL1_003");
var Czechia = LSIB.filter(ee.Filter.eq('country_na', 'Czechia'));
var styleParams = {
  fillColor: 'FF000000',
  color: 'FF0000',
  width: 1.0,
};
var CzechiaMAP = Czechia.style(styleParams);
Map.addLayer(CzechiaMAP,{},'Czech');
var line = geometry;
var coord = line.coordinates();
var Line_p2 =ee.List(coord.get(0));
var p2_lat = ee.List(Line_p2.get(1));
var Line_p1 = ee.List(coord.get(1));
var p1_lat = ee.List(Line_p1.get(0));
var latLonImg = ee.Image.pixelLonLat();
var elevImg =
    SRTM.select('elevation').addBands(latLonImg);
var elevTransect = elevImg.reduceRegion({
  reducer: ee.Reducer.toList(),
  geometry: geometry,
  scale: 30,
});
var lon = ee.List(elevTransect.get('longitude'));
var elev = ee.List(elevTransect.get('elevation'));
var lonSort = lon.sort(lon);
var elevSort = elev.sort(lon);
var chart = ui.Chart.array.values({array: elevSort, axis: 0, xLabels: lonSort})
                .setOptions({
                  title: 'Elevation Profile Across Longitude',
                  hAxis: {
                    title: 'Longitude',
                    viewWindow: {min: p2_lat, max: p1_lat},
                    titleTextStyle: {italic: false, bold: true}
                  },
                  vAxis: {
                    title: 'Elevation (m)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['654321'],
                  lineSize: 5,
                  pointSize: 0,
                  legend: {position: 'none'}
                });
print(chart.setChartType('AreaChart'));