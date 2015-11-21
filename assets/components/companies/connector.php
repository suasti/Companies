<?php
/** @noinspection PhpIncludeInspection */
require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var Companies $Companies */

$Companies = $modx->getService('companies', 'Companies', $modx->getOption('companies_core_path', null, $modx->getOption('core_path') . 'components/companies/') . 'model/companies/');
$modx->lexicon->load('companies:default');

// handle request
$corePath = $modx->getOption('companies_core_path', null, $modx->getOption('core_path') . 'components/companies/');
$path = $modx->getOption('processorsPath', $Companies->config, $corePath . 'processors/');

$modx->request->handleRequest(array(
	'processors_path' => $path,
	'location' => '',
));