var EU_BBOX_original = ui.import && ui.import("EU_BBOX_original", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -27.88958505474776,
                72.00333417514486
              ],
              [
                -27.88958505474776,
                29.182551895038852
              ],
              [
                57.012758695252415,
                29.182551895038852
              ],
              [
                57.012758695252415,
                72.00333417514486
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-27.88958505474776, 72.00333417514486],
          [-27.88958505474776, 29.182551895038852],
          [57.012758695252415, 29.182551895038852],
          [57.012758695252415, 72.00333417514486]]]),
    EU_BBOX = ui.import && ui.import("EU_BBOX", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                13.326195008907673,
                54.929695114329725
              ],
              [
                13.326195008907673,
                43.83773200568875
              ],
              [
                40.484398133907675,
                43.83773200568875
              ],
              [
                40.484398133907675,
                54.929695114329725
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[13.326195008907673, 54.929695114329725],
          [13.326195008907673, 43.83773200568875],
          [40.484398133907675, 43.83773200568875],
          [40.484398133907675, 54.929695114329725]]], null, false);
// #############################################################################
// #############################################################################
var number_of_countries = 38;
var bgColor   = 'rgb(24,26,27)';
var textColor = '#FCF7F1';
var palette   = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var THUMBNAIL_WIDTH = 210;
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '32px',
  padding: '10px',
  color: '#616161',
  backgroundColor: palette.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: palette.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: palette.transparent
};
var BORDER_STYLE = '4px solid rgb(24,26,27)';
var VIZ_PARAMS = {
  palette:['000004', '2C105C', '711F81', 'B63679', 'EE605E', 'FDAE78', 'FCFDBF'],
  min: 0, 
  max: 140
};
var VIZ_PARAMS_diverging = {
  //palette:['a50026','d73027','f46d43','fdae61','fee08b','ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'],
  //palette:['9e0142','d53e4f','f46d43','fdae61','fee08b','ffffbf','e6f598','abdda4','66c2a5','3288bd','5e4fa2'],
  palette:['ffffff','f0f0f0','d9d9d9','bdbdbd','969696','737373','525252','252525'],
  min: -35, 
  max: 5
};  
var visLayer = {
  min: 0,
  max: 140,
  palette: ['000004', '2C105C', '711F81', 'B63679', 'EE605E', 'FDAE78', 'FCFDBF']
};
// #############################################################################
// Get the initial cloud fraction allowance.
var cloudPct = ui.url.get('cloud', 10);
ui.url.set('cloud', cloudPct);  // need to set incase this is the initial load.
var cloudFrac = cloudPct/100;
// Get the initial median reducer scale setting.
var reducerScale = ui.url.get('scale', 15000);
ui.url.set('scale', reducerScale);
// Get the initial list ranking setting.
var rankingByUrl = ui.url.get('ranking', 'absolute difference (μmol/m²)');
ui.url.set('ranking', rankingByUrl);
var ranking = rankingByUrl;
var dateInfo = {
  start: {selected: ''},
  end: {selected: ''}
};
// #############################################################################
// Date Slider
var startSliderDateUrl = ui.url.get('startdate', '2020-03-01');
ui.url.set('startdate', startSliderDateUrl);
//print(ee.Date(startSliderDateUrl).advance(-1, 'year'));
var endSliderDateUrl = ui.url.get('enddate', '2020-04-01');
ui.url.set('enddate', endSliderDateUrl);
//print(ee.Date(endSliderDateUrl).advance(-1, 'year'));
var startSliderDate = ui.DateSlider({
  start: '2020-01-01', 
  end:   '2020-05-01', 
  value: '2020-03-01', 
  period: 1,
  style: {stretch: 'horizontal', shown: true, color: 'white', backgroundColor: 'grey'}
});
var startDateLabel = ui.Label({
  value: 'Start:', 
  style: {width: '45px',color: 'white', backgroundColor: bgColor,fontWeight: 'bold', padding: '25px 0px 0px 0px'}
});
var startDatePanel = ui.Panel({
  widgets: [startDateLabel, startSliderDate],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal',color: 'white',backgroundColor: bgColor}
});
var endSliderDate = ui.DateSlider({
  start: '2020-03-01', 
  end:   '2020-05-01', 
  value: '2020-04-01', 
  period: 1,
  style: {stretch: 'horizontal', shown: true, color: 'white', backgroundColor: 'grey'}
});
var endDateLabel = ui.Label({
  value: 'End:', 
  style: {width: '45px',color: 'white', backgroundColor: bgColor,fontWeight: 'bold', padding: '25px 0px 0px 0px'}
});
var endDatePanel = ui.Panel({
  widgets: [endDateLabel, endSliderDate],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal',color: textColor, backgroundColor: bgColor}
});
dateInfo.start.selected  = startSliderDateUrl;
dateInfo.end.selected    = endSliderDateUrl;
// #############################################################################
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var addArea = function(feature) {
  return feature.set({areaHa: feature.geometry().area().divide(100 * 100).round()});
};
var uniqueID = function(feature) {
  var ID = ee.Number(feature.get('ID')).multiply(10000).round();
  return feature.set({'ID': ID});
};
function maskClouds(img) {  
  var cloudMask = img.select('cloud_fraction').gte(cloudFrac);  
  return img.updateMask(cloudMask);
}
// get min and max dates for dataset.
/*function getMinMaxDate() {
  var col = ee.ImageCollection(thisData.colId)
    .filterBounds(aoi);
  var dataDateRange = ee.Dictionary(col.reduceColumns(
    {reducer: ee.Reducer.minMax(), selectors: ['system:time_start']}));
  var firstDate = ee.Date(dataDateRange.get('min'));
  var lastDate = ee.Date(dataDateRange.get('max'));
  return ee.Dictionary({firstDate: firstDate, lastDate: lastDate});
}
*/
/*
function startDateHandler() {
  startLabel.style().set({shown: false});
  var selectedDate = ee.Date(ee.List(startDatePanel.widgets().get(1).getValue()).get(0));
  selectedDate.format('YYYY-MM-dd').evaluate(function(date) {
    ui.url.set('startdate', date);
    //dateInfo.start.selected = date;
    //var img = compositeImages(selectedDate);
    //startMap.layers().set(0, ui.Map.Layer(img, thisData.visParams, null, true, 0.55));
    //startLabel.setValue(date);
    startLabel.style().set({shown: true});
    //drawChart();
  });
}
*/
/*
function endDateHandler() {
  endLabel.style().set({shown: false});
  var selectedDate = ee.Date(ee.List(endDatePanel.widgets().get(1).getValue()).get(0));
  selectedDate.format('YYYY-MM-dd').evaluate(function(date) {
    ui.url.set('enddate', date);
    dateInfo.end.selected = date;
    //var img = compositeImages(selectedDate);
    //endMap.layers().set(0, ui.Map.Layer(img, thisData.visParams, null, true, 0.55));
    //endLabel.setValue(date);
    endLabel.style().set({shown: true});
    //drawChart();
  });
}
*/
// #############################################################################
// Cloud Slider
var cloudFracSlider = ui.Slider({
  min: 0, 
  max: 100, 
  value: cloudPct, 
  step: 1, 
  style: { stretch: 'horizontal', color: textColor,backgroundColor: bgColor }
});
// #############################################################################
// Reducer Slider
var reducerScaleSlider = ui.Slider({
  min: 5000, 
  max: 25000, 
  value: reducerScale, 
  step: 1000, 
  style: { stretch: 'horizontal', color: textColor,backgroundColor: bgColor }
});
// #############################################################################
var dropdownLabel  = ui.Label({
  value: '4. Ranking is done with:', 
  style: {width: '140px',color: textColor, backgroundColor: bgColor}
});
var dropdownButton = ui.Select({
  items: ['absolute difference (μmol/m²)', 'relative difference (%)'],
  value: ranking, 
  style: {stretch: 'horizontal', margin: '1px',backgroundColor: bgColor}
});
var dropdownPanel = ui.Panel({
  widgets: [dropdownLabel,dropdownButton],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal' /*position: 'bottom-end', */,padding: '0px', backgroundColor: bgColor}
}); 
var buttonLabel = ui.Label({
  value: '5. Final step:', 
  style: {width: '140px',color: textColor, backgroundColor: bgColor}
});
var updateButton = ui.Button({
    label: 'Update List!!', 
    style: {stretch: 'horizontal', margin: '1px'},
    onClick: function(){
      updateMap(startSliderDate.getValue(), endSliderDate.getValue(), cloudFracSlider.getValue(), reducerScaleSlider.getValue(),dropdownButton.getValue());      
    }
});
var buttonPanel = ui.Panel({
  widgets: [buttonLabel,updateButton],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal', color: 'red',padding: '0px', backgroundColor: bgColor}
}); 
// #############################################################################
// Create an introduction panel.
var intro = ui.Panel([
  ui.Label({
    value: "Europe's Air Quality Winner",
    style: {fontSize: '24px', fontWeight: 'bold', color: textColor, backgroundColor: bgColor}
  }),
  ui.Label({
    value: "Due to the Corona lockdown, air quality has improved in many European countries. We show the winners in our NO2 ranking list.",
    style: {color: textColor, backgroundColor: bgColor}
  })
  ],null, {backgroundColor: bgColor}
);
// #############################################################################  
// Define the info panel.
var infoPanel = ui.Panel({
    style: {width: '30%', stretch: 'horizontal', padding: '4px', color: bgColor, backgroundColor: bgColor }
  });
