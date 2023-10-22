// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Population Count',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Create legend title
var legendSubTitle = ui.Label({
  value: '[# of people]',
  style: {
    //fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var textbox = ui.Textbox('Enter Year between 10000 BC and 2015 AD')
textbox.style().set('minWidth', '300px');
textbox.style().set('textAlign','center');
textbox.onChange(function() {
  var year = textbox.getValue()
  var label = ee.String('Historical Population Count for Year: ').cat(ee.String(year))
  var num_year = ee.Number.parse(year.slice(0,6));
  print(num_year)
  Map.clear()
  Map.widgets().add(textbox)
  Map.add(legend)
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/HYDE/Baseline/Population')
  var image = imageCollection.filter(ee.Filter.eq('year', num_year)).first();
  print(image)
  var pop_bc_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false">'+
    '<ColorMapEntry color="#0267FF" quantity="0" opacity="0"/>'+ 
    '<ColorMapEntry color="#0088F9" quantity="50"/>'+
    '<ColorMapEntry color="#28FFFD" quantity="100"/>'+ 
    '<ColorMapEntry color="#01EAA9" quantity="200"/>'+
    '<ColorMapEntry color="#22FB23" quantity="400"/>'+
    '<ColorMapEntry color="#ABF602" quantity="800"/>'+
    '<ColorMapEntry color="#FEF923" quantity="1600"/>'+
    '<ColorMapEntry color="#FD912A" quantity="3200"/>'+
    '<ColorMapEntry color="#FD6729" quantity="20000"/>'+
    '<ColorMapEntry color="#FB272A" quantity="300000000000"/>'+
    '</ColorMap>'+
  '</RasterSymbolizer>';
  Map.addLayer(image.select('popc').sldStyle(pop_bc_sld), {}, label.getInfo());
  return image
})
Map.setCenter(-25,20,2)
Map.widgets().add(textbox)
Map.add(legend)
legend.add(legendTitle)
legend.add(legendSubTitle)
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 2px'
      }
  });
    // Create the label filled with the description text.
  var description = ui.Label({
      value: name,
      style: {
        margin: '0 0 4px 4px',
        //fontSize: '12px'
      }
    });
    // return the panel
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//  Palette with the colors
var max_class_palette =['#0088F9', '#28FFFD','#01EAA9','#22FB23','#ABF602',
  '#FEF923','#FD912A','#FD6729','#FB272A'];
// name of the legend
var names = ['≤ 50','≤ 100','≤ 200','≤ 400','≤ 800','≤ 1600','≤ 3200','≤ 20000','> 20000'];
// Add color and and names
for (var i = 0; i < 9; i++) {
  legend.add(makeRow(max_class_palette[i], names[i]));
  }