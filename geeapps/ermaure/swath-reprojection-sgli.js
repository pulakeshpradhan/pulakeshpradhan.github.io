var edge = ui.import && ui.import("edge", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                125.39289093017578,
                31.06423568725586
              ],
              [
                125.72966003417969,
                32.69270324707031
              ],
              [
                126.0684814453125,
                34.31864929199219
              ],
              [
                126.0684814453125,
                34.31864929199219
              ],
              [
                128.0899200439453,
                34.10609817504883
              ],
              [
                129.72071838378906,
                33.90959548950195
              ],
              [
                129.72071838378906,
                33.90959548950195
              ],
              [
                129.31298828125,
                32.28282165527344
              ],
              [
                128.91358947753906,
                30.657394409179688
              ],
              [
                128.91358947753906,
                30.657394409179688
              ],
              [
                127.3409423828125,
                30.851329803466797
              ],
              [
                125.39289093017578,
                31.06423568725586
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
        [[[125.39289093017578, 31.06423568725586],
          [125.72966003417969, 32.69270324707031],
          [126.0684814453125, 34.31864929199219],
          [126.0684814453125, 34.31864929199219],
          [128.0899200439453, 34.10609817504883],
          [129.72071838378906, 33.90959548950195],
          [129.72071838378906, 33.90959548950195],
          [129.31298828125, 32.28282165527344],
          [128.91358947753906, 30.657394409179688],
          [128.91358947753906, 30.657394409179688],
          [127.3409423828125, 30.851329803466797],
          [125.39289093017578, 31.06423568725586]]]),
    centre = ui.import && ui.import("centre", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                132.15565490722656,
                36.12451934814453
              ],
              [
                132.63731384277344,
                37.78395462036133
              ],
              [
                133.1337127685547,
                39.439674377441406
              ],
              [
                133.1337127685547,
                39.439674377441406
              ],
              [
                135.0415802001953,
                39.154422760009766
              ],
              [
                136.98526000976562,
                38.829158782958984
              ],
              [
                136.98526000976562,
                38.829158782958984
              ],
              [
                136.40394592285156,
                37.18567657470703
              ],
              [
                135.84503173828125,
                35.54169845581055
              ],
              [
                135.84503173828125,
                35.54169845581055
              ],
              [
                133.97930908203125,
                35.85159683227539
              ],
              [
                132.15565490722656,
                36.12451934814453
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
        [[[132.15565490722656, 36.12451934814453],
          [132.63731384277344, 37.78395462036133],
          [133.1337127685547, 39.439674377441406],
          [133.1337127685547, 39.439674377441406],
          [135.0415802001953, 39.154422760009766],
          [136.98526000976562, 38.829158782958984],
          [136.98526000976562, 38.829158782958984],
          [136.40394592285156, 37.18567657470703],
          [135.84503173828125, 35.54169845581055],
          [135.84503173828125, 35.54169845581055],
          [133.97930908203125, 35.85159683227539],
          [132.15565490722656, 36.12451934814453]]]),
    visParams = ui.import && ui.import("visParams", "imageVisParam", {
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
                135,
                45
              ],
              [
                135,
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
          [135, 45],
          [135, 30]]], null, false);
// Center the region of interest.
Map.centerObject(region);
Map.drawingTools().layers().get(2).setShown(false);
Map.setOptions('SATELLITE');
// https://code.earthengine.google.com/?accept_repo=users/mdewitt/eeus-tokyo-2019
// (D) Fancy controls/05 Drawing a zoom box
var flagNames = ee.List([
    'DATAMISS', 'LAND', 'ATMFAIL',
    'CLDICE', 'CLDAFFCTD', 'STRAYLIGHT',
    'HIGLINT', 'MODGLINT', 'HISOLZ',
    'HITAUA', 'NEGNLW', 'SPARE',
    'SHALLOW', 'ITERFAILCDOM', 'CHLWARN',
    'SPARE']);
// AQUA Python reproject
var asset = 'projects/ee-eutrophicationwatch/assets/OCEANDATA/L2/Test/';
var chl = ee.Image(asset + 'GC1SG1_202205030152F05810_L2SG_IWPRQ_3000_py')
    .select('CHLA')
    .multiply(1e-06).add(0.001).log10();
var flags = ee.Image(asset + 'GC1SG1_202205030152F05810_L2SG_IWPRQ_3000_py')
    .select('QA_flag');
Map.addLayer(chl, visParams, 'SGLI', true);
function toList(data, varname) {
    return data.toList(data.size()
    ).map(function (f) {
        return ee.Feature(f).get(varname);
    });
}
function bitFlags(image, poly, varname) {
    var data = toList(image.sample({
        region: poly,
        scale: image.projection().nominalScale(),
        dropNulls: true
    }), varname);
    // print(data.size());
    return ee.List.sequence(13, 15).map(
        function (bit) {
            return data.map(function (px) {
                var bshft = ee.Number(1).leftShift(ee.Number(bit).toInt());
                return bshft.bitwiseAnd(px).gt(0);
            }).flatten().reduce(ee.Reducer.sum());
        });
}
var cpx = bitFlags(flags, centre, 'QA_flag');
var epx = bitFlags(flags, edge, 'QA_flag');
// print(cpx, epx);
// computation time very slow.
// Keep the once computed values for each bbox
var csz = 2037359;
var centreHist = ee.List([
  0,
9072, 
2865,
8515,
6694,
25588,
0,
1963262,
0,
4777,
1391373,
0,
22133,
3054,
21,
0
]);
// computed edge flags
var esz = 1979782;
var edgeHist = ee.List([
0,
44419,
10602,
203956,
111420,
127643,
0,
0,
0,
42624,
88857,
0,
292372,
13720,
194,
0
]);
function getBar(data, labels, title, n) {
    var perc = data.map(function (val) { return ee.Number(val).divide(n) });
    // print(n, perc, data);
    return ui.Chart.array.values({ array: perc, axis: 0, xLabels: labels })
        .setChartType('ColumnChart').setOptions({
            title: title,
            hAxis: {
                orientation: 'horizontal',
                viewWindow: { min: 0, max: 15 },
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
panel.add(ui.Label("SGLI/GCOM-C Remapped Swath", { fontSize: '20px', fontWeight: 'bold' }));
ui.root.insert(0, panel);
var chartPanel = ui.Panel({ style: { stretch: "horizontal" } });
panel.add(chartPanel);
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
    style: { margin: '0 0 0 8px' }
}
).setUrl('https://doi.org/10.3390/rs14194906');
panel.add(instructions.add(text).add(url));
// Parameterize the data.
var pivots = [
    { geometry: centre, label: 'Centre', hist: centreHist, n: csz, min: -2, max: 1 },
    { geometry: edge, label: 'Edge', hist: edgeHist, n: esz, min: -2, max: 1 }
];
// Print a chart for each region.
pivots.forEach(function (pivot) {
    var title = 'SGLI/GCOM-C CHLA (' + pivot.label + '-2R)';
    var hist = getHist(chl, pivot.geometry, 300, title, pivot.min, pivot.max);
    hist.style().set("shown", false);
    title = 'SGLI/GCOM-C QA_flag (' + pivot.label + '-2R)';
    var bar = getBar(pivot.hist, flagNames, title, pivot.n);
    bar.style().set("shown", false);
    chartPanel.add(hist);
    chartPanel.add(bar);
});
// update charts
var d = Map.drawingTools();
d.setShown(false);
d.onSelect(function (geo, layer, drawTools) {
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