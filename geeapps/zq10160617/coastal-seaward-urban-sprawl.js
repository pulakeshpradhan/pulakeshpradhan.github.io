var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/zq10160617/Chinafishnet"
    }) || ee.FeatureCollection("users/zq10160617/Chinafishnet"),
    urban1 = ui.import && ui.import("urban1", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/fujian"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/fujian"),
    urban2 = ui.import && ui.import("urban2", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/guangdong"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/guangdong"),
    urban3 = ui.import && ui.import("urban3", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/guangxi"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/guangxi"),
    urban4 = ui.import && ui.import("urban4", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/hainan"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/hainan"),
    urban5 = ui.import && ui.import("urban5", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/hebei"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/hebei"),
    urban6 = ui.import && ui.import("urban6", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/hongkong"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/hongkong"),
    urban7 = ui.import && ui.import("urban7", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/jiangsu"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/jiangsu"),
    urban8 = ui.import && ui.import("urban8", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/liaoning"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/liaoning"),
    urban9 = ui.import && ui.import("urban9", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/macao"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/macao"),
    urban10 = ui.import && ui.import("urban10", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/shandong"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/shandong"),
    urban11 = ui.import && ui.import("urban11", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/shanghai"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/shanghai"),
    urban12 = ui.import && ui.import("urban12", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/taiwan"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/taiwan"),
    urban13 = ui.import && ui.import("urban13", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/tianjin"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/tianjin"),
    urban14 = ui.import && ui.import("urban14", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/urbansprawl/zhejiang"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/zhejiang"),
    land1 = ui.import && ui.import("land1", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/Fujian"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/Fujian"),
    land2 = ui.import && ui.import("land2", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/guangxi1"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/guangxi1"),
    land4 = ui.import && ui.import("land4", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/hainan"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/hainan"),
    land5 = ui.import && ui.import("land5", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/hebei"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/hebei"),
    land6 = ui.import && ui.import("land6", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/hongkong"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/hongkong"),
    land7 = ui.import && ui.import("land7", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/jiangsu"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/jiangsu"),
    land8 = ui.import && ui.import("land8", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/liaoning"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/liaoning"),
    land9 = ui.import && ui.import("land9", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/macao"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/macao"),
    land10 = ui.import && ui.import("land10", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/shandong"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/shandong"),
    land11 = ui.import && ui.import("land11", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/shanghai"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/shanghai"),
    land12 = ui.import && ui.import("land12", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/taiwan"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/taiwan"),
    land13 = ui.import && ui.import("land13", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/tianjin"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/tianjin"),
    land14 = ui.import && ui.import("land14", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/zhejiang"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/zhejiang"),
    land3 = ui.import && ui.import("land3", "image", {
      "id": "projects/coastalseawardurbansprawl/assets/landincreases/guangdong"
    }) || ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/guangdong");
