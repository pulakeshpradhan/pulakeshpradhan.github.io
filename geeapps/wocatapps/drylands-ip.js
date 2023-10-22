var ftcPA = ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    ftcKBA = ee.FeatureCollection("users/projectgeffao/World/KBAsGlobal_2021_March_01_POL_Fix"),
    imgFireIndex = ee.Image("users/projectgeffao/World/FireRecurrenceIndex_MCD64_2001_2021_World"),
    imgPrecipitationTrend = ee.Image("users/projectgeffao/World/Climate/PrecipTrendIndex_World_2011_2021"),
    ftc0 = ee.FeatureCollection("users/wocatapps/Drylands/Precal/DRL_Precal_Level0_v3_noBE"),
    ftc01 = ee.FeatureCollection("users/wocatapps/Drylands/Precal/DRL_Precal_Level01_v3_NoBE"),
    ftc1 = ee.FeatureCollection("users/wocatapps/Drylands/Precal/DRL_Precal_Level1_v3_NoBE"),
    ftc2 = ee.FeatureCollection("users/wocatapps/Drylands/Precal/DRL_Precal_Level2_v3_NoBE"),
    ftcProSites = ee.FeatureCollection("users/wocatapps/Drylands/Precal/DRL_Precal_LevelProSites_v3_NoBE"),
    ftcSLM = ee.FeatureCollection("users/wocatapps/Drylands/SLM_Drylands");
