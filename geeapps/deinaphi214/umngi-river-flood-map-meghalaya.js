var image = ui.import && ui.import("image", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    geom = ui.import && ui.import("geom", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                91.35425354028716,
                25.231283860980753
              ],
              [
                91.33914733911529,
                25.217307504461616
              ],
              [
                91.3508203127481,
                25.166357864729214
              ],
              [
                91.36558319116607,
                25.155170945932255
              ],
              [
                91.38789917016997,
                25.156413987573963
              ],
              [
                91.39270568872466,
                25.162629005798305
              ],
              [
                91.39304901147857,
                25.172261658182684
              ],
              [
                91.39064575220122,
                25.18655386883474
              ],
              [
                91.39030242944732,
                25.201465692616317
              ],
              [
                91.39030242944732,
                25.21389081750145
              ],
              [
                91.38034606958404,
                25.2263146737806
              ],
              [
                91.3676431276895,
                25.23190499510239
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[91.35425354028716, 25.231283860980753],
                  [91.33914733911529, 25.217307504461616],
                  [91.3508203127481, 25.166357864729214],
                  [91.36558319116607, 25.155170945932255],
                  [91.38789917016997, 25.156413987573963],
                  [91.39270568872466, 25.162629005798305],
                  [91.39304901147857, 25.172261658182684],
                  [91.39064575220122, 25.18655386883474],
                  [91.39030242944732, 25.201465692616317],
                  [91.39030242944732, 25.21389081750145],
                  [91.38034606958404, 25.2263146737806],
                  [91.3676431276895, 25.23190499510239]]]),
            {
              "system:index": "0"
            })]);
