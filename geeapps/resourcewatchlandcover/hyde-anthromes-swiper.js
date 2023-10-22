var leftmap = ui.Map();
var rightmap = ui.Map();
var linker = ui.Map.Linker([leftmap, rightmap]);
var left_textbox = ui.Textbox({
  placeholder: 'Enter Year Here.',
  style:{
    position: 'top-left',
    textAlign: 'center',
    minWidth: '125px'
  }
});
// set position of panel
var left_legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var left_legendTitle = ui.Label({
  value: 'Anthropogenic Biomes',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// set position of panel
var right_legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var right_legendTitle = ui.Label({
  value: 'Anthropogenic Biomes',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var right_textbox = ui.Textbox({
  placeholder: 'Enter Year Here.',
  style:{
    position: 'top-right',
    textAlign: 'center',
    minWidth: '125px'
  }
});
left_textbox.onChange(function() {
  var year = left_textbox.getValue()
  var label = ee.String('Historical Anthropogenic Biomes for Year: ').cat(ee.String(year))
  var num_year = ee.Number.parse(year.slice(0,6));
  leftmap.clear()
  leftmap.widgets().add(left_textbox)
  leftmap.add(left_legend)
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/HYDE/Anthromes')
  var image = imageCollection.filter(ee.Filter.eq('year', num_year)).first();
  var anthromes_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="values" extended="false">'+
    '<ColorMapEntry color="#FC1717" quantity="11"/>'+ //Dense Settlement
    '<ColorMapEntry color="#FC1717" quantity="12"/>'+ //Dense Settlement
    '<ColorMapEntry color="#FC6DDA" quantity="21"/>'+ //Villages
    '<ColorMapEntry color="#FC6DDA" quantity="22"/>'+ //Villages
    '<ColorMapEntry color="#FC6DDA" quantity="23"/>'+ //Villages
    '<ColorMapEntry color="#FC6DDA" quantity="24"/>'+ //Villages
    '<ColorMapEntry color="#FDFA52" quantity="31"/>'+ //Cropland
    '<ColorMapEntry color="#FDFA52" quantity="32"/>'+ //Cropland
    '<ColorMapEntry color="#FDFA52" quantity="33"/>'+ //Cropland
    '<ColorMapEntry color="#FDFA52" quantity="34"/>'+ //Cropland
    '<ColorMapEntry color="#FEA543" quantity="41"/>'+ //Rangeland
    '<ColorMapEntry color="#FEA543" quantity="42"/>'+ //Rangeland
    '<ColorMapEntry color="#FEA543" quantity="43"/>'+ //Rangeland
    '<ColorMapEntry color="#1FC51F" quantity="51"/>'+ //Semi-Natural Forest
    '<ColorMapEntry color="#1FC51F" quantity="52"/>'+ //Semi-Natural Forest
    '<ColorMapEntry color="#1FC51F" quantity="53"/>'+ //Semi-Natural Forest
    '<ColorMapEntry color="#D6BC65" quantity="54"/>'+ //Semi-natural Treeless and Barren
    '<ColorMapEntry color="#278011" quantity="61"/>'+ //Wild Forests
    '<ColorMapEntry color="#FFEEBC" quantity="62"/>'+ //Wild Treeless and Barren
    '<ColorMapEntry color="#FFFFFF" quantity="63"/>'+ //Ice
    '<ColorMapEntry color="#000000" quantity="70"/>'+ //No Definition
    '</ColorMap>'+
  '</RasterSymbolizer>';
  leftmap.addLayer(image.sldStyle(anthromes_sld), {}, label.getInfo());
  return image
})
right_textbox.onChange(function() {
  var year = right_textbox.getValue()
  var label = ee.String('Historical Anthropogenic Biomes for Year: ').cat(ee.String(year))
  var num_year = ee.Number.parse(year.slice(0,6));
  rightmap.clear()
  rightmap.widgets().add(right_textbox)
  rightmap.add(right_legend)
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/HYDE/Anthromes')
  var image = imageCollection.filter(ee.Filter.eq('year', num_year)).first();
  var anthromes_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="values" extended="false">'+
    '<ColorMapEntry color="#FC1717" quantity="11"/>'+ //Dense Settlement
    '<ColorMapEntry color="#FC1717" quantity="12"/>'+ //Dense Settlement
    '<ColorMapEntry color="#FC6DDA" quantity="21"/>'+ //Villages
    '<ColorMapEntry color="#FC6DDA" quantity="22"/>'+ //Villages
    '<ColorMapEntry color="#FC6DDA" quantity="23"/>'+ //Villages
    '<ColorMapEntry color="#FC6DDA" quantity="24"/>'+ //Villages
    '<ColorMapEntry color="#FDFA52" quantity="31"/>'+ //Cropland
    '<ColorMapEntry color="#FDFA52" quantity="32"/>'+ //Cropland
    '<ColorMapEntry color="#FDFA52" quantity="33"/>'+ //Cropland
    '<ColorMapEntry color="#FDFA52" quantity="34"/>'+ //Cropland
    '<ColorMapEntry color="#FEA543" quantity="41"/>'+ //Rangeland
    '<ColorMapEntry color="#FEA543" quantity="42"/>'+ //Rangeland
    '<ColorMapEntry color="#FEA543" quantity="43"/>'+ //Rangeland
    '<ColorMapEntry color="#1FC51F" quantity="51"/>'+ //Semi-Natural Forest
    '<ColorMapEntry color="#1FC51F" quantity="52"/>'+ //Semi-Natural Forest
    '<ColorMapEntry color="#1FC51F" quantity="53"/>'+ //Semi-Natural Forest
    '<ColorMapEntry color="#D6BC65" quantity="54"/>'+ //Semi-natural Treeless and Barren
    '<ColorMapEntry color="#278011" quantity="61"/>'+ //Wild Forests
    '<ColorMapEntry color="#FFEEBC" quantity="62"/>'+ //Wild Treeless and Barren
    '<ColorMapEntry color="#FFFFFF" quantity="63"/>'+ //Ice
    '<ColorMapEntry color="#000000" quantity="70"/>'+ //No Definition
    '</ColorMap>'+
  '</RasterSymbolizer>';
  rightmap.addLayer(image.sldStyle(anthromes_sld), {}, label.getInfo());
  return image
})
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '6px',
        margin: '0 0 4px 0px'
      }
  });
    // Create the label filled with the description text.
  var description = ui.Label({
      value: name,
      style: {
        margin: '0 0 4px 4px',
        fontSize: '12px'
      }
    });
    // return the panel
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//  Palette with the colors
var palette =['#FC1717', '#FC6DDA', '#FDFA52','#FEA543','#1FC51F',
  '#278011','#D6BC65','#FFEEBC','#FFFFFF','#000000'];
// name of the legend
var names = ['Dense Settlement','Villages','Cropland','Pasture','Semi-Natural Forest',
  'Wild Forest','Semi-Natural Treeless and Barren','Wild Treeless and Barren','Ice','No Defnition'];
leftmap.setCenter(-25,20,2)
leftmap.widgets().add(left_textbox)
leftmap.add(left_legend)
left_legend.add(left_legendTitle)
// Add color and and names
for (var i = 0; i < 8; i++) {
  left_legend.add(makeRow(palette[i], names[i]));
  }
rightmap.widgets().add(right_textbox)
rightmap.add(right_legend)
right_legend.add(right_legendTitle)
// Add color and and names
for (var i = 0; i < 8; i++) {
	right_legend.add(makeRow(palette[i], names[i]));
}
var splitpanel = ui.SplitPanel({
  firstPanel: leftmap,
  secondPanel: rightmap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitpanel]);
left_textbox.setValue('1850')
right_textbox.setValue('2017')