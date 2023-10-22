var studyarea = /* color: #d63000 */ee.Geometry.Polygon(
        [[[64.43280639321415, 29.497876675081812],
          [64.38886108071415, 25.364805289425224],
          [68.38788451821415, 23.44402609578151],
          [71.15643920571415, 24.607997853585474],
          [73.09003295571415, 24.287957942642635],
          [74.27655639321415, 23.323018032249117],
          [77.52850951821415, 22.99979188152453],
          [79.94550170571415, 23.363366329253783],
          [84.60370483071415, 23.161502466226818],
          [87.28436889321415, 21.821656148675345],
          [89.30585326821415, 21.1674364266055],
          [91.72284545571415, 21.5766688421147],
          [92.90936889321415, 25.006898388299312],
          [95.98554076821415, 27.37267441916094],
          [95.63397826821415, 28.30528003726568],
          [94.93085326821415, 30.335835509763495],
          [86.40546264321415, 30.449554281355844],
          [79.90155639321415, 32.13927365162737],
          [79.81366576821415, 34.053505741934515],
          [81.00018920571415, 35.389882717171375],
          [79.15448608071415, 36.563420497071746],
          [74.84784545571415, 37.54538723159449],
          [71.99140014321415, 36.598709217817586],
          [71.20038451821415, 36.03215784293412],
          [71.59589233071415, 35.06680921071318],
          [69.35468139321415, 35.21055624294052],
          [68.21210326821415, 34.053505741934515],
          [69.44257201821415, 32.917342843270546],
          [69.13495483071415, 31.541960452378675],
          [67.20136108071415, 29.917737602064857],
          [66.58612670571415, 27.91766925163059]]]),
    Firms = ee.ImageCollection("FIRMS");
var animation = require('users/gena/packages:animation');
//Preparing image collection
var today=new Date();
var FirmsImages=Firms.filterDate('2018-10-01',today).map(function(image){
var i=image.clip(studyarea).set({ label : ee.Date(image.get('system:time_start')).format('dd/MM/YYYY')});
var m=i.select('T21').updateMask(i.select('confidence').gte(50));
m=m.rename('CI50');
i=i.addBands(m);
m=i.select('T21').updateMask(i.select('confidence').gte(75));
m=m.rename('CI75');
i=i.addBands(m);
m=i.select('T21').updateMask(i.select('confidence').gte(95));
m=m.rename('CI95');
i=i.addBands(m);
m=i.select('T21').updateMask(i.select('confidence').gte(100));
m=m.rename('CI100');
i=i.addBands(m);
return i;  
});
//Initial Settings for map and visualization parameters
var vis={bands:['CI50'],min:290,max:340,palette:['yellow','orange','red']};
Map.setOptions("hybrid", null, ["roadmap", "satellite", "hybrid", "terrain" ]);
Map.setCenter(77,30,7);
animation.animate(FirmsImages, { preload: false, vis: vis, label: 'label', position: 'bottom-center' });
//Labels across the window
var titlestyle={fontSize:'18px'};
var title="CROP FIRE OBSERVATIONS";
var titlelabel = ui.Label(title,titlestyle);
Map.add(titlelabel);
var clstyle={fontSize:'7px',maxWidth:'150px'};
var help="Note: Images might take time to load";
var helplabel = ui.Label(help,clstyle);
var credit="Source: LANCE FIRMS - NASA/GSFC/ESDIS";
var creditlabel = ui.Label(credit,clstyle);
var myn="Processed by Raj Bhagat Palanichamy";
var mynlabel = ui.Label(myn,clstyle);
var DP=ui.Panel({widgets: [helplabel,creditlabel,mynlabel],style:{position: "bottom-right"},layout: ui.Panel.Layout.flow('vertical')});
Map.add(DP);
//Confidence Drop-Down
var problist={50:50,75:75,95:95,100:100};
var probs = Object.keys(problist);
var ConSelect = ui.Select({
  items: probs,
  value: probs[0],
  style: {'font-size': '6px'},
  onChange: function(value) 
  {
    var newband='CI'+value;
    vis={bands:[newband],min:290,max:340,palette:['yellow','orange','red']};
    print(vis);
    Map.layers().forEach(function(element, index) {
      element.set('visParams',vis);
      print (element.get('visParams'));
    });
  }
});
var ConPanel = ui.Panel({widgets:[ui.Label('Set minimum confidence %', {'font-size': '7px'}), ConSelect],style:{position:'bottom-left'}});
Map.add(ConPanel);