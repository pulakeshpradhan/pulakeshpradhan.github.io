var hansen = ui.import && ui.import("hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2020_v1_8"
    }) || ee.Image("UMD/hansen/global_forest_change_2020_v1_8"),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/jodaurmu/logos/forest_connected_modified"
    }) || ee.Image("users/jodaurmu/logos/forest_connected_modified"),
    logo2 = ui.import && ui.import("logo2", "image", {
      "id": "users/jodaurmu/logos/logos_modified"
    }) || ee.Image("users/jodaurmu/logos/logos_modified"),
    depa = ui.import && ui.import("depa", "table", {
      "id": "users/jodaurmu/DEPARTAMENTOS"
    }) || ee.FeatureCollection("users/jodaurmu/DEPARTAMENTOS"),
    ccff = ui.import && ui.import("ccff", "table", {
      "id": "users/jodaurmu/concesion_forestal_osinfor_geogpsperu"
    }) || ee.FeatureCollection("users/jodaurmu/concesion_forestal_osinfor_geogpsperu");
var ccff = ee.FeatureCollection(ccff)
Map.centerObject(ccff);
//var depa = ee.FeatureCollection(depa);
var filter = ee.Filter.inList('DEPARTAMEN', ['AMAZONAS','CUSCO','HUANUCO','JUNIN','LA LIBERTAD','LORETO','MADRE DE DIOS','PASCO','UCAYALI','SAN MARTIN']);
var filteredArea = depa.filter(filter);
Map.addLayer(filteredArea, {color: 'green'}, 'DEPARTAMENTO AMAZONICOS');
var logo = logo.visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1142x380',
        format: 'png'
        },
    style: {height: '100px', width: '310px',padding :'0'}
    });
var logo2 = logo2.visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb2 = ui.Thumbnail({
    image: logo2,
    params: {
        dimensions: '1142x380',
        format: 'png'
        },
    style: {height: '200px', width: '310px',padding :'0'}
    });
//////////FONTS//////
var header_fonts={fontSize: '20px', fontWeight:'bold',fontFamily:'Helvetica',backgroundColor:'#06360d',color: 'darkgreen',textAlign:'center'}
var tittle_fonts={textAlign:'left',fontWeight: 'bold', fontSize: '16px', margin: '10px 5px', backgroundColor:'#06360d',color:'white'}
var sub_tittle_fonts={fontWeight: 'normal', fontSize: '16px', margin: '10px 5px', backgroundColor:'#06360d',color:'white'}
var text_fonts={fontSize: '10px',fontWeight: 'italic',fontFamily:'Helvetica',backgroundColor:'#06360d',color:'white',textAlign:"justify"}
////////////////
///////////////////////////PANEL/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Forest Explorer: Concesions', header_fonts);
var text = ui.Label('Esta herramienta analisa indices derivados de Sentinel 2 Level-2A (orthorectified atmospherically corrected surface reflectance) dentro de las Concesiones Forestales del Peru. Disponibilidad de imagens desde: 2017-03-28 - Actualidad".',
    text_fonts);
var text2 = ui.Label(
    'J. David Urquiza-Muñoz*',sub_tittle_fonts);
var text3= ui.Label('This tool run based on Sentinel Level-2A orthorectified atmospherically corrected surface reflectance of Sentinel 2.Dataset availability: 2017-03-28 – Present',  text_fonts  );
var text4=ui.Label('Index legend: CCCI=Canopy Chlorophyll Content Index, Moisture: Moisture index, NDVI: normalized difference vegetation index,NDWI:Normalized difference water index',
    text_fonts);
//Logos
var logoAll=ui.Chart([['<img src=https://fcfunap.files.wordpress.com/2020/10/image-3.png width=290px heigth=300px>']],
  'Table',{allowHtml:true})
var mail = ui.Label('*jurquiza@bgc-jena.mpg.de - david.urquiza@forestdataconect.com', {color:'blue',backgroundColor:'#06360d'},'https://www.bgc-jena.mpg.de/~jurquiza/');
var ref = ui.Label('*Description and references', {color:'blue',backgroundColor:'#06360d'},'https://docs.google.com/document/d/1JGoAhWbhMaZQLG5XdhDw_OGbeOvJyTAhXYPfTvnjVUU/edit?usp=sharing');
var logoAll2=ui.Chart([['<h6align="center">Support:</h6>'],
['<img src=https://www.bgc-jena.mpg.de/~jurquiza/Windthrow_app/logos.jpg width=290px heigth=50px horizontal-align:middle>'],
//['<img src=https://www.unapiquitos.edu.pe/images/escudo.png width=50px heigth=500px>'],
//['<img src=https://www.theorangutanproject.org/static/media/uploads/logo/fzs.png width=100px heigth=100px horizontal-align:middle>'], 
//['<img src=https://www.bgc-jena.mpg.de/farm/BGC/MPI-BGC_logo_EN.png width=200px heigth=500px>'],
  ],'Table',{allowHtml:true})
