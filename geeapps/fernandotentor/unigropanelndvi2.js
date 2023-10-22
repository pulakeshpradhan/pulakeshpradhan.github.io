var table = ee.FeatureCollection("users/ftentor/unigro/Delmas"),
    table2 = ee.FeatureCollection("users/ftentor/unigro/Dipaleseng");
var pkg_vis  = require('users/fernandotentor/shared:pkg_vis.js');
var fechain = '2018-08-01';
var fechafin = Date.now();
var hoy = new Date();
// Filter collection to dates of interest.
var vis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
  ]};
//////////////////  MODIS DATA
var MOD = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate('2010-06-01', fechafin)
    .sort('system:time_start',true)
var EVI = MOD.select(['NDVI']).map (function (image){ 
              var evi = image.divide(10000).copyProperties(image,['system:time_start'])
              return evi
              });
/////////////// S2 DATA
var ndvi_data = function (table) {
  var S2 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(fechain, fechafin)
    .filterBounds(table)
  // MOSAIC
  var list_dates = ee.Dictionary(S2.aggregate_histogram('system:time_start')).keys()
  var S2_mosaic = list_dates.map (function (date){
                var dates = ee.Number.parse(date)
                var image = S2.filterDate(ee.Date(dates),ee.Date(dates).advance(1,'day'))
                return ee.ImageCollection(image).mosaic().set({'system:time_start':dates})
  });
  // NDVI
  var NDVI = ee.ImageCollection(S2_mosaic).map (function (image){ 
              var ndvi = image.normalizedDifference(['B8','B4']).copyProperties(image,['system:time_start'])
              //var mask = image.select('QA60').eq(0);
              var score = image.select('B2').multiply(image.select('B9')).divide(1e4);
              var cloudScoreThreshold = 400;
              var cloud = score.lt(cloudScoreThreshold);
              return ee.Image(ndvi).updateMask(cloud).rename(['ndvi']).clip(table)
              });
  ////////////////////////////////   INTERPOLATE    ///////////////////////////////////////
  var addTimeBand = function(image) {
  return image.addBands(image.metadata('system:time_start').rename("time"))
  };
  var annualSR = NDVI.map(addTimeBand)
  var time = 'system:time_start'
  var maxDiff = ee.Filter.maxDifference(15 * (1000*60*60*24), time, null, time)
  var f1 = ee.Filter.and(ee.Filter.lessThanOrEquals(time, null, time))
  var c1 = ee.Join.saveAll('after', time, false).apply(annualSR, annualSR, f1)
  var f2 = ee.Filter.and(maxDiff,ee.Filter.greaterThanOrEquals(time, null, time))
  var c2 = ee.Join.saveAll('before', time, true).apply(c1, c1, f2)
  var interpolated = ee.ImageCollection(c2.map(function(img) {
    img = ee.Image(img);
    var before = ee.ImageCollection.fromImages(ee.List(img.get('before'))).mosaic()
    var after = ee.ImageCollection.fromImages(ee.List(img.get('after'))).mosaic()
    var x1 = before.select('time').double()
    var x2 = after.select('time').double()
    var now = ee.Image.constant(img.date().millis()).double();
    var ratio = now.subtract(x1).divide(x2.subtract(x1))  
    var interp = after.subtract(before).multiply(ratio).add(before)
    return interp.set('system:time_start', img.get('system:time_start'));
    }))
  //////////////////// SMOOTH  ////////////////////////////////////////////
  var modeled = interpolated.select('ndvi')
  var timeField = 'system:time_start'
  var join = ee.Join.saveAll({
    matchesKey: 'images'
  });
  var diffFilter = ee.Filter.maxDifference({
    difference: 1000 * 60 * 60 * 24 * 17,
    leftField: timeField, 
    rightField: timeField
  });
  var threeNeighborJoin = join.apply({
    primary: modeled, 
    secondary: modeled, 
    condition: diffFilter
  });
  var smoothed = ee.ImageCollection(threeNeighborJoin.map(function(image) {
    var collection = ee.ImageCollection.fromImages(image.get('images'));
    return ee.Image(image).addBands(collection.mean().rename('mean'));
  }));
  var chart_data = smoothed.select('mean').map (function (image) {
            var mean = image.reduceRegion(ee.Reducer.mean(),table,500)
            var time = ee.String('2018-').cat(ee.String(ee.Date(image.get('system:time_start')).format('MM-dd')))
            var serie = ee.String(ee.Date(image.get('system:time_start')).format('yyyy'))
            return ee.Feature(table,mean).set({'ndvi':mean.get('mean'),'time':ee.Date(time), 'serie':serie})
});
 return new Object({'Chart_data':chart_data,'ndvi_s2':NDVI})
};
var chart_data = ndvi_data(table)
////////////// CHART
//print (ee.Dictionary(chart_data))
//print (ee.FeatureCollection(chart_data).getDownloadURL('csv',['ndvi','serie','time']))
//Export.table.toAsset(chart_data,'chart_data') // 'time':ee.Date(time).format('yyyy-MM-dd')
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '600px',
    backgroundColor: '#bedef6'
  },
}).add(ui.Label('Choose Zone',{
  margin  :'8px auto',
  backgroundColor: '#bedef6',
  fontWeight: '800'
}));
var places = {
  Delmas: table,
  Dipaleseng: table2,
};
var select = ui.Select({
  style : {minWidth:'400px',margin  :'8px auto'},
  items: Object.keys(places),
  onChange: function(key) {
    var chart_data = ndvi_data(places[key]);
/////////////// Chart S2 ////////////////
    var imgSeries = ui.Chart.feature.groups({
      features: ee.Dictionary(chart_data).get('Chart_data'),
      xProperty: 'time',
      yProperty: 'ndvi',
      seriesProperty: 'serie'
    }).setOptions({
      animation : {startup : true, duration:2000,easing:'out'},
        curveType:'function',
        title: 'Sentinel 2 NDVI per year',
        vAxis: {title: 'NDVI',
          textStyle: {
            color: '#000000',
              fontSize: 11,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 14,
              bold: true
            }
        },
        hAxis: {title: 'Date', format: 'MMM-dd',gridlines: {count: 9},
          textStyle: {
            color: '#000000',
              fontSize: 10,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 12,
              bold: true
            }
        },
        backgroundColor: '#f6eee4',
        colors: ['#097138'], // #1a237e
         series: {
          0: {
            lineWidth: 3
          }
         },
        interpolateNulls : true,
        explorer: {axis: 'horizontal',
         keepInBounds: true,
         maxZoomIn: 4.0
        }
     });
/////////////// Chart MODIS ////////////////
     var ndviChart = ui.Chart.image.series(EVI, places[key], ee.Reducer.mean(), 1000);
        ndviChart.setOptions({
          animation : {startup : true, duration:2000,easing:'out'},
          curveType:'function',
          title: 'MODIS NDVI',
          vAxis: {title: 'NDVI',
            textStyle: {
            color: '#000000',
              fontSize: 11,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 14,
              bold: true
            }
          },
          hAxis: {title: 'Date', format: 'yyyy-MM-yy', gridlines: {count: 9},
            textStyle: {
            color: '#000000',
              fontSize: 10,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 12,
              bold: true
            }
          },
          backgroundColor: '#f6eee4',
          colors: ['#1a237e'],
         series: {
          0: {
            lineWidth: 3
          }
         },
          explorer: { axis: 'horizontal', keepInBounds: true,maxZoomIn: 4.0},
          trendlines: {  0: {type: 'linear',color: 'green',lineWidth: 3,opacity: 0.3,
                              showR2: false,visibleInLegend: false}
           }
        });
      var EVI_stack = EVI.select('NDVI').map (function (image) {
            var mean = image.reduceRegion(ee.Reducer.mean(),places[key],1000)
            var time = ee.String('2018-').cat(ee.String(ee.Date(image.get('system:time_start')).format('MM-dd')))
            var serie = ee.String(ee.Date(image.get('system:time_start')).format('yyyy'))
            return ee.Feature(places[key],mean).set({'ndvi':mean.get('NDVI'),'time':ee.Date(time), 'serie':serie})
          });
/////////////// Chart MODIS stack ////////////////
      var ndviChart_stack = ui.Chart.feature.groups({features: EVI_stack,
          xProperty: 'time',yProperty: 'ndvi',seriesProperty: 'serie'
          }).setOptions({
            animation : {startup : true, duration:2000,easing:'out'},
            curveType:'function',
             series: {
            7: {color: '#00FF00',
                lineWidth: 5}
          },
            title: 'MODIS NDVI per year',
           vAxis: {title: 'NDVI',viewWindow : {min:0.0,max:0.75},
            textStyle: {
            color: '#000000',
              fontSize: 11,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 14,
              bold: true
            }
           },
           hAxis: {title: 'Date', format: 'MMM-dd',gridlines: {count: 9},
             textStyle: {
            color: '#000000',
              fontSize: 10,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 12,
              bold: true
            }
           },
           backgroundColor: '#f6eee4',
           interpolateNulls : true,
           explorer: {axis: 'horizontal',keepInBounds: true,maxZoomIn: 4.0}
        });
    var s2 = ee.ImageCollection(ee.Dictionary(chart_data).get('ndvi_s2')).sort('system:time_start',false)
    var fechaend = ee.Image(s2.first()).date().format('yyyy-MM-dd').getInfo()
    Map.clear()
    Map.centerObject(places[key],11);
    Map.addLayer(places[key],{},'Region ' + key,false)
    var showMosaic = function(range) {
  var mosaic = s2.filterDate(range.start(), range.end()).max();
  // Asynchronously compute the name of the composite.  Display it.
  range.start().evaluate(function(name) {
    var layer = ui.Map.Layer(mosaic, vis, 'NDVI '+ key);
    Map.layers().set(1, layer);
  });
};
    var dateRange = ee.DateRange(fechain,fechaend).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 10,
    onChange: showMosaic,
    style : {width:'300px'}
  });
  Map.add(dateSlider.setValue(fechaend));
});
  //  Map.addLayer(ee.Image(s2.first()),vis,'NDVI '+ key)
    var lg_vi    = pkg_vis.grad_legend(vis, 'NDVI', false)
    pkg_vis.add_lgds([lg_vi]);
    panel.widgets().set(2, imgSeries);
    panel.widgets().set(3, ndviChart);
    panel.widgets().set(4, ndviChart_stack);
  }
});
// Set a place holder.
select.setPlaceholder('Zones');
panel.add(select)
//ui.root.clear();
ui.root.insert(0,panel);