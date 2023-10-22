// Hansen Global Forest Change
var LAST_YEAR = 2022;
var versionCloud = 'v1.10'
var updated_tile_source = 'tiles/gfc_'+versionCloud;
var fire_updated_tile_source = 'tiles/loss_fire/'+LAST_YEAR;
// ***************************************************************************
// Layer Definitions
var DATA_LAYERS = [{
  name: 'Loss/Extent/Gain (Red/Green/Blue)',
  path: updated_tile_source+'/loss_tree_gain',
  suffix: '.png',
  legend: [
    {color: '#FF0000', label: 'Forest Loss 2000–' + LAST_YEAR},
    {color: '#0000FF', label: 'Forest Gain 2000–2012'},
    {color: '#FF00FF', label: 'Both Loss and Gain'},
    {color: '#00E000', label: 'Forest Extent'},
  ],
}, {
  name: 'Forest Loss Year (' + LAST_YEAR + ' Highlight)',
  path: updated_tile_source+'/loss_year_new',
  suffix: '.png',
  legend: [
    {color: '#00FFFF', label: LAST_YEAR},
    {color: '#FF0000', label: LAST_YEAR - 1},
    {color: '#FF8000', label: '⋮'},
    {color: '#FFFF00', label: '2000'},
    {color: '#000000', label: 'No loss'},
    {color: '#404040', label: 'Water or no data'},
  ],
}, {
  name: 'Forest Loss Year',
  path: updated_tile_source+'/loss_year',
  suffix: '.png',
  legend: [
    {color: '#FF0000', label: LAST_YEAR},
    {color: '#FF8000', label: '⋮'},
    {color: '#FFFF00', label: '2000'},
    {color: '#000000', label: 'No loss'},
    {color: '#404040', label: 'Water or no data'},
  ],
}, {
  name: 'Forest Loss Year (Transparent)',
  path: updated_tile_source+'/loss_year_alpha',
  suffix: '.png',
  legend: [
    {color: '#FF0000', label: LAST_YEAR},
    {color: '#FF8000', label: '⋮'},
    {color: '#FFFF00', label: '2000'},
  ],
},{
  name: 'Forest Loss Due to Fire Year (Transparent)',
  path: fire_updated_tile_source+'/4_fireloss_year_alpha_withnon',
  suffix: '.png',
  citation: 'Tyukavina et al. (2022) Global trends of forest loss due to fire, 2001-2019. Frontiers in Remote Sensing',
  doi: 'https://doi.org/10.3389/frsen.2022.825190',
  datapage:'https://glad.umd.edu/dataset/Fire_GFL',
  legend: [
    {color: '#FF0000', label: LAST_YEAR},
    {color: '#FF8000', label: '⋮'},
    {color: '#FFFF00', label: '2000'},
    {color: '#0000FF', label: 'Non-fire loss'},
  ],
}, {
  name: 'Forest Cover Loss 2000–' + LAST_YEAR,
  path: updated_tile_source+'/loss',
  suffix: '.png',
  legend: [
    {color: '#FF0000', label: 'Loss'},
    {color: '#000000', label: 'No loss'},
    {color: '#404040', label: 'Water or no data'},
  ],
}, {
  name: 'Forest Cover Loss 2000–' + LAST_YEAR + ' (Transparent)',
  path: updated_tile_source+'/loss_alpha',
  suffix: '.png',
  legend: [
    {color: '#FF0000', label: 'Loss'},
  ],
}, {
  name: 'Forest Cover Loss 2000–' + LAST_YEAR + ' (Grayscale)',
  path: updated_tile_source+'/loss_gray',
  suffix: '.png',
  legend: [
    {color: '#FFFFFF', label: 'Loss'},
    {color: '#000000', label: 'No loss, water, or no data'},
  ],
},{
  name: 'Forest Loss Due to Fire (Transparent)',
  path: fire_updated_tile_source+'/9_fireloss_alpha_withnon',
  suffix: '.png',
  citation: 'Tyukavina et al. (2022) Global trends of forest loss due to fire, 2001-2019. Frontiers in Remote Sensing',
  doi: 'https://doi.org/10.3389/frsen.2022.825190',
  datapage:'https://glad.umd.edu/dataset/Fire_GFL',
  legend: [
    {color: '#FF0000', label: 'Loss due to fire'},
    {color: '#0000FF', label: 'Non-fire loss'},
  ],
}, {
  name: 'Forest Cover Gain 2000–2012',
  path: 'tiles/gfc_v1.4/gain',
  suffix: '.png',
  legend: [
    {color: '#0000FF', label: 'Gain'},
    {color: '#000000', label: 'No loss'},
    {color: '#404040', label: 'Water or no data'},
  ],
}, {
  name: 'Forest Cover Gain 2000–2012 (Transparent)',
  path: 'tiles/gfc_v1.4/gain_alpha',
  suffix: '.png',
  legend: [
    {color: '#0000FF', label: 'Gain'},
  ],
}, {
  name: 'Forest Cover Gain 2000–2012 (Grayscale)',
  path: 'tiles/gfc_v1.4/gain_gray',
  suffix: '.png',
  legend: [
    {color: '#FFFFFF', label: 'Gain'},
    {color: '#000000', label: 'No loss, water, or no data'},
  ],
}];
var OTHER_LAYERS = [{
  name: '2000 Percent Tree Cover',
  path: 'tiles/gfc_v1.4/tree',
  suffix: '.png',
  legend: [
    {color: '#00FF00', label: '75–100%'},
    {color: '#00AA00', label: '50–75%'},
    {color: '#005500', label: '25–50%'},
    {color: '#000000', label: '0–25%'},
    {color: '#404040', label: 'Water or no data'},
  ],
}, {
  name: '2000 Percent Tree Cover (Transparent)',
  path: 'tiles/gfc_v1.4/tree_alpha',
  suffix: '.png',
  legend: [
    {color: '#00FF00', label: '75–100%'},
    {color: '#55FF55', label: '50–75%'},
    {color: '#AAFFAA', label: '25–50%'},
    {color: '#FFFFFF', label: '0–25%'},
  ],
}, {
  name: '2000 Percent Tree Cover (Grayscale)',
  path: 'tiles/gfc_v1.4/tree_gray',
  suffix: '.png',
  legend: [
    {color: '#FFFFFF', label: '75–100%'},
    {color: '#AAAAAA', label: '50–75%'},
    {color: '#555555', label: '25–50%'},
    {color: '#000000', label: '0–25%, water, or no data'},
  ],
}, {
  name: 'Pan-tropical Forest Fragments (2000)',
  path: 'tiles/fragments',
  suffix: '.png',
  citation: 'Hansen et al., (2020). The fate of tropical forest fragments. Science Advances, 6, 11, eaax8574.',
  doi: 'https://doi.org/10.1126/sciadv.aax8574',
  datapage:'https://glad.umd.edu/dataset/fate-tropical-forest-fragments',
}, {
  name: 'Primary Humid Tropical Forests (2001)',
  path: 'tiles/Primary_HT_forests_2001',
  suffix: '.png',
  citation: 'Turubanova et al. (2018). Ongoing primary forest loss in Brazil, Democratic Republic of the Congo, and Indonesia. Environmental Research Letters, 13(7), 074028.',
  doi: 'https://doi.org/10.1088/1748-9326/aacd1c',
  datapage:'https://glad.umd.edu/dataset/primary-forest-humid-tropics',
  legend: [
    {color: '#008800', label: 'Primary Forest 2001'},
  ],
}, {
  name: 'Tropical Hinterland Forests (2013)',
  path: 'tiles/hinterlands',
  suffix: '',
  citation: 'Tyukavina et al. (2016). Pan‐tropical hinterland forests: mapping minimally disturbed forests. Global Ecology and Biogeography, 25(2), 151-163',
  doi: 'https://doi.org/10.1111/geb.12394',
  datapage:'https://glad.umd.edu/dataset/hinterland-forests-2013',
  legend: [
    {color: '#FFFFFF', label: 'Tropical Hinterland Forests 2013'},
  ],
}, {
  name: 'Intact Forest Landscapes (Color)',
  path: 'tiles/intact_forest_2016',
  citation:'Potapov et al. (2017). The last frontiers of wilderness: Tracking loss of intact forest landscapes from 2000 to 2013. Science Advances, 3(1), e1600821.',
  suffix: '.png',
  doi: 'https://doi.org/10.1126/sciadv.1600821',
  link: 'https://www.intactforests.org',
  legend: [
    {color: '#1fca23', label: 'Intact Forest Landscapes (IFL) 2016'},
    {color: '#ca0813', label: 'IFL degradation 2013–2016'},
    {color: '#ca871f', label: 'IFL degradation 2000–2013'},
  ],
}, {
  name: 'Intact Forest Landscapes (Gray)',
  path: 'tiles/intact_forest_2016_grey',
  suffix: '.png',
  citation:'Potapov et al. (2017). The last frontiers of wilderness: Tracking loss of intact forest landscapes from 2000 to 2013. Science Advances, 3(1), e1600821.',
  doi: 'https://doi.org/10.1126/sciadv.1600821',
  link: 'https://www.intactforests.org',
  legend: [
    {color: '#FFFFFF', label: 'Intact Forest Landscapes (IFL) 2016'},
    {color: '#AAAAAA', label: 'IFL degradation 2013–2016'},
    {color: '#666666', label: 'IFL degradation 2000–2013'},
  ],
}];
var BACKGROUND_LAYERS = [{
  name: 'Year 2000 Bands 5/3/4',
  path: 'tiles/gfc2015/first_543',
  suffix: '.jpg',
}, {
  name: 'Year ' + LAST_YEAR + ' Bands 5/3/4',
  path: updated_tile_source+'/last_543', // TODO(mdh): Has the band order in these tile paths really been wrong forever?
  suffix: '.jpg',
}, {
  name: 'Year 2000 Bands 4/5/7',
  path: 'tiles/gfc2015/first_457',
  suffix: '.jpg',
}, {
  name: 'Year ' + LAST_YEAR + ' Bands 4/5/7',
  path: updated_tile_source+'/last_457',
  suffix: '.jpg',
}, {
  name: 'Black Background',
  path: 'tiles/gfc2015/black',
  suffix: '.png',
}];
var EXAMPLE_LOCATIONS = [{
  name: 'Forestry and Tornado in Alabama',
  region: ee.Geometry.Rectangle([-87.624, 33.1256, -86.9566, 33.5129]),
  description: 'The trail of destruction from the April 27, 2011, Tuscaloosa-Birmingham tornado ' +
      'is clearly visible in this location. This was one of 358 recorded tornadoes during the ' +
      'April 25-28, 2011, tornado outbreak, the most severe in US history. Zoom out to spot ' +
      'tracks from other tornadoes nearby.',
  links: [{
    name: 'Wikipedia: 2011 Tuscaloosa–Birmingham tornado',
    url: 'https://en.wikipedia.org/wiki/2011_Tuscaloosa%E2%80%93Birmingham_tornado',
  }, {
    name: 'Wikipedia: 2011 Super Outbreak',
    url: 'https://en.wikipedia.org/wiki/2011_Super_Outbreak',
  }],
//34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
}, {
  name: 'Forest Fires in Yakutsk',
  region: ee.Geometry.Rectangle([120.523, 60.618, 131.202, 64.056]),
  description: 'The Siberian larch forests of Yakutia, Russia, are very prone to fire during spring to early summer, when the ground has dried out after winter snow melt. Most of these fires are deliberately set and spread uncontrolled. Boreal forests are a large carbon store and such extensive fires result in significant carbon emissions.',
}, {
  name: 'Smallholder Clearing in Mozambique',
  region: ee.Geometry.Rectangle([32.056, -19.686, 42.734, -12.567]),
  description: 'The miombo woodlands of Mozambique are disappearing due to logging, slash and burn agriculture, and charcoal production. Rates of forest loss have increased greatly along with a growing economy following decades of civil war. Foreign investment, both legal and illegal, has resulted in a rapid increase in timber exports and corresponding loss in forest cover.',
}, {
  name: 'Forestry in Riau, Indonesia',
  region: ee.Geometry.Rectangle([98.894, -1.215, 104.233, 2.492]),
  description: 'Sumatra has lost over 50% of its natural forest within the past 30 years. Riau province is a global hotspot of tropical rainforest loss over the last decade, with more recent clearings moving into peatland swamps. Peatlands are home to immense soil carbon stores and unique biodiversity richness. Having nearly exhausted upland natural forest resources, agroindustrial development in Riau has moved into peatlands, with significant, deleterious environmental consequences.',
}, {
  name: 'Deforestation in Paraguay',
  region: ee.Geometry.Rectangle([-65.926, -25.674, -55.248, -18.816]),
  description: 'The Chaco woodlands of Bolivia, Paraguay and Argentina are under intensive pressure from agroindustrial development. Paraguay’s Chaco woodlands within the western half of the country are experiencing rapid deforestation in the development of cattle ranches. The result is the highest rate of deforestation in the world.',
}, {
  name: 'Protected Area Loss in Côte d’Ivoire',
  region: ee.Geometry.Rectangle([-8.6, 4.267, -3.261, 7.953]),
  description: 'Marahoué National Park in central Côte d’Ivoire has lost over 90% of its forest over the last decade as have several other protected areas and forest reserves. The loss of this national heritage is coincident with two civil wars that occurred during the study period and reflect the fragile nature of protected areas given political instability. The forests of Taï National Park, a UNESCO World Heritage site located in the south-west of the country, have fared much better. Adjust the transparency slider of the Data layer to see national park boundaries (switch the base map from Satellite to Map mode if needed).',
}, {
  name: 'Kalimantan Palm Oil Plantations',
  region: ee.Geometry.Rectangle([109.554, -3.672, 113.984, -1]),
  description: 'Blue areas in the Loss/Extent/Gain data Layer are not re-generating natural forest but industrial palm oil plantations. Magenta tones indicate cleared forest followed by newly grown palm estates.',
}, {
  name: 'Sarawak Old and New Logging Roads',
  region: ee.Geometry.Rectangle([114.022, 1.668, 115.336, 2.822]),
  description: 'The Forest Loss Year Data Layer shows logging roads spreading across inner Sarawak within the Malaysian portion of Borneo. The Loss/Extent/Gain data illustrate some older roads in blue as forest canopy recovers, obscuring the road network. Malaysia has logged almost the entirety of its side of Borneo - note the international border with Indonesia in the eastern part of the subset.',
}, {
  name: 'Finnish and Russian Forestry',
  region: ee.Geometry.Rectangle([24.336, 60.272, 33.196, 62.819]),
  description: 'Small-scale forestry is evident across Finland, resulting in a nearly uniform landscape of forest clearing and recovery. Russia has not yet logged forests on its side of the border, but clearings there are increasing and are much larger in scale. The streak of forest loss in the center of the image was caused by cyclone Dagmar in late 2011.',
  links: [{
    name: 'Wikipedia: Cyclone Dagmar',
    url: 'https://en.wikipedia.org/wiki/Cyclone_Dagmar',
  }],
}];
// ***************************************************************************
// User Interface Definition
var map = ui.Map();
var panel = ui.Panel({style:{width:'300px'}});
panel.add(ui.Label(
  'Global Forest Change',
  {color:'DD4433', fontSize:'24px', fontFamily:'Arial', margin:'8px 0px 0px 8px'}));