var toolPanel = ui.Panel([header,thumb,text2,mail,text],'flow', {width: '340px', padding:'1px',backgroundColor:'#06360d'});
ui.root.insert(1,toolPanel)
//////////base map
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('satellite', {'baseChange': baseChange});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Site
var site_tittle = ui.Label('Seleccione :',tittle_fonts);
toolPanel.add(site_tittle)
var depaNames = filteredArea.aggregate_array('DEPARTAMEN')
var getdpto = function(state) {
  // Given a state get all counties
  var feat = ee.Feature(filteredArea.filterMetadata('DEPARTAMEN', 'equals', state).first())
  var statefp = ee.String(feat.get('DEPARTAMEN'))
  var filteredCounties = ccff.filterMetadata('Dpto', 'equals', statefp)
  var filteredCountiesNames = filteredCounties.aggregate_array('Contrato')
  return ee.List(filteredCountiesNames)
}
// Empty Dropdowns
var statesDD = ui.Select([], 'Cargando..')
var countiesDD = ui.Select([], 'esperando departamento..')
// Load states
depaNames.evaluate(function(states){
  statesDD.items().reset(states)
  statesDD.setPlaceholder('Departamento')
  statesDD.onChange(function(state){
    // once you select a state (onChange) get all counties and fill the dropdown
    countiesDD.setPlaceholder('cargando...')
    var counties = getdpto(state)
    counties.evaluate(function(countiesNames){
      countiesDD.items().reset(countiesNames)
      countiesDD.setPlaceholder('Concesion')
    })
  })
})
var add = ui.Button('agregar Concesion')
add.onClick(function(){
  var name = countiesDD.getValue()
  var county = ee.Feature(ccff.filterMetadata('Contrato', 'equals', name).first())
  Map.addLayer(county, {color: 'red'}, name)
})
var name2 = countiesDD.getValue()
  var county2 = ee.Feature(ccff.filterMetadata('Contrato', 'equals', name2).first())
