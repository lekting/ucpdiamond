<?php
class ControllerMain extends Controller {
	public function index($data = []) {

		$data['title'] = 'test';

		$data['servers'] = $this->load->controller('additionals/servers');
		$data['serversmodal'] = $this->load->controller('additionals/serversmodal');

		$data['header'] = $this->load->view('additionals/header');
		$data['head'] = $this->load->view('additionals/head');

		return $this->load->view('main', $data);
	}
}