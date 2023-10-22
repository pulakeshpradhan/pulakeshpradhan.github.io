var RiverBasins = ui.import && ui.import("RiverBasins", "table", {
      "id": "users/hydrosolutions/Central_Asia_Large_River_Basins_WGS84"
    }) || ee.FeatureCollection("users/hydrosolutions/Central_Asia_Large_River_Basins_WGS84"),
    RiverBasins_small = ui.import && ui.import("RiverBasins_small", "table", {
      "id": "users/hydrosolutions/Central_Asia_Small_River_Basins_WGS84"
    }) || ee.FeatureCollection("users/hydrosolutions/Central_Asia_Small_River_Basins_WGS84"),
    RiverBasins_2023 = ui.import && ui.import("RiverBasins_2023", "table", {
      "id": "users/hydrosolutions/RiverBasins_CA_Jan2023"
    }) || ee.FeatureCollection("users/hydrosolutions/RiverBasins_CA_Jan2023"),
    Regions_2023 = ui.import && ui.import("Regions_2023", "table", {
      "id": "users/hydrosolutions/Regions_CA_Jan2023"
    }) || ee.FeatureCollection("users/hydrosolutions/Regions_CA_Jan2023");
//APPLICATION TO OBTAIN SNOW COVER INFORMATION OF RIVER BASINS IN CENTRAL ASIA
//Author: Silvan Ragettli
//-----------------------------------------------------------------//
// Correct Attribute of River Basin Shapefile:
var RiverBasinsExtent=RiverBasins_2023.geometry().simplify(1000);
/*RiverBasins.filter(ee.Filter.neq('BASIN', 'Murghab-Tejen')).merge(ee.FeatureCollection([
  ee.Feature(RiverBasins.filter(ee.Filter.eq('BASIN', 'Murghab-Tejen')).first()).set('BASIN','Murghab-Harirud')
  ]));*/
RiverBasins_2023=RiverBasins_2023.map(function(ft){return ee.Feature(ft).set('NAME',ee.String(ee.Feature(ft).get('BASIN')).cat(ee.String('_')).cat(ee.String(ee.Feature(ft).get('CODE'))))});
var region_names=ee.List(['...']).cat(RiverBasins_2023.aggregate_array('REGION').distinct());
var catchment_names=ee.List(['...']).cat(RiverBasins_2023.aggregate_array('NAME').sort());
// Import external dependencies
var batch = require('users/fitoprincipe/geetools:batch');
var functions4cropmapper = require('users/hydrosolutions/public_functions:functions4cropmapper');
var layers_name=[ 
  'Monthly snow cover fraction',
  'Monthly snow water equivalents_ERA5-Land',
  'Annual first day of no snow',
  'Annual first day of no snow_TREND',
  'Monthly snow water equivalents_TerraClimate',  
     ];
var layers_source=[ 
  'MODIS',
  'ERA5-Land',
  'MODIS',
  'MODIS',
  'TerraClimate',  
     ];
var layers_source_URL=[ 
  'https://doi.org/10.5067/MODIS/MOD10A1.006',
  'https://doi.org/10.24381/cds.68d2bb30',
  'https://doi.org/10.5067/MODIS/MOD10A1.006',
  'https://doi.org/10.5067/MODIS/MOD10A1.006',
  'https://doi.org/10.1038/sdata.2017.191',  
     ];     
var layers_resolution=[ 
  '500 m',
  '11132 m',
  '500 m',
  '500 m',
  '4638.3 meters',  
     ];
var layers_download=[ 
  'projects/ee-hydro4u/assets/snow_CentralAsia/Monthly_snow_cover_fraction_until2022-12_Terra',
  'projects/ee-hydro4u/assets/snow_CentralAsia/Monthly_snow_water_equivalents_ERA5-Land_until2022-10',
  'projects/ee-hydro4u/assets/snow_CentralAsia/Annual_first_day_of_no_snow_until2022',
  'projects/ee-hydro4u/assets/snow_CentralAsia/Annual_first_day_of_no_snow_TREND_until2022',
  'projects/ee-hydro4u/assets/snow_CentralAsia/Monthly_snow_water_equivalents_TerraClimate_until2021-12',  
     ];         
//-----------------------------------------------------------------//
//Define dates
var startDoy = 1;
var startYear = 2001;
//intervals for monthly plot:
var intervals = 30;//monthly composites
//automatically identify current year, starting from August:
var thisyear;
if (new Date().getMonth()>=7){//August
  thisyear=new Date().getFullYear();
} else {
  thisyear=(new Date().getFullYear()) - 1;
}
var endYear = thisyear;
var year_list=ee.List.sequence(startYear,ee.Number(thisyear)).map(function(nb){
        return {label: ee.String(ee.Number(nb).int()), value: nb};
  });
var year_list_client;
year_list.evaluate(function(result) {
  year_list_client=result;
});  
var time_intervals_all=ee.List(functions4cropmapper.extract_time_ranges(ee.List.sequence(startYear,thisyear), intervals)
  .iterate(function(list, previous)
    {return ee.List(previous).cat(ee.List(list))},ee.List([])
  ));
print('time_intervals_all',time_intervals_all);
//-----------------------------------------------------------------//
var terraClimate=ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
                .filter(ee.Filter.date(ee.Date.fromYMD(startYear, 1, 1), ee.Date.fromYMD(thisyear + 1, 1, 1)))
                .filterBounds(RiverBasinsExtent)
                .select("swe");
print('terraClimate',terraClimate)
var lastdate=ee.Date(ee.Image(terraClimate.sort('system:time_start',false).first()).get('system:time_start'));
//the resolution of terraClimate is better than that of ERA5, but it is not readily available. So merge the two collections, with preference to terraClimate
print('lastdate',lastdate)
//LOAD DATASET: ERA5 SWE
var era5_swe = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_AGGR")
//                .filter(ee.Filter.date(lastdate.advance(1,'day'), ee.Date.fromYMD(thisyear + 1, 1, 1)))
                .filter(ee.Filter.date(ee.Date.fromYMD(startYear, 1, 1), ee.Date.fromYMD(thisyear + 1, 1, 1)))
                .filterBounds(RiverBasinsExtent)
                .select("snow_depth_water_equivalent")
                .map(function(img){return ee.Image(img).rename('swe').multiply(1000)
                  .set('system:time_start',ee.Image(img).get('system:time_start'));
                });
print('era5_swe',era5_swe);
//era5_swe=terraClimate.merge(era5_swe);
print('era5_swe',era5_swe.sort('system:time_start',false))
/*very coarse resolution, no near real time:
var gldas = ee.ImageCollection("NASA/GLDAS/V022/CLSM/G025/DA1D")
                .filter(ee.Filter.date(ee.Date.fromYMD(startYear, 1, 1), ee.Date.fromYMD(thisyear + 1, 1, 1)))
                .filterBounds(RiverBasinsExtent)
                .select("SWE_tavg")*/
