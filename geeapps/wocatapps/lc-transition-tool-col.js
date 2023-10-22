var ftc0 = ee.FeatureCollection("users/wocatapps/Colombia/LCTCOL_Precal_Level0_LCT_v4"),
ftc1 = ee.FeatureCollection("users/wocatapps/Colombia/LCTCOL_Precal_Level1_LCT_v4"),
ftc2 = ee.FeatureCollection("users/wocatapps/Colombia/LCTCOL_Precal_Level2_LCT_v4")
;
/** 
* App: ADM1CDey Land Cover Transition Comparison Tool
*
* The structure of this script follows UI Pattern Template script provided by 
* Tyler Erickson (tylere@google.com) and Justin Braaten (braaten@google.com)
* 
* https://code.earthengine.google.com/bab500e5290d579f8d5f1cc5715314cf
*   
* 1-Model, 2-Components, 3-Composition, 4-Styling, 5-Behaviors, 6-Initialization
* 
* @author Eugenia Raviolo (eugenia.raviolo@gmail.com)
* @author Cesar Garcia (cesarnon@gmail.com)
* @author Ingrid Teich (ingridteich@gmail.com)
*/
/** Modules */
var mdlLegends = require('users/projectgeffao/modules:legends2.js');
var mdlPrecalculation = require('users/wocatapps/Colombia:AppLCT/precalculation.js');
var mdlLocalization = require('users/wocatapps/Colombia:AppLCT/localization.js');
/** Assets */
var a = {};
// For multicriteria calculation
a.imgCustom = ee.Image(0).selfMask();
initApp(mdlLocalization.languages[1]);
function initApp(lan) {
/*******************************************************************************
* 1-Model *
******************************************************************************/
// JSON object for storing the data model.
var m = {};
m.labels = mdlLocalization.getLocLabels(lan, mdlLocalization.labels);
m.evalSet = {};
m.maxAreaHa = 10000000;
m.transitionsSources = mdlPrecalculation.sources;
// More info & contact
m.info = {
    referenceDocUrl: '',
    contactEmail1: 'Cesar.Garcia@fao.org',
    contactEmail2: '',
    contactEmail3: '',
    contactEmail4: '',
    logoAssetId: '',
    logoDimensions: '1492x257',
}
// Feature collections options to click on the map to obtain precalculated statistics
m.assetsClick = {};
m.assetsClick[m.labels.lblNone] = null;
m.assetsClick[m.labels.lblLevel1] = ftc1;
m.assetsClick[m.labels.lblLevel2] = ftc2;
// Feature collection to query on map click
m.ftcClickOn = null;
// Layers Visualization
m.lv = {
    borderLevel1: { vis: { color: 'black', fillColor: '00000000', width: 1 } },
    borderLevel2: { vis: { color: '#838888', fillColor: '00000000', width: 1 } },
    highlight: { vis: { color: 'red', fillColor: '00000000' } },
};
// Map layers configuration
m.layerEntries = [
    {
        asset: ftc2,
        style: m.lv.borderLevel2.vis,
        name: m.labels.lblLevel2,
        visible: false,
        legend: null,
        group: 'FEATURES',
        singleColor: 'SQUARE',
    },
    {
        asset: ftc1,
        style: m.lv.borderLevel1.vis,
        name: m.labels.lblLevel1,
        visible: false,
        legend: null,
        group: 'FEATURES',
        singleColor: 'SQUARE',
    },
];
m.namesLayers = [];
/*******************************************************************************
* 2-Components *
******************************************************************************/
// JSON object for storing UI components.
var c = {};
// Root Container Panel 
c.pnlRoot = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: { height: '100%', width: '100%', }, // todo panel dimensions if set in style does not work as expected   
});
// Left panel
c.lp = {};
c.lp.pnlControl = ui.Panel({ style: { height: '100%', width: '20%' } });
// Center panel
c.cp = {};
c.cp.pnlMap = ui.Panel({ style: { height: '100%', width: '70%' } });
// Right panel
c.rp = {};
c.rp.pnlOutput = ui.Panel({ style: { height: '100%', width: '30%' } });
// Split panel (Map & Output Panel)
c.sppMapOutput = ui.SplitPanel(c.cp.pnlMap, c.rp.pnlOutput);
// Left Panel - Logo & Contact section
c.lp.info = {};
/*    c.lp.info.tmbLogo = ui.Thumbnail({
        image: ee.Image(m.info.logoAssetId).visualize({
            bands: ['b1', 'b2', 'b3'],
            min: 0,
            max: 255
        }),//.selfMask(),
        params: {
            dimensions: m.info.logoDimensions,
            format: 'png'
        },
    });
*/
c.lp.info.lblIntro = ui.Label(m.labels.lblTitle);
c.lp.info.lblApp = ui.Label(m.labels.lblExpl1);
c.lp.info.lblAppDev = ui.Label(m.labels.lblAppDeveloped);
c.lp.info.lblEmail1 = ui.Label(m.info.contactEmail1).setUrl('mailto:' + m.info.contactEmail1);
c.lp.info.lblEmail2 = ui.Label(m.info.contactEmail2).setUrl('mailto:' + m.info.contactEmail2);
c.lp.info.lblEmail3 = ui.Label(m.info.contactEmail3).setUrl('mailto:' + m.info.contactEmail3);
c.lp.info.lblEmail4 = ui.Label(m.info.contactEmail4).setUrl('mailto:' + m.info.contactEmail4);
c.lp.info.btnClose = ui.Button({ label: m.labels.lblCloseInfoPanel });
c.lp.info.pnlContainer = ui.Panel(
    [//c.lp.info.lblIntro,
        c.lp.info.lblApp,
        c.lp.info.lblAppDev,
        c.lp.info.lblEmail1,
        c.lp.info.lblEmail2,
        c.lp.info.lblEmail3,
    ]);
