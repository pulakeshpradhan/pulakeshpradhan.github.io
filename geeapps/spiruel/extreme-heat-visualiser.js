var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -166.30152561125956,
                66.58003758001449
              ],
              [
                -166.30152561125956,
                -53.64938010007012
              ],
              [
                192.9953493887404,
                -53.64938010007012
              ],
              [
                192.9953493887404,
                66.58003758001449
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
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-166.30152561125956, 66.58003758001449],
          [-166.30152561125956, -53.64938010007012],
          [192.9953493887404, -53.64938010007012],
          [192.9953493887404, 66.58003758001449]]], null, false);
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'16.333%'}});
ui.root.insert(0,panel);
// Define title and description.
var intro = ui.Label('Extreme Heat Visualiser:',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label("The world's hottest temperatures are rising. By 2100, at least four times more people are expected to be affected by heat stress conditions than those affected today.")
var subtitle2 = ui.Label("The rapid rise in Earth's temperatures today is outpacing what is expected naturally, and can be attributed to the burning of fossil fuels.");
var subtitle3 = ui.Label("Use the visualiser to view where in the world extreme heat has been experienced over the last 40 years. The count of how many times the temperature exceeded the threshold in that year will be plotted as a pixel layer. Identifying points are plotted over the top.");
// Add title and description to the panel  
panel.add(intro).add(subtitle).add(subtitle2).add(subtitle3);
var era5 = ee.ImageCollection("ECMWF/ERA5/MONTHLY");
var years = ee.List.sequence(1980,2020);
var year_label = ui.Label('Select a year to visualise:')
panel.add(year_label)
var year_sel = 2019
// Define the select button for the AOI
var selectYear = ui.Slider(1980, 2019, year_sel, 1, plot_map);
selectYear.style().set('width', '200px');
panel.add(selectYear);
var temp_label = ui.Label('Select a temperature threshold (degrees C):')
panel.add(temp_label)
var temp_sel = 50;
var selectTemp = ui.Slider(40, 55, temp_sel, 1, plot_map);
selectTemp.style().set('width', '200px');
panel.add(selectTemp);
var byYear = ee.ImageCollection.fromImages(
      years.map(function(y) {
        return era5.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .select('mean_2m_air_temperature').mean()
                    .set('year', y);
}));
var visualisation = {
  bands: ['maximum_2m_air_temperature'],
  min: 273 + -20,
  max: 273 + 50,
  palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
};
var visualisation2 = {
  bands: ['maximum_2m_air_temperature'],
  min: 0,
  max: 5,
  palette: [
    "#000080","#FF0000",
  ]
};
//print(byYear)
Map.setCenter(22.2, 21.2, 3);
plot_map();
//Map.addLayer(ee.Image(byYear.toList(40,39).get(0)), visualisation, "Monthly average air temperature [K] at 2m height");
function threshold(i) {
  var count = i.gt(273+selectTemp.getValue())
  return count
}
function plot_map() {
  Map.clear()
  var temp_sel = selectTemp.getValue();
  var year_sel = selectYear.getValue();
  //print(temp_sel, year_sel)
  //print(era5.select('maximum_2m_air_temperature').filter(ee.Filter.calendarRange(year_sel, year_sel, 'year')).map(threshold).count())
  var threshold_monthly_sum = era5.select('maximum_2m_air_temperature').filter(ee.Filter.calendarRange(selectYear.getValue(), selectYear.getValue(), 'year')).map(threshold).sum()
  var thresh_mask = threshold_monthly_sum.updateMask(threshold_monthly_sum.gte(0.01))
  Map.addLayer(thresh_mask, visualisation2, 'thresholded maximum 2 m air temperature ERA5')
  //var stats = thresh_mask.reduceRegion({
  //    reducer: ee.Reducer.count(), 
  //    geometry: geometry, 
  //   bestEffort: true,
  //    scale: 20
  //  });
  //print(stats)
  var vectors = thresh_mask.sample({
    region: geometry,
    geometries: true,  // if you want points
    scale: 25000
  });
  Map.addLayer(vectors,{color: 'red', opacity: 0.25},'points');
}
// Define a DataTable using a JavaScript array with a column property header.
var dataTable = [
  [
    {label: 'year', role: 'domain', type: 'string'},
    {label: 'locations', role: 'data', type: 'number'},
  ],
  ['1980', 101],
  ['1981', 89],
  ['1982', 51],
  ['1983', 87],
  ['1984', 1],
  ['1985', 35],
  ['1986', 88],
  ['1987', 151],
  ['1988', 207],
  ['1989', 38],
  ['1990', 55],
  ['1991', 52],
  ['1992', 25],
  ['1993', 91],
  ['1994', 33],
  ['1995', 60],
  ['1996', 180],
  ['1997', 12],
  ['1998', 397],
  ['1999', 147],
  ['2000', 283],
  ['2001', 188],
  ['2002', 108],
  ['2003', 190],
  ['2004', 80],
  ['2005', 169],
  ['2006', 116],
  ['2007', 125],
  ['2008', 211],
  ['2009', 86],
  ['2010', 403],
  ['2011', 286],
  ['2012', 165],
  ['2013', 78],
  ['2014', 64],
  ['2015', 179],
  ['2016', 294],
  ['2017', 464],
  ['2018', 163],
  ['2019', 137],
];
// Define the chart and print it to the console.
var chart = ui.Chart(dataTable).setChartType('ColumnChart').setOptions({
  title: '50C events are occurring more often',
  legend: {position: 'none'},
  hAxis: {title: 'year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'locations', titleTextStyle: {italic: false, bold: true}},
  colors: ['1d6b99']
});
panel.add(chart);
var see_more = ui.Label('More info:', {fontWeight: 'bold'})
var see_more1 = ui.Label('Visualiser uses ERA5 monthly aggregates data. https://developers.google.com/earth-engine/datasets/catalog/ECMWF_ERA5_MONTHLY')
var see_more2 = ui.Label('BBC article: https://www.bbc.co.uk/news/science-environment-58494641')
var see_more3 = ui.Label("Timeline of Earth's temperature: https://xkcd.com/1732")
var see_more4 = ui.Label("Got any feedback? Message me on Twitter @spiruel")
panel.add(see_more).add(see_more1).add(see_more2).add(see_more3).add(see_more4)
var era5_daily = ee.ImageCollection("ECMWF/ERA5/DAILY").filter(ee.Filter.calendarRange(selectYear.getValue(), selectYear.getValue(), 'year')).select('maximum_2m_air_temperature');
function count_days(image) {
  var image = ee.Image(image).updateMask(ee.Image(image).gte(273+50))
  return ee.Image(image).reduceRegion({
    reducer: ee.Reducer.count(),
    geometry:geometry,
    bestEffort: true,
    scale: 2500
  });
}
var agg = era5_daily.toList(365).map(count_days)
print(agg)
//print(ee.ImageCollection(agg).aggregate_sum('pixel_count'))