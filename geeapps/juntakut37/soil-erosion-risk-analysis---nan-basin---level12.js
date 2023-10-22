var CHIRPS = ui.import && ui.import("CHIRPS", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/PENTAD"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD"),
    soil = ui.import && ui.import("soil", "image", {
      "id": "OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02"
    }) || ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02"),
    DEM = ui.import && ui.import("DEM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    modis = ui.import && ui.import("modis", "imageCollection", {
      "id": "MODIS/006/MCD12Q1"
    }) || ee.ImageCollection("MODIS/006/MCD12Q1");
/////////////////////////////////////////////////////
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'SOIL EROSION RISK ANALYSIS FOR THE VETIVER SYSTEM',
    style: {fontSize: '20px', fontWeight: 'bold',Color:'green'}
  }),
]);
Map.add(intro);
////////////////////////////////////////
//
//var aoi = ee.FeatureCollection("users/juntakut37/amphoe_korat_nayok_prachin"),
var aoi = ee.FeatureCollection("users/juntakut37/Basin_TH/nan_basin_lv12"), 
  s2 = ee.ImageCollection("COPERNICUS/S2"),
  str = ee.FeatureCollection("users/juntakut37/Basin_TH/THA_water_lines"); 
Map.centerObject(aoi);
Map.setOptions("HYBRID");
Map.setControlVisibility(true);
Map.drawingTools().setShown(false);
var black = ee.Image(0);
var hole = ee.Image(1).clip(aoi);
var stamp = black.where(hole, 1);
var mask = stamp.eq(0);
var background = stamp.updateMask(mask);
Map.addLayer(background, {opacity: 0.63}, 'Study Area');
Map.addLayer (aoi, {}, 'aoi', false, 0.55);
Map.addLayer (str, {color: 'blue'}, 'stream', false, 0.40);
// UI panel elements and their text
// -------------------------------------
var title_panel = ui.Panel({style:{'background-color':'green', height: '300px'}});
var title_text1 = ui.Label("****** ปลูกแฝก ******", {width: '280px','background-color':'darkgreen', 'fontSize': '27px', 'font-weight':'bold', 'color': 'yellow', 'textAlign': 'center', 'border': '4px solid gold'});
var title_text2 = ui.Label("--- BOOG-FAG V.1 ---", {width: '280px','background-color':'darkgreen', 'fontSize': '27px', 'font-weight':'bold', 'color': 'yellow', 'textAlign': 'center', 'border': '4px solid grey'});
var title_text3 = ui.Label("~~ NAN BASIN ~~", {width: '280px','background-color':'darkblue', 'fontSize': '20px', 'font-weight':'bold', 'color': 'white', 'textAlign': 'center', 'border': '4px solid grey'});
var title_text4 = ui.Label("Soil Erosion Risk Analysis for Contributing the Application of the Vetiver System", {'background-color':'green', 'fontSize': '24px', 'font-weight':'bold', 'color': 'yellow'});
// ---------------------------
var date_panel = ui.Panel({style:{'background-color':'333333'}});
date_panel.add(ui.Label('SELECT START DATE', {'background-color':'333333', color:'gold', 'font-weight':'bold'}))
date_panel.add(ui.Label('(Please determining the date in a year)', {'background-color':'333333', color:'white'}))
var select_date1 = ui.DateSlider({start:'2015', end: ee.Date(Date.now()),  style: {width: '280px'}})
date_panel.add(select_date1)
date_panel.add(ui.Label('SELECT END DATE', {'background-color':'333333', color:'gold', 'font-weight':'bold'}))
date_panel.add(ui.Label('(Please determining the date in a year)', {'background-color':'333333', color:'white'}))
var select_date2 = ui.DateSlider({start:'2015', end: ee.Date(Date.now()),  style: {width: '280px'}})
date_panel.add(select_date2)
// -----------------------------
var selector_panel = ui.Panel({style:{'background-color':'333333'}});
// Trigger the showFloodMap function each time an Amphoe name in dropdown changes
ee.List(aoi.distinct('SUBBAS_ID').aggregate_array('SUBBAS_ID'))
     .sort()
     .evaluate(function(amphoe){
       selector_panel.add(ui.Select({
         placeholder: "กรุณาเลือกพื้นที่ลุ่มน้ำย่อย (Subbasin)",
         items: amphoe,
         style: {fontSize: '30px',
         'color': 'blue',
         'background-color': "cccccc",
         width: '280px',
         height: '50px',
         textAlign: 'center'
         },
         onChange: showFloodMap,
       }));
     });
