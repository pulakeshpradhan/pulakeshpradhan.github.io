var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": 0.8122547084057977,
        "max": 0.8508844850359277,
        "palette": [
          "cfff70",
          "2c9700"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":0.8122547084057977,"max":0.8508844850359277,"palette":["cfff70","2c9700"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.052878229842648,
                7.692699237272907
              ],
              [
                28.052878229842648,
                -9.29383927999116
              ],
              [
                41.19252666734265,
                -9.29383927999116
              ],
              [
                41.19252666734265,
                7.692699237272907
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
      "color": "#f3f3f3",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f3f3f3 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[28.052878229842648, 7.692699237272907],
          [28.052878229842648, -9.29383927999116],
          [41.19252666734265, -9.29383927999116],
          [41.19252666734265, 7.692699237272907]]], null, false);
Map.setOptions('SATELLITE');
Map.centerObject(geometry,6)
//Create pannel to arrage the widgets
var panel = ui.Panel({style:{position:'bottom-left', width: '400px', border: '1px solid black'}})
              .add(ui.Label(
                {
                  value: 'Automatic Forest Mask Generator Tool',
                  style: {fontWeight: 'bold', fontSize:'24px', margin: '10px 5px', color: 'green'}
                }))
              .add(ui.Label('This app allows you to automatically generate yearly (1990-2020) treecover' +
              'Using using timeseries data form the Landsat collection'));
var country_selection = ui.Select({
  items:[
    {label: 'Kenya', value: 'Kenya'},
    {label: 'Uganda', value: 'Uganda'},
    {label: 'Tanzania', value: 'Tanzania'},
    {label: 'Rwanda', value: 'Rwanda'},
    {label: 'Ethiopia', value: 'Ethiopia'}],
  value: 'Kenya',
  onChange: function(value){
    var country_name = value;
  }})
