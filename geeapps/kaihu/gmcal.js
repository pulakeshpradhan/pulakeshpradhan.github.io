var geo_poly = ui.import && ui.import("geo_poly", "table", {
      "id": "users/kaihu/CalGeo/GMC_geo_poly"
    }) || ee.FeatureCollection("users/kaihu/CalGeo/GMC_geo_poly"),
    geo_poly_attri = ui.import && ui.import("geo_poly_attri", "table", {
      "id": "users/kaihu/CalGeo/GEM_geo_poly_attri"
    }) || ee.FeatureCollection("users/kaihu/CalGeo/GEM_geo_poly_attri"),
    offshore_fault = ui.import && ui.import("offshore_fault", "table", {
      "id": "users/kaihu/CalGeo/GMC_offshore_faults_attri"
    }) || ee.FeatureCollection("users/kaihu/CalGeo/GMC_offshore_faults_attri"),
    anti_synclines = ui.import && ui.import("anti_synclines", "table", {
      "id": "users/kaihu/CalGeo/GMC_str_arc"
    }) || ee.FeatureCollection("users/kaihu/CalGeo/GMC_str_arc"),
    contact_faults = ui.import && ui.import("contact_faults", "table", {
      "id": "users/kaihu/CalGeo/GMC_geo_arc"
    }) || ee.FeatureCollection("users/kaihu/CalGeo/GMC_geo_arc"),
    Tahoe_bathy = ui.import && ui.import("Tahoe_bathy", "image", {
      "id": "users/kaihu/CalGeo/Tahoe_bathy_wgs84"
    }) || ee.Image("users/kaihu/CalGeo/Tahoe_bathy_wgs84");
Map.setOptions('TERRAIN');
Map.setCenter(-121.279, 37.831, 6);
Map.style().set('cursor', 'crosshair')
var LayerNames = [
'C',
'Ca',
'D',
'E',
'E-Ep',
'Ec',
'Ep',
'gb',
'gr',
'gr-m',
'grCz',
'grCz?',
'grMz',
'grMz?',
'grpC',
'grpC?',
'grPz',
'J',
'J?',
'K',
'K?',
'KJf',
'KJfm',
'KJfs',
'Kl',
'Kl?',
'Ku',
'Ku-Ep',
'Ku?',
'ls',
'M',
'm',
'M?',
'M+KJfs',
'Mc',
'mv',
'Mzv',
'O',
'Oc',
'Oc?',
'P',
'pC',
'pCc',
'Pm',
'Pz',
'Pzv',
'Q',
'Qg',
'Qls',
'Qoa',
'QPc',
'Qrv',
'Qrvp',
'Qs',
'Qv',
'Qv?',
'Qvp',
'Qvp?',
'sch',
'SO',
'Tc',
'Ti',
'TK',
'Tr',
'Tv',
'Tvp',
'um',
  ];
var colors = [
'99DEFF',
'EB8099',
'99B3FF',
'EBB34D',
'EBB34D',
'DE994D',
'CC994D',
'B399FF',
'FF99CC',
'EB80CC',
'FFCCFF',
'FFCCFF',
'FFB3CC',
'FFB3CC',
'FF4DEB',
'FF4DEB',
'FF66B3',
'4DFF80',
'4DFF80',
'B3FF00',
'B3FF00',
'80DE4D',
'66CC66',
'80EB80',
'80FF00',
'80FF00',
'99FF66',
'99FF66',
'99FF66',
'4D99DE',
'FFDE00',
'CC99DE',
'FFDE00',
'FFDE00',
'DECC00',
'CC4DDE',
'4DFF00',
'EBDE80',
'CCCC80',
'CCCC80',
'FFEBB3',
'CC8080',
'B38080',
'66FFFF',
'66DECC',
'80DEFF',
'FFFFB3',
'CCCCCC',
'FFFF00',
'FFFF66',
'EBDE4D',
'FF9900',
'FF8000',
'FFFFEB',
'FF4D00',
'FF4D00',
'CC4D00',
'CC4D00',
'80CCDE',
'CCB3FF',
'FFB34D',
'F5004D',
'B3DE4D',
'66FFCC',
'FF6666',
'CC6666',
'994DFF',
  ];
