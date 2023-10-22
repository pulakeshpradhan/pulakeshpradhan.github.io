var ftc2 = ee.FeatureCollection("users/wocatapps/World/SDG_Precal_SDG_Countries_v2_be_false"),
    ftc1 = ee.FeatureCollection("users/wocatapps/World/SDG_Precal_SDG_Continents_v2_be_false"),
    ftc0 = ee.FeatureCollection("users/wocatapps/World/SDG_Precal_SDG_World_v2_be_false");
/** 
 * App: Comparing LPD, Land Cover and Vegetation Trend Indicators in Kazakhstan
 *
 * The structure of this script follows UI Pattern Template script provided by 
 * Tyler Erickson (tylere@google.com) and Justin Braaten (braaten@google.com)
 * 
 * https://code.earthengine.google.com/bab500e5290d579f8d5f1cc5715314cf
 *   
 * 1-Model, 2-Components, 3-Composition, 4-Styling, 5-Behaviors, 6-Initialization
 * 
 * @author Eugenia Raviolo (eugenim.raviolo@gmail.com)
 * @author Cesar Garcia (cesarnon@gmail.com)
 * @author Ingrid Teich (ingridteich@gmail.com)
 */
var mdlLocalization = require('users/projectgeffao/World:SDG/localization.js');
var mdlPrecalculation = require('users/projectgeffao/World:SDG/precalculation.js');
// PREPARE NDVI Collections
// NDVI By Month/Year
var lstMonths = ee.List.sequence(1, 12);
var lstYears = ee.List.sequence(2000, 2021);
var imcMODISMonthYear = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate('2000-04-01', '2021-12-31')
    .select('NDVI');
var imcByMonthYear = ee.ImageCollection.fromImages(
    lstYears.map(function (y) {
        return lstMonths.map(function (m) {
            return imcMODISMonthYear
                .filter(ee.Filter.calendarRange(y, y, 'year'))
                .filter(ee.Filter.calendarRange(m, m, 'month'))
                .mean()
                .set('system:time_start', ee.Date.fromYMD(y, m, 1))
            //.set('month', m).set('year', y);
        });
    }).flatten());
// Get the NDVI, EVI and ESPI Annual mean for every calendar Year and replace bad quality pixels with anual mean
// make a list for calendar year computation / year 2000 is not complete so I added a +1
var lstCompleteYears = ee.List.sequence(2001, 2021);
var imcMODISYear = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate('2001-01-01', '2021-12-31');
var imcByYear = ee.ImageCollection.fromImages(
    lstCompleteYears.map(function (y) {
        // Get the subset for the target year
        var modisYear = imcMODISYear.filter(ee.Filter.calendarRange(y, y, 'year'));
        // Get the mean for NDVI
        var modisYearMean = modisYear.select('NDVI').mean();
        // Make a funtion to replace bad pixels with the mean
        var maskQAYear = function (image) {
            var image2 = image.select('NDVI');
            var image2 = image2.where(image.select("SummaryQA").gte(2), modisYearMean);
            return image2.rename('NDVI');
        };
        var ModisYearCorrected = modisYear.map(maskQAYear);
        var ModisYearCorrmean = ModisYearCorrected.mean()//.reproject('SR-ORG:6974', null, 250)
            .set('year', y)
            .set('system:time_start', ee.Date.fromYMD(y, 1, 1))
            .rename('AM');
        // Make a funtion to calculate ESPI
        var ModisYearmeanNDVI = ModisYearCorrmean.select('AM');
        var ModisYearstdDeNDVI = ModisYearCorrected.select('NDVI').reduce(ee.Reducer.stdDev()).rename('NDVIs');
        var ModisYearcvNDVI = ModisYearstdDeNDVI.divide(ModisYearmeanNDVI).rename('NDVIcv');
        var ipse = ModisYearmeanNDVI.multiply(ee.Image(1).subtract(ModisYearcvNDVI)).rename('ESPI');
        // Add ESPI to corrected NDVI and EVI and return
        return ModisYearCorrmean.addBands(ipse)
    }));
