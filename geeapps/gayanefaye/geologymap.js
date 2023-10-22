var Mako = ui.import && ui.import("Mako", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -12.499090008937552,
                13.000057891892112
              ],
              [
                -12.499090008937552,
                12.513189861232085
              ],
              [
                -12.012944989406302,
                12.513189861232085
              ],
              [
                -12.012944989406302,
                13.000057891892112
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -12.49846819986554,
                12.89949966941248
              ],
              [
                -12.49846819986554,
                12.663119930547497
              ],
              [
                -12.157205382482728,
                12.663119930547497
              ],
              [
                -12.157205382482728,
                12.89949966941248
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[-12.499090008937552, 13.000057891892112],
           [-12.499090008937552, 12.513189861232085],
           [-12.012944989406302, 12.513189861232085],
           [-12.012944989406302, 13.000057891892112]]],
         [[[-12.49846819986554, 12.89949966941248],
           [-12.49846819986554, 12.663119930547497],
           [-12.157205382482728, 12.663119930547497],
           [-12.157205382482728, 12.89949966941248]]]], null, false),
    S1 = ui.import && ui.import("S1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD");
//++++++++++++++++++++++++++++++++++++++++++ Site +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
var site=Mako; // le site d'étude
Map.centerObject(site,9);
Map.addLayer(site,{color:'red'},'region of interest',0)
//++++++++++++++++++++++++++++Calculation of SH and Sigma-0 Dry+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
var collection_IWVV = S1
                  .filterBounds(site)
//                  .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                  .filterDate('2015-01-01','2019-12-31')
 //                 .map(function(image){
