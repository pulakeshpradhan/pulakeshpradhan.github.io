var image = ui.import && ui.import("image", "image", {
      "id": "UMD/hansen/global_forest_change_2019_v1_7"
    }) || ee.Image("UMD/hansen/global_forest_change_2019_v1_7"),
    gsw = ui.import && ui.import("gsw", "image", {
      "id": "JRC/GSW1_2/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_2/GlobalSurfaceWater"),
    peru = ui.import && ui.import("peru", "table", {
      "id": "users/jodaurmu/ANP_YAGUAS"
    }) || ee.FeatureCollection("users/jodaurmu/ANP_YAGUAS"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.25862282437325,
                -2.0565511314243743
              ],
              [
                -72.25862282437325,
                -3.943524053510403
              ],
              [
                -69.88557594937325,
                -3.943524053510403
              ],
              [
                -69.88557594937325,
                -2.0565511314243743
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-72.25862282437325, -2.0565511314243743],
          [-72.25862282437325, -3.943524053510403],
          [-69.88557594937325, -3.943524053510403],
          [-69.88557594937325, -2.0565511314243743]]], null, false);
Map.style().set({cursor: 'crosshair'});
//area
var empty = ee.Image().byte();
var roadbm2 = empty.paint({
  featureCollection: peru,
  color: 1,
  width: 3
});
/////////////////SP5 aerosol////////////////////////
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_AER_AI')
  .select('absorbing_aerosol_index')
  .filterDate('2019-06-01', '2019-06-06')
  ;
