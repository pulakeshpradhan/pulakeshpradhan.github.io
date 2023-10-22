// A lon and Lat to find the Sentinel-2 images at that location.
// Change the Lon and Lat and experiment.
var geometry = ee.Geometry.Point(78.4262, 17.446)
//Fetch the Sentinel-2 images dataset
var collection = ee.ImageCollection('COPERNICUS/S2')
    //Filter dates, you can change these dates.
    .filterDate('2021-09-25', '2021-12-31')
    // Fetch images which have less than 5% clouds.Cant identify vegetation if the image is too cloudy
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
    //Fetch only those images which include the gemoetry(Lon. Lat)
    .filterBounds(geometry)
    // The Dataset may return many images during the time period. For simplicity just get the first image in the collection.
    var img = collection.first()
    //Calculate NDVI using Band 8(RED) and band 4(NIR)
    var ndviImage   = img.normalizedDifference(['B8','B4'])
    // This is a color pallete visuallise the NDVI data on a map. You can change the color codes and experiment.
    var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
    // Set the map focus and center to the Lon and Lat of our interest. This is for visualisation
    Map.centerObject(geometry,10)
    //Add layer to the Map for visualisation.
    Map.addLayer(ndviImage, {min: 0, max: 1, palette: palette}, 'NDVI',false);
    // All pixels in the NDVI greater than 0.3 is considered Vegetation.
    var VegPixels = ndviImage.gt(0.3)
    //Masking the non vegetation pixels.
    var vegetation = ndviImage.updateMask(VegPixels)
    //Visualising the Vegetation layer on the map.
    Map.addLayer(vegetation,{min: 0.3, max: 1.0,palette:['023B01', '012E01', '011D01', '011301']},'Vegetation ',true)