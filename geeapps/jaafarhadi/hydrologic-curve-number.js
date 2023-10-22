var table = ui.import && ui.import("table", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/jaafarhadi/GCN250/GCN250Average"
    }) || ee.Image("users/jaafarhadi/GCN250/GCN250Average"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/jaafarhadi/GCN250/GCN250Dry"
    }) || ee.Image("users/jaafarhadi/GCN250/GCN250Dry"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/jaafarhadi/GCN250/GCN250Wet"
    }) || ee.Image("users/jaafarhadi/GCN250/GCN250Wet"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/jaafarhadi/GCN250/GCN250m"
    }) || ee.Image("users/jaafarhadi/GCN250/GCN250m");
var countries_simple = ee.FeatureCollection(table);
//print(countries_simple);
/* 
Interactive viewer to view the GCN250m map 
- Allows the view of GCN250m for wet, dry, and average antecedent moisture conditions at 250m
- Allows the zooming to individual countries
- Clickable map that indicates the **current land cover**
*/
// Filter input country 
var countries = countries_simple;
// Current version 
var cur_version = '1.0';
var use_pnv = false;
//var nr_class = 75; // Number of currently mapped classes
// Import the layers
var GCN250_average = ee.Image(image);
var GCN250_dry = ee.Image(image2);
var GCN250_wet = ee.Image(image3);
//var CN_250 = ee.Image(image4)
// ------------------------------------------------------- //
// // Define SLD style of discrete intervals to apply to the image.
var colours_average = 
'<RasterSymbolizer>' +
' <ColorMap  type="intervals" extended="false" >' +
    '<ColorMapEntry color="#002de1" quantity="70" label="70"/>' +
    '<ColorMapEntry color="#d95049" quantity="73" label="73"/>' +
    '<ColorMapEntry color="#c6ff53" quantity="75" label="75"/>' +
    '<ColorMapEntry color="#eaa03f" quantity="77" label="77"/>' +
    '<ColorMapEntry color="#98fae7" quantity="77" label="79"/>' +
    '<ColorMapEntry color="#5bb5ff" quantity="81" label="81"/>' +
    '<ColorMapEntry color="#a59283" quantity="83" label="83"/>' +
    '<ColorMapEntry color="#fffce1" quantity="85" label="85"/>' +
    '<ColorMapEntry color="#99ddf7" quantity="87" label="87"/>' +
    '<ColorMapEntry color="#1da2d8" quantity="89" label="89"/>' +
    '<ColorMapEntry color="#7fcdff" quantity="100" label="100"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
 var colours_dry =
'<RasterSymbolizer>' +
' <ColorMap  type="intervals" extended="false" >' +
    '<ColorMapEntry color="#002de1" quantity="40" label="42"/>' +
    '<ColorMapEntry color="#d95049" quantity="45" label="45"/>' +
    '<ColorMapEntry color="#c6ff53" quantity="48" label="48"/>' +
    '<ColorMapEntry color="#eaa03f" quantity="51" label="51"/>' +
    '<ColorMapEntry color="#98fae7" quantity="54" label="54"/>' +
    '<ColorMapEntry color="#5bb5ff" quantity="58" label="58"/>' +
    '<ColorMapEntry color="#a59283" quantity="61" label="61"/>' +
    '<ColorMapEntry color="#fffce1" quantity="64" label="64"/>' +
    '<ColorMapEntry color="#99ddf7" quantity="67" label="67"/>' +
    '<ColorMapEntry color="#1da2d8" quantity="70" label="70"/>' +
    '<ColorMapEntry color="#7fcdff" quantity="80" label="80"/>' +
    '<ColorMapEntry color="#4ce6e6" quantity="100" label="100"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
 var colours_wet =
 '<RasterSymbolizer>' +
' <ColorMap  type="intervals" extended="false" >' +
    '<ColorMapEntry color="#002de1" quantity="80" label="81"/>' +
    '<ColorMapEntry color ="#d95049" quantity="83" label="83"/>' +
    '<ColorMapEntry color="#c6ff53" quantity="85" label="85"/>' +
    '<ColorMapEntry color="#eaa03f" quantity="87" label="87"/>' +
    '<ColorMapEntry color="#98fae7" quantity="89" label="89"/>' +
    '<ColorMapEntry color="#5bb5ff" quantity="92" label="92"/>' +
    '<ColorMapEntry color="#a59283" quantity="95" label="95"/>' +
    '<ColorMapEntry color="#4ce6e6" quantity="100" label="100"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
