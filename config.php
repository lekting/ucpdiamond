<?php
// DIR
define('DIR_APPLICATION', './catalog/');
define('DIR_SYSTEM', './system/');
define('DIR_STORAGE', DIR_SYSTEM . 'storage/');
define('DIR_LANGUAGE', DIR_APPLICATION . 'language/');
define('DIR_TEMPLATE', DIR_APPLICATION . 'view/');
define('DIR_CONFIG', DIR_SYSTEM . 'config/');
define('DIR_CACHE', DIR_STORAGE . 'cache/');
define('DIR_DOWNLOAD', DIR_STORAGE . 'download/');
define('DIR_LOGS', DIR_STORAGE . 'logs/');
define('DIR_MODIFICATION', DIR_STORAGE . 'modification/');
define('DIR_SESSION', DIR_STORAGE . 'session/');
define('DIR_UPLOAD', DIR_STORAGE . 'upload/');

// DB
define('DB_DRIVER', 'mysqli');
define('DB_HOSTNAME', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_DATABASE', 'diamond');
define('DB_PORT', '3306');

$servers = array(
    'emerald' => array(
        'VISIBLE_NAME' => 'EMERALD',
        'ICON_PATH' => '/assets\images\servers\emerald.svg',
        'ICON_PATH_DARK' => '/assets\images\servers\emerald_dark.svg',
        'IP' => '176.32.37.19',
        'PORT' => '7777',
        'MYSQL_HOST' => '127.0.0.1',
        'MYSQL_LOGIN' => 'root',
        'MYSQL_PASSWORD' => '',
        'MYSQL_DB' => 'grandrp',
        'MYSQL_TABLE' => 'accounts'
   ),

   'trilliant' => array(
        'VISIBLE_NAME' => 'TRILLIANT',
        'ICON_PATH' => '/assets\images\servers\trilliant.svg',
        'ICON_PATH_DARK' => '/assets\images\servers\trilliant_dark.svg',
        'IP' => '176.32.36.135',
        'PORT' => '7777',
        'MYSQL_HOST' => '127.0.0.1',
        'MYSQL_LOGIN' => 'root',
        'MYSQL_PASSWORD' => '',
        'MYSQL_DB' => 'grandrp',
        'MYSQL_TABLE' => 'accounts'
   )
);