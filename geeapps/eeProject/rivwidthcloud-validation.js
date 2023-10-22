var validation = ui.import && ui.import("validation", "table", {
      "id": "users/eeProject/RivWidthCloud/export_to_GEE_width_validation_29d3f"
    }) || ee.FeatureCollection("users/eeProject/RivWidthCloud/export_to_GEE_width_validation_29d3f");
/***
 * Merge landsat 5, 7, 8 collection 1 tier 1 imageCollections and standardize band names
 */ 
function mergeLandsatImageCollections() {
    // standardize band names
    var bn8 = ['B2', 'B3', 'B4', 'B6', 'BQA', 'B5'];
    var bn7 = ['B1', 'B2', 'B3', 'B5', 'BQA', 'B4'];
    var bn5 = ['B1', 'B2', 'B3', 'B5', 'BQA', 'B4'];
    var bns = ['Blue', 'Green', 'Red', 'Swir1', 'BQA', 'Nir'];
    // # create a merged collection from landsat 5, 7, and 8
    var ls5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA').select(bn5, bns);
    var ls7 = (ee.ImageCollection('LANDSAT/LE07/C01/T1_RT_TOA')
        .filterDate('1999-01-01', '2003-01-01')
        .select(bn7, bns));
    var ls8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA').select(bn8, bns);
    var merged = ee.ImageCollection(ls5.merge(ls7).merge(ls8));
    return (merged);
};
var merged_ls = mergeLandsatImageCollections();
validation = validation.map(function (f) {
    return f.setGeometry(ee.Geometry.Point([f.get('lon'), f.get('lat')]));
});
var station = validation;
var width_sv = validation.map(function (f) {
    return f.buffer(f.get('width_sv'));
});
var width_ls = validation.map(function (f) {
    return f.buffer(f.get('width_ls_mean'));
});
// Map.addLayer(width_sv, {color: 'green'}, 'in-situ width');
// Map.addLayer(width_ls, {color: 'blue'}, 'Landsat-derived width');
// Map.addLayer(station, {color: 'red'}, 'gauge stations');
var validation_chart = ui.Chart.feature.byFeature({
    features: validation.select(['width_sv', 'width_ls_mean'], ['y', 'x']),
    xProperty: 'x',
    yProperties: ['y']
})
    .setChartType('ScatterChart')
    .setOptions({
        title: null,
        vAxis: { title: 'In-situ width (m)' },
        hAxis: { title: 'Landsat-derived Width (m)' },
        width: 700,
        height: 700,
        // legend: 'none',
        chartArea: { width: '80%', height: '85%' },
        legend: { position: 'in' },
        series: {
            0:
            {
                color: 'blue',
                visibleInLegend: false
            }
        },
        trendlines: {
            0: {
                visibleInLegend: true,
                color: 'red',
                'trendlines.n.showR2': true
            }
        },
        pointSize: 3,
        explorer: {
            keepInBounds: true,
            actions: ['dragToZoom', 'rightClickToReset']
        }
    });
validation_chart.style({
    stretch: 'both'
});
var mapWindow = ui.Map();
var maplayers = mapWindow.layers();
validation_chart.onClick(function (width_ls_mean, width_sv, propertyName) {
    var f = ee.Feature(validation.filterMetadata('width_sv', 'equals', width_sv).first());
    var i = ee.Image(merged_ls.filterMetadata('LANDSAT_SCENE_ID', 'equals', f.get('LANDSAT_SCENE_ID')).first());
    var mndwi = i.normalizedDifference(['Green', 'Swir1']);
    mapWindow.clear();
    mapWindow.centerObject(f.buffer(f.get('width_sv')));
    mapWindow.addLayer(i, { bands: ['Red', 'Green', 'Blue'], gamma: 1.5 }, 'Landsat RGB', false);
    mapWindow.addLayer(mndwi, { min: -1, max: 1 }, 'MNDWI');
    mapWindow.addLayer(f.buffer(f.get('width_sv')), { color: 'green' }, 'In-situ width', true, 0.5);
    mapWindow.addLayer(f.buffer(f.get('width_ls_mean')), { color: 'orange' }, 'Landsat-derived width', true, 0.5);
    mapWindow.addLayer(f, { color: 'Red' }, 'Gauge station');
    mapWindow.addLayer(validation, { color: 'Red' }, 'All Gauge stations', false);
});
ui.root.clear();
var titleTxt = 'RivWidthCloud Validation';
var mapTitleTxt = 'Validation Sites';
var instrTxt1 = 'Instruction: click on the data point to zoom in to its site';
var instrTxt2 = 'Radius of yellow circle: width calculated using RivWidthCloud';
var instrTxt3 = 'Radius of green circle: width measured in-situ';
var instrTxt4 = 'Click and drag on the chart to zoom; right-click on the chart to reset';
var instrTxt5 = 'Background map: MNDWI map for the day both in-situ and Landsat-based widths were measured.';
var instrLabel1 = ui.Label(titleTxt,
    { position: 'top-center', stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '24px' });
var instrLabel2 = ui.Label(instrTxt1,
    { position: 'top-center', stretch: 'horizontal', textAlign: 'left', padding: '0px', margin: '2px' });
var instrLabel3 = ui.Label(instrTxt2,
    { position: 'top-center', stretch: 'horizontal', textAlign: 'left', padding: '0px', margin: '2px' });
var instrLabel4 = ui.Label(instrTxt3,
    { position: 'top-center', stretch: 'horizontal', textAlign: 'left', padding: '0px', margin: '2px' });
var instrLabel5 = ui.Label(instrTxt4,
    { position: 'top-center', stretch: 'horizontal', textAlign: 'left', padding: '0px', margin: '2px' });
var instrLabel6 = ui.Label(instrTxt5,
    { position: 'top-center', stretch: 'horizontal', textAlign: 'left', padding: '0px', margin: '2px' });
var txtPanel = ui.Panel([instrLabel1, instrLabel2, instrLabel3, instrLabel4, instrLabel5, instrLabel6]);
// var instrTitle = ui.Label(titleTxt, {position: 'top-center', stretch: 'horizontal', textAlign: 'center'});
var leftPanel = ui.Panel([txtPanel, validation_chart], ui.Panel.Layout.flow('horizontal', true));
// var masterPanel = ui.Panel([leftPanel, mapWindow], ui.Panel.Layout.flow('horizontal'), {stretch: 'both'});
var masterPanel = ui.SplitPanel(leftPanel, mapWindow);
ui.root.add(masterPanel);
mapWindow.centerObject(validation.union().geometry());
mapWindow.addLayer(validation, { color: 'Red' }, 'All Gauge stations', true);