// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $    AUGUST -AUTOMATED GEOPROCESSING ENVIRONMENT CLOUD-BASED  $
// $ =========================================================== $
// $ @tool     : APP MONITORING CROPS SENTINEL-2 BASED           $
// $ @autor    : Lucio Villa                                     $
// $ @e-mail   : luciovilla60@gmail.com                          $
// $ @website  : luciovilla.blogspot.pe                          $
// $ @revision : v3.2 - 17/01/2020                               $
// $                                                             $
// $ (c) 2020 Lucio Villa.                                       $
// $ ............................................................$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Update: 27-abr-2020
// var mapaGoogle=ui.root.widgets().get(0);
//*******************************************************************************************
// 1. Area of Interest (AOI) 
//*******************************************************************************************
/*
var Puntos2020 = ee.Geometry.MultiPoint(
        [[-54.06,-11.92],
         [-54.06,-12.57],
         [-53.58,-10.39],
         [-53.55,-10.45],
         [-54.05,-11.90],
         [-54.88,-11.95],
         [-54.89,-11.97],
         [-54.86,-11.97],
         [-54.21,-11.72],
         [-58.52,-12.76],
         [-55.04,-11.62],
         [-55.13,-10.99],
         [-52.03,-12.91],
         [-56.86,-12.73],
         [-52.23,-11.54],
         [-53.96,-13.54],
         [-53.86,-13.24],
         [-59.57,-7.00],
         [-63.31,-8.58],
         [-63.31,-8.58],
         [-59.19,-6.88],
         [-59.97,-6.56],
         [-59.12,-6.79],
         [-59.42,-7.04],
         [-61.76,-7.89],
         [-59.15,-6.82],
         [-54.84,-12.53],
         [-53.54,-6.58],
         [-53.38,-6.55],
         [-53.39,-6.62],
         [-60.08,-6.98],
         [-59.56,-7.27],
         [-62.64,-8.71],
         [-59.66,-7.30],
         [-59.03,-6.94],
         [-59.05,-6.88],
         [-58.51,-11.68],
         [-57.30,-9.31],
         [-61.44,-8.14],
         [-61.76,-8.04],
         [-50.95,-5.27],
         [-58.89,-6.57],
         [-55.80,-7.03],
         [-53.25,-6.42],
         [-53.51,-6.20],
         [-59.73,-6.97],
         [-59.24,-6.91],
         [-59.65,-6.84],
         [-58.65,-6.60],
         [-60.91,-7.68],
         [-53.16,-6.49],
         [-55.48,-7.17],
         [-61.13,-7.70],
         [-54.73,-10.91],
         [-52.85,-6.44],
         [-52.84,-7.09],
         [-53.83,-5.93],
         [-59.16,-6.81],
         [-53.66,-6.23],
         [-59.28,-6.83],
         [-59.30,-6.95],
         [-60.18,-5.28],
         [-53.41,-6.33],
         [-52.75,-10.24],
         [-53.92,-11.27],
         [-52.65,-6.39],
         [-52.83,-6.89],
         [-61.18,-7.68],
         [-61.22,-7.66],
         [-53.96,-11.31],
         [-54.86,-8.31],
         [-57.71,-5.81],
         [-60.00,-5.18],
         [-52.77,-10.23],
         [-56.16,-12.15],
         [-55.22,-6.62],
         [-56.61,-6.97],
         [-59.29,-6.78],
         [-59.14,-10.26],
         [-58.71,-6.62],
         [-55.37,-4.07],
         [-59.80,-6.77],
         [-61.48,-8.12],
         [-61.38,-8.23],
         [-57.58,-9.17],
         [-53.11,-6.63],
         [-55.47,-7.18], 
         [-55.50,-7.40],
         [-59.47,-7.11],
         [-59.73,-7.39],
         [-55.05,-7.93],
         [-63.80,-7.49],
         [-53.47,-6.25],
         [-60.04,-6.59],
         [-66.75,-8.78],
         [-66.77,-9.55],
         [-62.58,-8.59],
         [-59.79,-9.51],
         [-55.68,-6.64],
         [-59.41,-7.03],
         [-63.07,-7.03],
         [-64.31,-9.53],
         [-54.42,-12.30],
         [-55.02,-7.87],
         [-55.21,-6.28],
         [-61.41,-7.76],
         [-63.54,-7.46],
         [-55.71,-5.80],
         [-63.24,-8.66],
         [-55.74,-6.11],
         [-61.10,-7.82],
         [-59.30,-7.13],
         [-53.79,-6.11],
         [-55.02,-7.87]
        // [-58.22,-17.30],
        // [-58.40,-17.16],
        // [-55.71,-16.55],
        // [-61.41,-17.36],
        // [-58.23,-11.98], 
        // [-62.64,-9.82],
        // [-57.13,-12.24]
         ]);
*/
// ##### DATES MODIFY ################
var annee = ['2020','2020','2020','2020']; 
var mois  = ['05','08','08','08'];
var jours = ['28','04','05','06'];
var update_app = 'Updated: Aug 07, 2020';// | UTC/GMT';
// ##### SELECT DATES MODIFY ############################
// ++
var dateApp4 = annee[3]+mois[3]+jours[3];
var dateApp4i = annee[3]+mois[3]+jours[3]+"i";
var dateApp4ii = annee[3]+mois[3]+jours[3]+"ii";
var dateApp4iii = annee[3]+mois[3]+jours[3]+"iii";
var dateApp4iv = annee[3]+mois[3]+jours[3]+"iv";
//
var dateApp3 = annee[2]+mois[2]+jours[2];
var dateApp3i = annee[2]+mois[2]+jours[2]+"i";
var dateApp3ii = annee[2]+mois[2]+jours[2]+"ii";
var dateApp3iii = annee[2]+mois[2]+jours[2]+"iii";
var dateApp3iv = annee[2]+mois[2]+jours[2]+"iv";
//
var dateApp2 = annee[1]+mois[1]+jours[1];
var dateApp2i = annee[1]+mois[1]+jours[1]+"i";
var dateApp2ii = annee[1]+mois[1]+jours[1]+"ii";
var dateApp2iii = annee[1]+mois[1]+jours[1]+"iii";
var dateApp2iv = annee[1]+mois[1]+jours[1]+"iv";
//
var dateApp1= annee[0]+mois[0]+jours[0];
var dateApp1i= annee[0]+mois[0]+jours[0]+"i";
var dateApp1ii= annee[0]+mois[0]+jours[0]+"ii";
var dateApp1iii= annee[0]+mois[0]+jours[0]+"iii";
var dateApp1iv= annee[0]+mois[0]+jours[0]+"iv";
// ###############################################
// ++
var S5P_dateApp4 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4;
var S5P_dateApp4i = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4i;
var S5P_dateApp4ii = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4ii;
var S5P_dateApp4iii = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4iii;
var S5P_dateApp4iv = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4iv;
//
var S5P_dateApp3 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp3;
var S5P_dateApp3i = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp3i;
var S5P_dateApp3ii = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp3ii;
var S5P_dateApp3iii = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp3iii;
var S5P_dateApp3iv = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp3iv;
//
var S5P_dateApp2 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp2;
var S5P_dateApp2i = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp2i;
var S5P_dateApp2ii = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp2ii;
var S5P_dateApp2iii = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp2iii;
var S5P_dateApp2iv = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp2iv;
//
var S5P_dateApp1 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp1;
var S5P_dateApp1i = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp1i;
var S5P_dateApp1ii = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp1ii;
var S5P_dateApp1iii = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp1iii;
var S5P_dateApp1iv = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp1iv;
// ++
var MODIS_Suomi_dateApp4 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp4;
var MODIS_Suomi_dateApp3 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp3;
var MODIS_Suomi_dateApp2 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp2;
var MODIS_Suomi_dateApp1 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp1;
var MODIS_Suomi_dateApp0 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + '20190813';
// ++
var S5P_title4 = 'Aerosol (Sentinel-5): ' + annee[3] + '/'+ mois[3]+ '/' + jours[3] ;
var S5P_title3 = 'Aerosol (Sentinel-5): ' + annee[2] + '/'+ mois[2]+ '/' + jours[2] ;
var S5P_title2 = 'Aerosol (Sentinel-5): ' + annee[1] + '/'+ mois[1]+ '/' + jours[1] ;
var S5P_title1 = 'Aerosol (Sentinel-5): ' + annee[0] + '/'+ mois[0]+ '/' + jours[0] ;
var Alerts_title4 = 'Fire Alerts (VIIRS): ' + annee[3] + '/'+ mois[3]+ '/' + jours[3] ;
var Alerts_title3 = 'Fire Alerts (VIIRS): ' + annee[2] + '/'+ mois[2]+ '/' + jours[2] ;
var Alerts_title2 = 'Fire Alerts (VIIRS): ' + annee[1] + '/'+ mois[1]+ '/' + jours[1] ;
var Alerts_title1 = 'Fire Alerts (VIIRS): ' + annee[0] + '/'+ mois[0]+ '/' + jours[0] ;
// ######################################################################################
// var S5P_20200625i = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200625i"),
//     S5P_20200625ii = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200625ii"),
//     S5P_20200625iii = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200625iii"),
//     S5P_20200625iv = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200625iv");
// var collectionS5P_20200625 = ee.ImageCollection([S5P_20200625i,S5P_20200625ii,S5P_20200625iii,S5P_20200625iv]);
// var S5P_20200626i = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200626i"),
//     S5P_20200626ii = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200626ii"),
//     S5P_20200626iii = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200626iii"),
//     S5P_20200626iv = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200626iv");
// var collectionS5P_20200626 = ee.ImageCollection([S5P_20200626i,S5P_20200626ii,S5P_20200626iii,S5P_20200626iv]);
// var S5P_20200627i = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200627i"),
//     S5P_20200627ii = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200627ii"),
//     S5P_20200627iii = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200627iii"),
//     S5P_20200627iv = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200627iv");
// var collectionS5P_20200627 = ee.ImageCollection([S5P_20200627i,S5P_20200627ii,S5P_20200627iii,S5P_20200627iv]);
// var S5P_20200628i = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200628i"),
//     S5P_20200628ii = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200628ii"),
//     S5P_20200628iii = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200628iii"),
//     S5P_20200628iv = ee.Image("projects/ACCA-SERVIR/S5P/S5_NRTI_L3_AI_20200628iv");
// var collectionS5P_20200628 = ee.ImageCollection([S5P_20200628i,S5P_20200628ii,S5P_20200628iii,S5P_20200628iv]);
// var S5_NRTI_L3_AI_20200625 = collectionS5P_20200625.mosaic();
// var S5_NRTI_L3_AI_20200626 = collectionS5P_20200626.mosaic();
// var S5_NRTI_L3_AI_20200627 = collectionS5P_20200627.mosaic();
// var S5_NRTI_L3_AI_20200628 = collectionS5P_20200628.mosaic();
// var S5P_img1 = S5_NRTI_L3_AI_20200625;
// var S5P_img2 = S5_NRTI_L3_AI_20200626;
// var S5P_img3 = S5_NRTI_L3_AI_20200627;
// var S5P_img4 = S5_NRTI_L3_AI_20200628;
// ######################################################################################
var S5P_img4i = ee.Image(S5P_dateApp4i);
var S5P_img4ii = ee.Image(S5P_dateApp4ii);
var S5P_img4iii = ee.Image(S5P_dateApp4iii);
var S5P_img4iv = ee.Image(S5P_dateApp4iv);
//
var S5P_img3i = ee.Image(S5P_dateApp3i);
var S5P_img3ii = ee.Image(S5P_dateApp3ii);
var S5P_img3iii = ee.Image(S5P_dateApp3iii);
var S5P_img3iv = ee.Image(S5P_dateApp3iv);
//
var S5P_img2i = ee.Image(S5P_dateApp2i);
var S5P_img2ii = ee.Image(S5P_dateApp2ii);
var S5P_img2iii = ee.Image(S5P_dateApp2iii);
var S5P_img2iv = ee.Image(S5P_dateApp2iv);
//
var S5P_img1i = ee.Image(S5P_dateApp1i);
var S5P_img1ii = ee.Image(S5P_dateApp1ii);
var S5P_img1iii = ee.Image(S5P_dateApp1iii);
var S5P_img1iv = ee.Image(S5P_dateApp1iv);
//######################################################################################
// VARIABLES
var RNTB1 = ee.FeatureCollection("users/luciovilla/RNTB"),
    RNTB_ZA_AoI = ee.FeatureCollection("users/luciovilla/Limites_Bolivia_Paraguay_Brasil"),
    bolivia2015 = ee.FeatureCollection("users/luciovilla/Departamentos_Bolivia_2015"),
    ActiveFire_02sep19 = ee.FeatureCollection("users/luciovilla/Active_Fire_Bolivia_02_03_Sep19"),
    ANPBol2018 = ee.FeatureCollection("users/luciovilla/ANP_Bolivia2018"),
    DepBol2015 = ee.FeatureCollection("users/luciovilla/Departamentos_Bolivia2015"),
    // RegionsBoundaries = ee.FeatureCollection("users/luciovilla/Peru_Bolivia_Brasil_Limites_App_Fire"),
    RegionsBoundaries = ee.FeatureCollection("users/luciovilla/Limites/Limites_Politicos_Amazonas_PeruBrasilColombia"),
    SuomiNPP_24feb20 = ee.Image("projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_24feb20"),
    SuomiNPP_23feb20 = ee.Image("projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_23feb20"),
    SuomiNPP_22feb20 = ee.Image("projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_22feb20"),
    // aoi = ee.FeatureCollection("projects/ACCA-SERVIR/Bolivia/Sudamerica_PeruBoliviaBrasilParaguay_WGS84"),
    SuomiNPP_25feb20 = ee.Image("projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP-2020-02-25T00_00_00Z"),
    SuomiNPP_26feb20 = ee.Image("projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP-2020-02-26T00_00_00Z"),
    S5P_26feb20 = ee.Image("projects/ACCA-SERVIR/S5P/S5P_Amazonia_AER_L3_2020_02_26"),
    S5P_25feb20 = ee.Image("projects/ACCA-SERVIR/S5P/S5P_Amazonia_AER_L3_2020_02_25"),
    S5P_24feb20 = ee.Image("projects/ACCA-SERVIR/S5P/S5P_Amazonia_AER_L3_2020_02_24"),
    S5P_23feb20 = ee.Image("projects/ACCA-SERVIR/S5P/S5P_Amazonia_AER_L3_2020_02_23"),
    S5P_22feb20 = ee.Image("projects/ACCA-SERVIR/S5P/S5P_Amazonia_AER_L3_2020_02_22"),
    S5P_27feb20 = ee.Image("projects/ACCA-SERVIR/S5P/S5P_Amazonia_AER_L3_2020_02_27"),
    SuomiNPP_27feb20 = ee.Image("projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP-2020-02-27T00_00_00Z"),
    image = ee.Image("projects/ACCA-SERVIR/S5P/S5P_Amazonia_AER_L3_2020_03_02"),
    ANP_SouthAmerica = ee.FeatureCollection("users/luciovilla/ANP_Nacional_Sudamerica");
