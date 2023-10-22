var countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    Australia = ui.import && ui.import("Australia", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                110.2282391976405,
                -10.48285221394412
              ],
              [
                110.2282391976405,
                -41.14177136590783
              ],
              [
                161.8639813851405,
                -41.14177136590783
              ],
              [
                161.8639813851405,
                -10.48285221394412
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
        [[[110.2282391976405, -10.48285221394412],
          [110.2282391976405, -41.14177136590783],
          [161.8639813851405, -41.14177136590783],
          [161.8639813851405, -10.48285221394412]]], null, false);
var AustralianBoundary = countries.filterMetadata('country_na', 'equals', 'Australia')
ui.root.clear()
var map = ui.Map()
ui.root.add(map)
//Add NASA and SDG Logos
var logo = ee.Image("projects/mangrovescience/GoddardLogo");
// var logo2 = ee.Image("projects/mangrovescience/SDGLogo");
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},
style:{width:'133px',height:'140px',position:'bottom-center',padding: '10px'}});
// var branding2 = ui.Thumbnail({image:logo2,params:{bands:['b1','b2','b3'],min:0,max:255},
// style:{width:'133px',height:'123px',position:'bottom-left',padding: '10px'}});
var logoPan = ui.Panel({
  style: {
    width:'150px',
    height:'150px',
    position: 'bottom-left',
    padding: '1px'
  }
}).setLayout(ui.Panel.Layout.absolute());
logoPan.add(branding)
// .add(branding2)
// map.add(logoPan)
var collection = ee.ImageCollection('UTOKYO/WTLAB/KBDI/v1')
  .select('KBDI')
  .filterDate('2009-01-01', '2019-01-10')
  .map(function(image){
    return image.clip(AustralianBoundary)
  })
