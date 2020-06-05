<?php
class ControllerMain extends Controller {
    public function index($data = []) {

        $data['title'] = 'test';

        $data['header'] = $this->load->controller('header');
        $data['servers'] = $this->load->controller('servers');

        return $this->load->view('main', $data);
    }
}