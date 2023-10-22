var Study_Area = ui.import && ui.import("Study_Area", "table", {
      "id": "users/robertMmyers/Final_Project/Station_Fire"
    }) || ee.FeatureCollection("users/robertMmyers/Final_Project/Station_Fire");
//###############################################################
//###############################################################
//PROJECT DESCRIPTION============================================
//This project was created for GEOG 589, Penn State Geospatial Program.
//Author:  Robert M. Myers (robertmyers.mobile@gmail.com)
//INDEX:
//COMMON OPERATIONS (19-152)
//MODIS (153-173)
//HAROMONIZATION: ETM+ TO OLI (174-283)
//CREATE YEARLY COMMPOSITES (284-312)
//EXTRACT IMAGES (313-334)
//DATA ANALYSIS (335-352)
//BURN SEVERITY CLASSIFICATION (353-368)
//NATIONAL LAND COVER DATA BASE FOR COMPARISON (369-388)
//STUDY AREA BOUNDARY (389-404)
//ADD BURN SEVERITY, NLCD, AND NDVI LEGENDS (404-574)
//CREATE SWIPE MAP (575-695)
//###############################################################
//###############################################################
//COMMON OPERATIONS==============================================
//Hide drawing tools.
//Map.drawingTools().setShown(false);
Map.setControlVisibility(null, true, true, true, true, true,false);
//Center project on Study Area.
Map.setCenter(-118.15375353948703,34.32241005530896, 10);
//Set Google Base Map.
Map.setOptions('SATELLITE');
//Set visualization parameters for NLCD.
var landcoverVis = {
  min: 0.0,
  max: 95.0,
  palette: [
    '000000', 
    '000000', 
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '466b9f',
    'd1def8',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dec5c5',
    'd99282',
    'eb0000',
    'ab0000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b3ac9f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '68ab5f',
    '1c5f2c',
    'b5c58f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'af963c',
    'ccb879',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dfdfc2',
    'd1d182',
    'a3cc51',
    '82ba9e',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dcd939',
    'ab6c28',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b8d9eb',
    '000000',
    '000000',
    '000000',
    '000000',
    '6c9fb8'
  ],
  };
//Specify visualtion parameters for NDVI maps.
var NDVIModisVis = {
  bands: ['NDVI'],
  min: 0.0,
  max: 8000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
  };
//Specify visualtion parameters for NBR maps.
var NBRcolorizedVis = {
  bands: ['NBR_mean'],
  min: -0.20,
  max: 1.0,
  palette: ['#ffffff','#7a8737', '#acbe4d', '#0ae042','#fff70b', '#ffaf38', '#ff641b', '#a41fd6'],
  };
//###############################################################
//MODIS==========================================================
//Add MODIS(MOD13Q1.006 Terra Vegetation Indices 16-Day Global 250m)
var datasetMODIS = ee.ImageCollection('MODIS/006/MOD13Q1')
                  .filterDate('2009-08-01', '2009-09-30');
var MODISPre2009 = ee.Image('MODIS/006/MOD13Q1/2009_08_13')
                  .select('NDVI')
                  .clip(Study_Area);
var MODISPost2009 = ee.Image('MODIS/006/MOD13Q1/2009_09_30')
                  .select('NDVI')
                  .clip(Study_Area);
var MODISPost2019 = ee.Image('MODIS/006/MOD13Q1/2019_09_30')
                  .select('NDVI')
                  .clip(Study_Area);
Map.addLayer(MODISPre2009, NDVIModisVis, '2009 Pre-Fire MODIS');
//###############################################################
//HAROMONIZATION: ETM+ TO OLI====================================
//Define coefficients supplied by Roy et al. (2016) for translating ETM+
//surface reflectance to OLI surface reflectance.
var coefficients = {
  itcps: ee.Image.constant([0.0003, 0.0088, 0.0061, 0.0412, 0.0254, 0.0172]).multiply(10000),
  slopes: ee.Image.constant([0.8474, 0.8483, 0.9047, 0.8462, 0.8937, 0.9071])
  };
//Define function to get and rename bands of interest from OLI.
function renameOLI(img) {
  return img.select(
		['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'],
		['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa']
	);
  }
//Define function to get and rename bands of interest from ETM+.
function renameETM(img) {
  return img.select(
		['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'],
		['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa']
  );
  }
