function gantiKarakter(string, string2) {
  return string.replace(/66#2/g, string2);
}

const bagasDribble =
  "gua ketika jadi anak basket, di sekolah ❤ eh vin vin, tangkep ya 🌾 ah shit, sori sori sori 🥺 ih 😮 guys guys!! itu kan kak 66#2?!??! 😍 kak 66#2 💋 kak 66#2 😘 minta foto dong 🥺 eh 😦 uh 😳 s-s-sori, ee 😊 kalian manggil aku ya barusan? 😳 ih! Kak 66#2 🥺 suaranya ih 😍 berdamage banget 🤤 jadi suka🥰 eh 🫣 engga engga, ngga 🥱 itu emang 😊 suara asli aku aja sih kaya gitu 😘 sori ya 🥺 sori kalo misalnya 🤔 aku bikin kalian 😦 gemeteran 🥺 ih 😍 kak 66#2 ih, aku ngefans banget 😍 tutor dong kak, dribblenya 🥺🏀 ah, t-t-tutor dribble? 🏀 yaelah 😂 itu mah gampang banget sih nih 🔥 yaudah, sini aku langsung tutor ya 💯 * dribble * 🥵🥵🥵🥵 ih, ganteng banget ih 🤤 eh eh, udah ih 😰 udah ih😭 p-p-plis jangan puji-puji aku terus 🥵 aku jadi ga enak 🫣 sama yang lain kalo di gituin 😭 ih kak 66#2😍 aku tuh ngefans loh sama kakk 😳 boleh minta foto ga sih kak? 🤔😍 foto? 🤨 ya ampun 🥱 kalo mau minta foto mah 😂 tinggal foto aja 🥰 gausah kaya gini ";

function ambilTeksDanPaste() {
  // Ambil teks dari elemen dengan ID "sourceText"
  const teksSumber = document.getElementById("input-text").value;

  // Panggil fungsi lain dengan teks sebagai parameter
  const hasil = gantiKarakter(bagasDribble, teksSumber);

  // Tampilkan hasil di elemen dengan ID "targetText"
  document.getElementById("result").textContent = hasil;
}

function copyToClipboard() {
  // Mengambil teks dari elemen dengan ID "myText"
  const teks = document.getElementById("result").textContent;

  // Buat elemen textarea sementara untuk menampung teks
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = teks;

  // Tambahkan elemen textarea ke dalam dokumen
  document.body.appendChild(tempTextArea);

  // Pilih teks dalam elemen textarea
  tempTextArea.select();

  // Salin teks ke clipboard
  document.execCommand("copy");

  // Hapus elemen textarea sementara
  document.body.removeChild(tempTextArea);

  // Beritahu pengguna bahwa teks telah disalin
  alert("Teks telah disalin ke clipboard!");
}
