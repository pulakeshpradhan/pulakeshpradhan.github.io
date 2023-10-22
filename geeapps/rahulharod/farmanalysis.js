var panel= ui.Panel({style:{ height: '300px', width: '300px', position: 'top-left'}});
Map.add(panel)
Map.style().set({cursor: 'crosshair'});
var ProvideDates = ui.Label({value:'1. User Inputs',
style: {fontSize: '18px', fontWeight: 'bold'}});
var DateFormate = ui.Label('Start Date and End Date for NDVI Time Series.',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var datasetRange_label1 = ui.Label('Start [YYYY-MM-DD]   ',
  {margin: '5px 0 0 10px',fontSize: '11px',color: 'gray'});
var datasetRange_label2 = ui.Label('End [YYYY-MM-DD]    ',
  {margin: '5px 0 0 10px',fontSize: '11px',color: 'gray'});
panel.add(ProvideDates).add(DateFormate)
      .add(ui.Panel([datasetRange_label1, datasetRange_label2],ui.Panel.Layout.flow('horizontal')));
var start = ui.Textbox({placeholder: 'Start Date',  value: '2022-12-01',
  style: {width: '100px'}});
var end = ui.Textbox({placeholder: 'End Date',  value: '2023-04-30',
  style: {width: '100px'}});
panel.add(ui.Panel([start, end],ui.Panel.Layout.flow('horizontal')));
var Cloud_cover_label = ui.Label('Max Cloud %  (0-100) ',
  {margin: '10px 0 0 10px',fontSize: '12px',color: 'gray', fontWeight: 'bold'});
var Cloud_cover = ui.Textbox({placeholder: 'Max Cloud Percentage',  value:'30',
  style: {width: '50px'}});
var Day_mosaic_label = ui.Label('No. of days to mosaic',
  {margin: '10px 0 0 10px',fontSize: '12px',color: 'gray', fontWeight: 'bold'});
var Day_mosaic = ui.Textbox({placeholder: 'Days',  value:'15',
  style: {width: '50px'}});
panel.add(ui.Panel([Cloud_cover_label, Cloud_cover],ui.Panel.Layout.flow('horizontal')));
panel.add(ui.Panel([Day_mosaic_label, Day_mosaic],ui.Panel.Layout.flow('horizontal')));
// Load the shapefiles into the GEE assets
var Ajanda = ee.FeatureCollection("projects/ee-rahulharod/assets/APP_cadestral_data/Ajanda_cadastral_data");
var Kinangao = ee.FeatureCollection("projects/ee-rahulharod/assets/APP_cadestral_data/Kinangao_cadastral_data");
Map.setOptions('HYBRID');
// Create a list of shapefile options
var shapefileOptions = [
  {label: 'Ajanda', value: Ajanda},
  {label: 'Kinangao', value: Kinangao}
];
var vis_params_vector = {
    'color': '000000', 
    'pointSize': 3,
    'pointShape': 'star5',
    'width': 1,
    'lineType': 'solid',
    'fillColor': '00000000',
}
var features=Ajanda;
var date_start,date_end,Max_Cloud,day_mean,chartPanel,
    coll,CHIRPS,CHIRPS_dates,Landsat_coll,GPM, GIF_link;
// Create a UI panel and add a dropdown menu
var shapefileDropdown = ui.Select({
  items: shapefileOptions,
  placeholder:'Select Village',
  onChange: function(value) {
      features=value;
      Map.centerObject(features,14);
      Map.addLayer(features.style(vis_params_vector), {}, features.label);
      date_start = start.getValue();
      date_end= end.getValue();
      Max_Cloud=ee.Number.parse(Cloud_cover.getValue());
      day_mean=ee.Number.parse(Day_mosaic.getValue());
      print(date_start,date_end,Max_Cloud,day_mean)
      coll = require('users/rahulharod/APP:S2_Indices.js');
      coll=ee.ImageCollection(coll.S2_collection(ee.Date(date_start),ee.Date(date_end),features,features,Max_Cloud,day_mean));
      print('S2_coll',coll);
      GIF_link=GetCadestralGIF(coll.select('NDVI'),features);
      print(GIF_link)
      CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").filterDate(ee.Date(date_start),ee.Date(date_end));
      CHIRPS_dates=CHIRPS.aggregate_array('system:time_start').sort();
      print(CHIRPS);
      // GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_V06").filterDate(ee.Date(date_start),ee.Date(date_end))
      //                                                     .select('HQprecipitation').sum().clip(features).multiply(3);
      Landsat_coll = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2").merge(ee.ImageCollection("LANDSAT/LC09/C02/T1_L2"))
                        .filterDate(ee.Date(date_start),ee.Date(date_end))
                        .filterBounds(features).filter(ee.Filter.lt('CLOUD_COVER_LAND',Max_Cloud)).select('ST_B10')
                        .map(function(img){
                          img= img.multiply(0.00341802).add(-124.5).clip(features)
                          return img.updateMask(img.gt(0)).int8()
                        });
      print(Landsat_coll)                        
  }
});
// Coordinate list to push clicked point to, then use to filder bounds
var coords = [];
// Filter features dataset by clicked location
function getfeature(){
  var feature_shp = features.filterBounds(ee.Geometry.Point(coords));
  Map.addLayer(feature_shp.style(vis_params_vector));
  Map.centerObject(feature_shp, 17)
  return feature_shp;
}
function handleMapClick(location) {
  coords = [];
  coords.push(location.lon, location.lat);
  Map.remove(Map.layers().get(0));
  getfeature();
  Map.add(middlePanel)
  // Map.add(runButton);
  getStatistics();
  Map.add(clearButton);
  Map.remove(Map.layers().get(0));
  Map.remove(Map.layers().get(0));
}
function runButtonClick(location) {
  getStatistics();
  Map.remove(runButton);
  Map.add(clearButton);
  Map.remove(Map.layers().get(0));
  Map.remove(Map.layers().get(0));
}
// Clears the set of selected points and resets the overlay 
function clearResults() {
  coords = [];
  Map.remove(Map.layers().get(1));
  Map.remove(Map.layers().get(0));
  // panel.remove(panel.widgets().get(7));
  Map.remove(clearButton);
  Map.remove(middlePanel);
  Map.centerObject(features, 14);
  Map.addLayer(features.style(vis_params_vector));
  middlePanel.clear()
}
Map.onClick(handleMapClick);
function GetCadestralGIF(img_coll,aoi){
  var videoArgs = {
    dimensions: 768,
    region: aoi.geometry(),
    framesPerSecond:0.5,
    crs: 'EPSG:3857',
  };
  var text = require('users/gena/packages:text'); 
  // var text = require('users/rharod4/Packages:Gena_text'); 
  var annotations = [{position: 'left', offset: '1%', margin: '1%', property: 'label', scale:10, 
                      textColor: 'white', outlineColor: '000000', outlineWidth: 4,outlineOpacity:1}]
  var rgbVis = img_coll.map(function(img) {
  var timeStamp =img.get('date'); 
      timeStamp = ee.String('Date: ').cat(timeStamp); 
      img = img.visualize({
        forceRgbOutput: true,
        min: 0.1,
        max: 0.6,
        palette :['d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850']})
        .set({'label': timeStamp})
    return text.annotateImage(img, {}, aoi.geometry(), annotations);
  });
  var background = ee.Image(0).visualize({palette: ['white']});
  var empty = ee.Image().byte().clip(aoi);
  var ROIOutline = empty.paint({featureCollection: aoi, color: 1, width: 1}).visualize({palette: '000000'});
  var tempColOutline = rgbVis.map(function(img) {
    return  background.blend(img).updateMask(1).blend(ROIOutline);
  });  
  print(tempColOutline.getVideoThumbURL(videoArgs));
  return ui.Thumbnail({image:tempColOutline, params:videoArgs,style:{'backgroundColor': 'white'}});
  }
// Clear button
var clearButton = ui.Button('Clear', clearResults);
var runButton = ui.Button('Run', runButtonClick);
// Add the UI panel to the GEE UI
var palette =['d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850']
var vis = {min: 0.1, max: 0.8, palette: palette};
var textStyle = {
  color: 'grey',
  fontName: 'arial',
  fontSize: 10,
  bold: false,
  italic: true,
}
var middlePanel = ui.Panel({style:{height: '600px', width: '400px', position: 'middle-right'}});
function getStatistics(){
  var feature = getfeature();
  print(feature);
   var CHIRPS_mean=CHIRPS.sum().clip(feature).reduceRegion({
  reducer:ee.Reducer.mean(), geometry:feature, scale:2000,maxPixels:1e13}).get('precipitation').getInfo();
  print(CHIRPS_mean)
  // var GPM_mean=GPM.clip(feature).reduceRegion({
  // reducer:ee.Reducer.mean(), geometry:feature, scale:2000,maxPixels:1e13}).get('HQprecipitation').getInfo();
  // print(GPM_mean)
  var LST_min=Landsat_coll.min().clip(feature).reduceRegion({
    reducer:ee.Reducer.mean(), geometry:feature, scale:30,maxPixels:1e13}).get('ST_B10').getInfo().toFixed(2);
  var LST_max=Landsat_coll.max().clip(feature).reduceRegion({
    reducer:ee.Reducer.mean(), geometry:feature, scale:30,maxPixels:1e13}).get('ST_B10').getInfo().toFixed(2);
  var LST_mean=Landsat_coll.mean().clip(feature).reduceRegion({
    reducer:ee.Reducer.mean(), geometry:feature, scale:30,maxPixels:1e13}).get('ST_B10').getInfo().toFixed(2);
  print(LST_min,LST_max,LST_mean)
  middlePanel.add(ui.Label('Khasra No : '+feature.first().get('Khasra_no').getInfo(),
  {margin: '10px 0 0 10px',fontSize: '14px',color: 'black', fontWeight: 'bold'}))
  // middlePanel.add(ui.Label('Total Precipitation ['+ee.Date(CHIRPS_dates.get(0)).format('YYYY-MM-dd').getInfo()+
  //                       ' '+ee.Date(CHIRPS_dates.get(-1)).format('YYYY-MM-dd').getInfo()+'] : '+CHIRPS_mean+' mm',
  // {margin: '20px 0 0 10px',fontSize: '12px',color: 'black', fontWeight: 'bold'}))
  var feature1=ee.Feature(null).set('Rainfall cumulative (mm)',CHIRPS_mean)
                              // .set('Rainfall GPM (mm)',GPM_mean)
                              .set('LST min (°C)',LST_min)
                              .set('LST max (°C)',LST_max).set('LST mean (°C)',LST_mean);
  var tableData = [[{label: 'Parameters', role: 'domain', type: 'string'},
    {label: 'Value', role: 'data', type: 'number'}],
    ['Rainfall cumulative (mm)',CHIRPS_mean],
    ['LST min (°C)',LST_min],
    ['LST mean (°C)',LST_mean],
    ['LST max (°C)',LST_max]];
  // var properties = feature1.getInfo().properties; 
  // for (var key in properties) {
  //   tableData.push([key, properties[key]]);
  //   }
  var chart_Prameters = ui.Chart(tableData, 'Table').setChartType('Table')
    .setOptions({
      format : '#.##',
      width: 200,
      height: 150,
      allowHtml: true,
      // tableCell: {'textAlign': 'center'},
    });
  middlePanel.add(chart_Prameters);
  Map.addLayer(feature,{},'features',true)
  Map.addLayer(coll.select('NDVI').max().clip(feature),vis,'Max_NDVI');
  var Farm_coll=coll.map(function(img){
  var mean=img.clip(feature).reduceRegion({
  reducer:ee.Reducer.mean(), geometry:feature, scale:10,maxPixels:1e13})
  return img.set('NDVI',mean.get('NDVI')).set('LSWI',mean.get('LSWI'))
            .set('NDRE',mean.get('NDRE')) 
  })
    // Map over the image collection and create a feature for each image
  var Farm_feature = Farm_coll.map(function(image) {
    var properties = image.toDictionary();
    return ee.Feature(null, properties);
  });
  // Create a table chart from the feature collection
  var Table = ui.Chart.feature.byFeature({features:Farm_feature,xProperty:'date',yProperties:['NDVI','LSWI','NDRE']})
    .setChartType('Table')
    .setOptions({
      title: 'Crop Health',
      width: 300,
      height: 300,
      allowHtml: true,
      pageSize:30,
      // tableCell: {'textAlign': 'center'},
    });
  middlePanel.add(Table);
}
var ProvideInputs1 = ui.Label({value:'2. Select a Village',
style: {fontSize: '18px', fontWeight: 'bold'}});
panel.add(ProvideInputs1).add(shapefileDropdown)