//Define function to apply harmonization transformation.
function etm2oli(img) {
  return img.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2'])
    .multiply(coefficients.slopes)
    .add(coefficients.itcps)
    .round()
    .toShort()
    .addBands(img.select('pixel_qa')
  );
  }
//Define function to mask out clouds and cloud shadows.
function fmask(img) {
    var cloudShadowBitMask = 1 << 3;
    var cloudsBitMask = 1 << 5;
    var qa = img.select('pixel_qa');
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
    .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    return img.updateMask(mask);
    }
//Define function to calculate NDVI.
function calcNDVI(img) {
    var ndvi = img.normalizedDifference(['NIR', 'Red']).rename('NDVI');
    return img.addBands(ndvi);
    }
//Define function to calculate NBR.
function calcNBR(img) {
    var nbr = img.normalizedDifference(['NIR', 'SWIR2']).rename('NBR');
    return img.addBands(nbr);
    }
//Define function to prepare OLI images.
function prepOLI(img) {
    var orig = img;
    img = renameOLI(img);
    img = fmask(img);
    img = calcNDVI(img);
    img = calcNBR(img);
    return ee.Image(img.copyProperties(orig, orig.propertyNames()));
    }
//Define function to prepare ETM+ images.
function prepETM(img) {
    var orig = img;
    img = renameETM(img);
    img = fmask(img);
    img = etm2oli(img);
    img = calcNDVI(img);
    img = calcNBR(img);
    return ee.Image(img.copyProperties(orig, orig.propertyNames()));
  }
//Get Landsat Data and Apply Functions.
// Get Landsat surface reflectance collections for OLI, ETM+ and TM sensors.
var oliCol = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR');
var etmCol= ee.ImageCollection('LANDSAT/LE07/C01/T1_SR');
var tmCol= ee.ImageCollection('LANDSAT/LT05/C01/T1_SR');
//Define a collection filter.
var colFilter = ee.Filter.and(
  ee.Filter.bounds(Study_Area),
  ee.Filter.calendarRange(2008, 2019, 'year'),
  ee.Filter.calendarRange(122, 236, 'day_of_year'),
  ee.Filter.lt('CLOUD_COVER', 20),
  ee.Filter.eq('WRS_ROW', 36),
  ee.Filter.eq('WRS_PATH', 41),
  ee.Filter.or(
    ee.Filter.eq('IMAGE_QUALITY', 9),
    ee.Filter.eq('IMAGE_QUALITY_OLI', 9))
  );
//Filter collections and apply harmonization.
oliCol = oliCol.filter(colFilter).map(prepOLI);
etmCol= etmCol.filter(colFilter).map(prepETM);
tmCol= tmCol.filter(colFilter).map(prepETM);
//Merge the collections.
var col = oliCol
  .merge(etmCol)
  .merge(tmCol);
//###############################################################
//CREATE YEARLY COMMPOSITES =====================================
//Define start and end years.
var startYear = 2008;
var endYear = 2019;
//Define reducer.
var myReducer = ee.Reducer.mean();
//Make a list of years to generate composites for.
var yearList = ee.List.sequence(startYear, endYear);
//Map over the list of years to generate a composite for each year.
var yearCompList = yearList.map(function(year){
  var yearCol = col.filter(ee.Filter.calendarRange(year, year, 'year'));
  var imgList = yearCol.aggregate_array('LANDSAT_ID');
  var yearComp = yearCol.reduce(myReducer);
  var nBands = yearComp.bandNames().size();
  return yearComp.set({
    'year': year,
    'image_list': imgList,
    'n_bands': nBands
  });
  });
//Convert the annual composite image list to an ImageCollection
var yearCompCol = ee.ImageCollection.fromImages(yearCompList);
//###############################################################
//EXTRACT IMAGES ============================
//Select images from 2008 to 2019.
var listOfImages = yearCompCol.toList(yearCompCol.size());
var Year2008 = listOfImages.get(0);
var Year2009 = listOfImages.get(1);
var Year2010 = listOfImages.get(2);
var Year2011 = listOfImages.get(3);
var Year2012 = listOfImages.get(4);
var Year2013 = listOfImages.get(5);
var Year2014 = listOfImages.get(6);
var Year2015 = listOfImages.get(7);
var Year2016 = listOfImages.get(8);
var Year2017 = listOfImages.get(9);
var Year2018 = listOfImages.get(10);
var Year2019 = listOfImages.get(11);
//Create image collection from constructor,
var Study_Collection = ee.ImageCollection([Year2008, Year2009, Year2010, Year2011, Year2012, Year2013,
    Year2014, Year2015, Year2016, Year2017, Year2018, Year2019]);
