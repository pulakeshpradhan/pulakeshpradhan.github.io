var lanao = ee.FeatureCollection('users/jsumbalan/Lanao_Agus_RB');
var cover = ee.Image('UMD/hansen/global_forest_change_2020_v1_8').select(['treecover2000']).gte(85);
var loss = ee.Image('UMD/hansen/global_forest_change_2020_v1_8').select(['lossyear']);
Map.centerObject(lanao,11);
Map.setOptions('Satellite');
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: lanao,
  color: 1,
  width: 3
});
var wtrshd = ui.Map.Layer(outline, {palette: 'ea23d6'}, 'Watershed Boundary',true);
var cover = ui.Map.Layer(cover.updateMask(cover).clip(lanao),
            {palette: ['00FF00']}, 'Forest Cover', true);
var floss = ui.Map.Layer(loss.updateMask(loss).clip(lanao),
            {palette: ['FF0000']}, 'Forest Loss', true);
            Map.add(cover);
            Map.add(wtrshd);
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('Lake Lanao - Agus River Basin Forest Loss Explorer', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'This online mapping tool tracks yearly forest loss from 2001 til 2020 for the Lake Lanao-Agus River Basin. The source data comes from the Global Land Analysis and Discovery (GLAD) laboratory at the University of Maryland (https://glad.umd.edu/) and is based on the work of Hansen, et al. The data shown is from a time-series analysis of Landsat images in characterizing global forest extent and change from 2000 through 2020. For additional information about these results, please see the associated journal article (Hansen et al., Science 2013). This tool was developed by the ESSC Geomatics Team using Google Earth Engine.',
    {fontSize: '15px'});
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '400px',position:'middle-right'}});
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Forest Loss (Hansen, et al.)',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel we created
panel.add(intro)
//3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)
var extLabel = ui.Label({value:'LEGEND',
style: { fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'}
});
// Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// The following creates and styles 1 row of the legend.
var makeRowa = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//Create a palette using the same colors we used for each extent layer
var paletteMAPa = [
'EA23d6',//Watershed
'00FF00',//ForestCover
'FF0000',//Forest Cover
];
// Name of each legend value
var namesa = ['Watershed Boundary','2001 Forest Cover','Forest Loss'];
// Add color and names to legend
for (var i = 0; i < 3; i++) {
  extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
}
panel.add(extLabel)
     .add(extentLegend);
// Year 2002
var check2001 = ui.Checkbox('2001', true);
check2001.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(2).setShown(checked);
});
 var loss2001 = loss.eq(1).clip(lanao); //2001
Map.addLayer(loss2001.updateMask(loss2001),{palette: ['FF0000'], max: 100}, 'Forest Loss 2001');
//print(check2001);
// Year 2002
var check2002 = ui.Checkbox('2002', true);
check2002.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(3).setShown(checked);
});
 var loss2002 = loss.eq(2).clip(lanao); //2002
Map.addLayer(loss2002.updateMask(loss2002),{palette: ['FF0000'], max: 100}, 'Forest Loss 2002');
//print(check2002);
// Year 2003
var check2003 = ui.Checkbox('2003', true);
check2003.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(4).setShown(checked);
});
 var loss2003 = loss.eq(3).clip(lanao); //2003
Map.addLayer(loss2003.updateMask(loss2003),{palette: ['FF0000'], max: 100}, 'Forest Loss 2003');
//print(check2003);
// Year 2004
var check2004 = ui.Checkbox('2004', true);
check2004.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(5).setShown(checked);
});
 var loss2004 = loss.eq(4).clip(lanao); //2004
Map.addLayer(loss2004.updateMask(loss2004),{palette: ['FF0000'], max: 100}, 'Forest Loss 2004');
//print(check2004);
// Year 2005
var check2005 = ui.Checkbox('2005', true);
check2005.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(6).setShown(checked);
});
 var loss2005 = loss.eq(5).clip(lanao); //2005
Map.addLayer(loss2005.updateMask(loss2005),{palette: ['FF0000'], max: 100}, 'Forest Loss 2005');
//print(check2005);
// Year 2006
var check2006 = ui.Checkbox('2006', true);
check2006.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(7).setShown(checked);
});
 var loss2006 = loss.eq(6).clip(lanao); //2006
Map.addLayer(loss2006.updateMask(loss2006),{palette: ['FF0000'], max: 100}, 'Forest Loss 2006');
//print(check2006);
// Year 2007
var check2007 = ui.Checkbox('2007', true);
check2007.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(8).setShown(checked);
});
 var loss2007 = loss.eq(7).clip(lanao); //2007
Map.addLayer(loss2007.updateMask(loss2007),{palette: ['FF0000'], max: 100}, 'Forest Loss 2007');
//print(check2007);
// Year 2008
var check2008 = ui.Checkbox('2008', true);
check2008.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(9).setShown(checked);
});
 var loss2008 = loss.eq(8).clip(lanao); //2008
