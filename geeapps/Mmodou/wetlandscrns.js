var roi = ui.import && ui.import("roi", "table", {
      "id": "users/chaponda/Mexico/Contours-20m"
    }) || ee.FeatureCollection("users/chaponda/Mexico/Contours-20m"),
    demAll = ui.import && ui.import("demAll", "image", {
      "id": "NASA/NASADEM_HGT/001"
    }) || ee.Image("NASA/NASADEM_HGT/001"),
    region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -68.48928797247551,
                -16.41150647936885
              ],
              [
                -68.41616022589348,
                -16.422374225507607
              ],
              [
                -68.3296428919091,
                -16.420068996779
              ],
              [
                -68.23866236212395,
                -16.45629085744424
              ],
              [
                -68.11437952520988,
                -16.481642136848134
              ],
              [
                -67.92623865606926,
                -16.427972524319138
              ],
              [
                -67.87611353399895,
                -16.30971544407049
              ],
              [
                -68.00485956671379,
                -15.99313502578743
              ],
              [
                -68.43538630011223,
                -16.025805754545136
              ],
              [
                -68.45770227911613,
                -16.267534053786882
              ],
              [
                -68.46388208868645,
                -16.303784234517963
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-68.48928797247551, -16.41150647936885],
          [-68.41616022589348, -16.422374225507607],
          [-68.3296428919091, -16.420068996779],
          [-68.23866236212395, -16.45629085744424],
          [-68.11437952520988, -16.481642136848134],
          [-67.92623865606926, -16.427972524319138],
          [-67.87611353399895, -16.30971544407049],
          [-68.00485956671379, -15.99313502578743],
          [-68.43538630011223, -16.025805754545136],
          [-68.45770227911613, -16.267534053786882],
          [-68.46388208868645, -16.303784234517963]]]),
    vizs = ui.import && ui.import("vizs", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "red",
          "green",
          "blue"
        ],
        "min": -0.03364527687430382,
        "max": 0.7513814689218998,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["red","green","blue"],"min":-0.03364527687430382,"max":0.7513814689218998,"gamma":1},
    lines = ui.import && ui.import("lines", "table", {
      "id": "users/chaponda/Mexico/Reach-Tuni-Condoriri-HuaynaPotosi"
    }) || ee.FeatureCollection("users/chaponda/Mexico/Reach-Tuni-Condoriri-HuaynaPotosi"),
    country = ui.import && ui.import("country", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1"),
    bas = ui.import && ui.import("bas", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -68.34743806498426,
                -16.343259490288727
              ],
              [
                -68.33988496439832,
                -16.309982193655127
              ],
              [
                -68.35945436137098,
                -16.264834644493234
              ],
              [
                -68.39618989603895,
                -16.273733158861464
              ],
              [
                -68.39241334574598,
                -16.33403466840148
              ],
              [
                -68.3553344883241,
                -16.343259490288727
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-68.34743806498426, -16.343259490288727],
          [-68.33988496439832, -16.309982193655127],
          [-68.35945436137098, -16.264834644493234],
          [-68.39618989603895, -16.273733158861464],
          [-68.39241334574598, -16.33403466840148],
          [-68.3553344883241, -16.343259490288727]]]),
    haut = ui.import && ui.import("haut", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -68.30898591654676,
                -16.292188050502073
              ],
              [
                -68.27671357767957,
                -16.300096758085758
              ],
              [
                -68.24718782084364,
                -16.31228872349153
              ],
              [
                -68.21628877299207,
                -16.30207388510994
              ],
              [
                -68.21697541849989,
                -16.259561260506562
              ],
              [
                -68.26366731303114,
                -16.245717954137326
              ],
              [
                -68.30108949320692,
                -16.25000289125025
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-68.30898591654676, -16.292188050502073],
          [-68.27671357767957, -16.300096758085758],
          [-68.24718782084364, -16.31228872349153],
          [-68.21628877299207, -16.30207388510994],
          [-68.21697541849989, -16.259561260506562],
          [-68.26366731303114, -16.245717954137326],
          [-68.30108949320692, -16.25000289125025]]]),
    CHIRPS = ui.import && ui.import("CHIRPS", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    bol = ui.import && ui.import("bol", "image", {
      "id": "users/chaponda/Mexico/laPazeRegion"
    }) || ee.Image("users/chaponda/Mexico/laPazeRegion"),
    point = ui.import && ui.import("point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -68.28579402514282,
            -16.26308678038219
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([-68.28579402514282, -16.26308678038219]);
// modou app mexicop 2
var utils = require('users/gena/packages:utils')
var bolivia=country.filter(ee.Filter.eq('ADM1_NAME','La Paz'))
var buffer=point.buffer(14000)
Map.centerObject(point, 12)
Map.setOptions('TERRAIN')
Map.addLayer(bol.clip(buffer),vizs, 'bol')
Map.addLayer(roi,{},'Countours',false)
Map.addLayer(lines.draw('blue',1,1),{},'waterLine')
 /**********************************************************************************************************************************************************************************
  * side panel 2
  * **********************************************************************************************************************************************************************************/
 var side_panel2 = ui.Panel();
 side_panel2.style().set('width', '15%');
 var header2 = ui.Label("Temporal Dynamics of Soil Moisture retrieval Based on Sentinel 1 ",
 {fontSize: '25px',textAlign:'center' ,color: 'black', fontWeight: 'bold'}); 
 side_panel2.add(header2)
 var peruZoom = new ui.Button({
   label: 'Peru',
   style: {stretch: 'horizontal'},
   onClick: function() {
       Map.setCenter(-75.88187713951326,-11.034859972685124, 12)
       Map.setOptions('TERRAIN')
     }
 });
 var boleviaZoom = new ui.Button({
   label: 'Bolivia',
   style: {stretch: 'horizontal'},
   onClick: function() {
       Map.setCenter(-68.27669049318614, -16.26730678536522, 12)
       Map.setOptions('TERRAIN')
       Map.addLayer(roi,{},'Countours',false)
       Map.addLayer(lines.draw('blue',1,1),{},'waterLine')
     }
 });
 var malemZoom = new ui.Button({
   label: 'La Plaze',
   style: {stretch: 'horizontal'},
   onClick: function() {
       Map.setCenter(-68.35469633002155, -16.307477349393945, 12)
       Map.setOptions('TERRAIN')
     }
 });
 var contactLabel = ui.Label({
     value: 'Contact: modou.mbaye@isra.sn', 
     style: {fontSize: '11px',
             stretch: 'vertical',
             maxWidth: '120px'
     }
 })
 var exampleLocations = new ui.Panel({
     widgets: [boleviaZoom,peruZoom],
     layout: ui.Panel.Layout.flow('horizontal'),
 });
 side_panel2.add(exampleLocations)
  /**********************************************************************************************************************************************************************************
  * 
  * **********************************************************************************************************************************************************************************/
 var localization=bolivia
 var now=ee.Date(Date.now())
 var boxcar = ee.Kernel.circle(3);
 var soilmoisture = ee.ImageCollection("COPERNICUS/S1_GRD")
                   .filterBounds(localization)
                   .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                   .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                   .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
                   .filterDate(now.advance(-4,'years'),now)
                   .map(function(image){
                     return image.clip(localization)
                                 .select(['VV'])
                                 .convolve(boxcar)
                                 .multiply(0.0222)
                                 .add(0.4945)
                                 .rename('SSM')
                                 .copyProperties(image, ['system:time_start'])
                   })
  var S2=ee.ImageCollection('COPERNICUS/S2')
         .filterDate(now.advance(-4,'years'),now)
         .filterBounds(localization)
         .select('B2','B3','B4','B8','B11','B12')
         .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',25)
         .map(function(image){ 
           return image.addBands(image.normalizedDifference(['B8','B4']).rename('ndvi'))
         }); 
 var long=ui.Label({style:{fontSize:'15px',fontWeight:'bold',fontFamily:'sherif'}})
 var lat=ui.Label({style:{fontSize:'15px',fontWeight:'bold',fontFamily:'sherif'}})
 side_panel2.add(ui.Panel([long,lat],ui.Panel.Layout.flow('horizontal')));
/**********************************************************************************************************************
***********************************************************************************************************************/
 Map.onClick(function(coords){
 Map.layers().remove(Map.layers().get(0));
 long.setValue('  longitude   : ' + coords.lon.toFixed(3))
 lat.setValue('  latitude   : '  + coords.lat.toFixed(3))
 var point=ee.Geometry.Point(coords.lon,coords.lat)
 var layer=ui.Map.Layer(point,{color:'black'})
 var chartNDVI=ui.Chart.image.doySeriesByYear(S2,'ndvi',point,ee.Reducer.mean(),30).setChartType('ScatterChart')
         .setOptions({
           title: 'Normalized Difference Vegetation Index NDVI',
           hAxis:{title:'Dates', gridlines: {count: 7}},
           vAxis:{title:'Vegetation Index (NDVI)'}, 
         });
 var chartSSM = ui.Chart.image.doySeriesByYear(soilmoisture,'SSM',point,ee.Reducer.mean(),30)
                 .setChartType('ScatterChart')
                 .setOptions({ title: 'Top Surface (0-30cm) Soil Moisture',
                 vAxis: {title: 'VWC (cm3/cm3)'},hAxis: {title: 'Date', gridlines: {count: 7}},});
 side_panel2.widgets().set(3,chartSSM); 
 side_panel2.widgets().set(4,chartNDVI);
 }); 
 Map.style().set('cursor','crosshair');
 /**********************************************************************************************************************************************************************************
  * side panel FIN
  * **********************************************************************************************************************************************************************************/
/*************************************************************************************************************************
* panel 
* *************************************************************************************************************************/ 
var featureBas = ee.Feature(haut,{"Class":1}).set("name","Low Fond")
var featureHaut = ee.Feature(bas,{"Class":2}).set("name","High Altitude")
var FC = ee.FeatureCollection([featureBas,featureHaut])
/*************************************************************************************************************************
* 
* *************************************************************************************************************************/ 
 var panel = ui.Panel({style:{width:"400px"}})
 var selDate1 = ui.Select({placeholder: "Select a date1"})
 var selDate2 = ui.Select({placeholder: "Select a date2"})
 var button = ui.Button({
   label: "Calculate Soil Moisture",
   onClick: function (){ssmTotals(selDate1.getValue(), selDate2.getValue());}
 })
 // High-Resolution Soil Moisture Map in Wetlands of the High Andes Using C-Band Radar Sentinel-1 Data
 var header = ui.Label("High-Resolution Soil Moisture Map in Wetlands of the High Andes Using C-Band Radar Sentinel-1 Data",
 {fontSize: '25px',textAlign:'center' ,color: 'black', fontWeight: 'bold'}); 
 var texts = ui.Label({
               value: "In this section, the user can select a date range to visualize the,"+
                     "temporal dynamics of the soil moisture. this allows to better see"+
                     " the evolution and to compare according to the low altitude areas" +
                     " to the high altitude areas. the time interval is according to a period" +
                     " of one year calculated from today's date ",style: {fontSize: '12px', color: 'grey'}});
 texts.style().set({textAlign:'justify'});
 ///////////////////////////////////// Create a list of days for our Dropdown box //////////
 function getDates(){
   var todayDate = ee.Date(Date.now());
   var startDate = todayDate.advance(-1, "years");
   var daysDifference = todayDate.difference(startDate, "day");
   var listOfDays = ee.List.sequence(1, daysDifference,20).map(EstimateDateFromDays);
   function EstimateDateFromDays(numberOfDays){
     var currentDate = startDate.advance(numberOfDays, "day").format("yyyy-MM-dd");
     return currentDate
     }
   return listOfDays
 }
 var dateList = getDates()
 /*************************************************************************************************************************
*  Introduce the list within the dropdown boxes (ui. Select)
* Create a function that will be used as an argument for function evaluate
* It will move the list of dates from from server side to a client side.
* *************************************************************************************************************************/ 
 function clientSide (DateList_client){
   selDate1 = ui.Select({
     items: DateList_client,
     placeholder: "Select a date"
   })
   selDate2 = ui.Select({
     items: DateList_client,
     placeholder: "Select a date"
   })
   panel.add(header)
   panel.add(texts)
   var examplewidget = new ui.Panel({
    widgets: [selDate1, selDate2, button],
    layout: ui.Panel.Layout.flow('horizontal')})
    panel.add(examplewidget)
 }
 ////////////////////////////////////////// Add widgets within the panel and dates within the widgets (client side)
 var callback = dateList.evaluate(clientSide)
 /////////////////////////////////////////// Create function to plot and display spatial and temporal evolution of rainfall
 function ssmTotals(fromDate, toDate){
   //Map.clear()
   var AOI = FC;
   var ssm = soilmoisture.filterDate(fromDate, toDate).select("SSM").sum().rename("Acc_ssm")
   var stats = ssm.reduceRegion(ee.Reducer.minMax(), FC, 10)
   stats.evaluate(function(thisDictionary){
     var visible = {min: thisDictionary.Acc_ssm_min,
                   max: thisDictionary.Acc_ssm_max,
                   palette:["red", "orange","green","blue"]};
     Map.addLayer(ssm.clip(buffer), visible, "SSM",1)
     // Map.addLayer(rgb,vizs, 'DEM')
   })
   var chart = ui.Chart.image.seriesByRegion({
     imageCollection:soilmoisture.filterDate(fromDate, toDate),
     regions: FC,
     reducer: ee.Reducer.mean(),
     band: "SSM",
     scale: 30,
     xProperty: "system:time_start",
     seriesProperty:"name"})
     .setOptions({
           title: 'Soil Moisture',
           hAxis:{title:'Dates', gridlines: {count: 7}},
           vAxis:{title:'mositure (cm3/cm3)'}, 
         });
 panel.widgets().set(3,chart)
 //panel.widgets().set(4,chartET)
 }
ui.root.insert(0,side_panel2)
ui.root.insert(3,panel)