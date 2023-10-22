/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image1 = ee.Image("users/jatullis/worldclimate_a"),
    image2 = ee.Image("users/jatullis/worldclimate_b");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Compare two versions of the IPCC (2019) climate zones
// Adapted from Audebert (2021)
// Jason A. Tullis
// Define an SLD style of discrete intervals to apply to the image
var sld_intervals =
'<RasterSymbolizer>' +
  '<ColorMap type="intervals" extended="false">' +
    '<ColorMapEntry color="#6699cb" quantity="1" label="Tropical Montane"/>' +
    '<ColorMapEntry color="#43896e" quantity="2" label="Tropical Wet"/>' +
    '<ColorMapEntry color="#89ce65" quantity="3" label="Tropical Moist"/>' +
    '<ColorMapEntry color="#f5f67a" quantity="4" label="Tropical Dry"/>' +
    '<ColorMapEntry color="#72e0fe" quantity="5" label="Warm Temperate Moist"/>' +
    '<ColorMapEntry color="#ffd381" quantity="6" label="Warm Temperate Dry"/>' +
    '<ColorMapEntry color="#cef57a" quantity="7" label="Cool Temperate Moist"/>' +
    '<ColorMapEntry color="#c29fd8" quantity="8" label="Cool Temperate Dry"/>' +
    '<ColorMapEntry color="#9eaad7" quantity="9" label="Boreal Moist"/>' +
    '<ColorMapEntry color="#d8d89f" quantity="10" label="Boreal Dry"/>' +
    '<ColorMapEntry color="#d7ffe8" quantity="11" label="Polar Moist"/>' +
    '<ColorMapEntry color="#e2e2e2" quantity="12" label="Polar Dry"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
Map.addLayer(image1.sldStyle(sld_intervals), {}, 'World climate A')
Map.addLayer(image2.sldStyle(sld_intervals), {}, 'World climate B')
// Create legend
function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '8px 15px'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
    value: 'IPCC Climate Zones',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  // Add the title to the panel
  legend.add(legendTitle); 
  // Creates and style 1 row of the legend
  var makeRow = function(color, name) {
      // Create the label that is actually the colored box
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text
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
var ipccPalette = [
    '6699cb', '43896e', '89ce65', 'f5f67a', '72e0fe', 'ffd381',
    'cef57a', 'c29fd8', '9eaad7', 'd8d89f', 'd7ffe8', 'e2e2e2'
  ];
// Legend categories
var names = [ 
"Tropical Montane", 
"Tropical Wet",
"Tropical Moist",
"Tropical Dry",
"Warm Temperate Moist",
"Warm Temperate Dry",
"Cool Temperate Moist",
"Cool Temperate Dry",
"Boreal Moist",
"Boreal Dry",
"Polar Moist",
"Polar Dry"
  ];
// Add color and and names
for (var i = 0; i < 12; i++) {
  legend.add(makeRow(ipccPalette[i], names[i]));
  }  
  return legend;
}
Map.add(createLegend());