/*
App to display Landsat image scene, given sample id, and observation date
*/
/*
a. Display Landsat,
*/
///////////////////////////////////////////////////////////////
/////////// FUNCTIONS TO GET SATELLITE DATA I.E. LANDSAT ////////////////
var getImageRegion = function(region, date) {                      
  var collection4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterBounds(region)
      .filterDate(date, date.advance(1, 'day'))
  var collection5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterBounds(region)
      .filterDate(date, date.advance(1, 'day'))
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterBounds(region)
      .filterDate(date, date.advance(1, 'day'))
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(region)
      .filterDate(date, date.advance(1, 'day'))
  var col4NoClouds = collection4.map(maskL457)
  var col5NoClouds = collection5.map(maskL457)
  var col7NoClouds = collection7.map(maskL457)
  var col8NoClouds = collection8.map(maskL8)
  var colNoClouds = col4NoClouds
                      .merge(col5NoClouds)
                      .merge(col7NoClouds)
                      .merge(col8NoClouds)
  var indicesImage = ee.ImageCollection(addOpticIndices_addSavi(colNoClouds))   
  /* if omits .filterDate() above
  var equalDate = ee.Filter.equals('system:time_start', date);               // date argument used here
  var selectedImage = ee.ImageCollection(indicesImage)
                      .filter(equalDate).first();
  return selectedImage;
  */
  return indicesImage;
};
function maskL457(img) {
  /*  Keep 'clear' and 'water' pixels for Landsat 4, 5 and 7  
  https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/LSDS-1370_L4-7_Surface%20Reflectance-LEDAPS-Product-Guide.pdf */
  var mask = img.select(['pixel_qa']).eq(66)
              .or(img.select(['pixel_qa']).eq(68))
              .and(img.select('B1').gt(ee.Image(0)))
              // Add filter for band values < 10,000 i.e. 100% reflectance
              .and(img.select('B1').lte(ee.Image(10000)))
              .and(img.select('B2').lte(ee.Image(10000)))
              .and(img.select('B3').lte(ee.Image(10000)))
              .and(img.select('B4').lte(ee.Image(10000)))
              .and(img.select('B5').lte(ee.Image(10000)))
              .and(img.select('B7').lte(ee.Image(10000)))
  var masked = img.updateMask(mask)
         .select(['B1','B2', 'B3','B4','B5','B7'],
                 ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'])
  var scaled = ee.Image(masked).divide(ee.Image(10000))
               .copyProperties(masked, masked.propertyNames());
  return scaled;
}
function maskL8(img) {
    /*  Keep 'clear' and 'water' pixels for Landsat 8
  https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/LSDS-1368_%20L8_Surface-Reflectance-Code-LASRC-Product-Guide.pdf */
  var mask = img.select(['pixel_qa']).eq(322)
               .or(img.select(['pixel_qa']).eq(324))
               .and(img.select('B2').gt(ee.Image(0)))
              // Add filter for band values < 10,000 i.e. 100% reflectance           
              .and(img.select('B3').lte(ee.Image(10000)))
              .and(img.select('B4').lte(ee.Image(10000)))
              .and(img.select('B5').lte(ee.Image(10000)))
              .and(img.select('B6').lte(ee.Image(10000)))
              .and(img.select('B7').lte(ee.Image(10000)))
  var masked = ee.Image(img).updateMask(mask)
                      .select(['B2', 'B3','B4','B5','B6','B7'],
                              ['blue', 'green', 'red', 'nir', 'swir1', 'swir2']);
  var scaled = ee.Image(masked).divide(ee.Image(10000))
               .copyProperties(masked, masked.propertyNames());
  return scaled;
};
function addOpticIndices_addSavi(collection){
  /* Utility function for calculating spectral indices */
  return collection.map(function(image) {
    var ndvi = ee.Image(image).normalizedDifference(['nir', 'red']).rename('ndvi');
    var nbr = ee.Image(image).normalizedDifference(['nir', 'swir2']).rename('nbr');
    var ndmi = ee.Image(image).normalizedDifference(['nir', 'swir1']).rename('ndmi');          
    var evi = ee.Image(image).expression(
      '2.5 * (NIR - R) / (NIR + 6*R - 7.5*B + 1)', {
        R: image.select('red'),     
        NIR: image.select('nir'),     
        B: image.select('blue')
      }).rename('evi');    
    var savi = ee.Image(image).expression(
      '(1 + L) * float(nir - red)/(nir + red + L)', {
        'nir': image.select('nir'),
        'red': image.select('red'),
        'L': 0.9
    }).rename('savi');
    return ee.Image(image)
          .addBands([ndvi, evi, ndmi, nbr, savi])
          .select(['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'ndvi', 'evi', 'ndmi', 'nbr', 'savi']);   // copyProperties?
    });
  };
///////////////////////////////////////////////////////////////////////////////////////
// NEED LOCATION FOR A SAMPLE ID: POINT FEATURE COLLECTION WITH SAMPLE ID ATTRIBUTE
// Test sample
//5% Picture Pile expert set
//var expert_workshop_fc = ee.FeatureCollection("users/restoreplus62/IIASA/chips/geowiki_restoreplus_testPoints_1_idAsStr")
//expert_workshop_fc = expert_workshop_fc.sort('pointId') 
//print('expert_workshop_fc.limit(5)', expert_workshop_fc.limit(5))
// b_538_0_20150628_040206_17279509;2018-11-12
// Real sample
//Selected sample for expert workshop & online survey
//var expert_workshop_fc = ee.FeatureCollection("users/restoreplus62/IIASA/chips/expertWorkshopFeb/finalSamples")
var expert_workshop_fc = ee.FeatureCollection("users/restoreplus62/IIASA/chips/expertWorkshopMar/sampleGroup_merged_forGEE")
var expert_workshop_fc_extra = ee.FeatureCollection("users/restoreplus62/IIASA/chips/expertWorkshopMar/samples_extra_20200713_toExtractTs")
var sampleFC = expert_workshop_fc.merge(expert_workshop_fc_extra);
/////////////////////////////////////////////////////////////
///////////////////// SET UP UI ////////////////////////////
/*
- left panel: 
  - one texbox "Masukkan id sampel dan tanggal" to register sample id & Landsat date: '1390214;2005-03-15'
  - one button "Tampilkan citra" to show Landsat scene for the selected location & date
- right panel:
  map, set background 'SATELLITE', set layer 0 i.e. searched satellite scene, visualized as RGB (later may add other layers as other band combinations)
*/
//////////////////////////////////////////
// Left panel : user's query
var uiIdDate = ui.Textbox({
  value: 'id;tanggal(yyyy-mm-dd)',
  onChange: function(text) {
    var filledIdDate = text
  },
  style: {
    'position': 'top-left'
  }
})
//////////////////////////////////////////////////////////////
///////////////////////// Left map ///////////////////////////////
var uiRedChannelLeft = ui.Select({
  items: [{label: 'blue', value: 'blue'}, {label: 'green', value: 'green'}, {label: 'red', value: 'red'},
          {label: 'nir', value: 'nir'}, {label: 'swir1', value: 'swir1'}, {label: 'swir2', value: 'swir2'}],
  value: 'red',
  style: {width: '50px', position: 'bottom-right'},  // top-right
  onChange: function(value) {
    var selRedChannelLeft = value;
  }
});
var uiGreenChannelLeft = ui.Select({
  items: [{label: 'blue', value: 'blue'}, {label: 'green', value: 'green'}, {label: 'red', value: 'red'},
          {label: 'nir', value: 'nir'}, {label: 'swir1', value: 'swir1'}, {label: 'swir2', value: 'swir2'}],
  value: 'green',
  style: {width: '50px', position: 'bottom-right'},  // top-right
  onChange: function(value) {
    var selGreenChannelLeft = value;
  }
});
var uiBlueChannelLeft = ui.Select({
  items: [{label: 'blue', value: 'blue'}, {label: 'green', value: 'green'}, {label: 'red', value: 'red'},
          {label: 'nir', value: 'nir'}, {label: 'swir1', value: 'swir1'}, {label: 'swir2', value: 'swir2'}],
  value: 'blue',
  style: {width: '50px', position: 'bottom-right'},  // top-right
  onChange: function(value) {
    var selBlueChannelLeft = value;
  }
});
var bandCombiLeftPanel = ui.Panel({
  widgets: [uiRedChannelLeft, uiGreenChannelLeft, uiBlueChannelLeft],
  layout: ui.Panel.Layout.flow('horizontal')
})
///////////////////////////////////////////////////////
// Left map stretch min
var uiRedChannelLeftMin = ui.Textbox({
   value: '0',
   onChange: function(value){
    var selRedChannelLeftMin = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var uiGreenChannelLeftMin = ui.Textbox({
  value: '0',
  onChange: function(value){
    var selGreenChannelLeftMin = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var uiBlueChannelLeftMin = ui.Textbox({
  value: '0',
  onChange: function(value){
    var selBlueChannelLeftMin = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
/////////////////////////////////////////
// Left stretch max
var uiRedChannelLeftMax = ui.Textbox({
  value: '0.15',
  onChange: function(value){
    var selRedChannelLeftMax = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var uiGreenChannelLeftMax = ui.Textbox({
  value: '0.15',
  onChange: function(value){
    var selGreenChannelLeftMax = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var uiBlueChannelLeftMax = ui.Textbox({
  value: '0.15',
  onChange: function(value){
    var selBlueChannelLeftMax = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var bandCombiLeftPanelMin = ui.Panel({
  widgets: [uiRedChannelLeftMin, uiGreenChannelLeftMin, uiBlueChannelLeftMin],
  layout: ui.Panel.Layout.flow('horizontal')
}) 
var bandCombiLeftPanelMax = ui.Panel({
  widgets: [uiRedChannelLeftMax, uiGreenChannelLeftMax, uiBlueChannelLeftMax],
  layout: ui.Panel.Layout.flow('horizontal')
}) 
/////////////////////////////////////////////////////
///////////////////// Right map ////////////////////////////////////
var uiRedChannelRight = ui.Select({
  items: [{label: 'blue', value: 'blue'}, {label: 'green', value: 'green'}, {label: 'red', value: 'red'},
          {label: 'nir', value: 'nir'}, {label: 'swir1', value: 'swir1'}, {label: 'swir2', value: 'swir2'}],
  value: 'swir1',
  style: {width: '50px', position: 'bottom-right'},  // top-right
  onChange: function(value) {
    var selRedChannelRight = value;
  }
});
var uiGreenChannelRight = ui.Select({
  items: [{label: 'blue', value: 'blue'}, {label: 'green', value: 'green'}, {label: 'red', value: 'red'},
          {label: 'nir', value: 'nir'}, {label: 'swir1', value: 'swir1'}, {label: 'swir2', value: 'swir2'}],
  value: 'nir',
  style: {width: '50px', position: 'bottom-right'},  // top-right
  onChange: function(value) {
    var selGreenChannelRight = value;
  }
});
var uiBlueChannelRight = ui.Select({
  items: [{label: 'blue', value: 'blue'}, {label: 'green', value: 'green'}, {label: 'red', value: 'red'},
          {label: 'nir', value: 'nir'}, {label: 'swir1', value: 'swir1'}, {label: 'swir2', value: 'swir2'}],
  value: 'red',
  style: {width: '50px', position: 'bottom-right'},  // top-right
  onChange: function(value) {
    var selBlueChannelRight = value;
  }
});
var bandCombiRightPanel = ui.Panel({
  widgets: [uiRedChannelRight, uiGreenChannelRight, uiBlueChannelRight],
  layout: ui.Panel.Layout.flow('horizontal')
})
////////////////////////////////////////////
// Right map stretch min
var uiRedChannelRightMin = ui.Textbox({
  value: '0',
  onChange: function(value){
    var selRedChannelRightMin = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var uiGreenChannelRightMin = ui.Textbox({
  value: '0',
  onChange: function(value){
    var selGreenChannelRightMin = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var uiBlueChannelRightMin = ui.Textbox({
  value: '0',
  onChange: function(value){
    var selBlueChannelRightMin = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
/////////////////////////////////////////////
// Right map stretch max
var uiRedChannelRightMax = ui.Textbox({
  value: '0.4',
  onChange: function(value){
    var selRedChannelRightMax = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var uiGreenChannelRightMax = ui.Textbox({
   value: '0.5',
   onChange: function(value){
    var selGreenChannelRightMax = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var uiBlueChannelRightMax = ui.Textbox({
  value: '0.15',
  onChange: function(value){
    var selBlueChannelRightMax = value;
  },
  style: {width: '50px', position: 'bottom-right'}
})
var bandCombiRightPanelMin = ui.Panel({
  widgets: [uiRedChannelRightMin, uiGreenChannelRightMin, uiBlueChannelRightMin],
  layout: ui.Panel.Layout.flow('horizontal')
}) 
var bandCombiRightPanelMax = ui.Panel({
  widgets: [uiRedChannelRightMax, uiGreenChannelRightMax, uiBlueChannelRightMax],
  layout: ui.Panel.Layout.flow('horizontal')
}) 
/////////////////////////////////////////////
var uiSubmit = ui.Button({
  label: 'Tampilkan', 
  onClick: function() {
    submit()                              // Need to make main call function
  }
})
var inputPanel = ui.Panel({
  widgets: [ui.Label('Input'),
            ui.Label('Masukkan id sampel dan tanggal citra'),
            uiIdDate,
            ui.Label('-----------------------------------------------------'),
            ui.Label('Pilih kombinasi bands (R,G,B) untuk peta sebelah kiri. Default true colour combination red, green, blue. Tipikal rentang nilai visible bands antara 0 - 0.15. Reload page untuk kembali ke default setting.'),
            bandCombiLeftPanel,
            ui.Label('Minimum'),
            bandCombiLeftPanelMin,
            ui.Label('Maksimum'),
            bandCombiLeftPanelMax,
            ui.Label('-----------------------------------------------------'),
            ui.Label('Pilih kombinasi bands (R,G,B) untuk peta sebelah kanan. Default false colour combination swir1, nir, red. Tipikal rentang nilai 0 - 0.4 (swir1), 0 - 0.5 (nir), dan 0 - 0.15 (red). Reload page untuk kembali ke default setting.'),
            bandCombiRightPanel,
            ui.Label('Minimum'),
            bandCombiRightPanelMin,
            ui.Label('Maksimum'),
            bandCombiRightPanelMax,
            ui.Label('-----------------------------------------------------'),
            ui.Label('Tampilkan citra'),
            uiSubmit],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    height: '100%',
    width: '18%'
  }
})
//////////////////////////////////////////
// Right panel : map
// Linked panel
var maps = [];
var panelNames = ['left_panel', 'right_panel'];
panelNames.forEach(function(name, index) {
  var map = ui.Map()
  map.setControlVisibility({layerList: true});
  maps.push(map)
});
var linker = ui.Map.Linker(maps);
var mapPanel = ui.Panel(
  [maps[0], maps[1]],
  ui.Panel.Layout.Flow('horizontal'), 
  {stretch: 'both'})
////////////////////////////////////////////////////
///////////////// SET UI.ROOT ////////////////////
//ui.root.clear()
//ui.root.add(inputPanel)
//ui.root.add(mapPanel)
ui.root.widgets().reset([inputPanel, mapPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('horizontal'))
/////////////////////////////////////////////////////
////////////////// INITIALIZE RE-SETTABLE WIDGETS ///////////////
//Map.layers().set(1, ui.Map.Layer(null, null, "Citra resolusi menengah (belum dipilih)"));
//////////////////////////////////////////////////////////
//////////////////// MAIN CALL FUNCTION  ////////////////////////
function submit() {
  var filledIdDate = uiIdDate.getValue();
  // Parse sample id and Landsat date from texbox input
  var split = filledIdDate.split(';')
  var id = split[0]                                                //***** id is string
  id = ee.Number.parse(id)
  var date = split[1]
  var dateServer = ee.Date(date)
  //print('dateServer', dateServer)
  // Convert date 
  //dateServer = dateServer.millis()
  // Get point corresponds to sample id
  var location = sampleFC.filter(ee.Filter.eq('pointId', id))       //*******
  //print('location', location)
  // Center the map to that location
  maps[0].centerObject(location, 15)
  // Get Landsat scene
  var collection = getImageRegion(location, dateServer)
  //print('collection', collection)
  // Can be several scenes, so mosaic
  if (collection.size().getInfo() > 1) {
    var mosaicked = ee.Image(collection.mosaic())
  } else {
    var mosaicked = ee.Image(collection.first())
  }
  // Add scene to map
  // a) Band combination 1
  var LEFT_VIS = {
    min: [Number(uiRedChannelLeftMin.getValue()), Number(uiGreenChannelLeftMin.getValue()), Number(uiBlueChannelLeftMin.getValue())], 
    max: [Number(uiRedChannelLeftMax.getValue()), Number(uiGreenChannelLeftMax.getValue()), Number(uiBlueChannelLeftMax.getValue())], 
    bands: [uiRedChannelLeft.getValue(), uiGreenChannelLeft.getValue(), uiBlueChannelLeft.getValue()]}  // gamma: 1.5
  var leftMapLayer = ui.Map.Layer(mosaicked, LEFT_VIS, 'Landsat scene ' + date);   // collection -> mosaicked
  maps[0].layers().set(0, leftMapLayer);
  // b) Band combination 2
  var RIGHT_VIS = {
    min: [Number(uiRedChannelRightMin.getValue()), Number(uiGreenChannelRightMin.getValue()), Number(uiBlueChannelRightMin.getValue())], 
    max: [Number(uiRedChannelRightMax.getValue()), Number(uiGreenChannelRightMax.getValue()), Number(uiBlueChannelRightMax.getValue())], 
    bands: [uiRedChannelRight.getValue(), uiGreenChannelRight.getValue(), uiBlueChannelRight.getValue()]}  // gamma: 1.5
  var rightMapLayer = ui.Map.Layer(mosaicked, RIGHT_VIS, 'Landsat scene ' + date);   // collection -> mosaicked
  maps[1].layers().set(0, rightMapLayer);
  // Add location point
  var dot0 = ui.Map.Layer(location, {color:'C5003D'}, 'Titik sampel id '+ id.getInfo());
  var dot1 = ui.Map.Layer(location, {color:'C5003D'}, 'Titik sampel id '+ id.getInfo());
  maps[0].layers().set(1, dot0)
  maps[1].layers().set(1, dot1)
  /*
  var stretchButton1 = ui.Button('90th percentile stretch', makeLayer1, false, {'position': 'bottom-center'})
  var stretchButton2 = ui.Button('90th percentile stretch', makeLayer2, false, {'position': 'bottom-center'})
  maps[0].add(stretchButton1)
  maps[1].add(stretchButton2)
  function makeLayer1() {
    mosaicked.reduceRegion({
      reducer:ee.Reducer.percentile([10,90]),
      geometry:maps[0].getBounds(true),
      bestEffort:true,
    }).evaluate(function(percentiles) {
      var LEFT_VIS = {
        min: [percentiles.get(uiRedChannelLeft.getValue()+'_p10'), percentiles.get(uiGreenChannelLeft.getValue()+'_p10'), percentiles.get(uiBlueChannelLeft.getValue()+'_p10')], 
        max: [percentiles.get(uiRedChannelLeft.getValue()+'_p90'), percentiles.get(uiGreenChannelLeft.getValue()+'_p90'), percentiles.get(uiBlueChannelLeft.getValue()+'_p90')], 
        bands: [uiRedChannelLeft.getValue(), uiGreenChannelLeft.getValue(), uiBlueChannelLeft.getValue()]
      }  
      var leftMapLayer = ui.Map.Layer(mosaicked, LEFT_VIS, 'Landsat scene ' + date);   // collection -> mosaicked
      maps[0].layers().set(0, leftMapLayer);
    });
  }
  function makeLayer2() {
    mosaicked.reduceRegion({
      reducer:ee.Reducer.percentile([10,90]),
      geometry:maps[1].getBounds(true),
      bestEffort:true,
    }).evaluate(function(percentiles) {
      var RIGHT_VIS = {
        min: [percentiles.get(uiRedChannelRight.getValue()+'_p10'), percentiles.get(uiGreenChannelRight.getValue()+'_p10'), percentiles.get(uiBlueChannelRight.getValue()+'_p10')], 
        max: [percentiles.get(uiRedChannelRight.getValue()+'_p90'), percentiles.get(uiGreenChannelRight.getValue()+'_p90'), percentiles.get(uiBlueChannelRight.getValue()+'_p90')], 
        bands: [uiRedChannelRight.getValue(), uiGreenChannelRight.getValue(), uiBlueChannelRight.getValue()]
      }  
     var rightMapLayer = ui.Map.Layer(mosaicked, RIGHT_VIS, 'Landsat scene ' + date);   // collection -> mosaicked
      maps[1].layers().set(0, rightMapLayer);
    });
  }
  */
}
// b_538_0_20150628_040206_17279509;2018-11-12
// b_538_0_20150628_040206_17279509;2016-08-02
// b_538_0_20150628_040206_17279509;2004-08-17
// c_538_0_20180717_022255_17235274;2018-03-20
// c_538_0_20180717_022255_17235274;2018-10-14
// f_538_0_20150303_023257_16628852;2015-11-22
// f_538_0_20150303_023257_16628852;2015-11-23