<?php
$xpdo_meta_map['CompanyUserPosition']= array (
  'package' => 'companies',
  'version' => '1.1',
  'table' => 'company_user_positions',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'name' => NULL,
    'description' => NULL,
    'active' => 1,
    'editable' => 1,
  ),
  'fieldMeta' => 
  array (
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
    ),
    'description' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => true,
    ),
    'active' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => true,
      'default' => 1,
    ),
    'editable' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => true,
      'default' => 1,
    ),
  ),
  'indexes' => 
  array (
    'active' => 
    array (
      'alias' => 'active',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'active' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'Members' => 
    array (
      'class' => 'CompanyMember',
      'local' => 'id',
      'foreign' => 'position',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