var visArgs_SWE = {
  bands: ['value'],
  min: 0, max: 100,
  palette: ['blue','white']
};
//LOAD DATASET: MODIS SCF
var modis_terra_sc = ee.ImageCollection('MODIS/006/MOD10A1').filterBounds(RiverBasinsExtent);
var modis_cc_func=function(x1){
  x1=ee.Image(x1);
  var mod=ee.Image(x1).select(['NDSI_Snow_Cover','NDSI_Snow_Cover_Class']);
  //get the modis acqua scene of the same day and use it to fill data gaps (NDSI_Snow_Cover_Class>=200)
  var myd_col = ee.ImageCollection('MODIS/006/MYD10A1').filterBounds(RiverBasinsExtent)
      .filterDate(mod.date(),mod.date().advance(1, 'day'));
      //.filterDate(ee.Date.fromYMD(startYear,1,ee.Date.fromYMD(2022,5,1))
  var myd=ee.Image(ee.Algorithms.If(myd_col.size().eq(0),/*ee.Image(255).rename('NDSI_Snow_Cover_Class').addBands(*/ee.Image().rename('NDSI_Snow_Cover'),ee.Image(myd_col.first()).select(['NDSI_Snow_Cover'/*,'NDSI_Snow_Cover_Class'*/])));
  //var image=mod.select('NDSI_Snow_Cover').min(myd).copyProperties(mod).set('system:time_start', mod.get('system:time_start'));
  var image=mod.select('NDSI_Snow_Cover').where(mod.select('NDSI_Snow_Cover_Class').gte(200),myd);
  return image;
};
var modis_scf = ee.ImageCollection(modis_terra_sc.map(function(img){ return modis_cc_func(img)}));
var visArgs_FSC = {
  bands: ['value'],
  min: 0, max: 100,
  palette: ['blue','white']
};
//-----------------------------------------------------------------//
//First day of no snow algorithm:
// Define date bands
var startDate;
var startYear;
function addDateBands(img) {
  // Get image date.
  var date = img.date();
  // Get calendar day-of-year.
  var value = date.getRelative('day', 'year');
  // Get relative day-of-year; enumerate from user-defined startDoy.
  var relDoy = date.difference(startDate, 'day');
  // Get the date as milliseconds from Unix epoch.
  var millis = date.millis();
  // Add all of the above date info as bands to the snow fraction image.
  var dateBands = ee.Image.constant([value, relDoy, millis, startYear])
    .rename(['value', 'relDoy', 'millis', 'year']);
  // Cast bands to correct data type before returning the image.
  return img.addBands(dateBands)
    .cast({'value': 'int', 'relDoy': 'int', 'millis': 'long','year': 'int'})
    .set('millis', millis);
}
//3. Define an analysis mask
var waterMask = ee.Image('MODIS/MOD44W/MOD44W_005_2000_02_24')
  .select('water_mask')
  .not();
var completeCol = ee.ImageCollection('MODIS/006/MOD10A1')
  .select('NDSI_Snow_Cover');
// Pixels must have been 10% snow covered for at least 4% of the days over the entire period (previously: 2 weeks in 2018)
// 
//var snowCoverEphem = completeCol.filterDate('2018-01-01', '2019-01-01')
var snowCoverEphem = completeCol.filterDate(ee.Date.fromYMD(startYear,1,1), ee.Date.fromYMD(endYear,12,31))
  .map(function(img) {
    return img.gte(10);
  })
  .sum()
  //.gte(14);
  .gte((endYear + 1 - startYear)*365*4/100);
// Pixels must not be 10% snow covered more than 200 days in 2018.
var snowCoverConst = completeCol.filterDate('2018-01-01', '2019-01-01')
  .map(function(img) {
    return img.gte(10);
  })
  .sum()
  .lte(200);
var analysisMask = waterMask.multiply(snowCoverEphem).multiply(snowCoverConst);
/*Export.image.toAsset({
  image:analysisMask,
  scale: 500,
  description: 'Central_Asia_1stday_analysisMask',
  maxPixels: 1e13,
  region:RiverBasinsExtent.geometry(),
  assetId: 'users/hydrosolutions/Central_Asia_1stday_analysisMask',
});*/
analysisMask=ee.Image(ee.data.getAsset('users/hydrosolutions/Central_Asia_1stday_analysisMask').id);
//Identify the first day of the year without snow per pixel, per year
var years = ee.List.sequence(startYear, endYear);
var annualList = years.map(function(year) {
  // Set the global startYear variable as the year being worked on so that
  // it will be accessible to the addDateBands mapped to the collection below.
  startYear = year;
  // Get the first day-of-year for this year as an ee.Date object.
  var firstDoy = ee.Date.fromYMD(year, 1, 1);
  // Advance from the firstDoy to the user-defined startDay; subtract 1 since
  // firstDoy is already 1. Set the result as the global startDate variable so
  // that it is accessible to the addDateBands mapped to the collection below.
  startDate = firstDoy.advance(startDoy-1, 'day');
  // Get endDate for this year by advancing 1 year from startDate.
  // Need to advance an extra day because end date of filterDate() function
  // is exclusive.
  var endDate = startDate.advance(1, 'year').advance(1, 'day');
  // Filter the complete collection by the start and end dates just defined.
  var yearCol = completeCol.filterDate(startDate, endDate);
  // Construct an image where pixels represent the first day within the date
  // range that the lowest snow fraction is observed.
  var noSnowImg = yearCol
    // Add date bands to all images in this particular collection.
    .map(addDateBands)
    // Sort the images by ascending time to identify the first day without
    // snow. Alternatively, you can use .sort('millis', false) to
    // reverse sort (find first day of snow in the fall).
    .sort('millis')
    // Make a mosaic composed of pixels from images that represent the
    // observation with the minimum percent snow cover (defined by the
    // NDSI_Snow_Cover band); include all associated bands for the selected
    // image.
    .reduce(ee.Reducer.min(5))
    // Rename the bands - band names were altered by previous operation.
    .rename(['snowCover', 'value', 'relDoy', 'millis', 'year'])
    // Apply the mask.
    .updateMask(analysisMask)
    // Set the year as a property for filtering by later.
    .set('year', year);
  // Mask by minimum snow fraction - only include pixels that reach 0
  // percent cover. Return the resulting image.
  return noSnowImg.updateMask(noSnowImg.select('snowCover').eq(0));
});
var annualCol = ee.ImageCollection.fromImages(annualList);
//Data summary and visualization
//Single-year map
// Define visualization arguments.
var palette1=['0D0887', '5B02A3', '9A179B', 'CB4678', 'EB7852', 'FBB32F', 'F0F921'];
var visArgs_single = {
  bands: ['value'],
  min: 0,
  max: 220,
  palette: palette1};
//Year-to-year difference map (CURRENTLY NOT IN USE)
// Define the years to difference.
var firstYear = 2005;
var secondYear = 2015;
// Calculate difference image.
var firstImg = annualCol.filter(ee.Filter.eq('year', firstYear))
  .first().select('value');
var secondImg = annualCol.filter(ee.Filter.eq('year', secondYear))
  .first().select('value');
