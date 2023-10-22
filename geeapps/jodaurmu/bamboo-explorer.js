var areas_explorer = ui.import && ui.import("areas_explorer", "table", {
      "id": "users/jodaurmu/areas_explorer"
    }) || ee.FeatureCollection("users/jodaurmu/areas_explorer"),
    GWS = ui.import && ui.import("GWS", "image", {
      "id": "JRC/GSW1_3/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_3/GlobalSurfaceWater"),
    logo = ui.import && ui.import("logo", "image", {
      "id": "projects/ee-forestexplorer/assets/carbono_bamboo_modified"
    }) || ee.Image("projects/ee-forestexplorer/assets/carbono_bamboo_modified"),
    hansen = ui.import && ui.import("hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2020_v1_8"
    }) || ee.Image("UMD/hansen/global_forest_change_2020_v1_8"),
    depa = ui.import && ui.import("depa", "table", {
      "id": "projects/ee-forestexplorer/assets/Limite_Departamental_COL"
    }) || ee.FeatureCollection("projects/ee-forestexplorer/assets/Limite_Departamental_COL"),
    NDVI_recreo = ui.import && ui.import("NDVI_recreo", "image", {
      "id": "projects/ee-forestexplorer/assets/ElRecreo_NDVIToolbox_export_TueDec14224523329642"
    }) || ee.Image("projects/ee-forestexplorer/assets/ElRecreo_NDVIToolbox_export_TueDec14224523329642"),
    orto_recreo = ui.import && ui.import("orto_recreo", "image", {
      "id": "projects/ee-forestexplorer/assets/ElRecreo_Orthomosaic_export_TueDec14224416431133"
    }) || ee.Image("projects/ee-forestexplorer/assets/ElRecreo_Orthomosaic_export_TueDec14224416431133"),
    Poly_recreo = ui.import && ui.import("Poly_recreo", "table", {
      "id": "projects/ee-forestexplorer/assets/ElRecreo_polygons"
    }) || ee.FeatureCollection("projects/ee-forestexplorer/assets/ElRecreo_polygons"),
    optimo = ui.import && ui.import("optimo", "image", {
      "id": "projects/ee-jodaurmu-bamboo/assets/area_optima"
    }) || ee.Image("projects/ee-jodaurmu-bamboo/assets/area_optima"),
    medio = ui.import && ui.import("medio", "image", {
      "id": "projects/ee-jodaurmu-bamboo/assets/area_medio"
    }) || ee.Image("projects/ee-jodaurmu-bamboo/assets/area_medio");
Map.addLayer(optimo.selfMask(),{palette:'red'}, 'areas optimas') 
Map.addLayer(medio.selfMask(),{palette:'orange'}, 'areas medias') 
//area
var empty = ee.Image().byte();
var recreo = empty.paint({
  featureCollection: Poly_recreo,
  color: 1,
  width: 3
});
Map.setControlVisibility({
  drawingToolsControl:false
})
var complements=require('users/jodaurmu/Forest_Explorer:FE_complements')
var logo2 = logo.visualize({
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
    style: {height: '100px', width: '110px',padding :'0',margin: '0px 4px 10px 100px'}
    });
///////////////////////////PANEL/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Bamboo Explorer (beta)', complements.header_fonts);
var text = ui.Label('Capturamos carbono mediante agricultura colectiva de bambú; almacenamos carbono construyendo casas (casas de bambú); transformamos el déficit de viviendas del mundo en un Giga Carbon; y el principio de nuestro equipo es: trabajar a la velocidad y con las cualidades de la luz.',
    complements.text_fonts);
var text2 = ui.Label(
    'J. David Urquiza-Muñoz*',
    complements.text_fonts);
