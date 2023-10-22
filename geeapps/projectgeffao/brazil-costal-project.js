var protectedAreasBuffers = ui.import && ui.import("protectedAreasBuffers", "table", {
      "id": "users/projectgeffao/Brazil/MCPA_Areas_priority_Buffer"
    }) || ee.FeatureCollection("users/projectgeffao/Brazil/MCPA_Areas_priority_Buffer"),
    protectedAreas = ui.import && ui.import("protectedAreas", "table", {
      "id": "users/projectgeffao/Brazil/MCPA_Areas_v4"
    }) || ee.FeatureCollection("users/projectgeffao/Brazil/MCPA_Areas_v4"),
    coastalSamGe = ui.import && ui.import("coastalSamGe", "table", {
      "id": "users/projectgeffao/Brazil/CoastalSamGeData_V4"
    }) || ee.FeatureCollection("users/projectgeffao/Brazil/CoastalSamGeData_V4");
// Authors for this App are:
// Ingrid Teich - ingridteich@gmail.com
// Eugenia Raviolo - eugenia.raviolo@gmail.com
// Cesar Garcia - cesarnon@gmail.com 
// global
var roi = null;
var selectedRoiLayer = null;
var palettes = require('users/gena/packages:palettes');
// LAYERS NAMES
var layerNameAOI = "Project Protected Areas";
var layerNameLPD = "Land Productivity Dynamics (LPD) 2001-2020";
var layerNameLC = "Land Cover 2019 (MapBiomas)";
var layerNameLC90 = "Land Cover 1990 (MapBiomas)";
var layerNameFGL = "Forest Gain & Loss 1990-2019";
var layerNamechla20 = "Chlorophyll a 2020 [mg/m3] (MODIS)";
var layerNamesst20 = "Sea Surface Temp. 2020 [°C] (MODIS)";
var layerNameFI = "Fire Recurrence Index 2001-2020 (MCD64)";
var layerNamechlaTrend = "Trend in Chlorophyll a 2001-2020";
var layerNamesstTrend = "Trend in Sea Surface Temp. 2001-2020";
var layerNamePAB = "Priority areas buffers";
var layerNameBiomas = 'Biomas';
var layerNameSamGe = 'PA Effectiveness 2017-2020 (SAMGe)';
var titleAllPA = "Project Protected Areas Information";
var titleSelectedPA = "Protected area of interest selected";
;// LAYERS
var protectedAreasBuffers = ee.FeatureCollection("users/projectgeffao/Brazil/MCPA_Areas_priority_Buffer");
var lpdImage = ee.Image('users/projectgeffao/Brazil/LPD_world_2001_2020_Brazil_v2');
var lcImage = ee.Image('users/projectgeffao/Brazil/MapBiomas_2019_rec');
var lcImage90 = ee.Image('users/projectgeffao/Brazil/MapBiomas_1990_Rec');
var ForestGainLoss = ee.Image('users/projectgeffao/Brazil/MapBiomas_change90_19_1loss_2gain')
var chla2020 = ee.Image('users/projectgeffao/Brazil/MODIS_L3SMI_chla2020')
var sst2020 = ee.Image('users/projectgeffao/Brazil/MODIS_L3SMI_sst2020')
var fireIndex = ee.Image('users/projectgeffao/Brazil/MCD64_FireRecurrenceIndex_2001_2020_Brazil')
//Trend in Chlorophyll
var TrendCHLA = ee.Image('users/projectgeffao/Brazil/MODIS_L3SMI_TrendCHLA_2001_2020')
//Trend in Sea Surface Temp
var TrendSST = ee.Image('users/projectgeffao/Brazil/MODIS_L3SMI_TrendSST_2001_2020')
// Biomas
var biomasImage = ee.Image('users/projectgeffao/Brazil/Biomas_raster50');
var biomasFC = ee.FeatureCollection('users/projectgeffao/Brazil/Biomas_fixed_wgs84');
var paletteCHLAtrend = ['#cc2919', '#8fd3f7', '#36c42a']
var namesCHLAtrend = [
    "Decreasing",
    "Stable",
    "Increasing"
];
var visCHLAtrend = { max: 3, min: 1, palette: paletteCHLAtrend }
var paletteBiomas = [
    '#33a02b',
    '#ca6c14',
    '#8d9a62',
    '#c26ae2',
    '#bc4762',
    '#1eb3cb'];
var namesBiomas = [
    "Amazonia",
    "Caatinga",
    "Cerrado",
    "MataAtlantica",
    "Pampa",
    "Pantanal"
];
var visBiomas = { max: 6, min: 1, palette: paletteBiomas }
var paletteSSTtrend = ['#233aff', '#8fd3f7', '#cc2919']
var namesSSTtrend = [
    "Decreasing SST",
    "Stable SST",
    "Increasing SST"
];
var visSSTtrend = { max: 3, min: 1, palette: paletteSSTtrend }
var types = [
    "APA",
    "MONA",
    "PARNA",
    "REBIO",
    "RESEX",
    "REVIS"
];
var typesLegend = [
    "APA: Área de proteção ambiental",
    "MONA: Monumento natural",
    "PARNA: Parque nacional ",
    "REBIO: Reserva biológica",
    "RESEX: Reserva extrativista",
    "REVIS: Refugio de vida silvestre",
    "Buffer"
];
var paletteTypes = [
    "FF0000", // red
    "00FF80", // green
    "FF8000", // orange
    "FFFF33", // yellow
    "FF33FF",// pink
    "C0C0C0",// gray
    "white"
];
var namesEffectiveness = ['Highest (>65%)',
    'High (60-65%)',
    'Medium (55-60%)',
    'Low (50-55%)',
    'Lowest (<50%)'];
var paletteEffectiveness = ['#00b050',
    '#92d050',
    '#ffff66',
    '#e26b0a',
    '#ff0000'];
var paletteEffectivenessOp = ['#00b05070',
    '#92d05070',
    '#ffff6670',
    '#e26b0a70',
    '#ff000070'];
var typesEffectiveness = ['VERY_HIGH',
    'HIGH',
    'MODERATE',
    'LOW',
    'VERY_LOW'];
