//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Preview of the gap filled LANDSAT dataset using HISTARFM (HIghly Scalable Temporal Adaptive Reflectance Fusion  Model)       //
//            The algorithm is under review in Remote Sensing of Environment with the title:                                                     //
//      "Multispectral High Resolution Sensor Fusion forSmoothing and Gap-filling in the Cloud"                                 //
//       Alvaro Moreno-Martinez, Emma Izquierdo-Verdiguiec, Marco P. Maneta,                                                    //
//       Gustau Camps-Valls, Nathaniel Robinson, Jordi Muñoz-Mari,Fernando Sedano,                                              //    
//                         Nicholas Clinton, and Steven W. Running                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//   Contents:
//
// 1) Preview monthly GF dataset (It includes the Gap filled data + uncertainty estimates for each band)
// 2) Example of computation of the NDVI and its error (error propagation)
// 3) Implementation of a non linear interpolation algorithm to increase temporal resolution of the data 
//   if needed (based on Nicolas Clinton (code)
//
////////////////////////////////////////////////////////////////////////////////////////////////////7
//PointSample is the location of the pointer to plot temporal profiles of the NDVI can be seen
//Preview ImageCollection f the Gap filled Landsat dataset by fusing MODIS and Landsat 
var pkg_vis = require('users/almoma153/default:packagesothers/pkg_vis.js');
var conus = ee.Feature(ee.FeatureCollection("projects/KalmanGFwork/Table_data/conus").first());
//Vis params
var vis_vi1 = {bands:['NDVI'],min:-0.1 , max: 1, palette:pkg_vis.colors.YlGn[9]};
var lg_vi1  = pkg_vis.grad_legend(vis_vi1  , 'NDVI', false); 
var vis_vi2 = {bands:['B3_mean_post','B2_mean_post','B1_mean_post'],max: 0.2,min: 0.005};
var lg_vi2  = pkg_vis.grad_legend(vis_vi2  , 'RGB', false); 
var vis_vi3 = {bands:['errorNDVI'],min:0 , max: 0.2, palette:pkg_vis.colors.YlOrRd[9]};
var lg_vi3  = pkg_vis.grad_legend(vis_vi3  , 'NDVI error', false); 
var layerProperties = {
  'RGB': {
    name: 'RGBGB',
    visParams: vis_vi2,
    legend: lg_vi2,
    defaultVisibility: true
   },
  'NDVI': {
    name: 'NDVI',
    visParams: vis_vi1,
    legend: lg_vi1,
    defaultVisibility: false
  },
  'errorNDVI': {
    name: 'errorNDVI',
    visParams: vis_vi3,
    legend: lg_vi3,
    defaultVisibility: false
  }
};
var yearProperties = {
  '2015': {
    name: '2015',
    val: 2015
  },
  '2016': {
    name: '2016',
    val: 2016
  },
  '2017': {
    name: '2017',
    val: 2017
  },
  '2018': {
    name: '2018',
    val: 2018
  },
  '2019': {
    name: '2019',
    val: 2019
  }
};
//print(yearProperties)
//Selection of the month to show
var inimes=8;
var iniyear=2019;
//var monthnumber=5; //month to show on the map images
//var year=2016; //Only 2016 so far
var tResolution=7; //Desired interpolation temporal resolution.
//Dates to do the non linear interporlation of the HISTARFM NDVI data
var start = ee.Date('2016-01-01')
var end = ee.Date('2016-12-30')
//The errors are scalled between 0-255 (byte) which corresponds with  0-5000 to reduce storage needs
//Reflectances are scaled between 0-10000 
var scaleLandsat=function(img){
   var scaled=img.select(['P.*']).toFloat().divide(255).multiply(0.5); //to scale the error of the bands
   var refl=img.select(['B.*']).toFloat().divide(10000);
   var y=img.get('year');
   var m=img.get('month');
   var d = ee.Date.fromYMD(y,m,15);
   var doy= d.getRelative('day', 'year');
   return refl.addBands(scaled,null,true).set({'month':m,'year':y,'DOY':doy});
};
//Scaling the data to reflectance units
//GFLandsat=GFLandsat.map(scaleLandsat);
var ndvicompGF= function(img){
  img=img.toFloat();
  var ndvi=img.normalizedDifference(['B4_mean_post','B3_mean_post']).toFloat().select([0],['NDVI']);
//The error of the NDVI is computed by means of a standard error propagation approach, 
// we used the the simplified approach (assuming independent input variables)  
// https://en.wikipedia.org/wiki/Propagation_of_uncertainty#cite_note-4
  var errorNDVI = ee.Image(2).divide((img.select('B4.*').add(img.select('B3.*'))).pow(2))
  .multiply((img.select('B4.*').pow(2).multiply(img.select('P3.*').pow(2)).add(img.select('B3.*').pow(2).pow(2)
  .multiply(img.select('P4.*').pow(2)))).sqrt()).select([0],['errorNDVI']);
  return img.addBands(ndvi).addBands(errorNDVI)
};
//Let's compute the NDVI and its error
//GFLandsat=GFLandsat.map(ndvicompGF);
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
//var defaultLocation = locationDict['Deforestation in Paraguay'];
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-96,38);
mapPanel.centerObject(initialPoint, 5);
//mapPanel.setCenter(-96,38,5)
   // defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
