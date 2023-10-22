var countryList = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// FAO EcoCrop parameters
var cropList = {
  Barley: [500,1000,15,20], Cassava: [1000,1500,20,29], Chickpea: [600,1000,15,29],
  CommonBean: [500,2000,16,25], Cowpea: [500,1500,20,35], GreenPea: [800,1200,10,24],
  Groundnut: [600,1500,22,32], Lentil: [600,1000,15,29], Maize: [600,1200,18,33],
  Millet: [500,750,20,32], Pigeonpea: [600,1500,18,38], Potato: [500,800,15,25],
  Quinoa: [500,1000,14,18], RicePaddy: [1500,2000,20,30], Sorghum: [500,1000,27,35],
  Soybean: [600,1500,20,33], Sugarcane: [1500,2000,24,37], Sunflower: [600,1000,17,34],
  SweetPotato: [750,2000,18,28], Tobacco: [500,750,15,30], Wheat: [750,900,15,23],
};
var map = ui.Map();
// Basemap design
var basemap = {
  'Dark': [
    {
      featureType: 'water',
      stylers: [
        { color: '#404040' }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        { color: '#e8e8e8' }
      ]
    }
  ]
};
// +++++ Center map to globe and set display options
map.setCenter(30, 20, 3).setOptions('Dark',basemap).style().set('cursor', 'crosshair');
map.setControlVisibility(null, true, true, true, true, true);
// +++++ Load temperature and precipitation image collections
var precip = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD').select('precipitation');
var temp = ee.ImageCollection('MODIS/006/MOD11A2').select(['LST_Day_1km','LST_Night_1km']);
var ndvi = ee.ImageCollection('MODIS/006/MOD13Q1').select(['NDVI']);
var chirpsDataStart = ee.Date(precip.first().get('system:time_start')).format('yyyy-MM-dd').getInfo();
var chirpsDataEnd = ee.Date(precip.sort('system:time_start',false).first().get('system:time_start')).format('yyyy-MM-dd').getInfo();
var tempDataStart = ee.Date(temp.first().get('system:time_start')).format('yyyy-MM-dd').getInfo();
var tempDataEnd = ee.Date(temp.sort('system:time_start',false).first().get('system:time_start')).format('yyyy-MM-dd').getInfo();
var ndviDataStart = ee.Date(ndvi.first().get('system:time_start')).format('yyyy-MM-dd').getInfo();
var ndviDataEnd = ee.Date(ndvi.sort('system:time_start',false).first().get('system:time_start')).format('yyyy-MM-dd').getInfo();
var cStart = Date.parse(chirpsDataStart);
var cEnd = Date.parse(chirpsDataEnd);
var tStart = Date.parse(tempDataStart);
var tEnd = Date.parse(tempDataEnd);
var nStart = Date.parse(ndviDataStart);
var nEnd = Date.parse(ndviDataEnd);
var availStart = ee.Date(ee.Number(cStart).max(ee.Number(tStart)).max(ee.Number(nStart))).format('yyyy-MM-dd');
var availEnd = ee.Date(ee.Number(cEnd).min(ee.Number(tEnd)).min(ee.Number(nEnd))).format('yyyy-MM-dd');
// +++++ Load water and agriculture masks
var waterMask = ee.Image('UMD/hansen/global_forest_change_2015').select('datamask').eq(1);
var agModis = ee.ImageCollection('MODIS/006/MCD12Q1').select('LC_Type1').mode()
                  .remap([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                         [0,0,0,0,0,0,0,0,0, 0, 0, 1, 0, 1, 0, 0, 0]);
/*
var agModis051 = ee.ImageCollection('MODIS/051/MCD12Q1').select('Land_Cover_Type_1').mode()
                  .remap([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                         [0,0,0,0,0,0,0,0,0, 0, 0, 1, 0, 1, 0, 0, 0]);
*/
var agGC = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3').select('landcover')
                    .remap([11,14,20,30,40,50,60,70,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230],
                           [ 1, 1, 1, 1, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]);
var cropland = ee.Image('USGS/GFSAD1000_V1').neq(0);
var agMask = agModis/*.add(agModis051)*/.add(agGC).add(cropland).gt(0).eq(1);
// +++++ Load soils and elevation data
var bulkDensity = ee.Image("OpenLandMap/SOL/SOL_BULKDENS-FINEEARTH_USDA-4A1H_M/v02");
var organicCarbon = ee.Image("OpenLandMap/SOL/SOL_ORGANIC-CARBON_USDA-6A1C_M/v02");
var ph = ee.Image("OpenLandMap/SOL/SOL_PH-H2O_USDA-4C1A2A_M/v02");
var soilWater = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01");
var sand = ee.Image("OpenLandMap/SOL/SOL_SAND-WFRACTION_USDA-3A1A1A_M/v02");
var clay = ee.Image("OpenLandMap/SOL/SOL_CLAY-WFRACTION_USDA-3A1A1A_M/v02");
var biome = ee.Image("OpenLandMap/PNV/PNV_BIOME-TYPE_BIOME00K_C/v01");
var taxonomy = ee.Image("OpenLandMap/SOL/SOL_GRTGROUP_USDA-SOILTAX_C/v01");
var elevation = ee.Image("USGS/SRTMGL1_003");
var slope = ee.Terrain.slope(elevation);
var bulkDensityMean = bulkDensity.select('b0').add(bulkDensity.select('b10'))
                   .add(bulkDensity.select('b30'))
                   .divide(3).divide(100).rename('bulk_density');
var organicCarbonMean = organicCarbon.select('b0').add(organicCarbon.select('b10'))
                   .add(organicCarbon.select('b30'))
                   .divide(3).multiply(5).rename('organic_carbon');
var phMean = ph.select('b0').add(ph.select('b10'))
                   .add(ph.select('b30'))
                   .divide(3).divide(10).rename('ph_in_h2o');
var soilWaterMean = soilWater.select('b0').add(soilWater.select('b10'))
                   .add(soilWater.select('b30'))
                   .divide(3).rename('soil_water');
var sandMean = sand.select('b0').add(sand.select('b10'))
                   .add(sand.select('b30'))
                   .divide(3).rename('sand_percent');
var clayMean = clay.select('b0').add(clay.select('b10'))
                   .add(clay.select('b30'))
                   .divide(3).rename('clay_percent');
var siltMean = ee.Image(100).subtract(sandMean).subtract(clayMean).rename('silt_percent');
// +++++ Function to locate fundamental climate niche using input parameters
var fundamentalNiche = function(){
  app.rootPanels.panelOne.clear();
  // Get input parameters
  var countrySelected = app.country.countrySelect.getValue();
  var cropSelected = app.ecocrop.cropSelect.getValue();
  var region = countryList.filterMetadata('country_na', 'equals', countrySelected);
  var startRange = app.dateRange.startBoxDate.getValue();
  var endRange = app.dateRange.endBoxDate.getValue();
  var startSeason = app.seasonRange.startBoxSeason.getValue();
  var endSeason = app.seasonRange.endBoxSeason.getValue();
  var precipMin = ee.List(cropList[cropSelected]).get(0).getInfo();
  var precipMax = ee.List(cropList[cropSelected]).get(1).getInfo();
  var tempMin = ee.List(cropList[cropSelected]).get(2).getInfo();
  var tempMax = ee.List(cropList[cropSelected]).get(3).getInfo();
  // Date range and season duration modifications
  var splitterStart = ee.List(startSeason.split('-',2));
  var splitterEnd = ee.List(endSeason.split('-',2));
  var startYear = ee.Number.parse(startRange).toInt();
  var startMonth = ee.Number.parse(splitterStart.get(0)).getInfo();
  var startDay = ee.Number.parse(splitterStart.get(1)).getInfo();
  var endYear = ee.Number.parse(endRange).toInt();
  var endMonth = ee.Number.parse(splitterEnd.get(0)).getInfo();
  var endDay = ee.Number.parse(splitterEnd.get(1)).getInfo();
  var startDate = startRange+'-'+startSeason;
  var endDate = endRange+'-'+endSeason;
  var years = ee.List.sequence(startYear,endYear);
  // Modifier to account for seasons cross over years
  var mod = ee.Algorithms.If(endMonth-startMonth<0,1,0);
  if (app.checkboxCrop.checkTestCrop.getValue() === false) {
    precipMin = ee.Number.parse(app.precipitation.minBoxPrecip.getValue()).getInfo(),
    precipMax = ee.Number.parse(app.precipitation.maxBoxPrecip.getValue()).getInfo(),
    tempMin = ee.Number.parse(app.temperature.minBoxTemp.getValue()).getInfo(),
    tempMax = ee.Number.parse(app.temperature.maxBoxTemp.getValue()).getInfo();
  }
  if (isNaN(Date.parse(startDate)) === false & isNaN(Date.parse(endDate)) === false) {
    var startParse = ee.Date(Date.parse(startDate)).format('yyyy-MM-dd');
    var endParse = ee.Date(Date.parse(endDate)).format('yyyy-MM-dd');
    var endDateTest = ee.Date(endParse).advance(mod,'year');
    if (ee.Date(startDate).difference(availStart,'seconds').getInfo() > 0 & endDateTest.difference(availEnd,'seconds').getInfo() < 0
          & ee.String(startDate).compareTo(startParse).getInfo() === 0 & ee.String(endDate).compareTo(endParse).getInfo() === 0
          & startYear <= endYear & precipMin < precipMax & tempMin < tempMax) {
      if (map.widgets().length() > 0) {
        map.remove(map.widgets().get(0));
      }
      ui.root.remove(app.rootPanels.panelOne);
      ui.root.insert(1,app.rootPanels.panelOne);
      app.rootPanels.panelOne.widgets().set(0,ui.Label({value: 'Select a layer from the dropdown below and scroll down to view all results.', style: {fontSize: '12px', margin: '10px 30px 0 30px'}}));
      app.rootPanels.panelOne.widgets().set(1,ui.Panel());
      app.rootPanels.panelOne.widgets().set(2,ui.Label({value: 'Click map to query pixel climate and land data', style: {fontWeight: '300', fontSize: '12px', color: 'red', margin: '10px 5px 5px 30px'}}));
      for (var i = 3; i < 19; i++) {
        app.rootPanels.panelOne.widgets().set(i,ui.Panel());
      }
      app.rootPanels.panelOne.widgets().set(18,ui.Label({value: 'Region time-series', style: {fontWeight: '500', fontSize: '13px', margin: '10px 5px 1px 30px'}}));
      app.rootPanels.panelOne.widgets().set(19,ui.Label({value: '', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
      app.rootPanels.panelOne.widgets().set(20,ui.Label({value: '', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
      app.rootPanels.panelOne.widgets().set(21,ui.Label({value: '', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
      app.rootPanels.panelOne.widgets().set(22,ui.Label({value: 'Selected parameters', style: {fontWeight: '500', fontSize: '13px', margin: '10px 5px 1px 30px'}}));
      app.rootPanels.panelOne.widgets().set(23,ui.Label({value: 'Rainfall range: '+precipMin+'–'+precipMax+' mm', style: {fontWeight: '200', fontSize: '13px', margin: '10px 5px 1px 30px'}}));
      app.rootPanels.panelOne.widgets().set(24,ui.Label({value: 'Temperature range: '+tempMin+'–'+tempMax+'°C', style: {fontWeight: '200', fontSize: '13px', margin: '10px 5px 1px 30px'}}));
      app.rootPanels.panelOne.widgets().set(25,ui.Label({value: 'Date range: '+startDate+' to '+endDateTest.format('yyyy-MM-dd').getInfo(), style: {fontWeight: '200', fontSize: '13px', margin: '10px 5px 1px 30px'}}));
      app.rootPanels.panelOne.widgets().set(26,ui.Label({value: 'Each season used for data aggregation:', style: {fontWeight: '200', fontSize: '13px', margin: '10px 5px 1px 30px'}}));
      // Set classification thresholds (based on optimal range)
      var precipExtrapolate = (precipMax-precipMin)/4;
      var tempExtrapolate = (tempMax-tempMin)/4;
      var global = ee.Geometry.Polygon([-180, 50, 0, 50, 180, 50, 180, -50, 0, -50, -180, -50], null, false);
      if (app.checkbox.checkTest.getValue() === true) {
        region = global;
      }
      if (app.customCheckbox.customCheck.getValue() === true) {
        var latCoord = ee.Number.parse(app.boundCoords.yBox.getValue()).getInfo();
        var lonCoord = ee.Number.parse(app.boundCoords.xBox.getValue()).getInfo();
        var distBuffer = ee.Number.parse(app.boundCoords.distBox.getValue()).getInfo();
        var distNum = distBuffer*1000;
        region = ee.Geometry.Point([lonCoord,latCoord]).buffer(distNum).bounds();
      }
      map.clear().setCenter(30, 20, 3).setOptions('Dark',basemap);
      map.setControlVisibility(null, false, true, true, true, true);
      // Calculates total seasonal precipitation per selected season duration over the years selected
      var precipBySeason = ee.ImageCollection.fromImages(
        years.map(function (y) {
          var dateRangeStart = ee.Date.fromYMD(ee.Number(y).toInt(), startMonth, startDay);
          var dateRangeEnd = ee.Date.fromYMD(ee.Number(y).toInt().add(mod), endMonth, endDay);
          return precip.filterDate(dateRangeStart, dateRangeEnd)
                              .select(0).sum().clip(global).clip(region)
                              // Mask out water body LULC
                              .updateMask(waterMask)
                              .set('system:index',ee.String(ee.Number(y).toInt()))
                              .set('start_date', dateRangeStart.format('yyyy-MM-dd')).set('end_date', dateRangeEnd.format('yyyy-MM-dd'))
                              .rename('rainfall');
      }));
      var precipBySeasonList = precipBySeason.toList(precipBySeason.size());
      var seasonLength = precipBySeason.size().getInfo();
      for (var s = 0; s < seasonLength; s++) {
        var season = ee.Image(precipBySeasonList.get(s));
        var seasonStart = season.get('start_date').getInfo();
        var seasonEnd = season.get('end_date').getInfo();
        if (s !== seasonLength-1) {
          app.rootPanels.panelOne.widgets().set(27+s,ui.Label({value: seasonStart+' to '+seasonEnd, style: {fontWeight: '200', fontSize: '13px', margin: '5px 5px 1px 30px'}}));
        } else {
            app.rootPanels.panelOne.widgets().set(27+s,ui.Label({value: seasonStart+' to '+seasonEnd, style: {fontWeight: '200', fontSize: '13px', margin: '5px 5px 1px 30px'}}));
            app.rootPanels.panelOne.widgets().set(28+s,ui.Label({value: ' ', style: {fontWeight: '200', fontSize: '13px', margin: '7px 7px 1px 30px'}}));
        }
      }
      var precipBySeasonMean = precipBySeason.mean().rename('precip_mean');
      // Create suitability categories (unsuitable, suboptimal, suitable, optimal, supraoptimal)
      var precipSuitability = precipBySeasonMean.gt(precipMin-(precipExtrapolate*2))
                                                .add(precipBySeasonMean.gt(precipMin-precipExtrapolate))
                                                .add(precipBySeasonMean.gt(precipMin))
                                                .add(precipBySeasonMean.gt(precipMin+precipExtrapolate))
                                                .add(precipBySeasonMean.gt(precipMax-precipExtrapolate))
                                                .add(precipBySeasonMean.gt(precipMax))
                                                .add(precipBySeasonMean.gt(precipMax+precipExtrapolate))
                                                .add(precipBySeasonMean.gt(precipMax+(precipExtrapolate*2)))
                                                    .remap([0,1,2,3,4,5,6,7,8],[1,2,3,4,5,4,3,2,1])
                                                    .rename('precip_cat');
      // Calculates average NDVI per selected season duration over the years selected     
      var ndviBySeason = ee.ImageCollection.fromImages(
        years.map(function (y) {
          var dateRangeStart = ee.Date.fromYMD(ee.Number(y).toInt(), startMonth, startDay);
          var dateRangeEnd = ee.Date.fromYMD(ee.Number(y).toInt().add(mod), endMonth,endDay);
          return ndvi.filterDate(dateRangeStart, dateRangeEnd)
                             .select(0).mean().clip(global).clip(region)
                             // Mask out water body LULC
                             .updateMask(waterMask)
                             .multiply(0.0001)
                             .set('system:index',ee.String(ee.Number(y).toInt()))
                             .set('start_date', dateRangeStart.format('yyyy-MM-dd')).set('end_date', dateRangeEnd.format('yyyy-MM-dd'))
                             .rename('NDVI');
      }));
      var ndviBySeasonMean = ndviBySeason.mean().rename('ndvi_mean');
      // Calculates average seasonal temperature per selected season duration over the years selected     
      var tempBySeason = ee.ImageCollection.fromImages(
        years.map(function (y) {
          var dateRangeStart = ee.Date.fromYMD(ee.Number(y).toInt(), startMonth, startDay);
          var dateRangeEnd = ee.Date.fromYMD(ee.Number(y).toInt().add(mod), endMonth,endDay);
          return temp.filterDate(dateRangeStart, dateRangeEnd)
                             .select([0,1]).mean().clip(global).clip(region)
                             // Mask out water body LULC
                             .updateMask(waterMask)
                             .multiply(0.02).subtract(273.15)
                             .set('system:index',ee.String(ee.Number(y).toInt()))
                             .set('start_date', dateRangeStart.format('yyyy-MM-dd')).set('end_date', dateRangeEnd.format('yyyy-MM-dd'))
                             .rename(['temp_day','temp_night']);
      }));
      // Function to create a mean temperature band using the day/night temperatures
      var tempMean = function(image) {
        var mean = image.select('temp_day').add(image.select('temp_night')).divide(2).rename('temperature');
        return image.addBands(mean);
      };
      var tempMeanCalc = tempBySeason.map(tempMean),
          tempBySeasonMeanBand = tempMeanCalc.select('temperature');
      var tempBySeasonMean = tempBySeasonMeanBand.mean().rename('temperature');
      // Create suitability categories (unsuitable, suboptimal, suitable, optimal, supraoptimal)
      var tempSuitability = tempBySeasonMean.gt(tempMin-(tempExtrapolate*2))
                                            .add(tempBySeasonMean.gt(tempMin-tempExtrapolate))
                                            .add(tempBySeasonMean.gt(tempMin))
                                            .add(tempBySeasonMean.gt(tempMin+tempExtrapolate))
                                            .add(tempBySeasonMean.gt(tempMax-tempExtrapolate))
                                            .add(tempBySeasonMean.gt(tempMax))
                                            .add(tempBySeasonMean.gt(tempMax+tempExtrapolate))
                                            .add(tempBySeasonMean.gt(tempMax+(tempExtrapolate*2)))
                                                .remap([0,1,2,3,4,5,6,7,8],[1,2,3,4,5,4,3,2,1])
                                                .rename('temp_cat');
      // Combined suitability 
      var combinedMin = precipSuitability.min(tempSuitability).rename('comb_cat_min');
      var precipRange = precipBySeasonMean.reduceRegion({
          reducer: ee.Reducer.percentile([0,25,50,75,100]),
          geometry: region,
          scale: 10000,
          maxPixels: 1e9
      });
      var tempRange = tempBySeasonMean.reduceRegion({
          reducer: ee.Reducer.percentile([0,25,50,75,100]),
          geometry: region,
          scale: 10000,
          maxPixels: 1e9
      });
      var ndviRange = ndviBySeasonMean.reduceRegion({
          reducer: ee.Reducer.percentile([0,25,50,75,100]),
          geometry: region,
          scale: 10000,
          maxPixels: 1e9
      });
      var pMin = precipRange.values().get(0).getInfo();
      var pMax = precipRange.values().get(1).getInfo();
      var pQ1 = precipRange.values().get(2).getInfo();
      var pQ2 = precipRange.values().get(3).getInfo();
      var pQ3 = precipRange.values().get(4).getInfo();
      var tMin = tempRange.values().get(0).getInfo();
      var tMax = tempRange.values().get(1).getInfo();
      var tQ1 = tempRange.values().get(2).getInfo();
      var tQ2 = tempRange.values().get(3).getInfo();
      var tQ3 = tempRange.values().get(4).getInfo();
      var nMin = ndviRange.values().get(0).getInfo();
      var nMax = ndviRange.values().get(1).getInfo();
      var nQ1 = ndviRange.values().get(2).getInfo();
      var nQ2 = ndviRange.values().get(3).getInfo();
      var nQ3 = ndviRange.values().get(4).getInfo();
      var p1 = {};
      var pkey1 = pMin.toFixed(0)+'–'+pQ1.toFixed(0)+' mm';
      p1[pkey1] = 'ffffcc';
      var p2 = {};
      var pkey2 = pQ1.toFixed(0)+'–'+pQ2.toFixed(0)+' mm';
      p2[pkey2] = 'a1dab4';      
      var p3 = {};
      var pkey3 = pQ2.toFixed(0)+'–'+pQ3.toFixed(0)+' mm';
      p3[pkey3] = '41b6c4';      
      var p4 = {};
      var pkey4 = pQ3.toFixed(0)+'–'+pMax.toFixed(0)+' mm';
      p4[pkey4] = '225ea8';
      var t1 = {};
      var tkey1 = tMin.toFixed(1)+'–'+tQ1.toFixed(1)+'°C';
      t1[tkey1] = 'ffffb2';
      var t2 = {};
      var tkey2 = tQ1.toFixed(1)+'–'+tQ2.toFixed(1)+'°C';
      t2[tkey2] = 'fecc5c';      
      var t3 = {};
      var tkey3 = tQ2.toFixed(1)+'–'+tQ3.toFixed(1)+'°C';
      t3[tkey3] = 'fd8d3c';      
      var t4 = {};
      var tkey4 = tQ3.toFixed(1)+'–'+tMax.toFixed(1)+'°C';
      t4[tkey4] = 'e31a1c';
      var n1 = {};
      var nkey1 = nMin.toFixed(2)+'–'+nQ1.toFixed(2);
      n1[nkey1] = 'ffffcc';
      var n2 = {};
      var nkey2 = nQ1.toFixed(2)+'–'+nQ2.toFixed(2);
      n2[nkey2] = 'c2e699';      
      var n3 = {};
      var nkey3 = nQ2.toFixed(2)+'–'+nQ3.toFixed(2);
      n3[nkey3] = '78c679';      
      var n4 = {};
      var nkey4 = nQ3.toFixed(2)+'–'+nMax.toFixed(2);
      n4[nkey4] = '238443';
      var latitudes = ee.FeatureCollection([
        ee.Geometry.LineString([[-180,50],[180,50]], null, false), 
        ee.Geometry.LineString([[-180,-50],[180,-50]], null, false)
      ]);
      var outline = ee.Image().byte().paint({
        featureCollection: latitudes,
        width: 2
      });
      map.addLayer(outline, {palette: '404040'}, 'Latitudinal data range (50°N–50°S)', true);
      var layerProperties = {
      'Combined suitability masked to agriculture': {
        layer: combinedMin.updateMask(agMask),
        visParams: {palette: ['ef4606','ffa808','1ee5e0','1e99f1','b525ff']},
        legend: [
          {'Optimal': 'b525ff'}, {'Suitable': '1e99f1'}, {'Marginal': '1ee5e0'},
          {'Unsuitable': 'ffa808'}, {'Pessimal': 'ef4606'}
        ],
        defaultVisibility: false
      },
      'Combined suitability': {
        layer: combinedMin,
        visParams: {palette: ['ef4606','ffa808','1ee5e0','1e99f1','b525ff']},
        legend: [
          {'Optimal': 'b525ff'}, {'Suitable': '1e99f1'}, {'Marginal': '1ee5e0'},
          {'Unsuitable': 'ffa808'}, {'Pessimal': 'ef4606'}
        ],
        defaultVisibility: true
      },
      'Temperature suitability': {
        layer: tempSuitability,
        visParams: {palette: ['ef4606','ffa808','1ee5e0','1e99f1','b525ff']},
        legend: [
          {'Optimal': 'b525ff'}, {'Suitable': '1e99f1'}, {'Marginal': '1ee5e0'},
          {'Unsuitable': 'ffa808'}, {'Pessimal': 'ef4606'}
        ],
        defaultVisibility: false
      },
      'Rainfall suitability': {
        layer: precipSuitability,
        visParams: {palette: ['ef4606','ffa808','1ee5e0','1e99f1','b525ff']},
        legend: [
          {'Optimal': 'b525ff'}, {'Suitable': '1e99f1'}, {'Marginal': '1ee5e0'},
          {'Unsuitable': 'ffa808'}, {'Pessimal': 'ef4606'}
        ],
        defaultVisibility: false
      },
      'Combined suitability binary': {
        layer: combinedMin.gt(3),
        visParams: {palette: ['ffec00','04e0f7']},
        legend: [
          {'Suitable': '04e0f7'}, {'Not suitable': 'ffec00'}
        ],
        defaultVisibility: false
      },
      'Temperature suitability binary': {
        layer: tempSuitability.gt(3),
        visParams: {palette: ['ffec00','04e0f7']},
        legend: [
          {'Suitable': '04e0f7'}, {'Not suitable': 'ffec00'}
        ],
        defaultVisibility: false
      },
      'Rainfall suitability binary': {
        layer: precipSuitability.gt(3),
        visParams: {palette: ['ffec00','04e0f7']},
        legend: [
          {'Suitable': '04e0f7'}, {'Not suitable': 'ffec00'}
        ],
        defaultVisibility: false
      },
      'Average temperature (°C)': {
        layer: tempBySeasonMean.gt(tQ1).add(tempBySeasonMean.gt(tQ2)).add(tempBySeasonMean.gt(tQ3)),
        visParams: {palette: ['ffffb2', 'fecc5c', 'fd8d3c', 'e31a1c']},
        legend: [
          t1,t2,t3,t4
        ],
        defaultVisibility: false
      },
      'Average rainfall (mm)': {
        layer: precipBySeasonMean.gt(pQ1).add(precipBySeasonMean.gt(pQ2)).add(precipBySeasonMean.gt(pQ3)),
        visParams: {palette: ['ffffcc', 'a1dab4', '41b6c4', '225ea8']},
        legend: [
          p1,p2,p3,p4
        ],
        defaultVisibility: false
      },
      'Average NDVI': {
        layer: ndviBySeasonMean.gt(nQ1).add(ndviBySeasonMean.gt(nQ2)).add(ndviBySeasonMean.gt(nQ3)),
        visParams: {palette: ['ffffcc', 'c2e699', '78c679', '238443']},
        legend: [
          n1,n2,n3,n4
        ],
        defaultVisibility: false
      },
      'Max agriculture extent': {
        layer: agMask.clip(global).clip(region),
        visParams: {palette: ['ffec00','04e0f7']},
        legend: [
          {'Agriculture': '04e0f7'}, {'Non-agriculture': 'ffec00'}
        ],
        defaultVisibility: false
      }
      };
      var desc = '2009_2018_01102020_KENYA_';
      Export.image.toDrive({
        image: combinedMin.updateMask(agMask),
        description: desc,
        folder: 'GEE_export',
        fileNamePrefix: desc,
        scale: 1000,
        maxPixels: 1e13,
        region: region
      });
      for (var key in layerProperties) {
        var l = layerProperties[key];
        var p = l.layer.visualize(l.visParams);
        map.add(ui.Map.Layer(p, {}, key, l.defaultVisibility));
      }
      var selectItems = Object.keys(layerProperties);
      var layerSelect = ui.Select({
        items: selectItems,
        value: selectItems[1],
        style: {
          padding:'0',
          margin: '0'
        },
        onChange: function(selected) {
          map.layers().forEach(function(element, index) {
            element.setShown(selected == element.getName());
          });
          setLegend(layerProperties[selected].legend);
        }
      });
      var legendPanel = ui.Panel({style: {fontSize: '12px', margin: '10px 5px 1px 30px'}});
      app.rootPanels.panelOne.widgets().set(1,legendPanel);
      var keyPanel = ui.Panel();
      legendPanel.add(layerSelect).add(ui.Panel({style: {margin: '10px 5px 5px 30px'}})).add(keyPanel);
      var setLegend = function (legend) {
        keyPanel.clear();
        for (var i = 0; i < legend.length; i++) {
          var item = legend[i];
          var name = Object.keys(item)[0];
          var color = item[name];
          var colorBox = ui.Label('', {
            backgroundColor: color,
            padding: '8px',
            margin: '0'
          });
          var description = ui.Label(name, {margin: '0 0 4px 6px'});
          keyPanel.add(
              ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
        }
      };
      setLegend(layerProperties[layerSelect.getValue()].legend);
      if (app.checkbox.checkTest.getValue() === true) {
        map.setCenter(30, 0, 2);
      } else {
        map.centerObject(region);
      }
      if (app.customCheckbox.customCheck.getValue() === true) {
        var empty = ee.Image().byte();
        var regionVis = empty.paint({
            featureCollection: region,
            width: 1
        });  
        map.addLayer(regionVis, {palette: 'f7f7f7', width: 3, opacity: 0.5}, 'Region boundary', true);
      }
      // +++++ Create time-series charts
      var displayPrecip = {
        fontSize: 11,
        width: '250px',
        curveType: 'function',
        format: 'short',
        margin: '0 0 0 0',
        hAxis: {textStyle: {fontSize: 10}, gridlines: {color: 'transparent'}},
        vAxis: {textStyle: {fontSize: 10}, gridlines: {}},
        trendlines: {0: {color: '333333', lineWidth: 0.5, visibleInLegend: false}},
        series: {0: {lineDashStyle: [1,1], pointSize: 3, color: '2c7fb8'}}};
      var chartPrecip = ui.Chart.image.series(precipBySeason, region, ee.Reducer.mean(), 10000, 'start_date')
                .setOptions(displayPrecip);
      var displayTemp = {
        fontSize: 11,
        width: '250px',
        curveType: 'function',
        format: 'short',
        margin: '0 0 0 0',
        hAxis: {textStyle: {fontSize: 10}, gridlines: {color: 'transparent'}},
        vAxis: {textStyle: {fontSize: 10}, gridlines: {}},
        trendlines: {0: {color: '333333', lineWidth: 0.5, visibleInLegend: false}},
        series: {0: {lineDashStyle: [1,1], pointSize: 3, color: 'f03b20'}}};
      var chartTemp = ui.Chart.image.series(tempBySeasonMeanBand, region, ee.Reducer.mean(), 10000, 'start_date')
                .setOptions(displayTemp);
      var displayNDVI = {
        fontSize: 11,
        width: '250px',
        curveType: 'function',
        format: 'short',
        margin: '0 0 0 0',
        hAxis: {textStyle: {fontSize: 10}, gridlines: {color: 'transparent'}},
        vAxis: {textStyle: {fontSize: 10}, gridlines: {}},
        trendlines: {0: {color: '333333', lineWidth: 0.5, visibleInLegend: false}},
        series: {0: {lineDashStyle: [1,1], pointSize: 3, color: 'green'}}};
      var chartNDVI = ui.Chart.image.series(ndviBySeason, region, ee.Reducer.mean(), 10000, 'start_date')
                .setOptions(displayNDVI);
      // Time-series panel          
      var timeSeriesCharts = ui.Panel({
          style: {height: '440px', width: '250px', position: 'top-left', margin: '40px 0 0 -5px'}
      });
      app.rootPanels.panelOne.widgets().set(19,chartPrecip);
      app.rootPanels.panelOne.widgets().set(20,chartTemp);
      app.rootPanels.panelOne.widgets().set(21,chartNDVI);
      var areaOfInterest = 'time-series of '+countrySelected;
      if (app.checkbox.checkTest.getValue() === true) {
        areaOfInterest = 'global time-series';
      }
      if (app.customCheckbox.customCheck.getValue() === true) {
        areaOfInterest = 'region time-series';
      }
      map.style().set('cursor', 'crosshair');
      map.onClick(function(coords) {
        app.rootPanels.panelOne.widgets().set(2,ui.Label({value: 'Pixel time-series', style: {fontWeight: '500', fontSize: '13px', margin: '10px 0 0 30px'}}));
        app.rootPanels.panelOne.widgets().set(3,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(4,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(5,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(6,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 10px 30px'}}));
        app.rootPanels.panelOne.widgets().set(7,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(8,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 10px 30px'}}));
        app.rootPanels.panelOne.widgets().set(9,ui.Label({value: 'Pixel land characteristics', style: {fontWeight: '500', fontSize: '13px', margin: '10px 0 3px 30px'}}));
        app.rootPanels.panelOne.widgets().set(10,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(11,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(12,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));    
        app.rootPanels.panelOne.widgets().set(13,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(14,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(15,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
        app.rootPanels.panelOne.widgets().set(16,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));    
        app.rootPanels.panelOne.widgets().set(17,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 10px 30px'}}));
        var point = ee.Geometry.Point(coords.lon, coords.lat);
        var boundsTest = combinedMin.mask().rename('bounds').reduceRegion(ee.Reducer.mean(), point, 1),
            boundsTestVal = boundsTest.get('bounds').getInfo();
        var dot = ui.Map.Layer(point, {color: 'white'}, 'Inspector dot');
        if (app.customCheckbox.customCheck.getValue() === true) {
          map.layers().set(13,dot);
        } else {
            map.layers().set(12,dot);
        }
        if (boundsTestVal !== 0) {
          if (map.widgets().length() > 0) {
            map.remove(map.widgets().get(0));
          }
          var sampledPrecip = precipBySeasonMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedPrecip = sampledPrecip.get('precip_mean'),
              sampledTemp = tempBySeasonMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedTemp = sampledTemp.get('temperature'),
              sampledNDVI = ndviBySeasonMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedNDVI = sampledNDVI.get('ndvi_mean'),
              sampledCarbon = organicCarbonMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedCarbon = sampledCarbon.get('organic_carbon'),
              sampledBulkDensity = bulkDensityMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedBulkDensity = sampledBulkDensity.get('bulk_density'),
              sampledPh = phMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedPh = sampledPh.get('ph_in_h2o'),
              sampledSoilWater = soilWaterMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedSoilWater = sampledSoilWater.get('soil_water'),
              sampledSand = sandMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedSand = sampledSand.get('sand_percent'),
              sampledClay = clayMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedClay = sampledClay.get('clay_percent'),
              sampledSilt = siltMean.reduceRegion(ee.Reducer.mean(), point, 1),
              computedSilt = sampledSilt.get('silt_percent'),
              sampledTaxonomy = taxonomy.reduceRegion(ee.Reducer.mean(), point, 1),
              computedTaxonomy = sampledTaxonomy.get('grtgroup'),
              sampledBiome = biome.reduceRegion(ee.Reducer.mean(), point, 1),
              computedBiome = sampledBiome.get('biome_type'),
              sampledElevation = elevation.reduceRegion(ee.Reducer.mean(), point, 1),
              computedElevation = sampledElevation.get('elevation'),
              sampledSlope = slope.reduceRegion(ee.Reducer.mean(), point, 1),
              computedSlope = sampledSlope.get('slope');
          var clickChart = ui.Chart.image.series(precipBySeason, point, ee.Reducer.mean(), 10000, 'start_date')
                                   .setOptions(displayPrecip);
          var clickChartTwo = ui.Chart.image.series(tempBySeasonMeanBand, point, ee.Reducer.mean(), 10000, 'start_date')
                                      .setOptions(displayTemp);
          var clickChartThree = ui.Chart.image.series(ndviBySeason, point, ee.Reducer.mean(), 10000, 'start_date')
                                      .setOptions(displayNDVI);
          computedPrecip.evaluate(function(resultPrecip) {
            var inspectPrecip = ui.Label({
              value: '∑ rainfall: ' + resultPrecip.toFixed(0)+' mm',
              style: {fontWeight: '700', fontSize: '12px', color: '2c7fb8', margin: '0 0 0 30px'}
            });
            app.rootPanels.panelOne.widgets().set(3, clickChart);
            app.rootPanels.panelOne.widgets().set(4, inspectPrecip);
            computedTemp.evaluate(function(resultTemp) {
              var inspectTemp = ui.Label({
                value: ' μ temperature: ' + resultTemp.toFixed(1)+' °C',
                style: {fontWeight: '700', fontSize: '12px', color: 'f03b20', margin: '0 0 15px 30px'}
              });
              app.rootPanels.panelOne.widgets().set(5, clickChartTwo);
              app.rootPanels.panelOne.widgets().set(6, inspectTemp);
            });
            computedNDVI.evaluate(function(resultNDVI) {
              var inspectNDVI = ui.Label({
                value: ' μ NDVI: ' + resultNDVI.toFixed(2),
                style: {fontWeight: '700', fontSize: '12px', color: 'green', margin: '0 0 15px 30px'}
              });
              app.rootPanels.panelOne.widgets().set(7, clickChartThree);
              app.rootPanels.panelOne.widgets().set(8, inspectNDVI);
            });
            computedCarbon.evaluate(function(resultCarbon) {
              var inspectCarbon = ui.Label({
                value: 'Organic carbon: ' + resultCarbon.toFixed(1) +' g C/kg soil',
                style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '5px 0 10px 30px'}
              });
              app.rootPanels.panelOne.widgets().set(10, inspectCarbon);
            });
            computedBulkDensity.evaluate(function(resultBulkDensity) {
              var inspectBulkDensity = ui.Label({
                value: 'Bulk density: ' + resultBulkDensity.toFixed(1)+' g/cm\u00B3',
                style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 10px 30px'}
              });
              app.rootPanels.panelOne.widgets().set(11, inspectBulkDensity);
            });
            computedPh.evaluate(function(resultPh) {
              var inspectPh = ui.Label({
                value: 'pH in water: ' + resultPh.toFixed(1),
                style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 10px 30px'}
              });
              app.rootPanels.panelOne.widgets().set(12, inspectPh);
            }); 
            computedSoilWater.evaluate(function(resultSoilWater) {
              var inspectSoilWater = ui.Label({
                value: 'Soil water content at 33kPa: ' + resultSoilWater.toFixed(1) + '%',
                style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 10px 30px'}
              });
              app.rootPanels.panelOne.widgets().set(13, inspectSoilWater);
            }); 
            computedSand.evaluate(function(resultSand) {
              computedSilt.evaluate(function(resultSilt) {
                computedClay.evaluate(function(resultClay) {
                  var inspectSandSiltClay = ui.Label({
                    value: 'Sand/Silt/Clay: ' + resultSand.toFixed(1) + '/' + resultSilt.toFixed(1) + '/' + resultClay.toFixed(1) + '%',
                    style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 10px 30px'}
                  });
                  app.rootPanels.panelOne.widgets().set(14, inspectSandSiltClay);
                });
              }); 
            });
            computedBiome.evaluate(function(resultBiome) {
              computedTaxonomy.evaluate(function(resultTaxonomy) {
                var panelBiomeTaxonomy = ui.Panel([
                  ui.Label({
                    value: 'Biome/taxonomy code: ',
                    style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 10px 30px'}
                  }),
                  ui.Label({
                    value: resultBiome + '/',
                    style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 0 3px'},
                    targetUrl: 'https://github.com/Envirometrix/LandGISmaps/blob/master/tables/pnv_biome.type_biome00k_c_1km_s0..0cm_2000..2017_v0.1.tif.csv'
                  }),
                  ui.Label({
                    value: resultTaxonomy,
                    style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 0 0'},
                    targetUrl: 'https://github.com/Envirometrix/LandGISmaps/blob/master/tables/sol_grtgroup_usda.soiltax_c_250m_s0..0cm_1950..2017_v0.1.tif.csv'
                  })
                ], ui.Panel.Layout.Flow('horizontal'));
                app.rootPanels.panelOne.widgets().set(15, panelBiomeTaxonomy);
              }); 
            });
            computedElevation.evaluate(function(resultElevation) {
              var inspectElevation = ui.Label({
                value: 'Elevation: ' + resultElevation.toFixed(0) + ' m',
                style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 10px 30px'}
              });
              app.rootPanels.panelOne.widgets().set(16, inspectElevation);
            }); 
            computedSlope.evaluate(function(resultSlope) {
              var inspectSlope = ui.Label({
                value: 'Slope: ' + resultSlope.toFixed(2) + '°',
                style: {fontWeight: '700', fontSize: '12px', color: 'c25f19', margin: '0 0 10px 30px'}
              });
              app.rootPanels.panelOne.widgets().set(17, inspectSlope);
            }); 
          });
        // Map click error message
        } else {
            app.rootPanels.panelOne.widgets().set(2,ui.Label({value: 'Pixel time-series', style: {fontWeight: '500', fontSize: '13px', margin: '10px 0 0 30px'}}));
            app.rootPanels.panelOne.widgets().set(3,ui.Label({value: 'Click within data bounds', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
            app.rootPanels.panelOne.widgets().set(4,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(5,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(6,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(7,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(8,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(9,ui.Label({value: 'Pixel land characteristics', style: {fontWeight: '500', fontSize: '13px', margin: '10px 0 3px 30px'}}));
            app.rootPanels.panelOne.widgets().set(10,ui.Label({value: 'Click within data bounds', style: {fontWeight: '300', fontSize: '12px', margin: '5px 5px 5px 30px'}}));
            app.rootPanels.panelOne.widgets().set(11,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(12,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));    
            app.rootPanels.panelOne.widgets().set(13,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(14,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(15,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            app.rootPanels.panelOne.widgets().set(16,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));   
            app.rootPanels.panelOne.widgets().set(17,ui.Label({value: '', style: {fontWeight: '300', fontSize: '1px', margin: '0'}}));
            if (map.widgets().length() > 0) {
              map.remove(map.widgets().get(0));
            }
            map.add(ui.Label('WARNING: Selected point outside of data bounds', {fontWeight: 'bold', fontSize: '13px', color: 'red', position: 'middle-left', margin: '10px 3px 3px 10px'}));
        }
      });
    // Input error message
    } else {
        map.layers().forEach(function(e) {
          e.set('shown',false);
        });
        app.rootPanels.panelOne.clear();
        ui.root.remove(app.rootPanels.panelOne);
        if (map.widgets().length() > 0) {
          map.remove(map.widgets().get(0));
        }
        map.add(ui.Label('WARNING: Invalid parameters—check date and phenology requirements', {fontWeight: 'bold', fontSize: '13px', color: 'red', position: 'middle-left', padding: '10px', margin: '10px 3px 3px 500px'}));
    }
  } else {
      map.layers().forEach(function(e) {
        e.set('shown',false);
      });
      app.rootPanels.panelOne.clear();
      ui.root.remove(app.rootPanels.panelOne);
      if (map.widgets().length() > 0) {
        map.remove(map.widgets().get(0));
      }
      map.add(ui.Label('Invalid parameters - check requirements', {fontWeight: 'bold', fontSize: '13px', color: 'red', position: 'middle-left', padding: '10px', margin: '10px 3px 3px 10px'}));
  }
};
// +++++ Custom UI panel to input user parameters (country, crop name, temporal range, season duration, optimal temperature and precipitation)
var app = {};
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({value: 'Crop-Climate Suitability Mapping', style: {fontWeight: '700', fontSize: '18px', margin: '10px 5px 1px 10px'}}),
      ui.Label({value: 'Version 2 - September 2020', style: {fontWeight: '700', color: 'red', fontSize: '12px', margin: '5px 5px 1px 10px'}}),
      ui.Label({value: 'A continuously updatable crop suitability geovisualization application for locating the fundamental climate niche of select '+
                          'crops across geographies and temporal scales.', 
                style: {fontWeight: '300', fontSize: '13px', margin: '5px 15px 10px 10px'}}),
      ui.Label({value: 'Enter location and crop phenology parameters below.', 
                style: {fontWeight: 'bold', fontSize: '12px', margin: '1px 15px 20px 10px'}}),
      ui.Panel([
          ui.Label({value: 'Rainfall collection: ', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 0'}}),
          ui.Label({value: 'UCSB-CHG CHIRPS (Pentad)',
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 3px'},
                    targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/UCSB-CHG_CHIRPS_PENTAD'})
        ],
        ui.Panel.Layout.Flow('horizontal'),
        {fontWeight: '300', fontSize: '12px', margin: '-9px 15px 10px 10px'}
      ),
      ui.Panel([
          ui.Label({value: 'Temperature collection: ', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 0'}}),
          ui.Label({value: 'MODIS LST MOD11A2 v006',
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 3px'},
                    targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD11A2'})
        ],
        ui.Panel.Layout.Flow('horizontal'),
        {fontWeight: '300', fontSize: '12px', margin: '-9px 15px 10px 10px'}
      ),
      ui.Panel([
          ui.Label({value: 'NDVI collection: ', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 0'}}),
          ui.Label({value: 'MODIS NDVI MOD13Q1 v006',
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 3px'},
                    targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD13Q1'})
        ],
        ui.Panel.Layout.Flow('horizontal'),
        {fontWeight: '300', fontSize: '12px', margin: '-9px 15px 10px 10px'}
      ),
      ui.Panel([
          ui.Label({value: 'Elevation data: ', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 0'}}),
          ui.Label({value: 'USGS SRTM',
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 3px'},
                    targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/USGS_SRTMGL1_003'})
        ],
        ui.Panel.Layout.Flow('horizontal'),
        {fontWeight: '300', fontSize: '12px', margin: '-9px 15px 10px 10px'}
      ),
      ui.Panel([
          ui.Label({value: 'Soil data: ', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 0'}}),
          ui.Label({value: 'OpenLandMap',
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 3px'},
                    targetUrl: 'https://opengeohub.org/about-landgis'}),
          ui.Label({value: '(μ 0–30cm depth)', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 3px'}})
        ],
        ui.Panel.Layout.Flow('horizontal'),
        {fontWeight: '300', fontSize: '12px', margin: '-9px 15px 10px 10px'}
      )
    ])
  };
  app.rootPanels = {
    panelOne: ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style: {width: '285px'}}),
  };
  // User country selection - dropdown List
  app.country = {
    label: ui.Label(),
    countrySelect: ui.Select({
      items: app.countryNames
    })
  };
  app.ecocrop = {
    label: ui.Label(),
    cropSelect: ui.Select({
      items: Object.keys(cropList),
    })
  };
  app.checkbox = {
    checkTest: ui.Checkbox({label: 'Quasi-global (tropics)', style: {fontSize: '12px', margin: '14px 1px 1px 10px'}, value: false}),
    countrySelection: app.country.countrySelect
  };
  app.boundCoords = {
    yBox: ui.Textbox({placeholder: 'e.g., -14.9', style: {width: '80px', margin: '2px 1px 1px 10px'}}),
    xBox: ui.Textbox({placeholder: 'e.g., 35.5', style: {width: '80px', margin: '2px 1px 1px 1px'}}),
    distBox: ui.Textbox({placeholder: 'e.g., 100', style: {width: '75px', margin: '2px 1px 1px 1px'}})
  };
  app.boundLabel = {
    yLabel: ui.Label({value: 'Latitude', style: {fontSize: '12px', margin: '2px 1px 1px 28px', color: '505050'}}),
    xLabel: ui.Label({value: 'Longitude', style: {fontSize: '12px', margin: '2px 1px 1px 33px', color: '505050'}}),
    distLabel: ui.Label({value: 'Buffer (km)', style: {fontSize: '12px', margin: '2px 1px 1px 20px', color: '505050'}})
  };
  app.country.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select region', {fontWeight: '450', fontSize: '13px', margin: '7px 1px 1px 10px'}),
      ui.Label('Defaults to a selected country unless one of the box options is checked. Note that larger extents will require more processing time.', {fontWeight: '200', fontSize: '12px', margin: '2px 10px 3px 20px'}),
      ui.Panel([app.checkbox.countrySelection, app.checkbox.checkTest], ui.Panel.Layout.Flow('horizontal')),
      ui.Label('Optionally, create a custom rectangular boundary', {fontSize: '12px', margin: '5px 1px 1px 10px'}),
      ui.Label('Note that CHIRPS is bound by 50°N and 50°S.', {fontWeight: '200', fontSize: '12px', margin: '2px 3px 3px 20px'}),
      ui.Panel([app.boundCoords.yBox, app.boundCoords.xBox, app.boundCoords.distBox], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([app.boundLabel.yLabel, app.boundLabel.xLabel, app.boundLabel.distLabel], ui.Panel.Layout.Flow('horizontal'))
    ]
  });
  app.customCheckbox = {
    customCheck: ui.Checkbox({label: 'Use custom boundary', style: {fontSize: '12px', margin: '5px 1px 1px 10px'}, value: false})
  };
  app.country.countrySelect.setValue(app.country.countrySelect.items().get(154));
  // User temporal range selection - text
  app.dateRange = {
    label: ui.Label(),
    startBoxDate: ui.Textbox({placeholder: 'start year', style: {width: '75px', margin: '10px 1px 1px 10px'}}),
    endBoxDate: ui.Textbox({placeholder: 'end year', style: {width: '75px', margin: '10px 1px 1px 1px'}})
  };
  var enDashDate = ui.Label({value: '–', style: {margin: '15px 1px 1px 1px', color: '757575'}}),
      unitsDate = ui.Label({value: 'yyyy', style: {fontSize: '12px', margin: '16px 1px 1px 5px', color: '757575'}});
  app.dateRange.panel = ui.Panel({
    widgets: [
      ui.Label('2) Choose temporal range', {fontWeight: '450', fontSize: '13px', margin: '20px 3px 3px 10px'}),
      ui.Label('Available data range: '+availStart.getInfo()+' to '+availEnd.getInfo(), {fontWeight: '200', fontSize: '12px', margin: '2px 30px 3px 20px'}),
      ui.Label('If the season (selected in input 3) wraps over the new year, data will be accessed from the year following the end year selected here (e.g., if 2018 is the last year selected for a November to April season, 2018-11-01 to 2019-04-30 will be used).', {fontWeight: '200', fontSize: '12px', margin: '2px 30px 3px 20px'}),
      ui.Label('Note that longer time periods will require more processing time.', {fontWeight: '200', fontSize: '12px', margin: '2px 30px 3px 20px'}),
      ui.Panel([app.dateRange.startBoxDate, enDashDate, app.dateRange.endBoxDate, unitsDate], ui.Panel.Layout.Flow('horizontal'))
    ]
  });
  // User season duration selection - text
  app.seasonRange = {
    label: ui.Label(),
    startBoxSeason: ui.Textbox({placeholder: 'start season', style: {width: '90px', margin: '10px 1px 1px 10px'}}),
    endBoxSeason: ui.Textbox({placeholder: 'end season', style: {width: '90px', margin: '10px 1px 1px 1px'}})
  };
  var enDashSeason = ui.Label({value: '–', style: {margin: '15px 1px 1px 1px', color: '757575'}}),
      unitsSeason = ui.Label({value: 'MM-dd', style: {fontSize: '12px', margin: '16px 1px 1px 5px', color: '757575'}});
  app.seasonRange.panel = ui.Panel({
    widgets: [
      ui.Label('3) Choose season duration', {fontWeight: '450', fontSize: '13px', margin: '20px 3px 3px 10px'}),
      ui.Panel([app.seasonRange.startBoxSeason, enDashSeason, app.seasonRange.endBoxSeason, unitsSeason], ui.Panel.Layout.Flow('horizontal'))
    ]
  });
  app.checkboxCrop = {
    checkTestCrop: ui.Checkbox({label: 'Use FAO ECOCROP parameters', style: {fontSize: '12px', margin: '14px 1px 1px 10px'}, value: false}),
    cropSelection: app.ecocrop.cropSelect
  };
  app.ecocrop.panel = ui.Panel({
    widgets: [
      ui.Label('4) Select crop from FAO ECOCROP database', {fontWeight: '450', fontSize: '13px', margin: '20px 3px 3px 10px'}),
      ui.Label('If this checkbox is selected, no parameters are required—input options 5 and 6 can be ignored.', {fontWeight: '200', fontSize: '12px', margin: '2px 30px 3px 20px'}),
      // ui.Label('http://ecocrop.fao.org/ecocrop/srv/en/home', {fontWeight: '200', fontSize: '12px', margin: '2px 3px 3px 20px'}, 'http://ecocrop.fao.org/ecocrop/srv/en/home'),
      ui.Panel([app.checkboxCrop.cropSelection, app.checkboxCrop.checkTestCrop], ui.Panel.Layout.Flow('horizontal'))
    ]
  });
  app.ecocrop.cropSelect.setValue(app.ecocrop.cropSelect.items().get(10));
  // User precipitation range selection - text
  app.precipitation = {
    label: ui.Label(),
    minBoxPrecip: ui.Textbox({placeholder: 'min', style: {width: '50px', margin: '10px 1px 1px 10px'}}),
    maxBoxPrecip: ui.Textbox({placeholder: 'max', style: {width: '50px', margin: '10px 1px 1px 1px'}})
  };
  var enDashPrecip = ui.Label({value: '–', style: {margin: '15px 1px 1px 1px', color: '757575'}}),
      unitsPrecip = ui.Label({value: 'millimeters', style: {fontSize: '12px', margin: '16px 1px 1px 5px', color: '757575'}});
  app.precipitation.panel = ui.Panel({
    widgets: [
      ui.Label('Optionally, enter custom climate parameters for any crop variety:', {fontWeight: '200', fontSize: '13px', color: 'red', margin: '10px 40px 3px 10px'}),
      ui.Label('If custom ranges are selected, uncheck the box from input 4, ignore the crop dropdown selection, and complete all fields below.', {fontWeight: '200', fontSize: '12px', margin: '2px 30px 3px 10px'}),
      ui.Label('5) Set rainfall range during growth cycle', {fontWeight: '450', fontSize: '13px', margin: '10px 3px 3px 10px'}),
      ui.Label('Total amount required for the duration of the season.', {fontWeight: '200', fontSize: '12px', margin: '2px 3px 3px 20px'}),
      ui.Panel([app.precipitation.minBoxPrecip, enDashPrecip, app.precipitation.maxBoxPrecip, unitsPrecip], ui.Panel.Layout.Flow('horizontal'))
    ]
  });
  // User temperature range selection - text
  app.temperature = {
    label: ui.Label(),
    minBoxTemp: ui.Textbox({placeholder: 'min', style: {width: '50px', margin: '10px 1px 1px 10px'}}),
    maxBoxTemp: ui.Textbox({placeholder: 'max', style: {width: '50px', margin: '10px 1px 1px 1px'}})
  };
  var enDashTemp = ui.Label({value: '–', style: {margin: '15px 1px 1px 1px', color: '757575'}}),
      unitsTemp = ui.Label({value: '°C', style: {fontSize: '12px', margin: '16px 1px 1px 5px', color: '757575'}});
  app.temperature.panel = ui.Panel({
      widgets: [
      ui.Label('6) Set temperature range during growth cycle', {fontWeight: '450', fontSize: '13px', margin: '20px 3px 3px 10px'}),
      ui.Panel([app.temperature.minBoxTemp, enDashTemp, app.temperature.maxBoxTemp, unitsTemp], ui.Panel.Layout.Flow('horizontal'))
    ]
  });
  app.authors = {
    label: ui.Label()
  };
  app.authors.panel = ui.Panel({
      widgets: [
      ui.Label({value: 'Calculations and data processing may take a moment. If prompted, wait for the browser to respond while data layers are loaded.', 
                style: {color: '177030', fontWeight: '700', fontSize: '12px', margin: '10px 40px 1px 10px'}}),
      ui.Label({value: 'Citation information:', 
                style: {fontWeight: '700', fontSize: '12px', margin: '10px 30px 0 10px'}}),
      ui.Label({value: 'Peter, B.G., Messina, J.P., Lin, Z. and Snapp, S.S., 2020. Crop climate suitability mapping on the cloud: a geovisualization application for sustainable agriculture. Scientific Reports, 10(1), pp.1-17.', 
                style: {fontWeight: '300', fontSize: '12px', margin: '10px 30px 0 10px'}}),
      ui.Label({value: 'https://doi.org/10.1038/s41598-020-72384-x', 
                style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 10px'},
                targetUrl: 'https://doi.org/10.1038/s41598-020-72384-x'}),      
      ui.Label({value: 'Peter, B. G., Messina, J. P., and Lin, Z. 2019. Web-based GIS for spatiotemporal crop climate niche mapping, Harvard Dataverse, V1.', 
                style: {fontWeight: '300', fontSize: '12px', margin: '10px 30px 0 10px'}}),
      ui.Label({value: 'https://doi.org/10.7910/DVN/UFC6B5', 
                style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 10px'},
                targetUrl: 'https://doi.org/10.7910/DVN/UFC6B5'}),
      ui.Label({value: 'This application is made possible by the support of the American People provided to the Feed the Future Innovation Lab for Sustainable Intensification through the United States Agency for International Development (USAID). The contents are the sole responsibility of the authors and do not necessarily reflect the views of USAID or the United States Government. Program activities are funded by the United States Agency for International Development (USAID) under Cooperative Agreement No. AID-OAA-L-14-00006.', 
                style: {fontWeight: '300', fontSize: '12px', margin: '10px 30px 5px 10px'}})      
      ]
  });
  app.mapper = {
    button: ui.Button('Click to map!', fundamentalNiche, false, {color: 'a81522', width: '150px'})
  };
  app.mapper.panel = ui.Panel({
    widgets: [
      ui.Label('7) Run crop climate-suitability application', {fontWeight: '450', fontSize: '13px', margin: '20px 3px 3px 10px'}),
      ui.Label('Note that combined suitability is based on temperature and rainfall only.', {fontWeight: '200', fontSize: '12px', margin: '2px 30px 3px 20px'}),
      ui.Panel([
        app.mapper.button
      ]),
      ui.Label('8) Click map to query pixel climate and land data', {fontWeight: '450', fontSize: '13px', margin: '5px 40px 3px 10px'}),
      ui.Label('Expand charts to download CSV. Each point is the average across the selected season (X-axis labels are the season start date).', {fontWeight: '200', fontSize: '12px', margin: '2px 30px 3px 20px'})
    ]
  });
  map.setOptions('Dark',basemap);
};
// Function to create embeddded database of countries for user selection 
app.createDB = function() {
  app.countries = countryList.sort('country_na').aggregate_array('country_na').getInfo();
  app.countryNames = app.countries.filter(function(item, index) {
    return app.countries.indexOf(item) >= index;
  });
};
// Add panels to display
app.boot = function() {
  app.createDB();
  app.createPanels();
  var panel = ui.Panel({style: {width: '340px'}});
  ui.root.clear();
  ui.root.insert(0, panel);
  ui.root.insert(2, map);
  panel.add(app.intro.panel).add(app.country.panel).add(app.customCheckbox.customCheck).add(app.dateRange.panel).add(app.seasonRange.panel).add(app.ecocrop.panel)
       .add(app.precipitation.panel).add(app.temperature.panel).add(app.mapper.panel).add(app.authors.panel);
};
app.boot();