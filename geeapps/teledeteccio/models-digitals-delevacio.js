// Search for “elevation” and click on the SRTM Digital Elevation
// Data 30m result to show the dataset description 
// Print data details to console
print(srtm);
// Add the SRTM data to the interactive map
Map.addLayer(srtm);
// Add the data again, but with rescrited value ranges for better visualisation
Map.addLayer(srtm, {min: 0, max: 1500});
// Add the data again, with value ranges, and a useful title for the Layer tabe
Map.addLayer(srtm, {min: 0, max: 1500}, 'Elevation above sea level');
// Experiment with different colour combinations
Map.addLayer(srtm, {min: 0, max: 1500, palette: ['blue', 'yellow', 'red']}, 'Elevation above sea level');
// Create a hillshade view of the elevation data. You can combine it with the Layer transparency options
// var hillshade = ee.Terrain.hillshade(srtm);
// Map.addLayer(hillshade, {min: 150, max:255}, 'Hillshade');
// Show Slope
// var slope = ee.Terrain.slope(srtm);
// Map.addLayer(slope, {min: 0, max: 40}, 'Slope')
// Centrar mapa a les IB
Map.setCenter(2.90, 39.688, 4);
// Experiment with different colour combinations
// Map.addLayer(slope, {min: 0, max: 40, palette: ['green', 'yellow', 'red']}, 'Slope');