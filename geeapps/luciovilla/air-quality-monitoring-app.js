// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $    AUGUST -AUTOMATED GEOPROCESSING ENVIRONMENT CLOUD-BASED  $
// $ =========================================================== $
// $ @tool     : GIS/RS Tool - PROCESSING Sentinel-1 Data        $
// $ @autor    : Lucio Villa                                     $
// $ @e-mail   : luciovilla60@gmail.com                          $
// $ @blog     : luciovilla.blogspot.pe                          $
// $ @revision : Based in AUGUST v3.2 - 21/05/2018               $
// $                                                             $
// $ (c) 2019 Lucio Villa.                                       $
// $ ............................................................$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// API KEY:AIzaSyACJQ9_vIGgOLX8tu4afrllW5zyiVn7M4E
//        AIzaSyACJQ9_vIGgOLX8tu4afrllW5zyiVn7M4E
// -----------------------------------------------------------
//
var mapaGoogle=ui.root.widgets().get(0); 
//*******************************************************************************************
// 1. Area of Interest (AOI)
//*******************************************************************************************
//print(S5P_img4)
//var Ville_Robore = ee.Geometry.Point([-59.763723, -18.326400]); 
//*******************************************************************************************
// 2. Adding features/polygons (AOI)
//*******************************************************************************************
//
var Lima_y_Callao = ee.FeatureCollection("users/luciovilla/Provincia_Lima_y_Callao");
var Ecuador = ee.FeatureCollection("users/luciovilla/Ecuador_provincias");
var limits = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-65.39312219546389, -19.72762069600461],
          [-46.93609094546389, -22.026789439250713],
          [-47.28765344546389, -11.697642967870562],
          [-65.12945032046389, 9.012911731443225],
          [-72.68804407046389, 7.79568041268313],
          [-78.84038782046389, -0.8812919928885373],
          [-76.73101282046389, -8.235632652364183]]]);
var borderCountries = ee.FeatureCollection('USDOS/LSIB/2013')
                      //.filterBounds(limits);
var emptyLimits = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var ROI_Border = emptyLimits.paint({
  featureCollection: borderCountries,
  color: 1,
  width: 2
  })
