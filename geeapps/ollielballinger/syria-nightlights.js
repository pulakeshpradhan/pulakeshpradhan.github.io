var AOR = ui.import && ui.import("AOR", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                37.109296875000005,
                36.21061573162816
              ],
              [
                37.109296875000005,
                36.16628154015441
              ],
              [
                37.175214843750005,
                36.16628154015441
              ],
              [
                37.175214843750005,
                36.21061573162816
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[37.109296875000005, 36.21061573162816],
          [37.109296875000005, 36.16628154015441],
          [37.175214843750005, 36.16628154015441],
          [37.175214843750005, 36.21061573162816]]], null, false),
    nahran_omar = ui.import && ui.import("nahran_omar", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            47.677536937706684,
            30.753834079730517
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([47.677536937706684, 30.753834079730517]);
var empty = ee.Image().byte();
var syria = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0")
.filter(ee.Filter.or(
  ee.Filter.eq('ADM0_NAME', "Syrian Arab Republic"),
  ee.Filter.eq('ADM0_NAME', "Iraq")))
var palette =["0034f5","1e7d83","4da910","b3c120","fcc228","ff8410","fd3000"]
var S5_palette =['black','blue' ,'cyan', 'green', 'yellow', 'red']
var boxcar = ee.Kernel.square({
  radius: 10, units: 'pixels', normalize: true
});
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask)//.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
function cloudscene(image) {
        var clouds=image.select('QA60')
                    .reduceRegions({
                        collection: AOR, 
                        reducer: ee.Reducer.sum(), 
                        scale: 10})
                    .first()
                    .get('sum')
        //var image=image.updateMask(10)
        return image.set('clouds', clouds)
}
var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
    //.map(cloudscene)
var CO = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
  .select('CO_column_number_density')
var CO_viz = {
  min: 0.033,
  max: 0.04,
  palette:  S5_palette
};
var NO = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
  .select('tropospheric_NO2_column_number_density')
var NO_viz = {
  min: 0.00005,
  max: 0.0002,
  palette:  S5_palette
};
var AE = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_AER_AI')
  .select('absorbing_aerosol_index')
var AE_viz = {
  min: -1,
  max: 0.5,
  palette:  S5_palette
};
var HCHO = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_HCHO')
  .select('tropospheric_HCHO_column_number_density')
var HCHO_viz = {
  min: 0.0,
  max: 0.00014,
  palette:  S5_palette
};
var SO = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_SO2')
  .select('SO2_column_number_density')
var SO_viz = {
  min: 0.0,
  max: 0.001,
  palette: S5_palette
};
var viirs_palette = ['#000004','#320a5a','#781b6c','#bb3654','#ec6824','#fbb41a','#fcffa4']
var VIIRS= ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG") 
                  .select('avg_rad').sort('system:time_start')
                  //.filterBounds(raqqa)
                  .map(function(image) {
                    var blank=image.reduceRegions({
                                    collection: AOR, 
                                    reducer: ee.Reducer.sum(), 
                                    scale: 10})
                                .first()
                                .get('sum')
                    //var image=image.updateMask(10)
                    return image.set('blank', blank)
                    })
                  .filter(ee.Filter.gt('blank', 10))
