var S5Pamazonia = ui.import && ui.import("S5Pamazonia", "imageCollection", {
      "id": "projects/ACCA-SERVIR/S5P_Amazonia"
    }) || ee.ImageCollection("projects/ACCA-SERVIR/S5P_Amazonia");
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
var Puntos2020_i = ee.FeatureCollection("users/luciovilla/APP_Fire_Detected/Fire_Detected_20201104");
var Puntos2020 = Puntos2020_i;//.merge(Puntos2020_ii);
// print("Puntos2020: ", Puntos2020);
// ##### DATES FROM S5P List #########
/*
var s5p = ee.ImageCollection("projects/ACCA-SERVIR/S5P_Amazonia");
var acquisition_times = ee.List(s5p.sort('system:index').aggregate_array('system:index'));
var count = acquisition_times.length().getInfo();
var date_time = acquisition_times.get(count-1);//get(count-4)
// print(date_time)
var date_format = ee.Date(date_time);
var date_string = ee.String(date_time);
print(date_format, date_string);
// print('......')
var yyyy4 = date_string.slice(0,4).getInfo();
var mm4 = date_string.slice(5,7).getInfo();
var dd4 = date_string.slice(8,10).getInfo();
var date_string4 =  yyyy4 + mm4 + dd4;
*/
var s5p = ee.ImageCollection("projects/ACCA-SERVIR/S5P_Amazonia");
var acquisition_times = ee.List(s5p.sort('system:index').aggregate_array('system:index'));
var count = acquisition_times.length().getInfo();
var date_time1 = acquisition_times.get(count-1);
var date_time2 = acquisition_times.get(count-2);
var date_time3 = acquisition_times.get(count-3);
//
var yyyy1 = ee.String(date_time1).slice(0,4).getInfo();
var yyyy2 = ee.String(date_time2).slice(0,4).getInfo();
var yyyy3= ee.String(date_time3).slice(0,4).getInfo();
//
var mm1 = ee.String(date_time1).slice(5,7).getInfo();
var mm2 = ee.String(date_time2).slice(5,7).getInfo();
var mm3 = ee.String(date_time3).slice(5,7).getInfo();
//
var dd1 = ee.String(date_time1).slice(8,10).getInfo();
var dd2 = ee.String(date_time2).slice(8,10).getInfo();
var dd3 = ee.String(date_time3).slice(8,10).getInfo();
// print("date_before",yyyy1,mm1,dd1);
// print("date_before",yyyy2,mm2,dd2);
// print("date_before",yyyy3,mm3,dd3);
//
var date_string1 =  yyyy1 + mm1 + dd1;
var date_string2 =  yyyy2 + mm2 + dd2;
var date_string3 =  yyyy3 + mm3 + dd3;
// ##### DATES MODIFY ################
// 16/08, 17/18, 18/08...22/08
var annee = ['2021','2021','2022','2022','2022','2021',  '2022','2022']; 
var mois  = ['05','05','08','08','08','06',                '02','02'  ];
var jours = ['20','25','16','17','18','26',                '01','02'  ];
// var update_app = 'Updated: Mar 15, 2021';// | UTC/GMT';
var update_app = 'Updated: ' + ee.Date(date_time1).format('MMM dd YYYY').getInfo();// | UTC/GMT';
print(update_app);    
// ##### SELECT DATES MODIFY ############################
// ++
// var dateApp4ii = date_string//annee[4]+"-"+mois[4]+"-"+jours[4]//+"-"+"ii";
var dateApp4ii_d1 =  yyyy1+"-"+mm1+"-"+dd1;
var dateApp4ii_d2 =  yyyy2+"-"+mm2+"-"+dd2;
var dateApp4ii_d3 =  yyyy3+"-"+mm3+"-"+dd3;
var dateApp4ii_4 = annee[7]+"-"+mois[7]+"-"+jours[7];
var dateApp4ii_3 = annee[6]+"-"+mois[6]+"-"+jours[6];
var dateApp4ii_2 = annee[5]+"-"+mois[5]+"-"+jours[5];
var dateApp4ii_1 = annee[4]+"-"+mois[4]+"-"+jours[4];//***
var dateApp3ii_1 = annee[3]+"-"+mois[3]+"-"+jours[3];//***
var dateApp3ii = annee[2]+"-"+mois[2]+"-"+jours[2];  //***
var dateApp2ii = annee[1]+"-"+mois[1]+"-"+jours[1];
var dateApp1ii= annee[0]+"-"+mois[0]+"-"+jours[0];
print(typeof dateApp4ii_d1);
// //
var dateApp4_d1   = date_string1;
var dateApp4_d2   = date_string2;
var dateApp4_d3   = date_string3;
print(dateApp4_d1);
var dateApp4_4 = annee[7]+mois[7]+jours[7];
var dateApp4_3 = annee[6]+mois[6]+jours[6];
var dateApp4_2 = annee[5]+mois[5]+jours[5];
var dateApp4_1 = annee[4]+mois[4]+jours[4];
var dateApp3_1 = annee[3]+mois[3]+jours[3];
var dateApp3   = annee[2]+mois[2]+jours[2];
var dateApp2   = annee[1]+mois[1]+jours[1];
var dateApp1   = annee[0]+mois[0]+jours[0];
// ++
var S5P_dateApp4_d1 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4_d1;
var S5P_dateApp4_d2 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4_d2;
var S5P_dateApp4_d3 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4_d3;
print(S5P_dateApp4_d3);
var S5P_dateApp4_2 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4_2;
var S5P_dateApp4_1 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp4_1;
var S5P_dateApp3_1 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp3_1;
var S5P_dateApp3 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp3;
var S5P_dateApp2 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp2;
var S5P_dateApp1 = 'projects/ACCA-SERVIR/S5P/'+ 'S5_NRTI_L3_AI_'+ dateApp1;
// ++
var MODIS_Suomi_dateApp4_d1 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp4_d1;
var MODIS_Suomi_dateApp4_d2 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp4_d2;
var MODIS_Suomi_dateApp4_d3 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp4_d3;
//
var MODIS_Suomi_dateApp4_4 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp4_4;
var MODIS_Suomi_dateApp4_3 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp4_3;
//
var MODIS_Suomi_dateApp4_2 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp4_2;//
var MODIS_Suomi_dateApp4_1 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp4_1;//
var MODIS_Suomi_dateApp3_1 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp3_1;//
var MODIS_Suomi_dateApp3 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp3;
var MODIS_Suomi_dateApp2 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp2;
var MODIS_Suomi_dateApp1 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + dateApp1;
var MODIS_Suomi_dateApp0 = 'projects/ACCA-SERVIR/MODIS_Suomi/' +'SuomiNPP_Anomalies_' + '20190813';
// ++
var S5P_title4_d1 = 'Aerosol (Sentinel-5): ' + yyyy1 + '/'+  mm1 + '/' + dd1;
var S5P_title4_d2 = 'Aerosol (Sentinel-5): ' + yyyy2 + '/'+  mm2 + '/' + dd2;
var S5P_title4_d3 = 'Aerosol (Sentinel-5): ' + yyyy3 + '/'+  mm3 + '/' + dd3;
var S5P_title4_4 = 'Aerosol (Sentinel-5): ' + annee[7] + '/'+ mois[7]+ '/' + jours[7] ;
var S5P_title4_3 = 'Aerosol (Sentinel-5): ' + annee[6] + '/'+ mois[6]+ '/' + jours[6] ;
var S5P_title4_2 = 'Aerosol (Sentinel-5): ' + annee[5] + '/'+ mois[5]+ '/' + jours[5] ;
var S5P_title4_1 = 'Aerosol (Sentinel-5): ' + annee[4] + '/'+ mois[4]+ '/' + jours[4] ;
var S5P_title3_1 = 'Aerosol (Sentinel-5): ' + annee[3] + '/'+ mois[3]+ '/' + jours[3] ;
var S5P_title3 = 'Aerosol (Sentinel-5): ' + annee[2] + '/'+ mois[2]+ '/' + jours[2] ;
var S5P_title2 = 'Aerosol (Sentinel-5): ' + annee[1] + '/'+ mois[1]+ '/' + jours[1] ;
var S5P_title1 = 'Aerosol (Sentinel-5): ' + annee[0] + '/'+ mois[0]+ '/' + jours[0] ;
var Alerts_title4_d1 = 'Fire Alerts (VIIRS): ' + yyyy1 + '/'+  mm1 + '/' + dd1;
var Alerts_title4_d2 = 'Fire Alerts (VIIRS): ' + yyyy2 + '/'+  mm2 + '/' + dd2;
var Alerts_title4_d3 = 'Fire Alerts (VIIRS): ' + yyyy3 + '/'+  mm3 + '/' + dd3;
var Alerts_title4_4 = 'Fire Alerts (VIIRS): ' + annee[7] + '/'+ mois[7]+ '/' + jours[7] ;
var Alerts_title4_3 = 'Fire Alerts (VIIRS): ' + annee[6] + '/'+ mois[6]+ '/' + jours[6] ;
var Alerts_title4_2 = 'Fire Alerts (VIIRS): ' + annee[5] + '/'+ mois[5]+ '/' + jours[5] ;
var Alerts_title4_1 = 'Fire Alerts (VIIRS): ' + annee[4] + '/'+ mois[4]+ '/' + jours[4] ;
var Alerts_title3_1 = 'Fire Alerts (VIIRS): ' + annee[3] + '/'+ mois[3]+ '/' + jours[3] ;
var Alerts_title3 = 'Fire Alerts (VIIRS): ' + annee[2] + '/'+ mois[2]+ '/' + jours[2] ;
var Alerts_title2 = 'Fire Alerts (VIIRS): ' + annee[1] + '/'+ mois[1]+ '/' + jours[1] ;
var Alerts_title1 = 'Fire Alerts (VIIRS): ' + annee[0] + '/'+ mois[0]+ '/' + jours[0] ;
print(" S5P_title4 ", S5P_title4_d1 );
// ######################################################################################
var S5P_20220202 = ee.Image("projects/ACCA-SERVIR/S5P/S5_20220202"),
    S5P_20220201 = ee.Image("projects/ACCA-SERVIR/S5P/S5_20220201"),
    S5P_20201228 = ee.Image("projects/ACCA-SERVIR/S5P/S5_20201228"),
     S5P_20201229 = ee.Image("projects/ACCA-SERVIR/S5P/S5_20201229"),
     S5P_20201230 = ee.Image("projects/ACCA-SERVIR/S5P/S5_20201230"),
     S5P_20201231 = ee.Image("projects/ACCA-SERVIR/S5P/S5_20201231");
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
// var S5P_img4i = ee.Image(S5P_dateApp4i);
// var S5P_img4ii = ee.Image(S5P_dateApp4ii);
// var S5P_img4iii = ee.Image(S5P_dateApp4iii);
// var S5P_img4iv = ee.Image(S5P_dateApp4iv);
// //
// var S5P_img3i = ee.Image(S5P_dateApp3i);
// var S5P_img3ii = ee.Image(S5P_dateApp3ii);
// var S5P_img3iii = ee.Image(S5P_dateApp3iii);
// var S5P_img3iv = ee.Image(S5P_dateApp3iv);
// //
// var S5P_img2i = ee.Image(S5P_dateApp2i);
// var S5P_img2ii = ee.Image(S5P_dateApp2ii);
// var S5P_img2iii = ee.Image(S5P_dateApp2iii);
// var S5P_img2iv = ee.Image(S5P_dateApp2iv);
//
var S5P_dateApp4ii_d1 = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp4ii_d1)).first();
var S5P_dateApp4ii_d2 = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp4ii_d2)).first();
var S5P_dateApp4ii_d3 = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp4ii_d3)).first();
var S5P_dateApp4ii_4 = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp4ii_4)).first();
var S5P_dateApp4ii_3 = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp4ii_3)).first();
var S5P_dateApp4ii_2 = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp4ii_2)).first();
var S5P_dateApp4ii_1 = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp4ii_1)).first();
var S5P_dateApp3ii_1 = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp3ii_1)).first();
var S5P_dateApp3ii = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp3ii)).first();
var S5P_dateApp2ii = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp2ii)).first();
var S5P_dateApp1ii = S5Pamazonia.filter(ee.Filter.eq('system:index', dateApp1ii)).first();
// var S5P_img1i = ee.Image(S5P_dateApp1i);
// var S5P_img1ii = ee.Image(S5P_dateApp1ii);
// var S5P_img1iii = ee.Image(S5P_dateApp1iii);
// var S5P_img1iv = ee.Image(S5P_dateApp1iv);
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
var SuomiNPP_img4_d1 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp4_d1);
var SuomiNPP_img4_d2 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp4_d2);
var SuomiNPP_img4_d3 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp4_d3);
//
var SuomiNPP_img4_4 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp4_4);
var SuomiNPP_img4_3 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp4_3);
//
var SuomiNPP_img4_2 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp4_2);
var SuomiNPP_img4_1 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp4_1);
var SuomiNPP_img3_1 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp3_1);
var SuomiNPP_img3 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp3);
var SuomiNPP_img2 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp2);
var SuomiNPP_img1 = FIRMS_VIIRS_FilteredData(MODIS_Suomi_dateApp1);
var SuomiNPP_img0 = ee.FeatureCollection('projects/ACCA-SERVIR/MODIS_Suomi/SuomiNPP_Anomalies_20190813');
// S5P
// // var S5P_img4 = ee.ImageCollection([S5P_img4i,S5P_img4ii]).mosaic();
// var S5P_img4 = ee.ImageCollection([S5P_img4ii]).mosaic();
// // var S5P_img4 = ee.ImageCollection([S5P_img4i,S5P_img4ii,S5P_img4iii,S5P_img4iv]).mosaic();
// // var S5P_img4 = ee.ImageCollection([S5P_img4ii]).mosaic();
// var S5P_img3 = ee.ImageCollection([S5P_img3ii]).mosaic();
// // var S5P_img3 = ee.ImageCollection([S5P_img3i,S5P_img3ii]).mosaic();
// // var S5P_img3 = ee.ImageCollection([S5P_img3i,S5P_img3ii,S5P_img3iii,S5P_img3iv]).mosaic();
// // var S5P_img3 = ee.ImageCollection([S5P_img3ii,S5P_img3iii,S5P_img3iv]).mosaic();
// var S5P_img2 = ee.ImageCollection([S5P_img2ii]).mosaic();
// // var S5P_img2 = ee.ImageCollection([S5P_img2i,S5P_img2ii]).mosaic();
// // var S5P_img2 = ee.ImageCollection([S5P_img2i,S5P_img2ii,S5P_img2iii,S5P_img2iv]).mosaic();
// // var S5P_img1 = ee.ImageCollection([S5P_img1i,S5P_img1ii,S5P_img1iii,S5P_img1iv]).mosaic();
// // var S5P_img4 = ee.Image(S5P_dateApp4);
// // var S5P_img3 = ee.Image(S5P_dateApp3);
// // var S5P_img2 = ee.Image(S5P_dateApp2);
// var S5P_img1 = ee.Image(S5P_dateApp1);
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
// var logo = ee.Image("users/luciovilla/Threelogos");
var logo = ee.Image("users/luciovilla/ACCA/ACCA_Logo2021");
var branding = ui.Thumbnail({
      image:logo,
      params:{bands:['b1','b2','b3'],min:0,max:255},
      // style:{width:'152px',height:'145px',stretch: 'horizontal', textAlign:'center', padding:'5px' }
      style:{width:'205px',height:'197px', textAlign:'center', padding:'2px' }
      // style:{width:'181px',height:'174px'}
  });
