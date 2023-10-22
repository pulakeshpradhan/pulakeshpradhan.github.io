var button = ui.Button({
  label: "Click Me!",
  onClick: addImage,
  style:{position: "bottom-left"}
})
function addImage(){
  var image = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").first()
  Map.addLayer(image, {min:0, max:15, palette:["red", "orange", "green", "blue"]})
}
Map.add(button)