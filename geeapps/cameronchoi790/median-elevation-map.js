var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -119.81828701475526,
                37.497267192578505
              ],
              [
                -119.81828701475526,
                37.42314139570478
              ],
              [
                -119.69057095030213,
                37.42314139570478
              ],
              [
                -119.69057095030213,
                37.497267192578505
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-119.81828701475526, 37.497267192578505],
          [-119.81828701475526, 37.42314139570478],
          [-119.69057095030213, 37.42314139570478],
          [-119.69057095030213, 37.497267192578505]]], null, false);
// Load elevation data.
var srtm = ee.Image('USGS/SRTMGL1_003');
Map.addLayer(srtm, {min: 0, max: 5000}, 'SRTM');
// Make a label to display mean elevation at drawn points.
var label = new ui.Label('Draw points to calculate mean elevation');
var inspector = new ui.Panel([label]);
Map.add(inspector);
// Don't make imports that correspond to the drawn points.
Map.drawingTools().setLinked(false);
// Limit the draw modes to points.
Map.drawingTools().setDrawModes(['point']);
// Add an empty layer to hold the drawn points.
Map.drawingTools().addLayer([]);
// Set the geometry type to be point.
Map.drawingTools().setShape('point');
// Enter drawing mode.
Map.drawingTools().draw();
// This function gets called when the geometry layer changes.
// Use debounce to call the function at most every 100 milliseconds.
var getAverageElevation = ui.util.debounce(function() {
  var points = Map.drawingTools().layers().get(0).toGeometry();
  var elevation = srtm.reduceRegion({
    reducer: ee.Reducer.median(),
    geometry: points,
    scale: 30
  }).get('elevation');
  // Asynchronously evaluate the median elevation.
  elevation.evaluate(showElevation);
}, 100);
// Set the callback function on changes of the geometry layer.
Map.drawingTools().onEdit(getAverageElevation);
Map.drawingTools().onDraw(getAverageElevation);
Map.drawingTools().onErase(getAverageElevation);
// Setting the label to the result of the median reduction.
function showElevation(elevation) {
  inspector.clear();
  var elevationLabel = ui.Label('Median elevation: ' + elevation);
  inspector.add(elevationLabel);
}
//Creating a button to center on geometry
centerButton: ui.Button('Center to point', function() {
  Map.centerObject(geometry, 1);
})
//Creating a label
var label = ui.Panel({
style: {
position: 'top-center',
padding: '15px 25px'
}
});
var legendTitle = ui.Label({
value: 'Median Elevation',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
label.add(legendTitle);
Map.add(label);
//Creating a thumbnail
  var imgList = [];
  var args = {
    crs:'EPSG:3857',
    dimensions: '200',
    region: geometry,
    min: -1, 
    max: 1, 
    //palatte: [ndviParams],
    palette: ['blue', ' red'],
    framesPerSecond: 1,
  };
  var yearImgCol = ee.ImageCollection.fromImages(imgList);
  var thumb = ui.Thumbnail({
    image: yearImgCol,
    params: args,
    style: {
      position: 'top-right',
      width: '320px'
    }});
  Map.add(thumb);
 print(ui.Thumbnail(yearImgCol));