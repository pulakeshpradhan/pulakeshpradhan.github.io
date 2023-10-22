var Swiss_Cantons = ui.import && ui.import("Swiss_Cantons", "table", {
      "id": "users/magosilvain/Schweiz_Kantone"
    }) || ee.FeatureCollection("users/magosilvain/Schweiz_Kantone"),
    ZH_PLZ_ORTSCHAFTEN = ui.import && ui.import("ZH_PLZ_ORTSCHAFTEN", "table", {
      "id": "users/hydrosolutions/ZH_PLZ_ORTSCHAFTEN_WGS84"
    }) || ee.FeatureCollection("users/hydrosolutions/ZH_PLZ_ORTSCHAFTEN_WGS84"),
    ZH_PLZ_ORTSCHAFTEN_WGS84 = ui.import && ui.import("ZH_PLZ_ORTSCHAFTEN_WGS84", "table", {
      "id": "users/hydrosolutions/ZH_PLZ_ORTSCHAFTEN_WGS84"
    }) || ee.FeatureCollection("users/hydrosolutions/ZH_PLZ_ORTSCHAFTEN_WGS84"),
    Zurich_ST_MODday_24yr_cc50 = ui.import && ui.import("Zurich_ST_MODday_24yr_cc50", "image", {
      "id": "users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODday_24yr_cc50"
    }) || ee.Image("users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODday_24yr_cc50"),
    Zurich_ST_MODnight_24yr_cc50 = ui.import && ui.import("Zurich_ST_MODnight_24yr_cc50", "image", {
      "id": "users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODnight_24yr_cc50"
    }) || ee.Image("users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODnight_24yr_cc50"),
    Zurich_ST_MODday_avg_24yrs = ui.import && ui.import("Zurich_ST_MODday_avg_24yrs", "image", {
      "id": "users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODday_avg_24yrs"
    }) || ee.Image("users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODday_avg_24yrs"),
    Zurich_ST_MODnight_avg_24yrs = ui.import && ui.import("Zurich_ST_MODnight_avg_24yrs", "image", {
      "id": "users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODnight_avg_24yrs"
    }) || ee.Image("users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODnight_avg_24yrs"),
    Zurich_ST_L7L8_24yr_cc20b_sens_wogaps = ui.import && ui.import("Zurich_ST_L7L8_24yr_cc20b_sens_wogaps", "image", {
      "id": "users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_L7L8_24yr_cc20b_sens_wogaps"
    }) || ee.Image("users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_L7L8_24yr_cc20b_sens_wogaps"),
    Zurich_ST_L7L8_avg_24yrs = ui.import && ui.import("Zurich_ST_L7L8_avg_24yrs", "image", {
      "id": "users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_L7L8_avg_24yrs"
    }) || ee.Image("users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_L7L8_avg_24yrs");
var selectedCanton = ee.Feature(Swiss_Cantons.filter(ee.Filter.eq('NAME', 'Zürich')).first());
print('selectedCanton',selectedCanton)
var point;
var point0=selectedCanton.centroid().geometry();
var textforPanel;
var chart;
var pd_client;
var img_ratio;
var dict2;
var outputs=ui.Panel();
var point_large_buffer=selectedCanton.geometry().simplify(100);//point.buffer(10000,100);
var point_buffer=point_large_buffer;//point.buffer(40000,30);//point.buffer(30000,30);
//var d = ee.Image().paint(Xiongan, 0, 2);
var d = ee.Image().paint(point_large_buffer, 0, 2);
var b = ee.Image().paint(ZH_PLZ_ORTSCHAFTEN,0,1);
var point_client;
//the app will always consider all the data until the last complete year:
var lastyear=ee.Number(ee.Algorithms.If(ee.Number(ee.Date(Date.now()).get('month')).gte(10),
  ee.Number(ee.Date(Date.now()).get('year')),
  ee.Number(ee.Date(Date.now()).get('year')).subtract(1)));
