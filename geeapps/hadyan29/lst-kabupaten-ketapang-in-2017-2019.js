var indonesia = ui.import && ui.import("indonesia", "table", {
      "id": "users/hadyan29/IDN_adm2"
    }) || ee.FeatureCollection("users/hadyan29/IDN_adm2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            110.4980854304296,
            -1.747194132211935
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.Point([110.4980854304296, -1.747194132211935]);
//####################### Import SHP #######################
var countries = indonesia //Import SHP DIVA GIS
var Nama_Kabupaten = ['Ketapang'] //Import nama daerah yang menjadi studi kasus 
var geometry = countries.filter(ee.Filter.inList('NAME_2', Nama_Kabupaten)); //Import geometris dari daerah yang menjadi studi kasus
var area = ee.FeatureCollection(geometry); //Mendefinisikan daerah yang akan dilakukan proses clipping
Map.addLayer(geometry,{color:"Blue" },"Kabupaten Ketapang"); //Menampilkan daerah yang menjadi studi kasus (AOI)
Map.centerObject(area, 8); // Melakukan fokus ke daerah yang dipilih
//###################Import LST image collection menggunakan MODIS#############
var modis = ee.ImageCollection("MODIS/006/MOD11A2");
//Mendefinisikan rentang waktu yang digunakan
var start = ee.Date('2017-01-01');
var end = ee.Date('2019-12-31')
var dateRange = ee.DateRange(start, end.advance(0, 'year'));
var mod11a2 = modis.filterDate(dateRange); //Melakukan filter data modis terhadap rentang waktu yang dipilih
var modLSTday = mod11a2.select('LST_Day_1km');//Memilih band yang digunakan
//Mengkonversi Kelvin kedalam Celcius dan melakukan setting awal waktu
var modLSTc = modLSTday.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
//Menampilkan hasil visualisasi ke peta
var clippedLSTc = modLSTc.mean().clip(area);
Map.addLayer(clippedLSTc, {
  min: 20, max: 40,
  palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']},
  'Temperature Kabupaten Ketapang in 2017-2019');
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
 ui.Label('Take A Point'),
 ui.Button({
label: symbol.point + ' Point',
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
 {height: '250px', width: '450px', position: 'bottom-right', shown: false}
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
  imageCollection: modLSTc,
  regions: aoi,
  reducer: ee.Reducer.mean(),
  band: "LST_Day_1km",
  scale: scale,
  xProperty: 'system:time_start'
})
 .setOptions({
 titlePostion: 'none',
 legend: {position: 'none'},
 title: 'Land Surface Temperature Average in 2017-2019',
 hAxis: {title: 'Date'},
 vAxis: {title: 'Temperature (Celcius)'},
 series: {0: {color: '23cba7'}}
 });
 // Replace the existing chart in the chart panel with the new chart.
 chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartLSTTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartLSTTimeSeries, 500));
//####################### Membuat Legenda #######################
// LEGEND CONFIGURATION
// Create map title
var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '10px 20px'
  }
});
var textTitle = ui.Label({
  value: 'Land Surface Temperature Average in 2017-2019',
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
 min: 20, 
 max: 40,
  palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']
};
var layer_tave_d1 = ui.Map.Layer(clippedLSTc.clip(geometry),visTave,'Temp - Temperature (°C)', true)
// Create legend title
var TaveLegendTitle = ui.Label({value: 'Temp',style: {fontWeight: 'bold',fontSize: '14px',
    margin: '0 0 4px 10',padding: '0'}});
// Create text on top of legend
var Taveunit = ui.Label({value:'(°C)'});
var TaveunitMax = ui.Label({value: '40'});
// Create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var TaveGradient = lon.multiply((visTave.max-visTave.min)/100.0).add(visTave.min);
var TaveLegendImage = TaveGradient.visualize(visTave);
var TaveThumb = ui.Thumbnail({image: TaveLegendImage,params: {bbox:'0,0,20,100', dimensions:'20x250'},
    style: {padding: '1px', position: 'bottom-left'}});
var TaveunitMin = ui.Label({value: '20'});
// Set position of panel
var TaveLegend = ui.Panel({
  widgets: [TaveLegendTitle, Taveunit, TaveunitMax, TaveThumb, TaveunitMin],
  style: {position: 'bottom-left',padding: '8px 4px'}});
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
  position: 'bottom-left',  
  color: 'black',  
  shown: false
});
Map.add(panel_legends);
// Legend title
var Lintro = ui.Panel([
  ui.Label({
    value: 'Legend',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
// membuat tombol untuk mentutup legenda
  // membuat tombol untuk menyembunyikan panel
var Closebut = ui.Button({label: 'Close', style: {color: 'black'},
  onClick: function() {
    panel_legends.style().set('shown', false);
    button.style().set('shown', true);
    }
  });
//
// membuat tombol untuk menyembunyikan panel
var buts = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), widgets:[Lintro, Closebut], 
    style: {width: '420px', height: '60px', position:'top-right'}});
panel_legends.add(buts);
panel_legends.add(vertRamp);
// membuat tombol untul tidak menyembunyikan panel
var button = ui.Button({
  label: 'Open Legend',
  style: {position: 'bottom-left', color: 'black'},
  onClick: function() {
    // Menyembunyikan tombol
    button.style().set('shown', false);
    // memunculkan panel
    panel_legends.style().set('shown', true);
    // Membuat panel sembunyi ketika di klik
    // Menampilkan tombol
    var listenerId = Map.onClick(function() {
      panel_legends.style().set('shown', false);
      button.style().set('shown', true);
      //  Once the panel is hidden, the map should not try to close it by listening for clicks.
      Map.unlisten(listenerId);
    });
  }
});
// Menampilkna tombol kedalam peta
Map.add(button);