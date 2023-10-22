var TNGM = ui.import && ui.import("TNGM", "table", {
      "id": "users/anjardimarasakti/TNGM"
    }) || ee.FeatureCollection("users/anjardimarasakti/TNGM"),
    NASA_Bio = ui.import && ui.import("NASA_Bio", "imageCollection", {
      "id": "NASA/ORNL/biomass_carbon_density/v1"
    }) || ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1"),
    area = ui.import && ui.import("area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                110.35983937980346,
                -7.5146151744580765
              ],
              [
                110.35983937980346,
                -7.605485524387243
              ],
              [
                110.4882420897644,
                -7.605485524387243
              ],
              [
                110.4882420897644,
                -7.5146151744580765
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[110.35983937980346, -7.5146151744580765],
          [110.35983937980346, -7.605485524387243],
          [110.4882420897644, -7.605485524387243],
          [110.4882420897644, -7.5146151744580765]]], null, false),
    WHRC_Bio = ui.import && ui.import("WHRC_Bio", "image", {
      "id": "WHRC/biomass/tropical"
    }) || ee.Image("WHRC/biomass/tropical");
// Menambah label judul platform
Map.add(ui.Label(
    'Indeks Kerusakan Erupsi Gunung Merapi di TNGM', {fontWeight: 'bold', fontSize: '24px'})); 
Map.centerObject(TNGM, 2);
Map.addLayer(TNGM, {}, 'TNGM');
//NASA_Biomass 
var NASA_Bio_1 = NASA_Bio
.map(function(image){return image
.clip(TNGM)});
var visualization_agb = {
  bands: ['agb'],
  min: 0.0,
  max: 150.0,
  palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']
};
Map.addLayer(NASA_Bio_1, visualization_agb, "NASA_AGB");
var visualization_bgb = {
  bands: ['bgb'],
  min: 0.0,
  max: 150.0,
  palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']
};
Map.addLayer(NASA_Bio_1, visualization_bgb, "NASA_BGB");
//WHRC_Biomass
var WHRC_Bio_1 = WHRC_Bio
var visualization_agb = {
  bands: ['Mg'],
  min: 0.0,
  max: 150.0,
  palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']
};
Map.addLayer(WHRC_Bio_1.clip(TNGM), visualization_agb, "WHRC_AGB");
//NBR
var pre_mos = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_120065_20091019');
var post_mos = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_120065_20110619');
//Map.addLayer(image, {bands: ['B4'], min: 270, max: 310}, 'LST');
var visualization_NBR = {
  min: 0,
  max: 0.45,
  palette: ['600000','ff0202','e4ff10','06ff0f','08e7ff','0847ff']
};
var preNBR = pre_mos.normalizedDifference(['B5', 'B7']);
var postNBR = post_mos.normalizedDifference(['B5', 'B7']);
Map.addLayer(preNBR.clip(TNGM), visualization_NBR,'Pre-fire image');
Map.addLayer(postNBR.clip(TNGM), visualization_NBR,'Post-fire image');
var dNBR = preNBR.subtract(postNBR);
var visualization_DNBR = {
  min: -0.27,
  max: 0.22,
  palette: ['0847ff','08e7ff','06ff0f','e4ff10','ff0202','600000']
};
Map.addLayer(dNBR.clip(TNGM), visualization_DNBR, 'dNBR greyscale');
// Legenda NBR
// Legenda dNBR
var viz1 = {min:-0.27, max: 0.22, palette:['0847ff','08e7ff','06ff0f','e4ff10','ff0202','600000']};
var legend1 = ui.Panel({
style: {
position: 'top-left',
padding: '8px 15px'
}
});
var legendTitle1 = ui.Label({ value: 'dNBR', 
                              style: { fontWeight: 'bold',
                                      fontSize: '14px',
                                      margin: '0 0 4px 0',
                                      padding: '0'  
                              }});
legend1.add(legendTitle1);
var lon1 = ee.Image.pixelLonLat().select('latitude');
var gradient11 = lon1.multiply((viz1.max-viz1.min)/100.0).add(viz1.min);
var legendImage = gradient11.visualize(viz1);
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['max'])
],
});
legend1.add(panel1);
var thumbnail1 = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'30x150'},
style: {padding: '1px', position: 'bottom-left'}
});
legend1.add(thumbnail1);
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['min'])
],
});
legend1.add(panel1);
Map.add(legend1);
// Legenda NBR
var viz1 = {min:0, max: 150, palette:['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']};
var legend1 = ui.Panel({
style: {
position: 'top-right',
padding: '8px 15px'
}
});
var legendTitle1 = ui.Label({ value: 'Kandungan carbon (Mg C/ha)', 
                              style: { fontWeight: 'bold',
                                      fontSize: '14px',
                                      margin: '0 0 4px 0',
                                      padding: '0'  
                              }});
legend1.add(legendTitle1);
var lon1 = ee.Image.pixelLonLat().select('latitude');
var gradient11 = lon1.multiply((viz1.max-viz1.min)/100.0).add(viz1.min);
var legendImage = gradient11.visualize(viz1);
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['max'])
],
});
legend1.add(panel1);
var thumbnail1 = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'30x150'},
style: {padding: '1px', position: 'bottom-left'}
});
legend1.add(thumbnail1);
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['min'])
],
});
legend1.add(panel1);
Map.add(legend1);
// Legenda Carbon
var viz1 = {min:0, max: 0.45, palette:['600000','ff0202','e4ff10','06ff0f','08e7ff','0847ff']};
var legend1 = ui.Panel({
style: {
position: 'top-left',
padding: '8px 15px'
}
});
var legendTitle1 = ui.Label({ value: 'NBR', 
                              style: { fontWeight: 'bold',
                                      fontSize: '14px',
                                      margin: '0 0 4px 0',
                                      padding: '0'  
                              }});
legend1.add(legendTitle1);
var lon1 = ee.Image.pixelLonLat().select('latitude');
var gradient11 = lon1.multiply((viz1.max-viz1.min)/100.0).add(viz1.min);
var legendImage = gradient11.visualize(viz1);
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['max'])
],
});
legend1.add(panel1);
var thumbnail1 = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'30x150'},
style: {padding: '1px', position: 'bottom-left'}
});
legend1.add(thumbnail1);
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['min'])
],
});
legend1.add(panel1);
Map.add(legend1);
// Define a Point object.
var point1 = ee.Geometry.Point(110.41611111, -7.58316667);
var point2 = ee.Geometry.Point(110.43527778, -7.59716667);
var point3 = ee.Geometry.Point(110.44222222, -7.57791667);
//Point
Map.centerObject(point1, 12);
Map.addLayer(point1, {'color': 'white',strokeWidth: 5},'Titik Uji 1');
Map.addLayer(point2, {'color': 'white',strokeWidth: 5},'Titik Uji 3');
Map.addLayer(point3,{'color': 'white',strokeWidth: 5},'Titik Uji 3');