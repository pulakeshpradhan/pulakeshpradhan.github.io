var boundary = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    dem = ee.Image("USGS/SRTMGL1_003"),
    ValidatonPoint = ee.FeatureCollection("users/fudongjie/ReferenceData_SouthEastAsia_v4"),
    river = ee.FeatureCollection("users/fudongjie/ThailandTrip/River_Thailand"),
    lake = ee.FeatureCollection("users/fudongjie/ThailandTrip/Lake_Thailand"),
    road = ee.FeatureCollection("users/fudongjie/ThailandTrip/Road_Thailand"),
    railroad = ee.FeatureCollection("users/fudongjie/ThailandTrip/Railroad_Thailand"),
    Day5_route = ee.FeatureCollection("users/fudongjie/ThailandTrip/Day5_Route"),
    Day5_stopPoint = ee.FeatureCollection("users/fudongjie/ThailandTrip/Day5_StopPoint"),
    Day5_checkPoint = ee.FeatureCollection("users/fudongjie/ThailandTrip/Day5_CheckPoint"),
    Accommodation = ee.FeatureCollection("users/fudongjie/ThailandTrip/Accommodation"),
    Route = ee.FeatureCollection("users/fudongjie/ThailandTrip/Route"),
    SamplePoint = ee.FeatureCollection("users/fudongjie/ThailandTrip/SamplePoint");
