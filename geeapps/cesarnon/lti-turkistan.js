var color7 = ui.import && ui.import("color7", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "max": 7,
        "palette": [
          "040404",
          "c00e05",
          "ff4c4c",
          "ffc3a6",
          "fffdcf",
          "c7ff9c",
          "4cf507",
          "2f9904"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"max":7,"palette":["040404","c00e05","ff4c4c","ffc3a6","fffdcf","c7ff9c","4cf507","2f9904"]},
    LSIBs = ui.import && ui.import("LSIBs", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    TrajectCalNDVI_MK_Sen_7clas_2000_2018 = ui.import && ui.import("TrajectCalNDVI_MK_Sen_7clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/TrajectCalNDVI_MK_Sen_7clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/TrajectCalNDVI_MK_Sen_7clas_2000_2018"),
    TrajectCalESPI_MK_Sen_7clas_2000_2018_v1 = ui.import && ui.import("TrajectCalESPI_MK_Sen_7clas_2000_2018_v1", "image", {
      "id": "users/cesarnon/LDN_world_index/TrajectCalESPI_MK_Sen_7clas_2000_2018_v1"
    }) || ee.Image("users/cesarnon/LDN_world_index/TrajectCalESPI_MK_Sen_7clas_2000_2018_v1"),
    SWATI_Cal7Clas_2000_2018 = ui.import && ui.import("SWATI_Cal7Clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_Cal7Clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal7Clas_2000_2018"),
    SWATI_Cal_ESPI7Clas_2000_2018 = ui.import && ui.import("SWATI_Cal_ESPI7Clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_Cal_ESPI7Clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal_ESPI7Clas_2000_2018"),
    SWATIslope_Cal_perc_7clas_nosig_2000_2018 = ui.import && ui.import("SWATIslope_Cal_perc_7clas_nosig_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATIslope_Cal_perc_7clas_nosig_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATIslope_Cal_perc_7clas_nosig_2000_2018"),
    LSIB = ui.import && ui.import("LSIB", "table", {
      "id": "USDOS/LSIB/2013"
    }) || ee.FeatureCollection("USDOS/LSIB/2013"),
    SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018 = ui.import && ui.import("SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018"),
    river = ui.import && ui.import("river", "table", {
      "id": "users/projectgeffao/Turkey/Sakarya_River_Network"
    }) || ee.FeatureCollection("users/projectgeffao/Turkey/Sakarya_River_Network"),
    Turkistan = ui.import && ui.import("Turkistan", "table", {
      "id": "users/cesarnon/CACILM/Turkistan"
    }) || ee.FeatureCollection("users/cesarnon/CACILM/Turkistan");
//function updateMap(selection)  can be used to get stats from visible layer
//var microbasin= ee.FeatureCollection([Ankara_beypazari, Nasreddin_Hoca, Porsuk_Cayi,kutahya_merkez])
/*
/// Corine v20
//2018
var dataset2018 = ee.Image('COPERNICUS/CORINE/V20/100m/2018');
var landCover2018 = dataset2018.select('landcover').clip(Turkistan);
//Map.setCenter(16.436, 39.825, 6);
Map.addLayer(landCover2018, {}, 'Land Cover2018');
var corineRec = function(imagen) {
  var imagen2 = ee.Image(0)
                .where (imagen.gte(111).and(imagen.lte(199)),5) //Artificial
                .where (imagen.gte(211).and(imagen.lte(299)),3) //Cropland
                .where (imagen.gte(311).and(imagen.lte(319)),1) //Tree-Covered
                .where (imagen.gte(321).and(imagen.lte(323)),2) //Grassland
                .where (imagen.eq(324),1) //Tree-Covered
                .where (imagen.gte(331).and(imagen.lte(332)),6) //Other Land
                .where (imagen.gte(333).and(imagen.lte(334)),2) //Grassland
                .where (imagen.eq(335),6) //Other Land
                .where (imagen.gte(411).and(imagen.lte(499)),4) //Wetlands
                .where (imagen.gte(511).and(imagen.lte(599)),7) //Water Body
                .clip(Turkistan)
  return imagen2
}
var color1 = ['#377e3f','#c19511', '#fcdb00', '#18eebe','#d7191c', '#cfdad2', '#4458eb']
var landCover2018rec = corineRec(landCover2018)
*/
var lcov= ee.Image ("users/geflanddegradation/toolbox_datasets/lcov_esacc_1992_2018")
//print (lcov)
var landCover2018rec = lcov.select('y2018')
                .remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
                       [ 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  5,  6,  6,  6,  7,  6])
                .clip(Turkistan)
var color1 = ['#377e3f','#c19511', '#fcdb00', '#18eebe','#d7191c', '#cfdad2', '#4458eb']
//Map.addLayer(LSIB,{},'LSIB')
//var zona = LSIB.filterMetadata('name', 'equals', 'NICARAGUA')
//var zona = LSIB.filterMetadata('region', 'equals', 'ASIA')
var zona = Turkistan
var centroide = zona.geometry().centroid().coordinates().getInfo()
//print(centroide,'centroide')
var zonaLat= centroide[0]
var zonaLong= centroide[1]
//print(zonaLat,'zonaLat')
var SWATIslope_ESPI_2001_2018 = SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018.clip(zona)     
var SWATIslope_NDVI_2001_2018 = SWATIslope_Cal_perc_7clas_nosig_2000_2018.clip(zona)    
var SWATI_ESPI_2001_2018 = SWATI_Cal_ESPI7Clas_2000_2018.clip(zona)    
var SWATI_NDVI_2001_2018 = SWATI_Cal7Clas_2000_2018.clip(zona)    
var ESPI_MKSen_2001_2018 = TrajectCalESPI_MK_Sen_7clas_2000_2018_v1.clip(zona)    
var NDVI_MKSen_2001_2018 = TrajectCalNDVI_MK_Sen_7clas_2000_2018.clip(zona)   
/*
Map.addLayer(SWATIslope_ESPI_2001_2018,color7,'SWATIslope_ESPI_2001_2018',false)    
Map.addLayer(SWATIslope_NDVI_2001_2018,color7,'SWATIslope_NDVI_2001_2018',false)    
Map.addLayer(SWATI_ESPI_2001_2018,color7,'SWATI_ESPI_2001_2018',false)    
Map.addLayer(SWATI_NDVI_2001_2018,color7,'SWATI_NDVI_2001_2018',false)    
Map.addLayer(ESPI_MKSen_2001_2018,color7,'ESPI_MKSen_2001_2018', false)    
Map.addLayer(NDVI_MKSen_2001_2018,color7,'NDVI_MKSen_2001_2018',false)    
 */
/*
var reclas = function (ima){
  var ima2 = ee.Image(0)
      .where (ima.eq(1),-3)
      .where (ima.eq(2),-2)
      .where (ima.eq(3),-1)
      .where (ima.eq(4),0)
      .where (ima.eq(5),1)
      .where (ima.eq(6),2)
      .where (ima.eq(7),3)
      .mask(ima.neq(0))
  return ima2
  }
  *
var SWATIslope_ESPI_2001_2018r = reclas(SWATIslope_ESPI_2001_2018)    
var SWATIslope_NDVI_2001_2018r = reclas(SWATIslope_NDVI_2001_2018)  
var SWATI_ESPI_2001_2018r = reclas(SWATI_ESPI_2001_2018)  
var SWATI_NDVI_2001_2018r = reclas(SWATI_NDVI_2001_2018)
var ESPI_MKSen_2001_2018r = reclas(ESPI_MKSen_2001_2018)
var NDVI_MKSen_2001_2018r = reclas(NDVI_MKSen_2001_2018)
*/
var consensus = SWATIslope_ESPI_2001_2018
  .add(SWATIslope_NDVI_2001_2018)
  .add(SWATI_ESPI_2001_2018)
  .add(SWATI_NDVI_2001_2018)
  .add(ESPI_MKSen_2001_2018)
  .add(NDVI_MKSen_2001_2018)
  .divide(6)
  .round()
//var color7n = {"opacity":1,"bands":["constant"],"min":-3,"max":3,"palette":["040404","c00e05","ff4c4c","ffc3a6","fffdcf","c7ff9c","4cf507","2f9904"]}
//Map.addLayer(consensus,color7,'consensus')    
var allimages = SWATIslope_ESPI_2001_2018.rename('SWATIslope_ESPI')
  .addBands(SWATIslope_NDVI_2001_2018.rename('SWATIslope_AM'))
  .addBands(SWATI_ESPI_2001_2018.rename('SWATI_ESPI'))
  .addBands(SWATI_NDVI_2001_2018.rename('SWATI_AM'))
  .addBands(ESPI_MKSen_2001_2018.rename('LTT_ESPI'))
  .addBands(NDVI_MKSen_2001_2018.rename('LTT_AM'))
print (allimages)
//--------- images
var images = {
  //'Map_1': getTheImage('LTT_AM'),
  'Map_1': getTheImage('LTT_ESPI'),
  'Map_2': getTheImage('SWATI_AM'),
  'Map_3': getTheImage('SWATIslope_AM'),
  'Map_4': getTheImage('SWATIslope_ESPI'),
  //'SWATIslope_ESPI': getTheImage('SWATIslope_ESPI'),
  'Map_5': consensus.visualize(color7),
  'ESA_LandCover': landCover2018rec.visualize({min:1, max:7, palette:color1}),
  'Basemap':ee.Image(0).updateMask(0),
};
function getTheImage(date) {
  var showimage = allimages.select(date).rename('constant')
  return showimage.visualize(color7);
}
//
//
var yrStart = 2000;
var yrEnd = 2018; 
//make a list for calendar year computation / year 2000 is not complete so I added a +1
var years = ee.List.sequence(yrStart+1, yrEnd);
//print(years, 'years for calendar analysis')
//Load NDVI collection
var modis = ee.ImageCollection('MODIS/006/MOD13Q1')
.filterDate('2000-7-01', '2018-12-31');
//print(modis, 'collection to process');
var modisFilter =ee.ImageCollection('MODIS/006/MOD13Q1')
.filterDate('2001-1-1', '2018-12-31')
.select('NDVI');
var months2 = ee.List.sequence(1, 12);
var years2 = ee.List.sequence(2001, 2018);
var byMonthYear = ee.ImageCollection.fromImages(
  years2.map(function(y) {
    return months2.map(function (m) {
      return modisFilter
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .mean()
        .set('system:time_start',ee.Date.fromYMD(y,m,1))
        //.set('month', m).set('year', y);
  });
}).flatten());
//print(byMonthYear,'byMonthYear')
var byMonthYear2 = byMonthYear.select('NDVI')
//Load water cover from same sensor
//make a mask for more permanent water bodies
var modiswater = ee.ImageCollection('MODIS/006/MOD44W').select('water_mask')
var waterMask = modiswater.sum().gte(12)// limit set on 12 years
var waterSum = modiswater.sum().reproject('SR-ORG:6974', null, 250)
//Map.addLayer(waterSum,{},'waterMask',false)
//create a variable for band naming
var nn = ee.String('ndvi_')
// Get the NDVI, EVI and ESPI Annual mean for every calendar Year 
// and replace bad quality pixels with anual mean
var byYear = ee.ImageCollection.fromImages(
      years.map(function (y) {
        //get the subset for the target year
        var modisYear = modis.filter(ee.Filter.calendarRange(y, y, 'year'))
        //get the mean for NDVI
        var modisYearMean = modisYear.select('NDVI').mean()
        // Make a funtion to replace bad pixels with the mean
        var maskQAYear = function(image) {
          var image2 = image.select('NDVI');
          var image2 = image2.where(image.select("SummaryQA").gte(2),modisYearMean);
        return image2.rename('NDVI');
        }
        var ModisYearCorrected = modisYear.map(maskQAYear)
        var ModisYearCorrmean = ModisYearCorrected.mean()//.reproject('SR-ORG:6974', null, 250)
                        .set('year', y)
                        .set('system:time_start',ee.Date.fromYMD(y,1,1))
                        .rename('AM')
                        //.rename(nn.cat(ee.String(ee.Number(y).toInt()))); // to name each band like "NDVI_yyyy"
        // Make a funtion to calculate ESPI
        var ModisYearmeanNDVI = ModisYearCorrmean.select('AM')
        var ModisYearstdDeNDVI = ModisYearCorrected.select('NDVI').reduce(ee.Reducer.stdDev()).rename('NDVIs')
        var ModisYearcvNDVI = ModisYearstdDeNDVI.divide(ModisYearmeanNDVI).rename('NDVIcv')
        var uno = ee.Image(1)
        var ipse = ModisYearmeanNDVI.multiply(uno.subtract(ModisYearcvNDVI)).rename('ESPI')
        //add ESPI to corrected NDVI and EVI and return
        return ModisYearCorrmean.addBands(ipse)
}));
//print(byYear,'Colection of calendar year means');
///---------------------------------------------------------------
/*
 * Set up the maps and control widgets
 */
//Map.setOptions('HYBRID')
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = Map.setOptions('HYBRID');
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
/*
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
//ui.root.insert(0,splitPanel);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(31.25, 39.54, 8);
*/
////---------------------------------------------------------------
///// Legend for the LTI
// Create the panel for the legend items.
var color = ['040404','c00e05','ff4c4c','ffc3a6',
'fffdcf','c7ff9c','4cf507','2f9904']
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    //position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Land Trend Index',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
//var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
//legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '6px',
      margin: '0 0 3px 0'
          }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 2px 4px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var names = ['NoData - Water','Strong Negative trend', 'Medium Negative trend',
'Light Negative trend', 'No significative Trend', 
'Light Possitive trend', 'Medium Possitive trend',
'Strong Possitive trend']
for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(color[i], names[i]));
  }