///---------------------------------------------------------------
initApp(mdlLocalization.languages[0]);
function initApp(lan) {
    /*******************************************************************************
     * Model *
     ******************************************************************************/
    // JSON object for storing the data model.
    var m = {};
    m.labels = mdlLocalization.getLocLabels(lan);
    m.precalculated = true;
    // More info & contact
    m.info = {
        contactEmail1: 'cesar.garcia@fao.org',
        logoAssetId: 'users/projectgeffao/',
        logoDimensions: '871x424',
        url: 'https://drive.google.com/file/d/1zq9QpIfHcXdvrnuLAMDtc9aeOkwfLZou/view?usp=sharing'
        //url: ''
    };
    m.ftcAOI = ftc0;
    m.levelAOI = m.labels.lblLevel0;
    // JRC
    m.imgSDGBaselineJRC = mdlPrecalculation.imgSDGBaselineJRC.unmask().clip(ftc0);
    m.imgSDGReportJRC = mdlPrecalculation.imgSDGReportJRC.unmask().clip(ftc0);
    m.imgSDGStatusJRC = mdlPrecalculation.imgSDGStatusJRC.unmask().clip(ftc0);
    m.imgSDGComparisonJRC = mdlPrecalculation.imgSDGComparisonJRC.unmask().clip(ftc0);
    // TRENDS.EARTH
    m.imgSDGBaselineTE = mdlPrecalculation.imgSDGBaselineTE.unmask().clip(ftc0);
    m.imgSDGReportTE = mdlPrecalculation.imgSDGReportTE.unmask().clip(ftc0);
    m.imgSDGStatusTE = mdlPrecalculation.imgSDGStatusTE.unmask().clip(ftc0);
    m.imgSDGComparisonTE = mdlPrecalculation.imgSDGComparisonTE.unmask().clip(ftc0);
    // FAOWOCAT
    m.imgSDGBaselineFAOWOCAT = mdlPrecalculation.imgSDGBaselineFAOWOCAT.unmask().clip(ftc0);
    m.imgSDGReportFAOWOCAT = mdlPrecalculation.imgSDGReportFAOWOCAT.unmask().clip(ftc0);
    m.imgSDGStatusFAOWOCAT = mdlPrecalculation.imgSDGStatusFAOWOCAT.unmask().clip(ftc0);
    m.imgSDGComparisonFAOWOCAT = mdlPrecalculation.imgSDGComparisonFAOWOCAT.unmask().clip(ftc0);
    // SIMPLIFIED
    m.imgSDGBaselineFAOSimp = mdlPrecalculation.imgSDGBaselineFAOSimp.unmask().clip(ftc0);
    m.imgSDGReportFAOSimp = mdlPrecalculation.imgSDGReportFAOSimp.unmask().clip(ftc0);
    m.imgSDGStatusFAOSimp = mdlPrecalculation.imgSDGStatusFAOSimp.unmask().clip(ftc0);
    m.imgSDGComparisonFAOSimp = mdlPrecalculation.imgSDGComparisonFAOSimp.unmask().clip(ftc0);
    m.names1 = ftc2.aggregate_array('ROMNAM').getInfo()
    m.codes1 = ftc2.aggregate_array('ISO3CD').getInfo();
    m.siLevel1 = [];
    for (var i = 0; i < m.names1.length; i++) {
        m.siLevel1.push({
            label: m.names1[i],
            value: m.codes1[i]
        });
    }
    m.siLevel1.sort(function (a, b) {
        if (a.label < b.label) { return -1; }
        if (a.label > b.label) { return 1; }
        return 0;
    });
    // Feature collections options to click on the map to obtain precalculated statistics
    m.assetsClick = {};
    m.assetsClick[m.labels.lblPixelExplorer] = null;
    m.assetsClick[m.labels.lblLevel1] = ftc1;
    m.assetsClick[m.labels.lblLevel2] = ftc2;
    // Feature collection to query on map click
    m.ftcClickOn = ftc2;
    m.lv = {
        highlight: { vis: { color: 'blue', fillColor: '00000000' } },
        //highlight: { vis: { color: '#b040d6', fillColor: '00000000' } },
        sdg1531: {
            vis: {
                min: 0, max: 4, opacity: 1,
                //palette: ['#000000', '#d63000', '#d6d5a9', '#1b931b'],
                palette: ['#000000', '#9b2779', '#ffffe0', '#006500', '#78a4e5'],
            },
            names: [
                m.labels.lblNoData,
                m.labels.lblSDGDegrading,
                m.labels.lblSDGStable,
                m.labels.lblSDGImproving,
            ]
        },
    };
    m.imagesOptions = {
        // Baselines
        'Baseline (JRC)':
        {
            imgMap: m.imgSDGBaselineJRC,
            lv: m.lv.sdg1531,
            scale: 993.9240249399425,
        },
        'Baseline (Trends.Earth)':
        {
            imgMap: m.imgSDGBaselineTE,
            lv: m.lv.sdg1531,
            scale: 309.22,
        },
        'Baseline (FAO-WOCAT)':
        {
            imgMap: m.imgSDGBaselineFAOWOCAT,
            lv: m.lv.sdg1531,
            scale: 250,
        },
        'Baseline (FAO Simplified)':
        {
            imgMap: m.imgSDGBaselineFAOSimp,
            lv: m.lv.sdg1531,
            scale: 250,
        },
        // Report
        'Reporting Period (JRC)':
        {
            imgMap: m.imgSDGReportJRC,
            lv: m.lv.sdg1531,
            scale: 993.9240249399425,
        },
        'Reporting Period (Trends.Earth)':
        {
            imgMap: m.imgSDGReportTE,
            lv: m.lv.sdg1531,
            scale: 309.22,
        },
        'Reporting Period (FAO-WOCAT)':
        {
            imgMap: m.imgSDGReportFAOWOCAT,
            lv: m.lv.sdg1531,
            scale: 250,
        },
        'Reporting Period (FAO Simplified)':
        {
            imgMap: m.imgSDGReportFAOSimp,
            lv: m.lv.sdg1531,
            scale: 250,
        },
        //Status Sub-indicator Based        
        'Status in 2019, Sub-indicator-based (JRC)':
        {
            imgMap: m.imgSDGStatusJRC,
            lv: m.lv.sdg1531,
            scale: 993.9240249399425,
        },
        'Status in 2019, Sub-indicator-based (Trends.Earth)':
        {
            imgMap: m.imgSDGStatusTE,
            lv: m.lv.sdg1531,
            scale: 309.22,
        },
        'Status in 2019, Sub-indicator-based (FAO-WOCAT)':
        {
            imgMap: m.imgSDGStatusFAOWOCAT,
            lv: m.lv.sdg1531,
            scale: 250,
        },
        'Status in 2019, Sub-indicator-based (FAO Simplified)':
        {
            imgMap: m.imgSDGStatusFAOSimp,
            lv: m.lv.sdg1531,
            scale: 250,
        },
        //Status SDG based       
        'Status in 2019, SDG-based (JRC)':
        {
            imgMap: m.imgSDGComparisonJRC,
            lv: m.lv.sdg1531,
            scale: 993.9240249399425,
        },
        'Status in 2019, SDG-based (Trends.Earth)':
        {
            imgMap: m.imgSDGComparisonTE,
            lv: m.lv.sdg1531,
            scale: 309.22,
        },
        'Status in 2019, SDG-based (FAO-WOCAT)':
        {
            imgMap: m.imgSDGComparisonFAOWOCAT,
            lv: m.lv.sdg1531,
            scale: 250,
        },
        'Status in 2019, SDG-based (FAO Simplified)':
        {
            imgMap: m.imgSDGComparisonFAOSimp,
            lv: m.lv.sdg1531,
            scale: 250,
        },
    };
    /*******************************************************************************
     * Components *
    ******************************************************************************/
    // Define a JSON object for storing UI components.
    var c = {};
    c.mapLeft = ui.Map({ style: { width: '40%' } });
    c.mapLeft.setControlVisibility(false);
    c.mapLeft.setOptions('HYBRID');
    c.mapRight = ui.Map({ style: { width: '40%' } });
    c.mapRight.setOptions('HYBRID');
    c.mapRight.setControlVisibility(false);
    c.selLeftLayers = ui.Select({ items: Object.keys(m.imagesOptions) });
    c.lblLeftOpacity = ui.Label(m.labels.lblFrontLayerOpacity);
    c.sldLeftOpacity = ui.Slider({
        min: 0,
        max: 1,
        value: 1,
        step: 0.1,
    });
    c.sldLeftOpacity.onSlide(function (value) {
        c.mapLeft.layers().get(0).setOpacity(value);
    });
    c.pnlLeftSlider = ui.Panel({
        widgets: [c.lblLeftOpacity, c.sldLeftOpacity],
        layout: ui.Panel.Layout.Flow('horizontal'),
    });
    c.pnlLeftLayerSelector = ui.Panel([c.selLeftLayers, c.pnlLeftSlider]);
    c.selRightLayers = ui.Select({ items: Object.keys(m.imagesOptions) });
    c.lblRightOpacity = ui.Label(m.labels.lblFrontLayerOpacity);
    c.sldRightOpacity = ui.Slider({
        min: 0,
        max: 1,
        value: 1,
        step: 0.1,
    });
    c.sldRightOpacity.onSlide(function (value) {
        c.mapRight.layers().get(0).setOpacity(value);
    });
    c.pnlRightSlider = ui.Panel({
        widgets: [c.lblRightOpacity, c.sldRightOpacity],
        layout: ui.Panel.Layout.Flow('horizontal'),
    });
    c.pnlRightLayerSelector = ui.Panel([c.selRightLayers, c.pnlRightSlider]);
    c.pnlLeftLegend = ui.Panel();
    c.btnLeftLegendClose = ui.Button({ label: m.labels.lblCloseLegend });
    c.btnLeftLegendClose.onClick(function () {
        c.pnlLeftLegend.style().set({ shown: !c.pnlLeftLegend.style().get('shown') });
        c.btnLeftLegendClose.setLabel(c.pnlLeftLegend.style().get('shown') ? m.labels.lblCloseLegend : m.labels.lblOpenLegend);
    });
    c.pnlLeftLegendContainer = ui.Panel({ widgets: [c.pnlLeftLegend, c.btnLeftLegendClose], style: { position: 'bottom-left' } });
    c.pnlLeftChart = ui.Panel({
        style: {
            width: '200px', height: '160px', margin: 0, padding: 0, position: 'bottom-left',
        }
    });
    c.pnlRightLegend = ui.Panel();
    c.btnRightLegendClose = ui.Button({ label: m.labels.lblCloseLegend });
    c.btnRightLegendClose.onClick(function () {
        c.pnlRightLegend.style().set({ shown: !c.pnlRightLegend.style().get('shown') });
        c.btnRightLegendClose.setLabel(c.pnlRightLegend.style().get('shown') ? m.labels.lblCloseLegend : m.labels.lblOpenLegend);
    });
    c.pnlRightLegendContainer = ui.Panel({ widgets: [c.pnlRightLegend, c.btnRightLegendClose], style: { position: 'bottom-right' } });
    c.pnlRightChart = ui.Panel({ style: { width: '200px', height: '160px', margin: 0, padding: 0, position: 'bottom-right' } });
    c.sppMaps = ui.SplitPanel({
        firstPanel: c.mapLeft,
        secondPanel: c.mapRight,
        wipe: true,
        style: { stretch: 'both' }
    });
    c.pnlOutput = ui.Panel();
    c.pnlOutput.style().set('width', '30%');
    c.lblMessages = ui.Label('');
    c.pnlMessages = ui.Panel({
        widgets: [c.lblMessages]
    });
    c.pnlIntro =
        ui.Panel([
            /*ui.Thumbnail({
                image: ee.Image(m.info.logoAssetId).visualize({
                    bands: ['b1', 'b2', 'b3'],
                    min: 0,
                    max: 255
                }),
                params: {
                    dimensions: m.info.logoDimensions,
                    format: 'png'
                },
            }),*/
            ui.Label({
                value: m.labels.lblTitle,
                style: { fontSize: '20px', fontWeight: 'bold' }
            }),
            ui.Label({
                value: m.labels.lblExpl1,
                style: { fontSize: '12px', margin: '0px 10px' }
            }),
            ui.Label({
                value: m.labels.lblAdditionalInfo,
                style: { fontSize: '12px', textAlign: 'rigth', color: 'blue' },
            }).setUrl(m.info.url),
            ui.Label(m.labels.lblClickMap),
            ui.Label(m.labels.lblExplore),
        ]);
    c.lan = {};
    c.lan.selLanguage = ui.Select({
        items: ['English'],
        value: lan
    });
    c.lblDisclaimer = ui.Label('(*) ' + m.labels.lblDisclaimer);
    c.levels = {};
    c.levels.lblChoose = ui.Label(m.labels.lblSelectLevel1Expl);
    c.levels.selLevel1 = ui.Select({
        items: m.siLevel1,
        placeholder: m.labels.lblSelectLevel1,
    });
    // Left Panel - Layer for boundaries selection
    c.boundaries = {};
    c.boundaries.lblChoose = ui.Label(m.labels.lblAssetClick);
    c.boundaries.selBoundariesLayer = ui.Select({
        items: Object.keys(m.assetsClick),
        value: m.labels.lblLevel2,
    });
    c.btnSelectContainer = ui.Button(m.labels.lblSelectContainer);
    c.levels.pnlSelectLevel1 = ui.Panel(
        [
            c.levels.lblChoose,
            ui.Panel([c.boundaries.selBoundariesLayer, c.btnSelectContainer], ui.Panel.Layout.flow('vertical'))
        ]
    );
    c.lblForm = ui.Label(m.labels.lblClickForm + m.countryName).setUrl(m.formId + m.countryName);
    c.pnlCharts = ui.Panel();
    c.lblLon = ui.Label();
    c.lblLat = ui.Label();
    c.pnlCoordinates = ui.Panel([c.lblLon, c.lblLat], ui.Panel.Layout.flow('horizontal'));
    /*******************************************************************************
     * Composition *
     ******************************************************************************/
    // Set the SplitPanel as the only thing in the UI root.
    ui.root.widgets().reset([c.sppMaps])
    ui.root.add(c.pnlOutput);
    c.lnkMaps = ui.Map.Linker([c.mapLeft, c.mapRight]);
    c.mapLeft.style().set('cursor', 'crosshair');
    c.mapRight.style().set('cursor', 'crosshair');
    c.mapLeft.add(c.pnlLeftLayerSelector);
    c.mapRight.add(c.pnlRightLayerSelector);
    c.pnlOutput.add(c.pnlMessages);
    c.pnlOutput.add(c.pnlIntro);
    //c.pnlOutput.add(c.lan.selLanguage);
    c.pnlOutput.add(c.boundaries.lblChoose);
    c.pnlOutput.add(c.levels.pnlSelectLevel1);
    c.pnlOutput.add(c.pnlCoordinates);
    c.pnlOutput.add(c.pnlCharts);
    c.pnlOutput.add(c.lblDisclaimer);
    /*******************************************************************************
     * 4-Styling *
     ******************************************************************************/
    // JSON object for defining CSS-like class style properties.
    var s = {};
    s.styleMessage = { color: 'gray', fontSize: '12px', padding: '2px 0px 2px 10px' };
    s.styleStatsValue = { fontSize: '12px', whiteSpace: 'pre' };
    s.styleStatsHeader = { fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' };
    s.styleInfoTitle = { fontSize: '16px', fontWeight: 'bold' };
    c.levels.selLevel1.style().set({ width: "50%", });
    c.lan.selLanguage.style().set({ width: '70%' });
    c.lblLeftOpacity.style().set({ fontSize: '12px' });
    c.lblLat.style().set({ fontSize: '12px' });
    c.lblLon.style().set({ fontSize: '12px' });
    c.lblDisclaimer.style().set({ fontSize: '10px', margin: '2px 10px' });
    // Messages Panel
    c.pnlMessages.style().set({ padding: '8px 15px' });
    c.lblMessages.style().set({ color: 'blue', fontSize: '12px' });
    c.lblMessages.style().set({ margin: '4px 0px' });
    c.boundaries.lblChoose.style().set({ fontSize: '12px', margin: '0px 10px' });
    c.boundaries.selBoundariesLayer.style().set({ width: '70%', margin: '0px 10px' });
    c.pnlLeftLayerSelector.style().set({ position: "top-left", margin: 0, padding: 0 });
    c.pnlLeftSlider.style().set({ position: "top-left", margin: 0, padding: 0 });
    c.pnlRightLayerSelector.style().set({ position: "top-right", margin: 0, padding: 0 });
    c.pnlRightSlider.style().set({ position: "top-right", margin: 0, padding: 0 });
    /*******************************************************************************
     * Behaviors *
    ******************  ************************************************************/
    c.lan.selLanguage.onChange(function (lan) { initApp(lan); });
    var formatNumber = function (number, digits) {
        return number.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
    }
    var setUpSDGCharts = function () {
        c.pnlCharts.clear();
        c.lblStatsTitle = ui.Label(m.labels.lblSelectedAOI);
        c.lblSummaryTitle = ui.Label(m.labels.lblDegSummary + ':');
        c.lblStatsTitle.style().set(s.styleInfoTitle);
        c.pnlEntryAreaName = ui.Panel({
            widgets: [ui.Label(m.labels.lblAreaName + ': '), ui.Label(m.labels.lblLoading)],
            layout: ui.Panel.Layout.Flow('horizontal')
        });
        c.pnlEntryTotalArea = ui.Panel({
            widgets: [ui.Label(m.labels.lblTotalArea + ': '), ui.Label(m.labels.lblLoading)],
            layout: ui.Panel.Layout.Flow('horizontal')
        });
        c.pnlEntryTotalLandArea = ui.Panel({
            widgets: [ui.Label(m.labels.lblTotalLandArea + ': '), ui.Label(m.labels.lblLoading)],
            layout: ui.Panel.Layout.Flow('horizontal')
        });
        c.pnlCharts.add(c.lblStatsTitle);
        c.pnlCharts.add(c.pnlEntryAreaName);
        c.pnlCharts.add(c.pnlEntryTotalArea);
        c.pnlCharts.add(c.pnlEntryTotalLandArea);
        c.pnlEntryAreaName.widgets().get(0).style().set(s.styleStatsHeader);
        c.pnlEntryTotalArea.widgets().get(0).style().set(s.styleStatsHeader);
        c.pnlEntryTotalLandArea.widgets().get(0).style().set(s.styleStatsHeader);
        c.pnlEntryAreaName.widgets().get(1).style().set(s.styleStatsValue);
        c.pnlEntryTotalArea.widgets().get(1).style().set(s.styleStatsValue);
        c.pnlEntryTotalLandArea.widgets().get(1).style().set(s.styleStatsValue);
        c.lblSummaryTitle.style().set(s.styleStatsHeader);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAOI : mdlPrecalculation.precalculate(m.ftcAoi,
            m.bestEffort,
            ['p_SDG_Baseline_JRC', 'p_SDG_Report_JRC', 'p_SDG_Status_JRC', 'p_SDG_Comparison_JRC',
                'p_SDG_Baseline_FAO_WOCAT', 'p_SDG_Report_FAO_WOCAT', 'p_SDG_Status_FAO_WOCAT', 'p_SDG_Comparison_FAO_WOCAT',
                'p_SDG_Baseline_TE', 'p_SDG_Report_TE', 'p_SDG_Status_TE', 'p_SDG_Comparison_FAO_TE'
            ]);
        var columnsPrefix = ['SDG_Bas', 'SDG_Rep', 'SDG_Sta', 'SDG_Com'];
        var layerTypes = [m.labels.lblBaseline, m.labels.lblReport, m.labels.lblStatus, m.labels.lblComparison];
        var ftcAux = ftc.map(function (f) {
            return ee.Feature(null).copyProperties(f);
        });
        ftcAux.first().evaluate(function (ef) {
            c.pnlEntryAreaName.widgets().get(1).setValue(ef.properties['name']);
            c.pnlEntryTotalArea.widgets().get(1).setValue(formatNumber(ef.properties['area_ha'], 0) + 'ha');
            var headerSummary = [{
                type: 'string',
                label: 'Product / Deg (%)',
                role: 'domain',
            },
            {
                type: 'number',
                label: 'JRC',
                role: 'data',
            },
            {
                type: 'number',
                label: 'TE',
                role: 'data',
            },
            {
                type: 'number',
                label: 'FAO WOCAT',
                role: 'data',
            },
            {
                type: 'number',
                label: 'FAO Simplified',
                role: 'data',
            },
            ];
            var dtDegSummary = [];
            dtDegSummary.push(headerSummary);
            var landJRC = ef.properties['SDG_Bas_JRC_0']
                + ef.properties['SDG_Bas_JRC_1']
                + ef.properties['SDG_Bas_JRC_2']
                + ef.properties['SDG_Bas_JRC_3'];
            var landTE = ef.properties['SDG_Bas_TE_0']
                + ef.properties['SDG_Bas_TE_1']
                + ef.properties['SDG_Bas_TE_2']
                + ef.properties['SDG_Bas_TE_3'];
            var landFAOWOCAT = ef.properties['SDG_Bas_FAO_WOCAT_0']
                + ef.properties['SDG_Bas_FAO_WOCAT_1']
                + ef.properties['SDG_Bas_FAO_WOCAT_2']
                + ef.properties['SDG_Bas_FAO_WOCAT_3'];
            var landFAOSimp = ef.properties['SDG_Bas_FAO_Simp_0']
                + ef.properties['SDG_Bas_FAO_Simp_1']
                + ef.properties['SDG_Bas_FAO_Simp_2']
                + ef.properties['SDG_Bas_FAO_Simp_3'];
            c.pnlEntryTotalLandArea.widgets().get(1).setValue(formatNumber(landJRC, 0) + 'ha');
            columnsPrefix.map(function (cat, i) {
                var v0 = ef.properties[cat + '_JRC_1'] * 100 / landJRC;
                var v1 = ef.properties[cat + '_TE_1'] * 100 / landTE;
                var v2 = ef.properties[cat + '_FAO_WOCAT_1'] * 100 / landFAOWOCAT;
                var v3 = ef.properties[cat + '_FAO_Simp_1'] * 100 / landFAOSimp;
                dtDegSummary.push([layerTypes[i], Math.round(v0 * 100) / 100, Math.round(v1 * 100) / 100, Math.round(v2 * 100) / 100, Math.round(v3 * 100) / 100]);
            });
            var chtDegSummary = ui
                .Chart(dtDegSummary)
                .setChartType('Table')
                .setOptions({
                    title: 'Summary - % Deg All products',
                    pageSize: 100,
                });
            c.pnlCharts.widgets().add(c.lblSummaryTitle);
            c.pnlCharts.widgets().add(chtDegSummary);
            var header = [{
                type: 'string',
                label: 'Product / Area (ha)',
                role: 'domain',
            },
            {
                type: 'number',
                label: m.lv.sdg1531.names[0],
                role: 'data',
            },
            {
                type: 'number',
                label: m.lv.sdg1531.names[1],
                role: 'data',
            },
            {
                type: 'number',
                label: m.lv.sdg1531.names[2],
                role: 'data',
            },
            {
                type: 'number',
                label: m.lv.sdg1531.names[3],
                role: 'data',
            },
            ]
            var dtJRC = [];
            dtJRC.push(header);
            var dtTE = [];
            dtTE.push(header);
            var dtFAOWOCAT = [];
            dtFAOWOCAT.push(header);
            var dtFAOSimp = [];
            dtFAOSimp.push(header);
            var dtAllProducts = [];
            dtAllProducts.push(header);
            columnsPrefix.map(function (cat, i) {
                var v0 = ef.properties[cat + '_JRC_0']//* 100 / ef.properties['area_ha'];
                var v1 = ef.properties[cat + '_JRC_1']//* 100 / ef.properties['area_ha'];
                var v2 = ef.properties[cat + '_JRC_2']//* 100 / ef.properties['area_ha'];
                var v3 = ef.properties[cat + '_JRC_3']//* 100 / ef.properties['area_ha'];
                dtJRC.push([layerTypes[i], v0, v1, v2, v3]);
                dtAllProducts.push([layerTypes[i] + ' (JRC)', Math.round(v0), Math.round(v1), Math.round(v2), Math.round(v3)]);
                //table in with decimal
                //dtAllProducts.push([layerTypes[i]+ ' (JRC)', Math.round(v0*100)/100, Math.round(v1*100)/100, Math.round(v2*100)/100, Math.round(v3*100)/100]);
            });
            var chtJRC = ui
                .Chart(dtJRC)
                .setChartType('BarChart')
                .setOptions({
                    title: m.labels.lblSDG1531UNCCDDefault,
                    width: 600,
                    height: 400,
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    isStacked: 'relative',
                    isStacked: 'percent',
                    colors: m.lv.sdg1531.vis.palette,
                });
            c.pnlCharts.widgets().add(chtJRC);
            // TE
            columnsPrefix.map(function (cat, i) {
                var v0 = ef.properties[cat + '_TE_0']//* 100 / ef.properties['area_ha'];
                var v1 = ef.properties[cat + '_TE_1']//* 100 / ef.properties['area_ha'];
                var v2 = ef.properties[cat + '_TE_2']//* 100 / ef.properties['area_ha'];
                var v3 = ef.properties[cat + '_TE_3']//* 100 / ef.properties['area_ha'];
                dtTE.push([layerTypes[i], v0, v1, v2, v3]);
                dtAllProducts.push([layerTypes[i] + ' (TE)', Math.round(v0), Math.round(v1), Math.round(v2), Math.round(v3)]);
                //table in with decimal
                //dtAllProducts.push([layerTypes[i]+ ' (TE)', Math.round(v0*100)/100, Math.round(v1*100)/100, Math.round(v2*100)/100, Math.round(v3*100)/100]);
            });
            var chtTE = ui
                .Chart(dtTE)
                .setChartType('BarChart')
                .setOptions({
                    title: m.labels.lblSDG1531TrendsEarth,
                    width: 600,
                    height: 400,
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    isStacked: 'percent',
                    colors: m.lv.sdg1531.vis.palette,
                });
            c.pnlCharts.widgets().add(chtTE);
            // FAO WOCAT
            columnsPrefix.map(function (cat, i) {
                var v0 = ef.properties[cat + '_FAO_WOCAT_0']//* 100 / ef.properties['area_ha'];
                var v1 = ef.properties[cat + '_FAO_WOCAT_1']//* 100 / ef.properties['area_ha'];
                var v2 = ef.properties[cat + '_FAO_WOCAT_2']//* 100 / ef.properties['area_ha'];
                var v3 = ef.properties[cat + '_FAO_WOCAT_3']//* 100 / ef.properties['area_ha'];
                dtFAOWOCAT.push([layerTypes[i], v0, v1, v2, v3]);
                dtAllProducts.push([layerTypes[i] + ' (FAO Wocat)', Math.round(v0), Math.round(v1), Math.round(v2), Math.round(v3)]);
                //table in with decimal
                //dtAllProducts.push([layerTypes[i]+ ' (FAO Wocat)', Math.round(v0*100)/100, Math.round(v1*100)/100, Math.round(v2*100)/100, Math.round(v3*100)/100]);
            });
            var chtFAOWOCAT = ui
                .Chart(dtFAOWOCAT)
                .setChartType('BarChart')
                .setOptions({
                    title: m.labels.lblSDG1531FAOWOCAT,
                    width: 600,
                    height: 400,
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    isStacked: 'percent',
                    colors: m.lv.sdg1531.vis.palette,
                });
            c.pnlCharts.widgets().add(chtFAOWOCAT);
            // FAO Simple
            columnsPrefix.map(function (cat, i) {
                var v0 = ef.properties[cat + '_FAO_Simp_0']//* 100 / ef.properties['area_ha'];
                var v1 = ef.properties[cat + '_FAO_Simp_1']//* 100 / ef.properties['area_ha'];
                var v2 = ef.properties[cat + '_FAO_Simp_2']//* 100 / ef.properties['area_ha'];
                var v3 = ef.properties[cat + '_FAO_Simp_3']//* 100 / ef.properties['area_ha'];
                dtFAOSimp.push([layerTypes[i], v0, v1, v2, v3]);
                dtAllProducts.push([layerTypes[i] + ' (FAO Simp)', Math.round(v0), Math.round(v1), Math.round(v2), Math.round(v3)]);
                //table in with decimal
                //dtAllProducts.push([layerTypes[i] + ' (FAO Simp)', Math.round(v0*100)/100, Math.round(v1*100)/100, Math.round(v2*100)/100, Math.round(v3*100)/100]);
            });
            var chtFAOSimple = ui
                .Chart(dtFAOSimp)
                .setChartType('BarChart')
                .setOptions({
                    title: m.labels.lblSDG1531FAOSimp,
                    width: 600,
                    height: 400,
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    isStacked: 'percent',
                    colors: m.lv.sdg1531.vis.palette,
                });
            c.pnlCharts.widgets().add(chtFAOSimple);
            var chtAllProducts = ui
                .Chart(dtAllProducts)
                .setChartType('Table')
                .setOptions({
                    title: 'All products',
                    legend: { position: 'none' },
                    pageSize: 100,
                });
            c.pnlCharts.widgets().add(chtAllProducts);
        });
    };
    c.boundaries.selBoundariesLayer.onChange(function (v) {
        m.ftcClickOn = m.assetsClick[v];
    });
    c.selLeftLayers.onChange(function (layerSelected) {
        c.mapLeft.layers().set(0, ui.Map.Layer(m.imagesOptions[layerSelected].imgMap.visualize(m.imagesOptions[layerSelected].lv.vis)));
    });
    c.selRightLayers.onChange(function (layerSelected) {
        c.mapRight.layers().set(0, ui.Map.Layer(m.imagesOptions[layerSelected].imgMap.visualize(m.imagesOptions[layerSelected].lv.vis)));
    });
    var handleOnMapClick = function (coords) {
        c.pnlCharts.clear();
        // Update the lon/lat panel with values from the click event.
        c.lblLon.setValue(m.labels.lblLongitude + ': ' + coords.lon.toFixed(2));
        c.lblLat.setValue(m.labels.lblLatitude + ': ' + coords.lat.toFixed(2));
        var gmyPoint = ee.Geometry.Point(coords.lon, coords.lat);
        if (c.boundaries.selBoundariesLayer.getValue() === m.labels.lblPixelExplorer) {
            // Create an NDVI phenology year chart.
            var phenoChart = ui.Chart.image.series(imcByYear, gmyPoint, ee.Reducer.mean(), 250);
            phenoChart.setOptions({
                title: m.labels.lblAnnualIndex,
                vAxis: { title: m.labels.lblIndexAxis },//, maxValue: 9000},
                hAxis: { title: m.labels.lblCalendarYear, format: 'yyyy', gridlines: { count: 7 } },
            });
            c.pnlCharts.widgets().set(1, phenoChart);
            // Create an NDVI calendar yearchart.
            var calChart = ui.Chart.image.series(imcByMonthYear, gmyPoint, ee.Reducer.mean(), 250);
            calChart.setOptions({
                title: m.labels.lblMonthlyNDVI,
                vAxis: { title: m.labels.lblIndexAxis },
                hAxis: { title: m.labels.lblCalendarYear, format: 'yyyy', gridlines: { count: 7 } },
            });
            c.pnlCharts.widgets().set(2, calChart);
        }
        // select country or continent
        else {
            if (m.ftcClickOn === null) {
                c.pnlMessages.style().set({ shown: true });
                c.lblMessages.setValue(m.labels.lblSelectLayer);
                return;
            }
            var ftcCheck = m.ftcClickOn.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
            ftcCheck.size().getInfo(function (size) {
                if (size > 0) {
                    m.ftcAOI = ftcCheck;
                    m.precalculated = true;
                    Object.keys(m.assetsClick).forEach(function (key) {
                        if (m.assetsClick[key] === m.ftcClickOn) {
                            m.levelAOI = key;
                        }
                    });
                    showInfoAOI();
                }
                else {
                    c.pnlMessages.style().set({ shown: true });
                    c.lblMessages.setValue(m.labels.lblNoFeature);
                }
            });
        }
    };
    c.mapLeft.onClick(handleOnMapClick);
    c.mapRight.onClick(handleOnMapClick);
    var showInfoAOI = function () {
        if (m.levelAOI === m.labels.lblLevel0 ||
            m.levelAOI === m.labels.lblLevel1) {
            c.mapLeft.setCenter(0, 40, 0);
        }
        else {
            c.mapLeft.centerObject(m.ftcAOI);
        }
        //var ftcAux = m.levelAOI === m.labels.lblLevel0 ? ftc0 : m.ftcAOI;
        var ftcAux = m.levelAOI === m.labels.lblLevel0 ? ee.FeatureCollection(ee.Feature(null)) : m.ftcAOI;
        c.mapLeft.layers().set(1, ui.Map.Layer(ftcAux.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI));
        c.mapRight.layers().set(1, ui.Map.Layer(ftcAux.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI));
        setUpSDGCharts();
    }
    var handleChangeLevel1 = function (level1Code) {
        if (level1Code !== null) {
            m.levelAOI = m.labels.lblLevel1;
            m.ftcAOI = ftc2.filter(ee.Filter.eq('ISO3CD', level1Code));
            showInfoAOI();
        }
    }
    var handleClickSelectContainer = function () {
        m.levelAOI = m.labels.lblLevel0;
        m.ftcAOI = ftc0;
        showInfoAOI();
    };
    c.btnSelectContainer.onClick(handleClickSelectContainer);
    c.levels.selLevel1.onChange(handleChangeLevel1);
    /*******************************************************************************
     * Initialize *
    *****************************************************************************/
    c.selLeftLayers.setValue('Baseline (JRC)', true);
    c.selRightLayers.setValue('Baseline (Trends.Earth)', true);
    showInfoAOI();
    c.mapLeft.setLocked(false, 2, 24);
    c.mapRight.setLocked(false, 2, 24);
}