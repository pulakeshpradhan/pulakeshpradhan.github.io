var image = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UI_inorm"),
    image2 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UI_ibase"),
    image3 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UI"),
    image4 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UI1011"),
    image5 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UIlate_new"),
    PRboundary = ee.FeatureCollection("users/ylfeng/HurricaneMaria/PR_boudary"),
    hansen = ee.Image("UMD/hansen/global_forest_change_2016_v1_4"),
    geometry = /* color: #d63000 */ee.Geometry.MultiPoint(),
    rectangle = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-67.32147216796875, 17.918636080522123],
          [-65.59112548828125, 17.921249418623304],
          [-65.5828857421875, 18.53951262721411],
          [-67.32421875, 18.542116654448996]]]);
var DNPVIntensity_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap  type="intervals" extended="false" >' +
      '<ColorMapEntry color="#442288" quantity="-10.0" label="-0.4000--2.0000" />' + //Spanish Violet
      '<ColorMapEntry color="#6CA2EA" quantity="-0.2" label="-0.2000--0.4000" />' + //Little boy blue
      '<ColorMapEntry color="#B5D33D" quantity="0.0" label="-0.200-0.0000" />' +   //Android Green
      '<ColorMapEntry color="#FFFFE0" quantity="0.2" label="0.0001-0.2000" />' +   //lightyellow
      '<ColorMapEntry color="#FFBB4E" quantity="0.4" label="0.2001-0.4000" />' +   //Pastel Orange
      '<ColorMapEntry color="#FF0000" quantity="0.6" label="0.4001-0.6000" />' +   //Red
      '<ColorMapEntry color="#794B26" quantity="0.8" label="0.6001-0.8000" />' +   //Russet
      '<ColorMapEntry color="#000000" quantity="1.0" label="0.8001-1.0000" />' +   //Black
    '</ColorMap>' +
  '</RasterSymbolizer>';   
// var legend = ui.Panel({
//   style: {
//     position: 'bottom-left',
//     padding: '8px 15px'
//   }
// });
// // Create and add the legend title.
// var legendTitle1 = ui.Label({
//   value: 'Disturbance Intensity',
//   style: {
//     fontWeight: 'bold',
//     fontSize: '15px',
//     margin: '0 0 4px 0',
//     padding: '0'
//   }
// });
// var legendTitle2 = ui.Label({
//   value: '(ΔNPV)',
//   style: {
//     fontWeight: 'bold',
//     fontSize: '15px',
//     margin: '0 0 4px 0',
//     padding: '0',
//   }
// });
// legend.add(legendTitle1)
// legend.add(legendTitle2);
// var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
// legend.add(loading);
// // Creates and styles 1 row of the legend.
// var makeRow = function(color, name) {
//   // Create the label that is actually the colored box.
//   var colorBox = ui.Label({
//     style: {
//       backgroundColor: '#' + color,
//       // Use padding to give the box height and width.
//       padding: '8px',
//       margin: '0 0 4px 0'
//     }
//   });
//   // Create the label filled with the description text.
//   var description = ui.Label({
//     value: name,
//     style: {margin: '0 0 4px 6px'}
//   });
//   return ui.Panel({
//     widgets: [colorBox, description],
//     layout: ui.Panel.Layout.Flow('horizontal')
//   });
// };
// // Get the list of palette colors and class names from the image.
//   var palette = ['000000','4B0082', '4169E1', '32CD32', 'FFFF00', 'FFA500', 'FF0000'];
//   var names = ['< -1','-1.0 - 0.0','0.0 - 0.2', '0.2 - 0.4', '0.4 - 0.6', '0.6 - 0.8', '0.8 - 1.0'];
//   loading.style().set('shown', false);
//   for (var i = 0; i < names.length; i++) {
//     legend.add(makeRow(palette[i], names[i]));
//   }
/////////////////////////////////////////////////////////////////  
/////////////////////////////////////////////////////////////////
// Create the panel for the legend items.
var legend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle1 = ui.Label({
  value: 'Disturbance Intensity',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
var legendTitle2 = ui.Label({
  value: '(ΔNPV)',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0',
  }
});
legend2.add(legendTitle1)
legend2.add(legendTitle2);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend2.add(loading);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout:  ui.Panel.Layout.Flow('horizontal')
  });
};
// Get the list of palette colors and class names from the image.
  // var palette = ['FFFACD','F0E68C','FFA500','FF0000','A52A2A','800080'];
  // var names = ['< 0','0.0 - 0.2','0.2 - 0.4','0.4 - 0.6','0.6 - 0.8','0.8 - 1.0'];
  var palette = ['442288','6CA2EA', 'B5D33D', 'FFFFE0', 'FFBB4E', 'FF0000', '794B26','000000'];
  var names = ['< -0.4','-0.4 - -0.2','-0.2 - 0.0', '0.0 - 0.2', '0.2 - 0.4', '0.4 - 0.6', '0.6 - 0.8','0.8 - 1.0'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    legend2.add(makeRow(palette[i], names[i]));
  }
