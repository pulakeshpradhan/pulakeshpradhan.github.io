var Padang = ui.import && ui.import("Padang", "table", {
      "id": "users/rizkiatthoriq99/Padang_Adm"
    }) || ee.FeatureCollection("users/rizkiatthoriq99/Padang_Adm");
// Custom Base Map
// Set a custom basemap style and default to the satellite map type.
var styles = {
  'Soft Blue': [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80},
        { gamma: 0.17}
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
// Collection
var imCO = ee.ImageCollection([
    ee.Image('users/rizkiatthoriq99/NDBI19901992').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI19901992').gt(-0.17)),
    ee.Image('users/rizkiatthoriq99/NDBI1995').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI1995').gt(-0.17)),
    ee.Image('users/rizkiatthoriq99/NDBI2000').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2000').gt(-0.17)),
    ee.Image('users/rizkiatthoriq99/NDBI2005').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2005').gt(-0.17)),
    ee.Image('users/rizkiatthoriq99/NDBI2010').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2010').gt(-0.17)),
    ee.Image('users/rizkiatthoriq99/NDBI2015').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2015').gt(-0.17)),
    ee.Image('users/rizkiatthoriq99/NDBI2020').select('b1').rename('NDBI').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2020').gt(-0.17))
]).mosaic();
print('Min Value:', imCO.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: Padang,
  scale: 30
}));
print('Max Value:', imCO.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: Padang,
  scale: 30
}));
var viz = {min: -0.17, max: 0.11 , palette: ['f2f2f2','faff71','ffbf3e','ff6f24','ff1212','c52121']}
// Image Preparation
var images = ({
  'NDBI 1990 - 1992' : ee.Image('users/rizkiatthoriq99/NDBI19901992').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI19901992').gt(-0.17)).visualize({min: -0.17, max: 0.11, palette: ['f2f2f2','faff71','ffbf3e','ff6f24','ff1212','c52121']}),
  'NDBI 1995'        : ee.Image('users/rizkiatthoriq99/NDBI1995').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI1995').gt(-0.17)).visualize({min: -0.17, max: 0.11, palette: ['f2f2f2','faff71','ffbf3e','ff6f24','ff1212','c52121']}),
  'NDBI 2000'        : ee.Image('users/rizkiatthoriq99/NDBI2000').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2000').gt(-0.17)).visualize({min: -0.17, max: 0.11, palette: ['f2f2f2','faff71','ffbf3e','ff6f24','ff1212','c52121']}),
  'NDBI 2005'        : ee.Image('users/rizkiatthoriq99/NDBI2005').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2005').gt(-0.17)).visualize({min: -0.17, max: 0.11, palette: ['f2f2f2','faff71','ffbf3e','ff6f24','ff1212','c52121']}),
  'NDBI 2009 - 2011' : ee.Image('users/rizkiatthoriq99/NDBI2010').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2010').gt(-0.17)).visualize({min: -0.17, max: 0.11, palette: ['f2f2f2','faff71','ffbf3e','ff6f24','ff1212','c52121']}),
  'NDBI 2015'        : ee.Image('users/rizkiatthoriq99/NDBI2015').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2015').gt(-0.17)).visualize({min: -0.17, max: 0.11, palette: ['f2f2f2','faff71','ffbf3e','ff6f24','ff1212','c52121']}),
  'NDBI 2020'        : ee.Image('users/rizkiatthoriq99/NDBI2020').clip(Padang).updateMask(ee.Image('users/rizkiatthoriq99/NDBI2020').gt(-0.17)).visualize({min: -0.17, max: 0.11, palette: ['f2f2f2','faff71','ffbf3e','ff6f24','ff1212','c52121']})
})
// Left Map
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'bottom-left');
// Right Map
var rightMap = ui.Map();
rightMap.add(createLegend1())
rightMap.setControlVisibility(false)
var rightSelector = addLayerSelector(rightMap, 6, 'bottom-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label({
    value: 'Choose the year',
    style: {
      backgroundColor : '3b3b3b',
      color: 'white'
    }
  });
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({
    items: Object.keys(images), 
    onChange: updateMap,
    style: {
      backgroundColor : '3b3b3b',
      color: '3b3b3b'
    }
  });
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position, backgroundColor : '3b3b3b',
          color: 'white'}});
  mapToChange.add(controlPanel);
}
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
    value: 'NDBI',
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
          value: '≥0.11',
          style: {backgroundColor : '3b3b3b',
          color: 'white'}
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
            color: 'white'
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
// Right Map
function createLegend1() {
    var legend = ui.Panel({
    style: {
      width: '312px',
      backgroundColor: '3b3b3b',
      position: 'top-right',
      padding: '8px 12px'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
    value: 'Urban Expansion in Padang City',
    style: {
      width: '300px',
      backgroundColor: '3b3b3b',
      color: 'ffffff',
      // textDecoration: 'underline',
      fontWeight: 'bold',
      fontSize: '20px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  legend.add(legendTitle); 
var line = ui.Panel({
    style: {
      height: '2px',
      width: '40',
      backgroundColor: 'ffc40b',
      color: 'ffc40b',
      fontWeight: 'bold',
      fontSize: '20px',
      margin: '0 0 10px 0',
      padding: '0 0 0 0'
      }
  });
  legend.add(line);
var desc = ui.Label({
    value: 'This map shows the urban extent in Padang city within a time series between 1990 - 2020. Normalized Difference Built Up Index (NDBI) was the algorithm used in data processing to deliniate the urban area by extracting pixel value greater than -0.17 (after trial and error testing the urban boundary). Higher NDBI value, represents dense urban area, and lower NDBI value means less denseu urban area.  Datasets used in this map are Landsat 5 (1990 - 2011) and Landsat 8 imagery (2015 and 2020). The area covered by this algorithm and its treshold are mostly built-up area, bare land, and mining area. Use the wiper to observe the change',
    style: {
      textAlign: 'justify',
      width: '280px',
      backgroundColor: '3b3b3b',
      color: 'ffffff',
      fontSize: '10px',
      margin: '0 0 0 0',
      padding: '0'
      }
  });
  legend.add(desc);
var line = ui.Panel({
    style: {
      height: '2px',
      width: '40',
      backgroundColor: 'ffc40b',
      color: 'ffc40b',
      fontWeight: 'bold',
      fontSize: '20px',
      margin: '10px 0 10px 0',
      padding: '0 0 0 0'
      }
  });
  legend.add(line);
var desc2 = ui.Label({
    value: 'Geography UNP Team in MAPCOM 2021: Rizki Atthoriq Hidayat, Muhammad Irsyad, and Siti Fatimah Tusyadiah',
    style: {
      textAlign: 'center',
      width: '280px',
      color: 'ffffff',
      backgroundColor: '3b3b3b',
      fontSize: '7px',
      margin: '0 0 0 0',
      padding: '0'
      }
  });
  legend.add(desc2);
  return legend
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(Padang, 11);
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(Padang, 11)
        .setOptions('soft blue', styles)
rightMap.setOptions('soft blue', styles)