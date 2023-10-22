var ls8 = ui.import && ui.import("ls8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    fire_perimeter = ui.import && ui.import("fire_perimeter", "table", {
      "id": "users/bitbitterbear2/fire_perimeter"
    }) || ee.FeatureCollection("users/bitbitterbear2/fire_perimeter");
//////////////////////////////////
// * Functions* //////////////////
//////////////////////////////////
ui.root.setLayout(ui.Panel.Layout.absolute());
// Convert Milliseconds to Date
var addDate= function(feature) {
  var mtdate_a = ee.Date(feature.get('ALARM_DATE'));
  var mtdate_c = ee.Date(feature.get('CONT_DATE'));
  return feature
    .set({
      'DATE_ALARM': mtdate_a,
      'DATE_CONT': mtdate_c
    });
};
// Add Date into feature class and sort by their name
var firePerimeter = fire_perimeter.map(addDate).sort('FIRE_NAME');
// Clear pixel mask
var clrMsk = function(image){
  // Bitmask for clear pixels
  var QABits = 6;
  // Select the pixel QA band (Different between collections)
  var clear = image.select('QA_PIXEL')
    // bitwiseAnd to isolate to this particular bit location 
    .bitwiseAnd(Math.pow(2, QABits))
    // Shift to the first position to retrieve the value
    .rightShift(QABits) 
    // Use only pixels that are clear
    .eq(1);
  return image
    .select(bands)
    .updateMask(clear)
};
// NDVI & NDMI
var bands = ['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'] 
// Function to convert DN to SR
var dnToSr = function(image) { 
  return image
    .select(bands)
    .multiply(0.0000275)
    .add(-0.2)
}
// Add NDVI as a new band to each image in the collection
var addNdvi = function(image) { 
  var ndvi = image.expression(
    '(NIR - RED) / (NIR + RED)', {
      'NIR': image.select('SR_B5'),
      'RED': image.select('SR_B4')
  })
  .rename('NDVI');
  return image
    .addBands(ndvi)
}
// Add NDMI as a new band to each image in the collection
var addNdmi = function(image) { 
  var ndmi = image.expression(
    '(NIR - SWIR) / (NIR + SWIR)', {
      'NIR': image.select('SR_B5'),
      'SWIR': image.select('SR_B6')
  })
  .rename('NDMI');
  return image
    .addBands(ndmi)
}
////////////////////////////////////
// ** Map Panel Configuration ** //
//////////////////////////////////
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
////////////////////////////////////
// ** Component Configuration ** //
//////////////////////////////////
// Panel
var header = ui.Label(
  'Fire Perimeters in California: 2016-2020', 
    {fontSize: '20px', color: 'Black', fontWeight: 'bold'});
var text = ui.Label(
    'Impacts of California Wildfire on their perimeters in 2016-2020',
    {fontSize: '14px'});
var panel = ui.Panel([header, text], 'flow', {width: '400px', margin: '10px'});
ui.root.widgets().add(panel);
// Fire Selector
var fireName = ee.List(firePerimeter.aggregate_array('FIRE_NAME'));
var label_fire = ui.Label(
  'Select a Fire',
  {fontSize: '16px', fontWeight: 'bold'})
var selectFire = ui.Select({
  placeholder: "Select a Fire...",
  items: fireName.getInfo(),
  onChange: function(value) {
    Map.clear()
    var fire_name = value;
    print(fire_name);
    var fire = ee.Feature(firePerimeter.filterMetadata('FIRE_NAME','equals',fire_name).first());
    Map.centerObject(fire, 10);
    selectTime.setValue(null,false)
    check_fire.setValue(false)
    check_ndvi.setValue(false)
    check_ndmi.setValue(false)
    check_vchange.setValue(false)
  },
  style: {width: '375px'
  }
});
panel.add(label_fire)
panel.add(selectFire)
// Time Selector
var date = {
  date: {
    'Before the Fire': {
      date: []
    },
    'After the Fire':{
      date: []
    },
    'Present':{
      date: ee.Date(Date.now()).format("YYYY-MM-dd")
  }}
};
var label_time = ui.Label(
  'Select a Time',
  {fontSize: '16px', fontWeight: 'bold'})
var selectTime = ui.Select({
  placeholder: "Select a Time...",
  items: Object.keys(date.date),
  style: {width: '375px'},
  onChange: function(value) {
    var time = selectTime.getValue()
    var name = selectFire.getValue()
    var fire = ee.Feature(firePerimeter.filterMetadata('FIRE_NAME','equals',name).first());
    if (time == 'Before the Fire') {
      var targetDate = ee.Date(fire.get('DATE_ALARM'))
    }
    else if (time == 'After the Fire') {
      var targetDate = fire.get('DATE_CONT');
    }
    else {
      var targetDate = ee.Date(Date.now());
    }
    check_fire.setValue(false)
    check_ndvi.setValue(false)
    check_ndmi.setValue(false)
    check_vchange.setValue(false)
    panel.add(label_layer)
    panel.add(check_fire)
    panel.add(check_ndvi)
    panel.add(check_ndmi)
    panel.add(check_vchange)
    panel.add(reset)
  }})
