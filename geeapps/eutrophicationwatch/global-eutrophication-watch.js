/**
 * @author Eligio R. MAURE (eligiomaure@gmail.com)
 * 
 * App design inspired by EE Apps: Tasting Menu by
 *  @author Michael DeWitt (mdewitt@google.com)
 * 
 * A simple "sampler platter" for the Earth Engine Apps User Interface library.
 * This example is composed of several simple widgets tied together, to give
 * readers a sense of what components are available and how to wire them 
 * together to make a simple application.
 * 
 * This app has several sections:
 *   - declaring the widgets and nesting them in panels
 *   - styling everything (individual widgets and panels)
 *   - composing the styled subcomponents into the map
 *   - defining behaviors (actions, callbacks, etc.)
 *
 * Contributions
 * @author Michael DeWitt (mdewitt@google.com)
 * - App model design 
 * - Implementation & debugging 
 *  
 * 2022-03-30
 * @author Kazunori Matsuyoshi
 * - Language menu
 * - GeoTIFF download
 */
/**
 * @author Eligio R. MAURE (eligiomaure@gmail.com)
 * 
 * App design inspired by EE Apps: Tasting Menu by
 *  @author Michael DeWitt (mdewitt@google.com)
 * 
 * A simple "sampler platter" for the Earth Engine Apps User Interface library.
 * This example is composed of several simple widgets tied together, to give
 * readers a sense of what components are available and how to wire them 
 * together to make a simple application.
 * 
 * This app has several sections:
 *   - declaring the widgets and nesting them in panels
 *   - styling everything (individual widgets and panels)
 *   - composing the styled subcomponents into the map
 *   - defining behaviors (actions, callbacks, etc.)
 *
 * Contributions
 * @author Michael DeWitt (mdewitt@google.com)
 * - App model design 
 * - Implementation & debugging 
 *  
 * 2022-03-30
 * @author Kazunori Matsuyoshi
 * - Language menu
 * - GeoTIFF download
 */
/******************
 * Required files *
 ******************/
var appLoader = require('users/ermaure/gewV2:modelBoot.js');
var appAnalysis = require('users/ermaure/gewV2:appAnalysis.js');
var appViews = require('users/ermaure/gewV2:appViews.js');
// A UI application to interactively explore CEP.
var app = {
    DATA: {},
    views: {},
    controls: { main: {}, update: {} },
    methods: {},
    update: {},
    state: {},
    trendUpdate: true,
    boot: {
        init: true,
        'SeaWiFS': { splitMode: 0 },
        'MODIS/Aqua': { splitMode: 0 },
        'SGLI/GCOM-C': { splitMode: 0 },
        'YOC (Blended CHL Dataset)': { splitMode: 0 },
        'YOC+SGLI': { splitMode: 0 },
        'userAsset': { splitMode: 0 }
    }
};
// API Server SSL required
var APISERVERURL = "https://npec.cadac-dataworks.com";
var href = '';
var hrefLength = 20;
// Retrieves the className of the clicked point
var cepStatuses = [1, 2, 3, 4, 5, 6];
var cepLabels = ['LD', 'LN', 'LI', 'HD', 'HN', 'HI'];
var labelDict = Object.keys(cepStatuses).reduce(
    function (obj, x) {
        obj[Number(x) + 1] = cepLabels[x];
        return obj;
    }, {});
/*
 * Time series styling
 */
function chartStyle() {
    var language = app.views.LANG_MENU[app.views.lang.getValue()];
    return {
        title: language.chartLabel,
        vAxis: { title: 'CHL [mg/m^3]', scaleType: 'linear' },
        hAxis: { title: 'Date', format: 'MMM-yy' }, //, gridlines: { count: 7 } 
        // trendlines: { 0: { color: 'CC0000', lineWidth: 1.5, } },
        series: {
            1: { color: '#008000', lineWidth: 2, pointsVisible: true, pointSize: 6 },
            0: { color: '#CC0000', lineWidth: 1.5, pointsVisible: false }
        },
        chartArea: { backgroundColor: 'EBEBEB' }
    };
}
function getPointLayer(point) {
    return app.views.getMapLayer(
        point, { color: 'FF0000' },
        'Select Point');
}
/*
* Update CEP status
*/
function pointStatus(value, caller) {
    if (cepStatuses.indexOf(value) > -1) {
        [labelDict[value]].map(function (val) {
            statusUpdate(val, caller)
        });
    }
    else {
        ['Unknown'].map(function (val) {
            statusUpdate(val, caller)
        });
    }
}
/*
 * Update point time series
 */