panel.add(ui.Label(
  'Published by Hansen, Potapov, Moore, Hancher et al.',
  {color:'1155CC', fontSize:'11px', fontFamily:'Arial', margin:'0px 0px 8px 8px'},
  'http://www.sciencemag.org/content/342/6160/850'));
panel.add(ui.Label(
  'University of Maryland',
  {color:'000000', fontSize:'24px', fontFamily:'Arial', margin:'8px 0px 0px 8px'}));
panel.add(ui.Label(
  'Department of Geographical Sciences',
  {color:'000000', fontSize:'14px', fontFamily:'Arial', margin:'0px 0px 8px 8px'}));
panel.add(ui.Label(
  'Results from time-series analysis of Landsat images characterizing forest extent and change.',
  {color:'000000', fontSize:'11px', fontFamily:'Arial', margin:'8px'}));
panel.add(ui.Label(
  'Trees are defined as vegetation taller than 5m in height and are expressed as a percentage ' +
  'per output grid cell as ‘2000 Percent Tree Cover’. ‘Forest Cover Loss’ is defined as a ' +
  'stand-replacement disturbance, or a change from a forest to non-forest state, during the ' +
  'period 2000–'+LAST_YEAR+'. ‘Forest Cover Gain’ is defined as the inverse of loss, or a non-forest to ' +
  'forest change entirely within the period 2000–2012. ‘Forest Loss Year’ is a disaggregation ' +
  'of total ‘Forest Loss’ to annual time scales.',
  {color:'000000', fontSize:'11px', fontFamily:'Arial', margin:'8px'}));
