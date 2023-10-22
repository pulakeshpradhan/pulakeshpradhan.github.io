var DEM = ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    landforms = ee.Image("CSP/ERGo/1_0/Global/ALOS_landforms"),
    countries = ee.FeatureCollection("USDOS/LSIB/2013");
var ISO = 'MMR' //DRC
var studyArea = countries.filter(ee.Filter.eq('iso_alpha3', ISO));
//Map.addLayer(area, {},'Myanmar',false)
var classStruct = {
  'Unknown': {number: 0, color: '6f6f6f'},
  'Surface water': {number: 1, color: 'aec3d4'},
  'Forest': {number: 2, color: '152106'}, 
  'Urban and built up': {number: 3, color: 'cc0013'}, 
  'Cropland' : {number: 4, color: '8dc33b'},
  'Rubber': {number: 5, color: 'FFFF00'}, 
  'Palmoil': {number: 6, color: '800080'},
  'Mangrove': {number: 7, color: '111149'}
};
//////////////////////////////////////////////////////////////////////
//elevation
//////////////////////////////////////////////////////////////////////
var min = 100;
var max = 1500;
var step = 100;
var map_color_saturation = 0.5; // how colorful the colors are (>0 up to 1)
var DEM = DEM.select('AVE')
var DEM = DEM.updateMask(DEM.gt(0)).clip(studyArea)
//=== contours
// source: https://groups.google.com/d/msg/google-earth-engine-developers/RhqK4cGI6pA/i4K95oGFAwAJ
var levels = ee.List.sequence(min, max, step);
var contours = levels.map(function(level) {
  var contour = DEM
    .resample('bicubic')
    .convolve(ee.Kernel.gaussian(5, 3))
    .subtract(ee.Image.constant(level)).zeroCrossing() // line contours
    // .gt(ee.Image.constatn(level)) // area
    .multiply(ee.Image.constant(level)).toFloat();
  return contour.mask(contour);
});
contours = ee.ImageCollection(contours).mosaic();
//=== terrain map
var hillshade = ee.Terrain.hillshade(DEM);
var DEM_normalized = DEM.subtract(min).divide(max-min);
// hue from green for low elevations via yellow to red for high elevations:
var palettes = require('users/gena/packages:palettes')
var DEM_styled = DEM.visualize({ min: min, max: max, palette: palettes.cb.BrBG[11] }).unitScale(0, 255)
var terrain = DEM_styled.rgbToHsv().addBands(hillshade.divide(256).rename('value'), ['value'], true).hsvToRgb()
terrain = terrain.visualize().blend(contours.visualize({palette: ['000000'], opacity: 0.5}));
Map.addLayer(terrain,{}, 'Terrain', false);
////////////////////////////////////////////////////////////////////////////////////////
function renameBands(collection,name){
  return collection.map(function(img){return img.rename(name)});
}
var cropland = renameBands(ee.ImageCollection("users/servirmekong/rubber/cropland"),"cropland");
var forest = renameBands(ee.ImageCollection("users/servirmekong/rubber/forest"),"forest");
var palmoil = renameBands(ee.ImageCollection("users/servirmekong/rubber/palmoil"),"palmoil");
var rubber = renameBands(ee.ImageCollection("users/servirmekong/rubber/rubber"),"rubber");
var urban = renameBands(ee.ImageCollection("users/servirmekong/rubber/urban"),"urban");
var water = renameBands(ee.ImageCollection("users/servirmekong/rubber/water"),"water");
var mangrove = renameBands(ee.ImageCollection("users/servirmekong/rubber/mangrove"),"mangrove");
var nodeStruct = 
  { 'MGR':  {band: 'mangrove', threshold: 37, left: 'terminal', leftName: 'Mangrove', right: 'CRP'},
    'CRP':  {band: 'cropland', threshold: 48, left: 'terminal', leftName: 'Cropland', right: 'PAL'},
    'PAL':  {band: 'palmoil', threshold: 49, left: 'terminal', leftName: 'Palmoil', right: 'FOR'},
    'FOR':  {band: 'forest', threshold: 49, left: 'terminal', leftName: 'Forest', right: 'RUB'},
    'RUB':  {band: 'rubber', threshold: 48, left: 'terminal', leftName: 'Rubber', right: 'WAT'},
    'WAT':  {band: 'water', threshold: 47, left: 'terminal', leftName: 'Surface water', right: 'URB'},
    'URB':  {band: 'urban', threshold: 60, left: 'terminal', leftName: 'Urban and built up',right: 'terminal',rightName:"Unknown"}
  };
