var imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "treecover2000"
        ],
        "min": 0.5,
        "palette": [
          "bababa",
          "1d8d1b"
        ]
      }
    }) || {"opacity":1,"bands":["treecover2000"],"min":0.5,"palette":["bababa","1d8d1b"]},
    table = ui.import && ui.import("table", "table", {
      "id": "users/ivannalissaputra24/Indo_Kab_Kot"
    }) || ee.FeatureCollection("users/ivannalissaputra24/Indo_Kab_Kot"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "treecover2000"
        ],
        "min": 50,
        "max": 100,
        "palette": [
          "000000",
          "28c426"
        ]
      }
    }) || {"opacity":1,"bands":["treecover2000"],"min":50,"max":100,"palette":["000000","28c426"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "treecover2000"
        ],
        "min": 50,
        "max": 100,
        "palette": [
          "bababa",
          "1d8d1b"
        ]
      }
    }) || {"opacity":1,"bands":["treecover2000"],"min":50,"max":100,"palette":["bababa","1d8d1b"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "treecover2000"
        ],
        "min": 59,
        "max": 100,
        "palette": [
          "bababa",
          "1d8d1b"
        ]
      }
    }) || {"opacity":1,"bands":["treecover2000"],"min":59,"max":100,"palette":["bababa","1d8d1b"]},
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "treecover2000"
        ],
        "min": 50,
        "max": 100,
        "palette": [
          "292929",
          "1d8d1b"
        ]
      }
    }) || {"opacity":1,"bands":["treecover2000"],"min":50,"max":100,"palette":["292929","1d8d1b"]},
    imageVisParam6 = ui.import && ui.import("imageVisParam6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "treecover2000"
        ],
        "min": 30,
        "max": 100,
        "palette": [
          "292929",
          "1d8d1b"
        ]
      }
    }) || {"opacity":1,"bands":["treecover2000"],"min":30,"max":100,"palette":["292929","1d8d1b"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var start = 1
var end = 20
var raw = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
var styleBox = {
    padding: '0px 0px 0px 0px',
    width: '250px',
}
var styleH1 = {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'green'
}
var styleH2 = {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '5px 5px',
    // padding: '0px 15px 0px 0px',
    color: 'black'
}
var styleP = {
    fontSize: '12px',
    margin: '5px 5px',
    padding: '0px 0px 0px 0px'
}
var symbol = {
    rectangle: '⬛',
    polygon: '🔺',
};
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
    var layer = drawingTools.layers().get(0);
    drawingTools.layers().remove(layer);
}
var nullGeometry =
    ui.Map.GeometryLayer({
        geometries: null,
        name: 'geometry',
        color: '23cba7'
    });
drawingTools.layers().add(nullGeometry);
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
            position: 'bottom-left',
            padding: '5px 5px',
            width: '500px',
            shown: false
        }
    })
