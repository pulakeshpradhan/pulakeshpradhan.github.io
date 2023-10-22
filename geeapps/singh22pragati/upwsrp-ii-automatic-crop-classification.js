var aoi = ee.FeatureCollection("users/singh22pragati/India");
var hdg = ee.FeatureCollection("users/singh22pragati/haidergarhprojectarea"),
    lalit = ee.FeatureCollection("users/singh22pragati/lalitpur"),
    lgc = ee.FeatureCollection("users/singh22pragati/command_area"),
    bewar = ee.FeatureCollection("users/singh22pragati/Bewarcommand"),
    etawah = ee.FeatureCollection("users/singh22pragati/Etawah_command_Output"),
    fathepur = ee.FeatureCollection("users/singh22pragati/Fatehpur_command_Output"),
    Non_com = ee.FeatureCollection("users/singh22pragati/Non_command_Output"),
    farrukhabad = ee.FeatureCollection("users/singh22pragati/farrukhabad_command_Output"),
    kanpur = ee.FeatureCollection("users/singh22pragati/kanpurcommand_Output"),
    west_allahabad = ee.FeatureCollection("users/singh22pragati/UPWSRP-II/Kharif/Allahabad/W_Allahabad_command"),
    bhogni = ee.FeatureCollection("users/singh22pragati/Bhognipur"),
    myCollection1 = ee.ImageCollection("users/singh22pragati/bhognirabi");
var wa = ee.FeatureCollection(bhogni)
var p = ui.Panel({
  style: {width: '400px', shown: false  },
  widgets: [ui.Label(' UPWSRP-II Command Area ')]
});
var p1 = ui.Panel({
  style: {width: '400px', shown: false  },
  widgets: [ui.Label(' Kharif ')]
});
var p2 = ui.Panel({
  style: {width: '400px', shown: false  },
  widgets: [ui.Label(' Kharif ')]
});
var b3 = ui.Button({
  label: 'UPWSRP-II Command Area',
  onClick: function() {
    b3.style().set('shown', true);
    p.style().set('shown', true);
  }
});
Map.add(b3);
ui.root.insert(0, p);
//crop classification
var startDate = '2019-08-01';
var endDate = '2019-10-30';
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
//var image2 = l8.min();
//Map.addLayer(l8.min(),{bands: ['B5', 'B4', 'B3'], max: 0.3}, 'Landsat image fcc')
function maskL8(image) {
  var qa = image.select('BQA');
  var mask = qa.bitwiseAnd(Math.pow(2, 12)).neq(1).and(  // cirrus
             qa.bitwiseAnd(Math.pow(2, 13)).neq(1)).and( // cirrus
             qa.bitwiseAnd(Math.pow(2, 14)).neq(1)).and( // cloud
             qa.bitwiseAnd(Math.pow(2, 15)).neq(1));     // cloud
  return image.updateMask(mask);
}
var image1 = l8.select(['B[1-7]'])
.filterDate(startDate, endDate)
                 //.map(maskL8)
                .min()
