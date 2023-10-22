var image = ui.import && ui.import("image", "image", {
      "id": "users/craigds/open/nrscLULC"
    }) || ee.Image("users/craigds/open/nrscLULC"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/slyfox6969/UP_subdistmod"
    }) || ee.FeatureCollection("users/slyfox6969/UP_subdistmod");
//////////////////////////////////////////
/*Created by Souvik Sankar Mitra, Research Scientist, Indian Institute of Remote Sensing*/
//////////////////////////////////////////////////////////
var visTp = {
  min: 1,
  max: 18,
  palette: ['#000080', '#0000D9', '#4000FF', '#8000FF', '#0080FF', '#00FFFF', '#00FF80',
    '#80FF00', '#DAFF00', '#FFFF00', '#FFF500', '#FFDA00', '#FFB000', '#FFA400',
    '#FF4F00', '#FF2500', '#FF0A00', '#FF00FF']
};
var palette =  ['000080', '0000D9', '4000FF', '8000FF', '0080FF', '00FFFF', '00FF80',
    '80FF00', 'DAFF00', 'FFFF00', 'FFF500', 'FFDA00', 'FFB000', 'FFA400',
    'FF4F00', 'FF2500', 'FF0A00', 'FF00FF']
var names = ['Build Up','Kharif Crop','Rabi Crop','Zaid Crop','Double Crop','Current Fallow','Plantation','Evergreen Forest','Decidious Forest','Degraded Forest','Swamp','GrassLand','Shifting Cultivation','WasteLand','Rann','Waterbody Max','Waterbody Min','Snow Cover']
image = image.clip(table)
var first = ee.List([]);
var first1 = ee.List([]);
// print(image.reduceRegion({
//       reducer: ee.Reducer.max(),
//       geometry: table,
//       scale : 1000
//       }))
// var getCentroid = function(feature) {
//   var centroid = feature.geometry().centroid();
//   return ee.Feature(centroid);
// };
var ite=[{label: 'BuildUp', value: '1'},
    {label: 'Kharif Crop', value: '2'},{label: 'Rabi Crop', value: '3'},
    {label: 'Zaid Crop', value: '4'},{label: 'Double Crop', value: '5'},
    {label: 'Currebnt Fallow', value: '6'},{label: 'Plantation', value: '7'},
    {label: 'Evergreen Forest', value: '8'},{label: 'Decidious Forest', value: '9'},
    {label: 'Degraded Forest', value: '10'},{label: 'Swamp', value: '11'},
    {label: 'GrassLand', value: '12'},{label: 'Shifting Cultivation', value: '13'},
    {label: 'WasteLand', value: '14'},{label: 'Rann', value: '15'},
    {label: 'Waterbody Max', value: '16'},{label: 'Waterbody Min', value: '17'},
    {label: 'Snow Cover', value: '18'}]
//var ite1=[1,2,3]
var area = function (feature){return feature.set('mona',image.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: feature.geometry(),
      scale : 1000
      }).get('LULC'))}
var inspector = ui.Panel([ui.Label('NAME')]); 
inspector.style().set({
  width: '100px',
  position: 'bottom-center'
});
Map.add(inspector);
var panel = ui.Panel();
panel.style().set({
  width: '600px',
  position: 'bottom-right'
});
Map.add(panel);
var inspector1 = ui.Panel([ui.Label('AREA')]); 
inspector1.style().set({
  position: 'bottom-center'
});
Map.add(inspector1);
var select = ui.Select({
  items: ite,
  onChange:function()
  {
    panel.clear();
    first = first.removeAll(first);
    first1 = first1.removeAll(first1);
  }
});
select.style().set({
  width: '300px',
  position: 'top-center'
});
select.setPlaceholder('Choose a Class and click on subdistricts ..');
Map.add(select)
Map.onClick(function (coords) {
  panel.clear();
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  inspector1.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  var click_point = ee.FeatureCollection(ee.Feature(ee.Geometry.Point(coords.lon, coords.lat),{name: 'Voronoi'}));
  var spatialFilter = ee.Filter.intersects({
  leftField: '.geo',
  rightField: '.geo',
  maxError: 10
});
var saveAllJoin = ee.Join.saveAll({
  matchesKey: 'district',
});
var intersectJoined = saveAllJoin.apply(table, click_point, spatialFilter); 
var image1 = image.clip(intersectJoined)
var name1 = intersectJoined.first().get("NAME_3")
first = first.add(name1)
print (first)
var stats1 = image1.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: intersectJoined,
  scale: 30,
  maxPixels: 1e9
});
var stats = image1.updateMask(image.eq(ee.Number.parse(select.getValue()))).reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: intersectJoined,
  scale: 30,
  maxPixels: 1e9
});
var are1 = intersectJoined.geometry().area().divide(1000 * 1000);
var urban1 = stats1.get("LULC")  
var urban = stats.get("LULC")  
first1 = first1.add(ee.Number(urban).divide(ee.Number(urban1)).multiply(100))
print (first1)
//print (urban1)
//print (urban)
var chart = ui.Chart.array.values(first1, 0, first).setChartType('ColumnChart').setOptions({
      title: 'Comparison of presence of LULC',
      hAxis: {'title': 'Subdistrict'},
      vAxis: {'title': 'Pixel Density (in percentage)'},
});
// var chart = ui.Chart.image.byClass(
//     image1, 'remapped', intersectJoined, ee.Reducer.sum(), 30)
// // Print the chart.
//print(chart);
panel.add(chart);
are1.evaluate(function(result) { 
inspector1.widgets().set(0, ui.Label({
    value: "Area = "+result + "km2" ,
    style: {color: 'green'}
  }));
});
 name1.evaluate(function(result) { 
   Map.addLayer(image1,visTp,result)
 inspector.widgets().set(0, ui.Label({
    value: result,
    style: {color: 'green'}
  }));
});
});
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'NRSC Land Use Land Cover',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
// legend.add(loading);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < palette.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '310px'
  }
});
var text7 = ui.Label('Developed by Souvik Sankar Mitra Research Scientist, Geoinformatics Department, Indian Institute of Remote Sensing', textVis)
results.add(ui.Panel([text7]
      ));
Map.add(results);
var men = table.map(area)
// var men1=table.map(getCentroid)
//Map.addLayer(image,visTp,"LULC");
Map.addLayer(men);
Map.add(legend);
//Map.addLayer(men1);
Map.setCenter(80.116, 27.31,7)
//print (men)
// print (men1)