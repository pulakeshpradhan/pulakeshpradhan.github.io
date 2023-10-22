var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/victoryuyung26/IDN_adm2"
    }) || ee.FeatureCollection("users/victoryuyung26/IDN_adm2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//####################### Import SHP #######################
var countries = Indonesia //Import SHP DIVA GIS
var Nama_Kota = ['Dumai'] //Mendefinisikan nama Kota Dumai
var area = countries.filter(ee.Filter.inList('NAME_2', Nama_Kota));//Mendefinisikan geometri
var geometry = ee.FeatureCollection(area);//Mendefinisikan area yang akan di clip
Map.centerObject(area, 8);//zoom ke area yang telah ditentukan dengan tingkat zoom 8
//####################### Perhitungan LST #######################
//Cloud masking
var cloudMask = function(image) {
 var clouds = ee.Algorithms.Landsat.simpleCloudScore(image).select(['cloud']);
 return image.updateMask(clouds.lte(10));
};
//Menghitung NDVI
var ndvi = function(image) {
 return image.addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI'));
};
//Meload image collection landsat 8
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
 .filterBounds(area)
 .filterDate('2014-01-01', '2020-12-31')
 .map(cloudMask)
 .map(ndvi)
;
print(l8);
//Memilih citra landsat 8 dari band 10 dan ndvi
var l8_sel = l8.select(['B10', 'NDVI']);
//Menghitung LST
var LST = function(image){
 var time = image.get('system:time_start');
 var temp = image.expression('(B10/(1+(10.8*B10/14388)*log((0.004*((ndvi-0.2)/0.3)+0.986))))-273.15',
              {'ndvi': image.select('NDVI'), 'B10': image.select('B10')})
              .rename("celsius")
              .set('system:time_start',time);
 return temp;
};
//Membuat citra landsat 8 yang sudah terdiri dari hitungan LST
var l8_LST = l8_sel.map(LST);
//Melakukan reduksi citra landsat 8 hasil hitungan LST
var l8_LST_red = l8_LST.reduce(ee.Reducer.median())
;
//Visualisasi hasil LST ke layer
Map.addLayer(l8_LST_red.clip(geometry), {min: 0, max:40, palette: [
'ffffcc','ffeda0','fed976','feb24c',
  'fd8d3c','fc4e2a','e31a1c','bd0026','800026'
 ]},'LST');
//####################### Pembuatan Time Series #######################
//Pembuatan Pemanggil data Time Series
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
 var layer = drawingTools.layers().get(0);
 drawingTools.layers().remove(layer);
}
var dummyGeometry =
 ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
 var layers = drawingTools.layers();
 layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawPoint() {
 clearGeometry();
 drawingTools.setShape('point');
 drawingTools.draw();
}
var symbol = {
 point: '📌',
};
var controlPanel = ui.Panel({
 widgets: [
 ui.Label('Pilih Titik.'),
 ui.Button({
label: symbol.point + ' Titik',
 onClick: drawPoint,
 style: {stretch: 'horizontal'}
 }),
 ],
 style: {position: 'bottom-left'},
 layout: null,
});
Map.add(controlPanel);
//Pembuatan Data Tampilan Grafik Time Series
var chartPanel = ui.Panel({
 style:
 {height: '250px', width: '450px', position: 'bottom-left', shown: false}
});
Map.add(chartPanel);
function chartLSTTimeSeries() {
 // Make the chart panel visible the first time a geometry is drawn.
 if (!chartPanel.style().get('shown')) {
 chartPanel.style().set('shown', true);
 }
 // Get the drawn geometry; it will define the reduction region.
 var aoi = drawingTools.layers().get(0).getEeObject();
 // Set the drawing mode back to null; turns drawing off.
 drawingTools.setShape(null);
 // Reduction scale is based on map scale to avoid memory/timeout errors.
 var mapScale = Map.getScale();
 var scale = mapScale > 5000 ? mapScale * 2 : 5000;
 // Chart LST time series for the selected area of interest.
 var chart = ui.Chart.image.seriesByRegion({
 imageCollection: l8_LST,
 regions: aoi,
 reducer: ee.Reducer.mean(),
 band: "celsius",
 scale: scale,
 xProperty: 'system:time_start'
 })
 .setOptions({
 titlePostion: 'none',
 legend: {position: 'none'},
 title: 'Time Series Suhu Permukaan di Jayapura',
 hAxis: {title: 'Date'},
 vAxis: {title: 'Suhu (Celcius)'},
 series: {0: {color: '23cba7'}}
 });
 // Replace the existing chart in the chart panel with the new chart.
 chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartLSTTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartLSTTimeSeries, 500));
