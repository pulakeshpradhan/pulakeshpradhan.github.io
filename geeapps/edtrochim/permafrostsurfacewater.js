var table = ee.FeatureCollection("users/edtrochim/PermafrostWater_ASIA"),
    table2 = ee.FeatureCollection("users/edtrochim/PermafrostWater_EUROPE-SW_ASIA"),
    table3 = ee.FeatureCollection("users/edtrochim/PermafrostWater_NORTHAMERICA"),
    table4 = ee.FeatureCollection("users/edtrochim/PermafrostWater_RUSSIA");
var permafrostAll = table.merge(table2).merge(table3).merge(table4)
// print(table3.limit(25))
var polygonProperties = {
  'Permafrost Extent & Mean Annual Ground Temp': {
    name: 'prmfrst',
    values: ee.List([
      "Sporadic cool Lv",  
      "Sporadic cool Hv",
      "Sporadic cold Hv",
      "Discontinuous cool Lv",
      "Discontinuous cool Hv",
      "Discontinuous cold Lv",
      "Discontinuous cold Hv",
      "Continuous cool Lv",
      "Continuous cool Hv",
      "Continuous cold Lv",
      "Continuous cold Hv"]),
    palette: ee.List([
      'fcc880', //Sporadic cool Lv
      'dec8aa', //Sporadic cool Hv
      'e8c389', //Sporadic cold Hv
      'abe6e5', //Discontinuous cool Lv
      '75d6d9', //Discontinuous cool Hv
      '51cad4', //Discontinuous cold Lv
      '54a8c2', //Discontinuous cold Hv
      '2d98c5', //Continuous cool Lv
      '3183a8', //Continuous cool Hv
      '1f648c', //Continuous cold Lv
      '1E556F', //Continuous cold Hv
      ]),
    legend: [
      {'Sporadic -5 to -2.5 °C ±1 °C': "fcc880"}, {'Sporadic -5 to -2.5 °C ±>1 °C': "dec8aa"}, {'Sporadic <-5 °C ±>1 °C': "e8c389"}, {'': "white"},
      {'Discontinuous -5 to -2.5 °C ±1 °C': "abe6e5"}, {'Discontinuous -5 to -2.5 °C ±>1 °C': "75d6d9"}, {'Discontinuous <-5 °C ±1 °C': "51cad4"},
      {'Discontinuous <-5 °C ±>1 °C': "54a8c2"}, {'': "white"}, {'Continuous -5 to -2.5 °C ±1 °C': "2d98c5"}, {'Continuous -5 to -2.5 °C ±>1 °C': "3183a8"},
      {'Continuous <-5 °C ±1 °C': "1f648c"}, {'Continuous <-5 °C ±>1 °C': "1E556F"}
    ],
    defaultVisibility: true
  },
  'Thermokarst Probability' : {
    name: 'thrmkrs',
    values: ee.List([
      "L-t wet",
      "M-t wet",
      "H-t wet",
      "VH-t wet",
      "L-t lake",
      "M-t lake",
      "H-t lake",
      "VH-t lake",
      "L-t hill",
      "M-t hill",
      "H-t hill",
      "L-t wet+lake",
      "M-t wet+lake",
      "H-t wet+lake",
      "VH-t wet+lake",
      "L-t wet+hill",
      "M-t wet+hill",
      "M-t lake+hill",
      "L-t all"]),
      palette: ee.List([
        '8FCAA8', //L-t wet
        '73977D', //M-t wet
        '678970', //H-t wet
        '556D57', //VH-t wet
        'A7DAD9', //L-t lake
        '29C7D6', //M-t lake
        '2B8BA9', //H-t lake
        '19516F', //VH-t lake
        'D7B07F', //L-t hill
        'E59F66', //M-t hill
        'EB7C53', //H-t hill
        '70CCBA', //L-t wet+lake
        '24A8A8', //M-t wet+lake
        '24706B', //H-t wet+lake
        '204146', //VH-t wet+lake
        'F4CC5F', //L-t wet+hill
        'F9BF36', //M-t wet+hill
        '826C6F', //M-t lake+hill
        '898682' //L-t all
        ]),
    legend: [
      {'Low thermokarst wetland': "8FCAA8"}, {'Medium thermokarst wetland': "73977D"}, {'High thermokarst wetland': "678970"},
      {'Very-high thermokarst wetland': "556D57"}, {'': "white"}, {'Low thermokarst lake': "A7DAD9"}, {'Medium thermokarst lake': "29C7D6"},
      {'High thermokarst lake': "2B8BA9"}, {'Very-high thermokarst lake': "19516F"}, {'': "white"}, {'Low thermokarst hillslope': "D7B07F"},
      {'Medium thermokarst hillslope': "E59F66"}, {'High thermokarst hillslope': "EB7C53"}, {'': "white"}, {'Low thermokarst wetland+lake': "70CCBA"},
      {'Medium thermokarst wetland+lake': "24A8A8"}, {'High thermokarst wetland+lake': "24706B"}, {'Very-high thermokarst wetland+lake': "204146"}, {'': "white"},
      {'Low thermokarst wetland+hillslope': "F4CC5F"}, {'Medium thermokarst wetland+hillslope': "F9BF36"}, {'Medium thermokarst lake+hillslope': "826C6F"},
      {'Low thermokarst all': "898682"}
    ],
    defaultVisibility: false
  }
}
var lossL = ["F9EBA5", "F8E8A2", "F7E69F", "F6E49D", "F5E29A", "F4E098", "F3DE95", "F2DC93", "F1DA90", "F0D88D", "EFD68B",
"EED488", "EDD286", "ECCF83", "EBCD81", "EACB7E", "E9C97B", "E8C779", "E7C576", "E6C374", "E5C171", "E4BF6F",
"E3BD6C", "E2BB69", "E1B967", "E1B765", "E2B764", "E3B763", "E3B763", "E4B762", "E5B761", "E6B660", "E7B65F",
"E8B65F", "E9B65E", "EAB65D", "EAB65C", "EBB55B", "ECB55A", "EDB55A", "EEB559", "EFB558", "F0B557", "F0B456",
"F1B456", "F2B455", "F3B454", "F4B453", "F5B452", "F6B452"]
var gainL = ["D2DBC2", "CEDAC2", "CAD9C2", "C7D9C2", "C3D8C2", "C0D7C2", "BCD7C2", "B9D6C2", "B5D6C2", "B2D5C3", "AED4C3",
"AAD4C3", "A7D3C3", "A3D3C3", "A0D2C3", "9CD1C3", "99D1C3", "95D0C4", "92CFC4", "8ECFC4", "8ACEC4", "87CEC4",
"83CDC4", "80CCC4", "7CCCC4", "79CBC4", "77CAC3", "74C8C2", "72C7C1", "6FC6C0", "6CC4BF", "6AC3BE", "67C2BD",
"65C0BB", "62BFBA", "60BEB9", "5DBCB8", "5ABBB7", "58BAB6", "55B9B5", "53B7B4", "50B6B3", "4EB5B2", "4BB3B1",
"48B2B0", "46B1AF", "43AFAE", "41AEAD", "3EADAC", "3CACAB"]
var grossL = ["FFF5F0", "FEF1EB", "FEEEE6", "FEEAE1", "FEE7DC", "FEE3D7", "FEE0D2", "FDDACB", "FDD4C3", "FDCEBB", "FCC8B3",
"FCC2AB", "FCBCA3", "FCB59B", "FCAF93", "FCA88B", "FCA184", "FC9B7C", "FC9474", "FB8D6D", "FB8767", "FB8060",
"FB7A5A", "FB7353", "FB6D4D", "FA6647", "F85E42", "F6563D", "F44F38", "F24733", "F03F2F", "EC382B", "E63328",
"E12D26", "DB2723", "D52221", "CF1C1E", "C9171C", "C3161B", "BD141A", "B61318", "B01117", "AA1016", "A30E14",
"990C13", "8F0912", "850710", "7B040F", "71020E", "67000D"]
var waterL = ["D0EAEB", "CBE8EA", "C6E7EA", "C1E6EA", "BDE5EA", "B8E3EA", "B3E2EA", "AFE1E9", "AAE0E9", "A5DEE9", "A1DDE9",
"9CDCE9", "97DBE9", "92DAE8", "8ED8E8", "89D7E8", "84D6E8", "80D5E8", "7BD3E8", "76D2E7", "72D1E7", "6DD0E7",
"68CFE7", "64CDE7", "5FCCE7", "5BC9E5", "58C5E1", "55C1DD", "52BDD9", "4FB8D5", "4CB4D2", "49B0CE", "46ACCA",
"43A7C6", "40A3C2", "3D9FBF", "3A9BBB", "3796B7", "3492B3", "318EAF", "2E8AAC", "2B85A8", "2881A4", "257DA0",
"22799C", "1F7499", "1C7095", "196C91", "16688D", "14648A"]
var layerProperties = {
  'Lakes Gross': {
    name: 'L_g_pWT',
    visParams: {min: 0.01, max: 0.5, palette: grossL},
    // legend: [
    //   {'1%': "fff5f0"}, {'25%': "fb6a4a"}, {'50%': "67000d"}
    // ],
    legend: ['1%', '25%', '50%'],
    palette: grossL,
    text: '% of total lakes (> 10 ha) gaining & losing water',
    defaultVisibility: true
  },
  'Lakes Gain': {
    name: 'L_lW_pWT',
    visParams: {min: 0.01, max: 0.25, palette: gainL},
    // legend: [
    //   {'1%': "d2dbc2"},  {'12.5%': "7bccc5"}, {'25%': "3cacab"}
    // ],
    legend: ['1%', '12.5%', '25%'],
    palette: gainL,
    text: '% of total lakes (> 10 ha) gaining water',
    defaultVisibility: false
  },
  'Lakes Loss': {
    name: 'L_wL_pWT',
    visParams: {min: 0.01, max: 0.25, palette: lossL},
    // legend: [
    //   {'1%': "f9eba5"}, {'12.5%': "e1b866"}, {'25%': "f6b452"}
    // ],
    legend: ['1%', '12.5%', '25%'],
    palette: lossL,
    text: '% of total lakes (> 10 ha) losing water',
    defaultVisibility: false
  },
  'Rivers Gross': {
    name: 'R_g_pWT',
    visParams: {min: 0.01, max: 0.5, palette: grossL},
    // legend: [
    //   {'1%': "fff5f0"}, {'25%': "fb6a4a"}, {'50%': "67000d"}
    // ],
    legend: ['1%', '25%', '50%'],
    palette: grossL,
    text: '% of total rivers gaining & losing water',
    defaultVisibility: false
  },
  'Rivers Gain': {
    name: 'R_lW_pWT',
    visParams: {min: 0.01, max: 0.25, palette: gainL},
    // legend: [
    //   {'1%': "d2dbc2"},  {'12.5%': "7bccc5"}, {'25%': "3cacab"}
    // ],
    legend: ['1%', '12.5%', '25%'],
    palette: gainL,
    text: '% of total rivers gaining water',
    defaultVisibility: false
  },
  'Rivers Loss': {
    name: 'R_wL_pWT',
    visParams: {min: 0.01, max: 0.25, palette: lossL},
    // legend: [
    //   {'1%': "f9eba5"}, {'12.5%': "e1b866"}, {'25%': "f6b452"}
    // ],
    legend: ['1%', '12.5%', '25%'],
    palette: lossL,
    text: '% of total rivers losing water',
    defaultVisibility: false
  },
  'Ponds Gross': {
    name: 'P_g_pWT',
    visParams: {min: 0.01, max: 0.5, palette: grossL},
    // legend: [
    //   {'1%': "#fff5f0"}, {'25%': "#fb6a4a"}, {'50%': "#67000d"}
    // ],
    legend: ['1%', '25%', '50%'],
    palette: grossL,
    text: '% of total ponds gaining & losing water',
    defaultVisibility: false
  },
  'Ponds Gain': {
    name: 'P_lW_pWT',
    visParams: {min: 0.01, max: 0.25, palette: gainL},
    // legend: [
    //   {'1%': "d2dbc2"},  {'12.5%': "7bccc5"}, {'25%': "3cacab"}
    // ],
    legend: ['1%', '12.5%', '25%'],
    palette: gainL,
    text: '% of total ponds gaining water',
    defaultVisibility: false
  },
  'Ponds Loss': {
    name: 'P_wL_pWT',
    visParams: {min: 0.01, max: 0.25, palette: lossL},
    // legend: [
    //   {'1%': "f9eba5"}, {'12.5%': "e1b866"}, {'25%': "f6b452"}
    // ],
    legend: ['1%', '12.5%', '25%'],
    palette: lossL,
    text: '% of total ponds losing water',
    defaultVisibility: false
  },
    'Lakes Total': {
    name: 'L_w_pT',
    visParams: {min: 0.01, max: 0.5, palette: waterL},
    // legend: [
    //   {'1%': "d0eaeb"}, {'25%': "5dcce7"}, {'50%': "14648a"}
    // ],
    legend: ['1%', '25%', '50%'],
    palette: waterL,
    text: '% lakes (> 10 ha) of total water ',
    defaultVisibility: false
  },
    'Rivers Total': {
    name: 'R_w_pT',
    visParams: {min: 0.01, max: 0.5, palette: waterL},
    // legend: [
    //   {'1%': "d0eaeb"}, {'25%': "5dcce7"}, {'50%': "14648a"}
    // ],
    legend: ['1%', '25%', '50%'],
    palette: waterL,
    text: '% rivers of total water',
    defaultVisibility: false
  },
    'Ponds Total': {
    name: 'P_w_pT',
    visParams: {min: 0.01, max: 0.5, palette: waterL},
    // legend: [
    //   {'1%': "d0eaeb"}, {'25%': "5dcce7"}, {'50%': "14648a"}
    // ],
    legend: ['1%', '25%', '50%'],
    palette: waterL,
    text: '% ponds of total water',
    defaultVisibility: false
  }
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Entire Area': {lon: 5.761613043440889, lat: 50.258914545723385, zoom: 3},
  'North Slope in Alaska': {lon: -157.8132692951056, lat: 70.04156482524564, zoom: 6},
  'Lena River in Russia': {lon: 127.2788867153671, lat: 70.68803972247102, zoom: 6},
  'Tibet Plateau': {lon: 89.82118653381963, lat: 34.18605900711915, zoom: 5},
};
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create labels for panels
var titleL = ui.Label('Permafrost');
titleL.style().set({ fontWeight: 'bold', fontSize: '24px', color: 'white', backgroundColor: '17263c', position: 'bottom-right' });
var titleR = ui.Label('Surface Water');
titleR.style()
.set({ fontWeight: 'bold', fontSize: '24px', color: 'white', backgroundColor: '17263c', position: 'bottom-left'});
// Create a map panel.
var mapPanelL = ui.Map().add(titleL);
var mapPanelR = ui.Map().add(titleR);
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  style:{fontWeight: 'bold', fontSize: '10px', padding: '0px 0px 0px 0px'},
  onChange: function(value) {
    var selected = layerSelect.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanelR.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.1,
  style:{fontWeight: 'bold', fontSize: '10px', width: '50%'}
});
opacitySlider.onSlide(function(value) {
  mapPanelR.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
  mapPanelL.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var layersOpacityPanel =
    ui.Panel({widgets: [checkbox, opacitySlider],
    layout: ui.Panel.Layout.flow('horizontal'),
    // style: {
    //   position: 'top-right'
    // }
    });
// Add labels
// mapPaneL
// mapPaneR
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanelL.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: false });
mapPanelR.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: false });
var style = {
  'Dark': [{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.stroke', stylers: [ { visibility: 'off' } ]},
           {elementType: 'labels.text.fill', stylers: [ { visibility: 'off' } ]},
           {featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {featureType: "all",
              elementType: "labels",
              stylers: [ { visibility: 'off' } ]
            }
          ]
};
mapPanelR.setOptions(null, style);
mapPanelL.setOptions(null, style);
// Center the map
var defaultLocation = locationDict['Entire Area'];
mapPanelL.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
mapPanelR.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanelL]);
ui.root.widgets().reset([mapPanelR]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
var empty = ee.Image().float();
var layerT = polygonProperties['Thermokarst Probability']
var layerP = polygonProperties['Permafrost Extent & Mean Annual Ground Temp']
var permafrostT = permafrostAll.map(function(f) {
  var klass = f.get(layerT.name)
  var index = (layerT.values).indexOf(klass)
  return f.set({styleT: {color: ee.List(layerT.palette).get(index)}})
}).style({styleProperty: "styleT"})
var permafrostP = permafrostAll.map(function(f) {
  var klass = f.get(layerP.name)
  var index = (layerP.values).indexOf(klass)
  return f.set({styleP: {color: ee.List(layerP.palette).get(index)}})
}).style({styleProperty: "styleP"})
mapPanelL.add(ui.Map.Layer({eeObject: permafrostT, 
                            visParams: {}, 
                            name: 'Thermokarst Probability', 
                            shown: layerT.defaultVisibility, 
                            opacity: 1}))
mapPanelL.add(ui.Map.Layer({eeObject: permafrostP, 
                            visParams: {}, 
                            name: 'Permafrost Extent & Mean Annual Ground Temp', 
                            shown: layerP.defaultVisibility, 
                            opacity: 1}))
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = empty.paint({
  featureCollection: permafrostAll,
  color: layer.name,
})
  var masked = image.updateMask(image.gte(0.01)).visualize(layer.visParams);
  /*var image = permafrostAll.select(layer.name);*/
/*  var masked = addZeroAndWaterMask(image, hansen.select(layer.name));*/
  mapPanelR.add(ui.Map.Layer(masked, {}, key, layer.defaultVisibility));
}
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: mapPanelR,
  secondPanel: mapPanelL,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([mapPanelL, mapPanelR]);
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Permafrost Surface Water Change', {fontSize: '24px', color: '346786', fontWeight: 'bold'});
var text = ui.Label(
    '1984-2018',
    {fontWeight: 'bold',
    fontSize: '15px'});
