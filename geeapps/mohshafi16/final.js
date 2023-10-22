//*******************************************************************************************
// Details of Sentinel 2 and Landsat 8 Satelllites are provided in instruction . 
//Select the platform accordingly to calculate NBR, NDVI, DNBR and fulfill your needs for analysis.
///This project also contains MODIS FIRMS data with a daily coverage of the whole earth
//and a resolution of 1 km per pixel. The near-real-time (NRT) active fire locations are
//processed by LANCE using the standard MODIS MOD14/MYD14 Fire and Thermal Anomalies product.
// The FIRMS data of MODIS and VIIRS is visualized in chart later when you press submit.
// The FIRMS data is clipped to contain only the chosen and marked Buffer. 
// Inserting the extra data
var villages = ee.FeatureCollection('users/mohshafi16/villagesall'),
    mergedVIIRS = ee.FeatureCollection("users/mohshafi16/MergedVIIRS"),
    sudan_bound = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').filter(ee.Filter.eq('country_co','SU')),
    GHSL = ee.Image('users/mohshafi16/GHSL'),
    // OSM Roads and Landuse are as of January 2020 
    landuse_osm = ee.FeatureCollection('users/mohshafi16/landuse_Sudan'),
    roads_sudan = ee.FeatureCollection('users/mohshafi16/roads_sudan'),
    studyarea = 
    ee.Geometry.Polygon(
        [[[22.987625977718153, 14.706861331195492],
          [22.987625977718153, 11.57257842714209],
          [26.140702149593153, 11.57257842714209],
          [26.140702149593153, 14.706861331195492]]], null, false);
// night lights data from NOAA period 1992-2014
var dataset1 = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
                  .filter(ee.Filter.date('2013-01-01', '2014-12-31'));
var nighttimeLights = dataset1.select('avg_vis');
// function for cloud mask of Landsat 8
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// function for Cloud Mask of Sentinel 2
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000)
  // these properties should be copied otherwise the charts will
        .copyProperties(image, ['system:time_start']);
}
// //// function to calculate NDVI Landsat 8 /////////
function addNDVI(image) {
    var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
    return image.addBands(ndvi);
        }
 ///// Function to calculate Normalized Burn Ratio (NBR) Landsat 8 //////////////
function addNBR(image) {
    var nbr = image.normalizedDifference(['B5', 'B7']).rename('NBR'); 
    return image.addBands(nbr);
        }
// //// function to calculate both NDVI and NBR for Landsat 8 at the same time /////////
function addboth(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var nbr = image.normalizedDifference(['B5', 'B7']).rename('NBR');
  return image.addBands(ndvi).addBands(nbr);
}
// //// function to calculate NDVI S2 /////////
function addNDVIs(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return image.addBands(ndvi)
    // these properties should be copied otherwise the charts will not be displayed
    .copyProperties(image, ['system:time_start']);
        }
 ///// Function to calculate Normalized Burn Ratio (NBR) S2 //////////////
function addNBRs(image) {
    var nbr = image.normalizedDifference(['B8', 'B12']).rename('NBR'); 
    return image.addBands(nbr)
    // these properties should be copied otherwise the charts will not be dispalyed
    .copyProperties(image, ['system:time_start']);
        }        
// //// function to calculate both NDVI and NBR for Sentinel 2 at the same time /////////
function addboths(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  var nbr = image.normalizedDifference(['B8', 'B12']).rename('NBR');
  return image.addBands(ndvi).addBands(nbr);
}
// SET UP PRIMARY PANELS
// control panel
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px'}
});
// map panel when the app loads the first time
var map = ui.Map();
map.addLayer(landuse_osm, {color: 'purple'}, 'OSM Land Use');
map.addLayer(roads_sudan, {color: 'white'}, 'OSM Roads');
map.addLayer(villages,{color: 'blue'},'All Villages');
map.setCenter(24.32545, 13.12803, 11);
map.setControlVisibility({all: true});
map.style().set({cursor:'hand'});
map.setOptions('HYBRID');
// Get Lat and Long when clicked
map.onClick(function(coords) {
  var x = coords.lon.toFixed(5);
  var y = coords.lat.toFixed(5);
  lonValue.setValue(x);
  latValue.setValue(y);
  // Add a red dot to the map where the user clicked.
  var click_point = ee.Geometry.Point(coords.lon,coords.lat);
  map.layers().set(3, ui.Map.Layer(click_point, {color: 'FF0000'},'Clicked point'));
});
var intro = ui.Panel([
  ui.Label({
    value: 'Affected Villages in Sudan',
    style: {fontSize: '20px', fontWeight: 'bold', Color : 'brown'}
  }),
  ui.Label('Please choose all required parameters marked with * and click on the submit button.')
]);
// SET UP SUB-PANELS
// Create a FeatureCollection from the list 
var name_property = 'NAME';
// Get Village Names from Column 'Name' of villages featureCollection
var allvlg = ee.List(villages.toList(villages.size()).map(function(feat){return ee.String(ee.Feature(feat).get(name_property))}));
// Define dropdown
var vlgSelect = ui.Select({items: allvlg.getInfo(), placeholder: 'Choose a village', style:{stretch: 'horizontal'},});
var vlgLabel = ui.Label('1) Select the location *', {fontWeight: 'bold'});
var vlgPanel = ui.Panel([vlgLabel,vlgSelect], null, {stretch: 'horizontal'});
// Satellite panel
var satLabel = ui.Label('2) Select Platfrom *',{fontWeight: 'bold'});
var satList = ['Landsat 8','Sentinel 2'];
var satSelect = ui.Select({items:satList, value:'Landsat 8', style:{stretch: 'horizontal'}});
var satPanel = ui.Panel([satLabel,satSelect], null, {stretch: 'horizontal'});
// date panel
var dateSectionLabel = ui.Label('3) Define Date Range *',{fontWeight: 'bold'});
var startDayLabel =  ui.Label({value : 'Start date (YYYY-MM-DD)', style: {color: 'gray'}});
var startDayBox = ui.Textbox('YYYY-MM-DD', '2016-01-01');
//startDayBox.style().set('stretch', 'horizontal');
var endDayLabel = ui.Label({value : 'End date (YYYY-MM-DD)', style: {color: 'gray'}});
var endDayBox = ui.Textbox('YYYY-MM-DD', '2019-01-01');
// var x= ui.Label({ value: 'Loading...', style: {color: 'gray'}});
//endDayBox.style().set('stretch', 'horizontal');
var datesPanel = ui.Panel(
  [
    dateSectionLabel,
    ui.Panel(
      [startDayLabel, startDayBox, endDayLabel, endDayBox]
    )
  ]
);
// Cloud Mask panel
var cloudSectionLabel = ui.Label('4) Cloud Cover Mask *',{fontWeight: 'bold'});
var cloudLabel = ui.Label({value :'Max Cloud %', style: {color: 'gray'}});
var cloudcoverslider = ui.Slider({min:0, max:100, value:30, step:1});
cloudcoverslider.style().set('stretch', 'horizontal');
var cloudPanel = ui.Panel(
  [
    cloudSectionLabel,
    ui.Panel([cloudLabel, cloudcoverslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}), //
  ] 
);
// index panel
var indexLabel = ui.Label('5) Select Index *',{fontWeight: 'bold'});
var indexList = ['NDVI','NBR','DNBR','All'];
var indexSelect = ui.Select({items:indexList, value:'NBR', style:{stretch: 'horizontal'}});
var indexPanel = ui.Panel([indexLabel,indexSelect], null, {stretch: 'horizontal'});
// buffer panel
var bufferSectionLabel = ui.Label('6) Define the size of buffers around village (km).' + 
' Also Check mark one of the buffers to see FIRMS data within that buffer only ',{fontWeight: 'bold'});
var bufferBoxLabel1 = ui.Label('Buffer 1 size'),
    bufferBox1 = ui.Textbox({value: 0.5}),
    bufferBoxLabel2 = ui.Label('Buffer 2 size'),
    bufferBox2 = ui.Textbox({value: 0.7}),
    bufferBoxLabel3 = ui.Label('Buffer 3 size'),
    bufferBox3 = ui.Textbox({value: 1.5}),
    FIRMScropbuff1 = ui.Checkbox(),
    FIRMScropbuff2 = ui.Checkbox(),
    FIRMScropbuff3 = ui.Checkbox();