var area_panel = ui.Panel({style:{'background-color':'555555', margin: '5px', padding: '5px'}});
var description_panel = ui.Panel({style:{'background-color':'333333'}});
var desc_spacer = ui.Label("", {'background-color':'333333'});
var desc_h1 = ui.Label("THE PURPOSE of THIS BOOG-FAG APP:", {'background-color':'333333', color:'gold', 'font-weight':'bold'});
var desc_para1 = ui.Label("This BOOG-FAG app visualises and estimates soil erosion for supporting the application of the vetiver system using the Revised Universal Soil Loss Equation (RUSLE) based on satellite images from the European Space Agency's Sentinel-2.", {'background-color':'333333', color:'white'});
var desc_h2 = ui.Label("THE USE of THIS BOOG-FAG APP:", {'background-color':'333333', color:'gold', 'font-weight':'bold'});
var desc_para2 = ui.Label("From the drop-down menu above, choose a basin for which you want to see a map and a result of soil erosion risk. The map window will then zoom to that basin and show you the location of soil erosion classes in that basin.", {'background-color':'333333', color:'white'});
var desc_para3 = ui.Label("At the top-right corner, you will see a button called 'Layers'. Clicking on that will show you all layers in this map that can be switched on/off such as P factor, Landuse, C factor etc.", {'background-color':'333333', color:'white'});
var desc_para4 = ui.Label("When you choose a basin, the app also shows (in a panel below the drop-down) the result of soil erosion estimation and the piechart of soil erosion classes in that basin.", {'background-color':'333333', color:'white'});
var footer_panel = ui.Panel({style:{'background-color':'333333'}});
var footer_spacer = ui.Label("", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text1 = ui.Label("Please use these soil erosion maps and numbers with caution. This analysis is a prediction, may suffer from both inclusion and exclusion errors. In case of some errors, please click run the window once again.", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text2 = ui.Label("Created by...", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
var footer_text3 = ui.Label("1) Col.Asst.Prof.Dr.Pongpun Juntakut (พงศ์พันธุ์ จันทะคัต) | Chulachomklao Royal Military Academy (CRMA)", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
var footer_text4 = ui.Label("2) Dr.Yaowaret Jantakat (เยาวเรศ จันทะคัต) | Rajamangala University of Technology Isan (RMUTI)", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
var footer_text5 = ui.Label("3) Dr.Ann Kambu (แอน กำภู ณ อยุธยา) | Kasetsart University (KU)", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
var footer_text6 = ui.Label("email : pongpun.ju@crma.ac.th", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
//###############################################
/*
 * Chart setup
 */
var chartPanel = ui.Panel({style: {backgroundColor: "white", 
textAlign: "center", whiteSpace: "nowrap", shown: true}});
chartPanel.add(ui.Label({value: "Study Area:", style:{fontWeight:"bold", fontSize: "16px", backgroundColor : "white"}}));
chartPanel.add(ui.Label("Nan River Basin", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}, 
                        "https://en.wikipedia.org/wiki/Nan_River"));  
//chartPanel.add(ui.Label("Nakhon Nayok", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}, 
                   //     "https://en.wikipedia.org/wiki/Nakhon_Nayok_province"));
//chartPanel.add(ui.Label("Prachin Buri", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}, 
                   //     "https://en.wikipedia.org/wiki/Prachinburi_province"));
// Description panel
var logo1 = ee.Image('users/juntakut37/logo_vetiver_00').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 285
    });
var logo2 = ee.Image('users/juntakut37/SDGs_logo_v1').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 285
    });
var footer_logo1 = ui.Thumbnail({
    image: logo1,
    params: {
        //dimensions: '642x291',
        format: 'png'
        },
    style: {textAlign: "center", height: '240px', width: '280px', border: '4px solid grey'}
    });
var footer_logo2 = ui.Thumbnail({
    image: logo2,
    params: {
        //dimensions: '642x291',
        format: 'png'
        },
    style: {textAlign: "center", height: '240px', width: '280px', border: '4px solid grey'}
    });
title_panel.add(title_text1);
title_panel.add(title_text2);
title_panel.add(title_text3);
title_panel.add(title_text4);
description_panel.add(desc_spacer);
description_panel.add(desc_h1);
description_panel.add(desc_para1);
description_panel.add(desc_h2);
description_panel.add(desc_para2);
description_panel.add(desc_para3);
description_panel.add(desc_para4);
footer_panel.add(footer_spacer);
footer_panel.add(footer_text1);
footer_panel.add(footer_text2);
footer_panel.add(footer_text3);
footer_panel.add(footer_text4);
footer_panel.add(footer_text5);
footer_panel.add(footer_text6);
footer_panel.add(footer_logo1);
footer_panel.add(footer_logo2);
//---------------------------------------------------------------------
//--------------------------------------------------------------
var panel = ui.Panel(
  [title_panel, date_panel, selector_panel, area_panel, description_panel, chartPanel, footer_panel],
  ui.Panel.Layout.flow("vertical"),
  {width: '314px', 'background-color':'333333'}
  );
 // add UI elements at the same level as map window.
// print panels
ui.root.add(panel);
// -------------------------------------
//------------------------------------------
// Function to generate analyses and add map layers on the fly for a given Amphoe in Nakhonratchasima
function showFloodMap(amphoe) {
  area_panel.clear();
  Map.clear();
  Map.setOptions("TERRAIN");
  Map.setControlVisibility(false, true, true, false, true, false);
  Map.drawingTools().setShown(false);
  var amphoe = aoi.filterMetadata('SUBBAS_ID', 'equals', amphoe);
  Map.centerObject(amphoe);
////////////////////////////////////////////
// Defining dates/year
var date1 = ee.Date(ee.List(select_date1.getValue()).get(1)); 
var date2 = ee.Date(ee.List(select_date2.getValue()).get(1));
Map.addLayer (aoi, {}, 'aoi', true, 0.6);
Map.addLayer (str, {color: 'blue'}, 'stream', true, 0.40);
// **************** R Factor ***************
var current = CHIRPS.filterDate(date1, date2).select('precipitation').sum().clip(amphoe);
Map.addLayer (current, {}, 'Annual Rain', 0)
var R = ee.Image(current.multiply(0.4669).add(-12.1415)).rename('R');
Map.addLayer(R, {min: 300, max: 900, palette: ['a52508','ff3818','fbff18','25cdff','2f35ff','0b2dab']}, 'R Factor Map', 0);
var R_mean = R.reduceRegion({
  geometry: amphoe, 
  reducer: ee.Reducer.mean(), 
  scale: 500,
  maxPixels: 475160679
})
print ("Mean R", R_mean.get("R"))
// **************** K Factor ***************
soil = soil.select('b0').clip(aoi).rename('soil')     
Map.addLayer(soil, {min: 0, max: 100, palette: ['a52508','ff3818','fbff18','25cdff','2f35ff','0b2dab']}, 'Soil', 0);
var K = soil.expression(
    "(b('soil') > 11) ? 0.04" +
      ": (b('soil') > 10) ? 0.08" +
        ": (b('soil') > 9) ? 0.57" +
           ": (b('soil') > 8) ? 0.30" +
            ": (b('soil') > 7) ? 0.56" +
            ": (b('soil') > 6) ? 0.33" +
            ": (b('soil') > 5) ? 0.20" +
            ": (b('soil') > 4) ? 0.38" +
            ": (b('soil') > 3) ? 0.28" +
            ": (b('soil') > 2) ? 0.15" +
            ": (b('soil') > 1) ? 0.26" +
            ": (b('soil') > 0) ? 0.14" +
             ": 0")
             .rename('K').clip(amphoe);              
Map.addLayer(K, {min: 0, max: 0.06, palette: ['a52508','ff3818','fbff18','25cdff','2f35ff','0b2dab']}, 'KFactor Map', 0);
var K_mean = K.reduceRegion({
  geometry: amphoe, 
  reducer: ee.Reducer.mean(), 
  scale: 500,
  maxPixels: 475160679
})
print ("Mean K", K_mean.get("K"))
// **************** LS Factor ***************
var elevation = DEM.select('elevation');
var slope1 = ee.Terrain.slope(elevation).clip(amphoe);
    //Converting Slope from Degrees to %
var slope = slope1.divide(180).multiply(Math.PI).tan().multiply(100);
Map.addLayer(slope, {min: 0, max: 15, palette: ['a52508','ff3818','fbff18','25cdff','2f35ff','0b2dab']}, 'slope in %', 0);
var LS4 = Math.sqrt(500/100); 
var LS3 = ee.Image(slope.multiply(0.53));
var LS2 = ee.Image(slope).multiply(ee.Image(slope).multiply(0.076));
var LS1 = ee.Image(LS3).add(LS2).add(0.76);
var LS = ee.Image(LS1).multiply(LS4).rename("LS");
Map.addLayer(LS, {min: 0, max: 90, palette: ['a52508','ff3818','fbff18','25cdff','2f35ff','0b2dab']}, 'LS Factor Map', 0);
var LS_mean = LS.reduceRegion({
  geometry: amphoe, 
  reducer: ee.Reducer.mean(), 
  scale: 500,
  maxPixels: 475160679
})
print ("Mean LS", LS_mean.get("LS"))
// **************** C Factor ***************
s2 = s2.filterDate(date1, date2).median().clip(amphoe);
var image_ndvi = s2.normalizedDifference(['B8','B4']).rename("NDVI");
Map.addLayer (image_ndvi, {min: 0, max: 0.85, palette: ['FFFFFF','CC9966','CC9900', '996600', '33CC00', '009900','006600','000000']}, 'NDVI', 0);
var alpha = ee.Number(-2)
var beta = ee.Number (1)
var C1 = image_ndvi.multiply(alpha)
var oneImage = ee.Image(1).clip(amphoe);
var C2 = oneImage.subtract(image_ndvi)
var C3 = C1.divide(C2).rename('C3')
var C4 = C3.exp()
var maxC4 = C4.reduceRegion({
  geometry: amphoe, 
  reducer: ee.Reducer.max(), 
  scale: 3000,
  maxPixels: 475160679
})
var C5 = maxC4.toImage().clip(amphoe)
var minC4 = C4.reduceRegion({
  geometry: amphoe, 
  reducer: ee.Reducer.min(), 
  scale: 3000,
  maxPixels: 475160679
})
var C6 = minC4.toImage().clip(amphoe)
var C7 = C4.subtract(C6)
var C8 = C5.subtract(C6)
var C = C7.divide(C8).rename('C')
Map.addLayer (C, {min: 0, max: 1, palette: ['FFFFFF','CC9966','CC9900', '996600', '33CC00', '009900','006600','000000']}, 'C Map',0);
var C_mean = C.reduceRegion({
  geometry: amphoe, 
  reducer: ee.Reducer.mean(), 
  scale: 500,
  maxPixels: 475160679
})
print ("Mean C", C_mean.get("C"))
 // **************** P Factor ***************
var lulc = modis.filterDate(date1, date2).select('LC_Type1')
        .first().clip(amphoe).rename('lulc');
Map.addLayer (lulc, {}, 'lulc', 0) 
// Combined LULC & slope in single image
var lulc_slope = lulc.addBands(slope)
// Create P Facor map using an expression
var P = lulc_slope.expression(
     "(b('lulc') < 11) ? 0.1" +
      ": (b('lulc') == 11) ? 1" +
      ": (b('lulc') == 13) ? 0" +
      ": (b('lulc') > 14) ? 0" +
      ": (b('slope') < 2) and((b('lulc')==12) or (b('lulc')==14)) ? 0.6" +
    ": (b('slope') < 5) and((b('lulc')==12) or (b('lulc')==14)) ? 0.5" +
    ": (b('slope') < 8) and((b('lulc')==12) or (b('lulc')==14)) ? 0.5" +
    ": (b('slope') < 12) and((b('lulc')==12) or (b('lulc')==14)) ? 0.6" +
    ": (b('slope') < 16) and((b('lulc')==12) or (b('lulc')==14)) ? 0.7" +
    ": (b('slope') < 20) and((b('lulc')==12) or (b('lulc')==14)) ? 0.8" +
    ": (b('slope') > 20) and((b('lulc')==12) or (b('lulc')==14)) ? 0.9" +
    ": 1"
).rename('P').clip(amphoe);
Map.addLayer (P, {}, 'P Factor', 0)
var P_mean = P.reduceRegion({
  geometry: amphoe, 
  reducer: ee.Reducer.mean(), 
  scale: 500,
  maxPixels: 475160679
})
print ("Mean P", P_mean.get("P"))
// **************  Estimating Soil Loss ******************
var soil_loss = ee.Image(R.multiply(K).multiply(LS).multiply(C).multiply(P)).rename("Soil Loss")
//var style = ['490eff','12f4ff','12ff50','e5ff12','ff4812']
var style = ['2149d3','d33c21','eca827','53ad43','8f1cc1']
Map.addLayer (soil_loss, {min: 0, max: 5, palette: style}, 'Soil Loss', 0)
var SL_class = soil_loss.expression(
    "(b('Soil Loss') < 12.5) ? 1" +
      ": (b('Soil Loss') < 31.25) ? 2" +
      ": (b('Soil Loss') < 93.75) ? 3"+
      ": (b('Soil Loss') < 125) ? 4"+
             ": 5")
             .rename('SL_class').clip(amphoe);  
Map.addLayer (SL_class, {min: 0, max: 5, palette: style}, 'Soil Loss Class', true, 0.55)
var SL_mean = soil_loss.reduceRegion({
  geometry: amphoe, 
  reducer: ee.Reducer.mean(), 
  scale: 500,
  maxPixels: 475160679
})
print ("Mean Soil Erosion", SL_mean.get("Soil Loss"))
// get number of soil loss as integer
var SL_meaned = SL_mean.getNumber('Soil Loss').round();
// get number of soil loss as integer
var SL_mean_rai = SL_meaned.multiply(6.25);
// get number of number of subbasins as integer
var main_number = amphoe.size();
///////////////////////////////////////
chartPanel.add(
  ui.Label("===============================", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}));
chartPanel.add(
  ui.Label("Mean Soil Erosion:", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}));
chartPanel.add(
    ui.Label("based on the RUSLE estimation", {'background-color':'white', fontSize: '11px', color:'grey'}));
chartPanel.add(
    ui.Label(SL_meaned.getInfo()+" ton/ha/year", {'background-color':'white', fontSize: '20px', color:'brown', 'font-weight':'bold'}));
chartPanel.add(
    ui.Label("or", {'background-color':'white', fontSize: '11px', color:'grey'}));
chartPanel.add(
    ui.Label(SL_mean_rai.getInfo()+" ton/rai/year", {'background-color':'white', fontSize: '20px', color:'brown', 'font-weight':'bold'}));
chartPanel.add(
  ui.Label("----------------------------------------------", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}));
