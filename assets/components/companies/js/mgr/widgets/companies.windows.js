Companies.window.CreateItem = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'companies-item-window-create';
	}
	Ext.applyIf(config, {
		title: _('company_create'),
		width: 1000,
		autoHeight: true,
		url: Companies.config.connector_url,
		action: 'mgr/companies/create',
		fields: this.getFields(config),
		keys: [{
			key: Ext.EventObject.ENTER, shift: true, fn: function () {
				this.submit();
			}, scope: this
		}]
	});
	Companies.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(Companies.window.CreateItem, MODx.Window, {

	getFields: function (config) {
		return [{
                layout: 'column'
                , defaults: {msgTarget: 'under', border: false}
                , style: 'margin:0 0 15px 0;'
                , items: [{
                        columnWidth: .5
                        , layout: 'form'
                        , items: [{
                                xtype: 'textfield',
                                fieldLabel: _('company_name'),
                                name: 'name',
                                id: config.id + '-name',
                                anchor: '99%',
                                allowBlank: false,
                            }]
                    }, {
                        columnWidth: .5
                        , layout: 'form'
                        , items: [{
                                xtype: 'modx-combo-user'
                                , id: config.id + '-company-admin'
                                , fieldLabel: _('company_admin')
                                , name: 'user'
                                , allowBlank: true
                                , anchor: '99%'
                            }]
                    }]
            }, {
                layout: 'column'
                , defaults: {msgTarget: 'under', border: false}
                , style: 'margin:0 0 15px 0;'
                , items: [{
                        columnWidth: .5
                        , layout: 'form'
                        , items: [{
                                xtype: 'textarea',
                                fieldLabel: _('company_description'),
                                name: 'description',
                                id: config.id + '-description',
                                height: 150,
                                anchor: '99%'
                            }]
                    }, {
                        columnWidth: .5
                        , layout: 'form'
                        , items: [{
                                xtype: 'textarea',
                                fieldLabel: _('company_requisites'),
                                name: 'requisites',
                                id: config.id + '-requisites',
                                height: 150,
                                anchor: '99%'
                            }]
                    }]
            }, {
                xtype: 'xcheckbox',
                boxLabel: _('company_status'),
                name: 'status',
                id: config.id + '-status',
            }];
	}

});
Ext.reg('companies-item-window-create', Companies.window.CreateItem);


Companies.window.UpdateItem = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'companies-item-window-update';
	}
        this.ident = config.ident || 'meuitem'+Ext.id();
	Ext.applyIf(config, {
		title: _('company_update'),
		width: 1000,
		id: this.ident,		
		autoHeight: true,
		labelAlign: 'top',
		url: Companies.config.connector_url,
		action: 'mgr/companies/update',
                fields: {
			xtype: 'modx-tabs'
			//,border: true
			,activeTab: config.activeTab || 0
			,bodyStyle: { background: 'transparent'}
			,deferredRender: false
			,autoHeight: true
			,stateful: true
			,stateId: 'companies-item-window-update'
			,stateEvents: ['tabchange']
			,getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};}
			,items: this.getTabs(config)
		},
		keys: [{
			key: Ext.EventObject.ENTER, shift: true, fn: function () {
				this.submit();
			}, scope: this
		}]
            
                
	});
	Companies.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(Companies.window.UpdateItem, MODx.Window, { 
    
    	getTabs: function(config) {               
		var tabs = [{
			title: _('company_update')
			,hideMode: 'offsets'
			,bodyStyle: 'padding:5px 0;'
			,defaults: {msgTarget: 'under',border: false}
			,items: this.getFields(config)
		},{
			xtype: 'company-grid-members'
			,title: _('company_memberss')
			,company_id: config.record.id
		}];


		return tabs;
	}

    , getFields: function (config) {
        return [{
                xtype: 'hidden',
                name: 'id',
                id: config.id + '-id',
            }, {
                layout: 'column'
                , defaults: {msgTarget: 'under', border: false}
                , style: 'margin:0 0 15px 0;'
                , items: [{
                        columnWidth: .5
                        , layout: 'form'
                        , items: [{
                                xtype: 'textfield',
                                fieldLabel: _('company_name'),
                                name: 'name',
                                id: config.id + '-name',
                                anchor: '99%',
                                allowBlank: false,
                            }]
                    }, {
                        columnWidth: .5
                        , layout: 'form'
                        , items: [{
                                xtype: 'modx-combo-user'
                                , id: config.id + '-company-admin'
                                , fieldLabel: _('company_admin')
                                , name: 'user'
                                , allowBlank: true
                                , anchor: '99%'
                            }]
                    }]
            }, {
                layout: 'column'
                , defaults: {msgTarget: 'under', border: false}
                , style: 'margin:0 0 15px 0;'
                , items: [{
                        columnWidth: .5
                        , layout: 'form'
                        , items: [{
                                xtype: 'textarea',
                                fieldLabel: _('company_description'),
                                name: 'description',
                                id: config.id + '-description',
                                height: 150,
                                anchor: '99%'
                            }]
                    }, {
                        columnWidth: .5
                        , layout: 'form'
                        , items: [{
                                xtype: 'textarea',
                                fieldLabel: _('company_requisites'),
                                name: 'requisites',
                                id: config.id + '-requisites',
                                height: 150,
                                anchor: '99%'
                            }]
                    }]
            }, {
                xtype: 'xcheckbox',
                boxLabel: _('company_status'),
                name: 'status',
                id: config.id + '-status',
            }];
    }

});
Ext.reg('companies-item-window-update', Companies.window.UpdateItem);