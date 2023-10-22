// Creating the Graphical User Interface
// Set Style-------------------------------------------------------------
// Fonts & Colors //
// (pulled from Scripts/User Interface/Mosaic Editor) //
var colors = {'transparent': '#11ffee00', 'gray': '#F8F9FA', 'gray1':'#707080', 'dark': '#080c16'};
var TITLE_STYLE = {
  fontWeight: 'bold',
  fontSize: '32px',
  padding: '8px',
  color: '#cc0000',
  //textAlign: 'center',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '8px',
  color: colors.gray1,
  textAlign: 'center',
  //maxWidth: '450px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: colors.gray1,
  textAlign: 'justify',
  padding: '8px',
  maxWidth: '500px',
  backgroundColor: colors.transparent,
};
var BUTTON_STYLE = {
  fontSize: '14px',
  fontWeight: '100',
  color: colors.gray1,
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SELECT_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: colors.gray1,
  padding: '2px',
  backgroundColor: colors.transparent,
  width: '115px'
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '14px',
  color: colors.gray1,
  padding: '2px',
  backgroundColor: colors.transparent,
};
// Create root panel, i.e., side panel and map panel for hold the other widgets
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(),
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '450px',
      backgroundColor: colors.gray
    }
});
// Adding new root widget and clear original widget
var mappingPanel = ui.root.widgets().get(0);
ui.root.clear();
// Split the new panel
ui.root.add(ui.SplitPanel(mappingPanel, infoPanel));
Map.setCenter(112.37066368628028,-7.8582794741693895, 14);
// Create date panel, visualization panel, and graph panel for side panel---------------------------------
var datePanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}});
var visPanel = ui.Panel({style: {backgroundColor: colors.transparent}}); 
var graphPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
// Settings for side panel info--------------------------------------------------------------
// Adding the text for title and sub-title using "ui.label" function
infoPanel.add(ui.Label('Spectral Signature (Implementasi)', TITLE_STYLE));
var app_description = 'Nilai spektral pada setiap objek adalah berbeda. ' + 
'Objek yang diobservasi ialah objek air, vegetasi, tanah, lahan terbangun. '+
'Citra Sentinel-2 digunakan untuk mengekstrak nilai spektral pada setiap objek, ' +
'yang disajikan melalui grafik dalam setiap band/saluran.';
infoPanel.add(ui.Label(app_description, PARAGRAPH_STYLE));
// Add temporal settings--------------------------------------------------------------------
infoPanel.add(datePanel);
infoPanel.insert(2, ui.Label('PENGATURAN TEMPORAL', SUBTITLE_STYLE));
// Add start date
var sDate = ui.Textbox({
  value: '2019-01-01',
  style: {stretch:'horizontal', textAlign: 'center', maxWidth: '200px'}
});
var sDateLabel = ui.Label({
  value: 'Mulai Tanggal: (YYYY-MM-DD)',
  style: LABEL_STYLE
});
// Add end date
var eDate = ui.Textbox({
  value: '2019-12-31',
  style: {stretch:'horizontal', textAlign:'center', maxWidth: '200px'}
});
var eDateLabel = ui.Label({
  value: 'Hingga Tanggal: (YYYY-MM-DD)',
  style: LABEL_STYLE
});
infoPanel.add(sDateLabel).add(sDate);
infoPanel.add(eDateLabel).add(eDate);
// Settings for visualization panel----------------------------------------------------------
infoPanel.add(visPanel);
var visTitle = ui.Label('VISUALISASI CITRA', SUBTITLE_STYLE);
var visText = ui.Label('Menampilkan Komposit citra atau Grayscale (hanya satu band):', LABEL_STYLE);
// Create list of bands for widgets pull from
var band_list = [
    {label: 'B1/Aerosol',     value: 'B1'},
    {label: 'B2/Blue',        value: 'B2'},
    {label: 'B3/Green',       value: 'B3'},
    {label: 'B4/Red',         value: 'B4'},
    {label: 'B5/NIR',         value: 'B5'},
    {label: 'B6/SWIR1',       value: 'B6'},
    {label: 'B7/SWIR2',       value: 'B7'}
  ];
