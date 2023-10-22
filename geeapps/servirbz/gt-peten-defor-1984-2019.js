////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Last updated: 18 November 2019
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var roi = ee.Geometry.Rectangle(-91.5, 15.5, -87.7, 18.7);
var roi2 = ee.FeatureCollection("users/servirbz/aoi/lac/cam/gt/gt_borders_peten_l2");
var pa0 = ee.FeatureCollection('WCMC/WDPA/current/polygons').filter(ee.Filter.inList('ISO3', ['GTM']));
var pa = ee.Image().byte().paint({featureCollection:pa0,color:'ffffff',width:1}).clip(roi2);
var bnds = ee.Image().byte().paint({featureCollection:"projects/servir-wa/aoi/world_country_bounds_esri",width:3});
var dist = ee.Image().byte().paint({featureCollection:"users/servirbz/aoi/lac/cam/gt/gt_borders_peten_l2",width:2});
var msk_wtr = ee.Image('UMD/hansen/global_forest_change_2015').select('datamask').eq(1);
//var msk_for = ee.FeatureCollection("users/servirbz/compil_ecosys/terrestrial/forest_cover/bz_fcover_landsat_svr_1980");
var logo = ee.Image("users/servirbz/compil_imagery/_logos/logo_svr");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var img1 = ee.Image("users/servirbz/x_tmp/cam_defor_landtrendr/cam_forest_loss_lt_nbr_1984_2019_30m");
var chg1 = img1.updateMask(img1.select('yod').neq(0)).updateMask(msk_wtr).clip(roi2).select('yod');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// palettes
var pal1 = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];
var yodVizParms = {min: 1984,  max: 2019,  palette: pal1};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var histo_fc = ui.Chart.image.histogram(chg1, roi2, 100) // 100m x 100m = 1 hectare
  .setSeriesNames(['Area disturbed (ha.)'])
  .setOptions({title: 'Forest area disturbed, 1984-2019', hAxis: {title: 'Year'}, vAxis: {title: 'Area (hectares)'},
  series: {0: {color: 'red'}}
}); 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// display the change attribute map - note that there are other layers - print changeImg to console to see all
Map.setOptions('SATELLITE');
Map.centerObject(roi2, 9);
Map.style().set({cursor:'crosshair'});
Map.addLayer(chg1, yodVizParms, 'LC 1984-2019 (NBR) 1', true);
Map.addLayer(dist,{palette: "silver"},'Districts', true);
Map.addLayer(bnds,{palette: "white"},'International boundaries', true);
Map.addLayer(pa,{palette: "lime"},'Protected Areas', true);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 3: UI PANEL
var main = ui.Panel({style: {width: '310px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Petén, Guatemala forest disturbance: 1984-2019', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
var descr = ui.Label("The different colors display forest areas disturbed (e.g. deforested or burned) between 1984 and 2019. Click on an area to see what year it was disturbed. Purple areas shown in the Maya Biosphere Reserve may be due to noise in the original data.", {color: 'black'});
var credits = ui.Label('credits: based on Landsat data from NASA, USGS, and outputs of the LandTrendr algorithm (Kennedy et al. 2010)', {fontSize: '12px', color: 'gray'});
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'128px',height:'108.5px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var turbLabel2 = 'Year disturbed: ';
function showTurb(turbval) {turbLabel2 = 'Year disturbed: ' + turbval;
        main.widgets().set(2, ui.Label(turbLabel2, {color: 'red'}));
}
function inspect(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var turbval = chg1.reduceRegion({reducer: ee.Reducer.first(),geometry: point, scale: 30}).get('yod');
  turbval.evaluate(showTurb);
}
Map.onClick(inspect);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: pal1,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(pal1.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendTitle = ui.Label({
  value: 'Legend: year of disturbance',
  style: {fontWeight: 'bold'}
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(1984, {margin: '4px 8px'}),
    ui.Label(2001, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(2019, {margin: '4px 8px'})],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
//Map.setControlVisibility(false);
//Map.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 4: ADD ITEMS TO UI
main.add(title);
main.add(descr);
main.widgets().set(2, ui.Label(turbLabel2, {color: 'red'}));
main.add(histo_fc);
main.add(legendPanel);
main.add(credits);
main.add(branding);
ui.root.insert(0, main);
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////