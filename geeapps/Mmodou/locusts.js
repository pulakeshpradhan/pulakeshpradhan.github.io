var sahel=ee.FeatureCollection('users/Mmodou/countryLocust')
var wa = ee.FeatureCollection("projects/servir-wa/aoi/afrique_ouest_aoi1");
var biotopeCollection = ee.FeatureCollection("projects/servir-wa/services/locusts_west_africa/biotopo_2008");
 Map.centerObject(biotopeCollection,5)
 Map.setOptions('TERRAIN')
 //Map.addLayer(sahel,{color:'grey'},'sahel')
// Map.addLayer(biotopeCollection,{color:'red'},'Biotop')
var t1=new Date()
t1.setMonth(t1.getMonth()-1)
var t2=ee.Date(t1.getTime())
 var Rain= ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD")
            .filterDate('2019-01-01','2020-06-30')
            .filterBounds(sahel)
/////////////////////////////////////////SOIL  MOISTURE      ++++++++++++++++++++++++++++++++/////////////
var boxcar = ee.Kernel.circle(3);
var collection = ee.ImageCollection("COPERNICUS/S1_GRD")
                  .filterBounds(sahel)
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                  //.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
                  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
                  .filterDate('2018-01-01','2020-06-30')
                  .map(function(image){
                    return image.clip(biotopeCollection)
                                .select(['VV'])
                                .convolve(boxcar)
                  })
var drySigma = collection.select('VV').reduce(ee.Reducer.percentile([10]));
var wetSigma = collection.select('VV').reduce(ee.Reducer.percentile([90]));
var sensitivity = wetSigma.subtract(drySigma).select('VV_p90').rename('sensitivity');
var soilmoisture = collection
                    .select(['VV'])
                    .filterDate(t2, t2.advance(1,'month'))
                    .map(function(image){
                      return image.subtract(drySigma)
                                  .divide(sensitivity)
                                  .select('VV')
                                  .rename('SSM')
                                  .copyProperties(image, ['system:time_start'])
                    })
var vwc= soilmoisture.map(function(image){
  return image.multiply(0.1160)
              .add(0.1313)
              .rename('VWC')
              .copyProperties(image, ['system:time_start'])
})
// Map.addLayer(vwc.max(),{min:0.12, max:0.4,palette:['red','yellow','blue']},'Soil Moisture')
/////////////////////////////////////////////////// SENTINEL 1  /////////////////////////////////////////////////////////
var S2= ee.ImageCollection('COPERNICUS/S2')
          .filterDate(t2, t2.advance(1,'month'))
          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',10)
          .filterBounds(sahel)
          .select('B3','B4','B8')
          .map(function(image){
    var Ndvi=image.clip(sahel).normalizedDifference(['B8','B4']).rename('NDVI')
    return image.addBands(Ndvi)
  })
var ndvi=S2.select('NDVI').median()
var shallow=ndvi.gt(0.1).and(ndvi.lt(0.28)).selfMask()
var dense=ndvi.gt(0.3).selfMask()
var ssm=vwc.max()
////////////////////////////////////////++++++++++++++++++++++++    LEGEND START   +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function makeLegendEntry(color, label) {
  return makeRow([makeColorBox(color), ui.Label(label)]);
}
function makeColorBox(color) {
  return ui.Label('', {
    backgroundColor: color,  
    padding: '10px',
  })
}
function makeRow(widgets){
  return ui.Panel({
    widgets: widgets,
    layout: ui.Panel.Layout.flow('horizontal'),
  })
}
// Start with a ui.Panel:
var legend = ui.Panel({
  style: {
    position: 'top-right',
  }
});
// Add a title to the legend:
legend.add(ui.Label("Legend"));
////////////////////////////////////////++++++++++++++++++++++++    LEGEND END    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var SHALLOW='Shallow Vegetation'
var DENSE='Dense Vegetation'
var SSM='Soil Moisture'
var texts=ui.Label(
      "This p-Locust app is based on high resolution satellite data (Sentinel2 and Sentinel1) of dense vegetation condition,\n "
      +"Open water area, High Resolution Soil Moisturederived from sentinel 1 SAR C-Band with the TuWien Algorithm, \n"
      +"historical Rainfall data from CHIPRS is also include on this app,\n"
      +"This Platform is being developed by SERVIR WEST AFRICA\n"
      +"The Analysis is based on Dr.Sory work on the condition that promote desert locust's gregarization,\n"
      +"vegetation cover favored locust dispersion with higer gragarization (1525 ins/ha on average)", 
      {fontSize: '12px', color:'black', backgroundColor:'white'});
