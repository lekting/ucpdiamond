<?php

class Router {
    private $data = array();

      public function get($key) {
        return (isset($this->data[$key]) ? $this->data[$key] : null);
    }
    
    public function registerAllRoutes() {
        $this->set('main', 'main');
        $this->set('cabinet/login', 'cabinet/login');
        $this->set('cabinet', 'cabinet/cabinet');
        $this->set('donate', 'donate/donate');
        $this->set('donate/vip', 'donate/vip');
        $this->set('launcher', 'launcher/launcher');
        $this->set('players', 'players/online');
        $this->set('players/online', 'players/online');
    }

    public function set($key, $value) {
        $this->data[$key] = $value;
    }
    
    public function has($key) {
        return isset($this->data[$key]);
    }
}