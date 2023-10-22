var table = ui.import && ui.import("table", "table", {
      "id": "users/idakwovicks/Wukari_LGA"
    }) || ee.FeatureCollection("users/idakwovicks/Wukari_LGA"),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            9.777425832123864,
            7.87111419207676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.778884953827966,
            7.868393477680728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.775108403534997,
            7.8695837924263055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.77528006491195,
            7.874259995831966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.77553755697738,
            7.869073657953833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.891928055542024,
            7.712127628721291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.890168526428255,
            7.711617302408346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.891069748657259,
            7.710596647935978
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#d22e0e",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d22e0e */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([9.777425832123864, 7.87111419207676]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([9.778884953827966, 7.868393477680728]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([9.775108403534997, 7.8695837924263055]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([9.77528006491195, 7.874259995831966]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([9.77553755697738, 7.869073657953833]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([9.891928055542024, 7.712127628721291]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([9.890168526428255, 7.711617302408346]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([9.891069748657259, 7.710596647935978]),
            {
              "landcover": 1,
              "system:index": "7"
            })]),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            9.87878254270436,
            7.74695130214774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.871916087626236,
            7.753755032608829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.86504963254811,
            7.760218474655216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.874662669657486,
            7.809881602813567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.87603596067311,
            7.829609154279016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.951566966532486,
            7.818725103304143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.943327220438736,
            7.825867793804189
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.944013865946548,
            7.807840768412706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.951566966532486,
            7.809201325787645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.949507030009048,
            7.794915252502143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.93646076536061,
            7.792194040371414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.94023731565358,
            7.789812965248722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.851660045145767,
            7.794915252502143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.836553843973892,
            7.810561878731664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.816297801493423,
            7.801037915100404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.79913166379811,
            7.811922427244001
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.806341441630142,
            7.7904932738081145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.790548594950454,
            7.802058350154141
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.8775514152222,
            7.710426538617924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.87806639935306,
            7.717741177529125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.87703643109134,
            7.724715482821224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.882872917907747,
            7.723864963948801
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.88630614544681,
            7.732029874410151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.89076934124759,
            7.732880376834348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.85060057904056,
            7.727437131703636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.854377129333528,
            7.7194422382127925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.860385277526888,
            7.713658603966714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.858497002380403,
            7.7111069754799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.85334716107181,
            7.710766757185663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.891584732788118,
            7.707874890642249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.893987992065462,
            7.708215111261088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.938458126537464,
            7.731695231261414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.934166592113636,
            7.7384992080414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.926613491527698,
            7.743942310417586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.917172115795276,
            7.747004024606259
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.908932369701526,
            7.7213189554954935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.910992306224964,
            7.722679793070252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.915112179271839,
            7.72574166158683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.919403713695667,
            7.725401455069907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.914511364452503,
            7.721999374830704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.941376369945667,
            7.730674625280431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.7527815031385,
            7.815318479666456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.758961312708813,
            7.820760585104279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.858903741181043,
            7.868375973905288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.846544122040418,
            7.870416511462668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.847230767548231,
            7.8840198383308895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.90319237643495,
            7.898982981305466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.907998894989637,
            7.894562109081643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.887914513886122,
            7.895242246349299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.895982598602918,
            7.891501477524383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.887399529755262,
            7.889631080416034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.878129815399793,
            7.890141189557538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.874696587860731,
            7.896942584619829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.863366936981825,
            7.901533462985392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.864053582489637,
            7.8845299543930905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.864053582489637,
            7.8889509339150505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.768976589357544,
            7.979388034233567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.758676906740357,
            7.978453036663249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.749321361696412,
            7.979303034542826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.766401668703248,
            7.969867959040269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.763140102541138,
            7.969527952257246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.825179549850724,
            7.922434074716952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.823806258835099,
            7.934505528328571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.812133285202286,
            7.925494476749915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.805610152878067,
            7.932635326312114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.797885390915177,
            7.927874773709333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.702488374091898,
            7.85006634388922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.704719971992288,
            7.854997843387006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.734417390205179,
            7.839863055724732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.73390240607432,
            7.849386132468408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.233692287783354,
            7.861121892126288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.227169155459135,
            7.886968411009508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.230259060244292,
            7.901931447231057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.238842129091948,
            7.892749648322979
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.258068203310698,
            7.901591384245188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.212374103678513,
            7.878981545650679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.191088092936326,
            7.879661708540476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.17975844205742,
            7.8742203741406955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.177355182780076,
            7.878641463786742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.159845722330857,
            7.858236041194294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.156069172037888,
            7.863337490978596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.164652240885545,
            7.858576139797426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.175638569010545,
            7.843271426981861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.160875690592576,
            7.8296667649906615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.150576007975388,
            7.832387732950985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.139589679850388,
            7.828646397424149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.140962970866013,
            7.820483366974611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.13855971158867,
            7.811639903732721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.151605976237107,
            7.8068779613321455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.166712177408982,
            7.805177254465492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.156069172037888,
            7.816401791837907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.172205341471482,
            7.81980310722452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.19898451627617,
            7.82490502830708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.205164325846482,
            7.827285903449049
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.371675861491013,
            7.91944928963346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.375109089030076,
            7.918089093791674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.379228962076951,
            7.911628102223947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.342150104655076,
            7.913668426292865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.331507099283982,
            7.913668426292865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.341120136393357,
            7.898025683851744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.406351459635545,
            7.85245432232071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.394335163248826,
            7.8609568222167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.458193195475388,
            7.913838452842747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.464716327799607,
            7.922679736753634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.47540224851494,
            7.893434766497505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.479436290873338,
            7.890799216822926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.446820629252244,
            7.884932933039879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.437207592142869,
            7.893774836199051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.434804332865525,
            7.89530514639264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.498662365092088,
            7.907547423797537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.493512523783494,
            7.90890765442599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.642600429667283,
            7.868778968270686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.640368831766892,
            7.868353855428587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.635476482523728,
            7.868438878031878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.63195742429619,
            7.87932162723526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.62895335019951,
            7.878471422750045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.648780239237595,
            7.882297329182707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.655131710184861,
            7.883147525809561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.662684810770799,
            7.884677875335823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.915542019022752,
            7.983118417705072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.909705532206345,
            7.988898302417526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.902152431620408,
            8.00419760210964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.900435817850877,
            8.017796497409018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.893226040018845,
            8.016096660343335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.897002590311814,
            8.002157728650005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.873313320292283,
            8.001477768561204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.860610378397752,
            7.965438262997436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.85717715085869,
            7.975978447231571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.848594082011033,
            7.976998450648823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.818038356913377,
            8.008617292902294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.82147158445244,
            7.99943788148938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.825248134745408,
            8.00283768760439
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.909018886698533,
            7.929055544835436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.915885341776658,
            7.928715504231601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.928931606425095,
            7.927695380733741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.940604580057908,
            7.921574586643393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.960688961161424,
            7.888928816537446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.958629024637986,
            7.898790831783589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.965838802470017,
            7.904061812340923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.971675289286424,
            7.904401873291415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.982833278788377,
            7.8906291807829945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.987639797343064,
            7.8947100264352725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.992102993143845,
            7.899981059081939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.986609829081345,
            7.890289108493341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.985408199442674,
            7.873285137591768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.972705257548142,
            7.866143261623405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.984378231180955,
            7.859851507077388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.91485537351494,
            7.874815523572569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.913138759745408,
            7.883487603971204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.909705532206345,
            7.890289108493341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.901637447489549,
            7.883657642947208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.894427669657517,
            7.882297329182707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.896830928934861,
            7.873285137591768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.044116390360642,
            7.882637408043042
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.04068316282158,
            7.884507836779093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.033988369120408,
            7.879066566073013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.07089556516533,
            7.864612843624483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.065574062479783,
            7.872434920715379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.055789363993455,
            7.865293030098972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.061454189432908,
            7.876175861920226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.078105342997361,
            7.879576688240351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.078448665751267,
            7.875155608578321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.100764644755174,
            7.879236606865291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.056132686747361,
            7.857470818318556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.003439769219504,
            7.8194244570021185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.006701335381614,
            7.82308084343407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.028073176812278,
            7.823506002566776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.030648097466575,
            7.8287779397914505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.033566340874778,
            7.833199513135121
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.033566340874778,
            7.837961155007334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.032193049859153,
            7.842892798090702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.02927480645095,
            7.84442329612612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.02627073235427,
            7.845783734095748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.024811610650168,
            7.844933460886302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.024639949273215,
            7.842212574933923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.02575574822341,
            7.839576699696278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.024811610650168,
            7.838301270199846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.016486033867942,
            7.841617378759309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.026699885796653,
            7.833539632217551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.037171229790793,
            7.838301270199846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.133746258493836,
            7.952609964113436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.123961560007508,
            7.964000508181155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.127738110300477,
            7.961450413881786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.120699993845399,
            7.9679106219325515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.120871655222352,
            7.982360718105629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.12842475580829,
            7.981340728069136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.195029370066102,
            8.049674415597245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.197604290720399,
            8.047634770420345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.182154766794618,
            8.041345799843075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.182498089548524,
            8.029107523573995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.166533581491883,
            8.041685746692593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.156062237497743,
            8.071429991375226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.15537559198993,
            8.06531135395443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.152285687204774,
            8.058852691782917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.141471020456727,
            8.062421965204697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.144217602487977,
            8.056813092834616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.144560925241883,
            8.03369692041715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.156405560251649,
            8.028937544917122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.141986004587586,
            8.049164505265598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.137522808786805,
            8.054093611583513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.200007549997743,
            8.021628395400702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.188926553079337,
            8.092144136537025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.197166299173087,
            8.088575125814927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.204547738382072,
            8.082456748219595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.217422341653556,
            8.096902768327835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.212444161721915,
            8.098262367085109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.91852000284525,
            8.13497291810457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.933111219886266,
            8.1291951194898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.923326521399938,
            8.130554609006433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.92899134683939,
            8.118998801296655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.939462690833532,
            8.107442661087468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.934827833655797,
            8.09673594074554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.928819685462438,
            8.103533891435186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.617099303505631,
            8.016691792121906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.618472594521256,
            8.01788167707296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.617270964882584,
            8.008872461601461
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.611262816689225,
            8.008107519029165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.6373553459861,
            8.010232355959817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.660872954628678,
            8.02935538898833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.662246245644303,
            8.021366320118915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.665336150429459,
            8.019241541326283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.673404235146256,
            8.00870247448734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.643007393246199,
            8.03029314295532
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#17d418",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #17d418 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([9.87878254270436, 7.74695130214774]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([9.871916087626236, 7.753755032608829]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([9.86504963254811, 7.760218474655216]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([9.874662669657486, 7.809881602813567]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([9.87603596067311, 7.829609154279016]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([9.951566966532486, 7.818725103304143]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([9.943327220438736, 7.825867793804189]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([9.944013865946548, 7.807840768412706]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([9.951566966532486, 7.809201325787645]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([9.949507030009048, 7.794915252502143]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([9.93646076536061, 7.792194040371414]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([9.94023731565358, 7.789812965248722]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([9.851660045145767, 7.794915252502143]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([9.836553843973892, 7.810561878731664]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([9.816297801493423, 7.801037915100404]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([9.79913166379811, 7.811922427244001]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([9.806341441630142, 7.7904932738081145]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([9.790548594950454, 7.802058350154141]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([9.8775514152222, 7.710426538617924]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([9.87806639935306, 7.717741177529125]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([9.87703643109134, 7.724715482821224]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([9.882872917907747, 7.723864963948801]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([9.88630614544681, 7.732029874410151]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([9.89076934124759, 7.732880376834348]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([9.85060057904056, 7.727437131703636]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([9.854377129333528, 7.7194422382127925]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([9.860385277526888, 7.713658603966714]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([9.858497002380403, 7.7111069754799]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([9.85334716107181, 7.710766757185663]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([9.891584732788118, 7.707874890642249]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([9.893987992065462, 7.708215111261088]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([9.938458126537464, 7.731695231261414]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([9.934166592113636, 7.7384992080414]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([9.926613491527698, 7.743942310417586]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([9.917172115795276, 7.747004024606259]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([9.908932369701526, 7.7213189554954935]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([9.910992306224964, 7.722679793070252]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([9.915112179271839, 7.72574166158683]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([9.919403713695667, 7.725401455069907]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([9.914511364452503, 7.721999374830704]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([9.941376369945667, 7.730674625280431]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([9.7527815031385, 7.815318479666456]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([9.758961312708813, 7.820760585104279]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([9.858903741181043, 7.868375973905288]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([9.846544122040418, 7.870416511462668]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([9.847230767548231, 7.8840198383308895]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([9.90319237643495, 7.898982981305466]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([9.907998894989637, 7.894562109081643]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([9.887914513886122, 7.895242246349299]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([9.895982598602918, 7.891501477524383]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([9.887399529755262, 7.889631080416034]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([9.878129815399793, 7.890141189557538]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([9.874696587860731, 7.896942584619829]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([9.863366936981825, 7.901533462985392]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([9.864053582489637, 7.8845299543930905]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([9.864053582489637, 7.8889509339150505]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([9.768976589357544, 7.979388034233567]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([9.758676906740357, 7.978453036663249]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([9.749321361696412, 7.979303034542826]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([9.766401668703248, 7.969867959040269]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([9.763140102541138, 7.969527952257246]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([9.825179549850724, 7.922434074716952]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([9.823806258835099, 7.934505528328571]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([9.812133285202286, 7.925494476749915]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([9.805610152878067, 7.932635326312114]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([9.797885390915177, 7.927874773709333]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([9.702488374091898, 7.85006634388922]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([9.704719971992288, 7.854997843387006]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([9.734417390205179, 7.839863055724732]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([9.73390240607432, 7.849386132468408]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([9.233692287783354, 7.861121892126288]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([9.227169155459135, 7.886968411009508]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([9.230259060244292, 7.901931447231057]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([9.238842129091948, 7.892749648322979]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([9.258068203310698, 7.901591384245188]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([9.212374103678513, 7.878981545650679]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([9.191088092936326, 7.879661708540476]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([9.17975844205742, 7.8742203741406955]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([9.177355182780076, 7.878641463786742]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([9.159845722330857, 7.858236041194294]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([9.156069172037888, 7.863337490978596]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([9.164652240885545, 7.858576139797426]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([9.175638569010545, 7.843271426981861]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([9.160875690592576, 7.8296667649906615]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([9.150576007975388, 7.832387732950985]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([9.139589679850388, 7.828646397424149]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([9.140962970866013, 7.820483366974611]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([9.13855971158867, 7.811639903732721]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([9.151605976237107, 7.8068779613321455]),
            {
              "landcover": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([9.166712177408982, 7.805177254465492]),
            {
              "landcover": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([9.156069172037888, 7.816401791837907]),
            {
              "landcover": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([9.172205341471482, 7.81980310722452]),
            {
              "landcover": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([9.19898451627617, 7.82490502830708]),
            {
              "landcover": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([9.205164325846482, 7.827285903449049]),
            {
              "landcover": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([9.371675861491013, 7.91944928963346]),
            {
              "landcover": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([9.375109089030076, 7.918089093791674]),
            {
              "landcover": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([9.379228962076951, 7.911628102223947]),
            {
              "landcover": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([9.342150104655076, 7.913668426292865]),
            {
              "landcover": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([9.331507099283982, 7.913668426292865]),
            {
              "landcover": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([9.341120136393357, 7.898025683851744]),
            {
              "landcover": 2,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([9.406351459635545, 7.85245432232071]),
            {
              "landcover": 2,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([9.394335163248826, 7.8609568222167]),
            {
              "landcover": 2,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([9.458193195475388, 7.913838452842747]),
            {
              "landcover": 2,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([9.464716327799607, 7.922679736753634]),
            {
              "landcover": 2,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([9.47540224851494, 7.893434766497505]),
            {
              "landcover": 2,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([9.479436290873338, 7.890799216822926]),
            {
              "landcover": 2,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([9.446820629252244, 7.884932933039879]),
            {
              "landcover": 2,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([9.437207592142869, 7.893774836199051]),
            {
              "landcover": 2,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([9.434804332865525, 7.89530514639264]),
            {
              "landcover": 2,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([9.498662365092088, 7.907547423797537]),
            {
              "landcover": 2,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([9.493512523783494, 7.90890765442599]),
            {
              "landcover": 2,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([9.642600429667283, 7.868778968270686]),
            {
              "landcover": 2,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([9.640368831766892, 7.868353855428587]),
            {
              "landcover": 2,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([9.635476482523728, 7.868438878031878]),
            {
              "landcover": 2,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([9.63195742429619, 7.87932162723526]),
            {
              "landcover": 2,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([9.62895335019951, 7.878471422750045]),
            {
              "landcover": 2,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([9.648780239237595, 7.882297329182707]),
            {
              "landcover": 2,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([9.655131710184861, 7.883147525809561]),
            {
              "landcover": 2,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([9.662684810770799, 7.884677875335823]),
            {
              "landcover": 2,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([9.915542019022752, 7.983118417705072]),
            {
              "landcover": 2,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([9.909705532206345, 7.988898302417526]),
            {
              "landcover": 2,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([9.902152431620408, 8.00419760210964]),
            {
              "landcover": 2,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([9.900435817850877, 8.017796497409018]),
            {
              "landcover": 2,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([9.893226040018845, 8.016096660343335]),
            {
              "landcover": 2,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([9.897002590311814, 8.002157728650005]),
            {
              "landcover": 2,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([9.873313320292283, 8.001477768561204]),
            {
              "landcover": 2,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([9.860610378397752, 7.965438262997436]),
            {
              "landcover": 2,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([9.85717715085869, 7.975978447231571]),
            {
              "landcover": 2,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([9.848594082011033, 7.976998450648823]),
            {
              "landcover": 2,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([9.818038356913377, 8.008617292902294]),
            {
              "landcover": 2,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([9.82147158445244, 7.99943788148938]),
            {
              "landcover": 2,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([9.825248134745408, 8.00283768760439]),
            {
              "landcover": 2,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([9.909018886698533, 7.929055544835436]),
            {
              "landcover": 2,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([9.915885341776658, 7.928715504231601]),
            {
              "landcover": 2,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([9.928931606425095, 7.927695380733741]),
            {
              "landcover": 2,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([9.940604580057908, 7.921574586643393]),
            {
              "landcover": 2,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([9.960688961161424, 7.888928816537446]),
            {
              "landcover": 2,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([9.958629024637986, 7.898790831783589]),
            {
              "landcover": 2,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([9.965838802470017, 7.904061812340923]),
            {
              "landcover": 2,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([9.971675289286424, 7.904401873291415]),
            {
              "landcover": 2,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([9.982833278788377, 7.8906291807829945]),
            {
              "landcover": 2,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([9.987639797343064, 7.8947100264352725]),
            {
              "landcover": 2,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([9.992102993143845, 7.899981059081939]),
            {
              "landcover": 2,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([9.986609829081345, 7.890289108493341]),
            {
              "landcover": 2,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([9.985408199442674, 7.873285137591768]),
            {
              "landcover": 2,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([9.972705257548142, 7.866143261623405]),
            {
              "landcover": 2,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([9.984378231180955, 7.859851507077388]),
            {
              "landcover": 2,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([9.91485537351494, 7.874815523572569]),
            {
              "landcover": 2,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([9.913138759745408, 7.883487603971204]),
            {
              "landcover": 2,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([9.909705532206345, 7.890289108493341]),
            {
              "landcover": 2,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([9.901637447489549, 7.883657642947208]),
            {
              "landcover": 2,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([9.894427669657517, 7.882297329182707]),
            {
              "landcover": 2,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([9.896830928934861, 7.873285137591768]),
            {
              "landcover": 2,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([10.044116390360642, 7.882637408043042]),
            {
              "landcover": 2,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([10.04068316282158, 7.884507836779093]),
            {
              "landcover": 2,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([10.033988369120408, 7.879066566073013]),
            {
              "landcover": 2,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([10.07089556516533, 7.864612843624483]),
            {
              "landcover": 2,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([10.065574062479783, 7.872434920715379]),
            {
              "landcover": 2,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([10.055789363993455, 7.865293030098972]),
            {
              "landcover": 2,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([10.061454189432908, 7.876175861920226]),
            {
              "landcover": 2,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([10.078105342997361, 7.879576688240351]),
            {
              "landcover": 2,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([10.078448665751267, 7.875155608578321]),
            {
              "landcover": 2,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([10.100764644755174, 7.879236606865291]),
            {
              "landcover": 2,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([10.056132686747361, 7.857470818318556]),
            {
              "landcover": 2,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([10.003439769219504, 7.8194244570021185]),
            {
              "landcover": 2,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([10.006701335381614, 7.82308084343407]),
            {
              "landcover": 2,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([10.028073176812278, 7.823506002566776]),
            {
              "landcover": 2,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([10.030648097466575, 7.8287779397914505]),
            {
              "landcover": 2,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([10.033566340874778, 7.833199513135121]),
            {
              "landcover": 2,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([10.033566340874778, 7.837961155007334]),
            {
              "landcover": 2,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([10.032193049859153, 7.842892798090702]),
            {
              "landcover": 2,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([10.02927480645095, 7.84442329612612]),
            {
              "landcover": 2,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([10.02627073235427, 7.845783734095748]),
            {
              "landcover": 2,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([10.024811610650168, 7.844933460886302]),
            {
              "landcover": 2,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([10.024639949273215, 7.842212574933923]),
            {
              "landcover": 2,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([10.02575574822341, 7.839576699696278]),
            {
              "landcover": 2,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([10.024811610650168, 7.838301270199846]),
            {
              "landcover": 2,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([10.016486033867942, 7.841617378759309]),
            {
              "landcover": 2,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([10.026699885796653, 7.833539632217551]),
            {
              "landcover": 2,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([10.037171229790793, 7.838301270199846]),
            {
              "landcover": 2,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([10.133746258493836, 7.952609964113436]),
            {
              "landcover": 2,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([10.123961560007508, 7.964000508181155]),
            {
              "landcover": 2,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([10.127738110300477, 7.961450413881786]),
            {
              "landcover": 2,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([10.120699993845399, 7.9679106219325515]),
            {
              "landcover": 2,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([10.120871655222352, 7.982360718105629]),
            {
              "landcover": 2,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([10.12842475580829, 7.981340728069136]),
            {
              "landcover": 2,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([10.195029370066102, 8.049674415597245]),
            {
              "landcover": 2,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([10.197604290720399, 8.047634770420345]),
            {
              "landcover": 2,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([10.182154766794618, 8.041345799843075]),
            {
              "landcover": 2,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([10.182498089548524, 8.029107523573995]),
            {
              "landcover": 2,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([10.166533581491883, 8.041685746692593]),
            {
              "landcover": 2,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([10.156062237497743, 8.071429991375226]),
            {
              "landcover": 2,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([10.15537559198993, 8.06531135395443]),
            {
              "landcover": 2,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([10.152285687204774, 8.058852691782917]),
            {
              "landcover": 2,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([10.141471020456727, 8.062421965204697]),
            {
              "landcover": 2,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([10.144217602487977, 8.056813092834616]),
            {
              "landcover": 2,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([10.144560925241883, 8.03369692041715]),
            {
              "landcover": 2,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([10.156405560251649, 8.028937544917122]),
            {
              "landcover": 2,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([10.141986004587586, 8.049164505265598]),
            {
              "landcover": 2,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([10.137522808786805, 8.054093611583513]),
            {
              "landcover": 2,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([10.200007549997743, 8.021628395400702]),
            {
              "landcover": 2,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([10.188926553079337, 8.092144136537025]),
            {
              "landcover": 2,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([10.197166299173087, 8.088575125814927]),
            {
              "landcover": 2,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([10.204547738382072, 8.082456748219595]),
            {
              "landcover": 2,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([10.217422341653556, 8.096902768327835]),
            {
              "landcover": 2,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([10.212444161721915, 8.098262367085109]),
            {
              "landcover": 2,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([9.91852000284525, 8.13497291810457]),
            {
              "landcover": 2,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([9.933111219886266, 8.1291951194898]),
            {
              "landcover": 2,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([9.923326521399938, 8.130554609006433]),
            {
              "landcover": 2,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Point([9.92899134683939, 8.118998801296655]),
            {
              "landcover": 2,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Point([9.939462690833532, 8.107442661087468]),
            {
              "landcover": 2,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Point([9.934827833655797, 8.09673594074554]),
            {
              "landcover": 2,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Point([9.928819685462438, 8.103533891435186]),
            {
              "landcover": 2,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Point([9.617099303505631, 8.016691792121906]),
            {
              "landcover": 2,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Point([9.618472594521256, 8.01788167707296]),
            {
              "landcover": 2,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Point([9.617270964882584, 8.008872461601461]),
            {
              "landcover": 2,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Point([9.611262816689225, 8.008107519029165]),
            {
              "landcover": 2,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Point([9.6373553459861, 8.010232355959817]),
            {
              "landcover": 2,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Point([9.660872954628678, 8.02935538898833]),
            {
              "landcover": 2,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Point([9.662246245644303, 8.021366320118915]),
            {
              "landcover": 2,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Point([9.665336150429459, 8.019241541326283]),
            {
              "landcover": 2,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Point([9.673404235146256, 8.00870247448734]),
            {
              "landcover": 2,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Point([9.643007393246199, 8.03029314295532]),
            {
              "landcover": 2,
              "system:index": "222"
            })]),
    baresurface = ui.import && ui.import("baresurface", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            9.384966604366753,
            7.9130059966404005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.386339895382378,
            7.913176023463542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.38925813879058,
            7.916236494286102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.40977167333648,
            7.905524747014272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.40651010717437,
            7.907650115821298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.342683727304824,
            7.848158422142291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.35178178028334,
            7.854025226364422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.352897579233534,
            7.856490959931423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.397615367929824,
            7.855385632901466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.396070415537245,
            7.857171159718172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.393667156259902,
            7.856235884724126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.380191738169081,
            7.86006199637858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.670041973154433,
            7.988428743897802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.672016078989394,
            7.994888525642539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.673646862070449,
            7.989788706445761
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.676479274790175,
            8.003728061202798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.670728618662245,
            8.0028781141895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.659656459848769,
            8.002028165403553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.660085613291152,
            8.002538134887828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.79647057728041,
            8.017921914167248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.7932090111183,
            8.010527573471776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.78745835499037,
            8.02676094964098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.789518291513808,
            8.04035909021075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.787115032236464,
            8.040189116265628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.776128704111464,
            8.042568745015023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.770120555918105,
            8.042568745015023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.768575603525527,
            8.042568745015023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.796041423838027,
            8.040699037887327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.798788005869277,
            8.037809473555582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.801362926523574,
            8.037639498542188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.659742290537245,
            8.043758554153216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.656995708505995,
            8.048857696619288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.669698650400527,
            8.024041266888966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.564016063750355,
            8.070089559230812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.568307598174183,
            8.073913673258158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.571826656401722,
            8.073233833410125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.57637568289098,
            8.070939365476093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.579465587676136,
            8.070854384931986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.59036608511266,
            8.068644884512462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.629848201811878,
            8.06091153794329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.614742000640003,
            8.063715955438756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.487283428252308,
            8.055217660807969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.501874645293324,
            8.064055883510813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.542730053008167,
            8.092098964180806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.545991619170277,
            8.093628530700574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.523847301543324,
            8.071024346002327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.526250560820667,
            8.072893913057019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.48848505789098,
            8.067115223299822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.491574962676136,
            8.06779507344232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.49895640188512,
            8.062696169508303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.467199047148792,
            8.041110097952416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.47200556570348,
            8.043319748664624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.460675914824574,
            8.047739013959607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.451749523223011,
            8.03941035844306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.062674560870972,
            8.092716819669024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.063275375690308,
            8.091102273408328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.072888412799683,
            8.085408821826771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.072888412799683,
            8.083539312731544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.010232010211793,
            8.10104437656537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.008086242999878,
            8.095096139208747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.008257904376832,
            8.096880619641167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.003623047199097,
            8.099514838209059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.001219787921753,
            8.099599812714642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.015811004962769,
            8.095181114646703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.019415893878785,
            8.090082556647932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.02027420076355,
            8.085748731640384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.095834635253018,
            8.18983123412369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.095920465941495,
            8.184648924253473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.090942286009854,
            8.193739160887061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.08853902673251,
            8.1821851795208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.069484613890713,
            8.175558480184273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.966277718277636,
            8.245149793560415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.941129326554003,
            8.269612764654708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.943875908585253,
            8.26689473163675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.923877358170214,
            8.262817646984821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.921302437515918,
            8.259335103813546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.333935384798968,
            7.861411816547494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.331017141390765,
            7.86481276401005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.330845480013812,
            7.8719546628999195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.333935384798968,
            7.873315010641447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.326725606966937,
            7.862092008270279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.39504683499428,
            7.854439787121691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.405650765457224,
            8.022497095148442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.393548638382029,
            8.011873119732705
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#fffd3a",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fffd3a */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([9.384966604366753, 7.9130059966404005]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([9.386339895382378, 7.913176023463542]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([9.38925813879058, 7.916236494286102]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([9.40977167333648, 7.905524747014272]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([9.40651010717437, 7.907650115821298]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([9.342683727304824, 7.848158422142291]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([9.35178178028334, 7.854025226364422]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([9.352897579233534, 7.856490959931423]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([9.397615367929824, 7.855385632901466]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([9.396070415537245, 7.857171159718172]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([9.393667156259902, 7.856235884724126]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([9.380191738169081, 7.86006199637858]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([9.670041973154433, 7.988428743897802]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([9.672016078989394, 7.994888525642539]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([9.673646862070449, 7.989788706445761]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([9.676479274790175, 8.003728061202798]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([9.670728618662245, 8.0028781141895]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([9.659656459848769, 8.002028165403553]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([9.660085613291152, 8.002538134887828]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([9.79647057728041, 8.017921914167248]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([9.7932090111183, 8.010527573471776]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([9.78745835499037, 8.02676094964098]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([9.789518291513808, 8.04035909021075]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([9.787115032236464, 8.040189116265628]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([9.776128704111464, 8.042568745015023]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([9.770120555918105, 8.042568745015023]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([9.768575603525527, 8.042568745015023]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([9.796041423838027, 8.040699037887327]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([9.798788005869277, 8.037809473555582]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([9.801362926523574, 8.037639498542188]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([9.659742290537245, 8.043758554153216]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([9.656995708505995, 8.048857696619288]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([9.669698650400527, 8.024041266888966]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([9.564016063750355, 8.070089559230812]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([9.568307598174183, 8.073913673258158]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([9.571826656401722, 8.073233833410125]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([9.57637568289098, 8.070939365476093]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([9.579465587676136, 8.070854384931986]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([9.59036608511266, 8.068644884512462]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([9.629848201811878, 8.06091153794329]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([9.614742000640003, 8.063715955438756]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([9.487283428252308, 8.055217660807969]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([9.501874645293324, 8.064055883510813]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([9.542730053008167, 8.092098964180806]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([9.545991619170277, 8.093628530700574]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([9.523847301543324, 8.071024346002327]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([9.526250560820667, 8.072893913057019]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([9.48848505789098, 8.067115223299822]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([9.491574962676136, 8.06779507344232]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([9.49895640188512, 8.062696169508303]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([9.467199047148792, 8.041110097952416]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([9.47200556570348, 8.043319748664624]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([9.460675914824574, 8.047739013959607]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([9.451749523223011, 8.03941035844306]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([10.062674560870972, 8.092716819669024]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([10.063275375690308, 8.091102273408328]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([10.072888412799683, 8.085408821826771]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([10.072888412799683, 8.083539312731544]),
            {
              "landcover": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([10.010232010211793, 8.10104437656537]),
            {
              "landcover": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([10.008086242999878, 8.095096139208747]),
            {
              "landcover": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([10.008257904376832, 8.096880619641167]),
            {
              "landcover": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([10.003623047199097, 8.099514838209059]),
            {
              "landcover": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([10.001219787921753, 8.099599812714642]),
            {
              "landcover": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([10.015811004962769, 8.095181114646703]),
            {
              "landcover": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([10.019415893878785, 8.090082556647932]),
            {
              "landcover": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([10.02027420076355, 8.085748731640384]),
            {
              "landcover": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([10.095834635253018, 8.18983123412369]),
            {
              "landcover": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([10.095920465941495, 8.184648924253473]),
            {
              "landcover": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([10.090942286009854, 8.193739160887061]),
            {
              "landcover": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([10.08853902673251, 8.1821851795208]),
            {
              "landcover": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([10.069484613890713, 8.175558480184273]),
            {
              "landcover": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([9.966277718277636, 8.245149793560415]),
            {
              "landcover": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([9.941129326554003, 8.269612764654708]),
            {
              "landcover": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([9.943875908585253, 8.26689473163675]),
            {
              "landcover": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([9.923877358170214, 8.262817646984821]),
            {
              "landcover": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([9.921302437515918, 8.259335103813546]),
            {
              "landcover": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([9.333935384798968, 7.861411816547494]),
            {
              "landcover": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([9.331017141390765, 7.86481276401005]),
            {
              "landcover": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([9.330845480013812, 7.8719546628999195]),
            {
              "landcover": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([9.333935384798968, 7.873315010641447]),
            {
              "landcover": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([9.326725606966937, 7.862092008270279]),
            {
              "landcover": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([9.39504683499428, 7.854439787121691]),
            {
              "landcover": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([9.405650765457224, 8.022497095148442]),
            {
              "landcover": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([9.393548638382029, 8.011873119732705]),
            {
              "landcover": 3,
              "system:index": "83"
            })]),
    waterbody = ui.import && ui.import("waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            9.93223828172399,
            8.270858763171937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.027502872095345,
            8.194662161032385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.026043750391244,
            8.200608918661795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.027520467213428,
            8.155797003925553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.025288869313037,
            8.156986478479839
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.02374391692046,
            8.158260911574507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.022885610035694,
            8.162593953695326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.031640340260303,
            8.171089978259927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.031897832325733,
            8.174743213218663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.025803853443897,
            8.178991118768826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.081742553232758,
            8.109492685474423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.076850203989594,
            8.115695623352567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.065348891733734,
            8.12465997394353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.041801266026962,
            7.8396071838459775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.038024715733993,
            7.848109946602204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.033733181310165,
            7.855932334732723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.031501583409774,
            7.863244433867757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.031329922032821,
            7.868685912380848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.038196377110946,
            7.868685912380848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.047466091466415,
            7.871746712661241
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.054246715856063,
            7.878803471593519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.051671795201766,
            7.887050374791355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.055276684117782,
            7.893681785928744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.057250789952743,
            7.898740290829523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.056220821691024,
            7.902140931567004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.061485519575427,
            7.973387082914449
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.060283889936755,
            7.980017101658597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.067836990522693,
            7.983672066010317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.079861240280614,
            8.032936970091368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.081406192673192,
            8.043815353458609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.078316287888036,
            8.023078183371666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.206233089408093,
            7.913475123040717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.201769893607311,
            7.9104146317158035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.196105068167858,
            7.908374291545926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.188380306204968,
            7.905993881924849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.212756221732311,
            7.915175386180757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.215846126517468,
            7.92078620476427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.297385280570202,
            7.960909827519091
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.295497005423718,
            7.954959537917498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.292750423392468,
            7.950369255505126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.288630550345593,
            7.948499125721953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.282279079398327,
            7.948499125721953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.275240962943249,
            7.948499125721953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.270434444388561,
            7.948499125721953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.267344539603405,
            7.947819076414878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.254813259085827,
            7.941868596919311
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.333090846976452,
            7.98097016672514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.333262508353405,
            7.976210175248907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.333777492484264,
            7.9721301384520515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.33412081523817,
            7.969070084151154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.33240420146864,
            7.966350016676357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.32588106914442,
            7.965669996983795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.319014614066296,
            7.963459925183831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.315238063773327,
            7.962949906920901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.307856624564343,
            7.963459925183831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.43253504749543,
            8.035378528371126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.436654920542304,
            8.037588210303683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.440946454966133,
            8.038608059444822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.458627576792304,
            8.043197348849425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.457769269907539,
            8.038608059444822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.455366010630195,
            8.036228407461387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.467038984263008,
            8.050336140221459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.47270380970246,
            8.056624971253964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.518537397348945,
            8.070562032249772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.516477460825508,
            8.069202340129847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.514760847055976,
            8.067672681026895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.53038203235871,
            8.083308923260313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.548406476938789,
            8.08959724117612
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
      },
      "color": "#172eff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #172eff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([9.93223828172399, 8.270858763171937]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([10.027502872095345, 8.194662161032385]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([10.026043750391244, 8.200608918661795]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([10.027520467213428, 8.155797003925553]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([10.025288869313037, 8.156986478479839]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([10.02374391692046, 8.158260911574507]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([10.022885610035694, 8.162593953695326]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([10.031640340260303, 8.171089978259927]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([10.031897832325733, 8.174743213218663]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([10.025803853443897, 8.178991118768826]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([10.081742553232758, 8.109492685474423]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([10.076850203989594, 8.115695623352567]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([10.065348891733734, 8.12465997394353]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([10.041801266026962, 7.8396071838459775]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([10.038024715733993, 7.848109946602204]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([10.033733181310165, 7.855932334732723]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([10.031501583409774, 7.863244433867757]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([10.031329922032821, 7.868685912380848]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([10.038196377110946, 7.868685912380848]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([10.047466091466415, 7.871746712661241]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([10.054246715856063, 7.878803471593519]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([10.051671795201766, 7.887050374791355]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([10.055276684117782, 7.893681785928744]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([10.057250789952743, 7.898740290829523]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([10.056220821691024, 7.902140931567004]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([10.061485519575427, 7.973387082914449]),
            {
              "landcover": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([10.060283889936755, 7.980017101658597]),
            {
              "landcover": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([10.067836990522693, 7.983672066010317]),
            {
              "landcover": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([10.079861240280614, 8.032936970091368]),
            {
              "landcover": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([10.081406192673192, 8.043815353458609]),
            {
              "landcover": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([10.078316287888036, 8.023078183371666]),
            {
              "landcover": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([9.206233089408093, 7.913475123040717]),
            {
              "landcover": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([9.201769893607311, 7.9104146317158035]),
            {
              "landcover": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([9.196105068167858, 7.908374291545926]),
            {
              "landcover": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([9.188380306204968, 7.905993881924849]),
            {
              "landcover": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([9.212756221732311, 7.915175386180757]),
            {
              "landcover": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([9.215846126517468, 7.92078620476427]),
            {
              "landcover": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([9.297385280570202, 7.960909827519091]),
            {
              "landcover": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([9.295497005423718, 7.954959537917498]),
            {
              "landcover": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([9.292750423392468, 7.950369255505126]),
            {
              "landcover": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([9.288630550345593, 7.948499125721953]),
            {
              "landcover": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([9.282279079398327, 7.948499125721953]),
            {
              "landcover": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([9.275240962943249, 7.948499125721953]),
            {
              "landcover": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([9.270434444388561, 7.948499125721953]),
            {
              "landcover": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([9.267344539603405, 7.947819076414878]),
            {
              "landcover": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([9.254813259085827, 7.941868596919311]),
            {
              "landcover": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([9.333090846976452, 7.98097016672514]),
            {
              "landcover": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([9.333262508353405, 7.976210175248907]),
            {
              "landcover": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([9.333777492484264, 7.9721301384520515]),
            {
              "landcover": 4,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([9.33412081523817, 7.969070084151154]),
            {
              "landcover": 4,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([9.33240420146864, 7.966350016676357]),
            {
              "landcover": 4,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([9.32588106914442, 7.965669996983795]),
            {
              "landcover": 4,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([9.319014614066296, 7.963459925183831]),
            {
              "landcover": 4,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([9.315238063773327, 7.962949906920901]),
            {
              "landcover": 4,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([9.307856624564343, 7.963459925183831]),
            {
              "landcover": 4,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([9.43253504749543, 8.035378528371126]),
            {
              "landcover": 4,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([9.436654920542304, 8.037588210303683]),
            {
              "landcover": 4,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([9.440946454966133, 8.038608059444822]),
            {
              "landcover": 4,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([9.458627576792304, 8.043197348849425]),
            {
              "landcover": 4,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([9.457769269907539, 8.038608059444822]),
            {
              "landcover": 4,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([9.455366010630195, 8.036228407461387]),
            {
              "landcover": 4,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([9.467038984263008, 8.050336140221459]),
            {
              "landcover": 4,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([9.47270380970246, 8.056624971253964]),
            {
              "landcover": 4,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([9.518537397348945, 8.070562032249772]),
            {
              "landcover": 4,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([9.516477460825508, 8.069202340129847]),
            {
              "landcover": 4,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([9.514760847055976, 8.067672681026895]),
            {
              "landcover": 4,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([9.53038203235871, 8.083308923260313]),
            {
              "landcover": 4,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([9.548406476938789, 8.08959724117612]),
            {
              "landcover": 4,
              "system:index": "67"
            })]);
//Determine Land Cover in 2001//
//load Landsat 7 Tier 1 TOA image collection
var landsat_7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA")
    .filterBounds(table)
    .filterDate('2001-11-01', '2001-12-31')
    .sort('CLOUD_COVER')
    .median();
    //clip by asset/table
var landsat_2001 = landsat_7.clip(table);
//Display the cliped image collection with visual parameters 
Map.addLayer(landsat_2001, {
  bands: ['B5', 'B4', 'B3'], min: 0, max: 0.3, gamma: 1.4}, 'landsat_2001');
//Merge feature
var classNames = urban.merge(vegetation).merge(baresurface).merge(waterbody);
print(classNames)
var bands = ['B5', 'B4', 'B3'];
var training = landsat_2001.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);
// Train a CART classifier with default parameters.
var classifier = ee.Classifier.smileCart().train(training, 'landcover', bands);
//Run the classification
var classified = landsat_2001.select(bands).classify(classifier);
//Display classification
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 1, max: 4, palette: ['red', 'green', 'yellow','blue']},
'classification');
Export.image.toDrive({
  image:classified,
  description:"2009image",
  fileNamePrefix:"2009image",
  scale:20,
  folder:"johnbulus",
  region:table,
  fileFormat:"GeoTIFF"
})                
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['ff0000', '00ff00', 'FFFF00','0000ff'];
// name of the legend
var names = ['Builtup','Vegetation','Baresurface','waterbody'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);