/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var peru = ee.FeatureCollection("users/edgarmanrique30/Peru_geometry/Limite_departamental"),
    ccpp = ee.FeatureCollection("users/edgarmanrique30/Peru_geometry/centros_poblados_peru"),
    dem = ee.Image("USGS/SRTMGL1_003"),
    landc = ee.ImageCollection("MODIS/006/MCD12Q1"),
    vias_dep = ee.FeatureCollection("users/edgarmanrique30/Peru_geometry/red_vial_departamental_dic16"),
    vias_nac = ee.FeatureCollection("users/edgarmanrique30/Peru_geometry/red_vial_nacional_dic16"),
    vias_vec = ee.FeatureCollection("users/edgarmanrique30/Peru_geometry/red_vial_vecinal_dic16"),
    rios = ee.Image("WWF/HydroSHEDS/15ACC"),
    anp = ee.FeatureCollection("users/edgarmanrique30/Peru_geometry/ANP-Nacional"),
    inputPoints = ee.FeatureCollection("users/edgarmanrique30/Peru_geometry/eess_20190319");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Travel time to health facilities as a marker of geographical accessibility across heterogeneous land coverage in Peru.
// Gabriel Carrasco-Escobar, Edgar Manrique, Kelly Tello-Lizarraga, J. Jaime Miranda
var left = ui.Map();
var right = ui.Map();
var right2 = ui.Map();
ui.root.clear();
ui.root.add(left);
ui.root.add(right);
ui.root.add(right2);
ui.Map.Linker([left, right,right2], 'change-bounds');
//// Constructing our friction surface
dem = dem.clip(peru); //Clipping DEM to Peru geometry 
var slope = ee.Terrain.slope(dem); // Calculating slope raster
landc = landc.select("LC_Type1").filterDate("2017-01-01","2017-12-31").median().clip(peru); //Clipping Land cover type to Pery geometry
var peru_rios = peru.filter(ee.Filter.inList('NOMBDEP', ["LORETO", "MADRE DE DIOS", "UCAYALI"])); //Selecting 3 departments of Peru located in the jungle to use them as limits of navigable rivers 
rios = rios.gt(5000); //Filtering HydroSHEDS Flow Accumulation to pixels connected with more than 5000 pixels 
rios = rios.remap([0,1],[0,9]); //Remapping pixel values to 9, refering to 9km/h
var black = ee.Image(0).byte(); //Template
var vias_nac = black.paint(vias_nac, 80).clip(peru.geometry()); //Creating the national roads raster with 80km/h pixel value
var vias_dep = black.paint(vias_dep, 50).clip(peru.geometry()); //Creating the departmental roads raster with 50km/h pixel value
var vias_vec = black.paint(vias_vec, 30).clip(peru.geometry()); //Creating the vecinal roads raster with 30km/h pixel value
//LC_Type1, Remapping the pixel values of each category of land cover to their respective speed in km/h.
var landcspeed = landc
.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ,14, 15, 16, 17],
       [3.24, 1.62, 3.24, 4, 3.24, 3, 4.2, 4.86, 4.86, 4.86, 2, 2.5, 5, 3.24, 1.62, 3, 1]);
