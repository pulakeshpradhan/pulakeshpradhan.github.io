var mod09gq = ee.ImageCollection("MODIS/061/MOD09GQ"),
    mod09ga = ee.ImageCollection("MODIS/061/MOD09GA"),
    mod44w = ee.ImageCollection("MODIS/006/MOD44W"),
    myd09gq = ee.ImageCollection("MODIS/061/MYD09GQ"),
    myd09ga = ee.ImageCollection("MODIS/061/MYD09GA"),
    merit = ee.Image("MERIT/Hydro/v1_0_1");
// Example script to apply the MODIS flood detection algorithm using Google Earth Engine
// Methods taken from: https://cdn.earthdata.nasa.gov/conduit/upload/17162/MCDWD_UserGuide_RevB.pdf
function get_image(){
    var doi = datebox.getValue();
  doi = ee.Date(doi);
  // define one year to process daily modis data and extract floods
  var time_start = doi.advance(1,"day");
  var time_end = doi.advance(1,"month");
  var year = time_start.getRange('year');
  var yearly_water_range = ee.DateRange("2000-01-01","2015-12-31");
  year = ee.Algorithms.If(year.intersects(yearly_water_range),year, yearly_water_range);
  // extract out permanent water for our year of interest
  var yearly_water_mask = mod44w.filterDate(year).mode();
  // join together the 250m and 500m product collections based on observation time 
  var mod_joined = ee.ImageCollection(ee.Join.saveBest('1kmimg','timeDiff').apply({
    primary: mod09gq,
    secondary: mod09ga,
    condition: ee.Filter.maxDifference({
        difference: 1000 * 60 * 60 * 24, // One day in milliseconds
        leftField: 'system:time_start',
        rightField: 'system:time_start',
      })
  }));
  // join together the 250m and 500m product collections based on observation time 
  var myd_joined = ee.ImageCollection(ee.Join.saveBest('1kmimg','timeDiff').apply({
    primary: myd09gq,
    secondary: myd09ga,
    condition: ee.Filter.maxDifference({
        difference: 1000 * 60 * 60 * 24, // One day in milliseconds
        leftField: 'system:time_start',
        rightField: 'system:time_start',
      })
  }));
  // calculate aspect for hillshade mask process
  var elv = merit.select('elv');
  var hand = merit.select('hnd');
  var deg2rad = ee.Image.constant(Math.PI/180);
  var aspect = ee.Terrain.aspect(elv).multiply(deg2rad);
  var slope = ee.Terrain.slope(elv).multiply(deg2rad).tan();
  function qa_mask(image) {
    // get the 500m/1km product for the detailed qa information
    var mod_500m = ee.Image(image.get('1kmimg'));
    // Select the QA band.
    var QA = mod_500m.select('state_1km');
    // determine bit for the different internal flags.
    var cloudBit = 1 << 10;
    var shadowBit = 1 << 2;
    var snowBit = 1 << 12;
    var adjacencyBit = 1 << 13;
    // extract out which pixels are cloud, shadow, snow, etc.
    var cloudMask = QA.bitwiseAnd(cloudBit).eq(0);
    var shadowMask = QA.bitwiseAnd(shadowBit).eq(0);
    var snowMask = QA.bitwiseAnd(snowBit).eq(0);
    var adjacencyMask = QA.bitwiseAnd(adjacencyBit).eq(0);
    // calculate hillshade mask based on solar geometry from observation time 
    var sun_azimuth = mod_500m.select('SolarAzimuth').multiply(0.01).multiply(deg2rad);
    var sun_zenith = mod_500m.select('SolarZenith').multiply(0.01).multiply(deg2rad);
    var hs = ee.Image().expression("255.0 * ((cos(z) * cos(sl)) + (sin(z) * sin(sl) * cos(az-asp)))", {
      z: sun_zenith,
      az: sun_azimuth,
      sl: slope,
      asp: aspect
    });
    var hillshadeMask = hs.gt(127.5); // mask is 0.5 of range 0-255
    // combine the individual masks together to determine clear obs
    var mask = cloudMask.and(shadowMask).and(snowMask).and(adjacencyMask).and(hillshadeMask);
    // extract out the surface reflectance bands, all other bands not needed
    image = image.select(["sur_refl_b0[1-2]"],["red_250m","nir_250m"]);
    mod_500m = mod_500m.select(["sur_refl_b0[1-7]"], ["red_500m","nir_500m","green_500m","blue_500m","nir2_500m","swir1_500m","swir2_500m"]);
    // Return an image masking out cloudy areas.
    return image.addBands(mod_500m).updateMask(mask);
  }
  function pansharpen(image) {
    // get a scaling ratio of pixels between the 500m and 250m red band
    var ratio = image.select("red_500m").divide(image.select("red_250m"));
    // apply scaling ratio to other bands without a 250m band
    var blue_ps = image.select("blue_500m").divide(ratio).rename("blue");
    var swir_ps = image.select("swir2_500m").divide(ratio).rename("swir");
    var green_ps = image.select("green_500m").divide(ratio).rename("green");
    // select out and rename only the bands of interest
    return image.select(["red_250m", "nir_250m"],["red","nir"])
                  .addBands([blue_ps, green_ps, swir_ps]);
  }
  // thresholding coefficients used in the flood algorithm
  var a = 13.5,
      b = 1081.1,
      c = 0.7,
      d = 2027,
      e = 675.7;
  function modis_flood_algorithm(img) {
    // water detection thresholding
    var water = ee.Image(img.expression("((nir+a)/(red+b) < c) and (red < d) and (swir < e)", {
      "red":    img.select("red"),
      "nir":    img.select("nir"),
      "swir":  img.select("swir"),
      "a":      a,
      "b":      b,
      "c":      c,
      "d":      d,
      "e":      e
    }).uint8().and(hand.lt(15))
    .rename("water")
    .copyProperties(img,["system:time_start"])
    );
    // remove permanent water from MOD44W product to identify floods
    var flood = water.and(yearly_water_mask.select('water_mask').not()).rename('flood');
    // return both detected surface water and flood area
    return water.addBands(flood);
  }
  function temporal_composite(date, ndays) {
    var water_obs_threshold = 0.5;
    var t2 = ee.Date(date).advance(1,"day");
    var t1 = t2.advance(-ndays, "day");
    var obs_imgs = flood_imgs.filterDate(t1,t2);
    return (
      obs_imgs.sum().divide(obs_imgs.count())
      .gte(water_obs_threshold)
      .set({
        "system:time_start": t2.advance(-1,"day").millis(),
        "composite_days": ndays
      })
      );
  }
  // apply preprocessing steps
  // includes qa masking and pansharpening 500m bands
  var mod_preprocessed = mod_joined.map(qa_mask).map(pansharpen);
  var myd_preprocessed = myd_joined.map(qa_mask).map(pansharpen);
  // combine the terra and aqua sensors
  var combined = mod_preprocessed.merge(myd_preprocessed).sort("system:time_start");
  // apply modis flood algorithm to preprocessed imagery
  var flood_imgs = combined.map(modis_flood_algorithm);
  var ndays = select.getValue();
  var flood_img = temporal_composite(doi,ndays);
   // extract out a image for a specific flood event
  var vis_img = combined.filterDate(time_start.advance(-ndays,"day"),time_start).median();
  return vis_img.addBands(flood_img);
}
function update_map(){
  var img = get_image();
  map.clear();
  map.addLayer(img, {min:50, max:5500, bands:"swir,nir,green", gamma:1.5}, "Natural Color Image");
  map.addLayer(img.select('water').selfMask(), {bands:'water',palette:"darkblue"}, "Detected Surface Water");
  map.addLayer(img.select('flood').selfMask(), {bands:'flood',palette:"red"}, "Flood Area");
  return;
}
function export_data(){
  var img = get_image();
  var doi = datebox.getValue();
  Export.image.toDrive({
    image: img,
    scale: 250,
    description: "MODIS Flood Export "+doi,
    maxPixels: 1e12
  });
  return;
}
// Set up the overall structure of the app, with a control panel to the left
// of a full-screen map.
ui.root.clear();
ui.Panel
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical',true),
  style: {width: '320px', padding: '8px',margin: '20px 0 0 0'}});
