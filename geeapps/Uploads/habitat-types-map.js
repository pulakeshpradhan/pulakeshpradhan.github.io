var countries_simple = ui.import && ui.import("countries_simple", "table", {
      "id": "users/Uploads/habitattypes/countries_polygon"
    }) || ee.FeatureCollection("users/Uploads/habitattypes/countries_polygon");
/*
Interactive viewer to view the IUCN habitat types map 
- Allows the view of both level 1 and level 2 classification at 100m
- Allows the zooming to individual countries
- Clickable map that indicates the current land cover
Martin Jung (c) 2019
Email: martinjung -at - zoho.com
Licence: MIT
*/
// Filter input country Fusion Table
var countries = ee.FeatureCollection(countries_simple).filterMetadata('Country','not_equals','Antarctica');
// Current version 
var cur_version = 'ver004';
var use_pnv = false;
var nr_class = 75; // Number of currently mapped classes
// Import the layers
var level1 = ee.Image("users/Uploads/habitattypes/iucn_habitatclassification_composite_lvl1_" + cur_version);
var level2 = ee.Image("users/Uploads/habitattypes/iucn_habitatclassification_composite_lvl2_" + cur_version);
// PNV
var level1_pnv = ee.Image("users/Uploads/habitattypes/iucn_habitatclassification_composite_pnv_lvl1_ver" + cur_version);
var level2_pnv = ee.Image("users/Uploads/habitattypes/iucn_habitatclassification_composite_pnv_lvl2_ver" + cur_version);
// Build new composite
var buildComposite = function(year, level, cur_version){
  // If the year is after 2015, mask the composite layer to only those grid cells with recorded change
  if(year == 2016){
    // Create 2016 composite
    // Build previous years
    var comp2015 = ee.Image('users/Uploads/habitattypes/iucn_habitatclassification_composite_lvl' + level+"_ver" + cur_version );
    var change2016 = ee.Image('users/Uploads/habitattypes/changemasks2016/iucn_habitatclassification_2016changemask_lvl' + level+"_ver" + cur_version);
    // Create 2016 composite
    change2016 = change2016.select(['comp2016']);
    var cur_image = updateComposite(comp2015,change2016); 
  } 
  if(year == 2017){
    // Build previous years
    var comp2015 = ee.Image('users/Uploads/habitattypes/iucn_habitatclassification_composite_lvl' + level+"_ver" + cur_version );
    var change2016 = ee.Image('users/Uploads/habitattypes/changemasks2016/iucn_habitatclassification_2016changemask_lvl' + level+"_ver" + cur_version);
    var change2017 = ee.Image('users/Uploads/habitattypes/changemasks2017/iucn_habitatclassification_2017changemask_lvl' + level+"_ver" + cur_version);
    // Create 2017 composite
    change2016 = change2016.select(['comp2016']);
    change2017 = change2017.select(['comp2017']);
    var comp2016 = updateComposite(comp2015,change2016);
    var cur_image = updateComposite(comp2016,change2017);
  }
  if(year == 2018){
    // Build previous years
    var comp2015 = ee.Image('users/Uploads/habitattypes/iucn_habitatclassification_composite_lvl' + level+"_ver" + cur_version );
    var change2016 = ee.Image('users/Uploads/habitattypes/changemasks2016/iucn_habitatclassification_2016changemask_lvl' + level+"_ver" + cur_version);
    var change2017 = ee.Image('users/Uploads/habitattypes/changemasks2017/iucn_habitatclassification_2017changemask_lvl' + level+"_ver" + cur_version);
    var change2018 = ee.Image('users/Uploads/habitattypes/changemasks2018/iucn_habitatclassification_2018changemask_lvl' + level+"_ver" + cur_version);
    // Create 2018 composite
    change2016 = change2016.select(['comp2016']);
    change2017 = change2017.select(['comp2017']);
    change2018 = change2018.select(['comp2018']);
    var comp2016 = updateComposite(comp2015,change2016);
    var comp2017 = updateComposite(comp2016,change2017);
    var cur_image = updateComposite(comp2017,change2018);
  }
  if(year == 2019){
    // Build previous years
    var comp2015 = ee.Image('users/Uploads/habitattypes/iucn_habitatclassification_composite_lvl' + level+"_ver" + cur_version );
    var change2016 = ee.Image('users/Uploads/habitattypes/changemasks2016/iucn_habitatclassification_2016changemask_lvl' + level+"_ver" + cur_version);
    var change2017 = ee.Image('users/Uploads/habitattypes/changemasks2017/iucn_habitatclassification_2017changemask_lvl' + level+"_ver" + cur_version);
    var change2018 = ee.Image('users/Uploads/habitattypes/changemasks2018/iucn_habitatclassification_2018changemask_lvl' + level+"_ver" + cur_version);
    var change2019 = ee.Image('users/Uploads/habitattypes/changemasks2019/iucn_habitatclassification_2019changemask_lvl' + level+"_ver" + cur_version);
    // Create 2018 composite
    change2016 = change2016.select(['comp2016']);
    change2017 = change2017.select(['comp2017']);
    change2018 = change2018.select(['comp2018']);
    change2019 = change2018.select(['comp2019']);
    var comp2016 = updateComposite(comp2015,change2016);
    var comp2017 = updateComposite(comp2016,change2017);
    var comp2018 = updateComposite(comp2017,change2018);
    var cur_image = updateComposite(comp2018,change2019);
  }
  return( cur_image );
};
// ------------------------------------------------------- //
// Define SLD style of discrete intervals to apply to the image.
var colours_level1 = 
'<RasterSymbolizer>' +
 ' <ColorMap  type="intervals" extended="false" >' +
    '<ColorMapEntry color="#002de1" quantity="0" label="Water"/>' +
    '<ColorMapEntry color="#0a941c" quantity="100" label="Forest"/>' +
    '<ColorMapEntry color="#c6ff53" quantity="200" label="Savanna"/>' +
    '<ColorMapEntry color="#eaa03f" quantity="300" label="Shrubland"/>' +
    '<ColorMapEntry color="#98fae7" quantity="400" label="Grassland"/>' +
    '<ColorMapEntry color="#5bb5ff" quantity="500" label="Wetland (inland)"/>' +
    '<ColorMapEntry color="#a59283" quantity="600" label="Rocky areas"/>' +
    '<ColorMapEntry color="#fffce1" quantity="800" label="Desert"/>' +
    '<ColorMapEntry color="#99ddf7" quantity="900" label="Marine - Neritic"/>' +
    '<ColorMapEntry color="#1da2d8" quantity="1000" label="Marine - Oceanic"/>' +
    '<ColorMapEntry color="#7fcdff" quantity="1100" label="Marine - Deep Ocean Floor"/>' +
    '<ColorMapEntry color="#4ce6e6" quantity="1200" label="Marine - Intertidal"/>' +
    '<ColorMapEntry color="#d95049" quantity="1400" label="Artificial - Terrestrial"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
