var ftcPA = ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    ftcKBA = ee.FeatureCollection("users/projectgeffao/World/KBAsGlobal_2021_March_01_POL_Fix"),
    imgFireIndex = ee.Image("users/projectgeffao/World/FireRecurrenceIndex_MCD64_2001_2021_World"),
    imgPrecipitationTrend = ee.Image("users/projectgeffao/World/Climate/PrecipTrendIndex_World_2011_2021"),
    //imgTerrain = ee.Image("users/projectgeffao/Azerbaijan/Terrain_rgb3_Azerbaijan"),  
    imgTerrain = ee.Image("users/projectgeffao/Azerbaijan/Terrain_rgb3_Azerbaijan_v3"),
    ftc0 = ee.FeatureCollection("users/angelini_hernan/Azerbaijan/AZE_Precal_Level0b_v2_NBe"),
    ftc0b = ee.FeatureCollection("users/angelini_hernan/Azerbaijan/AZE_Precal_Level0_v2_NBe"),
    ftc1 = ee.FeatureCollection("users/angelini_hernan/Azerbaijan/AZE_Precal_Level1_v3_NBe"),
    ftc2 = ee.FeatureCollection("users/angelini_hernan/Azerbaijan/AZE_Precal_Level2_v3_NBe"),
    ftcBasinsL8_View = ee.FeatureCollection("users/projectgeffao/Azerbaijan/Aze_Basin_L8_Whole"),
    ftcBasinsL8_Country = ee.FeatureCollection("users/angelini_hernan/Azerbaijan/AZE_Precal_Basin8_v3_NBe");
// Area project;
var ftcWArea = ee.FeatureCollection("users/angelini_hernan/Azerbaijan/AZE_Precal_WholeArea_v3_NBe");
var ftcSites = ee.FeatureCollection("users/angelini_hernan/Azerbaijan/AZE_Precal_Sites_v3_NBe");
var ISO3 = 'AZE';
var ftcBasins = ftcBasinsL8_Country;
//var ftcSubbasins = ftcBasinsL11_Country;
//---------------------------------------
// load ISRIC soil layers
//---------------------------------------
var soilType = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/AZE_soilType12cat_250m");
var soilText = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/AZE_soilText7cat_250m");
// ocs | Organic carbon stock | ocs_mean 
var ocs = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_ocs_250m");
// soc - Soil organic carbon content- soc_mean
var soc = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_soc_250m");
// phh2o | pH in H2O | phh2o_mean
var pH = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_ph_250m");
// clay | Clay | clay_mean
var clay = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_clay_250m");
// silt | Silt | silt_mean
var silt = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_silt_250m");
// sand | Sand | sand_mean
var sand = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_sand_250m");
// cfvo Coarse fragments cfvo_mean
var cfvo = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_cfvo_250m");
/*
// African SoilGrids: nutrient maps
var k = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/AZE_K_2017_250m");
var mg = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/AZE_Mg_2017_250m");
// African SoilGrids: GYGA maps
var erzd = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/AZE_erzd_2018_1km");
var awc30 = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/AZE_awc30cm_2018_1km");
*/
//---------------------------------------
// categorized versions
//---------------------------------------
var ocs7cat = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_ocs7cat_250m");
var soc7cat = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_soc7cat_250m");
var pH7cat = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_ph7cat_250m");
var clay6cat = ee.Image("users/angelini_hernan/Azerbaijan/ISRIC/ISRIC_Soilgrids250mV2_clay6cat_250m");
//---------------------------------------
// End ISRIC categorized versions
//---------------------------------------
/**
 * App: LDN Azerbaijan
 *
 * The App is based on the the scripts that are part of a joint development between FAO and WOCAT
 * and also in the publication in Land Degradation & Development: 
 * Teich et al. 2022 (https://doi.org/10.1002/ldr.4645). 
 * 
 * Also published as pre-print at: https://doi.org/10.22541/au.166256286.69297348/v1 
 * Code sourses:
 * GitHub: https://github.com/wocatapps/ecuador-ldn/tree/v1.0
 * Zenodo publication of the system:https://doi.org/10.5281/zenodo.6348038
 * 
 * Feel free to use/copy/modify 
 * -----------------------------------------------------------------------------------------------------
 * The structure of this script follows UI Pattern Template script provided by 
 * Tyler Erickson (tylere@google.com) and Justin Braaten (braaten@google.com)
 * 
 * https://code.earthengine.google.com/bab500e5290d579f8d5f1cc5715314cf
 *   
 * 1-Model, 2-Components, 3-Composition, 4-Styling, 5-Behaviors, 6-Initialization
 * 
 * ------------------------------------------------------------------------------------------------------
 * Authors of this implementation:
 * @author Eugenia Raviolo (eugenia.raviolo@gmail.com)
 * @author Cesar Garcia (cesarnon@gmail.com)
 * @author Ingrid Teich (ingridteich@gmail.com)
 * @author Hernan Angelini (hernanangelini@gmail.com)
 */
