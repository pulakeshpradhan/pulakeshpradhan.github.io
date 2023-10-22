var yearList = [
    1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
];
// --- fc ---------------------------------------------------------------------------
var cartas = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/cartas');
var cartasImg = ee.Image(0).mask(0).paint(cartas, '000000', 1);
var func = require('users/frederickirchhoff/WWFagua_share:func');
// --- MapBiomas Water Class ------------------------------------------------------
var MapBiomas_water = func.mapb_water_img();
// --- frequency image ---------------------------------------------------------------
var yearDetection = func.yearDetection;
var createFreqImg = function () {
  var freqImgBands_list = ee.List(yearList).map(
    function (year) {
      return yearDetection(year);
    });
    var freqImgBands = freqImgBands_list.iterate(
      function (image, freqImgBands) {
        return ee.Image(freqImgBands).addBands(ee.Image(image));
      },
      ee.Image().select()
      );
  var freqImg = ee.Image(freqImgBands).reduce(ee.Reducer.sum());
return freqImg;
};
var freqImg = createFreqImg();
var fillGaps = freqImg.gte(29);
var embargo = freqImg.lt(3);
var yearDetection_fillGaps = function (year) {
  var img = yearDetection(year);
  var img_fillGaps = img.where(fillGaps.eq(1), 1).where(embargo.eq(1), 0);
  return img_fillGaps;
};
var createFreqImg_def = function () {
  var freqImgBands_list = ee.List(yearList).map(
    function (year) {
      return yearDetection_fillGaps(year);
    });
    var freqImgBands = freqImgBands_list.iterate(
      function (image, freqImgBands) {
        return ee.Image(freqImgBands).addBands(ee.Image(image));
      },
      ee.Image().select()
      );
  var freqImg = ee.Image(freqImgBands).reduce(ee.Reducer.sum());
return freqImg;
};
var freqImg_def = createFreqImg_def();
var createFreqImg_MapBiomas = function (img) {
  var bandImgList = yearList.map(
    function (year) {
      var band = 'classification_' + year;
      var yearImg = img.select(band);
      return yearImg;
    }
    );
  var freqImgBands = ee.List(bandImgList).iterate(
    function (image, freqImgBands) {
      return ee.Image(freqImgBands).addBands(ee.Image(image));
    },
    ee.Image().select()
    );
  var freqImg = ee.Image(freqImgBands).reduce(ee.Reducer.sum());
return freqImg;
};
var freqImg_MapBiomas = createFreqImg_MapBiomas(MapBiomas_water);
// --- Images --------------------------------------------------------------------
var before1 = ee.Image(1);
var before2 = ee.Image(1);
var after1 = ee.Image(1);
var after2 = ee.Image(1);
// --------------------------------------------------------------------------------
// construct UI
var beforeMap = ui.Map({
    style: {
        border: '2px solid black'
    }
});
var afterMap = ui.Map({
    style: {
        stretch: 'both',
        border: '2px solid black'
    }
});
beforeMap.addLayer(before1, {}, 'dummy layer 1', false, 0.1);
beforeMap.addLayer(before1, {}, 'dummy layer 2', false, 0.1);
beforeMap.addLayer(before1, {}, 'dummy layer 3', false, 0.1);
beforeMap.addLayer(cartasImg, {
    palette: '000000'
}, 'cartas');
var linkedBeforeMap = new ui.Map({
    style: {
        border: '2px solid black'
    }
});
linkedBeforeMap.addLayer(before2, {}, 'dummy layer 1', false, 0.1);
linkedBeforeMap.addLayer(before2, {}, 'dummy layer 2', false, 0.1);
linkedBeforeMap.addLayer(cartasImg, {
    palette: '000000'
}, 'cartas');
var linkerBefore = ui.Map.Linker([beforeMap, linkedBeforeMap]);
var splitPanelBefore = new ui.SplitPanel({
    firstPanel: linkerBefore.get(0),
    secondPanel: linkerBefore.get(1),
    orientation: 'horizontal',
    wipe: true,
    style: {
        stretch: 'both'
    }
});
afterMap.addLayer(after1, {}, 'water according to fractions', false, 0.1);
afterMap.addLayer(cartasImg, {
    palette: '000000'
}, 'cartas');
var linkedAfterMap = new ui.Map({
    style: {
        border: '2px solid black'
    }
});
linkedAfterMap.addLayer(after2, {}, 'water after spatial filter', false, 0.1);
linkedAfterMap.addLayer(cartasImg, {
    palette: '000000'
}, 'cartas');
var linkerAfter = ui.Map.Linker([afterMap, linkedAfterMap]);
var splitPanelAfter = new ui.SplitPanel({
    firstPanel: linkerAfter.get(0),
    secondPanel: linkerAfter.get(1),
    orientation: 'horizontal',
    wipe: true,
    style: {
        stretch: 'both'
    }
});
        beforeMap.setCenter(-58.44, -2.76, 4);
        linkedBeforeMap.setCenter(-58.44, -2.76, 4);
        afterMap.setCenter(-58.44, -2.76, 4);
        linkedAfterMap.setCenter(-58.44, -2.76, 4);