var colours_level2 = 
'<RasterSymbolizer>' +
 '<ColorMap  type="intervals" extended="false" >' +
    '<ColorMapEntry color="#002de1" quantity="0" label="Water"/>' +
    '<ColorMapEntry color="#0a941c" quantity="100" label="Forest"/>' +
    '<ColorMapEntry color="#115e4e" quantity="101" label="Forest - Boreal"/>' +
    '<ColorMapEntry color="#07a187" quantity="102" label="Forest - Subarctic"/>' +
    '<ColorMapEntry color="#00fac0" quantity="103" label="Forest - Subantarctic"/>' +
    '<ColorMapEntry color="#27a170" quantity="104" label="Forest - Temperate"/>' +
    '<ColorMapEntry color="#9df941" quantity="105" label="Forest - Subtropical-tropical dry"/>' +
    '<ColorMapEntry color="#2af434" quantity="106" label="Forest - Subtropical-tropical moist lowland"/>' +
    '<ColorMapEntry color="#a0fecc" quantity="107" label="Forest - Subtropical-tropical mangrove vegetation"/>' +
    '<ColorMapEntry color="#677e2d" quantity="108" label="Forest - Subtropical-tropical swamp"/>' +
    '<ColorMapEntry color="#00c410" quantity="109" label="Forest - Subtropical-tropical moist montane"/>' +
    '<ColorMapEntry color="#c6ff53" quantity="200" label="Savanna"/>' +
    '<ColorMapEntry color="#f5e936" quantity="201" label="Savanna - Dry"/>' +
    '<ColorMapEntry color="#cdff27" quantity="202" label="Savanna - Moist"/>' +
    '<ColorMapEntry color="#eaa03f" quantity="300" label="Shrubland"/>' +
    '<ColorMapEntry color="#645800" quantity="301" label="Shrubland - Subarctic"/>' +
    '<ColorMapEntry color="#7b7a60" quantity="302" label="Shrubland - Subantarctic"/>' +
    '<ColorMapEntry color="#84a79b" quantity="303" label="Shrubland - Boreal"/>' +
    '<ColorMapEntry color="#9addd4" quantity="304" label="Shrubland - Temperate"/>' +
    '<ColorMapEntry color="#ffe97b" quantity="305" label="Shrubland - Subtropical-tropical dry"/>' +
    '<ColorMapEntry color="#f0a625" quantity="306" label="Shrubland - Subtropical-tropical moist"/>' +
    '<ColorMapEntry color="#ce9bc2" quantity="307" label="Shrubland - Subtropical-tropical high altitude"/>' +
    '<ColorMapEntry color="#7f1dd5" quantity="308" label="Shrubland - Mediterranean-type"/>' +
    '<ColorMapEntry color="#98fae7" quantity="400" label="Grassland"/>' +
    '<ColorMapEntry color="#bdeed8" quantity="401" label="Grassland - Tundra"/>' +
    '<ColorMapEntry color="#adc4c0" quantity="402" label="Grassland - Subarctic"/>' +
    '<ColorMapEntry color="#264758" quantity="403" label="Grassland - Subantarctic"/>' +
    '<ColorMapEntry color="#33b988" quantity="404" label="Grassland - Temperate"/>' +
    '<ColorMapEntry color="#fff5cb" quantity="405" label="Grassland - Subtropical-tropical dry"/>' +
    '<ColorMapEntry color="#89e8f0" quantity="406" label="Grassland - Subtropical-tropical seasonally wet or flooded"/>' +
    '<ColorMapEntry color="#facbff" quantity="407" label="Grassland - Subtropical-tropical high altitude"/>' +
    '<ColorMapEntry color="#5bb5ff" quantity="500" label="Wetlands (inland)"/>' +
    '<ColorMapEntry color="#00fafa" quantity="501" label="Wetlands (inland) - Permanent rivers streams creeks"/>' +
    '<ColorMapEntry color="#d6a0f9" quantity="502" label="Wetlands (inland) - Seasonal/intermittent/irregular rivers/streams/creeks"/>' +
    '<ColorMapEntry color="#bf2ae8" quantity="503" label="Wetlands (inland) - Shrub dominated wetlands"/>' +
    '<ColorMapEntry color="#314872" quantity="504" label="Wetlands (inland) - Bogs/marshes/swamps/fens/peatlands"/>' +
    '<ColorMapEntry color="#0e77d9" quantity="505" label="Wetlands (inland) - Permanent freshwater lakes"/>' +
    '<ColorMapEntry color="#6e96c4" quantity="506" label="Wetlands (inland) - Seasonal/intermittent freshwater lakes (over 8 ha)"/>' +
    '<ColorMapEntry color="#00add8" quantity="507" label="Wetlands (inland) - Permanent freshwater marshes/pools (under 8 ha)"/>' +
    '<ColorMapEntry color="#218ed6" quantity="508" label="Wetlands (inland) - Seasonal/intermittent freshwater marshes/pools (under 8 ha)"/>' +
    '<ColorMapEntry color="#301f99" quantity="509" label="Wetlands (inland) - Freshwater springs and oases"/>' +
    '<ColorMapEntry color="#a1e6ec" quantity="510" label="Wetlands (inland) - Tundra wetlands"/>' +
    '<ColorMapEntry color="#c7e1e4" quantity="511" label="Wetlands (inland) - Alpine wetlands"/>' +
    '<ColorMapEntry color="#f9e9d4" quantity="512" label="Wetlands (inland) - Geothermal wetlands"/>' +
    '<ColorMapEntry color="#0025fc" quantity="513" label="Wetlands (inland) - Permanent inland deltas"/>' +
    '<ColorMapEntry color="#166b95" quantity="514" label="Wetlands (inland) - Permanent saline brackish or alkaline lakes"/>' +
    '<ColorMapEntry color="#46a4c0" quantity="515" label="Wetlands (inland) - Seasonal/intermittent saline brackish or alkaline lakes and flats"/>' +
    '<ColorMapEntry color="#3e71e0" quantity="516" label="Wetlands (inland) - Permanent /saline / brackish or alkaline marshes/pools"/>' +
    '<ColorMapEntry color="#9c75d0" quantity="517" label="Wetlands (inland) - Seasonal/intermittent /saline / brackish or alkaline marshes/pools"/>' +
    '<ColorMapEntry color="#ff01bc" quantity="518" label="Wetlands (inland) / Karst and other subterranean hydrological systems"/>' +
    '<ColorMapEntry color="#a59283" quantity="600" label="Rocky Areas"/>' +
    '<ColorMapEntry color="#fffce1" quantity="800" label="Desert"/>' +
    '<ColorMapEntry color="#ffb701" quantity="801" label="Desert - Hot"/>' +
    '<ColorMapEntry color="#e4e9d4" quantity="802" label="Desert - Temperate"/>' +
    '<ColorMapEntry color="#daedf5" quantity="803" label="Desert - Cold"/>' +
    '<ColorMapEntry color="#99ddf7" quantity="900" label="Marine - Neritic"/>' +
    '<ColorMapEntry color="#d1ecf7" quantity="901" label="Marine - Neritic Pelagic"/>' +
    '<ColorMapEntry color="#fd7c6e" quantity="908" label="Marine - Coral Reefs"/>' +
    '<ColorMapEntry color="#86a475" quantity="909" label="Marine - Seagrass (submerged)"/>' +
    '<ColorMapEntry color="#1da2d8" quantity="1000" label="Marine - Oceanic"/>' +
    '<ColorMapEntry color="#1781ac" quantity="1001" label="Marine - Epipelagic"/>' +
    '<ColorMapEntry color="#0e516c" quantity="1002" label="Marine - Mesopelagic"/>' +
    '<ColorMapEntry color="#083040" quantity="1003" label="Marine - Bathypelagic"/>' +
    '<ColorMapEntry color="#021015" quantity="1004" label="Marine - Abyssopelagic"/>' +
    '<ColorMapEntry color="#7fcdff" quantity="1100" label="Marine - Deep Ocean Floor"/>' +
    '<ColorMapEntry color="#1199d1" quantity="1101" label="Marine - Continental Slope/Bathyl zone"/>' +
    '<ColorMapEntry color="#60bde3" quantity="1102" label="Marine - Abyssal Plain"/>' +
    '<ColorMapEntry color="#1a91c2" quantity="1103" label="Marine - Abyssal Mountains/Hills"/>' +
    '<ColorMapEntry color="#027495" quantity="1104" label="Marine - Hadal/Deep Sea Trench"/>' +
    '<ColorMapEntry color="#6baed6" quantity="1105" label="Marine - Seamounts"/>' +
    '<ColorMapEntry color="#7F00FF" quantity="1106" label="Marine - Deep Sea Vent"/>' +
    '<ColorMapEntry color="#4ce6e6" quantity="1200" label="Marine - Intertidal"/>' +
    '<ColorMapEntry color="#3212b3" quantity="1206" label="Marine - Tidepools"/>' +
    '<ColorMapEntry color="#7cd9cc" quantity="1207" label="Marine - Mangroves submerged Roots"/>' +
    '<ColorMapEntry color="#d95049" quantity="1400" label="Artificial - Terrestrial"/>' +
    '<ColorMapEntry color="#ffa083" quantity="1401" label="Arable land"/>' +
    '<ColorMapEntry color="#ff83ca" quantity="1402" label="Pastureland"/>' +
    '<ColorMapEntry color="#FF0800" quantity="1403" label="Plantations"/>' +
    '<ColorMapEntry color="#ddcb25" quantity="1404" label="Rural Gardens"/>' +
    '<ColorMapEntry color="#000000" quantity="1405" label="Urban Areas"/>' +
    '<ColorMapEntry color="#ff1601" quantity="1406" label="Subtropical/Tropical Heavily Degraded Former Forest"/>' +
    '<ColorMapEntry color="#ffffff" quantity="1700" label="Unknown"/>' +
    '</ColorMap>' +
