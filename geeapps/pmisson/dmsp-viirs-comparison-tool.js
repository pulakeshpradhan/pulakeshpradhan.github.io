var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"
    }) || ee.ImageCollection("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"),
    table = ui.import && ui.import("table", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"
    }) || ee.ImageCollection("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS");
Map.setOptions('SATELLITE');
var country='world';
//=====================================================================
// Load and Prep Data
//var maineCounties  = 
//    ee.FeatureCollection('ft:1RCHamIKGMkCKMTJ_IPQ2HjXGCBpKxjuXKOZrp71a')//.filter(ee.Filter.eq('NOMBRE', "Centro"));
var  maineCounties = table //ee.FeatureCollection('ft:1-fuX6trVENSAd6bNH5N4so6RsOcMZU8f4_qchoN6');
var image2area = ee.Image.pixelArea();
image2area.reproject(ee.Projection('EPSG:4326'),null, 15000);
//=====================================================================
//Function
var getDmsp = function(name){
  var polynomialDict = {"F101992":"((stable_lights * -9.98567397963434) + (stable_lights**2 * 5.98454805059774) + (stable_lights**3 * -1.25883671682248) + (stable_lights**4 * 0.136574899592354) + (stable_lights**5 * -0.008573434171931) + (stable_lights**6 * 0.000328867203011) + (stable_lights**7 * -7.8203018815189E-06) + (stable_lights**8 * 1.12421330872547E-07) + (stable_lights**9 * -8.94430504800891E-10) + (stable_lights**10 * 3.02210611798067E-12))/0.97460989336952",
                      "F101993":"((stable_lights * -1.64085885913652) + (stable_lights**2 * 1.75492910056753) + (stable_lights**3 * -0.409295635566646) + (stable_lights**4 * 0.04843932395488) + (stable_lights**5 * -0.003268133736688) + (stable_lights**6 * 0.000133287996703) + (stable_lights**7 * -3.34222769174896E-06) + (stable_lights**8 * 5.03388466319856E-08) + (stable_lights**9 * -4.17466331054063E-10) + (stable_lights**10 * 1.46432478402172E-12))/0.927320454476813",
                      "F101994":"((stable_lights * -7.30271215632978) + (stable_lights**2 * 4.46543356201683) + (stable_lights**3 * -0.919736187810403) + (stable_lights**4 * 0.098082545292273) + (stable_lights**5 * -0.006078081658241) + (stable_lights**6 * 0.00023057879952) + (stable_lights**7 * -5.42526091431709E-06) + (stable_lights**8 * 7.71712167148757E-08) + (stable_lights**9 * -6.07520558107802E-10) + (stable_lights**10 * 2.03133477795917E-12))/0.940000060354366",
                      "F121994":"((stable_lights * -4.12859586574652) + (stable_lights**2 * 2.46808588508313) + (stable_lights**3 * -0.499595517237237) + (stable_lights**4 * 0.053060536931286) + (stable_lights**5 * -0.003279033401235) + (stable_lights**6 * 0.000123985937423) + (stable_lights**7 * -2.90765281936357E-06) + (stable_lights**8 * 4.12561032234964E-08) + (stable_lights**9 * -3.24403962288226E-10) + (stable_lights**10 * 1.08517749274789E-12))/1.1051180715569",
                      "F121995":"((stable_lights * -4.91275552039884) + (stable_lights**2 * 2.78137357295938) + (stable_lights**3 * -0.536063419756946) + (stable_lights**4 * 0.054734745353753) + (stable_lights**5 * -0.003290619503077) + (stable_lights**6 * 0.000122142605048) + (stable_lights**7 * -2.82972205440923E-06) + (stable_lights**8 * 3.98347631807097E-08) + (stable_lights**9 * -3.11667939698524E-10) + (stable_lights**10 * 1.03941641586315E-12))/1.11224315318425",
                      "F121996":"((stable_lights * -6.55148505574537) + (stable_lights**2 * 3.80131277958069) + (stable_lights**3 * -0.764446253065776) + (stable_lights**4 * 0.080420684944488) + (stable_lights**5 * -0.004946312711693) + (stable_lights**6 * 0.000187077886185) + (stable_lights**7 * -4.40483465672787E-06) + (stable_lights**8 * 6.29007055701391E-08) + (stable_lights**9 * -4.98457524893916E-10) + (stable_lights**10 * 1.68151492447437E-12))/1.05547311149252",
                      "F121997":"((stable_lights * -1.9452244886047) + (stable_lights**2 * 1.60103262825386) + (stable_lights**3 * -0.33852729292824) +  (stable_lights**4 * 0.036477004788046) + (stable_lights**5 * -0.00227520785445) + (stable_lights**6 * 8.70017900870623E-05) + (stable_lights**7 * -2.07089354677174E-06) + (stable_lights**8 * 2.9924492808555E-08) + (stable_lights**9 * -2.40227524226127E-10) + (stable_lights**10 * 8.21641916817445E-13))/1.08864023894706",
                      "F121998":"((stable_lights * -3.19536080194747) + (stable_lights**2 * 1.72610600481068) + (stable_lights**3 * -0.295624586560838) +  (stable_lights**4 * 0.027647611604364) + (stable_lights**5 * -0.001556351179853) + (stable_lights**6 * 5.49156607070785E-05) + (stable_lights**7 * -1.22254273927693E-06) + (stable_lights**8 * 1.66728969394156E-08) + (stable_lights**9 * -1.27184091432288E-10) + (stable_lights**10 * 4.15657668844221E-13))/1.14081071355887",
                      "F121999":"((stable_lights * -2.66709879413818) + (stable_lights**2 * 1.75438286065719) + (stable_lights**3 * -0.344320882081718) +  (stable_lights**4 * 0.03586801906844) + (stable_lights**5 * -0.002206351075873) + (stable_lights**6 * 8.41235639682834E-05) + (stable_lights**7 * -2.01056659097958E-06) + (stable_lights**8 * 2.93154885112872E-08) + (stable_lights**9 * -2.38349278103835E-10) + (stable_lights**10 * 8.28082949316725E-13))/1.12383271206417",
                      "F141997":"((stable_lights * 3.82518114628333) + (stable_lights**2 * -1.69269003952452) + (stable_lights**3 * 0.392696611497394) +  (stable_lights**4 * -0.043768026604539) + (stable_lights**5 * 0.002736906860049) + (stable_lights**6 * -0.000103050847196) + (stable_lights**7 * 2.38758499925313E-06) + (stable_lights**8 * -3.32967932535884E-08) + (stable_lights**9 * 2.56127531502906E-10) + (stable_lights**10 * -8.33721877332429E-13))/0.783586615714445",
                      "F141998":"((stable_lights * -7.77680833645681) + (stable_lights**2 * 5.16565853218283) + (stable_lights**3 * -1.0930816084554) +  (stable_lights**4 * 0.11816246865022) + (stable_lights**5 * -0.007383351879363) + (stable_lights**6 * 0.000281795061057) + (stable_lights**7 * -6.66501170708101E-06) + (stable_lights**8 * 9.52787716454976E-08) + (stable_lights**9 * -7.5375564271963E-10) + (stable_lights**10 * 2.53243508267021E-12))/0.888543241607787",
                      "F141999":"((stable_lights * 0.583998886113313) + (stable_lights**2 * -0.343351561918357) + (stable_lights**3 * 0.150565297375339) +  (stable_lights**4 * -0.020176651094895) + (stable_lights**5 * 0.00135598268242) + (stable_lights**6 * -5.23043941902523E-05) + (stable_lights**7 * 1.20734133428759E-06) + (stable_lights**8 * -1.64330671176587E-08) + (stable_lights**9 * 1.21135016970506E-10) + (stable_lights**10 * -3.70762985062049E-13))/0.875533489710115",
                      "F142000":"((stable_lights * -0.711499620045829) + (stable_lights**2 * 0.886293766260067) + (stable_lights**3 * -0.170940291579312) +  (stable_lights**4 * 0.018490284697214) + (stable_lights**5 * -0.001213691623002) + (stable_lights**6 * 4.96860487274801E-05) + (stable_lights**7 * -1.27024436035446E-06) + (stable_lights**8 * 1.96665650244467E-08) + (stable_lights**9 * -1.68426810635176E-10) + (stable_lights**10 * 6.11723419768394E-13))/0.914236687962497",
                      "F142001":"((stable_lights * -2.10075964501815) + (stable_lights**2 * 1.69364026024473) + (stable_lights**3 * -0.337647916893346) +  (stable_lights**4 * 0.03521548379297) + (stable_lights**5 * -0.002157414952542) + (stable_lights**6 * 8.16335463286794E-05) + (stable_lights**7 * -1.93145888466303E-06) + (stable_lights**8 * 2.7842428846496E-08) + (stable_lights**9 * -2.23752596753572E-10) + (stable_lights**10 * 7.68890747362304E-13))/0.930984266318698",
                      "F142002":"((stable_lights * -5.65709016207249) + (stable_lights**2 * 3.85439729936464) + (stable_lights**3 * -0.814392215003411) +  (stable_lights**4 * 0.087857257933316) + (stable_lights**5 * -0.005476496697969) + (stable_lights**6 * 0.000208527552827) + (stable_lights**7 * -4.92199892969956E-06) + (stable_lights**8 * 7.02396763836148E-08) + (stable_lights**9 * -5.54812345188919E-10) + (stable_lights**10 * 1.86124866707447E-12))/0.978081912124998",
                      "F142003":"((stable_lights * -3.13951871920182) + (stable_lights**2 * 2.97055794873774) + (stable_lights**3 * -0.68521711453428) +  (stable_lights**4 * 0.07752090378148) + (stable_lights**5 * -0.004973304001408) + (stable_lights**6 * 0.000192976040163) + (stable_lights**7 * -4.61515077093207E-06) + (stable_lights**8 * 6.64945059312394E-08) + (stable_lights**9 * -5.29059660461171E-10) + (stable_lights**10 * 1.78503037345614E-12))/0.940718951231124",
                      "F152000":"((stable_lights * -6.81496595330242) + (stable_lights**2 * 4.78956794711164) + (stable_lights**3 * -1.0510496916194) +  (stable_lights**4 * 0.115734661713622) + (stable_lights**5 * -0.007304927247537) + (stable_lights**6 * 0.000280599688464) + (stable_lights**7 * -6.66972841827846E-06) + (stable_lights**8 * 9.57740670245235E-08) + (stable_lights**9 * -7.61047829352421E-10) + (stable_lights**10 * 2.56876334301137E-12))/1.1424887714648",
                      "F152001":"((stable_lights * -8.15341135511279) + (stable_lights**2 * 4.80704992224384) + (stable_lights**3 * -0.984272666467449) +  (stable_lights**4 * 0.104611015331666) + (stable_lights**5 * -0.006469340845629) + (stable_lights**6 * 0.000245251601938) + (stable_lights**7 * -5.77576293029549E-06) + (stable_lights**8 * 8.23658088315862E-08) + (stable_lights**9 * -6.51007887196631E-10) + (stable_lights**10 * 2.18805375668218E-12))/1.08507902133708",
                      "F152002":"((stable_lights * -2.33095757373789) + (stable_lights**2 * 1.20333643427418) + (stable_lights**3 * -0.182750245099405) +  (stable_lights**4 * 0.015536501060758) + (stable_lights**5 * -0.000821705125486) + (stable_lights**6 * 2.81940489255057E-05) + (stable_lights**7 * -6.29552409982571E-07) + (stable_lights**8 * 8.83426945987442E-09) + (stable_lights**9 * -7.07052257473647E-11) + (stable_lights**10 * 2.4592973060316E-13))/1.09604118889571",
                      "F152003":"((stable_lights * -4.19887699651772) + (stable_lights**2 * 2.5840384294597) + (stable_lights**3 * -0.488435194440711) +  (stable_lights**4 * 0.049676466680601) + (stable_lights**5 * -0.003012272085731) + (stable_lights**6 * 0.000113704881784) + (stable_lights**7 * -2.69258855664067E-06) + (stable_lights**8 * 3.88710481707103E-08) + (stable_lights**9 * -3.12542340924115E-10) + (stable_lights**10 * 1.07253405619882E-12))/0.833574565037288",
                      "F152004":"((stable_lights * 4.03246628110779) + (stable_lights**2 * -1.45298340178407) + (stable_lights**3 * 0.301853279520492) +  (stable_lights**4 * -0.031748116509654) + (stable_lights**5 * 0.001917459192764) + (stable_lights**6 * -7.02004391895833E-05) + (stable_lights**7 * 1.57975941393837E-06) + (stable_lights**8 * -2.12877978645254E-08) + (stable_lights**9 * 1.57010728041204E-10) + (stable_lights**10 * -4.85176615241457E-13))/0.807115026846342",
                      "F152005":"((stable_lights * -5.51257704506252) + (stable_lights**2 * 3.38378867708923) + (stable_lights**3 * -0.674286862459649) +  (stable_lights**4 * 0.070573870830713) + (stable_lights**5 * -0.004337687222739) + (stable_lights**6 * 0.000164414587475) + (stable_lights**7 * -3.88576883782627E-06) + (stable_lights**8 * 5.57396214302583E-08) + (stable_lights**9 * -4.43819845897267E-10) + (stable_lights**10 * 1.5042837101363E-12))/0.88228538839446",
                      "F152006":"((stable_lights * -12.7321713156225) + (stable_lights**2 * 7.83974492339178) + (stable_lights**3 * -1.65429328560581) +  (stable_lights**4 * 0.178634911471195) + (stable_lights**5 * -0.01115944198702) + (stable_lights**6 * 0.000426182027731) + (stable_lights**7 * -1.00932376259282E-05) + (stable_lights**8 * 1.44533114404744E-07) + (stable_lights**9 * -1.14548965550199E-09) + (stable_lights**10 * 3.85510110293329E-12))/0.773090554527393",
                      "F152007":"((stable_lights * -0.941240366133924) + (stable_lights**2 * 0.597397281526235) + (stable_lights**3 * -0.060839790743398) +  (stable_lights**4 * 0.003405457646814) + (stable_lights**5 * -0.000152041601075) + (stable_lights**6 * 6.46115268957381E-06) + (stable_lights**7 * -2.11033318339838E-07) + (stable_lights**8 * 4.25209914362569E-09) + (stable_lights**9 * -4.56940697246111E-11) + (stable_lights**10 * 2.0000281974688E-13))/0.852901954568982",
                      "F152008":"((stable_lights * -3.97) + (stable_lights**2 * 2.42) + (stable_lights**3 * -4.51E-01) +  (stable_lights**4 * 4.48E-02) + (stable_lights**5 * -2.65E-03) + (stable_lights**6 * 9.80E-05) + (stable_lights**7 * -2.28E-06) + (stable_lights**8 * 3.24E-08) + (stable_lights**9 * -2.57E-10) + (stable_lights**10 * 8.73E-13))/0.901158625095345",
                      "F162004":"((stable_lights * -5.62467952577518) + (stable_lights**2 * 3.41884525007195) + (stable_lights**3 * -0.67658663199346) +  (stable_lights**4 * 0.070378976322945) + (stable_lights**5 * -0.004298095327843) + (stable_lights**6 * 0.000162036236061) + (stable_lights**7 * -3.81319668363691E-06) + (stable_lights**8 * 5.45088062740628E-08) + (stable_lights**9 * -4.32722843330184E-10) + (stable_lights**10 * 1.46266775285353E-12))/0.911329664006153",
                      "F162005":"((stable_lights * -4.15724323131121) + (stable_lights**2 * 2.55703107058692) + (stable_lights**3 * -0.495154707850685) +  (stable_lights**4 * 0.051562810658428) + (stable_lights**5 * -0.003194133076135) + (stable_lights**6 * 0.000122863755417) + (stable_lights**7 * -2.95759716379189E-06) + (stable_lights**8 * 4.32958074183808E-08) + (stable_lights**9 * -3.52148165209407E-10) + (stable_lights**10 * 1.21969560583335E-12))/0.850684479274224",
                      "F162006":"((stable_lights * -2.60762000312454) + (stable_lights**2 * 2.15512440744913) + (stable_lights**3 * -0.464300733260732) +  (stable_lights**4 * 0.05088244641048) + (stable_lights**5 * -0.003215975710289) + (stable_lights**6 * 0.000124022594911) + (stable_lights**7 * -2.96270225835097E-06) + (stable_lights**8 * 4.27717589413893E-08) + (stable_lights**9 * -3.4173028089513E-10) + (stable_lights**10 * 1.1597293526972E-12))/0.898896293547695",
                      "F162007":"((stable_lights * -8.81876245374687) + (stable_lights**2 * 5.44730014700709) + (stable_lights**3 * -1.14786292602405) +  (stable_lights**4 * 0.123974540836335) + (stable_lights**5 * -0.007749269005568) + (stable_lights**6 * 0.000296201362349) + (stable_lights**7 * -7.02418220484938E-06) + (stable_lights**8 * 1.0078255561733E-07) + (stable_lights**9 * -8.00960555928787E-10) + (stable_lights**10 * 2.70558681626932E-12))/1.06276958218403",
                      "F162008":"((stable_lights * -5.62264889734211) + (stable_lights**2 * 3.52692707721742) + (stable_lights**3 * -0.730250333363971) +  (stable_lights**4 * 0.078198002938393) + (stable_lights**5 * -0.004872986994371) + (stable_lights**6 * 0.000186202124974) + (stable_lights**7 * -4.41985148979292E-06) + (stable_lights**8 * 6.35073821374543E-08) + (stable_lights**9 * -5.05482518524093E-10) + (stable_lights**10 * 1.7097675225474E-12))/0.957633793849236",
                      "F162009":"((stable_lights * -7.34865415735104) + (stable_lights**2 * 4.50460447544191) + (stable_lights**3 * -0.927705165500657) +  (stable_lights**4 * 0.098302889127915) + (stable_lights**5 * -0.00605781377297) + (stable_lights**6 * 0.000229115594662) + (stable_lights**7 * -5.39020566212373E-06) + (stable_lights**8 * 7.68621644380095E-08) + (stable_lights**9 * -6.0780011362022E-10) + (stable_lights**10 * 2.04421784397123E-12))/0.95230283891918",
                      "F182010":"((stable_lights * -2.39972392321164) + (stable_lights**2 * 1.66662841186145) + (stable_lights**3 * -0.335961675006606) +  (stable_lights**4 * 0.034760004293964) + (stable_lights**5 * -0.002094520242277) + (stable_lights**6 * 7.76102788843036E-05) + (stable_lights**7 * -1.79194545946994E-06) + (stable_lights**8 * 2.51165132906153E-08) + (stable_lights**9 * -1.95510747622707E-10) + (stable_lights**10 * 6.48258741522333E-13))/1.28624382679144",
                      "F182011":"((stable_lights * -2.8251040414284) + (stable_lights**2 * 1.78372181014116) + (stable_lights**3 * -0.343634872714583) +  (stable_lights**4 * 0.03491219555179) + (stable_lights**5 * -0.002097029142657) + (stable_lights**6 * 7.8135428564397E-05) + (stable_lights**7 * -1.8235102910115E-06) + (stable_lights**8 * 2.59135051975075E-08) + (stable_lights**9 * -2.04867192289978E-10) + (stable_lights**10 * 6.90490573044359E-13))/1.14058991646887",
                      "F182012":"((stable_lights * -1.7347080801115) + (stable_lights**2 * 1.20194353949905) + (stable_lights**3 * -0.23627766430255) +  (stable_lights**4 * 0.024617399767568) + (stable_lights**5 * -0.001514891344848) + (stable_lights**6 * 5.76519090049789E-05) + (stable_lights**7 * -1.36952665772479E-06) + (stable_lights**8 * 1.97464449069296E-08) + (stable_lights**9 * -1.57948533840423E-10) + (stable_lights**10 * 5.3734274954425E-13))/1.26463212525894",
                      "F182013":"((stable_lights * -4.79208342260032) + (stable_lights**2 * 2.91774174053404) + (stable_lights**3 * -0.604241996811802) +  (stable_lights**4 * 0.06531244856504) + (stable_lights**5 * -0.004118592153397) + (stable_lights**6 * 0.00015932894603) + (stable_lights**7 * -3.82750275311317E-06) + (stable_lights**8 * 5.56169774748384E-08) + (stable_lights**9 * -4.47271440198371E-10) + (stable_lights**10 * 1.52711181977612E-12))/1.21845217963711"};
  var dmspDataset = ee.Image("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/"+name)
                                  .select("stable_lights");
  var applyCalibration = function(polynomial, image){
      image = image.expression(polynomial, {"stable_lights" : image});
     image = image.log10();
     image = image.expression("10**(-6.309335214124802+1.0420328478760008*(stable_lights))", {"stable_lights" : image});
     image = image.unmask(0)
  return image;
  };
  dmspDataset = applyCalibration(polynomialDict[name], dmspDataset);
  var dmspDatasetToFloat = function(image){
      image = image.float();
  var image=image.reproject(ee.Projection('EPSG:4326'),null, 1000); 
  image=image.visualize({min: 0.000004740194526675623, max:0.000041483463569893502,gamma:2});
  return image;
  };
  dmspDataset = dmspDatasetToFloat(dmspDataset);
  return dmspDataset;
};
var F101992	= getDmsp("F101992");
var F101993	= getDmsp("F101993");
var F101994	= getDmsp("F101994");
var F121994	= getDmsp("F121994");
var F121995	= getDmsp("F121995");
var F121996	= getDmsp("F121996");
var F121997	= getDmsp("F121997");
var F121998	= getDmsp("F121998");
var F121999	= getDmsp("F121999");
var F141997	= getDmsp("F141997");
var F141998	= getDmsp("F141998");
var F141999	= getDmsp("F141999");
var F142000	= getDmsp("F142000");
var F142001	= getDmsp("F142001");
var F142002	= getDmsp("F142002");
var F142003	= getDmsp("F142003");
var F152000	= getDmsp("F152000");
var F152001	= getDmsp("F152001");
var F152002	= getDmsp("F152002");
var F152003	= getDmsp("F152003");
var F152004	= getDmsp("F152004");
var F152005	= getDmsp("F152005");
var F152006	= getDmsp("F152006");
var F152007	= getDmsp("F152007");
var F152008	= getDmsp("F152008");
var F162004	= getDmsp("F162004");
var F162005 = getDmsp("F162005");
var F162006	= getDmsp("F162006");
var F162007	= getDmsp("F162007");
var F162008	= getDmsp("F162008");
var F162009	= getDmsp("F162009");
var F182010	= getDmsp("F182010");
var F182011	= getDmsp("F182011");
var F182012	= getDmsp("F182012");
var F182013 = getDmsp("F182013");
var F101992 =F101992.set({"system:id":"F101992"});
var F101992 =F101992.set({"system:time_end": 725846400000});
var F101992 =F101992.set({"system:time_start": 694224000000});
var F101993 =F101993.set({"system:id":"F101993"});
var F101993 =F101993.set({"system:time_end": 757382400000});
var F101993 =F101993.set({"system:time_start": 725846400000});
var F101994 =F101994.set({"system:id":"F101994"});
var F101994 =F101994.set({"system:time_end": 788918400000});
var F101994 =F101994.set({"system:time_start": 757382400000});
var F121994 =F121994.set({"system:id":"F121994"});
var F121995 =F121995.set({"system:time_end": 788918400000});
var F121995 =F121995.set({"system:time_start": 757382400000});
var F121995 =F121995.set({"system:id":"F121995"});
var F121995 =F121995.set({"system:time_end": 820454400000});
var F121995 =F121995.set({"system:time_start": 788918400000});
var F121996 =F121996.set({"system:id":"F121996"});
var F121996 =F121996.set({"system:time_end": 852076800000});
var F121996 =F121996.set({"system:time_start": 820454400000});
var F121997 =F121997.set({"system:id":"F121997"});
var F121997 =F121997.set({"system:time_end": 883612800000});
var F121997 =F121997.set({"system:time_start": 852076800000});
var F121998 =F121998.set({"system:id":"F121998"});
var F121998 =F121998.set({"system:time_end": 915148800000});
var F121998 =F121998.set({"system:time_start": 883612800000});
var F121999 =F121999.set({"system:id":"F121999"});
var F121999 =F121999.set({"system:time_end": 946684800000});
var F121999 =F121999.set({"system:time_start": 915148800000});
var F141997 =F141997.set({"system:id":"F141997"});
var F141997 =F141997.set({"system:time_end": 883612800000});
var F141997 =F141997.set({"system:time_start": 852076800000});
var F141998 =F141998.set({"system:id":"F141998"});
var F141998 =F141998.set({"system:time_end": 915148800000});
var F141998 =F141998.set({"system:time_start": 883612800000});
var F141999 =F141999.set({"system:id":"F141999"});
var F141999 =F141999.set({"system:time_end": 946684800000});
var F141999 =F141999.set({"system:time_start": 915148800000});
var F142000 =F142000.set({"system:id":"F142000"});
var F142000 =F142000.set({"system:time_start": 915148800000});
var F142000 =F142000.set({"system:time_start": 946684800000});
var F142001 =F142001.set({"system:id":"F142001"});
var F142001 =F142001.set({"system:time_end": 1009843200000});
var F142001 =F142001.set({"system:time_start": 97830720000});
var F142002 =F142002.set({"system:id":"F142002"});
var F142002 =F142002.set({"system:time_end": 1041379200000});
var F142002 =F142002.set({"system:time_start": 1009843200000});
var F142003 =F142003.set({"system:id":"F142003"});
var F142003 =F142003.set({"system:time_end": 1072915200000});
var F142003 =F142003.set({"system:time_start": 1041379200000});
var F152000 =F152000.set({"system:id":"F152000"});
var F152000 =F152000.set({"system:time_end": 978307200000});
var F152000 =F152000.set({"system:time_start": 946684800000});
var F152001 =F152001.set({"system:id":"F152001"});
var F152001 =F152001.set({"system:time_end": 1009843200000});
var F152001 =F152001.set({"system:time_start": 978307200000});
var F152002 =F152002.set({"system:id":"F152002"});
var F152002 =F152002.set({"system:time_end": 1041379200000});
var F152002 =F152002.set({"system:time_start": 1009843200000});
var F152003 =F152003.set({"system:id":"F152003"});
var F152003 =F152003.set({"system:time_end": 1072915200000});
var F152003 =F152003.set({"system:time_start": 1041379200000});
var F152004 =F152004.set({"system:id":"F152004"});
var F152004 =F152004.set({"system:time_end": 1104537600000});
var F152004 =F152004.set({"system:time_start": 1072915200000});
var F152005 =F152005.set({"system:id":"F152005"});
var F152005 =F152005.set({"system:time_end": 1104537600000});
var F152005 =F152005.set({"system:time_start": 1072915200000});
var F152006 =F152006.set({"system:id":"F152006"});
var F152006 =F152006.set({"system:time_end": 1167609600000});
var F152006 =F152006.set({"system:time_start": 1136073600000});
var F152007 =F152007.set({"system:id":"F152007"});
var F152007 =F152007.set({"system:time_end": 1199145600000});
var F152007 =F152007.set({"system:time_start": 1167609600000});
var F152008 =F152008.set({"system:id":"F152008"});
var F152008 =F152008.set({"system:time_end": 1230768000000});
var F152008 =F152008.set({"system:time_start": 1199145600000});
var F162004 =F162004.set({"system:id":"F162004"});
var F162004 =F162004.set({"system:time_end": 1104537600000});
var F162004 =F162004.set({"system:time_start": 1072915200000});
var F162005 =F162005.set({"system:id":"F162005"});
var F162005 =F162005.set({"system:time_end": 1136073600000});
var F162005 =F162005.set({"system:time_start": 1104537600000});
var F162006 =F162006.set({"system:id":"F162006"});
var F162006 =F162006.set({"system:time_end": 1167609600000});
var F162006 =F162006.set({"system:time_start": 1136073600000});
var F162007 =F162007.set({"system:id":"F162007"});
var F162007 =F162007.set({"system:time_end": 1199145600000});
var F162007 =F162007.set({"system:time_start": 1167609600000});
var F162008 =F162008.set({"system:id":"F162008"});
var F162008 =F162008.set({"system:time_end": 1230768000000});
var F162008 =F162008.set({"system:time_start": 1199145600000});
var F162009 =F162009.set({"system:id":"F162009"});
var F162009 =F162009.set({"system:time_end": 1262304000000});
var F162009 =F162009.set({"system:time_start": 1230768000000});
var F182010 =F182010.set({"system:id":"F182010"});
var F182010 =F182010.set({"system:time_end": 1293840000000});
var F182010 =F182010.set({"system:time_start": 1262304000000});
var F182011 =F182011.set({"system:id":"F182011"});
var F182011 =F182011.set({"system:time_end": 1325376000000});
var F182011 =F182011.set({"system:time_start": 1293840000000});
var F182012 =F182012.set({"system:id":"F182012"});
var F182012 =F182012.set({"system:time_end": 1356998400000});
var F182012 =F182012.set({"system:time_start": 1325376000000});
var F182013 = F182013.set({"system:id": "F182013"});
var F182013 =F182013.set({"system:time_end": 1388534400000});
var F182013 =F182013.set({"system:time_start": 1356998400000});
//////////////////////////////////////////////////////////////////////////////
//
//
//
//
////////////////////////////////////////////////////////////////////////
var country= "continent"//2
var POP2013=ee.Image('users/simondz580/hyde32/popc_2013AD');
var maskPOP=POP2013.divide(POP2013)
var maskPOP=maskPOP.reproject(ee.Projection('EPSG:4326'),null, 500);
// Compute the trend of night-time lights.
// Adds a band containing image date as years since 1991.
function createTimeBand(img) {
  var year = ee.Date(img.get('system:time_start')).get('year').subtract(2012);
  return ee.Image(year).byte().addBands(img);
}
// Map the time band creation helper over the night-time lights collection.
// https://earthengine.google.org/#detail/NOAA%2FDMSP-OLS%2FNIGHTTIME_LIGHTS
//var collection = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
//    .select('avg_rad')
//    .map(createTimeBand);
//var collection0 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG').filterDate('2012-01-01', '2012-12-31').select('avg_rad').reduce(ee.Reducer.median());
var albedo01=imageCollection.filterDate('2012-08-01', '2012-11-30').map(createTimeBand);
var albedo02=albedo01.reduce(ee.Reducer.median());
var albedo02=albedo02.select("Albedo_BSA_Band1_median").unmask(3);
var albedo02=albedo02.multiply(1/750.0);
var collection01 =ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2012-08-01', '2012-11-30').map(createTimeBand);
//var maxval=0;
var collection02 = collection01.reduce(ee.Reducer.median());
var collection02c = collection02.select('avg_rad_median').subtract(0.)//.multiply(maskPOP);
collection02c=collection02c.addBands(collection02.select("constant_median")).addBands(collection02.select("cf_cvg_median"));
var collection02=collection02c;
collection02=collection02.set({"system:id":"2012"});
collection02 =collection02.set({"system:time_end": 1356998400000});
collection02 =collection02.set({"system:time_start": 1325376000000});
//collection02 = collection02.unmask(0)
//collection02 = collection02.multiply(collection02.select('avg_rad_median').gte(maxval));
//var collection1 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG').filterDate('2013-08-01', '2013-11-30').select('avg_rad').reduce(ee.Reducer.median());
var collection11 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2013-08-01', '2013-11-30').map(createTimeBand);
var collection12 = collection11.reduce(ee.Reducer.median());
var collection12c = collection12.select('avg_rad_median').subtract(0.)//.multiply(maskPOP);
collection12c=collection12c.addBands(collection12.select("constant_median")).addBands(collection12.select("cf_cvg_median"));
var collection12=collection12c;
collection12=collection12.set({"system:id":"2013"});
collection12 =collection12.set({"system:time_end": 1388534400000});
collection12 =collection12.set({"system:time_start": 1356998400000});
//collection12 = collection12.multiply(collection12.select('avg_rad_median').gte(maxval));
var collection2 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2014-08-01', '2014-11-30').select('avg_rad').reduce(ee.Reducer.median());
var collection21 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2014-08-01', '2014-11-30').map(createTimeBand);
var collection22 = collection21.reduce(ee.Reducer.median());
var collection22c = collection22.select('avg_rad_median').subtract(0.)//.multiply(maskPOP);
collection22c=collection22c.addBands(collection22.select("constant_median")).addBands(collection22.select("cf_cvg_median"));
var collection22=collection22c;
collection22=collection22.set({"system:id":"2014"});
collection22 =collection22.set({"system:time_end": 1420156800000});
collection22 =collection22.set({"system:time_start": 1388534400000});
//collection22 = collection22.multiply(collection22.select('avg_rad_median').gte(maxval));
var collection3 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2015-08-01', '2015-11-30').select('avg_rad').reduce(ee.Reducer.median());
var collection31 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2015-08-01', '2015-11-30').map(createTimeBand);
var collection32 = collection31.reduce(ee.Reducer.median());
var collection32c = collection32.select('avg_rad_median').subtract(0.)//.multiply(maskPOP);
collection32c=collection32c.addBands(collection32.select("constant_median")).addBands(collection32.select("cf_cvg_median"));
var collection32=collection32c;
collection32=collection32.set({"system:id":"2015"});
collection32 =collection32.set({"system:time_end": 1451779200000});
collection32 =collection32.set({"system:time_start": 1420156800000});
//collection32 = collection32.multiply(collection32.select('avg_rad_median').gte(maxval));
var collection4 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2016-08-01', '2016-11-30').select('avg_rad').reduce(ee.Reducer.median());
var collection41 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2016-08-01', '2016-11-30').map(createTimeBand);
var collection42 = collection41.reduce(ee.Reducer.median());
var collection42c = collection42.select('avg_rad_median').subtract(0.)//.multiply(maskPOP);
collection42c=collection42c.addBands(collection42.select("constant_median")).addBands(collection42.select("cf_cvg_median"));
var collection42=collection42c;
collection42=collection42.set({"system:id":"2016"});
collection42 =collection42.set({"system:time_end": 1483401600000});
collection42 =collection42.set({"system:time_start": 1451779200000});
//collection42 = collection42.multiply(collection42.select('avg_rad_median').gte(maxval));
var collection5 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2017-08-01', '2017-11-30').select('avg_rad').reduce(ee.Reducer.median());
var collection51 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2017-08-01', '2017-11-30').map(createTimeBand);
var collection52 = collection51.reduce(ee.Reducer.median());
var collection52c = collection52.select('avg_rad_median').subtract(0.15)//.multiply(maskPOP);
collection52c=collection52c.addBands(collection52.select("constant_median")).addBands(collection52.select("cf_cvg_median"));
var collection52=collection52c;
//collection52 = collection52.multiply(collection52.select('avg_rad_median').gte(maxval));
collection52=collection52.set({"system:id":"2017"});
collection52 =collection52.set({"system:time_end": 1515024000000});
collection52 =collection52.set({"system:time_start": 1483401600000});
var collection61 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2018-08-01', '2018-11-30').map(createTimeBand);
var collection62 = collection61.reduce(ee.Reducer.median());
var collection62 = collection61.reduce(ee.Reducer.median());
var collection62c = collection62.select('avg_rad_median').subtract(0.13)//.multiply(maskPOP);
collection62c=collection62c.addBands(collection62.select("constant_median")).addBands(collection62.select("cf_cvg_median"));
var collection62=collection62c;
collection62=collection62.set({"system:id":"2018"});
collection52 =collection52.set({"system:time_end": 1546646400000});
collection52 =collection52.set({"system:time_start": 1515024000000});
var collectionS = ee.ImageCollection([collection02,collection12,collection22,collection32,collection42,collection52,collection62]);
//print(collectionS)
//=====================================================================
//Function
var getViirs = function(name){
  var polynomialDict = {"2012":"1E-7*(avg_rad_median)/1.05769229802288",
                      "2013":"1E-7*(avg_rad_median)/1.13354392032223",
                      "2014":"1E-7*(avg_rad_median)/1.14527001257967",
                      "2015":"1E-7*(avg_rad_median)/1.07708479653187",
                      "2016":"1E-7*(avg_rad_median)/1.14278869197471",
                      "2017":"1E-7*(avg_rad_median)/1.22708610594665"};
  var dmspDataset = collectionS.filterMetadata('system:id', 'equals', name).first().select("avg_rad_median");
  var applyCalibration = function(polynomial, image){
    //image = image.unmask(0)
     image = image.expression(polynomial, {"avg_rad_median" : image});
     var image2area = ee.Image.pixelArea();
     image = image.expression('IMA*PIX*1E-9*1E4',{'IMA':image,'PIX':image2area.select('area')});
     //image = image.unmask(0)
     // Define a boxcar or low-pass kernel.
  var gaus = ee.Kernel.gaussian({
  radius: 10000,sigma:2000, units: 'meters', magnitude: 8
  });
// Smooth the image by convolving with the boxcar kernel.
   image = image.convolve(gaus);
   image=image.reproject(ee.Projection('EPSG:4326'),null, 1000) ;
   image=image.visualize({min: 0.000004040194526675623, max:0.00011709291720762849,gamma:2})
  return image;
  };
  dmspDataset = applyCalibration(polynomialDict[name], dmspDataset);
  var dmspDatasetToFloat = function(image){
      image = image.float();
  return image;
  };
  dmspDataset = dmspDatasetToFloat(dmspDataset);
  return dmspDataset;
};
var V2012	= getViirs("2012");
var V2013	= getViirs("2013");
var V2014	= getViirs("2014");
var V2015	= getViirs("2015");
var V2016	= getViirs("2016");
var V2017	= getViirs("2017");
V2012=V2012.set({"system:id":"2012"});
V2012 =V2012.set({"system:time_end": 1356998400000});
V2012 =V2012.set({"system:time_start": 1325376000000});
V2013=V2013.set({"system:id":"2013"});
V2013 =V2013.set({"system:time_end": 1388534400000});
V2013 =V2013.set({"system:time_start": 1356998400000});
V2014=V2014.set({"system:id":"2014"});
V2014 =V2014.set({"system:time_end": 1420156800000});
V2014 =V2014.set({"system:time_start": 1388534400000});
V2015=V2015.set({"system:id":"2015"});
V2015 =V2015.set({"system:time_end": 1451779200000});
V2015 =V2015.set({"system:time_start": 1420156800000});
V2016=V2016.set({"system:id":"2016"});
V2016 =V2016.set({"system:time_end": 1483401600000});
V2016 =V2016.set({"system:time_start": 1451779200000});
V2017=V2017.set({"system:id":"2017"});
V2017 =V2017.set({"system:time_end": 1515024000000});
V2017 =V2017.set({"system:time_start": 1483401600000});
//////////////////////////////////////////////////////////////////////////////
//
//
//
//
////////////////////////////////////////////////////////////////////////
var calibratedCollection = ee.ImageCollection([F101992, F101993,	F101994,	F121994,	F121995,	F121996,	F121997,	F121998,	F121999,	
                                              F141997,	F141998,	F141999,	F142000,	F142001,	F142002,	F142003,	F152000,	F152001,	
                                              F152002,	F152003,	F152004,	F152005,	F152006,	F152007, F152008,	F162004,	F162005,	F162006,	
                                              F162007,	F162008,	F162009,	F182010,	F182011,	F182012,	F182013,V2012,V2013,V2014,V2015,V2016,V2017]);
