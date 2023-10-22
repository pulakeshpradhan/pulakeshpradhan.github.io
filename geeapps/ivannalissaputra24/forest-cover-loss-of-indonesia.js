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
    }) || {"opacity":1,"bands":["treecover2000"],"min":59,"max":100,"palette":["bababa","1d8d1b"]};
var start = 1
var end = 20
var raw = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
var image = raw.select(['lossyear'])
var province = ee.FeatureCollection('users/ivannalissaputra24/Indo_Kab_Kot')
var kab_list = province.aggregate_array('PROVINSI').distinct()
kab_list.evaluate(function (kablist) {
    panel.province.items().reset(kablist)
})
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
var panel = {
    title: ui.Label({
        value: 'Forest Cover Loss of Indonesia - ',
        style: styleH1
    }),
    sec_panel:ui.Label({
      value:'District Level Dropdown',
      style:{
        fontWeight: 'bold',
        fontSize: '14px',
        margin: '5px 5px 5px 5px',
        padding: '0px 0px 0px 0px',
        color: 'green'
      }
    }),
    sub_title: ui.Label({
        value: 'Select your area and see the total area of forest cover loss each year.',
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
        value: 'Select your area :',
        style: styleH2
    }),
    pro: ui.Label({
        value: 'Province Name :',
        style: styleP
    }),
    province: ui.Select({
        placeholder: 'Select Province',
        style: styleBox,
        onChange: function (a) {
            panel.loading.style().set({
                shown: false
            })
            panel.district.set({
                disabled: false
            })
            var filter = province.filterMetadata('PROVINSI', 'equals', a)
            filter.aggregate_array('KABKOT').evaluate(function (list) {
                panel.district.items().reset(list)
            })
        }
    }),
    dis: ui.Label({
        value: 'District Name :',
        style: styleP
    }),
    district: ui.Select({
        placeholder: 'Select District',
        style: styleBox,
        disabled: true,
        onChange: function () {
            Map.clear()
            Map.addLayer(raw.select(['treecover2000']), imageVisParam4, 'Forest Cover 2000')
            var layer = province.filterMetadata('KABKOT', 'equals', panel.district.getValue())
            var forestLoss = image.clip(layer)
            var nullImage = ee.Image().byte();
            var district_outline = nullImage.paint({
                featureCollection: layer,
                width: 1.5
            });
            var image_clip = ee.ImageCollection(ee.List.sequence(start, end).map(function (a) {
                var mask = forestLoss.eq(ee.Number(a).int()).selfMask()
                return mask.set('Year', ee.Number(2000).add(a))
            }))
            var year_list = image_clip.aggregate_array('Year')
            year_list.evaluate(function (year) {
                year.map(function (y) {
                    var img_fil = image_clip.filterMetadata('Year', 'equals', y).first()
                    return Map.addLayer(img_fil, {
                        palette: 'red'
                    }, 'Loss Year: ' + y.toString(), false)
                })
            })
            var lossImage = raw.select(['loss']);
            var lossAreaImage = lossImage.multiply(ee.Image.pixelArea());
            var lossYear = raw.select(['lossyear']);
            var lossByYear = lossAreaImage.addBands(lossYear).reduceRegion({
                reducer: ee.Reducer.sum().group({
                    groupField: 1
                }),
                geometry: layer,
                scale: 30,
                maxPixels: 1e13,
                crs: 'EPSG:4326'
            });
            var statsFormatted = ee.List(lossByYear.get('groups'))
                .map(function (el) {
                    var d = ee.Dictionary(el)
                    return [ee.Number(d.get('group')).format("20%02d"), ee.Number(d.get('sum')).multiply(0.0001).int()];
                });
            var lossDictionary = ee.Dictionary(statsFormatted.flatten())
            var chartPanel = ui.Panel({
                style: {
                    position: 'bottom-left',
                    padding: '5px 5px',
                    width: '500px'
                }
            })
            var chart = ui.Chart.array.values({
                    array: lossDictionary.values(),
                    axis: 0,
                    xLabels: lossDictionary.keys(),
                }).setChartType('ComboChart')
                .setOptions({
                    title: 'Yearly Forest Loss',
                    series: {0: {type: 'bars'}, 1: {type: 'line'}},
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
            Map.remove(chartPanel)
            chartPanel.add(chart)
            Map.add(chartPanel)
            Map.addLayer(district_outline, {
                palette: 'black'
            }, panel.district.getValue())
            Map.centerObject(layer)
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
        value: 'Select your area and then go to the "Layers" dropdown (top-right corner), near "Map | Satellite" selection. Check the layer options to show the pixels of forest cover loss.',
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
        panel.pro,
        panel.province,
        panel.dis,
        panel.district,
        panel.loading,
        panel.legend_title,
        ui.Panel([
            ui.Label({
                style: {
                    backgroundColor: 'black',
                    padding: '8px',
                    margin: '0 10px 10px 10px'
                }
            }),
            ui.Label({
                value: 'District Boundary',
                style: {
                    fontSize: '12px',
                    margin: '0px'
                }
            })
        ], ui.Panel.Layout.Flow('horizontal')),
        ui.Panel([
            ui.Label({
                style: {
                    backgroundColor: 'red',
                    padding: '8px',
                    margin: '0 10px 10px 10px'
                }
            }),
            ui.Label({
                value: 'Forest Loss',
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
                value: 'Forest Year 2000 ( Tree Cover > 50% )',
                style: {
                    fontSize: '12px',
                    margin: '0px'
                }
            })
        ], ui.Panel.Layout.Flow('horizontal')),
        ui.Label('About :', styleH2),
        ui.Label({value:'Author : Ivannalis Saputra', style:{fontSize:'12px',margin:'3px 5px'}}),
        ui.Label({value:'Email : ivannalis.saputra24@gmail.com', style:{fontSize:'12px',margin:'3px 5px'}}),
        ui.Label({value:'Website: https://insgis.my.id', style:{fontSize:'12px',margin:'3px 5px'}}).setUrl('https://insgis.my.id'),
        ui.Label({value:'Youtube: INS GIS', style:{fontSize:'12px',margin:'3px 5px'}}).setUrl('https://www.youtube.com/c/INSGIS/videos'),
    ],
    style: {
        margin: '12px',
        position: 'bottom-left',
        width: '320px'
    },
})
Map.setCenter( 114.88, -1.17,5)
ui.root.add(panel_fill)