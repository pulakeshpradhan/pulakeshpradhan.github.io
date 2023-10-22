var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    districts = ee.FeatureCollection("users/UGANDA/District_UBOS_2011_44034_4326");
// filter the country
var countries = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
var country_names = ['Uganda'];
var myCountry = countries.filter(ee.Filter.inList('Country', country_names));
var aoi = myCountry.geometry();
//Filter
var precip = chirps.filterDate('2010-01-01', '2018-12-31')
    .sort('system:time_start', false)
    .filterBounds(aoi);
//---------------
// compute cumulative precipitation over time
var chirps_current = chirps.sort('system:time_start', false).first().clip(aoi)
var date_current = chirps_current.date().format('YYYY-MM-dd')
//Min Max precipitation current value
var minMax = chirps_current.reduceRegion(ee.Reducer.percentile([0, 100])).values()
var min = (ee.Number(minMax.get(0))).int()
var max = (ee.Number(minMax.get(1))).int()
var viz = {min: min.getInfo(), max: max.getInfo(), palette: ['#fff7bc', '#7fcdbb', '#2c7fb8']};
// set position of panel
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
    padding: '30x 30px',
    color: '000000'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Precipitation (mm)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 0 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['max'])
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage,
    params: {bbox:'0,0,10,100', dimensions:'20x100'},  
    style: {padding: '1px', position: 'bottom-center'},
  });
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
   });
legend.add(panel);
Map.add(legend);
//-------------------END LEGEND PREC----------------------
// add map
Map.addLayer(chirps_current, viz, 'CHIRPS CURRENT')
// Map.addLayer(aoi, {}, "AOI", false);
Map.centerObject(aoi, 7);
//----------ANNUAL------------------------
//function for calculating the annual precipitation
var years = ee.List.sequence(2010, 2018);
var annualPrecip = ee.ImageCollection.fromImages(
    years.map(function (year) {
        var annual = precip
            .filter(ee.Filter.calendarRange(year, year, 'year'))
            .sum();
        return annual
            .set('year', year)
            .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
    }));
//calculating monthly precipitation for the region
var months = ee.List.sequence(1, 12);
var monthlyPrecip =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
     //print(m)
      var w = precip.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .sum();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
var districtsLayer = ui.Map.Layer(districts.style({ width: 1, color: '706a6a', fillColor: '00000000' }), {}, 'districts', true, 0)
Map.layers().add(districtsLayer)
var selectionLayer = ui.Map.Layer(null, {color: 'ff0000'}, 'selection')
Map.layers().add(selectionLayer)
function showChart(geometry) {
  var chart = ui.Chart.image.series(annualPrecip, geometry, ee.Reducer.mean(), 2500)
      .setOptions({
          title: 'Annual precipitation by Over year',
          hAxis: {title: 'Annual precipitation by Over year'},
          vAxis: {title: 'Precipitation (mm)'},
          colors: ['#EF851C'],
          trendlines: {
              0: {
                  type: 'linear',
                  visibleInLegend: true,
                  color: 'blue',
                  opacity: 1,
                  lineWidth: 2,
                  pointSize: 0
              }
          }
      })
      .setChartType('ColumnChart');
//Monthly
  var MonthChart = ui.Chart.image.series(monthlyPrecip , geometry, ee.Reducer.mean(), 2500)
  .setOptions({
    title: "Precipitation by month Over Time ",
    hAxis: {title: 'Time'},
    vAxis: {title: 'Precipitation (mm)'},
    colors:['#31a354'],
    pointSize: 3,
    trendlines: { 
      0: { 
        type: 'linear', 
        visibleInLegend: true,
        color: 'blue',
        opacity: 1,
        lineWidth: 2,
        pointSize: 0
      } 
    }  
  })
  // Create an prec daily chart.
  var precChart = ui.Chart.image.series(precip, geometry, ee.Reducer.mean(), 500);
  precChart.setOptions({
    title: 'Precipitation Daily Over Time',
    vAxis: {title: 'Precipitation (mm)'},
    hAxis: {title: 'date', format: 'MM-yy'},
    pointSize:2,
   trendlines: { 
    0: { 
      type: 'linear', 
      visibleInLegend: true,
      color: 'black',
      opacity: 1,
      lineWidth: 2,
      pointSize: 0
    } 
  }  
  }).setChartType('ScatterChart');
  chartPanel.widgets().reset([])
  chartPanel.widgets().add(chart)
  chartPanel.widgets().add(MonthChart)
  chartPanel.widgets().add(precChart)    
}
function onSelectionModeChanged(mode) {
  districtsLayer.setOpacity(mode === 'Buffer of point click' ? 0 : 1)
  chartPanel.widgets().reset([])
  selectionLayer.setEeObject(ee.Image())
}
function onMapClicked(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat)
  var mode = selectionMode.getValue()
  var selection = mode === 'Buffer of point click' ? point.buffer(6000) : districts.filterBounds(point)
  selectionLayer.setEeObject(selection)
  showChart(selection, 'Time series over ' + mode)
}
// UI
Map.style().set('cursor', 'crosshair');
Map.onClick(onMapClicked)
// main panel
var panel = ui.Panel();
panel.style().set('width', '400px')
ui.root.insert(0, panel);
var title = ui.Panel([
    ui.Label({
        value: 'PRECIPITATION 2010 - 2018',
        style: {fontSize: '20px', fontWeight: 'bold'}
    })
]);
panel.add(title)
var title_boundary = ui.Panel([
    ui.Label({
        value: '1) Select an option:',
        style: {fontSize: '15px', fontWeight: 'bold'}
    })
]);
panel.add(title_boundary)
var selectionMode = ui.Select({
    items: ['Buffer of point click', 'District boundary'],
    value: 'Buffer of point click',
    // placeholder: 'Select an option',
    onChange: onSelectionModeChanged
})
panel.widgets().add(selectionMode)
var chartPanel = new ui.Panel()
panel.add(chartPanel)