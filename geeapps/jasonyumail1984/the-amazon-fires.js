/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var amasonia = ee.FeatureCollection("users/wangweihappy0/amazing/Amazonia"),
    firms = ee.ImageCollection("FIRMS"),
    s5NO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
///////////////////////////// data  ///////////////////////////// 
var area = ee.FeatureCollection(amasonia);
var fire2019 = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-08-01', '2019-09-30')).filterBounds(area).select('T21').max();
var fire2018 = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-07-01', '2019-08-31')).filterBounds(area).select('T21').max();
var layerProperties = {
  'Fire 2019': {
    name: 'Fire',
    selectedImage: fire2019,
    visParams: {min: 50+273, max: 90+273, palette: ['fff70b','ff641b','ff0000'],},
    defaultVisibility: true
  },
  'Fire 2018': {
    name: 'Fire',
    selectedImage: fire2018,
       visParams: {min: 50+273, max: 90+273, palette: ['fff70b','ff641b','ff0000'],},
    defaultVisibility: true
  },
};
// Create map panels.
var map2019 = ui.Map({style: {width: '65%'}});
setupMap(map2019, ' After the Fire (2019.9)', 'top-right');
var map2018 = ui.Map();
setupMap(map2018, ' Before the Fire (2019.8)', 'top-left');
function setupMap(map, labelTxt, position) {
  map.setControlVisibility(false);
  map.setCenter(-54.363, -10.764,5.5);
  // map.setControlVisibility({zoomControl: true});
    // map.setControlVisibility({mapTypeControl: true});
  // map.setOptions('terrain');
  // map.setOptions('hybrid');
  map.setOptions('satellite');
  var label = ui.Label(labelTxt);
  var labelPanel =ui.Panel({
        widgets: [label], 
        style: {position: position, padding: '0'}});
  map.add(labelPanel);
}
var splitPanel = ui.SplitPanel({
  firstPanel: map2018,
  secondPanel: map2019,
  wipe: true,
  style: {stretch: 'both'}
});
var linker = ui.Map.Linker([map2018, map2019]);
var fireLayer2019 = layerProperties['Fire 2019'];
var fireImg2019 = fireLayer2019.selectedImage
  .visualize(fireLayer2019.visParams);
map2019.add(
  ui.Map.Layer(
  fireImg2019, {}, 'Fire 2019', fireLayer2019.defaultVisibility));
var fireLayer2018 = layerProperties['Fire 2018'];
var fireImg2018 = fireLayer2018.selectedImage
    .visualize(fireLayer2018.visParams);
map2018.add(
  ui.Map.Layer(
    fireImg2018, {}, 'Fire 2018', fireLayer2018.defaultVisibility));
