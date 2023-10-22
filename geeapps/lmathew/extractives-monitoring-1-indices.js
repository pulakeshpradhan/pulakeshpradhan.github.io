var countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    ndvi_modis = ui.import && ui.import("ndvi_modis", "imageCollection", {
      "id": "MODIS/006/MOD13A1"
    }) || ee.ImageCollection("MODIS/006/MOD13A1"),
    urt_eez = ui.import && ui.import("urt_eez", "table", {
      "id": "users/lmathew/Share/TZA"
    }) || ee.FeatureCollection("users/lmathew/Share/TZA"),
    mikoa = ui.import && ui.import("mikoa", "table", {
      "id": "users/lmathew/tza_regions"
    }) || ee.FeatureCollection("users/lmathew/tza_regions"),
    mawilaya = ui.import && ui.import("mawilaya", "table", {
      "id": "users/lmathew/tza_districts"
    }) || ee.FeatureCollection("users/lmathew/tza_districts"),
    firms = ui.import && ui.import("firms", "imageCollection", {
      "id": "FIRMS"
    }) || ee.ImageCollection("FIRMS"),
    ba = ui.import && ui.import("ba", "imageCollection", {
      "id": "MODIS/006/MCD64A1"
    }) || ee.ImageCollection("MODIS/006/MCD64A1"),
    urt_pas = ui.import && ui.import("urt_pas", "table", {
      "id": "users/lmathew/URT/URT_PAs_092020"
    }) || ee.FeatureCollection("users/lmathew/URT/URT_PAs_092020"),
    wdpa = ui.import && ui.import("wdpa", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    lsib = ui.import && ui.import("lsib", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    eacop_wp = ui.import && ui.import("eacop_wp", "table", {
      "id": "projects/wwftz-forest/assets/eacop_wp"
    }) || ee.FeatureCollection("projects/wwftz-forest/assets/eacop_wp"),
    s1 = ui.import && ui.import("s1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD");
Map.centerObject(eacop_wp,6);
//----------------------------------------------------------------------------------------
//=======================================================================================
//Dates
var yeara = ee.Date('2018-01-01');
var yearb = ee.Date('2023-12-31');
//=======================================================================================
var empty = ee.Image().byte();
var iAfrica = ee.FeatureCollection(lsib.filter(ee.Filter.eq('wld_rgn','Africa')));
var jAfrica = empty.paint({featureCollection: iAfrica, color: 2, width: 3 });
var iCountries = countries.filter(ee.Filter.eq('country_co', 'TZ'))
                          .merge(countries.filter(ee.Filter.eq('country_co', 'KE')))
                          .merge(countries.filter(ee.Filter.eq('country_co', 'MA')));
var jCountries = empty.paint({featureCollection: iCountries, color: 1, width: 1 });
var iWDPA = wdpa.filter(ee.Filter.eq('PARENT_ISO', 'TZA'))
                .merge(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'KEN')))
                .merge(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'MDG')));
