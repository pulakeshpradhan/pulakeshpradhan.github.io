var table = ui.import && ui.import("table", "table", {
      "id": "users/martantiii18/IndonesiaKabKota"
    }) || ee.FeatureCollection("users/martantiii18/IndonesiaKabKota");
//---------------------------------------------------------//
//---------------------------Data All----------------------//
//---------------------------------------------------------//
var area = ee.FeatureCollection(table)
var kosong = area.filter(ee.Filter.eq('GTAll', 0));
var rendah = area.filter(ee.Filter.gt('GTAll', 0)).filter(ee.Filter.lt('GTAll', 7));
var sedang = area.filter(ee.Filter.gt('GTAll', 6)).filter(ee.Filter.lt('GTAll', 16));
var tinggi = area.filter(ee.Filter.gt('GTAll', 15))
// var shown = false; // true or false, 1 or 0 
var opacity = 0.7; // number [0-1]
Map.addLayer(area,{},'Batas Administrasi Indonesia',false,opacity);
Map.addLayer(kosong,{color:'white', width: 1},'Belum Ada KKN (0 Kasus)',true,opacity);
Map.addLayer(rendah,{color:'ff0000', width: 1},'Jumlah KKN Rendah (<6)',true,opacity);
Map.addLayer(sedang,{color:'yellow',width: 1},'Jumlah KKN Sedang (6-15)',true,opacity);
Map.addLayer(tinggi,{color:'blue', width: 1},'Jumlah KKN TInggi (>15)',true,opacity);
Map.setCenter(120,0.5,5);
//---------------------------------------------------------//
//------------------------LEGENDA--------------------------//
//---------------------------------------------------------//
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
var color = ['ffffff','ff0000','ffff00','0000ff']
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