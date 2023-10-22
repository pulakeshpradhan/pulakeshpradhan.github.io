var table = ui.import && ui.import("table", "table", {
      "id": "users/bfscott1906/Breeding/SEM_Piranga_ludoviciana_breeding"
    }) || ee.FeatureCollection("users/bfscott1906/Breeding/SEM_Piranga_ludoviciana_breeding");
var AAA = table; // For Individuals 
// // var BBB = table3
//Pheucticus aureoventris
// var AAA = SEM.filter(ee.Filter.eq('species', 'Pheucticus_chrysogaster.csv')) 
// var AAA = Offical.filter(ee.Filter.eq('SCINAME', 'Piranga rubriceps'))   
Map.addLayer(AAA, {color: 'Blue'}, 'SEM Range');
// Map.addLayer(BBB, {color: 'Red'}, 'Offical Range')
// Create a sequence for years and months
var yearsX = ee.List.sequence(2000, 2019);
var months = ee.List.sequence(1, 12);
///// Calculate Tree Cover, normalize by Surface Area ////////////////
// Read in MODIS DATA sets
var modisLandcover = ee.ImageCollection("MODIS/006/MCD12Q1")
var filtered = modisLandcover.filter(
  ee.Filter.date('2001-01-01', '2001-12-31'))
var landcover2018 = ee.Image(filtered.first())
var classified = landcover2018.select('LC_Type1')
var palette = ['05450a', '086a10', '54a708',
'78d203', '009900', 'c6b044','dcd159', 
'dade48', 'fbff13', 'b6ff05', '27ff87',
'c24f44', 'a5a5a5', 'ff6d4c', '69fff8',
'f9ffa4', '1c0dff']
///////////////////////////////////////////////////////////////////////////////////
// Input data for each species 
///////////////////////////////////////////////////////////////////////////////////
////////////////// NDVI ///////////////////////
var MOD13Q1 = ee.ImageCollection('MODIS/006/MOD13A1').select('NDVI')
var ndviFilter = MOD13Q1.filter(
  ee.Filter.date('2000-01-01', '2018-12-31'))
var ndvi = ee.Image(ndviFilter.mean())
var ndviVis = {
  min: -2000,
  max: 8000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
var SpeciesNDVIcover = ndvi.clip(AAA) // Change species name here 
Map.addLayer(SpeciesNDVIcover, ndviVis,'Species NDVI');
// Compute the weighted mean of the NDWI image clipped to the region.
var meanNDVI = ndvi.clip(AAA)
  .reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: AAA,
    scale: 8000});
print('mean NDVI:', meanNDVI);
///////////////// EVI ///////////////////////
var MOD13Q1 = ee.ImageCollection('MODIS/006/MOD13A1').select('EVI')
var eviFilter = MOD13Q1.filter(
  ee.Filter.date('2000-01-01', '2018-12-31'))
var evi = ee.Image(eviFilter.mean())
var eviVis = {
  min: -2000,
  max: 8000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
var SpeciesEVIcover = evi.clip(AAA) // Change species name here 
Map.addLayer(SpeciesEVIcover, eviVis,'Species EVI');
// Compute the weighted mean of the EVI image clipped to the region.
var meanEVI = evi.clip(AAA)
  .reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: AAA,
    scale: 8000});
print('mean EVI:', meanEVI);
// Load in the most recent Hansen global forest change dataset 
var hansen2019 = ee.Image("UMD/hansen/global_forest_change_2019_v1_7").clip(AAA);
print(hansen2019, 'hansen 2019 full');
// Select the tree cover band
var treeCover = hansen2019.select(['treecover2000']);
// var forestCover = treeCover.gte(30);
Map.addLayer(treeCover.mask(treeCover), {palette: ['000000', '00FF00'], min: 0, max: 100}, 'Forest Cover');
// Area calculation for images is done using the ee.Image.pixelArea() function
// This function creates an image where each pixel's value is the area of the pixel
// We multiply this pixel area image with our image.
// Convert the pixel data to square meters and then divide by 1e6 to get km2
var treeCoverAreaImage = treeCover.multiply(ee.Image.pixelArea()).divide(1e6);
print(treeCoverAreaImage, 'treeCoverAreaImage');
// come up with summary stat for each year 
// Reduce the loss area image to an object with a summed value for each year
var TREESOff = treeCoverAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: AAA,
  scale: 200, 
  bestEffort: true,// ran most on 90  // 30m resolution
  // maxPixels: 1e15 // due to the size of the geometry we may exceed the maxPixels allowed, so we increase this to a large value
});
print(TREESOff, 'Total Trees');
// Calculate Area 
var stateArea = AAA.geometry().area()
var stateAreaSqKm = ee.Number(stateArea).divide(1e6).round()
print(stateAreaSqKm, 'Area km2')
// //////////////////////////////////////////////////
// // Land Cover Stats ////
// //////////////////////////////////////////////////
//Clip the classified image to the state boundary
var AAALandcover = classified.clip(AAA)
Map.addLayer(AAALandcover, {min:1, max:17, palette: palette}, 'Species Landcover 2018')
// Area Calculation for Features
// This is a very simple operation and you can call .area() function to get area for a feature or a geometry
// Calling .geometry() on a feature collection gives the dissolved geometry of all features in the collection
// .area() function calculates the area in square meters
var stateArea = AAA.geometry().area()
// We can cast the result to a ee.Number() and calculate the area in square kilometers
var stateAreaSqKm = ee.Number(stateArea).divide(1e6).round()
print(stateAreaSqKm)
// Area Calculation for Images (Single Class)
// If the image contains values 0 or 1, we can calculate the total area using reduceRegion() function
// Let's select the pixels classified as 'Urban Areas' and calculate total urban area in the state
// The classification scheme used here assigned value 13 for Urban and Built-up Lands
var urban = AAALandcover.eq(13)
// // The result of .eq() operation is a binary image with pixels values of 1 where the condition matched and 0 where it didn't
// Area calculation for images is done using the ee.Image.pixelArea() function
// This function creates an image where each pixel's value is the area of the pixel
// We multiply this pixel area image with our image.
// Since our image has only 0 and 1 pixel values, the urban pixels will have values equal to their area
var areaImage = urban.multiply(ee.Image.pixelArea())
// Now that each pixel for built-up class in the image has the value equal to its area,
// we can sum up all the values in the state to get the total built-up area.
var area = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: AAA.geometry(),
  scale: 500,
  maxPixels: 1e10
  })
