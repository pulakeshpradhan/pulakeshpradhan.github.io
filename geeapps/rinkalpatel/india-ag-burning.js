var mod14 = ee.ImageCollection("MODIS/006/MOD14A1"),
    myd14 = ee.ImageCollection("MODIS/006/MYD14A1"),
    india = ee.FeatureCollection("users/rinkalpatel/admin_boundaries/india_bd"),
    mod11 = ee.ImageCollection("MODIS/006/MOD11A1"),
    myd11 = ee.ImageCollection("MODIS/006/MYD11A1"),
    firms = ee.ImageCollection("FIRMS"),
    sel_area = /* color: #d63000 */ee.Geometry.Polygon(
        [[[74.48390639596664, 30.83941651750553],
          [74.48390639596664, 30.74917163070155],
          [74.57317031198227, 30.74622102236705],
          [74.57385695749008, 30.834699930101255]]]),
    sel_area_19 = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[75.7790151243205, 30.21391604391997],
          [75.82004219341229, 30.21495442981998],
          [75.83995491313885, 30.242690109750868],
          [75.79806953716229, 30.243728191837224],
          [75.78553825664471, 30.239279191406162]]]),
    sel_area_esa = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[74.78808829615173, 31.124443984051055],
          [74.79358146021423, 30.969137863280405],
          [74.95837638208923, 30.955006566132738],
          [74.98584220240173, 31.129146272162814]]]),
    burning_area_19 = /* color: #00ffff */ee.Geometry.Polygon(
        [[[76.03072587903011, 30.554976728171447],
          [76.03021089489926, 30.536792577074007],
          [76.07432786877621, 30.53501833122518],
          [76.07484285290707, 30.557637537766613]]]);
