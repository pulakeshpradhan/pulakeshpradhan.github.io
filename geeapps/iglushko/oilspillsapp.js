var app={};
//BasemapsVis
var baseMap = [
  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#c9b2a6'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{color: '#dcd2be'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{color: '#ae9e90'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#000040'}, {visibility: 'simplified'}]
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{color: '#408080'}]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [{color: '#736666'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{color: '#1b1c06'}]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry.fill',
    stylers: [{color: '#1b1c06'}]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#93817c'}]
  },
  {featureType: 'poi.business', stylers: [{visibility: 'off'}]},
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#1b1c06'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#447530'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#f5f1e6'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#fdfcf8'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#f8c967'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#e9bc62'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{color: '#e98d58'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{color: '#db8555'}]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#806b63'}]
  },
  {featureType: 'transit', stylers: [{visibility: 'off'}]},
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{color: '#8f7d77'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#ebe3cd'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#92c5de'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#92998d'}]
  }
];
app.setMapStyle = function() {
    app.insetMap = null;
    app.map = ui.Map();
    app.map.setOptions('mapStyle', {mapStyle: baseMap});
    app.map.style().set({cursor:'crosshair'});
    app.map.setControlVisibility({
        all: false,
        layerList: false,
        zoomControl: true,
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        drawingToolsControl: false
    });
    //app.map.centerObject(app.roi);
    ui.root.add(app.map);
    print('SET MAP STYLE [OK]'); // todo: delete.
};
app.createConstants = function() {
///////////VIZ SENT-1////////////////////////////////////////////////////////
  //.saoi = ee.FeatureCollection(geometry)
  app.COLLECTION_ID = 'COPERNICUS/S1_GRD';
  app.COLLECTION_ID_S2 = 'COPERNICUS/S2';
  app.Stretcher = require("users/iglushko/Classifications_methods:stretcher");
///////////////////////////////////////////////////////////////////////////////
  app.Palette= ['cf2ccf','9b2ccf', '682ccf', '2c39cf', '2c5fcf',
'2c96cf', '2cbfcf','2ccfbf', '2ccf8e', '2ccf5d', '31cf2c',
'75cf2c', 'a4cf2c','f4e21a', 'f4a019', 'f45a18', 'f41818','f41861'];
  app.Countries=ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
  //app.Countries=app.Countries.filter(ee.Filter.or(ee.Filter.eq('wld_rgn', 'Africa'),ee.Filter.eq('wld_rgn', 'South America')));
  app.SelectedCountry='Angola';
  app.period='week';
  app.bufferd=200000;
  app.VIS_OPTIONS = {
    'Landsat': {min: 15, max: 128, bands: ['last_b50','last_b40','last_b30']},
    'Sent1-norm': {min: 10, max: 150, palette: ['["VV","VH","VVnorm"]']},
    'Sent2': {min: 10, max: 3000, palette: ['["swir","nir","red"]']}
  };
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '14px',
      fontWeight: 'bold',
      width:'140px',
      color: 'gray'};
  app.URL_TEXT_STYLE = {
      margin: '4px 0 -1px 4px',
      fontSize: '11px',
      color: '3792cb'};
  app.eez =ee.FeatureCollection('users/iglushko/eez');
  app.selEez=app.eez.filter(ee.Filter.eq('country', 'Brazil'));
};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'SENTINEL-1 TOOL',
        style: {fontWeight: 'bold', fontSize: '25px',margin: '0px 8px 8px 8px',color: '#f44a2c'}
      }),
      ui.Label('Add satellite data for selected country coastal zone and dates range (mean composites between 2 dates)',
          {margin: '0px 8px 8px 8px',padding: '8px 8px 8px 8px',border: '1px solid #80808080', color: '#505050',fontSize: '12px'})
    ])
  };
  var features = ee.FeatureCollection(app.eez).sort('country').getInfo()['features'];
  var items=[];
  for (var i = 0; i < features.length; i++) {
      items.push({
        label: features[i]['properties']['country'],
        value: features[i]['properties']['country']
      });
  }
  //print(items)
  app.filters = {
    c1: ui.Select({
      items:items, 
      onChange: function(value) {
        print(value)
        var selected_country = app.eez.filter(ee.Filter.eq('country', value));
        app.map.clear();
        app.map.setOptions('mapStyle', {mapStyle: baseMap});
        app.map.addLayer(selected_country, {color:'#f44a2c'}, value);
        app.map.centerObject(selected_country);
        app.SelectedCountry=value;
        },
      style:{width:'90px',fontWeight: 'bold', fontSize: '18px',color: '#f44a2c'},
      placeholder:'NAME'
    }),
    d1: ui.Textbox('YYYY-MM-DD', '2022-01-01',0,0,{fontWeight: 'bold', fontSize: '16px', color: '3792cb',width:'90px'}),
    d2: ui.Textbox('YYYY-MM-DD', '2022-01-10',0,0,{fontWeight: 'bold', fontSize: '16px', color: '3792cb',width:'90px'}),
    apply: ui.Button('APPLY',app.refreshPlace,0,{fontWeight: 'bold', fontSize: '18px', width:'90px',color: '#f44a2c'}),
    c2: ui.Select({
      items:  [
    {label: 'month', value: 'month'},{label: 'week', value: 'week'},{label: 'day', value: 'day'}], 
      onChange: function(value) {
        app.period=value;
      },
      style:{width:'90px'},
      placeholder:'Period'
    }),
    c3: ui.Select({
      items: [
    {label: '100km', value: 100000},{label: '500km', value: 200000},{label: '1000km', value: 300000}],
      onChange: function(value) {
        app.bufferd=value;
    }
    }),
    //apply: ui.Button('APPLY', app.refreshPlace(),0,{fontWeight: 'bold', fontSize: '18px', color: 'f44a2c', backgroundColor: 'blue',margin: '0px 0 -0px 0px'}),
  };
  app.filters.panel = ui.Panel({
    widgets: [ 
      ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Select country', app.HELPER_TEXT_STYLE), app.filters.c1], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Date start:', app.HELPER_TEXT_STYLE), app.filters.d1], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Date end:', app.HELPER_TEXT_STYLE), app.filters.d2], ui.Panel.Layout.flow('horizontal')),
      //ui.Panel([ui.Label('Select period', app.HELPER_TEXT_STYLE), app.filters.c2], ui.Panel.Layout.flow('horizontal')),
      //ui.Panel([ui.Label('Select buffer', {fontWeight: 'bold', fontSize: '12px'}), app.filters.c3], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Apply filters', app.HELPER_TEXT_STYLE), app.filters.apply], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
      });
  app.inspector_intro = ui.Panel([ui.Label('1. Select country and dates and after press "APPLY"',
  {margin: '0px 8px 8px 8px',padding: '8px 8px 0px 8px',border: '1px solid #80808080',color: '#494a4e',fontSize: '12px', })]);
  app.break1 = ui.Panel([ui.Label('')]);
  app.inspector_intro1 = ui.Panel([ui.Label('2.Pan and zoom to point of interest and after click on the map',
  {margin: '0px 8px 8px 8px',padding: '8px 8px 0px 8px',border: '1px solid #80808080',color: '#494a4e',fontSize: '12px', })]);
  app.break2 = ui.Panel([ui.Label('')]);
  app.inspector_intro2 = ui.Panel([ui.Label('3.Copy links on the end to get coordinates and Sentinel-1 data availiable for this point',
  {margin: '0px 8px 8px 8px',padding: '8px 8px 0px 8px',border: '1px solid #80808080',color: '#494a4e',fontSize: '12px', })]);
  app.inspector = ui.Panel([ui.Label('')]);
  app.export = ui.Panel([ui.Label('')]);
};
/////////////////////////////////////////////////////////////////////////////////////
///////////FILTER VALUES TO DO - CREATE PANEL////////////////////////////////////////
app.refreshPlace = function() {
  //app.map.clear();
  app.inspector.clear();
  app.export.clear();
  //app.map.setOptions("HYBRID");
  var AOI = ee.FeatureCollection(app.eez.filter(ee.Filter.eq('country', app.SelectedCountry)).geometry().buffer(app.bufferd));
  app.map.addLayer(AOI,{},'AOI',false);
  var Date_Start = ee.Date(app.filters.d1.getValue());
  var Date_End = ee.Date(app.filters.d2.getValue());
//////////////////////////////////////////////////////////////////////////////////////
  var S1 = ee.ImageCollection(app.COLLECTION_ID)
    .filterDate(Date_Start,Date_End)
    .filterMetadata('transmitterReceiverPolarisation', 'equals', ['VV', 'VH'])
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    //.filterBounds(AOI)
    .map(create_norm_diff)
    .map(setDate);
  //Map.addLayer(S1,{},'S1')
  var im = ee.Image(S1.mean().set('system:time_start', Date_Start).set('size', S1.size()));
  displayerS1(im,formatDate(Date_Start).getInfo(),formatDate(Date_End).getInfo());
//////////////////////GET SENT-2 LIST FOR ALL PERIOD//////////////////////////////////////
  //var Preprocessor = require("users/iglushko/Classifications_methods:Prepare_collection");
  //var collection = Preprocessor.Selector.prepareCollection('COPERNICUS/S2_SR').filterBounds(AOI);
  var collection = ee.ImageCollection(app.COLLECTION_ID_S2)
  var S2 = collection
    .filterDate(Date_Start,Date_End)
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 65)
    .filterBounds(AOI)
    //.map(get_water_S2)
    .map(setDate);
  var imS2 = ee.Image(S2.median().set('system:time_start', Date_Start).set('size', S2.size()));
  //var strS2=stretchingS2(imS2);
  displayerS2(imS2,formatDate(Date_Start).getInfo(),formatDate(Date_End).getInfo());