var jWDPA = empty.paint({featureCollection: iWDPA, color: 1, width: 1 });
//EACOP - Admin
var eacop_buffer_100m = ee.FeatureCollection("users/MPA/eacop/eacop_buffer_100m");
var eacop_buffer_1000m = eacop_buffer_100m.geometry().buffer({'distance': 1000});;
var eacop_buffer_100m_b = empty.paint({featureCollection: eacop_buffer_100m, color: 1, width: 1 });
var eacop_lga = ee.FeatureCollection("users/MPA/eacop/lga_eacop");
var eacop_lga_b = empty.paint({featureCollection: eacop_lga, color: 1, width: 2 });
var eacop_wards = ee.FeatureCollection("users/MPA/eacop/wards_eacop");
var eacop_wards_b = empty.paint({featureCollection: eacop_wards, color: 1, width: 1 });
var eacop_regions = ee.FeatureCollection("users/MPA/eacop/regions_eacop");
var eacop_regions_b = empty.paint({featureCollection: eacop_regions, color: 1, width: 3 });
// ===========================================================================================
// ===========================================================================================
//EACOP Buffer 10km
function bafa(ficha) {
  return ficha.buffer(10000);
}
var eacop_buffer_10km = eacop_buffer_100m.map(bafa); //10Km\\
// ===========================================================================================
// Feature View Free Flowing Rivers
// https://developers.google.com/earth-engine/datasets/catalog/WWF_HydroSHEDS_v1_FreeFlowingRivers?hl=en#table-properties
var dataset = ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers');
Map.addLayer(dataset, null, 'Free flowing rivers', 0);
// ===========================================================================================
// Feature View - Buildings
// https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_Research_open-buildings_v1_polygons?hl=en
var majengo = ee.FeatureCollection('GOOGLE/Research/open-buildings/v1/polygons');
majengo = majengo.filterBounds(eacop_buffer_10km);
Map.addLayer(majengo, {color: 'FF0000'}, 'Buildings',0);
//========================================================================================
//========================================================================================
//Sentinel 2
//Function for acquiring Sentinel 2 SR image collection
function getImageCollection(studyArea,startDate,endDate)
{
  return ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(studyArea).filterDate(startDate,endDate)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20)).map(maskS2clouds).map(addIndices);
}
//Landsat 8
////USGS Landsat 8 Level 2, Collection 2, Tier 1 (SR)
var l8sr_t2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2');
var bandNamesLandsat = ee.List(['blue','green','red','nir','swir1','temp','swir2']);
var sensorBandDictLandsat8sr = ee.List(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','ST_B10','SR_B7']);
//=====================================================================================================
//........................................................................................
//Remove Clouds
function maskS2clouds(image)
{
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).set('system:time_start', image.get('system:time_start'));
}
//========================================================================================
//INDICES
//https://custom-scripts.sentinel-hub.com/custom-scripts/#sentinel-2
//------------------------------------------------------------------------------------------------------
//Function to add common indices
function addIndices(img)
{
  img = img.addBands(img.normalizedDifference(['B8', 'B4']).rename('NDVI')); //NDVI
  img = img.addBands(img.normalizedDifference(['B3', 'B8']).rename('NDWI')); //NDWI
  img = img.addBands(img.normalizedDifference(['B8', 'B12']).rename('NBR')); //NBR
  img = img.addBands(img.normalizedDifference(['B8', 'B11']).rename('NDMI')); //NDMI
  img = img.addBands(img.normalizedDifference(['B8', 'B11']).rename('NDCI')); //NDCI
  //NDDI
  var vi = img.normalizedDifference(['B8', 'B4']).rename('NDVI'); //ndvi(image)
  var wi = img.normalizedDifference(['B3', 'B8']).rename('NDWI'); //ndwi(image);
  var di = vi.subtract(wi).divide(vi.add(wi));
  img = img.addBands(di.rename('NDDI')); //NDDI
  return img.clip(iAfrica);
}
//========================================================================================
//========================================================================================
//Sentinel 1
//SAR
  var s1sar = s1.filterDate(yeara,yearb);
  // Filter to get images from different look angles
  var asc = s1sar.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
  var desc = s1sar.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
  var vvvhAsc = asc.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  // Filter to get images with VV and VH single polarization
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'));
  var vvvhDesc = desc
  // Filter to get images with VV and VH dual polarization
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'));
  var imgVVa = vvvhAsc.select('VV');
  var imgVHa = vvvhAsc.select('VH');
  var imgVVd = vvvhDesc.select('VV');
  var imgVHd = vvvhDesc.select('VH');
