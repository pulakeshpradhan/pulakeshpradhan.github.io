// ******************* UI Setup & Global Variables *******************
var from_date = ee.Date(Date.now()).advance(-5, 'years');
var to_date = ee.Date(Date.now()).advance(-7, 'days');
// Set initial point of interest
var initialPoint = ee.Geometry.Point(-105.8, 69);
var chart_idx = 0;
// This field contains UNIX time in milliseconds.
var timeField = 'system:time_start';
// Map Panel
var mapPanel = ui.Map().setControlVisibility({layerList: false, fullscreenControl: true, drawingToolsControl: false});
// Create a panel to hold title, intro text, chart and legend components.
var configurationPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
configurationPanel.add(ui.Label('Click a location in the map to see its time series of MODIS/Landsat reflectance.'));
var lon_label = ui.Label({value: "Lon: ", style: {width: '30px', textAlign: "center"}});
var lon_text = ui.Textbox({style: {width: '100px', textAlign: "center"}});
var lat_label = ui.Label({value: "Lat: ", style: {width: '30px', textAlign: "center"}});
var lat_text = ui.Textbox({style: {width: '100px', textAlign: "center"}});
configurationPanel.add(ui.Panel([lon_label, lon_text, lat_label, lat_text], ui.Panel.Layout.flow('horizontal')));
var from_label = ui.Label({
  value: "From: " + date_formatting(from_date), 
  style: {width: '150px', textAlign: "center"}
});
var to_label = ui.Label({
  value: "To: " + date_formatting(to_date), 
  style: {width: '150px', textAlign: "center"}
});
var from_dateslider = ui.DateSlider({
  start: "2000-02-24", 
  end: to_date, 
  value: from_date, 
  style: {width: '150px', textAlign: "center"}
});
var to_dateslider = ui.DateSlider({
  start: "2000-02-24", 
  end: to_date, 
  value: to_date,
  style: {width: '150px', textAlign: "center"}
});
configurationPanel.add(ui.Panel([from_label, to_label], ui.Panel.Layout.flow('horizontal')));
configurationPanel.add(ui.Panel([from_dateslider, to_dateslider], ui.Panel.Layout.flow('horizontal')));
var submit_button = ui.Button('Submit');
configurationPanel.add(submit_button);
configurationPanel.add(ui.Label());
configurationPanel.add(ui.Panel([
  ui.Label({value: 'Developed at ', style: {margin: "0px 4px 0px 0px"}}),
  ui.Label({value: 'ICE lab at University of Victoria', style: {margin: "0px 4px 0px 0px", color: "blue"}}).setUrl("https://icelab.ca/")
], ui.Panel.Layout.flow('horizontal'), {margin: "0px 4px 0px 0px"}));
configurationPanel.add(ui.Panel([
  ui.Label({value: 'Developer/Maintainer: ', style: {margin: "0px 4px 0px 0px"}}),
  ui.Label({value: 'Sangwon Lim', style: {margin: "0px 4px 0px 0px", color: "blue"}}).setUrl("https://github.com/sum1lim")
], ui.Panel.Layout.flow('horizontal'), {margin: "0px 4px 0px 0px"}));
var graphPanel = ui.Panel({style: {stretch: 'horizontal', height: "50%"}});
// *******************************************************************
// ************************ Helper Functions *************************
var getQABits = function(QA_bits, start, end) {
  // Compute the bits we need to extract.
  var pattern = 0;
  for (var i = start; i <= end; i++) {
     pattern += Math.pow(2, i);
  }
  // return ee.Number(QA_bits.bitwiseAnd(pattern)).rightShift(start);
  return ee.Algorithms.If(QA_bits, ee.Number(QA_bits.bitwiseAnd(pattern)).rightShift(start), ee.Number(-1));
};
// Create dictionaries of {date, image} pairs
function id_pixel_dict(pixels){
  var keys = ee.List(pixels.map(function (pixel) {return ee.List(pixel).get(0)}));
  return ee.Dictionary.fromLists(keys, pixels).remove(["id"]);
}
var generateChart = function (coords, roi, imgCollection, seriesNames, title, loc) {
  // Make a chart from the time series.
  var chart = ui.Chart.feature.byFeature({features: imgCollection, xProperty: 'time', yProperties: seriesNames})  
  .setOptions({
        title: title,
        lineWidth: 1,
        pointSize: 3,
        vAxis: {title: 'Percent Reflectance', viewWindow:{min: 0, max: 1}},
  });
  chart.style().set("height", "70%");
  graphPanel.widgets().set(loc, chart);
};
function filter_modis(from_date, to_date, point) {
  var modis_bands  = ee.ImageCollection('MODIS/061/MOD09GQ')
    .select(['sur_refl_b01'], ['B1'])
    .filterDate(from_date, to_date)
    .getRegion(point, 0.1);
  var modis_qa = ee.ImageCollection("MODIS/061/MOD09GA")
    .select(['state_1km', 'SolarZenith'])
    .filterDate(from_date, to_date)
    .getRegion(point, 0.1);
  var modis_dict = id_pixel_dict(modis_bands);
  var mask_dict = id_pixel_dict(modis_qa);
  // mask out clouds in each image
  // drop all invalid data
  return ee.FeatureCollection(
    mask_dict.keys().map(
      function(key){
        var mask = ee.List(mask_dict.get(key));
        var QA = ee.Number(mask.get(4));
        // Get the cloud_state bits and find cloudy areas.
        var cloud_free = ee.Number.expression("QA == 0 || QA ==  3", {QA: getQABits(QA, 0, 1)});
        // Get the cloud_state bits and find cloudy areas.
        var daytime = ee.Algorithms.If(mask.get(5), ee.Number(mask.get(5)).lte(ee.Number(8600)), ee.Number(0));
        var modis = ee.List(modis_dict.get(key));
        // Replace null values with 0
        modis = ee.List(ee.Algorithms.If(
          ee.Number(modis.filter(ee.Filter.neq('item', null)).length()).eq(4),
          modis.filter(ee.Filter.neq('item', null)).add(0),
          modis
        ));
        var ret_li = ee.List([
          modis.get(0),
          modis.get(1),
          modis.get(2),
          ee.Number(modis.get(3)).divide(86400000).floor().multiply(86400000),
          ee.Number(modis.get(4)).divide(ee.Number(10000)),
        ]);
        // return ee.Feature(null, ee.Dictionary.fromLists(modis_bands.get(0), ret_li));
        return ee.Algorithms.If(
          cloud_free.add(daytime).eq(ee.Number(2)),
          ee.Feature(null, ee.Dictionary.fromLists(modis_bands.get(0), ret_li)),
          null
        );
      }
    )
  );
}
function filter_landsat8(from_date, to_date, point) {
  var landsat_bands = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
    .select(['B4', 'QA_PIXEL', 'SZA'], ['B1', 'QA', 'SolarZenith'])
    .filterDate(from_date, to_date)
    .getRegion(point, 0.1);
  var landsat_dict = id_pixel_dict(landsat_bands);
  // mask out clouds in each image
  // drop all invalid data
  return ee.FeatureCollection(
    landsat_dict.keys().map(
      function(key){
        var landsat = ee.List(landsat_dict.get(key));
        var ret_li = ee.List([
          landsat.get(0),
          landsat.get(1),
          landsat.get(2),
          ee.Number(landsat.get(3)).divide(86400000).floor().multiply(86400000),
          landsat.get(4),
          landsat.get(5),
          landsat.get(6),
        ]);
        var QA = ee.Number(landsat.get(5));
        // Get the cloud_state bits and find cloudy areas.
        var cloud_free = ee.Number.expression("QA == 0", {QA: getQABits(QA, 3, 3)});
        // Get the cloud_state bits and find cloudy areas.
        var water = ee.Number.expression("QA == 0", {QA: getQABits(QA, 7, 7)});
        return ee.Algorithms.If(
          cloud_free.add(water).eq(ee.Number(2)),
          ee.Feature(null, ee.Dictionary.fromLists(landsat_bands.get(0), ret_li)),
          null
        );
      }
    )
  );
}
function filter_landsat7(from_date, to_date, point) {
  var landsat_bands = ee.ImageCollection('LANDSAT/LE07/C02/T1_TOA')
    .select(['B3', 'QA_PIXEL', 'SZA'], ['B1', 'QA', 'SolarZenith'])
    .filterDate(from_date, to_date)
    .getRegion(point, 0.1);
  var landsat_dict = id_pixel_dict(landsat_bands);
  // mask out clouds in each image
  // drop all invalid data
  return ee.FeatureCollection(
    landsat_dict.keys().map(
      function(key){
        var landsat = ee.List(landsat_dict.get(key));
        var ret_li = ee.List([
          landsat.get(0),
          landsat.get(1),
          landsat.get(2),
          ee.Number(landsat.get(3)).divide(86400000).floor().multiply(86400000),
          landsat.get(4),
          landsat.get(5),
          landsat.get(6),
        ]);
        var QA = ee.Number(landsat.get(5));
        // Get the cloud_state bits and find cloudy areas.
        var cloud_free = ee.Number.expression("QA == 0", {QA: getQABits(QA, 3, 3)});
        // Get the cloud_state bits and find cloudy areas.
        var water = ee.Number.expression("QA == 0", {QA: getQABits(QA, 7, 7)});
        return ee.Algorithms.If(
          cloud_free.add(water).eq(ee.Number(2)),
          ee.Feature(null, ee.Dictionary.fromLists(landsat_bands.get(0), ret_li)),
          null
        );
      }
    )
  );
}
function date_formatting(date) {
  var year = ee.Date(date).get("year").getInfo();
  var month = ee.Date(date).get("month").getInfo();
  var day = ee.Date(date).get("day").getInfo();
  return year+"-"+month+"-"+day;
}
function interpolate(timeseries, band, window_size) {
  var datesList = timeseries.aggregate_array('time');
  var bandList = timeseries.aggregate_array(band);
  var tmp = ee.List.sequence(0, datesList.length().subtract(ee.Number(1)));
  var timeseries_dict = ee.Dictionary(tmp.iterate(function (i, dict){
      return ee.Dictionary(dict).set(ee.Date(datesList.get(i)).millis(), bandList.get(i));
    }, 
    ee.Dictionary({})
  ));
  var interpolated_dates = [datesList.get(0)];
  var nSteps = ee.List.sequence(1, ee.Date(datesList.get(-1)).difference(ee.Date(datesList.get(0)), 'days'));
  interpolated_dates = ee.List(nSteps.iterate(
    function(_, prev) {
      var prev_date = ee.Date(ee.List(prev).get(-1));
      var curr_date = prev_date.advance(1, 'day').millis();
      return ee.List(prev).add(curr_date);
    }, 
    interpolated_dates
  ));
  var generate_window = function (dist, ret_li) {
    var curr_date = ee.Date(ee.List(ret_li).get(0));
    var rel_date = ee.String(curr_date.advance(ee.Number(dist), 'day').millis());
    return ee.List(ret_li).add(
      ee.Algorithms.If(timeseries_dict.contains(rel_date), timeseries_dict.get(rel_date), -1)
    );
  };
  var interpolated_vals = interpolated_dates.map(function (date) {
    var window = ee.List.sequence(ee.Number(-window_size), ee.Number(window_size));
    var window_li = ee.List(window.iterate(generate_window, [date])).remove(date);
    var right_len = window_li.splice(0, ee.Number(window_size)).removeAll(ee.List([-1])).length();
    var left_len = window_li.splice(ee.Number(window_size).add(1), ee.Number(window_size)).removeAll(ee.List([-1])).length();
    return ee.Algorithms.If(
      timeseries_dict.contains(ee.String(date)),
      timeseries_dict.get(ee.String(date)),
      ee.Algorithms.If(
        right_len.gt(1).and(left_len.gt(1)),
        ee.Algorithms.If(
          ee.Number(window_size).mod(2).eq(0),
          window_li.removeAll(ee.List([-1])).reduce(ee.Reducer.mean()),
          window_li.removeAll(ee.List([-1])).reduce(ee.Reducer.mean())
        ),
        ""
      )
    );
  });
  var iterations = ee.List.sequence(0, interpolated_dates.length().subtract(ee.Number(1)));
  var feature_li = iterations.iterate(
    function (i, prev_li) {
      var feature = ee.Feature(null, {'time': interpolated_dates.get(i), "Interpolated": interpolated_vals.get(i)});
      var ret_li = ee.List(prev_li).add(feature);
      return ret_li;
    },
    ee.List([])
  );
  return ee.FeatureCollection(ee.List(feature_li)).filter("Interpolated != ''");
}
function hampel(timeseries, band, window_size) {
  var datesList = timeseries.aggregate_array('time');
  var bandList = timeseries.aggregate_array(band);
  var timeseries_dict = ee.Dictionary.fromLists(
    datesList.map(function (date) {
        return ee.String(ee.Date(date).millis());
    }), 
    bandList
  );
  var generate_window = function (dist, ret_li) {
    var curr_date = ee.Date(ee.List(ret_li).get(0));
    var rel_date = ee.String(curr_date.advance(ee.Number(dist), 'day').millis());
    return ee.List(ret_li).add(
      ee.Algorithms.If(timeseries_dict.contains(rel_date), timeseries_dict.get(rel_date), -1)
    );
  };
  var n_sigma = ee.Number(1);
  var k = ee.Number(1.4826);
  var filtered_vals = datesList.map(function (date) {
    var window = ee.List.sequence(ee.Number(-window_size), ee.Number(window_size));
    var window_vals = ee.List(window.iterate(generate_window, [date])).remove(date).removeAll(ee.List([-1]));
    var x0 = ee.Number(window_vals.reduce(ee.Reducer.median()));
    var S0 = ee.Array(window_vals, ee.PixelType.float())
      .subtract(x0.float())
      .abs()
      .reduce(ee.Reducer.median(), [0])
      .multiply(k).get([0]);
    return ee.Algorithms.If(
      ee.Number(timeseries_dict.get(date)).subtract(x0).abs().gt(n_sigma.multiply(S0)),
      x0,
      timeseries_dict.get(date)
    );
  });
  var iterations = ee.List.sequence(0, datesList.length().subtract(ee.Number(1)));
  var feature_li = iterations.iterate(
    function (i, prev_li) {
      var feature = ee.Feature(null, {'time': datesList.get(i), "value": filtered_vals.get(i)});
      var ret_li = ee.List(prev_li).add(feature);
      return ret_li;
    },
    ee.List([])
  );
  return ee.FeatureCollection(ee.List(feature_li));
}
function phenology(timeseries, band, window_size) {
  var datesList = ee.List(timeseries.aggregate_array('time'));
  var bandList = ee.List(timeseries.aggregate_array(band));
  var timeseries_dict = ee.Dictionary.fromLists(
    datesList.map(function (date) {
        return ee.String(ee.Date(date).millis());
    }),
    bandList
  );
  var generate_window = function (dist, ret_li) {
    var curr_date = ee.Date(ee.List(ret_li).get(0));
    var rel_date = ee.String(curr_date.advance(ee.Number(dist), 'day').millis());
    return ee.List(ret_li).add(
      ee.Algorithms.If(timeseries_dict.contains(rel_date), [ee.Number.parse(rel_date).divide(864000000), timeseries_dict.get(rel_date)], -1)
    );
  };
  var anomaly_vals = datesList.map(function (date) {
    var left = ee.List.sequence(ee.Number(-window_size), ee.Number(-1));
    var right = ee.List.sequence(ee.Number(1), ee.Number(window_size));
    left = ee.List(left.iterate(generate_window, [date])).remove(date).removeAll(ee.List([-1]));
    right = ee.List(right.iterate(generate_window, [date])).remove(date).removeAll(ee.List([-1]));
    var left_pearson = ee.Dictionary(left.reduce(ee.Reducer.pearsonsCorrelation())).get("correlation");
    var right_pearson = ee.Dictionary(right.reduce(ee.Reducer.pearsonsCorrelation())).get("correlation");
    var left_regr = ee.Dictionary(left.reduce(ee.Reducer.ridgeRegression({numX: 1, numY: 1})));
    var right_regr = ee.Dictionary(right.reduce(ee.Reducer.ridgeRegression({numX: 1, numY: 1})));
    return ee.Number(ee.Algorithms.If(
      left.length().lt(window_size).or(right.length().lt(window_size)),
      0,
      ee.Number(left_pearson).multiply(ee.Array(left_regr.get("coefficients")).get([1, 0]))
      .subtract(
        ee.Number(right_pearson).multiply(ee.Array(right_regr.get("coefficients")).get([1, 0]))
      )
    ));
  });
  var iterations = ee.List.sequence(0, datesList.length().subtract(ee.Number(1)));
  var minima = ee.List(iterations.iterate(
    function (i, prev_li) {
      var curr = ee.Number(i);
      return ee.List(prev_li).add(ee.Algorithms.If(
        curr.lt(1),
        0,
        ee.Algorithms.If(
          ee.Number(anomaly_vals.slice(curr.subtract(1), curr.add(1), 1).reduce(ee.Reducer.min()))
            .eq(anomaly_vals.get(curr)),
          1,
          0
        )
      ));
    },
    ee.List([])
  ));
  var feature_li = ee.List(iterations.iterate(
    function (i, prev_li) {
      var feature = ee.Feature(null, {
        'time': datesList.get(i), 
        "value": bandList.get(i), 
        "MO": ee.Algorithms.If(
          ee.Number(i).gt(30).and(ee.Number(minima.get(i)).eq(1)), 
          ee.Algorithms.If(
            ee.Number(bandList.slice(ee.Number(i).subtract(30), ee.Number(i).add(30), 1).reduce(ee.Reducer.median())).gt(0.75).and(
                ee.Number(bandList.slice(ee.Number(i).subtract(30), i).reduce(ee.Reducer.median())).gt(
                  ee.Number(bandList.slice(i, ee.Number(i).add(30)).reduce(ee.Reducer.median())).add(0.1)
                )
            ),
            1,
            -100
          ), 
          -100
        ),
        "OW": ee.Algorithms.If(
          ee.Number(i).gt(30), 
          ee.Algorithms.If(
            ee.Number(bandList.get(i)).lt(0.05).and(
                ee.Number(bandList.slice(ee.Number(i).subtract(30), i).reduce(ee.Reducer.median())).gt(
                  ee.Number(bandList.slice(i, ee.Number(i).add(30)).reduce(ee.Reducer.median())).add(0.1)
                )
            ),
            1,
            -100
          ), 
          -100
        ),
        "FO": ee.Algorithms.If(
          ee.Number(i).gt(30).and(ee.Number(minima.get(i)).eq(1)), 
          ee.Algorithms.If(
            ee.Number(bandList.slice(ee.Number(i).subtract(30), ee.Number(i).add(30), 1).reduce(ee.Reducer.median())).lt(0.2).and(
                ee.Number(bandList.slice(ee.Number(i).subtract(30), i).reduce(ee.Reducer.median())).add(0.1).lt(
                  ee.Number(bandList.slice(i, ee.Number(i).add(30)).reduce(ee.Reducer.median()))
                )
            ),
            1,
            -100
          ), 
          -100
        ),
      });
      var ret_li = ee.List(prev_li).add(feature);
      return ret_li;
    },
    ee.List([])
  ));
  feature_li = ee.List(ee.List(iterations.iterate(
    function (i, prev) {
      prev = ee.List(prev);
      var curr_year = ee.Number(ee.Date(ee.Feature(feature_li.get(i)).get('time')).get('Year'));
      prev = prev.set(1, ee.Algorithms.If(curr_year.eq(ee.Number(prev.get(2))), prev.get(1), 1));
      var feature = ee.Feature(null, {
        'time': ee.Feature(feature_li.get(i)).get('time'), 
        "value": ee.Feature(feature_li.get(i)).get('value'), 
        "MO": ee.Feature(feature_li.get(i)).get('MO'), 
        "OW": ee.Algorithms.If(ee.Number(ee.Feature(feature_li.get(i)).get('OW')).eq(1)
          .and(ee.Number(prev.get(1)).eq(1)), 1, -100),
        "FO": ee.Feature(feature_li.get(i)).get('FO')
      });
      var ret_li = ee.List(prev.get(0)).add(feature);
      return [
        ret_li, 
        ee.Algorithms.If(ee.Number(ee.Feature(feature_li.get(i)).get('OW')).eq(1), 0, prev.get(1)), 
        curr_year
      ];
    },
    ee.List([[], 1, ee.Date(ee.Feature(feature_li.get(0)).get('time')).get('Year')])
  )).get(0));
  feature_li = ee.List(ee.List(iterations.reverse().iterate(
    function (i, prev) {
      prev = ee.List(prev);
      var curr_year = ee.Number(ee.Date(ee.Feature(feature_li.get(i)).get('time')).get('Year'));
      prev = prev.set(1, ee.Algorithms.If(curr_year.eq(ee.Number(prev.get(3))), prev.get(1), 1));
      prev = prev.set(2, ee.Algorithms.If(curr_year.eq(ee.Number(prev.get(3))), prev.get(2), 1));
      var feature = ee.Feature(null, {
        'time': ee.Feature(feature_li.get(i)).get('time'), 
        "value": ee.Feature(feature_li.get(i)).get('value'), 
        "MO": ee.Algorithms.If(ee.Number(ee.Feature(feature_li.get(i)).get('MO')).eq(1)
          .and(ee.Number(prev.get(1)).eq(1)), 1, -100),
        "OW": ee.Feature(feature_li.get(i)).get('OW'), 
        "FO": ee.Algorithms.If(ee.Number(ee.Feature(feature_li.get(i)).get('FO')).eq(1)
          .and(ee.Number(prev.get(2)).eq(1)), 1, -100)
      });
      var ret_li = ee.List(prev.get(0)).add(feature);
      return [
        ret_li, 
        ee.Algorithms.If(ee.Number(ee.Feature(feature_li.get(i)).get('MO')).eq(1), 0, prev.get(1)), 
        ee.Algorithms.If(ee.Number(ee.Feature(feature_li.get(i)).get('FO')).eq(1), 0, prev.get(2)), 
        curr_year
      ];
    },
    ee.List([[], 1, 1, ee.Date(ee.Feature(feature_li.get(-1)).get('time')).get('Year')])
  )).get(0));
  return ee.FeatureCollection(feature_li);} 
