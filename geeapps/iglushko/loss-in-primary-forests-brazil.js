var app={};
app.createConstants = function() {
  app.Countries='USDOS/LSIB_SIMPLE/2017';
  app.COLLECTION_ID = 'UMD/hansen/global_forest_change_2018_v1_6';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.SelectedCountry='Brazil';
  app.Palette= ['f1c57d','eba83c', 'cdcd64', 'ddc90f', '3b7832',
'fdeaca', 'f17dc1','a2f17d', '7df1bd', 'ddc90f', '7d8af1',
'bf7df1', 'f17dd8','eba83c', 'ab6c93', '0e11ee', 'ee5c0e','ee1d0e'];
  app.VIS_OPTIONS = {
    'Landsat': {min: 15, max: 128, bands: ['last_b50','last_b40','last_b30']},
    'Loss': {min: 0, max: 1, palette: ['yellow','red']},
    'Yearly Loss': {min: 1, max: 18, palette: app.Palette},
    'Primary': {min: 0, max: 1, palette:  ['grey','green']}
  };
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Yearly primary Forest Loss tool (GLAD)',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Create loss chart for selected tropical country')
    ])
  };
  //var features = ee.FeatureCollection(app.Countries).getInfo()['features'];
  var select_items = [
    {label: 'Brazil', value: 'Brazil'},
    {label: 'Argentina', value: 'Argentina'},
    {label: 'Indonesia', value: 'Indonesia'}
  ];
  //for (var i = 0; i < features.length; i++) {
    //select_items.push({
      //label: features[i]['properties']['country_na'],
      //value: features[i]['properties']['country_co']
    //});
  //};
  /* The collection filter controls. */
  app.filters = {
    c1: ui.Select({
      items:select_items, 
      onChange: function(value) {
        var selected_country = ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', value));
        Map.clear();
        Map.addLayer(selected_country, {color:'red'}, value,false);
        Map.centerObject(selected_country,5);
        app.SelectedCountry=value;
    }
    }),
    apply: ui.Button('Apply', app.refreshPlace),
  };
  app.filters.panel = ui.Panel({
    widgets: [ 
      ui.Label('Select country', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Country:', app.HELP_TEXT_STYLE), app.filters.c1], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.filters.apply], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
  });
};
app.refreshPlace = function() {
    var visOptionLandsat = app.VIS_OPTIONS['Landsat'];
    var visOptionLoss = app.VIS_OPTIONS['Loss'];
    var visOptionYLoss = app.VIS_OPTIONS['Yearly Loss'];
    var visOptionPrim = app.VIS_OPTIONS['Primary'];
    var sa_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/SouthAmerica_2001_primary');
    var as_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/Asia_2001_primary');
    var prim=ee.Image(ee.ImageCollection([sa_primary.unmask(),as_primary.unmask()]).max());
    Map.setOptions("HYBRID");
    var GFC = ee.Image(app.COLLECTION_ID).select('lossyear');
    var GFCloss = ee.Image(app.COLLECTION_ID).select('loss');
    var GFCcomposite = ee.Image(app.COLLECTION_ID).select('last_b50','last_b40','last_b30');
    //print(GFC)
    var GFCclip = GFC.updateMask(prim.gt(0));
    var GFCloss = GFCloss.updateMask(prim.gt(0));
    var GFC_comp_clip = GFCcomposite.updateMask(prim.gt(0));
    Map.addLayer(GFC_comp_clip, visOptionLandsat,'Landsat based composite (last observation)',false);
    Map.addLayer(prim.updateMask(prim.gt(0)), visOptionPrim,'GLAD Primary Forests');
    Map.addLayer(GFCloss.updateMask(GFCloss.gt(0)), visOptionLoss,'GlobalForestChange 2000-2018 LOSS',false);
    Map.addLayer(GFCclip.updateMask(GFCclip.gt(0)), visOptionYLoss,'GlobalForestChange 2000-2018 LOSS_BY YEAR');
    // Get the loss image.
    // This dataset is updated yearly, so we get the latest version.
    var lossAreaImage = GFCloss.updateMask(GFCloss.gt(0)).multiply(ee.Image.pixelArea());
    var lossByYear = lossAreaImage.addBands(GFCclip.updateMask(GFCclip.gt(0))).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
        }),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: 300,
      maxPixels: 1e13
    });
    print(lossByYear);
    ////CHART/////////////////////////////////////////////////
    var statsFormatted = ee.List(lossByYear.get('groups'))
      .map(function(el) {
        var d = ee.Dictionary(el);
        return [ee.Number(d.get('group')).format("20%02d"), d.get('sum')];
      });
    var statsDictionary = ee.Dictionary(statsFormatted.flatten());
    print(statsDictionary);
    var chart = ui.Chart.array.values({
      array: statsDictionary.values(),
      axis: 0,
      xLabels: statsDictionary.keys()
      }).setChartType('ColumnChart')
      .setOptions({
        title: '',
        hAxis: {title: 'Year', format: '####'},
        vAxis: {title: 'Area (square meters)'},
        legend: { position: "none" },
        lineWidth: 1,
        pointSize: 3
      });
    print(chart.getOptions());
    // Create the panel for the chart.
    var chartleg = ui.Panel({
      style: {
        position: 'bottom-right',
        padding: '10px 15px',
        height: '230px',
        width: '400px'
      }
    });
    var chartTitle = ui.Label({
      value: 'Yearly Primary Forest Loss in '+app.SelectedCountry,
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
    chartleg.add(chartTitle);
    chartleg.widgets().set(3, chart);
    ////////////////////////ADD legend/////////////////////////////////////
    var nClasses = 18;
    var classNames = ['Loss 2001','Loss 2002','Loss 2003','Loss 2004','Loss 2005',
    'Loss 2006','Loss 2007','Loss 2008','Loss 2009','Loss 2010','Loss 2011','Loss 2012','Loss 2013','Loss 2014',
    'Loss 2015','Loss 2016','Loss 2017','Loss 2018'];
    // Create the panel for the legend items.
    var legend = ui.Panel({
      style: {
        position: 'bottom-left',
        padding: '8px 15px'
      }
    });
    // Create and add the legend title.
    var legendTitle = ui.Label({
      value: 'Classes',
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
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
      style: {margin: '0 0 4px 6px'}
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
    Map.add(chartleg);
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.filters.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
  ui.root.insert(0, main);
  var scountry=ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry))
  Map.centerObject(scountry,5);
  app.refreshPlace();
};
app.boot();