var v006 = ui.import && ui.import("v006", "imageCollection", {
      "id": "MODIS/006/MCD12Q1"
    }) || ee.ImageCollection("MODIS/006/MCD12Q1"),
    cgls = ui.import && ui.import("cgls", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V-C3/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"),
    wc = ui.import && ui.import("wc", "imageCollection", {
      "id": "ESA/WorldCover/v100"
    }) || ee.ImageCollection("ESA/WorldCover/v100");
// Where is global agriculture? How well do we know? Here's a comparison of ESA Worldcover and MODIS land cover using Google #EarthEngine. 
cgls = cgls.first().select('discrete_classification').eq(40).rename('cgls-lc100')
v006 = v006.mode().select('LC_Type1')
v006 = v006.eq(12).or(v006.eq(14)).rename('mcd12q1')
wc = wc.first().eq(40).rename('esa_worldcover')
var added = wc.add(cgls.remap([0,1],[0,3])).add(v006.remap([0,1],[0,5]));
var cats = added.remap([0,1,3,4,5,6,8,9],[0,1,2,5,3,6,4,7]).rename('ag_compare');
                                        //0 - none
                                        //1-1 - wc
                                        //3-2 - CGLS-LC100
                                        //4-5 - CGLS-LC100 + wc
                                        //5-3 - v006
                                        //6-6 - v006 + wc
                                        //8-4 - CGLS-LC100 + v006
                                        //9-7 - CGLS-LC100 + v006 + wc
var catsMask = cats.updateMask(cats.neq(0));
var colors = ['01545A','017351','03C383','AAD962','A12A5E','710162','ED0345'];
var categories = ['ESA Worldcover', 'CGLS-LC100', 'MCD12Q1 V006 (mode)', 
                  'CGLS-LC100 & V006',
                  'CGLS-LC100 & ESA Worldcover', 'MCD12Q1 V006 & ESA Worldcover', 
                  'CGLS-LC100 & V006 & ESA Worldcover'];
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: '202020',
    padding: '8px 15px',
    border: '5px solid #333333'
  }
});
var legendTitle = ui.Label({
  value: 'Where is global agriculture?',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '3px 0 -1px 13px',
    backgroundColor: '202020',
    color: 'dbdbdb',
    padding: '0'
  }
});
var line = ui.Label({
  value: '_________________________________________________________',
  style: {
    fontSize: '10px',
    margin: '0 0 10px 1px',
    backgroundColor: '202020',
    color: 'dbdbdb',
    padding: '0'
  }
});
legend.add(legendTitle);
legend.add(line);
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0 0 4px 6px',
      backgroundColor: '202020',
      color: 'dbdbdb',
    }
  });
  return ui.Panel({
    widgets: [colorBox, description],
    style: {
      backgroundColor: '202020'
    },
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < categories.length; i++) {
  legend.add(makeRow(colors[i], categories[i]));
}
var site = ui.Label('cartoscience.com', {fontSize: '12px', color: 'white', stretch: 'horizontal', textAlign: 'center', margin: '0 0 0 0', backgroundColor: '202020'}, 'http://cartoscience.com');
legend.add(site);
Map.add(legend);
Map.setOptions('HYBRID');
Map.setCenter(33.77,-13.96,8);
Map.addLayer(ee.Image(0),{palette:'black', opacity: 0.87}, 'dark basemap');
Map.addLayer(v006.updateMask(v006.eq(1)),{},'MCD12Q1',false);
Map.addLayer(cgls.updateMask(cgls.eq(1)),{},'CGLS-LC100',false);
Map.addLayer(wc.updateMask(wc.eq(1)),{},'ESA Worldcover',false);
Map.addLayer(catsMask, {palette: colors, min: 1, max: 7}, 'agriculture');