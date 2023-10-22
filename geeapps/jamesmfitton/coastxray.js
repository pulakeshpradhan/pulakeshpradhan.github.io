var gridEnglandWales = ui.import && ui.import("gridEnglandWales", "table", {
      "id": "users/jamesmfitton/GlobalGrid/AoI/ISEA3H_12_EnglandWales"
    }) || ee.FeatureCollection("users/jamesmfitton/GlobalGrid/AoI/ISEA3H_12_EnglandWales"),
    gridIreland = ui.import && ui.import("gridIreland", "table", {
      "id": "users/jamesmfitton/GlobalGrid/AoI/ISEA3H_12_Ireland"
    }) || ee.FeatureCollection("users/jamesmfitton/GlobalGrid/AoI/ISEA3H_12_Ireland"),
    gridScotland = ui.import && ui.import("gridScotland", "table", {
      "id": "users/jamesmfitton/GlobalGrid/AoI/ISEA3H_12_Scotland"
    }) || ee.FeatureCollection("users/jamesmfitton/GlobalGrid/AoI/ISEA3H_12_Scotland"),
    gridStKilda = ui.import && ui.import("gridStKilda", "table", {
      "id": "users/jamesmfitton/GlobalGrid/AoI/ISEA3H_12_StKilda"
    }) || ee.FeatureCollection("users/jamesmfitton/GlobalGrid/AoI/ISEA3H_12_StKilda"),
    sentinel2 = ui.import && ui.import("sentinel2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    cxrayChannelIslands = ui.import && ui.import("cxrayChannelIslands", "imageCollection", {
      "id": "users/jamesmfitton/CoastXRayPython/Outputs/ChannelIslands_2015-09-01_2019-09-30"
    }) || ee.ImageCollection("users/jamesmfitton/CoastXRayPython/Outputs/ChannelIslands_2015-09-01_2019-09-30"),
    osLocalMHW = ui.import && ui.import("osLocalMHW", "table", {
      "id": "users/jamesmfitton/Coastlines/OS_Local/OS_Local_MHW_GB_WGS"
    }) || ee.FeatureCollection("users/jamesmfitton/Coastlines/OS_Local/OS_Local_MHW_GB_WGS"),
    osLocalMLW = ui.import && ui.import("osLocalMLW", "table", {
      "id": "users/jamesmfitton/Coastlines/OS_Local/OS_Local_MLW_GB_WGS"
    }) || ee.FeatureCollection("users/jamesmfitton/Coastlines/OS_Local/OS_Local_MLW_GB_WGS"),
    osiHWM = ui.import && ui.import("osiHWM", "table", {
      "id": "users/jamesmfitton/Coastlines/OSi/OSi_hwm"
    }) || ee.FeatureCollection("users/jamesmfitton/Coastlines/OSi/OSi_hwm"),
    osiLWM = ui.import && ui.import("osiLWM", "table", {
      "id": "users/jamesmfitton/Coastlines/OSi/OSi_lwm"
    }) || ee.FeatureCollection("users/jamesmfitton/Coastlines/OSi/OSi_lwm"),
    gridCellSummaryEnglandWales = ui.import && ui.import("gridCellSummaryEnglandWales", "table", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummary/EnglandWales_2015-09-01_2021-09-30"
    }) || ee.FeatureCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummary/EnglandWales_2015-09-01_2021-09-30"),
    gridCellSummaryIreland = ui.import && ui.import("gridCellSummaryIreland", "table", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummary/Ireland_2015-09-01_2021-09-30"
    }) || ee.FeatureCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummary/Ireland_2015-09-01_2021-09-30"),
    gridCellSummaryScotland = ui.import && ui.import("gridCellSummaryScotland", "table", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummary/Scotland_2015-09-01_2021-09-30"
    }) || ee.FeatureCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummary/Scotland_2015-09-01_2021-09-30"),
    gridCellSummaryStKilda = ui.import && ui.import("gridCellSummaryStKilda", "table", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummary/StKilda_2015-09-01_2021-09-30"
    }) || ee.FeatureCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummary/StKilda_2015-09-01_2021-09-30"),
    tidalEnglandWales = ui.import && ui.import("tidalEnglandWales", "table", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummaryTidal/EnglandWales_01_09_2015_30_09_2021_GCS_Tidal"
    }) || ee.FeatureCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummaryTidal/EnglandWales_01_09_2015_30_09_2021_GCS_Tidal"),
    tidalIreland = ui.import && ui.import("tidalIreland", "table", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummaryTidal/Ireland_01_09_2015_30_09_2021_GCS_Tidal"
    }) || ee.FeatureCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummaryTidal/Ireland_01_09_2015_30_09_2021_GCS_Tidal"),
    tidalScotland = ui.import && ui.import("tidalScotland", "table", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummaryTidal/Scotland_01_09_2015_30_09_2021_GCS_Tidal"
    }) || ee.FeatureCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummaryTidal/Scotland_01_09_2015_30_09_2021_GCS_Tidal"),
    tidalStKilda = ui.import && ui.import("tidalStKilda", "table", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummaryTidal/StKilda_01_09_2015_30_09_2021_GCS_Tidal"
    }) || ee.FeatureCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/GridCellSummaryTidal/StKilda_01_09_2015_30_09_2021_GCS_Tidal"),
    cxrayStKilda = ui.import && ui.import("cxrayStKilda", "imageCollection", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/StKilda_2015-09-01_2021-09-30"
    }) || ee.ImageCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/StKilda_2015-09-01_2021-09-30"),
    cxrayScotland = ui.import && ui.import("cxrayScotland", "imageCollection", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/Scotland_2015-09-01_2021-09-30"
    }) || ee.ImageCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/Scotland_2015-09-01_2021-09-30"),
    cxrayIreland = ui.import && ui.import("cxrayIreland", "imageCollection", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/Ireland_2015-09-01_2021-09-30"
    }) || ee.ImageCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/Ireland_2015-09-01_2021-09-30"),
    cxrayEnglandWales = ui.import && ui.import("cxrayEnglandWales", "imageCollection", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/EnglandWales_2015-09-01_2021-09-30"
    }) || ee.ImageCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/EnglandWales_2015-09-01_2021-09-30"),
    highTideIrelandImage = ui.import && ui.import("highTideIrelandImage", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/HighestTide/Ireland_2015-09-01_2021-09-30_HighestTide_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/HighestTide/Ireland_2015-09-01_2021-09-30_HighestTide_Image"),
    highTideScotlandImage = ui.import && ui.import("highTideScotlandImage", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/HighestTide/Scotland_2015-09-01_2021-09-30_HighestTide_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/HighestTide/Scotland_2015-09-01_2021-09-30_HighestTide_Image"),
    highTideStKildaImage = ui.import && ui.import("highTideStKildaImage", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/HighestTide/StKilda_2015-09-01_2021-09-30_HighestTide_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/HighestTide/StKilda_2015-09-01_2021-09-30_HighestTide_Image"),
    lowTideIrelandImage = ui.import && ui.import("lowTideIrelandImage", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/LowestTide/Ireland_2015-09-01_2021-09-30_LowestTide_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/LowestTide/Ireland_2015-09-01_2021-09-30_LowestTide_Image"),
    lowTideScotlandImage = ui.import && ui.import("lowTideScotlandImage", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/LowestTide/Scotland_2015-09-01_2021-09-30_LowestTide_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/LowestTide/Scotland_2015-09-01_2021-09-30_LowestTide_Image"),
    lowTideStKildaImage = ui.import && ui.import("lowTideStKildaImage", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/LowestTide/StKilda_2015-09-01_2021-09-30_LowestTide_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/LowestTide/StKilda_2015-09-01_2021-09-30_LowestTide_Image"),
    demEnglandWalesBucket = ui.import && ui.import("demEnglandWalesBucket", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/EnglandWales_2015-09-01_2021-09-30_Bucket_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/EnglandWales_2015-09-01_2021-09-30_Bucket_Image"),
    demIrelandBucket = ui.import && ui.import("demIrelandBucket", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/Ireland_2015-09-01_2021-09-30_Bucket_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/Ireland_2015-09-01_2021-09-30_Bucket_Image"),
    demScotlandBucket = ui.import && ui.import("demScotlandBucket", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/Scotland_2015-09-01_2021-09-30_Bucket_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/Scotland_2015-09-01_2021-09-30_Bucket_Image"),
    demStKildaBucket = ui.import && ui.import("demStKildaBucket", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/StKilda_2015-09-01_2021-09-30_Bucket_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/StKilda_2015-09-01_2021-09-30_Bucket_Image"),
    demEnglandWales = ui.import && ui.import("demEnglandWales", "imageCollection", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/EnglandWales_2015-09-01_2021-09-30_DEM"
    }) || ee.ImageCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/EnglandWales_2015-09-01_2021-09-30_DEM"),
    demIreland = ui.import && ui.import("demIreland", "imageCollection", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/Ireland_2015-09-01_2021-09-30_DEM"
    }) || ee.ImageCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/Ireland_2015-09-01_2021-09-30_DEM"),
    demScotland = ui.import && ui.import("demScotland", "imageCollection", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/Scotland_2015-09-01_2021-09-30_DEM"
    }) || ee.ImageCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/Scotland_2015-09-01_2021-09-30_DEM"),
    demStKilda = ui.import && ui.import("demStKilda", "imageCollection", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/StKilda_2015-09-01_2021-09-30_DEM"
    }) || ee.ImageCollection("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/DEM/StKilda_2015-09-01_2021-09-30_DEM"),
    highTideEngWalImage = ui.import && ui.import("highTideEngWalImage", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/HighestTide/EnglandWales_2015-09-01_2021-09-30_HighestTide_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/HighestTide/EnglandWales_2015-09-01_2021-09-30_HighestTide_Image"),
    lowTideEngWalImage = ui.import && ui.import("lowTideEngWalImage", "image", {
      "id": "projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/LowestTide/EnglandWales_2015-09-01_2021-09-30_LowestTide_Image"
    }) || ee.Image("projects/ee-jamesmfitton/assets/CoastXRayPython/Outputs/LowestTide/EnglandWales_2015-09-01_2021-09-30_LowestTide_Image");
//TO DO:
//On click show cell information and water occurrence info
//Mask out the inland  bits
var map = ui.Map();
//Map Stylinggr
var MAP_STYLES = {
    'Light Grey': [{
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [{
            "saturation": "-100"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 65
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": "50"
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
            "saturation": "-100"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [{
            "lightness": "30"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [{
            "lightness": "40"
        }]
    }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
            "saturation": -100
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "hue": "#ffff00"
        }, {
            "lightness": -25
        }, {
            "saturation": -97
        }]
    }, {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [{
            "lightness": -25
        }, {
            "saturation": -100
        }]
    }],
    'Dark Grey': [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
        }, {
            "color": "#000000"
        }, {
            "lightness": 40
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#000000"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }, {
            "weight": 1.2
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 21
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 29
        }, {
            "weight": 0.2
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 18
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 19
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }]
    }]
}
//PANEL AND LABEL STYLES
var colors = {
    'cyan': '#24C1E0',
    'transparent': '#11ffee00',
    'gray': '#F8F9FA',
    'blue': '#225ea8',
    'orange': '#fc4e2a'
};
var TITLE_STYLE = {
    // fontWeight: '100',
    fontSize: '32px',
    padding: '10px 0px 2px 0px',
    margin: '8px auto 2px auto',
    color: '#616161',
    backgroundColor: colors.transparent,
};
var SUB_MAIN_TITLE_STYLE = {
    // fontWeight: '100',
    fontSize: '18px',
    padding: '0px 8px',
    margin: '0px auto 10px auto',
    color: '#616161',
    backgroundColor: colors.transparent,
};
var SUB_TITLE_STYLE = {
    // fontWeight: '100',
    fontSize: '18px',
    padding: '0px 10px',
    color: '#616161',
    backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
    fontSize: '14px',
    // fontWeight: '100',
    color: '#5E5E5E',
    padding: '8px',
    backgroundColor: colors.transparent,
    textAlign: 'justify'
};
var PARAGRAPH_STYLE_LINK = {
    fontSize: '14px',
    // fontWeight: '100',
    color: '#5E5E5E',
    padding: '0px',
    margin: '2px',
    backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
    fontWeight: '50',
    textAlign: 'center',
    fontSize: '11px',
    backgroundColor: colors.transparent
};
var LABEL_STYLE_LINK = {
    // fontWeight: '50',
    textAlign: 'center',
    fontSize: '11px',
    backgroundColor: colors.transparent,
    margin: '8px 3px 0px 0px'
};
var BULLET_STYLE = {
    fontSize: '14px',
    // fontWeight: '100',
    color: '#5E5E5E',
    padding: '8px',
    backgroundColor: colors.transparent,
    textAlign: 'justify',
    whiteSpace: 'pre'
};
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
// Constants used to visualize the data on the map.
var WO_STYLE = {
    palette: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58', '#020f33']
};
var NDWI_STYLE = {
    palette: ["f7fcfd", "e0ecf4", "bfd3e6", "9ebcda", "8c96c6", "8c6bb1", "88419d", "810f7c", "4d004b"]
};
var yelBlu = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58', '#020f33'];
var buPu = ["f7fcfd", "e0ecf4", "bfd3e6", "9ebcda", "8c96c6", "8c6bb1", "88419d", "810f7c", "4d004b"]
var rgbVis = {min: 0, max: 2000, gamma: 1.5, bands:['B4', 'B3', 'B2']};
var rgbVismax = {min: 0, max: 2000, gamma: 1.5, bands:['B4_max', 'B3_max', 'B2_max']};
var demPal = ["4c4083", "5e4fa2", "3288bd", "66c2a5", "abdda4", "e6f598", "ffffbf", "fee08b", "fdae61","f46d43", "d53e4f", "9e0142"]
var demLabels = ["<0%","0 to 10%","10 to 20%","20 to 30%","30 to 40","40 to 50%","50 to 60%","60 to 70%","70 to 80%","80 to 90%","90 to 100%",">100%"]
var labelColour = ["white", "white", "white", "white", "black", "black", "black", "black", "white", "white", "white", "white"]
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
    fontSize: '20px',
    fontWeight: '300',
    stretch: 'horizontal',
    textAlign: 'center',
    margin: '4px',
    backgroundColor: colors.gray
};
var LEGEND_TITLE_STYLE_2 = {
    fontSize: '20px',
    fontWeight: '300',
    stretch: 'horizontal',
    textAlign: 'center',
    padding: '25px 0px 0px 0px',
    margin: '4px',
    backgroundColor: colors.gray
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
    fontSize: '14px',
    stretch: 'horizontal',
    textAlign: 'center',
    margin: '1px',
    backgroundColor: colors.gray
};
var LEGEND_FOOTNOTE_STYLE2 = {
    fontSize: '10px',
    stretch: 'horizontal',
    textAlign: 'center',
    margin: '4px',
    backgroundColor: colors.gray
};
//Styling for the slider label
var SLIDER_SUB_LABEL = {
          fontSize: '12px',
          // fontWeight: 'bold',
          color: colors.blue,
          padding: '0px',
          backgroundColor: colors.transparent,
          textAlign: 'justify'
          // margin: '8px auto'
      }
var NDWI_SUB_LABEL = {
          fontSize: '12px',
          // fontWeight: 'bold',
          color: colors.blue,
          padding: '0px',
          margin: '0px',
          backgroundColor: colors.transparent,
          textAlign: 'justify',
          width: '200px'
          // margin: '8px auto'
      }
//FUNCTIONS
var mosaicSameDay = function(collection) {
    var make_date_list = function(img, l) {
    l = ee.List(l)
    img = ee.Image(img)
    var date = img.date()
    // make clean date
    var day = date.get('day')
    var month = date.get('month')
    var year = date.get('year')
    var clean_date = ee.Date.fromYMD(year, month, day)
    var condition = l.contains(clean_date)
    return ee.Algorithms.If(condition, l, l.add(clean_date))
  }
  var col_list = collection.toList(collection.size())
  var date_list = ee.List(col_list.iterate(make_date_list, ee.List([])))
  var first_img = ee.Image(collection.first())
  var bands = first_img.bandNames()
  var make_col = function(date) {
    date = ee.Date(date)
    var filtered = collection.filterDate(date, date.advance(1, 'day'))
    var mosaic = filtered.mosaic()
    mosaic = mosaic.set('system:time_start', date.millis(),
                        'system:footprint', sentinel2.mergeGeometries(filtered))
    mosaic = mosaic.rename(bands)
    var reproject = function(bname, mos) {
      mos = ee.Image(mos)
      var mos_bnames = mos.bandNames()
      var bname = ee.String(bname)
      var proj = first_img.select(bname).projection()
      var newmos = ee.Image(ee.Algorithms.If(
          mos_bnames.contains(bname),
          image_module.replaceBand(mos, bname, mos.select(bname).setDefaultProjection(proj)),
          mos))
      return newmos
    }
    mosaic = ee.Image(bands.iterate(reproject, mosaic))
    return mosaic
  }
  var  new_col = ee.ImageCollection.fromImages(date_list.map(make_col))
  return new_col
}
function makeMapPanel() {
    // Add an informational label
    // map.add(ui.Label('Click on the map for water occurence information'));
    map.style().set('cursor', 'crosshair');
    map.setCenter(-3.5, 55.5, 6);
    map.setOptions('HYBRID'),
        map.setOptions('Dark Grey', MAP_STYLES)
    map.setGestureHandling('greedy')
    // Don't show the layer list for this app.
    return map;
}
// Apply a non-linear stretch to the WO data for visualization.
function colorStretch(image, max, nonlinearity) {
    return image.divide(max)
        .pow(1 / nonlinearity);
}
// Inverts the nonlinear stretch we apply to the WO data for
// visualization, so that we can back out values to display in the legend.
// This uses ordinary JavaScript math functions, rather than Earth Engine
// functions, since we're going to call it from JS to compute label values.
function undoColorStretch(val, max, nonlinearity) {
    return Math.pow(val, nonlinearity) * max;
}
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar(palette) {
    return ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: {
            bbox: [0, 0, 1, 0.1],
            dimensions: '120x10',
            format: 'png',
            min: 0,
            max: 1,
            palette: palette,
        },
        style: {
            stretch: 'horizontal',
            margin: '0px 8px'
        },
    });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend(style, max, min, nonlinearity, offsetCentre, offsetLeft) {
    var marginOffsetCentre = ee.String('0px ').cat(ee.String(offsetCentre))
    marginOffsetCentre = marginOffsetCentre.cat(ee.String('px 0px 0px')).getInfo()
    var labelPanel = ui.Panel({
        widgets: [
            ui.Label(min, {
                margin: marginOffsetCentre,
                backgroundColor: colors.gray
            }),
            ui.Label(
                Math.round(undoColorStretch(0.5, max, nonlinearity)), {
                    margin: '0px 0px',
                    textAlign: 'center',
                    stretch: 'horizontal',
                    backgroundColor: colors.gray
                }),
            ui.Label(max, {
                margin: '0px 0px',
                backgroundColor: colors.gray
            })
        ],
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {
            padding: '2px 0px',
            // stretch: 'horizontal',
            backgroundColor: colors.gray
        }
    });
    return ui.Panel({
        widgets: [ColorBar(style.palette), labelPanel],
        style: {
            backgroundColor: colors.gray
        }
    });
}
//format the pop info items
function popupPanelFormat(panel, data, label, unit) {
    var units = typeof(unit) === 'undefined' ? "" : unit
    var subPanel = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal', true),
        style: POPUP_SUBPANEL_STYLE
    })
    var panelLabel = ui.Label(label + ": ", POPUP_INFO_TITLE_STYLE)
    var dataFormat = ui.Label(data.getInfo() + units, POPUP_INFO_STYLE)
    subPanel.add(panelLabel)
    subPanel.add(dataFormat)
    panel.add(subPanel)
}
function removeLayer(name) {
    var layers = map.layers()
    // list of layers names
    var names = []
    layers.forEach(function(lay) {
        var lay_name = lay.getName()
        names.push(lay_name)
    })
    // get index
    var index = names.indexOf(name)
    if (index > -1) {
        // if name in names
        var layer = layers.get(index)
        map.remove(layer)
    }
}
function legendClass(colour, name, labelColour){
  var colourBox = ui.Label({
      value: name,
      style: {
        backgroundColor: '#' + colour,
        // Use padding to give the box height and width.
        padding: '2px 2px 2px 2px',
        margin: '0 0 0px 0',
        minWidth: '60px',
        textAlign: 'center',
        fontSize: '11px',
        color: labelColour
      }
  })
  return colourBox
}
//MAKE THE SPLIT PANEL
function makeSidePanel() {
    // Create the base side panel, into which other widgets will be added
    var mainPanel = ui.Panel({
        layout: ui.Panel.Layout.flow('vertical', true),
        style: {
            stretch: 'horizontal',
            height: '100%',
            width: '550px',
            backgroundColor: colors.gray,
            border: BORDER_STYLE,
        }
    });
    // Add the app title to the side panel
    var titleLabel = ui.Label('Coast X-Ray: UK and Ireland', TITLE_STYLE);
    mainPanel.add(titleLabel);
    var subTitleLabel = ui.Label('Analysis of water occurrence within the intertidal zone', SUB_MAIN_TITLE_STYLE);
    mainPanel.add(subTitleLabel);
    // Add the app description to the main panel
    var descriptionText =
      'Coast X-Ray is an approach to map the intertidal zone by measuring water occurrence frequencies and using tidally calibrated Sentinel-2 imagery from September 2015 to September 2021, and processed within Google Earth Engine (GEE), is proposed as a complimentary approach to support traditional aerial or ground surveying. '+
      'Coast X-Ray was developed as part of the Scottish Dynamic Coast project.' 
    var descriptionLabel = ui.Label(descriptionText, PARAGRAPH_STYLE);
    mainPanel.add(descriptionLabel);
     //panel for the links
    var sidePanelLink = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal', true),
        style: {
            padding: '8px 16px',
            // stretch: 'horizontal',
            backgroundColor: colors.gray,
            margin: '0 auto'
        }
    })
    //DC LOGO
    var logoPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal', true),
      style: {
        backgroundColor: colors.gray, 
        width:'512px', 
        margin: '0px auto 0px auto'
      }
    });
    var dcLogo = ui.Thumbnail({
      image: ee.Image('users/jamesmfitton/DynamicCoast/dcLogoV3'),
      params: {min: 0, max: 255},
      style:{
        width: '256px', 
        backgroundColor: colors.gray,
        margin: '1px auto'
      }});
    logoPanel.add(dcLogo)
    mainPanel.add(logoPanel)
    //link text
    // var linkDCText = ui.Label('For more information, go to ', LABEL_STYLE_LINK)
    var linkDC = ui.Label('www.DynamicCoast.com', LABEL_STYLE_LINK, 'http://www.dynamiccoast.com');
    // var linkGitText = ui.Label('or see the code on ', LABEL_STYLE_LINK)
    //bring all the text elements together
    // sidePanelLink.add(linkDCText)
    sidePanelLink.add(linkDC)
    // sidePanelLink.add(linkGitText)
    // sidePanelLink.add(linkGit)
    mainPanel.add(sidePanelLink)
        var dataText =
        'The coast is divided up using a hexagonal grid. For each grid cell, there is:\n'  + 
        "       • a Water Occurrence output\n" + 
        "       • an Intertidal Tide Stage output\n" + 
        "       • a true colour image representing the highest tidal stage observed;\n" + 
        "       • a true colour image representing the lowest tidal stage observed;\n" + 
        "       • an estimate of the MHWS contour, if available;\n" + 
        "       • an estimate of the MLWS contour, if available. \n" 
    var dataLabel = ui.Label(dataText, BULLET_STYLE);
    mainPanel.add(dataLabel)
    var interpretationTitle = ui.Label('Interpretation', SUB_TITLE_STYLE)
    // mainPanel.add(interpretationTitle)
    var interpretationWOText =
        'The Water Occurrence (WO) output represents how often an area is covered by water. '+
        'A value of 100% means the area is always water and represents the area below Mean Low Water. '+
        'A value less than 100% means that the area is sometimes water. '+
        'A value of 0% means that the area is never covered by water and is therefore above Mean High Water.'
    var interpretationWOLabel = ui.Label(interpretationWOText, PARAGRAPH_STYLE);
    mainPanel.add(interpretationWOLabel)
    // Assemble the legend panel.
    mainPanel.add(ui.Panel(
        [
            ui.Label('Water Occurrence', LEGEND_TITLE_STYLE),
            makeLegend(WO_STYLE, 100, 0, 1, '16'),
            ui.Label(
                '%', LEGEND_FOOTNOTE_STYLE)
        ],
        ui.Panel.Layout.flow('vertical'), {
            width: '260px',
            margin: '0 auto',
            backgroundColor: colors.gray
        }));
    // var interpretationNDWIText =
    //     'Areas that have a higher median NDWI value are more likely to be water. '+
    //     'The layer can be used to support the interpretation of the Water Occurrence layer.'
    // var interpretationNDWILabel = ui.Label(interpretationNDWIText, PARAGRAPH_STYLE);
    // mainPanel.add(interpretationNDWILabel)
    // // Assemble the legend panel.
    // mainPanel.add(ui.Panel(
    //     [
    //         ui.Label('Median NDWI', LEGEND_TITLE_STYLE),
    //         makeLegend(NDWI_STYLE, 0.5, -0.5, 1, '0')
    //     ],
    //     ui.Panel.Layout.flow('vertical'), {
    //         width: '260px',
    //         margin: '0 auto',
    //         backgroundColor: colors.gray
    //     }));
    // DEM
    var demText =
        'By calibrating the images with tidal data, it is possible to assign an elevation to the tide seen in an image. '+
        'Each of the images are then categorised into a decile of the mean high and low tidal range. ' +
        'The low water mark therefore occurs at the boundary between the "<0%" and "0 to 10%" categories, the high water mark at the boundary of the "90 to 100%" and ">100%" categories. ' +
        'It is in effect, a pseudo digtial elevation model.'
    var demLabel = ui.Label(demText, PARAGRAPH_STYLE);
    mainPanel.add(demLabel)
    mainPanel.add(ui.Panel(
        [
            ui.Label('Intertidal Tide Stage', LEGEND_TITLE_STYLE_2)
        ],ui.Panel.Layout.flow('vertical'), {
            width: '260px',
            margin: '0 auto',
            backgroundColor: colors.gray
        }));
    var legendDEM = ui.Panel({
      style: {
        backgroundColor: colors.gray,
                    stretch: 'horizontal',
                     margin: '0 auto',
        }
      });
    mainPanel.add(ui.Panel(
        [
            ui.Label('% Mean High/Low Tide Stage', LEGEND_FOOTNOTE_STYLE2)
        ],ui.Panel.Layout.flow('vertical'), {
            width: '260px',
            margin: '0 auto',
            backgroundColor: colors.gray
        }));
    legendDEM.add(legendClass("9e0142",  ">100%", "white"));
    legendDEM.add(legendClass("d53e4f", "90 to 100%", "white"));
    legendDEM.add(legendClass("f46d43", "80 to 90%", "white"));
    legendDEM.add(legendClass("fdae61", "70 to 80%", "white"));
    legendDEM.add(legendClass("fee08b", "60 to 70%", "black"));
    legendDEM.add(legendClass("ffffbf", "50 to 60%", "black"));
    legendDEM.add(legendClass("e6f598", "40 to 50%", "black"));
    legendDEM.add(legendClass("abdda4", "30 to 40%", "black"));
    legendDEM.add(legendClass("66c2a5", "20 to 30%", "white"));
    legendDEM.add(legendClass("3288bd", "10 to 20%", "white"));
    legendDEM.add(legendClass("5e4fa2", "0 to 10%", "white"));
    legendDEM.add(legendClass("4c4083", "<0%", "white"));
    mainPanel.add(legendDEM)
    // var methodTitle = ui.Label('Methodology', SUB_TITLE_STYLE)
    // mainPanel.add(methodTitle)
    // var methodText =
    //     'The coast is divided up using a hexagonal grid. '+ 
    //     'For each grid cell, a "stack" of cloud free Sentinel 2 Level 1-C images between September 2015 and September 2020 was obtained. The water in the images was then identified using the NDWI (Normalised Difference Water Index) and a fixed threshold. '+
    //     'As the tide changes in each image, it is possible to identify areas that are always water, sometimes water, or never water. '+
    //     'The areas that are sometimes water are intertidal areas. '+
    //     'The mean value of the NDWI over time was also calculated. '
    // var methodLabel = ui.Label(methodText, PARAGRAPH_STYLE);
    // mainPanel.add(methodLabel)
    mainPanel.add(ui.Panel(
        [
            ui.Label('Journal Article', LEGEND_TITLE_STYLE_2)
        ],ui.Panel.Layout.flow('vertical'), {
            width: '260px',
            margin: '0 auto',
            backgroundColor: colors.gray
        }));
         //panel for the links
    var sidePanelGitLink = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal', true),
        style: {
            padding: '8px 16px',
            // stretch: 'horizontal',
            backgroundColor: colors.gray,
            margin: '0'
        }
    })
    var linkArticleText = ui.Label('This portal supports the open-access journal article: ', PARAGRAPH_STYLE_LINK)
    var linkArticle = ui.Label('https://doi.org/10.1016/j.rsase.2021.100499', PARAGRAPH_STYLE_LINK, 'https://www.sciencedirect.com/science/article/pii/S2352938521000355');
    sidePanelGitLink.add(linkArticleText)
    sidePanelGitLink.add(linkArticle)
    var linkGitText = ui.Label('The code used to generate Coast X-Ray is available on ', PARAGRAPH_STYLE_LINK)
    var linkGit = ui.Label('GitHub.', PARAGRAPH_STYLE_LINK, 'https://github.com/jamesfitton/cxr/');
    sidePanelGitLink.add(linkGitText)
    sidePanelGitLink.add(linkGit)
    mainPanel.add(sidePanelGitLink)
    // var ackText = 'High and low water lines are provided by Ordnance Survey OpenMap Local (in England, Scotland, Wales) , and Ordnance Survey Ireland Prime2 (in Ireland and Northern Ireland).'
    var ackText = 'High and low water lines are provided by Ordnance Survey OpenMap Local (in England, Scotland, Wales).'
    var ackLabel = ui.Label(ackText, PARAGRAPH_STYLE);
    mainPanel.add(ackLabel)
    // var limitationsTitle = ui.Label('Limitations', SUB_TITLE_STYLE)
    // mainPanel.add(limitationsTitle)
    // var limitationsText =
    //     'Shadows created by hills and buildings often have a high NDWI value. This means that these areas are sometimes incorrectly identified as water. '+
    //     'As a result, urban areas and areas of land have a water occurrence value above 0%, which is incorrect. '
    // var limitationsLabel = ui.Label(limitationsText, PARAGRAPH_STYLE);
    // mainPanel.add(limitationsLabel)
    return mainPanel;
}
// Clear the default UI since we're adding our own side and map panels.
ui.root.clear();
// Create the app's two panels and add them to the ui.root
var sidePanel = makeSidePanel();
var mapPanel = makeMapPanel();
// Use a SplitPanel so it's possible to resize the two panels.
ui.root.add(ui.SplitPanel(sidePanel, mapPanel));
//POP UP PANEL
var POPUP_STARTUP_STYLE = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: colors.blue,
    padding: '2px',
    backgroundColor: colors.transparent,
    margin: '8px auto'
}
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
        stretch: 'horizontal',
        backgroundColor: colors.gray,
        position: 'bottom-right',
        border: '2px solid #225ea8'
    }
})
var POPUP_TITLE_STYLE = {
    // fontWeight: '100',
    fontSize: '22px',
    padding: '3px',
    margin: '2px',
    color: '#616161',
    backgroundColor: colors.transparent,
    textAlign: 'left'
}
var POPUP_INFO_TITLE_STYLE = {
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '2px',
    margin: '2px',
    color: '#616161',
    backgroundColor: colors.transparent,
    textAlign: 'left',
    width: '100px'
}
var POPUP_INFO_STYLE = {
    fontWeight: '400',
    fontSize: '14px',
    padding: '2px',
    margin: '2px',
    color: '#616161',
    backgroundColor: colors.transparent,
    textAlign: 'left',
    stretch: 'vertical'
}
var POPUP_SUBPANEL_STYLE = {
    stretch: 'horizontal',
    backgroundColor: colors.gray,
}
var infoPanelLabel = ui.Label('Click on the map to see further information about a location', POPUP_STARTUP_STYLE)
infoPanel.add(infoPanelLabel)
//Close button
var closeButton = ui.Button({
    label: 'Clear',
    onClick: function() {
        infoPanel.clear();
        infoPanel.add(infoPanelLabel)
        chartPanel.clear()
        chartPanel.style().set('shown', false);
        ndwiPanel.style().set('shown', false);
        removeLayer(chartImageName);
        removeLayer(ndwiName);
        removeLayer('Selected Cell');
        removeLayer('Point of Interest');
    },
    style: {
        // margin: '6px auto',
        color: colors.blue,
        padding: '0px'
    }
});
var chartPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal', true),
      style: {
        position: 'bottom-left',
        backgroundColor: colors.gray, 
        width:'512px',
        border: '2px solid #225ea8',
        shown: false
      }
    });
var ndwiPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {
        padding: '6px 8px',
        position: 'bottom-center',
        backgroundColor: colors.gray, 
        border: '2px solid #225ea8',
        maxWidth: '350px',
        shown: false
      }
    });
// var ndwiLabel = ui.Label('Show Water', POPUP_STARTUP_STYLE);
var ndwiLabel2 = ui.Label('Show the water in the image using the normalised difference water index (NDWI) and a threshold of 0.2', NDWI_SUB_LABEL);
// ndwiLabel2.style({maxWidth: '100px'})
var ndwiButton = ui.Button({
  label: 'Show Water', 
  onClick: function(){
    var ndwi = chartImage.normalizedDifference(['B3', 'B8']).select(['nd'],['ndwi']);
    ndwi = ndwi.gt(0.2);
    ndwiName = chartImageDate.cat(' Water').getInfo();
    // print(ndwiName)
    ndwi = ndwi.updateMask(ndwi.eq(1))
    var ndwiImage = ui.Map.Layer(ndwi, {'min':1,'palette':['67a9cf']}, ndwiName);
    map.layers().insert(1, ndwiImage);
  },
  style: {
        margin: 'auto 8px auto 0px',
        color: colors.blue,
        // margin: '0px 10px 0px 0px'
    }
});
// ndwiPanel.add(ndwiLabel);
ndwiPanel.add(ndwiButton);
ndwiPanel.add(ndwiLabel2);
//what happens when the user clicks on the map
function inspect(coords) {
    infoPanel.clear();
    chartPanel.clear()
    chartPanel.style().set('shown', false);
    ndwiPanel.style().set('shown', false);
    //remove the previous selected cell layer and point
    removeLayer('Selected Cell')
    removeLayer('Point of Interest')
    //removes image and ndwi if they have been added    
    removeLayer(chartImageName);
    removeLayer(ndwiName);
    //add the loading to the box while the data is recieved
    infoPanel.style().set('shown', true);
    infoPanel.add(ui.Label('Loading...', {
        color: colors.blue,
        backgroundColor: colors.transparent
    }));
    //get the point where the user clicked
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    //style it for use in the info box
    var lon = ee.String(ee.Number(coords.lon).multiply(1000).round().divide(1000))
    var lat = ee.String(ee.Number(coords.lat).multiply(1000).round().divide(1000))
    var lonLat = lon.cat(", ")
    lonLat = lonLat.cat(lat)
    //get the gridcell where the user clicked - use the feature rather than the image as image bounds are not accurate
    var gridCell = grid.filterBounds(point);
    //see if the user clicked on an area that has an image
    var nullTest = ee.Algorithms.If(gridCell.first(), ee.Number(1), ee.Number(0))
    //if the image does excist then do this...
    nullTest.evaluate(function(result) {
        if (result === 1) {
            //info
            infoPanel.clear();
            //get the grid cell number then filter the image collection using this field/data
            var gridCellNumber = gridCell.first().get('cell')
            var imageWO = coastXRay.filterMetadata('cell', 'equals', gridCellNumber).first()
            var imageNDWI = ndwi.filterMetadata('cell', 'equals', gridCellNumber).first()
            //get the WO% value at point
            var getWO = imageWO.reduceRegion({
                reducer: ee.Reducer.first(),
                geometry: point,
                scale: 10,
            }).get('waterOccurrencePercentage');
            getWO = ee.String(ee.Number(getWO).round()).slice(0, -2)
            //get the median NDWI value at point
            var getNDWI = imageNDWI.reduceRegion({
                reducer: ee.Reducer.first(),
                geometry: point,
                scale: 10,
            }).get('ndwiMedian');
            getNDWI = ee.String(ee.Number(getNDWI).multiply(100).round().divide(100))
            // GRID CELL: Paint just the edges of the cell
            var empty = ee.Image().byte();
            var outline = empty.paint({
                featureCollection: gridCell,
                color: 1,
                width: 3
            });
            //add the grid outline to the map
            map.addLayer(outline, {
                palette: colors.orange
            }, 'Selected Cell')
            //add the point where the user clicked to the map
            map.addLayer(point, {
                color: colors.orange
            }, 'Point of Interest')
            //if the map is zooed out quite far, zoom into the grid cell
            if (map.getZoom() < 7) {
                map.centerObject(gridCell.first(), 10);
            }
            //get the info from the image properties
            var earliestImage = imageWO.get('earliestImageAnalysed')
            var latestImage = imageWO.get('latestImageAnalysed')
            var numberOfImages = imageWO.get('numberOfImagesAnalysed')
            var cloudCoverThreshold = imageWO.get('cellCloudCoverThreshold')
            // CHART DATA
            var tidal = gridCellSummaryTides.filterBounds(point);
            var data = tidal.map(function(feature){
                    var x = feature.getNumber('dateMll')
                    var y = feature.getNumber('mhwsmlP').round()
                    return feature.set('dateMll', x).set('Tide', y)
                  })
            // max tide elevation
            var max = ee.Number(tidal.aggregate_max('mhwsmlP')).round()
            // print(max)
            // date of max tide
            var maxDate = ee.Date(data.sort('mhwsmlP', false).first().get('dateMll')).format('YYYY-MM-dd')
            // min tide elevation
            var min = ee.Number(tidal.aggregate_min('mhwsmlP')).round()
            // date of min tide
            var minDate = ee.Date(data.sort('mhwsmlP', true).first().get('dateMll')).format('YYYY-MM-dd')
            //...which are then used in the function to display the info
            //TITLE
            var titleLabel = ui.Label('Cell: ' + gridCellNumber.getInfo(), POPUP_TITLE_STYLE);
            infoPanel.add(titleLabel);
            //Point Lon Lat
            popupPanelFormat(infoPanel, lonLat, "Point Location")
            //WO% at point
            popupPanelFormat(infoPanel, getWO, "Water Occurrence", "%")
            //NDWI at point
            popupPanelFormat(infoPanel, getNDWI, "Median NDWI")
            //EARLIEST IMAGE
            popupPanelFormat(infoPanel, earliestImage, "Earliest Image")
            //LATEST IMAGE
            popupPanelFormat(infoPanel, latestImage, "Latest Image")
            //NUMBER OF IMAGES
            popupPanelFormat(infoPanel, numberOfImages, "Number of Images")
            //MAX TIDE
            popupPanelFormat(infoPanel, max, "Max Tide Stage", "%")
            //MAX TIDE DATE
            popupPanelFormat(infoPanel, maxDate, "Max Tide Date")
            //MIN TIDE
            popupPanelFormat(infoPanel, min, "Min Tide Stage", "%")
            //MIN TIDE DATE
            popupPanelFormat(infoPanel, minDate, "Min Tide Date")
            //CLOUD COVER THRESHOLD
            // popupPanelFormat(infoPanel, cloudCoverThreshold, "Cloud Cover Threshold", "%")
            //CLOSE BUTTON
            infoPanel.add(closeButton);
            // //CHART 
            var chartHist = ui.Chart.feature.histogram(data, 'Tide', 26,5)
            .setOptions({ 
              title: gridCellNumber.getInfo()+ ': Tide Stage Histogram' ,
              hAxis: {baselineColor: 'none',
                      title: 'Tidal Stage (%)',
                        minValue: -10,
                        maxValue: 110,
                        ticks: [0,10,20,30,40,50,60,70,80,90,100,110],
                        gridlines:{color: 'none'}
              },
              vAxis: { title: 'Number of Images',
                        minorGridlines: {color: 'none'}},
              titleTextStyle: {color: '#225ea8'},
              legend: {position: 'none'},
              colors:['#225ea8'],
              backgroundColor: colors.gray,
              chartArea:{left: 50, right:20},
              series: {
                 0: {color: '#225ea8'}}
            })
            chartHist.style().set({width: '97%'})
            var chart = ui.Chart.feature.byFeature(data, 'dateMll', 'Tide')
            .setChartType('ScatterChart')
            .setOptions({
              hAxis: {title: 'Date'},
              vAxis: {title: 'Tidal Stage (%)', 
                      viewWindow: {
                        min: min,
                        max: max,
                        ticks: [0, 25, 50, 75, 100]
                      }
                      },
              title: gridCellNumber.getInfo()+ ': Image Date and Mean High/Low Tide Stage (click on a point to view the image)' ,
              titleTextStyle: {color: '#225ea8'},
              legend: {position: 'none'},
              colors:['#225ea8'],
              backgroundColor: colors.gray,
              chartArea:{left: 50, right:20}
            })
            chart.style().set({width: '97%'})
            //Create callback function that adds image to the map coresponding with clicked data point on chart
            chart.onClick(function(xValue, yValue, seriesName) {
                if (!xValue) return;  // Selection was cleared.
                chartImageDate = ee.Date(xValue).format('YYYY-MM-dd');
                // print(date)
                var gridCollection = sentinel2
                                      .filterBounds(gridCell)
                                      .filterDate(chartImageDate, ee.Date(chartImageDate).advance(1, 'day'))
                chartImageName = ee.Date(xValue).format('YYYY-MM-dd HH:ss').getInfo()
                chartImage = gridCollection.mosaic()
                var gridImage = ui.Map.Layer(chartImage, rgbVis, chartImageName)
                if (ee.Number(map.layers().length()).getInfo() == ee.Number(startingLayerCount).add(2).getInfo()){//add two for the point and grid boundary
                  map.layers().insert(0, gridImage) //first time adding the image to the map
                } else {
                  removeLayer(ndwiName);
                  map.layers().set(0, gridImage)
                }
                ndwiPanel.style().set('shown', true);
              });
            chartPanel.clear()
            chartPanel.add(chart)
            chartPanel.add(chartHist)
            chartPanel.style().set('shown', true);
        }
        //if the image does not excist then do this:
        else {
            infoPanel.clear();
            var POPUP_NO_INFO_STYLE = {
                fontWeight: '100',
                fontSize: '14px',
                padding: '2px',
                margin: '2px',
                color: '#616161',
                backgroundColor: colors.transparent,
                textAlign: 'left',
            }
            //TITLE
            var titleLabel = ui.Label('Cell Not Analysed', POPUP_TITLE_STYLE);
            var noInfo = ui.Label("No information available", POPUP_NO_INFO_STYLE)
            infoPanel.add(titleLabel);
            infoPanel.add(noInfo)
            //CLOSE BUTTON
            infoPanel.add(closeButton);
        }
    })
}
//run this function on click
map.onClick(inspect)
//add the info panel on start up
map.add(infoPanel)
//add the chart panel to the map
map.add(chartPanel)
//add the ndwi button panel to the map
map.add(ndwiPanel)
//DATA LAYERS
//WATER OCCURRENCE
//combine the wo image collections together
var coastXRay = cxrayScotland.merge(cxrayIreland)
coastXRay = coastXRay.merge(cxrayEnglandWales)
// coastXRay = coastXRay.merge(cxrayChile)
coastXRay = coastXRay.merge(cxrayStKilda)
//select only the percent band
var percent = coastXRay.select('waterOccurrencePercentage').reduce(ee.Reducer.max()).rename(['waterOccurrencePercentage'])//.mosaic()
//NDWI MEDIAN
//combine the ndwi image collections together
var ndwi = coastXRay.select('ndwiMedian')
//TIDAL INFO
var gridCellSummaryTides = tidalScotland.merge(tidalEnglandWales)
gridCellSummaryTides = gridCellSummaryTides.merge(tidalIreland)
gridCellSummaryTides = gridCellSummaryTides.merge(tidalStKilda)
print(gridCellSummaryTides.limit(2))
//GRID
// var grid = gridEnglandWales.merge(gridIreland)
// grid = grid.merge(gridScotland)
var grid = gridCellSummaryScotland.merge(gridCellSummaryIreland)
grid = grid.merge(gridCellSummaryEnglandWales)
// grid = grid.merge(gridCellSummaryChile)
grid = grid.merge(gridCellSummaryStKilda)
// Paint all the polygon edges with the same number and width, display.
var empty = ee.Image().byte();
var outline = empty.paint({
    featureCollection: grid,
    color: 1,
    width: 1
});
// High and Low Tide images
var highTideImages = ee.ImageCollection.fromImages([highTideEngWalImage, highTideIrelandImage, highTideScotlandImage, highTideStKildaImage])
// highTideImages = highTideImages.mosaic()
var lowTideImages = ee.ImageCollection.fromImages([lowTideEngWalImage, lowTideIrelandImage, lowTideScotlandImage, lowTideStKildaImage])
// DEM
var dem = demScotland.merge(demEnglandWales)
dem = dem.merge(demIreland)
dem = dem.merge(demStKilda)
// var demBucket = dem.select(['bucket_min'])
var demBucket = ee.ImageCollection.fromImages([demEnglandWalesBucket, demIrelandBucket, demScotlandBucket, demStKildaBucket])
// MHWS
var demMHWS = dem.select(['waterMHWS'])
demMHWS = demMHWS.map(function(i){
  return i.int16()
})
demMHWS = demMHWS.mosaic()
// MLWS
var demMLWS = dem.select(['waterMLWS'])
demMLWS = demMLWS.map(function(i){
  return i.int16()
})
demMLWS = demMLWS.mosaic()
//ADD MAP LAYERS
//colour palettes for stylinh
map.addLayer(percent.updateMask(percent.gte(0)), {
    min: 0,
    max: 100,
    palette: yelBlu
}, 'Water Occurrence (%)')
// map.addLayer(ndwi, {
//     min: -0.5,
//     max: 0.5,
//     palette: buPu
// }, 'NDWI Median', false)
map.addLayer(lowTideImages,
    rgbVismax, 'Lowest Tide Mosaic', false)