//Each Color's Panel
var redPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var red_band_label = ui.Label('Red:', LABEL_STYLE);
var U_red_band = ui.Select({items: band_list, style: SELECT_STYLE, placeholder: 'B4/Red', value: 'B4'});
redPanel.add(red_band_label).add(U_red_band);
var greenPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var green_band_label = ui.Label('Green:', LABEL_STYLE);
var U_green_band = ui.Select({items: band_list, style: SELECT_STYLE, placeholder: 'B3/Green', value: 'B3'});
greenPanel.add(green_band_label).add(U_green_band);
var bluePanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var blue_band_label = ui.Label('Blue:', LABEL_STYLE);
var U_blue_band = ui.Select({items: band_list, style: SELECT_STYLE, placeholder: 'B2/Blue', value: 'B2'});
bluePanel.add(blue_band_label).add(U_blue_band);
var grayPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var gray_band_label = ui.Label('Grayscale - (satu band)', LABEL_STYLE);
var U_gray_band = ui.Select({items: band_list, style: SELECT_STYLE, placeholder: 'B2/Blue', value: 'B2'});
grayPanel.add(gray_band_label).add(U_gray_band);
// Each Composite Type's Panel
var RGBPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent}});
var GrayPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent}});
RGBPanel.add(redPanel).add(greenPanel).add(bluePanel);
GrayPanel.add(grayPanel);
//  Description of some composite bands
var comp_desc1 = ui.Label({
  value: 'Beberapa contoh komposit citra yang dapat ditampilkan:', 
  style: {
    fontWeight: '50',
    fontSize  : '14px',
    color     : colors.gray1,
    padding   : '4px',
    backgroundColor: colors.transparent,
    stretch   : 'horizontal'
  }
});
var comp_desc2 = ui.Label({
  value: 'Natural Color: B4/B3/B2, '+'Infrared Color: B5/B4/B3, '+'Agriculture: B6/B5/B2', 
  style: {
    fontWeight: '50',
    fontSize  : '14px',
    color     : colors.gray1,
    padding   : '4px',
    backgroundColor: colors.transparent,
    stretch   : 'vertical'
  }
});
var comp_Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style : {
    backgroundColor: colors.transparent,
    maxWidth: '200px',
    padding : '1px'
  }
});
// Panel to host the color options
var visColors = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent, padding: '4px'}});
// This sets it up for a default RGB panel
visColors.add(RGBPanel);
// Give the user the option to choose RGB or Grayscale
var U_Vis_Selector = ui.Select({
  items: [
    {label: 'RGB', value: 1},
    {label: 'Grayscale', value: 2},
  ],
  placeholder: 'RGB',
  value: 1, 
  style: SELECT_STYLE
});
U_Vis_Selector.onChange(function(x) {
  if (x == 1) {
    visColors.clear();
    visColors.add(RGBPanel);
  }
  else {
    visColors.clear();
    visColors.add(GrayPanel);
  }
});
// Populate our vis panel!
visPanel.add(visTitle).add(visText).add(U_Vis_Selector).add(comp_desc1).add(comp_Panel.add(comp_desc2)).add(visColors);
// Build composite panel from visualization script--------------------------------------------------------------------------------------------
// Make a panel to host the buttons (for layout purposes)
var buttonDesc1 = ui.Label('Tekan tombol bawah ini untuk menampilkan dan menghapus peta:', LABEL_STYLE);
/*var buttonDesc2 = ui.Label({value: 'Catatan: untuk mengatur kontras dan kecerahan citra ' + 
'dapat dilakukan melalui widget Layers > klik ikon ⚙️ > ubah Stretch menjadi 100%', style:{
  fontSize: '12px', fontWeight: '30', textAlign: 'left', color: '#E7615D', backgroundColor: colors.transparent
  }
});*/
var buttonHold = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent, 
                            textAlign: 'center', stretch: 'both', padding: '4px'}});
