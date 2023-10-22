var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/dnschavarria/Guatuso_Los_Chiles_Upala"
    }) || ee.FeatureCollection("users/dnschavarria/Guatuso_Los_Chiles_Upala"),
    contorno = ui.import && ui.import("contorno", "table", {
      "id": "users/dnschavarria/Contorno_Guatuso_Los_Chiles_Upala"
    }) || ee.FeatureCollection("users/dnschavarria/Contorno_Guatuso_Los_Chiles_Upala");
 /* *******************************************************************************************
                                  SELECT YOUR OWN STUDY AREA   
   Use the polygon-tool in the top left corner of the map pane to draw the shape of your 
   study area. Single clicks add vertices, double-clicking completes the polygon.
   **CAREFUL**: Under 'Geometry Imports' (top left in map panel) uncheck the 
               geometry box, so it does not block the view on the imagery later.
  *******************************************************************************************
                                       SET TIME FRAME
   Set start and end dates of a period BEFORE the flood. Make sure it is long enough for 
   Sentinel-1 to acquire an image (repitition rate = 6 days). Adjust these parameters, if
   your ImageCollections (see Console) do not contain any elements.*/
var before_start= '2021-07-10';
var before_end='2021-07-12';
// Now set the same parameters for AFTER the flood.
var after_start='2021-07-23';
var after_end='2021-07-25';
/********************************************************************************************
                           SET SAR PARAMETERS (can be left default)*/
var polarization = "VH"; /*or 'VV' --> VH mostly is the prefered polarization for flood mapping.
                           However, it always depends on your study area, you can select 'VV' 
                           as well.*/ 
var pass_direction = "DESCENDING"; /* or 'ASCENDING'when images are being compared use only one 
                           pass direction. Consider changing this parameter, if your image 
                           collection is empty. In some areas more Ascending images exist than 
                           than descending or the other way around.*/
var difference_threshold = 1.25; /*threshodl to be applied on the difference image (after flood
                           - before flood). It has been chosen by trial and error. In case your
                           flood extent result shows many false-positive or negative signals, 
                           consider changing it! */
//var relative_orbit = 79; 
                          /*if you know the relative orbit for your study area, you can filter
                           you image collection by it here, to avoid errors caused by comparing
                           different relative orbits.*/
/********************************************************************************************
  ---->>> DO NOT EDIT THE SCRIPT PAST THIS POINT! (unless you know what you are doing) <<<---
  ------------------>>> now hit the'RUN' at the top of the script! <<<-----------------------
  -----> The final flood product will be ready for download on the right (under tasks) <-----
  ******************************************************************************************/
//---------------------------------- Translating User Inputs ------------------------------//
//------------------------------- DATA SELECTION & PREPROCESSING --------------------------//
// rename selected geometry feature 
var aoi = ee.FeatureCollection(geometry);
// Load and filter Sentinel-1 GRD data by predefined parameters 
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
  .filterBounds(aoi)
  .select(polarization);
// Select images by predefined dates
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start,after_end);
// Print selected tiles to the console
      // Extract date from meta data
      function dates(imgcol){
        var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
        var printed = ee.String('from ')
          .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
          .cat(' to ')
          .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
        return printed;
      }
      // print dates of before images to console
      var before_count = before_collection.size();
      print(ee.String('Tiles selected: Before Flood ').cat('(').cat(before_count).cat(')'),
        dates(before_collection), before_collection);
      // print dates of after images to console
      var after_count = before_collection.size();
      print(ee.String('Tiles selected: After Flood ').cat('(').cat(after_count).cat(')'),
        dates(after_collection), after_collection);
// Create a mosaic of selected tiles and clip to study area
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);
// Apply reduce the radar speckle by smoothing  
var smoothing_radius = 50;
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
//------------------------------- FLOOD EXTENT CALCULATION -------------------------------//
// Calculate the difference between the before and after images
var difference = after_filtered.divide(before_filtered);
// Apply the predefined difference-threshold and create the flood extent mask 
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);
// Refine flood result using additional datasets
      // Include JRC layer on surface water seasonality to mask flood pixels from areas
      // of "permanent" water (where there is water > 10 months of the year)
      var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      //Flooded layer where perennial water bodies (water > 10 mo/yr) is assigned a 0 value
      var flooded_mask = difference_binary.where(swater_mask,0);
      // final flooded area without pixels in perennial waterbodies
      var flooded = flooded_mask.updateMask(flooded_mask);
      // Compute connectivity of pixels to eliminate those connected to 8 or fewer neighbours
      // This operation reduces noise of the flood extent product 
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(8));
      // Mask out areas with more than 5 percent slope using a Digital Elevation Model 
      var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(5));
// Calculate flood extent area
// Create a raster layer containing the area information of each pixel 
var flood_pixelarea = flooded.select(polarization)
  .multiply(ee.Image.pixelArea());
// Sum the areas of flooded pixels
// default is set to 'bestEffort: true' in order to reduce compuation time, for a more 
// accurate result set bestEffort to false and increase 'maxPixels'. 
var flood_stats = flood_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: aoi,
  scale: 10, // native resolution 
  //maxPixels: 1e9,
  bestEffort: true
  });