//                    return image.clip(site)
//                  })
print(collection_IWVV)
var collectionS1D = collection_IWVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var collectionS1A= collection_IWVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
print(collectionS1D)
print(collectionS1A)
/////// VV
//var drySigmaVVA = collectionS1A.select('VV').reduce(ee.Reducer.percentile([10])).rename('drySigmaVVA');
//var wetSigmaVVA = collectionS1A.select('VV').reduce(ee.Reducer.percentile([90])).rename('wetSigmaVVA');
//var medianSigmaVVA = collectionS1A.select('VV').reduce(ee.Reducer.percentile([50])).rename('medianSigmaVVA');
//var meanSigmaVVA = collectionS1A.select('VV').mean().rename('meanSigmaVVA');
//var sensitivityVVA = wetSigmaVVA.subtract(drySigmaVVA).rename('sensitivityVVA');
print(sensitivityVVA)
print(drySigmaVVA)
Map.addLayer(drySigmaVVA.select(['drySigmaVVA']).clip(site),{min:-30, max:-0, palette: ["blue","red","yellow","green"]},'dryVVA')
Map.addLayer(wetSigmaVVA.select(['wetSigmaVVA']).clip(site),{min:-30, max:-0, palette: ["blue","red","yellow","green"]},'wetVVA')
Map.addLayer(medianSigmaVVA.select(['medianSigmaVVA']).clip(site),{min:-30, max:-0, palette: ["blue","red","yellow","green"]},'medianVVA')
Map.addLayer(meanSigmaVVA.select(['meanSigmaVVA']).clip(site),{min:-30, max:-0, palette: ["blue","red","yellow","green"]},'meanVVA')
Map.addLayer(sensitivityVVA.select(['sensitivityVVA']).clip(site),{min:0, max:25, palette: ["red","yellow","green","blue"]},'shVVA')
print(drySigmaVVA)
print(medianSigmaVVA)
//var S1VVA=ee.ImageCollection ([
//  'drySigmaVVA','medianSigmaVVA', 
//                             ])
//                .map(function(image){
//                return image.clip(site)
//                });
//print(S1VVA)
//++++++++++++++++++++++++++++++++++exporter dans le drive+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
 Export.image.toDrive(
 { image:drySigmaVVA.select(['drySigmaVVA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'drySigmaVVA', 
   folder:'Reasearch'+'Mako'
   })
 Export.image.toDrive(
 { image:wetSigmaVVA.select(['wetSigmaVVA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'wetSigmaVVA', 
   folder:'GMSE_Services'+'Mako'
   })
    Export.image.toDrive(
 { image:medianSigmaVVA.select(['medianSigmaVVA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'medianSigmaVVA', 
   folder:'GMSE_Services'+'Mako'
   })
 Export.image.toDrive(
 { image:meanSigmaVVA.select(['meanSigmaVVA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'meanSigmaVVA', 
   folder:'GMSE_Services'+'Mako'
   })
 Export.image.toDrive(
 { image:sensitivityVVA.select(['sensitivityVVA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'sensitivityVVA', 
   folder:'GMSE_Services'+'Mako'
   })
/// fin VV  / début VH
/////// VV
var drySigmaVHA = collectionS1A.select('VH').reduce(ee.Reducer.percentile([10])).rename('drySigmaVHA');
var wetSigmaVHA = collectionS1A.select('VH').reduce(ee.Reducer.percentile([90])).rename('wetSigmaVHA');
var medianSigmaVHA = collectionS1A.select('VH').reduce(ee.Reducer.percentile([50])).rename('medianSigmaVHA');
var meanSigmaVHA = collectionS1A.select('VH').mean().rename('meanSigmaVHA');
var sensitivityVHA = wetSigmaVHA.subtract(drySigmaVHA).rename('sensitivityVHA');
print(sensitivityVHA)
print(drySigmaVHA)
//Map.addLayer(drySigmaVHA.select(['drySigmaVHA']).clip(site),{min:-30, max:-0, palette: ["blue","red","yellow","green"]},'dryVHA')
//Map.addLayer(wetSigmaVHA.select(['wetSigmaVHA']).clip(site),{min:-30, max:-0, palette: ["blue","red","yellow","green"]},'wetVHA')
//Map.addLayer(medianSigmaVHA.select(['medianSigmaVHA']).clip(site),{min:-30, max:-0, palette: ["blue","red","yellow","green"]},'medianVHA')
//Map.addLayer(meanSigmaVHA.select(['meanSigmaVHA']).clip(site),{min:-30, max:-0, palette: ["blue","red","yellow","green"]},'meanVHA')
//Map.addLayer(sensitivityVHA.select(['sensitivityVHA']).clip(site),{min:0, max:25, palette: ["red","yellow","green","blue"]},'shVHA')
print(drySigmaVHA)
print(medianSigmaVHA)
//var S1VHA=ee.ImageCollection ([
//  'drySigmaVHA','medianSigmaVHA', 
//                             ])
//                .map(function(image){
//                return image.clip(site)
//                });
//print(S1VHA)
//++++++++++++++++++++++++++++++++++exporter dans le drive+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
 Export.image.toDrive(
 { image:drySigmaVHA.select(['drySigmaVHA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'drySigmaVHA', 
   folder:'Reasearch'+'Mako'
   })
 Export.image.toDrive(
 { image:wetSigmaVHA.select(['wetSigmaVHA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'wetSigmaVHA', 
   folder:'Reasearch'+'Mako'
   })
    Export.image.toDrive(
 { image:medianSigmaVHA.select(['medianSigmaVHA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'medianSigmaVHA', 
   folder:'Reasearch'+'Mako'
   })
 Export.image.toDrive(
 { image:meanSigmaVHA.select(['meanSigmaVHA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'meanSigmaVHA', 
   folder:'Reasearch'+'Mako'
   })
 Export.image.toDrive(
 { image:sensitivityVHA.select(['sensitivityVHA']),
   region:site, 
   scale:10, 
   maxPixels:1e13,
   description:'sensitivityVHA', 
   folder:'Reasearch'+'Mako'
   })
/////////////////////////////////////////FIN///////////////////////////////////////////////////////////////////////////////