panel.add(label_time)
panel.add(selectTime)
// Layer Checkbox
var layer = {
  layer: {
    'NDVI': {
      name: 'ndvi',
      ndviParams: {min: -0.1, max: 0.1, palette: ['red', 'yellow', 'green']}
    },
    'NDMI': {
      name: 'ndmi',
      ndmiParams: {min: -1.0, max: 1.0, palette: ['red', 'yellow', 'blue']}
    },
    'Land Cover Classification': {
      name: 'lc_c',
      // palette: palette
    }
  }
};
var label_layer= ui.Label(
  'Select Layers to visualize',
  {fontSize: '16px', fontWeight: 'bold'})
var check_fire = ui.Checkbox('Fire Perimeter Area').setValue(false);
check_fire.onChange(function(){
  var name = selectFire.getValue();
  var fire = ee.Feature(firePerimeter.filterMetadata('FIRE_NAME','equals',name).first()).bounds();
  Map.addLayer(fire,{},name);
});
var check_ndvi = ui.Checkbox('NDVI').setValue(false);
check_ndvi.onChange(function(){
  var name = selectFire.getValue();
  var fire = ee.Feature(firePerimeter.filterMetadata('FIRE_NAME','equals',name).first());
  print(fire);
  var time = selectTime.getValue();
  var ndviParams = {min: -1, max: 1, palette: ['red', 'yellow', 'green']};
  // palette.
  function makeColorBarParams(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: -1,
      max: 1,
      palette: palette,
    };
  }
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(ndviParams.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(ndviParams.min, {margin: '4px 8px'}),
      ui.Label(
          (ndviParams.max / 2),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(ndviParams.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: 'bottom-left'}
  });
  var legendTitle = ui.Label({
    value: 'NDVI value',
    style: {fontWeight: 'bold'}
  });
  // Add the legendPanel to the map.
  var legendPanel = ui.Panel({
    widgets: [legendTitle, colorBar, legendLabels],
    style: {position: 'top-center'}
  });
  ui.root.insert(0,legendPanel)
  if (time == 'Before the Fire') {
    var targetDate = ee.Date(fire.get('DATE_ALARM'))
    print(targetDate);
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate.advance(-3, 'month'),targetDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdvi)
    .median()
    Map.addLayer(subset.select(['NDVI']), ndviParams, 'NDVI image',false)
    Map.addLayer(subset.select(['NDVI']).clip(fire), ndviParams, 'NDVI_before')
  }
  else if (time == 'After the Fire') {
    var targetDate = fire.get('DATE_CONT');
    print(targetDate);
    var afterDate = ee.Date(targetDate).advance(3, 'month')
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate, afterDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdvi)
    .median()
    Map.addLayer(subset.select(['NDVI']), ndviParams, 'NDVI image',false)
    Map.addLayer(subset.select(['NDVI']).clip(fire), ndviParams, 'NDVI_after')
  }
  else {
    var targetDate = ee.Date(Date.now());
    print(targetDate)
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate.advance(-3, 'month'),targetDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdvi)
    .median()
    Map.addLayer(subset.select(['NDVI']), ndviParams, 'NDVI image_present',false)
    Map.addLayer(subset.select(['NDVI']).clip(fire), ndviParams, 'NDVI_recent')
  }
  })
var check_ndmi = ui.Checkbox('NDMI').setValue(false);
check_ndmi.onChange(function(){
  var name = selectFire.getValue();
  var fire = ee.Feature(firePerimeter.filterMetadata('FIRE_NAME','equals',name).first());
  print(fire)
  var time = selectTime.getValue()
  var ndmiParams = {min: -1.0, max: 1.0, palette: ['red', 'yellow', 'blue']};
  // Legend
  function makeColorBarParams(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: -1,
      max: 1,
      palette: palette,
    };
  }
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(ndmiParams.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(ndmiParams.min, {margin: '4px 8px'}),
      ui.Label(
          (ndmiParams.max / 2),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(ndmiParams.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: 'bottom-left'}
  });
  var legendTitle = ui.Label({
    value: 'NDMI value',
    style: {fontWeight: 'bold'}
  });
    // Add the legendPanel to the map.
  var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
  ui.root.insert(0,legendPanel)
  if (time == 'Before the Fire') {
    var targetDate = ee.Date(fire.get('DATE_ALARM'))
    print(targetDate);
    ee.Date(targetDate).advance(3, 'month')
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate.advance(-3, 'month'),targetDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdmi)
    .median()
    Map.addLayer(subset.select(['NDMI']), ndmiParams, 'NDMI image',false)
    Map.addLayer(subset.select(['NDMI']).clip(fire), ndmiParams, 'NDMI_before')
  }
  else if (time == 'After the Fire') {
    var targetDate = fire.get('DATE_CONT');
    print(targetDate);
    var afterDate = ee.Date(targetDate).advance(3, 'month')
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate, afterDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdmi)
    .median()
    Map.addLayer(subset.select(['NDMI']), ndmiParams, 'NDMI image',false)
    Map.addLayer(subset.select(['NDMI']).clip(fire), ndmiParams, 'NDMI_after')
  }
  else {
    var targetDate = ee.Date(Date.now());
    print(targetDate)
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate.advance(-90, 'day'), targetDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdmi)
    .median()
    Map.addLayer(subset.select(['NDMI']), ndmiParams, 'NDMI image',false)
    Map.addLayer(subset.select(['NDMI']).clip(fire), ndmiParams, 'NDVI_recent')
  }
  })
