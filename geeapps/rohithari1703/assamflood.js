var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/rohithari1703/assam"
    }) || ee.FeatureCollection("users/rohithari1703/assam");
var point = ee.Geometry.Point([92.18, 26.12]);
var point1 = ee.Geometry.Point([90.58, 26.56]);
var point2 = ee.Geometry.Point([92.41, 26.5]);
var point3 = ee.Geometry.Point([93.71, 26.77]);
var point4 = ee.Geometry.Point([92.74, 24.83]);
var zone1= point1.buffer(1000);
var zone2= point2.buffer(1000);
var zone3= point3.buffer(1000);
var zone4= point4.buffer(1000);
//Map.addLayer([zone1, zone2, zone3,zone4],{color:'red'},'point');
var before_start= '2022-01-01';
var before_end='2022-02-28';
var after_start='2022-06-10';
var after_end='2022-06-23';
var polarization = "VH"; 
var pass_direction = "DESCENDING";
var difference_threshold = 1.25; 
var aoi = ee.FeatureCollection(geometry);
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-11-01', '2020-11-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',2))
                  .mean()
                  .clip(aoi);
//Map.addLayer(dataset, {min: 0.0,max: 2800,bands: ['B4', 'B3', 'B2']}, 'RGB');
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  .filterBounds(aoi)
  .select(polarization);
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start,after_end);
//mosaic the data
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);
//smoothning the data
var smoothing_radius = 50;
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
var t= after_filtered.gt(-20);
//Map.addLayer(t, {min:0,max:1,palette:['118ab2','000000']},'After_Flood')
//difference between the before and after images
var difference = after_filtered.subtract(before_filtered);
// Apply the predefined difference-threshold and create the flood extent mask 
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);
var swater = ee.Image('JRC/GSW1_3/GlobalSurfaceWater').select('seasonality');
var swater_mask = swater.gte(6).updateMask(swater.gte(6));
var flooded_mask = difference_binary.where(swater_mask,0);
var flooded = flooded_mask.updateMask(flooded_mask);
var connections = flooded.connectedPixelCount();    
var flooded = flooded.updateMask(connections.gte(8));
      var DEM = ee.Image("NASA/NASADEM_HGT/001").select('elevation');
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(12));
var flood_pixelarea = flooded.select(polarization)
  .multiply(ee.Image.pixelArea());
var flood_stats = flood_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: aoi,
  scale: 10, // native resolution 
  //maxPixels: 1e9,
  bestEffort: true
  });
//Convert the flood extent to hectares  
var flood_area_ha = flood_stats
  .getNumber(polarization)
  .divide(10000)
  .round(); 
// Map.addLayer(flooded, {min: 0, max: 1,palette: ['d00000']},'flooded');
//.............................cropland...........................................
var lulc= ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
    .filterDate('2022-01-01', '2022-06-30')
    .sort('system:index',false)
   .filterBounds(aoi)
   .select('crops')
    .mosaic()  
   .clip(aoi);
var cropmask = lulc.gt(0.1).and(lulc.lte(0.7))
var cropland = lulc.updateMask(cropmask);
var cropland_affected = flooded.updateMask(cropland);
//Map.addLayer(cropland_affected, {min: 0, max: 1,palette: ['55a630']},'cropland');
//.............................urban..............................................
var lulc2= ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
    .filterDate('2022-01-01', '2022-06-30')
    .sort('system:index',false)
   .filterBounds(aoi)
   .select('built')
    .mosaic()  
   .clip(aoi);
var urbanmask = lulc2.gt(0.3).and(lulc2.lt(0.8))
var urban = lulc2.updateMask(urbanmask);
var urban_affected = flooded.updateMask(urban);
//Map.addLayer(urban_affected, {min: 0, max: 1,palette: ['d00000']},'urban');
//............................LEGEND.....................................................
var urban= ui.Panel({
                style: {
                  position: 'bottom-left',
                  padding: '6px 10px'
                }
              });
              var legendTitle = ui.Label({
                value: 'INDEX',
                style: {
                  fontWeight: 'bold',
                  fontSize: '10px',
                  margin: '0 0 2px 0',
                  padding: '0'
                  }
              });
              // Add the title to the panel
              urban.add(legendTitle);
              // Creates and styles 1 row of the legend.
              var makeRow = function(color, name) {
                    // Create the label that is actually the colored box.
                    var colorBox = ui.Label({
                      style: {
                        backgroundColor:  color,
                        // Use padding to give the box height and width.
                        padding: '4px',
                        margin: '0 0 2px 0'
                      }
                    });
                    // Create the label filled with the description text.
                    var description = ui.Label({
                      value: name,
                      style: {fontSize: '8px',margin: '0 0 2px 2px'}
                    });
                    // return the panel
                    return ui.Panel({
                      widgets: [colorBox, description],
                      layout: ui.Panel.Layout.Flow('horizontal')
                    });
              };
              var palette =['d00000'];
              // name of the legend
              var names = [ "URBAN"];
              // Add color and and names
              for (var i = 0; i < 1; i++) {
                urban.add(makeRow(palette[i], names[i]));
                } 
