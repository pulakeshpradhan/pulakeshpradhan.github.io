var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                34.70474243164062,
                32.37181642669841
              ],
              [
                34.70474243164062,
                31.778353466094142
              ],
              [
                35.12771606445312,
                31.778353466094142
              ],
              [
                35.12771606445312,
                32.37181642669841
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
        [[[34.70474243164062, 32.37181642669841],
          [34.70474243164062, 31.778353466094142],
          [35.12771606445312, 31.778353466094142],
          [35.12771606445312, 32.37181642669841]]], null, false),
    Settlements = ui.import && ui.import("Settlements", "table", {
      "id": "projects/adept-primer-299415/assets/Yeshuvim_with_clusters"
    }) || ee.FeatureCollection("projects/adept-primer-299415/assets/Yeshuvim_with_clusters");
var SETTLEMENT_NAME_FIELD = 'SHEM_YISHU'
var CLUSTER_FIELD = 'cluster'
var CitiesList = Settlements.aggregate_array(SETTLEMENT_NAME_FIELD).sort().distinct();
CitiesList = CitiesList.getInfo()
var CityName = CitiesList[0]
// var SelectedCity = GushDan.filter(ee.Filter.eq(SETTLEMENT_NAME_FIELD, CityName))
// var CityGeometry = SelectedCity.geometry();
// Map.centerObject(CityGeometry)
// Map.addLayer(SelectedCity)
var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2') 
    .filterDate('2022-06-01', '2022-09-01')
    .filterBounds(Settlements.geometry());
// print(dataset);
var LC = ee.ImageCollection('ESA/WorldCover/v200').first();
var LCnotBareSoil = LC.neq(60)
var LCmasked = LC.mask(LCnotBareSoil)
//create function to select only clear pixels in the images
var maskClouds=function(img){
  var clear=img.select('QA_PIXEL').bitwiseAnd(2).neq(0);
  return img.updateMask(clear); 
};
var dayTime = dataset.filter(ee.Filter.gt('SUN_ELEVATION',0))
                    .filter(ee.Filter.lt('CLOUD_COVER_LAND',3))
                  //   .map(maskClouds)
                    .median();
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true)
              .updateMask(LCmasked);
}
dataset = ee.ImageCollection(dayTime).map(applyScaleFactors);
var NDVI   = ee.Image(dataset.median()).normalizedDifference(['SR_B5','SR_B4']) //Shortcut
var LST = dataset.select('ST_B10').median()
                                  .subtract(273.15)
var visualization = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 0.3,
};
var Palette_NDVI = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', 
                    '3E8601', '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301'];
var Palette_LST  = ['178BE7', '2E97D0', '45A2B9', '5CAEA2', 'A2D05C', 'D0E72E', 'FFFF00', 'FFE700', 'FFD000',
                    'FFB900', 'FFA200', 'FF8B00', 'FF7000', 'FF5000', 'FF3000', 'FF1000', 'E71717'];
// Map.addLayer(dataset, visualization, 'True Color (432)');
// Map.addLayer(LST, {min: 39, max: 47, palette: Palette_LST}, 'LST');
// Map.addLayer(NDVI, {min: 0, max: 1, palette: Palette_NDVI}, 'NDVI');
var palette = ['FF0000', 'FFAA00', 'FFFF00'];
var empty = ee.Image().byte();
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: Settlements.filter(ee.Filter.gt(CLUSTER_FIELD, 0)),
  color: CLUSTER_FIELD,
});
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: Settlements,
  color: 1,
  width: 1
});
// Add reducer output to the Features in the collection.
var SelectedCityMeansLST = LST.reduceRegions({
  collection: Settlements,
  reducer: ee.Reducer.mean(),
  scale: 30,
});
// Add reducer output to the Features in the collection.
var SelectedCityNDVI = NDVI.reduceRegions({
  collection: SelectedCityMeansLST,
  reducer: ee.Reducer.count(),
  scale: 30,
});
var Veg = NDVI.gt(0.25).selfMask()
// Map.addLayer(Veg,{},'Vegetation')
var SelectedCityVeg = Veg.reduceRegions({
  collection: SelectedCityNDVI.select([CLUSTER_FIELD,'SHEM_YIS_1','YISHUV_STA','mean','count'],
                                        ['SocioEconomyCluster','Setl_name','YISHUV_STA','LSTmean','PixelsCount']),
  reducer: ee.Reducer.count(),
  scale: 30,
});
// print(ee.Feature(SelectedCityVeg.first()));
var VegCount = SelectedCityVeg.select(['SocioEconomyCluster','Setl_name','YISHUV_STA','LSTmean','PixelsCount','count'],
                                ['SocioEconomyCluster','Setl_name','YISHUV_STA','LSTmean','PixelsCount','VegCount'])