// For the field trip of Thailand (Southeast Asia)
// Created Aug. 30, 2018
// By Dongjie Fu (fudongjie#gmail.com)
// Add NDVI of Landsat
//-----------------------------------------
// parameter initialzation and data loading
var Palettes = {
  YlGn:{3:["f7fcb9","addd8e","31a354"],4:["ffffcc","c2e699","78c679","238443"],5:["ffffcc","c2e699","78c679","31a354","006837"],6:["ffffcc","d9f0a3","addd8e","78c679","31a354","006837"],7:["ffffcc","d9f0a3","addd8e","78c679","41ab5d","238443","005a32"],8:["ffffe5","f7fcb9","d9f0a3","addd8e","78c679","41ab5d","238443","005a32"],9:["ffffe5","f7fcb9","d9f0a3","addd8e","78c679","41ab5d","238443","006837","004529"]},
  YlGnBu:{3:["edf8b1","7fcdbb","2c7fb8"],4:["ffffcc","a1dab4","41b6c4","225ea8"],5:["ffffcc","a1dab4","41b6c4","2c7fb8","253494"],6:["ffffcc","c7e9b4","7fcdbb","41b6c4","2c7fb8","253494"],7:["ffffcc","c7e9b4","7fcdbb","41b6c4","1d91c0","225ea8","0c2c84"],8:["ffffd9","edf8b1","c7e9b4","7fcdbb","41b6c4","1d91c0","225ea8","0c2c84"],9:["ffffd9","edf8b1","c7e9b4","7fcdbb","41b6c4","1d91c0","225ea8","253494","081d58"]},
  GnBu:{3:["e0f3db","a8ddb5","43a2ca"],4:["f0f9e8","bae4bc","7bccc4","2b8cbe"],5:["f0f9e8","bae4bc","7bccc4","43a2ca","0868ac"],6:["f0f9e8","ccebc5","a8ddb5","7bccc4","43a2ca","0868ac"],7:["f0f9e8","ccebc5","a8ddb5","7bccc4","4eb3d3","2b8cbe","08589e"],8:["f7fcf0","e0f3db","ccebc5","a8ddb5","7bccc4","4eb3d3","2b8cbe","08589e"],9:["f7fcf0","e0f3db","ccebc5","a8ddb5","7bccc4","4eb3d3","2b8cbe","0868ac","084081"]},
  BuGn:{3:["e5f5f9","99d8c9","2ca25f"],4:["edf8fb","b2e2e2","66c2a4","238b45"],5:["edf8fb","b2e2e2","66c2a4","2ca25f","006d2c"],6:["edf8fb","ccece6","99d8c9","66c2a4","2ca25f","006d2c"],7:["edf8fb","ccece6","99d8c9","66c2a4","41ae76","238b45","005824"],8:["f7fcfd","e5f5f9","ccece6","99d8c9","66c2a4","41ae76","238b45","005824"],9:["f7fcfd","e5f5f9","ccece6","99d8c9","66c2a4","41ae76","238b45","006d2c","00441b"]},
  PuBuGn:{3:["ece2f0","a6bddb","1c9099"],4:["f6eff7","bdc9e1","67a9cf","02818a"],5:["f6eff7","bdc9e1","67a9cf","1c9099","016c59"],6:["f6eff7","d0d1e6","a6bddb","67a9cf","1c9099","016c59"],7:["f6eff7","d0d1e6","a6bddb","67a9cf","3690c0","02818a","016450"],8:["fff7fb","ece2f0","d0d1e6","a6bddb","67a9cf","3690c0","02818a","016450"],9:["fff7fb","ece2f0","d0d1e6","a6bddb","67a9cf","3690c0","02818a","016c59","014636"]},
  PuBu:{3:["ece7f2","a6bddb","2b8cbe"],4:["f1eef6","bdc9e1","74a9cf","0570b0"],5:["f1eef6","bdc9e1","74a9cf","2b8cbe","045a8d"],6:["f1eef6","d0d1e6","a6bddb","74a9cf","2b8cbe","045a8d"],7:["f1eef6","d0d1e6","a6bddb","74a9cf","3690c0","0570b0","034e7b"],8:["fff7fb","ece7f2","d0d1e6","a6bddb","74a9cf","3690c0","0570b0","034e7b"],9:["fff7fb","ece7f2","d0d1e6","a6bddb","74a9cf","3690c0","0570b0","045a8d","023858"]},
  BuPu:{3:["e0ecf4","9ebcda","8856a7"],4:["edf8fb","b3cde3","8c96c6","88419d"],5:["edf8fb","b3cde3","8c96c6","8856a7","810f7c"],6:["edf8fb","bfd3e6","9ebcda","8c96c6","8856a7","810f7c"],7:["edf8fb","bfd3e6","9ebcda","8c96c6","8c6bb1","88419d","6e016b"],8:["f7fcfd","e0ecf4","bfd3e6","9ebcda","8c96c6","8c6bb1","88419d","6e016b"],9:["f7fcfd","e0ecf4","bfd3e6","9ebcda","8c96c6","8c6bb1","88419d","810f7c","4d004b"]},
  RdPu:{3:["fde0dd","fa9fb5","c51b8a"],4:["feebe2","fbb4b9","f768a1","ae017e"],5:["feebe2","fbb4b9","f768a1","c51b8a","7a0177"],6:["feebe2","fcc5c0","fa9fb5","f768a1","c51b8a","7a0177"],7:["feebe2","fcc5c0","fa9fb5","f768a1","dd3497","ae017e","7a0177"],8:["fff7f3","fde0dd","fcc5c0","fa9fb5","f768a1","dd3497","ae017e","7a0177"],9:["fff7f3","fde0dd","fcc5c0","fa9fb5","f768a1","dd3497","ae017e","7a0177","49006a"]},
  PuRd:{3:["e7e1ef","c994c7","dd1c77"],4:["f1eef6","d7b5d8","df65b0","ce1256"],5:["f1eef6","d7b5d8","df65b0","dd1c77","980043"],6:["f1eef6","d4b9da","c994c7","df65b0","dd1c77","980043"],7:["f1eef6","d4b9da","c994c7","df65b0","e7298a","ce1256","91003f"],8:["f7f4f9","e7e1ef","d4b9da","c994c7","df65b0","e7298a","ce1256","91003f"],9:["f7f4f9","e7e1ef","d4b9da","c994c7","df65b0","e7298a","ce1256","980043","67001f"]},
  OrRd:{3:["fee8c8","fdbb84","e34a33"],4:["fef0d9","fdcc8a","fc8d59","d7301f"],5:["fef0d9","fdcc8a","fc8d59","e34a33","b30000"],6:["fef0d9","fdd49e","fdbb84","fc8d59","e34a33","b30000"],7:["fef0d9","fdd49e","fdbb84","fc8d59","ef6548","d7301f","990000"],8:["fff7ec","fee8c8","fdd49e","fdbb84","fc8d59","ef6548","d7301f","990000"],9:["fff7ec","fee8c8","fdd49e","fdbb84","fc8d59","ef6548","d7301f","b30000","7f0000"]},
  YlOrRd:{3:["ffeda0","feb24c","f03b20"],4:["ffffb2","fecc5c","fd8d3c","e31a1c"],5:["ffffb2","fecc5c","fd8d3c","f03b20","bd0026"],6:["ffffb2","fed976","feb24c","fd8d3c","f03b20","bd0026"],7:["ffffb2","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","b10026"],8:["ffffcc","ffeda0","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","b10026"],9:["ffffcc","ffeda0","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","bd0026","800026"]},
  YlOrBr:{3:["fff7bc","fec44f","d95f0e"],4:["ffffd4","fed98e","fe9929","cc4c02"],5:["ffffd4","fed98e","fe9929","d95f0e","993404"],6:["ffffd4","fee391","fec44f","fe9929","d95f0e","993404"],7:["ffffd4","fee391","fec44f","fe9929","ec7014","cc4c02","8c2d04"],8:["ffffe5","fff7bc","fee391","fec44f","fe9929","ec7014","cc4c02","8c2d04"],9:["ffffe5","fff7bc","fee391","fec44f","fe9929","ec7014","cc4c02","993404","662506"]},
  Purples:{3:["efedf5","bcbddc","756bb1"],4:["f2f0f7","cbc9e2","9e9ac8","6a51a3"],5:["f2f0f7","cbc9e2","9e9ac8","756bb1","54278f"],6:["f2f0f7","dadaeb","bcbddc","9e9ac8","756bb1","54278f"],7:["f2f0f7","dadaeb","bcbddc","9e9ac8","807dba","6a51a3","4a1486"],8:["fcfbfd","efedf5","dadaeb","bcbddc","9e9ac8","807dba","6a51a3","4a1486"],9:["fcfbfd","efedf5","dadaeb","bcbddc","9e9ac8","807dba","6a51a3","54278f","3f007d"]},
  Blues:{3:["deebf7","9ecae1","3182bd"],4:["eff3ff","bdd7e7","6baed6","2171b5"],5:["eff3ff","bdd7e7","6baed6","3182bd","08519c"],6:["eff3ff","c6dbef","9ecae1","6baed6","3182bd","08519c"],7:["eff3ff","c6dbef","9ecae1","6baed6","4292c6","2171b5","084594"],8:["f7fbff","deebf7","c6dbef","9ecae1","6baed6","4292c6","2171b5","084594"],9:["f7fbff","deebf7","c6dbef","9ecae1","6baed6","4292c6","2171b5","08519c","08306b"]},
  Greens:{3:["e5f5e0","a1d99b","31a354"],4:["edf8e9","bae4b3","74c476","238b45"],5:["edf8e9","bae4b3","74c476","31a354","006d2c"],6:["edf8e9","c7e9c0","a1d99b","74c476","31a354","006d2c"],7:["edf8e9","c7e9c0","a1d99b","74c476","41ab5d","238b45","005a32"],8:["f7fcf5","e5f5e0","c7e9c0","a1d99b","74c476","41ab5d","238b45","005a32"],9:["f7fcf5","e5f5e0","c7e9c0","a1d99b","74c476","41ab5d","238b45","006d2c","00441b"]},
  Oranges:{3:["fee6ce","fdae6b","e6550d"],4:["feedde","fdbe85","fd8d3c","d94701"],5:["feedde","fdbe85","fd8d3c","e6550d","a63603"],6:["feedde","fdd0a2","fdae6b","fd8d3c","e6550d","a63603"],7:["feedde","fdd0a2","fdae6b","fd8d3c","f16913","d94801","8c2d04"],8:["fff5eb","fee6ce","fdd0a2","fdae6b","fd8d3c","f16913","d94801","8c2d04"],9:["fff5eb","fee6ce","fdd0a2","fdae6b","fd8d3c","f16913","d94801","a63603","7f2704"]},
  Reds:{3:["fee0d2","fc9272","de2d26"],4:["fee5d9","fcae91","fb6a4a","cb181d"],5:["fee5d9","fcae91","fb6a4a","de2d26","a50f15"],6:["fee5d9","fcbba1","fc9272","fb6a4a","de2d26","a50f15"],7:["fee5d9","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","99000d"],8:["fff5f0","fee0d2","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","99000d"],9:["fff5f0","fee0d2","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","a50f15","67000d"]},
  Greys:{3:["f0f0f0","bdbdbd","636363"],4:["f7f7f7","cccccc","969696","525252"],5:["f7f7f7","cccccc","969696","636363","252525"],6:["f7f7f7","d9d9d9","bdbdbd","969696","636363","252525"],7:["f7f7f7","d9d9d9","bdbdbd","969696","737373","525252","252525"],8:["ffffff","f0f0f0","d9d9d9","bdbdbd","969696","737373","525252","252525"],9:["ffffff","f0f0f0","d9d9d9","bdbdbd","969696","737373","525252","252525","000000"]},
  PuOr:{3:["f1a340","f7f7f7","998ec3"],4:["e66101","fdb863","b2abd2","5e3c99"],5:["e66101","fdb863","f7f7f7","b2abd2","5e3c99"],6:["b35806","f1a340","fee0b6","d8daeb","998ec3","542788"],7:["b35806","f1a340","fee0b6","f7f7f7","d8daeb","998ec3","542788"],8:["b35806","e08214","fdb863","fee0b6","d8daeb","b2abd2","8073ac","542788"],9:["b35806","e08214","fdb863","fee0b6","f7f7f7","d8daeb","b2abd2","8073ac","542788"],10:["7f3b08","b35806","e08214","fdb863","fee0b6","d8daeb","b2abd2","8073ac","542788","2d004b"],11:["7f3b08","b35806","e08214","fdb863","fee0b6","f7f7f7","d8daeb","b2abd2","8073ac","542788","2d004b"]},
  BrBG:{3:["d8b365","f5f5f5","5ab4ac"],4:["a6611a","dfc27d","80cdc1","018571"],5:["a6611a","dfc27d","f5f5f5","80cdc1","018571"],6:["8c510a","d8b365","f6e8c3","c7eae5","5ab4ac","01665e"],7:["8c510a","d8b365","f6e8c3","f5f5f5","c7eae5","5ab4ac","01665e"],8:["8c510a","bf812d","dfc27d","f6e8c3","c7eae5","80cdc1","35978f","01665e"],9:["8c510a","bf812d","dfc27d","f6e8c3","f5f5f5","c7eae5","80cdc1","35978f","01665e"],10:["543005","8c510a","bf812d","dfc27d","f6e8c3","c7eae5","80cdc1","35978f","01665e","003c30"],11:["543005","8c510a","bf812d","dfc27d","f6e8c3","f5f5f5","c7eae5","80cdc1","35978f","01665e","003c30"]},
  PRGn:{3:["af8dc3","f7f7f7","7fbf7b"],4:["7b3294","c2a5cf","a6dba0","008837"],5:["7b3294","c2a5cf","f7f7f7","a6dba0","008837"],6:["762a83","af8dc3","e7d4e8","d9f0d3","7fbf7b","1b7837"],7:["762a83","af8dc3","e7d4e8","f7f7f7","d9f0d3","7fbf7b","1b7837"],8:["762a83","9970ab","c2a5cf","e7d4e8","d9f0d3","a6dba0","5aae61","1b7837"],9:["762a83","9970ab","c2a5cf","e7d4e8","f7f7f7","d9f0d3","a6dba0","5aae61","1b7837"],10:["40004b","762a83","9970ab","c2a5cf","e7d4e8","d9f0d3","a6dba0","5aae61","1b7837","00441b"],11:["40004b","762a83","9970ab","c2a5cf","e7d4e8","f7f7f7","d9f0d3","a6dba0","5aae61","1b7837","00441b"]},
  PiYG:{3:["e9a3c9","f7f7f7","a1d76a"],4:["d01c8b","f1b6da","b8e186","4dac26"],5:["d01c8b","f1b6da","f7f7f7","b8e186","4dac26"],6:["c51b7d","e9a3c9","fde0ef","e6f5d0","a1d76a","4d9221"],7:["c51b7d","e9a3c9","fde0ef","f7f7f7","e6f5d0","a1d76a","4d9221"],8:["c51b7d","de77ae","f1b6da","fde0ef","e6f5d0","b8e186","7fbc41","4d9221"],9:["c51b7d","de77ae","f1b6da","fde0ef","f7f7f7","e6f5d0","b8e186","7fbc41","4d9221"],10:["8e0152","c51b7d","de77ae","f1b6da","fde0ef","e6f5d0","b8e186","7fbc41","4d9221","276419"],11:["8e0152","c51b7d","de77ae","f1b6da","fde0ef","f7f7f7","e6f5d0","b8e186","7fbc41","4d9221","276419"]},
  RdBu:{3:["ef8a62","f7f7f7","67a9cf"],4:["ca0020","f4a582","92c5de","0571b0"],5:["ca0020","f4a582","f7f7f7","92c5de","0571b0"],6:["b2182b","ef8a62","fddbc7","d1e5f0","67a9cf","2166ac"],7:["b2182b","ef8a62","fddbc7","f7f7f7","d1e5f0","67a9cf","2166ac"],8:["b2182b","d6604d","f4a582","fddbc7","d1e5f0","92c5de","4393c3","2166ac"],9:["b2182b","d6604d","f4a582","fddbc7","f7f7f7","d1e5f0","92c5de","4393c3","2166ac"],10:["67001f","b2182b","d6604d","f4a582","fddbc7","d1e5f0","92c5de","4393c3","2166ac","053061"],11:["67001f","b2182b","d6604d","f4a582","fddbc7","f7f7f7","d1e5f0","92c5de","4393c3","2166ac","053061"]},
  RdGy:{3:["ef8a62","ffffff","999999"],4:["ca0020","f4a582","bababa","404040"],5:["ca0020","f4a582","ffffff","bababa","404040"],6:["b2182b","ef8a62","fddbc7","e0e0e0","999999","4d4d4d"],7:["b2182b","ef8a62","fddbc7","ffffff","e0e0e0","999999","4d4d4d"],8:["b2182b","d6604d","f4a582","fddbc7","e0e0e0","bababa","878787","4d4d4d"],9:["b2182b","d6604d","f4a582","fddbc7","ffffff","e0e0e0","bababa","878787","4d4d4d"],10:["67001f","b2182b","d6604d","f4a582","fddbc7","e0e0e0","bababa","878787","4d4d4d","1a1a1a"],11:["67001f","b2182b","d6604d","f4a582","fddbc7","ffffff","e0e0e0","bababa","878787","4d4d4d","1a1a1a"]},
  RdYlBu:{3:["fc8d59","ffffbf","91bfdb"],4:["d7191c","fdae61","abd9e9","2c7bb6"],5:["d7191c","fdae61","ffffbf","abd9e9","2c7bb6"],6:["d73027","fc8d59","fee090","e0f3f8","91bfdb","4575b4"],7:["d73027","fc8d59","fee090","ffffbf","e0f3f8","91bfdb","4575b4"],8:["d73027","f46d43","fdae61","fee090","e0f3f8","abd9e9","74add1","4575b4"],9:["d73027","f46d43","fdae61","fee090","ffffbf","e0f3f8","abd9e9","74add1","4575b4"],10:["a50026","d73027","f46d43","fdae61","fee090","e0f3f8","abd9e9","74add1","4575b4","313695"],11:["a50026","d73027","f46d43","fdae61","fee090","ffffbf","e0f3f8","abd9e9","74add1","4575b4","313695"]},
  Spectral:{3:["fc8d59","ffffbf","99d594"],4:["d7191c","fdae61","abdda4","2b83ba"],5:["d7191c","fdae61","ffffbf","abdda4","2b83ba"],6:["d53e4f","fc8d59","fee08b","e6f598","99d594","3288bd"],7:["d53e4f","fc8d59","fee08b","ffffbf","e6f598","99d594","3288bd"],8:["d53e4f","f46d43","fdae61","fee08b","e6f598","abdda4","66c2a5","3288bd"],9:["d53e4f","f46d43","fdae61","fee08b","ffffbf","e6f598","abdda4","66c2a5","3288bd"],10:["9e0142","d53e4f","f46d43","fdae61","fee08b","e6f598","abdda4","66c2a5","3288bd","5e4fa2"],11:["9e0142","d53e4f","f46d43","fdae61","fee08b","ffffbf","e6f598","abdda4","66c2a5","3288bd","5e4fa2"]},
  RdYlGn:{3:["fc8d59","ffffbf","91cf60"],4:["d7191c","fdae61","a6d96a","1a9641"],5:["d7191c","fdae61","ffffbf","a6d96a","1a9641"],6:["d73027","fc8d59","fee08b","d9ef8b","91cf60","1a9850"],7:["d73027","fc8d59","fee08b","ffffbf","d9ef8b","91cf60","1a9850"],8:["d73027","f46d43","fdae61","fee08b","d9ef8b","a6d96a","66bd63","1a9850"],9:["d73027","f46d43","fdae61","fee08b","ffffbf","d9ef8b","a6d96a","66bd63","1a9850"],10:["a50026","d73027","f46d43","fdae61","fee08b","d9ef8b","a6d96a","66bd63","1a9850","006837"],11:["a50026","d73027","f46d43","fdae61","fee08b","ffffbf","d9ef8b","a6d96a","66bd63","1a9850","006837"]},
  Accent:{3:["7fc97f","beaed4","fdc086"],4:["7fc97f","beaed4","fdc086","ffff99"],5:["7fc97f","beaed4","fdc086","ffff99","386cb0"],6:["7fc97f","beaed4","fdc086","ffff99","386cb0","f0027f"],7:["7fc97f","beaed4","fdc086","ffff99","386cb0","f0027f","bf5b17"],8:["7fc97f","beaed4","fdc086","ffff99","386cb0","f0027f","bf5b17","666666"]},
  Dark2:{3:["1b9e77","d95f02","7570b3"],4:["1b9e77","d95f02","7570b3","e7298a"],5:["1b9e77","d95f02","7570b3","e7298a","66a61e"],6:["1b9e77","d95f02","7570b3","e7298a","66a61e","e6ab02"],7:["1b9e77","d95f02","7570b3","e7298a","66a61e","e6ab02","a6761d"],8:["1b9e77","d95f02","7570b3","e7298a","66a61e","e6ab02","a6761d","666666"]},
  Pastel1:{3:["fbb4ae","b3cde3","ccebc5"],4:["fbb4ae","b3cde3","ccebc5","decbe4"],5:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6"],6:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6","ffffcc"],7:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6","ffffcc","e5d8bd"],8:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6","ffffcc","e5d8bd","fddaec"],9:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6","ffffcc","e5d8bd","fddaec","f2f2f2"]},
  Pastel2:{3:["b3e2cd","fdcdac","cbd5e8"],4:["b3e2cd","fdcdac","cbd5e8","f4cae4"],5:["b3e2cd","fdcdac","cbd5e8","f4cae4","e6f5c9"],6:["b3e2cd","fdcdac","cbd5e8","f4cae4","e6f5c9","fff2ae"],7:["b3e2cd","fdcdac","cbd5e8","f4cae4","e6f5c9","fff2ae","f1e2cc"],8:["b3e2cd","fdcdac","cbd5e8","f4cae4","e6f5c9","fff2ae","f1e2cc","cccccc"]},
  Paired:{3:["a6cee3","1f78b4","b2df8a"],4:["a6cee3","1f78b4","b2df8a","33a02c"],5:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99"],6:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c"],7:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f"],8:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00"],9:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00","cab2d6"],10:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00","cab2d6","6a3d9a"],11:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00","cab2d6","6a3d9a","ffff99"],12:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00","cab2d6","6a3d9a","ffff99","b15928"]},
  Set1:{3:["e41a1c","377eb8","4daf4a"],4:["e41a1c","377eb8","4daf4a","984ea3"],5:["e41a1c","377eb8","4daf4a","984ea3","ff7f00"],6:["e41a1c","377eb8","4daf4a","984ea3","ff7f00","ffff33"],7:["e41a1c","377eb8","4daf4a","984ea3","ff7f00","ffff33","a65628"],8:["e41a1c","377eb8","4daf4a","984ea3","ff7f00","ffff33","a65628","f781bf"],9:["e41a1c","377eb8","4daf4a","984ea3","ff7f00","ffff33","a65628","f781bf","999999"]},
  Set2:{3:["66c2a5","fc8d62","8da0cb"],4:["66c2a5","fc8d62","8da0cb","e78ac3"],5:["66c2a5","fc8d62","8da0cb","e78ac3","a6d854"],6:["66c2a5","fc8d62","8da0cb","e78ac3","a6d854","ffd92f"],7:["66c2a5","fc8d62","8da0cb","e78ac3","a6d854","ffd92f","e5c494"],8:["66c2a5","fc8d62","8da0cb","e78ac3","a6d854","ffd92f","e5c494","b3b3b3"]},
  Set3:{3:["8dd3c7","ffffb3","bebada"],4:["8dd3c7","ffffb3","bebada","fb8072"],5:["8dd3c7","ffffb3","bebada","fb8072","80b1d3"],6:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462"],7:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69"],8:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5"],9:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5","d9d9d9"],10:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5","d9d9d9","bc80bd"],11:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5","d9d9d9","bc80bd","ccebc5"],12:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5","d9d9d9","bc80bd","ccebc5","ffed6f"]},
}
// boundary of the field trip
var Boundary=boundary.filter(ee.Filter.eq('country_na','Thailand'));
Boundary=ee.Feature(Boundary.first());
var startYear = 1900;
var endYear = 2018;
var metadataCloudCoverMax = 100;
var cloudThresh = 30;
var dilatePixels = 2;
var cloudHeights = ee.List.sequence(200,5000,500);
var zScoreThresh = -0.8;
var shadowSumThresh = 0.35;
//----------- 1. Land cover------------
//GlobCover_2009//////////////
// var GlobCover_2009_SEA=GlobCover2009.select('landcover').clip(Boundary);
// Map.addLayer(GlobCover_2009_SEA,{},'GlobCover_2009_SEA')
// Mekong land cover
var classStruct = 
{ '0_Other': {number: 0, color: '6f6f6f'},
  '1_Surface Water': {number: 1, color: 'aec3d4'},
  '2_Snow and Ice': {number: 2, color: 'b1f9ff'},
  '3_Mangrove': {number: 3, color: '111149'},
  '4_Flooded forest': {number: 4, color: '287463'},
  '5_Deciduous forest': {number: 5, color: '152106'},
  '6_Orchard or Plantation forest': {number: 6, color: 'c3aa69'},
  '7_Evergreen broadleaf alpine': {number: 7, color: '9ad2a5'},
  '8_Evergreen broadleaf': {number: 8, color: '7db087'},
  '9_Evergreen needleleaf': {number: 9, color: '486f50'},
  '10_Evergreen mixed forest': {number: 10, color: '387242'},
  '11_Mixed evergreen and deciduous': {number: 11, color: '115420'},
  '12_Urban and Built up': {number: 12, color: 'cc0013'},
  '13_Cropland': {number: 13, color: '8dc33b'},
  '14_Rice paddy': {number: 14, color: 'ffff00'},
  '15_Mudflat and intertidal': {number: 15, color: 'a1843b'},
  '16_Mining': {number: 16, color: 'cec2a5'},
  '17_Barren': {number: 17, color: '674c06'},
  '18_Wetlands': {number: 18, color: '3bc3b2'},
  '19_Grassland': {number: 19, color: 'f4a460'},
  '20_Shrubland': {number: 20, color: '800080'},
};
var MekongLC_Thailand = ee.ImageCollection("projects/servir-mekong/Assemblage/RegionalLC")
          // .filterDate('2016-01-01','2016-12-31')
          .map(function(img){
              return img.clip(Boundary); 
          });