// Selected geometry
var sel_field = ee.Geometry(burning_area_19)
// State level analysis
var state1='IND.11_1' // Gujarat
var state2='IND.20_1' // Maharashtra
var state3='IND.32_1' // Telangana
var state4='IND.16_1' // Karnataka
var state5='IND.2_1' // Andhar Pradesh
var state6='IND.26_1' // Odisha
var state7='IND.7_1' // Chattisgarh
var state8='IND.31_1' // Tamil Nadu
var state9='IND.12_1' // Haryana
var state10='IND.25_1' // NCT of Delhi
var state11='IND.28_1' // Punjab
var extent1=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state1));
var extent2=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state2));
var extent3=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state3));
var extent4=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state4));
var extent5=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state5));
var extent6=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state6));
var extent7=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state7));
var extent8=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state8));
var extent9=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state9));
var extent10=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state10));
var extent11=ee.FeatureCollection(india.filterMetadata("GID_1","equals",state11));
// Initialize final extent
var extent = extent11.merge(extent9)
Map.addLayer(extent,{},'India',0)
var coords=ee.Geometry(extent.getInfo()['features'][0]['geometry']).centroid().getInfo()['coordinates']
Map.setCenter(coords[0],coords[1], 6)
Map.setOptions('SATELLITE')
// Initialize functions
var get_firms_collection = function(extent,start,end){
  // Get all imagery collection
  var coll = ee.ImageCollection(firms)
                  .select(['T21','confidence'],['K','Q'])
                  .filter(ee.Filter.date(start,end))
                  .filterBounds(extent);
  // Create mask pixels with less than 50% confidence
  var apply_qmask = function(scene){
    var img = ee.Image(scene)
    //var qmask = img.expression("(Q<55) == 0 ? 1 : 0",{'Q':img.select('Q')}).eq(1);
    //img = img.updateMask(qmask)
    return img
  }
  // Apply the mask and return back
  return coll.map(apply_qmask)
}
var get_firms_timeseries = function(firms_collection,start,end,delta){
  var startDate = ee.Date(start);
  var endDate = ee.Date(end);
  var numberOfWindows = endDate.difference(startDate,'day').divide(delta).toInt();
  var sequence = ee.List.sequence(0, numberOfWindows); 
  var delta_composite = function(num){
    num = ee.Number(num);
    var windowStart = startDate.advance(num.multiply(delta), 'day');
    var windowEnd = startDate.advance(num.add(1).multiply(delta), 'day');
    var subset = firms_collection.filterDate(windowStart,windowEnd);
    return subset.max().set('system:time_start',windowStart);
  }
  var mod_sequence = sequence.map(delta_composite)
  var composites = ee.ImageCollection.fromImages(mod_sequence);
  return composites
}
var get_firms_timeseries_chart = function(composites,extent,source){
  return(ui.Chart.image.series(
    composites.select('K'), extent, ee.Reducer.mean(),3)
      .setOptions({title: source+' (K)',lineWidth: 1,pointSize: 3,
        hAxis: {title:'Date'},vAxis: {title:'deg-K'}}));
}
// Initialize palette
var fireMaskVis = {
  min: 0.0,
  max: 6000.0,
  bands: ['MaxFRP', 'FireMask', 'FireMask'],
};
var firmsMaskVis = {
  min: 300,
  max: 400,
  palette: ['blue','orange','red'],
  bands: ['K'],
};
var rgbVis = {
  min: [0,0,0],max: [2500, 2500, 2500],
  bands: ['B4', 'B3', 'B2'],
};
var swirVis = {
  min: [0,0,0],max: [4000, 4000, 4000],
  bands: ['B12', 'B8', 'B4'],
};
var nbiVis={min: 0,max: 0.5,palette: ['white','yellow', 'orange', 'red']}
// Initialize dates
var year_1=2018
var year_2=2019
var delta=1
var start_1=year_1+'-10-21'
var end_1=year_1+'-10-31'
var start_2=year_2+'-10-21'
var end_2=year_2+'-10-31'
// Initialize data sets
var prev_data = get_firms_collection(extent,start_1,end_1);
var curr_data = get_firms_collection(extent,start_2,end_2);
// Generate time-series chat and plot
var firms_coll_1 = get_firms_timeseries(prev_data,start_1,end_1,delta)
var firms_coll_2 = get_firms_timeseries(curr_data,start_2,end_2,delta)
var firms_coll = firms_coll_1.merge(firms_coll_2)
print(firms_coll)
var series_chart = get_firms_timeseries_chart(firms_coll,sel_field,'FIRMS')
print(series_chart)
//Map.addLayer(prev_data.mean(), firmsMaskVis, 'Fire Mask:'+year_1,0);
//Map.addLayer(curr_data.mean(), firmsMaskVis, 'Fire Mask:'+year_2,0);
// Based on the time series plot, select dates for RGB Vis
////////////////////////
// Sentinel-2 Composite
var calculate_S2_NBI = function(scene) {
  var img = ee.Image(scene)
  var dateString = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
  var nbi = img.expression('(2.5 * (SWIR - NIR)) / (SWIR + 2.4 * NIR + 10000)', {
      'SWIR': img.select('B12'),
      'NIR': img.select('B8')});
  var cloud_high_mask = img.expression("(state%9) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  var cloud_med_mask = img.expression("(state%8) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  var shadow_mask = img.expression("(state%3) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  nbi = nbi.updateMask(cloud_high_mask);
  //nbi = nbi.updateMask(cloud_med_mask);
  nbi = nbi.updateMask(shadow_mask);
  var nbi_mask = nbi.gt(0.25)
  nbi = nbi.updateMask(nbi_mask)
  nbi = nbi.set('system:time_start',img.get('system:time_start'))
  nbi = nbi.rename('nbi')
  return nbi ;
};
var clean_S2_collection = function(scene) {
  var img = ee.Image(scene)
  var dateString = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
    var nbi = img.expression('(2.5 * (SWIR - NIR)) / (SWIR + 2.4 * NIR + 10000)', {
      'SWIR': img.select('B12'),
      'NIR': img.select('B8')});
  var cloud_high_mask = img.expression("(state%9) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  var cloud_med_mask = img.expression("(state%8) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  var shadow_mask = img.expression("(state%3) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  img = img.updateMask(cloud_high_mask);
  //img = img.updateMask(cloud_med_mask);
  img = img.updateMask(shadow_mask);
  //var nbi_mask = nbi.gt(0.2);
  //img = img.updateMask(nbi_mask);
  return img ;
};
var s2mask = require('users/fitoprincipe/geetools:cloud_masks').sentinel2;
var s2_start='2019-11-04'
var s2_end='2019-11-05'
var s2_collection = ee.ImageCollection("COPERNICUS/S2_SR")
//var s2_collection = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(extent)
  .filterDate(s2_start,s2_end)
  .map(s2mask());
print(s2_collection)
Map.addLayer(s2_collection.map(clean_S2_collection).mosaic().clip(extent), rgbVis,'Sentinel-2 : RGB');
Map.addLayer(s2_collection.map(clean_S2_collection).mosaic().clip(extent), swirVis,'Sentinel-2 : SWIR');
Map.addLayer(s2_collection.map(calculate_S2_NBI).max().clip(extent), nbiVis,'Sentinel-2 : NBI');
//Creation of vector
var nbi = s2_collection.map(calculate_S2_NBI).max().clip(extent)
var zones = nbi.gt(0.3);
zones = zones.updateMask(zones.neq(0.3));
var vectors = zones.addBands(nbi).reduceToVectors({
 geometry: sel_field,
 crs: nbi.projection(),
 scale: 20,
 geometryType: 'polygon',
 eightConnected: false,
 labelProperty: 'zone',
 reducer: ee.Reducer.mean()});
var buffer = function(feature) {
 return feature.buffer(100);};
var bounds = vectors.map(buffer);
//Map.addLayer(bounds,{},'Fire Area Buffer')