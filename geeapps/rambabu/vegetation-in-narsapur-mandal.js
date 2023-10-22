//import area of interest from Assets
var narsapur = ee.FeatureCollection("users/rambabu/narsapur_mandal");
//Set Parameters
var FromDate = "2020-01-01";
var ToDate = "2020-12-31";
var CloudCover = 5;
var Locality = "Narsapur Mandal";
var ImageTitle = "Narsapur";
var MapTitle = "Map showing Vegetation and Surface Water";
var PreparedBy = "Dr. P. Rambabu, Professor, BVRIT"
//for Narsapur Mandal
var Tile= "43QHV"; //44QKE or 43QHV
var OrbitNumber=19; 
//---------------------------- 
// import the satellite data from the European Space Agency and apply filter
var imageCollection = ee.ImageCollection("COPERNICUS/S2")
        .filterBounds(narsapur)
        .filterDate(FromDate,ToDate)
        .filter(ee.Filter.eq("MGRS_TILE",Tile)) //44QKE or 43QHV
        .filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', OrbitNumber))
        .filter("CLOUD_COVERAGE_ASSESSMENT<" + CloudCover);
print(imageCollection);
// Get the number of images.
var count = imageCollection.size();
print('Count: ', count);
// Limit the collection to the 5 most recent images.
var dataset = imageCollection.sort('system:time_start', false).limit(10); //sort on date desc
print('Recent images: ', dataset);
var image = ee.Image(dataset.first()).clip(narsapur);
print(image);
var date = ee.Date(image.get('system:time_start')).format('dd-MMM-yyyy');
print("Image Date", date);
//Add Split Panel
var linkedMap1 = ui.Map();
var linkedMap2 = ui.Map();
//Set NDVI Image Left Side --------------------------------
var ndvi = image.normalizedDifference(["B8","B4"]); //B8 = NIR & B4 = RED
var vegitationPalette =['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01','012E01', '011D01', '011301'];
linkedMap1.layers().set(0, ui.Map.Layer(ndvi, {palette:vegitationPalette,min:0,max:1}, ImageTitle + " (NDVI)"));
//Set True Color Image Right Side
linkedMap2.layers().set(0, ui.Map.Layer(image,{min:0,max:3000,bands:"B4,B3,B2"}, ImageTitle + " (True Color) "));
// Link the default Map to the other map.
var linker = ui.Map.Linker([linkedMap1, linkedMap2]);
linkedMap1.centerObject(narsapur,14);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
//---------------------------------------------------------
// Add Map Title and Prepared By
ui.root.setLayout(ui.Panel.Layout.absolute());
//Add Map Title at Top
var titlePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position: 'top-center', padding:'1px'}
});
titlePanel.add(ui.Label({value: MapTitle + " (" + date.getInfo() +  ")",
    style: {color:'blue',fontSize: '18px'}
  }));
ui.root.add(titlePanel);
//Add Prepared By at Bottom-Right Corner
var preparedByPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {position: 'bottom-right', padding:'1px'}
});
preparedByPanel.add(ui.Label({value:'Prepared By:', style:{position:'bottom-right'}}));
preparedByPanel.add(ui.Label({value: PreparedBy,
    style: {color:'blue',fontSize: '12px'}
  }));
ui.root.add(preparedByPanel);