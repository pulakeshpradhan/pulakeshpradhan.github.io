var aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -81.82469016492534,
                13.07570416302083
              ],
              [
                -81.82469016492534,
                -58.535882895708916
              ],
              [
                -23.641096414925343,
                -58.535882895708916
              ],
              [
                -23.641096414925343,
                13.07570416302083
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
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-81.82469016492534, 13.07570416302083],
          [-81.82469016492534, -58.535882895708916],
          [-23.641096414925343, -58.535882895708916],
          [-23.641096414925343, 13.07570416302083]]], null, false);
////******METHANE CONCENTRATION******////////
var band_viz = {
  min: 1750,
  max: 1890,//1950,
  palette: ['0000C0','0420FD','1443FF','2D74FF','3E95FF','53AAFF','69BFFF','7CD0FF','88DCFF','95E9FF','A2F0FF','B4F7FF','C7FFFF','D8FFFF','EDFFFF','FFFFFF','FFFFAB','FFFF46','FFFD00','FFE900','FFD400','FFC100','FFA300','FF8700','FF6500','FF3100','FF0000','EB0000','D00000','BD0000','820000']
  //['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
var serie0 = "xCH4 Bi-Monthly: ";
function xCH4_serie(ListDates, serie_){
  var xCH4_L3_list = [];
  var nvalues = ee.List(ListDates).length().getInfo();
  print("------------",nvalues);
  var col = 'COPERNICUS/S5P/OFFL/L3_CH4', prop = 'CH4_column_volume_mixing_ratio_dry_air';
  function xCH4_mosaic(col0,prop0,fecha0){print("inputs: ",col0,prop0,fecha0);var mosaic = ee.ImageCollection(col0).filterDate(fecha0[0],fecha0[1]).select(prop0); return mosaic.mean()}
  for (var jj=0; jj < nvalues-1; jj++){
  // print("j: ",j);
    var rangeDates = ListDates.slice(jj,jj+2); 
    print("range Dates: ",rangeDates);
    var xCH4_L3_data = xCH4_mosaic(col,prop,rangeDates).set('system:time_start', ee.Date(rangeDates[1]).millis(),'dateYMD', ee.Date(rangeDates[1]).format('YYYY-MM-dd'));
    print("xCH4_L3_list: ",xCH4_L3_list);
    var title = serie_ + rangeDates[0].toString() + "/"+rangeDates[1].toString();
    print("Layer Title: ",title);
    print("---------------------------------------------------------");
    Map.addLayer(xCH4_L3_data, band_viz, title,0);
    xCH4_L3_list.push(xCH4_L3_data);
  }
  return xCH4_L3_list
}
//++
var dates = ['2020-01-01','2020-03-01','2020-05-01','2020-07-01','2020-09-01', '2020-11-01','2021-01-01','2021-03-01','2021-05-01','2021-07-01','2021-09-01', '2021-11-01'];
print(dates);
var Lista_xCH4 = xCH4_serie(dates,serie0);
//++
// Map.addLayer(collection.mean(), band_viz, 'S5P CH4');
// Map.addLayer(collection.mean(), band_viz, 'S5P CH4');
var serie1 = "xCH4 Annual: ";
var dates2 = ['2019-02-01','2020-01-01','2021-01-01','2021-11-01'];
// var xCH4_L3_data = xCH4_mosaic(col,prop,rangeDates).set('system:time_start', ee.Date(rangeDates[1]).millis(),'dateYMD', ee.Date(rangeDates[1]).format('YYYY-MM-dd'));
var Lista_xCH4 = xCH4_serie(dates2,serie1);
//*******************************************************************************************
// 3. Adding Legend
//*******************************************************************************************
//
//var Mining_point = /* color: #d63000 */ee.Geometry.Point([-69.977972,-13.038251]);
// List of values
var vizS5p = {
  min: 1750,
  max: 1890,//1950,
  palette:['0000C0','0420FD','1443FF','2D74FF','3E95FF','53AAFF','69BFFF','7CD0FF','88DCFF','95E9FF','A2F0FF','B4F7FF','C7FFFF','D8FFFF','EDFFFF','FFFFFF','FFFFAB','FFFF46','FFFD00','FFE900','FFD400','FFC100','FFA300','FF8700','FF6500','FF3100','FF0000','EB0000','D00000','BD0000','820000']
  // palette:['0000C0','0420FD','1443FF','2D74FF','3E95FF','53AAFF','69BFFF','7CD0FF','88DCFF','95E9FF','A2F0FF','B4F7FF','C7FFFF','D8FFFF','EDFFFF','FFFFFF','FFFFAB','FFFF46','FFFD00','FFE900','FFD400','FFC100','FFA300','FF8700','FF6500','FF3100','FF0000','EB0000','D00000','BD0000','820000']
  // palette:["black", "blue", "purple", "cyan", "green", "yellow", "red"]
};
// add the map
//Map.addLayer(P, viz);
// set position of panel
var legendS5P = ui.Panel({
style: {
position: 'middle-left',
padding: '4px 5px'
}
});
// Create legend title
var legendS5PTitle = ui.Label({
value: 'CH4 Mixing Ratio',
style: {
fontWeight: 'bold',
fontSize: '11px',
margin: '0 0 4px 0',
padding: '0'
}
});
var legendS5PTitle1 = ui.Label({
value: 'OCT 2021 (ppb)',
style: {
fontWeight: 'bold',
fontSize: '11px',
margin: '0 0 4px 0',
padding: '0'
}
});
var legendS5PTit2 = ui.Label({
  value: 'SENTINEL-5P',
  style: {
    fontWeight: 'bold',
    //fontStyle: 'italic',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legendS5P.add(legendS5PTitle);
legendS5P.add(legendS5PTitle1);
// legendS5P.add(legendS5PTitle2);
// create the legend image
var long = ee.Image.pixelLonLat().select('latitude');
var gradient = long.multiply((vizS5p.max-vizS5p.min)/100.0).add(vizS5p.min);
var legendImage = gradient.visualize(vizS5p);
// create text on top of legend
var panel = ui.Panel({
widgets: [
  ui.Label('Max: ≥ 1890', {fontSize: '10px',fontWeight: 'bold'})
  // ui.Label('Max: ≥ 1950', {fontSize: '10px',fontWeight: 'bold'})
// ui.Label(vizS5p['max'], {fontSize: '10px',fontWeight: 'bold'})
],
});
legendS5P.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
//params: {bbox:'0,0,10,100', dimensions:'10x200'},
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legendS5P.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
  ui.Label('Min: ≤ 1750',{fontSize: '10px',fontWeight: 'bold'}),
// ui.Label(vizS5p['min'],{fontSize: '10px',fontWeight: 'bold'}),
// ui.Label('Choose a satellite image...', {fontSize: '12px',fontWeight: 'bold',color: 'ff0000'}),
],
});
//legendS5P.add(panel);
//Map.add(legend);
legendS5P.add(panel);
Map.add(legendS5P);
Map.setCenter(-61.58, -13.77, 4);
Map.setOptions('Hybrid')