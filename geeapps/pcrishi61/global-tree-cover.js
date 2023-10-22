var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('tree-coverfraction');
print(dataset);
Map.addLayer(dataset, {min:0,max:100}, "Land Cover");
Map.setCenter(78.96,20.59,3);