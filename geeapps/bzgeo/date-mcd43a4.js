////////////////////////////////////////////////////////////////////////////////////////////////
var mcd43a4 = ee.ImageCollection("MODIS/061/MCD43A4");
var d = require('users/servirbz/packages:bz/bz');
////////////////////////////////////////////////////////////////////////////////////////////////
function most_recent(coll, pt) {
var t = 'system:time_start';
var d = 'YYYY-MM-dd';
var date = ee.Date(ee.Image(coll.filterBounds(pt).sort(t, false).first()).get(t)).format(d);
return date.getInfo();}
////////////////////////////////////////////////////////////////////////////////////////////////
var thisDate = most_recent(mcd43a4, ee.Geometry.Point([-88.20, 17.5]));
////////////////////////////////////////////////////////////////////////////////////////////////
var text1 = ui.Label({
  value: 'Date of the most recent MCD43A4 imagery:',
  style: {position: 'middle-left', width: '370px', whiteSpace: 'pre-wrap', fontSize: '18px'},});
var text2 = ui.Label({
  value: thisDate,
  style: {position: 'bottom-left', width: '370px', whiteSpace: 'pre-wrap', fontWeight: 'bold', fontSize: '24px'},});
var close_button = ui.Button({label: 'X', style: {position: 'top-right', color: 'red', fontWeight: 'bold'},});
var dialog_box = ui.Panel({
  layout: ui.Panel.Layout.absolute(),
  widgets: [close_button, text1, text2],
  style: {width: '400px', height: '180px'},
  });
Map.add(dialog_box);
close_button.onClick( function() {dialog_box.style().set('shown', false); });
Map.centerObject(ee.Geometry.Point([-88.745, 17.3267]), 8);
Map.addLayer(d.bnds_w1.clip(d.bz),{palette: "black"},"Int'l Borders");
////////////////////////////////////////////////////////////////////////////////////////////////