c.lp.divs = {};
c.lp.divs.div1 = ui.Panel();
// Left Panel - Language section
c.lp.lan = {};
c.lp.lan.selLanguage = ui.Select({
    items: ['English', 'Spanish'],
    value: lan
});
// Left Panel - Fly to Lat/Lon
c.lp.flyTo = {};
c.lp.flyTo.lblFlyTo = ui.Label(m.labels.lblFlyToText);
c.lp.flyTo.txtLat = ui.Textbox(m.labels.lblLatitude, '');
c.lp.flyTo.txtLon = ui.Textbox(m.labels.lblLongitude, '');
c.lp.flyTo.btnFlyTo = ui.Button(m.labels.lblFlyTo);
c.lp.flyTo.btnUserLocation = ui.Button(m.labels.lblUserLocation + '\u25BC');
c.lp.flyTo.btnRemoveLocation = ui.Button(m.labels.lblRemoveLocation + ' \u2716');
c.lp.flyTo.pnlFlyTo = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    widgets: [
        ui.Panel({
            layout: ui.Panel.Layout.flow('horizontal'),
            widgets: [c.lp.flyTo.txtLat, c.lp.flyTo.txtLon, c.lp.flyTo.btnFlyTo]
        }),
        ui.Panel({
            layout: ui.Panel.Layout.flow('horizontal'),
            widgets: [c.lp.flyTo.btnUserLocation, c.lp.flyTo.btnRemoveLocation]
        })]
});
// Left Panel - Asset id
c.lp.customAsset = {};
c.lp.customAsset.lblEnterAssetId = ui.Label(m.labels.lblEnterAssetId);
c.lp.customAsset.txtAssetId = ui.Textbox(m.labels.lblAssetId, '');
c.lp.customAsset.btnLoadAsset = ui.Button(m.labels.lblLoadAsset);
c.lp.customAsset.pnlCustomAsset = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    widgets: [c.lp.customAsset.txtAssetId, c.lp.customAsset.btnLoadAsset]
});
// Left Panel - Administrative boundaries section
c.lp.levels = {};
c.lp.levels.lblChoose = ui.Label(m.labels.lblExpl2 + ' (*)');
c.lp.levels.selLevel1 = ui.Select({
    items: [],
    placeholder: m.labels.lblSelectLevel1,
});
c.lp.levels.selLevel2 = ui.Select({
    items: [],
    placeholder: m.labels.lblSelectLevel1First,
});
// Left Panel - Layer for boundaries selection
c.lp.boundaries = {};
c.lp.boundaries.lblChoose = ui.Label(m.labels.lblAssetClick + ' (*)');
c.lp.boundaries.selBoundariesLayer = ui.Select({
    items: Object.keys(m.assetsClick),
    value: m.labels.lblNone,
});
// Left Panel - General layers section    
c.lp.gl = {};
c.lp.gl.lblLayersLegends = ui.Label(m.labels.lblLayers);
c.lp.gl.pnlContainer = ui.Panel();
m.layerEntries.filter(function (e) {
    return e.group === 'FEATURES';
}).forEach(function (layer) {
    c.lp.gl.pnlContainer.add(mdlLegends.createLayerEntry(layer));
});
m.layerEntries.filter(function (e) {
    return e.group === 'RASTER';
}).forEach(function (layer) {
    c.lp.gl.pnlContainer.add(mdlLegends.createLayerEntry(layer));
});
// Left Panel - Transitions section
c.lp.tr = {};
var transitionsEntries = function (source, tr) {
    var lcFinalYear = source.lcYears[source.lcYears.length - 1];
    // Transitions layers configuration
    var entries = [
        {
            asset: source.imgLcAll.select('y' + source.lcYears[0]).clip(ftc0),
            style: source.lcCatVis.vis,
            label: tr + m.labels.lblFromLC,
            name: m.labels.lblLandCover + ' ' + source.lcYears[0],
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover,
                source.lcCatVis.names.map(function (lbl) { return m.labels[lbl] }),
                source.lcCatVis.vis.palette, false, false),
        },
        {
            asset: source.imgLcAll.select('y' + lcFinalYear).clip(ftc0),
            style: source.lcCatVis.vis,
            label: tr + m.labels.lblCurrentLC,
            name: m.labels.lblLandCover + ' ' + lcFinalYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover,
                source.lcCatVis.names.map(function (lbl) { return m.labels[lbl] }),
                source.lcCatVis.vis.palette, false, false),
        },
        {
            asset: source.imgTransitions.select('lc_gain_' + source.lcYears[0] + '_' + lcFinalYear).clip(ftc0),
            style: source.lcTransCatVis.vis,
            label: tr + m.labels.lblGains,
            name: m.labels.lblGains + ' ' + source.lcYears[0] + ' - ' + lcFinalYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblGains,
                source.lcTransCatVis.names.map(function (lbl) { return m.labels[lbl] }),
                source.lcTransCatVis.vis.palette, false, false),
        },
        {
            asset: source.imgTransitions.select('lc_loss_' + source.lcYears[0] + '_' + lcFinalYear).clip(ftc0),
            style: source.lcTransCatVis.vis,
            label: tr + m.labels.lblLosses,
            name: m.labels.lblLosses + ' ' + source.lcYears[0] + ' - ' + lcFinalYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLosses,
                source.lcTransCatVis.names.map(function (lbl) { return m.labels[lbl] }),
                source.lcTransCatVis.vis.palette, false, false),
        },
        {
            asset: source.imgTransitions.select('lc_degradation_' + source.lcYears[0] + '_' + lcFinalYear).clip(ftc0),
            style: source.lcDegCatVis.vis,
            label: tr + m.labels.lblStateLayer,
            name: m.labels.lblStateLayer + ' ' + source.lcYears[0] + ' - ' + lcFinalYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblStateLayer,
                source.lcDegCatVis.names.map(function (lbl) { return m.labels[lbl] }),
                source.lcDegCatVis.vis.palette, false, false),
        }];
    return entries;
}
// Generate as many transitions section as sources 
m.transitionsSources.forEach(function (source, i) {
    var name = 'tr' + i;
    c.lp[name] = {};
    c.lp[name].btnTransitions = ui.Button(source.name);
    c.lp[name].pnlContainer = ui.Panel();
    c.lp[name].lblInitialYears = ui.Label(m.labels.lblSelectLCYear + ': ');
    c.lp[name].selLCFromYears = ui.Select({
        items: source.lcPeriodsInitialYears,
        value: source.lcYears[0],
    });
    c.lp[name].pnlFromYear = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        widgets: [c.lp[name].lblInitialYears, c.lp[name].selLCFromYears]
    });
    c.lp[name].pnlLayers = ui.Panel();
    c.lp[name].te = transitionsEntries(source, 'tr' + i);
    c.lp[name].te.forEach(function (layer) {
        c.lp[name].pnlLayers.add(mdlLegends.createLayerEntry(layer));
    });
    c.lp[name].pnlContainer.add(c.lp[name].pnlFromYear);
    c.lp[name].pnlContainer.add(c.lp[name].pnlLayers);
    c.lp[name].source = source;
    // Charts panels on the right
    c.rp[name] = {};
    c.rp[name].btnTransitions = ui.Button(source.name);
    c.rp[name].pnlContainer = ui.Panel();
})
// Left Panel - Drawing tool section
c.lp.dt = {};
c.lp.dt.btnDrawingTools = ui.Button(m.labels.lblDrawingTools + ' 📍');
c.lp.dt.lblCustomLayer = ui.Label(m.labels.lblCustomLayer);
c.lp.dt.txbLayerName = ui.Textbox(m.labels.lblLayerName, '');
c.lp.dt.btnAddLayer = ui.Button('+');
c.lp.dt.pnlFileName = ui.Panel({
    widgets: [c.lp.dt.txbLayerName, c.lp.dt.btnAddLayer],
    layout: ui.Panel.Layout.Flow('horizontal'),
});
c.lp.dt.lblDrawFeatures = ui.Label(m.labels.lblDrawFeatures);
c.lp.dt.lblGetStatistics = ui.Label(m.labels.lblGetStatistics);
c.lp.dt.btnZonalStats = ui.Button(m.labels.lblSelectAndCalculate);
c.lp.dt.lblDownloadLinks = ui.Label(m.labels.lblDownloadLinks);
c.lp.dt.lblLinks = ui.Label(m.labels.lblLinks);
c.lp.dt.lblJson = ui.Label();
c.lp.dt.lblKml = ui.Label();
c.lp.dt.pnlLinks = ui.Panel({
    widgets: [c.lp.dt.lblLinks, c.lp.dt.lblJson, c.lp.dt.lblKml],
    layout: ui.Panel.Layout.Flow('horizontal'),
});
c.lp.dt.pnlContainer = ui.Panel({
    widgets: [
        c.lp.dt.lblCustomLayer,
        c.lp.dt.pnlFileName,
        c.lp.dt.lblDrawFeatures,
        c.lp.dt.lblGetStatistics,
        c.lp.dt.btnZonalStats,
        c.lp.dt.lblDownloadLinks,
        c.lp.dt.pnlLinks
    ]
});
// Left Panel - Opacity control
c.lp.op = {};
c.lp.op.lblOpacity = ui.Label(m.labels.lblFrontLayerOpacity);
c.lp.op.sldOpacity = ui.Slider({
    min: 0,
    max: 1,
    value: 1,
    step: 0.1,
});
c.lp.op.pnlSlider = ui.Panel({
    widgets: [c.lp.op.lblOpacity, c.lp.op.sldOpacity],
    layout: ui.Panel.Layout.Flow('horizontal'),
});
// Left Panel - Disclaimer
c.lp.lblDisclaimer = ui.Label('(*) ' + m.labels.lblDisclaimer);
// Center Panel   
c.cp.map = ui.Map();
c.cp.pnlCombinedLegend = ui.Panel();
c.cp.pnlFrontLayerLegend = ui.Panel();
c.cp.drt = ui.Map.DrawingTools();
c.cp.btnSelectContainer = ui.Button(m.labels.lblSelectContainer);
// Right Panel
// MESSAGES PANEL    
c.rp.lblMessages = ui.Label('');
c.rp.pnlMessages = ui.Panel({
    widgets: [c.rp.lblMessages]
});
// STATS PANEL
c.rp.stats = {};
c.rp.stats.pnlStats = ui.Panel();
c.rp.stats.lblStatsTitle = ui.Label(m.labels.lblSelectedAOI);
c.rp.stats.lblHighlightBox = ui.Label();
c.rp.stats.pnlSelectedArea = ui.Panel({
    widgets: [c.rp.stats.lblStatsTitle, c.rp.stats.lblHighlightBox],
    layout: ui.Panel.Layout.Flow("horizontal"),
});
c.rp.stats.pnlStats.add(c.rp.stats.pnlSelectedArea);
// Stats panel - general entries 
c.rp.stats.ge = {};
c.rp.stats.ge.pnlEntryAreaName = ui.Panel({
    widgets: [ui.Label(m.labels.lblAreaName + ': '), ui.Label(m.labels.lblLoading)],
});
c.rp.stats.ge.pnlEntryArea = ui.Panel({
    widgets: [ui.Label(m.labels.lblArea + ': '), ui.Label(m.labels.lblLoading)],
});
// Add entries to general stats panel
Object.keys(c.rp.stats.ge).forEach(function (key) {
    c.rp.stats.ge[key].setLayout(ui.Panel.Layout.Flow('horizontal'));
    c.rp.stats.pnlStats.add(c.rp.stats.ge[key]);
});
/*******************************************************************************
* 3-Composition *   
******************************************************************************/
ui.root.clear();
ui.root.add(c.pnlRoot);
c.pnlRoot.add(c.lp.pnlControl);
c.pnlRoot.add(c.sppMapOutput);
// Control panel
//    c.lp.pnlControl.add(c.lp.info.tmbLogo);
c.lp.pnlControl.add(c.lp.info.lblIntro);
c.lp.pnlControl.add(c.lp.info.pnlContainer);
c.lp.pnlControl.add(c.lp.info.btnClose);
//c.lp.pnlControl.add(c.lp.divs.div1);
c.lp.pnlControl.add(c.lp.lan.selLanguage);
//c.lp.pnlControl.add(c.lp.flyTo.lblFlyTo);
//c.lp.pnlControl.add(c.lp.flyTo.pnlFlyTo);
c.lp.pnlControl.add(c.lp.levels.lblChoose);
c.lp.pnlControl.add(c.lp.levels.selLevel1);
c.lp.pnlControl.add(c.lp.levels.selLevel2);
c.lp.pnlControl.add(c.lp.boundaries.lblChoose);
c.lp.pnlControl.add(c.lp.boundaries.selBoundariesLayer);
c.lp.pnlControl.add(c.lp.customAsset.lblEnterAssetId);
c.lp.pnlControl.add(c.lp.customAsset.pnlCustomAsset);
c.lp.pnlControl.add(c.lp.gl.lblLayersLegends);
c.lp.pnlControl.add(c.lp.gl.pnlContainer);
m.transitionsSources.forEach(function (source, i) {
    c.lp.pnlControl.add(c.lp['tr' + i].btnTransitions);
    c.lp.pnlControl.add(c.lp['tr' + i].pnlContainer);
});
c.lp.pnlControl.add(c.lp.op.pnlSlider);
c.lp.pnlControl.add(c.lp.dt.btnDrawingTools);
c.lp.pnlControl.add(c.lp.dt.pnlContainer);
c.lp.dt.pnlContainer.add(c.lp.flyTo.lblFlyTo)
c.lp.dt.pnlContainer.add(c.lp.flyTo.pnlFlyTo)
c.lp.pnlControl.add(c.lp.lblDisclaimer);
// Map panel 
c.cp.pnlMap.add(c.cp.map);
c.cp.map.add(c.cp.pnlFrontLayerLegend);
c.cp.map.add(c.cp.drt);
c.cp.map.add(c.cp.btnSelectContainer);
// Output panel 
c.rp.pnlOutput.add(c.rp.pnlMessages);
c.rp.pnlOutput.add(c.rp.stats.pnlStats);
m.transitionsSources.forEach(function (source, i) {
    c.rp.pnlOutput.add(c.rp['tr' + i].btnTransitions);
    c.rp.pnlOutput.add(c.rp['tr' + i].pnlContainer);
})
/*******************************************************************************
* 4-Styling *  
******************************************************************************/
// JSON object for defining CSS-like class style properties.
var s = {};
//c.pnlRoot.style().set({ height: '100%', width: '100%', });
// ------------- LEFT PANEL
/*c.lp.pnlControl.style().set({ height: '100%', width: '20%', });
c.cp.pnlMap.style().set({ height: '100%', width: '80%', });
c.rp.pnlOutput.style().set({ height: '100%', width: '20%', });*/
s.style1 = { fontSize: '12px', margin: '2px 10px' };
s.styleStatsValue = { margin: '4px 0px', fontSize: '12px', whiteSpace: 'pre' };
s.styleStatsHeader = { margin: '4px 0px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' };
s.styleInfoTitle = { fontSize: '16px', fontWeight: 'bold', margin: '4px 0px' };
s.styelChartPanelTitle = { fontSize: '16px', fontWeight: 'bold', margin: '4px 15px' };
s.styleMessage = { color: 'gray', fontSize: '12px', padding: '2px 0px 2px 10px' };
s.styleWarning = { color: 'blue', fontSize: '12px' };
s.divider = {
    backgroundColor: 'F0F0F0',
    height: '4px',
    margin: '20px 0px'
};
c.lp.info.lblIntro.style().set({ fontWeight: 'bold', fontSize: '20px', margin: '10px 5px', });
c.lp.info.lblApp.style().set({ fontSize: '12px' });
c.lp.info.lblAppDev.style().set(s.style1);
c.lp.info.lblEmail1.style().set(s.style1);
c.lp.info.lblEmail2.style().set(s.style1);
c.lp.info.lblEmail3.style().set(s.style1);
c.lp.info.lblEmail4.style().set(s.style1);
c.lp.info.pnlContainer.style().set({ margin: 0, padding: 0 });
c.lp.divs.div1.style().set(s.divider);
c.lp.lan.selLanguage.style().set({ width: '70%' });
c.lp.flyTo.lblFlyTo.style().set(s.style1);
c.lp.flyTo.txtLat.style().set({ width: '25%', margin: '5px 5px' });
c.lp.flyTo.txtLon.style().set({ width: '25%', margin: '5px 5px' });
c.lp.flyTo.btnFlyTo.style().set({ width: '30%', margin: '5px 5px' });
c.lp.flyTo.btnUserLocation.style().set({ width: '40%', margin: '5px 5px' });
c.lp.flyTo.btnRemoveLocation.style().set({ width: '40%', margin: '5px 5px' });
c.lp.customAsset.lblEnterAssetId.style().set(s.style1);
c.lp.customAsset.txtAssetId.style().set({ width: '60%' });
c.lp.customAsset.btnLoadAsset.style().set({ width: '20%' });
c.lp.levels.lblChoose.style().set(s.style1);
c.lp.levels.selLevel1.style().set({ width: "90%", });
c.lp.levels.selLevel2.style().set({ width: "90%", });
c.lp.boundaries.lblChoose.style().set(s.style1);
c.lp.boundaries.selBoundariesLayer.style().set({ width: '70%' });
c.lp.gl.lblLayersLegends.style().set({ fontSize: '12px', fontWeight: 'bold' });
c.lp.gl.pnlContainer.style().set({ margin: '0px 5px', shown: true });
s.sectionButton = { width: '90%', fontSize: '6px', fontWeight: 'normal' };
s.sectionPanel = { margin: '5px 5px', shown: false, width: '90%' };
s.paramPanel = { width: '90%', fontSize: '12px', margin: '0px', padding: '0px' };
var sectionColors = ['purple', 'teal', 'orange', 'black'];
// Style for each transition section
m.transitionsSources.forEach(function (source, i) {
    c.lp['tr' + i].btnTransitions.style().set(s.sectionButton);
    c.lp['tr' + i].btnTransitions.style().set({ color: sectionColors[i] });
    c.lp['tr' + i].pnlContainer.style().set(s.sectionPanel);
    c.lp['tr' + i].pnlContainer.style().set({ border: '3px solid ' + sectionColors[i], shown: true });
    c.lp['tr' + i].selLCFromYears.style().set({ margin: '0px', padding: '5px 0 0 0' });
    c.lp['tr' + i].pnlFromYear.style().set(s.paramPanel);
    c.rp['tr' + i].btnTransitions.style().set(s.sectionButton);
    c.rp['tr' + i].btnTransitions.style().set({ color: sectionColors[i] });
    c.rp['tr' + i].pnlContainer.style().set(s.sectionPanel);
    c.rp['tr' + i].pnlContainer.style().set({ border: '3px solid ' + sectionColors[i], shown: true });
})
// Drawing tools Section
c.lp.dt.btnDrawingTools.style().set(s.sectionButton);
c.lp.dt.pnlContainer.style().set(s.sectionPanel);
c.lp.dt.pnlContainer.style().set({ border: '3px solid black' });
c.lp.dt.lblCustomLayer.style().set({ fontSize: '12px' });
c.lp.dt.pnlFileName.style().set({ margin: '0px 5px' });
c.lp.dt.txbLayerName.style().set({ width: '60%', fontSize: '12px' })
c.lp.dt.lblDrawFeatures.style().set({ fontSize: '12px' });
c.lp.dt.lblGetStatistics.style().set({ fontSize: '12px' });
c.lp.dt.lblJson.style().set({ fontSize: '12px' });
c.lp.dt.lblKml.style().set({ fontSize: '12px' });
c.lp.dt.lblDownloadLinks.style().set({ fontSize: '12px' });
c.lp.dt.lblLinks.style().set({ fontSize: '12px' });
c.lp.op.lblOpacity.style().set({ fontSize: '12px' });
c.lp.lblDisclaimer.style().set({ fontSize: '10px', margin: '2px 10px' });
// --------- CENTER PANEL
c.cp.pnlFrontLayerLegend.style().set({ position: 'bottom-left' });
c.cp.pnlCombinedLegend.style().set({ shown: false });
c.cp.btnSelectContainer.style().set({ position: "bottom-right" });
c.cp.map.style().set('cursor', 'crosshair');
// --------- RIGHT PANEL
// Messages Panel
c.rp.pnlMessages.style().set({ padding: '8px 15px' });
c.rp.lblMessages.style().set(s.styleWarning);
c.rp.lblMessages.style().set({ margin: '4px 0px' });
// Stats Panel
c.rp.stats.lblStatsTitle.style().set(s.styleInfoTitle);
c.rp.stats.lblHighlightBox.style().set({
    border: "2px solid " + m.lv.highlight.vis.color,
    padding: "5px",
    margin: "7px 0 0 5px",
});
c.rp.stats.pnlStats.style().set({ padding: '8px 15px', });
Object.keys(c.rp.stats.ge).forEach(function (key) {
    c.rp.stats.ge[key].widgets().get(0).style().set(s.styleStatsHeader);
    c.rp.stats.ge[key].widgets().get(1).style().set(s.styleStatsValue);
});
/*******************************************************************************
* 5-Behaviors *   
******************************************************************************/
var formatNumber = function (number, digits) {
    return number.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}
