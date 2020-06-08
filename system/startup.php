<?php
require_once DIR_SYSTEM.'vendor/autoload.php';
require_once DIR_SYSTEM.'engine/registry.php';
require_once DIR_SYSTEM.'engine/loader.php';
require_once DIR_SYSTEM.'engine/db/mysqli.php';
require_once DIR_SYSTEM.'engine/router.php';
require_once DIR_SYSTEM.'engine/user.php';

$registry = new Registry();
$loader = new \Twig\Loader\FilesystemLoader(DIR_TEMPLATE);

$twig = new \Twig\Environment($loader, [
    'cache' => false/* DIR_STORAGE.'cache' */,
    'autoescape' => false
]);
$registry->set('twig', $twig);


$router = new Router();
$router->registerAllRoutes();

$registry->set('router', $router);

$loader = new Loader($registry);
$registry->set('load', $loader);

$user = new User($registry);
$registry->set('user', $user);

$registry->set('servers', $servers);

if(isset($_COOKIE['server']) && !empty($_COOKIE('server')) && isset($servers[$_COOKIE['server']])) {
    $server = $servers[$_COOKIE['server']];
    $db = new DB\MySQLi($server['MYSQL_HOST'], $server['MYSQL_LOGIN'], $server['MYSQL_PASSWORD'], $server['MYSQL_DB']);
    $registry->set('db', $db);
}

require_once DIR_SYSTEM . 'engine/controller.php';

$action = 'main';
if(isset($_GET['action']))
    $action = stripslashes(htmlspecialchars(trim($_GET['action'])));

$data = $loader->controller($action, array(), true);

if($registry->has('db'))
    $registry->get('db')->close();

if(!$data) {
    print_r('Error: couldn\'t load file '. $action);
    return;
}

echo $data;