//###############################################################
//DATA ANALYSIS==================================================
// Clip maps to study area.
var Year2009Map =ee.Image(Year2009).clip(Study_Area);
var Year2010Map =ee.Image(Year2010).clip(Study_Area);
var Year2013Map =ee.Image(Year2013).clip(Study_Area);
var Year2016Map =ee.Image(Year2016).clip(Study_Area);
var Year2019Map =ee.Image(Year2019).clip(Study_Area);
//Calculate Differences between select years.
var Diff1 = Year2009Map.subtract(Year2010Map);
var Diff5 = Year2009Map.subtract(Year2019Map);
//Scale NBR to USGS standards.
var dNBR1 = Diff1.select(['NBR_mean']).multiply(1000);
var dNBR5 = Diff5.select(['NBR_mean']).multiply(1000);
//###############################################################
//BURN SEVERITY CLASSIFICATION===================================
// Define an SLD style of discrete intervals to apply to the image.
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#000000" quantity="-965" label="-965"/>' +
      '<ColorMapEntry color="#00e600" quantity="-155" label="-155" />' +
      '<ColorMapEntry color="#006600" quantity="34" label="34" />' +
      '<ColorMapEntry color="#b3ffd9" quantity="182" label="182" />' +
      '<ColorMapEntry color="#ffff00" quantity="369" label="369" />' +
      '<ColorMapEntry color="#ff0000" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
//###############################################################
//NATIONAL LAND COVER DATA BASE FOR COMPARISON===================
//Add NLCD for 2008, 2011, 2013, and 2016.
var NLCD2008 = ee.Image('USGS/NLCD/NLCD2008');
var landcover2008 = NLCD2008.select('landcover').clip(Study_Area);
var NLCD2011= ee.Image('USGS/NLCD/NLCD2011');
var landcover2011 = NLCD2011.select('landcover').clip(Study_Area);
var NLCD2013= ee.Image('USGS/NLCD/NLCD2013');
var landcover2013 = NLCD2013.select('landcover').clip(Study_Area);
var NLCD2016 = ee.Image('USGS/NLCD/NLCD2016');
var landcover2016 = NLCD2016.select('landcover').clip(Study_Area);
//Map NLCD
Map.addLayer(landcover2008, landcoverVis, 'NLCD Landcover 2008', 0);
//###############################################################
//STUDY AREA BOUNDARY============================================
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
    featureCollection: Study_Area,
    color: 1,
    width: 2,
    });
//Add outline to map.
Map.addLayer(outline, {palette: 'FF0000'}, 'Fire Boundary');
//################################################################
//ADD BURN SEVERITY, NLCD, AND NDVI LEGENDS=======================
//Set position of panel.
var legend = ui.Panel({
  style: {
    position: 'top-left',
    padding: '8px 15px'
  }});