print('lastyear',lastyear)
//function to calculate client-side distances (not very accurate but good enough)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI/180);
}
/*var adm_0 = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var country_names=ee.List(adm_0.aggregate_array('country_na'));
var country_list=ee.Dictionary.fromLists(country_names.distinct(), country_names.distinct()).keys();
country_list=ee.List([ee.List(country_list).get(1)]).cat(ee.List(country_list).slice(4)).getInfo();
print(country_list)
var selectedCountry;*/
var satelliteMap = ui.Map();
satelliteMap.setControlVisibility(false);
satelliteMap.setOptions("HYBRID");
//satelliteMap.setControlVisibility({layerList: true});
satelliteMap.style().set('cursor', 'crosshair');
//satelliteMap.add(instruct);
//satelliteMap.setControlVisibility({zoomControl: true});
//satelliteMap.setControlVisibility({fullscreenControl: true});
satelliteMap.setControlVisibility({scaleControl: true});
var root_widgets = ui.root.widgets();
root_widgets.reset([satelliteMap]);
//Map.add(panel);
satelliteMap.centerObject(point_large_buffer)
var geet = require('users/elacerda/geet:geet'); 
//var geet = require('users/magosilvain/LST_Xiongan:geet_backup'); 
/*
// This function adds a cloud score band to landsat imagery
var cloudscore_pro = function(image) {
    var image2 = ee.Image(100).rename('cloud').where(ee.Image(image).select('BQA').eq(2720),0).where(ee.Image(image).select('BQA').eq(2724),0).where(ee.Image(image).select('BQA').eq(2728),0).where(ee.Image(image).select('BQA').eq(2732),0);
      var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': point_large_buffer, 'scale': 30,'tileScale':2}).get('cloud'));
      return ee.Image(image).updateMask(image2.select(['cloud']).lt(30))
        .set({'cloud_cover': cloudPixels});
};*/
// This function adds a cloud score band to landsat imagery
var cloudscore_pro = function(image) {
  var image2 = ee.Image(100).rename('cloud').where(ee.Image(image).select('BQA').eq(2720),0).where(ee.Image(image).select('BQA').eq(2724),0).where(ee.Image(image).select('BQA').eq(2728),0).where(ee.Image(image).select('BQA').eq(2732),0);
  var image3 =  image2.updateMask(ee.Image(image).select('QA_PIXEL').gt(1));
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': point_buffer, 'scale': 200,'maxPixels': 1e13}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': point_buffer, 'scale': 200}).get('cloud'));
  return image.addBands(ee.Image(100).rename('cloud').where(image2.select(['cloud']).lt(100),image2.select(['cloud'])))
    .updateMask(image2.select(['cloud']).lt(30))
    /*.set({'cloud_cover': cloudPixels})*/.set({'cloud_cover': cloudPixels2});
};
var cloudscore_L8_T1L2 = function(image,area_of_interest) {
 // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  // Develop masks for unwanted pixels (fill, cloud, cloud shadow).
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  //var saturationMask = image.select('QA_RADSAT').eq(0);  
  var mask = qaMask;//.add(saturationMask);
  var image2 = ee.Image(100).rename('cloud').where(qaMask.eq(1),0);//.where(saturationMask.eq(1),0);
  var image3 =  image2.updateMask(ee.Image(image).select('QA_PIXEL').neq(0));
  // Apply the scaling factors to the appropriate bands.
 /* var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);*/
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 200,'tileScale':2,'maxPixels': 1e13}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 200,'tileScale':2,'maxPixels': 1e13}).get('cloud'));
      return ee.Image(image)//.addBands(opticalBands, null, true)
      //.addBands(thermalBands, null, true)
      .updateMask(image2.select(['cloud']).lt(100)).addBands(image2)
        .addBands(mask.rename('mask'))
        .set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2})
        .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'))
      .set('SATELLITE','LANDSAT_8');
};
var cloudscore_L7_T1L2 = function(image,area_of_interest) {
//create an image which is 100 where there might be clouds and zero where the scene is clear or where there is water
//according to the landsat quality band
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var mask = qaMask;
  var image2 = ee.Image(100).rename('cloud').where(qaMask.eq(1),0);
 // var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
 // var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  var image3 =  image2.updateMask(ee.Image(image).select('QA_PIXEL').neq(0));
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': area_of_interest, 'scale': 100,'tileScale':8,'maxPixels': 1e13}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': area_of_interest, 'scale': 100,'tileScale':8,'maxPixels': 1e13}).get('cloud'));
  return ee.Image(image)//.addBands(opticalBands, null, true)
              //.addBands(thermalBand, null, true)
    .updateMask(image2.select(['cloud']).lt(100)).addBands(image2)
        .addBands(mask.rename('mask'))
    .set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2})
    .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'))
    .set('SATELLITE','LANDSAT_7');
};
var cloudscore = function(image) {
    var image2 = ee.Image(100).rename('cloud').where(ee.Image(image).select('BQA').eq(2720),0).where(ee.Image(image).select('BQA').eq(2724),0).where(ee.Image(image).select('BQA').eq(2728),0).where(ee.Image(image).select('BQA').eq(2732),0);
      return ee.Image(image).updateMask(image2.select(['cloud']).lt(30));
};
// This function adds a cloud score band to landsat imagery
var cloudscore_L5L7_pro = function(image) {
  var image2 = ee.Image(100).rename('cloud').where(ee.Image(image).select('BQA').eq(672),0).where(ee.Image(image).select('BQA').eq(676),0).where(ee.Image(image).select('BQA').eq(680),0).where(ee.Image(image).select('BQA').eq(684),0);
     // .updateMask(ee.Image(image).select('BQA').gt(1));
  var image3 = image2.updateMask(ee.Image(image).select('QA_PIXEL').gt(1));
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': point_buffer, 'scale': 200}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': point_buffer, 'scale': 200}).get('cloud'));
  return ee.Image(image).updateMask(image2.select(['cloud']).lt(30)).addBands(image2.where(ee.Image(image).select('BQA').gt(1),image2.add(ee.Image(1))))
        /*.set({'cloud_cover': cloudPixels})*/.set({'cloud_cover': cloudPixels2});
};
var removeoutliers = function(image) {
  var image1 = ee.Image(image).select('cloud').updateMask(ee.Image(image).select('cloud').neq(100));
  var image2= image1.where(image1.eq(1),0)
    .where(ee.Image(image).select('LST').lt(0),100);//a LST lower than 0 is not considered realistic
  var cloudPixels2 = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': point_buffer, 'scale': 200}).get('cloud'));
  return ee.Image(image).select('LST').updateMask(ee.Image(image).select('LST').gte(0)).addBands(image.select(['cloud']))
        .set({'cloud_cover': cloudPixels2});
};
var cloudscore_L5L7 = function(image) {
    var image2 = ee.Image(100).rename('cloud').where(ee.Image(image).select('BQA').eq(672),0).where(ee.Image(image).select('BQA').eq(676),0).where(ee.Image(image).select('BQA').eq(680),0).where(ee.Image(image).select('BQA').eq(684),0);
      return ee.Image(image).updateMask(image2.select(['cloud']).lt(30));
};
// FUNCTION 1 Get cloudy pixel L5 SR
var cloudscore_L5_pro = function(image) {    
  var image2 = ee.Image(100).rename('cloud').where(ee.Image(image).select('sr_cloud_qa').eq(0),0).where(ee.Image(image).select('sr_cloud_qa').eq(32),0);
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': point_large_buffer, 'scale': 30,'tileScale':2}).get('cloud'));
  return ee.Image(image).set({'cloud_cover': cloudPixels});
};
function joinCollections(imageCollection1, imageCollection2) {
  var filterTimeEq = ee.Filter.equals({
    leftField:'system:time_start', 
    rightField: 'system:time_start'
  });
  var joined = ee.Join.inner().apply(imageCollection1, imageCollection2, filterTimeEq);
  return joined.map(function(feature) {
    return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  });
}
var set_ndv = function(key, val){
  return ee.List([val, -9999]).reduce(ee.Reducer.firstNonNull());
};
var all_l8; var all_l9; 
var all_l7; 
var all_l5; var T1_SR_cc;
var daily_LST0;var daily_LST1; 
var daily_LST_count;
var annual_dLST_pro;
var linearIndependents= ee.List(['constant', 'bt']); 
var dependent = ee.String('LST'); 
var getmoredata=function(){
  //Load LANDSAT8 data  //Landsat 7QA_PIXEL
  all_l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_RT").filterBounds(point_buffer)
    .filter(ee.Filter.calendarRange(5,9, 'month'));//.filterDate(ee.Date.fromYMD(2013,9, 25), ee.Date.fromYMD(lastyear,12, 31));
  all_l9 = ee.ImageCollection("LANDSAT/LC09/C02/T1").filterBounds(point_buffer)
    .filter(ee.Filter.calendarRange(5,9, 'month'));//.filterDate(ee.Date.fromYMD(2013,9, 25), ee.Date.fromYMD(lastyear,12, 31));
  print('all_l8',all_l8);//
  //Load LANDSAT7 data
  all_l7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_RT").filterBounds(point_buffer)//.filterDate(ee.Date.fromYMD(2000,10, 1), ee.Date.fromYMD(lastyear,12, 31))
    .filter(ee.Filter.calendarRange(5,9, 'month')).filter(ee.Filter.calendarRange(1999,2021, 'year'));
  print('all_l7',all_l7);//
  /*  all_l5= ee.ImageCollection('LANDSAT/LT05/C01/T1').filterBounds(point_buffer).filterDate(ee.Date.fromYMD(2000,10, 1), ee.Date.fromYMD(lastyear,12, 31))
      .filter(ee.Filter.calendarRange(5,9, 'month'));
    //Take advantage of the L5 sr_cloud_qa band
    var cloud_indicator = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').filterBounds(point_buffer).filterDate(ee.Date.fromYMD(2000,10, 1), ee.Date.fromYMD(lastyear,12, 31))
      .filter(ee.Filter.calendarRange(5,9, 'month'));
    T1_SR_cc= cloud_indicator.filter(ee.Filter.calendarRange(5,9, 'month'));*/ 
    //print('all_l5',all_l5);//
};
var timeField = 'system:time_start';
var add_time_data=function(image) {
  var date = ee.Date(image.get(timeField)); 
  var years = date.difference(ee.Date('1970-01-01'), 'year'); 
  var view_time=ee.Image(image).select(['Day_view_time','Night_view_time']).reduceRegion({
        'reducer': ee.Reducer.mode(), 
        'geometry': point_large_buffer, 
        'scale': 1000});
  var dayvtime=view_time.get('Day_view_time');
  var nightvtime=view_time.get('Night_view_time');
  return image.set('Day_view_time',dayvtime)
    .set('Night_view_time',nightvtime)
    // Add a time band. 
    .addBands(ee.Image(years).rename('t').float()) 
    // Add a constant band. 
    .addBands(ee.Image.constant(1))
    .set('Year',ee.Number(date.difference(ee.Date('2000-01-01'), 'year')).floor());
};  
var cloudCalc_MOD = function(image) {
  var cloudPixels = ee.Number(image.select("LST").reduceRegion({'reducer': ee.Reducer.count(), 
                 'geometry': point_large_buffer, 'scale': 1000}).get('LST'));
  var roiPixels = ee.Number(image.select('QC').reduceRegion({'reducer': ee.Reducer.count(), 
                  'geometry': point_large_buffer, 'scale': 1000}).get('QC'));
  return image.set({'cloud_cover': roiPixels.subtract(cloudPixels).divide(roiPixels).multiply(100)});
};
var MODday_daily;
var MODnight_daily;
var getmoredata_MODIS=function(){
  var MODterra = ee.ImageCollection("MODIS/006/MOD11A1").filterBounds(point_buffer)
    //.filterDate(ee.Date.fromYMD(2000,10, 1), ee.Date.fromYMD(2020,10, 1))//.map(maskClouds500)
    .filter(ee.Filter.calendarRange(5,9, 'month'))//6,8
    .map(add_time_data);
    //print('MODterra',MODterra.first())
  MODday_daily=MODterra.map(function(img) {
    var image2=ee.Image(img);
    var lst=image2.select('LST_Day_1km').multiply(ee.Image(0.02).rename('LST_Day_1km')).subtract(ee.Image(273.15).rename('LST_Day_1km')).float();
    return image2.select(['t','constant']).addBands(lst.rename('LST')).addBands(image2.select('QC_Day').rename('QC'));
  }).map(cloudCalc_MOD).filter(ee.Filter.lt('cloud_cover', 50));
  MODnight_daily=MODterra.map(function(img) {
    var image3=ee.Image(img);
    var lst2=image3.select('LST_Night_1km').multiply(ee.Image(0.02).rename('LST_Night_1km')).subtract(ee.Image(273.15).rename('LST_Night_1km')).float();
    return image3.select(['t','constant']).addBands(lst2.rename('LST')).addBands(image3.select('QC_Night').rename('QC'));
  }).map(cloudCalc_MOD).filter(ee.Filter.lt('cloud_cover', 50));
};
var processdata_pro=function(){
    var daily_LST_L8=ee.ImageCollection(all_l8.merge(all_l9).map(function(img){ return cloudscore_L8_T1L2(ee.Image(img),point_buffer)})).filter(ee.Filter.lt('cloud_cover', 20)).map(function(img) {
          var image2=ee.Image(img);
          var new_toa_radiance = geet.toa_radiance(image2, 10);
          var brightness_temp_img = geet.brightness_temp_l8c(new_toa_radiance, true);
          var l8_ndvi = geet.ndvi_l8(brightness_temp_img); 
          var img_pv = geet.prop_veg(l8_ndvi);
          var lse = geet.surface_emissivity(img_pv);
          var surfTemp_lse = geet.surface_temperature_oli(lse);
          return surfTemp_lse.select(['LST']).addBands(image2.select(['cloud']));
    });
    print('daily_LST_L8_pro',daily_LST_L8);
    /*Export.image.toDrive({
        image:ee.Image(daily_LST_L8.toList(9999).reverse().get(0)).clip(point0.buffer(40000,30)).select('LST'),
        description: 'Zurich_ST_L8_2020_08_11',
        scale: 30,
        maxPixels: 1e13,
        region:point0.buffer(40000,30)
      });    */
    var daily_LST_L7=ee.ImageCollection(all_l7.map(function(img){ return cloudscore_L7_T1L2(ee.Image(img),point_buffer)})).filter(ee.Filter.lt('cloud_cover', 20)).map(function(img) {
          var image2=ee.Image(img);
          var toa = geet.toa_radiance(image2, '6_VCID_1');//B6_VCID_1
          var ndvi = geet.ndvi_l7(toa);
          var bt = geet.brightness_temp_l7c(ndvi, true);
          var propVeg = geet.prop_veg(bt);
          var lse = geet.surface_emissivity(propVeg);
          var surfTemp_lse = geet.surface_temperature_tm(lse);
          //return surfTemp_lse.select(['LST']);
          var filled1a = surfTemp_lse.select(['LST'])
          //.focal_mean({radius: 60, kernelType :'circle',units: 'meters',iterations: 5});
          .focal_mean({radius: 1, kernelType :'circle',units: 'pixels',iterations: 8});
          //fill only at scan line error pixels, clouds will remain no-data
          var filled2=filled1a.updateMask(image2.select('cloud').lte(100));
          return ee.Image(filled2.blend(surfTemp_lse.select(['LST']))).addBands(image2.select(['cloud'])).copyProperties(surfTemp_lse) // combines unfilled image w/ result of focal mean operation (option 1)
            .set('system:time_start',image2.get('system:time_start'));
    });
    print('daily_LST_L7_pro',daily_LST_L7);
    //daily_LST0=daily_LST_L5.merge(daily_LST_L7).merge(daily_LST_L8);
    daily_LST0=daily_LST_L7.merge(daily_LST_L8);
    return daily_LST0;
};
var processdata_fast=function(){
   var daily_LST_L8=ee.ImageCollection(all_l8.merge(all_l9).map(function(img){ return cloudscore_L8_T1L2(ee.Image(img),point_buffer)})).filter(ee.Filter.lt('cloud_cover', 20)).map(function(img) {
          var image2=ee.Image(img);
          var new_toa_radiance = geet.toa_radiance(image2, 10);
          var brightness_temp_img = geet.brightness_temp_l8c(new_toa_radiance, true);
          var l8_ndvi = geet.ndvi_l8(brightness_temp_img); 
          var img_pv = geet.prop_veg(l8_ndvi);
          var lse = geet.surface_emissivity(img_pv);
          var surfTemp_lse = geet.surface_temperature_oli(lse);
          return surfTemp_lse.select(['LST']).addBands(image2.select(['cloud']));
    });
    //print('daily_LST_L8_fast',daily_LST_L8);
    var daily_LST_L7=ee.ImageCollection(all_l7.map(function(img){ return cloudscore_L7_T1L2(ee.Image(img),point_buffer)})).filter(ee.Filter.lt('cloud_cover', 20)).map(function(img) {
          var image2=ee.Image(img);
          var toa = geet.toa_radiance(image2, '6_VCID_1');//B6_VCID_1
          var ndvi = geet.ndvi_l7(toa);
          var bt = geet.brightness_temp_l7c(ndvi, true);
          var propVeg = geet.prop_veg(bt);
          var lse = geet.surface_emissivity(propVeg);
          var surfTemp_lse = geet.surface_temperature_tm(lse);
          return surfTemp_lse.select(['LST']).addBands(image2.select(['cloud']));
          //var filled1a = surfTemp_lse.select(['LST']).focal_mean(1, 'circle', 'pixels', 8);
          //return filled1a.blend(surfTemp_lse.select(['LST'])).copyProperties(surfTemp_lse) // combines unfilled image w/ result of focal mean operation (option 1)
          //  .set('system:time_start',image2.get('system:time_start'));
    });
    //print('daily_LST_L7_fast',daily_LST_L7);
    //daily_LST0=daily_LST_L5.merge(daily_LST_L7).merge(daily_LST_L8);
    daily_LST0=daily_LST_L7.merge(daily_LST_L8);
    return daily_LST0;
};
var getmonthlyLST=function(daily_LST){  
    var annual_LST=ee.List.sequence(1999, lastyear).map(function(year) {
      var monthly_LST0=ee.List.sequence(5,9).map(function(month) { //5,9
        var collection_LST=daily_LST.filter(ee.Filter.calendarRange(ee.Number(year),ee.Number(year), 'year'))
        .filter(ee.Filter.calendarRange(ee.Number(month),ee.Number(month), 'month'));
        var col_mean= ee.ImageCollection(collection_LST).mean().set('system:time_start',ee.Date.fromYMD(ee.Number(year), ee.Number(month), 1)).set('month',ee.Number(month)).set('year',ee.Number(year));    
        var col_empty=ee.Image().double().rename('LST').set('system:time_start',ee.Date.fromYMD(ee.Number(year), ee.Number(month), 1)).set('month',ee.Number(month)).set('year',ee.Number(year));    
        return ee.Image(ee.Algorithms.If(col_mean.bandNames().length().eq(0),col_empty,col_mean));
      });
      //mask out pixels with too few data points: less than 2 monthly images;
      var col_masked=monthly_LST0.map(function(img) {return ee.Image(img).updateMask(ee.ImageCollection(monthly_LST0).count().gte(2))});
      //var col_masked=monthly_LST0;
      return col_masked;
    });
    var monthly_LSTout=annual_LST.flatten().map(function(img) {
      var img0=ee.Image(img);
      var mm=ee.Number(img0.get('month'));
      var col=ee.ImageCollection.fromImages(annual_LST.flatten()).filter(ee.Filter.eq('month',mm));
      var col_mean=col.mean()
      return img0.subtract(col_mean).copyProperties(img0);//.set('month',mm).set('year',ee.Number(img0.get('year')));
    });
    return monthly_LSTout;
};
var getannual_dLST=function(monthly_LST){    
    var annual_dLST0=ee.List.sequence(1999, lastyear).map(function(year) {
      var col=ee.ImageCollection.fromImages(monthly_LST.flatten()).filter(ee.Filter.eq('year',ee.Number(year)));//.filter(ee.Filter.gt('month',5)).filter(ee.Filter.lt('month',9));
      //var col_mean=col.mean().set('system:time_start',ee.Date.fromYMD(ee.Number(year), 1, 1))    
      var col_mean=col.mean().set('Year',ee.Number(year))    
        // Add a time band. 
        .addBands(ee.Image(ee.Number(year).subtract(2000)).rename('t').float()) 
        // Add a constant band. 
        .addBands(ee.Image.constant(1));
      return col_mean;
    });
    return annual_dLST0;
};
var reducerOLS=ee.Reducer.linearFit();
var getLSTtrends=function(annual_dLST){    
    //pt = a + b*t
    var im_reduced_ols=ee.ImageCollection(annual_dLST).select('t','LST').reduce({reducer: reducerOLS, parallelScale: 4});
    return im_reduced_ols;
};
getmoredata();
var all_l7_list= ee.ImageCollection(ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filterBounds(point_buffer)
  .filter(ee.Filter.calendarRange(5,9, 'month')).filter(ee.Filter.calendarRange(1999,2021, 'year'))
  .map(function(img){ return cloudscore_L7_T1L2(ee.Image(img),point_buffer)})).sort('system:time_start').toList(9999)
