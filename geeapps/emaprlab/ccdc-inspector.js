/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Description
 * 
 * Google Earth Engine App to display a source and synthetic Landsat
 * time series processed by the CCDC algorithm (Zhu et al., 20[12][14][15])
 */
var BANDS = ['NDVI', 'BLUE','GREEN','RED','NIR','SWIR1','SWIR2']
var BPBANDS = ['NDVI', 'GREEN', 'RED','NIR','SWIR1','SWIR2']
var TMBANDS = null//['GREEN', 'SWIR2']
var proj = ee.Projection("EPSG:4326").atScale(30)
var dateFormat = 0
var lambda = 20 / 10000
function generateCollection(geometry) {
  var stack_renamer_l4_7 = function(img) {
    var band_list = ['B1', 'B2','B3','B4','B5','B7'];
    var name_list = ['BLUE', 'GREEN', 'RED', 'NIR', 'SWIR1', 'SWIR2'];
    var bands = ee.Image(img).select(band_list).rename(name_list)
          .divide(10000)
    return ee.Image(img).addBands(bands);
  };
  var stack_renamer_l8 = function(img) {
    var band_list = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
    var name_list = ['BLUE', 'GREEN', 'RED', 'NIR', 'SWIR1', 'SWIR2'];
    var bands = ee.Image(img).select(band_list).rename(name_list)
      .divide(10000)
    return ee.Image(img).addBands(bands);
  };
  var cloud_mask_l4_7_C1 = function(img) {
    var pqa = ee.Image(img).select(['pixel_qa'])
    var mask = (pqa.eq(66)).or(pqa.eq(130))
    .or(pqa.eq(68)).or(pqa.eq(132));
    return ee.Image(img).updateMask(mask);
  };
  // Cloud masking for Collection 1, Landsat 8, leave clear and water
  var cloud_mask_l8_C1 = function(img) {
    var pqa = ee.Image(img).select(['pixel_qa'])
    var mask = (pqa.eq(322)).or(pqa.eq(386)).or(pqa.eq(324))
    .or(pqa.eq(388)).or(pqa.eq(836)).or(pqa.eq(900))
    return ee.Image(img).updateMask(mask);
    };
  // Get collections
  var l8_filtered = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(geometry)
    .map(cloud_mask_l8_C1)
    .map(stack_renamer_l8)
  var l7_filtered = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
    .filterBounds(geometry)
    .map(cloud_mask_l4_7_C1)
    .map(stack_renamer_l4_7)
  var l5_filtered = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
    .filterBounds(geometry)
    .map(cloud_mask_l4_7_C1)
    .map(stack_renamer_l4_7)
  var merged_collections = ee.ImageCollection(l7_filtered).merge(l5_filtered)
    .map(function(img) {
      return img.addBands(img.normalizedDifference(["NIR", "RED"]).rename("NDVI"))
    })
  return merged_collections
}
function ccdcTimeseries(collection, ccdc, geometry, band, padding) {
  function harmonicFit(t, coef) {
    var PI2 = 2.0 * Math.PI
    var OMEGAS = [PI2 / 365.25, PI2, PI2 / (1000 * 60 * 60 * 24 * 365.25)]
    var omega = OMEGAS[dateFormat];
    return coef.get([0])
      .add(coef.get([1]).multiply(t))
      .add(coef.get([2]).multiply(t.multiply(omega).cos()))
      .add(coef.get([3]).multiply(t.multiply(omega).sin()))
      .add(coef.get([4]).multiply(t.multiply(omega * 2).cos()))
      .add(coef.get([5]).multiply(t.multiply(omega * 2).sin()))
      .add(coef.get([6]).multiply(t.multiply(omega * 3).cos()))
      .add(coef.get([7]).multiply(t.multiply(omega * 3).sin()));
  };
  function convertDateFormat(date, format) {
    if (format == 0) {
      var epoch = 719529;
      var days = date.difference(ee.Date('1970-01-01'), 'day')
      return days.add(epoch)
    } else if (format == 1) {
      var year = date.get('year')
      var fYear = date.difference(ee.Date.fromYMD(year, 1, 1), 'year')
      return year.add(fYear)
    } else {
      return date.millis()
    }
  }
  function date_to_segment(t, fit) {
    var tStart = ee.Array(fit.get('tStart'));
    var tEnd = ee.Array(fit.get('tEnd'));
    return tStart.lte(t).and(tEnd.gte(t)).toList().indexOf(1);
  };
  function produceTimeSeries(collection, ccdc, geometry, band) {
    var bandIndex = ee.List(BANDS).indexOf(band);
    var ccdcFits = ccdc.reduceRegion({
      reducer: ee.Reducer.first(), 
      geometry: geometry, 
      crs: proj
    })
    if (padding) {
      var first = collection.first()
      var last = collection.sort('system:time_start', false).first()
      var fakeDates = ee.List.sequence(first.date().get('year'), first.date().get('year'), padding).map(function(t) {
        var fYear = ee.Number(t);
        var year = fYear.floor()
        return  ee.Date.fromYMD(year, 1, 1).advance(fYear.subtract(year), 'year')
      })
      fakeDates = fakeDates.map(function(d) { 
        return ee.Image().rename(band).set('system:time_start', ee.Date(d).millis())
      })
      collection = collection.merge(fakeDates).sort('system:time_start')
    }    
    /** Augment images with the model fit. */
    var timeSeries = collection.map(function(img) {
      var time = convertDateFormat(img.date(), dateFormat)
      var segment = date_to_segment(time, ccdcFits)
      var value = img.select(band).reduceRegion({
        reducer: ee.Reducer.first(), 
        geometry: geometry,
        crs: proj
      }).getNumber(band)
      var coef = ee.Algorithms.If(segment.add(1), 
        ccdcFits.getArray('coefs')
          .slice(0, segment, segment.add(1))
          .slice(1, bandIndex, bandIndex.add(1))
          .project([2]),
        ee.Array([0,0,0,0,0,0,0,0,0]))
      var fit = harmonicFit(time, ee.Array(coef))
      return img.set({
        value: value,
        fitTime: time,
        fit: fit,
        coef: coef,
        segment: segment,
        dateString: img.date().format("YYYY-MM-dd")
      }).set(segment.format("h%d"), fit)
    })
    return timeSeries
  }
  return produceTimeSeries(collection, ccdc, geometry, band)
}
function chartTimeseries(table, band) {
  // Everything in here is client-side javascript.
  function formatAsDataTable(table) {
    var cols = [{id: 'A', label: 'Date', type: 'date'},
         {id: 'B', label: 'Raw', type: 'number'},
         {id: 'C', label: 'fit 1', type: 'number'},
         {id: 'D', label: 'fit 2', type: 'number'},
         {id: 'E', label: 'fit 3', type: 'number'},
         {id: 'F', label: 'fit 4', type: 'number'},
         {id: 'G', label: 'fit 5', type: 'number'},
         {id: 'H', label: 'fit 6', type: 'number'}];
    var values = table.map(function(list) {
      return {c: list.map(function(item, index) {
          return {"v": index == 0 ? new Date(item) : item }
        })
      }
    })
    return {cols: cols, rows: values}
  }
  /** Compute the limits of the given column */
  function getLimits(table, column) {
    var col = table.map(function(l) { return l[column]; }).filter(function(i) { return i != null })
    return [Math.min.apply(Math, col), Math.max.apply(Math, col)]
  }
  var limits = getLimits(table, 8)
  var formatted = formatAsDataTable(table)
  return ui.Chart(formatted, 'LineChart', {
      pointSize: 0,
      series: {
        0: { pointSize: 1, lineWidth: 0},
      },
      vAxis: {
        title: 'Surface reflectance (' + band + ')',
        viewWindowMode: 'explicit',
        viewWindow: {
          min: limits[0] * 0.9,
          max: limits[1] * 1.1
        }
      },
  })
}
function chartCcdc(geometry, band, panel) {
  // Set up and run CCDC
  var collection = generateCollection(geometry).select(BANDS)
  var ccdc_tile = ee.Algorithms.TemporalSegmentation.Ccdc({
    collection: collection,
    breakpointBands: BPBANDS,
    tmaskBands: TMBANDS,
    dateFormat: dateFormat,
    lambda: lambda
  })
  Map.addLayer(ccdc_tile, {}, "ccdc", false)
  var series = ccdcTimeseries(collection, ccdc_tile, geometry, band, 0.2)
  Map.addLayer(series, {}, "series", false)
  var table = series
    .reduceColumns(ee.Reducer.toList(9, 9),
      ["dateString", "value", "h0", "h1", "h2", "h3", "h4", "h5", "fit"]).get('list')
  // Use evaluate so we don't lock up the browser.
  table.evaluate(function(t, e) {
    print(e)
    panel.widgets().reset([chartTimeseries(t, band)])
  })
}
function initializeApp() {
  var title = ui.Label({
    value: 'CCDC Inspector\n\n1. Select a band to visualize\n2. Click a location to plot time series',
    style: {
      position: 'top-center',
      whiteSpace: 'pre',
      stretch: 'horizontal',
      //textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: 'rgba(255, 255, 255, 0.0)'
    }
  });
  var waitMsg = ui.Label({
    value: 'Processing, please wait',
    style: {
      position: 'bottom-left',
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: 'rgba(255, 255, 255, 0.0)'
    }
  });
  var chartPanel = ui.Panel({
    style: {
      height: '235px',
      width: '600px',
      position: 'bottom-left',
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
  });
  var bandSelect = ui.Select({items:BANDS, value:'NDVI', 
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'
  }});
  var mainPanel = ui.Panel({
    widgets: [title, bandSelect], //label,
    style: {
      height: '145px',
      width: '275px',
      position: 'top-left',
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
  });
  var dirtyMap = false;
  var useThisBand = ee.Dictionary({});
  Map.onClick(function(coords) {
    if(dirtyMap === false){
      Map.add(chartPanel);
      dirtyMap = true;
    }
    chartPanel.clear();
    chartPanel.add(waitMsg);
    var geometry = ee.Geometry.Point([coords.lon, coords.lat]);
    Map.layers().set(0, ui.Map.Layer(geometry.buffer(15).bounds(), {color: 'FF0000'}, "Pixel"));
    chartCcdc(geometry, bandSelect.getValue(), chartPanel)
  });
  Map.setOptions('SATELLITE');
  Map.add(mainPanel);
  Map.style().set({cursor:'crosshair'});
}
initializeApp();