infoPanel.add(buttonDesc1).add(buttonHold);
// Add the run & clear buttons
var runButton = ui.Button({label: 'Tampilkan Komposit Citra', style: {width: '150px', maxWidth: '250px', color: '#5b5b5b'}});
var clearButton = ui.Button({label: 'Bersihkan Peta', style: {width: '150px', maxWidth: '250px', color: '#5b5b5b'}});
buttonHold.add(runButton).add(clearButton);
// Add the clear map onClick button
var clearMap = clearButton.onClick(function() {
  var layers = mappingPanel.layers();
  layers.forEach(function(x) {
    mappingPanel.remove(x) ;
  });
});
// Add the input data----------------------------------------------------------------------------------
// Function for Cloud Masking
function fmask(img) {
  var cloudShadowBitMask = 1 << 4;
  var cloudsBitMask = 1 << 3;
  var qa = img.select('QA_PIXEL');
  var ra = img.select('QA_RADSAT').eq(0);
  var mask = qa.bitwiseAnd(cloudShadowBitMask)
                 .eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return img.updateMask(mask)
          .updateMask(ra)
          .toFloat();
}
// Memanggil data citra Landsat-8
var bandsIn = ee.List(['B1','B2','B3','B4','B5','B6','B7']);
var wavelengths =[443,483,560,660,865,1650,2220];
var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA');
// Add the run button onClick function for displaying composite image
var buildComposite = runButton.onClick(function() {
  var start = sDate.getValue();
  var end = eDate.getValue();
  //var year = U_year_selector.getValue();  
  var red_band = U_red_band.getValue();
  var green_band = U_green_band.getValue();
  var blue_band = U_blue_band.getValue();
  var gray_band = U_gray_band.getValue();
  var vis_value = U_Vis_Selector.getValue();
  var L8 = dataset.filterDate(start, end);
  var L8_cloud = L8.filter(ee.Filter.lt('CLOUD_COVER',50));
  var L8_proc = L8_cloud.map(fmask).select(bandsIn).median();
  //var L8_startEnd = L8_proc.filter(ee.Filter.calendarRange(start, end, 'month')).median();
  var composite = ee.Image.cat([L8_proc]);
  // Calculate the stretch value for visualization based on percentile
  var lower_percentile = ee.Number(100).subtract(98).divide(2);
  var upper_percentile = ee.Number(100).subtract(lower_percentile);
  var geom =ee.Geometry.Polygon(
        [[[112.0201853768524, -7.491546564202538],
          [112.0201853768524, -8.147314369371534],
          [112.77000227138365, -8.147314369371534],
          [112.77000227138365, -7.491546564202538]]], null, false);
  var min = composite.reduceRegion({
    reducer: ee.Reducer.percentile([lower_percentile]),
    geometry: geom,
    scale: 30,
    maxPixels: 1e9
  });
  var max = composite.reduceRegion({
    reducer: ee.Reducer.percentile([upper_percentile]),
    geometry: geom,
    scale: 30,
    maxPixels: 1e9
  });
  // cast to numbers
  var maxRed = max.get(red_band).getInfo();
  var minRed = min.get(red_band).getInfo();
  var maxGreen = max.get(green_band).getInfo();
  var minGreen = min.get(green_band).getInfo();
  var maxBlue = max.get(blue_band).getInfo();
  var minBlue = min.get(blue_band).getInfo();
  var maxGray = max.get(gray_band).getInfo();
  var minGray = min.get(gray_band).getInfo();
  if (vis_value == 1) {
    var comp = ui.Map.Layer(composite, {min   : [minRed, minGreen, minBlue], 
                                        max   : [maxRed ,maxGreen ,maxBlue], 
                                        bands : [red_band, green_band, blue_band]}, 'Komposit RGB');
    mappingPanel.add(comp);
  }
  else {
    var comp1 = ui.Map.Layer(composite, {min: minGray, max: maxGray, bands: gray_band}, 'Gray band');
    mappingPanel.add(comp1);
  }
});
// Spectral signature theory description----------------------------------------------------------------------------
var spectralTitle = ui.Label('TEORI UMUM SPECTRAL SIGNATURE', SUBTITLE_STYLE);
var spectral_description = 'Objek air cenderung memantulkan saluran biru dan hijau; namun, ' +
'menyerap seluruh radiasi di luar spektrum tampak (near-infrared dan shortwave infrared). ' +
'Objek Vegetasi memantulkan saluran hijau daripada biru dan merah sehingga nampak hijau ' + 
'di mata manusia, sebaliknya sangat kuat memantulkan near-infrared. Objek tanah, memantulkan  ' +
'saluran oranye dan merah sehingga nampak warna cokelat. Selain itu, objek tanah lebih cerah daripada vegetasi. ' +
'Lihat gambar teori spectral signature di bawah ini:';
var spectral_label = ui.Label(spectral_description, PARAGRAPH_STYLE);
// Adding spectral signature graph, theory
var spectral_png = ee.Image('users/purwantofis/spectral').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 17,
    max: 255
    });
