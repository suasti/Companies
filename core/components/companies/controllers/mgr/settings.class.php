<?php
require_once dirname(dirname(dirname(__FILE__))) . '/index.class.php';

class ControllersSettingsManagerController extends CompaniesMainController {
	public static function getDefaultController() {
		return 'settings';
	}
}

class CompaniesSettingsManagerController extends CompaniesMainController {

	public function getPageTitle() {
		return 'Companies :: ' . $this->modx->lexicon('company_settings');
	}


	public function loadCustomCssJs() {
		$this->addJavascript(MODX_MANAGER_URL . 'assets/modext/util/datetime.js');
		$this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/misc/utils.js');
                $this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/settings/positions.grid.js');		
		$this->addJavascript($this->Companies->config['jsUrl'] . 'mgr/settings/settings.panel.js');
		$this->addHtml('<script type="text/javascript">
			Ext.onReady(function() {
				MODx.load({ xtype: "companies-page-settings"});
			});
		</script>');
		$this->modx->invokeEvent('msOnManagerCustomCssJs', array('controller' => &$this, 'page' => 'settings'));
	}


	public function getTemplateFile() {
		return $this->Companies->config['templatesPath'] . 'mgr/settings.tpl';
	}
}

// MODX 2.3
class ControllersMgrSettingsManagerController extends ControllersSettingsManagerController {
	public static function getDefaultController() {
		return 'mgr/settings';
	}
}

class CompaniesMgrSettingsManagerController extends CompaniesSettingsManagerController {
}