var list_cc=ee.List.sequence(0,ee.Number(all_l7_list.length()).subtract(1)).map(function(x){
  var cid=ee.Date(ee.Feature(all_l7_list.get(ee.Number(x))).get('system:time_start')).format(('dd-MM-YYYY'));
  var key=ee.Number(ee.Feature(all_l7_list.get(ee.Number(x))).get('cloud_cover')).multiply(10).round().divide(10);
  return  [{date: cid}, {cc:key}];
});
print('list_cc L7',list_cc)
getmoredata_MODIS();
print('MODday_daily',MODday_daily.first());
var modday_list=MODday_daily.toList(9999);
var list_cc_mod=ee.List.sequence(0,ee.Number(modday_list.length()).subtract(1)).map(function(x){
  var cid=ee.Date(ee.Feature(modday_list.get(ee.Number(x))).get('system:time_start')).format(('dd-MM-YYYY'));
  var key=ee.Number(ee.Feature(modday_list.get(ee.Number(x))).get('cloud_cover')).multiply(10).round().divide(10);
  return  [{date: cid}, {cc:key}];
});
print('list_cc MODday',list_cc_mod)
print('MODnight_daily',MODnight_daily.first());
var modnight_list=MODnight_daily.toList(9999);
var list_cc_modnight=ee.List.sequence(0,ee.Number(modnight_list.length()).subtract(1)).map(function(x){
  var cid=ee.Date(ee.Feature(modnight_list.get(ee.Number(x))).get('system:time_start')).format(('dd-MM-YYYY'));
  var key=ee.Number(ee.Feature(modnight_list.get(ee.Number(x))).get('cloud_cover')).multiply(10).round().divide(10);
  return  [{date: cid}, {cc:key}];
});
print('list_cc MODnight',list_cc_modnight)
var daily_LST_pro=processdata_pro().map(removeoutliers).filter(ee.Filter.lt('cloud_cover', 20));
print('processdata_pro().map(removeoutliers)',processdata_pro().map(removeoutliers))
var img_select_panel= ui.Panel([ui.Label('Please wait... Available ST images are identified...', {fontWeight: '450', fontSize: '11px', margin: '5px 1px 5px 1px', width: '90px'}),
 ], ui.Panel.Layout.Flow('vertical')); 