var landc_urban = landc.eq(13) //Filtering urban areas to multiply the roads speed by .7
landc_urban = landc_urban.remap([0,1],[1,0.7]); //Filtering urban areas to multiply the roads speed by .7
vias_nac  = vias_nac.multiply(landc_urban) //Multiplying roads layers by 0.7 in urban areas
vias_dep  = vias_dep.multiply(landc_urban) //Multiplying roads layers by 0.7 in urban areas
vias_vec  = vias_vec.multiply(landc_urban) //Multiplying roads layers by 0.7 in urban areas
var black = ee.Image(0).byte(); // Template
anp = black.paint(anp, 1).clip(peru.geometry()); //Creating Natural protected areas layer
anp = anp.remap([0,1],[1,0.2]); //Remapping values to 0.2 km/h of Natural protected areas to multiply Landcover speed
landcspeed  = landcspeed.multiply(anp) //Multiplying Landcover speed by 0.2 on Natural protected areas
landcspeed  = landcspeed.toDouble().select([0],["speed"]) //unifying the band name
rios  = rios.toDouble().select([0],["speed"]) //unifying the band name
vias_nac  = vias_nac.toDouble().select([0],["speed"]) //unifying the band name
vias_dep  = vias_dep.toDouble().select([0],["speed"]) //unifying the band name
vias_vec  = vias_vec.toDouble().select([0],["speed"]) //unifying the band name
var collection = ee.ImageCollection([landcspeed, rios, vias_nac, vias_dep, vias_vec]) //Mergging all layers into a collection
var fsurface = collection.max() //Calculating the maximum value of speed on a single pixel
//eaf <- function(x) {1.01*exp(-0.0001072*x)} # Elevation adjustment factor
var eaf = dem.expression(
    '1.01*exp(-0.0001072*DEM)', {
      'DEM': dem.select('elevation')
});
//thf <- function(x) {6*exp(-3.5*abs((tan(x/57.296) + 0.05)))/5} # Tobler's hikking function adjustment
var thf = slope.expression(
    '6*exp(-3.5*abs((tan(slope/57.296) + 0.05)))/5', {
      'slope': slope.select([0])
});
fsurface = fsurface.multiply(eaf).multiply(thf); //Adjusting the friction surface by EAF and THF
//convert <- function(x) {(x * 1000 / 60) ^ -1} # converts km/h to min/m
var fsurface = fsurface.expression(
    '(x * 1000 / 60) ** -1', {
      'x': fsurface.select([0])
});
//Map.addLayer(eaf)
//Map.addLayer(thf)
//Map.addLayer(fsurface)
////Calculating accesibility map
var inputPoints1 = inputPoints.filter(ee.Filter.eq("categoria2","I"))
var inputPoints2 = inputPoints.filter(ee.Filter.eq("categoria2","II"))
var inputPoints3 = inputPoints.filter(ee.Filter.eq("categoria2","III"))
var black = ee.Image(0).byte();
// Paint the input points, essentially converting them to a raster.
// Theoretically this will merge any points that fall within the same pixel (of the resulting 30-arc-second resolution).
var sources1 = black.paint(inputPoints1, 1);
sources1 = sources1.updateMask(sources1);
var sources2 = black.paint(inputPoints2, 1);
sources2 = sources2.updateMask(sources2);
var sources3 = black.paint(inputPoints3, 1);
sources3 = sources3.updateMask(sources3);
// Compute the min cost path distance map, with a horizon of 1500 km.
// This can be reduced for high-latitude areas and/or to shorten processing time.
var distance1 = fsurface.cumulativeCost(sources1, 400000);  // The function accepts meters rather than km.
var distance1 = ee.Image(distance1).toInt();  // Here we convert the output to integer to make the output .tif smaller (and the code more likely to run successfully).
var distance1 = distance1.clip(peru)
var distance2 = fsurface.cumulativeCost(sources2, 400000);  // The function accepts meters rather than km.
var distance2 = ee.Image(distance2).toInt();  // Here we convert the output to integer to make the output .tif smaller (and the code more likely to run successfully).
var distance2 = distance2.clip(peru)
var distance3 = fsurface.cumulativeCost(sources3, 500000);  // The function accepts meters rather than km.
var distance3 = ee.Image(distance3).toInt();  // Here we convert the output to integer to make the output .tif smaller (and the code more likely to run successfully).
var distance3 = distance3.clip(peru)
var vis = {min:0, max:600, palette:'#e2b43f,#dd554b,#5b366e,#412e54, #28213d'};
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Accesibility to health facilities in minutes',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
//Print maps
right2.addLayer(fsurface.clip(peru),{min:0, max:0.1, palette:'#dd554b,#e2b43f,#dbda92,#60b27f, #4866c9'},'friction')
right2.addLayer(distance3, {min:0, max:600, palette:'#e2b43f,#dd554b,#5b366e,#412e54, #28213d'}, 'Accessibility III')
right2.add(ui.Label('Accessibility to Health Facilities Cat III',{position: 'bottom-center',fontSize:'18px',backgroundColor:'white'}))
right2.add(legendPanel);
right.addLayer(fsurface.clip(peru),{min:0, max:0.1, palette:'#dd554b,#e2b43f,#dbda92,#60b27f, #4866c9'},'friction')
right.addLayer(distance2, {min:0, max:600, palette:'#e2b43f,#dd554b,#5b366e,#412e54, #28213d'}, 'Accessibility II')
right.add(ui.Label('Accessibility to Health Facilities Cat II',{position: 'bottom-center',fontSize:'18px',backgroundColor:'white'}))
left.addLayer(fsurface.clip(peru),{min:0, max:0.1, palette:'#dd554b,#e2b43f,#dbda92,#60b27f, #4866c9'},'friction')
left.addLayer(distance1, {min:0, max:600, palette:'#e2b43f,#dd554b,#5b366e,#412e54, #28213d'}, 'Accessibility I')
left.add(ui.Label('Accessibility to Health Facilities Cat I',{position: 'bottom-center',fontSize:'18px',backgroundColor:'white'}))
left.setCenter(-75.808, -9.45,5)