// The result of the reduceRegion() function is a dictionary with the key being the band name.
// We can extract the area number and convert it to square kilometers
var urbanAreaSqKm = ee.Number(area.get('LC_Type1')).divide(1e6).round()
print(urbanAreaSqKm)
// Area Calculation by Class
// We learnt how to calculate area for a single class. 
// But typically when you have a classified image, you want to compute area covered by each class
// We follow a similar process as before, but now we need to use a 'Grouped Reducer'
// https://developers.google.com/earth-engine/reducers_grouping
// We take the ee.Image.pixelArea() image and add the classified image as a new band
// This band will be used by the grouped reduced to categorize the results
var areaImage = ee.Image.pixelArea().addBands(AAALandcover)
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: AAA.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
print(areas)
// The result of reduceRegion() with a grouped reducer is a dictionary of dictionaries for each class
// The top level dictionary has a single key named 'groups'
// We can extract the individual dictionaries and merge them into a single one
var classAreas = ee.List(areas.get('groups'))
//Apply a function using .map() function to iterate over each class item
//We extract the class and area numbers and return a list for each class
//The result is a list of lists
// Important to note that dictionary key must be of type 'string'
// Our keys are class numbers, so we call .format() to convert the number to string
var classAreaLists = classAreas.map(function(item) {
  var areaDict = ee.Dictionary(item)
  var classNumber = ee.Number(areaDict.get('class')).format()
  var area = ee.Number(areaDict.get('sum')).divide(1e6).round()
  return ee.List([classNumber, area])
})
print(classAreaLists)
// Introducting flatten()
// flatten() is an important function in Earth Engine required for data processing
// It takes a nested list and converts it to a flat list
// Many Earth Engine constructors such a ee.Dictionary, ee.FeatureCollection etc. expect a flat list
// So before creating such objects with nested objects, we must convert them to flat structures
var nestedList = ee.List([['a', 'b'], ['c', 'd'], ['e', 'f']])
print(nestedList)
print(nestedList.flatten())
// We can now create a dictionary using ee.Dictionary which accepts a list of key/value pairs
var result = ee.Dictionary(classAreaLists.flatten())
print(result)
// // Area Calculation by Class by Admin Area 
// // We saw how we can calculate areas by class for the whole state
// // What if we wanted to know the breakup of these class areas by each district?
// // This requires one more level of processing.
// // We can apply a similar computation as above, but
// // by applying .map() on the Feature Collection to obtain the values by each district geometies
var calculateClassArea = function(feature) {
    var areas = ee.Image.pixelArea().addBands(classified).reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: feature.geometry(),
    scale: 500,
    maxPixels: 1e10
    })
    var classAreas = ee.List(areas.get('groups'))
    var classAreaLists = classAreas.map(function(item) {
      var areaDict = ee.Dictionary(item)
      var classNumber = ee.Number(areaDict.get('class')).format()
      var area = ee.Number(areaDict.get('sum')).divide(1e6).round()
      return ee.List([classNumber, area])
    })
    var result = ee.Dictionary(classAreaLists.flatten())
    // The result dictionary has area for all the classes
    // We add the district name to the dictionary and create a feature
    var species = feature.get('species')
    return ee.Feature(feature.geometry(), result.set('species', species)) // IUCN uses BIONOMIAL, Offical uses SCINAME
}
var districtAreas = AAA.map(calculateClassArea);
//var districtAreas = SEM.map(calculateClassArea);
// // One thing to note is that each district may or may not have all 
// // of the 17 classes present. So each feature will have different 
// // number of attributes depending on which classes are present.
// // We can explicitly set the expected fields in the output 
// // so we get a homogeneous table with all classes
var classes = ee.List.sequence(1, 17)
// // As we need to use the list of output fields in the Export function
// // we have to call .getInfo() to get the list values on the client-side
var outputFields = ee.List(['species']).cat(classes).getInfo()
// Export the results as a CSV file