<?php
require_once dirname(dirname(dirname(__FILE__))) . '/index.class.php';

class ControllersCompaniesManagerController extends CompaniesMainController {
	public static function getDefaultController() {
		return 'companies';
	}
}

class CompaniesManagerController extends CompaniesMainController {

	public function getPageTitle() {
		return 'Companies :: ' . $this->modx->lexicon('companies');
	}


	public function loadCustomCssJs() {
		$this->addCss($this->Companies->config['cssUrl'] . 'mgr/main.css');
		$this->addCss($this->Companies->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
		$this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/misc/utils.js');
		$this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/widgets/companies.grid.js');
                $this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/widgets/members/member.grid.js');
		$this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/widgets/companies.windows.js');
		$this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/widgets/home.panel.js');
		$this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/sections/home.js');
		$this->addHtml('<script type="text/javascript">
		Ext.onReady(function() {
			MODx.load({ xtype: "companies-page-home"});
		});
		</script>');
	}


	public function getTemplateFile() {
		return $this->Companies->config['templatesPath'] . 'mgr/companies.tpl';
	}
}

// MODX 2.3
class ControllersMgrCompaniesManagerController extends ControllersCompaniesManagerController {
	public static function getDefaultController() {
		return 'mgr/companies';
	}
}

class CompaniesMgrCompaniesManagerController extends CompaniesManagerController {
}