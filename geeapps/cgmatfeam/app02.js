//CRIAR TITULO
var title = ui.Label('Centro de Geotecnologias e Monitoramento Ambiental Territorial');
title.style().set('position', 'top-center');
Map.add(title);
// CRIAR PAINEL LATERAL
var panel = ui.Panel();
panel.style().set({
  height: '600px',
  width: '400px',
  position: 'top-right'
});
Map.add(panel)
//VARIÁVEIS
//AOI
var B_B1 = ee.Geometry.Polygon(-44.121225, -20.116758, -44.121261, -20.117807, -44.119411, -20.120919, -44.117580, -20.121418, -44.117891, -20.121916, -44.118954, -20.121882, -44.119357, -20.122106, -44.120107, -20.122364, -44.122012, -20.121039, -44.122506, -20.120317, -44.122616, -20.119028,-44.122470, -20.118357, -44.122122, -20.117703, -44.121627, -20.117446, -44.121627, -20.117102, -44.121170, -20.116723)
Map.centerObject(B_B1, 16)
/*
Author: Sofia Ermida (sofia.ermida@ipma.pt; @ermida_sofia)
This code is free and open. 
By using this code and any data derived with it, 
you agree to cite the following reference 
in any publications derived from them:
Ermida, S.L., Soares, P., Mantas, V., Göttsche, F.-M., Trigo, I.F., 2020. 
    Google Earth Engine open-source code for Land Surface Temperature estimation from the Landsat series.
    Remote Sensing, 12 (9), 1471; https://doi.org/10.3390/rs12091471
Example 2:
  This example shows how to get LST time series at the SURFRAD DRA site
  it corresponds to the method used to extract time series 
  for comparison with station LST used in Ermida et al. (2020)
*/
// link to the code that computes the Landsat LST
var LandsatLST = require('users/sofiaermida/landsat_smw_lst:modules/Landsat_LST.js')
// link to the code that computes broad-band emissivity
var BBE = require('users/sofiaermida/landsat_smw_lst:modules/broadband_emiss.js')
// select region of interest, date range, and landsat satellite
var site = ee.Geometry.Point([-44.121591,-20.120025]);
var geometry = site.buffer(50);
var date_start = '2018-12-01';
var date_end = '2019-02-28';
var use_ndvi = true;
// compute the LST for each Landsat
var L8coll = LandsatLST.collection('L8', date_start, date_end, geometry, use_ndvi);
var L7coll = LandsatLST.collection('L7', date_start, date_end, geometry, use_ndvi);
var L5coll = LandsatLST.collection('L5', date_start, date_end, geometry, use_ndvi);
var L4coll = LandsatLST.collection('L4', date_start, date_end, geometry, use_ndvi);
// compute broadband emissivity
L8coll = L8coll.map(BBE.addBand(true))
L7coll = L7coll.map(BBE.addBand(true))
L5coll = L5coll.map(BBE.addBand(true))
L4coll = L4coll.map(BBE.addBand(true))
// get bands for each landsat in one collection
var getband = function(landsat, bandname){
  var wrap = function(image){
    return image.select(bandname).rename(bandname.concat('_').concat(landsat))
  }
  return wrap
}
// merge all Landsat LST collections for the chart
var bandname = 'LST'
var LandsatColl = L8coll.map(getband('L8',bandname));
LandsatColl = LandsatColl.merge(L7coll.map(getband('L7',bandname)));
LandsatColl = LandsatColl.merge(L5coll.map(getband('L5',bandname)));
LandsatColl = LandsatColl.merge(L4coll.map(getband('L4',bandname)));
var TimeSeries = ui.Chart.image.series(
     LandsatColl, geometry, ee.Reducer.mean(), 30, 'system:time_start')
          .setChartType('ScatterChart')
          .setOptions({
          vAxis: {title: bandname},
           lineWidth: 1,
            pointSize: 4
});
panel.add(TimeSeries)
//AOI
var B_B1 = ee.Geometry.Polygon(-44.121225, -20.116758, -44.121261, -20.117807, -44.119411, -20.120919, -44.117580, -20.121418, -44.117891, -20.121916, -44.118954, -20.121882, -44.119357, -20.122106, -44.120107, -20.122364, -44.122012, -20.121039, -44.122506, -20.120317, -44.122616, -20.119028,-44.122470, -20.118357, -44.122122, -20.117703, -44.121627, -20.117446, -44.121627, -20.117102, -44.121170, -20.116723)
Map.centerObject(B_B1, 16)
Map.addLayer(B_B1)
//ADD MAPLAYRES
var vis_lst = {
  min: 20,
  max: 40,
  palette: [
    'f012ff', '9118ff', '1612ff', '14e9ff', '14ff26', 'e6ff14', 'ffb818', 'ff1f08'
  ],
};
var listOfImages = LandsatColl.toList(LandsatColl.size());
var LST8img1 = ee.Image(listOfImages.get(0))
  .clip(B_B1)
  .subtract(273.15);
Map.addLayer(LST8img1,vis_lst, "2018-12-13")
var LST8img2 = ee.Image(listOfImages.get(5))
  .clip(B_B1)
  .subtract(273.15);
Map.addLayer(LST8img2,vis_lst, "2018-12-21")
var LST8img3 = ee.Image(listOfImages.get(1))
  .clip(B_B1)
  .subtract(273.15);
Map.addLayer(LST8img3,vis_lst, "2018-12-29")
var LST8img4 = ee.Image(listOfImages.get(7))
  .clip(B_B1)
  .subtract(273.15);
Map.addLayer(LST8img4,vis_lst, "2019-01-22")
var LST8img5 = ee.Image(listOfImages.get(3))
  .clip(B_B1)
  .subtract(273.15);
var composicao = ee.ImageCollection([LST8img1, LST8img2, LST8img3, LST8img4, LST8img5])
Map.addLayer(LST8img5,vis_lst, "2019-01-30")
Map.addLayer(geometry)
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis_lst.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis_lst.min, {margin: '4px 8px'}),
    ui.Label(
        ((vis_lst.max +vis_lst.min)/ 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis_lst.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Temperatura da superfície da terra (ºC)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
panel.widgets().set(3, legendPanel);