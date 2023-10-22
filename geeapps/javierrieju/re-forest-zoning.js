var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -0.9123250999450638,
                39.58478013607497
              ],
              [
                -0.9123250999450638,
                39.5809517025044
              ],
              [
                -0.9071001567840531,
                39.5809517025044
              ],
              [
                -0.9071001567840531,
                39.58478013607497
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #23cba7 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-0.9123250999450638, 39.58478013607497],
          [-0.9123250999450638, 39.5809517025044],
          [-0.9071001567840531, 39.5809517025044],
          [-0.9071001567840531, 39.58478013607497]]], null, false);
//// Herramientas
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Select a drawing mode.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    })
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
/////////////////////////////////////////////////////////////////////////////////////////////////////
var Etiquetas1 = [
  'High',
  'Medium',
  'Low',];
// set position of panel
var legend1 = ui.Panel({
  style: {
    position: 'top-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle1 = ui.Label({
  value: 'TVMDI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend1.add(legendTitle1);
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette1 =['040281', '86e26f', 'a71001'];
// name of the legend
var names1 = ['High',
  'Medium',
  'Low'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend1.add(makeRow(palette1[i], names1[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend1);
/////////////////////////////////////////////////////////////////////////////////////////////////////
/*
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: true}
});
Map.add(chartPanel);
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////
Map.setOptions('Satellite')
Map.setCenter(-4.154, 40.121, 6)
/////////////////////////////////////////////////////////////////////////////////////////////////////
//var params2 = require('users/javierrieju/resilience_fire:seasonally_index');
//var improve_total = params2.improve_total;
/////////////////////////////////////////////////////////////////////////////////////////////////////
var table = ui.Chart(
[ 
  ['<img src="https://silvadaptnet.webs.upv.es/wp-content/uploads/2020/11/2-edited-768x575.jpeg" width= "290" height="145">']
],
'Table', {allowHtml: true});
var titlePanel = ui.Panel([table], 'flow', {width: '350px'});
//App title
var header = ui.Label('ECHYZON (Eco-Hydrologic Zoning for Precision Management)', 
{fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'It is a tool that allows accurate zoning based on the water in the system.',
    {fontSize: '15px'});
var autores = ui.Label('Autores',{fontWeight: 'bold'});    
var autor1 = ui.Label(
  'Antonio D del Campo García',
    {fontSize: '15px'});
var autor2 = ui.Label(
  'Javier Pérez Romero',
    {fontSize: '15px'});
/*
//App title
var header = ui.Label('Fire Greenness Relisience Index (FGRI)', 
{fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'This tool maps the FGRI of a burned area. This index allows to know how fast or slow the recovery '+
  'of the vegetation has been and to see which forestry action should be considered: replanting or thinning.',
    {fontSize: '15px'});
*/
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text, autores, autor1, autor2],//Adds header and text
  style:{width: '340px',position:'middle-right'}});
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
//3.4) Add our main panel to the root of our GUI
////////////////////////
///////////////////////////////////////////////////////////////////////////////
var d = new Date();
var y = d.getFullYear();
var roiSectionLabel = ui.Label('3. Define Area',{fontWeight: 'bold'});
var roilabel = ui.Label('Edit a geometry with the tools at the top left of the map area.');
var indexSectionLabel = ui.Label('2. Select classes number ',{fontWeight: 'bold'});
var classlabel = ui.Label('Number of classes in which the study area is to be divided into.');
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px'}
});
var yearSectionLabel = ui.Label('1. Define date',{fontWeight: 'bold'});
var startYearLabel = ui.Label('Year');
var startYearslider = ui.Slider({min:2013, max:y, value:2013, step:1}).style().set('stretch', 'horizontal');
var startclassLabel = ui.Label('n_class');
var startclassslider = ui.Slider({min:2, max:8, value:2, step:1}).style().set('stretch', 'horizontal');
var endDayLabel = ui.Label('Month');
var endDayBox = ui.Slider({min:1, max:y, value:12, step:1}).style().set('stretch', 'horizontal');
var button = ui.Button('dNBR');
var yearSelector = ui.Select({
  placeholder: 'please wait..',
  })
var monthSelector = ui.Select({
  placeholder: 'please wait..',
  })
var mesesSelector = ui.Select({
  placeholder: 'please wait..',
  })
var meses2Selector = ui.Select({
  placeholder: 'please wait..',
  })
var classSelector = ui.Select({
  placeholder: 'please wait..',
  })
var datesPanel1 = ui.Panel(
  [ yearSectionLabel,yearSelector,monthSelector,mesesSelector,meses2Selector]
);
var datesPanel3 = ui.Panel(
  [ indexSectionLabel,
    classlabel,
    classSelector,
    roiSectionLabel,
    roilabel,
    ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  })] 
);
var Resultlabel = ui.Panel(ui.Label('Result',{fontWeight: 'bold'}));
//var index = ui.Map.Layer(improve_total, {min: 0 , max: 1,  palette:['green','yellow','orange','red','purple']},'FGRI', 0);
//Map.add(index);
var extCheck = ui.Checkbox('FGRI').setValue(false);
//Extent 2000
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  index.setShown(checked)
  })
}
doCheckbox();
// Let's add a dropdown with the years
var years = ee.List.sequence(2013, 2022)
var months = ee.List.sequence(2013, 2022)
var meses = ee.List.sequence(1, 12)
var meses2 = ee.List.sequence(1, 12)
var n_clases = ee.List.sequence(2, 8)
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var monthStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var mesesStrings = meses.map(function(meses){
  return ee.Number(meses).format('%1d')
})
var meses2Strings = meses2.map(function(meses2){
  return ee.Number(meses2).format('%1d')
})
var clasesStrings = n_clases.map(function(n_clases){
  return ee.Number(n_clases).format('%1d')
})
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('Select a init year')
})
monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList)
  monthSelector.setPlaceholder('Select a end year')
})
mesesStrings.evaluate(function(classList) {
  mesesSelector.items().reset(classList)
  mesesSelector.setPlaceholder('Select init month')
})
meses2Strings.evaluate(function(classList) {
  meses2Selector.items().reset(classList)
  meses2Selector.setPlaceholder('Select end month')
})
clasesStrings.evaluate(function(classList) {
  classSelector.items().reset(classList)
  classSelector.setPlaceholder('Select class number')
})
//////////////
var loadComposite = function() {
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  //Colección Landsat
  var params2 = require('users/javierrieju/resilience_fire:Collection');
  var L8 = params2.L8
  //Dates
  var year_init = yearSelector.getValue()
  var year_end = monthSelector.getValue()
  var month_init = mesesSelector.getValue()
  var month_end = meses2Selector.getValue()
  print('year_init',year_init)
  ///Annual Landsat
  var years = ee.List.sequence(ee.Number.parse(year_init), ee.Number.parse(year_end));//(2005, 2007);
  var landsatYEAR_mean = ee.ImageCollection(years.map(function (y) {
      return ee.Image(
          L8
            .filter(ee.Filter.calendarRange(ee.Number.parse(month_init),ee.Number.parse(month_end),'month'))
            .mean()
      );
  }));
  print('landsatYEAR_mean',landsatYEAR_mean);
  var listOfImages = landsatYEAR_mean.toList(landsatYEAR_mean.size());
  var newList = listOfImages.map(function comprobeBandsNumber(ele){
    var new_list = ee.List([]); 
    var count = ee.Image(ele).bandNames().size();
    var comp = ee.Algorithms.If(count.eq(20), ele, 0);
    new_list = new_list.add(comp);
    return new_list;
  }).flatten();
  //removing zeroes in new list
  newList = newList.removeAll([0]);
  print("new list", newList);
  //creating new collection
  var MIC = ee.ImageCollection(newList);
  var landsatYEAR_mean = MIC;
  var mean_red = landsatYEAR_mean.select('red').mean();
  var mean_nir = landsatYEAR_mean.select('nir').mean();
  var mean_ndvi = landsatYEAR_mean.select('ndvi').mean();
  print('mean_red',mean_red);
  print('mean_nir',mean_nir);
  print('mean_ndvi',mean_ndvi);
  //
  var collection_redmax = landsatYEAR_mean.select('red').max();
  var collection_redmin = landsatYEAR_mean.select('red').min();
  var collection_nirmax = landsatYEAR_mean.select('nir').max();
  var collection_nirmin = landsatYEAR_mean.select('nir').min();
  var max_red = ee.Number((collection_redmax).reduceRegion({reducer: ee.Reducer.max(),geometry: aoi, scale: 30}).get('red'));
  var min_red = ee.Number((collection_redmin).reduceRegion({reducer: ee.Reducer.min(),geometry: aoi, scale: 30}).get('red'));
  var max_nir = ee.Number((collection_nirmax).reduceRegion({reducer: ee.Reducer.max(),geometry: aoi, scale: 30}).get('nir'));
  var min_nir = ee.Number((collection_nirmin).reduceRegion({reducer: ee.Reducer.min(),geometry: aoi, scale: 30}).get('nir'));
  print(max_red, min_red)
  print(max_nir, min_nir)
  // Add Index
  function addvar(image) {
    var pdi= (image.select('red')).add((image.select('nir')).multiply(Dry)).divide(((Dry*Dry) + 1)*(0.5));
    var pvi= (image.select('nir').subtract(image.select('red').multiply(Dry)).subtract(residual)).divide((Dry*Dry + (1))*0.5);
    var sm= (image.select('nir').add(image.select('red').divide(Dry)).subtract(residual)).divide((1/(Dry*Dry) + (1))*0.5);
    return image
      .addBands(pdi.rename('pdi'))
      .addBands(pvi.rename('pvi'))
      .addBands(sm.rename('sm'));
  }
  //var year_lan = landsatYEAR_mean//.map(addvar);
  var min_max_red = (mean_red).reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: aoi,
  scale: 30
  });
  print('min_max_red',min_max_red);
  var red_ = (mean_red).unitScale(min_max_red.get('red'+'_min'), min_max_red.get('red'+'_max'));
  var min_max_nir = (mean_nir).reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: aoi,
  scale: 30
  });
  print('min_max_nir',min_max_nir);
  var nir_ = (mean_nir).unitScale(min_max_nir.get('nir'+'_min'), min_max_nir.get('nir'+'_max'));
  var line= ee.Image.cat(red_, nir_);
  print('image_regresion',line);
  var linearRegression = line.reduceRegion({
    reducer: ee.Reducer.linearRegression({
      numX: 1,
      numY: 1
    }),
    geometry: aoi,
    scale: 30,
  });
  print('linearRegression_end',linearRegression);
  var line_end = ee.Image.cat(red_, nir_);
  var pixelVals_ = (line_end).reduceRegion(
      {reducer: ee.Reducer.toList(), geometry: aoi, scale: 30});
  // Get Red and SWIR value lists; to be plotted along x and y axes, respectively.
  // Note that the pixelVals object is defined in the previous code block.
  var x = ee.List(pixelVals_.get('red'));
  var y = ee.List(pixelVals_.get('nir'));
  var chart = ui.Chart.array.values({array: y, axis: 0, xLabels: x}).setOptions({
    title: 'Relationship Among Spectral Bands mean year',
    colors: ['cf513e'],
    hAxis: {
      title: 'RED',
      titleTextStyle: {italic: false, bold: true}
    },
    vAxis: {
      title: 'NIR',
      titleTextStyle: {italic: false, bold: true}
    },
    pointSize: 4,
    dataOpacity: 0.4,
    legend: {position: 'none'},
  });
  print(chart);
  var coefList = ee.Array(linearRegression.get('coefficients')).toList();
  var residuals = ee.Array(linearRegression.get('residuals')).toList().get(0);
  print('coefList',coefList)
  print('Residuals:', residuals);
  // Extract the y-intercept and slope.
  var b0 = ee.List(coefList.get(0)).get(0); // y-intercept
  var Dry = ee.Number(b0); //1.4089//1.581 //ee.Number(b0).values().get(0)); //1.7655//1.764;
  var residual =ee.Number(residuals); // 0.1399//0.1235 //ee.Number(residuals).values().get(0));// 0.0896//0.078;
  var Dry2 = Dry.multiply(Dry);
  var inv_dry = ee.Number(1).divide(Dry2);
  /// Index
  var pdi_mean = (red_).add((nir_).multiply(Dry)).divide(((Dry.multiply(Dry)).add(1)).sqrt()).rename('pdi_mean');
  var pvi_mean= (nir_.subtract(red_.multiply(Dry)).subtract(residual)).divide(((Dry.multiply(Dry)).add(1)).sqrt()).rename('pvi_mean');
  var sm_mean= (nir_.add(red_.divide(Dry)).subtract(residual)).divide(((inv_dry).add(1)).pow(0.5)).rename('sm_mean');
  print('index',pdi_mean,pvi_mean,sm_mean)
  var thermal2=  landsatYEAR_mean.select('B10').median().multiply(1000);
  var min = ee.Number(mean_ndvi.reduceRegion({
                                reducer: ee.Reducer.min(),
                                geometry: aoi,
                                scale: 30,
                                maxPixels: 1e9}).values().get(0));
  var max = ee.Number(mean_ndvi.reduceRegion({
                                  reducer: ee.Reducer.max(),
                                  geometry: aoi,
                                  scale: 30,
                                  maxPixels: 1e9}).values().get(0));
  var fv =(mean_ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV'); 
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM=fv.multiply(a).add(b).rename('EMM');
  var LST2 = thermal2.expression('(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
   'Tb': thermal2.select('B10'),
   'Ep': EM.select('EMM')
  }).rename('LST');
  Map.addLayer(pdi_mean.clip(aoi), {min: 0, max: 0.8, palette:['blue','orange']},'pdi_mean');
  Map.addLayer(sm_mean.clip(aoi), {min: 0, max: 1, palette:['blue','orange']},'sm_mean');
  Map.addLayer(pvi_mean.clip(aoi), {min: -0.1, max:  0.1, palette:['e2e612','20cc0b']},'pvi_mean');
  Map.addLayer(LST2.clip(aoi), {min: 20.569706944223423, max:29.328077233404645, palette: [
  '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
  '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
  '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
  'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
  'ff0000', 'de0101', 'c21301', 'a71001', '911003'
   ]},'LST');
  // norm
  function norma_band(image) {
    var norm_red = (image.select('red')).unitScale(min_red, max_red);
    var norm_nir = (image.select('nir')).unitScale(min_nir,max_nir);
    //var norm_nir = ((image.select('nir').subtract(min_nir)).divide(max_nir.subtract(min_nir))).multiply(ee.Number(3).sqrt().divide(3));
    return image
      .addBands(norm_red.rename('red_norm'))
      .addBands(norm_nir.rename('nir_norm'));
  }
  var landsat_norm = L8.map(norma_band);
  print('landsat_norm',landsat_norm)
  // Add Index
  function addvar(image) {
    var pdi= (image.select('red_norm')).add((image.select('nir_norm')).multiply(Dry)).divide(((Dry.multiply(Dry)).add(1)).sqrt());
    var pvi= (image.select('nir_norm').subtract(image.select('red_norm').multiply(Dry)).subtract(residual)).divide(((Dry.multiply(Dry)).add(1)).sqrt());
    var sm= (image.select('nir_norm').add(image.select('red_norm').divide(Dry)).subtract(residual)).divide(((ee.Number(1)).divide(Dry.multiply(Dry)).add(1)).pow(0.5));
    return image
      .addBands(pdi.rename('pdi'))
      .addBands(pvi.rename('pvi'))
      .addBands(sm.rename('sm'));
  }
  var Landsat_all = landsat_norm.map(addvar);
  var sm_collection = Landsat_all.select('sm');
  print('Landsat_all',Landsat_all)
  //Monthly
  // Calculate monthly max NDVI values
  var start_date = ee.Date("1985-01-01");
  var end_date = ee.Date("2023-01-01");
  var monthly_images = function(IC) {
    // Get number of months in interval
    var n_months = ee.List.sequence(0, end_date.difference(start_date, "month").round().subtract(1));
    // Iterate monthly max over all months in the interval
    var images = n_months.map(function(n) {
      // Get images for given month
      var start = start_date.advance(n, "month");
      var end = start.advance(1, "month");
      var filtered = IC.filterDate(start, end);
      var first = filtered.first();
      var max = filtered.mean();
      return max.set("month", start.get("month"), "year", start.get("year"));
      });
      return ee.ImageCollection.fromImages(images);
  };
  var monthly = monthly_images(Landsat_all.select(['ndvi','nbr','ndii','msi','rvi','gci','bsi','evi2','red','nir','t','constant','red_norm','nir_norm','pdi','pvi','sm']));
  print(monthly)
  // monthly limpio
  var listOfImages = monthly.toList(monthly.size());
  var newList = listOfImages.map(function comprobeBandsNumber(ele){
    var new_list = ee.List([]); 
    var count = ee.Image(ele).bandNames().size();
    var comp = ee.Algorithms.If(count.eq(17), ele, 0);
    new_list = new_list.add(comp);
    return new_list;
  }).flatten();
  //removing zeroes in new list
  newList = newList.removeAll([0]);
  print("new list", newList);
  //creating new collection
  var MIC = ee.ImageCollection(newList);
  print("Collection MIC", MIC);
  var norm_band = function(image, index) {
    var min= ee.Number(image.reduceRegion({
                                      reducer: ee.Reducer.min(),
                                      geometry: aoi,
                                      scale: 30,
                                      maxPixels: 1e9}).values().get(0));
    var max= ee.Number(image.reduceRegion({
                                      reducer: ee.Reducer.max(),
                                      geometry: aoi,
                                      scale: 30,
                                      maxPixels: 1e9}).values().get(0));
    var norm = (image.unitScale(min, max));
    return image
      .addBands(norm.rename(index + '_norm'));
  }
  var LST_norm =  norm_band(LST2,'LST').select('LST_norm');
  var SM_norm = norm_band(sm_mean,'sm_mean').select('sm_mean_norm');
  var PVI_norm = norm_band(pvi_mean,'pvi_mean').select('pvi_mean_norm');
  var part1 = LST_norm.multiply(LST_norm);
  var part2 = SM_norm.multiply(SM_norm);
  var part3 = ee.Image((ee.Number(3).sqrt().divide(3))).subtract(PVI_norm)
  var part4 = LST_norm.multiply(LST_norm)
  var TVMDI2 = (part4.add(part2).add(part3.multiply(part3))).multiply(0.5)
  print('TVMDI2',TVMDI2);
  var min_max_TVMDI = TVMDI2.reduceRegion({
                          reducer: ee.Reducer.minMax(),
                          geometry: geometry,
                          scale: 30
                          });
  var min_TVMDI = min_max_TVMDI.get('LST_norm'+'_min');
  var max_TVMDI = min_max_TVMDI.get('LST_norm'+'_max');
  print('min_TVMDI',min_TVMDI);
  var visPct = TVMDI2.reduceRegion({
    reducer: ee.Reducer.percentile([0,100]).setOutputs(['min','max']),
    geometry: geometry,
    scale: 30, 
    bestEffort: true
    });
  var minMax = ee.Dictionary({
    minVal: visPct.getNumber('LST_norm_min'),
    maxVal: visPct.getNumber('LST_norm_max')
  });
  minMax.evaluate(function(dict) {
    var vizParams = {
    min: dict.minVal, 
    max: dict.maxVal, 
    palette: ['040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
              '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
              '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
              'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
              'ff0000', 'de0101', 'c21301', 'a71001', '911003']
    };
      Map.addLayer(TVMDI2.clip(aoi), vizParams, 'TVMDI');
    });  
  /*
  Map.addLayer(TVMDI2.clip(aoi), {min:0, max:0.57, palette: ['040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
  '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
  '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
  'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
  'ff0000', 'de0101', 'c21301', 'a71001', '911003']},'TVMDI');
  */
  //5- Puntos de entrenamientos.
  var training = TVMDI2.sample({
    region: aoi,
    scale: 30,
    numPixels: 5000
  });
  // 6-Aplicar entrenamiento
  var n_clase = classSelector.getValue();
  var clusterer = ee.Clusterer.wekaKMeans(ee.Number.parse(n_clase)).train(training);
  // 7- Generar imagen clasificada
  var result_after = TVMDI2.cluster(clusterer);
  // 8- Mapear clasificación
  var minMax = ee.Dictionary({
    minVal: 0,
    maxVal: ee.Number(ee.Number.parse(n_clase).subtract(1))
  });
  print(minMax);
  /*
  minMax.evaluate(function(dict) {
  var vizParams = {
    min: dict.minVal, 
    max: dict.maxVal, 
    palette: ['blue','green','red']
  };
    Map.addLayer((result_after).clip(aoi), vizParams, 'Zonas');
  });
  */
  var max_color= ee.Number(ee.Number.parse(n_clase).subtract(1));
  print('max_color',max_color)
  Map.addLayer((result_after).clip(aoi).randomVisualizer(), {}, 'Zonas');
  var vectors = result_after.reduceToVectors({
    geometry: aoi,
    crs: result_after.projection(),
    scale: 30,
    geometryType: 'polygon',
    eightConnected: false,
    labelProperty: 'zone',
    maxPixels: 5000000000
  })
  var vectors_ = ee.FeatureCollection(vectors).union(30);
  var Points = ee.FeatureCollection.randomPoints(vectors_,10);
  //Map.addLayer(improve_total.clip(vector_filter), {min: 0 , max: 1,  palette:['green','yellow','orange','red','purple']},'FGRI')
  /*
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  var final_year = (ee.Number.parse(ee.Date(Date.now()).get('year')).getInfo()) -1
  var chart = ui.Chart.image.seriesByRegion({
                    imageCollection: MIC.filterBounds(aoi).filter(ee.Filter.calendarRange(ee.Number.parse(year_init),final_year, 'year')),
                    regions: Points,
                    reducer: ee.Reducer.mean(),
                    band: 'sm',
                    scale: 100,
                    xProperty: 'system:time_start',
                    seriesProperty: 'Damage'
                  })
                  .setOptions({
                    titlePostion: 'Time Series',
                    colors: ['3eff0e', 'ffff00', 'ff0000'],
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Soil Moisture'}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
  */
  function downloadImg() {
    var downloadArgs = {
      name: 'TVMDI',
      crs: 'EPSG:4326',
      scale: 30,
      region: aoi
    };
    var downloadArgs2 = {
      name: 'Zones',
      crs: 'EPSG:4326',
      scale: 30,
      region: aoi
    };
    var url = TVMDI2.getDownloadURL(downloadArgs);
    var url2 = result_after.getDownloadURL(downloadArgs2);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true})
    urlLabel2.setUrl(url2);
    urlLabel2.style().set({shown: true});
  }
  downloadButton.onClick(downloadImg)
}
//button.onClick(loadComposite)
var downloadButton = ui.Button('Download Result')
var urlLabel = ui.Label('Download TDVMI', {shown: false});
var urlLabel2 = ui.Label('Download Zones', {shown: false});
var panel_donwload = ui.Panel([downloadButton, urlLabel,urlLabel2]);
//////////////////
controlPanel.add(datesPanel1);
controlPanel.add(datesPanel3);
controlPanel.add(Resultlabel);
controlPanel.add(panel_donwload);
panel.add(controlPanel);
//panel.add(extCheck);
//titlePanel.add(panel)
//////////////
//ui.root.insert(1,titlePanel);
ui.root.insert(1,panel);
drawingTools.onDraw(ui.util.debounce(loadComposite, 500));
drawingTools.onEdit(ui.util.debounce(loadComposite, 500));