var ST_img1=ee.Image(1).rename('LST').updateMask(ee.Image(1).eq(0));
var wait_for_areas=ui.Label('Please wait...', {color: 'red', fontWeight: '450', fontSize: '12px', margin: '15px 10px 15px 1px'});
var ST_start=0;
var panel_tmp=ui.Panel([ui.Label('Please wait... Available ST images are identified...', {fontWeight: '450', fontSize: '11px', margin: '5px 1px 5px 1px', width: '90px'}),
 ui.Label('Please wait... Available ST images are identified...', {fontWeight: '450', fontSize: '11px', margin: '5px 1px 5px 1px', width: '90px'}),
 ui.Label('Please wait... Available ST images are identified...', {fontWeight: '450', fontSize: '11px', margin: '5px 1px 5px 1px', width: '90px'})
 ]);
var ST_avg_img;
var key_st;
//daily_LST_pro
var image_select_and_name=daily_LST_pro.sort('system:time_start').map(function(img){return ee.Image(img).set('Name',ee.Date(ee.Image(img).get(timeField)).format('YYYY-MM-dd').cat(ee.String(', ')).cat(ee.String(ee.Image(img).get('SPACECRAFT_ID'))))});
var img_names=ee.ImageCollection(image_select_and_name).aggregate_array('Name');
//print('img_names',image_select_and_name);
var img_list=ee.List(['Mean 1999-2022, Landsat 7/8 (May-Sep)']).cat(ee.Dictionary.fromLists(img_names.distinct(), img_names.distinct()).keys().reverse());
print('img_names',img_list);
var img_select = ui.Select({
  items: [{label:  'Mean 1999-2022, Landsat 7/8 (May-Sep)', value: 'Mean 1999-2022, Landsat 7/8 (May-Sep)'}],////img_list.getInfo(),
  style: {margin:'1px 0px 1px 0px',fontSize: '12px',width: '94px',height: '29px'},
  onChange: function(key){
  if (key !== null){
    if (key == 'Mean 1999-2022, Landsat 7/8 (May-Sep)'){
      legendTitle.setValue('Summer ST Average 1999-2022').style().set({maxWidth: '75px'});
      ST_img1=ee.Image(1).rename('LST').updateMask(ee.Image(1).eq(0));
      key_st=key;
      ST_start=0;
      instruction_panel.clear();
      instruction_panel.widgets().set(0,wait_for_areas);
      showthedata_ST();
      print('ST_avg_img',ST_avg_img);
      legend_max.setValue('30°C');legend_min.setValue('15°C');
      slider.setValue(0.95);
      satelliteMap.layers().set(0,ui.Map.Layer(ST_avg_img.clip(point_buffer), {bands: 'LST',min: 15, max: 30, palette: ['blue', 'white', 'red']},'ST avg L7L8').setOpacity(0.95));
    } else {
      legendTitle.setValue('ST ' + key.slice(0,10)).style().set({maxWidth: '85px'});
      ST_start=1;
      if (iteration_id2>0){
        iteration_id1=iteration_id1 + 1;
      }
      ST_img1 = ee.Image(image_select_and_name.filter(ee.Filter.eq('Name', key)).first());
      key_st=key;
      legend_max.setValue('40°C');legend_min.setValue('0°C');
      slider.setValue(0.95);
      satelliteMap.layers().set(0, ui.Map.Layer(ST_img1.clip(point_buffer),{bands: 'LST',min:0,max:40, palette: ['blue', 'white', 'red']}, "LST image").setOpacity(0.95));
      if (iteration_id2>0||iteration_id1>0){
        instruction_panel.clear();
        instruction_panel.widgets().set(0,wait_for_areas);
        showthedata_ST();
      }
    }
  }
  }
}).setPlaceholder('Mean 1999-2022, Landsat 7/8 (May-Sep)');
img_list.evaluate(function(result2){
  img_select.items().reset(result2);
  panel_tmp.widgets().set(0,img_select);
  if (sensor_id===0){
    img_select_panel.widgets().set(0,img_select);
  }
});    
//daily_LST_MODIS day
var image_select_and_name_MODday=MODday_daily.sort('system:time_start').map(function(img){return ee.Image(img).set('Name',ee.Date(ee.Image(img).get(timeField)).format('YYYY-MM-dd').cat(ee.String(', ')).cat(ee.String('MODIS Terra Day')))});
var img_names_MODday=ee.ImageCollection(image_select_and_name_MODday).aggregate_array('Name');
var img_list_MODday=ee.List(['Mean 2000-2022, MODIS Terra Day (May-Sep)']).cat(ee.Dictionary.fromLists(img_names_MODday.distinct(), img_names_MODday.distinct()).keys().reverse());
//print('img_list_MODday',img_list_MODday);
  //img_list_MODday.evaluate(function(result3){
  var img_select_MODday = ui.Select({
    items: [{label:  'Mean 2000-2022, MODIS Terra Day (May-Sep)', value: 'Mean 2000-2022, MODIS Terra Day (May-Sep)'}],////img_list.getInfo(),
    style: {margin:'1px 0px 1px 0px',fontSize: '12px',width: '94px',height: '29px'},
    onChange: function(key){
    if (key !== null){
      if (key == 'Mean 2000-2022, MODIS Terra Day (May-Sep)'){
        legendTitle.setValue('Summer ST Average 2000-2022').style().set({maxWidth: '75px'});
        ST_img1=ee.Image(1).rename('LST').updateMask(ee.Image(1).eq(0));
        key_st=key;
        ST_start=0;
        instruction_panel.clear();
        instruction_panel.widgets().set(0,wait_for_areas);
        showthedata_ST();
        legend_max.setValue('30°C');legend_min.setValue('15°C');
        slider.setValue(0.95);
        satelliteMap.layers().set(0,ui.Map.Layer(MODday_avg.clip(point_buffer), {bands: 'LST',min: 15, max: 30, palette: ['blue', 'white', 'red']},'ST avg MODISday').setOpacity(0.95));
      } else {
        legendTitle.setValue('ST ' + key.slice(0,10)).style().set({maxWidth: '85px'});
        ST_start=1;
        if (iteration_id2>0){
          iteration_id1=iteration_id1 + 1;
        }
        ST_img1 = ee.Image(image_select_and_name_MODday.filter(ee.Filter.eq('Name', key)).first());
        key_st=key;
        legend_max.setValue('40°C');legend_min.setValue('0°C');
        slider.setValue(0.95);
        satelliteMap.layers().set(0, ui.Map.Layer(ST_img1.clip(point_buffer),{bands: 'LST',min:0,max:40, palette: ['blue', 'white', 'red']}, "LST image").setOpacity(0.95));
        if (iteration_id2>0||iteration_id1>0){
          instruction_panel.clear();
          instruction_panel.widgets().set(0,wait_for_areas);
          showthedata_ST();
        }
      }
    }
  }
}).setPlaceholder("Mean 2000-2022, MODIS Terra Day (May-Sep)");
img_list_MODday.evaluate(function(result3){
  img_select_MODday.items().reset(result3);
  panel_tmp.widgets().set(1,img_select_MODday);
  if (sensor_id===1){
    img_select_panel.widgets().set(0,img_select_MODday);
  } 
});    
//daily_LST_MODIS day
var image_select_and_name_MODnight=MODnight_daily.sort('system:time_start').map(function(img){return ee.Image(img).set('Name',ee.Date(ee.Image(img).get(timeField)).format('YYYY-MM-dd').cat(ee.String(', ')).cat(ee.String('MODIS Terra Night')))});
var img_names_MODnight=ee.ImageCollection(image_select_and_name_MODnight).aggregate_array('Name');
var img_list_MODnight=ee.List(['Mean 2000-2022, MODIS Terra Night (May-Sep)']).cat(ee.Dictionary.fromLists(img_names_MODnight.distinct(), img_names_MODnight.distinct()).keys().reverse());
//print('img_list_MODnight',img_list_MODnight);
  //img_list_MODnight.evaluate(function(result4){
  var img_select_MODnight = ui.Select({
      items: [{label:  'Mean 2000-2022, MODIS Terra Night (May-Sep)', value: 'Mean 2000-2022, MODIS Terra Night (May-Sep)'}],////img_list.getInfo(),
      style: {margin:'1px 0px 1px 0px',fontSize: '12px',width: '94px',height: '29px'},
      onChange: function(key){
      if (key !== null){
      if (key == 'Mean 2000-2022, MODIS Terra Night (May-Sep)'){
        legendTitle.setValue('Summer ST Average 2000-2022').style().set({maxWidth: '75px'});
        ST_img1=ee.Image(1).rename('LST').updateMask(ee.Image(1).eq(0));
        key_st=key;
        ST_start=0;
        instruction_panel.clear();
        instruction_panel.widgets().set(0,wait_for_areas);
        showthedata_ST();
        legend_max.setValue('20°C');legend_min.setValue('10°C');
        slider.setValue(0.95);
        satelliteMap.layers().set(0,ui.Map.Layer(MODnight_avg.clip(point_buffer), {bands: 'LST',min:10, max: 20, palette: ['blue', 'white', 'red']},'ST avg MODISnight').setOpacity(0.95));
      } else {
          ST_start=1;
          legendTitle.setValue('ST ' + key.slice(0,10)).style().set({maxWidth: '85px'});
          if (iteration_id2>0){
            iteration_id1=iteration_id1 + 1;
          }
          ST_img1 = ee.Image(image_select_and_name_MODnight.filter(ee.Filter.eq('Name', key)).first());
          key_st=key;
          legend_max.setValue('30°C');legend_min.setValue('-10°C');
          slider.setValue(0.95);
          satelliteMap.layers().set(0, ui.Map.Layer(ST_img1.clip(point_buffer),{bands: 'LST',min:-10,max:30, palette: ['blue', 'white', 'red']}, "LST image").setOpacity(0.95));
          if (iteration_id2>0||iteration_id1>0){
            instruction_panel.clear();
            instruction_panel.widgets().set(0,wait_for_areas);
            showthedata_ST();
          }
        }
      }
    }
  }).setPlaceholder("Mean 2000-2022, MODIS Terra Night (May-Sep)");
