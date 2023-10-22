var manu = ui.import && ui.import("manu", "table", {
      "id": "users/jodaurmu/PN_delManu"
    }) || ee.FeatureCollection("users/jodaurmu/PN_delManu"),
    GWS = ui.import && ui.import("GWS", "image", {
      "id": "JRC/GSW1_3/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_3/GlobalSurfaceWater"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -71.63446796444445,
                -11.693578741404458
              ],
              [
                -71.63446796444445,
                -11.704168752863936
              ],
              [
                -71.61940467861682,
                -11.704168752863936
              ],
              [
                -71.61940467861682,
                -11.693578741404458
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
        [[[-71.63446796444445, -11.693578741404458],
          [-71.63446796444445, -11.704168752863936],
          [-71.61940467861682, -11.704168752863936],
          [-71.61940467861682, -11.693578741404458]]], null, false),
    hansen = ui.import && ui.import("hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2021_v1_9"
    }) || ee.Image("UMD/hansen/global_forest_change_2021_v1_9"),
    biosfera_manu = ui.import && ui.import("biosfera_manu", "table", {
      "id": "users/jodaurmu/reserva_de_biosfera_manu"
    }) || ee.FeatureCollection("users/jodaurmu/reserva_de_biosfera_manu");
var anps = ee.FeatureCollection(manu)
Map.centerObject(manu);
Map.addLayer(manu, {color: 'green'}, 'ANPS');
//////////FONTS///
var header_fonts={fontSize: '20px', fontWeight:'bold',fontFamily:'Helvetica',backgroundColor:'white',color: 'darkgreen',textAlign:'center'}
var tittle_fonts={textAlign:'left',fontWeight: 'bold', fontSize: '16px', margin: '10px 5px', backgroundColor:'white',color:'black'}
var sub_tittle_fonts={fontWeight: 'normal', fontSize: '16px', margin: '10px 5px', backgroundColor:'white',color:'black'}
var text_fonts= {fontSize: '12px',fontWeight: 'italic',backgroundColor:'white',color:'black',textAlign:"justify"}
/////////////////
///////////////////////////PANEL/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var header = ui.Label('Sistema de Monitoreo Manu 1.0 (beta)', header_fonts);
var text = ui.Label('El proyecto “Soporte al Paisaje Manu” busca mantener un adecuado estado de conservación del Paisaje Manu a largo plazo, garantizando sus proceses ecológicos y contribuyendo al cumplimiento de los compromisos de conservación del país. El estado de conservación del Paisaje Manu permite que los servicios ecosistémicos se mantengan a futuro asegurando los medios de vida de las poblaciones al interior de las ANP. Este servicio responde a las actividades que se consideran en el proyecto financiado por FZS - Paisaje Manu HQ.',
    text_fonts);
var text2 = ui.Label(
    'J. David Urquiza-Muñoz*',
    {fontSize: '12px',fontWeight: 'bold',fontFamily:'Helvetica',backgroundColor:'white',color:'black',textAlign:"center"});
var text3= ui.Label('This tool run based on Sentinel Level-2A orthorectified atmospherically corrected surface reflectance of Sentinel 2.Dataset availability: 2017-03-28 – Present',
    {});
