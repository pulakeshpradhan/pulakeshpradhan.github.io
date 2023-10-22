var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
var //ftcPA = ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    ftcKBA = ee.FeatureCollection("users/projectgeffao/World/KBAsGlobal_2021_March_01_POL_Fix"),
    imgFireIndex = ee.Image("users/projectgeffao/World/FireRecurrenceIndex_MCD64_2001_2021_World"),
    imgPrecipitationTrend = ee.Image("users/projectgeffao/World/Climate/PrecipTrendIndex_World_2011_2021"),
    imgTerrain = ee.Image("users/angelini_hernan/Bhutan/Terrain_rgb3b_Bhutan"),
    LULC = ee.Image("users/wocatapps/Bhutan/imgLULC2016_20cat"),    
    ftc0 = ee.FeatureCollection("users/wocatapps/Bhutan/BTN_Precal_Level0_v8_NBe"),
    ftc1 = ee.FeatureCollection("users/wocatapps/Bhutan/BTN_Precal_Level1_v8_NBe"),
    ftc2 = ee.FeatureCollection("users/wocatapps/Bhutan/BTN_Precal_Level2_v8_NBe"),
    ftcHot = ee.FeatureCollection("users/wocatapps/Bhutan/BTN_Precal_HotSpot_v8_NBe"),
    ftcBasinsL8_Country = ee.FeatureCollection("users/wocatapps/Bhutan/BTN_Precal_Basin8_v8_NBe"),
    ftcVTarget = ee.FeatureCollection("users/wocatapps/Bhutan/BTN_Precal_VTarget_v8_NBe"),
    ftcMinesIA = ee.FeatureCollection("users/wocatapps/Bhutan/BTN_Precal_MinesIA_v8_NBe"),
    ftcIrrigLd = ee.FeatureCollection("users/angelini_hernan/Bhutan/IrrigatedLand6cat"),
    ftcIrrL = ee.FeatureCollection("users/angelini_hernan/Bhutan/BTN_Precal_IrrLand_v7b_NBe"),
    ftcBTNPA = ee.FeatureCollection("users/wocatapps/Bhutan/BTN_Precal_BTNPA_v8_NBe"),
    ftcBasinsL8_View = ee.FeatureCollection("users/wocatapps/Bhutan/MajorBasinsAll"),
    ftcSLM = ee.FeatureCollection("users/angelini_hernan/Bhutan/SLM_Bhutan"); 
var soc7cat = ee.Image("users/angelini_hernan/Bhutan/Natsoc7cat_250m");
//    ftcBasinsL11_Country = ee.FeatureCollection("users/angelini_hernan/Bhutan/BTN_Precal_Basin11_v1_NBe");
var imgBaseDeg = ee.Image("users/wocatapps/Bhutan/LandCover/ESA_LC_BaselineLayers_UNCCD_CAT_Bhutanversion3").select('lc_degradation_2000_2015');
var imgRepoDeg = ee.Image("users/wocatapps/Bhutan/LandCover/ESA_LC_ReportingLayers_UNCCD_CAT_Bhutanversion3").select('lc_degradation_2015_2019');
var lp_01_15 = ee.Image("users/wocatapps/World/LPD_2001_2015_World_MK_MTDI3_Des025").toByte().clip(ftc0).selfMask();
var lp_05_19 = ee.Image("users/wocatapps/World/LPD_2005_2019_World_MK_MTDI3_Des025").toByte().clip(ftc0).selfMask();
var sc_01_15 = ee.Image("users/projectgeffao/World/SOC_globe_2001-2015_deg").toByte().clip(ftc0);
var sc_15_19 = ee.Image("users/projectgeffao/World/SOC_globe_2015-2019_deg").toByte().clip(ftc0);
    sc_01_15 = sc_01_15.where(sc_01_15.eq(0),2);
    sc_15_19 = sc_15_19.where(sc_15_19.eq(0),2);
//---------------------------------------
// load Bhutan soil layers
//---------------------------------------
var SoilType = ee.Image("users/wocatapps/Bhutan/SoilType_map_10"); //SoilType
var Availk = ee.Image("users/wocatapps/Bhutan/Soil/AvailK_0_30_mean_5cat"); //Potassium
var AvailP = ee.Image("users/wocatapps/Bhutan/Soil/AvailP_0_30_mean_4cat"); //Phosphate
var BS = ee.Image("users/wocatapps/Bhutan/Soil/BS_0_30_mean_5cat");  // BS
var CEC = ee.Image("users/wocatapps/Bhutan/Soil/CEC_0_30_mean_5cat"); // CEC
var CNRatio = ee.Image("users/wocatapps/Bhutan/Soil/CNRatio_0_30_mean_5cat"); // CNRatio
var Ca =  ee.Image("users/wocatapps/Bhutan/Soil/Ca_0_30_mean_5cat"); // Calcium
var Mg2 = ee.Image("users/wocatapps/Bhutan/Soil/Mg2_0_30_mean_5cat"); // Mg2
var Na = ee.Image("users/wocatapps/Bhutan/Soil/Na_0_30_mean_5cat"); // Na
var OC = ee.Image("users/wocatapps/Bhutan/Soil/OC_0_30_mean_5cat"); // OC
var TEB = ee.Image("users/wocatapps/Bhutan/Soil/TEB_0_30_mean_5cat"); // TEB
var TotalN = ee.Image("users/wocatapps/Bhutan/Soil/TotalN_0_30_mean_5cat"); // TotalN
var pHH2O = ee.Image("users/wocatapps/Bhutan/Soil/pHH2O_0_30_mean_5cat"); // pH
var ExcK = ee.Image("users/wocatapps/Bhutan/Soil/K_0_30_mean"); // ExcPotassium    scale error 
//---------------------------------------
// End Bhutan categorized versions
//---------------------------------------
var ftcBasins = ftcBasinsL8_Country;
//var ftcSubbasins = ftcBasinsL11_Country;
/**
 * App: LDN Bhutan
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
 * @author Hernan Angelini (hernanangelini@gmail.com)
 */
