var FD2000_2009 = ee.Image("users/pbaldass/forest_degradation_UY_2000-2009")
var FD2010_2018 = ee.Image("users/pbaldass/forest_degradation_UY_2010-2018")
var PVclass = {"opacity":1,"bands":["classification"],"min":0,"max":1,"palette":["#eaeaea","ff7707"]}
Map.setOptions("SATELLITE")
Map.addLayer(FD2000_2009, PVclass, "Degradación 2000-2009")
Map.addLayer(FD2010_2018, PVclass, "Degradación 2010-2018")