var  ref = ui.Label('Manual', {textAlign:'center',fontWeight: 'bold', fontSize: '16px', margin: '10px 5px', backgroundColor:'black',color:'blue'},'https://docs.google.com/document/d/1T42LT3hhXYe6EvaPY97K4fERqdqU5cIFMfEfiqQwaLU/edit?usp=sharing');
var toolPanel = ui.Panel([header,thumb2,text, ref],'flow', {width: '350px', padding:'1px',backgroundColor:'black'});
ui.root.insert(1,toolPanel)
//////////base map
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('satellite', {'baseChange': baseChange});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Site
var site_tittle = ui.Label('Analisis por departamento:',complements.tittle_fonts);
toolPanel.add(site_tittle)
var ccff = ee.FeatureCollection(depa)
Map.centerObject(ccff);
//var depa = ee.FeatureCollection(depa);
var filter = ee.Filter.inList('NOMBRE_DPT', ['AMAZONAS','ANTIOQUIA','ARAUCA','ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA','ATLANTICO','BOGOTÁ','BOLÍVAR','BOYACÁ','CALDAS','CAQUETÁ','CASANARE','CAUCA','CESAR','CHOCÓ','CÓRDOBA','CUNDINAMARCA','GUAINIA','GUAVIARE','HUILA','LA GUAJIRA','MAGDALENA','META','NARIÑO','NN','NORTE DE SANTANDER','PUTUMAYO','QUINDIO','RISARALDA','SANTANDER','SUCRE','TOLIMA','VALLE DEL CAUCA','VAUPES','VICHADA']);
var filteredArea = depa.filter(filter);
var area_col = empty.paint({
  featureCollection: filteredArea,
  color: 4,
  width: 2
})
Map.addLayer(area_col, {palette: '#0af047',strokeWidth: 10}, 'Departamento Colombiano');
var depaNames = filteredArea.aggregate_array('NOMBRE_DPT')
var getdpto = function(state) {
  // Given a state get all counties
  var feat = ee.Feature(filteredArea.filterMetadata('NOMBRE_DPT', 'equals', state).first())
  var statefp = ee.String(feat.get('NOMBRE_DPT'))
  var filteredCounties = ccff.filterMetadata('NOMBRE_DPT', 'equals', statefp)
  var filteredCountiesNames = filteredCounties.aggregate_array('NOMBRE_DPT')
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
      countiesDD.setPlaceholder('NOMBRE_DPT')
    })
  })
})
var add = ui.Button('agregar Departamento')
add.onClick(function(){
  var name = countiesDD.getValue()
  var county = ee.Feature(ccff.filterMetadata('NOMBRE_DPT', 'equals', name).first())
  Map.addLayer(county, {color: 'red'}, name)
})
toolPanel.add(statesDD)
toolPanel.add(countiesDD)
toolPanel.add(add)
var analysis_tittle = ui.Label('Defina el Período y nubosidad de las imagenes:',complements.tittle_fonts);
toolPanel.add(analysis_tittle)
var label_Start = ui.Label({value:'Inicio:',style: complements.sub_tittle_fonts});
toolPanel.add(label_Start)
var Start_select = ui.Textbox({
  value: '2019-01-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }});
toolPanel.add(Start_select)
var label_End = ui.Label({value:'Final:',style: complements.sub_tittle_fonts});
toolPanel.add(label_End)
var End_select = ui.Textbox({
  value: '2019-12-31',
  style: {width : '90px'},
  onChange: function(text) {
    var End_second = text
  }});
toolPanel.add(End_select)
var label_cloudlevel_select = ui.Label({value:'Nubosidad menor a (5% - 90%):',style: complements.sub_tittle_fonts});
var cloudlevel_select = ui.Slider({
  min: 5,
  max: 90, 
  value: 10, 
  step: 1,
  onChange: function(value) {
    var cloudcover = value
  },style: {fontWeight: 'normal', fontSize: '16px', margin: '10px 5px', backgroundColor:'black',color:'white',width: '180px'}
      });
toolPanel.add(label_cloudlevel_select)
toolPanel.add(cloudlevel_select)
//toolPanel.add(text3)
//toolPanel.add(thumb2)
///////////////////////////////////////
var app = function() {
   var tool = new DrawAreaTool(Map)
  // subscribe to selection
  tool.onFinished(function(geometry) {
    checkbox.setValue(false, false)
    print(geometry)
    //Map.addLayer(geometry,{ color:'red' }, "Section")
Map.centerObject(geometry)
Map.setControlVisibility({
  drawingToolsControl:false
})
//Years
var Start_second = Start_select.getValue();
    var Start_second_number = ee.Number.parse(Start_second.replace(/-/g,'')).getInfo()
var End_second = End_select.getValue();
    var End_second_number = ee.Number.parse(End_second.replace(/-/g,'')).getInfo();
var cloudcover = cloudlevel_select.getValue()
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
var S2_c2=ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(Start_second,End_second)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudcover))
                  .filterBounds(geometry)
                  .map(maskS2clouds)
var s2_vis = {
  min: 0.0,
  max: 0.3,
 bands: ['B4_p10', 'B3_p10', 'B2_p10'],
  //bands: ['B4', 'B3', 'B2'],
  gamma: 2.1,
};
var sent=ui.Map.Layer(S2_c2.reduce(ee.Reducer.percentile([10])).clip(geometry),s2_vis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
Map.layers().set(1, sent)
////////////////////topo and landforms
// Load the SRTM image.
var srtm = ee.Image('USGS/SRTMGL1_003').select('elevation');
var elev_mean= srtm.reduceRegion( {reducer: ee.Reducer.mean(),  geometry: geometry,  scale: 30,  maxPixels: 1e9})
var elev_min= srtm.reduceRegion( {reducer: ee.Reducer.min(),  geometry: geometry,  scale: 30,  maxPixels: 1e9})
print(elev_mean,'ele_min')
var elev_max= srtm.reduceRegion( {reducer: ee.Reducer.max(),  geometry: geometry,  scale: 30,  maxPixels: 1e9})
// Apply an algorithm to an image.
var slope = ee.Terrain.slope(srtm).clip(geometry)
// Get the aspect (in degrees).
var aspect = ee.Terrain.aspect(srtm).clip(geometry);
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
var srtm_map=ui.Map.Layer(srtm.clip(geometry), viz_elev, 'Elevation').setShown(0)
Map.layers().set(2, srtm_map)  
var slp_map=ui.Map.Layer(slope.clip(geometry), viz_slp, 'slope').setShown(0)
Map.layers().set(3, slp_map)  
var asp_map=ui.Map.Layer(sinImage.clip(geometry), {min: -1, max: 1,opacity:0.1}, 'Aspect').setShown(1);
Map.layers().set(4, asp_map)
var opt =optimo.clip(geometry).selfMask()
var opt_map=ui.Map.Layer(opt, {palette:'red'}, 'Optimal area').setShown(0);
Map.layers().set(5, opt_map)
var opt_Area = opt.multiply(ee.Image.pixelArea())
var opt_Area_m2  = opt_Area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e10
  })
//var = ee.Number(opt_Area).divide(10000)
var opt_area_ha=opt_Area_m2.get('elevation').getInfo()/10000;
print(opt_area_ha)
var med =medio.clip(geometry).selfMask()
var med_map=ui.Map.Layer(med, {palette:'orange'}, 'Medium area').setShown(0);
Map.layers().set(6, med_map)
var med_Area = med.multiply(ee.Image.pixelArea())
var med_Area_m2  = med_Area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e10
  })