/////--------------------------------
//// ----   Legend for the Corine
var color1 = ['#377e3f','#c19511', '#fcdb00', '#18eebe','#d7191c', '#cfdad2', '#4458eb']
var names1 = ['Tree-covered', 'Grassland', 'Cropland', 'Wetland', 'Artificial', 'Other land', 'Water body']
var legend1 = ui.Panel({
  style: {
    position: 'bottom-left',
    //position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle1 = ui.Label({
  value: 'ESA LandCover 2018 - UNCCD classes',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend1.add(legendTitle1);
//var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
//legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow1 = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '6px',
      margin: '0 0 3px 0'
          }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 2px 4px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//Colors from the original corine metadata
/*
var names1 = dataset2018.get('landcover_class_names').getInfo()
var color1 = dataset2018.get('landcover_class_palette').getInfo()
print (names1)
print (color1)
*/
for (var i = 0; i < names1.length; i++) {
    legend1.add(makeRow1(color1[i], names1[i]));
    //print(color[i], names[i])
  }
//-------------------------------------------------------------------------
// -------Create User Interface portion-----
// **  Also taken from a GEE example : 'Two Chart Inspector'
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Comparison of Land Trend Indicators',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click on the map to inspect profile!'),
  ui.Label('Explore the map and complete the survey:'),
  ui.Label('https://forms.gle/4FJHeUkQQjDf4fMZA')
  ]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
