var MOD11A1 = ui.import && ui.import("MOD11A1", "imageCollection", {
      "id": "MODIS/006/MOD11A2"
    }) || ee.ImageCollection("MODIS/006/MOD11A2"),
    image1 = ui.import && ui.import("image1", "image", {
      "id": "users/anjardimarasakti/EstGenerated_Energy_GWp_amj1"
    }) || ee.Image("users/anjardimarasakti/EstGenerated_Energy_GWp_amj1"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/anjardimarasakti/EstGenerated_Energy_GWp_jas1"
    }) || ee.Image("users/anjardimarasakti/EstGenerated_Energy_GWp_jas1"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/anjardimarasakti/EstGenerated_Energy_GWp_jfm1"
    }) || ee.Image("users/anjardimarasakti/EstGenerated_Energy_GWp_jfm1"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/anjardimarasakti/EstGenerated_Energy_GWp_ond1"
    }) || ee.Image("users/anjardimarasakti/EstGenerated_Energy_GWp_ond1"),
    Country = ui.import && ui.import("Country", "table", {
      "id": "users/anjardimarasakti/countries"
    }) || ee.FeatureCollection("users/anjardimarasakti/countries"),
    MYD09GA = ui.import && ui.import("MYD09GA", "imageCollection", {
      "id": "MODIS/006/MYD09GA"
    }) || ee.ImageCollection("MODIS/006/MYD09GA");
var countries = Country
var Nama_Negara = ['Indonesia']
var Indonesia = countries
.filter(ee.Filter.inList('NAME', Nama_Negara));
Map.addLayer(Indonesia); 
Map.centerObject(Indonesia, 5);  
var Total = image1.add(image2).add(image3).add(image4).rename('SolarEnergy');
Map.addLayer(Total.clip(Indonesia), {min: 202, max: 313, palette: 
[ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]}, 'Total Generated Energy GWp');