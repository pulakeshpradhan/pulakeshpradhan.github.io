var narsapurMandal = ui.import && ui.import("narsapurMandal", "table", {
      "id": "users/rambabu/narsapur_mandal"
    }) || ee.FeatureCollection("users/rambabu/narsapur_mandal");
var FromDate='2015-1-01';
var ToDate='2020-12-31';
var CloudCoverage = 5;
var NDWI_Threshold = 0;
Map.centerObject(narsapurMandal,12);
Map.addLayer(narsapurMandal,null,"Narsapur Mandal",true,0.1);
Map.style().set('cursor', 'crosshair');
// Load data.
var images = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(FromDate, ToDate)
    .filterBounds(narsapurMandal)
    .filter("CLOUD_COVERAGE_ASSESSMENT<" + CloudCoverage)
    .filter(ee.Filter.eq("MGRS_TILE","43QHV")) //44QKE or 43QHV
    .filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', 19))
    .select(['B2','B3','B4','B8'])
    .map(function(img){
      var bands = img.normalizedDifference(['B3', 'B8']).rename('NDWI');
      return img.addBands(bands)
  });
var count = images.size();
print('Count: ', count);
print(images);
var imageMaxNDWI = images.filterDate('2017-12-20','2017-12-21').select('NDWI').first().clip(narsapurMandal);
var date = ee.Date(imageMaxNDWI.get('system:time_start')).format('dd-MMM-yyyy');
print('Timestamp: ', date); // ee.Date
var waterPalette = ['white','blue'];
// select pixels greater than threshold
imageMaxNDWI = imageMaxNDWI.gt(NDWI_Threshold);
Map.layers().set(1, ui.Map.Layer(images.filterDate('2017-12-20','2017-12-21').first().select(['B4','B3','B2']).clip(narsapurMandal), {min: 1, max: 3000},'Image on ' + date.getInfo(), false));
Map.layers().set(2, ui.Map.Layer(imageMaxNDWI.updateMask(imageMaxNDWI), {min: 0.0, max: 0.2, palette: waterPalette}, 'NDWI on 20-Dec-2017'));
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
    var imageDate = [key][0];
    var imageMaxNDWI = images.filterDate(imageDate,ee.Date(imageDate).advance(1,"day")).first().select('NDWI').clip(narsapurMandal);
    var date = ee.Date(imageMaxNDWI.get('system:time_start')).format('dd-MMM-yyyy');
    print('Timestamp: ', date); // ee.Date
    imageMaxNDWI = imageMaxNDWI.gt(NDWI_Threshold);
    Map.layers().set(2, ui.Map.Layer(imageMaxNDWI.updateMask(imageMaxNDWI), {min: 0.0, max: 0.2, palette: waterPalette},'NDWI on ' + date.getInfo()));
    Map.layers().set(1, ui.Map.Layer(images.filterDate(imageDate,ee.Date(imageDate).advance(1,"day")).first().select(['B4','B3','B2']).clip(narsapurMandal), {min: 1, max: 3000},'Image on ' + date.getInfo(),false));
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Date...');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}});
var date = date.getInfo();
var title = "Tanks in Narsapur Mandal (" + date + ")";
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
//panel.add(select);
panel.widgets().set(3, select);
panel.add(ui.Label('Click on the Tank to view NDVI Chart'));
var developedBy = ui.Label('Developed by: Dr. P. Rambabu, Professor, BVRIT');
developedBy.style().set({
  fontSize: '12px',
   padding: '1px'
});
developedBy.style().set('color', 'red');
panel.add(developedBy);
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(3, ui.Map.Layer(point, {color: 'FF0000'},'Selected Location'));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(images.select('NDWI'), point, ee.Reducer.max(), 200)
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
  panel.widgets().set(6, developedBy);
});
// Add the panel to the ui.root.
ui.root.add(panel);