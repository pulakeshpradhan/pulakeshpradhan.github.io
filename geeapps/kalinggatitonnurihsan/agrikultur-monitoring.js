var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.45001252631664,
                2.286684753594166
              ],
              [
                101.92471118788296,
                -6.399533965882558
              ],
              [
                116.95875370346491,
                -10.290652719862502
              ],
              [
                123.72633182846491,
                -11.19731653033766
              ],
              [
                125.57203495346491,
                -10.247411344881606
              ],
              [
                126.93433964096491,
                -9.424731369736126
              ],
              [
                128.8239880784649,
                -9.684745213247252
              ],
              [
                132.2956677659649,
                -8.817279158791981
              ],
              [
                135.5915662034649,
                -8.860702577554493
              ],
              [
                138.7995740159649,
                -9.29465061708296
              ],
              [
                140.9528943284649,
                -9.207903213156465
              ],
              [
                141.03777647643537,
                -2.56064847261961
              ],
              [
                141.21355772643537,
                -1.9898121535265048
              ],
              [
                135.03241469220816,
                1.9641824782234585
              ],
              [
                130.37421156720816,
                4.596348171638882
              ],
              [
                125.97968031720818,
                5.2968499518413905
              ],
              [
                123.36631054258736,
                4.175154723781889
              ],
              [
                117.96103710508736,
                4.218982183680633
              ],
              [
                116.73056835508736,
                4.482729823999332
              ],
              [
                115.87354241264259,
                4.4934366188245445
              ],
              [
                115.67588085508736,
                4.218982183680633
              ],
              [
                114.13779491758736,
                1.4540892034705502
              ],
              [
                112.90732616758736,
                1.8494318901602365
              ],
              [
                110.53427929258736,
                0.9708004275155665
              ],
              [
                109.63302617768161,
                1.9685438179673376
              ],
              [
                109.64222691526743,
                2.0881346550194335
              ],
              [
                109.12797391767859,
                5.0711007295767025
              ],
              [
                106.45829618330359,
                4.906930208579158
              ],
              [
                105.11087326842149,
                2.970922765014034
              ],
              [
                104.69339279967149,
                1.3681210307236025
              ],
              [
                103.74856858092149,
                1.1868917500268394
              ],
              [
                103.05093674498399,
                1.3955788631413062
              ],
              [
                100.44825275222136,
                3.356355534807722
              ],
              [
                97.28419025222136,
                6.115188262285352
              ],
              [
                94.77930743972136,
                6.268099598552002
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[94.45001252631664, 2.286684753594166],
          [101.92471118788296, -6.399533965882558],
          [116.95875370346491, -10.290652719862502],
          [123.72633182846491, -11.19731653033766],
          [125.57203495346491, -10.247411344881606],
          [126.93433964096491, -9.424731369736126],
          [128.8239880784649, -9.684745213247252],
          [132.2956677659649, -8.817279158791981],
          [135.5915662034649, -8.860702577554493],
          [138.7995740159649, -9.29465061708296],
          [140.9528943284649, -9.207903213156465],
          [141.03777647643537, -2.56064847261961],
          [141.21355772643537, -1.9898121535265048],
          [135.03241469220816, 1.9641824782234585],
          [130.37421156720816, 4.596348171638882],
          [125.97968031720818, 5.2968499518413905],
          [123.36631054258736, 4.175154723781889],
          [117.96103710508736, 4.218982183680633],
          [116.73056835508736, 4.482729823999332],
          [115.87354241264259, 4.4934366188245445],
          [115.67588085508736, 4.218982183680633],
          [114.13779491758736, 1.4540892034705502],
          [112.90732616758736, 1.8494318901602365],
          [110.53427929258736, 0.9708004275155665],
          [109.63302617768161, 1.9685438179673376],
          [109.64222691526743, 2.0881346550194335],
          [109.12797391767859, 5.0711007295767025],
          [106.45829618330359, 4.906930208579158],
          [105.11087326842149, 2.970922765014034],
          [104.69339279967149, 1.3681210307236025],
          [103.74856858092149, 1.1868917500268394],
          [103.05093674498399, 1.3955788631413062],
          [100.44825275222136, 3.356355534807722],
          [97.28419025222136, 6.115188262285352],
          [94.77930743972136, 6.268099598552002]]]);
