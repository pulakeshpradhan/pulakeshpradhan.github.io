/**
 * @name classification-production-1
 * @author nextgenmap team 
 * @version 1
 */
// //-----------------------------------------------------------------------------
// // Project parameters
// //-----------------------------------------------------------------------------
var gui              = require('users/diegosilva/next-gen-map:gui_classification.js');
var assetMosaics = 'projects/nexgenmap/MOSAIC/production-1';
var assetSamples = 'projects/nexgenmap/SAMPLES/production-1';
var featureColl = ee.FeatureCollection('projects/nexgenmap/ANCILLARY/nextgenmap_grids');
// import modules
// var palettes = require('users/mapbiomas/modules:Palettes.js');
var geometryFt = featureColl.geometry().centroid();
Map.centerObject(geometryFt,5);
// local para salvar versões de teste:
var assetClassif = 'projects/nexgenmap/CLASSIFICATION/production-1';
// local para salvar versão final
//var assetClassif = 'projects/nexgenmap/CLASSIFICATION/production-1-test';
// var assetCollec3 = 'projects/mapbiomas-workspace/COLECAO3/integracao-ft-dev';
var assetCollec3 = 'projects/mapbiomas-workspace/public/collection3/mapbiomas_collection3_integration_v1';
//Não alterar abaixo
var version = '10'; 
// var featureSpace = ['R', 'G', 'B', 'N', 'soil', 'variance', 'ndvi', 'entropyn'];
// featureSpace disponível:
//   ['R', 'G', 'B', 'N', 'ndvi', 'savi', 'ndwi', 
//   'csi', 'soil', 'tsavi', 'sarvi2', 'normG', 
//   'entropyn', 'entropyg', 'contrast', 'asm', 
//   'entropy', 'inertia', 'correlation', 'variance']
var subgrids = [0, 1, 2, 3, 4, 5];
// var classesIn = [
//     3, 4, 5,
//     9, 11, 12, 13,
//     15, 18, 19, 20,
//     23, 24, 29, 30, 26, 33
// ];
// //legenda completa
// var classesOut = [
//     3, 4, 5,
//     9, 11, 12, 13,
//     15, 18, 18, 18,
//     23, 24, 29, 30, 26, 26
// ];
// //-----------------------------------------------------------------------------
// User defined functions
//-----------------------------------------------------------------------------
var blankPaint = function (geometry) {
    var blank = ee.Image(0).mask(0);
    var geometryDraw = blank.paint(geometry, '0000AA', 2);
    return geometryDraw;
};
var contourGleba = blankPaint(featureColl.geometry());
 Map.addLayer(contourGleba, {
    'palette': '0000FF',
    'opacity': 0.8
}, 'Subgrids');
/**
 * Index bands
 */
var ndvi = function (image) {
    var ndvi = image.expression('float(nir - red)/(nir + red)', {
        'nir': image.select(['N']),
        'red': image.select(['R'])
    });
    ndvi = ndvi.add(1)
        .multiply(100)
        .int16()
        .rename(['ndvi']);
    return image.addBands(ndvi);
};
var savi = function (image) {
    var savi = image.expression(
        '1.1 * float(nir - red) / float(0.1 + nir + red)', {
            'nir': image.select(['N']),
            'red': image.select(['R'])
        });
    savi = savi.multiply(100)
        .int16()
        .rename(['savi']);
    return image.addBands(savi);
};
var ndwi = function (image) {
    // (tm2 – tm4) / (tm2 + tm4)  --> landsat 5
    var ndwi = image.expression(
        'float(green - nir) / float(green + nir)', {
            'green': image.select(['G']),
            'nir': image.select(['N'])
        });
    ndwi = ndwi.add(1)
        .multiply(100)
        .int16()
        .rename(['ndwi']);
    return image.addBands(ndwi);
};
var csi = function (image) {
    var csi = image.expression(
        'float(blue - nir) / float(blue + nir)', {
            'blue': image.select(['B']),
            'nir': image.select(['N'])
        });
    csi = csi.add(1)
        .multiply(100)
        .int16()
        .rename(['csi']);
    return image.addBands(csi);
};
var soil = function (image) {
    var soil = image.expression(
        'float(red - blue) / float(red + blue)', {
            'blue': image.select(['B']),
            'red': image.select(['R'])
        });
    soil = soil.add(1)
        .multiply(100)
        .int16()
        .rename(['soil']);
    return image.addBands(soil);
};
var tsavi = function (image) {
    var tsavi = image.expression(
        '(a * nir - a * red - b) / (a * nir + red - a * b)', {
            'nir': image.select(['N']),
            'red': image.select(['B']),
            'a': 1.22,
            'b': 0.03
        });
    tsavi = tsavi.multiply(100)
        .int16()
        .rename(['tsavi']);
    return image.addBands(tsavi);
};
var sarvi2 = function (image) {
    var sarvi2 = image.expression(
        'a * (nir - red) / (1 + nir + b * red - c * blue)', {
            'nir': image.select(['N']),
            'red': image.select(['R']),
            'blue': image.select(['B']),
            'a': 2.5,
            'b': 6.0,
            'c': 7.5
        });
    sarvi2 = sarvi2.multiply(100)
        .int16()
        .rename(['sarvi2']);
    return image.addBands(sarvi2);
};
var gari = function (image) {
    var gari = image.expression(
        '(nir - (green -(blue - red))) / (nir - (green + (blue - red)))', {
            'nir': image.select(['N']),
            'red': image.select(['R']),
            'green': image.select(['G']),
            'blue': image.select(['B'])
        });
    gari = gari.multiply(100).int16().rename(['gari']);
    return image.addBands(gari);
};
var normg = function (image) {
    var normg = image.expression(
        '(green) / (nir + green + red)', {
            'nir': image.select(['N']),
            'red': image.select(['R']),
            'green': image.select(['G'])
        });
    normg = normg.multiply(100)
        .int16()
        .rename(['normG']);
    return image.addBands(normg);
};
/**
 * Texture bands
 */