toolPanel.add(statesDD)
toolPanel.add(countiesDD)
toolPanel.add(add)
var analysis_tittle = ui.Label('Defina el Período y nubosidad de las imagenes:',tittle_fonts);
toolPanel.add(analysis_tittle)
var label_Start = ui.Label({value:'Inicio:',style: sub_tittle_fonts});
toolPanel.add(label_Start)
var Start_select = ui.Textbox({
  value: '2019-01-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }});
toolPanel.add(Start_select)
var label_End = ui.Label({value:'Final:',style: sub_tittle_fonts});
toolPanel.add(label_End)
var End_select = ui.Textbox({
  value: '2019-12-31',
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
  },style: {fontWeight: 'normal', fontSize: '16px', margin: '10px 5px', backgroundColor:'#06360d',color:'white',width: '180px'}
      });
toolPanel.add(label_cloudlevel_select)
toolPanel.add(cloudlevel_select)
toolPanel.add(text4)
toolPanel.add(ref)
//toolPanel.add(text3)
toolPanel.add(thumb2)
var AddButton = function(){
      var button = ui.Button('Run');
      button.style().set({
        position: 'top-center',
        border : '1px solid #000000',
      });
      button.onClick(function(){return analysis()});
      Map.add(button);
}
AddButton(toolPanel);
var title = ui.Label('Click to inspect');
title.style().set('position', 'top-center');
//Map.add(title);
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-left'
});
ui.root.insert(0,panel)
var title = ui.Label('Click to inspect');
title.style().set('position', 'top-center');
panel.add(title)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////
function analysis(){
//var sensor0=Sensor.getValue()
                 Map.clear()
//Years
var Start_second = Start_select.getValue();
    var Start_second_number = ee.Number.parse(Start_second.replace(/-/g,'')).getInfo()
var End_second = End_select.getValue();
    var End_second_number = ee.Number.parse(End_second.replace(/-/g,'')).getInfo();
var cloudcover = cloudlevel_select.getValue()
var areas = ee.FeatureCollection(ccff);
var filter_a = ee.Filter.inList('Contrato', [countiesDD.getValue()]);
var filteredArea = areas.filter(filter_a);
var ccff_name=countiesDD.getValue()///to the chart name
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
print('amount of images',S2_c)
var s2_vis = {
  min: 0.0,
  max: 0.3,
 bands: ['B4_p10', 'B3_p10', 'B2_p10'],
  //bands: ['B4', 'B3', 'B2'],
  gamma: 2.1,
};
//Map.addLayer(S2_c2.median().clip(filteredArea),s2_vis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
Map.addLayer(S2_c2.reduce(ee.Reducer.percentile([10])).clip(filteredArea),s2_vis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
//Map.addLayer(S2_c.median().clip(filteredArea),s2_vis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
////////////////////////////////////////////////////////
///////////////////////////Forestry Indexes/////////////////////////////////////
var f_CCCI = function (image){
  return image.expression(
    '((B8 - B5)/(B8 + B5))/((B8-B4)/(B8+B4))', 
    {'B4': image.select('B4'),
    'B5': image.select('B5'),
      'B8': image.select('B8')}).rename('CCCI').copyProperties(image, image.propertyNames());
};
var f_NDVI_s = function(image) {
  return image.expression(
    '(NIR - RED) / (NIR + RED)', 
    {
      'NIR': image.select('B8'), 
      'RED': image.select('B4'), 
    }).rename('NDVI').copyProperties(image, image.propertyNames());
};
var f_EVI_s=function(image) {
  return image.expression(
    '2.5 * (B8 - B4) / (B8 + 6*B4-7.5* B2 + 1.0)', 
    {
      'B8': image.select('B8'), 
      'B4': image.select('B4'), 
      'B2':image.select('B2'),
    }).rename('EVI').copyProperties(image, image.propertyNames());
};///https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=576
var f_NDWI_s = function (image){
  return image.expression(
    '(B3 - B8)/(B3 + B8)', 
    {'B3': image.select('B3'),
      'B8': image.select('B8')}).rename('NDWI').copyProperties(image, image.propertyNames());
};
var f_sipi_s=function (image){
  return image.expression(
    '(B8 - B1) / (B8 - B4)', 
    {'B8': image.select('B8'),
      'B1': image.select('B1'),
      'B4': image.select('B4')}).rename('SIPI').copyProperties(image, image.propertyNames());
};
var mergedCCI = S2_c.map(f_CCCI);
var mergedNDVI= S2_c.map(f_NDVI_s);
var mergedNDWI= S2_c.map(f_NDWI_s);
var mergedEVI= S2_c.map(f_EVI_s);
var mergedSIPI=S2_c.map(f_sipi_s);
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
Map.addLayer(NDWI_select.median().clip(filteredArea),ndwipalette,'S2-NDWI period: '+Start_second+' - '+End_second).setShown(0)
var NDVIpalette = {
  min: 0.0,
  max: 1.0,
palette: ['red','orange','yellow','lightgreen','green','darkgreen']};
Map.addLayer(NDVI_select.median().clip(filteredArea),NDVIpalette,'S2-NDVI period: '+Start_second+' - '+End_second).setShown(0)
///////////////////////
///combine tw colectionbased in date/////
var filter = ee.Filter.equals({
  leftField: 'system:time_start',
  rightField: 'system:time_start'
});
// Create the join.
var simpleJoin = ee.Join.inner();
// Inner join two colection
var innerJoin1 = ee.ImageCollection(simpleJoin.apply(CCCI_select, NDVI_select, filter))//join ccci and ndvi
var innerJoin2 = ee.ImageCollection(simpleJoin.apply(NDWI_select, EVI_select, filter))//join ndwi and mos
print('inner',innerJoin1)
var joined1 = innerJoin1.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));})///join first group
print('joined1',joined1)
var joined2 = innerJoin2.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
})//join second group
var innerJoin = ee.ImageCollection(simpleJoin.apply(joined1, joined2, filter))
var joined = innerJoin.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
})
var innerJoin3=ee.ImageCollection(simpleJoin.apply(joined, SIPI_select, filter))
var joined3 = innerJoin3.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
})
print('Joined', joined)
///////////////////////////end Forestry indexes////////////////////////////////////////////////
//////////////////////////Soil Indexes///////////////////////
var f_Mos_in = function (image){
  return image.expression(
    '(B8A - B11)/(B8A + B11)', 
    {'B8A': image.select('B8A'),
      'B11': image.select('B11')}).rename('Mos_in').copyProperties(image, image.propertyNames());
};
var Mospalette = {
  min: 0.0,
  max: 1.0,
palette: ['darkblue','blue','lightblue', 'yellow','red']};
//Map.addLayer(Mos_in_select.median().clip(filteredArea),Mospalette,'S2-Moisture index period: '+Start_second+' - '+End_second)
var f_sci = function(image){
  return image.expression(
    '(B11 - B8) / (B11 + B8)', 
    {'B8': image.select('B8'),
      'B11': image.select('B11')}).rename('SCI').copyProperties(image, image.propertyNames());
};
var mergedMosi = S2_c.map(f_Mos_in);
var mergedSCI = S2_c.map(f_sci);
var MOS_select=mergedMosi.select('Mos_in')
var SCI_select=mergedSCI.select('SCI')
var s_innerJoin1 = ee.ImageCollection(simpleJoin.apply(MOS_select, SCI_select, filter))//join ccci and ndvi
var s_joined1 = s_innerJoin1.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));})///join first group
print('s_joined1',s_joined1)
////////////////End of soil index///////////////////////////////////////////////////////////
////////////////////topo and landforms
// Load the SRTM image.
var srtm = ee.Image('USGS/SRTMGL1_003').select('elevation');
var elev_min= srtm.reduceRegion( {reducer: ee.Reducer.min(),  geometry: filteredArea,  scale: 30,  maxPixels: 1e9})
print(elev_min,'ele_min')
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
  palette: ['blue','#5f6339','green','#38ed0e'  ]};
