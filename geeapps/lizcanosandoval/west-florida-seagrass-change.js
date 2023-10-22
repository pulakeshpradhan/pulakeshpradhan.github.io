var regions = ui.import && ui.import("regions", "table", {
      "id": "users/lizcanosandoval/Seagrass/Regions_FL"
    }) || ee.FeatureCollection("users/lizcanosandoval/Seagrass/Regions_FL"),
    tb = ui.import && ui.import("tb", "table", {
      "id": "users/lizcanosandoval/Seagrass/TampaBay_Segments"
    }) || ee.FeatureCollection("users/lizcanosandoval/Seagrass/TampaBay_Segments"),
    seagrass = ui.import && ui.import("seagrass", "imageCollection", {
      "id": "users/lizcanosandoval/public/Seagrass_west_florida"
    }) || ee.ImageCollection("users/lizcanosandoval/public/Seagrass_west_florida");
/***
 * GEE APP: SEAGRASS COVER CHANGE IN WEST FLORIDA 1990-2021
 * Developed by: Luis Lizcano-Sandoval
 * College of Marine Science, University of South Florida
 * November 2021
 *  
*/
var regionList = {
  'Clearwater' : 'Clearwater',
  'Sarasota Bay' : 'Sarasota',
  'St. Joseph Sound' : 'St. Joseph',
  'Tampa Bay' : 'Tampa Bay',
  'Hillsborough Bay': 'Hillsborough Bay',
  'Old Tampa Bay' : 'Old Tampa Bay',
  'Middle Tampa Bay': 'Middle Tampa Bay',
  'Lower Tampa Bay': 'Lower Tampa Bay'
  };
var year = {'1990':1990,'1992':1992,'1996':1996,'1999':1999,'2000':2000,'2004':2004,'2005':2005,
  '2006':2006,'2010':2010,'2015':2015,'2016':2016,'2017':2017,'2018':2018,'2019':2019,
  '2020':2020,'2021':2020};
///////////////////////////////////////  INITIAL SECTION ///////////////////////////////////////////
// Map Layer
var map = ui.Map();
// Configure our map with a minimal set of controls.
map.setControlVisibility(true);
map.setControlVisibility({scaleControl: true, zoomControl: true});
map.setCenter(-82.60, 27.68, 9);
// Layer styles
var highlight_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
ui.root.clear();
ui.root.add(map);
// Create main panel:
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '350px'}
});
// Add the title	
var appTitle = ui.Label('Seagrass cover change in West Florida 1990-2021');
  appTitle.style().set('color', 'blue');
  appTitle.style().set('fontWeight', 'bold');
  appTitle.style().set({fontSize:'16px', padding:'10px', textAlign: 'center'});
// Add description	
var appDesc = ui.Label('Application to see differences in annual seagrass cover extent (km^2) '+
  'estimated with Landsat and Sentinel-2 satellite imagery in four regions of West Florida, '+
  'over several years between 1990 and 2021.');	