function maskL457sr1(image) {
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBand, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
function cloudMaskL8sr(image) {
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
var L5 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
                  .filterBounds(geometry)
                  .filterDate('1984-01-01','1988-01-01')
                  .map(maskL457sr1)
                  .select(['SR_B7','SR_B5','SR_B3'])
                  .median();
var L8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                  .filterDate('2021-01-01', '2023-01-01')
                  .filterBounds(geometry)
                  .map(cloudMaskL8sr)
                  .map(applyScaleFactors)
                  .select(['SR_B5'])
                  .median();
var urbancollection = ee.ImageCollection([urban1,urban2,urban3,urban4,urban5,urban6,urban7,urban8,urban9,urban10,urban11,urban12,urban13,urban14]);
var urban = urbancollection.mosaic()
var urban = urban.select('b1').rename('urban');
var landcollection = ee.ImageCollection([land1,land2,land3,land4,land5,land6,land7,land8,land9,land10,land11,land12,land13,land14]);
var reclamation = landcollection.mosaic()
var reclamation1 = reclamation.select('b1').rename('land');
var reclamation1 = reclamation1.add(1985);
var urban = urban.add(1985);
var zhang = reclamation1.addBands(urban);     
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(ui.Label('Median Composite Image in 1985',{fontSize: '18px',position:'bottom-left'}));
leftMap.setControlVisibility(false);
leftMap.addLayer(L5,{gamma:1.5,min:0,max:0.3},'Landsat5')
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.add(ui.Label('Coatal Seaward Land Increase/Urban Sprawl',{fontSize: '18px',position:'bottom-right'}));
rightMap.setControlVisibility(true, true, false, false, false, false, false);
rightMap.addLayer(L8,{gamma:1.5,min:0,max:0.3},'Median Composite Image in 2022',true)
rightMap.addLayer(reclamation1,{min:1986,max:2022,palette: ['FEE825','EDE618','DBE319','CBE120','B5DE2C','A2DB38','8FD744','7ED34F','6DCF5A',
            '5DC963','4EC46B','41BE73','35B879','2CB27E','25AB83','20A587','1F9E89',
            '1F978C','21918D','238A8E','26838F','287D8F','2B768F','2E6F8F','31688E',
            '34618E','375A8D','3B528C','3E4A8A','424287','443A83','47317F','482878',
            '481F71','481669','470B5F','440154']},'Seaward Land Increase')
rightMap.addLayer(urban,{min:1986,max:2022,palette: ['FEE825','EDE618','DBE319','CBE120','B5DE2C','A2DB38','8FD744','7ED34F','6DCF5A',
            '5DC963','4EC46B','41BE73','35B879','2CB27E','25AB83','20A587','1F9E89',
            '1F978C','21918D','238A8E','26838F','287D8F','2B768F','2E6F8F','31688E',
            '34618E','375A8D','3B528C','3E4A8A','424287','443A83','47317F','482878',
            '481F71','481669','470B5F','440154']},'Seaward Urban Sprawl',false)
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(113.79,22.49,12);
var header = ui.Label('Coastal Seaward Urban Sprawl', {fontWeight: 'bold', fontSize: '19px',margin: '5px 0 4px 6px',padding: '0'});
var text = ui.Label(
    'Multi-decadal coastal urban sprawl map for China in 1986-2022 derived from our FADUS (Fully Automatic Detection of Urban Sprawl) classification framework on time series of Landsat imagery. This map uncovers a neglected but dramatic seaward urban sprawl process transferring sea area to urban space since 1985. The derived annual maps of seaward land extent indicated that 9904.36 km2 of coastal wetlands and nearshore waters were converted to land in the last 37 years, 44.83% of which was occupied by built-up area currently.',
    {fontSize: '14px',margin: '5px 0 4px 6px',padding: '0'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Paper by Zhang et al.', {},
    'https://www.sciencedirect.com/science/article/pii/S0034425723003528?via%3Dihub#da0005');
var linkPanel = ui.Panel(
    [ui.Label('For More Information', {fontWeight: 'bold', fontSize: '14px', margin: '5px 0 4px 6px', padding: '0'}), link]);
toolPanel.add(linkPanel);
var link1 = ui.Label(
    'Data download from figshare', {},
    'https://figshare.com/articles/dataset/FADUS_China/21129826');
var linkPanel1 = ui.Panel(
    [ui.Label('To Download Data', {fontWeight: 'bold', fontSize: '14px', margin: '5px 0 4px 6px', padding: '0'}), link1]);
toolPanel.add(linkPanel1);
// Create the legend.
// Define a panel for the legend and give it a tile.
// //添加图例
var layerProperties1 = {
  'Seaward Land Increase': {
    name:'land',
    visParams: {min:1,max:37,bands:['land'],palette:['FEE825','EDE618','DBE319','CBE120','B5DE2C','A2DB38','8FD744','7ED34F','6DCF5A',
            '5DC963','4EC46B','41BE73','35B879','2CB27E','25AB83','20A587','1F9E89',
            '1F978C','21918D','238A8E','26838F','287D8F','2B768F','2E6F8F','31688E',
            '34618E','375A8D','3B528C','3E4A8A','424287','443A83','47317F','482878',
            '481F71','481669','470B5F','440154']},
        legend: [
      {'1986': 'FEE825'}, {'1987': 'EDE618'}, {'...': '26838F'}, {'2021': '470B5F'}, {'2022': '440154'}],
    defaultVisibility: true
  },        
};
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '14px', margin: '5px 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendzero = ui.Label(
    '',
    {fontWeight: 'bold', fontSize: '14px', margin: '5px 0 4px 0', padding: '0'});
legendPanel.add(legendzero);
var legendTitle = ui.Label(
    'Change Year',
    {fontWeight: 'bold', fontSize: '14px', margin: '5px 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
var legendzero1 = ui.Label(
    '',
    {fontWeight: 'bold', fontSize: '14px', margin: '5px 0 4px 0', padding: '0'});
legendPanel.add(legendzero1);
// Set the initial legend.
//setLegend(layerProperties1[layerSelect.getValue()].legend);
var legendPanel2 = ui.Panel({
  widgets: [
    ui.Label('',{backgroundColor: 'FEE825',padding: '8px',margin: '0px 0px 0px 3px'}),
    ui.Label('1986',{margin: '0px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '6DCF5A',padding: '8px',margin: '0px 0px 0px 3px'}),
    ui.Label('1994',{margin: '0px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '1F9E89',padding: '8px',margin: '0px 0px 0px 3px'}),
    ui.Label('2002',{margin: '0px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '31688E',padding: '8px',margin: '0px 0px 0px 3px'}),
    ui.Label('2010',{margin: '0px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '482878',padding: '8px',margin: '0px 0px 0px 3px'}),
    ui.Label('2018',{margin: '0px 0px 0px 3px'}),
  ],
  layout: ui.Panel.Layout.Flow('horizontal')
});
toolPanel.add(legendPanel2)
var legendPanel3 = ui.Panel({
  widgets: [
    ui.Label('',{backgroundColor: 'EDE618',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1987',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '5DC963',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1995',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '1F978C',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2003',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '34618E',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2011',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '481F71',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2019',{margin: '5px 0px 0px 3px'}),
  ],
  layout: ui.Panel.Layout.Flow('horizontal')
});
toolPanel.add(legendPanel3)
var legendPanel4 = ui.Panel({
  widgets: [
    ui.Label('',{backgroundColor: 'DBE319',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1988',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '4EC46B',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1996',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '21918D',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2004',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '375A8D',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2012',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '481669',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2020',{margin: '5px 0px 0px 3px'}),
  ],
  layout: ui.Panel.Layout.Flow('horizontal')
});
toolPanel.add(legendPanel4)
var legendPanel5 = ui.Panel({
  widgets: [
    ui.Label('',{backgroundColor: 'CBE120',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1989',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '41BE73',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1997',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '238A8E',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2005',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '3B528C',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2013',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '470B5F',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2021',{margin: '5px 0px 0px 3px'}),
  ],
  layout: ui.Panel.Layout.Flow('horizontal')
});
toolPanel.add(legendPanel5)
var legendPanel6 = ui.Panel({
  widgets: [
    ui.Label('',{backgroundColor: 'B5DE2C',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1990',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '35B879',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1998',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '238A8E',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2006',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '26838F',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2014',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '440154',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2022',{margin: '5px 0px 0px 3px'}),
  ],
  layout: ui.Panel.Layout.Flow('horizontal')
});
toolPanel.add(legendPanel6)
var legendPanel7 = ui.Panel({
  widgets: [
    ui.Label('',{backgroundColor: 'A2DB38',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1991',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '2CB27E',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1999',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '287D8F',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2007',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '424287',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2015',{margin: '5px 0px 0px 3px'}),
    //ui.Label('',{backgroundColor: '470C5F',padding: '8px',margin: '5px 0px 0px 3px'}),
    //ui.Label('2019',{margin: '5px 0px 0px 3px'}),
  ],
  layout: ui.Panel.Layout.Flow('horizontal')
});
toolPanel.add(legendPanel7)
var legendPanel8 = ui.Panel({
  widgets: [
    ui.Label('',{backgroundColor: '8FD744',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1992',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '25AB83',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2000',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '2B768F',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2008',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '443A83',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2016',{margin: '5px 0px 0px 3px'}),
    //ui.Label('',{backgroundColor: '440154',padding: '8px',margin: '5px 0px 0px 3px'}),
    //ui.Label('2020',{margin: '5px 0px 0px 3px'}),
  ],
  layout: ui.Panel.Layout.Flow('horizontal')
});
toolPanel.add(legendPanel8)
var legendPanel9 = ui.Panel({
  widgets: [
    ui.Label('',{backgroundColor: '7ED34F',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('1993',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '20A587',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2001',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '2E6F8F',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2009',{margin: '5px 0px 0px 3px'}),
    ui.Label('',{backgroundColor: '47317F',padding: '8px',margin: '5px 0px 0px 3px'}),
    ui.Label('2017',{margin: '5px 0px 0px 3px'}),
    //ui.Label('',{backgroundColor: '440154',padding: '8px',margin: '5px 0px 0px 3px'}),
    //ui.Label('2020',{margin: '5px 0px 0px 3px'}),
  ],
  layout: ui.Panel.Layout.Flow('horizontal')
});
toolPanel.add(legendPanel9)
///////////////////////////////
////////////////////////////
var Assetzero = ui.Label(
    '',
    {fontWeight: 'bold', fontSize: '14px', margin: '5px 0 11px 0', padding: '0'});
toolPanel.add(Assetzero);
var AssetTitle = ui.Label(
    'Earth Engine Assets',
    {fontWeight: 'bold', fontSize: '14px', margin: '5px 0 4px 6px', padding: '0'});
toolPanel.add(AssetTitle);
var text1 = ui.Label(
    'var land_increase = ee.Image("projects/coastalseawardurbansprawl/assets/landincreases/landincrease");',
    {fontSize: '14px',backgroundColor:'DEDEDE'});
toolPanel.add(text1);    
var text2 = ui.Label(
    'var urban_sprawl = ee.Image("projects/coastalseawardurbansprawl/assets/urbansprawl/urbansprawl");',
    {fontSize: '14px',backgroundColor:'DEDEDE'});
toolPanel.add(text2);