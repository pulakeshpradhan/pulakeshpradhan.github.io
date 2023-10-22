var fcCars = ee.FeatureCollection('projects/terras/GW/CARS_PRODES');
var fcProdes = ee.FeatureCollection("projects/terras/GW/PRODES").distinct('AREAMETERS');
var visIndexes = require("users/diegosilva/TerrasMonitoramento:Palettes.js");
var getCollection = require("users/diegosilva/floresta-densa:Collection.js");
var rename = require("users/diegosilva/floresta-densa:RenameBands.js");
var getDicts = require('users/diegosilva/GW:getDicts.js');
var bands = rename.rename("sentinel2");
var timeConverter = function (unix_timestamp) {
    var a = new Date(unix_timestamp * 1000);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = year + '-' + month + '-' + date;
    return time;
};
 var visLapse = {
        "opacity": 1,
        "bands": ["red", "green", "blue"],
        "min": 326.3812484396691,
        "max": 2172.0620740750564,
        "gamma": 1.15
    };
var enhance = function (image) {
    var min = image.reduceRegion({
        reducer: ee.Reducer.percentile([1]),
        geometry: image.geometry(),
        maxPixels: 1e13,
        scale: 10
    });
    var max = image.reduceRegion({
        reducer: ee.Reducer.percentile([99]),
        geometry: image.geometry(),
        maxPixels: 1e13,
        scale: 10
    });
    var r = image.select('r').unitScale(min.get('r'), max.get('r')).multiply(255).round().byte();
    var g = image.select('g').unitScale(min.get('g'), max.get('g')).multiply(255).round().byte();
    var b = image.select('b').unitScale(min.get('b'), max.get('b')).multiply(255).round().byte();
    var imageEnhanced = ee.Image.cat(r, g, b)
        .visualize()
        .rename(['r', 'g', 'b']);
    return ee.Image(imageEnhanced.copyProperties(image));
};
var labelLimiarDate = ui.Label('Coloque a data de interesse :', {
    fontWeight: 'bold'
});
var sliderDate = ui.Textbox({
    value: '2019-06-06',
    onChange: function (value) {
      var limiar = value;
    },
    style: {
      width: '270px'
    }
  });
var functionAreas = function(featureFinca,sizeFeature){
    var listAreasPolygons = featureFinca.toList(sizeFeature).map(function(feature)
                                  {return ee.Feature(feature).geometry().area().divide(10000)}).getInfo();
    var listAreas = [];
    for(var i = 0; i < listAreasPolygons.length; i++){
        listAreas.push(listAreasPolygons[i].toFixed(2));
        }
    var total = array_teste.reduce(function(anterior, atual) {
            return anterior + atual;
          });
    return total;
};
var calculusCloudFraction = function(obj){
	var collectionFraction = obj['collection'].map(function(image){
			obj['image'] = image
			image = cloudF.masksAll(obj)
			return image;			
			})
	return collectionFraction;
}
var getLabelRegion = function(image, geometry){
    var result = image.connectedPixelCount(100, true);
    var ft = result.reduceToVectors(
      {
        geometry:geometry,
        scale:10,
        maxPixels:1e13
      } );
    ft = ft.map(function(feature){
      var area = ee.Number(feature.get('count')).multiply(100).divide(10000);
      return feature.set("area", area);
    } );
    ft = ft.filterMetadata("area", "greater_than", 0.25);
    return ft;
  };