function legend() {
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(visLayer.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '18px'},
  });
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(visLayer.min, {margin: '4px 8px', fontSize: '11px', fontWeight: '100',
        backgroundColor: 'rgba(0, 0, 0, 0.0)', color: 'FFF'}),
      ui.Label(
          ((visLayer.max - visLayer.min) / 2 + visLayer.min),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontSize: '11px',
            fontWeight: '100', backgroundColor: 'rgba(0, 0, 0, 0.0)', color: 'FFF'}),
      ui.Label(visLayer.max, {margin: '4px 8px', fontSize: '11px', fontWeight: '100',
        backgroundColor: 'rgba(0, 0, 0, 0.0)', color: 'FFF'})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {backgroundColor: 'rgba(0, 0, 0, 0.0)'}
  });
  var legendTitle = ui.Label({
    value: 'NO2 Median Composite (μmol/m²), tropospheric vertical column' ,
    style: {margin: '4px 8px', fontSize: '11px', fontWeight: '100',
        backgroundColor: 'rgba(0, 0, 0, 0.0)', color: 'FFF'}
  });
  return ui.Panel({widgets: [legendTitle, colorBar, legendLabels], style: {backgroundColor: 'rgba(0, 0, 0, 0.0)'}});
}
// #############################################################################  
var EU_boundaries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var EU = EU_boundaries.filter(ee.Filter.eq('wld_rgn', 'Europe'))
.filter(ee.Filter.neq('country_na', 'Russia'))
.filter(ee.Filter.neq('country_na', 'Svalbard'))
.map(addArea) 
.filter(ee.Filter.gt('areaHa', 240000))
.randomColumn('ID', 2)
.map(uniqueID)
.limit(number_of_countries)
.sort('ID');
var EUList = EU.aggregate_array('country_na');
//print('EU',EU);
//print(EUList);
// #############################################################################  
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: EU,
  color: 'ID'
});
// #############################################################################  
var NO2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
          .filterBounds(EU_BBOX_original)
          .map(maskClouds)
          .select('NO2_column_number_density')
          .map(function(img) {
            return img.multiply(1e6).copyProperties(img,['system:time_start']); 
          }); 
