<?php
/**
 * Resolve creating needed positions
 *
 * @var xPDOObject $object
 * @var array $options
 */

if ($object->xpdo) {
	/* @var modX $modx */
	$modx =& $object->xpdo;

	switch ($options[xPDOTransport::PACKAGE_ACTION]) {
		case xPDOTransport::ACTION_INSTALL:
		case xPDOTransport::ACTION_UPGRADE:
			$modelPath = $modx->getOption('companies.core_path',null,$modx->getOption('core_path').'components/companies/').'model/';
			$modx->addPackage('companies',$modelPath);
			$lang = $modx->getOption('manager_language') == 'en' ? 1 : 0;

			$positions = array(
				'1' => array(
					'name' => !$lang ? 'Менеджер' : 'Manager'
				)
			);

			foreach ($positions as $id => $properties) {
				if (!$status = $modx->getCount('CompanyUserPosition', array('id' => $id))) {
					$status = $modx->newObject('CompanyUserPosition', array_merge(array(
						'editable' => 0
						,'active' => 1						
					), $properties));
					$status->set('id', $id);
					$status->save();
				}
			}			

			break;

		case xPDOTransport::ACTION_UNINSTALL:
			break;
	}
}
return true;