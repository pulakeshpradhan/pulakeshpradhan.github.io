//roi选取的是中国陆地区域，数据使用的是modis地标分类数据集合
var roi= ee.FeatureCollection("users/martinaklockopas91/Wuhu");
var lib = require("users/martinaklockopas91/anli:public");
Map.centerObject(roi, 9);
Map.addLayer(ee.Image());
Map.addLayer(roi, {color:"red"}, "roi");
function getYearCol(sDate, eDate, lxCol, region) {
  var yearList = ee.List.sequence(ee.Date(sDate).get("year"), ee.Number(ee.Date(eDate).get("year")).subtract(1));
  var yearImgList = yearList.map(function(year) {
    year = ee.Number(year);
    var _sdate = ee.Date.fromYMD(year, 1, 1);
    var _edate = ee.Date.fromYMD(year.add(1), 1, 1);
    var tempCol = lxCol.filterDate(_sdate, _edate);
    var img = tempCol.max().clip(region);
    img = img.set("date", _sdate.format("yyyy"));
    img = img.set("system:index", _sdate.format("yyyy"));
    img = img.set("system:time_start", _sdate.millis());
    return img;
  });
  var yearImgCol = ee.ImageCollection.fromImages(yearImgList);
  return yearImgCol;
}
var startDate = "1988-01-01";
var endDate = "2020-01-01";
var l4Col = lib.getL4SRCollection(startDate, endDate, roi);
var l5Col = lib.getL5SRCollection(startDate, endDate, roi);
var l7Col = lib.getL7SRCollection("2012-1-1", "2013-1-1", roi);
var l8Col = lib.getL8SRCollection(startDate, endDate, roi);
var lxCol = l8Col.merge(l7Col)
                 .merge(l5Col)
                 .merge(l4Col)
                 .filter(ee.Filter.calendarRange(4, 10, "month"))
                 .sort("system:time_start");
var yearCol = getYearCol(startDate, endDate, lxCol, roi).select("NDWI");
print("yearCol", yearCol);
var visParam = {
  min: 0,
  max: 1,
  palette: [
    'FFFFFF',"blue"  
  ],
};
Map.addLayer(yearCol.first(), visParam, "1988");
var dateList = yearCol.reduceColumns(ee.Reducer.toList(), ["date"])
                      .get("list");
print("yearList", dateList);
dateList.evaluate(function(dates) {
  for (var i=0; i<dates.length; i++) {
    var image = yearCol.filter(ee.Filter.eq("date", dates[i])).first();
    Export.image.toDrive({
      image: image.clip(roi),
      description: "BJ-YearNDWI-"+dates[i],
      fileNamePrefix: "amazing/bjNDWI-"+dates[i],
      region: roi.geometry().bounds(),
      scale: 30, 
       crs: "EPSG:4326", 
      maxPixels: 1e13
    });
  }
});