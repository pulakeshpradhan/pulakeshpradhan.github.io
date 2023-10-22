var uiObj = require('users/dongluofan/util:uiObj.js')
var ut = require('users/dongluofan/util:utils.js')
var ccd = require('users/dongluofan/util:ccd.js')
var uiUtil = require('users/dongluofan/util:uiUtils.js')
// Set default ccd params
var BPBANDS = ['GREEN', 'RED', 'NIR', 'SWIR1', 'SWIR2']
var start = '1985-01-01'
var end = '2022-01-01'
// var TMBANDS = ['GREEN', 'SWIR2']
var ccdParams = {}
var runParams = {}
var vizParams = {}
var globGeom
var mapCallback = function(coords){
  globGeom = ee.Geometry.Point([coords.lon, coords.lat])
  ccdcInputs.getValue(ccdParams,runParams,vizParams)
}
// default layout
var layout = uiUtil.layout3()
layout.onClick(mapCallback)
// right panel for inputs
var ccdcInputs = uiObj.CCDCInputs(BPBANDS, start, end)
var rightPanel = ui.Panel([ccdcInputs.Panel])
var landsatViewer = uiObj.landsatViewer(layout.mapObj, start, end)
var chart = ccd.getTSChart(layout.mapObj, ccdParams, runParams, vizParams,landsatViewer.chartOnClick)  
var toCoord = uiObj.toCoords(layout.mapObj)
// chart.widgets().get(0).onClick()
layout.setUtil(0,rightPanel,'right')
layout.setUtil(0,landsatViewer.Panel,'left')
layout.setUtil(1,toCoord.Panel,'left')
layout.setChart(0,chart)