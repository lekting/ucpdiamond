<?php

class Router {
	private $data = array();

	public function get($key) {
		return (isset($this->data[$key]) ? $this->data[$key] : null);
    }
    
    public function registerAllRoutes() {
        $this->set('main', 'main');
        $this->set('header', 'header');
        $this->set('servers', 'servers');
    }

	public function set($key, $value) {
		$this->data[$key] = $value;
    }
    
	public function has($key) {
		return isset($this->data[$key]);
	}
}