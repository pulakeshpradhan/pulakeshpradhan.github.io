var province = ee.FeatureCollection('users/ivannalis/BATAS_KAB_KALBAR')
var kab_list = province.aggregate_array('WA').distinct()
kab_list.evaluate(function (kablist) {
    panel.province.items().reset(kablist)
})
function initMap(area) {
    // set month property to the data
    function SetDate(img) {
        var date = ee.Date(img.get('version_date'))
        var y = ee.String(date.get('year'))
        var m = ee.String(date.get('month'))
        return img.set('date', y.cat('-').cat(m))
    }
    // area Calculation
    function AreaCalculattion(img) {
        var reducer = ee.Reducer.sum().combine({
            reducer2: ee.Reducer.count(),
            sharedInputs: true
        })
        var areas = ee.Image.pixelArea().addBands(img).reduceRegion({
            reducer: reducer.group({
                groupField: 1,
                groupName: 'def',
            }),
            geometry: area,
            scale: 30,
            maxPixels: 1e13
        });
        var sum = ee.List(areas.get('groups')).map(function (group) {
            var area = ee.Dictionary(group);
            var properties = {
                'area_hectares': ee.Number(area.get('sum')).divide(1e6).multiply(100),
                'count': ee.Number(area.get('count')),
            }
            return properties
        })
        return sum
    }
    // convert result to dictionary
    function convertAreaToDict(coll) {
        var hectare_coll = coll.aggregate_array('date').distinct()
            .map(function (date) {
                var fil = coll.filterMetadata('date', 'equals', date).first()
                var cal = AreaCalculattion(fil).get(0)
                return [date, ee.Dictionary(cal).get('area_hectares')]
            }).flatten()
        return hectare_coll
    }
    // get deforestation pixel = mosaic(i0 erase i1)
    function getDefByMonth(m1, m0, list_col) {
        var i1 = list_image.get(m1)
        var i0 = list_image.get(m0)
        var mask = ee.Image(i1).eq(i0).mask().not()
        var final_mask = ee.Image(i1).updateMask(mask)
        return final_mask
    }
    // RADD image collection
    var radd = ee.ImageCollection('projects/radar-wur/raddalert/v1')
    // applying to dataset
    var dataset = radd
        .filterMetadata('layer', 'contains', 'alert')
        .filterBounds(area)
        .map(SetDate)
    // forest baseline
    var forest_baseline = ee.Image(radd.filterMetadata('layer','contains','forest_baseline')
                      .filterMetadata('geography','contains','asia').first())
    // monthly mosaic
    var monthlyMosaic = ee.ImageCollection(
        dataset.aggregate_array('date').distinct()
        .map(function (date) {
            var collSameMonth = dataset.filterMetadata('date', 'equals', date).mosaic()
            // selecting high confidence level of deforestation pixel
            var highconfid = collSameMonth.select('Alert')
            return highconfid.set('date', date)
        }))
    // list of date, use for slicing data as property
    var date_list = monthlyMosaic.aggregate_array('date')
    // convert monthly mosaic to list, use for slicing data as input
    var list_image = monthlyMosaic.toList(monthlyMosaic.size())
    // get index of data for determine month n and month n + 1
    var index = monthlyMosaic.aggregate_array('system:index')
    // slicing process
    var slicing = index.map(function (index) {
        var i = ee.Number.parse(index)
        var sl = ee.ImageCollection(list_image.slice(0, i, 1)).mosaic()
            .set('date', date_list.get(i))
        return sl.set('count', sl.bandNames().size())
    }).filter(ee.Filter.neq('count', 0))
    // final list after slicing
    var final_list = ee.List([list_image.get(0)]).cat(slicing)
    // produce masking image, month 1 - month 0
    var mask_def = index.map(function (index) {
        var i = ee.Number.parse(index).add(1)
        var ii = i.subtract(1)
        return ee.Algorithms.If(i.neq(final_list.size()), getDefByMonth(i, ii, final_list))
    })
    // final collection 
    var final_col = ee.ImageCollection(ee.List([list_image.get(0)]).cat(mask_def))
    // deforestation area
    var getAreaByMonth = ee.Dictionary(convertAreaToDict(final_col))
    // print('Deforestated Area (ha): ',getAreaByMonth)
    // add deforestation data to map
    date_list.evaluate(function (j) {
        j.map(function (a, i) {
            var col = final_col.filterMetadata('date', 'equals', a).first()
            Map.addLayer(col.clip(area), {
                min: 2,
                max: 3,
                palette: ['blue', 'coral']
            }, a)
        })
    })
    var chartPanel = ui.Panel({
        style: {
            position: 'bottom-left',
            padding: '5px 5px',
            width: '500px'
        }
    })
    var sum = getAreaByMonth.values().reduce(ee.Reducer.sum())
    var chart = ui.Chart.array.values({
        array: getAreaByMonth.values(),
        axis: 0,
        xLabels: getAreaByMonth.keys(),
    }).setChartType('ComboChart')
        .setOptions({
            title: 'Monthly Forest Cover Change',
            series: { 0: { type: 'bars' }, 1: { type: 'line' } },
            hAxis: {
                title: 'Month, ' +' '+ 'total: '+sum.getInfo() + ' hectares' ,
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
        var nullImage = ee.Image().byte();
        var district_outline = nullImage.paint({
          featureCollection: area,
          width: 1.5
        });
        Map.addLayer(forest_baseline.clip(area), {palette:['black'], opacity: 0.3},'Forest baseline')
        Map.addLayer(district_outline,{}, 'Batas Administrasi')
        Map.centerObject(area)
}
var first_kab = province.filterMetadata('WA','equals','KAB. KUBU RAYA')
initMap(first_kab)
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
        value: 'Forest Cover Change of WK - RADD',
        style: styleH1
    }),
    sub_title: ui.Label({
        value: 'Select your area and see the accumulation of deforestation area each month.',
        style: styleP
    }),
    provider: ui.Label({
        value: 'Dataset provider :',
        style: styleH2
    }),
    source: ui.Label({
        value: 'RADD Forest Disturbance Alert',
        style: styleP
    }).setUrl('https://www.wur.nl/en/Research-Results/Chair-groups/Environmental-Sciences/Laboratory-of-Geo-information-Science-and-Remote-Sensing/Research/Sensing-measuring/RADD-Forest-Disturbance-Alert.htm'),
    area_list: ui.Label({
        value: 'Select your area :',
        style: styleH2
    }),
    pro: ui.Label({
        value: 'Distrcit Name :',
        style: styleP
    }),
    province: ui.Select({
        placeholder: 'Select other districts',
        style: styleBox,
        onChange: function () {
            Map.clear()
            var kab = province.filterMetadata('WA', 'equals', panel.province.getValue())
            initMap(kab)
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
}
var panel_fill = ui.Panel({
    widgets: [
        panel.title,
        panel.sub_title,
        panel.provider,
        panel.source,
        panel.area_list,
        panel.pro,
        panel.province,
        // panel.district,
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
                    backgroundColor: 'blue',
                    padding: '8px',
                    margin: '0 10px 10px 10px'
                }
            }),
            ui.Label({
                value: 'Low Confidence',
                style: {
                    fontSize: '12px',
                    margin: '0px'
                }
            })
        ], ui.Panel.Layout.Flow('horizontal')),
        ui.Panel([
            ui.Label({
                style: {
                    backgroundColor: 'coral',
                    padding: '8px',
                    margin: '0 10px 10px 10px'
                }
            }),
            ui.Label({
                value: 'High Confidence',
                style: {
                    fontSize: '12px',
                    margin: '0px'
                }
            })
        ], ui.Panel.Layout.Flow('horizontal')),
        ui.Panel([
            ui.Label({
                style: {
                    backgroundColor: '#0006',
                    padding: '8px',
                    margin: '0 10px 10px 10px'
                }
            }),
            ui.Label({
                value: 'Forest Baseline ( RADD )',
                style: {
                    fontSize: '12px',
                    margin: '0px'
                }
            })
        ], ui.Panel.Layout.Flow('horizontal')),
    ],
    style: {
        margin: '12px',
        position: 'bottom-left',
        width: '320px'
    },
})
// Map.setCenter(110.54624574419591,-0.312556522202702,7)
ui.root.add(panel_fill)