//
var SuomiNPP_im6 = ee.Image('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_2019-08-30T00_00_00Z');
var SuomiNPP_im5 = ee.Image('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_2019-08-29T00_00_00Z');
var SuomiNPP_im4 = ee.Image('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_2019-08-28T00_00_00Z');
var SuomiNPP_im3 = ee.Image('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_2019-08-27T00_00_00Z');
var SuomiNPP_im2 = ee.Image('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_2019-08-26T00_00_00Z');
var SuomiNPP_im1 = ee.Image('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_2019-08-25T00_00_00Z');
var SuomiNPP_im0 = ee.Image('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_2019-08-13T00_00_00Z');
//**************************************************************************************************************
// SUOMI
// var SuomiNPP_img4 = ee.Image(MODIS_Suomi_dateApp4);
var SuomiNPP_img4 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp4);
var SuomiNPP_img3 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp3);
var SuomiNPP_img2 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp2);
var SuomiNPP_img1 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp1);
var SuomiNPP_img0 = ee.FeatureCollection('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_20190813');
// S5P
var S5P_img4 = ee.ImageCollection([S5P_img4ii]).mosaic();
// var S5P_img4 = ee.ImageCollection([S5P_img4i,S5P_img4ii,S5P_img4iii,S5P_img4iv]).mosaic();
// var S5P_img4 = ee.ImageCollection([S5P_img4ii]).mosaic();
var S5P_img3 = ee.ImageCollection([S5P_img3ii]).mosaic();
// var S5P_img3 = ee.ImageCollection([S5P_img3i,S5P_img3ii,S5P_img3iii,S5P_img3iv]).mosaic();
// var S5P_img3 = ee.ImageCollection([S5P_img3ii,S5P_img3iii,S5P_img3iv]).mosaic();
var S5P_img2 = ee.ImageCollection([S5P_img2ii]).mosaic();
// var S5P_img2 = ee.ImageCollection([S5P_img2i,S5P_img2ii,S5P_img2iii,S5P_img2iv]).mosaic();
// var S5P_img1 = ee.ImageCollection([S5P_img1i,S5P_img1ii,S5P_img1iii,S5P_img1iv]).mosaic();
// var S5P_img4 = ee.Image(S5P_dateApp4);
// var S5P_img3 = ee.Image(S5P_dateApp3);
// var S5P_img2 = ee.Image(S5P_dateApp2);
var S5P_img1 = ee.Image(S5P_dateApp1);
//**************************************************************************************************************
//
// Regions of PERU
var AMAZONAS =  ee.FeatureCollection("users/luciovilla/AMAZONAS"),
    ANCASH =  ee.FeatureCollection("users/luciovilla/ANCASH"),
    APURIMAC =  ee.FeatureCollection("users/luciovilla/APURIMAC"),
    AREQUIPA =  ee.FeatureCollection("users/luciovilla/AREQUIPA"),
    AYACUCHO =  ee.FeatureCollection("users/luciovilla/AYACUCHO"),
    CAJAMARCA =  ee.FeatureCollection("users/luciovilla/CAJAMARCA"),
    CALLAO =  ee.FeatureCollection("users/luciovilla/CALLAO"),
    CUSCO =  ee.FeatureCollection("users/luciovilla/CUSCO"),
    HUANCAVELICA =  ee.FeatureCollection("users/luciovilla/HUANCAVELICA"),
    HUANUCO =  ee.FeatureCollection("users/luciovilla/HUANUCO"),
    ICA =  ee.FeatureCollection("users/luciovilla/ICA"),
    JUNIN =  ee.FeatureCollection("users/luciovilla/JUNIN"),
    LALIBERTAD =  ee.FeatureCollection("users/luciovilla/LALIBERTAD"),
    LAMBAYEQUE =  ee.FeatureCollection("users/luciovilla/LAMBAYEQUE"),
    LIMA =  ee.FeatureCollection("users/luciovilla/LIMA"),
    LORETO =  ee.FeatureCollection("users/luciovilla/LORETO"),
    MADREDEDIOS =  ee.FeatureCollection("users/luciovilla/MADREDEDIOS"),
    MOQUEGUA =  ee.FeatureCollection("users/luciovilla/MOQUEGUA"),
    PASCO =  ee.FeatureCollection("users/luciovilla/PASCO"),
    PIURA =  ee.FeatureCollection("users/luciovilla/PIURA"),
    PUNO =  ee.FeatureCollection("users/luciovilla/PUNO"),
    SANMARTIN =  ee.FeatureCollection("users/luciovilla/SANMARTIN"),
    TACNA =  ee.FeatureCollection("users/luciovilla/TACNA"),
    TUMBES =  ee.FeatureCollection("users/luciovilla/TUMBES"),
    UCAYALI =  ee.FeatureCollection("users/luciovilla/UCAYALI");
