var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                93.50064921587324,
                8.304951911745746
              ],
              [
                93.50064921587324,
                -11.107299799802576
              ],
              [
                141.22525859087324,
                -11.107299799802576
              ],
              [
                141.22525859087324,
                8.304951911745746
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[93.50064921587324, 8.304951911745746],
          [93.50064921587324, -11.107299799802576],
          [141.22525859087324, -11.107299799802576],
          [141.22525859087324, 8.304951911745746]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/Aziz/IDN_Barat_4Mil"
    }) || ee.FeatureCollection("users/Aziz/IDN_Barat_4Mil"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/Aziz/IDN_Timur_4Mil"
    }) || ee.FeatureCollection("users/Aziz/IDN_Timur_4Mil");
/*  
Global Variables
*/
var Depth = 'Batimetri'
var buffer = table.merge(table2)
/*
Visualization parameters
*/
//var visMPT = {"opacity":1, "palette":["ff7c0b", "ffffff"], "min":-2, "max":0}
var visBat = {min: 10,max: 0.2, palette : ['#0107c2', '#2db2ff', '#76ffff']};
var visMPT = {min: 1,max: 1, palette : ['#00a326']};
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'20%'}});
ui.root.insert(0,panel);
// Define title and description.
var intro = ui.Label('Informasi Kedalaman ',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px', color: '0241d4'}
);
var subtitle = ui.Label('Disclaimer : Informasi kedalaman ini berdasarkan citra satelit Landsat-8, dengan MPT < 50', {});
//panel year
var labelyear = ui.Label({
value:'Pilih Tahun',
style:{fontSize: '15px', fontWeight: 'bold', color: '27292e'}});
var labelyearr = ui.Label('Informasi tersedia mulai dari tahun 2013',
{margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var yearinput = ui.Textbox({placeholder: 'mulai', style: {width: '50px'}})
var yearinput2 = ui.Textbox({placeholder: 'akhir', style: {width: '50px'}});
// Add title and description to the panel  
panel.add(intro)
    .add(subtitle)
    .add(labelyear)
    .add(labelyearr)
    .add(ui.Panel([yearinput, yearinput2],ui.Panel.Layout.flow('horizontal')));
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create the color bar for the legend.
var legendTitle = ui.Label({
  value: 'Kedalaman (m)',
  style: {fontWeight: 'bold',fontSize: '18px',margin:'0 0 4px 0',padding: '0'}
});
legend.add(legendTitle);
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visBat.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
legend.add(colorBar);
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visBat.min, {margin: '4px 8px'}),
    ui.Label(
        (visBat.min/2.0),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visBat.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
function execute(){
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var yr1 = yearinput.getValue()
var yr2 = yearinput2.getValue()
var startMonth = "-01-01"
var endMonth = "-12-30"
var ls8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                                          .filterDate(ee.String(yr1).cat(startMonth),
                                                      ee.String(yr2).cat(endMonth))
                                          .filterBounds(geometry)
                                          .map(maskL8sr)
                                          .sort('CLOUD_COVER')
                                          .median()
function bat (image){
  var sr = image.select('B2', 'B3', 'B4', 'B5').multiply(0.0001)
  var ndwi = sr.normalizedDifference(['B3', 'B5'])
  var laut = sr.clip(buffer).updateMask(ndwi.gte(0.0001))
  var red = laut.select('B4')
  var TSS = red.expression('8.1429*(exp(23.704*B4))',{'B4':red})
  var jernih = laut.updateMask(TSS.lt(50))
  var blue = jernih.select('B2');
  var green = jernih.select('B3');
  var IB = jernih.expression('-1*(a/b)', {
  'a': blue.log(),
  'b': green.log(),
});
  var BBS = (IB.multiply(-80.509)).subtract(84.156)
  var BBS_filter = (BBS.updateMask(BBS.gt(-10).and(BBS.lt(-0.2)))).multiply(-1)
  return BBS_filter.rename('Bati')
}
var output = bat(ls8).clip(geometry)
var addlyr = Map.addLayer(output, visBat, 'Batimetri ' + yr1+' - ' + yr2+' ')
Map.centerObject(geometry, 5)
Map.add(legend)
}
// Membuat fungsi select untuk menampilkan data
var showdata = ui.Button({label:'Tampilkan' , onClick:execute, disabled:false, style:{color:'27292e'}}); 
panel.add(showdata)
var resetButton = ui.Button({label: 'Reset Map', onClick: reset, style: {color:'27292e'}});
panel.add(resetButton);
/*
Reset Map
*/
function reset(){
  Map.clear();}