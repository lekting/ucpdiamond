<?php
class ControllerServersmodal extends Controller {

    public function index($data = []) {
        $data['servers'] = $this->servers;

        return $this->load->view('additionals/serversmodal', $data);
    }

}