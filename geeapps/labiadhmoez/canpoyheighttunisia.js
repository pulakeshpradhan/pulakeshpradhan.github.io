var mapPanel = ui.Map();
ui.root.widgets().reset([mapPanel]);
mapPanel.setOptions('SATELLITE');
mapPanel.style().set('cursor', 'crosshair');
var tun = ee.FeatureCollection("users/labiadhmoez/TUN_adm");
var img = ee.ImageCollection ('users/potapovpeter/GEDI_V27')
             .toBands()
             .select("GEDI_NAFR_v27_b1")
             .clip(tun)
print (img)
var img_masked = img.updateMask(img)
var VizParam = {
  min: 0,
  max: 15,
  palette: ['#d9ead3', '#b6d7a8', '#93c47d', 
            '#6aa84f', '#38761d', '#274e13','#003300'],
};
mapPanel.setCenter (9.49, 36.93, 10);
mapPanel.addLayer(img_masked, VizParam, 'Canopy Height (m)')
mapPanel.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  mapPanel.layers().set(1, dot);
  // Inspect
  //var value = img.get('GEDI_NAFR_v27_b1').getInfo();
  //var valueText = ui.Label('Canopy Height (m): ' + value);
  var value = img.reduceRegion(ee.Reducer.first(), point, 10).evaluate(function(val){
    var valueText = 'Canopy Height: ' + val.GEDI_NAFR_v27_b1 + ' m';
    panel.widgets().set(2, ui.Label(valueText));
  });
  panel.widgets().set(2, ui.Label("loading..."));
});
// Create panels to hold lon/lat values.
var panel = ui.Panel();
panel.style().set('width', '300px');
var label = ui.Label({value: 'Click a point on the map to inspect.', 
                      style: {fontWeight: 'bold'}})
panel.add(label)
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
//panel.add(valueText)
mapPanel.add(panel)
   //LEGEND
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '3px 10px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Canopy Height (m)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var cc = ee.Image.pixelLonLat().select('latitude');
var gradient = cc.multiply((VizParam.max-VizParam.min)/100.0).add(VizParam.min);
var legendImage = gradient.visualize(VizParam);
// create text on top of legend
var legpanelMax = ui.Panel({
    widgets: [
      ui.Label(20)
    ],
  });
legend.add(legpanelMax);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var legpanelMin = ui.Panel({
    widgets: [
      ui.Label(VizParam['min'])
    ],
  });
legend.add(legpanelMin);
mapPanel.add(legend);  
//source Panel
var Source = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '3px 2px'
  }
});
var sourceTextTitle = ui.Label({
  value: 'Data Source: UMD-GLAD, Global Forest Canopy Height 2019, derived from GEDI and LANDSAT ',
  style: {
    fontSize: '9px',
    padding: '0'
    }
});
Source.add(sourceTextTitle)
mapPanel.add(Source)