var countries_simple = ui.import && ui.import("countries_simple", "table", {
      "id": "users/Uploads/habitattypes/countries_polygon"
    }) || ee.FeatureCollection("users/Uploads/habitattypes/countries_polygon");
/*
Interactive viewer to view the NatureMap prioritization outputs
- Allows to view the naturemap priority layers, subsetted to the 30% of terrestrial land area
- Allows the zooming to individual countries
Martin Jung (c) 2022
Email: martinjung -at - zoho.com
Licence: MIT
*/
// Filter input country Fusion Table
var countries = ee.FeatureCollection(countries_simple).filterMetadata('Country','not_equals','Antarctica');
// ------------------------ //
// Import the layers
// -- Biodiv --
var biodiv_biome = ee.Image("users/Uploads/naturemap/biodiversity/minshort_speciestargets_biome__esh10km_repruns10_ranked");
var biodiv_pa_biome = ee.Image("users/Uploads/naturemap/biodiversity/minshort_speciestargets_biome_withPA_esh10km_repruns10_ranked");
var biodiv = ee.Image("users/Uploads/naturemap/biodiversity/minshort_speciestargets_esh10km_repruns10_ranked");
var biodiv_pa = ee.Image("users/Uploads/naturemap/biodiversity/minshort_speciestargetswithPA_esh10km_repruns10_ranked");
// -- Biodiv Carbon--
var biodivcarbon_biome = ee.Image("users/Uploads/naturemap/biodiversitycarbon/minshort_speciestargets_biome__carbon__esh10km_repruns10_ranked");
var biodivcarbon_pa_biome = ee.Image("users/Uploads/naturemap/biodiversitycarbon/minshort_speciestargets_biome_withPA_carbon__esh10km_repruns10_ranked");
var biodivcarbon = ee.Image("users/Uploads/naturemap/biodiversitycarbon/minshort_speciestargets_carbon__esh10km_repruns10_ranked");
var biodivcarbon_pa = ee.Image("users/Uploads/naturemap/biodiversitycarbon/minshort_speciestargetswithPA_carbon__esh10km_repruns10_ranked");
// -- Biodiv water--
var biodivwater_biome = ee.Image("users/Uploads/naturemap/biodiversitywater/minshort_speciestargets_biome__water__esh10km_repruns10_ranked");
var biodivwater_pa_biome = ee.Image("users/Uploads/naturemap/biodiversitywater/minshort_speciestargets_biome_withPA_water__esh10km_repruns10_ranked");
var biodivwater = ee.Image("users/Uploads/naturemap/biodiversitywater/minshort_speciestargets_water__esh10km_repruns10_ranked");
var biodivwater_pa = ee.Image("users/Uploads/naturemap/biodiversitywater/minshort_speciestargetswithPA_water__esh10km_repruns10_ranked");
// -- Biodiv carbonwater--
var biodivcarbonwater_biome = ee.Image("users/Uploads/naturemap/biodiversitycarbonwater/minshort_speciestargets_biome__carbon__water__esh10km_repruns10_ranked");
var biodivcarbonwater_pa_biome = ee.Image("users/Uploads/naturemap/biodiversitycarbonwater/minshort_speciestargets_biome_withPA_carbon__water__esh10km_repruns10_ranked");
var biodivcarbonwater = ee.Image("users/Uploads/naturemap/biodiversitycarbonwater/minshort_speciestargets_carbon__water__esh10km_repruns10_ranked");
var biodivcarbonwater_pa = ee.Image("users/Uploads/naturemap/biodiversitycarbonwater/minshort_speciestargetswithPA_carbon__water__esh10km_repruns10_ranked");
// ------------------------ //
// Build new mask
var buildMask = function(image, target){
  var exp = 'b(0) <= ' + target;
  return(
    image.expression(exp).selfMask()
  );
};
// Define SLD style of discrete intervals to apply to the image.
var default_colours = {min: 1, max: 100, palette: ['7a0403','c92903','f56918','fbb938','c9ef34','74fe5d','1be5b5','35abf8','4662d8','30123b']};
var mask_colours = {min: 1, max: 1, palette: ['7a0403']};
// Default entries
var what = "Biodiversity, carbon and water";
var slidermin = 15;
var outlines = null;
var co = null;
var cur_colours = mask_colours;
var current = biodivcarbonwater_pa_biome;
var current_m = buildMask(current, 30);
Map.addLayer(current_m, mask_colours, what, true);
//Map.addLayer(biodivcarbon_pa, default_colours, 'biodivcarbonwater_pa', true);
// ------------------------------------------------------- //
// List of layers
var layers = {
'Biodiversity only': 'biodiv_biome',
//'Biodiversity + PA': 'biodiv_pa_biome',
'Biodiversity and carbon': 'biodivcarbon_biome',
//'Biodiversity and carbon + PA': 'biodivcarbon_pa_biome',
'Biodiversity and water': 'biodivwater_biome',
//'Biodiversity and water + PA': 'biodivwater_pa_biome',
'Biodiversity, carbon and water': 'biodivcarbonwater_biome',
//'Biodiversity, carbon and water + PA': 'biodivcarbonwater_pa_biome'
};
// ------------------------------------------ //
//              Create the UI
// ------------------------------------------ //
Map.setControlVisibility({all: false, layerList: true, zoomControl:true, scaleControl:true,mapTypeControl:true,fullscreenControl:true});
Map.setCenter(0, 20, 3);
// ---- Countries selector --- //
var refocus = function(co){
  Map.clear(); // Clear the map
  if(areaslider.getValue()==100){
    cur_colours = default_colours;
    current_m = current;
  } else {
    current_m = buildMask(current, areaslider.getValue());
    cur_colours = mask_colours;
  }
  Map.addLayer(current_m, cur_colours, what);
  // -------------------- //
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
};
// Define the panel
var panel = ui.Panel({ style: {width: '250px'} });
// Set title
panel.add(ui.Label({value:'Areas of global conservation value',
  style: {fontSize:'24px', padding: '4px', color:'darkblue', fontWeight:"bold", textAlign: "center"} }));
