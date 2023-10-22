var IND_adm2 = ee.FeatureCollection("users/sayantandeygis/IND_adm2");
var filter = ee.Filter.inList('NAME_2', ['Kolkata', 'Haora', 'North 24 Parganas',
                              'South 24 Parganas', 'East Midnapore']);
var geometry = IND_adm2.filter(filter);
function initMap(map) {
  map.setCenter(88.35, 22.35,8);
}
initMap(Map);
//MODIS
var dataset1 = ee.ImageCollection('MODIS/006/MOD09GA')
                  .filter(ee.Filter.date('2020-05-13','2020-05-15'));
var trueColor1 =
    dataset1.select(['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03']);
var dataset2 = ee.ImageCollection('MODIS/006/MOD09GA')
                  .filter(ee.Filter.date('2020-05-19','2020-05-22'));
var trueColor2 =
    dataset2.select(['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03']);
var trueColor143Vis = {
  min: -100.0,
  max: 8000.0,
};
//Collection 1
var collection1 = ee.ImageCollection(['COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20200522T000419_20200522T000444_032670_03C8AC_635E',
                                      'COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20200516T235611_20200516T235636_032597_03C685_04D7'
                                      ]).select(['VV','VH']).filterBounds(geometry);
var stackCollection1 = function(collection1) {
  var first1 = ee.Image(collection1.first()).select([]);
  var appendBands1 = function(image, previous) {
    return ee.Image(previous).addBands(image);
  };
  return ee.Image(collection1.iterate(appendBands1, first1));
};
var stacked1 = stackCollection1(collection1).clip(geometry);
//Collection 2
var collection2 = ee.ImageCollection(['COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20200522T000444_20200522T000509_032670_03C8AC_A6E3',
                                      'COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20200516T235636_20200516T235701_032597_03C685_E3B0'
                                      ]).select(['VV','VH']).filterBounds(geometry);
var stackCollection2 = function(collection2) {
  var first2 = ee.Image(collection1.first()).select([]);
  var appendBands2 = function(image, previous) {
    return ee.Image(previous).addBands(image);
  };
  return ee.Image(collection2.iterate(appendBands2, first2));
};
var stacked2 = stackCollection2(collection2).clip(geometry);
//Collection 3
var collection3 = ee.ImageCollection(['COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20200522T235525_20200522T235550_021701_029311_859D',
                                      'COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20200516T000332_20200516T000357_021599_029010_6BDE'
                                      ]).select(['VV','VH']).filterBounds(geometry);
var stackCollection3 = function(collection3) {
  var first3 = ee.Image(collection3.first()).select([]);
  var appendBands3 = function(image, previous) {
    return ee.Image(previous).addBands(image);
  };
  return ee.Image(collection3.iterate(appendBands3, first3));
};
var stacked3 = stackCollection3(collection3).clip(geometry);
//Collection 4
var collection4 = ee.ImageCollection(['COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20200522T235550_20200522T235615_021701_029311_F87B',
                                      'COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20200516T000357_20200516T000422_021599_029010_EE74'
                                      ]).select(['VV','VH']).filterBounds(geometry);
var stackCollection4 = function(collection4) {
  var first4 = ee.Image(collection4.first()).select([]);
  var appendBands4 = function(image, previous) {
    return ee.Image(previous).addBands(image);
  };
  return ee.Image(collection4.iterate(appendBands4, first4));
};
var stacked4 = stackCollection4(collection4).clip(geometry);
//Mosaicking collections
var stacked = ee.ImageCollection.fromImages([stacked1, stacked2, stacked3, stacked4]).mosaic()
    .set(stacked1.toDictionary(stacked1.propertyNames()));
