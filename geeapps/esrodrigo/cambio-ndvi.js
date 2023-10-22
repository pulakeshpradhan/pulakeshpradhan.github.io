var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -71.81321610237953,
            -36.24766223294079
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-71.81321610237953, -36.24766223294079]);
// crear mascara de agua
var comuna = ['María Pinto','Curacaví'];
var boundaries = ee.FeatureCollection('users/esrodrigo/comunasCHILE')
  .filter(ee.Filter.inList('Comuna',comuna));
var canal = ee.FeatureCollection('users/esrodrigo/canales')
  .filterBounds(boundaries)
  .filter(ee.Filter.stringContains('nomcan','LAS MERCEDES'));  
var date_0 = '2020-11-15';
var date_1 = '2020-11-25';
var date_2 = '2020-12-30';
// var point = geometry;
// var geometry = /* color: #d63000 */ee.Geometry.Point([-71.24110221862793,-30.074813339923487]);
// Load or import the Hansen et al. forest change dataset.
var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
// Select the land/water mask.
var datamask = hansenImage.select('datamask');
// Create a binary mask.
var mask = datamask.eq(1);
//crear punto de selección
var coll1 = ee.ImageCollection('COPERNICUS/S2')
            .filterBounds(boundaries)
            .filterDate(date_0, date_1)
            .sort('CLOUDY_PIXEL_PERCENTAGE')
            ;
      var maskcloud1 = function(image) {
      var QA60 = image.select(['QA60']);
      return image.updateMask(QA60.lt(1));
      };
var coll1 = coll1.map(function(image) {
  return image.clip(boundaries); }
);
var coll1 = coll1.map(maskcloud1);
////////////////////////////////////////////////////////////////////////////////////////////////
// NDVI Mask coll1
var coll1 = coll1.map(function(image) {
  var ndvi_mask = image.select().addBands(image.normalizedDifference(['B8', 'B4'])).rename('NDVI');
var ndvi_mask_app = ndvi_mask;//.gte(0.150);
      return image.updateMask(ndvi_mask_app);
});
var coll2 = ee.ImageCollection('COPERNICUS/S2')
            .filterBounds(boundaries)
            .filterDate(date_1, date_2)
            .sort('CLOUDY_PIXEL_PERCENTAGE')
            ;
      var maskcloud2 = function(image) {
      var QA60 = image.select(['QA60']);
      return image.updateMask(QA60.lt(1));
      };
var coll2 = coll2.map(function(image) {
  return image.clip(boundaries); }
);
var coll2 = coll2.map(maskcloud2);
////////////////////////////////////////////////////////////////////////////////////////////////
// NDVI Mask coll2
var coll2 = coll2.map(function(image) {
  var ndvi_mask = image.select().addBands(image.normalizedDifference(['B8', 'B4'])).rename('NDVI');
var ndvi_mask_app = ndvi_mask;//.gte(0.150);
      return image.updateMask(ndvi_mask_app);
});
var img_0 = ee.Image(coll1.median());
var img_1 = ee.Image(coll2.median());
// var img1a = ee.Image('COPERNICUS/S2/20180527T144731_20180527T150020_T19JBG');
// var img2b = ee.Image('COPERNICUS/S2/20180608T143749_20180608T144455_T19JBG');
// var img3 = ee.Image('COPERNICUS/S2/20180611T144729_20180611T145550_T19JBG');
//crear mascara de nubes
var img_ndvi_0 = img_0.normalizedDifference(['B8','B4']).updateMask(mask).rename('NDVI');
var img_ndvi_1 = img_1.normalizedDifference(['B8','B4']).updateMask(mask).rename('NDVI_2');
// var img3_ndvi = img3.normalizedDifference(['B8','B4']);
var img_ndvi_2 = ((img_ndvi_1.subtract(img_ndvi_0)).divide(img_ndvi_0)).multiply(100).rename('NDVI_diff');
// var img4_ndvi_mask = img4_ndvi.gte(0.005).lte(0.005);
// var img4_ndvi = img4_ndvi.updateMask(img4_ndvi_mask);
var IMAGES = [img_ndvi_0,
              img_ndvi_1, 
              img_ndvi_2];
var NAMES = ['Antes '+date_0+' a '+date_1,
             'Después '+date_1+' a '+date_2,
             'Cambio Porcentual'];
var vis_params = {opacity: 1, min: -0.2, max: 0.9, palette: [
  'blue','SaddleBrown ','DarkKhaki','GreenYellow ','DarkGreen ','Cyan'
]};
var vis_params_2 = {opacity: 1.0, min: -100, max: 100, palette: [
  'red','yellow','white',  'green','lime'
]};
var VIS =    [ vis_params,
              vis_params, 
              vis_params_2];
