var table = ui.import && ui.import("table", "table", {
      "id": "users/martantiii18/IndonesiaKabKota"
    }) || ee.FeatureCollection("users/martantiii18/IndonesiaKabKota");
//---------------------------------------------------------//
//---------------------------Data All----------------------//
//---------------------------------------------------------//
var area = ee.FeatureCollection(table)
var kosong = area.filter(ee.Filter.eq('GTAll', 0));
var rendah = area.filter(ee.Filter.gt('GTAll', 0)).filter(ee.Filter.lt('GTAll', 6));
var sedang = area.filter(ee.Filter.gt('GTAll', 6)).filter(ee.Filter.lt('GTAll', 15));
var tinggi = area.filter(ee.Filter.gt('GTAll', 15))
Map.addLayer(area,{color:'grey'},'Batas Administrasi Indonesia');
Map.addLayer(kosong,{},'Belum Ada KKN (0 Kasus)');
Map.addLayer(rendah,{color:'red'},'Jumlah KKN Rendah (<6)');
Map.addLayer(sedang,{color:'yellow'},'Jumlah KKN Sedang (6-15)');
Map.addLayer(tinggi,{color:'green'},'Jumlah KKN TInggi (>15)');
Map.setCenter(120,0.5,5);
var panel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '5px;'
  }
})
var title = ui.Label({
  value: 'Legenda',
  style: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0px;'
  }
})
panel.add(title)
var color = ['808080','ff0000','ffff00','006400']
var lc_class = ['Belum Ada KKN (0 Kasus)', 'Jumlah KKN Rendah (<6)', 'Jumlah KKN Sedang (6-15)', 'Jumlah KKN TInggi (>15)']
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      padding: '10px',
      margin: '4px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px'
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for(var a = 0; a < 4; a++){
  panel.add(list_legend(color[a], lc_class[a]))
}
Map.add(panel)