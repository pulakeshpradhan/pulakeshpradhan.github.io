// Load Trend index
var imgTrajectCalNDVI_MK_Sen_7clas_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/TrajectCalNDVI_MK_Sen_7clas_2000_2018"),
    imgTrajectCalESPI_MK_Sen_7clas_2000_2018_v1 = ee.Image("users/cesarnon/LDN_world_index/TrajectCalESPI_MK_Sen_7clas_2000_2018_v1"),
    imgSWATI_Cal7Clas_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal7Clas_2000_2018"),
    imgSWATI_Cal_ESPI7Clas_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal_ESPI7Clas_2000_2018"),
    imgSWATIslope_Cal_perc_7clas_nosig_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/SWATIslope_Cal_perc_7clas_nosig_2000_2018"),
    imgSWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018 = ee.Image("users/cesarnon/LDN_world_index/SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018");
// Load LPD
var imgLPD_FAO = ee.Image("users/projectgeffao/World/LPD_world_2001_2020_World"),
    imgLPD_MK = ee.Image("users/projectgeffao/World/LPD_world_2001_2020_v2_MK_Bio_State"),
    imgLPD_MK_NoQA = ee.Image("users/projectgeffao/World/LPD_world_2001_2020_v2_MK_Bio_State_NoQA"),
    imgLPD_MK_MTDI = ee.Image("users/projectgeffao/World/LPD_world_2001_2020_v2_MK_MTDI_Bio_State"),
    imgLPD_MK_MTDI_NoQA = ee.Image("users/projectgeffao/World/LPD_world_2001_2020_v2_MK_MTDI_Bio_State_NoQA"),
    imgLPD_MK_MTDI3 = ee.Image("users/projectgeffao/World/LPD_world_2001_2020_v2_MK_MTDI3_Bio_State"),
    imgLPD_JRCreporting = ee.Image("users/geflanddegradation/toolbox_datasets/lpd_jrc_reporting_2004_2019_1km"),
    imgLPD_TE2001_2020 = ee.Image("users/wocatapps/Kazakhstan/LPD_Trends_Earth2001_2020_byte");
//Load Land Covers
var    imgLCcoper = ee.Image("users/projectgeffao/World/Copernicus_LC_UNCCD_2015_2019_World"),
    imgLCesa = ee.Image("users/projectgeffao/World/ESA_LC_UNCCD_1992_2018_World"),
    imgLCesri = ee.Image("users/cesarnon/World/esri_lulc10_UNCCDcat_World");
