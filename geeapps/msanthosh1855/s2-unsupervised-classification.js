var pathRow = ee.FeatureCollection("users/msanthosh1855/S2PathRow");
// App // 
var drawingTools = Map.drawingTools();
drawingTools.setShown(false)
var mainPanel = ui.Panel({
  style: {width:'25%'}
})
var title = ui.Label({
  value: 'S2 un-supervised classifier',
  style: {'fontSize': '24px'}
});
mainPanel.add(title)
var subTitle = ui.Label({
  value: 'The app will do cloud masing for each image.Mean composite image \
           will be created from the given date range, then wekaKMeans classifier \
           is used to classify the computed Sentine 2 scene.',
  style: {'fontSize': '12px'}
});
mainPanel.add(subTitle)
var filterText = ui.Panel()
var filterLab1 = ui.Label({value:'Start date', style:{color:'black', width:'150px', fontWeight:'bold'}})
var filterLab2 = ui.Label({value:'End date',style:{fontWeight:'bold'}})
filterText.add(filterLab1)
filterText.add(filterLab2)
filterText.setLayout(ui.Panel.Layout.flow('horizontal'))
var filterPanel = ui.Panel(); 
var datePanel = ui.Panel()
var startDate = ui.Textbox({
  placeholder:'YYYY-MM-DD', 
  value:'2020-05-01'})
var endDate = ui.Textbox({
  placeholder:'YYYY-MM-DD', 
  value:'2020-06-01'})
datePanel.add(startDate)
datePanel.add(endDate)
datePanel.setLayout(ui.Panel.Layout.flow('horizontal'))
var metaText = ui.Panel()
var metaLab1 = ui.Label({value:'Entre max cloud percentage',style:{color:'black', width:'150px', fontWeight:'bold'}})
var metaLab2 = ui.Label({value:'Enter the number of class',style:{fontWeight:'bold'}})
metaText.add(metaLab1)
metaText.add(metaLab2)
metaText.setLayout(ui.Panel.Layout.flow('horizontal'))
var metaPanel = ui.Panel()
var cloudPerc = ui.Textbox({
  placeholder:'0-100', 
  value:'20'})
var classList = ee.List.sequence(1, 10)
var classStrings = classList.map(function(year){
  return ee.Number(year).format('%01d')
})
var totalClass = ui.Select({
    placeholder: 'Select number of classes',
    items:classStrings.getInfo(),
    value:'5'
  })
metaPanel.add(cloudPerc)
metaPanel.add(totalClass)
metaPanel.setLayout(ui.Panel.Layout.flow('horizontal'))
var coordText = ui.Panel()
var coordLab1 = ui.Label({value:'Enter Latitude',style:{color:'black', width:'150px', fontWeight:'bold'}})
var coordLab2 = ui.Label({value:'Enter Longitude',style:{fontWeight:'bold'}})
coordText.add(coordLab1)
coordText.add(coordLab2)
coordText.setLayout(ui.Panel.Layout.flow('horizontal'))
var coordPanel = ui.Panel()
var lat = ui.Textbox({
  placeholder:'42.381', 
  value:'42.381'})
var lon = ui.Textbox({
  placeholder:'-71.314', 
  value:'-71.314'})
coordPanel.add(lat)
coordPanel.add(lon)
coordPanel.setLayout(ui.Panel.Layout.flow('horizontal'))
var classifyBox = ui.Panel(ui.Button({
  label:'classify',
  onClick:function(){compute()},
  }))
var downloadImage = ui.Label({
  value:'Download classified Image',
  style:{border:'2px solid black', padding:'4px'}
  })
filterPanel.add(filterText)
filterPanel.add(datePanel)
filterPanel.add(metaText)
filterPanel.add(metaPanel)
filterPanel.add(coordText)
filterPanel.add(coordPanel)
mainPanel.add(filterPanel)
mainPanel.add(classifyBox)
mainPanel.add(downloadImage)
function compute(){
Map.clear()
downloadImage.setValue('Preparing your download')
downloadImage.style().set({backgroundColor:'#fff'})
var sDate = startDate.getValue()
var eDate = endDate.getValue()
var cloudPixelPercentage = cloudPerc.getValue()
var latitude = ee.Number.parse(lat.getValue())
var longitude = ee.Number.parse(lon.getValue())
var geometry = ee.Geometry.Point([longitude, latitude])
var buff = geometry.buffer(10000, 0.1)
Map.addLayer(buff)
var tile = ee.Feature(pathRow.filter(ee.Filter.bounds(geometry)).first())
var S2Tile = tile.get('Name')
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).copyProperties(image, image.propertyNames());
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filter(ee.Filter.bounds(buff))
                  .filter(ee.Filter.date(sDate, eDate))
                  .map(maskS2clouds)
                  .select('B.*');
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var input = ee.Image(dataset.median()).clip(buff)
Map.addLayer(input, visualization, 'RGB');
var region = ee.Feature(pathRow.filter(ee.Filter.eq('Name', S2Tile)).first()).geometry()
Map.centerObject(buff)
// Map.addLayer(region)
// var numCluster = 5
var numCluster = ee.Number.parse(totalClass.getValue())
var afterClass = ee.List.sequence(1, 5)
var beforeClass = afterClass.map(function(n){
  return ee.Number(n).subtract(1)
})
var training = input.sample({
  region: buff,
  scale: 20,
  numPixels: 5000,
  tileScale:16
});
var clusterer = ee.Clusterer.wekaKMeans(numCluster).train(training);
// Cluster the input using the trained clusterer.
var result = input.cluster(clusterer);
// Display the clusters with random colors.
result = result.rename('classified')
// print(beforeClass, afterClass)
Map.addLayer(result.randomVisualizer(),{}, 'clusters');
// print(result)
result.getDownloadURL({
  params:{name:'classified_Image',
    bands:['classified'],
    region:buff,
    scale:20
    }, 
  callback:function(URL) {
    // print(URL)
    downloadImage.setUrl(URL)
    downloadImage.style().set({backgroundColor:'#90EE90'})
    downloadImage.setValue('Download Ready !')
  }
})
}
ui.root.add(mainPanel)