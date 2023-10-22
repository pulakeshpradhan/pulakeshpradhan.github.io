var mod13 = ui.import && ui.import("mod13", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    x = ui.import && ui.import("x", "table", {
      "id": "projects/ee-andolalaina1103/assets/sava"
    }) || ee.FeatureCollection("projects/ee-andolalaina1103/assets/sava"),
    y = ui.import && ui.import("y", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                49.0846639048882,
                -11.677954038125602
              ],
              [
                46.6587290201223,
                -15.160275820970886
              ],
              [
                44.31898990247144,
                -16.10972646922779
              ],
              [
                43.7013631236382,
                -17.459562450949278
              ],
              [
                44.27731164779767,
                -19.741606255510376
              ],
              [
                43.41300803505174,
                -21.120346969451848
              ],
              [
                42.9762654673882,
                -22.45561113846242
              ],
              [
                43.24450422637382,
                -22.966281887132638
              ],
              [
                43.575662235849656,
                -23.446825486357415
              ],
              [
                43.53512895697881,
                -24.309165088823132
              ],
              [
                44.0309529673882,
                -25.228698631972907
              ],
              [
                44.668687857692625,
                -25.4524826424136
              ],
              [
                45.39455264060634,
                -25.792205573632415
              ],
              [
                46.23054034293714,
                -25.38466243055097
              ],
              [
                47.2829060923882,
                -25.367756281635568
              ],
              [
                50.8424764048882,
                -15.139902933074868
              ],
              [
                49.7438435923882,
                -11.97903877020524
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[49.0846639048882, -11.677954038125602],
                  [46.6587290201223, -15.160275820970886],
                  [44.31898990247144, -16.10972646922779],
                  [43.7013631236382, -17.459562450949278],
                  [44.27731164779767, -19.741606255510376],
                  [43.41300803505174, -21.120346969451848],
                  [42.9762654673882, -22.45561113846242],
                  [43.24450422637382, -22.966281887132638],
                  [43.575662235849656, -23.446825486357415],
                  [43.53512895697881, -24.309165088823132],
                  [44.0309529673882, -25.228698631972907],
                  [44.668687857692625, -25.4524826424136],
                  [45.39455264060634, -25.792205573632415],
                  [46.23054034293714, -25.38466243055097],
                  [47.2829060923882, -25.367756281635568],
                  [50.8424764048882, -15.139902933074868],
                  [49.7438435923882, -11.97903877020524]]]),
            {
              "system:index": "0"
            })]),
    roi = ui.import && ui.import("roi", "table", {
      "id": "projects/ee-andolalaina1103/assets/limite_regions_mada"
    }) || ee.FeatureCollection("projects/ee-andolalaina1103/assets/limite_regions_mada");
