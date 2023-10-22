//Clear root panel
ui.root.clear();
//Create map panel and set its parameters
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
//Define backbround color and subtitle style
var bgColor = '#F7F7FA';//#F8F9FA';
var subtitlestyle = {color: '#555555', fontWeight: 'bold', fontSize: '16px', backgroundColor:bgColor};
// Load last composite
var composite = ee.Image('UMD/hansen/global_forest_change_2022_v1_10');
var vizParams = {bands: ['last_b50', 'last_b40', 'last_b30'],gamma: [1.7, 1.7, 1.7]};
var vizParams4 = {bands: ['first_b50', 'first_b40', 'first_b30'],gamma: [1.7, 1.7, 1.7]};
//Land mask
var landmask = ee.Image("projects/glad/landBuffer4").mask();
//var loss19 = ui.Map.Layer(composite.select('lossyear').eq(19).selfMask(),{},'2019 Landsat annual loss')
//Adjusted fire layer
var fire =ee.ImageCollection("users/sashatyu/2001-2022_fire_forest_loss");
var vizParams2 = {min:1, max: 5, palette:['0000ff','FFFF00','FF8000','FF0000','FF00BF'] };
//Map.addLayer(fire.mosaic(),vizParams2,'adjusted fire map, 2001-2019')
//Annual fire layer
var annual =ee.ImageCollection("users/sashatyu/2001-2022_fire_forest_loss_annual");
var vizParams3 = {min:1, max: 22, palette:['ffff00','ff0000'] };
var maplyr = ui.Map.Layer(composite.updateMask(landmask), vizParams, '2022 Landsat composite');
var maplyrA = ui.Map.Layer(composite.updateMask(landmask), vizParams4, '2000 Landsat composite');
var maplyrB = ui.Map.Layer(fire.mosaic(),vizParams2,'Forest loss due to fire, 2001-2022 total');
var maplyrC = ui.Map.Layer(annual.mosaic(),vizParams3,'Forest loss due to fire, 2001-2022 total');
//Add map layers, set hybrid background
//mapPanel.add(maplyr);
//mapPanel.setOptions("MAP");
mapPanel.setOptions();
mapPanel.setCenter(0,30,3);
//Create legend panel
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
//Create empty background image
var lnone0 = ui.Map.Layer(ee.Image([]),{},'none');
//Create empty image for map layers
var lnone1 = ui.Map.Layer(ee.Image([]),{},'none');
//Add map panels (background first)
mapPanel.add(lnone0);
mapPanel.add(maplyrB);
//Background image options
var images = {
  '2022 Landsat composite':maplyr,
  '2000 Landsat composite':maplyrA,
  'None': lnone0,
};
var backgroundOptions = {
  '2022 Landsat composite': ui.Panel(),
  '2000 Landsat composite': ui.Panel(),
  'None': ui.Panel(),
};
var backgroundOptionsPanel = ui.Panel([],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var selbackground = ui.Select({items: Object.keys(images),//], 
  placeholder: 'None',
  onChange: function(lyr){
    backgroundOptionsPanel.clear();
    backgroundOptionsPanel.add(backgroundOptions[lyr]);
    mapPanel.layers().set(0,images[lyr]);
  }
});
//Create map display options
var s2lyrs = {
  'Forest loss due to fire, 2001-2022 total': maplyrB,
  'Annual forest loss due fire': maplyrC,
  'None': lnone1,
};
//Function to make legend rows
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 8px'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px',backgroundColor: bgColor}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style:{backgroundColor: bgColor}
  });
};
//End of function to make legend rows
var confLegend = ui.Panel(makeRow('FF0000','High certainty forest loss due to fire'));
confLegend.style().set({backgroundColor: bgColor,stretch:'horizontal'});
confLegend.add(makeRow('FF8000','Medium certainty forest loss due to fire'));
confLegend.add(makeRow('FFFF00','Low certainty forest loss due to fire'));
confLegend.add(makeRow('0000ff','Forest loss due to non-fire drivers'));
confLegend.add(makeRow('F7F7FA',''));
confLegend.add(makeRow('FF00BF','All forest loss due to fire in Africa'));
var annuallabel = ui.Panel([ui.Label('Annual forest loss due to fire, high and medium confidence',
{margin: '2px 8px',backgroundColor: bgColor})],'flow',{margin: '4px 0px',backgroundColor: bgColor,width:'125px'});
function makeColorBarParams(palette){return {bbox: [0, 0, 1, 100],dimensions: '15x150',format: 'png',min: vizParams3.min,max: vizParams3.max,palette: palette,};}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((vizParams3.max-vizParams3.min)/100.0).add(vizParams3.min),
  params: makeColorBarParams(['ffff00','ff0000']),
    style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
});
var legendLabels = ui.Panel({
  widgets: [ui.Label(vizParams3.max+2000, {margin: '1px 4px 80px',backgroundColor: bgColor}),//I changed the margin from 32px to 80px
    //ui.Label(" ",{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(vizParams3.min+2000, {margin: '0px 4px',position: 'bottom-left',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor, }
});
var legend = ui.Panel([annuallabel,colorBar, legendLabels], ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var layerOptions = {
  'Forest loss due to fire, 2001-2022 total': confLegend,
  'Annual forest loss due fire': legend,
  'None': ui.Panel(),
};
var layerOptionsPanel = ui.Panel([confLegend],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var selS2 = ui.Select({items: Object.keys(s2lyrs),//], 
  placeholder: 'Forest loss due to fire',
  onChange: function(lyr){
    layerOptionsPanel.clear();
    layerOptionsPanel.add(layerOptions[lyr]);
    mapPanel.layers().set(1,s2lyrs[lyr]);
  }
});
//Panel for clicked data
var instructions = ui.Panel([ui.Label("Click for map value:",subtitlestyle)],'flow',{backgroundColor: bgColor});
// Create panels to hold lon/lat values and map values
var latlon = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var value = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
//var year = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var clickedValue = ui.Panel([latlon,value], ui.Panel.Layout.flow('vertical'),{margin: '4px', backgroundColor: bgColor});
//Add all legend elements to the side panel
panel.add(ui.Panel(
  [ui.Label({value: 'Global forest loss due to fire', style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}}),
  ui.Panel([ui.Label("Tyukavina et al. (2022) Global trends of forest loss due to fire, 2001-2019. Frontiers in Remote Sensing ",{color: '#555555',backgroundColor: bgColor,margin: '8px 4px 2px 8px'}), ui.Label("https://doi.org/10.3389/frsen.2022.825190",{backgroundColor: bgColor, margin: '8px 4px 2px 8px'},"https://doi.org/10.3389/frsen.2022.825190")],ui.Panel.Layout.flow('vertical'),{backgroundColor: bgColor}),
  ui.Label("Updated to include 2020-2022 forest loss",{fontWeight: 'semibold',color: '#555555',backgroundColor: bgColor,margin: '8px 4px 2px 8px'}),
  ui.Label("Global 30m forest cover loss map for 2001-2022 (Hansen et al. 2013, with annual updates) is disaggregated into forest loss due to fire vs. other disturbance drivers. The map area of forest loss due to fire matches sample-based area estimates ±SE for all continents except Africa. This allows producing sub-regional map-based area estimates with a measure of uncertainty. The sum of red map pixels (high certainty of forest loss due to fire) corresponds to sample area estimate minus SE, adding orange (medium certainty) to red (high certainty) pixels results in map area matching the sample-based area estimate, and adding yellow (low certainty) pixels to orange and red (medium and high certainty) yields map area matching sample area estimate plus SE. Blue areas correspond to the highest certainty of forest loss due to other (non-fire) drivers.",{backgroundColor: bgColor}),
  ui.Label("Annual map of forest loss due to fire is an intersection of the forest loss due to fire map matching sample area estimate (sum of high and medium certainty of forest loss due to fire pixels) with a year of loss from Hansen et al. map.",{backgroundColor: bgColor}),
  ui.Label("To share location copy URL.",{backgroundColor: bgColor}),
  ui.Panel([ui.Label("Data download:",{backgroundColor: bgColor, fontWeight: 'bold',color: '#555555', margin: '8px 4px 8px 8px'}),ui.Label("https://glad.umd.edu/dataset/Fire_GFL/",{backgroundColor: bgColor, margin: '8px 0px'},"https://glad.umd.edu/dataset/Fire_GFL/")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor}),
  ui.Label(),
  ui.Label('Forest loss due to fire map:',subtitlestyle),
  selS2,
  layerOptionsPanel,
  ui.Label('Background image:',subtitlestyle),
  selbackground,
  backgroundOptionsPanel,
  instructions,
  clickedValue,
  ],'flow',{backgroundColor: bgColor})
  );
//Create a split layout for map and legend panels
ui.root.add(ui.SplitPanel(mapPanel,panel));
mapPanel.onClick(getValue);
// Register a function to draw a chart when a user clicks on the map.
function getValue(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  latlon.setValue('Lat: '+coords.lat.toFixed(5)+', Lon: '+coords.lon.toFixed(5));
  var mapvalue = ee.Number(fire.mosaic().reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1')).getInfo();
  if (mapvalue === null)
  {value.setValue('no forest loss');}
  if (mapvalue >0)
  { 
    //var mapyear = ee.Number(composite.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('lossyear')).getInfo();
    var mapyear = ee.Number(annual.mosaic().reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1')).getInfo();
    mapyear = mapyear +2000;
    if (mapvalue == 1)
    { value.setValue('forest loss due to non-fire drivers');}
    if (mapvalue == 2)
    {value.setValue(mapyear+' forest loss due to fire, low certainty');}
    if (mapvalue == 3)
    {value.setValue(mapyear+' forest loss due to fire, medium certainty');}
    if (mapvalue == 4)
    {value.setValue(mapyear+' forest loss due to fire, high certainty');}
  }
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'clicked location');
  mapPanel.layers().set(2, dot);
}
//set url to 
mapPanel.onChangeBounds(changeURL);
function changeURL(input){
  ui.url.set({'lon':input.lon,'lat':input.lat,'zoom':input.zoom});
}