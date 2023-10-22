var leftmap = ui.Map();
var rightmap = ui.Map();
var linker = ui.Map.Linker([leftmap, rightmap]);
// set position of panel
var left_legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var left_legendTitle = ui.Label({
  value: 'Population Density',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Create legend title
var left_legendSubTitle = ui.Label({
  value: '[people per square km]',
  style: {
    //fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var left_textbox = ui.Textbox({
  placeholder: 'Enter Year Here',
  style:{
    position: 'top-left',
    textAlign: 'center',
    maxWidth: '125px'
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
  value: 'Population Density',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Create legend title
var right_legendSubTitle = ui.Label({
  value: '[people per square km]',
  style: {
    //fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var right_textbox = ui.Textbox({
  placeholder: 'Enter Year Here',
  style:{
    position: 'top-right',
    textAlign: 'center',
    maxWidth: '125px'
  }
});
left_textbox.onChange(function() {
  var year = left_textbox.getValue()
  var label = ee.String('Historical Population Density for Year: ').cat(ee.String(year))
  var num_year = ee.Number.parse(year.slice(0,6));
  print(num_year)
  leftmap.clear()
  leftmap.widgets().add(left_textbox)
  leftmap.add(left_legend)
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/HYDE/Baseline/Population')
  var image = imageCollection.filter(ee.Filter.eq('year', num_year)).first();
  print(image)
  //popd_colors = ['#FFFFFF','#cecece','#0088F9', '#28FFFD','#01EAA9','#22FB23','#ABF602','#FEF923','#FD912A','#FB272A']
 //popd_categories = ['No Data','= 0','≤ 10','≤ 25','≤ 50','≤ 100','≤ 250','≤ 500','≤ 1,000','> 1,000']
  var pop_bc_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false">'+
    '<ColorMapEntry color="#0088F9" quantity="0" opacity="0"/>'+ 
    '<ColorMapEntry color="#0088F9" quantity="10"/>'+
    '<ColorMapEntry color="#28FFFD" quantity="25"/>'+ 
    '<ColorMapEntry color="#01EAA9" quantity="50"/>'+
    '<ColorMapEntry color="#22FB23" quantity="100"/>'+
    '<ColorMapEntry color="#ABF602" quantity="250"/>'+
    '<ColorMapEntry color="#FEF923" quantity="500"/>'+
    '<ColorMapEntry color="#FD912A" quantity="1000"/>'+
    '<ColorMapEntry color="#FB272A" quantity="300000000000"/>'+
    '</ColorMap>'+
  '</RasterSymbolizer>';
  leftmap.addLayer(image.select('popd').sldStyle(pop_bc_sld), {}, label.getInfo());
  return image
})
right_textbox.onChange(function() {
  var year = right_textbox.getValue()
  var label = ee.String('Historical Population Density for Year: ').cat(ee.String(year))
  var num_year = ee.Number.parse(year.slice(0,6));
  print(num_year)
  rightmap.clear()
  rightmap.widgets().add(right_textbox)
  rightmap.add(right_legend)
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/HYDE/Baseline/Population')
  var image = imageCollection.filter(ee.Filter.eq('year', num_year)).first();
  print(image)
  //popd_colors = ['#FFFFFF','#cecece','#0088F9', '#28FFFD','#01EAA9','#22FB23','#ABF602','#FEF923','#FD912A','#FB272A']
 //popd_categories = ['No Data','= 0','≤ 10','≤ 25','≤ 50','≤ 100','≤ 250','≤ 500','≤ 1,000','> 1,000']
  var pop_bc_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false">'+
    '<ColorMapEntry color="#0088F9" quantity="0" opacity="0"/>'+ 
    '<ColorMapEntry color="#0088F9" quantity="10"/>'+
    '<ColorMapEntry color="#28FFFD" quantity="25"/>'+ 
    '<ColorMapEntry color="#01EAA9" quantity="50"/>'+
    '<ColorMapEntry color="#22FB23" quantity="100"/>'+
    '<ColorMapEntry color="#ABF602" quantity="250"/>'+
    '<ColorMapEntry color="#FEF923" quantity="500"/>'+
    '<ColorMapEntry color="#FD912A" quantity="1000"/>'+
    '<ColorMapEntry color="#FB272A" quantity="300000000000"/>'+
    '</ColorMap>'+
  '</RasterSymbolizer>';
  rightmap.addLayer(image.select('popd').sldStyle(pop_bc_sld), {}, label.getInfo());
  return image
})
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
var max_class_palette =['#0088F9', '#28FFFD','#01EAA9','#22FB23','#ABF602','#FEF923','#FD912A','#FB272A'];
// name of the legend
var names = ['≤ 10','≤ 25','≤ 50','≤ 100','≤ 250','≤ 500','≤ 1,000','> 1,000'];
leftmap.setCenter(-25,20,2)
leftmap.widgets().add(left_textbox)
leftmap.add(left_legend)
left_legend.add(left_legendTitle)
left_legend.add(left_legendSubTitle)
// Add color and and names
for (var i = 0; i < 8; i++) {
  left_legend.add(makeRow(max_class_palette[i], names[i]));
  }
rightmap.widgets().add(right_textbox)
rightmap.add(right_legend)
right_legend.add(right_legendTitle)
right_legend.add(right_legendSubTitle)
// Add color and and names
for (var i = 0; i < 8; i++) {
right_legend.add(makeRow(max_class_palette[i], names[i]));
}
var splitpanel = ui.SplitPanel({
  firstPanel: leftmap,
  secondPanel: rightmap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitpanel]);
left_textbox.setValue('-3000')
right_textbox.setValue('2017')