var map = ui.Map();
ui.root.add(panel).add(map);
var title = ui.Label({
        value: 'MODIS NRT Flood Mapping',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      });
var info_text = 'This app allows you to run the MODIS Flood ' +
  'mapping algorithm for a given date of ' +
  'interest. Information on the algorithm ' +
  'can be found at the following link:'
var info = ui.Label({
  value: info_text,
  style:{margin: '10px 5px', width:'300px'}
});
var link = ui.Label({
  value:'MODIS NRT Global Flood Product ATBD',
  targetUrl:'https://cdn.earthdata.nasa.gov/conduit/upload/17162/MCDWD_UserGuide_RevB.pdf'
})
panel.add(title).add(info).add(link);
panel.add(ui.Label('\nLegend:',{fontWeight:'bold'}))
// Water class names.
var names = ['Surface Water', 'Flood'];
var colors = ['00008B', 'FF0000'];
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 10px'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < names.length; i++) {
  panel.add(makeRow(colors[i], names[i]));
}
var datebox = ui.Textbox('YYYY-MM-DD', '2006-11-06');
panel.add(ui.Label('Date of Interest:',{fontWeight:'bold'})).add(datebox);
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Slider(1, 3, 1, 1);
panel.add(ui.Label('Composite Days:',{fontWeight:'bold'})).add(select);
var runbutton = ui.Button("Display on Map", update_map);
panel.add(runbutton);
// var exportbutton = ui.Button("Export data", export_data);
// panel.add(exportbutton);