var Kenya = ui.import && ui.import("Kenya", "table", {
      "id": "projects/okello-pk/assets/Kenya_counties_WGS84"
    }) || ee.FeatureCollection("projects/okello-pk/assets/Kenya_counties_WGS84"),
    borders = ui.import && ui.import("borders", "table", {
      "id": "projects/okello-pk/assets/Kenya_Counties_dissolved"
    }) || ee.FeatureCollection("projects/okello-pk/assets/Kenya_Counties_dissolved"),
    harvest_kenya = ui.import && ui.import("harvest_kenya", "image", {
      "id": "projects/bsos-geog-harvest1/assets/harvest-crop-maps/kenya2019"
    }) || ee.Image("projects/bsos-geog-harvest1/assets/harvest-crop-maps/kenya2019"),
    kenya_border = ui.import && ui.import("kenya_border", "table", {
      "id": "projects/okello-pk/assets/Kenya_Counties_dissolved"
    }) || ee.FeatureCollection("projects/okello-pk/assets/Kenya_Counties_dissolved"),
    harvest_togo = ui.import && ui.import("harvest_togo", "image", {
      "id": "projects/bsos-geog-harvest1/assets/harvest-crop-maps/togo2019"
    }) || ee.Image("projects/bsos-geog-harvest1/assets/harvest-crop-maps/togo2019"),
    nabil = ui.import && ui.import("nabil", "image", {
      "id": "projects/sat-io/open-datasets/landcover/AF_Cropland_mask_30m_2016_v3"
    }) || ee.Image("projects/sat-io/open-datasets/landcover/AF_Cropland_mask_30m_2016_v3"),
    harvest_malawi = ui.import && ui.import("harvest_malawi", "image", {
      "id": "projects/bsos-geog-harvest1/assets/harvest-crop-maps/malawi2020"
    }) || ee.Image("projects/bsos-geog-harvest1/assets/harvest-crop-maps/malawi2020"),
    harvest_rwanda = ui.import && ui.import("harvest_rwanda", "image", {
      "id": "users/izvonkov/Rwanda_2019_v3"
    }) || ee.Image("users/izvonkov/Rwanda_2019_v3"),
    harvest_uganda = ui.import && ui.import("harvest_uganda", "image", {
      "id": "users/ivanzvonkov/Uganda_2019_v3"
    }) || ee.Image("users/ivanzvonkov/Uganda_2019_v3");
// Visualization 
var vis_params = {min: 0, max: 1.0, palette: ['fcf9c6', '124a2a']};
var con_vis = {min: 0, max: 11, palette: ['fcf9c6', 'ff0000', '124a2a']};
// Country borders - Tanzania must be found by country code
var Kenya = Kenya.style({
  color: 'black', 
  width: 1 
})
var n_dea = 'Digital Earth Africa (2019)', 
    n_dw = 'Dynamic World (2019)', 
    n_gfsad_gcep = 'GFSAD GCEP (2015)', 
    n_copernicus = 'Copernicus (2019)', 
    n_wc = 'ESA WorldCover (2020)',
    // n_globcover,
    n_glad = 'GLAD (2019)', 
    n_asap = 'ASAP (2017)', 
    n_esri = 'ESRI (2020)',
    n_harvest_kenya = 'NASA harvest_kenya (2019)',
    n_consensus = 'Consensus',
    n_ensemble = 'Ensemble (Majority Vote)',
    n_globcover = 'ESA GlobCover (2009)', 
    n_cci = 'CCI Africa (2016)';
// Load Vermote SCM
var scm = ee.Image("projects/bsos-geog-harvest1/assets/vermote-scm-malawi-2019").clip(borders);
// Load Harvest maps
// var harvest = ee.ImageCollection("projects/bsos-geog-harvest1/assets/harvest-crop-maps").mosaic().gte(0.5).clip(borders);
// Load Digital Earth Africa
var dea = ee.ImageCollection("projects/sat-io/open-datasets/DEAF/CROPLAND-EXTENT/mask").mosaic().clip(borders);
dea = ee.Image(0).where(dea.eq(1), 1).clip(borders);
// Load Dynamic World - TODO consider checking any() instead of mode()
var dw = ee.Image(
              ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1").filterDate("2019-01-01", "2019-12-31").select(["label"]).mode()
          ).clip(borders);
