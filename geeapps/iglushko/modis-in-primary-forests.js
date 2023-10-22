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
  app.COLLECTION_ID = 'projects/glad/alert/UpdResult';
  app.FIRMSCOLLECTION_ID = 'FIRMS';
  app.SECTION_STYLE = {margin: '0 px 0 0 0'};
  app.SelectedCountry='Brazil';
  app.resscale=1000;
  app.year='2020';
  app.Palette= ['36d521','f44a2c','f4890e','a59faa'];
  app.VIS_OPTIONS = {
    'Landsat': {min: 15, max: 220, bands: ['swir1','nir','red']},
    'Loss': {min: 0, max: 1, palette: ['yellow','red']},
    'Yearly Loss': {min: 1, max: 18, palette: app.Palette},
    'Primary': {min: 0, max: 1, palette:  ['grey','green']}
  };
  app.HELPER_TEXT_STYLE = {
      margin: '10px 1px 1px 10px',
      fontSize: '14px',
      width: '50px',
      color: 'gray'
  };
};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'MODIS hotspots in Primary Forest',
        style: {fontWeight: 'bold', fontSize: '16px', margin: '5px 5px'}
      }),
      ui.Label('Create primary forest and MODIS hotspots map and charts for selected tropical country with current Landsat-based mosaic')
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
  var select_year = [
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
    /*c2: ui.Select({
      items:  [
    {label: '1000 m/pixels', value: 1000}], 
      onChange: function(value) {
        app.resscale=value;
    }
    }),*/
    c3: ui.Select({
      items: select_year,
      onChange: function(value) {
        app.year=value;
    },
      style:{width:'90px'},
      placeholder:'YEAR'
    }),
    primlink: ui.Label('nd'),
    losslink: ui.Label('nd'),
    apply: ui.Button('GET MAP AND CHART', app.refreshPlace,0,{fontWeight: 'bold', fontSize: '18px', color: 'f44a2c', backgroundColor: 'blue',margin: '0px 0 -0px 0px'}),
  };
  app.filters.panel = ui.Panel({
    widgets: [ 
      //ui.Label('Select country', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Select country:', app.HELPER_TEXT_STYLE), app.filters.c1], ui.Panel.Layout.flow('horizontal')),
      //ui.Panel([ui.Label('Select scale', app.HELP_TEXT_STYLE), app.filters.c2], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Select year:', app.HELPER_TEXT_STYLE), app.filters.c3], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.filters.apply], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
  });
  app.descr = {
    panel: ui.Panel([
      ui.Label(' '),
      ui.Label({
        value: 'Source of data ',
        style: {fontWeight: 'bold', fontSize: '14px', margin: '5px 5px'}
      }),
      ui.Label({value:'The primary forests data by Global Land Analysis & Discovery (GLAD) team',style: {fontWeight: 'bold', fontSize: '12px', margin: '5px 5px'}}), 
      ui.Label({value:'https://glad.umd.edu/dataset/primary-forest-humid-tropics',style: {fontWeight: 'italic', fontSize: '12px', margin: '5px 5px'}}),
      ui.Label({value:'Landsat-based composites from UMD GLAD ALERT',style: {fontWeight: 'italic', fontSize: '12px', margin: '5px 5px'}}),
      ui.Label({value:'MODIS HOTSPOTS in Google Earth Engine NASA / LANCE / EOSDIS',style: {fontWeight: 'bold', fontSize: '12px', margin: '5px 5px'}}),
      ui.Label({value:'*MODIS hotspots and primary forests area calculated by default at scale 1000 m/pixel - do not use as absolute numbers, but for comparison between countries and years!!! ',style: {fontWeight: 'italic', fontSize: '12px', margin: '5px 5px'}})
    ])
  };
  /*app.link = {
    panel: ui.Panel([
      ui.Label(' '),
      ui.Label({
        value: 'Links to download source data with'+ app.resscale+' m/pixel resolution',
        style: {fontWeight: 'bold', fontSize: '14px', margin: '5px 5px'}
      }),
      ui.Label({value:'The primary forest layer:',style: {fontWeight: 'bold', fontSize: '12px', margin: '5px 5px'}}),
      app.filters.primlink,
      ui.Label({value:'Hotspots count layer',style: {fontWeight: 'bold', fontSize: '12px', margin: '5px 5px'}}),
      app.filters.losslink
      ])
  };
*/
  app.prim_chart = {
    panel: ui.Panel([
      ui.Label(' '),
      ui.Label({
        value: '5 years time-series MODIS hotspot in primary forest extent',
        style: {fontWeight: 'bold', fontSize: '14px', margin: '5px 5px'}
      })
    ])
  };
  app.other_chart = {
    panel: ui.Panel([
      ui.Label(' '),
      ui.Label({
        value: '5 years time-series MODIS hotspot outside primary forest extent',
        style: {fontWeight: 'bold', fontSize: '14px', margin: '5px 5px'}
      })
    ])
  };
};
app.refreshPlace = function() {
    var visOptionLandsat = app.VIS_OPTIONS['Landsat'];
    var visOptionLoss = app.VIS_OPTIONS['Loss'];
    var visOptionYLoss = app.VIS_OPTIONS['Yearly Loss'];
    var visOptionPrim = app.VIS_OPTIONS['Primary'];
    Map.clear();
    Map.setOptions("HYBRID");
    var sc=ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry));
    //ALERTS
    var alerts = ee.ImageCollection(app.COLLECTION_ID).filterBounds(sc);
    var sorted = alerts.sort('system:index', false);
    var length = sorted.size();
    var list = sorted.toList(length);
    var last = ee.Image(list.get(0));
    var last_1 = ee.Image(list.get(1));
    var add= ee.String(last_1.get('system:index')).replace('SA','CA').getInfo();
    var addlast = ee.Image(app.COLLECTION_ID+'/'+add);
    var merged=ee.Image(ee.ImageCollection([last,addlast]).max());
    var composite = merged.select(['swir1','nir','red']).clipToCollection(sc);
    function fmax(img,kernel_size){
      var kernel = ee.Kernel.square(kernel_size,'meters');
      var img_fm=img.focal_max({kernel: kernel, iterations: 1});
    return img_fm;
    }
    //focal med
    function fmed(img,kernel_size){
      var kernel = ee.Kernel.square(kernel_size,'meters');
      var img_fm=img.focal_median({kernel: kernel, iterations: 1});
    return img_fm;
    }
    //LOSS
    //var loss=ee.Image(conf18.gt(0).add(conf19.gt(0))).gt(0)
    var GFCloss = ee.Image('UMD/hansen/global_forest_change_2018_v1_6').select('lossyear').clipToCollection(sc);
    var allGFCloss = ee.Image('UMD/hansen/global_forest_change_2018_v1_6').select('loss').clipToCollection(sc);
    var lossyear = ee.String(app.year.replace('20','').trim()).getInfo()
    var cGFCloss=allGFCloss.updateMask(GFCloss.lt(ee.Number.parse(lossyear)).and(GFCloss.gt(0)));
    var loss1km=fmax(cGFCloss.unmask().clipToCollection(sc),1000);
    //var loss=conf19.gt(0).unmask().add(GFCloss.gt(0))
    //var loss1km=fmax(GFCloss.gt(0).unmask().clipToCollection(sc),1000)
    //Map.addLayer(firms_count,{bands:['count'],min:0,max:10,palette:['yellow','orange']},'countModis',false);
    //export primary
    //var pf=app.prim.clipToCollection(sc);
    //Map.addLayer(pf, visOptionPrim,'GLAD Primary Forests in '+ app.SelectedCountry);
    //var firms_count=firms_count.clipToCollection(sc).updateMask(firms_count.gt(0)).toInt();
    //var aoi=JSON.stringify(ee.Geometry(sc.union().geometry()).bounds().getInfo())
    //var link=pf.getDownloadURL({ name:'pf',scale: 30,region: aoi});
    //print(link);
    //app.filters.primlink.setValue(link);
    //print('LOSS: ', GFCclip.updateMask(GFCclip.gt(0)).clipToCollection(sc).getDownloadURL({ scale: 500,region: aoi}));
    //var linkloss=firms_count.getDownloadURL({name:'firms_count', scale: app.resscale,region: aoi});
    //app.filters.losslink.setValue(linkloss);
    //Create prim non prim mask
    var current_prim=app.prim.updateMask(app.prim.gt(0)).updateMask(cGFCloss.unmask().eq(0)).clipToCollection(sc);
    var current_prim1km=fmed(current_prim.unmask(),1000);
    var tmp=current_prim1km.clipToCollection(sc).remap([0,1],[10,1]);
    var loss_in_prim=current_prim1km.updateMask(loss1km.gt(0)).remap([1],[5]);
    var tmp1=tmp.unmask().add(loss_in_prim.unmask()).add(loss1km.gt(0).unmask()).clipToCollection(sc);
    var group_mask=tmp1.remap([1,7,10,11,16],[1,2,4,3,2]);
    var group_mask_fm=fmax(group_mask.unmask().clipToCollection(sc),1000);
    //FIRMS data
    var firms = ee.ImageCollection(app.FIRMSCOLLECTION_ID).filterBounds(sc).filterDate(app.year+'-01-01',app.year+'-12-01');
    function selectConf(img){
      return img.select('confidence').rename('count').gt(0);
    }
    var firms_count=firms.map(selectConf).sum().clipToCollection(sc);
    //Display
    //Map.addLayer(tmp1, {min:1,max:19,palette:['green','blue','orange','red']},'tmp'+ app.SelectedCountry);
    Map.addLayer(group_mask, {min:1,max:4,palette:['36d521','f44a2c','f4890e','a59faa']},'Areas for hotspots calucation in'+ app.SelectedCountry);
    Map.addLayer(composite, visOptionLandsat,'Last Landsat-based composite in '+ app.SelectedCountry,false);
    Map.addLayer(app.prim.updateMask(app.prim.gt(0)).clipToCollection(sc), visOptionPrim,'GLAD Primary Forests in '+ app.SelectedCountry);
    Map.addLayer(firms_count.updateMask(firms_count.gt(0)), {bands:['count'],min:0,max:10,palette:['yellow','orange']},'Hotspots (MODIS/LANCE data) in '+ app.SelectedCountry);
    //Map.addLayer(allGFCloss.updateMask(allGFCloss.gt(0)), {bands:['loss'],min:0,max:18,palette:['blue','red']},'allLoss in '+ app.SelectedCountry);
    //Map.addLayer(allGFCloss.updateMask(allGFCloss.gt(0)), {bands:['loss'],min:0,max:1,palette:['blue','red']},'allLoss in '+ app.SelectedCountry); 
    Map.addLayer(cGFCloss.updateMask(cGFCloss.gt(0)), {bands:['loss'],min:0,max:1,palette:['#e41220']},'currentLoss in '+ app.SelectedCountry);
    var new_mask=group_mask.remap([1,2,3,4],[1,1,2,2]);
    ///function to select 
    function selectPrim(img){
      var count=img.select('confidence').rename('count').gt(0);
      var count1=count.updateMask(new_mask.unmask().eq(1));
      return count1.set('system:time_start', img.get('system:time_start'));
    }
    function selectOther(img){
      var count=img.select('confidence').rename('count').gt(0);
      var count1=count.updateMask(new_mask.unmask().eq(2));
      return count1.set('system:time_start', img.get('system:time_start'));
    }
    //FIRMS last 5 years
    var startDate = ee.Date(ee.Number.parse(app.year).subtract(5).getInfo()+'-01-01');
    //var startDate = ee.Date('2015-01-01'); // set start time for analysis
    var endDate = ee.Date(ee.Number.parse(app.year).getInfo()+'-12-31');
    //print(startDate)
    var firms10 = ee.ImageCollection('FIRMS').filterDate(startDate,endDate).filterBounds(sc);
    var firms_prim= firms10.map(selectPrim);
    var firms_other= firms10.map(selectOther);
    ///Sum by Month
    var nMonths = ee.Number(endDate.difference(startDate,'month')).round();
    //print(nMonths)
    var byMonth = ee.ImageCollection(
      // map over each month
      ee.List.sequence(0,nMonths).map(function (n) {
        // calculate the offset from startDate
        var ini = startDate.advance(n,'month');
        var ini1 = startDate.advance(n,'month').advance(1,'day');
        // advance just one month
        var end = ini.advance(1,'month');
        // filter and reduce
        var coll_seq = firms_prim.filterDate(ini1,end).filterBounds(sc);
        var max_im =coll_seq.select('count').max().set('system:time_start', ini1).set('system:time_end', end);
        return max_im;
    }));
    //tmp
    function checkit(collection,n){
      var tmp1=[];
      var i=0;
      while (i < n){
        var im = ee.Image(collection.toList(1, i).get(0));
        var tmp_by_class = im.gt(0).reduceRegion({
          reducer: ee.Reducer.sum(),
          geometry: sc,
          scale: app.resscale,
          maxPixels: 1e18});
        tmp1.push(tmp_by_class);
        i+=1;
      }
      return tmp1;
    }  
    //var tmp2=checkit(byMonth,3);
    //print(tmp2)
    ///
    var byMonth1 = ee.ImageCollection(
      // map over each month
      ee.List.sequence(0,nMonths).map(function (n) {
        // calculate the offset from startDate
        var ini = startDate.advance(n,'month');
        var ini1 = startDate.advance(n,'month').advance(1,'day');
        // advance just one month
        var end = ini.advance(1,'month');
        // filter and reduce
        var coll_seq = firms_other.filterDate(ini1,end).filterBounds(sc);
        var max_im =coll_seq.select('count').max().set('system:time_start', ini1).set('system:time_end', end);
        return max_im;
    }));
    var displayOpt = {
      fontSize: 11,
      //width: '250px',
      //curveType: 'function',
      //format: 'short',
      //color:['aca7a5','8b8482','8b8482','8b8482','8b8482'],
      hAxis: {title: 'DAY of YEAR',textStyle: {fontSize: 11}, gridlines: {color: 'transparent'}},
      vAxis: {title: 'Hotspots',textStyle: {fontSize: 11}, gridlines: {}},
      //trendlines: {0: {color: '333333', lineWidth: 0.5, visibleInLegend: false}},
      series: {0: {lineDashStyle: [1,1], pointSize: 2, color: '#cbc4f0'},
              1: {lineDashStyle: [1,1], pointSize: 2, color: '#cbc4f0'},
              2: {lineDashStyle: [1,2], pointSize: 2, color: '#8b8482'},              
              3: {lineDashStyle: [1,2], pointSize: 2, color: '#606060'},
              4: {lineDashStyle: [1,1], pointSize: 2, color: '#4c5d5e'},
              5: {lineDashStyle: [1,2], pointSize: 4, color: '#f23c09'},
      }};
    var chartPrim= ui.Chart.image.doySeriesByYear({
        imageCollection: byMonth,
        bandName:'count',
        region: sc,
        regionReducer: ee.Reducer.sum(),
        scale: 2000
      }).setOptions(displayOpt)
    app.prim_chart.panel.widgets().set(2, chartPrim);
    var chartOther= ui.Chart.image.doySeriesByYear({
        imageCollection: byMonth1,
        bandName:'count',
        region: sc,
        regionReducer: ee.Reducer.sum(),
        scale: 2000
      }).setOptions(displayOpt)
    app.other_chart.panel.widgets().set(2, chartOther);
    // Get loss image.
    // This dataset is updated yearly, so we get the latest version.
    //var lossAreaImage = conf.gt(0).updateMask(conf.gt(0)).multiply(ee.Image.pixelArea());
    var firms_count_by_class = firms_count.gt(1).addBands(group_mask.toInt().updateMask(group_mask.gt(0))).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
        }),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: app.resscale,
      maxPixels: 1e18
    });
    var totloss = firms_count.gt(1).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry)),
      scale: app.resscale,
      maxPixels: 1e18
    });
    var totloss=ee.Number(totloss.get('count')).round();
    //print(totloss);
    ////CHART/////////////////////////////////////////////////
    var statsFormatted = ee.List(firms_count_by_class.get('groups'))
      .map(function(el) {
        var d = ee.Dictionary(el);
        return [ee.String(ee.Number(d.get('group')).format("%01d")), ee.Number(d.get('sum')).divide(1000).round()];
      });
    var statsDictionary = ee.Dictionary(statsFormatted.flatten());
    //print(statsDictionary,'mod in '+app.SelectedCountry);
    var chart = ui.Chart.array.values({
      array: statsDictionary.values(),
      axis: 0,
      xLabels: statsDictionary.keys()
      }).setChartType('ColumnChart')
      .setOptions({
        title: '',
        wigth:250,
        hAxis: {title: {}},
        vAxis: {title: 'Hotspot number * 1000',textStyle: {fontSize: 11}},
        legend: { position: "none" },
        colors:['blue'],
        //colors: {1: {color: '36d521'},2: {color: '36d521'},3: {color: 'f44a2c'}},
        lineWidth: 1,
        pointSize: 3
      });
    //print(chart.getOptions());
    // Create the panel for the chart.
    var chartleg = ui.Panel({
      style: {
        position: 'bottom-right',
        padding: '3px 3px',
        height: '275px',
        width: '300px',
        margin: '0 0 0px 0',
      }
    });
    var chartTitle = ui.Label({
      value: 'Hotspots count for '+app.year+' in '+app.SelectedCountry,
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        margin: '0 0 3px 0',
        padding: '0'
      }
    });
    var chartSubTitle = ui.Label({
      value: 'Total hotspots from 01 Jan to 31 Dec: '+totloss.getInfo() +'',
      style: {
        fontWeight: 'bold',
        fontSize: '12px',
        margin: '0 0 3px 0',
        padding: '0'
      }
    });
    var chartSubTitle1 = ui.Label({
      value: '1 - Primary forest extent 2 - Recently cleared primary forest extent 3 - Recently cleared non-primary forests 4 - Outside primary forests extent',
      style: {
        fontWeight: 'italic',
        fontSize: '11px',
        margin: '0 0 0px 0',
        padding: '0'
      }
    });
    //
    chartleg.add(chartTitle);
    chartleg.add(chartSubTitle);
    chartleg.add(chartSubTitle1);
    chartleg.widgets().set(3, chart);
    //ADD Primary stats chart
    var lossAreaImage = group_mask.updateMask(group_mask.lt(4)).toInt().gt(0).multiply(ee.Image.pixelArea());
    var lossByYear = lossAreaImage.addBands(group_mask.toInt().updateMask(group_mask.gt(0).and(group_mask.lt(4)))).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
        }),
      geometry: ee.Geometry(sc.union().geometry()).bounds(),
      scale: app.resscale,
      maxPixels: 1e18
    });
    //print(lossByYear);
    var prim_area =group_mask.toInt().eq(1).multiply(ee.Image.pixelArea());
    var prim_area1 =prim_area.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: ee.Geometry(sc.union().geometry()).bounds(),
      scale: app.resscale,
      maxPixels: 1e18
    });
    //print(prim_area1);
    var prim_area2=ee.Number(prim_area1.get('remapped')).divide(10000000000).round();
    var primStatsFormatted = ee.List(lossByYear.get('groups'))
      .map(function(el) {
        var d = ee.Dictionary(el);
        return [ee.String(ee.Number(d.get('group')).format("%01d")), ee.Number(d.get('sum')).divide(10000).round()];
      });
    var primStatsDictionary = ee.Dictionary(primStatsFormatted.flatten());
    //print(primStatsDictionary,'prim');
    // colors=[];
    var colors = ee.List(lossByYear.get('groups'))
      .map(function(el) {
        var d = ee.Dictionary(el);
        return ee.List(app.Palette).get((ee.Number(d.get('group'))).subtract(1));
      });
    //print(colors,'colors');  
    var chart1 = ui.Chart.array.values({
      array: primStatsDictionary.values(),
      axis: 0,
      xLabels: primStatsDictionary.keys()
      }).setChartType('PieChart')
      .setOptions({
        title: '',
        wigth:250,
        hAxis: {title: {}},
        vAxis: {title: {}},
        legend: { position: "none" },
        //colors:['36d521','f44a2c','f4890e','a59faa'],
        colors: colors.getInfo(),
        lineWidth: 1,
        //pointSize: 3
      });
    // Create the panel for the chart.
    var chartleg1 = ui.Panel({
      style: {
        position: 'bottom-right',
        padding: '3px 3px',
        height: '275px',
        width: '300px',
        margin: '0 0 0px 0',
      }
    });
    var chartTitle2 = ui.Label({
      value: 'Primary and disturbed forests for '+app.year+' in '+app.SelectedCountry,
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        margin: '0 0 3px 0',
        padding: '0'
      }
    });
    var chartSubTitle2 = ui.Label({
      value: 'Primary forest total area: '+prim_area2.getInfo() +' Mha',
      style: {
        fontWeight: 'italic',
        fontSize: '12px',
        margin: '0 0 3px 0',
        padding: '0'
      }
    });
    chartleg1.add(chartTitle2);
    chartleg1.add(chartSubTitle2);
    chartleg1.widgets().set(2, chart1);
    ////////////////////////ADD legend/////////////////////////////////////
    var nClasses = 2;
    var classNames = ['1 - Primary forest extent for '+app.year, '2 - Recently (2001-'+ee.Number.parse(app.year).subtract(1).getInfo()+') cleared primary forest extent' ,'3 - Recently (2001-'+ee.Number.parse(app.year).subtract(1).getInfo()+') cleared non-primary forest extent','4 - Outside primary forest extent'];
    // Create the panel for the legend items.
    var legend = ui.Panel({
      style: {
        position: 'bottom-left',
        padding: '8px 15px'
      }
    });
    // Create and add the legend title.
    var legendTitle = ui.Label({
      value: 'Extents for hotspots calucation',
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
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
        fontSize: '12px',
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
    var legendTitle1 = ui.Label({
      value: 'Hotspots (MODIS)',
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
    legend.add(legendTitle1);
    legend.add(makeRow('e7dd1d','Hotspots'))
    var legendTitle2 = ui.Label({
      value: 'Primary forest extent for 2001',
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
    var legendTitle3 = ui.Label({
      value: 'Total loss for '+app.year,
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
    legend.add(legendTitle2);
    legend.add(makeRow('079b4a','Primary forest extent'))
    legend.add(legendTitle3);
    legend.add(makeRow('e41220','Loss'))
    // Add the legend to the map.
    Map.add(legend);
    Map.add(chartleg);
    Map.add(chartleg1);
    //Map.add(chartleg_prim);
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
      app.prim_chart.panel,
      app.other_chart.panel
      //app.link.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  ui.root.insert(0, main);
  var scountry=ee.FeatureCollection(app.Countries).filter(ee.Filter.eq('country_na', app.SelectedCountry))
  Map.centerObject(scountry,5);
  app.refreshPlace();
};
app.boot();