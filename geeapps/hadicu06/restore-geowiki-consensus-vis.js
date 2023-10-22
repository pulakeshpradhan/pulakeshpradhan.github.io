var geowiki_fullAgree = ee.FeatureCollection("users/hadicu06/IIASA/geowiki/geowiki_outdata_ALL_20201006_balTarg002_db55bffb35b74a45eef3c8acc4a55fe0")
var fullyAgreeClasses = geowiki_fullAgree.distinct('eng_name')
                          .reduceColumns(ee.Reducer.toList(), ['eng_name'])
                          .get('list')
var config = {
  selConsPointsCls: 'Agroforestry'
};
function makeUiSelConsPointsCls(){
  var uiSelConsPointsCls = ui.Select({
    items: fullyAgreeClasses.getInfo(), 
    value: config.selConsPointsCls,
    onChange: function(value){
      config.selConsPointsCls = value;
      updateConsPoints()
    },
    style: {'position': 'top-center'}
  })
  function updateConsPoints(){
    var selConsPoints = geowiki_fullAgree
          .filter(ee.Filter.eq('eng_name', config.selConsPointsCls))
    Map.layers().set(0, ui.Map.Layer(selConsPoints, {color:'orange'}, "Selected consensus samples (orange)"))
  }
  return uiSelConsPointsCls;
}
// Need to initialize the layer 
var geowiki_fullAgree_init = geowiki_fullAgree
        .filter(ee.Filter.eq('eng_name', config.selConsPointsCls))
Map.addLayer(geowiki_fullAgree_init, {color:'orange'}, "Selected consensus samples (orange)")
var uiSelConsPointsCls = makeUiSelConsPointsCls()
Map.add(uiSelConsPointsCls)
Map.setOptions('SATELLITE')
Map.centerObject(geowiki_fullAgree)