// print(VegCount)
// This function computes the feature's geometry area and adds it as a property.
var calcVegFrac = function(feature) {
      var VegCountVal = ee.Number(feature.get('VegCount'))
      var PixelsCountVal = ee.Number(feature.get('PixelsCount'))
  return feature.set({VegFrac: VegCountVal.divide(PixelsCountVal)});
  // return feature.set({VegFrac: feature.get('VegCount').divide(feature.get('PixelsCount'))});
};
// Map the calcVegFrac function over the FeatureCollection.
var VegFrac = VegCount.map(calcVegFrac);
// print(VegFrac)
//R-LST G-VegFrac B-SocioEconomyCluster
// Paint the interior of the polygons with Red colors.
var LSTfills = empty.paint({
  featureCollection: VegFrac.filter(ee.Filter.gt('SocioEconomyCluster', 0)),
  color: 'LSTmean',
});
var Rpalette = ['110000', '880000', 'FF0000'];
// Map.addLayer(LSTfills, {palette: Rpalette,min:40.0, max: 49.0, opacity: 1}, 'LST fills');
// Paint the interior of the polygons with Green colors.
var Vegfills = empty.paint({
  featureCollection: VegFrac.filter(ee.Filter.gt('SocioEconomyCluster', 0)),
  color: 'VegFrac',
});
var Gpalette = ['001100', '008800', '00FF00'];
// Map.addLayer(Vegfills, {palette: Gpalette,min:0, max: 0.95, opacity: 1}, 'Veg fills');
// Paint the interior of the polygons with Blue colors.
var Clusterfills = empty.paint({
  featureCollection: VegFrac.filter(ee.Filter.gt('SocioEconomyCluster', 0)),
  color: 'SocioEconomyCluster',
});
var Bpalette = ['000011', '000088', '0000FF'];
// Map.addLayer(Clusterfills, {palette: Bpalette,min:1, max: 10, opacity: 1}, 'SocioEconomyCluster fills');
var rgbCombin = ee.Image.rgb(LSTfills, Vegfills, Clusterfills)
// Map.addLayer(rgbCombin,{min:[40.0,0.0,1], max:[49.0,0.95,10]},'rgbCombin')
// Configure the map.
ui.root.clear();
var panel = ui.Panel({style: {width: '250px'}});
var map = ui.Map();
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
ui.root.add(panel).add(map);
// var panel = ui.Panel({style: {width: '400px'}})
//     .add(ui.Label('Click on the map'));
// map.setCenter(34.8174, 32.0746, 14);
// Map.centerObject(CityGeometry)
map.style().set('cursor', 'crosshair');
var calcLST = function(vegFrac) {
  };
// Create a label and slider.
var slider = ui.Slider({
  min: 0,
  max: 100,
  step: 5,
  onChange: calcLST,
  style: {stretch: 'horizontal'}
});
// Create the inspector panel, initially hiding it.
var inspector = ui.Panel({
  style: {shown: false},
  layout: ui.Panel.Layout.flow('vertical')
});
map.add(inspector);
// Set a callback function for when the user clicks the map.
map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                'lat: ' + coords.lat.toFixed(2);
  // panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  map.layers().set(2, ui.Map.Layer(point, {color: 'FF0000'}));
  var sample = ee.Image.cat(LSTfills, Vegfills, Clusterfills)
      .unmask(0).sample(point, 30).first().toDictionary();
  print(sample)
  sample.evaluate(function(values) {
    inspector.clear();
    inspector.add(ui.Label('טמפרטורת פני הקרקע: ' + values.constant + ' מעלות צלזיוס'));
    inspector.add(ui.Label('אחוז כיסוי צמחי: ' + (ee.Number(values.constant_1).multiply((100))).getInfo().toFixed(2)+ ' אחוז'));
    inspector.add(ui.Label('אשכול חברתי-כלכלי: ' + values.constant_2));
    inspector.add(ui.Label('צפי הטמפרטורה בהנחה שנגדיל את אחוז כיסוי הצומח:'));
    inspector.add(slider);
    inspector.add(ui.Button('סגור', function() {
        inspector.style().set({shown: false});
      }));
    inspector.style().set({shown: true});
  });
});
var selectCity = ui.Select({
  items: CitiesList,
  value: CitiesList[2],
  onChange: redraw,
});
panel.add(ui.Label('בחר ישוב:')).add(selectCity);
// Define some constants.
var LST = 'טמפרטורת פני הקרקע מלוויין';
var VEGETATION = 'כיסוי צמחיה מלוויין';
var CLUSTER = 'אשכול חברתי-כלכלי';
var RGB = 'טמפרטורה R, צמחיה G, אשכול B';
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [LST, VEGETATION, CLUSTER, RGB],
  value: CLUSTER,
  onChange: redraw,
});
panel.add(ui.Label('הצג נתונים:')).add(select);
// Add the panel to the ui.root.
// ui.root.add(panel);
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  var layer = select.getValue();
  var CityName = selectCity.getValue();
  var image;
  var vis;
  var Rpalette = ['110000', '880000', 'FF0000'];
  var Gpalette = ['001100', '008800', '00FF00'];
  var Bpalette = ['000011', '000088', '0000FF'];
  if (layer == LST) {
    image = LSTfills;
    vis = {palette: Rpalette,min:40.0, max: 49.0, opacity: 1};
  } else if (layer == VEGETATION) {
    image = Vegfills;
    vis = {palette: Gpalette,min:0, max: 0.95, opacity: 1};
  } else if (layer == CLUSTER) {
    image = Clusterfills;
    vis = {palette: Bpalette,min:1, max: 10, opacity: 1};
  } else if (layer == RGB) {
    image = rgbCombin;
    vis = {min:[40.0,0.0,1], max:[49.0,0.95,10]};
  }  
  var SelectedCity = Settlements.filter(ee.Filter.eq(SETTLEMENT_NAME_FIELD, CityName))
  var CityGeometry = SelectedCity.geometry();
  map.centerObject(CityGeometry)
  // Create an empty image into which to paint the features, cast to byte.
  var empty = ee.Image().byte();
  // Paint all the polygon edges with the same number and width, display.
  var SelectedCityOutline = empty.paint({
  featureCollection: SelectedCity,
  color: 1,
  width: 1
  });
  // map.addLayer(SelectedCity)
  map.addLayer(image, vis, layer);
  map.addLayer(SelectedCityOutline, {palette: 'FFFFFF'}, 'CityName');
}
// Invoke the redraw function once at start up to initialize the map.
redraw();