//34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
panel.add(ui.Label(
  'Reference 2000 and '+LAST_YEAR+' imagery are median observations from a set of quality ' +
  'assessment-passed growing season observations.',
  {fontSize:'11px', fontFamily:'Arial'}));
panel.add(ui.Label(
  'To share location copy URL.',
  {fontSize:'11px', fontFamily:'Arial'}));
panel.add(ui.Label(
  'Download the data.',
  {fontSize: '13px', fontFamily: 'Arial'},
  'https://storage.googleapis.com/earthenginepartners-hansen/GFC-'+LAST_YEAR+'-'+versionCloud+'/download.html'));
var dataLayerCheckbox = ui.Checkbox({
  label: 'Data Products',
  value: true,
  style: {fontSize:'16px', fontFamily:'Arial'},
});
panel.add(dataLayerCheckbox);
var dataLayerSelector = ui.Select({
  items: DATA_LAYERS.map(function(layer) { return layer.name; }),
  value: DATA_LAYERS[1].name,
});
panel.add(dataLayerSelector);
var dataLayerLegend = ui.Panel(null, null, {margin:'0px 8px 8px 24px'});
panel.add(dataLayerLegend);
var otherLayerCheckbox = ui.Checkbox({
  label: 'Other Data Layers',
  value: false,
  style: {fontSize:'16px', fontFamily:'Arial'},
});
panel.add(otherLayerCheckbox);
var otherLayerSelector = ui.Select({
  items: OTHER_LAYERS.map(function(layer) { return layer.name; }),
  value: OTHER_LAYERS[0].name,
});
panel.add(otherLayerSelector);
var otherLayerLegend = ui.Panel(null, null, {margin:'0px 8px 8px 24px'});
panel.add(otherLayerLegend);
var backgroundLayerCheckbox = ui.Checkbox({
  label: 'Background Imagery',
  value: false,
  style: {fontSize:'16px', fontFamily:'Arial'},
});
panel.add(backgroundLayerCheckbox);
var backgroundLayerSelector = ui.Select({
  items: BACKGROUND_LAYERS.map(function(layer) { return layer.name; }),
  value: BACKGROUND_LAYERS[0].name,
});
panel.add(backgroundLayerSelector);
var backgroundLayerLegend = ui.Panel(null, null, {margin:'0px 8px 8px 24px'});
panel.add(backgroundLayerLegend);
panel.add(ui.Label('Example Locations', {fontSize:'16px', fontFamily:'Arial'}));
var exampleSelector = ui.Select({
  items: EXAMPLE_LOCATIONS.map(function(layer) { return layer.name; }),
  value: EXAMPLE_LOCATIONS[0].name,
});
panel.add(exampleSelector);
var exampleInfoPanel = ui.Panel(null, null, {margin:'0px 8px 8px 24px'});
panel.add(exampleInfoPanel);
function makeLegend(panel, legend) {
  for (var i = 0; i < legend.length; ++i) {
    var colorBoxStyle = {width:'14px', height:'14px', backgroundColor:legend[i].color, margin:'0px 2px 0px 8px'};
    if (legend[i].color == '#FFFFFF') {
      colorBoxStyle.border = '1px dashed #A0A0A0';
    }
    panel.add(ui.Panel([
      ui.Label('', colorBoxStyle),
      ui.Label(legend[i].label, {fontSize:'10px', fontFamily:'Arial', color:'#404040', margin:'1px 8px 0px 2px'})
    ], ui.Panel.Layout.flow('horizontal')));
  }
}
function makeInfoPanel(panel, info) {
  if (info.citation && info.doi) {
    panel.add(ui.Label(info.citation, {fontSize:'10px', fontFamily:'Arial', color:'#808080', margin:'1px 8px 1px 8px'}, info.doi));
  } else if(info.citation){
    panel.add(ui.Label(info.citation, {fontSize:'10px', fontFamily:'Arial', color:'#808080', margin:'1px 8px 1px 8px'}));
  } 
  if(info.link){
    panel.add(ui.Label(info.link, {fontSize:'10px', fontFamily:'Arial', color:'#808080', margin:'1px 8px 1px 8px'}, info.link));
  }
  if (info.datapage) {
    panel.add(ui.Label('Data download', {fontSize:'10px', fontFamily:'Arial', margin:'1px 8px 4px 8px'}, info.datapage));
  }
  if (info.legend) {
    makeLegend(panel, info.legend);
  }
}
function makeExamplePanel(panel, example) {
  panel.add(ui.Label(example.description, {fontSize:'10px', fontFamily:'Arial', color:'#808080'}));
  if (example.links) {
    panel.add(ui.Label('Learn more:', {fontSize:'10px', fontFamily:'Arial', margin: '0px 8px 0px 8px'}));
    for (var i = 0; i < example.links.length; ++i) {
      var link = example.links[i];
      panel.add(ui.Label(link.name, {fontSize:'10px', fontFamily:'Arial', margin: '0px 8px 0px 8px'}, link.url));
    }
  }
  panel.add(ui.Button('Zoom to area', function() { map.centerObject(example.region); }));
}
ui.root.clear();
ui.root.add(map);
ui.root.add(panel);
// ***************************************************************************
// Behavior Logic
function getLayerIndex(layers, name) {
  for (var i = 0; i < layers.length; ++i) {
    if (name == layers[i].name) {
      return i;
    }
  }
  return null;
}
function makeLayer(info) {
  return ui.Map.CloudStorageLayer({
    bucket: 'earthenginepartners-hansen',
    path: info.path,
    maxZoom: 12,
    suffix: info.suffix,
    name: info.name,
  });
}
function makeLayerUpdater(layers, checkbox, selector, infoPanel, background, param) {
  var layer = null;
  // Set the checkbox and selector states based on the URL parameter.
  var index = ui.url.get(param);
  if (index !== undefined && index !== '') {
    print(param, index);
    if (index !== 'off') {
      selector.setValue(layers[index].name);
      checkbox.setValue(true);
    } else {
      checkbox.setValue(false);
    }
  }
  // Our updater function, which updates the map and URL based on the state of the UI widgets.
  function updater() {
    if (layer) {
      map.layers().remove(layer);
      infoPanel.widgets().reset();
      layer = null;
    }
    if (checkbox.getValue()) {
      var layerIndex = getLayerIndex(layers, selector.getValue());
      var layerInfo = layers[layerIndex];
      ui.url.set(param, layerIndex);
      layer = makeLayer(layerInfo);
      makeInfoPanel(infoPanel, layerInfo);
      if (background) {
        map.layers().insert(0, layer);
      } else {
        map.layers().add(layer);
      }
    } else {
      ui.url.set(param, 'off');
    }
  }
  checkbox.onChange(updater);
  // When the user selects a new layer, we turn it on by default..
  selector.onChange(function() {
    checkbox.setValue(true, false);  // make sure we don't trigger the update twice.
    updater();
  });
  updater();
  return updater;
}
function makeExampleUpdater(examples, selector, infoPanel) {
  function updater() {
    var index = getLayerIndex(examples, selector.getValue());
    var example = examples[index];
    infoPanel.widgets().reset();
    makeExamplePanel(infoPanel, example);
  }
  selector.onChange(updater);
  return updater;
}
makeLayerUpdater(BACKGROUND_LAYERS, backgroundLayerCheckbox, backgroundLayerSelector, backgroundLayerLegend, true, 'bl');
makeLayerUpdater(OTHER_LAYERS, otherLayerCheckbox, otherLayerSelector, otherLayerLegend, false, 'old');
makeLayerUpdater(DATA_LAYERS, dataLayerCheckbox, dataLayerSelector, dataLayerLegend, false, 'dl');
makeExampleUpdater(EXAMPLE_LOCATIONS, exampleSelector, exampleInfoPanel);
function getUrlParam(name, defaultValue) {
  var value = ui.url.get(name);
  if (value === undefined) {
    return defaultValue;
  } else {
    return value;
  }
}
//set center
map.setCenter(
  getUrlParam('lon', 20),
  getUrlParam('lat', 10),
  getUrlParam('zoom', 3));
map.onChangeBounds(changeURL); 
function changeURL(input){
  ui.url.set('lon', input.lon);
  ui.url.set('lat', input.lat);
  ui.url.set('zoom', input.zoom);
}
/*
var firstResize = true;
ui.root.onResize(function(size) {
  if (firstResize) {
    var mapWidth = Math.max(size.width - 300, 0);
    var zoom = Math.floor(Math.log(mapWidth / 256) / Math.log(2) + 0.4);
    map.setCenter(10, 20, zoom);
    firstResize = false;
  }
});
*/