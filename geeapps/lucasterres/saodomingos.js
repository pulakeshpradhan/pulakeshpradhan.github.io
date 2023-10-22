var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -9.310319684086902,
                39.32921303799571
              ],
              [
                -9.310319684086902,
                39.328250354454724
              ],
              [
                -9.309246800480945,
                39.328250354454724
              ],
              [
                -9.309246800480945,
                39.32921303799571
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -9.313023350773914,
                39.33097239091411
              ],
              [
                -9.313023350773914,
                39.330109317655115
              ],
              [
                -9.31186463647948,
                39.330109317655115
              ],
              [
                -9.31186463647948,
                39.33097239091411
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -9.307573102055652,
                39.32692249334163
              ],
              [
                -9.307573102055652,
                39.326059370097724
              ],
              [
                -9.306843541203602,
                39.326059370097724
              ],
              [
                -9.306843541203602,
                39.32692249334163
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -9.304783604680164,
                39.32380192048241
              ],
              [
                -9.304783604680164,
                39.32317114947792
              ],
              [
                -9.303710721074207,
                39.32317114947792
              ],
              [
                -9.303710721074207,
                39.32380192048241
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -9.302294514714344,
                39.32247397490739
              ],
              [
                -9.302294514714344,
                39.32174359409451
              ],
              [
                -9.301007054387195,
                39.32174359409451
              ],
              [
                -9.301007054387195,
                39.32247397490739
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -9.315319321690662,
                39.33274829660777
              ],
              [
                -9.315319321690662,
                39.33173586991716
              ],
              [
                -9.31411769205199,
                39.33173586991716
              ],
              [
                -9.31411769205199,
                39.33274829660777
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.MultiPolygon(
        [[[[-9.310319684086902, 39.32921303799571],
           [-9.310319684086902, 39.328250354454724],
           [-9.309246800480945, 39.328250354454724],
           [-9.309246800480945, 39.32921303799571]]],
         [[[-9.313023350773914, 39.33097239091411],
           [-9.313023350773914, 39.330109317655115],
           [-9.31186463647948, 39.330109317655115],
           [-9.31186463647948, 39.33097239091411]]],
         [[[-9.307573102055652, 39.32692249334163],
           [-9.307573102055652, 39.326059370097724],
           [-9.306843541203602, 39.326059370097724],
           [-9.306843541203602, 39.32692249334163]]],
         [[[-9.304783604680164, 39.32380192048241],
           [-9.304783604680164, 39.32317114947792],
           [-9.303710721074207, 39.32317114947792],
           [-9.303710721074207, 39.32380192048241]]],
         [[[-9.302294514714344, 39.32247397490739],
           [-9.302294514714344, 39.32174359409451],
           [-9.301007054387195, 39.32174359409451],
           [-9.301007054387195, 39.32247397490739]]],
         [[[-9.315319321690662, 39.33274829660777],
           [-9.315319321690662, 39.33173586991716],
           [-9.31411769205199, 39.33173586991716],
           [-9.31411769205199, 39.33274829660777]]]], null, false),
    visu = ui.import && ui.import("visu", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -9.32036187463866,
                39.33565271805414
              ],
              [
                -9.32036187463866,
                39.31706233599169
              ],
              [
                -9.29538514429198,
                39.31706233599169
              ],
              [
                -9.29538514429198,
                39.33565271805414
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-9.32036187463866, 39.33565271805414],
          [-9.32036187463866, 39.31706233599169],
          [-9.29538514429198, 39.31706233599169],
          [-9.29538514429198, 39.33565271805414]]], null, false);
