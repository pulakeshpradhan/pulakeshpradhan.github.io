var aralSeaBefore = {"opacity":1,"bands":["B3","B2","B1"],"min":-330.77798446607517,"max":4236.549194102134,"gamma":1},
    lakeMeadBefore = {"opacity":1,"bands":["B3","B2","B1"],"min":282.9312878074818,"max":2800.343402313011,"gamma":1},
    pearlRiverBefore = {"opacity":1,"bands":["B3","B2","B1"],"min":317.06289671577963,"max":1559.963075664869,"gamma":1},
    balbinaBefore = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_1984/Balbina2"),
    greatSaltLakeBefore = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_1984/Great_Salt_Lake2"),
    sundarbansBefore = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_1984/Sundarbans2"),
    greatSaltLakeAfter = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/GreatSaltLakeAfter"),
    aralSeaAfter = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/AralSeaAfter"),
    sundarbansAfter = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/SundarbansAfter"),
    lakeMeadAfter = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/LakeMeadAfter"),
    mekongDeltaAfter = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/MekongDeltaAfter"),
    balbinaAfter = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/BalbinaAfter"),
    pearlRiverAfter = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/PearlRiverAfter"),
    aralSeaAfterVis = {"opacity":1,"bands":["B3","B2","B1"],"min":314.5780426351919,"max":3692.531611169412,"gamma":1},
    sundarbansBeforeVis = {"opacity":1,"bands":["B3","B2","B1"],"min":247.0530263654665,"max":1466.2748816167305,"gamma":1},
    sundarbansAfterVis = {"opacity":1,"bands":["B3","B2","B1"],"min":441.79229013865825,"max":1564.8130699081821,"gamma":1},
    lakeMeadBeforeVis = {"opacity":1,"bands":["B3","B2","B1"],"min":295.35298936887375,"max":2816.809846273122,"gamma":1},
    lakeMeadAfterVis = {"opacity":1,"bands":["B3","B2","B1"],"min":412.55556097027034,"max":2663.2624835264505,"gamma":1},
    pearlRiverBeforeVis = {"opacity":1,"bands":["B3","B2","B1"],"min":168.87253688518297,"max":1473.168208478021,"gamma":1},
    pearlRiverAfterVis = {"opacity":1,"bands":["B3","B2","B1"],"min":23.02609662948271,"max":1734.4904958907719,"gamma":1},
    mekongBeforeVis = {"opacity":1,"bands":["B3","B2","B1"],"min":282.8129308841284,"max":1222.963809891517,"gamma":1},
    saltLakeAfterVis = {"opacity":1,"bands":["B3","B2","B1"],"min":-2257.9036459942317,"max":5131.059307733848,"gamma":1},
    image = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/MekongAfter4"),
    balbina1980 = ee.Image("projects/mangrovescience/Balbina_Dam_1984"),
    balbina2019 = ee.Image("projects/mangrovescience/Balbina2019"),
    image2 = ee.Image("projects/mangrovescience/Balbina_Dam_1984"),
    balbinaBeforeVis = {"opacity":1,"bands":["B3","B2","B1"],"min":228.646484375,"max":960.75634765625,"gamma":1},
    balbinaAfterVis = {"opacity":1,"bands":["B3","B2","B1"],"min":203.34232584635416,"max":773.0595703125,"gamma":1},
    gslBefore = ee.Image("projects/mangrovescience/GreatSaltLake1984"),
    gslAfter = ee.Image("projects/mangrovescience/GreatSaltLake2019"),
    image3 = ee.Image("projects/mangrovescience/GreatSaltLake1984"),
    gslBeforeVis = {"opacity":1,"bands":["B3","B2","B1"],"min":-1652.1542009107327,"max":4375.157216193072,"gamma":1},
    image22 = ee.Image("projects/mangrovescience/GreatSaltLake2019"),
    gslAfterVis = {"opacity":1,"bands":["B3","B2","B1"],"min":-2485.049729981578,"max":5400.4660147638715,"gamma":1},
    image4 = ee.Image("projects/mangrovescience/GreatSaltLake1984"),
    gslBeforeVis2 = {"opacity":1,"bands":["B3","B2","B1"],"min":-1652.1542009107327,"max":4375.157216193072,"gamma":1},
    image23 = ee.Image("projects/mangrovescience/GreatSaltLake2019"),
    gslAfterVis2 = {"opacity":1,"bands":["B3","B2","B1"],"min":-2485.049729981578,"max":5400.4660147638715,"gamma":1},
    image32 = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_1984/Mekong"),
    mekongBeforeVis2 = {"opacity":1,"bands":["B3","B2","B1"],"min":252.8664373798007,"max":1291.8937782168546,"gamma":1},
    image42 = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/MekongAfter4"),
    mekongAfterVis = {"opacity":1,"bands":["B3","B2","B1"],"min":274.6053114420929,"max":1285.0455523876344,"gamma":1},
    mekongBefore = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_1984/Mekong"),
    mekongAfter = ee.Image("users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019/MekongAfter4");
