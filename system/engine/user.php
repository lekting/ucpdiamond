<?php

class User {

	protected $registry;
	
	public function __construct($registry) {
		$this->registry = $registry;
	}

	public function fetchByToken($token) {
		$db = $this->registry->get('db');

		$token = $db->escape($token);

		$userid = $db->query("SELECT `user_id` FROM `site_access_tokens` WHERE `token`='{$token}'");
		
		if($userid->num_rows === 0)
			return false;

		$user = $db->query("SELECT * FROM `aplayerakk` WHERE `id`={$userid->rows[0]['user_id']} LIMIT 1");

		return $user->rows[0];
	}
	
	public function fetch($nickname, $password = false) {
		$db = $this->registry->get('db');

		$nickname = $db->escape($nickname);

		//TODO: HASH PASSWORD
		$password = $db->escape($password);

		$sql = "SELECT * FROM `aplayerakk` WHERE `nickname`='{$nickname}' LIMIT 1";

		if($password && !empty($password))
			$sql .= " AND `password`='{$password}'";

		return $db->query($sql);
	}

}