function statusUpdate(statusName, caller) {
    var language = app.views.LANG_MENU[app.views.lang.getValue()];
    app.views['clickStatus' + caller]
        .setValue(language.statusLabel + statusName);
}
function timeseriesChartUpdate(coords) {
    var language = app.views.LANG_MENU[app.views.lang.getValue()];
    // Update the lon/lat panel1 with values from the click event.
    app.views.lon.setValue(language.longitude);
    app.views.lat.setValue(language.latitude);
    if (typeof coords.lon == "number") {
        app.views.lonTxBx.setValue(coords.lon.toFixed(2));
    } else { coords.lon = ee.Number.parse(coords.lon); }
    if (typeof coords.lat == "number") {
        app.views.latTxBx.setValue(coords.lat.toFixed(2));
    } else { coords.lat = ee.Number.parse(coords.lat); }
    // Add a red dot for the point clicked on.
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    if (app.state.splitMode) {
        app.views.leftMap.layers()
            .set(1, getPointLayer(point));
        app.views.rightMap.layers()
            .set(1, getPointLayer(point));
    } else {
        app.views.standAloneMap.layers()
            .set(1, getPointLayer(point));
    }
    /////////////////////////////////////////////////////
    // Retrieve and update the value of the clicked point
    app.state.cepMap.reduceRegion({
        reducer: ee.Reducer.first(),
        geometry: point,
        scale: app.state.proj.nominalScale()
    }).get('mcep').evaluate(
        function (data) {
            pointStatus(data, '')
        });
    app.views.tsChart = ui.Chart.image.series(
        app.state.chartTs, point,
        ee.Reducer.mean(), 1)
        .setChartType('ScatterChart')
        .setSeriesNames(['chlor_a', 'Trend']);
    app.views.tsChart.setOptions(chartStyle());
    app.views.inspector.widgets().set(4, app.views.tsChart);
    if (app.state.splitMode) {
        app.state.cepMapRight.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: point,
            scale: app.state.proj.nominalScale()
        }).get('mcep').evaluate(
            function (data) {
                pointStatus(data, 'Right')
            });
        app.views.tsChartRight = ui.Chart.image.series(
            app.state.chartTsRight, point, ee.Reducer.mean(), 1)
            .setChartType('ScatterChart')
            .setSeriesNames(['chlor_a', 'Trend']);
        app.views.tsChartRight.setOptions(chartStyle());
        app.views.inspector.widgets().set(7, app.views.tsChartRight);
    }
}
/*
 * Update language
 */
function languageUpdate(selectLang) {
    // var language = app.i18n[value];
    var language = app.views.LANG_MENU[selectLang];
    // Control panel
    app.views.intro.widgets().get(0).setValue(language.intro);
    app.views.langPanel.widgets().get(0).setValue(language.langPanel);
    app.views.dataPanel.widgets().get(0).setValue(language.dataPanel);
    app.views.dataPanel.widgets().get(1).setValue(language.dataPanelDesc);
    app.views.userAsset.set({ placeholder: language.userAsset.info });
    var dsetName = app.views.selectDset.getValue();
    if (dsetName === null) { dsetName = 'MODIS/Aqua'; }
    app.views.infoBar.setValue(language[dsetName].disp);
    app.views.infoBar.setUrl(language[dsetName].url);
    app.views.trendPanel.widgets().get(0).setValue(language.trendPanel);
    app.views.trendPanel.widgets().get(1).setValue(language.trendPanelDesc);
    app.views.trendPanel.widgets().get(2).widgets().get(0).setValue(language.sytLabel);
    app.views.trendPanel.widgets().get(3).widgets().get(0).setValue(language.eytLabel);
    app.views.toggleViews.setLabel(language.toggleViews);
    app.views.togglePanel.widgets().get(0).setValue(language.toggleViewsDesc);
    app.views.trendTitle.setValue(language.trendTitle);
    app.views.togglePanel.widgets().get(1).widgets().get(0).setValue(language.sytLabel);
    app.views.togglePanel.widgets().get(2).widgets().get(0).setValue(language.eytLabel);
    app.views.alphaPanel.widgets().get(0).setValue(language.alphaPanel);
    app.views.alphaPanel.widgets().get(1).setValue(language.alphaPanelDesc);
    app.views.alphaPanel.widgets().get(2).setValue(language.alphaPanelStartDate);
    app.views.alphaPanel.widgets().get(4).setValue(language.alphaPanelEndDate);
    app.views.alphaSubmit.setLabel(language.alphaSubmit);
    app.views.alphaPanel.widgets().get(6).setValue(language.alphaPanelSelectCutoff);
    app.views.alphaTitle.setValue(language.alphaTitle);
    // Result panel
    app.views.inspector.widgets().get(0).setValue(language.inspector);
    app.views.lon.setValue(language.longitude);
    app.views.lat.setValue(language.latitude);
    app.views.userPoint.setLabel(language.alphaSubmit);
    if (selectLang != 'English') { app.views.lat.style().set({ margin: '0 0 4px 2px' }); }
    else { app.views.lat.style().set({ margin: '0 0 4px 16px' }); }
    var statusName = app.views.inspector.widgets().get(2).getValue().split(':: ');
    var statusNameRight = app.views.inspector.widgets().get(5).getValue().split(':: ');
    if (statusName[1]) {
        app.views.inspector.widgets().get(2).setValue(language.statusLabel + statusName[1]);
    }
    if (statusNameRight[1]) {
        app.views.inspector.widgets().get(5).setValue(language.statusLabel + statusNameRight[1]);
    }
    var options = chartStyle();
    app.views.inspector.widgets().get(4).setOptions(options);
    app.views.inspector.widgets().get(7).setOptions(options);
    app.views.wcepTitle.setValue(language.wcepTitle);
    app.views.inspector.widgets().get(9).setValue(language.info);
    app.views.inspector.widgets().get(10).setValue(language.epclass);
    app.views.geotiffPanel.widgets().get(0).setValue(language.geotiffPanel);
    app.views.geotiffDownload.setValue(language.geotiffDownload);
}
/*
 * set GeoTIFF download urls
 */
