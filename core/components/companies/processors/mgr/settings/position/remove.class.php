<?php

class CompanyUserPositionRemoveProcessor extends modObjectRemoveProcessor  {
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
	public function beforeRemove() {
		if (!$this->object->get('editable')) {
			return '';
		}
		return parent::beforeRemove();
	}

}
return 'CompanyUserPositionRemoveProcessor';