'</RasterSymbolizer>';
// Construct lookup tables with ids for both levels
var lookup_table = ee.Dictionary({
  "100" : "1. Forest", 
  "101" : "1.1 Forest - Boreal",
  "102" : "1.2 Forest - Subarctic",
  "103" : "1.3 Forest - Subantarctic",
  "104" : "1.4 Forest - Temperate",
  "105" : "1.5 Forest - Subtropical-tropical dry",
  "106" : "1.6 Forest - Subtropical-tropical moist lowland",
  "107" : "1.7 Forest - Subtropical-tropical mangrove vegetation",
  "108" : "1.8 Forest - Subtropical-tropical swamp",
  "109" : "1.9 Forest - Subtropical-tropical moist montane",
  "200" : "2. Savanna",
  "201" : "2.1 Savanna - Dry",
  "202" : "2.2 Savanna - Moist",
  "300" : "3. Shrubland",
  "301" : "3.1 Shrubland - Subarctic",
  "302" : "3.2 Shrubland - Subantarctic",
  "303" : "3.3 Shrubland - Boreal",
  "304" : "3.4 Shrubland - Temperate",
  "305" : "3.5 Shrubland - Subtropical-tropical dry",
  "306" : "3.6 Shrubland - Subtropical-tropical moist",
  "307" : "3.7 Shrubland - Subtropical-tropical high altitude",
  "308" : "3.8 Shrubland - Mediterranean-type",
  "400" : "4. Grassland",
  "401" : "4.1 Grassland - Tundra",
  "402" : "4.2 Grassland - Subarctic",
  "403" : "4.3 Grassland - Subantarctic",
  "404" : "4.4 Grassland - Temperate",
  "405" : "4.5 Grassland - Subtropical-tropical dry",
  "406" : "4.6 Grassland - Subtropical-tropical seasonally wet or flooded",
  "407" : "4.7 Grassland - Subtropical-tropical high altitude",
  "500" : "5. Wetland (inland)",
  "501" : "5.1 Wetlands (inland) - Permanent rivers streams creeks",
  "502" : "5.2 Wetlands (inland) - Seasonal/intermittent/irregular rivers/streams/creeks",
  "503" : "5.3 Wetlands (inland) - Shrub dominated wetlands",
  "504" : "5.4 Wetlands (inland) - Bogs/marshes/swamps/fens/peatlands",
  "505" : "5.5 Wetlands (inland) - Permanent freshwater lakes",
  "506" : "5.6 Wetlands (inland) - Seasonal/intermittent freshwater lakes (over 8 ha)",
  "507" : "5.7 Wetlands (inland) - Permanent freshwater marshes/pools (under 8 ha)",
  "508" : "5.8 Wetlands (inland) - Seasonal/intermittent freshwater marshes/pools (under 8 ha)",
  "509" : "5.9 Wetlands (inland) - Freshwater springs and oases",
  "510" : "5.10 Wetlands (inland) - Tundra wetlands",
  "511" : "5.11 Wetlands (inland) - Alpine wetlands",
  "512" : "5.12 Wetlands (inland) - Geothermal wetlands",
  "513" : "5.13 Wetlands (inland) - Permanent inland deltas",
  "514" : "5.14 Wetlands (inland) - Permanent saline brackish or alkaline lakes",
  "515" : "5.15 Wetlands (inland) - Seasonal/intermittent saline brackish or alkaline lakes and flats",
  "516" : "5.16 Wetlands (inland) - Permanent /saline / brackish or alkaline marshes/pools",
  "517" : "5.17 Wetlands (inland) - Seasonal/intermittent /saline / brackish or alkaline marshes/pools",
  "518" : "5.18 Wetlands (inland) / Karst and other subterranean hydrological systems",
  "600" : "6. Rocky areas",
  "800" : "8. Desert",
  "801" : "8.1 Desert - Hot",
  "802" : "8.2 Desert - Temperate",
  "803" : "8.3 Desert - Cold",
  "900" : "9. Marine - Neritic",
  "901" : "9.1 Marine - Neritic Pelagic",
  "908" : "9.8 Marine - Coral Reefs",
  "909" : "9.9 Marine - Seagrass (submerged)",
  "1000" : "10. Marine - Oceanic",
  "1001" : "10.1 Marine - Epipelagic",
  "1002" : "10.2 Marine - Mesopelagic",
  "1003" : "10.3 Marine - Bathypelagic",
  "1004" : "10.4 Marine - Abyssopelagic",
  "1100" : "11. Marine - Deep Ocean Floor",
  "1101" : "11.1 Marine - Continental Slope/Bathyl zone",
  "1102" : "11.2 Marine - Abyssal Plain ",
  "1103" : "11.3 Marine - Abyssal Mountains/Hills ",
  "1104" : "11.4 Marine - Hadal/Deep Sea Trench ",
  "1105" : "11.5 Marine - Seamounts ",
  "1106" : "11.6 Marine - Deep Sea Vent ",
  "1200" : "12. Marine - Intertidal",
  "1206" : "12.6 Marine - Tidepools",
  "1207" : "12.7 Marine - Mangroves submerged Roots",
  "1400": "14. Artificial - Terrestrial",
  "1401": "14.1 Arable land",
  "1402": "14.2 Pastureland",
  "1403": "14.3 Plantations",
  "1404": "14.4 Rural Gardens",
  "1405": "14.5 Urban Areas",
  "1406": "14.6 Subtropical/Tropical Heavily Degraded Former Forest",
  "1700": "17. Unknown"
});
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
    Map.addLayer(cur_image.sldStyle(cur_colours), {}, what);   // Redraw map
  }
  // -------------------- //
  //Map.addLayer(cur_image.sldStyle(cur_colours), {}, 'IUCN habitat types Level 1');
  var selected_country = countries.filterMetadata('Country','equals', co);
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
  LCquery() // Enable the LC query script again
};
// Define the panel
var panel = ui.Panel({ style: {width: '250px'} });
// Set title
panel.add(ui.Label({value:'Global habitat type map',
  style: {fontSize:'24px', padding: '4px', color:'darkblue', fontWeight:"bold", textAlign: "center"} }));