Map.add(chartPanel)
function ForestCoverLoss() {
    if (!chartPanel.style().get('shown')) {
        chartPanel.style().set('shown', true);
      }
    var area = drawingTools.layers().get(0).getEeObject();
    drawingTools.setShape(null);
    var loss = raw.select(['loss'])
    var lossyear = raw.select(['lossyear'])
    var lossAreaImage = loss.multiply(ee.Image.pixelArea());
    var lossByYear = lossAreaImage.addBands(lossyear).reduceRegion({
        reducer: ee.Reducer.sum().group({
            groupField: 1
        }),
        geometry: area,
        scale: 30,
        maxPixels: 1e13,
        // crs: 'EPSG:4326'
    });
    var statsFormatted = ee.List(lossByYear.get('groups'))
        .map(function (el) {
            var d = ee.Dictionary(el)
            return [ee.Number(d.get('group')).format("20%02d"), ee.Number(d.get('sum')).multiply(0.0001).int()];
        });
    var lossDictionary = ee.Dictionary(statsFormatted.flatten())
    var chart = ui.Chart.array.values({
            array: lossDictionary.values(),
            axis: 0,
            xLabels: lossDictionary.keys(),
        }).setChartType('ColumnChart')
        .setOptions({
            title: 'Yearly Forest Loss',
            hAxis: {
                title: 'Year',
                format: '####',
                textStyle: {
                    fontSize: 9
                }
            },
            vAxis: {
                title: 'Area (hectares)',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                position: "none"
            },
            lineWidth: 1,
            pointSize: 3,
            style: {
                shown: false
            }
        });
    chartPanel.widgets().reset([chart]);
}
var panel = {
    title: ui.Label({
        value: 'Global Forest Cover Loss',
        style: styleH1
    }),
    sec_panel: ui.Label({
        value: 'On-Draw Polygon',
        style: {
            fontWeight: 'bold',
            fontSize: '14px',
            margin: '5px 5px 5px 5px',
            padding: '0px 0px 0px 0px',
            color: 'green'
        }
    }),
    sub_title: ui.Label({
        value: 'Draw your area and see the total area of forest cover loss each year.',
        style: styleP
    }),
    provider: ui.Label({
        value: 'Dataset provider :',
        style: styleH2
    }),
    source: ui.Label({
        value: 'Hansen Global Forest Change v1.8 (2000-2020)',
        style: styleP
    }).setUrl('http://earthenginepartners.appspot.com/science-2013-global-forest'),
    area_list: ui.Label({
        value: 'Drawing tools :',
        style: styleH2
    }),
    draw_rectangle: ui.Button({
        label: symbol.rectangle + ' Rectangle',
        onClick: drawRectangle,
        style: {
            stretch: 'horizontal'
        }
    }),
    draw_poly: ui.Button({
        label: symbol.polygon + ' Polygon',
        onClick: drawPolygon,
        style: {
            stretch: 'horizontal'
        }
    }),
    loading: ui.Label({
        value: 'Waiting for the district area is selected.....',
        style: {
            shown: true,
            color: 'grey',
            fontSize: '12px'
        }
    }),
    legend_title: ui.Label({
        value: 'Legend :',
        style: {
            fontWeight: 'bold',
            fontSize: '14px',
            margin: '5px 5px 8px 5px',
            // padding: '0px 15px 0px 0px',
            color: 'black'
        }
    }),
    instruction: ui.Label({
        value: 'Instruction :',
        style: {
            fontWeight: 'bold',
            fontSize: '14px',
            margin: '5px 5px',
            // padding: '0px 15px 0px 0px',
            color: 'black'
        }
    }),
    order: ui.Label({
        value: 'Draw your polygon and it would quantify forest cover loss within your AOI in hectares.',
        style: styleP
    }),
}
var panel_fill = ui.Panel({
    widgets: [
        panel.title,
        panel.sec_panel,
        panel.sub_title,
        panel.instruction,
        panel.order,
        panel.provider,
        panel.source,
        panel.area_list,
        panel.draw_rectangle,
        panel.draw_poly,
        // panel.loading,
        panel.legend_title,
        ui.Panel([
            ui.Label({
                style: {
                    backgroundColor: 'red',
                    padding: '8px',
                    margin: '0 10px 10px 10px'
                }
            }),
            ui.Label({
                value: 'Forest Loss 2001-2020',
                style: {
                    fontSize: '12px',
                    margin: '0px'
                }
            })
        ], ui.Panel.Layout.Flow('horizontal')),
        ui.Panel([
            ui.Label({
                style: {
                    backgroundColor: '#1d8d1b',
                    padding: '8px',
                    margin: '0 10px 10px 10px'
                }
            }),
            ui.Label({
                value: 'Forest Year 2000 ( Tree Cover > 30% )',
                style: {
                    fontSize: '12px',
                    margin: '0px'
                }
            })
        ], ui.Panel.Layout.Flow('horizontal')),
        ui.Label('About :', styleH2),
        ui.Label({
            value: 'Author : Ivannalis Saputra',
            style: {
                fontSize: '12px',
                margin: '3px 5px'
            }
        }),
        ui.Label({
            value: 'Email : ivannalis.saputra24@gmail.com',
            style: {
                fontSize: '12px',
                margin: '3px 5px'
            }
        }),
        ui.Label({
            value: 'Website: https://insgis.my.id',
            style: {
                fontSize: '12px',
                margin: '3px 5px'
            }
        }).setUrl('https://insgis.my.id'),
        ui.Label({
            value: 'Youtube: INS GIS',
            style: {
                fontSize: '12px',
                margin: '3px 5px'
            }
        }).setUrl('https://www.youtube.com/c/INSGIS/videos'),
    ],
    style: {
        margin: '12px',
        position: 'bottom-left',
        width: '320px'
    },
})
// Map.setCenter( 114.88, -1.17,5)
drawingTools.onDraw(ui.util.debounce(ForestCoverLoss, 300))
drawingTools.onEdit(ui.util.debounce(ForestCoverLoss, 300))
Map.addLayer(raw.select(['treecover2000']), imageVisParam6, 'Forest Cover 2000')
Map.addLayer(raw.select(['lossyear']), {
    palette: 'red'
}, 'Forest Loss 2001-2020')
ui.root.add(panel_fill)