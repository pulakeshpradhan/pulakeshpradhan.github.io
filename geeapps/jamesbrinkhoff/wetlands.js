var demh = ee.Image("AU/GA/DEM_1SEC/v10/DEM-S"),
    pt_dangars = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([151.50419344188552, -30.68173199469962]),
    pt_llangothlin = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Point([151.76350155726197, -30.072596944240857]);
  Map.setOptions('SATELLITE');
  Map.centerObject(pt_dangars,14);  
  var JTHLagoons = ee.FeatureCollection("users/jamesbrinkhoff/Wetlands/JTHLagoons");
  var starty = 2017;
  var endy = 2023;
  //deal with duplicate named Kyoma Lagoon
  var kyoma = /* color: #d63000 */ee.Geometry.Point([151.66275967688804, -30.151857489700294]);
  var JTHLagoons = JTHLagoons.map(function(feature){
    return ee.Feature(ee.Algorithms.If(
      feature.intersects(kyoma),
      feature.set('Name','Kyoma Lagoon 2'),
      feature));
  });
  var JTHLagoons_buff = JTHLagoons;/*.map(function(feature){
    return feature.buffer(0);
  });*/
  var c_open = '#7570b3';
  var c_water = '#1f78b4';
  var c_water2 = '#abd9e9';
  var c_veg = '#66a61e';
  var pal_inund = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];
  var pal_veg = ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'];
  pal_veg = ['#a6611a','#dfc27d','#f5f5f5','#80cdc1','#018571'];
  var pal_green = ['#ffffcc','#c2e699','#78c679','#31a354','#006837'];
  var pal_ow = ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'];
  var t2=-0.425;
  var t=1060;
  var n=0.4;
  var w=0.123;
  var scale=30;
  var vs='Vegetation';
  var ws2='Water_MNDWI';
  var ws='Water_SWIR1';
  var ows='Open_Water';
  /*get elevation of each lagoon relative to rim around lagoon*/
  var el_lagoon = ee.Image(0.0);
  el_lagoon = ee.ImageCollection(JTHLagoons.map(function(feature){
    /*elevation calcs*/
    var geom = feature.geometry();
    var ring = geom.buffer(30).difference(geom);
    var el_ring = ee.Number(demh.reduceRegion(ee.Reducer.mean(), ring, 10).get('elevation'));
    el_lagoon = demh.select('elevation').subtract(el_ring).clip(geom);
    return el_lagoon;
  })).min().unmask(0,false);
  var map_fc = function(fc,name,property,palette,fill) {
    var empty = ee.Image().byte();
    property = property||1;
    palette = palette||'00FF00';
    var outline = empty.paint({
      featureCollection: ee.FeatureCollection(fc),
      color: property,
      width: 1
    });
    outline = ee.Image(ee.Algorithms.If(fill,outline.paint({featureCollection:ee.FeatureCollection(fc),color:property}), outline));
    return outline.visualize({palette: palette, min:0, max:palette.length-1});
  };
  /*LS*/
  var set_date_func = function(obj){
    var date = ee.Date(ee.Image(obj).get('system:time_start'));
    return obj.set({'date':date,
                    'month':date.get('month'),
                    'date_string':date.format('YYYY-MM-dd'),
                    'datetime_string_au':date.format({timeZone:'Australia/Sydney'}),
                    'hour_au':ee.Number(date.get('hour','Australia/Sydney'))
    });
  };
  var vis = function(image){
    image = ee.Image(image);
    image = image.addBands(image.normalizedDifference(['nir','r']).rename('ndvi'));
    image = image.addBands(image.normalizedDifference(['g','swir1']).rename('mndwi'));
    //image = image.addBands(image.select('ndvi').gt(n).rename(vs).multiply(100));
    image = image.addBands(image.select('ndvi').rename(vs).multiply(100));
    image = image.addBands(image.select('mndwi').gt(t2).multiply(100).rename(ws2));
    image = image.addBands(image.select('swir1').lt(t).multiply(100).rename(ws));
    //image = image.addBands(image.select('swir2').lt(650).multiply(100).rename(ws));
    image = image.addBands(image.select('mndwi').gt(w).multiply(100).rename(ows));
    return image;
  };
  var maskL8sr = function(image) {
    // Bits 3 and 5 are cloud shadow and cloud, respectively.
    var cloudShadowBitMask = (1 << 3);
    var cloudsBitMask = (1 << 5);
    // Get the pixel QA band.
    var qa = image.select('pixel_qa');
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                   .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    return image.updateMask(mask);
  }
  var get_ls_ic = function(cloud,start,stop){ //get year collection centered at pt, and reset date to last date in image
    cloud = cloud || 10;
    start = start || '1985-01-01';
    stop = stop || '2019-12-31';
    var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR").select(['B2','B3','B4','B5','B6','B7','B10','pixel_qa'],['b','g','r','nir','swir1','swir2','tc','pixel_qa']);
    var l7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR").select(['B1','B2','B3','B4','B5','B7','B6','pixel_qa'],['b','g','r','nir','swir1','swir2','tc','pixel_qa']);
    var l5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR").select(['B1','B2','B3','B4','B5','B7','B6','pixel_qa'],['b','g','r','nir','swir1','swir2','tc','pixel_qa']);
    //var l4 = ee.ImageCollection("LANDSAT/LT04/C01/T1_SR").select(['B1','B2','B3','B4','B5','B7','B6','pixel_qa'],['b','g','r','nir','swir1','swir2','tc','pixel_qa']);
    var ls_ic_all = l8.merge(l7).merge(l5);//.merge(l4);//not many landsat 4 scenes
    var ls_ic = ls_ic_all
                .filterDate(start,stop)
                .filterMetadata('CLOUD_COVER','less_than',cloud)
                .map(maskL8sr)
                .map(vis);
    return ls_ic;
  };
  /*   */
  var locs = ee.List(JTHLagoons.reduceColumns(ee.Reducer.toList(),['Name']).get('list')).sort();
  var shapes = ui.Map.Layer(map_fc(JTHLagoons,'boundaries'),{},'Lagoon boundaries');
  var l = get_ls_ic(50,'1988-01-01',endy.toString()+'-12-31').filterBounds(JTHLagoons).sort('system:time_start');
  var ls = l;
  var new_daterange = function(dr){
    starty = start_date.getValue();
    endy = end_date.getValue();
    end_date.setValue(Math.max(endy,starty));
    endy = end_date.getValue();
    start_date.setValue(Math.min(starty,endy));
    new_loc(loc);
  };
  var new_loc = function(loc)
  {
    loc=ee.String(select_loc.getValue());
    feature = ee.Feature(JTHLagoons.filterMetadata('Name','equals',loc).first());
    Map.centerObject(feature,14);
    ls = l.filterDate(ee.Date.fromYMD(starty,1,1),ee.Date.fromYMD(endy,12,31)).filterBounds(feature.geometry(100)).map(function(image){
      var mask = image.select('ndvi').gt(-1);
      mask = mask.unmask(0,false).rename('mask');
      var pc_pixels = mask.reduceRegion({reducer:ee.Reducer.mean(), geometry:feature.geometry(), scale:scale, bestEffort:true}).get('mask');
      var area_i = feature.geometry().intersection(image.geometry()).area();
      var area_f = (feature.geometry().area());
      return image.set('pc_unmasked',pc_pixels);//.set('area_i',area_i).set('area_f',area_f)
    });
    ls = ls.filterMetadata('pc_unmasked','greater_than',0.99); //last image first
    var chart = ui.Chart.image.series(ls.select(['Open_Water',vs,'Water_MNDWI','Water_SWIR1']), feature.geometry(), ee.Reducer.mean(), 30, 'system:time_start');
    chart.setOptions({title:'Proportion of water & vegetation',
                          hAxis:{title:'Date'},
                          vAxis:{title:'Cover (%)', viewWindow:{min:0,max:100}},
                          series: {
                            0: { color: c_open, labelInLegend:'Open_Water' },
                            1: { color: c_veg, labelInLegend:'Veg.' },
                            2: { color: c_water2, labelInLegend:'Water_MNDWI' },
                            3: { color: c_water, labelInLegend:'Water_SWIR1' }
                          },
                          //type: 'scatter',
                          //pointSize: 1
    });
    panel.widgets().set(3,chart);
    chart.onClick(newDate);
    date = ee.Date(ee.Image(ls.sort('system:time_start',false).first()).get('system:time_start'));
    newDate(date,0,0);
    //compute inundation over daterange
    var image_pc = ls.reduce(ee.Reducer.mean()).clipToCollection(JTHLagoons_buff);
    var open_water_pc = ui.Map.Layer(image_pc.select('Open_Water_mean'),({palette:pal_ow, min:0, max:100}),'Open water percent over selected timeframe',false);
    Map.layers().set(5,open_water_pc);
    var water_pc = ui.Map.Layer(image_pc.select('Water_SWIR1_mean'),({palette:pal_inund, min:0, max:100}),'Water percent over selected timeframe',false);
    Map.layers().set(6,water_pc);
    var veg_pc = ui.Map.Layer(image_pc.select('Vegetation_mean'),({palette:pal_green, min:0, max:100}),'Vegetation mean over selected timeframe',false);
    Map.layers().set(7,veg_pc);
  };
  var newDate = function(xValue,yValue,seriesValue)
  {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    date = ee.Date(xValue);
    date_label.setValue('Current image date '+date.format('YYYY-MM-dd').getInfo()+'. Click on the chart to select a different image date.');
    //inst_label.setValue('Click on the chart to select a different image date.');
    var image = ee.Image(ls.filterDate(date,'2022-01-01')
                .filterBounds(feature.geometry()).first());
    var rgb = ui.Map.Layer(image,{bands:['r','g','b'],min:0,max:2000},'RGB',true);
    Map.layers().set(0,rgb);
    image = image.clipToCollection(JTHLagoons_buff);
    var veg = ui.Map.Layer(image.select(vs),({palette:pal_green,min:0,max:100}),'Vegetation',false);
    Map.layers().set(1,veg);
    var open_water = ui.Map.Layer(image.select('Open_Water').selfMask(),({palette:c_open}),'Open_Water',false);
    Map.layers().set(2,open_water);
    var water = ui.Map.Layer(image.select('Water_SWIR1').selfMask(),{palette:c_water},'Water_SWIR1',true);
    Map.layers().set(3,water);
    var water2 = ui.Map.Layer(image.select('Water_MNDWI').selfMask(),{palette:c_water2},'Water_MNDWI',false);
    Map.layers().set(4,water2);
  };
  var loc='Dangars Lagoon';
  var date=ee.Date(ee.Image(l.filterDate('2017-07-01','2017-11-01').first()).get('system:time_start'));
  var date_label=ui.Label('Loading...');
  var start_date = ui.Slider(1988,endy-1,starty,1, new_daterange);
  var end_date = ui.Slider(1988,endy,endy,1, new_daterange);
  //var inst_label=ui.Label('Loading...');
  var select_loc = ui.Select(locs.getInfo(),loc,loc,new_loc);
  var website = ui.Label('Dynamic Lagoons website').setUrl('https://dynamiclagoons.org/');
  var paper = ui.Label('Ecosphere paper describing methods used').setUrl('https://esajournals.onlinelibrary.wiley.com/doi/10.1002/ecs2.3906');
  var contact = ui.Label({value:'james.brinkhoff@une.edu.au',style:{fontSize:'8px'},targetUrl:'mailto:james.brinkhoff@une.edu.au&Subject=Dynamic%20lagoons%20app'});
  var panel = ui.Panel({
    widgets: [select_loc,start_date,end_date,ui.Label(''),date_label,website,paper,contact],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'bottom-right',
      padding: '7px',
      width: '500px'
    }
  });
  Map.add(panel);
  var feature = ee.Feature(JTHLagoons.filterMetadata('Name','equals',loc).first());
  if(true){//interactive app features
    date.evaluate(function(){
      new_daterange(null);
      Map.layers().set(8,shapes);
      Map.layers().set(9,ui.Map.Layer(el_lagoon.clip(JTHLagoons.geometry()),{min:-10,max:0, palette:['#f1eef6','#bdc9e1','#74a9cf','#2b8cbe','#045a8d'].reverse()},'Elevation',false));
    });
  }