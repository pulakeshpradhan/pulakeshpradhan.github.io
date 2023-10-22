//Morphological Study V2
//////////////
//User Input//
//////////////
var n = 14; //number of x sections
//Dictionary for 
var yearList = {1989:1989, 1990:1990, 1991:1991, 1992:1992, 1993:1993, 1994:1994, 1995:1995, 1996:1996,
  1997:1997, 1998:1998, 1999:1999, 2000:2000, 2001:2001, 2002:2002, 2003:2003, 2004:2004, 2005:2005, 2006:2006,
  2007:2007, 2008:2008, 2009:2009, 2010:2010, 2011:2011, 2014:2014, 2015:2015, 2016:2016, 2017:2017, 2018:2018, 2019:2019
};
var select1 = ui.Select({
  items: Object.keys(yearList),
  value: '1989',
  style: {stretch: 'horizontal'},
  onChange: function(key) {var year1 = yearList[key]}
});
//print('Choose Study Year 1',select1);
var select2 = ui.Select({
  items: Object.keys(yearList),
  value: '1990',
  style: {stretch: 'horizontal'},
  onChange: function(key){var year2 = yearList[key]}
});
//print('Choose Study Year 2',select2);
var button = ui.Button({
  label: 'Start Morphological Study',
  style: {stretch: 'horizontal'},
  onClick: function() {
    Map.clear();
    morphologicalStudyFunction(ee.Number.parse(select1.getValue()).getInfo(),ee.Number.parse(select2.getValue()).getInfo());
  }
});
//Prepare the visualtization parameters of the labels 
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var numberVIS = {
  'margin':'0px 0px 2px 0px', 
  'color':'bf0f19',
  'fontWeight':'bold'
  };
var subTextVis = {
  'margin':'0px 0px 2px 0px',
  'fontSize':'12px',
  'color':'grey'
  };
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'', 
  'color': '3333ff'
  };
//print(button);
//Simple UI Design
var panel = ui.Panel({style: {border: 'solid', width: '350px'}})
    .add(ui.Label('The Brahmaputra Morphological Study', titleTextVis));
panel.add(ui.Label('Select two year and click the button. See the results from Map Layers', textVis));
panel.add(ui.Panel({widgets: [ui.Label('Study Year 1:'), select1], layout: ui.Panel.Layout.Flow('horizontal')}));
panel.add(ui.Panel({widgets: [ui.Label('Study Year 2:'), select2], layout: ui.Panel.Layout.Flow('horizontal')}));
panel.add(button);
// Create legend title
var legendTitle1 = ui.Label('Legend for Accretion/Erosion Study',textVis);
var legendTitle2 = ui.Label('Legend for Bank Migration Study',textVis);
// Add the title to the panel
panel.add(legendTitle1);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 4px 0px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette1 =['blue', 'green', 'red'];
var palette2 =['SkyBlue', 'RoyalBlue', 'olive', 'orange', 'orchid', 'purple', 'SeaGreen', 'OrangeRed', 'DarkMagenta', 'Maroon'];  
// name of the legend
var names1 = ['Unchanged River','Accretion','Erosion'];
var names2 = ['River Polygon Year1', 'River Polygon Year2', 'Left,Right Bankline Year1', 'Midline Year1', 'Left,Right Bankline Year2', 'Midline Year2', 'Left,Right Bank Points Year1', 'Mid bank points year1', 'Left,Right Bank Points Year2', 'Mid bank points year2']; 
// Add color and and names
for (var i = 0; i < 3; i++) {
  panel.add(makeRow(palette1[i], names1[i]));
  } 
panel.add(legendTitle2);
for (var i = 0; i < 10; i++) {
  panel.add(makeRow(palette2[i], names2[i]));
  }  
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Rahman MM (2020) Spatiotemporal Analysis of Multispectral Medium Resolution Satellite Imagery of Braided Rivers using Google Earth Engine, MSc Thesis, IHE Delft', {},
    'https://www.researchgate.net/profile/Md_Manzur_Rahman');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
panel.add(linkPanel);
////////////
//Geometry//
////////////
var jamunaROI = ee.Geometry.Polygon(
        [[[89.48, 25.1106],
          [89.48, 23.831],
          [89.88, 23.831],
          [89.88, 25.1106]]], null, false);
