var NO2 = ee.Image("users/rajbhagatt/NO2MeanIndia");
Map.setOptions('hybrid');
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0',position:'bottom-right'}
});
Map.add(legendPanel);
var legendTitle = ui.Label('Legend - Tropospheric NO2 Column Density',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
var legendlist=[{'0 mol/m2': 'green'}, {'0.00005 mol/m2': 'yellow'}, {'>0.0001 mol/m2': 'red'}];
function setLegend(legend) {
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      padding: '8px',
      margin: '0'
    });
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    legendPanel.add(ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
setLegend(legendlist);
var Source = ui.Label('Contains modified Copernicus Sentinel data [2018]',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(Source);
var Credit = ui.Label('Processed by Raj Bhagat Palanichamy',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(Credit);
Map.setCenter(78,23,5);
Map.addLayer(NO2,{opacity:0.6,min:0,max:0.0001,palette:['green','yellow','red']},"NO2");