var dif = secondImg.subtract(firstImg);
// Define visualization arguments.
//Trend analysis map
// Calculate slope image.
var slope = annualCol.sort('year').select(['year', 'value'])
  .reduce(ee.Reducer.linearFit()).select('scale');
// Define visualization arguments.
var palette2 = ['b2182b', 'ef8a62', 'fddbc7', 'f7f7f7','d1e5f0', '67a9cf', '2166ac'];
var visArgs_trend = {
  min: -1,
  max: 1,
  palette: palette2};
//-----------------------------------------------------------------//
//Time series chart
// Function to calculate annual mean DOY of AOI.
var get_AoiMean= function(aoi,imcol,reducer,tilescale){
  reducer=ee.Reducer(reducer);
  imcol=ee.ImageCollection(imcol);
  return ee.ImageCollection(imcol).map(function(img) {
    var summary = img.reduceRegion({
      reducer: reducer,
      geometry: aoi,
      scale: 1e3,
      bestEffort: true,//comment out when exporing!
      maxPixels: 1e14,
      tileScale: tilescale,
    });
    return ee.Feature(null, summary).set('year', img.get('year')).set('system:time_start', img.get('system:time_start'));
  });
};
// Function to calculate annual mean DOY of AOI, but only based on a sample of 1000 pixels (may prevent 'User memory limit exceeded').
var get_AoiMean_sample= function(aoi,imcol,reducer,tilescale){
  reducer=ee.Reducer(reducer);
  imcol=ee.ImageCollection(imcol);
  var samplePoints = ee.Image(0).sample({
        region:aoi,
        numPixels: 1000,
        tileScale: 1,
        scale: 1e3,
        geometries: true,
        dropNulls: false
      });
  //print('samplePoints',samplePoints);
  return ee.ImageCollection(imcol).map(function(img) {
    var summary = img.reduceRegion({
      reducer: reducer,
      geometry: samplePoints.geometry(),
      scale: 1e3,
      tileScale: 2,
    });          
    return ee.Feature(null, summary).set('system:time_start', img.get('system:time_start'))
      .set('Year-Month',ee.Date(img.get('system:time_start')).format('YYYY-MM'));
  });
};
// Print chart to console.
var get_chart = function(AoiMean){
  return ui.Chart.feature.byFeature(AoiMean, variables[layer], 'value')
  .setOptions({
    title: charttitle[layer],
    legend: {position: 'none'},
    trendlines: {0: { 
      color: 'blue',
      lineWidth: 10,
      opacity: 0.2,
      labelInLegend: 'Trendline',
      showR2: true,
      visibleInLegend: true
    }},
    hAxis: {
      title: hAxistitle[layer],
      format: hAxisformat[layer]
    },
    vAxis: {title: axistitle[layer], minValue:0}});
};
//Chart for selected pixels, after clicking on map
var get_chart_point = function(annualAoiPoint){
  return ui.Chart.feature.byFeature(annualAoiPoint, variables[layer], 'value')
  .setOptions({
    title: charttitle2[layer],
    legend: {position: 'none'},
    trendlines: {0: { 
      color: 'blue',
      lineWidth: 10,
      opacity: 0.2,
      labelInLegend: 'Trendline',
      showR2: true,
      visibleInLegend: true
    }},
    hAxis: {
      title: hAxistitle[layer],
      format: hAxisformat[layer]
    },
    vAxis: {title: axistitle[layer], minValue:0}});
};
var chartpanel1=ui.Panel({widgets: []});
var chartpanel2=ui.Panel({widgets: []});
var chartpanel=ui.Panel({widgets: [chartpanel1,chartpanel2],layout: ui.Panel.Layout.flow('vertical')});
//-----------------------------------------------------------------//
///DEFINE UI ELEMENTS
//selection panel
var selectionPanel = ui.Panel({
  // Create a panel with vertical flow layout.
    layout: ui.Panel.Layout.flow('vertical'),
    style: {/*width: "500px",*/border: '1px solid black'},
    widgets: []
});
//Map
var uiMap = ui.Map();
uiMap.setOptions("HYBRID");
uiMap.style().set('cursor', 'crosshair');
uiMap.centerObject(RiverBasinsExtent);
var d = ee.Image().paint(RiverBasins_2023, 0, 2);
uiMap.layers().set(0,ui.Map.Layer(d,null,'River Basins'));//placeholder
uiMap.layers().set(1,ui.Map.Layer(d,null,'River Basins'));
//Panel on left side of screen.
//ui.root.widgets().reset([selectionPanel,uiMap]);
var splitPanel1 = ui.SplitPanel({
  firstPanel: selectionPanel,
  secondPanel: uiMap,
  //wipe: true,
});
splitPanel1.getFirstPanel().style().set('width','500px');
ui.root.widgets().reset([splitPanel1]);
//Logo
var Logo_HydroSolutions= ee.Image("projects/ee-hsol/assets/logo_hsol_projected").resample('bicubic').resample('bicubic');
//print('Logo_HydroSolutions',Logo_HydroSolutions);
var logo_hsol=ui.Thumbnail({
  image:Logo_HydroSolutions,//,
  params:{bands:['b1','b2','b3'],
  min:0,max:255},
  //onClick: hydrosolutions.getUrl(),
  style:{width:'140px',height:'auto', margin: 'auto',padding: '10px'}});
var hydrosolutions = ui.Label({ value : "hydrosolutions.ch", style : { shown:true ,color:'blue', fontWeight: '600', fontSize: '13px',margin: '4px 1px 2px 5px',height:'12px'}, 
  targetUrl : "https://www.hydrosolutions.ch"  } );
var Logos_PANEL=ui.Panel({
    style: {
    width: '150px',
    height: 'auto',
    padding: '5px',
    position: 'bottom-right'
    },
    widgets:[logo_hsol,hydrosolutions]
  });