// Remap values to crop/noncrop
dw = ee.Image(0).where(dw.eq(4), 1).clip(borders);
// Load GFSAD GCEP
var gfsad_gcep = ee.ImageCollection("projects/sat-io/open-datasets/GFSAD/GCEP30").mosaic().clip(borders);
gfsad_gcep = ee.Image(0).where(gfsad_gcep.eq(2), 1).clip(borders);
Export.image.toDrive({
  image:gfsad_gcep,
  crs: 'EPSG:4326',
  description:'gfsad_gcep_Crop_Extent',
  region: borders,
  maxPixels:1e12,
  scale:30
})
// // Load GFSAD LGRIP
// var gfsad_lgrip = ee.ImageCollection("projects/sat-io/open-datasets/GFSAD/LGRIP30").mosaic().clip(borders);
// gfsad_lgrip = ee.Image(0).where(gfsad_lgrip.gt(1), 1).clip(borders);
// Load Copernicus PROBA-V
var copernicus = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global")
                      .select("discrete_classification")
                      .filterDate("2019-01-01", "2019-12-31")
                      .mosaic()
                      .clip(borders);
copernicus = ee.Image(0).where(copernicus.eq(40), 1).clip(borders);
// Load ESA WorldCover
var wc = ee.ImageCollection("ESA/WorldCover/v100").mosaic().clip(borders);
wc = ee.Image(0).where(wc.eq(40), 1).clip(borders);
// Load GLAD map
var glad = ee.ImageCollection("users/potapovpeter/Global_cropland_2019")
                .mosaic()
                .clip(borders)
                .gt(0.5);
// Load ASAP map (TODO replace with awesome-gee code when available)
var asap = ee.Image("users/sbaber/asap_mask_crop_v03")
             .clip(borders)
             .gte(10)
             .lte(190);
asap = ee.Image(0).where(asap.eq(1), 1).clip(borders);
// Load ESRI map 
var esri = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m_TS")
                .filterDate("2019-01-01", "2019-12-31")
                .mosaic()
                .clip(borders);
esri = ee.Image(0).where(esri.eq(5), 1).clip(borders);
// Load GlobCover
var globcover = ee.Image("ESA/GLOBCOVER_L4_200901_200912_V2_3").select('landcover').clip(borders);
globcover = ee.Image(0).where(globcover.lte(20), 1).clip(borders);
// Load CCI Land Cover Africa
// Class 4 is cropland according to http://due.esrin.esa.int/files/S2_prototype_LC_map_at_20m_of_Africa_2016-Users_Feedback_Compendium-6-Feb-2018.pdf
var cci = ee.Image("projects/sat-io/open-datasets/ESA/ESACCI-LC-L4-LC10-Map-20m-P1Y-2016-v10").clip(borders);
cci = ee.Image(0).where(cci.eq(4), 1).clip(borders);
// Load Nabil et al. ensemble
nabil = ee.Image(0).where(nabil.eq(2), 1).clip(borders);
// Consensus shows agreement between maps - high indicates all agree on crop, 
// low indicates all agree on noncrop, middle indicates disagreement
var consensus = esri.add(asap)
                    .add(glad)
                    .add(wc)
                    .add(copernicus)
                    // .add(gfsad_lgrip)
                    .add(gfsad_gcep)
                    .add(dw)
                    // .add(harvest)
                    .add(dea)
                    .add(globcover)
                    .add(cci)
                    .add(nabil);