//var = ee.Number(opt_Area).divide(10000)
var med_area_ha=med_Area_m2.get('elevation').getInfo()/10000;
print(med_area_ha)
////Soil Properties
var phH2O = ee.Image("projects/soilgrids-isric/phh2o_mean").clip(geometry);
var mean_ph=phH2O.reduceRegion( {reducer: ee.Reducer.mean(),  geometry: geometry,  scale: 30,  maxPixels: 1e9})
///tree cover
var treecover =ee.Image('users/andrewjhansen31/treeCover_SA').clip(geometry)
Map.addLayer(treecover, {},"Treecover").setShown(0);
var geom_area = geometry.area({'maxError': 1})
var summary=ui.Label({value:'El area tiene una extension total de '+((geom_area.getInfo())/10000).toFixed(2)+
                        'hectareas. Con '+opt_area_ha.toFixed(2)+' hectareas de area optima y '+med_area_ha.toFixed(2)+' hectareas areas medias para crecimeinto de Bamboo.',
style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}});
panel.widgets().set(1,summary)
var soil_title=ui.Label({value:'Caracteristicas del suelo: '+'Promedio de pH de suelos de '+((mean_ph.get('phh2o_0-5cm_mean').getInfo())/10).toFixed(2),
                style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}})
panel.widgets().set(2, soil_title)
var topo_title=ui.Label({value:'Topografia: '+'La elevacion promedio es de '+elev_mean.get('elevation').getInfo().toFixed(2)+' msnm.',
                style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}})
panel.widgets().set(3, topo_title)
///chart defor https://developers.google.com/earth-engine/tutorials/tutorial_forest_03a , https://developers.google.com/earth-engine/guides/charts_style
var gfc2021 =ee.Image("UMD/hansen/global_forest_change_2021_v1_9").clip(geometry)
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 21,
  palette: ['yellow', 'red']
};
Map.addLayer(gfc2021,treeLossVisParam ,"tree loss").setShown(0);
var lossImage = gfc2021.select(['loss']);
var lossAreaImage = lossImage.multiply(ee.Image.pixelArea()).divide(10000);
var lossYear=gfc2021.select(['lossyear'])
var lossByYear = lossAreaImage.addBands(lossYear).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: geometry,
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
    title: 'Pérdida anual de bosques',
    titleTextStyle:{color:'white'},
    hAxis: {title: 'Año', format: '####', titleTextStyle: {italic: false, bold: true,color: 'white'},textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}},
    orientation: 'horizontal',//vertical
    vAxis: {title: 'Area (hectareas)',titleTextStyle: {italic: false, bold: true,color: 'white'}, textStyle: {italic: false, bold: true,color: 'white'}},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3,
    chartArea: {backgroundColor: 'black'},
    backgroundColor: 'black'})
  .setChartType('ScatterChart')
  ;
panel.widgets().set(4,defor_chart)
var temp = ee.ImageCollection("ECMWF/ERA5/MONTHLY").filter(ee.Filter.or(
                         ee.Filter.date('2010-01-01', '2011-01-01'),
                         ee.Filter.date('2014-01-01', '2015-01-01'),
                         ee.Filter.date('2016-01-01', '2017-01-01'),
                         ee.Filter.date('2018-01-01', '2019-01-01'),
                         ee.Filter.date('2020-01-01', '2020-12-30')))
