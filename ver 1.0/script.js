document.addEventListener("DOMContentLoaded", function () {
  const bookmarkContainer = document.getElementById("bookmark-container");

  // Fetch bookmarks from the text file
  fetch("bookmarks.txt")
    .then((response) => response.text())
    .then((data) => {
      const bookmarks = parseBookmarks(data);
      renderBookmarks(bookmarks);
    })
    .catch((error) => console.error("Error fetching bookmarks:", error));

  function parseBookmarks(data) {
    const lines = data.split("\n");
    const bookmarks = [];

    for (const line of lines) {
      const [name, link, imagePath] = line.split("|");
      if (name && link && imagePath) {
        bookmarks.push({ name, link, imagePath });
      }
    }

    return bookmarks;
  }

  function renderBookmarks(bookmarks) {
    for (const bookmark of bookmarks) {
      const card = createBookmarkCard(bookmark);
      bookmarkContainer.appendChild(card);
    }
  }

  function createBookmarkCard(bookmark) {
    const card = document.createElement("div");
    card.classList.add("card");

    const link = document.createElement("a");
    link.href = bookmark.link;
    link.target = "_blank";

    const image = document.createElement("img");
    image.src = bookmark.imagePath;
    image.alt = bookmark.name;

    const title = document.createElement("h3");
    title.textContent = bookmark.name;

    link.appendChild(image);
    link.appendChild(title);
    card.appendChild(link);

    return card;
  }

  // Ambil referensi ke elemen tabel
  var table = document.getElementById("dataTable");
  // Lokasi file teks di root (pastikan file memiliki izin CORS)
  var filePath = "schedule.txt";

  // Buat objek XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Set up callback function when the file is loaded
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Jika permintaan berhasil, proses file teks
      var data = xhr.responseText;
      processData(data);
    } else {
      // Jika terjadi kesalahan, tampilkan pesan kesalahan
      console.error("Failed to load the text file. Status: " + xhr.status);
    }
  };

  // Kirim permintaan ke server untuk membaca file teks
  xhr.open("GET", filePath, true);
  xhr.send();

  function processData(data) {
    var lines = data.split("\n");

    // Loop melalui setiap baris data
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();

      // Pisahkan data dalam satu baris berdasarkan pemisah (misalnya, koma)
      var rowData = line.split(",");

      // Buat elemen baris baru
      var row = table.insertRow();

      // Loop melalui setiap data dalam satu baris
      for (var j = 0; j < rowData.length; j++) {
        // Tambahkan data ke sel dalam baris
        var cell = row.insertCell(j);

        // Cek apakah terdapat tautan di antara (* dan *)
        var linkRegex = /\(\*(.*?)\*\)/g;
        var matches = rowData[j].match(linkRegex);

        // Jika terdapat tautan, buat elemen <a> dan tambahkan ke dalam sel
        if (matches) {
          // Ambil teks sebelum tanda kurung
          var textBeforeLink = rowData[j].split("(*")[0];

          // Ambil tautan di antara tanda kurung
          var linkText = matches[0].replace(/\(\*(.*?)\*\)/, "$1");

          // Buat elemen <a> dan tambahkan ke dalam sel
          var anchor = document.createElement("a");
          anchor.href = linkText;
          anchor.textContent = textBeforeLink;
          anchor.target = "_blank";

          // Tambahkan elemen <a> ke dalam sel
          cell.appendChild(anchor);
        } else {
          // Jika tidak ada tautan, tambahkan teks ke dalam sel
          cell.textContent = rowData[j];
        }
      }
    }
  }
});