function setDownloadURL(value) {
    if (value === false) {
        app.views.geotiffDownload.setUrl('');
        app.views.geotiffDownload.style()
            .set({
                'color': 'lightgray',
                'backgroundColor': 'white'
            });
        return;
    }
    href = '';
    // Make a list of Features.
    // xMin, yMin, xMax, yMax.
    var listOfGeometry = ee.List([
        ee.Geometry.Rectangle([117, 29, 123, 33]),
        ee.Geometry.Rectangle([117, 33, 123, 37]),
        ee.Geometry.Rectangle([117, 37, 123, 41]),
        ee.Geometry.Rectangle([117, 41, 123, 45]),
        ee.Geometry.Rectangle([117, 45, 123, 49]),
        ee.Geometry.Rectangle([123, 29, 130, 33]),
        ee.Geometry.Rectangle([123, 33, 130, 37]),
        ee.Geometry.Rectangle([123, 37, 130, 41]),
        ee.Geometry.Rectangle([123, 41, 130, 45]),
        ee.Geometry.Rectangle([123, 45, 130, 49]),
        ee.Geometry.Rectangle([130, 29, 136, 33]),
        ee.Geometry.Rectangle([130, 33, 136, 37]),
        ee.Geometry.Rectangle([130, 37, 136, 41]),
        ee.Geometry.Rectangle([130, 41, 136, 45]),
        ee.Geometry.Rectangle([130, 45, 136, 49]),
        ee.Geometry.Rectangle([136, 29, 143, 33]),
        ee.Geometry.Rectangle([136, 33, 143, 37]),
        ee.Geometry.Rectangle([136, 37, 143, 41]),
        ee.Geometry.Rectangle([136, 41, 143, 45]),
        ee.Geometry.Rectangle([136, 45, 143, 49]),
    ]);
    var image = app.state.cepMap
        .reproject(app.state.proj);
    var clipCepColl = ee.ImageCollection(
        listOfGeometry.map(function (geo) {
            return image.clip(ee.Geometry(geo));
        })).toBands();
    var bandNames = clipCepColl.bandNames();
    var setUrl = false;
    for (var i = 0; i < hrefLength; i++) {
        var ithBand = bandNames.get(i);
        var ithImage = clipCepColl.select([ithBand]);
        var ith = ee.Number.parse(ee.String(ithBand)
            .split('_').get(0));
        var ithGeo = listOfGeometry.get(ith);
        setUrl = i + 1 == hrefLength;
        getHref(ithImage, ithGeo, setUrl);
    }
}
/**************************************
 * Get GeoTIFF download urls to label *
 **************************************/
function getHref(image, region, setUrl) {
    return ee.Image(image).getDownloadURL({
        name: 'image',
        scale: app.state.proj.nominalScale(),
        region: ee.Geometry(region).transform(),
        format: 'GEO_TIFF'
    }, function (url) { setHref(url, setUrl) });
}
/**************************************
 * set GeoTIFF download urls to label *
 **************************************/