// var some = ee.List(['TUMBES','PIURA','LAMBAYEQUE']);
var some = ee.List(['AMAZONAS','ANCASH','APURIMAC','AREQUIPA','AYACUCHO','CAJAMARCA',
                    'CALLAO','CUSCO','HUANCAVELICA','HUANUCO','ICA','JUNIN','LALIBERTAD',
                    'LAMBAYEQUE','LIMA','LORETO','MADREDEDIOS','MOQUEGUA','PASCO','PIURA',
                    'PUNO','SANMARTIN','TACNA','TUMBES','UCAYALI'])
//
var places = {
  AMAZONAS : AMAZONAS,
  ANCASH : ANCASH,
  APURIMAC : APURIMAC,
  AREQUIPA : AREQUIPA,
  AYACUCHO : AYACUCHO,
  CAJAMARCA : CAJAMARCA,
  CALLAO : CALLAO,
  CUSCO : CUSCO,
  HUANCAVELICA : HUANCAVELICA,
  HUANUCO : HUANUCO,
  ICA : ICA,
  JUNIN : JUNIN,
  LALIBERTAD : LALIBERTAD,
  LAMBAYEQUE : LAMBAYEQUE,
  LIMA : LIMA,
  LORETO : LORETO,
  MADREDEDIOS : MADREDEDIOS,
  MOQUEGUA : MOQUEGUA,
  PASCO : PASCO,
  PIURA : PIURA,
  PUNO : PUNO,
  SANMARTIN : SANMARTIN,
  TACNA : TACNA,
  TUMBES : TUMBES,
  UCAYALI : UCAYALI
};
// Utility functions
// var logo = ee.Image("users/luciovilla/UNALM/ACCA");
var logo = ee.Image("users/luciovilla/Threelogos");
var branding = ui.Thumbnail({
      image:logo,
      params:{bands:['b1','b2','b3'],min:0,max:255},
      // style:{width:'152px',height:'145px',stretch: 'horizontal', textAlign:'center', padding:'5px' }
      style:{width:'205px',height:'197px',/*stretch: 'horizontal',*/ textAlign:'center', padding:'2px' }
      // style:{width:'181px',height:'174px'}
  });
