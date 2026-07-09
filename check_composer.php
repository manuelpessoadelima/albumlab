<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check for composer.phar in common locations
$paths = [
    __DIR__ . '/composer.phar',       // current folder
    '/usr/local/bin/composer',        // typical server path
    '/usr/bin/composer'
];

$found = false;
foreach ($paths as $path) {
    if (file_exists($path)) {
        echo "Composer found at: $path";
        $found = true;
        break;
    }
}

if (!$found) {
    echo "Composer not found on this server.";
}
?>