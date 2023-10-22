var imgSoc = ui.import && ui.import("imgSoc", "image", {
      "id": "users/projectgeffao/Turkey/Karbon_Map_UpperSakarya"
    }) || ee.Image("users/projectgeffao/Turkey/Karbon_Map_UpperSakarya"),
    imgLpd = ui.import && ui.import("imgLpd", "image", {
      "id": "users/projectgeffao/Turkey/LPD_world_2001_2020_Turkey"
    }) || ee.Image("users/projectgeffao/Turkey/LPD_world_2001_2020_Turkey"),
    imgCombined2 = ui.import && ui.import("imgCombined2", "image", {
      "id": "users/projectgeffao/World/CORINE_LC2018x10_plus_LPD2020_world"
    }) || ee.Image("users/projectgeffao/World/CORINE_LC2018x10_plus_LPD2020_world"),
    imgTransitions = ui.import && ui.import("imgTransitions", "image", {
      "id": "users/projectgeffao/World/CORINE_LC_Transitions_World"
    }) || ee.Image("users/projectgeffao/World/CORINE_LC_Transitions_World"),
    imgElevation = ui.import && ui.import("imgElevation", "image", {
      "id": "users/projectgeffao/Turkey/Terrain_rgb_Upper"
    }) || ee.Image("users/projectgeffao/Turkey/Terrain_rgb_Upper"),
    imgLcAll = ui.import && ui.import("imgLcAll", "image", {
      "id": "users/projectgeffao/World/CORINE_LC_all_1990_2018_UNCCD_CAT_World"
    }) || ee.Image("users/projectgeffao/World/CORINE_LC_all_1990_2018_UNCCD_CAT_World"),
    imgNpp = ui.import && ui.import("imgNpp", "image", {
      "id": "users/projectgeffao/Turkey/npp_sakarya_toplam2_16bit_V2"
    }) || ee.Image("users/projectgeffao/Turkey/npp_sakarya_toplam2_16bit_V2"),
    imgErosion = ui.import && ui.import("imgErosion", "image", {
      "id": "users/projectgeffao/Turkey/ErozionUTM_byte_5Categories"
    }) || ee.Image("users/projectgeffao/Turkey/ErozionUTM_byte_5Categories"),
    imgCombined3 = ui.import && ui.import("imgCombined3", "image", {
      "id": "users/projectgeffao/Turkey/Combined_cor100_lpd10_tok1_UpSa"
    }) || ee.Image("users/projectgeffao/Turkey/Combined_cor100_lpd10_tok1_UpSa"),
    imgSocCat = ui.import && ui.import("imgSocCat", "image", {
      "id": "users/projectgeffao/Turkey/TOK_6Categories_UpperSakayra"
    }) || ee.Image("users/projectgeffao/Turkey/TOK_6Categories_UpperSakayra"),
    ftcMicrobasins = ui.import && ui.import("ftcMicrobasins", "table", {
      "id": "users/projectgeffao/Turkey/PreCalUpperSakaryaMicrobasins_v4_Fix"
    }) || ee.FeatureCollection("users/projectgeffao/Turkey/PreCalUpperSakaryaMicrobasins_v4_Fix"),
    ftcSubbasins = ui.import && ui.import("ftcSubbasins", "table", {
      "id": "users/projectgeffao/Turkey/PreCalUpperSakaryaSubBasins_v4_Fix"
    }) || ee.FeatureCollection("users/projectgeffao/Turkey/PreCalUpperSakaryaSubBasins_v4_Fix");