//chartPanel.add(
 // ui.Label("Number of Subbasin:", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}));
//chartPanel.add(
  //  ui.Label("based on HydroBasin by WWF", {'background-color':'white', fontSize: '11px', color:'grey'}));
//chartPanel.add(
 //   ui.Label(main_number.getInfo()+" subbasins", {'background-color':'white', fontSize: '20px', color:'brown', 'font-weight':'bold'}));
//chartPanel.add(
 // ui.Label("-----------------------------------------", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}));
//////////////////////////////////////////////////
// Add reducer output to the Features in the collection.
var maineMeansFeatures = soil_loss.reduceRegions({
  collection: amphoe,
  reducer: ee.Reducer.mean(),
  scale: 500,
});
print ("Mean Soil Erosion of Each Subbasins", maineMeansFeatures)
//Calculating Area
var areaImage = ee.Image.pixelArea().addBands(
      SL_class)
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: aoi.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
print(areas)
var classAreas = ee.List(areas.get('groups'))
var className = classAreas.map(function(item) {
  var areaDict = ee.Dictionary(item)
  var classNumber = ee.Number(areaDict.get('class')).format()
  return ee.List(classNumber)  
})
//print(className)
var Area = classAreas.map(function(item) {
  var areaDict = ee.Dictionary(item)
  var area = ee.Number(
  areaDict.get('sum')).divide(1e6).round()
  return ee.List(area) 
})
print(Area)
var className2 = ee.List(["Very mild (<12.5)","Mild (12.50 - 31.25)","Moderate (31.25 - 93.75)","Severe (93.75 - 125)","Very severe (>125)"])
//print(ui.Chart.array.values(Area, 0, className2)
 //   .setChartType('PieChart')
 //   .setOptions({pointSize: 2, title: 'Soil Loss',}));