//////////////////////////////////////////////////
//rubber probability/////////////////////////////
//////////////////////////////////////////////////
var rubber_MMU05ha_2017 = ee.Image("users/KarisTenneson/MyanmarRubberPlantations/RubberPlantations2017_half_ha");
var rubber_MMU05ha = ee.Image("users/KarisTenneson/MyanmarRubberPlantations/RubberPlantations2018_half_ha");
var img2017 = ee.Image("users/servirmekong/rubber/assemblage/landcover2017");
var img2018 = ee.Image("users/servirmekong/rubber/assemblage/landcover2018");
var probs2017 = ee.Image("users/servirmekong/rubber/assemblage/probsRubber2017");
var probs2018 = ee.Image("users/servirmekong/rubber/assemblage/probsRubber2018");
// create vizualization parameters
var viz = {min:0, max:100, palette:['ffffff','d600ff']};
Map.addLayer(probs2018, viz, "Rubber plantation Probability", false);
// The starting id, i.e. the first decision
var startId = 'MGR';
var start = ee.Date.fromYMD(2017,1,1)
var end = ee.Date.fromYMD(2017,12,31)
var croplandImg = ee.Image(cropland.filterDate(start,end).first())
Map.addLayer(croplandImg,{min:0,max:100,palette:"white,gray,black"}, 'cropland', false)
var mangroveImg = ee.Image(mangrove.filterDate(start,end).first())
var forestImg = ee.Image(forest.filterDate(start,end).first())
var palmoilImg = ee.Image(palmoil.filterDate(start,end).first())
var rubberImg = ee.Image(rubber.filterDate(start,end).first())
var urbanImg = ee.Image(urban.filterDate(start,end).first())
var waterImg = ee.Image(water.filterDate(start,end).first())
var image = newCollectionToImage(ee.ImageCollection(ee.List([croplandImg,mangroveImg,forestImg,palmoilImg,rubberImg,urbanImg,waterImg])))   
// Get list of class names, probability layer names, and palette colors
var classNamesList = getIds(classStruct);
var probNames = cleanList(classNamesList);
var classNames = ee.List(classNamesList);
var classNumbers = getList(classStruct,'number');
var PALETTE_list = getList(classStruct,'color');
// The initial decision tree string (DO NOT CHANGE)
var DTstring = ['1) root 9999 9999 9999'];
print(nodeStruct)
print(classStruct)
print(startId)
// Call the function to construct the decision tree string (DO NOT CHANGE)
DTstring = decision(nodeStruct,classStruct,startId,1,DTstring).join("\n");
print(DTstring)
var classifier = ee.Classifier.decisionTree(DTstring);
print(classifier)
var assemblage = image.classify(classifier);
var PALETTE = PALETTE_list.join(',');
var img = ee.Image("users/servirmekong/rubber/palmoil/palmoil2018").gt(-1)
var nIter = 10
var assemblage = ee.ImageCollection(ee.List.sequence(0,nIter).map(function(j){
  var sd = 5.2
  var forestImg = ee.Image(forest.filterDate(start,end).first());
  var rand = ee.Image(img).multiply(ee.Image.random(ee.Number(135).multiply(j))).subtract(0.5).multiply(2).multiply(sd);
  forestImg = forestImg.add(rand)
  var sd = 27
  var palmoilImg = ee.Image(palmoil.filterDate(start,end).first());
  var rand = ee.Image(img).multiply(ee.Image.random(ee.Number(13).multiply(j))).subtract(0.5).multiply(2).multiply(sd);
  palmoilImg = palmoilImg.add(rand)
  var sd = 31
  var rubberImg = ee.Image(rubber.filterDate(start,end).first());
  var rand = ee.Image(img).multiply(ee.Image.random(ee.Number(23).multiply(j))).subtract(0.5).multiply(2).multiply(sd);
  rubberImg = rubberImg.add(rand)
  var sd = 11
  var mangroveImg = ee.Image(mangrove.filterDate(start,end).first());
  var rand = ee.Image(img).multiply(ee.Image.random(ee.Number(24523).multiply(j))).subtract(0.5).multiply(2).multiply(sd);
  mangroveImg = mangroveImg.add(rand)
  var sd = 1
  var urbanImg = ee.Image(urban.filterDate(start,end).first());
  var rand = ee.Image(img).multiply(ee.Image.random(ee.Number(123).multiply(j))).subtract(0.5).multiply(2).multiply(sd);
  urbanImg = urbanImg.add(rand)
  var sd = 6
  var waterImg = ee.Image(water.filterDate(start,end).first());
  var rand = ee.Image(img).multiply(ee.Image.random(ee.Number(103243).multiply(j))).subtract(0.5).multiply(2).multiply(sd);
  waterImg = waterImg.add(rand)
  var sd = 32
  var croplandwaterImg = ee.Image(cropland.filterDate(start,end).first());
  var rand = ee.Image(img).multiply(ee.Image.random(ee.Number(4243).multiply(j))).subtract(0.5).multiply(2).multiply(sd);
  waterImg = waterImg.add(rand)
  var image = newCollectionToImage(ee.ImageCollection(ee.List([croplandImg,mangroveImg,forestImg,palmoilImg,rubberImg,urbanImg,waterImg])))   
  var assemblage = image.classify(classifier);
  return assemblage
}))
print(assemblage)
/*
assemblage = assemblage.map(function(img){
  return img = img.mask(img.neq(0))
})*/
Map.centerObject(assemblage, 11)
var studyArea = ee.FeatureCollection("users/KarisTenneson/MyanmarRubberPlantations/StudyRegion").geometry()
var Mode = ee.Image(assemblage.mode()).unmask(0).clip(studyArea)
////////////////////////////////////////////////////////
//Probability///////////////////////////////////////////
///////////////////////////////////////////////////////
var rubber_MMU05ha_2017 = ee.Image("users/KarisTenneson/MyanmarRubberPlantations/RubberPlantations2017_half_ha");
var rubber_MMU05ha = ee.Image("users/KarisTenneson/MyanmarRubberPlantations/RubberPlantations2018_half_ha");
var img2017 = ee.Image("users/servirmekong/rubber/assemblage/landcover2017");
var img2018 = ee.Image("users/servirmekong/rubber/assemblage/landcover2018");
var probs2017 = ee.Image("users/servirmekong/rubber/assemblage/probsRubber2017");
var probs2018 = ee.Image("users/servirmekong/rubber/assemblage/probsRubber2018");
// create vizualization parameters
var viz = {min:0, max:100, palette:['ffffff','d600ff']};
Map.addLayer(probs2018, viz, "Probability of rubber plantation 2018", false);
////////////////////////////////////////////////
//land cover////////////////////////////////////
//////////////////////////////////////////////
//Map.addLayer(assemblage,{palette:PALETTE,min:0,max:classNamesList.length-1},"assemblage");
  var classProbabilities = ee.ImageCollection.fromImages(classNumbers.map(function(classNumber){
    classNumber = ee.Number(classNumber);
    var out = assemblage.map(function(img){return img.eq(classNumber)}).sum().divide(nIter);
    return out.float();
  }));