var viz_slp = {
  min: 0,
  max: 90,
  palette: ['green','orange','red'  ]};
Map.addLayer(srtm.clip(filteredArea), viz_elev, 'Elevation').setShown(1)
Map.addLayer(slope.clip(filteredArea), viz_slp, 'slope').setShown(0)
Map.addLayer(sinImage.clip(filteredArea), {min: -1, max: 1,opacity:0.1}, 'Aspect').setShown(1);
var xxx= elev_min.get('elevation').getInfo()
print(xxx,'xxx')
////////BIOMASS////////////
var agb = ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1").select('agb').mosaic().clip(filteredArea);
var bgb = ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1").select('bgb').mosaic().clip(filteredArea)
var biom_vis = {
  bands: ['agb'],
  min: 0.0,
  max:150.0,
  palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']
};
Map.addLayer(agb, biom_vis, "Aboveground biomass carbon").setShown(0);
Map.addLayer(bgb, {}, "Belowground biomass carbon").setShown(0);
//////activity data
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 20,
  palette: ['yellow', 'red']
};
Map.addLayer(hansen.clip(filteredArea), treeLossVisParam, 'tree loss year');
////Soil Properties
var phH2O = ee.Image("projects/soilgrids-isric/phh2o_mean").clip(filteredArea);
//Map.addLayer(loss.updateMask(loss).clip(filteredArea),
  //  {palette: ['FF0000']}, 'Perdida');
//Map.addLayer(gain.updateMask(gain).clip(filteredArea),
    //{palette: ['0000FF']}, 'Ganancia');
//Map.addLayer(gainAndLoss.updateMask(gainAndLoss).clip(filteredArea),
  //  {palette: 'FF00FF'}, 'Areas dinamica');
