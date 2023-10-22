/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var countries = ee.FeatureCollection("USDOS/LSIB/2017"),
    collection = ee.ImageCollection("projects/deltares-rws/liwo/2020_0_2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var nlMask = ee.Geometry(countries.filterMetadata("COUNTRY_NA", "equals", "Netherlands").geometry())
// var nlMask = ee.Geometry(countries.filterMetadata("iso_alpha2", "equals", "NL").first().geometry())
// Map.addLayer(countries)
Map.centerObject(nlMask)
var waterdepthStyle = '<RasterSymbolizer>' +
    '<ColorMap type="intervals">' +
        '<ColorMapEntry color="#FFFFFF" opacity="0.01" quantity="0.01999"/>' +
        '<ColorMapEntry color="#CEFEFE" opacity="1.0" quantity="0.5" label="&lt; 0.5"/>' +
        '<ColorMapEntry color="#94bff7" opacity="1.0" quantity="1" label="0.5 - 1.0"/>' +
        '<ColorMapEntry color="#278ef4" opacity="1.0" quantity="1.5" label="1.0 - 1.5"/>' +
        '<ColorMapEntry color="#0000cc" opacity="1.0" quantity="2.0" label="1.5 - 2.0"/>' +
        '<ColorMapEntry color="#4A0177" opacity="1.0" quantity="5" label="2.0 - 5.0"/>' +
        '<ColorMapEntry color="#73004c" opacity="1.0" quantity="9999" label="&gt; 5.0"/>' +
    '</ColorMap>' +
'</RasterSymbolizer>'
var velocityStyle = '<RasterSymbolizer>' +
    '<ColorMap type="intervals">' +
        '<ColorMapEntry color="#FFFFFF" opacity="0.01" quantity="0.01"/>' +
        '<ColorMapEntry color="#FAD7FE" opacity="1.0" quantity="0.5" label="&lt; 0.5"/>' +
        '<ColorMapEntry color="#E95CF5" opacity="1.0" quantity="1" label="0.5 - 1.0"/>' +
        '<ColorMapEntry color="#CB00DB" opacity="1.0" quantity="2" label="1.0 - 2.0"/>' +
        '<ColorMapEntry color="#8100B1" opacity="1.0" quantity="4" label="2.0 - 4.0"/>' +
        '<ColorMapEntry color="#8100D2" opacity="1.0" quantity="1000" label="&gt; 4.0"/>' +
    '</ColorMap>' +
'</RasterSymbolizer>'
var riserateStyle = '<RasterSymbolizer>' +
    '<ColorMap type="intervals">' +
        '<ColorMapEntry color="#FFFFFF" opacity="0.01" quantity="0.01"/>' +
        '<ColorMapEntry color="#FFF5E6" opacity="1.0" quantity="0.25" label="&lt; 0.25"/>' +
        '<ColorMapEntry color="#FFD2A8" opacity="1.0" quantity="0.5" label="0.25 - 0.5"/>' +
        '<ColorMapEntry color="#FFAD66" opacity="1.0" quantity="1" label="0.5 - 1.0"/>' +
        '<ColorMapEntry color="#EB7515" opacity="1.0" quantity="2" label="1.0 - 2.0"/>' +
        '<ColorMapEntry color="#B05500" opacity="1.0" quantity="1000000" label="&gt; 2.0"/>' +
    '</ColorMap>' +
'</RasterSymbolizer>'
var damageStyle = '<RasterSymbolizer>' +
    '<ColorMap type="intervals">' +
        '<ColorMapEntry color="#FFFFFF" opacity="0.01" quantity="0.01"/>' +
        '<ColorMapEntry color="#499b1b" opacity="1.0" quantity="10000" label="&lt; 10.000"/>' +
        '<ColorMapEntry color="#61f033" opacity="1.0" quantity="100000" label="10.000 - 100.000"/>' +
        '<ColorMapEntry color="#ffbb33" opacity="1.0" quantity="1000000" label="100.000 - 1.000.000"/>' +
        '<ColorMapEntry color="#ff3333" opacity="1.0" quantity="5000000" label="1.000.000 - 5.000.000"/>' +
        '<ColorMapEntry color="#8f3333" opacity="1.0" quantity="1000000000000000" label="&gt; 5.000.000"/>' +
    '</ColorMap>' +
'</RasterSymbolizer>'
var fatalitiesStyle = '<RasterSymbolizer>' +
    '<ColorMap type="intervals">' +
        '<ColorMapEntry color="#FFFFFF" opacity="0.01" quantity="0.0001"/>' +
        '<ColorMapEntry color="#499b1b" opacity="1.0" quantity="0.1" label="&lt; 0.1"/>' +
        '<ColorMapEntry color="#61f033" opacity="1.0" quantity="0.3" label="0.1 - 0.3"/>' +
        '<ColorMapEntry color="#ffbb33" opacity="1.0" quantity="1" label="0.3 - 1"/>' +
        '<ColorMapEntry color="#ff3333" opacity="1.0" quantity="3" label="1 - 3"/>' +
        '<ColorMapEntry color="#8f3333" opacity="1.0" quantity="10000" label="&gt; 3"/>' +
    '</ColorMap>' +
'</RasterSymbolizer>'
var affectedStyle = '<RasterSymbolizer>' +
    '<ColorMap type="intervals">' +
        '<ColorMapEntry color="#FFFFFF" opacity="0.01" quantity="0.01" label=""/>' +
        '<ColorMapEntry color="#499b1b" opacity="1.0" quantity="10" label=" 1 - 10"/>' +
        '<ColorMapEntry color="#61f033" opacity="1.0" quantity="100" label=" 10 - 100"/>' +
        '<ColorMapEntry color="#ffbb33" opacity="1.0" quantity="1000" label=" 100 - 1000"/>' +
        '<ColorMapEntry color="#ff3333" opacity="1.0" quantity="999999" label=" &gt; 1000"/>' +
    '</ColorMap>' +
'</RasterSymbolizer>'
var arrivaltimeStyle = '<RasterSymbolizer>' +
    '<ColorMap type="intervals">' +
        '<ColorMapEntry opacity="0.01" color="#bd0026" quantity="0.001"/>' +
        '<ColorMapEntry color="#bd0026" quantity="4" label=" &lt;= 4 uur"/>' +
        '<ColorMapEntry color="#df2722" quantity="8" label=" 4 - 8 uur"/>' +
        '<ColorMapEntry color="#f55629" quantity="12" label=" 8 - 12 uur"/>' +
        '<ColorMapEntry color="#fd8d3c" quantity="16" label=" 12 - 16 uur"/>' +
        '<ColorMapEntry color="#feb751" quantity="24" label=" 16 - 24 uur"/>' +
        '<ColorMapEntry color="#ffdd79" quantity="48" label=" 24 - 48 uur"/>' +
        '<ColorMapEntry color="#ffffb2" quantity="999999" label=" &gt; 48 uur"/>' +
    '</ColorMap>' +
'</RasterSymbolizer>'
var bandStyle = {
    "waterdepth": waterdepthStyle,
    "velocity": velocityStyle,
    "riserate": riserateStyle,
    "damage": damageStyle,
    "fatalities": fatalitiesStyle,
    "affected": affectedStyle,
    "arrivaltime": arrivaltimeStyle
}
var bands = {
    "waterdepth": "waterdiepte",
    "velocity": "stroomsnelheid",
    "riserate": "stijgsnelheid",
    "damage": "schade",
    "fatalities": "slachtoffers",
    "affected": "getroffenen",
    "arrivaltime": "aankomsttijd"
}
var reducers = {
    "waterdepth": "max",
    "velocity": "max",
    "riserate": "max",
    "damage": "max",
    "fatalities": "max",
    "affected": "max",
    "arrivaltime": "min"
}
// function
// var bands = ["waterdiepte", "stroomsnelheid", "stijgsnelheid", "schade", "slachtoffers", "getroffenen", "aankomsttijd"]
// 
var select = ui.Select({
  items: Object.keys(bands),
  onChange: function(key) {
    var band = bands[key]
    var reducer = reducers[key]
    var style = bandStyle[key]
    var scenarios = collection.filter(ee.Filter.listContains("system:band_names", band))
    scenarios = scenarios.select(band)
    var list_size = scenarios.size()
    // band_scenarios = band_scenarios.map(function(i){
    //   return i.mask(i.gt(0))
    // })
    // var aggregate_scenario = band_scenarios.reduce(ee.Reducer.min())
    // // aggregate_scenario = aggregate_scenario.mask(aggregate_scenario.gt(-999))
    if (reducer == 'max') {
      var image = ee.Image(scenarios.reduce(ee.Reducer.max()))
      // # clip image to region and show only values greater than 0 (no-data value given in images) .clip(region)
      image = image.mask(image.gt(0))
    }
    if (reducer == 'min') {
      scenarios = scenarios.map(function(i){
        return i.mask(i.gt(0))
      })
      var image = ee.Image(scenarios.reduce(ee.Reducer.min()))
    }
    // params = liwo_functions.get_liwo_styling(band)
    // info = liwo_functions.generate_image_info(image, params)
    image = image.clip(nlMask)
    Map.addLayer(image.sldStyle(style), {}, band)
  }
});
// Set a place holder.
select.setPlaceholder("Choose a band...");
Map.add(select);
// Create a panel to hold the chart.
// var panel = ui.Panel();
// panel.style().set({
//   width: '400px',
//   position: 'bottom-right'
// });
// Map.add(panel);
// panel.add(select)
// ui.root.clear();
// ui.root.add(panel);
// ui.root.add(select);