var image = image1.clip(aoi);
//Map.addLayer(image,{bands:['B5','B4','B3'],max:0.3},'fcc')
// Create NDVI and NDWI spectral indices.
var ndvi = image.normalizedDifference(['B5', 'B4']);
//var ndwi = image.normalizedDifference(['B3', 'B5']);
// Create a binary layer using logical operations.
var crop_lgc = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_bewar = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_etawah = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_fathepur = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_farukhabad = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_kanpur = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_westallahabad = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_bhognipur = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_hdg = ndvi.gt(0.3).and(ndvi.lt(0.6));
var crop_bundel = ndvi.gt(0.3).and(ndvi.lt(0.6));
//crop image
var ima_lgc = ee.Image(crop_lgc).clip(lgc)
var ima_bewar = ee.Image(crop_lgc).clip(bewar)
var ima_etawah = ee.Image(crop_lgc).clip(etawah)
var ima_fathepur = ee.Image(crop_lgc).clip(fathepur)
var ima_farukhabad = ee.Image(crop_lgc).clip(farrukhabad)
var ima_kanpur = ee.Image(crop_lgc).clip(kanpur)
var ima_westallahabad = ee.Image(crop_lgc).clip(west_allahabad)
var ima_bhognipur = ee.Image(crop_lgc).clip(bhogni)
var ima_hdg = ee.Image(crop_hdg).clip(hdg)
var ima_bundel = ee.Image(crop_bundel).clip(lalit)
//visualization
var rgb_vis = {min: 0, max: 1, palette: ['ffffff','00ca00']};
var b2 = ui.Button({
  label: 'UPWSRP-2 Kharif',
  onClick: function() {
    b2.style().set('shown', true);
    p1.style().set('shown', true);
     // Temporarily make a map click hide the panel
    // and show the button.
    var listenerId = Map.onClick(function() {
      p1.style().set('shown', false);
      b2.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(listenerId);
    });
  }
});
var places = {
  haidergarh :[hdg],
  Lalitpur : [lalit],
  LGC :[lgc],
  Farrukhanad: [farrukhabad],
  Bewar:[bewar],
  Bhognipur:[bhogni],
  Etawah:[etawah],
  Kanpur:[kanpur],
  Fatehpur:[fathepur],
 WestAllahabad:[west_allahabad],
 NonCommand:[Non_com]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.centerObject(places[key][0], places[key][11]);
  }
});
// Set a place holder.
select.setPlaceholder('Choose Canal Command');
var checkbox = ui.Checkbox('LGC', false);
var checkbox2 = ui.Checkbox('Bewar', false);
var checkbox3 = ui.Checkbox('Etawah', false);
var checkbox4 = ui.Checkbox('Fathepur', false);
var checkbox5 = ui.Checkbox('Farukhabad', false);
var checkbox6 = ui.Checkbox('Kanpur', false);
var checkbox7 = ui.Checkbox('West Allahabad', false);
var checkbox8 = ui.Checkbox('Bhognipur', false);
var checkbox9 = ui.Checkbox('Haidergarh', false);
var checkbox10 = ui.Checkbox('Lalitpur', false);
//checkboxes
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox2.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
checkbox3.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(2).setShown(checked);
});
checkbox4.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(3).setShown(checked);
});
checkbox5.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(4).setShown(checked);
});
checkbox6.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(5).setShown(checked);
});
checkbox7.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(6).setShown(checked);
});
checkbox8.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(7).setShown(checked);
});
checkbox9.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(8).setShown(checked);
});
checkbox10.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(9).setShown(checked);
});
p.add(select)
p.add(b2)
p.add(p1)
p1.add(checkbox,false);
p1.add(checkbox2,false);
p1.add(checkbox3,false);
p1.add(checkbox4,false);
p1.add(checkbox5,false);
p1.add(checkbox6,false);
p1.add(checkbox7,false);
p1.add(checkbox8,false);
p1.add(checkbox9,false);
p1.add(checkbox10,false);
Map.addLayer(ima_lgc,rgb_vis,'Crop LGC',false)
Map.addLayer(ima_bewar,rgb_vis,'Crop_Bewar',false);
Map.addLayer(ima_etawah,rgb_vis,'Crop Etawah',false);
Map.addLayer(ima_fathepur,rgb_vis,'Crop Fathepur',false);
Map.addLayer(ima_farukhabad,rgb_vis,'Crop Farukkhabad',false);
Map.addLayer(ima_kanpur,rgb_vis,'Crop Kanpur',false);
Map.addLayer(ima_westallahabad,rgb_vis,'Crop West allahabad',false);
Map.addLayer(ima_bhognipur,rgb_vis,'Crop Bhognipur',false);
Map.addLayer(ima_hdg,rgb_vis,'Crop  Haidergarh',false);
Map.addLayer(ima_bundel,rgb_vis,'Crop Bundelkhand',false);
var legendTitle = ui.Label({
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
//LEGEND
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['ffffff','00ca00'];
// name of the legend
var names = ['No value','Crop'];
// Add color and and names
for (var i = 0; i <2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);
Map.centerObject(lgc,8);
//vegarea
var veg = crop_lgc.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg = veg.multiply(ee.Image.pixelArea()).divide(100*100);
var stat = area_veg.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:lgc,
  scale: 30,
  maxPixels: 1e9
});
print(stat)
//vegarea
var veg1 = crop_lgc.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg1 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat1 = area_veg1.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:kanpur,
  scale: 30,
  maxPixels: 1e9
});
//vegarea
var veg1 = crop_lgc.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg2 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat2 = area_veg1.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:etawah,
  scale: 30,
  maxPixels: 1e9
});
//vegarea
var veg1 = crop_lgc.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg3 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat3 = area_veg3.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:bewar,
  scale: 30,
  maxPixels: 1e9
});
//vegarea
var veg1 = crop_lgc.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg1 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat4 = area_veg1.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:fathepur,
  scale: 30,
  maxPixels: 1e9
});
//vegarea
var veg1 = crop_lgc.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg1 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat5 = area_veg1.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:farrukhabad,
  scale: 30,
  maxPixels: 1e9
});
//vegarea
var veg1 = crop_lgc.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg1 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat6 = area_veg1.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:west_allahabad,
  scale: 30,
  maxPixels: 1e9
});
//vegarea
var veg1 = crop_lgc.select('nd').eq(1);//vegetation has 1 value in your case
var area_veg1 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat7 = area_veg1.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:bhogni,
  scale: 30,
  maxPixels: 1e9
});
var area_veg1 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat8 = area_veg1.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:hdg,
  scale: 30,
  maxPixels: 1e9
});
var area_veg1 = veg1.multiply(ee.Image.pixelArea()).divide(100*100);
var stat9 = area_veg1.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry:lalit,
  scale: 30,
  maxPixels: 1e9
});
var inspector = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
//Map.add(inspector);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 30);
  var computedValue = stat.get('nd');
  print(computedValue)
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'LGC Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector1 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector1.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 30);
  var computedValue1 = stat1.get('nd');
  print(computedValue1)
  // Request the value from the server.
  computedValue1.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector1.widgets().set(0, ui.Label({
      value: 'KANPUR Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector2 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector2.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 30);
  var computedValue2 = stat2.get('nd');
  print(computedValue2)
  // Request the value from the server.
  computedValue2.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector2.widgets().set(0, ui.Label({
      value: 'Etawah Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector3 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector3.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 30);
  var computedValue3 = stat3.get('nd');
  print(computedValue3)
  // Request the value from the server.
  computedValue3.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector3.widgets().set(0, ui.Label({
      value: 'Bewar Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector4 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector4.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 40);
  var computedValue4 = stat4.get('nd');
  print(computedValue4)
  // Request the value from the server.
  computedValue4.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector4.widgets().set(0, ui.Label({
      value: 'Fathepur Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector5 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector5.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 50);
  var computedValue5 = stat5.get('nd');
  print(computedValue5)
  // Request the value from the server.
  computedValue5.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector5.widgets().set(0, ui.Label({
      value: 'Farrukhabad Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector6 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector6.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 60);
  var computedValue6 = stat6.get('nd');
  print(computedValue6)
  // Request the value from the server.
  computedValue6.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector6.widgets().set(0, ui.Label({
      value: 'West Allahabad Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector7 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector7.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 70);
  var computedValue7 = stat7.get('nd');
  print(computedValue7)
  // Request the value from the server.
  computedValue7.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector7.widgets().set(0, ui.Label({
      value: 'Bhognipur Cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector8 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector8.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 80);
  var computedValue8 = stat8.get('nd');
  print(computedValue8)
  // Request the value from the server.
  computedValue8.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector8.widgets().set(0, ui.Label({
      value: 'Haidergarh cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var inspector9 = ui.Panel([ui.Label('Click to get  Kharif Cropped Area')]);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector9.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
 // var sample2 = (area_veg(stat)).sample(point, 80);
  var computedValue9 = stat9.get('nd');
  print(computedValue9)
  // Request the value from the server.
  computedValue9.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector9.widgets().set(0, ui.Label({
      value: 'Lalitpur cropped Area(in Ha.): ' + result.toFixed(2),
    }));
  });
});
var panel = ui.Panel({
  widgets: [inspector1,inspector2,inspector3,inspector4,inspector5,inspector6,inspector7,inspector8],
  style: {width: '400px'},
});
ui.root.add(panel);   // Add the panel to the ui.root.