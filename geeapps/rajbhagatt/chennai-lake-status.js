var S2C = ee.ImageCollection("COPERNICUS/S2"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[79.62505607219998, 13.855578252573597],
          [79.19658927532498, 13.75955858282572],
          [78.49346427532498, 12.979298078387586],
          [77.57061271282498, 12.690078866945319],
          [76.47197990032498, 11.605323597625635],
          [77.02129630657498, 8.837747444463606],
          [77.74639396282498, 7.521956181495404],
          [80.11944083782498, 11.239187231276825],
          [79.95464591594998, 11.712920079191859],
          [80.20733146282498, 12.282473664525906],
          [80.56988029094998, 12.872218669766019],
          [80.52593497844998, 13.642147700365808],
          [80.33916740032498, 13.898240941602133]]]),
    S1C = ee.ImageCollection("COPERNICUS/S1_GRD"),
    JRC = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    India = ee.FeatureCollection("users/rajbhagatt/IndiaOutline"),
    TN = ee.FeatureCollection("users/rajbhagatt/TamilNadu"),
    geometry2 = /* color: #d63000 */ee.Geometry.Polygon(
        [[[72.94354430568387, 20.302439108862966],
          [72.86664000880887, 19.434530558700484],
          [74.14105407130887, 15.537370828503537],
          [75.90985289943387, 17.02427517740202],
          [77.33807555568387, 18.103095435388845],
          [78.30487243068387, 19.081898471214295],
          [80.00775329005887, 19.434530558700484],
          [80.62298766505887, 20.753473290134774],
          [80.48016539943387, 21.78748496321877],
          [78.52459899318387, 21.838483586474855],
          [75.73407164943387, 21.675224148111848],
          [74.15204039943387, 22.17461683815663],
          [73.45990172755887, 21.95061649870029],
          [73.24017516505887, 20.537577019249465],
          [72.91058532130887, 20.2183159636766]]]),
    geometry3 = /* color: #98ff00 */ee.Geometry.MultiPoint(
        [[76.13518781404707, 20.08829294413398],
         [76.77724117951061, 19.65335646706069],
         [78.07041674512084, 21.312658182244256],
         [75.2578249762571, 19.50127111976638],
         [75.84971340399147, 19.65136454899694],
         [76.4710973018332, 18.081601425601306],
         [75.32885305057948, 17.106359366225195],
         [75.45897782275438, 18.36076466735548],
         [75.40921036350937, 20.694423078272607],
         [74.56922224536675, 17.656088425575884],
         [77.49530438207205, 19.769426006207667],
         [79.0997397724791, 19.690198108712302]]);
//Map.addLayer(TN);
//geometry=geometry2;
function normalize(im)
{
//var scvv=im.select('VV').divide(im.select('VH'));
var scvv=im.select('VV');
var scangle=im.select('angle').divide(180).sin().divide(ee.Image(30).divide(180).sin());
var anglenormalized=scvv.multiply(scangle);
return anglenormalized;
}
var sc2018=S1C.filterBounds(geometry).filterDate('2019-02-15','2019-03-05');
sc2018=sc2018.map(normalize);
var scmean2018=sc2018.mean();
var sc2017=S1C.filterBounds(geometry).filterDate('2018-02-15','2018-03-05');
sc2017=sc2017.map(normalize);
var scmean2017=sc2017.mean();
/*var sc2016=S1C.filterBounds(geometry).filterDate('2016-11-25','2016-12-22');
sc2016=sc2016.map(normalize);
var scmean2016=sc2016.mean();
*/
var diff=scmean2018.subtract(scmean2017);
var diffmasked=diff.updateMask(JRC.select('max_extent').eq(1));
var sc2018masked=scmean2018.updateMask(JRC.select('max_extent').eq(1));
var sc2017masked=scmean2017.updateMask(JRC.select('max_extent').eq(1));
//var sc2016masked=scmean2016.updateMask(JRC.select('max_extent').eq(1));
//Map.addLayer(diff,{min:-10,max:10},"Diff");
//Map.addLayer(diffmasked.clip(India),{min:-10,max:10,palette:['blue','white','red']},"Diff -2 ");
//Map.addLayer(diffmasked,{min:-10,max:10,palette:['blue','yellow','red']},"MaskedDiff");
//Map.addLayer(sc2018masked.clip(India),{min:-25,max:-13,palette:['blue','white']},"Mean2018");
//Map.addLayer(sc2017masked.clip(India),{min:-25,max:-13,palette:['blue','white']},"Mean2017");
//Map.addLayer(sc2016masked.clip(India),{min:-25,max:-13,palette:['blue','white']},"Mean2016");
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
leftMap.addLayer(sc2017masked.clip(India).clip(geometry),{min:-20,max:-13,palette:['blue','white']},"Mean2017");
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.addLayer(sc2018masked.clip(India).clip(geometry),{min:-25,max:-13,palette:['blue','white']},"Mean2018");
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(80, 13, 10);
leftMap.setOptions('hybrid');
rightMap.setOptions('hybrid');
var titlestyle={fontSize:'12px'};
var title="SURFACE WATER COMPARISON (2017,2018)";
var titlelabel = ui.Label(title,titlestyle);
var TP=ui.Panel({widgets: [titlelabel],style:{position: "bottom-left"},layout: ui.Panel.Layout.flow('vertical')});
leftMap.add(TP);
var yearstyle={fontSize:'24px'};
var lyear="2018";
var lyearlabel = ui.Label(lyear,yearstyle);
var lyearwid=ui.Panel({widgets: [lyearlabel],style:{position: "top-left"},layout: ui.Panel.Layout.flow('vertical')});
leftMap.add(lyearwid);
var yearstyle={fontSize:'24px'};
var ryear="2019";
var ryearlabel = ui.Label(ryear,yearstyle);
var ryearwid=ui.Panel({widgets: [ryearlabel],style:{position: "top-right"},layout: ui.Panel.Layout.flow('vertical')});
rightMap.add(ryearwid);
var clstyle={fontSize:'9px',maxWidth:'150px'};
var help="Note: Images might take time to load";
var helplabel = ui.Label(help,clstyle);
var credit="Contains Modified Copernicus Sentinel Data [2017,2018]";
var creditlabel = ui.Label(credit,clstyle);
var myn="Processed by Raj Bhagat Palanichamy (twitter.com/rajbhagatt)";
var mynlabel = ui.Label(myn,clstyle);
var DP=ui.Panel({widgets: [helplabel,creditlabel,mynlabel],style:{position: "bottom-right"},layout: ui.Panel.Layout.flow('vertical')});
rightMap.add(DP);