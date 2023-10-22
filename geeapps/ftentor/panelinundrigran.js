var fields = ui.import && ui.import("fields", "table", {
      "id": "users/ftentor/rigran_fields"
    }) || ee.FeatureCollection("users/ftentor/rigran_fields");
var S2 = ee.ImageCollection("COPERNICUS/S2"),
    table = ee.FeatureCollection("users/ftentor/zona_afect_exceso_hidr"),
    table2 = ee.FeatureCollection("users/ftentor/zona_afect_exceso_hidr");
var GPM = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
    .filterDate('2019-01-01', Date.now())
    .select(['precipitationCal']);
var pkg_vis  = require('users/fernandotentor/shared:pkg_vis.js');
var fechain = '2015-07-01';
var places = {
  Delmas: table,
  Dipaleseng: table2};
var vis_ndvi = { min: 0,  max: 1,    palette: [
        '000000','A0522D','94723C','a4824c','b4966c','c4baa4','94b614','80aa11',
        '6c9f0e','58930c','448809','307d06','1c7204','467b2d','388457','2a8e81',
        '1c97ab','0ea0d5','00aaff','157fdf','3343b2','3f2a9f','ffffff']
        };
// Make another map
var linkedMap = ui.Map().setCenter(28.443, -26.1904, 10);
var linkedMap2 = ui.Map();
// Link the default Map to the other map.
var linker = ui.Map.Linker([linkedMap, linkedMap2]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
/////////////// MODIS DATA //////////////
// var MOD = ee.ImageCollection('MODIS/006/MCD43A4')
//     .filterDate('2015-06-01', Date.now())
//     .sort('system:time_start',true)
//     .map(function(image2) {
//       return image2//.clip(table);
//     })
//     .map(function(image2) {
//       return image2.expression('2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
//         'NIR': image2.select('Nadir_Reflectance_Band2').multiply(0.0001).float(),
//         'RED': image2.select('Nadir_Reflectance_Band1').multiply(0.0001).float(),
//         'BLUE': image2.select('Nadir_Reflectance_Band3').multiply(0.0001).float()
//       }).clamp(-1, 1).set('system:time_start', image2.get('system:time_start'));
//     }); 
var MOD = ee.ImageCollection('MODIS/006/MOD13A1')
    .filterDate('2015-06-01', Date.now())
    .sort('system:time_start',true)
var EVI = MOD.select(['NDVI']).map (function (image){ 
            var ndvi = image.divide(10000).copyProperties(image,['system:time_start'])
            return ndvi
              });
////////////////////////////
function ndvi_rescale (ndvi){
  var ndvi_resc = ndvi.unmask(1)
                    .where(ndvi.gt(-1).and(ndvi.lte(0)),0)
                    .where(ndvi.gt(0).and(ndvi.lte(0.03)), 0.0454)
                    .where(ndvi.gte(0.03).and(ndvi.lt(0.07)), 0.091)
                    .where(ndvi.gte(0.07).and(ndvi.lt(0.1)), 0.136)
                    .where(ndvi.gte(0.1).and(ndvi.lt(0.13)), 0.182)
                    .where(ndvi.gte(0.13).and(ndvi.lt(0.17)), 0.227)
                    .where(ndvi.gte(0.17).and(ndvi.lt(0.2)), 0.273)
                    .where(ndvi.gte(0.2).and(ndvi.lt(0.25)), 0.318)
                    .where(ndvi.gte(0.25).and(ndvi.lt(0.3)), 0.363)
                    .where(ndvi.gte(0.3).and(ndvi.lt(0.35)), 0.409)
                    .where(ndvi.gte(0.35).and(ndvi.lt(0.4)), 0.454)
                    .where(ndvi.gte(0.4).and(ndvi.lt(0.45)), 0.5)
                    .where(ndvi.gte(0.45).and(ndvi.lt(0.5)), 0.545)
                    .where(ndvi.gte(0.5).and(ndvi.lt(0.55)), 0.591)
                    .where(ndvi.gte(0.55).and(ndvi.lt(0.6)), 0.636)
                    .where(ndvi.gte(0.6).and(ndvi.lt(0.65)), 0.682)
                    .where(ndvi.gte(0.65).and(ndvi.lt(0.7)), 0.727)
                    .where(ndvi.gte(0.7).and(ndvi.lt(0.75)), 0.772)
                    .where(ndvi.gte(0.75).and(ndvi.lt(0.8)), 0.818)
                    .where(ndvi.gte(0.8).and(ndvi.lt(0.85)), 0.864)
                    .where(ndvi.gte(0.85).and(ndvi.lt(0.9)), 0.909)
                    .where(ndvi.gte(0.90).and(ndvi.lt(0.99)), 0.954)
                    .where(ndvi.gte(0.99).and(ndvi.lte(1)), 1)
  return ndvi_resc
  }
///////////// CLOUD MASK
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask) 
  }