// Initialize the map.
// ===================
var map = ui.Map();
var CN = image2;
var vis = {min:40, max:70,palette: ['Red','SandyBrown','Yellow','LimeGreen','DarkBlue']};
Map.addLayer(CN, vis, 'CN'); 
// Default entries
var what = null;
var cur_image = null;
var cur_colours = null;
var outlines = null;
// ------------------------------------------ //
//              Create the UI
// ------------------------------------------ //
Map.setControlVisibility({all: false, layerList: true, zoomControl:true, scaleControl:true,mapTypeControl:true,fullscreenControl:true});
// ---- Countries selector --- //
var refocus = function(co){
  Map.clear(); // Clear the map
  if(cur_image !== null){
    Map.addLayer(cur_image.sldStyle(cur_colours), {}, what);    // Redraw map
  }
// -------------------- mean per country ------------------------//
  var selected_country = countries.filterMetadata('country_na','equals', co);
//   var country_mean = cur_image.reduceRegion({
//   reducer: ee.Reducer.mean(),
//   geometry: selected_country.geometry(),
//   scale: 250,
//   maxPixels: 1e9
// }); 
// print(country_mean);
  // Create an empty image into which to paint the features, cast to byte.
  var empty = ee.Image().byte();
  // Paint the edges with different colors and widths.
  outlines = empty.paint({
    featureCollection: selected_country,
    color: 0,
    width: 2
  }).rename('country');
  Map.addLayer(outlines, {palette: '#000000'}, co);
  Map.centerObject(selected_country);
  LCquery(); 
 // Enable the LC query script again
};
// Define the panel
var panel = ui.Panel({ style: {width: '300px'} });
// Set title
panel.add(ui.Label({value:'GCN250m: Global Hydrologic Curve Number Explorer',
  style: {fontSize:'24px', padding: '4px', color:'darkblue', fontWeight:"bold", textAlign: "center"} }));
// Add description
panel.add(ui.Label({
  value: "This interface allows users to visualize the gridded hydrologic curve number dataset at ~250m resolution globally. Use the mouse-wheel to zoom in and out and click the map to query a wet, dry, or average antcedent runoff conditions.You can also zoom to a specific country of interest. ",
  style: {padding: '5px',textAlign: "left", fontSize:'11px', border: '1px solid black'}
}));
// Add some information on the current version
panel.add(ui.Label({
  value: "Version " + cur_version,
  style: {fontSize:'14px', padding: '0px', color:'black', fontWeight:"bold", textAlign: "left"} 
}));
// Number of currently mapped classes
panel.add(ui.Label({
  value: "Please cite: Jaafar, H. H., Ahmad, F. A., & El Beyrouthy, N. (2019). GCN250, new global gridded curve numbers for hydrologic modeling and design. Scientific data, 6(1), 1-9. https://www.nature.com/articles/s41597-019-0155-x " ,
  style: {fontSize:'14px', padding: '0px', color:'black', fontWeight:"normal", textAlign: "left"} 
}));
  var layers = {
    'GCN250_average': 'GCN250_average',
    'GCN250_dry': 'GCN250_dry',
    'GCN250_wet': 'GCN250_wet'
   // 'CN_250': 'CN_250'
    };