// Add description
panel.add(ui.Label({
  value: "Explore broad areas of conservation importance for biodiversity, carbon and water. All layers include biome-specific species targets to ensure sufficient coverage across biomes. See Jung et al. (2021) for more details.",
  style: {padding: '1px',textAlign: "left", fontSize:'11px', border: '1px solid black'}
}));
// Create a select box that allows users to select either the level 1 or level 2 map
panel.add(ui.Label({value: 'Select layer:', style: {fontWeight:"bold"}  }));
// Selection
var layerselect = ui.Select({
  items: Object.keys(layers),
  value: "Biodiversity, carbon and water",
  placeholder: 'Choose a layer',
  onChange: function(key) {
    Map.clear(); // Clear the map
    if(layers[key] == 'biodivcarbonwater_biome'){
      what = "Biodiversity, carbon and water";
      if(include_pa.getValue()===true){
        slidermin = 15;
        areaslider.setMin(slidermin);
        current = biodivcarbonwater_pa_biome; 
      } else {
        slidermin = 10;
        areaslider.setMin(slidermin);
        current = biodivcarbonwater_biome; 
      }
    } else if(layers[key] == 'biodivcarbon_biome') {
      what = "Biodiversity and carbon";
      if(include_pa.getValue()===true){
        slidermin = 15;
        areaslider.setMin(slidermin);
        current = biodivcarbon_pa_biome; 
      } else {
        slidermin = 10;
        areaslider.setMin(slidermin);
        current = biodivcarbon_biome; 
      }
    } else if(layers[key] == 'biodivwater_biome') {
      what = "Biodiversity and water";
      if(include_pa.getValue()===true){
        slidermin = 15;
        areaslider.setMin(slidermin);
        current = biodivwater_pa_biome; 
      } else {
        slidermin = 10;
        areaslider.setMin(slidermin);
        current = biodivwater_biome; 
      }
    } else if(layers[key] == 'biodiv_biome') {
      what = "Biodiversity only";
      if(include_pa.getValue()===true){
        slidermin = 10;
        areaslider.setMin(slidermin);
        current = biodiv_pa_biome; 
      } else {
        slidermin = 10;
        areaslider.setMin(slidermin);
        current = biodiv_biome; 
      }
    } 
    // Mask and get colours for subset
    if(areaslider.getValue()==100){
      cur_colours = default_colours;
      current_m = current;
    } else {
      current_m = buildMask(current, areaslider.getValue());
      cur_colours = mask_colours;
    }
    Map.addLayer(current_m, cur_colours, what);
    // Add country outline if existing
    if(outlines !== null){Map.addLayer(outlines, {palette: '#000000'}, 'Country' ); }
  },
  style: {width: '200px'}
});
panel.add(layerselect);
// Hint on layer selection
var hint = ui.Label({value:'Hint: Layer transparency can be changed at the top-right of the screen (layers box)!',style:{fontSize:'9px'}});
panel.add(hint);
// Area slider
var areaslider = ui.Slider({
  min: slidermin,
  max: 100,
  value: 30, step: 5,
  direction: 'horizontal',
  style: {width: '200px', minWidth: '200px'}
});
// Function that changes the opacity of layers
areaslider.onSlide(function(value){
  Map.clear(); // Clear the map
  if(areaslider.getValue()===100){
    cur_colours = default_colours;
    current_m = current;
  } else {
    current_m = buildMask(current, areaslider.getValue());
    cur_colours = mask_colours;
  }
  if(outlines!==null){
    Map.addLayer(outlines, {palette: '#000000'}, "Country");
  } 
  Map.addLayer(current_m, cur_colours, what); // add layer
});
panel.add(ui.Label({value: "Target area (% of land surface):", style: {fontWeight:"bold"} }));
panel.add(areaslider);
// Hint on layer selection
var hint2 = ui.Label({value:'Hint: Set to 100% to see the whole ranking!',style:{fontSize:'9px'}});
panel.add(hint2);
// Protected area checkbox
var include_pa = ui.Checkbox({
  label: "Build on current protected areas?",
  value: true
});
// Redraw layer in case the tickbox changes
include_pa.onChange(function(value){
  Map.clear(); // Clear the map
  // Reload current depending on choice
  if(layerselect.getValue() === 'Biodiversity, carbon and water'){
    if(value===true){
      slidermin = 15;
      areaslider.setMin(slidermin);
      current = biodivcarbonwater_pa_biome;
    } else {
      slidermin = 10;
      areaslider.setMin(slidermin);
      current = biodivcarbonwater_biome;
    }
  } else if(layerselect.getValue() === 'Biodiversity and carbon'){
    if(value===true){
      slidermin = 15;
      areaslider.setMin(slidermin);
      current = biodivcarbon_pa_biome;
    } else {
      slidermin = 10;
      areaslider.setMin(slidermin);
      current = biodivcarbon_biome;
    }
  } else if(layerselect.getValue() === 'Biodiversity and water'){
    if(value===true){
      slidermin = 15;
      areaslider.setMin(slidermin);
      current = biodivwater_pa_biome;
    } else {
      slidermin = 10;
      areaslider.setMin(slidermin);
      current = biodivwater_biome;
    }
  } else if(layerselect.getValue() === 'Biodiversity only'){
    if(value===true){
      slidermin = 15;
      areaslider.setMin(slidermin);
      current = biodiv_pa_biome;
    } else {
      slidermin = 10;
      areaslider.setMin(slidermin);
      current = biodiv_biome;
    }
  } 
  if(areaslider.getValue()===100){
    current_m = current;
    cur_colours = default_colours;
  } else {
    current_m = buildMask(current, areaslider.getValue());
    cur_colours = mask_colours;
  }
  Map.addLayer(current_m, cur_colours, what); // add layer
});
panel.add(include_pa);
// --------------------------- //
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
// Disclaimer | CREDITS //
var space1 = ui.Label('______________________________');
// Create a hyperlink to an external reference.
var citation = ui.Label({value:'Jung, M., Arnell, A., de Lamo, X. et al. Areas of global importance for conserving terrestrial biodiversity, carbon and water. Nat Ecol Evol 5, 1499–1509 (2021). DOI: 10.1038/s41559-021-01528-7', style:{fontSize:'11px'}});
var manuscript = ui.Label('Manuscript',{},"https://doi.org/10.1038/s41559-021-01528-7");
var manuscriptPanel = ui.Panel([ui.Label('For more information:', {fontWeight: 'bold'}),citation, manuscript]);
// Download button for layer
var download = ui.Label('Download layers',{},"https://zenodo.org/record/5006332");
// Contact
var contact = ui.Label('Contact',{},"mailto:jung@iiasa.ac.at");
var space2 = ui.Label('______________________________');
// Disclaimers authors 
panel.add(space1);
panel.add(manuscriptPanel);
panel.add(download);
panel.add(contact);
panel.add(space2);
// Absolute layout
ui.root.setLayout(ui.Panel.Layout.absolute());
// Add panel to UI root
ui.root.add(panel);