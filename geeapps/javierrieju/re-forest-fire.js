var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
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
  'Low',
  'Medium',
  'High',];
// set position of panel
var legend1 = ui.Panel({
  style: {
    position: 'top-left',
    padding: '4px 10px'
  }
});
// Create legend title
var legendTitle1 = ui.Label({
  value: 'dNBR',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 2px 0',
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
var palette1 =['3eff0e', 'ffff00', 'ff0000'];
// name of the legend
var names1 = ['Low',
  'Medium',
  'High'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend1.add(makeRow(palette1[i], names1[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend1);
/////////////////////////////////////////////////////////////////////////////////////////////////////
var Etiquetas2 = ['0','0.25','0.5','0.75','1'];
// set position of panel
var legend2 = ui.Panel({
  style: {
    position: 'top-left',
    padding: '4px 10px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'FGRI',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend2.add(legendTitle2);
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
var palette2 =['800080','ff0000','ffa500','ffff00','008000'];
// name of the legend
var names2 = ['0','0.25','0.5','0.75','1'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend2.add(makeRow(palette2[i], names2[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend2);
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
var Etiquetas3 = ['shady_Low','shady_medium','shady_high','sunny_Low','sunny_medium','sunny_high'];
// set position of panel
var legend3 = ui.Panel({
  style: {
    position: 'top-left',
    padding: '4px 10px'
  }
});
// Create legend title
var legendTitle3 = ui.Label({
  value: 'Aspect/Slope',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend3.add(legendTitle3);
//  Palette with the colors
var palette3 =['85b6ff', '4e95ff', '065eff', 'ffb66a', 'ff7c3d', 'ff3406'];
// name of the legend
var names3 = ['shady_Low','shady_medium','shady_high','sunny_Low','sunny_medium','sunny_high'];
// Add color and and names
for (var i = 0; i < 6; i++) {
  legend3.add(makeRow(palette3[i], names3[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend3);
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: true}
});
Map.add(chartPanel);
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
var header = ui.Label('Burnt Areas Detection & Evolution (BADE)', 
{fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'This tool allows the detection of the perimeter of the burned area, the severity of the fire and the evolution of the vegetation up to 10 years after the fire. As results you can download the fire severity classes and the Fire Greenness Relisience Index (FGRI).',
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
var roiSectionLabel = ui.Label('3. Define Fire Area',{fontWeight: 'bold'});
var roilabel = ui.Label('Edit a geometry (points or polygons) with the tools at the top left of the map of the fire area.');
var indexSectionLabel = ui.Label('2. Select Index to view its graph ',{fontWeight: 'bold'});
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px'}
});
var ColeccionSectionLabel = ui.Label('0. Colecction Select',{fontWeight: 'bold'});
var yearSectionLabel = ui.Label('1. Define Fire date',{fontWeight: 'bold'});
var startYearLabel = ui.Label('Fire Year');
var startYearslider = ui.Slider({min:1984, max:y, value:2012, step:1}).style().set('stretch', 'horizontal');
var endDayLabel = ui.Label('Month lapso:');
var endDayBox = ui.Textbox({value:3});
endDayBox.style().set('stretch', 'horizontal');
var button = ui.Button('dNBR');
var yearSelector = ui.Select({
  placeholder: 'please wait..',
  })
var monthSelector = ui.Select({
  placeholder: 'please wait..',
  })
var daySelector = ui.Select({
  placeholder: 'please wait..',
  })
var lapsoSelector = ui.Select({
  placeholder: 'please wait..',
  })
var indexSelector = ui.Select({
  placeholder: 'please wait..',
  })
var colecctionSelector = ui.Select({
  placeholder: 'please wait..',
  })
var datesPanel1 = ui.Panel(
  [ ColeccionSectionLabel,colecctionSelector,yearSectionLabel,yearSelector,monthSelector,daySelector,lapsoSelector
    ]
);
var datesPanel2 = ui.Panel(
  [indexSectionLabel, indexSelector
    ]
);
var datesPanel3 = ui.Panel(
  [ roiSectionLabel,
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
var years = ee.List.sequence(1984, 2022)
var months = ee.List.sequence(1, 12)
var days = ee.List.sequence(1, 31)
var lapso = ee.List.sequence(1, 12)
var indexes = ee.List(['nbr','ndvi','ndii','rvi','msi','rvi','gci','evi2'])
var colecciones = ee.List(['Landsat','Sentinel'])
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d')
})
var dayStrings = days.map(function(day){
  return ee.Number(day).format('%02d')
})
var lapsoStrings = lapso.map(function(lapso_){
  return ee.Number(lapso_).format('%02d')
})
var indexStrings = indexes.map(function(index){
  return ee.String(index)
})
var CollectionStrings = colecciones.map(function(coleccion){
  return ee.String(coleccion)
})
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('Select a year')
})
monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList)
  monthSelector.setPlaceholder('Select a month')
})
dayStrings.evaluate(function(dayList) {
  daySelector.items().reset(dayList)
  daySelector.setPlaceholder('Select a day')
})
lapsoStrings.evaluate(function(lapsoStrings) {
  lapsoSelector.items().reset(lapsoStrings)
  lapsoSelector.setPlaceholder('Lapso range')
})
indexStrings.evaluate(function(indexStrings) {
  indexSelector.items().reset(indexStrings)
  indexSelector.setPlaceholder('Select index')
})
CollectionStrings.evaluate(function(CollectionStrings) {
  colecctionSelector.items().reset(CollectionStrings)
  colecctionSelector.setPlaceholder('Select index')
})
//////////////
var loadComposite = function() {
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  //Colección Landsat
  var params2 = require('users/javierrieju/aprendizaje:Landsat_collection');
  var landsat = params2.landsat
  var sentinel = params2.S2
  if (colecctionSelector.getValue() == 'Landsat') {
    var coleccion = landsat
  } else {
    var coleccion = sentinel
  }
  print(coleccion.first())
  //Dates
  var year = yearSelector.getValue()
  var month = monthSelector.getValue()
  var day= daySelector.getValue()
  var ampliation_month = lapsoSelector.getValue()
  var index = indexSelector.getValue()
  var Fire_date = ee.Date.fromYMD(ee.Number.parse(year), ee.Number.parse(month), ee.Number.parse(day))
  var ampliation_month_ = 0 - ampliation_month
  var init_pre = Fire_date.advance(ampliation_month_,'month')
  var end_pre = Fire_date.advance(-3, 'day')
  var init_post = Fire_date.advance(3, 'day')
  var end_post = Fire_date.advance(ee.Number.parse(ampliation_month), 'month')
  var col3 = coleccion.filterBounds(aoi).filter(ee.Filter.date(init_pre,end_pre)).select('nbr')
  var col4 = coleccion.filterBounds(aoi).filter(ee.Filter.date(init_post,end_post)).select('nbr')
  var juny1 = col3.median()
  var july1 = col4.median()
  var dnbr = ee.Image(juny1.subtract(july1))
  var mask = dnbr.updateMask(dnbr.gte(0.1));
  var color = {min: -0.3, max: 1.0, palette:['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']}
  var layerName = 'dNBR ' + year + '-' + month + '-' + day + ' (Lapso:' + ampliation_month + ')'
  var banda = mask.expression(
    'N/N', {
      'N': mask.select('nbr')
  });
  banda = banda.toInt()
  var vectors_ = banda.reduceToVectors({
    geometry: aoi,
    crs: mask.projection(),
    scale: 30,
    geometryType: 'polygon',
    eightConnected: false,
    labelProperty: 'zone',
    maxPixels: 5000000000
  })
  //función de cálculo de área
  var addProperty = function(feature) {
    return feature
    .set({areaHa: feature.geometry().area(10).divide(100 * 100)});
  }
  // aplicar cálculo de área y filtrar superficies pequeñas
  var vectors = vectors_.map(addProperty)
  var vector_filter = vectors.filterMetadata('areaHa', 'greater_than', 100)
  var display = ee.Image(0).updateMask(0).paint(vector_filter, '000000', 3)
  var layerName3 = 'Burned_Area ' + year + '-' + month + '-' + day + ' (Lapso:' + ampliation_month + ')'
  var mask1 = mask.updateMask(mask.lte(0.25))
  var bandabajo = mask1.expression(
      'N/N', {
        'N': mask1.select('nbr')
  });
  bandabajo = bandabajo.toInt()
  var vectorsbajo = bandabajo.reduceToVectors({
  geometry: aoi,
  crs: mask.projection(),
  scale: 30,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'id',
  maxPixels: 5000000000
  });
  var mask22 = dnbr.updateMask(dnbr.gte(0.25))
  var mask2 = mask22.updateMask(mask22.lte(0.50))
  var bandamedio = mask2.expression(
      '(N/N)*2', {
        'N': mask2.select('nbr')
  });
  bandamedio = bandamedio.toInt()
  var vectorsmedio = bandamedio.reduceToVectors({
  geometry: aoi,
  crs: mask.projection(),
  scale: 30,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  maxPixels: 5000000000
  });
  var mask3 = dnbr.updateMask(dnbr.gte(0.5))
  var bandaalto = mask3.expression(
      '(N/N)*3', {
        'N': mask3.select('nbr')
  });
  bandaalto = bandaalto.toInt()
  var vectorsalto = bandaalto.reduceToVectors({
  geometry: aoi,
  crs: mask.projection(),
  scale: 30,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  maxPixels: 5000000000
  });
  var NBRR2 = ee.ImageCollection([bandabajo,bandamedio,bandaalto]).mosaic()
  var layerName2 = 'Class_dNBR ' + year + '-' + month + '-' + day + ' (Lapso:' + ampliation_month + ')'
  Map.addLayer(mask.clip(vector_filter), color, layerName)
  Map.addLayer(display, {palette: '000000'}, layerName3)
  Map.addLayer(NBRR2.clip(vector_filter), {min:1, max:3, palette:['green','yellow','red']}, layerName2)
  var vectors_bajo = ee.FeatureCollection(vectorsbajo);
  var vectors_medio = ee.FeatureCollection(vectorsmedio);
  var vectors_alto = ee.FeatureCollection(vectorsalto);
  var nbr_bajo = vectors_bajo.union(30);
  var nbr_medio = vectors_medio.union(30);
  var nbr_alto = vectors_alto.union(30);
  //add property before of merge all feature
  var addPropertyLow = function(feature) {
    return feature
    .set('Damage','low')
    .set('Class',1);
  };
  var addPropertyMedium = function(feature) {
    return feature
    .set('Damage','medium')
    .set('Class',2);
  };
  var addPropertyHigh = function(feature) {
    return feature
    .set('Damage','high')
    .set('Class',3);
  };
  var nbrBajo = nbr_bajo.map(addPropertyLow)
  var nbrMedio = nbr_medio.map(addPropertyMedium)
  var nbrHigh = nbr_alto.map(addPropertyHigh)
  var PointsLow = ee.FeatureCollection.randomPoints(nbr_bajo,1).map(addPropertyLow);
  var PointsMedium = ee.FeatureCollection.randomPoints(nbr_medio,1).map(addPropertyMedium);
  var PointsHigh = ee.FeatureCollection.randomPoints(nbr_alto,1).map(addPropertyHigh);
  var Points = PointsLow.merge(PointsMedium).merge(PointsHigh)
  var zone_nbr = nbrBajo.merge(nbrMedio).merge(nbrHigh)
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var init_year= 1984
  var end_year = (ee.Number.parse(ee.Date(Date.now()).get('year')).getInfo()) -1
  var year_fire = ee.Number.parse(year).getInfo()
  var year_before_fire = year_fire - 1
  var year_3_fire = year_fire - 3
  var year_after_fire = year_fire + 1
  var year_before_fire_init = year_before_fire - 2
  var count_year = (end_year - year_after_fire)*(4)
  if (count_year >= 36){
    var change_years = 36}
  else{
    var change_years = count_year
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var winter = coleccion.filterBounds(aoi).filter(ee.Filter.dayOfYear(1, 81))
  var spring = coleccion.filterBounds(aoi).filter(ee.Filter.dayOfYear(81,170))
  var summer = coleccion.filterBounds(aoi).filter(ee.Filter.dayOfYear(171,260))
  var autumn = coleccion.filterBounds(aoi).filter(ee.Filter.dayOfYear(260,350))
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var YEAR_before =  ee.ImageCollection(ee.List.sequence(year_before_fire_init, year_before_fire).map(function (year){
  var season = 'winter';
  function renamewinter(image) {
    var bands = [index];
    var new_bands = [index + season];
    return image.select(bands).rename(new_bands);
  }
  var winter_year = winter.select(index).map(renamewinter)
                .filter(ee.Filter.calendarRange(year, year,'year'))
                .mean() 
                .set({year: year,  season: 'winter'});
  var season2 = 'autumn';
  function renameautumn(image) {
    var bands = [index];
    var new_bands = [index + season2];
    return image.select(bands).rename(new_bands);
  }
  var autumn_year = autumn.select(index).map(renameautumn)
                .filter(ee.Filter.calendarRange(year, year,'year'))
                .mean() 
                .set({year: year,  season: 'autumn'});         
  var season3 = 'spring';
  function renamespring(image) {
    var bands = [index];
    var new_bands = [index + season3];
    return image.select(bands).rename(new_bands);
  }
  var spring_year = spring.select(index).map(renamespring)
                .filter(ee.Filter.calendarRange(year, year,'year'))
                .mean() 
                .set({year: year,  season: 'spring'});         
  var season4 = 'summer';
  function renamesummer(image) {
    var bands = [index];
    var new_bands = [index + season4];
    return image.select(bands).rename(new_bands);
  }
  var summer_year = summer.select(index).map(renamesummer)
                .filter(ee.Filter.calendarRange(year, year,'year'))
                .mean() 
                .set({year: year,  season: 'summer'});  
  return  winter_year.addBands(autumn_year).addBands(spring_year).addBands(summer_year);
  }));
  var mean_before= YEAR_before.mean();
  var YEAR_after =  ee.ImageCollection(ee.List.sequence(year_after_fire, end_year).map(function (year){
    var season = 'winter';
    function renamewinter(image) {
      var bands = [index];
      var new_bands = [index + season];
      return image.select(bands).rename(new_bands);
    }
    var winter_year = winter.select(index).map(renamewinter)
                  .filter(ee.Filter.calendarRange(year, year,'year'))
                  .mean() 
                  .set({year: year,  season: 'winter', date: ee.Date.fromYMD(year,1,1)});
    var season2 = 'autumn';
    function renameautumn(image) {
      var bands = [index];
      var new_bands = [index + season2];
      return image.select(bands).rename(new_bands);
    }
    var autumn_year = autumn.select(index).map(renameautumn)
                  .filter(ee.Filter.calendarRange(year, year,'year'))
                  .mean() 
                  .set({year: year,  season: 'autumn',date: ee.Date.fromYMD(year,10,1)});         
    var season3 = 'spring';
    function renamespring(image) {
      var bands = [index];
      var new_bands = [index + season3];
      return image.select(bands).rename(new_bands);
    }
    var spring_year = spring.select(index).map(renamespring)
                  .filter(ee.Filter.calendarRange(year, year,'year'))
                  .mean() 
                  .set({year: year,  season: 'spring',date: ee.Date.fromYMD(year,4,1)});         
    var season4 = 'summer';
    function renamesummer(image) {
      var bands = [index];
      var new_bands = [index + season4];
      return image.select(bands).rename(new_bands);
    }
    var summer_year = summer.select(index).map(renamesummer)
                  .filter(ee.Filter.calendarRange(year, year,'year'))
                  .mean() 
                  .set({year: year,  season: 'summer',date:  ee.Date.fromYMD(year,7,1)});  
    return  winter_year.addBands(autumn_year).addBands(spring_year).addBands(summer_year);
  }))
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var year_select = year_after_fire + 1
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select)
  var mean_year_specific = year_above.mean()
  if (year_select < end_year) {
  var band_names = mean_year_specific.bandNames();
  var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
  if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve1w = (delta).updateMask(delta.gte(0.0));
    var winter1 = improve1w.expression(
        'N/N', {
          'N': improve1w.select(index+'winter')
    });
    winter1 = winter1.toInt().unmask(ee.Image.constant(0));
  }else {var winter1 =ee.Image.constant(0);}
  } else {
    var winter1 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
      var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve1p = (delta).updateMask(delta.gte(0.0));
    var spring1 = improve1p.expression(
        'N/N', {
          'N': improve1p.select(index+'spring')
    });
    spring1 = spring1.toInt().unmask(ee.Image.constant(0));
    }else {var spring1 =ee.Image.constant(0);}
    } else {
      var spring1 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve1s = (delta).updateMask(delta.gte(0.0));
    var summer1 = improve1s.expression(
        'N/N', {
          'N': improve1s.select(index+'summer')
    });
    summer1 = summer1.toInt().unmask(ee.Image.constant(0));
    } else {var summer1 =ee.Image.constant(0);}
    } else {
      var summer1 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve1a = (delta).updateMask(delta.gte(0.0));
    var autumn1 = improve1a.expression(
        'N/N', {
          'N': improve1a.select(index+'autumn')
    });
    autumn1 = autumn1.toInt().unmask(ee.Image.constant(0));
    } else {var summer1 =ee.Image.constant(0);}
    } else {
      var autumn1 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 2
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve2w = (delta).updateMask(delta.gte(0.0));
    var winter2 = improve2w.expression(
        'N/N', {
          'N': improve2w.select(index+'winter')
    });
    winter2 = winter2.toInt().unmask(ee.Image.constant(0));
    } else {var winter2 =ee.Image.constant(0);}
    } else {
      var winter2 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve2p = (delta).updateMask(delta.gte(0.0));
    var spring2 = improve2p.expression(
        'N/N', {
          'N': improve2p.select(index+'spring')
    });
    spring2 = spring2.toInt().unmask(ee.Image.constant(0));
    } else {var spring2 =ee.Image.constant(0);}
    } else {
      var spring2 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve2s = (delta).updateMask(delta.gte(0.0));
    var summer2 = improve2s.expression(
        'N/N', {
          'N': improve2s.select(index+'summer')
    });
    summer2 = summer2.toInt().unmask(ee.Image.constant(0));
    } else {var summer2 =ee.Image.constant(0);}
    } else {
      var summer2 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve2a = (delta).updateMask(delta.gte(0.0));
    var autumn2 = improve2a.expression(
        'N/N', {
          'N': improve2a.select(index+'autumn')
    });
    autumn2 = autumn2.toInt().unmask(ee.Image.constant(0));
    } else {var autumn2 =ee.Image.constant(0);}
    } else { 
      var autumn2 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 3
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve3w = (delta).updateMask(delta.gte(0.0));
    var winter3 = improve3w.expression(
        'N/N', {
          'N': improve3w.select(index+'winter')
    });
    winter3 = winter3.toInt().unmask(ee.Image.constant(0));
    } else {var winter3 =ee.Image.constant(0);}
    } else {
      var winter3 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve3p = (delta).updateMask(delta.gte(0.0));
    var spring3 = improve3p.expression(
        'N/N', {
          'N': improve3p.select(index+'spring')
    });
    spring3 = spring3.toInt().unmask(ee.Image.constant(0));
    } else {var spring3 =ee.Image.constant(0);}
    } else {
      var spring3 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve3s = (delta).updateMask(delta.gte(0.0));
    var summer3 = improve3s.expression(
        'N/N', {
          'N': improve3s.select(index+'summer')
    });
    summer3 = summer3.toInt().unmask(ee.Image.constant(0));
    } else {var summer3 =ee.Image.constant(0);}
    } else {
      var summer3 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve3a = (delta).updateMask(delta.gte(0.0));
    var autumn3 = improve2a.expression(
        'N/N', {
          'N': improve3a.select(index+'autumn')
    });
    autumn3 = autumn3.toInt().unmask(ee.Image.constant(0));
    } else {var autumn3 =ee.Image.constant(0);}
    } else {
      var autumn3 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 4
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve4w = (delta).updateMask(delta.gte(0.0));
    var winter4 = improve4w.expression(
        'N/N', {
          'N': improve4w.select(index+'winter')
    });
    winter4 = winter4.toInt().unmask(ee.Image.constant(0));
    } else {var winter4 =ee.Image.constant(0);}
    } else {
      var winter4 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve4p = (delta).updateMask(delta.gte(0.0));
    var spring4 = improve4p.expression(
        'N/N', {
          'N': improve4p.select(index+'spring')
    });
    spring4 = spring4.toInt().unmask(ee.Image.constant(0));
    } else {var spring4 =ee.Image.constant(0);}
    } else {
      var spring4 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve4s = (delta).updateMask(delta.gte(0.0));
    var summer4 = improve4s.expression(
        'N/N', {
          'N': improve4s.select(index+'summer')
    });
    summer4 = summer4.toInt().unmask(ee.Image.constant(0));
    } else {var summer4 =ee.Image.constant(0);}
    } else {
      var summer4 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve4a = (delta).updateMask(delta.gte(0.0));
    var autumn4 = improve2a.expression(
        'N/N', {
          'N': improve4a.select(index+'autumn')
    });
    autumn4 = autumn4.toInt().unmask(ee.Image.constant(0));
    } else {var autumn4 =ee.Image.constant(0);}
    } else {
      var autumn4 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 5
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve5w = (delta).updateMask(delta.gte(0.0));
    var winter5 = improve5w.expression(
        'N/N', {
          'N': improve5w.select(index+'winter')
    });
    winter5 = winter5.toInt().unmask(ee.Image.constant(0));
    } else {var winter5 =ee.Image.constant(0);}
    } else {
      var winter5 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve5p = (delta).updateMask(delta.gte(0.0));
    var spring5 = improve5p.expression(
        'N/N', {
          'N': improve5p.select(index+'spring')
    });
    spring5 = spring5.toInt().unmask(ee.Image.constant(0));
    } else {var spring5 =ee.Image.constant(0);}
    } else {
      var spring5 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve5s = (delta).updateMask(delta.gte(0.0));
    var summer5 = improve5s.expression(
        'N/N', {
          'N': improve5s.select(index+'summer')
    });
    summer5 = summer5.toInt().unmask(ee.Image.constant(0));
    } else {var summer5 =ee.Image.constant(0);}
    } else {
      var summer5 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve5a = (delta).updateMask(delta.gte(0.0));
    var autumn5 = improve2a.expression(
        'N/N', {
          'N': improve5a.select(index+'autumn')
    });
    autumn5 = autumn5.toInt().unmask(ee.Image.constant(0));
    } else {var autumn5 =ee.Image.constant(0);}
    } else {
      var autumn5 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 6
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve6w = (delta).updateMask(delta.gte(0.0));
    var winter6 = improve6w.expression(
        'N/N', {
          'N': improve6w.select(index+'winter')
    });
    winter6 = winter6.toInt().unmask(ee.Image.constant(0));
    } else {var winter6 =ee.Image.constant(0);}
    } else {
      var winter6 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve6p = (delta).updateMask(delta.gte(0.0));
    var spring6 = improve6p.expression(
        'N/N', {
          'N': improve6p.select(index+'spring')
    });
    spring6 = spring6.toInt().unmask(ee.Image.constant(0));
    } else {var spring6 =ee.Image.constant(0);}
    } else {
      var spring6 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve6s = (delta).updateMask(delta.gte(0.0));
    var summer6 = improve6s.expression(
        'N/N', {
          'N': improve6s.select(index+'summer')
    });
    summer6 = summer6.toInt().unmask(ee.Image.constant(0));
    } else {var summer6 =ee.Image.constant(0);}
    } else {
      var summer6 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve6a = (delta).updateMask(delta.gte(0.0));
    var autumn6 = improve2a.expression(
        'N/N', {
          'N': improve6a.select(index+'autumn')
    });
    autumn6 = autumn6.toInt().unmask(ee.Image.constant(0));
    } else {var autumn6 =ee.Image.constant(0);}
    } else {
      var autumn6 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 7
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve7w = (delta).updateMask(delta.gte(0.0));
    var winter7 = improve7w.expression(
        'N/N', {
          'N': improve7w.select(index+'winter')
    });
    winter7 = winter7.toInt().unmask(ee.Image.constant(0));
    } else {var winter7 =ee.Image.constant(0);}
    } else {
      var winter7 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve7p = (delta).updateMask(delta.gte(0.0));
    var spring7 = improve7p.expression(
        'N/N', {
          'N': improve7p.select(index+'spring')
    });
    spring7 = spring7.toInt().unmask(ee.Image.constant(0));
    } else {var spring7 =ee.Image.constant(0);}
    } else {
      var spring7 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve7s = (delta).updateMask(delta.gte(0.0));
    var summer7 = improve7s.expression(
        'N/N', {
          'N': improve7s.select(index+'summer')
    });
    summer7 = summer7.toInt().unmask(ee.Image.constant(0));
    } else {var summer7 =ee.Image.constant(0);}
    } else {
      var summer7 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve7a = (delta).updateMask(delta.gte(0.0));
    var autumn7 = improve2a.expression(
        'N/N', {
          'N': improve7a.select(index+'autumn')
    });
    autumn7 = autumn7.toInt().unmask(ee.Image.constant(0));
    } else {var autumn7 =ee.Image.constant(0);}
    } else {
      var autumn7 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 8
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve8w = (delta).updateMask(delta.gte(0.0));
    var winter8 = improve8w.expression(
        'N/N', {
          'N': improve8w.select(index+'winter')
    });
    winter8 = winter8.toInt().unmask(ee.Image.constant(0));
    } else {var winter8 =ee.Image.constant(0);}
    } else {
      var winter8 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve8p = (delta).updateMask(delta.gte(0.0));
    var spring8 = improve8p.expression(
        'N/N', {
          'N': improve8p.select(index+'spring')
    });
    spring8 = spring8.toInt().unmask(ee.Image.constant(0));
    } else {var spring8 =ee.Image.constant(0);}
    } else {
      var spring8 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve8s = (delta).updateMask(delta.gte(0.0));
    var summer8 = improve8s.expression(
        'N/N', {
          'N': improve8s.select(index+'summer')
    });
    summer8 = summer8.toInt().unmask(ee.Image.constant(0));
    } else {var summer8 =ee.Image.constant(0);}
    } else {
      var summer8 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve8a = (delta).updateMask(delta.gte(0.0));
    var autumn8 = improve2a.expression(
        'N/N', {
          'N': improve8a.select(index+'autumn')
    });
    autumn8 = autumn8.toInt().unmask(ee.Image.constant(0));
    } else {var autumn8 =ee.Image.constant(0);}
    } else {
      var autumn8 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 9
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve9w = (delta).updateMask(delta.gte(0.0));
    var winter9 = improve9w.expression(
        'N/N', {
          'N': improve9w.select(index+'winter')
    });
    winter9 = winter9.toInt().unmask(ee.Image.constant(0));
    } else {var winter9 =ee.Image.constant(0);}
    } else {
      var winter9 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve9p = (delta).updateMask(delta.gte(0.0));
    var spring9 = improve9p.expression(
        'N/N', {
          'N': improve9p.select(index+'spring')
    });
    spring9 = spring9.toInt().unmask(ee.Image.constant(0));
    } else {var spring9 =ee.Image.constant(0);}
    } else {
      var spring9 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve9s = (delta).updateMask(delta.gte(0.0));
    var summer9 = improve9s.expression(
        'N/N', {
          'N': improve9s.select(index+'summer')
    });
    summer9 = summer9.toInt().unmask(ee.Image.constant(0));
    } else {var summer9 =ee.Image.constant(0);}
    } else {
      var summer9 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve9a = (delta).updateMask(delta.gte(0.0));
    var autumn9 = improve2a.expression(
        'N/N', {
          'N': improve9a.select(index+'autumn')
    });
    autumn9 = autumn9.toInt().unmask(ee.Image.constant(0));
    } else {var autumn9 =ee.Image.constant(0);}
    } else {
      var autumn9 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 10
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve10w = (delta).updateMask(delta.gte(0.0));
    var winter10 = improve10w.expression(
        'N/N', {
          'N': improve10w.select(index+'winter')
    });
    winter10 = winter10.toInt().unmask(ee.Image.constant(0));
    } else {var winter10 =ee.Image.constant(0);}
    } else {
      var winter10 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve10p = (delta).updateMask(delta.gte(0.0));
    var spring10 = improve10p.expression(
        'N/N', {
          'N': improve10p.select(index+'spring')
    });
    spring10 = spring10.toInt().unmask(ee.Image.constant(0));
    } else {var spring10 =ee.Image.constant(0);}
    } else {
      var spring10 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve10s = (delta).updateMask(delta.gte(0.0));
    var summer10 = improve10s.expression(
        'N/N', {
          'N': improve10s.select(index+'summer')
    });
    summer10 = summer10.toInt().unmask(ee.Image.constant(0));
    } else {var summer10 =ee.Image.constant(0);}
    } else {
      var summer10 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 10, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve10a = (delta).updateMask(delta.gte(0.0));
    var autumn10 = improve2a.expression(
        'N/N', {
          'N': improve10a.select(index+'autumn')
    });
    autumn10 = autumn10.toInt().unmask(ee.Image.constant(0));
    } else {var autumn10 =ee.Image.constant(0);}
    } else {
      var autumn10 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 11
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 11, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve11w = (delta).updateMask(delta.gte(0.0));
    var winter11 = improve11w.expression(
        'N/N', {
          'N': improve11w.select(index+'winter')
    });
    winter11 = winter11.toInt().unmask(ee.Image.constant(0));
    } else {var winter11 =ee.Image.constant(0);}
    } else {
      var winter11 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 11, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve11p = (delta).updateMask(delta.gte(0.0));
    var spring11 = improve11p.expression(
        'N/N', {
          'N': improve11p.select(index+'spring')
    });
    spring11 = spring11.toInt().unmask(ee.Image.constant(0));
    } else {var spring11 =ee.Image.constant(0);}
    } else {
      var spring11 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 11, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve11s = (delta).updateMask(delta.gte(0.0));
    var summer11 = improve11s.expression(
        'N/N', {
          'N': improve11s.select(index+'summer')
    });
    summer11 = summer11.toInt().unmask(ee.Image.constant(0));
    } else {var summer11 =ee.Image.constant(0);}
    } else {
      var summer11 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 11, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve11a = (delta).updateMask(delta.gte(0.0));
    var autumn11 = improve2a.expression(
        'N/N', {
          'N': improve11a.select(index+'autumn')
    });
    autumn11 = autumn11.toInt().unmask(ee.Image.constant(0));
    } else {var autumn11 =ee.Image.constant(0);}
    } else {
      var autumn11 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 12
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 12, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve12w = (delta).updateMask(delta.gte(0.0));
    var winter12 = improve12w.expression(
        'N/N', {
          'N': improve12w.select(index+'winter')
    });
    winter12 = winter12.toInt().unmask(ee.Image.constant(0));
    } else {var winter12 =ee.Image.constant(0);}
    } else {
      var winter12 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 12, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve12p = (delta).updateMask(delta.gte(0.0));
    var spring12 = improve12p.expression(
        'N/N', {
          'N': improve12p.select(index+'spring')
    });
    spring12 = spring12.toInt().unmask(ee.Image.constant(0));
    } else {var spring12 =ee.Image.constant(0);}
    } else {
      var spring12 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 12, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve12s = (delta).updateMask(delta.gte(0.0));
    var summer12 = improve12s.expression(
        'N/N', {
          'N': improve12s.select(index+'summer')
    });
    summer12 = summer12.toInt().unmask(ee.Image.constant(0));
    } else {var summer12 =ee.Image.constant(0);}
    } else {
      var summer12 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 12, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve12a = (delta).updateMask(delta.gte(0.0));
    var autumn12 = improve2a.expression(
        'N/N', {
          'N': improve12a.select(index+'autumn')
    });
    autumn12 = autumn12.toInt().unmask(ee.Image.constant(0));
    } else {var autumn12 =ee.Image.constant(0);}
    } else {
      var autumn12 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 13
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 13, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve13w = (delta).updateMask(delta.gte(0.0));
    var winter13 = improve13w.expression(
        'N/N', {
          'N': improve13w.select(index+'winter')
    });
    winter13 = winter13.toInt().unmask(ee.Image.constant(0));
    } else {var winter13 =ee.Image.constant(0);}
    } else {
      var winter13 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 13, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve13p = (delta).updateMask(delta.gte(0.0));
    var spring13 = improve13p.expression(
        'N/N', {
          'N': improve13p.select(index+'spring')
    });
    spring13 = spring13.toInt().unmask(ee.Image.constant(0));
    } else {var spring13 =ee.Image.constant(0);}
    } else {
      var spring13 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 13, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve13s = (delta).updateMask(delta.gte(0.0));
    var summer13 = improve13s.expression(
        'N/N', {
          'N': improve13s.select(index+'summer')
    });
    summer13 = summer13.toInt().unmask(ee.Image.constant(0));
    } else {var summer13 =ee.Image.constant(0);}
    } else {
      var summer13 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 13, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve13a = (delta).updateMask(delta.gte(0.0));
    var autumn13 = improve2a.expression(
        'N/N', {
          'N': improve13a.select(index+'autumn')
    });
    autumn13 = autumn13.toInt().unmask(ee.Image.constant(0));
    } else {var autumn13 =ee.Image.constant(0);}
    } else {
      var autumn13 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 14
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 14, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve14w = (delta).updateMask(delta.gte(0.0));
    var winter14 = improve14w.expression(
        'N/N', {
          'N': improve14w.select(index+'winter')
    });
    winter14 = winter14.toInt().unmask(ee.Image.constant(0));
    } else {var winter14 =ee.Image.constant(0);}
    } else {
      var winter14 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 14, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve14p = (delta).updateMask(delta.gte(0.0));
    var spring14 = improve14p.expression(
        'N/N', {
          'N': improve14p.select(index+'spring')
    });
    spring14 = spring14.toInt().unmask(ee.Image.constant(0));
    } else {var spring14 =ee.Image.constant(0);}
    } else {
      var spring14 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 14, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve14s = (delta).updateMask(delta.gte(0.0));
    var summer14 = improve14s.expression(
        'N/N', {
          'N': improve14s.select(index+'summer')
    });
    summer14 = summer14.toInt().unmask(ee.Image.constant(0));
    } else {var summer14 =ee.Image.constant(0);}
    } else {
      var summer14 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 14, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve14a = (delta).updateMask(delta.gte(0.0));
    var autumn14 = improve2a.expression(
        'N/N', {
          'N': improve14a.select(index+'autumn')
    });
    autumn14 = autumn14.toInt().unmask(ee.Image.constant(0));
    } else {var autumn14 =ee.Image.constant(0);}
    } else {
      var autumn14 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 15
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 15, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve15w = (delta).updateMask(delta.gte(0.0));
    var winter15 = improve15w.expression(
        'N/N', {
          'N': improve15w.select(index+'winter')
    });
    winter15 = winter15.toInt().unmask(ee.Image.constant(0));
    } else {var winter15 =ee.Image.constant(0);}
    } else {
      var winter15 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 15, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve15p = (delta).updateMask(delta.gte(0.0));
    var spring15 = improve15p.expression(
        'N/N', {
          'N': improve15p.select(index+'spring')
    });
    spring15 = spring15.toInt().unmask(ee.Image.constant(0));
    } else {var spring15 =ee.Image.constant(0);}
    } else {
      var spring15 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 15, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve15s = (delta).updateMask(delta.gte(0.0));
    var summer15 = improve15s.expression(
        'N/N', {
          'N': improve15s.select(index+'summer')
    });
    summer15 = summer15.toInt().unmask(ee.Image.constant(0));
    } else {var summer15 =ee.Image.constant(0);}
    } else {
      var summer15 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 15, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve15a = (delta).updateMask(delta.gte(0.0));
    var autumn15 = improve2a.expression(
        'N/N', {
          'N': improve15a.select(index+'autumn')
    });
    autumn15 = autumn15.toInt().unmask(ee.Image.constant(0));
    } else {var autumn15 =ee.Image.constant(0);}
    } else {
      var autumn15 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 16
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 16, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve16w = (delta).updateMask(delta.gte(0.0));
    var winter16 = improve16w.expression(
        'N/N', {
          'N': improve16w.select(index+'winter')
    });
    winter16 = winter16.toInt().unmask(ee.Image.constant(0));
    } else {var winter16 =ee.Image.constant(0);}
    } else {
      var winter16 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 16, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve16p = (delta).updateMask(delta.gte(0.0));
    var spring16 = improve16p.expression(
        'N/N', {
          'N': improve16p.select(index+'spring')
    });
    spring16 = spring16.toInt().unmask(ee.Image.constant(0));
    } else {var spring16 =ee.Image.constant(0);}
    } else {
      var spring16 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 16, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve16s = (delta).updateMask(delta.gte(0.0));
    var summer16 = improve16s.expression(
        'N/N', {
          'N': improve16s.select(index+'summer')
    });
    summer16 = summer16.toInt().unmask(ee.Image.constant(0));
    } else {var summer16 =ee.Image.constant(0);}
    } else {
      var summer16 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 16, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve16a = (delta).updateMask(delta.gte(0.0));
    var autumn16 = improve2a.expression(
        'N/N', {
          'N': improve16a.select(index+'autumn')
    });
    autumn16 = autumn16.toInt().unmask(ee.Image.constant(0));
    } else {var autumn16 =ee.Image.constant(0);}
    } else {
      var autumn16 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 17
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 17, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve17w = (delta).updateMask(delta.gte(0.0));
    var winter17 = improve17w.expression(
        'N/N', {
          'N': improve17w.select(index+'winter')
    });
    winter17 = winter17.toInt().unmask(ee.Image.constant(0));
    } else {var winter17 =ee.Image.constant(0);}
    } else {
      var winter17 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 17, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve17p = (delta).updateMask(delta.gte(0.0));
    var spring17 = improve17p.expression(
        'N/N', {
          'N': improve17p.select(index+'spring')
    });
    spring17 = spring17.toInt().unmask(ee.Image.constant(0));
    } else {var spring17 =ee.Image.constant(0);}
    } else {
      var spring17 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 17, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve17s = (delta).updateMask(delta.gte(0.0));
    var summer17 = improve17s.expression(
        'N/N', {
          'N': improve17s.select(index+'summer')
    });
    summer17 = summer17.toInt().unmask(ee.Image.constant(0));
    } else {var summer17 =ee.Image.constant(0);}
    } else {
      var summer17 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 17, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve17a = (delta).updateMask(delta.gte(0.0));
    var autumn17 = improve2a.expression(
        'N/N', {
          'N': improve17a.select(index+'autumn')
    });
    autumn17 = autumn17.toInt().unmask(ee.Image.constant(0));
    } else {var autumn17 =ee.Image.constant(0);}
    } else {
      var autumn17 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 18
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 18, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve18w = (delta).updateMask(delta.gte(0.0));
    var winter18 = improve18w.expression(
        'N/N', {
          'N': improve18w.select(index+'winter')
    });
    winter18 = winter18.toInt().unmask(ee.Image.constant(0));
    } else {var winter18 =ee.Image.constant(0);}
    } else {
      var winter18 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 18, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve18p = (delta).updateMask(delta.gte(0.0));
    var spring18 = improve18p.expression(
        'N/N', {
          'N': improve18p.select(index+'spring')
    });
    spring18 = spring18.toInt().unmask(ee.Image.constant(0));
    } else {var spring18 =ee.Image.constant(0);}
    } else {
      var spring18 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 18, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve18s = (delta).updateMask(delta.gte(0.0));
    var summer18 = improve18s.expression(
        'N/N', {
          'N': improve18s.select(index+'summer')
    });
    summer18 = summer18.toInt().unmask(ee.Image.constant(0));
    } else {var summer18 =ee.Image.constant(0);}
    } else {
      var summer18 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 18, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve18a = (delta).updateMask(delta.gte(0.0));
    var autumn18 = improve2a.expression(
        'N/N', {
          'N': improve18a.select(index+'autumn')
    });
    autumn18 = autumn18.toInt().unmask(ee.Image.constant(0));
    } else {var autumn18 =ee.Image.constant(0);}
    } else {
      var autumn18 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 19
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 19, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve19w = (delta).updateMask(delta.gte(0.0));
    var winter19 = improve19w.expression(
        'N/N', {
          'N': improve19w.select(index+'winter')
    });
    winter19 = winter19.toInt().unmask(ee.Image.constant(0));
    } else {var winter19 =ee.Image.constant(0);}
    } else {
      var winter19 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 19, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve19p = (delta).updateMask(delta.gte(0.0));
    var spring19 = improve19p.expression(
        'N/N', {
          'N': improve19p.select(index+'spring')
    });
    spring19 = spring19.toInt().unmask(ee.Image.constant(0));
    } else {var spring19 =ee.Image.constant(0);}
    } else {
      var spring19 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 19, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve19s = (delta).updateMask(delta.gte(0.0));
    var summer19 = improve19s.expression(
        'N/N', {
          'N': improve19s.select(index+'summer')
    });
    summer19 = summer19.toInt().unmask(ee.Image.constant(0));
    } else {var summer19 =ee.Image.constant(0);}
    } else {
      var summer19 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 19, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve19a = (delta).updateMask(delta.gte(0.0));
    var autumn19 = improve2a.expression(
        'N/N', {
          'N': improve19a.select(index+'autumn')
    });
    autumn19 = autumn19.toInt().unmask(ee.Image.constant(0));
    } else {var autumn19 =ee.Image.constant(0);}
    } else {
      var autumn19 =ee.Image.constant(0);
  }
  var year_select = year_after_fire + 20
  print('year_select:',year_select,'end_year:',end_year )
  var year_above = YEAR_after.filterMetadata('year', 'equals', year_select);
  var mean_year_specific = year_above.mean();
  if (year_select <= end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'winter'), 20, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'winter')).subtract(mean_before.select(index+'winter'));
    var improve20w = (delta).updateMask(delta.gte(0.0));
    var winter20 = improve20w.expression(
        'N/N', {
          'N': improve20w.select(index+'winter')
    });
    winter20 = winter20.toInt().unmask(ee.Image.constant(0));
    } else {var winter20 =ee.Image.constant(0);}
    } else {
      var winter20 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'spring'), 20, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'spring')).subtract(mean_before.select(index+'spring'));
    var improve20p = (delta).updateMask(delta.gte(0.0));
    var spring20 = improve20p.expression(
        'N/N', {
          'N': improve20p.select(index+'spring')
    });
    spring20 = spring20.toInt().unmask(ee.Image.constant(0));
    } else {var spring20 =ee.Image.constant(0);}
    } else {
      var spring20 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'summer'), 20, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'summer')).subtract(mean_before.select(index+'summer'));
    var improve20s = (delta).updateMask(delta.gte(0.0));
    var summer20 = improve20s.expression(
        'N/N', {
          'N': improve20s.select(index+'summer')
    });
    summer20 = summer20.toInt().unmask(ee.Image.constant(0));
    } else {var summer20 =ee.Image.constant(0);}
    } else {
      var summer20 =ee.Image.constant(0);
  }
  if (year_select < end_year) {
    var band_names = mean_year_specific.bandNames();
    var band_exist = ee.Number.parse(ee.Algorithms.If(band_names.contains(index+'autumn'), 20, 1)).getInfo()
    if (band_exist > 5){
    var delta =(mean_year_specific.select(index+'autumn')).subtract(mean_before.select(index+'autumn'));
    var improve20a = (delta).updateMask(delta.gte(0.0));
    var autumn20 = improve2a.expression(
        'N/N', {
          'N': improve20a.select(index+'autumn')
    });
    autumn20 = autumn20.toInt().unmask(ee.Image.constant(0));
    } else {var autumn20 =ee.Image.constant(0);}
    } else {
      var autumn20 =ee.Image.constant(0);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var lista_improve=ee.List([winter1,spring1,summer1,autumn1,
                          winter2,spring2,summer2,autumn2,
                          winter3,spring3,summer3,autumn3,
                          winter4,spring4,summer4,autumn4,
                          winter5,spring5,summer5,autumn5,
                          winter6,spring6,summer6,autumn6,
                          winter7,spring7,summer7,autumn7,
                          winter8,spring8,summer8,autumn8,
                          winter9,spring9,summer9,autumn9,
                          winter10,spring10,summer10,autumn10,
                          winter11,spring11,summer11,autumn11,
                          winter12,spring12,summer12,autumn12,
                          winter13,spring13,summer13,autumn13,
                          winter14,spring14,summer14,autumn14,
                          winter15,spring15,summer15,autumn15,
                          winter16,spring16,summer16,autumn16,
                          winter17,spring17,summer17,autumn17,
                          winter18,spring18,summer18,autumn18,
                          winter19,spring19,summer19,autumn19,
                          winter20,spring20,summer20,autumn20]);
  var coleccion_improve=ee.ImageCollection.fromImages(lista_improve)
  function renameall(image) {
      var bands = image.select(0);
      var new_bands = [index];
      return image
      .addBands(bands.rename(new_bands));
    }
  var coleccion_improve_all = coleccion_improve.map(renameall)
  var improve_total = ((ee.Image.constant(change_years)).subtract(winter1.add(spring1).add(summer1).add(autumn1)
                                                            .add(winter2).add(spring2).add(summer2).add(autumn2)
                                                            .add(winter3).add(spring3).add(summer3).add(autumn3)
                                                            .add(winter4).add(spring4).add(summer4).add(autumn4)
                                                            .add(winter5).add(spring5).add(summer5).add(autumn5)
                                                            .add(winter6).add(spring6).add(summer6).add(autumn6)
                                                            .add(winter7).add(spring7).add(summer7).add(autumn7)
                                                            .add(winter8).add(spring8).add(summer8).add(autumn8)
                                                            .add(winter9).add(spring9).add(summer9).add(autumn9)
                                                            .add(winter10).add(spring10).add(summer10).add(autumn10)
                                                            .add(winter11).add(spring11).add(summer11).add(autumn11)
                                                            .add(winter12).add(spring12).add(summer12).add(autumn12)
                                                            .add(winter13).add(spring13).add(summer13).add(autumn13)
                                                            .add(winter14).add(spring14).add(summer14).add(autumn14)
                                                            .add(winter15).add(spring15).add(summer15).add(autumn15)
                                                            .add(winter16).add(spring16).add(summer16).add(autumn16)
                                                            .add(winter17).add(spring17).add(summer17).add(autumn17)
                                                            .add(winter18).add(spring18).add(summer18).add(autumn18)
                                                            .add(winter19).add(spring19).add(summer19).add(autumn19)
                                                            .add(winter20).add(spring20).add(summer20).add(autumn20)))
                                                      .divide(ee.Image.constant(change_years))
  //print('año',change_years)
  //['green','yellow','orange','red','purple']
  Map.addLayer(improve_total.clip(vector_filter), {min: 0 , max: 1,  palette:['purple','red','orange','yellow','green']},'FGRI')
  // MDT
  var dataset = ee.Image('NASA/NASADEM_HGT/001');
  var elevation = dataset.select('elevation');
  var slope = ee.Terrain.slope(elevation);
  var aspect = ee.Terrain.aspect(elevation);
  //Combine Image
  var geo = ee.Image.cat([elevation,slope,aspect]);
  //Create Class to Aspect
  var mask = aspect.updateMask(aspect.gte(90));
  var sunny = mask.updateMask(mask.lte(270));
  //print(sunny)
  var sunny1 = sunny.expression(
      '(N/N)*20', {
        'N': sunny.select('aspect')
  });
  sunny1 = sunny1.toInt()
  //Map.addLayer(sunny1.clip(zona), {palette:['red']}, 'Solana',false);
  var mask2 = aspect.updateMask(aspect.lte(90));
  var mask3 = aspect.updateMask(aspect.gte(270));
  var shady = ee.ImageCollection([mask2, mask3]).mosaic();
  var shady1 = shady.expression(
      '(N/N)*10', {
        'N': shady.select('aspect')
  });
  shady1 = shady1.toInt()
  //Map.addLayer(shady1.clip(zona), {palette:['blue']}, 'Umbria',false);
  var aspect2 = ee.ImageCollection([sunny1, shady1]).mosaic();
  //Create Class to Slope
  var LowSlope = slope.updateMask(slope.lte(15));
  var LowSlope1 = LowSlope.expression(
      'N/N', {
        'N': LowSlope.select('slope')
  });
  LowSlope1 = LowSlope1.toInt()
  //Map.addLayer(LowSlope1.clip(zona), {palette:['green']}, '<15 Slope',false);
  var MediumSlope11 = slope.updateMask(slope.gte(15));
  var MediumSlope = MediumSlope11.updateMask(MediumSlope11.lte(30));
  var MediumSlope1 = MediumSlope.expression(
      '(N/N)*2', {
        'N': MediumSlope.select('slope')
  });
  MediumSlope1 = MediumSlope1.toInt()
  //Map.addLayer(MediumSlope1.clip(zona), {palette:['yellow']}, '15-30 Slope',false);
  var HighSlope = slope.updateMask(slope.gte(30));
  var HighSlope1 = HighSlope.expression(
      '(N/N)*3', {
        'N': HighSlope.select('slope')
  });
  HighSlope1 = HighSlope1.toInt()
  //Map.addLayer(HighSlope1.clip(zona), {palette:['red']}, '>30 Slope',false);
  var slope2 = ee.ImageCollection([LowSlope1,MediumSlope1,HighSlope1]).mosaic();
  // Combinar Orientacio y pendiente
  var fisiog = slope2.add(aspect2);
  Map.addLayer(fisiog.clip(vector_filter), {min: 11, max: 23, palette: ['85b6ff', '4e95ff', '065eff', 'ffb66a', 'ff7c3d', 'ff3406']}, 'Aspect/Slope');
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  var final_year = (ee.Number.parse(year).getInfo()) + 10 
  var chart = ui.Chart.image.seriesByRegion({
                    imageCollection: coleccion.filterBounds(aoi).filter(ee.Filter.calendarRange(year_before_fire,final_year, 'year')),
                    regions: Points,
                    reducer: ee.Reducer.mean(),
                    band: index,
                    scale: 100,
                    xProperty: 'system:time_start',
                    seriesProperty: 'Damage'
                  })
                  .setOptions({
                    titlePostion: 'Time Series',
                    colors: ['3eff0e', 'ffff00', 'ff0000'],
                    hAxis: {title: 'Date'},
                    vAxis: {title: index}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
  function downloadImg() {
    var downloadArgs = {
      name: layerName2,
      crs: 'EPSG:4326',
      scale: 30,
      region: aoi
    };
    var downloadArgs2 = {
      name: 'FGRI',
      crs: 'EPSG:4326',
      scale: 30,
      region: aoi
    };
    var url = NBRR2.getDownloadURL(downloadArgs);
    var url2 = improve_total.getDownloadURL(downloadArgs2);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true})
    urlLabel2.setUrl(url2);
    urlLabel2.style().set({shown: true});
  }
  downloadButton.onClick(downloadImg)
}
//button.onClick(loadComposite)
var downloadButton = ui.Button('Download')
var urlLabel = ui.Label('Download dNBR_class', {shown: false});
var urlLabel2 = ui.Label('Download FGRI', {shown: false});
var panel_donwload = ui.Panel([downloadButton, urlLabel, urlLabel2]);
//var downloadButton2 = ui.Button('Download FGRI')
//var urlLabel2 = ui.Label('Download FGRI', {shown: false});
//var panel_donwload2 = ui.Panel([downloadButton2, urlLabel2]);
//////////////////
controlPanel.add(datesPanel1);
controlPanel.add(datesPanel2);
controlPanel.add(datesPanel3);
controlPanel.add(Resultlabel);
controlPanel.add(panel_donwload);
//controlPanel.add(panel_donwload2);
panel.add(controlPanel);
//panel.add(extCheck);
//titlePanel.add(panel)
//////////////
//ui.root.insert(1,titlePanel);
ui.root.insert(1,panel);
drawingTools.onDraw(ui.util.debounce(loadComposite, 500));
drawingTools.onEdit(ui.util.debounce(loadComposite, 500));