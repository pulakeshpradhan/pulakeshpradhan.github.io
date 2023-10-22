var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            12.696575555139308,
            49.51870533818387
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([12.696575555139308, 49.51870533818387]);
// Map.setOptions( 'HYBRID', {'Grey':[ { featureType:'all', stylers:[{saturation:-100}] },]  }  );
// Map.setOptions('Grey');
var countriesUSDOS  = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.eq('country_na','Czechia'));
Map.addLayer(countriesUSDOS,{},'Czechia',false);
var start = '2013-03-20';
var now = Date.now();       //getting time at UTC
var eeNow = ee.Date(now);   //converting number to object format 
print("now:",typeof(now),now);
print("eeNow:",typeof(eeNow),eeNow);
// Import the Landsat 8 TOA image collection.
var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterDate(start,eeNow);
// Map a function over the Landsat 8 TOA collection to add an NDVI band.
var withNDVI = l8.map(function(image) {
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  return image.addBands(ndvi);
});
// Create a chart.
var chart = ui.Chart.image.series({
  imageCollection: withNDVI.select('NDVI'),
  region: roi,
  reducer: ee.Reducer.first(),
  scale: 30
}).setOptions({title: 'NDVI over time'});
// Display the chart in the console.
//print(chart);
var cloudlessNDVI = l8.map(function(image) {
  // Get a cloud score in [0, 100].
  var cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select('QA_PIXEL');
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  // Create a mask of cloudy pixels from an arbitrary threshold.
  var mask = cloud.lte(20);
  // Compute NDVI.
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  // Return the masked image with an NDVI band.
  return image.addBands(ndvi).updateMask(qaMask);
});
//print(cloudlessNDVI);
var chart = ui.Chart.image.series({
  imageCollection: cloudlessNDVI.select('NDVI'),
  region: roi,
 // reducer: ee.Reducer.median(),
  scale: 30,
  xProperty: 'system:time_start'
})
//.setSeriesNames(['NDVI'])
.setOptions({
  title: 'Average Vegetation Index Value by Date',
  // hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
  // vAxis: {
  //   title: 'Vegetation index (x1e4)',
  //   titleTextStyle: {italic: false, bold: true}
  // },
  // lineWidth: 2,
  // colors: ['e37d05'],
  // curveType: 'function'
}
)
// chart.style().set({
//   position: 'bottom-right',
//   width: '500px',
//   height: '300px'
// });
print(chart);
var chart2 = ui.Chart.image.series(cloudlessNDVI.select('NDVI'),roi)
chart2.style().set({
  position: 'bottom-right',
  width: '500px',
  height: '300px'
});
Map.add(chart2);
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
Map.add(legend); 
var legendTitle = ui.Label({
  value: 'NDVI tool',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var Snezka = ee.Geometry.Point([15.74063, 50.73604]);
var Praded = ee.Geometry.Point([17.26747, 50.083]);
var Lysa_hora = ee.Geometry.Point([18.44796, 49.54604]);
var panel = ui.Panel({style: {width:'5%'}});
ui.root.insert(0,panel);
var button_Snezka = ui.Button('Snezka', Snezka_co);
panel.add(button_Snezka);
function Snezka_co(){
  Map.centerObject(Snezka,14);
}
var button_Praded = ui.Button('Praded', Praded_co);
panel.add(button_Praded);
function Praded_co(){
  Map.centerObject(Praded,14);
}
var button_Lysa_hora = ui.Button('Lysa hora', Lysa_hora_co);
panel.add(button_Lysa_hora);
function Lysa_hora_co(){
  Map.centerObject(Lysa_hora,14);
}