var band_viz = {
    min: 500,
  max: 800,
  palette: ['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026']
};
map.addLayer(collection.filterDate('2009-01-01', '2010-12-31'), band_viz, 'Drought');
// A helper function to show the image for a given year on the default map.
var showLayer = function(year) {
  // map.layers().get(0).reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = collection.filterDate(dateRange).first();
  map.layers().set(0, image.visualize(band_viz))
};
// Create a label and slider.
var label = ui.Label('Drought Map for Year');
var slider = ui.Slider({
  min: 2009,
  max: 2019,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    padding: '8px'
  }
});
// Add the panel to the map.
map.add(panel);
// Set default values on the slider and map.
slider.setValue(2010);
var dataset = ee.ImageCollection('FIRMS')
var fires = dataset.select('T21')
.filterBounds(Australia);
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['#fd8d3c','#f03b20','#bd0026'],
};
var fires20192020 = fires.filterDate('2019-10-01', '2020-03-28')
var fires20152016 = fires.filterDate('2015-10-01', '2016-03-28')
var fires20102011 = fires.filterDate('2010-10-01', '2011-03-28')
var fires20052006 = fires.filterDate('2005-10-01', '2006-03-28')
var fires20002001 = fires.filterDate('2000-10-01', '2001-03-28')
map.addLayer(fires20002001, firesVis, '2000-2001 Fire Season')
map.addLayer(fires20052006, firesVis, '2005-2006 Fire Season')
map.addLayer(fires20102011, firesVis, '2010-2011 Fire Season')
map.addLayer(fires20152016, firesVis, '2015-2016 Fire Season')
map.addLayer(fires20192020, firesVis, '2019-2020 Fire Season')
var check5 = ui.Checkbox('2019-2020 Fire Season', true);
check5.onChange(function(checked) {
  map.layers().get(5).setShown(checked);
});
check5.style().set({padding: '0px 0px 0px 8px '})
var check4 = ui.Checkbox('2015-2016 Fire Season', true);
check4.onChange(function(checked) {
  map.layers().get(4).setShown(checked);
});
check4.style().set({padding: '0px 0px 0px 8px '})
var check3 = ui.Checkbox('2010-2011 Fire Season', true);
check3.onChange(function(checked) {
  map.layers().get(3).setShown(checked);
});
check3.style().set({padding: '0px 0px 0px 8px '})
var check2 = ui.Checkbox('2005-2006 Fire Season', true);
check2.onChange(function(checked) {
  map.layers().get(2).setShown(checked);
});
check2.style().set({padding: '0px 0px 0px 8px '})
var check1 = ui.Checkbox('2000-2001 Fire Season', true);
check1.onChange(function(checked) {
  map.layers().get(1).setShown(checked);
});
check1.style().set({padding: '0px 0px 0px 8px '})
var droughtCheck = ui.Checkbox('Drought Map (Keetch-Bryam Drought Index)', true);
droughtCheck.onChange(function(checked) {
  map.layers().get(0).setShown(checked);
});
droughtCheck.style().set({padding: '0px 0px 0px 8px '})
var panel = ui.Panel()
panel.style().set({
  // maxHeight: '700px',
  maxWidth: '400px',
  position: 'top-left'
});
var title = ui.Label({
  value: '21st Century Australian Fire Patterns',
  style: {fontWeight: 'bold',
    fontSize: '32px',
    padding: '10px',
    color: '#616161',}
})
var text = ui.Label({
  value: 'Use this app to map and plot changes in the extent of Australian bush fires over the past two decades. ' +
  'Historical drought maps from the Keetch-Byram Drought Index demonstrate the influence of weather patterns such as drought on fire prevalence over time.  ',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
    border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
var amazonFiresText = ui.Label({
  value: 'The following maps show the distribution of fires across Australia during the fire seasons (generally October through March) of 2000-2001, 2005-2006, 2010-2011, 2015-2016, and 2019-2020. Maps were acquired from the MODIS FIRMS dataset.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
  }
})
var droughtmapsText = ui.Label({
  value: 'The following drought map is derived from the Keetch-Bryam Drought Index, a precipitation-based model of drought conditions across the world. Index values increase with drought severity. ',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
  }
})
map.setCenter(134.73859592134897, -21.269303670744495, 5)
var fireArea2000 = (fires20002001.mosaic().gt(0).selfMask()).multiply(ee.Image.pixelArea())
var fireArea2005 = (fires20052006.mosaic().gt(0).selfMask()).multiply(ee.Image.pixelArea())
var fireArea2010 = (fires20102011.mosaic().gt(0).selfMask()).multiply(ee.Image.pixelArea())
var fireArea2015 = (fires20152016.mosaic().gt(0).selfMask()).multiply(ee.Image.pixelArea())
var fireArea2020 = (fires20192020.mosaic().gt(0).selfMask()).multiply(ee.Image.pixelArea())
var reducedArea2000 = fireArea2000.reduceRegion({
  geometry: Australia,
  scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
}).get('T21')
print(reducedArea2000)
var reducedArea2005 = fireArea2005.reduceRegion({
  geometry: Australia,
  scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
}).get('T21')
print(reducedArea2005)
var reducedArea2010 = fireArea2010.reduceRegion({
  geometry: Australia,
  scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
}).get('T21')
print(reducedArea2010)
var reducedArea2015 = fireArea2015.reduceRegion({
  geometry: Australia,
  scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
}).get('T21')
print(reducedArea2015)
var reducedArea2020 = fireArea2020.reduceRegion({
  geometry: Australia,
  scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
}).get('T21')
print(reducedArea2020)
var feature = ee.Feature(Australia)
feature = feature.set('2000-2001', ee.Number(reducedArea2000).divide(1e6))
.set('2005-2006', ee.Number(reducedArea2005).divide(1e6))
.set('2010-2011', ee.Number(reducedArea2010).divide(1e6))
.set('2015-2016', ee.Number(reducedArea2015).divide(1e6))
.set('2019-2020', ee.Number(reducedArea2020).divide(1e6))
var chart = ui.Chart.feature.byProperty(feature, ['2000-2001', '2005-2006', '2010-2011', '2015-2016', '2019-2020'], ['Total'])
chart.setOptions({
  title: 'Total Area of Australian Bush Fires over Time', 
  colors: ['FF0000'],
  hAxis: {
    title: 'Year',
  },
  vAxis: {
    title: 'Fire Area (km^2)'
  }
})
map.setOptions('SATELLITE')
var vis = {min:0, max:0.6, palette:['#fd8d3c','#f03b20','#bd0026']};
// A function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label('400'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('600')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel).add(thumb);
}
// Second legend for fires
var vis2 = {min:0, max:0.6, palette:['#fd8d3c','#f03b20','#bd0026']};
// A function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend2 (vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('300º K'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('530º K')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
var line1  = ui.Label({value: '_________________________________________________________________', style: {fontWeight: 'bold',  padding: '0px 0px 0px 8px',}})
var line2  = ui.Label({value: '_________________________________________________________________', style: {fontWeight: 'bold',  padding: '0px 0px 0px 8px',}})
ui.root.add(panel)
panel.add(title)
panel.add(text)
panel.add(line1)
var panel2 = ui.Panel({style: {padding: '0px 0px 0px 8px'}})
// panel2 = panel2.style({   border: '4px solid rgba(97, 97, 97, 0.05)'})
panel.add(panel2)
panel.add(amazonFiresText)
panel.add(check5)
panel.add(check4)
panel.add(check3)
panel.add(check2)
panel.add(check1)
panel.add(makeLegend2(vis2))
panel.add(chart)
panel.add(line2)
panel.add(droughtmapsText)
panel.add(droughtCheck)
panel.add(makeLegend(vis))