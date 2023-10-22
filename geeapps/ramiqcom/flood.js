var gfd = ui.import && ui.import("gfd", "imageCollection", {
      "id": "GLOBAL_FLOOD_DB/MODIS_EVENTS/V1"
    }) || ee.ImageCollection("GLOBAL_FLOOD_DB/MODIS_EVENTS/V1"),
    ghsl = ui.import && ui.import("ghsl", "imageCollection", {
      "id": "JRC/GHSL/P2016/POP_GPW_GLOBE_V1"
    }) || ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1"),
    worldPop = ui.import && ui.import("worldPop", "imageCollection", {
      "id": "WorldPop/GP/100m/pop"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop"),
    gsw = ui.import && ui.import("gsw", "image", {
      "id": "JRC/GSW1_3/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_3/GlobalSurfaceWater"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4"),
    settle = ui.import && ui.import("settle", "imageCollection", {
      "id": "JRC/GHSL/P2016/SMOD_POP_GLOBE_V1"
    }) || ee.ImageCollection("JRC/GHSL/P2016/SMOD_POP_GLOBE_V1"),
    landform = ui.import && ui.import("landform", "image", {
      "id": "CSP/ERGo/1_0/Global/SRTM_landforms"
    }) || ee.Image("CSP/ERGo/1_0/Global/SRTM_landforms"),
    chirps = ui.import && ui.import("chirps", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    regions = ui.import && ui.import("regions", "image", {
      "id": "projects/ee-ramiqcom/assets/admin/regions"
    }) || ee.Image("projects/ee-ramiqcom/assets/admin/regions"),
    adm0 = ui.import && ui.import("adm0", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    adm1 = ui.import && ui.import("adm1", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1"),
    adm2 = ui.import && ui.import("adm2", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    das = ui.import && ui.import("das", "table", {
      "id": "projects/ee-ramiqcom/assets/skripsi/Batas_DAS_KLHK"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/skripsi/Batas_DAS_KLHK");
var adm1 = ee.FeatureCollection("projects/sat-io/open-datasets/field-maps/edge-matched-humanitarian/adm1_polygons");
var adm2 = ee.FeatureCollection("projects/sat-io/open-datasets/field-maps/edge-matched-humanitarian/adm2_polygons");
var adm3 = ee.FeatureCollection("projects/sat-io/open-datasets/field-maps/edge-matched-humanitarian/adm3_polygons");
var javaAOI = ee.FeatureCollection({
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              104.74980450485702,
              -4.74038737592808
            ],
            [
              104.74980450485702,
              -9.317333723556132
            ],
            [
              115.06385993755856,
              -9.317333723556132
            ],
            [
              115.06385993755856,
              -4.74038737592808
            ],
            [
              104.74980450485702,
              -4.74038737592808
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
}).geometry();
// Function to zoom location or Indonesia
function myLocation(){
  var javaIsland = java();
  Map.centerObject(javaIsland, 7);
}
myLocation();
// Function to start map
function resetMap(){
  // Clear map
  Map.clear();
  // Set map to gray
  Map.setOptions( 'Grey', {'Grey': [{
    featureType:'all',
    stylers: [{
      saturation:-100
  }]}]});
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true,
    drawingToolsControl: true
  });
  // Set drawing tools to only be rectangle and not linked to script
  Map.drawingTools().setDrawModes(['rectangle']).setLinked(false);
  // Set geometry to hide after each function
  Map.drawingTools().layers().forEach(function(obj){
    obj.setShown(false);
  });
}
resetMap();
// UI root var
var root = ui.root;
// Main panel for app
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {maxWidth: '400px', padding: '15px'}
});
root.add(mainPanel);
// Title for the app
var titleLabel = ui.Label({
  style: {color: 'DodgerBlue', fontWeight: 'bold', fontSize: '30px', margin: '10px 5px'},
  value: 'Multitemporal Flood Risk Simulator'
});
mainPanel.add(titleLabel);
// AOI select button
var aoiSelect = ui.Select({
  placeholder: 'Select AOI',
  items: ['Java', 'DAS Serayu', 'DAS Citarum', /*'Global', 'Map bounds' 'Draw AOI', 'GeoJSON' */],
  value: 'Java',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    if (value == 'Draw AOI'){
      drawAoiSelect.style().set('shown', true);
      geojsonTextbox.style().set('shown', false);
    } else if (value == 'GeoJSON'){
      geojsonTextbox.style().set('shown', true);
      drawAoiSelect.style().set('shown', false);
    } else {
      geojsonTextbox.style().set('shown', false);
      drawAoiSelect.style().set('shown', false);
    }
    if (value == 'Draw AOI' && drawAoiSelect.getValue() === null){
      predictButton.setDisabled(true);
    } else if (value == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      predictButton.setDisabled(true);
    } else {
      predictButton.setDisabled(false);
    }
  }
});
mainPanel.add(aoiSelect);
// Draw AOI select
var drawAoiSelect = ui.Select({
  placeholder: 'Draw or select an AOI',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(value){
    if (aoiSelect.getValue() == 'Draw AOI' && drawAoiSelect.getValue() === null){
      predictButton.setDisabled(true);
    } else if (aoiSelect.getValue() == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      predictButton.setDisabled(true);
    } else {
      predictButton.setDisabled(false);
    }
  }
});
mainPanel.add(drawAoiSelect);
// Drawing tools function
function draw(){
  // Drawing tools
  var drawingTools = Map.drawingTools();
  // Function when drawing tools change
  function change() {
    var layer = drawingTools.layers();
    var name = layer.getJsArray().map(function(obj){
      var objName = obj.getName();
      return objName;
    });
    drawAoiSelect.items().reset(name);
  }
  change();
  // Applying change function to drawing tools
  drawingTools.onLayerAdd(change);
  drawingTools.onLayerRemove(change);
}
draw();
// Textbox to add geojson string
var geojsonTextbox = ui.Textbox({
  placeholder: 'Paste GeoJSON string here!',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(value){
    if (aoiSelect.getValue() == 'Draw AOI' && drawAoiSelect.getValue() === null){
      predictButton.setDisabled(true);
    } else if (aoiSelect.getValue() == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      predictButton.setDisabled(true);
    } else {
      predictButton.setDisabled(false);
    }
  }
});
mainPanel.add(geojsonTextbox);
// Select button for analysis
var analysisSelect = ui.Select({
  items: ['Flood risk', 'Flood hazard', 'Flood exposure', 'Flood vulnerability', 'Population', 'GDP', 'HDI'],
  value: 'Flood risk',
  style: {stretch: 'horizontal'},
  onChange: function(value){
  }
});
mainPanel.add(analysisSelect);
// Select button for aggregation
var aggrSelect = ui.Select({
  items: ['Dasymetric', 'Country', 'Province', 'City/regency'],
  placeholder: 'Select aggregation',
  value: 'Dasymetric',
  style: {stretch: 'horizontal'},
  onChange: function(){
    predictButton.setDisabled(false);
  }
});
mainPanel.add(aggrSelect);
// Year label
var yearLabel = ui.Label({
  value: 'Period'
});
mainPanel.add(yearLabel);
// Year slider
var yearSlider = ui.DateSlider({
  start: '1970-01-01',
  end: '2100-12-31',
  period: 30,
  value: ee.Date(Date.now()),
  style: {stretch: 'horizontal'}
});
mainPanel.add(yearSlider);
// Rain slider label
var rainLabel = ui.Label({
  value: 'Rain intensity multiplier',
});
mainPanel.add(rainLabel);
// Rain intensity slider
var rainSlider = ui.Slider({
  min: 1,
  max: 10,
  step: 0.1,
  value: 1,
  style: {stretch: 'horizontal'}
});
mainPanel.add(rainSlider);
// Pop label
var popLabel = ui.Label({
  value: 'Pop growth multiplier',
});
mainPanel.add(popLabel);
// Pop growth slider
var popSlider = ui.Slider({
  min: 1,
  max: 10,
  step: 0.1,
  value: 1,
  style: {stretch: 'horizontal'}
});
mainPanel.add(popSlider);
// Econ label
var econLabel = ui.Label({
  value: 'Economic growth multiplier',
});
mainPanel.add(econLabel);
// Economic growth slider
var econSlider = ui.Slider({
  min: 1,
  max: 10,
  step: 0.1,
  value: 1,
  style: {stretch: 'horizontal'}
});
mainPanel.add(econSlider);
// Show map button
var predictButton = ui.Button({
  label: 'Show prediction',
  style: {stretch: 'horizontal'},
  onClick: function(){
    showData();
  }
});
mainPanel.add(predictButton);
// Function to get map bounds as geometry
function boundsGeom(){
  var bounds = ee.Geometry(Map.getBounds(true));
  return bounds;
}
// Function to return draw aoi as geometry
function drawGeometry(){
  var geomName = drawAoiSelect.getValue();
  var layer = ee.FeatureCollection(Map.drawingTools().layers().getJsArray().map(function(obj){
    var name = obj.getName();
    return ee.Feature(obj.getEeObject()).set({'name': name});
  }));
  var geom = layer.filter(ee.Filter.eq('name', geomName)).first().geometry();
  return geom;
}
// Function to have a geometry with geojson
function geojson(){
  var string = geojsonTextbox.getValue();
  var jsonString = JSON.parse(string);
  var geometryJSON = ee.FeatureCollection(jsonString).geometry();
  return geometryJSON;
}
// Java only area
function java(){
  var feature = adm1;
  var javaProvince = adm1.filter(ee.Filter.or(
    ee.Filter.eq('adm1_name', 'Jawa Barat'),
    ee.Filter.eq('adm1_name', 'Jawa Timur'),
    ee.Filter.eq('adm1_name', 'Jawa Tengah'),
    ee.Filter.eq('adm1_name', 'Daerah Istimewa Yogyakarta'),
    ee.Filter.eq('adm1_name', 'Dki Jakarta'),
    ee.Filter.eq('adm1_name', 'Banten')
  )).union();
  var hull = javaProvince.geometry().convexHull();
  return hull;
}
// Function java image
function javaImage(){
  var java = ee.Image(regions).where(regions.eq(3), 1).where(regions.neq(3), 0).selfMask();
  return java;
}
// Function to get citarum das
function citarum(){
  var dasCitarum = das.filter(ee.Filter.eq('nama_das', 'CITARUM')).first().geometry();
  return dasCitarum;
}
// Function to get serayu das
function serayu(){
  var dasSerayu = das.filter(ee.Filter.eq('nama_das', 'SERAYU')).first().geometry();
  return dasSerayu;
}
// Function to get a final AOI
function aoi(){
  var geom;
  var aoiStatus = aoiSelect.getValue();
  switch (aoiStatus){
    case 'Map bounds':
      geom = boundsGeom();
      break;
    case 'Draw AOI':
      geom = drawGeometry();
      break;
    case 'GeoJSON':
      geom = geojson();
      break;
    case 'Java':
      geom = java();
      break;
    case 'DAS Serayu':
      geom = serayu();
      break;
    case 'DAS Citarum':
      geom = citarum();
      break;
    case 'DIY':
      geom = diy();
      break;
  }
  return geom;
}
// Function to get aggregation unit
function aggrUnit(){
  var feature;
  var aggrStatus = aggrSelect.getValue();
  switch (aggrStatus){
    case 'Country':
      feature = adm0;
      break;
    case 'Province':
      feature = adm1;
      break;
    case 'City/regency':
      feature = adm2;
      break;
  }
  var bounds = aoi();
  var featureFilter = feature.filterBounds(bounds);
  if (aoiSelect.getValue() == 'Global'){
    featureFilter = feature.filterBounds(boundsGeom());
  }
  return featureFilter;
}
// Function to create yearly band of built up
function settleYear(){
  /*
  var built = settle.select('smod_code').map(function(feat){
    if(aoiSelect.getValue() !== 'Global'){
      feat = feat.clip(aoi());
    }
    return feat.addBands(feat.metadata('system:time_start'));
  });
  var regression = built.select(['system:time_start', 'smod_code']).reduce(ee.Reducer.linearFit());
  */
  return ee.Image('projects/ee-ramiqcom/assets/skripsi/settleRegression');
}
// Function year info
function yearInfo(){
  var yearList = [];
  for (var i = 2000; i <= 2018; i++){
    yearList.push(i);
  }
  var info = yearList.map(function(obj){
    return ee.Date(obj + '-01-01').millis();
  });
  return info;
}
// Function to get rain band
function rainBand(){
  var rain = chirps.select('precipitation');
  if(aoiSelect.getValue() !== 'Global'){
    rain = rain.map(function(img){
      return img.clip(aoi());
    });
  }
  /*
  var imageCol = ee.ImageCollection.fromImages(yearInfo().map(function(obj){
    var filterDate = rain.filterDate(obj, obj.add(31556926000)).sum().set('system:time_start', obj, 'date', obj);
    return filterDate;
  }));
  imageCol.aggregate_array('date').distinct().evaluate(function(list){
    list.map(function(date){
      var dateObj = new Date(date);
      var year = dateObj.getFullYear();
      var image = imageCol.filter(ee.Filter.eq('date', date)).first().set('year', year);
      var name = 'rain_year_' + year;
      Export.image.toAsset({
        image: image,
        description: name,
        assetId: 'projects/ee-ramiqcom/assets/skripsi/rainCol/' + name,
        scale: 5566,
        region: javaAOI,
        crs: 'EPSG:4326',
        maxPixels: 1e13
      });
    });
  });
  */
  return ee.ImageCollection('projects/ee-ramiqcom/assets/skripsi/rainCol');
}
// Function to process dem
function demRes(){
  /*
  var dem = srtm.select('elevation');
  if(aoiSelect.getValue() !== 'Global'){
    dem = dem.clip(aoi());
  }
  var changeRes = dem.reduceResolution(ee.Reducer.mean(), true)
    .reproject('EPSG:4326', null, 250)
    .rename('Elevation');
  */
  return ee.Image('projects/ee-ramiqcom/assets/skripsi/srtm250m');
}
// Function to process landform
function landformRes(){
  /*
  var landForm = landform
    .where(landform.gte(10).and(landform.lt(20)), 0)
    .where(landform.gte(20).and(landform.lte(30)), 0.3)
    .where(landform.gte(30).and(landform.lte(40)), 0.7)
    .where(landform.gte(40).and(landform.lte(50)), 1);
  if(aoiSelect.getValue() !== 'Global'){
    landForm = landForm.clip(aoi());
  }
  var changeRes = landForm.reduceResolution(ee.Reducer.mode(), true)
    .reproject('EPSG:4326', null, 250)
    .rename('Landform');
  */
  return ee.Image('projects/ee-ramiqcom/assets/skripsi/landform250m');
}
// Function to make flood per year composite
function floodYear(){
  /*
  var data = gfd.select('duration');
  if(aoiSelect.getValue() !== 'Global'){
    data = data.map(function(img){
      return img.clip(aoi());
    });
  }
  var imageCol = ee.ImageCollection.fromImages(yearInfo().map(function(obj){
    var flood = data.filterDate(obj, obj.add(31556926000)).sum().set('system:time_start', obj).rename('Flood');
    var timeBand = ee.Image(flood.metadata('system:time_start')).rename('Time') ;
    var popIntensity = popSlider.getValue();
    var rainIntensity = rainSlider.getValue();
    var builtRegress = settleYear();
    var scale = builtRegress.select('scale').multiply(popIntensity);
    var offset = builtRegress.select('offset');
    var builtBand = scale.multiply(obj).add(offset).rename('Built');
    var rain = rainBand().filter(ee.Filter.eq('system:time_start', obj))
      .first()
      .multiply(rainIntensity)
      .rename('Precipitation');
    var dem = demRes();
    var landForm = landformRes();
    return timeBand.addBands([builtBand, rain, dem, landForm, flood]).set('date', obj, 'year', new Date(obj).getFullYear());
  }));
  */
  /*
  print(imageCol);
  Map.addLayer(imageCol)
  imageCol.aggregate_array('date').distinct().evaluate(function(list){
    list.map(function(date){
      var dateObj = new Date(date);
      var year = dateObj.getFullYear();
      var image = imageCol.filter(ee.Filter.eq('date', date)).first().set('year', year);
      var name = 'floodParameter_year_' + year;
      Export.image.toAsset({
        image: image,
        description: name,
        assetId: 'projects/ee-ramiqcom/assets/skripsi/floodParamCol/' + name,
        scale: 250,
        region: javaAOI,
        crs: 'EPSG:4326',
        maxPixels: 1e13
      });
    });
  });
  */
  return ee.ImageCollection('projects/ee-ramiqcom/assets/skripsi/floodParamCol');
}
// Surface flood hazard function
function surfaceHazard(){
  /*
  var flood = floodYear();
  var regression = flood.select(['system:time_start', 'Precipitation', 'Elevation', 'Landform', 'Built', 'Flood'])
    .reduce(ee.Reducer.linearRegression({
      numX: 5,
      numY: 1
    }));
  var bandName = [['year', 'rain', 'elevation', 'landform', 'built'], ['flood']];
  */
  var flatten = ee.Image('projects/ee-ramiqcom/assets/skripsi/floodHazard_regression');
  /*
  print(flatten);
  Export.image.toAsset({
        image: flatten,
        description: 'floodHazard_regression',
        assetId: 'projects/ee-ramiqcom/assets/skripsi/floodHazard_regression',
        scale: 250,
        region: javaAOI,
        crs: 'EPSG:4326',
        maxPixels: 1e13
      });
  */
  var yearCoef = flatten.select('year_flood');
  var year = yearSlider.getValue()[0];
  var prediction = yearCoef.multiply(year).rename('flood');
  var seed = ee.Algorithms.Image.Segmentation.seedGrid(5);
  var segment = ee.Algorithms.Image.Segmentation.SNIC({
    image: prediction,
    seeds: seed,
    size: 5,
  }).select('flood_mean').reproject('EPSG:4326', null, 250).unmask();
  var predictionScaled = segment.where(segment.gt(0), 1)
    .where(segment.lte(0), 0)
    .rename('Surface_Hazard');
  var water = gsw.select('transition');
  if(aoiSelect.getValue() !== 'Global'){
    water = water.clip(aoi());
  }
  var floodOnly = predictionScaled.where(water.eq(1), 0);
  if(aoiSelect.getValue() == 'Java'){
    floodOnly = floodOnly.updateMask(javaImage());
  }
  return floodOnly.rename('Flooded');
}
// Function to get population prediction
function popPredict(){
  /*
  var pop = ghsl.map(function(img){
    return img.reproject('EPSG:4326', null, 250);
  });
  if(aoiSelect.getValue() !== 'Global'){
    pop = pop.map(function(obj){
      return obj.clip(aoi());
    });
  }
  var addTimeBand = pop.map(function(obj){
    var timeband = ee.Image(obj.metadata('system:time_start'));
    var newImage = obj.addBands(timeband);
    return newImage;
  });
  */
  var popIntensity = popSlider.getValue();
  var regression = ee.Image('projects/ee-ramiqcom/assets/skripsi/popPredict_regression');
  /*
  Export.image.toAsset({
        image: regression,
        description: 'popPredict_regression',
        assetId: 'projects/ee-ramiqcom/assets/skripsi/popPredict_regression',
        scale: 250,
        region: javaAOI,
        crs: 'EPSG:4326',
        maxPixels: 1e13
      });
  */
  var scale = regression.select('scale').multiply(popIntensity);
  var offset = regression.select('offset');
  var year = yearSlider.getValue()[0];
  var popPrediction = scale.multiply(year).add(offset);
  var popPredictionCorrected = ee.Image(popPrediction).where(popPrediction.lt(0), 0).rename('Population');
  return popPredictionCorrected;
}
// Function to get GDP data
function gdp(){
  var ggd = require('users/ramiqcom/ugm:data/ggd').ggd();
  var gdpData = ggd.select('GDP');
  if(aoiSelect.getValue() !== 'Global'){
    gdpData = gdpData.map(function(obj){
      return obj.clip(aoi());
    });
  }
  return gdpData;
}
// Function to get GDP prediction
function gdpPredict(){
  /*
  var gdpData = gdp();
  var addTimeBand = gdpData.map(function(obj){
    var timeBand = ee.Image(obj.metadata('system:time_start'));
    return obj.addBands(timeBand);
  });
  */
  var econIntensity = econSlider.getValue();
  var regression = ee.Image('projects/ee-ramiqcom/assets/skripsi/gdpPPP_regression');
  /*
  Export.image.toAsset({
        image: regression,
        description: 'gdpPPP_regression',
        assetId: 'projects/ee-ramiqcom/assets/skripsi/gdpPPP_regression',
        scale: 250,
        region: javaAOI,
        crs: 'EPSG:4326',
        maxPixels: 1e13
      });
  */
  var scale = regression.select('scale').multiply(econIntensity);
  var offset = regression.select('offset');
  var year = yearSlider.getValue()[0];
  var gdpPrediction = scale.multiply(year).add(offset).divide(1000000);
  var gdpPredictionCorrected = ee.Image(gdpPrediction).where(gdpPrediction.lt(0), 0).rename('GDP');
  return gdpPredictionCorrected;
}
// Function to crreat band for built up
function builtUp(){
  /*
  var built = settle.select('smod_code').map(function(feat){
    return feat.addBands(feat.metadata('system:time_start'));
  });
  if(aoiSelect.getValue() !== 'Global'){
    built = built.map(function(obj){
      return obj.clip(aoi());
    });
  }
  */
  var popIntensity = popSlider.getValue();
  var regression = ee.Image('projects/ee-ramiqcom/assets/skripsi/built_regression');
  /*
  Export.image.toAsset({
        image: regression,
        description: 'built_regression',
        assetId: 'projects/ee-ramiqcom/assets/skripsi/built_regression',
        scale: 1000,
        region: javaAOI,
        crs: 'EPSG:4326',
        maxPixels: 1e13
      });
  */
  var scale = regression.select('scale').multiply(popIntensity);
  var offset = regression.select('offset');
  var year = yearSlider.getValue()[0];
  var builtUpPrediction = scale.multiply(year).add(offset).reproject({crs: 'EPSG:4326', scale: 1000});
  var builtCorrected = builtUpPrediction.where(builtUpPrediction.lt(1), 0)
    .where(builtUpPrediction.gte(1).and(builtUpPrediction.lt(2)), 1)
    .where(builtUpPrediction.gte(2).and(builtUpPrediction.lt(3)), 2)
    .where(builtUpPrediction.gte(3), 3);
  return builtCorrected.rename('Settlement');
}
// Function to get flood exposure
function floodExpo(){
  var settlement = builtUp();
  var settleScore = ee.Image(settlement).where(settlement.eq(1), 0.3)
    .where(settlement.eq(2), 0.7)
    .where(settlement.eq(3), 1);
  var pop = popPredict();
  var popScore = ee.Image(pop).where(pop.gt(0).and(pop.lte(100)), 0.3)
    .where(pop.gt(100).and(pop.lte(1000)), 0.7)
    .where(pop.gt(1000), 1);
  var gdp = gdpPredict();
  var gdpScore = ee.Image(gdp).where(gdp.gt(0).and(gdp.lte(1000000000)), 0.3)
    .where(gdp.gt(1000000000).and(gdp.lte(1000000000000)), 0.7)
    .where(gdp.gt(1000000000000000), 1);
  var exposure = settleScore.add(popScore).add(gdpScore).divide(3).rename('Flood_Exposure');
  var seed = ee.Algorithms.Image.Segmentation.seedGrid(5);
  var segment = ee.Algorithms.Image.Segmentation.SNIC({
    image: exposure,
    seeds: seed,
    size: 5,
  }).select('Flood_Exposure_mean').reproject('EPSG:4326', null, 250); 
  return segment;
}
// Function to get HDI data
function hdi(){
  var ggd = require('users/ramiqcom/ugm:data/ggd').ggd();
  var hdiData = ggd.select('HDI');
  if(aoiSelect.getValue() !== 'Global'){
    hdiData = hdiData.map(function(obj){
      return obj.clip(aoi());
    });
  }
  return hdiData;
}
// Function to get hdi predict
function hdiPredict(){
  /*
  var hdiData = hdi();
  var addTimeBand = hdiData.map(function(obj){
    var timeBand = ee.Image(obj.metadata('system:time_start'));
    return obj.addBands(timeBand);
  });
  */
  var regression = ee.Image('projects/ee-ramiqcom/assets/skripsi/hdi_regression');
  /*
  Export.image.toAsset({
        image: regression,
        description: 'hdi_regression',
        assetId: 'projects/ee-ramiqcom/assets/skripsi/hdi_regression',
        scale: 1000,
        region: javaAOI,
        crs: 'EPSG:4326',
        maxPixels: 1e13
      });
  */
  var scale = regression.select('scale');
  var offset = regression.select('offset');
  var year = yearSlider.getValue()[0];
  var hdiPrediction = scale.multiply(year).add(offset).rename('HDI');
  var hdiCorrection = ee.Image(hdiPrediction).where(hdiPrediction.gt(1), 1);
  return hdiCorrection;
}
// Function to get flood vulnerability
function floodVuln(){
  var hdiPrediction = hdiPredict();
  var score = hdiPredict().subtract(1).abs().rename('Flood_Vulnerability');
  score = score.where(score.lte(0.1), 0.1);
  var pop = popPredict();
  var onlyPop = ee.Image(score).where(pop.lte(0), 0);
  var seed = ee.Algorithms.Image.Segmentation.seedGrid(5);
  var segment = ee.Algorithms.Image.Segmentation.SNIC({
    image: onlyPop,
    seeds: seed,
    size: 5,
  }).select('Flood_Vulnerability_mean').reproject('EPSG:4326', null, 250); 
  return segment;
}
// Surface flood risk
function surfaceRisk(){
  var surface = surfaceHazard();
  var expo = floodExpo();
  var vuln = floodVuln();
  var risk = surface.multiply(expo).multiply(vuln).multiply(5).rename('Surface_Risk');
  return risk;
}
// Function to get the result
function selectedAnalysis(){
  var analysisStatus = analysisSelect.getValue();
  var final;
  switch (analysisStatus) {
    case 'Flood risk':
      final = surfaceRisk();
      break;
    case 'Flood hazard':
      final = surfaceHazard();
      break;
    case 'Flood exposure':
      final = floodExpo();
      break;
    case 'Flood vulnerability':
      final = floodVuln();
      break;
    case 'Population':
      final = popPredict();
      break;
    case 'GDP':
      final = gdpPredict();
      break;
    case 'HDI':
      final = hdiPredict();
      break;
  }
  if(aoiSelect.getValue() == 'Java'){
    final = final.updateMask(javaImage());
  }
  return final;
}
function aggrTestData(){
  var aggrFeature = aggrUnit();
  var data = selectedAnalysis();
  var aggrStatus = aggrSelect.getValue();
  var finalData;
  var reducing;
  var value;
  var analysisStatus = analysisSelect.getValue();
  if (analysisStatus == 'Population' || analysisStatus == 'GDP' || analysisStatus == 'Flood hazard'){
    reducing = ee.Reducer.sum();
    value = 'sum';
  } else {
    reducing = ee.Reducer.mean();
    value = 'mean';
  }
  if (aggrStatus !== 'Dasymetric'){
    data = analysisStatus == 'Flood hazard' ? data.multiply(ee.Image.pixelArea().divide(10000)) : data;
    finalData = data.reduceRegions({
      collection: aggrFeature,
      reducer: reducing,
      scale: 250,
    });
    Export.table.toCloudStorage({
      collection: finalData,
      bucket: 'gee-ramiqcom-bucket',
      fileNamePrefix: 'skripsi/' + mapTitle(),
      fileFormat: 'GeoJSON',
      description: mapTitle()
    });
  }
  var painted = ee.Image().byte().paint({
    featureCollection: finalData,
    color: value,
  });
  return painted;
}
// Legend tool
var legendTool = require('users/ramiqcom/ugm:tools/legend');
// Function to add border
function adminBorder(){
  var oldBorder = Map.layers().get(2);
  if (oldBorder !== undefined) {
    Map.remove(oldBorder);
  }
  var regency = adm1;
  var painted = ee.Image().byte().paint({
    featureCollection: regency,
    color: 1,
    width: 0.05
  });
  var palette = 'white';
  if(analysisSelect.getValue() == 'Flood hazard' || analysisSelect.getValue() == 'Flood risk'){
    palette = 'black';
  }
  Map.addLayer(painted, {palette: palette}, 'Border', true, 1);
}
function dataVis(){
  // Helper value
  var aggrSelectStatus = aggrSelect.getValue();
  var analysisStatus = analysisSelect.getValue();
  var vis;
   // Visualization condition
  if (analysisStatus == 'Flood hazard' && aggrSelectStatus == 'Dasymetric'){
    vis = {palette: ['red']};
  } else if (analysisStatus == 'Flood hazard' && aggrSelectStatus == 'Country') {
    vis = {palette: ['white', 'red'], min: 0, max: 100000};
  } else if (analysisStatus == 'Flood hazard' && aggrSelectStatus == 'Province') {
    vis = {palette: ['white', 'red'], min: 0, max: 10000};
  } else if (analysisStatus == 'Flood hazard' && aggrSelectStatus == 'City/regency') {
    vis = {palette: ['white', 'red'], min: 0, max: 1000};
  } else if (analysisStatus == 'Population' && aggrSelectStatus == 'Dasymetric') {
    vis = {palette: ['black', 'red', 'white'], min: 0, max: 1000};
  } else if (analysisStatus == 'Population' && aggrSelectStatus == 'Country') {
    vis = {palette: ['white', 'red'], min: 0, max: 500000000};
  } else if (analysisStatus == 'Population' && aggrSelectStatus == 'Province') {
    vis = {palette: ['white', 'red'], min: 0, max: 50000000};
  } else if (analysisStatus == 'Population' && aggrSelectStatus == 'City/regency') {
    vis = {palette: ['white', 'red'], min: 0, max: 5000000};
  } else if (analysisStatus == 'GDP' && aggrSelectStatus == 'Dasymetric') {
    vis = {palette: ['black', 'green', 'white'], min: 0, max: 1000};
  } else if (analysisStatus == 'GDP' && aggrSelectStatus == 'Country') {
    vis = {palette: ['white', 'green'], min: 0, max: 1000000000000};
  } else if (analysisStatus == 'GDP' && aggrSelectStatus == 'Province') {
    vis = {palette: ['white', 'green'], min: 0, max: 10000000000};
  } else if (analysisStatus == 'GDP' && aggrSelectStatus == 'City/regency') {
    vis = {palette: ['white', 'green'], min: 0, max: 100000000};
  } else if (analysisStatus == 'HDI') {
    vis = {palette: ['white', 'blue'], min: 0.5, max: 1};
  } else if (analysisStatus == 'Flood risk' && aggrSelectStatus == 'Dasymetric') {
    vis = {palette: ['green', 'yellow', 'red'], min: 0, max: 1};
  } else if (analysisStatus == 'Flood risk' && aggrSelectStatus !== 'Dasymetric') {
    vis = {palette: ['green', 'yellow', 'red'], min: 0, max: 0.01};
  } else if (analysisStatus == 'Flood vulnerability') {
    vis = {palette: ['green', 'yellow', 'red'], min: 0, max: 0.5};
  } else if (aggrSelectStatus !== 'Dasymetric'){
    vis = {palette: ['green', 'yellow', 'red'], min: 0, max: 0.5};
  } else {
    vis = {palette: ['green', 'yellow', 'red'], min: 0, max: 1};
  }
  return vis;
}
// Legend function
function legendPanel(){
  // Helper value
  var aggrSelectStatus = aggrSelect.getValue();
  var analysisStatus = analysisSelect.getValue();
  var title = mapTitle();
  var vis = dataVis();
  var legend;
  if (analysisStatus == 'Flood hazard' && aggrSelectStatus == 'Dasymetric'){
    legend = legendTool.legendDiscrete(title, ['Flooded'], ['red'], 1, 'bottom-left');
  } else {
    legend = legendTool.legendGradient(title, vis, 'bottom-left');
  }
  return legend;
}
// Map title function
function mapTitle(){
  // Map title
  var analysis = analysisSelect.getValue();
  var date = new Date(yearSlider.getValue()[0]);
  var year = date.getFullYear();
  var month = date.getMonth();
  var numb = date.getDate();
  var title = analysis + ' ' + year + '-' + month + '-' + numb;
  title = analysis == 'Flood hazard' ? title + ' (Ha)' : title;
  return title;
}
// Function to select either dasymetric or aggregated daate
function dataType(){
  // Helper value
  var aggrSelectStatus = aggrSelect.getValue();
  var analysisStatus = analysisSelect.getValue();
  var data;
  if (aggrSelectStatus !== 'Dasymetric'){
    data = aggrTestData();
  } else {
    data = selectedAnalysis();
  }
  if (aggrSelectStatus == 'Dasymetric' && (analysisStatus == 'Flood risk' || analysisStatus == 'Flood hazard')){
    data = data.selfMask();
  }
  return data;
}
// Function to visualize result
function showData(){
  // Reset map
  resetMap();
  // Final data to add to map
  var data = dataType();
  // Map visualization parameter
  var vis = dataVis();
  // Map title
  var title = mapTitle();
  // Add data to map
  Map.addLayer(data, vis, title);
  // Add inspector layout
  infoLayout(' ', ' ', ' ');
  // Legend workflow
  var legend = legendPanel();
  // Add legend to map
  Map.add(legend);
  // Add admin border to map
  adminBorder();
  // Download button
  download();
  /*
  Export.image.toCloudStorage({
    image: data,
    scale: 250,
    bucket: 'gee-ramiqcom-bucket',
    fileNamePrefix: 'skripsi/' + title,
    crs: 'EPSG:4326',
    maxPixels: 1e13,
    formatOptions: {
      cloudOptimized: true
    },
    description: title,
    region: aoi().bounds()
  });
  */
}
// Info layout
function infoLayout(a, b, c){
  // Panel for the number
  var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {maxWidth: '400px', position: 'bottom-left'}
  });
  Map.add(infoPanel);
  // Panel for aoi select and and calculate statistic
  var statisticPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', true),
    style: {maxWidth: '400px', position: 'top-left'}
  });
  infoPanel.add(statisticPanel);
  // Aoi select for AOI choice
  var aoiSelectGeom = ui.Select({
    disabled: true,
    placeholder: ' ',
    onChange: function(value){
      if (value !== null) {
        calculateStatisticButton.setDisabled(false);
      } else {
        calculateStatisticButton.setDisabled(true);
      }
    }
  });
  // Calculate statistic button
  var calculateStatisticButton = ui.Button({
    label: 'Calculate!',
    disabled: true,
    onClick: function(){
      calculation();
    }
  });
  // Choice AOI for calculation
  var aoiSelectStatistic = ui.Select({
    items: ['AOI'],
    value: 'AOI',
    onChange: function(value){
      if (value !== 'AOI'){
        aoiSelectGeom.setDisabled(true);
        calculateStatisticButton.setDisabled(false);
      } else if (value == 'AOI' && aoiSelectGeom !== null) {
        aoiSelectGeom.setDisabled(false);
        calculateStatisticButton.setDisabled(false);
      } else if (value == 'AOI' && aoiSelectGeom === null) {
        aoiSelectGeom.setDisabled(false);
        calculateStatisticButton.setDisabled(true);
      }
    }
  });
  statisticPanel.add(aoiSelectStatistic);
  // Special value for aoi
  if (aoiSelect.getValue !== 'Global' || aoiSelect.getValue() !== 'Draw AOI') {
    aoiSelectStatistic.items().reset(['AOI', aoiSelect.getValue()]);
    aoiSelectStatistic.setValue(aoiSelect.getValue());
  } else {
    aoiSelectStatistic.setValue('AOI');
  }
  // Drawing tools function
  function draw(){
    // Drawing tools
    var drawingTools = Map.drawingTools();
    // Function when drawing tools change
    function change() {
      var layer = drawingTools.layers();
      var name = layer.getJsArray().map(function(obj){
        var objName = obj.getName();
        return objName;
      });
      aoiSelectGeom.items().reset(name);
    }
    change();
    // Applying change function to drawing tools
    drawingTools.onLayerAdd(change);
    drawingTools.onLayerRemove(change);
  }
  draw();
  // Function to return draw aoi as geometry
  function drawGeometry(){
    var geomName = aoiSelectGeom.getValue();
    var layer = ee.FeatureCollection(Map.drawingTools().layers().getJsArray().map(function(obj){
      var name = obj.getName();
      return ee.Feature(obj.getEeObject()).set({'name': name});
    }));
    var geom = layer.filter(ee.Filter.eq('name', geomName)).first().geometry();
    return geom;
  }
  // Add geom to panel
  statisticPanel.add(aoiSelectGeom);
  // Add calculate button to map
  statisticPanel.add(calculateStatisticButton);
  // Table
  var tableChart = ui.Chart({
    chartType: 'Table',
    downloadable: true
  });
  infoPanel.add(tableChart);
  // Variable calculation function
  function calculation(){
    // AOI Select
    var area;
    var aoiSelect = aoiSelectStatistic.getValue();
    if (aoiSelect == 'AOI'){
      area = drawGeometry();
    } else {
      area = aoi();
    }
    var floodedArea = surfaceHazard().unmask();
    var floodedAreaSize = ee.Number(floodedArea.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: area,
      scale: 250,
      bestEffort: true
    }).get('Flooded')).multiply(62500).divide(10000).round();
    var popRaster = popPredict();
    var popAffected = popRaster.updateMask(floodedArea.eq(1));
    var popAffectedNumber = ee.Number(popAffected.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: area,
      scale: 250,
      bestEffort: true
    }).get('Population')).round();
    var gdpRaster = gdpPredict();
    var gdpAffected = gdpRaster.updateMask(floodedArea.eq(1));
    var gdpAffectedNumber = ee.Number(gdpAffected.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: area,
      scale: 250,
      bestEffort: true
    }).get('GDP')).divide(1000).round();
    var value = ee.Dictionary({
      floodedAreaSize: floodedAreaSize,
      popAffectedNumber: popAffectedNumber,
      gdpAffectedNumber: gdpAffectedNumber
    });
    value.evaluate(function(obj){
      tableChart.setDataTable(
        [ ['Variable', 'Value', 'Unit'], 
          ['Area Flooded', obj.floodedAreaSize, 'Hectares'],
          ['GDP Affected', obj.gdpAffectedNumber, 'Thousand USD'],
          ['Population Affected', obj.popAffectedNumber, 'People'],
        ]
      );
    });
  }
  // Add column to table
  tableChart.setDataTable(
    [ ['Variable', 'Value', 'Unit'], 
      ['Area Flooded', a, 'Hectares'],
      ['GDP Affected', b, 'Thousand USD'],
      ['Population Affected', c, 'People'],
    ]
  );
  // Add table style
  tableChart.style().set({height: '100px', width: '300px'});
}
// Function to download file
function download() {
  var downloadPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', true),
    style: {maxWidth: '350px', position: 'bottom-right'}
  });
  Map.add(downloadPanel);
  var downloadButton = ui.Button({
    label: 'Generate download link',
    onClick: function(){
      var aggrStatus = aggrSelect.getValue();
      if (aggrStatus == 'Dasymetric'){
        downloadRaster();
      } else {
        aggrDownload();
      }
    }
  });
  downloadPanel.add(downloadButton);
  var downloadLinkLabel = ui.Label({
    value: 'Download image',
    style: {padding: '5px 0px'}
  });
  downloadPanel.add(downloadLinkLabel);
  var sampleShowButton = ui.Button({
    label: 'Generate stratified sampling',
    disabled: analysisSelect.getValue() == 'Flood hazard' ? false : true,
    onClick: function() {
      sampling();
    }
  });
  downloadPanel.add(sampleShowButton);
  var sampleDownloadLink = ui.Label({
    value: 'Download sample',
    style: {padding: '5px 0px'}
  });
  downloadPanel.add(sampleDownloadLink);
  // Function to generate stratified sample
  function sampling() {
    sampleDownloadLink.setValue('Link is being generated');
    var image = Map.layers().get(0).getEeObject().toByte();
    var bands = image.bandNames();
    var sample = image.stratifiedSample({
      numPoints: 100, 
      region: aoi(), 
      scale: 250, 
      geometries: true
    });
    Map.addLayer(sample);
    var buffer = sample.geometry().buffer(1000);
    var random = ee.FeatureCollection.randomPoints(buffer, 100)
      .map(function(feat){return feat.set('Flooded', 0)});
    sample = sample.merge(random);
    sample.getDownloadURL({
      format: 'SHP',
      filename: 'Sample',
      callback: function(url){
        sampleDownloadLink.setUrl(url);
      }
    });
  }
  // Function to download raster
  function downloadRaster() {
    downloadLinkLabel.setValue('Link is being generated');
    var image = Map.layers().get(0);
    var object = image.getEeObject();
    var title = image.getName();
    var band = image.getVisParams().bands;
    var geometry = aoi();
    if (aoiSelect.getValue() == 'Global'){
      geometry = boundsGeom();
    }
    var url = object.getDownloadURL({
      params: {name: title, bands: band, scale: 250, format: 'GEO_TIFF', region: geometry},
      callback: function(link){
        if (link === null) {
        downloadLinkLabel.setValue('Image size too big!');
        downloadLinkLabel.style().set({color: 'red'});
        } else {
          downloadLinkLabel.setValue('Link ready');
          downloadLinkLabel.style().set({color: 'blue'});
        }
          downloadLinkLabel.setUrl(link);
        }
    });
  }
  // Function for aggregation download
  function aggrDownload() {
    downloadLinkLabel.setValue('Link is being generated');
    var image = Map.layers().get(0);
    var object = image.getEeObject();
    var title = image.getName();
    var band = image.getVisParams().bands;
    var country = adm0;
    var province = adm1;
    var city = adm2;
    var aggrStatus = aggrSelect.getValue();
    var aggrRisk;
    var selector;
    switch (aggrStatus) {
      case 'Country':
        aggrRisk = country;
        break;
      case 'Province':
        aggrRisk = province;
        break;
      case 'City/regency':
        aggrRisk = city;
        break;
    }
    var geometry = aoi();
    if (aoiSelect.getValue() == 'Global'){
      geometry = boundsGeom();
    }
    var reduce = object.reduceRegions({
        collection: aggrRisk.filterBounds(geometry),
        reducer: ee.Reducer.first(),
        scale: 250,
      });
    var url = reduce.getDownloadURL({
      format: 'geojson',
      filename: title,
      callback: function(link){
        if (link === null) {
        downloadLinkLabel.setValue('Feature size too big!');
        downloadLinkLabel.style().set({color: 'red'});
        } else {
          downloadLinkLabel.setValue('Link ready');
          downloadLinkLabel.style().set({color: 'blue'});
        }
          downloadLinkLabel.setUrl(link);
        }
    });
  }
}