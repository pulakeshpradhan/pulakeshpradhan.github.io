// MODEL
var m = {};
m.layers = {
  // "Age": {
  //   image: ee.Image("users/celsohlsj/public/secondary_forest_age_amazonia_collection3_v2").eq(0).selfMask(),
  //   start: 1986,
  //   end: 2020
  // },
  "Extent": {
    image: ee.Image("users/celsohlsj/public/secondary_forest_extent_amazonia_collection3_v2").eq(0).selfMask(),
    start: 1986,
    end: 2020
  },
  "Increment": {
    image: ee.Image("users/celsohlsj/public/secondary_forest_increment_amazonia_collection3_v2").eq(0).selfMask(),
    start: 1986,
    end: 2020
  },
  "Loss": {
    image: ee.Image("users/celsohlsj/public/secondary_forest_loss_amazonia_collection3_v2").eq(0).selfMask(),
    start: 1987,
    end: 2020
  }
};
m.years = [];
for (var i = 1986; i <= 2020; i++) {
  m.years.push(i);
}
m.background = ui.Map.Layer(ee.Image(0), {palette: ["black"]}, "Background", true, 0.8);
// COMPONENTS
function divider() {
  return ui.Panel({
    style: {
      height: "1px",
      margin: "12px 8px",
      backgroundColor: "#C0C0C0",
      stretch: "horizontal"
    }
  });
}
var symbols = {
  newWindow: "↗️",
  play: "►",
  brazil: "🇧🇷",
  wait: "⏳"
};
var title = ui.Label("Benchmark maps of 33 years of secondary forest age for Brazil");
var citation = ui.Label("Silva Junior, C.H.L., Heinrich, V.H.A., Freire, A.T.G. et al. Benchmark maps of 33 years of secondary forest age for Brazil. Sci Data 7, 269 (2020).");
var url = "https://doi.org/10.1038/s41597-020-00600-4";
var doi = ui.Label(url);
doi.setUrl(url);
var summaryTitle = ui.Label("ABSTRACT");
var summary = ui.Label(
  "The restoration and reforestation of 12 million hectares of forests by 2030 are amongst the leading mitigation strategies " +
  "for reducing carbon emissions within the Brazilian Nationally Determined Contribution targets assumed under the Paris Agreement. " +
  "Understanding the dynamics of forest cover, which steeply decreased between 1985 and 2018 throughout Brazil, is essential for " +
  "estimating the global carbon balance and quantifying the provision of ecosystem services. To know the long-term increment, extent, " +
  "and age of secondary forests is crucial; however, these variables are yet poorly quantified. Here we developed a 30-m spatial resolution " +
  "dataset of the annual increment, extent, and age of secondary forests for Brazil over the 1986–2018 period. Land-use and " +
  "land-cover maps from MapBiomas Project (Collection 4.1) were used as input data for our algorithm, implemented in the Google Earth Engine platform. " +
  "This dataset provides critical spatially explicit information for supporting carbon emissions reduction, biodiversity, and restoration policies, " +
  "enabling environmental science applications, territorial planning, and subsidizing environmental law enforcement."
);
var layerTitle = ui.Label("LAYERS");
var layerLabel = ui.Label("Select a layer to visualize:");
var layerSelector = ui.Select({
  items: Object.keys(m.layers),
  placeholder: "Select a layer..."
});
var playButton = ui.Button(symbols.play);
var summaryPanel = ui.Panel([summary]);
var dataPanel = ui.Panel({
  widgets: [layerSelector, playButton],
  layout: ui.Panel.Layout.flow("horizontal")
});
var mainPanel = ui.Panel([
  title,
  citation,
  doi,
  divider(),
  summaryTitle,
  summaryPanel,
  divider(),
  layerTitle,
  layerLabel,
  dataPanel,
]);
var imageSlider = ui.Slider(1986, 2020, 1986, 1);
var yearLabel = ui.Label("2020", {
  margin: "auto",
  padding: "8px",
  color: "#FFFFFF",
  backgroundColor: "rgba(0, 0, 0, 0)",
  fontSize: "18px",
  fontWeight: "bold"
});
var sliderPanel = ui.Panel({
  widgets: [
    yearLabel,
    imageSlider
  ]
});
var credits = ui.Label("Desenvolvido por Iago Mendes & OLAB, 2022 " + symbols.brazil, {
  padding: "0px 6px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#FFFFFF",
  fontSize: "10px",
  position: "bottom-center"
});
// COMPOSITION
Map.add(m.background);
Map.add(sliderPanel);
Map.add(mainPanel);
Map.add(credits);
// STYLE
var s = {};
s.fullTransparency = {
  backgroundColor: "rgba(0, 0, 0, 0)"
};
s.title = {
  color: "#FFFFFF",
  fontSize: "24px",
  fontWeight: "bold"
};
s.layerSelector = {
  width: "120px"
};
s.subtitle = {
  color: "#FFFFFF",
  margin: "0px 8px 8px",
  fontWeight: "bold"
};
s.citation = {
  color: "#FFFFFF",
  margin: "0px 8px",
  fontSize: "12px",
  fontWeight: "lighter"
};
s.doi = {
  color: "#FFFFFF",
  margin: "0px 8px",
  fontSize: "12px",
  fontWeight: "lighter"
};
s.summary = {
  color: "#FFFFFF",
  margin: "0px 8px",
  fontSize: "12px"
};
s.info = {
  color: "#FFFFFF",
  fontSize: "12px"
};
s.summaryPanel = {
  height: "200px",
};
s.mainPanel = {
  width: "350px",
  position: "middle-left"
};
s.imageSlider = {
  padding: "0px 0px 0px 55px",
  margin: "0px",
  color: "rgba(0, 0, 0, 0)",
  backgroundColor: "rgba(0, 0, 0, 0)",
  stretch: "horizontal"
};
s.sliderPanel = {
  width: "250px",
  backgroundColor: "rgba(0, 0, 0, 0)"
};
s.sectionLabel = {
  whiteSpace: "pre-wrap"
};
s.sectionContainer = {
  width: "350px",
  height: "250px"
};
title.style().set(s.title);
title.style().set(s.fullTransparency);
summaryTitle.style().set(s.subtitle);
summaryTitle.style().set(s.fullTransparency);
layerTitle.style().set(s.subtitle);
layerTitle.style().set(s.fullTransparency);
layerLabel.style().set(s.summary);
layerLabel.style().set(s.fullTransparency);
citation.style().set(s.citation);
citation.style().set(s.fullTransparency);
doi.style().set(s.doi);
doi.style().set(s.fullTransparency);
summary.style().set(s.summary);
summary.style().set(s.fullTransparency);
summaryPanel.style().set(s.summaryPanel);
summaryPanel.style().set(s.fullTransparency);
dataPanel.style().set(s.fullTransparency);
mainPanel.style().set(s.mainPanel);
mainPanel.style().set(s.fullTransparency);
sliderPanel.style().set(s.sliderPanel);
imageSlider.style().set(s.imageSlider);
layerSelector.style().set(s.layerSelector);
layerSelector.style().set(s.fullTransparency);
playButton.style().set(s.fullTransparency);
// BEHAVIOURS
function hide(widget) {
  widget.style().set("shown", false);
}
function show(widget) {
  widget.style().set("shown", true);
}
function bandsToCollection(image) {
  var bands = image.bandNames();
  var n = ee.List.sequence(0, bands.size().subtract(1));
  var imageCollection = n.map(function(n) {
    n = ee.Number(n);
    var img = ee.Image(image.select(n));
    var bandName = ee.String(img.bandNames().get(0));
    var bandYear = bandName.slice(15, 19);
    return img.set("year", bandYear);
  });
  return ee.ImageCollection.fromImages(imageCollection).sort("year");
}
function updateLabel(value) {
  yearLabel.setValue(value);
  Map.layers().forEach(function(layer) {
    if (layer.getName() == value) {
      layer.setOpacity(1);
    } else if (layer.getName() == "Background") {
    } else {
      layer.setOpacity(0);
    }
  });
}
imageSlider.onSlide(updateLabel);
var layers = [];
function removeLayers() {
  // Remove todas as camadas, exceto o background.
  if (layers.length > 0) {
    layers.forEach(function(layer) {
      Map.layers().remove(layer);
    });
    layers = [];
  }
}
function play() {
  removeLayers();
  show(sliderPanel);
  yearLabel.setValue("Loading...");
  hide(imageSlider);
  ui.util.setTimeout(function() {
    yearLabel.setValue(m.layers[layerSelector.getValue()].start);
    show(imageSlider);
  }, 20000);
  var selectedLayer = layerSelector.getValue();
  var images = bandsToCollection(m.layers[selectedLayer].image);
  var start = m.layers[selectedLayer].start;
  // Adiciona todas as imagens ao mapa.
  ee.List.sequence(0, images.size().subtract(1)).evaluate(function(indices) {
    indices.map(function(index) {
      var image = ee.Image(images.toList(images.size()).get(index));
      var visParams = {
        min: 0,
        max: 1
      };
      var name = (index + start).toString();
      var opacity = index == 0 ? 1 : 0;
      var layer = ui.Map.Layer(image, visParams, name, true, opacity);
      Map.layers().add(layer);
      layers.push(layer);
    });
  });
}
playButton.onClick(play);
function updateInfo(layer) {
  removeLayers();
  show(playButton);
  if (sliderPanel.style().get("shown")) {
    sliderPanel.style().set("shown", false);
  }
  var selectedLayer = layerSelector.getValue();
  var start = m.layers[selectedLayer].start;
  var end = m.layers[selectedLayer].end;
  yearLabel.setValue(start);
  imageSlider.setMin(start);
  imageSlider.setMax(end);
  imageSlider.setValue(start);
}
layerSelector.onChange(updateInfo);
// INITIALIZE
Map.setOptions("SATELLITE");
Map.setCenter(-65.95, -3.81, 5);
Map.setLocked(true);
Map.setControlVisibility(false);
hide(playButton);
hide(sliderPanel);