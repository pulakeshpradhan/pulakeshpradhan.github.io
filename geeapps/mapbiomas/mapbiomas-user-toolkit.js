/**
 * @name
 *      Mapbiomas User Toolkit Download
 * 
 * @description
 *      This is a support tool for mapbiomas data users.
 *  
 * @author
 *      João Siqueira
 *      contato@mapbiomas.org
 *
 * @version
 *    1.0.0 - Acess and download municipalites data
 *    1.1.0 - Acess and download state data
 *    1.2.0 - Acess and download transitions data
 *    1.2.1 - Fix bug in task name
 *    1.2.2 - Update states vector
 *    1.2.3 - Add nice mapbiomas logo :)
 *    1.2.4 - Acess and download biomes data
 *
 * @see
 *      Get the MapBiomas exported data in your "Google Drive/MAPBIOMAS-EXPORT" folder
 */
var palettes = require('users/mapbiomas/modules:Palettes.js');
var logos = require('users/mapbiomas/modules:Logos.js');
var App = {
    options: {
        version: '1.2.4',
        logo: logos.mapbiomas,
        assets: {
            municipalities: "projects/mapbiomas-workspace/AUXILIAR/municipios-2016",
            states: "projects/mapbiomas-workspace/AUXILIAR/estados-2017",
            biomes: "projects/mapbiomas-workspace/AUXILIAR/biomas",
            integration: 'projects/mapbiomas-workspace/public/collection3/mapbiomas_collection3_integration_v1',
            transitions: 'projects/mapbiomas-workspace/public/collection3/mapbiomas_collection3_transitions_v1',
        },
        periods: {
            'Coverage': [
                '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992',
                '1993', '1994', '1995', '1996',
                '1997', '1998', '1999', '2000',
                '2001', '2002', '2003', '2004',
                '2005', '2006', '2007', '2008',
                '2009', '2010', '2011', '2012',
                '2013', '2014', '2015', '2016',
                '2017'
            ],
            'Transitions': [
                "1985_1986", "1986_1987", "1987_1988", "1988_1989",
                "1989_1990", "1990_1991", "1991_1992", "1992_1993",
                "1993_1994", "1994_1995", "1995_1996", "1996_1997",
                "1997_1998", "1998_1999", "1999_2000", "2000_2001",
                "2001_2002", "2002_2003", "2003_2004", "2004_2005",
                "2005_2006", "2006_2007", "2007_2008", "2008_2009",
                "2009_2010", "2010_2011", "2011_2012", "2012_2013",
                "2013_2014", "2014_2015", "2015_2016", "2016_2017",
                "1990_1995", "1995_2000", "2000_2005", "2005_2010",
                "2010_2015", "2015_2017", "2000_2010", "2010_2017",
                "1985_2017", "2008_2017", "2012_2017", "1994_2002",
                "2002_2010", "2010_2016",
            ]
        },
        bandsNames: {
            'Coverage': 'classification_',
            'Transitions': 'transition_'
        },
        dataType: 'Coverage',
        data: {
            'Coverage': null,
            'Transitions': null,
        },
        ranges: {
            'Coverage': {
                'min': 0,
                'max': 33
            },
            'Transitions': {
                'min': -2,
                'max': 3
            },
        },
        biomes: null,
        states: null,
        municipalities: null,
        activeFeature: null,
        activeName: '',
        municipalitiesNames: [],
        biomesNames: {
            'Amazônia': 'AMAZONIA',
            'Caatinga': 'CAATINGA',
            'Cerrado': 'CERRADO',
            'Mata Atlântica': 'MATAATLANTICA',
            'Pampa': 'PAMPA',
            'Pantanal': 'PANTANAL'
        },
        statesNames: {
            'None': 'None',
            'Acre': '12',
            'Alagoas': '27',
            'Amazonas': '13',
            'Amapá': '16',
            'Bahia': '29',
            'Ceará': '23',
            'Distrito Federal': '53',
            'Espírito Santo': '32',
            'Goiás': '52',
            'Maranhão': '21',
            'Minas Gerais': '31',
            'Mato Grosso do Sul': '50',
            'Mato Grosso': '51',
            'Pará': '15',
            'Paraíba': '25',
            'Pernambuco': '26',
            'Piauí': '22',
            'Paraná': '41',
            'Rio de Janeiro': '33',
            'Rio Grande do Norte': '24',
            'Rondônia': '11',
            'Roraima': '14',
            'Rio Grande do Sul': '43',
            'Santa Catarina': '42',
            'Sergipe': '28',
            'São Paulo': '35',
            'Tocantins': '17'
        },
        palette: {
            'Coverage': palettes.get('classification2'),
            'Transitions': ['ffa500', 'ff0000', '818181', '06ff00', '4169e1', '8a2be2']
        },
        transitionsCodes: [{
                name: "1. Floresta",
                noChange: [1, 2, 3, 4, 5, 6, 7, 8],
                upVeg: [],
                downVeg: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 28, 22, 23, 24, 25, 29, 30],
                downWater: [],
                upWater: [26, 33, 31],
                upPlantacao: [9],
                ignored: [27]
            },
            {
                name: "2. Formações Naturais não Florestais",
                noChange: [10, 11, 12, 13],
                upVeg: [],
                downVeg: [14, 15, 16, 17, 18, 19, 20, 21, 28, 22, 23, 24, 25, 29, 30],
                downWater: [],
                upWater: [26, 33, 31],
                upPlantacao: [9],
                ignored: [27, 1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                name: "3. Uso Agropecuário",
                noChange: [14, 15, 16, 17, 18, 19, 20, 21, 28],
                upVeg: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 32],
                downVeg: [],
                downWater: [],
                upWater: [26, 31, 33],
                upPlantacao: [9],
                ignored: [27, 22, 23, 24, 25, 29, 30]
            },
            {
                name: "4.Áreas não vegetadas",
                noChange: [22, 23, 24, 25, 29, 30],
                upVeg: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 32],
                downVeg: [],
                downWater: [],
                upWater: [26, 31, 33],
                upPlantacao: [9],
                ignored: [27, 14, 15, 18, 19, 20, 21, 28],
            },
            {
                name: "5. Corpos Dágua",
                noChange: [26, 31, 33],
                upVeg: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 32],
                downVeg: [],
                downWater: [14, 15, 16, 17, 18, 19, 20, 21, 28, 22, 23, 24, 25, 29, 30],
                upWater: [],
                upPlantacao: [9],
                ignored: [27]
            },
            {
                name: "Plantacao Florestal",
                noChange: [9],
                upVeg: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 32],
                downVeg: [],
                downWater: [14, 15, 18, 19, 20, 21, 28, 22, 23, 24, 25, 29, 30],
                upWater: [26, 31, 33],
                upPlantacao: [],
                ignored: [27]
            },
            {
                name: "6. Não observado",
                noChange: [27],
                upVeg: [],
                downVeg: [],
                downWater: [],
                upWater: [],
                upPlantacao: [],
                ignored: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 28, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33]
            }
        ],
    },
    init: function () {
        this.ui.init();
        this.loadTables();
        this.loadImages();
        this.startMap();
    },
    setVersion: function () {
        App.ui.form.labelTitle.setValue('MapBiomas User Toolkit ' + App.options.version);
    },
    loadTables: function () {
        App.options.municipalities = ee.FeatureCollection(App.options.assets.municipalities);
        App.options.states = ee.FeatureCollection(App.options.assets.states);
        App.options.biomes = ee.FeatureCollection(App.options.assets.biomes);
    },
    loadImages: function () {
        App.options.data.Coverage = ee.Image(App.options.assets.integration);
        App.options.data.Transitions = ee.Image(App.options.assets.transitions);
    },
    startMap: function () {
        Map.setCenter(-53.48144, -11.43695, 5);
        var imageLayer = ui.Map.Layer({
            'eeObject': App.options.data.Coverage,
            'visParams': {
                'bands': ['classification_2017'],
                'palette': App.options.palette.Coverage,
                'min': 0,
                'max': 33,
                'format': 'png'
            },
            'name': 'Mapbiomas 2017',
            'shown': true,
            'opacity': 1.0
        });
        Map.add(imageLayer);
    },
    formatName: function (name) {
        var formated = name
            .toLowerCase()
            .replace(/á/g, 'a')
            .replace(/à/g, 'a')
            .replace(/â/g, 'a')
            .replace(/ã/g, 'a')
            .replace(/ä/g, 'a')
            .replace(/ª/g, 'a')
            .replace(/é/g, 'e')
            .replace(/ê/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ô/g, 'o')
            .replace(/õ/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/ñ/g, 'n')
            .replace(/&/g, '')
            .replace(/@/g, '')
            .replace(/ /g, '');
        return formated;
    },
    remapTransitions: function (image) {
        var oldValues = [];
        var newValues = [];
        App.options.transitionsCodes.forEach(function (c1) {
            c1.noChange.forEach(function (noChange1) {
                c1.noChange.forEach(function (noChange2) {
                    var oldValue = (noChange1 * 100) + noChange2;
                    oldValues.push(oldValue);
                    newValues.push(0);
                });
                c1.upVeg.forEach(function (upVeg2) {
                    var oldValue = (noChange1 * 100) + upVeg2;
                    oldValues.push(oldValue);
                    newValues.push(1);
                });
                c1.downVeg.forEach(function (downVeg2) {
                    var oldValue = (noChange1 * 100) + downVeg2;
                    oldValues.push(oldValue);
                    newValues.push(-1);
                });
                c1.downWater.forEach(function (downWater2) {
                    var oldValue = (noChange1 * 100) + downWater2;
                    oldValues.push(oldValue);
                    newValues.push(-2);
                });
                c1.upWater.forEach(function (upWater2) {
                    var oldValue = (noChange1 * 100) + upWater2;
                    oldValues.push(oldValue);
                    newValues.push(2);
                });
                c1.upPlantacao.forEach(function (upPlantacao2) {
                    var oldValue = (noChange1 * 100) + upPlantacao2;
                    oldValues.push(oldValue);
                    newValues.push(3);
                });
                c1.ignored.forEach(function (ignored2) {
                    var oldValue = (noChange1 * 100) + ignored2;
                    oldValues.push(oldValue);
                    newValues.push(0);
                });
            });
        });
        return image.remap(oldValues, newValues).rename(image.bandNames());
    },
    ui: {
        init: function () {
            this.form.init();
        },
        setDataType: function (dataType) {
            App.options.dataType = dataType;
        },
        // loadBiomesList: function (biome) {
        //     App.ui.makeLayersList(biome, App.options.activeFeature, App.options.periods[App.options.dataType]);
        // },
        loadStatesList: function (biome) {
            App.ui.form.selectState.setPlaceholder('loading names...');
            ee.List(App.options.states.filterBounds(
                        App.options.biomes.filterMetadata('name', 'equals', String(App.options.biomesNames[biome])))
                    .reduceColumns(ee.Reducer.toList(), ['CD_GEOCUF'])
                    .get('list'))
                .sort()
                .evaluate(
                    function (statesList, errorMsg) {
                        var filtered = Object.keys(App.options.statesNames)
                            .filter(
                                function (state) {
                                    return statesList.indexOf(App.options.statesNames[state]) != -1;
                                }
                            );
                        print(filtered);
                        App.ui.form.selectState = ui.Select({
                            'items': ['None'].concat(filtered),
                            'placeholder': 'select state',
                            'onChange': function (state) {
                                if (state != 'None') {
                                    App.options.activeName = state;
                                    App.ui.loadState(state);
                                    App.ui.loadMunicipalitiesList(App.options.statesNames[state]);
                                    App.ui.makeLayersList(state, App.options.activeFeature, App.options.periods[App.options.dataType]);
                                    App.ui.form.selectDataType.setDisabled(false);
                                }
                            },
                            'style': {
                                'stretch': 'horizontal'
                            }
                        });
                        App.ui.form.panelState.widgets()
                            .set(1, App.ui.form.selectState);
                    }
                );
        },
        loadMunicipalitiesList: function (state) {
            App.ui.form.selectMunicipalitie.setPlaceholder('loading names...');
            ee.List(App.options.municipalities
                    .filterMetadata('UF', 'equals', parseInt(state, 10))
                    .reduceColumns(ee.Reducer.toList(), ['NM_MUNICIP'])
                    .get('list'))
                .sort()
                .evaluate(
                    function (municipalities, errorMsg) {
                        App.options.municipalitiesNames = municipalities;
                        App.ui.form.selectMunicipalitie = ui.Select({
                            'items': ['None'].concat(App.options.municipalitiesNames),
                            'placeholder': 'select municipalitie',
                            'onChange': function (municipalitie) {
                                if (municipalitie != 'None') {
                                    App.options.activeName = municipalitie;
                                    App.ui.loadMunicipalitie(municipalitie);
                                    App.ui.makeLayersList(municipalitie, App.options.activeFeature,
                                        App.options.periods[App.options.dataType]);
                                }
                            },
                            'style': {
                                'stretch': 'horizontal'
                            }
                        });
                        App.ui.form.panelMunicipalities.widgets()
                            .set(1, App.ui.form.selectMunicipalitie);
                    }
                );
        },
        loadBiome: function (biome) {
            App.options.activeFeature = App.options.biomes
                .filterMetadata('name', 'equals', String(App.options.biomesNames[biome]));
            print(App.options.activeFeature);
            Map.centerObject(App.options.activeFeature);
            Map.clear();
            Map.addLayer(ee.Image().byte().paint(App.options.activeFeature, 1, 3), {
                    'palette': 'ffffff,ff0000',
                    'min': 0,
                    'max': 1
                },
                biome + ' boundary',
                true);
        },
        loadState: function (state) {
            App.options.activeFeature = App.options.states
                .filterMetadata('CD_GEOCUF', 'equals', String(App.options.statesNames[state]));
            Map.centerObject(App.options.activeFeature);
            Map.clear();
            Map.addLayer(ee.Image().byte().paint(App.options.activeFeature, 1, 3), {
                    'palette': 'ffffff,ff0000',
                    'min': 0,
                    'max': 1
                },
                state + ' boundary',
                true);
        },
        loadMunicipalitie: function (municipalitie) {
            var uf = App.options.statesNames[App.ui.form.selectState.getValue()];
            App.options.activeFeature = App.options.municipalities
                .filterMetadata('NM_MUNICIP', 'equals', municipalitie)
                .filterMetadata('UF', 'equals', parseInt(uf, 10));
            Map.clear();
            Map.addLayer(ee.Image().byte().paint(App.options.activeFeature, 1, 3), {
                    'palette': 'ffffff,ff0000',
                    'min': 0,
                    'max': 1
                },
                municipalitie + ' boundary',
                true);
            Map.centerObject(App.options.activeFeature);
        },
        addImageLayer: function (period, label, region) {
            var image = App.options.data[App.options.dataType]
                .select([App.options.bandsNames[App.options.dataType] + period])
                .clip(region);
            if (App.options.dataType == 'Transitions') {
                image = App.remapTransitions(image);
            }
            var imageLayer = ui.Map.Layer({
                'eeObject': image,
                'visParams': {
                    'palette': App.options.palette[App.options.dataType],
                    'min': App.options.ranges[App.options.dataType].min,
                    'max': App.options.ranges[App.options.dataType].max,
                    'format': 'png'
                },
                'name': label,
                'shown': true,
                'opacity': 1.0
            });
            Map.layers().insert(
                Map.layers().length() - 1,
                imageLayer
            );
        },
        removeImageLayer: function (label) {
            for (var i = 0; i < Map.layers().length(); i++) {
                var layer = Map.layers().get(i);
                if (label === layer.get('name')) {
                    Map.remove(layer);
                }
            }
        },
        manageLayers: function (checked, period, label, region) {
            if (checked) {
                App.ui.addImageLayer(period, label, region);
            } else {
                App.ui.removeImageLayer(label);
            }
        },
        makeLayersList: function (regionName, region, periods) {
            App.ui.form.panelLayersList.clear();
            periods.forEach(
                function (period, index, array) {
                    App.ui.form.panelLayersList.add(
                        ui.Checkbox({
                            "label": regionName + ' ' + period,
                            "value": false,
                            "onChange": function (checked) {
                                App.ui.manageLayers(checked, period, regionName + ' ' + period, region);
                            },
                            "disabled": false,
                            "style": {
                                'padding': '2px',
                                'stretch': 'horizontal',
                                'backgroundColor': '#dddddd',
                                'fontSize': '12px'
                            }
                        })
                    );
                }
            );
        },
        export2Drive: function () {
            var layers = App.ui.form.panelLayersList.widgets();
            for (var i = 0; i < layers.length(); i++) {
                var selected = layers.get(i).getValue();
                if (selected) {
                    var period = App.options.periods[App.options.dataType][i];
                    var municName = App.formatName(App.ui.form.selectMunicipalitie.getValue() || '');
                    var stateName = App.formatName(App.ui.form.selectState.getValue() || '');
                    var biomeName = App.formatName(App.ui.form.selectBiome.getValue() || '');
                    var fileName = 'mapbiomas-' + biomeName + '-' + stateName + '-' + municName + '-' + period;
                    fileName = fileName.replace(/--/g, '-').replace(/--/g, '-');
                    Export.image.toDrive({
                        image: App.options.data[App.options.dataType]
                            .select([App.options.bandsNames[App.options.dataType] + period])
                            .clip(App.options.activeFeature),
                        description: fileName,
                        folder: 'MAPBIOMAS-EXPORT',
                        fileNamePrefix: fileName,
                        region: App.options.activeFeature.geometry().bounds(),
                        scale: 30,
                        maxPixels: 1e13,
                        skipEmptyTiles: true,
                        fileDimensions: 256 * 512,
                    });
                }
            }
        },
        form: {
            init: function () {
                this.panelMain.add(this.panelLogo);
                this.panelMain.add(this.labelTitle);
                this.panelLogo.add(App.options.logo);
                this.panelBiomes.add(this.labelBiomes);
                this.panelBiomes.add(this.selectBiome);
                this.panelState.add(this.labelState);
                this.panelState.add(this.selectState);
                this.panelMunicipalities.add(this.labelMunicipalitie);
                this.panelMunicipalities.add(this.selectMunicipalitie);
                this.panelDataType.add(this.labelDataType);
                this.panelDataType.add(this.selectDataType);
                this.panelMain.add(this.panelBiomes);
                this.panelMain.add(this.panelState);
                this.panelMain.add(this.panelMunicipalities);
                this.panelMain.add(this.panelDataType);
                this.panelMain.add(this.labelLayers);
                this.panelMain.add(this.panelLayersList);
                this.panelMain.add(this.buttonExport2Drive);
                this.panelMain.add(this.labelNotes);
                ui.root.add(this.panelMain);
            },
            panelMain: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'width': '360px',
                    'position': 'bottom-left',
                    'margin': '0px 0px 0px 0px',
                },
            }),
            panelLogo: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'margin': '0px 0px 0px 110px',
                },
            }),
            panelBiomes: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'stretch': 'horizontal'
                },
            }),
            panelState: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'stretch': 'horizontal'
                },
            }),
            panelMunicipalities: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'stretch': 'horizontal'
                },
            }),
            panelDataType: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'stretch': 'horizontal'
                },
            }),
            panelLayersList: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'height': '300px',
                    'stretch': 'vertical',
                    'backgroundColor': '#cccccc',
                },
            }),
            labelTitle: ui.Label('MapBiomas User Toolkit', {
                'fontWeight': 'bold',
                'padding': '1px',
                'fontSize': '16px'
            }),
            labelBiomes: ui.Label('Biome:', {
                'padding': '1px',
                'fontSize': '16px'
            }),
            labelState: ui.Label('State:', {
                'padding': '1px',
                'fontSize': '16px'
            }),
            labelMunicipalitie: ui.Label('Municipalities:', {
                'padding': '1px',
                'fontSize': '16px'
            }),
            labelDataType: ui.Label('Data Type:', {
                'padding': '1px',
                'fontSize': '16px'
            }),
            labelLayers: ui.Label('Layers:', {
                'padding': '1px',
                'fontSize': '16px'
            }),
            labelNotes: ui.Label('Go to Task tab to run the export task.', {
                'padding': '1px',
                'fontSize': '16px'
            }),
            selectBiome: ui.Select({
                'items': [
                    'None', 'Amazônia', 'Caatinga', 'Cerrado', 'Mata Atlântica', 'Pampa', 'Pantanal'
                ],
                'placeholder': 'select biome',
                'onChange': function (biome) {
                    if (biome != 'None') {
                        App.options.activeName = biome;
                        App.ui.loadBiome(biome);
                        App.ui.loadStatesList(biome);
                        App.ui.makeLayersList(biome, App.options.activeFeature, App.options.periods[App.options.dataType]);
                        // App.ui.loadMunicipalitiesList(App.options.statesNames[state]);
                        App.ui.form.selectDataType.setDisabled(false);
                    }
                },
                'style': {
                    'stretch': 'horizontal'
                }
            }),
            selectState: ui.Select({
                'items': [
                    'None', 'Acre', 'Alagoas', 'Amazonas', 'Amapá', 'Bahia',
                    'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão',
                    'Minas Gerais', 'Mato Grosso do Sul', 'Mato Grosso', 'Pará', 'Paraíba',
                    'Pernambuco', 'Piauí', 'Paraná', 'Rio de Janeiro', 'Rio Grande do Norte',
                    'Rondônia', 'Roraima', 'Rio Grande do Sul', 'Santa Catarina', 'Sergipe',
                    'São Paulo', 'Tocantins'
                ],
                'placeholder': 'select state',
                'onChange': function (state) {
                    if (state != 'None') {
                        App.options.activeName = state;
                        App.ui.loadState(state);
                        // App.ui.loadStatesList(state);
                        App.ui.loadMunicipalitiesList(App.options.statesNames[state]);
                        App.ui.makeLayersList(state, App.options.activeFeature, App.options.periods[App.options.dataType]);
                        App.ui.form.selectDataType.setDisabled(false);
                    }
                },
                'style': {
                    'stretch': 'horizontal'
                }
            }),
            selectMunicipalitie: ui.Select({
                'items': [],
                'placeholder': 'None',
                'style': {
                    'stretch': 'horizontal'
                }
            }),
            selectDataType: ui.Select({
                'items': ['Coverage', 'Transitions'],
                'placeholder': 'Coverage',
                'style': {
                    'stretch': 'horizontal'
                },
                'disabled': true,
                'onChange': function (dataType) {
                    App.ui.setDataType(dataType);
                    App.ui.makeLayersList(App.options.activeName, App.options.activeFeature, App.options.periods[dataType]);
                },
            }),
            buttonExport2Drive: ui.Button({
                "label": "Export images to Google Drive",
                "onClick": function () {
                    App.ui.export2Drive();
                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal'
                }
            }),
        },
    }
};
App.init();
App.setVersion();