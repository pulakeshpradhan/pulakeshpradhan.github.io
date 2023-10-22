var image = ee.Image("users/zandersamuel/Apps/ZSV_logo");
ui.root.clear();
var logo = ui.Thumbnail(image,{dimensions: '600',min:0, max:255},null,{height:'60px',width:'150px'});
var geometry = /* color: #d63000 */ee.Geometry.Point([23.203125, -6.664607562172573]);
//var utils = require('users/zandersamuel/default:Utils/Legend');
//var mapStyle = require('users/zandersamuel/default:Utils/DarkMap');
var createLegend = function(title, minVal, maxVal, minLab, maxLab, palette) { 
  var geometry = ee.Geometry.Polygon(
          [[[-54, -4.05],
            [-53, -4.05],
            [-53, -4.00],
            [-54, -4.00]]]);
  var latlong = ee.Image.pixelLonLat();
  var legend = ui.Panel({
      style: {
          position: 'bottom-left',
      }
  });
  // layer 1
  var obj = {
      "title": ui.Label({
          "value": title,
          "style": {
              "fontSize": '14px',
              "margin": '3px 0 0 3px',
          }
      }),
      "bar": ui.Thumbnail({
          "image": latlong.clip(geometry).visualize({
              "bands": ['longitude'],
              "min": -54,
              "max": -53,
              "palette": palette
          }),
          "params": {
              "region": geometry.toGeoJSON(),
              "format": 'png'
          },
          "style": {
              "height": '15px',
              "width": '250px',
              "margin": '-1px 0 0 8px',
              "border": '1px solid gray'
          }
      }),
      "panel1": ui.Panel({
          "layout": ui.Panel.Layout.flow('horizontal'),
      }),
      "panel2": ui.Panel({
          "layout": ui.Panel.Layout.flow('horizontal'),
      }),
      "minAxis": ui.Label({
          "value": minVal,
          "style": {
              "margin": '0 0 0 4px',
              "fontSize": '12px'
          }
      }),
      "maxAxis": ui.Label({
          "value": maxVal,
          "style": {
              "margin": '0 0 0 240px',
              "fontSize": '12px'
          }
      }),
      "minLabel": ui.Label({
          "value": minLab,
          "style": {
              "margin": '0 0 0 6px',
              "fontSize": '12px'
          }
      }),
      "maxLabel": ui.Label({
          "value": maxLab,
          "style": {
              "margin": '0 0 0 200px',
              "fontSize": '12px'
          }
      })
  };
  /**
   *
   */
  var legendAddLayer = function(legend, layer) {
      legend.add(layer.title);
      layer.panel1.add(layer.minAxis);
      layer.panel1.add(layer.maxAxis);
      layer.panel2.add(layer.minLabel);
      layer.panel2.add(layer.maxLabel);
      legend.add(layer.panel1);
      legend.add(layer.bar);
      legend.add(layer.panel2);
      return legend;
  };
  // Add Layers
  return legendAddLayer(legend, obj);
  // legend = legendAddLayer(legend, defIndex2);
}
var DARK = [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#212121"
                }]
            },
            {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#212121"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#bdbdbd"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#181818"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#616161"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1b1b1b"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#2c2c2c"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8a8a8a"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#373737"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#3c3c3c"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#4e4e4e"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#616161"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#3d3d3d"
                }]
            }
        ];
var map = ui.Map();
map.setOptions('Dark', {'Dark': DARK});
var text1 = ui.Label({
    value:'Fire, vegetation and rainall inspector',
    style: {fontSize: '16px', fontWeight: 'bold'}
  });
var text2 =ui.Label({
    value:'Click anywhere on the map to view graphed time-series',
    style: {fontSize: '12px'}
  })
var text3 =ui.Label({
    value:'Change the visible layer with the drop-down button here:',
    style: {fontSize: '12px'}
  })
var panel = ui.Panel({widgets: [text1,text2, text3],style: {width: '600px'}});
// Add the panel to the ui.root.
ui.root.add(panel).add(map);
map.setCenter(23.203125, -6.664607562172573, 3);
map.style().set('cursor', 'crosshair');
var monitor_start = '2000-01-01';
var monitor_end = '2017-12-31';
// Create the inspector panel
var inspector = ui.Panel({style: {shown: true, position: 'bottom-center'}});
map.add(inspector);
///////////// Fire
var mask = function(image){
  var burnImg = image.select('BurnDate')
  var burnMask = burnImg.updateMask(burnImg.gt(1)).updateMask(burnImg.lt(365)); 
  return image.updateMask(burnMask);
};
var fire = ee.ImageCollection('MODIS/006/MCD64A1')
  .map(mask)
  .select(['BurnDate']);
//////////// EVI
var evi = ee.ImageCollection('MODIS/006/MOD13Q1')
  .select('EVI');
