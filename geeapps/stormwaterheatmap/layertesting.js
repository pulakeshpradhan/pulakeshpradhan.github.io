ui.root.setLayout(ui.Panel.Layout.absolute());
// data
var data = require("users/stormwaterheatmap/apps:data/data_dictionary.js");
var Style = require("users/stormwaterheatmap/apps:Modules/Style");
var helpers = require("users/stormwaterheatmap/apps:Modules/helpers");
var fonts = Style.fonts;
var rasters = data.rasters;
var layer_types = { "Input Data Layers": {}, "Hydrology Data Layers": {} };
layer_types["Input Data Layers"] = {
  Soils: rasters.Soils,
  "Age of Imperviousness": rasters["Age of Imperviousness"],
  Imperviousness: rasters["Imperviousness"],
  "Land Cover": rasters["Land Cover"],
  "Land Use": rasters["Land Use"],
  "Population Density": rasters["Population Density"],
  "Precipitation": rasters["Precipitation (mm)"],
  Slope: rasters["Slope"],
  "Slope Categories": rasters["Slope Categories"],
  Traffic: rasters["Traffic"],
};
layer_types["Hydrology Data Layers"] = {
  "Flow Duration Index": rasters["Flow Duration Index"],
  "Hydrologic Response Units": rasters["Hydrologic Response Units"],
  // "Runoff (in)": rasters["Runoff (in)"],
  "Runoff (mm)": rasters["Runoff (mm)"],
};
var coc_data = data.cocs;
layer_types["Pollutant Loading"] = coc_data;
/* ----------------------------
WIDGETS 
*/
/* Select */
var panel = ui.Panel();
/* Label */
var panel_label = helpers.info_panel("Select Layer Type:", "null");
var layer_label = ui.Label({ value: "Display Layer:" });
//var panel_layout = ui.Panel.Layout.absolute("bottom-left");
/* Style */
panel_label.style().set("fontWeight", "500");
var panel_style = { position: "bottom-left" }; //,width:'300px', height:"80%"}
/* Panel */
var panel = ui.Panel({ style: panel_style }); //, layout:panel_layout})//, })
//Map.add(panel)
var legendPanel = ui.Panel({
  style: {
    position: "bottom-right",
    shown: false,
    minWidth: "200px",
    maxWidth: "300px",
  },
});
Map.add(legendPanel);
var select_layer_type = ui.Select({
  items: Object.keys(layer_types),
  //placeholder: "Select Layer Type",
  value: Object.keys(layer_types)[2],
  onChange: function () {
    var layer_dict = layer_types[select_layer_type.getValue()];
    //print(layer_dict)
    var layers_list = Object.keys(layer_dict);
    secondname_select = ui.Select({
      items: layers_list, //select_layer_type.getValue()],
      onChange: function () {
        var layer_obj = layer_dict[secondname_select.getValue()];
        legendPanel.style().set({ shown: true });
        helpers.clear_map_add_layer(layer_obj, legendPanel);
      },
    });
    panel.widgets().set(3, secondname_select);
  },
});
print(layer_types, "layer_types");
var secondname_select = ui.Select({
  items: Object.keys(layer_types["Pollutant Loading"]),
  onChange: function (result) {
    var layer_type = select_layer_type.getValue();
    print(layer_type);
    var layer_obj = layer_types[layer_type][result];
    legendPanel.style().set({ shown: true });
    helpers.clear_map_add_layer(layer_obj, legendPanel);
  },
});
panel.widgets().set(0, panel_label);
panel.widgets().set(1, select_layer_type);
panel.widgets().set(2, layer_label);
panel.widgets().set(3, secondname_select);
var which_type = ui.url.get('layer_type', 'coc')
var which_layer = ui.url.get('layer', 'Total Suspended Solids Concentration')
print(which_layer)
var init_layer = coc_data["Total Suspended Solids Concentration"]
if(which_type == 'coc'){
   init_layer = coc_data[which_layer]
} else {
  init_layer = rasters[which_layer]
} 
var map_init = function (map,which_type,which_layer) {
  var m = map || Map;
  legendPanel.style().set({ shown: true });
  helpers.clear_map_add_layer(
    init_layer,
    legendPanel
  );
};
helpers.make_tnc_map();
map_init();
var mainPanel = helpers.makeMainPanel("View Data Layers");
var subheading = ui.Label(
  "Explore layers, such as land cover, runoff, " +
    "and pollutant loading using the selectors below. For information on a particular layer, " +
    "add it to the map, and click the 'more info' link in the lengend panel."
);
subheading.style().set(fonts.Caption2);
mainPanel.add(subheading);
mainPanel.style().set({ maxWidth: "100px" });
mainPanel.add(panel);
Map.add(mainPanel);