Map.addLayer(DEM, {}, 'elevation', false)
var probs = classProbabilities.max().multiply(100).unmask(100).clip(studyArea)
//Map.addLayer(probs,{min:0,max:100,palette:"red,orange,yellow,green,darkgreen"},"probability", false);
var training = ee.FeatureCollection("users/servirmekong/rubber/rubberClasses6");
var palmoil = training.filter(ee.Filter.eq("type","palmoil"));
var rubber = training.filter(ee.Filter.eq("type","rubber"));
Map.addLayer(Mode,{palette:PALETTE,min:0,max:classNamesList.length-1},"Land Cover 2018");
Map.addLayer(palmoil.draw("yellow"),{},"palmoil training data");
Map.addLayer(rubber.draw("orange"),{},"rubber training data");
//calculate land cover category.
var sum = Mode.reduceRegion({
  reducer: ee.Reducer.mean().group({
    groupField: classNames,
    groupName: 'type',
  }),
  geometry: studyArea,
  scale: 10,
  maxPixels: 1e8
});
// Print the resultant Dictionary.
print(sum);
////////////////////////////////////////////////
//stand age////////////////////////////////////
///////////////////////////////////////////////
var rubber_MMU05ha_2017 = ee.Image("users/KarisTenneson/MyanmarRubberPlantations/RubberPlantations2017_half_ha");
var rubber_MMU05ha = ee.Image("users/KarisTenneson/MyanmarRubberPlantations/RubberPlantations2018_half_ha");
var img2017 = ee.Image("users/servirmekong/rubber/assemblage/landcover2017")
var img2018 = ee.Image("users/servirmekong/rubber/assemblage/landcover2018")
var probs2017 = ee.Image("users/servirmekong/rubber/assemblage/Probs2017")
var probs2018 = ee.Image("users/servirmekong/rubber/assemblage/probs2018")
var lossyear = ee.Image("UMD/hansen/global_forest_change_2017_v1_5").select("lossyear");
var rubber = img2018.mask(img2018.eq(5));
function sieve(image,mmu){
var connected = image.connectedPixelCount(mmu+20);
var elim = connected.gt(mmu);
var mode = image.focal_mode(mmu/2,'circle');
mode = mode.mask(image.mask());
var filled = image.where(elim.not(),0);
return filled;
}
Map.addLayer(rubber,{palette: 'black'},"Rubber plantations before applying MMU", false);
rubber = sieve(rubber, 50);
var ExportName = "RubberPlantations2018_half_ha";
var FullExportName = 'users/KarisTenneson/MyanmarRubberPlantations/' + ExportName;
Export.image.toAsset({image:rubber,
                      description:ExportName,
                      assetId: FullExportName,
                      scale:10,
                      maxPixels:1e13,
                      region:rubber.geometry().bounds() 
                      });
