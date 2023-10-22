var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var buttonS2 = ui.Button({
  label: 'Sentinel 2',
  onClick: function() {
    require('users/rifkynauvalhsp/pengindraanjauh:IJBExplorer');
  }
});
var buttonS1 = ui.Button({
  label: 'Sentinel 1',
  onClick: function() {
    require('users/rifkynauvalhsp/pengindraanjauh:IJBExplorerS1');
  }
});
var buttonL8 = ui.Button({
  label: 'Landsat 8',
  onClick: function() {
    require('users/rifkynauvalhsp/pengindraanjauh:IJBExplorerL8e');
  }
});
var buttonL5 = ui.Button({
  label: 'Landsat 5',
  onClick: function() {
    require('users/rifkynauvalhsp/pengindraanjauh:IJBExplorerL5');
  }
});
var buttonLand = ui.Button({
  label: 'Landcover',
  onClick: function() {
    require('users/rifkynauvalhsp/pengindraanjauh:IJBlandcover');
  }
});
var buttonAir = ui.Button({
  label: 'Air Quality S5P',
  onClick: function() {
    require('users/rifkynauvalhsp/tematik:IJBairquality');
  }
});
var buttonAni = ui.Button({
  label: 'Timelapse',
  onClick: function() {
    require('users/rifkynauvalhsp/tematik:IJBanimasi');
  }
});
var gambar = ui.Thumbnail({
    image: ee.Image("users/rifkynauvalhsp/IJB4_modified"), 
    params: { min: 0, max: 256},
    style: {width: '270px', height: '240px'}});
var intro = ui.Label({
        value: 'Indraja Buana Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      })
var intro1 = ui.Label('Aplikasi ini memungkinkan anda untuk memfilter citra, memvisualisasikan citra, membuat grafik temporal, dan mengunduh citra')
var data = ui.Label('1) Pilih Data yang ingin ditampilkan ', {fontWeight: 'bold'})
var data1 = ui.Label('2) Klik lokasi penelitian ', {fontWeight: 'bold'})
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '320px',
  position: 'top-right'
});
Map.add(panel);
var button1 = ui.Panel({
    widgets: [buttonS1, buttonS2, buttonAir],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style: {margin:'0 0 8px 15px'}
  })
var button2 = ui.Panel({
    widgets: [buttonL5,buttonL8, buttonLand],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style: {margin:'0 0 8px 15px'}
  })
var button3 = ui.Panel({
    widgets: [buttonAni],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style: {margin:'0 0 8px 15px'}
  })
panel.add(gambar);
panel.add(intro);
panel.add(intro1);
panel.add(data);
panel.add(button1);
panel.add(button2);
panel.add(button3);
panel.add(data1);
  // Chart NDVI time series for the selected area of interest.