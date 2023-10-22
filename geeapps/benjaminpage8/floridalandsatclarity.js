var L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    L9 = ui.import && ui.import("L9", "imageCollection", {
      "id": "LANDSAT/LC09/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC09/C02/T1_L2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -84.15976192663302,
                30.768388449734918
              ],
              [
                -84.15976192663302,
                24.74495978180948
              ],
              [
                -79.14999630163302,
                24.74495978180948
              ],
              [
                -79.14999630163302,
                30.768388449734918
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
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-84.15976192663302, 30.768388449734918],
          [-84.15976192663302, 24.74495978180948],
          [-79.14999630163302, 24.74495978180948],
          [-79.14999630163302, 30.768388449734918]]], null, false),
    JRC = ui.import && ui.import("JRC", "image", {
      "id": "JRC/GSW1_4/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_4/GlobalSurfaceWater"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -81.49979987814321,
                28.595069154153673
              ],
              [
                -81.49979987814321,
                28.44906829850123
              ],
              [
                -81.30135932638541,
                28.44906829850123
              ],
              [
                -81.30135932638541,
                28.595069154153673
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
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-81.49979987814321, 28.595069154153673],
          [-81.49979987814321, 28.44906829850123],
          [-81.30135932638541, 28.44906829850123],
          [-81.30135932638541, 28.595069154153673]]], null, false);
Map.centerObject(geometry2,12)
// time frame
var startMonth = 1;
var endMonth = 12;
var startYear = 2013;
var endYear = 2022;
var landsat_merged = L8.merge(L9).sort('system:time_start')
var mask = JRC.select('occurrence').gt(30);
mask = mask.updateMask(mask.eq(1));
// mask
var available_imagery = landsat_merged
.filterBounds(geometry)
.filterMetadata('CLOUD_COVER', "less_than", 1)
.filter(ee.Filter.calendarRange(startMonth, endMonth, 'month'))
.filter(ee.Filter.calendarRange(startYear, endYear, 'year'));
print(available_imagery, 'available_imagery')
var sd = available_imagery.map(clarity).sort('system:time_start')
print(sd, 'sd')
function clarity(img){
  var target_bands = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5']
  var rescaled = img.select(target_bands).multiply(ee.Image(0.0000275)).subtract(ee.Image(0.2));
  var b2 = rescaled.select('SR_B2').log();
  var b4 = rescaled.select('SR_B4').log();
  var sd = b2.divide(b4).multiply(mask).clip(geometry)
  return(sd.set('system:time_start', img.get('system:time_start')))
}
Map.addLayer(sd.median(), {min: 0.8, max: 1.4, palette: ['darkblue', 'blue', 'cyan', 'limegreen', 'yellow', 'orange', 'orangered', 'darkred']}, 'sd')
// ***Panel*** \\
var viz = {min:0, max: 0.02, palette: ['darkblue', 'blue', 'cyan', 'limegreen', 'yellow', 'orange', 'orangered', 'darkred']};
// set position of panel
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
    padding: '30x 30px',
    color: '000000'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Clarity',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 0 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('Low')
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage,
    params: {bbox:'0,0,10,100', dimensions:'20x200'},  
    style: {padding: '1px', position: 'bottom-center'},
  });
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('High')
    ],
  });
legend.add(panel);
Map.add(legend);