// *******************************************************************
// ****************************** main *******************************
function main(coords){
  // Update the lon/lat panel with values from the click event.
  lon_text.setValue(coords.lon.toFixed(2));
  lat_text.setValue(coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  mapPanel.layers().set(0, point);
  submit_button.onClick(function(){
    coords.lon = Number(lon_text.getValue());
    coords.lat = Number(lat_text.getValue());
    from_date = date_formatting(from_dateslider.getValue()[0]);
    to_date = date_formatting(to_dateslider.getValue()[0]);    
    from_label.setValue('From: ' + from_date);
    to_label.setValue('To: ' + to_date);
    graphPanel.clear;
    main({
      lon: coords.lon,
      lat: coords.lat
    });
  });
  var land_mask = ee.ImageCollection("MODIS/006/MOD44W")
    .select("water_mask")
    .reduce(ee.Reducer.min())
    .reduceRegion(ee.Reducer.first(),point,10)
    .get("water_mask_min");
  var modis_filtered = ee.FeatureCollection(ee.Algorithms.If(
    ee.Number(land_mask).eq(ee.Number(1)),
    filter_modis(from_date, to_date, point),
    ee.FeatureCollection([ee.Feature(null)])
  ));
  var landsat8_filtered = ee.FeatureCollection(ee.Algorithms.If(
    ee.Number(land_mask).eq(ee.Number(1)).and(ee.Date(to_date).difference(ee.Date('2013-03-18'), 'days').gt(0)),
    filter_landsat8(from_date, to_date, point),
    ee.FeatureCollection([ee.Feature(null)])
  ));
  var landsat7_filtered = ee.FeatureCollection(ee.Algorithms.If(
    ee.Number(land_mask).eq(ee.Number(1)),    
    filter_landsat7(from_date, to_date, point),
    ee.FeatureCollection([ee.Feature(null)])
  ));
  var merged = landsat7_filtered.merge(landsat8_filtered.merge(modis_filtered)).sort('time');
  generateChart(
    coords, 
    point, 
    merged,
    ['B1'],
    'MODIS & Landsat Reflectance',
    0
    );
  // generateChart(
  //   coords, 
  //   point, 
  //   merged,
  //   ['B2'],
  //   'MODIS B2 & Landsat B5',
  //   1
  //   );
  // Define a UI widget and add it to the map.
  var button = ui.Button({
    label: 'Phenology',
    onClick: function() {
      var interpolated_1 = merged.select(["time", "B1"]);
      // var interpolated_2 = merged.select(["time", "B2"]);
      for (var window_size=1; window_size<10; window_size++){
        interpolated_1 = interpolate(interpolated_1, "B1", window_size).select(["time", "Interpolated"], ["time", "B1"]);
        // interpolated_2 = interpolate(interpolated_2, "B2", window_size).select(["time", "Interpolated"], ["time", "B2"]);
      }
      var filtered_1 = hampel(interpolated_1, "B1", 9).select(["time", "value"], ["time", "B1"]);
      // var filtered_2 = hampel(interpolated_2, "B2", 9).select(["time", "value"], ["time", "B2"]);
      var phenology_1 = phenology(filtered_1, "B1", 15).select(
        ["time", "value", "MO", "OW", "FO"], ["time", "B1", "MO", "OW", "FO"]
      );
      // var phenology_2 = phenology(filtered_2, "B2", 15).select(
      //   ["time", "value", "MO", "OW", "FO"], ["time", "B2", "MO", "OW", "FO"]
      // );
      generateChart(
        coords,
        point,
        phenology_1,
        ['B1', "MO", "OW", "FO"],
        'Interpolation: original B1 and interpolated values',
        0
      );
      // generateChart(
      //   coords,
      //   point,
      //   phenology_2,
      //   ['B2',  MO", "OW", "FO"],
      //   'Interpolation: original B2 and interpolated values',
      //   1
      // );
      var lengend = ui.Panel(
        [
          ui.Label({value: "MO: Melt Onset", style: {color: 'red'}}), 
          ui.Label({value: "OW: Open Water", style: {color: 'yellow'}}), 
          ui.Label({value: "FO: Freeze Onset", style: {color: 'green'}})
        ], 
        ui.Panel.Layout.flow('horizontal')
      );
      graphPanel.widgets().set(1, lengend);
    }
  });
  graphPanel.widgets().set(1, button);
}
// ********************************************************
mapPanel.onClick(main);
mapPanel.centerObject(initialPoint, 5);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
/*
* Initialize the app
*/
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.setLayout(ui.Panel.Layout.flow("vertical"));
ui.root.add(ui.SplitPanel(configurationPanel, mapPanel, "horizontal", {height: "50%"}));
ui.root.add(graphPanel);
main({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});