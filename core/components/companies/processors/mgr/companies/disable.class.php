<?php

/**
 * Disable an Item
 */
class CompanyDisableProcessor extends modObjectProcessor {
	public $objectType = 'Company';
	public $classKey = 'Company';
	public $languageTopics = array('companies');
	//public $permission = 'save';


	/**
	 * @return array|string
	 */
	public function process() {
		if (!$this->checkPermissions()) {
			return $this->failure($this->modx->lexicon('access_denied'));
		}

		$ids = $this->modx->fromJSON($this->getProperty('ids'));
		if (empty($ids)) {
			return $this->failure($this->modx->lexicon('company_err_ns'));
		}

		foreach ($ids as $id) {
			/** @var Company $object */
			if (!$object = $this->modx->getObject($this->classKey, $id)) {
				return $this->failure($this->modx->lexicon('company_err_nf'));
			}

			$object->set('status', false);
			$object->save();
		}

		return $this->success();
	}

}

return 'CompanyDisableProcessor';
