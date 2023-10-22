var roi = /* color: #d63000 */ee.Geometry.Point([-73.53176858027297, 40.77767871376542]);
//define cloud mask function aim at Landsat8.
var maskL8 = function(image) {
  var qa = image.select('BQA');
  /// Check that the cloud bit is off.
  // See https://landsat.usgs.gov/collectionqualityband
  var mask = qa.bitwiseAnd(1 << 4).eq(0);
  return image.updateMask(mask);
}
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
var rawCol = l8.filterDate("2013-1-1", "2018-12-31")
               .filterBounds(roi)
               .map(maskL8);
//method 3
var rawLayer = null;
var computedIds = rawCol.reduceColumns(ee.Reducer.toList(), ['system:index'])
                        .get('list');
computedIds.evaluate(function(ids) {
  print("computedIds ", ids);
  var total = ids.length;
  var showTitle = ui.Label("", {fontWeight: 'bold'});
  var curIndex = 0;
  var bPlus = ui.Button("+", function() {
    curIndex += 1;
    if (curIndex >= total) {
      curIndex = 0;
    }
    showTitle.setValue(ids[curIndex]);
    showSelectRawImage(ids[curIndex]);
  });
  var bReduce = ui.Button("-", function() {
    curIndex -= 1;
    if (curIndex < 0) {
      curIndex = total - 1;
    }
    showTitle.setValue(ids[curIndex]);
    showSelectRawImage(ids[curIndex]);
  });
  showTitle.setValue(ids[curIndex]);
  showSelectRawImage(ids[curIndex]);
  var main = ui.Panel({
    widgets: [
      ui.Label('click "+" or "-" to move time window', {fontWeight: 'bold'}),
      bPlus, bReduce,
      ui.Label("select date: ", {fontWeight: 'bold'}),
      showTitle
    ],
    style: {width: '200px', padding: '8px'}
  });
  ui.root.insert(0, main);
});
function showSelectRawImage(key) {
  if (rawLayer !== null) {
    Map.remove(rawLayer);
  }
  print("show raw image id is: " + key);
  var image = ee.Image(rawCol.filter(ee.Filter.eq("system:index", key)).first());
  rawLayer = Map.addLayer(image, {bands:["B5", "B4", "B3"], min:0, max:0.3}, key);
}
Map.centerObject(roi, 7);