;
// Define the chart and print it to the console.
var chart_temp = ui.Chart.image
                .doySeriesByYear({
                  imageCollection: temp,
                  bandName: 'mean_2m_air_temperature',
                  region: geometry,
                  regionReducer: ee.Reducer.mean(),
                  scale: 100,
                  sameDayReducer: ee.Reducer.mean(),
                  startDay: 1,
                  endDay: 365
                })
                .setOptions({
                  title: 'Promedio de la Temperatura superficial',
                  titleTextStyle:{color:'white'},
                  hAxis: {
                    title: 'Dia del año',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  vAxis: {
                    title: 'Temp (K)',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  chartArea: {backgroundColor: 'black',},
                  backgroundColor: 'black',
                  legend: {position: 'top',textStyle: {italic: false, bold: true,color: 'white',fontSize: 12} }
                  }).setChartType('ScatterChart');
panel.widgets().set(5,chart_temp)
;
// Define the chart and print it to the console.
var chart_pp = ui.Chart.image
                .doySeriesByYear({
                  imageCollection: temp,
                  bandName: 'total_precipitation',
                  region: geometry,
                  regionReducer: ee.Reducer.mean(),
                  scale: 100,
                  sameDayReducer: ee.Reducer.mean(),
                  startDay: 1,
                  endDay: 365
                })
                .setOptions({
                  title: 'Promedio de precipitacion',
                  titleTextStyle:{color:'white'},
                  hAxis: {
                    title: 'Dia del año',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  vAxis: {
                    title: 'pp (m)',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  chartArea: {backgroundColor: 'black'},
                  backgroundColor: 'black',
                  legend: {position: 'top',textStyle: {italic: false, bold: true,color: 'white',fontSize: 12} }
                  }).setChartType('ScatterChart');
panel.widgets().set(6,chart_pp)
})
  // add checkbox to activate selector when checkbox is clicked
  var checkbox = ui.Checkbox({label: 'Analisis por area', 
                              style: {fontFamily:'serif',backgroundColor:'white',fontWeight:'bold',whiteSpace:'pre'}});
  checkbox.onChange(function(checked) {
    if(checked) {
      tool.startDrawing()
    } else {
      tool.stopDrawing()
    }
  });
//var description=ui.Label('Check/uncheck bellow to draw/remove a transect',{fontWeight: 'normal', fontSize: '10px', margin: '10px 5px', backgroundColor:'white',color:'black'})
var panel_c = ui.Panel({
  widgets: [checkbox],
  //layout: ui.Panel.Layout.flow('vertical','top-left'),
  style: {backgroundColor:'white',fontFamily:'monospace',position:'top-right',stretch:'both'},
});
Map.add(panel_c);
}//end app funtions
var DrawAreaTool = function(draw) {
  this.map = draw
  this.layer = ui.Map.Layer({name: 'Section', visParams: { color:'red' }}).setShown(1)
  this.selection = null
  this.active = false
  this.points = []
  this.area = null
  this.listeners = []
  var tool = this;
  this.initialize = function() {
    this.map.onClick(this.onMouseClick)
    this.map.layers().add(this.layer)
  }
  this.startDrawing = function() {
    this.active = true
    this.points = []
    this.map.style().set('cursor', 'crosshair');
    this.layer.setShown(true)
  }
  this.stopDrawing = function() {
    tool.active = false
    tool.map.style().set('cursor', 'hand');
    if(tool.points.length < 2) {
      return
    }
    tool.area = ee.Geometry.Polygon(tool.points)
    tool.layer.setEeObject(tool.area)
    tool.listeners.map(function(listener) {
      listener(tool.area)
    })
  }
  /***
  * Mouse click event handler
  */
  this.onMouseClick = function(coords) {
    if(!tool.active) {
      return
    }
    tool.points.push([coords.lon, coords.lat])
    var geom = tool.points.length > 1 ? ee.Geometry.LineString(tool.points) : ee.Geometry.Point(tool.points[0])
    tool.layer.setEeObject(geom)
    var l = ee.Geometry.LineString([tool.points[0], tool.points[tool.points.length-1]]).length(1).getInfo()
    if(tool.points.length > 1 && l / Map.getScale() < 5) {
      tool.stopDrawing()
    }
  }
  /***
  * Adds a new event handler, fired on feature selection. 
  */
  this.onFinished = function(listener) {
    tool.listeners.push(listener)
  }
  this.initialize()
}
app()
/////////////////////////////
var AddButton = function(){
      var button = ui.Button('Analisis por departamento');
      button.style().set({
        position: 'top-right',
        border : '1px solid #000000',
      });
      button.onClick(function(){return analysis()});
      Map.add(button);
}
AddButton(toolPanel);
var panel = ui.Panel();
panel.style().set({
  width: '600px',
  position: 'bottom-left',
  backgroundColor:'black'
});
ui.root.insert(0,panel)
var title = ui.Label('Resultados del analisis',{textAlign:'center',fontWeight: 'bold', fontSize: '16px', margin: '10px 5px', backgroundColor:'black',color:'darkgreen'});
title.style().set('position', 'top-center');
panel.widgets().set(1,title)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////
function analysis(){
//var sensor0=Sensor.getValue()
                 Map.clear()
Map.setControlVisibility({
  drawingToolsControl:false
})
//Years
var Start_second = Start_select.getValue();
    var Start_second_number = ee.Number.parse(Start_second.replace(/-/g,'')).getInfo()
var End_second = End_select.getValue();
    var End_second_number = ee.Number.parse(End_second.replace(/-/g,'')).getInfo();
var cloudcover = cloudlevel_select.getValue()
var areas = ee.FeatureCollection(ccff);
var filter_a = ee.Filter.inList('NOMBRE_DPT', [countiesDD.getValue()]);
var filteredArea = areas.filter(filter_a);
var ccff_name=countiesDD.getValue()///to the chart name
////////BIOMASS////////////
var agb = ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1").select('agb').mosaic().clip(filteredArea);
var bgb = ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1").select('bgb').mosaic().clip(filteredArea)
var biom_vis = {
  bands: ['agb'],
  min: 0.0,
  max:150.0,
  palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']
};
//Map.addLayer(agb, biom_vis, "Aboveground biomass carbon").setShown(0);
//Map.addLayer(bgb, {}, "Belowground biomass carbon").setShown(0);
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
///tree cover
var treecover =ee.Image('users/andrewjhansen31/treeCover_SA').clip(filteredArea)
Map.addLayer(treecover, {},"Treecover").setShown(0);
//////////////////////////////////////////////////////////////////////////////////////////////
var AddButton = function(){
      var button = ui.Button('Analisis por departamento');
      button.style().set({
        position: 'top-right',
        border : '1px solid #000000',
      });
      button.onClick(function(){return analysis()});
      Map.add(button);
}
AddButton(toolPanel);
//////////base map
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('satellite', {'baseChange': baseChange});
Map.centerObject(filteredArea)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Years
var Start_second = Start_select.getValue();
    var Start_second_number = ee.Number.parse(Start_second.replace(/-/g,'')).getInfo()
var End_second = End_select.getValue();
    var End_second_number = ee.Number.parse(End_second.replace(/-/g,'')).getInfo();
var cloudcover = cloudlevel_select.getValue()
filteredArea=filteredArea.geometry()
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
var S2_c2=ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(Start_second,End_second)
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
var sent=ui.Map.Layer(S2_c2.reduce(ee.Reducer.percentile([10])).clip(filteredArea),s2_vis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
Map.layers().set(1, sent)
////////////////////topo and landforms
// Load the SRTM image.
var srtm = ee.Image('USGS/SRTMGL1_003').select('elevation');
var elev_mean= srtm.reduceRegion( {reducer: ee.Reducer.mean(),  geometry: filteredArea,  scale: 30,  maxPixels: 1e9})
var elev_min= srtm.reduceRegion( {reducer: ee.Reducer.min(),  geometry: filteredArea,  scale: 30,  maxPixels: 1e9})
print(elev_mean,'ele_min')
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
var srtm_map=ui.Map.Layer(srtm.clip(filteredArea), viz_elev, 'Elevation').setShown(0)
Map.layers().set(2, srtm_map)  
var slp_map=ui.Map.Layer(slope.clip(filteredArea), viz_slp, 'slope').setShown(0)
Map.layers().set(3, slp_map)  
var asp_map=ui.Map.Layer(sinImage.clip(filteredArea), {min: -1, max: 1,opacity:0.1}, 'Aspect').setShown(1);
Map.layers().set(4, asp_map)
var opt =optimo.clip(filteredArea).selfMask()
var opt_map=ui.Map.Layer(opt, {palette:'red'}, 'Optimal area').setShown(0);
Map.layers().set(5, opt_map)
var opt_Area = opt.multiply(ee.Image.pixelArea())
var opt_Area_m2  = opt_Area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: filteredArea,
  scale: 10,
  maxPixels: 1e10
  })
//var = ee.Number(opt_Area).divide(10000)
var opt_area_ha=opt_Area_m2.get('elevation').getInfo()/10000;
print(opt_area_ha)
var med =medio.clip(filteredArea).selfMask()
var med_map=ui.Map.Layer(med, {palette:'orange'}, 'Medium area').setShown(0);
Map.layers().set(6, med_map)
var med_Area = med.multiply(ee.Image.pixelArea())
var med_Area_m2  = med_Area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: filteredArea,
  scale: 10,
  maxPixels: 1e10
  })
