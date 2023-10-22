var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('discrete_classification');
Map.setCenter(116.2056, 39.8904, 8);
Map.addLayer(dataset, {}, "Land Cover");