var functionCalculus = function (collection, index) {
    var independents = ee.List(['constant', 't', 'cos', 'sin']);
    var dependent = ee.String(index);
    var trend = collection
        .select(independents.add(dependent))
        .reduce(ee.Reducer
            .linearRegression(
                independents.length(), 1));
    var coefficients = trend
        .select('coefficients')
        .arrayProject([0])
        .arrayFlatten([independents]);
    var detrended = collection.map(function (image) {
        image = image.select(dependent)
            .subtract(image
                .select(independents)
                .multiply(coefficients).reduce('sum'))
            .rename(dependent)
            .copyProperties(image, ['system:time_start']);
        return image;
    });
    var fittedHarmonic = collection.map(function (image) {
        image = image.addBands(
            image.select(independents)
            .multiply(coefficients)
            .reduce('sum')
            .rename('fitted'));
        return image;
    });
    return [detrended, fittedHarmonic];
};
var functionChart = function (collection, detrended, fittedHarmonic, coords, index) {
    var chartCollection = ui.Chart.image.series(collection.select(index), coords)
        .setChartType('ScatterChart')
        .setOptions({
            title: 'Sentinel - 2  ' + index + ' time series at AOI',
            trendlines: {
                0: {
                    color: 'CC0000'
                }
            },
            lineWidth: 1,
            pointSize: 3,
        });
    var chartDetrended = ui.Chart.image.series(detrended, coords, null, 30)
        .setOptions({
            title: 'Detrended Sentinel - 2 time series at AOI',
            lineWidth: 1,
            pointSize: 3,
        });
    var chartFittedHarmonic = ui.Chart.image.series(
            fittedHarmonic.select([index, 'fitted']), coords, ee.Reducer.mean(), 30)
        .setSeriesNames(['fitted', index])
        .setOptions({
            title: 'Harmonic model: original and fitted values',
            lineWidth: 1,
            pointSize: 3,
        });
    return [chartCollection, chartDetrended, chartFittedHarmonic];
};
var statistics = function (imageMask, geometry, index) {
    var area = imageMask.multiply(ee.Image.pixelArea());
    var coverageStatistics = area.reduceRegion({
        "reducer": ee.Reducer.sum(),
        "geometry": geometry,
        "scale": 15
    });
    var areHa = coverageStatistics.get(index).getInfo() / 10000;
    return areHa;
};
var mapT0 = ui.Map({
    style: {
        border: '2px solid black'
    }
});
var mapT1 = ui.Map({
    style: {
        border: '2px solid black'
    }
});
var mapT2 = ui.Map({
    style: {
        border: '2px solid black'
    }
});
var mapGrid = ui.Panel([
        ui.Panel([
                mapT0, mapT1, mapT2
            ],
            ui.Panel.Layout.Flow('vertical'), {
                stretch: 'both'
            })
    ],
    ui.Panel.Layout.Flow('vertical'), {
        stretch: 'both'
    }
);
var linker = ui.Map.Linker([mapT0, mapT1, mapT2]);
var painel = function (buffer, geometry, layer, nameLayer, inicio_plantio, fim_plantio, inicio_colheita, fim_colheita, collectionMasks) {
    mapT0.clear();
    mapT1.clear();
    mapT2.clear();
    var visSentinel = {
        "opacity": 1,
        "bands": ["red", "green", "blue"],
        "min": 326.3812484396691,
        "max": 2172.0620740750564,
        "gamma": 1.15
    };
    var visEVI2 = visIndexes.get('evi2');
    collectionMasks = collectionMasks.sort('CLOUDY_PIXEL_PERCENTAGE');
    try {
        var img1S2 = ee.Image(collectionMasks.filterDate(inicio_plantio, fim_plantio).first());
        var date0 = timeConverter(String(img1S2.get('GENERATION_TIME').getInfo())
            .slice(0, 10));
        mapT0.addLayer(img1S2, visEVI2, 'EVI2-' + date0, false);
        mapT0.addLayer(img1S2, visSentinel, date0, true);
        mapT0.addLayer(img1S2, vis, 'NDFI- ' + date0, false);
    } catch (err) {
        print('Não há imagens para o período');
    }
    try {
        var img2S2 = ee.Image(collectionMasks.filterDate(fim_plantio, inicio_colheita).first());
        //.clip(buffer);
        var date1 = timeConverter(String(img2S2.get('GENERATION_TIME').getInfo())
            .slice(0, 10));
        mapT1.addLayer(img2S2, visEVI2, 'EVI2-' + date1, false);
        mapT1.addLayer(img2S2, visSentinel, date1, true);
        mapT1.addLayer(img2S2, vis, 'NDFI- ' + date1, false);
    } catch (err) {
        print('Não há imagens para o período');
    }
    try {
        var img3S2 = ee.Image(collectionMasks.filterDate(inicio_colheita, fim_colheita).first())
        //.clip(buffer);
        var date2 = timeConverter(String(img3S2.get('GENERATION_TIME').getInfo())
            .slice(0, 10));
        mapT2.addLayer(img3S2, visEVI2, 'EVI2-' + date2, false);
        mapT2.addLayer(img3S2, visSentinel, date2, true);
        mapT2.addLayer(img3S2, vis, 'NDFI- ' + date2, false);
    } catch (err) {
        print('Não há imagens para o período');
    }
    var img1 = ee.Image(collectionMasks.filterDate(inicio_plantio, fim_plantio).median());
    var img2 = ee.Image(collectionMasks.filterDate(fim_plantio, inicio_colheita).median());
    var img3 = ee.Image(collectionMasks.filterDate(inicio_colheita, fim_colheita).median());
    mapT0.add(ui.Label('Plantio', {
        'position': 'bottom-left',
        'fontWeight': 'bold',
        'fontSize': '20px',
    }));
    mapT0.addLayer(img1, visSentinel, 'RGB-S2-' + inicio_plantio + '-a-' + fim_plantio, false);
    mapT0.addLayer(layer, {
        'palette': '0000FF'
    }, nameLayer);
    mapT1.add(ui.Label('Pleno', {
        'position': 'bottom-left',
        'fontWeight': 'bold',
        'fontSize': '20px',
    }));
    mapT1.addLayer(img2, visSentinel, 'RGB-S2-' + fim_plantio + '-a-' + inicio_colheita, false);
    mapT1.addLayer(layer, {
        'palette': '0000FF'
    }, nameLayer);
    mapT2.add(ui.Label('Colheita', {
        'position': 'bottom-left',
        'fontWeight': 'bold',
        'fontSize': '20px',
    }));
    mapT2.addLayer(img3, visSentinel, 'RGB-S2-' + inicio_colheita + '-a-' + fim_colheita, false);
    mapT2.addLayer(layer, {
        'palette': '0000FF'
    }, nameLayer);
    mapT0.centerObject(geometry, 15);
};
var panelTimelapse = ui.Panel({
    'layout': ui.Panel.Layout.flow('horizontal'),
    'style': {
        'stretch': 'horizontal',
        'backgroundColor': '#ffffff',
    },
});
var timeLapseChange = function (value, buffer_0, cloud, countourCar){
        var sr_l5_l7 = {
            // 'id': 'LANDSAT/LT05/C01/T1_SR',
            'bandNames': ['B7', 'B4', 'B2'],
            'newNames': ['swir-2', 'nir', 'green']
        };
        var sr_l8 = {
            // 'id': 'LANDSAT/LC08/C01/T1_SR',
            'bandNames': ['B7', 'B5', 'B3'],
            'newNames': ['swir-2', 'nir', 'green']
        };
        var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
            .filterBounds(buffer_0).filterMetadata("CLOUD_COVER_LAND", "less_than", cloud)
            .select(sr_l8.bandNames, sr_l8.newNames);
        // .select(sr_l5_l7.bandNames,sr_l5_l7.newNames)
        var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA')
            .filterBounds(buffer_0).filterMetadata("CLOUD_COVER_LAND", "less_than", cloud)
            .select(sr_l5_l7.bandNames, sr_l5_l7.newNames);
        var collection5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
            .filterBounds(buffer_0).filterMetadata("CLOUD_COVER_LAND", "less_than", cloud)
            .select(sr_l5_l7.bandNames, sr_l5_l7.newNames);
        var collection = collection8.merge(collection7).merge(collection5).filterDate('2005-01-01', '2020-12-31');
        var featCollection = collection
            .distinct(['DATE_ACQUIRED'])
            .sort('DATE_ACQUIRED')
            .map(
                function (image) {
                    return ee.Feature(null, {
                        'DATE_ACQUIRED': image.get('DATE_ACQUIRED'),
                        'y': 0,
                        'cc': image.get('CLOUD_COVER'),
                    });
                }
            );
        var clickAction = function (date) {
           // var objectMedian = collection.median().clip(toconesGeometry);
            var objectImage = collection.filterMetadata('DATE_ACQUIRED', 'equals', date).first();
                    //.clip(toconesGeometry);
            var enhancementImg = enhance(ee.Image(objectImage).select( ['swir-2', 'nir', 'green'], ['r', 'g', 'b']));
            var nameImage = date;
            // timeConverter(String(collectionSentinel.filterMetadata('GENERATION_TIME', 'equals', date)
            //             .sort('CLOUDY_PIXEL_PERCENTAGE').first().get('GENERATION_TIME').getInfo())
            //         .slice(0, 10));
            var visLapseLandsat = {
                "opacity": 1,
                "bands": ['swir-2', 'nir', 'green'],
                "min": 326.3812484396691,
                "max": 2172.0620740750564,
                "gamma": 1.15
            };
            var layer = ui.Map.Layer({
                'eeObject':  objectImage.clip(buffer_0),
                'visParams': visLapseLandsat,
                'name':nameImage,
                'shown': false,
                'opacity': 1.0
            });
             var layerRealce = ui.Map.Layer({
                'eeObject':  enhancementImg.clip(buffer_0),
                'visParams': {"gamma":1.32},
                'name':nameImage + '-' + 'Realce',
                'shown': true,
                'opacity': 1.0
            });
             var layerCar = ui.Map.Layer({
                'eeObject': countourCar,
                'visParams': {
                        'palette': '#0000FF',
                        'opacity': 0.8
                    },
                'name':'Geometry',
                'shown': true,
                'opacity': 1.0
            });
            //Map.layers().remove(Map.layers().get(3));
            Map.layers().remove(Map.layers().get(2));
            Map.layers().remove(Map.layers().get(1));
            Map.layers().remove(Map.layers().get(0));
            Map.layers().insert(0, layerRealce);
            Map.layers().insert(1,layer);
            Map.layers().insert(2, layerCar);
            //Map.layers().insert(3, layerProdes);
        };
        var chartOptions = {
            legend: 'none',
            lineWidth: 1,
            pointSize: 5,
            // height: 100,
            vAxis: {
                gridlines: {
                    count: 0
                }
            },
            chartArea: {
                left: 30,
                top: 2,
                bottom: 100,
                right: 30,
                width: '100%',
                height: '100%'
            },
            hAxis: {
                // textPosition: 'out',
                showTextEvery: 3,
                // interpolateNulls: true,
                slantedTextAngle: 90,
                slantedText: true,
                textStyle: {
                    color: '#000000',
                    fontSize: 12,
                    fontName: 'Arial',
                    bold: false,
                    italic: false
                }
            },
            tooltip: {
                isHtml: true,
                // trigger: 'none',
                textStyle: {
                    fontSize: 10,
                }
            },
            crosshair: {
                trigger: 'both',
                orientation: 'vertical',
                focused: {
                    color: '#0000ff'
                },
                selected: {
                    color: '#ff0000',
                }
            },
            series: {
                0: {
                    color: '#000000',
                    pointsVisible: true
                },
                1: {
                    color: '#ff0000',
                    lineWidth: 0.1,
                    pointsVisible: false
                },
                2: {
                    type: 'steppedArea',
                    color: '#ff0000',
                }
            },
        };
        var chartStyle = {
            position: 'bottom-center',
            border: '1px solid grey',
            width: '100%',
            height: '140px',
            margin: '0px',
            padding: '0px',
        };
        var chartLapse = ui.Chart.feature.byFeature(featCollection, 'DATE_ACQUIRED', ['y', 'y', 'cc'])
            .setChartType('LineChart')
            .setOptions(chartOptions);
        chartLapse.style().set(chartStyle);
        chartLapse.onClick(clickAction);
        panelTimelapse.clear();
        panelTimelapse.add(selecttimeLapse);
        panelTimelapse.add(chartLapse);
};
var selecttimeLapse = ui.Select({
    items: [
        {
            label: 'S2-TOA',
            value: 1
        },
        {
            label: 'Landsat',
            value: 2
        }
    ],
    value: 1,
    onChange: function (value) {
        var provincia = value;
    },
    style: {
        width: '65px'
    }
});
var timeLapse = function (buffer, cloud, car,prodes,collection) {
    // {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}
        var featCollection = collection
            .distinct(['date'])
            .sort('date')
            .map(
                function (image) {
                    return ee.Feature(null, {
                        'DATE_ACQUIRED': image.get('date'),
                        'y': 0,
                        'cc': image.get('cloud_cover'),
                    });
                }
            );
        var visLapse = {
            "opacity": 1,
            "bands": ["red", "green", "blue"],
            "min": 326.3812484396691,
            "max": 2172.0620740750564,
            "gamma": 1.15
        };
        var clickAction = function (date) {
           // var objectMedian = collection.median().clip(toconesGeometry);
            var objectImage = collection.filterMetadata('date', 'equals', date).first();
                    //.clip(toconesGeometry);
            var enhancementImg = enhance(ee.Image(objectImage).select(['red', 'green', 'blue'], ['r', 'g', 'b']));
            var nameImage = date;
            // timeConverter(String(collectionSentinel.filterMetadata('GENERATION_TIME', 'equals', date)
            //             .sort('CLOUDY_PIXEL_PERCENTAGE').first().get('GENERATION_TIME').getInfo())
            //         .slice(0, 10));
            var layer = ui.Map.Layer({
                'eeObject':  objectImage.clip(buffer),
                'visParams': visLapse,
                'name':nameImage,
                'shown': false,
                'opacity': 1.0
            });
             var layerRealce = ui.Map.Layer({
                'eeObject':  enhancementImg.clip(buffer),
                'visParams': {"gamma":1.32},
                'name':nameImage + '-' + 'Realce',
                'shown': true,
                'opacity': 1.0
            });
             var layerCar = ui.Map.Layer({
                'eeObject': car,
                'visParams': {
                        'palette': '#0000FF',
                        'opacity': 0.8
                    },
                'name':'Geometry',
                'shown': true,
                'opacity': 1.0
            });
            var layerProdes = ui.Map.Layer({
                'eeObject': prodes,
                'visParams': {
                        'palette': '#FF0000',
                        'opacity': 0.8
                    },
                'name':'Geometry',
                'shown': true,
                'opacity': 1.0
            });
            //Map.layers().remove(Map.layers().get(3));
            Map.layers().remove(Map.layers().get(2));
            Map.layers().remove(Map.layers().get(1));
            Map.layers().remove(Map.layers().get(0));
            Map.layers().insert(0, layerRealce);
            Map.layers().insert(1,layer);
            Map.layers().insert(2, layerCar);
            //Map.layers().insert(3, layerProdes);
        };
        var chartOptions = {
            legend: 'none',
            lineWidth: 1,
            pointSize: 5,
            // height: 100,
            vAxis: {
                gridlines: {
                    count: 0
                }
            },
            chartArea: {
                left: 30,
                top: 2,
                bottom: 100,
                right: 30,
                width: '100%',
                height: '100%'
            },
            hAxis: {
                // textPosition: 'out',
                showTextEvery: 1,
                // interpolateNulls: true,
                slantedTextAngle: 90,
                slantedText: true,
                textStyle: {
                    color: '#000000',
                    fontSize: 12,
                    fontName: 'Arial',
                    bold: false,
                    italic: false
                }
            },
            tooltip: {
                isHtml: true,
                // trigger: 'none',
                textStyle: {
                    fontSize: 10,
                }
            },
            crosshair: {
                trigger: 'both',
                orientation: 'vertical',
                focused: {
                    color: '#0000ff'
                },
                selected: {}
            },
            series: {
                0: {
                    color: '#000000',
                    pointsVisible: true
                },
                1: {
                    color: '#ff0000',
                    lineWidth: 0.1,
                    pointsVisible: false
                },
                2: {
                    type: 'steppedArea',
                    color: '#ff0000',
                }
            },
        };
        var chartStyle = {
            position: 'bottom-center',
            border: '1px solid grey',
            width: '100%',
            height: '140px',
            margin: '0px',
            padding: '0px',
        };
        var chartLapse = ui.Chart.feature.byFeature(featCollection, 'DATE_ACQUIRED', ['y', 'y', 'cc'])
            .setChartType('LineChart')
            .setOptions(chartOptions);
        chartLapse.style().set(chartStyle);
        chartLapse.onClick(clickAction);
        panelTimelapse.clear();
        panelTimelapse.add(selecttimeLapse);
        panelTimelapse.add(chartLapse);
    selecttimeLapse.onChange(function (value) {
        // print('selecttimeLapse',value);
        if (value === 1) {
          timeLapse(buffer, cloud, car,prodes,collection)
        }
        else{
           timeLapseChange(value, buffer, cloud, car);
        }
    });
};
var selectIndexGraph = ui.Select({
    items: [
        {
            label: 'ndfi',
            value: 'ndfi'
        },{
            label: 'gv',
            value: 'gv'
        }
    ],
    value: 'ndfi',
    onChange: function (value) {
        var provincia = value;
    },
    style: {
        width: '60px'
    }
});
var addVariables = function (collection, dateStart) {
    collection = collection.map(function (image) {
        var date = ee.Date(image.get('system:time_start'));
        var years = date.difference(ee.Date(dateStart), 'year');
        image = image.addBands(ee.Image(years).rename('t').float()).addBands(ee.Image.constant(1));
        var timeRadians = image.select('t').multiply(2 * Math.PI);
        image = image.addBands(timeRadians.cos().rename('cos')).addBands(timeRadians.sin().rename('sin'));
        return image.copyProperties(image, ['system:time_start']);
    });
    return collection;
};
var map_on_click = function (geometry, colectionMasks) {
    var collectionActual = addVariables(colectionMasks, '2018-01-01');
    // print(collectionActual)
    Map.onClick(function (coords) {
        panelGraphics.clear();
        panelGraphics.add(labelGraphics2);
        var graphIndex = selectIndexGraph.getValue();
        var collectionCalculus = functionCalculus(collectionActual, graphIndex);
        var point = ee.Geometry.Point(coords.lon, coords.lat);
        Map.addLayer(point,{},'ponto clicado');
        var detrendedCalc = collectionCalculus[0];
        var fittedCalc = collectionCalculus[1];
        var charts = functionChart(collectionActual, detrendedCalc, fittedCalc, point, graphIndex);
        var chart1 = charts[0];
        // var chart2 = charts[1];
        // var chart3 = charts[2];
        panelGraphics.add(selectIndexGraph);
        panelGraphics.add(chart1);
        // panelGraphics.add(chart2);
        // panelGraphics.add(chart3);
        selectIndexGraph.onChange(function (value) {
          panelGraphics.clear();
          panelGraphics.add(labelGraphics2);
          var graphIndex = selectIndexGraph.getValue();
          var collectionCalculus = functionCalculus(collectionActual, graphIndex);
          var point = ee.Geometry.Point(coords.lon, coords.lat);
          Map.addLayer(point);
          var detrendedCalc = collectionCalculus[0];
          var fittedCalc = collectionCalculus[1];
          var charts = functionChart(collectionActual, detrendedCalc, fittedCalc, point, graphIndex);
          var chart1 = charts[0];
          // var chart2 = charts[1];
          // var chart3 = charts[2];
          panelGraphics.add(selectIndexGraph);
          panelGraphics.add(chart1);
          // panelGraphics.add(chart2);
          // panelGraphics.add(chart3);
        });
        chart1.onClick(function (date) {
            var imDate = ee.Date(date);
            var befDate = imDate.advance(-1, 'day');
            var aftDate = imDate.advance(1, 'day');
            var time = timeConverter(String(date).slice(0, 10));
            var collectionPointChart = collectionActual.filterDate(befDate, aftDate).select('ndfi').median();
            var visIndex = visIndexes.get('ndfi');
            var layerGraph = ui.Map.Layer({
                'eeObject': collectionPointChart,
                'visParams': visIndex,
                'name': graphIndex + '-' + String(time),
                'shown': true,
                // 'opacity': 1.0
            });
            // Map.layers().remove(Map.layers().get(1));
            Map.layers().insert(0, layerGraph);
            //   Map.addLayer(collectionPointChart,visIndex,graphIndex+ '-'+ String(time));
        });
    });
};
/* front-end **************************************************************************************************/
var panelDirector = ui.Panel();
var Map = ui.Map();
panelDirector.style().set({
    width: '300px',
    border: '6.5px #A3CCFF',
});
var panelTimelapse = ui.Panel({
    'layout': ui.Panel.Layout.flow('horizontal'),
    'style': {
        'stretch': 'horizontal',
        'backgroundColor': '#ffffff',
    },
});
var panelGraphics = ui.Panel([],
    ui.Panel.Layout.flow('vertical'), {
        position: 'bottom-left',
        height: '350px',
        width: '270px'
    }
);
var panel_auxiliar = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'top-center',
      width: '280px',
      height:'150px'
    }
  });
