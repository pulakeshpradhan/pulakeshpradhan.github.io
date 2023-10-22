/* 
  _____   _____      _      __  __ 
 |_   _| | ____|    / \    |  \/  |
   | |   |  _|     / _ \   | |\/| |
   | |   | |___   / ___ \  | |  | |
   |_|   |_____| /_/   \_\ |_|  |_|
       .------..                                     _------__--___.__.
     -          -                                  /            `  `    \
   /              \                               |                      \
 /                   \                            |                       |
/    .--._    .---.   |       Hey Butthead,        \                      |
|  /      -__-     \   |     Why are we here?        ~/ --`-`-`-\         |
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
ToDo: Remove WUE tag/simplify that
Fix the display of export buttons...
add exports (on google)
Feel free to modify this code to suit your needs, or email me at jcoll@ku.edu and I can try and answer your questions or add additional features.  For those
of you interested in how this works, feel free to read through the code, and remember to use the arrows next to the numbers to collapse functions 
for an easier read.  Stay tuned for more...
----- Acknowledgments -----
Thanks to Google for creating such a fantastic platform on which I can do this kind of stuff on.
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
  app.TerraNetET = ee.ImageCollection("MODIS/006/MOD16A2");
  app.TerraGPP = ee.ImageCollection("MODIS/006/MOD17A2H");
  app.NLCD = ee.ImageCollection("USGS/NLCD");
  app.TerraLC = ee.ImageCollection("MODIS/006/MCD12Q1").select("LC_Type1", "LC_Type2");
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
  app.BrazilString = "Custom Shapefile";
  app.AzB = ee.FeatureCollection("users/JamesMColl/MergedData");    //https://code.earthengine.google.com/?asset=users/JamesMColl/MergedSAData
  app.CountriesString = "Countries";
  app.CountriesShape = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
  app.StatesString = "States";
  app.StatesShape = ee.FeatureCollection("TIGER/2016/States");  
  app.CountiesString = "Counties";
  app.CountiesShape = ee.FeatureCollection("TIGER/2018/Counties");
  app.MODISTileString = "MODIS Tiles";
  app.MODISTileShape = ee.FeatureCollection("users/JamesMColl/modis_grid");
  app.MapPointString = "Point (mouse click)";
  app.MapBoxString = "Map Bounding Box (on click)";
  // Select Vars
  app.IGBPString = "IGBP Land Cover";
  app.UMDString = "UMD Land Cover";
  app.NoLandCover = "None";
  app.NLCDString = "National Land Cover Dataset";
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
  app.UMDNamesDic = {
    code_0: "Water",
    code_1: "Evergreen needleleaf forest",
    code_2: "Evergreen broadleaf forest",
    code_3: "Deciduous needleleaf forest",
    code_4: "Deciduous broadleaf forest",
    code_5: "Mixed forest",
    code_6: "Closed shrublands",
    code_7: "Open shrublands",
    code_8: "Woody savannas",
    code_9: "Savannas",
    code_10: "Grasslands",
    code_11: "Permanent Wetlands",
    code_12: "Croplands",
    code_13: "Urban and Built-up Lands",
    code_14: "Cropland/Natural Vegetation Mosaics",
    code_15: "Non-Vegetated Lands"
  };
  app.IGBPNamesDic = {
    code_17: "Water",
    code_1: "Evergreen Needleleaf forest",
    code_2: "Evergreen Broadleaf forest",
    code_3: "Deciduous Needleleaf forest",
    code_4: "Deciduous Broadleaf forest",
    code_5: "Mixed forest",
    code_6: "Closed shrublands",
    code_7: "Open shrublands",
    code_8: "Woody savannas",
    code_9: "Savannas",
    code_10: "Grasslands",
    code_11: "Permanent wetlands",
    code_12: "Croplands",
    code_13: "Urban and built-up",
    code_14: "Cropland/Natural vegetation mosaic",
    code_15: "Snow and ice",
    code_16: "Barren or sparsely vegetated",
    code_254: "Unclassified",
    code_255: "Fill Value"
  };
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
  app.EmptyNamesDic = {code_1: "Value"};
  app.UMDSelectors = ["code_0","code_1","code_2","code_3","code_4","code_5","code_6","code_7","code_8","code_9","code_10","code_11","code_12","code_13","code_14","code_15"];
  app.IGBPSelectors = ["code_1","code_2","code_3","code_4","code_5","code_6","code_7","code_8","code_9","code_10","code_11","code_12","code_13","code_14","code_15","code_16","code_17","code_254"];
  app.NLCDSelectors = ["code_11","code_12","code_21","code_22","code_23","code_24","code_31","code_41","code_42","code_43","code_51","code_52","code_71","code_72","code_73","code_74","code_81","code_82","code_90","code_95"];
  app.EmptySelectors = ["code_1"];
  app.selectNames = ["code_1", "code_2", "code_3", "code_4", "code_5", "code_6", "code_7", "code_8", "code_9", "code_10","code_11","code_12","code_13","code_14","code_15","code_16","code_17","code_21","code_22","code_24","code_31","code_41","code_42","code_43","code_51","code_52","code_71","code_72","code_73","code_74","code_81","code_82","code_90","code_95","date YYYY-MM-dd"];
  app.selectNamesNoDate = ["code_1","code_2","code_3","code_4","code_5","code_6","code_7","code_8","code_9","code_10","code_11","code_12","code_13","code_14","code_15","code_16","code_17","code_21","code_22","code_24","code_31","code_41","code_42","code_43","code_51","code_52","code_71","code_72","code_73","code_74","code_81","code_82","code_90","code_95"];
  app.BlueToBrown = ['964B00', 'A15F1C', 'AD7338', 'B98755', 'C49B71', 'D0AF8D', 'DCC3AA', 'E7D7C6', 'F3EBE2', 'FFFFFF', 'E7F1FA', 'CFE4F6', 'B7D7F2', '9FCAED', '88BDE9', '70B0E5', '58A3E0', '4096DC', '2989D8'];
  app.WhiteToBlack = ["#000000", "#050505", "#0A0A0A", "#0F0F0F", "#141414", "#1A1A1A", "#1F1F1F", "#242424", "#292929", "#2E2E2E", "#343434", "#393939", "#3E3E3E", "#434343", "#484848", "#4E4E4E", "#535353", "#585858", "#5D5D5D", "#626262", "#686868", "#6D6D6D", "#727272", "#777777", "#7C7C7C", "#828282", "#878787", "#8C8C8C", "#919191", "#969696", "#9C9C9C", "#A1A1A1", "#A6A6A6", "#ABABAB", "#B0B0B0", "#B6B6B6", "#BBBBBB", "#C0C0C0", "#C5C5C5", "#CACACA", "#D0D0D0", "#D5D5D5", "#DADADA", "#DFDFDF", "#E4E4E4", "#EAEAEA", "#EFEFEF", "#F4F4F4", "#F9F9F9", "#FFFFFF"];
  app.ETvis = {
    min:0,
    max:70,
    Palette:['ffffff', 'fcd163', '99b718', '66a000', '3e8601', '207401', '056201', '004c00', '011301']
  };
  app.PETvis = {
    min:0,
    max:70,
    Palette:['f7fcf5', 'e5f5e0', 'c7e9c0', 'a1d99b', '74c476', '41ab5d', '238b45', '006d2c', '00441b']
  };
  app.Gppvis = {
    min:0,
    max:0.06,
    Palette:['bbe029', '0a9501', '074b03']
  };
  app.LEvis = {
    min:0,
    max:0.12,
    Palette:['fff7ec', 'fee8c8', 'fdd49e', 'fdbb84', 'fc8d59', 'ef6548', 'd7301f', 'b30000', '7f0000']
  };
  app.PLEvis = {
    min:0,
    max:0.12,
    Palette:['d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850']
  };
  app.Kvis = {
    min:0,
    max:1,
    Palette:['d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850']
  };
  app.WUEvis = {
    min:0.8,
    max:2.4,
    Palette:['fff7f3','fde0dd','fcc5c0','fa9fb5','f768a1','dd3497','ae017e','7a0177','49006a']
  };
  app.Feature_STYLE = {width: 1, color: "FF0000", fillColor: "00000000"};
  app.HIGHLIGHT_STYLE = {color: "F2F2F2", fillColor: "F2F2F240"};
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
  // Animation
  app.timeout = null;
  app.play = false;
  app.utils = require('users/gena/packages:utils');
  app.text = require('users/gena/packages:text');
  app.textPlay = '▶';
  app.textPause = '⏸';
  app.palettes = require('users/gena/packages:palettes');
  // Function to create the dataset for each month over the series
  // Join the two 8 day MODIS collectuons together
  app.WUEBaseData = null;
  app.WUEBaseData = ee.Join.inner().apply(app.TerraGPP, app.TerraNetET, app.FilterOnStartTime)
    .map(function(element) {
      var imageMerge = ee.Image(element.get("primary")).addBands(ee.Image(element.get("secondary")));
      var scaledImageET = ee.Image(imageMerge).select("ET").multiply(0.1);
      var scaledImagePET = ee.Image(imageMerge).select("PET").multiply(0.1);
      var scaledImageGPP = ee.Image(imageMerge).select("Gpp").multiply(0.0001);	
      var scaledImageLE = ee.Image(imageMerge).select("LE").multiply(0.0001);
      var scaledImagePLE = ee.Image(imageMerge).select("PLE").multiply(0.0001);
      var KBand = scaledImageET.divide(scaledImagePET);
      var WUEBand = ee.Image(scaledImageGPP).divide(scaledImageET).multiply(1000);
      var ProcessedImages = ee.Image(scaledImageET)
                    .addBands(scaledImagePET)
                    .addBands(scaledImageGPP)
                    .addBands(scaledImageLE)
                    .addBands(scaledImagePLE)
                    .addBands(KBand.select(["ET"],["K"]))
                    .addBands(WUEBand.select(["Gpp"],["WUE"]))
                    .copyProperties(imageMerge, ["system:time_start"]);
      if(app.QualityFlagMask) {
        return ee.Image(ProcessedImages)
                 .updateMask(ee.Image(imageMerge).select("ET_QC").bitwiseAnd(1 << 0).eq(0).and(
                   ee.Image(imageMerge).select("Psn_QC").bitwiseAnd(1 << 0).eq(0)));
      } else {
        return ee.Image(ProcessedImages);
      }
    });
  if(app.printStatements) {
    print("(MOD16A2) ET:", app.TerraNetET);
    print("(MOD17A2H) GPP:", app.TerraGPP);
    print("Both datasets overlap:", app.WUEBaseData);
  }
  var generateDatasetSeriesWithLandcover = function() {
    var IGBPLCImage;
    var NLCDLCImage;
    var runningCollecton;
    // ----  For year 2001 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(0));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(1)).select("landcover");
    var MODIS_ET1 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2001-01-01"), ee.Date("2001-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(MODIS_ET1);
    // ----  For year 2002 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(1));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(1)).select("landcover");
    var MODIS_ET2 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2002-01-01"), ee.Date("2002-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET2);
    // ----  For year 2003 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(2));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(5)).select("landcover");
    var MODIS_ET3 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2003-01-01"), ee.Date("2003-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET3);
    // ----  For year 2004 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(3));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(5)).select("landcover");
    var MODIS_ET4 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2004-01-01"), ee.Date("2004-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET4);
    // ----  For year 2005 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(4));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(6)).select("landcover");
    var MODIS_ET5 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2005-01-01"), ee.Date("2005-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET5);
    // ----  For year 2006 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(5));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(6)).select("landcover");
    var MODIS_ET6 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2006-01-01"), ee.Date("2006-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET6);
    // ----  For year 2007 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(6));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(7)).select("landcover");
    var MODIS_ET7 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2007-01-01"), ee.Date("2007-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET7);
    // ----  For year 2008 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(7));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(7)).select("landcover");
    var MODIS_ET8 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2008-01-01"), ee.Date("2008-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET8);
    // ----  For year 2009 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(8));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(7)).select("landcover");
    var MODIS_ET9 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2009-01-01"), ee.Date("2009-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET9);
    // ----  For year 2010 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(9));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(8)).select("landcover");
    var MODIS_ET10 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2010-01-01"), ee.Date("2010-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET10);
    // ----  For year 2011 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(10));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(8)).select("landcover");
    var MODIS_ET11 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2011-01-01"), ee.Date("2011-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET11);
    // ----  For year 2012 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(11));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(12)).select("landcover");
    var MODIS_ET12 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2012-01-01"), ee.Date("2012-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET12);
    // ----  For year 2013 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(12));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(12)).select("landcover");
    var MODIS_ET13 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2013-01-01"), ee.Date("2013-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET13);
    // ----  For year 2014 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(13));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(12)).select("landcover");
    var MODIS_ET14 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2014-01-01"), ee.Date("2014-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET14);
    // ----  For year 2015 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(14));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(13)).select("landcover");
    var MODIS_ET15 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2015-01-01"), ee.Date("2015-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET15);
    // ----  For year 2016 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(15));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(13)).select("landcover");
    var MODIS_ET16 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2016-01-01"), ee.Date("2016-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET16);
    // ----  For year 2017 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(16));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(13)).select("landcover");
    var MODIS_ET17 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2017-01-01"), ee.Date("2017-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET17);
    // ----  For year 2018 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(16));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(13)).select("landcover");
    var MODIS_ET18 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2018-01-01"), ee.Date("2018-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET18);
    // ----  For year 2019 ----
    IGBPLCImage = ee.Image(app.TerraLC.toList(17).get(16));
    NLCDLCImage = ee.Image(app.NLCD.toList(14).get(13)).select("landcover");
    var MODIS_ET19 = ee.ImageCollection(app.WUEBaseData.filterDate(ee.Date("2019-01-01"), ee.Date("2019-12-31")))
      .map(function(image) {
        var ProcessedImage = ee.Image(image)         
                               .addBands(ee.Image.constant(1))
                               .addBands(IGBPLCImage)
                               .addBands(NLCDLCImage);
        return ProcessedImage;
      });
    runningCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET19);
    return ee.ImageCollection(runningCollecton);
  };
  app.GoldenDataset = generateDatasetSeriesWithLandcover();
  if(app.printStatements) {print("Processed ET & LC dataset", app.GoldenDataset)}
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
  app.addImagesToMap = function(ImageCollectionToMap) {
    var vis;
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    app.USLegend.ImageAnimate = ImageCollectionToMap.size().getInfo();
    app.animation.IndexSlider.setMax(app.USLegend.ImageAnimate);
    if(VarSelectValue == "K") {
      vis = app.Kvis;
    } else if(VarSelectValue == "ET") {
      vis = app.ETvis;
    } else if(VarSelectValue == "Gpp") {  
      vis = app.Gppvis;
    } else if(VarSelectValue == "LE") {   
      vis = app.LEvis;
    } else if(VarSelectValue == "PLE") {   
      vis = app.PLEvis;
    } else if(VarSelectValue == "PET") {   
      vis = app.PETvis;
    } else if(VarSelectValue == "WUE") {  
      vis = app.WUEvis;
    }
    var orderCorrectedImages = ImageCollectionToMap.toList(900).reverse();
    for(var i = 0; i <= app.USLegend.ImageAnimate-1; i++) {
      app.MainMap.layers().insert(1, ui.Map.Layer(ee.Image(orderCorrectedImages.get(i)), {min:vis.min, max:vis.max, palette:vis.Palette}, ee.String(ee.Date(ee.Image(orderCorrectedImages.get(i)).get("system:time_start")).format("MM-dd-YYYY")).getInfo(), true, 0));
    }
    return true;
  };
  app.WipeMap = function() {
    app.MainMap.clear();    //Would clear but that removes onclick event as well...
    // for(var i = 0; i <= 500; i++) {
    //   app.MainMap.layers().remove(app.MainMap.layers().get(i));
    // }
    app.MainMap.style().set({cursor: "crosshair"});
    app.MainMap.onClick(app.MapClickEvent);
  };
  app.addColorLegend = function() {
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    if(VarSelectValue == "K") {
      app.LegendColorBlock.ETcolorBar.style().set({shown: false});
      app.LegendColorBlock.ETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PETcolorBar.style().set({shown: false});
      app.LegendColorBlock.PETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.LEcolorBar.style().set({shown: false});
      app.LegendColorBlock.LEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.GppcolorBar.style().set({shown: false});
      app.LegendColorBlock.GppcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PLEcolorBar.style().set({shown: false});
      app.LegendColorBlock.PLEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.WUEcolorBar.style().set({shown: false});
      app.LegendColorBlock.WUEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.KcolorBar.style().set({shown: true});
      app.LegendColorBlock.KcolorLabels.style().set({shown: true});
    } else if(VarSelectValue == "ET") {
      app.LegendColorBlock.ETcolorBar.style().set({shown: true});
      app.LegendColorBlock.ETcolorLabels.style().set({shown: true});
      app.LegendColorBlock.PETcolorBar.style().set({shown: false});
      app.LegendColorBlock.PETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.LEcolorBar.style().set({shown: false});
      app.LegendColorBlock.LEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.GppcolorBar.style().set({shown: false});
      app.LegendColorBlock.GppcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PLEcolorBar.style().set({shown: false});
      app.LegendColorBlock.PLEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.WUEcolorBar.style().set({shown: false});
      app.LegendColorBlock.WUEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.KcolorBar.style().set({shown: false});
      app.LegendColorBlock.KcolorLabels.style().set({shown: false});
    } else if(VarSelectValue == "Gpp") {  
      app.LegendColorBlock.ETcolorBar.style().set({shown: false});
      app.LegendColorBlock.ETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PETcolorBar.style().set({shown: false});
      app.LegendColorBlock.PETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.LEcolorBar.style().set({shown: false});
      app.LegendColorBlock.LEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.GppcolorBar.style().set({shown: true});
      app.LegendColorBlock.GppcolorLabels.style().set({shown: true});
      app.LegendColorBlock.PLEcolorBar.style().set({shown: false});
      app.LegendColorBlock.PLEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.WUEcolorBar.style().set({shown: false});
      app.LegendColorBlock.WUEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.KcolorBar.style().set({shown: false});
      app.LegendColorBlock.KcolorLabels.style().set({shown: false});
    } else if(VarSelectValue == "LE") {   
      app.LegendColorBlock.ETcolorBar.style().set({shown: false});
      app.LegendColorBlock.ETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PETcolorBar.style().set({shown: false});
      app.LegendColorBlock.PETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.LEcolorBar.style().set({shown: true});
      app.LegendColorBlock.LEcolorLabels.style().set({shown: true});
      app.LegendColorBlock.GppcolorBar.style().set({shown: false});
      app.LegendColorBlock.GppcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PLEcolorBar.style().set({shown: false});
      app.LegendColorBlock.PLEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.WUEcolorBar.style().set({shown: false});
      app.LegendColorBlock.WUEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.KcolorBar.style().set({shown: false});
      app.LegendColorBlock.KcolorLabels.style().set({shown: false});
    } else if(VarSelectValue == "PLE") {   
      app.LegendColorBlock.ETcolorBar.style().set({shown: false});
      app.LegendColorBlock.ETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PETcolorBar.style().set({shown: false});
      app.LegendColorBlock.PETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.LEcolorBar.style().set({shown: false});
      app.LegendColorBlock.LEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.GppcolorBar.style().set({shown: false});
      app.LegendColorBlock.GppcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PLEcolorBar.style().set({shown: true});
      app.LegendColorBlock.PLEcolorLabels.style().set({shown: true});
      app.LegendColorBlock.WUEcolorBar.style().set({shown: false});
      app.LegendColorBlock.WUEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.KcolorBar.style().set({shown: false});
      app.LegendColorBlock.KcolorLabels.style().set({shown: false});
    } else if(VarSelectValue == "PET") {   
      app.LegendColorBlock.ETcolorBar.style().set({shown: false});
      app.LegendColorBlock.ETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PETcolorBar.style().set({shown: true});
      app.LegendColorBlock.PETcolorLabels.style().set({shown: true});
      app.LegendColorBlock.LEcolorBar.style().set({shown: false});
      app.LegendColorBlock.LEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.GppcolorBar.style().set({shown: false});
      app.LegendColorBlock.GppcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PLEcolorBar.style().set({shown: false});
      app.LegendColorBlock.PLEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.WUEcolorBar.style().set({shown: false});
      app.LegendColorBlock.WUEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.KcolorBar.style().set({shown: false});
      app.LegendColorBlock.KcolorLabels.style().set({shown: false});
    } else if(VarSelectValue == "WUE") {  
      app.LegendColorBlock.ETcolorBar.style().set({shown: false});
      app.LegendColorBlock.ETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PETcolorBar.style().set({shown: false});
      app.LegendColorBlock.PETcolorLabels.style().set({shown: false});
      app.LegendColorBlock.LEcolorBar.style().set({shown: false});
      app.LegendColorBlock.LEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.GppcolorBar.style().set({shown: false});
      app.LegendColorBlock.GppcolorLabels.style().set({shown: false});
      app.LegendColorBlock.PLEcolorBar.style().set({shown: false});
      app.LegendColorBlock.PLEcolorLabels.style().set({shown: false});
      app.LegendColorBlock.WUEcolorBar.style().set({shown: true});
      app.LegendColorBlock.WUEcolorLabels.style().set({shown: true});
      app.LegendColorBlock.KcolorBar.style().set({shown: false});
      app.LegendColorBlock.KcolorLabels.style().set({shown: false});
    }
  };
  // HelperApp - todo?
  app.GatherInputs = function() {
    return true;
  };
  // Wipes map and adds Add LandCover and US unit
  app.addBaseData = function() {
    app.USLegend.NameLabel.setValue("Selected: null");
    var dateSliderValue = app.LCLegend.dateSlider.getValue();
    var LCSelectValue = app.LCLegend.LCSelect.getValue();
    var AGUnitSelectValue = app.USLegend.AGUnitSelect.getValue();
    var LCtoView;
    app.WipeMap();
    if(LCSelectValue == "National Land Cover Dataset") {
      app.LCLegend.IGBPUnitPanel.style().set({shown: false});
      app.LCLegend.UMDUnitPanel.style().set({shown: false});
      app.LCLegend.NLCDUnitPanel.style().set({shown: true});
      LCtoView = app.NLDCVis.filterDate(dateSliderValue[0], dateSliderValue[1]).first();
      app.MainMap.layers().set(0, ui.Map.Layer(ee.Image(LCtoView).select(0), {}, "NLCD"));
    } else if(LCSelectValue == "IGBP Land Cover") {
      app.LCLegend.IGBPUnitPanel.style().set({shown: true});
      app.LCLegend.UMDUnitPanel.style().set({shown: false});
      app.LCLegend.NLCDUnitPanel.style().set({shown: false});
      LCtoView = app.TerraLC.filterDate(dateSliderValue[0], dateSliderValue[1]);
      app.MainMap.layers().set(0, ui.Map.Layer(LCtoView.select("LC_Type1"), {min: 1.0, max: 17.0, palette:app.MODDisplayColors}, "IGBP"));
    } else if(LCSelectValue == "UMD Land Cover") {
      app.LCLegend.IGBPUnitPanel.style().set({shown: false});
      app.LCLegend.UMDUnitPanel.style().set({shown: true});
      app.LCLegend.NLCDUnitPanel.style().set({shown: false});
      LCtoView = app.TerraLC.filterDate(dateSliderValue[0], dateSliderValue[1]);
      app.MainMap.layers().set(0, ui.Map.Layer(LCtoView.select("LC_Type2"), {min: 0.0, max: 15.0, palette:app.UMDColors}, "UMD"));
    } else if(LCSelectValue == "None") {
      app.LCLegend.IGBPUnitPanel.style().set({shown: false});
      app.LCLegend.UMDUnitPanel.style().set({shown: false});
      app.LCLegend.NLCDUnitPanel.style().set({shown: false});
      app.MainMap.layers().set(0, ui.Map.Layer(ee.Image(), {}, "Empty landcover"));
    }
    var finalImage = 200;
    if(AGUnitSelectValue == "CEC Ecoregion Level 1") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CECEco1Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 1"));
    } else if(AGUnitSelectValue == "CEC Ecoregion Level 3") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CECEco3Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 3"));
    } else if(AGUnitSelectValue == "CEC Ecoregion Level 4") {
      app.MainMap.layers().insert(finalImage, ui.Map.Layer(app.CECEco4Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 4"));
    } else if(AGUnitSelectValue == "States") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.StatesShape.style(app.Feature_STYLE)).setName("States"));
    } else if(AGUnitSelectValue == "MODIS Tiles") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(ee.FeatureCollection(app.MODISTileShape).style(app.Feature_STYLE)).setName("MODIS tiles"));
    } else if(AGUnitSelectValue == "Custom Shapefile") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.AzB.style(app.Feature_STYLE)).setName("Custom Shapefile"));
    } else if(AGUnitSelectValue == "HUC 2") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC2Shape.style(app.Feature_STYLE)).setName("2 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "HUC 6") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC6Shape.style(app.Feature_STYLE)).setName("6 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "HUC 4") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC4Shape.style(app.Feature_STYLE)).setName("4 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "HUC 8") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC8Shape.style(app.Feature_STYLE)).setName("8 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "HUC 10") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC10Shape.style(app.Feature_STYLE)).setName("10 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "Countries") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CountriesShape.style(app.Feature_STYLE)).setName("Countries"));
    } else if(AGUnitSelectValue == "Counties") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CountiesShape.style(app.Feature_STYLE)).setName("Counties"));
    }
  };
  // create the base dataset, will fire off addBaseData, which fires off addbasedata
  app.CreateBaseDataset = function() {
    app.MODDef = ee.List([]);
    var MOD = null;
    var landcoverstring = null;
    var MODIS_MonthSlice = null;
    var WEUbyMonth = null;
    var vis = null;
    var GPPbyMonth = null;
    var ETbyMonth = null;
    var monthlyET = null;
    var PETbyMonth = null;
    var LEbyMonth = null;
    var PLEbyMonth = null;
    var KbyMonth = null;
    var LimitImages = app.USLegend.ImageAnimate.getValue();
    var TimeSeriesSelectValue = app.USLegend.TimeSeriesSelect.getValue();
    var StartDate = ee.Date("2001-01-01");
    var dateSliderValue = app.LCLegend.dateSlider.getValue();
    var LCSelectValue = app.LCLegend.LCSelect.getValue();
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    var stringSeperator =  VarSelectValue + "_" + TimeSeriesSelectValue;
    app.animation.IndexSlider.setValue(1);
    if(TimeSeriesSelectValue == "Top 5 Percent") {
      stringSeperator =  VarSelectValue + "_mean";
    }
    if(VarSelectValue == "Landcover") {
      stringSeperator = "constant_" + TimeSeriesSelectValue;
    }
    if(LCSelectValue == "National Land Cover Dataset") {
      landcoverstring = "landcover_max";
    } else if(LCSelectValue == "IGBP Land Cover") {
      landcoverstring = "LC_Type1_max";
    } else if(LCSelectValue == "UMD Land Cover") {
      landcoverstring = "LC_Type2_max";
    } else (
      landcoverstring = "constant_max"
    );
    if(app.printStatements) {print("Creating dataset with band:", stringSeperator)}
    if(TimeSeriesSelectValue == "None (8 day tile)") {
      stringSeperator = 'K_None';
      if(LCSelectValue == "National Land Cover Dataset") {
        landcoverstring = "landcover";
      } else if(LCSelectValue == "IGBP Land Cover") {
        landcoverstring = "LC_Type1";
      } else if(LCSelectValue == "UMD Land Cover") {
        landcoverstring = "LC_Type2";
      } else (
        landcoverstring = "constant"
      );
      app.MODDef = ee.ImageCollection(app.GoldenDataset).map(function(image) {
        var MOD_Image = ee.Image(ee.Number.parse(ee.Date(ee.Image(image).get("system:time_start")).format("YYYY")))         
                          .addBands(ee.Image(image).select([landcoverstring],["LandCover"]))
                          .addBands(ee.Image(image).select([VarSelectValue],[stringSeperator]))
                          .set({"system:time_start": ee.Image(image).get("system:time_start")});
        return MOD_Image;
      });
    } else {
      var EndDate = ee.Date(StartDate).advance(1, "month");
      for(var i = 1; i <= 216; i++) {
        MODIS_MonthSlice = app.GoldenDataset.filterDate(StartDate, EndDate);
        var maxMOD = MODIS_MonthSlice.reduce(ee.Reducer.max());
        if(TimeSeriesSelectValue == "sum") {
          monthlyET = MODIS_MonthSlice.sum();
          ETbyMonth = monthlyET.select("ET");
          PETbyMonth = monthlyET.select("PET");
          LEbyMonth = monthlyET.select("LE");
          PLEbyMonth = monthlyET.select("PLE");
          GPPbyMonth =  monthlyET.select("Gpp");
          KbyMonth = monthlyET.select("K");
          WEUbyMonth = (GPPbyMonth.multiply(1000)).divide(ETbyMonth);
          MOD = ee.Image(ETbyMonth.select(["ET"],["ET_sum"]))
                  .addBands(PETbyMonth.select(["PET"],["PET_sum"]))
                  .addBands(LEbyMonth.select(["LE"],["LE_sum"]))
                  .addBands(PLEbyMonth.select(["PLE"],["PLE_sum"]))
                  .addBands(GPPbyMonth.select(["Gpp"],["Gpp_sum"]))
                  .addBands(KbyMonth.select(["K"],["K_sum"]))
                  .addBands(WEUbyMonth.select(["Gpp"],["WUE_sum"]));
        } else if(TimeSeriesSelectValue == "p95") {
          MOD = MODIS_MonthSlice.reduce(ee.Reducer.percentile([95]));
        } else if(TimeSeriesSelectValue == "max") {
          MOD = MODIS_MonthSlice.reduce(ee.Reducer.max());
        } else if(TimeSeriesSelectValue == "min") {
          MOD = MODIS_MonthSlice.reduce(ee.Reducer.min());
        } else if(TimeSeriesSelectValue == "mean") {
          MOD = MODIS_MonthSlice.reduce(ee.Reducer.mean());
        } else if(TimeSeriesSelectValue == "stdDev") {
          MOD = MODIS_MonthSlice.reduce(ee.Reducer.stdDev());
        } else if(TimeSeriesSelectValue == "Top 5 Percent") {
          MOD = MODIS_MonthSlice.reduce(ee.Reducer.intervalMean(95,100));
        } else if(TimeSeriesSelectValue == "count") {
          MOD = MODIS_MonthSlice.reduce(ee.Reducer.count());
        }
        var MOD_Image = ee.Image(ee.Number.parse(StartDate.format("YYYY")))         
                          .addBands(maxMOD.select([landcoverstring],["LandCover"]))
                          .addBands(MOD.select(stringSeperator));
        app.MODDef = app.MODDef.add(MOD_Image.copyProperties(MODIS_MonthSlice.first(), ["system:time_start"]));
        StartDate = ee.Date(EndDate);
        EndDate = ee.Date(EndDate).advance(1, "month");
      }
    }
    if(app.printStatements) {
      print("Ended processing on:", StartDate);
      print("dataset slice:", ee.ImageCollection(app.MODDef).limit(10));
    }
    app.addBaseData();
    if(app.DefaultAnimate) {
      app.addColorLegend();
      app.addImagesToMap(ee.ImageCollection(app.MODDef).filterDate(dateSliderValue[0], ee.Date('2020-01-01')).limit(parseInt(LimitImages, 10)));
    }
    return ee.ImageCollection(app.MODDef);
  };  
  // Get the AG feature
  app.getSelectedFeatures = function() {
    app.myPointPoly;
    var myPointPolyArea;
    var catString;
    var AGUnitSelectValue = app.USLegend.AGUnitSelect.getValue();
    var LCSelectValue = app.LCLegend.LCSelect.getValue();
    if(AGUnitSelectValue == "CEC Ecoregion Level 1") {
      app.myPointPoly = app.CECEco1Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: "+app.myPointPoly.first().get('NA_L1NAME').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "CEC Ecoregion Level 3") {
      app.myPointPoly = app.CECEco3Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      // var N1 = app.myPointPoly.first().get('na_l1name').getInfo();
      // var N3 = app.myPointPoly.first().get('na_l3name').getInfo();
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      var NN4 = app.myPointPoly.first().get('us_l4name').getInfo();
      catString = String("Selected:"+NN4+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "CEC Ecoregion Level 4") {
      app.myPointPoly = app.CECEco4Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      var N1 = app.myPointPoly.first().get('na_l1name').getInfo();
      // var N3 = app.myPointPoly.first().get('na_l3name').getInfo();
      var N4 = app.myPointPoly.first().get('us_l4name').getInfo();
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected:"+N1+" - "+N4+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "States") {
      app.myPointPoly = app.StatesShape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: HUC "+app.myPointPoly.first().get('NAME').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "Custom Shapefile") {
      app.myPointPoly = app.AzB.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: "+app.myPointPoly.first().get('Name').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "Countries") {
      app.myPointPoly = app.CountriesShape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: "+app.myPointPoly.first().get('country_na').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "MODIS Tiles") {
      app.myPointPoly = app.MODISTileShape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      var h = app.myPointPoly.first().get('h').getInfo();
      var v = app.myPointPoly.first().get('v').getInfo();
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: Tile H:"+h+" V:"+v+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "HUC 2") {
      app.myPointPoly = app.HUC2Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: HUC "+app.myPointPoly.first().get('HUC2').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "HUC 4") {
      app.myPointPoly = app.HUC4Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: HUC "+app.myPointPoly.first().get('huc4').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "HUC 6") {
      app.myPointPoly = app.HUC6Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: HUC "+app.myPointPoly.first().get('huc6').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "HUC 8") {
      app.myPointPoly = app.HUC8Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: HUC "+app.myPointPoly.first().get('huc8').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "HUC 10") {
      app.myPointPoly = app.HUC10Shape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: HUC "+app.myPointPoly.first().get('huc10').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "Point (mouse click)") {
      app.myPointPoly = ee.Feature(ee.Geometry.MultiPoint(app.selectedPoints).buffer(15));
      app.MainMap.layers().add(ui.Map.Layer(ee.FeatureCollection(ee.Feature(app.myPointPoly)).style(app.Feature_STYLE)).setName("Selected feature"));
      // myPointPolyArea = app.myPointPoly.area().getInfo();
      // catString = String(+" Area processed:"+myPointPolyArea);
      app.USLegend.NameLabel.setValue("Selected: User Selected -");
    } else if(AGUnitSelectValue == "Map Bounding Box (on click)") {
      app.myPointPoly = ee.Feature(ee.Geometry.Rectangle(app.MainMap.getBounds()));
      app.MainMap.layers().add(ui.Map.Layer(ee.FeatureCollection(ee.Feature(app.myPointPoly)).style(app.Feature_STYLE)).setName("Selected feature"));
      myPointPolyArea = ee.Feature(app.myPointPoly).area().getInfo();
      catString = String("Selected: User Selected - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    } else if(AGUnitSelectValue == "Counties") {
      app.myPointPoly = app.CountiesShape.filterBounds(ee.Geometry.MultiPoint(app.selectedPoints));
      myPointPolyArea = ee.Feature(app.myPointPoly.first()).area().getInfo();
      catString = String("Selected: "+app.myPointPoly.first().get('country_na').getInfo()+" - Area processed:"+myPointPolyArea+' sq meters');
      app.USLegend.NameLabel.setValue(catString);
    }
    // app.MainMap.layers().add(ui.Map.Layer(ee.FeatureCollection(app.myPointPoly).style(app.HIGHLIGHT_STYLE)).setName("Selected feature")); 
    if(LCSelectValue=="None") {
      app.MainMap.layers().set(2, ui.Map.Layer(ee.FeatureCollection(app.myPointPoly).style({color: "02F202", fillColor: "00000000"})).setName("Selected feature"));
    } else {
      app.MainMap.layers().set(2, ui.Map.Layer(ee.FeatureCollection(app.myPointPoly).style(app.HIGHLIGHT_STYLE)).setName("Selected feature")); 
    }
    app.MainMap.layers().set(2, ui.Map.Layer(ee.FeatureCollection(app.myPointPoly).style(app.HIGHLIGHT_STYLE)).setName("Selected feature")); 
    app.MainMap.centerObject(ee.FeatureCollection(app.myPointPoly));
    return app.myPointPoly;
  };   
  // Takes results from Select features and makes the dataset, returns raw chart data
  app.makeChartData = function(AOI) {
    var TimeSelectValue = app.USLegend.TimeSeriesSelect.getValue();
    if(TimeSelectValue == "Top 5 Percent") {
      TimeSelectValue = "mean";
    } else if(TimeSelectValue == "None (8 day tile)") {
      TimeSelectValue = "None";
    }
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    var AGUnitSelectValue = app.USLegend.AGUnitSelect.getValue();
    var stringSeperator =  VarSelectValue + "_" + TimeSelectValue;
    var SpaceSelectValue = app.USLegend.SpaceSelect.getValue();
    var LCtoUse = "LandCover";
    app.chartData = null;
    var results;
    var resultsScale;
    var myPointPoly;
    if(VarSelectValue == "Landcover") {
      stringSeperator = "constant" + "_" + TimeSelectValue;
    }
    var LCSelectValue = app.LCLegend.LCSelect.getValue();
    if(LCSelectValue == "National Land Cover Dataset") {
      resultsScale = 500;
    } else {
      resultsScale = 500;
    } 
    if (AGUnitSelectValue == "Point (mouse click)") {
      resultsScale = 15;
    }
    if(SpaceSelectValue == "p95") {
      results = ee.ImageCollection(app.MODDef)
                  .select(stringSeperator,LCtoUse)
                  .map(function(image) {
        return image.reduceRegions({
          collection: AOI.geometry(),
          reducer: ee.Reducer.percentile([95]).group({                         // What stat do we want here?
            groupField: 1,
            groupName: "code",
          }),
          scale: resultsScale
        }).map(function(f) {
          // Process the grouped results from list of dictionaries to dictionary.
          var dict = ee.List(f.get("groups")).map(function(group) {
            group = ee.Dictionary(group).combine(ee.Dictionary({code:99,p95:[null]}), false);
            var code = ee.Number(group.get("code")).format("code_%d");
            var p95 = group.get("p95");
            return [code, p95];
          });
          dict = ee.Dictionary(dict.flatten());
          // Add a date property to each output feature.
          return f.set("date YYYY-MM-dd", image.date().format("YYYY-MM-dd"))
                  .set("system:time_start", image.date().millis())
                  .set(dict)
                  .set("groups", null);
        });
      });
    } else if(SpaceSelectValue == "max") {
      results = ee.ImageCollection(app.MODDef)
                  .select(stringSeperator,LCtoUse)
                  .map(function(image) {
        return image.reduceRegions({
          collection: AOI.geometry(),
          reducer: ee.Reducer.max().group({                         // What stat do we want here?
            groupField: 1,
            groupName: "code",
          }),
          scale: resultsScale
        }).map(function(f) {
          // Process the grouped results from list of dictionaries to dictionary.
          var dict = ee.List(f.get("groups")).map(function(group) {
            group = ee.Dictionary(group).combine(ee.Dictionary({code:99,max:[null]}), false);
            var code = ee.Number(group.get("code")).format("code_%d");
            var max = group.get("max");
            return [code, max];
          });
          dict = ee.Dictionary(dict.flatten());
          // Add a date property to each output feature.
          return f.set("date YYYY-MM-dd", image.date().format("YYYY-MM-dd"))
                  .set("system:time_start", image.date().millis())
                  .set(dict)
                  .set("groups", null);
        });
      });
    } else if(SpaceSelectValue == "min") {
      results = ee.ImageCollection(app.MODDef)
                  .select(stringSeperator,LCtoUse)
                  .map(function(image) {
        return image.reduceRegions({
          collection: AOI.geometry(),
          reducer: ee.Reducer.min().group({                         // What stat do we want here?
            groupField: 1,
            groupName: "code",
          }),
          scale: resultsScale
        }).map(function(f) {
          // Process the grouped results from list of dictionaries to dictionary.
          var dict = ee.List(f.get("groups")).map(function(group) {
            group = ee.Dictionary(group).combine(ee.Dictionary({code:99,min:[null]}), false);
            var code = ee.Number(group.get("code")).format("code_%d");
            var min = group.get("min");
            return [code, min];
          });
          dict = ee.Dictionary(dict.flatten());
          // Add a date property to each output feature.
          return f.set("date YYYY-MM-dd", image.date().format("YYYY-MM-dd"))
                  .set("system:time_start", image.date().millis())
                  .set(dict)
                  .set("groups", null);
        });
      });
    } else if(SpaceSelectValue == "mean") {
      results = ee.ImageCollection(app.MODDef)
                  .select(stringSeperator,LCtoUse)
                  .map(function(image) {
        return image.reduceRegions({
          collection: AOI.geometry(),
          reducer: ee.Reducer.mean().group({                         // What stat do we want here?
            groupField: 1,
            groupName: "code",
          }),
          scale: resultsScale
        }).map(function(f) {
          // Process the grouped results from list of dictionaries to dictionary.
          var dict = ee.List(f.get("groups")).map(function(group) {
            group = ee.Dictionary(group).combine(ee.Dictionary({code:99,mean:[null]}), false);
            var code = ee.Number(group.get("code")).format("code_%d");
            var mean = group.get("mean");
            return [code, mean];
          });
          dict = ee.Dictionary(dict.flatten());
          // Add a date property to each output feature.
          return f.set("date YYYY-MM-dd", image.date().format("YYYY-MM-dd"))
                  .set("system:time_start", image.date().millis())
                  .set(dict)
                  .set("groups", null);
        });
      });
    } else if(SpaceSelectValue == "stdDev") {
      results = ee.ImageCollection(app.MODDef)
                  .select(stringSeperator,LCtoUse)
                  .map(function(image) {
        return image.reduceRegions({
          collection: AOI.geometry(),
          reducer: ee.Reducer.stdDev().group({                         // What stat do we want here?
            groupField: 1,
            groupName: "code",
          }),
          scale: resultsScale
        }).map(function(f) {
          // Process the grouped results from list of dictionaries to dictionary.
          var dict = ee.List(f.get("groups")).map(function(group) {
            group = ee.Dictionary(group).combine(ee.Dictionary({code:99,stdDev:[null]}), false);
            var code = ee.Number(group.get("code")).format("code_%d");
            var stdDev = group.get("stdDev");
            return [code, stdDev];
          });
          dict = ee.Dictionary(dict.flatten());
          // Add a date property to each output feature.
          return f.set("date YYYY-MM-dd", image.date().format("YYYY-MM-dd"))
                  .set("system:time_start", image.date().millis())
                  .set(dict)
                  .set("groups", null);
        });
      });
    } else if(SpaceSelectValue == "Top 5 Percent") {
      results = ee.ImageCollection(app.MODDef)
                  .select(stringSeperator,LCtoUse)
                  .map(function(image) {
        return image.reduceRegions({
          collection: AOI.geometry(),
          reducer: ee.Reducer.intervalMean(95,100).group({                         // What stat do we want here?
            groupField: 1,
            groupName: "code",
          }),
          scale: resultsScale
        }).map(function(f) {
          // Process the grouped results from list of dictionaries to dictionary.
          var dict = ee.List(f.get("groups")).map(function(group) {
            group = ee.Dictionary(group).combine(ee.Dictionary({code:99,mean:[null]}), false);
            var code = ee.Number(group.get("code")).format("code_%d");
            var mean = group.get("mean");
            return [code, mean];
          });
          dict = ee.Dictionary(dict.flatten());
          // Add a date property to each output feature.
          return f.set("date YYYY-MM-dd", image.date().format("YYYY-MM-dd"))
                  .set("system:time_start", image.date().millis())
                  .set(dict)
                  .set("groups", null);
        });
      });
    } else if(SpaceSelectValue == "count") {
      results = ee.ImageCollection(app.MODDef)
                  .select(stringSeperator,LCtoUse)
                  .map(function(image) {
        return image.reduceRegions({
          collection: AOI.geometry(),
          reducer: ee.Reducer.count().group({                         // What stat do we want here?
            groupField: 1,
            groupName: "code",
          }),
          scale: resultsScale
        }).map(function(f) {
          // Process the grouped results from list of dictionaries to dictionary.
          var dict = ee.List(f.get("groups")).map(function(group) {
            group = ee.Dictionary(group).combine(ee.Dictionary({code:99,count:[null]}), false);
            var code = ee.Number(group.get("code")).format("code_%d");
            var count = group.get("count");
            return [code, count];
        });
        dict = ee.Dictionary(dict.flatten());
        // Add a date property to each output feature.
        return f.set("date YYYY-MM-dd", image.date().format("YYYY-MM-dd"))
                .set("system:time_start", image.date().millis())
                .set(dict)
                .set("groups", null);
        });
      });
    } else if(SpaceSelectValue == "sum") {
      results = ee.ImageCollection(app.MODDef)
                  .select(stringSeperator,LCtoUse)
                  .map(function(image) {
        return image.reduceRegions({
          collection: AOI.geometry(),
          reducer: ee.Reducer.sum().group({                         // What stat do we want here?
            groupField: 1,
            groupName: "code",
          }),
          scale: resultsScale
        }).map(function(f) {
          // Process the grouped results from list of dictionaries to dictionary.
          var dict = ee.List(f.get("groups")).map(function(group) {
            group = ee.Dictionary(group).combine(ee.Dictionary({code:99,sum:[null]}), false);
            var code = ee.Number(group.get("code")).format("code_%d");
            var count = group.get("sum");
            return [code, count];
        });
        dict = ee.Dictionary(dict.flatten());
        // Add a date property to each output feature.
        return f.set("date YYYY-MM-dd", image.date().format("YYYY-MM-dd"))
                .set("system:time_start", image.date().millis())
                .set(dict)
                .set("groups", null);
        });
      });
    }
    app.chartData = ee.FeatureCollection(results).flatten();
    return app.chartData;
  };
  app.LaunchAnimationPanel = function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    app.animation.panel1.style().set({shown: true});
    app.animation.panel2.style().set({shown: true});
    app.animation.panel3.style().set({shown: true});
    app.animation.IndexSlider.setMin(1);
    var dateSliderValue = app.LCLegend.dateSlider.getValue();
    var LimitImages = app.USLegend.ImageAnimate.getValue();
    app.addColorLegend();
    var TimeSelectValue = app.USLegend.TimeSeriesSelect.getValue(); 
    if(TimeSelectValue == "Top 5 Percent") {
      TimeSelectValue = "mean";
    }
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    var stringSeperator =  VarSelectValue + "_" + TimeSelectValue;
    app.ANIMATEDimages = ee.ImageCollection(app.MODDef).select(stringSeperator).filterDate(ee.Date(xValue), ee.Date('2020-01-01')).limit(parseInt(LimitImages, 10));
    app.addImagesToMap(app.ANIMATEDimages);
  };
  // makes two charts, one of raw data and the other as monthly aggragates
  app.makeCharts = function() {
    var TableNames;
    var range;
    var units;
    var selectors;
    var stringSeperator;
    var LCvalue = app.LCLegend.LCSelect.getValue();
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    if(VarSelectValue == "K") {
      units = "Unitless";
    } else if(VarSelectValue == "ET") {
      units = "kg/m^2";
    } else if(VarSelectValue == "Gpp") {  
      units = "kg*C/m^2";
    } else if(VarSelectValue == "LE") {   
      units = "J/m^2/day";	
    } else if(VarSelectValue == "PLE") {   
      units = "J/m^2/day";	
    } else if(VarSelectValue == "PET") {   
      units = "kg/m^2";
    } else if(VarSelectValue == "WUE") {  
      units = "Unitless";
    }
    if(LCvalue == "IGBP Land Cover") {
      TableNames = app.IGBPNamesDic;
      selectors = app.IGBPSelectors;
    } if(LCvalue == "UMD Land Cover") {
      TableNames = app.UMDNamesDic;
      selectors = app.UMDSelectors;
    } else if(LCvalue == "National Land Cover Dataset") { 
      TableNames = app.NLCDNamesDic;
      selectors = app.NLCDSelectors;
    } else if(LCvalue == "None") { 
      TableNames = app.EmptyNamesDic;
      selectors = app.EmptySelectors;
    }
    var TotalMonthlyChart = ui.Chart.feature.byFeature(app.chartData.select(app.selectNames), "date YYYY-MM-dd");
    TotalMonthlyChart.setChartType("LineChart");
    TotalMonthlyChart.setSeriesNames(TableNames);
    // var titleString = 
    TotalMonthlyChart.setOptions({
      title: "Time series values",
      vAxis: {title: units},
      hAxis: {title: "Selected statistic through time", minValue: 0}
    });
    TotalMonthlyChart.style().set({stretch: "both"});
    TotalMonthlyChart.onClick(app.LaunchAnimationPanel);
    ////////////////////////////
    //  The SummeryTablePart
    //////////////////////////// 
    var janFeature = null;
    var febFeature = null;
    var marFeature = null;
    var aprFeature = null;
    var mayFeature = null;
    var junFeature = null;
    var jlyFeature = null;
    var augFeature = null;
    var sepFeature = null;
    var octFeature = null;
    var novFeature = null;
    var decFeature = null;
    var JanResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(1, 1, "month"))); 
    var FebResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(2, 2, "month"))); 
    var MarResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(3, 3, "month")));  
    var AprResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(4, 4, "month"))); 
    var MayResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(5, 5, "month")));  
    var JunResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(6, 6, "month")));  
    var JlyResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(7, 7, "month")));  
    var AugResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(8, 8, "month")));  
    var SepResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(9, 9, "month"))); 
    var OctResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(10, 10, "month"))); 
    var NovResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(11, 11, "month"))); 
    var DecResults = ee.FeatureCollection(app.chartData.filter(ee.Filter.calendarRange(12, 12, "month")));
    var MonthlySummeryStat = app.USLegend.TableSelect.getValue();
    if (MonthlySummeryStat == "min") {
      if(LCvalue == "National Land Cover Dataset") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_11", JanResults.aggregate_min("code_11"))
                       .set("code_12", JanResults.aggregate_min("code_12"))
                       .set("code_21", JanResults.aggregate_min("code_21"))
                       .set("code_22", JanResults.aggregate_min("code_22"))
                       .set("code_23", JanResults.aggregate_min("code_23"))
                       .set("code_24", JanResults.aggregate_min("code_24"))
                       .set("code_31", JanResults.aggregate_min("code_31"))
                       .set("code_41", JanResults.aggregate_min("code_41"))
                       .set("code_42", JanResults.aggregate_min("code_42"))
                       .set("code_43", JanResults.aggregate_min("code_43"))
                       .set("code_51", JanResults.aggregate_min("code_51"))
                       .set("code_52", JanResults.aggregate_min("code_52"))
                       .set("code_71", JanResults.aggregate_min("code_71"))
                       .set("code_72", JanResults.aggregate_min("code_72"))
                       .set("code_73", JanResults.aggregate_min("code_73"))
                       .set("code_74", JanResults.aggregate_min("code_74"))
                       .set("code_81", JanResults.aggregate_min("code_81"))
                       .set("code_82", JanResults.aggregate_min("code_82")) 
                       .set("code_90", JanResults.aggregate_min("code_90"))
                       .set("code_95", JanResults.aggregate_min("code_95"));
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_11", FebResults.aggregate_min("code_11"))
                       .set("code_12", FebResults.aggregate_min("code_12"))
                       .set("code_21", FebResults.aggregate_min("code_21"))
                       .set("code_22", FebResults.aggregate_min("code_22"))
                       .set("code_23", FebResults.aggregate_min("code_23"))
                       .set("code_24", FebResults.aggregate_min("code_24"))
                       .set("code_31", FebResults.aggregate_min("code_31"))
                       .set("code_41", FebResults.aggregate_min("code_41"))
                       .set("code_42", FebResults.aggregate_min("code_42"))
                       .set("code_43", FebResults.aggregate_min("code_43"))
                       .set("code_51", FebResults.aggregate_min("code_51"))
                       .set("code_52", FebResults.aggregate_min("code_52"))
                       .set("code_71", FebResults.aggregate_min("code_71"))
                       .set("code_72", FebResults.aggregate_min("code_72"))
                       .set("code_73", FebResults.aggregate_min("code_73"))
                       .set("code_74", FebResults.aggregate_min("code_74"))
                       .set("code_81", FebResults.aggregate_min("code_81"))
                       .set("code_82", FebResults.aggregate_min("code_82")) 
                       .set("code_90", FebResults.aggregate_min("code_90"))
                       .set("code_95", FebResults.aggregate_min("code_95"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_11", MarResults.aggregate_min("code_11"))
                       .set("code_12", MarResults.aggregate_min("code_12"))
                       .set("code_21", MarResults.aggregate_min("code_21"))
                       .set("code_22", MarResults.aggregate_min("code_22"))
                       .set("code_23", MarResults.aggregate_min("code_23"))
                       .set("code_24", MarResults.aggregate_min("code_24"))
                       .set("code_31", MarResults.aggregate_min("code_31"))
                       .set("code_41", MarResults.aggregate_min("code_41"))
                       .set("code_42", MarResults.aggregate_min("code_42"))
                       .set("code_43", MarResults.aggregate_min("code_43"))
                       .set("code_51", MarResults.aggregate_min("code_51"))
                       .set("code_52", MarResults.aggregate_min("code_52"))
                       .set("code_71", MarResults.aggregate_min("code_71"))
                       .set("code_72", MarResults.aggregate_min("code_72"))
                       .set("code_73", MarResults.aggregate_min("code_73"))
                       .set("code_74", MarResults.aggregate_min("code_74"))
                       .set("code_81", MarResults.aggregate_min("code_81"))
                       .set("code_82", MarResults.aggregate_min("code_82")) 
                       .set("code_90", MarResults.aggregate_min("code_90"))
                       .set("code_95", MarResults.aggregate_min("code_95"));
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_11", AprResults.aggregate_min("code_11"))
                       .set("code_12", AprResults.aggregate_min("code_12"))
                       .set("code_21", AprResults.aggregate_min("code_21"))
                       .set("code_22", AprResults.aggregate_min("code_22"))
                       .set("code_23", AprResults.aggregate_min("code_23"))
                       .set("code_24", AprResults.aggregate_min("code_24"))
                       .set("code_31", AprResults.aggregate_min("code_31"))
                       .set("code_41", AprResults.aggregate_min("code_41"))
                       .set("code_42", AprResults.aggregate_min("code_42"))
                       .set("code_43", AprResults.aggregate_min("code_43"))
                       .set("code_51", AprResults.aggregate_min("code_51"))
                       .set("code_52", AprResults.aggregate_min("code_52"))
                       .set("code_71", AprResults.aggregate_min("code_71"))
                       .set("code_72", AprResults.aggregate_min("code_72"))
                       .set("code_73", AprResults.aggregate_min("code_73"))
                       .set("code_74", AprResults.aggregate_min("code_74"))
                       .set("code_81", AprResults.aggregate_min("code_81"))
                       .set("code_82", AprResults.aggregate_min("code_82")) 
                       .set("code_90", AprResults.aggregate_min("code_90"))
                       .set("code_95", AprResults.aggregate_min("code_95"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_11", MayResults.aggregate_min("code_11"))
                       .set("code_12", MayResults.aggregate_min("code_12"))
                       .set("code_21", MayResults.aggregate_min("code_21"))
                       .set("code_22", MayResults.aggregate_min("code_22"))
                       .set("code_23", MayResults.aggregate_min("code_23"))
                       .set("code_24", MayResults.aggregate_min("code_24"))
                       .set("code_31", MayResults.aggregate_min("code_31"))
                       .set("code_41", MayResults.aggregate_min("code_41"))
                       .set("code_42", MayResults.aggregate_min("code_42"))
                       .set("code_43", MayResults.aggregate_min("code_43"))
                       .set("code_51", MayResults.aggregate_min("code_51"))
                       .set("code_52", MayResults.aggregate_min("code_52"))
                       .set("code_71", MayResults.aggregate_min("code_71"))
                       .set("code_72", MayResults.aggregate_min("code_72"))
                       .set("code_73", MayResults.aggregate_min("code_73"))
                       .set("code_74", MayResults.aggregate_min("code_74"))
                       .set("code_81", MayResults.aggregate_min("code_81"))
                       .set("code_82", MayResults.aggregate_min("code_82")) 
                       .set("code_90", MayResults.aggregate_min("code_90"))
                       .set("code_95", MayResults.aggregate_min("code_95")); 
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_11", JunResults.aggregate_min("code_11"))
                       .set("code_12", JunResults.aggregate_min("code_12"))
                       .set("code_21", JunResults.aggregate_min("code_21"))
                       .set("code_22", JunResults.aggregate_min("code_22"))
                       .set("code_23", JunResults.aggregate_min("code_23"))
                       .set("code_24", JunResults.aggregate_min("code_24"))
                       .set("code_31", JunResults.aggregate_min("code_31"))
                       .set("code_41", JunResults.aggregate_min("code_41"))
                       .set("code_42", JunResults.aggregate_min("code_42"))
                       .set("code_43", JunResults.aggregate_min("code_43"))
                       .set("code_51", JunResults.aggregate_min("code_51"))
                       .set("code_52", JunResults.aggregate_min("code_52"))
                       .set("code_71", JunResults.aggregate_min("code_71"))
                       .set("code_72", JunResults.aggregate_min("code_72"))
                       .set("code_73", JunResults.aggregate_min("code_73"))
                       .set("code_74", JunResults.aggregate_min("code_74"))
                       .set("code_81", JunResults.aggregate_min("code_81"))
                       .set("code_82", JunResults.aggregate_min("code_82")) 
                       .set("code_90", JunResults.aggregate_min("code_90"))
                       .set("code_95", JunResults.aggregate_min("code_95")); 
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_11", JlyResults.aggregate_min("code_11"))
                       .set("code_12", JlyResults.aggregate_min("code_12"))
                       .set("code_21", JlyResults.aggregate_min("code_21"))
                       .set("code_22", JlyResults.aggregate_min("code_22"))
                       .set("code_23", JlyResults.aggregate_min("code_23"))
                       .set("code_24", JlyResults.aggregate_min("code_24"))
                       .set("code_31", JlyResults.aggregate_min("code_31"))
                       .set("code_41", JlyResults.aggregate_min("code_41"))
                       .set("code_42", JlyResults.aggregate_min("code_42"))
                       .set("code_43", JlyResults.aggregate_min("code_43"))
                       .set("code_51", JlyResults.aggregate_min("code_51"))
                       .set("code_52", JlyResults.aggregate_min("code_52"))
                       .set("code_71", JlyResults.aggregate_min("code_71"))
                       .set("code_72", JlyResults.aggregate_min("code_72"))
                       .set("code_73", JlyResults.aggregate_min("code_73"))
                       .set("code_74", JlyResults.aggregate_min("code_74"))
                       .set("code_81", JlyResults.aggregate_min("code_81"))
                       .set("code_82", JlyResults.aggregate_min("code_82")) 
                       .set("code_90", JlyResults.aggregate_min("code_90"))
                       .set("code_95", JlyResults.aggregate_min("code_95"));  
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_11", AugResults.aggregate_min("code_11"))
                       .set("code_12", AugResults.aggregate_min("code_12"))
                       .set("code_21", AugResults.aggregate_min("code_21"))
                       .set("code_22", AugResults.aggregate_min("code_22"))
                       .set("code_23", AugResults.aggregate_min("code_23"))
                       .set("code_24", AugResults.aggregate_min("code_24"))
                       .set("code_31", AugResults.aggregate_min("code_31"))
                       .set("code_41", AugResults.aggregate_min("code_41"))
                       .set("code_42", AugResults.aggregate_min("code_42"))
                       .set("code_43", AugResults.aggregate_min("code_43"))
                       .set("code_51", AugResults.aggregate_min("code_51"))
                       .set("code_52", AugResults.aggregate_min("code_52"))
                       .set("code_71", AugResults.aggregate_min("code_71"))
                       .set("code_72", AugResults.aggregate_min("code_72"))
                       .set("code_73", AugResults.aggregate_min("code_73"))
                       .set("code_74", AugResults.aggregate_min("code_74"))
                       .set("code_81", AugResults.aggregate_min("code_81"))
                       .set("code_82", AugResults.aggregate_min("code_82")) 
                       .set("code_90", AugResults.aggregate_min("code_90"))
                       .set("code_95", AugResults.aggregate_min("code_95")); 
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_11", SepResults.aggregate_min("code_11"))
                       .set("code_12", SepResults.aggregate_min("code_12"))
                       .set("code_21", SepResults.aggregate_min("code_21"))
                       .set("code_22", SepResults.aggregate_min("code_22"))
                       .set("code_23", SepResults.aggregate_min("code_23"))
                       .set("code_24", SepResults.aggregate_min("code_24"))
                       .set("code_31", SepResults.aggregate_min("code_31"))
                       .set("code_41", SepResults.aggregate_min("code_41"))
                       .set("code_42", SepResults.aggregate_min("code_42"))
                       .set("code_43", SepResults.aggregate_min("code_43"))
                       .set("code_51", SepResults.aggregate_min("code_51"))
                       .set("code_52", SepResults.aggregate_min("code_52"))
                       .set("code_71", SepResults.aggregate_min("code_71"))
                       .set("code_72", SepResults.aggregate_min("code_72"))
                       .set("code_73", SepResults.aggregate_min("code_73"))
                       .set("code_74", SepResults.aggregate_min("code_74"))
                       .set("code_81", SepResults.aggregate_min("code_81"))
                       .set("code_82", SepResults.aggregate_min("code_82")) 
                       .set("code_90", SepResults.aggregate_min("code_90"))
                       .set("code_95", SepResults.aggregate_min("code_95")); 
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_11", OctResults.aggregate_min("code_11"))
                       .set("code_12", OctResults.aggregate_min("code_12"))
                       .set("code_21", OctResults.aggregate_min("code_21"))
                       .set("code_22", OctResults.aggregate_min("code_22"))
                       .set("code_23", OctResults.aggregate_min("code_23"))
                       .set("code_24", OctResults.aggregate_min("code_24"))
                       .set("code_31", OctResults.aggregate_min("code_31"))
                       .set("code_41", OctResults.aggregate_min("code_41"))
                       .set("code_42", OctResults.aggregate_min("code_42"))
                       .set("code_43", OctResults.aggregate_min("code_43"))
                       .set("code_51", OctResults.aggregate_min("code_51"))
                       .set("code_52", OctResults.aggregate_min("code_52"))
                       .set("code_71", OctResults.aggregate_min("code_71"))
                       .set("code_72", OctResults.aggregate_min("code_72"))
                       .set("code_73", OctResults.aggregate_min("code_73"))
                       .set("code_74", OctResults.aggregate_min("code_74"))
                       .set("code_81", OctResults.aggregate_min("code_81"))
                       .set("code_82", OctResults.aggregate_min("code_82")) 
                       .set("code_90", OctResults.aggregate_min("code_90"))
                       .set("code_95", OctResults.aggregate_min("code_95")); 
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_11", NovResults.aggregate_min("code_11"))
                       .set("code_12", NovResults.aggregate_min("code_12"))
                       .set("code_21", NovResults.aggregate_min("code_21"))
                       .set("code_22", NovResults.aggregate_min("code_22"))
                       .set("code_23", NovResults.aggregate_min("code_23"))
                       .set("code_24", NovResults.aggregate_min("code_24"))
                       .set("code_31", NovResults.aggregate_min("code_31"))
                       .set("code_41", NovResults.aggregate_min("code_41"))
                       .set("code_42", NovResults.aggregate_min("code_42"))
                       .set("code_43", NovResults.aggregate_min("code_43"))
                       .set("code_51", NovResults.aggregate_min("code_51"))
                       .set("code_52", NovResults.aggregate_min("code_52"))
                       .set("code_71", NovResults.aggregate_min("code_71"))
                       .set("code_72", NovResults.aggregate_min("code_72"))
                       .set("code_73", NovResults.aggregate_min("code_73"))
                       .set("code_74", NovResults.aggregate_min("code_74"))
                       .set("code_81", NovResults.aggregate_min("code_81"))
                       .set("code_82", NovResults.aggregate_min("code_82")) 
                       .set("code_90", NovResults.aggregate_min("code_90"))
                       .set("code_95", NovResults.aggregate_min("code_95"));   
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_11", DecResults.aggregate_min("code_11"))
                       .set("code_12", DecResults.aggregate_min("code_12"))
                       .set("code_21", DecResults.aggregate_min("code_21"))
                       .set("code_22", DecResults.aggregate_min("code_22"))
                       .set("code_23", DecResults.aggregate_min("code_23"))
                       .set("code_24", DecResults.aggregate_min("code_24"))
                       .set("code_31", DecResults.aggregate_min("code_31"))
                       .set("code_41", DecResults.aggregate_min("code_41"))
                       .set("code_42", DecResults.aggregate_min("code_42"))
                       .set("code_43", DecResults.aggregate_min("code_43"))
                       .set("code_51", DecResults.aggregate_min("code_51"))
                       .set("code_52", DecResults.aggregate_min("code_52"))
                       .set("code_71", DecResults.aggregate_min("code_71"))
                       .set("code_72", DecResults.aggregate_min("code_72"))
                       .set("code_73", DecResults.aggregate_min("code_73"))
                       .set("code_74", DecResults.aggregate_min("code_74"))
                       .set("code_81", DecResults.aggregate_min("code_81"))
                       .set("code_82", DecResults.aggregate_min("code_82")) 
                       .set("code_90", DecResults.aggregate_min("code_90"))
                       .set("code_95", DecResults.aggregate_min("code_95"));   
      } else if(LCvalue == "IGBP Land Cover") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_min("code_1"))
                       .set("code_2", JanResults.aggregate_min("code_2"))
                       .set("code_3", JanResults.aggregate_min("code_3"))
                       .set("code_4", JanResults.aggregate_min("code_4"))
                       .set("code_5", JanResults.aggregate_min("code_5"))
                       .set("code_6", JanResults.aggregate_min("code_6"))
                       .set("code_7", JanResults.aggregate_min("code_7"))
                       .set("code_8", JanResults.aggregate_min("code_8"))
                       .set("code_9", JanResults.aggregate_min("code_9"))
                       .set("code_10", JanResults.aggregate_min("code_10"))
                       .set("code_11", JanResults.aggregate_min("code_11"))
                       .set("code_12", JanResults.aggregate_min("code_12"))
                       .set("code_13", JanResults.aggregate_min("code_13"))
                       .set("code_14", JanResults.aggregate_min("code_14"))
                       .set("code_15", JanResults.aggregate_min("code_15"))
                       .set("code_16", JanResults.aggregate_min("code_16"))
                       .set("code_17", JanResults.aggregate_min("code_17"))
                       .set("code_254", JanResults.aggregate_min("code_254"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_min("code_1"))
                       .set("code_2", FebResults.aggregate_min("code_2"))
                       .set("code_3", FebResults.aggregate_min("code_3"))
                       .set("code_4", FebResults.aggregate_min("code_4"))
                       .set("code_5", FebResults.aggregate_min("code_5"))
                       .set("code_6", FebResults.aggregate_min("code_6"))
                       .set("code_7", FebResults.aggregate_min("code_7"))
                       .set("code_8", FebResults.aggregate_min("code_8"))
                       .set("code_9", FebResults.aggregate_min("code_9"))
                       .set("code_10", FebResults.aggregate_min("code_10"))
                       .set("code_11", FebResults.aggregate_min("code_11"))
                       .set("code_12", FebResults.aggregate_min("code_12"))
                       .set("code_13", FebResults.aggregate_min("code_13"))
                       .set("code_14", FebResults.aggregate_min("code_14"))
                       .set("code_15", FebResults.aggregate_min("code_15"))
                       .set("code_16", FebResults.aggregate_min("code_16"))
                       .set("code_17", FebResults.aggregate_min("code_17"))
                       .set("code_254", FebResults.aggregate_min("code_254"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_min("code_1"))
                       .set("code_2", MarResults.aggregate_min("code_2"))
                       .set("code_3", MarResults.aggregate_min("code_3"))
                       .set("code_4", MarResults.aggregate_max("code_4"))
                       .set("code_5", MarResults.aggregate_min("code_5"))
                       .set("code_6", MarResults.aggregate_min("code_6"))
                       .set("code_7", MarResults.aggregate_min("code_7"))
                       .set("code_8", MarResults.aggregate_min("code_8"))
                       .set("code_9", MarResults.aggregate_min("code_9"))
                       .set("code_10", MarResults.aggregate_min("code_10"))
                       .set("code_11", MarResults.aggregate_min("code_11"))
                       .set("code_12", MarResults.aggregate_min("code_12"))
                       .set("code_13", MarResults.aggregate_min("code_13"))
                       .set("code_14", MarResults.aggregate_min("code_14"))
                       .set("code_15", MarResults.aggregate_min("code_15"))
                       .set("code_16", MarResults.aggregate_min("code_16"))
                       .set("code_17", MarResults.aggregate_min("code_17"))
                       .set("code_254", MarResults.aggregate_min("code_254"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_min("code_1"))
                       .set("code_2", AprResults.aggregate_min("code_2"))
                       .set("code_3", AprResults.aggregate_min("code_3"))
                       .set("code_4", AprResults.aggregate_min("code_4"))
                       .set("code_5", AprResults.aggregate_min("code_5"))
                       .set("code_6", AprResults.aggregate_min("code_6"))
                       .set("code_7", AprResults.aggregate_min("code_7"))
                       .set("code_8", AprResults.aggregate_min("code_8"))
                       .set("code_9", AprResults.aggregate_min("code_9"))
                       .set("code_10", AprResults.aggregate_min("code_10"))
                       .set("code_11", AprResults.aggregate_min("code_11"))
                       .set("code_12", AprResults.aggregate_min("code_12"))
                       .set("code_13", AprResults.aggregate_min("code_13"))
                       .set("code_14", AprResults.aggregate_min("code_14"))
                       .set("code_15", AprResults.aggregate_min("code_15"))
                       .set("code_16", AprResults.aggregate_min("code_16"))
                       .set("code_17", AprResults.aggregate_min("code_17"))
                       .set("code_254", AprResults.aggregate_min("code_254"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_min("code_1"))
                       .set("code_2", MayResults.aggregate_min("code_2"))
                       .set("code_3", MayResults.aggregate_min("code_3"))
                       .set("code_4", MayResults.aggregate_min("code_4"))
                       .set("code_5", MayResults.aggregate_min("code_5"))
                       .set("code_6", MayResults.aggregate_min("code_6"))
                       .set("code_7", MayResults.aggregate_min("code_7"))
                       .set("code_8", MayResults.aggregate_min("code_8"))
                       .set("code_9", MayResults.aggregate_min("code_9"))
                       .set("code_10", MayResults.aggregate_min("code_10"))
                       .set("code_11", MayResults.aggregate_min("code_11"))
                       .set("code_12", MayResults.aggregate_min("code_12"))
                       .set("code_13", MayResults.aggregate_min("code_13"))
                       .set("code_14", MayResults.aggregate_min("code_14"))
                       .set("code_15", MayResults.aggregate_min("code_15"))
                       .set("code_16", MayResults.aggregate_min("code_16"))
                       .set("code_17", MayResults.aggregate_min("code_17"))
                       .set("code_254", MayResults.aggregate_min("code_254"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_min("code_1"))
                       .set("code_2", JunResults.aggregate_min("code_2"))
                       .set("code_3", JunResults.aggregate_min("code_3"))
                       .set("code_4", JunResults.aggregate_min("code_4"))
                       .set("code_5", JunResults.aggregate_min("code_5"))
                       .set("code_6", JunResults.aggregate_min("code_6"))
                       .set("code_7", JunResults.aggregate_min("code_7"))
                       .set("code_8", JunResults.aggregate_min("code_8"))
                       .set("code_9", JunResults.aggregate_min("code_9"))
                       .set("code_10", JunResults.aggregate_min("code_10"))
                       .set("code_11", JunResults.aggregate_min("code_11"))
                       .set("code_12", JunResults.aggregate_min("code_12"))
                       .set("code_13", JunResults.aggregate_min("code_13"))
                       .set("code_14", JunResults.aggregate_min("code_14"))
                       .set("code_15", JunResults.aggregate_min("code_15"))
                       .set("code_16", JunResults.aggregate_min("code_16"))
                       .set("code_17", JunResults.aggregate_min("code_17"))
                       .set("code_254", JunResults.aggregate_min("code_254"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_min("code_1"))
                       .set("code_2", JlyResults.aggregate_min("code_2"))
                       .set("code_3", JlyResults.aggregate_min("code_3"))
                       .set("code_4", JlyResults.aggregate_min("code_4"))
                       .set("code_5", JlyResults.aggregate_min("code_5"))
                       .set("code_6", JlyResults.aggregate_min("code_6"))
                       .set("code_7", JlyResults.aggregate_min("code_7"))
                       .set("code_8", JlyResults.aggregate_min("code_8"))
                       .set("code_9", JlyResults.aggregate_min("code_9"))
                       .set("code_10", JlyResults.aggregate_min("code_10"))
                       .set("code_11", JlyResults.aggregate_min("code_11"))
                       .set("code_12", JlyResults.aggregate_min("code_12"))
                       .set("code_13", JlyResults.aggregate_min("code_13"))
                       .set("code_14", JlyResults.aggregate_min("code_14"))
                       .set("code_15", JlyResults.aggregate_min("code_15"))
                       .set("code_16", JlyResults.aggregate_min("code_16"))
                       .set("code_17", JlyResults.aggregate_min("code_17"))
                       .set("code_254", JlyResults.aggregate_min("code_254"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_min("code_1"))
                       .set("code_2", AugResults.aggregate_min("code_2"))
                       .set("code_3", AugResults.aggregate_min("code_3"))
                       .set("code_4", AugResults.aggregate_min("code_4"))
                       .set("code_5", AugResults.aggregate_min("code_5"))
                       .set("code_6", AugResults.aggregate_min("code_6"))
                       .set("code_7", AugResults.aggregate_min("code_7"))
                       .set("code_8", AugResults.aggregate_min("code_8"))
                       .set("code_9", AugResults.aggregate_min("code_9"))
                       .set("code_10", AugResults.aggregate_min("code_10"))
                       .set("code_11", AugResults.aggregate_min("code_11"))
                       .set("code_12", AugResults.aggregate_min("code_12"))
                       .set("code_13", AugResults.aggregate_min("code_13"))
                       .set("code_14", AugResults.aggregate_min("code_14"))
                       .set("code_15", AugResults.aggregate_min("code_15"))
                       .set("code_16", AugResults.aggregate_min("code_16"))
                       .set("code_17", AugResults.aggregate_min("code_17"))
                       .set("code_254", AugResults.aggregate_min("code_254"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_min("code_1"))
                       .set("code_2", SepResults.aggregate_min("code_2"))
                       .set("code_3", SepResults.aggregate_min("code_3"))
                       .set("code_4", SepResults.aggregate_min("code_4"))
                       .set("code_5", SepResults.aggregate_min("code_5"))
                       .set("code_6", SepResults.aggregate_min("code_6"))
                       .set("code_7", SepResults.aggregate_min("code_7"))
                       .set("code_8", SepResults.aggregate_min("code_8"))
                       .set("code_9", SepResults.aggregate_min("code_9"))
                       .set("code_10", SepResults.aggregate_min("code_10"))
                       .set("code_11", SepResults.aggregate_min("code_11"))
                       .set("code_12", SepResults.aggregate_min("code_12"))
                       .set("code_13", SepResults.aggregate_min("code_13"))
                       .set("code_14", SepResults.aggregate_min("code_14"))
                       .set("code_15", SepResults.aggregate_min("code_15"))
                       .set("code_16", SepResults.aggregate_min("code_16"))
                       .set("code_17", SepResults.aggregate_min("code_17"))
                       .set("code_254", SepResults.aggregate_min("code_254"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_min("code_1"))
                       .set("code_2", OctResults.aggregate_min("code_2"))
                       .set("code_3", OctResults.aggregate_min("code_3"))
                       .set("code_4", OctResults.aggregate_min("code_4"))
                       .set("code_5", OctResults.aggregate_min("code_5"))
                       .set("code_6", OctResults.aggregate_min("code_6"))
                       .set("code_7", OctResults.aggregate_min("code_7"))
                       .set("code_8", OctResults.aggregate_min("code_8"))
                       .set("code_9", OctResults.aggregate_min("code_9"))
                       .set("code_10", OctResults.aggregate_min("code_10"))
                       .set("code_11", OctResults.aggregate_min("code_11"))
                       .set("code_12", OctResults.aggregate_min("code_12"))
                       .set("code_13", OctResults.aggregate_min("code_13"))
                       .set("code_14", OctResults.aggregate_min("code_14"))
                       .set("code_15", OctResults.aggregate_min("code_15"))
                       .set("code_16", OctResults.aggregate_min("code_16"))
                       .set("code_17", OctResults.aggregate_min("code_17"))
                       .set("code_254", OctResults.aggregate_min("code_254"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_min("code_1"))
                       .set("code_2", NovResults.aggregate_min("code_2"))
                       .set("code_3", NovResults.aggregate_min("code_3"))
                       .set("code_4", NovResults.aggregate_min("code_4"))
                       .set("code_5", NovResults.aggregate_min("code_5"))
                       .set("code_6", NovResults.aggregate_min("code_6"))
                       .set("code_7", NovResults.aggregate_min("code_7"))
                       .set("code_8", NovResults.aggregate_min("code_8"))
                       .set("code_9", NovResults.aggregate_min("code_9"))
                       .set("code_10", NovResults.aggregate_min("code_10"))
                       .set("code_11", NovResults.aggregate_min("code_11"))
                       .set("code_12", NovResults.aggregate_min("code_12"))
                       .set("code_13", NovResults.aggregate_min("code_13"))
                       .set("code_14", NovResults.aggregate_min("code_14"))
                       .set("code_15", NovResults.aggregate_min("code_15"))
                       .set("code_16", NovResults.aggregate_min("code_16"))
                       .set("code_17", NovResults.aggregate_min("code_17"))
                       .set("code_254", NovResults.aggregate_min("code_254"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_min("code_1"))
                       .set("code_2", DecResults.aggregate_min("code_2"))
                       .set("code_3", DecResults.aggregate_min("code_3"))
                       .set("code_4", DecResults.aggregate_min("code_4"))
                       .set("code_5", DecResults.aggregate_min("code_5"))
                       .set("code_6", DecResults.aggregate_min("code_6"))
                       .set("code_7", DecResults.aggregate_min("code_7"))
                       .set("code_8", DecResults.aggregate_min("code_8"))
                       .set("code_9", DecResults.aggregate_min("code_9"))
                       .set("code_10", DecResults.aggregate_min("code_10"))
                       .set("code_11", DecResults.aggregate_min("code_11"))
                       .set("code_12", DecResults.aggregate_min("code_12"))
                       .set("code_13", DecResults.aggregate_min("code_13"))
                       .set("code_14", DecResults.aggregate_min("code_14"))
                       .set("code_15", DecResults.aggregate_min("code_15"))
                       .set("code_16", DecResults.aggregate_min("code_16"))
                       .set("code_17", DecResults.aggregate_min("code_17"))
                       .set("code_254", DecResults.aggregate_min("code_254"));
      } else if(LCvalue == "UMD Land Cover") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_min("code_1"))
                       .set("code_2", JanResults.aggregate_min("code_2"))
                       .set("code_3", JanResults.aggregate_min("code_3"))
                       .set("code_4", JanResults.aggregate_min("code_4"))
                       .set("code_5", JanResults.aggregate_min("code_5"))
                       .set("code_6", JanResults.aggregate_min("code_6"))
                       .set("code_7", JanResults.aggregate_min("code_7"))
                       .set("code_8", JanResults.aggregate_min("code_8"))
                       .set("code_9", JanResults.aggregate_min("code_9"))
                       .set("code_10", JanResults.aggregate_min("code_10"))
                       .set("code_11", JanResults.aggregate_min("code_11"))
                       .set("code_12", JanResults.aggregate_min("code_12"))
                       .set("code_13", JanResults.aggregate_min("code_13"))
                       .set("code_14", JanResults.aggregate_min("code_14"))
                       .set("code_15", JanResults.aggregate_min("code_15"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_min("code_1"))
                       .set("code_2", FebResults.aggregate_min("code_2"))
                       .set("code_3", FebResults.aggregate_min("code_3"))
                       .set("code_4", FebResults.aggregate_min("code_4"))
                       .set("code_5", FebResults.aggregate_min("code_5"))
                       .set("code_6", FebResults.aggregate_min("code_6"))
                       .set("code_7", FebResults.aggregate_min("code_7"))
                       .set("code_8", FebResults.aggregate_min("code_8"))
                       .set("code_9", FebResults.aggregate_min("code_9"))
                       .set("code_10", FebResults.aggregate_min("code_10"))
                       .set("code_11", FebResults.aggregate_min("code_11"))
                       .set("code_12", FebResults.aggregate_min("code_12"))
                       .set("code_13", FebResults.aggregate_min("code_13"))
                       .set("code_14", FebResults.aggregate_min("code_14"))
                       .set("code_15", FebResults.aggregate_min("code_15"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_min("code_1"))
                       .set("code_2", MarResults.aggregate_min("code_2"))
                       .set("code_3", MarResults.aggregate_min("code_3"))
                       .set("code_4", MarResults.aggregate_min("code_4"))
                       .set("code_5", MarResults.aggregate_min("code_5"))
                       .set("code_6", MarResults.aggregate_min("code_6"))
                       .set("code_7", MarResults.aggregate_min("code_7"))
                       .set("code_8", MarResults.aggregate_min("code_8"))
                       .set("code_9", MarResults.aggregate_min("code_9"))
                       .set("code_10", MarResults.aggregate_min("code_10"))
                       .set("code_11", MarResults.aggregate_min("code_11"))
                       .set("code_12", MarResults.aggregate_min("code_12"))
                       .set("code_13", MarResults.aggregate_min("code_13"))
                       .set("code_14", MarResults.aggregate_min("code_14"))
                       .set("code_15", MarResults.aggregate_min("code_15"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_min("code_1"))
                       .set("code_2", AprResults.aggregate_min("code_2"))
                       .set("code_3", AprResults.aggregate_min("code_3"))
                       .set("code_4", AprResults.aggregate_min("code_4"))
                       .set("code_5", AprResults.aggregate_min("code_5"))
                       .set("code_6", AprResults.aggregate_min("code_6"))
                       .set("code_7", AprResults.aggregate_min("code_7"))
                       .set("code_8", AprResults.aggregate_min("code_8"))
                       .set("code_9", AprResults.aggregate_min("code_9"))
                       .set("code_10", AprResults.aggregate_min("code_10"))
                       .set("code_11", AprResults.aggregate_min("code_11"))
                       .set("code_12", AprResults.aggregate_min("code_12"))
                       .set("code_13", AprResults.aggregate_min("code_13"))
                       .set("code_14", AprResults.aggregate_min("code_14"))
                       .set("code_15", AprResults.aggregate_min("code_15"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_min("code_1"))
                       .set("code_2", MayResults.aggregate_min("code_2"))
                       .set("code_3", MayResults.aggregate_min("code_3"))
                       .set("code_4", MayResults.aggregate_min("code_4"))
                       .set("code_5", MayResults.aggregate_min("code_5"))
                       .set("code_6", MayResults.aggregate_min("code_6"))
                       .set("code_7", MayResults.aggregate_min("code_7"))
                       .set("code_8", MayResults.aggregate_min("code_8"))
                       .set("code_9", MayResults.aggregate_min("code_9"))
                       .set("code_10", MayResults.aggregate_min("code_10"))
                       .set("code_11", MayResults.aggregate_min("code_11"))
                       .set("code_12", MayResults.aggregate_min("code_12"))
                       .set("code_13", MayResults.aggregate_min("code_13"))
                       .set("code_14", MayResults.aggregate_min("code_14"))
                       .set("code_15", MayResults.aggregate_min("code_15"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_min("code_1"))
                       .set("code_2", JunResults.aggregate_min("code_2"))
                       .set("code_3", JunResults.aggregate_min("code_3"))
                       .set("code_4", JunResults.aggregate_min("code_4"))
                       .set("code_5", JunResults.aggregate_min("code_5"))
                       .set("code_6", JunResults.aggregate_min("code_6"))
                       .set("code_7", JunResults.aggregate_min("code_7"))
                       .set("code_8", JunResults.aggregate_min("code_8"))
                       .set("code_9", JunResults.aggregate_min("code_9"))
                       .set("code_10", JunResults.aggregate_min("code_10"))
                       .set("code_11", JunResults.aggregate_min("code_11"))
                       .set("code_12", JunResults.aggregate_min("code_12"))
                       .set("code_13", JunResults.aggregate_min("code_13"))
                       .set("code_14", JunResults.aggregate_min("code_14"))
                       .set("code_15", JunResults.aggregate_min("code_15"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_min("code_1"))
                       .set("code_2", JlyResults.aggregate_min("code_2"))
                       .set("code_3", JlyResults.aggregate_min("code_3"))
                       .set("code_4", JlyResults.aggregate_min("code_4"))
                       .set("code_5", JlyResults.aggregate_min("code_5"))
                       .set("code_6", JlyResults.aggregate_min("code_6"))
                       .set("code_7", JlyResults.aggregate_min("code_7"))
                       .set("code_8", JlyResults.aggregate_min("code_8"))
                       .set("code_9", JlyResults.aggregate_min("code_9"))
                       .set("code_10", JlyResults.aggregate_min("code_10"))
                       .set("code_11", JlyResults.aggregate_min("code_11"))
                       .set("code_12", JlyResults.aggregate_min("code_12"))
                       .set("code_13", JlyResults.aggregate_min("code_13"))
                       .set("code_14", JlyResults.aggregate_min("code_14"))
                       .set("code_15", JlyResults.aggregate_min("code_15"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_min("code_1"))
                       .set("code_2", AugResults.aggregate_min("code_2"))
                       .set("code_3", AugResults.aggregate_min("code_3"))
                       .set("code_4", AugResults.aggregate_min("code_4"))
                       .set("code_5", AugResults.aggregate_min("code_5"))
                       .set("code_6", AugResults.aggregate_min("code_6"))
                       .set("code_7", AugResults.aggregate_min("code_7"))
                       .set("code_8", AugResults.aggregate_min("code_8"))
                       .set("code_9", AugResults.aggregate_min("code_9"))
                       .set("code_10", AugResults.aggregate_min("code_10"))
                       .set("code_11", AugResults.aggregate_min("code_11"))
                       .set("code_12", AugResults.aggregate_min("code_12"))
                       .set("code_13", AugResults.aggregate_min("code_13"))
                       .set("code_14", AugResults.aggregate_min("code_14"))
                       .set("code_15", AugResults.aggregate_min("code_15"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_min("code_1"))
                       .set("code_2", SepResults.aggregate_min("code_2"))
                       .set("code_3", SepResults.aggregate_min("code_3"))
                       .set("code_4", SepResults.aggregate_min("code_4"))
                       .set("code_5", SepResults.aggregate_min("code_5"))
                       .set("code_6", SepResults.aggregate_min("code_6"))
                       .set("code_7", SepResults.aggregate_min("code_7"))
                       .set("code_8", SepResults.aggregate_min("code_8"))
                       .set("code_9", SepResults.aggregate_min("code_9"))
                       .set("code_10", SepResults.aggregate_min("code_10"))
                       .set("code_11", SepResults.aggregate_min("code_11"))
                       .set("code_12", SepResults.aggregate_min("code_12"))
                       .set("code_13", SepResults.aggregate_min("code_13"))
                       .set("code_14", SepResults.aggregate_min("code_14"))
                       .set("code_15", SepResults.aggregate_min("code_15"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_min("code_1"))
                       .set("code_2", OctResults.aggregate_min("code_2"))
                       .set("code_3", OctResults.aggregate_min("code_3"))
                       .set("code_4", OctResults.aggregate_min("code_4"))
                       .set("code_5", OctResults.aggregate_min("code_5"))
                       .set("code_6", OctResults.aggregate_min("code_6"))
                       .set("code_7", OctResults.aggregate_min("code_7"))
                       .set("code_8", OctResults.aggregate_min("code_8"))
                       .set("code_9", OctResults.aggregate_min("code_9"))
                       .set("code_10", OctResults.aggregate_min("code_10"))
                       .set("code_11", OctResults.aggregate_min("code_11"))
                       .set("code_12", OctResults.aggregate_min("code_12"))
                       .set("code_13", OctResults.aggregate_min("code_13"))
                       .set("code_14", OctResults.aggregate_min("code_14"))
                       .set("code_15", OctResults.aggregate_min("code_15"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_min("code_1"))
                       .set("code_2", NovResults.aggregate_min("code_2"))
                       .set("code_3", NovResults.aggregate_min("code_3"))
                       .set("code_4", NovResults.aggregate_min("code_4"))
                       .set("code_5", NovResults.aggregate_min("code_5"))
                       .set("code_6", NovResults.aggregate_min("code_6"))
                       .set("code_7", NovResults.aggregate_min("code_7"))
                       .set("code_8", NovResults.aggregate_min("code_8"))
                       .set("code_9", NovResults.aggregate_min("code_9"))
                       .set("code_10", NovResults.aggregate_min("code_10"))
                       .set("code_11", NovResults.aggregate_min("code_11"))
                       .set("code_12", NovResults.aggregate_min("code_12"))
                       .set("code_13", NovResults.aggregate_min("code_13"))
                       .set("code_14", NovResults.aggregate_min("code_14"))
                       .set("code_15", NovResults.aggregate_min("code_15"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_min("code_1"))
                       .set("code_2", DecResults.aggregate_min("code_2"))
                       .set("code_3", DecResults.aggregate_min("code_3"))
                       .set("code_4", DecResults.aggregate_min("code_4"))
                       .set("code_5", DecResults.aggregate_min("code_5"))
                       .set("code_6", DecResults.aggregate_min("code_6"))
                       .set("code_7", DecResults.aggregate_min("code_7"))
                       .set("code_8", DecResults.aggregate_min("code_8"))
                       .set("code_9", DecResults.aggregate_min("code_9"))
                       .set("code_10", DecResults.aggregate_min("code_10"))
                       .set("code_11", DecResults.aggregate_min("code_11"))
                       .set("code_12", DecResults.aggregate_min("code_12"))
                       .set("code_13", DecResults.aggregate_min("code_13"))
                       .set("code_14", DecResults.aggregate_min("code_14"))
                       .set("code_15", DecResults.aggregate_min("code_15"));
      } else if(LCvalue == "None") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_min("code_1"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_min("code_1"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_min("code_1"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_min("code_1"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_min("code_1"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_min("code_1"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_min("code_1"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_min("code_1"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_min("code_1"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_min("code_1"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_min("code_1"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_min("code_1"));
      }
    } else if (MonthlySummeryStat == "mean") {
      if(LCvalue == "National Land Cover Dataset") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_11", JanResults.aggregate_mean("code_11"))
                       .set("code_12", JanResults.aggregate_mean("code_12"))
                       .set("code_21", JanResults.aggregate_mean("code_21"))
                       .set("code_22", JanResults.aggregate_mean("code_22"))
                       .set("code_23", JanResults.aggregate_mean("code_23"))
                       .set("code_24", JanResults.aggregate_mean("code_24"))
                       .set("code_31", JanResults.aggregate_mean("code_31"))
                       .set("code_41", JanResults.aggregate_mean("code_41"))
                       .set("code_42", JanResults.aggregate_mean("code_42"))
                       .set("code_43", JanResults.aggregate_mean("code_43"))
                       .set("code_51", JanResults.aggregate_mean("code_51"))
                       .set("code_52", JanResults.aggregate_mean("code_52"))
                       .set("code_71", JanResults.aggregate_mean("code_71"))
                       .set("code_72", JanResults.aggregate_mean("code_72"))
                       .set("code_73", JanResults.aggregate_mean("code_73"))
                       .set("code_74", JanResults.aggregate_mean("code_74"))
                       .set("code_81", JanResults.aggregate_mean("code_81"))
                       .set("code_82", JanResults.aggregate_mean("code_82")) 
                       .set("code_90", JanResults.aggregate_mean("code_90"))
                       .set("code_95", JanResults.aggregate_mean("code_95"));
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_11", FebResults.aggregate_mean("code_11"))
                       .set("code_12", FebResults.aggregate_mean("code_12"))
                       .set("code_21", FebResults.aggregate_mean("code_21"))
                       .set("code_22", FebResults.aggregate_mean("code_22"))
                       .set("code_23", FebResults.aggregate_mean("code_23"))
                       .set("code_24", FebResults.aggregate_mean("code_24"))
                       .set("code_31", FebResults.aggregate_mean("code_31"))
                       .set("code_41", FebResults.aggregate_mean("code_41"))
                       .set("code_42", FebResults.aggregate_mean("code_42"))
                       .set("code_43", FebResults.aggregate_mean("code_43"))
                       .set("code_51", FebResults.aggregate_mean("code_51"))
                       .set("code_52", FebResults.aggregate_mean("code_52"))
                       .set("code_71", FebResults.aggregate_mean("code_71"))
                       .set("code_72", FebResults.aggregate_mean("code_72"))
                       .set("code_73", FebResults.aggregate_mean("code_73"))
                       .set("code_74", FebResults.aggregate_mean("code_74"))
                       .set("code_81", FebResults.aggregate_mean("code_81"))
                       .set("code_82", FebResults.aggregate_mean("code_82")) 
                       .set("code_90", FebResults.aggregate_mean("code_90"))
                       .set("code_95", FebResults.aggregate_mean("code_95"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_11", MarResults.aggregate_mean("code_11"))
                       .set("code_12", MarResults.aggregate_mean("code_12"))
                       .set("code_21", MarResults.aggregate_mean("code_21"))
                       .set("code_22", MarResults.aggregate_mean("code_22"))
                       .set("code_23", MarResults.aggregate_mean("code_23"))
                       .set("code_24", MarResults.aggregate_mean("code_24"))
                       .set("code_31", MarResults.aggregate_mean("code_31"))
                       .set("code_41", MarResults.aggregate_mean("code_41"))
                       .set("code_42", MarResults.aggregate_mean("code_42"))
                       .set("code_43", MarResults.aggregate_mean("code_43"))
                       .set("code_51", MarResults.aggregate_mean("code_51"))
                       .set("code_52", MarResults.aggregate_mean("code_52"))
                       .set("code_71", MarResults.aggregate_mean("code_71"))
                       .set("code_72", MarResults.aggregate_mean("code_72"))
                       .set("code_73", MarResults.aggregate_mean("code_73"))
                       .set("code_74", MarResults.aggregate_mean("code_74"))
                       .set("code_81", MarResults.aggregate_mean("code_81"))
                       .set("code_82", MarResults.aggregate_mean("code_82")) 
                       .set("code_90", MarResults.aggregate_mean("code_90"))
                       .set("code_95", MarResults.aggregate_mean("code_95"));
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_11", AprResults.aggregate_mean("code_11"))
                       .set("code_12", AprResults.aggregate_mean("code_12"))
                       .set("code_21", AprResults.aggregate_mean("code_21"))
                       .set("code_22", AprResults.aggregate_mean("code_22"))
                       .set("code_23", AprResults.aggregate_mean("code_23"))
                       .set("code_24", AprResults.aggregate_mean("code_24"))
                       .set("code_31", AprResults.aggregate_mean("code_31"))
                       .set("code_41", AprResults.aggregate_mean("code_41"))
                       .set("code_42", AprResults.aggregate_mean("code_42"))
                       .set("code_43", AprResults.aggregate_mean("code_43"))
                       .set("code_51", AprResults.aggregate_mean("code_51"))
                       .set("code_52", AprResults.aggregate_mean("code_52"))
                       .set("code_71", AprResults.aggregate_mean("code_71"))
                       .set("code_72", AprResults.aggregate_mean("code_72"))
                       .set("code_73", AprResults.aggregate_mean("code_73"))
                       .set("code_74", AprResults.aggregate_mean("code_74"))
                       .set("code_81", AprResults.aggregate_mean("code_81"))
                       .set("code_82", AprResults.aggregate_mean("code_82")) 
                       .set("code_90", AprResults.aggregate_mean("code_90"))
                       .set("code_95", AprResults.aggregate_mean("code_95"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_11", MayResults.aggregate_mean("code_11"))
                       .set("code_12", MayResults.aggregate_mean("code_12"))
                       .set("code_21", MayResults.aggregate_mean("code_21"))
                       .set("code_22", MayResults.aggregate_mean("code_22"))
                       .set("code_23", MayResults.aggregate_mean("code_23"))
                       .set("code_24", MayResults.aggregate_mean("code_24"))
                       .set("code_31", MayResults.aggregate_mean("code_31"))
                       .set("code_41", MayResults.aggregate_mean("code_41"))
                       .set("code_42", MayResults.aggregate_mean("code_42"))
                       .set("code_43", MayResults.aggregate_mean("code_43"))
                       .set("code_51", MayResults.aggregate_mean("code_51"))
                       .set("code_52", MayResults.aggregate_mean("code_52"))
                       .set("code_71", MayResults.aggregate_mean("code_71"))
                       .set("code_72", MayResults.aggregate_mean("code_72"))
                       .set("code_73", MayResults.aggregate_mean("code_73"))
                       .set("code_74", MayResults.aggregate_mean("code_74"))
                       .set("code_81", MayResults.aggregate_mean("code_81"))
                       .set("code_82", MayResults.aggregate_mean("code_82")) 
                       .set("code_90", MayResults.aggregate_mean("code_90"))
                       .set("code_95", MayResults.aggregate_mean("code_95")); 
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_11", JunResults.aggregate_mean("code_11"))
                       .set("code_12", JunResults.aggregate_mean("code_12"))
                       .set("code_21", JunResults.aggregate_mean("code_21"))
                       .set("code_22", JunResults.aggregate_mean("code_22"))
                       .set("code_23", JunResults.aggregate_mean("code_23"))
                       .set("code_24", JunResults.aggregate_mean("code_24"))
                       .set("code_31", JunResults.aggregate_mean("code_31"))
                       .set("code_41", JunResults.aggregate_mean("code_41"))
                       .set("code_42", JunResults.aggregate_mean("code_42"))
                       .set("code_43", JunResults.aggregate_mean("code_43"))
                       .set("code_51", JunResults.aggregate_mean("code_51"))
                       .set("code_52", JunResults.aggregate_mean("code_52"))
                       .set("code_71", JunResults.aggregate_mean("code_71"))
                       .set("code_72", JunResults.aggregate_mean("code_72"))
                       .set("code_73", JunResults.aggregate_mean("code_73"))
                       .set("code_74", JunResults.aggregate_mean("code_74"))
                       .set("code_81", JunResults.aggregate_mean("code_81"))
                       .set("code_82", JunResults.aggregate_mean("code_82")) 
                       .set("code_90", JunResults.aggregate_mean("code_90"))
                       .set("code_95", JunResults.aggregate_mean("code_95")); 
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_11", JlyResults.aggregate_mean("code_11"))
                       .set("code_12", JlyResults.aggregate_mean("code_12"))
                       .set("code_21", JlyResults.aggregate_mean("code_21"))
                       .set("code_22", JlyResults.aggregate_mean("code_22"))
                       .set("code_23", JlyResults.aggregate_mean("code_23"))
                       .set("code_24", JlyResults.aggregate_mean("code_24"))
                       .set("code_31", JlyResults.aggregate_mean("code_31"))
                       .set("code_41", JlyResults.aggregate_mean("code_41"))
                       .set("code_42", JlyResults.aggregate_mean("code_42"))
                       .set("code_43", JlyResults.aggregate_mean("code_43"))
                       .set("code_51", JlyResults.aggregate_mean("code_51"))
                       .set("code_52", JlyResults.aggregate_mean("code_52"))
                       .set("code_71", JlyResults.aggregate_mean("code_71"))
                       .set("code_72", JlyResults.aggregate_mean("code_72"))
                       .set("code_73", JlyResults.aggregate_mean("code_73"))
                       .set("code_74", JlyResults.aggregate_mean("code_74"))
                       .set("code_81", JlyResults.aggregate_mean("code_81"))
                       .set("code_82", JlyResults.aggregate_mean("code_82")) 
                       .set("code_90", JlyResults.aggregate_mean("code_90"))
                       .set("code_95", JlyResults.aggregate_mean("code_95"));  
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_11", AugResults.aggregate_mean("code_11"))
                       .set("code_12", AugResults.aggregate_mean("code_12"))
                       .set("code_21", AugResults.aggregate_mean("code_21"))
                       .set("code_22", AugResults.aggregate_mean("code_22"))
                       .set("code_23", AugResults.aggregate_mean("code_23"))
                       .set("code_24", AugResults.aggregate_mean("code_24"))
                       .set("code_31", AugResults.aggregate_mean("code_31"))
                       .set("code_41", AugResults.aggregate_mean("code_41"))
                       .set("code_42", AugResults.aggregate_mean("code_42"))
                       .set("code_43", AugResults.aggregate_mean("code_43"))
                       .set("code_51", AugResults.aggregate_mean("code_51"))
                       .set("code_52", AugResults.aggregate_mean("code_52"))
                       .set("code_71", AugResults.aggregate_mean("code_71"))
                       .set("code_72", AugResults.aggregate_mean("code_72"))
                       .set("code_73", AugResults.aggregate_mean("code_73"))
                       .set("code_74", AugResults.aggregate_mean("code_74"))
                       .set("code_81", AugResults.aggregate_mean("code_81"))
                       .set("code_82", AugResults.aggregate_mean("code_82")) 
                       .set("code_90", AugResults.aggregate_mean("code_90"))
                       .set("code_95", AugResults.aggregate_mean("code_95")); 
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_11", SepResults.aggregate_mean("code_11"))
                       .set("code_12", SepResults.aggregate_mean("code_12"))
                       .set("code_21", SepResults.aggregate_mean("code_21"))
                       .set("code_22", SepResults.aggregate_mean("code_22"))
                       .set("code_23", SepResults.aggregate_mean("code_23"))
                       .set("code_24", SepResults.aggregate_mean("code_24"))
                       .set("code_31", SepResults.aggregate_mean("code_31"))
                       .set("code_41", SepResults.aggregate_mean("code_41"))
                       .set("code_42", SepResults.aggregate_mean("code_42"))
                       .set("code_43", SepResults.aggregate_mean("code_43"))
                       .set("code_51", SepResults.aggregate_mean("code_51"))
                       .set("code_52", SepResults.aggregate_mean("code_52"))
                       .set("code_71", SepResults.aggregate_mean("code_71"))
                       .set("code_72", SepResults.aggregate_mean("code_72"))
                       .set("code_73", SepResults.aggregate_mean("code_73"))
                       .set("code_74", SepResults.aggregate_mean("code_74"))
                       .set("code_81", SepResults.aggregate_mean("code_81"))
                       .set("code_82", SepResults.aggregate_mean("code_82")) 
                       .set("code_90", SepResults.aggregate_mean("code_90"))
                       .set("code_95", SepResults.aggregate_mean("code_95")); 
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_11", OctResults.aggregate_mean("code_11"))
                       .set("code_12", OctResults.aggregate_mean("code_12"))
                       .set("code_21", OctResults.aggregate_mean("code_21"))
                       .set("code_22", OctResults.aggregate_mean("code_22"))
                       .set("code_23", OctResults.aggregate_mean("code_23"))
                       .set("code_24", OctResults.aggregate_mean("code_24"))
                       .set("code_31", OctResults.aggregate_mean("code_31"))
                       .set("code_41", OctResults.aggregate_mean("code_41"))
                       .set("code_42", OctResults.aggregate_mean("code_42"))
                       .set("code_43", OctResults.aggregate_mean("code_43"))
                       .set("code_51", OctResults.aggregate_mean("code_51"))
                       .set("code_52", OctResults.aggregate_mean("code_52"))
                       .set("code_71", OctResults.aggregate_mean("code_71"))
                       .set("code_72", OctResults.aggregate_mean("code_72"))
                       .set("code_73", OctResults.aggregate_mean("code_73"))
                       .set("code_74", OctResults.aggregate_mean("code_74"))
                       .set("code_81", OctResults.aggregate_mean("code_81"))
                       .set("code_82", OctResults.aggregate_mean("code_82")) 
                       .set("code_90", OctResults.aggregate_mean("code_90"))
                       .set("code_95", OctResults.aggregate_mean("code_95")); 
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_11", NovResults.aggregate_mean("code_11"))
                       .set("code_12", NovResults.aggregate_mean("code_12"))
                       .set("code_21", NovResults.aggregate_mean("code_21"))
                       .set("code_22", NovResults.aggregate_mean("code_22"))
                       .set("code_23", NovResults.aggregate_mean("code_23"))
                       .set("code_24", NovResults.aggregate_mean("code_24"))
                       .set("code_31", NovResults.aggregate_mean("code_31"))
                       .set("code_41", NovResults.aggregate_mean("code_41"))
                       .set("code_42", NovResults.aggregate_mean("code_42"))
                       .set("code_43", NovResults.aggregate_mean("code_43"))
                       .set("code_51", NovResults.aggregate_mean("code_51"))
                       .set("code_52", NovResults.aggregate_mean("code_52"))
                       .set("code_71", NovResults.aggregate_mean("code_71"))
                       .set("code_72", NovResults.aggregate_mean("code_72"))
                       .set("code_73", NovResults.aggregate_mean("code_73"))
                       .set("code_74", NovResults.aggregate_mean("code_74"))
                       .set("code_81", NovResults.aggregate_mean("code_81"))
                       .set("code_82", NovResults.aggregate_mean("code_82")) 
                       .set("code_90", NovResults.aggregate_mean("code_90"))
                       .set("code_95", NovResults.aggregate_mean("code_95"));   
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_11", DecResults.aggregate_mean("code_11"))
                       .set("code_12", DecResults.aggregate_mean("code_12"))
                       .set("code_21", DecResults.aggregate_mean("code_21"))
                       .set("code_22", DecResults.aggregate_mean("code_22"))
                       .set("code_23", DecResults.aggregate_mean("code_23"))
                       .set("code_24", DecResults.aggregate_mean("code_24"))
                       .set("code_31", DecResults.aggregate_mean("code_31"))
                       .set("code_41", DecResults.aggregate_mean("code_41"))
                       .set("code_42", DecResults.aggregate_mean("code_42"))
                       .set("code_43", DecResults.aggregate_mean("code_43"))
                       .set("code_51", DecResults.aggregate_mean("code_51"))
                       .set("code_52", DecResults.aggregate_mean("code_52"))
                       .set("code_71", DecResults.aggregate_mean("code_71"))
                       .set("code_72", DecResults.aggregate_mean("code_72"))
                       .set("code_73", DecResults.aggregate_mean("code_73"))
                       .set("code_74", DecResults.aggregate_mean("code_74"))
                       .set("code_81", DecResults.aggregate_mean("code_81"))
                       .set("code_82", DecResults.aggregate_mean("code_82")) 
                       .set("code_90", DecResults.aggregate_mean("code_90"))
                       .set("code_95", DecResults.aggregate_mean("code_95"));   
      } else if(LCvalue == "IGBP Land Cover") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_mean("code_1"))
                       .set("code_2", JanResults.aggregate_mean("code_2"))
                       .set("code_3", JanResults.aggregate_mean("code_3"))
                       .set("code_4", JanResults.aggregate_mean("code_4"))
                       .set("code_5", JanResults.aggregate_mean("code_5"))
                       .set("code_6", JanResults.aggregate_mean("code_6"))
                       .set("code_7", JanResults.aggregate_mean("code_7"))
                       .set("code_8", JanResults.aggregate_mean("code_8"))
                       .set("code_9", JanResults.aggregate_mean("code_9"))
                       .set("code_10", JanResults.aggregate_mean("code_10"))
                       .set("code_11", JanResults.aggregate_mean("code_11"))
                       .set("code_12", JanResults.aggregate_mean("code_12"))
                       .set("code_13", JanResults.aggregate_mean("code_13"))
                       .set("code_14", JanResults.aggregate_mean("code_14"))
                       .set("code_15", JanResults.aggregate_mean("code_15"))
                       .set("code_16", JanResults.aggregate_mean("code_16"))
                       .set("code_17", JanResults.aggregate_mean("code_17"))
                       .set("code_254", JanResults.aggregate_mean("code_254"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_mean("code_1"))
                       .set("code_2", FebResults.aggregate_mean("code_2"))
                       .set("code_3", FebResults.aggregate_mean("code_3"))
                       .set("code_4", FebResults.aggregate_mean("code_4"))
                       .set("code_5", FebResults.aggregate_mean("code_5"))
                       .set("code_6", FebResults.aggregate_mean("code_6"))
                       .set("code_7", FebResults.aggregate_mean("code_7"))
                       .set("code_8", FebResults.aggregate_mean("code_8"))
                       .set("code_9", FebResults.aggregate_mean("code_9"))
                       .set("code_10", FebResults.aggregate_mean("code_10"))
                       .set("code_11", FebResults.aggregate_mean("code_11"))
                       .set("code_12", FebResults.aggregate_mean("code_12"))
                       .set("code_13", FebResults.aggregate_mean("code_13"))
                       .set("code_14", FebResults.aggregate_mean("code_14"))
                       .set("code_15", FebResults.aggregate_mean("code_15"))
                       .set("code_16", FebResults.aggregate_mean("code_16"))
                       .set("code_17", FebResults.aggregate_mean("code_17"))
                       .set("code_254", FebResults.aggregate_mean("code_254"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_mean("code_1"))
                       .set("code_2", MarResults.aggregate_mean("code_2"))
                       .set("code_3", MarResults.aggregate_mean("code_3"))
                       .set("code_4", MarResults.aggregate_mean("code_4"))
                       .set("code_5", MarResults.aggregate_mean("code_5"))
                       .set("code_6", MarResults.aggregate_mean("code_6"))
                       .set("code_7", MarResults.aggregate_mean("code_7"))
                       .set("code_8", MarResults.aggregate_mean("code_8"))
                       .set("code_9", MarResults.aggregate_mean("code_9"))
                       .set("code_10", MarResults.aggregate_mean("code_10"))
                       .set("code_11", MarResults.aggregate_mean("code_11"))
                       .set("code_12", MarResults.aggregate_mean("code_12"))
                       .set("code_13", MarResults.aggregate_mean("code_13"))
                       .set("code_14", MarResults.aggregate_mean("code_14"))
                       .set("code_15", MarResults.aggregate_mean("code_15"))
                       .set("code_16", MarResults.aggregate_mean("code_16"))
                       .set("code_17", MarResults.aggregate_mean("code_17"))
                       .set("code_254", MarResults.aggregate_mean("code_254"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_mean("code_1"))
                       .set("code_2", AprResults.aggregate_mean("code_2"))
                       .set("code_3", AprResults.aggregate_mean("code_3"))
                       .set("code_4", AprResults.aggregate_mean("code_4"))
                       .set("code_5", AprResults.aggregate_mean("code_5"))
                       .set("code_6", AprResults.aggregate_mean("code_6"))
                       .set("code_7", AprResults.aggregate_mean("code_7"))
                       .set("code_8", AprResults.aggregate_mean("code_8"))
                       .set("code_9", AprResults.aggregate_mean("code_9"))
                       .set("code_10", AprResults.aggregate_mean("code_10"))
                       .set("code_11", AprResults.aggregate_mean("code_11"))
                       .set("code_12", AprResults.aggregate_mean("code_12"))
                       .set("code_13", AprResults.aggregate_mean("code_13"))
                       .set("code_14", AprResults.aggregate_mean("code_14"))
                       .set("code_15", AprResults.aggregate_mean("code_15"))
                       .set("code_16", AprResults.aggregate_mean("code_16"))
                       .set("code_17", AprResults.aggregate_mean("code_17"))
                       .set("code_254", AprResults.aggregate_mean("code_254"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_mean("code_1"))
                       .set("code_2", MayResults.aggregate_mean("code_2"))
                       .set("code_3", MayResults.aggregate_mean("code_3"))
                       .set("code_4", MayResults.aggregate_mean("code_4"))
                       .set("code_5", MayResults.aggregate_mean("code_5"))
                       .set("code_6", MayResults.aggregate_mean("code_6"))
                       .set("code_7", MayResults.aggregate_mean("code_7"))
                       .set("code_8", MayResults.aggregate_mean("code_8"))
                       .set("code_9", MayResults.aggregate_mean("code_9"))
                       .set("code_10", MayResults.aggregate_mean("code_10"))
                       .set("code_11", MayResults.aggregate_mean("code_11"))
                       .set("code_12", MayResults.aggregate_mean("code_12"))
                       .set("code_13", MayResults.aggregate_mean("code_13"))
                       .set("code_14", MayResults.aggregate_mean("code_14"))
                       .set("code_15", MayResults.aggregate_mean("code_15"))
                       .set("code_16", MayResults.aggregate_mean("code_16"))
                       .set("code_17", MayResults.aggregate_mean("code_17"))
                       .set("code_254", MayResults.aggregate_mean("code_254"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_mean("code_1"))
                       .set("code_2", JunResults.aggregate_mean("code_2"))
                       .set("code_3", JunResults.aggregate_mean("code_3"))
                       .set("code_4", JunResults.aggregate_mean("code_4"))
                       .set("code_5", JunResults.aggregate_mean("code_5"))
                       .set("code_6", JunResults.aggregate_mean("code_6"))
                       .set("code_7", JunResults.aggregate_mean("code_7"))
                       .set("code_8", JunResults.aggregate_mean("code_8"))
                       .set("code_9", JunResults.aggregate_mean("code_9"))
                       .set("code_10", JunResults.aggregate_mean("code_10"))
                       .set("code_11", JunResults.aggregate_mean("code_11"))
                       .set("code_12", JunResults.aggregate_mean("code_12"))
                       .set("code_13", JunResults.aggregate_mean("code_13"))
                       .set("code_14", JunResults.aggregate_mean("code_14"))
                       .set("code_15", JunResults.aggregate_mean("code_15"))
                       .set("code_16", JunResults.aggregate_mean("code_16"))
                       .set("code_17", JunResults.aggregate_mean("code_17"))
                       .set("code_254", JunResults.aggregate_mean("code_254"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_mean("code_1"))
                       .set("code_2", JlyResults.aggregate_mean("code_2"))
                       .set("code_3", JlyResults.aggregate_mean("code_3"))
                       .set("code_4", JlyResults.aggregate_mean("code_4"))
                       .set("code_5", JlyResults.aggregate_mean("code_5"))
                       .set("code_6", JlyResults.aggregate_mean("code_6"))
                       .set("code_7", JlyResults.aggregate_mean("code_7"))
                       .set("code_8", JlyResults.aggregate_mean("code_8"))
                       .set("code_9", JlyResults.aggregate_mean("code_9"))
                       .set("code_10", JlyResults.aggregate_mean("code_10"))
                       .set("code_11", JlyResults.aggregate_mean("code_11"))
                       .set("code_12", JlyResults.aggregate_mean("code_12"))
                       .set("code_13", JlyResults.aggregate_mean("code_13"))
                       .set("code_14", JlyResults.aggregate_mean("code_14"))
                       .set("code_15", JlyResults.aggregate_mean("code_15"))
                       .set("code_16", JlyResults.aggregate_mean("code_16"))
                       .set("code_17", JlyResults.aggregate_mean("code_17"))
                       .set("code_254", JlyResults.aggregate_mean("code_254"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_mean("code_1"))
                       .set("code_2", AugResults.aggregate_mean("code_2"))
                       .set("code_3", AugResults.aggregate_mean("code_3"))
                       .set("code_4", AugResults.aggregate_mean("code_4"))
                       .set("code_5", AugResults.aggregate_mean("code_5"))
                       .set("code_6", AugResults.aggregate_mean("code_6"))
                       .set("code_7", AugResults.aggregate_mean("code_7"))
                       .set("code_8", AugResults.aggregate_mean("code_8"))
                       .set("code_9", AugResults.aggregate_mean("code_9"))
                       .set("code_10", AugResults.aggregate_mean("code_10"))
                       .set("code_11", AugResults.aggregate_mean("code_11"))
                       .set("code_12", AugResults.aggregate_mean("code_12"))
                       .set("code_13", AugResults.aggregate_mean("code_13"))
                       .set("code_14", AugResults.aggregate_mean("code_14"))
                       .set("code_15", AugResults.aggregate_mean("code_15"))
                       .set("code_16", AugResults.aggregate_mean("code_16"))
                       .set("code_17", AugResults.aggregate_mean("code_17"))
                       .set("code_254", AugResults.aggregate_mean("code_254"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_mean("code_1"))
                       .set("code_2", SepResults.aggregate_mean("code_2"))
                       .set("code_3", SepResults.aggregate_mean("code_3"))
                       .set("code_4", SepResults.aggregate_mean("code_4"))
                       .set("code_5", SepResults.aggregate_mean("code_5"))
                       .set("code_6", SepResults.aggregate_mean("code_6"))
                       .set("code_7", SepResults.aggregate_mean("code_7"))
                       .set("code_8", SepResults.aggregate_mean("code_8"))
                       .set("code_9", SepResults.aggregate_mean("code_9"))
                       .set("code_10", SepResults.aggregate_mean("code_10"))
                       .set("code_11", SepResults.aggregate_mean("code_11"))
                       .set("code_12", SepResults.aggregate_mean("code_12"))
                       .set("code_13", SepResults.aggregate_mean("code_13"))
                       .set("code_14", SepResults.aggregate_mean("code_14"))
                       .set("code_15", SepResults.aggregate_mean("code_15"))
                       .set("code_16", SepResults.aggregate_mean("code_16"))
                       .set("code_17", SepResults.aggregate_mean("code_17"))
                       .set("code_254", SepResults.aggregate_mean("code_254"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_mean("code_1"))
                       .set("code_2", OctResults.aggregate_mean("code_2"))
                       .set("code_3", OctResults.aggregate_mean("code_3"))
                       .set("code_4", OctResults.aggregate_mean("code_4"))
                       .set("code_5", OctResults.aggregate_mean("code_5"))
                       .set("code_6", OctResults.aggregate_mean("code_6"))
                       .set("code_7", OctResults.aggregate_mean("code_7"))
                       .set("code_8", OctResults.aggregate_mean("code_8"))
                       .set("code_9", OctResults.aggregate_mean("code_9"))
                       .set("code_10", OctResults.aggregate_mean("code_10"))
                       .set("code_11", OctResults.aggregate_mean("code_11"))
                       .set("code_12", OctResults.aggregate_mean("code_12"))
                       .set("code_13", OctResults.aggregate_mean("code_13"))
                       .set("code_14", OctResults.aggregate_mean("code_14"))
                       .set("code_15", OctResults.aggregate_mean("code_15"))
                       .set("code_16", OctResults.aggregate_mean("code_16"))
                       .set("code_17", OctResults.aggregate_mean("code_17"))
                       .set("code_254", OctResults.aggregate_mean("code_254"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_mean("code_1"))
                       .set("code_2", NovResults.aggregate_mean("code_2"))
                       .set("code_3", NovResults.aggregate_mean("code_3"))
                       .set("code_4", NovResults.aggregate_mean("code_4"))
                       .set("code_5", NovResults.aggregate_mean("code_5"))
                       .set("code_6", NovResults.aggregate_mean("code_6"))
                       .set("code_7", NovResults.aggregate_mean("code_7"))
                       .set("code_8", NovResults.aggregate_mean("code_8"))
                       .set("code_9", NovResults.aggregate_mean("code_9"))
                       .set("code_10", NovResults.aggregate_mean("code_10"))
                       .set("code_11", NovResults.aggregate_mean("code_11"))
                       .set("code_12", NovResults.aggregate_mean("code_12"))
                       .set("code_13", NovResults.aggregate_mean("code_13"))
                       .set("code_14", NovResults.aggregate_mean("code_14"))
                       .set("code_15", NovResults.aggregate_mean("code_15"))
                       .set("code_16", NovResults.aggregate_mean("code_16"))
                       .set("code_17", NovResults.aggregate_mean("code_17"))
                       .set("code_254", NovResults.aggregate_mean("code_254"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_mean("code_1"))
                       .set("code_2", DecResults.aggregate_mean("code_2"))
                       .set("code_3", DecResults.aggregate_mean("code_3"))
                       .set("code_4", DecResults.aggregate_mean("code_4"))
                       .set("code_5", DecResults.aggregate_mean("code_5"))
                       .set("code_6", DecResults.aggregate_mean("code_6"))
                       .set("code_7", DecResults.aggregate_mean("code_7"))
                       .set("code_8", DecResults.aggregate_mean("code_8"))
                       .set("code_9", DecResults.aggregate_mean("code_9"))
                       .set("code_10", DecResults.aggregate_mean("code_10"))
                       .set("code_11", DecResults.aggregate_mean("code_11"))
                       .set("code_12", DecResults.aggregate_mean("code_12"))
                       .set("code_13", DecResults.aggregate_mean("code_13"))
                       .set("code_14", DecResults.aggregate_mean("code_14"))
                       .set("code_15", DecResults.aggregate_mean("code_15"))
                       .set("code_16", DecResults.aggregate_mean("code_16"))
                       .set("code_17", DecResults.aggregate_mean("code_17"))
                       .set("code_254", DecResults.aggregate_mean("code_254"));
      } else if(LCvalue == "UMD Land Cover") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_mean("code_1"))
                       .set("code_2", JanResults.aggregate_mean("code_2"))
                       .set("code_3", JanResults.aggregate_mean("code_3"))
                       .set("code_4", JanResults.aggregate_mean("code_4"))
                       .set("code_5", JanResults.aggregate_mean("code_5"))
                       .set("code_6", JanResults.aggregate_mean("code_6"))
                       .set("code_7", JanResults.aggregate_mean("code_7"))
                       .set("code_8", JanResults.aggregate_mean("code_8"))
                       .set("code_9", JanResults.aggregate_mean("code_9"))
                       .set("code_10", JanResults.aggregate_mean("code_10"))
                       .set("code_11", JanResults.aggregate_mean("code_11"))
                       .set("code_12", JanResults.aggregate_mean("code_12"))
                       .set("code_13", JanResults.aggregate_mean("code_13"))
                       .set("code_14", JanResults.aggregate_mean("code_14"))
                       .set("code_15", JanResults.aggregate_mean("code_15"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_mean("code_1"))
                       .set("code_2", FebResults.aggregate_mean("code_2"))
                       .set("code_3", FebResults.aggregate_mean("code_3"))
                       .set("code_4", FebResults.aggregate_mean("code_4"))
                       .set("code_5", FebResults.aggregate_mean("code_5"))
                       .set("code_6", FebResults.aggregate_mean("code_6"))
                       .set("code_7", FebResults.aggregate_mean("code_7"))
                       .set("code_8", FebResults.aggregate_mean("code_8"))
                       .set("code_9", FebResults.aggregate_mean("code_9"))
                       .set("code_10", FebResults.aggregate_mean("code_10"))
                       .set("code_11", FebResults.aggregate_mean("code_11"))
                       .set("code_12", FebResults.aggregate_mean("code_12"))
                       .set("code_13", FebResults.aggregate_mean("code_13"))
                       .set("code_14", FebResults.aggregate_mean("code_14"))
                       .set("code_15", FebResults.aggregate_mean("code_15"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_mean("code_1"))
                       .set("code_2", MarResults.aggregate_mean("code_2"))
                       .set("code_3", MarResults.aggregate_mean("code_3"))
                       .set("code_4", MarResults.aggregate_mean("code_4"))
                       .set("code_5", MarResults.aggregate_mean("code_5"))
                       .set("code_6", MarResults.aggregate_mean("code_6"))
                       .set("code_7", MarResults.aggregate_mean("code_7"))
                       .set("code_8", MarResults.aggregate_mean("code_8"))
                       .set("code_9", MarResults.aggregate_mean("code_9"))
                       .set("code_10", MarResults.aggregate_mean("code_10"))
                       .set("code_11", MarResults.aggregate_mean("code_11"))
                       .set("code_12", MarResults.aggregate_mean("code_12"))
                       .set("code_13", MarResults.aggregate_mean("code_13"))
                       .set("code_14", MarResults.aggregate_mean("code_14"))
                       .set("code_15", MarResults.aggregate_mean("code_15"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_mean("code_1"))
                       .set("code_2", AprResults.aggregate_mean("code_2"))
                       .set("code_3", AprResults.aggregate_mean("code_3"))
                       .set("code_4", AprResults.aggregate_mean("code_4"))
                       .set("code_5", AprResults.aggregate_mean("code_5"))
                       .set("code_6", AprResults.aggregate_mean("code_6"))
                       .set("code_7", AprResults.aggregate_mean("code_7"))
                       .set("code_8", AprResults.aggregate_mean("code_8"))
                       .set("code_9", AprResults.aggregate_mean("code_9"))
                       .set("code_10", AprResults.aggregate_mean("code_10"))
                       .set("code_11", AprResults.aggregate_mean("code_11"))
                       .set("code_12", AprResults.aggregate_mean("code_12"))
                       .set("code_13", AprResults.aggregate_mean("code_13"))
                       .set("code_14", AprResults.aggregate_mean("code_14"))
                       .set("code_15", AprResults.aggregate_mean("code_15"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_mean("code_1"))
                       .set("code_2", MayResults.aggregate_mean("code_2"))
                       .set("code_3", MayResults.aggregate_mean("code_3"))
                       .set("code_4", MayResults.aggregate_mean("code_4"))
                       .set("code_5", MayResults.aggregate_mean("code_5"))
                       .set("code_6", MayResults.aggregate_mean("code_6"))
                       .set("code_7", MayResults.aggregate_mean("code_7"))
                       .set("code_8", MayResults.aggregate_mean("code_8"))
                       .set("code_9", MayResults.aggregate_mean("code_9"))
                       .set("code_10", MayResults.aggregate_mean("code_10"))
                       .set("code_11", MayResults.aggregate_mean("code_11"))
                       .set("code_12", MayResults.aggregate_mean("code_12"))
                       .set("code_13", MayResults.aggregate_mean("code_13"))
                       .set("code_14", MayResults.aggregate_mean("code_14"))
                       .set("code_15", MayResults.aggregate_mean("code_15"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_mean("code_1"))
                       .set("code_2", JunResults.aggregate_mean("code_2"))
                       .set("code_3", JunResults.aggregate_mean("code_3"))
                       .set("code_4", JunResults.aggregate_mean("code_4"))
                       .set("code_5", JunResults.aggregate_mean("code_5"))
                       .set("code_6", JunResults.aggregate_mean("code_6"))
                       .set("code_7", JunResults.aggregate_mean("code_7"))
                       .set("code_8", JunResults.aggregate_mean("code_8"))
                       .set("code_9", JunResults.aggregate_mean("code_9"))
                       .set("code_10", JunResults.aggregate_mean("code_10"))
                       .set("code_11", JunResults.aggregate_mean("code_11"))
                       .set("code_12", JunResults.aggregate_mean("code_12"))
                       .set("code_13", JunResults.aggregate_mean("code_13"))
                       .set("code_14", JunResults.aggregate_mean("code_14"))
                       .set("code_15", JunResults.aggregate_mean("code_15"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_mean("code_1"))
                       .set("code_2", JlyResults.aggregate_mean("code_2"))
                       .set("code_3", JlyResults.aggregate_mean("code_3"))
                       .set("code_4", JlyResults.aggregate_mean("code_4"))
                       .set("code_5", JlyResults.aggregate_mean("code_5"))
                       .set("code_6", JlyResults.aggregate_mean("code_6"))
                       .set("code_7", JlyResults.aggregate_mean("code_7"))
                       .set("code_8", JlyResults.aggregate_mean("code_8"))
                       .set("code_9", JlyResults.aggregate_mean("code_9"))
                       .set("code_10", JlyResults.aggregate_mean("code_10"))
                       .set("code_11", JlyResults.aggregate_mean("code_11"))
                       .set("code_12", JlyResults.aggregate_mean("code_12"))
                       .set("code_13", JlyResults.aggregate_mean("code_13"))
                       .set("code_14", JlyResults.aggregate_mean("code_14"))
                       .set("code_15", JlyResults.aggregate_mean("code_15"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_mean("code_1"))
                       .set("code_2", AugResults.aggregate_mean("code_2"))
                       .set("code_3", AugResults.aggregate_mean("code_3"))
                       .set("code_4", AugResults.aggregate_mean("code_4"))
                       .set("code_5", AugResults.aggregate_mean("code_5"))
                       .set("code_6", AugResults.aggregate_mean("code_6"))
                       .set("code_7", AugResults.aggregate_mean("code_7"))
                       .set("code_8", AugResults.aggregate_mean("code_8"))
                       .set("code_9", AugResults.aggregate_mean("code_9"))
                       .set("code_10", AugResults.aggregate_mean("code_10"))
                       .set("code_11", AugResults.aggregate_mean("code_11"))
                       .set("code_12", AugResults.aggregate_mean("code_12"))
                       .set("code_13", AugResults.aggregate_mean("code_13"))
                       .set("code_14", AugResults.aggregate_mean("code_14"))
                       .set("code_15", AugResults.aggregate_mean("code_15"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_mean("code_1"))
                       .set("code_2", SepResults.aggregate_mean("code_2"))
                       .set("code_3", SepResults.aggregate_mean("code_3"))
                       .set("code_4", SepResults.aggregate_mean("code_4"))
                       .set("code_5", SepResults.aggregate_mean("code_5"))
                       .set("code_6", SepResults.aggregate_mean("code_6"))
                       .set("code_7", SepResults.aggregate_mean("code_7"))
                       .set("code_8", SepResults.aggregate_mean("code_8"))
                       .set("code_9", SepResults.aggregate_mean("code_9"))
                       .set("code_10", SepResults.aggregate_mean("code_10"))
                       .set("code_11", SepResults.aggregate_mean("code_11"))
                       .set("code_12", SepResults.aggregate_mean("code_12"))
                       .set("code_13", SepResults.aggregate_mean("code_13"))
                       .set("code_14", SepResults.aggregate_mean("code_14"))
                       .set("code_15", SepResults.aggregate_mean("code_15"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_mean("code_1"))
                       .set("code_2", OctResults.aggregate_mean("code_2"))
                       .set("code_3", OctResults.aggregate_mean("code_3"))
                       .set("code_4", OctResults.aggregate_mean("code_4"))
                       .set("code_5", OctResults.aggregate_mean("code_5"))
                       .set("code_6", OctResults.aggregate_mean("code_6"))
                       .set("code_7", OctResults.aggregate_mean("code_7"))
                       .set("code_8", OctResults.aggregate_mean("code_8"))
                       .set("code_9", OctResults.aggregate_mean("code_9"))
                       .set("code_10", OctResults.aggregate_mean("code_10"))
                       .set("code_11", OctResults.aggregate_mean("code_11"))
                       .set("code_12", OctResults.aggregate_mean("code_12"))
                       .set("code_13", OctResults.aggregate_mean("code_13"))
                       .set("code_14", OctResults.aggregate_mean("code_14"))
                       .set("code_15", OctResults.aggregate_mean("code_15"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_mean("code_1"))
                       .set("code_2", NovResults.aggregate_mean("code_2"))
                       .set("code_3", NovResults.aggregate_mean("code_3"))
                       .set("code_4", NovResults.aggregate_mean("code_4"))
                       .set("code_5", NovResults.aggregate_mean("code_5"))
                       .set("code_6", NovResults.aggregate_mean("code_6"))
                       .set("code_7", NovResults.aggregate_mean("code_7"))
                       .set("code_8", NovResults.aggregate_mean("code_8"))
                       .set("code_9", NovResults.aggregate_mean("code_9"))
                       .set("code_10", NovResults.aggregate_mean("code_10"))
                       .set("code_11", NovResults.aggregate_mean("code_11"))
                       .set("code_12", NovResults.aggregate_mean("code_12"))
                       .set("code_13", NovResults.aggregate_mean("code_13"))
                       .set("code_14", NovResults.aggregate_mean("code_14"))
                       .set("code_15", NovResults.aggregate_mean("code_15"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_mean("code_1"))
                       .set("code_2", DecResults.aggregate_mean("code_2"))
                       .set("code_3", DecResults.aggregate_mean("code_3"))
                       .set("code_4", DecResults.aggregate_mean("code_4"))
                       .set("code_5", DecResults.aggregate_mean("code_5"))
                       .set("code_6", DecResults.aggregate_mean("code_6"))
                       .set("code_7", DecResults.aggregate_mean("code_7"))
                       .set("code_8", DecResults.aggregate_mean("code_8"))
                       .set("code_9", DecResults.aggregate_mean("code_9"))
                       .set("code_10", DecResults.aggregate_mean("code_10"))
                       .set("code_11", DecResults.aggregate_mean("code_11"))
                       .set("code_12", DecResults.aggregate_mean("code_12"))
                       .set("code_13", DecResults.aggregate_mean("code_13"))
                       .set("code_14", DecResults.aggregate_mean("code_14"))
                       .set("code_15", DecResults.aggregate_mean("code_15"));
      } else if(LCvalue == "None") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_mean("code_1"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_mean("code_1"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_mean("code_1"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_mean("code_1"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_mean("code_1"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_mean("code_1"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_mean("code_1"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_mean("code_1"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_mean("code_1"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_mean("code_1"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_mean("code_1"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_mean("code_1"));
      }
    } else if (MonthlySummeryStat == "max") {
      if(LCvalue == "National Land Cover Dataset") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_11", JanResults.aggregate_max("code_11"))
                       .set("code_12", JanResults.aggregate_max("code_12"))
                       .set("code_21", JanResults.aggregate_max("code_21"))
                       .set("code_22", JanResults.aggregate_max("code_22"))
                       .set("code_23", JanResults.aggregate_max("code_23"))
                       .set("code_24", JanResults.aggregate_max("code_24"))
                       .set("code_31", JanResults.aggregate_max("code_31"))
                       .set("code_41", JanResults.aggregate_max("code_41"))
                       .set("code_42", JanResults.aggregate_max("code_42"))
                       .set("code_43", JanResults.aggregate_max("code_43"))
                       .set("code_51", JanResults.aggregate_max("code_51"))
                       .set("code_52", JanResults.aggregate_max("code_52"))
                       .set("code_71", JanResults.aggregate_max("code_71"))
                       .set("code_72", JanResults.aggregate_max("code_72"))
                       .set("code_73", JanResults.aggregate_max("code_73"))
                       .set("code_74", JanResults.aggregate_max("code_74"))
                       .set("code_81", JanResults.aggregate_max("code_81"))
                       .set("code_82", JanResults.aggregate_max("code_82")) 
                       .set("code_90", JanResults.aggregate_max("code_90"))
                       .set("code_95", JanResults.aggregate_max("code_95"));
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_11", FebResults.aggregate_max("code_11"))
                       .set("code_12", FebResults.aggregate_max("code_12"))
                       .set("code_21", FebResults.aggregate_max("code_21"))
                       .set("code_22", FebResults.aggregate_max("code_22"))
                       .set("code_23", FebResults.aggregate_max("code_23"))
                       .set("code_24", FebResults.aggregate_max("code_24"))
                       .set("code_31", FebResults.aggregate_max("code_31"))
                       .set("code_41", FebResults.aggregate_max("code_41"))
                       .set("code_42", FebResults.aggregate_max("code_42"))
                       .set("code_43", FebResults.aggregate_max("code_43"))
                       .set("code_51", FebResults.aggregate_max("code_51"))
                       .set("code_52", FebResults.aggregate_max("code_52"))
                       .set("code_71", FebResults.aggregate_max("code_71"))
                       .set("code_72", FebResults.aggregate_max("code_72"))
                       .set("code_73", FebResults.aggregate_max("code_73"))
                       .set("code_74", FebResults.aggregate_max("code_74"))
                       .set("code_81", FebResults.aggregate_max("code_81"))
                       .set("code_82", FebResults.aggregate_max("code_82")) 
                       .set("code_90", FebResults.aggregate_max("code_90"))
                       .set("code_95", FebResults.aggregate_max("code_95"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_11", MarResults.aggregate_max("code_11"))
                       .set("code_12", MarResults.aggregate_max("code_12"))
                       .set("code_21", MarResults.aggregate_max("code_21"))
                       .set("code_22", MarResults.aggregate_max("code_22"))
                       .set("code_23", MarResults.aggregate_max("code_23"))
                       .set("code_24", MarResults.aggregate_max("code_24"))
                       .set("code_31", MarResults.aggregate_max("code_31"))
                       .set("code_41", MarResults.aggregate_max("code_41"))
                       .set("code_42", MarResults.aggregate_max("code_42"))
                       .set("code_43", MarResults.aggregate_max("code_43"))
                       .set("code_51", MarResults.aggregate_max("code_51"))
                       .set("code_52", MarResults.aggregate_max("code_52"))
                       .set("code_71", MarResults.aggregate_max("code_71"))
                       .set("code_72", MarResults.aggregate_max("code_72"))
                       .set("code_73", MarResults.aggregate_max("code_73"))
                       .set("code_74", MarResults.aggregate_max("code_74"))
                       .set("code_81", MarResults.aggregate_max("code_81"))
                       .set("code_82", MarResults.aggregate_max("code_82")) 
                       .set("code_90", MarResults.aggregate_max("code_90"))
                       .set("code_95", MarResults.aggregate_max("code_95"));
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_11", AprResults.aggregate_max("code_11"))
                       .set("code_12", AprResults.aggregate_max("code_12"))
                       .set("code_21", AprResults.aggregate_max("code_21"))
                       .set("code_22", AprResults.aggregate_max("code_22"))
                       .set("code_23", AprResults.aggregate_max("code_23"))
                       .set("code_24", AprResults.aggregate_max("code_24"))
                       .set("code_31", AprResults.aggregate_max("code_31"))
                       .set("code_41", AprResults.aggregate_max("code_41"))
                       .set("code_42", AprResults.aggregate_max("code_42"))
                       .set("code_43", AprResults.aggregate_max("code_43"))
                       .set("code_51", AprResults.aggregate_max("code_51"))
                       .set("code_52", AprResults.aggregate_max("code_52"))
                       .set("code_71", AprResults.aggregate_max("code_71"))
                       .set("code_72", AprResults.aggregate_max("code_72"))
                       .set("code_73", AprResults.aggregate_max("code_73"))
                       .set("code_74", AprResults.aggregate_max("code_74"))
                       .set("code_81", AprResults.aggregate_max("code_81"))
                       .set("code_82", AprResults.aggregate_max("code_82")) 
                       .set("code_90", AprResults.aggregate_max("code_90"))
                       .set("code_95", AprResults.aggregate_max("code_95"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_11", MayResults.aggregate_max("code_11"))
                       .set("code_12", MayResults.aggregate_max("code_12"))
                       .set("code_21", MayResults.aggregate_max("code_21"))
                       .set("code_22", MayResults.aggregate_max("code_22"))
                       .set("code_23", MayResults.aggregate_max("code_23"))
                       .set("code_24", MayResults.aggregate_max("code_24"))
                       .set("code_31", MayResults.aggregate_max("code_31"))
                       .set("code_41", MayResults.aggregate_max("code_41"))
                       .set("code_42", MayResults.aggregate_max("code_42"))
                       .set("code_43", MayResults.aggregate_max("code_43"))
                       .set("code_51", MayResults.aggregate_max("code_51"))
                       .set("code_52", MayResults.aggregate_max("code_52"))
                       .set("code_71", MayResults.aggregate_max("code_71"))
                       .set("code_72", MayResults.aggregate_max("code_72"))
                       .set("code_73", MayResults.aggregate_max("code_73"))
                       .set("code_74", MayResults.aggregate_max("code_74"))
                       .set("code_81", MayResults.aggregate_max("code_81"))
                       .set("code_82", MayResults.aggregate_max("code_82")) 
                       .set("code_90", MayResults.aggregate_max("code_90"))
                       .set("code_95", MayResults.aggregate_max("code_95")); 
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_11", JunResults.aggregate_max("code_11"))
                       .set("code_12", JunResults.aggregate_max("code_12"))
                       .set("code_21", JunResults.aggregate_max("code_21"))
                       .set("code_22", JunResults.aggregate_max("code_22"))
                       .set("code_23", JunResults.aggregate_max("code_23"))
                       .set("code_24", JunResults.aggregate_max("code_24"))
                       .set("code_31", JunResults.aggregate_max("code_31"))
                       .set("code_41", JunResults.aggregate_max("code_41"))
                       .set("code_42", JunResults.aggregate_max("code_42"))
                       .set("code_43", JunResults.aggregate_max("code_43"))
                       .set("code_51", JunResults.aggregate_max("code_51"))
                       .set("code_52", JunResults.aggregate_max("code_52"))
                       .set("code_71", JunResults.aggregate_max("code_71"))
                       .set("code_72", JunResults.aggregate_max("code_72"))
                       .set("code_73", JunResults.aggregate_max("code_73"))
                       .set("code_74", JunResults.aggregate_max("code_74"))
                       .set("code_81", JunResults.aggregate_max("code_81"))
                       .set("code_82", JunResults.aggregate_max("code_82")) 
                       .set("code_90", JunResults.aggregate_max("code_90"))
                       .set("code_95", JunResults.aggregate_max("code_95")); 
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_11", JlyResults.aggregate_max("code_11"))
                       .set("code_12", JlyResults.aggregate_max("code_12"))
                       .set("code_21", JlyResults.aggregate_max("code_21"))
                       .set("code_22", JlyResults.aggregate_max("code_22"))
                       .set("code_23", JlyResults.aggregate_max("code_23"))
                       .set("code_24", JlyResults.aggregate_max("code_24"))
                       .set("code_31", JlyResults.aggregate_max("code_31"))
                       .set("code_41", JlyResults.aggregate_max("code_41"))
                       .set("code_42", JlyResults.aggregate_max("code_42"))
                       .set("code_43", JlyResults.aggregate_max("code_43"))
                       .set("code_51", JlyResults.aggregate_max("code_51"))
                       .set("code_52", JlyResults.aggregate_max("code_52"))
                       .set("code_71", JlyResults.aggregate_max("code_71"))
                       .set("code_72", JlyResults.aggregate_max("code_72"))
                       .set("code_73", JlyResults.aggregate_max("code_73"))
                       .set("code_74", JlyResults.aggregate_max("code_74"))
                       .set("code_81", JlyResults.aggregate_max("code_81"))
                       .set("code_82", JlyResults.aggregate_max("code_82")) 
                       .set("code_90", JlyResults.aggregate_max("code_90"))
                       .set("code_95", JlyResults.aggregate_max("code_95"));  
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_11", AugResults.aggregate_max("code_11"))
                       .set("code_12", AugResults.aggregate_max("code_12"))
                       .set("code_21", AugResults.aggregate_max("code_21"))
                       .set("code_22", AugResults.aggregate_max("code_22"))
                       .set("code_23", AugResults.aggregate_max("code_23"))
                       .set("code_24", AugResults.aggregate_max("code_24"))
                       .set("code_31", AugResults.aggregate_max("code_31"))
                       .set("code_41", AugResults.aggregate_max("code_41"))
                       .set("code_42", AugResults.aggregate_max("code_42"))
                       .set("code_43", AugResults.aggregate_max("code_43"))
                       .set("code_51", AugResults.aggregate_max("code_51"))
                       .set("code_52", AugResults.aggregate_max("code_52"))
                       .set("code_71", AugResults.aggregate_max("code_71"))
                       .set("code_72", AugResults.aggregate_max("code_72"))
                       .set("code_73", AugResults.aggregate_max("code_73"))
                       .set("code_74", AugResults.aggregate_max("code_74"))
                       .set("code_81", AugResults.aggregate_max("code_81"))
                       .set("code_82", AugResults.aggregate_max("code_82")) 
                       .set("code_90", AugResults.aggregate_max("code_90"))
                       .set("code_95", AugResults.aggregate_max("code_95")); 
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_11", SepResults.aggregate_max("code_11"))
                       .set("code_12", SepResults.aggregate_max("code_12"))
                       .set("code_21", SepResults.aggregate_max("code_21"))
                       .set("code_22", SepResults.aggregate_max("code_22"))
                       .set("code_23", SepResults.aggregate_max("code_23"))
                       .set("code_24", SepResults.aggregate_max("code_24"))
                       .set("code_31", SepResults.aggregate_max("code_31"))
                       .set("code_41", SepResults.aggregate_max("code_41"))
                       .set("code_42", SepResults.aggregate_max("code_42"))
                       .set("code_43", SepResults.aggregate_max("code_43"))
                       .set("code_51", SepResults.aggregate_max("code_51"))
                       .set("code_52", SepResults.aggregate_max("code_52"))
                       .set("code_71", SepResults.aggregate_max("code_71"))
                       .set("code_72", SepResults.aggregate_max("code_72"))
                       .set("code_73", SepResults.aggregate_max("code_73"))
                       .set("code_74", SepResults.aggregate_max("code_74"))
                       .set("code_81", SepResults.aggregate_max("code_81"))
                       .set("code_82", SepResults.aggregate_max("code_82")) 
                       .set("code_90", SepResults.aggregate_max("code_90"))
                       .set("code_95", SepResults.aggregate_max("code_95")); 
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_11", OctResults.aggregate_max("code_11"))
                       .set("code_12", OctResults.aggregate_max("code_12"))
                       .set("code_21", OctResults.aggregate_max("code_21"))
                       .set("code_22", OctResults.aggregate_max("code_22"))
                       .set("code_23", OctResults.aggregate_max("code_23"))
                       .set("code_24", OctResults.aggregate_max("code_24"))
                       .set("code_31", OctResults.aggregate_max("code_31"))
                       .set("code_41", OctResults.aggregate_max("code_41"))
                       .set("code_42", OctResults.aggregate_max("code_42"))
                       .set("code_43", OctResults.aggregate_max("code_43"))
                       .set("code_51", OctResults.aggregate_max("code_51"))
                       .set("code_52", OctResults.aggregate_max("code_52"))
                       .set("code_71", OctResults.aggregate_max("code_71"))
                       .set("code_72", OctResults.aggregate_max("code_72"))
                       .set("code_73", OctResults.aggregate_max("code_73"))
                       .set("code_74", OctResults.aggregate_max("code_74"))
                       .set("code_81", OctResults.aggregate_max("code_81"))
                       .set("code_82", OctResults.aggregate_max("code_82")) 
                       .set("code_90", OctResults.aggregate_max("code_90"))
                       .set("code_95", OctResults.aggregate_max("code_95")); 
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_11", NovResults.aggregate_max("code_11"))
                       .set("code_12", NovResults.aggregate_max("code_12"))
                       .set("code_21", NovResults.aggregate_max("code_21"))
                       .set("code_22", NovResults.aggregate_max("code_22"))
                       .set("code_23", NovResults.aggregate_max("code_23"))
                       .set("code_24", NovResults.aggregate_max("code_24"))
                       .set("code_31", NovResults.aggregate_max("code_31"))
                       .set("code_41", NovResults.aggregate_max("code_41"))
                       .set("code_42", NovResults.aggregate_max("code_42"))
                       .set("code_43", NovResults.aggregate_max("code_43"))
                       .set("code_51", NovResults.aggregate_max("code_51"))
                       .set("code_52", NovResults.aggregate_max("code_52"))
                       .set("code_71", NovResults.aggregate_max("code_71"))
                       .set("code_72", NovResults.aggregate_max("code_72"))
                       .set("code_73", NovResults.aggregate_max("code_73"))
                       .set("code_74", NovResults.aggregate_max("code_74"))
                       .set("code_81", NovResults.aggregate_max("code_81"))
                       .set("code_82", NovResults.aggregate_max("code_82")) 
                       .set("code_90", NovResults.aggregate_max("code_90"))
                       .set("code_95", NovResults.aggregate_max("code_95"));   
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_11", DecResults.aggregate_max("code_11"))
                       .set("code_12", DecResults.aggregate_max("code_12"))
                       .set("code_21", DecResults.aggregate_max("code_21"))
                       .set("code_22", DecResults.aggregate_max("code_22"))
                       .set("code_23", DecResults.aggregate_max("code_23"))
                       .set("code_24", DecResults.aggregate_max("code_24"))
                       .set("code_31", DecResults.aggregate_max("code_31"))
                       .set("code_41", DecResults.aggregate_max("code_41"))
                       .set("code_42", DecResults.aggregate_max("code_42"))
                       .set("code_43", DecResults.aggregate_max("code_43"))
                       .set("code_51", DecResults.aggregate_max("code_51"))
                       .set("code_52", DecResults.aggregate_max("code_52"))
                       .set("code_71", DecResults.aggregate_max("code_71"))
                       .set("code_72", DecResults.aggregate_max("code_72"))
                       .set("code_73", DecResults.aggregate_max("code_73"))
                       .set("code_74", DecResults.aggregate_max("code_74"))
                       .set("code_81", DecResults.aggregate_max("code_81"))
                       .set("code_82", DecResults.aggregate_max("code_82")) 
                       .set("code_90", DecResults.aggregate_max("code_90"))
                       .set("code_95", DecResults.aggregate_max("code_95"));   
      } else if(LCvalue == "IGBP Land Cover") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_max("code_1"))
                       .set("code_2", JanResults.aggregate_max("code_2"))
                       .set("code_3", JanResults.aggregate_max("code_3"))
                       .set("code_4", JanResults.aggregate_max("code_4"))
                       .set("code_5", JanResults.aggregate_max("code_5"))
                       .set("code_6", JanResults.aggregate_max("code_6"))
                       .set("code_7", JanResults.aggregate_max("code_7"))
                       .set("code_8", JanResults.aggregate_max("code_8"))
                       .set("code_9", JanResults.aggregate_max("code_9"))
                       .set("code_10", JanResults.aggregate_max("code_10"))
                       .set("code_11", JanResults.aggregate_max("code_11"))
                       .set("code_12", JanResults.aggregate_max("code_12"))
                       .set("code_13", JanResults.aggregate_max("code_13"))
                       .set("code_14", JanResults.aggregate_max("code_14"))
                       .set("code_15", JanResults.aggregate_max("code_15"))
                       .set("code_16", JanResults.aggregate_max("code_16"))
                       .set("code_17", JanResults.aggregate_max("code_17"))
                       .set("code_254", JanResults.aggregate_max("code_254"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_max("code_1"))
                       .set("code_2", FebResults.aggregate_max("code_2"))
                       .set("code_3", FebResults.aggregate_max("code_3"))
                       .set("code_4", FebResults.aggregate_max("code_4"))
                       .set("code_5", FebResults.aggregate_max("code_5"))
                       .set("code_6", FebResults.aggregate_max("code_6"))
                       .set("code_7", FebResults.aggregate_max("code_7"))
                       .set("code_8", FebResults.aggregate_max("code_8"))
                       .set("code_9", FebResults.aggregate_max("code_9"))
                       .set("code_10", FebResults.aggregate_max("code_10"))
                       .set("code_11", FebResults.aggregate_max("code_11"))
                       .set("code_12", FebResults.aggregate_max("code_12"))
                       .set("code_13", FebResults.aggregate_max("code_13"))
                       .set("code_14", FebResults.aggregate_max("code_14"))
                       .set("code_15", FebResults.aggregate_max("code_15"))
                       .set("code_16", FebResults.aggregate_max("code_16"))
                       .set("code_17", FebResults.aggregate_max("code_17"))
                       .set("code_254", FebResults.aggregate_max("code_254"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_max("code_1"))
                       .set("code_2", MarResults.aggregate_max("code_2"))
                       .set("code_3", MarResults.aggregate_max("code_3"))
                       .set("code_4", MarResults.aggregate_max("code_4"))
                       .set("code_5", MarResults.aggregate_max("code_5"))
                       .set("code_6", MarResults.aggregate_max("code_6"))
                       .set("code_7", MarResults.aggregate_max("code_7"))
                       .set("code_8", MarResults.aggregate_max("code_8"))
                       .set("code_9", MarResults.aggregate_max("code_9"))
                       .set("code_10", MarResults.aggregate_max("code_10"))
                       .set("code_11", MarResults.aggregate_max("code_11"))
                       .set("code_12", MarResults.aggregate_max("code_12"))
                       .set("code_13", MarResults.aggregate_max("code_13"))
                       .set("code_14", MarResults.aggregate_max("code_14"))
                       .set("code_15", MarResults.aggregate_max("code_15"))
                       .set("code_16", MarResults.aggregate_max("code_16"))
                       .set("code_17", MarResults.aggregate_max("code_17"))
                       .set("code_254", MarResults.aggregate_max("code_254"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_max("code_1"))
                       .set("code_2", AprResults.aggregate_max("code_2"))
                       .set("code_3", AprResults.aggregate_max("code_3"))
                       .set("code_4", AprResults.aggregate_max("code_4"))
                       .set("code_5", AprResults.aggregate_max("code_5"))
                       .set("code_6", AprResults.aggregate_max("code_6"))
                       .set("code_7", AprResults.aggregate_max("code_7"))
                       .set("code_8", AprResults.aggregate_max("code_8"))
                       .set("code_9", AprResults.aggregate_max("code_9"))
                       .set("code_10", AprResults.aggregate_max("code_10"))
                       .set("code_11", AprResults.aggregate_max("code_11"))
                       .set("code_12", AprResults.aggregate_max("code_12"))
                       .set("code_13", AprResults.aggregate_max("code_13"))
                       .set("code_14", AprResults.aggregate_max("code_14"))
                       .set("code_15", AprResults.aggregate_max("code_15"))
                       .set("code_16", AprResults.aggregate_max("code_16"))
                       .set("code_17", AprResults.aggregate_max("code_17"))
                       .set("code_254", AprResults.aggregate_max("code_254"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_max("code_1"))
                       .set("code_2", MayResults.aggregate_max("code_2"))
                       .set("code_3", MayResults.aggregate_max("code_3"))
                       .set("code_4", MayResults.aggregate_max("code_4"))
                       .set("code_5", MayResults.aggregate_max("code_5"))
                       .set("code_6", MayResults.aggregate_max("code_6"))
                       .set("code_7", MayResults.aggregate_max("code_7"))
                       .set("code_8", MayResults.aggregate_max("code_8"))
                       .set("code_9", MayResults.aggregate_max("code_9"))
                       .set("code_10", MayResults.aggregate_max("code_10"))
                       .set("code_11", MayResults.aggregate_max("code_11"))
                       .set("code_12", MayResults.aggregate_max("code_12"))
                       .set("code_13", MayResults.aggregate_max("code_13"))
                       .set("code_14", MayResults.aggregate_max("code_14"))
                       .set("code_15", MayResults.aggregate_max("code_15"))
                       .set("code_16", MayResults.aggregate_max("code_16"))
                       .set("code_17", MayResults.aggregate_max("code_17"))
                       .set("code_254", MayResults.aggregate_max("code_254"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_max("code_1"))
                       .set("code_2", JunResults.aggregate_max("code_2"))
                       .set("code_3", JunResults.aggregate_max("code_3"))
                       .set("code_4", JunResults.aggregate_max("code_4"))
                       .set("code_5", JunResults.aggregate_max("code_5"))
                       .set("code_6", JunResults.aggregate_max("code_6"))
                       .set("code_7", JunResults.aggregate_max("code_7"))
                       .set("code_8", JunResults.aggregate_max("code_8"))
                       .set("code_9", JunResults.aggregate_max("code_9"))
                       .set("code_10", JunResults.aggregate_max("code_10"))
                       .set("code_11", JunResults.aggregate_max("code_11"))
                       .set("code_12", JunResults.aggregate_max("code_12"))
                       .set("code_13", JunResults.aggregate_max("code_13"))
                       .set("code_14", JunResults.aggregate_max("code_14"))
                       .set("code_15", JunResults.aggregate_max("code_15"))
                       .set("code_16", JunResults.aggregate_max("code_16"))
                       .set("code_17", JunResults.aggregate_max("code_17"))
                       .set("code_254", JunResults.aggregate_max("code_254"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_max("code_1"))
                       .set("code_2", JlyResults.aggregate_max("code_2"))
                       .set("code_3", JlyResults.aggregate_max("code_3"))
                       .set("code_4", JlyResults.aggregate_max("code_4"))
                       .set("code_5", JlyResults.aggregate_max("code_5"))
                       .set("code_6", JlyResults.aggregate_max("code_6"))
                       .set("code_7", JlyResults.aggregate_max("code_7"))
                       .set("code_8", JlyResults.aggregate_max("code_8"))
                       .set("code_9", JlyResults.aggregate_max("code_9"))
                       .set("code_10", JlyResults.aggregate_max("code_10"))
                       .set("code_11", JlyResults.aggregate_max("code_11"))
                       .set("code_12", JlyResults.aggregate_max("code_12"))
                       .set("code_13", JlyResults.aggregate_max("code_13"))
                       .set("code_14", JlyResults.aggregate_max("code_14"))
                       .set("code_15", JlyResults.aggregate_max("code_15"))
                       .set("code_16", JlyResults.aggregate_max("code_16"))
                       .set("code_17", JlyResults.aggregate_max("code_17"))
                       .set("code_254", JlyResults.aggregate_max("code_254"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_max("code_1"))
                       .set("code_2", AugResults.aggregate_max("code_2"))
                       .set("code_3", AugResults.aggregate_max("code_3"))
                       .set("code_4", AugResults.aggregate_max("code_4"))
                       .set("code_5", AugResults.aggregate_max("code_5"))
                       .set("code_6", AugResults.aggregate_max("code_6"))
                       .set("code_7", AugResults.aggregate_max("code_7"))
                       .set("code_8", AugResults.aggregate_max("code_8"))
                       .set("code_9", AugResults.aggregate_max("code_9"))
                       .set("code_10", AugResults.aggregate_max("code_10"))
                       .set("code_11", AugResults.aggregate_max("code_11"))
                       .set("code_12", AugResults.aggregate_max("code_12"))
                       .set("code_13", AugResults.aggregate_max("code_13"))
                       .set("code_14", AugResults.aggregate_max("code_14"))
                       .set("code_15", AugResults.aggregate_max("code_15"))
                       .set("code_16", AugResults.aggregate_max("code_16"))
                       .set("code_17", AugResults.aggregate_max("code_17"))
                       .set("code_254", AugResults.aggregate_max("code_254"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_max("code_1"))
                       .set("code_2", SepResults.aggregate_max("code_2"))
                       .set("code_3", SepResults.aggregate_max("code_3"))
                       .set("code_4", SepResults.aggregate_max("code_4"))
                       .set("code_5", SepResults.aggregate_max("code_5"))
                       .set("code_6", SepResults.aggregate_max("code_6"))
                       .set("code_7", SepResults.aggregate_max("code_7"))
                       .set("code_8", SepResults.aggregate_max("code_8"))
                       .set("code_9", SepResults.aggregate_max("code_9"))
                       .set("code_10", SepResults.aggregate_max("code_10"))
                       .set("code_11", SepResults.aggregate_max("code_11"))
                       .set("code_12", SepResults.aggregate_max("code_12"))
                       .set("code_13", SepResults.aggregate_max("code_13"))
                       .set("code_14", SepResults.aggregate_max("code_14"))
                       .set("code_15", SepResults.aggregate_max("code_15"))
                       .set("code_16", SepResults.aggregate_max("code_16"))
                       .set("code_17", SepResults.aggregate_max("code_17"))
                       .set("code_254", SepResults.aggregate_max("code_254"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_max("code_1"))
                       .set("code_2", OctResults.aggregate_max("code_2"))
                       .set("code_3", OctResults.aggregate_max("code_3"))
                       .set("code_4", OctResults.aggregate_max("code_4"))
                       .set("code_5", OctResults.aggregate_max("code_5"))
                       .set("code_6", OctResults.aggregate_max("code_6"))
                       .set("code_7", OctResults.aggregate_max("code_7"))
                       .set("code_8", OctResults.aggregate_max("code_8"))
                       .set("code_9", OctResults.aggregate_max("code_9"))
                       .set("code_10", OctResults.aggregate_max("code_10"))
                       .set("code_11", OctResults.aggregate_max("code_11"))
                       .set("code_12", OctResults.aggregate_max("code_12"))
                       .set("code_13", OctResults.aggregate_max("code_13"))
                       .set("code_14", OctResults.aggregate_max("code_14"))
                       .set("code_15", OctResults.aggregate_max("code_15"))
                       .set("code_16", OctResults.aggregate_max("code_16"))
                       .set("code_17", OctResults.aggregate_max("code_17"))
                       .set("code_254", OctResults.aggregate_max("code_254"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_max("code_1"))
                       .set("code_2", NovResults.aggregate_max("code_2"))
                       .set("code_3", NovResults.aggregate_max("code_3"))
                       .set("code_4", NovResults.aggregate_max("code_4"))
                       .set("code_5", NovResults.aggregate_max("code_5"))
                       .set("code_6", NovResults.aggregate_max("code_6"))
                       .set("code_7", NovResults.aggregate_max("code_7"))
                       .set("code_8", NovResults.aggregate_max("code_8"))
                       .set("code_9", NovResults.aggregate_max("code_9"))
                       .set("code_10", NovResults.aggregate_max("code_10"))
                       .set("code_11", NovResults.aggregate_max("code_11"))
                       .set("code_12", NovResults.aggregate_max("code_12"))
                       .set("code_13", NovResults.aggregate_max("code_13"))
                       .set("code_14", NovResults.aggregate_max("code_14"))
                       .set("code_15", NovResults.aggregate_max("code_15"))
                       .set("code_16", NovResults.aggregate_max("code_16"))
                       .set("code_17", NovResults.aggregate_max("code_17"))
                       .set("code_254", NovResults.aggregate_max("code_254"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_max("code_1"))
                       .set("code_2", DecResults.aggregate_max("code_2"))
                       .set("code_3", DecResults.aggregate_max("code_3"))
                       .set("code_4", DecResults.aggregate_max("code_4"))
                       .set("code_5", DecResults.aggregate_max("code_5"))
                       .set("code_6", DecResults.aggregate_max("code_6"))
                       .set("code_7", DecResults.aggregate_max("code_7"))
                       .set("code_8", DecResults.aggregate_max("code_8"))
                       .set("code_9", DecResults.aggregate_max("code_9"))
                       .set("code_10", DecResults.aggregate_max("code_10"))
                       .set("code_11", DecResults.aggregate_max("code_11"))
                       .set("code_12", DecResults.aggregate_max("code_12"))
                       .set("code_13", DecResults.aggregate_max("code_13"))
                       .set("code_14", DecResults.aggregate_max("code_14"))
                       .set("code_15", DecResults.aggregate_max("code_15"))
                       .set("code_16", DecResults.aggregate_max("code_16"))
                       .set("code_17", DecResults.aggregate_max("code_17"))
                       .set("code_254", DecResults.aggregate_max("code_254"));
      } else if(LCvalue == "UMD Land Cover") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_max("code_1"))
                       .set("code_2", JanResults.aggregate_max("code_2"))
                       .set("code_3", JanResults.aggregate_max("code_3"))
                       .set("code_4", JanResults.aggregate_max("code_4"))
                       .set("code_5", JanResults.aggregate_max("code_5"))
                       .set("code_6", JanResults.aggregate_max("code_6"))
                       .set("code_7", JanResults.aggregate_max("code_7"))
                       .set("code_8", JanResults.aggregate_max("code_8"))
                       .set("code_9", JanResults.aggregate_max("code_9"))
                       .set("code_10", JanResults.aggregate_max("code_10"))
                       .set("code_11", JanResults.aggregate_max("code_11"))
                       .set("code_12", JanResults.aggregate_max("code_12"))
                       .set("code_13", JanResults.aggregate_max("code_13"))
                       .set("code_14", JanResults.aggregate_max("code_14"))
                       .set("code_15", JanResults.aggregate_max("code_15"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_max("code_1"))
                       .set("code_2", FebResults.aggregate_max("code_2"))
                       .set("code_3", FebResults.aggregate_max("code_3"))
                       .set("code_4", FebResults.aggregate_max("code_4"))
                       .set("code_5", FebResults.aggregate_max("code_5"))
                       .set("code_6", FebResults.aggregate_max("code_6"))
                       .set("code_7", FebResults.aggregate_max("code_7"))
                       .set("code_8", FebResults.aggregate_max("code_8"))
                       .set("code_9", FebResults.aggregate_max("code_9"))
                       .set("code_10", FebResults.aggregate_max("code_10"))
                       .set("code_11", FebResults.aggregate_max("code_11"))
                       .set("code_12", FebResults.aggregate_max("code_12"))
                       .set("code_13", FebResults.aggregate_max("code_13"))
                       .set("code_14", FebResults.aggregate_max("code_14"))
                       .set("code_15", FebResults.aggregate_max("code_15"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_max("code_1"))
                       .set("code_2", MarResults.aggregate_max("code_2"))
                       .set("code_3", MarResults.aggregate_max("code_3"))
                       .set("code_4", MarResults.aggregate_max("code_4"))
                       .set("code_5", MarResults.aggregate_max("code_5"))
                       .set("code_6", MarResults.aggregate_max("code_6"))
                       .set("code_7", MarResults.aggregate_max("code_7"))
                       .set("code_8", MarResults.aggregate_max("code_8"))
                       .set("code_9", MarResults.aggregate_max("code_9"))
                       .set("code_10", MarResults.aggregate_max("code_10"))
                       .set("code_11", MarResults.aggregate_max("code_11"))
                       .set("code_12", MarResults.aggregate_max("code_12"))
                       .set("code_13", MarResults.aggregate_max("code_13"))
                       .set("code_14", MarResults.aggregate_max("code_14"))
                       .set("code_15", MarResults.aggregate_max("code_15"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_max("code_1"))
                       .set("code_2", AprResults.aggregate_max("code_2"))
                       .set("code_3", AprResults.aggregate_max("code_3"))
                       .set("code_4", AprResults.aggregate_max("code_4"))
                       .set("code_5", AprResults.aggregate_max("code_5"))
                       .set("code_6", AprResults.aggregate_max("code_6"))
                       .set("code_7", AprResults.aggregate_max("code_7"))
                       .set("code_8", AprResults.aggregate_max("code_8"))
                       .set("code_9", AprResults.aggregate_max("code_9"))
                       .set("code_10", AprResults.aggregate_max("code_10"))
                       .set("code_11", AprResults.aggregate_max("code_11"))
                       .set("code_12", AprResults.aggregate_max("code_12"))
                       .set("code_13", AprResults.aggregate_max("code_13"))
                       .set("code_14", AprResults.aggregate_max("code_14"))
                       .set("code_15", AprResults.aggregate_max("code_15"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_max("code_1"))
                       .set("code_2", MayResults.aggregate_max("code_2"))
                       .set("code_3", MayResults.aggregate_max("code_3"))
                       .set("code_4", MayResults.aggregate_max("code_4"))
                       .set("code_5", MayResults.aggregate_max("code_5"))
                       .set("code_6", MayResults.aggregate_max("code_6"))
                       .set("code_7", MayResults.aggregate_max("code_7"))
                       .set("code_8", MayResults.aggregate_max("code_8"))
                       .set("code_9", MayResults.aggregate_max("code_9"))
                       .set("code_10", MayResults.aggregate_max("code_10"))
                       .set("code_11", MayResults.aggregate_max("code_11"))
                       .set("code_12", MayResults.aggregate_max("code_12"))
                       .set("code_13", MayResults.aggregate_max("code_13"))
                       .set("code_14", MayResults.aggregate_max("code_14"))
                       .set("code_15", MayResults.aggregate_max("code_15"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_max("code_1"))
                       .set("code_2", JunResults.aggregate_max("code_2"))
                       .set("code_3", JunResults.aggregate_max("code_3"))
                       .set("code_4", JunResults.aggregate_max("code_4"))
                       .set("code_5", JunResults.aggregate_max("code_5"))
                       .set("code_6", JunResults.aggregate_max("code_6"))
                       .set("code_7", JunResults.aggregate_max("code_7"))
                       .set("code_8", JunResults.aggregate_max("code_8"))
                       .set("code_9", JunResults.aggregate_max("code_9"))
                       .set("code_10", JunResults.aggregate_max("code_10"))
                       .set("code_11", JunResults.aggregate_max("code_11"))
                       .set("code_12", JunResults.aggregate_max("code_12"))
                       .set("code_13", JunResults.aggregate_max("code_13"))
                       .set("code_14", JunResults.aggregate_max("code_14"))
                       .set("code_15", JunResults.aggregate_max("code_15"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_max("code_1"))
                       .set("code_2", JlyResults.aggregate_max("code_2"))
                       .set("code_3", JlyResults.aggregate_max("code_3"))
                       .set("code_4", JlyResults.aggregate_max("code_4"))
                       .set("code_5", JlyResults.aggregate_max("code_5"))
                       .set("code_6", JlyResults.aggregate_max("code_6"))
                       .set("code_7", JlyResults.aggregate_max("code_7"))
                       .set("code_8", JlyResults.aggregate_max("code_8"))
                       .set("code_9", JlyResults.aggregate_max("code_9"))
                       .set("code_10", JlyResults.aggregate_max("code_10"))
                       .set("code_11", JlyResults.aggregate_max("code_11"))
                       .set("code_12", JlyResults.aggregate_max("code_12"))
                       .set("code_13", JlyResults.aggregate_max("code_13"))
                       .set("code_14", JlyResults.aggregate_max("code_14"))
                       .set("code_15", JlyResults.aggregate_max("code_15"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_max("code_1"))
                       .set("code_2", AugResults.aggregate_max("code_2"))
                       .set("code_3", AugResults.aggregate_max("code_3"))
                       .set("code_4", AugResults.aggregate_max("code_4"))
                       .set("code_5", AugResults.aggregate_max("code_5"))
                       .set("code_6", AugResults.aggregate_max("code_6"))
                       .set("code_7", AugResults.aggregate_max("code_7"))
                       .set("code_8", AugResults.aggregate_max("code_8"))
                       .set("code_9", AugResults.aggregate_max("code_9"))
                       .set("code_10", AugResults.aggregate_max("code_10"))
                       .set("code_11", AugResults.aggregate_max("code_11"))
                       .set("code_12", AugResults.aggregate_max("code_12"))
                       .set("code_13", AugResults.aggregate_max("code_13"))
                       .set("code_14", AugResults.aggregate_max("code_14"))
                       .set("code_15", AugResults.aggregate_max("code_15"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_max("code_1"))
                       .set("code_2", SepResults.aggregate_max("code_2"))
                       .set("code_3", SepResults.aggregate_max("code_3"))
                       .set("code_4", SepResults.aggregate_max("code_4"))
                       .set("code_5", SepResults.aggregate_max("code_5"))
                       .set("code_6", SepResults.aggregate_max("code_6"))
                       .set("code_7", SepResults.aggregate_max("code_7"))
                       .set("code_8", SepResults.aggregate_max("code_8"))
                       .set("code_9", SepResults.aggregate_max("code_9"))
                       .set("code_10", SepResults.aggregate_max("code_10"))
                       .set("code_11", SepResults.aggregate_max("code_11"))
                       .set("code_12", SepResults.aggregate_max("code_12"))
                       .set("code_13", SepResults.aggregate_max("code_13"))
                       .set("code_14", SepResults.aggregate_max("code_14"))
                       .set("code_15", SepResults.aggregate_max("code_15"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_max("code_1"))
                       .set("code_2", OctResults.aggregate_max("code_2"))
                       .set("code_3", OctResults.aggregate_max("code_3"))
                       .set("code_4", OctResults.aggregate_max("code_4"))
                       .set("code_5", OctResults.aggregate_max("code_5"))
                       .set("code_6", OctResults.aggregate_max("code_6"))
                       .set("code_7", OctResults.aggregate_max("code_7"))
                       .set("code_8", OctResults.aggregate_max("code_8"))
                       .set("code_9", OctResults.aggregate_max("code_9"))
                       .set("code_10", OctResults.aggregate_max("code_10"))
                       .set("code_11", OctResults.aggregate_max("code_11"))
                       .set("code_12", OctResults.aggregate_max("code_12"))
                       .set("code_13", OctResults.aggregate_max("code_13"))
                       .set("code_14", OctResults.aggregate_max("code_14"))
                       .set("code_15", OctResults.aggregate_max("code_15"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_max("code_1"))
                       .set("code_2", NovResults.aggregate_max("code_2"))
                       .set("code_3", NovResults.aggregate_max("code_3"))
                       .set("code_4", NovResults.aggregate_max("code_4"))
                       .set("code_5", NovResults.aggregate_max("code_5"))
                       .set("code_6", NovResults.aggregate_max("code_6"))
                       .set("code_7", NovResults.aggregate_max("code_7"))
                       .set("code_8", NovResults.aggregate_max("code_8"))
                       .set("code_9", NovResults.aggregate_max("code_9"))
                       .set("code_10", NovResults.aggregate_max("code_10"))
                       .set("code_11", NovResults.aggregate_max("code_11"))
                       .set("code_12", NovResults.aggregate_max("code_12"))
                       .set("code_13", NovResults.aggregate_max("code_13"))
                       .set("code_14", NovResults.aggregate_max("code_14"))
                       .set("code_15", NovResults.aggregate_max("code_15"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_max("code_1"))
                       .set("code_2", DecResults.aggregate_max("code_2"))
                       .set("code_3", DecResults.aggregate_max("code_3"))
                       .set("code_4", DecResults.aggregate_max("code_4"))
                       .set("code_5", DecResults.aggregate_max("code_5"))
                       .set("code_6", DecResults.aggregate_max("code_6"))
                       .set("code_7", DecResults.aggregate_max("code_7"))
                       .set("code_8", DecResults.aggregate_max("code_8"))
                       .set("code_9", DecResults.aggregate_max("code_9"))
                       .set("code_10", DecResults.aggregate_max("code_10"))
                       .set("code_11", DecResults.aggregate_max("code_11"))
                       .set("code_12", DecResults.aggregate_max("code_12"))
                       .set("code_13", DecResults.aggregate_max("code_13"))
                       .set("code_14", DecResults.aggregate_max("code_14"))
                       .set("code_15", DecResults.aggregate_max("code_15"));
      } else if(LCvalue == "None") {
        janFeature = ee.Feature(null, {})
                       .set("Month", "January")
                       .set("code_1", JanResults.aggregate_max("code_1"));    
        febFeature = ee.Feature(null, {})
                       .set("Month", "February")
                       .set("code_1", FebResults.aggregate_max("code_1"));
        marFeature = ee.Feature(null, {})
                       .set("Month", "March")
                       .set("code_1", MarResults.aggregate_max("code_1"));    
        aprFeature = ee.Feature(null, {})
                       .set("Month", "April")
                       .set("code_1", AprResults.aggregate_max("code_1"));
        mayFeature = ee.Feature(null, {})
                       .set("Month", "May")
                       .set("code_1", MayResults.aggregate_max("code_1"));    
        junFeature = ee.Feature(null, {})
                       .set("Month", "June")
                       .set("code_1", JunResults.aggregate_max("code_1"));
        jlyFeature = ee.Feature(null, {})
                       .set("Month", "July")
                       .set("code_1", JlyResults.aggregate_max("code_1"));    
        augFeature = ee.Feature(null, {})
                       .set("Month", "August")
                       .set("code_1", AugResults.aggregate_max("code_1"));
        sepFeature = ee.Feature(null, {})
                       .set("Month", "September")
                       .set("code_1", SepResults.aggregate_max("code_1"));    
        octFeature = ee.Feature(null, {})
                       .set("Month", "October")
                       .set("code_1", OctResults.aggregate_max("code_1"));
        novFeature = ee.Feature(null, {})
                       .set("Month", "November")
                       .set("code_1", NovResults.aggregate_max("code_1"));    
        decFeature = ee.Feature(null, {})
                       .set("Month", "December")
                       .set("code_1", DecResults.aggregate_max("code_1"));
      }
    }
    var summeryCollection = ee.FeatureCollection([novFeature, decFeature, janFeature, febFeature, marFeature, aprFeature, mayFeature, junFeature, jlyFeature, augFeature, sepFeature, octFeature]);
    var SummeryChart = ui.Chart.feature.byFeature(summeryCollection, "Month");
    SummeryChart.setChartType("LineChart");
    SummeryChart.setSeriesNames(TableNames);
    SummeryChart.setOptions({
      title: "Monthly aggregate",
      vAxis: {title: units},
      hAxis: {title: "Month"}
    });
    SummeryChart.style().set({stretch: "both"});
    SummeryChart.onClick(function(xValue, yValue, seriesName) {
      if (!xValue) return;  // Selection was cleared.
      var range = null;
      var VarSelectValue = app.USLegend.VarSelect.getValue();
      var TableSelectValue = app.USLegend.TableSelect.getValue();
      var MonthlySummeryStat = app.USLegend.TableSelect.getValue();
      var TimeSelectValue = app.USLegend.TimeSeriesSelect.getValue();
      if (xValue == "January") { 
        range = 1;
      } else if (xValue == "February") { 
        range = 2;
      } else if (xValue == "March") { 
        range = 3;
      } else if (xValue == "April") { 
        range = 4;
      } else if (xValue == "May") { 
        range = 5;
      } else if (xValue == "June") { 
        range = 6;
      } else if (xValue == "July") { 
        range = 7;
      } else if (xValue == "August") { 
        range = 8;
      } else if (xValue == "September") { 
        range = 9;
      } else if (xValue == "October") { 
        range = 10;
      } else if (xValue == "November") { 
        range = 11;
      } else if (xValue == "December") { 
        range = 12;
      }
      var SubsetData = ee.ImageCollection(app.MODDef).filter(ee.Filter.calendarRange(range, range, "month")).select(VarSelectValue + "_" + TimeSelectValue);
      var image = null;
      var stringSeperator = null;
      if (TableSelectValue == "min") {
        image = SubsetData.reduce(ee.Reducer.min());
        stringSeperator =  VarSelectValue + "_" + TimeSelectValue + "_min";
      } else if (TableSelectValue == "mean") {
        image = SubsetData.reduce(ee.Reducer.mean());
        stringSeperator =  VarSelectValue + "_" + TimeSelectValue + "_mean";
      } else if (TableSelectValue == "max") {
        image = SubsetData.reduce(ee.Reducer.max());
        stringSeperator =  VarSelectValue + "_" + TimeSelectValue + "_max";
      }
      if(TimeSelectValue == "Top 5 Percent") {
        TimeSelectValue = "mean";
      }
      if(VarSelectValue == "K") {
        app.MainMap.layers().set(3, ui.Map.Layer(image.select(stringSeperator), {min: 0.0, max: 1,palette: ['d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850']}, "MyData"));
      } else if(VarSelectValue == "ET") {
        app.MainMap.layers().set(3, ui.Map.Layer(image.select(stringSeperator), {min: 0.0, max: 300.0,palette: ['ffffff','fcd163','99b718','66a000','3e8601','207401','056201','004c00','011301']}, "MyData"));
      } else if(VarSelectValue == "Gpp") {  
        app.MainMap.layers().set(3, ui.Map.Layer(image.select(stringSeperator), {min: 0.0, max: 100,palette: ['ffffff','fcd163','99b718','66a000','3e8601','207401','056201','004c00','011301']}, "MyData"));
      } else if(VarSelectValue == "LE") {   
        app.MainMap.layers().set(3, ui.Map.Layer(image.select(stringSeperator), {min: 0.0, max: 1,palette: ['ffffcc','ffeda0','fed976','feb24c','fd8d3c','fc4e2a','e31a1c','bd0026','800026']}, "MyData"));
      } else if(VarSelectValue == "PLE") {   
        app.MainMap.layers().set(3, ui.Map.Layer(image.select(stringSeperator), {min: 0.0, max: 100,palette: ['ffffff','fcd163','99b718','66a000','3e8601','207401','056201','004c00','011301']}, "MyData"));
      } else if(VarSelectValue == "PET") {   
        app.MainMap.layers().set(3, ui.Map.Layer(image.select(stringSeperator), {min: 0.0, max: 100,palette: ['ffffff','fcd163','99b718','66a000','3e8601','207401','056201','004c00','011301']}, "MyData"));
      } else if(VarSelectValue == "WUE") {  
        app.MainMap.layers().set(3, ui.Map.Layer(image.select(stringSeperator), {min: 0.0, max: 1,palette: ['d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850']}, "MyData"));
      }
    });
    // return ui.Panel([yearlyTimeSeries, TotalMonthlyChart, SummeryChart], ui.Panel.Layout.Flow("vertical"));
    app.TimeseriesResults.add(ui.Panel([TotalMonthlyChart, SummeryChart], ui.Panel.Layout.Flow("vertical")))
                         .add(app.buttonPanel);
  };
  // fires off a chain of functions to return the chart panels
  app.MapClickEvent = function(coords) {
    app.TimeseriesResults.clear();
    app.selectedPoints.push([coords.lon, coords.lat]);
    app.makeChartData(app.getSelectedFeatures());
    app.makeCharts();
  };
  app.OpacitySlide = function(OslideValue) {
    app.MainMap.layers().get(app.currentIndex).setOpacity(OslideValue);
  };
  app.nextFrame = function() {
    var index = app.currentIndex + 1;
    if(index > app.USLegend.ImageAnimate) {
      index = 1;
    }
    app.animation.IndexSlider.setValue(index);
    if(app.play) {ui.util.setTimeout(app.nextFrame, app.timeStep);}
  };
  app.showLayer = function(index) { 
    var opValue =  app.animation.OpSlider.getValue();
    app.MainMap.layers().get(app.currentIndex).setOpacity(0);
    app.MainMap.layers().get(index).setOpacity(opValue);
    app.currentIndex = index;
    app.animation.IndexSliderImageName.setValue(app.MainMap.layers().get(index).getName());
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
  // Updates the chart using the currently-selected charting function,
  app.updateChart = function() {
    app.TimeseriesResults.clear();
    var chart = app.makeChartData(app.getSelectedFeatures());
    app.TimeseriesResults.add(chart)
                         .add(app.buttonPanel);
  };
  // Clears the set of selected points and resets the overlay and results panel to their default state.
  app.clearResults = function() {
    app.selectedPoints = [];
    // remove the selectedFeatures Item
    app.MainMap.layers().remove(app.MainMap.layers().get(app.MainMap.layers().length()));
    var instructionsLabel = ui.Label("Awaiting input");
    app.TimeseriesResults.widgets().reset([instructionsLabel]);
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
  app.ExportImage = function() {
    var TimeSelectValue = app.USLegend.TimeSeriesSelect.getValue();
    if(TimeSelectValue == "Top 5 Percent") {
      TimeSelectValue = "mean";
    }
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    var AGUnitSelectValue = app.USLegend.AGUnitSelect.getValue();
    var stringSeperator =  VarSelectValue + "_" + TimeSelectValue;
    var SpaceSelectValue = app.USLegend.SpaceSelect.getValue();
    var LCtoUse = "LandCover";
    app.chartData = null;
    var results;
    var resultsScale;
    var myPointPoly;
    if(VarSelectValue == "Landcover") {
      stringSeperator = "constant" + "_" + TimeSelectValue;
    }
    var index = app.animation.IndexSlider.getValue();
    // shoulld test if 4 is null, if not, export 0 (lc), if so, export 4 
    ee.Algorithms.If(index===null,index=3,index=index);
    // print(ee.Image(app.MainMap.layers().get(index).getEeObject()))
    Export.image.toDrive({
      image: ee.Image(app.MainMap.layers().get(index).getEeObject()),//.select(stringSeperator),
      region: app.myPointPoly,
      description: app.USLegend.NameLabel.getValue()
    });
  };
  app.ExportVideo = function() {
    var vis;
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    var TimeSelectValue = app.USLegend.TimeSeriesSelect.getValue();
    if(TimeSelectValue == "Top 5 Percent") {
      TimeSelectValue = "mean";
    }
    var stringSeperator =  VarSelectValue + "_" + TimeSelectValue;
    if(VarSelectValue == "Landcover") {
      stringSeperator = "constant" + "_" + TimeSelectValue;
    }
    if(VarSelectValue == "K") {
      vis = app.Kvis;
    } else if(VarSelectValue == "ET") {
      vis = app.ETvis;
    } else if(VarSelectValue == "Gpp") {  
      vis = app.Gppvis;
    } else if(VarSelectValue == "LE") {   
      vis = app.LEvis;
    } else if(VarSelectValue == "PLE") {   
      vis = app.PLEvis;
    } else if(VarSelectValue == "PET") {   
      vis = app.PETvis;
    } else if(VarSelectValue == "WUE") {  
      vis = app.WUEvis;
    }
    app.timeStep = parseInt(app.animation.TimestepValue.getValue(),10);
    var exportCollection = app.ANIMATEDimages.map(function(image) {
      return ee.Image(image).visualize({bands:stringSeperator, min:vis.min, max:vis.max, palette:vis.Palette, forceRgbOutput:true});
    });
    var fps = app.timeStep/1000;
    Export.video.toDrive({
      collection: exportCollection, 
      description: app.USLegend.NameLabel.getValue(),
      framesPerSecond: fps, 
      // dimensions: 1280, 
      region:app.myPointPoly.geometry().convexHull(), 
      scale: 500, 
      maxPixels: 1e13 
    });
  };
};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    legendPrimePanel: ui.Panel([
      ui.Label({
        value: "TEAM", 
        style: {fontWeight: "bold", fontSize: "18px", margin: "0 0 4px 0", padding: "0"}
      }),
      ui.Label({
        value: "Welcome to the TEAM application (Temporal Evapotranspiration Aggregation Method). Visually explore, subset, aggregate, and export common ET metrics using a combination of MOD16A2, " +
        "MOD17A2H, MCD12Q1 (V006), and NLCD.  Please be patient, you are working with big data and none of this is pre-computed.  Thanks to the" +
        " Google Earth Engine team for the fantastic platform.",
       style: {fontWeight: "normal", fontSize: "12px", maxWidth: "600px", margin: "0 0 4px 0", padding: "0", whiteSpace:'pre-wrap', textAlign:'justify'}
      }),
      ui.Label({
        value: "App troubleshooting tips: Click again in the same polygon (multiple times to catch cached results)> Clear the chart > Refresh" +
        " the browser > Pick a smaller area and if you have questions feel free to email jcoll@ku.edu",
        style: {fontWeight: "normal", fontSize: "12px", maxWidth: "600px", margin: "0 0 4px 0", padding: "0", whiteSpace:'pre-wrap', textAlign:'justify'}
      }),
      ui.Label({
        value: "See the paper published in xxx.", 
        style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
      }).setUrl("https://www.hydroshare.org/resource/7f43d1ff46d4403495427c59c0e1d790/")
    ])
  }; 
  app.LCLegend = {
    LCSelectLable: ui.Label({value: "Select a land cover:", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    LCSelect: ui.Select({items: [app.NLCDString, app.IGBPString, app.UMDString, app.NoLandCover], 
                         value: app.NLCDString, 
                         onChange: app.CreateBaseDataset}),
    IGBPUnitPanel: ui.Panel({
      widgets: [
        ui.Label({value: "IGBP Classification (MCD12Q1)", style: {fontWeight: "bold", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
        app.makeRow(app.MODDisplayColors[0], app.MODDisplayNames[0]),
        app.makeRow(app.MODDisplayColors[1], app.MODDisplayNames[1]),
        app.makeRow(app.MODDisplayColors[2], app.MODDisplayNames[2]),
        app.makeRow(app.MODDisplayColors[3], app.MODDisplayNames[3]),
        app.makeRow(app.MODDisplayColors[4], app.MODDisplayNames[4]),
        app.makeRow(app.MODDisplayColors[5], app.MODDisplayNames[5]),
        app.makeRow(app.MODDisplayColors[6], app.MODDisplayNames[6]),
        app.makeRow(app.MODDisplayColors[7], app.MODDisplayNames[7]),
        app.makeRow(app.MODDisplayColors[8], app.MODDisplayNames[8]),
        app.makeRow(app.MODDisplayColors[9], app.MODDisplayNames[9]),
        app.makeRow(app.MODDisplayColors[10], app.MODDisplayNames[10]),
        app.makeRow(app.MODDisplayColors[11], app.MODDisplayNames[11]),
        app.makeRow(app.MODDisplayColors[12], app.MODDisplayNames[12]),
        app.makeRow(app.MODDisplayColors[13], app.MODDisplayNames[13]),
        app.makeRow(app.MODDisplayColors[14], app.MODDisplayNames[14]),
        app.makeRow(app.MODDisplayColors[15], app.MODDisplayNames[15]),
        app.makeRow(app.MODDisplayColors[16], app.MODDisplayNames[16])
      ],
      layout: ui.Panel.Layout.flow("vertical"),
      style: {padding: "8px 15px"}
    }),
    UMDUnitPanel: ui.Panel({
      widgets: [
        ui.Label({value: "UMD Classification (MCD12Q1)", style: {fontWeight: "bold", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
        app.makeRow(app.UMDColors[0], app.UMDNames[0]),
        app.makeRow(app.UMDColors[1], app.UMDNames[1]),
        app.makeRow(app.UMDColors[2], app.UMDNames[2]),
        app.makeRow(app.UMDColors[3], app.UMDNames[3]),
        app.makeRow(app.UMDColors[4], app.UMDNames[4]),
        app.makeRow(app.UMDColors[5], app.UMDNames[5]),
        app.makeRow(app.UMDColors[6], app.UMDNames[6]),
        app.makeRow(app.UMDColors[7], app.UMDNames[7]),
        app.makeRow(app.UMDColors[8], app.UMDNames[8]),
        app.makeRow(app.UMDColors[9], app.UMDNames[9]),
        app.makeRow(app.UMDColors[10], app.UMDNames[10]),
        app.makeRow(app.UMDColors[11], app.UMDNames[11]),
        app.makeRow(app.UMDColors[12], app.UMDNames[12]),
        app.makeRow(app.UMDColors[13], app.UMDNames[13]),
        app.makeRow(app.UMDColors[14], app.UMDNames[14]),
        app.makeRow(app.UMDColors[15], app.UMDNames[15])
      ],
      layout: ui.Panel.Layout.flow("vertical"), 
      style: {padding: "8px 15px"} 
    }),
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
    dateSlider: ui.DateSlider({start: "2001-01-01", end: "2019-01-01", value: null, period: 365, onChange: app.addBaseData, style:({width:"330px"})})
  };
  app.LCLegend.panel = ui.Panel({    
    widgets: [
      app.LCLegend.LCSelectLable,
      app.LCLegend.LCSelect,
      app.LCLegend.IGBPUnitPanel,
      app.LCLegend.UMDUnitPanel,
      app.LCLegend.NLCDUnitPanel
    ], 
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {padding: "8px 15px"} 
  });
  app.USLegend = {
    USLegendTitle: ui.Label({value: "Select a unit to aggregate over:", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    USLegendBS:  ui.Label({value: " ", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    AGUnitSelect: ui.Select({items: [app.MapPointString, app.MapBoxString, app.CountiesString, app.StatesString, app.CountriesString, app.HUC2String, app.HUC4String, app.HUC6String, app.HUC8String, app.HUC10String, app.CECEco1String, app.CECEco3String, app.CECEco4String, app.MODISTileString, app.BrazilString], 
                             value:app.HUC10String, 
                             onChange: app.addBaseData}),
    NameLabel: ui.Label({value: "Selected: None", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    VarSelect: ui.Select({items: [app.VarSelect_ET, app.VarSelect_PET, app.VarSelect_Gpp, app.VarSelect_LE, app.VarSelect_PLE, app.VarSelect_K, app.VarSelect_WUE,app.VarSelect_LC], 
                          value: app.VarSelect_K, 
                          onChange: app.CreateBaseDataset}),
    TimeSeriesSelect: ui.Select({items: [app.TimeSeriesStat_Min, app.TimeSeriesStat_Mean, app.TimeSeriesStat_95, app.TimeSeriesStat_TopMean, app.TimeSeriesStat_Max, app.TimeSeriesStat_stdDev, app.TimeSeriesStat_Sum, app.TimeSeriesStat_None], 
                                 value: app.TimeSeriesStat_Max, 
                                 onChange: app.CreateBaseDataset}),
    SpaceSelect: ui.Select({items: [app.SpaceSelect_Min, app.SpaceSelect_Mean, app.SpaceSelect_95, app.SpaceSelect_TopMean, app.SpaceSelect_Max, app.SpaceSelect_stdDev, app.SpaceSelect_Sum, app.SpaceSelect_Count], 
                            value: app.SpaceSelect_95, 
                            onChange: app.CreateBaseDataset}),
    TableSelect: ui.Select({items: [app.TableStat_Min, app.TableStat_Mean, app.TableStat_Max], value: app.TableStat_Max, onChange: app.CreateBaseDataset}),
    ImageAnimate: ui.Textbox("##", "24")
  };
  app.USLegend.panel = ui.Panel({    
    widgets: [
      app.USLegend.USLegendTitle,
      app.USLegend.AGUnitSelect,
      app.makeRow(app.GenFCColors[0], app.GenFCNames[0]),
      app.USLegend.USLegendBS,
      app.USLegend.NameLabel,
      ui.Panel({
        widgets: [
          ui.Label({value: "Variable to view:", style: {fontWeight: "normal", fontSize: "12x", margin: "12px 0px 0px 0px", padding: "0"}}),
          app.USLegend.VarSelect
        ],
        layout: ui.Panel.Layout.flow("horizontal"),
        style: {padding: "0px 0px"}
      }),
      ui.Panel({
        widgets: [
          ui.Label({value: "Temporal stat to aggregate:", style: {fontWeight: "normal", fontSize: "12x", margin: "12px 0px 0px 0px", padding: "0"}}),
          app.USLegend.TimeSeriesSelect
        ],
        layout: ui.Panel.Layout.flow("horizontal"),
        style: {padding: "0px 0px"}
      }),
      ui.Panel({
        widgets: [
          ui.Label({value: "Spatial stat to aggregate:", style: {fontWeight: "normal", fontSize: "12x", margin: "12px 0px 0px 0px", padding: "0"}}),
          app.USLegend.SpaceSelect
        ],
        layout: ui.Panel.Layout.flow("horizontal"),
        style: {padding: "0px 0px"}
      }),
      ui.Panel({
        widgets: [
          ui.Label({value: "Table stat to aggregate:", style: {fontWeight: "normal", fontSize: "12x", margin: "12px 0px 0px 0px", padding: "0"}}),
          app.USLegend.TableSelect
        ],
        layout: ui.Panel.Layout.flow("horizontal"),
        style: {padding: "0px 0px"}
      }),
      ui.Panel({
        widgets: [
          ui.Label({value: "Images to animate:", style: {fontWeight: "normal", fontSize: "12x", margin: "12px 0px 0px 0px", padding: "0"}}),
          app.USLegend.ImageAnimate
        ],
        layout: ui.Panel.Layout.flow("horizontal"),
        style: {padding: "0px 0px"}
      })
    ], 
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {padding: "0px 0px"} 
  });
  app.LegendColorBlock = {
    ETcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.ETvis.Palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: false},}),
    ETcolorLabels: ui.Panel({widgets: [ui.Label("0", {margin: '4px 8px'}), ui.Label(("20"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("40+ kg/m^2/8day", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: false}}),
    PETcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.PETvis.Palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: false},}),
    PETcolorLabels: ui.Panel({widgets: [ui.Label("0", {margin: '4px 8px'}), ui.Label(("20"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("40+ kg/m^2/8day", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: false}}),
    LEcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.LEvis.Palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: false},}),
    LEcolorLabels: ui.Panel({widgets: [ui.Label("0", {margin: '4px 8px'}), ui.Label(("0.06"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("0.12 J/m^2/8day", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: false}}),
    GppcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.Gppvis.Palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: false},}),
    GppcolorLabels: ui.Panel({widgets: [ui.Label("0", {margin: '4px 8px'}), ui.Label(("20"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("0.06+ kg/m^2/8day", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: false}}),
    PLEcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params:app. makeColorBarParams(app.PLEvis.Palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: false},}),
    PLEcolorLabels: ui.Panel({widgets: [ui.Label("0", {margin: '4px 8px'}), ui.Label(("0.06"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("0.12 J/m^2/8day", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: false}}),
    WUEcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.WUEvis.Palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: false},}),
    WUEcolorLabels: ui.Panel({widgets: [ui.Label("0.8", {margin: '4px 8px'}), ui.Label(("1.6"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("2.4", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: false}}),
    KcolorBar: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.Kvis.Palette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: false},}),
    KcolorLabels: ui.Panel({widgets: [ui.Label("0", {margin: '4px 8px'}), ui.Label(("0.5"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("1", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: false}})
  };
  app.animation = {
    buttonPlayPause: ui.Button({label: app.textPlay, onClick: app.onPlayPause}),
    IndexSliderTitle: ui.Label({value: "Index:", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    IndexSlider: ui.Slider({min: 0, max: app.USLegend.ImageAnimate, step: 1, style: {stretch: 'horizontal'}}),
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
    style: {padding: "8px 15px", shown: false} 
  });
  app.animation.panel2 = ui.Panel({
    widgets: [
      app.animation.OpSliderTitle,
      app.animation.OpSlider
    ], 
    layout: ui.Panel.Layout.flow("horizontal"), 
    style: {padding: "8px 15px", shown: false} 
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
  app.ChartTitle = ui.Label({value: "Select a region to create the charts and click on a chart node to view the desired statistic:", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}});
  app.TimeseriesResults = ui.Panel();
  app.instructionsLabel = ui.Label("Awaiting input");
  app.TimeseriesResults.widgets().reset([app.instructionsLabel]);
  app.buttonPanel = ui.Panel(
    [ui.Button("Clear results", app.clearResults)],
    ui.Panel.Layout.Flow("horizontal"), {margin: "0 0 0 auto", width: "500px"}
  );
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  app.MainMap = ui.Map();
  app.MainMap.style().set({cursor: "crosshair"});
  app.MainMap.onClick(app.MapClickEvent);
  var Legend = ui.Panel({
    widgets: [
      app.intro.legendPrimePanel,
      ui.Panel({
        widgets: [app.LCLegend.panel, app.USLegend.panel],
        layout: ui.Panel.Layout.flow("horizontal"),
        style: {padding: "4px 4px"}
      }),
      ui.Label({value: "Year to view:", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
      app.LCLegend.dateSlider,
      app.LegendColorBlock.ETcolorBar,
      app.LegendColorBlock.ETcolorLabels,
      app.LegendColorBlock.PETcolorBar,
      app.LegendColorBlock.PETcolorLabels,
      app.LegendColorBlock.LEcolorBar,
      app.LegendColorBlock.LEcolorLabels,
      app.LegendColorBlock.GppcolorBar,
      app.LegendColorBlock.GppcolorLabels,
      app.LegendColorBlock.PLEcolorBar,
      app.LegendColorBlock.PLEcolorLabels,
      app.LegendColorBlock.WUEcolorBar,
      app.LegendColorBlock.WUEcolorLabels,
      app.LegendColorBlock.KcolorBar,
      app.LegendColorBlock.KcolorLabels,
      app.animation.panel1,
      app.animation.panel2,
      app.animation.panel3,
      app.ChartTitle,
      app.TimeseriesResults
    ],
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {position: "top-left", padding: "8px 15px"}
  });
  ui.root.insert(0, Legend);                            //Add the legend to the UI
  ui.root.insert(1, app.MainMap);
  app.addBaseData();
  app.CreateBaseDataset();
};
ui.root.widgets().reset();
app.boot();