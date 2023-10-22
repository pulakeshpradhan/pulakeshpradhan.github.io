var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #23cba7 */ee.Geometry.MultiPoint();
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var S2 = ee.Image("projects/ee-tensorflow-servir/assets/LTA/SenegalS2"),
    classified = ee.Image("users/chaponda/inph/AllRegions"),
    total = ee.Image("users/chaponda/inph/Total2"),
    geometry = /* color: #23cba7 */ee.Geometry.MultiPoint();
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/*******************************************************************************************************
 *  Application Test cartographie du riz en application
 *  app 2
 * ****************************************************************************************************/
var roi=ee.FeatureCollection("FAO/GAUL/2015/level0").filterMetadata('ADM0_NAME', 'equals', 'Senegal')
Map.setOptions('SATELLITE');
Map.setCenter(-16.0938,16.38926,11)
 //Map.addLayer(total.eq(1),{min:1,max:1, palette:['green']})
var vizp={
bands: ["B11","B8","B3"],
gamma: 1,
max: 0.50,
min: 0.085,
opacity: 1,
}
var palette = [
    "#b9c4c4", // not crop
    "#15c412",// Rice (green)
];
var viz = {
  min: 0,
  max: 1,
  palette: palette
};
var MAIN = 'False Color';
//var NOT_RICE= 'No Riz';
var RICE = 'Riz';
/*******************************************************************************************************l
* 
* ****************************************************************************************************/
var mainVis = S2.visualize(vizp);
var mixtecultureVis = total.eq(0).visualize({palette: '#b9c4c4'});
var riceVis = total.eq(1).visualize({palette: '#15c412'});
/*******************************************************************************************************l
*  panel and information
* ****************************************************************************************************/
var TITLE_STYLE = {
  fontSize: '18px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '8px',
};
var TEXT_STYLE = {
  fontSize: '15px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
var header = ui.Label('I N P', {fontSize: '30px', fontWeight: 'bold', color: 'black',textAlign: 'center',margin: '60px'});
var header = ui.Label('Institut Nationale de Pédologie', {fontSize: '15px', fontWeight: 'bold', color: 'black',textAlign: 'center',margin: '10px'});
//var text = ui.Label(
//  'Institut Nationale de Pédologie . ' ,
//    {fontSize: '22px'});
var text = ui.Label(
  'Plateforme de cartographie et de calcul  des statistiques des terres cultivées en riz dans les sites d’intervention du projet de développement de la chaine de valeur riz . ' +
  'draw on the map  will generate statistics of the region',
    {fontSize: '15px'});
var side_panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '250px'}});
ui.root.insert(0,side_panel)
/*******************************************************************************************************l
* 
* ****************************************************************************************************/
// MENU
var label = ui.Label('Choisir Oc Sol', TITLE_STYLE);
var select = ui.Select({
  items: [MAIN, RICE],
  value: MAIN,
  onChange: redraw,
  style: {
    stretch: 'horizontal'
  }
});
// PANEL
var panel = ui.Panel({
  widgets: [label, select],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    width: '175px',
    padding: '10px'
  }
});
side_panel.add(panel)
// FUNCTION VIZ
function redraw() {
  Map.layers().reset();
  var layer = select.getValue();
  var image;
  if (layer == MAIN) {
    image = mainVis;
  } else if (layer ==RICE ) {
    image = riceVis;
  }     
  Map.addLayer(image, {}, layer);
}
redraw();
/*******************************************************************************************************l
*  APP PART 2 FROM GEE 
* ****************************************************************************************************/
var labels=[
    "Autre",
    "Riz",
  ]
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({
      style: {
        position: 'bottom-right'
      }
    }),
    entry;
  legend.add(ui.Label({
    style: {
      fontWeight: 'bold',
      fontSize: '20px',
      margin: '1px 1px 4px 1px',
      padding: '2px'
    }
  }));
  for (var x = 0; x < lbl.length; x++) {
    entry = [ui.Label({
        style: {
          color: pal[x],
          border: '1px solid black',
          margin: '1px 1px 4px 1px'
        },
        value: '██'
      }),
      ui.Label({
        value: labels[x],
        style: {
          margin: '1px 1px 4px 4px'
        }
      })
    ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  }
  Map.add(legend);
};
add_legend('Legend', labels, palette);
/*******************************************************************************************************l
* 
* ****************************************************************************************************/
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
  ui.Map.GeometryLayer({
    geometries: null,
    name: 'geometry',
    color: '23cba7'
  });
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
var chartPanel = ui.Panel({
  style: {
    shown: false
  }
});
var areaClass = total.eq([0,1]).rename(labels);
var areaEstimate = areaClass.multiply(ee.Image.pixelArea()).divide(10000);
function chartAreaByClass() {
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  var aoi = drawingTools.layers().get(0).getEeObject();
  drawingTools.setShape(null);
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  var chart = ui.Chart.image
    .regions({
      image: areaEstimate,
      regions: aoi,
      reducer: ee.Reducer.sum(),
      scale: 10,
    })
    .setChartType('PieChart').setOptions({
      width: 350,
      height: 350,
      title: 'Area by class (ha)',
      is3D: false,
      colors: ['red','green'],
      pieHole:0.4
    });
  chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartAreaByClass, 500));
