<?php

/**
 * Get a list of Companies
 */
class CompanyMemberGetListProcessor extends modObjectGetListProcessor {
	public $objectType = 'CompanyMember';
	public $classKey = 'CompanyMember';
	public $defaultSortField = 'company_id';
	public $defaultSortDirection = 'DESC';
	//public $permission = 'list';


	/**
	 * * We doing special check of permission
	 * because of our objects is not an instances of modAccessibleObject
	 *
	 * @return boolean|string
	 */
	public function beforeQuery() {
		if (!$this->checkPermissions()) {
			return $this->modx->lexicon('access_denied');
		}

		return true;
	}


	/**
	 * @param xPDOQuery $c
	 *
	 * @return xPDOQuery
	 */
	public function prepareQueryBeforeCount(xPDOQuery $c) {
                $c->leftJoin('modUser','modUser', '`CompanyMember`.`user_id` = `modUser`.`id`');
		$c->leftJoin('modUserProfile','modUserProfile', '`CompanyMember`.`user_id` = `modUserProfile`.`internalKey`');
                $c->leftJoin('Company','Company', '`CompanyMember`.`company_id` = `Company`.`id`');
                $c->leftJoin('CompanyUserPosition','CompanyUserPosition', '`CompanyMember`.`position` = `CompanyUserPosition`.`id`');
                
                $companyColumns = $this->modx->getSelectColumns('CompanyMember', 'CompanyMember', '', array('position'), true);
		$c->select($companyColumns . ', `modUserProfile`.`fullname` as `customer`, `modUser`.`username` as `customer_username`, `Company`.`name` as `company`, `CompanyUserPosition`.`name` as `position`');
                
                $c->where(array(
			'company_id' => $this->getProperty('company_id')
		));

		$query = trim($this->getProperty('query'));
		if ($query) {
			$c->where(array(
				'name:LIKE' => "%{$query}%",
				'OR:description:LIKE' => "%{$query}%",
			));
		}
                
		return $c;
	}


	/**
	 * @param xPDOObject $object
	 *
	 * @return array
	 */
	public function prepareRow(xPDOObject $object) {
                if (empty($array['customer'])) {
			$array['customer'] = $array['customer_username'];
		}
               
		$array = $object->toArray();
		$array['actions'] = array();

		// Edit
		$array['actions'][] = array(
			'cls' => '',
			'icon' => 'icon icon-edit',
			'title' => $this->modx->lexicon('company_update'),
			//'multiple' => $this->modx->lexicon('companies_update'),
			'action' => 'updateCompany',
			'button' => true,
			'menu' => true,
		);

		if (!$array['status']) {
			$array['actions'][] = array(
				'cls' => '',
				'icon' => 'icon icon-power-off action-green',
				'title' => $this->modx->lexicon('company_enable'),
				'multiple' => $this->modx->lexicon('companies_enable'),
				'action' => 'enableCompany',
				'button' => true,
				'menu' => true,
			);
		}
		else {
			$array['actions'][] = array(
				'cls' => '',
				'icon' => 'icon icon-power-off action-gray',
				'title' => $this->modx->lexicon('company_disable'),
				'multiple' => $this->modx->lexicon('companies_disable'),
				'action' => 'disableCompany',
				'button' => true,
				'menu' => true,
			);
		}

		// Remove
		$array['actions'][] = array(
			'cls' => '',
			'icon' => 'icon icon-trash-o action-red',
			'title' => $this->modx->lexicon('company_remove'),
			'multiple' => $this->modx->lexicon('companies_remove'),
			'action' => 'removeCompany',
			'button' => true,
			'menu' => true,
		);

		return $array;
	}

}

return 'CompanyMemberGetListProcessor';