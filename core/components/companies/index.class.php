<?php

/**
 * Class CompaniesMainController
 */
abstract class CompaniesMainController extends modExtraManagerController {
	/** @var Companies $Companies */
	public $Companies;


	/**
	 * @return void
	 */
	public function initialize() {
		$corePath = $this->modx->getOption('companies_core_path', null, $this->modx->getOption('core_path') . 'components/companies/');
		require_once $corePath . 'model/companies/companies.class.php';

		$this->Companies = new Companies($this->modx);
		$this->addCss($this->Companies->config['cssUrl'] . 'mgr/main.css');
		$this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/companies.js');
		$this->addHtml('
		<script type="text/javascript">
			Companies.config = ' . $this->modx->toJSON($this->Companies->config) . ';
			Companies.config.connector_url = "' . $this->Companies->config['connectorUrl'] . '";
		</script>
		');

		parent::initialize();
	}


	/**
	 * @return array
	 */
	public function getLanguageTopics() {
		return array('companies:default');
	}


	/**
	 * @return bool
	 */
	public function checkPermissions() {
		return true;
	}
}


/**
 * Class IndexManagerController
 */
class IndexManagerController extends CompaniesMainController {

	/**
	 * @return string
	 */
	public static function getDefaultController() {
		return 'mgr/companies';
	}
}