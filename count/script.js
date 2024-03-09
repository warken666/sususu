var table = document.getElementById("verticalTable");

let currentDate = new Date();
let middleDate = new Date(currentDate);

let brElement = document.createElement("div");
brElement.innerHTML = `<br>`;

function generateCalendar() {
  var table = document.getElementById("verticalTable");
  var rowCount = 7;

  for (var i = 0; i < rowCount; i++) {
    var row = table.insertRow(i);

    var cellDate = row.insertCell();
    dateItem(cellDate, i);
    var cell = row.insertCell();
    cell.innerHTML = dayOrder(i);
    if (table.rows[i].cells[0].classList.contains("highlight")) {
      table.rows[i].cells[1].classList.add("highlight");
    }
    cell.classList.add("day");
  }
}

function dateItem(cellDate, rowIndex) {
  const currentDay = new Date(middleDate);
  currentDay.setDate(middleDate.getDate() + rowIndex - 3);

  cellDate.innerHTML = ""; // Clear existing content

  let tanggal = currentDay.getDate();
  let nbulan = getMonthName(currentDay.getMonth());
  let bulan = currentDay.getMonth() + 1;
  let tahun = currentDay.getFullYear();
  cellDate.innerHTML = `${tanggal}`;
  var fullDate = document.createElement("div");
  fullDate.innerHTML = String(`${tanggal}/${bulan}/${tahun}`);
  fullDate.className = "fullDate";
  cellDate.appendChild(fullDate);

  if (
    currentDate.getDate() === currentDay.getDate() &&
    currentDate.getMonth() === currentDay.getMonth()
  ) {
    cellDate.classList.add("highlight");
  }
  cellDate.classList.add("date");
}

function dayOrder(dateAnchor) {
  let hariElements = document.querySelectorAll(".hari");
  let hariAwal = middleDate.getDay() - 4;
  let namaHari = ["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"];
  let urutanHariDefault = [0, 1, 2, 3, 4, 5, 6];
  let urutanHari = [];
  if (hariAwal !== urutanHariDefault[0]) {
    for (let i = 0; i < 7; i++) {
      urutanHari[i] = hariAwal + i;
      if (urutanHari[i] > 6) {
        urutanHari[i] = urutanHari[i] - 7;
      }
      if (urutanHari[i] < 0) {
        urutanHari[i] = urutanHari[i] + 7;
      }
    }
  } else {
    urutanHari = urutanHariDefault;
  }
  return namaHari[urutanHari[dateAnchor]];
}

function getMonthName(monthIndex) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return months[monthIndex];
}

function showPreviousWeek() {
  middleDate.setDate(middleDate.getDate() - 1);
  resetActive();
  updateCalendar();
}

function showNextWeek() {
  middleDate.setDate(middleDate.getDate() + 1);
  resetActive();
  updateCalendar();
}

function showToday() {
  middleDate = new Date(currentDate);
  resetActive();
  updateCalendar();
}

function updateCalendar() {
  var table = document.getElementById("verticalTable");
  var rowCount = table.rows.length;
  var elements = document.getElementsByClassName("highlight");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("highlight");
  }

  for (var i = 0; i < rowCount; i++) {
    if (table.rows[i].cells[1].classList.contains("highlight")) {
      table.rows[i].cells[1].classList.remove("highlight");
    }
    var cellDate = table.rows[i].cells[0]; // Assuming the date cell is always at index 1
    dateItem(cellDate, i);
    var cell = table.rows[i].cells[1];
    cell.innerHTML = dayOrder(i);
    if (table.rows[i].cells[0].classList.contains("highlight")) {
      table.rows[i].cells[1].classList.add("highlight");
    }
  }
}

function addCounter(targetObject) {
  if (!targetObject.classList.contains("readyInput")) {
    var counterElement = document.createElement("div");
    var fullDate =
      targetObject.previousElementSibling.querySelector(".fullDate");
    tampilkanData(fullDate.innerHTML, counterElement);
    counterElement.classList.add("counterElement");
    targetObject.appendChild(counterElement);
  }
}

function removeCounter(targetObject) {
  if (!targetObject.classList.contains("readyInput")) {
    var counterElement = targetObject.querySelector("div");
    targetObject.removeChild(counterElement);
  }
}

