var image = ui.import && ui.import("image", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    NOAA = ui.import && ui.import("NOAA", "image", {
      "id": "NOAA/NGDC/ETOPO1"
    }) || ee.Image("NOAA/NGDC/ETOPO1"),
    GSWM = ui.import && ui.import("GSWM", "image", {
      "id": "JRC/GSW1_0/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    elev = ui.import && ui.import("elev", "image", {
      "id": "MERIT/DEM/v1_0_3"
    }) || ee.Image("MERIT/DEM/v1_0_3"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
Map.setCenter(24.5, 45.5, 6.2);
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '300px', position: 'bottom-right', shown: false}
});
var symbol = {
  rectangle: '⬛',
   polygon: '🔺',
  point: '📍'
}
/*function results() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!resultsPanel.style().get('shown')) {
    resultsPanel.style().set('shown', true);
  }
  var aoi = drawingTools.layers().get(0).getEeObject();
  drawingTools.setShape(null);
  var panel = ui.Panel 
    .seriesByRegion({
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                  });
  resultsPanel.widgets().reset([panel]);
}*/
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select Area on the map.'),
    ui.Button({
      label: symbol.rectangle + 'Select Area',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Wait for results to render.'),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
function chartNdviTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Calculate slope from the DEM.
  var listCoords = ee.Array.cat(aoi.coordinates(), 1);
  var xCoords = listCoords.slice(1, 0, 1); 
  var yCoords = listCoords.slice(1, 1, 2); 
  var xMin = xCoords.reduce('min', [0]).get([0,0]); print('xMin',xMin);
  var xMax = xCoords.reduce('max', [0]).get([0,0]); print('xMax',xMax);
  var yMin = yCoords.reduce('min', [0]).get([0,0]); print('yMin',yMin);
  var yMax = yCoords.reduce('max', [0]).get([0,0]); print('yMax',yMax);
  /* ALOS DSM: Global 30m */
  var ALOS = ee.Image('JAXA/ALOS/AW3D30/V2_2').multiply(4);
  /* JRC Global Surface Water Mapping Layers, v1.2 */
  /* Traditional Hillshade (input,azimuth,altitude).multiply(weight) */
  var N = ee.Terrain.hillshade(ALOS,0,36).multiply(0);
  var NE = ee.Terrain.hillshade(ALOS,45,44).multiply(0);
  var E = ee.Terrain.hillshade(ALOS,90,56).multiply(0);
  var SE = ee.Terrain.hillshade(ALOS,135,68).multiply(0);
  var S = ee.Terrain.hillshade(ALOS,180,80).multiply(0.1);
  var SW = ee.Terrain.hillshade(ALOS,225,68).multiply(0.2);
  var W = ee.Terrain.hillshade(ALOS,270,56).multiply(0.2);
  var NW = ee.Terrain.hillshade(ALOS,315,44).multiply(0.5);
  /* Multidirectional Hillshade */
  var MULTI = N
      .add(NE)
      .add(E)
      .add(SE)
      .add(S)
      .add(SW)
      .add(W)
      .add(NW)
      .visualize({
      min:0,
      max:255,
      palette:[
          '#000000',
          '#ffffff'
          ],
      })
      .resample('bicubic')
      .updateMask(0.5);
  /* Slope */
  var SLOPE = ee.Terrain.slope(ALOS)
      .multiply(2)
      .visualize({
          min:100,
          max:180,
          palette:[
              '#ffffff',
              '#000000'
              ]
          })
      .resample('bicubic')
      .updateMask(1);
  /* Shaded Relief */
  var SHADED_RELIEF = ee.ImageCollection([
      SLOPE,
      MULTI
      ])
      .mosaic()
      .reduce(
        ee.Reducer.median()
        )
      .updateMask(1);
  /* Elevation */
  var ELEVATION = ALOS
      .visualize({
          bands:['AVE_DSM'],
          min:0,
          max:12500,
          palette:[
              '#386641',
              '#6a994e',
              '#a7c957',
              '#fdf7d6',
              '#ffffff'
              ]
          })
      .resample('bicubic')
      .updateMask(0.4);
  /* WATER */
  /* Surface Water */
  var SURFACE_WATER = GSWM
      .visualize({
          bands:['occurrence'],
          min:0,
          max:100,
          palette:[
              '#B9E9E7'
              ]
          })
      .resample('bicubic');
  /* Sea */
  var SEA = ALOS
      .updateMask(ALOS.lte(0))
      .visualize({
          bands:['AVE_DSM'],
          min:0,
          max:0,
          palette:[
              'B9E9E7'
              ]
          })
      .resample('bicubic');
  /* Bathymetry */
  var BATHYMETRY = NOAA
      .updateMask(NOAA.lte(-10))
      .visualize({
          bands:['bedrock'],
          min:-5000,
          max:0,
          palette:[
              '#8ECCCB',
              '#ABE0DF',
              'B9E9E7'
              ]
          })
      .resample('bicubic');
  var dict = image.reduceRegion({
      reducer: "mean",
      geometry: aoi,
      scale: 900
    }); //mean value
  var dictt = image.reduceRegion({
      reducer: "max",
      geometry: aoi,
      scale: 900
  }); //max value
  var dicttt = image.reduceRegion({
      reducer: "min",
      geometry: aoi,
      scale: 900
  }); //min value
  var mean = ui.Label();
  mean.setValue('Mean elevation: '+JSON.stringify(dict.get('elevation').getInfo()));
  var max = ui.Label();
  max.setValue('Maximum elevation: '+JSON.stringify(dictt.get('elevation').getInfo())+'m');
  var min = ui.Label();
  min.setValue('Minimum elevation: '+JSON.stringify(dicttt.get('elevation').getInfo())+'m');
  Map.addLayer(
  SHADED_RELIEF.clip(aoi),{
      min:0,
      max:255,
      gamma:1
      },
    'Shaded Relief',
  true
  );
  Map.addLayer(
    ELEVATION.clip(aoi),{
        // visualization
        },
      'Elevation',
    true
  );
  Map.addLayer(
    SURFACE_WATER.clip(aoi),{
        // visualization
        },
      'Surface Water',
    true
  );
  Map.addLayer(
    SEA.clip(aoi),{
        // visualization
        },
      'Sea',
    true
  );
  Map.addLayer(
    BATHYMETRY.clip(aoi),{
        // visualization
        },
      'Bathymetry',
    true
  );
  var resultsPanel = ui.Panel({
    widgets: [
      ui.Label('ELEVATION DATA'),
      mean,
      max,
      min,
    ],
    style: {position: 'bottom-right'},
    layout: null,
  });
  clearGeometry();
  Map.add(resultsPanel);
}
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));