var text2 = ui.Label(
    'Results from analysis of Global Surface Water dataset (Source: EC JRC/Google) characterizing extent and change in northern hemisphere permafrost regions.',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text, text2], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'For more information see Trochim et al.', {fontSize: '13px'},
    'in prep');
var linkPanel = ui.Panel(
    [link]);
    //[ui.Label('For more information', {fontWeight: 'bold', fontSize: '13px'}), link]);
toolPanel.add(linkPanel) //.add(ui.Label());
toolPanel.add(ui.Label('Map Style', {'font-size': '16px'}));
var buttonMapNormal = ui.Button('Normal', setMapStyle, false, { color: 'gray' })
var buttonMapDark = ui.Button('Dark', setMapStyle)
var buttonMapSatellite = ui.Button('Satellite', setMapStyle, false, { color: 'gray' })
function setMapStyle(button) {
  switch(button.getLabel()) {
    case 'Normal':
      mapPanelR.setOptions('ROADMAP')
      mapPanelL.setOptions('ROADMAP')
      break;
    case 'Dark':
      mapPanelR.setOptions('Dark');
      mapPanelL.setOptions('Dark')
      break;
    case 'Satellite':
      mapPanelR.setOptions('SATELLITE')
      mapPanelL.setOptions('SATELLITE')
      break;
  }
  function updateButtonStyle(button, selectedName) {
    var style = button.style()
    style.set({ color: button.getLabel() === selectedName ? 'black': 'grey' })
    style.set({ border: 0 })
  }
  updateButtonStyle(buttonMapNormal, button.getLabel())
  updateButtonStyle(buttonMapDark, button.getLabel())
  updateButtonStyle(buttonMapSatellite, button.getLabel())
}
var layerTypesPanel = ui.Panel([buttonMapNormal, buttonMapDark, buttonMapSatellite], ui.Panel.Layout.Flow('horizontal'))
toolPanel.add(layerTypesPanel)
toolPanel.add(layersOpacityPanel)
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanelR.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend, layerProperties[selected].palette, layerProperties[selected].text);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Visualize Surface Water Layers', {'font-size': '16px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
function setLegend(legend, palette, text){
  keyPanel.clear();
  var labelPanel = ui.Panel(
      [ui.Label(legend[0], {margin: '4px 8px'}),
        ui.Label(
            legend[1],
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(legend[2], {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  var labelFoot = ui.Label(text, LEGEND_FOOTNOTE_STYLE)
  return keyPanel.add(ui.Panel([ColorBar(palette), labelPanel, labelFoot]));
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend, layerProperties[layerSelect.getValue()].palette, layerProperties[layerSelect.getValue()].text);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the polygonProperties dictionary.
var selectItems1 = Object.keys(polygonProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect1 = ui.Select({
  items: selectItems1,
  value: selectItems1[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanelL.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend1(polygonProperties[selected].legend);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label()).add(ui.Label('Compare Permafrost Layers', {'font-size': '16px'}));
toolPanel.add(layerSelect1);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel1 = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel1);
var legendTitle1 = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel1.add(legendTitle1);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel1 = ui.Panel();
legendPanel1.add(keyPanel1);
function setLegend1(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel1.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel1.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
setLegend1(polygonProperties[layerSelect1.getValue()].legend);
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanelR.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Visit Example Locations', {'font-size': '16px'}), locationSelect
]);
toolPanel.add(ui.Label()).add(locationPanel);
//toolPanel.add(ui.Label('Cold (<-5 °C), cool (-5 to -2.5 °C)', {'font-size': '11px'}));
// ====================== SPEED-UP =======================
var BUCKET = 'paper-permafrost'
var MAX_ZOOM = 8
function normalize(s) {
  return s.toLowerCase().replace(/ /g, "-").replace(/&/g, 'and')
}
function exportImageLayerToMap(layer) {
  var name = normalize(layer.getName())
  var image = ee.Image(layer.getEeObject())
  // print(name)
  var region = ee.Geometry.Polygon([[180,85],[0,85],[-180,85],[-180,-85],[0,-85],[180,-85],[180,85]], 'EPSG:4326', false)  
  Export.map.toCloudStorage({
    image: image, 
    description: name, 
    bucket: BUCKET, 
    fileFormat: 'png', 
    path: name,
    minZoom: 0, 
    maxZoom: MAX_ZOOM,
    region: region,
    skipEmptyTiles: true,
    writePublicTiles: false
  })
}
/***
 * Export all image Map layers as maps
 */
function exportImageLayersToMaps() {
  mapPanelR.layers().map(exportImageLayerToMap)
  mapPanelL.layers().map(exportImageLayerToMap)
}
/***
 * Replaces map layer at index by its cache map
 */
function replaceImageLayerByMap(layers, index) {
  var layer = layers.get(index)
  var layerCache = ui.Map.CloudStorageLayer({
    bucket: BUCKET, 
    path: normalize(layer.getName()), 
    maxZoom: MAX_ZOOM,
    suffix: '.png',
    name: layer.getName(), 
    shown: layer.getShown(), 
    opacity: layer.getOpacity()
  })
  layers.set(index, layerCache)
}
/***
 * Replace image layers by maps
 */
function replaceImageLayersByMaps(layers) {
  for(var i=0; i<layers.length(); i++) {
    replaceImageLayerByMap(layers, i)
  }
}
// exportImageLayersToMaps()
replaceImageLayersByMaps(mapPanelR.layers())
replaceImageLayersByMaps(mapPanelL.layers())