var  ref = ui.Label('Manual de uso', {textAlign:'center',fontWeight: 'bold', fontSize: '16px', margin: '10px 5px', backgroundColor:'white',color:'blue'},'https://docs.google.com/document/d/1_pYzYCNUov_3h8D-nIVoAADWx0NlfBBcjzi9zztkrOM/edit?usp=sharing');
//Logos
var complements=require('users/jodaurmu/MANU:complements')
var thumb=complements.thumb
var toolPanel = ui.Panel([header,thumb,text,ref],'flow', {width: '340px', padding:'1px',backgroundColor:'white'});
ui.root.insert(1,toolPanel)
//////////base map
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('satellite', {'baseChange': baseChange});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Site
////Site
var site_tittle = ui.Label('Analisis por Zona del ANP:',tittle_fonts);
toolPanel.add(site_tittle)
var ccff = ee.FeatureCollection(biosfera_manu)
var filteredArea=biosfera_manu
/*var area_col = empty.paint({
  featureCollection: filteredArea,
  color: 4,
  width: 2
})*/
//Map.addLayer(area_col, {palette: '#0af047',strokeWidth: 10}, 'ANPs');
var depaNames = filteredArea.aggregate_array('Tipo_zona').sort().distinct()
var getdpto = function(state) {
  // Given a state get all counties
  var feat = ee.Feature(filteredArea.filterMetadata('Tipo_zona', 'equals', state).first())
  var statefp = ee.String(feat.get('Tipo_zona'))
  var filteredCounties = ccff.filterMetadata('Tipo_zona', 'equals', statefp)
  var filteredCountiesNames = filteredCounties.aggregate_array('Tipo')
  return ee.List(filteredCountiesNames)
}
// Empty Dropdowns
var statesDD = ui.Select([], 'Cargando..')
var countiesDD = ui.Select([], 'esperando tipo..')
// Load states
depaNames.evaluate(function(states){
  statesDD.items().reset(states)
  statesDD.setPlaceholder('Tipo')
  statesDD.onChange(function(state){
    // once you select a state (onChange) get all counties and fill the dropdown
    countiesDD.setPlaceholder('cargando...')
    var counties = getdpto(state)
    counties.evaluate(function(countiesNames){
      countiesDD.items().reset(countiesNames)
      countiesDD.setPlaceholder('ANP')
    })
  })
})
var add = ui.Button('Mostrar Zona')
add.onClick(function(){
  var name = countiesDD.getValue()
  var county = ee.Feature(ccff.filterMetadata('Tipo', 'equals', name).first())
  Map.addLayer(county, {color: 'red'}, name)
})
toolPanel.add(statesDD)
toolPanel.add(countiesDD)
toolPanel.add(add)
var label_defor_anal=ui.Label('Analisis de Perdida de Bosques',tittle_fonts)
toolPanel.add(label_defor_anal)
var nota1=ui.Label({value:'Nota: Funete Hansen Global Forest Change v1.9 (2000-2021)', style:{fontSize: '9px'}})
toolPanel.add(nota1)
var year_init_titlle=ui.Label('Año de inicio')
toolPanel.add(year_init_titlle)
var year_init=ui.Textbox({
  value: '2020',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }});
toolPanel.add(year_init)
var year_fin_titlle=ui.Label('Año de final')
toolPanel.add(year_fin_titlle)
var year_fin=ui.Textbox({
  value: '2021',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }});