// Bahadurabad Water Level Station SW47
var bahadurabadWLCoordinate = [89.701110, 25.104949];
// Aricha Water Level Station SW 50.6
var arichaWLCoordinate = [89.78, 23.831];          
Map.centerObject(jamunaROI, 9);
//var roioutline = ee.Image().byte().paint({featureCollection: ee.FeatureCollection([jamunaROI]), color: 0, width: 3});
//Map.addLayer(roioutline, {palette: 'black'}, 'Jamuna ROI Window');
/////////////////////////////
//Image Collection Creation//
/////////////////////////////
var path = 138;
var row = 43;
//Rescale surface reflectance image into 0 to 1 value excluding qa band
var bandrescale = function(image){
  var rescaledImage = image.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2']).multiply(0.0001);
  rescaledImage = rescaledImage.addBands(image,['pixel_qa']);
  return rescaledImage.copyProperties(image, image.propertyNames());
};
//Set year tag in image properties
var setYear = function(image){
  var year = image.date().format('YYYY');
  return image.set({'year':year});
};
//Landsat Surface Reflectance Cloud or Non-cloud (1 or 0) band add
var cloudLandsatSR = function(image) {
  // Bits 3 and 5 of the quality band are cloud shadow and cloud, respectively.
  var qa = image.select('pixel_qa');
  var cloudPixel = qa.bitwiseAnd(1 << 5).neq(0).rename('cloudPixel'); //1 for cloudy 0 for non-cloudy
//  .and(qa.bitwiseAnd(1<<3).neq(0));
  // qa band is first converted in bit and operation on 10000 (10000 is made by 1<<5 1 shifting 5 spaces to left) since the 4th bit reserves the cloud info
  image = image.addBands(cloudPixel);
  //get the count of total cloud pixel in ROI will be used to put it in Metadata
  var stats = cloudPixel.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: image.geometry(), //set squareROI to get only for ROI cloud pixels number
    scale: 30,
    maxPixels: 1e9
  }); 
  return image.set(stats); //use updateMask(cloudPixel) if you want to mask it
};
// Function creates a imagecollection of Landsat 4-8 Surface Reflectance Dataset with desired band names which will be used for study
var landsat_T1_SR_Dataset = function(path, row){
  //Define a list of Bands Numbers and a list of Band Names to make it consistant to all sensors
  var landsat8Bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'];
  var landsat7Bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa' ];
  var landsat5Bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'];
  var landsat4Bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'];
  var landsatNewBandNames = ['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa'];
    // Define Landsat surface reflection Data and rename the bands: select function remanes it first list is old name second list is new name
  var L4col = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR').select(landsat4Bands,landsatNewBandNames);
  var L5col = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').select(landsat5Bands,landsatNewBandNames);
  var L7col = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').select(landsat7Bands,landsatNewBandNames).filterDate('1999-04-15', '2003-05-30'); 
  //Since June 2003, the Landsat 7 ETM+ sensor has acquired and delivered data with data gaps caused by the Scan Line Corrector (SLC) failure. 
  var L8col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').select(landsat8Bands,landsatNewBandNames);
    // Filter the collection for only region of interest
  var L4colroi = L4col.filter(ee.Filter.eq('WRS_PATH', path)).filter(ee.Filter.eq('WRS_ROW', row)).sort('SENSING_TIME');
  var L5colroi = L5col.filter(ee.Filter.eq('WRS_PATH', path)).filter(ee.Filter.eq('WRS_ROW', row)).sort('SENSING_TIME');
  var L7colroi = L7col.filter(ee.Filter.eq('WRS_PATH', path)).filter(ee.Filter.eq('WRS_ROW', row)).sort('SENSING_TIME');
  var L8colroi = L8col.filter(ee.Filter.eq('WRS_PATH', path)).filter(ee.Filter.eq('WRS_ROW', row)).sort('SENSING_TIME');
  // merge all the Landsat images into one big collection and sorting it according to time of sensing
  var landsatFullCol = L4colroi.merge(L5colroi).merge(L7colroi).merge(L8colroi).sort('SENSING_TIME');
  //Set Year value to the collection
  var landsatMerged = landsatFullCol.map(setYear);  
  //scale the image bands from 0 to 1 excluding the qa band
  var landsatMergedScaled = landsatMerged.map(bandrescale);
  var landsatMergedScaledCloud = landsatMergedScaled.map(cloudLandsatSR);
  return landsatMergedScaledCloud;
};
// NDWI function: takes an image and returns an image with a new band of calculated values
// Reference: Normalized Difference Water Index in McFeeters (1996)
var calculateNDWI = function(image){
  //In expression form. rename at the end to specify the calculated value's Band Name
  var calculatedNDWI = image.expression('(Green - NIR)/(Green + NIR)', {'Green': image.select('Green'), 'NIR': image.select('NIR')}).rename('NDWI');
  //add an extra band. all the other bands remain in the image. Also select function can be used to return only one particular band
  return image.addBands(calculatedNDWI);
};
var imageColSR = landsat_T1_SR_Dataset(path, row);
//print(imageColSR);
//Function to create dry period yearly composite
var makeDryPeriodYearlyComposite = function(year){
    var start = ee.Date.fromYMD(year, 1, 1);
    var end = ee.Date.fromYMD(year, 3, 31);
    return imageColSR.filterDate(start, end)
    .sort('CLOUD_COVER').first(); //to get the least cloudy image or the next line
    //.reduce(ee.Reducer.percentile([20])).rename(['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa', 'cloudPixel']).set({'year':year});
    //.reduce(ee.Reducer.median()).rename(['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa', 'cloudPixel']).set({'year':year});
};
//Function to create river vector
var makeRiverVector = function(img){
  var grayScaleImage = calculateNDWI(img);
  var manualThreshold = 0.0;
  var water = grayScaleImage.select('NDWI').gt(manualThreshold).rename('Water');
  var small = water.connectedPixelCount(1000, true).lt(1000); //small water bodies are those less than 1000px
  var connectedChannel = water.subtract(small).rename('connected');
  //Main channel vector extraction extraction
  var vector = connectedChannel.updateMask(connectedChannel).reduceToVectors({
    reducer: ee.Reducer.countEvery(), 
    geometry: jamunaROI,
    scale: 30,
    maxPixels: 1e10,
    tileScale: 4
  }).filter(ee.Filter.gt('count', 50000));//remove all small river segments
  //print(vector)
  return vector;  
};
// Force 30m/pixel for viewing. WARNING: This is dangerous. Takes long time
var forceProjection = function(img) {
  return img.reproject("EPSG:4326", null, 30);
};
//========================================================
var morphologicalStudyFunction = function(year1, year2){
  var imageYear1 = makeDryPeriodYearlyComposite(year1);
  var imageYear2 = makeDryPeriodYearlyComposite(year2);
  Map.addLayer(imageYear1, {bands: ['SWIR1', 'NIR', 'Green'], min:0, max:0.3, gamma: 0.75}, 'Year-'+year1+'-SNG Image', false);
  Map.addLayer(imageYear2, {bands: ['SWIR1', 'NIR', 'Green'], min:0, max:0.3, gamma: 0.75}, 'Year-'+year2+'-SNG Image', false);
  var river1 = makeRiverVector(imageYear1).geometry();
  var river2 = makeRiverVector(imageYear2).geometry();
  print ('Yearly composite image-'+year1, imageYear1, 'Yearly composite image-'+year2, imageYear2);
  Map.addLayer(river1,{color:'navy'},'River Polygon'+year1, false);
  Map.addLayer(river2,{color:'cyan'},'River Polygon'+year2, false);
  ///////////////////////
  //Braiding Area Ratio//
  ///////////////////////
  //MultiPolygon Area Function to extract Hollow Braid Areas
  var areaFunction = function(feature) {
  var myFeatureList = ee.List(feature);
  var conditionalAreas = ee.Algorithms.If(myFeatureList.length().gt(1), 
                myFeatureList.map(function(feature1) {
                    var area1 = ee.Geometry.Polygon(feature1).area(1);
                    return area1;
                }),
                ee.Geometry.Polygon(myFeatureList).area(1)
              );
    return conditionalAreas;            
  };
  var calculateBraidAreaRatio = function(vectorGeometry, year){
    // Map the difference function over the collection.
    var allPolyAreas = ee.List(vectorGeometry.coordinates().map(areaFunction));
    //print('List of All Areas in My MultiPolygon ', allPolyAreas)
    var allPolyAreasFlatten = allPolyAreas.flatten();
    //print(allPolyAreasFlatten)
    var braidArea = ee.Number(allPolyAreasFlatten.reduce(ee.Reducer.sum())).subtract(vectorGeometry.area(1)).divide(2); //since the area taken two times
    var riverPlusBraidArea = ee.Number(allPolyAreasFlatten.reduce(ee.Reducer.sum())).subtract(braidArea);
    var riverArea = ee.Number(riverPlusBraidArea.subtract(braidArea));
    var braidAreaRatio = ee.Number(braidArea.divide(riverPlusBraidArea));
    return {'Year': year, 'braidArea':braidArea.divide(1000000), 'riverArea': riverArea.divide(1000000), 'braidAreaRatio':braidAreaRatio};
  };
  var river1BraidInfo = calculateBraidAreaRatio(river1, year1);
  var river2BraidInfo = calculateBraidAreaRatio(river2, year2);
  print('River 1 Braiding Information (km2)', river1BraidInfo, 'River 2 Braiding Information (km2)', river2BraidInfo);
  ///////////////////////////////////////////
  //Accretion/Erosion/Unchanged River Study//
  ///////////////////////////////////////////
  var unionRiver = river1.union(river2, ee.ErrorMargin(1));
  var unchangedRiver = river1.intersection(river2, ee.ErrorMargin(1));
  var accretion = river1.difference(unchangedRiver, ee.ErrorMargin(1));
  var erosion = river2.difference(unchangedRiver, ee.ErrorMargin(1));
  Map.addLayer(unchangedRiver,{color:'Blue', strokeWidth: 0},'Unchanged River:'+year1+'-'+year2, false);
  Map.addLayer(accretion,{color:'Green', strokeWidth: 0},'Accretion:'+year1+'-'+year2, false);
  Map.addLayer(erosion,{color:'Red', strokeWidth: 0},'Erosion:'+year1+'-'+year2, false);
  print('Unchanged, Accretion Erosion Area (km2) Year '+year1+'-'+year2,unchangedRiver.area().divide(1000000), accretion.area().divide(1000000), erosion.area().divide(1000000));
  //Visualization and export of unchanged/accretion/erosion map
  var riverFeatureImg = ee.Image().byte().paint(jamunaROI,0,3).paint(jamunaROI,1).paint(unchangedRiver,2).paint(accretion,3).paint(erosion,4);
  Map.addLayer(riverFeatureImg,{palette: ['black','WhiteSmoke', 'Blue', 'Green', 'Red'], min:0, max:4}, 'AccretionErosion'+year1+'-'+year2);
  Export.image.toDrive({
    image: riverFeatureImg.visualize({min:0, max:4, palette: ['black','WhiteSmoke', 'Blue', 'Green', 'Red'],  'forceRgbOutput':false}),
    description: 'AccretionErosion'+year1+'-'+year2,
    folder: 'EE_box',
    scale: 120, //reduced scale for exporting purpose only
    region: jamunaROI
  });
  ////////////////////////
  //Bank Migration Study//
  ////////////////////////
  // Create cross east west cross sections from Bahadurabad to Aricha
  var line = ee.Geometry.LineString({coords:[bahadurabadWLCoordinate, arichaWLCoordinate]});
  Map.addLayer(line,{},'Line', false);
  var distances = ee.List.sequence(0, line.length(), line.length().divide(n));
  //var cutlines = line.cutLines(distances).coordinates()
  print('Aerial length of river from Bahadurabad to Aricha (km)', line.length().divide(1000), 'distances for xsections to pass (m)',distances);
  var equiDistantPointsList = ee.List.sequence(0, n, 1).map(function (a) {
    return ee.List(ee.List(line.cutLines(distances).coordinates().get(a)).get(0));
  });
  //print('List of equi Distant points', equiDistantPointsList);
  var xsectionLength = 70000; //The length of XsectionLines
  //Function to create a WEST-EAST Line of specific length passing through a point
  var point2xsectionfunction = function(feature) {
    var point = ee.Geometry.Point(feature);
    var lon = point.coordinates().get(0), 
        lat = point.coordinates().get(1), 
        lon_east = ee.List(ee.List(point.buffer(xsectionLength/2).bounds().coordinates().get(0)).get(1)).get(0),
        lon_west = ee.List(ee.List(point.buffer(xsectionLength/2).bounds().coordinates().get(0)).get(0)).get(0);
    return ee.Algorithms.GeometryConstructors.LineString([lon_west, lat, lon_east, lat]);
    };
  var xsec = ee.Geometry.MultiLineString(equiDistantPointsList.map(point2xsectionfunction));
  print('Cross Sections',xsec);
  Map.addLayer(xsec, {}, 'cross sections', false);
  // Export the FeatureCollection to a SHP file.
  Export.table.toDrive({
    collection: ee.FeatureCollection([xsec]),
    description:'xsecSHP',
    folder: 'EE_box',
    fileFormat: 'SHP'
  });
  var channelWidthList1 = [];
  var braidWidthList1 = [];
  var totalWidthList1 = [];
  var leftPointList1 = [];
  var rightPointList1 = [];
  var centerPointList1 = [];
  var channelWidthList2 = [];
  var braidWidthList2 = [];
  var totalWidthList2 = [];
  var leftPointList2 = [];
  var rightPointList2 = [];
  var centerPointList2 = [];
  var centerLineShiftList = []; 
  var centerLineShiftDirection = [];
  var westBankShiftList = [];
  var westBankShiftDirection = [];
  var eastBankShiftList = [];
  var eastBankShiftDirection = [];
  //Shift Calculation Function for Bank and centerline Migration
  var shiftCalculationFunction = function(point1, point2, shiftValueList, shiftDirectionList){
    var distance = point1.distance(point2);
    var xCoord1 = point1.coordinates().get(0);
    var xCoord2 = point2.coordinates().get(0);
    var shiftValue = ee.Algorithms.If(ee.Number(xCoord2).gte(ee.Number(xCoord1)), distance, distance.multiply(ee.Number(-1)));
    var shiftDirection = ee.Algorithms.If(ee.Number(xCoord2).gte(ee.Number(xCoord1)), 'East', 'West');
    shiftValueList.push(shiftValue);  //shiftValue which is distance with sign not pushing in the list??? why? Works fine in separarate testing script.
    shiftDirectionList.push(shiftDirection);
  };
  for(var i = 0; i <= n; i++) {
    var xsecCurrent = ee.Geometry.LineString(xsec.coordinates().get(i));
    //print(xsecCurrent)
    //Calculation for River 1
    var riverGeometry1 = ee.Geometry.MultiPolygon(river1.coordinates());
    var intersect1 = xsecCurrent.intersection(riverGeometry1);
    var lineIntersects1 = ee.Geometry.MultiLineString(intersect1.coordinates()); //forced to multilinestring. Problem happens when there is no braids
    var leftPoint1 = ee.Geometry.Point(ee.List(ee.List(lineIntersects1.coordinates().get(0)).get(0))); //first item of the first list
    var rightPoint1 = ee.Geometry.Point(ee.List(ee.List(lineIntersects1.coordinates().get(-1)).get(-1))); //last item of the last list
    var totalLine1 = ee.Geometry.LineString([leftPoint1,rightPoint1]);
    var centerPoint1 = totalLine1.centroid();
    var channelLength1 = lineIntersects1.length();
    var totalLength1 = totalLine1.length();
    var braidLength1 = totalLength1.subtract(channelLength1);
    channelWidthList1.push(channelLength1);
    braidWidthList1.push(braidLength1);
    totalWidthList1.push(totalLength1);
    leftPointList1.push(leftPoint1.coordinates());
    rightPointList1.push(rightPoint1.coordinates());
    centerPointList1.push(centerPoint1.coordinates());
    //Calculation for River 2
    var riverGeometry2 = ee.Geometry.MultiPolygon(river2.coordinates());
    var intersect2 = xsecCurrent.intersection(riverGeometry2);
    var lineIntersects2 = ee.Geometry.MultiLineString(intersect2.coordinates());
    //print(lineIntersects1)
    //Map.addLayer(lineIntersects1, {color:'red'}, 'lineintersects'+i)
    var leftPoint2 = ee.Geometry.Point(ee.List(ee.List(lineIntersects2.coordinates().get(0)).get(0))); //first item of the first list
    var rightPoint2 = ee.Geometry.Point(ee.List(ee.List(lineIntersects2.coordinates().get(-1)).get(-1))); //last item of the last list
    var totalLine2 = ee.Geometry.LineString([leftPoint2,rightPoint2]);
    var centerPoint2 = totalLine2.centroid();
    var channelLength2 = lineIntersects2.length();
    var totalLength2 = totalLine2.length();
    var braidLength2 = totalLength2.subtract(channelLength2);
    channelWidthList2.push(channelLength2);
    braidWidthList2.push(braidLength2);
    totalWidthList2.push(totalLength2);
    leftPointList2.push(leftPoint2.coordinates());
    rightPointList2.push(rightPoint2.coordinates());
    centerPointList2.push(centerPoint2.coordinates());
    shiftCalculationFunction(centerPoint1, centerPoint2, centerLineShiftList, centerLineShiftDirection);
    shiftCalculationFunction(leftPoint1, leftPoint2, westBankShiftList, westBankShiftDirection);
    shiftCalculationFunction(rightPoint1, rightPoint2, eastBankShiftList, eastBankShiftDirection);
  }
  print('Cross Section wise Morphological Study Year: '+year1+'-'+year2);
  print('channel width (before)', channelWidthList1, 'braid width (before)' , braidWidthList1, 'total width (before)', totalWidthList1);
  print('channel width (after)', channelWidthList2, 'braid width (after)' , braidWidthList2, 'total width (after)', totalWidthList2);
  //print('left points (before)', leftPointList1, 'right points (before)', rightPointList1, 'center points (before)', centerPointList1);
  //print('left points (after)', leftPointList2, 'right points (after)', rightPointList2, 'center points (after)', centerPointList2);
  print('Center Shift Value', centerLineShiftList ,'Center Shift Direction', centerLineShiftDirection);
  print('West Bank Shift Value', westBankShiftList ,'West Bank Shift Direction', westBankShiftDirection);
  print('East Bank Shift Value', eastBankShiftList ,'East Bank Shift Direction', eastBankShiftDirection);
  Map.addLayer(ee.Geometry.MultiPoint(leftPointList1),{color:'MediumTurquoise'},'Left Bank Points '+year1, false);
  Map.addLayer(ee.Geometry.MultiPoint(rightPointList1),{color:'MediumTurquoise'},'Right Bank Points '+year1, false);
  Map.addLayer(ee.Geometry.MultiPoint(centerPointList1),{color:'cyan'},'Center Points '+year1, false);
  Map.addLayer(ee.Geometry.MultiPoint(leftPointList2),{color:'orange'},'Left Bank Points '+year2, false);
  Map.addLayer(ee.Geometry.MultiPoint(rightPointList2),{color:'orange'},'Right Bank Points '+year2, false);
  Map.addLayer(ee.Geometry.MultiPoint(centerPointList2),{color:'yellow'},'Center Points '+year2, false);
  Map.addLayer(ee.Geometry.MultiLineString(centerPointList1),{color:'cyan', width:5}, 'Center Line'+year1, false);
  Map.addLayer(ee.Geometry.MultiLineString(centerPointList2),{color:'yellow', width:5}, 'Center Line'+year2, false);
  Map.addLayer(ee.Geometry.MultiLineString(leftPointList1),{color:'MediumTurquoise', width:5}, 'West Bank Line'+year1, false);
  Map.addLayer(ee.Geometry.MultiLineString(leftPointList2),{color:'orange', width:5}, 'West Bank Line'+year2, false);
  Map.addLayer(ee.Geometry.MultiLineString(rightPointList1),{color:'MediumTurquoise', width:5}, 'East Bank Line'+year1, false);
  Map.addLayer(ee.Geometry.MultiLineString(rightPointList2),{color:'orange', width:5}, 'East Bank Line'+year2, false);
  var shiftFeatureImg = ee.Image().byte().paint(jamunaROI,0,3).paint(jamunaROI,1).paint(riverGeometry1,2).paint(riverGeometry2,3).paint(xsec,4)
    .paint(ee.Geometry.MultiLineString(leftPointList1),5,3).paint(ee.Geometry.MultiLineString(rightPointList1),6,3).paint(ee.Geometry.MultiLineString(centerPointList1),7,3)
    .paint(ee.Geometry.MultiLineString(leftPointList2),8,3).paint(ee.Geometry.MultiLineString(rightPointList2),9,3).paint(ee.Geometry.MultiLineString(centerPointList2),10,3)
    .paint(ee.Geometry.MultiPoint(leftPointList1).buffer(10),11,5).paint(ee.Geometry.MultiPoint(rightPointList1).buffer(10),12,5).paint(ee.Geometry.MultiPoint(centerPointList1).buffer(10),13,5)
    .paint(ee.Geometry.MultiPoint(leftPointList2).buffer(10),14,5).paint(ee.Geometry.MultiPoint(rightPointList2).buffer(10),15,5).paint(ee.Geometry.MultiPoint(centerPointList2).buffer(10),16,5);
  var palette1 = ['black','WhiteSmoke', 'SkyBlue', 'RoyalBlue', 'black', 'olive', 'olive', 'orange', 'orchid', 'orchid', 'purple', 'SeaGreen', 'SeaGreen', 'OrangeRed', 'DarkMagenta', 'DarkMagenta', 'Maroon'];
  Map.addLayer(shiftFeatureImg,{
    palette: palette1
    , min:0, max:16}, 'Bank Migration Image'+year1+'-'+year2);
  Export.image.toDrive({
    image: shiftFeatureImg.visualize({min:0, max:16, 
    palette: palette1,
    'forceRgbOutput':false}),
    description: 'ShiftLines'+year1+'-'+year2,
    folder: 'EE_box',
    scale: 120, //reduced scale for exporting purpose only
    region: jamunaROI
  });
  ///////////
  //UI map //
  ///////////
  //Split Map
  var map1 = ui.Map();
  map1.add(ui.Label('SNG Composite Year '+year1));
  map1.addLayer(imageYear1, {bands: ['SWIR1', 'NIR', 'Green'], min:0, max:0.3, gamma: 0.75},'Year '+year1);
  map1.setControlVisibility(false);
  var map2 = ui.Map();
  map2.add(ui.Label('SNG Composite Year '+year2));
  map2.addLayer(imageYear2, {bands: ['SWIR1', 'NIR', 'Green'], min:0, max:0.3, gamma: 0.75},'Year '+year2);
  map2.setControlVisibility(false);
  var map3 = ui.Map();
  map3.add(ui.Label('Accretion/Erosion '+year1+'-'+year2));
  map3.addLayer(riverFeatureImg,{palette: ['black','WhiteSmoke', 'Blue', 'Green', 'Red'], min:0, max:4}, 'AccretionErosion '+year1+'-'+year2);
  map3.setControlVisibility(false);
  var map4 = ui.Map();
  map4.add(ui.Label('Bank Migration '+year1+'-'+year2));
  map4.addLayer(shiftFeatureImg,{palette: palette1, min:0, max:16}, 'Bank Shift '+year1+'-'+year2);
  map4.setControlVisibility(false);
  var linker = ui.Map.Linker([map1, map2, map3, map4]);
  // Create a grid of maps.
  var mapGrid = ui.Panel(
      [
        ui.Panel(map1 ,null, {border: 'solid', stretch:'both'}),
        ui.Panel(map2 ,null, {border: 'solid', stretch:'both'}),
        ui.Panel(map3 ,null, {border: 'solid', stretch:'both'}),
        ui.Panel(map4 ,null, {border: 'solid', stretch:'both'}),
      ],
      ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
  map1.setCenter(89.68,24.46, 10);
  //Result Panel
  var resultPanel = ui.Panel({style: {border: 'solid', width: '450px'}}).add(ui.Label('Results', titleTextVis));
  resultPanel.add(ui.Label('River Braiding Information in '+year1,subTextVis));
  var resultBraidInfoRiver1ChannelArea = ui.Label('Channel Area (km2): Loading...',numberVIS);
  var resultBraidInfoRiver1BraidArea = ui.Label('Braid Area (km2): Loading...',numberVIS);
  var resultBraidInfoRiver1BraidAreaRatio = ui.Label('Braid Area Ratio: Loading...',numberVIS);
  resultPanel.add(resultBraidInfoRiver1ChannelArea);
  resultPanel.add(resultBraidInfoRiver1BraidArea);
  resultPanel.add(resultBraidInfoRiver1BraidAreaRatio);
  ee.Dictionary(river1BraidInfo).getNumber('riverArea').evaluate(function(value){resultBraidInfoRiver1ChannelArea.setValue('Channel Area (km2): '+value)});
  ee.Dictionary(river1BraidInfo).getNumber('braidArea').evaluate(function(value){resultBraidInfoRiver1BraidArea.setValue('Braid Area (km2): '+value)});
  ee.Dictionary(river1BraidInfo).getNumber('braidAreaRatio').evaluate(function(value){resultBraidInfoRiver1BraidAreaRatio.setValue('Braid Area Ratio: '+value)});
  resultPanel.add(ui.Label('River Braiding Information in '+year2,subTextVis));
  var resultBraidInfoRiver2ChannelArea = ui.Label('Channel Area (km2): Loading...',numberVIS);
  var resultBraidInfoRiver2BraidArea = ui.Label('Braid Area (km2): Loading...',numberVIS);
  var resultBraidInfoRiver2BraidAreaRatio = ui.Label('Braid Area Ratio: Loading...',numberVIS);
  resultPanel.add(resultBraidInfoRiver2ChannelArea);
  resultPanel.add(resultBraidInfoRiver2BraidArea);
  resultPanel.add(resultBraidInfoRiver2BraidAreaRatio);
  ee.Dictionary(river2BraidInfo).getNumber('riverArea').evaluate(function(value){resultBraidInfoRiver2ChannelArea.setValue('Channel Area (km2): '+value)});
  ee.Dictionary(river2BraidInfo).getNumber('braidArea').evaluate(function(value){resultBraidInfoRiver2BraidArea.setValue('Braid Area (km2): '+value)});
  ee.Dictionary(river2BraidInfo).getNumber('braidAreaRatio').evaluate(function(value){resultBraidInfoRiver2BraidAreaRatio.setValue('Braid Area Ratio: '+value)});  
  resultPanel.add(ui.Label('Unchanged, Accretion Erosion Area (km2) Year '+year1+'-'+year2,subTextVis));
  var resultUnchangedRiver = ui.Label('Unchanged River Area (km2): Loading...',numberVIS);
  var resultAccretion = ui.Label('Accretion Area (km2): Loading...',numberVIS);
  var resultErosion = ui.Label('Erosion Area (km2): Loading...',numberVIS);
  resultPanel.add(resultUnchangedRiver);
  resultPanel.add(resultAccretion);
  resultPanel.add(resultErosion);
  unchangedRiver.area().divide(1000000).evaluate(function(value){resultUnchangedRiver.setValue('Unchanged River Area (km2): '+value)});
  accretion.area().divide(1000000).evaluate(function(value){resultAccretion.setValue('Accretion Area (km2): '+value)});
  erosion.area().divide(1000000).evaluate(function(value){resultErosion.setValue('Erosion Area (km2): '+value)});
  var widthBeforeArray = ee.Array.cat([ee.Array(channelWidthList1), ee.Array(braidWidthList1), ee.Array(totalWidthList1)], 1);
  var widthAfterArray = ee.Array.cat([ee.Array(channelWidthList2), ee.Array(braidWidthList2), ee.Array(totalWidthList2)], 1);
  var xsecArray = ee.Array(ee.List.sequence(0, line.length().divide(1000), line.length().divide(1000).divide(n)));
  var chartWidthBefore = ui.Chart.array.values(widthBeforeArray, 0, xsecArray)
    .setSeriesNames(['Channel Width', 'Braid Width', 'Total Width'])
    //.setChartType('ColumnChart')
    .setOptions({
      title: 'Width of the River '+year1,
      hAxis: {'title': 'Chainage (km)'},
      vAxis: {'title': 'Width (m)'},
      legend: {'position': 'bottom' },
      pointSize: 3,
      lineWidth: 1,
      height: 150
  });
  var chartWidthAfter = ui.Chart.array.values(widthAfterArray, 0, xsecArray)
    .setSeriesNames(['Channel Width', 'Braid Width', 'Total Width'])
    //.setChartType('ColumnChart')
    .setOptions({
      title: 'Width of the River '+year2,
      hAxis: {'title': 'Chainage (km)'},
      vAxis: {'title': 'Width (m)'},
      legend: {'position': 'bottom' },
      pointSize: 3,
      lineWidth: 1,
      height: 150
  });
  resultPanel.add(chartWidthBefore);
  resultPanel.add(chartWidthAfter);
  var bankShiftArray = ee.Array.cat([ee.Array(westBankShiftList), ee.Array(eastBankShiftList), ee.Array(centerLineShiftList)], 1);
  var chartBankShift = ui.Chart.array.values(bankShiftArray, 0, xsecArray)
    .setSeriesNames(['West Bank', 'East Bank', 'Mid Line'])
    .setChartType('ColumnChart')
    .setOptions({
      title: 'Bank Shift '+year1+'-'+year2,
      hAxis: {'title': 'Chainage (km)'},
      vAxis: {'title': 'Migration (m)', viewWindow:{max:1000, min:-1000}},
      pointSize: 3,
      lineWidth: 1,
      height: 150
  });
  resultPanel.add(chartBankShift);
  // Add the maps and title to the ui.root.
  ui.root.widgets().reset([panel,mapGrid,resultPanel]);
  ui.root.setLayout(ui.Panel.Layout.Flow('horizontal'));
};
// Add the panel to the ui.root.
var mapPanel = ui.Map();
mapPanel.centerObject(jamunaROI,10);
//ui.root.add(panel);
//ui.root.add(mapPanel);
ui.root.widgets().reset([panel,mapPanel]);