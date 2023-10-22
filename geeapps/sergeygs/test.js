var DsmDeltaLib = require('users/sergeygs/MASA:DsmDeltaLib');
var st_baseline = DsmDeltaLib.maybeLoadImage('projects/masa/MASA_DSMs/B1-Upper_Brahmaputra_1-ST_Baseline');
var es_experiment = DsmDeltaLib.maybeLoadImage('projects/masa/MASA_DSMs/B1-Upper_Brahmaputra_1-ES_18C');
var st_experiment = DsmDeltaLib.maybeLoadImage('projects/masa/MASA_DSMs/B1-Upper_Brahmaputra_1-ST_18C');
// NOTE: Null images will be automatically skipped by DsmDeltaLib.
var images = {
  'SRTM': DsmDeltaLib.srtm,
  'JAXA': DsmDeltaLib.jaxa,
  'ST Baseline': st_baseline,
  'ES 18C': es_experiment,
  'ST 18C': st_experiment,
};
var layerDefs = [
  {image: 'SRTM', shown: false},
  {image: 'JAXA', shown: false},
  {delta: ['JAXA', 'SRTM'], shown: true},
  {image: 'ES 18C', shown: false},
  {delta: ['ES 18C', 'JAXA'], shown: false},
  {image: 'ST Baseline', shown: false},
  {delta: ['ST Baseline', 'SRTM'], shown: false},
  {delta: ['ST Baseline', 'JAXA'], shown: false},
  {image: 'ST 18C', shown: false},
  {delta: ['ST 18C', 'ES 18C'], shown: false},
  {delta: ['ST 18C', 'Baseline'], shown: false},
  {delta: ['ST 18C', 'SRTM'], shown: true},
  {delta: ['ST 18C', 'JAXA'], shown: true},
];
DsmDeltaLib.renderDsmsAndDeltas(images, layerDefs);