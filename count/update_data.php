<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dateInput = $_POST["dateInput"];
    $integerInput = $_POST["integerInput"];

    // Lokasi file data.txt
    $filePath = "data.txt";

    // Membaca seluruh konten file data.txt
    $lines = file($filePath, FILE_IGNORE_NEW_LINES);

    // Mencari tanggal yang diinput dalam file
    $dateFound = false;
    foreach ($lines as &$line) {
        // Memeriksa apakah tanggal sudah ada
        if (strpos($line, $dateInput) !== false) {
            // Menemukan tanggal, mengganti nilai integer
            $line = "$dateInput = $integerInput";
            $dateFound = true;
            break;
        }
    }

    // Jika tanggal tidak ditemukan, menambahkan baris baru
    if (!$dateFound) {
        $lines[] = "$dateInput = $integerInput";
    }

    // Mengurutkan array berdasarkan tanggal
    usort($lines, function($a, $b) {
        list($dateA, $valueA) = explode(' = ', $a);
        list($dateB, $valueB) = explode(' = ', $b);
        $timestampA = strtotime($dateA);
        $timestampB = strtotime($dateB);

        return $timestampA - $timestampB;
    });

    // Menuliskan kembali seluruh konten ke file
    file_put_contents($filePath, implode("\n", $lines));

    // Mengarahkan kembali ke halaman web awal
    header("Location: test.html");
    exit(); // Pastikan tidak ada output lain setelah ini
}
?>
