var legendShown=false;
var layersShown=false;
var YYYY = 2022;
var YYm1 = YYYY-1;
var YYm2 = YYYY-2;
var YYm3 = YYYY-3;
var YYm4 = YYYY-4;
var YYm5 = YYYY-5;
var YYm6 = YYYY-6;
var YYm7 = YYYY-7;
var YYm8 = YYYY-8;
var YYm9 = YYYY-9;
var YYmX = YYYY-10;
var CDLmX = ee.Image('USDA/NASS/CDL/'+YYmX).select(['cropland']);
var CDLm9 = ee.Image('USDA/NASS/CDL/'+YYm9).select(['cropland']);
var CDLm8 = ee.Image('USDA/NASS/CDL/'+YYm8).select(['cropland']);
var CDLm7 = ee.Image('USDA/NASS/CDL/'+YYm7).select(['cropland']);
var CDLm6 = ee.Image('USDA/NASS/CDL/'+YYm6).select(['cropland']);
var CDLm5 = ee.Image('USDA/NASS/CDL/'+YYm5).select(['cropland']);
var CDLm4 = ee.Image('USDA/NASS/CDL/'+YYm4).select(['cropland']);
var CDLm3 = ee.Image('USDA/NASS/CDL/'+YYm3).select(['cropland']);
var CDLm2 = ee.Image('USDA/NASS/CDL/'+YYm2).select(['cropland']);
var CDLm1 = ee.Image('USDA/NASS/CDL/'+YYm1).select(['cropland']);
var palette = CDLm1.getInfo().properties['cropland_class_palette'];
var classes = CDLm1.getInfo().properties['cropland_class_values'];
var final_palette = [];
for (var i = 0; i < classes.length; ++i) {
  final_palette[classes[i]] = palette[i];
}
for (var i = 0; i < final_palette.length; ++i) {
  if (final_palette[i] === undefined) {
    final_palette[i] = '000000';
  }
}
var buttonGoTo = ui.Button({
    label: 'Go To Current Location',
    style: {position: 'bottom-center', padding: '3px', width: '135px'},
    onClick: function () {
        ui.util.getCurrentPosition(function (pt) {
            pt.evaluate(function (pt) {
                if (!pt) {
                    return;
                }
            });
            Map.centerObject(pt,14);
        });
    }
});
var buttonLayers = ui.Button({
  label: 'Show Layers Control',
  style: {position: 'bottom-left', padding: '3px', width: '135px'},
  onClick: function () {
    if (layersShown) {
      buttonLayers.setLabel('Show Layers Control');
      checkPanel.style().set({shown: false});
      layersShown = false;
    }
    else {
      buttonLayers.setLabel('Hide Layers Control');
      checkPanel.style().set({shown: true});
      layersShown = true;
    }
  }
});
var buttonLegend = ui.Button({
  label: 'Show Abridged Legend',
  style: {position: 'bottom-right', padding: '3px', width: '135px'},
  onClick: function () {
    if (legendShown) {
      buttonLegend.setLabel('Show Abridged Legend');
      legend.style().set({shown:false});
      legendShown = false;
    }
    else {
      buttonLegend.setLabel('Hide Abridged Legend');
      legend.style().set({shown:true});
      legendShown = true;
    }
  }
});
Map.setControlVisibility(false,false,false,true,false,false,false);
//Map.setCenter(-98,40,4);
Map.centerObject(CDLm1,3);
Map.addLayer(CDLmX,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYmX,0);
Map.addLayer(CDLm9,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm9,0);
Map.addLayer(CDLm8,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm8,0);
Map.addLayer(CDLm7,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm7,0);
Map.addLayer(CDLm6,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm6,0);
Map.addLayer(CDLm5,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm5,0);
Map.addLayer(CDLm4,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm4,0);
Map.addLayer(CDLm3,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm3,0);
Map.addLayer(CDLm2,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm2,0);
Map.addLayer(CDLm1,{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm1,1);
var checkboxYYmX = ui.Checkbox("'"+(2000-YYmX)*-1, false);
var checkboxYYm9 = ui.Checkbox("'"+(2000-YYm9)*-1, false);
var checkboxYYm8 = ui.Checkbox("'"+(2000-YYm8)*-1, false);
var checkboxYYm7 = ui.Checkbox("'"+(2000-YYm7)*-1, false);
var checkboxYYm6 = ui.Checkbox("'"+(2000-YYm6)*-1, false);
var checkboxYYm5 = ui.Checkbox("'"+(2000-YYm5)*-1, false);
var checkboxYYm4 = ui.Checkbox("'"+(2000-YYm4)*-1, false);
var checkboxYYm3 = ui.Checkbox("'"+(2000-YYm3)*-1, false);
var checkboxYYm2 = ui.Checkbox("'"+(2000-YYm2)*-1, false);
var checkboxYYm1 = ui.Checkbox("'"+(2000-YYm1)*-1, true);
checkboxYYm1.onChange(function(checked) {
  Map.layers().get(9).setShown(checked);
});
checkboxYYm2.onChange(function(checked) {
  Map.layers().get(8).setShown(checked);
});
checkboxYYm3.onChange(function(checked) {
  Map.layers().get(7).setShown(checked);
});
checkboxYYm4.onChange(function(checked) {
  Map.layers().get(6).setShown(checked);
});
checkboxYYm5.onChange(function(checked) {
  Map.layers().get(5).setShown(checked);
});
checkboxYYm6.onChange(function(checked) {
  Map.layers().get(4).setShown(checked);
});
checkboxYYm7.onChange(function(checked) {
  Map.layers().get(3).setShown(checked);
});
checkboxYYm8.onChange(function(checked) {
  Map.layers().get(2).setShown(checked);
});
checkboxYYm9.onChange(function(checked) {
  Map.layers().get(1).setShown(checked);
});
checkboxYYmX.onChange(function(checked) {
  Map.layers().get(0).setShown(checked);
});
var checkPanel = ui.Panel();
checkPanel.style().set({
  position: 'bottom-left',
  padding: '0px',
  shown: false
});
checkPanel.add(checkboxYYm1);
checkPanel.add(checkboxYYm2);
checkPanel.add(checkboxYYm3);
checkPanel.add(checkboxYYm4);
checkPanel.add(checkboxYYm5);
checkPanel.add(checkboxYYm6);
checkPanel.add(checkboxYYm7);
checkPanel.add(checkboxYYm8);
checkPanel.add(checkboxYYm9);
checkPanel.add(checkboxYYmX);
Map.setOptions("HYBRID");
var title = ui.Label('USDA/NASS CDL Viewer', {
  position: 'top-center',
  padding: '6px',
});
Map.add(title); 
Map.add(buttonLayers);
Map.add(checkPanel);
Map.add(buttonLegend);
Map.add(buttonGoTo);
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '6px 9px'
  }
});
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '5px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 3px 6px', fontSize:"12px"}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('ffa5e2', 'Alfalfa'));
legend.add(makeRow('e2007c', 'Barley'));
legend.add(makeRow('ffd300', 'Corn'));
legend.add(makeRow('ff2626', 'Cotton'));
legend.add(makeRow('bebe77', 'Fallow/Idle'));
//legend.add(makeRow('a05989', 'Oats'));
legend.add(makeRow('00a8e2', 'Rice'));
legend.add(makeRow('ff9e0a', 'Sorghum'));
legend.add(makeRow('267000', 'Soybeans'));
legend.add(makeRow('d8b56b', 'Spring Wheat'));
legend.add(makeRow('a57000', 'Winter Wheat'));
legend.add(makeRow('ffffff', ''));
legend.add(makeRow('ccbfa3', 'Barren'));
legend.add(makeRow('999999', 'Developed'));
legend.add(makeRow('e8ffbf', 'Grassland'));
legend.add(makeRow('c6d69e', 'Shrubland'));
legend.add(makeRow('4970a3', 'Water'));
legend.add(makeRow('7cafaf', 'Wetland'));
legend.add(makeRow('93cc93', 'Woodland'));
legend.style().set({shown: false});
Map.add(legend);