//banda_ndci
Map.centerObject(visu, 15);
//Map.setCenter(51.65, 0.47, 13)
function ndci(image) {
  return image.addBands(
    image.expression("(r-g)/(r+g)", {
      g: image.select("B4"),
      r: image.select("B5")
    })
  );
}
function phyco(image) {
  return image.addBands(
    image.expression("(((1/r)-(0.4/g)-(0.6/vr))/re)", {
      r: image.select("B4"),
      vr: image.select("B5"),
      g: image.select("B3"),
      re: image.select("B6")
    })
  );
}
// clorophill
function clorofila(image) {
  var image_2 = image; //.divide(10000);
  return image.addBands(
    image_2
      .expression("194.325/3 * (ndci*ndci) + 86.115/3 * ndci + 14.039/3", {
        ndci: image_2.select("B5_1")
      })
      .rename("clorofila")
  );
}
// phycocyanin
function phycocyanin(image) {
  var image_3 = image; //.divide(10000);
  return image.addBands(
    image_3
      .expression("462.5/5 * phyco + 22.598/5", {
        phyco: image_3.select("B5_1")
      })
      .rename("phycoc")
  );
}
// phycocyanin
var addNDWI = function(image) {
  var ndwi = image.normalizedDifference(['B3', 'B5'])
  .rename('ndwi')
  .copyProperties(image,['system:time_start']);
  return image.addBands(ndwi);
};
//PC = 462.5 *fbC + 22.598
//(((1/B4)-(0.4/B3)-(0.6/B5))/B6)
// remove clounds
function maskS2clouds(image) {
  var qa = image.select("QA60");
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa
    .bitwiseAnd(cloudBitMask)
    .eq(0)
    .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
var subset = Map.getBounds(true)
var Start_period = ee.Date('2019-01-01')
var End_period = ee.Date(new Date().getTime())
// data_set
var s2 = ee
  .ImageCollection("COPERNICUS/S2_SR")
  .filterDate("2019-01-01", "2019-12-30")
  .filterBounds(subset)
  .filterDate(Start_period, End_period)
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1))
  .map(maskS2clouds)
  .map(ndci)
  .map(clorofila)
  .map(addNDWI)
  .map(phycocyanin);
var clorovis = {
  min: 0,
  max: 50,
  palette: ["black","blue", "LightBlue", "cyan", "green", "yellow"],
  bands: ["clorofila"]
};
var s2filtro = ee.Image(s2.mean());
var s2clip = s2filtro.clip(visu);
var mndwi = s2clip.normalizedDifference(["B3", "B11"]).rename("mndwi");
//Map.addLayer(
//  mndwi.clip(visu),
//  { min: -1, max: 1, palette: ["brown", "black", "blue"] },
// "Modified Normalized Difference Water Index MNDWI",
//  false
//);
// Change this threshold to allow more or less water in mask
var ndwiThreshold = 0.1;
var water = mndwi.gt(ndwiThreshold);
//Map.addLayer(
//  water.clip(visu),
//  { min: 0, max: 1, palette: ["black", "blue"] },
//  "water",
//  true
//);
var NIRredmodelmask = s2clip.updateMask(water);
var lastimage = NIRredmodelmask.select(['clorofila']);
//Map.addLayer(lastimage,clorovis);
var grafico_1 = ui.Chart.image.seriesByRegion(
  s2,
  geometry,
  ee.Reducer.mean(),
  "clorofila",
  10
);
var grafico_2 = ui.Chart.image.seriesByRegion(
  s2,
  geometry,
  ee.Reducer.mean(),
  "phycoc",
  10
);
var grafico_3 = ui.Chart.image.seriesByRegion(
  s2,
  visu,
  ee.Reducer.mean(),
  "ndwi",
  10
);
var panel = ui
  .Panel({
    style: {
      position: "top-right",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "306px"
    }
  })
  .add(grafico_2)
  .add(grafico_1)
  .add(grafico_3);
