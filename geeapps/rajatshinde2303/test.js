/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var gfc2016 = ee.Image("UMD/hansen/global_forest_change_2017_v1_5"),
    wdpa = ee.FeatureCollection("WCMC/WDPA/current/polygons");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Author: Rajat Shinde
//Part 1
var anamalai = wdpa.filterMetadata('NAME', 'equals', 'Anamalai');
var lossImage = gfc2016.select('loss');
var areaLossImage = lossImage.multiply(ee.Image.pixelArea());
var areaLostStat = areaLossImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: anamalai,
  scale:30
});
var forestAreaLost = ee.Number(areaLostStat.get('loss'));
print('Forest Area Lost in Anamalai', forestAreaLost.divide(100 * 100), 'hectares');
//Part 2
//gfc1: Loss in 2001, gfc2: Loss in 2002, ...gfc17: Loss in 2017
var gfc13 = gfc2016.select('lossyear').eq(13);
var gfc14 = gfc2016.select('lossyear').eq(14);
var gfc15 = gfc2016.select('lossyear').eq(15);
var gfc16 = gfc2016.select('lossyear').eq(16);
var gfc17 = gfc2016.select('lossyear').eq(17);
var gfcList= [gfc13, gfc14, gfc15, gfc16, gfc17];
var areaLostinYearFunc = function(image){
  var areaImage = image.multiply(ee.Image.pixelArea());
  var lossStat = areaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: anamalai,
    scale: 30
  });
  return lossStat;
};
var areaLostPerYear = gfcList.map(areaLostinYearFunc);
print(areaLostPerYear);
//11th element of the areaLostPerYear has maximum value
//So, maximum forest loss in 2011 of 192.5826119 square meters
function makeButton(position) {
  return ui.Button({
    label: position,
    style: {position: position}
  });
}
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '180px'}
});
var c;
var value = ui.Label({value:'Forest Loss to be Estimated', style: {width: '200px'}});
var b13 = ui.Button({label: 'Forest Loss in Year 2013',
                      onClick: function(){print('13');
                                          c = areaLostinYearFunc(gfc2016.select('lossyear').eq(13));
                                          print(c.get('lossyear'));
                                          value.setValue('Forest Loss is(sq m) ' + c.get('lossyear').getInfo());
                      }
  });
var b14 = ui.Button({label: 'Forest Loss in Year 2014',
                      onClick: function(){print('14');
                                          c = areaLostinYearFunc(gfc2016.select('lossyear').eq(14));
                                          print(c.get('lossyear'));
                                          value.setValue('Forest Loss is(sq m) ' + c.get('lossyear').getInfo());
                      }
  });
var b15 = ui.Button({label: 'Forest Loss in Year 2015',
                      onClick: function(){print('15');
                                          c = areaLostinYearFunc(gfc2016.select('lossyear').eq(15));
                                          print(c.get('lossyear'));
                                          value.setValue('Forest Loss is(sq m) ' + c.get('lossyear').getInfo());
                      }
  });
var b16 = ui.Button({label: 'Forest Loss in Year 2016',
                      onClick: function(){print('16');
                                          c = areaLostinYearFunc(gfc2016.select('lossyear').eq(16));
                                          print(c.get('lossyear'));
                                          value.setValue('Forest Loss is(sq m) ' + c.get('lossyear').getInfo());
                      }
  });
var b17 = ui.Button({label: 'Forest Loss in Year 2017',
                      onClick: function(){print('17');
                                          c = areaLostinYearFunc(gfc2016.select('lossyear').eq(17));
                                          print(c.get('lossyear'));
                                          //value.setValue(c.get('lossyear'));
                                          value.setValue('Forest Loss(sq m) is ' + c.get('lossyear').getInfo());
                      }
  });
panel.add(b13);
panel.add(b14);
panel.add(b15);
panel.add(b16);
panel.add(b17);
//ui.root.clear();
Map.centerObject(anamalai.geometry().bounds(), 13);
ui.root.add(panel);
ui.root.add(ui.Label('Demo App for Quantifying Forest Loss'));
ui.root.add(value);