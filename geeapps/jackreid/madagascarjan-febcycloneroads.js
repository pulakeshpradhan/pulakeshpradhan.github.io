var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "T20220227_4"
        ],
        "min": 2,
        "max": 2,
        "palette": [
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["T20220227_4"],"min":2,"max":2,"palette":["ff0000"]};
var aoi = ee.Geometry.Polygon(
        [[[47.31227254462866, -22.751275285188523],
          [47.31227254462866, -23.350239392749472],
          [47.93300008369116, -23.350239392749472],
          [47.93300008369116, -22.751275285188523]]], null, false);
Map.setCenter(47.60522, -23.33118, 13);
var highwayBuffer = ee.Image('projects/ee-jackreid/assets/madagascar/highwayBuffer_30m');
var SARchanges = ee.Image('projects/ee-jackreid/assets/madagascar/mada_2022-01_2022-03');
var SARchanges_stride3 = ee.Image('projects/ee-jackreid/assets/madagascar/mada_2022-01_2022-03_stride3');
var SARchanges_FebCyclone = SARchanges.select('T20220227_4');
var SARchanges_JanCyclone = SARchanges.select('T20220122_2');
var SARchanges_Cumulative = SARchanges_stride3.select('T20220227_2');
var eeSARvis_Feb = {"opacity":1,"bands":["T20220227_4"],"min":0, "max":3,"palette":["000000","ff0000","04fff2","fcff04"]};
var eeSARvis_Jan = {"opacity":1,"bands":["T20220122_2"],"min":0, "max":3,"palette":["000000","ff0000","04fff2","fcff04"]};
var eeSARvis_cumulative = {"opacity":1,"bands":["T20220227_2"],"min":0, "max":3,"palette":["000000","ff0000","04fff2","fcff04"]};
var roadMask_Feb = highwayBuffer.and(SARchanges_FebCyclone.eq(2));
var roadImpact_Feb = SARchanges_FebCyclone.mask(roadMask_Feb);
var roadMask_Jan = highwayBuffer.and(SARchanges_JanCyclone.eq(2));
var roadImpact_Jan = SARchanges_FebCyclone.mask(roadMask_Jan);
var roadMask_cumulative = highwayBuffer.and(SARchanges_Cumulative.eq(2));
var roadImpact_cumulative = SARchanges_Cumulative.mask(roadMask_cumulative);
var roadImpactVis = {"opacity":1,"min":0,"max":2,"palette":["ff0000"]};
Map.addLayer(highwayBuffer,{},'Major Roads', false);
Map.addLayer(roadImpact_cumulative,roadImpactVis,'Impacted Roads - Cumulative');
Map.addLayer(roadImpact_Feb,roadImpactVis,'Impacted Roads - February', false);
Map.addLayer(roadImpact_Jan,roadImpactVis,'Impacted Roads - January',false);
Map.addLayer(SARchanges_Cumulative,eeSARvis_cumulative,'SAR Changes Cumulative ', false);
Map.addLayer(SARchanges,eeSARvis_Feb,'SAR Changes - February Cyclone (2022-02-27)', false);
Map.addLayer(SARchanges,eeSARvis_Jan,'SAR Changes - January Cyclone (2022-01-22)', false);