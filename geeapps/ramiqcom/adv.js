var gaul = ui.import && ui.import("gaul", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    gaulView = ui.import && ui.import("gaulView", "featureViewLayer", {
      "id": "FAO/GAUL/2015/level2_FeatureView",
      "name": "level2_FeatureView"
    }) || ui.Map.FeatureViewLayer("FAO/GAUL/2015/level2_FeatureView", null, "level2_FeatureView");
// Main panel
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {width: '300px'},
});
ui.root.add(mainPanel);
// WebGIS title
var mainTitle = ui.Label({
  style: {fontSize: '19px', padding: '5px 0px', color: 'gray', fontWeight: 'bold'},
  value: 'Administrative Division Viewer'
});
mainPanel.add(mainTitle);
// Viewer selection
var adminSelect = ui.Select({
  items: ['Country', 'Province', 'City/regency'],
  placeholder: 'Select level',
  onChange: function(value){
    if (value == 'Country') {
      countryList();
      countrySelect.setValue(null);
      countrySelect.style().set({shown: true});
      provinceSelect.style().set({shown: false});
      citySelect.style().set({shown: false});
    } else if (value == 'Province') {
      countryList();
      countrySelect.setValue(null);
      countrySelect.style().set({shown: true});
      provinceSelect.setValue(null);
      provinceSelect.style().set({shown: true});
      citySelect.style().set({shown: false});
    } else if (value == 'City/regency') {
      countryList();
      countrySelect.setValue(null);
      countrySelect.style().set({shown: true});
      provinceSelect.setValue(null);
      provinceSelect.style().set({shown: true});
      citySelect.setValue(null);
      citySelect.style().set({shown: true});
    } else {
      countrySelect.style().set({shown: false});
      provinceSelect.style().set({shown: false});
      citySelect.style().set({shown: false});
    }
    var countryValue = countrySelect.getValue();
    var provinceValue = provinceSelect.getValue();
    var cityValue = citySelect.getValue();
    if (value == 'Country' && countryValue !== null) {
      showFeatureButton.setDisabled(false);
    } else if (value == 'Province' && countryValue !== null && provinceValue !== null) {
      showFeatureButton.setDisabled(false);
    } else if (value == 'City/regency' && countryValue !== null && provinceValue !== null && cityValue !== null) {
      showFeatureButton.setDisabled(false);
    } else {
      showFeatureButton.setDisabled(true);
    }
  }
});
mainPanel.add(adminSelect);
// Country select
var countrySelect = ui.Select({
  placeholder: 'Select country',
  style: {shown: false},
  onChange: function(value){
    if (value !== null) {
      provinceList();
      provinceSelect.setDisabled(false);
    } else {
      provinceSelect.setDisabled(true);
    }
    var adminStatus = adminSelect.getValue();
    if (value !== null && adminStatus == 'Country') {
      showFeatureButton.setDisabled(false);
    } else {
      showFeatureButton.setDisabled(true);
    }
  }
});
mainPanel.add(countrySelect);
// Country list function
function countryList(){
  var admin= gaul;
  var country = 'ADM0_NAME';
  var list = gaul.aggregate_array(country).distinct().sort().evaluate(function(value){
    countrySelect.items().reset(value);
  });
}
// Province select
var provinceSelect = ui.Select({
  placeholder: 'Select province',
  style: {shown: false},
  disabled: true,
  onChange: function(value){
    if (value !== null) {
      cityList();
      citySelect.setDisabled(false);
    } else {
      citySelect.setDisabled(false);
    }
    var adminStatus = adminSelect.getValue();
    var countryValue = countrySelect.getValue();
    if (value !== null && countryValue !== null && adminStatus == 'Province') {
      showFeatureButton.setDisabled(false);
    } else {
      showFeatureButton.setDisabled(true);
    }
  }
});
mainPanel.add(provinceSelect);
// Province list function
function provinceList(){
  var admin= gaul;
  var country = 'ADM0_NAME';
  var province = 'ADM1_NAME';
  var countryValue = countrySelect.getValue();
  var list = gaul.filter(ee.Filter.eq(country, countryValue)).aggregate_array(province).distinct().sort().evaluate(function(value){
    provinceSelect.items().reset(value);
  });
}
// City select
var citySelect = ui.Select({
  placeholder: 'Select city',
  style: {shown: false},
  disabled: true,
  onChange: function(value){
    var adminStatus = adminSelect.getValue();
    var countryValue = countrySelect.getValue();
    var provinceValue = provinceSelect.getValue();
    if (value !== null && countryValue !== null && provinceValue !== null && adminStatus == 'City/regency') {
      showFeatureButton.setDisabled(false);
    } else {
      showFeatureButton.setDisabled(true);
    }
  }
});
mainPanel.add(citySelect);
// Province list function
function cityList(){
  var admin= gaul;
  var city = 'ADM2_NAME';
  var province = 'ADM1_NAME';
  var provinceValue = provinceSelect.getValue();
  var list = gaul.filter(ee.Filter.eq(province, provinceValue)).aggregate_array(city).distinct().sort().evaluate(function(value){
    citySelect.items().reset(value);
  });
}
// Feature function
function feature(){
  var adminFeature = gaul;
  var value = adminSelect.getValue();
  var admin; 
  var property;
  switch (value) {
    case 'Country':
      admin = countrySelect.getValue();
      property = 'ADM0_NAME';
      break;
    case 'Province':
      admin = provinceSelect.getValue();
      property = 'ADM1_NAME';
      break;
    case 'City/regency':
      admin = citySelect.getValue();
      property = 'ADM2_NAME';
      break;
  }
  var featureFilter = adminFeature.filter(ee.Filter.eq(property, admin));
  return featureFilter;
}
// Feature name function
function featureName(){
  var adminStatus = adminSelect.getValue();
  var name;
  switch (adminStatus) {
    case 'Country':
      name = countrySelect.getValue();
      break;
    case 'Province':
      name = provinceSelect.getValue();
      break;
    case 'City':
      name = citySelect.getValue();
      break;
  }
  return name;
}
// Feature zoom
function featureZoom(){
  var value = adminSelect.getValue();
  var zoom;
  switch (value) {
    case 'Country':
      zoom = 7;
      break;
    case 'Province':
      zoom = 10;
      break;
    case 'City/regency':
      zoom = 12;
      break;
  }
  return zoom;
}
// Show feature button
var showFeatureButton = ui.Button({
  label: 'Show feature',
  disabled: true,
  onClick: function(){
    showFeature();
    var layerStatus = Map.layers().length();
    if (layerStatus === 0) {
      downloadFormatSelect.setDisabled(true);
    } else {
      downloadFormatSelect.setDisabled(false);
    }
  }
});
mainPanel.add(showFeatureButton);
// Show feature function
function showFeature(){
  Map.clear();
  downloadLinkLabel.style().set({shown: false});
  var featureFilter = feature();
  var zoom = featureZoom();
  Map.centerObject(featureFilter.geometry().centroid(), zoom);
  Map.addLayer(featureFilter);
}
// Download format select
var downloadFormatSelect = ui.Select({
  placeholder: 'Select format',
  disabled: true,
  items: ['csv', 'json', 'geojson', 'kml', 'kmz'],
  onChange: function(value){
    if (value !== null) {
      downloadFeatureButton.setDisabled(false);
    } else {
      downloadFeatureButton.setDisabled(true);
    }
  }
});
mainPanel.add(downloadFormatSelect);
// Download feature button
var downloadFeatureButton = ui.Button({
  label: 'Download feature',
  disabled: true,
  onClick: function(){
    downloadFeature();
    downloadLinkLabel.style().set({shown: true});
  }
});
mainPanel.add(downloadFeatureButton);
// Download link
var downloadLinkLabel = ui.Label({
  style: {shown: false},
  value: 'Download link'
});
mainPanel.add(downloadLinkLabel);
// Download feature function
function downloadFeature(){
  var featureFilter = feature();
  var format = downloadFormatSelect.getValue();
  var name = featureName();
  var url = featureFilter.getDownloadURL({
    format: format,
    filename: name,
    callback: function(value){
      downloadLinkLabel.setUrl(value);
      downloadLinkLabel.style().set({shown: true});
    }
  });
}