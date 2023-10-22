var Area = ui.import && ui.import("Area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.26560953370195,
                -5.665942934652964
              ],
              [
                105.26560953370195,
                -7.243353173826063
              ],
              [
                107.50132730713945,
                -7.243353173826063
              ],
              [
                107.50132730713945,
                -5.665942934652964
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[105.26560953370195, -5.665942934652964],
          [105.26560953370195, -7.243353173826063],
          [107.50132730713945, -7.243353173826063],
          [107.50132730713945, -5.665942934652964]]], null, false),
    Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/masitamanessa/INDONESIA_KAB"
    }) || ee.FeatureCollection("users/masitamanessa/INDONESIA_KAB");
var palettes = require('users/gena/packages:colorbrewer').Palettes;
var utils = require('users/gena/packages:utils')
var text = require('users/gena/packages:text')
//print(Indonesia)
Map.setOptions('HYBRID');
//Map.addLayer(Area);
Map.centerObject(Indonesia, 4);
var pois = Indonesia;
var titleCO  = 'CO Over Time: Indonesia';
var profilesOn = false; 
var startDate = ee.Date('2020-01-01'); // set start time for analysis 2018-12-05T11:53:01 - 2021-02-03T00:00:00
var endDate = ee.Date('2021-01-31'); // set end time for analysis
var nMonths = ee.Number(endDate.difference(startDate,'month')).round();
var CO   = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO').filterDate(startDate, endDate).filterBounds(Area).select('CO_column_number_density');
var NO2  = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2').filterDate(startDate, endDate).filterBounds(Area).select('tropospheric_NO2_column_number_density');
var HCHO = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_HCHO').filterDate(startDate, endDate).filterBounds(Area).select('tropospheric_HCHO_column_number_density'); 
var SO4  = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_SO2').filterDate(startDate, endDate).filterBounds(Area).select('SO2_column_number_density'); 
var CObyMonth = ee.ImageCollection(ee.List.sequence(0,nMonths).map(function (n) {
    // calculate the offset from startDate
    var ini = startDate.advance(n,'month');
    // advance just one month
    var end = ini.advance(1,'month');
    var label = startDate.format('YYYY-MM');
    // filter and reduce
    return CO.filterDate(ini,end)
                .select(0).mean()
                .set('system:time_start', ini)
                .set({labels: label});
}));
var NO2byMonth = ee.ImageCollection(ee.List.sequence(0,nMonths).map(function (n) {
    // calculate the offset from startDate
    var ini = startDate.advance(n,'month');
    // advance just one month
    var end = ini.advance(1,'month');
    var label = startDate.format('YYYY-MM');
    // filter and reduce
    return NO2.filterDate(ini,end)
                .select(0).mean()
                .set('system:time_start', ini)
                .set({labels: label});
}));
//Create visualization palettes of NDVI
print(palettes); //to see different palette options
var band_viz = {
  min: 0,
  max: 0.05,
  opacity: 0.8,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(CObyMonth.first(),band_viz,"CO")
var bounds = Area.bounds();
//print(CObyMonth);
//Map.addLayer(coll4Video.first())
function buildChart(collection, titles, poi) {
    var chart = ui.Chart.image.series(collection, poi, ee.Reducer.mean(), 1000)
      .setOptions({
        title: titles,
        vAxis: {title: 'mol/m^2'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
    // Chart styling
    chart.style().set({
        width: '490px',
        height: '300px'
    });
    // Update the map and label when the chart is clicked.
    chart.onClick(function (xValue, yValue, label) {
        if (!xValue) return;  // Selection was cleared.
        //print(xValue)
        var Dates = ee.Date(xValue)
        // Show the image for the clicked year.
        var image = ee.Image(collection.filter(ee.Filter.equals('system:time_start', Dates)).first());
        //print(image)
        var layer = ui.Map.Layer(image, {
            min: 0,
            max: 0.05,
            opacity: 0.8,
            palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
            bands: 'CO_column_number_density'
        });
        profilesOn ? Map.layers().reset([layer, profiles]) : Map.layers().reset([layer]);
        // Show a label with the date on the map.
        //label.setValue('CO distribution on '+ (new Date(xValue)).toUTCString());
    });
    return chart;
}
var places = {
    'Choose An Analysis Scale': 'default',
    'Jakarta': ['Daerah Khusus Ibukota Jakarta Raya'],
    'Banten': ['Banten'],
    'Yogyakarta' : ['Daerah Istimewa Yogyakarta'],
    'Jawa Barat' : ['Jawa Barat'],
    'Jawa Tengah' : ['Jawa Tengah'],
    'Jawa Timur' : ['Jawa Timur'], 
    'Bali' : ['Bali'],
    'Bengkulu' : ['Bengkulu'],
    'Sulawesi Tengah' : ['Sulawesi Tengah'],
    'Kalimantan Timur' : ['Kalimantan Timur']
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
      var pois = Indonesia.filter(ee.Filter.eq('Provinsi', places[key][0]));
      //Map.addLayer(pois);
      Map.centerObject(pois,8);
      var titleCO  = 'CO Over Time: ' + places[key][0] ;
      rightPanel.widgets().set(1, buildChart(CObyMonth,titleCO,pois));
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Site...');
var rightPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'bottom-right',
        width: '520px'
    }
});
// A time series chart from computed surfaces
var ciChart = buildChart(CObyMonth,titleCO, pois);
// Add charts to panel
rightPanel.widgets().set(0, select);
rightPanel.widgets().set(1, ciChart);
// Display panel
Map.add(rightPanel);
// Create a label on the map.
var IdLabel = ui.Label('Click a point on the chart to show the CO distribution');
Map.add(IdLabel);