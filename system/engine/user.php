<?php

class User {

	protected $registry;
    const salt = "034errt$#foerwto%^^@#";
	
	public function __construct($registry) {
		$this->registry = $registry;
	}

	private function getDB($server = null) {
		if($this->registry->has('db'))
			$db = $this->registry->get('db');
		
		if(!isset($db)) {
			if(isset($server) && !empty($server) && isset($this->registry->get('servers')[$server])) {
				$server = $this->registry->get('servers')[$server];
				$db = new DB\MySQLi($server['MYSQL_HOST'], $server['MYSQL_LOGIN'], $server['MYSQL_PASSWORD'], $server['MYSQL_DB']);
				$this->registry->set('db', $db);
			} else
				throw new \Exception("Error USER|fetch -> mysqli not connected");
		}

		return $db;
	}

	public function authorizeUser($nickname, $server) {
		setcookie('server', $server, time() + 86400);

		$token = md5($nickname.self::salt.time());
		setcookie('token', $token, time() + 86400);
		
		$db = $this->getDB($server);

		$user = $db->query("SELECT `id` FROM `aplayerakk` WHERE `nickname`='{$nickname}'")->rows[0];

		$db->query("INSERT INTO `site_access_tokens` VALUES({$user['id']}, '{$token}')");
	}

	public function fetchByToken($token, $server) {
		$db = $this->getDB($server);

		$token = $db->escape($token);

		$userid = $db->query("SELECT `user_id` FROM `site_access_tokens` WHERE `token`='{$token}'");
		
		if($userid->num_rows === 0)
			return false;

		$user = $db->query("SELECT * FROM `aplayerakk` WHERE `id`={$userid->rows[0]['user_id']} LIMIT 1");

		return $user->rows[0];
	}
	
	public function fetch($nickname, $password, $server) {
		$db = $this->getDB($server);

		$nickname = $db->escape($nickname);

		//TODO: HASH PASSWORD
		$password = $db->escape($password);

		$sql = "SELECT * FROM `aplayerakk` WHERE `nickname`='{$nickname}'";

		if($password && !empty($password))
			$sql .= " AND `password`='{$password}'";

		$sql .= ' LIMIT 1';

		return $db->query($sql);
	}

}