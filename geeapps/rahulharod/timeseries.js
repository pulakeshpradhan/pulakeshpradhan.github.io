var Vaishali = ui.import && ui.import("Vaishali", "table", {
      "id": "projects/ee-rahulharod/assets/Shape_files/Bihar_Sub_Districts/Vaishali_Sub_District"
    }) || ee.FeatureCollection("projects/ee-rahulharod/assets/Shape_files/Bihar_Sub_Districts/Vaishali_Sub_District"),
    FCC_Vis_params = ui.import && ui.import("FCC_Vis_params", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8A",
          "B4",
          "B3"
        ],
        "min": 0.11139381818181819,
        "max": 0.27909709090909085,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8A","B4","B3"],"min":0.11139381818181819,"max":0.27909709090909085,"gamma":1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                77.36364057209228,
                22.47172000380697
              ],
              [
                77.36364057209228,
                22.4666835101602
              ],
              [
                77.3680393948767,
                22.4666835101602
              ],
              [
                77.3680393948767,
                22.47172000380697
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
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[77.36364057209228, 22.47172000380697],
          [77.36364057209228, 22.4666835101602],
          [77.3680393948767, 22.4666835101602],
          [77.3680393948767, 22.47172000380697]]], null, false);
var S2_coll = require('users/rahulharod/Dehaat:Sentinel2_Coll.js');
var S1_coll = require('users/rahulharod/try:S1_VH_IW_10m_coll.js');
// User input for desired results
var start_date='2021-09-01';
var end_date='2022-02-28';
var cloud_percentage=100;
var day_mean=15;
var ROI=geometry;
var file_prefix ='geometry';
var clip_region=ROI;
var S1_coll=ee.ImageCollection(S1_coll.S1_VH_IW_collection(start_date,end_date,ROI,clip_region,day_mean,file_prefix));
print('S1_coll',S1_coll);
print('S1_coll_dates',S1_coll.aggregate_array('date'));
var S2_coll=ee.ImageCollection(S2_coll.S2_collection(start_date,end_date,ROI,clip_region,cloud_percentage,day_mean,file_prefix));
var coll=S2_coll.combine(S1_coll)
print('Sentinel 2_collection',coll);
print('S2_coll_dates',coll.aggregate_array('date'));
coll=coll.map(function(img){ return img.clip(clip_region)
                                        .set('system:time_start',img.get('date'))
});
var coll_all=coll.select(['NDVI','NDRE','LSWI','S1_VH_IW']);
Map.addLayer(ROI,{color:'Black'},'ROI')
Map.centerObject(ROI,15);
// Map.addLayer(ee.Image(0).clip(ROI),{palette:['white']},'background');
Map.addLayer(coll.select(['B8A','B4','B3']).mean(),FCC_Vis_params,'FCC')
Map.addLayer(coll_all,{min:0,max:1},'Indices',false);
// Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '500px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Time Series Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map for Time series plots.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(8)),
  lat.setValue('lat: ' + coords.lat.toFixed(8));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  print(coords.lat+','+coords.lon)
  var ndvi_chart = ui.Chart.image.series({
                            imageCollection:coll_all.select(['NDVI','NDRE','LSWI']), 
                            region:point, 
                            reducer:ee.Reducer.mean(),
                            scale:20,
                            xProperty: 'system:time_start'})
                            // .setSeriesNames(['NDVI','NDRE','LSWI'])
                            .setOptions({
                            lineWidth: 2,
                            pointSize: 3,
                            colors: ['red','Blue','Yellow'],
                            title: 'Maize VegIndices Time Series '+lon.getValue('lon')+' '+lat.getValue('lat'),
                            vAxis: {title: 'Indices_value', maxValue: 1, minValue: 0},
                            hAxis: {title: 'Date', format: 'MM-DD', gridlines: {count:4}},
                            curveType: 'function',
  });
  var VH_chart = ui.Chart.image.series({
                            imageCollection:coll_all.select(['S1_VH_IW']), 
                            region:point, 
                            reducer:ee.Reducer.mean(),
                            scale:30,
                            xProperty: 'system:time_start'})
                            .setOptions({
                            lineWidth: 2,
                            pointSize: 3,
                            colors: ['Black'],
                            vAxis: {title: 'VH ', maxValue: -10, minValue: -22},
                            hAxis: {title: 'Date', format: 'MM-DD', gridlines: {count:4}},
                            curveType: 'function',
  });
  panel.widgets().set(2, ndvi_chart);
  panel.widgets().set(3, VH_chart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);