/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("users/vernalequinox/2028_CSI"),
    image2 = ee.Image("users/vernalequinox/2024_CSI"),
    image3 = ee.Image("users/vernalequinox/ReclassWSI2020_"),
    image4 = ee.Image("users/vernalequinox/WSIReclassified"),
    image5 = ee.Image("users/vernalequinox/WSIReclassify2019"),
    image6 = ee.Image("users/vernalequinox/CSI"),
    image7 = ee.Image("users/vernalequinox/WSI22"),
    image8 = ee.Image("users/vernalequinox/WSI24"),
    image9 = ee.Image("users/vernalequinox/WSI28");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var collection = image;
var CSI_2028 = {
  min: 0,
  max: 348,
  palette: ['1a9641','a6d96a','ffffbf','fdae61', 'd7191c']
};
Map.addLayer(collection, CSI_2028 , '2028_CSI');
var collection = image3;
var CSI_2022 = {
  min: 0,
  max: 1302,
  palette: ['1a9641','a6d96a','ffffbf','fdae61', 'd7191c']
};
Map.addLayer(collection, CSI_2022 , '2022_CSI');
var collection = image2;
var CSI_2024 = {
  min: 1,
  max: 248,
  palette: ['1a9641','a6d96a','ffffbf','fdae61', 'd7191c']
};
Map.addLayer(collection, CSI_2024 , '2024_CSI');
var collection = image7;
var WSI_2022 = {
  min: 4896,
  max: 7835,
  palette: ['1a9641','a6d96a','ffffbf','fdae61', 'd7191c']
};
Map.addLayer(collection, WSI_2022 , '2022_WSI');
var collection = image8;
var WSI_2024 = {
  min: 5146,
  max: 8081,
  palette: ['1a9641','a6d96a','ffffbf','fdae61', 'd7191c']
};
Map.addLayer(collection, WSI_2024 , '2024_WSI');
var collection = image9;
var WSI_2028 = {
  min: 5152,
  max: 8105,
  palette: ['1a9641','a6d96a','ffffbf','fdae61', 'd7191c']
};
Map.addLayer(collection, WSI_2028 , '2028_WSI');
// BAR Legenda
var viz = {
  min: 0,
  max: 500,
  palette: ['1a9641','a6d96a','ffffbf','fdae61', 'd7191c']
};
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
var legendTitle = ui.Label({
value: 'Legenda',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
legend.add(legendTitle);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel);
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'20x200'},
style: {padding: '1px', position: 'bottom-center'}
});
legend.add(thumbnail);
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel);
Map.add(legend)
Map.centerObject(image, 11, {})