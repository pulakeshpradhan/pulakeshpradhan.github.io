var india = ee.FeatureCollection("users/rinkalpatel/admin_boundaries/india_bd");
var stackCollection = function(collection) {
    var first = ee.Image([]);
    var appendBands = function(image, previous) {
      return ee.Image(previous).addBands(image);
    };
    return ee.Image(collection.iterate(appendBands, first));
}
var get_modEVI_collection = function(extent,start,end){
  var mod09gq = ee.ImageCollection('MODIS/006/MOD09GQ')
                .select(['sur_refl_b01', 'sur_refl_b02'],['b01', 'b02'])
                .filterDate(start,end)
                .filterBounds(extent);
  var mod09ga = ee.ImageCollection('MODIS/006/MOD09GA')
              .select(['state_1km'],['state'])
              .filterDate(start,end)
              .filterBounds(extent);
  var myd09gq = ee.ImageCollection('MODIS/006/MYD09GQ')
              .select(['sur_refl_b01', 'sur_refl_b02'],['b01', 'b02'])
              .filterDate(start,end)
              .filterBounds(extent);
  var myd09ga = ee.ImageCollection('MODIS/006/MYD09GA')
              .select(['state_1km'],['state'])
              .filterDate(start,end)
              .filterBounds(extent);
  var calculateEVI = function(scene) {
    var img = ee.Image(scene)
    var dateString = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
    var evi = img.expression('(2.5 * (NIR - RED)) / (NIR + 2.4 * RED + 10000)', {
        'NIR': img.select('b02'),
        'RED': img.select('b01')});
    var mask = img.expression("(state%8) == 0 ? 1 : 0",{'state':img.select('state')}).eq(1);
    evi = evi.updateMask(mask).reproject('EPSG:4326', null, 500);
    evi = evi.set('system:time_start',img.get('system:time_start'))
    evi = evi.rename('evi')
    evi = evi.updateMask(evi.gt(0.2))
    return evi ;
  };
  var innerJoin = ee.Join.inner();
  var filterTimeEq = ee.Filter.equals({
    leftField: 'system:time_start',
    rightField: 'system:time_start'
  });
  //// MODIS Aqua + Terra
  var joined_mod = innerJoin.apply(mod09gq,mod09ga,filterTimeEq);
  var mod09qs = joined_mod.map(function(feature) {
    return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  });
  var joined_myd = innerJoin.apply(myd09gq,myd09ga,filterTimeEq);
  var myd09qs = joined_myd.map(function(feature) {
    return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  });
  var modEVI = mod09qs.map(calculateEVI);
  var mydEVI = myd09qs.map(calculateEVI);
  // Combine 
  var mod_evi_collection = ee.ImageCollection(modEVI.merge(mydEVI))
  return mod_evi_collection
}
var get_sentinel2_maxEVI = function(extent,start,end){
  var calculate_S2_EVI = function(scene) {
    var img = ee.Image(scene)
    var dateString = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
    var evi = img.expression('(2.5 * (NIR - RED)) / (NIR + 2.4 * RED + 10000)', {
        'NIR': img.select('B8'),
        'RED': img.select('B4')});
    var cloud_high_mask = img.expression("(state%9) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
    var cloud_med_mask = img.expression("(state%8) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
    var shadow_mask = img.expression("(state%3) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
    evi = evi.updateMask(cloud_high_mask);
    evi = evi.updateMask(cloud_med_mask);
    evi = evi.updateMask(shadow_mask);
    evi = evi.set('system:time_start',img.get('system:time_start'))
    evi = evi.rename('evi')
    evi = evi.updateMask(evi.gt(0.2))
    return evi ;
  };
  var s2mask = require('users/fitoprincipe/geetools:cloud_masks').sentinel2;
  //var collection = ee.ImageCollection("COPERNICUS/S2_SR")
  var s2_collection = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(extent)
    .filterDate(start,end)
    .map(s2mask());
  var s2_evi_collection = s2_collection.map(calculate_S2_EVI)
  var s2_evi = ee.Image(s2_evi_collection.max()).clip(extent);
  return s2_evi
}
var get_modis_timeseries = function(evi_collection,start,end,delta,thresh){
  var startDate = ee.Date(start);
  var endDate = ee.Date(end);
  var numberOfWindows = endDate.difference(startDate,'day').divide(delta).toInt();
  var sequence = ee.List.sequence(0, numberOfWindows); 
  var delta_composite = function(num){
    num = ee.Number(num);
    var windowStart = startDate.advance(num.multiply(delta), 'day');
    var windowEnd = startDate.advance(num.add(1).multiply(delta), 'day');
    var subset = evi_collection.filterDate(windowStart,windowEnd);
    return subset.max().set('system:time_start',windowStart);
  }
  var mod_sequence = sequence.map(delta_composite)
  var composites = ee.ImageCollection.fromImages(mod_sequence);
  return composites
}
var get_timeseries_chart = function(composites,band_name,extent,delta,source,year){
  return(ui.Chart.image.series(composites.select(['evi']), extent, ee.Reducer.max(), 30)
      .setOptions({title: source+' '+delta+'-day max-EVI : '+year,lineWidth: 1,pointSize: 3,
        hAxis: {title:'',format: 'MMM,YY'},vAxis: {title:'EVI', minValue: 0, maxValue: 1}}));
}
var add_EVI_legend = function(legend_title,legend_params,location){
  var legend = ui.Panel({style: {position: location,padding: '8px 15px'}});
  var legendTitle = ui.Label({
    value: legend_title,style: {
    fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}
  });
  legend.add(legendTitle);
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((legend_params.max-legend_params.min)/100.0).add(legend_params.min);
  var legendImage = gradient.visualize(legend_params);
  var panel = ui.Panel({widgets: [ui.Label(legend_params['max'])],});
  legend.add(panel);
  var thumbnail = ui.Thumbnail({
    image: legendImage,params: {bbox:'0,0,10,100',dimensions:'10x200'},style: {padding: '1px', position: 'bottom-center'}
  });
  legend.add(thumbnail);
  panel = ui.Panel({widgets: [ui.Label(legend_params['min'])],});
  legend.add(panel);
  Map.add(legend);
}
var removeLayer = function(name) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
}
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
/////
var year_1=2017
var year_2=2018
var mm_dd_beg='-05-01'
var mm_dd_end='-04-30'
var delta_days = 3; 
var evi_thresh = 0.2;
var harmonics = 5;
var curr_year_harmonics = 2;
var crop_thresh = 0.18
var evi_params =  { min: 0, max: 1,
                     palette: [
                      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                      '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                      '012E01', '011D01', '011301'
                      ]
                  }
var evi_diff_params = {min:-0.35,max:0.35,palette:['red','crimson','white','blue','violet']}
////////////////////
//////////////////
// UI 
//////////////////
var places = {Gujarat:"IND.11_1",Maharashtra:"IND.20_1",Telangana:"IND.32_1",
              Karnataka:"IND.16_1",Andhra:"IND.2_1",Odisha:"IND.26_1",Chattisgarh:"IND.7_1",
              TamilNadu:"IND.31_1"};
var title = ui.Label('Crop Growth via Enhanced Vegetative Index : Comparison across years (2017:2019-YTD)');
title.style().set('position', 'top-center');
Map.add(title);
add_EVI_legend('EVI',evi_params,'bottom-left') 
add_EVI_legend('deltaEVI',evi_diff_params,'bottom-right') 
////
var state = 'IND.32_1' // Telangana
var extent = ee.FeatureCollection(india).filter(ee.Filter.stringStartsWith('GID_1',state))
var coords=ee.Geometry(extent.getInfo()['features'][0]['geometry']).centroid().getInfo()['coordinates']
Map.setCenter(coords[0],coords[1], 6)
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    state = places[key]
    extent = ee.FeatureCollection(india)
               .filter(ee.Filter.stringStartsWith('GID_1',state))
    //var cdl=get_cdl(extent,cdl_year)
    //removeLayer('CDL-'+cdl_year)
    //Map.addLayer(cdl, {}, 'CDL-'+cdl_year,0);
    // year-1
    var start_1 = year_1+mm_dd_beg
    var end_1 = (year_1+1)+mm_dd_end
    //var mod_evi_1 = get_modEVI_collection(extent,start_1,end_1).filterBounds(extent)
    //var mod_evi_max_1 = ee.Image(mod_evi_1.max()).clip(extent);
    //var mod_evi_mean_1 = ee.Image(mod_evi_1.mean()).clip(extent);
    //var diff_max_mean_1 = mod_evi_max_1.subtract(mod_evi_mean_1)
    //var diff_max_mean_1 = ee.Image(brazil_crop_map.filterDate(start_1,end_1).mosaic()).clip(extent)
    //var crop_mask = diff_max_mean_1.gt(crop_thresh)
    //diff_max_mean_1 = diff_max_mean_1.updateMask(crop_mask)
    //removeLayer('Crop Mask : Max-Mean EVI : '+year_1)
    //Map.addLayer(diff_max_mean_1,evi_params,'Crop Mask : Max-Mean EVI : '+year_1,1);
    var s2_evi_max_1 = get_sentinel2_maxEVI(extent,start_1,end_1)
    //var s2_evi_max_1 = ee.Image(s2_evi_1.max()).clip(extent);
    //s2_evi_max_1 = s2_evi_max_1.updateMask(crop_mask)
    removeLayer('Sentinel-2 : Max EVI : '+year_1)
    Map.addLayer(s2_evi_max_1,evi_params,'Sentinel-2 : Max EVI : '+year_1,0);
    // year-2
    var start_2 = year_2+mm_dd_beg
    var end_2 = (year_2+1)+mm_dd_end
    var s2_evi_max_2 = get_sentinel2_maxEVI(extent,start_2,end_2)
    //var s2_evi_max_2 = ee.Image(s2_evi_2.max()).clip(extent);
    //s2_evi_max_2 = s2_evi_max_2.updateMask(crop_mask)
    removeLayer('Sentinel-2 : Max EVI : '+year_2)
    Map.addLayer(s2_evi_max_2,evi_params,'Sentinel-2 : Max EVI : '+year_2,0);
    // Plot Sentinel-2 delta
    var s2_evi_diff_2=s2_evi_max_1.subtract(s2_evi_max_2)
    removeLayer('delta-EVI : '+year_1+'-'+year_2)
    Map.addLayer(s2_evi_diff_2,evi_diff_params,'delta-EVI : '+year_1+'-'+year_2,1);
    var coords=ee.Geometry(extent.getInfo()['features'][0]['geometry']).centroid().getInfo()['coordinates']
    Map.setCenter(coords[0],coords[1], 6)
  }
});
select.setPlaceholder('Select a state');
var state_panel = ui.Panel({style: {width: '100px',position: 'top-right'}});
state_panel.add(select);
var panel = ui.Panel({style: {width: '450px'}});
panel.add(ui.Label('    Then click a field-centroid of interest'));
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  panel.widgets().set(1, ui.Label(location));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var field_extent = point.buffer(125)
  removeLayer('Selected field')
  Map.addLayer(field_extent,{},'Selected field')
  //// year-1
  var start_1 = year_1+mm_dd_beg
  var end_1 = (year_1+1)+mm_dd_end
  var modEVI_col_1 = get_modEVI_collection(extent,start_1,end_1)
  var modis_timeseries_1 = get_modis_timeseries(modEVI_col_1,start_1,end_1,delta_days,evi_thresh)
  //// year-2
  var start_2 = year_2+mm_dd_beg
  var end_2 = (year_2+1)+mm_dd_end
  var modEVI_col_2 = get_modEVI_collection(extent,start_2,end_2)
  var modis_timeseries_2 = get_modis_timeseries(modEVI_col_2,start_2,end_2,delta_days,evi_thresh)
  //// Get timeseries charts (MODIS)
  var p1 = get_timeseries_chart(modis_timeseries_1,'evi',field_extent,delta_days,'MODIS',year_1)
  var p2 = get_timeseries_chart(modis_timeseries_2,'evi',field_extent,delta_days,'MODIS',year_2)
  // Add charts to the panel
  panel.widgets().set(2, p1);
  panel.widgets().set(3, p2);
});
ui.root.add(state_panel);
ui.root.add(panel);