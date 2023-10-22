var app={};
app.createConstants = function() {
///////////VIZ SENT-1////////////////////////////////////////////////////////
  //.saoi = ee.FeatureCollection(geometry)
///////////////////////////////////////////////////////////////////////////////
  app.Palette= ['87CEEB','F0F8FF','FFA500', 'FF4500'];
  app.period='month';
  app.bufferd=200000;
  app.VIS_OPTIONS = {
    'LSTA': {min: -15, max: 15, palette: app.Palette}
  };
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '14px',
      fontWeight: 'bold',
      width:'140px',
      color: 'gray'};
};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Land surface temperatures anomalies on Google Earth Engine',
        style: {fontWeight: 'bold', fontSize: '16px', margin: '8px 0 -3px 8px',color: 'black'}
      }),
      ui.Label({
        value: 'author: IG, Global Mapping Hub, Greenpeace',
        style: {fontSize: '12px', margin: '8px 0 -3px 8px',color: 'gray'}
      }),
      ui.Label('This temperature anomalies map is based on data from the MODIS on NASA’s Terra satellite. It shows land surface temperatures (LSTs) averages for selected year and month, compared to the 2001–2010 average for the same month. Red colors depict areas that were hotter than average; blues were colder than average. ',
      {color: 'black',fontSize: '14px', margin: '8px 0 -3px 8px'}),
      ui.Label('Also it shows LSTs anomalies robust linear regression coefficients for 2001-2019. For each month we calculated LSTs difference (LSTsD) from long-term averages and linear regression coefficient (slope) for 2001-2019 period. Summarizing this slope coefficients for seasons and for all year reflect trends in LST seasonal dynamics and global trends of LSTs changes. Blue - LSTsD trend to colder , Red - LSTsD trend to hotter. ',
      {color: 'black',fontSize: '14px', margin: '8px 0 -3px 8px'})
    ])
  };
  //var years = ee.List.sequence(2002, 2021).getInfo();
  var years=['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013',
  '2014','2015','2016','2017','2018','2019','2020']
  //print(years);
  var months=[
    {value:1,label:'JAN'},
    {value:2,label:'FEB'},
    {value:3,label:'MAR'},
    {value:4,label:'APR'},
    {value:5,label:'MAY'},
    {value:6,label:'JUN'},
    {value:7,label:'JUL'},
    {value:8,label:'AUG'},
    {value:9,label:'SEP'},
    {value:10,label:'OCT'},
    {value:11,label:'NOV'},
    {value:12,label:'DEC'}
    ];
  var items=[];
  for (var i = 0; i < 19; i++) {
      items.push({
        label: years[i],
        value: years[i]
      });
  }
  print(items)
  app.filters = {
    c1: ui.Select({
      items:items, 
      onChange: function(value) {
        print(value)
        Map.clear();
        },
      style:{width:'90px'},
      placeholder:'YEAR'
    }),
    c2: ui.Select({
      items:months, 
      onChange: function(value) {
        print(value)
        Map.clear();
        },
      style:{width:'90px'},
      placeholder:'MONTH'
    }),
    //d1: ui.Textbox('YYYY-MM-DD', '2020-02-01',0,0,{fontWeight: 'bold', fontSize: '16px', color: '3792cb',width:'90px'}),
    //d2: ui.Textbox('YYYY-MM-DD', '2020-02-20',0,0,{fontWeight: 'bold', fontSize: '16px', color: '3792cb',width:'90px'}),
    apply: ui.Button('APPLY',app.refreshPlace,0,{fontWeight: 'bold', fontSize: '18px', width:'90px',color: 'ff028b'}),
    c3: ui.Select({
      items:  [
    {label: 'month', value: 'month'},{label: 'week', value: 'week'},{label: 'day', value: 'day'}], 
      onChange: function(value) {
        app.period=value;
      },
      style:{width:'90px'},
      placeholder:'Period'
    })
    //apply: ui.Button('APPLY', app.refreshPlace(),0,{fontWeight: 'bold', fontSize: '18px', color: 'f44a2c', backgroundColor: 'blue',margin: '0px 0 -0px 0px'}),
  };
  app.filters.panel = ui.Panel({
    widgets: [ 
      ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Select year', app.HELPER_TEXT_STYLE), app.filters.c1], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Select month', app.HELPER_TEXT_STYLE), app.filters.c2], ui.Panel.Layout.flow('horizontal')),
      //ui.Panel([ui.Label('Date end:', app.HELPER_TEXT_STYLE), app.filters.d2], ui.Panel.Layout.flow('horizontal')),
      //ui.Panel([ui.Label('Select period', app.HELPER_TEXT_STYLE), app.filters.c2], ui.Panel.Layout.flow('horizontal')),
      //ui.Panel([ui.Label('Select buffer', {fontWeight: 'bold', fontSize: '12px'}), app.filters.c3], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('', app.HELPER_TEXT_STYLE), app.filters.apply], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
      });
  app.inspector_intro = ui.Panel([ui.Label('1. Select year and month, after press APPLY',{color: 'black',fontSize: '14px', margin: '8px 0 -3px 8px'})
  ,ui.Label('2. Pan and zoom to region of interest (ROI) and click on map to get charts for ROI',{color: 'black',fontSize: '14px', margin: '8px 0 -3px 8px'})
  ,ui.Label('Layers (from bottom to top):',{color: 'black',fontSize: '12px', margin: '8px 0 -3px 8px'})
  ,ui.Label('1. LSTsD regression coefficient for all months*',{color: 'black',fontSize: '12px', margin: '8px 0 -3px 8px'})
  ,ui.Label('2. LSTsD regression coefficient for Winter',{color: 'black',fontSize: '12px', margin: '8px 0 -3px 8px'})
  ,ui.Label('3. LSTsD regression coefficient for Summer',{color: 'black',fontSize: '12px', margin: '8px 0 -3px 8px'})
  ,ui.Label('4. LSTsD regression coefficient for Spring',{color: 'black',fontSize: '12px', margin: '8px 0 -3px 8px'})
  ,ui.Label('5. LSTsD regression coefficient for Autumn',{color: 'black',fontSize: '12px', margin: '8px 0 -3px 8px'})
  ,ui.Label('* - for regression we used same color palette, but scale is in nominal numbers',{color: 'black',fontSize: '12px', margin: '8px 0 -3px 8px'})
  ,ui.Label('6. LSTsD for selected year and month (scale from -10C to 10C)',{color: 'black',fontSize: '12px', margin: '8px 0 -3px 8px'})]);
  app.inspector = ui.Panel([ui.Label('')]);
};
/////////////////////////////////////////////////////////////////////////////////////
///////////FILTER VALUES TO DO - CREATE PANEL////////////////////////////////////////
app.refreshPlace = function() {
  Map.clear();
  app.inspector.clear();
  Map.setOptions("HYBRID");
  var prepareColl = require("users/iglushko/Climate:LST");
//////////////////////////////////////////////////////////////////////////////////////
  var mnthReg = ee.ImageCollection(prepareColl.Data.monthlyRegression);
  Map.addLayer(mnthReg.sum(),{min:-2,max:2, palette:app.Palette},'sum Regression',false,0.85);
  //Map.addLayer(mnthReg.median(),{palette:['blue','red']},'median Regression',false);
  //Map.addLayer(mnthReg.mean(),{palette:['blue','red']},'mean Regression',false);
  Map.addLayer(mnthReg.filterMetadata('month', "contains",('1','2','12')).sum(),{min:-1,max:1, palette:app.Palette},'sum Regression Winter',false,0.85);
  Map.addLayer(mnthReg.filterMetadata('month', "contains",('6','7','8')).sum(),{min:-1,max:1, palette:app.Palette},'sum Regression Summer',false,0.85);
  Map.addLayer(mnthReg.filterMetadata('month', "contains",('3','4','5')).sum(),{min:-1,max:1, palette:app.Palette},'sum Regression Spring',false,0.85);
  Map.addLayer(mnthReg.filterMetadata('month', "contains",('9','10','11')).sum(),{min:-1,max:1, palette:app.Palette},'sum Regression Autumn',false,0.85);
  var monthlyCollection = ee.ImageCollection(prepareColl.Data.prepareCollection);
  //print(monthlyCollection)
  var year = app.filters.c1.getValue();
  var month = app.filters.c2.getValue();
  var month_name = app.filters.c2.getValue();
  //print(year,month);
  var im = monthlyCollection.filterMetadata('year', "equals",year).filterMetadata('month', "equals",month).select('dif').first()
  displayer(im, month_name+'-'+year);
  // Create the panel for the legend items.
  var legend = ui.Panel({
      style: {
        position: 'bottom-left',
        padding: '8px 15px'
      }
  });
  // Create and add the legend title.
  var nClasses = 18;
  var classNames = ['-10 C','','','+10 C'];
  var legendTitle = ui.Label({
    value: 'LSTs anomalies',
    style: {
        fontWeight: 'bold',
        fontSize: '12px',
        margin: '0 0 4px 0',
        padding: '0'
    }
  });
  legend.add(legendTitle);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
      }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {fontSize: '12px',margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
  };
  for (var i = 0; i < classNames.length; i++){
    legend.add(makeRow(app.Palette[i],classNames[i]));
  }
  // Add the legend to the map.
  Map.add(legend);
