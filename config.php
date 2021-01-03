<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader(array('views'));

$twig = new \Twig\Environment($loader, [
    'debug' => true,
]);
$twig->addExtension(new \Twig\Extension\DebugExtension());

// VARS to use in controllers
if(isset($_SERVER['HTTPS'])){
    define('PROTOCOL', 'https://');
}
else{
    define('PROTOCOL', 'http://');
}
$site_url = PROTOCOL.$_SERVER['SERVER_NAME'];

$projects_list = [
    '3is' => [
        'title' => '3IS',
        'img' => '/dist/images/3is.jpg',
        'subhead' => 'Conception-Creation-Direction Technique @ <a href="https://www.rnd.fr/" target="_blank">RnD</a>',
        'tags' => '#Wordpress #GSAP',
        'content' => 'Développement de la galeries des projets en AJAX, certaines pages, et de fonctions custom pour wordpress.',
        'url' => 'https://www.3is.fr/'
    ],
    'inseec' => [
        'title' => 'INSEEC Grande écoles',
        'subhead' => 'Conception-Creation-Direction Technique @ <a href="https://www.octaveoctave.com/fr/" target="_blank">OctaveOctave</a>',
        'img' => '/dist/images/inseec.jpg',
        'tags' => '#Wordpress #GSAP #VanillaJS',
        'content' => 'Développemement front-end du site, utilisations des apis VanillaJS comme IntersectionObserver',
        'url' => 'https://grandeecole.inseec.com/'
    ],
    'laposte' => [
        'title' => 'Contre la montre - La Poste',
        'subhead' => 'Conception-Creation-Direction Technique @ <a href="https://www.rnd.fr/" target="_blank">RnD</a>',
        'img' => '/dist/images/laposte.jpg',
        'tags' => '#GSAP #Javascript #SVG',
        'content' => 'Jeux type instant gagnant. Développement du labyrinthe et de la roue de la fortune en JS, via GSAP.',
        'url' => 'https://contrelamontre.laposte.fr/'
    ],
    'poip' => [
        'title' => 'Plateforme Université Corse',
        'subhead' => 'Conception-Creation-Direction Technique @ <a href="https://www.thalamus-ic.fr/" target="_blank">Thalamus</a>',
        'img' => '/dist/images/poip.jpg',
        'tags' => '#GSAP #Wordpress #PJAX',
        'content' => 'Back-end avec Wordpress et Timber. Développement de plugins pour gérer les utilisateurs, les relances via CRON, 
        connection à une API. Animation front avec Lottie, GSAP, transition PJAX',
        'url' => 'https://www.plateformeio-universita.corsica/'
    ],
    'ppia' => [
        'title' => 'Perspectives-IA - Medef',
        'subhead' => 'Conception-Creation-Direction Technique @ <a href="https://www.thalamus-ic.fr/" target="_blank">Thalamus</a>',
        'img' => '/dist/images/ppia.jpg',
        'tags' => '#Wordpress',
        'content' => 'Backend avec Wordpress et Timber. Fonctions custom pour Wordpress.',
        'url' => 'https://perspectives-ia.fr/'
    ]
];

$twig->addGlobal('site_url', $site_url);
$twig->addGlobal('projects_list', $projects_list);

