function toggleNavbar() {
  var navList = document.getElementById("navList");
  if (navList.style.display === "block") {
    navList.style.display = "none";
  } else {
    navList.style.display = "block";
  }
}

const mainbody = document.body;
const contentContainer = document.getElementById("content-container");
const title = document.getElementById("title");
const contentElement = document.getElementById("content");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const nextButton2 = document.getElementById("nextButton2");
const prevButton2 = document.getElementById("prevButton2");
const goButton = document.getElementById("goButton");
const toggleModeButton = document.getElementById("toggleModeButton");
const increaseFontSizeButton = document.getElementById(
  "increaseFontSizeButton"
);
const decreaseFontSizeButton = document.getElementById(
  "decreaseFontSizeButton"
);
const pageNumberInput = document.getElementById("pageNumberInput");
const titleElement = document.getElementById("title");

var buttons = document.getElementsByClassName("navButton");

let currentPage = 1;
let darkMode = false;
let fontSize = 16; // Ukuran font awal

let theme = 0;
function themeChange() {
  if (theme == 0) {
    theme = 1;
    mainbody.classList.add("light-mode");
    contentContainer.classList.add("light-mode");
    contentElement.classList.add("light-mode");
    title.classList.add("light");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.add("light-mode");
    }
  } else {
    theme = 0;
    mainbody.classList.remove("light-mode");
    contentContainer.classList.remove("light-mode");
    contentElement.classList.remove("light-mode");
    title.classList.remove("light");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("light-mode");
    }
  }
}

function loadContent(pageNumber) {
  const filename = `content/golden keikenchi/page${pageNumber}.txt`;
  fetch(filename)
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split("\n");
      const title = lines[0].trim();
      titleElement.textContent = title;
      contentElement.innerHTML = highlightText(lines.slice(1).join("<br>"));
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      titleElement.textContent = "Error loading content.";
      contentElement.innerHTML = "";
    });
}

function highlightText(text) {
  //   return text;
  // Temukan teks yang diapit oleh '[' dan ']'
  const regex = /\[(.*?)\]/g;
  text.replace(/<</g, "&lt;").replace(/>>/g, "&gt;");
  return text
    .replace(regex, '<span class="highlight"> [ $1 ] </span>')
    .replace(/<</g, "&lt;&lt;")
    .replace(/>>/g, "&gt;&gt;");
  //   return text;
}

function nextPage() {
  currentPage++;
  loadContent(currentPage);
  updateUrl();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadContent(currentPage);
    updateUrl();
  }
}

function goToPage() {
  const pageNumber = parseInt(pageNumberInput.value, 10);
  if (!isNaN(pageNumber) && pageNumber > 0) {
    currentPage = pageNumber;
    loadContent(currentPage);
    pageNumberInput.value = "";
  }
}

function updateUrl() {
  // Menggunakan window.location.search untuk mengambil parameter query saat ini
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set("page", currentPage);

  // Mengganti URL tanpa mereload halaman
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${queryParams}`
  );
}

// Fungsi untuk mendapatkan nilai parameter query dari URL
function getQueryParam(name) {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(name);
}

// Load initial content
// Cek apakah ada parameter "page" dalam URL, jika ada, gunakan nilainya sebagai currentPage
const initialPage = getQueryParam("page");
currentPage = initialPage ? parseInt(initialPage, 10) : 1;
loadContent(currentPage);

function toggleMode() {
  darkMode = !darkMode;
  contentContainer.classList.toggle("dark-mode", darkMode);
  const modeIcon = document.getElementById("modeIcon");
  modeIcon.textContent = darkMode ? "🌜" : "🌞";
}

function formatText(text) {
  // Temukan dan tandai teks diapit dengan [ dan ], ubah warnanya menjadi hijau
  const regex = /\[(.*?)\]/g;
  const formattedText = text.replace(
    regex,
    '<span style="color: green;">[$1]</span>'
  );
  return formattedText;
}

function changeFontSize(action) {
  if (action === "increase") {
    fontSize += 2;
  } else if (action === "decrease") {
    fontSize = Math.max(10, fontSize - 2); // Menetapkan ukuran font minimum
  }
  contentContainer.style.fontSize = `${fontSize}px`;
}

function scrollToTop() {
  window.scrollTo({ top: 0 });
}

// Load initial content
loadContent(currentPage);
themeChange();

// Add event listeners for the next, previous, go, toggle mode, increase, and decrease buttons
nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", prevPage);
nextButton2.addEventListener("click", function () {
  nextPage();
  scrollToTop();
});
prevButton2.addEventListener("click", function () {
  scrollToTop();
  prevPage();
});
goButton.addEventListener("click", goToPage);
toggleModeButton.addEventListener("click", toggleMode);
increaseFontSizeButton.addEventListener("click", () =>
  changeFontSize("increase")
);
decreaseFontSizeButton.addEventListener("click", () =>
  changeFontSize("decrease")
);
