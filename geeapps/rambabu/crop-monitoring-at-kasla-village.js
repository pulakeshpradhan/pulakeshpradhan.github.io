var narsapur = ui.import && ui.import("narsapur", "table", {
      "id": "users/rambabu/narsapur_mandal"
    }) || ee.FeatureCollection("users/rambabu/narsapur_mandal"),
    kasala = ui.import && ui.import("kasala", "table", {
      "id": "users/rambabu/Kasala"
    }) || ee.FeatureCollection("users/rambabu/Kasala");
var region = kasala;
var FromDate='2020-1-01';
var ToDate='2020-12-31';
var CloudCoverage = 1;
var NDVI_Threshold = 0;
var date;
// Load data.
var images = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(FromDate, ToDate)
    .filterBounds(region)
    .filter("CLOUD_COVERAGE_ASSESSMENT<" + CloudCoverage)
    .filter(ee.Filter.eq("MGRS_TILE","43QHV")) //44QKE or 43QHV
    .filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', 19))
    .select(['B2','B3','B4','B8'])
    .map(function(img){
      var bands = img.normalizedDifference(['B8', 'B4']).rename('NDVI');
      return img.addBands(bands)
  });
var count = images.size();
print('Count: ', count);
var linkedMap1 = ui.Map();
var linkedMap2 = ui.Map();
linkedMap1.style().set('cursor', 'crosshair');
var SetLayers = function(image){
   var imageNDVI = image.select('NDVI')
    date = ee.Date(imageNDVI.get('system:time_start')).format('dd-MMM-yyyy');
    var vegitationPalette =['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01','012E01', '011D01', '011301'];
    var ndviMasked = imageNDVI.updateMask(imageNDVI.gte(NDVI_Threshold));
   // linkedMap1.clear();
    linkedMap1.layers().set(0, ui.Map.Layer(ndviMasked, {min: 0, max: 1, palette: vegitationPalette}, 'NDVI on ' + date.getInfo()));
    linkedMap1.layers().set(1, ui.Map.Layer(region,null,'Selected Region',null, 0.2));
    linkedMap2.clear();
    linkedMap2.addLayer(image, {bands:['B4','B3','B2'], min: 1, max: 3000}, 'Image on ' + date.getInfo());
    linkedMap2.addLayer(region,null,'Selected Region',null, 0.2);
    // Create a label on the map.
    var label = ui.Label(date.getInfo());
    linkedMap1.add(label);
}
var image= images.first();
SetLayers(image);
// Link the default Map to the other map.
var linker = ui.Map.Linker([linkedMap1, linkedMap2]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap1.centerObject(region,16);
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
//print(dates.getInfo());
var obj = Object.keys(dates.getInfo());
var select = ui.Select({
  items: Object.keys(dates.getInfo()),
  onChange: function(key) {
    var imageDate = [key][0];
    var image = images.filterDate(imageDate,ee.Date(imageDate).advance(1,"day")).first();
    SetLayers(image);
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Date...');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}});
var date = '';// date.getInfo();
var title = "Vegetation in Narsapur Mandal (" + date + ")";
var panelTitle = ui.Label(title);
panelTitle.style().set('color', 'blue');
panelTitle.style().set('fontWeight', 'bold');
panelTitle.style().set({
  fontSize: '18px',
  padding: '1px'
});
panel.add(panelTitle);
var panelSubTitle = ui.Label('Medak District, Telangana State, India');
panelSubTitle.style().set({
  fontSize: '14px',
   padding: '1px'
});
panel.add(panelSubTitle);
panel.widgets().set(3, select);
panel.add(ui.Label('Click on the Vegetation to view NDVI Chart'));
var developedBy = ui.Label('Developed by: Dr. P. Rambabu, Professor, BVRIT');
developedBy.style().set({
  fontSize: '12px',
   padding: '1px'
});
developedBy.style().set('color', 'red');
panel.add(developedBy);
// Set a callback function for when the user clicks the map.
linkedMap1.onClick(function(coords) {
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(3, ui.Map.Layer(point, {color: 'FF0000'},'Selected Location'));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(images.select('NDVI'), point, ee.Reducer.max(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // manipulating the widgets list.
  panel.widgets().set(4, chart);
   // Create or update the location label (the second widget in the panel)
  var location = 'Selected Tank: lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  panel.widgets().set(5, ui.Label(location));
 //Create callbakc function that adds image to the map coresponding with clicked data point on chart
chart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var imageDate = ee.Filter.equals('system:time_start', xValue);
    print(imageDate.getInfo());
    var image = ee.Image(images.filter(imageDate).first());
    SetLayers(image);
  });
});
// Add the panel to the ui.root.
ui.root.add(panel);