var Prelegend1 = ui.Label({value: 'Pre-hurricane Satellite Image (R: SWIR, G: NIR, B: Red)', style:{position:'top-center'}});
var Prelegend2 = ui.Label({value:'Image Composites: 06/01/2016 - 09/30/2016', style:{position:'top-center'}})
var Prelegend =  ui.Panel({
    style: {
    height: '80px',
    width: '400px',
    position: 'top-center',
  }
});
Prelegend.add(Prelegend1);
Prelegend.add(Prelegend2);
var Postlegend1 = ui.Label({value: 'Post-hurricane Satellite Image (R: SWIR, G: NIR, B: Red)', style:{position:'top-center'}});
var Postlegend3 = ui.Label({value:'Image Composites: 10/01/2017 - 01/30/2018', style:{position:'top-center'}})
var Postlegend =  ui.Panel({
    style: {
    height: '80px',
    width: '400px',
    position: 'top-center',
  }
});
Postlegend.add(Postlegend1);
Postlegend.add(Postlegend3);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Posth = ui.Map.Layer(ee.Image(image),{bands: 'B6,B5,B4', 'gain':'0.06,0.04,0.06'},'Post-hurricane Image');
var Preh = ui.Map.Layer(ee.Image(image2),{bands: 'B6,B5,B4', 'gain':'0.06,0.04,0.06'},'Pre-hurricane Image');
var nmDNPV = ui.Map.Layer(ee.Image(image3).sldStyle(DNPVIntensity_intervals), {}, 'Tree Morality Intensity');
var nmDNPVearly = ui.Map.Layer(ee.Image(image4).sldStyle(DNPVIntensity_intervals), {}, 'Tree Morality Intensity early');
var nmDNPVlate = ui.Map.Layer(ee.Image(image5).sldStyle(DNPVIntensity_intervals), {}, 'Tree Morality Intensity late');
var prevLegend = null;
Map.setCenter( -66.4838, 18.2033, 9); 
////////////////////////////////////////////////
//Select widget for choosing different maps    
var layerselect= ui.Select({
  items: [
    {label: 'Pre-hurricane land cover map', value: {layer: Preh, leg:Prelegend}},
    {label: 'Post-hurricane land cover map', value: {layer: Posth, leg:Postlegend}},
    {label: 'Tree Disturbance Intensity (one month after)', value: {layer: nmDNPVearly, leg:legend2}},
    {label: 'Tree Disturbance Intensity (three month after)', value: {layer: nmDNPV, leg:legend2}},
    {label: 'Tree Disturbance Intensity (one year after)', value: {layer: nmDNPVlate, leg:legend2}},
  ],
  onChange: function(value) {
    // print(leg)
    Map.setCenter( -66.4838, 18.2033, 9); 
    Map.layers().set(0, value.layer);
    if (prevLegend !== null) {
      Map.remove(prevLegend);
    }
    prevLegend = value.leg;
    Map.add(prevLegend);
  },
  style:{width: '250px', margin:'2px'}
});
// Set a place holder.
layerselect.setPlaceholder('Choose a layer...');
var slider = ui.Slider({style:{width: '270px'}});
slider.setValue(0.9);  // Set a default value.
slider.onChange(function(value) {
Map.layers().get(0).setOpacity(value);
});
//////////////////////////////////////////////////////////////////
// ui.root.clear();
// ui.root.setLayout(ui.Panel.Layout.absolute());
var panel = ui.Panel({style: {width: '280px',maxHeight: '300px', position:'bottom-right',margin:'2px'} })
              .add(ui.Label('Choose a map product:'));
panel.add(layerselect);
panel.add(ui.Label('Set the Opacity'));
panel.add(slider);
var PRregion = ee.Geometry.Rectangle(-65.59159, 17.913916,-67.35207, 18.566410)
ui.root.add(panel);