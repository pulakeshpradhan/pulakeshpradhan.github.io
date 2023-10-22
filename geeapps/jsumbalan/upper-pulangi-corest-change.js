var lanao = ee.FeatureCollection('users/jsumbalan/upper_pulangi_wshed_3');
var forestpu = ee.FeatureCollection('users/jsumbalan/forest_2002_upper_Pulangi')
//var lanao = ee.FeatureCollection('users/jsumbalan/Lanao_Agus_RB');
var cover = ee.Image('UMD/hansen/global_forest_change_2020_v1_8').select(['treecover2000']).gte(85);
var loss = ee.Image('UMD/hansen/global_forest_change_2020_v1_8').select(['lossyear']);
Map.centerObject(lanao,10.9);
Map.setOptions('Satellite');
Map.getCenter(lanao);
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: lanao,
  color: 1,
  width: 3
});
var wtrshd = ui.Map.Layer(outline, {palette: 'ea23d6'}, 'Watershed Boundary',true);
var cover = ui.Map.Layer(cover.updateMask(cover).clip(forestpu),
            {palette: ['00FF00']}, 'Forest Cover', true);
var floss = ui.Map.Layer(loss.updateMask(loss).clip(lanao),
            {palette: ['FF0000']}, 'Forest Loss', true);
         //   Map.add(cover);
          //  Map.add(wtrshd);
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('Upper Pulangi Watershed Forest Loss Explorer', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'This online mapping tool tracks yearly forest loss from 2001 til 2020 for the Upper Pulangi Watershed. The source data comes from the Global Land Analysis and Discovery (GLAD) laboratory at the University of Maryland (https://glad.umd.edu/) and is based on the work of Hansen, et al. The data shown is from a time-series analysis of Landsat images in characterizing global forest extent and change from 2000 through 2020. For additional information about these results, please see the associated journal article (Hansen et al., Science 2013). This tool was developed by the ESSC Geomatics Team using Google Earth Engine.',
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
     var yearSlider = ui.Slider({
       min: 2001,
       max: 2021,
       value: 2001,
       step: 1,style: {stretch: 'horizontal', width:'155px' }});
     yearSlider.onSlide(function(value) {
      Map.layers().reset();
      Map.add(cover);
      Map.add(wtrshd)
      var lossyear = loss.select('lossyear').lt(value-2000).clip(lanao);
      Map.addLayer(lossyear.updateMask(lossyear),{palette: ['FF0000'], max: 100}, 'Forest Loss');
       });
       //Map.addLayer(lossyear.updateMask(lossyear),{palette: ['FF0000'], max: 100}, 'Forest Loss');
       var extLabel = ui.Label({value:'LEGEND',
       style: { fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'}
       });
       var legend = ui.Panel({
         style: {
           position: 'bottom-left',
           padding: '8px 15px'
         }
       });
       var waterbox = ui.Checkbox('', true);
       waterbox.onChange(function(checked) {
         // Shows or hides the first map layer based on the checkbox's value.
         Map.layers().get(0).setShown(checked);
       });
        Map.add(wtrshd);
var opacityshd = ui.Slider({
           min: 0,
           max: 1,
           value: 1,
           step: 0.01,style: {stretch: 'horizontal', width:'250px' }
         });
         opacityshd.onSlide(function(value) {
           wtrshd.setOpacity(value);
         }); 
         var watercolor = ui.Label({
           style: {
             backgroundColor: 'ea23d6' ,
             // Use padding to give the box height and width.
             padding: '8px'
           }
         });
       var waterdesc = ui.Label({value: 'Upper Pulangi Watershed Boundary'});
       var wtrshdlgnd = (ui.Panel({
         widgets: [watercolor,waterdesc,waterbox,opacityshd],
         layout: ui.Panel.Layout.Flow('horizontal', 'wrap')}));
       //Map.add(wtrshdlgnd)
       var coverbox = ui.Checkbox('', true)
       coverbox.onChange(function(checked) {
         // Shows or hides the first map layer based on the checkbox's value.
         Map.layers().get(1).setShown(checked);
       });
         Map.add(cover);
         var covercolor = ui.Label({
           style: {
             backgroundColor: '00FF00' ,
             // Use padding to give the box height and width.
             padding: '8px'
           }
         });
         var opacitycover = ui.Slider({
           min: 0,
           max: 1,
           value: 1,
           step: 0.01,style: {stretch: 'horizontal', width:'150px' }
         });
         opacitycover.onSlide(function(value) {
           cover.setOpacity(value);
         });       
       var coverdesc = ui.Label({value: '2001 Forest Cover'});
       var coverdlgnd = (ui.Panel({
         widgets: [covercolor,coverdesc,coverbox,opacitycover],
         layout: ui.Panel.Layout.Flow('horizontal', 'wrap')}));
         var losscolor = ui.Label({
           style: {
             backgroundColor: 'FF0000' ,
             // Use padding to give the box height and width.
             padding: '8px'
           }
         });
       var lossdesc = ui.Label({value: 'Cumulative Forest Loss'});
       var losslgnd = (ui.Panel({
         widgets: [losscolor,lossdesc,yearSlider],
         layout: ui.Panel.Layout.Flow('horizontal', 'strecthed')}));
       legend.add(ui.Panel({
         widgets: [wtrshdlgnd,coverdlgnd,losslgnd],
         layout: ui.Panel.Layout.Flow('vertical')
       }))
panel.add(extLabel)
     .add(legend);