var check_vchange = ui.Checkbox('Vegetation Change').setValue(false);
check_vchange.onChange(function(){
  var name = selectFire.getValue();
  var fire = ee.Feature(firePerimeter.filterMetadata('FIRE_NAME','equals',name).first());
  print(fire);
  var time = selectTime.getValue();
  var palette = ['fa9fb5', 'fec44f', 'a6bddb', 'a1d99b', '31a354']
  // set position of panel
  var legend = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '8px 15px'
    }
  });
  // Create legend title
  var legendTitle = ui.Label({
    value: 'NDVI Value',
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
  // name of the legend
  var names = ['-1 ~ 0','0 ~ 0.3','0.3 ~ 0.5', '0.5 ~ 0.7','0.7 ~ 1'];
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    legend.add(makeRow(palette[i], names[i]));
    }  
  // add legend to map (alternatively you can also print the legend to the console)
  ui.root.insert(0,legend)
  if (time == 'Before the Fire') {
    var targetDate = ee.Date(fire.get('DATE_ALARM'))
    print(targetDate);
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate.advance(-3, 'month'),targetDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdvi)
    .median()
    var ndvi = subset.select(['NDVI'])
    var ndviclass = ee.Image(1)
          .where(ndvi.gt(-1).and(ndvi.lte(0)), 1)
          .where(ndvi.gt(0).and(ndvi.lte(0.3)), 2)
          .where(ndvi.gt(0.3).and(ndvi.lte(0.5)), 3)
          .where(ndvi.gt(0.5).and(ndvi.lte(0.7)), 4)
          .where(ndvi.gt(0.7).and(ndvi.lte(1)), 5)
    Map.addLayer(ndviclass.clip(fire), {min: 1, max: 5, palette: palette}, 'NDVI class_before');
  }
  else if (time == 'After the Fire') {
    var targetDate = fire.get('DATE_CONT');
    print(targetDate);
    var afterDate = ee.Date(targetDate).advance(3, 'month')
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate, afterDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdvi)
    .median()
    var ndvi = subset.select(['NDVI'])
    var ndviclass = ee.Image(1)
          .where(ndvi.gt(-1).and(ndvi.lte(0)), 1)
          .where(ndvi.gt(0).and(ndvi.lte(0.3)), 2)
          .where(ndvi.gt(0.3).and(ndvi.lte(0.4)), 3)
          .where(ndvi.gt(0.5).and(ndvi.lte(0.6)), 4)
          .where(ndvi.gt(0.7).and(ndvi.lte(1)), 5)
    Map.addLayer(ndviclass.clip(fire), {min: 1, max: 5, palette: palette}, 'NDVI class_after');
  }
  else {
    var targetDate = ee.Date(Date.now());
    print(targetDate)
    var subset = ls8
    .filterBounds(fire.geometry())
    .filterDate(targetDate.advance(-3, 'month'),targetDate)
    // Mask cloud
    .map(clrMsk)
    // Convert DN to SR
    .map(dnToSr)
    // Map the addNdvi & addNdmi function to a subset of image collection
    .map(addNdvi)
    .median()
    var ndvi = subset.select(['NDVI'])
    var ndviclass = ee.Image(1)
          .where(ndvi.gt(-1).and(ndvi.lte(0)), 1)
          .where(ndvi.gt(0).and(ndvi.lte(0.3)), 2)
          .where(ndvi.gt(0.3).and(ndvi.lte(0.5)), 3)
          .where(ndvi.gt(0.5).and(ndvi.lte(0.7)), 4)
          .where(ndvi.gt(0.7).and(ndvi.lte(1)), 5)
    Map.addLayer(ndviclass.clip(fire), {min: 1, max: 5, palette: palette}, 'NDVI class_recent');
  }
});
var reset = ui.Button({
 label: "Reset the App",
 onClick: function () {
    selectFire.setValue(null, false) 
    selectTime.setValue(null, false)
    check_fire.setValue(false)
    check_ndvi.setValue(false)
    check_ndmi.setValue(false)
    check_vchange.setValue(false)
    Map.clear()
 }
});