var paises = ui.import && ui.import("paises", "table", {
      "id": "users/jscorreia66/Countries"
    }) || ee.FeatureCollection("users/jscorreia66/Countries");
var Kenya = paises.filter(ee.Filter.inList('Name',['Kenya']));
var Kenya_style = {fillColor: 'green', color: 'red', lineType: "dashed"};
Map.addLayer(Kenya.style(Kenya_style), {}, 'Kenya').setOpacity(0.7);   
Map.centerObject(Kenya, 5);