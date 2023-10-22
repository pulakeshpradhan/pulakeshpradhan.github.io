var CGLOPS = ui.import && ui.import("CGLOPS", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V/Global"),
    kecamatan = ui.import && ui.import("kecamatan", "table", {
      "id": "users/syukrealworld/Kecamatan"
    }) || ee.FeatureCollection("users/syukrealworld/Kecamatan"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "discrete_classification"
        ],
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["discrete_classification"],"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "discrete_classification"
        ],
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["discrete_classification"],"gamma":1};
//Create title
//Add Title
var title = ui.Label({
  value: 'Aplikasi Prediksi Tutupan Lahan di Daerah Istimewa Yogyakarta',
  style:{
  fontWeight: 'bold',
  fontSize: '12px'
  }});
title.style().set('position', 'top-center');
Map.add(title);
///////////////// Load data //////////////////////// ms 20210526
// load in CGLOPS msedit
var image = CGLOPS.filterDate('2015-01-01').first();
var coverfractions = ee.ImageCollection(image).select([
  'shrub-coverfraction', 'grass-coverfraction', 'crops-coverfraction',
  'urban-coverfraction', 'bare-coverfraction', 'snow-coverfraction',
  'water-permanent-coverfraction', 'water-seasonal-coverfraction',
  'moss-coverfraction', 'tree-coverfraction']).toBands();