appDesc.style().set({fontSize:'13px', padding:'0px'});
/*
// App documentation
var docum = ui.Label({
    value: 'Click HERE to read scientific article (link not valid yet)',
    style: {
    fontSize: '13px',
    padding:'0px 0px 0px 80px', 
    stretch: 'horizontal', 
    textAlign: 'left'}
});
docum.setUrl('https://doi');
*/
// Add widgets to panel
panel.widgets().set(0,appTitle); //Add title to panel
panel.widgets().set(1,appDesc); //Add description to panel
//panel.widgets().set(2,docum); //Add documentation link
//panel.widgets().set(3,start);
/////////////////////////////////////////  EXTRA PANELS  /////////////////////////////////////////
// Create panel to allocate charts:
var chartPanel = ui.Panel();
chartPanel.style().set({
  width: '400px',
  position: 'bottom-right',
  backgroundColor: 'rgba(255, 255, 255, 0.7)'
});
// Create panel to allocate legend:
var legendPanel = ui.Panel();
legendPanel.style().set({
  width: '120px',
  position: 'bottom-left',
  backgroundColor: 'rgba(255, 255, 255, 0.7)'
});
/////////////////////////////////////  REGION SELECTION  ///////////////////////////////////////
// Text settings
var textRegion = ui.Label({
  value: '1. Choose Region:',
  style: {
    fontWeight: 'bold', 
    fontSize: '15px',
    padding: '0px', 
    stretch: 'horizontal', 
    textAlign: 'left'}
});
// Create selector and show selected region on Map.
var selectorRegion = ui.Select({
  items: Object.keys(regionList),
  placeholder: 'Choose Region...',
  style: {width: '35%', stretch: 'horizontal',padding:'0px 0px 0px 10px'},
  onChange: function drawRegion() {
    //Get selected region
    var feature = getSelectedRegion();
    //Add layers to map
    var overlayRegion = feature.style(highlight_STYLE);
    var layerRegion = map.layers().set(0,ui.Map.Layer(overlayRegion,{opacity: 0.5},'Region')); //Layer number 0, always
    map.layers().set(1,ui.Map.Layer(overlayRegion,{opacity: 0.1}));//Empty layer
    map.layers().get(1).setShown(0);//Hide empty layer
    map.setCenter(-82.60, 27.68, 9);
    // Reset panels
    map.widgets().remove(chartPanel);//Remove chart panel
    map.widgets().remove(legendPanel);//Remove legend panel
    // Enable buttons.
    startYear.setDisabled(0);
    buttonMap.setDisabled(0);
    return layerRegion;
  }
});
//Function to get selected region
function getSelectedRegion() {
    var test = ee.String(regionList[selectorRegion.getValue()]).length();
    var ifCondition = ee.Algorithms.If({
      condition: ee.Number(test).lt(11), //string size
      trueCase: regions,
      falseCase: tb
    });
    var selectedRegion = ee.FeatureCollection(ifCondition).filterMetadata('name','equals',(regionList[selectorRegion.getValue()]));
    return selectedRegion;
}
// Add widgets to panel
panel.widgets().set(4,textRegion);
panel.widgets().set(5,selectorRegion);
//////////////////////////////////////  YEAR SELECTION  //////////////////////////////////////////
var textYear = ui.Label({
  value: '2. Choose Period:',
  style: {
    fontWeight: 'bold', 
    fontSize: '15px',
    padding: '0px', 
    stretch: 'horizontal', 
    textAlign: 'left'}
});
var textStart = ui.Label({
  value: 'Start year:',
  style: {
    fontSize: '13px',
    padding: '0px 0px 0px 30px', 
    stretch: 'horizontal', 
    }
});
var startYear = ui.Select({
  items: Object.keys(year),
  placeholder: 'Choose Year...',
  style: {width: '35%', stretch: 'horizontal',padding:'0px 0px 0px 10px'},
  onChange: function(){
    // Reset layers and panels when selecting a new year:
    var feature = getSelectedRegion();
    var overlayRegion = feature.style(highlight_STYLE);
    map.layers().set(1,ui.Map.Layer(overlayRegion,{opacity: 0.1}));//Empty layer
    map.layers().get(1).setShown(0);//Hide empty layer
    map.widgets().remove(chartPanel);//Remove chart panel
    map.widgets().remove(legendPanel);//Remove legend panel
    // Enable buttons.
    endYear.setDisabled(0);
    buttonMap.setDisabled(0);
  }
});
startYear.setDisabled(1);
var textEnd = ui.Label({
  value: 'End year:',
  style: {
    fontSize: '13px',
    padding: '0px 0px 0px 0px', 
    stretch: 'horizontal', 
    }
});
var endYear = ui.Select({
  items: Object.keys(year),
  placeholder: 'Choose Year...',
  style: {width: '40%', stretch: 'horizontal',padding:'0px 0px 0px 20px'},
  onChange: function(){
    // Reset layers and panels when selecting a new year:
    var feature = getSelectedRegion();
    var overlayRegion = feature.style(highlight_STYLE);
    map.layers().set(1,ui.Map.Layer(overlayRegion,{opacity: 0.1}));//Empty layer
    map.layers().get(1).setShown(0);//Hide empty layer
    map.widgets().remove(chartPanel);//Remove chart panel
    map.widgets().remove(legendPanel);//Remove legend panel
    // Enable button to get results.
    buttonMap.setDisabled(0);
  }
});
endYear.setDisabled(1);
// Add widgets to panel
panel.widgets().set(7,ui.Panel([textYear],
  ui.Panel.Layout.flow('vertical')));