// hay pocos valores sobre el final con valor 'technologies' en lugar de 'Technologies'
// se corrige aquí por si genera inconveniente
var slm1 = ftcSLM.filter(ee.Filter.notEquals('Type', 'technologies'));
var slm2 = ftcSLM.filter(ee.Filter.inList('Type', ['technologies'])).map(function (f) {return f.set('Type', 'Technologies')});
var ftcSLM = slm1.merge(slm2);
// ftc01 = Sub-regions styled
var paletteFtc01List = ee.List(['#db9003', '#08964f', '#49d7e1']);
var namesFtc01List = ee.List([1, 2, 3]);
var ftc01Styled = ftc01.map(function (f) {
    return f.set({ style: { color: paletteFtc01List.get(namesFtc01List.indexOf(f.get("REG_CODE"))), fillColor: '00000000', width: 5 } });
});
var ftcLinks = ee.FeatureCollection('users/wocatapps/Drylands/LinksPaises2');
// areas of importance for conservation
var imgAOIbioCarWatBiome = ee.Image("users/wocatapps/World/minshort_speciestargets_biome_id_carbon_water_esh10km_repruns10_ranked");
var imgForestConsensus = ee.Image("users/projectgeffao/World/allFnFsum_WORLD_NoNoData");
var imcWorldPop = ee.ImageCollection("WorldPop/GP/100m/pop_age_sex_cons_unadj");
var imgEcoFunTypes = ee.Image("users/wocatapps/World/EcosysteFuntionalTypes_MajorSum");
var imgAridityIndex = ee.Image("users/projectgeffao/World/AridityIndex_TerraClim_2001_2020_WADclass");
var imgLandForm = ee.Image("users/angelini_hernan/Drylands/DRL_SRTM_LandForms"); // --- Preguntar si hay que pasarlo a wocatapps user ---
var imgGlobio = ee.Image("users/wocatapps/World/Terrestrial_Biodiversity_Intactness_x10000_Globio");
var imgFLII = ee.Image("users/wocatapps/World/FLII_3cat");
var imgEcoPstatus = ee.Image("users/wocatapps/World/Ecorregion_Protected_Status");
var imgAOIbioCarWatBiome = ee.Image("users/wocatapps/World/minshort_speciestargets_biome_id_carbon_water_esh10km_repruns10_ranked");
var imgAOIbioCarWatBiomeCat = ee.Image("users/wocatapps/World/minshort_AOIbioCarWatBiome_5cat");
var imgGMTED2010 = ee.Image("USGS/GMTED2010");
var imgSOCCat = ee.Image("users/wocatapps/World/GSOC_v1_5_6cat_world");
var imgBiomes = ee.Image("users/wocatapps/World/Biomes100m_RasterBiomeUsedinApp");
var imgEcoregions = ee.Image("users/wocatapps/World/Ecorregion100m_RasterEcoUsedinApp");
/**
* App: DrylandsIP
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
var mdlPrecalculation = require('users/wocatapps/DrylandsIP:Apps/precalculation.js');
var mdlLocalization = require('users/wocatapps/DrylandsIP:Apps/localization.js');
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
var paletteSLMList = ee.List(['#db9003', '#08964f', '#49d7e1']);
var namesSLMList = ee.List(['Approaches', 'Technologies', 'UNCCD']);
a.ftcSLMStyled = ftcSLM.map(function (f) {
    return f.set({ style: { color: paletteSLMList.get(namesSLMList.indexOf(f.get("Type"))), pointSize: 5 } });
});
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
a.imgPrecipitationTrend = imgPrecipitationTrend.clip(ftc0);
a.imgEcoPstatus = imgEcoPstatus.clip(ftc0);
a.imgAOIbioCarWatBiome = imgAOIbioCarWatBiome.clip(ftc0);
a.imgForestConsensus = imgForestConsensus.clip(ftc0);
a.imgWorldPop = imcWorldPop.select('population').max().clip(ftc0);
a.imgGlobioMSA = imgGlobio.divide(10000).clip(ftc0);
// For multicriteria calculation
a.imgCustom = ee.Image(0).selfMask();
a.imgBiomes = imgBiomes.clip(ftc0);
a.imgEcoregions = imgEcoregions.clip(ftc0);
a.imgEcoFunTypes = imgEcoFunTypes.clip(ftc0);
a.imgAridityIndex = imgAridityIndex.clip(ftc0);
a.imgLandForm = imgLandForm.clip(ftc0);
a.imgFLII = imgFLII.clip(ftc0);
// Filter global assets
a.ftcKBA = ftcKBA.filter(ee.Filter.inList('ISO3', ['AGO', 'BWA', 'MWI', 'MOZ', 'NAM', 'TZA', 'ZWE', 'BFA', 'KEN', 'KAZ', 'MNG']));
a.ftcPA = ftcPA.filter(ee.Filter.inList('ISO3', ['AGO', 'BWA', 'MWI', 'MOZ', 'NAM', 'TZA', 'ZWE', 'BFA', 'KEN', 'KAZ', 'MNG']));
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
//Topography
var imgGMTED2010 = ee.Image("USGS/GMTED2010");
var utils = require('users/gena/packages:utils')
var elevation = imgGMTED2010.select('be75')//.reproject('EPSG:32721',null, 90)
var palette3 = ['#589c6e', '#4b8947', '#3e7620', '#33720c', '#33c05a', '#8bdb82', '#c4e297', '#d5e0a1', '#e7deab', '#f8dcb5', '#fddab4', '#fcd7ad', '#fad4a5', '#f8d29e', '#f6cf97', '#f4cc8f', '#f2c988', '#f0c780', '#eec479', '#ecc171', '#eabe6a', '#e8bc62', '#e6b95b', '#e4b653', '#e2b34c', '#e0b144', '#deae3d', '#dcab35', '#daa82e', '#d9a627', '#d1a425', '#caa224', '#c2a023', '#bb9e22', '#b39c20', '#ac9a1f', '#a7991e', '#a7971d', '#a6961c', '#a5941b', '#a5931a', '#a49119', '#a49019', '#a38e18', '#a38d17', '#a38b16', '#a28a15', '#a28814', '#a28613', '#a18512', '#a18311', '#a08110', '#a0800f', '#9f7e0e', '#9f7c0e', '#9f7b0d', '#9e790c', '#9e780b', '#9d760a', '#9d7509', '#9c7308', '#9c7207', '#9b7006', '#9b6e05', '#9a6d04', '#9a6b03', '#9a6902', '#996801', '#996600', '#9a640a', '#9b6218', '#9c6025', '#9e5e33', '#9f5c40', '#a05a4e', '#a25a5a', '#a55e5e', '#a76262', '#a96767', '#ac6b6b', '#ae7070', '#b17474', '#b27979', '#b37d7d', '#b48181', '#b48686', '#b58a8a', '#b68f8f', '#b79393', '#b89898', '#ba9c9c', '#bca0a0', '#bda5a5', '#bfa9a9', '#c1aeae', '#c2b2b2', '#c4b6b6', '#c6bbbb', '#c7bfbf', '#c9c3c3', '#cac8c8', '#cccccc', '#d0d0d0', '#d3d3d3', '#d7d7d7', '#dbdbdb', '#dfdfdf', '#e3e3e3', '#e7e7e7', '#ebebeb', '#efefef', '#f3f3f3', '#f7f7f7', '#fbfbfb']
var elevMin = 0
var elevMax = 6000
function visualize3(dem) {
    var demRGB = dem.visualize({ min: elevMin, max: elevMax, palette: palette3 })
    var weight = 0.8 // wegith of Hillshade vs RGB intensity (0 - flat, 1 - HS)
    var exaggeration = 3 // vertical exaggeration
    var azimuth = 270 // Sun azimuth
    var zenith = 40 // Sun elevation
    var brightness = 0 // 0 - default
    var contrast = 0.2 // 0 - default
    var saturation = 0.8
    var castShadows = true
    return utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, castShadows)
}
//
a.imgTerrain = visualize3(elevation).clip(ftc0);
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
    m.bestEffort = true;
    // Options: NATIONAL LC
    m.transitionsSources = mdlPrecalculation.transitionSourcesLC;
    // Selected transition source 
    m.selectedSource = m.transitionsSources[0];
    m.defaultFinalLCYear = m.selectedSource.lastYear;
    m.defaultInitialLCYear = m.selectedSource.initialYears[0];
    // More info & contact
    m.info = {
        referenceDocUrl: 'https://www.fao.org/in-action/dryland-sustainable-landscapes',
        contactEmail1: 'nicole.harari@unibe.ch',
        contactEmail2: 'ingrid.teich@fao.org',
        contactEmail3: 'marcelo.rezende@fao.org',
        contactEmail4: '',
        logoAssetId: 'users/projectgeffao/Logo_FAO',
        logoDimensions: '585x594',
    }
    // Feature collections options to click on the map to obtain precalculated statistics
    m.assetsClick = {};
    m.assetsClick[m.labels.lblNone] = null;
    m.assetsClick[m.labels.lblSubreg] = ftc01;
    m.assetsClick[m.labels.lblLevel1] = ftc1;
    m.assetsClick[m.labels.lblLevel2] = ftc2;
    m.assetsClick[m.labels.lblProjectSites] = ftcProSites;
    m.assetsClick[m.labels.lblSLM] = ftcSLM;
    // Feature collection to query on map click
    m.ftcClickOn = ftc1;
    // Layers Visualization
    m.lv = {
        lcBase: {
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
        sdg1531: {
            vis: {
                min: 0, max: 3, opacity: 1,
                palette: ['#000000', '#d63000', '#d6d5a9', '#1b931b'],
            },
            names: [
                m.labels.lblNoData,
                m.labels.lblSDGDegrading,
                m.labels.lblSDGStable,
                m.labels.lblSDGImproving,
            ]
        },
        subreg: {
            vis: {
                 palette: ['#db9003', '#08964f', '#49d7e1'],
                 },
                 names: ['Central Asia','Southern Africa','East/West Africa']
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
        borderLevel1: { vis: { color: 'black', fillColor: '00000000', width: 1.5 } },
        borderLevel2: { vis: { color: 'grey', fillColor: '00000000', width: 1 } },
        borderPS: { vis: { color: '#ff00ff', fillColor: '00000000', width: 1 } },
        borderProjectBasins: { vis: { color: '#e30052', fillColor: '00000000', width: 1.5 } },
        highlight: { vis: { color: '#b040d6', fillColor: '00000000' } },
        soc: { vis: { min: 0, max: 150, palette: ['#fcffac', '#a60000'] } },
        custom: { vis: { max: 1, min: 1, opacity: 1, palette: ['#FF00FF'] } },
        terrain: { vis: { min: 0, max: 3000, palette: ['#589c6e', '#4b8947', '#3e7620', '#33720c', '#33c05a', '#8bdb82', '#c4e297', '#d5e0a1', '#e7deab', '#f8dcb5', '#fddab4', '#fcd7ad', '#fad4a5', '#f8d29e', '#f6cf97', '#f4cc8f', '#f2c988', '#f0c780', '#eec479', '#ecc171', '#eabe6a', '#e8bc62', '#e6b95b', '#e4b653', '#e2b34c', '#e0b144', '#deae3d', '#dcab35', '#daa82e', '#d9a627', '#d1a425', '#caa224', '#c2a023', '#bb9e22', '#b39c20', '#ac9a1f', '#a7991e', '#a7971d', '#a6961c', '#a5941b', '#a5931a', '#a49119', '#a49019', '#a38e18', '#a38d17', '#a38b16', '#a28a15', '#a28814', '#a28613', '#a18512', '#a18311', '#a08110', '#a0800f', '#9f7e0e', '#9f7c0e', '#9f7b0d', '#9e790c', '#9e780b', '#9d760a', '#9d7509', '#9c7308', '#9c7207', '#9b7006', '#9b6e05', '#9a6d04', '#9a6b03', '#9a6902', '#996801', '#996600', '#9a640a', '#9b6218', '#9c6025', '#9e5e33', '#9f5c40', '#a05a4e', '#a25a5a', '#a55e5e', '#a76262', '#a96767', '#ac6b6b', '#ae7070', '#b17474', '#b27979', '#b37d7d', '#b48181', '#b48686', '#b58a8a', '#b68f8f', '#b79393', '#b89898', '#ba9c9c', '#bca0a0', '#bda5a5', '#bfa9a9', '#c1aeae', '#c2b2b2', '#c4b6b6', '#c6bbbb', '#c7bfbf', '#c9c3c3', '#cac8c8', '#cccccc', '#d0d0d0', '#d3d3d3', '#d7d7d7', '#dbdbdb', '#dfdfdf', '#e3e3e3', '#e7e7e7', '#ebebeb', '#efefef', '#f3f3f3', '#f7f7f7', '#fbfbfb'] } },
        pa: { vis: { color: 'green', width: 1 } },
        kba: { vis: { color: 'orange' } },
        fireIndex: { vis: { opacity: 1, min: 0, max: 0.5, palette: ['#fcfdbf', '#fc8761', '#b63679', '#50127b', '#000004'] } },
        precipTrend: { vis: { min: -3, max: 3, opacity: 1, palette: ["#d63000", "#ffffff", "#062fd6"] } },
        populationTrend: {
            vis: {
                opacity: 1, min: 1, max: 6,
                palette: ['#d7191c', '#f69053', '#c8df9a', '#b3d961', '#83b797', '#1a8a36'],
            },
            names: [
                m.labels.lblPopTrend1,
                m.labels.lblPopTrend2,
                m.labels.lblPopTrend3,
                m.labels.lblPopTrend4,
                m.labels.lblPopTrend5,
                m.labels.lblPopTrend6,
            ]
        },
        aridityIndex: {
            vis: {
                max: 6,
                min: 1,
                opacity: 1,
                palette: ['#f8f5b2', '#f8dc21', '#f8aa1f', '#d32f00', '#28ac36', '#abacab'],
            },
            names: [
                m.labels.lblHyperAridity,
                m.labels.lblArid,
                m.labels.lblSemiArid,
                m.labels.lblDrySubhumid,
                m.labels.lblHumid,
                m.labels.lblCold,
            ]
        },
        LandForm: {
            vis: {
                max: 5,
                min: 1,
                opacity: 1,
                palette: ['#383838', '#D89382', '#68AA63', '#E1F0E5', '#6f198c'],
            },
            names: [
                m.labels.lblPeakRidge,
                m.labels.lblUpperSlope,
                m.labels.lblLowerSlope,
                m.labels.lblFlat,
                m.labels.lblCliffNV,
            ]
        },
        protectionKBA: {
            vis: {
                max: 1,
                min: 0,
                opacity: 1,
                palette: ['red', 'green'],
            },
            names: [
                m.labels.lblKBANonProtected,
                m.labels.lblKBAProtected,
            ]
        },
        ecoStatus: {
            vis: {
                max: 5,
                min: 1,
                opacity: 1,
                palette: ['#257339', '#7BC141', '#F9A91B', '#EE1E23', '#B8BDCC'],
            },
            names: [
                m.labels.lblERPS1,
                m.labels.lblERPS2,
                m.labels.lblERPS3,
                m.labels.lblERPS4,
                m.labels.lblERPS5,
            ]
        },
        biomes: {
            vis: {
                max: 15,
                min: 1,
                opacity: 1,
                palette: ["#38A700", "#CCCD65", "#88CE66", "#00734C", "#458970", "#7AB6F5", "#FEAA01", "#FEFF73", "#BEE7FF", "#D6C39D", "#9ED7C2", "#FE0000", "#CC6767", "#FE01C4", "#FFEAAF",],
            },
            names: [
                m.labels.lblBioma1,
                m.labels.lblBioma2,
                m.labels.lblBioma3,
                m.labels.lblBioma4,
                m.labels.lblBioma5,
                m.labels.lblBioma6,
                m.labels.lblBioma7,
                m.labels.lblBioma8,
                m.labels.lblBioma9,
                m.labels.lblBioma10,
                m.labels.lblBioma11,
                m.labels.lblBioma12,
                m.labels.lblBioma13,
                m.labels.lblBioma14,
                m.labels.lblBioma15,
            ]
        },
        ecoregions: {
            vis: {
                max: 847,
                min: 1,
                opacity: 1,
                palette: ["#304A00", "#70A800", "#5D9600", "#4C7300", "#6C9400", "#6C9400", "#98E500", "#13ED00", "#267400", "#267400", "#4DE600", "#4DE600", "#70A800", "#304A00", "#23DB01", "#304A00", "#6C9400", "#13ED00", "#36C900", "#4C7300", "#304A00", "#7CAD75", "#70A800", "#80CC00", "#70A800", "#47B700", "#47B700", "#304A00", "#70A800", "#5AA500", "#76B532", "#99EB27", "#6AC705", "#B09200", "#FC8939", "#C7AB01", "#FBA87E", "#FDAE38", "#FFAA01", "#FCD135", "#FDBD7F", "#FD965B", "#E0B51B", "#FCEE50", "#FCBE51", "#DE5245", "#FBA141", "#FCC03C", "#FCE55B", "#FFAA01", "#DBDB00", "#ADFC62", "#FCC369", "#D9FB4C", "#FCD135", "#A87001", "#D68A00", "#ABE600", "#A93800", "#FCEA3E", "#66FC43", "#E69800", "#DBDB00", "#CF7B01", "#EDFD79", "#B3FC53", "#B3FB35", "#E8FC77", "#C3E8FA", "#5993B9", "#96BEE1", "#43D8F9", "#2C97C3", "#A7DCFB", "#439CD4", "#6A89A6", "#B57454", "#882AC8", "#B57454", "#A93800", "#F8C29C", "#DEBDAC", "#E600AA", "#C98D68", "#B54B01", "#E600AA", "#A80000", "#FF7F7E", "#CD8966", "#B54B01", "#FA647F", "#F5A27A", "#E74E6A", "#C17D4C", "#E05A57", "#E3A653", "#E38454", "#DE5245", "#E05A57", "#F7885B", "#BA8D4A", "#DFB44C", "#E89B49", "#FCD135",
                    "#A80000", "#E8914E", "#F2B654", "#B85E46", "#D55063", "#C73F49", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#63CFAB", "#74E4F7", "#FFFFFF", "#75CCFA", "#72EBD8", "#5AB1D2", "#4CAD9E", "#FFFFFF", "#65D6C4", "#4CA68D", "#6FC1DB", "#55C7AE", "#71E0D9", "#63EBDF", "#60C4E8", "#5DA9DB", "#69E7F5", "#7AD4F7", "#70A800", "#6C9400", "#47B700", "#5AA500", "#4C7300", "#70A800", "#267400", "#4DE600", "#4C7300", "#23DB01", "#70A800", "#70A701", "#13ED00", "#23DB01", "#267400", "#36C900", "#6C9400", "#267400", "#267400", "#035701", "#98E500", "#70A800", "#267400", "#47B700", "#23DB01", "#035701", "#5AA500", "#5AA500", "#99C726", "#BEE82E", "#BAE33F", "#75C202", "#57DA36", "#76ED33", "#3BA625", "#5AA62A", "#47E02E", "#A5E692", "#B3D49D", "#65D447", "#4AD53E", "#7CAD75", "#267400", "#9DFA61", "#62E655", "#267400", "#FCD357", "#8BFC3A", "#F8FD6F", "#C5FC7D", "#CEFC39", "#E8FC39", "#D7FC61", "#8FFC7D", "#FBCA49", "#FCDC79", "#FDB666", "#FDC975", "#F87C3E", "#B47228", "#D3AE79", "#6BB3F3", "#FF7F7E", "#E54C00", "#E54C00", "#A80000", "#CD8966", "#F5A27A", "#CD8966", "#B3493B", "#C63901", "#A80000", "#F27C62", "#CC5247", "#CF5167", "#FF7F7E", "#B3493B",
                    "#F05D6F", "#E34661", "#E8805D", "#D86B42", "#F2AF5E", "#E600AA", "#267400", "#98E500", "#23DB01", "#47B700", "#5AA500", "#004600", "#98E500", "#5AA502", "#4DE600", "#47B700", "#36C900", "#304A00", "#23DB01", "#267400", "#304A00", "#304A00", "#004600", "#4C7300", "#23DB01", "#23DB01", "#267400", "#70A800", "#47B700", "#98E500", "#267400", "#6C9400", "#4C5801", "#267400", "#4C7300", "#23DB01", "#70A800", "#36C900", "#47B700", "#70A800", "#70A800", "#6AB800", "#1F8E00", "#4F8700", "#98E500", "#82F178", "#4C7300", "#004600", "#035701", "#269400", "#36C900", "#267400", "#6C9400", "#70A800", "#36C900", "#36C900", "#70A800", "#267400", "#47B700", "#004600", "#98E500", "#13ED00", "#4DE600", "#267400", "#4C7300", "#47B700", "#5AA500", "#4C5400", "#267400", "#267400", "#5AA500", "#13ED00", "#267A0A", "#267400", "#82F178", "#70A800", "#6C9400", "#36C900", "#B0C705", "#73BD1E", "#86D01B", "#AEFA40", "#98B414", "#85D60B", "#9EED42", "#9CD940", "#98FA05", "#BCD72A", "#8DC138", "#B5E00A", "#11A655", "#00734C", "#50AA60", "#4BD671", "#267300", "#71C668", "#57E843", "#92BA71", "#00734C", "#FCD844", "#72C5F7", "#C48832", "#E67938", "#C9A63E", "#E600AA",
                    "#FDA87F", "#CFA149", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#B0F21F", "#62A67D", "#1EAB3B", "#00734C", "#C8EBB1", "#54FA42", "#4EAD37", "#00734C", "#38A700", "#73FA60", "#8CED84", "#93CF6D", "#8EBD6D", "#88F54C", "#5DA655", "#38A700", "#ACF081", "#6FE843", "#87C477", "#69BD34", "#73DA64", "#5DAD4C", "#4DE04A", "#035701", "#35A85A", "#00A884", "#4CD970", "#85DE74", "#439952", "#6C9B53", "#A6E067", "#5ABD7A", "#00734C", "#7FBF4F", "#90A34A", "#00734C", "#AECF64", "#ACC13E", "#6BE381", "#4DDE5D", "#00734C", "#64DB5D", "#499964", "#058047", "#38A700", "#E2C7FA", "#7A3CF9", "#9D83C4", "#9A45DE", "#8E60F7", "#956BC1", "#6D3EC2", "#DCB1F9", "#A63DEF", "#9A72F7", "#A587E9", "#882AC8", "#7E46E9", "#BB8FDA", "#CDB0E0", "#FBFC58", "#DEFC4E", "#DB931A", "#A3FC62", "#DEFC4E", "#FD9943", "#FBDA4D", "#93FC7C", "#A87001", "#FBB04B", "#C66E02", "#FCDF6A", "#FCBA26", "#FCCA4D", "#FDA65F", "#FFAA01", "#E8FC5F", "#F3FC49", "#E7BD33", "#A87001", "#4C82B6", "#61D2F2", "#4DA6A2", "#78F3F1", "#4D99B3", "#69F6D6", "#5ACFC7", "#66BECA", "#579ACE", "#4DB18F", "#6DB5DE", "#4CB9BB", "#6EE3C6", "#64DEE3", "#6AFBEE", "#74D0E7", "#4C82B6", "#5ABF9D",
                    "#FF7F7E", "#FFA77F", "#A93800", "#B54B01", "#E0B45B", "#CC9141", "#E18C78", "#FF7F7E", "#FFA77F", "#E18C78", "#A57024", "#FA5D4E", "#C4694E", "#FA5870", "#BA4A58", "#F9A461", "#B57C47", "#267400", "#70A800", "#6C9400", "#2E5D00", "#47B700", "#085401", "#4DE600", "#219100", "#13ED00", "#6C9400", "#267400", "#5AA500", "#98E500", "#0E5B00", "#5AA500", "#13ED00", "#4DE600", "#36C900", "#36C900", "#98E500", "#70A800", "#0E5B00", "#0E5B00", "#4DE600", "#267301", "#ABE038", "#70A800", "#4D7200", "#4DE600", "#4DE600", "#0D6101", "#23DB01", "#47B700", "#47B700", "#267400", "#70A800", "#4DE600", "#267400", "#5AA500", "#0E5B00", "#4DE600", "#267400", "#2E5D00", "#265401", "#478000", "#0E5B00", "#4C7300", "#47B700", "#98E500", "#004300", "#98E500", "#0E5B00", "#4C7300", "#13ED00", "#98E500", "#4DE600", "#47B700", "#004300", "#599100", "#13ED00", "#4C7300", "#98E500", "#4C7300", "#36C900", "#609900", "#70A800", "#2B8722", "#4C7300", "#70A800", "#4DE600", "#70A800", "#6C9400", "#259500", "#5AA500", "#98E500", "#4D7401", "#004300", "#2B8722", "#98E500", "#6C9400", "#6C9400", "#ABE038", "#7FEA04", "#96B500", "#61B807", "#737400", "#81B50A", "#98DE02",
                    "#DCF63D", "#76D40A", "#A2F718", "#A5D13E", "#BDF532", "#ACD61C", "#CBFA4A", "#478500", "#AECC2C", "#6EB81B", "#99BD05", "#C8DF12", "#95C90C", "#B5C435", "#9CE027", "#8DE610", "#93F820", "#70AB01", "#A3B336", "#83DB27", "#426700", "#B1C41D", "#C5F223", "#84B319", "#76B50E", "#3EDE62", "#267300", "#67E093", "#05A61A", "#267300", "#00421C", "#24FA8B", "#0ED62D", "#6AA843", "#38A700", "#BADEB0", "#54CC13", "#FFAA01", "#FCF238", "#FCB25D", "#E69800", "#FBE97B", "#D4D20E", "#FCD379", "#FFD221", "#FFAA01", "#FBA769", "#E69800", "#829A2C", "#D9BD40", "#D6A53C", "#E69800", "#7F99A6", "#46A6FA", "#2AA6BE", "#46B7F1", "#68ADE8", "#29A26C", "#3688D1", "#A5CDD9", "#F4A733", "#AA66CD", "#F5C47F", "#BD9A64", "#F4B158", "#DBA05E", "#BF9B77", "#F1873D", "#FBB84D", "#CD6667", "#B29841", "#F18650", "#D98944", "#F76A63", "#F5984B", "#F7975B", "#FA595E", "#B34544", "#B69248", "#CC9753", "#A85E1F", "#F15C56", "#BFA244", "#F57558", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#E600AA", "#36C900", "#11EE00", "#98E500", "#36C900", "#267301", "#267400", "#98E500", "#70A800", "#70A800", "#6C9400", "#47B700", "#4C7300", "#36C900", "#70A800",
                    "#267400", "#267400", "#4C7300", "#CEDF41", "#98E500", "#DAFA35", "#83D004", "#E69800", "#FFAA01", "#4AFB48", "#267400", "#5AA500", "#9CEF79", "#8BA685", "#7BE038", "#95D48D", "#4D9228", "#71EB64", "#38B529", "#8DB376", "#77D14D", "#B2F693", "#4DE600", "#88D97D", "#B3F7AC", "#55A649", "#4DE600", "#82F178", "#9CCF97", "#58BD33", "#267A0A", "#8DD45C", "#67BA48", "#7EF249", "#79BD66", "#84AB7E", "#7EE74F", "#87BD7F", "#5ACA2A", "#00B51B", "#378F52", "#7CA55F", "#38A700", "#62C342", "#1F7B10", "#88DF50", "#70A800", "#8EE266", "#70A800", "#C8FABF", "#267300", "#4DE600", "#9AB38B", "#78F053", "#89F261", "#8BC966", "#53AD27", "#007C33", "#B8DB43", "#76D145", "#A1B546", "#34AB37", "#8CBD3D", "#339B42", "#799F3C", "#CCE065", "#38A700", "#00734C", "#C1CF78", "#00734C", "#81B256", "#57C457", "#44C43C", "#007C33", "#29A26C", "#5CAB40", "#00734C", "#60A65D", "#CA9BFB", "#BD68F7", "#5E2CC9", "#AD9EC9", "#AD84FA", "#C87EF7", "#7E57D4", "#9F56E3", "#AE98E0", "#9273DB", "#AC6BED", "#FCEC35", "#CA6634", "#FCA673", "#D9FC7E", "#737400", "#7FFC4A", "#FDF674", "#FD9057", "#FCC960", "#FCFA58", "#D8FC36", "#BDFC53", "#54FC51", "#F6FC38", "#FFAA01", "#FCFA58",
                    "#C4FC41", "#FCD538", "#C9AB17", "#FCC73D", "#68BED9", "#3370A6", "#5998A9", "#97DBE8", "#3881AC", "#6BD3FA", "#6CA8C4", "#4DA6B8", "#B8823C", "#E67938", "#E8A382", "#BA3D4D", "#FA9A50", "#EECB93", "#C27F4B", "#D57739", "#EB9B3C", "#D6A890", "#EC8751", "#F9D6AE", "#F7A86D", "#D69F45", "#A93800", "#B36942", "#D5642C", "#720000", "#DBA859", "#B38160", "#DF72FF", "#E0B070", "#5085A5", "#5EC0AB", "#5E9CC0", "#5DE3E2", "#7BF5CC", "#5DB3C8", "#77C2FB", "#558CB8", "#4FACB3", "#62C8CA", "#519AAB", "#5AD5B6", "#59B4AF", "#5ADEC9", "#FF7F7C", "#A80000", "#FFA77F", "#FF7F7E", "#F5A27A", "#A80000", "#F5A27A", "#CD8966", "#E54C00", "#F1873D", "#E54C00", "#F1873D", "#F5A27A", "#CD6667", "#D49E54", "#D49E54", "#D49E54", "#720000", "#C63901", "#C63901", "#A80000", "#B02745", "#FA774D", "#F9AB58", "#FFEBBE", "#FFAA01", "#F6CE5C", "#B7393D", "#B86847", "#D94F5C", "#B85349", "#A93800", "#DE8E59", "#D06F42", "#F7BA4F", "#FDA87F", "#734C00", "#D47A55", "#FA774D", "#B2863B", "#D16B54", "#F9CD64", "#B35E37", "#CE9053", "#FAD354", "#E67938", "#E3C35C", "#C8853E", "#C95F51", "#E6644C", "#CE6C47", "#DE6C51", "#CC8245", "#F6CE5C", "#B43D41", "#FFD380", "#B78139", "#DF8245", "#FFAA01", "#BB7B3D", "#F7B152", "#B43D41", "#E2E2E0",]
            },
        },
        aoic: {
            vis: { min: 1, max: 100, palette: mdlPalettes.colorbrewer.Spectral[10] },
            names: [
                m.labels.lblAOIC1,
                m.labels.lblAOIC2,
                m.labels.lblAOIC3,
                m.labels.lblAOIC4,
                m.labels.lblAOIC5,
            ]
        },
        forestConsensus: {
            vis: {
                opacity: 1, min: 0, max: 7,
                palette: ['#9c9c9c', '#f2dd93', '#f2dd93', '#bd693c', '#bd693c', '#a5b900', '#a5b900', '#009c00'],
            },
            names: [
                m.labels.lblConsensus1,
                m.labels.lblConsensus2,
                m.labels.lblConsensus3,
                m.labels.lblConsensus4,
                m.labels.lblConsensus5,
            ]
        },
        worldPop: { vis: { opacity: 1, min: 1, max: 90, palette: ['#fc8761', '#b63679', '#965caf', '#50127b'] } },
        ecoFunTypes: { vis: { min: 0, max: 15, palette: mdlPalettes.matplotlib.viridis[7] } },
        terrBioInt: { vis: { min: 0.1, max: 1, palette: mdlPalettes.misc.jet[7].slice(0).reverse() } },
        flii: {
            vis: {
                max: 3,
                min: 1,
                opacity: 1,
                palette: ['#7E5D10', '#04FF02', '#267301'],
            },
            names: [
                m.labels.lblLowIntegrity,
                m.labels.lblMediumIntegrity,
                m.labels.lblHighIntegrity,
            ]
        },
    };
    // Map layers configuration
    m.generalLayerEntries = [
        {
            asset: a.imgEcoPstatus,
            style: m.lv.ecoStatus.vis,
            name: m.labels.lblEcoRegionProtectionStatus,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblEcoRegionProtectionStatus, m.lv.ecoStatus.names, m.lv.ecoStatus.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://doi.org/10.1093/biosci/bix014'
        },
        {
            asset: a.imgBiomes,
            style: m.lv.biomes.vis,
            name: m.labels.lblBiomes,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblBiomes, m.lv.biomes.names, m.lv.biomes.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://doi.org/10.1093/biosci/bix014'
        },
        {
            asset: a.imgEcoregions,
            style: m.lv.ecoregions.vis,
            name: m.labels.lblEcoregions,
            visible: false,
            legend: ui.Panel(),
            group: 'RASTER',
            citation: 'https://doi.org/10.1093/biosci/bix014'
        },
        {
            asset: a.imgTerrain,
            style: {},
            name: m.labels.lblTopography,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblElevation + ' (m)', m.lv.terrain.vis),
            group: 'RASTER',
        },
        {
            asset: a.imgLastLC,
            style: m.lv.lcBase.vis,
            name: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLC.name + ') ' + mdlPrecalculation.baseLC.year,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLC.name + ') ' + mdlPrecalculation.baseLC.year, m.lv.lcBase.names, m.lv.lcBase.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1DDoIaLvRL2vKJSu1eJazpKT2LC6h9DnA/view?usp=share_link'
        },
        {
            asset: a.imgLPD,
            style: m.lv.lpd.vis,
            name: m.labels.lblLandProductivityDynamics,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandProductivityDynamics, m.lv.lpd.names, m.lv.lpd.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/13qYCyLgZ6O3ziYBuby2_nADbV-dEBFjv/view?usp=share_link'
        },
        {
            asset: a.imgSOC,
            style: m.lv.soc.vis,
            name: m.labels.lblSocMap,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblSOCTonnesHa, m.lv.soc.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1r-wVY9OrA3F6wEx2nKs96wW2ow711OZA/view?usp=share_link'
        },
        {
            asset: a.imgPrecipitationTrend,
            style: m.lv.precipTrend.vis,
            name: m.labels.lblPrecipitationTrend,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblPrecipitationTrend, m.lv.precipTrend.vis, m.labels.lblNegTrend, '', m.labels.lblPosTrend),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1V9S6phrY-TO2dV5gmWsEuTmhLnoL-jYX/view?usp=share_link'
        },
        {
            asset: a.imgMountains,
            style: m.lv.mountains.vis,
            name: m.labels.lblMountains,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblMountains, m.lv.mountains.names, m.lv.mountains.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1e3_dRvu9WpNzxiThWaIqUouaytWsDWPq/view?usp=share_link'
        },
        {
            asset: a.imgNPP,
            style: m.lv.npp.vis,
            name: m.labels.lblNPP,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblNPPLegend, m.lv.npp.vis),
            group: 'RASTER', 
            citation: 'https://drive.google.com/file/d/1cBWB3Rb1JywFdr3dbo5KAJw_-_ZnzWJ3/view?usp=share_link'
        },
        {
            asset: a.imgAOIbioCarWatBiome,
            style: m.lv.aoic.vis,
            name: m.labels.lblAOIC,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblAOICLegend, m.lv.aoic.vis),
            group: 'RASTER',
            citation: 'https://doi.org/10.1038/s41559-021-01528-7'
        },
        {
            asset: a.imgForestConsensus,
            style: m.lv.forestConsensus.vis,
            name: m.labels.lblForestConsensusMap,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblForestConsensus, m.lv.forestConsensus.names, ['#9c9c9c', '#f2dd93', '#bd693c', '#a5b900', '#009c00'], false, false),
            group: 'RASTER',
        },
        {
            asset: a.imgWorldPop,
            style: m.lv.worldPop.vis,
            name: m.labels.lblWorldPopulation,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblWorldPopulationLegend, m.lv.worldPop.vis),
            group: 'RASTER',
            citation: 'https://developers.google.com/earth-engine/datasets/catalog/WorldPop_GP_100m_pop_age_sex_cons_unadj?hl=en'
        },
        {
            asset: a.imgEcoFunTypes,
            style: m.lv.ecoFunTypes.vis,
            name: m.labels.lblEcoFunTypes,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblEcoFunTypesLegend, m.lv.ecoFunTypes.vis),
            group: 'RASTER',
            citation: 'https://portals.iucn.org/library/node/49250'
        },
        {
            asset: a.imgAridityIndex,
            style: m.lv.aridityIndex.vis,
            name: m.labels.lblAridityIndex,
            visible: true,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblAridityIndex, m.lv.aridityIndex.names, m.lv.aridityIndex.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: a.imgLandForm,
            style: m.lv.LandForm.vis,
            name: m.labels.lblLandForm,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandForm, m.lv.LandForm.names, m.lv.LandForm.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: a.imgFLII,
            style: m.lv.flii.vis,
            name: m.labels.lblFLII,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblFLII, m.lv.flii.names, m.lv.flii.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://doi.org/10.1038/s41467-020-19493-3'
        },
        {
            asset: a.imgGlobioMSA,
            style: m.lv.terrBioInt.vis,
            name: m.labels.lblTerrBioInt,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblTerrBioInt, m.lv.terrBioInt.vis),
            group: 'RASTER',
            citation: 'https://doi.org/10.1111/gcb.14848'
        },
        {
            asset: a.imgFireIndex,
            style: m.lv.fireIndex.vis,
            name: m.labels.lblFireIndex,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblFireIndex, m.lv.fireIndex.vis, '0.05', '0.25', '0.5'),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/17xSGXEba-PYHXXjKnIps_1ooNYnOFstM/view?usp=share_link'
        },
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
            asset: ftc2,
            style: m.lv.borderLevel2.vis,
            name: m.labels.lblLevel2,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
        },
        {
            asset: ftcProSites,
            style: m.lv.borderPS.vis,
            name: m.labels.lblProjectSites,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
        },
        {
            asset: ftc01Styled,
            style: { styleProperty: "style" },
            name: m.labels.lblSubreg,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSubreg, m.lv.subreg.names, m.lv.subreg.vis.palette, false, false),
            group: 'FEATURES',
        },
        {
            asset: a.ftcSLMStyled,
            style: { styleProperty: "style" },
            name: m.labels.lblSLM,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSLM, m.lv.slm.names, m.lv.slm.vis.palette, false, true),
            group: 'FEATURES',
            citation: 'https://qcat.wocat.net/es/wocat/list/?type=wocat&q=Drylands'
        },
        {
            asset: a.ftcKBA,
            style: m.lv.kba.vis,
            name: m.labels.lblKeyBiodiversityAreas,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: 'https://drive.google.com/file/d/1cnV3tWa9hPe_XJYDkINuyy4cL8YhhCsm/view?usp=share_link'
        },
        {
            asset: a.ftcPA,
            style: m.lv.pa.vis,
            name: m.labels.lblProtectedAreas,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: 'https://drive.google.com/file/d/1B2KUCT9fOkMG94qraE4qxFXQwgK0N19V/view?usp=share_link'
        },
    ];
    m.socioEconLayerEntries = [];
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
    m.transitionLayerEntries = [
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
    m.namesLayers = [];
    m.mcLayerEntries = [
        {
            title: m.labels.lblBiomes,
            palette: m.lv.biomes.vis.palette,
            names: m.lv.biomes.names,
            image: imgBiomes,
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        },
        {
            title: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLC.name + ') ' + mdlPrecalculation.baseLC.year,
            palette: m.lv.lcBase.vis.palette,
            names: m.lv.lcBase.names,
            image: a.imgLastLC,
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
        {
            title: m.labels.lblLandProductivityDynamics,
            palette: m.lv.lpd.vis.palette.slice(1),
            names: m.lv.lpd.names.slice(1),
            image: a.imgLPD,
            categories: [1, 2, 3, 4, 5],
        },
        {
            title: m.labels.lblMountains,
            palette: m.lv.mountains.vis.palette,
            names: m.lv.mountains.names,
            image: a.imgMountains.unmask(),
            categories: [1, 2, 3, 4, 5, 6, 7],
        },
        {
            title: m.labels.lblSocMap,
            palette: ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594',],
            names: [
                m.labels.lblSocVeryLow + ' (<20)',
                m.labels.lblSocLow + ' (20-30)',
                m.labels.lblSocModerateLow + ' (30-40)',
                m.labels.lblSocModerateHigh + ' (40-50)',
                m.labels.lblSocHigh + ' (50-70)',
                m.labels.lblSocVeryHigh + ' (>70)',
            ],
            image: imgSOCCat,
            categories: [1, 2, 3, 4, 5, 6],
        },
        {
            title: m.labels.lblFLII,
            palette: m.lv.flii.vis.palette,
            names: m.lv.flii.names,
            image: imgFLII,
            categories: [1, 2, 3],
        },
        {
            title: m.labels.lblEcoRegionProtectionStatus,
            palette: m.lv.ecoStatus.vis.palette,
            names: m.lv.ecoStatus.names,
            image: imgEcoPstatus,
            categories: [1, 2, 3, 4, 5],
        },
        {
            title: m.labels.lblAOIC,
            palette: mdlPalettes.colorbrewer.Spectral[5],
            names: m.lv.aoic.names,
            image: imgAOIbioCarWatBiomeCat,
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
            title: m.labels.lblAridityIndex,
            palette: m.lv.aridityIndex.vis.palette,
            names: m.lv.aridityIndex.names,
            image: imgAridityIndex,
            categories: [1, 2, 3, 4, 5, 6],
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
    c.lp.info.lblReference = ui.Label(m.labels.lblClickMoreInfo).setUrl(m.info.referenceDocUrl);
    c.lp.info.lblAppDev = ui.Label(m.labels.lblAppDeveloped);
    c.lp.info.lblEmail1 = ui.Label(m.info.contactEmail1).setUrl('mailto:' + m.info.contactEmail1);
    c.lp.info.lblEmail2 = ui.Label(m.info.contactEmail2).setUrl('mailto:' + m.info.contactEmail2);
    c.lp.info.lblEmail3 = ui.Label(m.info.contactEmail3).setUrl('mailto:' + m.info.contactEmail3);
    c.lp.info.lblEmail4 = ui.Label(m.info.contactEmail4).setUrl('mailto:' + m.info.contactEmail4);
    c.lp.info.btnClose = ui.Button({ label: m.labels.lblCloseInfoPanel });
    c.lp.info.pnlContainer = ui.Panel(
        [c.lp.info.lblApp,
        c.lp.info.lblReference,
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
        items: ['English','French'],
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
    c.lp.levels.selLevelRg = ui.Select({
        items: [],
        placeholder: m.labels.lblSelectLevelRg,
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
    m.generalLayerEntries.filter(function (e) {
        return e.group === 'FEATURES';
    }).forEach(function (layer) {
        c.lp.gl.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
    m.generalLayerEntries.filter(function (e) {
        return e.group === 'RASTER';
    }).forEach(function (layer) {
        c.lp.gl.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
    // Left Panel - Socio-economics layers section       
    c.lp.se = {};
    c.lp.se.btnSocioEconLayers = ui.Button(m.labels.lblSocioEconomicsLayers);
    c.lp.se.pnlContainer = ui.Panel();
    m.socioEconLayerEntries.filter(function (e) {
        return e.group === 'FEATURES';
    }).forEach(function (layer) {
        c.lp.se.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
    m.socioEconLayerEntries.filter(function (e) {
        return e.group === 'RASTER';
    }).forEach(function (layer) {
        c.lp.se.pnlContainer.add(mdlLegends.createLayerEntry(layer));
    });
    // Left Panel - Multi-criteria analysis section   
    c.lp.mc = {};
    c.lp.mc.btnMcAnalysis = ui.Button(m.labels.lblHotspots);
    c.lp.mc.pnlEntries = mdlLegends.createMultiCriteriaPanel(m.mcLayerEntries);
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
        items: ['ESA', 'COPERNICUS'],
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
    m.transitionLayerEntries.forEach(function (layer) {
        c.lp.tr.pnlLayers.add(mdlLegends.createLayerEntry(layer));
    });
    c.lp.tr.pnlContainer.add(c.lp.tr.pnlSource);
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
    c.cp.slm = {};
    c.cp.slm.pnlSLM = ui.Panel();
    c.cp.slm.lblSLMTitle = ui.Label(m.labels.lblLoading);
    c.cp.slm.pnlSLM.add(c.cp.slm.lblSLMTitle);
    c.cp.slm.ge = {};
    c.cp.slm.ge.pnlEntryLink = ui.Panel({
        widgets: [ui.Label(m.labels.lblLoading)],
        style: { color: 'blue', fontSize: '12px' }
    });
    c.cp.slm.ge.pnlEntryDescription = ui.Panel({
        widgets: [ui.Label(m.labels.lblLoading)],
    });
    // Add entries to general stats panel
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
    c.rp.stats.pnlLinks = ui.Panel();
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
    //c.lp.pnlControl.add(c.lp.flyTo.lblFlyTo);
    //c.lp.pnlControl.add(c.lp.flyTo.pnlFlyTo);
    c.lp.pnlControl.add(c.lp.levels.lblChoose);
    c.lp.pnlControl.add(c.lp.levels.selLevel1);
    c.lp.pnlControl.add(c.lp.levels.selLevel2);
    c.lp.pnlControl.add(c.lp.levels.selLevelRg);
    c.lp.pnlControl.add(c.lp.boundaries.lblChoose);
    c.lp.pnlControl.add(c.lp.boundaries.selBoundariesLayer);
    c.lp.pnlControl.add(c.lp.gl.lblLayersLegends);
    c.lp.pnlControl.add(c.lp.gl.pnlContainer);
    //c.lp.pnlControl.add(c.lp.se.btnSocioEconLayers);
    //c.lp.pnlControl.add(c.lp.se.pnlContainer);
    c.lp.pnlControl.add(c.lp.sdg.btnSDG);
    c.lp.pnlControl.add(c.lp.sdg.pnlContainer);
    //c.lp.pnlControl.add(c.lp.sdg.lblGlobalAppSDG);
    c.lp.pnlControl.add(c.lp.mc.btnMcAnalysis);
    c.lp.pnlControl.add(c.lp.mc.pnlContainer);
    c.lp.pnlControl.add(c.lp.tr.btnTransitions);
    c.lp.pnlControl.add(c.lp.tr.pnlContainer);
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
    c.rp.pnlOutput.add(c.rp.stats.pnlLinks);
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
    c.lp.info.lblReference.style().set(s.styleWarning);
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
    c.lp.levels.lblChoose.style().set(s.style1);
    c.lp.levels.selLevel1.style().set({ width: "90%", });
    c.lp.levels.selLevel2.style().set({ width: "90%", });
    c.lp.levels.selLevelRg.style().set({ width: "90%", });
    c.lp.boundaries.lblChoose.style().set(s.style1);
    c.lp.boundaries.selBoundariesLayer.style().set({ width: '70%' });
    c.lp.gl.lblLayersLegends.style().set({ fontSize: '12px', fontWeight: 'bold' });
    c.lp.gl.pnlContainer.style().set({ margin: '0px 5px', shown: true });
    s.sectionButton = { width: '90%', fontSize: '6px', fontWeight: 'normal' };
    s.sectionPanel = { margin: '5px 5px', shown: false, width: '90%' };
    s.paramPanel = { width: '90%', fontSize: '12px', margin: '0px', padding: '0px' };
    // Socio-economics layers Section
    c.lp.se.btnSocioEconLayers.style().set(s.sectionButton);
    c.lp.se.btnSocioEconLayers.style().set({ color: '#0000FF' });
    c.lp.se.pnlContainer.style().set(s.sectionPanel);
    c.lp.se.pnlContainer.style().set({ border: '3px solid #0000FF' });
    // SDG Section
    c.lp.sdg.btnSDG.style().set(s.sectionButton);
    c.lp.sdg.btnSDG.style().set({ color: '#000000' });
    c.lp.sdg.pnlContainer.style().set(s.sectionPanel);
    c.lp.sdg.pnlContainer.style().set({ border: '3px solid #000000' });
    c.lp.sdg.lblGlobalAppSDG.style().set({ fontSize: '12px' });
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
    c.lp.dt.txbLayerName.style().set({ width: '60%', fontSize: '12px' });
    c.lp.dt.lblDrawFeatures.style().set({ fontSize: '12px' });
    c.lp.dt.lblGetStatistics.style().set({ fontSize: '12px' });
    c.lp.dt.lblJson.style().set({ fontSize: '12px' });
    c.lp.dt.lblKml.style().set({ fontSize: '12px' });
    c.lp.dt.lblDownloadLinks.style().set(s.styleWarning);
    c.lp.dt.customAsset.lblEnterAssetId.style().set({ fontSize: '12px' });
    c.lp.dt.customAsset.txtAssetId.style().set({ width: '60%', fontSize: '12px' });
    c.lp.dt.lblLinks.style().set(s.styleWarning);
    c.lp.op.lblOpacity.style().set({ fontSize: '12px' });
    c.lp.lblDisclaimer.style().set({ fontSize: '10px', margin: '2px 10px' });
    s.styleStatsValue = { margin: '4px 0px', fontSize: '12px', whiteSpace: 'pre' };
    s.styleStatsHeader = { margin: '4px 0px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'pre' };
    s.styleInfoTitle = { fontSize: '16px', fontWeight: 'bold', margin: '4px 0px' };
    s.styleInfoLink = { fontSize: '12px', margin: '2px 10px', color: 'red' }
    s.styelChartPanelTitle = { fontSize: '16px', fontWeight: 'bold', margin: '4px 15px' };
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
            shown: (!c.lp.tr.pnlContainer.style().get('shown') &&
                !c.lp.mc.pnlContainer.style().get('shown') &&
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
                    c.cp.pnlFrontLayerLegend.widgets().set(0, m.transitionLayerEntries[i].legend);
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
        // If socio-economics panel is open check if some layer is selected
        if (c.lp.se.pnlContainer.style().get('shown')) {
            for (var i = c.lp.se.pnlContainer.widgets().length() - 1; i >= 0; i--) {
                chk = c.lp.se.pnlContainer.widgets().get(i).widgets().get(0);
                if (chk.getValue()) {
                    c.cp.pnlFrontLayerLegend.widgets().set(0, m.socioEconLayerEntries[i].legend);
                    return;
                }
            }
        }
        for (var j = c.lp.gl.pnlContainer.widgets().length() - 1; j >= 0; j--) {
            chk = c.lp.gl.pnlContainer.widgets().get(j).widgets().get(0);
            if (chk.getValue()) {
                var l = null;
                for (var g = 0; g < m.generalLayerEntries.length; g++) {
                    if (m.generalLayerEntries[g].name === chk.getLabel()) {
                        l = m.generalLayerEntries[g].legend;
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
    c.lp.info.btnClose.onClick(function () {
        c.lp.info.pnlContainer.style().set({ shown: !c.lp.info.pnlContainer.style().get('shown') });
        c.lp.info.btnClose.setLabel(c.lp.info.pnlContainer.style().get('shown') ? m.labels.lblCloseInfoPanel : m.labels.lblOpenInfoPanel);
    });
    // Stack layers in map
    // General layers
    m.generalLayerEntries.forEach(function (layer) {
        if (layer.group === 'FEATURES') {
            c.cp.map.addLayer(layer.asset.style(layer.style), {}, layer.name, layer.visible);
        }
        else {
            c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
        }
    });
    // Socio-economics layers
    m.socioEconLayerEntries.forEach(function (layer) {
        if (layer.group === 'FEATURES') {
            c.cp.map.addLayer(layer.asset.style(layer.style), {}, layer.name, layer.visible);
        }
        else {
            c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
        }
    });
    // SDG layers
    m.SDGLayerEntries.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.name, layer.visible);
    });
    // Transition layers
    m.transitionLayerEntries.forEach(function (layer) {
        c.cp.map.addLayer(layer.asset, layer.style, layer.label, layer.visible);
    });
    // Multicriteria layer - this layer is dinamically updated 
    c.cp.map.addLayer(a.imgCustom, m.lv.custom.vis, m.labels.lblHotspots, false);
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
    // Add on check/uncheck functionality to socio-economics layers entries
    c.lp.se.pnlContainer.widgets().forEach(function (w) {
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
            showLayer(m.transitionLayerEntries[i].label, checked); // 
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
                && l.getName() !== m.labels.lblProjectSites
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
            m.ISO3Aoi = selectedArea.get('ISO3CD').getInfo();
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
                'ISO3CD'
            ];
            f = ee.Feature(null).copyProperties(selectedArea, statslCols);
        }
        else {
            // Calculate all statistics required for info panel
            var ftcSampleStats = mdlPrecalculation.precalculate(m.ftcAoi, m.bestEffort, [
                'p_lpd',
                'p_soc_sum',
                'p_soc_mean',
                'p_pa_bin',
                'p_kba_bin',
                'p_mountain_bin',
                'p_npp_sum',
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
        } catch (error) {
            c.rp.lblMessages.setValue(error);
        }
        c.cp.map.drawingTools().setSelected(null);
        // Show only charts related to opened panel on the left (General|Multicriteria|Transitions)
        handleChartsPanelsShown();
        c.rp.stats.pnlLinks.clear();
        if (m.levelAoi === m.labels.lblLevel1) {
            setupAdditionalInfoChart();
        }
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
    var handleChangeLevelRg = function (levelRg) {
        m.levelAoi = m.labels.lblSubreg;
        m.ftcAoi = ftc01.filter(ee.Filter.eq('REG_CODE', levelRg));
        m.precalculated = true;
        showInfoSelectedAoi();
        // refresca Level1
        m.names1 = m.ftcLelvel1.aggregate_array('name').getInfo();
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
            // load Subregion again
            c.lp.levels.selLevelRg.items().reset([]);
            // Subregion names for dropdown
            m.namesRg = m.ftcLelvelRg.aggregate_array('name').getInfo();
            m.codesRg = m.ftcLelvelRg.aggregate_array('REG_CODE').getInfo();
            m.siLevelRg = [];
            for (var i = 0; i < m.namesRg.length; i++) {
              m.siLevelRg.push({
                label: m.namesRg[i],
                value: m.codesRg[i]
              });
            }
            m.siLevelRg.sort(sortByLabel);
            c.lp.levels.selLevelRg.items().reset(m.siLevelRg);
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
        /*
        c.lp.levels.selLevel1.unlisten();
        c.lp.levels.selLevel1.items().reset(m.siLevel1);
        c.lp.levels.selLevel1.setPlaceholder(m.labels.lblSelectLevel1);
        c.lp.levels.selLevel1.setValue(null);
        c.lp.levels.selLevel1.onChange(handleChangeLevel1);
        */
        c.lp.levels.selLevel1.unlisten();
        c.lp.levels.selLevel2.unlisten();
        c.lp.levels.selLevelRg.unlisten();
        c.lp.levels.selLevel1.items().reset(m.siLevel1);
        c.lp.levels.selLevel1.setPlaceholder(m.labels.lblSelectLevel1);
        c.lp.levels.selLevel1.setValue(null);
        c.lp.levels.selLevel2.items().reset([]);
        c.lp.levels.selLevel2.setPlaceholder(m.labels.lblSelectLevel1First);
        c.lp.levels.selLevel2.setValue(null);
        c.lp.levels.selLevelRg.items().reset([]);
        c.lp.levels.selLevelRg.setPlaceholder(m.labels.lblSelectLevelRg);
        c.lp.levels.selLevelRg.setValue(null);
        c.lp.levels.selLevel1.onChange(handleChangeLevel1);
        c.lp.levels.selLevel2.onChange(handleChangeLevel2);
        c.lp.levels.selLevelRg.onChange(handleChangeLevelRg);
    };
    /** Handles value selection in countries/territories dropdown */
    c.lp.levels.selLevel1.onChange(handleChangeLevel1);
    c.lp.levels.selLevelRg.onChange(handleChangeLevelRg);
    /* Handle click on selected layer */
    c.cp.map.onClick(function (coords, map) {
        c.lp.flyTo.txtLon.setValue(coords.lon);
        c.lp.flyTo.txtLat.setValue(coords.lat);
        c.cp.slm.pnlSLM.style().set({ shown: false });
        c.rp.pnlMessages.style().set({ shown: true });
        c.rp.lblMessages.setValue(m.labels.lblProcessingArea);
        if (Object.keys(m.evalSet).length === 0 && !c.lp.dt.pnlContainer.style().get('shown')) {
            if (m.ftcClickOn === null) {
                c.rp.pnlMessages.style().set({ shown: true });
                c.rp.lblMessages.setValue(m.labels.lblSelectLayer);
                return;
            }
            c.cp.map.widgets().remove(c.cp.pnlCombinedLegend);
                        // if slm ftc is selected show panel for panel with ingo for practice selected
            if (c.lp.boundaries.selBoundariesLayer.getValue() === m.labels.lblSLM) {
                m.assetsClick[m.labels.lblSLM] = ftcSLM.map(function (f) {
                    return f.buffer(map.getScale() * 10);
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
                        var f = ee.Feature(null).copyProperties(ftcSLMSelected.first(), ['NameEN', 'Link', 'Brief Desc', 'Name2']);
                        f.evaluate(function (ef, error) {
                            delete m.evalSet["slm"];
                            if (Object.keys(m.evalSet).length === 0) {
                                handleEvaluating(false);
                            }
                            if (ef) {
                                if (c.lp.lan.value === 'French') {
                                  c.cp.slm.lblSLMTitle.setValue(ef.properties['Name2']);
                                  c.cp.slm.ge.pnlEntryLink.widgets().get(0).setValue(m.labels.lblLink).setUrl(ef.properties['Link']);
                                  c.cp.slm.ge.pnlEntryDescription.widgets().get(0).setValue(ef.properties['Brief Desc']);
                                }
                                else {
                                  c.cp.slm.lblSLMTitle.setValue(ef.properties['NameEN']);
                                  c.cp.slm.ge.pnlEntryLink.widgets().get(0).setValue(m.labels.lblLink).setUrl(ef.properties['Link']);
                                  c.cp.slm.ge.pnlEntryDescription.widgets().get(0).setValue(ef.properties['Brief Desc']);
                                }
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
        }
    });
    /**  Unchecks some layers in general layers panel, invoked when advanced panels are opened*/
    var unselectLayersPanelChecks = function () {
        for (var i = 0; i < c.lp.gl.pnlContainer.widgets().length(); i++) {
            var chb = c.lp.gl.pnlContainer.widgets().get(i).widgets().get(0);
            if (chb.getLabel() !== m.labels.lblLevel1
                && chb.getLabel() !== m.labels.lblProjectSites
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
                showLayer(m.transitionLayerEntries[i].label, show);
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
    c.lp.se.btnSocioEconLayers.onClick(function () {
        c.lp.se.pnlContainer.style().set({ shown: !c.lp.se.pnlContainer.style().get('shown') });
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
    /** Select Drylands whole area */
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
        for (var p = 0; p < m.mcLayerEntries.length; p++) {
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
        c.lp.levels.selLevelRg.setDisabled(disable);
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
            chartPanel.widgets().set(0, chart); // replace 'Generating...' label with chart
        });
    };
    var setupAdditionalInfoChart = function () {
        c.rp.stats.pnlLinks.widgets().set(0,
            ui.Label({
                value: m.labels.lblLoadingAdditionalInfo + '...',
                style: s.styleMessage,
            })
        );
        var ftrLinks = ftcLinks.filter(ee.Filter.eq('ISO3CD', m.ISO3Aoi)).first();
        m.evalSet["additional"] = true;
        ftrLinks.evaluate(function (elf) {
            delete m.evalSet["additional"];
            if (Object.keys(m.evalSet).length === 0) {
                handleEvaluating(false);
            }
            var dtLinks = [];
            dtLinks.push([{
                type: 'string',
                label: m.labels.lblAdditionalInfo,
                role: 'domain',
            },
            {
                type: 'string',
                label: ' ',
                role: 'data',
            },
            ]);
            ['LinkInFAO', 'projectGEFpage', 'UNCCDweb', 'wocatP', 'wocatN', 'PRAIS3Doc', 'SDG1531', 'LDNtargets'
                , 'TSPreport', 'LDNGMprofile', 'drougthPlan']
                .map(function (l) {
                    if (!elf.properties[l] || elf.properties[l].length === 0) {
                        dtLinks.push([m.labels['lbl' + l], '']);
                    }
                    else {
                        if (l === 'wocatN') {
                            dtLinks.push([m.labels['lbl' + l], elf.properties[l]]);
                        }
                        else if (l === 'SDG1531') {
                            dtLinks.push([m.labels['lbl' + l], formatNumber(elf.properties[l], 2) + '%']);
                        }
                        else {
                            dtLinks.push([m.labels['lbl' + l], '<a href=' + elf.properties[l] + ' target="_blank">Link</a>']);
                        }
                    }
                });
            var chtLinks = ui
                .Chart(dtLinks)
                .setChartType('Table')
                .setOptions({
                    title: 'Links',
                    legend: { position: 'none' },
                    pageSize: 100,
                    allowHtml: true
                });
            c.rp.stats.pnlLinks.widgets().set(0, chtLinks);
        })
    }
    /** Setup general charts: LC, LPD, Hansen and Anual NDVI*/
    var setupGeneralCharts = function () {
        c.rp.charts.pnlGeneralCharts.clear();
        c.rp.charts.pnlGeneralCharts.add(c.rp.charts.lblGeneralChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi
            , m.bestEffort,
            ['p_lc', 'p_lpd', 'p_hansen', 'p_ndvi_annual', 'p_aridity_index', 'p_pro_kba', 'p_landform']);
        //  LAND COVER PIE CHART
        var lstFeatLC = mdlPrecalculation.namesBaseLCColumns.map(function (pName, i) {
            var lstValues = ee.List([m.lv.lcBase.names[i], ftc.first().get(pName)]);
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
            colors: m.lv.lcBase.vis.palette,
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
        //  ARIDITY INDEX PIE CHART 
        var lstFeatAI = mdlPrecalculation.namesAridityIndex.map(function (pName, i) {
            var lstValues = ee.List([m.lv.aridityIndex.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderAI = ee.List([
            [
                { label: 'AI', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsAI = {
            title: m.labels.lblAridityIndex,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.aridityIndex.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderAI.cat(ee.FeatureCollection(lstFeatAI).aggregate_array('row')), optionsAI, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        //  LandForm PIE CHART 
        var lstFeatLF = mdlPrecalculation.namesLandForm.map(function (pName, i) {
            var lstValues = ee.List([m.lv.LandForm.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderLF = ee.List([
            [
                { label: 'LF', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsLF = {
            title: m.labels.lblLandForm,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.LandForm.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderLF.cat(ee.FeatureCollection(lstFeatLF).aggregate_array('row')), optionsLF, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
        //  KBA PROTECTED      
        var lstFeatKBA = ['kba_noPA', 'kba_PA'].map(function (pName, i) {
            var lstValues = ee.List([m.lv.protectionKBA.names[i], ftc.first().get(pName)]);
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
            colors: m.lv.protectionKBA.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderKBA.cat(ee.FeatureCollection(lstFeatKBA).aggregate_array('row')), optionsKBA, 'PieChart', createChartPanel(c.rp.charts.pnlGeneralCharts));
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
        var lstNdviByYear = mdlPrecalculation.yearsHansen.map(function (i) {
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
        if (!m.precalculated) {
            var chtNdviByMonthYear = ui.Chart.image.series(imcNDVIByMonthYear, ftc, ee.Reducer.mean(), 250);
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
            isStacked: 'relative',
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
            isStacked: 'relative',
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
        // Relative
        var optionsCombinedFAOSimp = {
            title: m.labels.lblSDG1531FAOSimp,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'relative',
            colors: m.lv.sdg1531.vis.palette,
        };
        createChart(lstHeaderCombinedFAOSimp.cat(ee.FeatureCollection(lstFeatCombinedFAOSimp).aggregate_array('row')), optionsCombinedFAOSimp, 'BarChart', createChartPanel(c.rp.charts.pnlSDGCharts));
    };
    /** Setup combined charts: LPDxLC, SOCxLPD, SOCxLC, SOCxLPDxLC, LCxLPD table*/
    var setupMcCharts = function () {
        c.rp.charts.pnlMcCharts.clear();
        c.rp.charts.pnlMcCharts.add(c.rp.charts.lblMcChartsTitle);
        // If custom drawn-area calculate required statistics for charts
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi,
            m.bestEffort,
            ['p_x2', 'p_soc_lpd', 'p_soc_lc', 'p_soc_lc_lpd']);
        var catsLCNoWater = [1, 2, 3, 4, 5, 6, 7, 8];
        var catsLPD = [1, 2, 3, 4, 5];
        var lstFeatCombinedLC = catsLCNoWater.map(function (i) {
            var v1 = ftc.first().get(i + '_1');
            var v2 = ftc.first().get(i + '_2');
            var v3 = ftc.first().get(i + '_3');
            var v4 = ftc.first().get(i + '_4');
            var v5 = ftc.first().get(i + '_5');
            var lstValues = ee.List([m.lv.lcBase.names[i - 1], v1, v2, v3, v4, v5]);
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
            var lstValues = ee.List([m.lv.lcBase.names[i - 1], mean, m.lv.lcBase.vis.palette[i - 1]]);
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
            var lstValues = ee.List([m.lv.lcBase.names[i - 1], v1, v2, v3, v4, v5, mean]);
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
            var lstValues = ee.List([m.lv.lcBase.names[i - 1]]).cat(values);
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
        var ftc = m.precalculated ? m.ftcAoi : mdlPrecalculation.precalculate(m.ftcAoi,
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
            if (panelIndex < m.mcLayerEntries.length) {
                var selectedCatNumbers = [];
                panel.widgets().forEach(function (element, index) {
                    if (index > 0) { // title
                        if (element.widgets().get(1).getValue()) {
                            var pidx = m.mcLayerEntries[panelIndex].names.indexOf(element.widgets().get(1).getLabel());
                            selectedCatNumbers.push(m.mcLayerEntries[panelIndex].categories[pidx]);
                        }
                    }
                });
                selectedPerSection.push(selectedCatNumbers);
                if (selectedCatNumbers.length > 0) {
                    filteredImages.push(getFilteredImage(m.mcLayerEntries[panelIndex].image, selectedCatNumbers));
                }
            }
        });
        var imgProduct = ee.Image(1).clip(m.ftcAoi);
        filteredImages.forEach(function (f, i) {
            //c.cp.map.addLayer(f, m.lv.custom.vis, 'test ' + i, true);
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
                    print('best effort back');
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
        for (var p = 0; p < m.mcLayerEntries.length; p++) {
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
        for (var p = 0; p < m.mcLayerEntries.length; p++) {
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
    m.ftcLelvelRg = ftc01;
    m.ftcAoi = ftc0;
    m.levelAoi = m.labels.lblSelectContainer;
    m.haAoi = 0;
    m.precalculated = true;
    // Countries names for dropdown
    //m.names1 = m.ftcLelvel1.aggregate_array('ADM1_NAME').getInfo();
    m.names1 = m.ftcLelvel1.aggregate_array('name').getInfo();
    m.codes1 = m.ftcLelvel1.aggregate_array('ADM1_CODE').getInfo();
    //m.codes1 = m.ftcLelvel1.aggregate_array('OBJECTID').getInfo();
    m.siLevel1 = [];
    for (var i = 0; i < m.names1.length; i++) {
        m.siLevel1.push({
            label: m.names1[i],
            value: m.codes1[i]
        });
    }
    m.siLevel1.sort(sortByLabel);
    c.lp.levels.selLevel1.items().reset(m.siLevel1);
    // Subregion names for dropdown
    m.namesRg = m.ftcLelvelRg.aggregate_array('name').getInfo();
    m.codesRg = m.ftcLelvelRg.aggregate_array('REG_CODE').getInfo();
    m.siLevelRg = [];
    for (var i = 0; i < m.namesRg.length; i++) {
        m.siLevelRg.push({
            label: m.namesRg[i],
            value: m.codesRg[i]
        });
    }
    m.siLevelRg.sort(sortByLabel);
    c.lp.levels.selLevelRg.items().reset(m.siLevelRg);
    showInfoSelectedAoi(); // on load show info of whole country region
    showFrontLayerLegend(); // on load show the last selected general layer legend
    c.lp.boundaries.selBoundariesLayer.setValue(m.labels.lblLevel1); // by default set country boundaries layer selected for map click
    c.cp.map.setControlVisibility(true, false, true, true, true, true, false);
}