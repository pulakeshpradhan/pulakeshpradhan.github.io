var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.16905167201331,
                -7.280972035537921
              ],
              [
                110.58604385951331,
                -7.346353699564638
              ],
              [
                110.52012589076331,
                -6.430173390217501
              ],
              [
                106.86167862513831,
                -6.637557692926434
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[108.16905167201331, -7.280972035537921],
          [110.58604385951331, -7.346353699564638],
          [110.52012589076331, -6.430173390217501],
          [106.86167862513831, -6.637557692926434]]]);
// Hal pertama yang dilakukan dalam seluruh bahasa pemrograman:
print('Hello, World!');
// Baris komentar dimulai dengan dua garis miring. Seperti dalam baris ini
/* Multi baris komentar dimulai dengan garis miring dan bintang,
dan diakhiri dengan bintang dan garis miring. */
// Variabel digunakan untuk menyimpan objek, dan untuk mendefinisikannya digunkan kerword var.
var jawaban = 42;
// Objek string diawali dan diakhiri dengan tanda petik satu.
var variabelku = 'aku string';
// Objek string dapat juga dimulai dan diakhiri dengan tanda petik dua.
// Namun jangan mencampurnya.
var my_other_variable = "aku juga string";
//var variabel_gagal = 'aku string yang salah";
// Satiap pernyataan sebaiknya diakhiri tanda titik koma atau akan ada tanda i dari editor.
var test = 'I feel incomplete...'
// Tanda kurung digunakan untuk meneruskan parameter ke fungsi (functions).
print('String ini akan diprint di tab konsol.');
// Tanda kurung persegi digunakan untuk memilih item dalam daftar (list).
// Indeks nol mengacu pada item pertama dalam daftar (list).
var daftarku = ['jambu', 'apel', 'pisang'];
print(daftarku[0]);
// Tanda kurung kurawal (atau tanda kurung) dapat digunakan untuk mendefinisikan kamus (kunci: pasangan nilai)
var kamusku = {'makanan': 'nasi', 'warna': 'hijau', 'nomor': 8};
// Tanda kurung siku dapat digunakan untuk mengakses item kamus dengan kunci.
print(kamusku['warna']);
// Atau Anda dapat menggunakan notasi titik untuk mendapatkan hasil yang sama.
print(kamusku.warna);
// Fungsi dapat didefinisikan sebagai cara untuk menggunakan kembali kode dan membuatnya lebih mudah dibaca
var hello_fungsi = function(string) {
  return 'Hello ' + string + '!';
};
print(hello_fungsi('world'));