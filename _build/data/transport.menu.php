<?php
$menus = array();

$tmp = array(
	'companies' => array(
		'description' => 'companies_menu_desc',
		'parent' => 'components',
		//'handler' => 'return false;',
		'icon' => '',
		'action' => array(
			'controller' => 'index'
		)
	),
	'company_name' => array(
		'description' => 'companies_desc',
		'parent' => 'companies',
		'menuindex' => 0,
		'action' => array(
			'controller' => 'controllers/mgr/companies'
		)
	),
	'company_settings' => array(
		'description' => 'company_settings_desc',
		'parent' => 'companies',
		'menuindex' => 1,
		'action' => array(
			'controller' => 'controllers/mgr/settings'
		)
	),
);

foreach ($tmp as $k => $v) {
	$action = null;
	if (!empty($v['action'])) {
		/* @var modAction $action */
		$action = $modx->newObject('modAction');
		$action->fromArray(array_merge(array(
			'id' => 0,
			'namespace' => PKG_NAME_LOWER,
			'parent' => 0,
			'haslayout' => 1,
			'lang_topics' => PKG_NAME_LOWER . ':default',
			'assets' => '',
		), $v['action']), '', true, true);
		unset($v['action']);
	}

	/* @var modMenu $menu */
	$menu = $modx->newObject('modMenu');
	$menu->fromArray(array_merge(array(
		'text' => $k,
		'parent' => 'components',
		'namespace' => PKG_NAME_LOWER,
		'icon' => '',
		'menuindex' => 0,
		'params' => '',
		'handler' => '',
	), $v), '', true, true);        
        
	if (!empty($action) && $action instanceof modAction) {             
		$menu->addOne($action);
	}

	$menus[] = $menu;
}

unset($action, $menu, $i);
return $menus;