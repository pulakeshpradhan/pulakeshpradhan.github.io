var elevation = ui.import && ui.import("elevation", "image", {
      "id": "NOAA/NGDC/ETOPO1"
    }) || ee.Image("NOAA/NGDC/ETOPO1"),
    cgls = ui.import && ui.import("cgls", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V-C3/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"),
    settlements = ui.import && ui.import("settlements", "image", {
      "id": "DLR/WSF/WSF2015/v1"
    }) || ee.Image("DLR/WSF/WSF2015/v1");
var snazzy = require("users/aazuspan/snazzy:styles");
snazzy.addStyle("https://snazzymaps.com/style/6376/masik-www", "Basemap");
var SCALE = 1800;
var BUFFER = 250000;
// Reprojecting to a coarser scale seems necessary for performance when making the GIF
var proj = ee.Projection("EPSG:3857").atScale(SCALE);
// Make a pretty hillshade
var hillshade = ee.Terrain.hillshade({
  input: elevation.select("bedrock"),
  elevation: 30,
})
  .visualize({ min: 90, max: 130 })
  .blend(settlements.eq(255).visualize({ palette: ["#000"] }));
elevation = elevation.select("bedrock").resample("bilinear").reproject(proj);
// Build initial ocean mask using LULC data rather than elevation
var lc = cgls.first().select("discrete_classification").reproject(proj);
var ocean = lc.eq(200).unmask(1).updateMask(1);
// Grab lakes, rivers, etc from LULC for drawing. We don't use them in the simulation.
var water = lc
  .eq(80)
  .selfMask()
  .visualize({ min: 0, max: 1, palette: ["#2d5da8"], opacity: 0.7 });
var depthVis = {
  min: -3500,
  max: 0,
  palette: ["#000", "#16192e", "#001f52", "#2d5da8"],
  opacity: 0.9,
};
// Globals. Like normal variables, but they can change at any time from anywhere!
var depth;
var inundated;
var thumbnailPanel;
var aoi;
// UI settings
var nFrames;
var rate;
var regionSet = false;
// Run the simulation
function run() {
  depth = elevation.mask(ocean);
  inundated = ocean;
  var frames = generateInundationFrames(nFrames);
  drawFrames(frames);
}
// Draw the AOI frame
function drawAOI() {
  removeLayerByName("AOI");
  var frame = ee.Image().paint(aoi, 0, 2);
  var outline = ee.Image().paint(aoi, 1, 4);
  Map.addLayer(
    outline.blend(frame),
    { min: 0, max: 1, palette: ["#fff", "#000"] },
    "AOI"
  );
}
// Remove all layers with the given name from the Map.
function removeLayerByName(name) {
  var layers = Map.layers();
  layers.forEach(function (layer) {
    if (layer.getName() === name) Map.remove(layer);
  });
}
// Make each frame by running the cellular automaton and return an array of frames.
function generateInundationFrames(n) {
  var frames = [];
  inundated = inundated.clip(aoi);
  for (var t = 0; t < n; t++) {
    var adjacent = inundated.reduceNeighborhood({
      reducer: ee.Reducer.max(),
      kernel: ee.Kernel.circle(3),
    });
    var level = t * rate;
    // Drain
    if (rate < 0) {
      var changed = adjacent.eq(1).and(elevation.gt(level));
      inundated = inundated.eq(1).and(changed.neq(1));
    // Flood
    } else {
      changed = adjacent.eq(1).and(elevation.lt(level));
      inundated = inundated.eq(1).or(changed.eq(1));
    }
    var edge = inundated
      .reduceNeighborhood({
        reducer: ee.Reducer.countDistinctNonNull(),
        kernel: ee.Kernel.circle(1),
      })
      .gt(1)
      .selfMask()
      .visualize({ palette: ["#a6dff5"], opacity: 0.5 });
    depth = elevation.subtract(level).updateMask(inundated);
    var vis = depth.visualize(depthVis);
    var blend = hillshade.blend(water).blend(vis).blend(edge).clip(aoi);
    frames.push(blend);
  }
  return frames;
}
// Add the start and end frame to the map and make the GIF panel.
function drawFrames(frames) {
  removeLayerByName("Start");
  removeLayerByName("End");
  Map.addLayer(frames[0], {}, "Start");
  Map.addLayer(frames[frames.length - 1], {}, "End");
  var params = {
    region: aoi,
    crs: "EPSG:3857",
    dimensions: 350,
    format: "gif",
    framesPerSecond: 8,
  };
  var col = ee.ImageCollection(frames);
  var thumb = ui.Thumbnail({
    image: col,
    params: params,
  });
  if (thumbnailPanel) Map.remove(thumbnailPanel);
  thumbnailPanel = ui.Panel({
    widgets: [thumb],
    style: { position: "bottom-left" },
  });
  Map.add(thumbnailPanel);
}
// Handle map clicks to set the region.
function mapClicked(coords) {
  var pt = ee.Geometry.Point([coords.lon, coords.lat]);
  aoi = pt.buffer(BUFFER).bounds();
  regionSet = true;
  message.setValue("Click play to run (or select a new region).");
  drawAOI();
}
Map.setControlVisibility({
  layerList: true,
  drawingToolsControl: false,
  zoomControl: false,
  scaleControl: false,
});
Map.onClick(mapClicked);
Map.style().set("cursor", "crosshair");
var panel = ui.Panel({ style: { position: "bottom-left" } });
var frameSlider = ui.Slider({
  min: 50,
  max: 200,
  value: 50,
  step: 50,
  style: { width: "160px" },
  onChange: function (val) {
    nFrames = val;
  },
});
var rateSlider = ui.Slider({
  min: -10,
  max: 10,
  value: 5,
  step: 1,
  style: { width: "160px" },
  onChange: function (val) {
    rate = val;
  },
});
var runButton = ui.Button({
  label: "Run simulation",
  imageUrl:
    "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/play_arrow/default/24px.svg",
  onClick: function () {
    if (!regionSet) message.setValue("Select a region first.");
    else if (rate === 0) message.setValue("Select a non-zero speed.");
    else run();
  },
});
var helpButton = ui.Button({
  label: "Help",
  imageUrl:
    "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/help/default/24px.svg",
  onClick: function () {
    alert(
      "Cellular Flood uses a cellular automaton to simulate sea level change. To run:\n\
      \n1. Choose how many time steps to simulate (fewer is faster).\
      \n2. Choose how many meters to raise/lower sea level each step.\
      \n3. Click a point on the map to choose a region.\
      \n4. Click the play button to run the simulation.\
      \n\n\nDISCLAIMER: This is just a fun tech demo, not an accurate flood simulator! \
Please don't use this for anything but making cool GIFs."
    );
  },
});
var buttons = ui.Panel({
  widgets: [runButton, helpButton],
  layout: ui.Panel.Layout.flow("horizontal"),
});
var message = ui.Label({
  value: "Click the map to select a region.",
  style: { fontSize: 12, color: "#949494", margin: "0 8px 0 8px" },
});
var messagePanel = ui.Panel({ widgets: message, style: { height: "24px" } });
panel.add(buttons);
panel.add(messagePanel);
panel.add(
  ui.Panel({
    widgets: [ui.Label("Time steps:"), frameSlider],
    layout: ui.Panel.Layout.flow("horizontal"),
  })
);
panel.add(
  ui.Panel({
    widgets: [ui.Label("Meters / step:"), rateSlider],
    layout: ui.Panel.Layout.flow("horizontal"),
  })
);
Map.add(panel);
// Initialize the UI settings
nFrames = frameSlider.getValue();
rate = rateSlider.getValue();