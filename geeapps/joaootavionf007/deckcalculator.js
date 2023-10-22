Map.drawingTools().layers().reset()
var Point = ee.Geometry.Point([-80.22936675374926, 26.225509926502372]);
Map.setOptions('SATELLITE');
Map.centerObject(Point)
var area_deck = 0
var area_pool = 0
var i = 0
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
var pnl_main = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '400px'}	});
var pnl_title = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),style: {width: '250px', height: '100px'}});
var lbl_desc1 = ui.Label('1 - Click on the "use my GPS location" button, or get the coordinates from your address on the link below, copy and paste in the respectives fields');
lbl_desc1.style().set({fontSize: '24px',stretch: 'both'})
var urlLabel = ui.Label('Get Latitude and Longitude from my address');
var url = 'https://www.latlong.net/convert-address-to-lat-long.html'
urlLabel.setUrl(url);
var lbl_desc_lat = ui.Label('Latitude: ');
lbl_desc_lat.style().set({fontSize: '18px',padding: '2px 0px'});
var txb_lat = ui.Textbox({placeholder: 'Ex: 45.454657'});
txb_lat.style().set({padding: '0px 14px'});
var lbl_desc_long = ui.Label('Longitude: ');
lbl_desc_long.style().set({fontSize: '18px',padding: '2px 0px'});
var txb_long = ui.Textbox({placeholder: 'Ex: 30.045847'});
txb_long.style().set({padding: '0px 0px'});
var btn_go_Coord = ui.Button({label:'Go to Coordinates',	  
                           onClick: function(){
                             var Lo = parseFloat(txb_long.getValue());
                             var La = parseFloat(txb_lat.getValue());
                             Map.setCenter(Lo, La, 20);
                             },	    
                          style: {padding:'0px 0px', shown: true, border:'1px solid black' } });
var btn_location = ui.Button({label: 'Use my GPS location', 
                          onClick: function() {
                            var options = {
                              enableHighAccuracy: true,
                              timeout: 5000,
                              maximumAge: 0
                            };
                            var startPos;
                            var geoSuccess = function(position) {
                              startPos = position;
                              print(position)
                              Map.centerObject(startPos)
                            };
                            ui.util.getCurrentPosition(geoSuccess,null,options);
                          },
                        style: {padding:'0px 0px', shown: true, border:'1px solid black' ,stretch: 'both'}});
var lbl_desc2 = ui.Label('3 - Now, click on the "Draw pool geometry" button and then click around the outside area of the pool on the map');
lbl_desc2.style().set({fontSize: '24px',stretch: 'both'})
var btn_draw_pool = ui.Button({label:'Draw pool geometry',	  
                           onClick: function(){
                              i = 0
                              drawPolygon()
                              btn_draw_pool.setDisabled(true)
                              if (btn_draw_deck.getDisabled() == true){
                                calc_area_util.setDisabled(false)  
                              }
                              restart_calc.setDisabled(false)
                             },	    
                          style: {padding:'0px 0px', shown: true, stretch: 'both'} });
var lbl_area_pool = ui.Label('Pool Area (ft²): ');
lbl_area_pool.style().set({shown: false, fontSize: '18px'});
var lbl_result_pool = ui.Label(' ');
lbl_result_pool.style().set({shown: false, fontSize: '18px',fontWeight: 'bold' });
var lbl_desc3 = ui.Label('2 - Click on the "Draw deck geometry" button and then click around the outside edges of the pool deck on the map');
lbl_desc3.style().set({fontSize: '24px',stretch: 'both'})
var btn_draw_deck = ui.Button({label:'Draw deck geometry',	  
                           onClick: function(){
                              i = 1
                              drawPolygon()
                              btn_draw_deck.setDisabled(true)
                              if (btn_draw_pool.getDisabled() == true){
                                calc_area_util.setDisabled(false)  
                              }
                              restart_calc.setDisabled(false)
                             },	    
                          style: {padding:'0px 0px', shown: true, stretch: 'both'} });
