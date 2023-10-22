// ++++ ROI ++++
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var roi = countries.filter(ee.Filter.eq('country_co', 'NZ'));
// var rc = ee.FeatureCollection('users/frederikabm/regional-council-2020-generalised');
// var roi = rc.filter(ee.Filter.eq('REGC2020_1', 'Waikato Region'));
Map.centerObject(roi,7);
// ++++ IMPORT DATA ++++
var wtd = ee.Image("users/rogierwesterhoff/ewt_wtd_NZ");
// https://developers.google.com/earth-engine/guides/image_visualization#styled-layer-descriptors
var sld_intervals =
'<RasterSymbolizer>' +
  '<ColorMap type="intervals" extended="false">' +
    '<ColorMapEntry color="#0000cd" quantity="0.5" label="0m-0.5m"/>' +
    '<ColorMapEntry color="#4169e1" quantity="2.5" label="0.5m-2.5m"/>' +
    '<ColorMapEntry color="#20b2ab" quantity="5" label="2.5m-5m"/>' +
    '<ColorMapEntry color="#9acd32" quantity="10" label="5m-10m"/>' +
    '<ColorMapEntry color="#ffd900" quantity="20" label="10m-20m"/>' +
    '<ColorMapEntry color="#daa520" quantity="40" label="20m-40m"/>' +
    '<ColorMapEntry color="#ff7f50" quantity="80" label="40m-80m"/>' +
    '<ColorMapEntry color="#ff0000" quantity="1000" label="80m and deeper"/>' +
   '</ColorMap>' +
'</RasterSymbolizer>';
//Map.addLayer(cover.sldStyle(sld_intervals), {}, 'IGBP classification styled');
Map.addLayer(wtd.clip(roi).sldStyle(sld_intervals), {}, 'water table depth (mbgl)',true);
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
  value: 'Water table depth \n (mbgl)', 
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
var palette =['0000cd','4169e1','20b2ab','9acd32','ffd900','daa520','ff7f50','ff0000']; // colour scale from Fan et al
// Name of the legend
var names = ['0-0.5','0.5-2.5','2.5-5','5-10','10-20','20-40','40-80','>80'];
// Add color and and names
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Add legend to map 
Map.add(legend);
// Define a UI widget and add it to the map.
var widget = ui.Label({
  value: 'Westerhoff et al., 2018. Application of an improved global-scale \n groundwater model for water table estimation across New Zealand, \n Hydrol. Earth Syst. Sci., 22, 6449–6472, doi:10.5194/hess-22-6449-2018.',
//  style: {width: '350px', height: '60px', fontSize: '14px', color: '484848'}
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    whiteSpace: 'pre'
  },
  targetUrl:'https://hess.copernicus.org/articles/22/6449/2018/'
});
Map.add(widget);
// View the UI widget's style properties; an ActiveDictionary.
print(widget.style());
// ActiveDictionaries are mutable; set a style property.
widget.style().set('backgroundColor', 'white');
print(widget.style());
// Define the UI widget's style ActiveDictionary as a variable.
var widgetStyle = widget.style();
print(widgetStyle);
// Set the UI widget's style properties from the ActiveDictionary variable.
widgetStyle.set({border: '1px lightgray'});
print(widgetStyle);