toolPanel.add(year_fin)
var lines=ui.Label('___________________________________________')
toolPanel.add(lines)
var nota=ui.Label({value:'Nota: Esta parte del proceso es solo para el analisis de indices espectrales basado en imagenes Sentinel 2A disponibles desde le 2018', style:{fontSize: '9px'}})
toolPanel.add(nota)
var analysis_tittle = ui.Label('Defina el Período y nubosidad de las imagenes:',tittle_fonts);
toolPanel.add(analysis_tittle)
var label_Start = ui.Label({value:'Inicio:',style: sub_tittle_fonts});
toolPanel.add(label_Start)
var Start_select = ui.Textbox({
  value: '2021-01-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }});
toolPanel.add(Start_select)
var label_End = ui.Label({value:'Final:',style: sub_tittle_fonts});
toolPanel.add(label_End)
var End_select = ui.Textbox({
  value: '2021-12-31',
  style: {width : '90px'},
  onChange: function(text) {
    var End_second = text
  }});
toolPanel.add(End_select)
var label_cloudlevel_select = ui.Label({value:'Nubosidad menor a (5% - 90%):',style: sub_tittle_fonts});
var cloudlevel_select = ui.Slider({
  min: 5,
  max: 90, 
  value: 10, 
  step: 1,
  onChange: function(value) {
    var cloudcover = value
  },style: {width: '180px',fontWeight: 'normal', fontSize: '16px', margin: '10px 5px', backgroundColor:'white',color:'black'}
});
toolPanel.add(label_cloudlevel_select)
toolPanel.add(cloudlevel_select)
var umbral=ui.Textbox({
  value: '-245',
  style: {width : '90px'},
  onChange: function(text) {
    var End_second = text
  }});
var label_umbral =  ui.Label('Defina el valor del umbral de cambio:',tittle_fonts);
toolPanel.add(label_umbral)
toolPanel.add(umbral)
//var support=ui.Label('Soporte',tittle_fonts)
//toolPanel.add(support)
//toolPanel.add(complements.thumb2)
var lines2=ui.Label('___________________________________________')
toolPanel.add(lines2)
var con=ui.Label('Desarrollador:',tittle_fonts)
toolPanel.add(con)
toolPanel.add(text2)
toolPanel.add(complements.mail)
var AddButton = function(){
      var button = ui.Button('Analisar');
      button.style().set({
        position: 'top-right',
        border : '1px solid #000000',
      });
      button.onClick(function(){return analysis()});
      Map.add(button);
}
AddButton(toolPanel);
var panel= ui.Panel();
panel.style().set({
  width: '630px',
  position: 'bottom-left'
});
ui.root.insert(0,panel);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////
function analysis(){
                 Map.clear()
//Years
var Start_second = Start_select.getValue();
var year_next=ee.Date(Start_second)
var year_next_number = (ee.Number.parse(year_next.get("year")).getInfo())-1
var year_next2=ee.Date.fromYMD(
                year_next_number,
                year_next.get('month'),
                year_next.get('day'));
var date_string1 = year_next2.format("YYYY-MM-dd")
var End_second = End_select.getValue();
var year_next_end=ee.Date(End_second)
var year_next_number_end = (ee.Number.parse(year_next_end.get("year")).getInfo())-1
var year_next_end2=ee.Date.fromYMD(
                year_next_number_end,
                year_next_end.get('month'),
                year_next_end.get('day'));
var date_string2 = year_next_end2.format("YYYY-MM-dd")
var cloudcover = cloudlevel_select.getValue()
var areas = ee.FeatureCollection(biosfera_manu);
var filter_a = ee.Filter.inList('Tipo', [countiesDD.getValue()]);
var filteredArea = areas.filter(filter_a);
var ccff_name=countiesDD.getValue()///to the chart name
///mask GWS
{var gwsdataset = GWS.select('max_extent').clip(filteredArea)
            .unmask(0)
var VIS_CHANGE = {
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', 'ffbbbb', '0000ff']
}; 
var gws1=gwsdataset.eq(1)
var gws2=gws1.eq(0)
var gws=gws1.eq(1)}
Map.addLayer(gws.selfMask(),VIS_CHANGE,'GWS').setShown(0)
//sentinel//////////////////////////////////////////////////////
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
var S2_c=ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(Start_second,End_second)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudcover))
                  //.map(maskS2clouds)
                  .filterBounds(filteredArea)
var S2_c2=ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(Start_second,End_second)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudcover))
                  .filterBounds(filteredArea)
                  .map(maskS2clouds)
var S2_c3=ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(year_next2,year_next_end2)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudcover))
                  .filterBounds(filteredArea)
                  .map(maskS2clouds)
