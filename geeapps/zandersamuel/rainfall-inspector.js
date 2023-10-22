var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-11.864680767075697, 31.50128523426904],
          [-11.864680767075697, -34.454485480547795],
          [53.1743817329243, -34.454485480547795],
          [53.1743817329243, 31.50128523426904]]], null, false),
    chirpsMean = ee.Image("users/grazingresearch/chirpsMean"),
    persiannMean = ee.Image("users/grazingresearch/persiann"),
    trmmMean = ee.Image("users/grazingresearch/trmmMean"),
    gldasMean = ee.Image("users/grazingresearch/gldasMean");
ui.root.clear();
var createLegend = function(title, minVal, maxVal, minLab, maxLab, palette) { 
  var geometry = ee.Geometry.Polygon(
          [[[-54, -4.05],
            [-53, -4.05],
            [-53, -4.00],
            [-54, -4.00]]]);
  var latlong = ee.Image.pixelLonLat();
  var legend = ui.Panel({
      "style": {
          "position": 'top-left',
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
var startDate = '1970-01-01';
var endDate = '2018-12-31';
var map = ui.Map();
map.setCenter(23.203125, -6.664607562172573, 3);
map.style().set('cursor', 'crosshair');
var panel = ui.Panel({style: {width: '625px'}});
panel.widgets().set(0,ui.Label({
    value:'Rainfall inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }));
// Add the panel to the ui.root.
ui.root.add(panel).add(map);
var inspector = ui.Panel({style: {shown: true, position: 'bottom-center'}});
inspector.add(ui.Label('Click a point on the map'));
map.widgets().set(0,inspector);
var temporalAverage = function(collection, unit) {
  var startDate = ee.Date(ee.Image(collection.sort('system:time_start').first().get('system:time_start')));
  startDate = startDate.advance(ee.Number(0).subtract(startDate.getRelative('month',unit)),'month')
    .update(null,null,null,0,0,0);
  var endDate = ee.Date(ee.Image(collection.sort('system:time_start',false).first()).get('system:time_start'));
  endDate = endDate.advance(ee.Number(0).subtract(endDate.getRelative('month',unit)),'month')
    .advance(1,unit).advance(-1,'month')
    .update(null,null,null,23,59,59);
  var dateRanges = ee.List.sequence(0, endDate.difference(startDate,unit).round().subtract(1))
  function makeTimeslice(num) {
    var start = startDate.advance(num, unit);
    var startDateNum = start.millis();
    var end = start.advance(1, unit).advance(-1, 'second');
    var filtered = collection.filterDate(start, end);
    var unitMeans = filtered.mean()
      .set('system:time_start',startDateNum,'system:time_end',end,'date',start);
    return unitMeans;
  }
  var new_collection = ee.ImageCollection(dateRanges.map(makeTimeslice));
  return new_collection;
};
var gldas = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
    .filterDate(startDate, endDate)
    .select(['Rainf_tavg'],['precipitation']);
gldas = temporalAverage(gldas,'day');
gldas = gldas.map(function(i){return i.multiply(86400).set('system:time_start', i.get('system:time_start'))});
//https://explorer.earthengine.google.com/#detail/NASA%2FGLDAS%2FV021%2FNOAH%2FG025%2FT3H
var chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
    .filterDate(startDate, endDate)
    .select('precipitation');
//https://explorer.earthengine.google.com/#detail/UCSB-CHG%2FCHIRPS%2FDAILY
var worldclim = ee.Image('WORLDCLIM/V1/BIO');
//https://explorer.earthengine.google.com/#detail/WORLDCLIM%2FV1%2FBIO
var terraclim = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE').filterDate(startDate, endDate);
//https://explorer.earthengine.google.com/#detail/IDAHO_EPSCOR%2FTERRACLIMATE
var trmm = ee.ImageCollection('TRMM/3B43V7')
    .filterDate(startDate, endDate)
    .select('precipitation')
    .map(function(i){return i.multiply(24).set('system:time_start', i.get('system:time_start'))});
//https://explorer.earthengine.google.com/#detail/TRMM%2F3B43V7
var persiann = ee.ImageCollection('NOAA/PERSIANN-CDR')
    .filterDate(startDate, endDate);
//https://explorer.earthengine.google.com/#detail/NOAA%2FPERSIANN-CDR
print(persiann.limit(35))
var ncep = ee.ImageCollection('NCEP_RE/surface_temp').filterDate(startDate, endDate);
//https://explorer.earthengine.google.com/#detail/NCEP_RE%2Fsurface_temp
var modtemp = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(startDate, endDate);
//https://explorer.earthengine.google.com/#detail/MODIS%2F006%2FMOD11A1
var PPT_PALETTE = 'F5F5DC, D2B48C, 40E0D0, 80FF00, 006400, 0000FF';
var TEMP_PALETTE = '330066,0000cc,33ccff,e6e600,ff9900,ff0000';
var TREND_PALETTE = 'ff0000, 00ff00,00ff00, 0000ff';
var meanViz = {min:0, max:6, palette:PPT_PALETTE};
//var trendViz = {};
var setViz = function(image, palette) {
  var min = image.rename('value').reduceRegion(ee.Reducer.percentile([5]), geometry, 100000)
  var max = image.rename('value').reduceRegion(ee.Reducer.percentile([95]), geometry, 100000)
  return image.visualize({min:min.get('value'), max:max.get('value'), palette: palette})
};
var getTrend = function(collection, band) {
  var first = ee.Image(collection.first()).date().get('year');
  var col = collection.select(band).map(function(img) {
    var year = ee.Date(img.get('system:time_start')).get('year').subtract(first)
    return ee.Image(year).byte().addBands(img).set('system:time_start', img.get('system:time_start'))
  })
  var trend = col.reduce(ee.Reducer.linearFit());
  return trend.select('scale');
};
var makeChart = function(collection, point, title) {
  var chart = ui.Chart.image.series(collection, point, ee.Reducer.mean(), 5000)
      .setOptions({
        title: title,
        lineWidth: 1,
        pointSize: 0,
        trendlines: {0: {color: 'CC0000'}},
        colors: ['blue']
      }).setChartType('ColumnChart');
  return chart
};
// Make decade selector
var decades = {
  '1978-1988': {'startDate':'1978-01-01', 'endDate':'1988-01-01'},
  '1988-1998': {'startDate':'1988-01-01', 'endDate':'1998-01-01'},
  '1998-2008': {'startDate':'1998-01-01', 'endDate':'2008-01-01'},
  '2008-2018': {'startDate':'2008-01-01', 'endDate':'2018-01-01'},
};
var selectDec = ui.Select({
  items: Object.keys(decades),
  value: '2008-2018',
  onChange: setCharts,
});
panel.widgets().set(1,ui.Label({
    value:'Select the decade of rainfall data to display here:',
    style: {fontSize: '16px'}
  }));
panel.widgets().set(2,selectDec);
var point = ee.Geometry.Point([23.203125, -6.664607562172573]);
var ptLayer = ui.Map.Layer(point, {color: '#ff00cb'}, 'point');
function setCharts() {
  var startDate = decades[selectDec.getValue()].startDate;
  var endDate = decades[selectDec.getValue()].endDate;
  print(startDate)
  ptLayer = ui.Map.Layer(point, {color: '#ff00cb'}, 'point');
  map.centerObject(point, 3);
  map.layers().set(1,ptLayer);
  var chartCHIRPS = makeChart(chirps.filterDate(startDate,endDate), point,'CHIRPS');
  var chartGLDAS = makeChart(gldas.filterDate(startDate,endDate), point,'GLDAS');
  var chartTRMM = makeChart(trmm.filterDate(startDate,endDate), point,'TRMM');
  var chartPERSIANN = makeChart(persiann.filterDate(startDate,endDate), point,'PERSIANN');
  panel.widgets().set(5,ui.Label({
    value:'Click the arrow on corner of graphs below to expand and download data',
    style: {fontSize: '16px'}
  }));
  panel.widgets().set(6,chartCHIRPS);
  panel.widgets().set(7,chartGLDAS);
  panel.widgets().set(8,chartTRMM);
  panel.widgets().set(9,chartPERSIANN);
  panel.widgets().set(10,ui.Label({
      value:'Contact Zander Venter for links to data sources: zandersamuel@gmail.com',
      style: {fontSize: '14px', fontWeight: 'bold'}
    }))
}
map.onClick(function(coords) {
  point = ee.Geometry.Point([coords.lon, coords.lat]);
  map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}, 'point'));
  setCharts()
});
var startImg = ui.Map.Layer(chirpsMean, meanViz, 'CHIRPS ppt',true,0.6);
map.layers().set(0,startImg);
map.layers().set(1,ptLayer);
var trendLegend = createLegend('Trend rainfall mm/year', '-0.2', '0.2', 'Decline', 'Increase', TREND_PALETTE);
var rainLegend = createLegend('Rainfall mm/year', '0', '2500', 'Low','High',PPT_PALETTE);
map.widgets().set(1,rainLegend);
var cols = {
  'CHIRPS': {'label':'CHIRPS', 'collection':chirps, 'image':chirpsMean},
  'GLDAS': {'label':'GLDAS', 'collection':gldas,'image':gldasMean},
  'TRMM': {'label':'TRMM', 'collection':trmm,'image':trmmMean},
  'PERSIANN': {'label':'PERSIANN', 'collection':persiann,'image':persiannMean}
};
var selectCol = ui.Select({
  items: Object.keys(cols),
  value: 'CHIRPS',
  onChange: reset,
});
function reset() {
 // map.layers().reset()
  var collection = cols[selectCol.getValue()].collection
  var select = selectViz.getValue();
  if (select == 'Mean') {
    var layerSelect =  ui.Map.Layer(cols[selectCol.getValue()].image,meanViz, cols[selectCol.getValue()].label,true,0.6);
    map.layers().set(0,layerSelect);
  } else {
    layerSelect =  ui.Map.Layer(setViz(getTrend(collection.select(0),0),TREND_PALETTE), {}, cols[selectCol.getValue()].label,true,0.6);
    map.layers().set(0,layerSelect);
  }
}
panel.widgets().set(3,ui.Label({
    value:'Select the rainfall dataset to display on the map here:',
    style: {fontSize: '16px'}
  }));
panel.widgets().set(4,selectCol);
var viz = {
  'Mean': {'label':'Mean'},
  'Trend': {'label':'Trend'}
};
var selectViz = ui.Select({
  items: Object.keys(viz),
  value: 'Mean',
  onChange: selectVizChanged,
  style: {'position': 'top-center'}
});
map.add(selectViz);
function selectVizChanged() {
  var collection = cols[selectCol.getValue()].collection
  var select = selectViz.getValue();
  if (select == 'Mean') {
    var layerSelect =  ui.Map.Layer(cols[selectCol.getValue()].image,meanViz, cols[selectCol.getValue()].label,true,0.6);
    map.layers().set(0,layerSelect);
    map.widgets().set(1,rainLegend);
  } else {
    layerSelect =  ui.Map.Layer(setViz(getTrend(collection.select(0),0),TREND_PALETTE), {}, cols[selectCol.getValue()].label,true,0.6);
    map.layers().set(0,layerSelect);
    map.widgets().set(1,trendLegend);
  }
}