///// DATA IMPORT ///////////////////////////////////////////
//Importa Shape 
var CaaguazuZona = ee.FeatureCollection("FAO/GAUL/2015/level1")
.filterMetadata("ADM0_CODE","equals",194)
.filterMetadata("ADM1_NAME","equals","Caaguazu");
var CaazapaZona = ee.FeatureCollection("FAO/GAUL/2015/level1")
.filterMetadata("ADM0_CODE","equals",194) 
.filterMetadata("ADM1_NAME","equals","Caazapa");
var GuairaZona = ee.FeatureCollection("FAO/GAUL/2015/level1")
.filterMetadata("ADM0_CODE","equals",194)
.filterMetadata("ADM1_NAME","equals","Guaira");
var Zona = CaaguazuZona.merge(CaazapaZona).merge(GuairaZona);
//Importa Area de Soja 2017
var CaaguazuSoybean = ee.FeatureCollection("users/emilioaguilarcubilla/SojaPY_2017/SojaPY_CAAG_17");
var CaazapaSoybean = ee.FeatureCollection("users/emilioaguilarcubilla/SojaPY_2017/SojaPY_CAAZ_17");
var GuairaSoybean = ee.FeatureCollection("users/emilioaguilarcubilla/SojaPY_2017/SojaPY_GAUI_17");
var soybean = CaaguazuSoybean.merge(CaazapaSoybean).merge(GuairaSoybean);
// Add Protected Areas
var protectedAreas = ee.FeatureCollection('WCMC/WDPA/current/polygons')
  .filter(ee.Filter.and(
    ee.Filter.bounds(Zona.geometry()),
    ee.Filter.neq('IUCN_CAT', 'VI'),
    ee.Filter.eq("DESIG_TYPE","National"),
    ee.Filter.neq('STATUS', 'proposed'),
    ee.Filter.lt('STATUS_YR', 2010)
  ));
//Importa Area de Influencia de LDC
var Influen = ee.FeatureCollection("users/emilioaguilarcubilla/AreadeEstudio");
//importa GFW
var gfc2020 = ee.Image("UMD/hansen/global_forest_change_2019_v1_7");
var treeCover = gfc2020.select(['treecover2000']);
var lossImage = gfc2020.select(['lossyear']);
var loss = gfc2020.select(['loss']);
////////////////////////// Improves Quality of Tree Cover Layer  ////////////////////
var pixels = ee.Number(10);
var lossPixels = ee.Number(10);
var canopy_pct = ee.Number(30);
//Canopy
var canopyCover = treeCover.gte(canopy_pct).selfMask();
var contArea = canopyCover.connectedPixelCount(); 
// Elimina grupos mas pequeños que lo indicado en pixels
var minArea = contArea.gte(pixels).selfMask();
///////////////////// ANALYSIS ////////////////////////////
///// Print 2000 Forest Cover
var forestArea = minArea.multiply(ee.Image.pixelArea()).divide(10000);
var forestSize = forestArea.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: Zona.geometry(),
    scale: 30,
    maxPixels: 1e13
});
print(
    'Year 2000 tree cover (ha) \nmeeting minimum canopy cover and \nforest area thresholds \n ',
    forestSize.get('treecover2000'));
///// Creates binary image of Loss Year for years >= 2008
var lossYear = gfc2020.select('lossyear').gte(8); //Only imports values >=8 (binary)
var areaImage = lossYear.multiply(ee.Image.pixelArea()).divide(10000); //Caculates Area in Hectares
var forestLoss = minArea.updateMask(lossYear);//Elimina las areas deforestadas del TreeCover con los requisitos de calidad
// Calculate the area of loss pixels in Zona sinse 2008
var stats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: Zona.geometry(),
  scale: 30,
  maxPixels: 1e9
});
print(
  'Area lost in Zona Since 2008:',
  stats.get('lossyear'),
  '(ha)'
);
// Calculate the area of loss pixels in the protected areas since 2008.
var stats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: protectedAreas.geometry(),
  scale: 30,
  maxPixels: 1e9
});
print(
  'Area lost in protected areas \nsince 2008: \n',
  stats.get('lossyear'),
  '(ha)');