var NO2_before = NO2.filterDate(ee.Date(startSliderDateUrl).advance(-1, 'year'), ee.Date(endSliderDateUrl).advance(-1, 'year')).median().rename('NO2_before');
var NO2_after  = NO2.filterDate(ee.Date(startSliderDateUrl), ee.Date(endSliderDateUrl)).median().rename('NO2_after');
var Diff = NO2_after.subtract(NO2_before).rename('Diff');
// ####################################################################
// Get Median for 2 time periods
var medianNO2 = NO2_before.addBands(NO2_after).addBands(Diff);
//var clipIC = medianNO2.clipToCollection(EU);
var clippedImages = EU.map(function(feature) {
  return medianNO2.clip(feature);
});
var imageList = clippedImages.toList(clippedImages.size());
//print('imageList', imageList);
// ####################################################################
/*var reducers = ee.Reducer.histogram().combine({
  reducer2: ee.Reducer.median().unweighted(),
  sharedInputs: true
})*/
var result = medianNO2.addBands(outline).reduceRegion({
    reducer: ee.Reducer.median().unweighted().repeat(3).group({
    groupField: 3, 
    groupName: 'ID'
  }),
  geometry: EU_BBOX_original,
  scale: reducerScale,
  maxPixels: 1e15
  });
var groups = ee.List(result.get('groups'));
//print('groups',groups);
// ####################################################################
// Calculate the Difference of the Median values
var diffs = groups.map(function(f){
  f           = ee.Dictionary(f);
  var values  = f.values();
  var medians = values.get(1); // median values
  medians     = ee.List(medians);
  var Median_before = ee.Number(medians.getNumber(0)); // 2019
  var Median_after  = ee.Number(medians.getNumber(1)); // 2020
  var Diff_abs = Median_after.subtract(Median_before);  
  var Diff_rel = Median_after.subtract(Median_before).divide(Median_before).multiply(100);
  return f.set('Diff_abs', Diff_abs).set('Diff_rel', Diff_rel);
});
//print('diffs', diffs);
// ####################################################################
// Add Country Name, Median, Histogram and Median Diff to the Image List
var n        = diffs.size().subtract(1);
var sequence = ee.List.sequence(0, n);
//print(sequence)
var images   = [];
images = sequence.map(function(n) {
  var D         = diffs.get(n);
  var ID        = ee.Feature(null, D).get('ID');
  var Diff_abs  = ee.Feature(null, D).get('Diff_abs');
  var Diff_rel  = ee.Feature(null, D).get('Diff_rel');
  var Median    = ee.Feature(null, D).get('median');
  //var Histogram = ee.Feature(null, D).get('histogram');
  var image = imageList.get(n);
  return ee.Image(image).setMulti({'ID':ID,'Name':EUList.get(n),'Diff_abs':Diff_abs,'Diff_rel':Diff_rel,'Median':Median,/*'Histogram':Histogram*/});
});
//print('images', images);
var collection = ee.ImageCollection.fromImages(images);
var sorted_asc = collection.sort('Diff_abs');
//print('sorted_asc',sorted_asc)
var images2 = sorted_asc.toList(number_of_countries);
images2 = sequence.map(function(n) {
  var image = images2.get(n);
  return ee.Image(image).set({'rank':ee.Number(n).add(1)});
});
// #############################################################################
//print(images2)
var mapComparison = ui.Panel([
  ui.Label({
    value: 'Change Settings:',
    style: {fontSize: '20px', fontWeight: 'bold', color: textColor, backgroundColor: bgColor}
  }),
  ui.Label({value: "1. Select 'lockdown' time period:", style: {color: textColor, backgroundColor: bgColor}}),
  startDatePanel,
  endDatePanel,
  ui.Label({value: '2. Select max cloud allowance (percent/pixel):', style: {color: textColor, backgroundColor: bgColor}}),
  cloudFracSlider,
  ui.Label({value: '3. Select reducer scale (meter):', style: {color: textColor, backgroundColor: bgColor}}),
  reducerScaleSlider,
  dropdownPanel,
  buttonPanel
  ],null, {backgroundColor: bgColor}
);
var panelBreak25 = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: '#FCF7F1', margin: '8px 4px 8px 4px'});
var panelBreak50 = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: '#FCF7F1', margin: '8px 4px 8px 4px'});
//var panelBreakTop = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: '#FCF7F1', margin: '8px 4px 8px 4px'});
var contact = ui.Panel(
  ui.Label({
    value: 'Contact: gaertner.p@gmail.com | Twitter: @gartn001', 
    style: {color: textColor, backgroundColor: bgColor, fontSize: '10px'}
  }),
  null, {color: textColor, backgroundColor: bgColor})