var spectral_desc = 'Sumber dari: Alan H. Strahler (2013).';
var spectral_png_Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true), 
  style: {maxWidth: '450px', padding: '8px', backgroundColor: colors.transparent}
  });
var spectral_thumb = ui.Thumbnail({image  : spectral_png, 
                              params : {
                                dimensions: '1057x646',
                                format    : 'png'
                              },
                              style  : {
                                width: '400px', 
                                padding: '2px', 
                                backgroundColor: colors.transparent
                              }
                     });
var spectral_png_label = ui.Label({value: spectral_desc, 
                           style: {
                             fontSize  : '14px',
                             fontWeight: '50',
                             color     : '#00A4FF',
                             padding   : '1px',
                             backgroundColor: colors.transparent,
                             stretch: 'horizontal'
                           }
});
infoPanel.add(spectralTitle).add(spectral_label).add(spectral_png_Panel.add(spectral_thumb).add(spectral_png_label));
// Defining empty array
var Class_list = [];
var class_selected = '';
var vectors = ee.FeatureCollection([]);
infoPanel.add(ui.Label());
Map.drawingTools().layers().reset();
Map.drawingTools().setShown(true);
// Defining class widgets
var runGraph = ui.Button({label: 'Menampilkan Grafik', onClick: function(){
                            var class_points = ee.FeatureCollection([]);
                            for (var i=0; i < Map.drawingTools().layers().length(); i++) {
                                var layer =  Map.drawingTools().layers().get(i).getEeObject(); 
                                layer = ee.Feature(layer).set('Class',i);
                                var feature = ee.FeatureCollection(layer);
                                class_points = class_points.merge(feature);
        }                   var bandPoints = class_points;
                          chartOnly.clear();
                          // Mendefinisikan pengaturan visualisasi grafik.
                          var options = {
                            title: 'Karakteristik Pantulan Spektral Objek ', // Judul grafik
                            hAxis: {title: 'Panjang Gelombang (nm)'}, // Penamaan pada sumbu x
                            vAxis: {title: 'Nilai Pantulan Spektral'}, // Penamaan pada sumbu y
                            curveType: 'function',
                            lineWidth: 2.5,
                            //pointSize: 4,
                          // Mendefinisikan warna garis dalam grafik setiap objek
                          series: {
                            0: {color: '00b8dc'}, // untuk objek air
                            1: {color: '1fd825'}, // untuk objek vegetasi
                            2: {color: '7e8d90'}, // untuk objek tanah
                            3: {color: 'ffd00b'}, // untuk objek lahan terbangun
    }
};
                          // Add dataset
                          var start = sDate.getValue();
                          var end = eDate.getValue();
                          //var year = U_year_selector.getValue();
                          var L8 = dataset.filterDate(start, end);
                          var L8_cloud = L8.filter(ee.Filter.lt('CLOUD_COVER',50));
                          var L8_proc = L8_cloud.map(fmask).select(bandsIn).median();
                          //var L8_startEnd = L8_proc.filter(ee.Filter.calendarRange(start, end, 'month')).median();
                          // Create the chart and set options.
                          var spectraChart = ui.Chart.image.regions(
                            L8_proc, bandPoints, ee.Reducer.mean(), 30, 'Class', wavelengths)
                            .setChartType('LineChart')
                            .setSeriesNames(['Air','Vegetasi','Tanah','Lahan Terbangun'])
                            .setOptions(options);
                            chartOnly.add(spectraChart);
                          infoPanel.add(graphPanel).add(graphTitle).add(chartOnly);
        }
    }
);
infoPanel.add(ui.Label());
// Defining class
var addClass = ui.Button({label:'Tambahkan Kelas', onClick: function(){
                             Class_list.push(txb_Class.getValue());
                             txb_Class.setValue("");
                             Map.drawingTools().setDrawModes(['point']);
                             Map.drawingTools().addLayer([]);
                             Map.drawingTools().setShape('point');
                             Map.drawingTools().setShown(true);
                             Map.drawingTools().stop(); 
                            },style: {padding:'0px 5px'}
});
var resetClass = ui.Button({label:'Hapus Seluruh Sampel', onClick: function(){
                          var lay_len = Map.drawingTools().layers().length();
                          for (var i=0; i < lay_len; i++) {
                            var geom_len = Map.drawingTools().layers().get(i).geometries().length();
                            for (var j=0; j < geom_len; j++) {
                              Map.drawingTools().layers().get(i).geometries().remove(Map.drawingTools().layers().get(i).geometries().get(0));
                            }
                          }
                             },style: {padding:'0px 5px'}
});
var Finalize = ui.Button({label:'Finalisasi', onClick: function(){
                            var slt_Class = ui.Select({items: Class_list, value: Class_list[0], style:{padding: '0px 0px 0px 10px', 
                              stretch: 'horizontal'},
                            onChange: function(){
                              Map.drawingTools().draw();
                              class_selected = slt_Class.getValue();
                              Map.drawingTools().setSelected(Map.drawingTools().layers().get(Class_list.indexOf(class_selected)));
                            }  
                            });
                            class_selected = slt_Class.getValue();
                            Map.drawingTools().draw();
                            infoPanel.add(lbl_desc4);
                            infoPanel.add(stepDesc);
                            infoPanel.add(slt_Class);
                            infoPanel.add(resetClass);
                            infoPanel.add(lbl_desc5);
                            infoPanel.add(runGraph);
                           },style: {padding:'0px 5px'}
});
var classDesc1 = ui.Label({
  value: 'Urutan penambahan kelas (WAJIB): ',
  style: {
    fontWeight: '50',
    fontSize  : '14px',
    color     : colors.gray1,
    padding   : '4px',
    backgroundColor: colors.transparent,
    stretch   : 'horizontal'
  }
});
var classDesc2 = ui.Label({
  value: '0: Air, ' +
  '1: Vegetasi, ' + 
  '2: Tanah, ' + 
  '3: Lahan Terbangun', 
  style: {
    fontWeight: '50',
    fontSize  : '14px',
    color     : colors.gray1,
    padding   : '4px',
    backgroundColor: colors.transparent,
    stretch   : 'vertical'
  }
});
var classPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style : {
    backgroundColor: colors.transparent,
    maxWidth: '400px',
    padding : '1px'
  }
});
var stepDesc = ui.Label({
  value: 'Catatan: Panel di bawah dapat diganti sesuai objek yang untuk diambil titik sampelnya ',
  style: {
    fontWeight: '50',
    fontSize  : '14px',
    color     : '#E7615D',
    padding   : '4px',
    backgroundColor: colors.transparent,
    stretch   : 'horizontal'
  }
});
var txb_Class = ui.Textbox({placeholder: 'Contoh: Air'});
txb_Class.style().set({padding:'5px 5px',stretch: 'both', backgroundColor: colors.transparent});
var lbl_desc4 = ui.Label('Langkah 1: Mengumpulkan titik sampel objek');
lbl_desc4.style().set({fontSize: '16px',padding: '0px 10px', color: colors.gray1, backgroundColor: colors.transparent});
var lbl_desc5 = ui.Label('Langkah 2: Menampilkan grafik spektral');	
lbl_desc5.style().set({fontSize: '16px',padding: '0px 10px', color: colors.gray1, backgroundColor: colors.transparent});
var wrap = {padding: '8px',backgroundColor: colors.transparent};
var chartOnly = ui.Panel();
var graphTitle = ui.Label('POLA GRAFIK SPEKTRAL OBJEK', SUBTITLE_STYLE);
infoPanel.add(classDesc1).add(classPanel.add(classDesc2)).add(txb_Class);
infoPanel.add(ui.Panel([addClass, Finalize], ui.Panel.Layout.flow('horizontal'), wrap));