var clikear = function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
// Create an NDVI phenology year chart.
  var phenoChart = ui.Chart.image.series(byYear, point, ee.Reducer.mean(), 250);
  phenoChart.setOptions({
    title: 'Annual Index value for calendar year',
    vAxis: {title: 'Index * 10000'},//, maxValue: 9000},
    hAxis: {title: 'Cal_Year', format: 'yyyy', gridlines: {count: 7}},
  });
panel.widgets().set(2, phenoChart);
// Create an NDVI calendar yearchart.
var calChart = ui.Chart.image.series(byMonthYear, point, ee.Reducer.mean(), 250);
  calChart.setOptions({
    title: 'MODIS Monthly NDVI',
    vAxis: {title: 'Index * 10000'},
    hAxis: {title: 'Calendar_Year', format: 'yyyy', gridlines: {count: 7}},
  });
  panel.widgets().set(3, calChart);
  panel.widgets().set(4, legend);
  panel.widgets().set(5, legend1);
};
leftMap.onClick (clikear)
rightMap.onClick (clikear)
//Map.add(legend);
panel.widgets().set(4, legend)
panel.widgets().set(5, legend1)
//panel.widgets().reset()
//Map.style().set('cursor', 'crosshair');
////****
// Add the panel to the ui.root.
//ui.root.insert(0, panel);
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel])
ui.root.add(panel);
//ui.root.add(splitPanel);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(31.25, 39.54, 8);
leftMap.style().set('cursor', 'crosshair');
rightMap.style().set('cursor', 'crosshair');
/// polygons
    // Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var river1 = empty.paint({
  featureCollection: river,
  color: 1,
  width: 1
}).clip(Turkistan);
//Map.addLayer(river1, {palette: '#4458eb'}, 'river')
leftMap.addLayer(river1,{palette: '#4458eb'});
rightMap.addLayer(river1,{palette: '#4458eb'});
 /*
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: zona,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '#0409b1'}, 'TurkistanLimits');
var outlinekutahya_merkez = empty.paint({
  featureCollection: kutahya_merkez,
  color: 1,
  width: 1
});
Map.addLayer(outlinekutahya_merkez, {palette: '#0409b1'}, 'kutahya_merkez');
*/
Map.setCenter(zonaLat,zonaLong,8)
//Export to drive
/*
Export.image.toDrive({
  image: SWATIslope_ESPI_2001_2018,
  description: 'SWATIslope_ESPI_2001_2018_Turkistan_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LDN_Turkistan',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATIslope_NDVI_2001_2018,
  description: 'SWATIslope_AM_2001_2018_Turkistan_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LDN_Turkistan',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATI_ESPI_2001_2018,
  description: 'SWATI_ESPI_2001_2018_Turkistan_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LDN_Turkistan',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: SWATI_NDVI_2001_2018,
  description: 'SWATI_AM_2001_2018_Turkistan_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LDN_Turkistan',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: ESPI_MKSen_2001_2018,
  description: 'LTT_ESPI-NDVI_2001_2018_Turkistan_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LDN_Turkistan',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: NDVI_MKSen_2001_2018,
  description: 'LTT_AM-NDVI_2001_2018_Turkistan_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LDN_Turkistan',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: consensus,
  description: 'ConsensusModel_2001_2018_Turkistan_WGS84',
  scale: 250,
  crs:'EPSG:4326',
  region: zona.geometry().bounds(),
  folder: 'LDN_Turkistan',
  maxPixels: 1e13
});
*/