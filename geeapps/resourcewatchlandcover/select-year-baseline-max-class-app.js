//var palettes = require('users/gena/packages:palettes')
//var animation = require('users/resourcewatchlandcover/GEE_scripts:animate');
var textbox = ui.Textbox('Enter Year between 850 and 2015')
textbox.style().set('minWidth', '240px');
textbox.style().set('textAlign','center');
textbox.onChange(function() {
  var year = textbox.getValue()
  var label = ee.String('Projected Land Use under RCP 2.6 for Year: ').cat(ee.String(year))
  var num_year = ee.Number.parse(year.slice(0,4));
  Map.clear()
  Map.widgets().add(textbox)
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LUH_Classified/LUH_Max')
  var image = imageCollection.filterDate(start, end).first();
  var lu_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="values" extended="false">'+
    '<ColorMapEntry color="#fbf858" quantity="0" opacity="0"/>'+ 
    '<ColorMapEntry color="#ff0000" quantity="1" />'+ 
    '<ColorMapEntry color="#fbf858" quantity="2" />'+ 
    '<ColorMapEntry color="#b18d27" quantity="3" />'+ 
    '<ColorMapEntry color="#e49724" quantity="4" />'+ 
    '<ColorMapEntry color="#146d00" quantity="5" />'+ 
    '<ColorMapEntry color="#97dd73" quantity="6" />'+ 
    '<ColorMapEntry color="#6b00c7" quantity="7"/>'+ 
    '</ColorMap>'+
  '</RasterSymbolizer>';
  Map.addLayer(image.sldStyle(lu_sld), {}, label.getInfo());
  return image
})
Map.widgets().add(textbox)