// Load annual ATEIs.
var ATEI = ee.Image("users/treeline/Dirk/Western_US/Annual_NDVI/L5/ATEI_L5_basedOn_NDVIgradientMagnitude");
// A helper function to show the image for a given year on the default map.
var showLayer = function(year) {
  Map.layers().reset();
  var bandName = "NDVI_" + year;
  var image = ATEI.select(bandName);
  Map.addLayer(
    image.updateMask(image.multiply(1e3)),
    {
      palette:["FF0000"]
    },
    String(year)
  );
};
// Create a label and slider.
var label = ui.Label("Alpine Treeline Ecotones for Year");
var slider = ui.Slider({
  min: 1984,
  max: 2011,
  step: 1,
  onChange: showLayer,
  style: {stretch: "horizontal"}
});
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [label, slider],
  layout: ui.Panel.Layout.flow("vertical"),
  style: {
    position: "top-center",
    padding: "7px"
  }
});
// Add the panel to the map.
Map.add(panel);
// Set default values on the slider and map.
var setYear = 1984;
var setImage = ATEI.select("NDVI_" + setYear);
slider.setValue(setYear);
Map.setControlVisibility({
  layerList: false
});
Map.setCenter(-113.64572, 48.86593, 13);
Map.addLayer(
    setImage.updateMask(setImage.multiply(1e3)),
    {
      palette:["FF0000"]
    },
    String(setYear)
  );