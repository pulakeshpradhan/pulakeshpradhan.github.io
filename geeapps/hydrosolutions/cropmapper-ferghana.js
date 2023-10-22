var CDL_12 = ui.import && ui.import("CDL_12", "image", {
      "id": "USDA/NASS/CDL/2012"
    }) || ee.Image("USDA/NASS/CDL/2012"),
    SRTM30 = ui.import && ui.import("SRTM30", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    ET_monthly_Quva = ui.import && ui.import("ET_monthly_Quva", "imageCollection", {
      "id": "users/hydrosolutions/ET_maps_Quva_2019/ET_Quva_monthly_2019"
    }) || ee.ImageCollection("users/hydrosolutions/ET_maps_Quva_2019/ET_Quva_monthly_2019"),
    ET_monthly_WestFerghana_2019 = ui.import && ui.import("ET_monthly_WestFerghana_2019", "imageCollection", {
      "id": "users/hydrosolutions/ET_maps_WestFerghana/ET_WestFerghana_2019"
    }) || ee.ImageCollection("users/hydrosolutions/ET_maps_WestFerghana/ET_WestFerghana_2019"),
    Tumans = ui.import && ui.import("Tumans", "table", {
      "id": "users/hydrosolutions/FerghanaProvince_Tumans4"
    }) || ee.FeatureCollection("users/hydrosolutions/FerghanaProvince_Tumans4"),
    ET_monthly_EastFerghana_2019 = ui.import && ui.import("ET_monthly_EastFerghana_2019", "imageCollection", {
      "id": "users/hydrosolutions/ET_maps_EastFerghana/ET_EastFerghana_2019"
    }) || ee.ImageCollection("users/hydrosolutions/ET_maps_EastFerghana/ET_EastFerghana_2019"),
    ET_monthly_WestFerghana_2018 = ui.import && ui.import("ET_monthly_WestFerghana_2018", "imageCollection", {
      "id": "users/hydrosolutions/ET_maps_WestFerghana/ET_WestFerghana_2018"
    }) || ee.ImageCollection("users/hydrosolutions/ET_maps_WestFerghana/ET_WestFerghana_2018"),
    ET_monthly_EastFerghana_2018 = ui.import && ui.import("ET_monthly_EastFerghana_2018", "imageCollection", {
      "id": "users/hydrosolutions/ET_maps_EastFerghana/ET_EastFerghana_2018"
    }) || ee.ImageCollection("users/hydrosolutions/ET_maps_EastFerghana/ET_EastFerghana_2018"),
    ET_april_2018_Ferghana = ui.import && ui.import("ET_april_2018_Ferghana", "image", {
      "id": "users/hydrosolutions/ET_maps_EastFerghana/ET_all_Ferghana_2018_4_merged_filled"
    }) || ee.Image("users/hydrosolutions/ET_maps_EastFerghana/ET_all_Ferghana_2018_4_merged_filled"),
    ET_EastFerghana_2019_4_CITRA_MCB = ui.import && ui.import("ET_EastFerghana_2019_4_CITRA_MCB", "image", {
      "id": "users/hydrosolutions/ET_maps_EastFerghana/ET_EastFerghana_2019_4_CITRA_MCB"
    }) || ee.Image("users/hydrosolutions/ET_maps_EastFerghana/ET_EastFerghana_2019_4_CITRA_MCB"),
    Ferghana_bounds = ui.import && ui.import("Ferghana_bounds", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                70.02888183593748,
                40.83185271513788
              ],
              [
                70.02888183593748,
                39.687493421990204
              ],
              [
                72.59418945312498,
                39.687493421990204
              ],
              [
                72.59418945312498,
                40.83185271513788
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[70.02888183593748, 40.83185271513788],
          [70.02888183593748, 39.687493421990204],
          [72.59418945312498, 39.687493421990204],
          [72.59418945312498, 40.83185271513788]]], null, false),
    TerraClimate = ui.import && ui.import("TerraClimate", "imageCollection", {
      "id": "IDAHO_EPSCOR/TERRACLIMATE"
    }) || ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE");
//define the two main root widgets that are connected with a slider:
/*
- middleMap: main map where the crop map will be displayed
- satelliteMap: map showing satellite image of selected sensor and year
*/ 
//var tools = require('users/fitoprincipe/geetools:tools');
var batch = require('users/fitoprincipe/geetools:batch');
var ETA_L8 = require('users/hydrosolutions/public_functions:ETA_L8'); 
var ETA_S2 = require('users/hydrosolutions/public_functions:ETA_S2'); 
var imgcol_8d = ee.ImageCollection("projects/pml_evapotranspiration/PML/OUTPUT/PML_V2_8day_v016")
  .filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(2020, 2020, 'year')).filter(ee.Filter.calendarRange(4, 9, 'month'));
print('imgcol_8d',imgcol_8d)
var mod_lc=ee.ImageCollection("MODIS/006/MCD12Q1").filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(2018, 2018, 'year'));
print('mod_lc',mod_lc);
var cop_lc=ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global").filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(2018, 2018, 'year'));
print('cop_lc',cop_lc);
var mod_NPP1=ee.ImageCollection("MODIS/006/MOD17A3HGF")
  .filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(2019, 2019, 'year'));
print('mod_NPP1',mod_NPP1)
var myd_NPP2=ee.ImageCollection("MODIS/006/MYD17A3HGF")
  .filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(2019, 2019, 'year'));
print('myd_NPP2',myd_NPP2)
//DIGITAL ELEVATION MODEL
//print(Tumans)
//ee.List([ee.Image(0).rename('b1').float()])
var ET_monthly_imgs_2019=ee.List([ET_EastFerghana_2019_4_CITRA_MCB]).cat(ee.List.sequence(0,4).map(function(x){
  var img1=ee.Image(ET_monthly_EastFerghana_2019.toList(9).get(ee.Number(x)));
  var img2=ee.Image(ET_monthly_WestFerghana_2019.toList(9).get(ee.Number(x)));
  var img_combine=ee.ImageCollection([img1,img2]).mean();
  return img_combine;
}));
var ET_monthly_imgs_2018=ee.List([ET_april_2018_Ferghana]).cat(ee.List.sequence(1,5).map(function(x){
  var img1=ee.Image(ET_monthly_EastFerghana_2018.toList(9).get(ee.Number(x)));
  var img2=ee.Image(ET_monthly_WestFerghana_2018.toList(9).get(ee.Number(x)));
  var img_combine=ee.ImageCollection([img1,img2]).mean();
  return img_combine;
}));
print(' ET_monthly_imgs',ET_monthly_imgs_2019);
var srtm=SRTM30;
var srtmProjection = srtm.projection();
var slope = ee.Terrain.slope(srtm).rename('slope');
//SLOPE THRESHOLD
//var slope_th=99; //mean + standard deviation of slopes with a min annual max NDVI of 0.5
//MAXIMUM ELEVATION WHERE IRRIGATION IS POSSIBLE IN AOI
//var srtm_th=2500; //m a.s.l.
var ndvi_th=0.45;
var gee_codes = require('users/hydrosolutions/india_reservoirs:SedimentBalance_T1L2');
var cc_thresh = 20;
var cc_pix=50;//10
var nodata_thresh = 20;
var nodata_thresh_l7 = 40; //pixels with no data over AOI, in % (use higher threshold because of scan line failure in L7)
var root_widgets = ui.root.widgets();
var middleMap = ui.Map();
middleMap.setControlVisibility(false);
middleMap.setOptions("HYBRID");
var satelliteMap = ui.Map();
satelliteMap.setControlVisibility(false);
middleMap.setControlVisibility({zoomControl: true});
middleMap.setControlVisibility({scaleControl: true});
middleMap.setControlVisibility({layerList: true});
//middleMap.setControlVisibility({mapTypeControl: true});
satelliteMap.setControlVisibility({layerList: true});
middleMap.setControlVisibility({fullscreenControl: true});
//define polygon for starting screen:
var aoi_selected;
/*var aoi_selected_tmp=ee.Geometry.Polygon(
            [[[72.86739226750433, 40.812615738725164],
              [72.86739226750433, 40.77375765543573],
              [72.94738646916448, 40.77375765543573],
              [72.94738646916448, 40.812615738725164]]]); */
var dummy = ee.Image().paint(ee.Feature(ee.Geometry.Polygon([[[72, -40],[72, -40],[72, -40],[72, -40]]])), 0, 2);
var shapes_FERG=ee.FeatureCollection(Tumans);/*[ee.Feature(Kuva_Urta_Buz_Anori.first()).set('NAME','Kuva_Urta_Buz_Anori'),
  ee.Feature(Shakhrikansai.first()).set('NAME','Shakhrikansai'),
  ee.Feature(Aksu.first()).set('NAME','Aksu')]);*/
print('shapes_FERG',shapes_FERG);
var complexCollection;
var complexCollection_tmp= shapes_FERG.filter(ee.Filter.eq('NAIM', 'ФАРГОНА'));
//or use a politial unit for starting screen:
var aoi_selected_tmp= ee.Feature(shapes_FERG.filter(ee.Filter.eq('NAIM', 'ФАРГОНА')).first()).geometry().simplify(500);
var aoi_selected_ft= ee.Feature(shapes_FERG.filter(ee.Filter.eq('NAIM', 'ФАРГОНА')).first());
var tile_scale=16;
middleMap.centerObject(shapes_FERG);//13
satelliteMap.centerObject(shapes_FERG);
var d = ee.Image().paint(shapes_FERG, 0, 2);
middleMap.addLayer(d,null,'Area of Interest');
var layerGeometry = ui.Map.Layer( aoi_selected_tmp,{color: '#FFFF00'}  );
middleMap.layers().set(1,  layerGeometry );
//var dd = ee.Image().paint(ee.FeatureCollection(adm_0), 0, 2);
//middleMap.addLayer(dd,null,'Country Borders');
satelliteMap.addLayer(d,null,'Area of Interest');
//satelliteMap.addLayer(dd,{color:'#ff6600'},'ФАРГОНА');
var layerGeometry2 = ui.Map.Layer( aoi_selected_tmp,{color: '#FFFF00'}  );
satelliteMap.layers().set(1, layerGeometry2 );
var palettes = require('users/gena/packages:palettes');
//https://github.com/gee-community/ee-palettes
var palette = palettes.colorbrewer.Paired[9];
//satelliteMap.layers().set(2, ui.Map.Layer(ee.Image(mod_lc.first()), {bands: ['LC_Type1'],min: 4, max: 17, palette: palette},"mod_lc"));
//LC_Type1.eq(13) --> Urban and Built-up Lands
var palette= palettes.misc.jet[7];
//satelliteMap.layers().set(3, ui.Map.Layer(ee.Image(cop_lc.first()), {bands: ['discrete_classification'],min: 20, max: 126, palette: palette},"cop_lc"));
//discrete_classification.eq(50) --> Urban and Built-up Lands
//urban-coverfraction.gte(50) --> Urban and Built-up Lands
//satelliteMap.layers().set(2, ui.Map.Layer(ee.Image(imgcol_8d.first()).updateMask(ee.Image(imgcol_8d.first()).select('Ec').gt(0)), {bands: ['Ec'],min: 0, max: 1, palette: ['white','blue']},"PML"));
//satelliteMap.layers().set(3, ui.Map.Layer(ee.Image(myd_NPP2.first()), {bands: ['Npp'],min: 0, max: 1, palette: ['white','blue']},"MODIS Npp"));
//Load lists of colors, crop names, countries (adm0), provinces (adm1) and districts (adm2)
var color_list=ee.List(['white','#ff5252','blue','green','yellow']);
var palette = ee.List(CDL_12.get("cropland_class_palette"));
var new_palette_server=color_list.cat(palette.slice(3,5)).cat(ee.List(['#8fd200','#ffabdd','#ff0000']));//.cat(palette.slice(7));
var new_palette= ['white','#ff5252','blue','green','yellow','00a8e5','ff9e0c','#8fd200','#ffabdd','#ff0000'];
var new_palette2_client=ee.List([]);
var crops_raw = ee.List(CDL_12.get("cropland_class_names"));
var crops_raw2 = ee.List(['Unknown','No-Crop Area','User Input...']).cat(crops_raw.slice(1));
var cropland_class_names=crops_raw2.replace('Mint','Orchard').getInfo();
//Define a bunch of variables
var aoi_ind=0;
var crop_no;
var crop_no_tmp=0;
var year; var year_tmp=2018;
var thisyear;
if (new Date().getMonth()>=9){//October
  thisyear=new Date().getFullYear();
} else {
  thisyear=(new Date().getFullYear()) - 1;
}
var year_list=ee.List.sequence(2016,ee.Number(thisyear)).map(function(nb){
        return {label: ee.String(ee.Number(nb).int()), value: nb};
  }).getInfo(); 
var VIselect='NDVI';
var small_omega=1; var max_order=2;
//var timeserieschart=0; 
var aoiisnew=1;
var tile_scale=16;
//var harmonicS22;
var greenest_1to12;
var greenest_9to11;
var greenest_2to5;
// TABEA: variable for std
//var ndvi_std
var polygonPresent = false;
var drawingMode = false;
var polygonCoords;
var drawButton;
var redrawButton;
var areaLabel;
var warningLabel;
var OutputareaLabel;
var TotalCropAreaLabel; var TotaldblCropAreaLabel;
var doanloadLabel;
var WBpanel=ui.Panel();
var layerGeometry=ui.Map.Layer();
var final_coords;
var new_aoi;
var _showArea;
var _showDownloadLink;
var _showDownloadLinkTIF;
var zIndex;
var download_tif_label;
var controlPanel;
var CropAreaLabel;
var areas_values;
var clust_area_feat;
var sensor_data_year;
var filtered_sensor_data;
var sensor_data_mosaic;
var sensor_data_4plotting;
var fittedHarmonic;
var panellayer;
var panel_new_layers;
var area;
var cluster_map;
var cluster_map0;
var cluster_map1;
var map_sieved;
var kr; var minfs; var dd;
var aoi_feat;
var panel_tmp=ui.Panel();
var aoi_left_map_layer=ui.Map();
var poi_right_map_layer=ui.Map();
var aoi_feat_area;
var sensor_id; var sensor_id_tmp=0;
var P_mean_value;
var annual_ndvi_chart;
var overall_ndvi_chart;
var point;
var annual_ndvi_chart2;
var point2;
var added_left;
var added_right;
var double_crop_map;
var comps;
var selectedUnit;
var selectPanel;
var cancelButton;
var cancel_WB;
var ndviclick;
var unit_name_and_area=ui.Label('');
var bands_s2 = ['Red', 'Green', 'Blue','NDVI'];//,'probability'
var bands_l8 = ['Red', 'Green', 'Blue','NDVI','cloud'];
var bands_l7 = ['Red', 'Green', 'Blue','NDVI','pixel_qa'];
var bands_sel;
var TrainingImage;
var new_crop_ids_long; var new_crop_ids;
var no_crop_list=[];
var duplicate_crop_ids;
var new_palette1; var new_palette2;var new_palette3;
var dbl_area;
var crop_name_list=ee.List.repeat('=Unknown',10);
var select_adm0;
var res_sel=ee.Number(10);
var cloud_calc_res=500;
var selectedUnit_Strg; 
var selectedUnit_Code;
var selectedDistrict;
var final_crop_names;
////////outlier filtering/////////
var ppha_th=0;
var ppha;
var pix2sample=100;
var asset_imgs;
//var greenest_binary;
 var generateGrid = function(xmin, ymin, xmax, ymax, dx, dy) {
    var xx = ee.List.sequence(xmin, xmax, dx);
    var yy = ee.List.sequence(ymin, ymax, dy);
    var cells = xx.map(function(x) {
      return yy.map(function(y) {
        var x1 = ee.Number(x);
        var x2 = ee.Number(x).add(ee.Number(dx));
        var y1 = ee.Number(y);
        var y2 = ee.Number(y).add(ee.Number(dy));
        var coords = ee.List([x1, y1, x2, y2]);
        var rect = ee.Algorithms.GeometryConstructors.Rectangle(coords);
        return ee.Feature(rect);
      });
    }).flatten();
    return ee.FeatureCollection(cells);
  };
   // Covers geometry with a regular grid.
  var coverByGrid = function(geom, dx, dy) {
    var bounds = ee.Geometry(geom).bounds();
    var coords = ee.List(bounds.coordinates().get(0));
    var ll = ee.List(coords.get(0));
    var ur = ee.List(coords.get(2));
    var xmin = ll.get(0);
    var xmax = ur.get(0);
    var ymin = ll.get(1);
    var ymax = ur.get(1);
    return generateGrid(xmin, ymin, xmax, ymax, dx, dy).filterBounds(geom).map(function(c) { return ee.Feature(c).intersection(geom,100) });
  };
  var stateGrid = coverByGrid(shapes_FERG.geometry(), 2, 2);