// Add description
panel.add(ui.Label({
  value: "This interface allows users to visualize the global habitat type map at level 1 or 2 at ~100m resolution globally. Use the mouse-wheel to zoom in and out and click the map to query a specific class. There is furthermore the option to zoom to a specific country of interest. ",
  style: {padding: '1px',textAlign: "left", fontSize:'11px', border: '1px solid black'}
}));
// Add some information on the current version
panel.add(ui.Label({
  value: "Version " + cur_version,
  style: {fontSize:'14px', padding: '0px', color:'black', fontWeight:"bold", textAlign: "left"} 
}));
// Number of currently mapped classes
panel.add(ui.Label({
  value: "Total number of mapped classes: " + nr_class,
  style: {fontSize:'14px', padding: '0px', color:'black', fontWeight:"normal", textAlign: "left"} 
}));
if(use_pnv){
  var layers = {
  'Level 1': 'lvl1',
  'Level 1 - PNV': 'lvl1_pnv',
  'Level 2': 'lvl2',
  'Level 2 - PNV': 'lvl2_pnv'
  };
} else {
  var layers = {
    'Level 1': 'lvl1',
    'Level 2': 'lvl2'
    };
}
// Create a select box that allows users to select either the level 1 or level 2 map
panel.add(ui.Label({value: 'Select layer:', style: {fontWeight:"bold"}  }));
// Selection
var select = ui.Select({
  items: Object.keys(layers),
  placeholder: 'Choose a level...',
  onChange: function(key) {
    Map.clear(); // Clear the map
    if(layers[key] == 'lvl1'){
      what = 'IUCN habitat types Level ' + 1;
      cur_image = level1; 
      cur_colours = colours_level1;
    } else if(layers[key] == 'lvl2') {
      what = 'IUCN habitat types Level ' + 2;
      cur_image = level2; 
      cur_colours = colours_level2;
    } else if(layers[key] == 'lvl1_pnv') {
      what = 'IUCN PNV Level ' + 1;
      cur_image = level1_pnv; 
      cur_colours = colours_level2;
    } else if(layers[key] == 'lvl2_pnv') {
      what = 'IUCN PNV Level ' + 2;
      cur_image = level2_pnv; 
      cur_colours = colours_level2;
    } 
    Map.addLayer(cur_image.sldStyle(cur_colours), {}, what);
    // Add country outline if existing
    if(outlines !== null){Map.addLayer(outlines, {palette: '#000000'}, 'Country' ); }
    LCquery(); // Add the query script again
  }
});
panel.add(select);
// --------------------------- //
//buildComposite = function(year, level, cur_version)
// Create a select box that allows users to select a target year
/*
var years = {'2015':'2015','2016':'2016','2017':'2017','2018':'2018','2019':'2019'};
var yr_select = ui.Select({
  items: Object.keys(years),
  placeholder: 'Choose a level...',
  onChange: function(key) {
    Map.clear(); // Clear the map
    if(years[key] == '2015'){
      what = 'IUCN habitat types Level ' + 1;
      cur_image = buildComposite(); 
      cur_colours = colours_level1;
    } else if(years[key] == '2016') {
      what = 'IUCN habitat types Level ' + 2;
      cur_image = level2; 
      cur_colours = colours_level2;
    } else if(years[key] == '2017') {
      what = 'IUCN PNV Level ' + 1;
      cur_image = level1_pnv; 
      cur_colours = colours_level2;
    } else if(years[key] == '2018') {
      what = 'IUCN PNV Level ' + 2;
      cur_image = level2_pnv; 
      cur_colours = colours_level2;
    } else if(years[key] == '2019') {
      what = 'IUCN PNV Level ' + 2;
      cur_image = level2_pnv; 
      cur_colours = colours_level2;
    } 
    Map.addLayer(cur_image.sldStyle(cur_colours), {}, what);
    // Add country outline if existing
    if(outlines !== null){Map.addLayer(outlines, {palette: '#000000'}, 'Country' ); }
    LCquery(); // Add the query script again
  }
});
panel.add(yr_select);
*/
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
var names = ee.List( countries.aggregate_array('Country')).sort();
// initialize combobox and fire up the redraw function
var select = ui.Select({items: names.getInfo(), onChange: refocus });
select.setPlaceholder('Choose a country ...'); 
panel.add(select);
// ---- Land cover query --- //
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.absolute(),
  style: {width: '500px', height: '50px', position: 'top-center', border: '3px solid black' } 
});
// Add a label to the panel.
inspector.add(ui.Label('Choose a habitat type layer to display and click on the map to query the habitat type.'));
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
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result){
    inspector.clear();
    var name = lookup_table.getString( ee.String( ee.Number( result ).int16()) ).getInfo(); 
    // Add a label with the results from the server.
    var name_format = ui.Label({value: name, style: {fontWeight: 'bold',textAlign: 'center',stretch: 'horizontal'} });
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
var class_manual = ui.Label('IUCN Habitat type classification system',{},"https://www.iucnredlist.org/resources/habitat-classification-scheme");
var manuscript = ui.Label('Manuscript',{},"https://doi.org/10.1038/s41597-020-00599-8");
var manuscriptPanel = ui.Panel([ui.Label('For more information:', {fontWeight: 'bold'}),class_manual, manuscript]);
// Download button for layer
var download = ui.Label('Download',{},"http://doi.org/10.5281/zenodo.3925749");
var code = ui.Label('Code',{},"https://github.com/Martin-Jung/Habitatmapping");
// Contact
var contact = ui.Label('Contact',{},"mailto:jung-at-iiasa.ac.at");
var space2 = ui.Label('______________________________');
// Disclaimers authors 
panel.add(space1);
panel.add(manuscriptPanel);
panel.add(download);
panel.add(code);
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