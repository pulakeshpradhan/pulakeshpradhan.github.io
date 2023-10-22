////Visualizar clasificación final
//Adaptado por Pablo Baldassini - Agosto 2020
var year_list = [1985, 1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,
    2020, 2021]
var dir1 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics'
var dir2 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics-landsat-7'
var mosaicos1 = ee.ImageCollection(dir1)
var mosaicos2 = ee.ImageCollection(dir2)
var dirasset = mosaicos1.merge(mosaicos2) 
var dir_pre_class = 'projects/mapbiomas_af_trinacional/COLLECTION2/filters'
/////REGION
var regiones = ee.FeatureCollection("users/pbaldass/Regiones_AR-PY_col2");
var regions = regiones.union()
var blank = ee.Image(0).mask(0);
var outline = blank.paint(regions, 'AA0000', 2); 
var visPar = {'palette':'#f20a0a','opacity': 0.6};
Map.addLayer(outline, visPar, "region_AF", true);
/////LANDSAT VISUALIZATION
var visParMedian1 = {'bands':['nir_median','swir1_median','red_median'], 'max': 3187.5,'gamma':1.32 };
// Add mosaic for each year median
for (var year_id in year_list){
  var year = year_list[year_id]
  var mosaicoTotal = ee.ImageCollection(dirasset)
                    .filterMetadata('year', 'equals', year)
                    //.filterBounds(myRegion)
                    .mosaic()
                    .clip(regions)
  Map.addLayer(mosaicoTotal, visParMedian1, 'Land_'+year+'_TRINACIONAL', false);  
}
/////CLASSIFICATION VISUALIZATION
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 36,
    'palette': palettes.get('classification3')
};
var classified1 = ee.Image(dir_pre_class + "/step_10_final_regions_v1")
var classified2 = ee.Image(dir_pre_class + "/step_10_final_regions_v2b")
for (var year_id in year_list){
  var year = year_list[year_id]
  var classification1 = classified1.select(['classification_'+year])
  Map.addLayer(classification1, vis, 'Classif1_'+year, false);
}
for (var year_id in year_list){
  var year = year_list[year_id]
  var classification2 = classified2.select(['classification_'+year])
  Map.addLayer(classification2, vis, 'Classif2_'+year, false);
}
////////CLASIFICACIONES COMPLEMENTARIAS
var yearbrasil = 2019 //del 1985 al 2020
var yearchaco = 2019 //del 2000 al 2019
var MapBiomas_Brasil = ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas_collection60_integration_v1')
Map.addLayer(MapBiomas_Brasil.select('classification_'+yearbrasil), vis, 'Brasil_'+yearbrasil+"_col.6", false);
var MapBiomas_Chaco = ee.Image('projects/mapbiomas-chaco/public/collection2/mapbiomas_chaco_collection2_integration_v1')
Map.addLayer(MapBiomas_Chaco.select('classification_'+yearchaco), vis, 'Chaco_'+yearchaco+"_col.2", false);
//////////////////////LEYENDA///////////////////////////////  
var colors = [
              "006400",//3
              "32cd32",//4
              "935132",//9
              "45c2a5",//11
              "b8af4f",//12
              "ffd966",//15
              "d5a6bd",//19
              //"ffefc3",//21
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
              //"[21] Mosaic_agriculture_pasture",
              "[22] Non vegetated area",
              "[33] Water",
              "[36] Perennial crops"
            ];
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'MapBiomas Atlantic Forest Col. 2 (1985-2021)',
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