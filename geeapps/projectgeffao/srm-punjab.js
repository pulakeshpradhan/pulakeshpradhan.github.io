var imgSoc = ui.import && ui.import("imgSoc", "image", {
      "id": "users/projectgeffao/GSOCmap150"
    }) || ee.Image("users/projectgeffao/GSOCmap150"),
    imgLpd = ui.import && ui.import("imgLpd", "image", {
      "id": "users/projectgeffao/World/LPD_world_2001_2020_World"
    }) || ee.Image("users/projectgeffao/World/LPD_world_2001_2020_World"),
    imgLcAll = ui.import && ui.import("imgLcAll", "image", {
      "id": "users/projectgeffao/World/Copernicus_LC_UNCCD_2015_2019_World"
    }) || ee.Image("users/projectgeffao/World/Copernicus_LC_UNCCD_2015_2019_World"),
    imgCombined2 = ui.import && ui.import("imgCombined2", "image", {
      "id": "users/projectgeffao/World/CoperLC2019x10_plus_LPD2020_world"
    }) || ee.Image("users/projectgeffao/World/CoperLC2019x10_plus_LPD2020_world"),
    imgTransitions = ui.import && ui.import("imgTransitions", "image", {
      "id": "users/projectgeffao/World/Copernicus_LC_Transitions_World"
    }) || ee.Image("users/projectgeffao/World/Copernicus_LC_Transitions_World"),
    imgMountains = ui.import && ui.import("imgMountains", "image", {
      "id": "users/projectgeffao/World/k1classes"
    }) || ee.Image("users/projectgeffao/World/k1classes"),
    imgCombined3 = ui.import && ui.import("imgCombined3", "image", {
      "id": "users/projectgeffao/World/Coper_LC2019x100_plus_LPDx10_plus_Mont1_bin_world"
    }) || ee.Image("users/projectgeffao/World/Coper_LC2019x100_plus_LPDx10_plus_Mont1_bin_world"),
    ftcKba = ui.import && ui.import("ftcKba", "table", {
      "id": "users/projectgeffao/World/KBAsGlobal_2020_September_02_POL_Fixed"
    }) || ee.FeatureCollection("users/projectgeffao/World/KBAsGlobal_2020_September_02_POL_Fixed"),
    ftcPa = ui.import && ui.import("ftcPa", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    imgPrecipitationTrend = ui.import && ui.import("imgPrecipitationTrend", "image", {
      "id": "users/projectgeffao/World/Climate/aPrecipTrendIndex_ChirpsPerainnTrmm_World_2000_2020"
    }) || ee.Image("users/projectgeffao/World/Climate/aPrecipTrendIndex_ChirpsPerainnTrmm_World_2000_2020"),
    imgTerrain = ui.import && ui.import("imgTerrain", "image", {
      "id": "users/projectgeffao/Pakistan/Terrain_rgb3b_Punjab_v3"
    }) || ee.Image("users/projectgeffao/Pakistan/Terrain_rgb3b_Punjab_v3"),
    exapilots = ui.import && ui.import("exapilots", "table", {
      "id": "users/projectgeffao/Pakistan/Watershed_pilots"
    }) || ee.FeatureCollection("users/projectgeffao/Pakistan/Watershed_pilots"),
    ftc1 = ui.import && ui.import("ftc1", "table", {
      "id": "users/projectgeffao/Pakistan/PreCalLevel1_Punjab_v4_Fix"
    }) || ee.FeatureCollection("users/projectgeffao/Pakistan/PreCalLevel1_Punjab_v4_Fix"),
    ftc2 = ui.import && ui.import("ftc2", "table", {
      "id": "users/projectgeffao/Pakistan/PreCalLevel2_Punjab_v4_Fix"
    }) || ee.FeatureCollection("users/projectgeffao/Pakistan/PreCalLevel2_Punjab_v4_Fix"),
    ftcProjects = ui.import && ui.import("ftcProjects", "table", {
      "id": "users/projectgeffao/Pakistan/PreCalLevelProject_Punjab_v4_Fix"
    }) || ee.FeatureCollection("users/projectgeffao/Pakistan/PreCalLevelProject_Punjab_v4_Fix");
// Authors for this App are:
// Eugenia Raviolo - eugenia.raviolo@gmail.com
// Cesar Garcia - cesarnon@gmail.com
// Ingrid Teich - ingridteich@gmail.com
/** Modules */
var mdlLegends = require('users/projectgeffao/modules:legends.js');
var mdlNdvi = require('users/projectgeffao/modules:ndvi.js');
var mdlLocalization = require('users/projectgeffao/Pakistan:Apps/localization.js');
/** Global variables */
// Clip/filter from world images to container
imgTransitions = imgTransitions.clip(ftc1);//.selfMask(); // 0s in no change transitions
imgSoc = imgSoc.unmask().clip(ftc1);
imgLpd = imgLpd.clip(ftc1);
imgMountains = imgMountains.clip(ftc1);
imgCombined2 = imgCombined2.clip(ftc1);
ftcKba = ftcKba.filterMetadata("ISO3", "equals", "PAK");
ftcPa = ftcPa.filterMetadata("ISO3", "equals", "PAK");
// Used in hotspots analysis for custom categories combination 
var imgCustom = ee.Image(0).selfMask();
//var vis = mdlVis.vis;
var defaultInitialLCYear = '2015';
var defaultFinalLCYear = '2019';
var lcInitialYears = ['2015', '2016', '2017', '2018'];
var referenceDocUrl = 'https://docs.google.com/document/d/e/2PACX-1vQIVU1L7VrdVipLQxAYehQxww_B58c2R3udvJ5xzjSzilpGfhDJkaOrXENIWxcmOCZevS1aX5PHJPX2/pub';
var contactEmail = 'cesar.garcia@fao.org';
var ftcAoi = null; // holds selected area feature 
// Select items (areas of interest names)
//original
var namesAoiAll = ftc2.reduceColumns(ee.Reducer.toList(), ['name']).get('list').getInfo();
namesAoiAll = namesAoiAll.slice().sort();
// project filtered
var namesAoiProject = ftc2.filterMetadata('Project', 'equals', 1)
    .reduceColumns(ee.Reducer.toList(), ['name']).get('list').getInfo();
namesAoiProject = namesAoiProject.slice().sort();
// ONLOAD ONLY PROOJECT AREAS
var namesAoi = namesAoiProject;
var layerEntries; // configuration for loading layers selector on the left panel
var namesLayers; // array with layers names only (from layers entries)
var labels; // holds localized labels dict for language selected
var hotspotsEntries; // configuration for loading sections in hotspots panel 
// Categories names arrays, used in legends and charts (localized on init)
var namesLC;
var namesLCTransitions;
var namesLPD;
var namesMountains;
var namesMountainsHotspots;
// Visualization
var paletteLC = ['#377e3f', '#c19511', '#fcdb00', '#18eebe', '#d7191c', '#cfdad2', '#4458eb',];
var paletteLCTransitions = ['#FEFFE5'];
for (var i = 0; i < paletteLC.length; i++) {
    paletteLCTransitions[i + 1] = paletteLC[i];
}
var paletteLPD = ['#ff0000', '#ffbebe', '#ffff73', '#d9d8e6', '#267300'];
var paletteSoc = ['#fcffac', '#a60000'];
var paletteMountains = ['#c5fff8', '#95dbd3', '#92db9c', '#55c364', '#8b9c15', '#d99c22', '#9e7219'];
var paletteMountainsHotspots = ['orange', 'grey'];
var palettePrecipTrend = ["#d63000", "#ffffff", "#062fd6"]
var paletteTerrain = ['#589c6e', '#4b8947', '#3e7620', '#33720c', '#33c05a', '#8bdb82', '#c4e297', '#d5e0a1', '#e7deab', '#f8dcb5', '#fddab4', '#fcd7ad', '#fad4a5', '#f8d29e', '#f6cf97', '#f4cc8f', '#f2c988', '#f0c780', '#eec479', '#ecc171', '#eabe6a', '#e8bc62', '#e6b95b', '#e4b653', '#e2b34c', '#e0b144', '#deae3d', '#dcab35', '#daa82e', '#d9a627', '#d1a425', '#caa224', '#c2a023', '#bb9e22', '#b39c20', '#ac9a1f', '#a7991e', '#a7971d', '#a6961c', '#a5941b', '#a5931a', '#a49119', '#a49019', '#a38e18', '#a38d17', '#a38b16', '#a28a15', '#a28814', '#a28613', '#a18512', '#a18311', '#a08110', '#a0800f', '#9f7e0e', '#9f7c0e', '#9f7b0d', '#9e790c', '#9e780b', '#9d760a', '#9d7509', '#9c7308', '#9c7207', '#9b7006', '#9b6e05', '#9a6d04', '#9a6b03', '#9a6902', '#996801', '#996600', '#9a640a', '#9b6218', '#9c6025', '#9e5e33', '#9f5c40', '#a05a4e', '#a25a5a', '#a55e5e', '#a76262', '#a96767', '#ac6b6b', '#ae7070', '#b17474', '#b27979', '#b37d7d', '#b48181', '#b48686', '#b58a8a', '#b68f8f', '#b79393', '#b89898', '#ba9c9c', '#bca0a0', '#bda5a5', '#bfa9a9', '#c1aeae', '#c2b2b2', '#c4b6b6', '#c6bbbb', '#c7bfbf', '#c9c3c3', '#cac8c8', '#cccccc', '#d0d0d0', '#d3d3d3', '#d7d7d7', '#dbdbdb', '#dfdfdf', '#e3e3e3', '#e7e7e7', '#ebebeb', '#efefef', '#f3f3f3', '#f7f7f7', '#fbfbfb'];
var vis = {
    lc: { min: 1, max: 7, opacity: 1, palette: paletteLC },
    lpd: { min: 1, max: 5, opacity: 1, palette: paletteLPD },
    mountains: { min: 1, max: 7, opacity: 1, palette: paletteMountains },
    transitions: { max: 7, min: 0, opacity: 1, palette: paletteLCTransitions },
    border1: { color: 'black', fillColor: 'ffffff00' },
    border2: { color: '#26458d', fillColor: '00000000', width: 1 },
    projectAreas: { color: "white", fillColor: "ffffff00" },
    highlight: { color: '#a422ff', fillColor: '00000000' },
    soc: { min: 0, max: 100, palette: paletteSoc, },
    custom: { max: 1, min: 1, opacity: 1, palette: ['#FF00FF'] },//DF8F05 FF7EF2
    terrain: { min: 0, max: 3000, palette: paletteTerrain },
    pa: { color: 'green' },
    kba: { color: 'orange' },
    precipTrend: { min: -3, max: 3, opacity: 1, palette: palettePrecipTrend }
}
// Column names to retrieve values from precalulated assets
var namesLCColumns = ['lc_1', 'lc_2', 'lc_3', 'lc_4', 'lc_5', 'lc_6', 'lc_7',];
var namesLPDColumns = ['lpd_1', 'lpd_2', 'lpd_3', 'lpd_4', 'lpd_5'];
// Control panel 
var selAoi; // to reset ui.Select values to default when no aoi selected
var pnlHotspots; // to check selected categories and setup combined layer when aoi changes 
var pnlTransitions; // to check if shown to load transitions charts only when aoi changes 
var selLCFromYears; // to check year to reload charts when aoi changes 
var handleClickReset; // to reset previously calculated layer when chart is clicked 
// Output panel 
var infoEntries; // to reload info panel when aoi changes
var pnlGeneralCharts, pnlHotspotsCharts, pnlTransCharts; // to show/hide charts panels 
// Map panel 
var map; // to show/hide layers, to change mode to Satellite
var pnlFrontLayerLegend = ui.Panel({ style: { position: 'bottom-left' } }); // to show/hide layer legend
var pnlCombinedLegend = null; // to show/hide combined layer legend 
var lyrCombined = null; // to show/hide combined layer
/**  Function to initialize the app */
function initApp(lan) {
    map = ui.Map();
    // Localized labels
    labels = mdlLocalization.getLocLabels(lan);
    // Categories labels
    namesLC = [
        labels.lblTreeCovered,
        labels.lblGrassland,
        labels.lblCropland,
        labels.lblWetland,
        labels.lblArtificial,
        labels.lblOtherLand,
        labels.lblWaterbody,
    ];
    namesLCTransitions = [labels.lblNoChange];
    for (var i = 0; i < namesLC.length; i++) {
        namesLCTransitions[i + 1] = namesLC[i];
    }
    namesLPD = [
        labels.lblDeclining,
        labels.lblEarlySignDecline,
        labels.lblStableButStressed,
        labels.lblStable,
        labels.lblIncreasing,
    ];
    namesMountainsHotspots = [
        labels.lblNoMountains,
        labels.lblWithMountains,
    ];
    namesMountains = [
        labels.lblMountain1,
        labels.lblMountain2,
        labels.lblMountain3,
        labels.lblMountain4,
        labels.lblMountain5,
        labels.lblMountain6,
        labels.lblMountain7,
    ];
    // use labels instead of min/max values in this legend
    var pnlPrecTrend = mdlLegends.createColorRampLegendPanel(labels.lblPrecipitationTrend, vis.precipTrend, false, false);
    pnlPrecTrend.widgets().get(2).widgets().get(0).setValue(labels.lblNegTrend);
    pnlPrecTrend.widgets().get(2).widgets().get(1).setValue('');
    pnlPrecTrend.widgets().get(2).widgets().get(2).setValue(labels.lblPosTrend);
    // Map layers configuration
    layerEntries = [
        {
            image: imgTerrain,
            style: {},
            name: labels.lblTerrain,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(labels.lblTerrain + ' (m)', vis.terrain),
            group: 'GENERAL',
            singleColor: false
        },
        {
            image: imgLcAll.select('y' + defaultFinalLCYear).clip(ftc1),
            style: vis.lc,
            name: labels.lblLandCover + ' ' + defaultFinalLCYear,
            visible: true,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLandCover + ' ' + defaultFinalLCYear, namesLC, vis.lc.palette, false, false),
            group: 'GENERAL',
            singleColor: false
        },
        {
            image: imgLpd,
            style: vis.lpd,
            name: labels.lblLandProductivityDynamics,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLandProductivityDynamics, namesLPD, vis.lpd.palette, false, false),
            group: 'GENERAL',
            singleColor: false
        },
        {
            image: imgSoc,
            style: vis.soc,
            name: labels.lblNationalSocMap,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(labels.lblSOCTonnesHa, vis.soc),
            group: 'GENERAL',
            singleColor: false
        },
        {
            image: imgMountains,
            style: vis.mountains,
            name: labels.lblMountains,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblMountains, namesMountains, vis.mountains.palette, false, false),
            group: 'GENERAL',
            singleColor: false
        },
        {
            image: imgPrecipitationTrend,
            style: vis.precipTrend,
            name: labels.lblPrecipitationTrend,
            visible: false,
            legend: pnlPrecTrend,
            group: 'GENERAL',
            singleColor: false
        },
        {
            image: imgCustom,
            style: vis.custom,
            name: labels.lblHotspots,
            visible: false,
            legend: pnlCombinedLegend,
            group: 'HOTSPOTS',
        },
        {
            image: imgLcAll.select('y' + defaultInitialLCYear).clip(ftc1),
            style: vis.lc,
            name: labels.lblFromLC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLandCover, namesLC, vis.lc.palette, false, false),
            group: 'TRANSITIONS',
        },
        {
            image: imgLcAll.select('y' + defaultFinalLCYear).clip(ftc1),
            style: vis.lc,
            name: labels.lblCurrentLC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLandCover, namesLC, vis.lc.palette, false, false),
            group: 'TRANSITIONS',
        },
        {
            image: imgTransitions.select('lc_gain_' + defaultInitialLCYear + '_' + defaultFinalLCYear).clip(ftc1),
            style: vis.transitions,
            name: labels.lblGains,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblGains, namesLCTransitions, vis.transitions.palette, false, false),
            group: 'TRANSITIONS',
        },
        {
            image: imgTransitions.select('lc_loss_' + defaultInitialLCYear + '_' + defaultFinalLCYear).clip(ftc1),
            style: vis.transitions,
            name: labels.lblLosses,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLosses, namesLCTransitions, vis.transitions.palette, false, false),
            group: 'TRANSITIONS',
        },
        {
            image: ftcProjects,
            style: vis.projectAreas,
            name: labels.lblProjectAreas,
            visible: true,
            legend: null,
            group: 'AREAS',
            singleColor: true,
        },
        {
            image: ftc2,
            style: vis.border1,
            name: labels.lblDistricts,
            visible: true,
            legend: null,
            group: 'AREAS',
            singleColor: true,
        },
        {
            image: ftcKba,
            style: vis.kba,
            name: labels.lblKeyBiodiversityAreas,
            visible: false,
            legend: null,
            group: 'AREAS',
            singleColor: true,
        },
        {
            image: ftcPa,
            style: vis.pa,
            name: labels.lblProtectedAreas,
            visible: false,
            legend: null,
            group: 'AREAS',
            singleColor: true,
        },
    ];
    namesLayers = layerEntries.map(function (l) { return l.name });
    // Hotspots panel configuration, in order of precalculated combined image 
    hotspotsEntries = [
        {
            title: labels.lblStep1,
            palette: vis.lc.palette,
            names: namesLC,
            prefix: 'lc_',
            sufix: '_' + defaultFinalLCYear,
            addZeroCategory: false,
            image: imgLcAll.select('y' + defaultFinalLCYear),
            categories: [1, 2, 3, 4, 5, 6, 7]
        },
        {
            title: labels.lblStep2,
            palette: vis.lpd.palette,
            names: namesLPD,
            prefix: 'lpd_',
            sufix: '',
            addZeroCategory: true,
            image: imgLpd,
            categories: [1, 2, 3, 4, 5]
        },
        {
            title: labels.lblStep3,
            palette: paletteMountainsHotspots, // categorized image is used here, so different palette from layer shown in map
            names: namesMountainsHotspots,
            prefix: 'monBin_',
            sufix: '',
            addZeroCategory: false,
            image: imgMountains.gte(1).unmask(),
            categories: [0, 1]
        }
    ];
    // Container panel
    var pnlRoot = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {
            height: '100%',
            width: '100%',
        }
    });
    // Left panel
    var pnlControl = ui.Panel({
        style: {
            height: '100%',
            width: '20%',
        }
    });
    // Center panel
    var pnlMap = ui.Panel({
        style: {
            height: '100%',
            width: '70%',
        }
    });
    // Right panel
    var pnlOutput = ui.Panel({
        style: {
            height: '100%',
            width: '30%',
        }
    });
    // Add split between map and output panel
    var sppMapOutput = ui.SplitPanel(pnlMap, pnlOutput);
    ui.root.clear();
    ui.root.add(pnlRoot);
    pnlRoot.add(pnlControl);
    pnlRoot.add(sppMapOutput);
    initControlPanel(pnlControl, lan);
    initOutputPanel(pnlOutput);
    initMapPanel(pnlMap);
}
/**  */
function initControlPanel(pnlControl, lan) {
    var styleChbLayers = { margin: '4px 6px', fontSize: '12px' };
    var lblIntro = ui.Label(labels.lblTitle, {
        fontWeight: 'bold',
        fontSize: '20px',
        margin: '10px 5px',
    });
    var lblSubtitleSelect = ui.Label({
        value: labels.lblExpl2,
        style: { fontSize: '12px' },
    });
    var selLanguage = ui.Select({
        items: mdlLocalization.languages,
        style: { width: '70%' },
        placeholder: labels.lblSelectLanguage,
    });
    selLanguage.setValue(lan);
    selLanguage.onChange(function (lan) { initApp(lan); });
    pnlControl.add(lblIntro);
    pnlControl.add(selLanguage);
    pnlControl.add(lblSubtitleSelect);
    // Checkbox to filter areas
    var chbOnlyProjectAreas = ui.Checkbox(labels.lblOnlyProjectAreas, true, null, false, styleChbLayers);
    chbOnlyProjectAreas.onChange(function (checked) {
        namesAoi = checked ? namesAoiProject : namesAoiAll;
        selAoi.items().reset(namesAoi)
    });
    // Define the select LIST for the areas of interest (project areas)
    selAoi = ui.Select({
        items: namesAoi,
        style: { width: '70%' },
        placeholder: labels.lblSelectDistrict,
        onChange: function (name) {
            ftcAoi = ftc2.filter(ee.Filter.eq('name', name));
            map.widgets().remove(pnlCombinedLegend);
            showInfoSelectedAoi();
        },
    });
    // Add the select AOI panel to the map panel.
    pnlControl
        .add(chbOnlyProjectAreas)
        .add(selAoi);
    var listLayersChb = [];
    var listLayersLegends = [];
    var listTransitionsChb = [];
    var listTransitionsLegends = [];
    var listTransitionsLayersNames = [];
    var initControlPanelLayers = function () {
        var lblLayersLegends = ui.Label({
            value: labels.lblLayers,
            style: { fontSize: '12px', fontWeight: 'bold' },
        });
        var pnlLayers = ui.Panel({
            style: {
                margin: '0px 5px',
                shown: true
            },
        });
        // Add title and general layers panel
        pnlControl.add(lblLayersLegends).add(pnlLayers);
        // Add checkboxes for general layers
        layerEntries.forEach(function (layer) {
            if (layer.group === 'AREAS') {
                var colorEntry = ui.Label();
                // if single color layer show reference color besides text
                if (layer.singleColor) {
                    var colorEntry = ui.Label({
                        style: {
                            backgroundColor: layer.style.color,
                            border: "1px solid black",
                            padding: "5px",
                            margin: "3px 0 0 0",
                        }
                    });
                }
                var chbw = ui.Checkbox(layer.name, layer.visible, null, false, styleChbLayers);
                chbw.onChange(function (checked, chb) {
                    showLayer(chb.getLabel(), checked);
                    sldOpacity.setValue(1);
                });
                listLayersChb.push(chbw);
                listLayersLegends.push(layer.legend);
                var pnlLayerEntry = ui.Panel({
                    widgets: [chbw, colorEntry],
                    layout: ui.Panel.Layout.Flow("horizontal"),
                });
                pnlLayers.add(pnlLayerEntry);
            }
        });
        layerEntries.forEach(function (layer) {
            if (layer.group === 'GENERAL') {
                var chbw = ui.Checkbox(layer.name, layer.visible, null, false, styleChbLayers);
                listLayersChb.push(chbw);
                listLayersLegends.push(layer.legend);
                chbw.onChange(function (checked, chb) {
                    showLayer(chb.getLabel(), checked);
                    showFrontLayerLegend();
                    sldOpacity.setValue(1);
                });
                pnlLayers.add(chbw);
            }
        })
    }
    var initControlPanelHotspots = function () {
        var btnHotspotsAnalysis = ui.Button({
            label: labels.lblHotspots,
            style: { width: '90%', fontSize: '6px', color: '#900303', fontWeight: 'normal' }, // 'DF8F05'
            onClick: function () {
                map.setOptions('SATELLITE');
                sldOpacity.setValue(1);
                pnlHotspots.style().set({ shown: !pnlHotspots.style().get('shown') });
                // if opening hotspots panel, unselect general layers
                if (pnlHotspots.style().get('shown')) {
                    unselectLayersPanelChecks();
                }
                // show previously calculated layer & legend
                showLayer(labels.lblHotspots, pnlHotspots.style().get('shown'));
                if (pnlCombinedLegend !== null) {
                    pnlCombinedLegend.style().set({
                        shown: pnlHotspots.style().get('shown')
                    });
                }
                // hide transitions panel and layer
                pnlTransitions.style().set({ shown: false });
                handleTransitionsLayersVis(false);
                showFrontLayerLegend();
                handleChartsPanelsShown();
            },
        });
        // Container product panel
        pnlHotspots = ui.Panel({
            style: {
                border: '3px solid #900303', //#DF8F05
                margin: '5px 5px',
                shown: false,
                width: '90%'
            },
        });
        // Create sections for hotspots panel
        hotspotsEntries.forEach(function (h) {
            var pnl = ui.Panel({
                style: {
                    margin: '5px 5px',
                },
            });
            pnl.add(ui.Label({
                value: h.title,
                style: {
                    fontWeight: 'bold',
                    fontSize: '12px',
                    margin: '1px 1px 4px 1px',
                    padding: '2px',
                },
            }));
            for (var i = 0; i < h.names.length; i++) {
                pnl.add(mdlLegends.createCatRow(h.palette[i], h.names[i], true, false));
            }
            pnlHotspots.add(pnl);
        });
        //4-Calculate/Reset buttons
        /** After Calculate btn is pressed all checks and Calculate button are disabled, Reset button is enabled and custom layer is calculated and displayed */
        var handleClickCalculate = function () {
            if (atLeastOneCategoryChecked()) {
                hotspots();
                handleDisableHotspotsChecks(true);
                btnCalculate.setDisabled(true);
                btnReset.setDisabled(false);
                sldOpacity.setValue(1);
            }
        };
        /** When Reset btn is pressed, custom layer previously created is removed, Calculate and checks are enabled again to allow new calculation*/
        handleClickReset = function () {
            if (atLeastOneCategoryChecked()) {
                clearCombinedLayerAndLegend();
                // unselect combined checks
                for (var p = 0; p < hotspotsEntries.length; p++) {
                    var widgetsArray = pnlHotspots.widgets().get(p).widgets().getJsArray();
                    for (var i = 1; i < widgetsArray.length; i++) { // 0=title
                        widgetsArray[i].widgets().get(1).setValue(false);
                    }
                }
                handleDisableHotspotsChecks(false);
                btnCalculate.setDisabled(false);
                sldOpacity.setValue(1);
            }
        };
        pnlHotspots.add(ui.Label(labels.lblStepDisplay, {
            fontWeight: 'bold',
            fontSize: '12px',
            margin: '1px 1px 1px 5px',
            padding: '2px',
        }));
        var btnCalculate = ui.Button({
            label: labels.lblDisplay,
            style: { width: '30%' },
            onClick: handleClickCalculate
        });
        var btnReset = ui.Button({
            label: labels.lblReset,
            style: { width: '30%' },
            onClick: handleClickReset
        });
        var pnlHotspotsButtons = ui.Panel({
            layout: ui.Panel.Layout.flow('horizontal'),
            style: {
                margin: '0px 5px',
            },
            widgets: [btnCalculate, btnReset]
        });
        pnlHotspots.add(pnlHotspotsButtons);
        // add product panel to control panel
        pnlControl.add(btnHotspotsAnalysis).add(pnlHotspots);
    }
    var initControlPanelTransitions = function () {
        pnlTransitions = ui.Panel({
            style: {
                border: '3px solid green',
                margin: '5px 5px',
                shown: false,
                width: '90%'
            },
        });
        selLCFromYears = ui.Select({
            items: lcInitialYears,
            style: { fontSize: '12px' },
            value: defaultInitialLCYear,
            placeholder: labels.lblSelectLCYear,
            onChange: function (pYear) {
                pnlTransitions.widgets().get(1).setLabel(labels.lblLandCover + ' ' + pYear);
                pnlTransitions.widgets().get(3).setLabel(labels.lblGains + ' ' + pYear + ' - ' + defaultFinalLCYear);
                pnlTransitions.widgets().get(4).setLabel(labels.lblLosses + ' ' + pYear + ' - ' + defaultFinalLCYear);
                // reload layers
                var imgFrom = imgLcAll.select('y' + pYear).clip(ftc1);
                var lyrFrom = ui.Map.Layer(imgFrom.visualize(vis.lc), {}, labels.lblFromLC, pnlTransitions.widgets().get(1).getValue());
                map.layers().set(namesLayers.indexOf(labels.lblFromLC), lyrFrom);
                var imgGains = imgTransitions.select('lc_gain_' + pYear + '_' + defaultFinalLCYear).clip(ftc1);
                var lyrGains = ui.Map.Layer(imgGains.visualize(vis.transitions), {}, labels.lblGains, pnlTransitions.widgets().get(3).getValue());
                map.layers().set(namesLayers.indexOf(labels.lblGains), lyrGains);
                var imgLosses = imgTransitions.select('lc_loss_' + pYear + '_' + defaultFinalLCYear).clip(ftc1);
                var lyrLosses = ui.Map.Layer(imgLosses.visualize(vis.transitions), {}, labels.lblLosses, pnlTransitions.widgets().get(4).getValue());
                map.layers().set(namesLayers.indexOf(labels.lblLosses), lyrLosses);
                // Update charts with new selected period                
                setupTransitionsCharts(pnlTransCharts, pYear, defaultFinalLCYear);
            },
        });
        var pnlFromYear = ui.Panel({
            layout: ui.Panel.Layout.flow('horizontal'),
            style: {
                width: '90%', fontSize: '12px',
            },
            widgets: [ui.Label(labels.lblSelectLCYear, { fontSize: '12px' }), selLCFromYears]
        });
        pnlTransitions.add(pnlFromYear);
        layerEntries.forEach(function (layer) {
            if (layer.group === 'TRANSITIONS') {
                var chbw = ui.Checkbox(layer.name, layer.visible, null, false, styleChbLayers);
                listTransitionsChb.push(chbw);
                listTransitionsLegends.push(layer.legend);
                listTransitionsLayersNames.push(layer.name);
                chbw.onChange(function (checked) {
                    showLayer(layer.name, checked);
                    showFrontLayerLegend();
                    sldOpacity.setValue(1);
                });
                pnlTransitions.add(chbw);
            }
        });
        // default values on load // TODO
        pnlTransitions.widgets().get(1).setLabel(labels.lblLandCover + ' ' + defaultInitialLCYear);
        pnlTransitions.widgets().get(2).setLabel(labels.lblLandCover + ' ' + defaultFinalLCYear);
        pnlTransitions.widgets().get(3).setLabel(labels.lblGains + ' ' + defaultInitialLCYear + ' - ' + defaultFinalLCYear);
        pnlTransitions.widgets().get(4).setLabel(labels.lblLosses + ' ' + defaultInitialLCYear + ' - ' + defaultFinalLCYear);
        var btnTransitions = ui.Button({
            label: labels.lblLCTransitionAnalysis,
            style: { width: '90%', fontSize: '6px', color: 'green', fontWeight: 'normal' },
            onClick: function () {
                sldOpacity.setValue(1);
                // handle transitions panel
                pnlTransitions.style().set({ shown: !pnlTransitions.style().get('shown') });
                handleTransitionsLayersVis(pnlTransitions.style().get('shown'));
                // handle hotspots analysis panel
                pnlHotspots.style().set({ shown: false });
                showLayer(labels.lblHotspots, false);
                if (pnlCombinedLegend !== null) {
                    pnlCombinedLegend.style().set({
                        shown: false
                    });
                }
                // handle general layers panel
                if (pnlTransitions.style().get('shown')) {
                    unselectLayersPanelChecks();
                    map.setOptions('SATELLITE');
                }
                showFrontLayerLegend();
                handleChartsPanelsShown();
            },
        });
        pnlControl.add(btnTransitions).add(pnlTransitions);
        showFrontLayerLegend();
    }
    /** function to show the front layer legend (shows legend for first selected layer, from bottom to top, in order of apearence in left panel list) */
    var showFrontLayerLegend = function () {
        pnlFrontLayerLegend.clear();
        // from bottom to top, if transitions panel is open check first
        if (pnlTransitions.style().get('shown')) {
            for (var i = listTransitionsChb.length - 1; i >= 0; i--) {
                if (listTransitionsChb[i].getValue()) {
                    pnlFrontLayerLegend.widgets().set(0, listTransitionsLegends[i]);
                    return;
                }
            }
        }
        for (var i = listLayersChb.length - 1; i >= 0; i--) {
            if (listLayersChb[i].getValue() && listLayersLegends[i] !== null) {
                pnlFrontLayerLegend.widgets().set(0, listLayersLegends[i]);
                return;
            }
        }
    }
    /** Shows/hides layers checked in Transitions panel*/
    var handleTransitionsLayersVis = function (pShow) {
        listTransitionsChb.map(function (chbw, i) {
            if (chbw.getValue()) {
                showLayer(listTransitionsLayersNames[i], pShow);
            }
        });
    }
    /** Disables or enables checks in hotspots panel, invoked from calculate and reset buttons */
    var handleDisableHotspotsChecks = function (pDisable) {
        for (var p = 0; p < hotspotsEntries.length; p++) {
            var widgetsArray = pnlHotspots.widgets().get(p).widgets().getJsArray();
            for (var i = 1; i < widgetsArray.length; i++) { // 0=panel title
                widgetsArray[i].widgets().get(1).setDisabled(pDisable);
            }
        }
    }
    /**  Unchecks all layers in general layers panel, invoked when advanced panels are opened*/
    var unselectLayersPanelChecks = function () {
        listLayersChb.map(function (chb) {
            if (chb.getLabel() !== labels.lblProjectAreas && chb.getLabel() !== labels.lblDistricts) {
                chb.setValue(false);
            }
        });
    }
    // Opacity control
    var sldOpacity;
    var initControlPanelOpacity = function () {
        sldOpacity = ui.Slider({
            min: 0,
            max: 1,
            value: 1,
            step: 0.1,
        });
        sldOpacity.onSlide(function (value) {
            var layersArray = map.layers().getJsArray();
            var lastShown = null;
            for (var i = layersArray.length - 1; i >= 0; i--) {
                var l = layersArray[i];
                // find last non-vectorial layer that is shown
                if (lastShown === null
                    && l.getName() !== labels.lblDistricts
                    && l.getName() !== labels.lblProjectAreas
                    && l.getName() !== labels.lblSelectedAOI
                    && l.getShown()
                ) {
                    lastShown = map.layers().get(i);
                }
                map.layers().get(i).setOpacity(1);
            }
            if (lastShown !== null) {
                lastShown.setOpacity(value);
            }
        });
        var pnlSlider = ui.Panel({
            widgets: [ui.Label(labels.lblFrontLayerOpacity, { fontSize: '12px' }), sldOpacity],
            layout: ui.Panel.Layout.Flow('horizontal'),
        });
        pnlControl.add(pnlSlider);
    }
    var initControlPanelWelcome = function () {
        var imgLogo = ee.Image('users/projectgeffao/Pakistan/Logos_pakistan_v2').visualize({
            bands: ['b1', 'b2', 'b3'],
            min: 0,
            max: 255
        }).selfMask();
        var pnlWelcome = ui.Panel({
            style: {
                width: '40%',
            },
            widgets: [
                ui.Label({
                    value: labels.lblExpl1,
                    style: { fontSize: '12px' },
                }),
                ui.Panel(ui.Thumbnail({
                    image: imgLogo,
                    params: {
                        dimensions: '2265x601',
                        format: 'png'
                    },
                }), ui.Panel.Layout.Flow("vertical"), {}),
                ui.Label({
                    value:
                        labels.lblClickMoreInfo,
                    style: { fontSize: '12px' },
                }).setUrl(referenceDocUrl),
                ui.Label(labels.lblAppDeveloped, { fontSize: '12px' }),
                ui.Label(contactEmail, { fontSize: '12px' }).setUrl('mailto:' + contactEmail),
                ui.Button({
                    label: labels.lblClose,
                    onClick: function () {
                        pnlWelcome.style().set({ shown: !pnlWelcome.style().get('shown') });
                    },
                    disabled: false,
                    style: {
                        stretch: 'horizontal'
                    }
                }),
                ui.Label(labels.lblCloseWarning, { fontSize: '12px', color: 'grey', fontSize: '10px' }),
            ]
        });
        map.add(pnlWelcome);
        var btnMoreInfo = ui.Button({
            label: labels.lblInfo,
            onClick: function () {
                pnlWelcome.style().set({ shown: !pnlWelcome.style().get('shown') });
            },
        });
        pnlControl.add(btnMoreInfo);
    }
    var initControlPanelDrawing = function () {
        var paletteLayers = ['#9efba8', '#ff4848', '#ffb6fc', '#b797ff', '#6a5c5c', '#b3d2b6', '#06ffee', '#b63cff', '#ffffff']
        var updateCollection = function () {
            var names = [];
            map.drawingTools().layers().forEach(function (l) { return names.push(l.getName()) });
            var ftcDrawn = map.drawingTools().toFeatureCollection("layerId");
            ftcDrawn = ftcDrawn.map(function (f) {
                return f
                    .set("layerName", ee.List(names).get(f.get("layerId")))
                    .set("layerId", f.get("layerId"));
            });
            ftcDrawn.size().getInfo(function (size) {
                if (size > 0) {
                    lblJson.style().set('shown', true);
                    lblJson.setValue(labels.lblUpdating + '...').setUrl(null);
                    lblKml.style().set('shown', true);
                    lblKml.setValue(labels.lblUpdating + '...').setUrl(null);
                    ftcDrawn.getDownloadURL({
                        format: 'kml',
                        filename: labels.lblDownloadFileName,
                        callback: function (url) {
                            lblKml.setValue('.kml').setUrl(url);
                            lblKml.setUrl(url);
                        },
                    });
                    ftcDrawn.getDownloadURL({
                        format: 'json',
                        filename: labels.lblDownloadFileName,
                        callback: function (url) {
                            lblJson.setValue('.json').setUrl(url);
                            lblJson.setUrl(url);
                        },
                    });
                }
                else {
                    lblJson.style().set({ shown: false });
                    lblKml.style().set({ shown: false });
                }
            });
        };
        var drawingTools = ui.Map.DrawingTools();
        map.add(drawingTools);
        map.drawingTools().setDrawModes(['point', 'polygon', 'rectangle']);
        map.drawingTools().onDraw(updateCollection);
        map.drawingTools().onEdit(updateCollection);
        map.drawingTools().onErase(updateCollection);
        var btnDrawingTools = ui.Button({
            label: labels.lblDrawingTools + ' 📍',
            style: { width: '90%', fontWeight: 'normal' },
            onClick: function () {
                // handle drawing panel 
                pnlDrawing.style().set({ shown: !pnlDrawing.style().get('shown') });
                if (!pnlDrawing.style().get('shown')) {
                    map.drawingTools().stop();
                }
                map.drawingTools().setShown(pnlDrawing.style().get('shown'));
                map.drawingTools().layers().forEach(function (l) {
                    l.setShown(pnlDrawing.style().get('shown'));
                });
            },
        });
        pnlControl.add(btnDrawingTools);
        var lblJson = ui.Label({ style: { shown: false, fontSize: '12px' }, });
        var lblKml = ui.Label({ style: { shown: false, fontSize: '12px' }, });
        var pnlLinks = ui.Panel({
            widgets: [ui.Label('Links: ', { fontSize: '12px' }), lblJson, lblKml],
            layout: ui.Panel.Layout.Flow('horizontal'),
            style: { margin: '0px 5px' }
        });
        var txbLayerName = ui.Textbox('Layer name', '');
        txbLayerName.style().set({ width: '60%', fontSize: '12px' })
        var btnAddLayer = ui.Button({
            label: '+',
            onClick: function () {
                if (txbLayerName.getValue().trim() !== '') {
                    var gmlNewLayer = ui.Map.GeometryLayer({ geometries: null, name: txbLayerName.getValue(), color: paletteLayers[map.drawingTools().layers().length() % paletteLayers.length] });
                    drawingTools.layers().add(gmlNewLayer);
                    txbLayerName.setValue('');
                }
            },
        });
        var pnlFileName = ui.Panel({
            widgets: [txbLayerName, btnAddLayer],
            layout: ui.Panel.Layout.Flow('horizontal'),
            style: { margin: '0px 5px' }
        });
        var pnlDrawing = ui.Panel({
            widgets: [ui.Label({ value: labels.lblExplDrawing, style: { fontSize: '12px' } }),
                pnlFileName,
                pnlLinks],
            style: {
                border: '3px solid black',
                margin: '5px 5px',
                shown: false,
                width: '90%'
            },
        });
        pnlControl.add(pnlDrawing);
    };
    initControlPanelLayers();
    initControlPanelHotspots();
    initControlPanelTransitions();
    initControlPanelOpacity();
    initControlPanelDrawing();
    showFrontLayerLegend();
    initControlPanelWelcome();
}
/** */
function initOutputPanel(pnlOutput) {
    // Info panel
    var pnlInfo = ui.Panel({
        style: {
            padding: '8px 15px',
        },
    });
    var lblInfoPanellTitle = ui.Label({
        value: labels.lblSelectedAOI,
        style: { fontSize: '16px', fontWeight: 'bold', margin: '4px 0px' },
    });
    var styleInfo = { margin: '4px 0px', fontSize: '12px', whiteSpace: 'pre' };
    var styleHeaderInfo = { margin: '4px 0px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' };
    // Labels to show the info when asynchronous gets() return, in the meantime shows 'Loading...'
    infoEntries = {
        areaName: { lblHeader: ui.Label(labels.lblAreaName, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleHeaderInfo) },
        area: { lblHeader: ui.Label(labels.lblArea, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleInfo) },
        decProd: { lblHeader: ui.Label(labels.lblDecliningProductivity, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleInfo) },
        incProd: { lblHeader: ui.Label(labels.lblIncreasingProductivity, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleInfo) },
        socMean: { lblHeader: ui.Label(labels.lblSocMean, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleInfo) },
        socStock: { lblHeader: ui.Label(labels.lblSocSum, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleInfo) },
        protectedArea: { lblHeader: ui.Label(labels.lblProtectedArea, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleInfo) },
        kba: { lblHeader: ui.Label(labels.lblKeyBiodiversityArea, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleInfo) },
        mountain: { lblHeader: ui.Label(labels.lblMountainCoverage, styleHeaderInfo), lblValue: ui.Label(labels.lblLoading, styleInfo) },
    }
    pnlInfo.add(lblInfoPanellTitle);
    Object.keys(infoEntries).forEach(function (key) {
        var entry = ui.Panel({
            widgets: [infoEntries[key].lblHeader, infoEntries[key].lblValue],
            layout: ui.Panel.Layout.Flow('horizontal'),
        });
        pnlInfo.add(entry);
    });
    pnlInfo.setLayout(ui.Panel.Layout.flow('vertical'));
    pnlOutput.add(pnlInfo);
    // General charts panel
    pnlGeneralCharts = ui.Panel();
    pnlOutput.add(pnlGeneralCharts);
    // Hotspots charts panel
    pnlHotspotsCharts = ui.Panel();
    pnlOutput.add(pnlHotspotsCharts);
    // Transition charts panel
    pnlTransCharts = ui.Panel();
    pnlOutput.add(pnlTransCharts);
}
/** */
function initMapPanel(pnlMap) {
    pnlMap.add(map);
    map.setControlVisibility(true, false, true, true, true, true, false);
    // Map.setControlVisibility(all, layerList, zoomControl, scaleControl, mapTypeControl, fullscreenControl, drawingToolsControl)
    // add layers to map
    layerEntries.forEach(function (layer) {
        if (layer.group === 'AREAS') {
            map.addLayer(layer.image.style(layer.style), {}, layer.name, layer.visible);
        }
        else {
            map.addLayer(layer.image, layer.style, layer.name, layer.visible);
        }
    })
    map.add(pnlFrontLayerLegend);
    /* function to handle click on subbasins layer */
    var handleClickMap = function (coords) {
        map.widgets().remove(pnlCombinedLegend);
        ftcAoi = ftcProjects.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
        ftcAoi.size().getInfo(function (size) {
            if (size > 0) {
                selAoi.items().reset(namesAoi);
                showInfoSelectedAoi();
            } else {
                containerView();
            }
        });
    };
    map.onClick(handleClickMap);
    map.style().set('cursor', 'crosshair');
    var containerView = function () {
        selAoi.items().reset(namesAoi);
        ftcAoi = ftc1;
        map.centerObject(ftcAoi);
        showInfoSelectedAoi();
        clearCombinedLayerAndLegend();
    }
    var btnSelectContainer = ui.Button({
        label: labels.lblSelectContainer,
        style: {
            position: "bottom-right",
        },
        onClick: containerView,
    });
    map.add(btnSelectContainer);
    // Onload set first area in list selected 
    containerView();
}
/* function to set info panel values and charts for selected aoi, invoked on map click, on aoi selection change */
function showInfoSelectedAoi() {
    // Reset values with 'Loading' label while asynchronous call is made
    Object.keys(infoEntries).forEach(function (key) {
        infoEntries[key].lblValue.setValue(labels.lblLoading);
    });
    var selectedArea = ftcAoi.first();
    selectedArea.get('name').getInfo(function (pName) {
        infoEntries['areaName'].lblValue.setValue(pName);
    });
    selectedArea.get('areaHa').getInfo(function (pArea) {
        infoEntries['area'].lblValue.setValue(formatNumber(pArea) + ' ha.');
        selectedArea.get('lpd_1').getInfo(function (pValue1) {
            selectedArea.get('lpd_2').getInfo(function (pValue2) {
                var total = pValue1 + pValue2;
                var aux = pArea > 0 ? (total * 100 / pArea) : 0;
                infoEntries['decProd'].lblValue.setValue(formatNumber(total, 0) + ' ha. (' + aux.toFixed(1) + '%)');
            });
        });
        selectedArea.get('lpd_5').getInfo(function (pValue) {
            var aux = pArea > 0 ? (pValue * 100 / pArea) : 0;
            infoEntries['incProd'].lblValue.setValue(formatNumber(pValue, 0) + ' ha. (' + aux.toFixed(1) + '%)');
        });
        selectedArea.get('ProtectedArea_Ha').getInfo(function (pValue) {
            var aux = pArea > 0 ? (pValue * 100 / pArea) : 0;
            infoEntries['protectedArea'].lblValue.setValue(formatNumber(pValue, 0) + " ha. (" + aux.toFixed(1) + "%)");
        });
        selectedArea.get('KBA_Ha').getInfo(function (pValue) {
            var aux = pArea > 0 ? (pValue * 100 / pArea) : 0;
            infoEntries['kba'].lblValue.setValue(formatNumber(pValue, 0) + " ha. (" + aux.toFixed(1) + "%)");
        });
        selectedArea.get('monBin_1').getInfo(function (pValue) {
            var aux = pArea > 0 ? (pValue * 100 / pArea) : 0;
            infoEntries['mountain'].lblValue.setValue(formatNumber(pValue, 0) + " ha. (" + aux.toFixed(1) + "%)");
        });
    });
    selectedArea.get('gsoc_sum').getInfo(function (pValue) {
        infoEntries['socStock'].lblValue.setValue(formatNumber(pValue, 0) + ' tonnes');
    });
    selectedArea.get('gsoc_mean').getInfo(function (pValue) {
        infoEntries['socMean'].lblValue.setValue(pValue.toFixed(2) + ' tonnes/ha.');
    });
    map.centerObject(ftcAoi);
    var lyrSelectedAoi = ui.Map.Layer(ftcAoi.style(vis.highlight), {}, labels.lblSelectedAOI);
    map.layers().set(layerEntries.length, lyrSelectedAoi);
    // show only charts related to opened panel on the left
    handleChartsPanelsShown();
    // generate all charts for selected area
    setupGeneralCharts(pnlGeneralCharts, defaultFinalLCYear);
    setupHotspotsCharts(pnlHotspotsCharts, defaultFinalLCYear);
    setupTransitionsCharts(pnlTransCharts, selLCFromYears.getValue(), defaultFinalLCYear);
    // generate combined raster for selected area
    if (atLeastOneCategoryChecked()) {
        hotspots();
    }
}
/** function to handle which charts are shown in the right panel */
function handleChartsPanelsShown() {
    pnlTransCharts.style().set({ shown: (pnlTransitions.style().get('shown') ? true : false) });
    pnlHotspotsCharts.style().set({ shown: (pnlHotspots.style().get('shown') ? true : false) });
    pnlGeneralCharts.style().set({
        shown: (!pnlTransitions.style().get('shown') &&
            !pnlHotspots.style().get('shown') ? true : false)
    });
}
/** Shows or hides specified layer in map */
function showLayer(pName, pShown) {
    var i = namesLayers.indexOf(pName);
    if (namesLayers.indexOf(pName) >= 0) {
        map.layers().get(i).setShown(pShown);
    }
}
/** Creates a new image layer and calculate area considering categories selected in hotspots panel*/
function hotspots() {
    clearCombinedLayerAndLegend();
    var totalArea = 0;
    imgCustom = ee.Image(0).selfMask();
    // Function to calculate total area from precalculated asset
    var getSumAreas = function (categories, prefix, posfix) {
        var sum = ee.Number(0);
        categories.forEach(function (c) {
            sum = sum.add(ftcAoi.first().get(prefix + c + posfix));
        });
        return sum;
    }
    // Function to filter image with categories parameter
    var getFilteredImage = function (image, categories) {
        var imgFiltered = image.clip(ftcAoi).eq(parseInt(categories[0]));
        for (var i = 1; i < categories.length; i++) {
            imgFiltered = imgFiltered.or(image.eq(parseInt(categories[i])));
        }
        return imgFiltered.selfMask();
    }
    // Foreach section panel in hotspots panel check which categories are selected
    var selectedPerSection = [];
    pnlHotspots.widgets().forEach(function (panel, panelIndex) {
        if (panelIndex < hotspotsEntries.length) {
            var selectedCatNumbers = [];
            panel.widgets().forEach(function (element, index) {
                if (index > 0) { // title
                    if (element.widgets().get(1).getValue()) {
                        var index = hotspotsEntries[panelIndex].names.indexOf(element.widgets().get(1).getLabel());
                        selectedCatNumbers.push(hotspotsEntries[panelIndex].categories[index]);
                    }
                }
            });
            selectedPerSection.push(selectedCatNumbers);
        }
    });
    // Check if combined or single image will be used: if categories from more than one section are selected then combined image will be used
    // if returns -1 use combined image, else use single image in index=sectionIndex;
    var sectionIndex = -1;
    for (var index = 0; index < selectedPerSection.length; index++) {
        if (selectedPerSection[index].length > 0) {
            if (sectionIndex === -1) {
                sectionIndex = index;
            }
            else {
                sectionIndex = -1;// categories from more than one section selected
                break;
            }
        }
    }
    if (sectionIndex === -1) {// use combined image           
        var catNumbers = [];
        var combinedCatNames = [];
        var aux = [];
        // check empty section
        selectedPerSection.forEach(function (a, i) {
            if (a.length > 0) {
                aux.push(a); // selected categories in section
            }
            else {// none selected so use all categories
                var all = hotspotsEntries[i].categories;
                if (hotspotsEntries[i].addZeroCategory) {
                    all = hotspotsEntries[i].categories.map(function (x) { return x; });
                    all.push(0);
                }
                aux.push(all);
            }
        });
        var combineCategories = function (aux, sectionIndex, concat) {
            aux[sectionIndex].forEach(function (element) {
                if (sectionIndex === aux.length - 1) {
                    catNumbers.push(concat + element);
                }
                else {
                    combineCategories(aux, sectionIndex + 1, concat + element);
                }
            });
        }
        combineCategories(aux, 0, "");
        // Calculate image        
        imgCustom = getFilteredImage(imgCombined3, catNumbers);
        // For area calulation setup precalculated area columns names 
        catNumbers.forEach(function (element) {
            var s = element[0];
            for (var i = 1; i < element.length; i++) {
                s = s + '_' + element[i];
            }
            combinedCatNames.push(s);
        });
        totalArea = getSumAreas(combinedCatNames, '', '');
    }
    else {
        // Calculate raster and area with single image
        imgCustom = getFilteredImage(hotspotsEntries[sectionIndex].image, selectedPerSection[sectionIndex]);
        totalArea = getSumAreas(selectedPerSection[sectionIndex], hotspotsEntries[sectionIndex].prefix, hotspotsEntries[sectionIndex].sufix);
    }
    // Compute area sum, when ready set title with total ha and try to create url to download image
    totalArea.getInfo(function (t) {
        var legendTitle = labels.lblHotspots + ' ' + formatNumber(t, 0) + ' ha.';
        setupCombined(imgCustom, legendTitle, labels.lblCombinedCategoriesArea, false);
    })
}
/** Creates combined layer from pImage adding legend to map panel, invoked from hotspots()  and combined chart click */
function setupCombined(pImage, pLegendTitle, pLegendText, pFromChart) {
    pnlCombinedLegend = ui.Panel();
    if (pFromChart) { // if invoked from chart add checkbox to show/hide layer
        var chbCombined = ui.Checkbox(pLegendTitle, true, null, false, { margin: '1px 0px', fontSize: '12px', fontWeight: 'bold' });
        chbCombined.onChange(function (checked) {
            showLayer(labels.lblHotspots, checked);
        });
        pnlCombinedLegend.add(chbCombined);
    }
    else {
        pnlCombinedLegend.add(ui.Label(pLegendTitle, { margin: '1px 0px', fontSize: '12px', fontWeight: 'bold' }));
    }
    pnlCombinedLegend.add(mdlLegends.createCatRow(vis.custom.palette[0], pLegendText, false));
    pnlCombinedLegend.style().set({
        position: 'bottom-center'
    });
    var options = { region: ftcAoi.geometry(), name: pLegendText };
    pImage.getDownloadURL(options, function (url) {
        var lblDownloadText = ui.Label({
            value: labels.lblDownload,
            style: {
                fontSize: '12px',
                margin: '1px 1px 4px 1px',
                padding: '2px',
            },
        });
        if (url !== null) {
            lblDownloadText.setUrl(url);
        }
        else {
            lblDownloadText.setValue(labels.lblBigImage);
        }
        pnlCombinedLegend.add(lblDownloadText);
    });
    // TODO check if desired behaviour: combined layer is always generated but only shown if hotspots panel is opened 
    var showLyrCombined = true;
    if (!pFromChart && !pnlHotspots.style().get('shown')) {
        // hide legend and map
        pnlCombinedLegend.style().set({
            shown: false,
        });
        showLyrCombined = false;
    }
    map.setOptions('SATELLITE');
    map.widgets().add(pnlCombinedLegend);
    lyrCombined = ui.Map.Layer(pImage, vis.custom, labels.lblHotspots);
    map.layers().set(namesLayers.indexOf(labels.lblHotspots), lyrCombined, showLyrCombined);
}
/** Removes combined legend widget from map panel and resets combined image*/
function clearCombinedLayerAndLegend() {
    if (pnlCombinedLegend !== null) {
        map.widgets().remove(pnlCombinedLegend);
    }
    if (lyrCombined !== null) {
        lyrCombined = ui.Map.Layer(ee.Image(0).selfMask(), {}, labels.lblHotspots);
        map.layers().set(namesLayers.indexOf(labels.lblHotspots), lyrCombined);
    }
}
/** Returns true if at least one category in hotspots is checked*/
function atLeastOneCategoryChecked() {
    for (var p = 0; p < hotspotsEntries.length; p++) {
        var widgetsArray = pnlHotspots.widgets().get(p).widgets().getJsArray();
        for (var i = 1; i < widgetsArray.length; i++) { // 0=panel title
            if (widgetsArray[i].widgets().get(1).getValue()) { // 0=color box
                return true;
            }
        }
    }
    return false;
}
/** */
function createChartPanel(pContainer) {
    var pnlChart = ui.Panel();
    pContainer.add(pnlChart);
    return pnlChart;
}
/** */
function formatNumber(pNumber, pFixed) {
    return pNumber.toFixed(pFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
/** */
function setupGeneralCharts(pPnlContainer, pLCFinalYear) {
    pPnlContainer.clear();
    pPnlContainer.add(ui.Label({
        value: labels.lblGeneralCharts,
        style: { fontSize: '16px', fontWeight: 'bold', margin: '4px 15px' },
    }));
    //  LAND COVER PIE CHART       
    if (true) {
        var lstFeatLC = namesLCColumns.map(function (pName, i) {
            var lstValues = ee.List([namesLC[i], ftcAoi.first().get(pName + '_' + pLCFinalYear)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLC = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsLC = {
            title: labels.lblLandCover + ' ' + pLCFinalYear,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: vis.lc.palette,
        };
        createChart(lstHeaderLC.cat(ee.FeatureCollection(lstFeatLC).aggregate_array('row')), optionsLC, 'PieChart', createChartPanel(pPnlContainer));
    }
    //  LPD PIE CHART
    if (true) {
        var lstFeatLPD = namesLPDColumns.map(function (pName, i) {
            var lstValues = ee.List([namesLPD[i], ftcAoi.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLPD = ee.List([
            [
                { label: 'LPD', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsLPD = {
            title: labels.lblLandProductivityDynamics,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: vis.lpd.palette,
        };
        createChart(lstHeaderLPD.cat(ee.FeatureCollection(lstFeatLPD).aggregate_array('row')), optionsLPD, 'PieChart', createChartPanel(pPnlContainer));
    }
    //  NDVI
    if (true) {
        // NDVI monthly values
        var chtNdviByMonthYear = ui.Chart.image.series(mdlNdvi.byMonthYear, ftcAoi, ee.Reducer.mean(), 250);
        chtNdviByMonthYear.setOptions({
            title: labels.lblMonthlyNDVI,
            vAxis: { title: 'NDVI x 10000' },
            hAxis: { title: labels.lblCalendarYear, format: 'yyyy', gridlines: { count: 7 } },
        });
        createChartPanel(pPnlContainer).add(chtNdviByMonthYear);
        //  NDVI anual mean
        var chtNdviByYear = ui.Chart.image.series({
            imageCollection: mdlNdvi.byYear.select('AM'),
            region: ftcAoi,
            reducer: ee.Reducer.mean(),
            scale: 250,
        });
        chtNdviByYear.setOptions({
            title: labels.lblAnnualNDVI,
            vAxis: { title: 'NDVI x 10000' },
            hAxis: { title: labels.lblYear, format: 'yyyy', gridlines: { count: 7 } },
        });
        createChartPanel(pPnlContainer).add(chtNdviByYear);
    }
}
function setupHotspotsCharts(pPnlContainer, pLCFinalYear) {
    pPnlContainer.clear();
    pPnlContainer.add(ui.Label({
        value: labels.lblHotspotsCharts,
        style: { fontSize: '16px', fontWeight: 'bold', margin: '4px 15px' },
    }));
    var catsLCNoWater = [1, 2, 3, 4, 5, 6];
    var catsLPD = [1, 2, 3, 4, 5];
    //  COMBINED 1: LPD BY LAND COVER
    if (true) {
        var handleClickFromChart = function (xValue, yValue, seriesName) {
            clearCombinedLayerAndLegend();
            if (xValue) { // lpdxlc
                var catLC = namesLC.indexOf(xValue) + 1;
                var catLPD = namesLPD.indexOf(seriesName) + 1;
                var catCombined = parseInt('' + catLC + catLPD);
                var imgSelection = imgCombined2.clip(ftcAoi).eq(catCombined).selfMask();
                var legendTitle = 'From chart: ' + labels.lblCombinedCategoriesArea + formatNumber(yValue, 0) + ' ha.';
                var legendText = 'LC: ' + xValue + ' - LPD: ' + seriesName;
                // Reset selection from Hotspots Analysis panel if any
                handleClickReset();
                // Create and show combined layer and legend
                setupCombined(imgSelection, legendTitle, legendText, true);
            }
        };
        var lstFeatCombinedLC = catsLCNoWater.map(function (i) {
            var v1 = ftcAoi.first().get(i + '_1');
            var v2 = ftcAoi.first().get(i + '_2');
            var v3 = ftcAoi.first().get(i + '_3');
            var v4 = ftcAoi.first().get(i + '_4');
            var v5 = ftcAoi.first().get(i + '_5');
            var lstValues = ee.List([namesLC[i - 1], v1, v2, v3, v4, v5]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderC1 = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: namesLPD[0], role: 'data', type: 'number' },
                { label: namesLPD[1], role: 'data', type: 'number' },
                { label: namesLPD[2], role: 'data', type: 'number' },
                { label: namesLPD[3], role: 'data', type: 'number' },
                { label: namesLPD[4], role: 'data', type: 'number' },
            ],
        ]);
        // Absolute
        /*var optionsC1Abs = {
            title: labels.lblLPDperLC,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'absolute',
            colors: vis.lpd.palette,
        };
        createChart(fcCombinedLC, lstHeaderC1, optionsC1Abs, 'BarChart', createChartPanel(pPnlContainer));*/
        // Relative
        var optionsC1Rel = {
            title: labels.lblLPDperLC,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'relative',
            colors: vis.lpd.palette,
        };
        createChart(lstHeaderC1.cat(ee.FeatureCollection(lstFeatCombinedLC).aggregate_array('row')), optionsC1Rel, 'BarChart', createChartPanel(pPnlContainer), handleClickFromChart);
    }
    //  COMBINED 2: LAND COVER BY LPD      
    if (false) {
        var lstFeatCombinedLPD = catsLPD.map(function (i) {
            var v1 = ftcAoi.first().get('1_' + i);
            var v2 = ftcAoi.first().get('2_' + i);
            var v3 = ftcAoi.first().get('3_' + i);
            var v4 = ftcAoi.first().get('4_' + i);
            var v5 = ftcAoi.first().get('5_' + i);
            var v6 = ftcAoi.first().get('6_' + i);
            var lstValues = ee.List([namesLPD[i - 1], v1, v2, v3, v4, v5, v6]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderC2 = ee.List([
            [
                { label: 'LPD', role: 'domain', type: 'string' },
                { label: namesLC[0], role: 'data', type: 'number' },
                { label: namesLC[1], role: 'data', type: 'number' },
                { label: namesLC[2], role: 'data', type: 'number' },
                { label: namesLC[3], role: 'data', type: 'number' },
                { label: namesLC[4], role: 'data', type: 'number' },
                { label: namesLC[5], role: 'data', type: 'number' },
            ],
        ]);
        // Absolute
        var optionsC2Abs = {
            title: labels.lblLCperLPD + ' - ' + labels.lblAbsolute,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'absolute',
            colors: vis.lc.palette,
        };
        createChart(lstHeaderC2.cat(ee.FeatureCollection(lstFeatCombinedLPD).aggregate_array('row')), optionsC2Abs, 'BarChart', createChartPanel(pPnlContainer));
        // Relative
        var optionsC2Rel = {
            title: labels.lblLCperLPD + ' - ' + labels.lblRelative,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'relative',
            colors: vis.lc.palette,
        };
        createChart(lstHeaderC2.cat(ee.FeatureCollection(lstFeatCombinedLPD).aggregate_array('row')), optionsC2Rel, 'BarChart', createChartPanel(pPnlContainer));
    }
    //  SOC by LPD
    if (true) {
        var lstFeatSOCbyLPD = catsLPD.map(function (i) {
            var mean = ftcAoi.first().get('gsoc_mean_lpd_' + i);
            var lstValues = ee.List([namesLPD[i - 1], mean, vis.lpd.palette[i - 1]]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderSOCbyLPD = ee.List([
            [
                { label: 'LPD', role: 'domain', type: 'string' },
                { label: 'SOC mean', role: 'data', type: 'number' },
                { label: 'color', role: 'style', type: 'string' },
            ],
        ]);
        var optionsSOCbyLPD = {
            title: labels.lblSOCperLPD,
            legend: { position: 'none' },
        };
        createChart(lstHeaderSOCbyLPD.cat(ee.FeatureCollection(lstFeatSOCbyLPD).aggregate_array('row')), optionsSOCbyLPD, 'ColumnChart', createChartPanel(pPnlContainer));
    }
    //SOC by LC        
    if (true) {
        var lstFeatSOCbyLC = catsLCNoWater.map(function (i) {
            var mean = ftcAoi.first().get('gsoc_mean_lc_' + i);
            var lstValues = ee.List([namesLC[i - 1], mean, vis.lc.palette[i - 1]]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderSOCbyLC = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: 'SOC mean', role: 'data', type: 'number' },
                { label: 'color', role: 'style', type: 'string' },
            ],
        ]);
        var optionsSOCbyLC = {
            title: labels.lblSOCperLC,
            legend: { position: 'none' },
        };
        createChart(lstHeaderSOCbyLC.cat(ee.FeatureCollection(lstFeatSOCbyLC).aggregate_array('row')), optionsSOCbyLC, 'ColumnChart', createChartPanel(pPnlContainer));
    }
    // SOC combochart
    if (true) {
        var lstFeatComboChart = catsLCNoWater.map(function (i) {
            // GSOC_mean_lc_x_lpd_y
            var v1 = ftcAoi.first().get('gsoc_mean_lc_' + i + '_lpd_1');
            var v2 = ftcAoi.first().get('gsoc_mean_lc_' + i + '_lpd_2');
            var v3 = ftcAoi.first().get('gsoc_mean_lc_' + i + '_lpd_3');
            var v4 = ftcAoi.first().get('gsoc_mean_lc_' + i + '_lpd_4');
            var v5 = ftcAoi.first().get('gsoc_mean_lc_' + i + '_lpd_5');
            var l = ee.List([v1, v2, v3, v4, v5]);
            var mean = ee.Number(l.reduce(ee.Reducer.sum())).divide(5);
            var lstValues = ee.List([namesLC[i - 1], v1, v2, v3, v4, v5, mean]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderComboChart = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: namesLPD[0], role: 'data', type: 'number' },
                { label: namesLPD[1], role: 'data', type: 'number' },
                { label: namesLPD[2], role: 'data', type: 'number' },
                { label: namesLPD[3], role: 'data', type: 'number' },
                { label: namesLPD[4], role: 'data', type: 'number' },
                { label: 'SOC mean per LC', role: 'data', type: 'number' },
            ],
        ]);
        var optionsComboChart = {
            title: labels.lblSOCperLCLPD,
            width: 600,
            height: 400,
            legend: { position: 'top' },
            seriesType: 'bars',
            colors: vis.lpd.palette,
            series: { 5: { type: 'line', color: 'blue' } },
        };
        createChart(lstHeaderComboChart.cat(ee.FeatureCollection(lstFeatComboChart).aggregate_array('row')), optionsComboChart, 'ColumnChart', createChartPanel(pPnlContainer));
    }
    // Table with LPD ha per LC
    if (true) {
        var catsLC = [1, 2, 3, 4, 5, 6, 7];
        var catsLPD = [1, 2, 3, 4, 5];
        var lstFeatLCLPDTable = catsLC.map(function (i) {
            var values = catsLPD.map(function (c) {
                return ee.Number(ftcAoi.first().get(i + '_' + c)).format('%.0f');
            });
            var lstValues = ee.List([namesLC[i - 1]]).cat(values);
            return ee.Feature(null, { row: lstValues });
        });
        var colsT2 = [{ label: labels.lblLC + pLCFinalYear + '/' + labels.lblLPD, role: 'domain', type: 'string' }];
        namesLPD.forEach(function (lpd) {
            colsT2.push({ label: lpd, role: 'data', type: 'number' });
        });
        var lstHeaderLCLPDTable = ee.List([colsT2]);
        var optionsLCTLPDTable = {
            title: labels.lblTableLCLPD,
            initial: pLCFinalYear,
            final: pLCFinalYear,
            html: true,
            frozenColumns: 1,
        };
        createChart(lstHeaderLCLPDTable.cat(ee.FeatureCollection(lstFeatLCLPDTable).aggregate_array('row')), optionsLCTLPDTable, 'Table', createChartPanel(pPnlContainer));
    }
}
/** */
function setupTransitionsCharts(pPnlContainer, pInitialYear, pLCFinalYear) {
    pPnlContainer.clear();
    pPnlContainer.add(ui.Label({
        value: labels.lblTransitionsCharts,
        style: { fontSize: '16px', fontWeight: 'bold', margin: '4px 15px' },
    }));
    // chartTrans1  LC COMPARISON  CHART
    if (false) {
        var lstFeatLCTrans = namesLCColumns.map(function (pName, i) {
            var initialValue = ftcAoi.first().get(pName + '_' + pInitialYear);
            var finalValue = ftcAoi.first().get(pName + '_' + pLCFinalYear);
            var lstValues = ee.List([namesLC[i], initialValue, finalValue]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLCTrans = ee.List([[
            { label: 'LC', role: 'domain', type: 'string' },
            { label: '2009', role: 'old-data', type: 'number' },
            { label: pLCFinalYear, role: 'data', type: 'number' }
        ]]);
        var optionsLCTrans = {
            title: labels.lblLCPieChartChange + ' ' + pInitialYear + ' - ' + pLCFinalYear,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: vis.lc.palette,
            diff: {
                oldData: {
                    opacity: 0.7,
                    tooltip: {
                        prefix: pInitialYear + ':'
                    }
                },
                newData: {
                    opacity: 1,
                    tooltip: {
                        prefix: pLCFinalYear + ':'
                    }
                }
            }
        };
        createChart(lstHeaderLCTrans.cat(ee.FeatureCollection(lstFeatLCTrans).aggregate_array('row')), optionsLCTrans, 'PieChart', createChartPanel(pPnlContainer));
    }
    // chartTrans1 Comparison column chart LC
    if (true) {
        var lstFeatLCCombo = namesLCColumns.map(function (pName, i) {
            var initialValue = ftcAoi.first().get(pName + '_' + pInitialYear);
            var finalValue = ftcAoi.first().get(pName + '_' + pLCFinalYear);
            var s = 'bar {fill-color:' + vis.lc.palette[i] + '; stroke-width: 0.5; stroke-color: #000000}';
            var lstValues = ee.List([namesLC[i], initialValue, s, finalValue, s]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLCCombo = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: pInitialYear, role: 'data', type: 'number' },
                { label: 'color1', role: 'style', type: 'string' },
                { label: pLCFinalYear, role: 'data', type: 'number' },
                { label: 'color2', role: 'style', type: 'string' },
            ],
        ]);
        var optionsLCCombo = {
            title: labels.lblLCPieChartChange + ' ' + pInitialYear + ' - ' + pLCFinalYear,
            width: 600,
            height: 400,
            legend: { position: 'none' },
            seriesType: 'bars',
        };
        createChart(lstHeaderLCCombo.cat(ee.FeatureCollection(lstFeatLCCombo).aggregate_array('row')), optionsLCCombo, 'ColumnChart', createChartPanel(pPnlContainer));
    }
    // charTrans2 LC CANDLESTICK NET GAIN/LOSS CHART
    if (true) {
        var lstFeatLCNetChange = namesLCColumns.map(function (pName, i) {
            var initialValue = ftcAoi.first().get(pName + '_' + pInitialYear);
            var finalValue = ftcAoi.first().get(pName + '_' + pLCFinalYear);
            var diff = ee.Number(finalValue).subtract(ee.Number(initialValue)).format('%,.1f');
            var tt = ee.String(labels.lblDifference + ' (ha): ').cat(diff);
            var lstValues = ee.List([namesLC[i], initialValue, initialValue, finalValue, finalValue, tt]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLCNetChange = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: 'Low', role: 'data', type: 'number' },
                { label: 'Open', role: 'data', type: 'number' },
                { label: 'Close', role: 'data', type: 'number' },
                { label: 'Final', role: 'data', type: 'number' },
                { role: 'tooltip', p: { html: true } }
            ],
        ]);
        var optionsLCNetChange = {
            title: labels.lblNetLCChanges + ' ' + pInitialYear + ' - ' + pLCFinalYear,
            legend: { position: 'none' },
            bar: { groupWidth: '100%' },
            //aggregationTarget: 'category',
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            }
        };
        createChart(lstHeaderLCNetChange.cat(ee.FeatureCollection(lstFeatLCNetChange).aggregate_array('row')), optionsLCNetChange, 'CandlestickChart', createChartPanel(pPnlContainer));
    }
    var catsLC = [1, 2, 3, 4, 5, 6, 7];
    // chartTrans3 Table with transitions LC/LC
    if (true) {
        var lstFeatLCTransTable = catsLC.map(function (i) {
            var transition = 'lc_trans_' + pInitialYear + '_' + pLCFinalYear + '_' + i;
            var values = catsLC.map(function (c) {
                return ee.Number(ftcAoi.first().get(transition + c)).format('%.0f');
            });
            var lstValues = ee.List([namesLC[i - 1]]).cat(values);
            return ee.Feature(null, { row: lstValues });
        });
        var colsT1 = [{ label: pInitialYear + '/' + pLCFinalYear, role: 'domain', type: 'string' }];
        namesLC.forEach(function (lc) {
            colsT1.push({ label: lc, role: 'data', type: 'number' });
        });
        var lstHeaderLCTransTable = ee.List([colsT1]);
        var optionsLCTransTable = {
            title: labels.lblTableLC,
            initial: pInitialYear,
            final: pLCFinalYear,
            html: true,
            frozenColumns: 1,
        };
        createChart(lstHeaderLCTransTable.cat(ee.FeatureCollection(lstFeatLCTransTable).aggregate_array('row')), optionsLCTransTable, 'Table', createChartPanel(pPnlContainer));
    }
}
/*   */
function createChart(
    pChartDataTable,
    pOptions,
    pChartType,
    pPanel,
    pOnClick
) {
    // until chart is rendered, display 'Generating chart x' message
    pPanel.widgets().set(0,
        ui.Label({
            value: labels.lblGeneratingCharts + pOptions.title + '...',
            style: { color: 'gray', fontSize: '12px' },
        })
    );
    pChartDataTable.evaluate(function (pDataTable) {
        var chart = ui
            .Chart(pDataTable)
            .setChartType(pChartType)
            .setOptions(pOptions);
        if (typeof pOnClick !== 'undefined')
            chart.onClick(pOnClick);
        if (pChartType === 'Table') {
            var header = pDataTable[0];
            var cols = [];
            var suffixFinalYear = '';
            if (pOptions.title === labels.lblTableLC) {
                suffixFinalYear = '_' + pOptions.final;
            }
            for (var c = 0; c < header.length; c++) {
                cols.push(c === 0 ? ' ' + header[c].label : c + '_' + header[c].label + suffixFinalYear)
            }
            cols.push(header.length + '_Total');
            var list = ee.List([]);
            for (var index = 1; index < pDataTable.length; index++) {// values
                var element = pDataTable[index];
                var f = ee.Feature(null);
                var rowTotal = 0;
                for (var j = 0; j < element.length; j++) {
                    var value = element[j];
                    if (j === 0) {
                        value = value + '_' + pOptions.initial
                        f = f.set(cols[j], value);
                    }
                    else {
                        rowTotal = rowTotal + parseInt(value);
                        f = f.set(cols[j], parseInt(value));
                    }
                }
                f = f.set(header.length + '_Total', rowTotal);
                list = list.add(f);
            }
            // new feature for columns totals
            var fSum = ee.Feature(null).set(cols[0], 'Total');
            var ftcList = ee.FeatureCollection(list);
            var sumColumns = ftcList.reduceColumns({
                reducer: ee.Reducer.sum().repeat(cols.length - 1),
                selectors: cols.slice(1), // not first column (cat name)
            });
            sumColumns.get('sum').getInfo(
                function (sumsList) {
                    for (c = 1; c < cols.length; c++) {
                        fSum = fSum.set(cols[c], sumsList[c - 1]);
                    }
                    list = list.add(fSum);
                    pPanel.widgets().set(0, ui.Label(pOptions.title, { margin: '40px 10px 10px 10px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' }));
                    pPanel.widgets().set(1, chart);
                    pPanel.widgets().set(2, ui.Label(labels.lblDownloadCsv, { fontSize: '12px' }).setUrl(ee.FeatureCollection(list).getDownloadURL({ format: 'CSV', filename: 'TableData', selectors: cols })));
                }
            );
        }
        else {
            pPanel.widgets().set(0, chart); // replace 'Generating...' label with chart
        }
    });
}
initApp(mdlLocalization.languages[0]);