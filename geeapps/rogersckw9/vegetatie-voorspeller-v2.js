var collection = ee.ImageCollection("users/rogersckw9/vegetatie-voorspelling-yearly-classification/Landsat-monthly-composite-classified-rhine-uiterwaard"),
    ecotop = ee.FeatureCollection("users/gertjang/succession/ecotopen_cyclus_drie_rijntakken_utm31n"),
    leggerImage = ee.Image("users/rogersckw9/vegetatie-voorspelling-improved/legger-image"),
    uiterwaard = ee.FeatureCollection("users/rogersckw9/vegetatie-uiterwaard/uiterwaard-indeling-rvdr-2002-wgs84"),
    ecotopenImages = ee.ImageCollection("users/rogersckw9/ecotoop/ecotoop-maps-6-class"),
    ecotoop97 = ee.FeatureCollection("users/valesca/Ecotoop1997"),
    ecotoop06 = ee.FeatureCollection("users/valesca/Ecotoop2006"),
    ecotoop12 = ee.FeatureCollection("users/valesca/Ecotoop2012"),
    ecotoop17 = ee.FeatureCollection("users/valesca/Ecotoop2017"),
    beheer = ee.ImageCollection("users/rogersckw9/ecotoop/ecotoop-maps-beheer"),
    hydro = ee.ImageCollection("users/rogersckw9/ecotoop/ecotoop-maps-hydrology"),
    mechDyn = ee.ImageCollection("users/rogersckw9/ecotoop/ecotoop-maps-mechanical-dynamics");
var assets = require('users/gena/packages:assets');
var palettes = require('users/gena/packages:palettes');
var animation = require('users/gena/packages:animation');
// TODO:
// Chart change in Management, Hydrology, and Mechanical Dynamics
var controlPanel = ui.Panel()
controlPanel.style().set('position', 'top-left');
Map.add(controlPanel);
var startYear = ['1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
  '2010', '2011', '2013', '2014', '2015', '2016', '2017', '2018']
var start = '1997'
var selectStartYear = ui.Select({
  items: startYear,
  onChange: function(key) {
    start = key
  }
});
var label = ui.Label('From:', {position: 'top-left'});
controlPanel.add(label)
controlPanel.add(selectStartYear.setValue(start))
var numYears = 10;
Map.setCenter(6.01, 51.88, 13)
var years = ee.List.sequence(1984, 2018, 1).remove(2012).getInfo()
var excludeL7 = collection.filterMetadata('mission', 'not_equals', 'L7')
var classImages = ee.ImageCollection(years.map(function(year){
  var saveDate = ee.Date.fromYMD(year, 06, 01)
  var startDate = ee.Date.fromYMD(year, 01, 01)
  var endDate = ee.Date.fromYMD(year, 12, 01)
  // var yearImage = ee.Image(collection.filterDate(startDate, endDate).sort('accuracyValidation', false).first())
  var yearImage = ee.Image(excludeL7.filterDate(startDate, endDate).sort('accuracyValidation', false).first())
  return yearImage.set({
    // label: ee.Date(yearImage.date()).format('YYYY-MM-dd'),
    mission: yearImage.get('mission'),
    composite_type: yearImage.get('composite_type'),
    'system:time_start': yearImage.get('system:time_start'),
    accuracyValidation: yearImage.get('accuracyValidation'),
    accuracyTraining: yearImage.get('accuracyTraining'), 
    numImages: yearImage.get('numImages')
  }).remap([0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6])
  // return yearImage
}))
var roughnessImages = classImages.map(function(i){
  return i.remap([1, 2, 3, 4, 5, 6], [0.0, 0.15, 0.39, 1.45, 12.84, 24.41])
})
var ecotopenRoughness = ecotopenImages.map(function(i){
  return i.remap([1, 2, 3, 4, 5, 6], [0.0, 0.15, 0.39, 1.45, 12.84, 24.41])
})
var styleLanduse = 
  '<RasterSymbolizer>' +
    '<ColorMap  type="values">' +
      '<ColorMapEntry color="#BDEEFF" quantity="1" label="Water" opacity="1" />' +
      '<ColorMapEntry color="#FF817E" quantity="2" label="Verhard oppervlak" opacity="1" />' +
      '<ColorMapEntry color="#EEFAD4" quantity="3" label="Gras en Akker" opacity="1" />' +
      '<ColorMapEntry color="#DEBDDE" quantity="4" label="Riet en Ruigte" opacity="1" />' +
      '<ColorMapEntry color="#73BF73" quantity="5" label="Bos" opacity="1" />' +
      '<ColorMapEntry color="#D97A36" quantity="6" label="Struweel" opacity="1" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