//////////////////////////////////////////////////////////////////////////////////////
//////////Create list of day dates for time series chart////////////////////////////////////////
/////////////GET CHART/////////////////////////////////////////////////////////////////
  app.map.onClick(function(coords) {
    //clear
    app.inspector.clear();
    app.export.clear();
  // Show the loading label.
    app.inspector.widgets().set(0, ui.Label({
      value: 'Loading...',
      style: {color: 'gray'}
    }));
    var click_point = ee.Geometry.Point(coords.lon, coords.lat);
    var smallAOI=ee.FeatureCollection(click_point).geometry().buffer(100000);
    removeLayer('pointbuffer');
    app.map.addLayer(smallAOI,{},'pointbuffer');
    var im_date = formatDate(ee.Date(im.get('system:time_start')));
    Export.image.toDrive({
      image: im.select('VV'),
      region:smallAOI,
      description: im_date.getInfo(),
      scale: 20,
      folder:'Brazil_oil_spills',
      maxPixels: 1e13
    });
    app.inspector.widgets().set(0, ui.Label({
            value: 'ROI Lat/Lon: ' + ee.Number(coords.lat).format('%.5f').getInfo() + '/'+ ee.Number(coords.lon).format('%.5f').getInfo(),
            style:app.HELPER_TEXT_STYLE
          }));
    var chart= ui.Chart.image.series(S1.select('VV'), click_point,ee.Reducer.mean(), 300)
      .setChartType('ScatterChart')
      .setOptions({
        title: 'Sent-1 VV band \n values time series at ROI',
        hAxis: {title: 'date:time', format: 'YYYY-MM-dd hh:mm:ss'},
        yAxis: {title: 'VV'},
        lineWidth: 1,
        pointSize: 3,
      });
    var S2 = collection
      .filterDate(Date_Start,Date_End)
      .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 65)
      .filterBounds(smallAOI)
      //.map(get_water_S2)
      .map(setDate);
    var chartS2= ui.Chart.image.series(S2.select('B12'), click_point,ee.Reducer.mean(), 300)
      .setChartType('ScatterChart')
      .setOptions({
        title: 'Sent-2 "swir2" band \n values time series at ROI',
        hAxis: {title: 'date:time', format: 'YYYY-MM-dd hh:mm:ss'},
        yAxis: {title: 'B12'},
        lineWidth: 1,
        pointSize: 3,
      });
    app.inspector.widgets().set(1, chart);
    app.inspector.widgets().set(2, chartS2);
    var urlpoint=ee.FeatureCollection(click_point).getDownloadURL('kml', 0, 'test.kml');
    app.export.widgets().set(0, ui.Label({
          value: 'Point download URL:',
          style:app.HELP_TEXT_STYLE
        }));
    app.export.widgets().set(1, ui.Label({
          value: urlpoint,
          style:app.URL_TEXT_STYLE
        }));
    //var size = col.size().getInfo();
    var totmean = im.select('VV').reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: smallAOI,
      scale: 200,
      maxPixels: 1e18
    });
    var im_date = formatDate(ee.Date(im.get('system:time_start')));
    var i=2;
    exportS1(im,im_date.getInfo(),ee.FeatureCollection(smallAOI),i,totmean);
    //var ii=5;
    //classS1(im,im_date.getInfo(),ee.FeatureCollection(smallAOI),ii,totmean);
  });
