var mi_flood = ui.import && ui.import("mi_flood", "image", {
      "id": "users/cartoscience/public/fwdet_gee_mi_05242020_convolve_nomask"
    }) || ee.Image("users/cartoscience/public/fwdet_gee_mi_05242020_convolve_nomask"),
    extent = ui.import && ui.import("extent", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -86.38069642839476,
                44.28420007698595
              ],
              [
                -86.38069642839476,
                41.97956133743869
              ],
              [
                -83.09029115495726,
                41.97956133743869
              ],
              [
                -83.09029115495726,
                44.28420007698595
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
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-86.38069642839476, 44.28420007698595],
          [-86.38069642839476, 41.97956133743869],
          [-83.09029115495726, 41.97956133743869],
          [-83.09029115495726, 44.28420007698595]]], null, false),
    buildings = ui.import && ui.import("buildings", "image", {
      "id": "users/cartoscience/public/ms_building_footprint_michigan"
    }) || ee.Image("users/cartoscience/public/ms_building_footprint_michigan");
var leftMap = ui.Map()
var rightMap = ui.Map()
buildings = buildings.clip(extent)
var min = 0
var max = 5
var colors = ['76f2ff','4db5ff','be76ff','8f49ff']
var dark = ui.Map.Layer(ee.Image(0), {palette:'000000', opacity: 0.75}, 'Dark')
var building = ui.Map.Layer(buildings.rename('buildings'),{palette:'f0f0f0'}, 'MS buildings')
var fwdet = ui.Map.Layer(mi_flood,{min: min, max: max, palette: colors},'FwDET GEE')
var building_risk = ui.Map.Layer(buildings.updateMask(mi_flood.mask().eq(1)).rename('building_risk'),{palette:'fa431e'}, 'MS buildings - risk')
leftMap.layers().set(0, dark);
leftMap.layers().set(1, building);
leftMap.layers().set(2, fwdet);
leftMap.layers().set(3, building_risk);
leftMap.setOptions('HYBRID').setCenter(-84.24960113703284,43.61366824341073,12)
leftMap.style().set('cursor', 'crosshair');
rightMap.setOptions('HYBRID')
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
})
ui.root.widgets().reset([splitPanel])
ui.Map.Linker([leftMap, rightMap])
var legendTitleStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '202020',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
}
var legendFootnoteStyle = {
  fontSize: '11px',
  stretch: 'horizontal',
  color: '202020',
  textAlign: 'center',
  margin: '0 0 7px 0',
}
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x5',
      format: 'png',
      palette: palette
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  })
}
var style = {
  min: min,
  max: max,
  palette: colors
}
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label('0', {margin: '4px 8px', fontSize: '11px', color: '202020'}),
        ui.Label('2.5',{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontSize: '11px', color: '202020'}),
        ui.Label('5 m', {margin: '4px 8px', fontSize: '11px', color: '202020'})
      ],
      ui.Panel.Layout.flow('horizontal'))
  return ui.Panel([ColorBar(style.palette), labelPanel])
}
rightMap.add(ui.Panel(
    [
      ui.Label('FwDET GEE', legendTitleStyle), 
      ui.Label('Floodwater depth estimations of the Michigan May 2020 floods—prepared by the Surface Dynamics Modeling Lab (SDML) at the University of Alabama', legendFootnoteStyle),
      ui.Label({value: 'Surface Dynamics Modeling Lab', targetUrl: 'https://sdml.ua.edu/', style: legendFootnoteStyle}),
      ui.Label('Flood extent provided by the Dartmouth Flood Observatory at the University of Colorado Boulder', legendFootnoteStyle),
      ui.Label({value: 'Dartmouth Flood Observatory', targetUrl: 'https://floodobservatory.colorado.edu/', style: legendFootnoteStyle}),
      ui.Label({value: 'Cohen, S., Raney, A., Munasinghe, D., Loftis, J. D., Molthan, A., Bell, J., Rogers, L., Galantowicz, J., Brakenridge, G. R., Kettner, A. J., Huang, Y.-F., and Tsang, Y.-P.: The Floodwater Depth Estimation Tool (FwDET v2.0) for improved remote sensing analysis of coastal flooding, Nat. Hazards Earth Syst. Sci., 19, 2053–2065, https://doi.org/10.5194/nhess-19-2053-2019, 2019.', style: legendFootnoteStyle}),
      ui.Label({value: 'Cohen et al. 2019 FwDET', targetUrl: 'https://www.nat-hazards-earth-syst-sci.net/19/2053/2019/', style: legendFootnoteStyle}),
      ui.Label({value: 'App constructed by Brad G. Peter, Department of Geography, University of Alabama', style: legendFootnoteStyle}),
      ui.Label({value: '© 2020 Cartoscience', targetUrl: 'https://cartoscience.com', style: legendFootnoteStyle}),
      ui.Label({value: 'USGS NED', targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/USGS_NED', style: legendFootnoteStyle}),
      ui.Label({value: 'MS Building Footprints', targetUrl: 'https://github.com/microsoft/USBuildingFootprints', style: legendFootnoteStyle}),
      makeLegend()
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '300px', position: 'bottom-right', border: '1px solid gray'})
)
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {position: 'bottom-left', border: '1px solid gray', padding: '2px'}
})
inspector.add(ui.Label('Click map to get estimated depth'))
leftMap.add(inspector);
leftMap.onClick(function(coords) {
  inspector.clear();
  inspector.style().set('shown', true)
  inspector.add(ui.Label('Loading...', {color: 'gray'}))
  var point = ee.Geometry.Point(coords.lon, coords.lat)
  var sampleVal = mi_flood.reduceRegion(ee.Reducer.mean(), point, 1)
  var computedValue = sampleVal.get('FwDET_GEE')
  var dot = ui.Map.Layer(point, {color: 'ffffff'});
  leftMap.layers().set(4, dot);
  computedValue.evaluate(function(result) {
    inspector.clear();
    if (result >= 0) {
      var val = result.toFixed(2)
      if (val < 0.01) {
        val = '<0.01'
      }
      inspector.add(ui.Label({
        value: 'Estimated depth: ' + val + ' m',
        style: {stretch: 'vertical'}
      }))
    } else {
    inspector.add(ui.Label({
      value: 'Please click a location on the flood layer',
      style: {stretch: 'vertical'}
    }))
    }
  })
})
/*
Export.image.toDrive({
  image: mi_flood,
  description: 'fwdet_gee_mi_05242020_convolve_nomask',
  maxPixels: 1e13,
  scale: mi_flood.projection().nominalScale().getInfo(),
  region: extent
})
*/