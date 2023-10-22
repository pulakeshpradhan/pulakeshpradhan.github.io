var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -55.47102273766446,
                -11.848287036522432
              ],
              [
                -55.45737565819669,
                -11.846060973396796
              ],
              [
                -55.45741857354093,
                -11.844653924139413
              ],
              [
                -55.471172941369296,
                -11.846774995620983
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry.Polygon(
        [[[-55.47102273766446, -11.848287036522432],
          [-55.45737565819669, -11.846060973396796],
          [-55.45741857354093, -11.844653924139413],
          [-55.471172941369296, -11.846774995620983]]]);
var front_end = require('users/joberthgambati/timeSeries:front_end')
var base_data = require('users/joberthgambati/timeSeries:best_images_all_series_R2')
var geometry_data = require('users/joberthgambati/timeSeries:thumbnail_R3');
var front = front_end.create_panels()
base_data = ee.Dictionary(base_data.best_images_series(geometry, 100))
geometry_data = ee.Dictionary(geometry_data.geom_data_return(geometry))
print(base_data)
print(geometry_data)
front[2].centerObject(geometry)
front[2].addLayer(geometry)
//[imageDateListPanel, pngPanel, map]
//var listofImages = ee.ImageCollection(thumbnails.get('serieImagesList'))
//var listofImages = ee.ImageCollection(thumbnails.get('serieImagesList')).toList(ee.ImageCollection(thumbnails.get('serieImagesList')).size())
var listofNames = ee.Dictionary(base_data.get('SerieImagesNames')).values().flatten()
var listofDates = ee.Dictionary(base_data.get('SerieImagesDate')).values().flatten().getInfo()
print(listofNames)
print(listofDates)
var count = -1
function doNothing(time) {
  added++
  print("Doing Nothing")
  if (count == parseInt(time)) {
  ui.util.clearTimeout(doNothingFunc)}
  print("Doing Anything")    
}
var doNothingFunc = ui.util.setTimeout(doNothing(1), 10000)
var added = -1
function processBatch() {
         added++
         if (parseInt(added) < parseInt(listofDates.length)) {
          var date = new Date(listofDates[added])
          var year = date.getFullYear()
          var month = date.getMonth() + 1
          var day = date.getDate()
                    // Create a checkbox and label
          var checkbox = ui.Checkbox('', false);
          var label = ui.Label(year + '/' + month + '/' + day);
          var panel =  ui.Panel({
              widgets: [label, checkbox],
              layout: ui.Panel.Layout.flow('vertical')
            });
          checkbox.onChange(displaySelectedImage.bind(null, added, date));
          front[0].add(panel);
          //print((added +1), value.length)
          } else {
           print("Interrompendo") 
           ui.util.clearTimeout(debouncedBatch)}
}
for (var i = 0; i < listofDates.length; i++) {
  processBatch()
}
// Create a function to display the selected image
function displaySelectedImage(x, date) {
  print(x)
  // Get the selected image index
  var date = new Date(listofDates[x])
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  //print(date)
  var the_collection = require('users/joberthgambati/timeSeries:merge_collections_R');
  //var selectedImage = listofImages.filterMetadata('system:id', 'equals', listofNames.get(x)).first();
  var col = the_collection.collection_over_geometry(geometry, 
    ee.Date.fromYMD(year, month, day).advance(-1, 'day'),
    ee.Date.fromYMD(year, month, day).advance(+1, 'day'), ee.Number(100))
  //print(col)
  //print(listofNames.get(x))
  var selectedImage = ee.ImageCollection(col).filterMetadata('system:id','equals', listofNames.get(x)).first()
      var rgbVis = {
    bands: ['B4', 'B3', 'B2'],
    min: 0,
    max: 0.3
    } 
  selectedImage = selectedImage.visualize(rgbVis).paint(geometry, 'ff0000', 2)
      .clip(geometry.bounds().buffer({'distance': 500}))
  print(selectedImage)
  print("Criando Thumbnail")
    var thumb_panel = ui.Panel({
      widgets: [
      ui.Thumbnail({
      image: ee.Image(selectedImage),
      style: {width: (geometry_data.get('thumbsize') * geometry_data.get('thumbxy')) + 'px',
      height: (geometry_data.get('thumbsize') * geometry_data.get('thumbyx')) + 'px'}})
      ],
      style: {
        border: '1px solid black',
        shown: true
      }
    });
  print("Criado Thumbnail")
  // Display the selected image
  front[2].addLayer(selectedImage)
  front[1].add(thumb_panel);
  //print(front[1].widgets())
}