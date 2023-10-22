var slope = ui.import && ui.import("slope", "image", {
      "id": "projects/ee-tubagus/assets/Class_Slope"
    }) || ee.Image("projects/ee-tubagus/assets/Class_Slope"),
    ndwi = ui.import && ui.import("ndwi", "image", {
      "id": "projects/ee-tubagus/assets/Class_NDWI"
    }) || ee.Image("projects/ee-tubagus/assets/Class_NDWI"),
    ndvi = ui.import && ui.import("ndvi", "image", {
      "id": "projects/ee-tubagus/assets/Class_NDVI"
    }) || ee.Image("projects/ee-tubagus/assets/Class_NDVI"),
    ndbi = ui.import && ui.import("ndbi", "image", {
      "id": "projects/ee-tubagus/assets/Class_NDBI"
    }) || ee.Image("projects/ee-tubagus/assets/Class_NDBI"),
    aoi = ui.import && ui.import("aoi", "table", {
      "id": "projects/ee-tubagus/assets/AreaKajian_Fix"
    }) || ee.FeatureCollection("projects/ee-tubagus/assets/AreaKajian_Fix"),
    constraint = ui.import && ui.import("constraint", "image", {
      "id": "projects/ee-tubagus/assets/Area_Terbatas"
    }) || ee.Image("projects/ee-tubagus/assets/Area_Terbatas");
var pembobotan = (ee.Image(0)
              .add(slope.multiply(0.35))
              .add(ndwi.multiply(0.20))
              .add(ndvi.multiply(0.25))
              .add(ndbi.multiply(0.20)))
              .multiply(constraint)
print(pembobotan)
var SMCE = ee.Image(0)
          .where(pembobotan.eq(0), 0)
          .where(pembobotan.gt(0).and(pembobotan.lt(1.53)), 1)
          .where(pembobotan.gte(1.53).and(pembobotan.lt(2.06)), 2)
          .where(pembobotan.gte(2.06), 3)
Map.addLayer(SMCE.clip(aoi),{min: 0, max: 3, palette: ["0583d2",'orange','yellow','green']}, 'SMCE')
Map.centerObject(aoi)
var options = {
  lineWidth: 1,
  pointSize: 2,
  hAxis: {title: 'Kelas'},
  vAxis: {title: 'Luas (ha)'},
  title: 'Luas Area Berdasarkan Kelas',
  series: {
    0: { color: '0583d2'},
    1: { color: 'orange'},
    2: { color: 'yellow'},
    3: { color: 'green'},
  }
};
var areaChart = ui.Chart.image.byClass({
  image: ee.Image.pixelArea().divide(10000).addBands(SMCE),
  classBand: 'constant', 
  region: aoi,
  scale: 30,
  reducer: ee.Reducer.sum()
}).setOptions(options);
//Dashboard
Map.centerObject(aoi,12.5)
// Create legend title
var chartTitle = ui.Label({
value: 'Chart Luas Kelas',
style: {
fontWeight: 'bold',
margin: '4px 8px 8px 8px',
padding: '0'
}
});
var chart = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position:'bottom-left',border:'1px solid gray',padding:'1px',width:'380px'}
})
// Add the title to the panel
chart.add(chartTitle);
chart.add(areaChart)
Map.add(chart);
Map.add(ui.Label(
    'Peta Kesesuaian Lahan Permukiman Kec. Lembang', 
    {fontWeight: 'bold', fontSize: '20px'}));
var colors = ['37eb34', 'faf20c', 'e00438', '0583d2']
// Create legend title
var legendTitle = ui.Label({
value: 'Kelas Kesesuaian Lahan',
style: {
fontWeight: 'bold',
margin: '4px 8px 8px 8px',
padding: '0'
}
});
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position:'bottom-left',border:'1px solid gray',padding:'1px',width:'180px'}
})
// Add the title to the panel
legend.add(legendTitle);
// Legend creation
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 8px 0 0',
      }
  })
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 4px', fontSize: '12px'}
  })
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style: {margin:'0 0 8px 15px'}
  })
}
var names = ['Sesuai (S1)','Cukup Sesuai (S2)','Kurang Sesuai (S3)','Terbatas (N)']
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(colors[i], names[i]));
}
Map.add(legend);
var slopevis = {
  "min": 0, 
  "max": 3, 
  "palette":['ffffff','ff0000','f0ff0c','00ff1f']
};
Map.addLayer(slope.clip(aoi),slopevis,"Kemiringan Lereng",0)
var ndvivis = {
  "min": 0, 
  "max": 3, 
  "palette":['ffffff','ff0000','f0ff0c','00ff1f']
};
Map.addLayer(ndvi.clip(aoi),ndvivis,"NDVI",0)
var ndwivis = {
  "min": 0, 
  "max": 2, 
  "palette":['ffffff','ff0000','00ff1f']
};
Map.addLayer(ndwi.clip(aoi),ndwivis,"NDWI",0)
var ndbivis = {
  "min": 0, 
  "max": 2, 
  "palette":['ffffff','ff0000','00ff1f']
};
Map.addLayer(ndbi.clip(aoi),ndbivis, "NDBI",0)
var constraintvis = {
  "min": 0, 
  "max": 1, 
  "palette":['red','green']
};
Map.addLayer(constraint.clip(aoi),constraintvis,"Area Terbatas",0)