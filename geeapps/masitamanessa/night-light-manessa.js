var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/masitamanessa/INDONESIA_KAB"
    }) || ee.FeatureCollection("users/masitamanessa/INDONESIA_KAB");
var palettes = require('users/gena/packages:colorbrewer').Palettes;
Map.centerObject(Indonesia,4);
print(Indonesia)
var pois = Indonesia;
var titleCO  = 'Night Light Over Time: Indonesia';
var profilesOn = false; 
var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filter(ee.Filter.date('2020-01-01', '2020-12-31')).select('avg_rad');
print(dataset);
//Create visualization palettes of NDVI
print(palettes); //to see different palette options
var band_viz = {
  min: 0,
  max: 60,
  opacity: 0.8,
  palette: palettes.YlOrRd[7]
};
Map.addLayer(dataset.first(),band_viz,"Night Time");
function buildChart(collection, titles, poi) {
    var chart = ui.Chart.image.series(collection, poi, ee.Reducer.mean(), 1000)
      .setOptions({
        title: titles,
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
        var Ids = Dates.format('YYYY MM')
        print(Ids)
        // Show the image for the clicked year.
        var image = ee.Image(collection.filter(ee.Filter.equals('system:time_start', xValue)).first());
        //print(image)
        var layer = ui.Map.Layer(image, {
            min: 0,
            max: 60,
            opacity: 0.8,
            palette: palettes.YlOrRd[7],
            bands: 'avg_rad'
        });
        profilesOn ? Map.layers().reset([layer, profiles]) : Map.layers().reset([layer]);
        // Show a label with the date on the map.
        //IdLabel.setValue('Night Light distribution on '+ print(Ids));
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
      var titleCO  = 'Night Light Over Time: ' + places[key][0] ;
      rightPanel.widgets().set(1, buildChart(dataset,titleCO,pois));
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Site...');
var rightPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'bottom-left',
        width: '520px'
    }
});
// A time series chart from computed surfaces
var ciChart = buildChart(dataset,titleCO, pois);
// Add charts to panel
rightPanel.widgets().set(0, select);
rightPanel.widgets().set(1, ciChart);
// Display panel
Map.add(rightPanel);
// Create a label on the map.
var IdLabel = ui.Label('Click a point on the chart to show the Night Light distribution');
Map.add(IdLabel);