function setHref(url, setUrl) {
    var joined = 'urls[]=' + url;
    if (setUrl) {
        app.views.geotiffDownload.setUrl(
            APISERVERURL + "/downloads?" + href + joined
        ).style()
            .set({
                'color': 'black',
                'backgroundColor': '#f5f5f5'
            });
    }
    if (url !== '') { href += joined + '&' }
    return;
}
/*******************
 * update analysis *
 *******************/
function getParamValue(data, item, param, getValue) {
    var keyName = item.key + 'Time';
    var userValue = data[keyName][item.name][param];
    var baseKey = (item.key + '_time').toUpperCase();
    var baseName = item.name.toUpperCase();
    if (userValue === null || userValue === undefined) {
        userValue = data[baseKey][baseName][param.toUpperCase()];
    }
    if (param == 'year') { data[keyName][item.name].year = userValue; }
    if (getValue == 'minMax') { return data[baseKey][baseName][param.toUpperCase()]; }
    return userValue;
}
function getTrend(annuMaxList, startYear, endYear) {
    return app.methods.getTrend(
        annuMaxList,
        startYear,
        endYear,
        app.DATA.EPS,
        app.state.mask
    );
}
function getAlpha(data, caller) {
    var monColl = data.monthColl;
    var dsetName = app.views.selectDset.getValue();
    if (dsetName == 'YOC+SGLI') {
        if (data.endTime[caller].year < 2018) {
            monColl = data.monthCollYOC;
        }
    }
    return app.methods.getAlpha(
        monColl,
        data.startTime[caller].date,
        data.endTime[caller].date,
        app.state.alpha
    );
}
/*
 * Actions controls
 */