//###########################################################################################################
//*******************************************************************************************
// 2. Adding features/polygons (AOI)
//*******************************************************************************************
//
var limits = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-65.39312219546389, -19.72762069600461],
          [-46.93609094546389, -22.026789439250713],
          [-47.28765344546389, -11.697642967870562],
          [-65.12945032046389, 9.012911731443225],
          [-72.68804407046389, 7.79568041268313],
          [-78.84038782046389, -0.8812919928885373],
          [-76.73101282046389, -8.235632652364183]]]);
var aoi = ee.Geometry.Polygon(
        [[[-127.63, 51.47],
          [-127.63, -55.48567967986198],
          [94.97971724803544, -55.48567967986198],
          [94.97971724803544, 52.79547803794212]]], null, false);
var amazonas_aqueduct = ee.FeatureCollection("users/luciovilla/APP_Fire_Layers/Aqueduct_river_basins_AMAZONAS"),
    amazonas_biogeo = ee.FeatureCollection("users/luciovilla/APP_Fire_Layers/Lim_Biogeografico");
var borderCountries = ee.FeatureCollection('USDOS/LSIB/2013')
                      .filterBounds(limits);
var borderBolivia = ee.FeatureCollection('users/luciovilla/Bolivia/Departamentos_Bolivia');
var emptyLimits = ee.Image().byte();
// Amazonas borders
var emptyAmazonLimits = ee.Image().byte();
var Bolivia_Border = emptyLimits.paint({
  featureCollection: borderBolivia,
  color: 1,
  width: 3
  });
