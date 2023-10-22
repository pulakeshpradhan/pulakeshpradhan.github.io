var visParams = ui.import && ui.import("visParams", "imageVisParam", {
      "params": {
        "min": -2,
        "max": 2,
        "palette": [
          "blue",
          "cyan",
          "green",
          "yellow",
          "red"
        ]
      }
    }) || {"min":-2,"max":2,"palette":["blue","cyan","green","yellow","red"]},
    edge = ui.import && ui.import("edge", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                132.1408,
                36.256992
              ],
              [
                129.97092,
                35.78376
              ],
              [
                126.76957,
                35.00357
              ],
              [
                126.76957,
                35.00357
              ],
              [
                125.88377,
                36.814636
              ],
              [
                124.92435,
                38.6853
              ],
              [
                124.92435,
                38.6853
              ],
              [
                128.29057,
                39.560738
              ],
              [
                130.527,
                40.076965
              ],
              [
                130.527,
                40.076965
              ],
              [
                131.36052,
                38.14675
              ],
              [
                132.1408,
                36.256992
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffdde9",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #ffdde9 */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[132.1408, 36.256992],
          [129.97092, 35.78376],
          [126.76957, 35.00357],
          [126.76957, 35.00357],
          [125.88377, 36.814636],
          [124.92435, 38.6853],
          [124.92435, 38.6853],
          [128.29057, 39.560738],
          [130.527, 40.076965],
          [130.527, 40.076965],
          [131.36052, 38.14675],
          [132.1408, 36.256992]]]),
    centre = ui.import && ui.import("centre", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                140.82706,
                39.112415
              ],
              [
                138.97743,
                38.862904
              ],
              [
                137.14697,
                38.582695
              ],
              [
                137.14697,
                38.582695
              ],
              [
                136.59438,
                40.211113
              ],
              [
                136.01245,
                41.83465
              ],
              [
                136.01245,
                41.83465
              ],
              [
                137.93115,
                42.12995
              ],
              [
                139.87468,
                42.39139
              ],
              [
                139.87468,
                42.39139
              ],
              [
                140.36313,
                40.75403
              ],
              [
                140.82706,
                39.112415
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[140.82706, 39.112415],
          [138.97743, 38.862904],
          [137.14697, 38.582695],
          [137.14697, 38.582695],
          [136.59438, 40.211113],
          [136.01245, 41.83465],
          [136.01245, 41.83465],
          [137.93115, 42.12995],
          [139.87468, 42.39139],
          [139.87468, 42.39139],
          [140.36313, 40.75403],
          [140.82706, 39.112415]]]),
    region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                125,
                30
              ],
              [
                125,
                45
              ],
              [
                140,
                45
              ],
              [
                140,
                30
              ],
              [
                125,
                30
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[125, 30],
          [125, 45],
          [140, 45],
          [140, 30],
          [125, 30]]], null, false);
// Center the region of interest.
Map.centerObject(region);
// print(Map.drawingTools().layers());
Map.drawingTools().layers().get(2).setShown(false);
Map.setOptions('SATELLITE');
// https://code.earthengine.google.com/?accept_repo=users/mdewitt/eeus-tokyo-2019
// (D) Fancy controls/05 Drawing a zoom box
var flagNames = ee.List([
    'ATMFAIL', 'LAND', 'PRODWARN',
    'HIGLINT', 'HILT', 'HISATZEN',
    'COASTZ', 'SPARE', 'STRAYLIGHT',
    'CLDICE', 'COCCOLITH', 'TURBIDW',
    'HISOLZEN', 'SPARE', 'LOWLW',
    'CHLFAIL', 'NAVWARN', 'ABSAER',
    'SPARE', 'MAXAERITER', 'MODGLINT',
    'CHLWARN', 'ATMWARN', 'SPARE',
    'SEAICE', 'NAVFAIL', 'FILTER',
    'SPARE', 'BOWTIEDEL', 'HIPOL',
    'PRODFAIL', 'SPARE'
]);
// AQUA Python reproject
var asset = 'projects/ee-eutrophicationwatch/assets/OCEANDATA/L2/Test/';
var chl = ee.Image(asset + 'A2022125035500_L2_LAC_OC')
    .select('chlor_a')
    .multiply(1e-06).add(0.001).log10();
var flags = ee.Image(asset + 'A2022125035500_L2_LAC_OC')
    .select('l2_flags');
Map.addLayer(chl, visParams, 'AQUA', true);
function extractPolyData(image, poly) {
    return image.sample({
        region: poly,
        scale: image.projection().nominalScale(),
        dropNulls: true
    });
}
function pixelVals(data, poly, varname) {
    var extract = extractPolyData(data, poly);
    return extract
        .toList(
            extract.size()
        ).map(function (f) {
            return ee.Feature(f).get(varname);
        });
}
// print(ee.Number(1).leftShift(ee.Number(31).toInt()), 
// ee.List.sequence(0, 31).map(function (bit){
//   return ee.Number(1).leftShift(ee.Number(bit).toInt());
// }));
function bitFlags(data) {
    return ee.List.sequence(0, 31).map(
        function (bit) {
            return data.map(function (px) {
                var bshft = ee.Number(1).leftShift(ee.Number(bit).toInt());
                return bshft.bitwiseAnd(px).gt(0);
            }).flatten().reduce(ee.Reducer.sum());
        });
}
// var pixels = pixelVals(flags, centre, 'l2_flags');
// print(pixels);
// var ppx = bitFlags(pixels);
// print(ppx);
// computed centre flags
var csz = 120991;
var centreHist = ee.List([
    0,
    11067,
    154,
    70861,
    26737,
    0,
    601,
    0,
    12105,
    18386,
    0,
    442,
    0,
    0,
    54,
    7,
    0,
    0,
    0,
    79,
    108222,
    7,
    159,
    417,
    0,
    0,
    0,
    0,
    0,
    0,
    94763,
    0]);
