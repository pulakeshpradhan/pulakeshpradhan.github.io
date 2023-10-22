/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var COVID_Guate = ee.FeatureCollection("users/rudiger/coronavirusGT-20200531-1637");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
print(COVID_Guate)
var volnm='Location_x_subset_';
// var blat=14.474567;
// var blon=-90.880813;
var blat=14.60;
var blon=-90.57;
// var a8=1;
// var b=ee.Geometry.Rectangle([blon-a8, blat+a8, blon+a8, blat-a8]); // Fuego
var b=ee.Geometry.Rectangle([-92.3, 17.9, -88.2, 13.7]); // Fuego
// print(b)
// var a=ee.Image.pixelArea().reproject('EPSG:4326',null,100).clip(b)
var a=ee.ImageCollection("WorldPop/GP/100m/pop").toList(2000)
print(a)
var a2=ee.Image(a.get(1907))
print(a2)
var a4=a2.divide(ee.Image.pixelArea())
var a5=a4.reproject('EPSG:4326',null,100).multiply(1000000)
print(a5)
Map.addLayer(a5.log10(),
// Map.addLayer(a5.log10().gt(2),
// Map.addLayer(a5.gt(500),
  // {'min':0,'max':10000,
  {'min':0,'max':4.5,
  // {'min':0,'max':1,
    palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
    // palette: ['blue','yellow'],
},'Densidad de poblacion de WorldPop: https://www.worldpop.org/',1,0.75);
Map.addLayer(COVID_Guate,{color:'000000'},
'Lugares con casos: https://maphub.net/coronavirusGT/mapa-Coronavirus-GT')
Map.setCenter(blon, blat, 8);
// Map.setOptions("TERRAIN")
// Map.addLayer(a,
//     {'min': 9500, 'max': 9700,
//     palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']});
// Map.setCenter(blon, blat, 6);
// Export.image.toDrive({image: a5, description: 'Population_density_Guatemala', 
//   folder: 'output_earthengine', fileNamePrefix: 'Pop_dens_Guate_worldpop',
//   scale: 100, region: b})