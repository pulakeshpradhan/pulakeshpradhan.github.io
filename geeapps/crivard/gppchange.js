var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "users/crivard/bgr_gpp_small"
    }) || ee.ImageCollection("users/crivard/bgr_gpp_small"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint(),
    bgr = ui.import && ui.import("bgr", "table", {
      "id": "users/crivard/SHAPEFILES/BGR_pasturebounds_NAD83_UTM13N_191016_JC"
    }) || ee.FeatureCollection("users/crivard/SHAPEFILES/BGR_pasturebounds_NAD83_UTM13N_191016_JC");
var data = ee.ImageCollection("users/crivard/bgr_gpp_yrsums").map(function(img){
    return img.addBands(img.multiply(5.0).rename('gpp')).select('gpp')
  })
/*
var prcp = ee.ImageCollection("NASA/ORNL/DAYMET_V3").filterDate(data.first().get('system:time_start'), ee.Image(data.toList(data.size()).get(data.size().subtract(1))).get('system:time_start'))
print(prcp)*/
var map = ui.Map().setGestureHandling('cooperative');
var drawingTools = map.drawingTools();
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
  widgets:[ui.Chart.image.series({
              imageCollection: data,
              region: bgr,
              reducer: ee.Reducer.mean(),
              scale: 30,
            }).setOptions({
              //titlePostion: 'center',
              title: "RANCH AVERAGE Annual Gross Primary Productivity (GPP)",
              trendlines: {type:'linear',0: {color: '8d9996',lineDashStyle:[1,1]}},
              legend: {position: 'none'},
              hAxis: {title: 'Date'},
              vAxis: {title: 'g C / m2 / year'},
              series: {0: {color: '23cba7'}}
            })],
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: true} //'235px'//'470px'
});
//map.add(chartPanel)
var chartPanel2 = ui.Panel({
  widgets:[ui.Chart.image.series({
              imageCollection: ee.ImageCollection("users/crivard/bgr_gpp_small").select('gpp'),
              region: bgr,
              reducer: ee.Reducer.mean(),
              scale: 30,
            }).setOptions({
              //titlePostion: 'center',
              title: "RANCH AVERAGE 5-Day Gross Primary Productivity (GPP)",
              trendlines: {type:'linear',0: {color: '8d9996',lineDashStyle:[1,1]}},
              legend: {position: 'none'},
              hAxis: {title: 'Date'},
              vAxis: {title: 'g C / m2 / 5 days'},
              series: {0: {color: '0519f5'}}
            })],
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: true} //'235px'//'470px'
});
//map.add(chartPanel2)
//var aoi_panel = ui.Panel({widgets:[ui.Label({style:{shown:true}})]});
var aoi_panel = ui.Panel();
function chartNdviTimeSeries() {
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  //aoi_panel.widgets().reset([ui.Label('Geometry Coordinates:\n '+ aoi.getInfo()["coordinates"]).style()]);
  //print(aoi)
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Chart NDVI time series for the selected area of interest.
  var chart1 = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: data,//ee.ImageCollection("users/crivard/bgr_gpp_small"), //ee.ImageCollection('MODIS/006/MOD13A2'),
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'gpp',
                    scale: 30,//scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    //titlePostion: 'center',
                    title: "Annual Gross Primary Productivity (GPP)",
                    trendlines: {type:'linear',0: {color: '8d9996',lineDashStyle:[1,1]}},
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'g C / m2 / year'},
                    series: {0: {color: '23cba7'}}
                  });
  var chart2 = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: ee.ImageCollection("users/crivard/bgr_gpp_small"), //ee.ImageCollection('MODIS/006/MOD13A2'),
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'gpp',
                    scale: 30,//scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    //titlePostion: 'center',
                    title: "5-Day Gross Primary Productivity (GPP)",
                    trendlines: {type:'linear',0: {color: '8d9996',lineDashStyle:[1,1]}},
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'g C / m2 / 5 days'},
                    series: {0: {color: '0519f5'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart1]);
  chartPanel2.widgets().reset([chart2]);
}
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var geomPanel = ui.Panel({
  widgets: [
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    })
  ],
  style: {position: 'top-center', stretch:'horizontal'},
  layout: ui.Panel.Layout.flow('horizontal'),
});
var title = new ui.Label({
            value:"Rangeland Carbon Tracking and Monitoring Tool",
            style:{
              fontWeight:'bold',
              fontSize: '16px',
              padding:'4px 60px 4px 50px',
              textAlign:'center'
            }
          });
var controlPanel = ui.Panel({
  widgets: [
    title,
    ui.Label(
        'The map below shows annual GPP trends over time. To view the time series\nat a specific location, select an option below and draw the geometry on the map!',
        {whiteSpace: 'pre'}),
    geomPanel
  ],
  style: {position: 'top-center', stretch:'horizontal'},
  layout: ui.Panel.Layout.flow('vertical'),
});
map.add(controlPanel);
//Add the Legend
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'GPP Change\n',
style: {
fontWeight: 'bold',
fontSize: '16px',
margin: '0 0 4px 0',
padding: '0'
}
});
var legendUnits = ui.Label({
value: '(gC/m2/year)',
style: {
fontWeight: 'bold',
fontSize: '14px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
legend.add(legendUnits);
// create the legend image
//var viz = {min:0, max:3500, palette:['ffffff','b7f0ae','21f600','0000FF','FDFF92','FF2700','d600ff']};
var viz = {min:-5,max:5,palette:['ff0000','ffff00','008000']}
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var max_panel = ui.Panel({
widgets: [
ui.Label(viz.max)
],
});
legend.add(max_panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var min_panel = ui.Panel({
widgets: [
ui.Label(viz.min)
],
});
legend.add(min_panel);
map.add(legend);
//Add the Change Map Layer
//Map.addLayer(ee.Image('users/crivard/BGR_GPP_theil_sen_modisdata'))
var changemap = ee.Image('users/crivard/bgr_gpp_theilsen').multiply(5.0)
//changemap = changemap.paint(bgr,100,2)
map.addLayer(changemap,{min:-5,max:5,palette:['ff0000','ffff00','008000']},"GPP Change Map") //'ffff00'
map.addLayer(bgr,{},"BGR Boundaries",true, 0.5) //color:'8d9996'
//map.setCenter(-104.76588854365053, 47.15,13) //47.2047194514279, 13) //12
map.setCenter(-104.84220599084613, 47.18262933992156,13) //47.2047194514279, 13) //12
var splitPanel = ui.SplitPanel({
  firstPanel: map,
  secondPanel: ui.Panel({widgets:[chartPanel,chartPanel2, aoi_panel],style:{width:'30%'}}),
  orientation: 'horizontal'
});
ui.root.clear();
ui.root.add(splitPanel);