// computed edge flags
var esz = 223975;
var edgeHist = ee.List([
    0,
    106894,
    37,
    13,
    116860,
    80417,
    15292,
    0,
    36025,
    22974,
    0,
    4469,
    0,
    0,
    18,
    5,
    0,
    0,
    0,
    4,
    50653,
    8,
    39,
    1951,
    0,
    0,
    0,
    0,
    0,
    18726,
    143664,
    0]);
function getBar(data, labels, title, n) {
    var perc = data.map(function (val) { return ee.Number(val).divide(n) });
    return ui.Chart.array.values({ array: perc, axis: 0, xLabels: labels })
        .setChartType('ColumnChart').setOptions({
            title: title,
            hAxis: {
                orientation: 'horizontal',
                viewWindow: { min: 0, max: 31 },
            },
            vAxis: {
                title: 'Percentage [%]',
                titleTextStyle: { italic: false, bold: true }
            },
            colors: ['cf513e'],
            // viewWindow: {min: 0, max: 31},
            legend: { position: 'none' }
        });
}
function getHist(image, region, bins, title, min, max) {
    return ui.Chart.image.histogram({
        image: image,
        region: region,
        scale: image.projection().nominalScale(),
        maxBuckets: bins
    }).setOptions({
        title: title,
        hAxis: {
            titleTextStyle: { italic: false, bold: true },
            viewWindow: { min: min, max: max }
        },
        vAxis: { title: 'Count', titleTextStyle: { italic: false, bold: true } },
        colors: ['cf513e']
    });
}
var panel = ui.Panel({ style: { width: '350px' } });
panel.add(ui.Label("MODIS/Aqua Remapped Swath", { fontSize: '20px', fontWeight: 'bold' }));
ui.root.insert(0, panel);
var chartPanel = ui.Panel({ style: { stretch: "horizontal" } });
panel.add(chartPanel);
var textStyle = {
  // color: 'grey',
  // fontName: 'arial',
  // fontSize: 14,
  margin: '0 0 0 8px',
  // fontWeight: 'bold',
  // textDecoration: 'italic'
};
var instructions = ui.Panel();
var text = ui.Label(
    "Click a shape on the map to show the CHL histograms " +
    "of 'chlor_a' and 'l2_flags' in each polygon. " +
    "Click a shape again to hide its chart. " +
    "The histographs correspond to MODIS/Aqua remapped" +
    " and ingested data following the procedure detailed in"
);
/* top | right | bottom | left */
var url = ui.Label({
    value:
        'Maúre, E.d.R.; Ilyushchenko, S.; Terauchi, G. A Simple Procedure to Preprocess and Ingest ' +
        'Level-2 Ocean Color Data into Google Earth Engine. Remote Sens. 2022, 14, 4906.',
    style: textStyle
}
).setUrl('https://doi.org/10.3390/rs14194906');
panel.add(instructions.add(text).add(url));
// Parameterize the data.
var pivots = [
    { geometry: centre, label: 'Centre', hist: centreHist, n: csz, min: -0.6, max: 1 },
    { geometry: edge, label: 'Edge', hist: edgeHist, n: esz, min: -0.6, max: 1 }
];
// var t = 'MODIS-Aqua CHLA (Centre-2R)';
// print(getHist(chl, centre, 1000, 300, t, -0.6, 1));
// var t = 'MODIS-Aqua CHLA (Edge-2R)';
// print(getHist(chl, edge, 1000, 300, t, -0.6, 1));
// var names = ee.List.sequence(0, 31).map(function(key){
//   return flagNames.get(ee.Number(key).toInt());
// });
// var chart = getBar(edgeHist, flagNames, 'l2_flags');
// var cli = chart.getOptions();
// print(edgeHist.size(), flagNames,  chart, cli);
// Print a chart for each region.
pivots.forEach(function (pivot) {
    var title = 'MODIS-Aqua CHLA (' + pivot.label + '-2R)';
    var hist = getHist(chl, pivot.geometry, 300, title, pivot.min, pivot.max);
    hist.style().set("shown", false);
    title = 'MODIS-Aqua l2_flags (' + pivot.label + '-2R)';
    var bar = getBar(pivot.hist, flagNames, title, pivot.n);
    bar.style().set("shown", false);
    chartPanel.add(hist);
    chartPanel.add(bar);
});
// update charts
var d = Map.drawingTools();
d.setShown(false);
d.onSelect(function (geo, layer, drawTools) {
  // print(geo, layer, drawTools);
    var shownCount = 0;
    var j = 0;
    pivots.forEach(function (p) {
        [0, 1].forEach(function (item) {
            var c = chartPanel.widgets().get(j);
            if (p.geometry.toGeoJSONString() == geo.toGeoJSONString()) {
                c.style().set("shown", !c.style().get("shown"));
            }
            j += 1;
            shownCount += Number(c.style().get("shown"));
        });
    });
    instructions.style().set("shown", !shownCount);
    drawTools.stop();
});