/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Feature(
        ee.Geometry.MultiPoint(),
        {
          "system:index": "0"
        }),
    geometry2 = /* color: #98ff00 */ee.Geometry.MultiPoint(),
    table = ee.FeatureCollection("users/svoboj25/HaresVectorizationUpdatedWebMercator");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Vypnutí geometrie
var drawingTools = Map.drawingTools();
var layer = drawingTools.layers().get(0)
if (typeof (Map.drawingTools().layers().get(0)) != "undefined") {
   layer.set('shown', false);
}
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow("vertical")
});
inspector.add(ui.Label("Click to map"))
Map.add(inspector)
// Načti polygonovou vrstvu z URL (můžeš použít GeoJSON nebo Shapefile URL)
var polygonLayer = ee.FeatureCollection(table);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: polygonLayer,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'FF0000'}, 'edges of polygons');
Map.centerObject(polygonLayer);
// Definice atributu, který chceme zobrazit ve vyskakovacím okně
var attributeToShow = "category_1"; // Nahraď "Název_polynomu" názvem atributu, který chceš zobrazit
// Funkce pro zobrazení informací ve vyskakovacím okně
function showPopupInfo(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var polygons = polygonLayer.filterBounds(point);
  inspector.clear();  
  // Získání atributů vybraných polygonů
  var attributes = polygons.getInfo().features[0].properties;
  var popupText = "";
  for (var key in attributes) {
    popupText += key + ": " + attributes[key] + "\n";
  }
  var result = ee.String(ee.Dictionary(attributes).get(attributeToShow)).getInfo()
  inspector.add(ui.Label({
      value: "Land cover: " +result ,//.toFixed(0),
      style:{stretch: "vertical"}}))
  // Zobrazení vyskakovacího okna s informacemi
  print(ee.Dictionary(attributes).get(attributeToShow))
  print(result)
  //Map.popup(point, {title: "Informace o polygonu", body: popupText});
}
// Reakce na kliknutí na mapě
Map.onClick(showPopupInfo);