map.addLayer(highTideImages,
    rgbVismax, 'Highest Tide Mosaic', false)
map.addLayer(demBucket.mosaic().updateMask(percent.gt(0)), {
    min: -10,
    max: 100,
    palette: demPal
    }, 'CXR Intertidal Tide Stage', false)
map.addLayer(demMHWS.updateMask(demMHWS.eq(1)), {
    min: -10,
    max: 100,
    palette: ['9e0142']
    }, 'CXR MHWS', false)
map.addLayer(demMLWS.updateMask(demMLWS.eq(1)), {
    min: -10,
    max: 100,
    palette: ['4c4083']
    }, 'CXR MLWS', false)
// map.addLayer(osLocalMLW//.merge(osiLWM).draw({color: 'black', strokeWidth: 1}),{} , 'Low Water Line', false)
// map.addLayer(osLocalMHW.merge(osiHWM).draw({color: 'black', strokeWidth: 1}),{} , 'High Water Line', false)
map.addLayer(osLocalMLW.draw({color: 'black', strokeWidth: 1}),{} , 'Low Water Line', false)
map.addLayer(osLocalMHW.draw({color: 'black', strokeWidth: 1}),{} , 'High Water Line', false)
map.addLayer(outline, {
    palette: 'bababa'
}, 'Analysis Grid', false);
//WO SLIDER
// Create a label and slider.
var sliderLabel = ui.Label('Water Occurrence Filter', POPUP_STARTUP_STYLE);
var sliderLabel2 = ui.Label('Adjust the water occurrence symbology to show only values greater than or equal to the % value above', SLIDER_SUB_LABEL);
// Create a panel 
var sliderPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-right',
    padding: '0px',
    border: '2px solid #225ea8',
    backgroundColor: colors.gray,
    color: '#225ea8',
    width: '250px'
  }
});
//Setup the slider
var sliderWO = ui.Slider({
                min: 0,
                max: 100,
                value: 0,
                step: 5,
                style: {
                  padding: '5px 0px 0px 40px',
                  margin: '0px auto 8px auto',
                  stretch: 'horizontal',
                  width: '185px',
                  backgroundColor: colors.gray,
                  fontSize: '14px',
                  fontWeight: 'bold',
                }
              });