// Export consensus map image, using transforms from other maps
var togo_border = ee.FeatureCollection("FAO/GAUL/2015/level0").filter(ee.Filter.eq('ADM0_NAME', 'Togo'));
var malawi_border = ee.FeatureCollection("FAO/GAUL/2015/level0").filter(ee.Filter.eq('ADM0_NAME', 'Malawi'));
var rwanda_border = ee.FeatureCollection("FAO/GAUL/2015/level0").filter(ee.Filter.eq('ADM0_NAME', 'Rwanda'));
var uganda_border = ee.FeatureCollection("FAO/GAUL/2015/level0").filter(ee.Filter.eq('ADM0_NAME', 'Uganda'));
var tanzania_border = ee.FeatureCollection("FAO/GAUL/2015/level0").filter(ee.Filter.eq('ADM0_CODE', 257));
var dea_tanzania = dea.clip(tanzania_border).reproject({crs: 'EPSG:4326', scale: 10});
var zambia_border = ee.FeatureCollection("FAO/GAUL/2015/level0").filter(ee.Filter.eq('ADM0_NAME', 'Zambia'));
var dea_zambia = dea.clip(zambia_border).reproject({crs: 'EPSG:4326', scale: 10});
var mali_border = ee.FeatureCollection("FAO/GAUL/2015/level0").filter(ee.Filter.eq('ADM0_NAME', 'Mali'));
var dea_mali = dea.clip(mali_border).reproject({crs: 'EPSG:4326', scale: 10});
// Export.image.toDrive({
//   image: consensus.clip(kenya_border),
//   description: 'consensus-kenya-10m',
//   crs: harvest_kenya.projection().getInfo().crs,
//   crsTransform: harvest_kenya.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: kenya_border
// });
// Export.image.toDrive({
//   image: consensus.clip(malawi_border),
//   description: 'consensus-malawi-10m',
//   crs: harvest_malawi.projection().getInfo().crs,
//   crsTransform: harvest_malawi.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: malawi_border
// });
// Export.image.toDrive({
//   image: consensus.clip(togo_border),
//   description: 'consensus-togo-10m',
//   crs: harvest_togo.projection().getInfo().crs,
//   crsTransform: harvest_togo.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: togo_border
// });
// Export.image.toDrive({
//   image: consensus.clip(rwanda_border),
//   description: 'consensus-rwanda-10m',
//   crs: harvest_rwanda.projection().getInfo().crs,
//   crsTransform: harvest_rwanda.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: rwanda_border
// });
// Export.image.toDrive({
//   image: consensus.clip(uganda_border),
//   description: 'consensus-uganda-10m',
//   crs: harvest_uganda.projection().getInfo().crs,
//   crsTransform: harvest_uganda.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: uganda_border
// });
// Export.image.toDrive({
//   image: consensus.clip(tanzania_border),
//   description: 'consensus-tanzania-10m',
//   crs: dea_tanzania.projection().getInfo().crs,
//   crsTransform: dea_tanzania.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: tanzania_border
// });
// Export.image.toDrive({
//   image: consensus.clip(zambia_border),
//   description: 'consensus-zambia-10m',
//   crs: dea_zambia.projection().getInfo().crs,
//   crsTransform: dea_zambia.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: zambia_border
// });
// Export.image.toDrive({
//   image: consensus.clip(mali_border),
//   description: 'consensus-mali-10m',
//   crs: dea_mali.projection().getInfo().crs,
//   crsTransform: dea_mali.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: mali_border
// });
// Ensemble: add everything together, then reclassify based on result
// 11 total maps; if sum >= 6, then crop; else noncrop
var ensemble = ee.Image(0).where(consensus.gte(6), 1).clip(borders);
// Create image that appends the classification by each map as a band
var stacked = esri.addBands(asap)
                    .addBands(glad)
                    .addBands(wc)
                    .addBands(copernicus)
                    .addBands(gfsad_gcep)
                    .addBands(dw)
                    .addBands(dea)
                    .addBands(globcover)
                    .addBands(cci)
                    .addBands(nabil)
                    .addBands(ensemble);
