var imgTerrain = ee.Image("users/projectgeffao/Turkey/Terrain_rgb3b_Turkey_v2"),
    ftc0 = ee.FeatureCollection("users/projectgeffao/Ayas/TUR_Precal_Level0_Ayas_v1"),
    ftc1 = ee.FeatureCollection("users/projectgeffao/Ayas/TUR_Precal_Level1_Ayas_v1"),
    imgBau7cat = ee.Image('users/projectgeffao/Turkey/bau2040_t02020_7cat'),
    imgPot104cat = ee.Image('users/projectgeffao/Turkey/bau2040_10C2040_4cat');
var imgEC = ee.Image("users/projectgeffao/Ayas/prediction_EC"),
    imgESP = ee.Image("users/projectgeffao/Ayas/prediction_ESP"),
    imgSOC = ee.Image("users/projectgeffao/Ayas/prediction_SOC"),
    imgpH = ee.Image("users/projectgeffao/Ayas/prediction_pH"),
    imgWorldClim = ee.Image("WORLDCLIM/V1/BIO"),
    imgLandform = ee.Image("CSP/ERGo/1_0/Global/SRTM_landforms"),
    imgSRTM = ee.Image("USGS/SRTMGL1_003"),
    imgLCAyas = ee.Image("users/projectgeffao/Ayas/Ayas_Lpis"),
    ftcProbes = ee.FeatureCollection("users/projectgeffao/Ayas/Points_Probes"),
    ftcProfiles = ee.FeatureCollection("users/projectgeffao/Ayas/Points_Profiles"),
    imgSoilBGT = ee.Image("users/projectgeffao/Ayas/Ayas_Btg");
/**
* App: Ayas 
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
var mdlPrecalculation = require('users/projectgeffao/Ayas:Apps/Precalculation_Ayas.js');
var mdlLocalization = require('users/projectgeffao/Ayas:Apps/localization.js');
var mdlPalettes = require('users/gena/packages:palettes');
/** Assets */
var a = {};
// From precalculation script
a.imgLPD = mdlPrecalculation.imgLPD.unmask().clip(ftc0);
a.imgCombinedx2 = mdlPrecalculation.baseLCSource.imgCombinedx2.clip(ftc0);
a.imgLastLC = mdlPrecalculation.baseLCSource.imgLcAll.select('y' + mdlPrecalculation.baseLCSource.lastYear).clip(ftc0);
a.imgForestChange = mdlPrecalculation.baseLCSource.imgForestChange.clip(ftc0);
a.imgSedi9Cat = mdlPrecalculation.imgSedi9Cat.clip(ftc0);// PESERA
a.imgNPP = mdlPrecalculation.imgNPP.clip(ftc0);
a.imgPot10 = mdlPrecalculation.imgPot10.clip(ftc0);
a.imgBau = mdlPrecalculation.imgBau.clip(ftc0);
// From imports
a.imgBau7cat = imgBau7cat
a.imgPot104cat = imgPot104cat
// For multicriteria calculation
a.imgCustom = ee.Image(0).selfMask();
// New assets 
a.imgpH = imgpH.select('b2');
a.imgEC = imgEC.select('b2');
a.imgESP = imgESP.select('b2');
a.imgSOC = imgSOC.select('b2');
a.imgPrecipitation = imgWorldClim.select('bio12').clip(ftc0);
a.imgTemperature = imgWorldClim.select('bio01').multiply(0.1).clip(ftc0);
a.imgLandform = imgLandform.clip(ftc0);
a.imgSlope = ee.Terrain.slope(imgSRTM).divide(180).multiply(Math.PI).tan().multiply(100).clip(ftc0); //  %
// on the fly categorization por multicriteria
a.imgSlopeCat = a.imgSlope.lt(3)
a.imgSlopeCat = a.imgSlopeCat
    .where(a.imgSlope.gte(3).and(a.imgSlope.lt(8)), 2)
    .where(a.imgSlope.gte(8).and(a.imgSlope.lt(12)), 3)
    .where(a.imgSlope.gte(12), 4);
a.imgPrecipitationCat = a.imgPrecipitation.lt(450);
a.imgPrecipitationCat = a.imgPrecipitationCat.where(a.imgPrecipitation.gte(450), 2);
a.imgpHCat = a.imgpH.lt(7);
a.imgpHCat = a.imgpHCat.where(a.imgpH.gte(7), 2)
a.imgESPCat = a.imgESP.lt(2)
a.imgESPCat = a.imgESPCat
    .where(a.imgESP.gte(2).and(a.imgESP.lt(4)), 2)
    .where(a.imgESP.gte(4).and(a.imgESP.lt(6)), 3)
    .where(a.imgESP.gte(6), 4);
a.imgECCat = a.imgEC.lt(1.5);
a.imgECCat = a.imgECCat.where(a.imgEC.gte(1.5), 2);
// NDVI by month and year
var startYear = 2001;
var endYear = 2020;
var imcModis = ee.ImageCollection('MODIS/006/MOD13Q1').filterDate(startYear + '-01-01', endYear + '-12-31');
var imcModisNDVI = imcModis.select('NDVI');
var lstYears = ee.List.sequence(startYear, endYear);
var lstMonths = ee.List.sequence(1, 12);
// 20x12=240 images
a.imcNDVIByMonthYear = ee.ImageCollection.fromImages(
    lstYears.map(function (y) {
        return lstMonths.map(function (m) {
            return imcModisNDVI
                .filter(ee.Filter.calendarRange(y, y, 'year'))
                .filter(ee.Filter.calendarRange(m, m, 'month'))
                .mean()
                .set('system:time_start', ee.Date.fromYMD(y, m, 1));
        });
    }).flatten());