Map.addLayer(lossyear.mask(rubber_MMU05ha),{min:0,max:12,palette:['006400', '00ff00','ffff00', 'ffa500', 'ff0000']},"Rubber plantation, establishment year (green=older; red=younger)", false);
var rubber_year = lossyear.mask(rubber_MMU05ha)
Export.image.toAsset({image:rubber_year,
                      description:"rubber_plantation_age",
                      assetId: FullExportName,
                      scale:10,
                      maxPixels:1e13,
                      region:rubber.geometry().bounds() 
                      });
// create vizualization parameters
var viz = {min:2000, max:2017, palette:['006400', '00ff00','ffff00', 'ffa500', 'ff0000']};
Export.image.toAsset({image:Mode,
                      assetId:"rubber/assemblage/lc2018",
                      description:"assemblage",
                      region:studyArea.bounds(),
                      scale:10,
                     // pyramidingPolicy:"mode",
                      maxPixels:1e13})
Export.image.toAsset({image:probs.toInt16(),
                      assetId:"rubber/assemblage/probs2017",
                      description:"probs",
                      region:studyArea.bounds(),
                      scale:10,
                     // pyramidingPolicy:"mode",
                      maxPixels:1e13})
////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
// Function to convert a dictionary of nodes into a decision tree string
function decision(nodeStruct,classStruct,id,node,DTstring){
  // Extract parameters
  var lnode = 2*node; // left child node number
  var rnode = lnode + 1; // right child node number
  var dict = nodeStruct[id]; // current dictionary
  var band = dict.band; // decision band
  var threshold = dict.threshold; // decision threshold
  var left = dict.left; // left result (either 'terminal' or new id)
  var right = dict.right; // right result (either 'terminal' or new id)
  var leftName = dict.leftName; // left class name (if 'terminal')
  var rightName = dict.rightName; // right class name (if 'terminal')
  var leftLine = '';
  var rightLine = '';
  var leftNumber = 0;
  var rightNumber = 0;
  // Add the left condition and right condition strings to the current decision 
  // tree string. If either condition is non-terminal, recursively call the 
  // function.
  if (left == 'terminal') { // left terminal condition
    leftNumber = classStruct[leftName]['number'];
    leftLine = lnode + ') ' + band + '>=' + threshold + ' 9999 9999 ' + leftNumber + ' *';
    DTstring.push(leftLine);
    if (right == 'terminal') { // right terminal condition
      rightNumber = classStruct[rightName]['number'];
      rightLine = rnode + ') ' + band + '<' + threshold + ' 9999 9999 ' + rightNumber + ' *';
      DTstring.push(rightLine);
      return DTstring;
    } else { // right non-terminal condition
      rightLine = rnode + ') ' + band + '<' + threshold + ' 9999 9999 9999';
      DTstring.push(rightLine);
      return decision(nodeStruct,classStruct,right,rnode,DTstring);
    }
  } else { // left non-terminal condition
    leftLine = lnode + ') ' + band + '>=' + threshold + ' 9999 9999 9999';
    DTstring.push(leftLine);
    DTstring = decision(nodeStruct,classStruct,left,lnode,DTstring);
    if (right == 'terminal') { // right terminal condition
      rightNumber = classStruct[rightName]['number'];
      rightLine = rnode + ') ' + band + '<' + threshold + ' 9999 9999 ' + rightNumber + ' *';
      DTstring.push(rightLine);
      return DTstring;
    } else { // right non-terminal
      rightLine = rnode + ') ' + band + '<' + threshold + ' 9999 9999 9999';
      DTstring.push(rightLine);
      return decision(nodeStruct,classStruct,right,rnode,DTstring);
    }
  }
  return DTstring;
}
///////////////////////////////////////////////////////////////////////////////
// Function to get a list of column values from a structure
function getList(struct,column){
  return Object.keys(struct).map(function(k){
    var value = struct[k][column];
    return value;
  });
}
///////////////////////////////////////////////////////////////////////////////
// Function to get a list of ids (keys) from a structure
function getIds(struct){
  return Object.keys(struct);
}
///////////////////////////////////////////////////////////////////////////////
// Function to replace spaces with underscores in a list of strings
function cleanList(list){
  return list.map(function(name){
    return name.replace(/\s+/g,'_'); 
  });
}
///////////////////////////////////////////////////////////////////////////////
// Helper function to convert image collection into stack of image bands
function newCollectionToImage(collection){
  var stack = ee.Image(collection.iterate(function(img, prev) {
    return ee.Image(prev).addBands(img);
  }, ee.Image(1)));
  stack = stack.select(ee.List.sequence(1, stack.bandNames().size().subtract(1)));
  return stack;
}
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < classNamesList.length; i++){
  legend.add(makeRow(PALETTE_list[i],classNamesList[i]));
}
// Add the legend to the map.
Map.add(legend)
//legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
/*
var crop2017 = ee.Image(cropland.filterDate("2017-01-01","2017-12-31").first())
var crop2018 = ee.Image(cropland.filterDate("2018-01-01","2018-12-31").first())
Map.addLayer(crop2017.subtract(crop2018),{min:-20,max:20,palette:"red,yellow,green,darkgreen,green,yellow,red"})
var urban2017 = ee.Image(urban.filterDate("2017-01-01","2017-12-31").first())
var urban2018 = ee.Image(urban.filterDate("2018-01-01","2018-12-31").first())
Map.addLayer(urban2017.subtract(urban2018),{min:-50,max:50,palette:"red,yellow,green,darkgreen,green,yellow,red"})
Map.addLayer(urban2017,{min:0,max:100,palette:"white,gray,black"})
Map.addLayer(urban2018,{min:0,max:100,palette:"white,gray,black"})*/