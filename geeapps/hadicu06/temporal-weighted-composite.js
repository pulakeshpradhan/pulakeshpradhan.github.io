//////////////////////////////////////////////////////
// UI to create composites of different time intervals
// for choosing best compositing period or descriptive statistics
// for different land cover classes or/and geographical areas
// Author: Hadi; Olha Danylo
////////////////////////////////////////////////////////
// Aha, alternatively, can do weighted reductions
// weighted = ndvi.reduceRegion(reducer.splitWeights(), region, 30);
// see https://developers.google.com/earth-engine/reducers_weighting
// see groups.google.com/forum/#!searchin/google-earth-engine-developers/reducer.splitWeights()%7Csort:date/google-earth-engine-developers/bqs_7COZGCs/gi_cVlAOAgAJ
// If you do ee.Reducer.mean().splitWeights().repeat(nBands) you'll need interleaved weights.
// If you do ee.Reducer.mean().repeat(nBands).splitWeights() you'll need all the weights at the end.
/*
// To do: add province selector
*/
////////// IMPORT UTILS ////////////////////////////
var utils = require('users/hadicu06/IIASA:utils');
//////////// IMPORT ASSETS ///////////////////////
var country = ee.FeatureCollection("USDOS/LSIB/2013");
// GADM Level 1 - province
var provinces = ee.FeatureCollection("users/hadicu06/IIASA/gadm36_IDN_1");
////////////// INITIALIZE VALUES ////////////////////////
var AOI1 = ee.Geometry.Point([108.94255240886832,  -6.845394023614906])
var AOI2 = ee.Geometry.Point([139.5476, -7.83459])
var provname = "Bangka Belitung"
//////////////// INPUT PANEL ///////////////////////////////////////
// Un-used, fix to all data for the year 2018
/*
var uiStartDate = ui.Textbox({
  value: '2018-01-01',
  onChange: function(text) {
    var filledStartDate = text
  },
  style: {
    'position': 'top-left'
  }
})
///////////////////////////////////////
var uiEndDate = ui.Textbox({
  value: '2018-12-31',
  onChange: function(text) {
     var filledEndDate = text
  },
  style: {
    'position': 'top-left'
  }
})
*/
//////////////////////////////////////////////
// Submit button
var uiSubmit = ui.Button({
  label: 'Run with geometry', 
  onClick: function() {
    submit()
  }
})
/*
var uiSubmitWeights = ui.Button({label: "Run mean with weights",
  onClick: function() {
    submit()
  }
})
*/
var monthNames = ["January", "February", "March   ", "April   ", "May    ", "June   ", "July   ", "August",
                  "September", "October", "November", "December"]  