//Speckle filter
var smoothing_radius = 30;
var stacked_filtered = stacked.focal_mean(smoothing_radius, 'circle', 'meters');
var VV_1 = stacked_filtered.select(['VV_1']);
var VV = stacked_filtered.select(['VV']);
var VV_stack = VV.addBands(VV_1);
var VH_1 = stacked_filtered.select(['VH_1']);
var VH = stacked_filtered.select(['VH']);
var VH_stack = VH.addBands(VH_1);
var VV_diff = VV.divide(VV_1);
var inundation = VV_diff.gte(1.7)
function createMap1() {
  var map = new ui.Map();
  map.addLayer(trueColor1, trueColor143Vis, 'MODIS Satellite Data 14.05.20');
  map.addLayer(stacked_filtered,{bands:['VH_1','VV_1','VV_1'],min:-22, max:-3}, 'Sentinel 1 16.05.2020 ');
  map.add(ui.Label('Pre-condition', {position:'bottom-center'}));
  //East Midnapore
  var east_midnapore_button = ui.Button({
    label: 'East Midnapore',
    onClick: function() {
      map.setCenter(87.7352, 21.9355,10);
    }
  });
  east_midnapore_button.style().set('position', 'bottom-left');
  map.add(east_midnapore_button);
  //South 24 Parganas
  var south24parganas_button = ui.Button({
    label: 'South 24 Parganas',
    onClick: function() {
      map.setCenter(88.4534, 22.2237,10);
    }
  });
  south24parganas_button.style().set('position', 'bottom-left');
  map.add(south24parganas_button);
  //North 24 Parganas
  var north24parganas_button = ui.Button({
    label: 'North 24 Parganas',
    onClick: function() {
      map.setCenter(88.7345, 22.7584,10);
    }
  });
  north24parganas_button.style().set('position', 'bottom-left');
  map.add(north24parganas_button);
  //Kolkata
  var kolkata_button = ui.Button({
    label: 'Kolkata',
    onClick: function() {
      map.setCenter(88.361, 22.5505,12);
    }
  });
  kolkata_button.style().set('position', 'bottom-left');
  map.add(kolkata_button);
  //Howrah
  var howrah_button = ui.Button({
    label: 'Howrah',
    onClick: function() {
      map.setCenter(88.0479, 22.581,10);
    }
  });
  howrah_button.style().set('position', 'bottom-left');
  map.add(howrah_button);
  return map;
}
function createMap2() {
  var map = new ui.Map();
  map.addLayer(trueColor2, trueColor143Vis, 'MODIS Satellite Data 21.05.20');
  map.addLayer(stacked_filtered,{bands:['VH','VV','VV'],min:-22, max:-3}, 'Sentinel 1 22.05.2020 ');
  map.add(ui.Label('Post-condition', {position:'bottom-center'}));
  //ZOOM
  var zoom_button = ui.Button({
    label: 'Zoom to Full Extent',
    onClick: function() {
    map.setCenter(88.35, 22.35,8);
    }
  });
  zoom_button.style().set('position', 'top-center');
  map.add(zoom_button);
  return map;
}
function createMap3() {
  var map = new ui.Map();
  var Palette = [
  '#ff0000',
  '#ffff00'
  ];
  map.addLayer(inundation,{palette: Palette}, 'Inundation');
  var empty = ee.Image().byte();
  var outline = empty.paint({
    featureCollection: geometry,
    color: 5,
    width: 1
  });
  map.addLayer(outline, {palette: 'black'}, 'Study Area');
  map.add(ui.Label('Inundation', {position:'bottom-center'}));
  // LEGEND
  var legend = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '8px 15px'
    }
  });
  var legendTitle = ui.Label({
    value: 'Legend',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  legend.add(legendTitle);
  var makeRow = function(color, name) {
        var colorBox = ui.Label({
         style: {
           backgroundColor: '#' + color,
           padding: '8px',
           margin: '0 0 4px 0'
          }
        });
        var description = ui.Label({
          value: name,
          style: {margin: '0 0 4px 6px'}
        });
        return ui.Panel({
          widgets: [colorBox, description],
          layout: ui.Panel.Layout.Flow('horizontal')
        });
  };
  var palette =['FF0000', 'FFFF00'];
  var names = ['Non-Inundated','Inundated'];
  for (var i = 0; i < 2; i++) {
    legend.add(makeRow(palette[i], names[i]));
    }  
  map.add(legend);  
  return map;
}
function createMap(title) {
  var map = ui.Map();
  ui.Label(title, {position:'top-center'});
  map.add(title);
  return map;
}
function getMapSize() {
  var scale = Map.getScale();
  var bounds = ee.Geometry(Map.getBounds(true)).transform('EPSG:32645', scale).coordinates().get(0).getInfo();
  var ll = bounds[0];
  var ur = bounds[2];
  var width = (ur[0] - ll[0]) / scale;
  var height = (ur[1] - ll[1]) / scale;
  return { w: Math.floor(width), h: Math.floor(height) };
}
var maps = [createMap1(), createMap2(), createMap3()];
var height = getMapSize();
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '100vw', height: height + 'px'}
});
var linker = ui.Map.Linker(maps)
maps.map(function(map) { 
  initMap(map)
  map.setOptions('HYBRID')
  panel.add(map)
})
ui.root.clear();
ui.root.add(panel);