//Create legend title.
var legendTitle = ui.Label({
  value: 'LEGEND',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
//Add the title to the panel.
legend.add(legendTitle);
//Create legend subtitle.
var legendSubTitle = ui.Label({
  value: 'Burn Severity Classes (nNBR)',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
//Add the title to the panel.
legend.add(legendSubTitle);
//Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      //Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
      // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//Palette with the colors
var palette = ['ff0000',  'ffff00', 'b3ffd9', '006600','00e600','000000'];
//Names of the legend
var names = ['High', 'Moderate', 'Low', 'Unburned to Low', 'Increased Greenness', 'NA'];
//Add color and and names
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
//Create legend subtitle.
var legendSubTitle2 = ui.Label({
  value: 'National Land Cover Classes',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
//Add the title to the panel.
legend.add(legendSubTitle2);
//Creates and styles 1 row of the legend.
var makeRow1 = function(color, name) {
      //Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
      // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//Palette with the colors
var palette1 = ['1C5F2C',  'CCB879', 'DFDFC2'];
//Names of the legend
var names1 = ['Evergreen Forest', 'Shrub/Scrub', 'Grassland/Herbacious'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow1(palette1[i], names1[i]));
  }  
//Create legend subtitle.
var legendSubTitle3 = ui.Label({
  value: 'Normalized Difference',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
//Add the title to the panel.
legend.add(legendSubTitle3);
//Create legend subtitle.
var legendSubTitle4 = ui.Label({
  value: 'Vegetation Index (NDVI)',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
//Add the title to the panel.
legend.add(legendSubTitle4);
//Create continuous legend.
var Legendpalette = {
  min: -1.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
  };
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(Legendpalette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '10x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: Legendpalette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Legendpalette.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
//Add colorbar to legend.
legend.add(colorBar);
//Create subtile for continous legend.
var legendSubTitle5 = ui.Label({
  value: 'Low to High Vegetation',
  style: {textAlign: 'center', stretch: 'horizontal'},
  });
//Add subtile to map.
legend.add(legendSubTitle5);
//Add legend to map.
Map.add(legend);
//###############################################################
//CREATE SWIPE MAP===============================================
//Creating the linked Map.
var linkedMap = ui.Map().setOptions('SATELLITE');
// Linked Map layers.
linkedMap.addLayer(MODISPost2009, NDVIModisVis, '2009 Post-Fire MODIS NDVI');
linkedMap.addLayer(MODISPost2019, NDVIModisVis, '2019 Post-Fire MODIS NDVI', 0);
linkedMap.addLayer(dNBR1.sldStyle(sld_intervals), {}, '2010 dNBR Burn Severity', 0);
linkedMap.addLayer(dNBR5.sldStyle(sld_intervals), {}, '2019 dNBR Burn Severity', 0);
linkedMap.addLayer(landcover2011, landcoverVis, 'NLCD Landcover 2011', 0);
linkedMap.addLayer(landcover2013, landcoverVis, 'NLCD Landcover 2013', 0);
linkedMap.addLayer(landcover2016, landcoverVis, 'NLCD Landcover 2016', 0);
linkedMap.addLayer(outline, {palette: 'FF0000'}, 'Fire Boundary');
//Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
//Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
    firstPanel: linker.get(0),
    secondPanel: linker.get(1),
    orientation: 'horizontal',
    wipe: true,
    style: {stretch: 'both'}
  });
//Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
var preFire_label = ui.Label('Pre-Fire');
  preFire_label.style().set(
    {position: 'top-center',
     fontSize: '16px'});
var postFire_label = ui.Label('Post-Fire');
  postFire_label.style().set(
    {position: 'top-center',
     fontSize: '16px'});
//Set position of panel.
var legend1 = ui.Panel({
  style: {
    position: 'top-right',
    padding: '8px 15px'
  }});
//Create legend title.
var legend1Title = ui.Label({
  value: 'STATION FIRE',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
//Add the title to the panel.
legend1.add(legend1Title);
//Create legend subtitle.
var legend1SubTitle = ui.Label({
  value: '10 Years Later (2009 - 2019)',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
//Add the title to the panel.
legend1.add(legend1SubTitle);
//Create legend subtitle.
var legend1Text1 = ui.Label({
  value: 'The Station Fire started in Angeles National Forest on August 26, 2009. It consumed 165,360 acres.',
    style: {fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    width: '210px',
    }});
//Add the title to the panel.
legend1.add(legend1Text1);
//Create legend subtitle.
var legend1Text2 = ui.Label({
  value: 'Left Panel contains Pre-Fire Layers; Right Panel contains Post-Fire Layers.  The Post-Fire Layers are in the Layer Button above. To access Pre-Fire Layer Button, swipe all the way to the right. Layers are MODIS NDVI, Burn Severity Index (nNBR), and National Land Cover Classes.',
    style: {fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    width: '210px',
    }});
//Add the title to the panel.
legend1.add(legend1Text2);
//Create legend subtitle.
var legend1Text3 = ui.Label({
  value: 'This app was created as part of a final project in GEOG 589 in the Penn State Geospatial Program.',
    style: {fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    width: '210px',
    }});
//Add the title to the panel.
legend1.add(legend1Text3);
var moreInfo = ui.Label("Info on author...");
  moreInfo.style().set("position", "bottom-right");
  moreInfo.setUrl("https://orcid.org/0000-0002-9575-4889");
//Add legend buttons to the Map
linkedMap.add(legend1);
linkedMap.add(moreInfo);
Map.add(preFire_label);
linkedMap.add(postFire_label);
//###############################################################
//END