// #############################################################################
// Add widgets to the info panel.
infoPanel.add(intro);
infoPanel.add(panelBreak25);
infoPanel.add(mapComparison);
infoPanel.add(panelBreak50);
infoPanel.add(contact);
function makeMainPanel() {
  var GridPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '100%',
      //margin: '0px 0px 50px 0px',
      border: BORDER_STYLE,
      backgroundColor: bgColor
    }
  });
/*  var d = ui.Label({
    value: 'List of NO2 Differences', 
  style: {color: textColor, backgroundColor: bgColor,padding: '0px 50px 0px 0px'}})
  var e = ui.Label({
    value: 'Median Reducer Scale: ' + reducerScale + ' m', 
  style: {color: textColor, backgroundColor: bgColor,padding: '0px 78px 0px 0px'}})
  var f = ui.Label({value: 'Comparing Period (Middle Map): TimePeriod - 1 year', style: {color: textColor, backgroundColor: bgColor}})
  var b_Panel = ui.Panel({
  widgets: [d,e,f],
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {stretch: 'horizontal', position: 'top-left', padding: '0px 0px 0px 16px',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  }});
  GridPanel.add(b_Panel);
 */ 
  var legendPanel = ui.Panel({
  widgets: [legend()],
  style: {stretch: 'horizontal', position: 'bottom-center', padding: '2px 2px 2px 16px',
    backgroundColor: 'rgba(0,0,0,0.5)', width: '430px'
  }})//.style().set('position', 'top-center');
  GridPanel.add(legendPanel);
