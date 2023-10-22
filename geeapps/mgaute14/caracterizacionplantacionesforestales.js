// Trabajo de Tesis de Matías Carlos Gaute
var geometry = ee.FeatureCollection('users/mgaute/provincias/prov_corrientes_entrerios');
var cartografia_plantaciones_corrientes = ee.FeatureCollection('users/mgaute/cartografia_corrientes');
var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/cobertura_11052020');
//var geometry = ee.FeatureCollection('users/mgaute/limites_provincia_entrerios');
var forestland = ee.Image('users/mgaute/forestland');
///////////////////////////water///////////////////////////
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
var water_mask_clip = water_mask.clip (geometry)
var occurrence = gsw.select('occurrence');
var occurrence_clic = occurrence.clip (geometry)
//Map.addLayer(occurrence);
Map.addLayer({eeObject: occurrence_clic, visParams:VIS_OCCURRENCE, name: 'Global Surface Water (1984-2019) '});
Map.addLayer({
  eeObject: water_mask_clip,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask'
});
/// Estilos borde cartografía 
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: cartografia_plantaciones,
  color: 1,
  width: 2
});
var outline2 = empty.paint({
  featureCollection: cartografia_plantaciones_corrientes,
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
/////////////////////// NDVIS2//////////////
// Calculo del NDVI_S2 usando una expresion
var ndviS2 = imagen2.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2.select('B8'),
      'RED': imagen2.select('B4')
    });
var imagenS2 = imagen2.addBands(ndviS2.rename('NDVIS2'));
print (imagenS2) ;
     // crear paleta para ndvi
var ndviPaletaS2 = ['5c5592','0d8b8b','46a140','fbff11','c9860c','ff3305'];
//ver NDVIS2 con estilo
Map.addLayer(imagenS2, {bands: ['NDVIS2'], min: 0, max: 1, palette: ndviPaletaS2}, ' NDVI - Sentinel 2 (marzo-abril 2020)',false );
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
'Clasificación de especies forestales',false);
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
Map.addLayer (HD_plantaciones_forestales_SUR, {bands:['b1'], min: [4], max: [40], palette: mipaleta} , "HD (Sector SUR).Agosto.2019", true)
var HD_plantaciones_forestales_NORTE =ee.Image('users/mgaute/imagen_altura_junio_agosto_2019_id_23296')
Map.addLayer (HD_plantaciones_forestales_NORTE, {bands:['b1'], min: [4], max: [40], palette: mipaleta } , "HD (Sector NORTE).Agosto.2019", true)
//Mostrar imagen google satelital detras del mapa.
Map.setOptions("HYBRID")
Map.setCenter (  -58.24688357965756, -31.95399244280431,14)
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
      ui.Label('Characterization of forest plantations based on information derived from satellite platforms and high-performance computing resources', TITLE_STYLE),
      //ui.Label(
        //  'Matías Gaute (1), Roberto Benítez (1), Hugo Fassola (2), Teresa Boca (3), Ernesto Andenmatten (2).Dirección Nacional de Desarrollo Foresto Industrial. DNDFI (1), INTA (2) , FAUBA (3).', TEXT_STYLE),
    ui.Label(
          'Resources: https://jotefa.com/storage/presentaciones/2019/Gaute%20M..pdf, Jean-Francois Pekel, Andrew Cottam, Noel Gorelick, Alan S. Belward, High-resolution mapping of global surface water and its long-term changes. Nature 540, 418-422 (2016). (doi:10.1038/nature20584)', TEXT_LINK),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'}));
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
var chirps = ee.Image('users/mgaute/imagen_altura_junio_agosto_2019_id_23296')
// Calculate rainfall in 2009
var sst = chirps.select("b1")
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
  value: 'Dominant Height Forest Plantations - Eucalyptus (m)',
  style: {position: 'bottom-left',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
Map.addLayer(outline, {palette: '9f9f9f'}, 'Cartografia de plantaciones Forestales Entre Ríos', true);
Map.addLayer(outline2, {palette: '9f9f9f'}, 'Cartografia de plantaciones Forestales Corrientes', false);