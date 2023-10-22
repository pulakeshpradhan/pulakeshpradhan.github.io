var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -46.29359118564078,
                -20.665941978323513
              ],
              [
                -46.29080168826529,
                -20.667307205217618
              ],
              [
                -46.2816178045983,
                -20.670439149960664
              ],
              [
                -46.27589163509337,
                -20.667748893644443
              ],
              [
                -46.269625994834584,
                -20.661123432389996
              ],
              [
                -46.26353201595275,
                -20.657549578788007
              ],
              [
                -46.25666556087462,
                -20.657951139563973
              ],
              [
                -46.25477728572814,
                -20.656425202970375
              ],
              [
                -46.25177321163146,
                -20.653092182921693
              ],
              [
                -46.2551635780727,
                -20.649036216568437
              ],
              [
                -46.26147207942931,
                -20.648112595130854
              ],
              [
                -46.268853518638295,
                -20.650963830679565
              ],
              [
                -46.27198633876769,
                -20.653373283820198
              ],
              [
                -46.27391752925841,
                -20.65489925105548
              ],
              [
                -46.278123232993764,
                -20.657629891028083
              ],
              [
                -46.28099856105773,
                -20.659075504091625
              ],
              [
                -46.28468928066222,
                -20.65959752765155
              ],
              [
                -46.291341166749596,
                -20.659416837998638
              ],
              [
                -46.29292902675597,
                -20.663412260764588
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#eeeeee",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #eeeeee */ee.Geometry.Polygon(
        [[[-46.29359118564078, -20.665941978323513],
          [-46.29080168826529, -20.667307205217618],
          [-46.2816178045983, -20.670439149960664],
          [-46.27589163509337, -20.667748893644443],
          [-46.269625994834584, -20.661123432389996],
          [-46.26353201595275, -20.657549578788007],
          [-46.25666556087462, -20.657951139563973],
          [-46.25477728572814, -20.656425202970375],
          [-46.25177321163146, -20.653092182921693],
          [-46.2551635780727, -20.649036216568437],
          [-46.26147207942931, -20.648112595130854],
          [-46.268853518638295, -20.650963830679565],
          [-46.27198633876769, -20.653373283820198],
          [-46.27391752925841, -20.65489925105548],
          [-46.278123232993764, -20.657629891028083],
          [-46.28099856105773, -20.659075504091625],
          [-46.28468928066222, -20.65959752765155],
          [-46.291341166749596, -20.659416837998638],
          [-46.29292902675597, -20.663412260764588]]]);
ui.root.setLayout(ui.Panel.Layout.absolute());
Map.setCenter(-46.2992, -20.65586, 14);
// A function to make buttons labeled by position.
function makeButton(position) {
  return ui.Button({
    label: 'Rodar',
    style: {position: position},
    onClick: function() {
var sloperisk = sloperclass.eq(2);
var sloperiskcrop = sloperisk.mask(sloperisk); // mask it
Map.addLayer(sloperiskcrop,red,'Grande Declive');
var dataset = ee.ImageCollection('GLCF/GLS_WATER');
var water = dataset.select('water');
var waterVis = {
  min: 1.0,
  max: 4.0,
  palette: ['FAFAFA', '00C5FF', 'DF73FF', '828282', 'CCCCCC'],
};
var vectors = sloperiskcrop.reduceToVectors({
  geometry: roi,
  scale: 30,
  geometryType: 'polygon',
  reducer: ee.Reducer.countEvery()
});
print(vectors)
var fp2 = vectors.geometry(); 
var bufferplus = fp2.buffer(30);
//Map.addLayer(vectors);
//Map.addLayer(water, waterVis, 'Water');
// Apply a reduce region method
var max_alt = elevation2.reduceRegion(
{reducer: ee.Reducer.max(),
geometry: bufferplus ,
scale: 30,
maxPixels: 9e9});
// Display the image.
// Apply a reduce region method
var min_alt = elevation2.reduceRegion(
{reducer: ee.Reducer.min(),
geometry: bufferplus ,
scale: 30,
maxPixels: 9e9});
// Display the image.
var divid2 = max_alt.get("AVE");
var divid3 = min_alt.get("AVE");
var divd = ee.Number(divid2).subtract(divid3)
var divdsafe = ee.Number(divd).multiply(2);
print('Maximum altitude (meters):', max_alt);
print('Maximum altitude (meters):', divd);
var fp = vectors.geometry(); 
var buffersimple = fp.buffer(divd);
var buffersafe = fp.buffer(divdsafe);
Map.addLayer(buffersafe, {color: 'CCFF33'}, 'Impacto Indireto (ID x2');
Map.addLayer(buffersimple, {color: 'FF0000'}, 'Impacto Direto (ID)');
    }
  });
}
// Add labled buttons to the panel.
ui.root.add(makeButton('bottom-center'));
Map.setOptions('SATELLITE');
var dataset = ee.ImageCollection('JAXA/ALOS/AW3D30/V3_2');
var elevation = dataset.select('DSM');
var elevationVis = {
  min: 0,
  max: 5000,
  palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']
};
Map.setCenter(-46.2992, -20.65586, 14);
var dataset2 = ee.Image('JAXA/ALOS/AW3D30_V1_1');
var elevation2 = dataset2.select('AVE');
// Reproject an image mosaic using a projection from one of the image tiles,
// rather than using the default projection returned by .mosaic().
var proj = elevation.first().select(0).projection();
var slopeReprojected = ee.Terrain.slope(elevation.mosaic()
                             .setDefaultProjection(proj));
//Map.addLayer(slopeReprojected, {min: 0, max: 45}, 'Slope');
var sloperclass = ee.Image(1).where(slopeReprojected.gt(18).and(slopeReprojected.lte(100)), 2);
var red = {
  min: 1.0,
  max: 1.0,
  palette: ['FF0000'],
};