//var hydrosolutions_manual=ui.Panel({widgets: [hydrosolutions/*,manual*/],layout: ui.Panel.Layout.flow('vertical'),style: {position: 'bottom-right',/*height: '22px',*/padding:"2px"}});
uiMap.add(Logos_PANEL);
//Legend
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'top-right',
    padding: '1px 1px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 1px 0',
    padding: '0',
    maxWidth: '75px'
    }
});
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
print('lon max',lon)
// create vizualization parameters
var viz = {min: 0, max: 100, palette: palette1};
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var legend_max = ui.Label(viz.max + ' ', {fontWeight: '450', fontSize: '15px', margin: '0px 1px 1px 1px'});
legend.add(legend_max);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'20x50'},
style: {padding: '0px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var legend_min = ui.Label(viz.min, {fontWeight: '450', fontSize: '15px', margin: '0px 1px 1px 1px'});
legend.add(legend_min);
var viz1 = {min: 2, max: 0, palette: palette2};
var legendImage_trend = ee.Image.pixelLonLat().select('latitude').multiply((viz1.max-viz1.min)/100.0).add(viz1.min).visualize(viz1);
//OPACITY SLIDER
var slider = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(1);
slider.onSlide(function(value) {
  uiMap.layers().get(0).setOpacity(value);
});
var sliderPanel = ui.Panel({style :{position : "top-right",width: "130px"}});//
sliderPanel.widgets().set(0,ui.Label('Opacity Slider', {fontWeight: '450', fontSize: '14px', margin: '1px 1px 1px 1px'}));
sliderPanel.widgets().set(1,slider);
//Dateslider for selecting a month for SCF
var mm_yyyy= 12 + '_' + thisyear;
var mm_yyyy_previous=mm_yyyy;
var dateslider= ui.DateSlider({start:ee.Date(ee.List(time_intervals_all.get(0)).get(0)), end: ee.Date(ee.List(time_intervals_all.reverse().get(0)).get(0)).advance(15,'day'), 
  value: ee.Date(ee.List(time_intervals_all.reverse().get(0)).get(0)), period: 1, onChange:
    function(range){
      checkbox2download.setValue(false,false);
      var yr=ee.Number(range.start().get('year'));
      var mn=ee.String('00').cat(ee.String(ee.Number(range.start().get('month')).toShort())).slice(-2);//leading zeroes
      var mm_yyyy_server=mn.cat(ee.String('_')).cat(ee.String(yr.toShort()));
      mm_yyyy_server.evaluate(function(result){
        mm_yyyy=result;
        //mn=ee.Number.parse(mn);
        //var selected_fsc=ee.Image(selected_ic.filterDate(range.start().advance(-15,'day'),range.end().advance(15,'day')).first());
        var selected_fsc=ee.Image(selected_ic.filter(ee.Filter.eq('Year-Month',ee.String(yr.toShort()).cat(ee.String('-')).cat(mn))).first());
        print('selected imgs',selected_ic.filterDate(range.start().advance(-15,'day'),range.end().advance(15,'day')));
        print('selected imgs',selected_ic.filter(ee.Filter.eq('Year-Month',ee.String(yr.toShort()).cat(ee.String('-')).cat(mn))));
        map2download=selected_fsc;
        if (mm_yyyy_previous != mm_yyyy){
          uiMap.layers().set(0,ui.Map.Layer(selected_fsc, visArgs_FSC, nameprefix + mm_yyyy));
        }
        mm_yyyy_previous=mm_yyyy;
        //if (downloadselectionmode){
          //chartpanel2.clear();
          var zIndex = uiMap.layers().length();
          for (var i=zIndex-1; i>3; i--) {
            uiMap.remove(uiMap.layers().get(i));
          }
        //}
      });
    }, style:{position: 'top-left',}});
//function that defines what happens when clicking on map
var mapclick;
var task_click1=  function(imgcol) {
  imgcol=ee.ImageCollection(imgcol);
  mapclick = uiMap.onClick(function(coords) {
    var point1 = ee.FeatureCollection(ee.Geometry.Point(coords.lon, coords.lat));
    var poi_map_layer=ui.Map.Layer(point1.style({pointShape: 'triangle',pointSize:10,color:'black',fillColor : 'white'}), {},"Point of Interest");
    uiMap.layers().set(3, poi_map_layer);
    var AoiMean_point = ee.FeatureCollection(get_AoiMean(point1.geometry(),imgcol,ee.Reducer.first(),1));
    //check if the requested properties are available at this point:
    var c=ee.Feature(AoiMean_point.toList(1).get(0)).propertyNames();
    print('c',c);
    var plz_wait=ui.Label('Generating Chart. Please wait...', {color: 'red',height: '29px',margin: '15px 1px 1px 10px'});
    chartpanel2.widgets().set(0,ui.Label('Point of Interest', {fontWeight: '450', fontSize: '16px',height: '29px',margin: '15px 1px 1px 10px'}));
    chartpanel2.widgets().set(1,plz_wait);
    // Get chart and print chart to console.
    c.indexOf("value").evaluate(function(result) {
      if (result==-1){ // "value" missing
        chartpanel2.widgets().set(1,ui.Label('No data available at selected point', {color: 'red',height: '29px',margin: '15px 1px 1px 10px'}));
      } else {
        var chart=get_chart_point(AoiMean_point);
        chartpanel2.widgets().set(1,chart);
        chartpanel2.remove(plz_wait);
      }});
  });
};
//Layer selection
var click2download=function(){};
var layer; var map2download; var layerGeometry=ui.Map.Layer(); var layer_active;
var AoiMean;
//var aoi_select_region= ui.Select(); 
var nameprefix; var selected_ic; var checkbox2download=ui.Checkbox(); //var visArgs;var downloadselectionmode = false;
var layer_select = ui.Select({style:{width: '200px',height: '29px',margin: '2px 1px 1px 10px'},
    items: [ 
  {label:  'Monthly snow cover fraction', value: 0},
  {label:  'Monthly snow water equivalents (ERA5-Land)', value: 1},
  {label:  'Monthly snow water equivalents (TerraClimate)', value: 4},  
  {label:  'Annual first day of no snow', value: 2},
  //{label:  'Year-to-year difference map', value: 1},
  {label:  'Annual first day of no snow 2001-'+ thisyear + ' TREND', value: 3},
     ],
    onChange: function(key){
      aoi_select_subbasin.setValue(null,false);
      if (regionname != '...'){
        aoi_select_region.setValue('...');
      }
      layer=key;
      uiMap.unlisten(mapclick);
      uiMap.remove(dateslider);
      if (layer_active===0){
        uiMap.add(legend);
        uiMap.remove(sliderPanel);
        uiMap.add(sliderPanel);
      }
      layer_active=1;
      panel_layer_details.clear();
      var link_source = ui.Label({ value : layers_source[key], style : { fontSize: '12px',margin: '1px 1px 1px 10px'},
        targetUrl :layers_source_URL[key]});
      var download_csv_label = ui.Label({ value : 'Link', style : {fontSize: '12px',margin: '1px 1px 1px 10px'},
        targetUrl : ee.FeatureCollection(layers_download[key]).sort('year').sort('Year-Month').getDownloadURL({format: 'csv', filename :layers_download[key].split('snow_CentralAsia/')[1]})} );
      panel_layer_details.add(ui.Label('Layer Details', {fontWeight: '450', fontSize: '12px',height: '20px',color: 'red',margin: '10px 1px 1px 10px'}));
      panel_layer_details.add(ui.Panel({widgets: [ui.Label('Source: ', {fontSize: '12px',color: 'red',margin: '1px 1px 1px 10px'}),
        link_source], layout: ui.Panel.Layout.flow('horizontal')}));
      panel_layer_details.add(ui.Panel({widgets: [ui.Label('Spatial Resolution: ', {fontSize: '12px',color: 'red',margin: '1px 1px 1px 10px'}),
        ui.Label(layers_resolution[key], {fontSize: '12px',margin: '1px 1px 1px 10px'})], layout: ui.Panel.Layout.flow('horizontal')}));    
      panel_layer_details.add(ui.Panel({widgets: [ui.Label('Download Time-Series: ', {fontSize: '12px',color: 'red',margin: '1px 1px 1px 10px'}),
       download_csv_label], layout: ui.Panel.Layout.flow('horizontal')}));
      if (key === 0) {
        nameprefix = 'MonthlySCF';
        //add dateslider, set the last date to the last available image of the collection
        var endDate=ee.Date(ee.Image(modis_scf.filter(ee.Filter.calendarRange(thisyear,thisyear,'year')).sort('system:time_start',false).first()).get('system:time_start'));
        print('endDate',endDate.format('YYYY-MM-dd HH:mm'));
        dateslider.setEnd(endDate);
        endDate=ee.Date.fromYMD(endDate.get('year'),endDate.get('month'),1);
        dateslider.setValue(endDate,false);
        uiMap.add(dateslider);
        //monthly composites
        var mscf=modis_scf.map(function(x){
          var image=ee.Image(x).select('NDSI_Snow_Cover');
            //.blend(ee.Image(x).select('NDSI_Snow_Cover_Class'));
          //keep sc pixels, mask out pixels with missing data
          return image;//.updateMask(image.lte(100));
        });
        selected_ic=ee.ImageCollection(time_intervals_all.map(function(list){
          var start=ee.Date(ee.List(list).get(0));
          var end=ee.Date(ee.List(list).get(1));
          var year=ee.Number(start.get('year'));
          var month=ee.Number(start.get('month'));
          //for each pixel, we take the mean of all SCF images of a month without clouds
          //more accurate would be to use cubic spline interpolation (Tang et al. 2022) for cloud gap filling, but this method will lead to memory exceedance
          //cubic spline fitting not available in GEE - use linear interpolation between nearest data points?
          var mscf_interpolated=mscf.filterDate(start,end).map(function(img){
            //for the given image, find for each cloud pixel the nearest data points
            var date=ee.Date(ee.Image(img).get('system:time_start'));
            var mscf_fwd=mscf.filterDate(date,end.advance(5,'day')).sort('system:time_start');//advance by 5 days so to interpolate with images from the following month if necessary
            var mscf_bwd=mscf.filterDate(start.advance(-5,'day'),date.advance(0.1,'day')).sort('system:time_start',false);
            var mscf_fwd_nonnull=mscf_fwd.reduce(ee.Reducer.firstNonNull());//returns the image pixels nearest in time as possible
            var mscf_bwd_nonnull=mscf_fwd.reduce(ee.Reducer.firstNonNull());//returns the image pixels nearest in time as possible
            //var mask=ee.Image(img).mask().not();
            //actually no interpolation, but just the mean (but doesnt matter, bcs the mean of the linear interpolation is equal to the mean of the two images)
            var imgs4avg= ee.ImageCollection([mscf_fwd_nonnull,mscf_bwd_nonnull]);
            //var img2 = ee.Image(-99).blend(ee.Image(img)).where(mask.eq(1),ee.ImageCollection([mscf_fwd_nonnull,mscf_bwd_nonnull]).mean());
            //return img2.updateMask(img2.gte(0));
            return imgs4avg.mean().updateMask(imgs4avg.count().eq(2));//eq(2): only interpolate if images before AND after are available?
          });
          //return mscf.filterDate(start,end).mean().max(ee.Image(0)).rename('value')
          var img2return=mscf_interpolated.mean().rename('value');
          img2return=img2return.focal_mean({radius: 2, kernelType :'circle',units: 'pixels',iterations: 1}).blend(img2return);
          return img2return
            //.set('system:time_start',start)
            .set('system:time_start',ee.Date.fromYMD(year,month,2))
            .set('Year-Month',start.format('YYYY-MM'));
            //.set('year', ee.Number(start.get('year')).add(month.divide(ee.Number(12)).subtract(ee.Number(1/12))));
        }));
        map2download=selected_ic.sort('system:time_start',false).first();
        print('selected_ic',selected_ic);
        //ee.Date.fromYMD(startYear, 1, 1)
        uiMap.layers().set(0,ui.Map.Layer(selected_ic.sort('system:time_start',false).first(), visArgs_FSC, 'FSC 12_' + thisyear));
        //visArgs=visArgs_FSC;
        //Legend parameters
        viz.palette=['blue','white'];
//        viz.palette=['white','blue'];
        viz.max=100;
        viz.min=0;
        gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
        legendImage = gradient.visualize(viz);
        legend_max.setValue(viz.max + '% Snow Cover');
        legend_min.setValue(viz.min);
        thumbnail.setImage(legendImage);
        /*
        var list= time_intervals_all.reverse().get(0);
        var start=ee.Date(ee.List(list).get(0));
        var end=ee.Date(ee.List(list).get(1));
        var year=ee.Number(start.get('year'));
        var month=ee.Number(start.get('month'));
        //for each pixel, we take the mean of all SCF images of a month without clouds
        //more accurate would be to use cubic spline interpolation (Tang et al. 2022) for cloud gap filling, but this method will lead to memory exceedance
        //cubic spline fitting not available in GEE - use linear interpolation between nearest data points?
        var mscf_interpolated=mscf.filterDate(start,end).map(function(img){
          //for the given image, find for each cloud pixel the nearest data points
          var date=ee.Date(ee.Image(img).get('system:time_start'));
          var mscf_fwd=mscf.filterDate(date,end.advance(5,'day')).sort('system:time_start');
          var mscf_bwd=mscf.filterDate(start.advance(-5,'day'),date.advance(0.1,'day')).sort('system:time_start',false);
          var mscf_fwd_nonnull=mscf_fwd.reduce(ee.Reducer.firstNonNull());
          var mscf_bwd_nonnull=mscf_bwd.reduce(ee.Reducer.firstNonNull());
          //var mask=ee.Image(img).mask().not();
          //no interpolation, but just the mean (but doesnt matter, bcs the mean of all interpolated images would be equal to the mean of the two images)
          //var img2 = ee.Image(-99).blend(ee.Image(img)).where(mask.eq(1),ee.ImageCollection([mscf_fwd_nonnull,mscf_bwd_nonnull]).mean());
          var imgs4avg= ee.ImageCollection([mscf_fwd_nonnull,mscf_bwd_nonnull]);
          //return img2.updateMask(img2.gte(0));
          return imgs4avg.mean();//.updateMask(imgs4avg.count().eq(2));
        });
        print('imgs',mscf.filterDate(start,end));
        print('mscf_interpolated',mscf_interpolated)
        //var img2display= mscf.filterDate(start,end).count().rename('value')
        var cop_lc=ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global").filter(ee.Filter.calendarRange(ee.Number(2019).min(year), year, 'year')).first();
        var not_water=cop_lc.select('water-permanent-coverfraction').lte(20);
        var img2display= mscf_interpolated.count().rename('value');//.updateMask(not_water);
        uiMap.layers().set(2,ui.Map.Layer(img2display, visArgs_FSC, 'FSC 12_' + thisyear + '_count'));
        //img2display=ee.ImageCollection([mscf_fwd_nonnull,mscf_bwd_nonnull]).mean();
        img2display= mscf_interpolated.mean().rename('value')
        img2display=img2display.focal_mean({radius: 2, kernelType :'circle',units: 'pixels',iterations: 1}).blend(img2display)
          //.updateMask(not_water)
        print('img2display',img2display);
        uiMap.layers().set(3,ui.Map.Layer(img2display.rename('value'), visArgs_FSC, 'FSC 12_' + thisyear + '_interp'));*/
        //era5_swe
      } else if (key == 1 || key == 4){
        nameprefix = 'MonthlySWE';
        var swe=era5_swe;
        if (key == 4){
          swe=terraClimate;
        }
        //add dateslider, set the last date to the last available image of the collection
        selected_ic=ee.ImageCollection(swe.map(function(img){
          var year=ee.Number(ee.Date(ee.Image(img).get('system:time_start')).get('year'));
          var month=ee.Number(ee.Date(ee.Image(img).get('system:time_start')).get('month'));
          return ee.Image(img)/*.multiply(1000)*/.max(ee.Image(0)).rename('value')
            .set('system:time_start',ee.Date.fromYMD(year,month,2))
            .set('Year-Month',ee.Date(ee.Image(img).get('system:time_start')).format('YYYY-MM'));
            //.set('year', year.add(month.divide(ee.Number(12)).subtract(ee.Number(1/12))));
        }));
        print('selected_ic',selected_ic);
        var endDate2=ee.Date(ee.Image(selected_ic.filter(ee.Filter.calendarRange(thisyear - 1,thisyear,'year')).sort('system:time_start',false).first()).get('system:time_start'));
        print('endDate',endDate2.format('YYYY-MM-dd HH:mm'));
        dateslider.setEnd(endDate2);
        uiMap.add(dateslider);
        map2download=selected_ic.sort('system:time_start',false).first();
        //uiMap.layers().set(0,ui.Map.Layer(selected_ic.sort('system:time_start',false).first(), visArgs_SWE, 'SWE'));
        //Legend parameters
        viz.palette=['blue','white'];
        //viz.palette=['white','blue'];
        viz.max=100;
        viz.min=0;
        gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
        legendImage = gradient.visualize(viz);
        legend_max.setValue(viz.max + ' mm SWE');
        legend_min.setValue(viz.min);
        thumbnail.setImage(legendImage);
        dateslider.setValue(endDate2);
      } else if (key === 2){
        nameprefix = 'FirstDayOfNoSnow';
        uiMap.layers().set(0,ui.Map.Layer(d,null,'River Basins'));//placeholder
        selected_ic=annualCol.select('value');
        //Legend parameters
        viz.palette=palette1;
        viz.max=220;
        viz.min=0;
        gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
        legendImage = gradient.visualize(viz);
        legend_max.setValue('DOY ' + viz.max);
        legend_min.setValue(viz.min);
        thumbnail.setImage(legendImage);
        uiMap.remove(legend);
        layer_active=0; //layer gets added to map only after year selection
      } else if (key === 3){
        nameprefix = 'FirstDayOfNoSnow';
        map2download = slope;
        uiMap.layers().set(0,ui.Map.Layer(slope, visArgs_trend, '2001-'+thisyear + ' first day no snow slope'));
        selected_ic=annualCol.select('value');
        //Legend parameters
        //viz.palette=palette2;
        viz.max=1;
        viz.min=-1;
        /*gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
        legendImage = gradient.visualize(viz);*/ 
        legend_max.setValue(viz.max + ' (Slope)');
        legend_min.setValue(viz.min);
        //thumbnail.setImage(legendImage_trend);
        thumbnail.setImage(legendImage_trend);
      }
      task_click1(selected_ic);
      //clean up: remove widgets and layers
      var zIndex = selectionPanel.widgets().length();
      for (var i=zIndex-1; i>3; i--) {
        selectionPanel.remove(selectionPanel.widgets().get(i));
      }
      chartpanel1.clear();chartpanel2.clear();
      zIndex = uiMap.layers().length();
      for (i=zIndex-1; i>2; i--) {
        uiMap.remove(uiMap.layers().get(i));
      }
      checkbox2download.setValue(false);
      checkbox3download.setValue(false);
      uiMap.centerObject(RiverBasinsExtent);
    //EXPORT THE DATA FROM ALL BASINS AS A TABLE:
    var joinProperty;
    if (layer<=1 || layer == 4){//Monthly layers
      joinProperty='Year-Month';
    } else {//ANNUAL layers
      joinProperty='year';
    }
    var features_with_time =selected_ic.map(function(img){return ee.Feature(null).copyProperties(ee.Image(img),[joinProperty])});
    print('features_with_time',features_with_time);
    //print('catchment_names',catchment_names);
    if (aoi_selected == 1){
      aoi_select_subbasin.setValue(basin_selected);
    }
   /* var table2export=catchment_names.slice(1).iterate(function(string,previous){
    //var string=catchment_names.get(0);
      var str=ee.String(string);
      aoi=ee.Feature(RiverBasins_2023.filter(ee.Filter.eq('NAME', str)).first()).geometry();
      var AoiMean_tmp;
      //Attention, comment out when exporing: //bestEffort: true,//
      if (layer<=1 || layer == 4){//Monthly layers
//        AoiMean_tmp = ee.FeatureCollection(get_AoiMean_sample(aoi,selected_ic,ee.Reducer.mean(),8));
        AoiMean_tmp = ee.FeatureCollection(get_AoiMean(aoi,selected_ic,ee.Reducer.mean(),16)).map(function(ft){
          return ee.Feature(ft).set('Year-Month',ee.Date(ft.get('system:time_start')).format('YYYY-MM'));
        });
      } else {//ANNUAL layers
        AoiMean_tmp = ee.FeatureCollection(get_AoiMean(aoi,selected_ic,ee.Reducer.mean(),8));
      }
      var joined =ee.Join.saveFirst(joinProperty).apply(ee.FeatureCollection(previous),AoiMean_tmp.select([joinProperty,'value'],[joinProperty,str.replace('\\.',"",'g')]), ee.Filter.equals({//
        leftField:joinProperty, 
        rightField:joinProperty
      }));
      joined=joined.map(function(ft) {
        var other = ee.Feature(ft.get(joinProperty));
        //use the centroid as a geometry (because Unable to export features with null geometry)
        return ee.Feature(RiverBasinsExtent.centroid(1000)).copyProperties(ft).set(other.toDictionary());
      });
      return joined;
    },features_with_time);
    var export_layer_name=layers_name[key].replace(/ /g,"_");
    print('Export layer:',export_layer_name);
    var enddate=ee.String(ee.Feature(features_with_time.sort(joinProperty,false).first()).get(joinProperty));
    print('enddate',enddate);
    enddate.evaluate(function(result) {
      //print('table2export',table2export);
      Export.table.toAsset({ 
        collection:table2export,
        description: export_layer_name + '_until' + result.split('.')[0],
        //fileFormat: 'csv',
        assetId:'projects/ee-hydro4u/assets/snow_CentralAsia/' + export_layer_name + '_until' + result.split('.')[0],
      });
    });*/
  }
});
//define titles and labels for charts, for each option above
var charttitle=['Regional mean monthly fractional snow cover','Regional mean monthly snow water equivalents',
  'Regional mean first day of year with no snow cover','Regional mean first day of year with no snow cover'];
var charttitle2=['Mean monthly fractional snow cover at Point of Interest','Mean monthly snow water equivalents at Point of Interest',
  'First day of year with no snow cover at Point of Interest','First day of year with no snow cover at Point of Interest']; 
var axistitle=['fSC (%)','mm s.w.e.','Day-of-year','Day-of-year'];
var variables=['system:time_start','system:time_start','year','year'];
var hAxisformat=['MMM d, y','MMM d, y','####','####'];
var hAxistitle=['Date','Date','Year','Year'];
//Checkbox to activate selection of tiles for download
//var message=ui.Label({ value :'Click on the selected River Basin to select a Tile', style : {color:'red'}  });
var message=ui.Label({ value :'Please wait...', style : {color:'red'}  });
var panel2download=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('vertical')});
var label4download=ui.Label('Generate Download Links', {fontWeight: '450', fontSize: '16px',height: '29px',margin: '15px 1px 1px 10px'});
panel2download.add(label4download);
var panel_checkbox3download=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('vertical')});
panel2download.add(panel_checkbox3download);
var panel_checkbox2download=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('vertical')});
panel2download.add(panel_checkbox2download);
var checkbox3download=ui.Checkbox({label: 'Basin Time-series',value: false, 
    onChange: function(checked) {
    if(checked===true){
      if (layer <= 1 || layer == 4){
        csvname= nameprefix + '_' + aoiname;
      }
      var download_csv_label = ui.Label({ value : csvname, style : { shown:true,margin: '5px 1px 1px 26px'},
          targetUrl : AoiMean.getDownloadURL({format: 'csv', filename :csvname})} );
        panel_checkbox3download.add(download_csv_label);
    } else {
      panel_checkbox3download.remove(panel_checkbox3download.widgets().get(1));
    }
    }});
