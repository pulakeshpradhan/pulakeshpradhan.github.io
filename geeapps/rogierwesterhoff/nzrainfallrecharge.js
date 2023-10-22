// +++ COLOR PALETTES +++ // see https://github.com/gee-community/ee-palettes
var palettes = require('users/gena/packages:palettes');
var demPalette = palettes.colorbrewer.RdYlGn[11].reverse();
var slopePalette = palettes.colorbrewer.YlOrRd[9];
var vizRech = {min: 0, max: 3.301, palette: ['blue', 'yellow', 'red', 'white']};
// Define an sld style color ramp to apply to the image.
var sld_ramp =
  '<RasterSymbolizer>' +
    '<ColorMap type="ramp" extended="false" >' +
      '<ColorMapEntry color="#7b0403" quantity="0.9" label="7.94" />' +
      '<ColorMapEntry color="#cb2a04" quantity="1" label="10"/>' +
      '<ColorMapEntry color="#f76b19" quantity="1.301" label="20" />' +
      '<ColorMapEntry color="#fbbb39" quantity="1.69897" label="50" />' +
      '<ColorMapEntry color="#c8f034" quantity="2" label="100" />' +
      '<ColorMapEntry color="#73ff5f" quantity="2.301" label="200" />' +
      '<ColorMapEntry color="#1ae5b7" quantity="1.69897" label="500" />' +
      '<ColorMapEntry color="#36aafa" quantity="3" label="1000" />' +
      '<ColorMapEntry color="#4662d8" quantity="3.301" label="2000" />' +
      '<ColorMapEntry color="#31123b" quantity="3.8" label="3001" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// +++ END OF COLOR PALETTES +++
// import reference NGRM recharge dataset
var ngrmRecharge = ee.Image('users/rogierwesterhoff/ngrmMeanAnnualRechargev30_2000_2015')
  .multiply(365.25)
  .log10();
var roi = ngrmRecharge.geometry();
Map.centerObject(roi,7);
// Map.addLayer(ngrmRecharge, vizRech, 'NGRM recharge (mm/year)',true);
Map.addLayer(ngrmRecharge.sldStyle(sld_ramp), {}, 'NGRM recharge (mm/yr)',true);
// ++++++++ ADD LEGEND +++++++++++++
// Set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Rainfall recharge \n (mm/yr)', 
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0',
    whiteSpace: 'pre'
    }
});
// Add the title to the panel
legend.add(legendTitle);
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
// Palette with the colors
var palette =['7b0403','cb2a04','f76b19','fbbb39','c8f034','73ff5f','1ae5b7','36aafa','4662d8','31123b']; // colour scale from Fan et al
// Name of the legend
var names = ['<10','10','20','50','100','200','500','1000','2000','>2000'];
// Add color and and names
for (var i = 0; i < 10; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Add legend to map 
Map.add(legend);
// Define a UI widget and add it to the map.
var widget = ui.Label({
  value: 'Westerhoff et al. (2018). Incorporation of Satellite Data and Uncertainty \n in a Nationwide Groundwater Recharge Model in New Zealand. \n Remote Sensing 10, no. 1: 58. doi:10.3390/rs10010058',
//  style: {width: '350px', height: '60px', fontSize: '14px', color: '484848'}
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    whiteSpace: 'pre'
  },
  targetUrl:'https://www.mdpi.com/2072-4292/10/1/58'
});
Map.add(widget);
// View the UI widget's style properties; an ActiveDictionary.
// print(widget.style());
// ActiveDictionaries are mutable; set a style property.
widget.style().set('backgroundColor', 'white');
// print(widget.style());
// Define the UI widget's style ActiveDictionary as a variable.
var widgetStyle = widget.style();
// print(widgetStyle);
// Set the UI widget's style properties from the ActiveDictionary variable.
widgetStyle.set({border: '1px lightgray'});
// print(widgetStyle);