var empty = ee.Image().byte();
var Lima_y_Callao_Border = empty.paint({
  featureCollection: Lima_y_Callao,
  color: 1,
  width: 1
});
var emptyEcuador = ee.Image().byte();
var Ecuador_Border = emptyEcuador.paint({
  featureCollection: Ecuador,
  color: 1,
  width: 1
});
//
//*******************************************************************************************
// 3. Adding Legend
//*******************************************************************************************
//
//var Mining_point = /* color: #d63000 */ee.Geometry.Point([-69.977972,-13.038251]);
// List of values
var vizS5p = {
  min: 2.0,
  max: 75.0,
  palette:['0000C0','0420FD','1443FF','2D74FF','3E95FF','53AAFF','69BFFF','7CD0FF','88DCFF','95E9FF','A2F0FF','B4F7FF','C7FFFF','D8FFFF','EDFFFF','FFFFFF','FFFFAB','FFFF46','FFFD00','FFE900','FFD400','FFC100','FFA300','FF8700','FF6500','FF3100','FF0000','EB0000','D00000','BD0000','820000']
  // palette:['0000C0','0420FD','1443FF','2D74FF','3E95FF','53AAFF','69BFFF','7CD0FF','88DCFF','95E9FF','A2F0FF','B4F7FF','C7FFFF','D8FFFF','EDFFFF','FFFFFF','FFFFAB','FFFF46','FFFD00','FFE900','FFD400','FFC100','FFA300','FF8700','FF6500','FF3100','FF0000','EB0000','D00000','BD0000','820000']
  // palette:["black", "blue", "purple", "cyan", "green", "yellow", "red"]
};
// add the map
//Map.addLayer(P, viz);
// set position of panel
var legendS5P = ui.Panel({
style: {
position: 'middle-left',
padding: '4px 5px'
}
});
// Create legend title
var legendS5PTitle = ui.Label({
value: 'NO2 Troposferic',
style: {
fontWeight: 'bold',
fontSize: '11px',
margin: '0 0 4px 0',
padding: '0'
}
});
var legendS5PTitle1 = ui.Label({
value: 'Column (μmol.m-2)',
style: {
fontWeight: 'bold',
fontSize: '11px',
margin: '0 0 4px 0',
padding: '0'
}
});
var legendS5PTit2 = ui.Label({
  value: 'SENTINEL-5P',
  style: {
    fontWeight: 'bold',
    //fontStyle: 'italic',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legendS5P.add(legendS5PTitle);
legendS5P.add(legendS5PTitle1);
// legendS5P.add(legendS5PTitle2);
// create the legend image
var long = ee.Image.pixelLonLat().select('latitude');
var gradient = long.multiply((vizS5p.max-vizS5p.min)/100.0).add(vizS5p.min);
var legendImage = gradient.visualize(vizS5p);
// create text on top of legend
var panel = ui.Panel({
widgets: [
  ui.Label('Max: ≥ 80', {fontSize: '10px',fontWeight: 'bold'})
// ui.Label(vizS5p['max'], {fontSize: '10px',fontWeight: 'bold'})
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
  ui.Label('Min: ≤ 2',{fontSize: '10px',fontWeight: 'bold'}),
// ui.Label(vizS5p['min'],{fontSize: '10px',fontWeight: 'bold'}),
// ui.Label('Choose a satellite image...', {fontSize: '12px',fontWeight: 'bold',color: 'ff0000'}),
],
});
//legendS5P.add(panel);
//Map.add(legend);
legendS5P.add(panel);
//************************************************
var palette = ee.List([
  "D9D9D9", 
  //"FF9300",
  "D9D9D9",
  //"D1D544",
  //"737369"
]);
var names = ee.List([
  2013,
 // 2,
  2018,
  //20,
  //75
]);
var namez = ee.List([
  "Boundary",
  //"FIRMS NRT MODIS C6 Night - 03/Sep",
  "Political Boundaries",
  //"2017",
  //"2016"
]);
//print(palette);
//print(names);
//print(namez);
// set position of panel
//############################# PANELS LEGEND ########
var legend = ui.Panel({
  style: {
    // 'width', '250px'
    position: 'bottom-left',
    padding: '5px 8px 15px 5px'
  }
});
legend.style().set('width', '150px');
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
//######################################################
// Create legend title
var legendTitle = ui.Label({
  //value: 'Very High Resolution (VHR) Cover',
  value: 'LEGEND',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var legendTitle2 = ui.Label({
  value: 'Updated: Apr 06, 2020',
  style: {
    fontWeight: 'light',
    //fontStyle: 'italic',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
//###################################################################################
// Visualization parameters
var visTitle = {
  fontWeight: 'bold', 
  fontSize: '11px', 
  width: '130px',
  padding: '2px 2px 2px 2px',
  border: '1px solid 418F5D',
  color: 'white',
  // backgroundColor: 'FFBB00',
  backgroundColor: '418F5D',
  textAlign: 'center'
  };
var logo = ee.Image("users/luciovilla/UNALM/UNALM");
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'80%',height:'80%',stretch: 'horizontal', textAlign:'center', padding:'0px 0px 0px 25px' }});
legend.add(ui.Label('UNALM - FACULTAD DE CIENCIAS',visTitle));
legend.add(branding);
// legend.add(ui.Label('Departamento Ingeniería Ambiental',visTitle));
// legend.add(ui.Label('Facultad de Ciencias',{fontSize: '13px', fontWeight: 'bold'}));
legend.add(ui.Label('Departamento de Ingeniería Ambiental',{fontSize: '12px', fontWeight: 'bold',textAlign: 'center' }));
// var updatedData = ui.Label({
//   value: 'Updated: Apr 07, 2020 | GMT-5',
//   style: {
//         fontWeight: 'light',
//         //fontStyle: 'italic',
//         fontSize: '12px',
//         margin: '0 0 4px 0',
//         padding: '4px 4px 4px 4px'
//         }
// });
var link = ui.Chart(
    [
      ['Environmental Engineering Department'],
      ['<a target="_blank" href=http://www.lamolina.edu.pe/facultad/ciencias/index.php/ingenieria-ambiental-fisica-y-meteorologia/>' +
       'Universidad Nacional Agraria La Molina</a>']
    ],
    'Table', {allowHtml: true});
var linkPanel = ui.Panel([link], 'flow', {width: '340px', height: '70px'});
//###### Add the title to the panel
// legend.add(linkPanel);
legend.add(legendTitle);
// legend.add(legendTitle2);
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
        style: {margin: '0 0 4px 6px', fontSize: '12px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//###### Add color and and names
for (var i = 0; i < 1; i++) {
   var myPercentage = ee.Number(names.get(i).getInfo());
   var myName = ee.String(namez.get(i).getInfo());
   var txt = myName.cat(" (").cat(myPercentage.toInt()).cat(")");
   legend.add(makeRow(palette.get(i).getInfo(),txt.getInfo() ));
  }
//
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
// var date2020_Mar_S1 = [beforeBeforeBeforeYesterday, beforeBeforeYesterday];
// var date2020_Mar_S2 = [beforeBeforeYesterday, beforeYesterday];
// var date2020_fire_3 = [beforeYesterday, yesterday];
// var date2020_fire_4 = [yesterday, today];
// ******WEEKS
var date2020_Jun_S14 = ['2020-06-01','2020-06-04'];
var date2020_Apr_S13 = ['2020-05-25','2020-05-30'];
var date2020_Apr_S12 = ['2020-05-18','2020-05-23'];
var date2020_Apr_S11 = ['2020-05-11','2020-05-16'];
var date2020_Apr_S10 = ['2020-05-04','2020-05-09'];
var date2020_Apr_S9 = ['2020-04-27','2020-05-02'];
var date2020_Apr_S8 = ['2020-04-20','2020-04-25'];
var date2020_Apr_S7 = ['2020-04-13','2020-04-18'];
var date2020_Apr_S6 = ['2020-04-06','2020-04-11'];
var date2020_Apr_S5 = ['2020-03-30','2020-04-04'];
var date2020_Mar_S4 = ['2020-03-23','2020-03-28'];
var date2020_Mar_S3 = ['2020-03-16','2020-03-21'];
var date2020_Mar_S2 = ['2020-03-09','2020-03-14'];
var date2020_Mar_S1 = ['2020-03-02','2020-03-07'];
//
var date2019_Jun_S14 = ['2019-06-03','2019-06-06'];
var date2019_Apr_S13 = ['2019-05-27','2019-06-01'];
var date2019_Apr_S12 = ['2019-05-20','2019-05-25'];
var date2019_Apr_S11 = ['2019-05-13','2019-05-18'];
var date2019_Apr_S10 = ['2019-05-06','2019-05-11'];
var date2019_Apr_S9 = ['2019-04-29','2019-05-04'];
var date2019_Apr_S8 = ['2019-04-22','2019-04-27'];
var date2019_Apr_S7 = ['2019-04-15','2019-04-20'];
var date2019_Apr_S6 = ['2019-04-08','2019-04-13'];
var date2019_Apr_S5 = ['2019-04-01','2019-04-06'];
var date2019_Mar_S4 = ['2019-03-25','2019-03-30'];
var date2019_Mar_S3 = ['2019-03-18','2019-03-23'];
var date2019_Mar_S2 = ['2019-03-11','2019-03-16'];
var date2019_Mar_S1 = ['2019-03-04','2019-03-09'];
//
//*** MONTHS
var date2020_May = ['2020-05-01','2020-06-01'];
var date2020_Apr = ['2020-04-01','2020-05-01'];
var date2020_Mar_S0 = ['2020-03-01','2020-04-01'];
//
var date2019_May = ['2019-05-01','2019-06-01'];
var date2019_Apr = ['2019-04-01','2019-05-01'];
var date2019_Mar_S0 = ['2019-03-01','2019-04-01'];
//*************************************************
var Sentinel_images = {
  // 'Aerosol (Sentinel-5): 2020/03/26': S5P_img4.visualize({min:-2, max:4, opacity: 1.0,palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}),
  'NO2 (Sentinel-5): 01 - 03 Jun 2020': S5P_NO2_NRT_Selection(date2020_Jun_S14),
  'NO2 (Sentinel-5): MAY 2020': S5P_NO2_NRT_Selection(date2020_May),
  'NO2 (Sentinel-5): 25 - 29 May 2020': S5P_NO2_NRT_Selection(date2020_Apr_S13),
  'NO2 (Sentinel-5): 18 - 22 May 2020': S5P_NO2_NRT_Selection(date2020_Apr_S12),
  'NO2 (Sentinel-5): 11 - 15 May 2020': S5P_NO2_NRT_Selection(date2020_Apr_S11),
  'NO2 (Sentinel-5): 04 - 08 May 2020': S5P_NO2_NRT_Selection(date2020_Apr_S10),
  'NO2 (Sentinel-5): APRIL 2020': S5P_NO2_NRT_Selection(date2020_Apr),
  'NO2 (Sentinel-5): 27Apr - 01May 2020': S5P_NO2_NRT_Selection(date2020_Apr_S9),
  'NO2 (Sentinel-5): 20Apr - 24Apr 2020': S5P_NO2_NRT_Selection(date2020_Apr_S8),
  'NO2 (Sentinel-5): 13 - 17 Apr 2020': S5P_NO2_NRT_Selection(date2020_Apr_S7),
  'NO2 (Sentinel-5): 06 - 10 Apr 2020': S5P_NO2_NRT_Selection(date2020_Apr_S6),
  'NO2 (Sentinel-5): 30Mar - 03Apr 2020': S5P_NO2_NRT_Selection(date2020_Apr_S5),
  'NO2 (Sentinel-5): MARCH 2020': S5P_NO2_NRT_Selection(date2020_Mar_S0),
  'NO2 (Sentinel-5): 23 - 27 Mar 2020': S5P_NO2_NRT_Selection(date2020_Mar_S4),
  'NO2 (Sentinel-5): 16 - 20 Mar 2020': S5P_NO2_NRT_Selection(date2020_Mar_S3),
  'NO2 (Sentinel-5): 09 - 10 Mar 2020': S5P_NO2_NRT_Selection(date2020_Mar_S2),
  'NO2 (Sentinel-5): 02 - 06 Mar 2020': S5P_NO2_NRT_Selection(date2020_Mar_S1),
  //
  'NO2 (Sentinel-5): 03 - 05 Jun 2019': S5P_NO2_NRT_Selection(date2019_Jun_S14),
  'NO2 (Sentinel-5): MAY 2019': S5P_NO2_NRT_Selection(date2019_May),
  'NO2 (Sentinel-5): 27 - 31 May 2019': S5P_NO2_NRT_Selection(date2019_Apr_S13),
  'NO2 (Sentinel-5): 20 - 24 May 2019': S5P_NO2_NRT_Selection(date2019_Apr_S12),
  'NO2 (Sentinel-5): 13 - 17 May 2019': S5P_NO2_NRT_Selection(date2019_Apr_S11),
  'NO2 (Sentinel-5): 06 - 10 May 2019': S5P_NO2_NRT_Selection(date2019_Apr_S10),
  'NO2 (Sentinel-5): APRIL 2019': S5P_NO2_NRT_Selection(date2019_Apr),
  'NO2 (Sentinel-5): 29Apr - 03May 2019': S5P_NO2_NRT_Selection(date2019_Apr_S9),
  'NO2 (Sentinel-5): 22 - 27 Apr 2019': S5P_NO2_NRT_Selection(date2019_Apr_S8),
  'NO2 (Sentinel-5): 15 - 19 Apr 2019': S5P_NO2_NRT_Selection(date2019_Apr_S7),
  'NO2 (Sentinel-5): 08 - 12 Apr 2019': S5P_NO2_NRT_Selection(date2019_Apr_S6),
  'NO2 (Sentinel-5): 01 - 05 Apr 2019': S5P_NO2_NRT_Selection(date2019_Apr_S5),
  'NO2 (Sentinel-5): MARCH 2019': S5P_NO2_NRT_Selection(date2019_Mar_S0),
  'NO2 (Sentinel-5): 25 - 29 Mar 2019': S5P_NO2_NRT_Selection(date2019_Mar_S4),
  'NO2 (Sentinel-5): 18 - 22 Mar 2019': S5P_NO2_NRT_Selection(date2019_Mar_S3),
  'NO2 (Sentinel-5): 11 - 15 Mar 2019': S5P_NO2_NRT_Selection(date2019_Mar_S2),
  'NO2 (Sentinel-5): 04-08 Mar 2019': S5P_NO2_NRT_Selection(date2019_Mar_S1),
};
//
//*******************************************************************************************
// 4. Functions
//*******************************************************************************************
//***********************************************************************************************
// NO2 S5P - VIIRS
//************************************************************************************************
function S5P_NO2_NRT_Selection(date) {
  var S5P_NRTI_NO2_dataset = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2');
  var S5P_NRTI_NO2 = S5P_NRTI_NO2_dataset
    // .select('NO2_column_number_density')
    .select('tropospheric_NO2_column_number_density')
    .filterDate(date[0],date[1]);
  var band_NO2_viz = {
    min: 0.000002,
    max:  0.000080,
    // max:  0.000160,
    opacity: 0.80,
    // palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
    // palette: ['0000C0','0420FD','1443FF','2D74FF','3E95FF','53AAFF','69BFFF','7CD0FF','88DCFF','95E9FF','A2F0FF','B4F7FF','C7FFFF','D8FFFF','EDFFFF','FFFFFF','FFFFAB','FFFF46','FFFD00','FFE900','FFD400','FFC100','FFA300','FF8700','FF6500','FF3100','FF0000','EB0000','D00000','BD0000','820000']
    palette:['0000C0','0420FD','1443FF','2D74FF','3E95FF','53AAFF','69BFFF','7CD0FF','88DCFF','95E9FF','A2F0FF','B4F7FF','C7FFFF','D8FFFF','EDFFFF','FFFFFF','FFFFAB','FFFF46','FFFD00','FFE900','FFD400','FFC100','FFA300','FF8700','FF6500','FF3100','FF0000','EB0000','D00000','BD0000','820000']
  };
  // Map.addLayer(collection.mean(), band_viz, 'S5P N02');
  var S5P_NRTI_NO2_mean = S5P_NRTI_NO2.mean();
  return S5P_NRTI_NO2_mean.visualize(band_NO2_viz);
}
//*******************************************************************************************
// 5.3 Defining Widgets/Panels
//*******************************************************************************************
//
// Create the LEFT map, and have it display layer 1.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 17, 'top-left');
// Create the RIGHT map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 0, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  //var label = ui.Label('SAR SENTINEL-1');
  var label0 = ui.Label({
  value: 'AIR QUALITY - NO2 (SENTINEL-5P)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });
  //var label1 = ui.Label();
  // var label1 = ui.Label({
  // //value: 'Sentinel-1/2/5P (ESA) - MODIS (NASA)',
  // value: ' * Left: Use "Aerosol" to see active fires',
  // style: {
  //   fontWeight: 'normal',
  //   fontSize: '11px',
  //   margin: '0 0 4px 0',
  //   padding: '0'
  //   }
  // });
  // var label2 = ui.Label({
  // //value: 'Updated: Sep 16, 2019 (ACCA)',
  // value: ' ** Right: Use "Image" to see satellite images',
  // style: {
  //   //fontWeight: 'light',
  //   fontWeight: 'normal',
  //   //fontSize: '12px',
  //   fontSize: '11px',
  //   margin: '0 0 4px 0',
  //   padding: '0'
  //   }
  // /*var label3 = ui.Label({
  // value: 'Updated: Aug 14, 2019 (ACCA)',
  // style: {
  //   fontWeight: 'light',
  //   //fontStyle: 'italic',
  //   fontSize: '12px',
  //   margin: '0 0 4px 0',
  //   padding: '0'
  //   }*/
  // });
  // This function changes the given map to show the selected image.
  var geometry = ee.Geometry.Point(-57, -16.566);
  Map.onClick(function(coords) {
  //Map.layers().remove(Map.layers().get(0));
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(geometry, {color: 'green'});
  //Map.layers().set(0, dot);
  //print(lon);
  //print(lat);
  });
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(Sentinel_images[selection]));
    //mapToChange.layers().set(1, ui.Map.Layer(ROI_Border,{palette: '0FFF00'}, 'RNTB'));
    // mapToChange.layers().set(1, ui.Map.Layer(ROI_Border,{palette: 'D9D9D9'}, 'Limites'));
    mapToChange.layers().set(1, ui.Map.Layer(ROI_Border,{palette: 'D9D9D9'}, 'Limites'));
    // mapToChange.layers().set(2, ui.Map.Layer(Lima_y_Callao_Border,{palette: '000000'}, 'Lime y Callao'));
    // mapToChange.layers().set(2, ui.Map.Layer(Ecuador_Border,{palette: '000000'}, 'Lime y Callao'));
    // mapToChange.layers().set(3, ui.Map.Layer(geometry, {color: 'green'}));
    //mapToChange.layers().set(2, ui.Map.Layer(Fire_Detected_1,{color: 'FF0000', opacity: 0.8}, 'Active Fire'));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(Sentinel_images), onChange: updateMap});
  select.setValue(Object.keys(Sentinel_images)[defaultValue], true);
  var controlPanel = ui.Panel({
    widgets: [
      label0,
      ui.Label('-----------------------------------------------------------------------------', {fontSize: '9px',fontWeight: 'bold'}),
      // label1,
      // label2,
      //ui.Label('--------------------------------------------------', {fontSize: '9px',fontWeight: 'bold'}),
      ui.Label('Weekdays (Monday - Friday)/Months', {fontSize: '12px',fontWeight: 'bold',color: 'ff0000'}),
      select,
      //app.baseg.panel
     // baseg.panel
    ], 
    style: {position: position}});
  mapToChange.add(controlPanel);
}
// Tie everything together
//###########################################
// Adding Coordinates
//#########################################
// Create panels to hold lon/lat values.
// Create a panel to hold our widgets.
// var panelCoordinates = ui.Panel({
// style: {
// position: 'bottom-right',
// padding: '4px 5px'
// }
// });
// //var panelCoordinates = ui.Panel();
// //panel.style().set('width', '450px');
// // Create an intro panel with labels.
// var intro = ui.Panel([
//   /*ui.Label({
//     value: 'Test Click',
//     style: {fontSize: '26px', fontWeight: 'bold'}
//   }),*/
//   ui.Label('Coordinates',{fontSize: '15px', fontWeight: 'bold'})
// ]);
// panelCoordinates.add(intro);
// var lon = ui.Label();
// var lat = ui.Label();
// panelCoordinates.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
//Map.setOptions('SATELLITE');
//Map.style().set('cursor', 'crosshair');
// Create a SplitPanel to hold the adjacent, linked maps.
leftMap.add(legend);
leftMap.add(legendS5P);
// rightMap.add(panelCoordinates);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//leftMap.setCenter(-70.031418, -12.984309, 12);
//leftMap.setCenter(-58.8884, -19.6876, 8);
//leftMap.setCenter(-61.5773, -17.0028,8);
//leftMap.setCenter(-61, -16.566,6);
leftMap.setCenter(-75, -9,6);
// leftMap.setOptions('SATELLITE');
// rightMap.setOptions('SATELLITE');
var style = require('users/bullocke/amazon:figures/style');
var darkStyle = style.darkStyle;
leftMap.setOptions('Dark',darkStyle);
rightMap.setOptions('Dark',darkStyle);