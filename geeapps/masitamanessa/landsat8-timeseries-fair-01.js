/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageVisParam = {"opacity":1,"bands":["NDVI"],"palette":["0c2aff","ffffff","0a7404"]},
    fair = ee.FeatureCollection("users/masitamanessa/FAIR_BRI_point"),
    ind = ee.FeatureCollection("users/masitamanessa/indo");
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
//Map.addLayer(Est.mean().clip(ind),imageVisParam,'NDVI');
Map.addLayer(fair,{},"Site");
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '600px',position: 'bottom-right'}})
    .add(ui.Label('Click on the map to explore or Choose site'));
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
var places = {
  NAD:[96.19833000000,4.10765600000],
  Tanjung_Kasam:[104.13300000000,1.04550000000],
  Sumsel:[103.75450730000,-2.15590430000],
  Bengkulu:[102.27037500000,-3.91234780000],
  Paiton:[113.57061000000,-7.71116000000],
  Teluk_Sirih:[100.37240000000,-1.07655000000],
  Adipala:[109.13756000000,-7.68377000000],
  Celukan_Bawang:[114.85160000000,-8.19630000000],
  Cilacap_Sumber:[109.09001000000,-7.68621000000],
  Parit_Baru:[109.20333000000,0.05804000000],
  Bangko_Tengah:[103.80413300000,-3.83867900000],
  Pangkalan_Susu_3_4:[98.25782300000,4.11840100000],
  Pelabuhan_Ratu:[106.54683000000,-7.02393000000],
  Suralaya:[106.46460000000,-6.05850000000],
  Takalar:[119.55082200000,-5.62363470000],
  Rembang:[111.47490000000,-6.63600000000],
  Pacitan:[111.37360000000,-8.25780000000],
  Java_7:[106.10080050000,-5.99169430000],
  Indramayu_Sumuradem:[107.97030100000,-6.27494700000],
  Cilacap_Extension:[109.08774050000,-7.68478600000],
  East_Nusa:[123.93309600000,-10.12277300000],
  Pangkalan_Susu_2_1:[98.25784319000,4.11937847000],
  Pangkalan_Susu_2_2:[98.20835000000,4.08520000000],
  Nagan_Raya:[96.19808865000,4.10770728400]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    var pois = ee.Geometry.Point(places[key]);
    var poi = pois.buffer(1000);
    Map.setCenter(places[key][0], places[key][1],10);
    var EstNDVI = Est.select(['NDVI']);
    var chart3 = ui.Chart.image.series(EstNDVI, poi, ee.Reducer.mean(), 200)
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
      panel.widgets().set(2, chart3)
     var EstTemp = Est.select(['Temprature']);
     var chart4= ui.Chart.image.series(EstTemp, poi, ee.Reducer.mean(), 200)
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
      panel.widgets().set(3, chart4)
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Site...');
panel.widgets().set(2, select);
Map.add(panel);