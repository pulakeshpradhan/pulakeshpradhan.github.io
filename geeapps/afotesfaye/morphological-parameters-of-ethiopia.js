var table = ui.import && ui.import("table", "table", {
      "id": "users/afotesfaye/eth_admbnda_adm0_csa_bofed_20201008"
    }) || ee.FeatureCollection("users/afotesfaye/eth_admbnda_adm0_csa_bofed_20201008");
//afoo  Access to altitude data collection
//print('GLO-30 Collection size :',glo30.size())
//Explanation on setting default Projection here linkedin.com/in/afework-mekeberiaw-1a057319
var glo30=ee.ImageCollection ("projects/sat-io/open-datasets/GLO-30") ;    //.select("elevation");
var DEM = glo30.mosaic().setDefaultProjection('EPSG:3857',null,30)
//Processing of digital terrain models based on morphology of orientation, slope and shadows
var Slope =  ee.Terrain.slope (DEM);
var Aspect =  ee.Terrain.aspect (DEM);
var Hillshade = ee.Terrain.hillshade(DEM, 300, 40);
// Morphological values ​​score
var ClassesSlope = Slope  
          .where(Slope.lte(5), 10)
          .where(Slope.gt(5).and(Slope.lte(20)), 20) 
          .where(Slope.gt(20).and(Slope.lte(40)), 30)
          .where(Slope.gt(40), 40); 
var OrientationClasses = Aspect  
          .where(Aspect.lte(0), 0)
          .where(Aspect.gt(0).and(Aspect .lte(22.5)), 1)
          .where(Aspect.gt(22.5).and(Aspect.lte(67.5)), 2) 
          .where(Aspect.gt(67.5).and(Aspect.lte(112.5)), 3)
          .where(Aspect.gt(112.5).and(Aspect.lte(157.5)), 4)
          .where(Aspect.gt(157.5).and(Aspect.lte(202.5)), 5)
          .where(Aspect.gt(202.5).and(Aspect.lte(247.5)), 6)
          .where(Aspect.gt(247.5).and(Aspect.lte(292.5)), 7)
          .where(Aspect.gt(292.5).and(Aspect.lte(337.5)), 8)
          .where(Aspect.gt(337.5), 1); 
var MDT = ClassesSlope.add(OrientationClasses);
//contour afo 
var lines = ee.List.sequence(0, 4000, 200)
var contourlines = lines.map(function(line) {
  var mycontour = DEM
    .convolve(ee.Kernel.gaussian(5, 3))
    .subtract(ee.Image.constant(line)).zeroCrossing() 
    .multiply(ee.Image.constant(line)).toFloat();
  return mycontour.mask(mycontour);
})
contourlines = ee.ImageCollection(contourlines).mosaic()
// Elevation
var image = ee.Image().toByte()
    //.paint(roi, 'fill') // Get color from property named 'fill'
    .paint(table, 2, 2); // Outline using color 3, width 5.
Map.addLayer(image, {palette: ['000000', '000000', '000000', '000000'], max: 0.5, opacity: 0.9,},"Boundary of Ethiopia ");
// Map.centerObject(39.00,10.00,7);
// Load a global elevation image.
var elev = ee.Image('USGS/GMTED2010')
// Add the elevation to the map.
//Map.addLayer(elev., {}, 'elevation b/w');
var shade = ee.Terrain.hillshade(elev);
var clipped = shade.clipToCollection(table);
var sea = elev.lte(0);
var elevationPalette = ['FAFDFB','061E84', '1BB747','F0CA0E', 'F07B0E', 'F90B04'];
var visParams = {min: -200, max: 1000, palette: elevationPalette};
var visualized = ee.ImageCollection([
  elev.mask(sea.not()).visualize(visParams),
  sea.mask(sea).visualize({palette:'000022'})
]).mosaic();
var hsv = visualized.divide(255).rgbToHsv();
var hs = hsv.select(0, 1);
var v = shade.divide(255);
var rgb = hs.addBands(v).hsvToRgb().multiply(255).byte();
Map.addLayer(rgb.clip(table), {}, 'Elevation of Ethiopia');
// Add checkbox//
//var checkbox = ui.Checkbox('Morphological parameters of Ethiopia ');
// checkbox.onChange(function(checked) {
// Map.layers().get(0).setShown(checked);
//});
//Map.add(checkbox);
 /************************ legend ****************************/
var names = ['Elevation -150 - 0m','Elevation 0 - 200m', 'Elevation 200 - 400m','Elevation 400 - 600m','Elevation 600 - 800m','Elevation 800 - 1000m',];
var values = ['1', '2', '3','4','5','6'];
var elevationPalette = ['FAFDFB','061E84', '1BB747','F0CA0E', 'F07B0E', 'F90B04'];
// set position of panel
var legend = ui.Panel({style: { position: 'bottom-left', padding: '8px 15px'}});
// Create legend title
var legendTitle = ui.Label({value: 'Legend for Ethiopia Elevation',style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
// Add the title to the panel
legend.add(legendTitle);
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
  var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
  // return the panel
  return ui.Panel({ widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});
};
// Add color and and names
for (var i = 0; i < 6; i++) {legend.add(makeRow(elevationPalette[i], names[i]));
  }  
// Add the legend to the map.
Map.add(legend);
//Visualization of morphological MDT
Map.addLayer (Slope.clip(table),{
  min: 0.0,
  max: 90.0,
  palette: [
    '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
    'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
    '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'
  ]},
'Slope in Degree(Ethiopia)',false);
Map.addLayer (Aspect.clip(table),{
  min: 0.0,
  max: 360.0,
  palette: [
    '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
    'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
    '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'
  ]},
'Aspect(Ethiopia)',false);
Map.addLayer(Hillshade.clip(table), {min:25,max:230}, "Hillshade (Ethiopia) ");
Map.addLayer(MDT.clip(table), {min: 19, max :48, opacity: 0.8,
palette: ['#b0b0b0','#a1a1a1','#98b581','#72a890','#7c8ead','#8c75a0','#b47ba1','#cb8b8f',
'#c5a58a','#bdbf89','#8dc458','#3dab71','#5078b6','#77479d','#c04d9c','#e76f7a','#e2a66c',
'#d6db5e','#84d600','#00ab44','#0068c0','#6c00a3','#ca009c','#ff5568','#ffab47','#f4fa00'
]}, 'Slope-Orientation of Ethiopia',true);
Map.addLayer(contourlines.clip(table), {min: 0, max: 5000, palette:['00ff00', 'ff0000']}, 'Contours(Ethiopia)')
//Map.centerObject(tabel,5)
//Incorporation of water masses on combined DTM of slope and slope
var MasasAgua = ee.Image('JRC/GSW1_3/GlobalSurfaceWater').select('occurrence');
Map.addLayer (MasasAgua, {min: 0.0, max: 100,
  palette: ['#8ba5ff']},
  'Water Bodies of Ethiopia',true);
Map.setCenter (39.10,09.13, 11);
print('Authour:  Afework Mekeberiaw');
// Title
// Create the title label.
var title = ui.Label('Morphological Parameters of Ethiopia');
title.style().set('position', 'top-center');
Map.add(title);
// Create the title label.
var title = ui.Label('Prepared by: Afework Mekeberiaw , Remote Sensing and GIS Specialist Ethiopia');
title.style().set('position', 'bottom-right');
Map.add(title);