var console = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-right',
    padding: '8px 15px',
    width: '350px'
  }
});
var title = ui.Label({
  value: 'Air Pollution Verification Tool',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var pollutants = {
  "Nitrogen Dioxide": 3,
  "Sulphur Dioxide": 4,
  "Carbon Monoxide": 5,
  "Formaldehyde":6,
  "Aerosols":7
};
var S5_menu = ui.Select({
  items: Object.keys(pollutants),
  onChange: function(key) {
    Map.layers().get(3).setShown(false)
    Map.layers().get(4).setShown(false)
    Map.layers().get(5).setShown(false)
    Map.layers().get(6).setShown(false)
    Map.layers().get(7).setShown(false)
    Map.layers().get(pollutants[key]).setShown(true)
  }
}).setPlaceholder('Select a pollutant');
var bgmaps = {
  "Nighttime Lights": 2,
  "Optical": 1,
  "Infrared": 0,
};
var bgmap_menu = ui.Select({
  items: Object.keys(bgmaps),
  onChange: function(key) {
    Map.layers().get(0).setShown(false)
    Map.layers().get(1).setShown(false)
    Map.layers().get(2).setShown(false)
    Map.layers().get(bgmaps[key]).setShown(true)
  },
}).setPlaceholder("Select basemap");
var slider_label= ui.Label('Select a Date:', {whiteSpace: 'wrap'})
var viirs_label= ui.Label("Select a basemap (left) and a pollutant (right):", {whiteSpace: 'wrap'})
var chart_label= ui.Label("Draw a box on the map to generate a chart of nightlights over time:", {whiteSpace: 'wrap'})
Map.add(console)
// Use the start of the collection and now to bound the slider.
var start = ee.Date(VIIRS.first().get('system:time_start')).format()
var now = Date.now()
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var slide = function(range) {
  var viirs = VIIRS.filterDate(range.start(), range.end()).max().log10().unmask(0).clip(syria)
  var s2=sentinel2.filterDate(range.start(), range.end()).max().clip(syria)
  var NO_filt=NO.filterDate(range.start(), range.end()).mean().clip(syria)
  var SO_filt=SO.filterDate(range.start(), range.end()).mean().clip(syria)
  var CO_filt=CO.filterDate(range.start(), range.end()).mean().clip(syria)
  var HCHO_filt=HCHO.filterDate(range.start(), range.end()).mean().clip(syria)
  var AE_filt=AE.filterDate(range.start(), range.end()).mean().clip(syria)
    // Asynchronously compute the name of the composite.  Display it.
  ee.Date(range.start()).format("YYYY/MM").evaluate(function(name) {
    var viirsLayer=ui.Map.Layer(viirs, {palette:viirs_palette , min:0, max:3},' Nighttime Lights',true)
    var s2Layer=ui.Map.Layer(s2, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000, gamma:0.7},' Optical',false)
    var IRLayer=ui.Map.Layer(s2, {bands: ['B8'], min: 0, max: 10000, palette:palette},' Infrared',false)
    var NO_layer=ui.Map.Layer(NO_filt, NO_viz, 'Nitrogen Dioxide', false)
    var SO_layer=ui.Map.Layer(SO_filt.convolve(boxcar), SO_viz, 'Sulphur Dioxide',false)
    var CO_layer=ui.Map.Layer(CO_filt, CO_viz, 'Carbon Monoxide',false)
    var HCHO_layer=ui.Map.Layer(HCHO_filt.convolve(boxcar), HCHO_viz, 'Formaldehyde',false)
    var AE_layer=ui.Map.Layer(AE_filt, AE_viz, 'Aerosols',false)
    Map.layers().set(2, viirsLayer)
    Map.layers().set(1, s2Layer)
    Map.layers().set(0, IRLayer)
    Map.layers().set(3, NO_layer)
    Map.layers().set(4, SO_layer)
    Map.layers().set(5, CO_layer)
    Map.layers().set(6, HCHO_layer)
    Map.layers().set(7, AE_layer)
    Map.layers().get(pollutants[S5_menu.getValue()]).setShown(true)
    Map.layers().get(bgmaps[bgmap_menu.getValue()]).setShown(true)
    })
};
var chartArea = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '900px'
  }
});
var draw = ui.Button({
  label: 'Draw',
  onClick: function() {
    Map.drawingTools().clear()
    Map.drawingTools().setLinked(false);
    Map.drawingTools().setShape('rectangle');
    Map.drawingTools().draw();
    Map.drawingTools().onDraw(getChart)
  }
});
var remove = ui.Button({
  label: 'Hide Chart',
  onClick: function() {
  chartArea.clear()
  Map.remove(chartArea)
  }
});
var getChart=function() {
  var geom = Map.drawingTools().layers().get(0).toGeometry();
  var chart=ui.Chart.image.series(VIIRS, geom, ee.Reducer.mean(), 100)
  .setOptions({title: 'Nighttime Lights',
              vAxis: {title: 'VIIRs signature'},
              lineWidth: 2,
              series: 'Area of Interest'
              })
  Map.remove(chartArea)
  Map.add(chartArea)
  chartArea.clear()
  chartArea.add(chart)
  Map.drawingTools().clear()
}
// historical panel config 
var historical= function(){
  Map.setCenter(43.546, 35.234, 7)
  Map.setOptions("Satellite")
  console.clear()
  console.add(title);
    var dateRange = ee.DateRange(start, end).evaluate(function(range) {
    var dateSlider = ui.DateSlider({
      start: range['dates'][0],
      end: range['dates'][1],
      value: null,
      period: 31,
      onChange: slide, 
      style:{stretch: 'horizontal'},
    })
    console.add(slider_label)
    console.add(dateSlider.setValue('2020'))
    console.add(viirs_label)
    console.add(ui.Panel({
        widgets: [bgmap_menu, S5_menu],
        layout: ui.Panel.Layout.Flow('horizontal')
      }))
    console.add(chart_label)
    console.add(ui.Panel({
        widgets: [draw, remove],
        layout: ui.Panel.Layout.Flow('horizontal')
      }))
 });
}
historical()