//var = ee.Number(opt_Area).divide(10000)
var med_area_ha=med_Area_m2.get('elevation').getInfo()/10000;
print(med_area_ha)
////Soil Properties
var phH2O = ee.Image("projects/soilgrids-isric/phh2o_mean").clip(filteredArea);
var mean_ph=phH2O.reduceRegion( {reducer: ee.Reducer.mean(),  geometry: filteredArea,  scale: 30,  maxPixels: 1e9})
var geom_area = filteredArea.area({'maxError': 1})
var summary=ui.Label({value:'El area tiene una extension total de '+((geom_area.getInfo())/10000).toFixed(2)+
                        'hectareas. Con '+opt_area_ha.toFixed(2)+' hectareas de area optima y '+med_area_ha.toFixed(2)+' hectareas areas medias para crecimeinto de Bamboo.',
style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}});
panel.widgets().set(1,summary)
var soil_title=ui.Label({value:'Caracteristicas del suelo: '+' Promedio de pH de '+((mean_ph.get('phh2o_0-5cm_mean').getInfo())/10).toFixed(2),
                style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}})
panel.widgets().set(2, soil_title)
var topo_title=ui.Label({value:'Topografia: '+' La elevacion promedio es de '+elev_mean.get('elevation').getInfo().toFixed(2)+' msnm.',
                style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}})
