// Created by Alfonso Sanchez-Paus
// If you improve it please share the code!
// Improvements from the example on ui.SplitPanel
var polygonAreas = require("users/sanchezpauspro/Apps:PolygonDrawing");
// Import country features 
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var SENTINEL_1 = { name : "Sentinel-1 SAR Radar", period : 5, start : "2014-10-14" };
var SENTINEL_2_NATURAL = { name : "Sentinel-2 Natural ( RGB )", period : 5, start : "2015-06-23"}
var SENTINEL_2_FALSE_20 = { name : "Sentinel-2 False 20 m (nir-swir1-red)", period : 5, start : "2015-06-23"};
var SENTINEL_2_FALSE_10 = { name : "Sentinel-2 False 10 m (nir-red-green)", period : 5, start : "2015-06-23"};
var SENTINEL_2_NDVI = { name : "Sentinel-2 NDVI 20 m", period : 5, start : "2015-06-23"};
var LANDSAT_8_NATURAL = { name : "Landsat-8 Natural (RGB)", period : 16, start : "2013-04-21"};
var LANDSAT_8_FALSE = { name : "Landsat-8 False (nir-swir-red)", period : 16, start : "2013-04-21"};
var LANDSAT_7_NATURAL = { name : "Landsat-7 Natural (RGB)", period : 16, start : "1999-01-01"};
var LANDSAT_7_FALSE = { name : "Landsat-7 False (nir-swir-red)", period : 16, start : "1999-01-01"};
var NIGHTLIGHTS = { name : "Night lights (VIIRS)", period : 30, start : "2012-04-01"};
var SENTINEL_5_NO2 = { name : "Sentinel-5 NO2", period : 5, start : "2018-07-28"};
var BURNED_AREA = { name : "MODIS Burned Area Monthly", period : 1, start : "2000-11-01"};
var SENTINEL_2_NATURAL_LEVEL2 = { name : "Sentinel-2 Level 2 Natural ( RGB )", period : 5, start : "2015-06-23"};
var SENTINEL_2_FALSE_20_LEVEL2 = { name : "Sentinel-2 Level 2 False 20 m (nir-swir1-red)", period : 5, start : "2015-06-23"};
var SENTINEL_2_FALSE_10_LEVEL2 = { name : "Sentinel-2 Level 2 False 10 m (nir-red-green)", period : 5, start : "2015-06-23"};
var SENTINEL_2_NDVI_LEVEL2 = { name : "Sentinel-2 Level 2 NDVI 20 m", period : 5, start : "2015-06-23"};
var selectionSource = [];
var selectionDate = [];
var selectionMap = [];
var selectionLabel = [];
//var selectionThreshold = [];
//------------------------------------------------------------------------------------------------------------------------------ 
// START OF THE CODE THAT YOU NEED TO CHANGE IN ORDER TO CUSTOMIZE THE AREAS OF INTEREST
var DEFAULT_AREA = "Italy - COVID19 Pollution Impact"; // This variable must match the name of one of the PREDEFINED_AREAS
// FOLLOW THE SAME STRUCTURE AND YOU SHOULD BE FINE
// THIS IS AN ARRARY OF JAVASCRIPT OBJECTS. [ { name:XXXX, } ]
var PREDEFINED_AREAS = [
    {
    name : DEFAULT_AREA,  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [9.67,  45.69],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 6,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_5_NO2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2020-01-20"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_5_NO2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2020-03-18"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
  {
    name : "China - COVID19 Pollution Impact",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [114.313,  30.564],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 6,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_5_NO2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2020-01-16"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_5_NO2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2020-03-10"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
  {
    name : "Bahamas - Hurricane Dorian",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [-77.09866,  26.42997],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 13,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_FALSE_10_LEVEL2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-08-16"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10_LEVEL2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-09-05"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
  {
    name : "Kazakhstan - Arys Weapon depot explosion",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [68.792405, 42.468870],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 15,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_NATURAL_LEVEL2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-06-10"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10_LEVEL2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-06-20"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },{
    name : "Spain - L'Ametlla de Mar fire",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [0.698953, 40.915],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 15,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_FALSE_10_LEVEL2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE ,SENTINEL_5_NO2N2O
        date :  "2019-06-10"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10_LEVEL2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-06-20"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Mozambique - Beira floodings Cyclone Idai",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [34.66,-19.75],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 10,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-02-17"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-03-18"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Iran - Ahvaz floodings 2019",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [ 48.67061, 31.3183],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 11,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-02-20"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-04-06"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Iran - Aq Qala floodings 2019",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [ 54.45063, 37.01413],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 12,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_FALSE_10_LEVEL2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-03-06"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10_LEVEL2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-04-06"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
  {
    name : "India - Punjab crop burning",
    location : [76.32,29.93],
    zoomLevel : 13,
    before : {
      source : SENTINEL_2_FALSE_10,
      date :  new Date ("2018-10-03")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-10-18") 
    }
  },
  {
    name : "Nicaragua - Incendio Indio Maiz",
    location : [ -83.8225058, 10.9968084, ],
    zoomLevel : 12,
    before : {
      source : BURNED_AREA,
      date :  new Date ("2018-04-17")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-04-27") 
    }
  },
  {
    name : "Australia - Bunyip State Park fire",
    location : [ 145.67, -37.99 ],
    zoomLevel : 14,
    before : {
      source : SENTINEL_2_FALSE_20,
      date :  new Date ("2019-03-02")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2019-03-22") 
    }
  },
  {
    name : "USA - Mendocino Complex Fire",
    location : [ -122.777, 39.2 ],
    zoomLevel : 11,
    before : {
      source : SENTINEL_2_FALSE_20,
      date :  new Date ("2018-07-29")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-08-29") 
    }
  },
  {
    name : "Indonesia - Anak Krakatau Tsunami - Radar",
    location : [105.4216,  -6.099938  ],
    zoomLevel : 15,
    before : {
      source : SENTINEL_1,
      date :  new Date ("2018-11-02")
    },
    after : {
      source : SENTINEL_2_NATURAL,
      date : new Date ("2019-03-22") 
    }
  },
    {
    name : "Indonesia - Anak Krakatau Tsunami - Optical - Green lava",
    location : [105.4216,  -6.099938  ],
    zoomLevel : 13,
    before : {
      source : SENTINEL_2_FALSE_20,
      date :  new Date ("2018-09-19")
    },
    after : {
      source : SENTINEL_2_FALSE_20_LEVEL2,
      date : new Date ("2019-04-01") 
    }
  },
  {
    name : "Chile - Carahue incendio forestal/pastizales",
    location : [-72.9857,  -38.6621  ],
    zoomLevel : 11,
    before : {
      source : LANDSAT_8_FALSE,
      date :  new Date ("2019-01-20")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2019-02-25") 
    }
  },
  {
    name : "Brazil - Landslide Minas Gerais",
    location : [-44.12315,  -20.1238  ],
    zoomLevel : 16,
    before : {
      source : SENTINEL_2_FALSE_10_LEVEL2,
      date :  new Date ("2018-12-25")
    },
    after : {
      source : SENTINEL_2_FALSE_10_LEVEL2,
      date : new Date ("2019-02-25") 
    }
  },
  {
    name : "Panama - Ships waiting to enter",
    location : [-79.54512,    8.912825 ],
    zoomLevel : 14,
    before : {
      source : SENTINEL_2_FALSE_10_LEVEL2,
      date :  new Date ("2019-03-22")
    },
    after : {
      source : SENTINEL_1,
      date : new Date ("2019-03-20") 
    }
  }
];
//------------------------------------------------------------------------------------------------------------------------------ 
// END OF THE CODE THAT YOU NEED TO CHANGE IN ORDER TO CUSTOMIZE TO THE 
//------------------------------------------------------------------------------------------------------------------------------ 
function getSentinel1Composite(range) {
  // Only include the VV polarization, for consistent compositing.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filterDate(range[0], range[1])
                      .filter(ee.Filter.listContains(
                          'transmitterReceiverPolarisation', polarization))
                      //.filter(ee.Filter.eq('instrumentMode', 'IW'))
                      .select(polarization)
                      .mean();
  return sentinel1.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
}
function getSentinel2Composite(range, imageType, cloudOriginal) {
  var sentinel2Collection = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(range[0], range[1]);
  if( cloudOriginal)                      
    sentinel2Collection = sentinel2Collection.filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', cloudOriginal));
  var sentinel2 = sentinel2Collection
                    .median()
                    .divide(10000);
  var viz = {min: 0.0,  max: 0.3,  bands: ['B4', 'B3', 'B2']};
  if( imageType === SENTINEL_2_FALSE_20.name ){
    viz = {bands:['B8','B11','B4'], min: 0, max:0.3};
  }else  if( imageType ===  SENTINEL_2_FALSE_10.name ){
    viz = {bands:['B8','B4' , 'B3' ],min:0, max:0.35};
  }
  return sentinel2.visualize( viz );
}
function getSentinel2Level2Composite(range, imageType, cloudOriginal) {
  var sentinel2Collection = ee.ImageCollection('COPERNICUS/S2_SR')
                      .filterDate(range[0], range[1]);
  if( cloudOriginal)                      
    sentinel2Collection = sentinel2Collection.filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', cloudOriginal));
  var sentinel2 = sentinel2Collection
                    .median()
                    .divide(10000);
  var viz = {min: 0.0,  max: 0.3,  bands: ['B4', 'B3', 'B2']};
  if( imageType === SENTINEL_2_FALSE_20_LEVEL2.name ){
    viz = {bands:['B8','B11','B4'], min: 0, max:0.3};
  }else  if( imageType ===  SENTINEL_2_FALSE_10_LEVEL2.name ){
    viz = {bands:['B8','B4' , 'B3' ],min:0, max:0.35};
  }
  return sentinel2.visualize( viz );
}
var getNdviImage = function(image){
  var ndvi = image.normalizedDifference( [  "B8", "B4" ]);
  // type might be "intervals" (default), "ramp" or "values" 
  // see explanation here : http://docs.geoserver.org/stable/en/user/styling/sld/reference/rastersymbolizer.html
  var generateSldStyle = function(classColors, classValues, type){ 
    var sldStyle = '<RasterSymbolizer><ColorMap  type="'+type+'" extended="true" >';
    // Exporting properties to the asset only works if the values are Strings or Numbers  
    for(var z =0;z<classColors.length; z++){
      sldStyle += '<ColorMapEntry color="#' + classColors[z] + '" quantity="' + classValues[z] + '" label="'+ z +'"/>';
    }
    sldStyle +='</ColorMap></RasterSymbolizer>';
    return sldStyle;
  };
  var classColors = ["000000", "8B592C", "A46A34", "BD7B3D" , "CF9F2B", "DDBC1E", "EDDD0E", "FEFE00", "D8F20B", "B1E418", "8BD825", "64CB32" , "56B931", "47A72E", "39952C", "2A842A" , "247224", "1e5c1e", "1a4b1a", "173b01"];
  var classValues = [0,0.5,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9, 1];
  return ee.Image( ndvi ).sldStyle( generateSldStyle( classColors, classValues, "ramp" )  );
}
function getSentinel2Level2CompositeNDVI(range, imageType, cloudOriginal) {
  var sentinel2Collection = ee.ImageCollection('COPERNICUS/S2_SR')
                      .filterDate(range[0], range[1]);
  if( cloudOriginal)                      
    sentinel2Collection = sentinel2Collection.filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', cloudOriginal));
  var sentinel2 = sentinel2Collection
                    .median();
  return getNdviImage( sentinel2 );
}
function getSentinel2CompositeNDVI(range, imageType, cloudOriginal) {
  var sentinel2Collection = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(range[0], range[1]);
  if( cloudOriginal)                      
    sentinel2Collection = sentinel2Collection.filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', cloudOriginal));
  var sentinel2 = sentinel2Collection
                    .median();
  return getNdviImage( sentinel2 );
}
function getModisBurnedArea(range) {
  var date = ee.Date(range[0]);
  var month = date.get('month');
  var year = date.get('year');
  var burned = ee.ImageCollection('MODIS/006/MCD64A1')
                      .filter(
        ee.Filter.and( ee.Filter.calendarRange( year, year, "year" ) , ee.Filter.calendarRange( month, month, "month" ) ) 
      ).max().gt(0)
                      ;
  var viz = {min: 0 ,  max: 1 , palette : ['white', 'red'],  bands: ['BurnDate'] };
  return burned.visualize( viz );
}
function getSentinel5Composite(range, imageType) {
    // Define an empty image to paint features to.
  var empty = ee.Image().byte();
  // Paint country feature edges to the empty image.
  var countriesOutline = empty
    .paint({featureCollection: countries, color: 1, width: 1})
    // Convert to an RGB visualization image; set line color to black.
    .visualize({palette: '000000'});
  var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                      .select('NO2_column_number_density')
                      .filterDate(range[0], range[1])
                      .max();
  var viz = {    min: 0.00005, max: 0.0002,  opacity: 0.8,  palette: ["blue", "purple", "cyan", "green", "yellow", "red"]  };
  sentinel5 = sentinel5.mask( sentinel5.gt( 0.00005) );
  var image = sentinel5.visualize( viz );
  image = image.blend(countriesOutline);
  return image;
}
function getLandsat8(range, falseColor) {
  var viz = {  min: 0.0,max: 2500, bands : ['B4', 'B3', 'B2']  };
  if( falseColor ){
    viz = {bands:['B5','B6','B4'],min:0, max:2500};
  }
  var landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                      .filterDate( range[0], range[1] )
                      .mean();
  return landsat8.visualize(  viz );
}
function getLandsat7(range, falseColor) {
  var bands = ['B3', 'B2', 'B1'];
  if( falseColor ){
    bands = ['B4','B5','B3'];
  }
  var landsat7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
                      .filterDate( range[0], range[1] )
                      .mean()
                      .select( bands , ['R', 'G', 'B'] );
  return landsat7.visualize(  { 
    min:[200,200,200],
    max:[3100,3100,3100],
    gamma : 1.3
  } );
}
function getNightLights(range) {
  var date = ee.Date(range[0]);
  var month = date.get('month');
  var year = date.get('year');
  var nightlights = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG").filter(
        ee.Filter.and( ee.Filter.calendarRange( year, year, "year" ) , ee.Filter.calendarRange( month, month, "month" ) ) 
      ).mean();
  var viz = {"opacity":1,"bands":["avg_rad"],"min":1,"max":30,"palette":["181801","f3f509"]};
      // Define an empty image to paint features to.
  var empty = ee.Image().byte();
  // Paint country feature edges to the empty image.
  var countriesOutline = empty
    .paint({featureCollection: countries, color: 1, width: 1})
    // Convert to an RGB visualization image; set line color to black.
    .visualize({palette: 'e40000'});
  var image = nightlights.visualize( viz );
  image = image.blend(countriesOutline);
  return image;
}
function updatePeriod( dateSlider, source ) {
  /*
  if( source.monthly) {
    var start = dateSlider.getValue()[0];
    var dt = new Date( start );
    print("day", dt.getDate());
    var startOfMonth = new Date( dt.getFullYear(), dt.getMonth(),2);
    print( "start month", startOfMonth )
    dateSlider= dateSlider.setValue( startOfMonth, false )
  }
    dateSlider.setPeriod( source.period );
  dateSlider.setStart( source.start );
  */
}
function getSingleImage(source, dateSlider /*, cloudThreshold*/ ){
  var range = dateSlider.getValue();
  if( source == SENTINEL_1.name){
    updatePeriod( dateSlider, SENTINEL_1 )
    return getSentinel1Composite(range);
  }else if( source == SENTINEL_2_NATURAL.name){
    updatePeriod( dateSlider, SENTINEL_2_NATURAL )
    return getSentinel2Composite(range, 0);
  }else if( source == SENTINEL_2_FALSE_20.name || source == SENTINEL_2_FALSE_10.name ){
    updatePeriod( dateSlider, SENTINEL_2_FALSE_20 )
    return getSentinel2Composite(range, source);
  }else if( source == SENTINEL_2_NDVI.name){
    updatePeriod( dateSlider, SENTINEL_2_NDVI )
    return getSentinel2CompositeNDVI(range, source);
  }else if( source == SENTINEL_2_NATURAL_LEVEL2.name){
    updatePeriod( dateSlider, SENTINEL_2_NATURAL_LEVEL2 )
    return getSentinel2Level2Composite(range, 0);
  }else if( source == SENTINEL_2_FALSE_20_LEVEL2.name || source == SENTINEL_2_FALSE_10_LEVEL2.name ){
    updatePeriod( dateSlider, SENTINEL_2_FALSE_20_LEVEL2 )
    return getSentinel2Level2Composite(range, source);
  }else if( source == SENTINEL_2_NDVI_LEVEL2.name ){
    updatePeriod( dateSlider, SENTINEL_2_NDVI_LEVEL2 )
    return getSentinel2Level2CompositeNDVI(range, source);
  }else if( source == LANDSAT_8_NATURAL.name){
    updatePeriod( dateSlider, LANDSAT_8_NATURAL )
    return getLandsat8(range, false);
  }else if( source == LANDSAT_8_FALSE.name){
    updatePeriod( dateSlider, LANDSAT_8_FALSE )
    return getLandsat8(range, true);
  }else if( source == LANDSAT_7_NATURAL.name){
    updatePeriod( dateSlider, LANDSAT_7_NATURAL )
    return getLandsat7(range, false);
  }else if( source == LANDSAT_7_FALSE.name){
    updatePeriod( dateSlider, LANDSAT_7_FALSE )
    return getLandsat7(range, true);
  }else if( source == SENTINEL_5_NO2.name ){
    updatePeriod( dateSlider, SENTINEL_5_NO2 )
    return getSentinel5Composite(range);
  }else if( source == BURNED_AREA.name ){
    updatePeriod( dateSlider, BURNED_AREA )
    return getModisBurnedArea(range);
  }else if( source == NIGHTLIGHTS.name ){
    updatePeriod( dateSlider, NIGHTLIGHTS )
    return getNightLights(range);
  }
}
/*
 * Set up the maps and control widgets
 */
function getLastWeek() {
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return lastWeek;
}
function getThumbUrl(image, label, map){
    if( map.getBounds() ){
      ee.Image( image ).getThumbURL(
        {
          dimension: 2048,
          region : map.getBounds( true ), 
          format:"png"
        }, 
        function(url){
          if( url.length > 0){
            label.setUrl( url );
          }
        });
    }
}
// This function changes the given map to show the selected image.
function updateMap( selectSource, dateSlider, map, label /*, cloudThreshold*/ ) {
  var source = selectSource.getValue();
  var image = getSingleImage(source, dateSlider /*, cloudThreshold.getValue*/  );
  var imageMap = ui.Map.Layer( image );
  map.layers().set(0, imageMap);
  //getThumbUrl(image, label, map );
}
function getObjectSelected( selectedArea ){
  for (var i = 0; i < PREDEFINED_AREAS.length; i++){
    var obj = PREDEFINED_AREAS[i];
    if ( obj.name === selectedArea )
      return obj;
  }
  return null;
}
function updateSelection( selectedArea ) {
  var predefinedObject = getObjectSelected( selectedArea );
  selectionSource[0].setValue( predefinedObject.before.source.name );
  selectionSource[1].setValue( predefinedObject.after.source.name );
  selectionDate[0].setValue( predefinedObject.before.date );
  selectionDate[1].setValue( predefinedObject.after.date );
  selectionDate[0].setPeriod( predefinedObject.before.source.period );
  selectionDate[1].setPeriod( predefinedObject.after.source.period );
  selectionMap[0].setCenter(predefinedObject.location[0], predefinedObject.location[1],  predefinedObject.zoomLevel);
  selectionMap[1].setCenter(predefinedObject.location[0], predefinedObject.location[1],  predefinedObject.zoomLevel);
  updateMap(selectionSource[0], selectionDate[0], selectionMap[0], selectionLabel[0] /*, selectionThreshold[0]*/);
  updateMap(selectionSource[1], selectionDate[1], selectionMap[1], selectionLabel[0] /*, selectionThreshold[1]*/ );
}
function addSelectPredefinedAreas(mapToChange, position){
  function getPredefinedAreas(){
    var arr =[];
    for (var i = 0; i < PREDEFINED_AREAS.length; i++){
      var obj = PREDEFINED_AREAS[i];
      arr.push( obj.name  );
    }
    return( arr );
  }
  var selectPredefinedArea = ui.Select({
        placeholder : "Choose predefined area/date",
        items: getPredefinedAreas(),
        onChange : updateSelection,
        style: {position: position, width : "220px"}
  });
  selectPredefinedArea.setValue( DEFAULT_AREA, false );
  mapToChange.add(selectPredefinedArea);
}
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, position) {
  // This function changes the given map to show the selected image.
  function updateMapLocal(selection) {
    updateMap(selectSource, dateSlider, mapToChange, label /*, cloudThreshold*/ );
  }
  var selectSource = ui.Select({
        placeholder : "Select Satellite Imagery and Date",
        items:[SENTINEL_1.name,SENTINEL_2_NATURAL.name, SENTINEL_2_FALSE_20.name, SENTINEL_2_FALSE_10.name, SENTINEL_2_NDVI.name,
        LANDSAT_8_NATURAL.name,LANDSAT_8_FALSE.name, BURNED_AREA.name ,NIGHTLIGHTS.name ,LANDSAT_7_NATURAL.name,LANDSAT_7_FALSE.name,SENTINEL_5_NO2.name, 
        SENTINEL_2_NATURAL_LEVEL2.name, SENTINEL_2_FALSE_20_LEVEL2.name, SENTINEL_2_FALSE_10_LEVEL2.name, SENTINEL_2_NDVI_LEVEL2.name],
        onChange : updateMapLocal
  });
  selectionSource.push( selectSource );
  var dateSlider = ui.DateSlider({
    start : "2000-01-01",
    end : Date.now(),
    value : getLastWeek(), // Last weeks to make sure there is imager
    period: 5,
    onChange : updateMapLocal });
  selectionDate.push( dateSlider );
  /*
  var cloudThreshold = ui.Slider(0, 100, 5, 5);
  //slider.setValue(5);  // Set a default value.
  cloudThreshold.onChange( updateMapLocal );
  selectionThreshold.push( cloudThreshold );
  */
  var label = new ui.Label({ 
    value : "Download Image" , 
    targetUrl : "http://www.waitabit.org.no"
  });
  selectionLabel.push( label );
  mapToChange.onChangeBounds( ui.util.debounce(
      function(){
        var img = mapToChange.layers().get(0).getEeObject();
        getThumbUrl(img, label, mapToChange );  
      },
      1000,
      mapToChange
    )
  ); 
  var controlPanel =
      ui.Panel({widgets: [selectSource, dateSlider, /*cloudThreshold,*/ label], style: {position: position, width : "280px"}});
  mapToChange.add(controlPanel);
  selectionMap.push( mapToChange );
}
/*
 * Tie everything together
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 'bottom-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 'bottom-right');
addSelectPredefinedAreas( leftMap, 'top-left');
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
rightMap.setOptions('HYBRID');
leftMap.setOptions('HYBRID');
rightMap.setControlVisibility({  "zoomControl":true,  "mapTypeControl":true, "layerList":true });
leftMap.setControlVisibility({ "zoomControl":true,  "mapTypeControl":true, "layerList":true   });
polygonAreas.addDrawPolygonButton( rightMap, {position : "top-right"}, true, true );
// When everything is loaded focus on the default area
var geoJson = ui.url.get('geoJson');
if ( geoJson ){
  var obj = JSON.parse(geoJson);
  var geometry = ee.Geometry( obj );
  leftMap.addLayer( geometry );
  rightMap.addLayer( geometry );
  print( geometry.type() );
  if( geometry.type().getInfo() == "Point"){
    leftMap.centerObject( geometry,4 );
    rightMap.centerObject( geometry,4 );
  }else{
    leftMap.centerObject( geometry );
  }
}else{
  //leftMap.setCenter(75,30,  6);
  updateSelection( DEFAULT_AREA );
}