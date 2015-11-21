<?php
$xpdo_meta_map['CompanyMember']= array (
  'package' => 'companies',
  'version' => '1.1',
  'table' => 'company_users',
  'extends' => 'xPDOObject',
  'fields' => 
  array (
    'user_id' => NULL,
    'company_id' => NULL,
    'position' => 0,
  ),
  'fieldMeta' => 
  array (
    'user_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'index' => 'pk',
    ),
    'company_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'index' => 'pk',
    ),
    'position' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
  ),
  'indexes' => 
  array (
    'user' => 
    array (
      'alias' => 'user',
      'primary' => true,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'user_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'company_id' => 
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
    'User' => 
    array (
      'class' => 'modUser',
      'local' => 'user_id',
      'foreign' => 'id',
      'owner' => 'foreign',
      'cardinality' => 'one',
    ),
    'Company' => 
    array (
      'class' => 'Company',
      'local' => 'company_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
