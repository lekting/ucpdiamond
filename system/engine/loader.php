<?php

class Loader {
    protected $registry;
    
	public function __construct($registry) {
		$this->registry = $registry;
    }
    
    public function view($route, $data = array()) {        
		$template = $this->registry->get('twig')->load("{$route}.twig");

        $output = $template->render($data);		
		
		return $output;
	}

	public function controller($action, $data = array()) {
        $route = $this->registry->get('router')->get($action);

		if($route && is_file(DIR_APPLICATION . "controller/{$route}.php")) {
        
            include_once DIR_APPLICATION . "controller/{$route}.php";
            $class = 'Controller'.ucfirst($route);
    
            $controller = new $class($this->registry);

			$output = $controller->index(array(&$data));
        }
        
        if(!isset($output)) {
            return 'Error loading: '.$action;
        }

		return $output;
	}
}