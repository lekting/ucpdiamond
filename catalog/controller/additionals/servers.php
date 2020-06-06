<?php
class ControllerServers extends Controller {

    public function index($data = []) {
        return $this->load->view('additionals/servers', $data);
    }

}