//  GridPanel.add(panelBreakTop);
  //
  return GridPanel;
}
// ####################################################################
// Make Thumbnail Grid
function makeThumbnailGrid() {
  return ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', true),
    style: {
      stretch: 'vertical',
      backgroundColor: palette.transparent,
    }
  });
}
function updateUI(groups, thumbnailGrid) {
  thumbnailGrid.clear();
  var groupCollection = ee.ImageCollection(groups);
  var ids             = groupCollection.aggregate_array('ID');
  ids.evaluate(function(ids) {
    ids.forEach(function(id) {
      var image = groupCollection.filterMetadata('ID', 'equals', id).first();
      //var name  = image.get('Name') 
      var thumb = makeThumbnail(id, image);
      thumbnailGrid.add(thumb);
    });
  });
}
// ####################################################################
// Make Thumbnail 
function makeThumbnail(id, image) {
  var thumbnailContainer = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      backgroundColor: palette.transparent,
      border: BORDER_STYLE,
      padding: '4px',
      margin: '5px',
    },
  });
  var rankLabel = ui.Label({
  value: '', 
    style: {
      border: BORDER_STYLE,
      color: textColor,
      fontSize: '32px',
      backgroundColor: bgColor
    }
  });
  image.get('rank').evaluate(function(val){rankLabel.setValue(val + '.')});
  var countryLabel = ui.Label({
  value: '... please wait ...', 
    style: {
      border: BORDER_STYLE,
      color: textColor,
      backgroundColor: bgColor
    }
  });
  image.get('Name').evaluate(function(val){countryLabel.setValue(val)});
  // add country ID
  var diff_abs_Label = ui.Label({
  value: '... crunshing data ...',
  style: {
      border: BORDER_STYLE,
      color: textColor,
      backgroundColor: bgColor
    }
  });
  image.get('Diff_abs').evaluate(function(val){diff_abs_Label.setValue('Absolute difference: ' + Math.round( val * 100 + Number.EPSILON ) / 100 + ' μmol/m²') });
  var diff_rel_Label = ui.Label({
  value: '... still calculating ...',style: {
      border: BORDER_STYLE,
      color: textColor,
      backgroundColor: bgColor
    }
  });
  image.get('Diff_rel').evaluate(function(val){diff_rel_Label.setValue('Relative difference: ' + Math.round( val * 100 + Number.EPSILON ) / 100 + ' %') });
  var testPanel = ui.Panel({
  widgets: [rankLabel, countryLabel, diff_abs_Label, diff_rel_Label],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal', /*position: 'bottom-end', */padding: '0px', backgroundColor: bgColor}
}); 
  thumbnailContainer.add(testPanel);
 // var chart = ui.Chart(dataTable)
 // var val = image.get('Histogram')
