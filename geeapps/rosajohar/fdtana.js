var table = ui.import && ui.import("table", "table", {
      "id": "users/rosajohar/S2_38KQE"
    }) || ee.FeatureCollection("users/rosajohar/S2_38KQE"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/rosajohar/hac_mahavavy"
    }) || ee.Image("users/rosajohar/hac_mahavavy"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                47.539143092326114,
                -18.92386312090389
              ],
              [
                47.50755739896674,
                -18.947244657022367
              ],
              [
                47.55905581205268,
                -18.95763539976765
              ],
              [
                47.56248903959174,
                -18.92451265221271
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                47.50568344642312,
                -18.869720135792786
              ],
              [
                47.504310155407495,
                -18.871344484708526
              ],
              [
                47.50585510780007,
                -18.87231908650247
              ],
              [
                47.50765755225808,
                -18.87166935260281
              ],
              [
                47.50774338294656,
                -18.870288659703732
              ],
              [
                47.50740006019265,
                -18.869314046104474
              ],
              [
                47.506284261242456,
                -18.86817698974396
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            47.51907035501285,
            -18.888716198627275
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                47.539143092326114,
                -18.92386312090389
              ],
              [
                47.50755739896674,
                -18.947244657022367
              ],
              [
                47.55905581205268,
                -18.95763539976765
              ],
              [
                47.56248903959174,
                -18.92451265221271
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                47.50568344642312,
                -18.869720135792786
              ],
              [
                47.504310155407495,
                -18.871344484708526
              ],
              [
                47.50585510780007,
                -18.87231908650247
              ],
              [
                47.50765755225808,
                -18.87166935260281
              ],
              [
                47.50774338294656,
                -18.870288659703732
              ],
              [
                47.50740006019265,
                -18.869314046104474
              ],
              [
                47.506284261242456,
                -18.86817698974396
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            47.51907035501285,
            -18.888716198627275
          ]
        }
      ],
      "coordinates": []
    });
//load HAC
var hac = image;
// Load S1 Collection
var S1_y = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filterMetadata('resolution_meters', 'equals', 10)
.filterMetadata('relativeOrbitNumber_start', 'equals', 93)
.filterBounds(geometry);
var S1_f=S1_y.filter(ee.Filter.calendarRange(1,4,'month'))
var S1_e=S1_y.filter(ee.Filter.calendarRange(11,12,'month'))
var S1 = S1_f.merge(S1_e).sort("system:time_start");
print(S1);
var imlist = S1.toList(S1.size());
  print(imlist);
// List of date
var unique_dates = imlist.map(function(im){
    return ee.Image(im).date().format("YYYY-MM-dd");
  }).distinct();
print(unique_dates);
// Function for iteraton over the range of dates
var day_mosaics = function(date, newlist) {
  // Cast
  date = ee.Date(date);
  newlist = ee.List(newlist);
  // Filter collection between date and the next day
  var filtered = S1.filterDate(date, date.advance(1,'day'));
  // Make the mosaic
  var image = ee.Image(filtered.mosaic());
  // Add the mosaic to a list only if the collection has images
  return ee.List(ee.Algorithms.If(filtered.size(), newlist.add(image.set("id", date.format("YYYY-MM-dd"))), newlist));
}
var S1mos = ee.ImageCollection(ee.List(unique_dates.iterate(day_mosaics, ee.List([])))).sort("id");
print(S1mos);
//convert coll. to list
var lengthcoll = S1mos.size();
var list = S1mos.toList(lengthcoll);
print(list);
// Function to convert from dB
  function toNatural(img) {
   return ee.Image(10.0).pow(img.select(0).divide(10.0));
  }
//change detection with ndr and cliping
var nd_list = list.map(function(inimage) {
  var index = list.indexOf(inimage);
  inimage = ee.Image(inimage);
  var previousIndex = ee.Algorithms.If(index.lt(2), index, index.subtract(2))
  var refimage = ee.Image(list.get(previousIndex));
  var rimagevv = refimage.select('VV');
  var imagevv = inimage.select('VV'); 
  // Normalised difference with filtered images (vv band)
  var SMOOTHING_RADIUS = 50;
  var dnvv = (toNatural(imagevv.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'))
  .subtract(toNatural(rimagevv.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'))))
  .divide(toNatural(imagevv.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'))
  .add(toNatural(rimagevv.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'))))
  .rename('ndvv');
  // Normalised difference with filtered images (vh band)
  var rimagevh = refimage.select('VH');
  var imagevh = inimage.select('VH'); 
  var dnvh = (toNatural(imagevh.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'))
  .subtract(toNatural(rimagevh.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'))))
  .divide(toNatural(imagevh.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'))
  .add(toNatural(rimagevh.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'))))
  .rename('ndvh');
  // Nd thresolding and filtering
  var dn_seuilvv = (dnvv.lt(-0.3));
  var dn_seuil_spkvv = dn_seuilvv.focal_mode();
  var inovv = dn_seuil_spkvv.clip(table);
  var dn_seuilvh = (dnvh.lt(-0.3));
  var dn_seuil_spkvh = dn_seuilvh.focal_mode();
  var inovh = dn_seuil_spkvh.clip(table);
  var ino1 = inovv;
  var ino = ino1.updateMask(ino1).clip(table);
  var hac_s = hac.lt(32);
  var ino_hac = ino.updateMask(hac_s);
  //var inomsk = ino.updateMask(slpth);
  return ino;
});
//convert list to collection
var ino_coll = ee.ImageCollection(nd_list);
var freq = ino_coll.reduce(ee.Reducer.sum());
print(freq);
// display results
var Vizparam = {min:0, max:30, palette: ['00FF00','FF0000']};
Map.centerObject(geometry,13);
Map.addLayer(freq, Vizparam,'occurence',1);
//Export results to drive
Export.image.toDrive({
  image: ino_coll.toBands(),
  description: "Tana_Sentinel1",
  folder: "Tana_flood",
  fileNamePrefix: "Tana",
  scale: 10,
  region: table,
  maxPixels:2e9,
  fileDimensions:[2560,2560],
  shardSize:256,
  skipEmptyTiles:true
 });
Export.image.toDrive({
  image:freq.int32(),
  description: "freq",
  folder: "Mahavavy_Mananjeba_flood",
  fileNamePrefix: "freq",
  scale: 20,
  maxPixels:2e9,
  region: table,
 });