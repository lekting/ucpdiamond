<?php
class ControllerHeader extends Controller {

    public function index($data = []) {
        return $this->load->view('additionals/header', $data);
    }

}