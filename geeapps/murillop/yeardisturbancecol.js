var sentinel = ee.Image("users/murillop/CODED/Sentinel2018_SanLucas"),
    sen = {"opacity":1,"bands":["nir","swir1","red"],"min":218.54000000000002,"max":3844.46,"gamma":1},
    jrc = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-71.93122480648663, 12.383265630276453],
          [-77.11677168148663, 8.79856672104063],
          [-78.03962324398663, 7.057625062180714],
          [-77.60017011898663, 3.7769038855200727],
          [-79.22614668148663, 1.7139568310040572],
          [-77.46833418148663, 0.0003453255866046526],
          [-76.39616992855156, 0.15410409548068116],
          [-74.93498828792656, -0.3402784839717842],
          [-73.27605274105156, -2.229366176219816],
          [-72.80364063167656, -2.580618460097596],
          [-71.71599414730156, -2.5147656504537834],
          [-70.95793750667656, -2.481837993587889],
          [-70.23283985042656, -2.8110758616454095],
          [-70.83708789730156, -3.874920884209089],
          [-69.81535938167656, -4.335161622081877],
          [-69.27702930355156, -1.03236329165706],
          [-69.88127735042656, -0.07660858651753175],
          [-69.95818164730156, 0.4617164714671324],
          [-69.07927539730156, 0.5715752694583065],
          [-69.09026172542656, 1.0768924336255505],
          [-69.77141406917656, 1.153782154239152],
          [-69.73845508480156, 1.626053928896609],
          [-68.24431445980156, 1.669981062951382],
          [-67.49724414730156, 1.9774420651851032],
          [-67.18962695980156, 1.1427980324382996],
          [-66.72820117855156, 1.1647662336301958],
          [-67.11272266292656, 2.361687189717132],
          [-67.53020313167656, 2.8555581047803393],
          [-67.20061328792656, 3.404053045451793],
          [-67.72795703792656, 4.927073222912777],
          [-67.28850391292656, 6.075305027609531],
          [-67.54118945980156, 6.4356945894091755],
          [-69.29900195980156, 6.195462403585065],
          [-70.10100391292656, 7.068478758481918],
          [-71.97966602230156, 7.122989683104855],
          [-72.37517383480156, 8.461798163766321],
          [-72.95744922542656, 9.438516076023191],
          [-72.74870899105156, 10.55291248841579],
          [-71.89177539730156, 11.534141907997176],
          [-70.97991016292656, 12.007373802469363],
          [-71.26555469417656, 12.479775827197646],
          [-71.81487110042656, 12.533403998633986]]]),
    image3 = ee.Image("users/murillop/CH3/Colombia_1998_2008"),
    image4 = ee.Image("users/murillop/CH3/Colombia_2005_2018"),
    hansen = ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    imageCollection = ee.ImageCollection("LANDSAT/LT4_L1T_ANNUAL_EVI"),
    LT4 = ee.Image("LANDSAT/LT4_L1T_ANNUAL_EVI/1988"),
    image = ee.Image("users/murillop/CH3/Colombia_1984_1994"),
    image2 = ee.Image("users/murillop/CH3/Colombia_1991_2001");