//  var xx  = ee.List(val)
//  var xxx = xx.get(0)
//  var xxxx = xxx.keys()
  //var features1 = ee.List(val.histogram[0].histogram).zip(val.histogram[0].bucketMeans)//.map(function(o) {
//    print(xx)
//    print(xxxx)
  /*.evaluate(function(val){
    var features1 = ee.List(val.histogram[0].histogram).zip(val.histogram[0].bucketMeans).map(function(o) {
      o = ee.List(o)
      return ee.Feature(null, { x: o.get(1), EVI_mean: o.get(0) })
    })
    var features = ee.FeatureCollection(features1)
    chart.setValue(features)
  });*/
  //thumbnailContainer.add(chart);  
  /*var features1 = ee.List(image.get('Histogram').histogram[0].histogram).zip(g.histogram[0].bucketMeans).map(function(o) {
      o = ee.List(o)
      return ee.Feature(null, { x: o.get(1), EVI_mean: o.get(0) })
    })*/
/*
    var features2 = ee.List(g.histogram[1].histogram).zip(g.histogram[1].bucketMeans).map(function(o) {
      o = ee.List(o)
      return ee.Feature(null, { x: o.get(1), EVI_median: o.get(0)})
    })
    var features = ee.FeatureCollection(features1).merge(features2)
  */  
  //var chart = ui.Chart.feature.byFeature().setChartType('AreaChart')
 // var outline = empty.paint({
