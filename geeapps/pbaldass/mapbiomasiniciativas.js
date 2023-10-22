//var year_list = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
//                  "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
/////REGION
var regiones = ee.FeatureCollection("users/pbaldass/MapBTrinac_RegionesARGyPRY_PF7_buf10km_rec") .filterMetadata("OBJECTID","less_than",12);
var regions = regiones.union()
var blank = ee.Image(0).mask(0);
var outline = blank.paint(regions, 'AA0000', 2); 
var visPar = {'palette':'#f20a0a','opacity': 0.6};
//Map.addLayer(outline, visPar, "region_AF", true);
Map.setOptions("SATELLITE")
Map.setCenter(-56.19, -25.50, 6)
/////CLASSIFICATION VISUALIZATION
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 36,
    'palette': palettes.get('classification3')
};
var classified = ee.Image("projects/mapbiomas_af_trinacional/public/mapbiomas_atlantic_forest_collection1_integration_v0")
                 .select(19)
Map.addLayer(classified, vis, 'Atlantic Forest_col.1', false);
var panamazonia = ee.Image('projects/mapbiomas-raisg/public/collection2/mapbiomas_raisg_panamazonia_collection2_integration_v2')
                  .select(19)
Map.addLayer(panamazonia, vis, 'Panamazonia_col.2', false);
var bolivia = ee.Image('users/rcamargo/FAN/Class_MBS_E4_Ress/MapBiomas_Bolivia_v03i').select(18)
Map.addLayer(bolivia, vis, 'Bolivia_col.3', false);
/*
for (var year_id in year_list){
  var year = year_list[year_id]
  var classification = classified.select(['classification_'+year])
  Map.addLayer(classification, vis, 'Classification_AF_'+year, false);
}
*/
////////CLASIFICACIONES COMPLEMENTARIAS
var yearbrasil = 2018 //del 2000 al 2018
var yearchaco = 2017 //del 2010 al 2017
var MapBiomas_Brasil = ee.Image('projects/mapbiomas-workspace/public/collection4/mapbiomas_collection40_integration_v1')
Map.addLayer(MapBiomas_Brasil.select('classification_'+yearbrasil), vis, 'Brasil_'+yearbrasil+"_col.4", false);
var MapBiomas_Chaco = ee.Image('projects/mapbiomas-chaco/public/collection1/mapbiomas_chaco_collection1_integration_v1')
Map.addLayer(MapBiomas_Chaco.select('classification_'+yearchaco), vis, 'Chaco_'+yearchaco+"_col.1", false);
/////////////////////////////
//////////////////////LEYENDA///////////////////////////////  
var colors = [
              "006400",//3
              "32cd32",//4
              "935132",//9
              "45c2a5",//11
              "b8af4f",//12
              "ffd966",//15
              "d5a6bd",//19
              "ffefc3",//21
              "EA9999",//22
              "0000ff",//33
              "dd497f",//36
              ];
var names = [
              "[03] Natural Forest",
              "[04] Savanna Formation",
              "[09] Forest Plantation",
              "[11] Wetlands",
              "[12] Grassland",
              "[15] Pasture",
              "[19] Annual crops",
              "[21] Mosaic_agriculture_pasture",
              "[22] Non vegetated area",
              "[33] Water",
              "[36] Perennial crops"
            ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'References',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);
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
for (var i = 0; i < names.length; i++){
legend.add(makeRow(colors[i], names[i]));
}
Map.add(legend)
///////////////////////////////
//////////////////////////////////////////////////////////////
/*
// EXPORTAR LA CLASIFICACIÓN AL GDRIVE
var parametrosExport = {
  image: classified.select(2),
  description:'Clasif_AF2',
  folder:'Clasif_MapBiomas_AF2',
  fileNamePrefix:'Clasif_AF2',
  maxPixels: 1e13,
  crs: 'EPSG:4326',
  scale:30,
  region:regions
};
Export.image.toDrive(parametrosExport);
*/