// Authors for this App are:
// Ingrid Teich - ingridteich@gmail.com
// Eugenia Raviolo - eugenia.raviolo@gmail.com
// Cesar Garcia - cesarnon@gmail.com 
/** Modules */
var mdlLegends = require('users/projectgeffao/modules:legends.js');
var mdlNdvi = require('users/projectgeffao/modules:ndvi.js');
var mdlLocalization = require('users/projectgeffao/Turkey:Apps/localization.js');
var palettes = require('users/gena/packages:palettes');
/** Global variables */
// Clip from world images to container
var containerName = 'Upper Sakarya';
var ftcContainer = ftcMicrobasins.filter(ee.Filter.eq('name', containerName));
imgTransitions = imgTransitions.clip(ftcContainer);//.selfMask(); // 0s in no change transitions
imgSoc = imgSoc.unmask().clip(ftcContainer);
imgLpd = imgLpd.clip(ftcContainer);
imgCombined2 = imgCombined2.clip(ftcContainer);
// Used in hotspots analysis for custom categories combination 
var imgCustom = ee.Image(0).selfMask();
//var vis = mdlVis.vis;
var defaultInitialLCYear = '1990';
var defaultFinalLCYear = '2018';
var lcInitialYears = ['1990', '2000', '2006', '2012'];
var ftcAoi = null; // holds selected area feature 
// Select items (areas of interest names)
var namesAoi = ftcMicrobasins.reduceColumns(ee.Reducer.toList(), ['name']).get('list').getInfo();
namesAoi = namesAoi.slice().reverse();
var labels; // holds localized labels dictionary for language selected
var layerEntries; // configuration for loading layers panels on the left panel
var namesLayers; // array with layers names only (from layers entries)
var hotspotsEntries; // configuration for loading sections in hotspots panel 
// Categories names arrays, used in legends and charts (localized on init)
var namesLC;
var namesLCTransitions;
var namesLPD;
var namesErosion;
var namesSoc;
// Visualization 
var paletteLC = ['#377e3f', '#c19511', '#fcdb00', '#18eebe', '#d7191c', '#cfdad2', '#4458eb',];
var paletteLCTransitions = ['#FEFFE5'];
for (var i = 0; i < paletteLC.length; i++) {
    paletteLCTransitions[i + 1] = paletteLC[i];
}
var paletteLPD = ['#ff0000', '#ffbebe', '#ffff73', '#d9d8e6', '#267300'];
var paletteErosion = ['#000000', '#ffffcc', '#ffff7c', '#fdb02c', '#fa5f26', '#71292a'];
var paletteSocCategories = ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594',];
var paletteSoc = ['#fcffac', '#a60000'];
var paletteElevation = ['#006600', '#002200', '#fff700', '#ab7634', '#67471f', '#ffffff'];
var paletteNPP = palettes.matplotlib.viridis[7].reverse();
var vis = {
    lc: { min: 1, max: 7, opacity: 1, palette: paletteLC },
    lpd: { min: 1, max: 5, opacity: 1, palette: paletteLPD },
    transitions: { max: 7, min: 0, opacity: 1, palette: paletteLCTransitions },
    erosion: { min: 0, max: 5, opacity: 1, palette: paletteErosion },
    elevation: { min: 0, max: 2000, palette: paletteElevation },
    border1: { color: '#26458d', fillColor: '00000000' },
    border2: { color: 'black', fillColor: '00000000', width: 1 },
    highlight: { color: '#FF00FF', fillColor: '00000000' },
    soc: { min: 0, max: 100, palette: paletteSoc, },
    npp: { min: 0, max: 2500, palette: paletteNPP },
    custom: { max: 1, min: 1, opacity: 1, palette: ['#FF00FF'] } //DF8F05 FF7EF2
}
// Column names to retrieve values from precalulated assets
var namesLCColumns = ['lc_1', 'lc_2', 'lc_3', 'lc_4', 'lc_5', 'lc_6', 'lc_7',];
var namesLPDColumns = ['lpd_1', 'lpd_2', 'lpd_3', 'lpd_4', 'lpd_5'];
var namesErosionColumns = ['erosion_0', 'erosion_1', 'erosion_2', 'erosion_3', 'erosion_4', 'erosion_5'];
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
var pnlFrontLayerLegend; // to show/hide layer legend
var pnlCombinedLegend = null; // to show/hide combined layer legend 
var lyrCombined = null; // to show/hide combined layer
/**  Function to initialize the app */
function initApp(lan) {
    map = ui.Map();
    pnlFrontLayerLegend = ui.Panel({ style: { position: 'bottom-left' } });
    map.add(pnlFrontLayerLegend);
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
    namesErosion = [
        labels.lblNoData,
        labels.lblErosionVeryLow,
        labels.lblErosionLow,
        labels.lblErosionModerate,
        labels.lblErosionSevere,
        labels.lblErosionVerySevere,
    ];
    namesSoc = [
        labels.lblSocVeryLow + ' (<20)',
        labels.lblSocLow + ' (20-30)',
        labels.lblSocModerateLow + ' (30-40)',
        labels.lblSocModerateHigh + ' (40-50)',
        labels.lblSocHigh + ' (50-70)',
        labels.lblSocVeryHigh + ' (>70)',
    ];
    // Map layers configuration
    layerEntries = [
        {
            image: imgLcAll.select('y' + defaultFinalLCYear).clip(ftcContainer),
            style: vis.lc,
            name: labels.lblLandCover + ' ' + defaultFinalLCYear,
            visible: true,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLandCover + ' ' + defaultFinalLCYear, namesLC, vis.lc.palette, false, false),
            group: 'GENERAL',
        },
        {
            image: imgLpd,
            style: vis.lpd,
            name: labels.lblLandProductivityDynamics,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLandProductivityDynamics, namesLPD, vis.lpd.palette, false, false),
            group: 'GENERAL'
        },
        {
            image: imgErosion,
            style: vis.erosion,
            name: labels.lblWaterErosion,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblWaterErosion, namesErosion.slice(1), vis.erosion.palette.slice(1), false, false),
            group: 'GENERAL'
        },
        {
            image: imgSoc,
            style: vis.soc,
            name: labels.lblNationalSocMap,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(labels.lblSOCTonnesHa, vis.soc),
            group: 'GENERAL'
        },
        {
            image: imgElevation,
            style: {},
            name: labels.lblTopography,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(labels.lblTopography + ' (m)', vis.elevation),
            group: 'GENERAL'
        },
        {
            image: imgNpp,
            style: vis.npp,
            name: labels.lblNPP,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(labels.lblNPP + ' (grCm2)', vis.npp),
            group: 'GENERAL'
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
            image: imgLcAll.select('y' + defaultInitialLCYear).clip(ftcContainer),
            style: vis.lc,
            name: labels.lblFromLC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLandCover, namesLC, vis.lc.palette, false, false),
            group: 'TRANSITIONS',
        },
        {
            image: imgLcAll.select('y' + defaultFinalLCYear).clip(ftcContainer),
            style: vis.lc,
            name: labels.lblCurrentLC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLandCover, namesLC, vis.lc.palette, false, false),
            group: 'TRANSITIONS',
        },
        {
            image: imgTransitions.select('lc_gain_' + defaultInitialLCYear + '_' + defaultFinalLCYear).clip(ftcContainer),
            style: vis.transitions,
            name: labels.lblGains,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblGains, namesLCTransitions, vis.transitions.palette, false, false),
            group: 'TRANSITIONS',
        },
        {
            image: imgTransitions.select('lc_loss_' + defaultInitialLCYear + '_' + defaultFinalLCYear).clip(ftcContainer),
            style: vis.transitions,
            name: labels.lblLosses,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(labels.lblLosses, namesLCTransitions, vis.transitions.palette, false, false),
            group: 'TRANSITIONS',
        },
        {
            image: ftcSubbasins.style(vis.border2),
            style: {},
            name: labels.lblSubbasins,
            visible: true,
            legend: ui.Panel(),
            group: 'AREAS',
        },
        {
            image: ftcMicrobasins.style(vis.border1),
            style: {},
            name: labels.lblProjectAreas,
            visible: true,
            legend: ui.Panel(),
            group: 'AREAS',
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
            zeroCategory: false,
            image: imgLcAll.select('y' + defaultFinalLCYear),
            solid: true,   // no holes  
        },
        {
            title: labels.lblStep2,
            palette: vis.lpd.palette,
            names: namesLPD,
            prefix: 'lpd_',
            sufix: '',
            zeroCategory: false,
            image: imgLpd,
            solid: false, // has holes, so its necessary to sum up also holes area when no cat is selected (lpd_0)
        },
        {
            title: labels.lblStep3,
            palette: paletteSocCategories, // categorized image is used here, so different palette from layer shown in map
            names: namesSoc,
            prefix: 'tok_',
            sufix: '',
            zeroCategory: false,
            image: imgSoc,
            solid: false,
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
    var imgLogo = ee.Image('users/projectgeffao/Turkey/Logo_Upper2').visualize({
        bands: ['b1', 'b2', 'b3'],
        min: 0,
        max: 255
    });
    var tmbLogo = ui.Thumbnail({
        image: imgLogo,
        params: {
            dimensions: '1325x902',
            format: 'png'
        },
    });
    /*var lblIntro = ui.Label(labels.lblTitle, {
        fontWeight: 'bold',
        fontSize: '20px',
        margin: '10px 5px',
    });
    var lblCombining = ui.Label({
        value: labels.lblCombining,
        style: { fontSize: '12px', fontWeight: 'bold' },
    });*/
    var lblSubtitleExpl = ui.Label({
        value: labels.lblExpl1,
        style: { fontSize: '12px' },
    });
    var lblSubtitleSelect = ui.Label({
        value: labels.lblExpl2,
        style: { fontSize: '12px' },
    });
    // Add title/logo to the panel
    pnlControl.add(tmbLogo);
    //pnlControl.add(lblIntro).add(lblCombining)
    var selLanguage = ui.Select({
        items: mdlLocalization.languages,
        style: { width: '70%' },
        placeholder: labels.lblSelectLanguage,
    });
    selLanguage.setValue(lan);
    selLanguage.onChange(function (lan) { initApp(lan); });
    pnlControl.add(selLanguage);
    pnlControl.add(lblSubtitleExpl).add(lblSubtitleSelect);
    var lblAoi = ui.Label({
        value: labels.lblProjectAreas,
        style: { fontSize: '12px', fontWeight: 'bold' },
    });
    // Define the select LIST for the areas of interest (project areas)
    selAoi = ui.Select({
        items: namesAoi,
        style: { width: '70%' },
        placeholder: labels.lblSelectPojectArea,
        onChange: function (name) {
            ftcAoi = ftcMicrobasins.filter(ee.Filter.eq('name', name));
            map.widgets().remove(pnlCombinedLegend);
            showInfoSelectedAoi();
        },
    });
    // Add the select AOI panel to the map panel.
    pnlControl.add(lblAoi).add(selAoi);
    var listLayersChb = [];
    var listLayersLegends = [];
    var listTransitionsChb = [];
    var listTransitionsLegends = [];
    var listTransitionsLayersNames = [];
    var styleChbLayers = { margin: '4px 6px', fontSize: '12px' };
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
    /** */
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
        // Calculate/Reset buttons
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
        pnlHotspots.add(ui.Label(labels.lblStep4Display, {
            fontWeight: 'bold',
            fontSize: '12px',
            margin: '1px 1px 1px 5px',
            padding: '2px',
        }));
        pnlHotspots.add(pnlHotspotsButtons);
        // add product panel to control panel
        pnlControl.add(btnHotspotsAnalysis).add(pnlHotspots);
    }
    /** Initialize LC Transitions panel */
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
                var imgFrom = imgLcAll.select('y' + pYear).clip(ftcContainer);
                var lyrFrom = ui.Map.Layer(imgFrom.visualize(vis.lc), {}, labels.lblFromLC, pnlTransitions.widgets().get(1).getValue());
                map.layers().set(namesLayers.indexOf(labels.lblFromLC), lyrFrom);
                var imgGains = imgTransitions.select('lc_gain_' + pYear + '_' + defaultFinalLCYear).clip(ftcContainer);
                var lyrGains = ui.Map.Layer(imgGains.visualize(vis.transitions), {}, labels.lblGains, pnlTransitions.widgets().get(3).getValue());
                map.layers().set(namesLayers.indexOf(labels.lblGains), lyrGains);
                var imgLosses = imgTransitions.select('lc_loss_' + pYear + '_' + defaultFinalLCYear).clip(ftcContainer);
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
        // default values on load 
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
            if (listLayersChb[i].getValue()) {
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
            chb.setValue(false);
        });
    }
    // Opacity control
    var sldOpacity;
    /** Function to initialize Opacity Panel */
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
                // find last non-vectorial layer that is shown, // todo get names from 'AREAS' layersEntries
                if (lastShown === null
                    && l.getName() !== labels.lblSubbasins
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
    /** Function to initialize Drawint Tool Panel */
    var initControlPanelDrawing = function () {
        var paletteLayers = ['#9efba8', '#ff4848', '#ffb6fc', '#b797ff', '#6a5c5c', '#b3d2b6', '#06ffee', '#b63cff', '#ffffff']
        /** Function to update collection of drawn features. 
         *  When user draws, edits or erases a feature, this function is invoked in order to update download url link.
         *  Layer name (layerName) is added as a property in the collection. */
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
    /** Function to initialize More Info / Contact Panel */
    var initControlPanelMoreInfo = function () {
        var lblMoreInfo = ui.Label({
            value:
                labels.lblClickMoreInfo,
            style: { fontSize: '12px' },
        });
        lblMoreInfo.setUrl('https://docs.google.com/document/d/e/2PACX-1vSAQ3a7l79vvYNOITfZl4Iwf8585AbCi7xwjfwCmckj0Al5l1NdB4cKVJGvjggjfIZaFBmjwSLu3Yrq/pub');
        pnlControl.add(lblMoreInfo);
        var lblDeveloped = ui.Label(labels.lblAppDeveloped, { fontSize: '12px' });
        var lblEmail = ui.Label('ingrid.teich@fao.org', { fontSize: '12px' }).setUrl('mailto:ingrid.teich@fao.org');
        pnlControl.add(lblDeveloped).add(lblEmail);
    }
    initControlPanelLayers();
    initControlPanelHotspots();
    initControlPanelTransitions();
    initControlPanelOpacity(pnlControl);
    initControlPanelDrawing();
    initControlPanelMoreInfo(pnlControl);
}
/** Function to initialize Output Panel */
function initOutputPanel(pnlOutput) {
    // Info panel
    var pnlInfo = ui.Panel({
        style: {
            position: 'bottom-right',
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
/** Function to initialize Map Panel*/
function initMapPanel(pnlMap) {
    pnlMap.add(map);
    map.setControlVisibility(true, false, true, true, true, true, false);
    // Map.setControlVisibility(all, layerList, zoomControl, scaleControl, mapTypeControl, fullscreenControl, drawingToolsControl)
    // add layers to map
    layerEntries.forEach(function (layer) {
        map.addLayer(layer.image, layer.style, layer.name, layer.visible);
    })
    // Onload set first area in list selected 
    selAoi.setValue(namesAoi[0]);
    /* function to handle click on subbasins layer */
    var handleClickMap = function (coords) {
        map.widgets().remove(pnlCombinedLegend);
        ftcAoi = ftcSubbasins.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
        ftcAoi.size().getInfo(function (size) {
            selAoi.items().reset(namesAoi);
            if (size > 0) {
                showInfoSelectedAoi();
            } else {
                // reload container by default           
                selAoi.setValue(namesAoi[0]);
                clearCombinedLayerAndLegend();
            }
        });
    };
    map.onClick(handleClickMap);
    map.centerObject(ftcContainer);
    map.style().set('cursor', 'crosshair');
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
    // Show only chart panel related to opened panel on the left
    handleChartsPanelsShown();
    // Generate all charts for selected area
    setupGeneralCharts(pnlGeneralCharts, defaultFinalLCYear);
    setupHotspotsCharts(pnlHotspotsCharts, defaultFinalLCYear);
    setupTransitionsCharts(pnlTransCharts, selLCFromYears.getValue(), defaultFinalLCYear);
    // Generate combined raster for selected area if necessary
    if (atLeastOneCategoryChecked()) {
        hotspots();
    }
}
/** Function to handle which chart panel is shown in the right panel */
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
    // Creates array of all categories numbers, includes 0 if not a solid image
    var getAllCategories = function (max, solid) {
        var catNumbers = []
        for (var i = (solid ? 1 : 0); i <= max; i++) {
            catNumbers.push(i);
        }
        return catNumbers;
    }
    // Foreach section panel in hotspots panel check which categories are selected,ie:
    // selectedPerSection=[[1,2],[2,3,4],[1,2]];
    // selectedPerSection=[[1],[],[1,2]];
    var selectedPerSection = [];
    pnlHotspots.widgets().forEach(function (panel, panelIndex) {
        if (panelIndex < hotspotsEntries.length) {
            var selectedCatNumbers = [];
            panel.widgets().forEach(function (element, index) {
                if (index > 0) { // title
                    if (element.widgets().get(1).getValue()) {
                        var cat = hotspotsEntries[panelIndex].names.indexOf(element.widgets().get(1).getLabel()) + (hotspotsEntries[panelIndex].zeroCategory ? 0 : 1);
                        selectedCatNumbers.push(cat);
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
                aux.push(getAllCategories(hotspotsEntries[i].names.length, hotspotsEntries[i].solid));
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
        // ie: catNumbers = ['112','113','114']
        // Calculate image        
        imgCustom = getFilteredImage(imgCombined3, catNumbers);
        // Calculate area, setup columns names for precalculate totals ha
        catNumbers.forEach(function (element) {
            var s = element[0];
            for (var i = 1; i < element.length; i++) {
                s = s + '_' + element[i];
            }
            combinedCatNames.push(s);
        });
        // ie: combinedCatNames =['1_1_2','1_1_3','1_1_4']
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
    ftcAoi.first().get('name').getInfo(function (pName) {
        if (pName === containerName) {
            options['scale'] = 100;
        }
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
    // Erosion pie chart
    if (true) {
        var lstFeatErosion = namesErosionColumns.map(function (pName, i) {
            var lstValues = ee.List([namesErosion[i], ftcAoi.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderErosion = ee.List([
            [
                { label: 'Erosion', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsErosion = {
            title: labels.lblErosion,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: vis.erosion.palette,
        };
        createChart(lstHeaderErosion.cat(ee.FeatureCollection(lstFeatErosion).aggregate_array('row')), optionsErosion, 'PieChart', createChartPanel(pPnlContainer));
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
            sumColumns.get('sum').getInfo(function (sumsList) {
                for (c = 1; c < cols.length; c++) {
                    fSum = fSum.set(cols[c], sumsList[c - 1]);
                }
                list = list.add(fSum);
                pPanel.widgets().set(0, ui.Label(pOptions.title, { margin: '40px 10px 10px 10px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' }));
                pPanel.widgets().set(1, chart);
                pPanel.widgets().set(2, ui.Label(labels.lblDownloadCsv, { fontSize: '12px' }).setUrl(ee.FeatureCollection(list).getDownloadURL({ format: 'CSV', filename: 'TableData', selectors: cols })));
            });
        }
        else {
            pPanel.widgets().set(0, chart); // replace 'Generating...' label with chart
        }
    });
}
initApp(mdlLocalization.languages[1]);