var GFLandsat = ee.ImageCollection("projects/KalmanGFwork/GFLandsat_V1")
.map(scaleLandsat)
.map(ndvicompGF);
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  //print(layer.name)
  var image =  GFLandsat
.filterMetadata('year','equals',iniyear)
.filterMetadata('month','equals',inimes).select(layer.name)//.visualize(layer.visParams);
  //print(image)
  //var masked = addZeroAndWaterMask(image, alltraits.select(layer.name));
  mapPanel.add(ui.Map.Layer(ee.Image(image.first()).clip(conus), layer.visParams, key, layer.defaultVisibility));
}
//initialization
var GFLandsatyear = GFLandsat
    .filterMetadata('year','equals',iniyear);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
//print(yearProperties)
var selectItems = Object.keys(yearProperties);
//This hoy to acces to elements of a dictionary
//print(yearProperties['2015'].val)
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var yearSelect = ui.Select({
  items: selectItems,
  value: selectItems[4],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    GFLandsatyear = GFLandsat
    .filterMetadata('year','equals',yearProperties[selected].val)
    iniyear=yearProperties[selected].val;
    //print(inimes)
    //print(iniyear)
    var collection2= GFLandsat
    .filterMetadata('year','equals',iniyear)
    .filterMetadata('month','equals',inimes)
    generateChart({
      lon: lonup,
      lat: latup
    });
    mapPanel.layers().forEach(function(element, index) {
      //print(element)
      //print(element.getName())
      var layerp = layerProperties[element.getName()];
      var layer = ui.Map.Layer(ee.Image(collection2.first()).clip(conus),layerp.visParams, element.getName(),element.getShown());
      layers.set(index, layer);
      //element.setEeObject(collection2.select(element.getName()));
     // print(element)
      //element.setShown(selected == element.getName());
    });
   // setLegend(layerProperties[selected].legend);
  }
});
var showmes = function(range) {
var collection2= GFLandsat
.filterMetadata('year','equals',iniyear)
.filterMetadata('month','equals',range)
//var visParams = {bands: ['RH'], min: 0, max:100};
//var vis_vi3 = {min: -0.0, max: 3, bands:'NDVI', palette: pal};
//var layer = ui.Map.Layer(collection2, vis_vi3,'R map',false);
//layers.set(0, layer);
//print(collection2)
inimes=range;
//var R3corr       = collection2.select('R').multiply(GHSL.mask(masknopeople).divide(3))
//var layer2 = ui.Map.Layer(R3corr, vis_vi3).setName('R x Urbes');
//layers.set(1, layer2);
   mapPanel.layers().forEach(function(element, index) {
      //print(element.getShown())
      //print(element.getName())
      var layerp = layerProperties[element.getName()];
      var layer = ui.Map.Layer(ee.Image(collection2.first()).clip(conus),layerp.visParams, element.getName(),element.getShown());
      layers.set(index, layer);
      //element.setEeObject(collection2.select(element.getName()));
     // print(element)
      //element.setShown(selected == element.getName());
    });
    //setLegend(layerProperties[selected].legend);
};
var fmonth=1;
var lmonth=12;
 var dateSlider = ui.Slider({
      min: fmonth,
      max: lmonth,
      step: 1,
      onChange: showmes
});
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Improving high resolution datasets at continental scales with HISTARFM and GEE.', {fontSize: '22px', color: 'black' , fontWeight: 'bold'});
var text = ui.Label(
    'The HIghly Scalable Temporal Adaptive Reflectance Fusion Model (HISTARFM) algorithm combines multispectral images of different sensors to reduce noise and produce monthly gap free high resolution observations. Our approach uses images from the Landsat and the MODIS missions. We implemented a bias aware Kalman filter method in the Google Earth Engine (GEE) platform to obtain these results. HISTARFM also enables reliable estimation of the uncertainty associated with the final reflectance estimates. Quantitative and qualitative evaluations of the generated products through comparison with other methods confirm the validity of the approach.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Add the select to the toolPanel with some explanatory text.
//toolPanel.add(ui.Label('Year selection:', {'font-size': '14px'}));
//toolPanel.add(yearSelect)
//.add(ui.Label('Month selection:', {'font-size': '14px'}))
//.add(dateSlider.setValue(inimes));
var yearbox=ui.Panel([ui.Label('Year:', {'font-size': '14px'}),yearSelect]);
var monthbox=ui.Panel([ui.Label('Month:', {'font-size': '14px'}),dateSlider.setValue(inimes)]);
var timePanel = ui.Panel([yearbox, monthbox], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(timePanel);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({   //style: {position: 'bottom-left'}
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0',position: 'bottom-right'}
});
mapPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel//.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  keyPanel.add(legend);
  }
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
//Let's create maps with the data
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Select layer:', {'font-size': '15px'}));
toolPanel.add(layerSelect);
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Remote Sensing of Environment paper by Moreno et al. (2020)', {},
    'https://doi.org/10.1016/j.rse.2020.111901');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel)