//////////////////////ADD REGRESSION DATA////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////
////////// // Plot a time series of LST at a single location.////////////////////////////////////////
/////////////GET CHART/////////////////////////////////////////////////////////////////
  Map.onClick(function(coords) {
    //clear
    app.inspector.clear();
    removeLayer('pointbuffer');
  // Show the loading label.
    app.inspector.widgets().set(0, ui.Label({
      value: 'Loading...',
      style: {color: 'gray'}
    }));
    var click_point = ee.Geometry.Point(coords.lon, coords.lat);
    var smallAOI=ee.FeatureCollection(click_point).geometry().buffer(10000);
    Map.addLayer(smallAOI,{},'pointbuffer');
    var im_date = 'LST-'+month_name+'-'+year;
    Export.image.toDrive({
      image: im.select('dif'),
      region:smallAOI,
      description: im_date,
      scale: 1000,
      folder:'LST',
      maxPixels: 1e13
    });
    app.inspector.widgets().set(0, ui.Label({
            value: 'ROI Lat/Lon: ' + ee.Number(coords.lat).format('%.5f').getInfo() + '/'+ ee.Number(coords.lon).format('%.5f').getInfo(),
            style:app.HELPER_TEXT_STYLE
          }));
    var chart = ui.Chart.image.series(monthlyCollection.filterMetadata('year', "equals",year).select(['monthLST','mean_monthLST']), smallAOI,ee.Reducer.mean(), 1000,'date')
      .setChartType('ScatterChart')
      .setOptions({
        title: 'LSTsD for each months on selected year compared with 2001-2010 averages',
        trendlines: {1: {
          color: 'CC0000'
        }},
        lineWidth: 1,
        pointSize: 3,
      });
    app.inspector.widgets().set(1, chart); 
    var chart1 = ui.Chart.image.series(monthlyCollection.filterMetadata('month', "equals",month).select('dif'), smallAOI,ee.Reducer.mean(), 1000,'date')
      .setChartType('ScatterChart')
      .setOptions({
        title: 'LSTsD time series from 2001 to 2019 for selected month',
        trendlines: {1: {
          color: 'CC0000'
        }},
        lineWidth: 1,
        pointSize: 3,
      });
    app.inspector.widgets().set(2, chart1);
  });
///////////////////FUNCTIONS///////////////////////////////////////////////////////////
///////////////////IG//////////////////////////////////////////////////////////////////
  function removeLayer(name) {
    var layers = Map.layers();
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
      Map.remove(layer);
    } else {
      print('Layer '+name+' not found');
    }
  }
  function setDate(im){
    return im.set('system:time_start',ee.Date(im.get('system:time_start')).format('YYYY-MM-dd hh:mm:ss'));
  }  
  //////////STRETCH/////////////////////////////////////////////////////////
  function formatDate(date){
    return ee.Date(date).format('YYYY-MM-dd');
  }
  function displayer(im,name) {
    Map.addLayer(im,{min:-10,max:10, palette:app.Palette},'LSTsD-'+name,true,0.85);
  }
}  
/////////////////BOOT//////////////////////////////////////////////////////////////////////
app.boot = function() {
  app.createConstants();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.inspector_intro,
      app.inspector
    ],
    style: {width: '275px', padding: '4px'}
  });
  ui.root.insert(0, main);
  Map.setZoom(2);
  //app.refreshPlace();
};
app.boot();