var collection = calibratedCollection
// A helper function to show the image for a given year on the default map.
// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
function getWeeklySentinelComposite(name) {
  var sentinel1 = collection.filterMetadata('system:id', 'equals', name);
  return sentinel1.first().visualize({min: 0, max:255});//1e-5
}
Map.setOptions('SATELLITE');
var images = {
  'NULL': getWeeklySentinelComposite('NULL'),
  'F101992': getWeeklySentinelComposite('F101992'),
  'F101993': getWeeklySentinelComposite('F101993'),
  'F101994': getWeeklySentinelComposite('F101994'),
  'F121994': getWeeklySentinelComposite('F121994'),
  'F121995': getWeeklySentinelComposite('F121995'),
  'F121996': getWeeklySentinelComposite('F121996'),
  'F121997': getWeeklySentinelComposite('F121997'),
  'F121998': getWeeklySentinelComposite('F121998'),
  'F121999': getWeeklySentinelComposite('F121999'),
  'F141997': getWeeklySentinelComposite('F141997'),
  'F141998': getWeeklySentinelComposite('F141998'),
  'F141999': getWeeklySentinelComposite('F141999'),
  'F142000': getWeeklySentinelComposite('F142000'),
  'F142001': getWeeklySentinelComposite('F142001'),
  'F142002': getWeeklySentinelComposite('F142002'),
  'F142003': getWeeklySentinelComposite('F142003'),
  'F152000': getWeeklySentinelComposite('F152000'),
  'F152001': getWeeklySentinelComposite('F152001'),
  'F152002': getWeeklySentinelComposite('F152002'),
  'F152003': getWeeklySentinelComposite('F152003'),
  'F152004': getWeeklySentinelComposite('F152004'),
  'F152005': getWeeklySentinelComposite('F152005'),
  'F152006': getWeeklySentinelComposite('F152006'),
  'F152007': getWeeklySentinelComposite('F152007'),
  'F152008': getWeeklySentinelComposite('F152008'),
  'F162004': getWeeklySentinelComposite('F162004'),
  'F162005': getWeeklySentinelComposite('F162005'),
  'F162006': getWeeklySentinelComposite('F162006'),
  'F162007': getWeeklySentinelComposite('F162007'),
  'F162008': getWeeklySentinelComposite('F162008'),
  'F162009': getWeeklySentinelComposite('F162009'),
  'F182010': getWeeklySentinelComposite('F182010'),
  'F182011': getWeeklySentinelComposite('F182011'),
  'F182012': getWeeklySentinelComposite('F182012'),
  'F182013': getWeeklySentinelComposite('F182013'),
  '2012': getWeeklySentinelComposite('2012'),
  '2013': getWeeklySentinelComposite('2013'),
  '2014': getWeeklySentinelComposite('2014'),
  '2015': getWeeklySentinelComposite('2015'),
  '2016': getWeeklySentinelComposite('2016'),
  '2017': getWeeklySentinelComposite('2017'),
};
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
leftMap.setOptions('SATELLITE');
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 40, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
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
leftMap.setCenter(-7.598, 43.003, 7);
Map.addLayer(F182012,{min: 0.00000392434003515518, max:0.00003346235826029442,gamma:2},'F182012');
Map.addLayer(V2012,{min: 0.0000024468904484820087, max:0.000057501991250319406,gamma:2},'V2012');
Map.setCenter(-7.598, 43.003, 7);