ui.root.add(panel);
// Set chart style properties.
var chartStyle = {
  title: "Chlorophylll-a",
  hAxis: {
    title: "Date",
    titleTextStyle: { italic: false, bold: true },
    gridlines: { color: "FFFFFF" }
  },
  vAxis: {
    title: "Chlorophylll-a (um/l)",
    titleTextStyle: { italic: false, bold: true },
    gridlines: { color: "FFFFFF" },
    format: "short",
    baselineColor: "FFFFFF"
  },
  series: {
    0: { lineWidth: 1, color: "Green", pointSize: 2 }
  },
  chartArea: { backgroundColor: "EBEBEB" }
};
// Set chart style properties.
var chartStyle2 = {
  title: "Phycocyanin",
  hAxis: {
    title: "Date",
    titleTextStyle: { italic: false, bold: true },
    gridlines: { color: "FFFFFF" }
  },
  vAxis: {
    title: "Phycocyanin(um/l)",
    titleTextStyle: { italic: false, bold: true },
    gridlines: { color: "FFFFFF" },
    format: "short",
    baselineColor: "FFFFFF"
  },
  series: {
    0: { lineWidth: 1, color: "DarkBlue", pointSize: 2 }
  },
  chartArea: { backgroundColor: "EBEBEB" }
};
var chartStyle3 = {
  title: "Water NDWI",
  hAxis: {
    title: "Date",
    titleTextStyle: { italic: false, bold: true },
    gridlines: { color: "FFFFFF" }
  },
  vAxis: {
    title: "NDWI Index",
    titleTextStyle: { italic: false, bold: true },
    gridlines: { color: "FFFFFF" },
    format: "short",
    baselineColor: "FFFFFF"
  },
  series: {
    0: { lineWidth: 1, color: "LightBlue", pointSize: 2 }
  },
  chartArea: { backgroundColor: "EBEBEB" }
};
// Apply custom style properties to the chart.
grafico_1.setOptions(chartStyle);
grafico_2.setOptions(chartStyle2);
grafico_3.setOptions(chartStyle3);
//Map.addLayer(s2, visualization, 'test');
//Map.addLayer(NIRredmodelmask, visualization, 'NIRredmodelmask');
print(s2);
var visualization = {
  min: 0.0,
  max: 1500,
  bands: ["B4", "B3", "B2"]
};
var visualization2 = {
  min: 0.0,
  max: 50,
  palette: ["black","blue", "LightBlue", "cyan", "green", "yellow", "red"],
};
function createColorBar(titleText, palette, min, max) {
  // Legend Title
  var title = ui.Label({
    value: titleText,
    style: { fontWeight: "bold", textAlign: "center", stretch: "horizontal" }
  });
  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: "200x20",
      format: "png",
      min: 0,
      max: 1,
      palette: ["black", "blue", "LightBlue", "cyan", "green", "yellow", "red"]
    },
    style: { stretch: "horizontal", margin: "8px 8px", maxHeight: "40px" }
  });
  // Legend Labels
  var labels = ui.Panel({
    widgets: [
      ui.Label(min, {
        margin: "4px 10px",
        textAlign: "left",
        stretch: "horizontal"
      }),
      ui.Label((min + max) / 2, {
        margin: "4px 20px",
        textAlign: "center",
        stretch: "horizontal"
      }),
      ui.Label(max, {
        margin: "4px 10px",
        textAlign: "right",
        stretch: "horizontal"
      })
    ],
    layout: ui.Panel.Layout.flow("horizontal")
  });
  // Create a panel with all 3 widgets
  var legendPanel = ui.Panel({
    widgets: [title, legend, labels],
    style: {
      stretch: "horizontal",
      position: "bottom-left",
      padding: "4px",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "306px"
    }
  });
  return legendPanel;
}
// Call the function to create a colorbar legend
var colorBar = createColorBar(
  "Chlorophylll-a/Phycocyanin (um/L)",
  ["black", "blue", "LightBlue", "cyan", "green", "yellow", "red"],
  0,
  50
);
Map.add(colorBar);
//ee.Dictionary({start: Start_period, end: End_period})
//  .evaluate(renderSlider) 
//function renderSlider(dates) {
//  var slider = ui.DateSlider({
//    start: dates.start.value, 
//    end: dates.end.value, 
//    period: 5, // Every 5 days
//    onChange: renderDateRange
//  })
//  Map.add(slider)
//}
function renderDateRange(dateRange) {
  var image = tempColOutline
    .filterDate(dateRange.start(), dateRange.end())
    .median()
  var layer = ui.Map.Layer(image, visualization2, 'Images')
  Map.layers().reset([layer])
}
var imagesNDVI = ee.ImageCollection(s2).select(['clorofila']);
var imagesNWDI = ee.ImageCollection(s2).select(['ndwi']);
var Sentinel_Color = s2.select(["clorofila"]);
var Sentinel_Colortrue = s2.select(["B4", "B3", "B2"]);
var onlyWater = water.updateMask(water.eq(0)); // Only keep pixels where class equals 2
var vectorwater = onlyWater.reduceToVectors({
  geometry: visu,
  crs: "EPSG:4326",
  scale: 10,
  geometryType: "polygon"
});
//Map.addLayer(vectorwater.draw({color: '000000', strokeWidth: 1}), {}, 'Lake');
var waterstyle = {
  min: -0.1,
  max: 0,
  palette: ["black","Blue"],
};
var winterndwi = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2019-04-30').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["ndwi"]);
var ndwiwinter = ee.Image(winterndwi.max());
var summerndwi = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2019-08-30').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["ndwi"]);
var ndwisummer = ee.Image(summerndwi.min());
var ndwiThreshold = 0;
var watersummer = ndwisummer.gt(ndwiThreshold);
var waterwinter = ndwiwinter.gt(ndwiThreshold);
var NDWIwintermask = ndwiwinter.updateMask(waterwinter.eq(1));
var NDWIsummermask = ndwisummer.updateMask(watersummer.eq(1));
Map.addLayer(NDWIsummermask,waterstyle,"Water Summer 2019")
Map.addLayer(NDWIwintermask,waterstyle,"Water Winter 2019")
var winterclorofila = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2019-04-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["clorofila"]);
var clorofilawinter = ee.Image(winterclorofila.mean().updateMask(water));
var summerclorofila = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2019-09-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["clorofila"]);
var clorofilasummer = ee.Image(summerclorofila.mean().updateMask(water));
Map.addLayer(clorofilasummer,visualization2,"Chlorophyll-a Summer 2019",0)
Map.addLayer(clorofilawinter,visualization2,"Chlorophyll-a Winter 2019",0)
var winterPhyco = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2019-04-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["phycoc"]);
var Phycofilawinter = ee.Image(winterPhyco.mean().updateMask(water));
var summerPhyco = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2019-09-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["phycoc"]);
var Phycofilasummer = ee.Image(summerPhyco.mean().updateMask(water));
Map.addLayer(Phycofilasummer,visualization2,"Phycocyanin Summer 2019",0)
Map.addLayer(Phycofilawinter,visualization2,"Phycocyanin Winter 2019",0)
var winterndwi1921 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2021-04-30').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["ndwi"]);
var ndwiwinter1921 = ee.Image(winterndwi1921.max());
var summerndwi1921 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2021-08-30').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["ndwi"]);
var ndwisummer1921 = ee.Image(summerndwi1921.mean());
var ndwiThreshold = 0;
var watersummer1921 = ndwisummer1921.gt(ndwiThreshold);
var waterwinter1921 = ndwiwinter1921.gt(ndwiThreshold);
var NDWIwintermask1921 = ndwiwinter1921.updateMask(waterwinter1921.eq(1));
var NDWIsummermask1921 = ndwisummer1921.updateMask(watersummer1921.eq(1));
Map.addLayer(NDWIsummermask1921,waterstyle,"Water Summer 2019-2021")
Map.addLayer(NDWIwintermask1921,waterstyle,"Water Winter 2019-2021")
var winterclorofila1921 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2021-04-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["clorofila"]);
var clorofilawinter1921 = ee.Image(winterclorofila1921.mean().updateMask(water));
var summerclorofila1921 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2021-09-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["clorofila"]);
var clorofilasummer1921 = ee.Image(summerclorofila1921.mean().updateMask(water));
Map.addLayer(clorofilasummer1921,visualization2,"Chlorophyll-a Summer 2019-2021",0)
Map.addLayer(clorofilawinter1921,visualization2,"Chlorophyll-a Winter 2019-2021",0)
var winterPhyco1921 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2021-04-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["phycoc"]);
var Phycofilawinter1921 = ee.Image(winterPhyco1921.mean().updateMask(water));
var summerPhyco1921 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2021-09-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["phycoc"]);
var Phycofilasummer1921 = ee.Image(summerPhyco1921.mean().updateMask(water));
Map.addLayer(Phycofilasummer1921,visualization2,"Phycocyanin Summer 2019-2021",0)
Map.addLayer(Phycofilawinter1921,visualization2,"Phycocyanin Winter 2019-2021",0)
var winterndwi21 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2021-04-30').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["ndwi"]);
var ndwiwinter21 = ee.Image(winterndwi21.max());
var summerndwi21 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2021-08-30').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["ndwi"]);
var ndwisummer21 = ee.Image(summerndwi21.mean());
var ndwiThreshold = 0;
var watersummer21 = ndwisummer21.gt(ndwiThreshold);
var waterwinter21 = ndwiwinter21.gt(ndwiThreshold);
var NDWIwintermask21 = ndwiwinter21.updateMask(waterwinter21.eq(1));
var NDWIsummermask21 = ndwisummer21.updateMask(watersummer21.eq(1));
Map.addLayer(NDWIsummermask21,waterstyle,"Water Summer 2021")
Map.addLayer(NDWIwintermask21,waterstyle,"Water Winter 2021")
var winterclorofila21 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2021-04-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["clorofila"]);
var clorofilawinter21 = ee.Image(winterclorofila21.mean().updateMask(water));
var summerclorofila21 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2021-09-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["clorofila"]);
var clorofilasummer21 = ee.Image(summerclorofila21.mean().updateMask(water));
Map.addLayer(clorofilasummer21,visualization2,"Chlorophyll-a Summer 2021",0)
Map.addLayer(clorofilawinter21,visualization2,"Chlorophyll-a Winter 2021",0)
var winterPhyco21 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-01-01', '2021-04-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["phycoc"]);
var Phycofilawinter21 = ee.Image(winterPhyco21.mean().updateMask(water));
var summerPhyco21 = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-07-01', '2021-09-01').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["phycoc"]);
var Phycofilasummer21 = ee.Image(summerPhyco21.mean().updateMask(water));
Map.addLayer(Phycofilasummer21,visualization2,"Phycocyanin Summer 2021",0)
Map.addLayer(Phycofilawinter21,visualization2,"Phycocyanin Winter 2021",0)
var tempColOutline = Sentinel_Color.map(function(img) {
  return img.blend(onlyWater);
});
var Timelapse = {
  crs: "EPSG:4326",
  dimension: "800",
  region: visu,
  min: 100,
  max: 1000,
  framesPerSecond: 1
};
var Animation = ui.Thumbnail({
  image: Sentinel_Colortrue,
  params: Timelapse,
  style: {
    stretch: "horizontal",
    position: "top-left",
    padding: "4px",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "306px"
  }
});
Map.add(Animation);
var Timelapse2 = {
  crs: "EPSG:4326",
  dimension: "800",
  region: visu,
  min: 0,
  max: 50,
  palette: ["black", "blue", "LightBlue", "cyan", "green", "yellow", "red"],
  framesPerSecond: 1
};
var Animation2 = ui.Thumbnail({
  image: tempColOutline,
  params: Timelapse2,
  style: {
    stretch: "horizontal",
    position: "bottom-left",
    padding: "4px",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "306px"
  }
});
var Timelapse3 = {
  crs: "EPSG:4326",
  dimension: "800",
  region: visu,
  min: -0.1,
  max: 0,
  palette: ["black", "LightBlue"],
  framesPerSecond: 1
};
var Animation3 = ui.Thumbnail({
  image: imagesNWDI,
  params: Timelapse3,
  style: {
    stretch: "horizontal",
    position: "bottom-center",
    padding: "4px",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "306px"
  }
});
Map.add(Animation2);
Map.add(Animation3);
Export.image.toDrive({
  image: NIRredmodelmask.select("clorofila"),
  description: "imageToDriveExample",
  folder: "/gee_files",
  region: visu,
  scale: 10,
  maxPixels: 1e13
});
// Define a MultiPoint object.
var multiPoint = ee.Geometry.MultiPoint([[-9.315,39.332], [-9.311,39.329],[-9.308,39.327],[-9.304,39.324],[-9.300,39.322] ]);
// Apply the coordinates method to the MultiPoint object.
var multiPointCoordinates = multiPoint.coordinates();
// Print the result to the console.
print('multiPoint.coordinates(...) =', multiPointCoordinates);
// Display relevant geometries on the map.
Map.addLayer(multiPoint,
             {'color': 'white','pointShape': 'triangle'},
             'MCP Buoy');
Export.image.toDrive({
  image: NDWIwintermask,
  description: "NDWIwintermask",
  folder: "/gee_files",
  region: visu,
  scale: 10,
  maxPixels: 1e13
});
Export.image.toDrive({
  image: NDWIsummermask,
  description: "NDWIsummermask",
  folder: "/gee_files",
  region: visu,
  scale: 10,
  maxPixels: 1e13
});
var featureCollection = ee.FeatureCollection([multiPoint]);
// Export the FeatureCollection.
Export.table.toDrive({
  collection: featureCollection,
  description: 'exportTableExample',
  fileFormat: 'SHP'
});