/////////////////  FUNCION PANEL VIEW  ////////////////////
var panelview = function (table){ 
linkedMap.setOptions('SATELLITE').centerObject(table, 10);
var fechaend = ee.Image(S2.filterDate(fechain,Date.now()).filterBounds(table).sort('system:time_start',false).first()).date().format('yyyy-MM-dd').getInfo()
//print ('fecha última imágen',fechaend)
var map_left = function (range){
              var mosaic = S2.filterBounds(table).filterDate(range.start(), range.end()).map(maskS2clouds).mosaic();
              var ndvi = mosaic.normalizedDifference(['B8','B4']).paint(fields,'000000',2)
              range.start().evaluate(function(name) {
                var layer = ui.Map.Layer(ndvi_rescale(ndvi).clip(table), vis_ndvi, 'NDVI ')
                linkedMap.layers().set(0,layer)
                 //linkedMap.add(layer);
                   });
             };
var map_right = function (range){
              var mosaic = S2.filterBounds(table).filterDate(range.start(), range.end()).map(maskS2clouds).mosaic();
              var ndvi = mosaic.normalizedDifference(['B8','B4']).paint(fields,'000000',2)
              range.start().evaluate(function(name) {
                var layer = ui.Map.Layer(ndvi_rescale(ndvi).clip(table), vis_ndvi, 'NDVI ')
                linkedMap2.layers().set(0,layer)
                 //linkedMap2.add(layer);
                   });
             };
  var dateRange = ee.DateRange(fechain,ee.Date(fechaend).advance(1,'day')).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value:null,
    period: 10,
    style : {position : 'top-left'},
    onChange: map_left
  });
  linkedMap.add(dateSlider.setValue('2018-04-01'));
});
 var dateRange2 = ee.DateRange(fechain,ee.Date(fechaend).advance(1,'day')).evaluate(function(range) {
  var dateSlider2 = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 10,
    style : {position : 'top-right'},
    onChange: map_right
  });
  linkedMap2.add(dateSlider2.setValue('2019-04-01'));
});
};
//////////////  FUNCION MODIS CHART  //////////////
var modis_chart = function (table) {
     var ndviChart = ui.Chart.image.series(EVI, table, ee.Reducer.mean(), 1000);
        ndviChart.setOptions({
          animation : {startup : true, duration:2000,easing:'out'},
          curveType:'function',
          interpolateNulls:true,
          title: 'MODIS NDVI',
          vAxis: {title: 'NDVI',
            viewWindow:{max:0.9,min:0.3},
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
          hAxis: {title: 'Date', format: 'MMM-yyyy',// gridlines: {count: 9},
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
  panel.widgets().set(1, ndviChart);
};
//////////   FUNCION PRECIPITATION CHART
var prec_chart = function (table) {
  function imgcol_last(imgcol){
    // ee.Image(imgcol_grace.reduce(ee.Reducer.last())); properties are missing
    return ee.Image(imgcol.toList(1, imgcol.size().subtract(1)).get(0));
}
function aggregate_prop(ImgCol, prop, reducer, delta){
    if (typeof reducer === 'undefined') {reducer = 'mean'}
    if (typeof delta   === 'undefined') {delta   = false}
    var dates = ee.Dictionary(ImgCol.aggregate_histogram(prop)).keys()
    .map(function(p){
        return ee.Image(0).set(prop, p).set('system:id', p);
    });
    var filterDateEq = ee.Filter.equals({ leftField : prop, rightField: prop});
    var saveAllJoin = ee.Join.saveAll({
        matchesKey: 'matches',
        ordering  : 'system:time_start',
        ascending : true
    });
    var ImgCol_new = saveAllJoin.apply(dates, ImgCol, filterDateEq)
    .map(function(img){
        img = ee.Image(img);
        var imgcol = ee.ImageCollection.fromImages(img.get('matches')).sort('system:time_start'); //.fromImages
        var first = ee.Image(imgcol.first());
        var last  = imgcol_last(imgcol);
        var res = ee.Algorithms.If(delta, last.subtract(first), imgcol.reduce(reducer))
        return ee.Image(res)
            .copyProperties(ee.Image(imgcol.first()), 
                ['Year', 'YearStr', 'YearMonth', 'Month', 'Season', 'dn', 'system:time_start'])
            .copyProperties(img, ['system:id', prop]);
    });
    return ee.ImageCollection(ImgCol_new);
}
var PREC = GPM.filterBounds(table).map(function(image) {
  var prec = image.divide(2).copyProperties(image,['system:time_start'])
  var date  = ee.Date(image.get('system:time_start'));
  var day = date.get('day');
  var month = date.get('month');
  var year  = date.get("year").format("%d");
  var month_flag = month//.subtract(1).divide(2).floor().add(1);
  var month2_flag = month//.subtract(1).divide(2).floor().add(1);
  var day_flag = day.format('-%02d')
  month_flag = month_flag.format('-%02d');
  month2_flag = month2_flag.format('-%02d');
  return prec
      .set('day', day)
      .set('month', month)
      .set('month_flag', year.cat(month_flag))
      .set('day_flag', year.cat(month2_flag).cat(day_flag));
});
var gpm2 = PREC.select(['precipitationCal'])
var prop = 'month_flag'
var reducer = ee.Reducer.sum(); 
var prec_mth =aggregate_prop(gpm2, prop, reducer);
// CHART
var GPMChart = ui.Chart.image.series(prec_mth, table, ee.Reducer.mean(), 5000);
  GPMChart.setOptions({
    title: 'Precipitación GPM',
    vAxis: {title: 'Precipitation'},
    hAxis: {title: 'date', format: 'MMM-yyyy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, GPMChart.setChartType('ColumnChart'));
};
//////////// FUNCION CHIRP CHART
var prec_chirp_chart = function (table) {
    var CHIRP = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
    .filterDate(fechain, '2018-12-31')
var GPM = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
    .filterDate('2019-01-01', Date.now())
    .select(['precipitationCal'],['precipitation']);
var GPM2 = GPM.map (function (gpm){return gpm.divide(2).copyProperties(gpm,['system:time_start'])})
var prec_merge = CHIRP.merge(GPM2)
function imgcol_last(imgcol){
    // ee.Image(imgcol_grace.reduce(ee.Reducer.last())); properties are missing
    return ee.Image(imgcol.toList(1, imgcol.size().subtract(1)).get(0));
}
function aggregate_prop(ImgCol, prop, reducer, delta){
    if (typeof reducer === 'undefined') {reducer = 'mean'}
    if (typeof delta   === 'undefined') {delta   = false}
    var dates = ee.Dictionary(ImgCol.aggregate_histogram(prop)).keys()
    .map(function(p){
        return ee.Image(0).set(prop, p).set('system:id', p);
    });
    var filterDateEq = ee.Filter.equals({ leftField : prop, rightField: prop});
    var saveAllJoin = ee.Join.saveAll({
        matchesKey: 'matches',
        ordering  : 'system:time_start',
        ascending : true
    });
    var ImgCol_new = saveAllJoin.apply(dates, ImgCol, filterDateEq)
    .map(function(img){
        img = ee.Image(img);
        var imgcol = ee.ImageCollection.fromImages(img.get('matches')).sort('system:time_start'); //.fromImages
        var first = ee.Image(imgcol.first());
        var last  = imgcol_last(imgcol);
        var res = ee.Algorithms.If(delta, last.subtract(first), imgcol.reduce(reducer).rename('Precipitation'))
        return ee.Image(res)
            .copyProperties(ee.Image(imgcol.first()), 
                ['Year', 'YearStr', 'YearMonth', 'Month', 'Season', 'dn', 'system:time_start'])
            .copyProperties(img, ['system:id', prop]);
    });
    return ee.ImageCollection(ImgCol_new);
}
var PREC = prec_merge.map(function(image) {
  var prec = image.copyProperties(image,['system:time_start'])
  var date  = ee.Date(image.get('system:time_start'));
  var day = date.get('day');
  var month = date.get('month');
  var year  = date.get("year").format("%d");
  var month_flag = month//.subtract(1).divide(2).floor().add(1);
  var month2_flag = month//.subtract(1).divide(2).floor().add(1);
  var day_flag = day.format('-%02d')
  month_flag = month_flag.format('-%02d');
  month2_flag = month2_flag.format('-%02d');
  return prec
      .set('day', day)
      .set('month', month)
      .set('month_flag', year.cat(month_flag))
      .set('day_flag', year.cat(month2_flag).cat(day_flag));
});
var prec_month =aggregate_prop(PREC, 'month_flag', ee.Reducer.sum());
 var CHIRP_Chart = ui.Chart.image.series(prec_month, table, ee.Reducer.mean(), 5000);
  CHIRP_Chart.setOptions({
    animation : {startup : true, duration:2000,easing:'out'},
    title: 'Precipitación fuente: CHIRP ',
    legend:{position:'none'},
    vAxis: {title: 'Precipitación',textStyle: {
            color: '#000000',
              fontSize: 11,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 14,
              bold: true
            }},
    hAxis: {title: 'Date', format: 'MMM-yyyy', gridlines: {count: 7},
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
  });
panel.widgets().set(3, CHIRP_Chart.setChartType('ColumnChart'));
};
////////////////  funcion Soil Moisture
var soil_moist = function (table) {
  var SMAP = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
    .filterDate('2015-06-01', Date.now())
    .filterBounds(table)
function imgcol_last(imgcol){
    // ee.Image(imgcol_grace.reduce(ee.Reducer.last())); properties are missing
    return ee.Image(imgcol.toList(1, imgcol.size().subtract(1)).get(0));
}
function aggregate_prop(ImgCol, prop, reducer, delta){
    if (typeof reducer === 'undefined') {reducer = 'mean'}
    if (typeof delta   === 'undefined') {delta   = false}
    var dates = ee.Dictionary(ImgCol.aggregate_histogram(prop)).keys()
    .map(function(p){
        return ee.Image(0).set(prop, p).set('system:id', p);
    });
    var filterDateEq = ee.Filter.equals({ leftField : prop, rightField: prop});
    var saveAllJoin = ee.Join.saveAll({
        matchesKey: 'matches',
        ordering  : 'system:time_start',
        ascending : true
    });
    var ImgCol_new = saveAllJoin.apply(dates, ImgCol, filterDateEq)
    .map(function(img){
        img = ee.Image(img);
        var imgcol = ee.ImageCollection.fromImages(img.get('matches')).sort('system:time_start'); //.fromImages
        var first = ee.Image(imgcol.first());
        var last  = imgcol_last(imgcol);
        var res = ee.Algorithms.If(delta, last.subtract(first), imgcol.reduce(reducer))
        return ee.Image(res)
            .copyProperties(ee.Image(imgcol.first()), 
                ['Year', 'YearStr', 'YearMonth', 'Month', 'Season', 'dn', 'system:time_start'])
            .copyProperties(img, ['system:id', prop]);
    });
    return ee.ImageCollection(ImgCol_new);
}
var smoist = SMAP.map(function(image) {
  var prec = image.copyProperties(image,['system:time_start'])
  var date  = ee.Date(image.get('system:time_start'));
  var day = date.get('day');
  var month = date.get('month');
  var year  = date.get("year").format("%d");
  var month_flag = month//.subtract(1).divide(2).floor().add(1);
  var month2_flag = month//.subtract(1).divide(2).floor().add(1);
  var day_flag = day.format('-%02d')
  month_flag = month_flag.format('-%02d');
  month2_flag = month2_flag.format('-%02d');
  return prec
      .set('day', day)
      .set('month', month)
      .set('month_flag', year.cat(month_flag))
      .set('day_flag', year.cat(month2_flag).cat(day_flag));
});
var prop = 'month_flag'
var reducer = 'mean'; 
var moist_month =aggregate_prop(smoist, prop, reducer);
var soil_moist_Chart = ui.Chart.image.series(moist_month.select(['smp_mean']), table, ee.Reducer.mean(), 5000);
  soil_moist_Chart.setOptions({
    animation : {startup : true, duration:2000,easing:'out'},
    curveType:'function',
    legend:{position:'none'},
    title: 'Humedad disponible para la planta',
    vAxis: {title: 'Humedad disponible en porcentaje',
    format: 'percent',
    textStyle: {
            color: '#000000',
              fontSize: 11,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 14,
              bold: true
            }},
    hAxis: {title: 'Fecha', format: 'MMM-yyyy', gridlines: {count: 7},
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
          //trendlines: {  0: {type: 'polynomial',degree: 3,color: 'green',lineWidth: 3,opacity: 0.3,showR2: false, visibleInLegend: false}}
    }
  );
//print (soil_moist_Chart.setChartType('LineChart'))
panel.widgets().set(4, soil_moist_Chart.setChartType('LineChart'));
var soil_moist_Chart = ui.Chart.image.series(moist_month.select(['susma_mean','ssma_mean'],['superficial','sub_superficial']), table, ee.Reducer.mean(), 5000);
  soil_moist_Chart.setOptions({
    animation : {startup : true, duration:2000,easing:'out'},
    curveType:'function',
    //legend:{position:'none'},
    title: 'Soil Moisture ANOMALIA',
    vAxis: {title: 'Anomalia',
    //format: 'percent',
    textStyle: {
            color: '#000000',
              fontSize: 11,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 14,
              bold: true
            }},
    hAxis: {title: 'Date', format: 'MMM-yyyy', gridlines: {count: 7},
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
            color: '#0000FF'
          },
          1: {
            color: '#FF0000'
          }
         },
          explorer: { axis: 'horizontal', keepInBounds: true,maxZoomIn: 4.0},
          //trendlines: {  0: {type: 'polynomial',degree: 3,color: 'green',lineWidth: 3,opacity: 0.3,showR2: false, visibleInLegend: false}}
    }
  );
//print (soil_moist_Chart.setChartType('LineChart'))
panel.widgets().set(5, soil_moist_Chart.setChartType('ColumnChart'));
};
//////////////// Funcion Temperatura  /////////////
var temp_chart = function (table){
 var TEMP = ee.ImageCollection("NCEP_RE/surface_temp")
            .filterDate('2015-05-01', Date.now())
             .filterBounds(table);
function imgcol_last(imgcol){
    // ee.Image(imgcol_grace.reduce(ee.Reducer.last())); properties are missing
    return ee.Image(imgcol.toList(1, imgcol.size().subtract(1)).get(0));
}
function aggregate_prop(ImgCol, prop, reducer, delta){
    if (typeof reducer === 'undefined') {reducer = 'mean'}
    if (typeof delta   === 'undefined') {delta   = false}
    var dates = ee.Dictionary(ImgCol.aggregate_histogram(prop)).keys()
    .map(function(p){
        return ee.Image(0).set(prop, p).set('system:id', p);
    });
    var filterDateEq = ee.Filter.equals({ leftField : prop, rightField: prop});
    var saveAllJoin = ee.Join.saveAll({
        matchesKey: 'matches',
        ordering  : 'system:time_start',
        ascending : true
    });
    var ImgCol_new = saveAllJoin.apply(dates, ImgCol, filterDateEq)
    .map(function(img){
        img = ee.Image(img);
        var imgcol = ee.ImageCollection.fromImages(img.get('matches')).sort('system:time_start'); //.fromImages
        var first = ee.Image(imgcol.first());
        var last  = imgcol_last(imgcol);
        var res = ee.Algorithms.If(delta, last.subtract(first), imgcol.reduce(reducer))
        return ee.Image(res)
            .copyProperties(ee.Image(imgcol.first()), 
                ['Year', 'YearStr', 'YearMonth', 'Month', 'Season', 'dn', 'system:time_start'])
            .copyProperties(img, ['system:id', prop]);
    });
    return ee.ImageCollection(ImgCol_new);
}
var temp_air = TEMP.map(function(image) {// menos 273.15 Celsius
  var temp = image.rename(['Temp_']).subtract(273.15).copyProperties(image,['system:time_start'])
  var mask = ee.Image(temp).lt(330)
  var date  = ee.Date(image.get('system:time_start'));
  var day = date.get('day');
  var month = date.get('month');
  var year  = date.get("year").format("%d");
  var month_flag = month//.subtract(1).divide(2).floor().add(1);
  var month2_flag = month//.subtract(1).divide(2).floor().add(1);
  var day_flag = day.format('-%02d')
  month_flag = month_flag.format('-%02d');
  month2_flag = month2_flag.format('-%02d');
  return ee.Image(temp).updateMask(mask)
      .set('day', day)
      .set('month', month)
      .set('month_flag', year.cat(month_flag))
      .set('day_flag', year.cat(month2_flag).cat(day_flag));
});
var prop = 'month_flag'
var reducer = 'min'; 
var temp_month_min =aggregate_prop(temp_air, prop, reducer);
var temp_month_max =aggregate_prop(temp_air, prop, 'max');
var temp_month =temp_month_min.combine(temp_month_max)
 var temp_Chart = ui.Chart.image.series(temp_month, table, ee.Reducer.mean(), 5000);
  temp_Chart.setOptions({
    animation : {startup : true, duration:2000,easing:'out'},
    curveType:'function',
    series: {
  0:{color: 'blue', visibleInLegend: true},
  1:{color: 'red', areaOpacity : 100,visibleInLegend: true}
},
    title: 'NCEP temperature ',
    textStyle: {
            color: '#000000',
              fontSize: 11,
              bold: true
            },
            titleTextStyle: {
            color: '#000000',
              fontSize: 14,
              bold: true
            },
    vAxis: {title: 'Temperature',
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
    hAxis: {title: 'Date', format: 'MMM-yyyy', gridlines: {count: 7},
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
         explorer: { axis: 'horizontal', keepInBounds: true,maxZoomIn: 4.0},
  });
//print (temp_Chart.setChartType('AreaChart')) 
panel.widgets().set(5, temp_Chart.setChartType('AreaChart'));
};
//////////////// PANEL //////////////////////
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
// var select = ui.Select({
//   style : {minWidth:'400px',margin  :'8px auto'},
//   items: Object.keys(places),
//   onChange: function (key) { panelview(places[key]), modis_chart(places[key]),
//     /*prec_chart(places[key]),*/prec_chirp_chart(places[key]),soil_moist(places[key]),
//     temp_chart(places[key])
//   }
// });
// select.setPlaceholder('Zones');
// panel.add(select)
panelview(table)
modis_chart(table)
prec_chirp_chart(table)
soil_moist(table)
//temp_chart(table)
var lg_vi    = pkg_vis.grad_legend(vis_ndvi, 'NDVI', false)
linkedMap.add(lg_vi)
ui.root.insert(0,panel)
ui.root.widgets().set(1,splitPanel);