// LEGEND CONFIGURATION
//---------------------
//////
// Create map title
var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '10px 20px'
  }
});
var textTitle = ui.Label({
  value: 'Peta Land Surface Temperature Landsat 8 Tahun 2014-2020',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
title.add(textTitle);
Map.add(title)
// Temperature legend
var visTave = {
  min: 0, 
  max: 35, 
  palette: ['ffffcc','ffeda0','fed976','feb24c',
  'fd8d3c','fc4e2a','e31a1c','bd0026','800026']
};
var layer_tave_d1 = ui.Map.Layer(l8_LST_red.clip(geometry),visTave,'Temp - Temperature (°C)', true)
// Create legend title
var TaveLegendTitle = ui.Label({value: 'Temp',style: {fontWeight: 'bold',fontSize: '14px',
    margin: '0 0 4px 10',padding: '0'}});
// Create text on top of legend
var Taveunit = ui.Label({value:'(°C)'});
var TaveunitMax = ui.Label({value: '35'});
// Create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var TaveGradient = lon.multiply((visTave.max-visTave.min)/100.0).add(visTave.min);
var TaveLegendImage = TaveGradient.visualize(visTave);
var TaveThumb = ui.Thumbnail({image: TaveLegendImage,params: {bbox:'0,0,20,100', dimensions:'20x250'},
    style: {padding: '1px', position: 'bottom-center'}});
var TaveunitMin = ui.Label({value: '0'});
// Set position of panel
var TaveLegend = ui.Panel({
  widgets: [TaveLegendTitle, Taveunit, TaveunitMax, TaveThumb, TaveunitMin],
  style: {position: 'bottom-left',padding: '8px 4px'}});
//////
// Panel Legends
// Vertical ramp color
var vertRamp = ui.Panel({
  widgets: [TaveLegend],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
var panel_legends = ui.Panel();
panel_legends.style().set({
  width: '250px',  
  height: '500px',  
  position: 'top-right',  
  color: 'black',  
  shown: false
});
Map.add(panel_legends);
// Legend title
var Lintro = ui.Panel([
  ui.Label({
    value: 'Legenda',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
// Add a button to close legend
  // Add a button to hide the Panel.
var Closebut = ui.Button({label: 'Tutup', style: {color: 'black'},
  onClick: function() {
    panel_legends.style().set('shown', false);
    button.style().set('shown', true);
    }
  });
//
// Add a button to hide the Panel.
var buts = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), widgets:[Lintro, Closebut], 
    style: {width: '420px', height: '60px', position:'top-right'}});
panel_legends.add(buts);
panel_legends.add(vertRamp);
// Create a button to unhide the panel.
var button = ui.Button({
  label: 'Lihat Legenda',
  style: {position: 'bottom-right', color: 'black'},
  onClick: function() {
    // Hide the button.
    button.style().set('shown', false);
    // Display the panel.
    panel_legends.style().set('shown', true);
    // Temporarily make a map click hide the panel
    // and show the button.
    var listenerId = Map.onClick(function() {
      panel_legends.style().set('shown', false);
      button.style().set('shown', true);
      // Once the panel is hidden, the map should not try to close it by listening for clicks.
      Map.unlisten(listenerId);
    });
  }
});
// Add the button to the map and the panel to root.
Map.add(button);