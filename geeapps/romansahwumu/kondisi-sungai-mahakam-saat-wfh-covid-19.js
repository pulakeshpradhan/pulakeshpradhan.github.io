/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var SMD = ee.FeatureCollection("users/romansahwumu/Admin_Samarinda");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var S2 = ee.ImageCollection("COPERNICUS/S2_SR");
// Defenisikan waktu Awal
var start_1 = ee.Date('2019-12-01');
var start_2 = ee.Date('2020-04-01');
// Definisikan rentan pengambilan data
var dateRange_1 = ee.DateRange(start_1, start_1.advance(1, 'month'));
var dateRange_2 = ee.DateRange(start_2, start_2.advance(1, 'month'));
// Penerapan rentan waktu untuk data modis
var S2_1 = S2.filterDate(dateRange_1);
var S2_2 = S2.filterDate(dateRange_2);
var sS2_1 = S2_1.select('B4','B3','B2');
var vis_S2 = {min:0, max:3000};
Map.addLayer(sS2_1, vis_S2, 'Composite_Band_1');
// Link
var sS2_2 = S2_2.select('B4','B3','B2');
var vis_S2 = {min:0, max:3000};
var linkedMap = ui.Map();
linkedMap.addLayer(sS2_2, vis_S2, "Composite Band_2");
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap.setCenter(117.126006, -0.505853, 14);
Map.setCenter(117.126006, -0.505853, 14);
// Create a panel to hold our Tiltle Legend.
var panel = ui.Panel({
  style: {
    position: 'top-left',
  }
});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Kondisi Sungai Mahakam Saat WFH-Covid-19',
    style: {fontSize: '12px', fontWeight: 'bold'}
  }),
    ui.Label({
    value: 'Lab Indraja & SIG',
    style: {fontSize: '10px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Politeknik Pertanian Negeri Samarinda',
    style: {fontSize: '10px', fontWeight: 'bold'}
  }),
]);
 // Add the title to the panel
panel.add(intro);
Map.add(panel);
// Panel Sebelum Covid
var p_note_1 = ui.Panel({
  style: {
    position: 'bottom-left',
  }
});
// Create an intro panel with labels.
var note_1 = ui.Panel([
  ui.Label({
    value: 'Sebelum WFH | Desember 2019',
    style: {fontSize: '10px'}
  }),
]);
p_note_1.add(note_1);
Map.add(p_note_1);
// Panel Saat Covid
var p_note_2 = ui.Panel({
  style: {
    position: 'bottom-right',
  }
});
// Create an intro panel with labels.
var note_2 = ui.Panel([
  ui.Label({
    value: 'WFH | April 2020',
    style: {fontSize: '10px'}
  }),
]);
p_note_2.add(note_2);
linkedMap.add(p_note_2);