var s2_vis = {
  min: 0.0,
  max: 0.3,
 bands: ['B4_p10', 'B3_p10', 'B2_p10'],
  //bands: ['B4', 'B3', 'B2'],
  gamma: 2.1,
};
var earlyvis = {'bands': ['B11_median', 'B8_median', 'B4_median'], 'min':[0.04,0.10,0.05], 'max': [0.25,0.5,0.135]};
var lastvis = {'bands': ['B11_median', 'B8_median', 'B4_median'], 'min':[0.04,0.10,0.05], 'max': [0.25,0.5,0.135]};
//Map.addLayer(S2_c2.median().clip(filteredArea),s2_vis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
//Map.addLayer(S2_c2.reduce(ee.Reducer.percentile([10])).clip(filteredArea),earlyvis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
//Map.addLayer(S2_c.median().clip(filteredArea),s2_vis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
Map.addLayer(S2_c2.reduce(ee.Reducer.median()).clip(filteredArea),earlyvis,'SENTINEL 2 periodo:'+Start_second+" al "+End_second)
Map.addLayer(S2_c3.reduce(ee.Reducer.median()).clip(filteredArea),lastvis,'SENTINEL 2 periodo:'+date_string1.getInfo()+" al "+date_string2.getInfo())
/////////////////////////////////////////////////////////////////////////////////
var earlyNDVI = S2_c2.median().normalizedDifference(['B8','B4']).multiply(1000).toInt();
var lateNDVI = S2_c3.median().normalizedDifference(['B8', 'B4']).multiply(1000).toInt();
var diffBand = lateNDVI.subtract(earlyNDVI).clip(filteredArea);
var NDVI_threshold = ee.Number.parse(umbral.getValue());
//Anything less than or equal to the NDVI threshold is "true", which gives value 1.  Otherwise it's false, with value 0
// We name the band that we create "Change". This will be used later for sampling
var threshBand = diffBand.lte(NDVI_threshold).rename('MapChange');  
var threshBandMasked = threshBand.updateMask(threshBand)
// set up visualization parameters
var threshViz = {min:0, max:1, palette:['000000', '990000']}
// add to the map and clip to the studyarea
Map.addLayer(threshBandMasked.clip(filteredArea).updateMask(gws2), threshViz, 'Umbral de Cambios');
///////////////////////////Forestry Indexes/////////////////////////////////////
var f_CCCI= require('users/jodaurmu/geetools:forestry_indexes_tools/JD_Urquiza_M_CCCI_sentinel');
var f_NDVI= require('users/jodaurmu/geetools:forestry_indexes_tools/JD_Urquiza_M_NDVI_sentinel')
var f_EVI= require('users/jodaurmu/geetools:forestry_indexes_tools/JD_Urquiza_M_EVI_sentinel')
var f_NDWI= require('users/jodaurmu/geetools:forestry_indexes_tools/JD_Urquiza_M_NDWI_sentinel')
var f_SIPI= require('users/jodaurmu/geetools:forestry_indexes_tools/JD_Urquiza_M_SIPI_sentinel')
var mergedCCI = S2_c.map(f_CCCI.f_CCCI);
var mergedNDVI= S2_c.map(f_NDVI.f_NDVI_s);
var mergedNDWI= S2_c.map(f_NDWI.f_NDWI_s);
var mergedEVI= S2_c.map(f_EVI.f_EVI_s);
var mergedSIPI=S2_c.map(f_SIPI.f_sipi_s);
var CCCI_select=mergedCCI.select('CCCI')
var NDVI_select=mergedNDVI.select('NDVI')
var NDWI_select=mergedNDWI.select('NDWI')
var EVI_select=mergedEVI.select('EVI')
var SIPI_select=mergedSIPI.select('SIPI')
///show images
var cccipalette = {
  min: 0,
  max: 1,
palette: ['darkblue','blue','lightblue','lightgreen','green','darkgreen']};
Map.addLayer(CCCI_select.median().clip(filteredArea),cccipalette,'S2- Canopy Chlorophyll Content Index period: '+Start_second+' - '+End_second).setShown(0)
var ndwipalette = {
  min: -0.9,
  max: 0.2,
palette: ['darkgreen','green','lightgreen','lightblue','blue','darkblue']};
Map.addLayer(NDWI_select.median().clip(filteredArea),ndwipalette,'S2-NDWI periodo: '+Start_second+' - '+End_second).setShown(0)
var NDVIpalette = {
  min: 0.0,
  max: 1.0,
palette: ['red','orange','yellow','lightgreen','green','darkgreen']};
Map.addLayer(NDVI_select.median().clip(filteredArea),NDVIpalette,'S2-NDVI periodo: '+Start_second+' - '+End_second).setShown(0)
// Inner join two colection
var innerJoin1 = ee.ImageCollection(complements.simpleJoin.apply(CCCI_select, NDVI_select, complements.filter))//join ccci and ndvi
var innerJoin2 = ee.ImageCollection(complements.simpleJoin.apply(NDWI_select, EVI_select, complements.filter))//join ndwi and mos
var joined1 = innerJoin1.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));})///join first group
var joined2 = innerJoin2.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
})//join second group
var innerJoin = ee.ImageCollection(complements.simpleJoin.apply(joined1, joined2, complements.filter))
var joined = innerJoin.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
})
var innerJoin3=ee.ImageCollection(complements.simpleJoin.apply(joined, SIPI_select, complements.filter))
var joined3 = innerJoin3.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
})
///////////////////////////end Forestry indexes////////////////////////////////////////////////
//////////////////////////Soil Indexes///////////////////////
var f_soil= require('users/jodaurmu/geetools:soil_indexes/JD_Urquiza_M_soil_indexes_sentinel')
var Mospalette = {
  min: 0.0,
  max: 1.0,
palette: ['darkblue','blue','lightblue', 'yellow','red']};
//Map.addLayer(Mos_in_select.median().clip(filteredArea),Mospalette,'S2-Moisture index period: '+Start_second+' - '+End_second)
var mergedMosi = S2_c.map(f_soil.f_Mos_in);
var mergedSCI = S2_c.map(f_soil.f_sci);
var MOS_select=mergedMosi.select('Mos_in')
var SCI_select=mergedSCI.select('SCI')
var s_innerJoin1 = ee.ImageCollection(complements.simpleJoin.apply(MOS_select, SCI_select, complements.filter))//join ccci and ndvi
var s_joined1 = s_innerJoin1.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));})///join first group
////////////////End of soil index///////////////////////////////////////////////////////////
////////////////////topo and landforms
// Load the SRTM image.
var srtm = ee.Image('USGS/SRTMGL1_003').select('elevation');
var elev_min= srtm.reduceRegion( {reducer: ee.Reducer.min(),  geometry: filteredArea,  scale: 30,  maxPixels: 1e9})
var elev_max= srtm.reduceRegion( {reducer: ee.Reducer.max(),  geometry: filteredArea,  scale: 30,  maxPixels: 1e9})
// Apply an algorithm to an image.
var slope = ee.Terrain.slope(srtm).clip(filteredArea)
// Get the aspect (in degrees).
var aspect = ee.Terrain.aspect(srtm).clip(filteredArea);
// Convert to radians, compute the sin of the aspect.
var sinImage = aspect.divide(180).multiply(Math.PI).sin();
// Display the result.
var viz_elev = {
  min: elev_min.get('elevation').getInfo(),
  max: elev_max.get('elevation').getInfo(),
  palette: ['blue','006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff' ]};
