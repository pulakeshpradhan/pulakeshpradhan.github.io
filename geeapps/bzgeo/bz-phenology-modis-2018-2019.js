////////////////////////////////////////////////////////////////////////////////////////////////
// App that shows MCD43A4 monthly animation for Belize, from Jan. 2018 to April 2019
// Last updated: 23 April 2019
////////////////////////////////////////////////////////////////////////////////////////////////
var a = require('users/servirbz/packages:borrowed/anim_gena');
var b = require('users/servirbz/packages:mcd43a4_glob1');
var c = require('users/servirbz/packages:bz/bz');
var d = require('users/servirbz/packages:sma_std3');
////////////////////////////////////////////////////////////////////////////////////////////////
var dates = ee.List.sequence(0, 15, 1).map(function(offset) {return ee.Date('2018-01-01').advance(offset, 'month')});
////////////////////////////////////////////////////////////////////////////////////////////////
function resample(images) {return images.map(function(i) { return i})}
var images = dates.map(function(t) {
  t = ee.Date(t);
  var d = 'YYYY-MM';
  var i = b.mcd43a4_sma_bz.filterDate(t, t.advance(1, 'month')).median();
  return i.set({label: t.format(d) }).clip(c.bz_poly).updateMask(c.msk);
});
////////////////////////////////////////////////////////////////////////////////////////////////
Map.setOptions('SATELLITE');
Map.centerObject(ee.Geometry.Point([-88.2, 17.3267]), 9);
a.animate(images, {label: 'label'});
Map.addLayer(c.bnds_w3.clip(c.bz),{palette: "white"},"Int'l Borders");
////////////////////////////////////////////////////////////////////////////////////////////////
var chart_sma = ui.Chart.image.series(b.mod43_mt_2003_2019.filterDate('2018-01-01','2019-04-30').map(d.sma_).map(d.x_pct), c.bz_poly, ee.Reducer.mean(), 5000)
.setOptions({title: "Mean MODIS (MCD43A4)-derived fractional cover, 2018-2019",vAxis:{title:'% fractional cover'},
pointSize:5,series:{0:{color:'burlywood'},1:{color:'lime'},2:{color:'red'}}});
////////////////////////////////////////////////////////////////////////////////////////////////
// UI PANEL
var main = ui.Panel({style: {width: '400px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Belize monthly phenological change: Jan. 2018-April 2019*', {fontWeight: 'bold', fontSize: '20px', color: 'darkgreen'});
var descr = ui.Label("Use the play button in the viewer on the right to start animation; you can also zoom in or out.", {color: 'gray'});
var descr2 = ui.Label("legend: PV = photosynthetic vegetation; NPV = non-photosynthetic vegetation; bare = bare substrate", {color: 'gray'});
var descr3 = ui.Label('* April 2019 is still not finished', {fontSize: '12px', color: 'maroon'});
var credits = ui.Label('credit: derived from NASA MODIS data', {fontSize: '12px', color: 'gray'});
var branding = ui.Thumbnail({image:c.logo_bzsdg,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'100px',height:'92.5px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main.add(title);
main.add(descr);
main.add(chart_sma);
main.add(descr2);
main.add(descr3);
main.add(credits);
main.add(branding);
ui.root.insert(0, main);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////