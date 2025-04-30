<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $gift = $_POST["gift"] ?? "Unknown";
    $logEntry = date('Y-m-d H:i:s') . " - Gift: " . $gift . "\n";
    file_put_contents('winners.txt', $logEntry, FILE_APPEND);
    echo "Saved!";
} else {
    echo "Invalid Request";
}
?>