// Convert the flood extent to hectares (area calculations are originally given in meters)  
var flood_area_ha = flood_stats
  .getNumber(polarization)
  .divide(10000)
  .round(); 
//------------------------------  DISPLAY PRODUCTS  ----------------------------------//
// Before and after flood SAR mosaic
Map.setCenter(-84.80182653964546, 10.688685820035023, 11);
Map.addLayer(before_filtered, {min:-25,max:0}, 'Antes de la inundación',0);
Map.addLayer(after_filtered, {min:-25,max:0}, 'Después de la inundación',1);
// Difference layer
Map.addLayer(difference,{min:0,max:2},"Capa de diferencia",0);
// Flooded areas
Map.addLayer(flooded,{palette:"0000FF"},'Zonas inundadas');
//------------------------------------- EXPORTS ------------------------------------//
// Export flooded area as TIFF file 
Export.image.toDrive({
  image: flooded, 
  description: 'Flood_extent_raster',
  fileNamePrefix: 'flooded',
  region: aoi, 
  maxPixels: 1e10
});
// Export flooded area as shapefile (for further analysis in e.g. QGIS)
// Convert flood raster to polygons
var flooded_vec = flooded.reduceToVectors({
  scale: 10,
  geometryType:'polygon',
  geometry: aoi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Export flood polygons as shape-file
Export.table.toDrive({
  collection:flooded_vec,
  description:'Flood_extent_vector',
  fileFormat:'SHP',
  fileNamePrefix:'flooded_vec'
});
//---------------------------------- MAP PRODUCTION --------------------------------//
//-------------------------- Display the results on the map -----------------------//
// set position of panel where the results will be displayed 
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '350px'
  }
});
//Prepare the visualtization parameters of the labels 
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var numberVIS = {
  'margin':'0px 0px 15px 0px', 
  'color':'0fa5bf',
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
  'font-weight':'bold', 
  'color': '00008B'
  };
// Create lables of the results 
// Titel and time period
var title = ui.Label('Resultados', titleTextVis);
var text1 = ui.Label('Estado de la inundación entre:',textVis);
var number1 = ui.Label(after_start.concat(" y ",after_end),numberVIS);
// Alternatively, print dates of the selected tiles
//var number1 = ui.Label('Please wait...',numberVIS); 
//(after_collection).evaluate(function(val){number1.setValue(val)}),numberVIS;
// Estimated flood extent 
var text2 = ui.Label('Extensión estimada de la inundación:',textVis);
var text2_2 = ui.Label('Por favor, espere un momento...',subTextVis);
dates(after_collection).evaluate(function(val){text2_2.setValue('Basado en imágenes Sentinel-1 '+val)});
var number2 = ui.Label('Por favor, espere un momento...',numberVIS); 
flood_area_ha.evaluate(function(val){number2.setValue(val+' hectáreas')}),numberVIS;
// Disclaimer
var text6 = ui.Label('Descargo de responsabilidad: Este producto se ha derivado automáticamente sin datos de validación. Toda la información geoespacial tiene limitaciones debido a la escala, resolución, fecha e interpretación de los materiales originales, además de la naturaleza misma en el uso del Radar de Apertura Sintética.',subTextVis)
// Produced by...
var text7 = ui.Label('Script basado en: UN-SPIDER, Modificado para usarlo localmente: Geog. Dennis Chavarría Córdoba', subTextVis)
// Fuente by...
var text8 = ui.Label('Fuente: Copernicus Sentinel data 2021, processed by Google.', subTextVis)
// Add the labels to the panel 
results.add(ui.Panel([
        title,
        text1,
        number1,
        text2,
        text2_2,
        number2,
        text6,
        text7,
        text8]
      ));
// Add the panel to the map 
Map.add(results);
//----------------------------- Display legend on the map --------------------------//
// Create legend (*credits to thisearthsite on Open Geo Blog: https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/)
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
// Create legend title
var legendTitle = ui.Label('Simbología',titleTextVis);
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
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
var palette =['#0000ff','white', 'white'];
// name of the legend
var names = ['Áreas potencialmente inundadas'];
//Add color and and names
   for (var i = 0; i < 3; i++) {
    legend.add(makeRow(palette[i], names[i]));
   }  
//legend.add(panel);
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
var title = ui.Label('Extensión estimada de las inundaciones en los cantones de Guatuso, Los Chiles y Upala (Julio 2021)', {fontWeight:'bold',fontSize:'20px'});
title.style().set('position', 'top-center');
Map.add(title);
var subtitle = ui.Label('Efectos producidos por tormenta extraordinaria', {fontWeight:'bold', fontSize:'15px'});
subtitle.style().set('position', 'bottom-center');
Map.add(subtitle);
//Map.addLayer(table.draw ({color: 'white'}), {}, 'table');
var RellenoAOI = ee.Image().byte();
var LimiteAOI = RellenoAOI.paint({featureCollection: contorno, width: 2,});
Map.addLayer(LimiteAOI, {palette: 'red', opacity: 0.5}, 'Contorno');