var sortByLabel = function (a, b) {
    if (a.label < b.label) { return -1; }
    if (a.label > b.label) { return 1; }
    return 0;
};
var createChartPanel = function (container) {
    var pnlChart = ui.Panel();
    container.add(pnlChart);
    return pnlChart;
}
/** Handles which charts are shown in the right panel */
var handleChartsPanelsShown = function () {
    //c.rp.charts.pnlTransitionsCharts.style().set({ shown: (c.lp.tr.pnlContainer.style().get('shown') ? true : false) });
}
/** Shows or hides specified layer in map */
var showLayer = function (name, shown) {
    var i = m.namesLayers.indexOf(name);
    if (m.namesLayers.indexOf(name) >= 0) {
        c.cp.map.layers().get(i).setShown(shown);
    }
}
/** Shows the front layer legend (shows legend for first selected layer, from bottom to top, in order of apearence in left panel list) */
var showFrontLayerLegend = function () {
    c.cp.pnlFrontLayerLegend.clear();
    var chk;
    // From the last transition panel to the first panel
    for (var index = m.transitionsSources.length - 1; index >= 0; index--) {
        var container = c.lp['tr' + index].pnlContainer;
        var l = c.lp['tr' + index].pnlLayers;
        var te = c.lp['tr' + index].te;
        // If transitions panel is open check if some layer is selected
        if (container.style().get('shown')) {
            for (var i = l.widgets().length() - 1; i >= 0; i--) {
                chk = l.widgets().get(i).widgets().get(0);
                if (chk.getValue()) {
                    c.cp.pnlFrontLayerLegend.widgets().set(0, te[i].legend);
                    return;
                }
            }
        }
    }
};
c.lp.flyTo.btnFlyTo.onClick(function () {
    try {
        var coords = [parseFloat(c.lp.flyTo.txtLon.getValue()), parseFloat(c.lp.flyTo.txtLat.getValue())];
        var gmyPoint = ee.Geometry.Point(coords);
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblFlyTo), ui.Map.Layer(ee.FeatureCollection(gmyPoint).style({ color: 'red', pointShape: 'star5', pointSize: 6 })));
        c.cp.map.centerObject(gmyPoint, 10);
    } catch (error) {
        c.rp.lblMessages.setValue(error);
    }
});
c.lp.flyTo.btnUserLocation.onClick(function () {
    c.rp.pnlMessages.style().set({ shown: false });
    var handlePosition = function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        if (navigator.geolocation) {
            var point = ee.Geometry.Point([lon, lat]);
            c.cp.map.centerObject(point);
            c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblFlyTo), ui.Map.Layer(point, { color: '#0099ff' }, m.labels.lblFlyTo));
        }
        else {
            c.rp.pnlMessages.style().set({ shown: true });
            c.rp.lblMessages.setValue(m.labels.lblLocNotSupported);
        }
    };
    var handleLocError = function (error) {
        c.rp.pnlMessages.style().set({ shown: true });
        switch (error.code) {
            case error.PERMISSION_DENIED:
                c.rp.lblMessages.setValue(m.labels.lblPermissionDenied);
                break;
            case error.POSITION_UNAVAILABLE:
                c.rp.lblMessages.setValue(m.labels.lblPositionUnavailable);
                break;
            case error.TIMEOUT:
                c.rp.lblMessages.setValue(m.labels.lblTimeout);
                break;
            case error.UNKNOWN_ERROR:
                c.rp.lblMessages.setValue(m.labels.lblUnknownError);
                break;
        }
    }
    navigator.geolocation.getCurrentPosition(handlePosition, handleLocError);
});
c.lp.flyTo.btnRemoveLocation.onClick(function () {
    showLayer(m.labels.lblFlyTo, false);
});
/**  */
var handleCustomFeatureCollection = function (gmy, name, level) {
    var f = ee.Feature(gmy).set('area_ha', gmy.area({ 'maxError': 1 }).divide(10000));
    f = f.set('name', name);
    handleEvaluating(true);
    f.get('area_ha').evaluate(function (area, error) {
        if (error) {
            handleEvaluating(false);
            c.rp.lblMessages.setValue(m.labels.lblUnexpectedError + error);
            c.rp.pnlMessages.style().set({ shown: true });
            return;
        }
        if (area > m.maxAreaHa) {
            handleEvaluating(false);
            c.rp.lblMessages.setValue(m.labels.lblSmallerArea
                + formatNumber(m.maxAreaHa, 0) + 'ha. '
                + m.labels.lblSelectedAreaHa
                + ' ' + formatNumber(area, 2) + 'ha.');
            c.rp.pnlMessages.style().set({ shown: true });
            return;
        }
        //ftc0.geometry().intersects(gmy, 1).evaluate(function (intersection, error) {
        ftc0.geometry().contains(gmy, 1).evaluate(function (contained, error) {
            if (error) {
                handleEvaluating(false);
                c.rp.lblMessages.setValue(m.labels.lblUnexpectedError + error);
                c.rp.pnlMessages.style().set({ shown: true });
                return;
            }
            if (!contained) {
                handleEvaluating(false);
                c.rp.lblMessages.setValue(m.labels.lblGeometryNotContained);
                //c.rp.lblMessages.setValue(m.labels.lblGeometryNoIntersection);
                c.rp.pnlMessages.style().set({ shown: true });
                return;
            }
            m.ftcAoi = ee.FeatureCollection(f);
            m.precalculated = false;
            m.haAoi = area;
            m.levelAoi = level;
            showInfoSelectedAoi();
        });
    });
};
c.lp.customAsset.btnLoadAsset.onClick(function () {
    var assetId = c.lp.customAsset.txtAssetId.getValue().trim();
    if (assetId === '') {
        c.rp.pnlMessages.style().set({ shown: true });
        c.rp.lblMessages.setValue(m.labels.lblInvalidAssetId);
        return;
    }
    try {
        var ftcCustom = ee.FeatureCollection(assetId);
        ftcCustom.size().getInfo(function (size) {
            if (size === undefined) {
                c.rp.pnlMessages.style().set({ shown: true });
                c.rp.lblMessages.setValue(m.labels.lblInvalidAssetId);
            }
            else if (size > 1) {
                c.rp.pnlMessages.style().set({ shown: true });
                c.rp.lblMessages.setValue(m.labels.lblMoreThanOneFeature);
            }
            else {
                handleCustomFeatureCollection(ftcCustom.first().geometry(), assetId, m.labels.lblCustomAsset);
            }
        });
    }
    catch (err) {
        c.rp.pnlMessages.style().set({ shown: true });
        c.rp.lblMessages.setValue(m.labels.lblInvalidAssetId + ': ' + err);
    }
});
c.lp.lan.selLanguage.onChange(function (lan) { initApp(lan); });
c.lp.info.btnClose.onClick(function () {
    c.lp.info.pnlContainer.style().set({ shown: !c.lp.info.pnlContainer.style().get('shown') });
    c.lp.info.btnClose.setLabel(c.lp.info.pnlContainer.style().get('shown') ? m.labels.lblCloseInfoPanel : m.labels.lblOpenInfoPanel);
});
// Stack layers in map
// General layers
m.layerEntries.forEach(function (layer) {
    if (layer.group === 'FEATURES') {
        c.cp.map.addLayer(layer.asset.style(layer.style), {}, layer.name, layer.visible);
    }
    else {
        c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
    }
});
// LC from year / LC to year / Gains / Losses layers for each source 
m.transitionsSources.forEach(function (source, i) {
    var te = c.lp['tr' + i].te;
    te.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.label, layer.visible);
    });
})
// User Localization - this layer is dinamically updated 
c.cp.map.addLayer(ee.Geometry.Point([0, 0]), { color: '#0099ff' }, m.labels.lblFlyTo, false);
// Selected AOI
c.cp.map.addLayer(ee.Geometry.Point([0, 0]), {}, m.labels.lblSelectedAOI, false);
// Add on check/uncheck functionality to general layers entries
c.lp.gl.pnlContainer.widgets().forEach(function (w) {
    var chk = w.widgets().get(0);
    chk.onChange(function (checked) {
        showLayer(chk.getLabel(), checked);
        showFrontLayerLegend();
    });
});
// Add on check/uncheck functionality to tr layers entries
m.transitionsSources.forEach(function (source, n) {
    c.lp['tr' + n].pnlLayers.widgets().forEach(function (w, i) {
        var chk = w.widgets().get(0);
        chk.onChange(function (checked) {
            showLayer(c.lp['tr' + n].te[i].label, checked);
            showFrontLayerLegend();
        });
    });
})
// Opaciy slider, get last non boundaries layer and apply selected opacity
c.lp.op.sldOpacity.onSlide(function (value) {
    var layersArray = c.cp.map.layers().getJsArray();
    var lastShown = null;
    for (var i = layersArray.length - 1; i >= 0; i--) {
        var l = layersArray[i];
        // find last non-border layer that is shown
        if (lastShown === null
            && l.getName() !== m.labels.lblSelectedAOI
            && l.getName() !== m.labels.lblLevel1
            && l.getName() !== m.labels.lblLevel2
            && l.getName() !== m.labels.lblFlyTo
            && l.getShown()
        ) {
            lastShown = c.cp.map.layers().get(i);
        }
        c.cp.map.layers().get(i).setOpacity(1); // for all other layers
    }
    if (lastShown !== null) {
        lastShown.setOpacity(value);
    }
});
c.lp.boundaries.selBoundariesLayer.onChange(function (v) {
    m.ftcClickOn = m.assetsClick[v];
    if (m.ftcClickOn !== null) {
        // show layer on map
        for (var i = 0; i < c.lp.gl.pnlContainer.widgets().length(); i++) {
            var chk = c.lp.gl.pnlContainer.widgets().get(i).widgets().get(0);
            if (chk.getLabel() === v) {
                chk.setValue(true);
                break;
            }
        }
        // hide drawing tool panel
        c.lp.dt.pnlContainer.style().set({ shown: false });
        c.cp.map.drawingTools().stop();
        c.cp.map.drawingTools().setShown(false);
        c.cp.map.drawingTools().layers().forEach(function (l) {
            l.setShown(false);
        });
    }
});
/** Shows precalculated stats and charts for selected area of interest. 
 *  If area of interest is a user drawn-feature calculates all stats on the fly*/