///// Current Tree Cover
// Import Current lost cover in Hansen Data
var treeLoss = loss.eq(1).selfMask();
// Add the previous requirements (canopy) to the current tree cover
var treecoverLoss = minArea.and(treeLoss).rename('loss').selfMask();
// Create connectedPixelCount() to get contiguous area.
var contLoss = treecoverLoss.connectedPixelCount();
// Apply the minimum area of continuos forrest requirement.
var minLoss = contLoss.gte(lossPixels).selfMask();
//Generates Layer with area
var lossArea = minLoss.multiply(ee.Image.pixelArea()).divide(10000);
// Unmask the derived loss.
var minLossUnmask = minLoss.unmask();
// Switch the binary value of the loss (0, 1) to (1, 0).
var notLoss = minLossUnmask.select('loss').eq(0);
// Combine the derived tree cover and not-loss with 'and'.
var treecoverLoss01 = minArea.and(notLoss).selfMask();
var contArea01 = treecoverLoss01.connectedPixelCount();
var minArea01 = contArea01.gte(pixels);
///// SOYBEAN ANALYSIS
//Convierte a Raster Feature Collection 
var soybeanRaster = soybean
  .filter(ee.Filter.notNull(['SUP']))
  .reduceToImage({
    properties: ['SUP'],
    reducer: ee.Reducer.first()
});
//Crea Mascara con Valores 1 y 0
var soybeanRasterMask = soybeanRaster.selfMask();
var soybeanBolean = soybeanRasterMask.and(soybeanRaster).rename("soybean");
//Generates soybean grown on deforested areas
var defSoybean = forestLoss.updateMask(soybeanBolean).rename("soybeanArea");
//Cacululates deforested soybean area
var defSoybeanArea = defSoybean.multiply(ee.Image.pixelArea()).divide(10000);
var defSoybeanSize = defSoybeanArea.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: Zona.geometry(),
    scale: 30,
    maxPixels: 1e13
});
print(
    'Soybean Area grown \nover deforested areas \nafter 2008 in Hectares ',
    defSoybeanSize.get("soybeanArea"));
//Cacululates deforested soybean area in Area 2
var defSoybeanInflu = defSoybean.clip(Influen);
var defSoybeanSize = defSoybeanArea.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: Influen.geometry(),
    scale: 30,
    maxPixels: 1e13
});
print(
    'Soybean Area grown in area 2 \nover deforested areas \nafter 2008 in Hectares ',
    defSoybeanSize.get("soybeanArea"));
//ADD TO LAYER ------------------------------------
//Show Current Tree Cover
Map.addLayer(minArea01.clip(Zona), {
    palette: ['#168039']
}, 'Current Tree Cover',false);
// Show Protected Areas
Map.addLayer(protectedAreas,{color: '#2dd039', strokeWidth: 0},"ProtectedArea",false)
// Add the loss layer
Map.addLayer(lossImage.selfMask().clip(Zona),
            {palette: ['#dc6c9a']}, 'Total Loss',false);
//Add Zona de Infleuncia
Map.addLayer(Influen,null,"Zona Influencia",false)
//Add Area Perdida
Map.addLayer(forestLoss.clip(Zona),{min:0,max:1,palette:["pink"]},"Loss Area Since 2008",false);
//Add  Soybean
Map.addLayer(soybeanRaster,{"opacity":0.65, palette: '#e8eb38'},"Total Soybean")
Map.addLayer(defSoybeanArea,{palette: '#daa93b'},"Soybean over Deforestation")
Map.addLayer(defSoybeanInflu,{palette: '#ff0000'},"Soybean over Deforestation 2")
//Centrar Mapa
Map.centerObject(Zona,8.5);
////////////////// LEYENDA ///////////////////////////
var legend = ui.Panel({style: {position: 'bottom-right', padding: '10px 15px'}});
var loading = ui.Label('', {margin: '2px 0 6px 0'});
legend.add(loading);
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
legend.add(makeRow("168039", 'Current Tree Cover'));
legend.add(makeRow('dc6c9a', 'Total Loss'));
legend.add(makeRow("ffc0cb", 'Loss Area Since 2008'));
legend.add(makeRow("e8eb38", 'Total Soybean'));
legend.add(makeRow("daa93b", 'Soybean over Deforestation'));
legend.add(makeRow("ff0000", 'Soybean over Deforestation 2'));
Map.add(legend);