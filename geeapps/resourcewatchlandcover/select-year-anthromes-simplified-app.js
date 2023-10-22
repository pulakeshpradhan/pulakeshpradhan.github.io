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
//'#FC1717' Dense Settlements: 11,12
//'#FC6DDA' Villages: 21,22,23,24
//'#FDFA52' Cropland: 31,32,33,34
//'#FEA543' Rangeland: 41,42,43
//'#1FC51F' Semi-Natural Forest: 51, 52, 53
//'#278011' Wild Forest: 61
//'#D6BC65' Semi-Natural Treless and Barren: 54
//'#FFEEBC' Wild Treeless and Barren: 62
//'#FFFFFF' Ice: 63
//'#000000' No Definition: 70
//  Palette with the colors
var palette =['#FC1717', '#FC6DDA', '#FDFA52','#FEA543','#1FC51F',
  '#278011','#D6BC65','#FFEEBC','#FFFFFF','#000000'];
// name of the legend
var names = ['Dense Settlement','Villages','Cropland','Rangeland','Semi-Natural Forest',
  'Wild Forest','Semi-Natural Treless and Barren','Wild Treeless and Barren','Ice','No Defnition'];
// var max_class_palette =['#a6050e', '#fc0d1b', '#1474fb','#1caae3','#a821e3','#fd77dd',
//   '#b18d27','#e6e431','#fffd7d','#fffec1','#e49724','#fed285','#feeab2',
//   '#3da61c','#a7f380','#d4feb5','#e5eeda','#dbf2ea','#e1e1e1','#FFFFFF','#000000'];
// // name of the legend
// var names = ['Urban','Dense Settlements','Village, Rice','Village, Irrigated',
//   'Village, Rainfed','Village, Pastoral','Croplands, Residential, Irrigated',
//   'Croplands, Residential, Rainfed','Croplands, Populated','Croplands, Pastoral',
//   'Rangeland, Residential','Rangeland, Populated','Rangeland, Remote',
//   'Semi-natural Woodlands, Residential','Semi-natural Woodlands, Populated',
//   'Semi-natural Woodlands, Remote','Semi-natural Treeless and Barren Lands',
//   'Wild, Remote - Woodlands','Wild, Remote - Treeless and Barren','Wild, Remote - Ice','No Definition'];
// Add color and and names
for (var i = 0; i < 10; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }