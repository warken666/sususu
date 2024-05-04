var numberCheck = 0

var state = "world"
// state = "a"

generateTiles()
// tambahTitikKeTiles(0, 'titik');
// tambahTitikKeTiles(4, 'titik2');
generateObjectInTile('titik', 0)
generateObjectInTile('titik2', 7)
generateObjectInTile('titik3', 60)


function generateTiles() {
	const map = document.getElementById('map');
	map.innerHTML = ''; // Clear existing tiles

	const numRows = 12;
	const numCols = 12;

	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			const tile = document.createElement('div');
			tile.classList.add('tile');
			map.appendChild(tile);

			setTimeout(() => {
				tile.style.opacity = '1';
			}, 1 * (row * numCols + col));
		}
	}
}

function indexToCoord(i) {
	x = i % 12
	y = (i - (x)) / 12
	coord = {
		x: x + 1,
		y: y + 1
	}
	return coord
}

function coordToIndex(x, y) {
	x = x - 1
	y = y - 1
	i = x + (y * 12)
	return i
}

function vectorToIndexVector(x = 0, y = 0) {
	i = x + (y * 12)
	return i
}

function findObjectInTile(obj) {
	var semuaTiles = document.getElementsByClassName('tile');

	// Loop melalui setiap elemen tiles
	for (var i = 0; i < semuaTiles.length; i++) {
		var tiles = semuaTiles[i];
		var titik = tiles.getElementsByClassName(obj);

		// Loop melalui setiap elemen titik dalam tiles
		while (titik.length > 0) {
			return i;
		}
	}
}

function generateObjectInTile(obj, index, dir) {
	var tiles = document.getElementsByClassName('tile');
	const titik = document.createElement('div');
	titik.classList.add(obj)

	tiles[index].appendChild(titik)
	titik.style.opacity = '1'
	if (dir == 'right') {
		titik.style.transform = "scaleX(-1)"
	}

}

function moveObjectInTile(obj, vector) {
	var objIndex = findObjectInTile(obj)
	var indexVector = vectorToIndexVector(vector.x, vector.y)
	var newIndex = objIndex + indexVector

	var dir = 'left'

	if (vector.x > 0) {
		dir = 'right'
	}
	// if (vector.x = 0) {
	// 	dir = getDirection(obj)
	// }

	hapusTitikDariTiles(obj)

	generateObjectInTile(obj, newIndex, dir)
}
function moveObjectInTileWithMark(obj, vector) {
	var objIndex = findObjectInTile(obj)
	var indexVector = vectorToIndexVector(vector.x, vector.y)
	var newIndex = objIndex + indexVector

	var dir = 's'

	if (vector.x > 0) {
		dir = 'right'
	}

	hapusTitikDariTiles(obj)

	generateObjectInTile(obj, newIndex, dir)
	removeMarkObjectTile(obj)
	markObjectTile(newIndex, obj)
}

function markObjectTile(i, obj) {
	var semuaTiles = document.getElementsByClassName('tile');

	semuaTiles[i].classList.add(String(obj + 'Trail'))
}

function removeMarkObjectTile(obj) {
	var semuaTiles = document.getElementsByClassName('tile');

	for (var i = 0; i < semuaTiles.length; i++) {
		var tiles = semuaTiles[i]
		tiles.classList.remove(String(obj + 'Trail'));
	}
}

// function getDirection(obj) {
// 	var semuaTiles = document.getElementsByClassName('tile');
// 	for (var i = 0; i < semuaTiles.length; i++) {
// 		var tiles = semuaTiles[i];
// 		var titik = tiles.getElementsByClassName(obj);

// 		// Loop melalui setiap elemen titik dalam tiles
// 		while (titik.length > 0) {
// 			var dir = titik[0].style.transform
// 			if (dir == 'scaleX(-1)') {
// 				dir = 'right'
// 			}
// 			else {
// 				dir = 'left'
// 			}
// 			return dir
// 		}
// 	}
// }

// // Fungsi untuk menambahkan titik pada tiles tertentu
// function tambahTitikKeTiles(index, obj) {
// 	var objIndex = findObjectInTile(obj)
// 	hapusTitikDariTiles(obj)

// 	var tiles = document.getElementsByClassName('tile');
// 	const titik = document.createElement('div');
// 	titik.classList.add(obj)

// 	if (index >= 0 && index < tiles.length) {
// 		tiles[index].appendChild(titik);
// 	} else {
// 		console.log('Indeks di luar jangkauan');
// 	}
// }

function hapusTitikDariTiles(obj) {
	var semuaTiles = document.getElementsByClassName('tile');
	for (var i = 0; i < semuaTiles.length; i++) {
		var tiles = semuaTiles[i];
		var titik = tiles.getElementsByClassName(obj);

		// Loop melalui setiap elemen titik dalam tiles
		while (titik.length > 0) {
			tiles.removeChild(titik[0]);
		}
	}

}

function checkCorner(i) {
	var check = {
		cornerTop: false,
		cornerBottom: false,
		cornerLeft: false,
		cornerRight: false,
	}
	if ((i / 11 == 1) || ((i - 11) % 12 == 0)) {
		check.cornerRight = true
	}
	if ((i % 12 == 0)) {
		check.cornerLeft = true
	}
	if ((i < 12)) {
		check.cornerTop = true
	}
	if ((i >= 132)) {
		check.cornerBottom = true
	}
	return check
}

function checkCornerObject(obj) {
	var objIndex = findObjectInTile(obj)
	return checkCorner(objIndex)
}

document.addEventListener('keydown', function (event) {
	if (state == "world") {
		if (event.key === 'ArrowRight') {
			if (checkCornerObject('titik').cornerRight == false) {
				numberCheckRepeat(findObjectInTile('titik'))
				moveObjectInTile('titik', { x: 1 });
			}
		}
		else if (event.key === 'ArrowLeft') {
			if (checkCornerObject('titik').cornerLeft == false) {
				numberCheckRepeat(findObjectInTile('titik'))
				moveObjectInTile('titik', { x: -1 });
			}
		}
		else if (event.key === 'ArrowUp') {
			if (checkCornerObject('titik').cornerTop == false) {
				numberCheckRepeat(findObjectInTile('titik'))
				moveObjectInTile('titik', { y: -1 });
			}
		}
		else if (event.key === 'ArrowDown') {
			if (checkCornerObject('titik').cornerBottom == false) {
				numberCheckRepeat(findObjectInTile('titik'))
				moveObjectInTile('titik', { y: 1 });
			}
		}
	}

});

function randomMinusOneZeroOne() {
	var randomNumber = Math.floor(Math.random() * 3);


	return randomNumber - 1;
}

function randomEnemyMovement(obj) {
	x = randomMinusOneZeroOne()
	y = randomMinusOneZeroOne()
	if ((checkCornerObject(obj).cornerRight == true) & (x > 0)) {
		x = 0
	}
	if ((checkCornerObject(obj).cornerLeft == true) & (x < 0)) {
		x = 0
	}
	if ((checkCornerObject(obj).cornerTop == true) & (y < 0)) {
		y = 0
	}
	if ((checkCornerObject(obj).cornerBottom == true) & (y > 0)) {
		y = 0
	}
	moveObjectInTileWithMark(obj, { x, y });
	numberCheckRepeat(x)
}

function randomEnemyMovementSet() {
	if (state == "world") {
		randomEnemyMovement('titik2')
		randomEnemyMovement('titik3')
	}
}

setInterval(randomEnemyMovementSet, 100);

function cariIndexTileDenganTitik() {
	// Dapatkan semua elemen dengan kelas "tile"
	var tiles = document.querySelectorAll('.tile');

	// Loop melalui setiap elemen dengan kelas "tile"
	for (var i = 0; i < tiles.length; i++) {
		// Periksa apakah ada elemen dengan kelas "titik" di dalamnya
		if (tiles[i].querySelector('.titik')) {
			// Jika ada, kembalikan indeksnya
			return i;
		}
	}
	// Jika tidak ditemukan, kembalikan -1 atau nilai lain yang sesuai
	return -1;
}


function numberCheckRepeat(a) {
	var checkPoint = document.getElementById("numberCheck")
	checkPoint.innerHTML = a;
}