Map.addLayer(loss2008.updateMask(loss2008),{palette: ['FF0000'], max: 100}, 'Forest Loss 2008');
//print(check2008);
// Year 2009
var check2009 = ui.Checkbox('2009', true);
check2009.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(10).setShown(checked);
});
 var loss2009 = loss.eq(9).clip(lanao); //2009
Map.addLayer(loss2009.updateMask(loss2009),{palette: ['FF0000'], max: 100}, 'Forest Loss 2009');
//print(check2009);
// Year 2010
var check2010 = ui.Checkbox('2010', true);
check2010.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(11).setShown(checked);
});
 var loss2010 = loss.eq(10).clip(lanao); //2010
Map.addLayer(loss2010.updateMask(loss2010),{palette: ['FF0000'], max: 100}, 'Forest Loss 2010');
//print(check2010);
// Year 2011
var check2011 = ui.Checkbox('2011', true);
check2011.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(12).setShown(checked);
});
 var loss2011 = loss.eq(11).clip(lanao); //2011
Map.addLayer(loss2011.updateMask(loss2011),{palette: ['FF0000'], max: 110}, 'Forest Loss 2011');
//print(check2011);
// Year 2012
var check2012 = ui.Checkbox('2012', true);
check2012.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(13).setShown(checked);
});
 var loss2012 = loss.eq(12).clip(lanao); //2012
Map.addLayer(loss2012.updateMask(loss2012),{palette: ['FF0000'], max: 120}, 'Forest Loss 2012');
//print(check2012);
// Year 2013
var check2013 = ui.Checkbox('2013', true);
check2013.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(14).setShown(checked);
});
 var loss2013 = loss.eq(13).clip(lanao); //2013
Map.addLayer(loss2013.updateMask(loss2013),{palette: ['FF0000'], max: 130}, 'Forest Loss 2013');
//print(check2013);
// Year 2014
var check2014 = ui.Checkbox('2014', true);
check2014.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(15).setShown(checked);
});
 var loss2014 = loss.eq(14).clip(lanao); //2014
Map.addLayer(loss2014.updateMask(loss2014),{palette: ['FF0000'], max: 140}, 'Forest Loss 2014');
//print(check2014);
// Year 2015
var check2015 = ui.Checkbox('2015', true);
check2015.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(16).setShown(checked);
});
 var loss2015 = loss.eq(15).clip(lanao); //2015
Map.addLayer(loss2015.updateMask(loss2015),{palette: ['FF0000'], max: 150}, 'Forest Loss 2015');
//print(check2015);
// Year 2016
var check2016 = ui.Checkbox('2016', true);
check2016.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(17).setShown(checked);
});
 var loss2016 = loss.eq(16).clip(lanao); //2016
Map.addLayer(loss2016.updateMask(loss2016),{palette: ['FF0000'], max: 160}, 'Forest Loss 2016');
//print(check2016);
// Year 2017
var check2017 = ui.Checkbox('2017', true);
check2017.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(18).setShown(checked);
});
 var loss2017 = loss.eq(17).clip(lanao); //2017
Map.addLayer(loss2017.updateMask(loss2017),{palette: ['FF0000'], max: 170}, 'Forest Loss 2017');
//print(check2017);
// Year 2018
var check2018 = ui.Checkbox('2018', true);
check2018.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(19).setShown(checked);
});
 var loss2018 = loss.eq(18).clip(lanao); //2018
Map.addLayer(loss2018.updateMask(loss2018),{palette: ['FF0000'], max: 180}, 'Forest Loss 2018');
//print(check2018);
// Year 2019
var check2019 = ui.Checkbox('2019', true);
check2019.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(20).setShown(checked);
});
 var loss2019 = loss.eq(19).clip(lanao); //2019
Map.addLayer(loss2019.updateMask(loss2019),{palette: ['FF0000'], max: 190}, 'Forest Loss 2019');
//print(check2019);
// Year 2020
var check2020 = ui.Checkbox('2020', true);
check2020.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(21).setShown(checked);
});
 var loss2020 = loss.eq(20).clip(lanao); //2020
Map.addLayer(loss2020.updateMask(loss2020),{palette: ['FF0000'], max: 200}, 'Forest Loss 2020');
//print(check2020);
panel.add(ui.Panel([check2001,check2002,check2003,check2004,check2005,check2006,check2007,check2008,check2009,check2010,check2011,check2012,check2013,check2014,check2015,check2016,check2017,check2018,check2019,check2020],
ui.Panel.Layout.flow('horizontal', 'wrap')));
//Map.add(floss);
//panel.add(ui.Button(Map.Layer().setShown()))