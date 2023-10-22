var imgFireIndex = ee.Image("users/projectgeffao/World/FireRecurrenceIndex_MCD64_2001_2021_World"),
    imgPrecipitationTrend = ee.Image("users/projectgeffao/World/Climate/PrecipTrendIndex_World_2011_2021"),
    //ftcPA = ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    ftcPANew = ee.FeatureCollection("users/projectgeffao/Turkey/Protecte_Areas_Turkey"),
    ftcKBA = ee.FeatureCollection("users/projectgeffao/World/KBAsGlobal_2021_March_01_POL_Fix"),
    imgTerrain = ee.Image("users/projectgeffao/Turkey/Terrain_rgb3b_Turkey_v2"),
    ftc0 = ee.FeatureCollection("users/projectgeffao/Turkey/TUR_Precal_Level0_v20"),
    ftc1 = ee.FeatureCollection("users/projectgeffao/Turkey/TUR_Precal_Level1_v20"),
    ftc2 = ee.FeatureCollection("users/projectgeffao/Turkey/TUR_Precal_Level2_v20"),
    ftcBasins = ee.FeatureCollection("users/projectgeffao/Turkey/TUR_Precal_Level_Basins_v20"),
    ftcSubbasins = ee.FeatureCollection("users/projectgeffao/Turkey/TUR_Precal_Level_Subbasins_v19"),
    ftcUpperProjectAreas = ee.FeatureCollection("users/projectgeffao/Turkey/TUR_Precal_Level_Upper_Project_Areas_v20"),
    ftcSLM = ee.FeatureCollection("users/projectgeffao/Turkey/slm_Wocat_App"),
    imgErosionTDEM = ee.Image('users/projectgeffao/Turkey/Erozyon_Gvmt_8Categories'),
    imgBau7cat = ee.Image('users/projectgeffao/Turkey/bau2040_t02020_7cat'),
    imgPot104cat = ee.Image('users/projectgeffao/Turkey/bau2040_10C2040_4cat'),
    imgWSlpd = ee.Image('users/wocatapps/World/LPD_2005_2019_World_MK_MTDI3_Des025');
var imgBaseDeg = ee.Image('users/projectgeffao/Turkey/LandCover/CORINE_LC_BaselineLayers_UNCCD_CAT_Turkey')
              .select('lc_degradation_2000_2012');
var imgRepoDeg = ee.Image('users/projectgeffao/Turkey/LandCover/CORINE_LC_ReportingLayers_UNCCD_CAT_Turkey')
              .select('lc_degradation_2012_2018');
var lp_01_15 = ee.Image("users/wocatapps/World/LPD_2001_2015_World_MK_MTDI3_Des025").toByte().clip(ftc0).selfMask();
var lp_05_19 = ee.Image("users/wocatapps/World/LPD_2005_2019_World_MK_MTDI3_Des025").toByte().clip(ftc0).selfMask();
var sc_01_15 = ee.Image("users/projectgeffao/Turkey/SOC_National_Deg_Baseline_250m").toByte().clip(ftc0);
var sc_15_19 = ee.Image("users/projectgeffao/Turkey/SOC_National_Deg_Reporting_250m").toByte().clip(ftc0);
    sc_01_15 = sc_01_15.where(sc_01_15.eq(0),2);
    sc_15_19 = sc_15_19.where(sc_15_19.eq(0),2);