//Set what happens when the slider changes
sliderWO.onChange(function(value) {
  var threshold = value;
  removeLayer('Water Occurrence (%)');
  var thresholdWO = ui.Map.Layer(ee.Image(percent.updateMask(percent.gte(value))), {
    min: 0,
    max: 100,
    palette: yelBlu
    }, 'Water Occurrence (%)')
    if (ee.Number(map.layers().length()).getInfo() == ee.Number(startingLayerCount).add(2).getInfo()){//add two for the point and grid boundary
                  map.layers().insert(1, thresholdWO)
                } else {
                  map.layers().insert(0, thresholdWO)
                }
  // map.layers().insert(0, thresholdWO)
  });
//add it to the map
sliderPanel.add(sliderLabel)
sliderPanel.add(sliderWO)
sliderPanel.add(sliderLabel2)
map.add(sliderPanel);
//i used to count how many times the user has clicked on the map
var i = 0
var startingLayerCount = map.layers().length()
var chartImageName = ee.String('');
var chartImageDate;
var chartImage = ee.Image('');
var ndwiName;
// // EXPORT
// Export.image.toDrive({
//   image: demBucket.mosaic().updateMask(percent.gt(0)),
//   scale:10,
//   folder: "GEE_Outputs",
//     crs: 'EPSG:3857',
//   region: ee.Feature(grid.union().first()).bounds(),
//   maxPixels: 1e13,
//   fileNamePrefix: "CXRay_01_09_15_30_09_20"
// })
// Export.image.toAsset({
//   image: demBucket.mosaic().updateMask(percent.gt(0)),
//   scale:10,
//   folder: "GEE_Outputs",
//     crs: 'EPSG:3857',
//   region: ee.Feature(grid.union().first()).bounds(),
//   maxPixels: 1e13,
//   fileNamePrefix: "CXRay_01_09_15_30_09_20"
// })
// print(grid.distinct('cell').sort('numberOfImagesAnalysed', false))
// print(grid.distinct('cell').aggregate_mean('numberOfImagesAnalysed'))