panel_checkbox3download.add(checkbox3download);
checkbox2download=ui.Checkbox({label: 'Basin Maps',value: false, 
    //style: {fontWeight: '450', fontSize: '16px',height: '29px',margin: '15px 1px 1px 10px'},
    onChange: function(checked) {
    if(checked===true){
      panel_checkbox2download.add(message);
      downloaddata(); //uiMap.unlisten(mapclick);
    } else {
      panel_checkbox2download.clear();
      panel_checkbox2download.add(checkbox2download);
      /*panel_checkbox2download.remove(message);
      var zIndex = panel_checkbox2download.widgets().length();
      for (var i=zIndex-1; i>0; i--) {
        panel_checkbox2download.remove(panel_checkbox2download.widgets().get(i));
      }*/
    }
    }});
panel_checkbox2download.add(checkbox2download);
//Download Option: click on the map to select tiles for download
var mapname; var csvname;
var downloaddata=function(){
  var gridsize=500;
  var tilesize=ee.Number(10000).multiply(ee.Number(gridsize)).divide(111000).multiply(0.10);///Total request size must be less than or equal to 33554432 bytes
  var stateGrid = ee.FeatureCollection(functions4cropmapper.coverByGrid(aoi,tilesize, tilesize));//0.89° ~=100'000 m ~= 10000x10000 pixels (10m)
  print('stateGrid',stateGrid);
  var isregion = stateGrid/*.filterBounds(pointd)*/.size();
  isregion.evaluate(function(result) {
    panel_checkbox2download.remove(message);
    var mapname0 = mapname;
    for (var i=0; i<result; i++) {
      print('i',i);
      var downloadregion=ee.Feature(stateGrid.toList(99).get(i));
      var region = batch.getRegion(downloadregion.geometry());
      if (layer <= 1 || layer == 4){
        mapname= nameprefix + '_' + aoiname + '_' + mm_yyyy;
        if (result>1){
          mapname= nameprefix + '_' + aoiname + '_' + mm_yyyy + '_tile' + i;
        }
      } else if (result>1){
        mapname = mapname0  + '_tile' + i;
      }
      print('mapname',mapname);
      var download_tif_label = ui.Label({ value : mapname, style : { shown:true,margin: '5px 1px 1px 26px'},
        targetUrl : map2download.clip(aoi).toInt16().getDownloadURL({scale: 500, region: region, name :mapname})} );
      panel_checkbox2download.add(download_tif_label);
    } //else {print('check2')}
  });
};
//Year selection
var firstDayNoSnowYear;
var years_select = ui.Select({style:{width: '200px',height: '29px',margin: '2px 1px 1px 10px'},
    items: [ 
     ],
    onChange: function(key){
      var year = key;
      // Subset the year of interest.
      firstDayNoSnowYear = annualCol.filter(ee.Filter.eq('year', key)).first();//.clipToCollection(RiverBasins);
      map2download = ee.Image(firstDayNoSnowYear).select('value');
      // Map it.
      uiMap.layers().set(0,ui.Map.Layer(firstDayNoSnowYear, visArgs_single, 'First day of no snow'));
      //add legend
      if (layer_active===0){
        uiMap.add(legend);
        uiMap.remove(sliderPanel);
        uiMap.add(sliderPanel);
      }
      layer_active=1;
      /*selectionPanel.widgets().set(6,ui.Label());
      selectionPanel.remove(panel2download);
      selectionPanel.widgets().set(6,panel2download);*/
      panel2download.remove(panel_checkbox2download);
      checkbox2download.setValue(false,false);
      panel2download.add(panel_checkbox2download);
      mapname= nameprefix + '_' + aoiname + '_Year' + year;
      //chartpanel2.clear();
      var zIndex = uiMap.layers().length();
      for (var i=zIndex-1; i>3; i--) {
        uiMap.remove(uiMap.layers().get(i));
      }
    }
});
//AoI selection
var region_list=ee.Dictionary.fromLists(region_names.distinct(), region_names.distinct()).keys().getInfo();
print('region_list',region_list);
var region; var aoiname; var aoi; var regionname='...'; var new_catchment_names;
var aoi_select_region = ui.Select({style:{fontWeight: '450', fontSize: '16px',width: '200px',height: '29px',margin: '15px 1px 1px 10px'}, 
    items: region_list,
    onChange: function(key){
      chartpanel2.clear();
      regionname=key;
      aoi_select_subbasin.setValue(null,false);
      aoi_selected=0; basin_selected=null;
      aoi_select_subbasin.setPlaceholder('Select a River Basin...');
      if (key == '...'){
        aoi_select_subbasin.items().reset(subbasin_list);
        aoi_select_region.setPlaceholder('Select a Region...');
        uiMap.unlisten(mapclick);
        //uiMap.remove(dateslider);
        task_click1(selected_ic);
        //clean up: remove widgets and layers
        var zIndex = selectionPanel.widgets().length();
        for (var i=zIndex-1; i>3; i--) {
          selectionPanel.remove(selectionPanel.widgets().get(i));
        }
        chartpanel1.clear();chartpanel2.clear();
        zIndex = uiMap.layers().length();
        for (i=zIndex-1; i>1; i--) {
          uiMap.remove(uiMap.layers().get(i));
        }
        //checkbox2download.setValue(false);
        aoi_select_region.setValue(null,false);
        uiMap.centerObject(RiverBasinsExtent);        
      } else {
        aoi=ee.Feature(Regions_2023.filter(ee.Filter.eq('REGION', key)).first()).geometry();
        aoiname=key.replace(" ","",'g');
        layerGeometry = ui.Map.Layer( ee.Image().paint(Regions_2023.filter(ee.Filter.eq('REGION', key)),0, 2), {palette: 'yellow'},'Area of Interest');
        uiMap.layers().set(2,  layerGeometry );        
        basin_selection(key);
        new_catchment_names=RiverBasins_2023.filter(ee.Filter.eq('REGION', key)).aggregate_array('NAME');
        var tmp_catchment_names = ee.List(['...']).cat(new_catchment_names);
        var  new_subbasin_list=ee.Dictionary.fromLists(tmp_catchment_names.distinct(), tmp_catchment_names.distinct()).keys();//.getInfo();
        aoi_select_subbasin.setPlaceholder('Please wait...');
        aoi_select_subbasin.setDisabled(true);
        new_subbasin_list.evaluate(function(result){
          aoi_select_subbasin.items().reset(result);
          aoi_select_subbasin.setDisabled(false);
          aoi_select_subbasin.setPlaceholder('Select a River Basin...');
        });
      }
    }
}).setPlaceholder('Select a Region...');
var subbasin_list=ee.Dictionary.fromLists(catchment_names.distinct(), catchment_names.distinct()).keys().getInfo();
var aoi_selected=0; var basin_selected;
var aoi_select_subbasin = ui.Select({style:{fontWeight: '450', fontSize: '16px',width: '200px',height: '29px',margin: '15px 1px 1px 10px'}, 
    items: subbasin_list,
    onChange: function(key){
      chartpanel2.clear();
      if (key == '...'){
        if(aoi_selected==1){
          aoi_select_region.setValue(null,false);
        }
        aoi_select_region.setValue(regionname);
        aoi_selected=0; basin_selected=null;
      } else {
        aoi_selected=1; basin_selected=key;
        aoi=ee.Feature(RiverBasins_2023.filter(ee.Filter.eq('NAME', key)).first()).geometry();
        aoiname=key.replace(" ","",'g');
        layerGeometry = ui.Map.Layer( ee.Image().paint(RiverBasins_2023.filter(ee.Filter.eq('NAME', key)),0, 2), {palette: 'yellow'},'Area of Interest');
        uiMap.layers().set(2,  layerGeometry );      
        basin_selection(key);
      }
    }
}).setPlaceholder('Select a River Basin...');
var basin_selection = function(key){
      // zoom to selected AoI
      uiMap.centerObject(aoi);
      //calculate annual mean DOY of AOI.
      if (layer<=1 || layer == 4 ){//Monthly layers
        AoiMean = ee.FeatureCollection(get_AoiMean_sample(aoi,selected_ic,ee.Reducer.mean(),8));
      } else {//ANNUAL layers
        AoiMean = ee.FeatureCollection(get_AoiMean(aoi,selected_ic,ee.Reducer.mean(),8));
      }
        print('AoiMean',AoiMean);
      // Get chart and print chart to console.
      var chart=get_chart(AoiMean);
      chartpanel1.widgets().set(0,chart);
      //clean up: remove widgets and layers
      var zIndex = selectionPanel.widgets().length();
      for (var i=zIndex-1; i>3; i--) {
        selectionPanel.remove(selectionPanel.widgets().get(i));
      }
      //chartpanel2.clear();
      zIndex = uiMap.layers().length();
      for (i=zIndex-1; i>2; i--) {
        uiMap.remove(uiMap.layers().get(i));
      }
      checkbox2download.setValue(false);
      checkbox3download.setValue(false);
      panel2download.remove(panel_checkbox2download);//maps will be available for download after year selection
      //Select a year for vizualization
      if (layer === 2){
        uiMap.layers().set(0,ui.Map.Layer(d,null,'River Basins'));//placeholder
        selectionPanel.widgets().set(4,ui.Label('Select a Year', {fontWeight: '450', fontSize: '16px',height: '29px',margin: '15px 1px 1px 10px'}));
        years_select.items().reset(year_list_client);
        years_select.setValue(null,false);
        selectionPanel.widgets().set(5,years_select);
        selectionPanel.widgets().set(6,panel2download);
        csvname= nameprefix + '_' + aoiname;
      } else if (layer == 3){
        selectionPanel.widgets().set(4,panel2download);
        mapname= nameprefix + '_' + aoiname + '_TREND';
        csvname=nameprefix + '_' + aoiname;
        panel2download.add(panel_checkbox2download);
      } else if (layer <= 1 || layer == 4){
        selectionPanel.widgets().set(4,panel2download);
        mapname= nameprefix + '_' + aoiname;
        csvname=mapname;
        panel2download.add(panel_checkbox2download);
      }
      //download map
};
//Add UI elements to selection panel.
var panel_layers=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('horizontal')});
var panel_layer_selection=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('vertical')});
var panel_layer_details=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('vertical')});
panel_layer_selection.add(ui.Label('Select a Layer', {fontWeight: '450', fontSize: '16px',height: '29px',margin: '15px 1px 1px 10px'}));
panel_layer_selection.add(layer_select);
panel_layer_details.add(ui.Label('Layer Details', {fontWeight: '450', fontSize: '12px',height: '20px',color: 'red',margin: '10px 1px 1px 10px'}));
panel_layer_details.add(ui.Label('Source:', {fontSize: '12px',color: 'red',margin: '1px 1px 1px 10px'}));
panel_layer_details.add(ui.Label('Spatial Resolution:', {fontSize: '12px',color: 'red',margin: '1px 1px 1px 10px'}));
panel_layer_details.add(ui.Label('Download Time-Series:', {fontSize: '12px',color: 'red',margin: '1px 1px 1px 10px'}));
panel_layers.add(panel_layer_selection);
panel_layers.add(panel_layer_details);
selectionPanel.add(ui.Label('USER INPUTS', {fontWeight: '600', fontSize: '16px',height: '29px',margin: '15px 1px 1px 10px'}));
selectionPanel.add(panel_layers);
var panel_basin_selection=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('horizontal')});
var panel_rb_selection=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('vertical')});
var panel_sub_selection=ui.Panel({widgets: [],layout: ui.Panel.Layout.flow('vertical')});
panel_rb_selection.add(ui.Label('Select a Region', {fontWeight: '450', fontSize: '16px',height: '29px',margin: '15px 1px 1px 10px'}));
panel_sub_selection.add(ui.Label('Select a River Basin', {fontWeight: '450', fontSize: '16px',height: '29px',margin: '15px 1px 1px 10px'}));
panel_rb_selection.add(aoi_select_region);
panel_sub_selection.add(aoi_select_subbasin);
panel_basin_selection.add(panel_rb_selection).add(panel_sub_selection);
selectionPanel.add(panel_basin_selection);
selectionPanel.add(chartpanel);
layer_select.setValue(2);//start with Option 2