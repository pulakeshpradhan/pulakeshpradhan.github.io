var mandalName="Narsapur";
var telangana = ee.FeatureCollection("users/rambabu/telangana");
print(telangana)
var mandal = telangana.filter(ee.Filter.eq("Mandal",mandalName)); 
print(mandal)
var FromDate='2015-1-01';
var ToDate='2020-12-31';
var NDWI_Threshold = -18; 
var imageDate;
Map.centerObject(mandal,12);
Map.style().set('cursor', 'crosshair');
// Load data.
var images = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterDate(FromDate, ToDate)
    .filterBounds(mandal)
    .select(['VV'])
    .map(function(img){
      var bands= img.focal_mean(50,'circle','meters').rename('Water'); //Apply a focal median filter
      return img.addBands(bands)
  });
var count = images.size();
print('Count: ', count);
print(images);
Map.layers().set(0, ui.Map.Layer(mandal,null, mandalName + " Mandal",true,0.2));
var imageMaxNDWI = images.limit(10, 'system:time_start', false).first(); //false for descending order
print(imageMaxNDWI);
imageDate=ee.Date(imageMaxNDWI.get('system:time_start'));
//var imageMaxNDWI = images.filterDate('2017-12-24','2017-12-25').select('Water').first().clip(narsapurMandal);
imageMaxNDWI = imageMaxNDWI.select('Water').clip(mandal);
var date = ee.Date(imageMaxNDWI.get('system:time_start')).format('dd-MMM-yyyy');
print('Timestamp: ', date); // ee.Date
// Include JRC layer on surface water occurance to mask flood pixels from areas
var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence');
var swater_mask = swater.gte(10).updateMask(swater.gte(10));
// final flooded area without pixels in perennial waterbodies
var flooded = swater_mask.updateMask(swater_mask);
var waterPalette1 = ['lightblue'];
Map.layers().set(1, ui.Map.Layer(imageMaxNDWI.updateMask(flooded),{min: 0, max: 1, palette: waterPalette1}, 'Surface Water (FTL)',1));
var waterPalette = ['white','blue'];
// select pixels greater than threshold
imageMaxNDWI = imageMaxNDWI.lt(NDWI_Threshold);
Map.layers().set(2, ui.Map.Layer(imageMaxNDWI.updateMask(imageMaxNDWI), {min: -20, max: 0, palette: waterPalette}, 'Surface Water'));
//
var showMap = function (){
    var images = ee.ImageCollection('COPERNICUS/S1_GRD')
    //.filterDate(FromDate, ToDate)
    .filterBounds(mandal)
    .select(['VV'])
    .map(function(img){
      var bands= img.focal_mean(50,'circle','meters').rename('Water'); //Apply a focal median filter
      return img.addBands(bands)
    });
    var imageMaxNDWI = images.filterDate(imageDate,ee.Date(imageDate).advance(1,"day")).select('Water').first().clip(mandal);
    var date = ee.Date(imageMaxNDWI.get('system:time_start')).format('dd-MMM-yyyy');
    print('Timestamp: ', date); // ee.Date
     // Include JRC layer on surface water occurance to mask flood pixels from areas
    var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence');
    var swater_mask = swater.gte(10).updateMask(swater.gte(10));
    // final flooded area without pixels in perennial waterbodies
    var flooded = swater_mask.updateMask(swater_mask);
    var waterPalette1 = ['lightblue'];
    Map.layers().set(1, ui.Map.Layer(imageMaxNDWI.updateMask(flooded),{min: 0, max: 1, palette: waterPalette1}, 'Surface Water (FTL)',1));
    imageMaxNDWI = imageMaxNDWI.lt(NDWI_Threshold);
    Map.layers().set(2, ui.Map.Layer(imageMaxNDWI.updateMask(imageMaxNDWI), {min: -20, max: 0, palette: waterPalette},'Surface Water'));
    Map.centerObject(mandal,12);
    Map.layers().set(0, ui.Map.Layer(mandal,null,mandalName + " Mandal",true,0.2));
}
//------------Build Date Combo
var datesIni = ee.Dictionary()
function getDates(img, first)
{
  //#gets the date of the image
  var year = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
 // #fills the Dictionary
  return ee.Dictionary(first).set(year, ee.Image(img).id());
}
var dates = ee.Dictionary(images.iterate(getDates, datesIni))
print(dates.getInfo());
//print("Dictionary of means:", dates.getInfo());
var obj = Object.keys(dates.getInfo());
var select = ui.Select({
  items: Object.keys(dates.getInfo()),
  onChange: function(key) {
    imageDate = [key][0];
    print(imageDate);
    showMap();
  }
});
//-----
var mandalDict = ee.Dictionary()
function getMandals(feature, first)
{
  var name = ee.String(feature.get('Mandal'));
  return ee.Dictionary(first).set(name, name);
}
var mandals = ee.Dictionary(telangana.iterate(getMandals, mandalDict))
var objMandals = Object.keys(mandals.getInfo());
var mandalCombo = ui.Select({
  items: Object.keys(mandals.getInfo()),
  onChange: function(key) {
    var name = [key][0];
    mandal = telangana.filter(ee.Filter.eq("Mandal",name));
    print(imageDate);
    mandalName =name;
    showMap();
    print(mandal);
  }
});
mandalCombo.setPlaceholder('Choose a Mandal...');
// Set a place holder.
select.setPlaceholder('Choose a Date...');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}});
var date = date.getInfo();
var title = "Tanks in Telangana State";
var panelTitle = ui.Label(title);
panelTitle.style().set('color', 'red');
panelTitle.style().set('fontWeight', 'bold');
panelTitle.style().set({
  fontSize: '18px',
  padding: '1px'
});
panel.add(panelTitle);
var panelSubTitle = ui.Label(mandalName + ' Mandal');
panelSubTitle.style().set({
  color: 'blue',
  fontSize: '14px',
   padding: '1px'
});
panel.add(panelSubTitle);
//panel.add(select);
panel.widgets().set(3, select);
panel.widgets().set(4, mandalCombo);
panel.add(ui.Label('Click on the Tank to view NDVI Chart (Sentinel 1)'));
var developedBy = ui.Label('Developed by: Dr. P. Rambabu, Professor, BVRIT');
developedBy.style().set({
  fontSize: '12px',
   padding: '1px'
});
developedBy.style().set('color', 'blue');
panel.add(developedBy);
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(3, ui.Map.Layer(point, {color: 'FF0000'},'Selected Location'));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(images.select('Water'), point, ee.Reducer.sum(), 10)
      .setOptions({
        title: 'NDWI Over Time',
        vAxis: {title: 'NDWI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // manipulating the widgets list.
  panel.widgets().set(4, chart);
   // Create or update the location label (the second widget in the panel)
  var location = 'Selected Tank: lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(5, ui.Label(location));
  //panel.widgets().set(6, developedBy);
});
// Add the panel to the ui.root.
ui.root.add(panel);