var band_viz = {
  min: -5,
  max: 1.0,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
///////////////////////////////////////////////////////////
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2019-06-01', '2019-06-11')
 ;
var band_viz = {
  min: 0.02,
  max: 0.03,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean() .clip(peru), band_viz, 'S5P CO');
///////////////////////////////////////////////////
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate('2019-06-01', '2019-07-16');
var band_viz = {
  min: 1750,
  max: 1900,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean().clip(peru), band_viz, 'S5P CH4');
////////////////////////////////////////////
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset2 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-09-01', '2020-10-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization2 = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(dataset2.mean().clip(peru), visualization2, 'SR Sentinel Actual (10m)');
//////////gobal water surface////////////////
var change = gsw.select("change_abs")
            .clip(peru);
var VIS_CHANGE = {
    min:-50,
    max:50,
    palette: ['red', 'black', 'limegreen']
};
////////////////////////////////////////////////////
// Select band
var treeCover=image.select(['treecover2000']) //cobetura boscosa 
var tcUp10 = image.select(['treecover2000']).gte(10); //cobertura boscosa mayor igual a 10
var tcless10 = image.select(['treecover2000']).lt(10); // cobertura boscosa menos a 10
var lossImage = image.select(['loss']); //pérdida
var gainImage = image.select(['gain']); //ganancia
var datamask = image.select(['datamask']); //tierra 
//Stratification map
var NF1= datamask.eq(1).and(treeCover.lt(10))
var forest1 = tcUp10.and(datamask.eq(1));
var water1 = datamask.eq(2);
var loss1 = datamask.eq(1).and(lossImage);
var gain1 = datamask.eq(1).and(gainImage);
var gainAndLoss1 = gainImage.and(lossImage);
var NF= ee.Image(NF1);
var forest = ee.Image(forest1);
var water = ee.Image(water1);
var loss = ee.Image(loss1);
var gain = ee.Image(gain1);
var gainAndLoss = ee.Image(gainAndLoss1);
///////////NDVI/////EVI////////
var dataset = ee.ImageCollection('MODIS/006/MOD13Q1')
                  .filter(ee.Filter.date('2019-01-01', '2019-12-01'))
                  .mosaic()
                  .clip(peru)
                  ;
var ndvi = dataset.select('NDVI')
                  ;
var evi=dataset.select('EVI');
/////////////////////////////////
var ecoRegions = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017")
                                ;
////////////gpp////////////
var dataset2 = ee.ImageCollection("CAS/IGSNRR/PML/V2")
                  .filter(ee.Filter.date('2017-05-01', '2017-05-31'))
                  .mosaic()
                  .clip(peru)
                  ;
var gpp = dataset2.select('GPP');
var gpp = dataset2.select('Ec');
//////////////rsp///////////////////////
var dem=ee.Image("JAXA/ALOS/AW3D30/V1_1")
var valleyElev = dem.reduceNeighborhood({
  reducer: ee.Reducer.min(),
  kernel: ee.Kernel.square(4),
});
var ridgeElev = dem.reduceNeighborhood({
  reducer: ee.Reducer.max(),
  kernel: ee.Kernel.square(4),
});
var imTop = dem.subtract(valleyElev); 
var imBottom = ridgeElev.subtract(dem); 
var slppost = ee.Image(imTop.divide(imBottom)).multiply(100).add(ee.Image(0.5))
///////////////////////////////////
var pp = ee.ImageCollection('NOAA/PERSIANN-CDR')
                  .filter(ee.Filter.date('2010-01-01', '2011-01-01'))
                  .mosaic()
                  .clip(peru)
                  ;
var precipitation = pp.select('precipitation');
////viz//////////////////////////
var gppVis = {
  min: 0.0,
  max: 9.0,
  palette: [
    "a50026","d73027","f46d43","fdae61","fee08b","ffffbf",
    "d9ef8b","a6d96a","66bd63","1a9850","006837",
  ]
};
var ndviVis = {
  min: 0.0,
  max: 9000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
var precipitationVis = {
  min: 0.0,
  max: 20.0,
  opacity:0.2,
  palette: ['3907ff', '03fff3', '28ff25', 'fbff09', 'ff1105'],
};
///////////////////////////////////////////////
// patch updated colors
var colorUpdates = [
{ECO_ID: 204, COLOR: '#B3493B'},
{ECO_ID: 245, COLOR: '#267400'},
{ECO_ID: 259, COLOR: '#004600'},
{ECO_ID: 286, COLOR: '#82F178'},
{ECO_ID: 316, COLOR: '#E600AA'},
{ECO_ID: 453, COLOR: '#5AA500'},
{ECO_ID: 317, COLOR: '#FDA87F'},
{ECO_ID: 763, COLOR: '#A93800'},
];
// loop over all other features and create a new style property for styling
// later on
var ecoRegions = ecoRegions.map(function(f) {
  var color = f.get('COLOR');
  return f.set({style: {color: color, width: 0}});
});
// make styled features for the regions we need to update colors for,
// then strip them from the main asset and merge in the new feature
for (var i=0; i < colorUpdates.length; i++) {
  colorUpdates[i].layer = ecoRegions
      .filterMetadata('ECO_ID','equals',colorUpdates[i].ECO_ID)
      .map(function(f) {
        return f.set({style: {color: colorUpdates[i].COLOR, width: 0}})
      })
  ecoRegions = ecoRegions
      .filterMetadata('ECO_ID','not_equals',colorUpdates[i].ECO_ID)
      .merge(colorUpdates[i].layer);
}
// use style property to color shapes
var imageRGB = ecoRegions.style({styleProperty: 'style'});
Map.setCenter(16, 49, 4);
Map.addLayer(imageRGB.clip(peru), {}, 'RESOLVE/ECOREGIONS/2017');
///////////////////////////////////////////////////////////////////////
var igbpPalette = [
  '615f55',//'No bosque'
  '1ce80e',//'Bosque'
  '0e48e8',//'Cuerpos de agua'
  'e8102a',//'Perdida de bosques'
  'FF00FF',//'Areas dinamicas'
  ];
//visualization 
Map.centerObject(peru,8); // carretera 
//Map.addLayer(AD.clip(roadbm),igbpPalette, 'Datos de actividad');
var gainAndLoss = gainImage.and(lossImage);
Map.addLayer(ndvi, ndviVis, 'MODIS NDVI (2019)');
Map.addLayer(evi, ndviVis, 'MODIS EVI (2019)');
Map.addLayer(gpp, gppVis, 'GPP');
Map.addLayer(slppost.clip(peru), {min:0,max:99,opacity:0.2}
,"RSP");
//Map.addLayer(forest.updateMask(forest).clip(peru),
  //  {palette: ['035e08', '035e08'], max: 100}, 'Cobertura de Bosque');
Map.addLayer(loss.updateMask(loss).clip(peru),
    {palette: ['FF0000']}, 'Perdida');
Map.addLayer(gain.updateMask(gain).clip(peru),
    {palette: ['0000FF']}, 'Ganancia');
Map.addLayer(gainAndLoss.updateMask(gainAndLoss).clip(peru),
    {palette: 'FF00FF'}, 'Areas dinamica');
Map.addLayer(precipitation,precipitationVis,"Precipitation",true);
Map.addLayer({
  eeObject: change,
  visParams: VIS_CHANGE,
  name: 'occurrence change intensity'
});
Map.addLayer(collection.mean().clip(peru), band_viz, 'S5P Aerosol');
////////////////////////////////////////////////
var legend = ui.Panel({
  style: {
    position: 'middle-left',
    padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Datos de actividad (2000-2019)',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          fontSize: '10px',
          margin: '0 0 4px 0'
        }});
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px',
          fontSize: '10px',
        }});
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')});
};
var palette =['615f55','035e08','e8102a','0000FF','FF00FF' ];
var names = ['No bosque','Bosque','Perdida de bosques','Ganancia de cobertura arborea', 'Areas dinamicas'];
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);
//////////////////////////////////////
//////////////////////////////////////////////////////////////
////Precipitation legend gradient
// set position of panel
var legendpp = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '5px 10px'
  }
});
// Create legend title
var legendTitlepp = ui.Label({
  value: 'Rainfall (mm/day)',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 0px 0',
    padding: '1'
    }
});
 // Add the title to the panel
