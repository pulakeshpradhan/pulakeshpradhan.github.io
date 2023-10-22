/**
 * 
 */
var palettes = require('users/mapbiomas/modules:Palettes.js');
var App = {
    options: {
        assets: {
            classificationRaw: 'projects/imazon-simex/LULC/classification',
            classification: 'projects/imazon-simex/LULC/integration-scenes-ft',
            fnnf: 'projects/imazon-simex/LULC/non-natural-forest-formation',
            cover:'projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1',
            //13 bandas
            beta2: 'users/geomapeamentoipam/Collection_fire_months_v5_1',
            beta3:'users/geomapeamentoipam/Collection_fire_months_v5_1',
            beta1: "users/geomapeamentoipam/Collection_fire_months_v4_1",
            beta2Mask: "projects/mapbiomas-workspace/FOGO/fireAdj",
            //comparação
            modisBurnData: "MODIS/006/MCD64A1",
        },
        collection: null,
        classification: null,
        focos:null,
        year: '2019',
        geometry: ee.Geometry.Point([-47.8961, -15.6238]),
        region: null,
        buffer: 5000,
        collectionId: {
            'LT05': "LANDSAT/LT05/C01/T1_SR",
            'LE07': "LANDSAT/LE07/C01/T1_SR",
            'LC08': "LANDSAT/LC08/C01/T1_SR"
        },
        vis: {
            'LC08': {
                'bands': 'B6,B5,B4',
                'gain': '0.08,0.06,0.2',
                'gamma': 0.75
            },
            'LE07': {
                'bands': 'B5,B4,B3',
                'gain': '0.08,0.06,0.2',
                'gamma': 0.75
            },
            'LT05': {
                'bands': 'B5,B4,B3',
                'gain': '0.08,0.06,0.2',
                'gamma': 0.75
            },
            'cover': {
                'min': 0,
                'max': 45,
                'palette':require('users/mapbiomas/modules:Palettes.js').get('classification5'),
                // 'format': 'png'
            },
            'beta1':{
              'palette':'00ff00',
              'min':0,
              'max':1,
              // 'format': 'png',
            },
            'beta2':{
              'palette':'ff0000',
              'min':0,
              'max':1,
              // 'format': 'png',
            },
            'beta3':{
              'palette':'0000ff',
              'min':0,
              'max':1,
              // 'format': 'png',
            }
,
            'beta2Mask':{
              'palette':'ff00ff',
              'min':0,
              'max':1,
              // 'format': 'png',
            }
        },
        blackList: [],
    },
    init: function () {
        App.getCollection();
        App.loadClassification();
        App.ui.init();
    },
    loadClassification: function () {
        var collection = ee.ImageCollection(App.options.assets.classification);
        var collectionAmz = collection.filterMetadata('version', 'equals', '7');
        var collectionEco = collection.filterMetadata('version', 'equals', '8');
        var classificationAmz = collectionAmz.mosaic();
        var classificationEco = collectionEco.mosaic();
        var classification = classificationAmz
            .where(classificationEco.neq(0), classificationEco)
            .select('classification_' + App.options.year);
        var fnnf = ee.Image(App.options.assets.fnnf);
        var cover = ee.Image(App.options.assets.cover)
          .select('classification_' + App.options.year);
        var beta2 = ee.ImageCollection(App.options.assets.beta2)
          .filter(ee.Filter.eq('year',parseInt(App.options.year)))
          .select('FireYear')
          .mosaic();
        App.options.classification = cover;
        App.options.beta2 = beta2;
        App.options.collectionAmz = collectionAmz;
        App.options.collectionEco = collectionEco;
    },
    getCollection: function () {
        var collectionL5 = ee.ImageCollection(App.options.collectionId.LT05)
            .filterDate(App.options.year + '-01-01', App.options.year + '-12-31')
            .filterMetadata('CLOUD_COVER', 'less_than', 50)
            .filterBounds(App.options.geometry)
            .select(['B5', 'B4', 'B3'], ['swir1', 'nir', 'red'])
            .map(
                function (image) {
                    return image.set('imageName',
                        ee.String(App.options.collectionId.LT05).cat('/').cat(image.id()));
                }
            );
        var collectionL7 = ee.ImageCollection(App.options.collectionId.LE07)
            .filterDate(App.options.year + '-01-01', App.options.year + '-12-31')
            .filterMetadata('CLOUD_COVER', 'less_than', 50)
            .filterBounds(App.options.geometry)
            .select(['B5', 'B4', 'B3'], ['swir1', 'nir', 'red'])
            .map(
                function (image) {
                    return image.set('imageName',
                        ee.String(App.options.collectionId.LE07).cat('/').cat(image.id()));
                }
            );
        var collectionL8 = ee.ImageCollection(App.options.collectionId.LC08)
            .filterDate(App.options.year + '-01-01', App.options.year + '-12-31')
            .filterMetadata('CLOUD_COVER', 'less_than', 50)
            .filterBounds(App.options.geometry)
            .select(['B6', 'B5', 'B4'], ['swir1', 'nir', 'red'])
            .map(
                function (image) {
                    return image.set('imageName',
                        ee.String(App.options.collectionId.LC08).cat('/').cat(image.id()));
                }
            );
        // App.options.collection = collectionL5.merge(collectionL7).merge(collectionL8)
        //     .sort('SENSING_TIME');
        App.options.collection = require('users/geomapeamentoipam/GT_Fogo_MapBiomas:00_Tools/require-collectionAllLandsat').allLandsat2()
            .filterDate(App.options.year + '-01-01', App.options.year + '-12-31')
            .filterMetadata('CLOUD_COVER', 'less_than', 50)
            .filterBounds(App.options.geometry)
            .select(['SWIR1', 'NIR', 'RED'])
            .sort('SENSING_TIME');
        App.options.focos = require('users/geomapeamentoipam/GT_Fogo_MapBiomas:00_Tools/require-collectionAllFocos').allFocos()
            // .filterDate(App.options.year + '-01-01', App.options.year + '-12-31')
// print(App.options.focos)          
    },
    ui: {
        init: function () {
            App.ui.setRegion();
            App.ui.updateThumbsList();
            App.ui.startMap();
            App.ui.form.init();
        },
        startMap: function () {
            App.ui.form.map1.centerObject(App.options.region);
            App.ui.form.map1.addLayer(App.options.classification, App.options.vis.cover, App.options.year);
            App.ui.form.map1.addLayer(App.options.beta2, App.options.vis.beta2, 'beta 2 - ' + App.options.year);
            App.ui.form.map1.addLayer(ee.FeatureCollection(App.options.region)
                .style({
                    color: 'ff0000',
                    fillColor: 'ff000000'
                }),
                {},
                'Geometry');
        },
        updateMap: function () {
            // App.ui.form.map1.centerObject(App.options.region);
            var regionLayer = ui.Map.Layer({
                'eeObject': ee.FeatureCollection(App.options.region)
                    .style({
                        color: 'ff0000',
                        fillColor: 'ff000000'
                    }),
                'visParams': {},
                'name': 'Geometry',
                'shown': true,
                'opacity': 1.0
            });
            var layers = App.ui.form.map1.layers();
            // print(layers)
            for (var i = 0; i < layers.length(); i++) {
                var layer = layers.get(i);
                if (layer.get('name') == 'Geometry') {
                    App.ui.form.map1.remove(layer);
                }
            }
            layers.insert(1, regionLayer);
        },
        setRegion: function () {
            App.options.region = App.options.geometry.buffer(App.options.buffer).bounds();
        },
        updateImageList: function (checked, checkbox) {
            var fun = function (imageName) {
                return imageName !== checkbox.imageName;
            };
            if (checked) {
                // App.options.imageList = App.options.imageList.filter(fun);
                App.options.blackList.push(checkbox.imageName);
            } else {
                App.options.blackList = App.options.blackList.filter(fun);
                // App.options.imageList.push(checkbox.imageName);
            }
            print(App.options.blackList);
        },
        makeThumb: function (imageName) {
            var shortName = imageName.split('/').reverse()[0];
            var satellite = shortName.split('_')[0];
            var date = {
              year: shortName.split('_')[2].slice(0,4),
              month: shortName.split('_')[2].slice(4,6),
              day: shortName.split('_')[2].slice(6,8)
            };
            var image = ee.Image(imageName)
                .visualize(App.options.vis[satellite])
                .set("system:footprint", App.options.region);
            var cover = ee.Image(App.options.assets.cover)
              .select('classification_' + date.year)
                .visualize({
                  min: 0,
                  max: 45,
                  palette:require('users/mapbiomas/modules:Palettes.js').get('classification5')
                })
                .set("system:footprint", App.options.region);
            var months = [
              null, 'Jan','Feb','Mar','Apr','May','June',
              'July','Aug','Sept','Oct','Nov','Dec'
              ];
            var monthBand = months[parseInt(date.month)];
//BETA 2
            var beta2 = ee.ImageCollection(App.options.assets.beta2)
              .filter(ee.Filter.eq('year', parseInt(date.year)))
              .select(monthBand)
              .mosaic()
            beta2 = beta2.updateMask(beta2.gte(1))
              .visualize(App.options.vis.beta2)
              .set("system:footprint", App.options.region);
            var imageBeta2 = image.blend(beta2)
              .set("system:footprint", App.options.region);
            var coverBeta2 = cover.blend(beta2)
              .set("system:footprint", App.options.region);
//BETA 3
            var beta3 = ee.ImageCollection(App.options.assets.beta3)
              .filter(ee.Filter.eq('year', parseInt(date.year)))
              .select(monthBand)
              .mosaic()
            beta3 = beta3.updateMask(beta3.gte(1))
              .visualize(App.options.vis.beta3)
              .set("system:footprint", App.options.region);
            var imageBeta3 = image.blend(beta3)
              .set("system:footprint", App.options.region);
            var coverBeta3 = cover.blend(beta3)
              .set("system:footprint", App.options.region);
//BETA 1
            var beta1 = ee.ImageCollection(App.options.assets.beta1)
              .filter(ee.Filter.eq('year', parseInt(date.year)))
              .select('FireYear')
              .mosaic()
            beta1 = beta1.updateMask(beta1.gte(1))
              .visualize(App.options.vis.beta1)
              .set("system:footprint", App.options.region);
            var imageBeta1 = image.blend(beta1)
              .set("system:footprint", App.options.region);
            var coverBeta1 = cover.blend(beta1)
              .set("system:footprint", App.options.region);
//BETA 2 Mask 1
            var beta2Mask = ee.ImageCollection(App.options.assets.beta2Mask)
              .filter(ee.Filter.eq('year', parseInt(date.year)))
              .select('FireYear')
              .mosaic()
            beta2Mask = beta2Mask.updateMask(beta2Mask.gte(1))
              .visualize(App.options.vis.beta2Mask)
              .set("system:footprint", App.options.region);
            var imageBeta2Mask = image.blend(beta2Mask)
              .set("system:footprint", App.options.region);
            var coverBeta2Mask = cover.blend(beta2Mask)
              .set("system:footprint", App.options.region);
//modisBurnData
            var modisBurnData = ee.ImageCollection(App.options.assets.modisBurnData)
              // .filterDate(date.year + '-' + date.month + '-01',date.year + '-' + date.month + '-30'))
            var container = ui.Panel({
                "layout": ui.Panel.Layout.flow('vertical'),
                "style": {
                    'border': '4px solid rgba(97, 97, 97, 0.05)',
                    'padding': '4px',
                    'margin': '5px',
                },
            });
            var collection = ee.ImageCollection.fromImages([
              // image,
              // imageBeta1,
              // image,
              imageBeta2,
              // image,
              // imageBeta3,
              image,
              // imageBeta2Mask,
              // image,
              ]);
            var thumbnail = ui.Thumbnail({
                'image': collection,
                'params': {
                    'dimensions': 256,
                    'crs': 'EPSG:4326',
                    'format': 'gif',
                    'framesPerSecond': 1
                },
                'style': {
                    'width': '256px',
                    'height': '256px',
                }
            });
            var label = 'DIA -> ' + date.day + '-' + date.month + '-'  + date.year + ' || ' + shortName;
            var checkbox = ui.Checkbox({
                'label': label,
                'value': false,
                'onChange': App.ui.updateImageList,
                'style': {
                    'fontWeight': '50',
                    'textAlign': 'center',
                    'fontSize': '11px',
                    'backgroundColor': '#f2f2f2',
                    'stretch': 'horizontal',
                }
            });
            checkbox.imageName = shortName;
            container.add(thumbnail);
            container.add(checkbox);
            return container;
        },
        updateThumbsList: function () {
            var imageNames = ee.ImageCollection(App.options.collection)
            .reduceColumns(
                ee.Reducer.toList(),
                ['imageName']
            ).get('list');
            imageNames.evaluate(
                function (imageNames) {
                    var thumbsList = imageNames.map(
                        function (imageName) {
                            var thumbnail = App.ui.makeThumb(imageName);
                            return thumbnail;
                        }
                    );
                    App.ui.form.panelThumbs.remove(App.ui.form.panelThumbsList);
                    App.ui.form.panelThumbsList = ui.Panel({
                        'widgets': thumbsList,
                        'layout': ui.Panel.Layout.flow('horizontal', true),
                        'style': {
                            'stretch': 'both',
                        }
                    });
                    App.ui.form.panelThumbs.add(App.ui.form.panelThumbsList);
                }
            );
        },
        form: {
            init: function () {
                ui.root.widgets().reset([App.ui.form.splitPanel]);
                App.ui.form.panelBase.add(App.ui.form.map1);
                App.ui.form.splitPanel.setFirstPanel(App.ui.form.panelBase);
                App.ui.form.splitPanel.setSecondPanel(App.ui.form.panelThumbs);
            },
            splitPanel: ui.SplitPanel({
                'orientation': 'vertical',
                'wipe': false
            }),
            panelBase: ui.Panel({
                'style': {
                    'stretch': 'both',
                }
            }),
            panelThumbs: ui.Panel({
                'style': {
                    // 'height': '300px'
                }
            }),
            panelThumbsList: ui.Panel({
                'layout': ui.Panel.Layout.flow('horizontal', true),
                'style': {
                    'stretch': 'both',
                }
            }),
            panelAnimation: ui.Panel({
                'layout': ui.Panel.Layout.flow('horizontal', true),
                'style': {
                    'stretch': 'both',
                    'position': 'bottom-right'
                }
            }),
            map1: ui.Map({
                'onClick': function (coords) {
                    App.options.geometry = ee.Geometry.Point([coords.lon, coords.lat]);
                    App.getCollection();
                    App.ui.setRegion();
                    App.ui.updateMap();
                    App.ui.updateThumbsList();
                },
                'style': {
                    'stretch': 'both',
                }
            }),
        }
    }
};
// run App
App.init();