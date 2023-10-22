var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "precipitationCal"
        ],
        "min": 762.5810132387354,
        "max": 1854.5820004583584,
        "palette": [
          "ffffff",
          "0000ff"
        ]
      }
    }) || {"opacity":1,"bands":["precipitationCal"],"min":762.5810132387354,"max":1854.5820004583584,"palette":["ffffff","0000ff"]};
var fechain = '2019-01-01';
var fechafin = '2019-12-31'
var palette = ['#96d1fe','#78b8fa','#3d95f5','#1d6beb','#1465d1','#0d9f0d','#26bf26','#4bf24e','#d3fbac','#fde875',
                '#fdc13b','#fd9f00','#fc6101','#fb1c01','#a70000','#8a0002','#880100','#633928']
////////// PARAMETROS
var start = ee.Date(fechain);
var end = ee.Date(fechafin);
var days = end.difference(start, 'day')
var aggregation = 1
////////////////  CREATE PANEL 
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '600px',
    backgroundColor: '#bedef6'
  }, }).add(ui.Label('',{
  margin  :'8px auto',
  backgroundColor: '#bedef6',
  fontWeight: '800'
}));
///////////  LOAD PANEL
ui.root.insert(0,panel)
/////////////////////// DATA EXTRACT
function charts (start,end, geometry){
  var prec_data = function (table) {
    var collection = ee.ImageCollection('NASA/GPM_L3/IMERG_V06').filterBounds(geometry).select(['precipitationCal']);
    var prec = ee.List.sequence(0, days.int(),aggregation).map(function(count) {return start.advance(count, 'day')})
                                                          .map(function(date){ var images_g = collection.filterDate(date,ee.Date(date).advance(aggregation,'day'))
                  return images_g.sum().set('system:time_start',ee.Date(date).millis()).set('system:date',ee.Date(date))
                })
    var Sprec_clean = ee.ImageCollection(prec.map(function (image) { return ee.Algorithms.If(ee.Image(image).bandNames(),ee.Image(image))},true));
    //
    var dailycollection = Sprec_clean.map(function (image){ 
            var img = ee.Image(image).divide(2)
            return img.copyProperties(image,['system:time_start'])})
    // compute chart data
    var chart_data = dailycollection.map (function (image) {
            var mean = image.reduceRegion(ee.Reducer.mean(),table,1000) /// ver frecuencia de la imagen
            var time = ee.String(ee.Date(image.get('system:time_start')).format('yyyy-MM-dd'))
            var serie = ee.String(ee.Date(image.get('system:time_start')).format('yyyy'))
            return ee.Feature(table).set({'prec':mean.get('precipitationCal'),'time':ee.Date(time), 'serie':serie})
    });
    return [chart_data,dailycollection]
    };
  var result = prec_data(geometry)
  var chart_data = ee.FeatureCollection(result[0])
  var dailycollection = result[1]
  /////////////// COMPUTE ACCUMULATED
  var time0 = chart_data.sort('time',true).first().get('time');
  var prec0 = chart_data.sort('time',true).first().get('prec');
  var serie0 = chart_data.sort('time',true).first().get('serie');
  var first = ee.List([
      ee.Feature(null).set({'time':time0,'prec':prec0,'Prec_accum':prec0,'serie':serie0})
  ]);
  var accumulate = function(feature, list) {
  var previous = ee.Feature(ee.List(list).get(-1)).get('Prec_accum');
  var current = feature.get('prec')
  var added = ee.Number(previous).add(current)
      return ee.List(list).add(feature.set({'Prec_accum':added}));
  };
  var cumulative = ee.FeatureCollection(ee.List(chart_data.filter(ee.Filter.neq('time',ee.Date(time0)))// filtra el primero
              .iterate(accumulate, first)));
  var accum = ee.FeatureCollection(cumulative).aggregate_max('Prec_accum')
  ///////////////// CHART PRECIPITATION BAR
  var imgSeries = ui.Chart.feature.byFeature({
        features: chart_data,
        xProperty: 'time',
        yProperties: 'prec',
      })
      .setOptions({
        animation : {startup : true, duration:2000,easing:'out'},
          curveType:'function',
          title: 'GPM Precipitation',
          vAxis: {title: 'Prec / mm',
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
          hAxis: {title: 'Date', format: 'yyyy-MM-dd',gridlines: {count: 9},
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
          lineWidth: 3,
          interpolateNulls : true,
          explorer: {axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 4.0
          }
      })
      .setChartType('ColumnChart');
  panel.widgets().set(1, imgSeries);
  // // ////////////////// CHART ACCUMULATED LINE 
  var imgSeries_acc = ui.Chart.feature.byFeature({
        features: cumulative,
        xProperty: 'time',
        yProperties: 'Prec_accum',
      })
      .setOptions({
        animation : {startup : true, duration:2000,easing:'out'},
          curveType:'function',
          title: 'Cumulative precipitation over time',
          vAxis: {title: 'Prec / mm',
            viewWindow : {min : 0, max : accum},
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
          hAxis: {title: 'Date',
            format: 'yyyy-MM-dd',gridlines: {count: 9},
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
          lineWidth: 3,
          interpolateNulls : true,
          explorer: {axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 4.0
          }
      });
  panel.widgets().set(2, imgSeries_acc);
  panel.remove(panel.widgets().get(0))
  panel.remove(panel.widgets().get(2))
  panel.remove(panel.widgets().get(2))
  panel.remove(panel.widgets().get(2))
  var vis = {min:ee.Number(accum).divide(2),max:ee.Number(accum).multiply(1.5),palette:palette}//["ffffff","0000ff"]}
  if (Map.layers().length()){
        Map.remove(Map.layers().get(0));
    }
  Map.addLayer(dailycollection.sum().visualize(vis).paint(geometry.buffer(5000),'red',3),{},'Precipt accum ',1,0.9)
  return accum
}
////////////// TEXT BOX
var textbox_fechain = ui.Textbox({
  // value:fechain,
  placeholder: 'ej: 2020-01-01',
  onChange: function(text) {
    start = ee.Date(text)
    select_fechafin(start);
  }
});
panel.add(ui.Label('Seleccione Fecha inicio yyyy-mm-dd'))
panel.widgets().add(textbox_fechain);
function select_fechafin (start){
  var textbox_fechafin = ui.Textbox({
    // value:fechafin,
    placeholder: 'ej: 2020-05-01',
    onChange: function(text) {
      end = ee.Date(text)
      inpector(start,end);
    }
  });
  panel.add(ui.Label('Seleccione Fecha finalizacion yyyy-mm-dd'))
  panel.widgets().add(textbox_fechafin);
}
////////////// 
//inpector(start,end)
////////////   
Map.setCenter(-60.84, -32.38, 7);
//////////   INSPECTOR
function inpector (start,end){
  Map.style().set('cursor', 'crosshair');
  var inspector = ui.Panel([ui.Label('Click to get Precipitaciones')]);
  Map.add(inspector);
  Map.onClick(function(coords) {
    // Show the loading label.
    inspector.widgets().set(0, ui.Label({
      value: 'Loading...',
      style: {color: 'gray'}
    }));
    // Determine the mean NDVI, a long-running server operation.
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    // var meanNdvi = ndvi.reduce('mean');
    // var sample = meanNdvi.sample(point, 30);
    // var computedValue = sample.first().get('NDVI_mean');
    charts(start,end,point.buffer(500)).evaluate(function(result) {
      // When the server returns the value, show it.
      inspector.widgets().set(0, ui.Label({
        value: 'Precip acumulada ' + result.toFixed(2),
      }));
    var accu_value = result
    var vis_prec = {min:parseInt(accu_value / 2),max:parseInt(accu_value * 1.5),palette:palette}//["ffffff","0000ff"]}
    var lg_vi    = grad_legend(vis_prec, 'Precipit Acumulada', false)
    // Map.add(lg_vi)
    panel.widgets().set(3, lg_vi);
    });
    // inspector.widgets().set(0, ui.Label({value: 'Mean NDVI: '}))
    // Request the value from the server.
    // computedValue.evaluate(function(result) {
    //   // When the server returns the value, show it.
    //   inspector.widgets().set(0, ui.Label({
    //     value: 'Mean NDVI: ' + result.toFixed(2),
    //   }));
    // });
  });
}
/** add gradient legend in GEE */
function grad_legend(viz, title, IsPlot, position) {
    title    = title || "";
    position = position || "bottom-left";
    if (IsPlot === undefined) IsPlot = true;
    // If have band information in viz, then remove it.
    if (Object.keys(viz).length > 3){
        viz = ee.Dictionary(viz).remove(['bands']).getInfo();
    }
    var legend = ui.Panel({ style:{position: 'bottom-left', padding: '2px 6px'} });
    var legendTitle = ui.Label({
        value: title,
        style: {
            fontWeight: 'bold', fontSize: '12px',
            margin: '0 0 0 0', padding: '0'
        }
    });
    legend.add(legendTitle);
    /** create the legend image */
    var lat = ee.Image.pixelLonLat().select('latitude');
    var gradient = lat.multiply((viz.max - viz.min) / 100.0).add(viz.min);
    var legendImage = gradient.visualize(viz);
    var panel_max = ui.Panel({
        widgets: [ui.Label(viz.max)],
        style: { fontSize: '14px', margin: '0 0 0px 0', padding: '0 0 0 6px' }
    });
    legend.add(panel_max);
    // create thumbnail from the image
    var thumbnail = ui.Thumbnail({
        image: legendImage,
        params: { bbox: '0, 0, 20, 100', dimensions: '20x200' },
        style: { padding: '0 0 0 10px', position: 'bottom-center', margin: '0 0 0px 0' }
    });
    legend.add(thumbnail);
    // create text on bottom of legend
    var panel_min = ui.Panel({
        widgets: [ui.Label(viz.min)],
        style: { fontSize: '14px', margin: '0 0 0px 0', padding: '0 0 0 6px' }
    });
    legend.add(panel_min);
    if (IsPlot){
        Map.add(legend);
    }else{
        return legend;
    }
}