var Amazonas_aqueduc_Border = emptyLimits.paint({
  featureCollection: amazonas_aqueduct,
  color: 1,
  width: 3
  });
var Amazonas_biogeo_Border = emptyLimits.paint({
  featureCollection: amazonas_biogeo,
  color: 1,
  width: 3
  });
// Paint all the polygon edges with the same number and width, display.
var Region_Border = emptyLimits.paint({
  featureCollection: borderCountries,
  color: 1,
  width: 3
  });
var empty = ee.Image().byte();
var ROI_Border = empty.paint({
  featureCollection: RegionsBoundaries,
  color: 1,
  width: 2
});
var emptyANP = ee.Image().byte();
var ANPRegion_Border = empty.paint({
  featureCollection: ANP_SouthAmerica,
  color: 1,
  width: 2
});
//
//*******************************************************************************************
// 3. Adding Legend
//*******************************************************************************************
//
//var Mining_point = /* color: #d63000 */ee.Geometry.Point([-69.977972,-13.038251]);
// List of values
var vizS5p = {min:-2, max:4, palette:["black", "blue", 
"purple", 
"cyan", 
"green", 
"yellow", 
"red"]};
// add the map
//Map.addLayer(P, viz);
// set position of panel
var legendS5P = ui.Panel({
style: {
position: 'middle-left',
padding: '4px 5px',
margin: '10 0 4px 0',
// textAlign: 'left'
}
});
// Create legend title
var legendS5PTitle = ui.Label({
value: 'Aerosol Index',
style: {
fontWeight: 'bold',
fontSize: '12px',
margin: '0 0 4px 0',
padding: '0'
}
});
var legendS5PTitle2 = ui.Label({
  value: 'Sentinel-5P',
  style: {
    fontWeight: 'light',
    //fontStyle: 'italic',
    fontSize: '11px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legendS5P.add(legendS5PTitle);
legendS5P.add(legendS5PTitle2);
// create the legend image
var long = ee.Image.pixelLonLat().select('latitude');
var gradient = long.multiply((vizS5p.max-vizS5p.min)/100.0).add(vizS5p.min);
var legendImage = gradient.visualize(vizS5p);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label("Max: ≥ 4", {fontSize: '11px',fontWeight: 'bold'})
],
});
legendS5P.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
//params: {bbox:'0,0,10,100', dimensions:'10x200'},
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legendS5P.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
// ui.Label(vizS5p['min'],{fontSize: '10px',fontWeight: 'bold'})
ui.Label("Min: ≤ 2",{fontSize: '11px',fontWeight: 'bold'})
],
});
//legendS5P.add(panel);
//Map.add(legend);
legendS5P.add(panel);
//*******************************************************************************************
var palette = ee.List([
  "000000", 
  //"FF9300",
  "85929E",
  //"D1D544",
  //"737369"
])
var names = ee.List([
  2018,
 // 2,
  2013,
  //20,
  //75
]);
var namez = ee.List([
  "Political Boundaries",
  //"FIRMS NRT MODIS C6 Night - 03/Sep",
  "LSIB - International Boundary",
  //"2017",
  //"2016"
]);
//print(palette);
//print(names);
//print(namez);
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  //value: 'Very High Resolution (VHR) Cover',
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var legendTitle2 = ui.Label({
  value: 'Updated: Mar 27, 2020 (GMT-5)',
  style: {
    fontWeight: 'light',
    //fontStyle: 'italic',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
//###### Add the title to the panel
legend.add(legendTitle);
legend.add(legendTitle2);
//####### Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//###### Add color and and names
for (var i = 0; i < 2; i++) {
   var myPercentage = ee.Number(names.get(i).getInfo());
   var myName = ee.String(namez.get(i).getInfo());
   var txt = myName.cat(" (").cat(myPercentage.toInt()).cat(")");
   legend.add(makeRow(palette.get(i).getInfo(),txt.getInfo() ));
  }
//
//#########################################   BAR HORIZONTAL LEGEND ##############################################################
var visBarLegend = {
    min:-1, 
    max:3, 
    opacity: 0.8,
    palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar0 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visBarLegend.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '15px', padding: '4px'},
});
// Create a panel with three numbers for the legend.
var legendLabels0 = ui.Panel({
  widgets: [
    ui.Label("Min: ≤ -1", {margin: '0px 8px',fontSize: '10px',fontWeight: 'bold',textAlign: 'left', stretch: 'horizontal', padding: '8px'}),
    // ui.Label((visBarLegend.max / 2), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label("Max: ≥ 3", {margin: '0px 8px',fontSize: '10px',fontWeight: 'bold',textAlign: 'right', stretch: 'horizontal', padding: '8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle0 = ui.Label({
  value: 'Aerosol Index (Sentinel-5P)',
  style: {fontWeight: 'bold',fontSize: '11px', stretch: 'horizontal',textAlign: 'center'}
});
// Add the legendPanel to the map.
var legendPanelBar = ui.Panel([legendTitle0, colorBar0, legendLabels0]);
//###########################################################################################################################
//****************************Fechas***************
var hoy = new Date();
var today = new Date(hoy.getTime()-(1000*60*60*5*0));
var yesterday = new Date(today.getTime()-(1000*60*60*24*1));
var beforeYesterday = new Date(today.getTime()-(1000*60*60*24*2));
var beforeBeforeYesterday = new Date(today.getTime()-(1000*60*60*24*3));
var beforeBeforeBeforeYesterday = new Date(today.getTime()-(1000*60*60*24*4));
// print(today)
// print("....")
// print(yesterday)
// print("....")
// print(beforeYesterday)
// print("....")
// print(beforeBeforeYesterday)
//**************************
var date2020_fire_1 = [beforeBeforeBeforeYesterday, beforeBeforeYesterday];
var date2020_fire_2 = [beforeBeforeYesterday, beforeYesterday];
var date2020_fire_3 = [beforeYesterday, yesterday];
var date2020_fire_4 = [yesterday, today];
var date2019_august_13 = ['2019-08-13', '2019-08-14'];
var date2019_august_21 = ['2019-08-21', '2019-08-22'];
var date2019_august_22 = ['2019-08-22', '2019-08-23'];
var date2019_august_23 = ['2019-08-23', '2019-08-24'];
var date2019_august_24 = ['2019-08-24', '2019-08-25'];
var date2019_august_25 = ['2019-08-25', '2019-08-26'];
var date2019_august_25 = ['2019-08-25', '2019-08-26'];
var date2019_august_26 = ['2019-08-26', '2019-08-27'];
var date2019_august_27 = ['2019-08-27', '2019-08-28'];
var date2019_august_28 = ['2019-08-28', '2019-08-29'];
var date2019_august_29 = ['2019-08-29', '2019-08-30'];
var date2019_august_30 = ['2019-08-30', '2019-09-01'];
//
var date2019_september_14 = ['2019-09-14', '2019-09-15'];
//
var date2020_june_10 = ['2020-06-10', '2020-06-11'];
var date2020_june_11 = ['2020-06-11', '2020-06-12'];
// var date2020_june_12 = ['2020-06-12', '2020-06-13'];
var date2020_june_13 = ['2020-06-13', '2020-06-14'];
var date2020_june_14 = ['2020-06-14', '2020-06-15'];
var date2020_june_15 = ['2020-06-15', '2020-06-16'];
var date2020_june_16 = ['2020-06-16', '2020-06-17'];
var date2020_june_17 = ['2020-06-17', '2020-06-18'];
var date2020_june_18 = ['2020-06-18', '2020-06-19'];
var date2020_june_19 = ['2020-06-19', '2020-06-20'];
var date2020_june_20 = ['2020-06-20', '2020-06-21'];
var date2020_june_21 = ['2020-06-21', '2020-06-22'];
var date2020_june_22 = ['2020-06-22', '2020-06-23'];
var date2020_june_23 = ['2020-06-23', '2020-06-24'];
var date2020_june_24 = ['2020-06-24', '2020-06-25'];
var date2020_june_25 = ['2020-06-25', '2020-06-26'];
var date2020_june_26 = ['2020-06-26', '2020-06-27'];
var date2020_june_27 = ['2020-06-27', '2020-06-28'];
var date2020_july_06 = ['2020-07-06', '2020-07-07'];
//*******************************************************************************************
// 4. Functions
//*******************************************************************************************
// SUOMI NPP VIIRS FIRMS ALERTS (FROM LANCE)
function FIRMS_VIIRS_FilteredData(table){
  var filteredData = ee.FeatureCollection(table)
    // .filter(ee.Filter.listContains('confidence', 'low'))
      .filter(ee.Filter.neq('confidence', 'low'));
  return filteredData;
}
// SENTINEL-5 NRTI
function S5P_NRT_Selection(date) {
  var S5P_NRTI_AI_dataset = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI');
  //var bandas = ['B2','B3','B4','B8','B12'];
  var sentinel5P_NRTI_AI= S5P_NRTI_AI_dataset
    .select('absorbing_aerosol_index')
    .filterDate(date[0],date[1])
    //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 25))
    //.map(cloudfunction_S2)
    .filterBounds(aoi);
  //print("S5 Imagenes",sentinel5P_NRTI_AI);
  var val_max = 2.0;
  var val_min = -1;
  /*var band_viz = {
  min: val_min,
  max: val_max,
  opacity: 1.0,
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
  };*/
  //sentinel2 = sentinel2.select(bandas);
  var sentinel5P_NRTI_AI_mean = sentinel5P_NRTI_AI.mean();
  //var mosaic_S2_ROI = S2_ROI.mosaic();
  //print('mosaic_S2_RTMDD:', mosaic_S2_RTMDD);
  // var S1_singleDate = S1subSmoothRatio.mosaic();
  //return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B8', 'B3'],min: 0, max: 0.3, gamma: [0.95, 1.1, 1]});
  return sentinel5P_NRTI_AI_mean.visualize({min: val_min, max: val_max, opacity: 1.0,palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]});
}
// //SENTINEL-5 OFFLINE
// function S5P_OFF_Selection(date) {
//   var S5P_NRTI_AI_dataset = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_AER_AI');
//   //var bandas = ['B2','B3','B4','B8','B12'];
//   var sentinel5P_NRTI_AI= S5P_NRTI_AI_dataset
//     .select('absorbing_aerosol_index')
//     .filterDate(date[0],date[1])
//     //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 25))
//     //.map(cloudfunction_S2)
//     .filterBounds(aoi);
//   //print("S5 Imagenes",sentinel5P_NRTI_AI);
//   var val_max = 2.0;
//   var val_min = -1;
//   /*var band_viz = {
//   min: val_min,
//   max: val_max,
//   opacity: 1.0,
//   palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
//   };*/
//   //sentinel2 = sentinel2.select(bandas);
//   var sentinel5P_NRTI_AI_mean = sentinel5P_NRTI_AI.mean();
//   //var mosaic_S2_ROI = S2_ROI.mosaic();
//   //print('mosaic_S2_RTMDD:', mosaic_S2_RTMDD);
//   // var S1_singleDate = S1subSmoothRatio.mosaic();
//   //return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B8', 'B3'],min: 0, max: 0.3, gamma: [0.95, 1.1, 1]});
//   return sentinel5P_NRTI_AI_mean.visualize({min: val_min, max: val_max, opacity: 1.0,palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]});
// }
// //***********************************************************************************************
// // SUOMI NPP - VIIRS
// //************************************************************************************************
//Reference: https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_001_VNP09GA
function SUOMI_Selection(date) {
  var suomiVIIRS_dataset = ee.ImageCollection('NOAA/VIIRS/001/VNP09GA')
                  .filterBounds(aoi)
                  .filter(ee.Filter.date(date[0],date[1]));
  //print(suomiVIIRS_dataset)
  var suomi_FalseColor = suomiVIIRS_dataset
                  .select(['M11', 'I2', 'I1'])
                  .mosaic();
  var suomi_FalseColorVis = {
    min: 0.0,
    max: 5000.0,
    gamma: [1.2, 1.2, 1.2]
  };
return suomi_FalseColor.visualize(suomi_FalseColorVis);
}
//###########################################################################################################
/// Main Panel
//************
var startDateAnalysis = '2020-01-01';
var endDateAnalysis = '2020-02-01';
var start = ui.Panel(
  [
    ui.Label({value:'start:', style:{color:'red'}}),
    ui.Textbox({value:startDateAnalysis, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var end = ui.Panel(
  [
    ui.Label({value:'end:', style:{color:'red'}}),
    ui.Textbox({value:endDateAnalysis, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
//************************************************************
var outName = ui.Panel(
  [
    ui.Label({value:'Output Name:', style:{color:'red'}}),
    ui.Textbox({value:'Sentinel2_Mosaic_', style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
//
var CloudsS2 = ui.Panel(
  [
    ui.Label({value:'Clouds(0-100%):', style:{color:'red'}}),
    ui.Textbox({value:10, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
//###################################################################################
// Visualization parameters
var visTitleAPP = {
  fontWeight: 'bold', 
  fontSize: '14px', 
  width: '195px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'black',
  backgroundColor: 'orange',
  // backgroundColor: '#1D8442',
  textAlign: 'center'
  };
var visTitle = {
  fontWeight: 'bold', 
  fontSize: '14px', 
  width: '195px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'black',
  backgroundColor: 'orange',
  // backgroundColor: '#1D8442',
  textAlign: 'left'
  };
var visLabels = {
  fontWeight: 'bold', 
  fontSize: '13px', 
  width: '195px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'black',
  backgroundColor: 'orange',
  // backgroundColor: '#1D8442',
  textAlign: 'left'
  };
var mainPanel = ui.Panel();
mainPanel.style().set('width', '220px');
var intro = ui.Panel([
  ui.Label({
    value: 'Detecting Fires',
    style: {fontSize: '26px', fontWeight: 'bold'}
  }),
  ui.Label('Click on the map for getting coordinates',{fontSize: '15px'})
]);
mainPanel.add(ui.Label('AMAZON REAL-TIME FIRE MONITORING',visTitleAPP));
mainPanel.add(branding);
mainPanel.add(ui.Label('--- MAAP Initiative ---',{fontSize: '16px', fontWeight: 'bold',textAlign: 'center', stretch: 'horizontal'}));
var updatedData = ui.Label({
  value: update_app,
  style: {
         fontWeight: 'light',
         //fontStyle: 'italic',
         fontSize: '12px',
         margin: '0 0 4px 0',
         padding: '4px 4px 4px 4px',
         textAlign: 'center', 
         stretch: 'horizontal'
         }
});
mainPanel.add(updatedData);
mainPanel.add(ui.Label('Legend:',visLabels));
mainPanel.add(legendPanelBar);
mainPanel.add(ui.Label('Instructions:',visLabels));
mainPanel.add(ui.Label('- Scan map for aerosol emissions of major fires (yellow, orange, red) across Amazon',{fontSize: '12px', width: '195px'}));
mainPanel.add(ui.Label('- Click "Layers" to see date of image (Sentinel 5)',{fontSize: '12px', width: '195px'}));
mainPanel.add(ui.Label('- Click "Layers" to compare with temperature anomaly alerts to pinpoint location of fire',{fontSize: '12px', width: '195px'}));
mainPanel.add(ui.Label('- For context, click "Layers" to add "Protected Areas" and "Departamental Boundaries',{fontSize: '12px', width: '195px'}));
mainPanel.add(ui.Label('Coordinates (WGS-84):',visLabels));
mainPanel.add(ui.Label('For Coordinates, click on map (see below):',{fontSize: '12px'}));
var Sentinel5Pvizi = {
    min:-1, 
    max:3, 
    opacity: 0.8,
    palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
};
var Sentinel5Pvizii = {
    min:-1, 
    max:3, 
    // opacity: 0.8,
    palette: ["black", "blue", "purple", "cyan", "green", "yellow", "orange","red"]
};
//******************************************************************************
Map.addLayer(SUOMI_Selection(date2019_august_13), {},'Image (Suomi): 2019/08/13',0);
// Map.addLayer(SUOMI_Selection(date2019_august_26), {},'Image (Suomi): 2019/08/26',0);
// Map.addLayer(SUOMI_Selection(date2019_august_27), {},'Image (Suomi): 2019/08/27',0);
// Map.addLayer(SUOMI_Selection(date2019_august_28), {},'Image (Suomi): 2019/08/28',0);
// Map.addLayer(SUOMI_Selection(date2019_august_29), {},'Image (Suomi): 2019/08/29',0);
// Map.addLayer(SUOMI_Selection(date2019_august_30), {},'Image (Suomi): 2019/08/30',0);
Map.addLayer(SuomiNPP_img0, {color: 'ff0000', opacity: 0.8}, 'Fire Alerts (VIIRS): 2019/08/13',0);
Map.addLayer(SuomiNPP_img1, {color: 'ff0000', opacity: 0.8}, Alerts_title1,0);
Map.addLayer(SuomiNPP_img2, {color: 'ff0000', opacity: 0.8}, Alerts_title2,0);
// Map.addLayer(ee.FeatureCollection("projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_20200715"), {color: 'ff0000', opacity: 0.8}, 'Fire Alerts (VIIRS): 2020/07/15', 0);
// Map.addLayer(ee.FeatureCollection("projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_20200726"), {color: 'ff0000', opacity: 0.8}, 'Fire Alerts (VIIRS): 2020/07/26', 0);
Map.addLayer(SuomiNPP_img3, {color: 'ff0000', opacity: 0.8}, Alerts_title3, 0);
Map.addLayer(SuomiNPP_img4, {color: 'ff0000', opacity: 0.8}, Alerts_title4, 1,0.8);
Map.addLayer(S5P_NRT_Selection(date2019_august_13), {}, 'Aerosol (Sentinel-5): 2019/08/13',0);
// Map.addLayer(S5P_NRT_Selection(date2019_august_21), {}, 'Aerosol (Sentinel-5): 2019/08/21',0);
// Map.addLayer(S5P_NRT_Selection(date2019_september_14), {}, 'Aerosol (Sentinel-5): 2019/09/14',0);
// Map.addLayer(S5P_NRT_Selection(date2019_august_26), {}, 'Aerosol (Sentinel-5): 2019/08/26',0);
// Map.addLayer(S5P_NRT_Selection(date2019_august_27), {},'Image (Suomi): 2019/08/27',0);
// Map.addLayer(S5P_NRT_Selection(date2019_august_28), {},'Image (Suomi): 2019/08/28',0);
// Map.addLayer(S5P_NRT_Selection(date2019_august_29), {},'Image (Suomi): 2019/08/29',0);
// Map.addLayer(S5P_NRT_Selection(date2019_august_30), {},'Image (Suomi): 2019/08/30',0);
// Map.addLayer(S5P_img1, Sentinel5Pvizi, S5P_title1,0);
// Map.addLayer(S5P_img2, Sentinel5Pvizi, S5P_title2,0);
// Map.addLayer(S5P_img3, Sentinel5Pvizi, S5P_title3,0);
// Map.addLayer(S5P_img4, Sentinel5Pvizii, S5P_title4,1);
// Map.addLayer(S5P_NRT_Selection(date2020_june_10),  {}, 'Aerosol (Sentinel-5): 2020/06/10',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_11),  {}, 'Aerosol (Sentinel-5): 2020/06/11',0,0.5);
//// Map.addLayer(S5P_NRT_Selection(date2020_june_12),  {}, 'Aerosol (Sentinel-5): 2020/06/12',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_13),  {}, 'Aerosol (Sentinel-5): 2020/06/13',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_14),  {}, 'Aerosol (Sentinel-5): 2020/06/14',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_15),  {}, 'Aerosol (Sentinel-5): 2020/06/15',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_16),  {}, 'Aerosol (Sentinel-5): 2020/06/16',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_17),  {}, 'Aerosol (Sentinel-5): 2020/06/17',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_18),  {}, 'Aerosol (Sentinel-5): 2020/06/18',0/*,0.8*/);
// Map.addLayer(S5P_NRT_Selection(date2020_june_19), {}, 'Aerosol (Sentinel-5): 2020/06/19',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_20), {}, 'Aerosol (Sentinel-5): 2020/06/20',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_june_21), {}, 'Aerosol (Sentinel-5): 2020/06/21',0/*,0.8*/);
// Map.addLayer(S5P_NRT_Selection(date2020_june_22), {}, 'Aerosol (Sentinel-5): 2020/06/22',0/*,0.8*/);
// Map.addLayer(S5P_NRT_Selection(date2020_june_23), {}, 'Aerosol (Sentinel-5): 2020/06/23',0/*,0.8*/);
// Map.addLayer(S5P_NRT_Selection(date2020_june_24), {}, 'Aerosol (Sentinel-5): 2020/06/24',0/*,0.8*/);
// Map.addLayer(S5P_NRT_Selection(date2020_june_25), {}, 'Aerosol (Sentinel-5): 2020/06/25',0/*,0.8*/);
// Map.addLayer(S5P_NRT_Selection(date2020_june_26), {}, 'Aerosol (Sentinel-5): 2020/06/26',0/*,0.8*/);
// Map.addLayer(S5P_NRT_Selection(date2020_june_13), {}, 'Aerosol (Sentinel-5): 2020/06/22',0,0.5);
// Map.addLayer(S5P_NRT_Selection(date2020_july_06), {}, 'Aerosol (Sentinel-5): 2020/06/27',0/*,0.8*/);
Map.addLayer(S5P_img2, Sentinel5Pvizii, S5P_title2,0);
Map.addLayer(S5P_img3, Sentinel5Pvizii, S5P_title3,0/*,0.5*/);
Map.addLayer(S5P_img4, Sentinel5Pvizii, S5P_title4,1/*,0.8*/);
// Map.addLayer(Puntos2020, {color: 'FFA500', opacity: 0.9}, "Major Amazon Fires 2020", 0,0.8);
Map.addLayer(ROI_Border,{palette: '85929E'}, 'State/Department Boundaries',0);//9DA5AC
Map.addLayer(Bolivia_Border,{palette: '85929E'}, 'State/Department Boundaries Bolivia',0);//9DA5AC
Map.addLayer(Region_Border,{palette: 'FFFFFF'}, 'International Boundary (LSIB)',1);
Map.addLayer(ANPRegion_Border,{palette: '00FF00'}, 'Protected Areas (Data: RAISG)',0);
Map.addLayer(Amazonas_aqueduc_Border,{palette: '00FFFF'}, 'Amazon Boundary - Watershed',0);
Map.addLayer(Amazonas_biogeo_Border,{palette: 'CCFB5D'}, 'Amazon Boundary - Biogeographical',0);
//########################################################################################################
var lon = ui.Label();
var lat = ui.Label();
mainPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(function(coords) {
  //Map.layers().remove(Map.layers().get(0));
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(geometry, {color: 'green'});
  Map.layers().set(26, dot);
  // Map.layers().set(20, dot);
  //var col_Type = col.filterBounds(geometry)
  //.filterDate('2015-06-01', '2019-12-31').map(addTypecol).select('col');
  /*var chart = ui.Chart.image.series(col, geometry, ee.Reducer.mean(), 20).setOptions({
      title: 'Serie Fenologica NDVI',
      lineWidth: 1,
      pointSize: 3 });
  panel.widgets().set(2, chart);*/
});
//########################################################################################################
Map.setOptions('SATELLITE');
Map.style().set('cursor', 'crosshair');
Map.setCenter(-57, -7,5);
// Map.setCenter(-20, 6,4);
ui.root.insert(0, mainPanel);