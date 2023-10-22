var pt = ui.import && ui.import("pt", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            146.41424467759498,
            -34.613635352110194
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([146.41424467759498, -34.613635352110194]);
var layers = ['rgb','ndvi','ndvi_constant','ndvi_mag_1','ndvi_ang_1','composite','S1_median','S1_var','elevation','clicked'];
var scale=30;
var empty=ee.Image();
Map.layers().set(0,empty);
Map.layers().set(1,empty);
Map.layers().set(2,empty);
Map.layers().set(3,empty);
Map.layers().set(4,empty);
Map.layers().set(5,empty);
Map.layers().set(6,empty);
Map.layers().set(7,empty);
Map.layers().set(8,empty);
Map.addLayer(pt,{color:'red'},'Clicked location');
/*functions*/
var rg_palette = ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641'];
var get_s1_ic = function(){ //get year collection centered at pt, and reset date to last date in image
  s1_ic = s1_ic_all
              .filterBounds(pt)
              .filterDate(today.advance(-1,'year'),today)
              .map(vis1);
  //date = ee.Date(ee.Image(s1_ic.sort('system:time_start',false).first()).get('system:time_start')).format('YYYY-MM-dd').getInfo();
  //s1_ic_sin = sinusoidal_fit(s1_ic, ['CR'], 3); //need to speckle filter before doing pixel-based time series operations
  return s1_ic;
};
var get_s2_ic = function(coords){ //get year collection centered at pt, and reset date to last date in image
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  pt=point;
  //print(pt);
  date_label.setValue('Please wait, loading images...');
  panel.widgets().set(1,ui.Label("Please wait, generating NDVI chart..."));
  s1_ic = get_s1_ic();
  s2_ic = s2_ic_all
              .filterBounds(pt)
              .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',1)
              .filterDate(today.advance(-1,'year'),today)
              .map(maskCloud_s2_light)
              .map(vis)
  var geom=s2_ic.geometry(10);
  //mosaic on date       
  var mosaic_on = 'date';
  var d = s2_ic.distinct([mosaic_on]);
  var orig_proj = ee.Image(d.first()).select(0).projection();
  var di = ee.ImageCollection(d);
  // Join collection to itself grouped by date
  var date_eq_filter = ee.Filter.equals({leftField: mosaic_on,
                                         rightField: mosaic_on});
  var saveall = ee.Join.saveAll("to_mosaic");
  var j = saveall.apply(di, s2_ic, date_eq_filter);
  var ji = ee.ImageCollection(j);
  s2_ic = ji.map(function(img) {
    var mosaiced = ee.ImageCollection.fromImages(img.get('to_mosaic')).qualityMosaic('ndvi');
    //mosaiced = ee.Image(ee.Algorithms.If(reproj,mosaiced.reproject(orig_proj),mosaiced));
    mosaiced = mosaiced.copyProperties(img,img.propertyNames()); //lost bounds maybe with mosaic operation
    return ee.Image(mosaiced).clip(geom);
  });
  ee.Image(s2_ic.first()).evaluate(function(im){
    date = ee.Date(ee.Image(s2_ic.sort('system:time_start',false).first()).get('system:time_start')).format('YYYY-MM-dd').getInfo()
        //date=datei;
        //print(date,pt)
        date_label.setValue('Current image date: '+date);
        s2_ic_sin = sinusoidal_fit(s2_ic, ['ndvi'], 3);
        s2_ic = s2_ic.map(function(image){
          var dateim = ee.Date(image.get('system:time_start'));
          var years = dateim.difference(ee.Date('1970-01-01'), 'year');
          var timeRadians = ee.Image(years.multiply(2 * Math.PI));
          var modeled = (s2_ic_sin.select('ndvi_constant'));
          modeled = modeled.add(timeRadians.sin().multiply(s2_ic_sin.select('ndvi_sin_1')))
                           .add(timeRadians.cos().multiply(s2_ic_sin.select('ndvi_cos_1')))
                           .add(timeRadians.multiply(2).sin().multiply(s2_ic_sin.select('ndvi_sin_2')))
                           .add(timeRadians.multiply(2).cos().multiply(s2_ic_sin.select('ndvi_cos_2')))
                           .add(timeRadians.multiply(3).sin().multiply(s2_ic_sin.select('ndvi_sin_3')))
                           .add(timeRadians.multiply(3).cos().multiply(s2_ic_sin.select('ndvi_cos_3')))
                           //.add(timeRadians.multiply(4).sin().multiply(s2_ic_sin.select('ndvi_sin_4')))
                           //.add(timeRadians.multiply(4).cos().multiply(s2_ic_sin.select('ndvi_cos_4')))
          return image.addBands(modeled.rename('ndvi_modeled'));
        });
        map_update();
        ndvi_chart();
  })
      return s2_ic;
};
var ic_to_image = function(ic){
  //ic.toBands added heaps of prefixes, this is to remove them all
  var list= ic.toList(1000);
  list = list.map(function(image){
    var bands = ee.Image(image).bandNames();
    var band_list = bands.map(function(string){
      return ee.Image(image).select(ee.String(string));
    });
    return band_list;
  }).flatten();
  ic= ee.ImageCollection(ee.List(list));
  var image = ic.toBands();
  //print('ic_to_image',list,ic,image)
  var m_bands = image.bandNames();
  var m_bands_noN = m_bands.map(function(band){
    return ee.String(band).slice(ee.String(band).index('_').add(1)); //taking number off front, which was added by toBands()
  });
  image = image.select(m_bands, m_bands_noN);
  return image;
};
var sinusoidal_fit = function(ic, bands, harmonics){
  var harmonicFrequencies = ee.List.sequence(1, harmonics);
  // Function to get a sequence of band names for harmonic terms.
  var getNames = function(base, list) {
    return ee.List(list).map(function(i) { 
      return ee.String(base).cat(ee.Number(i).int());
    });
  };
  // Function to add a time band.
  var addTime = function(image) {
    // Compute time in fractional years since the epoch.
    var date = ee.Date(image.get('system:time_start'));
    var years = date.difference(ee.Date('1970-01-01'), 'year');
    var timeRadians = ee.Image(years.multiply(2 * Math.PI));
    return image.addBands(timeRadians.rename('t').float());
  };
  ic=ic.map(addTime);
  // Construct lists of names for the harmonic terms.
  var cosNames = getNames('cos_', harmonicFrequencies);
  var sinNames = getNames('sin_', harmonicFrequencies);
  var magNames = getNames('mag_', harmonicFrequencies);
  var angNames = getNames('ang_', harmonicFrequencies);
  var independents = ee.List(['constant'])//, 't'])
    .cat(cosNames).cat(sinNames);
  // Function to add a constant band.
  var addConstant = function(image) {
    return image.addBands(ee.Image(1));
  };
  ic = ic.map(addConstant);
  var addHarmonics = function(freqs) {
    return function(image) {
      // Make an image of frequencies.
      var frequencies = ee.Image.constant(freqs);
      // This band should represent time in radians.
      var time = ee.Image(image).select('t');
      // Get the cosine terms.
      var cosines = time.multiply(frequencies).cos()
        .rename(cosNames);
      // Get the sin terms.
      var sines = time.multiply(frequencies).sin()
        .rename(sinNames);
      return image.addBands(cosines).addBands(sines);
    };
  };
  ic=ic.map(addHarmonics(harmonicFrequencies));
  //print(ic);
  var band_fit = bands.map(function(dependent){
    dependent=ee.String(dependent);
    // The output of the regression reduction is a 4x1 array image.
    var harmonicTrend = ic
      .select(independents.add(dependent))
      .reduce(ee.Reducer.linearRegression(independents.length(), 1));
    //print(harmonicTrend); //image of (coefficients(2D),residuals(1D))
    // Turn the array image into a multi-band image of coefficients.
    var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
      .arrayProject([0])
      .arrayFlatten([independents]);
    var residuals = harmonicTrend.select('residuals')
      .arrayProject([0])
      .arrayFlatten([['residuals']]).rename('residuals');
    //convert cos sin to mag ang
    var magAng = harmonicFrequencies.map(function(freqs){
      freqs=ee.Number(freqs).int();
      var cos = harmonicTrendCoefficients.select(ee.String('cos_').cat(freqs));
      var sin = harmonicTrendCoefficients.select(ee.String('sin_').cat(freqs));
      var mag = cos.hypot(sin).rename(ee.String('mag_').cat(freqs));
      var ang = (cos.atan2(sin)).unitScale(-Math.PI,Math.PI).add(0.5).mod(1).rename(ee.String('ang_').cat(freqs)); //365/2pi
      return ee.List([mag,ang]);
    });
    magAng = ic_to_image(ee.ImageCollection(magAng.flatten()));
    harmonicTrendCoefficients=harmonicTrendCoefficients.addBands(residuals).addBands(magAng);
    //print(harmonicTrendCoefficients); //image of independents and residuals [constant, cos_1,sin_1...,residuals]
    //adding band name prefix to independents [constant,cos_1,sin_1...]
    //fitting time series
    var fittedHarmonic = ic.map(function(image) {
      return image.select(dependent).addBands(
        image.select(independents)
          .multiply(harmonicTrendCoefficients.select(independents))
          .reduce('sum')
          .rename(dependent.cat('_fitted')));
    });
    var independents_=independents.cat(['residuals']).cat(magNames).cat(angNames);
    var independents_pr = independents_.map(function(independent){
      return dependent.cat('_').cat(ee.String(independent))
    });
    harmonicTrendCoefficients=harmonicTrendCoefficients.select(independents_,independents_pr);
    return harmonicTrendCoefficients
      //.set('fitted',fittedHarmonic); //add image collection of fitted and original values as property
  });
  var fitted = band_fit.map(function(image){
    return ee.ImageCollection(image.get('fitted'));
  });
  band_fit=ee.Image.cat(band_fit).set('fitted',fitted);
  return band_fit;  
};
var maskCloud_s2_light = function(image) {
  image = ee.Image(image);
  var qa = image.select('QA60');
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  //var mask = ee.Image(0).where(image.select('QA60').gte(1024), 1).not();
  image = image.updateMask(mask);
  return image;
};
var vis = function(image) {
  //image = image.resample('bicubic');
  var props = image.toDictionary().set('system:time_start',image.get('system:time_start'))
                                  .set('date',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'));
  image = image.divide(10000).set(props);
  var ndvi = image.normalizedDifference(['nir','r']).rename('ndvi');
  var grvi = image.normalizedDifference(['g','r']).rename('grvi');
  return image.addBands(ndvi).addBands(grvi);
};
var vis1 = function(image) {
  //image = image.resample('bicubic');
  var props = image.toDictionary().set('system:time_start',image.get('system:time_start'));
  image = image.set(props);
  var cr = image.select('VH').subtract(image.select('VV')).rename('CR');
  return image.addBands(cr);
};
var ndvi_chart = function()  //runs when a point on map is clicked - gets s2 ic around point and produces chart for clicked location
{ 
  var point=pt;
  var chart_data = s2_ic.select(['ndvi','ndvi_modeled']).map(function(image){
    return ee.Feature(null,image.reduceRegion({reducer:ee.Reducer.mean(), geometry:point, scale:scale, bestEffort:true}).set('datetime',ee.Date(image.get('system:time_start'))));
  }).filterMetadata('ndvi','greater_than',0).filterMetadata('ndvi_modeled','greater_than',0); //drop nulls or can't plot some points
  var model = s2_ic_sin.reduceRegion({reducer:ee.Reducer.mean(), geometry:point, scale:scale, bestEffort:true})//.getInfo();
  //print(model);
  //model_label.setValue('Model: '+model.getInfo());
  //print(chart_data)
  var elevation_m = elevation.reduceRegion(ee.Reducer.mean(), point, scale).get('elevation');
  elevation_label.setValue('Elevation: '+ee.Number(elevation_m).format('%.1f').getInfo());
  var chart_ts = ui.Chart.feature.byFeature(chart_data,'datetime',['ndvi','ndvi_modeled']);
  chart_ts.setOptions({title:'NDVI at clicked point',
                        hAxis:{title:'Date'},
                        vAxis:{title:'NDVI',minValue:0.5,maxValue:1.0},
                        type: 'scatter',
                        pointSize: 1
  });
  panel.widgets().set(1,chart_ts);
  chart_ts.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    date = ee.Date(xValue).format('YYYY-MM-dd').getInfo();
    date_label.setValue('Current image date: '+date);
    map_update();
  });
  Map.layers().set(layers.indexOf('clicked'), ui.Map.Layer(point,{color:'red'},'Clicked location', true));
  return chart_ts;
};
var map_update = function()
{ 
  var min = ndvi_slider_min.getValue();
  var max = ndvi_slider_max.getValue();
  var s2_image = s2_ic.filterDate(ee.Date(date),ee.Date(date).advance(1,'day'));
  s2_image=s2_image.mosaic().addBands(s2_ic_sin);
  var mask = s2_image.select('ndvi').gt(min)
  var s2_image_masked = s2_image.updateMask(mask);
  var s1_image_masked = s1_ic.select('CR').reduce(ee.Reducer.percentile([5,50,95])).updateMask(mask);
  Map.layers().set(layers.indexOf('ndvi'), ui.Map.Layer(s2_image_masked.select('ndvi'),{min:min,max:max,palette:rg_palette},'NDVI '+date));
  Map.layers().set(layers.indexOf('rgb') , ui.Map.Layer(s2_image.select(['r','g','b']), {min:0,max:0.3}, 'RGB '+date,false));
  Map.layers().set(layers.indexOf('ndvi_constant'), ui.Map.Layer(s2_image_masked.select('ndvi_constant').visualize({min:min,max:max,palette:rg_palette}) ,{},'NDVI annual average (harmonic model)',false));
  Map.layers().set(layers.indexOf('ndvi_ang_1'), ui.Map.Layer(s2_image_masked.select('ndvi_ang_1').add(0.2).mod(1).visualize({min:0,max:1,palette:['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494']}) ,{},'NDVI max date (harmonic model)',false));
  Map.layers().set(layers.indexOf('ndvi_mag_1'), ui.Map.Layer(s2_image_masked.select('ndvi_mag_1').visualize({min:0.1,max:0.2,palette:['#d8b365','#f5f5f5','#5ab4ac']}) ,{},'NDVI annual variation (harmonic model)',false));
  Map.layers().set(layers.indexOf('composite'), ui.Map.Layer(s2_image.visualize({bands:['ndvi_ang_1','ndvi_constant','ndvi_mag_1'],min:[0,0.3,0.1],max:[1,0.7,0.2]}) ,{},'NDVI [r,g,b]=[date,average,variation] (harmonic model)',false));
  Map.layers().set(layers.indexOf('S1_median'), ui.Map.Layer(s1_image_masked.select('CR_p50').visualize({min:-15,max:-5,palette:rg_palette}) ,{},'Sentinel-1 CR annual median',false));
  Map.layers().set(layers.indexOf('S1_var'), ui.Map.Layer(s1_image_masked.select('CR_p95').subtract(s1_image_masked.select('CR_p5')).visualize({min:10,max:20,palette:['#d8b365','#f5f5f5','#5ab4ac']}) ,{},'Sentinel-1 CR annual variation',false));
};
/*set up map */
Map.centerObject(pt,14);
Map.style().set('cursor', 'crosshair');
Map.setOptions('SATELLITE');
/*Elevation*/
var elevation = ee.Image("AU/GA/DEM_1SEC/v10/DEM-S")
elevation=elevation.updateMask(elevation.gt(1)).unmask(ee.Image(0),false).rename('elevation')
var contours = ee.Algorithms.CannyEdgeDetector(elevation.divide(10).round(),1);
contours=elevation.updateMask(contours.gt(0));
Map.layers().set(layers.indexOf('elevation'), ui.Map.Layer(contours.visualize({min:50,max:250,palette:['red','blue']}),{},'Elevation 10m contours',false));
var contact = ui.Label({value:'james.brinkhoff@une.edu.au',targetUrl:'mailto:james.brinkhoff@une.edu.au'});
var ndvi_label = ui.Label('NDVI min and max:')
var ndvi_slider_min = ui.Slider({min:0, max:0.5, value:0.2, step:0.05, onChange:map_update});
var ndvi_slider_max = ui.Slider({min:0.5, max:1.0, value:0.75, step:0.05, onChange:map_update});
var date_label = ui.Label('Please wait, loading images...');
var model_label = ui.Label('Model: ')
//var regen = ui.Button('Update map data around clicked point',get_s2_ic);
var elevation_label = ui.Label('Elevation :');
var chart_ts=ui.Label('Please wait, generating NDVI chart...');
var chart_instructions1 = ui.Label('Click NDVI graph to see image from a different date.')
var chart_instructions2 = ui.Label('Click map to see NDVI graph at a different location.')
var chart_instructions3 = ui.Label('Select layers in the menu ↑.')
var panel = ui.Panel({
  widgets: [date_label,
            chart_ts,
            elevation_label,
            ndvi_label,
            ndvi_slider_min,
            ndvi_slider_max,
            chart_instructions1,chart_instructions2,chart_instructions3,
            //regen,
            //model_label,
            contact],//,select,label3,label4,url_button,url_label,contact],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-right',
    padding: '7px',
    width: '300px'
  }
});
Map.add(panel);
/*S2*/
var today = ee.Date(Date.now());//.format('yyyy-MM-dd','Australia/Sydney');
var s2_ic_all = ee.ImageCollection('COPERNICUS/S2_SR')
            .select(['B2','B3','B4','B5','B8','B6','B7','B8A','B11','B12','QA60'],
                    ['b','g','r','re','nir','re74','re78','re86','swi1','swi2','QA60'])
var date = '';
var s2_ic = s2_ic_all;
var s2_ic_sin = s2_ic.first();
var s1_ic_all = ee.ImageCollection('COPERNICUS/S1_GRD');
var s1_ic = s1_ic_all;
var s1_ic_sin = s1_ic.first();
Map.onClick(get_s2_ic);
ee.Dictionary.fromLists(['lon','lat'], pt.coordinates()).getInfo(get_s2_ic);