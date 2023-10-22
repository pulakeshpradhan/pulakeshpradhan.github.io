var styleH1 = {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 5px',
    padding: '0px 0px 0px 0px'
}
var styleH2 = {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px 5px',
    padding: '0px 15px 0px 0px',
    color: '#192bc2'
}
// Create the panel for the legend items.
var welcome = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
var label = ui.Label({
  value:'Before we start, please draw your AOI first!',
  style:{
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 5px',
    padding: '0px 0px 0px 0px'
  }
})
var btn = ui.Button({
  label:'close',
  style: {
    width:'150px',
    padding:'5px',
    margin: 'auto',
    position:'bottom-right',
  },
  onClick: function(){
      Map.remove(welcome)
    }
})
welcome.add(label)
welcome.add(btn)
Map.add(welcome)
Map.drawingTools().onDraw(function(aoi){
var geometry = aoi
Map.drawingTools().onEdit(function(aoi2){
  geometry = aoi2
  secPanel.re_run_code.style().set({shown:true})
})
function downloadImg(img,obj) {
  var url = img.getDownloadURL(obj);
  secPanel.urldownload.setUrl(url);
  secPanel.urldownload.style().set({shown: true});
}
// cloud masking function
function l8ToaCM(img) {
    var band = img.select(['BQA']).eq(2720)
    return img.updateMask(band)
}
function l8SrCM(img) {
    var cloudShadowBitMask = (1 << 3);
    var cloudsBitMask = (1 << 5);
    // Get the pixel QA band.
    var qa = img.select('pixel_qa');
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
        .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    return img.updateMask(mask);
}
function s2CM(img) {
    var qa = img.select('QA60');
    // Bits 10 and 11 are clouds and cirrus, respectively.
    var cloudBitMask = 1 << 10;
    var cirrusBitMask = 1 << 11;
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
        .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
    return img.updateMask(mask);
}
var coll_list = {
    'Landsat 8 TOA': ['LANDSAT/LC08/C01/T1_TOA', 'CLOUD_COVER', 'L', {
        bands: ['B6', 'B5', 'B4']
    }],
    'Landsat 8 SR T1': ['LANDSAT/LC08/C01/T1_SR', 'CLOUD_COVER', 'L', {
        bands: ['B6', 'B5', 'B4'],
        min: 14,
        max: 7300
    }],
    'Sentinel 2 1C': ['COPERNICUS/S2', 'CLOUDY_PIXEL_PERCENTAGE', 'S2', {
        bands: ['B11', 'B8', 'B4'],
        min: 100,
        max: 3800
    }],
    'Sentinel 2 SR': ['COPERNICUS/S2_SR', 'CLOUDY_PIXEL_PERCENTAGE', 'S2', {
        bands: ['B11', 'B8', 'B4'],
        min: 100,
        max: 3800
    }]
}
var styleBox = {
    padding: '0px 0px 0px 0px',
    width: '300px',
}
var styleH1 = {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 5px',
    padding: '0px 0px 0px 0px'
}
var styleH2 = {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px 5px',
    padding: '0px 15px 0px 0px',
    color: '#192bc2'
}
var styleP = {
    fontSize: '12px',
    margin: '5px 5px',
    padding: '0px 0px 0px 0px'
}
var features = {
    prop_fil: ui.Textbox({
        placeholder: 'Image Properties',
        disabled: true,
        style: styleBox
    }),
    col_id: ui.Textbox({
        placeholder: '........',
        style: styleBox,
        disabled: true
    }),
    col_selection: ui.Select({
        items: Object.keys(coll_list),
        placeholder: 'Raster Collections',
        style: styleBox,
        onChange: function (a) {
            var id = coll_list[a]
            features.prop_fil.setValue(id[1])
            features.col_id.setValue(id[0])
        }
    }),
    startDate: ui.Textbox({
        placeholder: 'YYYY-MM-DD',
        value: '2019-01-01',
        style: styleBox
    }),
    endDate: ui.Textbox({
        placeholder: 'YYYY-MM-DD',
        value: '2019-05-30',
        style: styleBox
    }),
    prop_operation: ui.Select({
        items: [
            'less_than',
            'greater_than',
        ],
        placeholder: 'No operator selected....',
        style: styleBox
    }),
    property_value: ui.Textbox({
        placeholder: 'Property Value',
        style: styleBox
    }),
    cloud_mask_check: ui.Checkbox({
        label: 'Apply cloud masking',
        onChange: function () {
            secPanel.list_image.items().reset()
        }
    }),
    empty_form_mess: ui.Label({
        value: "Empty data not allowed!",
        style: {
            padding: '6px 0px 0px 0px',
            shown: false,
            color: 'red',
        }
    }),
}
var secPanel = {
    results: ui.Label({
        value: 'Loading.....',
        style: styleH1
    }),
    list_image: ui.Select({
        placeholder: 'No image selected.....',
        style: styleBox,
        onChange: function (a) {
            Map.clear()
            var col_name = features.col_selection.getValue()
            var col_id = features.col_id.getValue()
            var img = ee.Image(col_id + '/' + a)
            img.get(features.prop_fil.getValue()).evaluate(function (a) {
                secPanel.cloud_cover.setValue('Cloud Cover : ' + a.toFixed(2) + ' %')
            })
            var date = ee.Date(img.get('system:time_start')).format("yyyy-MM-dd")
            date.evaluate(function (a) {
                secPanel.aq_date.setValue('Aquisition Date : ' + a)
            })
            if (features.cloud_mask_check.getValue() === true) {
                if (col_name === 'Landsat 8 TOA') {
                    var fin = l8ToaCM(img)
                    Map.addLayer(fin.visualize(coll_list['Landsat 8 TOA'][3]))
                } else if (col_name === 'Landsat 8 SR T1') {
                    var fin = l8SrCM(img)
                    Map.addLayer(fin.visualize(coll_list['Landsat 8 SR T1'][3]))
                } else if (col_name === 'Sentinel 2 1C' || col_name === 'Sentinel 2 SR') {
                    var fin = s2CM(img)
                    Map.addLayer(fin.visualize(coll_list['Sentinel 2 1C'][3]))
                }
            } else {
                if (col_name === 'Landsat 8 TOA') {
                    Map.addLayer(img.visualize(coll_list['Landsat 8 TOA'][3]))
                } else if (col_name === 'Landsat 8 SR T1') {
                    Map.addLayer(img.visualize(coll_list['Landsat 8 SR T1'][3]))
                } else if (col_name === 'Sentinel 2 1C' || col_name === 'Sentinel 2 SR') {
                    Map.addLayer(img.visualize(coll_list['Sentinel 2 1C'][3]))
                }
            }
            Map.drawingTools().setShown(false)
            // Map.drawingTools().setShape(null)
            ui.Map.GeometryLayer({
              geometries:[geometry], name:'geometry', color:'black', shown:false
            })
            secPanel.caution.style().set({
                shown: false
            })
        }
    }),
    cloud_cover: ui.Label({
        value: 'Cloud Cover : loading......',
        style: styleP
    }),
    aq_date: ui.Label({
        value: 'Acquisition Date : loading......',
        style: styleP
    }),
    cloudMasking_TorF: ui.Label({
        value: 'Cloud Masking : loading......',
        style: styleP
    }),
    caution: ui.Label({
        value: "Please, select your image!",
        style: {
            shown: false,
            color: 'red'
        }
    }),
    checkbox_clip: ui.Checkbox({
        value: false,
        label: 'Clip your selected image using AOI polygon(s)',
        style: styleP,
        onChange: function () {
            secPanel.geo_confirm.style().set({
                shown: false
            })
        }
    }),
    buttonApply: ui.Button({
        label: 'Generate Download Link',
        onClick: function () {
            var col_name = features.col_selection.getValue()
            var col_id = features.col_id.getValue() + '/' + secPanel.list_image.getValue()
            var img = ee.Image(col_id)
            if (secPanel.list_image.getValue() === null) {
                secPanel.caution.style().set({
                    shown: true
                })
            } else if (secPanel.results.getValue() === 'Result: undefined image(s)' ||
                secPanel.results.getValue() === 'Result: 0 image(s)' ||
                secPanel.list_image.getValue() === undefined) {
                secPanel.nodata_confirm.style().set({
                    shown: true
                })
            } else {
                // cloud masking true - cliping true
                if (features.cloud_mask_check.getValue() === true) {
                    if (secPanel.checkbox_clip.getValue() === true) {
                        img = img.clip(geometry)
                        geometry.type().evaluate(function (type) {
                            if (type === 'Polygon' || type === 'MultiPolygon') {
                                if (col_name === 'Landsat 8 TOA') {
                                    var fin = l8ToaCM(img)
                                    var obj = {
                                        image: fin.float(),
                                        name: col_name + '_'+ secPanel.list_image.getValue(),
                                        region: geometry,
                                        scale:30,
                                        maxPixels: 1e13
                                    }
                                    downloadImg(fin,obj)
                                } else if (col_name === 'Landsat 8 SR T1') {
                                    var fin = l8SrCM(img)
                                    var obj = {
                                        image: fin.int16(),
                                        name: col_name + '_'+ secPanel.list_image.getValue(),
                                        region: geometry,
                                        scale:30,
                                        maxPixels: 1e13
                                    }
                                    downloadImg(fin,obj)
                                } else if (col_name === 'Sentinel 2 1C' || col_name === 'Sentinel 2 SR') {
                                    var fin = s2CM(img)
                                    var obj = {
                                        image: fin.int16(),
                                        name: col_name + '_'+ secPanel.list_image.getValue(),
                                        region: geometry,
                                        scale:20,
                                        maxPixels: 1e13
                                    }
                                    downloadImg(fin,obj)
                                }
                            } else {
                                secPanel.geo_confirm.style().set({
                                    shown: true
                                })
                            }
                        })
                    }
                    // cloud masking true - clipping false
                }
                if (features.cloud_mask_check.getValue() === true) {
                    if (secPanel.checkbox_clip.getValue() === false) {
                        if (col_name === 'Landsat 8 TOA') {
                            var fin = l8ToaCM(img)
                            var obj = {
                                image: fin.float(),
                                name: col_name + '_'+ secPanel.list_image.getValue(),
                                scale:30,
                                maxPixels: 1e13
                            }
                            downloadImg(fin,obj)
                        } else if (col_name === 'Landsat 8 SR T1') {
                            var fin = l8SrCM(img)
                            var obj = {
                                image: fin.int16(),
                                name: col_name + '_'+ secPanel.list_image.getValue(),
                                scale:30,
                                maxPixels: 1e13
                            }
                            downloadImg(fin,obj)
                        } else if (col_name === 'Sentinel 2 1C' || col_name === 'Sentinel 2 SR') {
                            var fin = s2CM(img)
                            var obj = {
                                image: fin.int16(),
                                name: col_name + '_'+ secPanel.list_image.getValue(),
                                scale:20,
                                maxPixels: 1e13
                            }
                            downloadImg(fin,obj)
                        }
                    }
                    // cloud masking false - clipping true
                }
                if (features.cloud_mask_check.getValue() === false) {
                    if (secPanel.checkbox_clip.getValue() === true) {
                        img = img.clip(geometry)
                        geometry.type().evaluate(function (type) {
                            if (type === 'Polygon' || type === 'MultiPolygon') {
                                if (col_name === 'Landsat 8 TOA') {
                                    var fin = img
                                    var obj = {
                                        image: fin.float(),
                                        name: col_name + '_'+ secPanel.list_image.getValue(),
                                        region: geometry,
                                        scale:30,
                                        maxPixels: 1e13
                                    }
                                    downloadImg(fin,obj)
                                } else if (col_name === 'Landsat 8 SR T1') {
                                    var fin = img
                                    var obj = {
                                        image: fin.int16(),
                                        name: col_name + '_'+ secPanel.list_image.getValue(),
                                        region: geometry,
                                        scale:20,
                                        maxPixels: 1e13
                                    }
                                    downloadImg(fin,obj)
                                } else if (col_name === 'Sentinel 2 1C' || col_name === 'Sentinel 2 SR') {
                                    var fin = img
                                    var obj = {
                                        image: fin.int16(),
                                        name: col_name + '_'+ secPanel.list_image.getValue(),
                                        region: geometry,
                                        scale:20,
                                        maxPixels: 1e13
                                    }
                                    downloadImg(fin,obj)
                                }
                            } else {
                                secPanel.geo_confirm.style().set({
                                    shown: true
                                })
                            }
                        })
                    }
                    // cloud masking false - clipping false  
                }
                if (features.cloud_mask_check.getValue() === false) {
                    if (secPanel.checkbox_clip.getValue() === false) {
                       img = img
                      if (col_name === 'Landsat 8 TOA') {
                          var fin = img
                          var obj = {
                              image: fin.visualize({bands:['B4','B3','B2']}),
                              name: col_name + '_'+ secPanel.list_image.getValue(),
                              scale:30,
                              maxPixels: 1e13
                          }
                          downloadImg(fin,obj)
                      } else if (col_name === 'Landsat 8 SR T1') {
                          var fin = img
                          var obj = {
                              image: fin.int16(),
                              name: col_name + '_'+ secPanel.list_image.getValue(),
                              scale:30,
                              maxPixels: 1e13
                          }
                          downloadImg(fin,obj)
                      } else if (col_name === 'Sentinel 2 1C' || col_name === 'Sentinel 2 SR') {
                          var fin = img
                          var obj = {
                              image: fin.int16(),
                              name: col_name + '_'+ secPanel.list_image.getValue(),
                              scale:20,
                              maxPixels: 1e13
                          }
                          downloadImg(fin,obj)
                      }
                    }
                }
            }
        },
        style: {
            width: '150px'
        }
    }),
    buttonReset: ui.Button({
        label: 'Back',
        onClick: function () {
            ui.root.remove(pickImagePanel);
            Map.drawingTools().setShown(false)
            secPanel.results.setValue('Loading......')
             secPanel.urldownload.style().set({shown:false})
            secPanel.geo_confirm.style().set({
                shown: false
            })
            features.empty_form_mess.style().set({
                shown: false
            })
            ui.root.add(panel);
        },
        style: {
            width: '150px'
        }
    }),
    geo_confirm: ui.Label({
        value: "Please ensure your AOI's type is 'Polygon' or 'MultiPolygon'",
        style: {
            shown: false,
            color: 'red'
        }
    }),
    nodata_confirm: ui.Label({
        value: 'Undefined or 0 image. Please check your filter!',
        style: {
            shown: false,
            color: 'red'
        }
    }),
    undefined_caution: ui.Label({
        value: 'No image found! please check your input!',
        style: {
            shown: false,
            color: 'red'
        }
    }),
    re_run_code: ui.Label({
        value:'Your AOI was edited, please back and re-run your code!',
        style: {
            shown: false,
            color: 'orange',
            padding:'0px'
        }
    }),
    urldownload: ui.Label({
      value:'Download Image',
      style: {
        shown: false,
        color:'blue'
      }
    })
}
var panel_fill = {
    widgets: [
        ui.Label('Raster Downloader', styleH1),
        ui.Label("This app allows you to export an image corresponding to given filter. Don't forget to give your input about this app.", styleP),
        ui.Label('1) Select Products', styleH2),
        features.col_selection,
        features.col_id,
        ui.Label('2) Select Date Range', styleH2),
        ui.Label('Start date:', styleP),
        features.startDate,
        ui.Label('End date:', styleP),
        features.endDate,
        ui.Label('3) Cloud Cover Metadata', styleH2),
        features.prop_fil,
        features.prop_operation,
        features.property_value,
        features.cloud_mask_check,
        ui.Panel([
            ui.Button({
                label: 'Run',
                onClick: function () {
                    if (features.col_id.getValue() === '' ||
                        features.startDate.getValue() === '' ||
                        features.endDate.getValue() === null ||
                        features.prop_operation.getValue() === null ||
                        features.property_value.getValue() == undefined) {
                        features.empty_form_mess.style().set({
                            shown: true
                        })
                    } else {
                        var col_name = features.col_selection.getValue()
                        var id = features.col_id.getValue()
                        var val = features.property_value.getValue()
                        var col = ee.ImageCollection(id)
                            .filterDate(features.startDate.getValue(), features.endDate.getValue())
                            .filterMetadata(
                                features.prop_fil.getValue(),
                                features.prop_operation.getValue(),
                                ee.Number.parse(val)
                            )
                            .filterBounds(geometry)
                        var lists = col.toList(col.size()).map(function (a) {
                            return ee.Image(a).id()
                        })
                        lists.evaluate(function (list) {
                            if (list === undefined) {
                                secPanel.list_image.items().reset()
                                secPanel.undefined_caution.style().set({
                                    shown: true
                                })
                            } else {
                                secPanel.list_image.items().reset(list)
                                secPanel.list_image.setValue(secPanel.list_image.items().get(0));
                                secPanel.undefined_caution.style().set({
                                    shown: false
                                })
                            }
                        })
                        var res = secPanel.results
                        col.size().evaluate(function (a) {
                            res.setValue('Result: ' + a + ' image(s)')
                        })
                        secPanel.caution.style().set({
                            shown: false
                        })
                        ui.root.remove(panel);
                        secPanel.cloudMasking_TorF.setValue('Cloud masking : ' + features.cloud_mask_check.getValue())
                        secPanel.re_run_code.style().set({shown:false})
                        ui.root.add(pickImagePanel);
                        Map.centerObject(geometry,8)
                    }
                }
            }),
            features.empty_form_mess
        ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: {
        margin: '12px',
        position: 'bottom-left',
        width: '350px'
    }
}
var pickImagePanel = ui.Panel({
    widgets: [
        secPanel.results,
        secPanel.undefined_caution,
        secPanel.re_run_code,
        ui.Label('Select and export your image to your Google Drive.', styleP),
        ui.Label('Select Image:', styleH2),
        secPanel.list_image,
        secPanel.cloud_cover,
        secPanel.aq_date,
        secPanel.cloudMasking_TorF,
        secPanel.buttonReset,
        ui.Label('Export Section:', styleH2),
        secPanel.checkbox_clip,
        secPanel.buttonApply,
        secPanel.geo_confirm,
        secPanel.caution,
        secPanel.urldownload,
        ui.Label("Support:", styleH2),
        ui.Label("My website: https://insgis.my.id.com", styleP).setUrl('https://insgis.my.id.com'),
        ui.Label("My youtube: https://www.youtube.com/c/INSGIS/videos", styleP)
    ],
    style: {
        margin: '12px',
        position: 'bottom-left',
        width: '350px'
    }
})
var panel = ui.Panel(panel_fill)
ui.root.add(panel);
Map.drawingTools().setShown(false)
Map.drawingTools().stop()
// Map.GeometryLayer().setLocked(true)
})