///////////////////////////// on click map2019///////////////////////////// 
map2019.onClick(function(coords) {
chartPanel.clear()
compChart.clear()
  // Add a red dot for the point clicked on.
  var bufferPoly = function(feature) {
  return feature.buffer(100);   // substitute in your value of Z here
};
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var box=ee.Geometry.Rectangle(coords.lon-1.5, coords.lat-1, coords.lon+1.5, coords.lat+1);
  var pointfea=ee.FeatureCollection(box);
  var bb = ee.FeatureCollection(point).map(bufferPoly);
  var boxb = ee.Image().toByte().paint(
                 {featureCollection: pointfea,
                 color: null, 
                 width: 2});
// map2019.addLayer(boxb, {palette: "blue"}, "bigbox"); 
// print(bb)
///////////////////////////// NO2 anomation ///////////////////////////// 
var startDate = "2019-02-01";
var endDate = "2019-10-01";
var no2Imgs = s5NO2.filterDate(startDate, endDate)
                   .filterBounds(pointfea)
                   .select("NO2_column_number_density")
                   .map(function(image) {
                     var date = ee.Date(image.get("system:time_start")).format("yyyyMM");
                     image = image.set("date", date);
                     return image;
                   });
var join = ee.Join.saveAll("matches");
var filter = ee.Filter.equals({
  leftField: "date",
  rightField: "date" 
});
var joinResult = join.apply(no2Imgs.distinct("date"), no2Imgs, filter);
var joinNO2Imgs = joinResult.map(function(image) {
  image = ee.Image(image);
  var matches = ee.List(image.get("matches"));
  var img = ee.ImageCollection.fromImages(matches)
              .max()
              .clip(pointfea);
  img = img.set("date", image.get("date"));
  return img;
});
joinNO2Imgs = ee.ImageCollection(joinNO2Imgs);
var params = {
  crs: "EPSG:3857",
  framesPerSecond: 1,
  region: pointfea.geometry(),
  min: 0,
  max: 0.0004,
  palette: ["black", "Navy", "cyan", "green", "yellow", "red"],
  dimensions: 360,
};
var anomation=ui.Thumbnail(joinNO2Imgs, params)
// print(anomation)
chartPanel.widgets().set(1, anomation);
var note2= ui.Label(  'Carbon dioxide change (2019.2-2019.10)', {fontSize: '10px', color: 'Black'});
chartPanel.widgets().set(2, note2);
///////////////////////////// chart1 ///////////////////////////// 
joinNO2Imgs = joinNO2Imgs.map(function(image) {
  var dict = image.reduceRegion({
                    reducer: ee.Reducer.mean(),
                    geometry: bb.geometry().bounds(),
                    scale: 1000,
                    maxPixels: 1e13,
                    tileScale: 16
                  });
  var value = ee.Number(dict.get("NO2_column_number_density"));
  return image.set("no2", value);
});
var datas = joinNO2Imgs.reduceColumns(ee.Reducer.toList(2), ["date", "no2"]).get("list");
datas.evaluate(function(dList) {
  var yValues = [];
  var xValues = [];
  for (var i=0; i<dList.length; i++) {
    var data = dList[i];
    xValues.push(data[0]);
    yValues.push(data[1] * 1000);
  }
  var chart1 = ui.Chart.array.values(ee.List(yValues), 0, ee.List(xValues))
                .setSeriesNames(["NO2"])
                .setOptions({
                  title: "NO2 Change (2019.2-2019.9)", 
                  hAxis: {title: "Data"},
                  vAxis: {title: "NO2 Density*1000(mol/m^2)"},
                  legend: null,
                  lineWidth:1,
                  pointSize:2
                });
  // print(chart);
chartPanel.widgets().set(3, chart1);
});
///////////////////////////// chart2 ///////////////////////////// 
var imgs = firms.filterDate('2019-08-01', '2019-09-01')
                .select("T21")
                .map(function(image) {
                  var time_start = image.get("system:time_start");
                  image = image.subtract(273.15);
                  image = image.set("system:time_start", time_start);
                  image = image.set("date", ee.Date(time_start).format("yyyy-MM-dd"));
                  return image.clip(pointfea);
                })
                .sort('system:time_start');
var amazoniaArea = pointfea.geometry().area().divide(1000000);
imgs = imgs.map(function(image) {
  var areaDict = ee.Image.pixelArea()
                  .updateMask(image.gte(40))
                  .reduceRegion({
                    reducer: ee.Reducer.sum(),
                    geometry: pointfea.geometry().bounds(),
                    scale: 1000,
                    maxPixels: 1e13,
                    tileScale: 16
                  });
  var fireArea = ee.Number(areaDict.get("area")).divide(1000000);
  image = image.set("area", fireArea);
  return image;
});
var dataList = imgs.reduceColumns(ee.Reducer.toList(2), ["area", "date"]).get("list");
dataList.evaluate(function(dList) {
  print("data list is", dList);
  var fireArea = [];
  var xValues = [];
  for (var i=0; i<dList.length; i++) {
    var data = dList[i];
    fireArea.push(data[0]);
    xValues.push(data[1]);
  }
  var chart2 = ui.Chart.array.values(ee.List(fireArea), 0, ee.List(xValues))
                .setSeriesNames(["area"])
                .setOptions({
                  title: "Burned Area (2019.8.1-2019.8.31)", 
                  hAxis: {title: "Date"},
                  vAxis: {title: "Bured Area(km^2)"},
                  legend: null,
                  lineWidth:1,
                  pointSize:2
                });                
chartPanel.widgets().set(4, chart2);
});
});
///////////////////////////// on click map2018///////////////////////////// 
map2018.onClick(function(coords) {
chartPanel.clear()
compChart.clear()
  // Add a red dot for the point clicked on.
  var bufferPoly = function(feature) {
  return feature.buffer(100);   // substitute in your value of Z here
};
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var box=ee.Geometry.Rectangle(coords.lon-1.5, coords.lat-1, coords.lon+1.5, coords.lat+1);
  var pointfea=ee.FeatureCollection(box);
  var bb = ee.FeatureCollection(point).map(bufferPoly);
  var boxb = ee.Image().toByte().paint(
                 {featureCollection: pointfea,
                 color: null, 
                 width: 2});
// map2018.addLayer(boxb, {palette: "blue"}, "bigbox"); 
// print(bb)
///////////////////////////// NO2 anomation ///////////////////////////// 
var s5NO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2");
var startDate = "2019-02-01";
var endDate = "2019-10-01";
var no2Imgs = s5NO2.filterDate(startDate, endDate)
                   .filterBounds(pointfea)
                   .select("NO2_column_number_density")
                   .map(function(image) {
                     var date = ee.Date(image.get("system:time_start")).format("yyyyMM");
                     image = image.set("date", date);
                     return image;
                   });
var join = ee.Join.saveAll("matches");
var filter = ee.Filter.equals({
  leftField: "date",
  rightField: "date" 
});
var joinResult = join.apply(no2Imgs.distinct("date"), no2Imgs, filter);
var joinNO2Imgs = joinResult.map(function(image) {
  image = ee.Image(image);
  var matches = ee.List(image.get("matches"));
  var img = ee.ImageCollection.fromImages(matches)
              .max()
              .clip(pointfea);
  img = img.set("date", image.get("date"));
  return img;
});
joinNO2Imgs = ee.ImageCollection(joinNO2Imgs);
var params = {
  crs: "EPSG:3857",
  framesPerSecond: 1,
  region: pointfea.geometry(),
  min: 0,
  max: 0.0004,
  palette: ["black", "Navy", "cyan", "green", "yellow", "red"],
  dimensions: 360,
};
var anomation=ui.Thumbnail(joinNO2Imgs, params)
// print(anomation)
chartPanel.widgets().set(1, anomation);
var note2= ui.Label(  'Carbon dioxide change (2019.2-2019.10)', {fontSize: '10px', color: 'Black'});
chartPanel.widgets().set(2, note2);
///////////////////////////// chart1 ///////////////////////////// 
joinNO2Imgs = joinNO2Imgs.map(function(image) {
  var dict = image.reduceRegion({
                    reducer: ee.Reducer.mean(),
                    geometry: bb.geometry().bounds(),
                    scale: 1000,
                    maxPixels: 1e13,
                    tileScale: 16
                  });
  var value = ee.Number(dict.get("NO2_column_number_density"));
  return image.set("no2", value);
});
var datas = joinNO2Imgs.reduceColumns(ee.Reducer.toList(2), ["date", "no2"]).get("list");
datas.evaluate(function(dList) {
  var yValues = [];
  var xValues = [];
  for (var i=0; i<dList.length; i++) {
    var data = dList[i];
    xValues.push(data[0]);
    yValues.push(data[1] * 1000);
  }
  var chart1 = ui.Chart.array.values(ee.List(yValues), 0, ee.List(xValues))
                .setSeriesNames(["NO2"])
                .setOptions({
                  title: "NO2 Change (2019.2-2019.9)", 
                  hAxis: {title: "Data"},
                  vAxis: {title: "NO2 Density*1000(mol/m^2)"},
                  legend: null,
                  lineWidth:1,
                  pointSize:2
                });
  // print(chart);
chartPanel.widgets().set(3, chart1);
});
///////////////////////////// chart2 ///////////////////////////// 
var imgs = firms.filterDate('2019-08-01', '2019-09-01')
                .select("T21")
                .map(function(image) {
                  var time_start = image.get("system:time_start");
                  image = image.subtract(273.15);
                  image = image.set("system:time_start", time_start);
                  image = image.set("date", ee.Date(time_start).format("yyyy-MM-dd"));
                  return image.clip(pointfea);
                })
                .sort('system:time_start');
var amazoniaArea = pointfea.geometry().area().divide(1000000);
imgs = imgs.map(function(image) {
  var areaDict = ee.Image.pixelArea()
                  .updateMask(image.gte(40))
                  .reduceRegion({
                    reducer: ee.Reducer.sum(),
                    geometry: pointfea.geometry().bounds(),
                    scale: 1000,
                    maxPixels: 1e13,
                    tileScale: 16
                  });
  var fireArea = ee.Number(areaDict.get("area")).divide(1000000);
  image = image.set("area", fireArea);
  return image;
});
var dataList = imgs.reduceColumns(ee.Reducer.toList(2), ["area", "date"]).get("list");
dataList.evaluate(function(dList) {
  print("data list is", dList);
  var fireArea = [];
  var xValues = [];
  for (var i=0; i<dList.length; i++) {
    var data = dList[i];
    fireArea.push(data[0]);
    xValues.push(data[1]);
  }
  var chart2 = ui.Chart.array.values(ee.List(fireArea), 0, ee.List(xValues))
                .setSeriesNames(["area"])
                .setOptions({
                  title: "Burned Area (2019.8.1-2019.8.31)", 
                  hAxis: {title: "Date"},
                  vAxis: {title: "Bured Area(km^2)"},
                  legend: null,
                  lineWidth:1,
                  pointSize:2
                });                
chartPanel.widgets().set(4, chart2);
});
});
///////////////////////////// main panel ///////////////////////////// 
// Create legend 
var legend = ui.Panel({style: {
    position: 'bottom-left',
    padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Tempreture Classes',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var palette =['fff70b','ff641b','ff0000'];
var names = ['low-200','medium-300','hight-400'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// concate items  
var linkPanel = ui.Panel(
  [ui.Label('References', {fontSize: '15px',})]);
var sourceCode1 = ui.Label(
  'BURN SEVERITY MAPPING USING THE NORMALIZED BURN RATIO (NBR)-NASA.', {fontSize: '5px'},
  'https://arset.gsfc.nasa.gov/wildfires/webinars/intro-wildfire-applications');
var sourceCode2 = ui.Label(  '亞馬遜雨林的悲歌- Joanna Lin.', {fontSize: '5px'},
  'https://chiayilin94.users.earthengine.app/view/amazon-fire');
var sourceCode3=ui.Label('Using the Google Earth Engine (GEE) for Detection of Burned Areas- Alexander Karpov.', {fontSize: '5px'},
  'http://www.digital-geography.com/description-code-article-using-google-earth-engine-gee-detection-burned-areas/');
var sourceCode4=ui.Label( '第三期全国地球空间大数据与云计算研讨会教程-李世卫', {fontSize: '5px'},
  'https://blog.csdn.net/shi_weihappy');
var header = ui.Label('The Amazon Fires');
header.style().set('color', 'Green');
header.style().set('fontWeight', 'bold');
header.style().set({fontSize: '28px', padding: '4px'});
var note= ui.Label(  'Click on the fire location to check the changes in the Amazon rainforest before and after the wildfire.', {fontSize: '20px', color: 'Black'});
note.style().set('fontWeight', 'bold');
var toolPanel = ui.Panel( [header], 'flow', {width: '25%'});
toolPanel.add(note);
var anomation = ui.Panel({style: {stretch: "horizontal"}});
toolPanel.add(anomation);
var compChart = ui.Panel({style: {stretch: "vertical"}});
toolPanel.add(compChart)
var chartPanel = ui.Panel({style: {stretch: "horizontal"}});
toolPanel.add(chartPanel);
toolPanel.add(linkPanel);
toolPanel.add(sourceCode1);
toolPanel.add(sourceCode2);
toolPanel.add(sourceCode3);
toolPanel.add(sourceCode4);
ui.root.clear();
ui.root.widgets().reset([splitPanel, toolPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
map2019.style().set("cursor","crosshair");
map2018.style().set("cursor","crosshair");
map2018.add(legend)