//  featureCollection: ecoregions,
//  color: 1,
//  width: 3
//});
  //print(id)
  var cc = EU.filter(ee.Filter.eq('ID', id));
  //print(cc)
  // add thumbnail 2019
  var thumbnail2019 = ui.Thumbnail({
    image: image.select('NO2_before').visualize(VIZ_PARAMS).paint(cc, 255, 1), 
    params: { dimensions: THUMBNAIL_WIDTH, crs: 'EPSG:3857', format: 'png'},
    style: { width: THUMBNAIL_WIDTH + 'px', maxHeight: THUMBNAIL_WIDTH + 200 + 'px',
             backgroundColor: palette.transparent, border: BORDER_STYLE }
  });
  //thumbnailContainer.add(thumbnail2019);
  // add thumbnail 2020
  var thumbnail2020 = ui.Thumbnail({
    image: image.select('NO2_after').visualize(VIZ_PARAMS).paint(cc, 255, 1), 
    params: {      dimensions: THUMBNAIL_WIDTH,      crs: 'EPSG:3857',      format: 'png'    },
    style: {width: THUMBNAIL_WIDTH + 'px', maxHeight: THUMBNAIL_WIDTH + 200 + 'px',
    backgroundColor: palette.transparent,      border: BORDER_STYLE    }
  });
  //thumbnailContainer.add(thumbnail2020);
  // add thumbnail difference
  var medianDifference = ui.Thumbnail({
    image: image.select('Diff').visualize(VIZ_PARAMS_diverging).paint(cc, 255, 1), 
    params: {
      dimensions: THUMBNAIL_WIDTH,
      crs: 'EPSG:3857',
      format: 'png'
    },
    style: {
      width: THUMBNAIL_WIDTH + 'px', 
      maxHeight: THUMBNAIL_WIDTH + 200 + 'px',
      backgroundColor: palette.transparent,
      border: BORDER_STYLE
    }
  });
  //thumbnailContainer.add(medianDifference);
  var thumbnailPanel = ui.Panel({
  widgets: [thumbnail2019, thumbnail2020, medianDifference],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal', /*position: 'bottom-end', */padding: '0px', backgroundColor: bgColor}
}); 
  thumbnailContainer.add(thumbnailPanel);
  var ww = startSliderDate.getValue();
  var ww2 = endSliderDate.getValue();
  var Before_Start = ee.Date(ee.List(ww).get(0)).advance(-1, 'year');
  var After_Start  = ee.Date(ee.List(ww).get(0));
  var Before_End = ee.Date(ee.List(ww2).get(0)).advance(-1, 'year');
  var After_End  = ee.Date(ee.List(ww2).get(0));
  var Before_Start_Label = ui.Label({
  value: '',style: {
      border: BORDER_STYLE,
      color: textColor,
      fontSize:'9px',
      padding:'0px',
      margin: '0px',
      backgroundColor: bgColor
    }
  });
  Before_Start.format('YYYY-MM-dd').evaluate(function(str) {
      Before_Start_Label.setValue('Median composite from ' + str + '  until ');
  });
  var Before_End_Label = ui.Label({
  value: '',style: {
      border: BORDER_STYLE,
      color: textColor,
      fontSize:'9px',
      padding:'0px',
      margin: '0px',
      backgroundColor: bgColor
    }
  });
  Before_End.format('YYYY-MM-dd').evaluate(function(str) {
    Before_End_Label.setValue(str);
  });
  var before_Panel = ui.Panel({
  widgets: [Before_Start_Label,Before_End_Label],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal', padding: '0px', backgroundColor: bgColor}
}); 
  var After_Start_Label = ui.Label({
  value: '',style: {
      border: BORDER_STYLE,
      color: textColor,
      fontSize:'9px',
      padding:'0px',
      margin: '0px',
      backgroundColor: bgColor
    }
  });
  After_Start.format('YYYY-MM-dd').evaluate(function(str) {
      After_Start_Label.setValue(str + ' until ');
  });
  var After_End_Label = ui.Label({
  value: '',style: {
      border: BORDER_STYLE,
      color: textColor,
      fontSize:'9px',
      padding:'0px',
      margin: '0px',
      backgroundColor: bgColor
    }
  });
  After_End.format('YYYY-MM-dd').evaluate(function(str) {
    After_End_Label.setValue(str);
  });
  var after_Panel = ui.Panel({
  widgets: [After_Start_Label,After_End_Label],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal', padding: '0px', backgroundColor: bgColor}
}); 
  thumbnailContainer.add(before_Panel);
  //thumbnailContainer.add(after_Panel);
  return thumbnailContainer;
}
//ui.root.clear();
var GridPanel = makeMainPanel();
// #############################################################################
// Make the info panel and slider panel split.
var splitPanel = ui.SplitPanel(infoPanel, GridPanel);
// #############################################################################
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
var thumbnailGrid = makeThumbnailGrid();
GridPanel.add(thumbnailGrid);
updateUI(images2, thumbnailGrid);
// #############################################################################  
function updateMap(start_date, end_date, cloudFrac,reducerScale,ranking_method){
  //print(cloudFrac)
  //print(ee.Date(ee.List(start_date).get(0)).advance(-1, 'year'))
  //print(ee.Date(ee.List(end_date).get(0)))
  //print(reducerScale)
  //print(ranking_method)
  if (ranking_method == 'absolute difference (μmol/m²)') {
    var order_by = 'Diff_abs'
  }
  if (ranking_method == 'relative difference (%)') {
    var order_by = 'Diff_rel'
  }
cloudFrac = cloudFrac /100
var NO2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
          .filterBounds(EU_BBOX_original)
          .map(function(img) {  
  var cloudMask = img.select('cloud_fraction').gte(cloudFrac);  
  return img.updateMask(cloudMask)
})
          .select('NO2_column_number_density')
          .map(function(img) {
            return img.multiply(1e6).copyProperties(img,['system:time_start']); 
          }); 
var NO2_before = NO2.filterDate(ee.Date(ee.List(start_date).get(0)).advance(-1, 'year'), ee.Date(ee.List(end_date).get(0)).advance(-1, 'year')).median().rename('NO2_before');
var NO2_after  = NO2.filterDate(ee.Date(ee.List(start_date).get(0)),                     ee.Date(ee.List(end_date).get(0))).median().rename('NO2_after');
var Diff = NO2_after.subtract(NO2_before).rename('Diff');
// ####################################################################
// Get Median for 2 time periods
var medianNO2 = NO2_before.addBands(NO2_after).addBands(Diff);
//var clipIC = medianNO2.clipToCollection(EU);
var clippedImages = EU.map(function(feature) {
  return medianNO2.clip(feature);
});
var imageList = clippedImages.toList(clippedImages.size());
//print('imageList', imageList);
// ####################################################################
/*var reducers = ee.Reducer.histogram().combine({
  reducer2: ee.Reducer.median().unweighted(),
  sharedInputs: true
})*/
var result = medianNO2.addBands(outline).reduceRegion({
    reducer: ee.Reducer.median().unweighted().repeat(3).group({
    groupField: 3, 
    groupName: 'ID'
  }),
  geometry: EU_BBOX_original,
  scale: reducerScale,
  maxPixels: 1e15
  });
var groups = ee.List(result.get('groups'));
//print('groups',groups);
// ####################################################################
// Calculate the Difference of the Median values
var diffs = groups.map(function(f){
  f           = ee.Dictionary(f);
  var values  = f.values();
  var medians = values.get(1); // median values
  medians     = ee.List(medians);
  var Median_before = ee.Number(medians.getNumber(0)); // 2019
  var Median_after  = ee.Number(medians.getNumber(1)); // 2020
  var Diff_abs = Median_after.subtract(Median_before);  
  var Diff_rel = Median_after.subtract(Median_before).divide(Median_before).multiply(100);
  return f.set('Diff_abs', Diff_abs).set('Diff_rel', Diff_rel);
});
//print('diffs', diffs);
// ####################################################################
// Add Country Name, Median, Histogram and Median Diff to the Image List
var n        = diffs.size().subtract(1);
var sequence = ee.List.sequence(0, n);
//print(sequence)
var images   = [];
images = sequence.map(function(n) {
  var D         = diffs.get(n);
  var ID        = ee.Feature(null, D).get('ID');
  var Diff_abs  = ee.Feature(null, D).get('Diff_abs');
  var Diff_rel  = ee.Feature(null, D).get('Diff_rel');
  var Median    = ee.Feature(null, D).get('median');
  //var Histogram = ee.Feature(null, D).get('histogram');
  var image = imageList.get(n);
  return ee.Image(image).setMulti({'ID':ID,'Name':EUList.get(n),'Diff_abs':Diff_abs,'Diff_rel':Diff_rel,'Median':Median,/*'Histogram':Histogram*/});
});
//print('images', images);
var collection = ee.ImageCollection.fromImages(images);
var sorted_asc = collection.sort(order_by);
//print('sorted_asc',sorted_asc)
var images2 = sorted_asc.toList(number_of_countries);
images2 = sequence.map(function(n) {
  var image = images2.get(n);
  return ee.Image(image).set({'rank':ee.Number(n).add(1)});
});
updateUI(images2, thumbnailGrid);
}