print('stateGrid',stateGrid);
//satelliteMap.layers().set(1, ui.Map.Layer(stateGrid, {color:'222200'}, 'grid'));
stateGrid=stateGrid.toList(99);
print('stateGrid',stateGrid);
var siever=function(img){
  var img0=ee.Image(img).rename('classification').int().reproject({crs: ee.Image(img).projection().crs(), scale:res_sel});
  var targetPixels = img0.mask(img0).rename('sieve')
    .connectedPixelCount(minfs.add(1), false);
  var smallClusters = targetPixels.reproject({crs: ee.Image(img).projection().crs(), scale:res_sel});
  var img_sieve= img0.addBands(smallClusters);
  var img_pos= img_sieve.select(['classification']).where(img_sieve.select(['sieve']).lte((ee.Number(ppha_th).multiply(ppha).round())),0);
return img_pos;
};
var img_multiband;
var siever_all=function(img,list){
  //var img_multi_band=ee.Image(img);//img_multiband;
  //var img_band_list=area_image.bandNames();
  var ids=ee.List(list);
  var img_list=ids.map(function(id){
    var img0=ee.Image(0).where(ee.Image(img).select('clusters').eq(ee.Number(id)),1).clipToCollection(complexCollection).rename('classification').int().reproject({crs: ee.Image(img).projection().crs(), scale:res_sel});
    //var img0=img_multi_band.select(ee.String('c').cat(ee.String(ee.Number(id).int()))).rename('classification').int().reproject({crs: ee.Image(img).projection().crs(), scale:res_sel});
    var targetPixels = img0.mask(img0).rename('sieve')
      .connectedPixelCount(minfs.add(1), false);
    var smallClusters = targetPixels.reproject({crs: ee.Image(img).projection().crs(), scale:res_sel});
    var img_sieve= img0.addBands(smallClusters);
    var img_pos= img_sieve.select(['classification']).where(img_sieve.select(['sieve']).lte((ee.Number(ppha_th).multiply(ppha).round())),0);
    var img0_inv=img_pos.not();
    var targetPixels2 = img0_inv.mask(img0_inv).rename('sieve')
    .connectedPixelCount(minfs.add(1), false);
    var smallClusters2 = targetPixels2.reproject({crs: ee.Image(img).projection().crs(), scale:res_sel});
    var img_sieve2= img0_inv.addBands(smallClusters2);
    var img_posneg = img_pos.select(['classification']).where(img_sieve2.select(['sieve']).lte((ee.Number(ppha_th).multiply(ppha).round())),1);
    return img_posneg.where(img_posneg.gt(0),ee.Number(id)).rename('clusters');
    //return img_posneg.rename('clusters').addBands(img_pos.select(['classification'])).addBands(img0_inv.rename(['sieve']));
  });
  var img_with_holes = ee.ImageCollection(img_list).sum();
  var holes=ee.Image(img).where(img_with_holes.gt(0),0);//.where(holes.gt(0),0)
  var cleaned = img_with_holes.updateMask(img_with_holes.gt(0)).reduceNeighborhood({
    reducer: ee.Reducer.mode(),
    skipMasked: false,
    //inputWeight: 'mask',
    kernel: ee.Kernel.circle(kr, "pixels")
  }).reproject({crs: ee.Image(img).projection().crs(), scale:res_sel});
  return img_with_holes.where(holes.gt(0),cleaned);//.addBands(img_with_holes.rename('test')).addBands(cleaned.rename('test2')).addBands(holes.rename('test3'));
};
//Calculate Area of area of interest
aoi_feat_area=aoi_selected_tmp.area().multiply(1e-6);
aoi_feat_area.evaluate(function(result) {
  //unit_name_and_area=ui.Label({value: "Total Area in sq. km: " + result.toFixed(2) , style: {fontWeight: '450', fontSize: '12px'}});
  unit_name_and_area=ui.Label({value: "Selected Unit: " + aoi_selected_ft.get('NAIM').getInfo() + "; Total Area in sq. km: " + result.toFixed(2) , style: {fontWeight: '450', fontSize: '12px'}});
});
//available sensor names
var sensor_labels=ee.List(['Sentinel-2','Landsat 8','Landsat 7','Landsat ']);
// Use this function to add variables for NDVI, time and a constant to Sentinel 2 imagery. 
var addVariables = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');//.float();
  //no data treated as clouds
  var mask = ee.Image(1).where(image.select('QA60').lt(1024),ee.Image(1).where(image.select('B1').gt(0),0)).rename('cloud')
  //var mask = ee.Image(100).where(image.select('QA60').lt(1024),ee.Image(100).where(image.select('B2').gt(0),0)).rename('cloud')
  .where(ndvi.gt(0.99),1);//.where(image.select('probability').gt(40),100)
  // Return the image with added bands. 
  //return image.rename(all_bands_s2.cat(ee.List(['probability']))) 
  return image.rename(all_bands_s2) 
    // Add vegetation index bands. 
    .addBands(ndvi) 
    //.addBands(image.normalizedDifference(['B8', 'B11']).rename('LSWI'))//.float()
    //.addBands(image.select('B8').divide(image.select('B3')).subtract(ee.Image(1)).rename('GCVI'))//.float()
    //maks clouds
    .updateMask(mask.not())
    .addBands(mask.multiply(ee.Image(100)))
    .set('SATELLITE','Sentinel-2')
    .set({'CLOUD_COVER': image.get('CLOUDY_PIXEL_PERCENTAGE')});//
};  
var addcloudvalues = function(image) {
  //no data treated as clouds
  var mask = ee.Image(image).select('cloud').clipToCollection(complexCollection);
  //no data ignored
  var mask2 =  ee.Image(image).select('cloud').updateMask(image.select('Blue').gt(0))
    .clipToCollection(complexCollection);
  var cloudPixels = ee.Number(mask.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': aoi_selected, 'scale': cloud_calc_res,'maxPixels': 1e13,'tileScale': 4}).get('cloud'));
  var cloudPixels2 = ee.Number(mask2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': aoi_selected, 'scale': cloud_calc_res,'maxPixels': 1e13,'tileScale': 4}).get('cloud'));
  return image.set({'nodata_cover': cloudPixels})//
    .set({'cloud_cover': cloudPixels2});
};
var rename_sensing_time = function(image){
  return image//.select(bands).rename(newbands).addBands(mndwi).addBands(ndvi)
    .set({'SENSING_TIME': ee.Date(image.get('system:time_start')).format('YYYY-MM-dd')});
};
// This function adds a cloud score band to landsat imagery
var cloudscore_L8_pro = function(image) {
  var image2 = ee.Image(100).rename('cloud').where(image.select('QA_PIXEL').eq(322),0).where(image.select('QA_PIXEL').eq(386),0)
  .where(image.select('QA_PIXEL').eq(834),0).where(image.select('QA_PIXEL').eq(898),0).where(image.select('QA_PIXEL').eq(1346),0)
  //water should also not be treated as clouds
  //https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/atoms/files/LSDS-1368_L8_SurfaceReflectanceCode-LASRC_ProductGuide-v2.pdf
  .where(image.select('QA_PIXEL').eq(324),0).where(image.select('QA_PIXEL').eq(388),0)
  .where(image.select('QA_PIXEL').eq(836),0).where(image.select('QA_PIXEL').eq(890),0).where(image.select('QA_PIXEL').eq(1348),0);
  //.clipToCollection(complexCollection);//why is it necessary to clip? to get the geometry of the footprint?
  var image3 =  image2.updateMask(ee.Image(image).select('QA_PIXEL').gt(1));
      return ee.Image(image).updateMask(image2.select(['cloud']).lt(30))
      .addBands(image2.select(['cloud']));
        //.set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2});
};
var cloudscore_L8_T1L2 = function(image,area_of_interest) {
 // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  // Develop masks for unwanted pixels (fill, cloud, cloud shadow).
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  //var saturationMask = image.select('QA_RADSAT').eq(0);  
  var mask = qaMask;//.add(saturationMask);
  var image2 = ee.Image(100).rename('cloud').where(qaMask.eq(1),0);//.where(saturationMask.eq(1),0);
  var image3 =  image2.updateMask(ee.Image(image).select('QA_PIXEL').neq(0));
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 100,'tileScale':2}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 100,'tileScale':2}).get('cloud'));
      /*return ee.Image(image).addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(image2.select(['cloud']).lt(100)).addBands(image2)
        .addBands(mask.rename('mask'))
        .set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2})
        .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'))
      .set('SATELLITE','LANDSAT_8');*/
  return ee.Image(image).updateMask(image2.select(['cloud']).lt(30))
    .addBands(image2.select(['cloud']));
};
// This function adds a cloud score band to landsat imagery
var cloudscore_L7_pro = function(image) {
  var image2 = ee.Image(100).rename('cloud').where(image.select('QA_PIXEL').eq(66),0).where(image.select('QA_PIXEL').eq(130),0)
      //water should also not be treated as clouds
      .where(image.select('QA_PIXEL').eq(68),0).where(image.select('QA_PIXEL').eq(132),0)
      //.clipToCollection(complexCollection);
  var image3 = image2.updateMask(ee.Image(image).select('QA_PIXEL').gt(1));
  return ee.Image(image).updateMask(image2.select(['cloud']).lt(30))
      .addBands(image2.select(['cloud']));
        //.set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2});
};
var cloudscore_L7_T1L2 = function(image,area_of_interest) {
//create an image which is 100 where there might be clouds and zero where the scene is clear or where there is water
//according to the landsat quality band
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var mask = qaMask;
  var image2 = ee.Image(100).rename('cloud').where(qaMask.eq(1),0);
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  var image3 =  image2.updateMask(ee.Image(image).select('QA_PIXEL').neq(0));
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': area_of_interest, 'scale': 100,'tileScale':2}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': area_of_interest, 'scale': 100,'tileScale':2}).get('cloud'));
  /*return ee.Image(image).addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true)
    .updateMask(image2.select(['cloud']).lt(100)).addBands(image2)
        .addBands(mask.rename('mask'))
    .set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2})
    .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'))
    .set('SATELLITE','LANDSAT_7');*/
  return ee.Image(image).updateMask(image2.select(['cloud']).lt(30))
      .addBands(image2.select(['cloud']));
};
//This function adds a NDVI band to all images
var addNDVI_l8 = function(image) {
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');//.float();
  return image.rename(all_bands_l8).addBands(ndvi);
  };
var addNDVI_l7 = function(image) {
  var ndvi = image.normalizedDifference(['SR_B4', 'SR_B3']).rename('NDVI');//.float();
  return image.rename(all_bands_l7).addBands(ndvi);
  };
function addbands_l8(image) {
  var mndwi = image.normalizedDifference(['SR_B3', 'SR_B6']).rename('MNDWI');
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  var bands = ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5','SR_B6','SR_B7', 'cloud','QA_PIXEL'];
  var newbands = ['Blue', 'Green', 'Red', 'NIR','SWIR1','SWIR2', 'cloud','QA_PIXEL'];
  return image.select(bands).rename(newbands).addBands(mndwi).addBands(ndvi);
}
function addbands_l7(image) {
  var mndwi = image.normalizedDifference(['SR_B2', 'SR_B5']).rename('MNDWI');
  var ndvi = image.normalizedDifference(['SR_B4', 'SR_B3']).rename('NDVI');
  var bands = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4','SR_B5','SR_B7', 'cloud','QA_PIXEL'];
  var newbands = ['Blue', 'Green', 'Red', 'NIR','SWIR1','SWIR2', 'cloud','QA_PIXEL'];
  return image.select(bands).rename(newbands).addBands(mndwi).addBands(ndvi);
}
function rename_landsat(image){
  var newbands = ['Blue', 'Green', 'Red', 'NIR','SWIR1','SWIR2','MNDWI','NDVI','cloud','QA_PIXEL'];
  return image.select(['B', 'G', 'R', 'NIR','SWIR1','SWIR2','MNDWI','NDVI','cloud','QA_PIXEL'])
    .rename(newbands);
}
// Use these independent variables in the harmonic regression. 
var harmonicIndependents = ee.List(['constant','cos1','sin1','cos2', 'sin2','cos3', 'sin3']); 
var satProjection;
function joinCollections2(imageCollection1, imageCollection2) {
  var filterTimeEq = ee.Filter.and(
      ee.Filter.equals({
        leftField:'SENSING_TIME', 
        rightField:'SENSING_TIME'
      }),
      ee.Filter.intersects({
        leftField: '.geo',
        rightField: '.geo',
        maxError: 1000
      }));
  var joined = ee.Join.inner().apply(imageCollection1, imageCollection2, filterTimeEq);
  return joined.map(function(feature) {
    return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  });
}
var get_all_coeffs=function(VIselect,img){
  var previous=ee.Image(img);
  //var str4=ee.String(VIselect);
  // var TrendCoefficients=ee.Image(ee.Algorithms.If(str4.compareTo('MaxNDVI').eq(0),greenest_1to12,get_trend_coef(str4)));
  /*var TrendCoefficients=ee.Image(ee.Algorithms.If(str4.compareTo('MaxNDVI').eq(0), greenest_1to12,
  ee.Algorithms.If(str4.compareTo('STD_NDVI').eq(0), ndvi_std,
  get_trend_coef(str4))));*/
  //var TrendCoefficients=ee.Image(get_trend_coef(str4));
  // Band1: Name of the dependent variable. 
  var dependent = ee.String(VIselect); 
  //filtered_sensor_data
  var harmonicS22 = sensor_data_4plotting.select(ee.List([dependent,'t','constant'])).map(function(image) { 
    var timeRadians = image.select('t').multiply(2 * small_omega * Math.PI); 
    var timeRadians2 = image.select('t').multiply(4 * small_omega * Math.PI);
    //var timeRadians3 = image.select('t').multiply(6 * small_omega * Math.PI);
    return image 
      .addBands(timeRadians.cos().rename('cos1')) 
      .addBands(timeRadians.sin().rename('sin1')) 
      .addBands(timeRadians2.cos().rename('cos2')) 
      .addBands(timeRadians2.sin().rename('sin2'));
      /*.addBands(timeRadians3.cos().rename('cos3')) 
      .addBands(timeRadians3.sin().rename('sin3')); */
  }); 
  //Fit the model as with the linear trend, then get a time series of fitted values: 
  var harmonicTrend = harmonicS22 
    .select(harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1)).add(dependent)) 
    .reduce({reducer: ee.Reducer.linearRegression(harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1)).length(), 1)}); //,parallelScale: tile_scale/2
  var harmonicTrendCoefficients = harmonicTrend.select('coefficients') 
    .arrayProject([0]) 
    .arrayFlatten([harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1))]);  
  //return harmonicTrendCoefficients;
  return previous.addBands(harmonicTrendCoefficients);
};
//harmonicTrendCoefficients_1.addBands(harmonicTrendCoefficients_2).addBands(harmonicTrendCoefficients_3).addBands(harmonicTrendCoefficients_4)
var compute_fitted_values=function(VIsel,sensor_data_input, par_scale){  
  var harmonicS22forfit=ee.ImageCollection(sensor_data_input).select(ee.List([ee.String(VIsel),'t','constant'])).map(function(image) { 
    var timeRadians = image.select('t').multiply(2 * small_omega * Math.PI); 
    var timeRadians2 = image.select('t').multiply(4 * small_omega * Math.PI);
    var timeRadians3 = image.select('t').multiply(6 * small_omega * Math.PI);
    return image 
      .addBands(timeRadians.cos().rename('cos1')) 
      .addBands(timeRadians.sin().rename('sin1')) 
      .addBands(timeRadians2.cos().rename('cos2')) 
      .addBands(timeRadians2.sin().rename('sin2'));
      /*.addBands(timeRadians3.cos().rename('cos3')) 
      .addBands(timeRadians3.sin().rename('sin3'));*/ 
  }); 
  var harmonicTrend2 = harmonicS22forfit
    .select(harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1)).add(ee.String(VIsel))) 
    .reduce({reducer: ee.Reducer.linearRegression(harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1)).length(), 1),parallelScale: par_scale});   
  //Plug the coefficients in to the equation above in order to get a time series of fitted values: 
  //Turn the array image into a multi-band image of coefficients. 
  var harmonicTrendCoefficients = harmonicTrend2.select('coefficients') 
    .arrayProject([0]) 
    .arrayFlatten([harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1))]); 
  // Compute fitted values. 
  return harmonicS22forfit.map(function(image) { 
    return image.addBands( 
      image.select(harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1))) 
        .multiply(harmonicTrendCoefficients) 
        .reduce('sum') 
        .rename('fitted')); 
  }); 
};  
// This field contains UNIX time in milliseconds. 
var timeField = 'system:time_start';
var add_time_data=function(image) {
  var date = ee.Date(image.get(timeField)); 
  var years = date.difference(ee.Date('1970-01-01'), 'year'); 
  return image 
    // Add a time band. 
    .addBands(ee.Image(years).rename('t').float()) 
    // Add a constant band. 
    .addBands(ee.Image.constant(1));
};  
//Bands used in the harmonic regression:
var used_bands=ee.List(['NDVI','NIR','SWIR2'])//,'SWIR1'
//Define all the UI elements
var wb_button=ui.Button({
    label: 'Water Balance Information'});