FIRMScropbuff3.setValue(true);    
FIRMScropbuff1.onChange(function(checked) {
      FIRMScropbuff2.setValue(false);
      FIRMScropbuff3.setValue(false);
   });
FIRMScropbuff2.onChange(function(checked) {
      FIRMScropbuff1.setValue(false);
      FIRMScropbuff3.setValue(false);
   });
FIRMScropbuff3.onChange(function(checked) {
      FIRMScropbuff1.setValue(false);
      FIRMScropbuff2.setValue(false);
   });   
var bufferPanel = ui.Panel(
  [
    bufferSectionLabel,
    ui.Panel([bufferBoxLabel1,bufferBox1,FIRMScropbuff1], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
    ui.Panel([bufferBoxLabel2,bufferBox2,FIRMScropbuff2], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
    ui.Panel([bufferBoxLabel3,bufferBox3,FIRMScropbuff3], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
  ]
);
// submit panel
var submitButton = ui.Button({
  label: 'SUBMIT',
  style:{stretch: 'horizontal', color:'red', fontWeight : '50'}, 
  onClick: function(){
    map.clear();
    var vlg = vlgSelect.getValue();
    var sat = satSelect.getValue();
    var startDay = startDayBox.getValue();
    var endDay = endDayBox.getValue();
    var cloud = cloudcoverslider.getValue();
    var index = indexSelect.getValue();
    var buffer1 = bufferBox1.getValue();
    var buffer2 = bufferBox2.getValue();
    var buffer3 = bufferBox3.getValue();
    var FIRMcroppedtobuff1 =FIRMScropbuff1.getValue();
    var FIRMcroppedtobuff2 =FIRMScropbuff2.getValue();
    var FIRMcroppedtobuff3 =FIRMScropbuff3.getValue();
    var geom = villages.filterMetadata(name_property, 'equals', vlg);
    var feature = ee.Feature(geom.first());
    var bufferkm1 = buffer1*1000,
        bufferkm2 = buffer2*1000,
        bufferkm3 = buffer3*1000;
    var point1 = feature.buffer(bufferkm1),
        point2 = feature.buffer(bufferkm2),
        point3 = feature.buffer(bufferkm3);
    map.centerObject(feature, 13);
    var layers = map.layers();
    if (index == 'NBR'){    
        // Get Lat and Long when clicked
        map.onClick(function(coords) {
          var x = coords.lon.toFixed(5);
          var y = coords.lat.toFixed(5);
          lonValue.setValue(x);
          latValue.setValue(y);
      // Add a red dot to the map where the user clicked.
        var click_point = ee.Geometry.Point(coords.lon,coords.lat);
        map.layers().set(11, ui.Map.Layer(click_point, {color: 'FF0000'},'Clicked point'));
    });
    } else if (index == 'NDVI'){    
        map.onClick(function(coords) {
          var x = coords.lon.toFixed(5);
          var y = coords.lat.toFixed(5);
          lonValue.setValue(x);
          latValue.setValue(y);
        var click_point = ee.Geometry.Point(coords.lon,coords.lat);
        map.layers().set(11, ui.Map.Layer(click_point, {color: 'FF0000'},'Clicked point'));
    });
    } else if (index == 'DNBR'){
        map.onClick(function(coords) {
          var x = coords.lon.toFixed(5);
          var y = coords.lat.toFixed(5);
          lonValue.setValue(x);
          latValue.setValue(y);
          var click_point = ee.Geometry.Point(coords.lon,coords.lat);
          map.layers().set(12, ui.Map.Layer(click_point, {color: 'FF0000'},'Clicked point'));
        });
    } else {
        map.onClick(function(coords) {
          var x = coords.lon.toFixed(5);
          var y = coords.lat.toFixed(5);
          lonValue.setValue(x);
          latValue.setValue(y);
          var click_point = ee.Geometry.Point(coords.lon,coords.lat);
          map.layers().set(14, ui.Map.Layer(click_point, {color: 'FF0000'},'Clicked point'));
        });
    }
   //////////////////////////// the main functions //////////////////////////
    var CloudmaskFunc = null;
    var percentage = null;
    var func = null;
    var bandstoselect= null;
    if (sat == 'Landsat 8'){
      sat = 'LANDSAT/LC08/C01/T1_SR';
      percentage = 'CLOUD_COVER';
      CloudmaskFunc = maskL8sr;
      bandstoselect = (['B2','B3','B4','B5','B7','pixel_qa']);
      if (index == 'NDVI'){
        func = addNDVI;
      }
      else if (index == 'NBR'){
        func = addNBR;
      }
      else if (index == 'DNBR'){
        func = addNBR; // calculate NBR first and then NBR in upcoming functions
      }
      else if (index == 'All'){
        func = addboth;
      }
    }
    else if (sat == 'Sentinel 2'){
      sat = 'COPERNICUS/S2';
      CloudmaskFunc = maskS2clouds;
      percentage = 'CLOUDY_PIXEL_PERCENTAGE';
      bandstoselect = (['B2','B3','B4','B8','B12','QA60']);
      if (index == 'NDVI'){
        func = addNDVIs;
      }
      else if (index == 'NBR'){
        func = addNBRs;
      }
     else if (index == 'DNBR'){
           func = addNBRs; // calculate NBR first and then NBR in upcoming functions
       }
      else if (index == 'All'){
        func = addboths;
      }
    }   
  var dataset = ee.ImageCollection(sat)
          .select(bandstoselect)
          .filterMetadata(percentage, 'less_than',cloud)
          .filterBounds(geom)
          .filterDate(startDay,endDay)
          .map(CloudmaskFunc)
          .map(func);
  var mod11 = ee.ImageCollection("MODIS/006/MOD11A2");
  // filter the data collection
  var temp =  mod11.filterDate(startDay, endDay)
    .sort('system:time_start', false)
    .filterBounds(studyarea) 
    .select("LST_Day_1km")
  // convert LST to celcius
  var toCelsius = function(image){
    var time = image.get('system:time_start')
    var celsius = image.multiply(0.02) // scale factor
                       .subtract(273.15) // from kelvin to C
                       .rename("Celcius")
                       .set('system:time_start',time)
    return celsius;
  };
  var CollectioninCelsius = temp.map(toCelsius)
  // define the chart titles.
  var title = {
    crosshair: { 
    trigger: 'both' ,
    opacity: 0.5 ,
    orientation: 'both'
    },
    title: 'Temperature Time Series - 8 day average from MODIS Landsurface Temperature (MOD11A2 V6) for whole study area',
    hAxis: {title: 'Time'},
    vAxis: {title: 'Temperature (C°)'},
  };
  // create the chart
  var tempchart = ui.Chart.image.seriesByRegion(CollectioninCelsius, 
                             studyarea, 
                             ee.Reducer.mean(), 
                             'Celcius', 
                              1000, 
                             'system:time_start', 
                             'PROJECT').setOptions(title);
  var DNBRImageCollection;
  var DNBRfirst; 
   if ( sat == 'LANDSAT/LC08/C01/T1_SR'){
      if (index == 'DNBR' ||	'All' ){
       DNBRImageCollection= addDNBR(dataset);
       DNBRfirst = DNBRImageCollection.first();
      }
        // function to calculate DNBR ///// Multiplied by 1000 to Match the USGS Standards for DNBR classification    
        function addDNBR (dataset){     
        //var imageNBR= addNBR(image)
        var datacollection= dataset.select('NBR');
        var sizeofData = datacollection.size().getInfo();
        var ListOfNBRImages = datacollection.toList(sizeofData);
        var DNBR = [];
        for (var j = 0; j < sizeofData-1; j++) {
            var preFire = ee.Image(ListOfNBRImages.get(j));
            var postFire = ee.Image(ListOfNBRImages.get(j+1));
            DNBR.push(preFire.subtract(postFire).rename('DNBR').multiply(1000).copyProperties(preFire, ['system:time_start']));
         }
          var newList = ee.List(DNBR);
          var DNBRImageCollection = ee.ImageCollection(newList);
           return DNBRImageCollection;
        }
    }
    else {
      if (index == 'DNBR'  ||	'All'){
           DNBRImageCollection= addDNBRs(dataset);
           DNBRfirst = DNBRImageCollection.first();
          }
            // function to calculate DNBR /////        
            function addDNBRs (dataset){     
            //var imageNBR= addNBR(image)
            var datacollection= dataset.select('NBR');
            var sizeofData = datacollection.size().getInfo();
            var ListOfNBRImages = datacollection.toList(sizeofData);
            var DNBR = [];
            for (var j = 0; j < sizeofData-1; j++) {
                var preFire = ee.Image(ListOfNBRImages.get(j));
                var postFire = ee.Image(ListOfNBRImages.get(j+1));
                DNBR.push(preFire.subtract(postFire).rename('DNBR').multiply(1000).copyProperties(preFire, ['system:time_start']));
             }
              var newList = ee.List(DNBR);
              var DNBRImageCollection = ee.ImageCollection(newList);
               return DNBRImageCollection;
            }
    }
// Define an SLD style of discrete intervals to apply to the image of DNBR.
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
    /// FIRMS Data Import and Visulalize
    var FIRMS = ee.ImageCollection('FIRMS')
              .filter( ee.Filter.date(startDay,endDay));
    var fires = FIRMS.select('T21');
    /// Function to reproject FIRMS to WGS84 Landsat scale
    var repl8 = function (image){
    return image.unitScale(-2000, 10000).reproject('EPSG:4326', null, 30); 
    };
    /// Function to reproject FIRMS to WGS84 Sentinel 2 scale
    var repS2 = function (image){
    return image.unitScale(-2000, 10000).reproject('EPSG:4326', null, 10); 
    };  
    // apply the reprojection functions according to satellite selected    
    if ( sat == 'LANDSAT/LC08/C01/T1_SR'){    
    var Firesrep = fires.map(repl8);
    }
    else if (sat == 'COPERNICUS/S2' ){
    var Firesrep = fires.map(repS2);
    }
  var Cliptothisbuffer_inchart = null;
  var buffernum = null;
  var clipped_VIIRS=null;
   if ( FIRMcroppedtobuff1=== true){
     Cliptothisbuffer_inchart = point1;
     buffernum = 'Buffer 1';
   // create function to crop FIRMS data with buffer 3 boundaries
      var point1_bounds = function(image) {
      return image.clip(point1);
        };
    //VIIRS part 
    var bufVIIRS1 = ee.Feature(point1).geometry().buffer(0.1);               
   /// The VIIRS layers to be added atfter submit is clicked /// 
    clipped_VIIRS= mergedVIIRS.filterBounds(bufVIIRS1);
    // clip the projcted  FIRMS to buffer 3   
    var FiresClipped1 = Firesrep.map(point1_bounds); 
    map.addLayer(FiresClipped1,{min: 325.0, max: 400.0,palette: ['red', 'orange', 'yellow'],}, 'FIRMS Fires (composite)'); 
    map.addLayer(clipped_VIIRS, {color : 'cyan'}, "VIIRS Recorded Fires", true);
    }  
    else if ( FIRMcroppedtobuff2 ===true){
     Cliptothisbuffer_inchart = point2;
     buffernum = 'Buffer 2';
   // create function to crop FIRMS data with buffer 3 boundaries
      var point2_bounds = function(image) {
      return image.clip(point2);
        };
       //VIIRS part 
    var bufVIIRS2 = ee.Feature(point2).geometry().buffer(0.1);               
   /// The VIIRS layers to be added atfter submit is clicked /// 
    clipped_VIIRS= mergedVIIRS.filterBounds(bufVIIRS2);
    // clip the projcted  FIRMS to buffer 2   
    var FiresClipped2 = Firesrep.map(point2_bounds); 
    map.addLayer(FiresClipped2,{min: 325.0, max: 400.0,palette: ['red', 'orange', 'yellow'],}, 'FIRMS Fires (composite)'); 
    map.addLayer(clipped_VIIRS, {color : 'cyan'}, "VIIRS Recorded Fires", true);
    } else {
     Cliptothisbuffer_inchart = point3;
     buffernum = 'Buffer 3';
   // create function to crop FIRMS data with buffer 3 boundaries
      var point3_bounds = function(image) {
      return image.clip(point3);
        };
    //VIIRS part 
    var bufVIIRS3 = ee.Feature(point3).geometry().buffer(0.01);               
   /// The VIIRS layers to be added atfter submit is clicked /// 
    clipped_VIIRS= mergedVIIRS.filterBounds(bufVIIRS3);
    // clip the projcted  FIRMS to buffer 3   
    var FiresClipped3 = Firesrep.map(point3_bounds); 
     map.addLayer(FiresClipped3,{min: 325.0, max: 400.0,palette: ['yellow', 'orange', 'red'], opacity : 0.5}, 'FIRMS Fires (composite)');
     map.addLayer(clipped_VIIRS, {color : 'cyan'}, "VIIRS Recorded Fires", true);
    }
     var chartFIRMS= ui.Chart.image.series(fires.select('T21'), Cliptothisbuffer_inchart, ee.Reducer.mean(),30,'system:time_start')
        .setChartType('ScatterChart')
        .setOptions({
        crosshair: { 
        trigger: 'both' ,
        opacity: 0.5 ,
        orientation: 'both'
         },
         title : ' MODIS FIRMS Time Series for '+  vlg  + ' Within bounds of ' + buffernum, 
         hAxis: {title: 'Date'},
         vAxis: {title: 'Brightness temp T21 in Kelvin'},
         pointSize: 8,
         colors : ['Orange'],
        });
      var centerbutt = ui.Button({label: 'Center on Village', style:{ position : 'top-right'}});
      centerbutt.onClick (function centervillage() {
      map.centerObject(feature, 13);
      });
      map.add(centerbutt);
        // The first Image of Area within specified date by user 
        var firstimgRGB = dataset.first();
        var firstimgNDVI = dataset.select('NDVI').first();
        var firstimgNBR = dataset.select('NBR').first();
        //// Visulaization Parameters for Landsat 8
        if (sat == 'LANDSAT/LC08/C01/T1_SR'){
          if (index == 'NBR'){
          map.addLayer(firstimgRGB, {bands: ['B4', 'B3', 'B2'],min: 0,max: 3000,gamma: 1.4,}, 'RGB (1st available image)', false);
          map.addLayer(firstimgNBR, {bands: 'NBR', min: -1, max: 1, palette : ['000000', 'FFFFFF']},'NBR (1st available image)');
          }
          else if (index == 'NDVI'){
          map.addLayer(firstimgRGB, {bands: ['B4', 'B3', 'B2'],min: 0,max: 3000,gamma: 1.4,}, 'RGB (1st available image)', false);      
          map.addLayer(firstimgNDVI, {bands: 'NDVI', min: 0, max: 1,palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 
          'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401',
            '056201', '004C00', '023B01','012E01', '011D01', '011301']},'NDVI (1st available image)');  
          }
          else if (index == 'DNBR'){
          map.addLayer(firstimgRGB, {bands: ['B4', 'B3', 'B2'],min: 0,max: 3000,gamma: 1.4,}, 'RGB (1st available image)', false);
          map.addLayer(DNBRfirst, {bands: index, min: -1000, max: 1000, palette : ['000000', 'FFFFFF']},'DNBR Grayscale (1st available image)');
          map.addLayer(DNBRfirst.sldStyle(sld_intervals), {}, 'DNBR classified (1st available image)');
          }          
          else {
          map.addLayer(firstimgRGB, {bands: ['B4', 'B3', 'B2'],min: 0,max: 3000,gamma: 1.4,}, 'RGB (1st available image)', false);
          map.addLayer(firstimgNBR, {bands: 'NBR', min: -1, max: 1, palette : ['000000', 'FFFFFF']},'NBR (1st available image)');
          map.addLayer(DNBRfirst, {bands: 'DNBR', min: -1000, max: 1000, palette : ['000000', 'FFFFFF']},'DNBR Grayscale (1st available image)');
          map.addLayer(DNBRfirst.sldStyle(sld_intervals), {}, 'DNBR classified (1st available image)');
          map.addLayer(firstimgNDVI, {bands: 'NDVI', min: 0, max: 1,palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 
          'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401',
            '056201', '004C00', '023B01','012E01', '011D01', '011301']},'NDVI (1st available image)');  
          }
        }
      //// Visulaization Parameters for Sentinel 2
       else {
          if (index == 'NBR'){
          map.addLayer(firstimgRGB, {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3}, 'RGB (1st available image)', false);
          map.addLayer(firstimgNBR, {bands: 'NBR', min: -1, max: 1, palette : ['000000', 'FFFFFF']},'NBR (1st available image)');
          }
          else if (index == 'NDVI'){
          map.addLayer(firstimgRGB, {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3}, 'RGB (1st available image)', false);      
          map.addLayer(firstimgNDVI, {bands: 'NDVI', min: 0, max: 1,palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 
          'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401',
            '056201', '004C00', '023B01','012E01', '011D01', '011301']},'NDVI (1st available image)');  
          } 
          else if (index == 'DNBR'){
          map.addLayer(firstimgRGB, {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3}, 'RGB (1st available image)', false);
          map.addLayer(DNBRfirst, {bands: index, min: -1000, max: 1000, palette : ['000000', 'FFFFFF']},'DNBR Grayscale (1st available image)');
          map.addLayer(DNBRfirst.sldStyle(sld_intervals), {}, 'DNBR classified (1st available image)');
          }          
          else {
          map.addLayer(firstimgRGB, {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3}, 'RGB (1st available image)', false);
          map.addLayer(firstimgNBR, {bands: 'NBR', min: -1, max: 1, palette : ['000000', 'FFFFFF']},'NBR (1st available image)');
          map.addLayer(DNBRfirst, {bands: 'DNBR', min: -1000, max: 1000, palette : ['000000', 'FFFFFF']},'DNBR Grayscale (1st available image)');
          map.addLayer(DNBRfirst.sldStyle(sld_intervals), {}, 'DNBR classified (1st available image)');
          map.addLayer(firstimgNDVI, {bands: 'NDVI', min: 0, max: 1,palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 
          'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401',
            '056201', '004C00', '023B01','012E01', '011D01', '011301']},'NDVI (1st available image)');  
          }
        }
// Prepare the chart.
var chartVIIRS =
  ui.Chart.feature.groups(clipped_VIIRS, 'ACQ_DATE' , 'BRIGHT_TI4', 'UID')
    .setChartType('LineChart')
    .setOptions({
      crosshair: { 
      trigger: 'both' ,
      opacity: 0.5 ,
      orientation: 'both'
      },
      title : ' VIIRS FIRMS Time Series for '+  vlg  + ' Within bounds of ' + buffernum,
      hAxis: {
        title: 'Date',
      },
      vAxis: {
        title: 'Brightness temp TI4 in Kelvin'
      },
      lineWidth: 1,
      pointSize: 8,
      legend: {position: 'none'},
      colors : ['b30000'],
    });
//print(chartVIIRS)
// set position of panel
var legendFIRMS = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 5px'
  }
});
// Create legend title
var legendTitleFIRMS = ui.Label({
  value: 'FIRMS fires brightness',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legendFIRMS.add(legendTitleFIRMS);
// Creates and styles 1 row of the legend.
var makeRowFIRMS = function(colorFIRMS, nameFIRMS) {
      // Create the label that is actually the colored box.
      var colorBoxFIRMS = ui.Label({
        style: {
          backgroundColor: '#' + colorFIRMS,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var descriptionFIRMS = ui.Label({
        value: nameFIRMS,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBoxFIRMS, descriptionFIRMS],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var paletteFIRMS =['F3E80E', 'E0600D', 'C41D2A'];
// name of the legend
var namesFIRMS = ['Low', 'Medium', 'High'];
// Add color and and names
for (var p = 0; p < 3; p++) {
  legendFIRMS.add(makeRowFIRMS(paletteFIRMS[p], namesFIRMS[p]));
  }  
if (index == 'NDVI'){
// create vizualization parameters
var ndviviz = {min: 0, max: 1,palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 
          'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401',
            '056201', '004C00', '023B01','012E01', '011D01', '011301']};
// set position of panel
var legendndvi = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  } 
});
// Create legend title
var legendTitlendvi = ui.Label({
  value: 'NDVI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legendndvi.add(legendTitlendvi); 
// create the legend image
var lonndvi = ee.Image.pixelLonLat().select('latitude');
var gradientndvi = lonndvi.multiply((ndviviz.max-ndviviz.min)/100.0).add(ndviviz.min);
var legendImagendvi = gradientndvi.visualize(ndviviz);
// create text on top of legend
var panelndvi = ui.Panel({
    widgets: [
      ui.Label(ndviviz['max'])
    ],
  });
legendndvi.add(panelndvi);
// create thumbnail from the image
var thumbnailndvi = ui.Thumbnail({
  image: legendImagendvi, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legendndvi.add(thumbnailndvi);
// create text on top of legend
var paneltextndvi = ui.Panel({
    widgets: [
      ui.Label(ndviviz['min'])
    ],
  });
var showbutt0 = ui.Button({label: 'Show Legend', style:{ position : 'bottom-left'}});
showbutt0.onClick (function showLegendnbr() {
  //legendndvi.style().set('shown', true);
  map.add(legendndvi);
  map.remove(showbutt0);
});
var closebutt0 = ui.Button({label: 'X'});
closebutt0.onClick (function clearLegendndvi() {
  map.add(showbutt0);
  map.remove(legendndvi);
});
legendndvi.add(paneltextndvi);
legendndvi.add(legendFIRMS);
legendndvi.add(closebutt0);
map.add(legendndvi);
}
else if (index == 'DNBR'){
// Seperate DNRB results into 8 burn severity classes
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
//var classified = DNBRfirst.lt(thresholds).reduce('sum').toInt();
/////////////////////////////////// ADD A LEGEND for DNBR Classification /////////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Create legend title
var legendTitle = ui.Label({
  value: ' ∆NBR Classes',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
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
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Palette with the colors
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
// name of the legend
var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low Severity',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
// Add color and and names
for (var k = 0; k < 8; k++) {
  legend.add(makeRow(palette[k], names[k]));
  }  
// function for close button for Legend
function clearLegend() {
  map.add(showbutt1);
  map.remove(legend);
}
var legnote = ui.Label('* Classes Based on USGS Standards',{color: 'gray', fontSize: '10px', margin : '2px'});
var showbutt1 = ui.Button({label: 'Show Legend', style:{ position : 'bottom-left'}});
showbutt1.onClick (function showLegend() {
  map.add(legend);
  map.remove(showbutt1);
});
var closebutt1 = ui.Button( 'Close',clearLegend);
// add legend to map 
legend.add(legnote);
legend.add(legendFIRMS);
legend.add(closebutt1);
map.add(legend);
}
// button to remove or show chart
var showbutt2 = ui.Button({label: 'Show Chart(s)', style:{ position : 'bottom-right'}});
showbutt2.onClick (function showChart() {
  map.remove(showbutt2);
  seriesplot1.style().set('shown', true);
});
// function for close button for series charts
function clearResults() {
  map.add(showbutt2);
  seriesplot1.style().set('shown', false);
}
var closebutt2 = ui.Button( 'Close',clearResults);
var page1butt = ui.Button({label: 'Go to Page 1', style:{ position : 'bottom-right'}});
page1butt.onClick (function gotopage1() {
  seriesplot2.style().set('shown', false);
  seriesplot1.style().set('shown', true);
});
var page2butt = ui.Button({label: 'Go to Page 2', style:{ position : 'bottom-right'}});
page2butt.onClick (function gotopage1() {
  seriesplot1.style().set('shown', false);
  seriesplot2.style().set('shown', true);
});
var buttPanelchart = ui.Panel(
  [
    ui.Panel([closebutt2,page2butt], null),
  ],
  ui.Panel.Layout.Flow('vertical'));
// set position of chart panel
var seriesplot1 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: { width: '500px',
    position: 'bottom-right',
    padding: '8px 15px',
    stretch: 'horizontal',
  }
});
// set position of chart panel
var seriesplot2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: { width: '500px',
    position: 'bottom-right',
    padding: '8px 15px',
    stretch: 'horizontal',
  }
});
var imgcol1 = null,
    imgcol2 = null,
    chartcolor1 = null,
    chartcolor2 = null,
    chartcolor3 = null,
    chartband1 = null,
    chartband2 = null,
    chartband3 = null,
    chartscale= null;
///////////////////////// Chart Designs  ////////////////////////////////////
if (sat == 'LANDSAT/LC08/C01/T1_SR') {
  sat = 'Landsat 8';
  chartscale= 30;
  if (index == 'NDVI'){
    imgcol1 = dataset;
    chartcolor1 = 'Limegreen';
    chartband1 = 'NDVI';
  } else if (index == 'NBR'){ 
    imgcol1 = dataset;
    chartcolor1 = 'Red';
    chartband1 = 'NBR';
  } else if (index == 'DNBR'){ 
    imgcol1 = DNBRImageCollection;
    chartcolor1 = 'Darkgray';
    chartband1 = 'DNBR';
  } else {
    imgcol1 = dataset;
    imgcol2 = DNBRImageCollection;
    chartcolor1 = 'Limegreen';
    chartcolor2 = 'Red';
    chartcolor3 = 'Darkgray';
    chartband1 = 'NDVI';
    chartband2 = 'NBR';
    chartband3 = 'DNBR';
  }
  if (index !=='All'){  
  var chart1= ui.Chart.image.series(imgcol1.select(chartband1), point1, ee.Reducer.mean(), chartscale, 'system:time_start')
        //.setChartType('ScatterChart')
        .setOptions({
        crosshair: { 
        trigger: 'both' ,
        opacity: 0.5 ,
        orientation: 'both'
         },          
         title : sat + ' - '+ chartband1 + ' Time Series for '+  vlg, 
         hAxis: {title: 'Date'},
         vAxis: {title: chartband1},
         pointSize: 5,
         colors : [chartcolor1],
         trendlines: {0: {
          type: 'linear',
          color: chartcolor1,
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          labelInLegend: chartband1 + ' Trend (Coeff. of Determination)',
          visibleInLegend: true,
         },
        }});
  seriesplot2.style().set('shown', false);      
  seriesplot1.add(chart1);
  seriesplot1.add(chartVIIRS);
  seriesplot1.add(chartFIRMS);
  seriesplot2.add(tempchart);
  seriesplot2.add(page1butt);
  seriesplot1.add(buttPanelchart);
  map.add(seriesplot1);
  map.add(seriesplot2);
  } 
  else {
 var chart2= ui.Chart.image.series(imgcol1.select(chartband1,chartband2), point1, ee.Reducer.mean(), chartscale, 'system:time_start')
        //.setChartType('ScatterChart')
        .setOptions({
        crosshair: { 
        trigger: 'both' ,
        opacity: 0.5 ,
        orientation: 'both'
         },          
         title : sat + ' - ' +  chartband1 + ' and ' + chartband2 + ' Time Series for '+  vlg,
         hAxis: {title: 'Date'},
         vAxis: {title: chartband1 + ' and '  + chartband2},
         pointSize: 5,
         colors : [chartcolor2,chartcolor1],
         trendlines: {0: {
          type: 'linear',
          color: chartcolor2,
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          labelInLegend: chartband2 + ' Trend (Coeff. of Determination)',
          visibleInLegend: true,
         },
          1: {
          type: 'linear',
          color: chartcolor1,
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          labelInLegend: chartband1 + ' Trend (Coeff. of Determination)',
          visibleInLegend: true,
         },
        }});
  var chart3= ui.Chart.image.series(imgcol2.select(chartband3), point1, ee.Reducer.mean(), chartscale,'system:time_start')
        //.setChartType('ScatterChart')
        .setOptions({
        crosshair: { 
        trigger: 'both' ,
        opacity: 0.5 ,
        orientation: 'both'
         },
         title : sat + ' - ' + chartband3 + ' Time Series for '+  vlg,
         hAxis: {title: 'Date'},
         vAxis: {title: chartband3},
         pointSize: 5,
         colors : [chartcolor3],
         trendlines: {0: {
          type: 'linear',
          color: chartcolor3,
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          labelInLegend: chartband3 + ' Trend (Coeff. of Determination)',
          visibleInLegend: true,
         },
        }});        
  seriesplot2.style().set('shown', false);  
  seriesplot1.add(chart2);
  seriesplot1.add(chart3);
  seriesplot1.add(chartVIIRS);
  seriesplot2.add(chartFIRMS);
  seriesplot2.add(tempchart);
  seriesplot2.add(page1butt);
  seriesplot1.add(buttPanelchart);
  map.add(seriesplot1);
  map.add(seriesplot2,false);
  }
}  else {
  sat = 'Sentinel 2';
  chartscale= 10;
  if (index == 'NDVI'){
    imgcol1 = dataset;
    chartcolor1 = 'Limegreen';
    chartband1 = 'NDVI';
  } else if (index == 'NBR'){ 
    imgcol1 = dataset;
    chartcolor1 = 'Red';
    chartband1 = 'NBR';
  } else if (index == 'DNBR'){ 
    imgcol1 = DNBRImageCollection;
    chartcolor1 = 'Darkgray';
    chartband1 = 'DNBR';
  } else {
    imgcol1 = dataset;
    imgcol2 = DNBRImageCollection;
    chartcolor1 = 'Limegreen';
    chartcolor2 = 'Red';
    chartcolor3 = 'Darkgray';
    chartband1 = 'NDVI';
    chartband2 = 'NBR';
    chartband3 = 'DNBR';
  }
  if (index !=='All'){  
  var chart4= ui.Chart.image.series(imgcol1.select(chartband1), point1, ee.Reducer.mean(), chartscale, 'system:time_start')
        //.setChartType('ScatterChart')
        .setOptions({
        crosshair: { 
        trigger: 'both' ,
        opacity: 0.5 ,
        orientation: 'both'
         },          
         title : sat + ' - '+ chartband1 + ' Time Series for '+  vlg, 
         hAxis: {title: 'Date'},
         vAxis: {title: chartband1},
         pointSize: 5,
         colors : [chartcolor1],
         trendlines: {0: {
          type: 'linear',
          color: chartcolor1,
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          labelInLegend: chartband1 + ' Trend (Coeff. of Determination)',
          visibleInLegend: true,
         },
        }});
  seriesplot2.style().set('shown', false);        
  seriesplot1.add(chart4);
  seriesplot1.add(chartVIIRS);
  seriesplot1.add(chartFIRMS);
  seriesplot2.add(tempchart);
  seriesplot2.add(page1butt);
  seriesplot1.add(buttPanelchart);
  map.add(seriesplot1);
  map.add(seriesplot2,false);
  } 
  else {
 var chart5= ui.Chart.image.series(imgcol1.select(chartband1,chartband2), point1, ee.Reducer.mean(), chartscale, 'system:time_start')
        //.setChartType('ScatterChart')
        .setOptions({
        crosshair: { 
        trigger: 'both' ,
        opacity: 0.5 ,
        orientation: 'both'
         },          
         title : sat + ' - ' +  chartband1 + ' and ' + chartband2 + ' Time Series for '+  vlg,
         hAxis: {title: 'Date'},
         vAxis: {title: chartband1 + ' and '  + chartband2},
         pointSize: 5,
         colors : [chartcolor2,chartcolor1],
         trendlines: {0: {
          type: 'linear',
          color: chartcolor2,
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          labelInLegend: chartband2 + ' Trend (Coeff. of Determination)',
          visibleInLegend: true,
         },
          1: {
          type: 'linear',
          color: chartcolor1,
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          labelInLegend: chartband1 + ' Trend (Coeff. of Determination)',
          visibleInLegend: true,
         },
        }});
  var chart6= ui.Chart.image.series(imgcol2.select(chartband3), point1, ee.Reducer.mean(), chartscale,'system:time_start')
        //.setChartType('ScatterChart')
        .setOptions({
        crosshair: { 
        trigger: 'both' ,
        opacity: 0.5 ,
        orientation: 'both'
         },          
         title : sat + ' - ' + chartband3 + ' Time Series for '+  vlg,
         hAxis: {title: 'Date'},
         vAxis: {title: chartband3},
         pointSize: 5,
         colors : [chartcolor3],
         trendlines: {0: {
          type: 'linear',
          color: chartcolor3,
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          labelInLegend: chartband3 + ' Trend (Coeff. of Determination)',
          visibleInLegend: true,
         },
        }});        
  seriesplot2.style().set('shown', false);  
  seriesplot1.add(chart5);
  seriesplot1.add(chart6);
  seriesplot1.add(chartVIIRS);
  seriesplot2.add(chartFIRMS);
  seriesplot2.add(tempchart);
  seriesplot2.add(page1butt);
  seriesplot1.add(buttPanelchart);
  map.add(seriesplot1);
  map.add(seriesplot2,false);
  }
}  
/// Night Time dataset visualization
var nighttimeLightsVis = {'opacity':1,'bands':['avg_vis'],'min':3,'max':60,
'palette':['000000','ffd921','f0ff04']};
//// Base map Settings when Submit is clicked ////
map.setControlVisibility({all: true});
map.style().set({cursor:'hand'});
map.setOptions('HYBRID');
map.addLayer(nighttimeLights, nighttimeLightsVis, 'Night time Lights from 2014', false);
map.addLayer(point3, {color:'Moccasin'}, 'Probably affected (Buffer 3)');
map.addLayer(point2, {color:'Orange'}, 'Partly affected affected (Buffer 2)');
map.addLayer(point1, {color:'Red'}, 'Mostly affected (Buffer 1)', true, 0.5);
map.addLayer(landuse_osm, {color: 'purple'}, 'OSM Land Use', false);
map.addLayer(roads_sudan, {color: 'white'}, 'OSM Roads', false);
map.addLayer(villages,{color: 'blue'},'All Villages', false);
var area = ee.FeatureCollection(point1);
// Seperate result into 8 burn severity classes
var thresholds1 = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = DNBRfirst.lt(thresholds1).reduce('sum').toInt();
var scalestat = null;
var px_area = null;
if ( sat == 'Landsat 8'){
    scalestat = 30;
    px_area = 900;
} else {
    scalestat = 10;
    px_area = 100;
  }
if (index == "DNBR"){
  //  BURNED AREA STATISTICS //
  // count number of pixels in entire layer
  var allpix =  classified.updateMask(classified);  // mask the entire layer
  var pixstats = allpix.reduceRegion({
    reducer: ee.Reducer.count(),               // count pixels in a single class
    geometry: area,
    scale: scalestat
    });
  var allpixels = ee.Number(pixstats.get('sum')); // extract pixel count as a number
  // create an empty list to store area values in
  var arealist = [];
  // create a function to derive extent of one burn severity class
  // arguments are class number and class name
  var areacount = function(cnr, name) {
   var singleMask =  classified.updateMask(classified.eq(cnr));  // mask a single class
   var stats = singleMask.reduceRegion({
    reducer: ee.Reducer.count(),               // count pixels in a single class
    geometry: area,
    scale: scalestat
    });
  var pix =  ee.Number(stats.get('sum'));
  var hect = pix.multiply(px_area).divide(10000); // Landsat 8 pixel = 30m x 30m --> 900 sqm // Sentinel pixel = 10m x 10m --> 100 sqm 
  var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
  arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
  };
  // severity classes in different order
  var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
  'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
  // execute function for each class
  for (var i = 0; i < 8; i++) {
    areacount(i, names2[i]);
    }
    print('DNBR Areas (size) by Class', arealist);
  // export the calculated area in csv file  
  var fc = ee.FeatureCollection(arealist.map(function(Class) {
    return ee.Feature(null, {'value': Class});
  }));
  Export.table.toDrive(fc,'exportTheAreaCalculated', 'GEE', 'exportTheAreaCalculated', 'CSV');
}
else if (index == 'All'){
//   BURNED AREA STATISTICS ///
  // count number of pixels in entire layer
  var allpix =  classified.updateMask(classified);  // mask the entire layer
  var pixstats = allpix.reduceRegion({
    reducer: ee.Reducer.count(),               // count pixels in a single class
    geometry: area,
    scale: scalestat
    });
  var allpixels = ee.Number(pixstats.get('sum')); // extract pixel count as a number
  // create an empty list to store area values in
  var arealist = [];
  // create a function to derive extent of one burn severity class
  // arguments are class number and class name
  var areacount = function(cnr, name) {
   var singleMask =  classified.updateMask(classified.eq(cnr));  // mask a single class
   var stats = singleMask.reduceRegion({
    reducer: ee.Reducer.count(),               // count pixels in a single class
    geometry: area,
    scale: scalestat
    });
  var pix =  ee.Number(stats.get('sum'));
  var hect = pix.multiply(px_area).divide(10000); // Landsat 8 pixel = 30m x 30m --> 900 sqm // Sentinel pixel = 10m x 10m --> 100 sqm 
  var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
  arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
  };
  // severity classes in different order
  var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
  'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
  // execute function for each class
  for (var i = 0; i < 8; i++) {
    areacount(i, names2[i]);
    }
    print('DNBR Areas (size) by Class', arealist);
      // export the calculated area in csv  
    var fc = ee.FeatureCollection(arealist.map(function(point) {
      return ee.Feature(null, {'value': point});
    }));
    Export.table.toDrive(fc,'exportTheAreaCalculated', 'GEE', 'exportTheAreaCalculated', 'CSV');
} else {}
///  Set the extra panel check box settings ( shown or not shown)
if (index == 'NDVI'){
  if(extraPanel1.style().get('shown')){
    extraPanel1.style().set('shown', false);
  } else{
    extraPanel1.style().set('shown', true);
  }
    ///Set shown true after first submit click for next time
    extraPanel1.style().set('shown', true);
    extraPanel2.style().set('shown', false);
    extraPanel3.style().set('shown', false);
    extraPanel4.style().set('shown', false);
} else if (index == 'NBR'){
  if(extraPanel2.style().get('shown')){
    extraPanel2.style().set('shown', false);
  } else{
    extraPanel2.style().set('shown', true);
  }
    ///Set shown true after first submit click for next time
    extraPanel2.style().set('shown', true);
    extraPanel1.style().set('shown', false);
    extraPanel3.style().set('shown', false);
    extraPanel4.style().set('shown', false);
} else if (index == 'DNBR'){
  if(extraPanel3.style().get('shown')){
    extraPanel3.style().set('shown', false);
  } else{
    extraPanel3.style().set('shown', true);
  }
    ///Set shown true after first submit click for next time
   extraPanel3.style().set('shown', true);
   extraPanel1.style().set('shown', false);
   extraPanel2.style().set('shown', false);
   extraPanel4.style().set('shown', false);
} else if (index == 'All'){    
  if(extraPanel4.style().get('shown')){
    extraPanel4.style().set('shown', false);
  } else{
    extraPanel4.style().set('shown', true);
  }
    ///Set shown true after first submit click for next time
    extraPanel4.style().set('shown', true);
    extraPanel1.style().set('shown', false);
    extraPanel2.style().set('shown', false);
    extraPanel3.style().set('shown', false);    
}    
}
});
// coordinate panel
var coordSectionLabel = ui.Label('Click on a pixel to get its coordinates :',{fontWeight: 'bold'});
var latLabel = ui.Label('Latitude:');
var latValue = ui.Label();
latValue.style().set('stretch', 'horizontal');
var lonLabel = ui.Label('Longitude:');
var lonValue = ui.Label();
lonValue.style().set('stretch', 'horizontal');
var latLonPanel = ui.Panel(
  [
    coordSectionLabel,
    ui.Panel([lonLabel, lonValue, latLabel, latValue],ui.Panel.Layout.Flow('horizontal'))
  ],
  null,
  {stretch: 'horizontal'}
);
// extra panel
var extraLabel1 = ui.Label('Check Mark to show : ',{fontWeight: 'bold' });
var extraLabel2 = ui.Label('Check Mark to show : ',{fontWeight: 'bold' });
var extraLabel3 = ui.Label('Check Mark to show : ',{fontWeight: 'bold' });
var extraLabel4 = ui.Label('Check Mark to show : ',{fontWeight: 'bold' });
var checkbox1 = ui.Checkbox('All Villages'),
    checkbox2 = ui.Checkbox('Night Time Lights (2014)'),
    checkbox3 = ui.Checkbox('OSM Land Use (Jan 2020)'),
    checkbox4 = ui.Checkbox('OSM Roads (Jan 2020)');
var checkbox5 = ui.Checkbox('All Villages'),
    checkbox6 = ui.Checkbox('Night Time Lights (2014)'),
    checkbox7 = ui.Checkbox('OSM Land Use (Jan 2020)'),
    checkbox8 = ui.Checkbox('OSM Roads (Jan 2020)');
var checkbox9 = ui.Checkbox('All Villages'),
    checkbox10 = ui.Checkbox('Night Time Lights (2014)'),
    checkbox11 = ui.Checkbox('OSM Land Use (Jan 2020)'),
    checkbox12 = ui.Checkbox('OSM Roads (Jan 2020)');
var checkbox13 = ui.Checkbox('All Villages'),
    checkbox14 = ui.Checkbox('Night Time Lights (2014)'),
    checkbox15 = ui.Checkbox('OSM Land Use (Jan 2020)'),
    checkbox16 = ui.Checkbox('OSM Roads (Jan 2020)');    
checkbox1.onChange(function(checked) {
  map.layers().get(10).setShown(checked);
});
checkbox2.onChange(function(checked) {
  map.layers().get(4).setShown(checked);
});
checkbox3.onChange(function(checked) {
  map.layers().get(8).setShown(checked);
});
checkbox4.onChange(function(checked) {
  map.layers().get(9).setShown(checked);
});
checkbox5.onChange(function(checked) {
  map.layers().get(10).setShown(checked);
});
checkbox6.onChange(function(checked) {
  map.layers().get(4).setShown(checked);
});
checkbox7.onChange(function(checked) {
  map.layers().get(8).setShown(checked);
});
checkbox8.onChange(function(checked) {
  map.layers().get(9).setShown(checked);
});
checkbox9.onChange(function(checked) {
  map.layers().get(11).setShown(checked);
});
checkbox10.onChange(function(checked) {
  map.layers().get(5).setShown(checked);
});
checkbox11.onChange(function(checked) {
  map.layers().get(9).setShown(checked);
});
checkbox12.onChange(function(checked) {
  map.layers().get(10).setShown(checked);
});
checkbox13.onChange(function(checked) {
  map.layers().get(13).setShown(checked);
});
checkbox14.onChange(function(checked) {
  map.layers().get(7).setShown(checked);
});
checkbox15.onChange(function(checked) {
  map.layers().get(11).setShown(checked);
});
checkbox16.onChange(function(checked) {
  map.layers().get(12).setShown(checked);
});
var extraPanel1 = ui.Panel(
  [
    ui.Panel([extraLabel1]),
    ui.Panel([checkbox1  ,checkbox2], null, {stretch: 'horizontal'}),
    ui.Panel([checkbox3 ,checkbox4], null, {stretch: 'horizontal'})
  ],
  ui.Panel.Layout.Flow('vertical'), {stretch: 'horizontal', shown : false });
var extraPanel2 = ui.Panel(
  [
    ui.Panel([extraLabel2]),
    ui.Panel([checkbox5  ,checkbox6], null, {stretch: 'horizontal'}),
    ui.Panel([checkbox7 ,checkbox8], null, {stretch: 'horizontal'})
  ],
  ui.Panel.Layout.Flow('vertical'), {stretch: 'horizontal', shown : false });
var extraPanel3 = ui.Panel(
  [
    ui.Panel([extraLabel3]),
    ui.Panel([checkbox9  ,checkbox10], null, {stretch: 'horizontal'}),
    ui.Panel([checkbox11 ,checkbox12], null, {stretch: 'horizontal'})
  ],
  ui.Panel.Layout.Flow('vertical'), {stretch: 'horizontal', shown : false });
var extraPanel4 = ui.Panel(
  [
    ui.Panel([extraLabel4]),
    ui.Panel([checkbox13  ,checkbox14], null, {stretch: 'horizontal'}),
    ui.Panel([checkbox15 ,checkbox16], null, {stretch: 'horizontal'})
  ],
  ui.Panel.Layout.Flow('vertical'), {stretch: 'horizontal', shown : false });  
/// links panel
var link1 = ui.Label({
    value : 'Landsat 8 Explorer App' , style: {margin : '2px'},
    targetUrl: 'https://mohshafi16.users.earthengine.app/view/landsatexp'});
var link2 = ui.Label({
    value : 'Sentinel 2 Explorer App (SR)',style: {margin : '2px'},
    targetUrl:'https://mohshafi16.users.earthengine.app/view/s2-explorersr'});
var link3 = ui.Label({
    value : 'Sentinel 2 Explorer App (TOA)' , style: {margin : '2px'},
    targetUrl:'https://mohshafi16.users.earthengine.app/view/s2explorertoa'});  
var link4 = ui.Label({
    value :'The lastet HR Esri World Imagery', style: {margin : '2px'},
    targetUrl:'http://arcg.is/0G9WGG'});
var linkPanel = ui.Panel(
    [ui.Label('For investigating the individual images click here', {fontWeight: 'bold'}), link1,link2,link3,link4 ]);
//// Instructions part    
var instructionsLabel= ui.Label('Instructions',{fontWeight: 'bold'});
var instructions= ui.Label(
  'This EE App is built for detection and analysis of\n'+
  'war damages in Jebel Marra, Sudan.\n'+
  'The location of villages are based on DLR and\n'+ 
  'Amnesty International data and reports.\n'+
  'The villages were either directly affected by \n'+
  'violences or people left them in fear of war\n\n'+
  '1. Select a village\n'+
  '2. Select one of the satellite.\n'+
  'Please consider following details.\n\n'+
  'Landsat 8 :\n'+ 
  'Launched:                          February 11th, 2013 .\n'+
  'Temporal Resloution:      16 days\n'+
  'Spatial Resolution:          15,30*,60 meters\n\n'+
  'Sentinel 2 A&B :\n'+ 
  'Launched:            June 23rd,2015 & March 7th,2017\n'+
  'Temporal Resloution:      5 days since 2017\n'+
  'Spatial Resolution:          10*,20,60 meters\n'+  
  '* the resolution used in this research.\n\n'+   
  '3. Set the dates range for investigation.\n'+
  '4. Set the maximum cloud percentage in images.\n'+
  'The images above this value will be filtered out.\n'+
  'The cloud mask will be applied on remaining\n'+ 
  'images. \n'+
  '5. Select the index \n'+
  '6. Set the buffer sizes around the village in km.\n'+
  'Check the box in front of a buffer to see  \n'+
  'the FIRMS data intersecting it \n\n'+
  'The buffers are divided as following :\n'+
  'a) Mostly affected (Buffer 1)/ Shown in red.\n'+
  'b) Partly affected affected (Buffer 2).\n'+
  'Shown in orange.\n'+
  'c) Probably affected (Buffer 3).\n'+
  'Shown in Moccasin.\n'+
  '7. Click on Submit button to see the time series \n'+
  'results in charts. The NBR,NDVI, DNBR images\n'+
  'shown on display are the first available images \n'+
  'according to the above parameters.\n'+
  'The MODIS 1km and VIIRS 375m  pixel size \n'+
  'thermal anomalities with 1 day temporal\n'+
  'resolution (FIRMS) are displayed in charts as well.\n'+
  'The FIRMS data is clipped to contain\n'+
  'only bounds of the chosen buffer.\n'+ 
  'Other data such as OSM Landuse can also be \n'+
  'shown from control panel\n'
  , {whiteSpace:'pre'}
);
var note = ui.Label(' For best performance use Google Chrome browser.',
{color: 'gray', fontSize: '10px', margin : '2px'});
var cpLabel = ui.Label(' © 2020, All data shown here are subject to copyright of their sources.',
{color: 'gray', fontSize: '10px', margin : '2px'});
// Button and its function to show and hide instruction panel 
var insbutt = ui.Button({label: 'Show Instructions >>', style:{stretch: 'horizontal', color:'blue'}});
insbutt.onClick(function(){
  if(instpanel.style().get('shown')){
    insbutt.setLabel('Show Instructions >>');
    instpanel.style().set('shown', false);
  } else{
    insbutt.setLabel('Hide  Instructions <<');
    instpanel.style().set('shown', true);
  }
});
// creat the instruction panel 
var instpanel = ui.Panel(null, null, {stretch: 'horizontal', shown: false, padding: '0px'});
// add the followings to instrcution panel 
instpanel.add(instructionsLabel);
instpanel.add(instructions);
instpanel.add(note);
instpanel.add(cpLabel);
// add all sub-panels to control panel
controlPanel.add(intro);
controlPanel.add(vlgPanel);
controlPanel.add(satPanel);
controlPanel.add(datesPanel);
controlPanel.add(cloudPanel);
controlPanel.add(indexPanel);
controlPanel.add(bufferPanel);
controlPanel.add(submitButton);
controlPanel.add(latLonPanel);
controlPanel.add(extraPanel1);
controlPanel.add(extraPanel2);
controlPanel.add(extraPanel3);
controlPanel.add(extraPanel4);
controlPanel.add(linkPanel);
controlPanel.add(insbutt);
controlPanel.add(instpanel);
ui.root.clear();
ui.root.add(controlPanel);
ui.root.add(map);