var uiMonthWeights = ui.Panel()
for (var i = 0; i < monthNames.length; i++){
    var monthName_i = monthNames[i];
  var textboxMonthWeight_i = ui.Textbox({
    value: "1",
    style: {width: '100px'}
  });
    uiMonthWeights.add(ui.Panel([ui.Label(monthName_i), textboxMonthWeight_i], ui.Panel.Layout.Flow('horizontal')));
}
////////////////////////////////////////////////
// Placeholder to print info about composite by the user
var uiLL = ui.Label();
var uiUR = ui.Label();
var uiWeights = ui.Label();
var uiReturnInfo = ui.Panel().add(uiLL).add(uiUR).add(uiWeights)
//////////////////////////////////////////////////////////////////////////////////////// 
// UI to select province
/*
var provSelectUi = ui.Select({
  items: [{label: 'Aceh', value: 'Aceh'}, {label: 'Bali', value: 'Bali'}, {label: 'Bangka Belitung', value: 'Bangka Belitung'},
          {label: 'Banten', value: 'Banten'}, {label: 'Bengkulu', value: 'Bengkulu'}, {label: 'Gorontalo', value: 'Gorontalo'},
          {label: 'Jakarta Raya', value: 'Jakarta Raya'}, {label: 'Jambi', value: 'Jambi'}, {label: 'Jawa Barat', value: 'Jawa Barat'},
          {label: 'Jawa Tengah', value: 'Jawa Tengah'}, {label: 'Jawa Timur', value: 'Jawa Timur'}, {label: 'Kalimantan Barat', value: 'Kalimantan Barat'},
          {label: 'Kalimantan Selatan', value: 'Kalimantan Selatan'}, {label: 'Kalimantan Tengah', value: 'Kalimantan Tengah'}, {label: 'Kalimantan Timur', value: 'Kalimantan Timur'},
          {label: 'Kepulauan Riau', value: 'Kepulauan Riau'}, {label: 'Lampung', value: 'Lampung'}, {label: 'Maluku', value: 'Maluku'},
          {label: 'Maluku Utara', value: 'Maluku Utara'}, {label: 'Nusa Tenggara Barat', value: 'Nusa Tenggara Barat'}, {label: 'Nusa Tenggara Timur', value: 'Nusa Tenggara Timur'},
          {label: 'Papua', value: 'Papua'}, {label: 'Papua Barat', value: 'Papua Barat'}, {label: 'Riau', value: 'Riau'},
          {label: 'Sulawesi Barat', value: 'Sulawesi Barat'}, {label: 'Sulawesi Selatan', value: 'Sulawesi Selatan'}, {label: 'Sulawesi Tengah', value: 'Sulawesi Tengah'},
          {label: 'Sulawesi Tenggara', value: 'Sulawesi Tenggara'}, {label: 'Sulawesi Utara', value: 'Sulawesi Utara'}, {label: 'Sumatera Barat', value: 'Sumatera Barat'},
          {label: 'Sumatera Selatan', value: 'Sumatera Selatan'}, {label: 'Sumatera Utara', value: 'Sumatera Utara'}, {label: 'Yogyakarta', value: 'Yogyakarta'}],
  value: 'Bangka Belitung',
  style: {width: '200px', position: 'top-right'},
  onChange: function(value) {
    var provSelect = value;
    print('provSelect', provSelect);
  }
});
var provSelectButtonUi = ui.Button({
  label: "Zoom to", 
  onClick: zoomToProv(), 
  style: {width: '100px', position: 'top-right'}
})
*/
/////////////////////////////
// Put into a panel
var inputPanel = ui.Panel({
  widgets: [ui.Label('User inputs'),
            /*
            ui.Label('Fill start date'),
            uiStartDate,
            ui.Label('Fill end date'),
            uiEndDate,
            */
            //ui.Label('Select province to zoom to'),
            //provSelectUi,
            //provSelectButtonUi,
            ui.Label('Weights for months:'),
            uiMonthWeights,
            //ui.Label('Submit with weights')
            //uiSubmitWeights,
            ui.Label('Submit'),
            uiSubmit,
            ui.Label('Bounding Box AOI:'),
            uiReturnInfo
            ],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    height: '100%',
    width: '15%'
  }
})
//////////////////// MAP WIDGET ////////////////////////////
var map1 = ui.Map();
map1.style().set('cursor', 'crosshair');
map1.add(ui.Label('Median Composite'));
var map2 = ui.Map();
map2.style().set('cursor', 'crosshair');
map2.add(ui.Label('Greenest Pixel Composite; Time-Weighted Composite'));
// Link the two maps.
var linker = ui.Map.Linker([map1, map2]);
// Make a split map.
var splitMap = ui.SplitPanel({
  firstPanel: map1,  
  secondPanel: map2, 
  wipe: true});
