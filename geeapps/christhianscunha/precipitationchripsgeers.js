var region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -59.96352836646081,
                -26.395245141885155
              ],
              [
                -59.96352836646081,
                -34.99709070976766
              ],
              [
                -46.25259086646081,
                -34.99709070976766
              ],
              [
                -46.25259086646081,
                -26.395245141885155
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
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-59.96352836646081, -26.395245141885155],
          [-59.96352836646081, -34.99709070976766],
          [-46.25259086646081, -34.99709070976766],
          [-46.25259086646081, -26.395245141885155]]], null, false);
var text = require('users/gena/packages:text')
var col = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD').select('precipitation');
// Define a mask to clip the NDVI data by.
 var mask =  ee.FeatureCollection('users/christhianscunha/ibge_limiteRS_ajust')
// Define the regional bounds of animation frames.
//Map.addLayer(mask);
col = col.map(function(img) {
  var doy = ee.Date(img.get('system:time_start')).getRelative('day', 'year');
  return img.set('doy', doy);
});
var distinctDOY = col.filterDate('2019-01-01', '2020-01-01');
// Define a filter that identifies which images from the complete collection
// match the DOY from the distinct DOY collection.
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});
// Define a join.
var join = ee.Join.saveAll('doy_matches');
// Apply the join and convert the resulting FeatureCollection to an
// ImageCollection.
var joinCol = ee.ImageCollection(join.apply(distinctDOY, col, filter));
/*
O resultado ( joinCol) é uma cópia da coleção DOY distinta, 
com uma propriedade adicionada a cada imagem ( same_doy) 
que lista todas as imagens da coleção completa ( col) 
que possuem o mesmo DOY para uma determinada imagem DOY distinta.
*/
///////////////////////////ADICIONAR WIDGET///////////////////////////////////
var pViz_month = {
  min: 8, 
  max: 20, 
  palette: '000096,0064ff,00b4ff,33db80,9beb4a,ffeb00,ffb300,ff6400,eb1e00,af0000'
};
// ADICIONAR LEGENDAS
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
// ADICIONAR PAINEL DE LEGENDA E ADICIONAR LEGENDA AO MAPA
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,5', dimensions:'156x10'}, 
    style: {padding: '0.5px', position: 'top-left'}
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label(String(vis['min'])), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(vis['max']),
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
// Create and add the legend title.
var panellegend = ui.Label({
  value: 'Precipitação (mm/pentad) acumulada em 5 dias',
  style: {
    fontWeight: 'bold',
    fontSize: '9px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
  return ui.Panel().add(panel).add(thumb).add(panellegend);
}
Map.add(makeLegend(pViz_month));
// Apply median reduction among matching DOY collections.
var comp = joinCol.map(function(img) {
  var doyCol = ee.ImageCollection.fromImages(
    img.get('doy_matches')
  );
  return doyCol.reduce(ee.Reducer.median());
});
// Define RGB visualization parameters.
var visParams = {
  min: 8.04,
  max: 20.0,
  palette: ["000096","0064ff","00b4ff","33db80","9beb4a","ffeb00","ffb300","ff6400","eb1e00","af0000"
  ],
};
// get text location
var pt = text.getLocation(region, 'right', '2%', '35%') // aloca o texto na 'região' definida
// Create RGB visualization images for use as animation frames.
var rgbVis = comp.map(function(img) {
  var scale = 1900
  var textVis = { fontSize: 32, textColor: 'ffffff', outlineColor: '000000', outlineWidth: 2.5, outlineOpacity: 0.6 }
  var label = text.draw(img.get('system:index'), pt, scale, textVis)
  return img.visualize(visParams).clip(mask).blend(label);
});
// Define GIF visualization parameters.
var gifParams = {
  'region': region,
  'dimensions': 600,
  'crs': 'EPSG:4326',
  'framesPerSecond': 2,
  'format': 'gif'
};
var legend = makeLegend(pViz_month)
// Print the GIF URL to the console.
print(rgbVis.getVideoThumbURL(gifParams));
// Render the GIF animation in the console.
print(ui.Thumbnail(rgbVis, gifParams));
Map.addLayer(comp.median().clip(mask),{min: 8, max: 20, palette: ["000096","0064ff","00b4ff","33db80","9beb4a","ffeb00","ffb300","ff6400","eb1e00","af0000"]},'Precipitação Rio Grande do Sul')
Map.add (ui.Thumbnail(rgbVis, gifParams))
Map.centerObject(region,5)