////////////////////////////////////////////////////////////////////////////////
//                  Non Linear interpolation algorithm
// Creat a dummy collection with regular time space
var dummyCollection =  ee.ImageCollection(ee.List.sequence({
      start: start.millis(),
      end: end.millis(),
      step: 1000 * 60 * 60 * 24 * tResolution
      }).map(function(date){
        var DOY = ee.Date(date).getRelative('day','year')
        return ee.Image(DOY).rename('DOY').float()
          //.clip(geometry)
          .set({
            'dummy': true,
            'system:time_start': ee.Date(date).millis(),
            'DOY': DOY
        })
  })
)
// the axes of variation in the collection array
var imageAxis = 0;
var bandAxis = 1;
//Fourier analysis
// compute the predictors, add them and the response as image bands
var makeVariables = function(image) {
  // time of the image in fractional years relative to the start
  var yeartemp = (image.get('DOY'))
  var year = ee.Image(ee.Number(yeartemp)).toFloat().divide(365);
  // the season in radians, one cycle per year
  var season = ee.Image(year).mod(1).multiply(2*Math.PI);
  return ee.Image(1)                        // 0. constant term
    .addBands(season.sin())                 // 2. seasonal change
    .addBands(season.cos())                 // 3. seasonal change
    .addBands((season.multiply(2)).sin())                 // 2. seasonal change
    .addBands(season.multiply(2).cos())                 // 3. seasonal change
    .addBands((season.multiply(3)).sin())                 // 2. seasonal change
    .addBands(season.multiply(3).cos())                 // 3. seasonal change
    .addBands((season.multiply(4)).sin())                 // 2. seasonal change
    .addBands(season.multiply(4).cos())                 // 3. seasonal change
    .addBands(image.select(['NDVI.*'])) // 4. response variable
    .toFloat();
};
// convert the collection to an array
var array = GFLandsat.map(makeVariables);
var N_coeff =ee.Image(array.first()).bandNames().length();
array = array.toArray();
//Creation of the array to estimate the coefficients
var predictors = array.arraySlice(bandAxis,0, ee.Number(N_coeff).subtract(1));
var response = array.arraySlice(bandAxis, ee.Number(N_coeff).subtract(1));
var coefficients = predictors.matrixPseudoInverse().matrixMultiply(response);
// turn the results into a multi-band image
var coefficientsImage = coefficients
  .arrayProject([0]) // get rid of the extra dimensions
  .arrayFlatten([
    ['constant', 'sin', 'cos', 'sin2','cos2', 'sin3','cos3', 'sin4','cos4']
]);
// Compute fitted values.
var fitted = GFLandsatyear.select('NDVI').map(function(image) {
  var ndvi = image;
    var yeartemp = (image.get('DOY'))
  var year = ee.Image(ee.Number(yeartemp)).toFloat().divide(365);
  // the season in radians, one cycle per year
  var oneCycle = ee.Image(year).mod(1).multiply(2*Math.PI);
  var predicted = coefficientsImage.select('constant')
    //.add(year.multiply(coefficientsImage.select('trend')))
    .add(oneCycle.sin().multiply(coefficientsImage.select('sin')))
    .add(oneCycle.cos().multiply(coefficientsImage.select('cos')))
    .add(oneCycle.multiply(2).sin().multiply(coefficientsImage.select('sin2')))
    .add(oneCycle.multiply(2).cos().multiply(coefficientsImage.select('cos2')))
    .add(oneCycle.multiply(3).sin().multiply(coefficientsImage.select('sin3')))
    .add(oneCycle.multiply(3).cos().multiply(coefficientsImage.select('cos3')))
    .add(oneCycle.multiply(4).sin().multiply(coefficientsImage.select('sin4')))
    .add(oneCycle.multiply(4).cos().multiply(coefficientsImage.select('cos4')))
  var errorsquare=(ndvi.subtract(predicted)).pow(2);  
  return image.select()
    .addBands(ndvi.select([0], ['NDVI']))
    .addBands(predicted.select([0], ['fitted']))
    .addBands(errorsquare.select([0], ['errorsquarefitted']));
});
// Compute fitted values.
var fitted = GFLandsatyear.select('NDVI').map(function(image) {
  var ndvi = image;
    var yeartemp = (image.get('DOY'))
  var year = ee.Image(ee.Number(yeartemp)).toFloat().divide(365);
  // the season in radians, one cycle per year
  var oneCycle = ee.Image(year).mod(1).multiply(2*Math.PI);
  var predicted = coefficientsImage.select('constant')
    .add(oneCycle.sin().multiply(coefficientsImage.select('sin')))
    .add(oneCycle.cos().multiply(coefficientsImage.select('cos')))
    .add(oneCycle.multiply(2).sin().multiply(coefficientsImage.select('sin2')))
    .add(oneCycle.multiply(2).cos().multiply(coefficientsImage.select('cos2')))
    .add(oneCycle.multiply(3).sin().multiply(coefficientsImage.select('sin3')))
    .add(oneCycle.multiply(3).cos().multiply(coefficientsImage.select('cos3')))
    .add(oneCycle.multiply(4).sin().multiply(coefficientsImage.select('sin4')))
    .add(oneCycle.multiply(4).cos().multiply(coefficientsImage.select('cos4')))
  var errorsquare=(ndvi.subtract(predicted)).pow(2);  
  return image.select()
    .addBands(ndvi.select([0], ['NDVI']))
    .addBands(predicted.select([0], ['fitted']))
    .addBands(errorsquare.select([0], ['errorsquarefitted']));
});
//Dummy prediction
var dummyres=ee.ImageCollection(dummyCollection).map(function(image) {
  var yeartemp = (image)
  var year = image.toFloat().divide(365);
  // the season in radians, one cycle per year
  var oneCycle = ee.Image(year).mod(1).multiply(2*Math.PI);
  var predicted = coefficientsImage.select('constant')
    .add(oneCycle.sin().multiply(coefficientsImage.select('sin')))
    .add(oneCycle.cos().multiply(coefficientsImage.select('cos')))
    .add(oneCycle.multiply(2).sin().multiply(coefficientsImage.select('sin2')))
    .add(oneCycle.multiply(2).cos().multiply(coefficientsImage.select('cos2')))
    .add(oneCycle.multiply(3).sin().multiply(coefficientsImage.select('sin3')))
    .add(oneCycle.multiply(3).cos().multiply(coefficientsImage.select('cos3')))
    .add(oneCycle.multiply(4).sin().multiply(coefficientsImage.select('sin4')))
    .add(oneCycle.multiply(4).cos().multiply(coefficientsImage.select('cos4')))
  return image.select()
      .addBands(predicted.select([0], ['fitteddummy']));
});
// Create panels to hold lon/lat values.
var latup=initialPoint.coordinates().get(0).getInfo();
var lonup=initialPoint.coordinates().get(1).getInfo();
//var lon = ui.Label();
//var lat = ui.Label();
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  //lon.setValue('lon: ' + coords.lon.toFixed(2));
  //lat.setValue('lat: ' + coords.lat.toFixed(2));
  lonup=coords.lon;
  latup=coords.lat;
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(lonup, latup);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  //mapPanel.layers().set(1, dot);
  mapPanel.layers().set(3, dot)
  // convert the collection to an array
