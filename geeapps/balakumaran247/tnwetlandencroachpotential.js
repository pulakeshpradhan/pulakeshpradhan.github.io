var state = ui.import && ui.import("state", "table", {
      "id": "users/balakumaran247/TamilNadu/TN_State"
    }) || ee.FeatureCollection("users/balakumaran247/TamilNadu/TN_State"),
    wetland = ui.import && ui.import("wetland", "table", {
      "id": "users/balakumaran247/TamilNadu/Wetland_Dissolve"
    }) || ee.FeatureCollection("users/balakumaran247/TamilNadu/Wetland_Dissolve"),
    bp = ui.import && ui.import("bp", "table", {
      "id": "users/balakumaran247/wetland_encroach/bad_pixels"
    }) || ee.FeatureCollection("users/balakumaran247/wetland_encroach/bad_pixels"),
    bp2 = ui.import && ui.import("bp2", "table", {
      "id": "users/balakumaran247/wetland_encroach/bad_pixels_2"
    }) || ee.FeatureCollection("users/balakumaran247/wetland_encroach/bad_pixels_2"),
    nw = ui.import && ui.import("nw", "table", {
      "id": "users/balakumaran247/wetland_encroach/non_wetland"
    }) || ee.FeatureCollection("users/balakumaran247/wetland_encroach/non_wetland"),
    nw2 = ui.import && ui.import("nw2", "table", {
      "id": "users/balakumaran247/wetland_encroach/non_wetland_2"
    }) || ee.FeatureCollection("users/balakumaran247/wetland_encroach/non_wetland_2"),
    wl = ui.import && ui.import("wl", "table", {
      "id": "users/balakumaran247/wetland_encroach/wetland"
    }) || ee.FeatureCollection("users/balakumaran247/wetland_encroach/wetland"),
    wl2 = ui.import && ui.import("wl2", "table", {
      "id": "users/balakumaran247/wetland_encroach/wetland_2"
    }) || ee.FeatureCollection("users/balakumaran247/wetland_encroach/wetland_2");
/*  the present date and start date
    to be used in filtering satellite data
    and to display in Title */