/*  
var panel1 = ui.Panel({widgets: [ui.Label('Click on the map to see a time series chart.')]});
var mapPanel = ui.SplitPanel({
  firstPanel: ui.Panel([splitMap]),  
  secondPanel: panel1,  
  orientation: "vertical", 
  wipe: false});
*/
var mapPanel = splitMap;
// Initialize maps
//map1.centerObject(AOI1, 15);
map1.centerObject(AOI2, 15)
map1.setOptions('SATELLITE');
map2.setOptions('SATELLITE')
// Function for button "Zoom to" province. Need map1 defined.
/*
function zoomToProv () {
   var provname = "Bangka Belitung";
   var provname = provSelectUi.getValue();
   var selectProv = provinces.filter(ee.Filter.eq('NAME_1', provname)); // or .filterMetadata('cc','equals',countryname)
   map1.centerObject(selectProv);
}
*/
///////////////// SET UI.ROOT ////////////////////
ui.root.clear()
//ui.root.widgets().reset([inputPanel, splitPanel]);
ui.root.add(inputPanel)
ui.root.add(mapPanel)
//////////////// Constants ////////////////
var RGB_VIS = {min: 0, max: 3000, gamma: 1.5, bands: ['red', 'green', 'blue']}
var FCC_VIS = {min: [0,0,0], max: [3000,5000,1500], gamma: [1.5,1.5,1.5], bands: ['swir1', 'nir', 'red']}
//////////////////// Show classified map ////////////////////////
var classified = ee.Image("users/hadicu06/IIASA/classified/new/clsfd_2018_tr10_noFrcTxt_100m_dirRpL2_trAgrMny_balSmp_500PrCl_35334741aa291fcbec9613524862b793_cl2")
//******************************************************************************************
// For map visualization
//******************************************************************************************
//////////////////////////////////////////////////////////////////
// Legend for R+ classes (16)
/*
var lcPalette = ["#a6cee3",    // 0
                  "#1f78b4",   // 1
                  "#b2df8a",   // 2
                  "#33a02c",   // 3
                  "#fb9a99",   // 4
                  "#e31a1c",   // 5
                  "#fdbf6f",   // 6
                  "#ff7f00",   // 7
                  "#cab2d6",   // 8
                  "#6a3d9a",   // 9
                  "#ffff99",   // 10
                  "#b15928",   // 11
                  "#8dd3c7",   // 12
                  "#ffffb3",   // 13
                  "#bebada",   // 14
                  "#fb8072",   // 15
                  "#252525"    // 16
                  ];  
*/
// Geowiki palette (more closely resembles MOEF)                  
var lcPalette = ["#60E663",    // 0
                  "#72FF00",   // 1
                  "#8EA704",   // 2
                  "#C1A700",   // 3
                  "#93AB2B",   // 4
                  "#D3FFBE",   // 5
                  "#EDF500",   // 6
                  "#D3E598",   // 7
                  "#6600CC",   // 8
                  "#AD3FFF",   // 9
                  "#FFD2FF",   // 10
                  "#D5FF02",   // 11
                  "#EBC0A7",   // 12
                  "#A8D6FF",   // 13
                  "#FFD37F",   // 14
                  "#D60073",   // 15
                  "#D4FCF7"    // 16
                  ];  