var paletteList = ee.List(paletteTypes);
var typesList = ee.List(types);
var protectedAreasStyled = protectedAreas.map(function (f) {
    f = f.set({ style: { color: paletteList.get(typesList.indexOf(f.get("sigla"))), fillColor: "00000000" } });
    return ee.Algorithms.If(ee.Number(f.get('priority')).eq(1),
        f.set('nombre', ee.String('(Priority area) ').cat(f.get('nombre'))),
        f);
});
var paletteEffList = ee.List(paletteEffectiveness);
var paletteEffListOp = ee.List(paletteEffectivenessOp);
var typesEffList = ee.List(typesEffectiveness);
var paWithSamGe = protectedAreasStyled.map(function (f) {
    var sg = coastalSamGe.filterMetadata("nombre", "equals", f.get('nombre')).first();
    sg = sg.set({ style: { color: paletteEffList.get(typesEffList.indexOf(sg.get("eff_average_cat"))), fillColor: paletteEffListOp.get(typesEffList.indexOf(sg.get("eff_average_cat"))) } });
    return f.set(sg.toDictionary())
});
paWithSamGe = paWithSamGe.sort('eff_average');
var protectedAreasBuffersRenamed = protectedAreasBuffers.map(function (f) {
    return ee.Algorithms.If(ee.String(f.get('nombre')).compareTo(ee.String('APA - BALEIA FRANCA')).eq(0),
        null, f.set('nombre', ee.String('(Priority area) ').cat(f.get('nombre')))
    );
}, true);
var areasNames = protectedAreasStyled
    .reduceColumns(ee.Reducer.toList(), ['nombre'])
    .get('list').getInfo();
areasNames = areasNames.slice().sort();
/*** VISUALIZATION AND CATEGORIES */
// LC
var namesLC = ['NoData', 'Natural Tree-covered', 'Grassland', 'Cultivated/Pastureland', 'Wetland', 'Artificial', 'Other land', 'Water body', 'Mangrove', 'Forest Plantation', 'Savanna'];
var paletteLC = ['black', '#377e3f', '#c19511', '#fcdb00', '#18eebe', '#d7191c', '#cfdad2', '#4458eb', '#3bfd45', '#a55aba', '#49a753']
//LPD
var paletteLPD = ["#000000", "#ff0000", "#ffbebe", "#ffff73", "#a3ff73", "#267300"];
var namesLPD = [
    "NoData",
    "Declining",
    "Early sign of decline",
    "Stable but stressed",
    "Stable",
    "Increasing",
];
//FGL - Forest gain loss
var paletteFGL = ['#d63000', '#4ca739'];
var namesFGL = [
    "Forest Loss",
    "Forest Gain",
];
// CHLA Clorofila a
var paletteCHLA = ['3500a8', '0800ba', '003fd6',
    '00aca9', '77f800', 'ff8800',
    'b30000', '920000', '880000']
// SST Sea Surface Temperature
var paletteSST = palettes.colorbrewer.Spectral[10].reverse()
//FI Fire Recurrence index
var paletteFI = ["f9a1ff", "cd85d2", "fff147", "ffb039", "e28a3f", "ff593f", "c82106"];
// VISUALIZATIONS
var visLPD = { max: 5, min: 0, opacity: 1, palette: paletteLPD };
var visLC = { max: 10, min: 0, opacity: 1, palette: paletteLC };
var visFGL = { max: 2, min: 1, palette: paletteFGL };
var visFI = { max: 1, min: 0, palette: paletteFI };
var visCHLA = { max: 2, min: -2, palette: paletteCHLA };
var visSST = { max: 32, min: 22, palette: paletteSST };
var visBorderHighlight = { color: "black", fillColor: "00000000" };
var visBorderBuffer = { color: "white", fillColor: "00000000" };
// RENAMING AND AREA CALCULATIONS
// LPD image renamed and area
var renamedImageLPD = lpdImage.eq([0, 1, 2, 3, 4, 5]).rename(namesLPD);
var areaImageLPD = renamedImageLPD.multiply(ee.Image.pixelArea()).divide(10000);
// LC 2019 image renamed and area
var lcImageAux = lcImage.unmask().where(lcImage.unmask().eq(0), 7);
var renamedImageLC = lcImageAux.eq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).rename(namesLC);
var areaImageLC = renamedImageLC.multiply(ee.Image.pixelArea()).divide(10000);
// LC 1990 image renamed and area
var lcImageAux1990 = lcImage90.unmask().where(lcImage.unmask().eq(0), 7);
var renamedImageLC1990 = lcImageAux1990.eq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).rename(namesLC);
var areaImageLC1990 = renamedImageLC1990.multiply(ee.Image.pixelArea()).divide(10000);
// NDVI
var startYear = 2001;
var endYear = 2020;
var modis = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(startYear + '-01-01', endYear + '-12-31');
var yearsList = ee.List.sequence(startYear, endYear);
// by month and year
var modisFilter = modis.select('NDVI');
var monthsList = ee.List.sequence(1, 12);
var byMonthYear = ee.ImageCollection.fromImages(
    yearsList.map(function (y) {
        return monthsList.map(function (m) {
            return modisFilter
                .filter(ee.Filter.calendarRange(y, y, 'year'))
                .filter(ee.Filter.calendarRange(m, m, 'month'))
                .mean()
                .set('system:time_start', ee.Date.fromYMD(y, m, 1));
        });
    }).flatten());
// by year
// Get the NDVI Annual mean for every calendar Year and replace bad quality pixels with anual mean
var byYearNDVI = ee.ImageCollection.fromImages(
    yearsList.map(function (y) {
        // get the subset for the target year
        var modisYear = modis.filter(ee.Filter.calendarRange(y, y, 'year'));
        // get the mean for NDVI
        var modisYearMean = modisYear.select('NDVI').mean();
        // function to replace bad pixels with the mean
        var maskQAYear = function (image) {
            var imageAux = image.select('NDVI').where(image.select("SummaryQA").gte(2), modisYearMean);
            return imageAux.rename('NDVI');
        };
        var modisYearCorrected = modisYear.map(maskQAYear);
        var modisYearCorrectedMean = modisYearCorrected.mean()
            .set('year', y)
            .set('system:time_start', ee.Date.fromYMD(y, 1, 1))
            .rename('AM All');
        modisYearCorrectedMean = modisYearCorrectedMean.addBands(modisYearCorrected.mean().mask(lcImage.eq(1)).rename('Natural Tree-covered'))
            .addBands(modisYearCorrected.mean().mask(lcImage.eq(8)).rename('Mangrove'))
            .addBands(modisYearCorrected.mean().mask(lcImage.eq(10)).rename('Savanna'));
        //10-sabana, 1-tree covered y 8-mangrove
        return modisYearCorrectedMean;
    }));