var now = ee.Date(Date.now());
var present_year = now.get('year');
var year_twelve = now.advance(-12, 'month');
var year_twenty_four = now.advance(-24, 'month');
ui.root.clear(); // Clear default UI to use custom layout and widgets
/*  Title for the app with dynamically changing Year  */
var title = ui.Label('Tamil Nadu Wetland Encroachment Potential', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
present_year.evaluate(function(value){
  title.setValue('Tamil Nadu Wetland Encroachment Potential - '+ 
    JSON.stringify(value))});
/*  Panel at the left to hold the controls  */
var panel_left = ui.Panel();
panel_left.style().set({
  width: '20%',
  height: '100%',
  //border: '1px solid black',
  margin: '4px',
  position: 'middle-left',
  stretch: 'vertical',
});
panel_left.add(title);
/*  Main Map widget with custom style */
var map = ui.Map();
var styledMapType = {
  Grey: [
    {stylers: [{ saturation: -80 }]},
    { featureType: 'road', elementType: 'geometry',
      stylers: [{ lightness: 100 },{ visibility: 'simplified' }]},
    { featureType: 'road', elementType: 'labels'},
    { featureType: 'water', stylers: [{ visibility: 'simplified' }]},
    { featureType: "administrative", elementType: "geometry", 
                    stylers: [{ visibility: 'simplified' }]}
  ]
};
map.setOptions("Grey", styledMapType);
map.setControlVisibility({
  all: false,
  zoomControl: true,
  layerList: true,
  scaleControl: true,});
map.style().set('cursor', 'crosshair');
map.centerObject(state);
/*  Grid layout to the app  */
var mapGrid = ui.Panel();
mapGrid.style().set({
  width: '100%',
  height: '100%',
  border: '1px solid black',
  stretch: 'horizontal',
});
mapGrid.setLayout(ui.Panel.Layout.Flow('horizontal'));
mapGrid.add(panel_left);
mapGrid.add(map);
/*  reset the welcome screen to new layout  */
ui.root.widgets().reset([mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
/*  ------------------------ Model Training -------------------------- */
/* Calculate the necessary indices and add them as bands to images */
var addIndices = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi');
  var ndbi = image.normalizedDifference(['B11', 'B8']).rename('ndbi');
  var mndwi = image.normalizedDifference(['B3', 'B11']).rename('mndwi');
  var lswi = image.normalizedDifference(['B8', 'B11']).rename('lswi');
  var bsi = image.expression(
      '(( X + Y ) - (A + B)) /(( X + Y ) + (A + B)) ', {
        'X': image.select('B11'), //swir1
        'Y': image.select('B4'),  //red
        'A': image.select('B8'), // nir
        'B': image.select('B2'), // blue
  }).rename('bsi');
  return image.addBands(ndvi).addBands(ndbi).addBands(mndwi).addBands(lswi).addBands(bsi);
};
var collection = ee.ImageCollection(ee.List([ee.Image('COPERNICUS/S2/20180302T045709_20180302T045910_T44PMV'),
                    ee.Image('COPERNICUS/S2/20180908T045649_20180908T051218_T44PLS'),
                    ee.Image('COPERNICUS/S2/20180322T045649_20180322T051156_T44PLU'),
                    ee.Image('COPERNICUS/S2/20180320T050651_20180320T051739_T43PGN'),
                    ee.Image('COPERNICUS/S2/20180404T050649_20180404T051134_T43PHP')]))
                    .select('B.*').map(addIndices)
                    .mosaic();
var points = bp.map(function(ft){return ee.Feature(ft).set('class', 2)})
              .merge(bp2.map(function(ft){return ee.Feature(ft).set('class', 2)}))
              .merge(nw.map(function(ft){return ee.Feature(ft).set('class', 0)}))
              .merge(nw2.map(function(ft){return ee.Feature(ft).set('class', 0)}))
              .merge(wl.map(function(ft){return ee.Feature(ft).set('class', 1)}))
              .merge(wl2.map(function(ft){return ee.Feature(ft).set('class', 1)}));
points = points.randomColumn();
var test_points = points.filter('random < 0.3');
var train_points = points.filter('random >= 0.3');
var training = collection.sampleRegions({
  collection: train_points, 
  properties: ['class'], 
  scale: 10,
  tileScale: 16,
});
var classifier = ee.Classifier.smileGradientTreeBoost({
  numberOfTrees:100, 
  shrinkage:0.005,
  samplingRate:0.7,
  loss:'LeastAbsoluteDeviation',
}).train({
  features: training,  
  classProperty: 'class',
  inputProperties: collection.bandNames()
});
/*  ------------------------- Left Panel Elements  -------------------------- */
/* Description */
var wetland_desc = ui.Label(
  'Classification of Sentinel-2 dataset using \
  Gradient Tree Boost Classifier \
  characterizing Wetland Encroachment Potential \
  for Tamil Nadu. \
  The Wetland Boundary layer \
  is mapped for the period \
  2017-2018 at 1:50,000 scale.',{
  fontSize: '16px',
  textAlign: 'justify',
});
panel_left.add(wetland_desc);
/* Wetland class legend */
var colorTable = {
  'Aquaculture Pond': '#017f97',
  'Creek': '#0c3026',
  'Lagoon': '#811c43',
  'Lake/Pond': '#462b56',
  'Mangrove': '#d2a931',
  'Reservoir/Barrage': '#02b58a',
  'River/Stream': '#ffd35c',
  'Riverine Wetland': '#ea3e70',
  'Salt Marsh': '#8a9747',
  'Tank/Pond': '#0180b5',
  'Waterlogged': '#8080d7',
};
var legend = ui.Panel({
style: {
  margin: '4px',
  stretch: 'horizontal',
  }
});
var legendTitle = ui.Label('Wetland Classes',{fontWeight: 'bold',fontSize: '18px',});
legend.add(legendTitle);
var makeRow = function(color, name) {
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        padding: '8px',
        margin: '0 0 4px 4px'
      }
    });
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
};
var names = ['Aquaculture Pond','Creek','Lagoon', 'Lake/Pond', 'Mangrove', 'Reservoir/Barrage',
              'River/Stream', 'Riverine Wetland', 'Salt Marsh', 'Tank/Pond', 'Waterlogged'];