var viz_slp = {
  min: 0,
  max: 90,
  palette: ['green','orange','red'  ]};
Map.addLayer(srtm.clip(filteredArea), viz_elev, 'Elevation').setShown(0)
Map.addLayer(slope.clip(filteredArea), viz_slp, 'slope').setShown(0)
Map.addLayer(sinImage.clip(filteredArea), {min: -1, max: 1,opacity:0.1}, 'Aspect').setShown(0);
var xxx= elev_min.get('elevation').getInfo()
////////BIOMASS////////////
var agb = ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1").select('agb').mosaic().clip(filteredArea);
var bgb = ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1").select('bgb').mosaic().clip(filteredArea)
var biom_vis = {
  bands: ['agb'],
  min: 0.0,
  max:150.0,
  palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']
};
var biom_vis2 = {
  bands: ['bgb'],
  min: 0.0,
  max:150.0,
  palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']
};
Map.addLayer(agb, biom_vis, "Bioamasa aerea").setShown(0);
Map.addLayer(bgb,  biom_vis2, "Biomasa bajo el suelo").setShown(0);
//////activity data
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 21,
  palette: ['yellow', 'red']
};
Map.addLayer(hansen.clip(filteredArea).updateMask(gws2), treeLossVisParam, 'Pérdida de bosques historicos').setShown(0);
////Soil Properties
var phH2O = ee.Image("projects/soilgrids-isric/phh2o_mean").clip(filteredArea);
var river_dataset = ee.Image("MERIT/Hydro_reduced/v1_0_1").clip(filteredArea);
var river_vis = {
  bands: 'wth',
  min: 0,
  max: 400
};
//Map.addLayer(river_dataset, river_vis, "Anchura del río");
//Map.addLayer(loss.updateMask(loss).clip(filteredArea),
  //  {palette: ['FF0000']}, 'Perdida');
//Map.addLayer(gain.updateMask(gain).clip(filteredArea),
    //{palette: ['0000FF']}, 'Ganancia');
//Map.addLayer(gainAndLoss.updateMask(gainAndLoss).clip(filteredArea),
  //  {palette: 'FF00FF'}, 'Areas dinamica');
