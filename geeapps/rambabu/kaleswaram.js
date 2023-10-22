var kaleswaram = ui.import && ui.import("kaleswaram", "table", {
      "id": "users/rambabu/Kaleswaram/Watershed"
    }) || ee.FeatureCollection("users/rambabu/Kaleswaram/Watershed");
Map.centerObject(kaleswaram,8);
Map.addLayer(kaleswaram, null,'Kaleswaram Watershed',1,0.2);
var srtm = ee.Image("USGS/SRTMGL1_003");
var elevation = srtm.select('elevation').clip(kaleswaram); 
print(elevation);
var elevationVis = {
  min: 100,
  max: 550,
  palette: ['3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611','ffb613', 'ff8b13','ff6e08', 'ff500d', 'ff0000'],
};
Map.addLayer(elevation, elevationVis, 'Elevation');
//display hillshading and slope
var hillshade = ee.Terrain.hillshade(srtm).clip(kaleswaram);
Map.addLayer(hillshade, {min:150, max:255,}, 'Hillshade',1,0.5);
var slope = ee.Terrain.slope(srtm).clip(kaleswaram);
//Map.addLayer(slope, {min:0, max:20, pallete: ['FFFFFF']},'Slope',0);
// import the satellite data from the European Space Agency and apply filter
var imageCollection = ee.ImageCollection("COPERNICUS/S2")
        .filterDate('2020-04-01','2020-04-30')
        .filterBounds(kaleswaram);
print(imageCollection); 
// Get the number of images.
var count = imageCollection.size();
print('Count: ', count);
// Limit the collection to the 5 most recent images.
var dataset = imageCollection.sort('system:time_start', false).limit(10); //sort on date desc
print('Recent images: ', dataset);
var image = ee.Image(dataset.first().clip(kaleswaram));
print(image);
var date = ee.Date(image.get('system:time_start')).format('dd-MMM-yyyy');
print("Image Date", date);
//Show the True Color Image
//Map.addLayer(image,{min:0,max:3000,bands:"B4,B3,B2"}, "True Color");
//Show NDVI Image
//Formula for Normalized Difference Vegetaiton Index (NDVI) = (B8-B4)/(B8+B4)
var ndvi = image.normalizedDifference(["B8","B4"]); //B8 = NIR & B4 = RED
// Create vegitationPalette palette
var vegitationPalette =['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01','012E01', '011D01', '011301'];
//Map.addLayer(ndvi, {palette:vegitationPalette,min:0,max:1}, "NDVI");
// Calculate NDWI and Show Image
var ndwi_dry = image.normalizedDifference(['B3', 'B8']); //for Sentinel 2 NDWI = (B3-B8)/(B3+B8)
ndwi_dry = ndwi_dry.gt(0); // NDWI upto 0.2 is Soil Mositure & > 0.20 is Water
var waterPalette = ['white','blue'];
//Show NDWI with Mask
//Map.addLayer(ndwi_dry.updateMask(ndwi_dry), {min: 0, max: 1, palette: waterPalette}, "NDWI");