/** 
* App: Turkey DSS
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
// oct 17:  con la v13 no funciona, faltan las columnas viejas y de las nuevas hay 5?
// karkod_0 (Float)	karkod_1 (Float)	karkod_2 (Float)	karkod_3 (Float)	karkod_4 (Float)	karkod_5 (Float)	 chequear con césar las columnas
// queda la sección LDN Action Plan, se ven las dos capas, faltan los gráficos
/** Modules */
var mdlLegends = require('users/projectgeffao/modules:legends2.js');
var mdlPrecalculation = require('users/projectgeffao/Turkey:Apps/Precalculation_Turkey_Template.js');
var mdlLocalization = require('users/projectgeffao/Turkey:Apps/localization_Turkey_Template.js');
/** Assets */
var a = {};
// From precalculation script
a.imgMountains = mdlPrecalculation.imgMountains.clip(ftc0);
a.imgLPD = mdlPrecalculation.imgLPD.unmask().clip(ftc0);
a.imgWSlpd = imgWSlpd.unmask().clip(ftc0); ///Workshop LPD
a.imgKarKod = mdlPrecalculation.imgKarKod.clip(ftc0);
a.imgSOC = mdlPrecalculation.imgSOC.clip(ftc0);
a.imgCombinedx2 = mdlPrecalculation.baseLCSource.imgCombinedx2.clip(ftc0);
a.imgCombinedx3 = mdlPrecalculation.baseLCSource.imgCombinedx3.clip(ftc0);
a.imgLastLC = mdlPrecalculation.baseLCSource.imgLcAll.select('y' + mdlPrecalculation.baseLCSource.lastYear).clip(ftc0);
//a.imgForestChange = mdlPrecalculation.baseLCSource.imgForestChange.clip(ftc0);
a.imgDes = mdlPrecalculation.imgDes.clip(ftc0);
a.imgSOC6Cat = mdlPrecalculation.imgSOC6Cat;
//a.imgSedi9Cat = mdlPrecalculation.imgSedi9Cat.clip(ftc0);
a.imgNPP = mdlPrecalculation.imgNPP.clip(ftc0);
a.imgPot10 = mdlPrecalculation.imgPot10.clip(ftc0);
a.imgBau = mdlPrecalculation.imgBau.clip(ftc0);
a.imgKBABin = mdlPrecalculation.imgKBABin.unmask().clip(ftc0);
a.imgPABin = mdlPrecalculation.imgPABin.unmask().clip(ftc0);
a.imgTDEM5cat = mdlPrecalculation.imgTDEM5cat.unmask().clip(ftc0);
a.imgResponseLC = mdlPrecalculation.imgResponseLC.unmask().clip(ftc0);
a.imgResponse = mdlPrecalculation.imgResponse.unmask().clip(ftc0);
// SDGs
// National
a.imgSDGBaselineNACsd = mdlPrecalculation.imgSDGBaselineNACsd.unmask().clip(ftc0);
a.imgSDGReportNACsd = mdlPrecalculation.imgSDGReportNACsd.unmask().clip(ftc0);
a.imgSDGStatusNACsd = mdlPrecalculation.imgSDGStatusNACsd.unmask().clip(ftc0);
a.imgSDGComparisonNACsd = mdlPrecalculation.imgSDGComparisonNACsd.unmask().clip(ftc0);
// From imports
a.imgFireIndex = imgFireIndex.updateMask(1).clip(ftc0);
a.imgBau7cat = imgBau7cat
a.imgPot104cat = imgPot104cat
// For multicriteria calculation
a.imgCustom = ee.Image(0).selfMask();
a.imgMask = ee.Image(0).selfMask();
// Filter global assets
a.ftcKBA = ftcKBA.filter(ee.Filter.eq('ISO3', 'TUR'));
//a.ftcPA = ftcPA.filter(ee.Filter.eq('ISO3', 'TUR'));
var paletteSLMList = ee.List(['#db9003', '#08964f', '#49d7e1']);
var namesSLMList = ee.List(['Approach', 'Technology', 'UNCCD PRAIS']);
a.ftcSLMStyled = ftcSLM.map(function (f) {
    return f.set({ style: { color: paletteSLMList.get(namesSLMList.indexOf(f.get("Type"))), pointSize: 5 } });
});
// NDVI by month and year
var startYear = 2001;
var endYear = 2022;
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
initApp(mdlLocalization.languages[1]);
function initApp(lan) {
    /*******************************************************************************
    * 1-Model *
    ******************************************************************************/
    // JSON object for storing the data model.
    var m = {};
    m.labels = mdlLocalization.getLocLabels(lan);
    m.evalSet = {};
    m.maxAreaHa = 10000000;
    // Options: NATIONAL LC
    m.transitionsSources = mdlPrecalculation.sources;
    // Selected transition source 
    m.selectedSource = m.transitionsSources[0];
    m.defaultFinalLCYear = mdlPrecalculation.baseLCSource.lastYear;
    m.defaultInitialLCYear = mdlPrecalculation.baseLCSource.initialYears[0];
    // More info & contact
    m.info = {
        referenceDocUrl: '',
        contactEmail1: 'sibel.tekin@fao.org',
        contactEmail2: 'ingrid.teich@fao.org',
        contactEmail3: 'suna.morkoc@csb.gov.tr',
        contactEmail4: '',
        logoAssetId: 'users/projectgeffao/Turkey/Logo_TukApp',
        logoDimensions: '1492x257',
    }
    // Feature collections options to click on the map to obtain precalculated statistics
    m.assetsClick = {};
    m.assetsClick[m.labels.lblNone] = null;
    m.assetsClick[m.labels.lblLevel1] = ftc1;
    m.assetsClick[m.labels.lblLevel2] = ftc2;
    m.assetsClick[m.labels.lblBasins] = ftcBasins;
    m.assetsClick[m.labels.lblSubbasins] = ftcSubbasins;
    m.assetsClick[m.labels.lblProjectAreas] = ftcUpperProjectAreas;
    m.assetsClick[m.labels.lblSLM] = ftcSLM;
    // Feature collection to query on map click
    m.ftcClickOn = null;
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
        lcDeg: {
            vis: {
                min: 1, max: 3, opacity: 1,
                palette: ['#AB2727', '#e5e5c9', '#45A146'],
            },
            names: [
                m.labels.lblDegradation,
                m.labels.lblStable,
                m.labels.lblImprovement,
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
        karkod: {
            vis: {
                min: 1, max: 5, opacity: 1,
                palette: ['#5acf67', '#377e3f', '#c2cd0e', '#e2a3c9', '#e2e1d9'],
            },
            names: [
                m.labels.lblConiferous,
                m.labels.lblBroadleaft,
                m.labels.lblMixedForest,
                m.labels.lblScrub,
                m.labels.lblNoForest,
            ]
        },
        mountains: {
            vis: {
                min: 1, max: 7, opacity: 1,
                palette: ['#c5fff8', '#95dbd3', '#92db9c', '#55c364', '#8b9c15', '#d99c22', '#9e7219'],
            },
            names: [
                m.labels.lblMountain1,
                m.labels.lblMountain2,
                m.labels.lblMountain3,
                m.labels.lblMountain4,
                m.labels.lblMountain5,
                m.labels.lblMountain6,
                m.labels.lblMountain7,
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
        borderBasins: { vis: { color: 'blue', fillColor: '00000000', width: 1 } },
        borderSubbasins: { vis: { color: 'purple', fillColor: '00000000', width: 1 } },
        borderProjectAreas: { vis: { color: '00ff80', fillColor: '00000000', width: 1 } },
        highlight: { vis: { color: 'red', fillColor: '00000000' } },
        soc: { vis: { min: 0, max: 100, palette: ['#fcffac', '#a60000'] } },
        custom: { vis: { max: 1, min: 1, opacity: 1, palette: ['#FF00FF'] } },
        terrain: {
            vis: {
                min: 0, max: 3000,
                palette: ['#87e2ffff', '#80d5e3ff', '#73c2bcff', '#66af95ff', '#589c6eff', '#4b8947ff', '#3e7620ff', '#33720cff', '#33c05aff', '#8bdb82ff', '#c4e297ff', '#d5e0a1ff', '#e7deabff', '#f8dcb5ff', '#fddab4ff', '#fcd7adff', '#fad4a5ff', '#f8d29eff', '#f6cf97ff', '#f4cc8fff', '#f2c988ff', '#f0c780ff', '#eec479ff', '#ecc171ff', '#eabe6aff', '#e8bc62ff', '#e6b95bff', '#e4b653ff', '#e2b34cff', '#e0b144ff', '#deae3dff', '#dcab35ff', '#daa82eff', '#d9a627ff', '#d1a425ff', '#caa224ff', '#c2a023ff', '#bb9e22ff', '#b39c20ff', '#ac9a1fff', '#a7991eff', '#a7971dff', '#a6961cff', '#a5941bff', '#a5931aff', '#a49119ff', '#a49019ff', '#a38e18ff', '#a38d17ff', '#a38b16ff', '#a28a15ff', '#a28814ff', '#a28613ff', '#a18512ff', '#a18311ff', '#a08110ff', '#a0800fff', '#9f7e0eff', '#9f7c0eff', '#9f7b0dff', '#9e790cff', '#9e780bff', '#9d760aff', '#9d7509ff', '#9c7308ff', '#9c7207ff', '#9b7006ff', '#9b6e05ff', '#9a6d04ff', '#9a6b03ff', '#9a6902ff', '#996801ff', '#996600ff', '#9a640aff', '#9b6218ff', '#9c6025ff', '#9e5e33ff', '#9f5c40ff', '#a05a4eff', '#a25a5aff', '#a55e5eff', '#a76262ff', '#a96767ff', '#ac6b6bff', '#ae7070ff', '#b17474ff', '#b27979ff', '#b37d7dff', '#b48181ff', '#b48686ff', '#b58a8aff', '#b68f8fff', '#b79393ff', '#b89898ff', '#ba9c9cff', '#bca0a0ff', '#bda5a5ff', '#bfa9a9ff', '#c1aeaeff', '#c2b2b2ff', '#c4b6b6ff', '#c6bbbbff', '#c7bfbfff', '#c9c3c3ff', '#cac8c8ff', '#ccccccff', '#d0d0d0ff', '#d3d3d3ff', '#d7d7d7ff', '#dbdbdbff', '#dfdfdfff', '#e3e3e3ff', '#e7e7e7ff', '#ebebebff', '#efefefff', '#f3f3f3ff', '#f7f7f7ff', '#fbfbfbff']
            }
        },
        pa: { vis: { color: 'green', width: 1 } },
        kba: { vis: { color: 'orange' } },
        fireIndex: { vis: { opacity: 1, min: 0, max: 0.5, palette: ['#fcfdbf', '#fc8761', '#b63679', '#50127b', '#000004'] } },
        precipTrend: { vis: { min: -3, max: 3, opacity: 1, palette: ["#d63000", "#ffffff", "#062fd6"] } },
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
        erosionTDEM: {
            vis: { min: 1, max: 5, opacity: 1, palette: ['#ffdfa5', '#f5a969', '#c28653', '#9e6d44', '#7f5837'] },
            names: [
                m.labels.lblTDEM1,
                m.labels.lblTDEM2,
                m.labels.lblTDEM3,
                m.labels.lblTDEM4,
                m.labels.lblTDEM5,
            ]
        },
        /*        erosionTDEM: {
                    vis: { min: 0, max: 8, opacity: 1, palette: ['#ffffff', '#07a811', '#09db16', '#b7cb0c', '#cee40d', '#fef622', '#feb532', '#d17534', '#d1442e'] },
                    names: [
                        m.labels.lblNoDataZero,
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
        */
        des: {
            vis: { min: 0, max: 9, opacity: 1, palette: ['#d8ded6', '#176603', '#00ab00', '#80ff00', '#fdff76', '#fce644', '#fd9a00', '#ff6666', '#ff0000', '#990000'] },
            names: [
                m.labels.lblNoData,
                m.labels.lblDesertification1,
                m.labels.lblDesertification2,
                m.labels.lblDesertification3,
                m.labels.lblDesertification4,
                m.labels.lblDesertification5,
                m.labels.lblDesertification6,
                m.labels.lblDesertification7,
                m.labels.lblDesertification8,
                m.labels.lblDesertification9,
            ]
        },
        bau: {
            vis: { min: -5, max: +5, opacity: 1, palette: ['#922100', '#f0e282', '#1e6d0f'] }
        },
        potential: {
            vis: { min: 0, max: +4, opacity: 1, palette: ['#feffb2', '#1e6d0f'] }
        },
        fgl: {
            vis: { min: 1, max: 2, opacity: 1, palette: ["ff1a04", "061aff"] },
            names: [
                m.labels.lblForestLoss,
                m.labels.lblForestGain,
            ]
        },
        sdg1531: {
            vis: {
                min: 0, max: 4, opacity: 1,
                palette: ['#000000', '#9b2779', '#ffffe0', '#006500', '#78a4e5'],
            },
            names: [
                m.labels.lblNoData,
                m.labels.lblSDGDegrading,
                m.labels.lblSDGStable,
                m.labels.lblSDGImproving,
                m.labels.lblWaterbody,
            ]
        },
        slm: {
            vis: {
                palette: ['#db9003', '#08964f', '#49d7e1'],
            },
            names: [
                m.labels.lblApproach,
                m.labels.lblTechnology,
                m.labels.lblUNCCDPrais,
            ]
        },
        response: {
            vis: {
                min: 1, max: 3, opacity: 1,
                palette: ['#01871e', '#02d02e', '#a3ffbb'],
            },
            names: [
                m.labels.lblAvoid,
                m.labels.lblReduce,
                m.labels.lblReverse,
            ]
        },
        responseLC: {
            vis: {
                min: 0, max: 9, opacity: 1,
                palette: ['white', '#01871e', '#02d02e', '#a3ffbb', '#a06b3e', '#f3a35e', '#f3bf8b', '#e4de40', '#fdff57', '#fbffbd']
            },
            names: [
                m.labels.lblNoData,
                m.labels.lblForest + ' ' + m.labels.lblConservation,
                m.labels.lblForest + ' ' + m.labels.lblManagement,
                m.labels.lblForest + ' ' + m.labels.lblRehabilitation,
                m.labels.lblGrassland + ' ' + m.labels.lblConservation,
                m.labels.lblGrassland + ' ' + m.labels.lblManagement,
                m.labels.lblGrassland + ' ' + m.labels.lblRehabilitation,
                m.labels.lblCropland + ' ' + m.labels.lblConservation,
                m.labels.lblCropland + ' ' + m.labels.lblManagement,
                m.labels.lblCropland + ' ' + m.labels.lblRehabilitation,
            ]
        }
    };
    // Map layers configuration
    m.layerEntries = [
        /*       {
                   asset: a.imgWSlpd,
                   style: m.lv.lpd.vis,
                   name: m.labels.lblLandProductivityDynamicsWS,
                   visible: false,
                   legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandProductivityDynamicsWS, m.lv.lpd.names, m.lv.lpd.vis.palette, false, false),
                   group: 'RASTER',
                   citation: ''
               },*/
        {
            asset: imgTerrain,
            style: {},
            name: m.labels.lblTopography,
            visible: true,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblElevation + ' (m)', m.lv.terrain.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1K4kOlrLskRaI7wXHUoMiIn22xUjJRCkJ/view?usp=sharing'
        },
        {
            asset: a.imgLastLC,
            style: m.lv.lc.vis,
            name: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLCSource.name + ') ' + mdlPrecalculation.baseLCSource.lastYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLCSource.name + ') ' + mdlPrecalculation.baseLCSource.lastYear, m.lv.lc.names, m.lv.lc.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/13zdWlXfyiG9DLUPsKolANd4Zl2_jYrIK/view?usp=share_link'
        },
        {
            asset: a.imgKarKod,
            style: m.lv.karkod.vis,
            name: m.labels.lblKarKod,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblKarKod, m.lv.karkod.names, m.lv.karkod.vis.palette, false, false),
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
            citation: 'https://drive.google.com/file/d/1sJihLLEhw0_AEkbX8vit1f98VlLXd6NY/view?usp=sharing'
        },
        {
            asset: a.imgSOC,
            style: m.lv.soc.vis,
            name: m.labels.lblNationalSocMap,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblSOCTonnesHa, m.lv.soc.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1xgfB0KoP8--Bq9JDjcCTGxiX84pcgsKw/view?usp=share_link'
        },
        {
            asset: a.imgDes,
            style: m.lv.des.vis,
            name: m.labels.lblDesertification,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblDesertificationLegend, m.lv.des.names, m.lv.des.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1kHetaZFDzmXwIWdG0bZlpsu8_4lVkTe5/view?usp=share_link'
        },
        {
            asset: a.imgBau,
            style: m.lv.bau.vis,
            name: m.labels.lblPredictedSOCChange,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblPredictedSOCChangeLegend, m.lv.bau.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1AtE7NA3q0gx4cE0yReN3CeBqQWBy2ljU/view?usp=share_link'
        },
        {
            asset: a.imgPot10,
            style: m.lv.bau.vis,
            name: m.labels.lblSOCChange,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblSOCChangeLegend, m.lv.potential.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1qVnT7VB7LQ52QBReeVaSmWuRJJSBvwoG/view?usp=share_link'
        },
        /*        {
                    asset: a.imgSedi9Cat,
                    style: m.lv.erosion.vis,
                    name: m.labels.lblErosion,
                    visible: false,
                    legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblErosionLegend, m.lv.erosion.names, m.lv.erosion.vis.palette, false, false),
                    group: 'RASTER',
                    citation: 'https://link.springer.com/article/10.1007%2Fs10661-020-08429-5'
                },
        */
        {
            asset: a.imgTDEM5cat,
            style: m.lv.erosionTDEM.vis,
            name: m.labels.lblTurkeyDynamicErosionModel,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblTurkeyDynamicErosionModel, m.lv.erosionTDEM.names, m.lv.erosionTDEM.vis.palette, false, false),
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
            citation: 'https://drive.google.com/file/d/1fL21VUsqhR8iaPpQaNIzQF9yCqU7PN_N/view?usp=sharing'
        },
        {
            asset: imgPrecipitationTrend,
            style: m.lv.precipTrend.vis,
            name: m.labels.lblPrecipitationTrend,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblPrecipitationTrend, m.lv.precipTrend.vis, m.labels.lblNegTrend, '', m.labels.lblPosTrend),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1XhFfwjvCbCkw_LOkTwTWS_78VC8gUvC8/view?usp=share_link'
        },
        {
            asset: a.imgMountains,
            style: m.lv.mountains.vis,
            name: m.labels.lblMountains,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblMountains, m.lv.mountains.names, m.lv.mountains.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1iKi7-Bd9f-FWgLBYWdqHdqFkk1IiyPgm/view?usp=share_link'
        },
        {
            asset: a.imgFireIndex,
            style: m.lv.fireIndex.vis,
            name: m.labels.lblFireIndex,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblFireIndex, m.lv.fireIndex.vis, '0.05', '0.25', '0.5'),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/10j4HOPpLMrZCLRiBurhqSCfaNhptQR86/view?usp=share_link'
        },
        /*{
            asset: a.imgForestChange,
            style: m.lv.fgl.vis,
            name: m.labels.lblForestGainsLosses + ' ' + m.defaultInitialLCYear + '-' + m.defaultFinalLCYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblForestGainsLosses, m.lv.fgl.names, m.lv.fgl.vis.palette, false, false),
            group: 'GENERAL',
        },*/
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
        {
            asset: ftcBasins,
            style: m.lv.borderBasins.vis,
            name: m.labels.lblBasins,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
        },
        {
            asset: ftcSubbasins,
            style: m.lv.borderSubbasins.vis,
            name: m.labels.lblSubbasins,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
        },
        {
            asset: ftcUpperProjectAreas,
            style: m.lv.borderProjectAreas.vis,
            name: m.labels.lblProjectAreas,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
        },
        {
            asset: a.ftcKBA,
            style: m.lv.kba.vis,
            name: m.labels.lblKeyBiodiversityAreas,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: 'https://drive.google.com/file/d/1vBuKyDuF3LPDiIzEgit0Aca8nES8pM2M/view?usp=share_link'
        },
        {
            asset: ftcPANew,//a.ftcPA,
            style: m.lv.pa.vis,
            name: m.labels.lblProtectedAreas,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: 'https://drive.google.com/file/d/1G44aTkwfVk1HE3m0T8i-bbGTmxrnkPKB/view?usp=share_link'
        },
        {
            asset: a.ftcSLMStyled,
            style: { styleProperty: "style" },
            name: m.labels.lblSLM,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSLM, m.lv.slm.names, m.lv.slm.vis.palette, false, true),
            group: 'FEATURES',
            citation: 'https://drive.google.com/file/d/1opIAn4DrQTN_h2gQE1ZPGBer3haTrjko/view?usp=sharing'
        },
    ];
    // SDG
    m.SDGLayerEntries = [
        // National
        {
            asset: a.imgSDGBaselineNACsd,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531BasNACsd,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531BasNACsd, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGReportNACsd,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531RepNACsd,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531RepNACsd, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGStatusNACsd,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531StaNACsd,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531StaNACsd, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGComparisonNACsd,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531ComNACsd,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531ComNACsd, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
//LC
 {
            asset: imgBaseDeg,
            style: m.lv.lcDeg.vis,
            name: m.labels.lblLandCoberDegradationBas,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCoberDegradationBas, m.lv.lcDeg.names, m.lv.lcDeg.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
   {
            asset: imgRepoDeg,
            style: m.lv.lcDeg.vis,
            name: m.labels.lblLandCoberDegradationRep,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCoberDegradationRep, m.lv.lcDeg.names, m.lv.lcDeg.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
 //LPD
  {
            asset: lp_01_15,
            style: m.lv.lpd.vis,
            name: m.labels.lblLPDBas,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLPDBas, m.lv.lpd.names, m.lv.lpd.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
   {
            asset: lp_05_19,
            style: m.lv.lpd.vis,
            name: m.labels.lblLPDRep,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLPDRep, m.lv.lpd.names, m.lv.lpd.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
 //SOC
 {
            asset: sc_01_15,
            style: m.lv.lcDeg.vis,
            name: m.labels.lblSOCBas,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSOCBas, m.lv.lcDeg.names, m.lv.lcDeg.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
   {
            asset: sc_15_19,
            style: m.lv.lcDeg.vis,
            name: m.labels.lblSOCRep,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSOCRep, m.lv.lcDeg.names, m.lv.lcDeg.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },       
    ];
    m.LDNActionPlanLayerEntries = [
        {
            asset: a.imgResponse,
            style: m.lv.response.vis,
            name: m.labels.lblResponseHierarchy,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblResponseHierarchy, m.lv.response.names, m.lv.response.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgResponseLC,
            style: m.lv.responseLC.vis,
            name: m.labels.lblSuggestedActions,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSuggestedActions, m.lv.responseLC.names, m.lv.responseLC.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        }];
    m.ClimateProjectionsLayerEntries = [
        {
            asset: imgPrecipitationTrend,
            style: m.lv.precipTrend.vis,
            name: m.labels.lblPrecipitationTrend,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblPrecipitationTrend, m.lv.precipTrend.vis, m.labels.lblNegTrend, '', m.labels.lblPosTrend),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1XhFfwjvCbCkw_LOkTwTWS_78VC8gUvC8/view?usp=share_link'
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
        },
        {
            asset: m.selectedSource.imgTransitions.select('lc_degradation_' + m.selectedSource.yearsLC[0] + '_' + m.selectedSource.lastYear).clip(ftc0),
            style: m.lv.lcDeg.vis,
            label: m.labels.lblStateLayer,
            name: m.labels.lblStateLayer + ' ' + m.selectedSource.yearsLC[0] + ' - ' + m.selectedSource.lastYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblStateLayer, m.lv.lcDeg.names, m.lv.lcDeg.vis.palette, false, false),
        }
    ];
    m.namesLayers = [];
    m.mcEntriesPrecalculated = [
        {
            title: m.labels.lblLandCover,
            palette: m.lv.lc.vis.palette,
            names: m.lv.lc.names,
            prefix: 'lc_',
            sufix: '',
            noDataCategory: false,
            image: a.imgLastLC,
            categories: [1, 2, 3, 4, 5, 6, 7],
            precalName: 'lc'
        },
        {
            title: m.labels.lblLandProductivityDynamics,
            palette: m.lv.lpd.vis.palette.slice(1),
            names: m.lv.lpd.names.slice(1),
            prefix: 'lpd_',
            sufix: '',
            noDataCategory: true,
            image: a.imgLPD,
            categories: [1, 2, 3, 4, 5],
            precalName: 'lpd'
        },
        {
            title: m.labels.lblNationalSocMap,
            palette: ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594',],
            names: [
                m.labels.lblSocVeryLow + ' (<20)',
                m.labels.lblSocLow + ' (20-30)',
                m.labels.lblSocModerateLow + ' (30-40)',
                m.labels.lblSocModerateHigh + ' (40-50)',
                m.labels.lblSocHigh + ' (50-70)',
                m.labels.lblSocVeryHigh + ' (>70)',
            ],
            prefix: 'soc_',
            sufix: '',
            noDataCategory: true,
            image: a.imgSOC6Cat,
            categories: [1, 2, 3, 4, 5, 6],
            precalName: 'soc'
        },
    ];
    /**
    - Land cover
    - LPD
    - Desertification model of turkey
    - national soc map
    - Turkey dynamic erosion model
    - Net primary productivity
    - Mountains
    - key biodiversity areas
    - protected areas */
    m.mcEntriesOnTheFly = [
        {
            title: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLCSource.name + ') ' + mdlPrecalculation.baseLCSource.lastYear,
            palette: m.lv.lc.vis.palette,
            names: m.lv.lc.names,
            image: a.imgLastLC,
            categories: [1, 2, 3, 4, 5, 6, 7],
        },
        {
            title: m.labels.lblLandProductivityDynamics,
            palette: m.lv.lpd.vis.palette.slice(1),
            names: m.lv.lpd.names.slice(1),
            image: a.imgLPD,
            categories: [1, 2, 3, 4, 5],
        },
        {
            title: m.labels.lblKarKod,
            palette: m.lv.karkod.vis.palette,
            names: m.lv.karkod.names,
            prefix: 'karkod_',
            sufix: '',
            noDataCategory: true,
            image: a.imgKarKod,
            categories: [1, 2, 3, 4, 5],
            precalName: 'karkod'
        },
        {
            title: m.labels.lblMountains,
            palette: m.lv.mountains.vis.palette,
            names: m.lv.mountains.names,
            image: a.imgMountains.unmask(),
            categories: [1, 2, 3, 4, 5, 6, 7],
        },
        {
            title: m.labels.lblTurkeyDynamicErosionModel,
            palette: m.lv.erosionTDEM.vis.palette,
            names: m.lv.erosionTDEM.names,
            image: a.imgTDEM5cat,
            categories: [1, 2, 3, 4, 5],
        },
        {
            title: m.labels.lblKeyBiodiversityAreas,
            palette: ['grey', 'orange'],
            names: [m.labels.lblNonKBA, m.labels.lblKBA],
            image: a.imgKBABin,
            categories: [0, 1],
        },
        {
            title: m.labels.lblProtectedAreas,
            palette: ['grey', 'green'],
            names: [m.labels.lblNonPA, m.labels.lblPA],
            image: a.imgPABin,
            categories: [0, 1],
        },
        {
            title: m.labels.lblDesertification,
            palette: m.lv.des.vis.palette,
            names: m.lv.des.names,
            image: a.imgDes,
            categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
        {
            title: m.labels.lblPredictedSOCChange,
            palette: ['#922100', '#df3200', '#df9207', '#f0e282', '#aadf04', '#3cbc33', '#1e6d0f'],
            names: [
                m.labels.lblSOCch1,
                m.labels.lblSOCch2,
                m.labels.lblSOCch3,
                m.labels.lblSOCch4,
                m.labels.lblSOCch5,
                m.labels.lblSOCch6,
                m.labels.lblSOCch7,
            ],
            image: a.imgBau7cat,
            categories: [1, 2, 3, 4, 5, 6, 7],
        },
        {
            title: m.labels.lblSOCChange,
            palette: ['#feffb2', '#b8ff82', '#24db3a', '#1e6d0f'],
            names: [
                m.labels.lblSOCpot1,
                m.labels.lblSOCpot2,
                m.labels.lblSOCpot3,
                m.labels.lblSOCpot4,
            ],
            image: a.imgPot104cat,
            categories: [1, 2, 3, 4],
        }, {
            title: m.labels.lblNationalSocMap,
            palette: ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594',],
            names: [
                m.labels.lblSocVeryLow + ' (<20)',
                m.labels.lblSocLow + ' (20-30)',
                m.labels.lblSocModerateLow + ' (30-40)',
                m.labels.lblSocModerateHigh + ' (40-50)',
                m.labels.lblSocHigh + ' (50-70)',
                m.labels.lblSocVeryHigh + ' (>70)',
            ],
            image: a.imgSOC6Cat,
            categories: [1, 2, 3, 4, 5, 6],
        },
          {
            title: m.labels.lblResponseHierarchy,
            palette: m.lv.response.vis.palette,
            names: m.lv.response.names,
            image: a.imgResponse,
            categories: [ 1, 2, 3],
        },
        {
            title: m.labels.lblSuggestedActions,
            palette: m.lv.responseLC.vis.palette,
            names: m.lv.responseLC.names,
            image: a.imgResponseLC,
            categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
         {
            title: m.labels.lblSDG1531BasNACsd,
            palette: m.lv.sdg1531.vis.palette.slice(1,4),
            names: m.lv.sdg1531.names.slice(1,4),
            image: a.imgSDGBaselineNACsd,
            categories: [1, 2, 3],
        },
         {
            title: m.labels.lblSDG1531RepNACsd,
            palette: m.lv.sdg1531.vis.palette.slice(1,4),
            names: m.lv.sdg1531.names.slice(1,4),
            image: a.imgSDGReportNACsd,
            categories: [1, 2, 3],
        },
    ];
    m.mcEntries = m.mcEntriesPrecalculated;
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
        widgets: [ui.Panel({
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
    c.lp.mask = {};
    c.lp.mask.chkMaskAOI = ui.Checkbox(m.labels.lblAOIMask, false)
    c.lp.mask.chkMaskAOI.onChange(function (checked) {
        var i = m.namesLayers.indexOf(m.labels.lblAOIMask);
        var layer = c.cp.map.layers().get(i);
        layer.setShown(checked)
    });
    c.lp.mask.lblOpacity = ui.Label(m.labels.lblMaskOpacity);
    c.lp.mask.sldOpacity = ui.Slider({
        min: 0,
        max: 1,
        value: 1,
        step: 0.1,
    });
    c.lp.mask.pnlSlider = ui.Panel({
        widgets: [c.lp.mask.lblOpacity, c.lp.mask.sldOpacity],
        layout: ui.Panel.Layout.Flow('horizontal'),
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
    // Left Panel - Multi-criteria analysis section   
    c.lp.mc = {};
    c.lp.mc.selMcOptions = ui.Select({
        items: [m.labels.lblMcSimple, m.labels.lblMcAdvanced],
        value: m.labels.lblMcSimple
    });
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
    //c.lp.tr.pnlContainer.add(c.lp.tr.pnlSource);
    c.lp.tr.pnlContainer.add(c.lp.tr.pnlFromYear);
    c.lp.tr.pnlContainer.add(c.lp.tr.pnlLayers);
    // Left Panel - SDG 15.3.1 section
    c.lp.sdg = {};
    c.lp.sdg.btnSDG = ui.Button(m.labels.lblSDG1531Title);
    c.lp.sdg.lblGlobalAppSDG = ui.Label(m.labels.lblGlobalAppSDG).setUrl('https://wocatapps.users.earthengine.app/view/ldn-prais4')
    c.lp.sdg.pnlContainer = ui.Panel();
    m.SDGLayerEntries.forEach(function (layer) {
        c.lp.sdg.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
    // Left Panel - LDN Action Plan section
    c.lp.acp = {};
    c.lp.acp.btnLDNActionPlan = ui.Button(m.labels.lblLDNActionPlan);
    c.lp.acp.lblLDNActionPLanRef = ui.Label(m.labels.lblLDNActionPlanRef).setUrl('https://drive.google.com/file/d/1aBVOjd3DENgHDBqQONT_Zi-rEMpY_Esu/view?usp=drive_link')
    c.lp.acp.pnlContainer = ui.Panel();
    m.LDNActionPlanLayerEntries.forEach(function (layer) {
        c.lp.acp.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
    // Left Panel - Climate Projections section  (ClimaProj, lp.clp)
    c.lp.clp = {};
    c.lp.clp.btnClimaProj = ui.Button(m.labels.lblClimaProj);
    c.lp.clp.lblClimaProjRef = ui.Label(m.labels.lblClimaProjRef).setUrl('https://drive.google.com/file/d/18AYrolEAcMZk30eQjLn32ssQSxDG8mUh/view?usp=sharing')
    c.lp.clp.pnlContainer = ui.Panel();
    m.ClimateProjectionsLayerEntries.forEach(function (layer) {
        c.lp.clp.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
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
    // SLM panel
    c.cp.slm = {};
    c.cp.slm.pnlSLM = ui.Panel();
    c.cp.slm.lblSLMTitle = ui.Label(m.labels.lblLoading);
    c.cp.slm.pnlSLM.add(c.cp.slm.lblSLMTitle);
    c.cp.slm.ge = {};
    c.cp.slm.ge.pnlEntryLink = ui.Panel({
        widgets: [ui.Label(m.labels.lblLoading)],
    });
    c.cp.slm.ge.pnlEntryDescription = ui.Panel({
        widgets: [ui.Label(m.labels.lblLoading)],
    });
    Object.keys(c.cp.slm.ge).forEach(function (key) {
        c.cp.slm.ge[key].setLayout(ui.Panel.Layout.Flow('horizontal'));
        c.cp.slm.pnlSLM.add(c.cp.slm.ge[key]);
    });
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
    c.rp.stats.ge.pnlEntrySocMean = ui.Panel({
        widgets: [ui.Label(m.labels.lblSocMean + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntrySocSum = ui.Panel({
        widgets: [ui.Label(m.labels.lblSocSum + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntrySocSum = ui.Panel({
        widgets: [ui.Label(m.labels.lblSocSum + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryProtectedArea = ui.Panel({
        widgets: [ui.Label(m.labels.lblProtectedArea + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryKeyBiodiversityArea = ui.Panel({
        widgets: [ui.Label(m.labels.lblKeyBiodiversityArea + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryMountainCoverage = ui.Panel({
        widgets: [ui.Label(m.labels.lblMountainCoverage + ': '), ui.Label(m.labels.lblLoading)],
    });
    /*    c.rp.stats.ge.pnlEntrySoilErosionTotal1 = ui.Panel({
            widgets: [ui.Label(m.labels.lblSoilErosionTotal1 + ': '), ui.Label(m.labels.lblLoading)],
        });
    */
    c.rp.stats.ge.pnlEntrySoilErosionTotal2 = ui.Panel({
        widgets: [ui.Label(m.labels.lblSoilErosionTotal2 + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntrySOCChangeBAU = ui.Panel({
        widgets: [ui.Label(m.labels.lblSOCChangeBAU + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntrySOCChangeC10 = ui.Panel({
        widgets: [ui.Label(m.labels.lblSOCChangeC10 + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryHighDesertificationVulnerability = ui.Panel({
        widgets: [ui.Label(m.labels.lblHighDesertificationVulnerability + ': '), ui.Label(m.labels.lblLoading)],
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
    c.rp.charts.pnlSDGCharts = ui.Panel();
    c.rp.charts.lblSDGChartsTitle = ui.Label(m.labels.lblSDG1531Title);
    c.rp.charts.pnlSDGCharts.add(c.rp.charts.lblSDGChartsTitle);
    c.rp.charts.pnlMcCharts = ui.Panel();
    c.rp.charts.lblMcChartsTitle = ui.Label(m.labels.lblHotspotsCharts);
    c.rp.charts.pnlMcCharts.add(c.rp.charts.lblMcChartsTitle);
    c.rp.charts.pnlTransitionsCharts = ui.Panel();
    c.rp.charts.lblTransitionsChartsTitle = ui.Label(m.labels.lblTransitionsCharts + ' - ' + m.selectedSource.name);
    c.rp.charts.pnlTransitionsCharts.add(c.rp.charts.lblTransitionsChartsTitle);
    c.rp.charts.pnlActionPlanCharts = ui.Panel();
    c.rp.charts.lblActionPlanChartsTitle = ui.Label(m.labels.lblLDNActionPlan);
    c.rp.charts.pnlActionPlanCharts.add(c.rp.charts.lblActionPlanChartsTitle);
    /*******************************************************************************
    * 3-Composition *   
    ******************************************************************************/
    ui.root.clear();
    ui.root.add(c.pnlRoot);
    c.pnlRoot.add(c.lp.pnlControl);
    c.pnlRoot.add(c.sppMapOutput);
    // Control panel
    //    c.lp.pnlControl.add(c.lp.info.tmbLogo);
    c.lp.pnlControl.add(c.lp.info.pnlContainer);
    c.lp.pnlControl.add(c.lp.info.btnClose);
    //c.lp.pnlControl.add(c.lp.divs.div1);
    c.lp.pnlControl.add(c.lp.lan.selLanguage);
    //c.lp.pnlControl.add(c.lp.flyTo.lblFlyTo);
    //c.lp.pnlControl.add(c.lp.flyTo.pnlFlyTo);
    c.lp.pnlControl.add(c.lp.levels.lblChoose);
    c.lp.pnlControl.add(c.lp.levels.selLevel1);
    c.lp.pnlControl.add(c.lp.levels.selLevel2);
    c.lp.pnlControl.add(c.lp.mask.chkMaskAOI);
    c.lp.pnlControl.add(c.lp.mask.pnlSlider);
    c.lp.pnlControl.add(c.lp.boundaries.lblChoose);
    c.lp.pnlControl.add(c.lp.boundaries.selBoundariesLayer);
    c.lp.pnlControl.add(c.lp.customAsset.lblEnterAssetId);
    c.lp.pnlControl.add(c.lp.customAsset.pnlCustomAsset);
    c.lp.pnlControl.add(c.lp.gl.lblLayersLegends);
    c.lp.pnlControl.add(c.lp.gl.pnlContainer);
    c.lp.pnlControl.add(c.lp.sdg.btnSDG);
    c.lp.pnlControl.add(c.lp.sdg.pnlContainer);
    c.lp.pnlControl.add(c.lp.sdg.lblGlobalAppSDG);
    c.lp.pnlControl.add(c.lp.mc.btnMcAnalysis);
    c.lp.pnlControl.add(c.lp.mc.selMcOptions);
    c.lp.pnlControl.add(c.lp.mc.pnlContainer);
    c.lp.pnlControl.add(c.lp.tr.btnTransitions);
    c.lp.pnlControl.add(c.lp.tr.pnlContainer);
    c.lp.pnlControl.add(c.lp.acp.btnLDNActionPlan);
    c.lp.pnlControl.add(c.lp.acp.pnlContainer);
    c.lp.pnlControl.add(c.lp.acp.lblLDNActionPLanRef);
    c.lp.pnlControl.add(c.lp.clp.btnClimaProj);
    c.lp.pnlControl.add(c.lp.clp.pnlContainer);
    c.lp.pnlControl.add(c.lp.clp.lblClimaProjRef);
    c.lp.pnlControl.add(c.lp.op.pnlSlider);
    c.lp.pnlControl.add(c.lp.dt.btnDrawingTools);
    c.lp.pnlControl.add(c.lp.dt.pnlContainer);
    c.lp.dt.pnlContainer.add(c.lp.flyTo.lblFlyTo);
    c.lp.dt.pnlContainer.add(c.lp.flyTo.pnlFlyTo);
    c.lp.pnlControl.add(c.lp.lblDisclaimer);
    // Map panel 
    c.cp.pnlMap.add(c.cp.map);
    c.cp.map.add(c.cp.pnlFrontLayerLegend);
    c.cp.map.add(c.cp.slm.pnlSLM);
    c.cp.map.add(c.cp.drt);
    c.cp.map.add(c.cp.btnSelectContainer);
    // Output panel 
    c.rp.pnlOutput.add(c.rp.pnlMessages);
    c.rp.pnlOutput.add(c.rp.stats.pnlStats);
    c.rp.pnlOutput.add(c.rp.charts.pnlGeneralCharts);
    c.rp.pnlOutput.add(c.rp.charts.pnlSDGCharts);
    c.rp.pnlOutput.add(c.rp.charts.pnlMcCharts);
    c.rp.pnlOutput.add(c.rp.charts.pnlTransitionsCharts);
    c.rp.pnlOutput.add(c.rp.charts.pnlActionPlanCharts);
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
    c.lp.mask.chkMaskAOI.style().set(s.style1);
    c.lp.mask.chkMaskAOI.style().set({ margin: '5px 10px' });
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
    // Multicriteria Section
    c.lp.mc.btnMcAnalysis.style().set(s.sectionButton);
    c.lp.mc.btnMcAnalysis.style().set({ color: '#900303' });
    c.lp.mc.selMcOptions.style().set({ shown: false });
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
    // SDG Section
    c.lp.sdg.btnSDG.style().set(s.sectionButton);
    c.lp.sdg.btnSDG.style().set({ color: '#000000' });
    c.lp.sdg.pnlContainer.style().set(s.sectionPanel);
    c.lp.sdg.pnlContainer.style().set({ border: '3px solid #000000' });
    c.lp.sdg.lblGlobalAppSDG.style().set({ fontSize: '12px' });
    // LDN Action Plan Section
    c.lp.acp.btnLDNActionPlan.style().set(s.sectionButton);
    c.lp.acp.btnLDNActionPlan.style().set({ color: '#640064' });
    c.lp.acp.pnlContainer.style().set(s.sectionPanel);
    c.lp.acp.pnlContainer.style().set({ border: '3px solid #640064' });
    c.lp.acp.lblLDNActionPLanRef.style().set({ fontSize: '12px' });
    // Climate Projections section 
    c.lp.clp.btnClimaProj.style().set(s.sectionButton);
    c.lp.clp.btnClimaProj.style().set({ color: 'blue' });
    c.lp.clp.pnlContainer.style().set(s.sectionPanel);
    c.lp.clp.pnlContainer.style().set({ border: '3px solid #640064' });
    c.lp.clp.lblClimaProjRef.style().set({ fontSize: '12px' });
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
    c.lp.mask.lblOpacity.style().set({ fontSize: '12px' });
    c.lp.op.lblOpacity.style().set({ fontSize: '12px' });
    c.lp.lblDisclaimer.style().set({ fontSize: '10px', margin: '2px 10px' });
    // --------- CENTER PANEL
    c.cp.pnlFrontLayerLegend.style().set({ position: 'bottom-left' });
    c.cp.pnlCombinedLegend.style().set({ shown: false });
    c.cp.btnSelectContainer.style().set({ position: "bottom-right" });
    c.cp.slm.pnlSLM.style().set({ width: '300px', shown: false, position: "bottom-right" });
    c.cp.slm.lblSLMTitle.style().set(s.styleInfoTitle);
    Object.keys(c.cp.slm.ge).forEach(function (key) {
        c.cp.slm.ge[key].widgets().get(0).style().set({ stretch: 'horizontal' });
    });
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
    // Charts Panels
    c.rp.charts.lblGeneralChartsTitle.style().set(s.styelChartPanelTitle);
    c.rp.charts.lblSDGChartsTitle.style().set(s.styelChartPanelTitle);
    c.rp.charts.lblMcChartsTitle.style().set(s.styelChartPanelTitle);
    c.rp.charts.lblTransitionsChartsTitle.style().set(s.styelChartPanelTitle);
    c.rp.charts.lblActionPlanChartsTitle.style().set(s.styelChartPanelTitle);
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
        c.rp.charts.pnlSDGCharts.style().set({ shown: (c.lp.sdg.pnlContainer.style().get('shown') ? true : false) });
        c.rp.charts.pnlActionPlanCharts.style().set({ shown: (c.lp.acp.pnlContainer.style().get('shown') ? true : false) });
        //c.rp.charts.ClimaProjCharts.style().set({ shown: (c.lp.clp.pnlContainer.style().get('shown') ? true : false) });
        c.rp.charts.pnlGeneralCharts.style().set({
            shown: (!c.lp.tr.pnlContainer.style().get('shown') &&
                !c.lp.mc.pnlContainer.style().get('shown') &&
                !c.lp.acp.pnlContainer.style().get('shown') &&
                //!c.lp.clp.pnlContainer.style().get('shown') &&
                !c.lp.sdg.pnlContainer.style().get('shown') ? true : false)
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
                    return;
                }
            }
        }
        // If ldn action plan panel is open check if some layer is selected
        if (c.lp.acp.pnlContainer.style().get('shown')) {
            for (var i = c.lp.acp.pnlContainer.widgets().length() - 1; i >= 0; i--) {
                chk = c.lp.acp.pnlContainer.widgets().get(i).widgets().get(0);
                if (chk.getValue()) {
                    c.cp.pnlFrontLayerLegend.widgets().set(0, m.LDNActionPlanLayerEntries[i].legend);
                    return;
                }
            }
        }
        // If climate projections panel is open check if some layer is selected
        if (c.lp.clp.pnlContainer.style().get('shown')) {
            for (var i = c.lp.clp.pnlContainer.widgets().length() - 1; i >= 0; i--) {
                chk = c.lp.clp.pnlContainer.widgets().get(i).widgets().get(0);
                if (chk.getValue()) {
                    c.cp.pnlFrontLayerLegend.widgets().set(0, m.ClimateProjectionsLayerEntries[i].legend);
                    return;
                }
            }
        }
        // If sdg panel is open check if some layer is selected
        if (c.lp.sdg.pnlContainer.style().get('shown')) {
            for (var i = c.lp.sdg.pnlContainer.widgets().length() - 1; i >= 0; i--) {
                chk = c.lp.sdg.pnlContainer.widgets().get(i).widgets().get(0);
                if (chk.getValue()) {
                    c.cp.pnlFrontLayerLegend.widgets().set(0, m.SDGLayerEntries[i].legend);
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
                    return;
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
    c.lp.mc.selMcOptions.onChange(function (type) {
        clearCombinedLayerAndLegend();
        if (type === m.labels.lblMcSimple)
            m.mcEntries = m.mcEntriesPrecalculated;
        else
            m.mcEntries = m.mcEntriesOnTheFly;
        c.lp.mc.pnlEntries = mdlLegends.createMultiCriteriaPanel(m.mcEntries);
        c.lp.mc.pnlContainer.widgets().set(0, c.lp.mc.pnlEntries)
    });
    // Stack layers in map
    // General layers - RASTER
    m.layerEntries.filter(function (layer) {
        return layer.group === 'RASTER'
    }).forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
    })
    // SDG layers
    m.SDGLayerEntries.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
    });
    // Transition layers
    m.transitionsEntries.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.label, layer.visible);
    });
    // LDN Action Plan layers
    m.LDNActionPlanLayerEntries.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
    });
    // General layers - FEATURES
    m.layerEntries.filter(function (layer) {
        return layer.group === 'FEATURES'
    }).forEach(function (layer) {
        c.cp.map.addLayer(layer.asset.style(layer.style), {}, layer.name, layer.visible);
    })
    // Multicriteria layer - this layer is dinamically updated 
    c.cp.map.addLayer(a.imgCustom, m.lv.custom.vis, m.labels.lblHotspots, false);
    // User Localization - this layer is dinamically updated 
    c.cp.map.addLayer(ee.Geometry.Point([0, 0]), { color: '#0099ff' }, m.labels.lblFlyTo, false);
    // Selected AOI
    c.cp.map.addLayer(ee.Geometry.Point([0, 0]), {}, m.labels.lblSelectedAOI, false);
    // test_aoi
    c.cp.map.addLayer(ee.Image(0), { palette: ['white'] }, m.labels.lblAOIMask, false)
    // todo create generic functionality
    // Add on check/uncheck functionality to general layers entries
    c.lp.gl.pnlContainer.widgets().forEach(function (w) {
        var chk = w.widgets().get(0);
        chk.onChange(function (checked) {
            showLayer(chk.getLabel(), checked);
            showFrontLayerLegend();
        });
    });
    // Add on check/uncheck functionality to sdg layers entries
    c.lp.sdg.pnlContainer.widgets().forEach(function (w) {
        var chk = w.widgets().get(0);
        chk.onChange(function (checked) {
            showLayer(chk.getLabel(), checked);
            showFrontLayerLegend();
        });
    });
    // Add on check/uncheck functionality to acp layers entries
    c.lp.acp.pnlContainer.widgets().forEach(function (w) {
        var chk = w.widgets().get(0);
        chk.onChange(function (checked) {
            showLayer(chk.getLabel(), checked);
            showFrontLayerLegend();
        });
    });
    // Add on check/uncheck functionality to acp layers entries
    c.lp.clp.pnlContainer.widgets().forEach(function (w) {
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
                && l.getName() !== m.labels.lblBasins
                && l.getName() !== m.labels.lblSubbasins
                && l.getName() !== m.labels.lblFlyTo
                && l.getName() !== m.labels.lblAOIMask
                && l.getShown()
            ) {
                lastShown = c.cp.map.layers().get(i);
            }
            if (l.getName() !== m.labels.lblAOIMask)
                c.cp.map.layers().get(i).setOpacity(1); // for all other layers
        }
        if (lastShown !== null) {
            lastShown.setOpacity(value);
        }
    });
    c.lp.mask.sldOpacity.onSlide(function (value) {
        var i = m.namesLayers.indexOf(m.labels.lblAOIMask);
        c.cp.map.layers().get(i).setOpacity(value);
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
        c.cp.slm.pnlSLM.style().set({ shown: false });
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
                'pa_ha',
                'kba_ha',
                'mountain_bin_1',
                'soc_sum',
                'soc_mean',
                'des_7',
                'des_8',
                'des_9',
                //                'ase_sum',
                'npp_sum',
                // 'ase_mean',
                'ero_sum',
                'soc_change_bau',
                'soc_change_c10', 'karKor','ero'
            ];
            f = ee.Feature(null).copyProperties(selectedArea, statslCols);
        }
        else {
            // Calculate all statistics required for info panel
            var ftcSampleStats = mdlPrecalculation.precalculate(m.ftcAoi, [
                'lpd',
                'soc_sum',
                'soc_mean',
                'pa',
                'kba',
                'mountain_bin',
                'des',
                //                'ase_sum', 
                // 'ase_mean',
                'npp_sum',
                'erozyon',
                'soc_c10',
                'soc_bau', 'karKor','ero'
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
                aux = m.haAoi > 0 ? (ef.properties.pa_ha * 100 / m.haAoi) : 0;
                c.rp.stats.ge.pnlEntryProtectedArea.widgets().get(1).setValue(formatNumber(ef.properties.pa_ha, 2) + " ha. (" + aux.toFixed(2) + "%)");
                aux = m.haAoi > 0 ? (ef.properties.kba_ha * 100 / m.haAoi) : 0;
                c.rp.stats.ge.pnlEntryKeyBiodiversityArea.widgets().get(1).setValue(formatNumber(ef.properties.kba_ha, 2) + " ha. (" + aux.toFixed(2) + "%)");
                aux = m.haAoi > 0 ? (ef.properties.mountain_bin_1 * 100 / m.haAoi) : 0;
                c.rp.stats.ge.pnlEntryMountainCoverage.widgets().get(1).setValue(formatNumber(ef.properties.mountain_bin_1, 2) + " ha. (" + aux.toFixed(2) + "%)");
                c.rp.stats.ge.pnlEntrySocSum.widgets().get(1).setValue(formatNumber(ef.properties.soc_sum, 2) + ' tC');
                c.rp.stats.ge.pnlEntrySocMean.widgets().get(1).setValue(formatNumber(ef.properties.soc_mean, 2) + ' t/ha');
                //                c.rp.stats.ge.pnlEntrySoilErosionTotal1.widgets().get(1).setValue(formatNumber(ef.properties.ase_sum, 2) + ' t');
                c.rp.stats.ge.pnlEntrySoilErosionTotal2.widgets().get(1).setValue(formatNumber(ef.properties.ero_sum, 2) + ' t');
                c.rp.stats.ge.pnlEntrySOCChangeBAU.widgets().get(1).setValue(formatNumber(ef.properties.soc_change_bau, 2) + ' tC');
                c.rp.stats.ge.pnlEntrySOCChangeC10.widgets().get(1).setValue(formatNumber(ef.properties.soc_change_c10, 2) + ' tC');
                var highDesertificationTotal = ef.properties.des_7 + ef.properties.des_8 + ef.properties.des_9;
                aux = m.haAoi > 0 ? (highDesertificationTotal * 100 / m.haAoi) : 0;
                c.rp.stats.ge.pnlEntryHighDesertificationVulnerability.widgets().get(1).setValue(formatNumber(highDesertificationTotal, 2) + " ha. (" + aux.toFixed(2) + "%)");
                c.rp.stats.ge.pnlEntryNPPTotal.widgets().get(1).setValue(formatNumber(ef.properties.npp_sum / 1000, 2) + '  tC');
            }
            else {
                c.rp.lblMessages.setValue(error);
            }
        });
        try {
            c.cp.map.centerObject(m.ftcAoi);
            c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblSelectedAOI), ui.Map.Layer(m.ftcAoi.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI, true));
            var i = m.namesLayers.indexOf(m.labels.lblAOIMask);
            var e = c.cp.map.layers().get(i);
            e.setEeObject(ee.Image(1).updateMask(ee.Image(1).clip(m.ftcAoi).unmask().eq(0)));
            e.setVisParams({ palette: ['white'] });
        } catch (error) {
            print(error)
            c.rp.lblMessages.setValue(error);
        }
        c.cp.map.drawingTools().setSelected(null);
        // Show only charts related to opened panel on the left (General|Multicriteria|Transitions)
        handleChartsPanelsShown();
        // Generate all charts for selected area test
        setupGeneralCharts();
        setUpSDGCharts();
        setupMcCharts();
        setupTransitionsCharts();
        setupActionPlanCharts();
        clearCombinedLayerAndLegend();
        // Generate combined raster for selected area
        if (mcCategoryChecked()) {
            calculateMultiCriteria();
        }
    };
    var handleChangeLevel2 = function (level2Code) {
        m.levelAoi = m.labels.lblLevel2;
        m.ftcAoi = ftc2.filter(ee.Filter.eq('ADM2_CODE', level2Code));
        m.precalculated = true;
        showInfoSelectedAoi();
    };
    var handleChangeLevel1 = function (level1Code) {
        if (level1Code !== null) {
            m.levelAoi = m.labels.lblLevel1;
            m.ftcAoi = ftc1.filter(ee.Filter.eq('ADM1_CODE', level1Code));
            m.precalculated = true;
            showInfoSelectedAoi();
            // load level 2
            c.lp.levels.selLevel2.setPlaceholder(m.labels.lblLoadingLevel2);
            c.lp.levels.selLevel2.items().reset([]);
            var namesLevel2 = m.ftcLelvel2.filter(ee.Filter.eq('ADM1_CODE', level1Code)).aggregate_array('ADM2_NAME');
            var codesLevel2 = m.ftcLelvel2.filter(ee.Filter.eq('ADM1_CODE', level1Code)).aggregate_array('ADM2_CODE');
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
        c.cp.slm.pnlSLM.style().set({ shown: false });
        if (Object.keys(m.evalSet).length === 0 && !c.lp.dt.pnlContainer.style().get('shown')) {
            if (m.ftcClickOn === null) {
                c.rp.pnlMessages.style().set({ shown: true });
                c.rp.lblMessages.setValue(m.labels.lblSelectLayer);
                return;
            }
            c.cp.map.widgets().remove(c.cp.pnlCombinedLegend);
            c.rp.lblMessages.setValue(m.labels.lblProcessingArea);
            c.rp.pnlMessages.style().set({ shown: true });
            // if slm ftc is selected show panel for panel with ingo for practice selected
            if (c.lp.boundaries.selBoundariesLayer.getValue() === m.labels.lblSLM) {
                m.assetsClick[m.labels.lblSLM] = ftcSLM.map(function (f) {
                    return f.buffer(c.cp.map.getScale() * 10);
                });
                m.ftcClickOn = m.assetsClick[m.labels.lblSLM];
                var ftcSLMSelected = m.ftcClickOn.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
                ftcSLMSelected.size().getInfo(function (size) {
                    if (size > 0) {
                        c.cp.map.centerObject(ftcSLMSelected, 12);
                        handleEvaluating(true);
                        c.cp.slm.pnlSLM.style().set({ shown: true });
                        c.cp.slm.lblSLMTitle.setValue(m.labels.lblLoading);
                        Object.keys(c.cp.slm.ge).forEach(function (key) {
                            c.cp.slm.ge[key].widgets().get(0).setValue(m.labels.lblLoading);
                        });
                        m.evalSet["slm"] = true;
                        var f = ee.Feature(null).copyProperties(ftcSLMSelected.first(), ['NameTR', 'Link', 'Brief Desc']);
                        f.evaluate(function (ef, error) {
                            delete m.evalSet["slm"];
                            if (Object.keys(m.evalSet).length === 0) {
                                handleEvaluating(false);
                            }
                            if (ef) {
                                c.cp.slm.lblSLMTitle.setValue(ef.properties['NameTR']);
                                c.cp.slm.ge.pnlEntryLink.widgets().get(0).setValue(m.labels.lblLink).setUrl(ef.properties['Link']);
                                c.cp.slm.ge.pnlEntryDescription.widgets().get(0).setValue(ef.properties['Brief Desc']);
                            }
                            else {
                                c.rp.pnlMessages.style().set({ shown: true });
                                c.rp.lblMessages.setValue(error);
                            }
                        });
                    }
                    else {
                        c.rp.pnlMessages.style().set({ shown: true });
                        c.rp.lblMessages.setValue(m.labels.lblNoSLM);
                    }
                });
            }
            else {
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
        }
    });
    /**  Unchecks some layers in general layers panel, invoked when advanced panels are opened*/
    var unselectLayersPanelChecks = function () {
        for (var i = 0; i < c.lp.gl.pnlContainer.widgets().length(); i++) {
            var chb = c.lp.gl.pnlContainer.widgets().get(i).widgets().get(0);
            if (chb.getLabel() !== m.labels.lblLevel1
                && chb.getLabel() !== m.labels.lblLevel2
                && chb.getLabel() !== m.labels.lblBasins
                && chb.getLabel() !== m.labels.lblSubbasins) {
                chb.setValue(false);
            }
        }
    };
    // TODO create generic functionality
    /** Shows/hides layers checked in Transitions panel*/
    var handleTransitionsLayersVis = function (show) {
        for (var i = c.lp.tr.pnlLayers.widgets().length() - 1; i >= 0; i--) {
            var chk = c.lp.tr.pnlLayers.widgets().get(i).widgets().get(0);
            if (chk.getValue()) {
                showLayer(m.transitionsEntries[i].label, show);
            }
        }
    };
    /** Shows/hides layers checked in SDG panel*/
    var handleSDGLayersVis = function (show) {
        for (var i = c.lp.sdg.pnlContainer.widgets().length() - 1; i >= 0; i--) {
            var chk = c.lp.sdg.pnlContainer.widgets().get(i).widgets().get(0);
            if (chk.getValue()) {
                showLayer(m.SDGLayerEntries[i].label, show);
            }
        }
    };
    /** Shows/hides layers checked in LDN action plan panel*/
    var handleLDNActionPlanLayersVis = function (show) {
        for (var i = c.lp.acp.pnlContainer.widgets().length() - 1; i >= 0; i--) {
            var chk = c.lp.acp.pnlContainer.widgets().get(i).widgets().get(0);
            if (chk.getValue()) {
                showLayer(m.LDNActionPlanLayerEntries[i].label, show);
            }
        }
    };
    /** Shows/hides layers checked in climate projections panel*/
    var handleClimaProjLayersVis = function (show) {
        for (var i = c.lp.clp.pnlContainer.widgets().length() - 1; i >= 0; i--) {
            var chk = c.lp.clp.pnlContainer.widgets().get(i).widgets().get(0);
            if (chk.getValue()) {
                showLayer(m.ClimateProjectionsLayerEntries[i].label, show);
            }
        }
    };
    c.lp.mc.btnMcAnalysis.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        c.lp.mc.pnlContainer.style().set({ shown: !c.lp.mc.pnlContainer.style().get('shown') });
        // Choose to show or not the multicriteria options
        c.lp.mc.selMcOptions.style().set({ shown: c.lp.mc.pnlContainer.style().get('shown') });
        //c.lp.mc.selMcOptions.style().set({ shown: false });
        //make the advance Multi-criteria the default option
        // c.lp.mc.selMcOptions.setValue(m.labels.lblMcAdvanced)
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
        c.lp.sdg.pnlContainer.style().set({ shown: false });
        c.lp.acp.pnlContainer.style().set({ shown: false });
        c.lp.clp.pnlContainer.style().set({ shown: false });
        handleTransitionsLayersVis(false);
        handleSDGLayersVis(false);
        showFrontLayerLegend();
        handleChartsPanelsShown();
    });
    c.lp.tr.btnTransitions.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        // handle transitions panel
        c.lp.tr.pnlContainer.style().set({ shown: !c.lp.tr.pnlContainer.style().get('shown') });
        handleTransitionsLayersVis(c.lp.tr.pnlContainer.style().get('shown'));
        // handle multi-criteria analysis panel
        c.lp.mc.pnlContainer.style().set({ shown: false });
        c.lp.mc.selMcOptions.style().set({ shown: false });
        c.lp.sdg.pnlContainer.style().set({ shown: false });
        c.lp.acp.pnlContainer.style().set({ shown: false });
        c.lp.clp.pnlContainer.style().set({ shown: false });
        showLayer(m.labels.lblHotspots, false);
        c.cp.pnlCombinedLegend.style().set({
            shown: false
        });
        handleSDGLayersVis(false);
        handleLDNActionPlanLayersVis(false);
        // handle general layers panel
        if (c.lp.tr.pnlContainer.style().get('shown')) {
            unselectLayersPanelChecks();
            c.cp.map.setOptions('SATELLITE');
        }
        showFrontLayerLegend();
        handleChartsPanelsShown();
    });
    c.lp.sdg.btnSDG.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        // handle SDG panel
        c.lp.sdg.pnlContainer.style().set({ shown: !c.lp.sdg.pnlContainer.style().get('shown') });
        // Hide transitions and mc panel and layer
        showLayer(m.labels.lblHotspots, false);
        if (c.cp.pnlCombinedLegend !== null) {
            c.cp.pnlCombinedLegend.style().set({
                shown: false
            });
        }
        handleTransitionsLayersVis(false);
        handleLDNActionPlanLayersVis(false);
        c.lp.tr.pnlContainer.style().set({ shown: false });
        c.lp.mc.pnlContainer.style().set({ shown: false });
        c.lp.acp.pnlContainer.style().set({ shown: false });
        c.lp.clp.pnlContainer.style().set({ shown: false });
        showFrontLayerLegend();
        handleChartsPanelsShown();
    });
    // LDN Action Plan section
    c.lp.acp.btnLDNActionPlan.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        // handle panel
        c.lp.acp.pnlContainer.style().set({ shown: !c.lp.acp.pnlContainer.style().get('shown') });
        // Hide other
        showLayer(m.labels.lblHotspots, false);
        if (c.cp.pnlCombinedLegend !== null) {
            c.cp.pnlCombinedLegend.style().set({
                shown: false
            });
        }
        handleTransitionsLayersVis(false);
        handleSDGLayersVis(false);
        c.lp.tr.pnlContainer.style().set({ shown: false });
        c.lp.mc.pnlContainer.style().set({ shown: false });
        c.lp.sdg.pnlContainer.style().set({ shown: false });
        c.lp.clp.pnlContainer.style().set({ shown: false });
        showFrontLayerLegend();
        handleChartsPanelsShown();
    });
    // Climate Projections section
    c.lp.clp.btnClimaProj.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        // handle panel
        c.lp.clp.pnlContainer.style().set({ shown: !c.lp.clp.pnlContainer.style().get('shown') });
        // Hide other
        showLayer(m.labels.lblHotspots, false);
        if (c.cp.pnlCombinedLegend !== null) {
            c.cp.pnlCombinedLegend.style().set({
                shown: false
            });
        }
        handleTransitionsLayersVis(false);
        handleSDGLayersVis(false);
        c.lp.tr.pnlContainer.style().set({ shown: false });
        c.lp.mc.pnlContainer.style().set({ shown: false });
        c.lp.sdg.pnlContainer.style().set({ shown: false });
        c.lp.acp.pnlContainer.style().set({ shown: false });
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
        var imgDegra = m.selectedSource.imgTransitions.select('lc_degradation_' + year + '_' + m.selectedSource.lastYear).clip(ftc0);
        var lyrDegra = ui.Map.Layer(imgDegra.visualize(m.lv.lcDeg.vis), {}, m.labels.lblStateLayer, c.lp.tr.pnlLayers.widgets().get(4).widgets().get(0).getValue());
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblStateLayer), lyrDegra);
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
        c.lp.customAsset.btnLoadAsset.setDisabled(disable);
        c.lp.levels.selLevel1.setDisabled(disable);
        c.lp.levels.selLevel2.setDisabled(disable);
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
        /*      
        selLevel2.setDisabled(disable);        
        chbOnlyProjectAreas.setDisabled(disable);*/
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
    /** Setup general charts: LC, LPD, Hansen and Anual NDVI*/
    var setupGeneralCharts = function () {
        c.rp.charts.pnlGeneralCharts.clear();
        c.rp.charts.pnlGeneralCharts.add(c.rp.charts.lblGeneralChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi,
        ['lc', 'lpd', 'des', 'hansen', 'ndvi_annual', 'x2', 'karKor','ero']);
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
            title: m.labels.lblLandCover + ' CORINE ' + m.defaultFinalLCYear,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.lc.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderLC.cat(ee.FeatureCollection(lstFeatLC).aggregate_array('row')), optionsLC, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        //  KarKod PIE CHART       
        var lstFeatKarKod = mdlPrecalculation.namesKarKodColumns.slice(1).map(function (pName, i) { // slice(1)=lpd_0
            var lstValues = ee.List([m.lv.karkod.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderKarKod = ee.List([
            [
                { label: 'Forestry (Kode)', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsKarKod = {
            title: m.labels.lblKarKod,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.karkod.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderKarKod.cat(ee.FeatureCollection(lstFeatKarKod).aggregate_array('row')), optionsKarKod, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
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
            pieHole: 0.4
        };
        createChart(lstHeaderLPD.cat(ee.FeatureCollection(lstFeatLPD).aggregate_array('row')), optionsLPD, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        //  Erosion PIE CHART   
        var lstFeatTDEM = mdlPrecalculation.namesTDEMColumns.slice(1).map(function (pName, i) { // slice(1)=lpd_0
            var lstValues = ee.List([m.lv.erosionTDEM.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderTDEM = ee.List([
            [
                { label: 'DEMIS (Kode)', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsTDEM = {
            title: m.labels.lblTurkeyDynamicErosionModel,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.erosionTDEM.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderTDEM.cat(ee.FeatureCollection(lstFeatTDEM).aggregate_array('row')), optionsTDEM, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        // DESERTIFICATION MODEL OF TURKEY
        var lstFeatDes = mdlPrecalculation.namesDesColumns.map(function (pName, i) {
            var lstValues = ee.List([m.lv.des.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderDes = ee.List([
            [
                { label: 'DMT', role: 'domain', type: 'string' },
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
        // HANSEN Forest loss
        var lstFeatForestLossByYear = mdlPrecalculation.yearsHansen.map(function (i) {
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
        // NDVI ANNUAL
        var lstNdviByYear = mdlPrecalculation.yearsNDVI.map(function (i) {
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
        if (!m.precalculated && m.haAoi < 1000000) {
            var chtNdviByMonthYear = ui.Chart.image.series(a.imcNDVIByMonthYear, ftc, ee.Reducer.mean(), 250);
            chtNdviByMonthYear.setOptions({
                title: m.labels.lblMonthlyNDVI,
                vAxis: { title: 'NDVI x 10000' },
                hAxis: { title: m.labels.lblCalendarYear, format: 'yyyy', gridlines: { count: 7 } },
            });
            createChartPanel(c.rp.charts.pnlGeneralCharts).add(chtNdviByMonthYear);
        }
    };
    var setUpSDGCharts = function () {
        c.rp.charts.pnlSDGCharts.clear();
        c.rp.charts.pnlSDGCharts.add(c.rp.charts.lblSDGChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi,
            m.bestEffort,
            [
                //              'p_SDG_Baseline_JRC', 'p_SDG_Report_JRC', 'p_SDG_Status_JRC', 'p_SDG_Comparison_JRC',
                //                'p_SDG_Baseline_FAO_WOCAT', 'p_SDG_Report_FAO_WOCAT', 'p_SDG_Status_FAO_WOCAT', 'p_SDG_Comparison_FAO_WOCAT',
                //                'p_SDG_Baseline_TE', 'p_SDG_Report_TE', 'p_SDG_Status_TE', 'p_SDG_Comparison_FAO_TE',
                'p_SDG_Baseline_NAC_sd', 'p_SDG_Report_NAC_sd', 'p_SDG_Status_NAC_sd', 'p_SDG_Comparison_FAO_NAC_sd',
            ]);
        var columnsPrefix = ['SDG_Bas', 'SDG_Rep', 'SDG_Sta', 'SDG_Com'];
        var layerTypes = [m.labels.lblBaseline, m.labels.lblReport, m.labels.lblStatus, m.labels.lblComparison];
        /*
                // SDG JRC
                var lstFeatCombinedJRC = columnsPrefix.map(function (cat, i) {
                    var v0 = ftc.first().get(cat + '_JRC_0');
                    var v1 = ftc.first().get(cat + '_JRC_1');
                    var v2 = ftc.first().get(cat + '_JRC_2');
                    var v3 = ftc.first().get(cat + '_JRC_3');
                    var lstValues = ee.List([layerTypes[i], v0, v1, v2, v3]);
                    return ee.Feature(null, { row: lstValues });
                });
                var lstHeaderCombinedJRC = ee.List([
                    [
                        { label: 'JRC', role: 'domain', type: 'string' },
                        { label: m.lv.sdg1531.names[0], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[1], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[2], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[3], role: 'data', type: 'number' },
                    ],
                ]);
                // Relative
                var optionsCombinedJRC = {
                    title: m.labels.lblSDG1531UNCCDDefault,
                    width: 600,
                    height: 400,
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    isStacked: 'percent',
                    colors: m.lv.sdg1531.vis.palette,
                };
                createChart(lstHeaderCombinedJRC.cat(ee.FeatureCollection(lstFeatCombinedJRC).aggregate_array('row')), optionsCombinedJRC, 'BarChart', createChartPanel(c.rp.charts.pnlSDGCharts));
                // SDG Trends Earth
                var lstFeatCombinedTE = columnsPrefix.map(function (cat, i) {
                    var v0 = ftc.first().get(cat + '_TE_0');
                    var v1 = ftc.first().get(cat + '_TE_1');
                    var v2 = ftc.first().get(cat + '_TE_2');
                    var v3 = ftc.first().get(cat + '_TE_3');
                    var lstValues = ee.List([layerTypes[i], v0, v1, v2, v3]);
                    return ee.Feature(null, { row: lstValues });
                });
                var lstHeaderCombinedTE = ee.List([
                    [
                        { label: 'TE', role: 'domain', type: 'string' },
                        { label: m.lv.sdg1531.names[0], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[1], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[2], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[3], role: 'data', type: 'number' },
                    ],
                ]);
                // Relative
                var optionsCombinedTE = {
                    title: m.labels.lblSDG1531TrendsEarth,
                    width: 600,
                    height: 400,
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    isStacked: 'percent',
                    colors: m.lv.sdg1531.vis.palette,
                };
                createChart(lstHeaderCombinedTE.cat(ee.FeatureCollection(lstFeatCombinedTE).aggregate_array('row')), optionsCombinedTE, 'BarChart', createChartPanel(c.rp.charts.pnlSDGCharts));
                // SDG FAO WOCAT
                var lstFeatCombinedFAOAdvanced = columnsPrefix.map(function (cat, i) {
                    var v0 = ftc.first().get(cat + '_FAO_WOCAT_0');
                    var v1 = ftc.first().get(cat + '_FAO_WOCAT_1');
                    var v2 = ftc.first().get(cat + '_FAO_WOCAT_2');
                    var v3 = ftc.first().get(cat + '_FAO_WOCAT_3');
                    var lstValues = ee.List([layerTypes[i], v0, v1, v2, v3]);
                    return ee.Feature(null, { row: lstValues });
                });
                var lstHeaderCombinedFAOAdvanced = ee.List([
                    [
                        { label: 'FAO WOCAT', role: 'domain', type: 'string' },
                        { label: m.lv.sdg1531.names[0], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[1], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[2], role: 'data', type: 'number' },
                        { label: m.lv.sdg1531.names[3], role: 'data', type: 'number' },
                    ],
                ]);
                // Relative
                var optionsCombinedFAOAdvanced = {
                    title: m.labels.lblSDG1531FAOWOCAT,
                    width: 600,
                    height: 400,
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    isStacked: 'percent',
                    colors: m.lv.sdg1531.vis.palette,
                };
                createChart(lstHeaderCombinedFAOAdvanced.cat(ee.FeatureCollection(lstFeatCombinedFAOAdvanced).aggregate_array('row')), optionsCombinedFAOAdvanced, 'BarChart', createChartPanel(c.rp.charts.pnlSDGCharts));
        */
        // SDG FAO BASIC
        var lstFeatCombinedNACsd = columnsPrefix.map(function (cat, i) {
            var v0 = ftc.first().get(cat + '_NAC_sd_0');
            var v1 = ftc.first().get(cat + '_NAC_sd_1');
            var v2 = ftc.first().get(cat + '_NAC_sd_2');
            var v3 = ftc.first().get(cat + '_NAC_sd_3');
            var lstValues = ee.List([layerTypes[i], v0, v1, v2, v3]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderCombinedNACsd = ee.List([
            [
                { label: 'FAO Basic', role: 'domain', type: 'string' },
                { label: m.lv.sdg1531.names[0], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[1], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[2], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[3], role: 'data', type: 'number' },
            ],
        ]);
        // Relative
        var optionsCombinedNACsd = {
            title: m.labels.lblSDG1531NACsd,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'percent',
            colors: m.lv.sdg1531.vis.palette,
        };
        createChart(lstHeaderCombinedNACsd.cat(ee.FeatureCollection(lstFeatCombinedNACsd).aggregate_array('row')), optionsCombinedNACsd, 'BarChart', createChartPanel(c.rp.charts.pnlSDGCharts));
    };
    /** Setup combined charts: LPDxLC, SOCxLPD, SOCxLC, SOCxLPDxLC, LCxLPD table*/
    var setupMcCharts = function () {
        c.rp.charts.pnlMcCharts.clear();
        c.rp.charts.pnlMcCharts.add(c.rp.charts.lblMcChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi, ['x2', 'soc_lpd', 'soc_lc', 'soc_lc_lpd']);
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
            isStacked: 'percent',
            colors: m.lv.lpd.vis.palette.slice(1),
        };
        createChart(lstHeaderC1.cat(ee.FeatureCollection(lstFeatCombinedLC).aggregate_array('row')), optionsC1Rel, 'BarChart', createChartPanel(c.rp.charts.pnlMcCharts), handleClickFromChart);
        //  SOC by LPD
        var lstFeatSOCbyLPD = catsLPD.map(function (i) {
            var mean = ftc.first().get('soc_mean_lpd_' + i);
            var lstValues = ee.List([m.lv.lpd.names[i], mean, m.lv.lpd.vis.palette[i]]); // palette has non vegetated color entry
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
            title: m.labels.lblSOCperLPD,
            legend: { position: 'none' },
        };
        createChart(lstHeaderSOCbyLPD.cat(ee.FeatureCollection(lstFeatSOCbyLPD).aggregate_array('row')), optionsSOCbyLPD, 'ColumnChart', createChartPanel(c.rp.charts.pnlMcCharts));
        //SOC by LC        
        var lstFeatSOCbyLC = catsLCNoWater.map(function (i) {
            var mean = ftc.first().get('soc_mean_lc_' + i);
            var lstValues = ee.List([m.lv.lc.names[i - 1], mean, m.lv.lc.vis.palette[i - 1]]);
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
            title: m.labels.lblSOCperLC,
            legend: { position: 'none' },
        };
        createChart(lstHeaderSOCbyLC.cat(ee.FeatureCollection(lstFeatSOCbyLC).aggregate_array('row')), optionsSOCbyLC, 'ColumnChart', createChartPanel(c.rp.charts.pnlMcCharts));
        // SOC combochart
        var lstFeatComboChart = catsLCNoWater.map(function (i) {
            var v1 = ftc.first().get('soc_mean_lc_' + i + '_lpd_1');
            var v2 = ftc.first().get('soc_mean_lc_' + i + '_lpd_2');
            var v3 = ftc.first().get('soc_mean_lc_' + i + '_lpd_3');
            var v4 = ftc.first().get('soc_mean_lc_' + i + '_lpd_4');
            var v5 = ftc.first().get('soc_mean_lc_' + i + '_lpd_5');
            var l = ee.List([v1, v2, v3, v4, v5]);
            var mean = ee.Number(l.reduce(ee.Reducer.sum())).divide(5);
            var lstValues = ee.List([m.lv.lc.names[i - 1], v1, v2, v3, v4, v5, mean]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderComboChart = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: m.lv.lpd.names[1], role: 'data', type: 'number' },
                { label: m.lv.lpd.names[2], role: 'data', type: 'number' },
                { label: m.lv.lpd.names[3], role: 'data', type: 'number' },
                { label: m.lv.lpd.names[4], role: 'data', type: 'number' },
                { label: m.lv.lpd.names[5], role: 'data', type: 'number' },
                { label: 'SOC mean per LC', role: 'data', type: 'number' },
            ],
        ]);
        var optionsComboChart = {
            title: m.labels.lblSOCperLCLPD,
            width: 600,
            height: 400,
            legend: { position: 'top' },
            seriesType: 'bars',
            colors: m.lv.lpd.vis.palette.slice(1),
            series: { 5: { type: 'line', color: 'blue' } },
        };
        createChart(lstHeaderComboChart.cat(ee.FeatureCollection(lstFeatComboChart).aggregate_array('row')), optionsComboChart, 'ColumnChart', createChartPanel(c.rp.charts.pnlMcCharts));
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
        /*var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi, [
            'lc_' + fromYear + '_' + m.selectedSource.initials,
            'lc_' + m.selectedSource.lastYear + '_' + m.selectedSource.initials,
            'lc_trans_' + m.selectedSource.initials + '_' + fromYear + '_' + m.selectedSource.lastYear]);*/
        // old precalculation script has ni
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi,
            ['lc_year_' + fromYear,
            'lc_year_' + m.selectedSource.lastYear,
            'lc_trans_' + fromYear + '_' + m.selectedSource.lastYear]);
        // chartTrans1 Comparison column chart LC
        /*var lstFeatLCCombo = mdlPrecalculation.namesLCColumns.map(function (pName, i) {
            var initialValue = ftc.first().get(pName + '_' + fromYear + '_' + m.selectedSource.initials);
            var finalValue = ftc.first().get(pName + '_' + m.selectedSource.lastYear + '_' + m.selectedSource.initials);
            var s = 'bar {fill-color:' + m.lv.lc.vis.palette[i] + '; stroke-width: 0.5; stroke-color: #000000}';
            var lstValues = ee.List([m.lv.lc.names[i], initialValue, s, finalValue, s]);
            return ee.Feature(null, { row: lstValues });
        });*/
        var lstFeatLCCombo = mdlPrecalculation.namesLCColumns.map(function (pName, i) {
            var initialValue = ftc.first().get(pName + '_' + fromYear);
            var finalValue = ftc.first().get(pName + '_' + m.selectedSource.lastYear);
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
        /*var lstFeatLCNetChange = mdlPrecalculation.namesLCColumns.map(function (pName, i) {
            var initialValue = ftc.first().get(pName + '_' + fromYear + '_' + m.selectedSource.initials);
            var finalValue = ftc.first().get(pName + '_' + m.selectedSource.lastYear + '_' + m.selectedSource.initials);
            var diff = ee.Number(finalValue).subtract(ee.Number(initialValue)).format('%,.2f');
            var tt = ee.String(m.labels.lblDifference + ' (ha): ').cat(diff);
            var lstValues = ee.List([m.lv.lc.names[i], initialValue, initialValue, finalValue, finalValue, tt]);
            return ee.Feature(null, { row: lstValues });
        });*/
        var lstFeatLCNetChange = mdlPrecalculation.namesLCColumns.map(function (pName, i) {
            var initialValue = ftc.first().get(pName + '_' + fromYear);
            var finalValue = ftc.first().get(pName + '_' + m.selectedSource.lastYear);
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
        /*var lstFeatLCTransTable = catsLC.map(function (i) {
            var transition = 'lc_trans_' + m.selectedSource.initials + '_' + fromYear + '_' + m.selectedSource.lastYear + '_' + i;
            var values = catsLC.map(function (c) {
                return ee.Number(ftc.first().get(transition + '_' + c)).format('%.2f');
            });
            var lstValues = ee.List([m.lv.lc.names[i - 1]]).cat(values);
            return ee.Feature(null, { row: lstValues });
        });*/
        // old table
        /*
                var lstFeatLCTransTable = catsLC.map(function (i) {
                    var transition = 'lc_trans_' + fromYear + '_' + m.selectedSource.lastYear + '_' + i;
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
        */
        // new table
        var keys = []
        catsLC.forEach(function (c1) {
            catsLC.forEach(function (c2) {
                keys.push('lc_trans_' + fromYear + '_' + m.selectedSource.lastYear + '_' + c1 + '_' + c2)
            })
        })
        var f = ee.Feature(null).copyProperties(ftc.first(), keys);
        var panel = createChartPanel(c.rp.charts.pnlTransitionsCharts);
        panel.widgets().set(0,
            ui.Label({
                value: m.labels.lblGeneratingCharts + ': ' + m.labels.lblTableLC + '...',
                style: s.styleMessage,
            })
        );
        m.evalSet["transTable"] = true;
        f.evaluate(function (ef, error) {
            delete m.evalSet["transTable"];
            if (Object.keys(m.evalSet).length === 0) {
                handleEvaluating(false);
            }
            if (error) {
                panel.widgets().get(0).setValue(m.labels.lblUnexpectedError + ':' + error);
                return;
            }
            if (ef) {
                var dtTransitions = [];
                var colsConfig = [];
                colsConfig.push({
                    type: 'string',
                    label: fromYear + '/' + m.selectedSource.lastYear,
                    role: 'domain',
                }
                );
                // LC categories as columns
                catsLC.forEach(function (c) {
                    colsConfig.push(
                        {
                            type: 'number',
                            label: m.lv.lc.names[c - 1],
                            role: 'data',
                        }
                    )
                })
                colsConfig.push(
                    {
                        type: 'number',
                        label: 'Total',
                        role: 'data',
                    }
                )
                dtTransitions.push(colsConfig);
                catsLC.forEach(function (c1) {
                    var values = [m.lv.lc.names[c1 - 1]]
                    var totalRow = 0;
                    catsLC.forEach(function (c2) {
                        var transValue = ef.properties['lc_trans_' + fromYear + '_' + m.selectedSource.lastYear + '_' + c1 + '_' + c2];
                        values.push(transValue)
                        totalRow = totalRow + transValue;
                    })
                    values.push(totalRow)
                    dtTransitions.push(values);
                })
                // add totals for columns
                var totals = ['Total']
                var rowTotal = 0;
                catsLC.forEach(function (col) {
                    var totalCol = 0;
                    catsLC.forEach(function (cat) {
                        var cellValue = dtTransitions[cat][col];
                        totalCol = totalCol + cellValue
                    })
                    totals.push(totalCol);
                    rowTotal = rowTotal + totalCol;
                })
                totals.push(rowTotal);
                dtTransitions.push(totals);
                var chtTransitionsTable = ui
                    .Chart(dtTransitions)
                    .setChartType('Table')
                    .setOptions({
                        title: m.labels.lblTableLC,
                        legend: { position: 'none' },
                        pageSize: 100,
                        allowHtml: true,
                        frozenColumns: 1,
                    });
                panel.widgets().set(0, chtTransitionsTable);
            }
            else {
                c.rp.lblMessages.setValue(error);
            }
        });
        // chart degradation state
        var lstFeatDeg = [1, 2, 3].map(function (deg, i) {
            var degColumn = 'lc_deg_' + m.selectedSource.initials + '_' + fromYear + '_' + m.selectedSource.lastYear + '_' + deg;
            var lstValues = ee.List([m.lv.lcDeg.names[i], ftc.first().get(degColumn)]);
            //                var lstValues = ee.List([m.labels[source.lcDegCatVis.names[i]], ftc.first().get(degColumn)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderDeg = ee.List([
            [
                { label: 'Deg', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsDeg = {
            title: m.labels.lblStateLayer + ' ' + fromYear + '-' + m.selectedSource.lastYear,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.lcDeg.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderDeg.cat(ee.FeatureCollection(lstFeatDeg)
            .aggregate_array('row')), optionsDeg, 'PieChart',
            createChartPanel(c.rp.charts.pnlTransitionsCharts));
    };
    var setupActionPlanCharts = function () {
        c.rp.charts.pnlActionPlanCharts.clear();
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi,
            ['res', 'resLC']);
        // todo export from precal
        var namesResponse = ['res_1', 'res_2', 'res_3']
        //var namesResponse = ['lc_1', 'lc_2', 'lc_3']
        //var namesResponseLC = ['resLC_0', 'resLC_1', 'resLC_2', 'resLC_3', 'resLC_4', 'resLC_5', 'resLC_6', 'resLC_7', 'resLC_8', 'resLC_9'];
        var namesResponseLC = ['resLC_0', 'resLC_1', 'resLC_2', 'resLC_3', 'resLC_4', 'resLC_5', 'resLC_6', 'resLC_7', 'resLC_8', 'resLC_9'];
        var f = ee.Feature(null).copyProperties(ftc.first(), namesResponse.concat(namesResponseLC));
        var panel = createChartPanel(c.rp.charts.pnlActionPlanCharts);
        panel.widgets().set(0,
            ui.Label({
                value: m.labels.lblGeneratingCharts + ': ' + m.labels.lblResponseHierarchy + '...',
                style: s.styleMessage,
            })
        );
        panel.widgets().set(1,
            ui.Label({
                value: m.labels.lblGeneratingCharts + ': ' + m.labels.lblSuggestedActions + '...',
                style: s.styleMessage,
            })
        );
        m.evalSet["LDNActionPlan"] = true;
        f.evaluate(function (ef, error) {
            delete m.evalSet["LDNActionPlan"];
            if (Object.keys(m.evalSet).length === 0) {
                handleEvaluating(false);
            }
            if (error) {
                panel.widgets().get(0).setValue(m.labels.lblUnexpectedError + ':' + error);
                return;
            }
            if (ef) {
                var dtResponseHierarchy = [];
                dtResponseHierarchy.push([{
                    type: 'string',
                    label: 'Hierarchy',
                    role: 'domain',
                },
                {
                    type: 'number',
                    label: 'Area',
                    role: 'data',
                    format: '#,###'
                },
                {
                    type: 'string',
                    label: 'color',
                    role: 'style',
                },
                ]);
                namesResponse.map(function (col, i) {
                    var v = ef.properties[col] === undefined ? 0 : ef.properties[col];
                    v = Math.round(v);
                    dtResponseHierarchy.push([m.lv.response.names[i], v, m.lv.response.vis.palette[i]]);
                });
                var chtResponseHierarchy = ui
                    .Chart(dtResponseHierarchy)
                    .setChartType('BarChart')
                    .setOptions({
                        title: m.labels.lblResponseHierarchy,
                        legend: { position: 'none' },
                        width: 400,
                        height: 400,
                        vAxis: { title: '', titleTextStyle: { italic: false, bold: true } },
                        hAxis: { minValue: 0, title: 'Ha', titleTextStyle: { italic: false, bold: true } },
                    });
                panel.widgets().set(0, chtResponseHierarchy);
                // Response LC
                var dtResponseLC = [];
                dtResponseLC.push([{
                    type: 'string',
                    label: 'Category',
                    role: 'domain',
                },
                {
                    type: 'number',
                    label: m.labels.lblConservation,
                    role: 'data',
                    format: '#,###'
                },
                {
                    type: 'string',
                    label: 'color',
                    role: 'style',
                },
                {
                    type: 'number',
                    label: m.labels.lblManagement,
                    role: 'data',
                    format: '#,###'
                },
                {
                    type: 'string',
                    label: 'color',
                    role: 'style',
                },
                {
                    type: 'number',
                    label: m.labels.lblRehabilitation,
                    role: 'data',
                    format: '#,###'
                },
                {
                    type: 'string',
                    label: 'color',
                    role: 'style',
                },
                ]);
                // Iterate for 3 cat: Forest, Grassland, Cropland
                [1, 4, 7].map(function (col, i) {
                    var v1 = ef.properties['resLC_' + col] === undefined ? 0 : ef.properties['resLC_' + col];
                    var v2 = ef.properties['resLC_' + (col + 1)] === undefined ? 0 : ef.properties['resLC_' + (col + 1)];
                    var v3 = ef.properties['resLC_' + (col + 2)] === undefined ? 0 : ef.properties['resLC_' + (col + 2)];
                    dtResponseLC.push([[m.labels.lblForest, m.labels.lblGrassland, m.labels.lblCropland][i],
                    Math.round(v1),
                    m.lv.responseLC.vis.palette[col],
                    Math.round(v2),
                    m.lv.responseLC.vis.palette[col + 1],
                    Math.round(v3),
                    m.lv.responseLC.vis.palette[col + 2]]);
                });
                var chtSuggestedActions = ui
                    .Chart(dtResponseLC)
                    .setChartType('ColumnChart')
                    .setOptions({
                        title: m.labels.lblSuggestedActions,
                        legend: { position: 'none', maxLines: 3 },
                        bar: { groupWidth: '75%' },
                        width: 600,
                        height: 400,
                        isStacked: 'percent',
                    });
                panel.widgets().set(1, chtSuggestedActions);
            }
            else {
                c.rp.lblMessages.setValue(error);
            }
        });
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
        // TODO check if desired behaviour: combined layer is always generated but only shown if hotspots panel is opened 
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
        print(image)
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
        // Function to calculate total area from precalculated asset
        var getSumAreas = function (categories, prefix, posfix, ftc) {
            var sum = ee.Number(0);
            categories.forEach(function (c) {
                sum = sum.add(ftc.first().get(prefix + c + posfix));
            });
            return sum;
        };
        // Function to filter image with categories 
        var getFilteredImage = function (image, categories) {
            //var imgFiltered = image.clip(m.ftcAoi).eq(parseInt(categories[0]));
            // test_change
            var imgFiltered = image.eq(parseInt(categories[0]));
            for (var i = 1; i < categories.length; i++) {
                imgFiltered = imgFiltered.or(image.eq(parseInt(categories[i])));
            }
            return imgFiltered.selfMask();
        };
        // Foreach section panel in hotspots panel check which categories are selected
        var selectedPerSection = [];
        var filteredImages = [];
        var advancedMode = c.lp.mc.selMcOptions.getValue() === m.labels.lblMcAdvanced ? true : false;
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
            // test_change
            //var imgProduct = ee.Image(1).clip(m.ftcAoi);
            var imgProduct = ee.Image(1);
            // multiply filtered images
            filteredImages.forEach(function (f) {
                imgProduct = imgProduct.multiply(f);
            });
            //a.imgCustom = imgProduct;
            a.imgCustom = imgProduct.clip(m.ftcAoi);
            // Calculate only selected categories
            var imgCombinedCatAreaAdv = a.imgCustom.eq(1)
                .rename('area')
                .multiply(ee.Image.pixelArea()).divide(10000);
            // If country is selected go with best effort
            var be = m.levelAoi === m.labels.lblSelectContainer ? true : false;
            var statsAreaAdv = imgCombinedCatAreaAdv.reduceRegion({
                reducer: ee.Reducer.sum(),
                geometry: m.ftcAoi.geometry().bounds(),//m.ftcAoi.first().geometry(),
                scale: 100,
                bestEffort: be
            });
            totalArea = statsAreaAdv.get('area');
            statsAreaBE = imgCombinedCatAreaAdv.reduceRegion({
                reducer: ee.Reducer.sum(),
                geometry: m.ftcAoi.geometry().bounds(),//m.ftcAoi.first().geometry(),
                scale: 100,
                bestEffort: true
            });
        }
        else {
            // Simple mode: check if combined or single image will be used:
            // -> if categories from more than one section are selected then combined image is used, else single imaged is used
            // -> if sectionIndex remains -1 use combined image, else use single image in index=sectionIndex;
            var sectionIndex = -1;
            for (var index = 0; index < selectedPerSection.length; index++) {
                if (selectedPerSection[index].length > 0) {
                    if (sectionIndex === -1) {
                        sectionIndex = index;
                    }
                    else {
                        sectionIndex = -1;// categories from more than one section selected, use combined image
                        break;
                    }
                }
            }
            if (sectionIndex === -1) { // Use combined image x3
                var catNumbers = [];
                var combinedCatNames = [];
                var aux = [];
                // check empty section
                selectedPerSection.forEach(function (a, i) {
                    if (a.length > 0) { // add selected categories in section
                        aux.push(a);
                    }
                    else {// none category selected so use all categories for section
                        var all = m.mcEntries[i].categories.slice(0);
                        if (m.mcEntries[i].noDataCategory) { // if img has no data pixels add 0 cat
                            all.push(0);
                        }
                        aux.push(all);
                    }
                });
                // i.e aux [[2],[0,1,2,3,4,5],[1],[1]]
                var combineCategories = function (aux, sectionIndex, concat) {
                    aux[sectionIndex].forEach(function (element) {
                        if (sectionIndex === aux.length - 1) {
                            combinedCatNames.push(concat + '_' + element);
                        }
                        else {
                            combineCategories(aux, sectionIndex + 1, concat + (sectionIndex === 0 ? '' : '_') + element);
                        }
                    });
                };
                combineCategories(aux, 0, '');
                // remove '_' for raster categories query
                combinedCatNames.forEach(function (c) {
                    catNumbers.push(c.replace(/_/g, ''));
                });
                // Calculate image filtered with categories selected
                a.imgCustom = getFilteredImage(a.imgCombinedx3, catNumbers);
                // test_change add
                a.imgCustom = a.imgCustom.clip(m.ftcAoi);
                if (m.precalculated) {
                    // For area calulation setup precalculated area columns names
                    totalArea = getSumAreas(combinedCatNames, '', '', m.ftcAoi);
                }
                else {
                    // It is not precalculated so calculate area for selected categories in x3
                    var imgCombinedCatArea = a.imgCustom.eq(1)
                        .rename('area')
                        .multiply(ee.Image.pixelArea()).divide(10000);
                    var statsArea = imgCombinedCatArea.reduceRegion({
                        reducer: ee.Reducer.sum(),
                        // test_change
                        geometry: m.ftcAoi.geometry().bounds(),
                        //geometry: m.ftcAoi.first().geometry(),
                        scale: 50, // scale for combined img
                    });
                    totalArea = statsArea.get('area');
                    statsAreaBE = imgCombinedCatArea.reduceRegion({
                        reducer: ee.Reducer.sum(),
                        geometry: m.ftcAoi.geometry().bounds(),//m.ftcAoi.first().geometry(),
                        scale: 50,
                        bestEffort: true
                    });
                }
            }
            else {
                // Calculate raster and area with single image
                a.imgCustom = getFilteredImage(m.mcEntries[sectionIndex].image, selectedPerSection[sectionIndex]);
                a.imgCustom = a.imgCustom.clip(m.ftcAoi);
                // For area calulation setup precalculated area columns names
                var ftcSingle = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi, [m.mcEntries[sectionIndex].precalName]);
                totalArea = getSumAreas(selectedPerSection[sectionIndex], m.mcEntries[sectionIndex].prefix, m.mcEntries[sectionIndex].sufix, ftcSingle);
            }
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
    m.ftcLelvel2 = ftc2;
    m.ftcAoi = ftc0;
    m.levelAoi = m.labels.lblSelectContainer;
    m.haAoi = 0;
    m.precalculated = true;
    // Countries names for dropdown
    m.names1 = m.ftcLelvel1.aggregate_array('ADM1_NAME').getInfo();
    m.codes1 = m.ftcLelvel1.aggregate_array('ADM1_CODE').getInfo();
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