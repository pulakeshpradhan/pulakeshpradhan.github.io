var canopy = ui.import && ui.import("canopy", "table", {
      "id": "users/ieco/PPR_2015_Tree_Canopy_Outlines"
    }) || ee.FeatureCollection("users/ieco/PPR_2015_Tree_Canopy_Outlines"),
    parcels = ui.import && ui.import("parcels", "table", {
      "id": "users/ieco/Philadelphia_DOR_Parcels_Active2016"
    }) || ee.FeatureCollection("users/ieco/Philadelphia_DOR_Parcels_Active2016"),
    greenspace = ui.import && ui.import("greenspace", "table", {
      "id": "users/ieco/Philadelphia-greenspace"
    }) || ee.FeatureCollection("users/ieco/Philadelphia-greenspace"),
    crimeTracts = ui.import && ui.import("crimeTracts", "table", {
      "id": "users/ieco/Philadelphia-crimeTracts"
    }) || ee.FeatureCollection("users/ieco/Philadelphia-crimeTracts"),
    protect = ui.import && ui.import("protect", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    human = ui.import && ui.import("human", "imageCollection", {
      "id": "CSP/HM/GlobalHumanModification"
    }) || ee.ImageCollection("CSP/HM/GlobalHumanModification"),
    trees = ui.import && ui.import("trees", "table", {
      "id": "users/ieco/PPR_Street_Trees_Philadelphia"
    }) || ee.FeatureCollection("users/ieco/PPR_Street_Trees_Philadelphia");
// Loaded in all spatial data
Map.setCenter(-75.222844, 40.037553,17); // zoom map to Philadelphia Location USE THE INSPECTOR
Map.setOptions('SATELLITE'); // basemap
Map.addLayer(parcels,{color: 'red'},'parcels',0);
Map.addLayer(trees,{color: 'red'},'trees',0);
Map.addLayer(greenspace,{color: '#79ff2f'},'greenspace',1);
Map.addLayer(canopy,{color: '#004953'},'canopy',1);
Map.addLayer(crimeTracts,{},'crimeTracts',0);
/* Rasterize Instructions */
// https://developers.google.com/earth-engine/reducers_reduce_to_image
// Global Data sets that might be good to know about
Map.addLayer(protect,{color: 'red'},'protect',0);
Map.addLayer(human,{},'human',0);