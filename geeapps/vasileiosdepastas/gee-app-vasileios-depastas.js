var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -92.8553972272626,
                38.25958052328181
              ],
              [
                -92.78261280343447,
                37.99166375365903
              ],
              [
                -92.41731739327822,
                38.096570846062804
              ],
              [
                -92.51894092843447,
                38.27790976116308
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-92.8553972272626, 38.25958052328181],
          [-92.78261280343447, 37.99166375365903],
          [-92.41731739327822, 38.096570846062804],
          [-92.51894092843447, 38.27790976116308]]]);
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1"); //dataset import
var drawingTools = Map.drawingTools();
//color palettes
var RGB432 = {bands: ["B4", "B3", "B2"], min: 5000, max: 12000};
var RGB543 = {bands: ["B5", "B4", "B3"], min: 4000, max: 12000};
var ndviParams = {min: -0.1, max: 0.35, bands:'NDVI', 
    palette: ['orangered','yellow','green']}; //default ndvi values in [-1,1]
function real_RGB(){
  var layers = drawingTools.layers();
  var num_geoms = layers.get(0).geometries().length();
  if (num_geoms === 0){
    print('Draw a polygon to select less cloudy image of 2019');
  }else{
    var roi_area = drawingTools.layers().get(0).getEeObject();
    var image_less_cloudy = l8.filterDate("2019-01-01", "2019-12-31").filterBounds(roi_area).
                filter(ee.Filter.lt("CLOUD_COVER", 20)).sort("CLOUD_COVER").first();
    Map.addLayer(image_less_cloudy.clip(roi_area), RGB432, 'real RGB color');
  }
};
function pseudo_RGB(){
  var layers = drawingTools.layers();
  var num_geoms = layers.get(0).geometries().length();
  if (num_geoms === 0){
    print('Draw a polygon to select less cloudy image of 2019');
  }else{
    var roi_area = drawingTools.layers().get(0).getEeObject();
    var image_less_cloudy = l8.filterDate("2019-01-01", "2019-12-31").filterBounds(roi_area).
                filter(ee.Filter.lt("CLOUD_COVER", 20)).sort("CLOUD_COVER").first();
    Map.addLayer(image_less_cloudy.clip(roi_area), RGB543, 'pseudo RGB color');
  }
};
function ndvi(){
  var layers = drawingTools.layers();
  var num_geoms = layers.get(0).geometries().length();
  if (num_geoms === 0){
    print('Draw a polygon to select less cloudy image of 2019');
  }else{
    var roi_area = drawingTools.layers().get(0).getEeObject();
    var image_less_cloudy = l8.filterDate("2019-01-01", "2019-12-31").filterBounds(roi_area).
                filter(ee.Filter.lt("CLOUD_COVER", 20)).sort("CLOUD_COVER").first();
    // Compute the Normalized Difference Vegetation Index (NDVI) for the image
    var nir = image_less_cloudy.select('B5');
    var red = image_less_cloudy.select('B4');
    var ndvi_image = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
    Map.addLayer(ndvi_image.clip(roi_area), ndviParams, 'NDVI');
  }
};
var title = ui.Label("GEE Landsat '19 app", {
  backgroundColor: 'lightgray',
  textAlign: 'center',
  border: '5px solid darkgray',
  //color: 'black',
  shown: 'true',
  position: 'top-right',
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
function polygon_select() {
  drawingTools.setShape('polygon');
  drawingTools.draw();
};
var app_panel = ui.Panel({
  //define the widgets to be used in the side panel
  widgets: [ 
    ui.Label('Step 1 - Area selection'),
    ui.Button({
      label:  'Click here to draw a single polygon',
      onClick: polygon_select,
      style: {stretch: 'horizontal'}}),
    ui.Label('For the next step, the image of 2019'),
    ui.Label('with the lowest cloud cover is selected'), 
    ui.Label('Step 2 - Select map layer'),
    ui.Button({
      label: 'Real RGB',
      onClick: real_RGB,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: 'Pseudo RGB',
      onClick: pseudo_RGB,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: 'NDVI',
      onClick: ndvi,
      style: {stretch: 'horizontal'}
    })
    // ui.Button({
    //   label: 'Median NDVI',
    //   onClick: ndvi,
    //   style: {stretch: 'horizontal'}
    // }),
    // ui.Button({
    //   label: 'Median NDWI',
    //   onClick: ndwi,
    //   style: {stretch: 'horizontal'}
    // }),
    // ui.Button({
    //   label: 'Pseudo color',
    //   onClick: pseudo_color,
    //   style: {stretch: 'horizontal'}
    // }),
    // ui.Button({
    //   label: 'Erase Layer',
    //   onClick: remove_layer,
    //   style: {stretch: 'horizontal'}
    // })
  ],
  style: {position: 'top-right'}});
Map.add(title);
Map.add(app_panel);