var checkbox = ui.Checkbox('Show Double Crop Planting Area', false);
var checkbox2 = ui.Checkbox('Create Crop Map Download Link',false);
var checkbox_ET = ui.Checkbox('Create ET Map Download Link',false);
var checkbox_P = ui.Checkbox('Create Precipitation Map Download Link',false);
var checkbox2b = ui.Checkbox('Create Double Crop Planting Map Download Link',false);
var checkbox2_panel=ui.Panel([], ui.Panel.Layout.Flow('horizontal')).add(checkbox2);
var checkbox2b_panel=ui.Panel([], ui.Panel.Layout.Flow('horizontal')).add(checkbox2b);
var checkbox_ET_panel=ui.Panel([], ui.Panel.Layout.Flow('horizontal')).add(checkbox_ET);
var checkbox_P_panel=ui.Panel([], ui.Panel.Layout.Flow('horizontal')).add(checkbox_P);
var checkbox3 = ui.Checkbox('Show Crop Area Development over Time',false);
var plz_wait2=ui.Label('Please wait...', {color: 'red', fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
checkbox2.onChange(function(checked) {
  var aoi_selected_simple=aoi_selected.bounds(100);
  var newdownloadname=ee.String('CropMap_').cat(ee.String(aoi_selected_ft.get('NAIM')))
  .cat('_').cat(ee.String(ee.Number(year).toShort())).cat('_')
  .cat(ee.String(res_sel.toShort())).cat('m');
  print('newdownloadname',newdownloadname);
  checkbox2_panel.add(plz_wait2);
  checkbox2.setDisabled(true);  
  var region = batch.getRegion(aoi_selected);
  //print('region',region)
    // Request the value from the server.
    /*aoi_selected_simple.evaluate(function(result) {
      var region = JSON.stringify(result);
      var background = ee.Image(0);*/
      //var cluster_mapBlended = background.blend(cluster_map);
    var cluster_mapBlended = cluster_map;
    //print('cluster_mapBlended',cluster_mapBlended);
    newdownloadname.evaluate(function(result) {
      res_sel.evaluate(function(sc){
        download_tif_label = ui.Label({ value : "Download Crop Map as TIF", style : { shown:true },targetUrl : cluster_mapBlended.int8().getDownloadURL({scale: sc, region: region, name :result})} );
        //var download_tif_label = ui.Label({ value : "Download Crop Map as TIF", style : { shown:true },targetUrl : cluster_mapBlended.int32().getDownloadURL({scale: res_sel, region: region, name :result2})} );
        //panel_new.remove(panel_new.widgets().get(3));
        panel_new.widgets().set(3, download_tif_label);
        checkbox2_panel.remove(plz_wait2);
      });
    });
});
var plz_wait2b=ui.Label('Please wait...', {color: 'red', fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
checkbox2b.onChange(function(checked) {
    var aoi_selected_simple=aoi_selected.bounds(100);
    checkbox2b_panel.add(plz_wait2b);
    checkbox2b.setDisabled(true);
    // Request the value from the server.
    /*aoi_selected_simple.evaluate(function(result) {
      var region = JSON.stringify(result);*/
    var newdownloadname=ee.String('DoubleCropPlantingMap').cat(ee.String(aoi_selected_ft.get('NAIM')))
      .cat('_').cat(ee.String(ee.Number(year).toShort())).cat('_')
      .cat(ee.String(res_sel.toShort())).cat('m');
    var region = batch.getRegion(aoi_selected);
    var background = ee.Image(0);
    var cluster_mapBlended_b = background.blend(double_crop_map);
    print('newdownloadname',newdownloadname)
    newdownloadname.evaluate(function(result) {
      res_sel.evaluate(function(sc){
      var download_dtif_label = ui.Label({ value : "Download Double Crop Planting Map as TIF", style : { shown:true },targetUrl : cluster_mapBlended_b.int32().getDownloadURL({scale: sc, region: region, name :result})} );
      //panel_new.remove(panel_new.widgets().get(3));
      panel_new.widgets().set(4, download_dtif_label);
      checkbox2b_panel.remove(plz_wait2b);
      });
    });
});
var plz_wait3=ui.Label('Please wait...', {color: 'red', fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
checkbox_ET.onChange(function(checked) {
    var aoi_selected_simple=aoi_selected.bounds(100);
    checkbox_ET_panel.add(plz_wait3);
    checkbox_ET.setDisabled(true);
    // Request the value from the server.
    //aoi_selected_simple.evaluate(function(result) {
    var region = batch.getRegion(aoi_selected);
      //var region = JSON.stringify(result);
      var background = ee.Image(0);
      var cluster_mapBlended_b = background.blend(ET_annual_img.clip(aoi_selected));
      var download_dtif_label = ui.Label({ value : "Download ET Map as TIF", style : { shown:true },targetUrl : cluster_mapBlended_b.int32().getDownloadURL({scale: 30, region: region, name :"ET_Map"})} );
      panel_new.widgets().set(5, download_dtif_label);
      checkbox_ET_panel.remove(plz_wait3);
    //});
});
var plz_wait4=ui.Label('Please wait...', {color: 'red', fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
checkbox_P.onChange(function(checked) {
    var aoi_selected_simple=aoi_selected.bounds(100);
    checkbox_P_panel.add(plz_wait4);
    checkbox_P.setDisabled(true);
    // Request the value from the server.
    //aoi_selected_simple.evaluate(function(result) {
    var region = batch.getRegion(aoi_selected);
      //var region = JSON.stringify(result);
      var background = ee.Image(0);
      //var cluster_mapBlended_b = background.blend(P_annual_img.clip(result));
      var cluster_mapBlended_b = P_annual_img;
    //res_sel.evaluate(function(sc){
      var download_dtif_label = ui.Label({ value : "Download Precipitation Map as TIF", style : { shown:true },targetUrl : cluster_mapBlended_b.int32().getDownloadURL({scale: 1000, region: region, name :"PrecipMap"})} );
      panel_new.widgets().set(6, download_dtif_label);
      checkbox_P_panel.remove(plz_wait4);
    //});
});
var all_bands_s2=ee.List(["Aerosols",	"Blue",	"Green",	"Red",	"Red Edge 1",	"Red Edge 2",	"Red Edge 3",	"NIR",	"Red Edge 4",	"Water vapor",	"Cirrus",	"SWIR1",	"SWIR2",	"QA10",	"QA20",	"QA60"]);
var all_bands4chart=["NDVI",	"Blue",	"Green",	"Red",	"NIR",	"SWIR1",	"SWIR2"];
var all_bands_l8 = ee.List(["Ultra Blue",	"Blue",	"Green",	"Red",	"NIR",	"SWIR1",	"SWIR2",	"Brightness Temperature 1",	"Brightness Temperature 2",	"sr_aerosol",	"QA_PIXEL",	"radsat_qa",'cloud']);
var all_bands_l7 = ee.List(["Blue",	"Green",	"Red",	"NIR",	"SWIR1",	"Brightness Temperature",	"SWIR2",	"sr_atmos_opacity",	"sr_cloud_qa",	"QA_PIXEL",	"radsat_qa",'cloud']);
var start_season=ee.Date.fromYMD(ee.Number(year_tmp), 4, 1);
var end_season=ee.Date.fromYMD(ee.Number(year_tmp), 9, 30);
var start_season_month=start_season.get('month').subtract(4);
var end_season_month=end_season.get('month').subtract(4);
var nb_of_months=ee.Number(6);
var et_product=4; //METRIC
var ET_monthly_imgs_prod1=ET_monthly_imgs_2018;
var ET_annual_img_prod1=ee.ImageCollection(ET_monthly_imgs_prod1.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
//var ET_annual_img_prod2=ee.ImageCollection(ET_monthly_imgs_prod2.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
//var ET_annual_img_prod3=ee.ImageCollection(ET_monthly_imgs_prod3.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
//var ET_annual_img_prod4=ee.ImageCollection(ET_monthly_imgs_prod4.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
//print('ET_annual_img_prod4',ET_annual_img_prod4)
var ET_monthly_imgs=ET_monthly_imgs_prod1;
var ET_annual_img= ET_annual_img_prod1;
print('ET_annual_img',ET_annual_img);
var years_select = ui.Select({
    items: year_list/*[ 
    {label:  '2018', value: 2018},
    {label:  '2019', value: 2019}
     ]*/,
    onChange: function(key){
      year_tmp=key;//ee.Number(key);
      aoiisnew=1;
      ET_select.items().reset(ET_products);
      p_select.items().reset(precipitation_products);
      if (key<2018 || key>2019){//METRIC ONLY AVAILABLE FOR 2018 AND 2019
        ET_select.items().remove(ET_select.items().get(4));
        if (et_product==4) {
          et_product=3;
          //ET_select.setPlaceholder('MODIS ET');
        }
      } 
      //if (key==thisyear){ //ERA5 and therefore SEBAL likely not complete for current year
      if (key<2016){
        ET_select.items().remove(ET_select.items().get(3));
        //ET_select.items().remove(ET_select.items().get(2));
        if (/*et_product==2 ||*/ et_product==3) {
          et_product=2;
          //ET_select.setPlaceholder('MODIS ET');
        }
        print('ET_select.items()',ET_select.items())
      }
      if (key==thisyear && new Date().getMonth()<11){//hopefully until December the ERA5 images are there for SEBALIGEE
        ET_select.items().remove(ET_select.items().get(3));
        ET_select.items().remove(ET_select.items().get(2));
        if (et_product==2 || et_product==3) {
          et_product=0;
          //ET_select.setPlaceholder('MODIS ET');
        }
        print('ET_select.items()',ET_select.items())
      }
      if (key<2013){
        ET_select.items().remove(ET_select.items().get(3));
        ET_select.items().remove(ET_select.items().get(2));
        if (et_product==2 || et_product==3) {
          et_product=0;
          //ET_select.setPlaceholder('MODIS ET');
        }
      }      
      if (key<2003){//PML also not available
        ET_select.items().remove(ET_select.items().get(1));
        if (et_product==1) {
          et_product=0;
        }
      }
      if (key>2020){//PML also not available
        ET_select.items().remove(ET_select.items().get(1));
        if (et_product==1) {
          et_product=0;
        }
      }
      /*if (key>2017){
        ET_select.items().remove(ET_select.items().get(1));
        if (et_product==1) {
          et_product=0;
          //ET_select.setPlaceholder('MODIS ET');
        }
      } */
      //TRMM no longer being updated
      if (key>2019){
        p_select.items().remove(p_select.items().get(1));
        p_product=ee.Number(ee.Algorithms.If(p_product.eq(1),5,p_product));
      }
      //ET_select.setValue(et_product);
      new_ET_map(et_product);
      //print('et_product',ee.Dictionary(ET_select.items().get(et_product)).get('label'))
      print('et_product',ET_products[et_product]['label']);
      ET_select.setPlaceholder(ET_products[et_product]['label']);
      p_img_sel=ee.ImageCollection(p_img_col.get(p_product)).filter(ee.Filter.calendarRange(ee.Number(year_tmp), ee.Number(year_tmp), 'year')).filter(ee.Filter.calendarRange(4, 9, 'month')).select(ee.String(p_band.get(p_product)));
      p_img_monthly=ee.List.sequence(4,9).map(function(m){
         var p_tmp= p_img_sel.filter(ee.Filter.calendarRange(ee.Number(m), ee.Number(m), 'month')).sum();
         return ee.Image(ee.Algorithms.If(ee.Number(p_tmp.bandNames().length()).eq(0),ee.Image(0),p_tmp.multiply(ee.Image(ee.Number(p_multiply.get(p_product))))))
         .rename('precip');
      });  
      print('p_img_monthly',p_img_monthly);
      P_annual_img=ee.ImageCollection(p_img_monthly.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
      print('P_annual_img',P_annual_img);
    }
}).setPlaceholder('Please wait...');
//var all_bands_List=ee.List([ee.List(['-']).cat(all_bands_s2),ee.List(['-','LST_L8']).cat(all_bands_l8),ee.List(['-']).cat(all_bands_l7),ee.List(['-'])]);
//var current_bands=ee.List(all_bands_List.get(0));
var ndviclick_function;
var display_bands=ui.Select({
    onChange: function(key){
      VIselect=key;
      if (added_left==1){
        ndviclick_function();
      }
      if (added_right==1){  
        ndviclick2_function();
      }
      ndvisignature_function();
    }
}).setPlaceholder('NDVI');
var VI_select_chart = ui.Panel([
  ui.Label('Selected Band for Signature Charts:', {fontSize: '12px', margin: '15px 1px 1px 10px'}),
  display_bands,
  ui.Button({label: 'Resubmit',style: {backgroundColor: 'blue',padding: '2px'},
  onClick:function(){ndvisignature_function()}})
],ui.Panel.Layout.Flow('horizontal'));
var ndviclick_function=function() {
  added_left=1;
  //timeserieschart=1;
    //panel_new.remove(multi_annual_ndvi_chart)
    panel_new.remove(annual_ndvi_chart);
    /*if (added_right===0){
      panel_new.remove(VI_select_chart);
    }*/
  //fittedHarmonic=compute_fitted_values(VIselect,filtered_sensor_data.filterBounds(point.geometry().buffer(1000,100)));
  fittedHarmonic=compute_fitted_values(VIselect,filtered_sensor_data.filterBounds(point.geometry().buffer(1000,100)).map(function(img){return ee.Image(img).clip(point.geometry().buffer(1000,100))}),1);
  var fittedHarmonic_stacked=fittedHarmonic.select('fitted').map(function(img) { 
    var stack_bands=function(x,cluster_map_stacked) {
      var image=ee.Image(img).updateMask(cluster_map.eq(ee.Number(x)));
      return ee.Image(cluster_map_stacked).addBands(image.select('fitted').rename(ee.String("c").cat(ee.String(ee.Number(x).int()))));
    };
    return ee.Image(ee.List(new_crop_ids).iterate(stack_bands, ee.Image(img))).slice(1);
  });
  annual_ndvi_chart = ui.Chart.image.series(fittedHarmonic_stacked, point.geometry().buffer(1000,100),  ee.Reducer.mean(), res_sel);
  var new_simple_palette=ee.List(new_palette).slice(1, 10);
  //new_palette1
  new_simple_palette.evaluate(function(result_c) {
    annual_ndvi_chart.setOptions({title: 'Mean Fitted Values; AoI RIGHT MAP',
      lineWidth: 1, 
      pointSize: 3,
      vAxis: {minValue:0,maxValue:1},
      colors: result_c
    });
    /*if (added_right===0){
      panel_new.add(VI_select_chart);
    }*/
    panel_new.add(annual_ndvi_chart);
    var sample_c = cluster_map.int().stratifiedSample({
        region:point.geometry().buffer(1000,100),
        numPoints: 1,
        classBand:'clusters',
        scale: res_sel
    });
    var crops4c=sample_c.aggregate_array('clusters').removeAll(ee.List([0]));    
    new_palette3=crops4c.map(function(x) {
      return ee.String(new_simple_palette.get(ee.Number(x).subtract(1)));
    });
    //print('new_palette3',new_palette3);
    new_palette3.evaluate(function(result_c) {
      annual_ndvi_chart.setOptions({title: 'Mean Fitted Values; AoI RIGHT MAP',
      lineWidth: 1,pointSize: 3,vAxis: {minValue:0,maxValue:0.75},colors:result_c});
    });
  });
};
var ndvisignature_function=function() {
  panel_new.widgets().set(10, ui.Label());
  panel_new.remove(overall_ndvi_chart);
  var samplePoints=cluster_map.updateMask(cluster_map.gt(0)).int()
      .stratifiedSample({
          region:aoi_selected,//Ferghana_bounds,//aoi_selected.bounds(100),
          numPoints: pix2sample,
          classBand:'clusters',
          tileScale: 2,
          scale: 100,//res_sel,
          geometries: true
      });
  print('samplePoints',samplePoints);
  //fittedHarmonic=compute_fitted_values(VIselect,sensor_data_mosaic,8);
  fittedHarmonic=compute_fitted_values(VIselect,filtered_sensor_data,8);
  //fittedHarmonic=compute_fitted_values(VIselect,filtered_sensor_data.map(function(img){return ee.Image(img).clipToCollection(samplePoints)}),2);
  var fittedHarmonic_stacked=fittedHarmonic.select('fitted').map(function(img) { 
    var stack_bands=function(x,cluster_map_stacked) {
      var image=ee.Image(img).updateMask(cluster_map.int().eq(ee.Number(x)));
      return ee.Image(cluster_map_stacked).addBands(image.select('fitted').rename(ee.String("c").cat(ee.String(ee.Number(x).int()))));
    };
    return ee.Image(ee.List(new_crop_ids).iterate(stack_bands, ee.Image(img).clipToCollection(complexCollection))).slice(1);
  });
  print('fittedHarmonic_stacked',fittedHarmonic_stacked);
  var sampleVals = ee.FeatureCollection(fittedHarmonic_stacked.sort('system:time_start')
    .map(function(image){
  //attention: reduceRegion applied at a 100m scale without reprojection first, means that all data are automatically reduced to a 100m resolution from the beginning
    var mean = image.reduceRegion({ 
      reducer: 'mean',
      geometry: samplePoints.geometry(),//aoi_selected.bounds(100),/
      scale: 100,// res_sel, //100// native scale of the bands
      tileScale: 8,//tile_scale,
      maxPixels: 1e9,
    });
    return ee.Feature(null, mean).set(image.toDictionary(['system:time_start'])); // copy the image properties image.propertyNames()
  }));
  print('sampleVals',sampleVals);
  overall_ndvi_chart =ui.Chart.feature.byFeature(sampleVals, 'system:time_start');
  //new_palette1.evaluate(function(result_c) {
  var new_simple_palette=ee.List(new_palette).slice(1, 10);
  new_simple_palette.evaluate(function(result_c) {
    overall_ndvi_chart.setOptions({title: 'Mean Fitted Values - RANDOM SAMPLE',//100m resolution
    lineWidth: 2,pointSize: 0, curveType: 'function',vAxis: {minValue:0,maxValue:0.75},colors:result_c});
    panel_new.widgets().set(10,overall_ndvi_chart);
  });
  //panel_new.add(overall_ndvi_chart);
};
var ndviclick2_function=function() {
    added_right=1;
    panel_new.remove(annual_ndvi_chart2);    
      /*if (added_left===0){
        panel_new.remove(VI_select_chart);
      } */     
      // Add a dot to the map where the user clicked.
    //fittedHarmonic=compute_fitted_values(VIselect,filtered_sensor_data.filterBounds(point2));
    fittedHarmonic=compute_fitted_values(VIselect,filtered_sensor_data.map(function(img){return ee.Image(img).clip(point2.geometry())}),1);
    annual_ndvi_chart2 = ui.Chart.image.series(fittedHarmonic.select(['fitted',VIselect]), point2, null, res_sel);
    annual_ndvi_chart2.setOptions({title: 'Point of Interest; LEFT MAP',
      lineWidth: 1, 
      pointSize: 2,
      series: {
          1: {lineWidth: 2,pointSize: 0, curveType: 'function'},
      },
      vAxis: {minValue:0,maxValue:1},
    });
    /*if (added_left===0){
        panel_new.add(VI_select_chart);
    }*/
    panel_new.add(annual_ndvi_chart2);
    //cluster to which the point of interest belongs:
    var cl=ee.Number(cluster_map.reduceRegion({'reducer': ee.Reducer.first(),'geometry':point2.geometry(),'scale':res_sel}).get('clusters'));
    //print('cluster Point of Interest',cl);
    cl.evaluate(function(result) {
      annual_ndvi_chart2.setOptions({title: 'Point of Interest (Cluster: ' + result + '), LEFT MAP',
      lineWidth: 1,pointSize: 2,      
      series: {
          1: {lineWidth: 2,pointSize: 0, curveType: 'function'},
      },
      });
    });
};
/*current_bands.evaluate(function(bands){
  box_other1.items().reset(bands);
  box_other2.items().reset(bands);
});*/
var complete_band_list=all_bands4chart;//ee.List(['NDVI']).cat(current_bands.slice(2));
//complete_band_list.evaluate(function(bands){
  display_bands.items().reset(complete_band_list);
//});
var first_year_list=ee.List([2016,2013,2000,2000]);
/*var sensor_years=ee.List([
    [{label:  '2016', value: 2016},{label:  '2017', value: 2017},{label:  '2018', value: 2018},{label:  '2019', value: 2019}],
    [{label:  '2013', value: 2013},{label:  '2014', value: 2014},{label:  '2015', value: 2015},{label:  '2016', value: 2016},{label:  '2017', value: 2017},{label:  '2018', value: 2018},{label:  '2019', value: 2019}],
    [{label:  '1999', value: 1999},{label:  '2000', value: 2000},{label:  '2001', value: 2001},{label:  '2002', value: 2002},{label:  '2003', value: 2003},{label:  '2004', value: 2004},{label:  '2005', value: 2005},
     {label:  '2006', value: 2006},{label:  '2007', value: 2007},{label:  '2008', value: 2008},{label:  '2009', value: 2009},{label:  '2010', value: 2010},{label:  '2011', value: 2011},{label:  '2012', value: 2012},
     {label:  '2013', value: 2013},{label:  '2014', value: 2014},{label:  '2015', value: 2015},{label:  '2016', value: 2016},{label:  '2017', value: 2017},{label:  '2018', value: 2018},{label:  '2019', value: 2019}],
    [{label:  '2013', value: 2013},{label:  '2014', value: 2014},{label:  '2015', value: 2015},{label:  '2016', value: 2016},{label:  '2017', value: 2017},{label:  '2018', value: 2018},{label:  '2019', value: 2019}]]);
var sensor_years_simple=ee.List([ee.List.sequence(2016,2019),ee.List.sequence(2013,2019),ee.List.sequence(1999,2019),ee.List.sequence(2013,2019)]).getInfo();
var sensor_years_simple=ee.List([ee.List.sequence(2018,2019),ee.List.sequence(2018,2019),ee.List.sequence(2018,2019)]).getInfo();
*/
var sensor_select = ui.Select({
    items: [ 
    {label:  'Sentinel-2', value: 0},
    //{label:  'Landsat 8', value: 1},
    //{label:  'Landsat 7', value: 2},
    {label:  'Landsat', value: 3}],
    onChange: function(key){
      sensor_id_tmp=key;
      aoiisnew=1;
      res_sel=ee.Number(ee.Algorithms.If(ee.Number(sensor_id_tmp).eq(0),10,30)).toShort();
      //modify the list of avilable bands
      //current_bands=ee.List(all_bands_List.get(key));
      //var complete_band_list=ee.List(['NDVI']).cat(current_bands.slice(2));
        //years_select.items().reset(sensor_years.get(key).getInfo());
      var year_list_new=ee.List.sequence(ee.Number(first_year_list.get(sensor_id_tmp)),ee.Number(thisyear)).map(function(nb){
              return {label: ee.String(ee.Number(nb).int()), value: nb};
        }); 
      print('year_list_new',year_list_new);
      years_select.items().reset(year_list_new.getInfo());
      var sensor_years=ee.List.sequence(ee.Number(first_year_list.get(sensor_id_tmp)),ee.Number(thisyear));
      var ind=ee.Number(sensor_years.indexOf(ee.Number(year_tmp)));
      ind.evaluate(function(result) {
        if (result > -1){
          years_select.setValue(years_select.items().get(result)['value']);
          years_select.setPlaceholder(years_select.items().get(result)['label']);
        } else {
          years_select.setValue(years_select.items().get(0));
        }
      });
    }
}).setPlaceholder('Sentinel-2');
var county_names=ee.List(shapes_FERG.aggregate_array('NAIM'));
var county_list=ee.Dictionary.fromLists(county_names.distinct(), county_names.distinct()).keys().getInfo();
var area_select = ui.Select({
    items: county_list,
    onChange: function(key){
        aoiisnew=1;
        aoi_selected_ft = ee.Feature(shapes_FERG.filter(ee.Filter.eq('NAIM', key)).first());
        aoi_selected_tmp=aoi_selected_ft.geometry().simplify(500);
        complexCollection_tmp= shapes_FERG.filter(ee.Filter.eq('NAIM', key));
        middleMap.layers().set(0,ui.Map.Layer(d,null,'Area of Interest'));
        layerGeometry = ui.Map.Layer( aoi_selected_tmp,{color: '#FFFF00'}  );
        middleMap.layers().set(1,  layerGeometry );
        satelliteMap.layers().set(0,ui.Map.Layer(d,null,'Area of Interest'));
        layerGeometry2 = ui.Map.Layer( aoi_selected_tmp,{color: '#FFFF00'}  );
        satelliteMap.layers().set(1,  layerGeometry2 );
        middleMap.centerObject(aoi_selected_tmp);
        aoi_feat_area=aoi_selected_tmp.area().multiply(1e-6);
        aoi_feat_area.evaluate(function(result) {
          unit_name_and_area=ui.Label({value: "Selected Unit: " + aoi_selected_ft.get('NAIM').getInfo() + "; Total Area in sq. km: " + result.toFixed(2) , style: {fontWeight: '450', fontSize: '12px'}});
        });
        var area_ft = aoi_selected_ft.get('area').getInfo();
        if (area_ft<50){
          tile_scale=4;
        } else {if (area_ft<100) {
          tile_scale=8;
        } else {if (area_ft<200) {
          tile_scale=12;
        } else {
          tile_scale=16;
        }}}
        print('tile_scale',tile_scale)
    }
}).setPlaceholder('ФАРГОНА');
var crop_no_select = ui.Select({
    items: [ 
    {label:  'Automatic', value: 0},
    {label:  '1', value: 1},
    {label:  '2', value: 2},
    {label:  '3', value: 3},
    {label:  '4', value: 4},
    {label:  '5', value: 5},
    {label:  '6', value: 6},
    {label:  '7', value: 7},
    {label:  '8', value: 8},
    {label:  '9', value: 9}
     ],
    onChange: function(key){
      crop_no_tmp=key;//ee.Number(key);
    }
}).setPlaceholder('Automatic');
var cc_threshold=50; var nd_threshold=90; var scc_threshold=50;
var continueButton=ui.Button({label: 'Submit',style: {backgroundColor: 'red',padding: '2px'}});
var continueButton2=ui.Button({label: 'Submit',style: {backgroundColor: 'red',padding: '2px'}});
var title = ui.Label('Click on the map to select LEFT Point of Interest');
var title2 = ui.Label('Click on the map to select RIGHT Area of Interest');
var hydrosolutions = ui.Label({ value : "hydrosolutions.ch: ", style : { shown:true ,color:'blue', fontWeight: '600', fontSize: '11px',margin: '4px 1px 2px 1px',height:'12px'}, targetUrl : "https://www.hydrosolutions.ch/projects/cropmapper-ferghana"  } );
var manual = ui.Label({ value : "APP MANUAL", style : { shown:true ,fontFamily:"arial",color:'black', fontWeight: '500', fontSize: '11px',margin: '4px 1px 2px 1px',height:'12px'}, targetUrl : "https://30867c33-1fc0-4c0a-9951-79ede3db345a.filesusr.com/ugd/858ea7_5a2de1ca6e7c42e785c57068b90dbdc5.pdf"  } );
var hydrosolutions_manual=ui.Panel({widgets: [hydrosolutions,manual],layout: ui.Panel.Layout.flow('horizontal'),style: {position: 'top-center',height: '22px',padding:"2px"}});
//hydrosolutions.style().set('position', 'top-center');
middleMap.add(hydrosolutions_manual);
var Logo_HydroSolutions= ee.Image("projects/ee-hsol/assets/logo_hsol_projected").resample('bicubic').resample('bicubic')
print('Logo_HydroSolutions',Logo_HydroSolutions);
var logo_hsol=ui.Thumbnail({
  image:Logo_HydroSolutions,//,
  params:{bands:['b1','b2','b3'],
  min:0,max:255},
  style:{width:'140px',height:'auto', margin: 'auto'}});
var Logos_PANEL=ui.Panel({
    style: {
    width: '150px',
    height: 'auto',
    padding: '10px',
    position: 'bottom-left'
    },
    widgets:[logo_hsol,
    ]
  });
middleMap.add(Logos_PANEL);
var label_label=ui.Label('CROP MAP POSTPROCESSING', {fontWeight: '450', fontSize: '16px', margin: '15px 1px 1px 10px'});
var instruction=ui.Label('Set label to <No-Crop Area> to remove the Cluster from the map. Clusters with the same label will be merged.', {fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
var instruction_sieve1=ui.Label('Outlier Filtering', {fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
var instruction_sieve2=ui.Label('Isolated groups of pixels smaller than the minimum field size will be reclassified as no-crop area. Attention, any value higher than zero will slow down the calculations. For faster vizualization of the map please zoom in.', {fontSize: '12px', margin: '1px 1px 1px 10px'});
var instruction_sieve=ui.Panel({widgets: [instruction_sieve1,instruction_sieve2],layout: ui.Panel.Layout.flow('vertical'),style: {width: '280px'}});
var sieve_th_textbox = ui.Textbox({
  style: {width: '40px'},
  onChange: function(text) {
    ppha_th=ee.Number.parse(text);
  }
}).setValue('0');
var sieve_panel=ui.Panel({widgets: [ui.Label('Min. field size (ha)',{fontSize: '12px', margin: '15px 1px 1px 10px'}),sieve_th_textbox],layout: ui.Panel.Layout.flow('horizontal'),style: {width: '280px'}});
/*wb_button.onClick(function(){
    wb_button.setDisabled(true);
    addwbanalysisButton( {position : "top-left",maxWidth: "300px"});
});*/
var precipitation_products=[ 
    {label:  'CHIRPS', value: 0}/*,{label:  'GLDAS', value: 1}*/,{label:  'TRMM', value: 1},{label:  'PERSIANN', value: 2},
    {label:  'GSMaP', value: 3},{label:  'GPM_v6', value: 4},{label:  'ERA5', value: 5}];
//ee.List(['CHIRPS','GLDAS','TRMM','PERSIANN','GSMaP','GPM_v6','ERA5']);
var p_img_col=ee.List([ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD'),//,ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H'),
                        ee.ImageCollection('TRMM/3B43V7'),ee.ImageCollection('NOAA/PERSIANN-CDR'),
                        ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational'),ee.ImageCollection('NASA/GPM_L3/IMERG_V06'),
                        ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY')]);
var p_band=ee.List(['precipitation'/*,'Rainf_tavg'*/,'precipitation','precipitation','hourlyPrecipRate','precipitationCal','total_precipitation']);
var p_multiply=ee.List([1/*,10800*/,720,1,1,0.5,1000*30]);//actually, ERA5 needs to be multiplied by the number of days per month
var p_product=ee.Number(5);
var p_img_sel=ee.ImageCollection(p_img_col.get(p_product)).filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(year_tmp, year_tmp, 'year')).filter(ee.Filter.calendarRange(4, 9, 'month')).select(ee.String(p_band.get(p_product)));
var p_img_monthly=ee.List.sequence(4,9).map(function(m){
    var p_tmp= p_img_sel.filter(ee.Filter.calendarRange(ee.Number(m), ee.Number(m), 'month')).sum();
    return ee.Image(ee.Algorithms.If(ee.Number(p_tmp.bandNames().length()).eq(0),ee.Image(0),p_tmp.multiply(ee.Image(ee.Number(p_multiply.get(p_product))))))
      .rename('precip');
});
var p_select=ui.Select({style:{fontWeight: '450', fontSize: '12px',width: '100px',height: '29px',margin: '15px 1px 1px 10px'}, 
      items: precipitation_products, onChange: 
        function(key){
          p_product=ee.Number(key);
          p_img_sel=ee.ImageCollection(p_img_col.get(ee.Number(key))).filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(year_tmp, year_tmp, 'year')).filter(ee.Filter.calendarRange(4, 9, 'month')).select(ee.String(p_band.get(ee.Number(key))));
          p_img_monthly=ee.List.sequence(4,9).map(function(m){
             var p_tmp= p_img_sel.filter(ee.Filter.calendarRange(ee.Number(m), ee.Number(m), 'month')).sum();
             return ee.Image(ee.Algorithms.If(ee.Number(p_tmp.bandNames().length()).eq(0),ee.Image(0),p_tmp.multiply(ee.Image(ee.Number(p_multiply.get(ee.Number(key)))))))
             .rename('precip');
          });  
          //satelliteMap.layers().set(0, ui.Map.Layer(ee.Image(p_img_monthly.get(5)), {color:['white','blue']}, 'p Sept'));
          P_annual_img=ee.ImageCollection(p_img_monthly.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
          if (iteration_id>0){
            middleMap.layers().set(2,ui.Map.Layer(P_annual_img, {bands: ['precip'],min: 0, max:nb_of_months.multiply(100).getInfo(), palette: ["white","blue"]},"Seasonal Precipitation").setOpacity(slider2.getValue()));
          }
        }} 
      ).setPlaceholder('ERA5');
var P_panel = ui.Panel([
    ui.Label("Precipitation Product", {fontWeight: '450', fontSize: '12px',width: '70px',height: '29px',margin: '15px 1px 1px 10px'}),
    p_select], ui.Panel.Layout.Flow('horizontal'));
var PtoMap_checkbox=ui.Checkbox({label:'Show on Map',value: false, style:{fontWeight: '450', fontSize: '12px', margin: '5px 1px 1px 5px',width: '70px'}});
//P_panel.add(PtoMap_checkbox);
//ET product selection
var ET_products=[{label:  'MODIS ET', value: 0},
   {label:  'PML', value: 1},
  //{label:  'NASA-FLADS', value: 1},
  //{label:  'GLDAS-2.1', value: 1},
  {label:  'SEBALIGEE L8', value: 2},
  {label:  'SEBALIGEE S2', value: 3},
  {label:  'METRIC L7/L8', value: 4},
];
print('FLADS',ee.ImageCollection('CAS/IGSNRR/PML/V2').filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(2017, 2017, 'year')).filter(ee.Filter.calendarRange(4, 9, 'month')));
//https://essd.copernicus.org/preprints/essd-2020-124/essd-2020-124.pdf
var et_img_col=ee.List([ee.ImageCollection('MODIS/006/MOD16A2'),
    ee.ImageCollection("projects/pml_evapotranspiration/PML/OUTPUT/PML_V2_8day_v016"),//unit: mm/day, res: 8-day
    //ee.ImageCollection('CAS/IGSNRR/PML/V2'),
    //ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001'),
    //ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE'),
    //ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
    ]);
var et_band=ee.List(['ET',/*'Evap_tavg',aet*/'Ec']);
var et_multiply=ee.List([0.1,/*3600*24*30,0.1*/8*0.01]);
var res_sel_ET=30;
var ET_label=['L8','S2'];
var new_ET_map=function(key){
      et_product=key;
      if (key<2){
        res_sel_ET=100;
        var et_img_sel=ee.ImageCollection(et_img_col.get(ee.Number(et_product))).filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(year_tmp, year_tmp, 'year')).filter(ee.Filter.calendarRange(4, 9, 'month'));
         if (key==1){
           /*var et_modis=ee.ImageCollection(et_img_col.get(ee.Number(0))).filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(year_tmp, year_tmp, 'year')).filter(ee.Filter.calendarRange(4, 9, 'month'))
           .select('ET').sum();*/
           var mod_lc=ee.ImageCollection("MODIS/006/MCD12Q1").filterBounds(Tumans.geometry()).filter(ee.Filter.calendarRange(ee.Number(2019).min(ee.Number(year_tmp)), ee.Number(thisyear), 'year')).first();
            //PML uses the same landcover data as MODIS           
            et_img_sel=et_img_sel.select(['Ec','Es','Ei']).map(function(img){return ee.Image(img).reduce('sum').rename('ET')
            //.updateMask(et_modis.gt(0))
            .updateMask(mod_lc.select('LC_Type1').neq(13))
            .set('system:time_start',img.get('system:time_start'))});
           } else {
            et_img_sel=et_img_sel.select(ee.String(et_band.get(et_product)));
         }
        print('et_img_sel',et_img_sel);
        ET_monthly_imgs=ee.List.sequence(4,9).map(function(m){
            var et_tmp= et_img_sel.filter(ee.Filter.calendarRange(ee.Number(m), ee.Number(m), 'month')).sum();
            return ee.Image(ee.Algorithms.If(ee.Number(et_tmp.bandNames().length()).eq(0),ee.Image(0),et_tmp.multiply(ee.Image(ee.Number(et_multiply.get(et_product))))))
              .rename('b1');
        });
      print('key < 2');
      } else if (key==2) {
        res_sel_ET=30;
        ET_monthly_imgs=ee.List([
          ETA_L8.sebaligee(year_tmp,4,Tumans.geometry()).rename('b1').set('month',4),
          ETA_L8.sebaligee(year_tmp,5,Tumans.geometry()).rename('b1').set('month',5),
          ETA_L8.sebaligee(year_tmp,6,Tumans.geometry()).rename('b1').set('month',6),
          ETA_L8.sebaligee(year_tmp,7,Tumans.geometry()).rename('b1').set('month',7),
          ETA_L8.sebaligee(year_tmp,8,Tumans.geometry()).rename('b1').set('month',8),
          ETA_L8.sebaligee(year_tmp,9,Tumans.geometry()).rename('b1').set('month',9),
          ]);
        print('key ==2');
        ET_monthly_imgs=ET_monthly_imgs.map(function(img){return ee.Image(img).updateMask(ee.Image(img).gte(0)).updateMask(ee.Image(img).lt(1000))});
        print('SEBALIGEE maps',ET_monthly_imgs);
        //print('area aoi',Tumans.geometry().area(100).multiply(1e-6));
      } else if (key==3) {
        res_sel_ET=30;//10;        
        ET_monthly_imgs=ee.List([
          ETA_S2.sebaligee(year_tmp,4,Tumans.geometry()).rename('b1').set('month',4),
          ETA_S2.sebaligee(year_tmp,5,Tumans.geometry()).rename('b1').set('month',5),
          ETA_S2.sebaligee(year_tmp,6,Tumans.geometry()).rename('b1').set('month',6),
          ETA_S2.sebaligee(year_tmp,7,Tumans.geometry()).rename('b1').set('month',7),
          ETA_S2.sebaligee(year_tmp,8,Tumans.geometry()).rename('b1').set('month',8),
          ETA_S2.sebaligee(year_tmp,9,Tumans.geometry()).rename('b1').set('month',9),
          ]);
        print('key ==3');
        ET_monthly_imgs=ET_monthly_imgs.map(function(img){return ee.Image(img).updateMask(ee.Image(img).gte(0)).updateMask(ee.Image(img).lt(1000))});
        print('SEBALIGEE S2 maps',ET_monthly_imgs);
        //print('area aoi',Tumans.geometry().area(100).multiply(1e-6));
      }  else if (key==4) {
        res_sel_ET=30;
        if (year_tmp==2018){
          ET_monthly_imgs=ET_monthly_imgs_2018;
        } else if (year_tmp==2019){
          ET_monthly_imgs=ET_monthly_imgs_2019;
        }
       print('key ==4');
     }
    //load SEBALIGEE-S2 map from assets
     if ((key==3 || key ==2) && ee.Number(end_season_month).subtract(ee.Number(start_season_month)).getInfo()==5) {  
         var Table_ET_maps = ee.data.listAssets('users/hydrosolutions/Ferghana/ET_map_Ferghana_' + year_tmp + '_June21');
             if (Table_ET_maps.assets===null){
                asset_imgs=ee.List([ee.Image()]);
              } else {
              // tranform into a list of Images (server-side)
                asset_imgs = ee.List(Table_ET_maps.assets.map(function(ic){
                  return ee.Image(ic.id);
                }));
              }
        print('Table_ET_maps',Table_ET_maps.assets);
        var asset_imgs_filtered=ee.ImageCollection(asset_imgs).filter(ee.Filter.eq('Satellite', ee.String(ET_label[key - 2])));
        print('asset_imgs_filtered',ee.ImageCollection(asset_imgs_filtered));
        var isasset=ee.Number(ee.Algorithms.If(asset_imgs_filtered.size().gt(0),1,0));
        print('isasset',isasset);
        isasset.evaluate(function(isasset_client) {
        if (isasset_client==1){
        //if (Table_ET_maps.assets !== null) {
        //if (asset_imgs.size() > 0) {
        //var l =Table_ET_maps.assets.length;
          ET_annual_img= ee.ImageCollection(asset_imgs_filtered).mosaic();
          /*stateGrid.length().evaluate(function(result) {
            for (var i=0; i<result; i++) {
              Export.image.toDrive({
                image:ET_annual_img.clip(shapes_FERG.geometry()),
                description: 'ET_annual_Ferghana_' + year_tmp + '_tile' + i,
                scale: 10,//res_sel.getInfo(),
                maxPixels: 1e13,
                region:ee.Feature(stateGrid.get(i)).geometry()
              });
            }
          });*/
        } else {
          ET_annual_img=ee.ImageCollection(ET_monthly_imgs.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum()
            .set('Satellite',ee.String(ET_label[key-2]));
          print('ET_annual_img',ET_annual_img);
          stateGrid.length().evaluate(function(result) {
            for (var i=0; i<result; i++) {
              Export.image.toAsset({
                image:ET_annual_img,
                description: 'ET_map_Ferghana_' + year_tmp + '_tile' + i + '_' + ET_label[key - 2],// lake_name.getInfo(),
                assetId: 'users/hydrosolutions/Ferghana/ET_map_Ferghana_' + year_tmp + '_June21/' + 'ET_map_Ferghana_' + year_tmp + '_tile' + i + '_' + ET_label[key - 2],
                scale: 10,//res_sel.getInfo(),
                maxPixels: 1e13,
                //pyramidingPolicy: 'sample',  // optional, one of MEAN, SAMPLE, MIN, MAX, or MODE per band
                region:ee.Feature(stateGrid.get(i)).geometry()
              });
            }
          });
        }
        });
     } else {
      ET_annual_img=ee.ImageCollection(ET_monthly_imgs.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
     }
};
var ET_select=ui.Select({style:{fontWeight: '450', fontSize: '12px',width: '100px',height: '29px',margin: '15px 1px 1px 10px'}, items: ET_products, onChange: 
    function(key){ 
      new_ET_map(key);
      /*ET_monthly_imgs=ee.ImageCollection(ee.List([ee.ImageCollection(ET_monthly_imgs_prod1).set('ET_id',2),
        ee.ImageCollection(ET_monthly_imgs_prod2).set('ET_id',3),
        ee.ImageCollection(ET_monthly_imgs_prod3).set('ET_id',1),
        ee.ImageCollection(ET_monthly_imgs_prod4).set('ET_id',0)
        ]).filter(ee.Filter.eq('ET_id', key)).get(0));
      ET_annual_img=ee.Image(ee.List([ET_annual_img_prod1.set('ET_id',0),ET_annual_img_prod2.set('ET_id',1),ET_annual_img_prod3.set('ET_id',2),
        ET_annual_img_prod4.set('ET_id',3)
      ]).filter(ee.Filter.eq('ET_id', key)).get(0));*/
    }} ).setPlaceholder('METRIC L7/L8');
//ET_select.items().remove(ET_select.items().get(1));//
var ET_panel =   ui.Panel([
    ui.Label('ET Product', {fontWeight: '450', fontSize: '12px',width: '70px',height: '29px',margin: '15px 1px 1px 10px'} ),
    ET_select
  ], ui.Panel.Layout.Flow('horizontal'));
var ETtoMap_checkbox=ui.Checkbox({label:'Show on Map',value: false, style:{fontWeight: '450', fontSize: '12px', margin: '5px 1px 1px 5px',width: '70px'}});
//ET_panel.add(ETtoMap_checkbox);
var P_annual_img=ee.ImageCollection(p_img_monthly.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
print('P_annual_img',P_annual_img);
var dateslider_start = ui.Slider({min: 4, max: 9,step:1,style: {stretch: 'vertical',width:'70px',fontWeight: '450', fontSize: '12px', margin: '15px 1px 1px 10px'}}).setValue(4);
var dateslider_end = ui.Slider({min: 4, max: 9,step:1,style: {stretch: 'vertical',width:'70px',fontWeight: '450', fontSize: '12px', margin: '15px 1px 1px 10px'}}).setValue(9);
dateslider_start.onSlide(function(value) {
  start_season_month=ee.Number(value).subtract(4);
  nb_of_months=end_season_month.subtract(start_season_month).add(1);
  ET_annual_img=ee.ImageCollection(ET_monthly_imgs.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
  P_annual_img=ee.ImageCollection(p_img_monthly.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
});
dateslider_end.onSlide(function(value) {
  end_season_month=ee.Number(value).subtract(4);
  nb_of_months=end_season_month.subtract(start_season_month).add(1);
  ET_annual_img=ee.ImageCollection(ET_monthly_imgs.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
  P_annual_img=ee.ImageCollection(p_img_monthly.slice(ee.Number(start_season_month),ee.Number(end_season_month).add(1))).sum();
});
var dateSlider_panel =   ui.Panel([
  ui.Label('Month Start', {fontWeight: '450', fontSize: '12px',width: '40px',margin: '5px 1px 1px 10px'} ),
  dateslider_start,
  ui.Label('Month End', {fontWeight: '450', fontSize: '12px',width: '40px',margin: '5px 1px 1px 10px'} ),
  dateslider_end,
  ], ui.Panel.Layout.Flow('horizontal'));
  comps = [];
var nicebar2=ui.Label({style: {backgroundColor: 'black',padding: '1px',width: '260px',height: '2px',margin: '1px 1px 1px 10px'}});
var label_label2=ui.Label('WATER BALANCE ANALYSIS', {fontWeight: '450', fontSize: '16px', margin: '15px 1px 1px 10px'});
  comps.push( nicebar2);
  comps.push( label_label2);
var instructionWB=ui.Label('Currently only available for the years 2018 and 2019.', {fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
  //comps.push( instructionWB);
  comps.push( P_panel);
  comps.push( ET_panel);
  comps.push( dateSlider_panel);
  WBpanel = ui.Panel({ widgets : comps, style :  {position : "top-left",maxWidth: "300px"}});
var wait_for_cropno=ui.Label('Please wait...', {color: 'red', fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
var panel = ui.Panel({
  // Create a panel with vertical flow layout.
    layout: ui.Panel.Layout.flow('vertical'),
    style: {width: '295px',border: '1px solid black'},
    widgets: [
      ui.Label('USER INPUT', {fontWeight: '450', fontSize: '16px', margin: '7px 1px 1px 10px'}),
      ui.Label('Select Area of Interest', {fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'}),
      ui.Panel([area_select]),
      ui.Label('Select Sensor', {fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'}),
      ui.Panel([sensor_select]),
      ui.Label('YEAR for which the crop map will be derived', {fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'}),
      ui.Panel([years_select]),
      ui.Label('Estimated number of main crop types', {fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'}),
      ui.Panel([crop_no_select]),
      //ui.Panel([checkbox])
    ]
});
panel.add(WBpanel);
panel.add(continueButton);
var panel_new = ui.Panel({
  // Create a panel with vertical flow layout.
    layout: ui.Panel.Layout.flow('vertical'),
    style: {width: '400px',border: '1px solid black'},
    widgets: [
      ui.Label('OUTPUTS', {fontWeight: '450', fontSize: '16px', margin: '7px 1px 1px 10px'}),
      ]
});
var splitPanel3 = ui.SplitPanel({
  firstPanel: middleMap,
  secondPanel: satelliteMap,
  wipe: true,
  style: {stretch: 'both'}
});
//ui.root.widgets().reset([middleMap,panel,panel_new]);
var ndvi_chart_panel=ui.Panel([ui.Button({label: 'Retry',style: {backgroundColor: 'blue',padding: '2px'},
  onClick:function(){
    ndvisignature_function();
      if (added_left==1){
        ndviclick_function();
      }
      if (added_right==1){  
        ndviclick2_function();
      }
  }}),
    ui.Label('Number of pixels per Cluster', {fontSize: '12px', margin: '15px 1px 1px 10px'}),
    ui.Textbox({style: {width: '50px'}, onChange: function(text) {
      pix2sample=ee.Number.parse(text);
    }}).setValue('100',false)],ui.Panel.Layout.Flow('horizontal'));
//<OPACITY SLIDER
var slider = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(0);
slider.onSlide(function(value) {
  middleMap.layers().get(3).setOpacity(value);
});
var slider2 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(0);
slider2.onSlide(function(value) {
  middleMap.layers().get(2).setOpacity(value);
});
var slider3 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(0);
slider3.onSlide(function(value) {
  middleMap.layers().get(1).setOpacity(value);
});
var slider4 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(1);
slider4.onSlide(function(value) {
  middleMap.layers().get(0).setOpacity(value);
});
var sliderPanel = ui.Panel({style :{position : "top-left",width: "110px"}});//
sliderPanel.widgets().set(0,ui.Label('Seasonal ET', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
sliderPanel.widgets().set(1,slider);
sliderPanel.widgets().set(2,ui.Label('Seasonal P', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
sliderPanel.widgets().set(3,slider2);
sliderPanel.widgets().set(4,ui.Label('Double Cropping', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
sliderPanel.widgets().set(5,slider3);
sliderPanel.widgets().set(6,ui.Label('Crop Map', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
sliderPanel.widgets().set(7,slider4);
var nicebar=ui.Label({style: {backgroundColor: 'black',padding: '1px',width: '260px',height: '2px',margin: '1px 1px 1px 10px'}});
var ind;
var add_buttons= ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  widgets: [
    ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[1],padding: '12px',width: '80px',height: '29px',margin: '7px 1px 1px 10px'}}).setValue( 'Cluster ' + 1 ),
    ], ui.Panel.Layout.Flow('horizontal')),
    ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[2],padding: '12px',width: '80px',height: '29px',margin: '2px 1px 1px 10px'}}).setValue( 'Cluster ' + 2 ),
    ], ui.Panel.Layout.Flow('horizontal')),
    ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[3],padding: '12px',width: '80px',height: '29px',margin: '2px 1px 1px 10px'}}).setValue( 'Cluster ' + 3 ),
    ], ui.Panel.Layout.Flow('horizontal')),
          ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[4],padding: '12px',width: '80px',height: '29px',margin: '2px 1px 1px 10px'}}).setValue( 'Cluster ' + 4 ),
    ], ui.Panel.Layout.Flow('horizontal')),
          ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[5],padding: '12px',width: '80px',height: '29px',margin: '2px 1px 1px 10px'}}).setValue( 'Cluster ' + 5 ),
    ], ui.Panel.Layout.Flow('horizontal')),
          ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[6],padding: '12px',width: '80px',height: '29px',margin: '2px 1px 1px 10px'}}).setValue( 'Cluster ' + 6 ),
    ], ui.Panel.Layout.Flow('horizontal')),
          ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[7],padding: '12px',width: '80px',height: '29px',margin: '2px 1px 1px 10px'}}).setValue( 'Cluster ' + 7 ),
    ], ui.Panel.Layout.Flow('horizontal')),
          ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[8],padding: '12px',width: '80px',height: '29px',margin: '2px 1px 1px 10px'}}).setValue( 'Cluster ' + 8 ),
    ], ui.Panel.Layout.Flow('horizontal')),
          ui.Panel([
      ui.Label({style: {backgroundColor: new_palette[9],padding: '12px',width: '80px',height: '29px',margin: '2px 1px 1px 10px'}}).setValue( 'Cluster ' + 9 ),
    ], ui.Panel.Layout.Flow('horizontal')),
    ]
  });