legendpp.add(legendTitlepp); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((precipitationVis.max-precipitationVis.min)/100.0).add(precipitationVis.min);
var legendImage = gradient.visualize(precipitationVis);
// create text on top of legend
var panelpp = ui.Panel({
    widgets: [
      ui.Label(precipitationVis['max'])
    ],
  });
legendpp.add(panelpp);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x100'},  
  style: {padding: '1px', fontSize: '10px',position: 'bottom-center'}
});
// add the thumbnail to the legend
legendpp.add(thumbnail);
// create text on top of legend
var panel2 = ui.Panel({
    widgets: [
      ui.Label(precipitationVis['min'])
    ],
  });
legendpp.add(panel2);
Map.add(legendpp);
var header = ui.Label('Proyecto Manati FZS', {fontSize: '25px', color: 'darkgreen',fontWeight: 'bold'});
var text = ui.Label('Conservación del Manatí Amazónico (Trichechus inunguis): una responsabilidad compartida en el Parque Nacional Yaguas, Loreto (Perú)',
    {fontSize: '12px',fontWeight: 'bold'});
var text2 = ui.Label(' Equipo UNAP: J. David Urquiza-Muñoz, Tedi Pacheco Gomez, et al',
    {fontSize: '15px',fontWeight: 'italyc'});
var text4 = ui.Label('Equipo SZF: Claus Garcia, Monica Paredes, et al',
    {fontSize: '15px',fontWeight: 'italyc'});
var text3 = ui.Label(' Fuentes: Hansen et. al, 2013, RAISG (en desarrollo), IGN, INEI,MODIS EVI and NDVI: https://doi.org/10.5067/MODIS/MOD13Q1.006,  Zhang, Y., Kong, D., Gan, R., Chiew, F.H.S., McVicar, T.R., Zhang, Q., and Yang, Y., 2019. Coupled estimation of 500m and 8-day resolution global evapotranspiration and gross primary production in 2002-2017. Remote Sens. Environ. 222, 165-182, https://doi.org/10.1016/j.rse.2018.12.031, Gan, R., Zhang, Y.Q., Shi, H., Yang, Y.T., Eamus, D., Cheng, L., Chiew, F.H.S., Yu, Q., 2018. Use of satellite leaf area index estimating evapotranspiration and gross assimilation for Australian ecosystems. Ecohydrology, https://doi.org/10.1002/eco.1974., Zhang, Y., Peña-Arancibia, J.L., McVicar, T.R., Chiew, F.H.S., Vaze, J., Liu, C., Lu, X., Zheng, H., Wang, Y., Liu, Y.Y., Miralles, D.G., Pan, M., 2016. Multi-decadal trends in global terrestrial evapotranspiration and its components. Sci. Rep. 6, 19124. https://doi.org/10.1038/srep19124, Bioscience, An Ecoregions-Based Approach to Protecting Half the Terrestrial Realm doi:10.1093/biosci/bix014',
    {fontSize: '12px',fontWeight: 'italyc'});
var logoAll=ui.Chart(
  [['<img src=https://fcfunap.files.wordpress.com/2020/10/image-3.png width=280px heigth=250px>']],
  'Table',{allowHtml:true});
var toolPanel = ui.Panel([header,logoAll,text,text2,text4,text3], 'flow', {width: '350px', padding:'1px'});
ui.root.insert(1,toolPanel)