panel.widgets().set(3, topo_title)
///chart defor https://developers.google.com/earth-engine/tutorials/tutorial_forest_03a , https://developers.google.com/earth-engine/guides/charts_style
var gfc2021 =ee.Image("UMD/hansen/global_forest_change_2021_v1_9").clip(filteredArea)
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 21,
  palette: ['yellow', 'red']
};
Map.addLayer(gfc2021,treeLossVisParam ,"tree loss").setShown(0);
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
    title: 'Pérdida anual de bosques',
    titleTextStyle:{color:'white'},
    hAxis: {title: 'Año', format: '####', titleTextStyle: {italic: false, bold: true,color: 'white'},textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}},
    orientation: 'horizontal',//vertical
    vAxis: {title: 'Area (hectareas)',titleTextStyle: {italic: false, bold: true,color: 'white'}, textStyle: {italic: false, bold: true,color: 'white'}},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3,
    chartArea: {backgroundColor: 'black'},
    backgroundColor: 'black'
  }).setChartType('ScatterChart');
panel.widgets().set(4,defor_chart)
var temp = ee.ImageCollection("ECMWF/ERA5/MONTHLY").filter(ee.Filter.or(
                         ee.Filter.date('2010-01-01', '2011-01-01'),
                         ee.Filter.date('2014-01-01', '2015-01-01'),
                         ee.Filter.date('2016-01-01', '2017-01-01'),
                         ee.Filter.date('2018-01-01', '2019-01-01'),
                         ee.Filter.date('2020-01-01', '2020-12-30')))
