// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Anthropogenic Biomes',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var textbox = ui.Textbox('Enter Year between 10000 BC and 2015 AD')
textbox.style().set('minWidth', '300px');
textbox.style().set('textAlign','center');
textbox.onChange(function() {
  var year = textbox.getValue()
  var label = ee.String('Historical Anthropogenic Biomes for Year: ').cat(ee.String(year))
  var num_year = ee.Number.parse(year.slice(0,6));
  Map.clear()
  Map.widgets().add(textbox)
  Map.add(legend)
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/HYDE/Anthromes')
  var image = imageCollection.filter(ee.Filter.eq('year', num_year)).first();
var anthromes_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="values" extended="false">'+
    '<ColorMapEntry color="#a6050e" quantity="11"/>'+ //Urban
    '<ColorMapEntry color="#fc0d1b" quantity="12"/>'+ //
    '<ColorMapEntry color="#1474fb" quantity="21"/>'+ 
    '<ColorMapEntry color="#1caae3" quantity="22"/>'+ 
    '<ColorMapEntry color="#a821e3" quantity="23"/>'+ 
    '<ColorMapEntry color="#fd77dd" quantity="24"/>'+ 
    '<ColorMapEntry color="#b18d27" quantity="31"/>'+ 
    '<ColorMapEntry color="#e6e431" quantity="32"/>'+ 
    '<ColorMapEntry color="#fffd7d" quantity="33"/>'+ 
    '<ColorMapEntry color="#fffec1" quantity="34"/>'+ 
    '<ColorMapEntry color="#e49724" quantity="41"/>'+ 
    '<ColorMapEntry color="#fed285" quantity="42"/>'+ 
    '<ColorMapEntry color="#feeab2" quantity="43"/>'+ 
    '<ColorMapEntry color="#3da61c" quantity="51"/>'+ 
    '<ColorMapEntry color="#a7f380" quantity="52"/>'+ 
    '<ColorMapEntry color="#d4feb5" quantity="53"/>'+ 
    '<ColorMapEntry color="#e5eeda" quantity="54"/>'+ 
    '<ColorMapEntry color="#dbf2ea" quantity="61"/>'+ 
    '<ColorMapEntry color="#e1e1e1" quantity="62"/>'+ 
    '<ColorMapEntry color="#FFFFFF" quantity="63"/>'+ 
    '<ColorMapEntry color="#000000" quantity="70"/>'+ 
    '</ColorMap>'+
  '</RasterSymbolizer>';
  Map.addLayer(image.sldStyle(anthromes_sld), {}, label.getInfo());
  return image
})
Map.setCenter(-25,20,2)
Map.widgets().add(textbox)
Map.add(legend)
legend.add(legendTitle)
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
var max_class_palette =['#a6050e', '#fc0d1b', '#1474fb','#1caae3','#a821e3','#fd77dd',
  '#b18d27','#e6e431','#fffd7d','#fffec1','#e49724','#fed285','#feeab2',
  '#3da61c','#a7f380','#d4feb5','#e5eeda','#dbf2ea','#e1e1e1','#FFFFFF','#000000'];
// name of the legend
var names = ['Urban','Dense Settlements','Village, Rice','Village, Irrigated',
  'Village, Rainfed','Village, Pastoral','Croplands, Residential, Irrigated',
  'Croplands, Residential, Rainfed','Croplands, Populated','Croplands, Pastoral',
  'Rangeland, Residential','Rangeland, Populated','Rangeland, Remote',
  'Semi-natural Woodlands, Residential','Semi-natural Woodlands, Populated',
  'Semi-natural Woodlands, Remote','Semi-natural Treeless and Barren Lands',
  'Wild, Remote - Woodlands','Wild, Remote - Treeless and Barren','Wild, Remote - Ice','No Definition'];
// Add color and and names
for (var i = 0; i < 21; i++) {
  legend.add(makeRow(max_class_palette[i], names[i]));
  }