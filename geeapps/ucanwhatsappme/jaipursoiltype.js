var jaipur = ui.import && ui.import("jaipur", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
var dataset=ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02");
Map.setCenter(75.78, 27.1052, 9);
var image=dataset.clip(jaipur);
var viz={
  bands:['b0'],
  min:1,
  max:12,
  palette:["d5c36b","b96947","9d3706","ae868f","f86714","46d143","368f20","3e5a14","ffd557","fff72e","ff5a9d","ff005b"]
};
Map.addLayer(image,viz);