;
// Define the chart and print it to the console.
var chart_temp = ui.Chart.image
                .doySeriesByYear({
                  imageCollection: temp,
                  bandName: 'mean_2m_air_temperature',
                  region: filteredArea,
                  regionReducer: ee.Reducer.mean(),
                  scale: 100,
                  sameDayReducer: ee.Reducer.mean(),
                  startDay: 1,
                  endDay: 365
                })
                .setOptions({
                  title: 'Promedio de la Temperatura superficial',
                  titleTextStyle:{color:'white'},
                  hAxis: {
                    title: 'Dia del año',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  vAxis: {
                    title: 'Temp (K)',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  chartArea: {backgroundColor: 'black'},
                  backgroundColor: 'black',
                  legend: {position: 'top',textStyle: {italic: false, bold: true,color: 'white',fontSize: 12} }
                  }).setChartType('ScatterChart');
panel.widgets().set(5,chart_temp)
;
// Define the chart and print it to the console.
var chart_pp = ui.Chart.image
                .doySeriesByYear({
                  imageCollection: temp,
                  bandName: 'total_precipitation',
                  region: filteredArea,
                  regionReducer: ee.Reducer.mean(),
                  scale: 100,
                  sameDayReducer: ee.Reducer.mean(),
                  startDay: 1,
                  endDay: 365
                })
                .setOptions({
                  title: 'Promedio de precipitacion',
                  titleTextStyle:{color:'white'},
                  hAxis: {
                    title: 'Dia del año',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  vAxis: {
                    title: 'pp (m)',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  chartArea: {backgroundColor: 'black'},
                  backgroundColor: 'black',
                  legend: {position: 'top',textStyle: {italic: false, bold: true,color: 'white',fontSize: 12} }
                  }).setChartType('ScatterChart');
panel.widgets().set(6,chart_pp)
///////////////////////////////////////
var app = function() {
   var tool = new DrawAreaTool(Map)
  // subscribe to selection
  tool.onFinished(function(geometry) {
    checkbox.setValue(false, false)
    print(geometry)
    //Map.addLayer(geometry,{ color:'red' }, "Section")
Map.centerObject(geometry)
//Years
var Start_second = Start_select.getValue();
    var Start_second_number = ee.Number.parse(Start_second.replace(/-/g,'')).getInfo()
var End_second = End_select.getValue();
    var End_second_number = ee.Number.parse(End_second.replace(/-/g,'')).getInfo();
var cloudcover = cloudlevel_select.getValue()
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
var S2_c2=ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(Start_second,End_second)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudcover))
                  .filterBounds(geometry)
                  .map(maskS2clouds)
var s2_vis = {
  min: 0.0,
  max: 0.3,
 bands: ['B4_p10', 'B3_p10', 'B2_p10'],
  //bands: ['B4', 'B3', 'B2'],
  gamma: 2.1,
};
var sent=ui.Map.Layer(S2_c2.reduce(ee.Reducer.percentile([10])).clip(geometry),s2_vis,'SENTINEL 2 Period: '+Start_second+' - '+End_second)
Map.layers().set(1, sent)
////////////////////topo and landforms
// Load the SRTM image.
var srtm = ee.Image('USGS/SRTMGL1_003').select('elevation');
var elev_mean= srtm.reduceRegion( {reducer: ee.Reducer.mean(),  geometry: geometry,  scale: 30,  maxPixels: 1e9})
var elev_min= srtm.reduceRegion( {reducer: ee.Reducer.min(),  geometry: geometry,  scale: 30,  maxPixels: 1e9})
print(elev_mean,'ele_min')
var elev_max= srtm.reduceRegion( {reducer: ee.Reducer.max(),  geometry: geometry,  scale: 30,  maxPixels: 1e9})
// Apply an algorithm to an image.
var slope = ee.Terrain.slope(srtm).clip(geometry)
// Get the aspect (in degrees).
var aspect = ee.Terrain.aspect(srtm).clip(geometry);
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
var srtm_map=ui.Map.Layer(srtm.clip(geometry), viz_elev, 'Elevation').setShown(0)
Map.layers().set(2, srtm_map)  
var slp_map=ui.Map.Layer(slope.clip(geometry), viz_slp, 'slope').setShown(0)
Map.layers().set(3, slp_map)  
var asp_map=ui.Map.Layer(sinImage.clip(geometry), {min: -1, max: 1,opacity:0.1}, 'Aspect').setShown(1);
Map.layers().set(4, asp_map)
var opt =optimo.clip(geometry).selfMask()
var opt_map=ui.Map.Layer(opt, {palette:'red'}, 'Optimal area').setShown(0);
Map.layers().set(5, opt_map)
var opt_Area = opt.multiply(ee.Image.pixelArea())
var opt_Area_m2  = opt_Area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e10
  })
//var = ee.Number(opt_Area).divide(10000)
var opt_area_ha=opt_Area_m2.get('elevation').getInfo()/10000;
print(opt_area_ha)
var med =medio.clip(geometry).selfMask()
var med_map=ui.Map.Layer(med, {palette:'orange'}, 'Medium area').setShown(0);
Map.layers().set(6, med_map)
var med_Area = med.multiply(ee.Image.pixelArea())
var med_Area_m2  = med_Area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e10
  })
//var = ee.Number(opt_Area).divide(10000)
var med_area_ha=med_Area_m2.get('elevation').getInfo()/10000;
print(med_area_ha)
////Soil Properties
var phH2O = ee.Image("projects/soilgrids-isric/phh2o_mean").clip(geometry);
var mean_ph=phH2O.reduceRegion( {reducer: ee.Reducer.mean(),  geometry: geometry,  scale: 30,  maxPixels: 1e9})
///tree cover
var treecover =ee.Image('users/andrewjhansen31/treeCover_SA').clip(geometry)
Map.addLayer(treecover, {},"Treecover").setShown(0);
var geom_area = geometry.area({'maxError': 1})
var summary=ui.Label({value:'El area tiene una extension total de '+((geom_area.getInfo())/10000).toFixed(2)+
                        'hectareas. Con '+opt_area_ha.toFixed(2)+' hectareas de area optima y '+med_area_ha.toFixed(2)+' hectareas areas medias para crecimeinto de Bamboo.',
style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}});
panel.widgets().set(1,summary)
var soil_title=ui.Label({value:'Caracteristicas del suelo: '+' Promedio de pH de '+((mean_ph.get('phh2o_0-5cm_mean').getInfo())/10).toFixed(2),
                style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}})
panel.widgets().set(2, soil_title)
var topo_title=ui.Label({value:'Topografia: '+' La elevacion promedio es de '+elev_mean.get('elevation').getInfo().toFixed(2)+' msnm.',
                style: {textAlign:'justify',fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', backgroundColor:'black',color:'white'}})
panel.widgets().set(3, topo_title)
///chart defor https://developers.google.com/earth-engine/tutorials/tutorial_forest_03a , https://developers.google.com/earth-engine/guides/charts_style
var gfc2021 =ee.Image("UMD/hansen/global_forest_change_2021_v1_9").clip(geometry)
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 21,
  palette: ['yellow', 'red']
};
Map.addLayer(gfc2021,treeLossVisParam ,"tree loss").setShown(0);
var lossImage = gfc2021.select(['loss']);
var lossAreaImage = lossImage.multiply(ee.Image.pixelArea()).divide(10000);
var lossYear=gfc2021.select(['lossyear'])
var lossByYear = lossAreaImage.addBands(lossYear).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: geometry,
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
    title: 'Pérdida anual de bosques',
    titleTextStyle:{color:'white'},
    hAxis: {title: 'Año', format: '####', titleTextStyle: {italic: false, bold: true,color: 'white'},textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}},
    orientation: 'horizontal',//vertical
    vAxis: {title: 'Area (hectareas)',titleTextStyle: {italic: false, bold: true,color: 'white'}, textStyle: {italic: false, bold: true,color: 'white'}},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3,
    chartArea: {backgroundColor: 'black'},
    backgroundColor: 'black'
  }).setChartType('ScatterChart');