drawingTools.onEdit(ui.util.debounce(chartAreaByClass, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Choisir une géometrie.', TITLE_STYLE),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {
        stretch: 'horizontal'
      }
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {
        stretch: 'horizontal'
      }
    }),
    ui.Label('1. Dessiner une géometrie.'),
    ui.Label('2. Attendre que la carte apparait.'),
    ui.Label(
      '3. Repeter 1-2 or editer/deplacer\ngeometrie pour generer des stats.', {
        whiteSpace: 'pre'
      })
  ],
  style: {
    position: 'top-right'
  },
  layout: null,
});
Map.add(controlPanel);
//side_panel.add(controlPanel);
side_panel.add(chartPanel)
//::::::::::::::::::::::: side 2 panel to hold information :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var contactLabel = ui.Label({
    value: 'Contact: inph@gov.sn', 
    style: {fontSize: '12px',
            stretch: 'vertical',
            maxWidth: '120px'
    }
})
var SaintLouisZoom = new ui.Button({
  label: 'Saint Louis',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-15.69, 16.30,  10)
    } 
})
var MatamZoom = new ui.Button({
  label: 'Matam',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-13.60, 15.97, 10)
    }
});
var FatickZoom = new ui.Button({
  label: 'Fatick',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-16.57,14.24, 10)
    }
});
var KaolackZoom = new ui.Button({
  label: 'Kaolack',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-16.04,13.95, 14)
    }
});
var KaffrineZoom = new ui.Button({
  label: 'Kaffrine',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-15.40,14.11, 14)
    }
});
var ZiguinchorZoom = new ui.Button({
  label: 'Ziguinchor',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-16.35,12.79, 14)
    }
});
var KoldaZoom = new ui.Button({
  label: 'Kolda',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-15.02,13.12, 14)
    }
});
var TambaZoom = new ui.Button({
  label: 'Tamba',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-13.34,13.84, 14)
    }
});
var KedougouZoom = new ui.Button({
  label: 'Kedougou',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(-12.29,12.56, 14)
    }
});
var emptyLabel = new ui.Label({
    value: '', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var legendGeneral= new ui.Label({
    value: ' NAVIGATION', 
    style: {
    fontSize: '14px',
    stretch: 'vertical',
    fontWeight: 'bold',
    maxWidth: '100px',
    margin: '40px'
    }});
var textintros = new ui.Label({
    value: 'Navigation', 
    style: {
    fontSize: '14px',
    stretch: 'vertical',
    fontWeight: 'bold',
    padding: '15px 0px 0px 0px',
    margin: '40px'
    }});
var textintros1= new ui.Label({
    value: 'Cliquez pour faire un Zoom!', 
    style: {
    fontSize: '14px',
    fontWeight: 'bold',
    stretch: 'vertical'}});
var localization = new ui.Panel({
    widgets: [
//          legendGeneral,
//         textintros,
        textintros1,
        SaintLouisZoom, 
        MatamZoom,
        FatickZoom,
        KaolackZoom,
        KaffrineZoom,
        ZiguinchorZoom,
        KoldaZoom,
        TambaZoom,
        KedougouZoom, 
        contactLabel],
        style:{width: '7%'},
    layout: ui.Panel.Layout.flow('vertical'),
});
ui.root.add(localization);