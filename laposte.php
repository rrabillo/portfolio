<?php

require_once 'config.php';
$htmlTitle = 'Rabillon.fr - Développeur Web Freelance - 3IS';

$current = 'laposte';

echo $twig->render('project.twig', [
    'bgclass' => 'bg-dark',
    'html_title' => $htmlTitle,
    'current' => $current,
]);