panel.widgets().set(4,defor_chart)
var temp = ee.ImageCollection("ECMWF/ERA5/MONTHLY").filter(ee.Filter.or(
                         ee.Filter.date('2010-01-01', '2011-01-01'),
                         ee.Filter.date('2014-01-01', '2015-01-01'),
                         ee.Filter.date('2016-01-01', '2017-01-01'),
                         ee.Filter.date('2018-01-01', '2019-01-01'),
                         ee.Filter.date('2020-01-01', '2020-12-30')))
;
// Define the chart and print it to the console.
var chart_temp = ui.Chart.image
                .doySeriesByYear({
                  imageCollection: temp,
                  bandName: 'mean_2m_air_temperature',
                  region: geometry,
                  regionReducer: ee.Reducer.mean(),
                  scale: 100,
                  sameDayReducer: ee.Reducer.mean(),
                  startDay: 1,
                  endDay: 365
                })
                .setOptions({
                  title: 'Promedio de la Temperatura superficial',
                  titleTextStyle:{color:'white'},
                  hAxis: {
                    title: 'Dia del año',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  vAxis: {
                    title: 'Temp (K)',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  chartArea: {backgroundColor: 'black'},
                  backgroundColor: 'black',
                  legend: {position: 'top',textStyle: {italic: false, bold: true,color: 'white',fontSize: 12} }
                  }).setChartType('ScatterChart');
panel.widgets().set(5,chart_temp)
;
// Define the chart and print it to the console.
var chart_pp = ui.Chart.image
                .doySeriesByYear({
                  imageCollection: temp,
                  bandName: 'total_precipitation',
                  region: geometry,
                  regionReducer: ee.Reducer.mean(),
                  scale: 100,
                  sameDayReducer: ee.Reducer.mean(),
                  startDay: 1,
                  endDay: 365
                })
                .setOptions({
                  title: 'Promedio de precipitacion',
                  titleTextStyle:{color:'white'},
                  hAxis: {
                    title: 'Dia del año',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  vAxis: {
                    title: 'pp (m)',
                    titleTextStyle: {italic: false, bold: true,color: 'white'},
                    textStyle: {italic: false, bold: true,color: 'white',fontSize: 12}
                  },
                  chartArea: {backgroundColor: 'black'},
                  backgroundColor: 'black',
                  legend: {position: 'top',textStyle: {italic: false, bold: true,color: 'white',fontSize: 12} }
                  }).setChartType('ScatterChart');
panel.widgets().set(6,chart_pp)
})
  // add checkbox to activate selector when checkbox is clicked
  var checkbox = ui.Checkbox({label: 'Analisis por area', 
                              style: {fontFamily:'serif',backgroundColor:'white',fontWeight:'bold',whiteSpace:'pre'}});
  checkbox.onChange(function(checked) {
    if(checked) {
      tool.startDrawing()
    } else {
      tool.stopDrawing()
    }
  });
//var description=ui.Label('Check/uncheck bellow to draw/remove a transect',{fontWeight: 'normal', fontSize: '10px', margin: '10px 5px', backgroundColor:'white',color:'black'})
var panel_c = ui.Panel({
  widgets: [checkbox],
  //layout: ui.Panel.Layout.flow('vertical','top-left'),
  style: {backgroundColor:'white',fontFamily:'monospace',position:'top-right',stretch:'both'}
});
Map.add(panel_c);
}//end app funtions
var DrawAreaTool = function(draw) {
  this.map = draw
  this.layer = ui.Map.Layer({name: 'Section', visParams: { color:'red' }}).setShown(1)
  this.selection = null
  this.active = false
  this.points = []
  this.area = null
  this.listeners = []
  var tool = this;
  this.initialize = function() {
    this.map.onClick(this.onMouseClick)
    this.map.layers().add(this.layer)
  }
  this.startDrawing = function() {
    this.active = true
    this.points = []
    this.map.style().set('cursor', 'crosshair');
    this.layer.setShown(true)
  }
  this.stopDrawing = function() {
    tool.active = false
    tool.map.style().set('cursor', 'hand');
    if(tool.points.length < 2) {
      return
    }
    tool.area = ee.Geometry.Polygon(tool.points)
    tool.layer.setEeObject(tool.area)
    tool.listeners.map(function(listener) {
      listener(tool.area)
    })
  }
  /***
  * Mouse click event handler
  */
  this.onMouseClick = function(coords) {
    if(!tool.active) {
      return
    }
    tool.points.push([coords.lon, coords.lat])
    var geom = tool.points.length > 1 ? ee.Geometry.LineString(tool.points) : ee.Geometry.Point(tool.points[0])
    tool.layer.setEeObject(geom)
    var l = ee.Geometry.LineString([tool.points[0], tool.points[tool.points.length-1]]).length(1).getInfo()
    if(tool.points.length > 1 && l / Map.getScale() < 5) {
      tool.stopDrawing()
    }
  }
  /***
  * Adds a new event handler, fired on feature selection. 
  */
  this.onFinished = function(listener) {
    tool.listeners.push(listener)
  }
  this.initialize()
}
app()
}//end function