var app={};
app.createConstants = function() {
  app.Countries='USDOS/LSIB_SIMPLE/2017';
  //var countries=ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('wld_rgn', 'Africa'));
  //print(countries)
  app.sa_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/SouthAmerica_2001_primary');
  app.as_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/Asia_2001_primary');
  app.af_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/Africa_2001_primary');
  app.mad_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/Madagaskar_2001_primary');
  app.prim=ee.Image(ee.ImageCollection([app.sa_primary.unmask(),app.as_primary.unmask(),app.af_primary.unmask(),app.mad_primary.unmask()]).max());
  app.COLLECTION_ID = 'UMD/hansen/global_forest_change_2021_v1_9';
  app.COLLECTION_ID_ALERT = 'projects/glad/alert/UpdResult';
  //app.SECTION_STYLE = {margin: '0 px 0 0 0'};
  app.SelectedCountry='Brazil';
  app.resscale=300;
  app.Palette= ['cf2ccf','9b2ccf', '682ccf', '2c39cf', '2c5fcf',
'2c96cf', '2cbfcf','2ccfbf', '2ccf8e', '2ccf5d', '31cf2c',
'75cf2c', 'a4cf2c','f4e21a', 'f4a019', 'f45a18', 'f41818','f41861','f41555','f41333','f41666','f41777'];
  app.VIS_OPTIONS = {
    'Landsat': {min: 25, max: 200},
    'Loss': {min: 0, max: 1, palette: ['yellow','red']},
    'Alert': {min: 0, max: 3, palette: ['yellow','red']},
    'Yearly Loss': {min: 1, max: 18, palette: app.Palette},
    'Primary': {min: 0, max: 1, palette:  ['grey','green']}
  };
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '14px',
      fontWeight: 'bold',
      width:'140px',
      color: 'gray'};
  app.TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      //fontWeight: 'bold',
      width:'240px',
      color: 'black'};
};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Alerts in Primary Forest',
        style: {fontWeight: 'bold', fontSize: '16px', margin: '8px 0 -3px 8px',color: 'black'}
      }),
      ui.Label({value:'Create primary forest loss maps and chart for selected tropical country',
        style: {fontSize: '12px', margin: '8px 0 -3px 8px',color: 'gray'}
      })
    ])
  };
  //var features = ee.FeatureCollection(app.Countries).getInfo()['features'];
  var select_items = [
    {label: 'Brazil', value: 'Brazil'},
    {label: 'Argentina', value: 'Argentina'},
    {label: 'Peru', value: 'Peru'},
    {label: 'Ecuador', value: 'Ecuador'},
    {label: 'Chile', value: 'Chile'},
    {label: 'Venezuela', value: 'Venezuela'},
    {label: 'Colombia', value: 'Colombia'},
    {label: 'Uruguay', value: 'Uruguay'},
    {label: 'Paraguay', value: 'Paraguay'},
    {label: 'Suriname', value: 'Suriname'},
    {label: 'French Guiana', value: 'French Guiana'},
    {label: 'Guyana', value: 'Guyana'},
    {label: 'Bolivia', value: 'Bolivia'},
    {label: 'Indonesia', value: 'Indonesia'},
    {label: 'Malaysia', value: 'Malaysia'},
    {label: 'Thailand', value: 'Thailand'},
    {label: 'Burma', value: 'Burma'},
    {label: 'Laos', value: 'Laos'},
    {label: 'Cambodia', value: 'Cambodia'},
    {label: 'Vietnam', value: 'Vietnam'},
    {label: 'Singapore', value: 'Singapore'},
    {label: 'Brunei', value: 'Brunei'},
    {label: 'Philippines', value: 'Philippines'},
    {label: 'India', value: 'India'},
    {label: 'Bangladesh', value: 'Bangladesh'},
    {label: 'Bhutan', value: 'Bhutan'},
    {label: 'Brunei', value: 'Brunei'},
    {label: 'Nepal', value: 'Nepal'},
    {label: 'Sri Lanka', value: 'Sri Lanka'},
    {label: 'South Africa', value: 'South Africa'},
    {label: 'Rwanda', value: 'Rwanda'},
    {label: 'Angola', value: 'Angola'},
    {label: 'Zimbabwe', value: 'Zimbabwe'},
    {label: 'Zambia', value: 'Zambia'},
    {label: 'Madagascar', value: 'Madagascar'},
    {label: 'Mozambique', value: 'Mozambique'},
    {label: 'Tanzania', value: 'Tanzania'},
    {label: 'Uganda', value: 'Uganda'},
    {label: 'Kenya', value: 'Kenya'},
    {label: 'South Sudan', value: 'South Sudan'},
    {label: 'Somalia', value: 'Somalia'},
    {label: 'Ethiopia', value: 'Ethiopia'},
    {label: 'Dem Rep of the Congo', value: 'Dem Rep of the Congo'},
    {label: 'Central African Rep', value: 'Central African Rep'},
    {label: 'Rep of the Congo', value: 'Rep of the Congo'},
    {label: 'Gabon', value: 'Gabon'},
    {label: 'Equatorial Guinea', value: 'Equatorial Guinea'},
    {label: 'Cameroon', value: 'Cameroon'},
    {label: 'Nigeria', value: 'Nigeria'},
    {label: 'Benin', value: 'Benin'},
    {label: 'Liberia', value: 'Liberia'},
    {label: 'Sierra Leone', value: 'Sierra Leone'},
    {label: 'Gambia, The', value: 'Gambia, The'},
    {label: "Cote d'Ivoire", value: "Cote d'Ivoire"},
    {label: 'Ghana', value: 'Ghana'},
  ];
  //select year
    var select_year = [
    {label: '2023', value: '2023'},
    {label: '2022', value: '2022'},
    {label: '2021', value: '2021'},
    {label: '2020', value: '2020'},
    {label: '2019', value: '2019'},
    {label: '2018', value: '2018'},
    {label: '2017', value: '2017'},
    {label: '2016', value: '2016'},
    {label: '2015', value: '2015'},
    {label: '2014', value: '2014'},
    {label: '2013', value: '2013'},
    {label: '2012', value: '2012'},
    {label: '2011', value: '2011'},
    {label: '2010', value: '2010'},
    {label: '2009', value: '2009'},
    {label: '2008', value: '2008'},
    {label: '2007', value: '2007'},
    {label: '2006', value: '2006'},
    {label: '2005', value: '2005'},
    {label: '2004', value: '2004'},
    {label: '2003', value: '2003'},
    {label: '2002', value: '2002'},
    {label: '2001', value: '2001'},
    {label: '2000', value: '2000'}
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
        Map.addLayer(selected_country, {color:'red'}, value);
        Map.centerObject(selected_country);
        app.SelectedCountry=value;
    },
      style:{width:'90px'},
      placeholder:'COUNTRY'
    }),
    c2: ui.Select({
      items:  [
    {label: '300 m/pixels -fast', value: 300},{label: '100 m/pixels - medium', value: 100},{label: '30 m/pixels - slow', value: 30}], 
      onChange: function(value) {
        app.resscale=value;
    },
      style:{width:'90px'},
      placeholder:'SCALE'
    }),
    c3: ui.Select({
      items: select_year,
      onChange: function(value) {
        app.year=value;
    },
      style:{width:'90px'},
      placeholder:'YEAR'
    }),
    //primlink: ui.Label('nd'),
    //losslink: ui.Label('nd'),
    apply: ui.Button('GET MAP AND CHART', app.refreshPlace,0,{fontWeight: 'bold', fontSize: '18px', color: 'f44a2c', backgroundColor: 'blue',margin: '0px 0 -0px 0px'}),
  };
  app.filters.panel = ui.Panel({
    widgets: [ 
      ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Select country', app.HELPER_TEXT_STYLE), app.filters.c1], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Select scale', app.HELPER_TEXT_STYLE), app.filters.c2], ui.Panel.Layout.flow('horizontal')),
      //ui.Panel([ui.Label('Select year', app.HELPER_TEXT_STYLE), app.filters.c3], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.filters.apply], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
  });
  app.descr = {
    panel: ui.Panel([
      ui.Label(' '),
      ui.Label({
        value: 'Data provided by Global Land Analysis & Discovery (GLAD) team',
        style: {fontWeight: 'bold', fontSize: '14px', margin: '5px 5px'}
      }),
      ui.Label({value:'The primary forest layer:',style: app.TEXT_STYLE}), 
      ui.Label({value:'https://glad.umd.edu/dataset/primary-forest-humid-tropics',style: app.TEXT_STYLE}),
      ui.Label({value:'Tree Cover Loss in Google Earth Engine',style: app.TEXT_STYLE}),
      ui.Label({value:'UMD GLAD Tropic Alerts in Google Earth Engine',style: app.TEXT_STYLE}),
      ui.Label({value:'UMD/hansen/global_forest_change_2021_v1_9',style: app.TEXT_STYLE}),
      ui.Label({value:'Yearly loss area and Total loss area calculated by default at scale 300 m/pixel',style: app.TEXT_STYLE}), 
      ui.Label({value:'due Google Earth Engine user memory limitations, but scale can be changed using Select scale panel',style:app.TEXT_STYLE}), 
    ])
  };
  app.link = {
    panel: ui.Panel([
      ui.Label(' '),
      //ui.Label({
        //value: 'Links to download source data with 300 m/pixel resolution',
        //style: {fontWeight: 'bold', fontSize: '14px', margin: '5px 5px'}
      //}),
      //ui.Label({value:'The primary forest layer:',style: {fontWeight: 'bold', fontSize: '12px', margin: '5px 5px'}}),
      //app.filters.primlink,
      //ui.Label({value:'Tree Cover Loss',style: {fontWeight: 'bold', fontSize: '12px', margin: '5px 5px'}}),
      //app.filters.losslink
      ])
  };
};
app.refreshPlace = function() {
    var visOptionLandsat = app.VIS_OPTIONS['Landsat'];
    var visOptionLoss = app.VIS_OPTIONS['Loss'];
    var visOptionYLoss = app.VIS_OPTIONS['Yearly Loss'];
    var visOptionPrim = app.VIS_OPTIONS['Primary'];
    var visOptionAlert = app.VIS_OPTIONS['Alert'];
    Map.clear();
    Map.setOptions("HYBRID");
    var GFC = ee.Image(app.COLLECTION_ID).select('lossyear');
    var GFCloss = ee.Image(app.COLLECTION_ID).select('loss');
    var GFCcomposite = ee.Image(app.COLLECTION_ID).select('last_b50','last_b40','last_b30');
    //print(GFC)
    var sc=ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry));
    var GFCclip = GFC.updateMask(app.prim.gt(0)).clipToCollection(sc);
    GFCloss = GFCloss.updateMask(app.prim.gt(0)).clipToCollection(sc);
    var GFC_comp_clip = GFCcomposite.updateMask(app.prim.gt(0).clipToCollection(sc));
    //ALERTS
    var alerts = ee.ImageCollection(app.COLLECTION_ID_ALERT).filterBounds(sc);
    var sorted = alerts.sort('system:index', false);
    var length = sorted.size();
    var list = sorted.toList(length);
    var last = ee.Image(list.get(0));
    var last_1 = ee.Image(list.get(1));
    var add= ee.String(last_1.get('system:index')).replace('SA','CA').getInfo();
    var addlast = ee.Image(app.COLLECTION_ID_ALERT+'/'+add);
    var merged=ee.Image(ee.ImageCollection([last,addlast]).max());
    print(merged)
    var conf= merged.select('conf23').updateMask(merged.select('conf23').gt(0)).clipToCollection(sc);
    var conf_prev= merged.select('conf22').updateMask(merged.select('conf22').gt(0)).clipToCollection(sc);
    var composite = merged.select(['swir1','nir','red']).clipToCollection(sc);
    //Create prim non prim mask
    var current_prim=app.prim.updateMask(app.prim.gt(0)).updateMask(GFCloss.unmask().eq(0).or(conf.unmask().eq(0))).clipToCollection(sc);
    var loss_in_prim=current_prim.updateMask(GFCloss.gt(0).or(conf.gt(0))).remap([1],[2]);
    var tmp=current_prim.unmask().add(loss_in_prim.unmask()).clipToCollection(sc);
    var group_mask=tmp.unmask().remap([0,1,2],[1,2,3]).clipToCollection(sc);
    ///
    Map.addLayer(GFC_comp_clip.clipToCollection(sc), visOptionLandsat,'2021 Landsat-based composite in '+ app.SelectedCountry,false);
    Map.addLayer(group_mask, {palette:['red','green','blue']},'Mask 2022 in '+ app.SelectedCountry,false);
    Map.addLayer(composite, visOptionLandsat,'last 2023 Landsat-based composite in '+ app.SelectedCountry,false);
    Map.addLayer(app.prim.updateMask(app.prim.gt(0)).clipToCollection(sc), visOptionPrim,'GLAD Primary Forests 2001 in '+ app.SelectedCountry);
    //Map.addLayer(app.prim.updateMask(app.prim.gt(0)).clipToCollection(sc), visOptionPrim,'GLAD Primary Forests in '+ app.SelectedCountry);
    Map.addLayer(GFCloss.updateMask(GFCloss.gt(0)).clipToCollection(sc), visOptionLoss,'TOTAL LOSS 2000-2021 in '+ app.SelectedCountry,false);
    Map.addLayer(GFCclip.updateMask(GFCclip.gt(0)).clipToCollection(sc), visOptionYLoss,'LOSS BY YEAR 2000-2021 in '+ app.SelectedCountry,false);
    Map.addLayer(conf_prev, visOptionAlert,'Alerts 2022 in '+ app.SelectedCountry,false);
    Map.addLayer(conf, visOptionAlert,'Alerts 2023 in '+ app.SelectedCountry);
    // Get loss image.
    // This dataset is updated yearly, so we get the latest version.
    var lossAreaImage = GFCloss.updateMask(GFCloss.gt(0)).multiply(ee.Image.pixelArea());
    var lossByYear = lossAreaImage.addBands(GFCclip.updateMask(group_mask.gt(0))).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
        }),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: app.resscale,
      maxPixels: 1e18
    });
    print(lossByYear,'lossByYear 2021');
    var totloss = lossAreaImage.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: app.resscale,
      maxPixels: 1e18
    });
    totloss=ee.Number(totloss.get('loss')).divide(10000000000).round();
    print(totloss,'total loss 2001-2021');
    ///ADD 2022 ALERT
    var lossAreaImageAlert22 = conf_prev.updateMask(conf_prev.gt(0)).multiply(ee.Image.pixelArea());
    var lossAlert22 = lossAreaImageAlert22.addBands(group_mask.gt(0)).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
        }),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: app.resscale,
      maxPixels: 1e18
    });
    print(lossAlert22,'lossAlert22');
    var totLossAlert22 = lossAreaImageAlert22.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: app.resscale,
      maxPixels: 1e18
    });
    print(totLossAlert22,'totLossAlert22');
    var totlossAlert22=ee.Number(totLossAlert22.get('conf22')).divide(10000000).round();
    print(totlossAlert22,'total loss 2022');
    ///ADD 2022 ALERT
    var lossAreaImageAlert = conf.updateMask(conf.gt(0)).multiply(ee.Image.pixelArea());
    var lossAlert = lossAreaImageAlert.addBands(group_mask.gt(0)).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
        }),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: app.resscale,
      maxPixels: 1e18
    });
    print(lossAlert,'lossAlert');
    var totLossAlert = lossAreaImageAlert.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: app.resscale,
      maxPixels: 1e18
    });
    print(totLossAlert,'totLossAlert');
    var totlossAlert=ee.Number(totLossAlert.get('conf23')).divide(10000000).round();
    print(totlossAlert,'total loss 2023');
    var statsFormatted = ee.List(lossByYear.get('groups'))
      .map(function(el) {
        var d = ee.Dictionary(el);
        return [ee.String(ee.Number(d.get('group')).format("20%02d")), d.get('sum')];
      });
    var statsDictionary = ee.Dictionary(statsFormatted.flatten());
    //ADD loss 2021 -2021 to dictionary
    statsDictionary=statsDictionary.set('2022',totLossAlert22.values());
    statsDictionary=statsDictionary.set('2023',totLossAlert.values());
    print(statsDictionary,'Loss in '+app.SelectedCountry);
    ////CHART/////////////////////////////////////////////////
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
        colors:['blue'],
        lineWidth: 1,
        pointSize: 3
      });
    //print(chart.getOptions());
    // Create the panel for the chart.
    var chartleg = ui.Panel({
      style: {
        position: 'bottom-right',
        padding: '5px 5px',
        height: '275px',
        width: '420px'
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
    var chartSubTitle = ui.Label({
      value: 'Total loss - '+totloss.getInfo() +' Mha',
      style: {
        fontWeight: 'italic',
        fontSize: '12px',
        margin: '0 0 8px 0',
        padding: '0'
      }
    });
    chartleg.add(chartTitle);
    chartleg.add(chartSubTitle);
    chartleg.widgets().set(3, chart);
    ////////////////////////ADD legend/////////////////////////////////////
    var nClasses = 20;
    var classNames = ['Loss 2001','Loss 2002','Loss 2003','Loss 2004','Loss 2005',
    'Loss 2006','Loss 2007','Loss 2008','Loss 2009','Loss 2010','Loss 2011','Loss 2012','Loss 2013','Loss 2014',
    'Loss 2015','Loss 2016','Loss 2017','Loss 2018','Loss 2019','Loss 2020','Loss 2021','Loss 2022'];
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
    //Map.add(legend);
    Map.add(chartleg);
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.descr.panel,
      app.link.panel
    ],
    style: {width: '275px', padding: '4px'}
  });
  ui.root.insert(0, main);
  var scountry=ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry))
  Map.centerObject(scountry,5);
  app.refreshPlace();
};
app.boot();