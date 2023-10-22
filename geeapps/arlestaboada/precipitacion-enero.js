var recorte = ee.FeatureCollection('users/arlestaboada/Peru').geometry();
  var palette =[ 'b2ffff','ffff00','808000','00FF00', '0047e6','e60094','e62c00'];
  var precipCollection = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
  .filterDate('2018-01-01', '2018-01-30');
  var TotalPrecip = precipCollection.reduce(ee.Reducer.sum());
  var TotalPrecip_Recorte = precipCollection.reduce(ee.Reducer.sum()).clip(recorte);
  var max=700;
  var colorizedVis = {
  min: 0.0,
  max: max,
  //celeste
  palette: palette,
};
Map.addLayer(TotalPrecip_Recorte, colorizedVis, 'TotalPrecip');
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Leyenda de precipitacion Enero 2019',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
 //  Palette with the colors
// name of the legend
var names = [];
var valor_calculado=max/palette.length;
for(var k=0;k<palette.length;k++)
{
  var anterior=Math.round(valor_calculado*(k));
  var actual=Math.round(valor_calculado*(k+1));
  var elemento=anterior+"-"+ actual+" mm";
   names.push(elemento);
}
// Add color and and names
for (var i = 0; i <palette.length; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
 Map.add(legend);
 Map.centerObject(recorte)