////////////////Gray background/////////////////////
var GRAYMAP = [
    {   // Dial down the map saturation.
    stylers: [ { saturation: -100 } ],
    //stylers: [{color: '#382e61'}]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];
//Map.addLayer(sentinel, sen,  'sentinel').setShown(0)
var countries_PCC3 = countries.filter(ee.Filter.inList('country_na', 
['Colombia', 'El Salvador' ,'Nepal', 'Angola', 'Liberia', 'Sierra Leone', 'Indonesia', 'Peru','Sri Lanka', 'Ivory Coast']));
var colombian_poly = countries.filter(ee.Filter.inList('country_na', 
['Colombia']));
Map.centerObject(colombian_poly, 5)
//Map.addLayer(LT4.clip(colombian_poly), {}, 'L4')
// Algorithm parameters
var params = ee.Dictionary({
     'cloud_score': 80,
     'cfThreshold': .05,
     'consec': 3,
     'thresh': 5,
     'minRMSE': .015,
     'start': '1987-01-01', 
     'end': '2018-12-31',
     'iteration': 1,
     'soil': [2000, 3000, 3400, 5800, 6000, 5800],
     'gv': [500, 900, 400, 6100, 3000, 1000],
     'npv': [1400, 1700, 2200, 3000, 5500, 3000],
     'shade': [0, 0, 0, 0, 0, 0],
     'cloud': [9000, 9600, 8000, 7800, 7200, 6500],
     'forestLabel': 1,
     'minPatch': 10
      })
function makeMask(input, minSize) {
  // Return a mask for patches greater than minSize
  var minPatches = input.connectedPixelCount(minSize, true)
                      .gte(minSize)
  return minPatches
}
// Make a mask where patches are greater than minSize
var minSize = ee.Number.parse(params.get('minPatch'))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Image 1988-1994
var minSizeMask = makeMask(image.select('dist_1').gt(0), minSize)
//Map.addLayer(minSizeMask, {palette: ['green']}, 'size')
// Change magnitude
var changeMag = image.select('mag_1')
                      .updateMask(minSizeMask).updateMask(image.select('mag_1').gt(13))
// Dates of change
var changeDate = image.select('dist_1')
                    .updateMask(minSizeMask).updateMask(changeMag)//.updateMask(occurrence.neq(1))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Image 1995-2004
var minSizeMask2 = makeMask(image2.select('dist_1').gt(0), minSize)
// Change magnitude
var changeMag2 = image2.select('mag_1')
                      .updateMask(minSizeMask2).updateMask(image2.select('mag_1').gt(13))
// Dates of change
var changeDate2 = image2.select('dist_1')
                    .updateMask(minSizeMask2).updateMask(changeMag2)//.updateMask(occurrence.neq(1))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Image 2002-2008
var minSizeMask3 = makeMask(image3.select('dist_1').gt(0), minSize)
// Change magnitude
var changeMag3= image3.select('mag_1')
                      .updateMask(minSizeMask3).updateMask(image3.select('mag_1').gt(13))
// Dates of change
var changeDate3 = image3.select('dist_1')
                    .updateMask(minSizeMask3).updateMask(changeMag3)//.updateMask(occurrence.neq(1))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Image 2009-2018
var minSizeMask4 = makeMask(image4.select('dist_1').gt(0), minSize)
// Change magnitude
var changeMag4= image4.select('mag_1')
                      .updateMask(minSizeMask4).updateMask(image4.select('mag_1').gt(13))
// Dates of change
var changeDate4 = image4.select('dist_1')
                    .updateMask(minSizeMask4).updateMask(changeMag4)//.updateMask(occurrence.neq(1))
/////////////////////////////////////////////////////////////////////////////////////////////////////
//Water 
var dataset = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = dataset.select('occurrence');
var occurrenceVis = {
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', '6a5acd', '523ae6', '0000ff'],
};
Map.addLayer(occurrence.clip(colombian_poly), occurrenceVis, 'Water Occurrence');
////////////////////////////////////////////////////////////////////////////////////////////////////////
var colombia = changeDate.addBands(changeDate2).addBands(changeDate3).addBands(changeDate4)
colombia = ee.ImageCollection([changeDate,changeDate2,changeDate3,changeDate4])
var colombia_combo = colombia.max().updateMask(occurrence.unmask().lt(1)).clip(colombian_poly);
Map.addLayer(colombia_combo, {min: 1988, 
                            max: 2018, 
                          // palette: ['#0000ff','#392cf7','#4f43ee','#5c57e6','#6569dd','#6b7ad4','#6f8ccb','#709bc2','#6eacb8','#6abdaf','#61cea4','#55de99','#3fee8c','#00ff7f']}, 'Change date').setShown(0);
                            palette: ['#e66101','#fdb863','#f7f7f7','#b2abd2','#5e3c99']}, 'Disturbances 1988-1994 [nonfilter]');                         
//finds all of the connected pixels in an 8-way connections
var patches = colombia_combo.connectedPixelCount(1024, true);
//assignes each connected patch (by a square kernal) a unique ID
var connected = patches.connectedComponents(ee.Kernel.square(3), 256);
//selects the connected patches that have more than 22 pixels (22 pixels x 900m2 = 19,800 m2, 200m2 short of 2ha)
var forest_connected_twotwo = connected.select('dist_1').gte(11);
//REMOVE UNNEEDED PIXELS!!!! vectorizing will take forever if you don't mask out the unused pixels
var colombia_combo1 = colombia_combo.updateMask(forest_connected_twotwo);
Map.addLayer(colombia_combo1, {min: 1988, 
                            max: 2018, 
                           // palette: ['#0000ff','#392cf7','#4f43ee','#5c57e6','#6569dd','#6b7ad4','#6f8ccb','#709bc2','#6eacb8','#6abdaf','#61cea4','#55de99','#3fee8c','#00ff7f']}, 'Change date').setShown(0);
                            palette: ['#e66101','#fdb863','#f7f7f7','#b2abd2','#5e3c99']}, 'Disturbance 1988-2018 [filtered but slow]');                          
//var mapPanel = ui.Map()
//Adding cursor ang grey background  
Map.setOptions('GRAYMAP', {'GRAYMAP': GRAYMAP}).setControlVisibility(false, true, true, true, true, false) //retro, dark, GRAYMAP
// Make legends
var makeRow = function(color, name) {
  // Make a row of a legend
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
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
// Legend
var legend = ui.Panel({style: {shown: false, width: '150px'}});
legend.style().set({position: 'bottom-right'});
var legendMaps = ui.Panel({style: {shown: true, width: '150px'}});
legendMaps.style().set({position: 'bottom-right'});
legendMaps.add(ui.Label('Disturbance Year'));
legendMaps.add(makeRow('#e66101', '1988'));
legendMaps.add(makeRow('#5e3c99', '2018'));
// Add the panels to the ui.root.
Map.add(legend)
Map.add(legendMaps)
// Map.addLayer(changeMag, {min: 0, 
//                             max: 50, 
//                             palette: ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494']}, 
//                             'Change magnitude 1988-1994')
// Select a dataset, filtering down to the bands that we're interested in.
/*
  // Compute the histogram of the disturbance date 1984-1994
var histogram = changeDate.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: geometry,
  maxPixels: 1e13
});
print(histogram, 'histogram 1984-1994')
var h = ee.Dictionary(histogram.get('dist_1')).get('histogram')
var x = ee.Dictionary(histogram.get('dist_1')).get('bucketMeans')
x = ee.List(x).map(function(v) {return ee.String(v)})
var c = ui.Chart.array.values(h, 0, x)
                .setChartType('ColumnChart')
print(c)
  // Compute the histogram of the disturbance date 1995-2001
var histogram1 = changeDate2.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: geometry,
  maxPixels: 1e13
});
print(histogram1, 'histogram 1995-2001')
var h1 = ee.Dictionary(histogram1.get('dist_1')).get('histogram')
var x1 = ee.Dictionary(histogram1.get('dist_1')).get('bucketMeans')
x1 = ee.List(x1).map(function(v) {return ee.String(v)})
var c1 = ui.Chart.array.values(h1, 0, x1)
                .setChartType('ColumnChart')
print(c1)
  // Compute the histogram of the disturbance date 2002-2008
var histogram3 = changeDate3.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: geometry,
  maxPixels: 1e13
});
print(histogram3, 'histogram 2002-2008')
var h2 = ee.Dictionary(histogram3.get('dist_1')).get('histogram')
var x2 = ee.Dictionary(histogram3.get('dist_1')).get('bucketMeans')
x2 = ee.List(x2).map(function(v) {return ee.String(v)})
var c2 = ui.Chart.array.values(h2, 0, x2)
                .setChartType('ColumnChart')
print(c2)
  // Compute the histogram of the disturbance date 2002-2008
var histogram4 = changeDate4.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: geometry,
  maxPixels: 1e13
});
print(histogram4, 'histogram 2009-2018')
var h3 = ee.Dictionary(histogram4.get('dist_1')).get('histogram')
var x3 = ee.Dictionary(histogram4.get('dist_1')).get('bucketMeans')
x3 = ee.List(x3).map(function(v) {return ee.String(v)})
var c3 = ui.Chart.array.values(h3, 0, x3)
                .setChartType('ColumnChart')
print(c3)
    // Compute the histogram of the disturbance date 1984-2018
var h_hansen = hansen.select('lossyear').updateMask(hansen.select('lossyear').gt(0))
var h_hansen = h_hansen.reduceRegion({
  reducer: ee.Reducer.histogram(),
  scale: 30,
  geometry: geometry,
  maxPixels: 1e13
});
print(h_hansen, 'Hansen 1987-2018')
var h5 = ee.Dictionary(h_hansen.get('lossyear')).get('histogram')
var x5 = ee.Dictionary(h_hansen.get('lossyear')).get('bucketMeans')
x5 = ee.List(x5).map(function(v) {return ee.String(v)})
var c5 = ui.Chart.array.values(h5, 0, x5)
                .setChartType('ColumnChart')
print(c5)
*/