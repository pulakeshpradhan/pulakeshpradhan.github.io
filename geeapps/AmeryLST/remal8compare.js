var table = ee.FeatureCollection("users/AmeryLST/scripps_iceshelves_shp_WGS1984");
//Import scripps ice shelf boundaries
var scripps_iceshelves = ee.FeatureCollection(table);
var drawn_iceshelves = scripps_iceshelves.draw('blue')
var geometry_iceshelves = scripps_iceshelves.geometry()
// Map.addLayer(drawn_iceshelves)
var LandsatSummers = ee.ImageCollection('LANDSAT/LC08/C01/T2_TOA')
                    //.select(['B2','B3','B4','B6','B8','B10'])
                    .filterDate('2015-01-01','2019-02-01')
                    .filterBounds(geometry_iceshelves) 
                    .filter(ee.Filter.calendarRange(1,31,'day_of_year')) //January images
                    .filterMetadata('CLOUD_COVER','less_than',0.3)
//Moussavi method: Calculate the pixels that satisfy the threshold conditions from Moussavi code
var makeLakeMask = function(image){
  //lake thresholds
  var NDWI = image.normalizedDifference(['B2','B4']).gte(0.19)
  var B2 = image.select('B2');
  var B3 = image.select('B3');
  var B4 = image.select('B4');
  var B3B4difference = B3.subtract(B4).gte(0.07)
  var B2B3difference = B2.subtract(B3).gte(0.07)
  var lakethreshold = NDWI.and(B3B4difference).and(B2B3difference)
  //cloud mask
  var B6 = image.select('B6')
  var NDSI = image.normalizedDifference(['B3','B6'])
  var NDSImask = NDSI.lt(0.8)
  var B6mask = B6.gte(0.1)
  var B2mask = B2.gte(0.6).and(B2.lte(0.95))
  var cloudmask = NDSImask.and(B6mask).and(B2mask)
  //rock mask
  var B10 = image.select('B10');
  var TIRSBlue = B10.divide(B2)
  var TIRSBluemask = TIRSBlue.gte(0.65)
  var B2mask = B2.lt(0.35)
  var B4mask = B4.gt(0)
  var rockmask = TIRSBluemask.and(B2mask).and(B4mask)
  var LakeMask = lakethreshold.subtract(rockmask).subtract(cloudmask)
  return LakeMask
}
var LakeMasks_LandsatSummers = LandsatSummers.map(makeLakeMask);
//print(LakeMasks_LandsatSummers,'LakeMasks_LandsatSummers')
var maxlakethresholdmap = LakeMasks_LandsatSummers.reduce('max')
var Moussavi_lakes = maxlakethresholdmap.gt(0).clip(geometry_iceshelves)
//Spergel method: Take mean NDWI
var calc_NDWI = function(image){
  var NDWI = image.normalizedDifference(['B2','B4'])
  return NDWI
}
var meanNDWI_LandsatSummers = LandsatSummers.map(calc_NDWI)
                            .reduce('mean')
                            .gte(0.12) //compare to Moussavi's threshold of 0.19
                            .clip(geometry_iceshelves)
var Spergel_lakes = meanNDWI_LandsatSummers
//Map.addLayer(Spergel_lakes,{palette:['white','red']})
//Map.addLayer(Moussavi_lakes,{palette:['white','blue']})
///////// REMA LAKE FILLING
//import Scripps iceshelf polygons
var scripps_iceshelves = ee.FeatureCollection(table);
var drawn_iceshelves = scripps_iceshelves.draw('blue')
var geometry_iceshelves = scripps_iceshelves.geometry()
// Map.addLayer(drawn_iceshelves)
/***Import REMA data***/
var coastalAntarctica =scripps_iceshelves;
var vmin = -20.0;
var vmax =  300.0;
var REMAmosaic = ee.Image('UMN/PGC/REMA/V1_1/8m')
                  .select('elevation')
                  .clip(coastalAntarctica)
                  .toInt64()
/*** Pick out Sinks***/
var sinks = ee.Terrain.fillMinima({
  image:REMAmosaic,
  neighborhood: 30 //30 pixels = 30*8m = 240m resolution
  })
  .clip(coastalAntarctica)
var filledSinks = sinks.subtract(REMAmosaic);
///////////COMPARISON
var both_L8_REMAfilled = filledSinks.and(Moussavi_lakes);
var only_L8 = Moussavi_lakes.and(filledSinks.not())
var only_REMA = filledSinks.and(Moussavi_lakes.not())
var compositeMap = only_REMA.add(both_L8_REMAfilled.divide(0.5))
Map.addLayer(compositeMap,{min:0,max:2,palette:['white','red','00ff00']})
//Map.addLayer(only_REMA,{palette:['white','red']})
///////////////////Add Legend
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette = ['00ff00','ff0000'];
// name of the legend
var names = ['Lakes detected in REMA and L8','Lakes Only in REMA'];
// Add color and and names
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);