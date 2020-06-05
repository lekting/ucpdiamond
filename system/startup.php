<?php
require_once DIR_SYSTEM.'vendor/autoload.php';
require_once DIR_SYSTEM.'engine/registry.php';
require_once DIR_SYSTEM.'engine/loader.php';
require_once DIR_SYSTEM.'engine/db/mysqli.php';
require_once DIR_SYSTEM.'engine/router.php';

$registry = new Registry();
$loader = new \Twig\Loader\FilesystemLoader(DIR_TEMPLATE);

$twig = new \Twig\Environment($loader, [
    'cache' => false/* DIR_STORAGE.'cache' */,
    'autoescape' => false
]);
$registry->set('twig', $twig);

$db = new DB\MySQLi(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
$registry->set('db', $db);

$router = new Router();
$router->registerAllRoutes();

$registry->set('router', $router);

$loader = new Loader($registry);
$registry->set('load', $loader);

require_once DIR_SYSTEM . 'engine/controller.php';

$action = 'main';
if(isset($_GET['action']))
    $action = stripslashes(htmlspecialchars(trim($_GET['action'])));

$data = $loader->controller($action);

if(!$data) {
    print_r('Error: couldn\'t load file');
    return;
}

echo $data;