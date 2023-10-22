var lsib = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    image = ee.Image("users/luizcf14/RASIG/3logos_plataforma");
/**
 * @name
 *  RAISIG download toolkit*
 * @author
 *  Solved Solutions in Geoinformation LTDA
 *  contato@raisg.org
 * 
 * @version
 *  1.0
 */
 /**
  * Styles
  */
var palettes = require('users/mapbiomas/modules:Palettes.js');
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
    fontWeight: '100',
    fontSize: '24px',
    padding: '10px',
    color: '#22602c',
    backgroundColor: colors.transparent,
  };
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '14px',
  backgroundColor: colors.transparent,
};
var MAP_STYLE = {palette:palettes.get('classification2'),min:0,max:34}
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '4px solid rgba(34, 96, 44, 0.05)';
/*
 * Application Starter
 */
//Polygon Starter 
var polygon = [];
var geometry = null;
var featCol = ee.List([]);
var tools = require('users/fitoprincipe/geetools:tools')
var gridVector = ee.FeatureCollection('projects/mapbiomas-raisg/DATOS_AUXILIARES/VECTORES/cartas-raisg').cache()
var chartList = ['SD-23-Y-D','SD-23-Y-B','SD-23-V-D','SD-23-V-B','SC-23-Y-D','SC-23-Y-B','SC-23-V-D','SB-23-Z-C',
'SC-23-V-B','SB-23-Y-D','SB-23-Y-B','SB-23-Z-A','SB-23-X-C','SB-23-V-D','SB-23-X-A','SB-23-V-B',
'SA-23-Y-D','SA-23-Z-C','SA-23-Z-B','SA-23-X-C','SA-23-Z-A','SA-23-Y-B','SA-23-V-D','SA-23-V-B',
'NC-20-X-C','NC-20-Z-A','NC-20-Z-B','NC-20-X-D','NB-21-X-D','NB-22-V-C','NB-21-Z-B','NB-21-Z-D',
'NB-22-Y-C','NB-22-Y-A','NB-22-Y-B','NB-22-Y-D','NA-22-V-B','NB-22-Z-C',
'NA-22-X-A','NA-22-X-C','NA-22-Z-A','SA-23-V-A','NA-22-Z-D','SA-22-X-B','NA-22-Z-C',
'SA-22-X-A','NA-22-Y-D','SA-22-V-B','SA-22-V-A','NA-22-Y-C','NA-22-Y-B','NA-22-Y-A','NA-22-V-D',
'NA-22-V-A','NA-22-V-C','NA-21-Z-B','NA-21-X-D','NA-21-X-B','NA-21-Z-D','SA-21-X-B','SA-21-X-A',
'NA-21-Z-C','NA-21-Z-A','NA-21-X-C','NA-21-Y-B','NA-21-V-D','NA-21-Y-D','SA-21-V-B','SA-21-V-A',
'NA-21-Y-C','NA-21-Y-A','SA-20-X-B','NA-20-Z-D','NA-20-Z-B','NA-20-X-D','NA-21-V-C','NA-21-V-A',
'NA-21-V-B','NA-20-X-B','NB-20-Z-D','NB-21-Y-C','NB-21-Y-D','NB-21-Z-C','NA-21-X-A','NB-21-Z-A',
'NB-21-Y-B','NB-21-V-D','NB-21-X-C','NB-21-V-B','NB-21-V-C','NB-21-V-A','NC-21-Y-C','NB-20-X-B',
'NC-20-Z-D','NB-20-X-D','NB-20-Z-B','NB-21-Y-A','NB-20-Z-C','NB-20-Z-A','NB-20-Y-D','NB-20-Y-B',
'NB-20-V-D','NB-20-X-C','NB-20-V-B','NB-20-X-A','NC-20-Z-C','NC-20-Y-D','NB-20-V-A','NC-20-Y-C',
'NB-19-X-B','NB-19-X-D','NB-19-Z-B','NB-20-V-C','NB-20-Y-A','NB-20-Y-C','NB-19-Z-D','NA-19-X-B',
'NA-20-V-A','NA-19-X-D','NA-20-V-C','NA-20-V-D','NA-20-V-B','NA-20-X-A','NA-20-X-C','NA-20-Y-B',
'NA-20-Z-A','NA-20-Z-C','SA-20-X-A','SA-20-V-B','NA-20-Y-D','SA-20-V-A','NA-20-Y-C','NA-20-Y-A',
'NA-19-Z-B','NA-19-Z-D','SA-19-X-B','SA-19-X-A','NA-19-Z-C','NA-19-Z-A','SA-19-V-B','NA-19-Y-D',
'NA-19-Y-B','NA-19-V-D','NA-19-X-C','NA-19-X-A','NB-19-Z-C','NA-19-V-B','NB-19-Y-D','NA-19-V-C',
'NA-19-V-A','NB-19-Y-C','NA-18-X-B','NA-18-X-D','NA-18-Z-B','NA-19-Y-A','NA-19-Y-C','SA-19-V-A',
'SA-18-X-B','NA-18-Z-D','SA-18-X-A','NA-18-Z-C','NA-18-Z-A','NA-18-X-C','NA-18-Y-B','NA-18-V-D',
'NA-18-Y-D','SA-18-V-B','SA-18-V-A','NA-18-Y-C','NA-18-Y-A','SA-17-X-B','NA-17-Z-D','NA-18-V-C',
'NA-18-V-B','NA-18-X-A','NB-19-X-C','NB-19-Z-A','SA-17-X-D','SA-17-Z-A','SA-17-Z-B','SA-17-Z-C',
'SA-17-Z-D','SB-17-X-A','SB-17-X-B','SB-17-X-C','SB-17-Z-A','SB-17-X-D','SB-17-Z-B','SB-17-Z-D',
'SC-17-X-B','SC-18-Y-A','SC-18-Y-C','SD-18-V-D','SD-18-V-B','SC-18-Y-D','SC-18-Y-B','SC-18-Z-C',
'SC-18-Z-A','SC-18-Z-B','SC-18-Z-D','SD-18-X-A','SD-18-X-B','SD-18-X-C','SD-18-X-D','SD-18-Z-A',
'SD-18-Z-B','SD-18-Z-D','SD-19-Y-C','SD-19-Y-D','SE-19-Z-D','SE-19-Z-B','SE-19-X-D','SE-19-X-C',
'SE-19-X-A','SE-19-X-B','SD-19-Z-C','SD-19-Z-D','SD-19-Z-A','SD-19-Z-B','SD-19-X-C','SD-19-X-D',
'SD-19-X-A','SD-19-X-B','SD-19-Y-B','SD-19-V-D','SD-19-V-B','SD-19-Y-A','SD-19-V-C','SD-19-V-A',
'SC-19-Y-C','SC-19-Y-D','SC-19-Y-A','SC-19-Y-B','SC-19-V-D','SC-19-Z-A','SC-19-X-C','SC-19-Z-C',
'SC-19-Z-D','SC-19-Z-B','SC-19-X-D','SC-19-X-B','SC-19-X-A','SC-19-V-B','SB-19-Z-C','SB-19-Y-D',
'SB-19-Z-D','SB-19-Z-A','SB-19-Z-B','SB-19-X-C','SB-19-X-D','SB-19-X-A','SB-19-X-B','SB-19-Y-B',
'SB-19-V-D','SB-19-V-B','SB-19-Y-C','SB-19-Y-A','SB-19-V-C','SB-19-V-A','SB-18-Z-B','SB-18-X-D',
'SB-18-X-B','SB-18-Z-D','SC-18-X-B','SC-19-V-A','SC-19-V-C','SC-18-X-D','SC-18-X-C','SC-18-X-A',
'SB-18-Z-C','SC-18-V-B','SB-18-Y-D','SC-18-V-D','SC-18-V-C','SC-18-V-A','SB-18-Y-C','SB-18-Y-A',
'SB-18-Y-B','SB-18-V-C','SB-18-V-A','SB-18-V-D','SB-18-V-B','SB-18-X-A','SB-18-X-C','SB-18-Z-A',
'SA-18-Z-C','SA-18-Z-D','SA-18-Z-A','SA-18-Z-B','SA-18-Y-D','SA-18-Y-B','SA-18-Y-C','SA-18-Y-A',
'SA-18-V-C','SA-18-V-D','SA-18-X-C','SA-18-X-D','SA-19-V-C','SA-19-V-D','SA-19-Y-A','SA-19-Y-B',
'SA-19-Y-C','SA-19-Y-D','SA-19-Z-A','SA-19-Z-C','SA-19-Z-D','SA-19-Z-B','SA-19-X-D','SA-19-X-C',
'SA-20-V-C','SA-20-Y-A','SA-20-Y-B','SA-20-V-D','SA-20-X-C','SA-20-X-D','SA-20-Z-A','SA-20-Z-B',
'SA-20-Y-D','SA-20-Z-C','SA-20-Z-D','SB-20-X-A','SB-20-X-B','SB-20-V-B','SB-20-V-A','SA-20-Y-C',
'SB-20-V-C','SB-20-V-D','SB-20-Y-A','SB-20-Y-B','SB-20-Y-D','SB-20-Y-C','SC-20-V-A','SC-20-V-C',
'SC-20-V-D','SC-20-V-B','SB-20-Z-A','SB-20-Z-C','SC-20-X-A','SC-20-X-C','SC-20-X-D','SC-20-X-B',
'SB-20-Z-D','SB-20-Z-B','SB-20-X-C','SB-20-X-D','SB-21-V-C','SB-21-V-A','SB-21-V-B','SB-21-V-D',
'SB-21-Y-A','SB-21-Y-B','SB-21-Y-C','SC-21-V-C','SC-21-V-A','SC-21-V-B','SC-21-V-D','SB-21-Y-D',
'SB-21-Z-A','SB-21-Z-C','SC-21-X-A','SC-21-X-B','SB-21-Z-D','SB-21-Z-B','SB-21-X-C','SB-21-X-D',
'SB-21-X-A','SB-21-X-B','SA-21-Z-C','SA-21-Z-D','SA-21-Z-B','SA-21-Z-A','SA-21-Y-D','SA-21-Y-B',
'SA-21-Y-C','SA-21-Y-A','SA-21-V-C','SA-21-V-D','SA-21-X-C','SA-21-X-D','SA-22-V-C','SB-22-V-A',
'SA-22-Y-C','SA-22-Y-A','SA-22-V-D','SA-22-Y-B','SA-22-Y-D','SB-22-V-B','SA-22-Z-A','SA-22-Z-C',
'SA-22-X-C','SA-22-X-D','SA-23-V-C','SA-23-Y-A','SA-23-Y-C','SA-22-Z-D','SA-22-Z-B','SB-22-X-A',
'SB-22-X-B','SB-22-X-C','SB-22-X-D','SB-23-V-C','SB-23-V-A','SB-23-Y-A','SB-23-Y-C','SB-22-Z-D',
'SC-22-X-B','SB-22-Z-B','SB-22-Z-A','SB-22-Z-C','SC-22-X-A','SB-22-Y-D','SC-22-V-B','SC-22-V-A',
'SB-22-Y-C','SB-22-Y-B','SB-22-Y-A','SB-22-V-D','SB-22-V-C','SC-21-X-D','SC-22-V-C','SC-22-Y-A',
'SC-21-Z-B','SC-22-Y-C','SC-21-Z-D','SD-21-X-B','SD-21-X-D','SD-22-V-A','SD-22-V-C','SC-22-Y-B',
'SC-22-Y-D','SD-22-V-B','SD-22-V-D','SC-22-Z-C','SD-22-X-A','SC-22-Z-A','SC-22-X-C','SC-22-V-D',
'SC-22-X-D','SC-22-Z-B','SC-23-V-C','SC-23-Y-A','SC-23-V-A','SC-23-Y-C','SD-23-V-A','SD-22-X-B',
'SC-22-Z-D','SD-22-X-C','SD-22-X-D','SD-22-Z-A','SD-22-Z-B','SD-22-Z-C','SD-22-Z-D','SD-23-Y-A',
'SD-23-V-C','SD-23-Y-C','SE-22-X-B','SE-22-X-A','SE-22-X-C','SE-22-V-D','SE-22-V-B','SE-22-Y-A',
'SE-22-V-C','SE-22-V-A','SD-22-Y-D','SD-22-Y-C','SD-22-Y-B','SD-22-Y-A','SE-21-X-B','SD-21-Z-D',
'SD-21-Z-B','SE-21-X-D','SE-21-Z-B','SE-21-X-C','SE-21-X-A','SE-21-Y-B','SE-21-V-D','SE-21-V-B',
'SE-20-Z-D','SE-20-Z-B','SE-21-V-C','SE-20-X-D','SE-21-V-A','SD-21-Y-C','SD-21-Y-D','SE-20-X-B',
'SD-20-Z-D','SD-20-Z-B','SD-21-Y-A','SD-21-Y-B','SD-21-V-D','SD-21-X-C','SD-21-Z-A','SD-21-Z-C',
'SD-21-X-A','SD-21-V-B','SC-21-Y-D','SC-21-Z-C','SC-21-Z-A','SC-21-X-C','SC-21-Y-B','SC-21-Y-C',
'SC-21-Y-A','SC-20-Z-B','SC-20-Z-D','SD-20-X-B','SD-20-X-D','SD-21-V-A','SD-21-V-C','SD-20-Z-A',
'SD-20-X-C','SD-20-Y-B','SD-20-V-D','SD-20-V-B','SD-20-X-A','SC-20-Z-C','SC-20-Z-A','SC-20-Y-B',
'SC-20-Y-D','SD-20-V-A','SC-20-Y-C','SC-20-Y-A','SD-20-V-C','SD-20-Y-A','SD-20-Y-C','SD-20-Y-D',
'SE-20-V-A','SE-20-V-C','SE-20-V-D','SE-20-V-B','SE-20-X-A','SD-20-Z-C','SE-20-X-C','SE-20-Y-B',
'SE-20-Y-D','SE-20-Z-A','SE-20-Z-C','SF-20-X-A','SF-20-V-B','SF-20-V-A','SE-20-Y-C','SE-20-Y-A']
print(chartList)
var integratedData = ee.Image('projects/mapbiomas-raisg/public/collection1/mapbiomas_raisg_panamazonia_collection1_integration_v1').aside(print)
var mosaicData = ee.ImageCollection('projects/mapbiomas-raisg/MOSAICOS/workspace-c1')
//var chartList = ['SA-22-V-D']
var countryListName = ['Brazil','Bolivia','Peru','Ecuador','Colombia','Venezuela','Guyana','Suriname','French Guiana']
var countryListFIPS = ['BR','BL','PE','EC','CO','VE','GY','NS','FG']
var yearList = ['2000','2001','2002','2003', 
                '2004','2005','2006',
                '2007','2008','2009',
                '2010','2011','2012',
                '2013','2014','2015',
                '2016','2017']
