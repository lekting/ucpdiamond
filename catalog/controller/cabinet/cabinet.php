<?php
class ControllerCabinet extends Controller {
	public function index($data = []) {

		$data['title'] = 'test';

		$data['serversmodal'] = $this->load->controller('additionals/serversmodal');

		$data['header'] = $this->load->view('additionals/header');
		$data['head'] = $this->load->view('additionals/head');

		$data['user'] = $this->user->fetchByToken('test');

		return $this->load->view('cabinet/cabinet', $data);
	}
}