img_list_MODnight.evaluate(function(result4){
  img_select_MODnight.items().reset(result4);
  panel_tmp.widgets().set(2,img_select_MODnight);
  if (sensor_id===2){
    img_select_panel.widgets().set(0,img_select_MODnight);
  }
});    
///    
var daily_LST_fast=processdata_fast().map(removeoutliers).filter(ee.Filter.lt('cloud_cover', 20));
print('daily_LST_fast',daily_LST_fast);
var monthly_LST_pro=getmonthlyLST(daily_LST_pro.select('LST'));
var monthly_LST_fast=getmonthlyLST(daily_LST_fast.select('LST'));
var monthly_LST_MODIS=getmonthlyLST(MODday_daily.select('LST'));
var monthly_LST_MODISnight=getmonthlyLST(MODnight_daily.select('LST'));
var annual_dLST_pro=getannual_dLST(monthly_LST_pro);
var annual_dLST_fast=getannual_dLST(monthly_LST_fast);
var annual_dLST_MODIS=getannual_dLST(monthly_LST_MODIS);
var annual_dLST_MODISnight=getannual_dLST(monthly_LST_MODISnight);
print('annual_dLST_MODIS',annual_dLST_MODIS);
var LSTtrend_pro=getLSTtrends(annual_dLST_pro);
print('annual_dLST_fast',annual_dLST_fast);
var LSTtrend_fast=getLSTtrends(annual_dLST_fast);
var LSTtrend_MODIS=getLSTtrends(annual_dLST_MODIS);
var LSTtrend_MODISnight=getLSTtrends(annual_dLST_MODISnight);
print('LSTtrend_MODIS',LSTtrend_MODIS);
//Reducer for OLS regression trend
var reducerOLS=ee.Reducer.linearFit();
var im_reduced_ols=ee.ImageCollection(annual_dLST_pro).select('t','LST').reduce(reducerOLS);
//Reducer for sens slope regression trend
var reducerSS=ee.Reducer.sensSlope();
var im_reduced_sens=ee.ImageCollection(annual_dLST_pro).select('t','LST').reduce(reducerSS);
//print('im_reduced_sens',im_reduced_sens);
var MODnight_avg=Zurich_ST_MODnight_avg_24yrs.rename('LST');//ee.ImageCollection(MODnight_daily).mean();
var MODday_avg=Zurich_ST_MODday_avg_24yrs.rename('LST');//ee.ImageCollection(MODday_daily).mean();
var L7L8_avg=Zurich_ST_L7L8_avg_24yrs.rename('LST');//ee.ImageCollection(daily_LST_fast).mean();
satelliteMap.layers().set(0,ui.Map.Layer(ee.Image(Zurich_ST_L7L8_24yr_cc20b_sens_wogaps).clip(point_buffer), {bands: 'slope',min: -0.3, max: 0.3, palette: ['blue', 'white', 'red']},'ST trend L7/L8 1999-2022').setOpacity(0.95));
Export.image.toAsset({
    image:ee.ImageCollection(daily_LST_fast).mean().clip(point0.buffer(40000,30)).select('LST'),
    description: 'Zurich_ST_L7L8_avg_24yrs',
    assetId: 'users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_L7L8_avg_24yrs',
    scale: 30,
    maxPixels: 1e13,
    region:point0.buffer(40000,30)
  });
Export.image.toAsset({
    image: im_reduced_sens.select('slope').clip(point0.buffer(40000,30)),
    description: 'Zurich_ST_L7L8_24yr_cc20b_sens_wogaps',
    assetId: 'users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_L7L8_24yr_cc20b_sens_wogaps',
    scale: 30,
    maxPixels: 1e13,
    region:point0.buffer(40000,30)
  });   
Export.image.toAsset({
    image: ee.ImageCollection(MODnight_daily).mean().select('LST').clip(point0.buffer(40000,30)),
    description: 'Zurich_ST_MODnight_avg_24yrs',
    assetId: 'users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODnight_avg_24yrs',
    scale: 500,
    maxPixels: 1e13,
    region:point0.buffer(40000,30)
  }); 
Export.image.toAsset({
    image: ee.ImageCollection(MODday_daily).mean().select('LST').clip(point0.buffer(40000,30)),
    description: 'Zurich_ST_MODday_avg_24yrs',
    assetId: 'users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODday_avg_24yrs',
    scale: 500,
    maxPixels: 1e13,
    region:point0.buffer(40000,30)
  }); 
Export.image.toAsset({
    image: LSTtrend_MODISnight.select('scale').clip(point0.buffer(40000,30)),
    description: 'Zurich_ST_MODnight_24yr_cc50',
    assetId: 'users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODnight_24yr_cc50',
    scale: 500,
    maxPixels: 1e13,
    region:point0.buffer(40000,30)
  }); 
Export.image.toAsset({
    image: LSTtrend_MODIS.select('scale').clip(point0.buffer(40000,30)),
    description: 'Zurich_ST_MODday_24yr_cc50',
    assetId: 'users/hydrosolutions/ZH_Fiebermesser/2022/Zurich_ST_MODday_24yr_cc50',
    scale: 500,
    maxPixels: 1e13,
    region:point0.buffer(40000,30)
  }); 
