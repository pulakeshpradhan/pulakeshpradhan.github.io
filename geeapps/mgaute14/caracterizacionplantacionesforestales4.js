// Trabajo de Tesis de Matías Carlos Gaute
Map.setCenter (  -58.24688357965756, -31.95399244280431,10)
var geometry = ee.FeatureCollection('users/mgaute/limitenacional');
//var cartografia_plantaciones_corrientes = ee.FeatureCollection('users/mgaute/cartografia_corrientes');
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/cobertura_11052020');  
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/plantaciones_forestales_NEA_macizos_02_07_2020')
var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_02_07_2020')
//var geometry = ee.FeatureCollection('users/mgaute/limites_provincia_entrerios');
var forestland = ee.Image('users/mgaute/forestland2');
var limite = geometry.map(function(feature) {
  return feature.simplify({maxError: 100});
});
var cartografia = cartografia_plantaciones.map(function(feature) {
  return feature.simplify({maxError: 10});
});
///////////////////////////water///////////////////////////
var coleccion_paletas =  require ('users/gena/packages:palettes');
var gsw = ee.Image("JRC/GSW1_2/GlobalSurfaceWater")
var occurrence = gsw.select('occurrence');
var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['white', 'blue']
};
var VIS_WATER_MASK = {
  palette: ['black', 'blue']
};
//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////
// Create a water mask layer, and set the image mask so that non-water areas
// are opaque.
var water_mask = occurrence.gt(90).unmask(0);
var water_mask_clip = water_mask
//.clip (geometry)
var occurrence = gsw.select('occurrence');
var occurrence_clic = occurrence
//.clip (geometry)
//Map.addLayer(occurrence);
Map.addLayer({eeObject: occurrence_clic, visParams:VIS_OCCURRENCE, name: 'Global Surface Water (1984-2019) '});
Map.addLayer({
  eeObject: water_mask_clip,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask'
});
//////////////////////////////hansen///////////////
var dataset = ee.Image('UMD/hansen/global_forest_change_2019_v1_7');
var dataset_clic = dataset.clip (cartografia_plantaciones)
var treeCoverVisParam = {
  bands: ['treecover2000'],
  min: 0,
  max: 100,
  palette: ['black', 'green']
};
//Map.addLayer(dataset, treeCoverVisParam, 'tree cover');
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 19,
  palette: ['yellow', 'red']
};
Map.addLayer(dataset_clic, treeLossVisParam, 'Año de Aprovechamiento', false) ;
////////////////////////////////////////////////////////////////
/// Estilos borde cartografía 
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: cartografia_plantaciones,
  color: 1,
  width: 2
});
/*
var outline2 = empty.paint({
  featureCollection: cartografia_plantaciones_corrientes,
  color: 1,
  width: 2
});
*/
//////////////////sentinel 2//////////////////////7
var START1 = ee.Date("2020-03-01");
var END1 = ee.Date("2020-07-20");
var productoS2 =  ee.ImageCollection('COPERNICUS/S2') 
.filterDate(START1,END1);
//print (collectionS2);
var bandasS2=['B3','B4','B8', 'B11']
// filtrar coleccion
var col2 =productoS2
.filterBounds(limite) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',5)
.select(bandasS2)
//print(col2);
// convertir coleccion a imagen, reduce a mediana
var imagen2=col2.mean().clip(cartografia_plantaciones)
// ver imagen en mapa
Map.addLayer (imagen2, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }
, "Mosaico Sentinel 2 marzo - abril 2020 ", true ) ;
/////////////////////// NDVIS2//////////////
// Calculo del NDVI_S2 usando una expresion
var ndviS2 = imagen2.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2.select('B8'),
      'RED': imagen2.select('B4')
    });
var imagenS2 = imagen2.addBands(ndviS2.rename('NDVIS2')).clip(cartografia_plantaciones);
print (imagenS2) ;
// crear paleta para ndvi
/////////////////
var mipaletandvi = coleccion_paletas.colorbrewer.RdYlGn [11]//.reverse(); 
var NDVIVisParam = {
  bands: ['NDVIS2'],
  min: 0,
  max: 1,
  palette: mipaletandvi
};
//ver NDVIS2 con estilo
Map.addLayer(imagenS2,  NDVIVisParam, ' NDVI',false );
//{bands: ['NDVIS2'], min: 0, max: 1, palette: ndviPaletaS2}
///////////////////////////////////////////////////////
var palette_clasificacion =
['ff0000',// dunnii  (red)
              '9933ff',//grandis  (purple)
               'fffe9b',//grandis  (amarillo)
              '008000',//pinus elliottii  (green)
];
//var viz = {min:1,max:3,palette:palette_clasificacion};
///////////////VISUALIZACIONES//////////////////77
Map.addLayer(forestland, 
{ min: 1, max: 4, palette:palette_clasificacion },
'Especies forestales ( Entre Ríos - Corrientes)',false);
/////////////////////////////barra de colores 
var chirps = ee.Image('users/mgaute/imagen_altura_junio_agosto_2019_id_23296')
// Calculate rainfall in 2009
var sst = chirps.select("b1")
//CREAR Paleta para la barra
var coleccion_paletas =  require ('users/gena/packages:palettes')
var mipaleta = coleccion_paletas.colorbrewer.Spectral [11].reverse(); 
var vis = {min: 2, max: 35, palette: mipaleta};
//var composite = sst.mean().visualize(vis);
//Map.addLayer(composite);
var HD_plantaciones_forestales_SUR =ee.Image( 'users/mgaute/imagen_altura_junio_agosto_euca_-0000023296-0000023296')
Map.addLayer (HD_plantaciones_forestales_SUR, {bands:['b1'], min: [4], max: [40], palette: mipaleta} , "HD (Sector SUR - Entre Ríos).Agosto.2019", false)
var HD_plantaciones_forestales_NORTE =ee.Image('users/mgaute/imagen_altura_junio_agosto_2019_id_23296')
Map.addLayer (HD_plantaciones_forestales_NORTE, {bands:['b1'], min: [4], max: [40], palette: mipaleta } , "HD (Sector NORTE - Entre Ríos).Agosto.2019", false)
//Mostrar imagen google satelital detras del mapa.
Map.setOptions("HYBRID")
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
  }  };
  //Map.add(legend);
  add_legend('Legend', labels, palette);
