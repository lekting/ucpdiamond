<?php
class ControllerDonate extends Controller {
    public function index($data = []) {

        $data['title'] = 'test';

        $data['serversmodal'] = $this->load->controller('additionals/serversmodal');

        $data['header'] = $this->load->view('additionals/header');
        $data['head'] = $this->load->view('additionals/head');

        $data['servers'] = $this->servers;

        return $this->load->view('donate/donate', $data);
    }
}