print(evi, 'EVI');
//////////// TerraClimate
var tClim = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
          .filterDate('2001-01-01', '2018-01-01');
print(tClim, 'TerraClim');
////////////// Rainfall
var rainfall = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
  .select(['precipitation'], ['rainfall']);
print(rainfall, 'CHIRPS rainfall');
function compute(begin, end) {
    var t = begin.millis()
    return fire.filterDate(begin, end).max()
      .addBands(evi.filterDate(begin, end).mean().divide(1000).rename('evi'))
      .addBands(rainfall.filterDate(begin, end).mean())
      //.addBands(tClim.filterDate(begin, end).mean())
      .set('system:time_start', t)
  }
var years = ee.List.sequence(2001, 2017)
var months = ee.List.sequence(1, 12)
var results = years.map(function(year) {
  return months.map(function(month) {
    var begin = ee.Date.fromYMD(year, month, 1)
    var end = begin.advance(1, 'month')
    return compute(begin, end)
  })
})
///////////// COMBINED
var combined = ee.ImageCollection(results.flatten())
print(combined, 'combined evi, rain, fire')
var combined = combined.map(function(i){
  var fireUnmasked = i.select('BurnDate').gt(0).unmask(ee.Image(0));
  return i.addBands(fireUnmasked.rename('fire'));
});
var firePalette = ['#b7f7ff', '#00d0ff', '#15ff00', '#fff600', '#ff0000', '#ff07cd'];
var firePalette2 = ['#004cff', '#ffff00', '#01a514'];
var vizParamsFreq = {
  min: 0, max: 18, 
  palette: firePalette,
  opacity: 0.4
};
var vizParamsBD = {
  min: 0, max: 365, 
  palette: firePalette2,
  opacity: 0.4
};
var fireFreq = combined.select('BurnDate').count();
//Map.addLayer(fireFreq, vizParamsFreq, 'Fire frequency');
var burnDate = combined.select('BurnDate').mean();
//Map.addLayer(burnDate, vizParamsBD , 'Burn date');
// Create a layer selector that dictates which layer is visible on the map.
var fireFreqLegend = createLegend('Fire frequency between 2000 and 2018', '0', '18', 'Low', 'High', firePalette);
var burnDateLegend = createLegend('Burn day-of-year', '0', '365', 'January', 'December', firePalette2);
var viz = {
        Fire_frequency: [fireFreq, vizParamsFreq,  fireFreqLegend],
        Burn_date: [burnDate, vizParamsBD, burnDateLegend]
      };
var vizParams = viz.Fire_frequency[1];
map.addLayer(fireFreq, vizParams, 'Fire frequency');
inspector.widgets().set(0, fireFreqLegend);
var selectViz = ui.Select({
  items: Object.keys(viz),
  value: 'Fire_frequency',
  onChange: redraw,
});  
panel.widgets().set(3, selectViz);
function redraw() {
  var val = String(selectViz.getValue());
  vizParams = viz[val][1];
  var ImgLayer = ui.Map.Layer(viz[val][0], vizParams, val);
  map.layers().set(0, ImgLayer);
  print(Map.layers())
  inspector.widgets().set(0, viz[val][2])
}
map.onClick(function(coords) {
  panel.clear();
  // Location
  var pgeo = ee.Geometry.Point([coords.lon, coords.lat]);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}, 'point'));
  //Map.centerObject(pgeo, 10);
  // Create or update the location label (the second widget in the panel)
  var location = 'Lon: ' + coords.lon.toFixed(2) + ' ' +
                 'Lat: ' + coords.lat.toFixed(2)
  // Create a chart of NDVI over time.gv, shade, npv, soil
  var chart = ui.Chart.image.series(combined.select(['fire', 'evi']), pgeo, ee.Reducer.mean(), 500)
      .setOptions({
        title: 'EVI per month with fire',
        vAxis: {title: 'EVI'},
        lineWidth: 1,
        pointSize: 0,
        colors: ['green', 'red']
      });
  var chart2 = ui.Chart.image.series(combined.select(['rainfall']), pgeo, ee.Reducer.mean(), 500)
      .setOptions({
        title: 'Rainfall per month',
        vAxis: {title: 'Rainfall (mm)'},
        lineWidth: 1,
        pointSize: 0,
      }).setChartType('ColumnChart');
  panel.widgets().set(0, text1);
  panel.widgets().set(1,text2);
  panel.widgets().set(2, text3);
  panel.widgets().set(3, selectViz);
  panel.widgets().set(4, ui.Label(location));
  panel.widgets().set(5, chart);
  panel.widgets().set(6, chart2);  
  panel.widgets().set(7,ui.Label('This app was made by ZSV consulting. Contact them for more information: http://zsv.co.za'));
  panel.widgets().set(8,logo);
});