stacked = stacked.add(1);
// Export stacked Rwanda image 
// Export.image.toDrive({
//   image: stacked.clip(rwanda_border),
//   description: 'stacked-rwanda-10m',
//   crs: harvest_rwanda.projection().getInfo().crs,
//   crsTransform: harvest_rwanda.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: rwanda_border
// });
// Export.image.toDrive({
//   image: stacked.clip(kenya_border),
//   description: 'stacked-kenya-10m-p1',
//   crs: harvest_kenya.projection().getInfo().crs,
//   crsTransform: harvest_kenya.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: kenya_border
// });
// Export.image.toDrive({
//   image: stacked.clip(malawi_border),
//   description: 'stacked-malawi-10m-p1',
//   crs: harvest_malawi.projection().getInfo().crs,
//   crsTransform: harvest_malawi.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: malawi_border
// });
// Export.image.toDrive({
//   image: stacked.clip(togo_border),
//   description: 'stacked-togo-10m-p1',
//   crs: harvest_togo.projection().getInfo().crs,
//   crsTransform: harvest_togo.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: togo_border
// });
// Export.image.toDrive({
//   image: stacked.clip(uganda_border),
//   description: 'stacked-uganda-10m-p1',
//   crs: harvest_uganda.projection().getInfo().crs,
//   crsTransform: harvest_uganda.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: uganda_border
// });
// Export.image.toDrive({
//   image: stacked.clip(tanzania_border),
//   description: 'stacked-tanzania-10m-p1',
//   crs: dea_tanzania.projection().getInfo().crs,
//   crsTransform: dea_tanzania.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: tanzania_border
// });
// Export.image.toDrive({
//   image: stacked.clip(zambia_border),
//   description: 'stacked-zambia-10m-p1',
//   crs: dea_zambia.projection().getInfo().crs,
//   crsTransform: dea_zambia.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: zambia_border
// });
// Export.image.toDrive({
//   image: stacked.clip(mali_border),
//   description: 'stacked-mali-10m-p1',
//   crs: dea_mali.projection().getInfo().crs,
//   crsTransform: dea_mali.projection().getInfo().transform,
//   maxPixels: 1e13,
//   region: mali_border
// });
// Create two map windows to allow side-by-side comparison
var map1 = ui.Map();
var map2 = ui.Map();
var map1Layer = ui.Map.Layer();
var map2Layer = ui.Map.Layer();
var items = [n_dea, n_dw, n_gfsad_gcep, n_copernicus, n_wc, n_glad, n_asap, n_esri, n_globcover, n_cci, n_harvest_kenya, n_consensus, n_ensemble];
var visualize = function(layer, layer_name, which_map, params){
  if (which_map == 'map1'){
    map1Layer.setEeObject(layer);
    map1Layer.setVisParams(params);
    map1Layer.setName(layer_name);
  } else {
    map2Layer.setEeObject(layer);
    map2Layer.setVisParams(params);
    map2Layer.setName(layer_name);
  }
}
var onSelect = function(value,map){
    if (value == n_dea){
      visualize(dea,n_dea,map,vis_params)
    } else if (value == n_dw){
      visualize(dw,n_dw,map,vis_params)
    }else if (value == n_gfsad_gcep){
      visualize(gfsad_gcep,n_gfsad_gcep,map,vis_params)
    }else if (value == n_copernicus){
      visualize(copernicus,n_copernicus,map,vis_params)
    }else if (value == n_wc){
      visualize(wc,n_wc,map,vis_params)
    }else if (value == n_glad){
      visualize(glad,n_glad,map,vis_params)
    }else if (value == n_asap){
      visualize(asap,n_asap,map,vis_params)
    }else if (value == n_esri){
      visualize(esri,n_esri,map,vis_params)
    }else if (value == n_globcover){
      visualize(globcover,n_globcover,map,vis_params)
    }else if (value == n_cci){
      visualize(cci,n_cci,map,vis_params)
    }else if (value == n_harvest_kenya){
      visualize(harvest_kenya,n_harvest_kenya,map,vis_params)
    }else if (value == n_consensus){
      visualize(consensus,n_consensus,map,con_vis)
    }else if (value == n_ensemble){
      visualize(ensemble,n_ensemble,map,vis_params)
    }
  };
