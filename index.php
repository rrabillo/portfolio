<?php

require_once 'config.php';
$htmlTitle = 'Rabillon.fr - Développeur Web Freelance';

echo $twig->render('index.twig', [
    'bgclass' => 'bg-grey',
    'html_title' => $htmlTitle,
    'display_header' => true
]);