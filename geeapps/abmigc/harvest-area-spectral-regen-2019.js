//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// 
// Script: Visualizing key spectral regeneration metrics for the Harvest Area 2019 Spectral Regeneration Dataset
//
// Author: Jennifer Hird, Lead Scientist, Earth Observation Insights Unit
//         Geospatial Centre, Alberta Biodiversity Monitoring Institute
//
// Contact: jennifer.hird@ualberta.ca | twitter: @JNHird | online: abmi.ca
//
// Last Updated: October 31, 2022
//
// Key Changes:
//  > Included Year of Harvest Event from ABMI source for those where it is not derived from remote sensing (i.e.,
//      all harvest area polygons have year of harvest in map)
//  > Updated the input dataset to 2019 conditions (and updated text/app accordingly)
//
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:: Import dataset
//:: Link to asset: https://code.earthengine.google.com/?asset=users/abmigc/SpecRegen/HarvAreasSpecRegn2019_Simplified_20221031
var dataTableNew = ee.FeatureCollection("users/abmigc/SpecRegen/HarvAreasSpecRegn2019_Simplified_20221031");
//:: Filter dataset for visualization
var relvHAs = dataTableNew.filter(ee.Filter.gt('hrvYr_m',0));
var oldHAs = dataTableNew.filter(ee.Filter.lte('hrvYr_m',0));
var allHAs = dataTableNew;
var otherHAs = dataTableNew.style({color:'808080FF',fillColor:'808080FF'});
//:: Add year of harvest age class
/*
  Year of Harvest Classes
  1920 - 1929
  1930 - 1939
  1940 - 1949
  1950 - 1959
  1960 - 1969
  1970 - 1979
  1980 - 1989
  1990 - 1999
  2000 - 2009
  2010 - 2019
*/
var addYrClass = function(poly){
  var yr = ee.Number(poly.get('YEAR'));
  var cls = ee.Algorithms.If(
    yr.lte(1929),
    1920,
    ee.Algorithms.If(
      yr.gt(1929).and(yr.lte(1939)),
      1930,
      ee.Algorithms.If(
        yr.gt(1939).and(yr.lte(1949)),
        1940,
        ee.Algorithms.If(
          yr.gt(1949).and(yr.lte(1959)),
          1950,
          ee.Algorithms.If(
            yr.gt(1959).and(yr.lte(1969)),
            1960,
            ee.Algorithms.If(
              yr.gt(1969).and(yr.lte(1979)),
              1970,
              ee.Algorithms.If(
                yr.gt(1979).and(yr.lte(1989)),
                1980,
                ee.Algorithms.If(
                  yr.gt(1989).and(yr.lte(1999)),
                  1990,
                  ee.Algorithms.If(
                    yr.gt(1999).and(yr.lte(2009)),
                    2000,
                    ee.Algorithms.If(
                      yr.gt(2009).and(yr.lte(2019)),
                      2010,
                      0
                    ))))))))));
  return poly.set('yrClass', cls);
};
relvHAs = relvHAs.map(addYrClass);
oldHAs = oldHAs.map(addYrClass);
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//   Create Maps
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var layerLabStyle = {fontSize:'16px',fontWeight:'bold',border:'1px solid black',padding:'5px 15px 5px 15px'};
var panelBorderStyle = {border:'1px solid black'};
//:: --- Map 1 (Year of Harvest) --
var oldHAclss = oldHAs.reduceToImage({properties:['yrClass'],reducer:ee.Reducer.firstNonNull()}).rename('abmiYrClass');
var oldClssViz = {
  min:1920, max:1980,
  palette:['#2980b9','#72b6e4','#1abc9c','#2ecc71','#b7c917','#fde924','#fcba03'/*,'#fd9824', '#ff6600','#ff2500'*/]
};
var harvHAclss = relvHAs.reduceToImage({properties:['yrClass'],reducer:ee.Reducer.firstNonNull()}).rename('nbrYrClass');
var harvClssViz = {
  min:1980, max:2010,
  palette:[/*'#2980b9','#72b6e4','#1abc9c','#2ecc71','#b7c917','#fde924',*/'#fcba03','#fd9824', '#ff6600','#ff2500']
};
var harvOutlines = ee.Image().byte().paint({
  featureCollection: relvHAs,
  width: 2
});
var outlineViz = {
  palette:['#202020']
};
var map1 = ui.Map();
map1.setOptions({mapTypeId:'SATELLITE'});
map1.setControlVisibility(false);
map1.addLayer(oldHAclss.visualize(oldClssViz));
map1.addLayer(harvHAclss.visualize(harvClssViz));
// map1.addLayer(harvOutlines.visualize(outlineViz));
var map1lab = ui.Label('Decade of Detected Harvest Event');
map1lab.style().set(layerLabStyle);
map1.add(map1lab);
map1.style().set(panelBorderStyle);
map1.setCenter(-114.5726, 55.6136,12);
map1.style().set('cursor', 'crosshair');
//:: --- Map 2 (Regen2019) --
var reg2019Img = relvHAs.reduceToImage({properties:['reg2019_m'],reducer:ee.Reducer.first()}).rename('reg2019_m');
var reg2019viz = {
  min:0, max:150,
  palette: ["#ca3226","#f9e373","#64c042","#2e570f"]
};
var map2 = ui.Map();
map2.setOptions({mapTypeId:'SATELLITE'});
map2.setControlVisibility(false);
map2.addLayer(otherHAs);
map2.addLayer(reg2019Img.visualize(reg2019viz));
// map2.addLayer(harvOutlines.visualize(outlineViz));
var map2lab = ui.Label('Spectral Regeneration (%) in 2019');
map2lab.style().set(layerLabStyle);
map2.add(map2lab);
map2.style().set(panelBorderStyle);
map2.style().set('cursor', 'crosshair');
//:: --- Map 3 (5-Yr Regen) --
var reg5yImg = relvHAs.reduceToImage({properties:['reg5yr_m'],reducer:ee.Reducer.first()}).rename('reg5yr_m');
var reg5yViz = {
  min:0, max:150,
  palette: ["#ca3226","#f9e373","#64c042","#2e570f"]
};
var map3 = ui.Map();
map3.setOptions({mapTypeId:'SATELLITE'});
map3.setControlVisibility(false);
map3.addLayer(otherHAs);
map3.addLayer(reg5yImg.visualize(reg5yViz));
// map3.addLayer(harvOutlines.visualize(outlineViz));
var map3lab = ui.Label('5-Year Spectral Regeneration (%)');
map3lab.style().set(layerLabStyle);
map3.add(map3lab);
map3.style().set(panelBorderStyle);
map3.style().set('cursor', 'crosshair');
//:: --- Map 4 (Yrs to 80% Regen) --
var regyr80Img = relvHAs.reduceToImage({properties:['y2reg80_m'],reducer:ee.Reducer.first()}).rename('y2reg80_m');
var regyr80Viz = {
  min:0, max:25,
  palette: ['#9be564','#d7f75b','#d19c1d','#7d451b','#472c1b']
};
var map4 = ui.Map();
map4.setOptions({mapTypeId:'SATELLITE'});
map4.setControlVisibility(false);
map4.addLayer(otherHAs);
map4.addLayer(regyr80Img.visualize(regyr80Viz));
// map4.addLayer(harvOutlines.visualize(outlineViz));
var map4lab = ui.Label('Years to 80% Spectral Regeneration');
map4lab.style().set(layerLabStyle);
map4.add(map4lab);
map4.style().set(panelBorderStyle);
map4.style().set('cursor', 'crosshair');
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//   Set up Legends 
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:: BASED ON CODE FROM:
//::  https://code.earthengine.google.com/7be167882a772c6ddcbc67b2345eac64
//::  https://gis.stackexchange.com/questions/345058/add-legend-in-a-splitpanel-in-google-earth-engine/345229#345229
//::  Author: Daniel Wiell, StackExchange
var panStyle = {position:'bottom-left',padding:'2px'};
var titleStyle = {fontWeight:'bold',fontSize:'14px',margin:'0 0 4px 0',padding:'0'};
var labStyle = {margin:'1px 10px 0px 0px',padding:'0'};
var colStyle = {margin:'1px 7px 0px 0px',padding:'0', position:'bottom-left'};
var lab2Style = {margin:'0px,2px,0px,3px', padding:'0', position: 'top-left', textAlign: 'left'};
var gradientStyle = {margin:'0px,2px,0px,3px', padding: '1px', position: 'bottom-center'};
//:: Legend 1
//------------
//COLORS:      blue,      lighter blue,  med cyan,   med green,  lime green,  yellow,    dark yellow,  light orange,  med/dark orange,  red]       
//palette: [   '#2980b9', '#72b6e4',     '#1abc9c',  '#2ecc71',  '#b7c917',   '#fde924', '#fcba03',    '#fd9824',     '#ff6600',        '#ff2500']
//yrClsList = ['1920s',   '1930s',       '1940s',    '1950s',    '1960s',     '1970s',   '1980s',      '1990s',       '2000s',          '2010s'];
//:: Create panel and title label
var legend1 = ui.Panel({style:panStyle});
var leg1Title = ui.Label({value:'Legend',style: titleStyle});
legend1.add(leg1Title); 
var panelYrs = ui.Panel({
  widgets: [ui.Label({value:'1920s',style:labStyle}), 
  ui.Label({value:'1930s',style:labStyle}), 
  ui.Label({value:'1940s',style:labStyle}), 
  ui.Label({value:'1950s',style:labStyle}), 
  ui.Label({value:'1960s',style:labStyle}),
  ui.Label({value:'1970s',style:labStyle}), 
  ui.Label({value:'1980s',style:labStyle}), 
  ui.Label({value:'1990s',style:labStyle}), 
  ui.Label({value:'2000s',style:labStyle}), 
  ui.Label({value:'2010s',style:labStyle})],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend1.add(panelYrs);
var panelColors = ui.Panel({
  widgets:[ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#2980b9']}, //1920s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#72b6e4']}, //1930s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#1abc9c']}, //1940s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#2ecc71']}, //1950s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#b7c917']}, // 1960s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#fde924']}, // 1970s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#fcba03']}, // 1980s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#fd9824']}, // 1990s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#ff6600']}, // 2000s
    style: colStyle
  }),
  ui.Thumbnail({
    image: ee.Image(1),
    params: {dimensions:'41x10', palette:['#ff2500']}, // 2010s
    style: colStyle
  })
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend1.add(panelColors);
// add to map
map1.add(legend1);
//:: Legend 2
//------------
//:: Create panel and title label
var legend2 = ui.Panel({style:panStyle});
var leg1Title = ui.Label({value:'Legend',style: titleStyle});
legend2.add(leg1Title); 
// create text on top of legend
var panelMax = ui.Panel({widgets: [ui.Label({value: reg2019viz['max']+' %', style:lab2Style})]});
legend2.add(panelMax);
// create thumbnail of gradient
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((reg2019viz.max-reg2019viz.min)/100.0).add(reg2019viz.min);
var legendImage = gradient.visualize(reg2019viz);
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: gradientStyle
});
// add the thumbnail to the legend
legend2.add(thumbnail);
// create text on bottom of legend
var panelMin = ui.Panel({widgets: [ui.Label({value: reg2019viz['min']+' %', style:lab2Style})]});
legend2.add(panelMin);
// add to map
map2.add(legend2);
//:: Legend 3
//------------
//:: Create panel and title label
var legend3 = ui.Panel({style:panStyle});
var leg1Title = ui.Label({value:'Legend',style: titleStyle});
legend3.add(leg1Title); 
// create text on top of legend
var panelMax = ui.Panel({widgets: [ui.Label({value: reg5yViz['max']+' %', style:lab2Style})]});
legend3.add(panelMax);
// create thumbnail of gradient
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((reg5yViz.max-reg5yViz.min)/100.0).add(reg5yViz.min);
var legendImage = gradient.visualize(reg5yViz);
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: gradientStyle
});
// add the thumbnail to the legend
legend3.add(thumbnail);
// create text on bottom of legend
var panelMin = ui.Panel({widgets: [ui.Label({value: reg5yViz['min']+' %', style:lab2Style})]}); 
legend3.add(panelMin);
// add to map
map3.add(legend3);
//:: Legend 4
//------------
//:: Create panel and title label
var legend4 = ui.Panel({style:panStyle});
var leg1Title = ui.Label({value:'Legend',style: titleStyle});
legend4.add(leg1Title); 
// create text on top of legend
var panelMax = ui.Panel({widgets: [ui.Label({value: regyr80Viz['max']+' yrs', style:lab2Style})]}); 
legend4.add(panelMax);
// create thumbnail of gradient
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((regyr80Viz.max-regyr80Viz.min)/100.0).add(regyr80Viz.min);
var legendImage = gradient.visualize(regyr80Viz);
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: gradientStyle
});
// add the thumbnail to the legend
legend4.add(thumbnail);
// create text on bottom of legend
var panelMin = ui.Panel({widgets: [ui.Label({value: regyr80Viz['min']+' yrs', style:lab2Style})]});
legend4.add(panelMin);
// add to map
map4.add(legend4);
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//   Set up Panels 
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:: -- Map panel --
//------------------
//:: Set visibility of controls in maps
map1.setControlVisibility({zoomControl:true,fullscreenControl:true,mapTypeControl:true,scaleControl:true});
map2.setControlVisibility({mapTypeControl:true,fullscreenControl:true,scaleControl:true});
map3.setControlVisibility({mapTypeControl:true,fullscreenControl:true,scaleControl:true});
map4.setControlVisibility({mapTypeControl:true,fullscreenControl:true,scaleControl:true});
//:: Create linker to link 4 maps
var mapLink = ui.Map.Linker([map1, map2, map3, map4]);
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([map1, map2], null, {stretch: 'both'}),
      ui.Panel([map3, map4], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// -- Info panel -- 
//------------------
//:: -- Text boxes --
// Create a title.
var toolTitle = ui.Label('ABMI Harvest Area 2019 Spectral Regeneration Dataset: Visualization Tool', {
  stretch: 'horizontal',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '20px',
  padding: '2px 5px 0px 5px'
  // backgroundColor: bckCol
});
//:: Create a subtitle note
var subTitle = ui.Label('Note: grey polygons represent harvest areas not suitable for deriving satellite-based spectral regeneration. See Metatdata documentation for more details (abmi.ca). Questions about the app can be directed to Jennifer Hird (jennifer.hird@ualberta.ca) or Cynthia McClain (cmcclain@ualberta.ca).');
subTitle.style().set({textAlign:'left',fontSize:'12px',backgroundColor:'#EEEEEE', stretch:'horizontal',padding: '5px'});
//:: Create instruction label
var instrLab = ui.Label('Click a harvest area to see some of its spectral regeneration metrics. Note: Year of Detected Harvest Event includes year of harvest as provided by the ABMI HFI for those area without spectral regeneration metrics.');
instrLab.style().set({
  textAlign:'left', fontSize:'15px', stretch:'horizontal',
  padding: '5px', border:'1px solid lightGray', backgroundColor: '#EEEEEE'
});
var harvHeading = ui.Label('Info for Selected Harvest Area');
harvHeading.style().set({
  textAlign:'left', fontSize:'16px',fontWeight:'bold',
  stretch:'horizontal'
});
//:: -- Info boxes --
var notDatTxt = '...';
//:: Lat/Long
var lon = ui.Label(notDatTxt);
var lat = ui.Label(notDatTxt);
var lonlatpPanel = ui.Panel([
  ui.Label({value: 'Clicked Location (Lat/Long):', 
    style:{fontSize: '14px', fontWeight: 'bold', shown: 'false'}}),
  lon, lat],
  ui.Panel.Layout.flow('vertical')
);
//:: Year of Harvest
var yrHarvTitle = ui.Label({value:'Year of Detected Harvest Event:',style:{fontSize:'14px', fontWeight: 'bold'}});
var yrHarvVal = ui.Label({value:notDatTxt, style:{fontSize:'14px'}});
var yrHarvPanel = ui.Panel({
  widgets:[yrHarvTitle,yrHarvVal],
  layout: ui.Panel.Layout.flow('vertical')
});
//:: Spec Regn 2019
var spRg19Title = ui.Label({value:'Spectral Regeneration (%) in 2019:',style:{fontSize:'14px', fontWeight: 'bold'}});
var spRg19Val = ui.Label({value:notDatTxt, style:{fontSize:'14px'}});
var spRg19Panel = ui.Panel({
  widgets:[spRg19Title,spRg19Val],
  layout: ui.Panel.Layout.flow('vertical')
});
//:: 5-Yr Reg
var spRg5Title = ui.Label({value:'5-Year Spectral Regeneration (%):',style:{fontSize:'14px', fontWeight: 'bold'}});
var spRg5Val = ui.Label({value:notDatTxt, style:{fontSize:'14px'}});
var spRg5Panel = ui.Panel({
  widgets:[spRg5Title,spRg5Val],
  layout: ui.Panel.Layout.flow('vertical')
});
//:: Yr to 80 Reg
var y2r80Title = ui.Label({value:'Years to 80% Spectral Regeneration:',style:{fontSize:'14px', fontWeight: 'bold'}});
var y2r80Val = ui.Label({value:notDatTxt, style:{fontSize:'14px'}});
var y2r80Panel = ui.Panel({
  widgets:[y2r80Title,y2r80Val],
  layout: ui.Panel.Layout.flow('vertical')
});
//:: -- Messages to user --
//:: Create panel for status message for user
var statusMsg = ui.Label({
    value: '<Data extraction status...>',
    style:{
      fontSize: '12px',
      color: 'gray'
    }
  });
var statusPanel = ui.Panel([
  statusMsg
]);
//:: -- Add widgets to, style panel --
//:: Add widgets to Info Panel
var infoPanel = ui.Panel({widgets:[
    toolTitle,
    instrLab,
    statusMsg,
    harvHeading,
    lonlatpPanel,
    yrHarvPanel,
    spRg19Panel,
    spRg5Panel,
    y2r80Panel,
    subTitle],
  layout:'flow',
  style:{width:'300px', border:'1px solid black'}
});
//::--- Event Handling Function(s) ---
//:: Create emtpy layer to add selected HA polygon to
var selHAlayer = ui.Map.Layer();
var selHAlayer2 = ui.Map.Layer();
var selHAlayer3 = ui.Map.Layer();
var selHAlayer4 = ui.Map.Layer();
//:: Create panel for 'Calculating' message for user
var calcMsg = ui.Panel([
  ui.Label({
    value: 'Please wait. Extracting values...',
    style:{
      color: 'blue',
      fontWeight: 'bold'
    }
  })
]);
calcMsg.style().set({
  position: 'bottom-right',
  textAlign: 'center',
  padding: '1px 2px 1px 2px',
  shown: false
});
map1.add(calcMsg);
//:: Create panel for 'Error' message for user
var errMsg = ui.Panel([
  ui.Label({
    // value: 'Please click on a harvest area feature shown in colour.',
    value: 'Please click on a harvest area feature.',
    style: {
      color: 'red',
      fontWeight: 'bold',
      padding: '0px'
    }
  })
]);
errMsg.style().set({
  position: 'bottom-right',
  textAlign: 'center',
  padding: '1px 2px 1px 2px',
  shown: false
});
map1.add(errMsg);
//:: Callback function for when a map is clicked
//-------------------------------------------------
var infoFill = function(coords) {
  statusMsg.setValue('');
  statusMsg.setValue('Status: Calculating...');
  statusMsg.style().set({
    color: 'blue'
  });
  //:: Print calculating message on screen
  calcMsg.style().set('shown', true);
  //:: Remove error message from previous click
  errMsg.style().set('shown', false);
  //:: If selected HA outline layer is already listed, remove it
  if (map1.layers().length() > 2) {
    map1.layers().remove(selHAlayer);
  }
  if (map2.layers().length() > 2) {
    map2.layers().remove(selHAlayer2);
  }
  if (map3.layers().length() > 2) {
    map3.layers().remove(selHAlayer3);
  }
  if (map4.layers().length() > 2) {
    map4.layers().remove(selHAlayer4);
  }
  //:: Create geometry where user clicked
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //:: Logical variable: whether the clicked location is contained within the feature collection
  var ptInRelvPoly = point.containedIn(relvHAs.filterBounds(map1.getBounds(true)).geometry()).getInfo(); 
  var ptInOldPoly = point.containedIn(oldHAs.filterBounds(map1.getBounds(true)).geometry()).getInfo();
  //:: Conditional statement
  if (ptInRelvPoly === true) {
    statusMsg.setValue('Status: Calculating...');
    statusMsg.style().set({
      color: 'blue'
    });
    //:: Remove error message, if shown
    errMsg.style().set('shown', false);
    //:: Print calculating message on screen
    calcMsg.style().set('shown', true);
    //:: Update the lon/lat panel with values from the click event.
    lon.setValue('lon: ' + coords.lon.toFixed(2)),
    lat.setValue('lat: ' + coords.lat.toFixed(2));
    //:: Extract the polygon feature in which user clicked; create black outline image
    // var thisHA = ee.Feature(relvHAs.filterBounds(point).first());
    var thisHA = ee.Feature(allHAs.filterBounds(point).first());
    var haImg = ee.Image().byte().paint({
      featureCollection: thisHA,
      width: 2
    });
    //:: Update selected HA polygon layer on map
    selHAlayer.setEeObject(haImg).setVisParams({palette: ['#FF0000']});
    selHAlayer2.setEeObject(haImg).setVisParams({palette: ['#FF0000']});
    selHAlayer3.setEeObject(haImg).setVisParams({palette: ['#FF0000']});
    selHAlayer4.setEeObject(haImg).setVisParams({palette: ['#FF0000']});
    map1.layers().add(selHAlayer);
    map2.layers().add(selHAlayer2);
    map3.layers().add(selHAlayer3);
    map4.layers().add(selHAlayer4);
    //:: Set values of labels in info panel
    yrHarvVal.setValue(thisHA.get('hrvYr_m').getInfo().toFixed(0));
    spRg19Val.setValue(thisHA.get('reg2019_m').getInfo().toFixed(2));
    spRg5Val.setValue(thisHA.get('reg5yr_m').getInfo().toFixed(2));
    y2r80Val.setValue(thisHA.get('y2reg80_m').getInfo().toFixed(2));
    //:: Remove calculating message from screen
    calcMsg.style().set('shown', false);
    statusMsg.setValue('Status: Data extracted.');
    statusMsg.style().set({
      color: 'green'
    });
  } else if (ptInOldPoly === true) {
    //:: Remove error message, if shown
    errMsg.style().set('shown', false);
    //:: Print calculating message on screen
    calcMsg.style().set('shown', true);
    statusMsg.setValue('Status: Calculating...');
    statusMsg.style().set({
      color: 'blue'
    });
    //:: Update the lon/lat panel with values from the click event.
    lon.setValue('lon: ' + coords.lon.toFixed(2)),
    lat.setValue('lat: ' + coords.lat.toFixed(2));
    //:: Extract the polygon feature in which user clicked; create black outline image
    // var thisHA = ee.Feature(relvHAs.filterBounds(point).first());
    var thisOldHA = ee.Feature(allHAs.filterBounds(point).first());
    var haOldImg = ee.Image().byte().paint({
      featureCollection: thisOldHA,
      width: 2
    });
    //:: Update selected HA polygon layer on map
    selHAlayer.setEeObject(haOldImg).setVisParams({palette: ['#FF0000']});
    selHAlayer2.setEeObject(haOldImg).setVisParams({palette: ['#FF0000']});
    selHAlayer3.setEeObject(haOldImg).setVisParams({palette: ['#FF0000']});
    selHAlayer4.setEeObject(haOldImg).setVisParams({palette: ['#FF0000']});
    map1.layers().add(selHAlayer);
    map2.layers().add(selHAlayer2);
    map3.layers().add(selHAlayer3);
    map4.layers().add(selHAlayer4);
    //:: Set values of labels in info panel
    yrHarvVal.setValue(thisOldHA.get('YEAR').getInfo().toFixed(0));
    spRg19Val.setValue('na');
    spRg5Val.setValue('na');
    y2r80Val.setValue('na');
    //:: Remove calculating message from screen
    calcMsg.style().set('shown', false);
    statusMsg.setValue('Status: Data extracted.');
    statusMsg.style().set({
      color: 'green'
    });
  } else { //:: else if (ptInPoly === false), then do:
      //:: Remove calculating message from screen
      calcMsg.style().set('shown', false);
      //:: Print error message on screen
      errMsg.style().set('shown', true);
      //:: Update the lon/lat panel with values from the click event.
      lon.setValue('lon: ' + coords.lon.toFixed(2)),
      lat.setValue('lat: ' + coords.lat.toFixed(2));
      //:: Set values of labels in info panel
      yrHarvVal.setValue('na');
      spRg19Val.setValue('na');
      spRg5Val.setValue('na');
      y2r80Val.setValue('na');
      statusMsg.setValue('Status: Unsuccessful. Please select a harvest area.');
      statusMsg.style().set({
        color: 'red'
      });
  }
};
// });
map1.onClick(infoFill);
map2.onClick(infoFill);
map3.onClick(infoFill);
map4.onClick(infoFill);    
map1.setCenter(-114.5726, 55.6136,12);
map2.setCenter(-114.5726, 55.6136,12);
map3.setCenter(-114.5726, 55.6136,12);
map4.setCenter(-114.5726, 55.6136,12);
// -- Add to root --
// -----------------
// Add these to the interface.
ui.root.widgets().reset([infoPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
ui.root.widgets().add(mapGrid);