var add_ui= ui.Panel({
  widgets: [  
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(1); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(0).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(2); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(1).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(3); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(2).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(4); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(3).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(5); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(4).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(6); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(5).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(7); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(6).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(8); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(7).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ui.Select({style:{width: '150px',height: '29px',margin: '2px 1px 1px 10px'}, items: cropland_class_names, onChange: 
    function(key){ ind=ee.Number(9); 
    if (key=='User Input...'){
      panel_tmp.widgets().get(8).widgets().set(1,ui.Textbox({style:{width: '150px',height: '29px',margin: '6px 1px 1px 10px'},onChange: function(text) {
      crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(text))])).cat(crop_name_list.slice(ind))}}).setPlaceholder('My Own Label'));
    } else {crop_name_list = crop_name_list.slice(0,ind.subtract(1)).cat(ee.List([ee.String('=').cat(ee.String(key))])).cat(crop_name_list.slice(ind))}}}).setPlaceholder('Crop Type: Unknown'),
  ]
});
ui.root.widgets().reset([splitPanel3,panel,panel_new]);
var linker = ui.Map.Linker([satelliteMap, middleMap]);
var iteration_id=0;
var iteration_id_b=0;
var wait=ui.Label('Processing... Please be patient.', {color: 'red', fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
var warning_large=ui.Label('A large Area of Interest has been selected. The computations may take a couple of minutes.', {color: 'red', fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'});
//ui elements until here
//load satellite data
var loadnewdata=function(year){  
  var all_l7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2").filterBounds(aoi_selected.simplify(1000))
    //.filter(ee.Filter.calendarRange(1,12, 'month'))
    .filterDate(ee.Date.fromYMD(ee.Number(year),1,1), ee.Date.fromYMD(ee.Number(year),12, 31))    
    .filter(ee.Filter.lt('CLOUD_COVER', 30))
    .map(cloudscore_L7_T1L2).map(addbands_l7).map(add_time_data).set('sensor_id',2).map(rename_sensing_time);
    //
  //Load LANDSAT8 data
  var all_l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2").filterBounds(aoi_selected.simplify(1000))
    .filterDate(ee.Date.fromYMD(ee.Number(year),1, 1), ee.Date.fromYMD(ee.Number(year),12, 31))
    .filter(ee.Filter.lt('CLOUD_COVER', 30))
    .map(cloudscore_L8_T1L2).map(addbands_l8).map(add_time_data).set('sensor_id',1).map(rename_sensing_time);
  var all_l9 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2").filterBounds(aoi_selected.simplify(1000))
    .filterDate(ee.Date.fromYMD(ee.Number(year),1, 1), ee.Date.fromYMD(ee.Number(year),12, 31))
    .filter(ee.Filter.lt('CLOUD_COVER', 30))
    .map(cloudscore_L8_T1L2).map(addbands_l8).map(add_time_data).set('sensor_id',1).map(rename_sensing_time);
  //print('all_l9',all_l9);
  //print('all_l7',all_l7);
  //Loat the SENTINEL2 data   
  var all_s2 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED').filterBounds(aoi_selected)
    .filterDate(ee.Date.fromYMD(ee.Number(year),1, 1), ee.Date.fromYMD(ee.Number(year),11, 30))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))    
    .map(rename_sensing_time);
  /*var s2_cc =ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY").filterBounds(aoi_selected.simplify(1000))
    .filterDate(ee.Date.fromYMD(ee.Number(year).subtract(1),10, 1), ee.Date.fromYMD(ee.Number(year),12, 31))
    .map(rename_sensing_time);
  all_s2 =ee.ImageCollection(joinCollections2(all_s2,s2_cc)).map(addVariables).map(add_time_data).set('sensor_id',0);
  */
  all_s2 =all_s2.map(addVariables).map(add_time_data).set('sensor_id',0);
  print('all_s2',all_s2);
  var merged_landsat = ee.ImageCollection(gee_codes.get_landsat_images(aoi_selected,
  ee.Date.fromYMD(ee.Number(year),1, 1),ee.Date.fromYMD(ee.Number(year),11, 30),
    {nodata_thresh: nodata_thresh,
    cc_thresh: cc_thresh,
    nodata_thresh_l7: nodata_thresh_l7,
    })).map(rename_landsat).map(add_time_data);
  if (year >= 2021){
    merged_landsat=merged_landsat.filter(ee.Filter.neq('SATELLITE','LANDSAT_7'));
  }
  print('merged_landsat',merged_landsat);
  return ee.ImageCollection(ee.List([all_s2,all_l8,all_l7,merged_landsat.set('sensor_id',3)]).filter(ee.Filter.eq('sensor_id', sensor_id)).get(0));
  /*return ee.ImageCollection(ee.Algorithms.If(ee.Number(sensor_id).eq(0),all_s2,
    ee.ImageCollection(ee.Algorithms.If(ee.Number(sensor_id).eq(1),daily_LST_L8(year),
    ee.ImageCollection(ee.Algorithms.If(ee.Number(sensor_id).eq(2),all_l7,all_l7.merge(all_l8)))))));*/
};
var plotsatelliteimage=function(){  
  var iteration_id_b_tmp0=iteration_id_b;
  var iteration_id_tmp0=iteration_id;
  if (year >= 2013){
    sensor_data_4plotting=sensor_data_4plotting.filter(ee.Filter.neq('SATELLITE','LANDSAT_7'));
  }
  if (sensor_id==3){
    sensor_data_4plotting=sensor_data_4plotting.map(function(img){
      return ee.Image(img).addBands(ee.Image(img).multiply(10000),['Red', 'Green', 'Blue'],true);
    });
  }
  var s2_zero_cloud0=sensor_data_4plotting.select(bands_sel).filterDate(ee.Date.fromYMD(ee.Number(year),7, 1), ee.Date.fromYMD(ee.Number(year),9, 30)).sort('CLOUD_COVER').first();
  print('zero cloud image',s2_zero_cloud0);//
  var s2_zero_cloud=ee.Image(ee.Algorithms.If(ee.Number(s2_zero_cloud0.get('CLOUD_COVER')).gt(20),
  sensor_data_4plotting.select(bands_sel).filterDate(ee.Date.fromYMD(ee.Number(year),7, 1), ee.Date.fromYMD(ee.Number(year),9, 30)).qualityMosaic('NDVI'),
  sensor_data_4plotting.select(bands_sel).filter(ee.Filter.eq('SENSING_TIME', ee.String(s2_zero_cloud0.get('SENSING_TIME')))).mosaic()));
  satelliteMap.layers().set(0, ui.Map.Layer(s2_zero_cloud.select(bands_sel),{bands: ['Red', 'Green', 'Blue'],min:500,max:2500},"RGB satellite image"));
  var sensor_str_server=ee.String(sensor_labels.get(ee.Number(sensor_id)));
  sensor_str_server.evaluate(function(sensor_str) {
    var image_select=sensor_data_4plotting.select(bands_sel);//.filter(ee.Filter.lte('nodata_cover', 50));//.filterDate(ee.Date.fromYMD(ee.Number(year),1, 1), ee.Date.fromYMD(ee.Number(year),10, 31))
    var image_select_and_name=image_select.map(function(img){return ee.Image(img).set('Name',ee.String(sensor_str).cat(ee.String(" RGB, DOY ")).cat((ee.String('00').cat(ee.Date(ee.Image(img).get(timeField)).format('D'))).slice(-3)).cat(ee.String(' (')).cat(ee.Date(ee.Image(img).get(timeField)).format('d MMMM YYYY')).cat(ee.String(')')))});
    print('image_select_and_name',image_select_and_name);
    var img_names=ee.ImageCollection(image_select_and_name).aggregate_array('Name');
    var img_list=ee.Dictionary.fromLists(img_names.distinct(), img_names.distinct()).keys();
    print('img_names',img_list);
    //satelliteMap.layers().set(0, ui.Map.Layer(s2_zero_cloud.select(bands_sel),{bands: ['Red', 'Green', 'Blue'],min:500,max:2500},sensor_str + " image"));
    var label_part2=ee.String(ee.Algorithms.If(ee.Number(s2_zero_cloud0.get('CLOUD_COVER')).gt(10),ee.String(' Jul - Sep. ').cat(ee.String(ee.Number(year))).cat(ee.String(' RGB Composite')),
      ee.String(" RGB, ").cat(ee.Date(s2_zero_cloud0.get(timeField)).format('d MMMM YYYY'))));
    //print('label_part2',label_part2)
    label_part2.evaluate(function(result){
      var label_leftmap=  ui.Label(sensor_str + result);
      img_list.evaluate(function(result2){
      var img_select = ui.Select({
          items: result2,
          style: {position:'top-right',padding:'1px'},
          onChange: function(key){
              var img1 = ee.Image(image_select_and_name.filter(ee.Filter.eq('Name', key)).mosaic());//.first());//
              print('selected image',ee.Image(image_select_and_name.filter(ee.Filter.eq('Name', key)).first()));
              //print('selected image',img1);
              satelliteMap.layers().set(0, ui.Map.Layer(img1.select(bands_sel),{bands: ['Red', 'Green', 'Blue'],min:500,max:2500},sensor_str + " image"));
          }
      }).setPlaceholder(sensor_str + result);
      //controlPanel=ui.Panel({widgets: [label_leftmap], style: {position:'top-right'}});
      if (iteration_id_tmp0==iteration_id){//in case the user has already moved forward...
        if (iteration_id_b_tmp0==iteration_id_b){
          satelliteMap.add(img_select);
        }
      }
      });
    });
  });
  satelliteMap.layers().set(1,ui.Map.Layer(d,null,'Area of Interest'));
};
//task1: initial user inputs
var task1= continueButton.onClick(function(){
  iteration_id=iteration_id + 1;
  iteration_id_b=0;
  panel.remove(nicebar);
  panel.remove(label_label);
  panel.remove(instruction);
  panel.remove(wait_for_cropno);
  panel.remove(instruction_sieve);
  panel.remove(sieve_panel);
  panel.remove(panel_tmp);
  panel.remove(continueButton2);  
  //panel.remove(WBpanel);
  panel_new.clear();
  added_left=0;
  added_right=0;
  checkbox2b_panel.remove(plz_wait2b);
  checkbox2_panel.remove(plz_wait2);
  checkbox_ET_panel.remove(plz_wait3);
  checkbox_P_panel.remove(plz_wait4);
  panel_new.widgets().set(0, ui.Label('OUTPUTS', {fontWeight: '450', fontSize: '16px', margin: '7px 1px 1px 10px'}));
  aoi_feat_area=aoi_selected_tmp.area().multiply(1e-6);
  aoi_ind=1;
  /*// Request the value from the server.
  aoi_feat_area.evaluate(function(result) {
    // When the server returns the value, show it.
    panel_new.widgets().set(1, unit_name_and_area);
    //panel_new.add(wait)
    panel_new.widgets().set(2, wait);
    //placeholder:
    panel_new.widgets().set(3, ui.Label());
  });*/ 
  panel.add(nicebar);
  panel.add(label_label);
  panel.add(instruction);
  panel.add(wait_for_cropno);
  no_crop_list=ee.List([0]);
  ETtoMap_checkbox.setValue(false,false);
  PtoMap_checkbox.setValue(false,false);
  task2();
});
//task2: process initial user inputs
var task2= ui.util.debounce( function() {
  var iteration_id_b_tmp0=iteration_id_b;
  var iteration_id_tmp0=iteration_id;
  print('iteration_id',iteration_id);
  crop_name_list=ee.List.repeat('=Unknown',10);
  panel_new.clear();
  panel_new.widgets().set(0, ui.Label('OUTPUTS', {fontWeight: '450', fontSize: '16px', margin: '7px 1px 1px 10px'}));
  middleMap.centerObject(aoi_selected_tmp);
  /*satelliteMap.clear();//remove(controlPanel);
  satelliteMap.setControlVisibility(false);
  satelliteMap.setControlVisibility({scaleControl: true});
  satelliteMap.setControlVisibility({layerList: true});
  */
  //middleMap.layers().set(aoi_ind,ui.Map.Layer(ee.Image().paint(ee.Feature(aoi_selected_tmp), 0, 2),null,'Area of Interest'));
  //satelliteMap.layers().set(aoi_ind,ui.Map.Layer(ee.Image().paint(ee.Feature(aoi_selected_tmp), 0, 2),null,'Area of Interest'));
  panel_new.widgets().set(1, ui.Label());
  panel_new.widgets().set(2, wait);
  panel_new.widgets().set(3, checkbox2_panel);
  panel_new.widgets().set(4, checkbox2b_panel);
  panel_new.widgets().set(5, checkbox_ET_panel);
  panel_new.widgets().set(6, checkbox_P_panel);
  panel_new.widgets().set(7, ui.Label());
  //panel_new.widgets().set(5,  wb_button);
  checkbox2.setValue(false,false).setDisabled(true);
  checkbox2b.setValue(false,false).setDisabled(true);
  checkbox_ET.setValue(false,false).setDisabled(false);
  checkbox_P.setValue(false,false).setDisabled(false);
  panel_new.widgets().set(1, unit_name_and_area);
  aoi_selected=aoi_selected_tmp;
  complexCollection=complexCollection_tmp;
  aoi_feat=ee.Feature(aoi_selected);
  sensor_id=sensor_id_tmp;
  year=year_tmp;
  //Select bands
  bands_sel=ee.List(ee.Algorithms.If(ee.Number(sensor_id).eq(2),bands_l7,bands_l8));
  bands_sel=ee.List(ee.Algorithms.If(ee.Number(sensor_id).eq(0),bands_s2,bands_sel));
  //res_sel=ee.Number(ee.Algorithms.If(ee.Number(sensor_id).eq(0),100,100)).getInfo();
  if (aoiisnew===1){
    satelliteMap.clear();//remove(controlPanel);
    satelliteMap.setControlVisibility(false);
    satelliteMap.setControlVisibility({layerList: true});    
    //print('Ensemble before cloud filtering',loadnewdata(year).filterDate(start_date, end_date));
    sensor_data_year=loadnewdata(year)
        .filter(ee.Filter.neq('GENERAL_QUALITY','FAILED'));
      //.filter(ee.Filter.lte('CLOUD_COVER', scc_threshold));
    //print('sensor_data_year',sensor_data_year)      
        ///for NDVI SIGNATURE CHART
    var img_list_s2=sensor_data_year.aggregate_array('SENSING_TIME').distinct();
    print('img_list',img_list_s2);
    sensor_data_4plotting=sensor_data_year;
    print('sensor_data_4plotting',sensor_data_4plotting);
    sensor_data_mosaic=ee.ImageCollection(img_list_s2.map(function(x){
      var img1=ee.Image(sensor_data_year.filter(ee.Filter.eq('SENSING_TIME', x)).first());
      return ee.Image(sensor_data_year.filter(ee.Filter.eq('SENSING_TIME', x)).mosaic())
        //.clipToCollection(complexCollection)
        .copyProperties(img1)
      .set('system:time_start',img1.get('system:time_start'));
    }));
    print('sensor_data_mosaic',sensor_data_mosaic);
    plotsatelliteimage();
    //nd_threshold and cc_threshold is currently not in use
    /*sensor_data_year=sensor_data_year.map(addcloudvalues)
      .filter(ee.Filter.lte('nodata_cover', nd_threshold))
      .filter(ee.Filter.lte('cloud_cover', cc_threshold));    */
    satelliteMap.layers().set(1,ui.Map.Layer(d,null,'Area of Interest'));
  /*var sensor_data_year_Aug2Nov=sensor_data_year.filterDate(ee.Date.fromYMD(ee.Number(year),9, 1), ee.Date.fromYMD(ee.Number(year),11, 30)).select('NDVI');
  var greenest_9to11 = sensor_data_year_Aug2Nov.qualityMosaic('NDVI');
  var greenest_2to5=sensor_data_year.filterDate(ee.Date.fromYMD(ee.Number(year),2, 1), ee.Date.fromYMD(ee.Number(year),5, 31)).select('NDVI').qualityMosaic('NDVI');
  var greenest_1to12=sensor_data_year.select('NDVI').qualityMosaic('NDVI');*/
  /*greenest_binary=greenest_1to12.where(greenest_1to12.gt(ndvi_th),1).where(greenest_1to12.lte(ndvi_th),0)
    .where(srtm.gt(srtm_th),0).where(slope.gt(slope_th),0);*/
    var pixelArea = ee.Number(ee.Image(1).multiply(ee.Image.pixelArea()).reproject({crs: ee.Image(sensor_data_year.first().select('NDVI')).projection().crs(), scale:res_sel}).reduceRegion({'reducer': ee.Reducer.first(),'geometry': aoi_selected.centroid(500),'scale':res_sel}).get('constant'));
    //print('Area per pixel (in m2)',totalArea);
    ppha = ee.Number(10000).divide(pixelArea);
    print('Pixels per 1 ha',ppha);
    aoiisnew=0;
  }
  middleMap.style().set('cursor', 'crosshair');
  satelliteMap.style().set('cursor', 'crosshair');
  // Create an empty panel in which to arrange widgets.
  // The layout is vertical flow by default.
  // Create the title label.
  title.style().set('position', 'bottom-center');
  title2.style().set('position', 'bottom-center');
  hydrosolutions_manual.style().set('position', 'top-center');
  middleMap.clear();
  middleMap.setOptions("HYBRID");
  middleMap.setControlVisibility(false);
  middleMap.setControlVisibility({layerList: true});
  //middleMap.setControlVisibility({mapTypeControl: true});
  middleMap.setControlVisibility({scaleControl: true});
  middleMap.setControlVisibility({zoomControl: true});
  middleMap.setControlVisibility({fullscreenControl: true});
  //Map.addLayer(d,null,'Area of Interest');
  middleMap.layers().set(1,ui.Map.Layer(d,null,'Area of Interest'));
  middleMap.add(title);
  satelliteMap.remove(title2);
  satelliteMap.add(title2);
  middleMap.add(hydrosolutions_manual);
  middleMap.add(Logos_PANEL);
  middleMap.add(sliderPanel);
  //pmode=0;
  satelliteMap.onClick(function(coords){
    // Add a dot to the map where the user clicked.
    point = ee.FeatureCollection(ee.Geometry.Point(coords.lon, coords.lat));
    aoi_left_map_layer =ui.Map.Layer(point.geometry().buffer(1000,100), {},"Point of Interest");
    satelliteMap.layers().set(2,aoi_left_map_layer);
    //middleMap.centerObject(point.geometry().buffer(1000,100));
    ndviclick_function();
  });
//  satelliteMap.onClick(function(coords) {
  middleMap.onClick(function(coords) {
    point2 = ee.FeatureCollection(ee.Geometry.Point(coords.lon, coords.lat));
    poi_right_map_layer=ui.Map.Layer(point2.style({pointShape: 'triangle',pointSize:10,color:'black',fillColor : 'white'}), {},"Point of Interest");
    //satelliteMap.layers().set(2, poi_right_map_layer);
    middleMap.layers().set(5, poi_right_map_layer);
    ndviclick2_function();
  }); 
  //////////////////////////////////////////////////////////////////////////
  //Now we will generate a crop map, using an unsupervised clustering technique (k-means)
  //The input to the algorithm are the parameters of the fitted harmonic model to the data of the selected year.
  //The harmonic model has 5 parameters, and we fit the model to 4 different bands (NDVI, NIR, SWIR1, and SWIR2), following Wang et al., 2019, RSE.
  /*We consider the following harmonic model to describe the NDVI data of just one year, following Wang etal 2019, RSE
  pt = a + b*cos(2pt) + c*sin(2pt) + d*cos(4pt) + e*sin(4pt)
  */
  //In total, the training data consists therefore of 4x5=20 image layers.
  // Add harmonic terms as new image bands. 
  filtered_sensor_data=sensor_data_year;//.filterDate(start_date, end_date)
  print('filtered_sensor_data',filtered_sensor_data);
  greenest_1to12=filtered_sensor_data.select('NDVI').qualityMosaic('NDVI');
  var sensor_data_year_Aug2Nov=filtered_sensor_data.filterDate(ee.Date.fromYMD(ee.Number(year),9, 1), ee.Date.fromYMD(ee.Number(year),11, 30)).select('NDVI');
  greenest_9to11 = sensor_data_year_Aug2Nov.qualityMosaic('NDVI');
  greenest_2to5=filtered_sensor_data.filterDate(ee.Date.fromYMD(ee.Number(year),2, 1), ee.Date.fromYMD(ee.Number(year),5, 31)).select('NDVI').qualityMosaic('NDVI');
  /*satProjection=greenest_1to12.projection();
  greenest_1to12=greenest_1to12.setDefaultProjection({crs: satProjection.crs(), scale:res_sel})
    .reduceResolution({
      reducer: ee.Reducer.max(),
      maxPixels: 1024
    }).reproject({crs: satProjection.crs(), scale:res_sel});*/
  print('used_bands',used_bands);
  var all_coeffs = ee.Image(used_bands.iterate(get_all_coeffs, ee.Image([])));
  print('all_coeffs',all_coeffs);
  TrainingImage=all_coeffs
      .updateMask(greenest_1to12.gt(ee.Number(ndvi_th)));//.updateMask(srtm.lte(srtm_th));//.updateMask(slope.lte(slope_th))
  print('TrainingImage',TrainingImage);
  var full_sample_only_crops_image=all_coeffs//.select(TrainingImage.bandNames().slice(1))
    .updateMask(greenest_1to12.gt(ee.Number(ndvi_th)));//.updateMask(srtm.lte(srtm_th)).updateMask(slope.lte(slope_th));
  var full_sample_only_crops = full_sample_only_crops_image//.clipToCollection(complexCollection)
    .sample({
      region:aoi_selected,
      seed: 123,
      numPixels: 1000,
      scale: res_sel,
      tileScale: tile_scale
  });
  var clusterer_crop = ee.Algorithms.If(ee.Number(crop_no_tmp).eq(0),
    ee.Clusterer.wekaXMeans({minClusters: 2, maxClusters: 9}).train(full_sample_only_crops),
    ee.Clusterer.wekaKMeans(ee.Number(crop_no_tmp)).train(full_sample_only_crops));
  var cImage = all_coeffs//.select(TrainingImage.bandNames().slice(1))
    .clipToCollection(complexCollection)
    .cluster(clusterer_crop).rename('clusters');
  // Remap the clustered image to put the clusters in order.
  cluster_map = cImage.add(1).where(greenest_1to12.lte(ee.Number(ndvi_th)),0).uint8();//.where(srtm.gt(srtm_th),0).where(slope.gt(slope_th),0)
  print('cluster_map',cluster_map);
  cluster_map0=cluster_map;
  var clusters = full_sample_only_crops.cluster(clusterer_crop, "cluster");
  var crop_no_tmp2 = ee.Number(clusters.distinct("cluster").size());
  crop_no = ee.Number(ee.Algorithms.If(ee.Number(crop_no_tmp).eq(0),crop_no_tmp2,ee.Number(crop_no_tmp)));   
  print('crop_no',crop_no);
  new_crop_ids=ee.List.sequence(1,crop_no);
  panel_tmp.clear();
  crop_no.evaluate(function(result) {
    if (iteration_id_tmp0==iteration_id){//in case the user has already moved forward...
      if (iteration_id_b_tmp0==iteration_id_b){
        //Add a bunch of labels:
        panel.remove(wait_for_cropno);
        for (var i=0; i<result; i++) {
          panel_tmp.add(add_buttons.widgets().get(i));
          panel_tmp.widgets().get(i).remove(add_ui.widgets().get(i));
          panel_tmp.widgets().get(i).widgets().set(1,add_ui.widgets().get(i));
          panel_tmp.widgets().get(i).widgets().get(1).setValue('Unknown');
        }
        panel.add(panel_tmp);
        panel.add(instruction_sieve);
        panel.add(sieve_panel);
        //panel.add(WBpanel);
        panel.add(continueButton2);
        continueButton2.setDisabled(true);
      }}
  });
  middleMap.layers().set(0,ui.Map.Layer(cluster_map.updateMask(cluster_map.gt(0)), {bands: ['clusters'],min: 0, max:9, palette: new_palette},"Crop Map " + year).setOpacity(slider4.getValue()));
  middleMap.layers().set(1,ui.Map.Layer(dummy,null));
  //middleMap.layers().set(2,ui.Map.Layer(dummy,null));
  //middleMap.layers().set(3,ui.Map.Layer(dummy,null));
  middleMap.layers().set(2,ui.Map.Layer(P_annual_img, {bands: ['precip'],min: 0, max:nb_of_months.multiply(100).getInfo(), palette: ["white","blue"]},"Seasonal Precipitation").setOpacity(slider2.getValue()));
  var min_et=ee.Number(ET_annual_img.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: aoi_selected,
    scale: 500,//res_sel_ET,//area_calc_res,
    maxPixels: 1e13,
    tileScale: 4
  }).get('b1')); 
  print('min_et',min_et);
  var max_et=ee.Number(ET_annual_img.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: aoi_selected,
    scale: 500,//res_sel_ET,//area_calc_res,
    maxPixels: 1e13,
    tileScale: 4
  }).get('b1')); 
  print('max_et',max_et);
  //middleMap.layers().set(4,ui.Map.Layer(d,null,'Area of Interest'));  
  slider.setDisabled(true);
  min_et.evaluate(function(res1) {
    max_et.evaluate(function(res2) {
      slider.setDisabled(false);
      middleMap.layers().set(3,ui.Map.Layer(ET_annual_img.clip(aoi_selected), {bands: ['b1'],min: res1, max:res2/*nb_of_months.multiply(150).getInfo()*/, palette: ["white","green"]},"Seasonal ET").setOpacity(slider.getValue()));    
      middleMap.layers().set(4,ui.Map.Layer(d,null,'Area of Interest'));  
    });
  });
    //Precip
  var P_mean = P_annual_img.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: aoi_selected,
    scale: 1000,//area_calc_res,
    maxPixels: 1e13,
    tileScale: tile_scale
  }); 
  P_mean_value=P_mean.values();
  print('P_mean_value',P_mean_value);
  //middleMap.layers().set(2,ui.Map.Layer(TrainingImage.addBands(count_imgs).clip(aoi_selected),{},'cluster data'))
  /////////////////////////////////////////////////////
  var cluster_map_res=cluster_map;//.reproject({crs: cluster_map.projection().crs(), scale:res_sel});
  var calculate_area=function(x,cluster_map_res) {
    var image=ee.Image(1).updateMask(ee.Image(cluster_map_res).select('clusters').eq(ee.Number(x)))
      .multiply(ee.Image.pixelArea()).multiply(1e-6);
    return ee.Image(cluster_map_res).addBands(image.rename(ee.String("c").cat(ee.String(ee.Number(x).int()))));
  };
  var area_image   = ee.Image(ee.List.sequence(1,crop_no).iterate(calculate_area, cluster_map_res)).slice(1);
  area = area_image.reduceRegion({ //.clipToCollection(complexCollection)
    reducer: ee.Reducer.sum(),
    geometry: aoi_selected,
    scale: 30,//area_calc_res,
    maxPixels: 1e13,
    tileScale: tile_scale
  }); 
  //var maxarea=ee.Number(area.values().reduce(ee.Reducer.max()));
  areas_values=area.values();//.sort().reverse();
  print('areas_values',areas_values);
  var total_crop_area=ee.Number(areas_values.reduce(ee.Reducer.sum()));
  // Request the value from the server.
  total_crop_area.evaluate(function(result) {
    // When the server returns the value, show it.
    if (iteration_id_tmp0==iteration_id){//in case the user has already moved forward...
      if (iteration_id_b_tmp0==iteration_id_b){
      if (isNaN(result)){
        panel_new.widgets().set(2, ui.Label({},{color: 'red',fontWeight: '600', fontSize: '12px'}).setValue( "Error, Earth Engine Capacity Exceeded"));
        panel_new.widgets().set(3, ui.Label({},{color: 'red',fontWeight: '450', fontSize: '12px'}).setValue( "Resubmit or try later"));
      } else {
        TotalCropAreaLabel = ui.Label({},{fontWeight: '450', fontSize: '12px'}).setValue( "Total Cropped Area in sq. km:  " + result.toFixed(2));
            panel_new.widgets().set(2, TotalCropAreaLabel);
        checkbox2.setDisabled(false); //activate it only now
        checkbox2b.setDisabled(false); //activate it only now
        //checkbox_ET.setDisabled(false);
        //checkbox_P.setDisabled(false);
      }
    }}
      continueButton2.setDisabled(false);
  });
  new_palette1=ee.List(new_palette).slice(1, crop_no.add(1));
  new_palette1.evaluate(function(result2){
        clust_area_feat=ee.Feature(null,area.set('name','Area of Interest'));
        var chart3 = ui.Chart.feature.byFeature(ee.FeatureCollection(clust_area_feat),'name')
            .setChartType('ColumnChart')//ColumnChart
            .setOptions({
              title: 'Crop Area per Cluster',
              legend: {position: 'top', maxLines: 3},
              vAxis: {title: 'Area [km2]', minValue:0},
              colors: result2,
        });
        if (iteration_id_tmp0==iteration_id){//in case the user has already moved forward...
        if (iteration_id_b_tmp0==iteration_id_b){
          panel_new.widgets().set(7, chart3);  
        }}
  });
    //ET per crop type
  //stratified sample    
      var samplePoints=cluster_map.addBands(ET_annual_img).updateMask(cluster_map.gt(0)).int()
      .stratifiedSample({
          region:aoi_selected,//Ferghana_bounds,//aoi_selected.bounds(100),
          numPoints: pix2sample,
          classBand:'clusters',
          tileScale: 4,
          scale: res_sel_ET,
      });
      print('samplePoints',samplePoints);
      var ET_values0=ee.List.sequence(1,crop_no).map(function(x){return samplePoints.filter(ee.Filter.eq('clusters', ee.Number(x))).reduceColumns(ee.Reducer.median(),["b1"])});
      print('ET_values0',ET_values0);
      var ET_groups=samplePoints.reduceColumns(ee.Reducer.median().group(0), ["clusters","b1"]);
      ET_groups = ee.List(ET_groups.get("groups"));
      var ET_values1 = ee.List(ET_groups.map(function(d) {return ee.Dictionary(d).get('median')}));
      print('ET_values1',ET_values1);
  //reduce region
  var calculate_ET=function(x,ET_annual_img) {
    var image=ee.Image(ET_annual_img).select('b1').updateMask(cluster_map.select('clusters').eq(ee.Number(x)))
    return ee.Image(ET_annual_img).addBands(image.rename(ee.String("c").cat(ee.String(ee.Number(x).int()))));
  };
  var ET_cluster_image   = ee.Image(ee.List.sequence(1,crop_no).iterate(calculate_ET, ET_annual_img)).slice(1);
  var ET_per_crop = ET_cluster_image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: aoi_selected,
    scale: res_sel_ET,//100,//area_calc_res,
    maxPixels: 1e13,
    tileScale: 16,//tile_scale
  }); 
  var ET_values2=ET_per_crop.values();//.sort().reverse();
  //print('ET_values2',ET_values2);
  var ET_values=ET_values2;//fastest, I believe
  print('ET_per_crop',ET_values);
  var cat_strings=function(x) {
    var ind=ee.Number(x).add(1);
    //var key=ee.String(crop_name_list.get(ind.subtract(1))).slice(1);
    var area_tmp=ee.Number(areas_values.get(ee.Number(x)));
    var ET_tmp=ee.Number(ee.List([ee.Number(ET_values.get(ee.Number(x))),0]).reduce(ee.Reducer.sum())).int();
    var P_tmp=ee.Number(P_mean_value.get(0)).int();
    var area_tmp2=ee.Number(areas_values.get(ee.Number(x))).divide(ee.Number(areas_values.reduce(ee.Reducer.sum()))).multiply(100);
    var cid=ind;
    var dict={c: [{v: cid}, {v: area_tmp},{v: area_tmp2},{v: ET_tmp},{v: P_tmp}]};
    return dict;
  };
  var dict_for_table = ee.List.sequence(0,crop_no.subtract(1)).map(cat_strings);  
  print('dict_for_table',dict_for_table)
  dict_for_table.evaluate(function(result) {  
    var dataTable = {
      cols: [{label: 'Cluster ID', type: 'number'},
              //{label: 'Crop Type', type: 'string'},
             {label: 'Area (km2)', type: 'number'},
             {label: 'Area (%)', type: 'number'},
             {label: 'ET (mm)', type: 'number'},
            {label: 'P (mm)', type: 'number'}],
      rows: result};
    var options = {
      height: 220
    };  
    var charttable1 = new ui.Chart(dataTable, 'Table',options);
    // Print the chart to display it in the console.
      if (iteration_id_tmp0==iteration_id){//in case the user has already moved forward...
        if (iteration_id_b_tmp0==iteration_id_b){
          //panel_new.widgets().set(8, charttable1);
          panel_new.add(charttable1);
          panel_new.add(VI_select_chart);
          //panel_new.add(ndvi_chart_panel);
          ndvisignature_function();
        }}
  });
        ///map cropping patterns: identify plots with double crops
        //first identify the time stamp of each pixel corresponding to maximum fitted NDVI
        // turn image collection with the fitted NDVI values into an array
        var harmonicS22a = sensor_data_4plotting.map(function(image) { 
            var timeRadians = image.select('t').multiply(2 * Math.PI); 
            var timeRadians2 = image.select('t').multiply(4 * Math.PI);
            return image 
              .addBands(timeRadians.cos().rename('cos1')) 
              .addBands(timeRadians.sin().rename('sin1')) 
              .addBands(timeRadians2.cos().rename('cos2')) 
              .addBands(timeRadians2.sin().rename('sin2')); 
          });   
        var harmonicTrend2 = harmonicS22a
          .select(harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1)).add(ee.String('NDVI'))) 
          .reduce(ee.Reducer.linearRegression(harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1)).length(),1)); 
        //Plug the coefficients in to the equation above in order to get a time series of fitted values: 
        //Turn the array image into a multi-band image of coefficients. 
        var harmonicTrendCoefficients2 = harmonicTrend2.select('coefficients') 
          .arrayProject([0]) 
          .arrayFlatten([harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1))]); 
              // Compute fitted values. 
        fittedHarmonic= harmonicS22a.map(function(image) { 
          return image.addBands( 
            image.select(harmonicIndependents.slice(0,ee.Number(max_order).multiply(2).add(1))) 
              .multiply(harmonicTrendCoefficients2) 
              .reduce('sum') 
              .rename('fitted')); 
        }); 
        //fittedHarmonic=compute_fitted_values('NDVI');
        var array = fittedHarmonic.select('fitted','t').toArray();
        // sort array by the first band (NDVI)
        var axes = { image:0, band:1 };
        var bandIndex = 0; // index of NDVI band
        var sort1 = array.arraySlice(axes.band, bandIndex, bandIndex + 1); 
        var sorted1 = array.arraySort(sort1);
        // take the last image only (slice)
        var lengthi = sorted1.arrayLength(axes.image);
        var values = sorted1.arraySlice(axes.image, lengthi.subtract(1), lengthi);
        // convert back to an image  
        var max = values.arrayProject([axes.band]).arrayFlatten([['fitted', 't']]);
        var ndviMax = max.select(0);
        var time = max.select(1);
        //Now we recompute the fitted NDVI of the simple Harmonic model (only one peak pear year)
        //but only for the scene that corresponds to the max. fitted NDVI according to the second degree Fourier series
        //If the difference in fitted NDVI between the two function is high, we assume this pixel has double crops
        var harmonic_S2_tmax = time
            .addBands( time.multiply(2 * Math.PI).cos().rename('cos')) 
            .addBands( time.multiply(2 * Math.PI).sin().rename('sin'))
            .addBands(ee.Image.constant(1));
        // Compute fitted values of first order taylor. 
        var harmonicIndependents_simple = ee.List(['constant', 't', 'cos', 'sin']); 
        var harmonicS2 = sensor_data_4plotting.select(['NDVI','t','constant']).map(function(image) { 
          var timeRadians = image.select('t').multiply(2 * Math.PI); 
          return image 
            .addBands(timeRadians.cos().rename('cos')) 
            .addBands(timeRadians.sin().rename('sin')); 
        }); 
        var harmonicTrend = harmonicS2 
          .select(harmonicIndependents_simple.add(ee.String('NDVI'))) 
          .reduce(ee.Reducer.linearRegression(harmonicIndependents_simple.length(), 1)); 
        var harmonicTrendCoefficients = harmonicTrend.select('coefficients') 
          .arrayProject([0]) 
          .arrayFlatten([harmonicIndependents_simple]); 
        var fittedHarmonic_atmax = harmonic_S2_tmax.select(harmonicIndependents_simple) 
            .multiply(harmonicTrendCoefficients) 
            .reduce('sum') 
            .rename('fitted'); 
        //Map.addLayer(fittedHarmonic_atmax.clip(aoi_feat.geometry()), {min: 0, max: 1,palette: ['white','black']}, 'fNDVI at max',false)
        //Compute the difference in fitted NDVI
        var delta_fNDVI_tmax=ndviMax.subtract(fittedHarmonic_atmax.select('fitted')).clip(aoi_selected);
        //Unsupervised clustering to identify two clusters (double crop y/n)
        var crop_sample=delta_fNDVI_tmax.sample({
          region:aoi_selected,
          numPixels: 1000,
          scale: res_sel,
          tileScale: tile_scale
          });
        var clusterer_doublecrop = ee.Clusterer.wekaKMeans(2).train(crop_sample);
        // Recluster the training data and compute the mean dNDVI for each cluster.
        var clusters2 = crop_sample.cluster(clusterer_doublecrop, "cluster");
        var groups2 = clusters2.reduceColumns(ee.Reducer.mean().group(0), ["cluster", "fitted"]);
        // Extract the cluster IDs and the means.
        groups2 = ee.List(groups2.get("groups"));
        var ids2 = groups2.map(function(d) {return ee.Dictionary(d).get('group')});
        var means2 = groups2.map(function(d) {return ee.Dictionary(d).get('mean')});
        // Sort the IDs using the means as keys.
        var sorted2 = ee.Array(ids2).sort(means2).toList();
        var cImage2 = delta_fNDVI_tmax.cluster(clusterer_doublecrop);
        // Remap the clustered image to put the clusters in order.
        double_crop_map = cImage2.remap(sorted2, ids2).rename('clusters')
          .where(greenest_9to11.lt(0.4),0).where(greenest_2to5.lt(0.4),0);
        //if(checkbox.getValue() === true) {
          middleMap.layers().set(1,ui.Map.Layer(double_crop_map.updateMask(double_crop_map.select('clusters').eq(1)), {bands: ['clusters'],min: 0, max: 1, palette: ['white','black']},"Double Cropping " + year).setOpacity(slider3.getValue()));
        //}
        //currently the double crop planting area is not displayed, so this block is commented out
        /*dbl_area = ee.Number(double_crop_map.multiply(ee.Image.pixelArea()).multiply(1e-6).reduceRegion({
          reducer: ee.Reducer.sum(),
          geometry: aoi_selected,
          scale: 30,
          maxPixels: 1e13,
          tileScale: 8
        }).values().get(0)); 
        print('dbl_area',dbl_area);*/
        /*total_dblcrop_area.evaluate(function(result) {
              TotaldblCropAreaLabel = ui.Label({},{fontWeight: '450', fontSize: '12px'}).setValue( "Total Double Crop Planting Area in sq. km:  " + result.toFixed(2));
              panel_new.widgets().set(3, TotaldblCropAreaLabel);
        });*/  
},1000);
/*checkbox.onChange(function(checked) {
  if (iteration_id>0){
    if(checkbox.getValue() === true) {
      middleMap.layers().set(1,ui.Map.Layer(double_crop_map.updateMask(double_crop_map.select('clusters').eq(1)), {bands: ['clusters'],min: 0, max: 1, palette: ['white','black']},"Double Cropping " + year));
    } else if (checkbox.getValue() === false) {
      middleMap.layers().set(1,ui.Map.Layer(dummy,null));
    }}
});*/
//task3: initialize crop map postprocessing
var task3= continueButton2.onClick(function(){
  ppha_th=ee.Number.parse(sieve_th_textbox.getValue());
  minfs=ee.Number(ppha_th).multiply(ppha).round();
  print('max. N of pixel clusters treated as noise',minfs);
  kr=(ee.Number(ppha_th).multiply(ppha).divide(3.146).sqrt()).ceil();
  print('kernel radius',kr);
  iteration_id_b=iteration_id_b + 1;
  panel_new.clear();
  middleMap.remove(aoi_left_map_layer);
  satelliteMap.remove(poi_right_map_layer);
  added_left=0;
  added_right=0;
  //timeserieschart=0;
  panel_new.widgets().set(0, ui.Label('OUTPUTS', {fontWeight: '450', fontSize: '16px', margin: '7px 1px 1px 10px'}));
  panel_new.widgets().set(1, ui.Label());
  panel_new.widgets().set(2, wait);
  panel_new.widgets().set(3, checkbox2_panel);
  checkbox2.setDisabled(true).setValue(false,false);
  panel_new.widgets().set(4, checkbox2b_panel);
  checkbox2b.setDisabled(true).setValue(false,false);
  panel_new.widgets().set(5, checkbox_ET_panel);
  checkbox_ET.setValue(false,false).setDisabled(false);
  panel_new.widgets().set(6, checkbox_P_panel);
  checkbox_P.setValue(false,false).setDisabled(false);
  //panel_new.widgets().set(7, checkbox3.setDisabled(true).setValue(false,false));
  panel_new.widgets().set(1, unit_name_and_area);
  //middleMap.add(sliderPanel);
  //if(PtoMap_checkbox.getValue() === true) {
    //middleMap.layers().set(2,ui.Map.Layer(P_annual_img, {bands: ['precip'],min: 0, max:nb_of_months.multiply(100).getInfo(), palette: ["white","blue"]},"Seasonal Precipitation"));
  //} 
  //if(ETtoMap_checkbox.getValue() === true) {
    //middleMap.layers().set(3,ui.Map.Layer(ET_annual_img.clip(aoi_selected), {bands: ['b1'],min: 0, max:nb_of_months.multiply(200).getInfo(), palette: ["white","green"]},"Seasonal ET"));    
  //}
  task4();
});
//task4: all tasks related to crop map postprocessing
var task4= ui.util.debounce( function() {
  var iteration_id_b_tmp1=iteration_id_b;
  var iteration_id_tmp1=iteration_id;
  //print('crop_name_list',crop_name_list)
  var crop_ids=ee.List.sequence(1,crop_no);
  var process_ids=function(i){
    //var listtmp=ee.List(['',ee.String(key)]);
    var listtmp=ee.List([0,ee.Number(i)]);
    var tmp1=ee.String(ee.List(crop_name_list).get(ee.Number(i).subtract(1))).compareTo(ee.String('=No-Crop Area'));
    var tmp2=ee.Number(tmp1).abs();
    var tmp3=tmp2.min(1);
    var new_id=ee.Number(listtmp.get(tmp3));
    return new_id;
  };
  new_crop_ids=crop_ids.map(process_ids);
  new_crop_ids_long=new_crop_ids;
  //print('new_crop_ids_long',new_crop_ids_long);
  var cluster_map_reprojected=cluster_map0;//.reproject({crs: cluster_map0.projection().crs(), scale:res_sel});
  //Replace Cluster Ids by zero if Crop Type is 'no-crop area'
  var process_cropmap=function(i,cluster_map_reprojected){
    var new_id=ee.Number(new_crop_ids_long.get(ee.Number(i).subtract(1)));
    return ee.Image(cluster_map_reprojected).where(ee.Image(cluster_map_reprojected).eq(ee.Number(i)),new_id);
  };
  cluster_map=ee.Image(crop_ids.iterate(process_cropmap,cluster_map_reprojected));
  //APPLY SIEVING
  map_sieved=ee.Image(ee.Algorithms.If(ppha_th.gt(0),siever(cluster_map.where(cluster_map.gt(0),1)),cluster_map));
  cluster_map = ee.Image(ee.Algorithms.If(ppha_th.gt(0),
    cluster_map.where(map_sieved.eq(0),0),cluster_map));
  new_crop_ids=new_crop_ids.removeAll(ee.List([0]));
  var crop_name_list_new=crop_name_list.removeAll(ee.List(['=No-Crop Area']));
  no_crop_list=crop_ids.removeAll(new_crop_ids);
  //Returns the position of the first occurrence of target crop type in list
  var process_doubles=function(i){
    var liststrings=ee.List(crop_name_list_new);
    var tmp0=ee.Number(liststrings.indexOf(ee.List(crop_name_list).get(ee.Number(i).subtract(1))));
    return tmp0;
  };
  var duplicate_crop_ids0=new_crop_ids.map(process_doubles);
  //Each cluster labeled as 'Unknown' is treated as a separate crop type.
  var process_doubles2=function(i){
    var new_id=ee.Number(ee.Algorithms.If(duplicate_crop_ids0.indexOf(ee.Number(i)).lt(ee.Number(i)),duplicate_crop_ids0.get(ee.Number(i)),-1));
    var listtmp=ee.List([-1,new_id]);
    var tmp1=ee.String(ee.List(crop_name_list_new).get(ee.Number(i))).compareTo(ee.String('=Unknown'));
    var tmp2=ee.Number(tmp1).abs();
    var tmp3=tmp2.min(1);
    var tmp4=ee.Number(listtmp.get(tmp3));
    return tmp4;
  };
  duplicate_crop_ids=ee.List.sequence(0, ee.Number(duplicate_crop_ids0.length()).subtract(1)).map(process_doubles2);  
  //print('duplicate_crop_ids',duplicate_crop_ids)
  //Replace Cluster Ids if duplicate Crop Type Labels exist
  var process_cropmap2=function(i,cluster_map){
    return ee.Image(ee.Algorithms.If(ee.Number(duplicate_crop_ids.get(ee.Number(i))).eq(-1),
    ee.Image(cluster_map),
    ee.Image(cluster_map).where(ee.Image(cluster_map).eq(ee.Number(new_crop_ids.get(ee.Number(i)))),ee.Number(new_crop_ids.get(ee.Number(duplicate_crop_ids.get(ee.Number(i))))))));
  };
  cluster_map=ee.Image(ee.List.sequence(0,ee.Number(duplicate_crop_ids.length()).subtract(1)).iterate(process_cropmap2,cluster_map));
  var remove_doubles=function(i){
    var new_id=ee.Number(ee.Algorithms.If(ee.Number(duplicate_crop_ids.get(ee.Number(i))).eq(-1),new_crop_ids.get(ee.Number(i)),0));
    return new_id;
  };
  var new_crop_ids0=ee.List.sequence(0,ee.Number(new_crop_ids.length()).subtract(1)).map(remove_doubles);
  new_crop_ids=new_crop_ids0.removeAll(ee.List([0]));
  cluster_map=ee.Image(ee.Algorithms.If(ppha_th.gt(0),ee.Image(siever_all(cluster_map,new_crop_ids)),cluster_map));
  middleMap.layers().set(0,ui.Map.Layer(cluster_map.updateMask(cluster_map.select('clusters').gt(0)), {bands: ['clusters'],min: 0, max: 9, palette: new_palette},"Crop Map " + year).setOpacity(slider4.getValue()));
  cluster_map1=cluster_map;
  /*
  //Add a bunch of Labels
  ee.List(new_crop_ids).evaluate(function(result) {
    if (iteration_id_tmp1==iteration_id){//in case the user has already moved forward...
      if (iteration_id_b_tmp1==iteration_id_b){
        for (var i=0; i< result.length; i++) {
          var ii=result[i] - 1;
          panel_new.add(ui.Label({style: {backgroundColor: new_palette[ii + 1],padding: '12px',width: '130px',height: '29px',margin: '2px 1px 1px 10px'}})
            .setValue(ee.String(crop_name_list.get(ii)).slice(1).getInfo()));
        }
        checkbox2.setDisabled(false);  checkbox2b.setDisabled(false);
        //checkbox3.setDisabled(false);
      }}
  });*/ 
  ///calculate the new areas
  var calculate_area=function(x,cluster_map) {
    var image=ee.Image(1).updateMask(ee.Image(cluster_map).select('clusters').eq(ee.Number(x)))
      .multiply(ee.Image.pixelArea()).multiply(1e-6);
    return ee.Image(cluster_map).addBands(image.rename(ee.String("c").cat(ee.String(ee.Number(x).int()))));
  };
  var area_image   = ee.Image(new_crop_ids.iterate(calculate_area, cluster_map)).slice(1);
  area = area_image.reduceRegion({//.clipToCollection(complexCollection)
    reducer: ee.Reducer.sum(),
    geometry: aoi_selected,
    scale: 30,//area_calc_res,
    maxPixels: 1e13,
    tileScale: tile_scale
  }); 
  areas_values=area.values();//.sort().reverse();
  print('areas_values after postprocessing',areas_values);
  var areas_onlycrop_sum=ee.Number(areas_values.reduce(ee.Reducer.sum()));
  areas_onlycrop_sum.evaluate(function(result) {
    TotalCropAreaLabel = ui.Label({},{fontWeight: '450', fontSize: '12px'}).setValue("Total Cropped Area in sq. km: " + result.toFixed(2));
    if (iteration_id_tmp1==iteration_id){//in case the user has already moved forward...
      if (iteration_id_b_tmp1==iteration_id_b){
        panel_new.widgets().set(2, TotalCropAreaLabel);
      }}
  });
  var clust_area_dict=ee.Feature(null,area).toDictionary();
  var rename_properties=function(x,clust_area_dict) {
    var dict=ee.Dictionary(clust_area_dict);
    var ind=ee.Number(x);
    var dict_renamed=dict.rename(ee.List([ee.String("c").cat(ee.String(ind.int()))]),
      ee.List([ee.String("c").cat(ee.String(ind.int())).cat(ee.String(':')).cat(ee.String(crop_name_list.get(ind.subtract(1))).slice(1))]));
    return dict_renamed; 
  };
  var clusters_renamed=ee.Dictionary(new_crop_ids.iterate(rename_properties, clust_area_dict));
  clust_area_feat=ee.Feature(null,clusters_renamed.set('name','Area of Interest'));
  var col_selection=function(x) {
    var key=new_palette_server.get(x);
    return key;
  };
  new_palette2 = new_crop_ids.map(col_selection);  
  new_palette2.evaluate(function(result) {  
    checkbox2.setDisabled(false);  checkbox2b.setDisabled(false);
    //checkbox3.setDisabled(false);
    var chart3 = ui.Chart.feature.byFeature(ee.FeatureCollection(clust_area_feat),'name')
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Area per Crop Type',
          legend: {position: 'top', maxLines: 3},
          vAxis: {title: 'Area [km2]', minValue:0},
          colors: result
    });
      if (iteration_id_tmp1==iteration_id){//in case the user has already moved forward...
        if (iteration_id_b_tmp1==iteration_id_b){
          //panel_new.widgets().set(6, chart3);   
          panel_new.add(chart3);
        }}
  });
  print('new_crop_ids',new_crop_ids)
  var get_crop_names=function(x) {
    var ind=ee.Number(ee.List(new_crop_ids).get(ee.Number(x)));
    var key=ee.String(crop_name_list.get(ind.subtract(1))).slice(1);  
    return key;
  };  
  final_crop_names = ee.List.sequence(0,ee.Number(new_crop_ids.length()).subtract(1)).map(get_crop_names);  
  //ET per crop type
  var calculate_ET=function(x,ET_annual_img) {
    var image=ee.Image(ET_annual_img).select('b1').updateMask(cluster_map.select('clusters').eq(ee.Number(x)))
    return ee.Image(ET_annual_img).addBands(image.rename(ee.String("c").cat(ee.String(ee.Number(x).int()))));
  };
  var ET_cluster_image   = ee.Image(new_crop_ids.iterate(calculate_ET, ET_annual_img)).slice(1);
  var ET_per_crop = ET_cluster_image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: aoi_selected,
    scale: res_sel_ET,//100,//area_calc_res,
    maxPixels: 1e13,
    tileScale: 8,//tile_scale
  }); 
  var ET_values=ET_per_crop.values();//.sort().reverse();
  print('ET_per_crop',ET_values);
  var cat_strings=function(x) {
    var ind=ee.Number(ee.List(new_crop_ids).get(ee.Number(x)));
    var key=ee.String(crop_name_list.get(ind.subtract(1))).slice(1);
    var area_tmp=ee.Number(areas_values.get(ee.Number(x)));
    var ET_tmp=ee.Number(ee.List([ee.Number(ET_values.get(ee.Number(x))),0]).reduce(ee.Reducer.sum())).int();
    var P_tmp=ee.Number(P_mean_value.get(0)).int();
    var area_tmp2=ee.Number(areas_values.get(ee.Number(x))).divide(ee.Number(areas_values.reduce(ee.Reducer.sum()))).multiply(100);
    var cid=ind;
    var dict={c: [{v: cid}, {v:key}, {v: area_tmp},{v: area_tmp2},{v: ET_tmp},{v: P_tmp}]};
    return dict;
  };
  var dict_for_table = ee.List.sequence(0,ee.Number(new_crop_ids.length()).subtract(1)).map(cat_strings);  
  print('dict_for_table',dict_for_table)
  dict_for_table.evaluate(function(result) {  
    var dataTable = {
      cols: [{label: 'Cluster ID', type: 'number'},
              {label: 'Crop Type', type: 'string'},
             {label: 'Area (km2)', type: 'number'},
             {label: 'Area (%)', type: 'number'},
             {label: 'ET (mm)', type: 'number'},
            {label: 'P (mm)', type: 'number'}],
      rows: result};
    var options = {
      height: 200
    };  
    var charttable1 = new ui.Chart(dataTable, 'Table',options);
    // Print the chart to display it in the console.
      if (iteration_id_tmp1==iteration_id){//in case the user has already moved forward...
        if (iteration_id_b_tmp1==iteration_id_b){
          panel_new.add(charttable1);
          panel_new.add(VI_select_chart);
            //panel_new.add(ndvi_chart_panel);
            ndvisignature_function();
        }}
  });
    /////////////////////////////////////////////////////
},1000);
//checkbox3 is the checkbox allowing to display a graph of crop areas of all other years
// the algorithms uses unsupervised clustering to generate a map and then supervised classification to assign the colors and label the crops
years_select.setValue(thisyear);