// ocean data
var MODISchla = ee.ImageCollection("NASA/OCEANDATA/MODIS-Terra/L3SMI")
//Modis anual chla
var year_endMODISchla = 2020
var year_startMODISchla = 2001
var yearsMODISchla = ee.List.sequence(year_startMODISchla, year_endMODISchla);
var byYearMODISchla = ee.ImageCollection.fromImages(
    yearsMODISchla.map(function (y) {
        //get the subset for the target year
        var imgYear = MODISchla.filter(ee.Filter.calendarRange(y, y, 'year'));
        //get the mean for NDVI
        var imgYearSum = imgYear.select('chlor_a').mean().rename('CHLA')
            .addBands(imgYear.select('sst').mean().rename('SST'));
        var Annual = imgYearSum
            .set('year', y)
            .set('system:time_start', ee.Date.fromYMD(y, 1, 1))
        //.rename(nn.cat(ee.String(ee.Number(y).toInt()))); // to name each band like "NDVI_yyyy"
        return Annual.addBands(Annual.metadata('year').rename('time'))
    }));
/*** COMPONENTS */
var rootPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
        height: "100%",
        width: "100%",
    }
});
var controlPanel = ui.Panel({
    style: {
        height: "100%",
        width: "18%",
    }
});
var mapPanel = ui.Panel({
    style: {
        height: "100%",
        width: "70%",
    }
});
var outputPanel = ui.Panel({
    style: {
        height: "100%",
        width: "30%",
    }
});
var splitMapOutput = ui.SplitPanel(mapPanel, outputPanel);
/*** CONTROL_PANEL_BEG */
var intro = ui.Label("Brazil Coastal and Marine Project", {
    fontWeight: "bold",
    fontSize: "20px",
    margin: "10px 5px",
});
var subtitleExpl = ui.Label({
    value:
        "This app is being built to support the PPG process of the project “Sustaining Healthy Coastal and Marine Ecosystems Project” (GEF ID: 10190) in Brazil. ",
    style: { fontSize: "12px" },
});
var subtitleSelect = ui.Label({
    value:
        "To get statistics, you can either click a protected area in the map or select it from the list below:",
    style: { fontSize: "12px" },
});
// Add title and description to the panel
controlPanel
    .add(intro)
    .add(subtitleExpl)
    .add(subtitleSelect);
