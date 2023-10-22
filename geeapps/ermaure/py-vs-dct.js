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
    region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                120,
                30
              ],
              [
                120,
                45
              ],
              [
                140,
                45
              ],
              [
                140,
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
        [[[120, 30],
          [120, 45],
          [140, 45],
          [140, 30]]], null, false);
// Center the region of interest.
Map.centerObject(region);
Map.drawingTools().layers().get(2).setShown(false);
Map.setOptions('SATELLITE');
// Center the region of interest.
// var edge = ee.FeatureCollection("users/ermaure/L2Reproject/sgli_edge").geometry();
var asset = 'projects/ee-eutrophicationwatch/assets/OCEANDATA/L2/Test/';
// SGLI Python reproject
var sgli_py = ee.Image(asset + 'GC1SG1_202205030152F05810_L2SG_IWPRQ_3000_py')
    .select('CHLA')
    .multiply(1e-06).add(0.001).log10();
// Reproj Tool JAXA, CHL
var sgli_dct = ee.Image(asset + 'GC1SG1_202205030152F05810_L2SG_IWPRQ_3000_dct')
    .select('CHLA')
    .multiply(1e-06).add(0.001).log10();
var diff = sgli_py.subtract(sgli_dct);
// Create a dictionary of labels and visualizations.
var vis = {
    'PY': { min: -2, max: 2, palette: ["blue", "cyan", "green", "yellow", "red"] },
    'DCT': { min: -2, max: 2, palette: ["blue", "cyan", "green", "yellow", "red"] },
    'PY-DCT': { min: -0.1, max: 0.1, palette: ["blue", "white", "red"] }
};
var hist = [
    { label: 'PY', image: sgli_py, min: -2, max: 1 },
    { label: 'DCT', image: sgli_dct, min: -2, max: 1 },
    { label: 'PY-DCT', image: diff, min: -0.25, max: 0.25 }
];
// Parameterize the data.
var pivots = [
    { geometry: centre, label: 'Centre' },
    { geometry: edge, label: 'Edge' }
];
var panel = ui.Panel({ style: { width: '300px' } });
panel.add(ui.Label("Reprojected: PY vs. DCT", { fontSize: '20px', fontWeight: 'bold' }));
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
    "Python (PY) versus JAXA's Data Conversion Tool remapped data. " +
    "Click a shape on the map to show the CHL histograms of each map for that shape. " +
    "Click a shape again to hide its chart. The histographs reproduce the results of Figure 4 in "
);
/* top | right | bottom | left */
var url = ui.Label({value:
    'Maúre, E.d.R.; Ilyushchenko, S.; Terauchi, G. A Simple Procedure to Preprocess and Ingest ' +
    'Level-2 Ocean Color Data into Google Earth Engine. Remote Sens. 2022, 14, 4906.',
    style: textStyle}
    ).setUrl('https://doi.org/10.3390/rs14194906');
panel.add(instructions.add(text).add(url));
// Print a chart for each region.
pivots.forEach(function (pivot) {
    hist.forEach(function (item) {
        var chart = ui.Chart.image.histogram(item.image, pivot.geometry, 250, 1000);
        chart.setOptions({
            title: 'SGLI CHL, (' + item.label + ' - ' + pivot.label + ')',
            hAxis: {
                titleTextStyle: { italic: false, bold: true },
                viewWindow: { min: item.min, max: item.max }
            },
            vAxis: { title: 'Count', titleTextStyle: { italic: false, bold: true } },
            colors: ['cf513e']
        });
        chart.style().set("shown", false);
        chartPanel.add(chart);
    });
});
// add four panels
var maps = [];
var i = 2;
hist.forEach(function (image) {
    // Create and set up each map.
    var map = ui.Map();
    if (image.label == 'PY') {
        Map.addLayer(image.image, vis[image.label]);
        Map.setControlVisibility(false);
        Map.centerObject(region);
        Map.add(ui.Label(image.label));
    } else {
        map.addLayer(image.image, vis[image.label]);
        map.setControlVisibility(false);
        map.centerObject(region);
        map.add(ui.Label(image.label));
        map.setOptions('SATELLITE');
        ui.root.insert(i, map);
        // Add the maps to the list.
        i += 1;
        maps.push(map);
    }
});
// Link the maps.
maps.push(ui.root.widgets().get(1));
var linker = ui.Map.Linker(maps);
// update charts
var d = Map.drawingTools();
d.setShown(false);
d.onSelect(function (geo, layer, drawTools) {
    var shownCount = 0;
    var j = 0;
    pivots.forEach(function (p) {
        hist.forEach(function (item) {
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