var app = {
  listenerEvnt :0,
  grid_active:null,
  dateList: ee.List([]),
  choosedCharts: ee.List([]),
};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'RAISG Download Toolkit',
        style: TITLE_STYLE
      }),
      ui.Label('This app allows you to download RAISG data to your Google Drive®',PARAGRAPH_STYLE),
     ],null, {backgroundColor: colors.gray}),
  };
  var periodSelectionSingle = function(e){
    if(e){
      app.filters.multiPeriod.setValue(false)
      app.filters.startDate.setDisabled(true)
      app.filters.endDate.setDisabled(true)
      app.filters.startDate.style().set({color: 'gray'})
      app.filters.endDate.style().set({color: 'gray'})
    }else{
      app.filters.startDate.setDisabled(false)
      app.filters.endDate.setDisabled(false)
      app.filters.startDate.style().set({color: 'black'})
      app.filters.endDate.style().set({color: 'black'})
      app.filters.multiPeriod.setValue(true)
    }
  }
  var periodSelectionMulti = function(e){
    if(e){
      app.filters.singlePeriod.setValue(false)
      app.filters.singleDate.setDisabled(true)
      app.filters.singleDate.style().set({color: 'gray'})
    }else{
      app.filters.singleDate.style().set({color: 'black'})
      app.filters.singleDate.setDisabled(false)
      app.filters.singlePeriod.setValue(true)
    }
  }
  /* The collection filter controls. */
  app.filters = {
   // mapCenter: ui.Checkbox({label: 'Filter to map center', value: false,style:{backgroundColor: colors.gray},disabled:true}),
    singlePeriod: ui.Checkbox({label: 'Single Year', value: true,style:{backgroundColor: colors.gray,
    }, onChange:periodSelectionSingle}),
      singleDate:ui.Select(yearList,'Year','2000',null,true),
    multiPeriod: ui.Checkbox({label: 'Years Range', value: false,style:{backgroundColor: colors.gray},
    onChange:periodSelectionMulti}),
      startDate: ui.Select(yearList,'Year','2000',null,true),
      endDate: ui.Select(yearList,'Year','2017',null,true),
    applyButton: ui.Button('Preview', app.applyFilters,false,{backgroundColor: colors.gray}),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Period Selection', LABEL_STYLE),
      app.filters.singlePeriod,
      ui.Panel([ui.Label('Year:', app.HELPER_TEXT_STYLE), app.filters.singleDate],ui.Panel.Layout.flow('horizontal'),LABEL_STYLE),
      app.filters.multiPeriod,
      ui.Panel([ui.Label('Initial Year:', app.HELPER_TEXT_STYLE), app.filters.startDate],ui.Panel.Layout.flow('horizontal'),LABEL_STYLE),
      ui.Panel([ui.Label('Final Year', app.HELPER_TEXT_STYLE), app.filters.endDate],ui.Panel.Layout.flow('horizontal'),LABEL_STYLE),
      //app.filters.mapCenter,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'),{backgroundColor: colors.gray})
    ],
     style: {
      backgroundColor: colors.gray
    }
  });
  var listener_MarkOnMapEvent= function(coord){
    coord = ee.Dictionary(coord)
    var point = ee.Geometry.Point([coord.get('lon'),coord.get('lat')]);
    var featSelected = ee.Feature(gridVector.filterBounds(point).first());
    var name = featSelected.get('name');
    print('Antes',app.choosedCharts)
    app.choosedCharts.filter(ee.Filter.eq('name',name)).size().evaluate(function(bool){
      if(bool){
        app.choosedCharts = app.choosedCharts.remove(featSelected)
      }else{
        app.choosedCharts = app.choosedCharts.add(featSelected)   
      } 
      print('Depois',app.choosedCharts)
      var layers = Map.layers()
      for(var i = 0; i < layers.length();i++){
        if(layers.get(i).getName() == 'Active GRID'){
          Map.remove(layers.get(i))
        }
      }
      app.grid_active = ee.FeatureCollection(app.choosedCharts)
      Map.addLayer(ee.Image().paint(app.grid_active,0,2),{palette:['#1bff00']},'Active GRID')
    })
  }
  var markOnMapEvent = function(e){
    if(e){
      app.grid_active = null;
      Map.style().set('cursor', 'crosshair');
      app.listenerEvnt = Map.onClick(listener_MarkOnMapEvent)
      app.picker.markOnMap.setValue(true)
      app.picker.ByCountry.setValue(false)
      app.picker.ByChartId.setValue(false)
    }
  }
  var countryOnMapEvent = function(e){
    if(e){
      Map.style().set('cursor', 'hand');
      Map.unlisten(app.listenerEvnt)
      app.picker.chartSelector.setDisabled(true)
      app.picker.chartSelector.setValue(null)
      app.picker.chartSelector.style().set({color: 'gray'})
      app.picker.countrySelector.setDisabled(false)
      app.picker.countrySelector.style().set({color: 'Black'})
      app.picker.ByCountry.setValue(true)
      app.picker.markOnMap.setValue(false)
      app.picker.ByChartId.setValue(false)
    }
  }
  var chartOnMapEvent = function(e){
    if(e){
      Map.style().set('cursor', 'hand');
      var layers = Map.layers()
      for(var i = 0; i < layers.length();i++){
        if(layers.get(i).getName() == 'Active GRID'){
          Map.remove(layers.get(i))
        }
      }
      app.picker.ByChartId.setValue(true)
      app.picker.chartSelector = app.picker.chartSelector.setDisabled(false)
      app.picker.chartSelector.style().set({color: 'Black'})
      app.picker.countrySelector.setDisabled(true)
      app.picker.countrySelector.setValue(null)
      app.picker.countrySelector.style().set({color: 'gray'})
      app.picker.markOnMap.setValue(false)
      app.picker.ByCountry.setValue(false)
    }
  }
   var event_chartSelection = function(e){
    var grid  = gridVector.filterMetadata('name','equals',e)
    app.grid_active = grid;
     // REMOVE OLD ACTIVE-GRID LAYER
    var layers = Map.layers()
    for(var i = 0; i < layers.length();i++){
      if(layers.get(i).getName() == 'Active GRID'){
        Map.remove(layers.get(i))
      }
    }
    Map.addLayer(ee.Image().paint(app.grid_active,0,2),{palette:['#1bff00']},'Active GRID')
   }
  var event_countrySelection = function(e){
    var countryBoundary = lsib.filterMetadata('country_na','equals',e)
    app.grid_active = gridVector.filterBounds(countryBoundary)
    // REMOVE OLD ACTIVE-GRID LAYER
    var layers = Map.layers()
    for(var i = 0; i < layers.length();i++){
      if(layers.get(i).getName() == 'Active GRID'){
        Map.remove(layers.get(i))
      }
    }
    Map.addLayer(ee.Image().paint(app.grid_active,0,2),{palette:['#1bff00']},'Active GRID')
  }
  /* The image picker section. */
  app.picker = {
    markOnMap: ui.Checkbox({label: 'By Click', value: false,style:{backgroundColor: colors.gray,
    }, onChange:markOnMapEvent}),
      //viewMarkButton: ui.Button('Accept Polygon', acceptGeometry,false,{backgroundColor: colors.gray}),
    ByCountry: ui.Checkbox({label: 'By Country', value: false,style:{backgroundColor: colors.gray,
    }, onChange:countryOnMapEvent})    ,
      countrySelector:ui.Select(countryListName,'Country',null,event_countrySelection,false),
    ByChartId: ui.Checkbox({label: 'By Chart ID', value: false,style:{backgroundColor: colors.gray,
      }, onChange:chartOnMapEvent}),
      chartSelector:ui.Select(chartList,'Chart ID',null,event_chartSelection,false),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Select an image ID',
      onChange: app.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Center on map', function() {
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Chart Selection', LABEL_STYLE),
      ui.Panel([
        ui.Panel([app.picker.markOnMap], ui.Panel.Layout.flow('horizontal'),{backgroundColor: colors.gray}),
        ui.Panel([app.picker.ByCountry,app.picker.countrySelector], ui.Panel.Layout.flow('horizontal'),{backgroundColor: colors.gray}),
        ui.Panel([app.picker.ByChartId,app.picker.chartSelector], ui.Panel.Layout.flow('horizontal'),{backgroundColor: colors.gray}),
      ], ui.Panel.Layout.flow('vertical'),{backgroundColor: colors.gray})
    ],
    style: {backgroundColor: colors.gray}
  });
  /* The visualization section. */
  app.vis = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.VIS_OPTIONS[app.vis.select.getValue()];
        app.vis.label.setValue(option.description);
        // Refresh the map layer.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('3) Select a visualization', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  /* The export section. */
  app.export = {
    button: ui.Button({
      label: 'Export to Drive',
      // React to the button's click event.
      onClick: function() {
        var geomExport = ee.FeatureCollection(app.grid_active.union(1))
        print('GeomExport',geomExport)
        print('DateList',app.dateList)
        var listSize =  app.dateList.size().getInfo();
        for(var year = 0; year <listSize; year ++){
          var taskId = ee.data.newTaskId(1);
          var yearValue = app.dateList.get(year).getInfo();
          var classified = integratedData.select('classification_'+yearValue).clip(geomExport)
          var fileName = 'RASIG'+yearValue
          if(app.picker.ByCountry.getValue()){
            fileName = 'RAISG_'+yearValue+'_'+app.picker.countrySelector.getValue()
          }
          if(app.picker.ByChartId.getValue()){
            fileName = 'RAISG_'+yearValue+'_'+app.picker.chartSelector.getValue()
          }
          if(app.picker.markOnMap.getValue()){
            fileName = 'RAISG_'+yearValue+'_clickSelected'
          }
          var params = {
                        type: 'EXPORT_IMAGE',
                        json: ee.Serializer.toJSON(classified),
                        description: fileName,
                        driveFolder: 'RAISIG-EXPORT',
                        fileNamePrefix: fileName,
                        region: JSON.stringify(geomExport.geometry().bounds().getInfo()),
                        scale: 30,
                        maxPixels: 1e13,
                        skipEmptyTiles: true,
                      };
          var status = ee.data.startProcessing(taskId, params);
          if (status) {
              if (status.started == 'OK') {
                  print("Exporting data...")
              } else {
                  print("Exporting error!")
              }
          }
        }
      },
      style:{color:'#215925',border: '2px solid #4CAF50'},
      disabled:true
    })
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('3) Export', LABEL_STYLE),
      app.export.button
    ],
    style:  {backgroundColor: colors.gray}
  });
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      //app.vis.panel,
      app.export.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.setCenter(-60.02,-3.9, 4);
  ui.root.insert(0, main);
  app.applyFilters();
  var Test = function() {
    var panel = ui.Panel({widgets:[ui.Label('TEST')]})
    drawing_map.add(panel)
    //ui.root.clear()
    ui.root.add(drawing_map)
  }
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.vis.select,
      app.filters.singleDate,
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
      //app.filters.mapCenter,
      app.picker.select,
      app.picker.centerButton,
      app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  app.temporalFilter = function(){
  }
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    Map.clear();
    app.setLoadingMode(true);
    app.dateList = ee.List([])
    if(app.filters.singlePeriod.getValue()){
        var value = app.filters.singleDate.getValue();
        app.dateList = app.dateList.add(value)
        Map.addLayer(integratedData.select('classification_'+value),MAP_STYLE,'Classification '+value)
    }else{
      var initialDate =  app.filters.startDate.getValue();
      print('Initial Date',initialDate)
      var finalDate = app.filters.endDate.getValue();
      print('Final Date',finalDate)
      for(var i = initialDate; i <= finalDate; i++){
        Map.addLayer(integratedData.select('classification_'+i),MAP_STYLE,'Classification '+i)
        app.dateList = app.dateList.add(i)
      }
    }
    print('DateList',app.dateList)
    Map.addLayer(ee.Image().paint(gridVector,0,2),{'palette': '#000000'},'GRID')
      app.setLoadingMode(false);
    };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    //Map.clear();
    var imageId = app.picker.select.getValue();
    if (imageId) {
      // If an image id is found, create an image.
      var image = ee.Image(app.COLLECTION_ID + '/' + imageId);
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, imageId);
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'LANDSAT/LC08/C01/T1_RT_TOA';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '9px 3px 0px 25px',
      fontSize: '13px',
      color: 'black',
      shown:'true',
      backgroundColor: colors.transparent
  };
  app.DISABLE_HELPER_TEXT_STYLE = {
      margin: '9px 3px 0px 25px',
      fontSize: '13px',
      color: 'gray',
      shown:'false',
      backgroundColor: colors.transparent
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.VIS_OPTIONS = {
    'False color (B7/B6/B4)': {
      description: 'Vegetation is shades of red, urban areas are ' +
                   'cyan blue, and soils are browns.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B4']}
    },
    'Natural color (B4/B3/B2)': {
      description: 'Ground features appear in colors similar to their ' +
                   'appearance to the human visual system.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
    'Atmospheric (B7/B6/B5)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears blue.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B5']}
    }
  };
};
app.boot();