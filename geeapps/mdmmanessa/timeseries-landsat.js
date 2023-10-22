/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Indonesia = ee.FeatureCollection("users/mdmmanessa/ADMINISTRASI_LN_25K"),
    fair = ee.FeatureCollection("users/mdmmanessa/FAIR_BRI_Indonesia_point_infrastructure"),
    geometry = /* color: #0b4a8b */ee.Geometry.MultiPoint(),
    ind = ee.FeatureCollection("users/mdmmanessa/indo"),
    imageVisParam = {"opacity":1,"bands":["NDVI"],"palette":["0c2aff","ffffff","0a7404"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(fair);
var poi = fair.filterMetadata('prj_name', 'equals', 'PLTU Nangroe Aceh Darussalam Thermal Power Plant');
var startDate = ee.Date('2015-01-01'); // set start time for analysis
var endDate = ee.Date('2020-10-30'); // set end time for analysis
// calculate the number of months to process
var nMonths = ee.Number(endDate.difference(startDate,'month')).round();
var nMonths = nMonths.subtract(1);
//print (nMonths);
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
function fun(image){
  var Red = image.select(['B4']); 
  var NIR= image.select(['B5']);
  var Temp = image.select(['B10']).rename('Temprature');
  var NDVIs = NIR.subtract(Red).divide(NIR.add(Red)).rename('NDVI');
  var NDVI = NDVIs.addBands(Temp);
  return NDVI.set('system:time_start',image.get('system:time_start'));
}
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterDate(startDate, endDate)
    .map(maskL8sr);
//print(collection.mean());
var byMonth = ee.ImageCollection(
  ee.List.sequence(0,nMonths).map(function (n) {
    // calculate the offset from startDate
    var ini = startDate.advance(n,'month');
    // advance just one month
    var end = ini.advance(1,'month');
    // filter and reduce
    var B2 = collection.select('B2').filterDate(ini,end).mean().multiply(10);
    var B3 = collection.select('B3').filterDate(ini,end).mean().multiply(10);
    var B4 = collection.select('B4').filterDate(ini,end).mean().multiply(10);
    var B5 = collection.select('B5').filterDate(ini,end).mean().multiply(10);
    var B10 = collection.select('B10').filterDate(ini,end).mean().multiply(1000).subtract(273);
    var collections = B2.addBands(B3).addBands(B4).addBands(B5).addBands(B10);
    return collections.set('system:time_start', ini);
}));
//print(byMonth);
var Est = byMonth.map(fun);
//print(Est);
// plot a line for each year in series
var pois = poi.geometry().buffer(1000);
//print(ui.Chart.image.series(Est, pois, ee.Reducer.mean(), 30));
Map.addLayer(Est.mean().clip(ind),imageVisParam,'NDVI');
Map.addLayer(fair,{},"Site");
// The layout is vertical flow by default.
var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'top-right',
        width: '500px',
        height: '1800px'
    }
});
// The layout is vertical flow by default.
var panelleft = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'top-left',
        width: '500px'
    }
});
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var points = point.buffer(1000);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  var button = ui.Button({
  label: 'Site',
  onClick: function() {
    print(Map.addLayer(fair));
    }
  });
  // Create a chart of NDVI over time.
  var EstNDVI = Est.select(['NDVI']);
  var chart1 = ui.Chart.image.series(EstNDVI, points, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
  // Create a chart of NDVI over time.
  var EstTemp = Est.select(['Temprature']);
  var chart2 = ui.Chart.image.series(EstTemp, points, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'Temprature Over Time',
        vAxis: {title: 'Celcius'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, chart1);
  panel.widgets().set(3, chart2);
  panel.widgets().set(4, button);
});
// Add the panel to the ui.root.
Map.add(panel);