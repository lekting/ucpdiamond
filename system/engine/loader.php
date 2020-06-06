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

	public function controller($action, $data = array(), $needroute = false) {
        $action_arr = str_split($action);
        if(end($action_arr) === '/')
            array_splice($action_arr, count($action_arr) - 1, 1);

        $action = implode($action_arr);

        $route = $needroute ? $this->registry->get('router')->get($action) : $action;

		if(is_file(DIR_APPLICATION . "controller/{$route}.php")) {
            if($needroute && !$route)
                return 'Error loading: '.$action;
        
            include_once DIR_APPLICATION . "controller/{$route}.php";

            if(strstr($route, '/'))
                $route = explode('/', $route)[1];
                
            $class = 'Controller'.ucfirst($route);
    
            $controller = new $class($this->registry);

			$output = $controller->index(array(&$data));
        }
        
        if(!isset($output))
            return 'Error loading: '.$action;

		return $output;
	}
}