//////////////////////////////////////////////////////////////////////////////////////////////
var AddButton = function(){
  panel.clear()
      var button = ui.Button('Analisis');
      button.style().set({
        position: 'top-right',
        border : '1px solid #000000',
      });
      button.onClick(function(){return analysis()});
      Map.add(button);
}
AddButton(toolPanel);
var title = ui.Label('Click para analizar');
title.style().set('position', 'top-center');
Map.add(title);
// Register a function to draw a chart when a user clicks on the map.   https://developers.google.com/earth-engine/guides/charts_style
var f_graficos= require('users/jodaurmu/geetools:graphics/JD_Urquiza_graficos_manu')
var label_def_title= ui.Label('Descripcion');
panel.widgets().set(0, label_def_title)
var gfc2021 =hansen.clip(filteredArea)
//Map.addLayer(gfc2021,treeLossVisParam ,"tree loss").setShown(0);
var lossImage = gfc2021.select(['loss']);
var lossAreaImage = lossImage.multiply(ee.Image.pixelArea()).divide(10000);
var lossYear=gfc2021.select(['lossyear'])
var lossByYear = lossAreaImage.addBands(lossYear).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: filteredArea,
  scale: 30,
  maxPixels: 1e9
});
var statsFormatted = ee.List(lossByYear.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("20%02d"), d.get('sum')];
  });
var statsDictionary = ee.Dictionary(statsFormatted.flatten());
var defor_chart = ui.Chart.array.values({
  array: statsDictionary.values(),
  axis: 0,
  xLabels: statsDictionary.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Pérdida anual de bosques en la zona de '+ccff_name,
    titleTextStyle:{color:'black'},
    hAxis: {title: 'Año', format: '####', titleTextStyle: {italic: false, bold: true,color: 'black'},textStyle: {italic: false, bold: true,color: 'black',fontSize: 12}},
    orientation: 'horizontal',//vertical
    vAxis: {title: 'Area (hectareas)',titleTextStyle: {italic: false, bold: true,color: 'black'}, textStyle: {italic: false, bold: true,color: 'black'}},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3,
  });
panel.widgets().set(1, defor_chart)
var dif1=year_init.getValue()-2000
print(dif1)
var dif2=year_fin.getValue()-2000
print(dif2)
var gfc2021_loss=gfc2021.select('lossyear')
var gfc2021_anos= gfc2021_loss.gte(dif1).and(gfc2021_loss.lte(dif2))
print(gfc2021_anos)
//var gfc2021_anos= gfc2021_loss.eq(ee.Image(dif1))
           // .and(gfc2021_loss.eq(ee.Image(dif2)))
var treeLossVisParam2 = {
  min: dif1,
  max: dif2,
  palette: ['yellow', 'red']
};
Map.addLayer(gfc2021_anos.selfMask(), {palette: ['#11FF77']}, 'Pérdida de bosques (años seleccionados)').setShown(0);
var gfc2021_selected=gfc2021_anos.selfMask().multiply(ee.Image.pixelArea()).divide(10000)
var lossByYear_selected = gfc2021_selected.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: filteredArea,
  scale: 30,
  maxPixels: 1e9
});
var percent_manu=((lossByYear_selected.get('lossyear').getInfo().toFixed(2)*100)/filteredArea.aggregate_sum('area_ha').getInfo()).toFixed(2)
var descrip_all=ui.Label('El area de perdida de bosque en la zona de "'+ ccff_name+'" para el periodo '+year_init.getValue()+'-'+year_fin.getValue()+
                          ' fue de  '+ lossByYear_selected.get('lossyear').getInfo().toFixed(2) +' hectareas, que representa el '+ 
                          percent_manu+'% del area total de la zona de '+ccff_name)