panel.widgets().set(8,ui.Panel([  
  textStart,
  textEnd],
  ui.Panel.Layout.flow('horizontal')));
panel.widgets().set(9,ui.Panel([  
  startYear,
  endYear],
  ui.Panel.Layout.flow('horizontal')));
////////////////////////////////////////  MAP CREATION  /////////////////////////////////////////
// Text settings
var textMap = ui.Label({
  value: '3. Create Map:',
  style: {
    fontWeight: 'bold', 
    fontSize: '15px',
    padding: '0px', 
    stretch: 'horizontal', 
    textAlign: 'left'}
});
// Create selector and show selected region on Map.
var buttonMap = ui.Button({
  label: 'Create map',
  style: {width: '35%', stretch: 'horizontal',padding:'0px 0px 0px 10px'},
  onClick: function getResults() {
    //Load seagrass maps
    var mapsCollection = getSeagrassMaps();
    var changesCollection = getSeagrassChanges();
    var changesImage = changesCollection.sum();
    //Add layer of seagrass changes to map and insert other panels:
    var map_style = {min:1,max:3,palette:['red','green','yellow']};
    var layerChanges = map.layers().set(1,ui.Map.Layer(changesImage,map_style,'SeagrassChanges'));
    map.centerObject(getSelectedRegion(), 12);
    map.widgets().insert(0,chartPanel);//Insert chart panel
    map.widgets().insert(1,legendPanel);//Insert legend panel
    //Create and add chart panel title
    var chartPanelTitle = ui.Label('Seagrass Area Changes in '+selectorRegion.getValue()+' '+
    startYear.getValue()+'-'+endYear.getValue());
    chartPanelTitle.style().set('color', '#1b8500');
    chartPanelTitle.style().set('fontWeight', 'bold');
    chartPanelTitle.style().set({fontSize:'14px', padding:'10px', textAlign: 'center'});
    chartPanel.widgets().set(0,ui.Panel({widgets:[chartPanelTitle]}));
    // Create and add charts
    var areaChart = areasResults(mapsCollection);
    var barChart = changeResults(changesImage);
    // Disable button to avoid calling errors if hitting button several times.
    buttonMap.setDisabled(1);
    return layerChanges;
  }
});
buttonMap.setDisabled(1);
// Function to retrieve seagrass maps for the initial and end selected years.
function getSeagrassMaps(){
  var year1 = ee.String(startYear.getValue());
  var year2 = ee.String(endYear.getValue());
  // Get respective maps
  var map1 = seagrass.filter(ee.Filter.stringContains('system:index',year1)).first();
  var map2 = seagrass.filter(ee.Filter.stringContains('system:index',year2)).first();
  // Reproject to 10m
  var repr1 = ee.Image(map1).reproject('EPSG:4326',null,10);
  var repr2 = ee.Image(map2).reproject('EPSG:4326',null,10);
  // Clip maps, rename bands, and set an unique property
  var feature = getSelectedRegion();
  var finalMap1 = ee.Image.constant(1).updateMask(repr1.clip(feature)).rename('b1').set('map','map1');
  var finalMap2 = ee.Image.constant(1).updateMask(repr2.clip(feature)).rename('b1').set('map','map2');
  var images = ee.ImageCollection([finalMap1,finalMap2]);
  return images;
}
// Function to get seagrass change images
function getSeagrassChanges(){
  var seagrassMaps = getSeagrassMaps();
  // Get maps
  var finalMap1 = seagrassMaps.filter(ee.Filter.eq('map','map1')).first();//Initial
  var finalMap2 = seagrassMaps.filter(ee.Filter.eq('map','map2')).first();//Final
  // Create masks of gain, loss, and no change areas
  var maskLoss = finalMap1.add(finalMap2.mask()); //1: Loss, 2: No change
  var maskGain = finalMap2.add(finalMap1.mask()); //1: Gain, 2: No change
  var noChange = finalMap1.updateMask(maskGain.eq(2));
  var getLoss = maskLoss.eq(1);
  var getGain = maskGain.eq(1);
  var loss = finalMap1.updateMask(getLoss);
  var gain = finalMap2.updateMask(getGain);
  // Combine images into one.
  var change1 = ee.Image.constant(1).updateMask(loss).toInt().rename('b1').set('class','loss'); //Loss
  var change2 = ee.Image.constant(2).updateMask(noChange).toInt().rename('b1').set('class','noChange'); //noChange
  var change3 = ee.Image.constant(3).updateMask(gain).toInt().rename('b1').set('class','gain'); //Gain
  var allChanges = ee.ImageCollection([change1,change2,change3]);
  return allChanges;
}
// Add widgets to panel
panel.widgets().set(10,textMap);
panel.widgets().set(11,buttonMap);
//////////////////////////////////// AREA CALCULATION FUNCTIONS //////////////////////////////////
// Function to calculate areas per pixel value
function getAreas(image,pixel){
  var img = ee.Image(image);
  var getClass = img.eq(pixel);
  var Area = getClass.multiply(ee.Image.pixelArea());
  var reducerArea = Area.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: getSelectedRegion(),
    scale: 10,
    maxPixels: 1e15
  });
  var areaSqKm = ee.Number(reducerArea.get('b1')).divide(1e6);
  return areaSqKm;
}
// Function to calculate areas for year and create chart:
function areasResults(mapsCollection){
    //Get seagrass maps from initial and end years
    var map1 = mapsCollection.filter(ee.Filter.eq('map','map1')).first();
    var map2 = mapsCollection.filter(ee.Filter.eq('map','map2')).first();
    //Calculate areas (km2)
    var areaMap1 = getAreas(map1,1);
    var areaMap2 = getAreas(map2,1);
    //Get year labels
    var year1 = ee.String(startYear.getValue());
    var year2 = ee.String(endYear.getValue());
    //Convert into a feature containing values
    var areasFeature = ee.Feature(null).set(year1,areaMap1,year2,areaMap2);
    //Create Chart
    var chart = areaChart(areasFeature);
    return chart;
}
// Function to calculate areas for seagrass change class:
function changeResults(changesImage){
    //Calculate areas (1:Loss, 2:noChange, 3:Gain):
    var areaLoss = getAreas(changesImage,1);
    var areaGain = getAreas(changesImage,3);
    var areaNet = areaGain.subtract(areaLoss);
    //Get year labels
    var year1 = ee.String(startYear.getValue());
    var year2 = ee.String(endYear.getValue());
    //Convert into a feature containing values
    var areasFeature = ee.Feature(null).set('Loss',areaLoss,'Gain',areaGain,'Net Change',areaNet);
    //Create Chart
    var chart = barChart(areasFeature);
    return chart;
}
//// CHARTS
// Chart function with specific settings
function areaChart(feature){
  // Get property names
  var properties = feature.propertyNames().sort();
  // Create chart
  var chart = ui.Chart.feature.byProperty({
   features: feature,
   xProperties: properties,
  });
  var chartStyle = {
  title: 'Seagrass Area in Selected Years',
  titleTextStyle: {fontSize: 12},
  hAxis: {
    title: 'Period',
    titleTextStyle: {italic: false, bold: true, fontSize: 12},
    textStyle: {fontSize: 12},
    gridlines: {color: 'FFFFFF'}
  },
  vAxis: {
    viewWindow: {min: 0},
    title: 'Seagrass Area (km^2)',
    titleTextStyle: {italic: false, bold: true, fontSize: 12},
    textStyle: {fontSize: 12},
    gridlines: {color: 'FFFFFF'},
    format: 'short',
    baselineColor: 'FFFFFF'
  },
  series: {
    0: {lineWidth: 3, color: 'E37D05', pointSize: 7}
  },
  legend: {position: 'none'},
  chartArea: {backgroundColor: 'EBEBEB'}
  };
  // Chart options
  chart.setChartType('ColumnChart');
  chart.setOptions(chartStyle);
  chartPanel.widgets().set(1,ui.Panel({widgets:[chart]}));
}
// Chart function with specific settings
function barChart(feature){
  // Get property names
  var properties = feature.propertyNames().sort();
  // Create chart
  var chart = ui.Chart.feature.byProperty({
   features: feature,
   xProperties: properties,
  });
  var chartStyle = {
  title: 'Difference Between Seagrass Areas From Selected Years',
  titleTextStyle: {fontSize: 12},
  hAxis: {
    title: '',
    titleTextStyle: {italic: false, bold: true, fontSize: 12},
    textStyle: {fontSize: 12},
    gridlines: {color: 'FFFFFF'}
  },
  vAxis: {
    title: 'Seagrass Area (km^2)',
    titleTextStyle: {italic: false, bold: true, fontSize: 12},
    textStyle: {fontSize: 12},
    gridlines: {color: 'FFFFFF'},
    format: 'short',
    baselineColor: 'FFFFFF'
  },
  legend: {position: 'none'},
  chartArea: {backgroundColor: 'EBEBEB'}
  };
  // Chart options
  chart.setChartType('ColumnChart');
  chart.setOptions(chartStyle);
  chartPanel.widgets().set(2,ui.Panel({widgets:[chart]}));
}
//////////////////////////////////////////   LEGEND   ///////////////////////////////////////////
// Function to add classes palette in panel:
var add_legend = function(title, lbl, pal) {
   var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
   legend.add(ui.Label({value: title, style: {fontWeight: 'bold', fontSize: '12px', margin: '0px 0px 4px 8px', padding: '0px' } }));
   for (var x = 0; x < lbl.length; x++){
     entry = [ ui.Label({style:{fontSize: '10px', color: pal[x], margin: '0 0 4px 8px'}, value: '██'}),
       ui.Label({value: labels[x], style: {fontSize: '14px', margin: '0px 0px 4px 4px',backgroundColor: '#ffffff'}})];
     legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal'),{backgroundColor: '#ffffff'}));
   }
    // Put legend in panel:
    legendPanel.widgets().set(0,ui.Panel([legend],ui.Panel.Layout.Flow('horizontal'))); 
};
// First part of the legend:
var labels = ['Loss','Gain','No Change'];
var lg_palette = ['red','yellow','green'];
// Run function to add legend in panel:
add_legend('Pixel class:', labels, lg_palette);
legendPanel.widgets().get(0).style().set({shown: true});
/////////////////////////////////////  IMAGERY SELECTION  //////////////////////////////////////
/*
var textYear = ui.Label({
  value: '4. Available Images:',
  style: {
    fontWeight: 'bold', 
    fontSize: '15px',
    padding: '0px', 
    stretch: 'horizontal', 
    textAlign: 'left'}
});
var textStart = ui.Label({
  value: 'Start year:',
  style: {
    fontSize: '13px',
    padding: '0px 0px 0px 30px', 
    stretch: 'horizontal', 
    }
});
*/
/////////////////////////////////////////   INFORMATION   ////////////////////////////////////////
// Quick instructions
var citation = ui.Label('Suggested Citation: Lizcano-Sandoval, L., Anastasiou, C., Montes, E., '+
  'Raulerson, G., Sherwood, E.  & Muller-Karger, F. (In Press) Seagrass distribution and changes (1990–2021) '+
  'in coastal waters off West-Central Florida, USA. Estuarine, Coastal and Shelf Science');	
citation.style().set({fontSize:'12px'});
// Add widgets to panel
panel.widgets().set(12,citation);
//panel.widgets().set(13,buttonMap);
ui.root.insert(0, panel);