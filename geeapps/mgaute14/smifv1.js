// Trabajo de Tesis de Matías Carlos Gaute
var geometry = ee.FeatureCollection('users/mgaute/limites_provincia_entrerios');
var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/cobertura_11052020');
var especies = ee.Image('users/mgaute/Optical_Sentinel_Concordia') 
var firms = ee.ImageCollection("FIRMS")
/// Estilos borde cartografía 
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: cartografia_plantaciones,
  color: 1,
  width: 2
});
//////////////////sentinel 2//////////////////////7
var START1 = ee.Date("2020-03-01");
var END1 = ee.Date("2020-04-05");
var productoS2 =  ee.ImageCollection('COPERNICUS/S2') 
.filterDate(START1,END1);
//print (collectionS2);
var bandasS2=['B2','B3','B4','B5','B6','B7','B8', 'B8A','B11','B12']
// filtrar coleccion
var col2 =productoS2.filterBounds(geometry) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',1)
.select(bandasS2);
//print(col2);
// convertir coleccion a imagen, reduce a mediana
var imagen2=col2.mean().clip(geometry);
// ver imagen en mapa
Map.addLayer (imagen2, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }
, "Mosaico Sentinel 2 marzo - abril 2020 ", false ) ;
var HD_plantaciones_forestales_SUR =ee.Image( 'users/mgaute/imagen_altura_junio_agosto_euca_-0000023296-0000023296')
Map.addLayer (HD_plantaciones_forestales_SUR, {bands:['b1'], min: [4], max: [40], palette: ['brown', 'yellow ', 'green']} , "HD (Sector SUR).Agosto.2019", false)
var HD_plantaciones_forestales_NORTE =ee.Image('users/mgaute/imagen_altura_junio_agosto_2019_id_23296')
Map.addLayer (HD_plantaciones_forestales_NORTE, {bands:['b1'], min: [4], max: [40], palette: ['brown', 'yellow ', 'green']} , "HD (Sector NORTE).Agosto.2019", false)
//Mostrar imagen google satelital detras del mapa.
Map.setOptions("HYBRID")
Map.setCenter (  -58.08, -31.54,14)
var palette =['ff0000',// palm  (red)
];
var viz = {min:1,max:6,palette:palette};
// Create a legend.
var labels = ['Altura dominante (HD)  en Plantaciones de Eucalyptus '];
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend.add(ui.Label({style: { fontWeight: 'bold', fontSize: '15px', margin: '1px 1px 4px 1px', padding: '2px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], border:'1px solid black', margin: '1px 1px 4px 1px'}}),
      ui.Label({ value: labels[x], style: { margin: '1px 1px 4px 4px' } }) ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  } Map.add(legend); };
  add_legend('Legend', labels, palette);
// Styling for the title and footnotes.
var TITLE_STYLE = {
  fontSize: '22px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
// Styling for the title and footnotes.
var TITLE_STYLE = {
  fontSize: '22px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
var TEXT_STYLE = {
  fontSize: '15px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
var TEXT_LINK = {
  fontSize: '10px',
  color : '142cd6',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
Map.add(ui.Panel(
    [
      ui.Label('Sistema de Monitoreo de Incendios en Plantaciones Forestales ', TITLE_STYLE),
      ui.Label(
          '.Dirección Nacional de Desarrollo   Foresto Industrial. DNDFI ', TEXT_STYLE),
    ui.Label(
          'paper:https://jotefa.com/storage/presentaciones/2019/Gaute%20M..pdf', TEXT_LINK),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'}));
//Calculate histograms for each image
//print(ui.Chart.image.histogram({image:HD_plantaciones_forestales_NORTE, region:geometry, scale:100,  }));
//Calculate histograms for each image
print(ui.Chart.image.histogram({image:HD_plantaciones_forestales_SUR, region:geometry, scale:100,  }));
//Compare differences in vegetation loss between 16/18 and 18/19
var area_eucalyptus_NORTE = HD_plantaciones_forestales_NORTE.reduceRegion({
reducer: ee.Reducer.count(),
geometry: geometry,
scale: 30,
maxPixels: 1e9
});
print ('stats_Norte:', area_eucalyptus_NORTE)
//Compare differences in vegetation loss between 16/18 and 18/19
var area_eucalyptus_SUR = HD_plantaciones_forestales_SUR.reduceRegion({
reducer: ee.Reducer.count(),
geometry: geometry,
scale: 10,
maxPixels: 1e9
});
print ('stats_SUR:', area_eucalyptus_SUR)
//var areaImage = ee.Image.pixelArea().addBands().divide(10000);
//print (areaImage)
// Escala colorimetrica
/////////////////////////////barra de colores 
var chirps = ee.Image('users/mgaute/imagen_altura_junio_agosto_2019_id_23296')
// Calculate rainfall in 2009
var sst = chirps.select("b1")
var vis = {min: 2, max: 35, palette: 'brown,yellow,green'};
//var composite = sst.mean().visualize(vis);
//Map.addLayer(composite);
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 5),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Dominant Height Forest Plantations - Eucalyptus (m)',
  style: {position: 'bottom-left',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
Map.addLayer(especies, 
{min: 1, max: 10, palette: ['9adbfa','04d1ff','04d1ff','ee4939','ff991b','000000','000000','000000','000000','000000','000000']},
'Especies Forestales  -  Concordia . 2020 ');
Map.addLayer(outline, {palette: '9f9f9f'}, 'Cartografia de plantaciones Forestales 2015 -DNDFI-MAGYP', false);
//FIRMS
var dataset = ee.ImageCollection('FIRMS')
.filter(
    ee.Filter.date('2020-06-01', '2020-06-15'));
var fires = dataset.select('T21');
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//Map.setCenter(-119.086, 47.295, 6);
Map.addLayer(fires, firesVis, 'Focos activos -  Fire Information for Resource Management System (FIRMS)', true );