/* Judul Penelitian: Low Cost Monitoring untuk Mendukung Peningkatan Produktivitas pada Sektor Agrikultur di Indonesia Pasca Pandemi COVID-19
    Penulis : Kalingga Titon Nur Ihsan*, Derick C. A. Masse, Tania Septi Anggraini 
*/
/*-------------------------------------------------------------------------------------------
Input Data untuk Aplikasi Monitoring
---------------------------------------------------------------------------------------------*/
//NDVI
var NDVI1 = ee.ImageCollection('MODIS/006/MOD13A2')
            .map(function(image){return image});
var NDVI = NDVI1.map(function(image) {
  var NDVI2 = image.expression(
    ' 0.0001 * band', {
      'band': image.select('NDVI')
}).rename('NDVI1')
return image.addBands(NDVI2);
});
//visualisasi rata-rata NDVI 2020
var NDVI_Vis = NDVI
.filterDate('2020-01-01','2020-01-31')
.filterBounds(geometry)
.select('NDVI1')
.mean();
//Data Suhu Permukaan Tanah
var LST1 = ee.ImageCollection('MODIS/006/MOD11A2')
            .map(function(image){return image})
var LST = LST1.map(function(image) {
  var LST2 = image.expression(
    ' 0.002 * band', {
      'band': image.select('LST_Day_1km')
}).rename('LST1');
return image.addBands(LST2);
});
//visualisasi rata-rata LST 2020
var LST_Vis = LST
.filterDate('2020-01-01','2020-01-31')
.filterBounds(geometry)
.select('LST1')
.mean();
//Input Data NDDI
var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
            .map(function(image){return image})
var NDDI = dataset.map(function(image) {
  var NDDI2 = image.expression(
    '(((band5 -  band4)/(band5 + band4))-((band5 -  band6)/(band5 + band6)))/(((band5 -  band4)/(band5 + band4))+((band5 -  band6)/(band5 + band6)))', {
      'band4': image.select('SR_B4'),
      'band6': image.select('SR_B6'),
      'band5': image.select('SR_B5')
})//.rename('NDDI1');
var NDDI3 = NDDI2.focal_median(1000, 'circle', 'meters')
.rename('NDDI1');
return image.addBands(NDDI3);
});
//visualisasi rata-rata NDDI 2020
var NDDI_Vis = NDDI
.filterDate('2020-01-01','2020-01-31')
.filterBounds(geometry)
.select('NDDI1')
.mean();
//Presipitasi Bulanan
var dataset1 = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
            .map(function(image){return image})
var Presipitasi = dataset1.map(function(image) {
  var Presipitasi2 = image.expression(
    'band', {
      'band': image.select('pr'),
}).rename('Presipitasi1');
return image.addBands(Presipitasi2);
});
//Visualisasi Presipitasi Jumlah presipitasi 2020
var Presipitasi_Vis = Presipitasi
.filterDate('2020-01-01','2020-01-31')
.filterBounds(geometry)
.select('Presipitasi1')
.sum();
//Kelembapan Tanah
var dataset2 = ee.ImageCollection('NASA_USDA/HSL/SMAP10KM_soil_moisture')
            .map(function(image){return image})
var Kelembapan = dataset2.map(function(image) {
  var Kelembapan2 = image.expression(
    'band*100', {
      'band': image.select('smp'),
}).rename('Kelembapan1');
return image.addBands(Kelembapan2);
});
//visualisasi rata-rata kelembapan pertahun
var Kelembapan_Vis = Kelembapan
.filterDate('2020-01-01','2020-01-31')
.filterBounds(geometry)
.select('Kelembapan1')
.mean();
/*-------------------------------------------------------------------------------------------
Proses Pemanggilan Data untuk Aplikasi Monitoring
---------------------------------------------------------------------------------------------*/
// Membuat peta utama aplikasi
var mapPanel = ui.Map();
//Membuat tools Pemanggil data 
var drawingTools = mapPanel.drawingTools();
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
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
     //ui.Label('Pilih Lokasi'),
    ui.Button({
      label: symbol.rectangle +'Segiempat',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon +'Area',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + 'Titik',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
      ],
  style: {position: 'bottom-left'},
  layout: null,
});
//visualisasi Peta
mapPanel.add(controlPanel);
//Pembuatan Panel Samping
var inspectorPanel = ui.Panel({style: {width: '25%'}});
// Create a panel to hold title, intro text, chart and legend components.
// add hyperlink to read full paper
var label_url_viewer = ui.Label({
    value:'Click here to read our full paper',
    style: {fontSize: '13px', fontWeight: 'bold'}
  });