/** Modules */
var mdlLegends = require('users/projectgeffao/Azerbaijan:Apps2/legends.js');
var mdlPrecalculation = require('users/projectgeffao/Azerbaijan:Apps2/precalculation.js');
var mdlLocalization = require('users/projectgeffao/Azerbaijan:Apps2/localization.js');
var mdlPalettes = require('users/gena/packages:palettes');
/** Assets */
var a = {};
// From precalculation script
a.imgMountains = mdlPrecalculation.imgMountains.clip(ftc0);
a.imgLPD = mdlPrecalculation.imgLPD.unmask().clip(ftc0);
a.imgSOC = mdlPrecalculation.imgSOC.unmask().clip(ftc0);
a.imgCombinedx2 = mdlPrecalculation.baseLC.imgCombinedx2.clip(ftc0); // LCxLPD
a.imgLastLC = mdlPrecalculation.baseLC.imgLC.clip(ftc0);
a.imgNPP = mdlPrecalculation.imgNPP.clip(ftc0);
a.imgKBABin = mdlPrecalculation.imgKBABin.clip(ftc0);
a.imgPABin = mdlPrecalculation.imgPABin.clip(ftc0);
// SDGs
// JRC
a.imgSDGBaselineJRC = mdlPrecalculation.imgSDGBaselineJRC.unmask().clip(ftc0);
a.imgSDGReportJRC = mdlPrecalculation.imgSDGReportJRC.unmask().clip(ftc0);
a.imgSDGStatusJRC = mdlPrecalculation.imgSDGStatusJRC.unmask().clip(ftc0);
a.imgSDGComparisonJRC = mdlPrecalculation.imgSDGComparisonJRC.unmask().clip(ftc0);
// Trends.Earth
a.imgSDGBaselineTE = mdlPrecalculation.imgSDGBaselineTE.unmask().clip(ftc0);
a.imgSDGReportTE = mdlPrecalculation.imgSDGReportTE.unmask().clip(ftc0);
a.imgSDGStatusTE = mdlPrecalculation.imgSDGStatusTE.unmask().clip(ftc0);
a.imgSDGComparisonTE = mdlPrecalculation.imgSDGComparisonTE.unmask().clip(ftc0);
// SIMPLIFIED
a.imgSDGBaselineFAOSimp = mdlPrecalculation.imgSDGBaselineFAOSimp.unmask().clip(ftc0);
a.imgSDGReportFAOSimp = mdlPrecalculation.imgSDGReportFAOSimp.unmask().clip(ftc0);
a.imgSDGStatusFAOSimp = mdlPrecalculation.imgSDGStatusFAOSimp.unmask().clip(ftc0);
a.imgSDGComparisonFAOSimp = mdlPrecalculation.imgSDGComparisonFAOSimp.unmask().clip(ftc0);
// ADVANCED
a.imgSDGBaselineFAOWOCAT = mdlPrecalculation.imgSDGBaselineFAOWOCAT.unmask().clip(ftc0);
a.imgSDGReportFAOWOCAT = mdlPrecalculation.imgSDGReportFAOWOCAT.unmask().clip(ftc0);
a.imgSDGStatusFAOWOCAT = mdlPrecalculation.imgSDGStatusFAOWOCAT.unmask().clip(ftc0);
a.imgSDGComparisonFAOWOCAT = mdlPrecalculation.imgSDGComparisonFAOWOCAT.unmask().clip(ftc0);
// From imports
a.imgFireIndex = imgFireIndex.updateMask(1).clip(ftc0);
// For multicriteria calculation
a.imgCustom = ee.Image(0).selfMask();
a.imgMask = ee.Image(0).selfMask();
// Filter global assets
a.ftcKBA = ftcKBA.filterBounds(ftc0)//.filter(ee.Filter.eq('ISO3', ISO3));
a.ftcPA = ftcPA.filter(ee.Filter.eq('ISO3', ISO3)).filterMetadata('DESIG_TYPE', 'equals', 'National');
a.ftcBasinsL8_View = ftcBasinsL8_View.filterBounds(ftc0);    // edit line ~359
//a.ftcBasinsL11_View = ftcBasinsL11_View.filterBounds(ftc0);  // edit line ~368
// NDVI by month and year
var startYear = 2001;
var endYear = 2022;
var imcModis = ee.ImageCollection('MODIS/006/MOD13Q1').filterDate(startYear + '-01-01', endYear + '-12-31');
var imcModisNDVI = imcModis.select('NDVI');
var lstYears = ee.List.sequence(startYear, endYear);
var lstMonths = ee.List.sequence(1, 12);
// 20x12=240 images
var imcNDVIByMonthYear = ee.ImageCollection.fromImages(
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
    m.maxAreaHa = 500000;
    m.bestEffort = false;
    // Options: NATIONAL LC
    m.transitionsSources = mdlPrecalculation.transitionSourcesLC;
    // Selected transition source 
    m.selectedSource = m.transitionsSources[0]; // ESA
    m.defaultFinalLCYear = m.selectedSource.lastYear;
    m.defaultInitialLCYear = m.selectedSource.initialYears[0];
    // More info & contact
    m.info = {
        referenceDocUrl: '',
        contactEmail1: 'carolina.starr@fao.org',
        contactEmail2: 'aysel.rzayeva@eco.gov.az',
        contactEmail3: 'elmaddin.namazov@fao.org',
        contactEmail4: '',
        logoAssetId: 'users/projectgeffao/',// TODO
        logoDimensions: '716x234',
    };
    // Feature collections options to click on the map to obtain precalculated statistics
    m.assetsClick = {};
    m.assetsClick[m.labels.lblNone] = null;
    m.assetsClick[m.labels.lblLevel1] = ftc1;
    m.assetsClick[m.labels.lblLevel2] = ftc2;
    m.assetsClick[m.labels.lblLimit] = ftcWArea;
    m.assetsClick[m.labels.lblImplementationSites] = ftcSites;
    m.assetsClick[m.labels.lblBasins] = ftcBasins;
    //m.assetsClick[m.labels.lblSubbasins] = ftcSubbasins;ftcGqvirCca
    // Feature collection to query on map click
    m.ftcClickOn = ftc1;
    // Layers Visualization
    m.lv = {
        lcNational: {
            vis: {
                min: 1, max: 9, opacity: 1,
                palette: ['#377e3f','#f096ff','#A7D282','#c19511', '#fcdb00', '#d7191c','#cfdad2', '#18eebe', '#4458eb'],
            },
            names: [
                m.labels.lblTreeCovered,
                m.labels.lblMangrove,
                m.labels.lblShrubland,
                m.labels.lblGrassland,
                m.labels.lblCropland,
                m.labels.lblArtificial,
                m.labels.lblOtherLand,
                m.labels.lblWetland,
                m.labels.lblWaterbody,
            ]
        },
        lc: {
            vis: {
                min: 1, max: 7, opacity: 1,
                palette: ['#377e3f', '#c19511', '#fcdb00', '#18eebe', '#d7191c', '#cfdad2', '#4458eb'],
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
        lcTransitions: {
            vis: {
                min: 0, max: 7, opacity: 1,
                palette: ['#FEFFE5', '#377e3f', '#c19511', '#fcdb00', '#18eebe', '#d7191c', '#cfdad2', '#4458eb'],
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
            ]
        },
        lpd: {
            vis: {
                min: 0, max: 5, opacity: 1,
                palette: ['#ffffff', '#f23c46', '#e9a358', '#e5e6b3', '#a9afae', '#267300'],
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
        npp: {
            vis: { min: 0, max: 1, opacity: 1, palette: ['#d1442e', '#d17534', '#feb532', '#fef622', '#cee40d', '#b7cb0c', '#09db16', '#07a811', '#05800d'] },
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
        //set ISRIC Soil visualization parameters
        /*soilType: { 
            vis: { min: 0, max: 29, opacity: 1, 
            palette: ['9b1270','ceab76','bc1f47','243d9a','a91d99','52da36','8e3a23',
                      '13bb91','28a1ac','b15aeb','c08546','a2705c','9a4812','e586f1',
                      '309d61','923deb','7ccd5f','c230d8','ac4fc5','cdb56c','e74c92',
                      'a975f6','639414','66f98b','158cb3','691d84','673a83','74a3cf',
                      '83d991','4b4688']},
            names: ['0Acrisols','Albeluvisols','Alisols','Andosols','Arenosols','Calcisols',
                    '6Cambisols','Chernozems','Cryosols','Durisols','Ferralsols','Fluvisols',
                    '12Gleysols','Gypsisols','Histosols','Kastanozems','Leptosols','Lixisols',
                    '18Luvisols','Nitisols','Phaeozems','Planosols','Plinthosols','Podzols',
                    '24Regosols','Solonchaks','Solonetz','Stagnosols','Umbrisols','Vertisols']
        },*/
        soilType: { 
            vis: { min: 1, max: 14, opacity: 1, 
            palette: ['9b1270','448f14','8e3a23','13bb91',
                      '28a1ac','cb7f17','896d09','923deb',
                      '7ccd5f','ac4fc5','e74c92','66f98b',
                      '158cb3','691d84']},
            names: ['Acrisols','Calcisols','Cambisols','Chernozems',
                    'Cryosols','Fluvisols','Gleysols','Kastanozems',
                    'Leptosols','Luvisols','Phaeozems','Podzols',
                    'Regosols','Solonchaks']
        },
        soilText: { 
            vis: { min: 1, max: 7, opacity: 1, 
            palette: ['d5c36b','b96947','ae868f','f86714',
                      '368f20','3e5a14','ffd557']},
            names: ['clay','silty clay','clay loam','silty clayloam',
                    'loam', 'silty loam', 'sandy loam']
        },
        soc: { 
            vis: { min: 50, max: 400, opacity: 1, 
            palette: ['fbff12','ffd63f','e7c72b','ff9410','d08008','ab5907','763e04'] },
            names: [ '. 0 - 5 ','. 5 - 10','10 - 15','15 - 20','20 - 25','25 - 30','30 - . >']
        },
        soc7cat: { 
            vis: { min: 1, max: 7, opacity: 1, 
            palette: ['fbff12','ffd63f','e7c72b','ff9410','d08008','ab5907','763e04'] },
            names: [ '. 0 - 5 ','. 5 - 10','10 - 15','15 - 20','20 - 25','25 - 30','30 - . >']
        },
        pH: { 
            vis: { min:61, max:86, opacity:1,
            palette: ['ababab','b666ff','25b9ff','59ff4e','fff819','ff860a','b05c07'] },
            names: [ '. < - 6.0','6.0 - 6.5','6.5 - 7.0','7.0 - 7.5','7.5 - 8.0','8.0 - 8.5','8.5 - . >']
        },
        pH7cat: {
            vis: { min:1, max:7, opacity:1, 
            palette: ['ababab','b666ff','25b9ff','59ff4e','fff819','ff860a','b05c07'] },
            names: [ '. < - 6.0','6.0 - 6.5','6.5 - 7.0','7.0 - 7.5','7.5 - 8.0','8.0 - 8.5','8.5 - . >']
        },
        clay: {
            vis: { min: 50, max: 500, opacity: 1, 
            palette: ["ffebcc","b525ff","10b2ff","3eef28","ffb84d","b15200"] },
            names: [ '. 0 - 10', '10 - 20','20 - 30','30 - 40','40 - 50','50 - . >',]
        },
        clay6cat: {
            vis: { min: 1, max: 6, opacity: 1, 
            palette: ["ffebcc","b525ff","10b2ff","3eef28","ffb84d","b15200"] },
            names: [ '. 0 - 10', '10 - 20','20 - 30','30 - 40','40 - 50','50 - . >',]
        },
        silt: {
            vis: { min: 250, max: 450, opacity: 1, 
            palette: ['f5e9e1','e2bda4','d8a786','ce9068','c47a4a','b14e0d'] },
            names: [ '. 0 - 10', '10 - 20','20 - 30','30 - 40','40 - 50','50 - . >',]
        },
        sand: {
            vis: { min: 150, max: 450, opacity: 1, 
            palette: ['fffbe9','fff4bd','fff0a8','ffed92','ffe97c','ffe250'] },
            names: [ '. 0 - 10', '10 - 20','20 - 30','30 - 40','40 - 50','50 - . >',]
        },
        cfvo: {
            vis: { min: 60, max: 300, opacity: 1, 
            palette: ['d0d0b9','bcbc9b','acad83','9c9d6c','90915a','88894e'] },
            names: [ '. 0 - 10', '10 - 20','20 - 30','30 - 40','40 - 50','50 - . >',]
        },
        mg: {
            vis: {opacity:1, min:300, max:1500,
            palette: ["adadad","ff7b49","ffff00","00ff00","00ffff","0000ff","ff00ff","ff0000"]},
            names: [ '. < - 300','300 - 500','500 - 700','700 - 900','900 - 1100','1100 - 1300','1300 - 1500','1500 - . >']
        },
        k: {
            vis: {opacity:1, min:200, max:1000,
            palette: ["7a3800","ff8100","ffc04d","c7ff5a","1bff00",
                      "00fff3","0008ff","e404ff","ff89af"]},
            names: [ '. < - 200','200 - 300','300 - 400','400 - 500','500 - 600','600 - 700','700 - 800' ,'800 - 900' ,'900 - . >']
        },        
        erzd: { 
            vis: { min: 10, max: 120, opacity:1,
            palette: ["ffff00","ff9900","7c2e00"]} 
        },
        awc30: { 
            vis: { min: 5, max: 12, opacity:1,
            palette: ["ffff00","ff9900","7c2e00"]} 
        },
        // end ISRIC Soil visualization    
        borderLevel0: { vis: { color: 'black', lineType: 'dashed', fillColor: '00000000' } },
        borderLevel1: { vis: { color: 'black', fillColor: '00000000' } },
        borderLevel2: { vis: { color: '#838888', fillColor: '00000000', width: 1 } },
        borderLevel3: { vis: { color: 'purple', fillColor: '00000000', width: 1 } },
        borderLevel4: { vis: { color: 'purple', fillColor: 'd13eff70' } },
        borderBasinsL1: { vis: { color: 'blue', fillColor: '00000000', width: 2 } },
        borderBasins: { vis: { color: 'blue', fillColor: '00000000', width: 1 } },
        borderSubbasins: { vis: { color: 'darkgreen', fillColor: '00000000', width: 1 } },
        borderMicbasins: { vis: { color: '#ff9e0f', fillColor: '00000000', width: 1.5 } },        
        borderRiver: { vis: { color: '#0066FF', width: 0.5 } },
        otto: { vis: {color: "black", fillColor: "11ece130", width: 2 } },
        villages: { vis: { color: 'purple' } },
        gef7: { vis: { color: 'pink', fillColor: '00000000', width: 2 } },
        gef8: { vis: { color: 'red', fillColor: '00000000', width: 2 } },
        terr: { vis: {color: 'black' } },
        highlight: { vis: { color: '#b040d6', fillColor: '00000000' } },
        socl: { vis: { min: 0, max: 100, palette: ['#fcffac', '#a60000'] } },
        custom: { vis: { max: 1, min: 1, opacity: 1, palette: ['#FF00FF'] } },
        pa: { vis: { color: 'green', width: 1 } },
        kba: { vis: { color: 'orange' } },
        fireIndex: { vis: { opacity: 1, min: 0, max: 0.5, palette: ['#fcfdbf', '#fc8761', '#b63679', '#50127b', '#000004'] } },
        precipTrend: { vis: { min: -3, max: 3, palette: ["#d63000", "#ffffff", "#062fd6"] } },
        terrain: { 
            vis: { min: -30, max: 4000, 
            palette: ['#0a3606', '#33720c', '#3e7620', '#4b8947', '#33c05a', '#8bdb82', '#c4e297', '#d5e0a1', '#e7deab', '#f8dcb5', '#fddab4', '#fcd7ad', '#fad4a5', '#f8d29e', '#f6cf97', '#f4cc8f', '#f2c988', '#f0c780', '#eec479', '#ecc171', '#eabe6a', '#e8bc62', '#e6b95b', '#e4b653', '#e2b34c', '#e0b144', '#deae3d', '#dcab35', '#daa82e', '#d9a627', '#d1a425', '#caa224', '#c2a023', '#bb9e22', '#b39c20', '#ac9a1f', '#a7991e', '#a7971d', '#a6961c', '#a5941b', '#a5931a', '#a49119', '#a49019', '#a38e18', '#a38d17', '#a38b16', '#a28a15', '#a28814', '#a28613', '#a18512', '#a18311', '#a08110', '#a0800f', '#9f7e0e', '#9f7c0e', '#9f7b0d', '#9e790c', '#9e780b', '#9d760a', '#9d7509', '#9c7308', '#9c7207', '#9b7006', '#9b6e05', '#9a6d04', '#9a6b03', '#9a6902', '#996801', '#996600', '#9a640a', '#9b6218', '#9c6025', '#9e5e33', '#9f5c40', '#a05a4e', '#a25a5a', '#a55e5e', '#a76262', '#a96767', '#ac6b6b', '#ae7070', '#b17474', '#b27979', '#b37d7d', '#b48181', '#b48686', '#b58a8a', '#b68f8f', '#b79393', '#b89898', '#ba9c9c', '#bca0a0', '#bda5a5', '#bfa9a9', '#c1aeae', '#c2b2b2', '#c4b6b6', '#c6bbbb', '#c7bfbf', '#c9c3c3', '#cac8c8', '#cccccc', '#d0d0d0', '#d3d3d3', '#d7d7d7', '#dbdbdb', '#dfdfdf', '#e3e3e3', '#e7e7e7', '#ebebeb', '#efefef', '#f3f3f3', '#f7f7f7', '#fbfbfb']} 
        },
    };
    // Map layers configuration
    m.layerEntries = [
        {
            asset: imgTerrain, // TODO
            style: {},
            name: m.labels.lblTopography,
            visible: true,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblElevation + ' (m)', m.lv.terrain.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1_OI7YvISRdpb0ffkfIIxvXeul0pF2D-q/view?usp=drive_link'
        },
        {
            asset: a.imgLastLC,
            style: m.lv.lcNational.vis,
            name: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLC.name + ') ' + mdlPrecalculation.baseLC.year,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLC.name + ') ' + mdlPrecalculation.baseLC.year, m.lv.lcNational.names, m.lv.lcNational.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/15eBosLc2MNS7zrQiQMvIfP1pJdjgiJiC/view?usp=drive_link'
        },
        {
            asset: a.imgLPD,
            style: m.lv.lpd.vis,
            name: m.labels.lblLandProductivityDynamics,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandProductivityDynamics, m.lv.lpd.names, m.lv.lpd.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1wSoP2rNNJgu-xMVENJtghttQxmQudHVk/view?usp=drive_link'
        },
        {
            asset: a.imgSOC,
            style: m.lv.socl.vis,
            name: m.labels.lblSocMap,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblSOCTonnesHa, m.lv.socl.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1ffPpbl_PhJJKKi-Tsl3g5RWRvbywGgor/view?usp=drive_link'
        },
        {
            asset: imgPrecipitationTrend,
            style: m.lv.precipTrend.vis,
            name: m.labels.lblPrecipitationTrend,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblPrecipitationTrend, m.lv.precipTrend.vis, m.labels.lblNegTrend, '', m.labels.lblPosTrend),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1icGsn9C6nbw7THZfiSJp8Xb_7cRgmQQ4/view?usp=drive_link'
        },
        {
            asset: a.imgMountains,
            style: m.lv.mountains.vis,
            name: m.labels.lblMountains,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblMountains, m.lv.mountains.names, m.lv.mountains.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1UansilrHrX-xCMUy399tc5jKHpx8SKzU/view?usp=drive_link'
        },
        {
            asset: a.imgNPP,
            style: m.lv.npp.vis,
            name: m.labels.lblNPP,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblNPPLegend, m.lv.npp.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1qRgbnkV7zHnKd4ZEvFLq-e8ARtHvylAf/view?usp=drive_link'
        },
        {
            asset: a.imgFireIndex,
            style: m.lv.fireIndex.vis,
            name: m.labels.lblFireIndex,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblFireIndex, m.lv.fireIndex.vis, '0.05', '0.25', '0.5'),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/10kd8HrljxTwFJl0viJavWW0xXDXsAQqG/view?usp=drive_link'
        },
        {
            asset: ftc0b,
            style: m.lv.borderLevel0.vis,
            name: 'International limit',//m.labels.lblLevel0,
            visible: true,
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
            asset: ftc2,
            style: m.lv.borderLevel2.vis,
            name: m.labels.lblLevel2,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
        },
        {
            asset: ftcWArea,
            style: m.lv.borderLevel3.vis,
            name: m.labels.lblLimit,
            visible: true,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: ''
        },
        {
            asset: ftcSites,
            style: m.lv.borderLevel4.vis,
            name: m.labels.lblImplementationSites,
            visible: true,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: ''
        },
        {
            asset: a.ftcBasinsL8_View,
            style: m.lv.borderBasins.vis,
            name: m.labels.lblBasins,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: ''
        },
        {
            asset: a.ftcKBA,
            style: m.lv.kba.vis,
            name: m.labels.lblKeyBiodiversityAreas,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: 'https://drive.google.com/file/d/1Mzu0AcbpkR_WegOWYLeup7eCY_-8NLdL/view?usp=drive_link'
        },
        {
            asset: a.ftcPA,
            style: m.lv.pa.vis,
            name: m.labels.lblProtectedAreas,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: 'https://drive.google.com/file/d/1Pq-9wirysAJjF33bYY7v5QnmIPXqvScE/view?usp=drive_link'
        },
    ];
    // SDG
    m.SDGLayerEntries = [
        //SDG 15.3.1 from Default JRC
        {
            asset: a.imgSDGBaselineJRC,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531BasJRC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531BasJRC, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGReportJRC,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531RepJRC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531RepJRC, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGStatusJRC,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531StaJRC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531StaJRC, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGComparisonJRC,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531ComJRC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531ComJRC, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        //SDG 15.3.1 from Trends.Earth
        {
            asset: a.imgSDGBaselineTE,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531BasTE,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531BasTE, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGReportTE,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531RepTE,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531RepTE, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGStatusTE,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531StaTE,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531StaTE, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGComparisonTE,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531ComTE,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531ComTE, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        // FAO WOCAT
        {
            asset: a.imgSDGBaselineFAOWOCAT,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531BasFAOWOCAT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531BasFAOWOCAT, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGReportFAOWOCAT,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531RepFAOWOCAT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531RepFAOWOCAT, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGStatusFAOWOCAT,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531StaFAOWOCAT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531StaFAOWOCAT, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGComparisonFAOWOCAT,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531ComFAOWOCAT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531ComFAOWOCAT, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        // FAO Simplified
        {
            asset: a.imgSDGBaselineFAOSimp,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531BasFAOSimp,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531BasFAOSimp, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGReportFAOSimp,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531RepFAOSimp,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531RepFAOSimp, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGStatusFAOSimp,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531StaFAOSimp,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531StaFAOSimp, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGComparisonFAOSimp,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531ComFAOSimp,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531ComFAOSimp, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
    ];
    // Transitions layers configuration
    m.transitionsEntries = [
        {
            asset: m.selectedSource.imgLCAll.select('y' + m.selectedSource.yearsLC[0]).clip(ftc0),
            style: m.lv.lc.vis,
            label: m.labels.lblFromLC,
            name: m.labels.lblLandCover + ' ' + m.selectedSource.yearsLC[0],
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover, m.lv.lc.names, m.lv.lc.vis.palette, false, false),
        },
        {
            asset: m.selectedSource.imgLCAll.select('y' + m.selectedSource.lastYear).clip(ftc0),
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
    m.SoilGroupLayerEntries = [ // Soil layers
        {
            asset: soilType,
            style: m.lv.soilType.vis,
            name: m.labels.lblsoilType,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblsoilType, m.lv.soilType.names, m.lv.soilType.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://doi.org/10.5194/soil-7-217-2021'
        },
        {
            asset: soilText,
            style: m.lv.soilText.vis,
            name: m.labels.lblsoilText,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblsoilText, m.lv.soilText.names, m.lv.soilText.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://soil.copernicus.org/articles/7/217/2021/'
        },
        {
            asset: pH,
            style: m.lv.pH.vis,
            name: m.labels.lblpH,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblpHLeg, m.lv.pH.names, m.lv.pH.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://soil.copernicus.org/articles/7/217/2021/'
        },
        {
            asset: soc,
            style: m.lv.soc.vis,
            name: m.labels.lblsoc,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblsocLeg, m.lv.soc.names, m.lv.soc.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://soil.copernicus.org/articles/7/217/2021/'
        },
        {
            asset: clay,
            style: m.lv.clay.vis,
            name: m.labels.lblclay,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblclayLeg, m.lv.clay.names, m.lv.clay.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://soil.copernicus.org/articles/7/217/2021/'
        }, 
        {
            asset: silt,
            style: m.lv.silt.vis,
            name: m.labels.lblsilt,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblsiltLeg, m.lv.silt.names, m.lv.silt.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://soil.copernicus.org/articles/7/217/2021/'
        }, 
        {
            asset: sand,
            style: m.lv.sand.vis,
            name: m.labels.lblsand,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblsandLeg, m.lv.sand.names, m.lv.sand.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://soil.copernicus.org/articles/7/217/2021/'
        },
        {
            asset: cfvo,
            style: m.lv.cfvo.vis,
            name: m.labels.lblcfvo,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblcfvoLeg, m.lv.cfvo.names, m.lv.cfvo.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://soil.copernicus.org/articles/7/217/2021/'
        },
/*         {
            asset: mg,
            style: m.lv.mg.vis,
            name: m.labels.lblmg,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblmgLeg, m.lv.mg.names, m.lv.mg.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://www.isric.org/projects/africa-soilgrids-soil-nutrient-maps-sub-saharan-africa-250-m-resolution'
        },
        {
            asset: k,
            style: m.lv.k.vis,
            name: m.labels.lblk,
            visible: false,
            legend:  mdlLegends.createDiscreteLegendPanel(m.labels.lblkLeg, m.lv.k.names, m.lv.k.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://www.isric.org/projects/africa-soilgrids-soil-nutrient-maps-sub-saharan-africa-250-m-resolution'
        },
        {
            asset: erzd,
            style: m.lv.erzd.vis,
            name: m.labels.lblerzd,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblerzdLeg, m.lv.erzd.vis),
            group: 'RASTER',
            citation: 'https://data.isric.org/geonetwork/srv/spa/catalog.search#/search?_cat=AfricaGrids%20GYGA'
        },
        {
            asset: awc30, 
            style: m.lv.awc30.vis,
            name: m.labels.lblawc30,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblawc30Leg, m.lv.awc30.vis),
            group: 'RASTER',
            citation: 'https://data.isric.org/geonetwork/srv/spa/catalog.search#/search?_cat=AfricaGrids%20GYGA'
        }*/
    ];
    m.namesLayers = [];
    m.mcEntries = [
        {
            title: m.labels.lblLandCover,
            palette: m.lv.lcNational.vis.palette,
            names: m.lv.lcNational.names,
            image: a.imgLastLC,
            categories: [1, 2, 3, 4, 5, 6, 7, 8],
        },
        {
            title: m.labels.lblLandProductivityDynamics,
            palette: m.lv.lpd.vis.palette.slice(1),
            names: m.lv.lpd.names.slice(1),
            image: a.imgLPD,
            categories: [1, 2, 3, 4, 5],
        },
        // Soils pH, OCS, Clay
        {
            title: m.labels.lblpH,
            palette: m.lv.pH7cat.vis.palette,
            names: m.lv.pH7cat.names,
            image: pH7cat.unmask(),
            categories: [1, 2, 3, 4, 5, 6, 7],
        },
        {
            title: m.labels.lblsoc,
            palette: m.lv.soc7cat.vis.palette,
            names: m.lv.soc7cat.names,
            image: soc7cat.unmask(),
            categories: [1, 2, 3, 4, 5, 6, 7],
        }, 
        {
            title: m.labels.lblclay,
            palette: m.lv.clay6cat.vis.palette,
            names: m.lv.clay6cat.names,
            image: clay6cat.unmask(),
            categories: [1, 2, 3, 4, 5, 6],
        }, 
        //  End soils
        {
            title: m.labels.lblMountains,
            palette: m.lv.mountains.vis.palette,
            names: m.lv.mountains.names,
            image: a.imgMountains.unmask(),
            categories: [1, 2, 3, 4, 5, 6, 7],
        },
        {
            title: m.labels.lblKeyBiodiversityAreas,
            palette: ['grey', 'orange'],
            names: [m.labels.lblNonKba, m.labels.lblKba],
            image: a.imgKBABin,
            categories: [0, 1],
        },
        {
            title: m.labels.lblProtectedAreas,
            palette: ['grey', 'green'],
            names: [m.labels.lblNonProtectedAreas, m.labels.lblProtectedAreas],
            image: a.imgPABin,
            categories: [0, 1],
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
        [c.lp.info.lblApp,
        c.lp.info.lblAppDev,
        c.lp.info.lblEmail1,
        c.lp.info.lblEmail2,
        c.lp.info.lblEmail3,
        c.lp.info.lblEmail4,
        ]);
    c.lp.divs = {};
    c.lp.divs.div1 = ui.Panel();
    // Left Panel - Language section
    c.lp.lan = {};
    c.lp.lan.selLanguage = ui.Select({
        items: ['English', 'Spanish'],
        value: lan
    });
    // AOI Mask
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
        items: ['ESA'],
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
    c.lp.tr.pnlContainer.add(c.lp.tr.pnlSource);
    c.lp.tr.pnlContainer.add(c.lp.tr.pnlFromYear);
    c.lp.tr.pnlContainer.add(c.lp.tr.pnlLayers);
    // Left Panel - Soil Layers section
    c.lp.soil = {};
    c.lp.soil.btnLayerSoilGroup = ui.Button(m.labels.lblLayerSoilGroup);
    c.lp.soil.lblLayerSoilGroupRef = ui.Label(m.labels.lblLayerSoilGroupRef).setUrl('')
    c.lp.soil.pnlContainer = ui.Panel();
    m.SoilGroupLayerEntries.filter(function (e) {
        return e.group === 'RASTER';
    }).forEach(function (layer) {
        c.lp.soil.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
    m.SoilGroupLayerEntries.filter(function (e) {
        return e.group === 'FEATURES';
    }).forEach(function (layer) {
        c.lp.soil.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
    // Left Panel - SDG 15.3.1 section
    c.lp.sdg = {};
    c.lp.sdg.btnSDG = ui.Button(m.labels.lblSDG1531Title);
    c.lp.sdg.lblGlobalAppSDG = ui.Label(m.labels.lblGlobalAppSDG).setUrl('https://maps.tools4ldn.org/')
    c.lp.sdg.pnlContainer = ui.Panel();
    m.SDGLayerEntries.forEach(function (layer) {
        c.lp.sdg.pnlContainer.add(mdlLegends.createLayerEntry(layer));
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
    // flyto panel
    c.lp.dt.flyTo = {};
    c.lp.dt.lblFlyTo = ui.Label(m.labels.lblFlyToText);
    c.lp.dt.txtLat = ui.Textbox(m.labels.lblLatitude, '');
    c.lp.dt.txtLon = ui.Textbox(m.labels.lblLongitude, '');
    c.lp.dt.btnFlyTo = ui.Button(m.labels.lblFlyTo);
    c.lp.dt.btnUserLocation = ui.Button(m.labels.lblUserLocation + '\u25BC');
    c.lp.dt.btnRemoveLocation = ui.Button(m.labels.lblRemoveLocation + ' \u2716');
    c.lp.dt.pnlFlyTo = ui.Panel({
        layout: ui.Panel.Layout.flow('vertical'),
        widgets: [ui.Panel({
            layout: ui.Panel.Layout.flow('horizontal'),
            widgets: [c.lp.dt.txtLat, c.lp.dt.txtLon, c.lp.dt.btnFlyTo]
        }),
        ui.Panel({
            layout: ui.Panel.Layout.flow('horizontal'),
            widgets: [c.lp.dt.btnUserLocation, c.lp.dt.btnRemoveLocation]
        })]
    });
    // Asset id
    c.lp.dt.customAsset = {};
    c.lp.dt.customAsset.lblEnterAssetId = ui.Label(m.labels.lblEnterAssetId);
    c.lp.dt.customAsset.txtAssetId = ui.Textbox(m.labels.lblAssetId, '');
    c.lp.dt.customAsset.btnLoadAsset = ui.Button(m.labels.lblLoadAsset);
    c.lp.dt.customAsset.pnlCustomAsset = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        widgets: [c.lp.dt.customAsset.txtAssetId, c.lp.dt.customAsset.btnLoadAsset]
    });
    c.lp.dt.pnlContainer = ui.Panel({
        widgets: [
            c.lp.dt.lblCustomLayer,
            c.lp.dt.pnlFileName,
            c.lp.dt.lblDrawFeatures,
            c.lp.dt.lblGetStatistics,
            c.lp.dt.btnZonalStats,
            c.lp.dt.lblDownloadLinks,
            c.lp.dt.pnlLinks,
            c.lp.dt.customAsset.lblEnterAssetId,
            c.lp.dt.customAsset.pnlCustomAsset,
            c.lp.dt.lblFlyTo,
            c.lp.dt.pnlFlyTo,
        ]
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
                    + formatNumber(m.maxAreaHa, 2) + 'ha. '
                    + m.labels.lblSelectedAreaHa
                    + ' ' + formatNumber(area, 2) + 'ha.');
                c.rp.pnlMessages.style().set({ shown: true });
                //return;
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
    c.lp.dt.customAsset.btnLoadAsset.onClick(function () {
        var assetId = c.lp.dt.customAsset.txtAssetId.getValue().trim();
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
                else {
                    /*if (size > 1) {
                        c.rp.pnlMessages.style().set({ shown: true });
                        c.rp.lblMessages.setValue(m.labels.lblMoreThanOneFeature);
                    }*/
                    handleCustomFeatureCollection(ftcCustom.first().geometry(), assetId, m.labels.lblCustomAsset);
                }
            });
        }
        catch (err) {
            c.rp.pnlMessages.style().set({ shown: true });
            c.rp.lblMessages.setValue(m.labels.lblInvalidAssetId + ': ' + err);
        }
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
    c.cp.btnSelectContainer2 = ui.Button(m.labels.lblSelectContainer2);
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
    c.rp.stats.ge.pnlEntryProtectedArea = ui.Panel({
        widgets: [ui.Label(m.labels.lblProtectedArea + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryKeyBiodiversityArea = ui.Panel({
        widgets: [ui.Label(m.labels.lblKeyBiodiversityArea + ': '), ui.Label(m.labels.lblLoading)],
    });
    c.rp.stats.ge.pnlEntryMountainCoverage = ui.Panel({
        widgets: [ui.Label(m.labels.lblMountainCoverage + ': '), ui.Label(m.labels.lblLoading)],
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
    c.rp.charts.lblSDGChartsTitle = ui.Label(m.labels.lblSDG1531);
    c.rp.charts.pnlSDGCharts.add(c.rp.charts.lblSDGChartsTitle);
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
    //c.lp.pnlControl.add(c.lp.info.tmbLogo);
    c.lp.pnlControl.add(c.lp.info.lblIntro);
    c.lp.pnlControl.add(c.lp.info.pnlContainer);
    c.lp.pnlControl.add(c.lp.info.btnClose);
    //c.lp.pnlControl.add(c.lp.divs.div1);
    c.lp.pnlControl.add(c.lp.lan.selLanguage);
    c.lp.pnlControl.add(c.lp.levels.lblChoose);
    c.lp.pnlControl.add(c.lp.levels.selLevel1);
    c.lp.pnlControl.add(c.lp.levels.selLevel2);
    c.lp.pnlControl.add(c.lp.mask.chkMaskAOI);
    c.lp.pnlControl.add(c.lp.mask.pnlSlider);
    c.lp.pnlControl.add(c.lp.boundaries.lblChoose);
    c.lp.pnlControl.add(c.lp.boundaries.selBoundariesLayer);
    c.lp.pnlControl.add(c.lp.gl.lblLayersLegends);
    c.lp.pnlControl.add(c.lp.gl.pnlContainer);
    c.lp.pnlControl.add(c.lp.sdg.btnSDG);
    c.lp.pnlControl.add(c.lp.sdg.pnlContainer);
    c.lp.pnlControl.add(c.lp.sdg.lblGlobalAppSDG);
    c.lp.pnlControl.add(c.lp.mc.btnMcAnalysis);
    c.lp.pnlControl.add(c.lp.mc.pnlContainer);
    c.lp.pnlControl.add(c.lp.tr.btnTransitions);
    c.lp.pnlControl.add(c.lp.tr.pnlContainer);
    c.lp.pnlControl.add(c.lp.soil.btnLayerSoilGroup);
    c.lp.pnlControl.add(c.lp.soil.pnlContainer);
    c.lp.pnlControl.add(c.lp.op.pnlSlider);
    c.lp.pnlControl.add(c.lp.dt.btnDrawingTools);
    c.lp.pnlControl.add(c.lp.dt.pnlContainer);
    c.lp.pnlControl.add(c.lp.lblDisclaimer);
    // Map panel 
    c.cp.pnlMap.add(c.cp.map);
    c.cp.map.add(c.cp.pnlFrontLayerLegend);
    c.cp.map.add(c.cp.drt);
    c.cp.map.add(c.cp.btnSelectContainer);
    c.cp.map.add(c.cp.btnSelectContainer2);
    // Output panel 
    c.rp.pnlOutput.add(c.rp.pnlMessages);
    c.rp.pnlOutput.add(c.rp.stats.pnlStats);
    c.rp.pnlOutput.add(c.rp.charts.pnlGeneralCharts);
    c.rp.pnlOutput.add(c.rp.charts.pnlSDGCharts);
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
    c.lp.dt.lblFlyTo.style().set(s.style1);
    c.lp.dt.txtLat.style().set({ width: '25%', margin: '5px 5px' });
    c.lp.dt.txtLon.style().set({ width: '25%', margin: '5px 5px' });
    c.lp.dt.btnFlyTo.style().set({ width: '30%', margin: '5px 5px' });
    c.lp.dt.btnUserLocation.style().set({ width: '40%', margin: '5px 5px' });
    c.lp.dt.btnRemoveLocation.style().set({ width: '40%', margin: '5px 5px' });
    c.lp.levels.lblChoose.style().set(s.style1);
    c.lp.levels.selLevel1.style().set({ width: "90%", });
    c.lp.levels.selLevel2.style().set({ width: "90%", });
    c.lp.mask.chkMaskAOI.style().set(s.style1);
    c.lp.mask.chkMaskAOI.style().set({ margin: '5px 10px' });
    c.lp.boundaries.lblChoose.style().set(s.style1);
    c.lp.boundaries.selBoundariesLayer.style().set({ width: '70%' });
    c.lp.gl.lblLayersLegends.style().set({ fontSize: '12px', fontWeight: 'bold' });
    c.lp.gl.pnlContainer.style().set({ margin: '0px 5px', shown: true });
    s.sectionButton = { width: '90%', fontSize: '6px', fontWeight: 'normal' };
    s.sectionPanel = { margin: '5px 5px', shown: false, width: '90%' };
    s.paramPanel = { width: '90%', fontSize: '12px', margin: '0px', padding: '0px' };
    // SDG Section
    c.lp.sdg.btnSDG.style().set(s.sectionButton);
    c.lp.sdg.btnSDG.style().set({ color: '#000000' });
    c.lp.sdg.pnlContainer.style().set(s.sectionPanel);
    c.lp.sdg.pnlContainer.style().set({ border: '3px solid #000000' });
    c.lp.sdg.lblGlobalAppSDG.style().set({ fontSize: '12px' });
    c.lp.sdg.lblGlobalAppSDG.style().set({ color: 'blue' });
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
    // Layer Soil Layers Section
    c.lp.soil.btnLayerSoilGroup.style().set(s.sectionButton);
    c.lp.soil.btnLayerSoilGroup.style().set({ color: '#640064' });
    c.lp.soil.pnlContainer.style().set(s.sectionPanel);
    c.lp.soil.pnlContainer.style().set({ border: '3px solid #640064' });
    c.lp.soil.lblLayerSoilGroupRef.style().set({ fontSize: '12px' });
    // Drawing tools Section
    c.lp.dt.btnDrawingTools.style().set(s.sectionButton);
    c.lp.dt.pnlContainer.style().set(s.sectionPanel);
    c.lp.dt.pnlContainer.style().set({ border: '3px solid black' });
    c.lp.dt.lblCustomLayer.style().set({ fontSize: '12px' });
    c.lp.dt.pnlFileName.style().set({ margin: '0px 5px' });
    c.lp.dt.txbLayerName.style().set({ width: '60%', fontSize: '12px' });
    c.lp.dt.lblDrawFeatures.style().set({ fontSize: '12px' });
    c.lp.dt.lblGetStatistics.style().set({ fontSize: '12px' });
    c.lp.dt.lblJson.style().set({ fontSize: '12px' });
    c.lp.dt.lblKml.style().set({ fontSize: '12px' });
    c.lp.dt.lblDownloadLinks.style().set({ fontSize: '12px' });
    c.lp.dt.customAsset.lblEnterAssetId.style().set({ fontSize: '12px' });
    c.lp.dt.customAsset.txtAssetId.style().set({ width: '60%', fontSize: '12px' });
    c.lp.dt.lblLinks.style().set({ fontSize: '12px' });
    c.lp.op.lblOpacity.style().set({ fontSize: '12px' });
    c.lp.lblDisclaimer.style().set({ fontSize: '10px', margin: '2px 10px' });
    s.styleStatsValue = { margin: '4px 0px', fontSize: '12px', whiteSpace: 'pre' };
    s.styleStatsHeader = { margin: '4px 0px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' };
    s.styleInfoTitle = { fontSize: '16px', fontWeight: 'bold', margin: '4px 0px' };
    s.styelChartPanelTitle = { fontSize: '16px', fontWeight: 'bold', margin: '4px 15px' };
    // --------- CENTER PANEL
    c.cp.pnlFrontLayerLegend.style().set({ position: 'bottom-left' });
    c.cp.pnlCombinedLegend.style().set({ shown: false });
    c.cp.btnSelectContainer.style().set({ position: "bottom-right" });
    c.cp.btnSelectContainer2.style().set({ position: "bottom-right" });
    c.cp.map.style().set('cursor', 'crosshair');
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
        c.rp.charts.pnlGeneralCharts.style().set({
            shown: (c.lp.tr.pnlContainer.style().get('shown') ||
                c.lp.mc.pnlContainer.style().get('shown') ||
                c.lp.sdg.pnlContainer.style().get('shown') ? false : true)
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
        // If layer Soil layers panel is open check if some layer is selected
        if (c.lp.soil.pnlContainer.style().get('shown')) {
            for (var i = c.lp.soil.pnlContainer.widgets().length() - 1; i >= 0; i--) {
                chk = c.lp.soil.pnlContainer.widgets().get(i).widgets().get(0);
                if (chk.getValue()) {
                    c.cp.pnlFrontLayerLegend.widgets().set(0, m.SoilGroupLayerEntries[i].legend);
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
    c.lp.lan.selLanguage.onChange(function (lan) { initApp(lan); });
    c.lp.dt.btnFlyTo.onClick(function () {
        try {
            var coords = [parseFloat(c.lp.dt.txtLon.getValue()), parseFloat(c.lp.dt.txtLat.getValue())];
            var gmyPoint = ee.Geometry.Point(coords);
            c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblFlyTo), ui.Map.Layer(ee.FeatureCollection(gmyPoint).style({ color: 'red', pointShape: 'star5', pointSize: 6 })));
            c.cp.map.centerObject(gmyPoint, 13);
        } catch (error) {
            c.rp.lblMessages.setValue(error);
        }
    });
    c.lp.dt.btnUserLocation.onClick(function () {
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
    c.lp.dt.btnRemoveLocation.onClick(function () {
        showLayer(m.labels.lblFlyTo, false);
    });
    c.lp.info.btnClose.onClick(function () {
        c.lp.info.pnlContainer.style().set({ shown: !c.lp.info.pnlContainer.style().get('shown') });
        c.lp.info.btnClose.setLabel(c.lp.info.pnlContainer.style().get('shown') ? m.labels.lblCloseInfoPanel : m.labels.lblOpenInfoPanel);
    });
    // Stack layers in map
    // SDG layers
    m.SDGLayerEntries.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
    });
    // Transition layers
    m.transitionsEntries.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.label, layer.visible);
    });
    // Layers  Soil group layers
    m.SoilGroupLayerEntries.forEach(function (layer) {
        if (layer.group === 'FEATURES') {
            c.cp.map.addLayer(layer.asset.style(layer.style), {}, layer.name, layer.visible);
        }
        else {
            c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
        }
    });
    // General layers
    m.layerEntries.forEach(function (layer) {
        if (layer.group === 'FEATURES') {
            c.cp.map.addLayer(layer.asset.style(layer.style), {}, layer.name, layer.visible);
        }
        else {
            c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
        }
    });
    // Multicriteria layer - this layer is dinamically updated 
    c.cp.map.addLayer(a.imgCustom, m.lv.custom.vis, m.labels.lblHotspots, false);
    // User Localization - this layer is dinamically updated 
    c.cp.map.addLayer(ee.Geometry.Point([0, 0]), { color: '#0099ff' }, m.labels.lblFlyTo, false);
    // Selected AOI
    c.cp.map.addLayer(ee.Geometry.Point([0, 0]), {}, m.labels.lblSelectedAOI, false);
    // test_aoi
    c.cp.map.addLayer(ee.Image(0), { palette: ['white'] }, m.labels.lblAOIMask, false);
    // Add on check/uncheck functionality to general layers entries
    c.lp.gl.pnlContainer.widgets().forEach(function (w) {
        var chk = w.widgets().get(0);
        chk.onChange(function (checked) {
            showLayer(chk.getLabel(), checked);
            showFrontLayerLegend();
        });
    });
    // Add on check/uncheck functionality to general layers entries
    c.lp.sdg.pnlContainer.widgets().forEach(function (w) {
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
    // Add on check/uncheck functionality to Soil layers entries
    c.lp.soil.pnlContainer.widgets().forEach(function (w) {
        var chk = w.widgets().get(0);
        chk.onChange(function (checked) {
            showLayer(chk.getLabel(), checked);
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
        handleEvaluating(true);
        Object.keys(c.rp.stats.ge).forEach(function (key) {
            c.rp.stats.ge[key].widgets().get(1).setValue(m.labels.lblLoading);
        });
        var f;
        if (m.precalculated) { // aoi from precalculated assets
            var selectedArea = m.ftcAoi.first();
            // Get area value in precalculated row, for drawn-feature is already calculated
            m.haAoi = selectedArea.get('area_ha').getInfo();
            m.bestEffort = m.haAoi > m.maxAreaHa ? true : false;
            var statslCols = [
                'name',
                'lpd_0',
                'lpd_1',
                'lpd_2',
                'lpd_3',
                'lpd_4',
                'lpd_5',
                'pa_bin_1',
                'kba_bin_1',
                'mountain_bin_1',
                'soc_sum',
                'soc_mean',
                'npp_sum',
                'kba_PA', 'kba_noPA'
            ];
            f = ee.Feature(null).copyProperties(selectedArea, statslCols);
        }
        else {
            // Calculate all statistics required for info panel
            var ftcSampleStats = mdlPrecalculation.precalculate(
                m.ftcAoi,
                m.bestEffort,
                ['p_lpd',
                    'p_soc_sum',
                    'p_soc_mean',
                    'p_pa_bin',
                    'p_kba_bin',
                    'p_mountain_bin',
                    'p_npp_sum',
                    'kba_PA', 'kba_noPA'
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
                aux = m.haAoi > 0 ? (ef.properties.pa_bin_1 * 100 / m.haAoi) : 0;
                c.rp.stats.ge.pnlEntryProtectedArea.widgets().get(1).setValue(formatNumber(ef.properties.pa_bin_1, 2) + " ha. (" + aux.toFixed(2) + "%)");
                aux = m.haAoi > 0 ? (ef.properties.kba_bin_1 * 100 / m.haAoi) : 0;
                c.rp.stats.ge.pnlEntryKeyBiodiversityArea.widgets().get(1).setValue(formatNumber(ef.properties.kba_bin_1, 2) + " ha. (" + aux.toFixed(2) + "%)");
                aux = m.haAoi > 0 ? (ef.properties.mountain_bin_1 * 100 / m.haAoi) : 0;
                c.rp.stats.ge.pnlEntryMountainCoverage.widgets().get(1).setValue(formatNumber(ef.properties.mountain_bin_1, 2) + " ha. (" + aux.toFixed(2) + "%)");
                c.rp.stats.ge.pnlEntrySocSum.widgets().get(1).setValue(formatNumber(ef.properties.soc_sum, 2) + ' t');
                c.rp.stats.ge.pnlEntrySocMean.widgets().get(1).setValue(formatNumber(ef.properties.soc_mean, 2) + ' t/ha');
                c.rp.stats.ge.pnlEntryNPPTotal.widgets().get(1).setValue(formatNumber(ef.properties.npp_sum / 1000, 2) + '  tC');
            }
            else {
                c.rp.lblMessages.setValue(error);
            }
        });
        try {
            c.cp.map.centerObject(m.ftcAoi);
            c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblSelectedAOI), ui.Map.Layer(m.ftcAoi.style(m.lv.highlight.vis), {}, m.labels.lblSelectedAOI));
            var i = m.namesLayers.indexOf(m.labels.lblAOIMask);
            var e = c.cp.map.layers().get(i);
            e.setEeObject(ee.Image(1).updateMask(ee.Image(1).clip(m.ftcAoi).unmask().eq(0)));
            e.setVisParams({ palette: ['white'] });
        } catch (error) {
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
    c.cp.map.onClick(function (coords, map) {
        c.lp.dt.txtLon.setValue(coords.lon);
        c.lp.dt.txtLat.setValue(coords.lat);
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
                && chb.getLabel() !== m.labels.lblBasins
                && chb.getLabel() !== m.labels.lblSubbasins) {
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
    /** Shows/hides layers checked in Soil panel*/
    var handleSoilGroupLayerVis = function (show) {
        for (var i = c.lp.soil.pnlContainer.widgets().length() - 1; i >= 0; i--) {
            var chk = c.lp.soil.pnlContainer.widgets().get(i).widgets().get(0);
            if (chk.getValue()) {
                showLayer(m.SoilGroupLayerEntries[i].label, show);
            }
        }
    };
    /** Shows/hides layers checked in SDG panel*/
    var handleSDGLayersVis = function (show) {
        for (var i = c.lp.sdg.pnlContainer.widgets().length() - 1; i >= 0; i--) {
            var chk = c.lp.sdg.pnlContainer.widgets().get(i).widgets().get(0);
            if (chk.getValue()) {
                showLayer(m.layerSDGEntries[i].label, show);
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
        c.lp.sdg.pnlContainer.style().set({ shown: false });
        c.lp.soil.pnlContainer.style().set({ shown: false });
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
        c.lp.sdg.pnlContainer.style().set({ shown: false });
        c.lp.soil.pnlContainer.style().set({ shown: false });
        showLayer(m.labels.lblHotspots, false);
        c.cp.pnlCombinedLegend.style().set({
            shown: false
        });
        handleSDGLayersVis(false);
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
        c.lp.tr.pnlContainer.style().set({ shown: false });
        c.lp.mc.pnlContainer.style().set({ shown: false });
        showFrontLayerLegend();
        handleChartsPanelsShown();
    });
    // Soil
    c.lp.soil.btnLayerSoilGroup.onClick(function () {
        c.lp.op.sldOpacity.setValue(1);
        // handle panel
        c.lp.soil.pnlContainer.style().set({ shown: !c.lp.soil.pnlContainer.style().get('shown') });
        // Hide other
        showLayer(m.labels.lblHotspots, false);
        if (c.cp.pnlCombinedLegend !== null) {
            c.cp.pnlCombinedLegend.style().set({
                shown: false
            });
        }
        handleTransitionsLayersVis(false);
        c.lp.tr.pnlContainer.style().set({ shown: false });
        c.lp.mc.pnlContainer.style().set({ shown: false });
        c.lp.sdg.pnlContainer.style().set({ shown: false });
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
        var imgFrom = m.selectedSource.imgLCAll.select('y' + year).clip(ftc0);
        var lyrFrom = ui.Map.Layer(imgFrom.visualize(m.lv.lc.vis), {}, m.labels.lblFromLC, c.lp.tr.pnlLayers.widgets().get(0).widgets().get(0).getValue());
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblFromLC), lyrFrom);
        var imgFinal = m.selectedSource.imgLCAll.select('y' + m.selectedSource.lastYear).clip(ftc0);
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
        c.lp.tr.selLCFromYears.unlisten();
        c.lp.tr.selLCFromYears.items().reset(m.selectedSource.initialYears);
        c.lp.tr.selLCFromYears.setValue(m.selectedSource.initialYears[0]); // by default select first year in inital years list
        resetTransitionsLayers(m.selectedSource.initialYears[0]);
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
    /** Selects Country or Region */
    c.cp.btnSelectContainer.onClick(function () {
        resetLevelsSelects();
        m.levelAoi = m.labels.lblSelectContainer;
        m.ftcAoi = ftc0;
        m.precalculated = true;
        c.cp.map.centerObject(m.ftcAoi);
        showInfoSelectedAoi();
        clearCombinedLayerAndLegend();
    });
    /** Selects Country or Region */
    c.cp.btnSelectContainer2.onClick(function () {
        resetLevelsSelects();
        m.levelAoi = m.labels.lblSelectContainer2;
        m.ftcAoi = ftcWArea;
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
        c.cp.btnSelectContainer2.setDisabled(disable);
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
        handleCustomFeatureCollection(m.gmySelected, m.labels.lblDrawnFeature + m.selectedLayerName, m.labels.lblDrawingTools);
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
                chartPanel.widgets().get(0).setValue(m.labels.lblError + ':' + error);
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
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(
            m.ftcAoi,
            m.bestEffort,
            ['p_lc', 'p_lpd', 'p_hansen', 'p_ndvi_annual', 'p_x2', 'pro_kba']);
        //  LAND COVER PIE CHART
        var lstFeatLC = mdlPrecalculation.namesBaseLCColumns.map(function (pName, i) {
            var lstValues = ee.List([m.lv.lcNational.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLC = ee.List([
            [
                { label: 'LC', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsLC = {
            title: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLC.name + ') ' + mdlPrecalculation.baseLC.year,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.lcNational.vis.palette,
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
            pieHole: 0.4
        };
        createChart(lstHeaderLPD.cat(ee.FeatureCollection(lstFeatLPD).aggregate_array('row')), optionsLPD, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        //  KBA PROTECTED      
        var lstFeatKBA = ['kba_PA', 'kba_noPA'].map(function (pName, i) {
            var lstValues = ee.List([[m.labels.lblKBAProtected, m.labels.lblKBANonProtected][i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderKBA = ee.List([
            [
                { label: 'KBA', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsKBA = {
            title: m.labels.lblProtectionKBA,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: ['green', 'red'],
            pieHole: 0.4
        };
        createChart(lstHeaderKBA.cat(ee.FeatureCollection(lstFeatKBA).aggregate_array('row')), optionsKBA, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        // SDG Trends Earth
        /*var catsNamesTE = [m.labels.lblSDG1531BasTE, m.labels.lblSDG1531RepTE, m.labels.lblSDG1531ProTE];
        var catsTE = ['SDG_Bas', 'SDG_Rep', 'SDG_Pro'];
        var lstFeatCombinedTE = catsTE.map(function (cat, i) {
            var v0 = ftc.first().get(cat + '_TE_0');
            var v1 = ftc.first().get(cat + '_TE_1');
            var v2 = ftc.first().get(cat + '_TE_2');
            var v3 = ftc.first().get(cat + '_TE_3');
            var lstValues = ee.List([catsNamesTE[i], v0, v1, v2, v3]);
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
            isStacked: 'relative',
            colors: m.lv.sdg1531.vis.palette,
        };
        createChart(lstHeaderCombinedTE.cat(ee.FeatureCollection(lstFeatCombinedTE).aggregate_array('row')), optionsCombinedTE, 'BarChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        // SDG JRC
        var catsNamesJRC = [m.labels.lblSDG1531BasDef, m.labels.lblSDG1531RepDef, m.labels.lblSDG1531ProDef];
        var lstFeatCombinedJRC = catsTE.map(function (cat, i) {
            var v0 = ftc.first().get(cat + '_Def_0');
            var v1 = ftc.first().get(cat + '_Def_1');
            var v2 = ftc.first().get(cat + '_Def_2');
            var v3 = ftc.first().get(cat + '_Def_3');
            var lstValues = ee.List([catsNamesJRC[i], v0, v1, v2, v3]);
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
            isStacked: 'relative',
            colors: m.lv.sdg1531.vis.palette,
        };
        createChart(lstHeaderCombinedJRC.cat(ee.FeatureCollection(lstFeatCombinedJRC).aggregate_array('row')), optionsCombinedJRC, 'BarChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        */
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
            hAxis: { title: m.labels.lblYear, format: '####', gridlines: { count: 7 } },
        };
        createChart(lstHeaderNdviByYear.cat(ee.FeatureCollection(lstNdviByYear).aggregate_array('row')), optionsNdviByYear, 'LineChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        // NDVI MENSUAL, for user-drawn features     
        if (!m.precalculated && m.haAoi < 100000) {
            var chtNdviByMonthYear = ui.Chart.image.series(imcNDVIByMonthYear, ftc, ee.Reducer.mean(), 250);
            chtNdviByMonthYear.setOptions({
                title: m.labels.lblMonthlyNDVI,
                vAxis: { title: 'NDVI x 10000' },
                hAxis: { title: m.labels.lblCalendarYear, format: 'yyyy', gridlines: { count: 7 } },
            });
            createChartPanel(c.rp.charts.pnlGeneralCharts).add(chtNdviByMonthYear);
        }
    };
// Set Up SDG Charts
    var setUpSDGCharts = function () {
        c.rp.charts.pnlSDGCharts.clear();
        c.rp.charts.pnlSDGCharts.add(c.rp.charts.lblSDGChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi,
            m.bestEffort,
            ['p_SDG_Baseline_JRC', 'p_SDG_Report_JRC', 'p_SDG_Status_JRC', 'p_SDG_Comparison_JRC',
                'p_SDG_Baseline_FAO_WOCAT', 'p_SDG_Report_FAO_WOCAT', 'p_SDG_Status_FAO_WOCAT', 'p_SDG_Comparison_FAO_WOCAT',
                'p_SDG_Baseline_TE', 'p_SDG_Report_TE', 'p_SDG_Status_TE', 'p_SDG_Comparison_FAO_TE'
            ]);
        var columnsPrefix = ['SDG_Bas', 'SDG_Rep', 'SDG_Sta', 'SDG_Com'];
        var layerTypes = [m.labels.lblBaseline, m.labels.lblReport, m.labels.lblStatus, m.labels.lblComparison];
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
        // SDG FAO BASIC
        var lstFeatCombinedFAOSimp = columnsPrefix.map(function (cat, i) {
            var v0 = ftc.first().get(cat + '_FAO_Simp_0');
            var v1 = ftc.first().get(cat + '_FAO_Simp_1');
            var v2 = ftc.first().get(cat + '_FAO_Simp_2');
            var v3 = ftc.first().get(cat + '_FAO_Simp_3');
            var lstValues = ee.List([layerTypes[i], v0, v1, v2, v3]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderCombinedFAOSimp = ee.List([
            [
                { label: 'FAO Basic', role: 'domain', type: 'string' },
                { label: m.lv.sdg1531.names[0], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[1], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[2], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[3], role: 'data', type: 'number' },
            ],
        ]);
        var optionsCombinedFAOSimp = {
            title: m.labels.lblSDG1531FAOSimp,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'percent',
            colors: m.lv.sdg1531.vis.palette,
        };
        createChart(lstHeaderCombinedFAOSimp.cat(ee.FeatureCollection(lstFeatCombinedFAOSimp).aggregate_array('row')), optionsCombinedFAOSimp, 'BarChart', createChartPanel(c.rp.charts.pnlSDGCharts));
    };
    /** Setup combined charts: LPDxLC, SOCxLPD, SOCxLC, SOCxLPDxLC, LCxLPD table*/
    var setupMcCharts = function () {
        c.rp.charts.pnlMcCharts.clear();
        c.rp.charts.pnlMcCharts.add(c.rp.charts.lblMcChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(
            m.ftcAoi,
            m.bestEffort,
            ['p_x2', 'p_soc_lpd', 'p_soc_lc', 'p_soc_lc_lpd']);
        var catsLCNoWater = [1, 2, 3, 4, 5, 6, 7];
        var catsLPD = [1, 2, 3, 4, 5];
        var lstFeatCombinedLC = catsLCNoWater.map(function (i) {
            var v1 = ftc.first().get(i + '_1');
            var v2 = ftc.first().get(i + '_2');
            var v3 = ftc.first().get(i + '_3');
            var v4 = ftc.first().get(i + '_4');
            var v5 = ftc.first().get(i + '_5');
            var lstValues = ee.List([m.lv.lcNational.names[i - 1], v1, v2, v3, v4, v5]);
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
        createChart(lstHeaderC1.cat(ee.FeatureCollection(lstFeatCombinedLC).aggregate_array('row')), optionsC1Rel, 'BarChart', createChartPanel(c.rp.charts.pnlMcCharts));
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
            var lstValues = ee.List([m.lv.lcNational.names[i - 1], mean, m.lv.lcNational.vis.palette[i - 1]]);
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
            var lstValues = ee.List([m.lv.lcNational.names[i - 1], v1, v2, v3, v4, v5, mean]);
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
            var lstValues = ee.List([m.lv.lcNational.names[i - 1]]).cat(values);
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
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(
            m.ftcAoi,
            m.bestEffort,
            ['p_lc_' + fromYear + '_' + m.selectedSource.initials,
            'p_lc_' + m.selectedSource.lastYear + '_' + m.selectedSource.initials,
            'p_lc_trans_' + m.selectedSource.initials + '_' + fromYear + '_' + m.selectedSource.lastYear]);
        // chartTrans1 Comparison column chart LC
        var lstFeatLCCombo = mdlPrecalculation.namesTransLCColumns.map(function (pName, i) {
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
        var lstFeatLCNetChange = mdlPrecalculation.namesTransLCColumns.map(function (pName, i) {
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
        c.cp.map.layers().set(m.namesLayers.indexOf(m.labels.lblHotspots), ui.Map.Layer(image, m.lv.custom.vis, m.labels.lblHotspots, showLyrCombined));
    };
    /** Creates a new image layer and calculate area considering categories selected in multicriteria panel*/
    var calculateMultiCriteria = function () {
        c.rp.lblMessages.setValue(m.labels.lblProcessingArea);
        c.rp.pnlMessages.style().set({ shown: true });
        handleEvaluating(true);
        //clearCombinedLayerAndLegend();
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
            var imgFiltered = image.clip(m.ftcAoi).eq(parseInt(categories[0]));
            for (var i = 1; i < categories.length; i++) {
                imgFiltered = imgFiltered.or(image.eq(parseInt(categories[i])));
            }
            return imgFiltered.selfMask();
        };
        // Foreach section panel in hotspots panel check which categories are selected
        var selectedPerSection = [];
        var filteredImages = [];
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
                if (selectedCatNumbers.length > 0) {
                    // add filtered image to array 
                    filteredImages.push(getFilteredImage(m.mcEntries[panelIndex].image, selectedCatNumbers));
                }
            }
        });
        //print('filteredImages: ', filteredImages);
        var imgProduct = ee.Image(1).clip(m.ftcAoi);
        filteredImages.forEach(function (f) {
            imgProduct = imgProduct.multiply(f);
        });
        a.imgCustom = imgProduct.clip(m.ftcAoi);
        // Calculate only selected categories
        var imgCombinedCatAreaAdv = a.imgCustom.eq(1)
            .rename('area')
            .multiply(ee.Image.pixelArea()).divide(10000);
        var be = m.levelAoi === m.labels.lblSelectContainer ? true : false;
        var statsAreaAdv = imgCombinedCatAreaAdv.reduceRegion({
            reducer: ee.Reducer.sum(),
            geometry: m.ftcAoi.geometry().bounds(),
            scale: 100,
            bestEffort: be
        });
        totalArea = statsAreaAdv.get('area');
        statsAreaBE = imgCombinedCatAreaAdv.reduceRegion({
            reducer: ee.Reducer.sum(),
            geometry: m.ftcAoi.geometry().bounds(),
            scale: 100,
            bestEffort: true
        });
        // Compute area sum, when ready set title with total ha and try to create url to download image
        m.evalSet['multicriteria'] = true;
        totalArea.evaluate(function (t, error) {
            var legendTitle;
            if (error) {
                print('totalArea.evaluate error, trying best effort', error);
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
c
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
    c.cp.map.setControlVisibility(true, false, true, true, true, true, false);
}