var labelGraphics = ui.Label('Clique no mapa para gerar o gráfico para o ponto', {
    // fontWeight: 'bold',
    fontSize: '13px',
    textAlign: 'center'
});
var labelProdes = ui.Label('Polígonos de PRODES', {
    fontWeight: 'bold',
    fontSize: '13px',
    textAlign: 'center'
});
var labelGraphics2 = ui.Label('Clique  num ponto do gráfico abaixo para adiconar uma imagem ao mapa', {
    // fontWeight: 'bold',
    fontSize: '11px',
    textAlign: 'center'
});
var labelTitle = ui.Label('Análise CARs/PRODES', {
    fontWeight: 'bold',
    fontSize: '24px',
    textAlign: 'center'
});
var labelGleba = ui.Label('Selecione o CAR:', {
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center'
});
var listGlebas = getDicts.getDicts([]);
var selectGlebas = ui.Select({
    items: listGlebas ,
    value: listGlebas[0],
    onChange: function (value) {
        var glebaSelected = value;
    },
    style: {
        width: '270px'
    }
});
var labelLimiar = ui.Label('Limiar da Máscara de floresta :', {
    fontWeight: 'bold'
});
var infoLimiar = ui.Label('maior que ...', {});
var sliderMascaraFloresta = ui.Slider({
    min: 0.0,
    max: 1.0,
    value: 0.7,
    step: 0.05,
    onChange: function (value) {
        var limiar = value;
    },
    style: {
        width: '180px',
        height: '60px'
    }
});
var button = ui.Button('processar');
button.style().set({
    position: 'top-center',
    border: '1px solid #000000',
    width: '270px',
    fontSize: '20px'
});
/***************** panel adds  *************************************************************/
panelDirector.add(labelTitle);
panelDirector.add(labelGleba);
panelDirector.add(selectGlebas);
// panelDirector.add(labelLimiarDate);
// panelDirector.add(sliderDate);
// panelDirector.add(sliderMascaraFloresta);
panelDirector.add(button);
/*especification panels*************************************************************************/
ui.root.setLayout(ui.Panel.Layout.flow('horizontal', false));
var widgetGrid = ui.Panel(
    [ /*map session 1*/
        ui.Panel([Map],
            ui.Panel.Layout.Flow('horizontal'), {
                stretch: 'both'
            }),
        panelTimelapse
    ],
    ui.Panel.Layout.Flow('vertical'), {
        stretch: 'both'
    }
);
ui.root.widgets().reset([widgetGrid, panelDirector]);
panelGraphics.add(labelGraphics);
button.onClick(function () {
    Map.clear();
    panelDirector.clear();
    selecttimeLapse.setValue(1);
    panelDirector.add(labelTitle);
    panelDirector.add(labelGleba);
    panelDirector.add(selectGlebas);
    panelDirector.add(labelProdes);
    panelDirector.add(panel_auxiliar);
    var id_gleba = selectGlebas.getValue();
    //print('id_gleba',id_gleba);
    var geometry = fcCars.filterMetadata('CODIGO','equals',id_gleba);
    var prodes   = fcProdes.filterMetadata('CODIGO','equals',id_gleba);
    //print('prodes',prodes)
    //print('geometry',geometry);
    var buffer_0 = geometry.geometry().buffer(500).bounds(1);
    var centroid = buffer_0.centroid(1);
    var objCollection = {
        'collectionid': 'COPERNICUS/S2',
        'geometry': centroid,
        'dateStart': '2015-07-23',
        'dateEnd': '2020-12-31',
        'cloud_cover': 50,
    };
    var collection = getCollection.getCollection(objCollection).select(bands.bandNames, bands.newNames)
                                 /* .map(function(image){
                                    return image.clip()
                                  });*/
   /* var maksParams = {
        'collection': collection,
        'cloudFlag': true, // cloud mask using pixel QA
        'cloudScore': true, // cloud mas using simple cloud score
        'cloudShadowFlag': true, // cloud shadow mask using pixel QA
        'cloudShadowTdom': true, // cloud shadow using tdom
        'zScoreThresh': -1,
        'shadowSumThresh': 5000,
        'dilatePixels': 0,
        'cloudHeights': ee.List.sequence(200, 10000, 500),
        'cloudBand': 'cloudScoreMask' //'cloudScoreMask' or 'cloudShadowFlagMask'
    };*/
    /*var collectionMasks = masks.getMasks(maksParams);
    // collectionMasks = collectionMasks.sort('CLOUDY_PIXEL_PERCENTAGE');
    collectionMasks = calculusCloudFraction({'collection':collectionMasks,'geoGleba':geometry,'areaGleba':geometry.area()});
*/
    var colLapse = collection;
    // .divide(10000)
    // print('collectionMasks',collectionMasks);
    // Map.addLayer(ee.Image(collectionMasks.first()), {
    //     "opacity": 1,
    //     "bands": ["red", "green", "blue"],
    //     "min": 326.3812484396691,
    //     "max": 2172.0620740750564,
    //     "gamma": 1.15
    // }, 'Imagem de referência sem nuvens removidas', false);
    /*collectionMasks = collectionMasks.map(
        function (image) {
            var masks = image.select([
                    'cloudScoreMask',
                    'tdomMask',
                    'cloudShadowTdomMask'
                ])
                .reduce(ee.Reducer.anyNonZero());
            return image.mask(masks.eq(0));
        }
    );
    collectionMasks = collectionMasks.map(indexes.getNBR);
    collectionMasks = collectionMasks.map(indexes.getSMA);
    collectionMasks = collectionMasks.map(indexes.getNDFI)*/
    // .filterMetadata('cloud_cover','less_than',15);
    /*var filters = ee.Filter.and(ee.Filter.lte('cloud_cover',25),ee.Filter.lte('cloud_fraction',25));
    var img_first = ee.Image(collectionMasks.filter(filters).sort('date',false).first());
    // print('img_first',img_first);
    var date_0 = img_first.get('date').getInfo();
    var band = 'b' + date_0;
    // collectionMasks = collectionMasks.map(indexes.getEVI2);
    var damImages = dam.classify({
    'collection': collectionMasks,
    'reducer': ee.Reducer.median(),
    'bandName': 'ndfi',
    'min': 32,
    'max': 36
  });*/
    // print('damImages',damImages);
   /* var mosaicMedian = collectionMasks.median();
    var ndfiMedian = mosaicMedian.select('ndfi');
    var gvsMedian = mosaicMedian.select('gvs');
    var gvMedian = mosaicMedian.select('gv');
    var forestMask = ndfiMedian.gte(177.5).and(gvMedian.lte(50));
    // .and(gvsMedian.gt(75));
    var damImageDate = damImages.select(band).eq(0);
    damImageDate = damImageDate.where(forestMask.eq(0), 0);
    var year = 2018;
    Map.addLayer(integrationAOI,{
        'bands': 'classification_' + String(year),
        'min': 0,
        'max': 34,
        'palette': palettes.get('classification2'),
        'format': 'png'
      },
      'Integrated ' + String(year),false);
    Map.addLayer(damImageDate, {
    'bands': band,
    'min': 0,
    'max': 2,
    'palette': '000000,00FF00,ff0000',
    'format': 'png'
    }, 'DAM_' + date_0, false);
    var forestSF = damImageDate.mask(damImageDate);
    // Map.addLayer(forestSF)
    // print('forestSF',forestSF);
    var forestLabel = getLabelRegion(forestSF,geometry);*/
    var blank = ee.Image(0).mask(0);
    var countourCar  = blank.paint(geometry, '0000AA', 2);
    //var countourProdes = blank.paint(prodes, '0000AA', 2);
    timeLapse(buffer_0, 50, countourCar,countourCar,colLapse);
    var infoDamLandsat = prodes.distinct('ANO').reduceColumns(ee.Reducer.toList(),['ANO']).get('list');
        panel_auxiliar.clear();
        infoDamLandsat.evaluate(function(info){
            // print('info',info);
            // var codes = info[0];
            info.forEach(function (code) {
                var checkbox = ui.Checkbox({
                    "label": 'Prodes: ' + code,
                    "value": 0,
                    "onChange": function (value) {
                       var image = prodes.distinct('ANO')
                                         .filterMetadata("ANO","equals",code);
                       var blank = ee.Image(0).mask(0);
                       var countourProdes = blank.paint(image, '0000AA', 2);
                       var layerDam = ui.Map.Layer({
                                    'eeObject': countourProdes,
                                    'visParams':  {
                                            'palette': '#FF0000',
                                            'opacity': 0.8
                                        },
                                    'name':'PRODES - ' + String(code),
                                    'shown': true,
                                    'opacity': 1.0
                                });
                       if (value === false){
                          Map.layers().remove(Map.layers().get(2));
                       }
                       else{
                          Map.layers().insert(2, layerDam);
                       }
                    // print(code);
                    },
                    "disabled": false,
                    "style": {
                        'padding': '2px',
                        'stretch': 'horizontal',
                        'color': '#000000',
                        'fontSize': '12px'
                    }
                })
            panel_auxiliar.add(checkbox);
            })
            });
    //panelDirector.add(panelGraphics);
    var imgFirst = ee.Image(colLapse.sort('cloud_cover').first());
    var date_0 = imgFirst.get('date').getInfo();
    panelDirector.add(ui.Label('Código do CAR -> ' + String(id_gleba), {}));
    Map.addLayer(imgFirst.clip(buffer_0),visLapse,'Image - ' + String(date_0),true);
    panelDirector.add(button);
    Map.addLayer(countourCar, {
        'palette': '#0000FF',
        'opacity': 0.8
    }, 'CAR');
   /* Map.addLayer(countourProdes, {
        'palette': '#FF0000',
        'opacity': 0.8
    }, 'Prodes');*/
    Map.centerObject(centroid, 14);
    // painel(centroid ,bufferExterno,'gleba',inicio_plantio,fim_plantio,inicio_colheita,fim_colheita);
    //map_on_click(geometry, collectionMasks);
});