var entropyn = function (image) {
    var square = ee.Kernel.square({
        radius: 5
    });
    // Compute entropy N.
    var entropyn = image.select(['N'])
        .uint16()
        .entropy(square)
        .rename(['entropyn']);
    return image.addBands(entropyn);
};
var entropyg = function (image) {
    var square = ee.Kernel.square({
        radius: 5
    });
    // Compute entropy G.
    var entropyg = image.select(['G'])
        .uint16()
        .entropy(square)
        .rename(['entropyg']);
    return image.addBands(entropyg);
};
var textures = function (image) {
    var textura = image.select('G')
        .glcmTexture(2);
    var contrast = textura.select('G_contrast')
        .int16()
        .rename(['contrast']);
    var asm = textura.select('G_asm')
        .multiply(100)
        .int16()
        .rename(['asm']);
    var entropy = textura.select('G_ent')
        .multiply(100)
        .int16()
        .rename('entropy');
    var inertia = textura.select('G_inertia')
        .int16()
        .rename(['inertia']);
    var correlation = textura.select('G_corr')
        .add(1)
        .multiply(100)
        .int16()
        .rename(['correlation']);
    var variance = textura.select('G_var')
        .int16()
        .rename(['variance']);
    return image
        .addBands(contrast)
        .addBands(asm)
        .addBands(entropy)
        .addBands(inertia)
        .addBands(correlation)
        .addBands(variance);
};
/**
 * Calculate area
 */