initApp(mdlLocalization.languages[0]);
function initApp(lan) {
    /*******************************************************************************
    * 1-Model *
    ******************************************************************************/
    // JSON object for storing the data model.
    var m = {};
    m.labels = mdlLocalization.getLocLabels(lan);
    m.evalSet = {};
    m.maxAreaHa = 1000000;
    // Options: NATIONAL LC
    m.transitionsSources = mdlPrecalculation.sources;
    // Selected transition source 
    m.selectedSource = m.transitionsSources[0];
    m.defaultFinalLCYear = mdlPrecalculation.baseLCSource.lastYear;
    m.defaultInitialLCYear = mdlPrecalculation.baseLCSource.initialYears[0];
    // More info & contact
    m.info = {
        referenceDocUrl: '',
        contactEmail1: 'hakki.erdogan@fao.org',
        contactEmail2: 'nurcan.hacialibey@tarimorman.gov.tr',
        contactEmail3: '',
        contactEmail4: '',
        logoAssetId: 'users/projectgeffao/Ayas/ILUP_Logo_Abajo',
        logoDimensions: '357x220',
    }
    // Feature collections options to click on the map to obtain precalculated statistics
    m.assetsClick = {};
    m.assetsClick[m.labels.lblNone] = null;
    m.assetsClick[m.labels.lblLevel1] = ftc1;
    // Feature collection to query on map click
    m.ftcClickOn = ftc1;
    // Layers Visualization
    m.lv = {
        lc: {
            vis: {
                min: 1, max: 7, opacity: 1,
                palette: ['#377e3f', '#c19511', '#fcdb00', '#18eebe', '#d7191c', '#cfdad2', '#4458eb',],
            },
            names: [
                m.labels.lblTreeCovered,
                m.labels.lblGrassland,
                m.labels.lblCropland,
                m.labels.lblWetland,
                m.labels.lblArtificial,
                m.labels.lblOtherLand,
                m.labels.lblWaterbody,
            ]
        },
        lcAyas: {
            vis: {
                min: 1, max: 21, opacity: 1,
                palette: [
                    '#d0ca55',
                    '#a19c42',
                    '#af712f',
                    '#fdbf6f',
                    '#cfdad2',
                    '#37913f',
                    '#e7a0bb',
                    '#e77fbb',
                    '#e883f7',
                    '#c555a0',
                    '#9755a0',
                    '#29d47f',
                    '#fe4a1e',
                    '#232323',
                    '#89a76b',
                    '#62e510',
                    '#add488',
                    '#acf812',
                    '#d7191c',
                    '#4458eb',
                    '#86dff2',
                ],
            },
            names: [
                m.labels.lblLCAyas0,
                m.labels.lblLCAyas1,
                m.labels.lblLCAyas2,
                m.labels.lblLCAyas3,
                m.labels.lblLCAyas4,
                m.labels.lblLCAyas5,
                m.labels.lblLCAyas6,
                m.labels.lblLCAyas7,
                m.labels.lblLCAyas8,
                m.labels.lblLCAyas9,
                m.labels.lblLCAyas10,
                m.labels.lblLCAyas11,
                m.labels.lblLCAyas12,
                m.labels.lblLCAyas13,
                m.labels.lblLCAyas14,
                m.labels.lblLCAyas15,
                m.labels.lblLCAyas16,
                m.labels.lblLCAyas17,
                m.labels.lblLCAyas18,
                m.labels.lblLCAyas19,
                m.labels.lblLCAyas20,
            ]
        },
        lpd: {
            vis: {
                min: 0, max: 5, opacity: 1,
                palette: ['#ffffff', '#ff0000', '#ffae4c', '#ffff73', '#d9d8e6', '#267300'],
            },
            names: [
                m.labels.lblNonVegetatedArea,
                m.labels.lblDeclining,
                m.labels.lblEarlySignDecline,
                m.labels.lblStableButStressed,
                m.labels.lblStable,
                m.labels.lblIncreasing,
            ]
        },
        lcTransitions: {
            vis: {
                min: 0, max: 7, opacity: 1,
                palette: ['#FEFFE5', '#377e3f', '#c19511', '#fcdb00', '#18eebe', '#d7191c', '#cfdad2', '#4458eb',],
            },
            names: [
                m.labels.lblNoChange,
                m.labels.lblTreeCovered,
                m.labels.lblGrassland,
                m.labels.lblCropland,
                m.labels.lblWetland,
                m.labels.lblArtificial,
                m.labels.lblOtherLand,
                m.labels.lblWaterbody,
            ]
        },
        borderLevel1: { vis: { color: 'black', fillColor: '00000000', width: 1 } },
        borderLevel2: { vis: { color: '#838888', fillColor: '00000000', width: 1 } },
        highlight: { vis: { color: 'red', fillColor: '00000000' } },
        soc: { vis: { min: 2, max: 4, palette: ['#fcfdbf', '#fe9f6d', '#de4969', '#8c2981', '#3b0f6f', '#000004'] } },
        custom: { vis: { max: 1, min: 1, opacity: 1, palette: ['#FF00FF'] } },
        terrain: {
            vis: {
                min: 0, max: 3000,
                palette: ['#87e2ffff', '#80d5e3ff', '#73c2bcff', '#66af95ff', '#589c6eff', '#4b8947ff', '#3e7620ff', '#33720cff', '#33c05aff', '#8bdb82ff', '#c4e297ff', '#d5e0a1ff', '#e7deabff', '#f8dcb5ff', '#fddab4ff', '#fcd7adff', '#fad4a5ff', '#f8d29eff', '#f6cf97ff', '#f4cc8fff', '#f2c988ff', '#f0c780ff', '#eec479ff', '#ecc171ff', '#eabe6aff', '#e8bc62ff', '#e6b95bff', '#e4b653ff', '#e2b34cff', '#e0b144ff', '#deae3dff', '#dcab35ff', '#daa82eff', '#d9a627ff', '#d1a425ff', '#caa224ff', '#c2a023ff', '#bb9e22ff', '#b39c20ff', '#ac9a1fff', '#a7991eff', '#a7971dff', '#a6961cff', '#a5941bff', '#a5931aff', '#a49119ff', '#a49019ff', '#a38e18ff', '#a38d17ff', '#a38b16ff', '#a28a15ff', '#a28814ff', '#a28613ff', '#a18512ff', '#a18311ff', '#a08110ff', '#a0800fff', '#9f7e0eff', '#9f7c0eff', '#9f7b0dff', '#9e790cff', '#9e780bff', '#9d760aff', '#9d7509ff', '#9c7308ff', '#9c7207ff', '#9b7006ff', '#9b6e05ff', '#9a6d04ff', '#9a6b03ff', '#9a6902ff', '#996801ff', '#996600ff', '#9a640aff', '#9b6218ff', '#9c6025ff', '#9e5e33ff', '#9f5c40ff', '#a05a4eff', '#a25a5aff', '#a55e5eff', '#a76262ff', '#a96767ff', '#ac6b6bff', '#ae7070ff', '#b17474ff', '#b27979ff', '#b37d7dff', '#b48181ff', '#b48686ff', '#b58a8aff', '#b68f8fff', '#b79393ff', '#b89898ff', '#ba9c9cff', '#bca0a0ff', '#bda5a5ff', '#bfa9a9ff', '#c1aeaeff', '#c2b2b2ff', '#c4b6b6ff', '#c6bbbbff', '#c7bfbfff', '#c9c3c3ff', '#cac8c8ff', '#ccccccff', '#d0d0d0ff', '#d3d3d3ff', '#d7d7d7ff', '#dbdbdbff', '#dfdfdfff', '#e3e3e3ff', '#e7e7e7ff', '#ebebebff', '#efefefff', '#f3f3f3ff', '#f7f7f7ff', '#fbfbfbff']
            }
        },
        npp: {
            vis: { min: 0, max: 1, opacity: 1, palette: ['#d1442e', '#d17534', '#feb532', '#fef622', '#cee40d', '#b7cb0c', '#09db16', '#07a811', '#05800d'] },
        },
        erosion: {
            vis: { min: 1, max: 9, opacity: 1, palette: ['#05800d', '#07a811', '#09db16', '#b7cb0c', '#cee40d', '#fef622', '#feb532', '#d17534', '#d1442e'] },
            names: [
                m.labels.lblASE1,
                m.labels.lblASE2,
                m.labels.lblASE3,
                m.labels.lblASE4,
                m.labels.lblASE5,
                m.labels.lblASE6,
                m.labels.lblASE7,
                m.labels.lblASE8,
                m.labels.lblASE9,
            ]
        },
        bau: {
            vis: { min: -5, max: +5, opacity: 1, palette: ['#922100', '#f0e282', '#1e6d0f'] }
        },
        potential: {
            vis: { min: 0, max: +4, opacity: 1, palette: ['#feffb2', '#1e6d0f'] }
        },
        ph: {
            vis: { min: 6, max: 8, palette: mdlPalettes.kovesi.diverging_rainbow_bgymr_45_85_c67[7] }
        },
        ec: {
            vis: { min: 0.5, max: 2.5, palette: mdlPalettes.misc.tol_rainbow[7] }
        },
        esp: {
            vis: { min: 0, max: 6, palette: mdlPalettes.crameri.nuuk[10] }
        },
        precipitation: {
            vis: { min: 350, max: 550, palette: mdlPalettes.kovesi.linear_blue_5_95_c73[7].reverse() }
        },
        temperature: {
            vis: { min: 9, max: 13, palette: mdlPalettes.colorbrewer.YlOrRd[7] }
        },
        slope: {
            vis: { min: 0, max: 60, palette: mdlPalettes.matplotlib.viridis[7] }
        },
        landforms: {
            vis: {
                min: 11.0,
                max: 42.0,
                palette: [
                    "#141414",
                    "#383838",
                    "#808080",
                    "#EBEB8F",
                    "#F7D311",
                    "#AA0000",
                    "#D89382",
                    "#DDC9C9",
                    "#DCCDCE",
                    "#1C6330",
                    "#68AA63",
                    "#B5C98E",
                    "#E1F0E5",
                    "#a975ba",
                    "#6f198c",
                ],
            },
            names: [
                m.labels.lblLandForm1,
                m.labels.lblLandForm2,
                m.labels.lblLandForm3,
                m.labels.lblLandForm4,
                m.labels.lblLandForm5,
                m.labels.lblLandForm6,
                m.labels.lblLandForm7,
                m.labels.lblLandForm8,
                m.labels.lblLandForm9,
                m.labels.lblLandForm10,
                m.labels.lblLandForm11,
                m.labels.lblLandForm12,
                m.labels.lblLandForm13,
                m.labels.lblLandForm14,
                m.labels.lblLandForm15,
            ]
        },
        probes: { vis: { color: 'green' } },
        profiles: { vis: { color: 'blue' } },
        fgl: {
            vis: { min: 1, max: 2, opacity: 1, palette: ["ff1a04", "061aff"] },
            names: [
                m.labels.lblForestLoss,
                m.labels.lblForestGain,
            ]
        },
        soilBGT: {
            vis: {
                max: 8,
                min: 1,
                opacity: 1,
                palette: ['#aa22e3', '#c4e3b1', '#8591e3', '#e379a6', '#dae34c', '#3ef431', '#0b08f4', '#269438'],
            },
            names: ['A', 'B', 'K', 'Null', 'U', 'M', 'F', 'N']
        },
    };
    // Map layers configuration
    m.layerEntries = [
        {
            asset: imgTerrain,
            style: {},
            name: m.labels.lblTopography,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblElevation + ' (m)', m.lv.terrain.vis),
            group: 'RASTER',
        },
        {
            asset: a.imgLastLC,
            style: m.lv.lc.vis,
            name: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLCSource.name + ') ' + mdlPrecalculation.baseLCSource.lastYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLCSource.name + ') ' + mdlPrecalculation.baseLCSource.lastYear, m.lv.lc.names, m.lv.lc.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: imgLCAyas,
            style: m.lv.lcAyas.vis,
            name: m.labels.lblLandCoverAyas,
            visible: true,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCoverAyas , m.lv.lcAyas.names, m.lv.lcAyas.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgLPD,
            style: m.lv.lpd.vis,
            name: m.labels.lblLandProductivityDynamics,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandProductivityDynamics, m.lv.lpd.names, m.lv.lpd.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSOC,
            style: m.lv.soc.vis,
            name: m.labels.lblSOC,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblSOCLegend, m.lv.soc.vis),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgBau,
            style: m.lv.bau.vis,
            name: m.labels.lblPredictedSOCChange,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblPredictedSOCChangeLegend, m.lv.bau.vis),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgPot10,
            style: m.lv.bau.vis,
            name: m.labels.lblSOCChange,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblSOCChangeLegend, m.lv.potential.vis),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSedi9Cat, // pesera
            style: m.lv.erosion.vis,
            name: m.labels.lblErosion,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblErosionLegend, m.lv.erosion.names, m.lv.erosion.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgNPP,
            style: m.lv.npp.vis,
            name: m.labels.lblNPP,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblNPPLegend, m.lv.npp.vis),
            group: 'RASTER',
        },
        {
            asset: imgSoilBGT,
            style: m.lv.soilBGT.vis,
            name: m.labels.lblSoilBGT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilBGT, m.lv.soilBGT.names, m.lv.soilBGT.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: a.imgForestChange,
            style: m.lv.fgl.vis,
            name: m.labels.lblForestGainsLosses + ' ' + m.defaultInitialLCYear + '-' + m.defaultFinalLCYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblForestGainsLosses, m.lv.fgl.names, m.lv.fgl.vis.palette, false, false),
            group: 'RASTER',
        },
        // nuevas
        {
            asset: a.imgpH,
            style: m.lv.ph.vis,
            name: m.labels.lblPH,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblPH, m.lv.ph.vis),
            group: 'RASTER',
        },
        {
            asset: a.imgEC,
            style: m.lv.ec.vis,
            name: m.labels.lblElectricalConductivity,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblElectricalConductivity, m.lv.ec.vis),
            group: 'RASTER',
        },
        {
            asset: a.imgESP,
            style: m.lv.esp.vis,
            name: m.labels.lblESP,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblESP, m.lv.esp.vis),
            group: 'RASTER',
        },
        {
            asset: a.imgPrecipitation,
            style: m.lv.precipitation.vis,
            name: m.labels.lblAnnualPrecipitation,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblAnnualPrecipitationLegend, m.lv.precipitation.vis),
            group: 'RASTER',
        },
        {
            asset: a.imgTemperature,
            style: m.lv.temperature.vis,
            name: m.labels.lblAnnualMeanTemp,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblAnnualMeanTempLegend, m.lv.temperature.vis),
            group: 'RASTER',
        },
        {
            asset: a.imgLandform,
            style: m.lv.landforms.vis,
            name: m.labels.lblLandforms,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandforms, m.lv.landforms.names, m.lv.landforms.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: a.imgSlope,
            style: m.lv.slope.vis,
            name: m.labels.lblSlope,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblSlopeLegend, m.lv.slope.vis),
            group: 'RASTER',
        },
        // FTC
        {
            asset: ftc1,
            style: m.lv.borderLevel1.vis,
            name: m.labels.lblLevel1,
            visible: true,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
        },
        {
            asset: ftcProbes,
            style: m.lv.probes.vis,
            name: m.labels.lblLocationOfProbes,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'CIRCLE',
            citation: ''
        },
        {
            asset: ftcProfiles,
            style: m.lv.profiles.vis,
            name: m.labels.lblLocationOfProfiles,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'CIRCLE',
            citation: ''
        },
    ];
    // Transitions layers configuration
    m.transitionsEntries = [
        {
            asset: m.selectedSource.imgLcAll.select('y' + m.selectedSource.yearsLC[0]).clip(ftc0),
            style: m.lv.lc.vis,
            label: m.labels.lblFromLC,
            name: m.labels.lblLandCover + ' ' + m.selectedSource.yearsLC[0],
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover, m.lv.lc.names, m.lv.lc.vis.palette, false, false),
        },
        {
            asset: m.selectedSource.imgLcAll.select('y' + m.selectedSource.lastYear).clip(ftc0),
            style: m.lv.lc.vis,
            label: m.labels.lblCurrentLC,
            name: m.labels.lblLandCover + ' ' + m.selectedSource.lastYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover, m.lv.lc.names, m.lv.lc.vis.palette, false, false),
        },
        {
            asset: m.selectedSource.imgTransitions.select('lc_gain_' + m.selectedSource.yearsLC[0] + '_' + m.selectedSource.lastYear).clip(ftc0),
            style: m.lv.lcTransitions.vis,
            label: m.labels.lblGains,
            name: m.labels.lblGains + ' ' + m.selectedSource.yearsLC[0] + ' - ' + m.selectedSource.lastYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblGains, m.lv.lcTransitions.names, m.lv.lcTransitions.vis.palette, false, false),
        },
        {
            asset: m.selectedSource.imgTransitions.select('lc_loss_' + m.selectedSource.yearsLC[0] + '_' + m.selectedSource.lastYear).clip(ftc0),
            style: m.lv.lcTransitions.vis,
            label: m.labels.lblLosses,
            name: m.labels.lblLosses + ' ' + m.selectedSource.yearsLC[0] + ' - ' + m.selectedSource.lastYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLosses, m.lv.lcTransitions.names, m.lv.lcTransitions.vis.palette, false, false),
        }];
    m.namesLayers = [];
    m.mcEntries = [
        /*{
            title: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLCSource.name + ') ' + mdlPrecalculation.baseLCSource.lastYear,
            palette: m.lv.lc.vis.palette,
            names: m.lv.lc.names,
            image: a.imgLastLC,
            categories: [1, 2, 3, 4, 5, 6, 7],
        },*/
        {
            title: m.labels.lblLandCoverAyas,
            palette: m.lv.lcAyas.vis.palette,
            names: m.lv.lcAyas.names,
            image: imgLCAyas,
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        },
        {
            title: m.labels.lblLandProductivityDynamics,
            palette: m.lv.lpd.vis.palette.slice(1),
            names: m.lv.lpd.names.slice(1),
            image: a.imgLPD,
            categories: [1, 2, 3, 4, 5],
        },
        {
            title: m.labels.lblSlopeCategories,
            palette: mdlPalettes.colorbrewer.Set1[4],
            names: ['<3%', '3% - 8%', '8% - 12%', '>12%'],
            image: a.imgSlopeCat,
            categories: [1, 2, 3, 4],
        },
        {
            title: m.labels.lblPrecipitation,
            palette: mdlPalettes.colorbrewer.Set2[3],
            names: ['350mm - 450mm', '450mm - 574mm'],
            image: a.imgPrecipitationCat,
            categories: [1, 2],
        },
        {
            title: 'pH',
            palette: mdlPalettes.colorbrewer.Paired[3],
            names: ['6 - 7', '7 - 8'],
            image: a.imgpHCat,
            categories: [1, 2],
        },
        {
            title: m.labels.lblESP,
            palette: mdlPalettes.colorbrewer.Dark2[4],
            names: ['<2%', '2% - 4%', '4% - 6%', '6% - 8%'],
            image: a.imgESPCat,
            categories: [1, 2, 3, 4],
        },
        {
            title: m.labels.lblElectricalConductivity,
            palette: ['red', 'blue'],
            names: ['0.5 - 1.5', '1.5 - 2.5'],
            image: a.imgECCat,
            categories: [1, 2],
        },
    ];
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
    c.lp.info.tmbLogo = ui.Thumbnail({
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
    c.lp.info.lblIntro = ui.Label(m.labels.lblTitle);
    c.lp.info.lblApp = ui.Label(m.labels.lblExpl1);
    c.lp.info.lblAppDev = ui.Label(m.labels.lblAppDeveloped);
    c.lp.info.lblEmail1 = ui.Label(m.info.contactEmail1).setUrl('mailto:' + m.info.contactEmail1);
    c.lp.info.lblEmail2 = ui.Label(m.info.contactEmail2).setUrl('mailto:' + m.info.contactEmail2);
    c.lp.info.lblEmail3 = ui.Label(m.info.contactEmail3).setUrl('mailto:' + m.info.contactEmail3);
    c.lp.info.lblEmail4 = ui.Label(m.info.contactEmail4).setUrl('mailto:' + m.info.contactEmail4);
    c.lp.info.btnClose = ui.Button({ label: m.labels.lblCloseInfoPanel });
    c.lp.info.pnlContainer = ui.Panel(
        [c.lp.info.lblIntro,
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
        items: ['English', 'Turkish'],
        value: lan
    });
    // Left Panel - Administrative boundaries section
    c.lp.levels = {};
    c.lp.levels.lblChoose = ui.Label(m.labels.lblExpl2 + ' (*)');
    c.lp.levels.selLevel1 = ui.Select({
        items: [],
        placeholder: m.labels.lblSelectLevel1,
    });
    // Left Panel - Layer for boundaries selection
    c.lp.boundaries = {};
    c.lp.boundaries.lblChoose = ui.Label(m.labels.lblAssetClick + ' (*)');
    c.lp.boundaries.selBoundariesLayer = ui.Select({
        items: Object.keys(m.assetsClick),
        value: m.labels.lblLevel1,
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
    // Left Panel - Multi-criteria analysis section   
    c.lp.mc = {};
    c.lp.mc.btnMcAnalysis = ui.Button(m.labels.lblHotspots);
    c.lp.mc.pnlEntries = mdlLegends.createMultiCriteriaPanel(m.mcEntries);
    c.lp.mc.lblDisplay = ui.Label(m.labels.lblStepDisplay);
    c.lp.mc.btnCalculate = ui.Button({ label: m.labels.lblDisplay, disabled: true });
    c.lp.mc.btnReset = ui.Button({ label: m.labels.lblReset, disabled: true });
    c.lp.mc.pnlButtons = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        widgets: [c.lp.mc.btnCalculate, c.lp.mc.btnReset]
    });
    c.lp.mc.pnlContainer = ui.Panel({
        widgets: [
            c.lp.mc.pnlEntries,
            c.lp.mc.lblDisplay,
            c.lp.mc.pnlButtons]
    });
    // Left Panel - Transitions section
    c.lp.tr = {};
    c.lp.tr.btnTransitions = ui.Button(m.labels.lblLCTransitionAnalysis);
    c.lp.tr.pnlContainer = ui.Panel();
    c.lp.tr.lblSource = ui.Label(m.labels.lblLCSource + ': ');
    c.lp.tr.selSources = ui.Select({
        items: ['CORINE'],
        value: m.selectedSource.name,
    });
    c.lp.tr.pnlSource = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        widgets: [c.lp.tr.lblSource, c.lp.tr.selSources]
    });
    c.lp.tr.lblInitialYears = ui.Label(m.labels.lblSelectLCYear + ': ');
    c.lp.tr.selLCFromYears = ui.Select({
        items: m.selectedSource.initialYears,
        value: m.selectedSource.yearsLC[0],
    });
    c.lp.tr.pnlFromYear = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        widgets: [c.lp.tr.lblInitialYears, c.lp.tr.selLCFromYears]
    });
    c.lp.tr.pnlLayers = ui.Panel();
    m.transitionsEntries.forEach(function (layer) {
        c.lp.tr.pnlLayers.add(mdlLegends.createLayerEntry(layer));
    });
    c.lp.tr.pnlContainer.add(c.lp.tr.pnlFromYear);
    c.lp.tr.pnlContainer.add(c.lp.tr.pnlLayers);
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
    c.cp.btnLegendClose = ui.Button({ label: m.labels.lblCloseLegend });
    c.cp.pnlFrontLayerLegend = ui.Panel([ui.Panel(), c.cp.btnLegendClose]);
    c.cp.btnLegendClose.onClick(function () {
        var l = c.cp.pnlFrontLayerLegend.widgets().get(0);
        l.style().set({ shown: !l.style().get('shown') });
        c.cp.btnLegendClose.setLabel(l.style().get('shown') ? m.labels.lblCloseLegend : m.labels.lblOpenLegend);
    });
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
    c.rp.stats.ge.pnlEntryVegetatedArea = ui.Panel({
        widgets: [ui.Label(m.labels.lblVegetatedArea + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryDecliningProductivity = ui.Panel({
        widgets: [ui.Label(m.labels.lblDecliningProductivity + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryIncreasingProductivity = ui.Panel({
        widgets: [ui.Label(m.labels.lblIncreasingProductivity + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntrySoilErosionTotal1 = ui.Panel({
        widgets: [ui.Label(m.labels.lblSoilErosionTotal1 + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntrySOCChangeBAU = ui.Panel({
        widgets: [ui.Label(m.labels.lblSOCChangeBAU + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntrySOCChangeC10 = ui.Panel({
        widgets: [ui.Label(m.labels.lblSOCChangeC10 + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryNPPTotal = ui.Panel({
        widgets: [ui.Label(m.labels.lblNPPTotal + ': '), ui.Label(m.labels.lblLoading)],
    });
    // Add entries to general stats panel
    Object.keys(c.rp.stats.ge).forEach(function (key) {
        c.rp.stats.ge[key].setLayout(ui.Panel.Layout.Flow('horizontal'));
        c.rp.stats.pnlStats.add(c.rp.stats.ge[key]);
    });
    // CHARTS PANELS
    c.rp.charts = {};
    c.rp.charts.pnlGeneralCharts = ui.Panel();
    c.rp.charts.lblGeneralChartsTitle = ui.Label(m.labels.lblGeneralCharts);
    c.rp.charts.pnlGeneralCharts.add(c.rp.charts.lblGeneralChartsTitle);
    c.rp.charts.pnlMcCharts = ui.Panel();
    c.rp.charts.lblMcChartsTitle = ui.Label(m.labels.lblHotspotsCharts);
    c.rp.charts.pnlMcCharts.add(c.rp.charts.lblMcChartsTitle);
    c.rp.charts.pnlTransitionsCharts = ui.Panel();
    c.rp.charts.lblTransitionsChartsTitle = ui.Label(m.labels.lblTransitionsCharts + ' - ' + m.selectedSource.name);
    c.rp.charts.pnlTransitionsCharts.add(c.rp.charts.lblTransitionsChartsTitle);
    /*******************************************************************************
    * 3-Composition *   
    ******************************************************************************/
    ui.root.clear();
    ui.root.add(c.pnlRoot);
    c.pnlRoot.add(c.lp.pnlControl);
    c.pnlRoot.add(c.sppMapOutput);
    // Control panel
    c.lp.pnlControl.add(c.lp.info.tmbLogo);
    c.lp.pnlControl.add(c.lp.info.pnlContainer);
    c.lp.pnlControl.add(c.lp.info.btnClose);
    c.lp.pnlControl.add(c.lp.lan.selLanguage);
    c.lp.pnlControl.add(c.lp.levels.lblChoose);
    c.lp.pnlControl.add(c.lp.levels.selLevel1);
    c.lp.pnlControl.add(c.lp.boundaries.lblChoose);
    c.lp.pnlControl.add(c.lp.boundaries.selBoundariesLayer);
    c.lp.pnlControl.add(c.lp.gl.lblLayersLegends);
    c.lp.pnlControl.add(c.lp.gl.pnlContainer);
    c.lp.pnlControl.add(c.lp.mc.btnMcAnalysis);
    c.lp.pnlControl.add(c.lp.mc.pnlContainer);
    c.lp.pnlControl.add(c.lp.tr.btnTransitions);
    c.lp.pnlControl.add(c.lp.tr.pnlContainer);
    c.lp.pnlControl.add(c.lp.op.pnlSlider);
    c.lp.pnlControl.add(c.lp.dt.btnDrawingTools);
    c.lp.pnlControl.add(c.lp.dt.pnlContainer);
    c.lp.pnlControl.add(c.lp.lblDisclaimer);
    // Map panel 
    c.cp.pnlMap.add(c.cp.map);
    c.cp.map.add(c.cp.pnlFrontLayerLegend);
    c.cp.map.add(c.cp.drt);
    c.cp.map.add(c.cp.btnSelectContainer);
    // Output panel 
    c.rp.pnlOutput.add(c.rp.pnlMessages);
    c.rp.pnlOutput.add(c.rp.stats.pnlStats);
    c.rp.pnlOutput.add(c.rp.charts.pnlGeneralCharts);
    c.rp.pnlOutput.add(c.rp.charts.pnlMcCharts);
    c.rp.pnlOutput.add(c.rp.charts.pnlTransitionsCharts);
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
    c.lp.levels.lblChoose.style().set(s.style1);
    c.lp.levels.selLevel1.style().set({ width: "90%", });
    //c.lp.levels.selLevel2.style().set({ width: "90%", });
    c.lp.boundaries.lblChoose.style().set(s.style1);
    c.lp.boundaries.selBoundariesLayer.style().set({ width: '70%' });
    c.lp.gl.lblLayersLegends.style().set({ fontSize: '12px', fontWeight: 'bold' });
    c.lp.gl.pnlContainer.style().set({ margin: '0px 5px', shown: true });
    s.sectionButton = { width: '90%', fontSize: '6px', fontWeight: 'normal' };
    s.sectionPanel = { margin: '5px 5px', shown: false, width: '90%' };
    s.paramPanel = { width: '90%', fontSize: '12px', margin: '0px', padding: '0px' };
    // Multicriteria Section
    c.lp.mc.btnMcAnalysis.style().set(s.sectionButton);
    c.lp.mc.btnMcAnalysis.style().set({ color: '#900303' });
    c.lp.mc.pnlContainer.style().set(s.sectionPanel);
    c.lp.mc.pnlContainer.style().set({ border: '3px solid #900303' });
    c.lp.mc.lblDisplay.style().set({
        fontWeight: 'bold',
        fontSize: '12px',
        margin: '1px 1px 1px 5px',
        padding: '2px',
    });
    c.lp.mc.btnCalculate.style().set({ width: '40%' });
    c.lp.mc.btnReset.style().set({ width: '40%' });
    // Transitions Section
    c.lp.tr.btnTransitions.style().set(s.sectionButton);
    c.lp.tr.btnTransitions.style().set({ color: 'green' });
    c.lp.tr.pnlContainer.style().set(s.sectionPanel);
    c.lp.tr.pnlContainer.style().set({ border: '3px solid green' });
    c.lp.tr.selSources.style().set({ margin: '0px', padding: '5px 0 0 0' });
    c.lp.tr.selLCFromYears.style().set({ margin: '0px', padding: '5px 0 0 0' });
    c.lp.tr.pnlSource.style().set(s.paramPanel);
    c.lp.tr.pnlFromYear.style().set(s.paramPanel);
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
    s.styleStatsValue = { margin: '4px 0px', fontSize: '12px', whiteSpace: 'pre' };
    s.styleStatsHeader = { margin: '4px 0px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' };
    s.styleInfoTitle = { fontSize: '16px', fontWeight: 'bold', margin: '4px 0px' };
    s.styelChartPanelTitle = { fontSize: '16px', fontWeight: 'bold', margin: '4px 15px' };
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
    // Charts Panels
    c.rp.charts.lblGeneralChartsTitle.style().set(s.styelChartPanelTitle);
    c.rp.charts.lblMcChartsTitle.style().set(s.styelChartPanelTitle);
    c.rp.charts.lblTransitionsChartsTitle.style().set(s.styelChartPanelTitle);
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
        c.rp.charts.pnlTransitionsCharts.style().set({ shown: (c.lp.tr.pnlContainer.style().get('shown') ? true : false) });
        c.rp.charts.pnlMcCharts.style().set({ shown: (c.lp.mc.pnlContainer.style().get('shown') ? true : false) });
        c.rp.charts.pnlGeneralCharts.style().set({
            shown: (!c.lp.tr.pnlContainer.style().get('shown') &&
                !c.lp.mc.pnlContainer.style().get('shown') ? true : false)
        });
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
        // If transitions panel is open check if some layer is selected
        if (c.lp.tr.pnlContainer.style().get('shown')) {
            for (var i = c.lp.tr.pnlLayers.widgets().length() - 1; i >= 0; i--) {
                chk = c.lp.tr.pnlLayers.widgets().get(i).widgets().get(0);
                if (chk.getValue()) {
                    c.cp.pnlFrontLayerLegend.widgets().set(0, m.transitionsEntries[i].legend);
                    c.cp.pnlFrontLayerLegend.widgets().set(1, c.cp.btnLegendClose);
                    return;
                }
            }
        }
        for (var j = c.lp.gl.pnlContainer.widgets().length() - 1; j >= 0; j--) {
            chk = c.lp.gl.pnlContainer.widgets().get(j).widgets().get(0);
            if (chk.getValue()) {
                var l = null;
                for (var g = 0; g < m.layerEntries.length; g++) {
                    if (m.layerEntries[g].name === chk.getLabel()) {
                        l = m.layerEntries[g].legend;
                        break;
                    }
                }
                if (l !== null) {
                    c.cp.pnlFrontLayerLegend.widgets().set(0, l);
                    c.cp.pnlFrontLayerLegend.widgets().set(1, c.cp.btnLegendClose);
                    return;
                }
            }
        }
    };
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
    // Transition layers
    m.transitionsEntries.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.label, layer.visible);
    });
    // Multicriteria layer - this layer is dinamically updated 
    c.cp.map.addLayer(a.imgCustom, m.lv.custom.vis, m.labels.lblHotspots, false);
    // Add on check/uncheck functionality to general layers entries
    c.lp.gl.pnlContainer.widgets().forEach(function (w) {
        var chk = w.widgets().get(0);
        chk.onChange(function (checked) {
            showLayer(chk.getLabel(), checked);
            showFrontLayerLegend();
        });
    });
    // Add on check/uncheck functionality to tr layers entries
    c.lp.tr.pnlLayers.widgets().forEach(function (w, i) {
        var chk = w.widgets().get(0);
        chk.onChange(function (checked) {
            showLayer(m.transitionsEntries[i].label, checked); // 
            showFrontLayerLegend();
        });
    });
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
            var statslCols = [
                'name',
                'lpd_0',
                'lpd_1',
                'lpd_2',
                'lpd_3',
                'lpd_4',
                'lpd_5',
                'ase_sum',
                'npp_sum',
                'ero_sum',
                'soc_change_bau',
                'soc_change_c10'
            ];
            f = ee.Feature(null).copyProperties(selectedArea, statslCols);
        }
        else {
            // Calculate all statistics required for info panel
            var ftcSampleStats = mdlPrecalculation.precalculate(m.ftcAoi, [
                'lpd',
                'soc_sum',
                'soc_mean',
                'ase_sum',
                'npp_sum',
                'erozyon',
                'soc_c10',
                'soc_bau'
            ]);
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
                var haVegetated = ef.properties.lpd_1 + ef.properties.lpd_2 + ef.properties.lpd_3 + ef.properties.lpd_4 + ef.properties.lpd_5;
                c.rp.stats.ge.pnlEntryVegetatedArea.widgets().get(1).setValue(formatNumber(haVegetated, 2) + " ha."); // Non veg: " + formatNumber(ef.properties.lpd_0, 2)
                var decliningProdTotal = ef.properties.lpd_1 + ef.properties.lpd_2;
                var aux = m.haAoi > 0 ? (decliningProdTotal * 100 / haVegetated) : 0;
                c.rp.stats.ge.pnlEntryDecliningProductivity.widgets().get(1).setValue(formatNumber(decliningProdTotal, 2) + ' ha. (' + aux.toFixed(2) + '%)');
                aux = m.haAoi > 0 ? (ef.properties.lpd_5 * 100 / haVegetated) : 0;
                c.rp.stats.ge.pnlEntryIncreasingProductivity.widgets().get(1).setValue(formatNumber(ef.properties.lpd_5, 2) + ' ha. (' + aux.toFixed(2) + '%)');
                // pnlEntrySoilErosionTotal1 pesera
                c.rp.stats.ge.pnlEntrySoilErosionTotal1.widgets().get(1).setValue(formatNumber(ef.properties.ase_sum, 2) + ' t');
                c.rp.stats.ge.pnlEntrySOCChangeBAU.widgets().get(1).setValue(formatNumber(ef.properties.soc_change_bau, 2) + ' tC');
                c.rp.stats.ge.pnlEntrySOCChangeC10.widgets().get(1).setValue(formatNumber(ef.properties.soc_change_c10, 2) + ' tC');
                c.rp.stats.ge.pnlEntryNPPTotal.widgets().get(1).setValue(formatNumber(ef.properties.npp_sum / 1000, 2) + '  tC');
            }
            else {
                c.rp.lblMessages.setValue(error);
            }
        });
        try {
            c.cp.map.centerObject(m.ftcAoi);
            c.cp.map.layers().set(m.namesLayers.length, ui.Map.Layer(m.ftcAoi.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI));
        } catch (error) {
            c.rp.lblMessages.setValue(error);
        }
        c.cp.map.drawingTools().setSelected(null);
        // Show only charts related to opened panel on the left (General|Multicriteria|Transitions)
        handleChartsPanelsShown();
        // Generate all charts for selected area test
        setupGeneralCharts();
        setupMcCharts();
        setupTransitionsCharts();
        clearCombinedLayerAndLegend();
        // Generate combined raster for selected area
        if (mcCategoryChecked()) {
            calculateMultiCriteria();
        }
    };
    var handleChangeLevel1 = function (level1Code) {
        if (level1Code !== null) {
            m.levelAoi = m.labels.lblLevel1;
            m.ftcAoi = ftc1.filter(ee.Filter.eq('OBJECTID', level1Code));
            m.precalculated = true;
            showInfoSelectedAoi();
        }
    };
    var resetLevelsSelects = function () {
        c.lp.levels.selLevel1.unlisten();
        c.lp.levels.selLevel1.items().reset(m.siLevel1);
        c.lp.levels.selLevel1.setPlaceholder(m.labels.lblSelectLevel1);
        c.lp.levels.selLevel1.setValue(null);
        c.lp.levels.selLevel1.onChange(handleChangeLevel1);
    };
    /** Handles value selection in countries/territories dropdown */
    c.lp.levels.selLevel1.onChange(handleChangeLevel1);
    /* Handle click on selected layer */
    c.cp.map.onClick(function (coords) {
        if (Object.keys(m.evalSet).length === 0 && !c.lp.dt.pnlContainer.style().get('shown')) {
            if (m.ftcClickOn === null) {
                c.rp.pnlMessages.style().set({ shown: true });
                c.rp.lblMessages.setValue(m.labels.lblSelectLayer);
                return;
            }
            c.rp.lblMessages.setValue('');
            c.cp.map.widgets().remove(c.cp.pnlCombinedLegend);
            var ftcCheck = m.ftcClickOn.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
            ftcCheck.size().getInfo(function (size) {
                if (size > 0) {
                    m.ftcAoi = ftcCheck;
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
    /**  Unchecks some layers in general layers panel, invoked when advanced panels are opened*/
    var unselectLayersPanelChecks = function () {
        for (var i = 0; i < c.lp.gl.pnlContainer.widgets().length(); i++) {
            var chb = c.lp.gl.pnlContainer.widgets().get(i).widgets().get(0);
            if (chb.getLabel() !== m.labels.lblLevel1
                && chb.getLabel() !== m.labels.lblLevel2
            ) {
                chb.setValue(false);
            }
        }
    };
    /** Shows/hides layers checked in Transitions panel*/
    var handleTransitionsLayersVis = function (show) {
        for (var i = c.lp.tr.pnlLayers.widgets().length() - 1; i >= 0; i--) {
            var chk = c.lp.tr.pnlLayers.widgets().get(i).widgets().get(0);
            if (chk.getValue()) {
                showLayer(m.transitionsEntries[i].label, show);
            }
        }
    };
    c.lp.mc.btnMcAnalysis.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        c.lp.mc.pnlContainer.style().set({ shown: !c.lp.mc.pnlContainer.style().get('shown') });
        // if opening hotspots panel, unselect general layers
        if (c.lp.mc.pnlContainer.style().get('shown')) {
            unselectLayersPanelChecks();
            c.cp.map.setOptions('SATELLITE');
        }
        // Show previously calculated layer & legend
        showLayer(m.labels.lblHotspots, c.lp.mc.pnlContainer.style().get('shown'));
        if (c.cp.pnlCombinedLegend !== null) {
            c.cp.pnlCombinedLegend.style().set({
                shown: c.lp.mc.pnlContainer.style().get('shown')
            });
        }
        // Hide transitions panel and layer
        c.lp.tr.pnlContainer.style().set({ shown: false });
        handleTransitionsLayersVis(false);
        showFrontLayerLegend();
        handleChartsPanelsShown();
    });
    c.lp.tr.btnTransitions.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        // handle transitions panel
        c.lp.tr.pnlContainer.style().set({ shown: !c.lp.tr.pnlContainer.style().get('shown') });
        handleTransitionsLayersVis(c.lp.tr.pnlContainer.style().get('shown'));
        showLayer(m.labels.lblHotspots, false);
        c.cp.pnlCombinedLegend.style().set({
            shown: false
        });
        // handle general layers panel
        if (c.lp.tr.pnlContainer.style().get('shown')) {
            unselectLayersPanelChecks();
            c.cp.map.setOptions('SATELLITE');
        }
        showFrontLayerLegend();
        handleChartsPanelsShown();
    });
    /** Reloads transitions layers according to year and source selected*/
    var resetTransitionsLayers = function (year) {
        // Update check labels with selected year
        c.lp.tr.pnlLayers.widgets().get(0).widgets().get(0).setLabel(m.labels.lblLandCover + ' ' + year);
        c.lp.tr.pnlLayers.widgets().get(1).widgets().get(0).setLabel(m.labels.lblLandCover + ' ' + m.selectedSource.lastYear);
        c.lp.tr.pnlLayers.widgets().get(2).widgets().get(0).setLabel(m.labels.lblGains + ' ' + year + ' - ' + m.selectedSource.lastYear);
        c.lp.tr.pnlLayers.widgets().get(3).widgets().get(0).setLabel(m.labels.lblLosses + ' ' + year + ' - ' + m.selectedSource.lastYear);
        // Reload layers
        var imgFrom = m.selectedSource.imgLcAll.select('y' + year).clip(ftc0);
        var lyrFrom = ui.Map.Layer(imgFrom.visualize(m.lv.lc.vis), {}, m.labels.lblFromLC, c.lp.tr.pnlLayers.widgets().get(0).widgets().get(0).getValue());
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblFromLC), lyrFrom);
        var imgFinal = m.selectedSource.imgLcAll.select('y' + m.selectedSource.lastYear).clip(ftc0);
        var lyrfinal = ui.Map.Layer(imgFinal.visualize(m.lv.lc.vis), {}, m.labels.lblCurrentLC, c.lp.tr.pnlLayers.widgets().get(1).widgets().get(0).getValue());
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblCurrentLC), lyrfinal);
        var imgGains = m.selectedSource.imgTransitions.select('lc_gain_' + year + '_' + m.selectedSource.lastYear).clip(ftc0);
        var lyrGains = ui.Map.Layer(imgGains.visualize(m.lv.lcTransitions.vis), {}, m.labels.lblGains, c.lp.tr.pnlLayers.widgets().get(2).widgets().get(0).getValue());
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblGains), lyrGains);
        var imgLosses = m.selectedSource.imgTransitions.select('lc_loss_' + year + '_' + m.selectedSource.lastYear).clip(ftc0);
        var lyrLosses = ui.Map.Layer(imgLosses.visualize(m.lv.lcTransitions.vis), {}, m.labels.lblLosses, c.lp.tr.pnlLayers.widgets().get(3).widgets().get(0).getValue());
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblLosses), lyrLosses);
        // Update transitions charts with new selected period                
        setupTransitionsCharts();
    };
    /** Updates start years list and final year according to source selected */
    c.lp.tr.selSources.onChange(function (source) {
        for (var i = 0; i < m.transitionsSources.length; i++) {
            if (m.transitionsSources[i].name === source) {
                m.selectedSource = m.transitionsSources[i];
                break;
            }
        }
        // Reset select wit initial years for selected lc source                
        c.lp.tr.selLCFromYears.items().reset(m.selectedSource.initialYears);
        c.lp.tr.selLCFromYears.unlisten();
        c.lp.tr.selLCFromYears.setValue(m.selectedSource.yearsLC[0]); // by default select first year in inital years list
        resetTransitionsLayers(m.selectedSource.yearsLC[0]);
        c.lp.tr.selLCFromYears.onChange(function (year) {
            resetTransitionsLayers(year);
        });
    });
    c.lp.tr.selLCFromYears.onChange(function (year) {
        resetTransitionsLayers(year);
    });
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
    /** Selects REU region */
    c.cp.btnSelectContainer.onClick(function () {
        resetLevelsSelects();
        m.levelAoi = m.labels.lblSelectContainer;
        m.ftcAoi = ftc0;
        m.precalculated = true;
        c.cp.map.centerObject(m.ftcAoi);
        showInfoSelectedAoi();
        clearCombinedLayerAndLegend();
    });
    /** Removes combined legend widget from map panel and resets combined image*/
    var clearCombinedLayerAndLegend = function () {
        c.cp.map.widgets().remove(c.cp.pnlCombinedLegend);
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblHotspots), ui.Map.Layer(ee.Image(0).selfMask(), {}, m.labels.lblHotspots, false));
    };
    /** Disables or enables checks in hotspots panel, invoked from calculate and reset buttons */
    var handleDisableMcChecks = function (disable) {
        for (var p = 0; p < m.mcEntries.length; p++) {
            var widgetsArray = c.lp.mc.pnlEntries.widgets().get(p).widgets().getJsArray();
            for (var i = 1; i < widgetsArray.length; i++) { // 0=panel title
                widgetsArray[i].widgets().get(1).setDisabled(disable);
            }
        }
    };
    /** Function to enable/disable ui components that allows new aoi query */
    var handleEvaluating = function (disable) {
        c.lp.lan.selLanguage.setDisabled(disable);
        c.lp.levels.selLevel1.setDisabled(disable);
        c.lp.mc.btnReset.setDisabled(disable);
        c.lp.mc.btnCalculate.setDisabled(disable);
        handleDisableMcChecks(disable);
        c.lp.tr.selLCFromYears.setDisabled(disable);
        c.lp.tr.selSources.setDisabled(disable);
        c.lp.dt.btnZonalStats.setDisabled(disable);
        if (m.precalculated)
            c.rp.lblMessages.setValue(disable ? m.labels.lblProcessingArea : '');
        else
            c.rp.lblMessages.setValue(disable ? m.labels.lblProcessing : '');
        c.rp.pnlMessages.style().set({ shown: disable });
        c.cp.btnSelectContainer.setDisabled(disable);
    };
    var gmySelected;
    var selectedLayerName;
    c.cp.map.drawingTools().onSelect(function (geom, layer) {
        gmySelected = geom;
        selectedLayerName = layer.getName();
    });
    c.cp.map.drawingTools().onLayerSelect(function (layer) {
        if (layer === null) {
            gmySelected = undefined;
        }
    });
    /** If selected drawn-area is contained in region area and smaller than max area call showInfoSelectedAoi to
     * calculate on the fly stats.
     */
    c.lp.dt.btnZonalStats.onClick(function () {
        if (gmySelected === undefined) {
            c.rp.lblMessages.setValue(m.labels.lblSelectGeometry);
            c.rp.pnlMessages.style().set({ shown: true });
            return;
        }
        if (gmySelected.type().getInfo() === 'Point') {
            c.rp.lblMessages.setValue(m.labels.lblSelectArea);
            c.rp.pnlMessages.style().set({ shown: true });
            return;
        }
        var f = ee.Feature(gmySelected).set(
            'area_ha', gmySelected
                .area({ 'maxError': 1 })
                .divide(10000));
        f = f.set('name', 'Drawn-feature in ' + selectedLayerName);
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
            ftc0.geometry().contains(gmySelected, 1).evaluate(function (contained, error) {
                if (error) {
                    handleEvaluating(false);
                    c.rp.lblMessages.setValue(m.labels.lblUnexpectedError + error);
                    c.rp.pnlMessages.style().set({ shown: true });
                    return;
                }
                if (!contained) {
                    handleEvaluating(false);
                    c.rp.lblMessages.setValue(m.labels.lblGeometryNotContained);
                    c.rp.pnlMessages.style().set({ shown: true });
                    return;
                }
                m.ftcAoi = ee.FeatureCollection(f);
                m.precalculated = false;
                m.haAoi = area;
                m.levelAoi = m.labels.lblDrawingTools;
                showInfoSelectedAoi();
            });
        });
    });
    var createChart = function (
        chartDataTable,
        chartOptions,
        chartType,
        chartPanel,
        chartOnClick
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
            if (typeof chartOnClick !== 'undefined') { chart.onClick(chartOnClick); }
            if (chartType === 'Table') {
                var header = dataTable[0];
                var cols = [];
                var suffixFinalYear = '';
                if (chartOptions.title === m.labels.lblTableLC) {
                    suffixFinalYear = '_' + chartOptions.final;
                }
                for (var c = 0; c < header.length; c++) {
                    cols.push(c === 0 ? ' ' + header[c].label : c + '_' + header[c].label + suffixFinalYear);
                }
                cols.push(header.length + '_Total');
                var list = ee.List([]);
                for (var index = 1; index < dataTable.length; index++) {// values
                    var element = dataTable[index];
                    var f = ee.Feature(null);
                    var rowTotal = 0;
                    for (var j = 0; j < element.length; j++) {
                        var value = element[j];
                        if (j === 0) {
                            value = value + '_' + chartOptions.initial;
                            f = f.set(cols[j], value);
                        }
                        else {
                            rowTotal = rowTotal + parseFloat(value);
                            f = f.set(cols[j], parseFloat(value));
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
                        chartPanel.widgets().set(0, ui.Label(chartOptions.title, { margin: '40px 10px 10px 10px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' }));
                        chartPanel.widgets().set(1, chart);
                        chartPanel.widgets().set(2, ui.Label(m.labels.lblDownloadCsv, { fontSize: '12px' }).setUrl(ee.FeatureCollection(list).getDownloadURL({ format: 'CSV', filename: 'TableData', selectors: cols })));
                    }
                );
            }
            else {
                chartPanel.widgets().set(0, chart); // replace 'Generating...' label with chart
            }
        });
    };
    /** Setup general charts: LC, LPD and Anual NDVI*/
    var setupGeneralCharts = function () {
        c.rp.charts.pnlGeneralCharts.clear();
        c.rp.charts.pnlGeneralCharts.add(c.rp.charts.lblGeneralChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi, ['lc', 'lpd', 'des', 'ndvi_annual', 'x2']);
        //  LAND COVER PIE CHART
        var lstFeatLC = mdlPrecalculation.namesLCColumns.map(function (pName, i) {
            var lstValues = ee.List([m.lv.lc.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLC = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsLC = {
            title: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLCSource.name + ') ' + m.defaultFinalLCYear,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.lc.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderLC.cat(ee.FeatureCollection(lstFeatLC).aggregate_array('row')), optionsLC, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        //  LPD PIE CHART       
        var lstFeatLPD = mdlPrecalculation.namesLPDColumns.slice(1).map(function (pName, i) { // slice(1)=lpd_0
            var lstValues = ee.List([m.lv.lpd.names[i + 1], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLPD = ee.List([
            [
                { label: 'LPD', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsLPD = {
            title: m.labels.lblLandProductivityDynamics,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.lpd.vis.palette.slice(1),
        };
        createChart(lstHeaderLPD.cat(ee.FeatureCollection(lstFeatLPD).aggregate_array('row')), optionsLPD, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        // DESERTIFICATION MODEL OF TURKEY
        /*var lstFeatDes = mdlPrecalculation.namesDesColumns.map(function (pName, i) {
            var lstValues = ee.List([m.lv.des.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderDes = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsDes = {
            title: m.labels.lblDesertificationLegend,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.des.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderDes.cat(ee.FeatureCollection(lstFeatDes).aggregate_array('row')), optionsDes, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        */
        // Villages population
        if (m.levelAoi === m.labels.lblSelectContainer || m.levelAoi === m.labels.lblLevel1) {
            var lstFeatPopulationByYear = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map(function (i) {
                var v = ftc.first().get('Pop_' + (2000 + i));
                var lstValues = ee.List([(2000 + i), v]);
                return ee.Feature(null, { row: lstValues });
            });
            var lstHeaderPopulationByYear = ee.List([
                [
                    { label: 'Year', role: 'domain', type: 'string' },
                    { label: 'Pop', role: 'data', type: 'number' },
                ],
            ]);
            var optionsPopByYear = {
                title: m.labels.lblPopulation,
                legend: { position: 'none' },
            };
            createChart(lstHeaderPopulationByYear.cat(ee.FeatureCollection(lstFeatPopulationByYear).aggregate_array('row')), optionsPopByYear, 'ColumnChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        }
        // HANSEN Forest loss
        /*var lstFeatForestLossByYear = mdlPrecalculation.yearsHansen.map(function (i) {
            var v = ftc.first().get('hansen_' + (2000 + i));
            var lstValues = ee.List([(2000 + i), v]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderForesLossByYear = ee.List([
            [
                { label: 'Year', role: 'domain', type: 'string' },
                { label: 'Ha', role: 'data', type: 'number' },
            ],
        ]);
        var optionsForestLossByLC = {
            title: m.labels.lblDeforestation,
            legend: { position: 'none' },
        };
        createChart(lstHeaderForesLossByYear.cat(ee.FeatureCollection(lstFeatForestLossByYear).aggregate_array('row')), optionsForestLossByLC, 'ColumnChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        */
        // NDVI ANNUAL
        var yearsNdvi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        var lstNdviByYear = yearsNdvi.map(function (i) {
            var v = ftc.first().get('ndvi_' + (2000 + i));
            var lstValues = ee.List([(2000 + i), v]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderNdviByYear = ee.List([
            [
                { label: 'Year', role: 'domain', type: 'number' },
                { label: 'NDVI Annual Mean', role: 'data', type: 'number' },
            ],
        ]);
        var optionsNdviByYear = {
            title: m.labels.lblAnnualNDVI,
            legend: { position: 'none' },
            vAxis: { title: 'NDVI x 10000' },
            //hAxis: { title: labels.lblCalendarYear, format: 'yyyy', gridlines: { count: 7 } },
            hAxis: { title: m.labels.lblYear, format: '####', gridlines: { count: 7 } },
        };
        createChart(lstHeaderNdviByYear.cat(ee.FeatureCollection(lstNdviByYear).aggregate_array('row')), optionsNdviByYear, 'LineChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        // NDVI MENSUAL, for user-drawn features     
        //if (!m.precalculated) {
            var chtNdviByMonthYear = ui.Chart.image.series(a.imcNDVIByMonthYear, ftc, ee.Reducer.mean(), 250);
            chtNdviByMonthYear.setOptions({
                title: m.labels.lblMonthlyNDVI,
                vAxis: { title: 'NDVI x 10000' },
                hAxis: { title: m.labels.lblCalendarYear, format: 'yyyy', gridlines: { count: 7 } },
            });
            createChartPanel(c.rp.charts.pnlGeneralCharts).add(chtNdviByMonthYear);
        //}
    };
    /** Setup combined charts: LPDxLC, SOCxLPD, SOCxLC, SOCxLPDxLC, LCxLPD table*/
    var setupMcCharts = function () {
        c.rp.charts.pnlMcCharts.clear();
        c.rp.charts.pnlMcCharts.add(c.rp.charts.lblMcChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi, ['x2']);
        var catsLCNoWater = [1, 2, 3, 4, 5, 6];
        var catsLPD = [1, 2, 3, 4, 5];
        //  COMBINED 1: LPD BY LAND COVER
        var handleClickFromChart = function (xValue, yValue, seriesName) {
            clearCombinedLayerAndLegend();
            if (xValue) { // lpdxlc
                var catLC = m.lv.lc.names.indexOf(xValue) + 1;
                var catLPD = m.lv.lpd.names.indexOf(seriesName); // 0-non veg
                var catCombined = parseInt('' + catLC + catLPD);
                var imgSelection = a.imgCombinedx2.clip(ftc).eq(catCombined).selfMask();
                var legendTitle = 'From chart: ' + m.labels.lblCombinedCategoriesArea + ' ' + formatNumber(yValue, 2) + ' ha.';
                var legendText = 'LC: ' + xValue + ' - LPD: ' + seriesName;
                // Reset selection from Multicriteria Analysis panel 
                handleClickReset();
                // Create and show combined layer and legend
                setupCombinedLayer(imgSelection, legendTitle, legendText, true);
            }
        };
        var lstFeatCombinedLC = catsLCNoWater.map(function (i) {
            var v1 = ftc.first().get(i + '_1');
            var v2 = ftc.first().get(i + '_2');
            var v3 = ftc.first().get(i + '_3');
            var v4 = ftc.first().get(i + '_4');
            var v5 = ftc.first().get(i + '_5');
            var lstValues = ee.List([m.lv.lc.names[i - 1], v1, v2, v3, v4, v5]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderC1 = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: m.lv.lpd.names[1], role: 'data', type: 'number' },
                { label: m.lv.lpd.names[2], role: 'data', type: 'number' },
                { label: m.lv.lpd.names[3], role: 'data', type: 'number' },
                { label: m.lv.lpd.names[4], role: 'data', type: 'number' },
                { label: m.lv.lpd.names[5], role: 'data', type: 'number' },
            ],
        ]);
        // Relative
        var optionsC1Rel = {
            title: m.labels.lblLPDperLC,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'relative',
            colors: m.lv.lpd.vis.palette.slice(1),
        };
        createChart(lstHeaderC1.cat(ee.FeatureCollection(lstFeatCombinedLC).aggregate_array('row')), optionsC1Rel, 'BarChart', createChartPanel(c.rp.charts.pnlMcCharts), handleClickFromChart);
        // Table with LPD ha per LC
        var lstFeatLCLPDTable = catsLCNoWater.map(function (i) {
            var values = catsLPD.map(function (c) {
                return ee.Number(ftc.first().get(i + '_' + c)).format('%.2f');
            });
            var lstValues = ee.List([m.lv.lc.names[i - 1]]).cat(values);
            return ee.Feature(null, { row: lstValues });
        });
        var colsT2 = [{ label: m.labels.lblLC + m.defaultFinalLCYear + '/' + m.labels.lblLPD, role: 'domain', type: 'string' }];
        m.lv.lpd.names.slice(1).forEach(function (lpd) {
            colsT2.push({ label: lpd, role: 'data', type: 'number' });
        });
        var lstHeaderLCLPDTable = ee.List([colsT2]);
        var optionsLCTLPDTable = {
            title: m.labels.lblTableLCLPD,
            initial: m.defaultFinalLCYear,
            final: m.defaultFinalLCYear,
            html: true,
            frozenColumns: 1,
        };
        createChart(lstHeaderLCLPDTable.cat(ee.FeatureCollection(lstFeatLCLPDTable).aggregate_array('row')), optionsLCTLPDTable, 'Table', createChartPanel(c.rp.charts.pnlMcCharts));
    };
    /** Setup transition charts, according to source and year selected in transition panel: LC comparison, LC net changes, LCxLC table*/
    var setupTransitionsCharts = function () {
        c.rp.charts.pnlTransitionsCharts.clear();
        c.rp.charts.lblTransitionsChartsTitle.setValue(m.labels.lblTransitionsCharts + ' - ' + m.selectedSource.name);
        c.rp.charts.pnlTransitionsCharts.add(c.rp.charts.lblTransitionsChartsTitle);
        var catsLC = [1, 2, 3, 4, 5, 6, 7];
        var fromYear = c.lp.tr.selLCFromYears.getValue();
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi, [
            'lc_' + fromYear + '_' + m.selectedSource.initials,
            'lc_' + m.selectedSource.lastYear + '_' + m.selectedSource.initials,
            'lc_trans_' + m.selectedSource.initials + '_' + fromYear + '_' + m.selectedSource.lastYear]);
        // chartTrans1 Comparison column chart LC
        var lstFeatLCCombo = mdlPrecalculation.namesLCColumns.map(function (pName, i) {
            var initialValue = ftc.first().get(pName + '_' + fromYear + '_' + m.selectedSource.initials);
            var finalValue = ftc.first().get(pName + '_' + m.selectedSource.lastYear + '_' + m.selectedSource.initials);
            var s = 'bar {fill-color:' + m.lv.lc.vis.palette[i] + '; stroke-width: 0.5; stroke-color: #000000}';
            var lstValues = ee.List([m.lv.lc.names[i], initialValue, s, finalValue, s]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLCCombo = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: fromYear, role: 'data', type: 'number' },
                { label: 'color1', role: 'style', type: 'string' },
                { label: m.selectedSource.lastYear, role: 'data', type: 'number' },
                { label: 'color2', role: 'style', type: 'string' },
            ],
        ]);
        var optionsLCCombo = {
            title: m.labels.lblLCPieChartChange + ' ' + fromYear + ' - ' + m.selectedSource.lastYear,
            width: 600,
            height: 400,
            legend: { position: 'none' },
            seriesType: 'bars',
        };
        createChart(lstHeaderLCCombo.cat(ee.FeatureCollection(lstFeatLCCombo).aggregate_array('row')), optionsLCCombo, 'ColumnChart', createChartPanel(c.rp.charts.pnlTransitionsCharts));
        // charTrans2 LC CANDLESTICK NET GAIN/LOSS CHART
        var lstFeatLCNetChange = mdlPrecalculation.namesLCColumns.map(function (pName, i) {
            var initialValue = ftc.first().get(pName + '_' + fromYear + '_' + m.selectedSource.initials);
            var finalValue = ftc.first().get(pName + '_' + m.selectedSource.lastYear + '_' + m.selectedSource.initials);
            var diff = ee.Number(finalValue).subtract(ee.Number(initialValue)).format('%,.2f');
            var tt = ee.String(m.labels.lblDifference + ' (ha): ').cat(diff);
            var lstValues = ee.List([m.lv.lc.names[i], initialValue, initialValue, finalValue, finalValue, tt]);
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
            title: m.labels.lblNetLCChanges + ' ' + fromYear + ' - ' + m.selectedSource.lastYear,
            legend: { position: 'none' },
            bar: { groupWidth: '100%' },
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            }
        };
        createChart(lstHeaderLCNetChange.cat(ee.FeatureCollection(lstFeatLCNetChange).aggregate_array('row')), optionsLCNetChange, 'CandlestickChart', createChartPanel(c.rp.charts.pnlTransitionsCharts));
        // chartTrans3 Table with transitions LC/LC
        var lstFeatLCTransTable = catsLC.map(function (i) {
            var transition = 'lc_trans_' + m.selectedSource.initials + '_' + fromYear + '_' + m.selectedSource.lastYear + '_' + i;
            var values = catsLC.map(function (c) {
                return ee.Number(ftc.first().get(transition + '_' + c)).format('%.2f');
            });
            var lstValues = ee.List([m.lv.lc.names[i - 1]]).cat(values);
            return ee.Feature(null, { row: lstValues });
        });
        var colsT1 = [{ label: fromYear + '/' + m.selectedSource.lastYear, role: 'domain', type: 'string' }];
        m.lv.lc.names.forEach(function (lc) {
            colsT1.push({ label: lc, role: 'data', type: 'number' });
        });
        var lstHeaderLCTransTable = ee.List([colsT1]);
        var optionsLCTransTable = {
            title: m.labels.lblTableLC,
            initial: fromYear,
            final: m.selectedSource.lastYear,
            html: true,
            frozenColumns: 1,
        };
        createChart(lstHeaderLCTransTable.cat(ee.FeatureCollection(lstFeatLCTransTable).aggregate_array('row')), optionsLCTransTable, 'Table', createChartPanel(c.rp.charts.pnlTransitionsCharts));
    };
    /** Creates combined layer from image adding legend to map panel, invoked from calculateMultiCriteria() and combined chart click */
    var setupCombinedLayer = function (image, legendTitle, legendText, fromChart) {
        c.cp.pnlCombinedLegend = ui.Panel();
        if (fromChart) { // if invoked from chart add checkbox to show/hide layer
            var chbCombined = ui.Checkbox(legendTitle, true, null, false, { margin: '1px 0px', fontSize: '12px', fontWeight: 'bold' });
            chbCombined.onChange(function (checked) {
                showLayer(m.labels.lblHotspots, checked);
            });
            c.cp.pnlCombinedLegend.add(chbCombined);
        }
        else {
            c.cp.pnlCombinedLegend.add(ui.Label(legendTitle, { margin: '1px 0px', fontSize: '12px', fontWeight: 'bold' }));
        }
        c.cp.pnlCombinedLegend.add(mdlLegends.createCatRow(m.lv.custom.vis.palette[0], legendText, false));
        c.cp.pnlCombinedLegend.style().set({
            position: 'bottom-center'
        });
        var lblDownloadText = ui.Label({
            style: {
                fontSize: '12px',
                margin: '1px 1px 4px 1px',
                padding: '2px',
            },
        });
        c.cp.pnlCombinedLegend.add(lblDownloadText);
        if (image !== null) {
            var options = { region: m.ftcAoi.geometry(), name: legendText };
            image.getDownloadURL(options, function (url, error) {
                // error ie: Pixel grid dimensions (159378x46852) must be less than or equal to 10000.
                lblDownloadText.setValue(m.labels.lblGeneratingDownloadLink);
                if (url !== null) {
                    lblDownloadText.setValue(m.labels.lblDownload);
                    lblDownloadText.setUrl(url);
                }
                else {
                    //lblDownloadText.setValue(labels.lblBigImage);
                    lblDownloadText.setValue('');
                }
            });
        }
        var showLyrCombined = true;
        if (!fromChart && !c.lp.mc.pnlContainer.style().get('shown')) {
            // hide legend and map
            c.cp.pnlCombinedLegend.style().set({
                shown: false,
            });
            showLyrCombined = false;
        }
        c.cp.map.setOptions('SATELLITE');
        c.cp.map.widgets().add(c.cp.pnlCombinedLegend);
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblHotspots), ui.Map.Layer(image, m.lv.custom.vis, m.labels.lblHotspots, showLyrCombined));
    };
    /** Creates a new image layer and calculate area considering categories selected in multicriteria panel*/
    var calculateMultiCriteria = function () {
        c.rp.lblMessages.setValue(m.labels.lblProcessingArea);
        c.rp.pnlMessages.style().set({ shown: true });
        handleEvaluating(true);
        var totalArea = 0;
        var statsAreaBE;
        a.imgCustom = ee.Image(0).selfMask();
        // Function to filter image with categories 
        var getFilteredImage = function (image, categories) {
            var imgFiltered = image.clip(m.ftcAoi).eq(parseInt(categories[0]));
            for (var i = 1; i < categories.length; i++) {
                imgFiltered = imgFiltered.or(image.eq(parseInt(categories[i])));
            }
            return imgFiltered.selfMask();
        };
        // Foreach section panel in hotspots panel check which categories are selected
        var selectedPerSection = [];
        var filteredImages = [];
        var advancedMode = true;
        c.lp.mc.pnlEntries.widgets().forEach(function (panel, panelIndex) {
            if (panelIndex < m.mcEntries.length) {
                var selectedCatNumbers = [];
                panel.widgets().forEach(function (element, index) {
                    if (index > 0) { // title
                        if (element.widgets().get(1).getValue()) {
                            var pidx = m.mcEntries[panelIndex].names.indexOf(element.widgets().get(1).getLabel());
                            selectedCatNumbers.push(m.mcEntries[panelIndex].categories[pidx]);
                        }
                    }
                });
                selectedPerSection.push(selectedCatNumbers);
                if (advancedMode) {
                    // for each section that has at least one category selected filter image and add to filteredImages array                      
                    if (selectedCatNumbers.length > 0) {
                        filteredImages.push(getFilteredImage(m.mcEntries[panelIndex].image, selectedCatNumbers));
                    }
                }
            }
        });
        if (advancedMode) {
            // base image 
            var imgProduct = ee.Image(1).clip(m.ftcAoi);
            // multiply filtered images
            filteredImages.forEach(function (f) {
                imgProduct = imgProduct.multiply(f);
            });
            a.imgCustom = imgProduct;
            // Calculate only selected categories
            var imgCombinedCatAreaAdv = a.imgCustom.eq(1)
                .rename('area')
                .multiply(ee.Image.pixelArea()).divide(10000);
            // If country is selected go with best effort
            var be = m.levelAoi === m.labels.lblSelectContainer ? true : false;
            var statsAreaAdv = imgCombinedCatAreaAdv.reduceRegion({
                reducer: ee.Reducer.sum(),
                geometry: m.ftcAoi.first().geometry(),
                scale: 100,
                bestEffort: be
            });
            totalArea = statsAreaAdv.get('area');
            statsAreaBE = imgCombinedCatAreaAdv.reduceRegion({
                reducer: ee.Reducer.sum(),
                geometry: m.ftcAoi.first().geometry(),
                scale: 100,
                bestEffort: true
            });
        }
        // Compute area sum, when ready set title with total ha and try to create url to download image
        m.evalSet['multicriteria'] = true;
        totalArea.evaluate(function (t, error) {
            var legendTitle;
            if (error) {
                // Try with bestEffort=true            
                statsAreaBE.get('area').evaluate(function (t, error) {
                    delete m.evalSet['multicriteria'];
                    if (Object.keys(m.evalSet).length === 0) {
                        handleEvaluating(false);
                    }
                    if (error) {
                        legendTitle = m.labels.lblErrorCalculating;
                    }
                    else {
                        legendTitle = m.labels.lblHotspots + ' ~ ' + formatNumber(t, 2) + ' ha.';
                    }
                    setupCombinedLayer(t === 0 ? null : a.imgCustom, legendTitle, m.labels.lblCombinedCategoriesArea, false);
                });
            }
            else {
                delete m.evalSet['multicriteria'];
                if (Object.keys(m.evalSet).length === 0) {
                    handleEvaluating(false);
                }
                legendTitle = m.labels.lblHotspots + (m.levelAoi === m.labels.lblSelectContainer ? ' ~ ' : ' ') + formatNumber(t, 2) + ' ha.';
                setupCombinedLayer(t === 0 ? null : a.imgCustom, legendTitle, m.labels.lblCombinedCategoriesArea, false);
            }
        });
    }
    /** Creates a new image layer and calculate area considering categories selected in multicriteria panel*/
    /** Returns true if at least one category in hotspots is checked*/
    var mcCategoryChecked = function () {
        for (var p = 0; p < m.mcEntries.length; p++) {
            var widgetsArray = c.lp.mc.pnlEntries.widgets().get(p).widgets().getJsArray();
            for (var i = 1; i < widgetsArray.length; i++) { // 0=panel title
                if (widgetsArray[i].widgets().get(1).getValue()) { // 0=colorbox 1=chkbox
                    return true;
                }
            }
        }
        return false;
    };
    /** Reset calcultation and uncheck all multicriteria categories*/
    var handleClickReset = function () {
        clearCombinedLayerAndLegend();
        // unselect combined checks
        for (var p = 0; p < m.mcEntries.length; p++) {
            var widgetsArray = c.lp.mc.pnlEntries.widgets().get(p).widgets().getJsArray();
            for (var i = 1; i < widgetsArray.length; i++) { // 0=title
                widgetsArray[i].widgets().get(1).setValue(false);
            }
        }
        c.lp.op.sldOpacity.setValue(1);
    };
    /** Recalculate combined layer with selected multicriteria categories */
    c.lp.mc.btnCalculate.onClick(function () {
        clearCombinedLayerAndLegend();
        if (mcCategoryChecked()) {
            calculateMultiCriteria();
            c.lp.op.sldOpacity.setValue(1);
        }
    });
    c.lp.mc.btnReset.onClick(handleClickReset);
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
    m.ftcAoi = ftc0;
    m.levelAoi = m.labels.lblSelectContainer;
    m.haAoi = 0;
    m.precalculated = true;
    // Countries names for dropdown
    m.names1 = m.ftcLelvel1.aggregate_array('name').getInfo();
    m.codes1 = m.ftcLelvel1.aggregate_array('OBJECTID').getInfo();
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