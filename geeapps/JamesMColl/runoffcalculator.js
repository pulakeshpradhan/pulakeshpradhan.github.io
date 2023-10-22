/*
       .------..                                     _------__--___.__.
     -          -                                  /            `  `    \
   /              \                               |                      \
 /                   \                            |                       |
/    .--._    .---.   |       Hey Butthead,        \                      |
|  /      -__-     \   |     does this suck?         ~/ --`-`-`-\         |
| |                 |  |                             |            |       |
 ||     ._   _.      ||                              |            |       |
 ||      o   o       ||                               |   _--    |       |
 ||      _  |_      ||                                _| =-.    |.-.    |
 C|     (o\_/o)     |O                                o|/o/       _.   |
  \      _____      /                                 /  ~          \ |
    \ ( /#####\ ) /                                 (____@)  ___~    |
     \  `====='  /        Uhhh, this computer          |_===~~~.`    |
      \  -___-  /          is like, busted or       _______.--~     |
       |       |         something. So go away.     \________       |
       /-_____-\                                             \      |
     /           \                                         __/-___-- -__
   /               \                                      /            __\
  /__|  AC / DC  |__\                                    /-| Metallica|| |
  | ||           |\ \                                   / /|          || | 
About:
Eventually I'll want to see snow, ET, PET, NDVI, GPP, Precip, Runoff 
Show trends in all using a left map/right map UI
How to determein when to use land cover, when to use soils, slope/aspect/elevation or a combination therein?
For this one (rainfall/runoff), it seems to make the most sense to do a slider app which nessessitates a leftmap/right map approch
I obviously still want stats, but it seems like to me it might be nice to also get the underliying distribution as well, which means we need count as well?
We'll obviously want to see precip as a variable, we might also want to compair precip
do I always want to show a base layer?  
select to show a baselayer? [soil]
Title 
Info
Leftmap   Rightmap    (choice of precip, runoff, land cover, soils, smap)
agg unit   Precip source  BaseMap (sat, land cover, soils, smap)
Start Date   End Date   # of timesteps lable
Animation pane
Select a watershed to perform an analysis:
table Chart to return watershed LC/Soils statistics   (SMap combos count/image)
timeseries chart of images (Precip/time and Q/time)
Sum of Precip in:
Sum of Q:
The water cycle according to MODIS:
do the mass balance equation over a number of watersheds at different scales.  Find one an look at it in detail.
So each image in the image collection represents the cadance of the imagecollection with a timestamp band, a soil, a land cover, and a P
An issue that arises due to advances in technology - What dataset do I pick?
Here you get all of them, with a hard coded land cover/soil classification
Feel free to modify this code to suit your needs, or email me at jcoll@ku.edu and I can try and answer your questions or add additional features.  For those
of you interested in how this works, feel free to read through the code, and remember to use the arrows next to the numbers to collapse functions 
for an easier read.  Stay tuned for more...
----- Acknowledgments -----
Thanks to Google for creating such a fantastic platform on which I can do this kind of stuff on.
Proving scripts:
Default app view - https://code.earthengine.google.com/e448f7710937d5509629600a437a3229
\*****************************************************************************************************************************************************************/  
var app = {};
/** Creates the app constants. */
app.createConstants = function() {
  // Constants 
  app.QualityFlagMask = true;
  app.printStatements = false;
  app.DefaultAnimate = false;
  app.FullDataMode = true;
  app.currentIndex = 1;
  // Random Data and Structure Containers
  app.bitMask = 1 << 0;
  app.FilterOnStartTime = ee.Filter.equals({"leftField": "system:time_start", "rightField": "system:time_start"});   
  app.MODDef = ee.List([]);
  app.ANIMATEDimages = ee.List([]);
  app.chartData = null;
  app.selectedPoints = [];
  app.animationTimer = 4000;
  app.hardLimit = 72;
  app.CECEco1String = "CEC Ecoregion Level 1";
  app.CECEco1Shape = ee.FeatureCollection("users/JamesMColl/CEC_Eco_RSimp");
  app.CECEco1Table = ee.FeatureCollection("users/JamesMColl/CEC_Eco1_LC01");
  app.CECEco1Image = ee.Image("users/JCollGEE/CECEco_l1_250");
  app.CECEco3String = "CEC Ecoregion Level 3";
  app.CECEco3Shape = ee.FeatureCollection("EPA/Ecoregions/2013/L3");
  app.CECEco4String = "CEC Ecoregion Level 4";
  app.CECEco4Shape = ee.FeatureCollection("EPA/Ecoregions/2013/L4");
  app.HUC2String = "HUC 2";
  app.HUC2Shape = ee.FeatureCollection("users/JamesMColl/HUC2_rsimp");  
  app.HUC4String = "HUC 4";
  app.HUC4Shape = ee.FeatureCollection("USGS/WBD/2017/HUC04");
  app.HUC6String = "HUC 6";
  app.HUC6Shape = ee.FeatureCollection("USGS/WBD/2017/HUC06");
  app.HUC8String = "HUC 8";
  app.HUC8Shape = ee.FeatureCollection("USGS/WBD/2017/HUC08");
  app.HUC10String = "HUC 10";
  app.HUC10Shape = ee.FeatureCollection("USGS/WBD/2017/HUC10");
  app.HUC12String = "HUC 12";
  app.HUC12Shape = ee.FeatureCollection("USGS/WBD/2017/HUC12");
  app.BrazilString = "Amazon Rainforest Basin";
  app.AzB = ee.FeatureCollection("users/JamesMColl/AmazonBasin");    
  app.CountriesString = "Countries";
  app.CountriesShape = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
  app.StatesString = "States";
  app.StatesShape = ee.FeatureCollection("TIGER/2016/States");  
  app.CountiesString = "Counties";
  app.CountiesShape = ee.FeatureCollection("TIGER/2018/Counties");
  app.MapPointString = "Point (mouse click)";
  app.MapBoxString = "Map Bounding Box (on click)";
  // Select Vars
  app.IGBPString = "IGBP Land Cover";
  app.UMDString = "UMD Land Cover";
  app.NoLandCover = "None";
  app.TimeSeriesStat_Sum = "sum";
  app.TimeSeriesStat_Min = "min";
  app.TimeSeriesStat_Max = "max";
  app.TimeSeriesStat_stdDev = "stdDev";
  app.TimeSeriesStat_Mean = "mean";
  app.TimeSeriesStat_95 = "p95";
  app.TimeSeriesStat_TopMean = "Top 5 Percent";
  app.TimeSeriesStat_None = "None (8 day tile)";
  app.SpaceSelectSum = "sum";
  app.SpaceSelect_Min = "min";
  app.SpaceSelect_Mean = "mean";
  app.SpaceSelect_95 = "p95";
  app.SpaceSelect_TopMean = "Top 5 Percent";
  app.SpaceSelect_Max = "max";
  app.SpaceSelect_stdDev = "stdDev";
  app.SpaceSelect_Sum = "sum";
  app.SpaceSelect_Count = "count";
  app.TableStat_Min = "min";
  app.TableStat_Mean = "mean";
  app.TableStat_Max = "max";
  app.VarSelect_K = "K";
  app.VarSelect_ET = "ET";
  app.VarSelect_Gpp = "Gpp";
  app.VarSelect_LE = "LE";
  app.VarSelect_PLE = "PLE";
  app.VarSelect_PET = "PET";
  app.VarSelect_WUE = "WUE";
  app.VarSelect_LC = "Landcover";
  // Vis I should probably be able to pull but haven't figured out
  app.CECEcoDisplayColors = ["DEFFFF","66A6FF","A1BAFF","99E6FF","4AE8BD","B3FFE6","59FF19","59FFB3","B8FF6B","FACC99","FAE64D","D1FFA6","DBE380","B5FC66","FA6666","CC59FF"];
  app.CECEcoDisplayNames = ["Water","Arctic Cordillera","Tundra","Taigia","Hudson Plain","Northern Forests","Northwestern Forested Mountains","Marine West Coast Forest","Eastern Temperate Forests","Great Plains","North American Deserts","Mediterranean Califonia","Southern Semiarid Highlands","Temperate Sierras","Tropical Dry Forests","Tropical Wet Forests"];
  app.CECEcoColors = ["DEFFFF","66A6FF","FAE64D","D1FFA6","DBE380","B5FC66","FA6666","CC59FF","A1BAFF","99E6FF","4AE8BD","B3FFE6","59FF19","59FFB3","B8FF6B","FACC99"];
  app.CECEcoNames = ["Water","Arctic Cordillera","North American Deserts","Mediterranean Califonia","Southern Semiarid Highlands","Temperate Sierras","Tropical Dry Forests","Tropical Wet Forests","Tundra","Taigia","Hudson Plain","Northern Forests","Northwestern Forested Mountains","Marine West Coast Forest","Eastern Temperate Forests","Great Plains"];
  app.MODColors = ["AEC3D6","162103","235123","399B38","38EB38","39723B","6A2424","C3A55F","B76124","D99125","92AF1F","10104C","CDB400","CC0202","332808","D7CDCC","F7E174","743411"];
  app.MODDisplayColors = ["05450A","086A10","54A708","78D203","009900","C6B044","DCD159","DADE48","FBFF13","B6FF05","27FF87","C24F44","A5A5A5","FF6D4C","69FFF8","F9FFA4","1C0DFF"];
  app.MODDisplayNames = ["Evergreen Needleleaf Forests","Evergreen Broadleaf Forests","Deciduous Needleleaf Forests","Deciduous Broadleaf Forests","Mixed Forests","Closed Shrublands","Open Shrublands","Woody Savannas","Savannas","Grasslands","Permanent Wetlands","Croplands","Urban and Built-up Lands","Cropland/Natural Vegetation Mosaics","Permanent Snow & Ice","Barren","Water Bodies"];
  app.MODNames = ["Water","Evergreen Needleleaf Forest","Evergreen Broadleaf Forest","Deciduous Needleleaf Forest","Deciduous Broadleaf Forest","Mixed Forest","Closed Shrublands","Open Shrublands","Woody Savannas","Savannas","Grasslands","Permanent Wetlands","Croplands","Urban and Built-up","Cropland/Natural Vegetation Mosaic","Snow and ice","Barren or Sparsely Vegetated","Unclassified"];
  app.NLCDColors = ["5475A8","FFFFFF","E8D1D1","E29E8C","FF0000","B50000", "D2CDC0","85C77E","38814E","D4E7B0","AF963C","DCCA8F","FDE9AA","D1D182","A3CC51","82BA9E","FBF65D","CA9146","C8E6F8","64B3D5"];
  app.NLCDNames = ["Open Water","Perennial Ice & Snow","Developed Open Space","Developed Low Intensity","Developed Medium Intensity","Developed High Intensity","Barren land (rock/sand/clay)","Deciduous Forest","Evergreen Forest","Mixed Forest","Dwarf Scrub","Shrub & Scrub","Grassland & Herbaceous","Sedge & Herbaceous","Lichens","Moss","Pasture & Hay","Cultivated Crops","Woody Wetlands","Emergent Herbaceous Wetlands"];
  app.UMDColors = ["1c0dff","05450a","086a10","54a708","78d203","009900","c6b044","dcd159","dade48","fbff13","b6ff05","27ff87","c24f44","a5a5a5","ff6d4c","f9ffa4"]; 
  app.UMDNames = ["Water Bodies","Evergreen Needleleaf Forests","Evergreen Broadleaf Forests","Deciduous Needleleaf Forests","Deciduous Broadleaf Forests","Mixed Forests","Closed Shrublands","Open Shrublands","Woody Savannas","Savannas","Grasslands","Permanent Wetlands","Croplands","Urban and Built-up Lands","Cropland/Natural Vegetation Mosaics","Non-Vegetated Lands"];
  app.GenFCColors = ["FF0000"];
  app.GenFCNames = ["(Outlined)"];
  app.EmptyNamesDic = {code_1: "Value"};
  app.UMDSelectors = ["code_0","code_1","code_2","code_3","code_4","code_5","code_6","code_7","code_8","code_9","code_10","code_11","code_12","code_13","code_14","code_15"];
  app.IGBPSelectors = ["code_1","code_2","code_3","code_4","code_5","code_6","code_7","code_8","code_9","code_10","code_11","code_12","code_13","code_14","code_15","code_16","code_17","code_254"];
  app.EmptySelectors = ["code_1"];
  app.selectNames = ["code_1", "code_2", "code_3", "code_4", "code_5", "code_6", "code_7", "code_8", "code_9", "code_10","code_11","code_12","code_13","code_14","code_15","code_16","code_17","code_21","code_22","code_24","code_31","code_41","code_42","code_43","code_51","code_52","code_71","code_72","code_73","code_74","code_81","code_82","code_90","code_95","date YYYY-MM-dd"];
  app.selectNamesNoDate = ["code_1","code_2","code_3","code_4","code_5","code_6","code_7","code_8","code_9","code_10","code_11","code_12","code_13","code_14","code_15","code_16","code_17","code_21","code_22","code_24","code_31","code_41","code_42","code_43","code_51","code_52","code_71","code_72","code_73","code_74","code_81","code_82","code_90","code_95"];
  app.BlueToBrown = ['964B00', 'A15F1C', 'AD7338', 'B98755', 'C49B71', 'D0AF8D', 'DCC3AA', 'E7D7C6', 'F3EBE2', 'FFFFFF', 'E7F1FA', 'CFE4F6', 'B7D7F2', '9FCAED', '88BDE9', '70B0E5', '58A3E0', '4096DC', '2989D8'];
  app.WhiteToBlack = ["#000000", "#050505", "#0A0A0A", "#0F0F0F", "#141414", "#1A1A1A", "#1F1F1F", "#242424", "#292929", "#2E2E2E", "#343434", "#393939", "#3E3E3E", "#434343", "#484848", "#4E4E4E", "#535353", "#585858", "#5D5D5D", "#626262", "#686868", "#6D6D6D", "#727272", "#777777", "#7C7C7C", "#828282", "#878787", "#8C8C8C", "#919191", "#969696", "#9C9C9C", "#A1A1A1", "#A6A6A6", "#ABABAB", "#B0B0B0", "#B6B6B6", "#BBBBBB", "#C0C0C0", "#C5C5C5", "#CACACA", "#D0D0D0", "#D5D5D5", "#DADADA", "#DFDFDF", "#E4E4E4", "#EAEAEA", "#EFEFEF", "#F4F4F4", "#F9F9F9", "#FFFFFF"];
  app.Feature_STYLE = {width: 1, color: "FF0000", fillColor: "00000000"};
  app.HIGHLIGHT_STYLE = {color: "F2F2F2", fillColor: "F2F2F240"};
  // Animation
  app.timeout = null;
  app.play = false;
  app.utils = require('users/gena/packages:utils');
  app.text = require('users/gena/packages:text');
  app.textPlay = '▶';
  app.textPause = '⏸';
  app.palettes = require('users/gena/packages:palettes');
  app.landcoverVis = {
    min: 0.0,
    max: 95.0,
    palette: ['000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','466b9f','d1def8','000000','000000','000000','000000','000000','000000','000000','000000','dec5c5','d99282','eb0000','ab0000','000000','000000','000000','000000','000000','000000','b3ac9f','000000','000000','000000','000000','000000','000000','000000','000000','000000','68ab5f','1c5f2c','b5c58f','000000','000000','000000','000000','000000','000000','000000','af963c','ccb879','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','000000','dfdfc2','d1d182','a3cc51','82ba9e','000000','000000','000000','000000','000000','000000','dcd939','ab6c28','000000','000000','000000','000000','000000','000000','000000','b8d9eb','000000','000000','000000','000000','6c9fb8'],
  };
  app.NLCDString = "National Land Cover Dataset";
  app.NLCD = ee.ImageCollection("USGS/NLCD");
  app.NLCDSelectors = ["code_11","code_12","code_21","code_22","code_23","code_24","code_31","code_41","code_42","code_43","code_51","code_52","code_71","code_72","code_73","code_74","code_81","code_82","code_90","code_95"];
  app.NLCDNamesDic = {code_11: "Open Water",
                      code_12: "Perennial Ice/Snow",
                      code_21: "Developed, Open Space",
                      code_22: "Developed, Low Intensity",
                      code_23: "Developed, Medium Intensity",
                      code_24: "Developed, High Intensity",
                      code_31: "Barren Land",
                      code_41: "Deciduous Forest",
                      code_42: "Evergreen Forest",
                      code_43: "Mixed Forest",
                      code_51: "Dwarf Scrub",
                      code_52: "Shrub/Scrub",
                      code_71: "Grassland/Herbaceous",
                      code_72: "Sedge/Herbaceous",
                      code_73: "Lichens",
                      code_74: "Moss",
                      code_81: "Pasture/Hay",
                      code_82: "Cultivated Crops",
                      code_90: "Woody Wetlands",
                      code_95: "Emergent Herbaceous Wetlands"
  };
  app.NLCDColors = ["5475A8","FFFFFF","E8D1D1","E29E8C","FF0000","B50000", "D2CDC0","85C77E","38814E","D4E7B0","AF963C","DCCA8F","FDE9AA","D1D182","A3CC51","82BA9E","FBF65D","CA9146","C8E6F8","64B3D5"];
  app.NLCDNames = ["Open Water","Perennial Ice & Snow","Developed Open Space","Developed Low Intensity","Developed Medium Intensity","Developed High Intensity","Barren land (rock/sand/clay)","Deciduous Forest","Evergreen Forest","Mixed Forest","Dwarf Scrub","Shrub & Scrub","Grassland & Herbaceous","Sedge & Herbaceous","Lichens","Moss","Pasture & Hay","Cultivated Crops","Woody Wetlands","Emergent Herbaceous Wetlands"];
  app.NLDCVis = ee.ImageCollection.fromImages([
    ee.Image(app.NLCD.toList(14).get(1)).select("landcover").set("system:time_start",992606400000).set("system:time_end",992606500000), // 2001
    ee.Image(app.NLCD.toList(14).get(1)).select("landcover").set("system:time_start",1024142400000).set("system:time_end",1024142500000), // 2002
    ee.Image(app.NLCD.toList(14).get(5)).select("landcover").set("system:time_start",1055678400000).set("system:time_end",1055678500000), // 2003
    ee.Image(app.NLCD.toList(14).get(5)).select("landcover").set("system:time_start",1087300800000).set("system:time_end",1087300900000), // 2004
    ee.Image(app.NLCD.toList(14).get(6)).select("landcover").set("system:time_start",1118836800000).set("system:time_end",1118836900000), // 2005
    ee.Image(app.NLCD.toList(14).get(6)).select("landcover").set("system:time_start",1150372800000).set("system:time_end",1150372900000), // 2006
    ee.Image(app.NLCD.toList(14).get(7)).select("landcover").set("system:time_start",1181908800000).set("system:time_end",1181908900000), // 2007
    ee.Image(app.NLCD.toList(14).get(7)).select("landcover").set("system:time_start",1213531200000).set("system:time_end",1213531300000), // 2008
    ee.Image(app.NLCD.toList(14).get(7)).select("landcover").set("system:time_start",1245067200000).set("system:time_end",1245067300000), // 2009
    ee.Image(app.NLCD.toList(14).get(8)).select("landcover").set("system:time_start",1276603200000).set("system:time_end",1276603300000), // 2010
    ee.Image(app.NLCD.toList(14).get(8)).select("landcover").set("system:time_start",1308139200000).set("system:time_end",1308139300000), // 2011
    ee.Image(app.NLCD.toList(14).get(12)).select("landcover").set("system:time_start",1339761600000).set("system:time_end",1339761700000), // 2012
    ee.Image(app.NLCD.toList(14).get(12)).select("landcover").set("system:time_start",1371297600000).set("system:time_end",1371297700000), // 2013
    ee.Image(app.NLCD.toList(14).get(12)).select("landcover").set("system:time_start",1402833600000).set("system:time_end",1402833700000), // 2014
    ee.Image(app.NLCD.toList(14).get(13)).select("landcover").set("system:time_start",1434369600000).set("system:time_end",1434369700000), // 2015
    ee.Image(app.NLCD.toList(14).get(13)).select("landcover").set("system:time_start",1465992000000).set("system:time_end",1465992100000), // 2016
    ee.Image(app.NLCD.toList(14).get(13)).select("landcover").set("system:time_start",1497528000000).set("system:time_end",1497528100000), // 2017
    ee.Image(app.NLCD.toList(14).get(13)).select("landcover").set("system:time_start",1529064000000).set("system:time_end",1529064100000), // 2018
    ee.Image(app.NLCD.toList(14).get(13)).select("landcover").set("system:time_start",1560600000000).set("system:time_end",1560600100000) // 2019
  ]);
  app.OLMSoilTextureString = 'Open Land Map Soil Texture';
  app.OLMSoilTextureImage = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02").select('b0').unmask();
  app.OLMSoilTextureImageVis = {min:1, max:12,palette:['d5c36b','b96947','9d3706','ae868f','f86714','46d143','368f20','3e5a14','ffd557','fff72e','ff5a9d','ff005b']};
  app.OLMSoilColor = ['d5c36b','b96947','9d3706','ae868f','f86714','46d143','368f20','3e5a14','ffd557','fff72e','ff5a9d','ff005b'];
  app.OLMSoilName = ['Cl','SiCl','SaCl','ClLo','SiClLo','SaClLo','Lo','SiLo','SaLo','Si','LoSa','Sa'];
  app.OLMSoilFullName = ['Clay','Silt-Clay','Sand-Clay','Clay-Loam','Silt-Clay-Loam','Sand-Clay-Loam','Loam','Silt-Loam','Sand-Loam','Silt','Loam-Sand','Sand'];
  app.fromClassList = [
  11,12,21,22,23,24,31,41,42,43,51,52,71,72,73,74,81,82,90,95,
  111,112,121,122,123,124,131,141,142,143,151,152,171,172,173,174,181,182,190,195,
  211,212,221,222,223,224,231,241,242,243,251,252,271,272,273,274,281,282,290,295,
  311,312,321,322,323,324,331,341,342,343,351,352,371,372,373,374,381,382,390,395,
  411,412,421,422,423,424,431,441,442,443,451,452,471,472,473,474,481,482,490,495,
  511,512,521,522,523,524,531,541,542,543,551,552,571,572,573,574,581,582,590,595,
  611,612,621,622,623,624,631,641,642,643,651,652,671,672,673,674,681,682,690,695,
  711,712,721,722,723,724,731,741,742,743,751,752,771,772,773,774,781,782,790,795,
  811,812,821,822,823,824,831,841,842,843,851,852,871,872,873,874,881,882,890,895,
  911,912,921,922,923,924,931,941,942,943,951,952,971,972,973,974,981,982,990,995,
  1011,1012,1021,1022,1023,1024,1031,1041,1042,1043,1051,1052,1071,1072,1073,1074,1081,1082,1090,1095,
  1111,1112,1121,1122,1123,1124,1131,1141,1142,1143,1151,1152,1171,1172,1173,1174,1181,1182,1190,1195,
  1211,1212,1221,1222,1223,1224,1231,1241,1242,1243,1251,1252,1271,1272,1273,1274,1281,1282,1290,1295];
  app.toClassList = [
  0.204081633,0.204081633,4.705882353,2.345679012,2.345679012,2.345679012,4.705882353,12.22222222,30,18.57142857,12.22222222,12.22222222,8.518518519,0.204081633,
  4.705882353,4.705882353,4.705882353,6.129032258,30,23.33333333,
  0.204081633,0.204081633,1.235955056,0.752688172,0.752688172,0.752688172,1.235955056,2.048192771,2.987012987,2.5,2.048192771,2.048192771,1.764705882,
  0.204081633,1.235955056,1.235955056,1.235955056,2.345679012,2.987012987,2.820512821,0.204081633,0.204081633,1.235955056,0.752688172,0.752688172,
  0.752688172,1.235955056,2.048192771,2.987012987,2.5,2.048192771,2.048192771,1.764705882,0.204081633,1.235955056,1.235955056,1.235955056,2.345679012,
  2.987012987,2.820512821,0.204081633,0.204081633,1.235955056,0.752688172,0.752688172,0.752688172,1.235955056,2.048192771,2.987012987,2.5,2.048192771,
  2.048192771,1.764705882,0.204081633,1.235955056,1.235955056,1.235955056,2.345679012,2.987012987,2.820512821,0.204081633,0.204081633,1.235955056,0.752688172,
  0.752688172,0.752688172,1.235955056,2.048192771,2.987012987,2.5,2.048192771,2.048192771,1.764705882,0.204081633,1.235955056,1.235955056,1.235955056,
  2.345679012,2.987012987,2.820512821,0.204081633,0.204081633,1.235955056,0.752688172,0.752688172,0.752688172,1.235955056,2.048192771,2.987012987,2.5,
  2.048192771,2.048192771,1.764705882,0.204081633,1.235955056,1.235955056,1.235955056,2.345679012,2.987012987,2.820512821,0.204081633,0.204081633,1.627906977,
  0.989010989,0.989010989,0.989010989,1.627906977,2.987012987,4.285714286,3.698630137,2.987012987,2.987012987,2.5,0.204081633,1.627906977,1.627906977,
  1.627906977,2.820512821,4.285714286,4.084507042,0.204081633,0.204081633,2.658227848,1.363636364,1.363636364,1.363636364,2.658227848,5.151515152,8.181818182,
  6.393442623,5.151515152,5.151515152,4.285714286,0.204081633,2.658227848,2.658227848,2.658227848,4.084507042,8.181818182,7.24137931,0.204081633,0.204081633,
  2.658227848,1.363636364,1.363636364,1.363636364,2.658227848,5.151515152,8.181818182,6.393442623,5.151515152,5.151515152,4.285714286,0.204081633,2.658227848,
  2.658227848,2.658227848,4.084507042,8.181818182,7.24137931,0.204081633,0.204081633,4.705882353,2.345679012,2.345679012,2.345679012,4.705882353,12.22222222,
  30,18.57142857,12.22222222,12.22222222,8.518518519,0.204081633,4.705882353,4.705882353,4.705882353,6.129032258,30,23.33333333,0.204081633,0.204081633,
  2.658227848,1.363636364,1.363636364,1.363636364,2.658227848,5.151515152,8.181818182,6.393442623,5.151515152,5.151515152,4.285714286,0.204081633,2.658227848,
  2.658227848,2.658227848,4.084507042,8.181818182,7.24137931,0.204081633,0.204081633,4.705882353,2.345679012,2.345679012,2.345679012,4.705882353,12.22222222,
  30,18.57142857,12.22222222,12.22222222,8.518518519,0.204081633,4.705882353,4.705882353,4.705882353,6.129032258,30,23.33333333,0.204081633,0.204081633,
  4.705882353,2.345679012,2.345679012,2.345679012,4.705882353,12.22222222,30,18.57142857,12.22222222,12.22222222,8.518518519,0.204081633,4.705882353,4.705882353,
  4.705882353,6.129032258,30,23.33333333];
  app.SmapString = 'S map';
  app.Smap = app.NLDCVis.map(function(image) {
    // bit shift image
    return app.OLMSoilTextureImage.multiply(100)
                                  .add(image)
                                  .remap(app.fromClassList,app.toClassList)
                                  .addBands([image,app.OLMSoilTextureImage])
                                  .select(['remapped','landcover','b0'],['S','landcover','Soil'])
                                  .set('system:time_start', image.get('system:time_start'));
  });
  app.SmapVis = {min:3,max:30,palette:['000096','0064ff','00b4ff','33db80','9beb4a','ffeb00','ffb300','ff6400','eb1e00','af0000']};
  // Precip data
  app.CHIRPSString = 'CHIRPS';
  app.CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
  app.CHIRPSVis = {min:0, max:17.0,palette:['001137','0aab1e','e7eb05','ff4a2d','e90000']};
  // app.GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_V06").select(['HQprecipitation'],['GPM']);
  app.GPMString = 'Global Precipitation Measurement';
  app.GPM = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/reanalysis");
  app.GPMVis = {min:0.0,max:17.0,palette:['000096','0064ff','00b4ff','33db80','9beb4a','ffeb00','ffb300','ff6400','eb1e00','af0000']};
  app.PERSIANN_CDRString = 'PERSIANN-CDR';
  app.PERSIANN_CDR = ee.ImageCollection("NOAA/PERSIANN-CDR");
  app.PERSIANN_CDRVis = {min:0.0,max:17.0,palette:['000096','0064ff','00b4ff','33db80','9beb4a','ffeb00','ffb300','ff6400','eb1e00','af0000']};
  app.TRMMString = 'TRMM 3 Hour';
  app.TRMM = ee.ImageCollection("TRMM/3B42");//.map(function(el) {return el.select('precipitation').multiply(0.0393701).copyProperties(el, ['system:time_end','system:time_start'])});
  app.TRMMVis = {min:0.0,max:17.0,palette:['000096','0064ff','00b4ff','33db80','9beb4a','ffeb00','ffb300','ff6400','eb1e00','af0000']};
  // var PRISM = ee.ImageCollection("OREGONSTATE/PRISM/Norm81m");
  // var PRISM = ee.ImageCollection("OREGONSTATE/PRISM/AN81m").select(['ppt'],['PRISM']);   Lookup which to use here
  app.GRIDMETString = 'GRIDMET';
  app.GRIDMET = ee.ImageCollection("IDAHO_EPSCOR/GRIDMET").select(['pr'],['precipitation']);
  app.GRIDMETVis = {min:0.1,max:17.0,palette:['000096','0064ff','00b4ff','33db80','9beb4a','ffeb00','ffb300','ff6400','eb1e00','af0000']};
  app.None = 'Google Satellite';
  app.Precip = 'Precipitation';
  app.Precip3hourVis = {min:0.0,max:17.0,palette:['000096','0064ff','00b4ff','33db80','9beb4a','ffeb00','ffb300','ff6400','eb1e00','af0000']};
  app.Runoff = 'Runoff';
  app.Runoff3hourVis = {min:0.0,max:17.0,palette:["#deebf7", "#9ecae1", "#3182bd"]};
  app.ImageAnimate;
  app.startDateValue;
  app.endDateValue;
  app.agUnitValue;
  app.precipValue;
  app.baseMapValue;
  app.leftMapValue;
  app.rightMapValue;
  app.GoldenData;
  // app.ImageAnimate = 16;
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  // legend helper function
  app.makeRow = function(color, name) {
    return ui.Panel({
      widgets: [
        ui.Label({style: {backgroundColor: "#" + color, padding: "8px", margin: "0 0 4px 0"}}), 
        ui.Label({value: name, style: {margin: "0 0 4px 6px"}})],
      layout: ui.Panel.Layout.Flow("horizontal")
    });
  };
  // legend helper function
  app.makeColorBarParams = function(myPalette) {
    return {bbox: [0, 0, 1, 0.1], dimensions: '100x10', format: 'png', min: 0, max: 1, palette: myPalette};
  };
  // HelperApp
  app.GatherInputs = function() {
    app.startDateValue = ee.Date(app.UserFilterControls.startDate.getValue());
    app.endDateValue = ee.Date(app.UserFilterControls.endDate.getValue());
    app.agUnitValue = app.UserFilterControls.agUnitSelect.getValue();
    app.precipValue = app.UserFilterControls.precipSource.getValue();
    app.leftMapValue = app.leftMapLegend.leftMapSelect.getValue();
    app.rightMapValue = app.rightMapLegend.rightMapSelect.getValue();
    return true;
  };
  app.GenerateDataset = function() {
    app.GatherInputs();
    if(app.precipValue== "TRMM 3 Hour") {
      app.GoldenData = app.TRMM.filterDate(app.startDateValue,app.endDateValue)
                                 .map(function(element) {
  var yearlyConstant = app.Smap.filterDate(
    ee.Date(app.startDateValue.format('yyyy-01-01')),
    ee.Date(app.startDateValue.format('yyyy-01-01')).advance(1, 'year'))
  .first();
  var posPrecip = element.mask(element.select('precipitation').gt(0))
                         .copyProperties(element);
  var MergedDataset = ee.Image(posPrecip).addBands(yearlyConstant);
  var Qcalc = ee.Image(MergedDataset).expression('((P - 0.2*S)**2)/(P+0.8*S)', {P: ee.Image(MergedDataset).select('precipitation'), S: ee.Image(MergedDataset).select('S')})
                                     .select(['precipitation'],['Runoff']);
  return ee.Image(MergedDataset).addBands(Qcalc);
  });
    } else if(app.precipValue== "CHIRPS") {
      app.GoldenData = app.CHIRPS.filterDate(app.startDateValue,app.endDateValue)
                                 .map(function(element) {
  var yearlyConstant = app.Smap.filterDate(
    ee.Date(app.startDateValue.format('yyyy-01-01')),
    ee.Date(app.startDateValue.format('yyyy-01-01')).advance(1, 'year'))
  .first();
  var posPrecip = element.mask(element.select('precipitation').gt(0))
                         .copyProperties(element);
  var MergedDataset = ee.Image(posPrecip).addBands(yearlyConstant);
  var Qcalc = ee.Image(MergedDataset).expression('((P - 0.2*S)**2)/(P+0.8*S)', {P: ee.Image(MergedDataset).select('precipitation'), S: ee.Image(MergedDataset).select('S')})
                                     .select(['precipitation'],['Runoff']);
  return ee.Image(MergedDataset).addBands(Qcalc);
  });
    } else if(app.precipValue== "Global Precipitation Measurment") {
      app.GoldenData = app.GMP.filterDate(app.startDateValue,app.endDateValue)
                                 .map(function(element) {
  var yearlyConstant = app.Smap.filterDate(
    ee.Date(app.startDateValue.format('yyyy-01-01')),
    ee.Date(app.startDateValue.format('yyyy-01-01')).advance(1, 'year'))
  .first();
  var posPrecip = element.mask(element.select('precipitation').gt(0))
                         .copyProperties(element);
  var MergedDataset = ee.Image(posPrecip).addBands(yearlyConstant);
  var Qcalc = ee.Image(MergedDataset).expression('((P - 0.2*S)**2)/(P+0.8*S)', {P: ee.Image(MergedDataset).select('precipitation'), S: ee.Image(MergedDataset).select('S')})
                                     .select(['precipitation'],['Runoff']);
  return ee.Image(MergedDataset).addBands(Qcalc);
  });
    } else if(app.precipValue== "PERSIANN-CDR") {
      app.GoldenData = app.PERSIANN_CDR.filterDate(app.startDateValue,app.endDateValue)
                                 .map(function(element) {
  var yearlyConstant = app.Smap.filterDate(
    ee.Date(app.startDateValue.format('yyyy-01-01')),
    ee.Date(app.startDateValue.format('yyyy-01-01')).advance(1, 'year'))
  .first();
  var posPrecip = element.mask(element.select('precipitation').gt(0))
                         .copyProperties(element);
  var MergedDataset = ee.Image(posPrecip).addBands(yearlyConstant);
  var Qcalc = ee.Image(MergedDataset).expression('((P - 0.2*S)**2)/(P+0.8*S)', {P: ee.Image(MergedDataset).select('precipitation'), S: ee.Image(MergedDataset).select('S')})
                                     .select(['precipitation'],['Runoff']);
  return ee.Image(MergedDataset).addBands(Qcalc);
  });
    } else if(app.precipValue== "GRIDMET") {
      app.GoldenData = app.GRIDMET.filterDate(app.startDateValue,app.endDateValue)
                                 .map(function(element) {
  var yearlyConstant = app.Smap.filterDate(
    ee.Date(app.startDateValue.format('yyyy-01-01')),
    ee.Date(app.startDateValue.format('yyyy-01-01')).advance(1, 'year'))
  .first();
  var posPrecip = element.mask(element.select('precipitation').gt(0))
                         .copyProperties(element);
  var MergedDataset = ee.Image(posPrecip).addBands(yearlyConstant);
  var Qcalc = ee.Image(MergedDataset).expression('((P - 0.2*S)**2)/(P+0.8*S)', {P: ee.Image(MergedDataset).select('precipitation'), S: ee.Image(MergedDataset).select('S')})
                                     .select(['precipitation'],['Runoff']);
  return ee.Image(MergedDataset).addBands(Qcalc);
  });
    }
    app.ImageAnimate = app.GoldenData.size().getInfo();
    app.applyLeftUI();
    app.applyRightUI();
    app.applyAGUnit();
    return true;
  };
  app.applyAGUnit = function() {
    if(app.agUnitValue == "CEC Ecoregion Level 4") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.CECEco4Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 4"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.CECEco4Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 4"));
    } else if(app.agUnitValue == "States") {
      app.leftMap.layers().insert(fapp.ImageAnimate, ui.Map.Layer(app.StatesShape.style(app.Feature_STYLE)).setName("States"));
      app.rightMap.layers().insert(fapp.ImageAnimate, ui.Map.Layer(app.StatesShape.style(app.Feature_STYLE)).setName("States"));
    } else if(app.agUnitValue == "MODIS Tiles") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(ee.FeatureCollection(app.MODISTileShape).style(app.Feature_STYLE)).setName("MODIS tiles"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(ee.FeatureCollection(app.MODISTileShape).style(app.Feature_STYLE)).setName("MODIS tiles"));
    } else if(app.agUnitValue == "Custom Shapefile") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.AzB.style(app.Feature_STYLE)).setName("Custom Shapefile"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.AzB.style(app.Feature_STYLE)).setName("Custom Shapefile"));
    } else if(app.agUnitValue == "HUC 2") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC2Shape.style(app.Feature_STYLE)).setName("2 digit Hydrologic Unit Code"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC2Shape.style(app.Feature_STYLE)).setName("2 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 6") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC6Shape.style(app.Feature_STYLE)).setName("6 digit Hydrologic Unit Code"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC6Shape.style(app.Feature_STYLE)).setName("6 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 4") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC4Shape.style(app.Feature_STYLE)).setName("4 digit Hydrologic Unit Code"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC4Shape.style(app.Feature_STYLE)).setName("4 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 8") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC8Shape.style(app.Feature_STYLE)).setName("8 digit Hydrologic Unit Code"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC8Shape.style(app.Feature_STYLE)).setName("8 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 10") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC10Shape.style(app.Feature_STYLE)).setName("10 digit Hydrologic Unit Code"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.HUC10Shape.style(app.Feature_STYLE)).setName("10 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 12") {
      app.leftMap.layers().set(app.ImageAnimate, ui.Map.Layer(app.HUC12Shape.style(app.Feature_STYLE)).setName("12 digit Hydrologic Unit Code"));
      app.rightMap.layers().set(app.ImageAnimate, ui.Map.Layer(app.HUC12Shape.style(app.Feature_STYLE)).setName("12 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "Countries") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.CountriesShape.style(app.Feature_STYLE)).setName("Countries"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.CountriesShape.style(app.Feature_STYLE)).setName("Countries"));
    } else if(app.agUnitValue == "Counties") {
      app.leftMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.CountiesShape.style(app.Feature_STYLE)).setName("Counties"));
      app.rightMap.layers().insert(app.ImageAnimate, ui.Map.Layer(app.CountiesShape.style(app.Feature_STYLE)).setName("Counties"));
    }
  };  
  app.applyLeftUI = function() {
    app.GatherInputs();
    app.leftMap.clear();
    app.leftMap.onClick(app.MapClickEvent);
    var leftImage;
    if(app.leftMapValue == "Precipitation") {
      app.addImagesToLeftMap(app.GoldenData.select('precipitation'));
      app.leftMapLegend.PrecipLabels.style().set({shown: true});
      app.leftMapLegend.PrecipcolorBar.style().set({shown: true});
      app.leftMapLegend.PrecipcolorBarLabels.style().set({shown: true});
      app.leftMapLegend.RunoffLabels.style().set({shown: false});
      app.leftMapLegend.RunoffcolorBar.style().set({shown: false});
      app.leftMapLegend.RunoffcolorBarLabels.style().set({shown: false});
    } else if(app.leftMapValue == "Runoff") {
      app.addImagesToLeftMap(app.GoldenData.select('Runoff'));
      app.leftMapLegend.PrecipLabels.style().set({shown: false});
      app.leftMapLegend.PrecipcolorBar.style().set({shown: false});
      app.leftMapLegend.PrecipcolorBarLabels.style().set({shown: false});
      app.leftMapLegend.RunoffLabels.style().set({shown: true});
      app.leftMapLegend.RunoffcolorBar.style().set({shown: true});
      app.leftMapLegend.RunoffcolorBarLabels.style().set({shown: true});
    } 
  };
  app.addImagesToLeftMap = function(ImageCollectionToMap) {
    var vis;
    app.ImageToAnimate = ImageCollectionToMap.size().getInfo();
    app.animation.IndexSlider.setMax(app.ImageToAnimate);
    if(app.precipValue == "GRIDMET") {
      vis = app.GRIDMETVis;
    } else if(app.precipValue == "TRMM 3 Hour") {
      vis = app.TRMMVis;
    } else if(app.precipValue == "Global Precipitation Measurement") {  
      vis = app.GPMvis;
    } else if(app.precipValue == "PERSIANN-CDR") {   
      vis = app.PERSIANN_CDRVis;
    } else if(app.precipValue == "CHIRPS") {   
      vis = app.CHIRPSVis;
    }
    var orderCorrectedImages = ImageCollectionToMap.toList(900).reverse();
    for(var i = 0; i <= app.ImageAnimate-1; i++) {
      app.leftMap.layers().insert(0, ui.Map.Layer(ee.Image(orderCorrectedImages.get(i)), {min:vis.min, max:vis.max, palette:vis.palette}, ee.String(ee.Date(ee.Image(orderCorrectedImages.get(i)).get("system:time_start")).format("MM-dd-YYYY HH")).getInfo(), true, 0));
    }
    app.applyAGUnit();
    return true;
  };
  app.applyRightUI = function() {
    app.rightMap.clear();
    app.GatherInputs();
    // right map
    var rightImage;
    if(app.rightMapValue == "S map") {
      rightImage = app.GoldenData.select('S').first();
      app.rightMap.addLayer(rightImage, app.SmapVis, "S Map");
      app.rightMapLegend.NLCDUnitPanel.style().set({shown: false});
      app.rightMapLegend.OLMUnitPanel.style().set({shown: false});
      app.rightMapLegend.SMapLabels.style().set({shown: true});
      app.rightMapLegend.SMapcolorBar.style().set({shown: true});
      app.rightMapLegend.SMapcolorBarLabels.style().set({shown: true});
    } else if(app.rightMapValue == "National Land Cover Dataset") {
      rightImage = app.GoldenData.select('landcover').first();
      app.rightMap.addLayer(rightImage, {min:app.landcoverVis.min, max:app.landcoverVis.max, palette:app.landcoverVis.palette}, "NLCD");
      app.rightMapLegend.NLCDUnitPanel.style().set({shown: true});
      app.rightMapLegend.OLMUnitPanel.style().set({shown: false});
      app.rightMapLegend.SMapLabels.style().set({shown: false});
      app.rightMapLegend.SMapcolorBar.style().set({shown: false});
      app.rightMapLegend.SMapcolorBarLabels.style().set({shown: false});
    } else if(app.rightMapValue == "Open Land Map Soil Texture") {
      rightImage = app.GoldenData.select('Soil').first();
      app.rightMap.addLayer(rightImage, app.OLMSoilTextureImageVis, "OLM Soil");
      app.rightMapLegend.NLCDUnitPanel.style().set({shown: false});
      app.rightMapLegend.OLMUnitPanel.style().set({shown: true});
      app.rightMapLegend.SMapLabels.style().set({shown: false});
      app.rightMapLegend.SMapcolorBar.style().set({shown: false});
      app.rightMapLegend.SMapcolorBarLabels.style().set({shown: false});
    }
    return true;
  };
  // Get the AG feature
  app.getSelectedFeatures = function() {
    app.GatherInputs();
    app.myPointPoly;
    var catString;
    var catStringA;
    if(app.agUnitValue == "CEC Ecoregion Level 1") {
      app.myPointPoly = app.CECEco1Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      catString = String("Selected: "+app.myPointPoly.first().get('NA_L1NAME').getInfo());
      app.USLegend.agUnitSelectFeatureLabel.setValue(catString);
    } else if(app.agUnitValue == "CEC Ecoregion Level 3") {
      app.myPointPoly = app.CECEco3Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // var NN4 = app.myPointPoly.first().get('us_l4name').getInfo();
      // catString = String("Selected:"+NN4);
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "CEC Ecoregion Level 4") {
      app.myPointPoly = app.CECEco4Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // var N1 = app.myPointPoly.first().get('na_l1name').getInfo();
      // var N4 = app.myPointPoly.first().get('us_l4name').getInfo();
      // catString = String("Selected:"+N1+" - "+N4);
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "States") {
      app.myPointPoly = app.StatesShape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: HUC "+app.myPointPoly.first().get('NAME').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "Custom Shapefile") {
      app.myPointPoly = app.AzB.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: "+app.myPointPoly.first().get('Name').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "Countries") {
      app.myPointPoly = app.CountriesShape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: "+app.myPointPoly.first().get('country_na').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "MODIS Tiles") {
      app.myPointPoly = app.MODISTileShape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // var h = app.myPointPoly.first().get('h').getInfo();
      // var v = app.myPointPoly.first().get('v').getInfo();
      // catString = String("Selected: Tile H:"+h+" V:"+v);
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "HUC 2") {
      app.myPointPoly = app.HUC2Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: HUC "+app.myPointPoly.first().get('HUC2').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "HUC 4") {
      app.myPointPoly = app.HUC4Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: HUC "+app.myPointPoly.first().get('huc4').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "HUC 6") {
      app.myPointPoly = app.HUC6Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: HUC "+app.myPointPoly.first().get('huc6').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "HUC 8") {
      app.myPointPoly = app.HUC8Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: HUC "+app.myPointPoly.first().get('huc8').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "HUC 10") {
      app.myPointPoly = app.HUC10Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: HUC "+app.myPointPoly.first().get('huc10').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    } else if(app.agUnitValue == "HUC 12") {
      app.myPointPoly = app.HUC12Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      catString = String("Selected: HUC "+app.myPointPoly.first().get('huc12').getInfo());
      catStringA = String("Area: "+ ee.Feature(app.myPointPoly.first()).area().getInfo() + " sq meters");
      app.buttonPanelLables.SelectUnit.setValue(catString);
      app.buttonPanelLables.SelectUnitArea.setValue(catStringA);
    } else if(AGUnitSelectValue == "Point (mouse click)") {
      app.myPointPoly = ee.Feature(ee.Geometry.MultiPoint(app.selectedPoints).buffer(15));
      // app.MainMap.layers().add(ui.Map.Layer(ee.FeatureCollection(ee.Feature(app.myPointPoly)).style(app.Feature_STYLE)).setName("Selected feature"));
      // app.USLegend.NameLabel.setValue("Selected: User Selected");
    } else if(AGUnitSelectValue == "Map Bounding Box (on click)") {
      app.myPointPoly = ee.Feature(ee.Geometry.Rectangle(app.MainMap.getBounds()));
      // app.MainMap.layers().add(ui.Map.Layer(ee.FeatureCollection(ee.Feature(app.myPointPoly)).style(app.Feature_STYLE)).setName("Selected feature"));
      // app.USLegend.NameLabel.setValue("Selected: User Selected");
    } else if(AGUnitSelectValue == "Counties") {
      app.myPointPoly = app.CountiesShape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // catString = String("Selected: "+app.myPointPoly.first().get('country_na').getInfo());
      // app.USLegend.NameLabel.setValue(catString);
    }
    // app.MainMap.layers().add(ui.Map.Layer(ee.FeatureCollection(app.myPointPoly).style(app.HIGHLIGHT_STYLE)).setName("Selected feature")); 
    // app.leftMap.layers().set(2, ui.Map.Layer(ee.FeatureCollection(app.myPointPoly).style(app.HIGHLIGHT_STYLE)).setName("Selected feature")); 
    app.leftMap.centerObject(ee.FeatureCollection(app.myPointPoly));
    return app.myPointPoly;
  };   
  // Takes results from Select features and makes the dataset, returns raw chart data
  app.makeChartData = function(AOI) {
    var TotalMonthlyChart = ui.Chart.image.series(app.GoldenData.select('precipitation', 'Runoff'),app.myPointPoly,ee.Reducer.sum()).setOptions({
      title: 'Rainfall-Runoff',
      hAxis: {title: 'Day'},
      vAxis:{title:'rainfall/runoff (mm)'}
    });
    app.TimeseriesResults.add(ui.Panel([TotalMonthlyChart], ui.Panel.Layout.Flow("vertical")));
                        // .add(app.buttonPanel);
  };
  // fires off a chain of functions to return the chart panels
  app.MapClickEvent = function(coords) {
    app.TimeseriesResults.clear();
    app.selectedPoints.push([coords.lon, coords.lat]);
    app.makeChartData(app.getSelectedFeatures());
    // app.makeCharts();
  };
  app.OpacitySlide = function(OslideValue) {
    app.leftMap.layers().get(app.currentIndex).setOpacity(OslideValue);
  };
  app.nextFrame = function() {
    var index = app.currentIndex + 1;
    if(index > app.ImageAnimate-1) {
      index = 0;
    }
    app.animation.IndexSlider.setValue(index);
    if(app.play) {ui.util.setTimeout(app.nextFrame, app.timeStep);}
  };
  app.showLayer = function(index) { 
    var opValue =  app.animation.OpSlider.getValue();
    app.leftMap.layers().get(app.currentIndex).setOpacity(0);
    app.leftMap.layers().get(index).setOpacity(opValue);
    app.currentIndex = index;
    app.animation.IndexSliderImageName.setValue(app.leftMap.layers().get(index).getName());
    return true;
  };
  app.delay = function(millis, callback) {
    var before = Date.now();
    function loop() {
      ee.Number(Date.now()).evaluate(function(now) { 
        if(now < before + millis) {
          loop();
        } else {
          callback();
        }
      });
    }
    loop();
  };
  app.setTimeout = function(interval, action) {
    app.delay(interval, function() {
      action();
      app.setTimeout(interval, action);
    });
  };
  app.onPlayPause = function() {
    app.timeStep = parseInt(app.animation.TimestepValue.getValue(),10);
    if(!app.play && !app.timeout) {
      app.timeout = ui.util.setTimeout(app.nextFrame, app.timeStep);
      app.play = true;
      app.animation.buttonPlayPause.setLabel(app.textPause);
    } else {
      ui.util.clearTimeout(app.timeout);
      app.timeout = null;
      app.play = false;
      app.animation.buttonPlayPause.setLabel(app.textPlay);
    }
  };  
  app.applyBothUI = function() {
    var finalImage = 200;
    if(app.agUnitValue == "CEC Ecoregion Level 4") {
      app.leftMap.layers().insert(finalImage, ui.Map.Layer(app.CECEco4Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 4"));
      app.rightMap.layers().insert(finalImage, ui.Map.Layer(app.CECEco4Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 4"));
    } else if(app.agUnitValue == "States") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.StatesShape.style(app.Feature_STYLE)).setName("States"));
    } else if(app.agUnitValue == "MODIS Tiles") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(ee.FeatureCollection(app.MODISTileShape).style(app.Feature_STYLE)).setName("MODIS tiles"));
    } else if(app.agUnitValue == "Custom Shapefile") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.AzB.style(app.Feature_STYLE)).setName("Custom Shapefile"));
    } else if(app.agUnitValue == "HUC 2") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.HUC2Shape.style(app.Feature_STYLE)).setName("2 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 6") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.HUC6Shape.style(app.Feature_STYLE)).setName("6 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 4") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.HUC4Shape.style(app.Feature_STYLE)).setName("4 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 8") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.HUC8Shape.style(app.Feature_STYLE)).setName("8 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 10") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.HUC10Shape.style(app.Feature_STYLE)).setName("10 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "HUC 12") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.HUC12Shape.style(app.Feature_STYLE)).setName("12 digit Hydrologic Unit Code"));
    } else if(app.agUnitValue == "Countries") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.CountriesShape.style(app.Feature_STYLE)).setName("Countries"));
    } else if(app.agUnitValue == "Counties") {
      app.rightMap.layers().set(finalImage, ui.Map.Layer(app.CountiesShape.style(app.Feature_STYLE)).setName("Counties"));
    }
  };
};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    legendPrimePanel: ui.Panel([
      ui.Label({
        value: "Google Earth Engine Runoff Calculator", 
        style: {fontWeight: "bold", fontSize: "18px", margin: "0 0 4px 0", padding: "0"}
      }),
      ui.Label({
        value: " **Alpha Build**  This will change once we've figured out what it is we want to export.  Thanks to the Google Earth Engine team for the fantastic platform.",
       style: {fontWeight: "normal", fontSize: "12px", maxWidth: "600px", margin: "0 0 4px 0", padding: "0", whiteSpace:'pre-wrap', textAlign:'justify'}
      }),
      ui.Label({
        value: "See the paper published in xxx.", 
        style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
      }).setUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    ])
  }; 
  app.UserFilterControls = {
    dateSelectLabel: ui.Label({value: "Pick a date range: 1)", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    startDateLabel: ui.Label('Start date:', {margin: '8px 0 -3px 8px', fontSize: '12px', color: 'black'}),
    startDate: ui.Textbox('YYYY-MM-DD', '2017-07-02'),
    endDateLabel: ui.Label('End date:', {margin: '8px 0 -3px 8px', fontSize: '12px', color: 'black'}),
    endDate: ui.Textbox('YYYY-MM-DD', '2017-07-03'),
    ApplyFilters: ui.Button({label: "Apply", onClick: app.GenerateDataset}),
    HelperText: ui.Label({value: "Need help finding an event?", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "1"}}).setUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
    agUnitSelectLabel: ui.Label({value: "Aggregation unit:", style: {margin: '8px 0 -3px 8px', fontSize: '12px', color: 'black'}}),
    agUnitSelect: ui.Select({items: [app.MapPointString, app.MapBoxString, app.CountriesString, app.HUC2String, app.HUC4String, app.HUC6String, app.HUC8String, app.HUC10String, app.HUC12String, app.CECEco4String], 
                             value:app.HUC12String}),
    precipSourceLabel: ui.Label({value: "Precipitation source:", style:{margin: '8px 0 -3px 8px', fontSize: '12px', color: 'black'}}),
    precipSource: ui.Select({items: [app.CHIRPSString, app.GPMString, app.PERSIANN_CDRString, app.TRMMString, app.GRIDMETString], 
                             value:app.TRMMString})
  };
  app.UserFilterControls.startPanel = ui.Panel({    
    widgets: [
      app.UserFilterControls.startDateLabel,
      app.UserFilterControls.startDate,
      app.UserFilterControls.agUnitSelectLabel,
      app.UserFilterControls.agUnitSelect
    ], 
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {padding: "8px 15px"} 
  });
  app.UserFilterControls.endPanel = ui.Panel({    
    widgets: [
      app.UserFilterControls.endDateLabel,
      app.UserFilterControls.endDate,
      app.UserFilterControls.precipSourceLabel,
      app.UserFilterControls.precipSource
    ], 
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {padding: "8px 15px"} 
  });
  app.leftMapLegend = {
    leftMapSelectLabel: ui.Label({value: "Select the left Map:", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    leftMapSelect: ui.Select({items: [app.Precip, app.Runoff],
                         value: app.Precip, 
                         onChange: app.applyLeftUI}),
    PrecipLabels: ui.Label({value: "Precipitation (mm)", style: {fontWeight: "bold", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    PrecipcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.Precip3hourVis.palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: true}}),
    PrecipcolorBarLabels: ui.Panel({widgets: [ui.Label("0", {margin: '4px 8px'}), ui.Label(("2"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("4", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: true}}),  
    RunoffLabels: ui.Label({value: "Runoff (mm)", style: {fontWeight: "bold", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    RunoffcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.Runoff3hourVis.palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: true}}),
    RunoffcolorBarLabels: ui.Panel({widgets: [ui.Label("0", {margin: '4px 8px'}), ui.Label(("2"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("4", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: true}})  
  };
  app.leftMapLegend.panel = ui.Panel({    
    widgets: [
      app.leftMapLegend.leftMapSelectLabel,
      app.leftMapLegend.leftMapSelect,
      app.leftMapLegend.PrecipLabels,
      app.leftMapLegend.PrecipcolorBar,
      app.leftMapLegend.PrecipcolorBarLabels,
      app.leftMapLegend.RunoffLabels,
      app.leftMapLegend.RunoffcolorBar,
      app.leftMapLegend.RunoffcolorBarLabels
    ], 
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {padding: "8px 15px"} 
  });
  app.rightMapLegend = {
    rightMapSelectLabel: ui.Label({value: "Select the right Map:", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    rightMapSelect: ui.Select({items: [app.SmapString, app.NLCDString, app.OLMSoilTextureString], 
                         value: app.NLCDString, 
                         onChange: app.applyRightUI}),
    NLCDUnitPanel: ui.Panel({
      widgets: [
        ui.Label({value: "NLCD Classification", style: {fontWeight: "bold", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
        app.makeRow(app.NLCDColors[0], app.NLCDNames[0]),
        app.makeRow(app.NLCDColors[1], app.NLCDNames[1]),
        app.makeRow(app.NLCDColors[2], app.NLCDNames[2]),
        app.makeRow(app.NLCDColors[3], app.NLCDNames[3]),
        app.makeRow(app.NLCDColors[4], app.NLCDNames[4]),
        app.makeRow(app.NLCDColors[5], app.NLCDNames[5]),
        app.makeRow(app.NLCDColors[6], app.NLCDNames[6]),
        app.makeRow(app.NLCDColors[7], app.NLCDNames[7]),
        app.makeRow(app.NLCDColors[8], app.NLCDNames[8]),
        app.makeRow(app.NLCDColors[9], app.NLCDNames[9]),
        app.makeRow(app.NLCDColors[10], app.NLCDNames[10]),
        app.makeRow(app.NLCDColors[11], app.NLCDNames[11]),
        app.makeRow(app.NLCDColors[12], app.NLCDNames[12]),
        app.makeRow(app.NLCDColors[13], app.NLCDNames[13]),
        app.makeRow(app.NLCDColors[14], app.NLCDNames[14]),
        app.makeRow(app.NLCDColors[15], app.NLCDNames[15]),
        app.makeRow(app.NLCDColors[16], app.NLCDNames[16]),
        app.makeRow(app.NLCDColors[17], app.NLCDNames[17]),
        app.makeRow(app.NLCDColors[18], app.NLCDNames[18]),
        app.makeRow(app.NLCDColors[19], app.NLCDNames[19])
      ],
      layout: ui.Panel.Layout.flow("vertical"), 
      style: {padding: "8px 15px"} 
    }),
    OLMUnitPanel: ui.Panel({
      widgets: [
        ui.Label({value: "Open Land Map Soil Texture", style: {fontWeight: "bold", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
        app.makeRow(app.OLMSoilColor[0], app.OLMSoilFullName[0]),
        app.makeRow(app.OLMSoilColor[1], app.OLMSoilFullName[1]),
        app.makeRow(app.OLMSoilColor[2], app.OLMSoilFullName[2]),
        app.makeRow(app.OLMSoilColor[3], app.OLMSoilFullName[3]),
        app.makeRow(app.OLMSoilColor[4], app.OLMSoilFullName[4]),
        app.makeRow(app.OLMSoilColor[5], app.OLMSoilFullName[5]),
        app.makeRow(app.OLMSoilColor[6], app.OLMSoilFullName[6]),
        app.makeRow(app.OLMSoilColor[7], app.OLMSoilFullName[7]),
        app.makeRow(app.OLMSoilColor[8], app.OLMSoilFullName[8]),
        app.makeRow(app.OLMSoilColor[9], app.OLMSoilFullName[9]),
        app.makeRow(app.OLMSoilColor[10], app.OLMSoilFullName[10]),
        app.makeRow(app.OLMSoilColor[11], app.OLMSoilFullName[11])
      ],
      layout: ui.Panel.Layout.flow("vertical"), 
      style: {padding: "8px 15px"} 
    }),
    SMapLabels: ui.Label({value: "S amp", style: {fontWeight: "bold", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    SMapcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.SmapVis.palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: true}}),
    SMapcolorBarLabels: ui.Panel({widgets: [ui.Label("3", {margin: '4px 8px'}), ui.Label(("16.5"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("33", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: true}})
  };
  app.rightMapLegend.panel = ui.Panel({    
    widgets: [
      app.rightMapLegend.rightMapSelectLabel,
      app.rightMapLegend.rightMapSelect,
      app.rightMapLegend.NLCDUnitPanel,
      app.rightMapLegend.OLMUnitPanel,
      app.rightMapLegend.SMapLabels,
      app.rightMapLegend.SMapcolorBar,
      app.rightMapLegend.SMapcolorBarLabels
    ], 
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {padding: "8px 15px"} 
  });
  app.animation = {
    buttonPlayPause: ui.Button({label: app.textPlay, onClick: app.onPlayPause}),
    IndexSliderTitle: ui.Label({value: "Index:", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    IndexSlider: ui.Slider({min: 0, max: app.ImageAnimate, step: 1, style: {stretch: 'horizontal'}}),
    IndexSliderImageName: ui.Label({value: "Blank image", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    TimestepValueTitle: ui.Label({value: "Timestep (ms):", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    TimestepValue: ui.Textbox({placeholder:"##", value: "1000", style: {position: "top-right", padding: "8px 15px", maxWidth: 7}}),
    OpSliderTitle: ui.Label({value: "Opacity:", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    OpSlider: ui.Slider({min: 0, max: 1, value: 1, step: 0.1, style: {stretch: 'horizontal'}}),
    buttonExportTile: ui.Button({label: "Export Raster", onClick: app.ExportImage}),
    buttonExportVideo: ui.Button({label: "Export Video", onClick: app.ExportVideo})
  };
  app.animation.IndexSlider.onSlide(app.showLayer);
  app.animation.OpSlider.onSlide(app.OpacitySlide);  
  app.animation.panel1 = ui.Panel({
    widgets: [
      app.animation.buttonPlayPause,
      app.animation.IndexSliderTitle,
      app.animation.IndexSlider,
      app.animation.IndexSliderImageName
    ], 
    layout: ui.Panel.Layout.flow("horizontal"), 
    style: {padding: "8px 15px", shown: true} 
  });
  app.animation.panel2 = ui.Panel({
    widgets: [
      app.animation.OpSliderTitle,
      app.animation.OpSlider
    ], 
    layout: ui.Panel.Layout.flow("horizontal"), 
    style: {padding: "8px 15px", shown: true} 
  }); 
  app.animation.panel3 = ui.Panel({
    widgets: [
      app.animation.TimestepValueTitle,
      app.animation.TimestepValue,
      app.animation.buttonExportTile,
      app.animation.buttonExportVideo
    ], 
    layout: ui.Panel.Layout.flow("horizontal"), 
    style: {padding: "8px 15px"} 
  });
  app.ChartTitle = ui.Label({value: "Select a region to create the chart:", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}});
  app.TimeseriesResults = ui.Panel();
  app.instructionsLabel = ui.Label("Awaiting input");
  app.TimeseriesResults.widgets().reset([app.instructionsLabel]);
  app.buttonPanelLables = {
    SelectUnit: ui.Label({value: "Selected unit: None", style: {margin: '8px 0 -3px 8px', fontSize: '12px', color: 'black'}}),
    SelectUnitArea: ui.Label({value: "Area: None", style: {margin: '8px 0 -3px 8px', fontSize: '12px', color: 'black'}})
  };
  app.buttonPanel = ui.Panel(
    [app.buttonPanelLables.SelectUnit,app.buttonPanelLables.SelectUnitArea],
    ui.Panel.Layout.Flow("horizontal"), {margin: "0 0 0 auto", width: "500px"}
  );
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  app.leftMap = ui.Map().setOptions({mapTypeId:'SATELLITE'});
  app.rightMap = ui.Map();
  app.leftMap.style().set({cursor: "crosshair"});
  app.leftMap.onClick(app.MapClickEvent);
  app.rightMap.style().set({cursor: "crosshair"});
  app.rightMap.onClick(app.MapClickEvent);
  app.splitPanel = ui.SplitPanel({
    firstPanel: app.leftMap,
    secondPanel: app.rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  app.linker = ui.Map.Linker([app.leftMap, app.rightMap]);
  var Legend = ui.Panel({
    widgets: [
      app.intro.legendPrimePanel,
      ui.Label("User inputs: 1)"),
      // ui.Label({value: "Need help finding an event?", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "1"}}).setUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
      ui.Panel({    
        widgets: [app.UserFilterControls.startPanel,app.UserFilterControls.endPanel, app.UserFilterControls.ApplyFilters], 
        layout: ui.Panel.Layout.flow("horizontal"), 
        style: {padding: "8px 15px"} 
      }),
      ui.Label("Map layer controls: 2)"),
      ui.Panel({
        widgets: [app.leftMapLegend.panel, app.rightMapLegend.panel],
        layout: ui.Panel.Layout.flow("horizontal"),
        style: {padding: "4px 4px"}
      }),
      app.animation.panel1,
      app.animation.panel2,
      app.animation.panel3,
      app.ChartTitle,
      app.TimeseriesResults,
      app.buttonPanel
    ],
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {position: "top-left", padding: "8px 15px"}
  });
  ui.root.insert(0, Legend);                            //Add the legend to the UI
  ui.root.insert(1, app.splitPanel);
  app.GenerateDataset();
};
ui.root.widgets().reset();
app.boot();