panel.widgets().set(2, descrip_all)
var anos=(year_fin.getValue()-year_init.getValue())+1
var tasa=(lossByYear_selected.get('lossyear').getInfo()/anos).toFixed(2)
print(tasa)
var tasa_des= ui.Label('La tasa de perdida de bosques fue de '+tasa+' hectareas anuales durante el periodo '+year_init.getValue()+'-'+year_fin.getValue())
panel.widgets().set(3, tasa_des)
Map.onClick(function(coords) {
  panel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var point_geo = point.coordinates();
  var label_cor=ui.Label('Coord: '+'Lat:'+coords.lat.toFixed(3)+ '/ Lon:'+coords.lon.toFixed(3));
  var srtm_value=srtm.reduceRegion(ee.Reducer.first(), point, 30)
  var slp_value=slope.reduceRegion(ee.Reducer.first(), point, 30)
  var asp_value=aspect.reduceRegion(ee.Reducer.first(), point, 30)
  var agb_value=agb.reduceRegion(ee.Reducer.first(), point, 30)
  var agb_value_r=ee.Number(agb_value).round()
  var bgb_value=bgb.reduceRegion(ee.Reducer.first(), point, 30)
  var pH_value=phH2O.reduceRegion(ee.Reducer.first(),point,30)
  var label_elev=ui.Label('Elevación: '+srtm_value.get('elevation').getInfo().toFixed(0)+' m a.s.l.   '+'   Pendiente: '+slp_value.get('slope').getInfo().toFixed(0)+'°'+'   Aspect: '+asp_value.get('aspect').getInfo().toFixed(0)+'°');
  var label_biomass=ui.Label('Biomasa Arerea: '+agb_value.get('agb').getInfo().toFixed(2)+' Mg C/ha.    / '+' Biomasa bajo suelo: '+bgb_value.get('bgb').getInfo().toFixed(2)+' Mg C/ha');
  var label_pH=ui.Label('pH de suelo'+pH_value.get('phh2o_0-5cm_mean').getInfo())
   var chart2 =
    ui.Chart.image
        .series({
          imageCollection: joined3,
          region: point,
          reducer: ee.Reducer.median(),
          scale: 300,
          xProperty: 'system:time_start'
        })
        .setChartType('ScatterChart')
        .setOptions({
          title: 'Indices de vegetacion: '+' - Nubosidad inferior a '+cloudcover,
          dataOpacity: 0.5,
          chartArea: {backgroundColor: 'EBEBEB'},
          subtitle: 'hola',
          explorer: {},
          hAxis: {title: 'Fecha', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Values',
            titleTextStyle: {italic: false, bold: true}
          },
          //lineWidth: 5,
          colors: ['#03ff02', '#00abff','#074632','blue'],
          lineWidth: 1,
          pointSize: 3,
        });
  var chart3 =
    ui.Chart.image
        .series({
          imageCollection: s_joined1,
          region: point,
          reducer: ee.Reducer.median(),
          scale: 300,
          xProperty: 'system:time_start'
        })
        .setChartType('ScatterChart')
        .setOptions({
          title: 'Indices de suelo: '+' - Nubosidad inferior a '+cloudcover,
          dataOpacity: 0.5,
          chartArea: {backgroundColor: 'EBEBEB'},
          explorer: {},
          hAxis: {title: 'Fecha', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Values',
            titleTextStyle: {italic: false, bold: true}
          },
          //lineWidth: 5,
          colors: ['#03ff02', '#00abff','#074632','blue'],
          lineWidth: 1,
          pointSize: 3,
                  });
panel.widgets().set(4,label_cor)
panel.widgets().set(5,label_elev)
panel.widgets().set(6,label_biomass)
panel.widgets().set(7,label_pH)
//panel.add(chart)
panel.widgets().set(8,chart2)
panel.widgets().set(9,chart3)
var dot = ui.Map.Layer(point, {color: 'red'}, 'Punto de analisis');
  Map.layers().set(14, dot);
// Add NDVI band to image collection
//////plot NDVI time series
var S2=ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2017-01-01','2022-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  //.map(maskS2clouds)
                  //.median
// Function to calculate and add an NDVI band
var addNDVI_s2 = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
};
// Add NDVI band to image collection
var S22 = S2.map(addNDVI_s2);
var plotNDVI_manu = ui.Chart.image.series({imageCollection:S22.select('NDVI'),region:point,scale:300,xProperty:'system:time_start'})
              .setChartType('LineChart').setOptions({
                title: 'Serie de tiempo historico de NDVI Sentinel SR',
                hAxis: {title: 'Fecha'},
                vAxis: {title: 'NDVI'},
                lineWidth: 1,
                pointSize: 3,
});
var space_text33=ui.Label()
panel.add(space_text33)
panel.add(plotNDVI_manu)
  });
//////////base map
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('satellite', {'baseChange': baseChange});
Map.centerObject(filteredArea);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}//end function