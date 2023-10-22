var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "RFAA_post_anual"
        ],
        "max": 1800,
        "palette": [
          "417bff",
          "66f1ff",
          "fdff74",
          "d0ff12",
          "26ff0c",
          "15a72d",
          "ff9e58",
          "ff0000",
          "950000"
        ]
      }
    }) || {"opacity":1,"bands":["RFAA_post_anual"],"max":1800,"palette":["417bff","66f1ff","fdff74","d0ff12","26ff0c","15a72d","ff9e58","ff0000","950000"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "RFAA_pre_anual"
        ],
        "max": 1800,
        "palette": [
          "417bff",
          "66f1ff",
          "fdff74",
          "d0ff12",
          "26ff0c",
          "15a72d",
          "ff9e58",
          "ff0000",
          "950000"
        ]
      }
    }) || {"opacity":1,"bands":["RFAA_pre_anual"],"max":1800,"palette":["417bff","66f1ff","fdff74","d0ff12","26ff0c","15a72d","ff9e58","ff0000","950000"]};
var Lanico = ee.FeatureCollection("users/pbaldass/LaNicolasa")
Map.setOptions("SATELLITE")
Map.setCenter(-65.96, -38.85, 10)
var blank = ee.Image(0).mask(0);
var outline = blank.paint(Lanico, 'AA0000', 2); 
var visPar = {'palette':'#ff0000','opacity': 0.6};
var RFAA_pre_anual = ee.Image("users/pbaldass/RFAA_LaNicolasa").select(1)
Map.addLayer(RFAA_pre_anual, imageVisParam2, "RFAA pre_manejo") 
var RFAA_post_anual = ee.Image("users/pbaldass/RFAA_LaNicolasa").select(0)
Map.addLayer(RFAA_post_anual, imageVisParam, "RFAA post_manejo")
var dif_manejo = ee.Image("users/pbaldass/RFAA_LaNicolasa").select(2)
var intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
    '<ColorMapEntry color="#ff0000" quantity="-10" label="-10"/>' +
    '<ColorMapEntry color="#c8ffff" quantity="0" label="0"/>' +
      '<ColorMapEntry color="#ffffff" quantity="10" label="10"/>' +
      '<ColorMapEntry color="#0deaf5" quantity="25" label="25" />' +
      '<ColorMapEntry color="#0bc5ce" quantity="40" label="40" />' +
      '<ColorMapEntry color="#121fbe" quantity="65" label="65" />' +
      '<ColorMapEntry color="#f1ea18" quantity="80" label="80" />' +
      '<ColorMapEntry color="#31f12e" quantity="100" label="100" />' +
      '<ColorMapEntry color="#24b122" quantity="200" label="200" />' +
      '<ColorMapEntry color="#1a8119" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// Agrega la imagen al mapa utilizando la rampa de color como los intervalo definidos.
Map.addLayer(dif_manejo.sldStyle(intervals), null, "Diferencia manejo (%)")
Map.addLayer(outline, visPar, "La Nicolasa", true);
//////////////////////LEYENDA///////////////////////////////  
var colors = [
              "417bff",//200
              "66f1ff",//400
              "fdff74",//600
              "d0ff12",//800
              "26ff0c",//1000
              "15a72d",//1200
              "ff9e58",//1400
              "ff0000",//1600
              "950000",//1800
              ];
var names = [
              "<200",
              "400",
              "600",
              "800",
              "1000",
              "1200",
              "1400",
              "1600",
              "1800",
            ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    width: '150px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: "RFAA promedio "+
          "anual (MJ/m2)",
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < names.length; i++){
legend.add(makeRow(colors[i], names[i]));
}
Map.add(legend)
/////////
var colors2 = ["ff0000",//-10
               "c8ffff",//0
              "ffffff",//10
              "0deaf5",//25
              "0bc5ce",//40
              "121fbe",//65
              "f1ea18",//80
              "31f12e",//100
              "24b122",//200
              "1a8119",//>200
              ];
var names2 = ["-10",
              "0",
              "10",
              "25",
              "40",
              "65",
              "80",
              "100",
              "200",
              ">200",
            ];
var legend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '160px'
  }
});
// Create and add the legend title.
var legendTitle2 = ui.Label({
  value: 'Diferencia RFAA (post-pre/pre)(%)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend2.add(legendTitle2);
// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < names2.length; i++){
legend2.add(makeRow(colors2[i], names2[i]));
}
Map.add(legend2)