function setControls(controls) {
    /******************
     * Main functions *
     ******************/
    function getCoords() {
        var lon = app.views.lonTxBx.getValue();
        var coords = {
            lat: app.views.latTxBx.getValue(),
            lon: lon
        };
        if (lon === null || lon === undefined) {
            return app.DATA.CEP_TRIGGER;
        }
        return coords;
    }
    controls.update.stateAnalysis = function (dsetName, caller, label) {
        var data = app.state.data[dsetName];
        var endYear = getParamValue(data, { key: 'end', name: caller }, 'year');
        var startYear = getParamValue(data, { key: 'start', name: caller }, 'year');
        var annuMaxColl = ee.ImageCollection(data.annuMaxList)
            .filterDate(
                ee.Date.fromYMD(startYear, 1, 1),
                ee.Date.fromYMD(endYear, 12, 31)
            );
        if (label === undefined) {
            if (caller == 'left') { label = '' }
            if (caller == 'right') { label = 'Right' }
        }
        var alphaMap = getAlpha(data, caller);
        app.state['alphaMap' + label] = alphaMap;
        app.state.mask = alphaMap.select('alpha');
        var trendMap = getTrend(data.annuMaxList, startYear, endYear);
        app.state['trendMap' + label] = trendMap;
        var cepMap = app.methods.getMcep(trendMap, alphaMap);
        app.state['cepMap' + label] = cepMap;
        var sy = data.START_TIME[caller.toUpperCase()].YEAR;
        var chartTs = app.methods.chartTimeSeries(
            annuMaxColl, trendMap, sy
        );
        app.state['chartTs' + label] = chartTs;
        return chartTs;
    };
    /*****************
     * update pannel *
     * select data   *
     *****************/
    controls.update.selectPanel = function (dsetName, caller, selectMap) {
        // if (app.state.splitMode) {
        var data = app.state.data[dsetName];
        var startYear = data.startTime[caller].year;
        var endYear = data.endTime[caller].year;
        var selectVar = app.state['selectVar' + selectMap];
        if (selectVar === undefined) {
            selectVar = app.views[caller + 'Select'].getValue();
        }
        if (selectVar === null) { selectVar = 'CEP' }
        var labelValue = "(" + startYear + "–" + endYear + ")";
        var legendValue = 'Timeseries: ' + startYear + '–' + endYear;
        var label = caller + 'Label';
        var legendName = 'tsLengend' + selectMap;
        app.views[legendName].setValue(legendValue);
        if (selectVar == 'Composite') {
            var startDay = data.startTime[caller].date.substring(0, 7);
            var endDay = data.endTime[caller].date.substring(0, 7);
            labelValue = "(" + startDay + "–" + endDay + ")";
        }
        app.views[label].setValue(labelValue);
    };
    /**********************************
     * dataset update
     * slider data range and setValue *
     **********************************/
    function getItems(data) {
        var sliderMin = app.views.startYear.getMin();
        var dsetStart = data.START_TIME.LEFT.YEAR;
        if (sliderMin > dsetStart) {
            return [
                { slider: 'startYear', key: 'start', name: 'left' },
                { slider: 'endYear', key: 'start', name: 'left' },
                { slider: 'startYear', key: 'end', name: 'left' },
                { slider: 'endYear', key: 'end', name: 'left' },
                { slider: 'toggleStartYear', key: 'start', name: 'right' },
                { slider: 'toggleEndYear', key: 'start', name: 'right' },
                { slider: 'toggleStartYear', key: 'end', name: 'right' },
                { slider: 'toggleEndYear', key: 'end', name: 'right' },
            ];
        }
        return [
            { slider: 'startYear', key: 'end', name: 'left' },
            { slider: 'endYear', key: 'end', name: 'left' },
            { slider: 'startYear', key: 'start', name: 'left' },
            { slider: 'endYear', key: 'start', name: 'left' },
            { slider: 'toggleStartYear', key: 'end', name: 'right' },
            { slider: 'toggleEndYear', key: 'end', name: 'right' },
            { slider: 'toggleStartYear', key: 'start', name: 'right' },
            { slider: 'toggleEndYear', key: 'start', name: 'right' },
        ];
    }
    controls.update.sliderGetMinMax = function (dsetName, dsetChange) {
        // Start/end year | SplitWindow
        app.trendUpdate = !app.trendUpdate;
        var data = app.state.data[dsetName];
        var items = getItems(data);
        var isSplitMode = app.state.splitMode;
        items.forEach(function (item) {
            var isRight = item.name == 'right';
            if (!isSplitMode && isRight) {
                return;
            }
            var userValue = getParamValue(data, item, 'year', 'minMax');
            if (item.key == 'start') {
                app.views[item.slider].setMin(userValue);
            }
            if (item.key == 'end') {
                app.views[item.slider].setMax(userValue);
            }
        });
        app.trendUpdate = !app.trendUpdate;
    };
    controls.update.sliderSetMinMax = function (dsetName) {
        var data = app.state.data[dsetName];
        app.views.startYear.setValue(data.startTime.left.year);
        app.views.endYear.setValue(data.endTime.left.year);
        if (app.state.splitMode) {
            app.trendUpdate = !app.trendUpdate;
            app.views.toggleStartYear.setValue(data.startTime.right.year);
            app.trendUpdate = !app.trendUpdate;
            app.views.toggleEndYear.setValue(data.endTime.right.year);
        }
        return;
    };
    controls.update.dataset = function (dsetName) {
        // print('UpdateDset {getImageCollection}: ', dsetName);
        // get new collection 
        app.methods.getImageCollection(dsetName);
        // if (app.state.splitMode) {
        //     controls.update.splitModeParams(dsetName);
        // }
        // update alpha dates
        // print('UpdateDset {alphaDate}: ', dsetName);
        controls.update.alphaDate(dsetName, false);
        // get yearMinMax
        // print('UpdateDset {sliderGetMinMax}: ', dsetName);
        controls.update.sliderGetMinMax(dsetName, true);
        // trigger events
        // print('UpdateDset {sliderSetMinMax}: ', dsetName);
        controls.update.sliderSetMinMax(dsetName);
        if (app.state.splitMode) {
            return controls.main.splitter(dsetName);
        }
        controls.update.stateAnalysis(dsetName, 'left', '');
        return controls.main.getMapViz('standAlone');
    };
    /*************************
     * STANDALONE/LEFT/RIGHT *
     *************************/
    controls.main.getMapViz = function (caller, selectMap) {
        // var data = app.state.data;
        if (caller == 'standAlone') {
            app.views[caller + 'Map'].layers()
                .set(0, app.views.selectMapLayer(app.state, 'CEP', ''));
            return timeseriesChartUpdate(getCoords());
        }
        var selectVar = app.views[caller + 'Select'].getValue();
        if (selectVar === null) { selectVar = 'CEP' }
        app.views[caller + 'Map'].layers().set(0,
            app.views.selectMapLayer(app.state, selectVar, selectMap));
        return caller + selectMap;
    };
    /*********************
     * SPLIT MODE UPDATE *
     *********************/
    controls.main.splitter = function (dsetName, caller, selectMap) {
        // caller, dsetName
        var isAlpha = caller == 'alphaValue';
        var isUndefined = caller === undefined;
        if (isAlpha || isUndefined) {
            // Update all
            controls.update.stateAnalysis(dsetName, 'right', 'Right');
            controls.update.selectPanel(dsetName, 'right', 'Right');
            controls.main.getMapViz('right', 'Right');
            controls.update.stateAnalysis(dsetName, 'left', '');
            controls.update.selectPanel(dsetName, 'left', '');
            controls.main.getMapViz('left', '');
            return timeseriesChartUpdate(getCoords());
        }
        controls.update.stateAnalysis(dsetName, caller);
        controls.update.selectPanel(dsetName, caller, selectMap);
        return controls.main.getMapViz(caller, selectMap);
    };
    /****************
     * Update trend *
     ****************/
    controls.update.trend = function (dsetName, caller, year) {
        if (year) {
            var userDate = app.methods.date2YMD(
                new Date(year - 2, 0, 1));
            app.state.data[dsetName].startTime[caller].date = userDate;
            app.views.alphaStartDay.setValue(userDate);
            userDate = app.methods.date2YMD(new Date(year, 11, 31));
            app.state.data[dsetName].endTime[caller].date = userDate;
            app.views.alphaEndDay.setValue(userDate);
        }
        var selectMap = '';
        if (app.state.splitMode) {
            if (caller == 'right') { selectMap = 'Right' }
            controls.main.splitter(dsetName, caller, selectMap);
            return timeseriesChartUpdate(getCoords());
        }
        controls.update.stateAnalysis(dsetName, 'left', selectMap);
        return controls.main.getMapViz('standAlone', selectMap);
    };
    /********************
     * Update threshold *
     ********************/
    controls.update.alphaDate = function (dsetName, getValue) {
        // start/end date threshold
        var items = [
            { value: 'alphaStartDay', key: 'start', name: 'left' },
            { value: 'alphaEndDay', key: 'end', name: 'left' }
        ];
        var data = app.state.data[dsetName];
        items.forEach(function (item) {
            var userDate = getParamValue(data, item, 'date', dsetName);
            if (getValue) {
                userDate = app.views[item.value].getValue();
            }
            // print('UpdateAlpha: ', item.value, userDate);
            data[item.key + 'Time'][item.name].date = userDate;
            app.views[item.value].setValue(userDate);
            if (app.state.splitMode) {
                data[item.key + 'Time'].right.date = userDate;
            }
        });
    };
    controls.update.alpha = function (dsetName, getValue) {
        if (app.state.splitMode) {
            return app.controls.main.splitter(dsetName, 'alphaValue');
        }
        controls.update.alphaDate(dsetName, getValue);
        controls.update.stateAnalysis(dsetName, 'left', '');
        return controls.main.getMapViz('standAlone', '');
    };
    /****************
     * Toggle views *
     ***************/
    function splitPanelSet() {
        app.views.alphaSubmit.style().set(app.views.SUBMIT_DISABLE);
        app.views.alphaStartDay.style().set(app.views.SUBMIT_DISABLE);
        app.views.alphaEndDay.style().set(app.views.SUBMIT_DISABLE);
        app.views.mapPanel.remove(app.views.standAloneMap);
        app.views.mapPanel.add(app.views.splitMap);
        app.views.leftMap.setCenter(app.views.INIT_MAP_CENTER);
        ui.Map.Linker([app.views.leftMap, app.views.rightMap]);
        return;
    }
    function splitPanelUnset() {
        app.views.alphaSubmit.style().set(app.views.SUBMIT_ENABLE);
        app.views.alphaStartDay.style().set(app.views.DATE_STYLE);
        app.views.alphaEndDay.style().set(app.views.DATE_STYLE);
        app.views.mapPanel.remove(app.views.splitMap);
        app.views.mapPanel.add(app.views.standAloneMap);
    }
    controls.update.splitModeParams = function (dsetName) {
        var start = app.state.data[dsetName].startTime.left.year;
        var end = app.state.data[dsetName].endTime.left.year;
        var shiftYear = end - 5 - start >= 4;
        if (app.boot[dsetName].splitMode === 0 && shiftYear) {
            // left year is minus a 5-y time
            app.state.data[dsetName].endTime.left.year -= 5;
            app.boot[dsetName].splitMode++;
        }
        var leftParam = app.views.leftSelect.getValue();
        if (leftParam === null) { leftParam = 'CEP' }
        controls.update.stateAnalysis(dsetName, 'left', '');
        app.state.selectVar = leftParam;
        var rightParam = app.views.rightSelect.getValue();
        if (rightParam === null) { rightParam = 'CEP' }
        controls.update.stateAnalysis(dsetName, 'right', 'Right');
        app.state.selectVarRight = rightParam;
        controls.update.sliderSetMinMax(dsetName);
        app.views.rightSelect.setValue(rightParam);
        app.views.leftSelect.setValue(leftParam);
        controls.update.selectPanel(dsetName, 'right', 'Right');
        controls.update.selectPanel(dsetName, 'left', '');
    }
    controls.update.splitPanel = function (dsetName, splitMode) {
        splitMode ? splitPanelSet() : splitPanelUnset();
        /* Styling */
        app.views.alphaSubmit.setDisabled(splitMode);
        app.views.alphaStartDay.setDisabled(splitMode);
        app.views.alphaEndDay.setDisabled(splitMode);
        app.views.alphaLegend.style().set({ shown: splitMode });
        app.views.togglePanel.style().set({ shown: splitMode });
        app.views.trendLegend.style().set({ shown: splitMode });
        app.views.clickStatusRight.style().set({ shown: splitMode });
        app.views.tsLengend.style().set({ shown: splitMode });
        app.views.tsLengendRight.style().set({ shown: splitMode });
        app.views.tsChartRight.style().set({ shown: splitMode });
        app.controls.update.alphaDate(dsetName, true);
        app.controls.update.sliderGetMinMax(dsetName);
        if (splitMode) {
            controls.update.splitModeParams(dsetName);
        } else {
            controls.update.stateAnalysis(dsetName, 'left', '');
            controls.main.getMapViz('standAlone');
        }
        return timeseriesChartUpdate(getCoords());
    };
    return controls;
}
/** Registers callbacks between the views and controls. */
function setCallbacks(views) {
    /****************
     * data handles *
     ****************/
    views.userAsset.onChange(function (assetPath) {
        app.state.data.userAsset.ASSET_PATH = assetPath;
        views.userAssetLog.style().set({ shown: true });
        views.userAssetLog.setValue('Loading...');
        var selectData = views.selectDset.items();
        if (selectData.indexOf('userAsset') == -1) {
            var dsetItems = (views.dsetItems + ',userAsset').split(',');
            selectData.reset(dsetItems);
        }
        views.selectDset.setValue('userAsset');
        views.userAssetLog.style().set({ shown: false });
    });
    views.selectDset.onChange(function (dsetName) {
        ee.List([dsetName]).evaluate(
            function () { return app.controls.update.dataset(dsetName) });
        var lang = views.lang.getValue();
        if (lang === null) { lang = 'English' }
        var langMenu = app.views.LANG_MENU[lang];
        app.views.infoBar.setValue(langMenu[dsetName].disp);
        app.views.infoBar.setUrl(langMenu[dsetName].url);
        app.views.userAsset.set({ placeholder: langMenu.userAsset.info });
        // set download url YOC
        var blended = dsetName == 'YOC (Blended CHL Dataset)';
        var combined = dsetName == 'YOC+SGLI';
        var downloadEnable = (
            blended || combined
        ) && !app.state.splitMode;
        ee.List([dsetName]).evaluate(
            function () { return setDownloadURL(downloadEnable) });
    });
    /*****************
     * trend handles *
     *****************/
    views.startYear.onChange(function (year) {
        if (app.trendUpdate) {
            var dsetName = views.selectDset.getValue();
            app.state.data[dsetName].startTime.left.year = year;
            app.controls.update.trend(dsetName, 'left');
        }
    });
    views.endYear.onChange(function (year) {
        if (app.trendUpdate) {
            var dsetName = views.selectDset.getValue();
            app.state.data[dsetName].endTime.left.year = year;
            app.controls.update.trend(dsetName, 'left', year);
        }
    });
    views.toggleStartYear.onChange(function (year) {
        if (app.trendUpdate) {
            var dsetName = views.selectDset.getValue();
            app.state.data[dsetName].startTime.right.year = year;
            app.controls.update.trend(dsetName, 'right');
        }
    });
    views.toggleEndYear.onChange(function (year) {
        if (app.trendUpdate) {
            var dsetName = views.selectDset.getValue();
            app.state.data[dsetName].endTime.right.year = year;
            app.controls.update.trend(dsetName, 'right', year);
        }
    });
    /******************
     * toggleMapViews *
     ******************/
    views.toggleViews.onClick(function () {
        var dsetName = views.selectDset.getValue();
        var splitMode = !app.state.splitMode;
        app.state.splitMode = splitMode;
        // update views
        ee.List([dsetName]).evaluate(
            function () {
                return app.controls.update.splitPanel(
                    dsetName, splitMode);
            });
    });
    /***************
     * alpha handles
     ***************/
    views.alphaSubmit.onClick(function () {
        var dsetName = views.selectDset.getValue();
        var value = app.state.alpha;
        if (value === null || value === undefined) {
            value = app.DATA.ALPHA;
        }
        app.state.alpha = value;
        app.controls.update.alpha(dsetName, true);
    });
    views.alpha.onChange(function (value) {
        var dsetName = views.selectDset.getValue();
        app.state.alpha = ee.Number.parse(value);
        if (app.boot.init) {
            app.methods.getImageCollection(dsetName);
            app.controls.update.sliderGetMinMax(dsetName);
            app.controls.update.alphaDate(dsetName, false);
            app.controls.update.stateAnalysis(dsetName, 'left', '');
            app.controls.main.getMapViz('standAlone', '');
            app.boot.init = !app.boot.init;
            return;
        }
        app.controls.update.alpha(dsetName, false);
    });
    /*******************
     * Image selection *
     *******************/
    views.leftSelect.onChange(function (selectVar) {
        var dsetName = views.selectDset.getValue();
        app.state.selectVar = selectVar;
        app.controls.main.splitter(dsetName, 'left', '');
    });
    views.rightSelect.onChange(function (selectVar) {
        var dsetName = views.selectDset.getValue();
        app.state.selectVarRight = selectVar;
        app.controls.main.splitter(dsetName, 'right', 'Right');
    });
    /*************
     * Inspector *
     * ***********/
    views.standAloneMap.onClick(timeseriesChartUpdate);
    views.leftMap.onClick(timeseriesChartUpdate);
    views.rightMap.onClick(timeseriesChartUpdate);
    // user press lon/lat enter
    views.userPoint.onClick(function () {
        timeseriesChartUpdate({
            lon: app.views.lonTxBx.getValue(),
            lat: app.views.latTxBx.getValue()
        });
    });
    // Language handles
    views.lang.onChange(languageUpdate);
    // GeoTIFF handles
    // views.geotiff.onClick(function () { app.setDownLoadURL() });
    return views;
}
/******************************
 * Boots the application.     *
 * Initializes views,         *
 * initializes controls,      *
 * registers callbacks,       *
 * and creates the interface. *
 ******************************/