//.....................................................................................
var crop= ui.Panel({
                style: {
                  position: 'bottom-left',
                  padding: '6px 10px'
                }
              });
              var legendTitle = ui.Label({
                value: 'INDEX',
                style: {
                  fontWeight: 'bold',
                  fontSize: '10px',
                  margin: '0 0 2px 0',
                  padding: '0'
                  }
              });
              // Add the title to the panel
              crop.add(legendTitle);
              // Creates and styles 1 row of the legend.
              var makeRow = function(color, name) {
                    // Create the label that is actually the colored box.
                    var colorBox = ui.Label({
                      style: {
                        backgroundColor:  color,
                        // Use padding to give the box height and width.
                        padding: '4px',
                        margin: '0 0 2px 0'
                      }
                    });
                    // Create the label filled with the description text.
                    var description = ui.Label({
                      value: name,
                      style: {fontSize: '8px',margin: '0 0 2px 2px'}
                    });
                    // return the panel
                    return ui.Panel({
                      widgets: [colorBox, description],
                      layout: ui.Panel.Layout.Flow('horizontal')
                    });
              };
              var palette =['aacc00'];
              // name of the legend
              var names = [ "CROP"];
              // Add color and and names
              for (var i = 0; i < 1; i++) {
                crop.add(makeRow(palette[i], names[i]));
                } 
//........................................................................
var flood= ui.Panel({
                style: {
                  position: 'bottom-left',
                  padding: '6px 10px'
                }
              });
              var legendTitle = ui.Label({
                value: 'INDEX',
                style: {
                  fontWeight: 'bold',
                  fontSize: '10px',
                  margin: '0 0 2px 0',
                  padding: '0'
                  }
              });
              // Add the title to the panel
              flood.add(legendTitle);
              // Creates and styles 1 row of the legend.
              var makeRow = function(color, name) {
                    // Create the label that is actually the colored box.
                    var colorBox = ui.Label({
                      style: {
                        backgroundColor:  color,
                        // Use padding to give the box height and width.
                        padding: '4px',
                        margin: '0 0 2px 0'
                      }
                    });
                    // Create the label filled with the description text.
                    var description = ui.Label({
                      value: name,
                      style: {fontSize: '8px',margin: '0 0 2px 2px'}
                    });
                    // return the panel
                    return ui.Panel({
                      widgets: [colorBox, description],
                      layout: ui.Panel.Layout.Flow('horizontal')
                    });
              };
              var palette =['118ab2'];
              // name of the legend
              var names = [ "FLOOD"];
              // Add color and and names
              for (var i = 0; i < 1; i++) {
                flood.add(makeRow(palette[i], names[i]));
                } 
//.........................................................................................
var zone= ui.Panel({
                style: {
                  position: 'bottom-left',
                  padding: '6px 10px'
                }
              });
              var legendTitle = ui.Label({
                value: 'INDEX',
                style: {
                  fontWeight: 'bold',
                  fontSize: '10px',
                  margin: '0 0 2px 0',
                  padding: '0'
                  }
              });
              // Add the title to the panel
              zone.add(legendTitle);
              // Creates and styles 1 row of the legend.
              var makeRow = function(color, name) {
                    // Create the label that is actually the colored box.
                    var colorBox = ui.Label({
                      style: {
                        backgroundColor:  color,
                        // Use padding to give the box height and width.
                        padding: '4px',
                        margin: '0 0 2px 0'
                      }
                    });
                    // Create the label filled with the description text.
                    var description = ui.Label({
                      value: name,
                      style: {fontSize: '8px',margin: '0 0 2px 2px'}
                    });
                    // return the panel
                    return ui.Panel({
                      widgets: [colorBox, description],
                      layout: ui.Panel.Layout.Flow('horizontal')
                    });
              };
              var palette =['red'];
              // name of the legend
              var names = [ "FLOOD_ZONE"];
              // Add color and and names
              for (var i = 0; i < 1; i++) {
                zone.add(makeRow(palette[i], names[i]));
                } 
//............................appview.....................................................
// function to create map 1
var map1 = ui.Map();
map1.centerObject(point,6.5);
map1.setOptions('SATELLITE');
map1.addLayer(zone1,{color:'red'},'point');
map1.addLayer(zone2,{color:'red'},'point');
map1.addLayer(zone3,{color:'red'},'point');
map1.addLayer(zone4,{color:'red'},'point');
//map1.addLayer(before_filtered, {min:-25,max:0},'Before_Flood');
map1.add(ui.Label('Flood_Zone', {position:'top-center'}));
map1.add(zone);
map1.setControlVisibility(false);
// function to create map 2
var map2 = ui.Map();
map2.centerObject(point,6.5);
map2.setOptions('SATELLITE');
map2.addLayer(t, {min:0,max:1,palette:['118ab2','dad7cd']},'After_Flood');
map2.add(ui.Label('After_Flood', {position:'top-center'}));
map2.add(flood);
map2.setControlVisibility(false);
// function to create map 3
var map3 = ui.Map();
map3.centerObject(point,6.5);
map3.setOptions('SATELLITE');
map3.addLayer(dataset, {min: 0.0,max: 2800,bands: ['B4', 'B3', 'B2']}, 'RGB');
map3.addLayer(cropland_affected, {min: 0, max: 1,palette: ['aacc00']},'cropland');
map3.add(ui.Label('Affected_Cropland', {position:'top-center'}));
map3.add(crop);
map3.setControlVisibility(false);
// function to create map 4
var map4 = ui.Map();
map4.centerObject(point,6.5);
map4.setOptions('SATELLITE');
map4.addLayer(dataset, {min: 0.0,max: 2800,bands: ['B4', 'B3', 'B2']}, 'RGB');
map4.addLayer(urban_affected, {min: 0, max: 1,palette: ['d00000']},'urban');
map4.add(ui.Label('Affected_Urban', {position:'top-center'}));
map4.add(urban);
map4.setControlVisibility(false);
var linker = ui.Map.Linker([map1, map2, map3, map4]);
map1.setControlVisibility({zoomControl: true});
map3.setControlVisibility({scaleControl: true});
var mapGrid = ui.Panel(
    [
      ui.Panel([map1, map2], null, {stretch: 'both'}),
      ui.Panel([map3, map4], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
var title = ui.Label('ASSAM FLOOD 2022', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));