///////////////////FUNCTIONS///////////////////////////////////////////////////////////
///////////////////IG//////////////////////////////////////////////////////////////////
  function removeLayer(name) {
    var layers = app.map.layers();
    // list of layers names
    var names = [];
    layers.forEach(function(lay) {
      var lay_name = lay.getName();
      names.push(lay_name);
    });
    // get index
    var index = names.indexOf(name);
    if (index > -1) {
      // if name in names
      var layer = layers.get(index);
      app.map.remove(layer);
    } else {
      print('Layer '+name+' not found');
    }
  }
  function formatDate(date){
    return ee.Date(date).format('YYYY-MM-dd');
  }
  function formatDateTime(date){
    return ee.Date(date).format('YYYY-MM-dd hh:mm:ss');
  }
  function setDate(im){
    return im.set('system:time_start',ee.Date(im.get('system:time_start')).format('YYYY-MM-dd hh:mm:ss'));
  }  
  function create_norm_diff(image) {
    var ang = image.select(['angle']);
    var corr1 = image;//.updateMask(ang.gt(20.63993)).updateMask(ang.lt(60.53993));
    var vh = corr1.select('VH').subtract(corr1.select('angle').multiply(Math.PI/180.0).cos().log10().multiply(10.0));
    var vhcorr = vh.addBands(image.select('VV').subtract(image.select('angle').multiply(Math.PI/180.0).cos().log10().multiply(10.0)));
  return image.addBands(ee.Image(vhcorr.expression('(VH - VV) / (VH + VV)', {'VH': vhcorr.select(['VH']),'VV': vhcorr.select(['VV'])})));
  }
  //////////STRETCH/////////////////////////////////////////////////////////
  function stretchingS1(img){
    var bandsS1 = ['VH_1'];
    var str_data = app.Stretcher.Stretcher.stretcherS1(bandsS1,img,ee.FeatureCollection(img.geometry()),500,1,99);
    var imgRGB = ee.Image(str_data.get('imRGB'));
    return img.addBands(ee.Image(imgRGB).rename('imgStretched'));
  }
  function stretchingS2(img){
    //var bandsS1 = ["B12","B8","B4"];
    var bandsS2 = ["swir1","nir","red"];
    var str_data = app.Stretcher.Stretcher.stretcher(bandsS2,img,AOI,1000,3,97);
    return str_data;
  }
  function get_water_S2(img){
    var mask = img.select('SCL');
    return img.updateMask(mask.eq(6));
  }
  function displayerS1(im,d1,d2) {
    app.map.addLayer(im.select('VH_1'),{min:0,max:0.5,"opacity":0.9},'Sent1 from '+d1+' to '+d2);
  }
  function exportS1(im,name,smallAOI,i,mean) {
    var urlim=im.select('VV').clipToBoundsAndScale(smallAOI.geometry(),2000,2000).getDownloadURL({'name':name});
    //print(ee.String(urlim).slice(0, 157));
    var output = ee.Dictionary({value:'No data'});
    var condition1 = ee.Number(mean.get('VV').getInfo()+0.0001).lt(0);
    output = ee.Dictionary(ee.Algorithms.If(condition1, output.set('value', ee.String(urlim).slice(0, 157)), output.set('value', 'No data')));
    //
    app.export.widgets().set(i, ui.Label({
            value: 'Image thumbnail '+name+' download URL:',
            style:app.HELP_TEXT_STYLE
          }));
    app.export.widgets().set(i+1, ui.Label({
            value: output.get('value').getInfo(),
            style:app.URL_TEXT_STYLE
          }));
  }
  function displayerS2(im,d1,d2) {
    //var imRGB=ee.Image(im.get('imRGB'));
    //Map.addLayer(imRGB,{},'Sent2 from '+d1+' to '+d2,false);
    app.map.addLayer(im,{'bands':["B12","B8","B4"],'min':500,'max':2400},'Sent2 from '+d1+' to '+d2,false);
  }
  function displayer(im,name) {
    app.map.addLayer(im,{},'Sent-2-'+name);
  }
  function norm_to_float(image,aoi){
    var VV=image.select('VV');
    var VVminMax = image.reduceRegion({
      reducer: ee.Reducer.minMax(),
      geometry:aoi,
      scale: 10,
      maxPixels: 1e13
    });
    var VV1=VV.unitScale(ee.Number(VVminMax.get('VV_min')), ee.Number(VVminMax.get('VV_max')));
    return ee.Image([VV1]).rename('VV')
  }
  ////classification display and exports
  function classS1(im,name,smallAOI,i,mean) {
    var model = ee.Model.fromAiPlatformPredictor({
      projectName: 'peatfires-153915',
      modelName:'ai_oil',
      version:'v1579533184',
      inputTileSize :[256, 256],
      //inputOverlapSize: [4, 4],
      proj:ee.Projection('EPSG:4326').atScale(10),
      //crs:'EPSG:4326',
      fixInputProj: true,
      outputBands:{'oil': {
          'type': ee.PixelType.float()
        }
      }
    });
    var s1source=norm_to_float(im.clipToBoundsAndScale(smallAOI.geometry(),1000,1000),smallAOI);
    var predictions = model.predictImage(s1source.toArray())
    app.map.addLayer(predictions.updateMask(predictions.gt(0.9999)), {min:0.9999,max:1,palette:['green','red']}, 'OILAI-'+name);
    var urlim1=predictions.getDownloadURL({'name':name,'scale':10});
    var output = ee.Dictionary({value:'No data'});
    var condition1 = ee.Number(mean.get('VV').getInfo()+0.0001).lt(0);
    output = ee.Dictionary(ee.Algorithms.If(condition1, output.set('value', urlim1), output.set('value', 'No data')));
    //
    app.export.widgets().set(i, ui.Label({
            value: 'Prediction '+name+' download URL:',
            style:app.HELP_TEXT_STYLE
          }));
    app.export.widgets().set(i+1, ui.Label({
            value: output.get('value').getInfo(),
            style:app.URL_TEXT_STYLE
          }));
  }  
};
/////////////////BOOT//////////////////////////////////////////////////////////////////////
app.boot = function() {
  ui.root.clear();
  app.setMapStyle();
  app.createConstants();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.inspector_intro,
      app.break1,
      app.inspector_intro1,
      app.break2,
      app.inspector_intro2,
      app.inspector,
      app.export
    ],
    style: {width: '275px', padding: '4px'}
  });
  ui.root.add(main);
  var scountry=ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry));
  app.map.centerObject(scountry,5);
  //app.refreshPlace();
};
app.boot();