var array = GFLandsatyear.select('NDVI').map(makeVariables);
var N_coeff =ee.Image(array.first()).bandNames().length();
array = array.toArray();
//Creation of the array to estimate the coefficients
var predictors = array.arraySlice(bandAxis,0, ee.Number(N_coeff).subtract(1));
var response = array.arraySlice(bandAxis, ee.Number(N_coeff).subtract(1));
var coefficients = predictors.matrixPseudoInverse().matrixMultiply(response);
// turn the results into a multi-band image
var coefficientsImage = coefficients
  .arrayProject([0]) // get rid of the extra dimensions
  .arrayFlatten([
    ['constant', 'sin', 'cos', 'sin2','cos2', 'sin3','cos3', 'sin4','cos4']
]);
// Compute fitted values.
var fitted = GFLandsatyear.select('NDVI').map(function(image) {
  var ndvi = image;
    var yeartemp = (image.get('DOY'))
  var year = ee.Image(ee.Number(yeartemp)).toFloat().divide(365);
  // the season in radians, one cycle per year
  var oneCycle = ee.Image(year).mod(1).multiply(2*Math.PI);
  var predicted = coefficientsImage.select('constant')
    //.add(year.multiply(coefficientsImage.select('trend')))
    .add(oneCycle.sin().multiply(coefficientsImage.select('sin')))
    .add(oneCycle.cos().multiply(coefficientsImage.select('cos')))
    .add(oneCycle.multiply(2).sin().multiply(coefficientsImage.select('sin2')))
    .add(oneCycle.multiply(2).cos().multiply(coefficientsImage.select('cos2')))
    .add(oneCycle.multiply(3).sin().multiply(coefficientsImage.select('sin3')))
    .add(oneCycle.multiply(3).cos().multiply(coefficientsImage.select('cos3')))
    .add(oneCycle.multiply(4).sin().multiply(coefficientsImage.select('sin4')))
    .add(oneCycle.multiply(4).cos().multiply(coefficientsImage.select('cos4')))
  var errorsquare=(ndvi.subtract(predicted)).pow(2);  
  return image.select()
    .addBands(ndvi.select([0], ['NDVI']))
    .addBands(predicted.select([0], ['fitted']))
    .addBands(errorsquare.select([0], ['errorsquarefitted']));
});
//Dummy prediction
var dummyres=ee.ImageCollection(dummyCollection).map(function(image) {
  var yeartemp = (image)
  var year = image.toFloat().divide(365);
  // the season in radians, one cycle per year
  var oneCycle = ee.Image(year).mod(1).multiply(2*Math.PI);
  var predicted = coefficientsImage.select('constant')
    .add(oneCycle.sin().multiply(coefficientsImage.select('sin')))
    .add(oneCycle.cos().multiply(coefficientsImage.select('cos')))
    .add(oneCycle.multiply(2).sin().multiply(coefficientsImage.select('sin2')))
    .add(oneCycle.multiply(2).cos().multiply(coefficientsImage.select('cos2')))
    .add(oneCycle.multiply(3).sin().multiply(coefficientsImage.select('sin3')))
    .add(oneCycle.multiply(3).cos().multiply(coefficientsImage.select('cos3')))
    .add(oneCycle.multiply(4).sin().multiply(coefficientsImage.select('sin4')))
    .add(oneCycle.multiply(4).cos().multiply(coefficientsImage.select('cos4')))
  return image.select()
      .addBands(predicted.select([0], ['fitteddummy']));
}); 
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series(dummyres.select('fitteddummy').sort('DOY').merge(GFLandsatyear.select('NDVI')), point, ee.Reducer.first(),30,'DOY');
  // Customize the chart.
  sstChart.setChartType('LineChart')
    .setSeriesNames(['HISTARFM','Interpolated'])
    .setOptions({
      title: 'Yearly temporal profile.',
      lineWidth: 1,
      pointSize: 1,
      hAxis:{ 
      title: 'DOY',
      ticks: [50, 150, 250, 350], 
      viewWindow: {
      min: 1,
      max: 365,
      }
      },
      series: {
            0: {color: '100500',  lineWidth: 1, pointSize: 3}
      },
      vAxis: {
      title: 'NDVI',
      viewWindow: {
        min: -0.1,
        max: 1}}});
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  //Map.layers().set(0, sstChart);
var paneltemp1= ui.Panel({style: {position: 'bottom-left', width: '380px'}});
var headlat = ui.Label('Click on the map for a different location.',{fontSize: '13px', color: 'Black'});
//var descrip=ui.Label('Actual location:');
paneltemp1.add(ui.Panel(headlat))
.add(sstChart)
//var latlon=ui.Panel([descrip, lon, lat], ui.Panel.Layout.flow('horizontal'));
//.widgets().set(3,ui.Panel([descrip, lon, lat], ui.Panel.Layout.flow('horizontal')))
//.add(ui.Panel(sstChart)).add(ui.Panel(headlat)).widgets().set(2, sstChart)
//paneltemp2.add(C
//inspectorPanel
//Map.widgets().set(2, paneltemp1)
mapPanel.widgets().set(3, paneltemp1)
//toolPanel.widgets().set(5, paneltemp1)
};
//.add(text_4).add(dateSlider.setValue(4))
// Register a callback on the default map to be invoked when the map is clicked.
//Map.onClick(generateChart);
generateChart({
  lon: latup,
  lat: lonup
});
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
//toolPanel.add(generateChar)
// And finally add the panel!
// Replace the root with a SplitPanel that contains the inspector and map.
//ui.root.clear();
//ui.root.add(ui.SplitPanel(mapPanel))