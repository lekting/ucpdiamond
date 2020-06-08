<?php
class ControllerLauncher extends Controller {
	public function index($data = []) {

		$data['title'] = 'test';

		$data['serversmodal'] = $this->load->controller('additionals/serversmodal');

		$data['header'] = $this->load->view('additionals/header');
		$data['head'] = $this->load->view('additionals/head');

		return $this->load->view('launcher/launcher', $data);
	}
}