/////////////////////////////////
var iteration_id=1;
var iteration_id1=0;
var iteration_id2=0;
var cancelGraph = function(){
    satelliteMap.remove(plotPanel);
};  
var plotgraph =function(){
  plotPanel.clear();
  plotPanel.widgets().set(0,ui.Button({label : "CLOSE", style : {fontSize: '10px',height: '29px',margin: '1px 1px 1px 1px'}, onClick : cancelGraph  }));
  if (st_view==1){
    var data_daily;
    if (sensor_id===0){
      data_daily=daily_LST_fast;
    } else if (sensor_id==1) {
      data_daily=MODday_daily;
    } else {
      data_daily=MODnight_daily;
    }
    //var data_daily=ee.ImageCollection(ee.Algorithms.If(ee.Number(sensor_id).eq(0),daily_LST_fast,ee.ImageCollection(ee.Algorithms.If(ee.Number(sensor_id).eq(1),MODday_daily,MODnight_daily))));
    chart=ui.Chart.image.series(data_daily.select('LST'), point, ee.Reducer.first(), 30)
    .setChartType('ScatterChart')
    .setOptions({
        title: 'Available data points for surface temperature',
        //lineWidth: 1, 
        pointSize: 3,
        legend: {position:"none"},
        hAxis:{title:'Year',viewWindowMode: 'maximized'},
        vAxis: {viewWindowMode: 'maximized',title: 'ST [°C]'},
      });
  } else {
    var data;
    if (sensor_id===0){
      data=annual_dLST_fast;
    } else if (sensor_id==1) {
      data=annual_dLST_MODIS;
    } else {
      data=annual_dLST_MODISnight;
    }
  //var data=ee.List(ee.Algorithms.If(ee.Number(sensor_id).eq(0),annual_dLST_fast,ee.List(ee.Algorithms.If(ee.Number(sensor_id).eq(1),annual_dLST_MODIS,annual_dLST_MODISnight))));
  //print('data',data)
                  chart=ui.Chart.image.series(ee.ImageCollection.fromImages(data).select('LST'), point, null, 30,'Year')
                .setChartType('ScatterChart')
                .setOptions({
                    instruct: 'Normalized mean summer surface temperature per year and linear trendline',
                    trendlines: {0: { 
                      color: 'CC0000',
                      labelInLegend: 'Trendline',
                      showR2: true,
                      visibleInLegend: true
                    }},
                    lineWidth: 1, 
                    pointSize: 3,
                    //legend: {position:"none"},
                    //hAxis:{format: 'yyyy'},// {minValue: new Date(1985, 1, 1),maxValue: new Date(2020, 1, 1)},//--> "a.getTime is not a function"??
                    vAxis: {minValue:-7,maxValue:7,ticks: [-5, 0, 5.0],title: '\u0394 ST [°C]'},
                    hAxis: {title:'Year',ticks: [2000,2005,2010,2015,2020],viewWindowMode: 'maximized'}
                  }); 
    }
  // Chart styling
  chart.style().set({
      width: '212px',
      height: '150px',
      stretch:'both',
  });  
  plotPanel.widgets().set(1,chart);
  satelliteMap.remove(plotPanel);
  satelliteMap.add(plotPanel);
};
var hydrosolutions = ui.Label({ value : "hydrosolutions.ch", style : { shown:true ,color:'blue', fontWeight: '600', fontSize: '11px',margin: '7px 1px 0px 1px'}, targetUrl : "https://www.hydrosolutions.ch/projects/zh-fiebermesser"  } );
var sensor_id=0;
var cancelButton=ui.Label({style: {backgroundColor: 'white',padding: '2px',fontSize: '12px',width: '50px',height: '29px',margin: '1px 1px 1px 1px'}}).setValue( 'Sensor:');
var layers = satelliteMap.layers();
var sensor_select = ui.Select({
    items: [ 
    {label:  'Landsat 7/8', value: 0},
    {label:  'MODIS Day', value: 1},
    {label:  'MODIS Night', value: 2}],
    style: {fontSize: '12px',width: '94px',height: '29px',margin: '1px 0px 1px 0px'},
    onChange: function(key){
        ST_start=0; //forces the user to choose a new ST image
        sensor_id=key;
        img_select_panel.clear();
        img_select_panel.add(panel_tmp.widgets().get(sensor_id));
        instruction_panel.clear();
        slider.setValue(0.95);
        if (sensor_id===0){
          legendTitle.setValue('ST trend 1999-2022').style().set({maxWidth: '75px'});
            satelliteMap.layers().set(0,ui.Map.Layer(ee.Image(Zurich_ST_L7L8_24yr_cc20b_sens_wogaps).clip(point_buffer), {bands: 'slope',min: -0.3, max: 0.3, palette: ['blue', 'white', 'red']},'ST trend L7/L8 1999-2022').setOpacity(0.95));
          if (iteration_id2>0||iteration_id1>0){
            instruction_panel.widgets().set(0,wait_for_areas);
            if (sensor_id===1){
              showthedata_MODIS(annual_dLST_MODIS,Zurich_ST_MODday_24yr_cc50);
            } else if (sensor_id===2){
              showthedata_MODIS(annual_dLST_MODISnight,Zurich_ST_MODnight_24yr_cc50);
            } else {
              showthedata_pro();
            }
          } else {
            instruction_panel.widgets().set(0,ui.Label('Click on the map to see how day-time summer surface temperature (ST) has changed over the last 24 years at your Point of Interest', {color: 'red',fontWeight: '450', fontSize: '12px',margin: '5px 1px 1px 1px'}));//width: '220px',);
          }
        } else if (sensor_id===1){
          legendTitle.setValue('ST trend 2000-2022').style().set({maxWidth: '75px'});
          satelliteMap.layers().set(0,ui.Map.Layer(ee.Image(Zurich_ST_MODday_24yr_cc50).clip(point_buffer), {bands: 'scale',min: -0.3, max: 0.3, palette: ['blue', 'white', 'red']},'ST trend MODISday 2001-2020').setOpacity(0.95));
          if (iteration_id2>0||iteration_id1>0){
            instruction_panel.widgets().set(0,wait_for_areas);
            showthedata_MODIS(annual_dLST_MODIS,Zurich_ST_MODday_24yr_cc50);
          } else {
            instruction_panel.widgets().set(0,ui.Label('Click on the map to see how day-time summer surface temperature (ST) has changed over the last 24 years at your Point of Interest', {color: 'red',fontWeight: '450', fontSize: '12px',margin: '5px 1px 1px 1px'}));//width: '220px',);
          }
        } else {
          legendTitle.setValue('ST trend 2000-2022').style().set({maxWidth: '75px'});
          satelliteMap.layers().set(0,ui.Map.Layer(ee.Image(Zurich_ST_MODnight_24yr_cc50).clip(point_buffer), {bands: 'scale',min: -0.3, max: 0.3, palette: ['blue', 'white', 'red']},'ST trend MODISnight 2001-2020').setOpacity(0.95));
          if (iteration_id2>0||iteration_id1>0){
            instruction_panel.widgets().set(0,wait_for_areas);
            showthedata_MODIS(annual_dLST_MODIS,Zurich_ST_MODnight_24yr_cc50);
          } else {
            instruction_panel.widgets().set(0,ui.Label('Click on the map to see how night-time summer surface temperature (ST) has changed over the last 24 years at your Point of Interest', {color: 'red',fontWeight: '450', fontSize: '12px',margin: '5px 1px 1px 1px'}));//width: '220px',);
          }
        }
    }
}).setPlaceholder('Landsat 7/8');
var okcancel =   ui.Panel([sensor_select], ui.Panel.Layout.Flow('vertical'));
var showdata=ui.Button({label : "SHOW DATA", style : {fontSize: '10px',height: '29px',margin: '1px 0px 1px 0px'}, onClick : plotgraph  });
var selectPanel = ui.Panel({style :{position : "top-right",width: "110px"}});//
var plotPanel = ui.Panel({style :{position : "bottom-center",width: "230px"}});//
var title = ui.Label('Click on the map', {fontSize: '12px',margin: '5px 1px 1px 1px'});//width: '220px',
title.style().set('position', 'bottom-center');
var instruct = ui.Label('Click on the map to see how summer surface temperature has changed over the last 24 years at your Point of Interest', {color: 'red',fontWeight: '450', fontSize: '12px',margin: '5px 1px 1px 1px'});//width: '220px',
var instruct2 = ui.Label('Select an image from the Panel above and click on the map to get the surface temperature at your Point of Interest', {color: 'red',fontWeight: '450', fontSize: '12px',margin: '5px 1px 1px 1px'});//width: '220px',
var instruct2b = ui.Label('Select a surface temperature image from the panel above to display here a ST value for your point of interest.', {color: 'red',fontWeight: '450', fontSize: '12px',margin: '5px 1px 1px 1px'});//
var instruction_panel =   ui.Panel([instruct], ui.Panel.Layout.Flow('vertical'));
// create vizualization parameters
var viz = {min: -0.3, max: 0.3, palette: ['blue', 'white', 'red']};
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'top-left',
    padding: '1px 1px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'ST trend 1999-2022',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    maxWidth: '75px'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var legend_max = ui.Label('+' + viz.max + '°C/yr', {fontWeight: '450', fontSize: '10px', margin: '0px 1px 1px 1px'});
