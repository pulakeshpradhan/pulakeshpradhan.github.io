var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "T20220227_4"
        ],
        "min": 2,
        "max": 2,
        "palette": [
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["T20220227_4"],"min":2,"max":2,"palette":["ff0000"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.MultiPoint();
var aoi = ee.Geometry.Polygon(
        [[[47.31227254462866, -22.751275285188523],
          [47.31227254462866, -23.350239392749472],
          [47.93300008369116, -23.350239392749472],
          [47.93300008369116, -22.751275285188523]]], null, false);
Map.setCenter(47.60522, -23.33118, 13);
var SARchanges = ee.Image('projects/ee-jackreid/assets/madagascar/cmaps');
var timestamps = ee.List(SARchanges.bandNames())
            .removeAll(['cmap', 'smap', 'fmap','cumulative', 'roadImpact'])
            .sort();
var SARvis = {"opacity":1,"min":0, "max":1,"palette":["000000","04fff2"]};
var roadImpactVis = {"opacity":1,"min":0,"max":2,"palette":["ff0000"]};
var roadImpact = SARchanges.select('roadImpact');
var bandSequence = ee.List.sequence(0,timestamps.length().subtract(1));
var floodingList = ee.List(timestamps.map(function(timestamp){
  var flooding = SARchanges.select(ee.String(timestamp)).eq(2);
  return flooding.updateMask(flooding.gt(0));
  }));
var cumulativeFlooding = SARchanges.select('cumulative');
cumulativeFlooding = cumulativeFlooding.updateMask(cumulativeFlooding.gt(0));
var ndviChanges = ee.Image('projects/ee-jackreid/assets/madagascar/ndvi'); 
var preNDVI = ndviChanges.select('preNDVI').rename('Pre Cyclone NVDI');
var postNDVI = ndviChanges.select('postNDVI').rename('Post Cyclone NDVI');
var diffNDVI = ndviChanges.select('diffNDVI').rename('NDVI Change');
var NDVIvis = {"opacity":1,"min":-0.5, "max":0.5,"palette":["ff0000","000000","02ff38"]};
var layerList = floodingList
                  .add(roadImpact)
                  .add(cumulativeFlooding)
                  .add(preNDVI)
                  .add(postNDVI)
                  .add(diffNDVI);
var vizSequence = ee.List(bandSequence).map(function(count){return ee.Dictionary(SARvis)});
var vizList = vizSequence
              .add(ee.Dictionary(roadImpactVis))
              .add(ee.Dictionary(SARvis))
              .add(ee.Dictionary(NDVIvis))
              .add(ee.Dictionary(NDVIvis))
              .add(ee.Dictionary(NDVIvis));
var dictKeys = timestamps
                .add('Road Impact')
                .add('cumulative')
                .add('Pre Cyclone NVDI')
                .add('Post Cyclone NDVI')
                .add('NDVI Change');
var layerDict = ee.Dictionary.fromLists(dictKeys, layerList);
var vizDict = ee.Dictionary.fromLists(dictKeys, vizList);
var typeDict = ee.Dictionary({'sarDate' : timestamps,
                'sarRoads': ee.List(['Road Impact']),
                'sarCumulative' : ee.List(['cumulative']),
                'NDVI' : ee.List(['Pre Cyclone NVDI', 'Post Cyclone NDVI','NDVI Change'])
});
var titleLabel = ui.Label('Cyclone Impacts in SE Madagascar');
titleLabel.style().set('color', '45a359');
titleLabel.style().set('fontWeight', 'bold');
titleLabel.style().set({
  fontSize: '32px',
  padding: '10px'
});
var startDate = ee.String(timestamps.get(0)).slice(1);
var endDate = ee.String(timestamps.get(-1)).slice(1);
var infoText = ee.String('This tool shows various impacts due to a cyclone impact on SE Madagascar, roughly stretching from the Mananara River to Farafagana.')
              .cat(ee.String(' It is currently showing data for the period of '))
              .cat(startDate.slice(0,4))
              .cat('-')
              .cat(startDate.slice(4,6))
              .cat('-')
              .cat(startDate.slice(6))
              .cat(' to ')
                .cat(endDate.slice(0,4))
              .cat('-')
              .cat(endDate.slice(4,6))
              .cat('-')
              .cat(endDate.slice(6))
              .cat('.');
var infoLabel = ui.Label(infoText.getInfo());
infoLabel.style().set('color', 'black');
infoLabel.style().set('fontWeight', 'normal');
infoLabel.style().set({
  fontSize: '12px',
  // padding: '2px'
});
var borderLabel = ui.Label('_______________________________');
borderLabel.style().set('color', '45a359');
borderLabel.style().set('fontWeight', 'normal');
borderLabel.style().set({
  fontSize: '32px',
  // padding: '10px'
});
var borderLabel2 = ui.Label('_______________________________');
borderLabel2.style().set('color', '45a359');
borderLabel2.style().set('fontWeight', 'normal');
borderLabel2.style().set({
  fontSize: '32px',
  // padding: '10px'
});
var borderLabel3 = ui.Label('_______________________________');
borderLabel2.style().set('color', '45a359');
borderLabel2.style().set('fontWeight', 'normal');
borderLabel2.style().set({
  fontSize: '32px',
  // padding: '10px'
});
var layerLabel = ui.Label('Layers');
var layerSelect = ui.Select({
  placeholder: 'Select a layer',
  onChange: function(value) {
    var layer = ui.Map.Layer(ee.Image(layerDict.get(value)),vizDict.get(value).getInfo(),value);
    // Use set() instead of add() so the previous layer (if any) is overwritten.
    Map.layers().set(0, layer);
  }
});
var typeLabel = ui.Label('Type of Impact');
var typeSelect = ui.Select({
  placeholder: 'Select a layer',
  items: [
    {label: 'Potential Flooding by Date', value: 'sarDate'},
    {label: 'Potential Flooding of Roads', value: 'sarRoads'},
    {label: 'Cumulative Potential Flooding', value: 'sarCumulative'},
    {label: 'NDVI', value: 'NDVI'}
  ],
  onChange: function(value) {
    typeDict.get(value).evaluate(function(layers){
      layerSelect.items().reset(layers);
      layerSelect.setValue(layerSelect.items().get(0));
    });
  }
});
// var button = ui.Button({
//   label: 'Export Current Map to Google Drive',
//   onClick: function() {
//       Export.image.toDrive({
//       image: ee.Image(layerDict.get(layerSelect.getValue())),
//       description: 'exportMap',
//       region: aoi,
//       maxPixels: 1e13
//       });
//   }
// });
// var center = Map.getCenter();
// var bounds = Map.getBounds();
// print(bounds)
// var boundsGeo = ee.Geometry.Polygon(
//         [[[bounds[0], bounds[1]],
//           [bounds[0], bounds[3]],
//           [bounds[2], bounds[3]],
//           [bounds[2], bounds[1]]]], null, false);
// Map.addLayer(boundsGeo);
var exportImage = function(){
  var center = Map.getCenter();
  var bounds = Map.getBounds();
  var boundsGeo = ee.Geometry.Polygon(
        [[[bounds[0], bounds[1]],
          [bounds[0], bounds[3]],
          [bounds[2], bounds[3]],
          [bounds[2], bounds[1]]]], null, false);
  var empty = ee.Image().byte();
  var exportImage = ee.Image(layerDict.get(layerSelect.getValue()));
  var url = exportImage.getThumbURL({
    // scale:0.3,
    region: boundsGeo
  });
  urlLabel.setUrl(url);
  urlLabel.style().set({shown: true});
};
var button = ui.Button("Crop Image",exportImage);
var urlLabel = ui.Label('Download cropped image', {shown: false});
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '600px', position: 'middle-right'}})
  .add(titleLabel)
  .add(infoLabel)
  .add(borderLabel)
  .add(typeLabel)
  .add(typeSelect)
  .add(borderLabel2)
  .add(layerLabel)
  .add(layerSelect)
  .add(borderLabel3)
  .add(button)
  .add(urlLabel);
ui.root.add(panel);