var showInfoSelectedAoi = function () {
    handleEvaluating(true);
    Object.keys(c.rp.stats.ge).forEach(function (key) {
        c.rp.stats.ge[key].widgets().get(1).setValue(m.labels.lblLoading);
    });
    var f;
    if (m.precalculated) { // aoi from precalculated assets
        var selectedArea = m.ftcAoi.first();
        // Get area value in precalculated row, for drawn-feature is already calculated
        m.haAoi = selectedArea.get('area_ha').getInfo();
        var statslCols = ['name',];
        f = ee.Feature(null).copyProperties(selectedArea, statslCols);
    }
    else {
        // Calculate all statistics required for info panel
        var ftcSampleStats = mdlPrecalculation.precalculate(m.ftcAoi, []);
        f = ftcSampleStats.first();
    }
    c.rp.stats.ge.pnlEntryArea.widgets().get(1).setValue(formatNumber(m.haAoi, 2) + ' ha.');
    m.evalSet["stats"] = true;
    f.evaluate(function (ef, error) {
        delete m.evalSet["stats"];
        if (Object.keys(m.evalSet).length === 0) {
            handleEvaluating(false);
        }
        if (ef) {
            c.rp.stats.ge.pnlEntryAreaName.widgets().get(1).setValue(ef.properties.name);
        }
        else {
            c.rp.lblMessages.setValue(error);
        }
    });
    try {
        c.cp.map.centerObject(m.ftcAoi);
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblSelectedAOI), ui.Map.Layer(m.ftcAoi.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI, true));
    } catch (error) {
        c.rp.lblMessages.setValue(error);
    }
    c.cp.map.drawingTools().setSelected(null);
    // Show only charts related to opened panel on the left (General|Multicriteria|Transitions)
    //handleChartsPanelsShown();
    // Generate all transitions related charts for selected area 
    setupTransitionsCharts();
};
var handleChangeLevel2 = function (level2Code) {
    m.levelAoi = m.labels.lblLevel2;
    m.ftcAoi = ftc2.filter(ee.Filter.eq('ADM2CD_CODE', level2Code));
    m.precalculated = true;
    showInfoSelectedAoi();
};
var handleChangeLevel1 = function (level1Code) {
    if (level1Code !== null) {
        m.levelAoi = m.labels.lblLevel1;
        m.ftcAoi = ftc1.filter(ee.Filter.eq('ADM1CD', level1Code));
        m.precalculated = true;
        showInfoSelectedAoi();
        // load level 2
        c.lp.levels.selLevel2.setPlaceholder(m.labels.lblLoadingLevel2);
        c.lp.levels.selLevel2.items().reset([]);
        var namesLevel2 = m.ftcLelvel2.filter(ee.Filter.eq('ADM1CD', level1Code)).aggregate_array('ADM2NM');
        var codesLevel2 = m.ftcLelvel2.filter(ee.Filter.eq('ADM1CD', level1Code)).aggregate_array('ADM2CD');
        namesLevel2.getInfo(function (names2) {
            codesLevel2.getInfo(function (codes2) {
                var siLevel2 = [];
                for (var i = 0; i < names2.length; i++) {
                    siLevel2.push({
                        label: names2[i],
                        value: codes2[i]
                    });
                }
                siLevel2.sort(sortByLabel);
                c.lp.levels.selLevel2.unlisten();
                c.lp.levels.selLevel2.setValue(null);
                c.lp.levels.selLevel2.items().reset(siLevel2);
                c.lp.levels.selLevel2.setPlaceholder(m.labels.lblSelectLevel2);
                c.lp.levels.selLevel2.onChange(handleChangeLevel2);
            });
        });
    }
};
var resetLevelsSelects = function () {
    c.lp.levels.selLevel1.unlisten();
    c.lp.levels.selLevel2.unlisten();
    c.lp.levels.selLevel1.items().reset(m.siLevel1);
    c.lp.levels.selLevel1.setPlaceholder(m.labels.lblSelectLevel1);
    c.lp.levels.selLevel1.setValue(null);
    c.lp.levels.selLevel2.items().reset([]);
    c.lp.levels.selLevel2.setPlaceholder(m.labels.lblSelectLevel1First);
    c.lp.levels.selLevel2.setValue(null);
    c.lp.levels.selLevel1.onChange(handleChangeLevel1);
    c.lp.levels.selLevel2.onChange(handleChangeLevel2);
};
/** Handles value selection in countries/territories dropdown */
c.lp.levels.selLevel1.onChange(handleChangeLevel1);
/* Handle click on selected layer */
c.cp.map.onClick(function (coords) {
    c.lp.flyTo.txtLon.setValue(coords.lon);
    c.lp.flyTo.txtLat.setValue(coords.lat);
    if (Object.keys(m.evalSet).length === 0 && !c.lp.dt.pnlContainer.style().get('shown')) {
        if (m.ftcClickOn === null) {
            c.rp.pnlMessages.style().set({ shown: true });
            c.rp.lblMessages.setValue(m.labels.lblSelectLayer);
            return;
        }
        c.cp.map.widgets().remove(c.cp.pnlCombinedLegend);
        c.rp.lblMessages.setValue(m.labels.lblProcessingArea);
        c.rp.pnlMessages.style().set({ shown: true });
        var ftcCheck = m.ftcClickOn.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
        ftcCheck.size().getInfo(function (size) {
            if (size > 0) {
                if (size === 2) {
                    m.ftcAoi = ftcCheck.filterMetadata('container', 'equals', 0);
                }
                else {
                    m.ftcAoi = ftcCheck;
                }
                resetLevelsSelects();
                m.precalculated = true;
                Object.keys(m.assetsClick).forEach(function (key) {
                    if (m.assetsClick[key] === m.ftcClickOn) {
                        m.levelAoi = key;
                    }
                });
                showInfoSelectedAoi();
            }
            else {
                c.rp.pnlMessages.style().set({ shown: true });
                c.rp.lblMessages.setValue(m.labels.lblNoFeature);
            }
        });
    }
});
/** Shows/hides layers checked in Transitions panel*/
var handleTransitionsLayersVisInPanel = function (show, panelLayers, te) {
    for (var i = panelLayers.widgets().length() - 1; i >= 0; i--) {
        var chk = panelLayers.widgets().get(i).widgets().get(0);
        if (chk.getValue()) {
            showLayer(te[i].label, show);
        }
    }
};
m.transitionsSources.forEach(function (source, i) {
    c.lp['tr' + i].btnTransitions.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        // Show/hide panel
        c.lp['tr' + i].pnlContainer.style().set({ shown: !c.lp['tr' + i].pnlContainer.style().get('shown') });
        handleTransitionsLayersVisInPanel(c.lp['tr' + i].pnlContainer.style().get('shown'), c.lp['tr' + i].pnlLayers, c.lp['tr' + i].te);
        showFrontLayerLegend();
        //handleChartsPanelsShown();
    });
    c.rp['tr' + i].btnTransitions.onClick(function () {
        c.rp['tr' + i].pnlContainer.style().set({ shown: !c.rp['tr' + i].pnlContainer.style().get('shown') });
    })
})
/** Reloads transitions layers according to year and source selected*/
var resetTransitionsLayers = function (year, trp) {
    var source = c.lp[trp].source;
    var pnlLayers = c.lp[trp].pnlLayers;
    var lcFinalYear = source.lcYears[source.lcYears.length - 1];
    // Update check labels with selected year
    pnlLayers.widgets().get(0).widgets().get(0).setLabel(m.labels.lblLandCover + ' ' + year);
    pnlLayers.widgets().get(1).widgets().get(0).setLabel(m.labels.lblLandCover + ' ' + lcFinalYear);
    pnlLayers.widgets().get(2).widgets().get(0).setLabel(m.labels.lblGains + ' ' + year + ' - ' + lcFinalYear);
    pnlLayers.widgets().get(3).widgets().get(0).setLabel(m.labels.lblLosses + ' ' + year + ' - ' + lcFinalYear);
    pnlLayers.widgets().get(4).widgets().get(0).setLabel(m.labels.lblStateLayer + ' ' + year + ' - ' + lcFinalYear);
    // Reload layers
    var imgFrom = source.imgLcAll.select('y' + year).clip(ftc0);
    var lyrFrom = ui.Map.Layer(imgFrom.visualize(source.lcCatVis.vis), {}, trp + m.labels.lblFromLC, pnlLayers.widgets().get(0).widgets().get(0).getValue());
    c.cp.map.layers().set(m.namesLayers.indexOf(trp + m.labels.lblFromLC), lyrFrom);
    var imgFinal = source.imgLcAll.select('y' + lcFinalYear).clip(ftc0);
    var lyrfinal = ui.Map.Layer(imgFinal.visualize(source.lcCatVis.vis), {}, trp + m.labels.lblCurrentLC, pnlLayers.widgets().get(1).widgets().get(0).getValue());
    c.cp.map.layers().set(m.namesLayers.indexOf(trp + m.labels.lblCurrentLC), lyrfinal);
    var imgGains = source.imgTransitions.select('lc_gain_' + year + '_' + lcFinalYear).clip(ftc0);
    var lyrGains = ui.Map.Layer(imgGains.visualize(source.lcTransCatVis.vis), {}, trp + m.labels.lblGains, pnlLayers.widgets().get(2).widgets().get(0).getValue());
    c.cp.map.layers().set(m.namesLayers.indexOf(trp + m.labels.lblGains), lyrGains);
    var imgLosses = source.imgTransitions.select('lc_loss_' + year + '_' + lcFinalYear).clip(ftc0);
    var lyrLosses = ui.Map.Layer(imgLosses.visualize(source.lcTransCatVis.vis), {}, trp + m.labels.lblLosses, pnlLayers.widgets().get(3).widgets().get(0).getValue());
    c.cp.map.layers().set(m.namesLayers.indexOf(trp + m.labels.lblLosses), lyrLosses);
    var imgDegradation = source.imgTransitions.select('lc_degradation_' + year + '_' + lcFinalYear).clip(ftc0);
    var lyrDegradation = ui.Map.Layer(imgDegradation.visualize(source.lcDegCatVis.vis), {}, trp + m.labels.lblStateLayer, pnlLayers.widgets().get(4).widgets().get(0).getValue());
    c.cp.map.layers().set(m.namesLayers.indexOf(trp + m.labels.lblStateLayer), lyrDegradation);
    // Update transitions charts with new selected period                
    setupTransitionsCharts(source);
};
m.transitionsSources.forEach(function (source, i) {
    c.lp['tr' + i].selLCFromYears.onChange(function (year) {
        resetTransitionsLayers(year, 'tr' + i);
    })
})
c.lp.dt.btnDrawingTools.onClick(function () {
    // handle drawing panel 
    c.lp.dt.pnlContainer.style().set({ shown: !c.lp.dt.pnlContainer.style().get('shown') });
    if (!c.lp.dt.pnlContainer.style().get('shown')) {
        c.cp.map.drawingTools().stop();
    }
    else {
        c.lp.boundaries.selBoundariesLayer.setValue(m.labels.lblNone);
    }
    c.cp.map.drawingTools().setShown(c.lp.dt.pnlContainer.style().get('shown'));
    c.cp.map.drawingTools().layers().forEach(function (l) {
        l.setShown(c.lp.dt.pnlContainer.style().get('shown'));
    });
});
/** Creates a new layer with custom name in drawing tools */
c.lp.dt.btnAddLayer.onClick(function () {
    var paletteLayers = ['#ffb6fc', '#b797ff', '#6a5c5c', '#b3d2b6', '#06ffee', '#b63cff', '#9efba8', '#ff4848', '#ffffff'];
    if (c.lp.dt.txbLayerName.getValue().trim() !== '') {
        var gmlNewLayer = ui.Map.GeometryLayer({
            geometries: null,
            name: c.lp.dt.txbLayerName.getValue(),
            color: paletteLayers[c.cp.map.drawingTools().layers().length() % paletteLayers.length]
        });
        c.cp.map.drawingTools().layers().add(gmlNewLayer);
        c.lp.dt.txbLayerName.setValue('');
    }
});
/** Selects country */
c.cp.btnSelectContainer.onClick(function () {
    resetLevelsSelects();
    m.levelAoi = m.labels.lblSelectContainer;
    m.ftcAoi = ftc0;
    m.precalculated = true;
    c.cp.map.centerObject(m.ftcAoi);
    showInfoSelectedAoi();
});
/** Function to enable/disable ui components that allows new aoi query */
var handleEvaluating = function (disable) {
    c.lp.lan.selLanguage.setDisabled(disable);
    c.lp.customAsset.btnLoadAsset.setDisabled(disable);
    c.lp.levels.selLevel1.setDisabled(disable);
    c.lp.levels.selLevel2.setDisabled(disable);
    m.transitionsSources.forEach(function (source, n) {
        c.lp['tr' + n].selLCFromYears.setDisabled(disable);
    })
    c.lp.dt.btnZonalStats.setDisabled(disable);
    if (m.precalculated)
        c.rp.lblMessages.setValue(disable ? m.labels.lblProcessingArea : '');
    else
        c.rp.lblMessages.setValue(disable ? m.labels.lblProcessing : '');
    c.rp.pnlMessages.style().set({ shown: disable });
    c.cp.btnSelectContainer.setDisabled(disable);
};
c.cp.map.drawingTools().onSelect(function (geom, layer) {
    m.gmySelected = geom;
    m.selectedLayerName = layer.getName();
});
c.cp.map.drawingTools().onLayerSelect(function (layer) {
    if (layer === null) {
        m.gmySelected = undefined;
    }
});
/** If selected drawn-area is contained in region area and smaller than max area call showInfoSelectedAoi to
 * calculate on the fly stats.
 */