/** Modules */
var mdlLegends = require('users/wocatapps/Bhutan:Apps/Legends.js');
var mdlPrecalculation = require('users/wocatapps/Bhutan:Apps/Precalculation_Bhutan.js');
var mdlLocalization = require('users/wocatapps/Bhutan:Apps/Localization_Bhutan.js');
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
// SLM Layer Styled
var paletteSLMList = ee.List(['#db9003', '#49d7e1']); //, '#08964f',
var namesSLMList = ee.List(['Approaches', 'UNCCD']);  //, 'Technologies'
a.ftcSLMStyled = ftcSLM.map(function (f) {
    return f.set({ style: { color: paletteSLMList.get(namesSLMList.indexOf(f.get("Type"))), pointSize: 5 } });
});
// HotSpots Layer Styled
var paletteHS = ee.List(['#fcdb00', '#d7191c', '#cfdad2', '#4458eb']); 
var namesHSList = ee.List(['marginally suitable','moderately suitable','active mines','most suitable']);  
a.ftcHotSpots = ftcHot.map(function (f) {
    return f.set({ style: { color: paletteHS.get(namesHSList.indexOf(f.get("name"))), width: 2 , fillColor: '00000000'} });
});
// BTNPA Layer Styled
var palettePA = ee.List(['#009e0b', '#ffff00', '#9ed297', '#1dc3d2']); 
var namesPAList = ee.List(['Biological Corridor','Nature Reserve','Park','Sanctuary']);  
a.BTNPA = ftcBTNPA.map(function (f) {
    return f.set({ style: { color: palettePA.get(namesPAList.indexOf(f.get("TypeNM"))), width: 2 } }); //, fillColor: '00000000'
});
// Irrigated Layer Styled
var paletteIrr = ee.List(['#fcfb3b30', '#0dfee630', '#fe30ec30', '#55ff0930', '#fc3a1630', '#cb2f1230']); 
var namesIrrList = ee.List([1,2,3,4,5,6]);  
a.ftcIrrigLd = ftcIrrigLd.map(function (f) {
    return f.set({ style: { color: paletteIrr.get(namesIrrList.indexOf(f.get("ClusterID"))), width: 1} }); // , fillColor: '00000020' 
});
ftcIrrL = ftcIrrL.map(function (f) {
    return f.set('name', ee.String(f.get('name')).cat(' - ').cat(f.get('Provincia')));
});
// SDGs
/*
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
*/
// NAT
a.imgSDGBaselineNAT = mdlPrecalculation.imgSDGBaselineNAT.unmask().clip(ftc0);
a.imgSDGReportNAT = mdlPrecalculation.imgSDGReportNAT.unmask().clip(ftc0);
a.imgSDGStatusNAT = mdlPrecalculation.imgSDGStatusNAT.unmask().clip(ftc0);
a.imgSDGComparisonNAT = mdlPrecalculation.imgSDGComparisonNAT.unmask().clip(ftc0);
// From imports
a.imgFireIndex = imgFireIndex.updateMask(1).clip(ftc0);
// For multicriteria calculation
a.imgCustom = ee.Image(0).selfMask();
a.imgMask = ee.Image(0).selfMask();
// Filter global assets
a.ftcKBA = ftcKBA.filter(ee.Filter.eq('ISO3', 'BTN'));
//a.ftcPA = ftcPA.filter(ee.Filter.eq('ISO3', 'BTN')).filterMetadata('DESIG_TYPE', 'equals', 'National');
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
    m.maxAreaHa = 100000;
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
        contactEmail1: 'twangdi@moaf.gov.bt',
        contactEmail2: 'wocat.cde@unibe.ch',
        contactEmail3: '',
        contactEmail4: '',
        logoAssetId: 'users/projectgeffao/',// TODO
        logoDimensions: '716x234',
    };
    // Feature collections options to click on the map to obtain precalculated statistics
    m.assetsClick = {};
    m.assetsClick[m.labels.lblNone] = null;
    m.assetsClick[m.labels.lblLevel1] = ftc1;
    m.assetsClick[m.labels.lblLevel2] = ftc2;
    m.assetsClick[m.labels.lblBasins] = ftcBasins;
    m.assetsClick[m.labels.lblProtectedAreas] = ftcBTNPA;
    m.assetsClick[m.labels.lblHotSpots] = ftcHot;
    m.assetsClick[m.labels.lblVTarget] = ftcVTarget;
    m.assetsClick[m.labels.lblMinesIA] = ftcMinesIA;
    m.assetsClick[m.labels.lblIrrigLd] = ftcIrrL;
    m.assetsClick[m.labels.lblSLM] = ftcSLM;
    //m.assetsClick[m.labels.lblSubbasins] = ftcSubbasins; ftcIrrL
    // Feature collection to query on map click
    m.ftcClickOn = ftc1;