var calculateArea = function (image) {
    var pixelArea = ee.Image.pixelArea().divide(1000000);
    var areasInfo = pixelArea.addBands(image)
        .reduceRegion({
            'reducer': ee.Reducer.sum().group(1),
            'geometry': image.geometry(),
            'scale': 90,
            'maxPixels': 1e12
        });
    var classes = ee.List(areasInfo.get('groups')).map(
        function (item) {
            item = ee.Dictionary(item);
            return item.get('group');
        }
    );
    var areas = ee.List(areasInfo.get('groups')).map(
        function (item) {
            item = ee.Dictionary(item);
            return ee.Number(item.get('sum')).round();
        }
    );
    return ee.List([classes, areas]);
};
var exportClassification = function(grid_name,cadence,Nsample,minSample,maxSample,Ntrees,assetExport,startDate,
                                    endDate,featureSpace,classIn,classOut,exportDrive,checkBoxAssetBol,assetSelect){
        // /nSamples padrao: 10.000
      var nSamples = Nsample;
      //nSamplesMin padrao: 500
      var nSamplesMin = minSample;
      var nSamplesMax = maxSample;
      //nTrees padrao: 100
      var nTrees = Ntrees;
      var geometryGrid = featureColl.filterMetadata('grid_name','equals',grid_name).geometry();
      Map.centerObject(geometryGrid);
      //sampleType padrão: 'training'
      var sampleType = 'training';
      //type: disponivel‘weekly’, ‘biweekly’, ‘monthly’)
      var type = cadence;
      var gridName = grid_name;
      // calculate feature space
    var collection = ee.ImageCollection(assetMosaics)
        .filterMetadata("grid_name", "equals", gridName)
        // .map(evi2)
        .map(ndvi)
        .map(ndwi)
        .map(savi)
        .map(csi)
        .map(soil)
        .map(sarvi2)
        .map(tsavi)
        .map(gari)
        .map(normg)
        .map(entropyn)
        .map(entropyg)
        .map(textures);
          /**
     * Area estimation and number of saples per class
     */
    // var mapbiomas = ee.Image(ee.ImageCollection(assetCollec3)
    //                           .filterMetadata('grid_name', 'equals', gridName)
    //                           .select('classification_2017').first());
    var mapbiomas = ee.Image(assetCollec3).select('classification_2017').clip(geometryGrid);
    var areas = calculateArea(mapbiomas.remap(classIn, classOut));
    // print(areas);
    var areaTotal = ee.List(areas.get(1)).reduce(ee.Reducer.sum());
    var nSamplesPerClasse = ee.List(areas.get(1)).map(
        function (area) {
            var sampleSize = ee.Number(area).divide(areaTotal)
                .multiply(nSamples)
                .round()
                .int16()
                .max(nSamplesMin)
                .min(nSamplesMax);
            return sampleSize;
        }
    );
    var areaList = ee.List(areas.get(0)).zip(nSamplesPerClasse);
    // print(areaList)
    /**
     * Getting samples
     */
    var samples = ee.FeatureCollection(assetSamples + '/' + gridName + '-samples')
        .filterMetadata('type', 'equals', sampleType)
        .remap(classIn, classOut, 'class');
    var samplesft = ee.FeatureCollection(
        areaList.iterate(
            function (item, collection) {
                item = ee.List(item);
                var col2 = samples
                    .filterMetadata('class', 'equals', item.get(0))
                    .limit(item.get(1), 'new_id');
                return ee.FeatureCollection(collection).merge(col2);
            },
            samples.limit(1)
        )
    );
    // print("samplesft",samplesft);
    // print('Filtered samples size:', samplesft.size());
    /**
     * Classification
     */
            var subcollection = collection
                .filterMetadata("cadence", "equals", type)
                .filterDate(startDate,endDate)
                .select(featureSpace);
            var training = subcollection.mosaic()
                .sampleRegions(samplesft, ['class'], 4);
            var classifier = ee.Classifier.randomForest(nTrees, 1)
                .train(training, 'class');
             Map.addLayer(contourGleba, {
                            'palette': '0000FF',
                            'opacity': 0.8
                        }, 'Subgrids');
            subgrids.forEach(
                function (subgrid) {
                    var subgridImage = ee.Image(subcollection
                        .filterMetadata('subgrid_id', 'equals', subgrid)
                        .first()
                    );
                    var classified = subgridImage.classify(classifier);
                    var image = ee.Image(classified.copyProperties(subgridImage)).set('version',version);
                    Map.addLayer(image.randomVisualizer(),{},grid_name + '_' + subgrid);
                    // if(checkBoxAssetBol === true){
                    //   subgridImage.id().evaluate(
                    //     function (name) {
                    //         // Export.image.toAsset({
                    //         //     'image': ee.Image(classified.copyProperties(subgridImage)).set('version',version),
                    //         //     'description': name,
                    //         //     'assetId': assetSelect + '/' + name,
                    //         //     'pyramidingPolicy': {
                    //         //         '.default': 'mode'
                    //         //     },
                    //         //     'region': subgridImage.geometry(),
                    //         //     'scale': 4,
                    //         //     'maxPixels': 1e13
                    //         // });
                    //         Map.addLayer(ee.Image(classified).randomVisualizer(),{},'image-'+name);
                    //     }
                    // );
                    // }
                }
            );
  };
var getParameters = function(gui){
    var grid_name = gui.grid.getValue();
    var period = gui.period()
    var startDate = period[0]
    var endDate = period[1]
    var cadence = period[2]
    var assetExport = gui.asset.getValue()
    var nsample = gui.nsample_select.getValue();
    var minSample = gui.nsampleMin_select.getValue();
    var maxSample = gui.nsampleMax_select.getValue();
    var nTrees = gui.ntrees_select.getValue();
    return {
      "grid_name": grid_name, 
      "startDate": startDate, 
      "endDate": endDate, 
      "cadence": cadence, 
      "assetExport": assetExport,
      "nsample":nsample,
      "minSample": minSample,
      "maxSample":maxSample,
      "nTrees":nTrees
    }
}
gui.export.onClick(function(){
    Map.layers().reset();
    var parameters = getParameters(gui);
    var grid_name = parameters.grid_name;
    var startDate = parameters.startDate;
    var endDate = parameters.endDate;
    var cadence = parameters.cadence;
    var assetExport = parameters.assetExport;
    var Nsample = parseInt(parameters.nsample);
    var minSample = parseInt(parameters.minSample);
    var maxSample = parseInt(parameters.maxSample);
    var nTrees = parseInt(parameters.nTrees);
    var featureSpace = gui.listBands;
    var classesIn = gui.listBandsclassesIn;
    var classesOut = gui.listBandsclassesOut;
    var exportDrive = gui.checkBoxDrive.getValue();
    var assetSelect = gui.asset.getValue();
    var checkBoxAssetBol = gui.checkBoxAsset.getValue();
    if(classesIn.length != classesOut.length){
      print('O tamanho da lista de classes de entrada deve ser igual ao da saída ');
    }
    else {
        // print(grid_name);
        // print(startDate);
        // print(endDate);
        // print(cadence);
        // print(Nsample);
        // print(minSample);
        // print(maxSample);
        // print(nTrees);
        // print(assetExport);
        // print(classesIn);
        // print(classesOut);
        exportClassification(grid_name,cadence,Nsample,minSample,maxSample,nTrees,assetExport,
          startDate,endDate,featureSpace,classesIn,classesOut,exportDrive,checkBoxAssetBol,assetSelect);
    }
});