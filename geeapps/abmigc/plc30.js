//PLC wetland predictions
Map.setOptions("HYBRID");
var PLC = ee.Image('users/abmigc/PLC30_OS');
var AMWI = ee.Image('users/edelance/AMWI');
var srtm = ee.Image('USGS/SRTMGL1_003');
Map.centerObject(PLC, 6);
Map.setControlVisibility(false, true, false, false, false, false);
var d = Map.drawingTools();
d.setShown(false);
var utils = require('users/gena/packages:utils');
var pal1 = ['#08306b','#fee391', '#addd8e', '#8c510a', '#718f30', '#006d2c', '#F0AA45'];
var pal2 = ['#08306b','#fee391', '#addd8e', '#8c510a', '#718f30', '#006d2c'];
var dem = srtm.select('elevation');
/*
var AMWIvis = AMWI.visualize({
  min: 0,
  max: 5,
  palette: pal2,
});
AMWIvis = utils.hillshadeRGB(AMWIvis, dem, 1, 20, 260, 35, true);
Map.addLayer(AMWIvis, {}, 'AMWI');
*/
var PLCvis = PLC.visualize({
  min: 0,
  max: 6,
  palette: pal1
});
PLCvis = utils.hillshadeRGB(PLCvis, dem, 1, 20, 260, 35, true);
Map.addLayer(PLCvis, {}, 'PLC 3.0');
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Create legend for PLC 2.0
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
var colors = ['#08306b','#fee391', '#addd8e', '#8c510a', '#718f30', '#006d2c', '#F0AA45'];
var names = ['Open water', 'Fen', 'Bog', 'Marsh', 'Swamp', 'Upland', 'Wetland general'];
var legend = ui.Panel({style: {position: 'bottom-left'}});
legend.add(ui.Label({
  value: 'PLC 3.0',
  style: {
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '0 0 4px 0',
    padding: '0px'
  }
}));
var entry;
for (var x = 0; x<7; x++){
  entry = [
    ui.Label({style:{color:colors[x],margin: '0 0 8px 0'}, value: '██'}),
    ui.Label({
      value: names[x],
      style: {
        margin: '0 0 8px 8px',
        fontSize: '16px',
      }
    })
  ];
  legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
}
Map.add(legend);
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// END
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/*
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Create legend for AMWI
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
var colors = ['#08306b','#fee391', '#addd8e', '#8c510a', '#718f30', '#006d2c'];
var names = ['Open water', 'Fen', 'Bog', 'Marsh', 'Swamp', 'Upland'];
var legend2 = ui.Panel({style: {position: 'bottom-right'}});
legend2.add(ui.Label({
  value: 'Alberta Merged',
  style: {
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '0 0 4px 0',
    padding: '0px'
  }
}));
var entry;
for (var x = 0; x<6; x++){
  entry = [
    ui.Label({style:{color:colors[x],margin: '0 0 8px 0'}, value: '██'}),
    ui.Label({
      value: names[x],
      style: {
        margin: '0 0 8px 8px',
        fontSize: '16px',
      }
    })
  ];
  legend2.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
}
Map.add(legend2);
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// END
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
*/
var logo = ui.Panel({
  widgets: [ui.Label('ABMI',{
    fontSize: '28px',
    backgroundColor: '#00000000',
    color: '#41ab5d',
    fontWeight: 'bold',
    padding: '0px'
  }),
  ui.Label('Its Our Nature to Know',{
    fontSize: '16px',
    backgroundColor: '#00000000',
    color: '#41ab5d',
    fontWeight: 'bold',
    padding: '0px'
    })],
    layout: ui.Panel.Layout.Flow('vertical'),
    style: {
    stretch: 'horizontal',
    position: 'bottom-right',
    backgroundColor: '#00000000',
    margin: '0px'
  }
});
Map.add(logo);