//###########################################################################################################
//*******************************************************************************************
// 2. Adding features/polygons (AOI)
//*******************************************************************************************
//
var limits = ee.Geometry.Polygon(
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
    amazonas_biogeo = ee.FeatureCollection("users/luciovilla/APP_Fire_Layers/Lim_Biogeografico"),
    indigenous_territory = ee.FeatureCollection("users/luciovilla/APP_Fire_Layers/Territorios_Indigenas_RAISG"),
    acr_peru = ee.FeatureCollection("users/luciovilla/ANP/ACR_PERU"),
    acp_peru = ee.FeatureCollection("users/luciovilla/ANP/ACP_PERU");
var borderCountries = ee.FeatureCollection('USDOS/LSIB/2013')
                      .filterBounds(limits);
var borderBolivia = ee.FeatureCollection('users/luciovilla/Bolivia/Departamentos_Bolivia');
var emptyLimits = ee.Image().byte();
// Amazonas borders
var emptyAmazonLimits = ee.Image().byte();
//
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
var Indigenous_territory_Border = emptyLimits.paint({
  featureCollection: indigenous_territory,
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
//*****
var RegionsBoundaries_merged = RegionsBoundaries.merge(borderBolivia).merge(CUSCO);
var ROI_Border = empty.paint({
  featureCollection:  RegionsBoundaries_merged,
  color: 1,
  width: 2
});
//*****
var ANP_merged = ANP_SouthAmerica.merge(acr_peru).merge(acp_peru);
var emptyANP = ee.Image().byte();
var ANPRegion_Border = empty.paint({
  featureCollection: ANP_merged,
  color: 1,
  width: 2
});
//
//*******************************************************************************************
// 3. Adding Legend
//*******************************************************************************************
//
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
var date2022_feb_02 = ['2022-02-02', '2022-02-03'];
var date2022_feb_01 = ['2022-02-01', '2022-02-03'];
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
  var sentinel5P_NRTI_AI_mean = sentinel5P_NRTI_AI.mean();
  return sentinel5P_NRTI_AI_mean.visualize({min: val_min, max: val_max, opacity: 1.0,palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]});
}
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
//**********************************************************************************
//FIRES ALERTS SOURCES
//**********************************************************************************
var pointsCol = ee.Geometry.MultiPoint(
        [[-73.37,2.2],	
          [-73,2.11],
          [-71.58,3.43],
          [-74.2,0.89],
          [-71.29,3.35],
          [-68.65,5.41]]);
var col2022 = ee.Feature(pointsCol,
    {year: 2022});        
var fires_2021 = ee.FeatureCollection('users/hvcosta/MajorFires_2021');
var fires_2022 = ee.FeatureCollection('projects/ACCA-SERVIR/Fires/Alertas2022_01may2022').merge(col2022);
//******************************************************************************
// Map.addLayer(SUOMI_Selection(date2019_august_13), {},'Image (Suomi): 2019/08/13',0);
// Map.addLayer(SuomiNPP_img0, {color: 'ff0000', opacity: 0.8}, 'Fire Alerts (VIIRS): 2019/08/13',0);
// Map.addLayer(SuomiNPP_img1, {color: 'ff0000', opacity: 0.8}, Alerts_title1,0);
// Map.addLayer(SuomiNPP_img2, {color: 'ff0000', opacity: 0.8}, Alerts_title2,0);
Map.addLayer(SuomiNPP_img3, {color: 'ff0000', opacity: 0.8}, Alerts_title3, 0);//16/8
Map.addLayer(SuomiNPP_img3_1, {color: 'ff0000', opacity: 0.8}, Alerts_title3_1, 0);//17/8
Map.addLayer(SuomiNPP_img4_1, {color: 'ff0000', opacity: 0.8}, Alerts_title4_1, 0);//18/18
// Map.addLayer(SuomiNPP_img4_2, {color: 'ff0000', opacity: 0.8}, Alerts_title4_2, 0);//22/18
// Map.addLayer(SuomiNPP_img4_3, {color: 'ff0000', opacity: 0.8}, Alerts_title4_3, 0);
// Map.addLayer(SuomiNPP_img4_4, {color: 'ff0000', opacity: 0.8}, Alerts_title4_4, 0);//
Map.addLayer(SuomiNPP_img4_d3, {color: 'ff0000', opacity: 0.8}, Alerts_title4_d3, 0);//d2
Map.addLayer(SuomiNPP_img4_d2, {color: 'ff0000', opacity: 0.8}, Alerts_title4_d2, 0);//d1
Map.addLayer(SuomiNPP_img4_d1, {color: 'ff0000', opacity: 0.8}, Alerts_title4_d1, 1,0.8);//d0
//
// Map.addLayer(S5P_NRT_Selection(date2019_august_13), {}, 'Aerosol (Sentinel-5): 2019/08/13',0);
//Map.addLayer(S5P_20201228, Sentinel5Pvizii, 'Aerosol (Sentinel-5): 2020/12/28',0);
//Map.addLayer(S5P_20201229, Sentinel5Pvizii, 'Aerosol (Sentinel-5): 2020/12/29',0);
//Map.addLayer(S5P_20201230, Sentinel5Pvizii, 'Aerosol (Sentinel-5): 2020/12/30',0);
//Map.addLayer(S5P_20201231, Sentinel5Pvizii, 'Aerosol (Sentinel-5): 2020/12/31',0);
// Map.addLayer(S5P_img3, Sentinel5Pvizii, S5P_title3,0);
// Map.addLayer(S5P_img4, Sentinel5Pvizii, S5P_title4,1);
// Map.addLayer(S5P_dateApp1ii, Sentinel5Pvizii, S5P_title1,0);
// Map.addLayer(S5P_dateApp2ii, Sentinel5Pvizii, S5P_title2,0);
Map.addLayer(S5P_dateApp3ii, Sentinel5Pvizii, S5P_title3,0);
Map.addLayer(S5P_dateApp3ii_1, Sentinel5Pvizii, S5P_title3_1,0);
Map.addLayer(S5P_dateApp4ii_1, Sentinel5Pvizii, S5P_title4_1,0);
// Map.addLayer(S5P_dateApp4ii_2, Sentinel5Pvizii, S5P_title4_2,0);
// Map.addLayer(S5P_dateApp4ii_3, Sentinel5Pvizii, S5P_title4_3,0);
// Map.addLayer(S5P_dateApp4ii_4, Sentinel5Pvizii, S5P_title4_4,0);
Map.addLayer(S5P_dateApp4ii_d3, Sentinel5Pvizii, S5P_title4_d3,0);//d2
Map.addLayer(S5P_dateApp4ii_d2, Sentinel5Pvizii, S5P_title4_d2,0);//d1
Map.addLayer(S5P_dateApp4ii_d1, Sentinel5Pvizii, S5P_title4_d1,1);//d0
Map.addLayer(Puntos2020, {color: 'FFA500', opacity: 0.9}, "Major Amazon Fires 2020", 0,0.8);
Map.addLayer(fires_2021, {'color':'ffbb00'} ,'Major Amazon Fires 2021', 0,0.8);
Map.addLayer(fires_2022, {'color':'ffbb00'} ,'Major Amazon Fires 2022', 0,0.8);
Map.addLayer(ROI_Border,{palette: '85929E'}, 'State/Department Boundaries',0);
// Map.addLayer(Bolivia_Border,{palette: '85929E'}, 'State/Department Boundaries Bolivia',0);
Map.addLayer(Region_Border,{palette: 'FFFFFF'}, 'International Boundary (LSIB)',1);
Map.addLayer(ANPRegion_Border,{palette: '92CE70'}, 'Protected Areas (Data: RAISG)',0);
Map.addLayer(Indigenous_territory_Border,{palette: '00FF00'}, 'Indigenous Territory (Data: RAISG)',0);
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
});
//########################################################################################################
Map.setOptions('SATELLITE');
Map.style().set('cursor', 'crosshair');
Map.setCenter(-57, -7,5);
// Map.setCenter(-20, 6,4);
ui.root.insert(0, mainPanel);