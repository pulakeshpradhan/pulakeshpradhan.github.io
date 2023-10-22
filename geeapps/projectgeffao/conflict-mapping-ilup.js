var landcover_cc = ui.import && ui.import("landcover_cc", "image", {
      "id": "users/eraviolo/LandCoverCC"
    }) || ee.Image("users/eraviolo/LandCoverCC"),
    Agricultural_land_use_and_industrialization = ui.import && ui.import("Agricultural_land_use_and_industrialization", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#ffbb22",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffbb22 */ee.Geometry.MultiPoint(),
    Agricultural_land_use_and_forestry = ui.import && ui.import("Agricultural_land_use_and_forestry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            32.36441658021999,
            40.12006707527969
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffff4c",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffff4c */ee.Geometry.Point([32.36441658021999, 40.12006707527969]),
    Agricultural_land_use_and_urbanization_ = ui.import && ui.import("Agricultural_land_use_and_urbanization_", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#f096ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #f096ff */ee.Geometry.MultiPoint(),
    Nature_conservation_and_recreational_resources = ui.import && ui.import("Nature_conservation_and_recreational_resources", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#fa0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #fa0000 */ee.Geometry.MultiPoint(),
    Forestry_and_recreational_resources = ui.import && ui.import("Forestry_and_recreational_resources", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#b4b4b4",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #b4b4b4 */ee.Geometry.MultiPoint(),
    Development_of_socio_economic_activities_and_the_environment = ui.import && ui.import("Development_of_socio_economic_activities_and_the_environment", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#f0f0f0",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #f0f0f0 */ee.Geometry.MultiPoint(),
    Recreational_resources_and_tourism_incompatible_with_agricultural_land_use = ui.import && ui.import("Recreational_resources_and_tourism_incompatible_with_agricultural_land_use", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#0032c8",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0032c8 */ee.Geometry.MultiPoint(),
    Endangering_of_soil_and_water_resources_by_intensive_agriculture = ui.import && ui.import("Endangering_of_soil_and_water_resources_by_intensive_agriculture", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#0096a0",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0096a0 */ee.Geometry.MultiPoint();
/** adapted script from olha.danylo@gmail.com */
// by Eugenia Raviolo - eugenia.raviolo@gmail.com
var palette = [
  "FFBB22",
  "FFFF4C",
  "F096FF",
  "FA0000",
  "B4B4B4",
  "F0F0F0",
  "0032C8",
  "0096A0",
];
var conflicts = [
  "Agricultural land use and industrialization",
  "Agricultural land use and forestry",
  "Agricultural land use and urbanization (include resettlement plan hobby gardens)",
  "Nature conservation and recreational resources",
  "Forestry and recreational resources",
  "Development of socio-economic activities and the environment",
  "Recreational resources and tourism incompatible with agricultural land use",
  "Endangering of soil and water resources by intensive agriculture",
];
var listClasses = [
  { cat: 1, name: "Permanent tree crop", color: "#acf812", order: 19 },
  { cat: 2, name: "Arable land", color: "#d0ca55", order: 1 },
  { cat: 3, name: "Grassland", color: "#e7a0bb", order: 5 },
  { cat: 4, name: "Permanent shrub crop", color: "#89a76b", order: 16 },
  { cat: 5, name: "Artificial built up areas", color: "#d7191c", order: 3 },
  { cat: 6, name: "Bare areas with grasslands", color: "#9755a0", order: 8 },
  { cat: 7, name: "Linear built up", color: "#232323", order: 11 },
  { cat: 8, name: "Grassland with bare area", color: "#c555a0", order: 7 },
  {
    cat: 9,
    name: "Woody vegetation with grasslands",
    color: "#e883f7",
    order: 9,
  },
  { cat: 10, name: "Riverbanks and bare soil", color: "#86dff2", order: 15 },
  {
    cat: 11,
    name: "Artificial non-built up areas",
    color: "#fe4a1e",
    order: 4,
  },
  { cat: 12, name: "Water bodies", color: "#4458eb", order: 20 },
  { cat: 13, name: "Natural bare areas", color: "#cfdad2", order: 14 },
  { cat: 14, name: "Natural aquatic vegetation", color: "#29d47f", order: 13 },
  {
    cat: 15,
    name: "Grassland with woody vegetation",
    color: "#e77fbb",
    order: 6,
  },
  { cat: 16, name: "Mixed agricultural areas", color: "#af712f", order: 12 },
  { cat: 17, name: "Woodland and/or Shrubland", color: "#37913f", order: 21 },
  { cat: 18, name: "Greenhouses", color: "#fdbf6f", order: 10 },
  { cat: 19, name: "Vineyard", color: "#62e510", order: 18 },
  {
    cat: 20,
    name: "Arable land with sparse trees",
    color: "#a19c42",
    order: 2,
  },
  { cat: 21, name: "Tea", color: "#add488", order: 17 },
];
var lcPalette = listClasses.map(function (row) {
  return row.color;
});
var sorted = listClasses.sort(function (a, b) {
  return a.order - b.order;
});
var sortedPalette = sorted.map(function (row) {
  return row.color;
});
var sortedNames = sorted.map(function (row) {
  return row.name;
});
Map.addLayer(
  landcover_cc,
  { palette: lcPalette, min: 1, max: 21 },
  "Land Cover",
  true
);
var centroide = landcover_cc.geometry().centroid().coordinates().getInfo();
var centerLon = centroide[0];
var centerLat = centroide[1];
Map.setCenter(centerLon, centerLat, 10);
//////////////////////////////////////////////////////////////////////////////////
//Conflicts Classification Legend
///////////////////////////////////////////////////////////////////////////////
var legend = ui.Panel({
  style: {
    position: "bottom-left",
    padding: "8px 15px",
  },
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: "Land use conflict mapping for ILUP in Ayas Basin",
  style: {
    height: "5%",
    width: "100%",
    margin: 0,
    textAlign: "center",
    fontSize: "18px",
    backgroundColor: "444444",
    color: "white",
  },
});
// Creates and styles 1 row of the legend.
var makeRow = function (color, name) {
  // Create the label that is actually the colored box.
  var checkBox = ui.Checkbox({
    label: "",
    value: false,
    style: { margin: "0 0 4px 6px" },
    onChange: function (selected, object) {
      legend.widgets().forEach(function (element, index) {
        if (index > 0) {
          var flag = object == element.widgets().get(0);
          element.widgets().get(0).setValue(flag, false);
          if (flag) {
            Map.drawingTools().setSelected(
              Map.drawingTools()
                .layers()
                .get(index - 1)
            );
            Map.drawingTools().draw();
          }
        }
      });
    },
  });
  var colorBox = ui.Label({
    style: {
      backgroundColor: "#" + color,
      // Use padding to give the box height and width.
      padding: "8px",
      margin: "0 0 4px 0",
    },
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: { margin: "0 0 4px 6px" },
  });
  return ui.Panel({
    widgets: [checkBox, colorBox, description],
    layout: ui.Panel.Layout.Flow("horizontal"),
  });
};
Map.drawingTools().layers().reset();
Map.drawingTools().setDrawModes(["polygon", "point"]);
legend.add(ui.Label("Conflicts between:"));
for (var i = 0; i < palette.length; i++) {
  legend.add(makeRow(palette[i], conflicts[i]));
  // in case there are any spaces in the name
  var layerName = conflicts[i].split(" ").join("_");
  layerName = layerName.replace(",", "_");
  layerName = layerName.replace("-", "_");
  layerName =
    layerName.indexOf("(") > 0
      ? layerName.substring(0, layerName.indexOf("("))
      : layerName;
  var layer = ui.Map.GeometryLayer({
    name: layerName,
    color: palette[i],
  });
  Map.drawingTools().layers().add(layer);
}
Map.add(legend).add(legendTitle);
var urlLabel = ui.Label({
  value: "Download table",
  style: { position: "top-left" },
});
var updateLink = function (url) {
  urlLabel.setValue("Download table").setUrl(url);
  downloadTablePanel.widgets().reset([urlLabel]);
};
// merge all geometry layers for future download
var getMergedFC = function () {
  var layer = Map.drawingTools().toFeatureCollection("classId");
  layer = layer.map(function (ft) {
    return ft
      .set("className", ee.List(conflicts).get(ft.get("classId")))
      .set("classId", ft.get("classId"));
  });
  return layer;
};
// update table link after every change of the geometry layers
var updateTable = function () {
  urlLabel.style().set("shown", true);
  urlLabel.setValue("Loading...");
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var newfc = getMergedFC();
  var filename = "data_" + date;
  newfc.getDownloadURL({
    format: "json",
    selectors: [".geo", "className", "classId"],
    filename: filename,
    callback: updateLink,
  });
};
Map.drawingTools().onDraw(updateTable);
Map.drawingTools().onEdit(updateTable);
Map.drawingTools().onErase(updateTable);
Map.add(createLegendPanel("Land Cover", sortedNames, sortedPalette));
var urlLabel = ui.Label({
  value: "",
  style: { shown: false, position: "top-left" },
});
var downloadTablePanel = ui.Panel({
  widgets: [urlLabel],
  style: { position: "top-left" },
});
Map.add(downloadTablePanel);
// add a shortcut key for turning the layer on and off
function handleQ() {
  var layer = Map.layers().get(0);
  layer.setShown(!layer.getShown());
}
ui.root.setKeyHandler(ui.Key.Q, handleQ);
var qKeyLabel = ui.Label("Press 'Q' to show/hide the map");
qKeyLabel.style().set("position", "bottom-center");
Map.add(qKeyLabel);
Map.setOptions('SATELLITE');
function createLegendPanel(pTitle, pNames, pPalette) {
  var legendPanel = ui.Panel({
      style: {
        position: "top-right",
      },
    }),
    entry;
  // create and add title labels
  legendPanel.add(
    ui.Label({
      value: pTitle,
      style: {
        fontWeight: "bold",
        fontSize: "12px",
        margin: "1px 1px 4px 1px",
        padding: "1px",
      },
    })
  );
  // create and add references labels
  for (var x = 0; x < pNames.length; x++) {
    entry = [
      ui.Label({
        style: {
          color: pPalette[x],
          border: "1px solid black",
          margin: "1px 1px 4px 1px",
        },
        value: "██",
      }),
      ui.Label({
        value: pNames[x],
        style: {
          margin: "1px 1px 4px 4px",
          fontSize: "12px",
        },
      }),
    ];
    legendPanel.add(ui.Panel(entry, ui.Panel.Layout.Flow("horizontal")));
  }
  return legendPanel; // title + references
}