// Select the premade discrete layer
var discrete = image.select(['discrete_classification']);
// Select cover fractions
var bare = image.select(['bare-coverfraction']);
var crops = image.select(['crops-coverfraction']);
var grass = image.select(['grass-coverfraction']);
var moss = image.select(['moss-coverfraction']);
var shrub = image.select(['shrub-coverfraction']);
var snow = image.select(['snow-coverfraction']);
var trees = image.select(['tree-coverfraction']);
var urban = image.select(['urban-coverfraction']);
var water_permanent = image.select(['water-permanent-coverfraction']);
var water_seasonal  = image.select(['water-seasonal-coverfraction']);
// Visualise
Map.addLayer(trees,{},'tree cover',false);
Map.addLayer(shrub,{},'shrub cover',false);
Map.addLayer(grass,{},'grass cover',false);
Map.addLayer(crops,{},'crop cover',false);
Map.addLayer(moss,{},'moss&lichen cover',false);
Map.addLayer(bare,{},'bare cover',false);
Map.addLayer(snow,{},'snow cover',false);
Map.addLayer(urban,{},'urban cover',false);
Map.addLayer(water_seasonal,{},'seasonal water',false);
Map.addLayer(water_permanent,{},'permanent water',false);
Map.addLayer(discrete,{},'Premade discrete map');
// District DIY
Map.addLayer(kecamatan,{},'Kecamatan');
// Also show a legend
var legend_discrete_lev2 = function() {
  var Palette = ['282828','FFBB22','FFFF4C','F096FF','FA0000','B4B4B4','F0F0F0',
    '0032C8','0096A0','FAE6A0','007800','648C00','000080'];
  var Names = [
    'Tidak diketahui (0)',
    'Semak belukar (20)',
    'Vegetasi herba (30)',
    'Pertanian (40)',
    'Perkotaan (50)',
    'Tanah kosong (60)',
    'Salju dan es (70)',
    'Air (80)',
    'Herba Lahan basah (90)',
    'Lumut (100)',
    'Hutan tertutup (110-116)',
    'Hutan terbuka (120-126)',
    'Lautan (200)'];
  var legend = ui.Panel({style: {position: 'bottom-right', padding: '0px 15px'}});
  var legendTitle = ui.Label({
    value: 'Legenda',
    style: {fontWeight:'bold',fontSize:'16px',margin:'0 0 2px 0',padding:'0'}
  });
  legend.add(legendTitle);
  var makeRow = function(color, name) {
        var colorBox = ui.Label({
          style: { backgroundColor: '#' + color, padding: '6px', margin: '0 0 3px 0'}
        });
        var description = ui.Label({value: name,style: {margin: '0 0 0.5px 1px'}});
        return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});
  };
  for (var i = 0; i < 13; i++) {legend.add(makeRow(Palette[i], Names[i]));}
  Map.add(legend);
};
legend_discrete_lev2();
// Helper function to remap one value to another
var remap = function(filter, mymask, fvalue, psclc) {
    var fill = ee.Image(fvalue);
    var my_psclc = psclc.where(filter.and(mymask), fill);
    return my_psclc;
};
///////////////// Make your own map ////////////////////////
// Different rulesets
// Naive dominant land cover map
var fractions_to_dominant_lc = function fractions_to_dominant_lc(coverfractions)
{
  var maxfraction = coverfractions.reduce(ee.Reducer.max());
  var bandIndexes = ee.List.sequence(0, coverfractions.bandNames().size().subtract(1));
  var maxIndex = ee.ImageCollection(bandIndexes.map(function (i) {
        i = ee.Number(i);
        return ee.Image(i).updateMask(coverfractions.select(i).eq(maxfraction)).uint8();
      })
    ).mosaic();
  // Copy the legend from the original image
  maxIndex = ee.Image(maxIndex.copyProperties(image));
  // Remap numbers to the right values/colours
  maxIndex = maxIndex.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [20, 30, 40, 50, 60, 70, 80, 90, 100, 112]).rename("discrete_classification");
  return(maxIndex);
};
var MaxRuleMap = fractions_to_dominant_lc(coverfractions);
Map.addLayer(MaxRuleMap, {}, "Dominant land cover");
// Custom rules
var CustomRules = function CustomRules(psclc)
{
  var mask = ee.Image(1);
  var filter = ee.Image(0);
  // If urban is above 10%, then consider it urban
  filter = urban.gt(10);
  psclc = remap(filter, ee.Image(1), 50, psclc);
  mask = mask.and(filter.not());
  // If water is above 10%, cosider it water
  filter = water_permanent.gt(10);
  psclc = remap(filter, mask, 80, psclc);
  mask = mask.and(filter.not());
  // Create wetlands where we have herbaceous cover with at least some water
  filter = (grass.gt(50)).and(water_seasonal.gt(10));
  psclc = remap(filter, mask, 90, psclc);
  mask = mask.and(filter.not());
  // Consider shrubs as grass
  filter = shrub.add(grass).gt(50);
  psclc = remap(filter, mask, 30, psclc);
  mask = mask.and(filter.not());
  return(psclc);
};
var CustomisedMap = CustomRules(MaxRuleMap);
Map.addLayer(CustomisedMap, {}, "Map with custom rules");
// Example rules of Corine Lite
var fractions_to_corine_lite = function fractions_to_corine_lite(psclc) {
    var mask = ee.Image(1);
    var filter = ee.Image(0);
    filter = urban.gt(50);
    psclc = remap(filter, mask, 50, psclc);
    mask = mask.and(filter.not());
    filter = snow.gt(50);
    psclc = remap(filter, mask, 70, psclc);
    mask = mask.and(filter.not());
    filter = water_permanent.gt(50);
    psclc = remap(filter, mask, 80, psclc);
    mask = mask.and(filter.not());
    filter = trees.gt(70);  //CLC says 30?
    psclc = remap(filter, mask, 111, psclc);
    mask = mask.and(filter.not());
    filter = crops.gt(40);
    psclc = remap(filter, mask, 40, psclc);
    mask = mask.and(filter.not());
    filter = (grass.gt(50)).and(water_seasonal.gt(10));
    psclc = remap(filter, mask, 90, psclc);
    mask = mask.and(filter.not());
    filter = (shrub.gt(33)).and(grass.gt(60));
    psclc, mask = remap(filter, mask, 30, psclc);
    mask = mask.and(filter.not());
    filter = shrub.gt(33);
    psclc, mask = remap(filter, mask, 20, psclc);
    mask = mask.and(filter.not());
    filter = grass.gt(50);
    psclc = remap(filter, mask, 30, psclc);
    mask = mask.and(filter.not());
    filter = bare.gt(50);
    psclc = remap(filter, mask, 60, psclc);
    mask = mask.and(filter.not());
    filter = moss.gt(50);
    psclc = remap(filter, mask, 100, psclc);
    mask = mask.and(filter.not());
    filter = water_seasonal.gt(50);
    psclc = remap(filter, mask, 90, psclc);
    mask = mask.and(filter.not());
    //TODO left over pixels, take highest cover - MAX on collection returning index ?
    filter = water_permanent.gt(urban).and(water_permanent.gt(trees)).and(water_permanent.gt(crops)).and(water_permanent.gt(grass)).and(water_permanent.gt(bare)).and(water_permanent.gt(snow)).and(water_permanent.gt(moss));
    psclc = remap(filter, mask, 80, psclc);
    mask = mask.and(filter.not());
    filter = urban.gt(water_permanent).and(urban.gt(trees)).and(urban.gt(crops)).and(urban.gt(grass)).and(urban.gt(bare)).and(urban.gt(snow)).and(urban.gt(moss));
    psclc = remap(filter, mask, 50, psclc);
    mask = mask.and(filter.not());
    filter = crops.gt(urban).and(crops.gt(trees)).and(crops.gt(water_permanent)).and(crops.gt(grass)).and(crops.gt(bare)).and(crops.gt(snow)).and(crops.gt(moss));
    psclc = remap(filter, mask, 40, psclc);
    mask = mask.and(filter.not());
    filter = shrub.gt(urban).and(shrub.gt(trees)).and(shrub.gt(crops)).and(shrub.gt(grass)).and(shrub.gt(bare)).and(shrub.gt(snow)).and(shrub.gt(moss));
    psclc = remap(filter, mask, 20, psclc);
    mask = mask.and(filter.not());
    filter = grass.gt(urban).and(grass.gt(trees)).and(grass.gt(crops)).and(grass.gt(water_permanent)).and(grass.gt(bare)).and(grass.gt(snow)).and(grass.gt(moss));
    psclc = remap(filter, mask, 30, psclc);
    mask = mask.and(filter.not());
    filter = bare.gt(urban).and(bare.gt(crops)).and(bare.gt(grass)).and(bare.gt(water_permanent)).and(bare.gt(snow)).and(bare.gt(moss));
    psclc = remap(filter, mask, 60, psclc);
    mask = mask.and(filter.not());
    filter = snow.gt(urban).and(snow.gt(trees)).and(snow.gt(crops)).and(snow.gt(grass)).and(snow.gt(bare)).and(snow.gt(water_permanent)).and(snow.gt(moss));
    psclc = remap(filter, mask, 70, psclc);
    mask = mask.and(filter.not());
    filter = moss.gt(urban).and(moss.gt(trees)).and(moss.gt(crops)).and(moss.gt(grass)).and(moss.gt(bare)).and(moss.gt(snow)).and(moss.gt(water_permanent));
    psclc = remap(filter, mask, 100, psclc);
    mask = mask.and(filter.not());
    filter = trees.gt(0);
    psclc = remap(filter, mask, 112, psclc);
    mask = mask.and(filter.not());
    return psclc;
};
var corineLite = fractions_to_corine_lite(MaxRuleMap);
Map.addLayer(corineLite,{},'Discrete Corine Lite',false);
Map.setCenter(110.42, -7.88, 11);