var lblAOI = ui.Label({
    value: "Protected areas of interest:",
    style: { fontSize: "14px", fontWeight: "bold" },
});
// Define the select LIST for the AOI (project areas)
var selectAoi = ui.Select({
    items: areasNames,
    style: { width: "90%" },
    placeholder: "Select protected area of interest",
    onChange: function (value) {
        selectArea(value);
    },
});
// Add the select AOI panel to the map panel.
controlPanel.add(lblAOI).add(selectAoi);
// LEGEND AREA TYPES 
// Map legends
var makeColorBarParams = function (palette) {
    return {
        bbox: [0, 0, 1, 0.1],
        dimensions: "100x10",
        format: "png",
        min: 0,
        max: 1,
        palette: palette,
    };
};
// LEGEND_SURFACE_TEMPERATURE_BEG
var colorBarSST = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(visSST.palette),
    style: { stretch: "horizontal", margin: "0px 8px", maxHeight: "24px" },
});
var legendLabelSST = ui.Panel({
    widgets: [
        ui.Label(visSST.min, { margin: "4px 8px" }),
        ui.Label(visSST.max / 2, {
            margin: "4px 8px",
            textAlign: "center",
            stretch: "horizontal",
        }),
        ui.Label(visSST.max, { margin: "4px 8px" }),
    ],
    layout: ui.Panel.Layout.flow("horizontal"),
});
var legendSST = ui.Panel({
    widgets: [colorBarSST, legendLabelSST],
    style: {
        position: "bottom-left",
    },
});
// LEGEND_SURFACE_TEMPERATURE_END
// LEGEND_FIRE_INDEX_BEG
var colorBarFI = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(visFI.palette),
    style: { stretch: "horizontal", margin: "0px 8px", maxHeight: "24px" },
});
var legendLabelFI = ui.Panel({
    widgets: [
        ui.Label(visFI.min, { margin: "4px 8px" }),
        ui.Label(visFI.max / 2, {
            margin: "4px 8px",
            textAlign: "center",
            stretch: "horizontal",
        }),
        ui.Label(visFI.max, { margin: "4px 8px" }),
    ],
    layout: ui.Panel.Layout.flow("horizontal"),
});
var legendFI = ui.Panel({
    widgets: [colorBarFI, legendLabelFI],
    style: {
        position: "bottom-left",
    },
});
// LEGEND_FIRE_INDEX_END
// LEGEND_CHLA_BEG
var colorBarCHLA = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(visCHLA.palette),
    style: { stretch: "horizontal", margin: "0px 8px", maxHeight: "24px" },
});
var legendLabelCHLA = ui.Panel({
    widgets: [
        ui.Label(0, {
            margin: "4px 8px", textAlign: "left",
            stretch: "horizontal",
        }),
        ui.Label(0.1, { margin: "4px 8px" }),
        ui.Label(1, {
            margin: "4px 8px", textAlign: "center",
            stretch: "horizontal",
        }),
        //ui.Label(1, { margin: "4px 8px" }),
        // ui.Label(10, { margin: "4px 8px" }),
        ui.Label(10, {
            margin: "4px 8px", textAlign: "center",
            stretch: "horizontal",
        }),
        ui.Label(100, { margin: "4px 8px", }),
    ],
    layout: ui.Panel.Layout.flow("horizontal"),
});
var legendCHLA = ui.Panel({
    widgets: [colorBarCHLA, legendLabelCHLA],
    style: {
        position: "bottom-left",
    },
});
// LEGEND_CHLA_END
// LAYERS_PANEL_BEG
// SHOW_LEGENDS CHECKBOXES
var chbAOI = ui.Checkbox(layerNameAOI, false);
var chbLC90 = ui.Checkbox(layerNameLC90, false);
var chbLC = ui.Checkbox(layerNameLC, false);
var chbLPD = ui.Checkbox(layerNameLPD, false);
var chbFGL = ui.Checkbox(layerNameFGL, false);
var chbCHLA = ui.Checkbox(layerNamechla20, false);
var chbSST = ui.Checkbox(layerNamesst20, false);
var chbFR = ui.Checkbox(layerNameFI, false);
var chbCHLATrend = ui.Checkbox(layerNamechlaTrend, false);
var chbSSTTrend = ui.Checkbox(layerNamesstTrend, false);
var chbBiomas = ui.Checkbox(layerNameBiomas, false);
var chbSamGe = ui.Checkbox(layerNameSamGe, false);
var lpAOI = ui.Panel();
lpAOI.widgets().set(0, createLegendPanel(typesLegend, paletteTypes));
lpAOI.style().set({ shown: false });
var lpLC = ui.Panel();
lpLC.widgets().set(0, createLegendPanel(namesLC.slice(1), paletteLC.slice(1)));
lpLC.style().set({ shown: false });
var lpLC90 = ui.Panel();
lpLC90.widgets().set(0, createLegendPanel(namesLC.slice(1), paletteLC.slice(1)));
lpLC90.style().set({ shown: false });
var lpLPD = ui.Panel();
lpLPD.widgets().set(0, createLegendPanel(namesLPD.slice(1), paletteLPD.slice(1)));
lpLPD.style().set({ shown: false });
var lpFGL = ui.Panel();
lpFGL.widgets().set(0, createLegendPanel(namesFGL, paletteFGL));
lpFGL.style().set({ shown: false });
var lpCHLA = ui.Panel();
lpCHLA.widgets().set(0, legendCHLA);
lpCHLA.style().set({ shown: false });
var lpSTT = ui.Panel();
lpSTT.widgets().set(0, legendSST);
lpSTT.style().set({ shown: false });
var lpFR = ui.Panel()
lpFR.widgets().set(0, legendFI);
lpFR.style().set({ shown: false });
var lpCHLATrend = ui.Panel();
lpCHLATrend.widgets().set(0, createLegendPanel(namesCHLAtrend, paletteCHLAtrend));
lpCHLATrend.style().set({ shown: false });
var lpSSTTrend = ui.Panel();
lpSSTTrend.widgets().set(0, createLegendPanel(namesSSTtrend, paletteSSTtrend));
lpSSTTrend.style().set({ shown: false });
var lpBiomas = ui.Panel();
lpBiomas.widgets().set(0, createLegendPanel(namesBiomas, paletteBiomas));
lpBiomas.style().set({ shown: false });
var lpSamGe = ui.Panel();
lpSamGe.widgets().set(0, createLegendPanel(namesEffectiveness, paletteEffectiveness));
lpSamGe.style().set({ shown: false });
var showLayer = function (name, shown) {
    var names = []
    standaloneMap.layers().forEach(function (l) {
        names.push(l.getName())
    })
    var index = names.indexOf(name)
    if (index > -1) {
        standaloneMap.layers().get(index).setShown(shown);
    }
}
chbAOI.onChange(function (checked) {
    lpAOI.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNamePAB, checked);
    showLayer(layerNameAOI, checked);
});
chbLC90.onChange(function (checked) {
    var shl = checked;
    if (!checked && !chbLC.getValue()) {
        shl = false;
    }
    else if (!checked && chbLC.getValue()) {
        shl = true;
    }
    lpLC.style().set({
        shown: chbShowLegends.getValue() ? shl : false
    });
    showLayer(layerNameLC90, checked);
});
chbLC.onChange(function (checked) {
    var shl = checked;
    if (!checked && !chbLC90.getValue()) {
        shl = false;
    }
    else if (!checked && chbLC90.getValue()) {
        shl = true;
    }
    lpLC.style().set({
        shown: chbShowLegends.getValue() ? shl : false
    });
    showLayer(layerNameLC, checked);
});
chbLPD.onChange(function (checked) {
    lpLPD.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNameLPD, checked);
});
chbFGL.onChange(function (checked) {
    lpFGL.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNameFGL, checked);
});
chbFR.onChange(function (checked) {
    lpFR.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNameFI, checked);
});
chbCHLA.onChange(function (checked) {
    lpCHLA.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNamechla20, checked);
});
chbSST.onChange(function (checked) {
    lpSTT.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNamesst20, checked);
});
chbCHLATrend.onChange(function (checked) {
    lpCHLATrend.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNamechlaTrend, checked);
});
chbSSTTrend.onChange(function (checked) {
    lpSSTTrend.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNamesstTrend, checked);
});
chbBiomas.onChange(function (checked) {
    lpBiomas.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNameBiomas, checked);
});
chbSamGe.onChange(function (checked) {
    lpSamGe.style().set({
        shown: chbShowLegends.getValue() ? checked : false
    });
    showLayer(layerNameSamGe, checked);
});
var legendListChb = [chbAOI, chbLC90, chbLC, chbLPD, chbBiomas, chbSamGe, chbFGL, chbFR, chbCHLA, chbCHLATrend, chbSST, chbSSTTrend];
var legendListPanel = [lpAOI, lpLC90, lpLC, lpLPD, lpBiomas, lpSamGe, lpFGL, lpFR, lpCHLA, lpCHLATrend, lpSTT, lpSSTTrend];
var lblLayersLegends = ui.Label({
    value: 'Layers',
    style: { fontSize: "14px", fontWeight: "bold" },
});
var chbShowLegends = ui.Checkbox('Show Legends', true);
chbShowLegends.onChange(function (show) {
    legendListChb.map(function (chbw, i) {
        if (i != 1 && i != 2 && chbw.getValue()) {
            legendListPanel[i].style().set({
                shown: show
            });
        }
    });
    // 1 y 2
    if (legendListChb[1].getValue() || legendListChb[2].getValue()) {
        legendListPanel[2].style().set({
            shown: show
        });
    }
});
var layersPanel = ui.Panel({
    layout: ui.Panel.Layout.flow("horizontal"),
    style: { width: "96%" },
    widgets: [lblLayersLegends, chbShowLegends]
});
controlPanel.add(layersPanel);
legendListChb.map(function (chbw, i) {
    controlPanel.add(chbw);
    controlPanel.add(legendListPanel[i]);
});
// LAYERS_PANEL_END
// For more information
var lblMoreInfo = ui.Label({
    value:
        "Click here for more information about this project.",
    style: { fontSize: "12px" },
});
lblMoreInfo.setUrl('https://docs.google.com/document/d/e/2PACX-1vRVGkKch48E1MVZMvbNbPClFPq8a9F3pkmWfghfmwAl4U6vj5XtMytmiAi0p6upDSjp_K5KcPiMV3zY/pub');
controlPanel.add(lblMoreInfo);
// Footnote contact info
var lblDeveloped = ui.Label({
    value:
        'App developed by FAO - GEF project team. For questions and feedback please contact: ',
    style: { fontSize: "12px" },
});
var lblEmail = ui.Label({
    value:
        'cesar.garcia@fao.org',
    style: { fontSize: "12px" },
});
lblEmail.setUrl('mailto:cesar.garcia@fao.org');
controlPanel.add(lblDeveloped).add(lblEmail);
/*** CONTROL_PANEL_END */
/*** OUTPUT_PANEL_BEG */
// intro panel 
var introPanel = ui.Panel([
    ui.Label({
        value: titleSelectedPA,
        style: { fontSize: "18px", fontWeight: "bold" },
    }),
]);
// messages
var messageLabel = ui.Label(" \n\r");
messageLabel.style().set({
    height: "30px",
    margin: "3%",
    padding: "12px",
    width: "94%",
    textAlign: "left",
    fontFamily: "monospace",
    backgroundColor: "FFFFAA",
    shown: false,
});
// roi panel
var roiTextBox = ui.Textbox({
    placeholder: "Protected area name...",
    style: { width: "60%" },
    disabled: true,
});
var roiAreaTextBox = ui.Textbox({
    placeholder: "Ha...",
    style: { width: "30%" },
    disabled: true,
});
var roiPanel = ui.Panel({
    layout: ui.Panel.Layout.flow("horizontal"),
    style: { width: "96%" },
    widgets: [roiTextBox, roiAreaTextBox]
});
outputPanel.add(introPanel);
outputPanel.add(messageLabel);
outputPanel.add(roiPanel);
// charts panels
var chartsPanel1 = ui.Panel();
var chartsPanel2 = ui.Panel();
var chartsPanel3 = ui.Panel();
var chartsPanel4 = ui.Panel();
var chartsPanel5 = ui.Panel();
var chartsPanel6 = ui.Panel();
var chartsPanel7 = ui.Panel();
var chartsPanel8 = ui.Panel();
var chartsPanel9 = ui.Panel();
var chartsPanel10 = ui.Panel();
var chartsPanel11 = ui.Panel();
var chartsPanelsList = [chartsPanel1, chartsPanel2, chartsPanel3, chartsPanel4, chartsPanel5, chartsPanel6, chartsPanel7, chartsPanel8, chartsPanel9, chartsPanel10, chartsPanel11];
chartsPanelsList.map(function (chpw) {
    outputPanel.add(chpw);
});
/*** OUTPUT_PANEL_END */
/*** MAP_PANEL_BEG */
// Configure the map panel.
var standaloneMap = ui.Map().setOptions('HYBRID');
standaloneMap.setControlVisibility(true, false, true, true, true, true, false);
mapPanel.add(standaloneMap);
// Map layers
standaloneMap.addLayer(chla2020.visualize(visCHLA), {}, layerNamechla20, false);
standaloneMap.addLayer(biomasImage.visualize(visBiomas), {}, layerNameBiomas, false);
standaloneMap.addLayer(lcImage90.visualize(visLC), {}, layerNameLC90, false);
standaloneMap.addLayer(lcImage.visualize(visLC), {}, layerNameLC, false);
standaloneMap.addLayer(lpdImage.visualize(visLPD), {}, layerNameLPD, false);
standaloneMap.addLayer(ForestGainLoss.visualize(visFGL), {}, layerNameFGL, false);
standaloneMap.addLayer(fireIndex.visualize(visFI), {}, layerNameFI, false);
standaloneMap.addLayer(chla2020.visualize(visCHLA), {}, layerNamechla20, false);
standaloneMap.addLayer(TrendCHLA.visualize(visCHLAtrend), {}, layerNamechlaTrend, false);
standaloneMap.addLayer(sst2020.visualize(visSST), {}, layerNamesst20, false);
standaloneMap.addLayer(TrendSST.visualize(visSSTtrend), {}, layerNamesstTrend, false);
standaloneMap.addLayer(paWithSamGe.style({ styleProperty: "style" }), {}, layerNameSamGe, false);
standaloneMap.addLayer(protectedAreasBuffersRenamed.style(visBorderBuffer), {}, layerNamePAB, false);//10
standaloneMap.addLayer(protectedAreasStyled.style({ styleProperty: "style" }), {}, layerNameAOI, false);//11
/* function to handle click on subbasins layer */
var handleClick = function (coords) {
    roiTextBox.setValue("Loading...");
    roiAreaTextBox.setValue("Loading...");
    //roi = protectedAreasStyled.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
    roi = paWithSamGe.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
    roi.size().getInfo(function (pSize) {
        if (pSize > 0) {
            setSelectedRoi();
        } else {
            noAreaSelected();
        }
    });
};
// Map events
standaloneMap.onClick(handleClick);
// onload
chbAOI.setValue(true);
chbLC.setValue(true);
chbCHLA.setValue(true);
// Map parameters
// default center area
standaloneMap.centerObject(protectedAreasStyled);
standaloneMap.style().set("cursor", "crosshair");
function resetGeneralView() {
    standaloneMap.centerObject(protectedAreasStyled);
    noAreaSelected();
    createChartEffectiveness();
    roiPanel.style().set({
        shown: false,
    });
    introPanel.widgets().get(0).setValue(titleAllPA);
}
var btnResetView = ui.Button({
    label: 'Reset view',
    style: {
        position: "bottom-right",
    },
    onClick: function () {
        resetGeneralView();
    },
});
standaloneMap.add(btnResetView);
resetGeneralView();
function createChartEffectiveness() {
    // combochart all
    var fcEffAll = paWithSamGe.map(function (f) {
        var name = f.get(ee.String('nombre'));
        var average = f.get(ee.String('eff_average'));
        //var average = f.get(ee.String('eff_2020'));
        var cat = f.get('eff_average_cat');
        var color = paletteEffList.get(typesEffList.indexOf(cat));
        var row = ee.List([name, average, color]);
        //var row = ee.List([i, value]);
        return ee.Feature(null, { row: row });
    });
    var headerEffAll = ee.List([
        [
            { label: "Protected area", role: "domain", type: "string" },
            { label: "Effectiveness", role: "data", type: "number" },
            { label: "color", role: "style", type: "string" },
        ],
    ]);
    var optionsEffAll = {
        title: "SAMGe PA Management Effectiveness 2017-2020 (%)",
        legend: { position: "none" },
        //series: { 1: { type: "line" } },
    };
    createChart(
        fcEffAll,
        headerEffAll,
        optionsEffAll,
        "ColumnChart",
        chartsPanel8
    );
}
/*** MAP_PANEL_END*/
/*** COMPOSITION */
ui.root.clear();
ui.root.add(rootPanel);
rootPanel.add(controlPanel);
rootPanel.add(splitMapOutput);
/*** FUNCTIONS_BEG */
function createLegendPanel(pNames, pPalette) {
    var legendPanel = ui.Panel({
        style: {
            margin: "5px 5px"
        },
    }),
        entry;
    // create and add title labels
    // create and add references labels
    for (var x = 0; x < pNames.length; x++) {
        entry = [
            ui.Label({
                style: {
                    color: pPalette[x],
                    border: "1px solid black",
                    margin: "1px 1px 4px 1px",
                },
                value: "██",
            }),
            ui.Label({
                value: pNames[x],
                style: {
                    margin: "1px 1px 4px 4px",
                    fontSize: "12px",
                },
            }),
        ];
        legendPanel.add(ui.Panel(entry, ui.Panel.Layout.Flow("horizontal")));
    }
    return legendPanel; // title + references
}
/* function to show/hide message box*/
function setShownMessagesBox(vis) {
    messageLabel.style().set({
        shown: vis,
    });
}
/* function to create a chart  */
function createChart(
    pFeaturesList,
    pColumnHeader,
    pOptions,
    pChartType,
    pPanel
) {
    pPanel.widgets().set(
        0,
        ui.Label({
            value: "Generating chart: " + pOptions.title + "...",
            style: { color: "gray" },
        })
    );
    var dataTableServer = ee
        .FeatureCollection(pFeaturesList)
        .aggregate_array("row");
    dataTableServer = pColumnHeader.cat(dataTableServer);
    dataTableServer.evaluate(function (dataTableClient) {
        //print(dataTableClient);
        var chart = ui
            .Chart(dataTableClient)
            .setChartType(pChartType)
            .setOptions(pOptions);
        pPanel.widgets().set(0, chart);
        //if(pPanel==chartsPanel8)
          pPanel.widgets().set(1, ui.Label('SAMGe Report',{margin:'5px 5px', padding:'5px 5px', textAlign: 'center'}).setUrl('testing'));
    });
}
/* function  to select roi and show name and area of area selected */
function selectArea(pValue) {
    roi = paWithSamGe.filterMetadata("nombre", "equals", pValue);
    setSelectedRoi();
}
/* function  to select roi and show name and area of area selected */
function setSelectedRoi() {
    roiPanel.style().set({
        shown: true,
    });
    introPanel.widgets().get(0).setValue(titleSelectedPA);
    if (roi !== null) {
        //print(roi);
        roiTextBox.setValue("Loading...");
        roiAreaTextBox.setValue("Loading...");
        var propLabelName = "nombre";
        var propLabelArea = "hectarea";
        roi.first().get(propLabelName).getInfo(function (pName) {
            roiTextBox.setValue(pName);
            selectAoi.unlisten();
            selectAoi.setValue(pName);
            selectAoi.onChange(selectArea);
        });
        roi.first().get(propLabelArea).getInfo(function (pArea) {
            roiAreaTextBox.setValue(pArea.toFixed(0) + " ha.");
        });
        if (selectedRoiLayer !== null)
            standaloneMap.remove(selectedRoiLayer);
        setShownMessagesBox(false);
        selectedRoiLayer = ui.Map.Layer(ee.FeatureCollection(roi).style(visBorderHighlight), {}, 'Protected area selected');
        standaloneMap.centerObject(roi);
        standaloneMap.layers().set(15, selectedRoiLayer);
        clearOutput();
        // create charts
        setupCharts();
    }
}
function setupCharts() {
    // COMPARISON LC CHART
    var eeListLCNames = ee.List(namesLC.slice(1));
    var statsAreaImageLC1990 = areaImageLC1990.reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: roi.geometry(),
        maxPixels: 1e13,
        scale: 30,
    });
    var statsAreaImageLC2019 = areaImageLC.reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: roi.geometry(),
        maxPixels: 1e13,
        scale: 30,
    });
    var fcLC = ee.List(namesLC).map(function (label) {
        var val1990 = statsAreaImageLC1990.get(label);
        var val2019 = statsAreaImageLC2019.get(label);
        var row = ee.List([label, val1990, val2019]);
        return ee.Feature(null, { 'row': row });
    });
    var columnHeaderLC = ee.List([[
        { label: 'LC', role: 'domain', type: 'string' },
        { label: '1990', role: 'old-data', type: 'number' },
        { label: '2019', role: 'data', type: 'number' }
    ]]);
    var optionsLC = {
        title: 'Land Cover Change 1990-2019 inside PA',
        height: 350,
        legend: { position: "top", maxLines: 1 },
        colors: paletteLC,
        diff: {
            oldData: {
                opacity: 0.7,
                tooltip: {
                    prefix: '1990:'
                }
            },
            newData: {
                opacity: 1,
                tooltip: {
                    prefix: '2019:'
                }
            }
        }
    };
    createChart(fcLC, columnHeaderLC, optionsLC, "PieChart", chartsPanel1);
    // if priority area calculate lc of buffer
    var areaName = roi.first().get('nombre').getInfo();
    var priorityArea = areaName.indexOf('Priority') >= 0;
    var buf;
    if (priorityArea) {
        buf = protectedAreasBuffersRenamed.filterMetadata("nombre", "equals", areaName);
        var statsAreaImageLCBuffer1990 = areaImageLC1990.reduceRegion({
            reducer: ee.Reducer.sum(),
            geometry: buf.first().geometry(),
            maxPixels: 1e13,
            scale: 30,
        });
        var statsAreaImageLCBuffer2019 = areaImageLC.reduceRegion({
            reducer: ee.Reducer.sum(),
            geometry: buf.first().geometry(),
            maxPixels: 1e13,
            scale: 30,
        });
        var fcLCBuf = ee.List(namesLC).map(function (label) {
            var val1990 = statsAreaImageLCBuffer1990.get(label);
            var val2019 = statsAreaImageLCBuffer2019.get(label);
            var row = ee.List([label, val1990, val2019]);
            return ee.Feature(null, { 'row': row });
        });
        var columnHeaderLCBuffer = ee.List([[
            { label: 'LC Buffer', role: 'domain', type: 'string' },
            { label: '1990', role: 'old-data', type: 'number' },
            { label: '2019', role: 'data', type: 'number' }
        ]]);
        var optionsLCBuffer = {
            title: "Land Cover Change 1990-2019 in buffer area",
            height: 350,
            legend: { position: "top", maxLines: 1 },
            colors: paletteLC,
            diff: {
                oldData: {
                    opacity: 0.7,
                    tooltip: {
                        prefix: '1990:'
                    }
                },
                newData: {
                    opacity: 1,
                    tooltip: {
                        prefix: '2019:'
                    }
                }
            }
        };
        createChart(fcLCBuf, columnHeaderLCBuffer, optionsLCBuffer, "PieChart", chartsPanel2);
    }
    // CHLA 
    var calChartCHLA = ui.Chart.image.series({
        imageCollection: byYearMODISchla.select('CHLA'),
        region: roi,
        reducer: ee.Reducer.mean(),
        scale: 250,
    });
    calChartCHLA.setOptions({
        title: 'Chlorophyll a Annual Time-series',
        vAxis: { title: 'Chlorophyll a [mg/m3]' },
        hAxis: { title: 'Year', format: 'yyyy', gridlines: { count: 7 } },
    });
    chartsPanel7.add(calChartCHLA);
    // SST
    var calChartSST = ui.Chart.image.series({
        imageCollection: byYearMODISchla.select('SST'),
        region: roi,
        reducer: ee.Reducer.mean(),
        scale: 250,
    });
    calChartSST.setOptions({
        title: 'Sea Surface Temperature Annual Time-series',
        vAxis: { title: 'Annual SST [°C]' },
        hAxis: { title: 'Year', format: 'yyyy', gridlines: { count: 7 } },
    });
    chartsPanel8.add(calChartSST);
    // lpd pie chart
    var landSum = lpdImage.gte(1).selfMask().reduceRegion({
        reducer: ee.Reducer.sum(),
        scale: 250,
        geometry: roi.geometry(),
        maxPixels: 1e28
    });
  // EFECTIVENESS
            var eeListLCEffYears = ee.List([2018, 2019, 2020]);
            var fcEffbyYear = eeListLCEffYears.map(function (i) {
                var value = roi.first().get(ee.String('eff_').cat(ee.String(i)));
                var average = roi.first().get(ee.String('eff_average'));
                var cat = roi.first().get(ee.String('eff_').cat(ee.String(i)).cat(ee.String("_cat")));
                var color = paletteEffList.get(typesEffList.indexOf(cat));
                var row = ee.List([i, value, color, average]);
                //var row = ee.List([i, value]);
                return ee.Feature(null, { row: row });
            });
            var headerEffByYear = ee.List([
                [
                    { label: "Year", role: "domain", type: "string" },
                    { label: "Effectiveness", role: "data", type: "number" },
                    { label: "color", role: "style", type: "string" },
                    { label: "Average", role: "data", type: "number" },
                ],
            ]);
            var optionsEffByYear = {
                title: "Effectiveness",
                legend: { position: "none" },
                series: { 1: { type: "line", color: "black" } },
            };
            createChart(
                fcEffbyYear,
                headerEffByYear,
                optionsEffByYear,
                "ColumnChart",
                chartsPanel7
            );
    landSum.evaluate(function (v) {
        if (v['fao_lpdclass'] > 0) {
            var eeListLPDNames = ee.List(namesLPD.slice(1));
            var statsAreaImageLPD = areaImageLPD.reduceRegion({
                reducer: ee.Reducer.sum(),
                geometry: roi.geometry(),
                maxPixels: 1e13,
                scale: 250,
            });
            var fcLPD;
            var columnHeaderLPD;
            var optionsLPD;
            if (priorityArea) {
                // double pie chart
                var statsAreaImageLPDBuffer = areaImageLPD.reduceRegion({
                    reducer: ee.Reducer.sum(),
                    geometry: buf.geometry(),
                    maxPixels: 1e13,
                    scale: 250,
                });
                fcLPD = eeListLPDNames.map(function (label) {
                    var valArea = statsAreaImageLPD.get(label);
                    var valBuffer = statsAreaImageLPDBuffer.get(label);
                    var row = ee.List([label, valArea, valBuffer]);
                    return ee.Feature(null, { 'row': row });
                });
                columnHeaderLPD = ee.List([[
                    { label: 'LPD', role: 'domain', type: 'string' },
                    { label: 'Area', role: 'old-data', type: 'number' },
                    { label: 'Buffer', role: 'data', type: 'number' }
                ]]);
                optionsLPD = {
                    title: 'Land Productivity Dynamics 2001-2020 in PA and Buffer',
                    height: 350,
                    legend: { position: "top", maxLines: 1 },
                    colors: paletteLPD.slice(1),
                    diff: {
                        oldData: {
                            opacity: 0.7,
                            tooltip: {
                                prefix: 'Area:'
                            }
                        },
                        newData: {
                            opacity: 1,
                            tooltip: {
                                prefix: 'Buffer:'
                            }
                        }
                    }
                };
            }
            else {
                // simple pie chart
                fcLPD = eeListLPDNames.map(function (name) {
                    var valor = statsAreaImageLPD.get(ee.String(name));
                    var row = ee.List([ee.String(name), valor]);
                    return ee.Feature(null, { row: row });
                });
                columnHeaderLPD = ee.List([
                    [
                        { label: "LPD", role: "domain", type: "string" },
                        { label: "Value", role: "data", type: "number" },
                    ],
                ]);
                optionsLPD = {
                    title: layerNameLPD,
                    height: 350,
                    legend: { position: "top", maxLines: 1 },
                    colors: paletteLPD.slice(1),
                };
            }
            createChart(fcLPD, columnHeaderLPD, optionsLPD, "PieChart", chartsPanel3);
            // lpd x lc
            //var eeListLCCat = ee.List.sequence(1, 10, 1);
            var eeListLCCat = ee.List([1, 2, 3, 4, 5, 6, 8, 9, 10]);
            var fcCombinedLC = eeListLCCat.map(function (i) {
                var areador = areaImageLPD.mask(lcImage.eq(ee.Number(i)));
                var statsArea = areador.reduceRegion({
                    reducer: ee.Reducer.sum(),
                    geometry: roi.geometry(),
                    maxPixels: 1e13,
                    scale: 30,
                });
                var v1 = statsArea.get(namesLPD[1]);
                var v2 = statsArea.get(namesLPD[2]);
                var v3 = statsArea.get(namesLPD[3]);
                var v4 = statsArea.get(namesLPD[4]);
                var v5 = statsArea.get(namesLPD[5]);
                var label = eeListLCNames.get(ee.Number(i).add(-1));
                var row = ee.List([label, v1, v2, v3, v4, v5]);
                return ee.Feature(null, { row: row });
            }, true);
            var columnHeaderC1 = ee.List([
                [
                    { label: "LC", role: "domain", type: "string" },
                    { label: namesLPD[1], role: "data", type: "number" },
                    { label: namesLPD[2], role: "data", type: "number" },
                    { label: namesLPD[3], role: "data", type: "number" },
                    { label: namesLPD[4], role: "data", type: "number" },
                    { label: namesLPD[5], role: "data", type: "number" },
                ],
            ]);
            var optionsC1 = {
                title: "LPD per Land Cover - Absolute",
                width: 600,
                height: 400,
                legend: { position: "top", maxLines: 3 },
                bar: { groupWidth: "75%" },
                isStacked: "absolute",
                colors: paletteLPD.slice(1),
            };
            createChart(
                fcCombinedLC,
                columnHeaderC1,
                optionsC1,
                "BarChart",
                chartsPanel4
            );
            var optionsC1R = {
                title: "LPD per Land Cover - Relative",
                width: 600,
                height: 400,
                legend: { position: "top", maxLines: 3 },
                bar: { groupWidth: "75%" },
                isStacked: "relative",
                colors: paletteLPD.slice(1),
            };
            createChart(
                fcCombinedLC,
                columnHeaderC1,
                optionsC1R,
                "BarChart",
                chartsPanel5
            );
            // NDVI anual mean
            var calChartAMNDVI = ui.Chart.image.series({
                imageCollection: byYearNDVI,//select('AM'),
                region: roi,
                reducer: ee.Reducer.mean(),
                scale: 250,
            });
            calChartAMNDVI.setOptions({
                title: 'NDVI Annual Time-series',
                vAxis: { title: 'NDVI x 10000' },
                hAxis: { title: 'Year', format: 'yyyy', gridlines: { count: 7 } },
            });
            chartsPanel6.add(calChartAMNDVI);
        }
        else {
            messageLabel.setValue("Only water in selected area");
            setShownMessagesBox(true);
        }
    });
}
/* function to clear output panel */
function clearOutput() {
    chartsPanel1.clear();
    chartsPanel2.clear();
    chartsPanel3.clear();
    chartsPanel4.clear();
    chartsPanel5.clear();
    chartsPanel6.clear();
    chartsPanel7.clear();
    chartsPanel8.clear();
    chartsPanel9.clear();
    chartsPanel10.clear();
    chartsPanel11.clear();
}
/* function to handle click outside container or no project area selected */
function noAreaSelected() {
    //messageLabel.setValue("No area selected");
    //setShownMessagesBox(true);
    roiTextBox.setValue("");
    roiAreaTextBox.setValue("");
    clearOutput();
    selectAoi.unlisten();
    selectAoi.setValue(null);
    selectAoi.onChange(selectArea);
    if (selectedRoiLayer != null)
        standaloneMap.remove(selectedRoiLayer);
}
function createChart(
    pFeaturesList,
    pColumnHeader,
    pOptions,
    pChartType,
    pPanel
) {
    pPanel.widgets().set(
        0,
        ui.Label({
            value: 'Generating chart ' + pOptions.title + "...",
            style: { color: "gray" },
        })
    );
    var dataTableServer = ee
        .FeatureCollection(pFeaturesList)
        .aggregate_array("row");
    //print(dataTableServer);
    dataTableServer = pColumnHeader.cat(dataTableServer);
    dataTableServer.evaluate(function (dataTableClient) {
        var chart = ui
            .Chart(dataTableClient)
            .setChartType(pChartType)
            .setOptions(pOptions);
        pPanel.widgets().set(0, chart);
        /*if(pPanel===chartsPanel8)
            pPanel.widgets().set(1, ui.Label('SAMGe Report',{margin:'5px 5px', padding:'5px 5px', textAlign: 'center',position:'bottom-center'}).setUrl('test'));
            //pPanel.widgets().set(1, ui.Label('SAMGe Report',{margin:'5px 5px', padding:'5px 5px', textAlign: 'center'}).setUrl(roi.first().get('link_samge_pdf').getInfo()));*/
    });
}
/*** FUNCTIONS_END */