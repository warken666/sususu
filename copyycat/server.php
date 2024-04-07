<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Terima data dari formulir
    $currentPage = isset($_POST['page']) ? $_POST['page'] : 1;

    // Lakukan apa yang perlu dilakukan dengan data, misalnya, ambil konten untuk halaman tersebut
    $filename = "content/page{$currentPage}.txt";

    if (file_exists($filename)) {
        $content = file_get_contents($filename);
        // Kirim respons dalam format yang sesuai
        echo json_encode(['success' => true, 'content' => $content]);
    } else {
        // Jika halaman tidak ditemukan, kirim pesan kesalahan
        echo json_encode(['success' => false, 'message' => 'Halaman tidak ditemukan']);
    }
} else {
    // Jika bukan permintaan POST, kirim pesan kesalahan
    echo json_encode(['success' => false, 'message' => 'Metode permintaan tidak valid']);
}
?>
