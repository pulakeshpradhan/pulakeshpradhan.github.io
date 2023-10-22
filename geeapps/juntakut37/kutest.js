var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                100.56764067422598,
                13.854712677475778
              ],
              [
                100.56980789911002,
                13.85421267572545
              ],
              [
                100.57005466233939,
                13.854697052437361
              ],
              [
                100.56798399697989,
                13.855249136490345
              ]
            ]
          ],
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
        [[[100.56764067422598, 13.854712677475778],
          [100.56980789911002, 13.85421267572545],
          [100.57005466233939, 13.854697052437361],
          [100.56798399697989, 13.855249136490345]]]);
// #########################################################################
// Ref: https://medium.com/eelab/how-to-rank-the-most-polluted-water-body-in-city-using-sentinel-2-satellite-imagery-via-google-792685105bfd
// #########################################################################
var IMG = ee.ImageCollection("COPERNICUS/S2")
            .filterBounds(geometry)
            .filterDate('2021-04-01', '2021-07-30')
            .sort('CLOUDY_PIXEL_PERCENTAGE',true)
            .first()
            .clip(geometry);
print(IMG)
var IMG_water = ndwi_f(IMG)
var IMG_NDCI = ndci_f(IMG_water)
// print(IMG.get('CLOUDY_PIXEL_PERCENTAGE'))
var viz = {min:0.1,max:0.4,palette:['cyan','orange','red']}
Map.setCenter(100.569, 13.8546, 19); // roi = CRMA
Map.addLayer(IMG,{bands:['B4','B3','B2'],min:0,max:3500},'IMG')
//Map.addLayer(IMG_water.select('NDWI'),{palette:['blue']},"IMG_water")
Map.addLayer(IMG_NDCI.select('NDCI'),viz,"IMG_NDCI")
function ndwi_f(img){
  //water mask
  var ndwi = img.normalizedDifference(['B3', 'B8']).rename('NDWI');
  return img.addBands(ndwi)
  .updateMask(ndwi.gt(0))
}
function ndci_f(img){
  //water mask
  var ndci = img.normalizedDifference(['B5', 'B4']).rename('NDCI');
  return img.addBands(ndci)
}
///////////////////////////////////////////
// ####################################################################
//
/////////////Legend///////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  // value: 'chl-a \n (mg/m3)',
  value: 'water quality [chl-a (mg/m3)]',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('polluted')
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('normal')
    ],
  });
legend.add(panel);
Map.add(legend);
/////////////////////////////////////////////////////
// Load an image of the Santa Rosa, California 2017 fires.
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(IMG,{bands:['B4','B3','B2'],min:0,max:3500},'IMG');
linkedMap.addLayer(IMG_water.select('NDWI'),{palette:['cyan']},"IMG_water");
linkedMap.addLayer(IMG_NDCI.select('NDCI'),viz,"IMG_NDCI");
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
//linkedMap.setCenter(101.015, 14.313, 20);
// #############################################################################