var lbl_area_deck = ui.Label('Outside Area (ft²): ');
lbl_area_deck.style().set({shown: false, fontSize: '18px'});
var lbl_result_deck = ui.Label(' ');
lbl_result_deck.style().set({shown: false, fontSize: '18px',fontWeight: 'bold' });
drawingTools.onDraw(ui.util.debounce(calc_area,500));
function drawPolygon() {
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  drawingTools.stop()
}
function calc_area(){
  var aoi = drawingTools.layers().get(0).getEeObject();
  clearGeometry()
  if (i == 0) { 
    area_pool = aoi
    i = 1
    lbl_result_pool.setValue(ee.Number(area_pool.area().multiply(10.764)).format('%.2f' ).getInfo())
    lbl_result_pool.style().set({shown: true});
    lbl_area_pool.style().set({shown: true});
  }
  else{
   area_deck = aoi
   lbl_result_deck.setValue(ee.Number(area_deck.area().multiply(10.764)).format('%.2f' ).getInfo())
   lbl_result_deck.style().set({shown: true});
   lbl_area_deck.style().set({shown: true});
  }
}
var lbl_desc4 = ui.Label('4 - Click on the "Get Quote" button to calc the estimated area');
lbl_desc4.style().set({fontSize: '24px',stretch: 'both'})
var calc_area_util = ui.Button({label:'Get Quote',	  
                           onClick: function(){
                              var diff1 = area_deck.difference(area_pool, ee.ErrorMargin(1));
                              Map.addLayer(diff1, {color: 'FFFF00'}, 'Deck Área');
                              lbl_result.setValue(ee.Number(diff1.area().multiply(10.764)).format('%.2f' ).getInfo())
                              lbl_result.style().set({shown: true});
                              lbl_area.style().set({shown: true});
                             ;
                             },	    
                          style: {padding:'0px 0px', shown: true, border:'2px solid green'} });
calc_area_util.setDisabled(true)                          
var restart_calc = ui.Button({label:'Reset Calc',	  
                           onClick: function(){
                              lbl_result.style().set({shown: false});
                              lbl_area.style().set({shown: false});
                              lbl_result_pool.style().set({shown: false});
                              lbl_area_pool.style().set({shown: false});
                              lbl_result_deck.style().set({shown: false});
                              lbl_area_deck.style().set({shown: false});
                              btn_draw_deck.setDisabled(false)
                              btn_draw_pool.setDisabled(false)
                              calc_area_util.setDisabled(true)
                              Map.clear()
                              drawingTools.setShown(false);
                             ;
                             },	    
                          style: {padding:'0px 0px', shown: true, border:'2px solid red'} });
restart_calc.setDisabled(true)
var lbl_area = ui.Label('Deck estimated Area (ft²): ');
lbl_area.style().set({shown: false, fontSize: '18px'});
var lbl_result = ui.Label(' ');
lbl_result.style().set({shown: false, fontSize: '18px',fontWeight: 'bold' });
//pnl_main.add(pnl_title);
pnl_main.add(lbl_desc1);
pnl_main.add(btn_location);
pnl_main.add(urlLabel)
pnl_main.add(ui.Panel([lbl_desc_lat, txb_lat],ui.Panel.Layout.flow('horizontal')));
pnl_main.add(ui.Panel([lbl_desc_long, txb_long],ui.Panel.Layout.flow('horizontal')));
pnl_main.add(btn_go_Coord);
pnl_main.add(lbl_desc3);
pnl_main.add(btn_draw_deck)
pnl_main.add(ui.Panel([lbl_area_deck, lbl_result_deck],ui.Panel.Layout.flow('horizontal')));
pnl_main.add(lbl_desc2);
pnl_main.add(btn_draw_pool)
pnl_main.add(ui.Panel([lbl_area_pool, lbl_result_pool],ui.Panel.Layout.flow('horizontal')));
pnl_main.add(lbl_desc4);
pnl_main.add(ui.Panel([calc_area_util, restart_calc],ui.Panel.Layout.flow('horizontal')));
pnl_main.add(ui.Panel([lbl_area, lbl_result],ui.Panel.Layout.flow('horizontal')));
ui.root.insert(0, pnl_main);