//===============================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------
//=======================================================================================================================================
// A function that scales and masks Landsat 8 (C2) surface reflectance images.
function prepSrL8(image)
{
  // Develop masks for unwanted pixels (fill, cloud, cloud shadow).
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var getFactorImg = function(factorNames)
  {
    var factorList = image.toDictionary().select(factorNames).values();
    return ee.Image.constant(factorList);
  };
  var scaleImg = getFactorImg(['REFLECTANCE_MULT_BAND_.|TEMPERATURE_MULT_BAND_ST_B10']);
  var offsetImg = getFactorImg(['REFLECTANCE_ADD_BAND_.|TEMPERATURE_ADD_BAND_ST_B10']);
  var scaled = image.select('SR_B.|ST_B10').multiply(scaleImg).add(offsetImg);
  // Replace original bands with scaled bands and apply masks.
  return image.addBands(scaled, null, true)
    .updateMask(qaMask).updateMask(saturationMask);
}
//=====================================================================================================
//Function for acquiring Landsat TOA image collection
function getLS8ImageCollection(studyArea,startDate,endDate)
{
  //var dataset = l8sr_t2.map(applyScaleFactors);
  var dataset = l8sr_t2.map(prepSrL8)
  var l8sr = dataset.filterDate(startDate,endDate).filterBounds(studyArea);//.select(sensorBandDictLandsat8sr,bandNamesLandsat);
  return l8sr
}
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//===================================================================================================== 
//Display Vector Data (Boundaries)
Map.addLayer(jWDPA,{palette: '00ff00'},'WDPAs',0); 
Map.addLayer(jCountries,{palette: '000000'},'TZA, KEN & MDG',0);
Map.addLayer(iAfrica,{palette: '555555'},'Africa',1);
//Load EACOP
Map.addLayer(eacop_buffer_100m_b,{palette: '000000'},'EACOP-100m Buffer',1);
Map.addLayer(eacop_wards_b,{palette: '000000'},'EACOP-Wards',0);
Map.addLayer(eacop_lga_b,{palette: '000000'},'EACOP-LGAs',0);
Map.addLayer(eacop_regions,{palette: '000000'},'EACOP-Regions',0);
Map.addLayer(eacop_wp, {color: 'green', fillColor: '00000000'},'Monitoring Points',0);
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//===================================================================================================== 
// Create User Interface portion
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var introa = ui.Panel([ ui.Label({ value: 'Larger Projects Monitoring', style: {fontSize: '40px', fontWeight: 'bold', position: 'top-center'}}) ]);
panel.add(introa);
var introb = ui.Panel([ ui.Label({ value: 'Vegetation Indices', style: {fontSize: '30px', fontWeight: 'bold'}}) ]);
panel.add(introb);
//--------------------------------------------------------------------------------------------
var panel_jira = ui.Panel({ style: { width: '200px',position: 'bottom-left', padding: '10px 10px' } });
Map.add(panel_jira);
var kLon;
var kLat;
var pointi = ui.Panel([ ui.Label({ value: 'Add coordinates below to plot on Map ...', style: {fontSize: '15px',}}) ]);
panel_jira.add(pointi);
var iLon = ui.Textbox({ value:37.358316, placeholder: 'enter Longitude...', 
                                  onChange: function(value) { jiLon.setValue(value); return(value); } }) 
//var jLat = ;
panel_jira.add(ui.Panel([iLon]));
//print(lon);
var iLat = ui.Textbox({ value:-3.064579, placeholder: 'enter Latitude...', 
                                  onChange: function(value) { iLat.setValue(value); return(value); } })
panel_jira.add(ui.Panel([iLat]));
//print(lon);
var iButton = ui.Panel([ ui.Button({ label: 'Go to Location', onClick: function()
                                    { 
                                      kLon = parseFloat(iLon.getValue()); 
                                      kLat = parseFloat(iLat.getValue()); 
                                      Map.setCenter(kLon, kLat, 12);
                                      var jira = ee.Geometry.Point(kLon, kLat);
                                      Map.addLayer(jira, {'color': 'red'}, 'Jira');
                                    } 
                                  }) 
                      ]);