// Create a select box that allows users to select either the average, dry, or wet conditions
panel.add(ui.Label({value: 'Select layer:', style: {fontWeight:"bold"}  }));
// Selection
var select = ui.Select({
  items: Object.keys(layers),
  placeholder: 'Choose a runoff condition...',
  onChange: function(key) {
    Map.clear(); // Clear the map
    if(layers[key] == 'GCN250_average'){
      what = 'GCN250_average ';
      cur_image = GCN250_average; 
      cur_colours = colours_average;//{palette: ['Red','SandyBrown','Yellow','LimeGreen','DarkBlue'], min: 70, max: 90};
    } else if(layers[key] == 'GCN250_dry') {
      what = 'GCN250_dry';
      cur_image = GCN250_dry; 
      cur_colours = colours_dry // {palette: ['Red','SandyBrown','Yellow','LimeGreen','DarkBlue'], min: 40, max: 70};
    } else if(layers[key] == 'GCN250_wet') {
      what = 'GCN250_wet ';
      cur_image = GCN250_wet; 
      cur_colours = colours_wet // {palette: ['Red','SandyBrown','Yellow','LimeGreen','DarkBlue'], min: 85, max:95};
  // } else if(layers[key] == 'CN_250') {
  //     what = 'CN Average, Dry & Wet';
  //     cur_image = CN_250; 
  //     cur_colours = {bands: ['Average', 'Dry', 'Wet']};
   } 
//var map = ui.Map();
    Map.addLayer(cur_image.sldStyle(cur_colours), {}, what);
    // Add country outline if existing
    if(outlines !== null){Map.addLayer(outlines, {palette: '#000000'}, 'Country' ); }
    LCquery(); // Add the query script again
  }
});
panel.add(select);
// --------------------------- //
// Hint on layer selection
var hint = ui.Label({value:'Hint: Layer transparency can be changed at the top-right of the screen (layers box)!',style:{fontSize:'9px'}});
panel.add(hint);
// Choose and zoom to a country
panel.add(ui.Label({value: 'Zoom to Country:',  style: {fontWeight:"bold"}  }));
// Create drop down selection
var vizParams = { color: 'grey', opacity: 0.1 };
var palette   = ['FF0000', '00FF00', '0000FF'];
// get country names
var names = countries.aggregate_array('country_na').sort();
// initialize combobox and fire up the redraw function
var select = ui.Select({items: names.getInfo(), onChange: refocus });
select.setPlaceholder('Choose a country ...'); 
panel.add(select);
// ---- Land cover query --- //
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.absolute(),
  style: {width: '680px', height: '40px', position: 'top-center', border: '3px solid black' } 
});
// Add a label to the panel.
inspector.add(ui.Label('Choose an antecedent runoff condition layer to display and click on the map to query the curve number.'));
// --- Clicking --- //
var LCquery = function(){
  // Register a callback on the map to be invoked when the map is clicked.
  Map.onClick(function(coords){
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  // Extract the land cover - a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var ex = cur_image.reduce(ee.Reducer.mode());
  var sampledPoint = ex.reduceRegion(ee.Reducer.mode(), point, 110);
  var computedValue = sampledPoint.get('mode');
// Add a red dot to the map where the user clicked.
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result){
    inspector.clear();
    computedValue = what + ' :' + ee.String(ee.Number(result).int16()).getInfo();
    // Add a label with the results from the server.
    var name_format = ui.Label({value: computedValue, style: {fontWeight: 'bold',textAlign: 'center',stretch: 'horizontal'} });
    var p = ui.Panel([name_format] );
    p.setLayout(ui.Panel.Layout.absolute());
    p.style({position: 'top-center', whiteSpace:'nowrap' });
    inspector.add(p);
    });
  });
};
// Disclaimer | CREDITS //
var space1 = ui.Label('______________________________');
// Create a hyperlink to an external reference.
var class_manual = ui.Label('Curve numbers for Hydrologic Runoff based on GLCC',{},"https://www.copernicus.eu/en/land-cover-climate-change-initiative");
var manuscript = ui.Label('Manuscript',{},"https://www.nature.com/articles/s41597-019-0155-x");
var manuscriptPanel = ui.Panel([ui.Label('For more information:', {fontWeight: 'bold'}),class_manual, manuscript]);
// Download button for layer
var download = ui.Label('Download PDF',{},"https://www.nature.com/articles/s41597-019-0155-x.pdf");
var code = ui.Label('Code',{},"https://github.com/Martin-Jung/Habitatmapping");
// Contact
var contact = ui.Label('Contact',{},"mailto:hj01-at-aub.edu.lb");
var space2 = ui.Label('______________________________');
// Disclaimers authors 
panel.add(space1);
panel.add(manuscriptPanel);
panel.add(download);
//panel.add(code);
panel.add(contact);
panel.add(space2);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Absolute layout
ui.root.setLayout(ui.Panel.Layout.absolute());
// Add panel to UI root
ui.root.add(panel);
// Add inspector box to root
ui.root.add(inspector);