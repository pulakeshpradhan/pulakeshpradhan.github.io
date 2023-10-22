var region = ui.import && ui.import("region", "table", {
      "id": "users/atstahl/HUC8_outline"
    }) || ee.FeatureCollection("users/atstahl/HUC8_outline"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.03680000081658363,
        "max": 0.3181999921798706,
        "gamma": 1.945
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.03680000081658363,"max":0.3181999921798706,"gamma":1.945},
    imageCIRParam = ui.import && ui.import("imageCIRParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B3"
        ],
        "min": 0.017999999225139618,
        "max": 0.396699994802475,
        "gamma": 1.945
      }
    }) || {"opacity":1,"bands":["B8","B4","B3"],"min":0.017999999225139618,"max":0.396699994802475,"gamma":1.945},
    ROI = ui.import && ui.import("ROI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -125.77545166015625,
                49.977674542016295
              ],
              [
                -125.77545166015625,
                41.63797115964638
              ],
              [
                -104.02252197265625,
                41.63797115964638
              ],
              [
                -104.02252197265625,
                49.977674542016295
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
        [[[-125.77545166015625, 49.977674542016295],
          [-125.77545166015625, 41.63797115964638],
          [-104.02252197265625, 41.63797115964638],
          [-104.02252197265625, 49.977674542016295]]], null, false),
    counties = ui.import && ui.import("counties", "table", {
      "id": "TIGER/2018/Counties"
    }) || ee.FeatureCollection("TIGER/2018/Counties"),
    states = ui.import && ui.import("states", "table", {
      "id": "TIGER/2018/States"
    }) || ee.FeatureCollection("TIGER/2018/States"),
    padus = ui.import && ui.import("padus", "table", {
      "id": "USGS/GAP/PAD-US/v20/fee"
    }) || ee.FeatureCollection("USGS/GAP/PAD-US/v20/fee"),
    RGBVisParam22 = ui.import && ui.import("RGBVisParam22", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.1242000013589859,
        "max": 0.46149998903274536,
        "gamma": 1.945
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.1242000013589859,"max":0.46149998903274536,"gamma":1.945},
    CIRVisParam22 = ui.import && ui.import("CIRVisParam22", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B3"
        ],
        "min": 0.11079999804496765,
        "max": 0.6188499927520752,
        "gamma": 1.945
      }
    }) || {"opacity":1,"bands":["B8","B4","B3"],"min":0.11079999804496765,"max":0.6188499927520752,"gamma":1.945};
//This script finds and displays available Sentinel imagery for the inland NW
// *** The lines below set up the map. ***
    // Center map.
    Map.setCenter(-117.657, 47.218, 7);
// ***Query, mask clouds, composite, clip Sentinel imagery. ***
      // Function to mask clouds using the Sentinel-2 QA band.
      function maskS2clouds(image) {
        var qa = image.select('QA60');
        // Bits 10 and 11 are clouds and cirrus, respectively.
        var cloudBitMask = 1 << 10;
        var cirrusBitMask = 1 << 11;
        // Both flags should be set to zero, indicating clear conditions.
        var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
                   qa.bitwiseAnd(cirrusBitMask).eq(0));
        // Return the masked and scaled data, without the QA bands.
        return image.updateMask(mask).divide(10000)
            .select("B.*")
            .copyProperties(image, ["system:time_start"]);
      }
// Map the cloud function over time period, create median composites, clip to ROI.
  // "Late Season" = 08/15 to 10/01
var collection = ee.ImageCollection('COPERNICUS/S2').filter(ee.Filter.bounds(ROI))
    // Pre-filter to get less cloudy granules, apply cloud mask.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds);
var sent16 = collection.filterDate('2016-08-15', '2016-10-01').median().clip(ROI);
var sent17 = collection.filterDate('2017-08-15', '2017-10-01').median().clip(ROI);
var sent18 = collection.filterDate('2018-08-15', '2018-10-01').median().clip(ROI);
var sent19 = collection.filterDate('2019-08-15', '2019-10-01').median().clip(ROI);
var sent20 = collection.filterDate('2020-08-15', '2020-10-01').median().clip(ROI);
var sent21 = collection.filterDate('2021-08-15', '2021-10-01').median().clip(ROI);
var sent22 = collection.filterDate('2022-08-15', '2022-10-01').median().clip(ROI);
Map.addLayer(sent16, imageVisParam, "Sentinel 2016 RGB", false);
Map.addLayer(sent16, imageCIRParam, "Sentinel 2016 CIR", false);
Map.addLayer(sent17, imageVisParam, "Sentinel 2017 RGB", false);
Map.addLayer(sent17, imageCIRParam, "Sentinel 2017 CIR", false);
Map.addLayer(sent18, imageVisParam, "Sentinel 2018 RGB", false);
Map.addLayer(sent18, imageCIRParam, "Sentinel 2018 CIR", false);
Map.addLayer(sent19, imageVisParam, "Sentinel 2019 RGB", false);
Map.addLayer(sent19, imageCIRParam, "Sentinel 2019 CIR", false);
Map.addLayer(sent20, imageVisParam, "Sentinel 2020 RGB", false);
Map.addLayer(sent20, imageCIRParam, "Sentinel 2020 CIR", false);
Map.addLayer(sent21, imageVisParam, "Sentinel 2021 RGB", false);
Map.addLayer(sent21, imageCIRParam, "Sentinel 2021 CIR", false);
Map.addLayer(sent22, RGBVisParam22, "Sentinel 2022 RGB");
Map.addLayer(sent22, CIRVisParam22, "Sentinel 2022 CIR", false);
//Map.addLayer(table2, {}, 'PAD-US');
  //Create county & state outlines and display.
  var empty = ee.Image().byte();
  var countyOutlines = empty.paint({
    featureCollection: counties,
    color: 1,
    width: 1
  });
   var stateOutlines = empty.paint({
    featureCollection: states,
    color: 1,
    width: 2
  });
   var PAOutlines = empty.paint({
    featureCollection: padus,
    color: 1,
    width: 1
  });
  var NWcounties = countyOutlines.clip(ROI);
  var NWstates = stateOutlines.clip(ROI);
  var PADUS = PAOutlines.clip(ROI);
  Map.addLayer(NWcounties, {}, "US Counties (Census 2018)");
  Map.addLayer(NWstates, {}, "US States (Census 2018)");
//  Map.addLayer(PADUS, {}, "Land management (USGS GAP 2018)");
// set position of panel for legend
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: '8/15-9/30 Sentinel-2 composites',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
Map.add(legend);