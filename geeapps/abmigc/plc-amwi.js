//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Load in PLC and AMWI data
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
var PLC = ee.Image('users/abmigc/PLC30_OS');
var AMWI = ee.Image('users/edelance/AMWI');
var utils = require('users/gena/packages:utils');
var pal1 = ['#08306b','#fee391', '#addd8e', '#8c510a', '#718f30', '#006d2c', '#F0AA45'];
var pal2 = ['#08306b','#fee391', '#addd8e', '#8c510a', '#718f30', '#006d2c'];
var AMWIvis = AMWI.visualize({
  min: 0,
  max: 5,
  palette: pal2,
});
var PLCvis = PLC.visualize({
  min: 0,
  max: 6,
  palette: pal1
});
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
// 
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
// Create legend for PLC 2.0
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
var colors = ['#08306b','#fee391', '#addd8e', '#8c510a', '#718f30', '#006d2c', '#F0AA45'];
var names = ['Open water', 'Fen', 'Bog', 'Marsh', 'Swamp', 'Upland', 'Wetland general'];
var legend = ui.Panel({style: {position: 'bottom-right'}});
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
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
// Create legend for AMWI
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
var colors = ['#08306b','#fee391', '#addd8e', '#8c510a', '#718f30', '#006d2c'];
var names = ['Open water', 'Fen', 'Bog', 'Marsh', 'Swamp', 'Upland'];
var legend2 = ui.Panel({style: {position: 'bottom-right'}});
legend2.add(ui.Label({
  value: 'Alberta Merged',
  style: {
    fontWeight: 'bold',
    fontSize: '20px',
    fontFamily: 'Roboto',
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
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Create split panel maps
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
var center = {lon: -114.2842100, lat: 57.0285670, zoom: 6};
var leftMap = ui.Map(center);
leftMap.setOptions("HYBRID");
leftMap.setControlVisibility(true, true, true, false, false, false);
var rightMap = ui.Map(center);
rightMap.setOptions("HYBRID");
rightMap.setControlVisibility(true, true, true, false, false, false);
var linker = new ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: false
});
ui.root.clear();
ui.root.add(splitPanel);
leftMap.addLayer(PLCvis, {}, 'PLC 3.0');
rightMap.addLayer(AMWIvis, {}, 'AMWI');
leftMap.add(legend);
rightMap.add(legend2);
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------