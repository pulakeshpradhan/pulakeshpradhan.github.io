///////////////////////////////////////////////////////////////////////////////////////////////////
//---------------- 1. Model
///////////////////////////////////////////////////////////////////////////////////////////////////
var AOI = ee.Geometry.Polygon(
        [[[-75.6083935464131, 6.914261433315163],
          [-75.6083935464131, 7.16436063861369],
          [-75.91463744289747, 7.16436063861369],
          [-75.91463744289747, 6.914261433315163]]]);
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
var imageCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterBounds(AOI)
                  .map(maskL8sr);
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
///////////////////////////////////////////////////////////////////////////////////////////////////
//---------------- 2. Components
///////////////////////////////////////////////////////////////////////////////////////////////////
var controlPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(), 
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: "300px",
      // backgroundColor: '#13ff15'
    }
});
var mapPanel = ui.Map()
var intropanel = ui.Panel([
  ui.Label({
    value: 'Río Cauca',
    style: {fontSize: '25px', fontWeight: 'bold', color: 'Crimson'}
  }),
  ui.Label('App para identificar cambios en el río Cauca durante la construcción de HidroItuango', LABEL_STYLE1 )
]);
var yearlabel = ui.Label('Seleccione un año para mostrar')
var yearslider = ui.Slider({
  min: 2014, 
  max: 2021, 
  step: 1,
  onChange: onYearChange
})
var yearpanel = ui.Panel([yearlabel, yearslider])
///////////////////////////////////////////////////////////////////////////////////////////////////
//---------------- 3. Composition
///////////////////////////////////////////////////////////////////////////////////////////////////
ui.root.clear();  // to get rid of default ui Map Widget
ui.root.add(controlPanel)
ui.root.add(mapPanel)
controlPanel.add(intropanel)
controlPanel.add(yearpanel)
///////////////////////////////////////////////////////////////////////////////////////////////////
//---------------- 4. Styling
///////////////////////////////////////////////////////////////////////////////////////////////////
var LABEL_STYLE1 = {
  fontWeight: 'normal',
  textAlign: 'left',
  fontSize: '13px',
  padding: '2px',
  color: 'black',
  // backgroundColor: '#13ff15',
};
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
///////////////////////////////////////////////////////////////////////////////////////////////////
//---------------- 5. Behaviors
///////////////////////////////////////////////////////////////////////////////////////////////////
mapPanel.setCenter(-75.7611, 7.0375, 11)
function onYearChange(YearId){
  mapPanel.clear()
  // print(YearId);
  if(YearId === 2014){
    var y2014 = imageCollection.filterDate('2014-01-01','2014-12-31').mean().clip(AOI);
    mapPanel.addLayer(y2014 ,visParams, '2014');
  }
  else if(YearId === 2015){
    var y2015 = imageCollection.filterDate('2015-01-01','2015-12-31').mean().clip(AOI);
    mapPanel.addLayer(y2015 ,visParams, '2015');
  }
  else if(YearId === 2016){
    var y2016 = imageCollection.filterDate('2016-01-01','2016-12-31').mean().clip(AOI);
    mapPanel.addLayer(y2016 ,visParams, '2016');
  }
  else if(YearId === 2017){
    var y2017 = imageCollection.filterDate('2017-01-01','2017-12-31').mean().clip(AOI);
    mapPanel.addLayer(y2017 ,visParams, '2017');
  }
  else if(YearId === 2018){
    var y2018 = imageCollection.filterDate('2018-01-01','2018-12-31').mean().clip(AOI);
    mapPanel.addLayer(y2018 ,visParams, '2018');
  }
  else if(YearId === 2019){
    var y2019 = imageCollection.filterDate('2019-01-01','2019-12-31').mean().clip(AOI);
    mapPanel.addLayer(y2019 ,visParams, '2019');
  }
  else if(YearId === 2020){
    var y2020 = imageCollection.filterDate('2020-01-01','2020-12-31').mean().clip(AOI);
    mapPanel.addLayer(y2020 ,visParams, '2020');
  }
  else if(YearId === 2021){
    var y2021 = imageCollection.filterDate('2021-01-01','2021-12-31').mean().clip(AOI);
    mapPanel.addLayer(y2021 ,visParams, '2021');
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
//---------------- 6. Initialization
///////////////////////////////////////////////////////////////////////////////////////////////////
var YearId = 2014  // Default year is 2021
onYearChange(YearId)