function loadApp(isMobile) {
    app = appLoader.initModel(app, isMobile);
    var data = app.state.data['MODIS/Aqua'];
    app.views = {
        startDate: data.START_TIME.LEFT.DATE,
        endDate: data.END_TIME.LEFT.DATE,
        endYear: data.END_TIME.LEFT.YEAR,
        MOBILE: isMobile ? true : false
    };
    app.views = appViews.setViews(app.views);
    app.methods = appAnalysis.getAnalysis(app.methods);
    app.controls = setControls(app.controls);
    app.views = setCallbacks(app.views);
    if (!isMobile) {
        // Configure the layouts for how the panels flow together.
        app.views.rootPanel.setLayout(ui.Panel.Layout.flow('horizontal'));
    }
    // Web page configuration.
    app.views.standAloneMap.setControlVisibility(!isMobile);
    app.views.standAloneMap.setOptions('SATELLITE');
    app.views.standAloneMap.setCenter(131, 37, 4);
    return;
}
var boot = function (deviceInfo) {
    loadApp(!deviceInfo.is_desktop || deviceInfo.width < 800);
    if (!deviceInfo.is_desktop || deviceInfo.width < 800) {
        // Add "learn more" button if it hasn't been added to the map.
        if (app.views.standAloneMap.widgets().length() < 1) {
            app.views.standAloneMap.add(app.views.controlPanel.moreButton);
        }
        ui.root.clear();
        ui.root.add(app.views.rootPanel);
        ui.root.widgets().reset([app.views.standAloneMap, app.views.wcepLegend]);
        ui.root.setLayout(ui.Panel.Layout.absolute());
        // app.views.alpha.setValue('5');
    } else {
        app.views.standAloneMap.style().set('cursor', 'crosshair');
        app.views.leftMap.style().set('cursor', 'crosshair');
        app.views.leftMap.setOptions('SATELLITE');
        app.views.rightMap.style().set('cursor', 'crosshair');
        app.views.rightMap.setOptions('SATELLITE');
        /***************
        * Composition *
        ***************/
        ui.root.clear();
        ui.root.add(app.views.rootPanel);
        app.views.rootPanel.add(app.views.controlPanel);
        app.views.rootPanel.add(app.views.mapPanel);
        app.views.rootPanel.add(app.views.inspector);
        // Remove button if it has been added to the map.
        if (app.views.standAloneMap.widgets().length() > 0) {
            app.views.standAloneMap.widgets().reset();
        }
    }
    // trigger CEP computation
    if (!app.boot.init) {
        // rebooting
        app.boot.init = !app.boot.init;
    }
    app.views.alpha.setValue('5');
};
ui.root.onResize(boot);