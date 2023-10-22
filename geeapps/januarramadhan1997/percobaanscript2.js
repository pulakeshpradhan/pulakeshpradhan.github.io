//Load data Shapefile
var jw = ee.FeatureCollection("projects/ee-januarramadhan1997/assets/Jawa_Bali_NTT_NTB");
var kl = ee.FeatureCollection("projects/ee-januarramadhan1997/assets/Kalimantan");
var pp = ee.FeatureCollection("projects/ee-januarramadhan1997/assets/Papua");
var su = ee.FeatureCollection("projects/ee-januarramadhan1997/assets/Sulawesi_Maluku");
var sm = ee.FeatureCollection("projects/ee-januarramadhan1997/assets/Sumatera");
var geometry = jw;
var image = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
.clip(geometry);
Map.centerObject(geometry,7);
var treeCover = image.select('treecover2000');
var lossImage = image.select('loss');
var gainImage = image.select('gain');
var lossyear = image.select('lossyear');
// add the tree cover layer in green
var forestcover = treeCover.updateMask(treeCover);
Map.addLayer(forestcover, {palette: ['000000','00FF00'], max: 100}, 'Forest')
// add the loss layer in red
var loss = lossImage.updateMask(lossImage);
Map.addLayer(loss, {palette: ['FF0000']}, 'Forest Loss')
// add the gain layer in blue
var gain = gainImage.updateMask(gainImage);
Map.addLayer(gain, {palette: ['0000FF']}, 'Forest Gain')
//making the chart
var years = ee.List.sequence(0,19)
var masking = years.map(function(a){
  var mask = image.eq(ee.Number(a)).selfMask()
  var h = mask.multiply(ee.Image.pixelArea())
  var cal = h.reduceRegion({
    reducer : ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e13
  })
  return mask.set('area',ee.Number(cal.get('lossyear')).multiply(0.0001))
             .set('year',ee.String(ee.Number(a).add(2000).toInt()))
})
var final_col = ee.ImageCollection.fromImages(masking);
var year2 = final_col.aggregate_array('year');
var area = final_col.aggregate_array('area');
var final_lists = ee.Dictionary.fromLists(year2,area);
//print(final_lists);
//chart
var chart = ui.Chart.array.values({
  array: final_lists.values(),
  axis: 0, 
  xLabels: final_lists.keys()
}).setChartType('ColumnChart')
// Set chart style properties.
var chartStyle = {
  title: 'Tree Loss per Year',
  hAxis: {
    title: 'Year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'}
  },
  vAxis: {
    title: 'Tree Loss',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'},
    format: 'short',
    baselineColor: '808080'
  },
  colors: ['ff331f'],
};
chart.setOptions(chartStyle);
Map.add(chart);
//create the title label
var title = ui.Label('Forest Change from 2000 to 2019');
title.style().set('position', 'top-center');
Map.add(title)
//add legend
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Forest Gain and Loss',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var palette = ['00FF00','FF0000','0000FF'];
var names = ['Forest','Forest Loss','Forest Gain'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
Map.add(legend)