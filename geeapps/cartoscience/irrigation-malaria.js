var dry_POST = ui.import && ui.import("dry_POST", "image", {
      "id": "users/cartoscience/gbi_lulcc/combinedNicheGbi_10082019_2017-04-01_2017-11-30_dry"
    }) || ee.Image("users/cartoscience/gbi_lulcc/combinedNicheGbi_10082019_2017-04-01_2017-11-30_dry"),
    dry_PRE = ui.import && ui.import("dry_PRE", "image", {
      "id": "users/cartoscience/gbi_lulcc/combinedNiche_10082019_2017-04-01_2017-11-30_dry"
    }) || ee.Image("users/cartoscience/gbi_lulcc/combinedNiche_10082019_2017-04-01_2017-11-30_dry"),
    rainy_POST = ui.import && ui.import("rainy_POST", "image", {
      "id": "users/cartoscience/gbi_lulcc/combinedNicheGbi_10082019_2016-12-01_2017-03-31_rainy"
    }) || ee.Image("users/cartoscience/gbi_lulcc/combinedNicheGbi_10082019_2016-12-01_2017-03-31_rainy"),
    rainy_PRE = ui.import && ui.import("rainy_PRE", "image", {
      "id": "users/cartoscience/gbi_lulcc/combinedNiche_10082019_2016-12-01_2017-03-31_rainy"
    }) || ee.Image("users/cartoscience/gbi_lulcc/combinedNiche_10082019_2016-12-01_2017-03-31_rainy");