c.lp.dt.btnZonalStats.onClick(function () {
    if (m.gmySelected === undefined) {
        c.rp.lblMessages.setValue(m.labels.lblSelectGeometry);
        c.rp.pnlMessages.style().set({ shown: true });
        return;
    }
    if (m.gmySelected.type().getInfo() === 'Point') {
        c.rp.lblMessages.setValue(m.labels.lblSelectArea);
        c.rp.pnlMessages.style().set({ shown: true });
        return;
    }
    handleCustomFeatureCollection(m.gmySelected, m.labels.lblDrawFeature + m.selectedLayerName, m.labels.lblDrawingTools);
});
var createChart = function (
    chartDataTable,
    chartOptions,
    chartType,
    chartPanel
) {
    // Until chart is rendered, display 'Generating chart x' message
    chartPanel.widgets().set(0,
        ui.Label({
            value: m.labels.lblGeneratingCharts + ': ' + chartOptions.title + '...',
            style: s.styleMessage,
        })
    );
    // Add current evaluation to been procesed list
    m.evalSet[chartOptions.title] = true;
    chartDataTable.evaluate(function (dataTable, error) {
        delete m.evalSet[chartOptions.title];
        if (Object.keys(m.evalSet).length === 0) {
            handleEvaluating(false);
        }
        if (error) {
            chartPanel.widgets().get(0).setValue(m.labels.lblUnexpectedError + ':' + error);
            return;
        }
        var chart = ui
            .Chart(dataTable)
            .setChartType(chartType)
            .setOptions(chartOptions);
        chartPanel.widgets().set(0, chart); // replace 'Generating...' label with chart
    });
};
/** Setup transition charts, according to source and year selected in transition panel: LC comparison, LC net changes, LCxLC table*/
var setupTransitionsCharts = function (s) {
    // for each transition product generate charts
    m.transitionsSources.forEach(function (source, i) {
        if (s === undefined || source === s) {
            var pnl = c.rp['tr' + i].pnlContainer;
            pnl.clear();
            var catNames = source.lcCatVis.names.map(function (lbl) { return m.labels[lbl] })
            var selLCFromYears = c.lp['tr' + i].selLCFromYears
            var fromYear = selLCFromYears.getValue();
            var lcFinalYear = source.lcYears[source.lcYears.length - 1];
            // If custom drawn-area calculate required statistics for charts
            var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi, [
                'p_lc_' + fromYear + '_' + source.initials,
                'p_lc_' + lcFinalYear + '_' + source.initials,
                'p_lc_trans_' + source.initials + '_' + fromYear + '_' + lcFinalYear,
                'p_lc_degradation_' + source.initials + '_' + fromYear + '_' + lcFinalYear]);
            var namesLCColumns = [];
            source.lcCat.forEach(function (cat) { namesLCColumns.push('lc_' + cat) });
            // chartTrans1 Comparison column chart LC
            var lstFeatLCCombo = namesLCColumns.map(function (pName, i) {
                var initialValue = ftc.first().get(pName + '_' + fromYear + '_' + source.initials);
                var finalValue = ftc.first().get(pName + '_' + lcFinalYear + '_' + source.initials);
                var s = 'bar {fill-color:' + source.lcCatVis.vis.palette[i] + '; stroke-width: 0.5; stroke-color: #000000}';
                var lstValues = ee.List([catNames[i], initialValue, s, finalValue, s]);
                return ee.Feature(null, { row: lstValues });
            });
            var lstHeaderLCCombo = ee.List([
                [
                    { label: 'LC', role: 'domain', type: 'string' },
                    { label: fromYear, role: 'data', type: 'number' },
                    { label: 'color1', role: 'style', type: 'string' },
                    { label: lcFinalYear, role: 'data', type: 'number' },
                    { label: 'color2', role: 'style', type: 'string' },
                ],
            ]);
            var optionsLCCombo = {
                title: m.labels.lblLCPieChartChange + ' ' + fromYear + ' - ' + lcFinalYear + ' - ' + source.name,
                width: 600,
                height: 400,
                legend: { position: 'none' },
                seriesType: 'bars',
            };
            createChart(lstHeaderLCCombo.cat(ee.FeatureCollection(lstFeatLCCombo)
                .aggregate_array('row')), optionsLCCombo, 'ColumnChart',
                createChartPanel(pnl));
            // charTrans2 LC CANDLESTICK NET GAIN/LOSS CHART
            var lstFeatLCNetChange = namesLCColumns.map(function (pName, i) {
                var initialValue = ftc.first().get(pName + '_' + fromYear + '_' + source.initials);
                var finalValue = ftc.first().get(pName + '_' + lcFinalYear + '_' + source.initials);
                var diff = ee.Number(finalValue).subtract(ee.Number(initialValue)).format('%,.2f');
                var tt = ee.String(m.labels.lblDifference + ' (ha): ').cat(diff);
                var lstValues = ee.List([catNames[i], initialValue, initialValue, finalValue, finalValue, tt]);
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
                title: m.labels.lblNetLCChanges + ' ' + fromYear + ' - ' + lcFinalYear + ' - ' + source.name,
                legend: { position: 'none' },
                bar: { groupWidth: '100%' },
                candlestick: {
                    fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                    risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
                }
            };
            createChart(lstHeaderLCNetChange.cat(ee.FeatureCollection(lstFeatLCNetChange)
                .aggregate_array('row')), optionsLCNetChange, 'CandlestickChart',
                createChartPanel(pnl));
            // chartTrans3 Table with transitions LC/LC
            var lstFeatLCTransTable = source.lcCat.map(function (i) {
                var transition = 'lc_trans_' + source.initials + '_' + fromYear + '_' + lcFinalYear + '_' + i;
                var values = source.lcCat.map(function (c) {
                    return ee.Number(ftc.first().get(transition + '_' + c)).format('%.2f');
                });
                var lstValues = ee.List([catNames[i - 1]]).cat(values);
                return ee.Feature(null, { row: lstValues });
            });
            var colsT1 = [{ label: fromYear + '/' + lcFinalYear, role: 'domain', type: 'string' }];
            catNames.forEach(function (lc) {
                colsT1.push({ label: lc, role: 'data', type: 'number' });
            });
            var lstHeaderLCTransTable = ee.List([colsT1]);
            var optionsLCTransTable = {
                title: m.labels.lblTableLC + ' - ' + source.name,
                initial: fromYear,
                final: lcFinalYear,
                html: true,
                frozenColumns: 1,
            };
            createChart(lstHeaderLCTransTable.cat(ee.FeatureCollection(lstFeatLCTransTable)
                .aggregate_array('row')), optionsLCTransTable, 'Table',
                createChartPanel(pnl));
            // chart degradation state
            var lstFeatDeg = [1, 2, 3].map(function (deg, i) {
                var degColumn = 'lc_deg_' + source.initials + '_' + fromYear + '_' + lcFinalYear + '_' + deg;
                var lstValues = ee.List([m.labels[source.lcDegCatVis.names[i]], ftc.first().get(degColumn)]);
                return ee.Feature(null, { row: lstValues });
            });
            var lstHeaderDeg = ee.List([
                [
                    { label: 'Deg', role: 'domain', type: 'string' },
                    { label: 'Value', role: 'data', type: 'number' },
                ],
            ]);
            var optionsDeg = {
                title: m.labels.lblStateLayer + ' ' + fromYear + '-' + lcFinalYear,
                height: 350,
                legend: { position: 'top', maxLines: 1 },
                colors: source.lcDegCatVis.vis.palette,
            };
            createChart(lstHeaderDeg.cat(ee.FeatureCollection(lstFeatDeg)
                .aggregate_array('row')), optionsDeg, 'PieChart',
                createChartPanel(pnl));
        }
    })
};
// Layers names array ordered as stacked in the map
c.cp.map.layers().forEach(function (l) {
    m.namesLayers.push(l.getName());
});
c.cp.map.drawingTools().setDrawModes(['point', 'polygon', 'rectangle']);
var updateCollection = function () {
    var names = [];
    c.cp.map.drawingTools().layers().forEach(function (l) { return names.push(l.getName()) });
    var ftcDrawn = c.cp.map.drawingTools().toFeatureCollection("layerId");
    ftcDrawn = ftcDrawn.map(function (f) {
        return f
            .set("layerName", ee.List(names).get(f.get("layerId")))
            .set("layerId", f.get("layerId"));
    });
    ftcDrawn.size().evaluate(function (size) {
        if (size > 0) {
            c.lp.dt.lblJson.style().set('shown', true);
            c.lp.dt.lblJson.setValue(m.labels.lblUpdating + '...').setUrl(null);
            c.lp.dt.lblKml.style().set('shown', true);
            c.lp.dt.lblKml.setValue(m.labels.lblUpdating + '...').setUrl(null);
            ftcDrawn.getDownloadURL({
                format: 'kml',
                filename: m.labels.lblDownloadFileName,
                callback: function (url) {
                    c.lp.dt.lblKml.setValue('.kml').setUrl(url);
                    c.lp.dt.lblKml.setUrl(url);
                },
            });
            ftcDrawn.getDownloadURL({
                format: 'json',
                filename: m.labels.lblDownloadFileName,
                callback: function (url) {
                    c.lp.dt.lblJson.setValue('.json').setUrl(url);
                    c.lp.dt.lblJson.setUrl(url);
                },
            });
        }
        else {
            c.lp.dt.lblJson.style().set({ shown: false });
            c.lp.dt.lblKml.style().set({ shown: false });
        }
    });
};
c.cp.map.drawingTools().onDraw(updateCollection);
c.cp.map.drawingTools().onEdit(updateCollection);
c.cp.map.drawingTools().onErase(updateCollection);
/*******************************************************************************
* 6-Initialization *
******************************************************************************/
// Project areas of interest Level1/Level2 // TODO add project areas?
m.ftcLelvel1 = ftc1;// ftc1Project=ftc1.filterMetadata('Project', 'equals', 1);
m.ftcLelvel2 = ftc2;
m.ftcAoi = ftc0;
m.levelAoi = m.labels.lblSelectContainer;
m.haAoi = 0;
m.precalculated = true;
// Countries names for dropdown
m.names1 = m.ftcLelvel1.aggregate_array('ADM1NM').getInfo();
m.codes1 = m.ftcLelvel1.aggregate_array('ADM1CD').getInfo();
m.siLevel1 = [];
for (var i = 0; i < m.names1.length; i++) {
    m.siLevel1.push({
        label: m.names1[i],
        value: m.codes1[i]
    });
}
m.siLevel1.sort(sortByLabel);
c.lp.levels.selLevel1.items().reset(m.siLevel1);
showInfoSelectedAoi(); // on load show info of whole country region
showFrontLayerLegend(); // on load show the last selected general layer legend
//c.lp.boundaries.selBoundariesLayer.setValue(m.labels.lblLevel1); // by default set country boundaries layer selected for map click
c.cp.map.setControlVisibility(true, false, true, true, true, true, false);
}