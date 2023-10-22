var table = ui.import && ui.import("table", "table", {
      "id": "users/rondrori/pine"
    }) || ee.FeatureCollection("users/rondrori/pine");
function creatDate(f){
  var date = f.get('eventDate')
  return f.set('system:time_start', ee.Date(date).millis())
}
var sdate = ee.Date.fromYMD(2000,1,1)
var edate = sdate.advance(10,'year')
Map.addLayer(table.map(creatDate).filterDate('1987-04-08','1987-04-10'))