legend.add(legend_max);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x30'},
style: {padding: '0px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var legend_min = ui.Label(viz.min + '°C/yr', {fontWeight: '450', fontSize: '10px', margin: '0px 1px 1px 1px'});
legend.add(legend_min);
satelliteMap.add(legend);
var slider = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 0px 1px'}}).setValue(0.95);
slider.onSlide(function(value) {
  satelliteMap.layers().get(0).setOpacity(value);
});
var sliderPanel = ui.Panel({style :{position : "top-right",width: "110px"}});//
sliderPanel.widgets().set(0,ui.Label('Opacity', {height: "10px",fontWeight: '450', fontSize: '10px', margin: '0px 1px 1px 1px'}));
sliderPanel.widgets().set(1,slider);
var st_view=0;
var slider_switch = ui.Slider({min:0,step: 1,direction:'horizontal', style: {margin: '5px 1px 1px 20px',backgroundColor:'#a5a2a3',border:'1px solid black',height:'18px',width:'52px'}}).setValue(0);
slider_switch.onSlide(function(value) {
  //selectPanel.widgets().set(0,img_select_panel);
  okcancel.clear();
  instruction_panel.clear();
  instruction_panel.widgets().set(0,wait_for_areas);
  if (slider_switch.getValue()==1){
    st_view=1;
    okcancel.widgets().set(0,img_select_panel);
    if (ST_start===1){
      instruction_panel.clear();
      instruction_panel.widgets().set(0,wait_for_areas);
      showthedata_ST();
      legendTitle.setValue('ST ' + key_st.slice(0,10)).style().set({maxWidth: '85px'});
      legend_max.setValue('40°C');legend_min.setValue('0°C');
      slider.setValue(0.95);
      satelliteMap.layers().set(0,ui.Map.Layer(ST_img1.clip(point_buffer), {bands: 'LST',min:0,max:40, palette: ['blue', 'white', 'red']}, "LST image").setOpacity(0.95));
    } else {
      if (sensor_id===0){
        ST_avg_img=L7L8_avg;
        img_select.setValue('Mean 1999-2022, Landsat 7/8 (May-Sep)');
      } else if (sensor_id===1){
        ST_avg_img=MODday_avg;
        img_select_MODday.setValue('Mean 2000-2022, MODIS Terra Day (May-Sep)');
      } else {
        ST_avg_img=MODnight_avg;
        img_select_MODnight.setValue('Mean 2000-2022, MODIS Terra Night (May-Sep)');
      }
    }
  } else {
    st_view=0;
    if (ST_start===0){
      img_select_MODday.setValue(null);
      img_select_MODnight.setValue(null);
      img_select.setValue(null);
    }
    okcancel.widgets().set(0,sensor_select); 
    if (iteration_id2>0||iteration_id1>0){
      if (sensor_id===1){
          showthedata_MODIS(annual_dLST_MODIS,Zurich_ST_MODday_24yr_cc50);
        } else if (sensor_id===2){
          showthedata_MODIS(annual_dLST_MODISnight,Zurich_ST_MODnight_24yr_cc50);
        } else {
          showthedata_pro();
      }
    } else {instruction_panel.widgets().set(0,instruct)}
    legend_max.setValue('+0.3°C/yr');legend_min.setValue('-0.3°C/yr');    
    slider.setValue(0.95);
    if (sensor_id===0){
        legendTitle.setValue('ST trend 1999-2022').style().set({maxWidth: '75px'});
        satelliteMap.layers().set(0,ui.Map.Layer(ee.Image(Zurich_ST_L7L8_24yr_cc20b_sens_wogaps).clip(point_buffer), {bands: 'slope',min: -0.3, max: 0.3, palette: ['blue', 'white', 'red']},'ST trend L5/L7/L8 1989-2020').setOpacity(0.95));
    } else if (sensor_id===1){
        legendTitle.setValue('ST trend 2000-2022').style().set({maxWidth: '75px'});
        satelliteMap.layers().set(0,ui.Map.Layer(ee.Image(Zurich_ST_MODday_24yr_cc50).clip(point_buffer), {bands: 'scale',min: -0.3, max: 0.3, palette: ['blue', 'white', 'red']},'ST trend MODISday 2001-2020').setOpacity(0.95));
    } else {
        legendTitle.setValue('ST trend 2000-2022').style().set({maxWidth: '75px'});
        satelliteMap.layers().set(0,ui.Map.Layer(ee.Image(Zurich_ST_MODnight_24yr_cc50).clip(point_buffer), {bands: 'scale',min: -0.3, max: 0.3, palette: ['blue', 'white', 'red']},'ST trend MODISnight 2001-2020').setOpacity(0.95));
    }
  }
});
var slider_switch_panel = ui.Panel([ui.Label({style: {backgroundColor: 'black',padding: '1px',width: '90px',height: '2px',margin: '5px 1px 1px 1px'}}),
  ui.Panel([ui.Label('ST TREND',{textAlign: "center",color: '#a5a2a3',width: '35px',fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}),
  ui.Label('<->',{color: '#a5a2a3',width: '15px',fontWeight: '450', fontSize: '10px', margin: '7px 1px 1px 1px'}),
  ui.Label(' ST VALUES',{textAlign: "center",color: '#a5a2a3',width: '36px',fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'})],ui.Panel.Layout.Flow('horizontal')),
  slider_switch], ui.Panel.Layout.Flow('vertical'));
var Logo_HydroSolutions= ee.Image("projects/ee-hsol/assets/logo_hsol_projected").resample('bicubic').resample('bicubic')
var logo_hsol=ui.Thumbnail({
  image:Logo_HydroSolutions,//,
  params:{bands:['b1','b2','b3'],
  min:0,max:255},
  style:{width:'40px',height:'auto', margin: 'auto'}});
var Logos_PANEL=ui.Panel({
    style: {
    width: '52px',
    height: 'auto',
    margin: '0px 0px 0px 17px',
    position: 'bottom-left'
    },
    widgets:[logo_hsol,
    ]
  });
  selectPanel.widgets().set(0,okcancel);
  selectPanel.widgets().set(1,instruction_panel);
  selectPanel.widgets().set(2,slider_switch_panel);
  selectPanel.widgets().set(3,hydrosolutions);
  selectPanel.widgets().set(4,Logos_PANEL);
satelliteMap.add(sliderPanel);
satelliteMap.add(selectPanel );
satelliteMap.onClick(function(coords) {
  selectPanel.clear();  
  selectPanel.widgets().set(0,okcancel);
  selectPanel.widgets().set(1,instruction_panel);
  selectPanel.widgets().set(2,slider_switch_panel);
  selectPanel.widgets().set(3,hydrosolutions);
  iteration_id=iteration_id + 1;
  point = ee.Geometry.Point(coords.lon, coords.lat);
  var cz=satelliteMap.getZoom();
  if (cz < 10){
    satelliteMap.centerObject(point.buffer(5000,30));
  }  else {
    satelliteMap.centerObject(point, cz);
  }
  closeby();
  satelliteMap.layers().set(1, ui.Map.Layer(ee.FeatureCollection(point).style({color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}),{},"Point of Interest"));
});   
var closeby=function() {
        instruction_panel.clear();
        instruction_panel.widgets().set(0,wait_for_areas);
        if (st_view===1){
          iteration_id1=iteration_id1 + 1;
          showthedata_ST();
        } else {
          iteration_id2=iteration_id2 + 1;
        if (sensor_id===1){
          showthedata_MODIS(annual_dLST_MODIS,Zurich_ST_MODday_24yr_cc50);
        } else if (sensor_id===2){
          showthedata_MODIS(annual_dLST_MODISnight,Zurich_ST_MODnight_24yr_cc50);
        } else {
          showthedata_pro();
        }}    
};
var outputstring1;
var avg_ST_Zurich0;
var checkhere1;
var wearesorrystring;
var resultsstring;
var avg_ST_Zurich;
var ST_small;
var time_string;
var st_string_avg;
var time_data_list=ee.List(['SCENE_CENTER_TIME','Day_view_time','Night_view_time']);
var showthedata_ST=function() {
                if (iteration_id===1){
                  wearesorrystring=ee.String('Select a surface temperature image above and click on the map to get the ST value at your point of interest.');
                  checkhere1=ee.Number(-9999);
                } else {  
                if (ST_start===0){
                  avg_ST_Zurich0=ST_avg_img.select('LST').reduceRegion({
                    reducer: ee.Reducer.mean(),
                    geometry: point_large_buffer,
                    scale: 30,
                    maxPixels: 1e9,
                    tileScale: 8
                  });
                  ST_small=ST_avg_img.select('LST').reduceRegion({
                    reducer: ee.Reducer.first(),
                    geometry: point,
                    scale: 30
                  });
                  st_string_avg=ee.String('Multi-annual mean summer ST at this point is ');
                  if (sensor_id===0){
                    time_string=ee.String(" (~11.00 AM)");
                  } else if (sensor_id===1) {
                    time_string=ee.String(" (~11.00 AM)");
                  } else {
                    time_string=ee.String(" (~22.30 PM)");
                  }                  
                } else {
                  avg_ST_Zurich0=ST_img1.select('LST').reduceRegion({
                    reducer: ee.Reducer.mean(),
                    geometry: point_large_buffer,
                    scale: 30,
                    maxPixels: 1e9,
                    tileScale: 2
                  });
                  ST_small=ST_img1.select('LST').reduceRegion({
                    reducer: ee.Reducer.first(),
                    geometry: point,
                    scale: 30
                  });
                  time_string=ee.String(ST_img1.get(ee.String(time_data_list.get(ee.Number(sensor_id)))));
                  if (sensor_id===0){
                    time_string=ee.String(' at ').cat(ee.String(ee.Number.parse(time_string.slice(0,2)).add(1).int())).cat(ee.String(":")).cat(time_string.slice(3,5)).cat(ee.String(' AM'))  ;
                  } else if (sensor_id===1) {
                    var dayvtime=ee.Number(ST_img1.get(ee.String(time_data_list.get(ee.Number(sensor_id)))));
                    time_string=ee.String(ee.Algorithms.If(dayvtime.gt(0),ee.String(' at ').cat(ee.String(dayvtime.divide(10).floor()).slice(0,2)).cat(ee.String(':')).cat(ee.String('00').cat(dayvtime.divide(10).subtract(dayvtime.divide(10).floor()).multiply(60).round().int()).slice(-2)).cat(ee.String(' AM')),'nope'));
                  } else {
                    var nightvtime=ee.Number(ST_img1.get(ee.String(time_data_list.get(ee.Number(sensor_id)))));
                    time_string=ee.String(ee.Algorithms.If(nightvtime.gt(0),ee.String(' at ').cat(ee.String(nightvtime.divide(10).floor()).slice(0,2)).cat(ee.String(':')).cat(ee.String('00').cat(nightvtime.divide(10).subtract(nightvtime.divide(10).floor()).multiply(60).round().int()).slice(-2)).cat(ee.String(' PM')),'nope'));
                  }
                }
                  avg_ST_Zurich=ee.Number(avg_ST_Zurich0.get('LST'));
                  checkhere1=ee.Number(ST_small.map(set_ndv).get('LST')).multiply(10).round().divide(10);
                  //print('value ST',checkhere1);
                  //print('time_string',time_string);
                  var takethis_ST=checkhere1.subtract(avg_ST_Zurich).multiply(10).round().divide(10);
                  resultsstring=ee.String(ee.Algorithms.If(ee.Number(ST_start).eq(0),st_string_avg,
                      ee.String("The surface semperature at this point was ")))
                    .cat(ee.String(checkhere1)).cat(ee.String("°C")).cat(time_string).cat(ee.String(". This is ")) 
                    .cat(ee.String(takethis_ST.abs())).cat(ee.String("°C "))
                    .cat(ee.String(ee.Algorithms.If(takethis_ST.lt(0),ee.String("lower"),ee.String("higher"))))
                    .cat(ee.String(" than the average for the Kanton of Zurich."));
                  wearesorrystring=ee.String('There are no data available at this location on this day. Please select a different day or location.');
                  satelliteMap.layers().set(1, ui.Map.Layer(ee.FeatureCollection(point).style({color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}),{},"Point of Interest"));
                }
                outputstring1=ee.String(ee.Algorithms.If(checkhere1.eq(-9999),wearesorrystring,resultsstring));
                slider_switch.setDisabled(true);
                outputstring1.evaluate(function(result_st){
                  outputs.clear();
                  outputs.widgets().set(0,ui.Label(result_st, {color: 'black',width: '94px',fontWeight: '450', fontSize: '12px', margin: '5px 0px 1px 0px'}));
                  if (iteration_id>1){
                    outputs.widgets().set(1,showdata);
                  }
                  instruction_panel.clear();
                  instruction_panel.widgets().set(0,outputs);
                  slider_switch.setDisabled(false);
                  if (iteration_id===1){
                    outputs.widgets().get(0).style().set({color: 'red'});
                  } 
                });
                satelliteMap.layers().set(2, ui.Map.Layer(d,null,'Area of Interest'));    
                satelliteMap.layers().set(3, ui.Map.Layer(b,{palette: 'grey'},'Gemeinden und Kreise'));    
}
var showthedata_pro=function() {
                //var trend=LSTtrend_pro.select('scale').reduceRegion({
                var trend=ee.Image(Zurich_ST_L7L8_24yr_cc20b_sens_wogaps).select('slope').reduceRegion({
                  reducer: ee.Reducer.median(),
                  geometry: point_large_buffer,
                  scale: 30,
                  maxPixels: 1e9,
                  tileScale: 2
                });
                var trend30yr=ee.Number(trend.get('slope')).multiply(24);
                var trend_small=ee.Image(Zurich_ST_L7L8_24yr_cc20b_sens_wogaps).select('slope').reduceRegion({
                  reducer: ee.Reducer.first(),
                  geometry: point,
                  scale: 30
                });
                var checkhere1=trend_small.map(set_ndv).get('slope');//.get('scale');
                print('trend_img',checkhere1);
                //var trend_small30yr=ee.Number(trend_small.get('b1')).multiply(nb_of_years.min(30)).multiply(10).round().divide(10);
                var trend_small30yr=ee.Number(trend_small.get('slope')).multiply(24).multiply(10).round().divide(10);
                var takethis=trend_small30yr.subtract(trend30yr).multiply(10).round().divide(10);
                var resultsstring=ee.String("Summer Surface Temperature has ").cat(ee.String(ee.Algorithms.If(trend_small30yr.lt(0),ee.String("decreased"),ee.String("increased")))).cat(ee.String(" here by "))
                .cat(ee.String(ee.Algorithms.If(trend_small30yr.lt(0),ee.String(""),ee.String("+")))).cat(ee.String(trend_small30yr))
                .cat(ee.String("°C over the last 24 years. The difference to the average ST trend in the Kanton of Zurich is ")) 
                .cat(ee.String(ee.Algorithms.If(takethis.lt(0),ee.String(""),ee.String("+"))))                 
                .cat(ee.String(takethis)).cat(ee.String("°C."));
                //.cat(ee.String(ee.Algorithms.If(takethis.lt(0),ee.String("less increase "),ee.String("more"))))
                //.cat(ee.String(" than on average in the Kanton of Zurich."));
                var wearesorrystring=ee.String('There are no data points available at this location for a change analysis. Please try a different location.');
                outputstring1=ee.String(ee.Algorithms.If(ee.Number(checkhere1).eq(-9999),wearesorrystring,resultsstring));
                slider_switch.setDisabled(true);
                outputstring1.evaluate(function(result_st){
                  outputs.clear();
                  outputs.widgets().set(0,ui.Label(result_st, {color: 'black',width: '94px',fontWeight: '450', fontSize: '12px', margin: '5px 0px 1px 0px'}));
                  outputs.widgets().set(1,showdata);
                  instruction_panel.clear();
                  instruction_panel.widgets().set(0,outputs);
                  slider_switch.setDisabled(false);
                });
                satelliteMap.layers().set(1, ui.Map.Layer(ee.FeatureCollection(point).style({color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}),{},"Point of Interest"));
                satelliteMap.layers().set(2, ui.Map.Layer(d,null,'Area of Interest'));    
                satelliteMap.layers().set(3, ui.Map.Layer(b,{palette: 'grey'},'Gemeinden und Kreise'));    
};
var showthedata_MODIS=function(annual_dLST0,LSTtrend0) {
                var annual_dLST=ee.List(annual_dLST0);
                var LSTtrend=ee.Image(LSTtrend0);
                //var iteration_id2tmp=iteration_id2;
                var trend=LSTtrend.select('scale').reduceRegion({
                  reducer: ee.Reducer.median(),
                  geometry: point_large_buffer,
                  scale: 30,
                  maxPixels: 1e9,
                  tileScale: 2
                });
                var trend30yr=ee.Number(trend.get('scale')).multiply(24);
                var trend_small=LSTtrend.select('scale').reduceRegion({
                  reducer: ee.Reducer.first(),
                  geometry: point,
                  scale: 30
                });
                var checkhere2=trend_small.map(set_ndv).get('scale');
                print('trend_small_fast',checkhere2);
                var trend_small30yr=ee.Number(trend_small.get('scale')).multiply(24).multiply(10).round().divide(10);
                var takethis=trend_small30yr.subtract(trend30yr).multiply(10).round().divide(10);
                var resultsstring=ee.String("Summer").cat(ee.String(ee.Algorithms.If(ee.Number(sensor_id).eq(1)," Day "," Night ")))
                .cat(ee.String("Surface Temperature ")).cat(ee.String(ee.Algorithms.If(trend_small30yr.lt(0),ee.String("decreased"),ee.String("increased")))).cat(ee.String(" here by "))
                .cat(ee.String(ee.Algorithms.If(trend_small30yr.lt(0),ee.String(""),ee.String("+")))).cat(ee.String(trend_small30yr))
                .cat(ee.String("°C over the last 24 years. The difference to the average ST trend in the Kanton of Zurich is ")) 
                .cat(ee.String(ee.Algorithms.If(takethis.lt(0),ee.String(""),ee.String("+"))))                 
                .cat(ee.String(takethis)).cat(ee.String("°C."));
                //.cat(ee.String(ee.Algorithms.If(takethis.lt(0),ee.String("less increase "),ee.String("more"))))
                //.cat(ee.String(" than on average in the Kanton of Zurich."));
                var wearesorrystring=ee.String('There are no data points available at this location for a change analysis. Please try a different location.');
                var outputstring=ee.String(ee.Algorithms.If(ee.Number(checkhere2).eq(-9999),wearesorrystring,resultsstring));
                slider_switch.setDisabled(true);
                  outputstring.evaluate(function(result_st){
                  outputs.clear();
                  outputs.widgets().set(0,ui.Label(result_st, {color: 'black',width: '94px',fontWeight: '450', fontSize: '12px', margin: '5px 0px 1px 0px'}));
                  outputs.widgets().set(1,showdata);
                  instruction_panel.clear();
                  instruction_panel.widgets().set(0,outputs);
                  slider_switch.setDisabled(false);
                });
                satelliteMap.layers().set(1, ui.Map.Layer(ee.FeatureCollection(point).style({color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}),{},"Point of Interest"));
                satelliteMap.layers().set(2, ui.Map.Layer(d,null,'Area of Interest'));                    
                satelliteMap.layers().set(3, ui.Map.Layer(b,{palette: 'grey'},'Gemeinden und Kreise'));    
};
satelliteMap.layers().set(2, ui.Map.Layer(d,null,'Area of Interest'));    
satelliteMap.layers().set(3, ui.Map.Layer(b,{palette: 'grey'},'Gemeinden und Kreise'));