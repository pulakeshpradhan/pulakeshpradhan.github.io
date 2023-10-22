var dept = ee.FeatureCollection("users/geocastellanosg/Vectores/Zona_region"),
    Cord = ee.FeatureCollection("users/geocastellanosg/Cordoba");
var style =require('users/gena/packages:style');
style.SetMapStyleDark();
Map.centerObject(Cord,7)
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: Cord,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'FF0000'}, 'Cordoba');
var vis_sum = {
  min:0,
  max:70,
  palette: ['C6FFEF','78C6F9', '001624']
};
var vis_total = {
  min:0,
  max:1,
  palette: ['00556A']
};
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
///// genero water mask 
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// funcion de enmascaramiento de nubes imagenes Landsat
function maskL8sr(image) {
  // Bits 4 and 8 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 4); //(1 << 3);
  var cloudsBitMask = (1 << 8);
  // Get the pixel QA band.
  var qa = image.select('BQA');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.addBands(image.normalizedDifference(['swir1', 'green']).rename('ndwi'))
  .addBands(image.normalizedDifference(['nir', 'red']).rename('ndvi'))
  .addBands(mask.rename('cloud_mask')) 
} 
function wp(image) {
  return image.addBands(image.expression('(B1*B2*B3*B4)',
    {'B1': image.select('ndwi').lt(-0.05),
      'B2': image.select('ndvi').lt(0.08),
      'B3': image.select('cloud_mask'),
      'B4': image.select('nir').lt(0.30)
      }).rename('water_mask'));
};
function sum(image) {
  //var ndwi = image.select('ndwi');
  // Both flags should be set to zero, indicating clear conditions.
 // var mask = 
  return image.addBands(image.expression('(water_mask  + cloud_mask)',
      {'water_mask': image.select('water_mask'),
      //'land_mask': image.select('land_mask'),
      'cloud_mask': image.select('cloud_mask')})
      .rename('water_product'))
};
var visParams = {
  bands: ['swir1', 'nir', 'green'],
  min: 0.0472,
  max: 0.1409,
  gamma: 1.4,
};
var viswp = {
  min: 0,
  max: 2,
  gamma: 1.4,
};
//================Cargar Dato Mensual y Mosaiquear=========================
  var start = ee.Date('2013-03-01'); //1985ee.Date.fromYMD(1985, 1, 1)]//, 120]; // [ee.Date.fromYMD(2000, 1, 1), 24];)
  var stop = ee.Date('2019-06-02');//[ee.Date.fromYMD(2019, 02, 1)]
// Define dates
var startyear = 2013; 
var endyear = 2019;
var startDate=ee.Date.fromYMD(startyear,01,01);
var endDate=ee.Date.fromYMD(endyear+1,01,01);
var years=ee.List.sequence(startyear,endyear); 
var months=ee.List.sequence(1,12,1);
var bands = ['swir1', 'nir', 'red', 'green','blue','BQA'];
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterDate(start, stop).select(['B6', 'B5', 'B4','B3','B2','BQA'], bands).filterBounds(Cord).map(function (img) {return img.clip(Cord)});
// aplico funcioness  
var l8 = l8.map(maskL8sr)
print(l8.limit(2000),'images');
var L8_coll_WM= l8.map(wp).map(sum);
//print(L8_coll_WM.limit(10),'L8_coll_WM')
function FilterCalendMnt(m) {
        return L8_coll_WM.select('water_product').filter(ee.Filter.calendarRange(m, m, 'month'))
                    .max()
                    .set('month', m);}
var byMonth = ee.ImageCollection.fromImages(
      months.map(FilterCalendMnt));
//print(byMonth.limit(100),'bymonth');
function FilterCalendMntYr(y) {
    return months.map(function (m) {
      var id = ee.String('WP').cat(ee.Number(y).format("%04d_")).cat(ee.Number(m).format("%02d"))
      return L8_coll_WM.select('water_product')
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .max()
        .set('month', m).set('year', y)
        .set("system:index", id)
        .set('system:time_start',ee.Date.fromYMD(y,m, 1))
          });}
var byMonthYear = ee.ImageCollection.fromImages(
  years.map(FilterCalendMntYr).flatten());
//print(byMonthYear.limit(10),'bymonthyear')
function addproperty (img){
return img.set("band_names",img.bandNames())}
var byMonthYear2 = byMonthYear.map(addproperty)
//print(byMonthYear2.limit(10),'bymonthyear2')
var byMonthYear = byMonthYear2.filter(ee.Filter.neq('band_names',[ ]))
var mask_water = byMonthYear.map(function (img) {return img.gt(1).copyProperties(img).copyProperties(img, ['system:time_start']);})
//print(mask_water,'mask_water1')
//Map.addLayer(mask_water,vis_total,'Mask_ater1 Landsat 8')
var mask_water_sum = mask_water.sum()
//print(mask_water_sum,'mask_water_sum')
var frecuencia = mask_water_sum.updateMask(mask_water_sum.gt(5))
Map.addLayer(frecuencia,vis_sum,'frecuencia')
var mask_water_sum_mask = mask_water_sum.gt(1)
//Map.addLayer(mask_water_sum,null,'mask_water_sum')
//print(mask_water_sum)
//Map.addLayer(mask_water_sum_mask,null,'mask_water_sum_mask')
var mask_water = mask_water.map(function (img){return img.updateMask(mask_water_sum.gt(2)).copyProperties(img)})
Map.addLayer(mask_water,vis_total,'Water Mask Landsat 8',false)
//print(mask_water,'mask_water2')
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
var POPULATION_VIS_MAX_VALUE = 100;
var POPULATION_VIS_NONLINEARITY = 1;
function undoColorStretch(val) {
  return Math.pow(val, POPULATION_VIS_NONLINEARITY) * POPULATION_VIS_MAX_VALUE;
}
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(vis_sum.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Assemble the legend panel.
Map.add(ui.Panel(
    [
      ui.Label('Frecuencia del Agua Superficial', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          '[2013-03-01 al 2019-06-01])', LEGEND_FOOTNOTE_STYLE),
      ui.Label(
          'Source: GEA', LEGEND_FOOTNOTE_STYLE),
      ui.Label('En proceso', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));