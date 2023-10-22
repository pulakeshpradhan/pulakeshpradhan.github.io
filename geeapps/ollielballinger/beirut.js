var aor = ui.import && ui.import("aor", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                35.490574511663446,
                33.91040893302756
              ],
              [
                35.490574511663446,
                33.88597291456769
              ],
              [
                35.54499116815759,
                33.88597291456769
              ],
              [
                35.54499116815759,
                33.91040893302756
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
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[35.490574511663446, 33.91040893302756],
          [35.490574511663446, 33.88597291456769],
          [35.54499116815759, 33.88597291456769],
          [35.54499116815759, 33.91040893302756]]], null, false),
    vhr_pre = ui.import && ui.import("vhr_pre", "image", {
      "id": "users/ollielballinger/Beirut_Pre"
    }) || ee.Image("users/ollielballinger/Beirut_Pre"),
    vhr_post = ui.import && ui.import("vhr_post", "image", {
      "id": "users/ollielballinger/Beirut_Post"
    }) || ee.Image("users/ollielballinger/Beirut_Post");
Map.setCenter(35.51898, 33.90153, 15)
Map.setOptions("ROADMAP")
var palette =["0034f5","1e7d83","4da910","b3c120","fcc228","ff8410","fd3000"]
var SARvis={min: [-25, -20, 0], max: [0, 10, 0]}
var S2vis={bands: ['B4', 'B3', 'B2'], min: 0, max: 5000, gamma:0.9}
function cloudscene(image) {
        var clouds=image.select('QA60')
                    .reduceRegions({
                        collection: aor, 
                        reducer: ee.Reducer.sum(), 
                        scale: 10})
                    .first()
                    .get('sum')
        //var image=image.updateMask(10)
        return image.set('clouds', clouds)
}
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
var s2 = ee.ImageCollection('COPERNICUS/S2')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .map(cloudscene)
    //.filterDate(start,end)
    //.map(maskS2clouds)
    .filterBounds(aor)
    .filter(ee.Filter.lt('clouds', 1))
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
      .filter(ee.Filter.eq('instrumentMode', 'IW'))
      .filterBounds(aor)
      .select('VH','VV','angle')
      .map(function(img) {
            var doy = ee.Date(img.get('system:time_start')).getRelative('week', 'year');
            return img.set('doy', doy);
          })
      .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var before=s2.filterDate('2020-07-20','2020-08-03').mean()
var after=s2.filterDate('2020-08-04','2020-08-09').mean()
var change=before.subtract(after)
                  .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12'])
                  .clip(aor)
var bandNames = change.bandNames();
var toCollection = ee.ImageCollection.fromImages(bandNames.map(function(name){
  name = ee.String(name);
  // select one band an put into an image. You might need a specific cast and renaming of the bands
  return change.select(name).rename('newName').toFloat();
}));
var summedBand = toCollection.sum();
var damage=summedBand.multiply(summedBand).sqrt()
var damage_conv= damage.reduceNeighborhood({
  reducer: ee.Reducer.median(),
  kernel: ee.Kernel.gaussian({
          radius: 12, 
          units: 'meters', 
          normalize: true, 
          sigma:50})
})
Map.addLayer(damage_conv,{min:100,max:4000, palette:palette},'Damage')
Map.addLayer(vhr_pre.clip(aor), {min:0, max:255},'before', false)
Map.addLayer(vhr_post.clip(aor),{min:0, max:255},'after', false)
var console = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-right',
    padding: '8px 15px',
    width: '350px'
  }
});
var title = ui.Label({
  value: 'Beirut Explosion Damage Identification',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var preCheck=ui.Checkbox({
  value:false,
  label: 'Before',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 6px 0',
    padding: '0'
    },
  onChange: function(checked) {
  Map.layers().get(1).setShown(checked)
  }})
var postCheck=ui.Checkbox({
  value:false,
  label: 'After',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 6px 0',
    padding: '0'
    },
  onChange: function(checked) {
  Map.layers().get(2).setShown(checked)
  }})
var Damage=ui.Checkbox({
  value:true,
  label: 'Damage',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 6px 0',
    padding: '0'
    },
  onChange: function(checked) {
  Map.layers().get(0).setShown(checked)
  }})
var vhr_label= ui.Label("Toggle between high resolution before and after images:", {whiteSpace: 'wrap'})
var damage_label= ui.Label("The \"Damage\" layer below is computed using multispectral pre- and post-explosion Sentinel-2 imagery. It measures the total absolute difference across all spectral bands.", {whiteSpace: 'wrap'})
var chart_label= ui.Label("To disaggregate damage by type, click the button below. An unsupervised clustering algorithm (X-means) sorts the damage into categories based on severity.", {whiteSpace: 'wrap'})
var contact= ui.Label('For queries: ollie.ballinger@sant.ox.ac.uk', {whiteSpace: 'wrap'})
Map.add(console)
var chartArea = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '900px'
  }
});
var damage_type = ui.Button({
  label: 'Cluster by Damage Type',
  onClick: function() {
      var cluster_training = change
                              .sample({
                                region: aor,
                                scale: 1,
                                numPixels: 10000
                              });
    var clusterer = ee.Clusterer
                      .wekaXMeans({
                            minClusters:5,
                            maxClusters:10
                            })
                      .train(cluster_training);
      var cluster = change.cluster(clusterer)
      var k=cluster.reduceRegion(ee.Reducer.max(), aor,100)
      var cluster_conv= cluster.reduceNeighborhood({
        reducer: ee.Reducer.median(),
        kernel: ee.Kernel.gaussian({
                radius: 12, 
                units: 'meters', 
                normalize: true, 
                sigma:50})
      })
      //adapt viz parameters to the number of clusters 
      k.evaluate(function(dict) {
        var vizParams = {
          min: 1, 
          max: dict.cluster, 
          palette: ["0034f5",
                    "cb04fd",
                    "1e7d83",
                    "4da910",
                    "b3c120",
                    "fcc228",
                    "fcc228",
                    "ff8410",
                    "fd3000"]
        }
        //print("number of classes:", dict.cluster)
        var clusterLayer=ui.Map.Layer(cluster_conv, vizParams,'cluster')
        Map.layers().set(0, clusterLayer)
        Map.add(legend);
})
  }
});
var historical= function(){
  console.clear()
  console.add(title)
  console.add(damage_label)
  console.add(Damage)
  console.add(vhr_label)
  console.add(preCheck)
  console.add(postCheck)
  console.add(chart_label)
  console.add(damage_type)
  console.add(contact)
 }
historical()
 // set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name, border) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '7px',
          margin: '0 0 4px 0',
          border: '3px solid #'+border
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
legend.add(makeRow('fcc228', 'burned area', 'fd3000'));
legend.add(makeRow('da1bfd', 'structural damage','cb04fd'));