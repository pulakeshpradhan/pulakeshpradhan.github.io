var usa = ui.import && ui.import("usa", "table", {
      "id": "users/rinkalpatel/admin_boundaries/usa_bd"
    }) || ee.FeatureCollection("users/rinkalpatel/admin_boundaries/usa_bd"),
    cotton_tx_cc = ui.import && ui.import("cotton_tx_cc", "table", {
      "id": "users/rinkalpatel/cotton_disease_fields/tx_cc"
    }) || ee.FeatureCollection("users/rinkalpatel/cotton_disease_fields/tx_cc"),
    cotton_ga_pavo = ui.import && ui.import("cotton_ga_pavo", "table", {
      "id": "users/rinkalpatel/cotton_disease_fields/ga_pavo"
    }) || ee.FeatureCollection("users/rinkalpatel/cotton_disease_fields/ga_pavo"),
    cotton_ga_bb = ui.import && ui.import("cotton_ga_bb", "table", {
      "id": "users/rinkalpatel/cotton_disease_fields/ga_bb"
    }) || ee.FeatureCollection("users/rinkalpatel/cotton_disease_fields/ga_bb"),
    paulman_fields = ui.import && ui.import("paulman_fields", "table", {
      "id": "users/rinkalpatel/yield-prediction-fields/2018/paulman_fields"
    }) || ee.FeatureCollection("users/rinkalpatel/yield-prediction-fields/2018/paulman_fields"),
    christiansen_fields = ui.import && ui.import("christiansen_fields", "table", {
      "id": "users/rinkalpatel/yield-prediction-fields/2019/christiansen_fields"
    }) || ee.FeatureCollection("users/rinkalpatel/yield-prediction-fields/2019/christiansen_fields"),
    birchmier_fields = ui.import && ui.import("birchmier_fields", "table", {
      "id": "users/rinkalpatel/yield-prediction-fields/2019/birchmier_fields"
    }) || ee.FeatureCollection("users/rinkalpatel/yield-prediction-fields/2019/birchmier_fields"),
    corn_yield_pred_10m = ui.import && ui.import("corn_yield_pred_10m", "imageCollection", {
      "id": "projects/granularag/yield_prediction/corn_10m"
    }) || ee.ImageCollection("projects/granularag/yield_prediction/corn_10m"),
    soy_yield_pred_10m = ui.import && ui.import("soy_yield_pred_10m", "imageCollection", {
      "id": "projects/granularag/yield_prediction/soy_10m"
    }) || ee.ImageCollection("projects/granularag/yield_prediction/soy_10m"),
    aoi_windows_yld_training = ui.import && ui.import("aoi_windows_yld_training", "table", {
      "id": "users/rinkalpatel/admin_boundaries/us_aoi_windows_10_7200"
    }) || ee.FeatureCollection("users/rinkalpatel/admin_boundaries/us_aoi_windows_10_7200"),
    new_aoi = ui.import && ui.import("new_aoi", "table", {
      "id": "users/rinkalpatel/admin_boundaries/us_new_aoi_windows_10_7200"
    }) || ee.FeatureCollection("users/rinkalpatel/admin_boundaries/us_new_aoi_windows_10_7200"),
    lai_field = ui.import && ui.import("lai_field", "table", {
      "id": "users/rinkalpatel/CESTEM_LAI_field_request"
    }) || ee.FeatureCollection("users/rinkalpatel/CESTEM_LAI_field_request"),
    nitrogen_field = ui.import && ui.import("nitrogen_field", "table", {
      "id": "users/rinkalpatel/nitrogen_rx_field_2019"
    }) || ee.FeatureCollection("users/rinkalpatel/nitrogen_rx_field_2019"),
    onfarm_fields = ui.import && ui.import("onfarm_fields", "table", {
      "id": "users/rinkalpatel/2019_onfarm_boundaries"
    }) || ee.FeatureCollection("users/rinkalpatel/2019_onfarm_boundaries"),
    pilot_customers = ui.import && ui.import("pilot_customers", "table", {
      "id": "users/rinkalpatel/2020_pilot_customers"
    }) || ee.FeatureCollection("users/rinkalpatel/2020_pilot_customers");