var lcClasses = {
  '0: Undisturbed lowland forest; Undisturbed highland forest': 0,
  '1: Logged-over lowland forest; Logged-over highland forest': 1, 
  '2: Undisturbed mangrove': 2,
  '3: Logged-over mangrove': 3,
  '4: Undisturbed swamp forest': 4,
  '5: Logged-over swamp forest': 5,
  '6: Agroforestry': 6, 
  '7: Plantation forest': 7,
  '8: Rubber monoculture': 8,
  '9: Oil palm monoculture': 9,
  '10: Other monoculture': 10,
  '11: Grass/savanna': 11,
  '12: Shrub': 12,
  '13: Cropland': 13,
  '14: Settlement': 14, 
  '15: Cleared land': 15, 
  '16: Waterbody': 16,
};
// Make land cover legend
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var legendMaps = ui.Panel({style: {shown: true, width: '250px'}});
legendMaps.style().set({position: 'top-left'});
legendMaps.add(ui.Label('R+ classes', {fontWeight: 'bold', fontSize: '18px'}));
legendMaps.add(makeRow('#60E663', '0: Undisturbed dry-land forest'))
legendMaps.add(makeRow('#72FF00', '1: Logged-over dry-land forest'))
legendMaps.add(makeRow('#8EA704', '2: Undisturbed mangrove'))
legendMaps.add(makeRow('#C1A700', '3: Logged-over mangrove'))
legendMaps.add(makeRow('#93AB2B', '4: Undisturbed swamp forest'))
legendMaps.add(makeRow('#D3FFBE', '5: Logged-over swamp forest'))
legendMaps.add(makeRow('#EDF500', '6: Agroforestry'))
legendMaps.add(makeRow('#D3E598', '7: Plantation forest'))
legendMaps.add(makeRow('#6600CC', '8: Rubber monoculture'))
legendMaps.add(makeRow('#AD3FFF', '9: Oil palm monoculture'))
legendMaps.add(makeRow('#FFD2FF', '10: Other monoculture'))
legendMaps.add(makeRow('#D5FF02', '11: Grass/savanna'))
legendMaps.add(makeRow('#EBC0A7', '12: Shrub'))
legendMaps.add(makeRow('#A8D6FF', '13: Cropland'))
legendMaps.add(makeRow('#FFD37F', '14: Settlement'))
legendMaps.add(makeRow('#D60073', '15: Cleared land'))
legendMaps.add(makeRow('#D4FCF7', '16: Waterbody'))
//map1.addLayer(classified, {min:0, max:16, palette: lcPalette}, "Classified map (2018)", true); 
//map1.add(legendMaps); 
///////////////////////// Make collection ////////////////////////
function submit() {
  var weights = []
    for (var i = 0; i < 12; i++) {
     weights.push(ee.Number.parse(uiMonthWeights.widgets().get(i).widgets().get(1).getValue()))
    }
  weights = ee.List(weights)
  var sum = ee.Number(0)
  for (var i = 0; i < 12; i++)
  {
    sum = sum.add(weights.get(i))
  }
  /*
  var res = ee.ImageCollection(ee.List.sequence(0,11,1).map(function(ft){
    var startDate = ee.Date.fromYMD(2018, ee.Number(ft).add(1), 1)
    var endDate = startDate.advance(1, "month")
    var collection = getLandsatData({
    startDate: startDate, 
    endDate: endDate
  }).median().multiply(ee.Image.constant(weights.get(ft)).float())
  return collection
  })).sum().divide(sum)
  print(res)
  */
  // Update: account for empty band image
  var res = ee.ImageCollection(ee.List.sequence(0,11,1).map(function(ft){
    var startDate = ee.Date.fromYMD(2018, ee.Number(ft).add(1), 1)
    var endDate = startDate.advance(1, "month")
    var collection = getLandsatData({
    startDate: startDate, 
    endDate: endDate
  }).median()//.multiply(ee.Image.constant(weights.get(ft)).float())
  collection = collection.set("numBands", collection.bandNames().length())
                         .set("month", ft)
                         .set("weight", weights.get(ft))
  return collection
  }))
  res = res.filterMetadata("numBands", "greater_than", 0)
  var sum = res.aggregate_sum("weight")
  res = res.map(function(im){
    var ft = im.get("month")
    return im.multiply(ee.Image.constant(im.get("weight")).float())
  }).sum().divide(ee.Image.constant(sum))
  //print(res)
  //var filledStartDate = uiStartDate.getValue();
  var filledStartDate = '2017-12-31'
  //var filledEndDate = uiEndDate.getValue()
  var filledEndDate = '2019-01-01'
  var collection = getLandsatData({
    startDate: filledStartDate, 
    endDate: filledEndDate
  })
  var with_ndvi =  collection.map(addNdvi) 
  //print('Number of images', with_ndvi.size())
  //print('Image collection', with_ndvi)
  var median_comp = with_ndvi.median()
  var greenest_comp = with_ndvi.qualityMosaic('ndvi');
  ///////////////// Add composite image to map /////////////////
  //map1.layers().set(1, dot1);
  map1.layers().set(0, ui.Map.Layer(median_comp, RGB_VIS, 'Median composite (RGB)'));   // 1
  map1.layers().set(1, ui.Map.Layer(median_comp, FCC_VIS, 'Median composite (FCC)'));   // 2
  map2.layers().set(0, ui.Map.Layer(greenest_comp, RGB_VIS, 'Greenest composite (RGB)'));
  map2.layers().set(1, ui.Map.Layer(greenest_comp, FCC_VIS, 'Greenest composite (FCC)'));
  map2.layers().set(2, ui.Map.Layer(res, RGB_VIS, 'Weighted composite (RGB)'));
  map2.layers().set(3, ui.Map.Layer(res, FCC_VIS, 'Weighted composite (FCC)'));
  ///////////////// Event handling to show time series at clicked location ////////////////
  /*
  var initTs = ui.Panel({
          style: {position: 'bottom-left', width: '400px', shown: false, margin: '0 0 0 0', padding: '0px'}  // shown: true
  });
  map1.add(initTs);
  var mapClicked = function(coords) {  
    var point = ee.Geometry.Point(coords.lon, coords.lat);  
    // Create a RGB spectrum chart.  
    var tsChart = ui.Chart.image.series(with_ndvi.select('ndvi'), point)
                  .setOptions({
                      title: 'Reflectance Over Time',        
                      vAxis: {title: 'NDVI'},        
                      hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
                      height: "100%",
                      series: {
                        0: {lineWidth: 0, pointSize: 3} // Observed
                      }
                   }); 
    tsChart.style().set({
       position: 'bottom-left',
       width: '400px',
       height: '200px',
       margin: '0px',
       padding: '0px'
    })
    panel1.clear();  
    panel1.widgets().set(1, tsChart);  
    //print('map1.widgets()', map1.widgets())
    //map1.widgets().insert(1, tsChart)
    // For now, just print ts in console
    //print('tsChart', tsChart);
    // Add a red dot for the point clicked on.
    var dot1 = ui.Map.Layer(point, {color: 'FF0000'});  
    map1.layers().set(1, dot1);  
    var dot2 = ui.Map.Layer(point, {color: 'FF0000'});  
    map2.layers().set(2, dot2);
  };
  map1.onClick(mapClicked);
  map2.onClick(mapClicked);
  */
  /////////////////////////////////////////////////////////////////////////////
  // Return info to share with others
  /////////////////////////////////////////////////////////////////////////////
   // a) Observed area bounding box
   var bound = map1.getBounds(true)
   var ll = ee.List(ee.List(ee.Dictionary(bound).get('coordinates')).get(0)).get(1)
   var ur = ee.List(ee.List(ee.Dictionary(bound).get('coordinates')).get(0)).get(3)
   uiLL.setValue('LL: ' + ll.getInfo())
   uiUR.setValue('UR: ' + ur.getInfo())
   // b) Weights
   uiWeights.setValue('Monthly weights: ' + weights.getInfo())
}
////////////////// FUNCTIONS FOR THE APP /////////////////////////////////////
var getLandsatData = function(params) {          
  var defaultParams = {
    region: map1.getBounds(true),
    startDate: '2018-01-01',
    endDate: '2018-12-31'
  }
  params = mergeObjects([defaultParams, params])
  var collection4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterBounds(params.region)
      .filterDate(params.startDate, params.endDate)
  var collection5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterBounds(params.region)
       .filterDate(params.startDate, params.endDate)
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterBounds(params.region)
      .filterDate(params.startDate, params.endDate)
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(params.region)
      .filterDate(params.startDate, params.endDate)
  var col4NoClouds = collection4.map(utils.maskL457_unscaled)            // or maskL457_unscaled() if faster
  var col5NoClouds = collection5.map(utils.maskL457_unscaled)
  var col7NoClouds = collection7.map(utils.maskL457_unscaled)
  var col8NoClouds = collection8.map(utils.maskL8_unscaled)              // or _unscaled() if faster
  var colNoClouds = col4NoClouds
                      .merge(col5NoClouds)
                      .merge(col7NoClouds)
                      .merge(col8NoClouds)
  return colNoClouds                                                              // HH adds
}  
function addNdvi(img) {
  var ndvi = img.expression(
    '(nir-red)/(nir+red)', 
    {nir: img.select('nir'), red: img.select('red')}
    ).rename('ndvi').multiply(10000).int16();
  return img.addBands(ndvi);
}
function mergeObjects(objects) {
  return objects.reduce(function (acc, o) {
    for (var a in o) { acc[a] = o[a] }
    return acc
    }, {})
}