var descri = {
  //polygon - lithology
'1' : ' C. Carboniferous marine sedimentary and metasedimentary rocks. Shale, sandstone, conglomerate, limestone, dolomite, chert, hornfels, marble, quartzite; in part pyroclastic rocks.',
'2' : ' Ca. Cambrian marine sedimentary and metasedimentary rocks. Sandstone, shale, limestone, dolomite, chert, quartzite, and phyllite; includes some rocks that are possibly Precambrian.',
'3' : ' D. Devonian marine sedimentary and metasedimentary rocks. Limestone and dolomite, sandstone and shale; in part tuffaceous.',
'4' : ' E. Eocene marine sedimentary rocks. Shale, sandstone, conglomerate, minor limestone; mostly well consolidated.',
'5' : ' E-Ep. Eocene-Paleocene marine sedimentary rocks. Units E and Ep, undifferentiated.',
'6' : ' Ec. Eocene nonmarine (continental) sedimentary rocks. Sandstone, shale, conglomerate; moderately to well consolidated.',
'7' : ' Ep. Paleocene marine sedimentary rocks. Sandstone, shale, and conglomerate; mostly well consolidated.',
'8' : ' gb. Mesozoic plutonic rocks. Gabbro and dark dioritic rocks; chiefly Mesozoic.',
'9' : ' gr. Mesozoic to pre-Cambrian plutonic rocks. Undated granitic rocks.',
'10' : ' gr-m. Mesozoic to pre-Cambrian mixed rocks. Granitic and metamorphic rocks, mostly gneiss and other metamorphic rocks injected by granitic rocks. Mesozoic to Precambrian.',
'11' : ' grCz. Tertiary plutonic rocks. Cenozoic (Tertiary) granitic rocks - quartz monzonite, quartz latite, and minor monzonite, granodiorite, and granite; found in the Kingston, Panamint, Amargosa, and Greenwater Ranges in southeastern California.',
'12' : ' grCz?. Tertiary plutonic rocks. Cenozoic (Tertiary) granitic rocks - quartz monzonite, quartz latite, and minor monzonite, granodiorite, and granite; found in the Kingston, Panamint, Amargosa, and Greenwater Ranges in southeastern California.',
'13' : ' grMz. Mesozoic plutonic rocks. Mesozoic granite, quartz monzonite, granodiorite, and quartz diorite.',
'14' : ' grMz?. Mesozoic plutonic rocks. Mesozoic granite, quartz monzonite, granodiorite, and quartz diorite.',
'15' : ' grpC. pre-Cambrian plutonic rocks. Precambrian granite, syenite, anorthosite, and gabbroic rocks in the San Gabriel Mountains; also various Precambrian plutonic rocks elsewhere in southeastern California.',
'16' : ' grpC?. pre-Cambrian plutonic rocks. Precambrian granite, syenite, anorthosite, and gabbroic rocks in the San Gabriel Mountains; also various Precambrian plutonic rocks elsewhere in southeastern California.',
'17' : ' grPz. Paleozoic and Permo-Triassic plutonic rocks. Paleozoic and Permo-Triassic granitic rocks in the San Gabriel and Klamath Mountains.',
'18' : ' J. Jurassic marine sedimentary and metasedimentary rocks. Shale, sandstone, minor conglomerate, chert, slate, limestone; minor pyroclastic rocks.',
'19' : ' J?. Jurassic marine sedimentary and metasedimentary rocks. Shale, sandstone, minor conglomerate, chert, slate, limestone; minor pyroclastic rocks.',
'20' : ' K. Cretaceous marine sedimentary and metasedimentary rocks. Undivided Cretaceous sandstone, shale, and conglomerate; minor nonmarine rocks in Peninsular Ranges.',
'21' : ' K?. Cretaceous marine sedimentary and metasedimentary rocks. Undivided Cretaceous sandstone, shale, and conglomerate; minor nonmarine rocks in Peninsular Ranges.',
'22' : ' KJf. Cretaceous-Jurassic marine sedimentary and metasedimentary rocks. Franciscan Complex: Cretaceous and Jurassic sandstone with smaller amounts of shale, chert, limestone, and conglomerate. Includes Franciscan melange, except where separated - see KJfm.',
'23' : ' KJfm. Cretaceous-Jurassic marine sedimentary and metasedimentary rocks. Melange of fragmented and sheared Franciscan Complex rocks.',
'24' : ' KJfs. Cretaceous-Jurassic marine sedimentary and metasedimentary rocks. Blueschist and semi-schist of Franciscan Complex. ',
'25' : ' Kl. Lower Cretaceous marine sedimentary and metasedimentary rocks. Lower Cretaceous sandstone, shale, and conglomerate.',
'26' : ' Kl?. Lower Cretaceous marine sedimentary and metasedimentary rocks. Lower Cretaceous sandstone, shale, and conglomerate.',
'27' : ' Ku. Upper Cretaceous marine sedimentary and metasedimentary rocks. Upper Cretaceous sandstone, shale, and conglomerate.',
'28' : ' Ku-Ep. Paleocene-Cretaceous marine sedimentary and metasedimentary rocks. Units Ep and Ku, undifferentiated.',
'29' : ' Ku?. Upper Cretaceous marine sedimentary and metasedimentary rocks. Upper Cretaceous sandstone, shale, and conglomerate.',
'30' : ' ls. Paleozoic or Mesozoic marine sedimentary and metasedimentary rocks. Limestone, dolomite, and marble whose age is uncertain but probably Paleozoic or Mesozoic.',
'31' : ' m. pre-Cenozoic mixed rocks. Undivided pre-Cenozoic metasedimentary and metavolcanic rocks of great variety. Mostly slate, quartzite, hornfels, chert, phyllite, mylonite, schist, gneiss, and minor marble.',
'32' : ' mv. pre-Cenozoic metavolcanic rocks. Undivided pre-Cenozoic metavolcanic rocks. Includes latite, dacite, tuff, and greenstone; commonly schistose.',
'33' : ' M. Miocene marine sedimentary rocks. Sandstone, shale, siltstone, conglomerate, and breccia; moderately to well consolidated.',
'34' : ' M?. Miocene marine sedimentary rocks. Sandstone, shale, siltstone, conglomerate, and breccia; moderately to well consolidated.',
'35' : ' M+KJfs. Tertiary-Cretaceous marine sedimentary and metasedimentary rocks. Units M and KJfs, undifferentiated',
'36' : ' Mc. Miocene nonmarine (continental) sedimentary rocks. Sandstone, shale, conglomerate, and fanglomerate; moderately to well consolidated.',
'37' : ' Mzv. Mesozoic metavolcanic rocks. Undivided Mesozoic volcanic and metavolcanic rocks. Andesite and rhyolite flow rocks, greenstone, volcanic breccia and other pyroclastic rocks; in part strongly metamorphosed. Includes volcanic rocks of Franciscan Complex: basaltic pillow lava, diabase, greenstone, and minor pyroclastic rocks.',
'38' : ' O. Oligocene marine sedimentary rocks. Sandstone, shale, conglomerate; mostly well consolidated.',
'39' : ' Oc. Oligocene nonmarine (continental) sedimentary rocks. Sandstone, shale, and conglomerate; mostly well consolidated.',
'40' : ' Oc?. Oligocene nonmarine (continental) sedimentary rocks. Sandstone, shale, and conglomerate; mostly well consolidated.',
'41' : ' pC. pre-Cambrian marine sedimentary and metasedimentary rocks. Conglomerate, shale, sandstone, limestone, dolomite, marble, gneiss, hornfels, and quartzite; may be Paleozoic in part.',
'42' : ' pCc. pre-Cambrian mixed rocks. Complex of Precambrian igneous and metamorphic rocks. Mostly gneiss and schist intruded by igneous rocks; may be Mesozoic in part.',
'43' : ' P. Pliocene marine sedimentary rocks. Sandstone, siltstone, shale, and conglomerate; mostly moderately consolidated.',
'44' : ' Pm. Permian marine sedimentary and metasedimentary rocks. Shale, conglomerate, limestone and dolomite, sandstone, slate, hornfels, quartzite; minor pyroclastic rocks.',
'45' : ' Pz. Paleozoic marine sedimentary and metasedimentary rocks. Undivided Paleozoic metasedimentary rocks. Includes slate, sandstone, shale, chert, conglomerate, limestone, dolomite, marble, phyllite, schist, hornfels, and quartzite.',
'46' : ' Pzv. Paleozoic metavolcanic rocks. Undivided Paleozoic metavolcanic rocks. Mostly flows, breccia, and tuff, including greenstone, diabase and pillow lavas; minor interbedded sedimentary rocks.',
'47' : ' Q. Pleistocene-Holocene marine and nonmarine (continental) sedimentary rocks. Alluvium, lake, playa, and terrace deposits; unconsolidated and semi-consolidated. Mostly nonmarine, but includes marine deposits near the coast.',
'48' : ' Qg. Pleistocene-Holocene nonmarine (continental) sedimentary rocks. Glacial till and moraines.  Found at high elevations mostly in the Sierra Nevada and Klamath Mountains.',
'49' : ' Qls. Pleistocene-Holocene nonmarine (continental) sedimentary rocks. Selected large landslides, such as the Blackhawk Slide on the north side of San Gabriel Mountains; early to late Quaternary.',
'50' : ' Qoa. Pleistocene marine and nonmarine (continental) sedimentary rocks. Older alluvium, lake, playa, and terrace deposits.',
'51' : ' QPc. Pliocene-Pleistocene nonmarine (continental) sedimentary rocks. Pliocene and/or Pleistocene sandstone, shale, and gravel deposits; mostly loosely consolidated.',
'52' : ' Qrv. Holocene volcanic rocks. Recent (Holocene) volcanic flow rocks; minor pyroclastic deposits.',
'53' : ' Qrvp. Holocene volcanic rocks. Recent (Holocene) pyroclastic and volcanic mudflow deposits.',
'54' : ' Qs. Pleistocene-Holocene marine and nonmarine (continental) sedimentary rocks. Extensive marine and nonmarine sand deposits, generally near the coast or desert playas.',
'55' : ' Qv. Quaternary volcanic rocks. Quaternary volcanic flow rocks; minor pyroclastic deposits.',
'56' : ' Qv?. Quaternary volcanic rocks. Quaternary volcanic flow rocks; minor pyroclastic deposits.',
'57' : ' Qvp. Quaternary volcanic rocks. Quaternary pyroclastic and volcanic mudflow deposits. ',
'58' : ' Qvp?. Quaternary volcanic rocks. Quaternary pyroclastic and volcanic mudflow deposits. ',
'59' : ' sch. Paleozoic or Mesozoic marine sedimentary and metasedimentary rocks. Schists of various types; mostly Paleozoic or Mesozoic age; some Precambrian.',
'60' : ' SO. Silurian-Ordivician marine sedimentary and metasedimentary rocks. Sandstone, shale, conglomerate, chert, slate, quartzite, hornfels, marble, dolomite, phyllite; some greenstone.',
'61' : ' Tc. Tertiary nonmarine (continental) sedimentary rocks. Undivided Tertiary sandstone, shale, conglomerate, breccia, and ancient lake deposits.',
'62' : ' Ti. Tertiary volcanic rocks. Tertiary intrusive rocks; mostly shallow (hypabyssal) plugs and dikes.',
'63' : ' TK. Tertiary-Cretaceous marine sedimentary and metasedimentary rocks. Sandstone, shale, and minor conglomerate in coastal belt of northwestern California; included by some in Franciscan Complex. Previously considered Cretaceous, but now known to contain early Tertiary microfossils in places.',
'64' : ' Tr. Triassic marine sedimentary and metasedimentary rocks. Shale, conglomerate, limestone and dolomite, sandstone, slate, hornfels, quartzite; minor pyroclastic rocks.',
'65' : ' Tv. Tertiary volcanic rocks. Tertiary volcanic flow rocks; minor pyroclastic deposits',
'66' : ' Tvp. Tertiary volcanic rocks. Tertiary pyroclastic and volcanic mudflow deposits.',
'67' : ' um. Mesozoic plutonic rocks. Ultramafic rocks, mostly serpentine. Minor peridotite, gabbro, and diabase; chiefly Mesozoic.',
};
var empty_poly = ee.Image().byte();
var polys = empty_poly.paint({
  featureCollection: geo_poly_attri,
  color: 'col_TYPE_I',
  //width: 2,
});
var contact_f = ee.Filter.inList('LTYPE', ['contact, approx. located', 'contact, approx. located, queried',
'contact, certain', 'ephemeral water boundary', 'scratch boundary', 'water boundary']);
var contacts = contact_faults.filter(contact_f);
var faults_f = ee.Filter.inList('LTYPE', ['dextral fault, approx. located', 'dextral fault, certain','dextral fault, concealed',
 'fault, approx. located', 'fault, approx. located, queried', 'fault, certain', 'fault, concealed', 'fault, concealed, queried',
 'fault, inferred, queried', 'normal fault, approx. located', 'normal fault, certain', 'normal fault, concealed', 
 'normal fault, concealed, queried', 'sinistral fault, approx. located', 'sinistral fault, certain', 'thrust fault, approx. located',
 'thrust fault, certain', 'thrust fault, concealed'
]);
var faults = contact_faults.filter(faults_f);
Map.layers().set(0,ui.Map.Layer (polys, {palette: colors, min:1, max: 67, opacity: 0.75}, 'Rock Types'));
//Map.addLayer(polys, {palette: colors, min:1, max: 67, opacity: 0.75}, 'Rock Types')
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '250x12',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 18px'},
  });
}
function setLegend(legend, palette, text, posi){
  //keyPanel.clear();
  var labelPanel = ui.Panel(
      [ui.Label(legend[0], {margin: '4px 8px'}),
        ui.Label(
            legend[1],
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(legend[2], {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '15px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
  var labelFoot = ui.Label(text, LEGEND_FOOTNOTE_STYLE)
  var LegendPanel = ui.Panel([ColorBar(palette), labelPanel, labelFoot]); LegendPanel.style().set({position:posi})
  return LegendPanel
}
var check_TahoeBathy= ui.Checkbox('Lake Tahoe Bathymetry', false); //check_TahoeBathy.style().set({position: 'top-left'})
check_TahoeBathy.onChange(function(checked){
if (checked){
var palet_bathy = ['5e4fa2','3288bd','66c2a5','abdda4','e6f598','ffffbf','fee08b','fdae61','f46d43','d53e4f','9e0142'];
Map.centerObject(Tahoe_bathy, 10)
var l = Map.layers().length();
Map.layers().set(l, ui.Map.Layer(ee.Terrain.hillshade(Tahoe_bathy, 315, 45),{},'Lake Tahoe Hillshade')),
Map.layers().set(l+1, ui.Map.Layer(Tahoe_bathy,{palette: palet_bathy, min: 1400, max: 1899, opacity: 0.75},'Lake Tahoe bathymetry'))
var TahoeLegend = setLegend(['1400', '1650', '1899'],palet_bathy,'Lake floor elevation (m)', 'bottom-center'); Map.add(TahoeLegend)
}
else
{
 LayerRemover('Lake Tahoe Hillshade');
 LayerRemover('Lake Tahoe bathymetry');
 //le = Map.widgets().length();
 for (i = 4; i< Map.widgets().length();i++){
 Map.remove(Map.widgets().get(i))
 }
}
});
var featurePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    //padding: '8px 15px',
    //height: '400px'
  }
});
var title = ui.Label ('Features', {fontWeight: 'bold'}); featurePanel.add(title);
featurePanel.add(check_TahoeBathy)
Map.widgets().set(0, featurePanel);
//define my own LayerRemover function.
function LayerRemover(LayerName) {
  var layers = Map.layers();  var I = layers.length();  var layernames = []; var ii;
  for (ii = 0; ii < I; ii++ ) {layernames.push(layers.get(ii).getName())}
  Map.remove(Map.layers().get(layernames.indexOf(LayerName)));
}
Map.onChangeZoom(function(){
if (Map.getZoom() > 7) {
var l = Map.layers().length();
Map.layers().set(1, ui.Map.Layer(offshore_fault.draw({color: '000000', strokeWidth: 2}), {},'Offshore faults'));
Map.layers().set(2, ui.Map.Layer(anti_synclines.draw({color: 'FF0090', strokeWidth: 2}), {},'Anticline/Syncline'));
Map.layers().set(3, ui.Map.Layer(contacts.draw({color: '000000', strokeWidth: 1}), {},'Contact of geological units'));
Map.layers().set(4, ui.Map.Layer(faults.draw({color: '000000', strokeWidth: 2}), {},'Onshore faults'));
}
else {
  LayerRemover('Offshore faults');
  LayerRemover('Contact of geological units');
  LayerRemover('Onshore faults');
  LayerRemover('Anticline/Syncline');
}
}) 
//Info Panel
var InfoPanel = ui.Panel();
InfoPanel.style().set({
  width: '380px',
  position: 'bottom-left'
});
//Map.add(InfoPanel);
var Info = ui.Label('Click on your AOI to see the description of the rock units and structures',{fontWeight: 'bold'})
InfoPanel.add(Info)
Map.onClick(function(coords) {
  InfoPanel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var ptv = polys.reduceRegion({reducer: ee.Reducer.first(),scale: Map.getScale(), geometry: ee.Geometry(point).buffer(500)});
  ptv = ptv.rename(ptv.keys(), ['value']);
  ptv.evaluate(function(val){var v = val.value;print(v)
  var vl = ui.Label(descri[(v)]);
  //print(descri[(v)])
  InfoPanel.add(vl)
  })
  var ptb = ee.Geometry(point).buffer(500);
  var ff = offshore_fault.filterBounds(ptb)
  ff.first().get('LTYPE').evaluate(function(val){
    var vl2 = ui.Label(val)
    //print(vl2)
    InfoPanel.add(vl2)
    })
  var fas = anti_synclines.filterBounds(ptb)
  fas.first().get('LTYPE').evaluate(function(val){
    var vl3 = ui.Label(val)
    //print(vl2)
    InfoPanel.add(vl3)
  })
  var fc = contacts.filterBounds(ptb)
  fc.first().get('LTYPE').evaluate(function(val){
    var vl4 = ui.Label(val)
    //print(vl2)
    InfoPanel.add(vl4)
  })
  var ffa = faults.filterBounds(ptb)
  ffa.first().get('LTYPE').evaluate(function(val){
    var vl5 = ui.Label(val)
    //print(vl2)
    InfoPanel.add(vl5)
  })
  //ptv1 = ptv1.rename(ptv1.keys(), ['value']);
  //ptv1.evaluate(function(val){var v = val.value;
  //var vl = ui.Label(descri[(v)]);
  //print(descri[(v)])
  //
  //})
});
function AppBuilderPanel(position, level) {
  var label4 = ui.Label('Map Source: Geological Map of California (2010)\nCalifornia Geological Survey', {whiteSpace: 'pre'});
  label4.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'})
  var label5 = ui.Label('App builder: Kai Hu (kai.hu@wisc.edu)\nUniversity of Wisconsin-Madison\nUpdate: 07/08/2020', {whiteSpace: 'pre'});
  label5.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'})  
  var AppBuilder = ui.Panel([label4, label5]); 
  AppBuilder.style().set({padding: '2px 2px', position: position, backgroundColor: 'rgba(255, 255, 255, 0.65)'})
  //Map.addLayer(image, visParam); 
  Map.widgets().set(level, AppBuilder);
}
AppBuilderPanel('bottom-right', 1)
// Legend
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-right',
    padding: '8px 15px',
    height: '400px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Rock Types',
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
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
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
//  Palette with the colors
var palette =colors;
// name of the legend
var names = LayerNames;
// Add color and and names
for (var i = 0; i < 67; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
//Map.add(legend);
Map.widgets().set(2, legend);
Map.widgets().set(3, InfoPanel);