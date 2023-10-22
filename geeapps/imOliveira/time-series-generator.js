// Model section.
var time = [];
for (var i = 1; i <= 10; i++) {
  time.push(i);
}
time = time.map(function(n) {
  return {
    label: n.toString(),
    value: n
  };
});
var brazil = ee.FeatureCollection("FAO/GAUL/2015/level2")
  .filter(ee.Filter.eq("ADM0_CODE", 37));
var states = brazil.aggregate_array("ADM1_NAME")
  .distinct()
  .remove("Name Unknown")
  .sort();
var cities = states.map(function(state) {
  return brazil
    .filter(ee.Filter.eq("ADM1_NAME", state))
    .aggregate_array("ADM2_NAME")
    .sort();
});
var statesMap = ee.Dictionary.fromLists(states, cities);
// ------------------------------
// CHIRPS Daily to CHIRPS Monthly
var startChirps = 1981;
var endChirps = new Date().getFullYear();
var years = ee.List.sequence(startChirps, endChirps);
var months = ee.List.sequence(1, 12);
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
chirps = ee.ImageCollection.fromImages(years.map(function(y) {
  return months.map(function(m) {
    var imageYearYMonthM = chirps
      .filter(ee.Filter.calendarRange(y, y, "year"))
      .filter(ee.Filter.calendarRange(m, m, "month"))
      .reduce(ee.Reducer.sum());
    return imageYearYMonthM.set({
      "system:time_start": ee.Date.fromYMD(y, m, 1).millis(),
    });
  });
}).flatten());
// ------------------------------
// -------------------------------------------------------
// MOD13Q1.061 Terra Vegetation Indices 16-Day Global 250m
var modis = ee.ImageCollection("MODIS/061/MOD13Q1").select("NDVI", "EVI");
modis = modis.map(function(image) {
  return image.multiply(0.0001).copyProperties(image, image.propertyNames());
});
var ndvi = modis.select("NDVI");
var evi = modis.select("EVI");
// -------------------------------------------------------
var m = {};
m.states = states.getInfo();
m.statesMap = statesMap.getInfo();
m.data = {
  "Precipitação": {
    "CHIRPS": {
      images: chirps,
      scale: 5566
    }
  },
  "Índice Espectral": {
    "NDVI": {
      images: ndvi,
      scale: 250
    },
    "EVI": {
      images: evi,
      scale: 250
    }
  }
};
// Some helper functions.
function show(widget) {
  widget.style().set("shown", true);
}
function hide(widget) {
  widget.style().set("shown", false);
}
function enable(widget) {
  widget.setDisabled(false);
  widget.style().set("color", "black");
}
function disable(widget) {
  widget.setDisabled(true);
  widget.style().set("color", "grey");
}
var App = {};
// ---------------
// Widgets section
var stateSelector = ui.Select(m.states);
var citySelector = ui.Select();
var dataSelector = ui.Select(Object.keys(m.data));
var indiceSelector = ui.Select(Object.keys(m.data["Índice Espectral"]));
var yearSelector = ui.Select(time);
yearSelector.setValue(10);
hide(indiceSelector);
var statePanel = ui.Panel({
  widgets: [
    ui.Label("1. Selecione uma Unidade Federativa"),
    stateSelector
  ]
});
var cityPanel = ui.Panel({
  widgets: [
    ui.Label("2. Selecione um município"),
    citySelector
  ]
});
var dataPanel = ui.Panel({
  widgets: [
    ui.Label("3. Selecione a informação desejada"),
    ui.Panel([dataSelector, indiceSelector], ui.Panel.Layout.flow("horizontal"))
  ]
});
var yearPanel = ui.Panel({
  widgets: [
    ui.Label("4. Selecione o tamanho da série temporal (em anos)"),
    yearSelector
  ]
});
var timeSeriesButton = ui.Button("Gerar Série Temporal");
var loadingLabel = ui.Label("Aguarde...", {padding: "6px 0"});
var mainPanel = ui.Panel({
  widgets: [
    statePanel,
    cityPanel,
    dataPanel,
    yearPanel,
    ui.Panel([timeSeriesButton, loadingLabel], ui.Panel.Layout.flow("horizontal"))
  ],
  style: {
    position: "middle-left"
  }
});
var chartContainer = ui.Panel();
var chartText = ui.Label({
  value: "Clique neste botão para ver a opção \"Download CSV\" 👇",
  style: {
    textAlign: "right",
    shown: false,
    stretch: "horizontal"
  }
}
);
var chartPanel = ui.Panel({
  widgets: [
    chartText,
    chartContainer
  ],
  style: {
    width: "600px",
    position: "middle-right"
  }
});
function mapAndCenterSelectedState(id) {
  var fv = ui.Map.FeatureViewLayer("FAO/GAUL/2015/level1_FeatureView");
  fv.setVisParams({
    rules: [
      {
        filter: ee.Filter.neq("ADM1_CODE", id),
        isVisible: false
      }
    ]
  });
  Map.layers().reset([fv]);
}
function mapAndCenterSelectedCity(id) {
  var fv = ui.Map.FeatureViewLayer("FAO/GAUL/2015/level2_FeatureView");
  fv.setVisParams({
    rules: [
      {
        filter: ee.Filter.neq("ADM2_CODE", id),
        isVisible: false
      }
    ]
  });
  Map.layers().reset([fv]);
}
function showCityPanel(value) {
  hide(dataPanel);
  hide(indiceSelector);
  hide(yearPanel);
  hide(chartPanel);
  disable(timeSeriesButton);
  dataSelector.setValue(null);
  var selected = brazil.filter(ee.Filter.eq("ADM1_NAME", value));
  Map.centerObject(selected);
  var id = ee.Feature(selected.first()).get("ADM1_CODE");
  id.evaluate(function(id) {
    mapAndCenterSelectedState(id);
  });
  citySelector.items().reset([]);
  var items = m.statesMap[value];
  items.forEach(function(item) {
    citySelector.items().add(item);
  });
  show(cityPanel);
}
function showDataPanel(value) {
  var selected = brazil.filter(ee.Filter.eq("ADM2_NAME", value));
  Map.centerObject(selected);
  var id = ee.Feature(selected.first()).get("ADM2_CODE");
  id.evaluate(function(id) {
    mapAndCenterSelectedCity(id);
  });
  show(dataPanel);
  var isChartPanelVisible = chartPanel.style().get("shown") == true;
  if (isChartPanelVisible) {
    createChart();
  }
  App.region = ee.Feature(selected.first()).geometry();
}
function showYearPanel(value) {
  enable(timeSeriesButton);
  show(yearPanel);
  indiceSelector.setValue(indiceSelector.items().get(0));
  switch (value) {
    case "Índice Espectral":
      var defaultValue = indiceSelector.getValue();
      App.imageCollection = m.data["Índice Espectral"][defaultValue].images;
      App.scale = m.data["Índice Espectral"][defaultValue].scale;
      indiceSelector.onChange(function(value) {
        App.imageCollection = m.data["Índice Espectral"][value].images;
        App.scale = m.data["Índice Espectral"][value].scale;
      });
      show(indiceSelector);
      break;
    case "Precipitação":
      hide(indiceSelector);
      App.imageCollection = m.data["Precipitação"]["CHIRPS"].images;
      App.scale = m.data["Precipitação"]["CHIRPS"].scale;
      break;
  }
}
function createChart() {
  // Ocultar chart se estiver sendo mostrado.
  var isChartVisible = chartPanel.style().get("shown") === true;
  if (isChartVisible) {
    hide(chartPanel);
  }
  var thisYear = ee.Date(Date.now());
  var delta = yearSelector.getValue();
  var start = thisYear.advance(-delta, "years");
  var dataType = dataSelector.getValue();
  var chartType;
  var options;
  var to = new Date().getFullYear();
  var from = to - yearSelector.getValue();
  var city = citySelector.getValue();
  var state = stateSelector.getValue();
  switch (dataType) {
    case "Precipitação":
      chartType = "ColumnChart";
      options = {
        title: "Precipitação média mensal em " + city + ", " + state + " (" + from + "-" + to + ")",
        hAxis: {
          title: "Data",
          format: (yearSelector.getValue() == 1) ? "MMM/yy" : "M/yy"
        },
        vAxis: {
          title: "Precipitação (mm)"
        },
        legend: {
          position: "none"
        }
      };
      break;
    case "Índice Espectral":
      chartType = "LineChart";
      var indice = indiceSelector.getValue();
      options = {
        title: "Série temporal do " + indice + " no período de " + from + " a " + to + " em " + city + ", " + state,
        hAxis: {
          title: "Data",
          format: (yearSelector.getValue() == 1) ? "MMM/yy" : "M/yy"
        },
        curveType: "function",
        legend: {
          position: "none"
        }
      };
      break;
  }
  var chart = ui.Chart.image.series({
    imageCollection: App.imageCollection.filterDate(start, thisYear),
    region: App.region,
    scale: App.scale
  }).setChartType(chartType)
    .setOptions(options);
  show(loadingLabel);
  chartContainer.widgets().reset([chart]);
  ui.util.setTimeout(function() {
    show(chartPanel);
    show(chartText);
    hide(loadingLabel);
  }, 6000);
}
timeSeriesButton.onClick(createChart);
stateSelector.onChange(showCityPanel);
citySelector.onChange(showDataPanel);
dataSelector.onChange(showYearPanel);
yearSelector.onChange(function() {
  enable(timeSeriesButton);
});
hide(loadingLabel)
hide(cityPanel);
hide(dataPanel);
hide(yearPanel);
hide(chartPanel);
disable(timeSeriesButton);
Map.setControlVisibility(false);
Map.setCenter(-51.42, -15.13, 4);
Map.add(mainPanel);
Map.add(chartPanel);