var maps = [];
/////////////////////////////////////////////////////////////////////////////////////////////////
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x20',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend(low, mid, high, palette) {
  var labelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette), labelPanel]);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
NAMES.forEach(function(name, index) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(IMAGES[index], VIS[index], name, true, 0.75);
  map.addLayer(canal,{color: '3399ff'}, 'Canales');
  // map.setControlVisibility(true);
  maps.push(map);
  map.setOptions('satellite');
});
var legend_0 = makeLegend(-0.2, 'NDVI', 0.9, vis_params.palette);
legend_0.style().set({
  position: 'bottom-right'
});
var legend_1 = makeLegend(-0.2, 'NDVI', 0.9, vis_params.palette);
legend_1.style().set({
  position: 'bottom-right'
});
var legend_2 = makeLegend('-100%', 'Cambio', '+100%', vis_params_2.palette);
legend_2.style().set({
  position: 'bottom-right'
});
maps[0].add(legend_0);
maps[1].add(legend_1);
maps[2].add(legend_2);
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: false,drawingToolsControl:true,mapTypeControl:false});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[1].setControlVisibility({zoomControl: false,drawingToolsControl:true,mapTypeControl:false});
maps[2].setControlVisibility({zoomControl: false,drawingToolsControl:true,mapTypeControl:false});
// Create a title.
var title = ui.Label('Cambio en el indice vegetacional ['+comuna+']', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '16px'
});
// Create a grid of maps.
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0]], null, {stretch: 'both'}),
    ui.Panel([maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// Add the maps and title to the ui.root.
// Create a credit band.
var credits = ui.Label('Desarrollo: Rodrigo Márquez A. Ingeniero Agrónomo, 2020', {
  stretch: 'horizontal',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '10px'
});
ui.root.widgets().reset([title, mapGrid, credits]);
maps[0].centerObject(boundaries, 13, ui.root.setLayout(ui.Panel.Layout.Flow('vertical')));
//////////////////////////////////////////////////////////////////////////////
maps[0].style().set('cursor', 'crosshair');
// Create a panel and add it to the map.
var inspector_0 = ui.Panel([ui.Label('Click en mapa')]);
inspector_0.style().set({position:'bottom-right',backgroundColor:'rgba(255, 255, 255, 0.5)',fontWeight: 'Bold'});
maps[0].add(inspector_0);
///////
maps[1].style().set('cursor', 'crosshair');
// Create a panel and add it to the map.
var inspector_1 = ui.Panel([ui.Label('Click')]);
inspector_1.style().set({position:'bottom-right',backgroundColor: 'rgba(255, 255, 255, 0.5)',fontWeight: 'Bold'});
/////
maps[2].style().set('cursor', 'crosshair');
// Create a panel and add it to the map.
var inspector_2 = ui.Panel([ui.Label('Click')]);
inspector_2.style().set({position:'bottom-right',backgroundColor: 'rgba(255, 255, 255, 0.5)',fontWeight: 'Bold'});
maps[2].add(inspector_2);
/////////////////////////////////////////////
maps[0].onClick(function(coords) {
  // Show the loading label.
  inspector_0.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  inspector_1.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  inspector_2.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  var point_0 = ee.Geometry.MultiPoint(coords.lon, coords.lat);
  var dot_0 = ui.Map.Layer(point_0, {color: 'FF0000'}, "Chart Point");
  var dot_1 = ui.Map.Layer(point_0, {color: 'FF0000'}, "Chart Point");
  var dot_2 = ui.Map.Layer(point_0, {color: 'FF0000'}, "Chart Point");
  maps[0].layers().set(2, dot_0);
  maps[1].layers().set(2, dot_1);
  maps[2].layers().set(2, dot_2);
  // // Determine the mean NDVI, a long-running server operation.
  // var point_0 = ee.Geometry.Point(coords.lon, coords.lat);
  // maps[0].addLayer(point_0, {color: 'red'}, 'Punto de Muestreo');
  // maps[1].addLayer(point_0, {color: 'red'}, 'Punto de Muestreo');
  // maps[2].addLayer(point_0, {color: 'black'}, 'Punto de Muestreo');
  var meanNdvi_0 = img_ndvi_0.reduce('mean');
  var sample_0 = meanNdvi_0.sample(point_0, 10);
  var computedValue_0 = sample_0.first().get('mean');
  var meanNdvi_1 = img_ndvi_1.reduce('mean');
  var sample_1 = meanNdvi_1.sample(point_0, 10);
  var computedValue_1 = sample_1.first().get('mean');
  var meanNdvi_2 = img_ndvi_2.reduce('mean');
  var sample_2 = meanNdvi_2.sample(point_0, 10);
  var computedValue_2 = sample_2.first().get('mean');
  // Request the value from the server.
  computedValue_0.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_0.widgets().set(0, ui.Label({
      value: 'Valor NDVI: ' + result.toFixed(2)
    }));
  });
  // Request the value from the server.
  computedValue_1.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_1.widgets().set(0, ui.Label({
      value: 'Valor NDVI: ' + result.toFixed(2)
    }));
  });
  // Request the value from the server.
  computedValue_2.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_2.widgets().set(0, ui.Label({
      value: 'Diferencia ' + result.toFixed(0) +' %'
    }));
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
maps[1].add(inspector_1);
maps[1].onClick(function(coords) {
  // Show the loading label.
  inspector_1.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  inspector_0.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  inspector_2.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point_1 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot_0 = ui.Map.Layer(point_1, {color: 'FF0000'}, "Chart Point");
  var dot_1 = ui.Map.Layer(point_1, {color: 'FF0000'}, "Chart Point");
  var dot_2 = ui.Map.Layer(point_1, {color: 'FF0000'}, "Chart Point");
  maps[0].layers().set(2, dot_0);
  maps[1].layers().set(2, dot_1);
  maps[2].layers().set(2, dot_2);
  var meanNdvi_1 = img_ndvi_1.reduce('mean');
  var sample_1 = meanNdvi_1.sample(point_1, 10);
  var computedValue_1 = sample_1.first().get('mean');
  var meanNdvi_0 = img_ndvi_0.reduce('mean');
  var sample_0 = meanNdvi_0.sample(point_1, 10);
  var computedValue_0 = sample_0.first().get('mean');
  var meanNdvi_2 = img_ndvi_2.reduce('mean');
  var sample_2 = meanNdvi_2.sample(point_1, 10);
  var computedValue_2 = sample_2.first().get('mean');
  // Request the value from the server.
  computedValue_1.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_1.widgets().set(0, ui.Label({
      value: 'Valor NDVI: ' + result.toFixed(2)
    }));
  });
  // Request the value from the server.
  computedValue_0.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_0.widgets().set(0, ui.Label({
      value: 'Valor NDVI: ' + result.toFixed(2)
    }));
  });
  // Request the value from the server.
  computedValue_2.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_2.widgets().set(0, ui.Label({
      value: 'Diferencia ' + result.toFixed(0) +' %'
    }));
  });
});
/////////////////////////////////////////////////////////////////////////////////////////
maps[2].onClick(function(coords) {
  // Show the loading label.
  inspector_2.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  inspector_1.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  inspector_0.widgets().set(0, ui.Label({
    value: 'Cargando...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point_2 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot_0 = ui.Map.Layer(point_2, {color: 'FF0000'}, "Chart Point");
  var dot_1 = ui.Map.Layer(point_2, {color: 'FF0000'}, "Chart Point");
  var dot_2 = ui.Map.Layer(point_2, {color: 'FF0000'}, "Chart Point");
  maps[0].layers().set(2, dot_0);
  maps[1].layers().set(2, dot_1);
  maps[2].layers().set(2, dot_2);
  var meanNdvi_2 = img_ndvi_2.reduce('mean');
  var sample_2 = meanNdvi_2.sample(point_2, 10);
  var computedValue_2 = sample_2.first().get('mean');
  var meanNdvi_0 = img_ndvi_0.reduce('mean');
  var sample_0 = meanNdvi_0.sample(point_2, 10);
  var computedValue_0 = sample_0.first().get('mean');
  var meanNdvi_1 = img_ndvi_1.reduce('mean');
  var sample_1 = meanNdvi_1.sample(point_2, 10);
  var computedValue_1 = sample_1.first().get('mean');
  // Request the value from the server.
  computedValue_2.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_2.widgets().set(0, ui.Label({
      value: 'Diferencia ' + result.toFixed(0) +' %'
    }));
  });
  // Request the value from the server.
  computedValue_1.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_1.widgets().set(0, ui.Label({
      value: 'Valor NDVI: ' + result.toFixed(2)
    }));
  });
  // Request the value from the server.
  computedValue_0.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector_0.widgets().set(0, ui.Label({
      value: 'Valor NDVI: ' + result.toFixed(2)
    }));
  });
});