//Load Features
var    ftcUNBorders = ee.FeatureCollection("users/projectgeffao/World/Borders/UN_Res0_ADM0_BNDA_CTY"),
    ftc1 = ee.FeatureCollection('users/projectgeffao/Kazakhstan/kaz_admbnda_adm1_2019'),
    ftc0 = ee.FeatureCollection('users/projectgeffao/Kazakhstan/ADM0_2019_Kaz');
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
var mdlLegends = require('users/projectgeffao/modules:legends2.js');
var mdlLocalization = require('users/wocatapps/Kazakhstan:localization.js');
// var ftc0 =  ftcUNBorders.filter(ee.Filter.eq('ISO3CD', 'KAZ'));
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
var lstCompleteYears = ee.List.sequence(2001, 2020);
var imcMODISYear = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate('2001-01-01', '2020-12-31');
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
    m.formIdEn = 'https://docs.google.com/forms/d/e/1FAIpQLSflLxor6jL09PIp3Sy-DNzgK715WhIS0GkrKzC8YPJKvUiNiw/viewform?usp=pp_url&entry.1605405469=';
    m.formIdRu = 'https://docs.google.com/forms/d/e/1FAIpQLSfJ5TCRq0nDwXQ71tbzuyyk3ozMGADwiX4qs8oht2UzWBcqWg/viewform?usp=pp_url&entry.1605405469=';
    m.formId = lan === mdlLocalization.languages[0] ? m.formIdEn : m.formIdRu;
    m.countryName = lan === mdlLocalization.languages[0] ? ftc0.first().get('ADM0_EN').getInfo() : ftc0.first().get('ADM0_RU').getInfo();
    // More info & contact
    m.info = {
        contactEmail1: 'cesar.garcia@fao.org',
        logoAssetId: 'users/projectgeffao/Kazakhstan/App_logo1',
        logoDimensions: '871x424',
        url: 'https://docs.google.com/presentation/d/1HYDpSLywIGs0XWiErRYOjLo9Xdasc0Q9/edit?usp=sharing&ouid=108760819550965797023&rtpof=true&sd=true'
    };
    m.ftcAOI = ftc0;
    m.levelAOI = m.labels.lblLevel0;
    m.imgCOP2019 = imgLCcoper.select('y2019').clip(ftc0);
    m.imgESA2018 = imgLCesa.select('y2018').clip(ftc0);
    m.imgLCesri2020 = imgLCesri.clip(ftc0);
    m.imgLPDfao = imgLPD_FAO.unmask().clip(ftc0);
    m.imgLPDmkmtdi3 = imgLPD_MK_MTDI3.unmask().clip(ftc0);
    m.imgLPDmkmtdi = imgLPD_MK_MTDI.unmask().clip(ftc0);
    m.imgLPDmk = imgLPD_MK.unmask().clip(ftc0);
    m.imgLPDjrc = imgLPD_JRCreporting.unmask().clip(ftc0);
    m.imgLPDte = imgLPD_TE2001_2020.unmask().clip(ftc0);
    m.imgTrendsAll = imgSWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018.rename('SWATIslope_ESPI')
        .addBands(imgSWATIslope_Cal_perc_7clas_nosig_2000_2018.rename('SWATIslope_AM'))
        .addBands(imgSWATI_Cal_ESPI7Clas_2000_2018.rename('SWATI_ESPI'))
        .addBands(imgSWATI_Cal7Clas_2000_2018.rename('SWATI_AM'))
        .addBands(imgTrajectCalESPI_MK_Sen_7clas_2000_2018_v1.rename('LTT_ESPI'))
        .addBands(imgTrajectCalNDVI_MK_Sen_7clas_2000_2018.rename('LTT_AM'))
        .clip(ftc0);
    // Oblasts names for dropdown
    m.names1= lan === mdlLocalization.languages[0] ?  ftc1.aggregate_array('ADM1_EN').getInfo() : ftc1.aggregate_array('ADM1_RU').getInfo();
   //m.names1 = ftc1.aggregate_array('ADM1_RU').getInfo();
    m.codes1 = ftc1.aggregate_array('ADM1_PCODE').getInfo();
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
    m.lv = {
        lc: {
            vis: {
                min: 0, max: 7, opacity: 1,
                palette: ["#040404", '#377e3f', '#c19511', '#fcdb00', '#18eebe', '#d7191c', '#cfdad2', '#4458eb'],
            },
            names: [
                m.labels.lblNoData,
                m.labels.lblTreeCovered,
                m.labels.lblGrassland,
                m.labels.lblCropland,
                m.labels.lblWetland,
                m.labels.lblArtificial,
                m.labels.lblOtherLand,
                m.labels.lblWaterbody,
            ],
            cat: [0, 1, 2, 3, 4, 5, 6, 7],
        },
        lpd: {
            vis: {
                min: 0, max: 5, opacity: 1,
                palette: ["#040404", '#f23c46', '#e9a358', '#e5e6b3', '#a9afae', '#267300'],
            },
            names: [
                m.labels.lblNonVegetatedArea,
                m.labels.lblDeclining,
                m.labels.lblEarlySignDecline,
                m.labels.lblStableButStressed,
                m.labels.lblStable,
                m.labels.lblIncreasing,
            ],
            cat: [0, 1, 2, 3, 4, 5]
        },
        trend: {
            vis: {
                min: 0, max: 7, opacity: 1,
                palette: ["#040404", "#900a03", "#f23939", "#ff7d7d", "#dbd9b2", "#4cfe36", "#38b504", "#257703"]
            },
            names: [
                m.labels.lblTrendNoData,
                m.labels.lblTrendStrongNegative,
                m.labels.lblTrendMediymNegative,
                m.labels.lblTrendLightNegative,
                m.labels.lblTrendNoSignificative,
                m.labels.lblTrendLightPossitive,
                m.labels.lblTrendMediumPossitive,
                m.labels.lblTrendStrongPossitive,
            ],
            cat: [0, 1, 2, 3, 4, 5, 6, 7]
        },
        highlight: { vis: { color: '#b040d6', fillColor: '00000000' } },
    };
    m.imagesOptions = {
/*
        'Trend LTT_AM': {
            imgMap: m.imgTrendsAll.select('LTT_AM'),
            lv: m.lv.trend,
            scale: 250,
        },
        'Trend LTT_ESPI':
        {
            imgMap: m.imgTrendsAll.select('LTT_ESPI'),
            lv: m.lv.trend,
            scale: 250,
        },
        'Trend SWATI_AM':
        {
            imgMap: m.imgTrendsAll.select('SWATI_AM'),
            lv: m.lv.trend,
            scale: 250,
        },
        'Trend SWATI_ESPI':
        {
            imgMap: m.imgTrendsAll.select('SWATI_ESPI'),
            lv: m.lv.trend,
            scale: 250,
        },
*/        
        'Map LC 1':
        {
            imgMap: m.imgCOP2019,
            lv: m.lv.lc,
            scale: 100,
        },
        'Map LC 2':
        {
            imgMap: m.imgESA2018,
            lv: m.lv.lc,
            scale: 300,
        },
        'Map LC 3':
        {
            imgMap: m.imgLCesri2020,
            lv: m.lv.lc,
            scale: 10,
        },
        'Map LPD 1':
        {
            imgMap: m.imgLPDfao,
            lv: m.lv.lpd,
            scale: 250,
        },
        'Map LPD 2':
        {
            imgMap: m.imgLPDmkmtdi3,
            lv: m.lv.lpd,
            scale: 250,
        },
        'Map LPD 3':
        {
            imgMap: m.imgLPDte,
//            imgMap: m.imgLPDmkmtdi,
            lv: m.lv.lpd,
            scale: 250,
        },
        'Map LPD 4':
        {
            imgMap: m.imgLPDmkmtdi,
            lv: m.lv.lpd,
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
    // ui.Label(m.labels.lblChooseImage),
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
    //ui.Label(m.labels.lblChooseImage)
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
    c.chkLeftBestEffort = ui.Checkbox('Best Effort', true);
    c.chkLeftBestEffort.style().set({ position: 'bottom-left' });
    c.chkRightBestEffort = ui.Checkbox('Best Effort', true);
    c.chkRightBestEffort.style().set({ position: 'bottom-right' });
    c.sppMaps = ui.SplitPanel({
        firstPanel: c.mapLeft,
        secondPanel: c.mapRight,
        wipe: true,
        style: { stretch: 'both' }
    });
    c.pnlOutput = ui.Panel();
    c.pnlOutput.style().set('width', '20%');
    c.pnlIntro =
        ui.Panel([
            ui.Thumbnail({
                image: ee.Image(m.info.logoAssetId).visualize({
                    bands: ['b1', 'b2', 'b3'],
                    min: 0,
                    max: 255
                }),
                params: {
                    dimensions: m.info.logoDimensions,
                    format: 'png'
                },
            }),
            ui.Label({
                value: m.labels.lblClickHereMoreInfo,
                style: { fontSize: '12px', textAlign: 'rigth' },
            }).setUrl(m.info.url),
            ui.Label({
                value: m.labels.lblTitle,
                style: { fontSize: '20px', fontWeight: 'bold' }
            }),
            ui.Label(m.labels.lblClickMap),
            ui.Label(m.labels.lblExplore),
        ]);
    c.lan = {};
    c.lan.selLanguage = ui.Select({
        items: ['English', 'Russian'],
        value: lan
    });
    c.levels = {};
    c.levels.lblChoose = ui.Label(m.labels.lblSelectLevel1Expl);
    c.levels.selLevel1 = ui.Select({
        items: m.siLevel1,
        placeholder: m.labels.lblSelectLevel1,
    });
    c.btnSelectContainer = ui.Button(m.labels.lblLevel0);
    c.levels.pnlSelectLevel1 = ui.Panel(
        [
            c.levels.lblChoose,
            ui.Panel([c.levels.selLevel1, c.btnSelectContainer], ui.Panel.Layout.flow('horizontal'))
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
    //c.mapLeft.centerObject(m.ftcAOI, 6);
    c.mapLeft.style().set('cursor', 'crosshair');
    c.mapRight.style().set('cursor', 'crosshair');
    c.mapLeft.add(c.pnlLeftLayerSelector);
    //c.mapLeft.add(c.pnlLeftSlider);
    c.mapLeft.add(c.pnlLeftChart);
    c.mapLeft.add(c.pnlLeftLegendContainer);
    //c.mapLeft.add(c.chkLeftBestEffort);
    c.mapRight.add(c.pnlRightLayerSelector);
    //c.mapRight.add(c.pnlRightSlider);
    c.mapRight.add(c.pnlRightChart);
    c.mapRight.add(c.pnlRightLegendContainer);
    //c.mapRight.add(c.chkRightBestEffort);
    c.pnlOutput.add(c.pnlIntro);
    c.pnlOutput.add(c.lan.selLanguage);
    c.pnlOutput.add(c.levels.pnlSelectLevel1);
    c.pnlOutput.add(c.lblForm);
    c.pnlOutput.add(c.pnlCoordinates);
    c.pnlOutput.add(c.pnlCharts);
    /*******************************************************************************
     * 4-Styling *
     ******************************************************************************/
    // JSON object for defining CSS-like class style properties.
    var s = {};
    s.styleMessage = { color: 'gray', fontSize: '12px', padding: '2px 0px 2px 10px' };
    c.levels.selLevel1.style().set({ width: "50%", });
    c.lan.selLanguage.style().set({ width: '70%' });
    c.pnlLeftLayerSelector.style().set({ position: "top-left", margin: 0, padding: 0 });
    c.pnlLeftSlider.style().set({ position: "top-left", margin: 0, padding: 0 });
    c.pnlRightLayerSelector.style().set({ position: "top-right", margin: 0, padding: 0 });
    c.pnlRightSlider.style().set({ position: "top-right", margin: 0, padding: 0 });
    /*******************************************************************************
     * Behaviors *
    ******************  ************************************************************/
    c.lan.selLanguage.onChange(function (lan) { initApp(lan); });
    var generateChart = function (e, pnl, bestEffort) {
        var img = e.imgMap.eq(e.lv.cat)
            .rename(e.lv.names)
            .multiply(ee.Image.pixelArea()).divide(10000);
        try {
            var stats = img.reduceRegion({
                reducer: ee.Reducer.sum(),
                geometry: m.ftcAOI.first().geometry(),
                scale: e.scale,
                bestEffort: bestEffort
            });
        } catch (error) {
            print(error);
        }
        //print(stats);
        // test
        var lstFeat = e.lv.names.map(function (name) {
            var lstValues = ee.List([name, stats.get(name)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeader = ee.List([
            [
                { label: 'Stats', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var options = {
            //title: m.labels.lblLandCover,
            height: 150,
            //legend: { position: 'top', maxLines: 1 },
            colors: e.lv.vis.palette,
            pieHole: 0.4,
            legend: { position: 'none' },
            margin: 0,
            padding: 0,
            pieSliceTextStyle: {
                color: 'black',
            },
        };
        var chartDataTable = lstHeader.cat(ee.FeatureCollection(lstFeat).aggregate_array('row'));
        pnl.widgets().set(0,
            ui.Label({
                value: m.labels.lblGeneratingCharts + '...',
                style: s.styleMessage,
            })
        );
        chartDataTable.evaluate(function (dataTable, error) {
            if (error) {
                pnl.widgets().set(0,
                    ui.Label({
                        value: error,
                        style: s.styleMessage,
                    })
                );
            }
            else {
                var chart = ui
                    .Chart(dataTable)
                    .setChartType('PieChart')
                    .setOptions(options);
                pnl.widgets().set(0, chart);
            }
        });
    };
    c.selLeftLayers.onChange(function (layerSelected) {
        c.mapLeft.layers().set(0, ui.Map.Layer(m.imagesOptions[layerSelected].imgMap.visualize(m.imagesOptions[layerSelected].lv.vis)));
        var lvEntry = m.imagesOptions[layerSelected].lv;
        c.pnlLeftLegend.widgets().reset([mdlLegends.createDiscreteLegendPanel(layerSelected, lvEntry.names, lvEntry.vis.palette, false, false)]);
        generateChart(m.imagesOptions[layerSelected], c.pnlLeftChart, c.chkLeftBestEffort.getValue());
    });
    c.selRightLayers.onChange(function (layerSelected) {
        c.mapRight.layers().set(0, ui.Map.Layer(m.imagesOptions[layerSelected].imgMap.visualize(m.imagesOptions[layerSelected].lv.vis)));
        var lvEntry = m.imagesOptions[layerSelected].lv;
        c.pnlRightLegend.widgets().reset([mdlLegends.createDiscreteLegendPanel(layerSelected, lvEntry.names, lvEntry.vis.palette, false, false)]);
        generateChart(m.imagesOptions[layerSelected], c.pnlRightChart, c.chkRightBestEffort.getValue());
    });
    var handleOnMapClick = function (coords) {
        c.pnlCharts.clear();
        // Update the lon/lat panel with values from the click event.
        c.lblLon.setValue(m.labels.lblLongitude + ': ' + coords.lon.toFixed(2));
        c.lblLat.setValue(m.labels.lblLatitude + ': ' + coords.lat.toFixed(2));
        var gmyPoint = ee.Geometry.Point(coords.lon, coords.lat);
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
    };
    c.mapLeft.onClick(handleOnMapClick);
    c.mapRight.onClick(handleOnMapClick);
    var showInfoAOI = function () {
        c.mapLeft.centerObject(m.ftcAOI);
        c.mapLeft.layers().set(1, ui.Map.Layer(m.ftcAOI.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI));
        generateChart(m.imagesOptions[c.pnlLeftLayerSelector.widgets().get(0).getValue()], c.pnlLeftChart, c.chkLeftBestEffort.getValue());
        c.mapRight.layers().set(1, ui.Map.Layer(m.ftcAOI.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI));
        generateChart(m.imagesOptions[c.pnlRightLayerSelector.widgets().get(0).getValue()], c.pnlRightChart, c.chkRightBestEffort.getValue());
        // check selected images
        //generateChart();
    }
    var resetLevelSelect = function () {
        c.levels.selLevel1.unlisten();
        c.levels.selLevel1.items().reset(m.siLevel1);
        c.levels.selLevel1.setPlaceholder(m.labels.lblSelectLevel1);
        c.levels.selLevel1.setValue(null);
        c.lblForm.setValue(m.labels.lblClickForm + m.countryName).setUrl(m.formId + m.countryName);
        c.levels.selLevel1.onChange(handleChangeLevel1);
    };
    var handleChangeLevel1 = function (level1Code) {
        if (level1Code !== null) {
            m.levelAOI = m.labels.lblLevel1;
            m.ftcAOI = ftc1.filter(ee.Filter.eq('ADM1_PCODE', level1Code));
            var oblast = '';
            for (var i = 0; i < m.siLevel1.length; i++) {
                if (m.siLevel1[i].value === level1Code) {
                    oblast = m.siLevel1[i].label;
                    break;
                }
            }
            c.lblForm.setValue(m.labels.lblClickForm + oblast).setUrl(m.formId + oblast);
            showInfoAOI();
        }
    }
    var handleClickSelectContainer = function () {
        resetLevelSelect();
        m.levelAOI = m.labels.lblLevel0;
        m.ftcAOI = ftc0;
        showInfoAOI();
    };
    c.btnSelectContainer.onClick(handleClickSelectContainer);
    c.levels.selLevel1.onChange(handleChangeLevel1);
    /*******************************************************************************
     * Initialize *
    ******************************************************************************/
    c.selLeftLayers.setValue(Object.keys(m.imagesOptions)[0], true);
    c.selRightLayers.setValue(Object.keys(m.imagesOptions)[1], true);
    c.mapLeft.layers().set(1, ui.Map.Layer(m.ftcAOI.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI));
    c.mapRight.layers().set(1, ui.Map.Layer(m.ftcAOI.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI));
    c.mapLeft.centerObject(m.ftcAOI);
}