var compositesBefore = ee.ImageCollection('users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_1984')
var compositesAfter = ee.ImageCollection('users/lgoldberg8000/GEE_Tutorials/Water_Landsat_Composites_2019')
// .aside(Map.addLayer)
// Aral Sea
var aralSeaBeforeImg = compositesBefore.mosaic().updateMask(aralSeaAfter).visualize(aralSeaBefore)
var aralSeaAfterImg = compositesAfter.mosaic().updateMask(aralSeaAfter).visualize(aralSeaAfterVis)
// Sundarbans
var sundarbansBeforeImg = compositesBefore.mosaic().updateMask(sundarbansAfter).visualize(sundarbansBeforeVis)
var sundarbansAfterImg = compositesAfter.mosaic().updateMask(sundarbansAfter).visualize(sundarbansAfterVis)
// Lake Mead
var lakeMeadBeforeImg = compositesBefore.mosaic().updateMask(lakeMeadAfter).visualize(lakeMeadBeforeVis)
var lakeMeadAfterImg = compositesAfter.mosaic().updateMask(lakeMeadAfter).visualize(lakeMeadAfterVis)
// Pearl River
var pearlRiverBeforeImg = compositesBefore.mosaic().updateMask(pearlRiverAfter).visualize(pearlRiverBeforeVis)
var pearlRiverAfterImg = compositesAfter.mosaic().updateMask(pearlRiverAfter).visualize(pearlRiverAfterVis)
// Balbina Dam
var balbinaBeforeImg = balbina1980.visualize(balbinaBeforeVis)
var balbinaAfterImg = balbina2019.visualize(balbinaAfterVis)
// Great Salt Lake
var greatSaltLakeBeforeImg = gslBefore.visualize(gslBeforeVis)
var greatSaltLakeAfterImg = gslAfter.visualize(gslAfterVis)
// Mekong
var mekongBeforeImg = mekongBefore.visualize(mekongBeforeVis2)
var mekongAfterImg = mekongAfter.visualize(mekongAfterVis)
var surfaceWater = ee.Image('JRC/GSW1_1/GlobalSurfaceWater')
var seasonality = surfaceWater.select('occurrence')
.visualize({
  min: 0,
  max: 100,
  palette: ['ffffff', 'ffbbbb', '0000ff']
})
Map.addLayer(seasonality)
var change = surfaceWater.select('change_norm')
.visualize({
  min: -100,
  max: 100,
  palette: ['red', 'black', 'green']
})
var datePanel1 = ui.Panel()
datePanel1.style({position: 'bottom-left'})
var datePanel2 = ui.Panel()
ui.root.clear()
// Create two maps.
var leftMap = ui.Map()
// leftMap.addLayer(image1);
leftMap.setOptions('SATELLITE')
var rightMap = ui.Map()
// rightMap.addLayer(image2);
rightMap.setOptions('SATELLITE')
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
leftMap.add(datePanel1)
rightMap.add(datePanel2)
// Add our split panel to the root panel.
ui.root.add(splitPanel);
var ARAL_SEA = 'Aral Sea, Kazakhstan-Uzbekistan'
var SUNDARBANS= 'Sundarbans, Bangladesh'
var LAKE_MEAD = 'Lake Mead, United States'
var PEARL_RIVER = 'Pearl River Delta, China'
var MEKONG_DELTA= 'Mekong Delta, Vietnam'
var GREAT_SALT_LAKE = 'Great Salt Lake, United States'
var BALBINA= 'Balbina Dam, Brazil'
// Create an empty list of filter constraints.
var constraints = [];
// Create a layer selector that dictates which layer is visible on the Map.
var select = ui.Select({
  items: [ARAL_SEA, SUNDARBANS, LAKE_MEAD, PEARL_RIVER, BALBINA, MEKONG_DELTA, GREAT_SALT_LAKE],
  value: ARAL_SEA,
  onChange: redraw,
  style: {padding: '0px 0px 0px 8px'}
}).setPlaceholder('Select a location.');
var locationPanel = ui.Panel()
var label1984 = ui.Label({
  value: 'Left Image: Landsat 5, 1984', 
  style: { 
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 8px',
                            color: '#2a7049',
                        }
})
var label2019 = ui.Label({
  value: 'Right Image: Landsat 8, 2019', 
  style: { 
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 8px',
                            color: '#2a7049',
                        }
})
var label1990 = ui.Label({
  value: 'Left Image: Landsat 5, 1990', 
  style: { 
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 8px',
                            color: '#2a7049',
                        }
})
// Create a function to render a Map layer configured by the user inputs.
function redraw() {
  var layer = select.getValue();
  var image;
  var legend;
  if (layer == ARAL_SEA) {
      leftMap.clear()
      leftMap.addLayer(aralSeaBeforeImg, {}, 'Landsat Image')
      leftMap.addLayer(change, {}, 'Water Extent Change', false)
      leftMap.addLayer(seasonality, {}, 'Water Seasonality', false)
      // leftMap.add(datePanel1)
      ui.root.insert(0, datePanel1)
      rightMap.clear()
      rightMap.addLayer(aralSeaAfterImg, {}, 'Landsat Image')
      rightMap.addLayer(change, {}, 'Water Extent Change', false)
      rightMap.addLayer(seasonality, {}, 'Water Seasonality', false)
      leftMap.setCenter(59.65266479183447, 45.12128500871488, 8)
      rightMap.setCenter(59.65266479183447, 45.12128500871488, 8)
       locationPanel.clear()
       locationPanel.add(ui.Label({
                          value: 'The Aral Sea used to be a single large waterbody, until cotton irrigation in the 1960s diverted much of the water from its feeder sources- the Amu Darya and Syr Darya Rivers.'+
                          ' By 2015, the lake had separated into four individual water bodies and formed the Aralkum desert. '
                      ,
                          style: {
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 8px',
                            color: '#9E9E9E',}
                        }))
      locationPanel.add(label1984);
      locationPanel.add(label2019);
    } else if (layer == SUNDARBANS) {
      leftMap.clear()
      leftMap.addLayer(sundarbansBeforeImg, {}, 'Landsat Image');
      leftMap.addLayer(change, {}, 'Water Extent Change', false)
      leftMap.addLayer(seasonality, {}, 'Water Seasonality', false)
     rightMap.clear()
      rightMap.addLayer(sundarbansAfterImg, {}, 'Landsat Image');
      rightMap.addLayer(change, {}, 'Water Extent Change', false)
      rightMap.addLayer(seasonality, {}, 'Water Seasonality', false)
      leftMap.setCenter(88.79833580703962, 21.614323499539545, 12)
      rightMap.setCenter(88.79833580703962, 21.614323499539545, 12)
      locationPanel.clear()
      locationPanel.add(ui.Label({
                          value: 'Observe the mangrove forest islands of the Bangladesh Sundarbans as they retreat due to sea level rise. The Indian Ocean has among the highest rates of global sea'+
                          ' level rise, threatening coastal forests such as mangroves through increased erosion, and coastal populations through flooding.  '
                      ,
                          style: { 
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 10px',
                            color: '#9E9E9E',}
                        }))      
       locationPanel.add(label1984);
      locationPanel.add(label2019);
      } else if (layer == LAKE_MEAD){
      leftMap.clear()
      leftMap.addLayer(lakeMeadBeforeImg, {}, 'Landsat Image');
      leftMap.addLayer(change, {}, 'change', false)
      leftMap.addLayer(seasonality, {}, 'seasonality', false)
      rightMap.clear()
      rightMap.addLayer(lakeMeadAfterImg, {}, 'Landsat Image');
      rightMap.addLayer(change, {}, 'change', false)
      rightMap.addLayer(seasonality, {}, 'seasonality', false)
          leftMap.setCenter(-114.54575323208985, 36.238810746630364, 10)
          rightMap.setCenter(-114.54575323208985, 36.238810746630364, 10)
      locationPanel.clear()
      locationPanel.add(ui.Label({
                          value: 'Observe the shrinking of Lake Mead as the city of Los Vegas grows. Drought and increases in water demand have contributed to the lake\'s depletion over time.'
                      ,
                          style: {
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 10px',
                            color: '#9E9E9E',}
                        }))    
         locationPanel.add(label1984);
      locationPanel.add(label2019);  
        } else if (layer == PEARL_RIVER){
          leftMap.clear()
        leftMap.addLayer(pearlRiverBeforeImg, {}, 'Landsat Image');
        leftMap.addLayer(change, {}, 'Water Extent Change', false)
        leftMap.addLayer(seasonality, {}, 'Water Seasonality', false)
        rightMap.clear()
        rightMap.addLayer(pearlRiverAfterImg, {}, 'Landsat Image');
        rightMap.addLayer(change, {}, 'Water Extent Change', false)
        rightMap.addLayer(seasonality, {}, 'Water Seasonality', false)
        leftMap.setCenter(113.63596782845957, 22.70619783056561, 11)
        rightMap.setCenter(113.63596782845957, 22.70619783056561, 11);
         locationPanel.clear()
        locationPanel.add(ui.Label({
                          value: 'The Pearl River Delta Area is the largest urban area in the world, and is continuously being developed. Observe the  '+
                          ' new aquaculture construction on the inner sides of the delta, and aquaculture reclamation for urban development inland. '
                      ,
                          style: {
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 10px',
                            color: '#9E9E9E',}
                        }))       
           locationPanel.add(label1984);
      locationPanel.add(label2019);  
        } else if (layer == BALBINA){
        leftMap.addLayer(balbinaBeforeImg, {}, 'Landsat Image')
        rightMap.addLayer(balbinaAfterImg, {}, 'Landsat Image')
        leftMap.setCenter(-59.623983342609336, -1.7031377698319465, 10);
        rightMap.setCenter(-59.623983342609336, -1.7031377698319465, 10);
        locationPanel.clear()
        locationPanel.add(ui.Label({
                          value: 'Dam construction across the Brazilian Amazon has significant environmental and humanitarian consequences. Flooding that resulted from Balbina Dam '+
                          ' led to the loss of 1,200 square miles of forest, while displacing local indiginous populations. Balbina contributed to the formation of thousands of small islands'+
                          ' in regions that were previously rainforest, causing widespread mass extinctions of species. '
                      ,
                          style: {
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 10px',
                            color: '#9E9E9E',}
                        }))
        locationPanel.add(label1984);
      locationPanel.add(label1990);
        }
        else if (layer == MEKONG_DELTA){
          leftMap.addLayer(mekongBeforeImg, {}, 'Landsat Image')
          rightMap.addLayer(mekongAfterImg, {}, 'Landsat Image')
          leftMap.setCenter(105.1766476115481, 8.736727051543548, 12)
          rightMap.setCenter(105.1766476115481, 8.736727051543548, 12)
          locationPanel.clear()
          locationPanel.add(ui.Label({
                          value: 'Observe the progression of sea level rise along the coast. Mangrove forests along the seaward edge often adapt to rising sea levels by '+
                          'migrating inland, but aquaculture pond encroachment on the landward side prevents their movement, causing gradual forest loss. '
                      ,
                          style: {
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 10px',
                            color: '#9E9E9E',}
                        }))       
           locationPanel.add(label1984);
      locationPanel.add(label2019);
        } else if (layer== GREAT_SALT_LAKE){
          leftMap.addLayer(greatSaltLakeBeforeImg, {}, 'Landsat Image')
          rightMap.addLayer(greatSaltLakeAfterImg, {}, 'Landsat Image')
          leftMap.setCenter(-112.5070193089461, 41.246507545605546, 9)
          rightMap.setCenter(-112.5070193089461, 41.246507545605546, 9)
          locationPanel.clear()
          locationPanel.add(ui.Label({
                          value: 'The drying of Great Salt Lake is primarily a result of diversion of water from its feeder streams, as a result of freshwater consumption in neighboring cities. '+
                          'Since local precipitation and temperature patterns have not fluctuated greatly over the past two centuries, climatic factors likely did not contribute significantly.'
                      ,
                          style: {
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '0px 0px 0px 10px',
                            color: '#9E9E9E',}
                        }))
           locationPanel.add(label1984);
      locationPanel.add(label2019);
        }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
}
// Invoke the redraw function once at start up to initialize the Map.
redraw();
var panel = ui.Panel()
panel.style().set({
  // maxHeight: '700px',
  maxWidth: '400px',
  position: 'top-left'
});
var title = ui.Label({
  value: 'Climate, Land Use, and Earth\'s Water Supply',
  style: {fontWeight: 'bold',
    fontSize: '32px',
    padding: '8px',
    color: '#616161',}
})
var text = ui.Label({
  value: 'The extent and distribution of Earth\'s water supply has changed dramatically over the past two decades. The JRC'+
  ' Global Surface Water dataset captures hydrological dynamics on a global scale from 2000-2016, creating an atlas of change'+
  ' due to land use change, sea level rise, drought, and other climatic factors. ',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
    border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
ui.root.insert(0, panel)
panel.add(title)
panel.add(text)
var changeCheckbox = ui.Checkbox('Water Extent Change 2000-2016', false);
changeCheckbox.onChange(function(checked) {
  leftMap.layers().get(1).setShown(checked);
  rightMap.layers().get(1).setShown(checked);
});
changeCheckbox.style().set({padding: '0px 0px 0px 8px '})
panel.add(changeCheckbox)
var vis = {min:0, max:0.6, palette:['red', 'black', 'green']};
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {padding: '8px', position: 'bottom-center'}
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label('Decrease'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('Increase')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal',
      width: '276px',
      padding: '0px 0px 0px 8px '
    }
  });
  return ui.Panel().add(panel).add(thumb);
}
panel.add(makeLegend(vis));
var seasonalityCheckbox = ui.Checkbox('Percent Water Occurrence 2000-2016', false);
seasonalityCheckbox.onChange(function(checked) {
  leftMap.layers().get(2).setShown(checked);
  rightMap.layers().get(2).setShown(checked);
});
seasonalityCheckbox.style().set({padding: '0px 0px 0px 8px '
})
panel.add(seasonalityCheckbox)
var vis2 = {min:0, max:0.6, palette:['ffffff', 'ffbbbb', '0000ff']};
function makeLegend2(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {padding: '8px', position: 'bottom-center'}
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label('0%'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('100%')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal',
      width: '276px',
            padding: '0px 0px 0px 8px '
    }
  });
  return ui.Panel().add(panel).add(thumb);
}
// panel.add(makeLegend(vis));
panel.add(makeLegend2(vis2))
var selectorText = ui.Label({
  value: 'Select a location of interest.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
    // border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
panel.add(selectorText)
panel.add(select)
panel.add(locationPanel)
// Map.setOptions('SATELLITE')