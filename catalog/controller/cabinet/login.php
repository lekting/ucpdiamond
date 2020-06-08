<?php
class ControllerLogin extends Controller {
	
	public function index($data = []) {

		if(isset($_POST['server'])) {
			return $this->processQuery();
		}

		$data['serversmodal'] = $this->load->controller('additionals/serversmodal');

		$data['header'] = $this->load->view('additionals/header');
		$data['head'] = $this->load->view('additionals/head');
		$data['servers'] = $this->servers;

		return $this->load->view('cabinet/login', $data);
	}

	private function processQuery() {
		$server = $_POST['server'];
		if(empty($server) || !isset($this->servers[$server]))
			return 'incorrect_server';

		$nickname = $_POST['nickname'];
		if(empty($nickname))
			return 'incorrect_nickname';

		$password = $_POST['password'];
		if(empty($password))
			return 'incorrect_password';

		$code = $_POST['code'];
		if(strlen($code) > 4)
			return 'incorrect_code';

		$user = $this->user->fetch($nickname, $password);

		if($user->num_rows === 0)
			return 'invalid_password';

		$user = $user->rows[0];

		if($user['code'] !== '0000' && $user['code'] !== $code)
			return 'invalid_code';

		return 'success_login';
	}
}