label_url_viewer.setUrl('LINK PAPER JIKA ADA');
var intro = ui.Panel([
  ui.Label({
    value: 'Low Cost Monitoring untuk Mendukung Peningkatan Produktivitas pada Sektor Agrikultur di Indonesia Pasca Pandemi COVID-19 ',
    style: {fontSize: '22px', fontWeight: 'bold'}
  }),
   ui.Label({
    value: 'Kalingga Titon Nur Ihsan*, Derick C. A. Masse, Tania Septi Anggraini',
    style: {fontSize: '10px', fontWeight: 'bold'}
  }),
    ui.Label({
    value: 'Deskripsi',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Aplikasi ini dapat digunakan dalam  melakukan monitoring Agrikultur. Anda bisa mengecek nilai kekeringan tanaman, Indeks vegetasi (NDVI), Suhu lingkungan, Curah hujan, dan Kelembaban Tanah. Data yang disajikan berupa data satelit yang terbaru dan menyimpan data sebelumnya.  Anda bisa mengunduh data yang Anda perlukan untuk meningkatkan hasil agrikultur Anda.' +
    ' Tata Cara Penggunaan:'+
'  (1.)	Pilih Lokasi Agrikultur Anda, (bisa menggunakan titik maupun luasan)'+
'  (2.)	Tunggu Beberapa saat sampai muncul grafik disebelah kanan'+
'  (3.)	Untuk tampilan lebih jelas silahkan buka grafik tersebut secara terpisah'+
'  (4.)	Aplikasi ini juga bisa melihat penampilan data secara spasial pada bagian Layers'
,
    style: {fontSize: '13px'}
  }),
]);
inspectorPanel.add(intro);
//PEMBUATAN CHART NDDI
function chartNDDITimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!inspectorPanel.style().get('shown')) {
    inspectorPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 30 ? mapScale * 2 : 30;
  // Chart NDVI time series for the selected area of interest.
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: NDDI,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'NDDI1',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    title: 'Indeks Kekeringan Tanaman',
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Indeks Kekeringan Tanaman'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
   inspectorPanel.widgets().set(1, chart);
}
drawingTools.onDraw(ui.util.debounce(chartNDDITimeSeries, 30));
drawingTools.onEdit(ui.util.debounce(chartNDDITimeSeries, 30));
//PEMBUATAN CHART lst
function chartLSTTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!inspectorPanel.style().get('shown')) {
    inspectorPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 1000 ? mapScale * 2 : 1000;
  // Chart NDVI time series for the selected area of interest.
  var chart2 = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: LST,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'LST1',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    title: 'Suhu Lingkungan',
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Suhu (Celcius)'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
   inspectorPanel.widgets().set(2, chart2);
}
drawingTools.onDraw(ui.util.debounce(chartLSTTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartLSTTimeSeries, 500));
//PEMBUATAN CHART CURAH HUJAN
// Map.add(chartPanel1);
function chartHumidityTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!inspectorPanel.style().get('shown')) {
    inspectorPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Chart NDVI time series for the selected area of interest.
  var chart1 = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: Presipitasi,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'Presipitasi1',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    title: 'Curah Hujan',
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Curah Hujan (mm/bulan)'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  inspectorPanel.widgets().set(3, chart1);
}
drawingTools.onDraw(ui.util.debounce(chartHumidityTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartHumidityTimeSeries, 500));
//PEMBUATAN CHART NDVI
function chartNDVITimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!inspectorPanel.style().get('shown')) {
    inspectorPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 1000 ? mapScale * 2 : 1000;
  // Chart NDVI time series for the selected area of interest.
  var chart3 = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: NDVI,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'NDVI1',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    title: 'NDVI',
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDVI'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  inspectorPanel.widgets().set(4, chart3);
}
drawingTools.onDraw(ui.util.debounce(chartNDVITimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNDVITimeSeries, 500));
//PEMBUATAN CHART KELEMBAPAN
function chartKelembapanTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!inspectorPanel.style().get('shown')) {
    inspectorPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Chart NDVI time series for the selected area of interest.
  var chart4 = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: Kelembapan,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'Kelembapan1',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    title: 'Kelembapan Tanah',
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Kelembapan Tanah (%)'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  inspectorPanel.widgets().set(5, chart4);
}
drawingTools.onDraw(ui.util.debounce(chartKelembapanTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartKelembapanTimeSeries, 500));
/*-------------------------------------------------------------------------------------------
Visualisasi untuk Aplikasi Monitoring
---------------------------------------------------------------------------------------------*/
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
mapPanel.centerObject(geometry,5);
//Pembuatan Legenda
var ndviVis = {
  min: -1,
  max: 1,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
var landSurfaceTemperatureVis = {
  min: 28,
  max: 32,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
var presVis = {
  min: 0,
  max: 500,
  palette: ['800000',
  'FFA07A',
'FFF5EE',
'87CEEB',
'4682B4',
  ]
};
var KelembapanVis = {
  min: 0,
  max: 100,
  palette: ['800000',
  'FFA07A',
'FFF5EE',
'87CEEB',
'4682B4',
  ]
};
//Penampiilan Data di Peta
mapPanel.addLayer(NDVI_Vis, ndviVis,"NDVI Rata-rata 2020",false);
mapPanel.addLayer(LST_Vis, landSurfaceTemperatureVis,"LST Rata-rata 2020",false);
mapPanel.addLayer(NDDI_Vis, ndviVis,"NDDI Rata-rata 2020",false);
mapPanel.addLayer(Presipitasi_Vis, presVis,"Jumlah Curah Hujan 2020",false);
mapPanel.addLayer(Kelembapan_Vis, KelembapanVis,"Rata-Rata Kelembapan Tanah 2020",false);
//Penampilan Legenda di App
// Create the color bar for the legend.
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ndviVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(ndviVis.min, {margin: '4px 8px'}),
    ui.Label(
        (ndviVis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(ndviVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Rata-rata NDVI dan NDDI Tahun 2020',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(5, legendPanel);
var colorBar1 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(landSurfaceTemperatureVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels1 = ui.Panel({
  widgets: [
    ui.Label(landSurfaceTemperatureVis.min, {margin: '4px 8px'}),
    ui.Label(
        (landSurfaceTemperatureVis.min+2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(landSurfaceTemperatureVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle1 = ui.Label({
  value: 'Rata-rata Suhu Tahun 2020 (Celcius)',
  style: {fontWeight: 'bold'}
});
var legendPanel1 = ui.Panel([legendTitle1, colorBar1, legendLabels1]);
inspectorPanel.widgets().set(6, legendPanel1);
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(presVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(presVis.min, {margin: '4px 8px'}),
    ui.Label(
        (presVis.max/2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(presVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle2 = ui.Label({
  value: 'Jumlah Curah Hujan Tahun 2020 (mm/tahun)',
  style: {fontWeight: 'bold'}
});
var legendPanel2 = ui.Panel([legendTitle2, colorBar2, legendLabels2]);
inspectorPanel.widgets().set(7, legendPanel2);
var colorBar3 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(KelembapanVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels3 = ui.Panel({
  widgets: [
    ui.Label(KelembapanVis.min, {margin: '4px 8px'}),
    ui.Label(
        (KelembapanVis.max/2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(KelembapanVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle3 = ui.Label({
  value: 'Kelembapan Tanah 2020 (%)',
  style: {fontWeight: 'bold'}
});
var legendPanel3 = ui.Panel([legendTitle3, colorBar3, legendLabels3]);
inspectorPanel.widgets().set(8, legendPanel3);
/*Referensi Script
https://developers.google.com/earth-engine/guides 
*/