panel.add(ui.Label('1)Select Country:', {fontWeight: 'bold'})).add(country_selection);
// var panel = ui.Panel({
//   style:{
//     position: 'bottom-left',
//     width: '400px', 
//     border: '1px solid black'
//   }
//   }).add(ui.Label({
//   value: 'Forest Mask Year 1990-2020',
//   style: {fontWeight: 'bold', fontSize:'24px', margin: '10px 5px', color: 'red'}
//   }))
var yearSlider = ui.Slider({
  min: 1990,
  max: 2020,
  value: 2015,
  step: 1,
  onChange: function(value){
    var new_value = value
    return new_value
  },
  style: {
    width: '300px',
  }
})
panel.add(ui.Label('2)Move slider to select year:', {fontWeight: 'bold'})).add(yearSlider);
var canopySlider = ui.Slider({
  min: 10,
  max: 100,
  value: 70,
  step: 10,
  onChange: function(value){
    var new_value = value
    return new_value
  },
  style: {
    width: '300px',
  }
})
panel.add(ui.Label('3)Slide to set the Hansen canopy cover:', {fontWeight: 'bold'})).add(canopySlider);
panel.add(ui.Label('NOTE: Tree canopy cover for selected year is defined as canopy closure for all vegetation taller than 5m in height.', {fontSize: '12px', color:'gray'}));
var vegIndex_threshold = ui.Slider({
  min: 0.5,
  max: 1,
  value: 0.75,
  step: 0.05,
  onChange: function(value){
    var new_value = value
    return new_value
  },
  style: {
    width: '300px',
  }
})
panel.add(ui.Label('3)Slide to set the tree cover threshold for computed Index:', {fontWeight: 'bold'})).add(vegIndex_threshold);
panel.add(ui.Label('NOTE: Values above the threshold are considered as tree cover.', {fontSize: '12px', color:'gray'}));
Map.add(panel)
var AddButton = function(){
      var button = ui.Button('Get Mask');
      button.style().set({
        //position: 'top-center',
        border : '1px solid #000000',
      });
      button.onClick(function(){return run()});
      panel.add(button);
}
AddButton();
function run(){
  Map.clear()
  Map.add(panel)
  var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
  style: {
    position: 'bottom-center',
    width: '300px',
  }
  });
  opacitySlider.onSlide(function(value) {
    Map.layers().forEach(function(element, index) {
      element.setOpacity(value);
    });
  });
  Map.setOptions('SATELLITE');
  Map.add(opacitySlider)
  var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
  var country = country_selection.getValue();
  var studyarea = countries.filter(ee.Filter.eq('country_na',country ))
  Map.centerObject(studyarea, 8);
  var threshold = vegIndex_threshold.getValue();
  //===============================Landsat forest mask 1990-2020 ======================================================================//
  // Required Data Inputs 
  // ===================
  // * USGS/NASA's Landsat 4 surface reflectance tier 1 dataset (August 1982 - December 1993)
  // * USGS/NASA's Landsat 5 surface reflectance tier 1 dataset (January 1, 1984 - May 5, 2012)
  // * USGS/NASA's Landsat 7 surface reflectance tier 1 dataset (January 1, 1999 - December 31, 2019)
  // * USGS/NASA's Landsat 8 surface reflectance tier 1 dataset (April 11, 2013 - December 31, 2019)
  // * Study Area Polygon
  var Year = yearSlider.getValue()
  //print(Year)
  //var Year='2015'
  var ALGO = "MEDIAN"; // PERCENTILE75  // PERCENTILE65 // PERCENTILE60 // MEDIAN
  var cloudCoveragePercentage = 80;
  //Map.addLayer(studyarea);
  var start_date = Year+ '-01-01';
  var end_date   = Year+ '-12-31';
  //--------------------------------------------------------------------
  //       Landsat 4, 5, 7 cloudmask
  //--------------------------------------------------------------------
      // If the cloud bit (5) is set and the cloud confidence (7) is high
      // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloudMaskL7 = function(image) {
    var qa = image.select('pixel_qa');
    var cloud = qa.bitwiseAnd(1 << 5)
                    .and(qa.bitwiseAnd(1 << 7))
                    .or(qa.bitwiseAnd(1 << 3));
      // Remove edge pixels that don't occur in all bands
    //var mask2 = image.mask().reduce(ee.Reducer.min())//.focal_min(300,'square','meters').eq(0);
    //var mask2 = image.select('B4').reduce(ee.Reducer.min()).gt(0)//.focal_min(500,'square','meters');
    // Remove edge pixels that don't occur in all bands
    var mask3 =  
                (image.select('B3').gt(100))
                .and(image.select('B4').gt(100))
                .and(image.select('B4').lt(10000))
                .and(image.select('B3').lt(10000))
    return image.updateMask(cloud.not()).updateMask(mask3)//.updateMask(mask2)//.clip(image.geometry().buffer(-5000))//.or(mask3));
  };
  var cloudMaskL45 = function(image) {
    var qa = image.select('pixel_qa');
    var cloud = qa.bitwiseAnd(1 << 5)
                    .and(qa.bitwiseAnd(1 << 7))
                    .or(qa.bitwiseAnd(1 << 3));
    // Remove edge pixels that don't occur in all bands
    //var mask2 = image.mask().reduce(ee.Reducer.min());
      var mask2 =  
                (image.select('B3').gt(100))
                .and(image.select('B4').gt(100))
                .and(image.select('B4').lt(10000))
                .and(image.select('B3').lt(10000))
    return (image.updateMask(cloud.not()).updateMask(mask2))//.clip(image.geometry().buffer(-5000))//.updateMask(mask2);
  };
  //--------------------------------------------------------------------
  //         Landsat 8 cloudmask
  //--------------------------------------------------------------------
      // Bits 3 and 5 are cloud shadow and cloud, respectively.
  function maskL8sr(image) {
    var cloudShadowBitMask = (1 << 3);
    var cloudsBitMask = (1 << 5);
      // Get the pixel QA band.
    var qa = image.select('pixel_qa');
      // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                   .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    var mask2 =  
                (image.select('B5').gt(100))
                .and(image.select('B4').gt(100))
                .and(image.select('B5').lt(10000))
                .and(image.select('B4').lt(10000))
     //var mask2 = image.mask().reduce(ee.Reducer.min()).focal_min(500,'square','meters');
    //return image
    return image.updateMask(mask).updateMask(mask2)//.clip(image.geometry().buffer(-5000));
  }
      // Apply Cloudmask to L4.5.7
  var L4 = ee.ImageCollection("LANDSAT/LT04/C01/T1_SR")
                    .filterDate(start_date, end_date)
                    .filter(ee.Filter.lessThan('CLOUD_COVER_LAND', cloudCoveragePercentage))
                    .filterBounds(studyarea)
                    .map(cloudMaskL45)
                    .select(['B3', 'B4'], ['RED', 'NIR']);;
  var L5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
                    .filterDate(start_date, end_date)
                    .filter(ee.Filter.lessThan('CLOUD_COVER_LAND', cloudCoveragePercentage))
                    .filterBounds(studyarea)
                    .map(cloudMaskL45)
                    .select(['B3', 'B4'], ['RED', 'NIR']);;
  var L7a = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
                    .filterDate('1999-01-01', '2003-04-01')
                    .filterDate(start_date, end_date)
                    .filter(ee.Filter.lessThan('CLOUD_COVER_LAND', 100))
                    .filterBounds(studyarea)
                    .map(cloudMaskL7)
                    .select(['B3', 'B4'], ['RED', 'NIR']);;
  var L7b = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
                    .filterDate('2012-01-01', '2013-12-31')
                    .filterDate(start_date, end_date)
                    .filter(ee.Filter.lessThan('CLOUD_COVER_LAND', 100))
                    .filterBounds(studyarea)
                    .map(cloudMaskL7)
                    .select(['B3', 'B4'], ['RED', 'NIR']);;
  var L7 = L7a.merge(L7b);
  var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                    .filterDate(start_date, end_date)
                    .filter(ee.Filter.lessThan('CLOUD_COVER', cloudCoveragePercentage))
                    .filterBounds(studyarea)
                    //.filterBounds(AOI)
                    .map(maskL8sr)
                    .select(['B4', 'B5'], ['RED', 'NIR']);
      //Define collection
  //--------------------------------------------------------------------
  // Merge Landsat 4, 5, 8 imagery collections and filter all by date/place
  //--------------------------------------------------------------------
  //Merge Landsat 4, 5 , 7 '
  var L4578 = L4.merge(L5).merge(L7).merge(L8);
  //--------------------------------------------------------------------
  //                     Create NDVI Collection 
  //--------------------------------------------------------------------
  var NDVI = function(image) {
    return image.normalizedDifference(['NIR', 'RED']).rename('NDVI');
    //return image.addBands(ndvi);
  };
  var MSAVI = function(image){
    return image.expression('(2 * nir + 1 - ( (2 * nir + 1)**2 - 8 * (nir -red) )**(1/2) ) / 2',{
              'nir':image.select('NIR'),
              'red':image.select('RED')
            })
  };
  if (ALGO=='MEDIAN'){
      var suffix = 'median'; 
      var annualNDVI = L4578.map(NDVI).median().clip(studyarea);
      var annualMSAVI = L4578.map(MSAVI).median().clip(studyarea);
  }
  if (ALGO=='PERCENTILE75'){
      var suffix = '75pc'; 
      var annualNDVI = L4578.map(NDVI).reduce(ee.Reducer.percentile([75])).clip(studyarea);
      var annualMSAVI = L4578.map(MSAVI).reduce(ee.Reducer.percentile([75])).clip(studyarea);
  }
  if (ALGO=='PERCENTILE65'){
      var suffix = '65pc'; 
      var annualNDVI = L4578.map(NDVI).reduce(ee.Reducer.percentile([65])).clip(studyarea);
      var annualMSAVI = L4578.map(MSAVI).reduce(ee.Reducer.percentile([65])).clip(studyarea);
  }
  var ndvi_visualization = {
    min: -0.22789797020331423, 
    max: 0.6575894075894075,
    palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
      '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'
  };
  var msavi_viz = {
    min:0.8122547084057977,
    max:0.8508844850359277,
    palette:["cfff70","2c9700"]
  };
  var Landsat_mask = annualNDVI.updateMask(annualNDVI.gt(threshold))
  var Landsat_MSAVI_mask = annualMSAVI.updateMask(annualNDVI.gt(threshold))
  // Map.addLayer(annualNDVI, ndvi_visualization, 'NDVI');
  Map.addLayer(Landsat_mask, imageVisParam, 'NDVI_forestMask '+ Year);
  Map.addLayer(Landsat_MSAVI_mask, msavi_viz, 'MSAVI_forestMask '+ Year);
  //Map.addLayer(L4578,{},'Landsat')
  //--------------------------------------------------------------------
  //       Export as GeoTIFF
  //--------------------------------------------------------------------
  Export.image.toDrive({
    image: annualNDVI,
    description: country + '_NDVI_' + suffix + '_' + Year,
    scale: 30,
    region: studyarea,
    maxPixels:  1e13,
    fileFormat: 'GeoTIFF',
    folder:'GEE_classification',
    formatOptions: {
    cloudOptimized: true
     },
    skipEmptyTiles: true
  });
  //===============================hansen forest mask 2012 - 2020 ========================================================================//
 var hansen_treecover = canopySlider.getValue();
 if (Year === 2018){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2018_v1_6"); // Hansen map 2018
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clipToCollection(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2018',false);
    }
    if (Year === 2017){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2017_v1_5"); // Hansen map 2017
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clipToCollection(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2017',false);
    }
    if (Year === 2016){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2016_v1_4"); // Hansen map 2016
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clipToCollection(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2016',false);
    }
    if (Year === 2015){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2015_v1_3"); // Hansen map 2015
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clipToCollection(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2015',false);
    }
    if (Year === 2014){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2015"); // Hansen map 2014
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clipToCollection(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2014',false);
    }
    if (Year === 2013){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2014"); // Hansen map 2013
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clipToCollection(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2013',false);
    }
    if (Year === 2012){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2013"); // Hansen map 2012
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clipToCollection(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2012',false);
    }
}