var dry_POST = dry_POST.rename('EHS')
var rainy_POST = rainy_POST.rename('EHS')
var dry_PRE = dry_PRE.rename('HS')
var rainy_PRE = rainy_PRE.rename('HS')
var basemap = {
  'basemap': [
    {
      featureType: 'water',
      stylers: [
        { color: '#404040' }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{color: '#a1a1a1'}, {visibility: 'on'}]
    }
  ]
};
var leftMap = ui.Map()
var rightMap = ui.Map()
ui.Map.Linker([leftMap,rightMap])
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
})
var colors = ['ffffff','00aaad','faa045','8bd961','cd96d9','005d66','a12b5f','320031']
leftMap.add(ui.Panel({widgets:ui.Label('Habitat Suitability (HS)'),style:{position:'bottom-left',padding:'0px'}}))
rightMap.add(ui.Panel({widgets:ui.Label('Estimated Habitat Suitability Under SVTP and GBI (EHS)'),style:{position:'bottom-right',padding:'0px'}}))
leftMap.addLayer(rainy_PRE,{min:1,max:8,palette:colors,opacity:0.9},'pre-irrigation')
leftMap.addLayer(dry_PRE,{min:1,max:8,palette:colors,opacity:0.9},'post-irrigation',false)
rightMap.addLayer(rainy_POST,{min:1,max:8,palette:colors,opacity:0.9},'pre-irrigation')
rightMap.addLayer(dry_POST,{min:1,max:8,palette:colors,opacity:0.9},'post-irrigation',false)
leftMap.centerObject(dry_POST,8).setOptions('HYBRID').setOptions('basemap', basemap);
rightMap.setOptions('HYBRID').setOptions('basemap', basemap);
rightMap.setControlVisibility(null, false, false, true, false, false);
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 32px'
  }
});
var legendTitle = ui.Label({
  value: 'Anopheles suitability',
  style: {
    fontWeight: 'bold',
    fontSize: '13px',
    color: '202020',
    margin: '0px 0 10px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '6px',
      margin: '0 0 4px 0',
      border: '1px solid grey'
    }
  });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0 0 4px 6px',
      color: '202020',
      fontSize: '11px'
    }
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var names = ['Suboptimal','Water','Climate','Land','Water & Climate', 'Water & Land', 'Climate & Land', 'Water & Climate & Land'];
for (var i = 0; i < names.length; i++) {
  legend.add(makeRow(colors[i], names[i]));
}
var title = ui.Label({
  value: 'Scaling irrigation and malaria risk',
  style: {
    fontWeight: 'bold',
    fontSize: '22px',
    color: '202020',
    margin: '20px 44px 0 33px',
    padding: '0'
  }
});
var summary = ui.Label({
  value: "An application to assist irrigation development decision-making to increase crop production while simultaneously mitigating malaria risk to surrounding communities. The map demonstrates the change to the suitability extent for the malaria vector Anopheles gambiae s.s. driven by land-use changes for irrigated agriculture under the Shire Valley Transformation Programme (SVTP) and Green Belt Initiative (GBI) in Malawi.",
  style: {
    fontSize: '11px',
    color: '202020',
    margin: '10px 20px 0 33px',
    padding: '0'
  }
});
var rainyLabel = ui.Label({value:'Rainy season (Dec–Mar)',style:{margin:'15px 0 0 33px'}})
var dryLabel = ui.Label({value:'Dry Season (Apr–Nov)',style:{margin:'15px 0 0 33px'}})
var chartOptions = {
  colors: ['202020'],
  vAxis: {
    format: 'scientific',
    viewWindow: { 
      max:6e7
    }
  }
}
var buttonFunction = function() {
  if (leftMap.layers().get(0).get('shown') === true) {
    leftMap.layers().get(0).set('shown', false);
    rightMap.layers().get(0).set('shown', false);
    leftMap.layers().get(1).set('shown', true);
    rightMap.layers().get(1).set('shown', true);
    leftPanel.widgets().set(2,dryLabel);
    leftPanel.widgets().set(7,ui.Chart.image.histogram({
      image: dry_PRE,
      maxPixels: 1e13
    }).setOptions(chartOptions))
    leftPanel.widgets().set(8,ui.Chart.image.histogram({
      image: dry_POST,
      maxPixels: 1e13
    }).setOptions(chartOptions))
  } else {
    leftMap.layers().get(0).set('shown', true);
    rightMap.layers().get(0).set('shown', true);
    leftMap.layers().get(1).set('shown', false);
    rightMap.layers().get(1).set('shown', false);
    leftPanel.widgets().set(2,rainyLabel);
    leftPanel.widgets().set(7,ui.Chart.image.histogram({
      image: rainy_PRE,
      maxPixels: 1e13
    }).setOptions(chartOptions))
    leftPanel.widgets().set(8,ui.Chart.image.histogram({
      image: rainy_POST,
      maxPixels: 1e13
    }).setOptions(chartOptions))
  }
};
var button = ui.Button('Toggle Season', buttonFunction, false, {margin: '10px 0 0 50px', width: '100px'});
var citation = ui.Label({value:'Frake, A. N., Peter, B. G., Chipula, G., and Messina, J. P. [in review] Food, health, and land-use change: Scaling irrigation and mitigating malaria risk in Malawi.',
  style:{
    margin:'15px 30px 0 33px',
    fontSize: '11px'
  }
})
var leftPanel = ui.Panel([
  title,
  summary,
  rainyLabel,
  legend,
  button,
  citation
]
  ,ui.Panel.Layout.flow('vertical'),{width: '305px'});
leftPanel.widgets().set(6,ui.Label({value:'Habitat Suitability (HS) and Estimated Habitat Suitability Under SVTP and GBI (EHS)',
  style:{
    margin:'15px 30px 0 33px',
    fontSize: '11px',
    fontWeight: 'bold'
  }
}))
leftPanel.widgets().set(7,ui.Chart.image.histogram({
  image: rainy_PRE,
  maxPixels: 1e13
}).setOptions(chartOptions))
leftPanel.widgets().set(8,ui.Chart.image.histogram({
  image: rainy_POST,
  maxPixels: 1e13
}).setOptions(chartOptions))
ui.root.clear()
ui.root.insert(0, leftPanel);
ui.root.insert(1, splitPanel);