var map1Select = ui.Select({
  items: items, 
  placeholder: 'Select a product', 
  // value, 
  onChange: function(value){
    onSelect(value,'map1')
  }, 
  // disabled, 
  // style
})
var map2Select = ui.Select({
  items: items, 
  placeholder: 'Select a product',
  // value, 
  onChange: function(value){
    onSelect(value,'map2')
  }, 
  // disabled, 
  // style
})
// Optionally add borders
// map1.addLayer(borders);
// map2.addLayer(borders);
// Add all layers (start unchecked)
// map1.addLayer(harvest, vis_params, 'NASA Harvest', 0);
// map1.addLayer(Kenya, {}, 'Kenya Borders')
// map1.addLayer(harvest_kenya, vis_params, 'NASA harvest_kenya (2019)', 0);
// map1.addLayer(dea, vis_params, 'Digital Earth Africa (2019)', 0);
// map1.addLayer(dw, vis_params, 'Dynamic World (2019)', 0);
// map1.addLayer(gfsad_gcep, vis_params, 'GFSAD GCEP (2015)', 0);
// map1.addLayer(gfsad_lgrip, vis_params, 'GFSAD LGRIP (2015)', 0);
// map1.addLayer(copernicus, vis_params, 'Copernicus (2019)', 0);
// map1.addLayer(wc, vis_params, 'ESA WorldCover (2020)', 0);
// map1.addLayer(globcover, vis_params, 'ESA GlobCover (2009)', 0); 
// map1.addLayer(glad, vis_params, 'GLAD (2019)', 0);
// map1.addLayer(asap, vis_params, 'ASAP (2017)', 0);  
// map1.addLayer(esri, vis_params, 'ESRI (2020)', 0); 
// map1.addLayer(cci, vis_params, 'CCI Africa (2016)', 0); 
// map1.addLayer(nabil, vis_params, 'Nabil et al. (2016)', 0);
// map1.addLayer(scm, vis_params, 'Vermote SCM Malawi (2019)', 0);
// map1.addLayer(consensus, {min: 0, max: 11, palette: ['fcf9c6', 'ff0000', '124a2a']}, 'Consensus', 0);
// map1.addLayer(ensemble, vis_params, 'Ensemble (Majority Vote)', 0);
// Add all layers (start unchecked)
// map2.addLayer(harvest, vis_params, 'NASA Harvest', 0);
// map2.addLayer(Kenya, {}, 'Kenya Borders')
// map2.addLayer(harvest_kenya, vis_params, 'NASA harvest_kenya (2019)',0)
// map2.addLayer(dea, vis_params, 'Digital Earth Africa (2019)', 0);
// map2.addLayer(dw, vis_params, 'Dynamic World (2019)', 0);
// map2.addLayer(gfsad_gcep, vis_params, 'GFSAD GCEP (2015)', 0);
// map2.addLayer(gfsad_lgrip, vis_params, 'GFSAD LGRIP (2015)', 0);
// map2.addLayer(copernicus, vis_params, 'Copernicus (2019)', 0);
// map2.addLayer(wc, vis_params, 'ESA WorldCover (2020)', 0);
// map2.addLayer(globcover, vis_params, 'ESA GlobCover (2009)', 0); 
// map2.addLayer(glad, vis_params, 'GLAD (2019)', 0);
// map2.addLayer(asap, vis_params, 'ASAP (2017)', 0);  
// map2.addLayer(esri, vis_params, 'ESRI (2020)', 0); 
// map2.addLayer(cci, vis_params, 'CCI Africa (2016)', 0); 
// map2.addLayer(nabil, vis_params, 'Nabil et al. (2016)', 0);
// // map2.addLayer(scm, vis_params, 'Vermote SCM Malawi (2019)', 0);
// map2.addLayer(consensus, {min: 0, max: 11, palette: ['fcf9c6', 'ff0000', '124a2a']}, 'Consensus', 0);
// map2.addLayer(ensemble, vis_params, 'Ensemble (Majority Vote)', 0);
/**
// Add reference data points
var kenya = ee.FeatureCollection('projects/bsos-geog-harvest1/assets/harvest-reference-datasets/kenya-2019-reference-points');
var togo = ee.FeatureCollection('projects/bsos-geog-harvest1/assets/harvest-reference-datasets/togo-2019-reference-points');
var malawi = ee.FeatureCollection('projects/bsos-geog-harvest1/assets/harvest-reference-datasets/malawi-2020-reference-points');
var zambia = ee.FeatureCollection('projects/bsos-geog-harvest1/assets/harvest-reference-datasets/zambia-2019-reference-points');
var tanzania = ee.FeatureCollection('projects/bsos-geog-harvest1/assets/harvest-reference-datasets/tanzania-2019-reference-points');
var uganda = ee.FeatureCollection('projects/bsos-geog-harvest1/assets/harvest-reference-datasets/uganda-2019-reference-points');
var rwanda = ee.FeatureCollection('projects/bsos-geog-harvest1/assets/harvest-reference-datasets/rwanda-2019-reference-points');
var mali = ee.FeatureCollection('projects/bsos-geog-harvest1/assets/harvest-reference-datasets/mali-2019-reference-points');
var harvest_ref = kenya.merge(togo)
                       .merge(malawi)
                       .merge(zambia)
                       .merge(tanzania)
                       .merge(uganda)
                       .merge(rwanda)
                       .merge(mali);
map1.addLayer(harvest_ref.filter(ee.Filter.eq('crop_label', 0)), 
              {color: 'red', fillColor: '00000000'}, 
              'Non-crop reference points');
map1.addLayer(harvest_ref.filter(ee.Filter.eq('crop_label', 1)), 
              {color: 'green', fillColor: '00000000'}, 
              'Crop reference points');
map2.addLayer(harvest_ref.filter(ee.Filter.eq('crop_label', 0)), 
              {color: 'red', fillColor: '00000000'}, 
              'Non-crop reference points');
map2.addLayer(harvest_ref.filter(ee.Filter.eq('crop_label', 1)), 
              {color: 'green', fillColor: '00000000'}, 
              'Crop reference points');
**/
// Set map parameters
map1.centerObject(borders, 6);
map1.setOptions('SATELLITE');
map2.centerObject(borders, 6);
map2.setOptions('SATELLITE');
//map1.setZoom(15);
//map2.setZoom(15);
// Add title bar across top
var title = ui.Panel({
  widgets: [
    ui.Label("", {stretch: 'horizontal'}),
    ui.Label("Comparison of Cropland Maps from Global Land Cover Maps in Kenya", {fontSize: '24px', fontWeight: 'bold'}),
    ui.Label("", {stretch: 'horizontal'})],
  layout: ui.Panel.Layout.flow('horizontal')});
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 10px', stretch: 'horizontal'}});
var makeRow = function(color, name) {
    var colorBoxStyle = {backgroundColor: '#' + color, padding: '8px', margin: '0 0 4px 0'};
    var colorBox = ui.Label({style: colorBoxStyle});
    var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
    return ui.Panel({widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')});
  };
  legend.add(makeRow('124a2a', 'Crop'));
  legend.add(makeRow('ff0000', 'Disagreement'));
  legend.add(makeRow('fcf9c6', 'Non-crop'));
var description =ui.Label({
  value: 'This app visualizes the cropland categories from 11 global and regional land cover maps. The user can choose to visualize any map in the left or right pane to enable easy comparison. Consensus (sum of all maps) and ensemble (majority vote of all maps) maps are also visualized.' ,
  style: {stretch: 'horizontal', position: 'top-center', fontSize: '14px', textAlign: 'center', margin: '0 0 3px 0', padding: '0 100px', color: '#3f3f3f'}});
var paper_link = ui.Label({
  value: 'Read our paper for more information', 
  style: {stretch: 'horizontal', position: 'top-center', fontSize: '15px', textAlign: 'center', color: 'blue'}});
  paper_link.setUrl('https://nasaharvest.org');
var linker = ui.Map.Linker([map1, map2]);
var splitPanel = ui.SplitPanel({firstPanel: map1, secondPanel: map2, orientation: 'horizontal', wipe: false, style: {stretch: 'both'}});
var mainPanel = ui.Panel({widgets: [title, description, splitPanel], style: {width: '100%', height: '100%'}});
//var mainPanel = ui.Panel({widgets: [title, description, paper_link, splitPanel], style: {width: '100%', height: '100%'}});
map1.add(legend);
map1.add(map1Layer);
map2.add(map2Layer);
map1.add(map1Select);
map2.add(map2Select);
map1.centerObject(kenya_border);
map2.centerObject(kenya_border);
ui.root.widgets().reset([mainPanel]);
// Plots of vegetation index time series
// Load MODIS vegetation indices data and subset a year of images.
// var vegIndices = ee.ImageCollection('MODIS/006/MOD13A1')
//                     .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
//                     .select(['NDVI']);
// Create NDVI time series using each crop mask
// var dea_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(dea)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: DEA)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(dea_ndvi);
// // Create NDVI time series using each crop mask
// var wc_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(wc)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: WorldCover)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(wc_ndvi);
// Create NDVI time series using each crop mask
// var chart =
//     ui.Chart.image
//         .series({
//           imageCollection: vegIndices.map(function(img) { return img.mask(dw)}),
//           region: rwanda_border,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: DW), Rwanda',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'Vegetation index (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//           colors: ['e37d05'],
//           curveType: 'function'
//         });
// print(chart);
// var chart =
//     ui.Chart.image
//         .series({
//           imageCollection: vegIndices.map(function(img) { return img.mask(dw)}),
//           region: malawi_border,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: DW), Malawi',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'Vegetation index (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//           colors: ['e37d05'],
//           curveType: 'function'
//         });
// print(chart);
// var chart =
//     ui.Chart.image
//         .series({
//           imageCollection: vegIndices.map(function(img) { return img.mask(dw)}),
//           region: kenya_border,
//           reducer: ee.Reducer.mean(),
//           scale: 1000,
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: DW), Kenya',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'Vegetation index (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//           colors: ['e37d05'],
//           curveType: 'function'
//         });
// print(chart);
// Create NDVI time series using each crop mask
// var esri_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(esri)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: Esri)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(esri_ndvi);
// // Create NDVI time series using each crop mask
// var gfsad_gcep_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(gfsad_gcep)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: GFSAD)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(gfsad_gcep_ndvi);
// // Create NDVI time series using each crop mask
// var copernicus_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(copernicus)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: Copernicus)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(copernicus_ndvi);
// // Create NDVI time series using each crop mask
// var globcover_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(globcover)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: GlobCover)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(globcover_ndvi);
// // Create NDVI time series using each crop mask
// var glad_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(glad)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: GLAD)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(glad_ndvi);
// // Create NDVI time series using each crop mask
// var asap_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(asap)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: ASAP)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(asap_ndvi);
// // Create NDVI time series using each crop mask
// var cci_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(cci)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: CCI)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(cci_ndvi);
// // Create NDVI time series using each crop mask
// var nabil_ndvi =
//     ui.Chart.image
//         .seriesByRegion({
//           imageCollection: vegIndices.map(function(img) { return img.mask(nabil)}),
//           band: 'NDVI',
//           regions: borders,
//           reducer: ee.Reducer.mean(),
//           scale: 500,
//           seriesProperty: 'ADM0_NAME',
//           xProperty: 'system:time_start'
//         })
//         .setOptions({
//           title: 'Mean NDVI Time Series (Mask: Nabil)',
//           hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
//           vAxis: {
//             title: 'NDVI (x1e4)',
//             titleTextStyle: {italic: false, bold: true}
//           },
//           lineWidth: 5,
//         });
// print(nabil_ndvi);