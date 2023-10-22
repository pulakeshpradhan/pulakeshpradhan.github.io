var aoi = ui.import && ui.import("aoi", "table", {
      "id": "projects/ee-rizkiatthoriq99-9/assets/TestArea"
    }) || ee.FeatureCollection("projects/ee-rizkiatthoriq99-9/assets/TestArea");
// Set a custom basemap style and default to the satellite map type.
var styles = {
  'Soft Blue': [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80},
        { gamma: 0.5}
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 },
        ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
};
Map.setOptions('soft blue', styles);
// Select images from a collection with a silder.
// This example demonstrates the use of the Landsat 8 Collection 2, Level 2
// QA_PIXEL band (CFMask) to mask unwanted pixels.
function maskL8sr(image) {
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
// Map the function over one year of data.
var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                   .map(maskL8sr)
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  return image.addBands(ndvi);
};
var ndvi = collection.map(addNDVI).select('NDVI')
var palette = [ 'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301']
// A helper function to show the image for a given year on the default map.
var showLayer = function(year) {
  Map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = ndvi.filterDate(dateRange).mean().clip(aoi);
  Map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: -0.5,
      max: 1,
      palette: palette,
      opacity: 0.82
    },
    name: String(year)
  });
};
// Create a label and slider.
var label = ui.Label({
  value: 'NDVI Tahun 2013 - 2015',
  style: {
    color: 'white',
    backgroundColor: '3b3b3b',
    fontWeight : 'bold',
    textAlign: 'center'
  }
});
var slider = ui.Slider({
  min: 2013,
  max: 2022,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal', backgroundColor: '3b3b3b', color:'FEE95F'}
});
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-center',
    padding: '7px',
    width: '500px',
    backgroundColor: '3b3b3b'
  }
});
// Add the panel to the map.
Map.add(panel);
// Set default values on the slider and map.
slider.setValue(2022);
Map.centerObject(aoi, 12);
// Gradient Legend
var viz = {min: -1, max: 1 , palette: palette}
function createLegend() {
    var legend = ui.Panel({
    style: {
      textAlign: 'center',
      position: 'top-left',
      padding: '8px 12px',
      backgroundColor: '3b3b3b'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
    value: 'NDVI',
    style: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: '3b3b3b',
      fontWeight: 'bold',
      fontSize: '15px',
      margin: '0 0 4px 0',
      padding: '0 0 3px 0'
      }
  });
  legend.add(legendTitle); 
   // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label({ 
          value: viz['max'],
          style: {backgroundColor : '3b3b3b',
          color: 'FEE95F'}
        })
      ],
      style: {
        backgroundColor: '3b3b3b'
      }
    });
  legend.add(panel);
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'20x200'},  
    style: {padding: '1px', position: 'bottom-center', backgroundColor: '3b3b3b'}
  });
  // add the thumbnail to the legend
  legend.add(thumbnail);
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label({
          value: viz['min'],
          style: {
            backgroundColor : '3b3b3b',
            color: 'FEE95F'
          }
        })
      ],
      style: {
        backgroundColor : '3b3b3b',
        color: 'white'
      }
    });
  legend.add(panel);
  return legend
}
// Create the legend.
var legend = createLegend();
// Add the legend to the map.
Map.add(legend);