//print(button);
panel_jira.add(iButton);
//--------------------------------------------------------------------------------------------
// On Click results.
var jira = ui.Panel([ ui.Label({ value: 'Click on Your Point of Intrest to obtain Time Series Graphs ...', style: {fontSize: '15px',}}) ]);
panel.add(jira);
//--------------------------------------------------------------------------------------------
//The Descricptions
var maelezo_a = ui.Panel([ ui.Label({ value: 'Normalized Difference Vegetation Index(NDVI):  A simple indicator of green vegetation.', style: {fontSize: '12px', }}) ]);
var maelezo_b = ui.Panel([ ui.Label({ value: 'Normalized Difference Water Index(NDWI): ', style: {fontSize: '12px', }}) ]);
var maelezo_c = ui.Panel([ ui.Label({ value: 'Normalized Burn Ratio (NBR):  ', style: {fontSize: '12px', }}) ]);
var maelezo_d = ui.Panel([ ui.Label({ value: 'Normalized Difference Moisture Index (NDMI): ', style: {fontSize: '12px', }}) ]);
var maelezo_e = ui.Panel([ ui.Label({ value: 'Normalized Difference Chlorophyl Index (NDCI): ', style: {fontSize: '12px', }}) ]);
var maelezo_f = ui.Panel([ ui.Label({ value: 'Normalized Difference Drough Index (NDDI): ', style: {fontSize: '12px', }}) ]);
var maelezo_g = ui.Panel([ ui.Label({ value: 'Land Surface Temperature (LST): ', style: {fontSize: '12px', }}) ]);
var maelezo_h = ui.Panel([ ui.Label({ value: 'Fire: Near Real-Time (NRT) active fire data .', style: {fontSize: '12px', }}) ]);
var maelezo_i = ui.Panel([ ui.Label({ value: 'Sentinel-1 collects C-band synthetic aperture radar (SAR) imagery at a variety of polarizations and resolutions.', style: {fontSize: '12px', }}) ]);
var maelezo_j = ui.Panel([ ui.Label({ value: 'CCDC:  Implements the Continuous Change Detection and Classification temporal breakpoint algorithm SWIR.', style: {fontSize: '12px', }}) ]);
var maelezo_k = ui.Panel([ ui.Label({ value: 'CCDC:  Implements the Continuous Change Detection and Classification temporal breakpoint algorithm NDFI.', style: {fontSize: '12px', }}) ]);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//===================================================================================================== 
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//===================================================================================================== 
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords)
{
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Longitude: ' + coords.lon.toFixed(5)),
  lat.setValue('Latitude: ' + coords.lat.toFixed(5));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.addLayer(point, {'color': 'black'}, 'WP');
  var pointBuffer = point.buffer({'distance': 100});
  var pointBufferCircle = empty.paint({featureCollection: pointBuffer, color: 1, width: 3 });
  Map.addLayer(pointBufferCircle, {'color': 'red'}, 'WP Buffer - 100m'); 
  var s2sr = getImageCollection(pointBuffer,yeara,yearb);
  var ls8sr = getLS8ImageCollection(pointBuffer,yeara,yearb).select('ST_B10');
  var firms_fire = firms.filterDate(yeara, yearb).select('T21');
  //NDVI
  var ndvi_Chart = ui.Chart.image.series(s2sr.select('NDVI'), pointBuffer, ee.Reducer.mean(), 250);
  ndvi_Chart.setOptions({ title: 'Sentienel 2 - NDVI', vAxis: {title: 'NDVI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //NDWI
  var ndwi_Chart = ui.Chart.image.series(s2sr.select('NDWI'), pointBuffer, ee.Reducer.mean(), 250);
  ndwi_Chart.setOptions({ title: 'Sentienel 2 - NDWI', vAxis: {title: 'NDWI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //NBR
  var nbr_Chart = ui.Chart.image.series(s2sr.select('NBR'), pointBuffer, ee.Reducer.mean(), 250);
  nbr_Chart.setOptions({ title: 'Sentienel 2 - NBR', vAxis: {title: 'NBR', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //NDMI
  var ndmi_Chart = ui.Chart.image.series(s2sr.select('NDMI'), pointBuffer, ee.Reducer.mean(), 250);
  ndmi_Chart.setOptions({ title: 'Sentienel 2 - NDMI', vAxis: {title: 'NDMI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //NDCI
  var ndci_Chart = ui.Chart.image.series(s2sr.select('NDCI'), pointBuffer, ee.Reducer.mean(), 250);
  ndci_Chart.setOptions({ title: 'Sentienel 2 - NDCI', vAxis: {title: 'NDCI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //NDDI
  var nddi_Chart = ui.Chart.image.series(s2sr.select('NDDI'), pointBuffer, ee.Reducer.mean(), 250);
  nddi_Chart.setOptions({ title: 'Sentienel 2 - NDDI', vAxis: {title: 'NDDI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //LST
  var lst_Chart = ui.Chart.image.series(ls8sr, pointBuffer, ee.Reducer.mean(), 250);
  lst_Chart.setOptions({ title: 'Landsat 8 OLI - LST', vAxis: {title: 'LST (Kelvin)', maxValue: 600, minValue: 300},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //Fire
  var firms_fire_Chart = ui.Chart.image.series(firms_fire, point, ee.Reducer.count(), 250);
  firms_fire_Chart.setOptions({ title: 'FIRMS - Wildfire Activities', vAxis: {title: 'Fire Incidences', maxValue: 0, minValue: 50},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //---------------------------------------------------------------------------------------------------
  //SAR
  var s1_a_VV_chart = ui.Chart.image.series(imgVVa, point, ee.Reducer.mean(), 250);
  s1_a_VV_chart.setOptions({ title: 'S1-SAR Asc-VV', vAxis: {title: 'VV', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var s1_a_VH_chart = ui.Chart.image.series(imgVHa, point, ee.Reducer.mean(), 250);
  s1_a_VH_chart.setOptions({ title: 'S1-SAR Asc-VH', vAxis: {title: 'VH', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var s1_d_VV_chart = ui.Chart.image.series(imgVVd, point, ee.Reducer.mean(), 250);
  s1_d_VV_chart.setOptions({ title: 'S1-SAR Desc-VV', vAxis: {title: 'VV', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var s1_d_VH_chart = ui.Chart.image.series(imgVHd, point, ee.Reducer.mean(), 250);
  s1_d_VH_chart.setOptions({ title: 'S1-SAR Desc-VH', vAxis: {title: 'VH', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //---------------------------------------------------------------------------------------------------
  panel.widgets().set(4, ndvi_Chart);
  panel.widgets().set(5, ndwi_Chart);
  panel.widgets().set(6, nbr_Chart);
  panel.widgets().set(7, ndmi_Chart);
  panel.widgets().set(8, ndci_Chart);
  panel.widgets().set(9, nddi_Chart);
  panel.widgets().set(10, lst_Chart);
  panel.widgets().set(11, firms_fire_Chart);
  panel.widgets().set(12, s1_a_VV_chart);
  panel.widgets().set(13, s1_a_VH_chart);
  panel.widgets().set(14, s1_d_VV_chart);
  panel.widgets().set(15, s1_d_VH_chart);
  //panel.widgets().set(13, swir1_Chart);
  //panel.widgets().set(14, ndfi_Chart);
  panel.widgets().set(16, maelezo_a);
  panel.widgets().set(17, maelezo_b);
  panel.widgets().set(18, maelezo_c);
  panel.widgets().set(19, maelezo_d);
  panel.widgets().set(20, maelezo_f);
  panel.widgets().set(21, maelezo_g);
  panel.widgets().set(22, maelezo_h);
  panel.widgets().set(23, maelezo_i);
  //panel.widgets().set(21, maelezo_j);
  //panel.widgets().set(22, maelezo_k);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);