// -----------------------------------------------------------------------------
// --- chart -------------------------------------------------------------------
var collection = yearList.map(function (year_number) {
    return ee.Feature(null, {
        'year': String(year_number),
        'band': 'classification_' + year_number,
        'system:yValue': 0
    });
});
// print('collection', collection);
var chart = ui.Chart.feature.byFeature(collection, 'year', 'system:yValue')
    .setChartType('LineChart')
    .setOptions({
        legend: 'none',
        lineWidth: 1,
        pointSize: 5,
        height: 100,
        vAxis: {
            gridlines: {
                count: 0
            }
        },
        'chartArea': {
            left: 30,
            top: 10,
            right: 30,
            width: '100%',
            height: '80%'
        },
        hAxis: {
            textPosition: 'in',
            showTextEvery: 1,
            interpolateNulls: true,
            slantedTextAngle: 90,
            slantedText: true,
            textStyle: {
                color: '#000000',
                fontSize: 12,
                fontName: 'Arial',
                bold: false,
                italic: false
            }
        },
        tooltip :{
          trigger: 'none',
        },
        colors: ['#FF0000'],
        crosshair: {
            trigger: 'both',
            orientation: 'vertical',
            focused: {
                color: '#0000ff'
            }
        }
    });
chart.style().set({
    position: 'bottom-center',
    width: '100%',
    height: '150px',
    margin: '0px',
    padding: '0px',
});
// When the chart is clicked, update the map and label.
chart.onClick(function (xValue, yValue, seriesName) {
    if (!xValue) return;
    var feature = ee.Feature(
        ee.FeatureCollection(collection)
        .filter(ee.Filter.eq('year', xValue))
        .first()
    );
    var year = ee.Number.parse(feature.get('year'), 10);
    var band = ee.String(feature.get('band'));
    var layer_linkedBefore_0 = linkedBeforeMap.layers().get(0);
    var layer_linkedBefore_1 = linkedBeforeMap.layers().get(1);
    var layer_before_0 = beforeMap.layers().get(0);
    var layer_before_1 = beforeMap.layers().get(1);
    var layer_before_2 = beforeMap.layers().get(2);
    var layer_after_class = linkedAfterMap.layers().get(0);
    var layer_after_mosaico = afterMap.layers().get(0);
    linkedBeforeMap.remove(layer_linkedBefore_0);
    linkedBeforeMap.remove(layer_linkedBefore_1);
    beforeMap.remove(layer_before_0);
    beforeMap.remove(layer_before_1);
    beforeMap.remove(layer_before_2);
    // linkedAfterMap.remove(layer_after_class);
    // afterMap.remove(layer_after_mosaico);
    var rgb_image_func = func.rgb_mos_year;
    var rgb_image = rgb_image_func(year);
    var MapBiomasWaterClass = MapBiomas_water.select(band);
    // --- Palettes module ------------------------------------------------------------
    var frac_vis = {bands: ['soil', 'GV', 'NPV'], 
    gain: [1, 1, 1], gamma: 4
    };//, palette: '000000, 0000ff, 00ff00, ff0000, 000000'};
    var cond_vis =  {min:0, max: 1, palette: 'F0F8FF, 0000FF'};
    var freq_vis =  {min:0, max: 33, palette: 'ffffff, 00ffff, 00c6ff, 008bff, 0048ff, 0000ac, 00004e'};
    // --------------------------------------------------------------------------------
var legend_y = require('users/frederickirchhoff/shortcuts:legendyze_background_position');
var freq_legend = legend_y.legendyze('Frequency of Occurrence ', freq_vis, '808080', 'bottom-left');
var freq_legend_MapBiomas = legend_y.legendyze('Frequency of Occurrence', freq_vis, '808080', 'bottom-left');
    var show_freq = ui.Button({
      label: 'Show',
      style: {
        backgroundColor: '808080'
      },
      onClick: function() {
        var layer_before_add = linkedBeforeMap.layers().get(1);
        var layer_MapBiomasFreq = beforeMap.layers().get(2);
        layer_before_add.setShown(true);
        layer_MapBiomasFreq.setShown(true);
        linkedBeforeMap.add(freq_legend);
        beforeMap.add(freq_legend_MapBiomas);
      }
    });
    var hide_freq = ui.Button({
      label: 'Hide',
      style: {
        backgroundColor: '808080'
      },
      onClick: function() {
        var layer_before_add = linkedBeforeMap.layers().get(1);
        var layer_MapBiomasFreq = beforeMap.layers().get(2);
        layer_before_add.setShown(false);
        layer_MapBiomasFreq.setShown(false);
        linkedBeforeMap.remove(freq_legend);
        beforeMap.remove(freq_legend_MapBiomas);
      }
    });
    var show_MapBiomas = ui.Button({
      label: 'Show',
      style: {
        backgroundColor: '808080'
      },
      onClick: function() {
        var layer_before_add = beforeMap.layers().get(1);
        layer_before_add.setShown(true);
      }
    });
    var hide_MapBiomas = ui.Button({
      label: 'Hide',
      style: {
        backgroundColor: '808080'
      },
      onClick: function() {
        var layer_before_add = beforeMap.layers().get(1);
        layer_before_add.setShown(false);
      }
    });
    var freq_opt_line = ui.Panel(
    [
        show_freq, hide_freq
    ],
    ui.Panel.Layout.Flow('horizontal', true), {
        stretch: 'both', 
        backgroundColor: '808080'
    }
    );
    var freq_opt_panel = ui.Panel(
      [
        ui.Label('Frequency of Occurrence in Years', {backgroundColor: '808080'}), 
        freq_opt_line
      ], 
      ui.Panel.Layout.Flow('vertical', true), {
        stretch: 'both'
      }
    );
    freq_opt_panel.style().set({
      position: 'bottom-right',
      width: '230px',
      backgroundColor: '808080'
    });
    var year_Img = yearDetection_fillGaps(year)
    var MapBiomas_opt_line = ui.Panel(
    [
        show_MapBiomas, hide_MapBiomas
    ],
    ui.Panel.Layout.Flow('horizontal', true), {
        stretch: 'both', 
        backgroundColor: '808080'
    }
    );
    var MapBiomas_opt_panel = ui.Panel(
      [
        ui.Label('MapBiomas water class', {backgroundColor: '808080'}), 
        MapBiomas_opt_line
      ], 
      ui.Panel.Layout.Flow('vertical', true), {
        stretch: 'both'
      }
    );
    MapBiomas_opt_panel.style().set({
      position: 'bottom-left',
      width: '230px',
      backgroundColor: '808080'
    });
    // --- Images --------------------------------------------------------------------
    var before0 = ee.Image(0).blend(rgb_image);
    var before1 = ee.Image(0).blend(MapBiomasWaterClass);
    var before11 = ee.Image(0).blend(freqImg_MapBiomas);
    var before2 = ee.Image(0).blend(year_Img);
    var before3 = ee.Image(0).blend(freqImg_def);
    // --------------------------------------------------------------------------------
    var layer_before_mosaico_new = ui.Map.Layer({
        'eeObject': before0,
        'visParams': frac_vis,
        'name': 'mosaic',
        'shown': true,
        'opacity': 1.0
    });
    var layer_before_mosaico_add = ui.Map.Layer({
        'eeObject': before1,
        'visParams': cond_vis,
        'name': 'MapBiomas Water Class',
        'shown': false,
        'opacity': 1.0
    });
    var layer_before_mosaico_add_add = ui.Map.Layer({
        'eeObject': before11,
        'visParams': freq_vis,
        'name': 'MapBiomas FreqImg',
        'shown': false,
        'opacity': 1.0
    });
    var layer_before_class_new = ui.Map.Layer({
        'eeObject': before2,
        'visParams': cond_vis,
        'name': 'water detection',
        'shown': true,
        'opacity': 1.0
    });
    var layer_before_class_add = ui.Map.Layer({
        'eeObject': before3,
        'visParams': freq_vis,
        'name': 'occurence',
        'shown': false,
        'opacity': 1.0
    });
    var layer_after_mosaico_new = ui.Map.Layer({
        'eeObject': after1,
        'visParams': cond_vis,
        'name': 'mosaico after',
        'shown': true,
        'opacity': 1.0
    });
    var layer_after_class_new = ui.Map.Layer({
        'eeObject': after2,
        'visParams': cond_vis,
        'name': 'class after',
        'shown': true,
        'opacity': 1.0
    });
    beforeMap.layers().insert(0, layer_before_mosaico_new);
    beforeMap.layers().insert(1, layer_before_mosaico_add);
    beforeMap.layers().insert(2, layer_before_mosaico_add_add);
    beforeMap.add(MapBiomas_opt_panel);
    linkedBeforeMap.layers().insert(0, layer_before_class_new);
    linkedBeforeMap.layers().insert(1, layer_before_class_add);
    linkedBeforeMap.add(freq_opt_panel);
    // afterMap.layers().insert(0, layer_after_mosaico_new);
    // linkedAfterMap.layers().insert(0, layer_after_class_new);
});
// --------------------------------------------------------------------------------- 
var textbox = ui.Textbox({
    'placeholder': 'carta...'
});
textbox.style().set({
    width: '150px',
    height: '25px'
});
var button = ui.Button({
    'label': '🔍',
    'onClick': function () {
        var cartaName = textbox.getValue();
        var chosenCarta = ee.Feature(
            cartas.filter(ee.Filter.eq('grid_name', cartaName))
            .first()
        );
        var zoom = 8;
        beforeMap.centerObject(chosenCarta, zoom);
        linkedBeforeMap.centerObject(chosenCarta, zoom);
        afterMap.centerObject(chosenCarta, zoom);
        linkedAfterMap.centerObject(chosenCarta, zoom);
    }
});
var cartaPanel = ui.Panel([textbox, button], ui.Panel.Layout.Flow('vertical', true), {
    stretch: 'both',
});
cartaPanel.style().set({
    position: 'bottom-right',
    width: '300px',
    height: '45px',
    margin: '0px',
    padding: '0px',
});
linkedAfterMap.add(cartaPanel);
var panel0 = ui.Panel(
    [
        // selectYear,
        splitPanelBefore
    ],
    ui.Panel.Layout.Flow('vertical', true), {
        stretch: 'both'
    }
);
// var panel1 = ui.Panel(
//     [splitPanelAfter],
//     ui.Panel.Layout.Flow('vertical', true), {
//         stretch: 'both'
//     }
// );
// var linker = ui.Map.Linker([beforeMap, afterMap]);
var panel = ui.Panel([
  panel0, 
  // panel1, 
  chart],
    ui.Panel.Layout.Flow('vertical'), {
        stretch: 'both'
    });
ui.root.widgets().reset([panel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));