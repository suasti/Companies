<?php

class CompanyUserPositionCreateProcessor extends modObjectCreateProcessor {
	public $classKey = 'CompanyUserPosition';
	public $languageTopics = array('minishop2');
	public $permission = 'mssetting_save';


	/** {@inheritDoc} */
	public function initialize() {
		if (!$this->modx->hasPermission($this->permission)) {
			return $this->modx->lexicon('access_denied');
		}
		return parent::initialize();
	}


	/** {@inheritDoc} */
	public function beforeSet() {
		if ($this->modx->getObject('CompanyUserPosition',array('name' => $this->getProperty('name')))) {
			$this->modx->error->addField('name', $this->modx->lexicon('ms2_err_ae'));
		}
		return !$this->hasErrors();
	}


	/** {@inheritDoc} */
	public function beforeSave() {
		$this->object->fromArray(array(
			'rank' => $this->modx->getCount('CompanyUserPosition')
			,'editable' => true
		));
		return parent::beforeSave();
	}

}

return 'CompanyUserPositionCreateProcessor';