//////////////////////////////////////////////////////////////////////////////////////////////
var AddButton = function(){
      var button = ui.Button('Run');
      button.style().set({
        position: 'top-center',
        border : '1px solid #000000',
      });
      button.onClick(function(){return analysis()});
      Map.add(button);
}
AddButton(toolPanel);
// Register a function to draw a chart when a user clicks on the map.   https://developers.google.com/earth-engine/guides/charts_style
Map.onClick(function(coords) {
  panel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var point_geo = point.coordinates();
  var label_cor=ui.Label('Coord: '+point_geo.getInfo());
  var srtm_value=srtm.reduceRegion(ee.Reducer.first(), point, 30)
  var slp_value=slope.reduceRegion(ee.Reducer.first(), point, 30)
  var asp_value=aspect.reduceRegion(ee.Reducer.first(), point, 30)
  var agb_value=agb.reduceRegion(ee.Reducer.first(), point, 30)
  var agb_value_r=ee.Number(agb_value).round()
  var bgb_value=bgb.reduceRegion(ee.Reducer.first(), point, 30)
  var pH_value=phH2O.reduceRegion(ee.Reducer.first(),point,30)
  var label_elev=ui.Label('Elevación: '+srtm_value.get('elevation').getInfo().toFixed(0)+' m a.s.l.   '+'   Pendiente: '+slp_value.get('slope').getInfo().toFixed(0)+'°'+'   Aspect: '+asp_value.get('aspect').getInfo().toFixed(0)+'°');
  var label_biomass=ui.Label('Aboveground biomass carbon: '+agb_value.get('agb').getInfo().toFixed(2)+' Mg C/ha.    / '+' Belowground biomass carbon: '+bgb_value.get('bgb').getInfo().toFixed(2)+' Mg C/ha');
  var label_pH=ui.Label('Soil pH '+pH_value.get('phh2o_0-5cm_mean').getInfo())
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
          title: 'Vegetation indexes: '+ccff_name+' - Cloud cover less than '+cloudcover,
          dataOpacity: 0.5,
          chartArea: {backgroundColor: 'EBEBEB'},
          subtitle: 'hola',
          explorer: {},
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Values',
            titleTextStyle: {italic: false, bold: true}
          },
          //lineWidth: 5,
          colors: ['#03ff02', '#00abff','#074632','blue']});
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
          title: 'Soil indexes: '+ccff_name+' - Cloud cover less than '+cloudcover,
          dataOpacity: 0.5,
          chartArea: {backgroundColor: 'EBEBEB'},
          explorer: {},
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Values',
            titleTextStyle: {italic: false, bold: true}
          },
          //lineWidth: 5,
          colors: ['#03ff02', '#00abff','#074632','blue']
                  });
panel.add(label_cor)
panel.add(label_elev)
panel.add(label_biomass)
panel.add(label_pH)
//panel.add(chart)
panel.add(chart2)
panel.add(chart3)
var S2=ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2017-01-01','2021-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
                  //.map(maskS2clouds)
                  .filterBounds(filteredArea)
                  //.median
var filteredIC = S2.sort('CLOUD_COVER')
// Function to calculate and add an NDVI band
//var addNDVI_s2 = function(image) {
//return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'))
//.addBands(image.metadata('system:time_start').divide(1e18).rename('time'));
//};
var addNDVI_s2 = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
};
// Function to smooth time series
// stacks windows of linear regression results
// requires that a variable 'data' exists with NDVI and time bands
//function smoother(t){
  // helper function to apply linear regression equation
  //function applyFit(img){
  //    return img.select('time').multiply(fit.select('scale')).add(fit.select('offset'))
   //           .set('system:time_start',img.get('system:time_start')).rename('NDVI');
 // }
 // t = ee.Date(t);
 // var window = S2_ndvi.filterDate(t.advance(-windowSize,'day'),t.advance(windowSize,'day'));
 // var fit = window.select(['time','NDVI'])
 //   .reduce(ee.Reducer.linearFit());
 // return window.map(applyFit).toList(5);
//}
// function to reduce time stacked linear regression results
// requires that a variable 'fitIC' exists from the smooter function
//function reduceFits(t){
 // t = ee.Date(t);
//  return fitIC.filterDate(t.advance(-windowSize,'day'),t.advance(windowSize,'day'))
 //             .mean().set('system:time_start',t.millis()).rename('NDVI');
//}
// Add NDVI band to image collection
var S2_ndvi = S2.map(addNDVI_s2);
print(S2_ndvi,'S2')
//var dates = ee.List(S2_ndvi.aggregate_array('system:time_start'));
//var windowSize = 30; //days on either side
//var fitIC = ee.ImageCollection(dates.map(smoother).flatten());
//var smoothed = ee.ImageCollection(dates.map(reduceFits));
// merge original and smoothed data into one image collection for plotting
//var joined_ndvi = ee.ImageCollection(smoothed.select(['NDVI'],['smoothed'])
  //              .merge(S2_ndvi.select(['NDVI'],['original'])));
 var plotNDVI_atto = ui.Chart.image.series({imageCollection:S2_ndvi.select('NDVI'),region:point,scale:10,xProperty:'system:time_start'})
              .setChartType('ScatterChart').setOptions({
                title: 'NDVI historic-term Sentinel SR time series (from 01-2019 to most recent image)',
                hAxis: {title: 'Date'},
                vAxis: {title: 'NDVI'},
                lineWidth: 1,
                pointSize: 3,
});
var space_text33=ui.Label()
panel.add(space_text33)
panel.add(plotNDVI_atto)
 // Load a collection of Landsat TOA reflectance images.
var landsatCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// Set the region of interest to a point.
var roi = point;
// The dependent variable we are modeling.
var dependent = 'NDVI';
// The number of cycles per year to model.
var harmonics = 1;
// Make a list of harmonic frequencies to model.
// These also serve as band name suffixes.
var harmonicFrequencies = ee.List.sequence(1, harmonics);
// Function to get a sequence of band names for harmonic terms.
var constructBandNames = function(base, list) {
  return ee.List(list).map(function(i) {
    return ee.String(base).cat(ee.Number(i).int());
  });
};
// Construct lists of names for the harmonic terms.
var cosNames = constructBandNames('cos_', harmonicFrequencies);
var sinNames = constructBandNames('sin_', harmonicFrequencies);
// Independent variables.
var independents = ee.List(['constant', 't'])
  .cat(cosNames).cat(sinNames);
// Function to mask clouds in Landsat 8 imagery.
var maskClouds = function(image) {
  var score = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  var mask = score.lt(10);
  return image.updateMask(mask);
};
// Function to add an NDVI band, the dependent variable.
var addNDVI = function(image) {
  return image
    .addBands(image.normalizedDifference(['B5', 'B4'])
    .rename('NDVI'))
    .float();
};
// Function to add a time band.
var addDependents = function(image) {
  // Compute time in fractional years since the epoch.
  var years = image.date().difference('1970-01-01', 'year');
  var timeRadians = ee.Image(years.multiply(2 * Math.PI)).rename('t');
  var constant = ee.Image(1);
  return image.addBands(constant).addBands(timeRadians.float());
};
// Function to compute the specified number of harmonics
// and add them as bands.  Assumes the time band is present.
var addHarmonics = function(freqs) {
  return function(image) {
    // Make an image of frequencies.
    var frequencies = ee.Image.constant(freqs);
    // This band should represent time in radians.
    var time = ee.Image(image).select('t');
    // Get the cosine terms.
    var cosines = time.multiply(frequencies).cos().rename(cosNames);
    // Get the sin terms.
    var sines = time.multiply(frequencies).sin().rename(sinNames);
    return image.addBands(cosines).addBands(sines);
  };
};
// Filter to the area of interest, mask clouds, add variables.
var harmonicLandsat = landsatCollection
  .filterBounds(roi)
  .map(maskClouds)
  .map(addNDVI)
  .map(addDependents)
  .map(addHarmonics(harmonicFrequencies));
// The output of the regression reduction is a 4x1 array image.
var harmonicTrend = harmonicLandsat
  .select(independents.add(dependent))
  .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Turn the array image into a multi-band image of coefficients.
var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Compute fitted values.
var fittedHarmonic = harmonicLandsat.map(function(image) {
  return image.addBands(
    image.select(independents)
      .multiply(harmonicTrendCoefficients)
      .reduce('sum')
      .rename('fitted'));
});
var chart_ts=ui.Chart.image.series(fittedHarmonic.select(['fitted','NDVI']), roi, ee.Reducer.mean(), 30)
    .setOptions({
      title: 'Landsat 8 (TOA) NDVI Harmonic model: original and fitted values (01-04-2013 to most recent image)',
      lineWidth: 1,
      pointSize: 3,});
// Pull out the three bands we're going to visualize.
var sin = harmonicTrendCoefficients.select('sin_1');
var cos = harmonicTrendCoefficients.select('cos_1');
// Do some math to turn the first-order Fourier model into
// hue, saturation, and value in the range[0,1].
var magnitude = cos.hypot(sin).multiply(5);
var phase = sin.atan2(cos).unitScale(-Math.PI, Math.PI);
var val = harmonicLandsat.select('NDVI').reduce('mean');
// Turn the HSV data into an RGB image and add it to the map.
var seasonality = ee.Image.cat(phase, magnitude, val).hsvToRgb();
panel.widgets().set(20,chart_ts)
var dot = ui.Map.Layer(point, {color: 'red'}, 'Point');
  Map.layers().set(9, dot);
var dot = ui.Map.Layer(point, {color: 'red'}, 'Point');
  Map.layers().set(9, dot);
  });
//////////base map
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('satellite', {'baseChange': baseChange});
Map.centerObject(filteredArea);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}//end function