// Get list of class names, probability layer names, and palette colors
var classNamesList = getIds(classStruct);
var PALETTE_list = getList(classStruct,'color');
var PALETTE = PALETTE_list.join(',');
// Map.addLayer(MekongLC_Thailand, {palette:PALETTE,min:0,max:classNamesList.length-1}, 'Mekong classification');
//-----------2. DEM-------------
var exaggregate = 5
var weight = 1.5
var azimuth = 90
var zenith = 45
var myMin=0;
var myMax=1400;
var inputDEM=dem.clip(Boundary);
// Map.addLayer(inputDEM,{min:myMin,max:myMax,palette:['blue','green','red']},'Thailand DEM',false);
// Paired--DEM showed style
var styled = dem.visualize({ min: myMin, max: myMax, palette: Palettes.Paired[12] })
var hillshaded = hillshadeit(styled, inputDEM, weight, exaggregate, azimuth, zenith)
// Map.addLayer(hillshaded, {}, 'Paired, hillshaded')
//---------3. Validation data-------------
var Val_Thailand=ValidatonPoint.filter(ee.Filter.bounds(Boundary.geometry()));
//--------4. Landsat reflectance data--------------
var scalefactor=10000;
// if(startJulian > endJulian){endJulian = endJulian + 365}
var startDate = ee.Date.fromYMD(startYear,1,1);
var endDate = ee.Date.fromYMD(endYear,12,31);
print('Start and end dates:',startDate,endDate);
// Sep.1 -->Sep. 30 (Regular years:244-->273, Leap years:245-->274)
var startJulian = 244;
var endJulian = 274;
// STEP 2: Get Landsat 4,5,8,7 Image Collections
var lsRefl = getImageCollection(Boundary,startDate,endDate,startJulian,endJulian);
// print(lsRefl.first())
var lsRefl=lsRefl.map(function(img){
  return img.divide(scalefactor)
            .set('system:time_start',img.get('system:time_start'));
})
// print(lsRefl.first())
// STEP 3: Compute a cloud score and mask clouds
lsRefl = lsRefl.map(landsatCloudScore);
// Find and mask out dark outliers
lsRefl = simpleTDOM2(lsRefl,zScoreThresh,shadowSumThresh,dilatePixels);
// STEP 4: Add additional bands
// Add common spectral indices
lsRefl = lsRefl.map(addIndices);
print(lsRefl.first())
// Add tasseled cap transformation, tasseled cap angles, and NDSV
var tcInputBands = ee.List(['blue','green','red','nir','swir1','swir2']);
lsRefl = lsRefl.map(function(img){
  img = getTasseledCap(img,tcInputBands);
  img = addTCAngles(img);
  return img;
});
// print(lsRefl.first())
// Map.addLayer(lsRefl)
// Center the region of interest.
var center = {lon: 99.78, lat: 14.791, zoom: 7};
// Create two maps.
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
rightMap.setControlVisibility({mapTypeControl: true});
rightMap.setControlVisibility({layerList : true});
rightMap.setOptions('satellite');
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Create a dictionary of labels and visualizations.
var vis = {
  'DEM hillshade': {},
  'GlobCover_2009_SEA': {},
  'MekongLC_Thailand': {palette:PALETTE,min:0,max:classNamesList.length-1}
};
// show the map with split window
// left window
// 1. MekongLC_Thailand
leftMap.addLayer(MekongLC_Thailand, {palette:PALETTE,min:0,max:classNamesList.length-1}, 'Mekong classification');
leftMap.addLayer(Val_Thailand,{},'Validation data',false);
leftMap.addLayer(river,{color: '0000FF'}, 'river');
leftMap.addLayer(lake.draw({color: '000066', strokeWidth: 1}), {}, 'lake');
leftMap.addLayer(Route.draw({color: '000000', strokeWidth: 2}), {}, 'Route');
leftMap.addLayer(SamplePoint.draw({color: 'aa0000', strokeWidth: 4}), {}, 'SamplePoint');
leftMap.addLayer(Day5_stopPoint.draw({color: '124d23', strokeWidth: 5}), {}, 'Day5 stopPoint',false);
leftMap.addLayer(Accommodation.draw({color: '1fcc07', strokeWidth: 4}), {}, 'Accommodation');
///////////////////////////////////////////////////////////////////////////////
// ADD LEGEND
///////////////////////////////////////////////////////////////////////////////
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '3px 3px'
  }
});
// // Create and add the legend title.
// var legendTitle = ui.Label({
//   value: 'Legend',
//   style: {
//     fontWeight: 'bold',
//     fontSize: '12px',
//     margin: '0 0 4px 0',
//     padding: '0'
//   }
// });
// legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // fontWeight: 'bold',
      fontSize: '8px',
      // Use padding to give the box height and width.
      padding: '5px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {
      margin: '0 0 4px 5px',
      // fontWeight: 'bold',
      fontSize: '8px'
    }
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < classNamesList.length; i++){
  legend.add(makeRow(PALETTE_list[i],classNamesList[i]));
}
// Add the legend to the map.
leftMap.add(legend);
// Create and style widgets.
var intro = ui.Panel([
  ui.Label({
    value: 'Land cover& Landsat NDVI/EVI/NDWI Inspector',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Click a point on the map to inspect Land cover& NDVI/EVI/NDWI over time.',
    style: {fontSize: '12px'}
  })
]);
var lon = ui.Label();
var lat = ui.Label();
var elevationLabel = ui.Label();
// Add the widgets to a new panel.
var myPanel = ui.Panel({style: {width: '240px'}});
myPanel.add(intro);
myPanel.add(lon);
myPanel.add(lat);
myPanel.add(elevationLabel);
// Add the new panel to the root panel.
ui.root.insert(0, myPanel);
// callback functions for each side of the map on click
leftMap.onClick(function(coords) {
  myPanel.clear();
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);
  // Add a red point to the map wherever the user clicks.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Add elevation to the  wherever the user clicks.
  var elevation = inputDEM.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30
  }).get('elevation');   
  myPanel.add(lon);
  myPanel.add(lat);
  // elevationLabel.setValue('hh: ' + 'pp');
  // myPanel.add(elevationLabel);
  elevation.evaluate(showElevation);
  // myPanel.add(elevationLabel);
  var dot = ui.Map.Layer(point, {color: 'pink'},'SelectedPoint');
  leftMap.layers().set(1, dot);  
  // rightMap.layers().set(1, dot); 
  // Add an land cover chart.
  var chart = ui.Chart.image.series({
    imageCollection: MekongLC_Thailand.select('Mode'), 
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart.setOptions({
    title: 'Mekong LC',
    vAxis: {title: 'Land cover'},
    hAxis: {title: 'year', format: 'yyyy', gridlines: {count: 16}},
    interpolateNulls: true
  });
  myPanel.widgets().set(3, chart);
  // Add an Landsat NDVI chart.
  var chart1 = ui.Chart.image.series({
    imageCollection: lsRefl.select(['NDVI','EVI','NDWI']), 
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart1.setOptions({
    title: 'Landsat VI (Sep.)',
    vAxis: {title: 'VI'},
    // hAxis: {title: 'year', format: 'yyyy', gridlines: {count: 16}},
    interpolateNulls: true
  });
  myPanel.widgets().set(5, chart1);   
});
// right window
rightMap.addLayer(hillshaded, vis[0],'DEM');
// rightMap.addLayer(inputDEM,{min:myMin,max:myMax,palette:['blue','green','red']},'Thailand DEM',false);
rightMap.addLayer(Val_Thailand,{},'Validation data',false);
// map.addLayer(POI,{color: 'FF0000'}, 'node');
// map.addLayer(POI_lines,{color: 'FF0000'}, 'node collection');
rightMap.addLayer(river,{color: '0000FF'}, 'river');
rightMap.addLayer(lake.draw({color: '000066', strokeWidth: 1}), {}, 'lake');
rightMap.addLayer(Route.draw({color: '000000', strokeWidth: 2}), {}, 'Route');
rightMap.addLayer(SamplePoint.draw({color: 'aa0000', strokeWidth: 4}), {}, 'SamplePoint');
rightMap.addLayer(Day5_stopPoint.draw({color: '124d23', strokeWidth: 5}), {}, 'Day5 stopPoint',false);
rightMap.addLayer(Accommodation.draw({color: '1fcc07', strokeWidth: 4}), {}, 'Accommodation');
rightMap.onClick(function(coords) {
  myPanel.clear();
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);
  // Add a red point to the map wherever the user clicks.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Add elevation to the map wherever the user clicks.
  var elevation = inputDEM.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30
  }).get('elevation');   
  myPanel.add(lon);
  myPanel.add(lat);
  // elevationLabel.setValue('hh: ' + 'pp');
  // myPanel.add(elevationLabel);
  elevation.evaluate(showElevation);
  // myPanel.add(elevationLabel);
  var dot = ui.Map.Layer(point, {color: 'pink'},'SelectedPoint');
  // leftMap.layers().set(1, dot);  
  rightMap.layers().set(1, dot); 
  // Add an land cover chart.
  var chart = ui.Chart.image.series({
    imageCollection: MekongLC_Thailand.select('Mode'), 
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart.setOptions({
    title: 'Mekong LC',
    vAxis: {title: 'Land cover'},
    hAxis: {title: 'year', format: 'yyyy', gridlines: {count: 16}},
    interpolateNulls: true
  });
  myPanel.widgets().set(4, chart);
  // Add an Landsat NDVI chart.
  var chart1 = ui.Chart.image.series({
    imageCollection: lsRefl.select(['NDVI','EVI','NDWI']), 
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart1.setOptions({
    title: 'Landsat VI (Sep.)',
    vAxis: {title: 'VI'},
    // hAxis: {title: 'year', format: 'yyyy', gridlines: {count: 16}},
    interpolateNulls: true
  });
  myPanel.widgets().set(5, chart1);  
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
ui.root.add(myPanel)
// ui.root.add(panel)
// Set crosshair cursor for clicking on Map
leftMap.style().set("cursor","crosshair");
rightMap.style().set("cursor","crosshair");
////////////////////////////////////////////////////////////
function showElevation(elevation) {
  // inspector.clear();
  var elevationLabel = ui.Label('Elevation (m): ' + elevation);
  myPanel.add(elevationLabel);
}
///////////////////////////////////////////////////////////////////////////////
// Function to get a list of column values from a structure
function getList(struct,column){
  return Object.keys(struct).map(function(k){
    var value = struct[k][column];
    return value;
  });
}
///////////////////////////////////////////////////////////////////////////////
// Function to get a list of ids (keys) from a structure
function getIds(struct){
  return Object.keys(struct);
}
/***
 * Computes hillshade
 */
function hillshade(az, ze, slope, aspect) {
  var azimuth = radians(ee.Image.constant(az));
  var zenith = radians(ee.Image.constant(ze));
  return azimuth.subtract(aspect).cos().multiply(slope.sin()).multiply(zenith.sin())
      .add(zenith.cos().multiply(slope.cos()));
}
/***
 * Styles RGB image using hillshading, mixes RGB and hillshade using HSV<->RGB transform
 */
function hillshadeit(image, elevation, weight, height_multiplier, azimuth, zenith, castShadows) {
  var hsv = image.unitScale(0, 255).rgbToHsv();
  var z = elevation.multiply(ee.Image.constant(height_multiplier))
  var terrain = ee.Algorithms.Terrain(z)
  var slope = radians(terrain.select(['slope']));
  var aspect = radians(terrain.select(['aspect'])).resample('bicubic');
  var hs = hillshade(azimuth, zenith, slope, aspect).resample('bicubic');
  if(castShadows) {
    var hysteresis = true
    var neighborhoodSize = 100
    var hillShadow = ee.Algorithms.HillShadow(z, azimuth, zenith, neighborhoodSize, hysteresis).float().not()
    // opening
    // hillShadow = hillShadow.multiply(hillShadow.focal_min(3).focal_max(6))    
    // cleaning
    hillShadow = hillShadow.focal_mode(3)
    // smoothing  
    hillShadow = hillShadow.convolve(ee.Kernel.gaussian(5, 3))
    // transparent
    hillShadow = hillShadow.multiply(0.4)
    hs = ee.ImageCollection.fromImages([
      hs.rename('shadow'), 
      hillShadow.mask(hillShadow).rename('shadow')
    ]).mosaic()
  }
  var intensity = hs.multiply(ee.Image.constant(weight)).multiply(hsv.select('value'));
  var huesat = hsv.select('hue', 'saturation');
  return ee.Image.cat(huesat, intensity).hsvToRgb();
}
/*** 
 * Convet image from degrees to radians
 */
function radians(img) { return img.toFloat().multiply(3.1415927).divide(180); }
/////////////////////////////////////////////////////////
//Function for acquiring Landsat  image collection
function getImageCollection(studyArea,startDate,endDate,startJulian,endJulian){
  var ls;var l4s;var l5s;var l7s;var l8s;var out;
  studyArea=studyArea.geometry();
  var sensorBandDictLandsat =ee.Dictionary({L8 : ee.List([1,2,3,4,5,9,6]),
                        L7 : ee.List([0,1,2,3,4,5,7]),
                        L5 : ee.List([0,1,2,3,4,5,6]),
                        L4 : ee.List([0,1,2,3,4,5,6])
  });
  var bandNamesLandsat = ee.List(['blue','green','red','nir','swir1','temp',
      'swir2']);
  l4s = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterDate(startDate,endDate)
      .filter(ee.Filter.calendarRange(startJulian,endJulian))
      .filterBounds(studyArea)
      .filterMetadata('CLOUD_COVER','less_than',metadataCloudCoverMax)
      .select(sensorBandDictLandsat.get('L4'),bandNamesLandsat);
  l5s = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterDate(startDate,endDate)
      .filter(ee.Filter.calendarRange(startJulian,endJulian))
      .filterBounds(studyArea)
      .filterMetadata('CLOUD_COVER','less_than',metadataCloudCoverMax)
      .select(sensorBandDictLandsat.get('L5'),bandNamesLandsat);
  l8s = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate(startDate,endDate)
      .filter(ee.Filter.calendarRange(startJulian,endJulian))
      .filterBounds(studyArea)
      .filterMetadata('CLOUD_COVER','less_than',metadataCloudCoverMax)
      .select(sensorBandDictLandsat.get('L8'),bandNamesLandsat);
  l7s = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterDate(startDate,endDate)
      .filter(ee.Filter.calendarRange(startJulian,endJulian))
      .filterBounds(studyArea)
      .filterMetadata('CLOUD_COVER','less_than',metadataCloudCoverMax)
      .select(sensorBandDictLandsat.get('L7'),bandNamesLandsat);
  ls = ee.ImageCollection(l4s.merge(l5s).merge(l7s).merge(l8s));
  out = ls;
  return out;
}
///////////////////////////////////////////////////////////////////////////////
// Compute a cloud score and adds a band that represents the cloud mask.  
// This expects the input image to have the common band names: 
// ["red", "blue", etc], so it can work across sensors.
function landsatCloudScore(img) {
  // Compute several indicators of cloudiness and take the minimum of them.
  var score = ee.Image(1.0);
  // Clouds are reasonably bright in the blue band.
  score = score.min(rescale(img, 'img.blue', [0.1, 0.3]));
  // Clouds are reasonably bright in all visible bands.
  score = score.min(rescale(img, 'img.red + img.green + img.blue', [0.2, 0.8]));
  // Clouds are reasonably bright in all infrared bands.
  score = score.min(
      rescale(img, 'img.nir + img.swir1 + img.swir2', [0.3, 0.8]));
  // Clouds are reasonably cool in temperature.
  score = score.min(rescale(img,'img.temp', [300, 290]));
  // However, clouds are not snow.
  var ndsi = img.normalizedDifference(['green', 'swir1']);
  score =  score.min(rescale(ndsi, 'img', [0.8, 0.6])).multiply(100).byte();
  score = score.lt(cloudThresh).rename('cloudMask');
  img = img.updateMask(score);
  return img.addBands(score);
}
///////////////////////////////////////////////////////////////////////////////
// A helper to apply an expression and linearly rescale the output.
// Used in the landsatCloudScore function below.
function rescale(img, exp, thresholds) {
  return img.expression(exp, {img: img})
      .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
}
///////////////////////////////////////////////////////////////////////////////
//Function for finding dark outliers in time series.
//Original concept written by Carson Stam and adapted by Ian Housman.
//Adds a band that is a mask of pixels that are dark, and dark outliers.
function simpleTDOM2(collection,zScoreThresh,shadowSumThresh,dilatePixels){
  var shadowSumBands = ['nir','swir1'];
  //Get some pixel-wise stats for the time series
  var irStdDev = collection.select(shadowSumBands).reduce(ee.Reducer.stdDev());
  var irMean = collection.select(shadowSumBands).mean();
  //Mask out dark dark outliers
  collection = collection.map(function(img){
    var zScore = img.select(shadowSumBands).subtract(irMean).divide(irStdDev);
    var irSum = img.select(shadowSumBands).reduce(ee.Reducer.sum());
    var TDOMMask = zScore.lt(zScoreThresh).reduce(ee.Reducer.sum()).eq(2)
        .and(irSum.lt(shadowSumThresh)).not();
    TDOMMask = TDOMMask.focal_min(dilatePixels);
    return img.addBands(TDOMMask.rename('TDOMMask'));
  });
  return collection;
}
///////////////////////////////////////////////////////////////////////////////
// Function to add common (and less common) spectral indices to an image.
// Includes the Normalized Difference Spectral Vector from (Angiuli and Trianni, 2014)
function addIndices(img){
  // Add Normalized Difference Spectral Vector (NDSV)
  img = img.addBands(img.normalizedDifference(['blue','green']).rename('ND_blue_green'));
  img = img.addBands(img.normalizedDifference(['blue','red']).rename('ND_blue_red'));
  img = img.addBands(img.normalizedDifference(['blue','nir']).rename('ND_blue_nir'));
  img = img.addBands(img.normalizedDifference(['blue','swir1']).rename('ND_blue_swir1'));
  img = img.addBands(img.normalizedDifference(['blue','swir2']).rename('ND_blue_swir2'));
  img = img.addBands(img.normalizedDifference(['green','red']).rename('ND_green_red'));
  img = img.addBands(img.normalizedDifference(['green','nir']).rename('ND_green_nir')); //NDWBI
  img = img.addBands(img.normalizedDifference(['green','swir1']).rename('ND_green_swir1')); //NDSI, MNDWI
  img = img.addBands(img.normalizedDifference(['green','swir2']).rename('ND_green_swir2'));
  img = img.addBands(img.normalizedDifference(['red','swir1']).rename('ND_red_swir1'));
  img = img.addBands(img.normalizedDifference(['red','swir2']).rename('ND_red_swir2'));
  img = img.addBands(img.normalizedDifference(['nir','red']).rename('NDVI')); //NDVI//ND_nir_red
  img = img.addBands(img.normalizedDifference(['nir','swir1']).rename('NDWI')); //NDWI, LSWI, -NDBI
  img = img.addBands(img.normalizedDifference(['nir','swir2']).rename('ND_nir_swir2')); //NBR, MNDVI
  img = img.addBands(img.normalizedDifference(['swir1','swir2']).rename('ND_swir1_swir2'));
  // Add ratios
  img = img.addBands(img.select('swir1').divide(img.select('nir')).rename('R_swir1_nir')); //ratio 5/4
  img = img.addBands(img.select('red').divide(img.select('swir1')).rename('R_red_swir1')); // ratio 3/5
  // Add Enhanced Vegetation Index (EVI)
  var evi = img.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': img.select('nir'),
      'RED': img.select('red'),
      'BLUE': img.select('blue')
  }).float();
  img = img.addBands(evi.rename('EVI'));
  // Add Soil Adjust Vegetation Index (SAVI)
  // using L = 0.5;
  var savi = img.expression(
    '(NIR - RED) * (1 + 0.5)/(NIR + RED + 0.5)', {
      'NIR': img.select('nir'),
      'RED': img.select('red')
  }).float();
  img = img.addBands(savi.rename('SAVI'));
  // Add Index-Based Built-Up Index (IBI)
  var ibi_a = img.expression(
    '2*SWIR1/(SWIR1 + NIR)', {
      'SWIR1': img.select('swir1'),
      'NIR': img.select('nir')
    }).rename('IBI_A');
  var ibi_b = img.expression(
    '(NIR/(NIR + RED)) + (GREEN/(GREEN + SWIR1))', {
      'NIR': img.select('nir'),
      'RED': img.select('red'),
      'GREEN': img.select('green'),
      'SWIR1': img.select('swir1')
    }).rename('IBI_B');
  ibi_a = ibi_a.addBands(ibi_b);
  var ibi = ibi_a.normalizedDifference(['IBI_A','IBI_B']);
  img = img.addBands(ibi.rename('IBI'));
  return img;
}
///////////////////////////////////////////////////////////////////////////////
// Function to compute the Tasseled Cap transformation and return an image
// with the following bands added: ['brightness', 'greenness', 'wetness', 
// 'fourth', 'fifth', 'sixth']
function getTasseledCap(image,bands) {
  // Kauth-Thomas coefficients for Thematic Mapper data
  var coefficients = ee.Array([
    [0.3037, 0.2793, 0.4743, 0.5585, 0.5082, 0.1863],
    [-0.2848, -0.2435, -0.5436, 0.7243, 0.0840, -0.1800],
    [0.1509, 0.1973, 0.3279, 0.3406, -0.7112, -0.4572],
    [-0.8242, 0.0849, 0.4392, -0.0580, 0.2012, -0.2768],
    [-0.3280, 0.0549, 0.1075, 0.1855, -0.4357, 0.8085],
    [0.1084, -0.9022, 0.4120, 0.0573, -0.0251, 0.0238]
  ]);
  // Make an Array Image, with a 1-D Array per pixel.
  var arrayImage1D = image.select(bands).toArray();
  // Make an Array Image with a 2-D Array per pixel, 6x1.
  var arrayImage2D = arrayImage1D.toArray(1);
  var componentsImage = ee.Image(coefficients)
    .matrixMultiply(arrayImage2D)
    // Get rid of the extra dimensions.
    .arrayProject([0])
    // Get a multi-band image with TC-named bands.
    .arrayFlatten(
      [['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']])
    .float();
  return image.addBands(componentsImage);
}
// Function to add Tasseled Cap angles and distances to an image.
// Assumes image has bands: 'brightness', 'greenness', and 'wetness'.
function addTCAngles(image){
  // Select brightness, greenness, and wetness bands
  var brightness = image.select(['brightness']);
  var greenness = image.select(['greenness']);
  var wetness = image.select(['wetness']);
  // Calculate Tasseled Cap angles and distances
  var tcAngleBG = brightness.atan2(greenness).divide(Math.PI).rename('tcAngleBG');
  var tcAngleGW = greenness.atan2(wetness).divide(Math.PI).rename('tcAngleGW');
  var tcAngleBW = brightness.atan2(wetness).divide(Math.PI).rename('tcAngleBW');
  var tcDistBG = brightness.hypot(greenness).rename('tcDistBG');
  var tcDistGW = greenness.hypot(wetness).rename('tcDistGW');
  var tcDistBW = brightness.hypot(wetness).rename('tcDistBW');
  image = image.addBands(tcAngleBG).addBands(tcAngleGW)
    .addBands(tcAngleBW).addBands(tcDistBG).addBands(tcDistGW)
    .addBands(tcDistBW);
  return image;
}