var geom1 = geom.geometry();
Map.centerObject(geom,14);
// Sentinel 1 based extraction
var premonsoon_year = 2015;
var premonsoon_month = 05;
var postmonsoon_year = 2022;
var postmonsoon_month = 7;
var sentinel1 = ee.ImageCollection("COPERNICUS/S1_GRD");
var srtm = ee.Image("USGS/SRTMGL1_003");
////////////////// Functions
// var extract_water_sar_vh = function(month, year){
//   var startdate = ee.Date.fromYMD(year,month,1);
//   var enddate = ee.Date.fromYMD(year,month,30);
//   var filtered1 = sentinel1
//   .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
//   .select('VH').filterDate(startdate, enddate).filterBounds(geom)
//   .sort('system:time_start', false).first();
//   // print('filtered', filtered1);
//   var mean1 = filtered1.reduce(ee.Reducer.median());  //.mean
//   // Slope Correction
//   var terrain = ee.Algorithms.Terrain(dem);
//   var slope = terrain.select('slope').clip(geom);
//   mean1 = mean1.mask(slope.lt(5));
//   Map.addLayer(mean1,{min:-30, max: 5}, "VH "+year);
//   // Water Detection
//   var SMOOTHING_RADIUS = 80;
//   var diff_smoothed = mean1.focal_median(SMOOTHING_RADIUS, 'circle', 'meters');
//   var water12w = diff_smoothed.lt(-25);
//   var erode = function(img, distance) {  //N.gorelick code
//     var d = img.not().unmask(1).fastDistanceTransform(distance).sqrt();  //.multiply(ee.Image.pixelArea().sqrt())
//     return img.updateMask(d.gt(distance));
//   };
//   var dilate = function(img, distance) {
//     var d = img.fastDistanceTransform(distance).sqrt();  // .multiply(ee.Image.pixelArea().sqrt())
//     return d.lt(distance).selfMask();
//   };
//   var out12 = dilate(water12w, 4);
//   return erode(out12, 4);
// };
var extract_water_sar_vv = function(month, year){
  var startdate = ee.Date.fromYMD(year,month,1);
  var enddate = ee.Date.fromYMD(year,month,30);
  var filtered1 = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .select('VV').filterDate(startdate, enddate).filterBounds(geom1)
  .sort('system:time_start', false)//.first();
  var mean1 = filtered1.reduce(ee.Reducer.median());  //.mean
  //Map.addLayer(mean1,{min:-30, max: 5}, "VV "+ year);
  // Slope Correction
  var terrain = ee.Algorithms.Terrain(srtm);
  var slope = terrain.select('slope').clip(geom1);
  mean1 = mean1.mask(slope.lt(5));
  // Water Detection
  var SMOOTHING_RADIUS = 50;
  var diff_smoothed = mean1.focal_median(SMOOTHING_RADIUS, 'circle', 'meters');
  var water12w = diff_smoothed.lt(-15);//INCREASE VALUES FOR BIGGER RIVER AND DECREASE FOR SMALLER RIVER
  //Map.addLayer(water12w,{}, "water detection "+year);
  var erode = function(img, distance) {  //N.gorelick code
    var d = img.not().unmask(1).fastDistanceTransform(distance).sqrt();  //.multiply(ee.Image.pixelArea().sqrt())
    return img.updateMask(d.gt(distance));
  };
  var dilate = function(img, distance) {
    var d = img.fastDistanceTransform(distance).sqrt();  // .multiply(ee.Image.pixelArea().sqrt())
    return d.lt(distance).selfMask();
  };
  var out12 = dilate(water12w, 4);
  return erode(out12, 4);
};
// var newp40_postmonsoonvh = extract_water_sar_vh(postmonsoon_month, postmonsoon_year);
// var newp40_premonsoonvh = extract_water_sar_vh(premonsoon_month, premonsoon_year);
var newp40_postmonsoonvv = extract_water_sar_vv(postmonsoon_month, postmonsoon_year);
var newp40_premonsoonvv = extract_water_sar_vv(premonsoon_month, premonsoon_year);
var create_binary = function(inp_vector, inp_raster){
  // var vect = inp_vector.geometry();
  var image11 = ee.Image().byte().paint(inp_vector, 0);
  var ouput = inp_raster.unmask(image11, false);
  return ouput;
};
var vectordata = geom1.buffer(100);
var newp40_premonsoon = create_binary(vectordata,newp40_premonsoonvv);
var newp40_postmonsoon = create_binary(vectordata, newp40_postmonsoonvv);
// UNCOMMENT IF YOU WANT EROSION AND DEPOSITION
var erosion = ((newp40_premonsoon.eq(0).and(newp40_postmonsoon.eq(1)))
.multiply(2)).rename("erosion");
var deposition = ((newp40_premonsoon.eq(1).and(newp40_postmonsoon.eq(0)))
.multiply(3)).rename("deposition");
var nochange = newp40_premonsoon.eq(1).and(newp40_postmonsoon.eq(1))
.rename("nochange");
var compiled = nochange.add(erosion).add(deposition);
compiled = compiled.selfMask();
var compiled_vv = compiled;
var colors = ['61C8FF', 'cc3300','ffff00'];  // A74530
var colorizedVis = {
  min: 1,
  max: 3,
  palette: colors
};
//Map.addLayer(newp40_premonsoon, {min:0, max:1, palette: "000000,00FFF0"}, "WaterBody premonsoon-vv", false);
//Map.addLayer(newp40_postmonsoon, {min:0, max:1, palette: "000000,00FF00"}, "WaterBody postmonsoon-vv", false);
// Map.addLayer(compiled_vh,colorizedVis,'SAR based River VH');
Map.addLayer(compiled_vv,colorizedVis,'SAR based River VV');
// Legend
var colors = ['61C8FF', 'cc3300','ffff00'];
var names = (["Nochange", "Erosion","Deposition"]);
var colorizedVis = {
  min: 1,
  max: 2,
  palette: colors
};
var legend2 = ui.Panel({style: {position: 'bottom-left'}});
legend2.add(ui.Label({
  value: "River Erosion",
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0px'
  }
})); 
var entry;
for (var x = 0; x<3; x++){
  entry = [
    ui.Label({style:{color:colors[x],margin: '0 0 4px 0'}, value: '██'}),
    ui.Label({
      value: names[x],
      style: {
        margin: '0 0 4px 4px'
      }
    })
  ];
  legend2.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
}
Map.add(legend2);
// Create legend title
var mapTitle = ui.Label({
  value: 'RIVER MORPHOLOGY AND FLOOD MAP OF UMNGI RIVER, MEGHALAYA',
  style: {
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
Map.add(mapTitle);