chartPanel.add(ui.Chart.array.values(Area, 0, className2)
    .setChartType('PieChart')
    .setOptions({pointSize: 2, title: 'Soil Erosion'}));
//////////////////////////////
var calculateClassArea = function(feature) {
    var areas = ee.Image.pixelArea().addBands(SL_class)
    .reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: feature.geometry(),
    scale: 500,
    maxPixels: 1e10
    })
    var classAreas = ee.List(areas.get('groups'))
    var classAreaLists = classAreas.map(function(item) {
      var areaDict = ee.Dictionary(item)
      var classNumber = ee.Number(
        areaDict.get('class')).format()
      var area = ee.Number(
        areaDict.get('sum')).round()
      return ee.List([classNumber, area])
    })
    var result = ee.Dictionary(classAreaLists.flatten())
    var district = feature.get('HYBAS_ID')
    return ee.Feature(
      feature.geometry(),
      result.set('district', district))
}
var districtAreas = amphoe.map(calculateClassArea);
//print (districtAreas)
var classes = ee.List.sequence(1, 5)
var outputFields = ee.List(
    ['district']).cat(classes).getInfo()
Export.table.toDrive({
    collection: districtAreas,
    description: 'class_area_by_subbasin',
    folder: 'earthengine',
    fileNamePrefix: 'class_area_by_subbasin',
    fileFormat: 'CSV',
    selectors: outputFields
    })
//Legend Panel
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    border: '5px solid grey'
  }
});
//////////////////////////////////////////////// 
// Create legend title
var legendTitle = ui.Label({
  value: 'Soil Erosion Class (ton/ha/year)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
//  Palette with the colors
var palette =style;
// name of the legend
// var names = ["Slight","Moderate","High","Very high","Severe"];
var names = ["Very mild (<12.5)","Mild (12.50 - 31.25)","Moderate (31.25 - 93.75)","Severe (93.75 - 125)","Very severe (>125)"]
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
}