// UI
// define sidebar
Map.centerObject(roi, 4)
var sidebar = ui.Panel({style: {width:'33.333%', padding: '5px'}});
ui.root.insert(0,sidebar);
// define roi selection {
var roiSelectTitle = ui.Label({value: 'Séléctionner une région :'})
var roiSelectValues = roi.aggregate_array('CODREGION')
var roiSelectItems = roi.aggregate_array('NOM_REGION')
var roiSelectChange = function() {
var resultPanel = ui.Panel()
var computeResult = function() {
Map.clear()
resultPanel.clear()
var _roi = roi.filter(ee.Filter.eq('NOM_REGION', roiSelectInput.getValue()))
// Add ROI {
Map.addLayer(_roi)
// }
// Add observation year as an image property. {
var mod13Summer = mod13.filter(ee.Filter.calendarRange(4, 10, 'month'))
  .filter(ee.Filter.calendarRange(2000, 2020, 'year'))
  .map(function(img) {
    return img.set('year', img.date().get('year'));
  });
// }
// Generate lists of images from the year using a join. {
var mod13SummerAnnualJoin = ee.Join.saveAll('same_year').apply({
  primary: mod13Summer.distinct('year'),
  secondary: mod13Summer,
  condition: ee.Filter.equals({leftField: 'year', rightField: 'year'})
});
// }
// Calculate annual max EVI composite images from the "same year" join lists.
// Return an image with two bands for use in time series slope calculation;
// year as band 1, max EVI as band 2. {
var summerStats = ee.ImageCollection(mod13SummerAnnualJoin.map(function(img) {
  var year = img.get('year');
  var yearCol = ee.ImageCollection.fromImages(img.get('same_year'));
  var max = yearCol.select('EVI').max();
  var min = yearCol.select('EVI').min();
  var yr = ee.Image.constant(ee.Number(year)).toShort();
  return ee.Image.cat(yr, max, min).rename(['year', 'max', 'min']).set('year', year);
}));
// }
// Calculate time series slope using sensSlope(). {
var sens = summerStats.select(['year', 'max']).reduce(ee.Reducer.sensSlope());
// }
// Define a function to calculate a histogram of slope values to be calculated
// for each park; defining a custom histogram function instead of using
// ui.Chart.image.histogram because it does not allow baseline to be set as 0,
// which is important when evaluating positive and negative slope frequency. {
function getHistogram(sensImg, geometry, title) {
  // Calculate histogram as an ee.Array table.
  var hist = sensImg.select('slope').reduceRegion({
    reducer: ee.Reducer.autoHistogram(),
    geometry: geometry,
    scale: 250,
    maxPixels: 1e13,
  });
  // Get the array and extract the bin column and pixel count columns.
  var histArray = ee.Array(hist.get('slope'));
  var maskArray = histArray.slice(1, 1, null).gt(10);
  var binBottom = histArray.slice(1, 0, 1).mask(maskArray);
  var nPixels = histArray.slice(1, 1, null).mask(maskArray);
  // Chart the two arrays using the `ui.Chart.array.values` function.
  var histColumnFromArray =
    ui.Chart.array.values({array: nPixels, axis: 0, xLabels: binBottom})
      .setChartType('LineChart')
      .setOptions({
        title: title + ', Histogramme de la condition des végétaux',
        hAxis: {title: 'Slope'},
        vAxis: {title: 'Pixel count'},
        pointSize: 0,
        lineSize: 2,
        colors: ['1b7837'],
        legend: {position: 'none'}
      });
  return histColumnFromArray;
}
// }
// Get the slope histogram charts and print them to the console per park. {
// print(getHistogram(sens, _roi, 'SAVA'));
resultPanel.add(ui.Label('Interprétation', {fontSize: '18px', fontWeight: 'bold'}))
resultPanel.add(ui.Label("L'abscisse représente la variation des végétaux tandis que l'ordonnée représente le nombre de pixel enregistré dans la région"))
resultPanel.add(ui.Label("Si la variation est négative, les végétaux ont tendance à s'ajaunir. Inversement, ils ont tendance à virer au vert si la tendance est positive."))
resultPanel.add(ui.Label("Nous allons représenter cette variation sur la carte."))
resultPanel.add(
  ui.Panel(getHistogram(sens, _roi, roiSelectInput.getValue()))
  )
// }
// Infer pixel-wise vegetation condition based on sign of the slope. {
var cond = ee.Image.cat(sens.select('slope').gt(0).rename('greening'),
                        sens.select('slope').lt(0).rename('browning'));
// }
// Calculate area under greening and browning {
var npsRes = cond.multiply(ee.Image.pixelArea())
                .reduceRegions(_roi, ee.Reducer.sum(), 250);
// }
// Format results of the greening and browning for use in a table; convert sq m
// to sq km and calculate fraction of each; add as feature properties. {
npsRes = npsRes.map(function(feature) {
  var browningSqM = feature.getNumber('browning');
  var greeningSqM = feature.getNumber('greening');
  var forestSqM = feature.area(1);
  return feature.set({
    // 'Name': 'SAVA',
    'Virement au jaune en km2': browningSqM.divide(1e6),
    // 'Browning percentage': forestSqM,
    'Virement au jaune en pourcentage': browningSqM.divide(forestSqM).multiply(1e2),
    'Virement au vert en km2': greeningSqM.divide(1e6),
    'Virement au vert en pourcentage': greeningSqM.divide(forestSqM).multiply(1e2),
  });
});
//}
// Display area summary of vegetation condition as a table "chart". {
// print(ui.Chart.feature.byFeature(npsRes.select(['NOM_REGION', 'Browning sq km',
//     'Browning percentage', 'Greening sq km', 'Greening percentage']), 'NOM_REGION')
//   .setChartType('Table'));
resultPanel.add(
  ui.Panel(ui.Chart.feature.byFeature(npsRes.select(['NOM_REGION', 'Virement au jaune en km2',
    'Virement au jaune en pourcentage', 'Virement au vert en km2', 'Virement au vert en pourcentage']), 'NOM_REGION')
  .setChartType('Table'))
  )
// }
// Set visualisation parameters for greening and browning areas; display to map. {
// Prepare to display vegetation condition to the map; set map display options.
Map.setOptions('SATELLITE');
Map.centerObject(_roi, 4);
var visParams = {
  "opacity":1,
  "bands":["slope"],
  "min":-55,
  "max":55,
  "palette" : ["8c510a","d8b365","f6e8c3","f5f5f5","d9f0d3","7fbf7b","1b7837"]
};
Map.addLayer(sens.clipToCollection(_roi), visParams, 'Sen\'s slope');
// }
// Plot trend in EVI data by national park and year. {
// print(ui.Chart.image
//           .seriesByRegion({
//             imageCollection: summerStats,
//             regions: _roi,
//             reducer: ee.Reducer.median(),
//             band: 'max',
//             scale: 250,
//             xProperty: 'year',
//             seriesProperty: 'NOM_REGION'
//           })
//           .setChartType('ScatterChart')
//           .setOptions({
//             title: 'Greening/browning trend in SAVA',
//             vAxis: {title: 'Median of max. summer EVI'},
//             hAxis: {title: 'Year', format: '####'},
//             lineWidth: 2,
//             pointSize: 0,
//             series: {0: {color: 'ff0000'}, 1: {color: '0000ff'}}
//           }));
resultPanel.add(ui.Label('Interprétation de la courbe', {fontSize: '18px', fontWeight: 'bold'}))
resultPanel.add(ui.Label("Lorsque la courbe descend, les végétaux ont tendance à s'ajaunir durant l'année correspondante. Inversement, ils ont tendance à virer au vert si la courbe monte."))
resultPanel.add(ui.Label("EVI : Enhanced Vegetation Index (Index de végétation)"))
resultPanel.add(
  ui.Panel(
    ui.Chart.image
          .seriesByRegion({
            imageCollection: summerStats,
            regions: _roi,
            reducer: ee.Reducer.median(),
            band: 'max',
            scale: 250,
            xProperty: 'year',
            seriesProperty: 'NOM_REGION'
          })
          .setChartType('ScatterChart')
          .setOptions({
            title: 'Tendance du virement au vert/jaune',
            vAxis: {title: 'Mediane de la valeur max de EVI'},
            hAxis: {title: 'Année', format: '####'},
            lineWidth: 2,
            pointSize: 0,
            series: {0: {color: 'ff0000'}, 1: {color: '0000ff'}}
          }))
  )
// }
// LEGENDS {
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Facteur de changement',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette = ['8c510a', 'd8b365', 'f6e8c3', 'f5f5f5', 'd9f0d3', '7fbf7b', '1b7837'];
// name of the legend
var names = ['-54.8', '-36.7', '-18.4', '0', '18.2', '36.5', '54.8'];
// Add color and and names
for (var i = 6; i >= 0; i--) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// }
}
var computeButton = ui.Button({
  label : 'Générer analyses', 
  onClick : computeResult
})
sidebar.add(computeButton)
sidebar.add(resultPanel)
}
var roiSelectInput = ui.Select({
  items: roiSelectItems.getInfo(),
  placeholder: 'Région à analyser',
  onChange: roiSelectChange
})
sidebar.add(ui.Label('Etude de la variation de la végétation à Madagascar', {fontSize: '24px'}))
sidebar.add(ui.Label("Cette étude analyse la variation des végétaux durant la saison d'hiver, dans une période allant de l'année 2000 à l'année 2020."))
sidebar.add(roiSelectTitle).add(roiSelectInput)