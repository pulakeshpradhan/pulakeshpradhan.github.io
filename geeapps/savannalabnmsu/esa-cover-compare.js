var copernicus = ui.import && ui.import("copernicus", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V-C3/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"),
    vcf = ui.import && ui.import("vcf", "imageCollection", {
      "id": "NASA/MEASURES/GFCC/TC/v3"
    }) || ee.ImageCollection("NASA/MEASURES/GFCC/TC/v3"),
    validation = ui.import && ui.import("validation", "table", {
      "id": "projects/ee-slnmsu-woodycover1/assets/combined_validation_100m"
    }) || ee.FeatureCollection("projects/ee-slnmsu-woodycover1/assets/combined_validation_100m"),
    cover = ui.import && ui.import("cover", "image", {
      "id": "projects/nmsu-savannalab-main/assets/cover_esa_40m"
    }) || ee.Image("projects/nmsu-savannalab-main/assets/cover_esa_40m"),
    planet_wc = ui.import && ui.import("planet_wc", "image", {
      "id": "projects/nmsu-savannalab-main/assets/ps_africa_treecover_2019_100m_v1"
    }) || ee.Image("projects/nmsu-savannalab-main/assets/ps_africa_treecover_2019_100m_v1");
var aoi = cover.geometry().bounds()
//import copernicus and landsat treecover for comparisons
var cop = copernicus.select('shrub-coverfraction').mean().add(copernicus.select('tree-coverfraction').mean()).select([0],['copernicus_cover'])
              .updateMask(cover.select(0).unmask(-9999).neq(-9999)).clip(aoi)
var vcf1 = vcf.filterDate('2015','2016').select(['tree_canopy_cover'],['Landsat_treecover']).mean()
        .updateMask(cover.select(0).unmask(-9999).neq(-9999)).clip(aoi)
//define nmsu cover
var cover_noC = cover.select('cover_noC')
var linearC = cover.select('cover_linearC')
var planet = planet_wc.select([0],['planet_treecover']).updateMask(cover.select(0).unmask(-9999).neq(-9999)).clip(aoi)
//visualization parameters
var vis = {min:0,max:100, palette: ['saddlebrown','orange','yellow','green','blue']}
var cb = require('users/savannalabnmsu/misc:labeledColorBar_steps')
var bar = cb.makeColorBar(vis, 'Fractional Cover (%)', 'top-center','90%','23%','15px','bold',5)
///create 5-panel linked map display
var map1 = ui.Map().setControlVisibility(false).setOptions('hybrid')
var map2 = ui.Map().setControlVisibility(false).setOptions('hybrid')
var map3 = ui.Map().setControlVisibility(false).setOptions('hybrid')
var map4 = ui.Map().setControlVisibility(false).setOptions('hybrid')
var map5 = ui.Map().setControlVisibility(false).setOptions('hybrid')
var inset = ui.Panel([map5],'flow',{width:'55%',height:'55%',position:'top-right'})
var maps = [map1,
            map2,
            map3,
            map4]
var linker = ui.Map.Linker([map1,map2,map3,map4,map5],'change-bounds');
var pan1 = ui.Panel([map1],ui.Panel.Layout.Flow('vertical'),{width:'25%',height:'100%',border:'2px solid black'})
var pan2 = ui.Panel([map2],ui.Panel.Layout.Flow('vertical'),{width:'25%',height:'100%',border:'2px solid black'})
var pan3 = ui.Panel([map3],ui.Panel.Layout.Flow('vertical'),{width:'25%',height:'100%',border:'2px solid black'})
var pan4 = ui.Panel([map4],ui.Panel.Layout.Flow('vertical'),{width:'25%',height:'100%',border:'2px solid black'})
//add layers and lables to maps
map1.addLayer(cover_noC,vis, 'nmsu estimates');
map2.addLayer(planet,vis, 'planet'); 
map3.addLayer(cop,vis, 'copernicus cover'); 
map4.addLayer(vcf1,vis, 'Landsat Treecover'); 
map1.add(ui.Label('NMSU woody cover with validation points',{fontSize:'14px',fontWeight:'bold',position:'bottom-center'}));
map2.add(ui.Label('Reiner,Brandt et al (planet tree cover)',{fontSize:'14px',fontWeight:'bold',position:'bottom-center'}));
map3.add(ui.Label('Copernicus tree+shrub cover',{fontSize:'14px',fontWeight:'bold',position:'bottom-center'}));
map4.add(ui.Label('Landsat(GFCC) treecover',{fontSize:'14px',fontWeight:'bold',position:'bottom-center'}));
map5.add(ui.Label('Google Imagery',{fontSize:'14px',fontWeight:'bold',position:'bottom-center'}));
map1.add(bar);
map4.add(inset)
//extract values for validation samples for plotting
var img1 = cover.addBands(planet).addBands(cop).addBands(vcf1);
print(img1.bandNames());
var toPlot = img1.sampleRegions(validation.filter(ee.Filter.neq('woodycover',9999)), ['woodycover'], 100, null, 1, true);
map1.addLayer(toPlot.style({pointSize:3,color:'black'}),{},'validation plots')
var n = toPlot.size().getInfo()
//function to calc RMSE
function calcRMSE(table,observed,predicted){
     return ee.Number(
       ee.FeatureCollection(table).map(function(feat){
              return feat
              .set('res_sq', ee.Number(feat.get(predicted)).subtract(ee.Number(feat.get(observed))).pow(2));
        })
         .reduceColumns(ee.Reducer.mean(), ['res_sq'])
         .get('mean'))
         .sqrt()
         .format('%.2f').getInfo();
    }
  //add validation plot to each corresponding map  
function plotVal(panel){
  var selected_map = panel.widgets().get(0);
  var img = ee.Image(selected_map.layers().get(0).getEeObject());
  var name = img.bandNames().get(0).getInfo();
  print(name);
  var RMSE = calcRMSE(toPlot, 'woodycover',name);
  var rsq = ee.Number(toPlot.reduceColumns({
    reducer:ee.Reducer.pearsonsCorrelation(),
    selectors:['woodycover',name]
  }).get('correlation')).pow(2).format('%.2f').getInfo();
  var chart = ui.Chart.feature.byFeature(toPlot,'woodycover',[name] )
        .setChartType('ScatterChart')
        .setOptions({
             vAxis:{title:name, viewWindow: {min:0, max:100}, titleTextStyle: {fontSize: 12, fontWeight:'bold'}},
             hAxis:{title:'Validation obs (RMSE='+RMSE+', rsq='+rsq+', n='+n+')',viewWindow: {min:0, max:100}, titleTextStyle: {fontSize: 12, fontWeight:'bold'}},
             series:{0:{
               visibleInLegend:false
             }},
             trendlines: { 0: {
                        showR2:false,
                        visibleInLegend:false,
                        labelInLegend:''
                        } 
     },
     legend: { position: 'none'},//, maxlines:3, alignment:'right',textStyle: {color: 'blue', fontSize: 16}},
     width:'100%',
     height:'30%'
  });
  //var panel = ui.Panel([chart],'flow',{position:'bottom-left',width:'300px',height:'300px',padding:'0px'});
 panel.widgets().set(1,chart);
}
plotVal(pan1);
plotVal(pan2);
plotVal(pan3);
plotVal(pan4);
 map1.setCenter(38,0,4)
  map2.setCenter(38,0,4)
   map3.setCenter(38,0,4)
    map4.setCenter(38,0,4)
    map5.setCenter(38,0,4)
var pans = [pan1,pan2,pan3,pan4]
var mainPanel = ui.Panel({
  widgets: pans,
  layout: ui.Panel.Layout.Flow('horizontal'),
  style: {width: '100%', height: '100%'}
  });
ui.root.widgets().reset([mainPanel]);