for (var i = 0; i < Object.keys(colorTable).length; i++) {
  legend.add(makeRow(colorTable[names[i]], names[i]));
}
panel_left.add(legend);
/* wetland boundary visibility checkbox */
var wl_bound_vis_cb = ui.Checkbox('Show Wetland Boundary', false);
wl_bound_vis_cb.onChange(function(status) {
  var names = [];
  map.layers().forEach(function(lay) {
    names.push(lay.getName());
  });
  var index = names.indexOf('wetland_boundary');
  map.layers().get(index).setShown(status);
});
panel_left.add(wl_bound_vis_cb);
/* Encroachment Potential Legend */
var potential_colors = ['red', 'yellow', 'grey', 'orange'];
var pot_legend = ui.Panel({
style: {
  margin: '4px',
  stretch: 'horizontal',
  }
});
var pot_legendTitle = ui.Label('Encroachment Potential',{fontWeight: 'bold',fontSize: '18px',});
pot_legend.add(pot_legendTitle);
var pot_names = ['Permanent', 'Low', 'No Change', 'High'];
for (var i = 0; i < potential_colors.length; i++) {
  pot_legend.add(makeRow(potential_colors[i], pot_names[i]));
}
panel_left.add(pot_legend);
/* Empty Space */
var empty_space = ui.Panel({
style: {
  stretch: 'both',
  }
});
panel_left.add(empty_space);
/* Lable - Name */
var author_label = ui.Label(' - Balakumaran Ramachandran',{
  fontWeight: 'bold',
  fontSize: '18px',
  width: '95%',
  textAlign: 'right',
  position: 'bottom-center',
});
panel_left.add(author_label);
/*  ----------------------------  Map Elements  ----------------------------  */
/* Lable - Instruction */
var instruction_label = ui.Label('Click on a region to generate Encroachment Potential map...',{
  fontSize: '14px',
  textAlign: 'center',
  position: 'top-center',
});
map.add(instruction_label);
var count = 0;
/* Encroachment Potential Map Generation */
function classify_image(image){
  return image.classify(classifier);
}
function ratio_calculation(classified){
  var numerator = classified.map(function(img){return img.updateMask(img.neq(2))}).sum();
  var denominator = classified.count().subtract(classified.map(function(img){return img.eq(2)}).sum());
  return numerator.divide(denominator);
}
function grab_ratio(geometry, start, end){
  var collection = ee.ImageCollection("COPERNICUS/S2")
                    .filterBounds(geometry)
                    .filterDate(start, end)
                    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
                    .select('B.*').map(addIndices);//.map(normalize);
  var classified = collection.map(classify_image);
  return ratio_calculation(classified);
}
map.onClick(function(p) {
  var geometry = ee.Geometry.Point([p.lon,p.lat]);
  map.centerObject(geometry,10);
  var year_n = grab_ratio(geometry,year_twelve,now);
  var year_n_minus1 = grab_ratio(geometry,year_twenty_four,year_twelve);
  var difference = year_n_minus1.subtract(year_n);
  var permanent = (year_n_minus1.eq(0).and(year_n.eq(0))).multiply(2);
  var setPalletes = function(image){
    image = image.select('classification');
    var image01 = image.gte(-1);
    var image02 = image.gte(0);
    var image03 = image.gt(0);
    return image01.add(image02).add(image03);
  };
  var encroached = setPalletes(difference.subtract(permanent));
  map.addLayer(encroached.clip(wetland),
              {bands: ['classification'],
              min: 0,
              max: 3,
              palette: potential_colors,
              },
              'encroachment');
  if (count==2){
    instruction_label.setValue('if experiencing slow downs... Refresh the app.');
  }
  count = count+1;
});
/* Wetland Boundary */
var wl_styled = wetland
  .map(function (feature) {
    return feature.set('style', {
      color: ee.Dictionary(colorTable).get(feature.get('LEVEL_III'), '000000'),
      fillColor: '00000000',
    });
  })
  .style({
    styleProperty: 'style',
  });
map.addLayer(wl_styled,{},'wetland_boundary',false);
/* State Boundary */
map.addLayer(state.style({
  color: '#000000',
  fillColor: '00000000'
}),{},'state_boundary');