var styleBeheer = 
  '<RasterSymbolizer>' +
    '<ColorMap  type="values">' +
      '<ColorMapEntry color="#bababa" quantity="0" label="Onbekend, Kunstmatig hard substraat" opacity="1" />' +
      '<ColorMapEntry color="#92c5de" quantity="1" label="Water" opacity="1" />' +
      '<ColorMapEntry color="#d73027" quantity="2" label="Nauwelijks tot geen beheer" opacity="1" />' +
      '<ColorMapEntry color="#fee08b" quantity="3" label="Nauwelijks tot geen/extensief beheer" opacity="1" />' +
      '<ColorMapEntry color="#d9ef8b" quantity="4" label="Extensief beheer" opacity="1" />' +
      '<ColorMapEntry color="#1a9850" quantity="5" label="Intensief beheer" opacity="1" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
var leggerImage = ee.Image('users/rogersckw9/vegetatie-voorspelling-improved/legger-image');
Map.addLayer(leggerImage.sldStyle(styleLanduse), {}, 'legger');
var leggerRoughness = leggerImage.remap([1, 2, 3, 4, 5, 6], [0.0, 0.15, 0.39, 1.45, 12.84, 24.41]).select(['remapped'], ['type']);
var classes = ee.FeatureCollection('users/gertjang/FI_Rijn_Maas_merged_2012_numfdls');
Map.addLayer(uiterwaard, {}, 'uiterwaard', true, 0.5);
// Map.addLayer(classes, {}, 'classes', true, 0.5)
function wet_moist_masks(startDate, feature){
  var bounds = feature.geometry();
  var startYear = startDate.get('year');
  var lookback = startDate.advance(-1, 'year');
  // ndwi & ndvi, get images from one or multiple missions
  var images = assets.getImages(bounds, {
    filter: ee.Filter.date(lookback, startDate),
    resample: true,
    bandsAll: true,
    missions: [ 'S2', 'L8', 'L5' ]
  }).select(['swir', 'nir', 'red', 'green', 'blue']);
  // filter out noisy images
  images = assets.getMostlyCleanImages(images, bounds, {
    scale: Map.getScale() * 10, 
    scorePercentile: 95,
    qualityBand: 'green',
  }).sort('system:time_start')
  var ndwiBands = ['green', 'nir'];
  // Feb-Mar ndwi (wet season)
  var imagesWet = images.filterDate(ee.Date.fromYMD(startYear,2,1), ee.Date.fromYMD(startYear,3,31));
  var imageWet = imagesWet.median();
  var ndwiWet = imageWet.normalizedDifference(ndwiBands);
  // May-June ndwi (dry season)
  var imagesDry = images.filterDate(ee.Date.fromYMD(startYear,5,1), ee.Date.fromYMD(startYear,6,30));
  var imageDry = imagesDry.median();
  var ndwiDry = imageDry.normalizedDifference(ndwiBands);
  // Mask where ground was once flooded.
  // Where there was water in wet image (0.1 <= ndvi <= 0.4), no longer in dry image
  var moistMask = ndwiWet.gte(-0.1).and(ndwiWet.lte(0.4)).and(ndwiDry.lte(-0.1)).or(ndwiDry.gte(0.4));
  // Mask where ground remains wet
  var wetMask = ndwiWet.gte(-0.1).and(ndwiWet.lte(0.4)).and(ndwiDry.gte(-0.1)).and(ndwiDry.lte(0.4));
  return moistMask.addBands(wetMask).rename(['moistMask','wetMask']);
}
function bare_grazing_variables(ecotopFeatures, bareToReedMask, bareToWillowMask){
  var reedGrazing = ecotopFeatures.remap(
    ['Onbekend', 'Nauwelijks tot geen beheer', 'Nauwelijks tot geen/extensief beheer',
    'Extensief beheer', 'Intensief beheer', 'Kunstmatig hard substraat', 'Water'],
    [0, 100, 100, 100, 70, 0, 0],
    'BEHEER'
  );
  var reedGrazingImage = ee.Image().int().paint(reedGrazing, 'BEHEER').divide(100)//.updateMask(bareToReedMask);
  // A = [50, 230, 280], B = [0.57, 0.57, 0.60] for Beheer = [No grazing, Extensive grazing, Intensief grazing]
  var willowGrazingA = ecotopFeatures.remap(
    ['Onbekend', 'Nauwelijks tot geen beheer', 'Nauwelijks tot geen/extensief beheer',
    'Extensief beheer', 'Intensief beheer', 'Kunstmatig hard substraat', 'Water'],
    [0.0, 50, 50, 230, 280, 0, 0],
    'BEHEER'
  );
  var willowGrazingB = ecotopFeatures.remap(
    ['Onbekend', 'Nauwelijks tot geen beheer', 'Nauwelijks tot geen/extensief beheer',
    'Extensief beheer', 'Intensief beheer', 'Kunstmatig hard substraat', 'Water'],
    [0, 57, 57, 57, 60, 0, 0],
    'BEHEER'
  );
  var willowGrazingAImage = ee.Image().int().paint(willowGrazingA, 'BEHEER').multiply(bareToWillowMask);
  var willowGrazingBImage = ee.Image().int().paint(willowGrazingB, 'BEHEER').divide(100).updateMask(bareToWillowMask);
  return reedGrazingImage.addBands(willowGrazingAImage).addBands(willowGrazingBImage)
    .rename(['bareToReedGrazing', 'bareToWillowGrazingA', 'bareToWillowGrazingB']);
}
function willow_function(a, b, t){
  // Function to caluclate willow roughness over time t
  // A = [50, 230, 280], B = [0.57, 0.57, 0.60] for Beheer = [No grazing, Extensive grazing, Intensief grazing]
  // k = 25.41/(1 + A * B**t)
  var kValue = ee.Image(25.41).divide(ee.Image(1.0).add(ee.Image(a).multiply(ee.Image(b).pow(ee.Number(ee.Image(t))))));
  return kValue;
}
function prepare_data(image, ecotopFeatures, grassPercentage, herbPercentage, willowPercentage, feature, startDate, years){
  var startYear = startDate.get('year');
  var lookback = startDate.advance(-1,'year');
  // Convert image from classes to roughness
  image = image.remap([1, 2, 3, 4, 5, 6], [0.0, 0.15, 0.39, 1.45, 12.84, 24.41]);
  // Specify roughness value for each class
  var waterRoughness = ee.Number(0.0);
  var bareRoughness = ee.Number(0.15); //0.11, average of classes in vegetatie legger
  var grassRoughness = ee.Number(0.39); //0.33
  var herbaceousRoughness = ee.Number(1.45);// 5.01, 
  var reedRoughness = ee.Number(20.73); //should be average of rietruigte (11.42) and riet (20.73)
  var forestRoughness = ee.Number(12.84);//9.92,
  var willowRoughness = ee.Number(24.41);//26.45
  // Create base image for each class roughness
  var waterRoughnessImage = ee.Image(waterRoughness);
  var bareRoughnessImage = ee.Image(bareRoughness);
  var grassRoughnessImage = ee.Image(grassRoughness);
  var herbRoughnessImage = ee.Image(herbaceousRoughness);
  var reedRoughnessImage = ee.Image(reedRoughness);
  var forestRoughnessImage = ee.Image(forestRoughness);
  var willowRoughnessImage = ee.Image(willowRoughness);
  // Rates for progression from one class to another.
  // All rates take 10 yr to change class
  var bareToReedRate = reedRoughness.subtract(bareRoughness).divide(5);
  // var bareToWillowRate = willowRoughness.subtract(bareRoughness).divide(6);
  // var bareRoughnessImage = bare(image, bareRoughnessImage, bareRoughness)
  var grassToHerbRate = herbaceousRoughness.subtract(grassRoughness).divide(10);
  var herbToWillowRate = willowRoughness.subtract(herbaceousRoughness).divide(10);
  var willowToForestRate = forestRoughness.subtract(willowRoughness).divide(10);
  // Create random images
  var random0 = ee.Image.random(0);
  var random1 = ee.Image.random(1);
  var random2 = ee.Image.random(2);
  // First Roughness Image Along Shoreline 
  var firstRoughnessImage = waterRoughnessImage.updateMask(image.eq(waterRoughness))
    .addBands(bareRoughnessImage.updateMask(image.eq(bareRoughness)))
    .addBands(grassRoughnessImage.updateMask(image.eq(grassRoughness)))
    // .addBands(reedRoughnessImage.updateMask(image.eq(reedLowerRoughness)))
    .addBands(herbRoughnessImage.updateMask(image.eq(herbaceousRoughness)))
    .addBands(forestRoughnessImage.updateMask(image.eq(forestRoughness)))
    .addBands(willowRoughnessImage.updateMask(image.eq(willowRoughness)))
    .rename(['waterRoughness','bareRoughness','grassRoughness',
             'herbaceousRoughness','forestRoughness','willowRoughness'])
    .set('system:time_start', startDate);
  // calculate wet and moist masks for that year
  var moistureMasks = wet_moist_masks(startDate, feature);
  var wetMask = moistureMasks.select('wetMask');
  var moistMask = moistureMasks.select('moistMask');
  // Mechanical dynamics from ecotop layers
  var ecotopMechDyn = ecotopFeatures.remap(
    ['Onbekend', 'Gering dynamisch', 'Matig/gering dynamisch', 'Sterk/matig dynamisch', 'Sterk dynamisch'],
    [0, 1, 2, 3, 4],
    'MECH_DYN'
  );
  var mechDynImage = ee.Image().int().paint(ecotopMechDyn, 'MECH_DYN');
  var weakDynamics = mechDynImage.eq(0).or(mechDynImage.eq(1));
  var moderateDynamics = mechDynImage.eq(2);
  var strongDynamics = mechDynImage.eq(3).or(mechDynImage.eq(4));
  // bare will change to reed in 2 yr if it is wet and weak dynamics
  var remainBare = image.eq(bareRoughness).multiply(strongDynamics);
  var bareToReedMask = image.eq(bareRoughness).multiply(wetMask).multiply(weakDynamics);
  var bareToWillowMask = image.eq(bareRoughness).multiply(moistMask).multiply(moderateDynamics);
  var bareGrazingImages =  bare_grazing_variables(ecotopFeatures, bareToReedMask, bareToWillowMask);
  bareToReedMask = bareToReedMask.multiply(bareGrazingImages.select('bareToReedGrazing'));
  var maxReedImage = reedRoughnessImage.multiply(bareToReedMask);
  // % grass will change into herb in 10 yr
  var grassToHerbMask = image.eq(grassRoughness).and(random0.lte(grassPercentage));
  var remainGrass = image.eq(grassRoughness).and(random0.gt(grassPercentage));
  // % herbaceous veg will change to shrubs in 10 yr
  var herbToWillowMask = image.eq(herbaceousRoughness).and(random1.lte(herbPercentage));
  var remainHerb = image.eq(herbaceousRoughness).and(random1.gt(herbPercentage));
  // % of shrubs will change into forest in 10 yr
  var willowToForestMask = image.eq(willowRoughness).and(random2.lte(willowPercentage));
  var remainWillow = image.eq(willowRoughness).and(random2.gt(willowPercentage));
  var accumulateRoughness = function(year, prev) {
    // Get the previous calculated image
    var dateLast = startDate.advance(ee.Number(year).subtract(1),'year');
    var dateNext = startDate.advance(ee.Number(year),'year');
    var prevIm = ee.Image(
      ee.ImageCollection(prev)
      .filter(ee.Filter.eq('system:time_start', dateLast))
      .first()
    );
    // update each class by adding rate of change
    var waterRoughnessNow = prevIm.select('waterRoughness');
    var bareToWillowPrior = prevIm.select('bareRoughness').multiply(bareToWillowMask);
    var bareToWillowNow = willowRoughnessImage.min(
      willow_function(bareGrazingImages.select('bareToWillowGrazingA'), bareGrazingImages.select('bareToWillowGrazingB'), year)
    );
    var bareRoughnessNow = prevIm.select('bareRoughness')
      .add(maxReedImage.min(ee.Image(bareToReedRate).multiply(bareToReedMask)).unmask())
      .add(bareToWillowNow.subtract(bareToWillowPrior).unmask());
    var grassRoughnessNow = prevIm.select('grassRoughness')
      .add(ee.Image(grassToHerbRate).multiply(grassToHerbMask));
    var herbRoughnessNow = prevIm.select('herbaceousRoughness')
      .add(ee.Image(herbToWillowRate).multiply(herbToWillowMask));
    var forestRoughnessNow = prevIm.select('forestRoughness');
    var willowRoughnessNow = prevIm.select('willowRoughness')
      .add(ee.Image(willowToForestRate).multiply(willowToForestMask));
    var imageNow = waterRoughnessNow
      .addBands(bareRoughnessNow)
      .addBands(grassRoughnessNow)
      .addBands(herbRoughnessNow)
      .addBands(forestRoughnessNow)
      .addBands(willowRoughnessNow)
      .rename(['waterRoughness','bareRoughness','grassRoughness',
             'herbaceousRoughness','forestRoughness','willowRoughness'])
      // Propagate metadata to the new image.
      .set('system:time_start', dateNext);
    // Return the list with the cumulative anomaly inserted.
    return ee.ImageCollection(prev).merge(ee.ImageCollection([imageNow]));
  };
  var yearArray = ee.List.sequence(1,years,1);
  var blankCollection = ee.ImageCollection([firstRoughnessImage]);
  // Create an ImageCollection of images by iterating.
  // Since the return type of iterate is unknown, it needs to be cast to a List.
  var cumulativeImages = ee.ImageCollection(yearArray.iterate(accumulateRoughness, blankCollection));
  return cumulativeImages;
}
function merge_roughness_regions(classifiedImage, imagesShoreline, imagesTerrestrial, imageNoChange){
  var cumulativeImages = imagesShoreline.map(function(i){
    var image1 = ee.Image(i).unmask();
    var image2 = ee.Image(imagesTerrestrial.filterDate(image1.get('system:time_start')).first()).unmask();
    var image3 = ee.Image(imageNoChange).unmask()
    var waterRough = image1.select('waterRoughness').add(image2.select('waterRoughness'));
    // waterRough = waterRough.updateMask(waterRough.neq(0));
    var bareRough = image1.select('bareRoughness').add(image2.select('bareRoughness')).add(image3.eq(0.15));
    bareRough = bareRough.updateMask(bareRough.neq(0));
    var grassRough = image1.select('grassRoughness').add(image2.select('grassRoughness')).add(image3.eq(0.39));
    grassRough = grassRough.updateMask(grassRough.neq(0));
    var herbRough = image1.select('herbaceousRoughness').add(image2.select('herbaceousRoughness')).add(image3.eq(1.45));
    herbRough = herbRough.updateMask(herbRough.neq(0));
    var forestRough = image1.select('forestRoughness').add(image2.select('forestRoughness')).add(image3.eq(12.84));
    forestRough = forestRough.updateMask(forestRough.neq(0));
    var willowRough = image1.select('willowRoughness').add(image2.select('willowRoughness')).add(image3.eq(24.41));
    willowRough = willowRough.updateMask(willowRough.neq(0));
    var total = waterRough.addBands(bareRough).addBands(grassRough)
      .addBands(herbRough).addBands(forestRough).addBands(willowRough);
    return ee.Image(total)
      .set('system:time_start', ee.Date(image1.get('system:time_start')))
      .rename(['waterRoughness','bareRoughness','grassRoughness',
               'herbaceousRoughness','forestRoughness','willowRoughness'])
      .mask(classifiedImage);
  });
  return cumulativeImages;
}
function calculateTotalRoughness(i){
  var image = ee.Image(i);
  var waterRough = image.select('waterRoughness').unmask();
  var bareRough = image.select('bareRoughness').unmask();
  var grassRough = image.select('grassRoughness').unmask();
  var herbRough = image.select('herbaceousRoughness').unmask();
  var forestRough = image.select('forestRoughness').unmask();
  var willowRough = image.select('willowRoughness').unmask();
  var total = waterRough.add(bareRough).add(grassRough)
    .add(herbRough).add(forestRough).add(willowRough);
  return ee.Image(total)
    .set('system:time_start', ee.Date(image.get('system:time_start')))
    .rename('total_roughness');
}
function predict_roughness(feature, ecotopFeatures, classifiedImages, startYearString, years){
  var startDate = ee.Date(startYearString+'-11-01')
  var startYear = ee.Date(startDate).get('year');
  var lookback = startDate.advance(-1,'year');
  // Hydrology from ecotop layers
  var ecotopHydrology = ecotopFeatures.remap(
    ['Onbekend','Overstromingsvrij', 'Periodiek tot zelden overstroomd', 'Oever - vochtig', 
    'Oever - drassig/vochtig', 'Oever - drassig', 'Oever - nat/drassig/vochtig', 'Oever - nat', 
    'Ondiep', 'Matig diep', 'Diep', 'Zeer diep/diep'],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    'HYDROLOGIE'
  );
  var hydrologieImage = ee.Image().int().paint(ecotopHydrology, 'HYDROLOGIE');
  // var water = hydrologieImage.gte(8)
  var shoreline = hydrologieImage.gte(3).and(hydrologieImage.lte(7));
  var terrestrial = hydrologieImage.lte(2);
  var noSuccession = hydrologieImage.gte(8)
  // Prepare starting Image
  // var classifiedImagesFiltered = classifiedImages.filterDate(ee.Date.fromYMD(startYear,8,1), ee.Date.fromYMD(startYear,9,30));
  // var classifiedImage = classifiedImagesFiltered.reduce(ee.Reducer.median()).focal_mode(1);
  var classifiedImage = ee.Image(classifiedImages.filterDate(ee.Date.fromYMD(startYear,1,1), ee.Date.fromYMD(startYear,12,31)).first());
  var roughnessImage = classifiedImage.remap([1, 2, 3, 4, 5, 6], [0.0, 0.15, 0.39, 1.45, 12.84, 24.41])
  var classifiedImageShore = classifiedImage.updateMask(shoreline);
  var classifiedImageTerrestrial = classifiedImage.updateMask(terrestrial);
  var classifiedImageNoSuccession = classifiedImage.updateMask(noSuccession);
  var roughnessNoSuccession = roughnessImage.updateMask(noSuccession);
  // Shoreline Evolution Rates
  // 10% grass will change into herb in 10 yr
  var grassToHerb = ee.Number(0.1);
  // 40% herbaceous veg will change to shrubs in 10 yr
  var herbToWillow = ee.Number(0.4);
  // 10% of shrubs will change into forest in 10 yr
  var willowToForrest = ee.Number(0.1);
  var cumulativeShore = prepare_data(classifiedImageShore, ecotop, grassToHerb, herbToWillow, willowToForrest, feature, startDate, years);
  // Terrestrial Evolution Rates
  // 10% grass will change into herb in 10 yr (same as shoreline)
  // 60% herbaceous veg will change to shrubs in 10 yr
  herbToWillow = ee.Number(0.6);
  // 20% of shrubs will change into forest in 10 yr
  willowToForrest = ee.Number(0.2);
  // Forrest remains forrest
  var cumulativeTerrestrial = prepare_data(classifiedImageTerrestrial, ecotop, grassToHerb, herbToWillow, willowToForrest, feature, startDate, years);
  var totalRoughnessImages = merge_roughness_regions(classifiedImage, cumulativeShore, cumulativeTerrestrial, roughnessNoSuccession);
  return totalRoughnessImages;
}
function get_roughness_info(feature, imageCollection, classesImage, predictionImages, ecotopenRough, scale) {
  predictionImages = predictionImages.map(function(i){
    return i.mask(i.neq(0))
      // .addBands(classesImage)
      .set('system:time_start', ee.Date(i.get('system:time_start')));
  });
  ecotopenRough = ecotopenRough.map(function(i){
    return i
      // .addBands(classesImage)
      .set('system:time_start', ee.Date(i.get('system:time_start')));
  }).select(['remapped'], ['ecotoop'])
  //.select(['remapped', 'type'], ['ecotoop', 'type']);
  // filter collection only on growth season for display
  var filteredCollection = imageCollection
  filteredCollection = filteredCollection.map(function(i){
    return i
      // .addBands(classesImage)
      .set('system:time_start', ee.Date(i.get('system:time_start')));
  });
  filteredCollection = filteredCollection.merge(predictionImages).merge(ecotopenRough);
  var options = {
    title: 'Roughness Class Value',
    hAxis: {title: 'Date'},
    vAxis: {title: 'Mean roughness value (k-waarde) of region'},
    series: {
      0: {color: '#FF9800', pointSize: 3, lineWidth: 0, labelInLegend: 'Ecotop Maps'},
      1: {color: '#1976D2', pointSize: 3, lineWidth: 0, labelInLegend: 'Classified'},
      2: {color: '#E53935', pointSize: 3, lineWidth: 0, labelInLegend: 'Predicted'}
      // 3: {color: '#E53935', pointSize: 0, lineWidth: 2, labelInLegend: 'Legger'}
    },
    trendlines: {
      1: {
        color: '#64B5F6',
        pointSize: 0,
        lineWidth: 2,
        labelInLegend: 'Trend',
        visibleInLegend: true
      }
    },
    // backgroundColor: '#fafafa',
    // chartArea: {
    //   backgroundColor: '#fafafa' 
    // }
  };
  var chart = ui.Chart.image.series(filteredCollection, feature.geometry(), ee.Reducer.mean(), scale)
    .setOptions(options);
  return chart;
}
function add_total_roughness(i){
  var image = ee.Image(i);
  var waterRough = image.select('waterRoughness').unmask();
  var bareRough = image.select('bareRoughness').unmask();
  var grassRough = image.select('grassRoughness').unmask();
  var herbRough = image.select('herbaceousRoughness').unmask();
  var forestRough = image.select('forestRoughness').unmask();
  var willowRough = image.select('willowRoughness').unmask();
  // var verhardMask = classifiedImage.eq(2);
  var total = waterRough.add(bareRough).add(grassRough)
    .add(herbRough).add(forestRough).add(willowRough);
  return ee.Image(total)
    .set('system:time_start', ee.Date(image.get('system:time_start')))
    .rename('total_roughness');
}
function future_roughness_chart(feature, totalRoughness, scale){
  var options= {
    title: 'Roughness Change per Class',
    hAxis: {title: 'Date'},
    vAxis: {title: 'Mean roughness of region'},
    pointSize: 3,
    lineWidth: 1
  };
  var chartAll = ui.Chart.image.series(totalRoughness, feature.geometry(), ee.Reducer.mean(), scale)
    .setOptions(options);
  return chartAll;
}
// var showClassified = function(range) {
//   // var mosaic = ee.Algorithms.Landsat.simpleComposite({
//     // collection: collection.filterDate(range.start(), range.end())
//   // });
//   var image = imageCollection.filterDate(range.start(), range.end());
//   // Asynchronously compute the name of the composite.  Display it.
//   range.start().get('year').evaluate(function(name) {
//     // var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
//     var layer = ui.Map.Layer(image.sldStyle(styleLanduse), name + ' classified');
//     Map.layers().set(0, layer);
//   });
// };
var selection = ee.FeatureCollection([]);
var selectionLayer = ui.Map.Layer(selection, {color: '#ffffff'}, 'selected polygon (click)', true, 0.5);
Map.layers().add(selectionLayer);
// // Asynchronously compute the date range and show the slider.
// var dateRange = ee.DateRange(start, end).evaluate(function(range) {
//   var dateSlider = ui.DateSlider({
//     start: range['dates'][0],
//     end: range['dates'][1],
//     value: null,
//     period: 365,
//     onChange: showClassified
//   });
//   Map.add(dateSlider.setValue(now));
// });
var panelCharts = ui.Panel();
var panelMain = ui.Panel([panelCharts]);
panelMain.style().set({
  // 'background-color': '#fafafa',
  'position': 'bottom-right',
  'width': '600px',
  // 'height': '277px'
  'height': '477px'
});
panelCharts.style().set({
  // 'background-color': '#fafafa',
});
Map.widgets().add(panelMain);
panelCharts.add(ui.Label('Click on a region in the map ...'));
var busy = false
Map.onClick(function(pt) {
  if(busy) {
    return
  }
  busy = true
  pt = ee.Geometry.Point(ee.Dictionary(pt).values().reverse());
  var selection = ee.Feature(uiterwaard.filterBounds(pt).first());
  // print(selection)
  // var selection = ee.Feature(classes.filterBounds(pt).first());
  var polygon = selection.get('Legger');
  var futureRoughnessImages = predict_roughness(selection, ecotop, classImages, start, numYears);
  var totalRoughnessImages = futureRoughnessImages.map(add_total_roughness);
  var roughness = get_roughness_info(selection, roughnessImages, leggerRoughness, totalRoughnessImages, ecotopenRoughness, 10);
  var predictionChart = future_roughness_chart(selection, futureRoughnessImages, 10);
  // panelCharts.widgets().reset([ ui.Label('Loading chart data ...' )])
  panelCharts.widgets().reset([])
  // panelCharts.clear();
  panelCharts.add(roughness);
  panelCharts.add(predictionChart);
  selectionLayer.setEeObject(selection);
  busy = false
});