//Map.addLayer(cotton_tx_cc,{},'cotton-disease-field-cc')
//#Map.addLayer(cotton_ga_pavo,{},'cotton-disease-field-pavo')
//#Map.addLayer(cotton_ga_bb,{},'cotton-disease-field-bb')
var palettes = require('users/gena/packages:palettes');
var RdYlGn = palettes.colorbrewer.RdYlGn[9];
var corn_yld_params = {min:100,max:270,palette:RdYlGn}
var soy_yld_params = {min:30,max:75,palette:RdYlGn}
var business_name = 'Kempcke Farms';
var fields_geom = pilot_customers.filter(ee.Filter.stringStartsWith('operation',business_name))
Map.addLayer(fields_geom,{},'Kempcke',1)
//Map.addLayer(aoi_windows_yld_training,{},'Old - Yield-Model-Training-Tiles',0)
//Map.addLayer(new_aoi,{},'New - Yield-Model-Training-Tiles')
//Map.addLayer(paulman_fields,{},'Paulman',0)
//Map.addLayer(christiansen_fields,{},'Christiansen',0)
//Map.addLayer(birchmier_fields,{},'Birchmier',0)
//Map.addLayer(lai_field,{},'CESTEM-LAI-Field')
//Map.addLayer(nitrogen_field,{},'Nitrogen-Field')
//Map.addLayer(onfarm_fields,{},'2019-Onfarm-Fields',0)
var get_cdl = function(extent,cdl_year) {
  var cdl = ee.Image('users/rinkalpatel/cdl_upload/cdl_2019')
  if(cdl_year==2019){
    var ref_cdl_year = 2018
    var ref_cdl = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date(ref_cdl_year+'-01-01',ref_cdl_year+'-12-31'))
                  .first().select('cropland');
    var crop_names = ee.List(ref_cdl.get("cropland_class_names"))
    var palette = ee.List(ref_cdl.get("cropland_class_palette"))
    var values = ee.List(ref_cdl.get("cropland_class_values"))
    var sequence = ee.List.sequence(0, values.size().subtract(1))
    cdl = cdl.remap(values, sequence)
  }else{
    cdl = ee.ImageCollection('USDA/NASS/CDL')
                    .filter(ee.Filter.date(cdl_year+'-01-01',cdl_year+'-12-31'))
                    .first().select('cropland').clip(extent);
    palette = ee.List(cdl.get("cropland_class_palette"))
  }
  cdl = cdl.updateMask(cdl.eq(1).or(cdl.eq(5)))
  return cdl
}
var get_10m_pred_yld_corn = function(year,extent,mask){
  var start = year+'-01-01'
  var end = year+'-12-31'
  var pred_10m_yld = corn_yield_pred_10m.filterDate(start,end).filterBounds(extent).mosaic().clip(extent).updateMask(mask)
  return pred_10m_yld
}
var get_10m_pred_yld_soy = function(year,extent,mask){
  var start = year+'-01-01'
  var end = year+'-12-31'
  var pred_10m_yld = soy_yield_pred_10m.filterDate(start,end).filterBounds(extent).mosaic().clip(extent).updateMask(mask)
  return pred_10m_yld
}
var get_precip = function(extent,beginDate,endDate){
  var reference = ee.ImageCollection('IDAHO_EPSCOR/GRIDMET').
  filter(ee.Filter.date(beginDate, endDate)).select('pr').filterBounds(extent);
  var time0 = reference.first().get('system:time_start');
  var first = ee.List([ee.Image(0).set('system:time_start', time0).select([0], ['pr'])]);
  var accumulate = function(image, list){
    var previous = ee.Image(ee.List(list).get(-1));
    var added = image.add(previous).set('system:time_start', image.get('system:time_start'));
    return ee.List(list).add(added);
  };
  var cumulative = ee.ImageCollection(ee.List(reference.iterate(accumulate, first)));
  return cumulative
}
var get_srad = function(extent,beginDate,end_Date,delta){
  var reference_collection = ee.ImageCollection('IDAHO_EPSCOR/GRIDMET').
  filter(ee.Filter.date(beginDate, end_Date)).select('srad').filterBounds(extent);
  var startDate = ee.Date(beginDate);
  var endDate = ee.Date(end_Date);
  var numberOfWindows = endDate.difference(startDate,'day').divide(delta).toInt();
  var sequence = ee.List.sequence(0, numberOfWindows); 
  var delta_composite = function(num){
    num = ee.Number(num);
    var windowStart = startDate.advance(num.multiply(delta), 'day');
    var windowEnd = startDate.advance(num.add(1).multiply(delta), 'day');
    var subset = reference_collection.filterDate(windowStart,windowEnd);
    return subset.median().set('system:time_start',windowStart);
  }
  var mod_sequence = sequence.map(delta_composite)
  var composites = ee.ImageCollection.fromImages(mod_sequence);
  return composites
  //var time0 = reference.first().get('system:time_start');
  //var first = ee.List([ee.Image(0).set('system:time_start', time0).select([0], ['srad'])]);
  //var accumulate = function(image, list){
  //  var previous = ee.Image(ee.List(list).get(-1));
  //  var added = image.add(previous).set('system:time_start', image.get('system:time_start'));
  //  return ee.List(list).add(added);
  //};
  //var cumulative = ee.ImageCollection(ee.List(reference.iterate(accumulate, first)));
  //return cumulative
  //return reference
}
var get_gdd = function(extent,beginDate,endDate){
  var reference = ee.ImageCollection('IDAHO_EPSCOR/GRIDMET').
  filter(ee.Filter.date(beginDate, endDate)).select(['tmmx','tmmn'],['tmmx','tmmn']).filterBounds(extent);
  var daily_gdd_collection = reference.map(function(image){
    var Fahr = (image.subtract(273.15)).multiply(1.8).add(32);
    var meanFahr = Fahr.reduce('mean').rename('meanTemp');
    var GDD = meanFahr.subtract(50).rename('gdd_orig');
    var GDDnonNeg = GDD.where(GDD.lt(0), 0).rename('gdd');
    return ee.Image(GDDnonNeg).set('system:time_start', image.get('system:time_start'));
  });
  var time0 = reference.first().get('system:time_start');
  var first = ee.List([ee.Image(0).set('system:time_start', time0).select([0], ['gdd'])]);
  var accumulate = function(image, list){
    var previous = ee.Image(ee.List(list).get(-1));
    var added = image.add(previous).set('system:time_start', image.get('system:time_start'));
    return ee.List(list).add(added);
  };
  var cumulative = ee.ImageCollection(ee.List(daily_gdd_collection.iterate(accumulate, first)));
  print(cumulative)
  return cumulative
}
var get_wind_speed = function(extent,beginDate,endDate){
  var reference = ee.ImageCollection('IDAHO_EPSCOR/GRIDMET').
  filter(ee.Filter.date(beginDate, endDate)).select('vs').filterBounds(extent);
  //var time0 = reference.first().get('system:time_start');
  //var first = ee.List([ee.Image(0).set('system:time_start', time0).select([0], ['pr'])]);
  //var accumulate = function(image, list){
  //  var previous = ee.Image(ee.List(list).get(-1));
  //  var added = image.add(previous).set('system:time_start', image.get('system:time_start'));
  //  return ee.List(list).add(added);
  //};
  //var cumulative = ee.ImageCollection(ee.List(reference.iterate(accumulate, first)));
  return reference
}
var stackCollection = function(collection) {
    var first = ee.Image([]);
    var appendBands = function(image, previous) {
      return ee.Image(previous).addBands(image);
    };
    return ee.Image(collection.iterate(appendBands, first));
}
var get_modEVI_collection = function(extent,cdl_mask,start,end){
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
    evi = evi.updateMask(cdl_mask)
    evi = evi.updateMask(evi.gt(0.15))
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
var get_sentinel2_medianEVI = function(extent,start,end){
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
    evi = evi.updateMask(evi.gt(0.15))
    return evi ;
  };
  var s2mask = require('users/fitoprincipe/geetools:cloud_masks').sentinel2;
  //var collection = ee.ImageCollection("COPERNICUS/S2_SR")
  var s2_collection = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(extent)
    .filterDate(start,end)
    .map(s2mask());
  var s2_evi_collection = s2_collection.map(calculate_S2_EVI)
  var s2_evi = ee.Image(s2_evi_collection.median()).clip(extent);
  return s2_evi
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
    evi = evi.updateMask(evi.gt(0.15))
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
    return subset.median().set('system:time_start',windowStart);
  }
  var mod_sequence = sequence.map(delta_composite)
  var composites = ee.ImageCollection.fromImages(mod_sequence);
  return composites
}
var get_smooth_modis_timeseries = function(evi_collection,start,end,windowSize){
  var startDate = ee.Date(start);
  var endDate = ee.Date(end);
  var numberOfWindows = endDate.difference(startDate,'day').divide(windowSize).toInt();
  var sequence = ee.List.sequence(0, numberOfWindows); 
  var addDataBands = function(image) {
    return image.addBands(image.select('evi'))
                .addBands(image.metadata('system:time_start').divide(1e18).rename('time'));
  };
  var delta_smooth = function(num){
    num = ee.Number(num);
    var windowStart = startDate.advance(num.multiply(windowSize), 'day');
    var windowEnd = startDate.advance(num.add(1).multiply(windowSize), 'day');
    var subset = evi_collection.filterDate(windowStart,windowEnd);
    var data = subset.map(addDataBands)
    print(data)
    var fit = data.select(['time','evi']).reduce(ee.Reducer.linearFit());
     function applyFit(img){
      return img.select('time').multiply(fit.select('scale')).add(fit.select('offset'))
              .set('system:time_start',img.get('system:time_start')).rename('evi');
    }
    return data.map(applyFit).set('system:time_start',windowStart);
  }
  var mod_sequence = sequence.map(delta_smooth)
  var composites = ee.ImageCollection.fromImages(mod_sequence);
  return composites
}
var get_harmonic_fits = function(collection,dependent,harmonics){
  var harmonicFrequencies = ee.List.sequence(1, harmonics);
  var constructBandNames = function(base, list) {
    return ee.List(list).map(function(i) {
      return ee.String(base).cat(ee.Number(i).int());
    });
  };
  var cosNames = constructBandNames('cos_', harmonicFrequencies);
  var sinNames = constructBandNames('sin_', harmonicFrequencies);
  var independents = ee.List(['constant', 't'])
    .cat(cosNames).cat(sinNames);
  var addDependents = function(image) {
    // Compute time in fractional years since the epoch.
    var years = image.date().difference('2000-01-01', 'year');
    var timeRadians = ee.Image(years.multiply(2 * Math.PI)).rename('t');
    var constant = ee.Image(1);
    return image.addBands(constant).addBands(timeRadians.float());
  };
  var addHarmonics = function(freqs) {
    return function(image) {
      // Make an image of frequencies.
      var frequencies = ee.Image.constant(freqs);
      // This band should represent time in radians.
      var time = ee.Image(image).select('t');
      // Get the cosine terms.
      var cosines = time.multiply(frequencies).cos().rename(cosNames);
      // Get the sin terms.
      var sines = time.multiply(frequencies).sin().rename(sinNames);
      return image.addBands(cosines).addBands(sines);
    };
  };
  var harmonicLandsat = collection
    .map(addDependents)
    .map(addHarmonics(harmonicFrequencies));
  // The output of the regression reduction is a 4x1 array image.
  var harmonicTrend = harmonicLandsat
    .select(independents.add(dependent))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
  // Turn the array image into a multi-band image of coefficients.
  var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
    .arrayProject([0])
    .arrayFlatten([independents]);
  // Compute fitted values.
  var fittedHarmonic = harmonicLandsat.map(function(image) {
    return image = image.addBands(
      image.select(independents)
        .multiply(harmonicTrendCoefficients)
        .reduce('sum')
        .rename('fitted'))
  });
  return fittedHarmonic
}
var get_srad_chart = function(composites,band_name,extent,delta,source,year,beg_doy,end_doy){
  return(ui.Chart.image.doySeriesByYear(
    composites,band_name, extent, ee.Reducer.max(),30,ee.Reducer.mean(),beg_doy,end_doy)
      .setOptions({title: source+' '+delta+'-day median-srad',lineWidth: 1,pointSize: 3,
        hAxis: {title:'Day-of-Year'},vAxis: {title:'Solar-Rad (W/m^2)'}}));
}
var get_gdd_chart = function(composites,band_name,extent,source,year,beg_doy,end_doy){
  return(ui.Chart.image.doySeriesByYear(
    composites,band_name, extent, ee.Reducer.max(),30,ee.Reducer.mean(),beg_doy,end_doy)
      .setOptions({title: source,lineWidth: 1,pointSize: 3,
        hAxis: {title:'Day-of-Year'},vAxis: {title:'GDD'}}));
}
var get_precip_chart = function(composites,band_name,extent,source,year,beg_doy,end_doy){
  return(ui.Chart.image.doySeriesByYear(
    composites,band_name, extent, ee.Reducer.max(),30,ee.Reducer.mean(),beg_doy,end_doy)
      .setOptions({title: source+' (mm)',lineWidth: 1,pointSize: 3,
        hAxis: {title:'Day-of-Year'},vAxis: {title:'Precipitation (mm)'}}));
}
var get_wind_speed_chart = function(composites,band_name,extent,source,year,beg_doy,end_doy){
  return(ui.Chart.image.doySeriesByYear(
    composites,band_name, extent, ee.Reducer.max(),30,ee.Reducer.mean(),beg_doy,end_doy)
      .setOptions({title: source+' (m/s)',lineWidth: 1,pointSize: 3,
        hAxis: {title:'Day-of-Year'},vAxis: {title:'Wind Speed (m/s @10m)'}}));
}
var get_timeseries_chart = function(composites,band_name,extent,delta,source,year,beg_doy,end_doy){
  return(ui.Chart.image.doySeriesByYear(
    composites,band_name, extent, ee.Reducer.max(),30,ee.Reducer.mean(),beg_doy,end_doy)
    .setOptions({title: source+' '+delta+'-day median-EVI',lineWidth: 1,pointSize:3,
        hAxis: {title:'Day-of-Year'},vAxis: {title:'Satellite EVI'}}));
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
    image: legendImage,params: {bbox:'0,0,10,100', dimensions:'10x200'},style: {padding: '1px', position: 'bottom-center'}
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
var year_1=2019
var year_2=2018
var year_3=2017
var year_4=2012
var mm_dd_beg='-04-01'
var mm_dd_end='-11-30'
var mm_dd_beg_1='-06-10'
var mm_dd_end_1='-07-10'
var mm_dd_beg_2='-08-15'
var mm_dd_end_2='-09-15'
var beg_doy=60
var end_doy=330
var cdl_year=2019
var delta_days = 7; 
var evi_thresh = 0.2;
var harmonics = 3;
var curr_year_harmonics = 1;
//var state = 'Nebraska'
//var extent = ee.FeatureCollection(usa).filter(ee.Filter.stringStartsWith('NAME_1',state))
//// Field Extent
//var field_extent = corn_field
//field_extent = ee.Geometry(field_extent)
var evi_params =  { min: 0, max: 1,
                     palette: [
                      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                      '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                      '012E01', '011D01', '011301'
                      ]
                  }
var evi_diff_params = {min:-0.35,max:0.35,palette:['red','crimson','white','blue','violet']}
var landformsVis = {
  min: 11.0,
  max: 42.0,
  palette: [
    '141414', '383838', '808080', 'EBEB8F', 'F7D311', 'AA0000', 'D89382',
    'DDC9C9', 'DCCDCE', '1C6330', '68AA63', 'B5C98E', 'E1F0E5', 'a975ba',
    '6f198c'
  ],
};
////////////////////
//////////////////
// UI 
//////////////////
var places = {NE: "Nebraska",IA: "Iowa",IL: "Illinois",
  WI: "Wisconsin", SD: "South Dakota", ND: "North Dakota",
  IN: "Indiana", PA: "Pennsylvania", MD: "Maryland", OH: 'Ohio',
  KS: 'Kansas', MI: 'Michigan', MN:'Minnesota', DE:'Delaware',
  TX: 'Texas', GA:'Georgia'
};
var title = ui.Label('Corn/Soy Yield-Prediction + Crop Growth-Viz via Satellites : (2017:2019-YTD)');
title.style().set('position', 'top-center');
Map.add(title);
//add_EVI_legend('EVI',evi_params,'bottom-left') 
add_EVI_legend('soy (bu/ac)',soy_yld_params,'bottom-right') 
add_EVI_legend('corn (bu/ac)',corn_yld_params,'bottom-left') 
//add_EVI_legend('delta-EVI',evi_diff_params,'bottom-right') 
////
var state = 'Iowa'
var extent = ee.FeatureCollection(usa).filter(ee.Filter.stringStartsWith('NAME_1',state))
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    state = places[key]
    extent = ee.FeatureCollection(usa)
               .filter(ee.Filter.stringStartsWith('NAME_1',state))
    var coords=ee.Geometry(extent.getInfo()['features'][0]['geometry']).centroid().getInfo()['coordinates']
    Map.setCenter(coords[0],coords[1], 7)
    var temp_cdl = ee.ImageCollection('USDA/NASS/CDL')
                    .filter(ee.Filter.date(year_2+'-01-01',year_2+'-12-31'))
                    .first().select('cropland').clip(extent);
    var palette = ee.List(temp_cdl.get("cropland_class_palette"))
    var cdl = get_cdl(extent,cdl_year)
    cdl = cdl.clip(extent)
    removeLayer('CDL-'+cdl_year)
    Map.addLayer(cdl.visualize({palette: palette}), {}, 'CDL-'+cdl_year,0);
    var corn_yld_1=get_10m_pred_yld_corn(year_1,extent,cdl.eq(1))
    removeLayer('Corn-Pred-Yield-'+year_1)
    Map.addLayer(corn_yld_1,corn_yld_params,'Corn-Pred-Yield-'+year_1,1);
    var soy_yld_1=get_10m_pred_yld_soy(year_1,extent,cdl.eq(5))
    removeLayer('Soy-Pred-Yield-'+year_1)
    Map.addLayer(soy_yld_1,soy_yld_params,'Soy-Pred-Yield-'+year_1,0);
    var corn_yld_2=get_10m_pred_yld_corn(year_3,extent,cdl.eq(1))
    removeLayer('Corn-Pred-Yield-'+year_3)
    Map.addLayer(corn_yld_2,corn_yld_params,'Corn-Pred-Yield-'+year_3,0);
    var soy_yld_2=get_10m_pred_yld_soy(year_3,extent,cdl.eq(5))
    removeLayer('Soy-Pred-Yield-'+year_3)
    Map.addLayer(soy_yld_2,soy_yld_params,'Soy-Pred-Yield-'+year_3,0);
    // year-1 - early
    var start_1 = year_1+mm_dd_beg_1
    var end_1 = year_1+mm_dd_end_1
    var s2_evi_e1 = get_sentinel2_maxEVI(extent,start_1,end_1)
    s2_evi_e1 = s2_evi_e1.updateMask(cdl)
    removeLayer('Sentinel-2 : Max EVI (Jun/Jul) : '+year_1)
    Map.addLayer(s2_evi_e1,evi_params,'Sentinel-2 : Max EVI (Jun/Jul) : '+year_1,0);
    // year-1 - late
    var start_1 = year_1+mm_dd_beg_2
    var end_1 = year_1+mm_dd_end_2
    var s2_evi_l1 = get_sentinel2_maxEVI(extent,start_1,end_1)
    s2_evi_l1 = s2_evi_l1.updateMask(cdl)
    removeLayer('Sentinel-2 : Max EVI (Aug/Sep) : '+year_1)
    Map.addLayer(s2_evi_l1,evi_params,'Sentinel-2 : Max EVI (Aug/Sep) : '+year_1,0);
    // year-2 - early
    var start_2 = year_2+mm_dd_beg_1
    var end_2 = year_2+mm_dd_end_1
    var s2_evi_e2 = get_sentinel2_maxEVI(extent,start_2,end_2)
    s2_evi_e2 = s2_evi_e2.updateMask(cdl)
    //removeLayer('Sentinel-2 : Max EVI (Jun/Jul) : '+year_2)
    //Map.addLayer(s2_evi_e2,evi_params,'Sentinel-2 : Max EVI (Jun/Jul) : '+year_2,0);
    // year-2 - late
    var start_2 = year_2+mm_dd_beg_2
    var end_2 = year_2+mm_dd_end_2
    var s2_evi_l2 = get_sentinel2_maxEVI(extent,start_2,end_2)
    s2_evi_l2 = s2_evi_l2.updateMask(cdl)
    //removeLayer('Sentinel-2 : Max EVI (Aug/Sep) : '+year_2)
    //Map.addLayer(s2_evi_l2,evi_params,'Sentinel-2 : Max EVI (Aug/Sep) : '+year_2,0);
    // year-3 - early
    var start_3 = year_3+mm_dd_beg_1
    var end_3 = year_3+mm_dd_end_1
    var s2_evi_e3 = get_sentinel2_maxEVI(extent,start_3,end_3)
    s2_evi_e3 = s2_evi_e3.updateMask(cdl)
    //removeLayer('Sentinel-2 : Max EVI (Jun/Jul) : '+year_3)
    //Map.addLayer(s2_evi_e3,evi_params,'Sentinel-2 : Max EVI (Jun/Jul) : '+year_3,0);
    // year-3 - late
    var start_3 = year_3+mm_dd_beg_2
    var end_3 = year_3+mm_dd_end_2
    var s2_evi_l3 = get_sentinel2_maxEVI(extent,start_3,end_3)
    s2_evi_l3 = s2_evi_l3.updateMask(cdl)
    //removeLayer('Sentinel-2 : Max EVI (Aug/Sep) : '+year_3)
    //Map.addLayer(s2_evi_l3,evi_params,'Sentinel-2 : Max EVI (Aug/Sep) : '+year_3,0);
    // Plot Sentinel-2 delta
    var s2_evi_diff_1=s2_evi_e1.subtract(s2_evi_e3)
    removeLayer('delta-EVI (Jun/Jul) : '+year_1+'-'+year_3)
    Map.addLayer(s2_evi_diff_1,evi_diff_params,'delta-EVI (Jun/Jul) : '+year_1+'-'+year_3,0);
    var s2_evi_diff_2=s2_evi_l1.subtract(s2_evi_l3)
    removeLayer('delta-EVI (Aug/Sep) : '+year_1+'-'+year_3)
    Map.addLayer(s2_evi_diff_2,evi_diff_params,'delta-EVI (Aug/Sep) : '+year_1+'-'+year_3,0);
    var dataset = ee.Image('CSP/ERGo/1_0/US/landforms');
    var landforms = dataset.select('constant');
    removeLayer('Landforms')
    Map.addLayer(landforms.clip(extent), landformsVis, 'Landforms',0);
  }
});
select.setPlaceholder('Select a state');
var state_panel = ui.Panel({style: {width: '100px',position: 'top-right'}});
state_panel.add(select);
var panel = ui.Panel({style: {width: '450px'}});
panel.add(ui.Label('   For weather + crop-growth related stats, click a field-centroid'));
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var field_extent = point.buffer(125)
  var large_field_extent = point.buffer(10000)
  removeLayer('Selected field')
  //removeLayer('10km radius')
  Map.addLayer(field_extent,{},'Selected field')
  //Map.addLayer(large_field_extent,{},'10km radius',0)
  /// CDL of interest
  //var cdl=get_cdl(large_field_extent,cdl_year)
  var cdl=get_cdl(field_extent,cdl_year)
  var corn = cdl.where(cdl.neq(1),0);
  var soy = cdl.where(cdl.neq(5),0);
  var corn_stats = corn.eq(1).clip(field_extent).reduceRegion(ee.Reducer.sum()).getInfo()['cropland']
  var soy_stats = soy.eq(5).clip(field_extent).reduceRegion(ee.Reducer.sum()).getInfo()['cropland']       
  print(corn_stats)
  print(soy_stats)
  var crop_1=1
  var crop_2=5
  if(soy_stats>corn_stats){crop_1=5;crop_2=1}
  print(crop_1)
  print(crop_2)
  // Get pred yield for selected point
  var crop='none'
  var yld_1=0.0
  var yld_2=0.0
  if(crop_1==1){
    var corn_yld_1=get_10m_pred_yld_corn(year_1,field_extent,cdl.eq(1))
    yld_1=corn_yld_1.reproject('EPSG: 3665').reduceRegion(ee.Reducer.mean()).getInfo()['b1'].toFixed(2)
    var corn_yld_2=get_10m_pred_yld_corn(year_3,field_extent,cdl.eq(1))
    yld_2=corn_yld_2.reproject('EPSG: 3665').reduceRegion(ee.Reducer.mean()).getInfo()['b1'].toFixed(2)
    crop='corn'
  }else{
    var soy_yld_1=get_10m_pred_yld_soy(year_1,field_extent,cdl.eq(5))
    yld_1=soy_yld_1.reproject('EPSG: 3665').reduceRegion(ee.Reducer.mean()).getInfo()['b1'].toFixed(2)
    var soy_yld_2=get_10m_pred_yld_soy(year_3,field_extent,cdl.eq(5))
    yld_2=soy_yld_2.reproject('EPSG: 3665').reduceRegion(ee.Reducer.mean()).getInfo()['b1'].toFixed(2)
    crop='soy'
  }
  var yld_str = 'yield_' + year_1 + ' : ' + yld_1 
                + ' bu/ac.\t yield_' + year_3 + ' : ' + yld_2+' bu/ac.';
  print(yld_str)
  panel.widgets().set(1, ui.Label(location + '\t crop : ' + crop));
  panel.widgets().set(2, ui.Label(yld_str));
  //// year-1
  var start_1 = year_1+mm_dd_beg
  var end_1 = year_1+mm_dd_end
  var modEVI_col_1 = get_modEVI_collection(large_field_extent,cdl,start_1,end_1)
  var modis_timeseries_1 = get_modis_timeseries(modEVI_col_1,start_1,end_1,delta_days,evi_thresh)
  var precip_timeseries_1 = get_precip(field_extent,start_1,end_1)
  var gdd_timeseries_1 = get_gdd(field_extent,start_1,end_1)
  var srad_timeseries_1 = get_srad(field_extent,start_1,end_1,delta_days)
  var vs_timeseries_1 = get_wind_speed(field_extent,start_1,end_1)
  //// year-2
  var start_2 = year_2+mm_dd_beg
  var end_2 = year_2+mm_dd_end
  var modEVI_col_2 = get_modEVI_collection(large_field_extent,cdl,start_2,end_2)
  var modis_timeseries_2 = get_modis_timeseries(modEVI_col_2,start_2,end_2,delta_days,evi_thresh)
  var precip_timeseries_2 = get_precip(field_extent,start_2,end_2)
  var gdd_timeseries_2 = get_gdd(field_extent,start_2,end_2)
  var srad_timeseries_2 = get_srad(field_extent,start_2,end_2,delta_days)
  var vs_timeseries_2 = get_wind_speed(field_extent,start_2,end_2)
  //// year-3
  var start_3 = year_3+mm_dd_beg
  var end_3 = year_3+mm_dd_end
  var modEVI_col_3 = get_modEVI_collection(large_field_extent,cdl,start_3,end_3)
  var modis_timeseries_3 = get_modis_timeseries(modEVI_col_3,start_3,end_3,delta_days,evi_thresh)
  var precip_timeseries_3 = get_precip(field_extent,start_3,end_3)
  var gdd_timeseries_3 = get_gdd(field_extent,start_3,end_3)
  var srad_timeseries_3 = get_srad(field_extent,start_3,end_3,delta_days)
  var vs_timeseries_3 = get_wind_speed(field_extent,start_3,end_3)
  // year-4
  var start_4 = year_4+mm_dd_beg
  var end_4 = year_4+mm_dd_end
  var modEVI_col_4 = get_modEVI_collection(large_field_extent,cdl,start_4,end_4)
  var modis_timeseries_4 = get_modis_timeseries(modEVI_col_4,start_4,end_4,delta_days,evi_thresh)
  var precip_timeseries_4 = get_precip(field_extent,start_4,end_4)
  var gdd_timeseries_4 = get_gdd(field_extent,start_4,end_4)
  var srad_timeseries_4 = get_srad(field_extent,start_4,end_4,delta_days)
  var vs_timeseries_4 = get_wind_speed(field_extent,start_4,end_4)
  //// Get timeseries charts (MODIS)
  var modis_timeseries=modis_timeseries_1.merge(modis_timeseries_3);
  //var modis_timeseries=modis_timeseries_1.merge(modis_timeseries_2).merge(modis_timeseries_3);
  var precip_timeseries=precip_timeseries_1.merge(precip_timeseries_2).merge(precip_timeseries_3).merge(precip_timeseries_4);
  var gdd_timeseries=gdd_timeseries_1.merge(gdd_timeseries_2).merge(gdd_timeseries_3).merge(gdd_timeseries_4);
  var srad_timeseries=srad_timeseries_1.merge(srad_timeseries_2).merge(srad_timeseries_3).merge(srad_timeseries_4);
  var vs_timeseries=vs_timeseries_1.merge(vs_timeseries_3)
  //.merge(vs_timeseries_3).merge(vs_timeseries_4);
  //var fitted_modis_timeseries_1=get_harmonic_fits(modEVI_col_1,'evi',curr_year_harmonics);
  //var fitted_modis_timeseries_2=get_harmonic_fits(modEVI_col_2,'evi',harmonics);
  //var fitted_modis_timeseries_3=get_harmonic_fits(modEVI_col_3,'evi',harmonics);
  //var fitted_modis_timeseries=fitted_modis_timeseries_1.merge(fitted_modis_timeseries_2).merge(fitted_modis_timeseries_3);
  var p1 = get_timeseries_chart(modis_timeseries,'evi',field_extent,delta_days,'Crop-Growth',year_1+' vs.'+year_2+' vs.'+year_3,beg_doy,end_doy)
  var p2 = get_precip_chart(precip_timeseries,'pr',field_extent,'Cumulative Precip',year_1+' vs.'+year_2+' vs.'+year_3,beg_doy,end_doy)
  var p3 = get_gdd_chart(gdd_timeseries,'gdd',field_extent,'Cumulative GDD',year_1+' vs.'+year_2+' vs.'+year_3,beg_doy,end_doy)
  var p4 = get_srad_chart(srad_timeseries,'srad',field_extent,delta_days,'Solar-Rad',year_1+' vs.'+year_2+' vs.'+year_3,beg_doy,end_doy)
  //var p5 = get_wind_speed_chart(vs_timeseries,'vs',field_extent,'Daily Wind Speed',year_1+' vs.'+year_2+' vs.'+year_3,beg_doy,end_doy)
    //var p2 = get_timeseries_chart(fitted_modis_timeseries,'fitted',field_extent,delta_days,'Fitted MODIS',year_1+' vs.'+year_2+' vs.'+year_3,beg_doy,end_doy)
  //// Add charts to the panel
  panel.widgets().set(3, p1);
  panel.widgets().set(4, p2);
  panel.widgets().set(5, p3);
  panel.widgets().set(6, p4);
  //panel.widgets().set(7, p5);
});
ui.root.add(state_panel);
ui.root.add(panel);