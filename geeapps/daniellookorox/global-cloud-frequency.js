var jan = ui.import && ui.import("jan", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Jan"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Jan"),
    feb = ui.import && ui.import("feb", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Fev"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Fev"),
    mar = ui.import && ui.import("mar", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Mar"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Mar"),
    abr = ui.import && ui.import("abr", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Apr"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Apr"),
    may = ui.import && ui.import("may", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_May"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_May"),
    jun = ui.import && ui.import("jun", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Jun"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Jun"),
    jul = ui.import && ui.import("jul", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Jul"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Jul"),
    aug = ui.import && ui.import("aug", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Ago"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Ago"),
    sep = ui.import && ui.import("sep", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Sep"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Sep"),
    oct = ui.import && ui.import("oct", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Oct"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Oct"),
    nov = ui.import && ui.import("nov", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Nov"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Nov"),
    dez = ui.import && ui.import("dez", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_Dec"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_Dec"),
    ALL = ui.import && ui.import("ALL", "image", {
      "id": "users/daniellookorox/Cloud_Fre_MYD09GA_world_all"
    }) || ee.Image("users/daniellookorox/Cloud_Fre_MYD09GA_world_all");
var palettes = require('users/gena/packages:palettes');
var palette = palettes.misc.coolwarm[7]
Map.addLayer(jan,{min:0, max: 1, palette: palette}, 'Cloud Frequency January',0)
Map.addLayer(feb,{min:0, max: 1, palette: palette}, 'Cloud Frequency February',0)
Map.addLayer(mar,{min:0, max: 1, palette: palette}, 'Cloud Frequency March',0)
Map.addLayer(abr,{min:0, max: 1, palette: palette}, 'Cloud Frequency April',0)
Map.addLayer(may,{min:0, max: 1, palette: palette}, 'Cloud Frequency May',0)
Map.addLayer(jun,{min:0, max: 1, palette: palette}, 'Cloud Frequency June',0)
Map.addLayer(jul,{min:0, max: 1, palette: palette}, 'Cloud Frequency July',0)
Map.addLayer(aug,{min:0, max: 1, palette: palette}, 'Cloud Frequency August',0)
Map.addLayer(sep,{min:0, max: 1, palette: palette}, 'Cloud Frequency September',0)
Map.addLayer(oct,{min:0, max: 1, palette: palette}, 'Cloud Frequency October',0)
Map.addLayer(nov,{min:0, max: 1, palette: palette}, 'Cloud Frequency November',0)
Map.addLayer(dez,{min:0, max: 1, palette: palette}, 'Cloud Frequency December',0)
Map.addLayer(ALL,{min:0, max: 1, palette: palette}, 'Cloud Frequency Complete')
var year = jan.addBands(feb).addBands(mar).addBands(abr).addBands(may).addBands(jun).addBands(jul).addBands(aug).addBands(sep).addBands(oct).addBands(nov).addBands(dez)
print(year)
///////////////////////// TIME IINTERVAL FOR COMPOSITE IMAGE ////////////
var panel = ui.Panel({
  style:{width:'400px',backgroundColor: "lightgray"}
})
var title = ui.Label('Cloud Frequency',  {fontWeight: 'bold', fontSize: '25px'})
var explanation = ui.Label('Cloud Cover Frequency in Global Waters Calculated using MYD09GA product.',  {fontWeight: 'bold', fontSize: '15px'})
var header = ui.Label('Click on Map to get Cloud Cover \nmonlty averaged value for specific point', {whiteSpace: 'pre', fontWeight: 'bold', fontSize: '18px'});
var toolPanel = ui.Panel([header], 'flow', {width: '400px'});
ui.root.add(panel.add(title).add(explanation).add(toolPanel))
/////////////////////// GET THE TIME SERIES OF THE ENTIRE DATA ////////////////// 
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat)
  var chart =
    ui.Chart.image
        .byRegion({
          image: year,
          regions: click_point,
          reducer: ee.Reducer.mean(),
          scale: 1000})
        .setSeriesNames([
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
          'Nov', 'Dec'
        ]).setChartType('ColumnChart')
        .setOptions({
          title: 'Montly Cloud Cover',
          hAxis:
              {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Cloud Cover Frequency',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: [
            '000000', '000000', '000000', '000000', '000000', '000000',
            '000000', '000000', '000000', '000000', '000000', '000000'
          ]
        });
  panel.widgets().set(6, chart);
})
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
var vis = {min: 0, max: 1, palette: palette};
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '300x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('1', {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Cloud Frequency',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);