// Layers Visualization
    m.lv = {
        lcNational: {
            vis: {
                min: 1, max: 7, opacity: 1,
                palette: ['#377e3f','#83e70b', '#c19511', '#fcdb00', '#d7191c', '#cfdad2', '#4458eb'],
            },
            names: [
                m.labels.lblTreeCovered,
                m.labels.lblShrubland,
                m.labels.lblGrassland,
                m.labels.lblCropland,
             //   m.labels.lblWetland,
                m.labels.lblArtificial,
                m.labels.lblOtherLand,
                m.labels.lblWaterbody,
            ]
        },
        lc: {
            vis: {
                min: 1, max: 7, opacity: 1,
                palette: ['#377e3f','#83e70b', '#c19511', '#fcdb00', '#d7191c', '#cfdad2', '#4458eb'],
            },
            names: [
                m.labels.lblTreeCovered,
                m.labels.lblShrubland,
                m.labels.lblGrassland,
                m.labels.lblCropland,
                m.labels.lblArtificial,
                m.labels.lblOtherLand,
                m.labels.lblWaterbody,
            ]
        },
        lc20cat: {
            vis: {
                min: 1, max: 20, opacity: 1,
                palette: ['91dad6','71cb5d','149e21','adf6ab','58b0a2','d4e9e7','e2dbe7','eeadea','ffff00','a5a7a7',
                          'e8b442','da5867','efb3c3','a5a7a7','ceced1','916519','847383','ffffff','629de5','323fe4']
            },
            names: ['Bluepine','Mixed Conifer','Broadleaf','Chirpine','Fir','Alpine Scrubs','Shrubs','Meadows','Kamzhing','Orchards','Chhuzhing',
                    'Built up','Non Built up','Rocky Outcrops','Scree','Landslides','Moraines','Snow and Glacier','Lake','Rivers']
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
         soilType: {
            vis: {
                min: 1, max: 7, opacity: 1,
                palette: ["#0000FF","#9ACD32","#006400","#D2691E","#FFD700", "#DEB887", "#00FA9A"],
            },
            names: [
                m.labels.lblAnthraquicCambisols,
                m.labels.lblDystricCambisols,
                m.labels.lblEutricCambisols,
                m.labels.lblHaplicAcrisols,
                m.labels.lblHaplicAlisols,
                m.labels.lblHaplicLixisols,
                m.labels.lblSkeleticCambisols,
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
        /*lcTransitions: { // sin lblShrubland 
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
        },*/
        lcTransitions: {
            vis: {
                min: 0, max: 7, opacity: 1,
                palette: ['#FEFFE5', '#377e3f','#83e70b', '#c19511', '#fcdb00', '#d7191c', '#cfdad2', '#4458eb'],
            },
            names: [
                m.labels.lblNoData,
                m.labels.lblTreeCovered,
                m.labels.lblShrubland,
                m.labels.lblGrassland,
                m.labels.lblCropland,
                m.labels.lblArtificial,
                m.labels.lblOtherLand,
                m.labels.lblWaterbody,
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
        lcDeg: {
            vis: {
                min: 1, max: 3, opacity: 1,
                palette: ['#AB2727', '#e5e5c9', '#45A146'],
            },
            names: [
              //  m.labels.lblNoData,
                m.labels.lblSDGDegrading,
                m.labels.lblSDGStable,
                m.labels.lblSDGImproving,
               //m.labels.lblWaterbody,
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
        // ----  vis soil box
        Availk: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["ffedd6","ffcb95","ffa672","ff8508","ba4703"]},
            names: [m.labels.lblSoilTxtK1, m.labels.lblSoilTxtK2, 
                    m.labels.lblSoilTxtK3, m.labels.lblSoilTxtK4, m.labels.lblSoilTxtK5]
        },        
        AvailP: { 
            vis: {min: 1, max: 4, opacity: 1, 
            palette: ["d4fff7","afd2cb","54c0a7","03916a"]},
            names: [m.labels.lblSoilTxtP1, m.labels.lblSoilTxtP2, 
                    m.labels.lblSoilTxtP3, m.labels.lblSoilTxtP4]
        },
        BS: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["ebf4ff","a2d0e2","6c7eff","a37eff","6a019f"]},
            names: [m.labels.lblSoilTxtBS1, m.labels.lblSoilTxtBS2, 
                    m.labels.lblSoilTxtBS3, m.labels.lblSoilTxtBS4, m.labels.lblSoilTxtBS5]
        },
        CEC: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["effeff","a5f3ff","7e93ff","7e5eff","9521ff"]},
            names: [m.labels.lblSoilTxtCEC1, m.labels.lblSoilTxtCEC2, 
                    m.labels.lblSoilTxtCEC3, m.labels.lblSoilTxtCEC4, m.labels.lblSoilTxtCEC5]
        },
        CNRatio: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["eeffd8","b4e69f","5dc88c","479f03","316e02"]},
            names: [m.labels.lblSoilCN1, m.labels.lblSoilCN2, 
                    m.labels.lblSoilCN3, m.labels.lblSoilCN4, m.labels.lblSoilCN5]
        },
        Ca: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["eeffd8","d6e696","c8c445","7e9f17","6e6b00"]},
            names: [m.labels.lblSoilTxtCa1, m.labels.lblSoilTxtCa2, 
                    m.labels.lblSoilTxtCa3, m.labels.lblSoilTxtCa4, m.labels.lblSoilTxtCa5]
        },
        Mg: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["f3fffc","cfdee0","bbc8ca","889293","5c666c"]},
            names: [m.labels.lblSoilTxtMg1, m.labels.lblSoilTxtMg2, 
                    m.labels.lblSoilTxtMg3, m.labels.lblSoilTxtMg4, m.labels.lblSoilTxtMg5]
        },
        Na: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["f3fffc","a7e0d0","75caba","44b39a","2b7262"]},
            names: [m.labels.lblSoilTxtNa1, m.labels.lblSoilTxtNa2, 
                    m.labels.lblSoilTxtNa3, m.labels.lblSoilTxtNa4, m.labels.lblSoilTxtNa5]
        },
        OC: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["ffe8d8","edb96c","c67941","9b4931","723026"]},
            names: [m.labels.lblSoilTxtOC1, m.labels.lblSoilTxtOC2, 
                    m.labels.lblSoilTxtOC3, m.labels.lblSoilTxtOC4, m.labels.lblSoilTxtOC5]
        },
        TEB: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["fee7d7","ecb86b","c57840","9c4830","712f25"]},
            names: [m.labels.lblSoilTxtTEB1, m.labels.lblSoilTxtTEB2, 
                    m.labels.lblSoilTxtTEB3, m.labels.lblSoilTxtTEB4, m.labels.lblSoilTxtTEB5]
        },
        TN: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["e8ffdc","aaed6d","4ec640","499b2f","277226"]},
            names: [m.labels.lblSoilTxtTN1, m.labels.lblSoilTxtTN2, 
                    m.labels.lblSoilTxtTN3, m.labels.lblSoilTxtTN4, m.labels.lblSoilTxtTN5]
        },
        pH: { 
            vis: {min: 1, max: 5, opacity: 1, 
            palette: ["c02e2e","8a75ca","44b33d","83c1da","718dce"]},
            names: [m.labels.lblSoilTxtpH1, m.labels.lblSoilTxtpH2, 
                    m.labels.lblSoilTxtpH3, m.labels.lblSoilTxtpH4, m.labels.lblSoilTxtpH5]
        },
        // ----  end vis soil box
        soc7cat: { 
            vis: { min: 1, max: 7, opacity: 1, 
            palette: ['fbff12','ffd63f','e7c72b','ff9410','d08008','ab5907','763e04'] },
            names: [ '. < - 40','40 - 60','60 - 80','80 - 100','100 - 120','120 - 140','140 - . >']
        },
        hotpot: {
            vis: {palette: ['#fcdb00', '#d7191c', '#cfdad2', '#4458eb'] },//'#8c5cdb', '#116d68', '#524961', '#f06c00']},
            names: ['marginally suitable','moderately suitable','active mines','most suitable']
        },  
        BTNPA: {
            vis: {palette: ['#009e0b', '#ffff00', '#9ed297', '#1dc3d2'] },
            names: ['Biological Corridor', 'Nature Reserve', 'National Park', 'Wildlife Sanctuary']
        },
        IrrLd: {
            vis: {palette: ['#fcfb3b', '#0dfee6', '#fe30ec', '#55ff09', '#fc3a16', '#cb2f12'] },
            names: ['Class I (> 30 acres)','Class II (20 - 30 acres)','Class III (10 - 20 acres)','Class IV (5 - 10 acres)', 'Class V (3 - 5 acres)', 'Class VI (< 3 acres)']
        },
        borderLevel1: { vis: { color: 'black', fillColor: '00000000' } },
        borderLevel2: { vis: { color: '#838888', fillColor: '00000000', width: 1 } },
        borderBasins: { vis: { color: 'blue', fillColor: '00000000', width: 1 } },
        borderSubbasins: { vis: { color: 'darkgreen', fillColor: '00000000', width: 1 } },
        borderHotSpot: { vis: { color: 'darkgreen', fillColor: '00000000', width: 1 } },
        borderVTarget: { vis: { color: 'darkorange', fillColor: '00000000', width: 1 } },
        borderMinesIA: { vis: { color: 'darkred', fillColor: '00000000', width: 1 } },
        highlight: { vis: { color: '#b040d6', fillColor: '00000000' } },
        soc: { vis: { min: 0, max: 150, palette: ['#fcffac', '#a60000'] } },
        custom: { vis: { max: 1, min: 1, opacity: 1, palette: ['#FF00FF'] } },
        terrain: { vis: { min: 1000, max: 5500, palette: ['#05ff96','006600','006600', '002200', '002200', 'fff700', 'fff700', 'ab7634', 'ab7634', '67471f', '67471f', 'ffffff', 'ffffff']} },
        pa: { vis: { color: 'green', width: 1 } },
        kba: { vis: { color: 'orange' } },
        fireIndex: { vis: { opacity: 1, min: 0, max: 0.5, palette: ['#fcfdbf', '#fc8761', '#b63679', '#50127b', '#000004'] } },
        precipTrend: { vis: { min: -3, max: 3, opacity: 1, palette: ["#d63000", "#ffffff", "#062fd6"] } },
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
        },
        {
            asset: a.imgLastLC,
            style: m.lv.lcNational.vis,
            name: m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLC.name + ') ' + mdlPrecalculation.baseLC.year,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover + ' (' + mdlPrecalculation.baseLC.name + ') ' + mdlPrecalculation.baseLC.year, m.lv.lcNational.names, m.lv.lcNational.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/18WcDHGPGXJv1VjFt_-gNFLxTym1k-h8X/view?usp=sharing'
        },
        {
            asset: LULC,
            style: m.lv.lc20cat.vis,
            name: m.labels.lblLandCover20cat,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandCover20cat, m.lv.lc20cat.names, m.lv.lc20cat.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1Kc93TYyg4KCE8uO0FEGO9ZX9G7VkmP4D/view?usp=share_link'
        },
        {
            asset: a.imgLPD,
            style: m.lv.lpd.vis,
            name: m.labels.lblLandProductivityDynamics,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblLandProductivityDynamics, m.lv.lpd.names, m.lv.lpd.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1z9Ggp83hHNm4p_fWrxSay6Fv4dweqxQ5/view?usp=share_link'
        },
           {
            asset: SoilType,
            style: m.lv.soilType.vis,
            name: m.labels.lblSoilType,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilType, m.lv.soilType.names, m.lv.soilType.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1TlobYT3AXO0W-i9sYr9KReutKdK8w8YL/view?usp=sharing'
        },
        {
            asset: a.imgSOC,
            style: m.lv.soc.vis,
            name: m.labels.lblSocMap,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblSOCTonnesHa, m.lv.soc.vis),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: imgPrecipitationTrend,
            style: m.lv.precipTrend.vis,
            name: m.labels.lblPrecipitationTrend,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblPrecipitationTrend, m.lv.precipTrend.vis, m.labels.lblNegTrend, '', m.labels.lblPosTrend),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1tzUkUBh1t0QNzSTXwVCs1URVzUupwh_J/view?usp=share_link'
        },
        {
            asset: a.imgMountains,
            style: m.lv.mountains.vis,
            name: m.labels.lblMountains,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblMountains, m.lv.mountains.names, m.lv.mountains.vis.palette, false, false),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1wtU5MSpBrP6o9X7GKfJeuWj_cMjqtU3T/view?usp=share_link'
        },
        {
            asset: a.imgNPP,
            style: m.lv.npp.vis,
            name: m.labels.lblNPP,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblNPPLegend, m.lv.npp.vis),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1sXcjeT6W-nTE2eXsDaE2rVVk3KDig-UN/view?usp=share_link'
        },
        {
            asset: a.imgFireIndex,
            style: m.lv.fireIndex.vis,
            name: m.labels.lblFireIndex,
            visible: false,
            legend: mdlLegends.createColorRampLegendPanel(m.labels.lblFireIndex, m.lv.fireIndex.vis, '0.05', '0.25', '0.5'),
            group: 'RASTER',
            citation: 'https://drive.google.com/file/d/1LNs32KKOO6Y29iMdamJWeGSXUywF-KN6/view?usp=share_link'
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
            asset: a.ftcBasinsL8_View,
            style: m.lv.borderBasins.vis,
            name: m.labels.lblBasins,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
//            citation: 'https://www.hydrosheds.org/'
            citation: ''
        },        
        {
            asset: ftcVTarget,
            style: m.lv.borderVTarget.vis,
            name: m.labels.lblVTarget,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: ''
        },
        {
            asset: ftcMinesIA,
            style: m.lv.borderMinesIA.vis,
            name: m.labels.lblMinesIA,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: ''
        },
        {
            asset: a.ftcIrrigLd,
            style: { styleProperty: "style" },
            name: m.labels.lblIrrigLd,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblIrrigLd, m.lv.IrrLd.names, m.lv.IrrLd.vis.palette, false, false),
            group: 'FEATURES',
            //singleColor: 'SQUARE',
            citation: ''
        },
        /*{
            asset: a.ftcBasinsL11_View,
            style: m.lv.borderSubbasins.vis,
            name: m.labels.lblSubbasins,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
        },*/
        {
            asset: a.ftcHotSpots,
            style: { styleProperty: "style" },
            name: m.labels.lblHotSpots,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblHotSpots, m.lv.hotpot.names, m.lv.hotpot.vis.palette, false, false),
            group: 'FEATURES',
            citation: ''
        },
        {
            asset: a.ftcSLMStyled,
            style: { styleProperty: "style" },
            name: m.labels.lblSLM,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSLM, m.lv.slm.names, m.lv.slm.vis.palette, false, true),
            group: 'FEATURES',
            citation: 'https://qcat.wocat.net/es/wocat/list/?type=wocat&q=Bhutan'
        },
        {
            asset: a.ftcKBA,
            style: m.lv.kba.vis,
            name: m.labels.lblKeyBiodiversityAreas,
            visible: false,
            legend: null,
            group: 'FEATURES',
            singleColor: 'SQUARE',
            citation: 'https://drive.google.com/file/d/1b3qqv1EcTFK_aeJtN2sFR7-XncxWTn9U/view?usp=share_link'
        },
        {
            asset: a.BTNPA,
            style: { styleProperty: "style" },
            name: m.labels.lblProtectedAreas,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblProtectedAreas, m.lv.BTNPA.names, m.lv.BTNPA.vis.palette, false, false),
            group: 'FEATURES',
            //singleColor: 'SQUARE',
            citation: 'https://drive.google.com/file/d/1cwhbR9FvCZICPsjjEh57ECGxxY_LRduF/view?usp=share_link'
        },
    ];
    // SDG
    m.SDGLayerEntries = [
        //SDG 15.3.1 from Default JRC
        // NATIONAL
        {
            asset: a.imgSDGBaselineNAT,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531BasNAT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531BasNAT, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGReportNAT,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531RepNAT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531RepNAT, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGStatusNAT,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531StaNAT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531StaNAT, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
            group: 'RASTER',
            citation: ''
        },
        {
            asset: a.imgSDGComparisonNAT,
            style: m.lv.sdg1531.vis,
            name: m.labels.lblSDG1531ComNAT,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSDG1531ComNAT, m.lv.sdg1531.names, m.lv.sdg1531.vis.palette, false, false),
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
/*        {
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
*/        
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
        },
          {
            asset: m.selectedSource.imgTransitions.select('lc_degradation_' + m.selectedSource.yearsLC[0] + '_' + m.selectedSource.lastYear).clip(ftc0),
            style: m.lv.lcDeg.vis,
            label: m.labels.lblStateLayer,
            name: m.labels.lblStateLayer + ' ' + m.selectedSource.yearsLC[0] + ' - ' + m.selectedSource.lastYear,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblStateLayer, m.lv.lcDeg.names, m.lv.lcDeg.vis.palette, false, false),
        }];
    m.SoilGroupLayerEntries = [ // Soil layers
        {
            asset: Availk,
            style: m.lv.Availk.vis,
            name: m.labels.lblSoilK,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilKlg, m.lv.Availk.names, m.lv.Availk.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: AvailP,
            style: m.lv.AvailP.vis,
            name: m.labels.lblSoilP,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilPlg, m.lv.AvailP.names, m.lv.AvailP.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: BS,
            style: m.lv.BS.vis,
            name: m.labels.lblSoilBS,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilBSlg, m.lv.BS.names, m.lv.BS.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: CEC,
            style: m.lv.CEC.vis,
            name: m.labels.lblSoilCEC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilCEClg, m.lv.CEC.names, m.lv.CEC.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: CNRatio,
            style: m.lv.CNRatio.vis,
            name: m.labels.lblSoilCN,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilCNlg, m.lv.CNRatio.names, m.lv.CNRatio.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: Ca,
            style: m.lv.Ca.vis,
            name: m.labels.lblSoilCa,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilCalg, m.lv.Ca.names, m.lv.Ca.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: Mg2,
            style: m.lv.Mg.vis,
            name: m.labels.lblSoilMg,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilMglg, m.lv.Mg.names, m.lv.Mg.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: Na,
            style: m.lv.Na.vis,
            name: m.labels.lblSoilNa,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilNalg, m.lv.Na.names, m.lv.Na.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: OC,
            style: m.lv.OC.vis,
            name: m.labels.lblSoilOC,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilOClg, m.lv.OC.names, m.lv.OC.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: TEB,
            style: m.lv.TEB.vis,
            name: m.labels.lblSoilTEB,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilTEBlg, m.lv.TEB.names, m.lv.TEB.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: TotalN,
            style: m.lv.TN.vis,
            name: m.labels.lblSoilTN,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilTNlg, m.lv.TN.names, m.lv.TN.vis.palette, false, false),
            group: 'RASTER',
        },
        {
            asset: pHH2O,
            style: m.lv.pH.vis,
            name: m.labels.lblSoilpH,
            visible: false,
            legend: mdlLegends.createDiscreteLegendPanel(m.labels.lblSoilpHlg, m.lv.pH.names, m.lv.pH.vis.palette, false, false),
            group: 'RASTER',
        }];
    m.namesLayers = [];
    m.mcEntries = [
        {
            title: m.labels.lblLandCover,
            palette: m.lv.lcNational.vis.palette,
            names: m.lv.lcNational.names,
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
            title: m.labels.lblMountains,
            palette: m.lv.mountains.vis.palette,
            names: m.lv.mountains.names,
            image: a.imgMountains.unmask(),
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
            title: m.labels.lblSoilType,
            palette: m.lv.soilType.vis.palette,
            names: m.lv.soilType.names,
            image: SoilType.unmask(),
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
        {
            title: m.labels.lblSDG1531BasNAT,
            palette: m.lv.sdg1531.vis.palette.slice(0,4),
            names: m.lv.sdg1531.names.slice(0,4),
            image: a.imgSDGBaselineNAT,
            categories: [0, 1, 2, 3,],
        },
          {
            title: m.labels.lblSDG1531RepNAT,
            palette: m.lv.sdg1531.vis.palette.slice(0,4),
            names: m.lv.sdg1531.names.slice(0,4),
            image: a.imgSDGReportNAT,
            categories: [0, 1, 2, 3,],
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
        items: ['English'],//, 'Spanish'],
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
        items: ['ESA BTN'],
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
    c.lp.soil.lblLayerSoilGroupRef = ui.Label(m.labels.lblLayerSoilGroupRef).setUrl('https://www.nssc.gov.bt/');// https://wocatapps.users.earthengine.app
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
    //c.lp.pnlControl.add(c.lp.flyTo.lblFlyTo);
    //c.lp.pnlControl.add(c.lp.flyTo.pnlFlyTo);
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
    //c.lp.pnlControl.add(c.lp.sdg.lblGlobalAppSDG);
    c.lp.pnlControl.add(c.lp.mc.btnMcAnalysis);
    c.lp.pnlControl.add(c.lp.mc.pnlContainer);
    c.lp.pnlControl.add(c.lp.tr.btnTransitions);
    c.lp.pnlControl.add(c.lp.tr.pnlContainer);
    c.lp.pnlControl.add(c.lp.soil.btnLayerSoilGroup);
    c.lp.pnlControl.add(c.lp.soil.pnlContainer);
    c.lp.pnlControl.add(c.lp.soil.lblLayerSoilGroupRef);
    c.lp.pnlControl.add(c.lp.op.pnlSlider);
    c.lp.pnlControl.add(c.lp.dt.btnDrawingTools);
    c.lp.pnlControl.add(c.lp.dt.pnlContainer);
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
    c.cp.map.style().set('cursor', 'crosshair');
    c.cp.slm.pnlSLM.style().set({ width: '300px', shown: false, position: "bottom-right" });
    c.cp.slm.lblSLMTitle.style().set(s.styleInfoTitle);
    Object.keys(c.cp.slm.ge).forEach(function (key) {
        c.cp.slm.ge[key].widgets().get(0).style().set({ stretch: 'horizontal' });
    });
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
            c.cp.map.centerObject(gmyPoint, 10);
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
    // Add on check/uncheck functionality to Soil layers entries
    c.lp.soil.pnlContainer.widgets().forEach(function (w) {
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
            ];
            f = ee.Feature(null).copyProperties(selectedArea, statslCols);
        }
        else {
            // Calculate all statistics required for info panel
            var ftcSampleStats = mdlPrecalculation.precalculate(
                m.ftcAoi,
                m.bestEffort,
                ['p_lpd',
                'p_SoilType',
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
        c.cp.slm.pnlSLM.style().set({ shown: false });
        if (Object.keys(m.evalSet).length === 0 && !c.lp.dt.pnlContainer.style().get('shown')) {
            if (m.ftcClickOn === null) {
                c.rp.pnlMessages.style().set({ shown: true });
                c.rp.lblMessages.setValue(m.labels.lblSelectLayer);
                return;
            }
            c.rp.lblMessages.setValue('');
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
                        var f = ee.Feature(null).copyProperties(ftcSLMSelected.first(), ['Name', 'Link', 'Brief Desc', 'Name2']);
                        f.evaluate(function (ef, error) {
                            delete m.evalSet["slm"];
                            if (Object.keys(m.evalSet).length === 0) {
                                handleEvaluating(false);
                            }
                            if (ef) {
                                if (c.lp.lan.value === 'Spanish') {
                                  c.cp.slm.lblSLMTitle.setValue(ef.properties['Name2']);
                                  c.cp.slm.ge.pnlEntryLink.widgets().get(0).setValue(m.labels.lblLink).setUrl(ef.properties['Link']);
                                  c.cp.slm.ge.pnlEntryDescription.widgets().get(0).setValue(ef.properties['Brief Desc']);
                                }
                                else {
                                  c.cp.slm.lblSLMTitle.setValue(ef.properties['Name']);
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
        c.lp.soil.pnlContainer.style().set({ shown: false });
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
    /** Selects Honduras */
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
            ['p_lc', 'p_lpd', 'p_soilType', 'p_hansen', 'p_ndvi_annual', 'p_x2', 'pro_kba']);
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
        //  SoilType PIE CHART       
        var lstFeatSoilType = mdlPrecalculation.namesSoilTypeColumns.slice(1).map(function (pName, i) { // slice(1)=lpd_0
            var lstValues = ee.List([m.lv.soilType.names[i], ftc.first().get(pName)]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderSoilType = ee.List([
            [
                { label: 'SoilType', role: 'domain', type: 'string' },
                { label: 'Value', role: 'data', type: 'number' },
            ],
        ]);
        var optionsSoilType = {
            title: m.labels.lblSoilType,
            height: 350,
            legend: { position: 'top', maxLines: 1 },
            colors: m.lv.soilType.vis.palette,
            pieHole: 0.4
        };
        createChart(lstHeaderSoilType.cat(ee.FeatureCollection(lstFeatSoilType).aggregate_array('row')), optionsSoilType, 'PieChart', 
        createChartPanel(c.rp.charts.pnlGeneralCharts));
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
            [ 'p_SDG_Baseline_NAT', 'p_SDG_Report_NAT', 'p_SDG_Status_NAT', 'p_SDG_Comparison_NAT',
 //             'p_SDG_Baseline_JRC', 'p_SDG_Report_JRC', 'p_SDG_Status_JRC', 'p_SDG_Comparison_JRC',
 //               'p_SDG_Baseline_FAO_WOCAT', 'p_SDG_Report_FAO_WOCAT', 'p_SDG_Status_FAO_WOCAT', 'p_SDG_Comparison_lcDeg',
 //               'p_SDG_Baseline_TE', 'p_SDG_Report_TE', 'p_SDG_Status_TE', 'p_SDG_Comparison_FAO_TE'
            ]);
        var columnsPrefix = ['SDG_Bas', 'SDG_Rep', 'SDG_Sta', 'SDG_Com'];
        var layerTypes = [m.labels.lblBaseline, m.labels.lblReport, m.labels.lblStatus, m.labels.lblComparison];
        // SDG FAO WOCAT
        var lstFeatCombinedFAOAdvanced = columnsPrefix.map(function (cat, i) {
            var v0 = ftc.first().get(cat + '_NAT_0');
            var v1 = ftc.first().get(cat + '_NAT_1');
            var v2 = ftc.first().get(cat + '_NAT_2');
            var v3 = ftc.first().get(cat + '_NAT_3');
            var lstValues = ee.List([layerTypes[i], v0, v1, v2, v3]);
            return ee.Feature(null, { row: lstValues });
        });
        var lstHeaderCombinedFAOAdvanced = ee.List([
            [
                { label: 'National', role: 'domain', type: 'string' },
                { label: m.lv.sdg1531.names[0], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[1], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[2], role: 'data', type: 'number' },
                { label: m.lv.sdg1531.names[3], role: 'data', type: 'number' },
            ],
        ]);
        var optionsCombinedFAOAdvanced = {
            title: m.labels.lblSDG1531NAT,
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: 'percent',
            colors: m.lv.sdg1531.vis.palette,
        };
        createChart(lstHeaderCombinedFAOAdvanced.cat(ee.FeatureCollection(lstFeatCombinedFAOAdvanced).aggregate_array('row')), optionsCombinedFAOAdvanced, 'BarChart', createChartPanel(c.rp.charts.pnlSDGCharts));
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
*/
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
        var colsT2 = [{ label: m.labels.lblLC + mdlPrecalculation.baseLC.year + '/' + m.labels.lblLPD, role: 'domain', type: 'string' }];
        m.lv.lpd.names.slice(1).forEach(function (lpd) {
            colsT2.push({ label: lpd, role: 'data', type: 'number' });
        });
        var lstHeaderLCLPDTable = ee.List([colsT2]);
        var optionsLCTLPDTable = {
            title: m.labels.lblTableLCLPD,
            initial: mdlPrecalculation.baseLC.year,
            final: mdlPrecalculation.baseLC.year,
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
            };
            createChart(lstHeaderDeg.cat(ee.FeatureCollection(lstFeatDeg)
                .aggregate_array('row')), optionsDeg, 'PieChart',
                createChartPanel(c.rp.charts.pnlTransitionsCharts));
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