generateCalendar();

var dayElements = document.getElementsByClassName("day");

// Menambahkan event listener ke setiap elemen
for (var i = 0; i < dayElements.length; i++) {
  dayElements[i].addEventListener("mouseover", function (event) {
    if (event.target.tagName === "TD") {
      var hoveredCell = event.target;
      if (hoveredCell.classList.contains("day")) {
        if (!hoveredCell.classList.contains("munculCounter")) {
          addCounter(hoveredCell);
          hoveredCell.classList.add("munculCounter");
        }
      }

      var leftCell = hoveredCell.previousElementSibling;
      leftCell.classList.add("hoverRelative");
    }
  });
  dayElements[i].addEventListener("mouseleave", function (event) {
    if (event.target.tagName === "TD") {
      var hoveredCell = event.target;
      if (hoveredCell.classList.contains("day")) {
        removeCounter(hoveredCell);
        hoveredCell.classList.remove("munculCounter");
      }

      var leftCell = hoveredCell.previousElementSibling;
      leftCell.classList.remove("hoverRelative");
    }
  });
  dayElements[i].addEventListener("click", function (event) {
    if (event.target.tagName === "TD") {
      var clickedCell = event.target;
      addActive(clickedCell);
    }
  });
}

function addActive(targetObject) {
  if (targetObject.classList.contains("highlight")) {
    if (targetObject.classList.contains("readyInput")) {
      targetObject.previousElementSibling.classList.remove("readyInput");
    } else {
      resetActive();

      targetObject.classList.add("readyInput");
      targetObject.previousElementSibling.classList.add("readyInput");
    }
    let counterEditor = document.getElementById("counterEditor");
    // counterEditor.style.transition = "transform 0.2s ease, z-index 0.3s ease";
    counterEditor.classList.remove("hidden");
  }
}

function resetActive() {
  for (var i = 0; i < dayElements.length; i++) {
    if (dayElements[i].classList.contains("readyInput")) {
      dayElements[i].classList.remove("readyInput");
      dayElements[i].previousElementSibling.classList.remove("readyInput");
      removeCounter(dayElements[i]);
    }
  }
  let counterEditor = document.getElementById("counterEditor");
  //   counterEditor.style.transition = "transform 0.2s ease, z-index 0.1s ease";
  counterEditor.classList.add("hidden");
}

function bacaFile(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", "data.txt", true);
  xhr.send();
}

// Fungsi untuk menampilkan data berdasarkan tanggal
function tampilkanData(tanggal, targetObject) {
  bacaFile(function (data) {
    var barisData = data.split("\n");
    var hasil = 0;

    for (var i = 0; i < barisData.length; i++) {
      var kolom = barisData[i].split(" = ");
      if (kolom[0] === tanggal) {
        hasil = kolom[1];
        break;
      }
    }

    targetObject.textContent = hasil;
  });
}

let outputValue = 0;

function addToOutput(value) {
  outputValue += value;
  updateOutput();
}

function ok() {
  var elements = document.getElementsByClassName("readyInput");
  var date;
  var value;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("day")) {
      date = elements[i].previousElementSibling.querySelector(".fullDate");
      value = elements[i].querySelector(".counterElement");
    }
  }

  outputValue = outputValue + parseInt(value.textContent);
  updateData(date.innerHTML, parseInt(outputValue));

  resetActive();

  resetOutput();
}

function resetOutput() {
  outputValue = 0;
  updateOutput();
}

function updateOutput() {
  document.getElementById("output-box").innerText = outputValue;
}

function saveDataToFile(newData) {
  // Assuming you are using the File System API or a server-side language to save data to data.txt
  // This is just a placeholder function
  alert(`Saving data: ${newData}`);
}

function updateData(dateInput, integerInput) {
  //   var dateInput = document.getElementById("dateInput").value;
  //   var integerInput = document.getElementById("integerInput").value;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "update_data.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("notification").innerHTML = xhr.responseText;
      // Reset form fields
      document.getElementById("dateInput").value = "";
      document.getElementById("integerInput").value = "";
    }
  };

  var params = "dateInput=" + dateInput + "&integerInput=" + integerInput;
  xhr.send(params);
}