// Create a label and pull-down menu.
var title=ui.Label("Criquet Pelerin Risk Mapping",
                    {color:'black',
                    fontSize:'30px', 
                    textAlign:'center', 
                    fontWeight:'bold', 
                    fontFamily:'sherif',
                    backgroundColor:'white'
                    })
var label =new ui.Label({
  value:'Vegetation Condition: ', 
  style:{fontSize:'15px', stretch:'horizontal'}
});
var select = ui.Select({
  items: [SHALLOW, DENSE, SSM],
  value: DENSE,
  onChange: redraw,
  style: {stretch:'horizontal', fontSize:'14px'}
});
var box = new ui.Panel({
  widgets: [label, select],
  layout: ui.Panel.Layout.flow('horizontal')
});
//  Map.addLayer(vwc.max(),{min:0.12, max:0.4,palette:['red','yellow','blue']},'Soil Moisture')
function redraw() {
  Map.layers().reset();
  var layer = select.getValue();
  var image;
  if (layer == DENSE) {
    image = dense;
    Map.addLayer(image, {palette:['white','#198506']}, layer);
  } else if (layer == SHALLOW) {
    image = shallow;
    Map.addLayer(image, {palette:['white','#e8f709']}, layer);
  } else {
    image=ssm; 
    Map.addLayer(ssm,{min:0.12, max:0.4,palette:['red','yellow','blue']},'Soil Moisture')
    legend.add(makeLegendEntry('red', 'high Moisture'));
    legend.add(makeLegendEntry('yellow', 'medium Moisture'));
    legend.add(makeLegendEntry('blue', 'medium Moisture'));
    Map.add(legend);
  }
}
redraw();
///// ++++++++++++++++++++++++ 
  var startDateLabel = new ui.Label({
    value: 'Start:  ', 
    style: {
    fontSize: '14px',
    stretch: 'horizontal'}});
var endDateLabel = new ui.Label({
    value: 'End:  ', 
    style: {
    fontSize: '14px',
    stretch: 'horizontal'}});
var startDateBox = ui.Textbox({
      placeholder: 'min', 
      value: ee.Date(t1).format("yyyy-MM-dd").getInfo(), 
      style: {
        maxWidth: '100px'
      }
      })
var endDateBox = ui.Textbox({
      placeholder: 'min', 
      value: t2.advance(1,'month').format("yyyy-MM-dd").getInfo(), 
      style: {
        maxWidth: '100px'
      }
      })
var startDatePanel = new ui.Panel({
    widgets: [startDateLabel, startDateBox],
    layout: ui.Panel.Layout.flow('horizontal'),
});
var endDatePanel = new ui.Panel({
    widgets: [endDateLabel, endDateBox],
    layout: ui.Panel.Layout.flow('horizontal'),
});
////+++++++++++++++++++++++++++
function updateMap(start_date, end_date){
var S2= ee.ImageCollection('COPERNICUS/S2')
          .filterDate(start_date, end_date)
          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',10)
          .filterBounds(sahel)
          .select('B3','B4','B8')
          .map(function(image){
    var Ndvi=image.clip(sahel).normalizedDifference(['B8','B4']).rename('NDVI')
    return image.addBands(Ndvi)
  })
var ndvi=S2.select('NDVI').median()
var shallow=ndvi.gt(0.1).and(ndvi.lt(0.28)).selfMask()
var dense=ndvi.gt(0.3).selfMask()
Map.layers().reset();
  var layer = select.getValue();
if (layer == DENSE) {
    var image = dense;
    Map.addLayer(image, {palette:['white','#198506']}, layer);
  } else  {
    image = shallow;
    Map.addLayer(image, {palette:['white','#e8f709']}, layer);
  } 
}
var updateButton = ui.Button({
    label: 'Update map', 
    style: {stretch: 'horizontal'},
    onClick: function(){
        updateMap(startDateBox.getValue(), endDateBox.getValue())      
      }
})
///////++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var allPanel=new ui.Panel({
  widgets:[title,texts,startDatePanel,endDatePanel,box,updateButton], 
  style:{width:'400px'},
  layout:ui.Panel.Layout.flow('vertical')
})
///////++++++++++++++++++++++++++++++++
ui.root.widgets().insert(0,allPanel)