// Styling for the title and footnotes.
var TITLE_STYLE = {
  fontSize: '30px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
// Styling for the title and footnotes.
var TITLE_STYLE = {
  fontSize: '12px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
var TEXT_STYLE = {
  fontSize: '9px',
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
      ui.Label('Caracterización de plantaciones forestales a partir de información derivada de plataformas satelitales y recursos informáticos de alto rendimiento', TITLE_STYLE),
      //ui.Label(
         // 'Área SIG e Inventario Forestal ', TEXT_STYLE),
    ui.Label(
          'Recursos: https://jotefa.com/storage/presentaciones/2019/Gaute%20M..pdf,  GJean-Francois Pekel, Andrew Cottam, Noel Gorelick, Alan S. Belward, High-resolution mapping of global surface water and its long-term changes. Nature 540, 418-422 (2016). (doi:10.1038/nature20584), High-Resolution Global Maps of 21st-Century Forest Cover Change https://science.sciencemag.org/content/342/6160/850; https://github.com/nkeikon/earthengine-apps', TEXT_LINK),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'}));
////////////////////////////////////////////////////////////////////77
/*
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
/*
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
*/
// Escala colorimetrica
/////////////////////////////barra de colores 
var altura = ee.Image('users/mgaute/imagen_altura_junio_agosto_2019_id_23296')
// Calculate rainfall in 2009
var sst = altura.select("b1")
//CREAR Paleta para la barra
var coleccion_paletas =  require ('users/gena/packages:palettes')
var mipaleta = coleccion_paletas.colorbrewer.Spectral [11].reverse(); 
var vis = {min: 2, max: 35, palette: mipaleta};
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
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
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
  value: 'Altura dominante en Eucalyptus (m) - ( solo Entre Ríos)  ',
  style: {position: 'bottom-left',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanelHD = ui.Panel([legendTitle, colorBar, legendLabels], ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'})
Map.add(legendPanelHD)
//////////////////////////////////////////////////////////////
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
//CREAR Paleta para la barra NDVI////////////////////77
//var ndviPaletaS2 = ['5c5592','0d8b8b','46a140','fbff11','c9860c','ff3305'];
//var coleccion_paletas =  require ('users/gena/packages:palettes')
var mipaletandvi = coleccion_paletas.colorbrewer.RdYlGn [11]//.reverse(); 
var visndvi = {min: 0, max: 1, palette: mipaletandvi};
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
var colorBarNDVI = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visndvi.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabelsNDVI = ui.Panel({
  widgets: [
    ui.Label(visndvi.min, {margin: '4px 8px'}),
    ui.Label(
        (visndvi.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visndvi.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle_ndvi = ui.Label({
  value: 'Índice de vegetación (NDVI) marzo 2020',
  style: {textAlign: 'center',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanelNDVI = (ui.Panel([legendTitle_ndvi, colorBarNDVI, legendLabelsNDVI], ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'}))
Map.add(legendPanelNDVI);
//////////////////////////////////////
var mipaleta_hansen = coleccion_paletas.colorbrewer.RdYlGn [11]//.reverse(); 
var vishansen  = {min: 0, max: 19, palette: ['yellow', 'orange', 'red']}
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
var colorBar_hansen = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vishansen.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabels_hansen = ui.Panel({
  widgets: [
    ui.Label(vishansen.min, {margin: '4px 8px'}),
    //ui.Label(
      //  (vishansen.max / 2),
        //{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vishansen.max, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle_hansen = ui.Label({
  value: ' Año de pérdida de cobertura árbórea o aprovechamiento forestal',
  style: {textAlign: 'center',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel_hansen = (ui.Panel([legendTitle_hansen, colorBar_hansen, legendLabels_hansen], ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-left'}))
Map.add(legendPanel_hansen);
//////////////////////////////////////////////////////////////7
Map.addLayer(outline, {palette: '0000FF'}, 'Plantaciones Forestales', false);
//Map.addLayer(outline2, {palette: '9f9f9f'}, 'Cartografia de plantaciones Forestales Corrientes', false);