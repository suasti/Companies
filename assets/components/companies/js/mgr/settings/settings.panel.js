Companies.page.Settings = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		components: [{
			xtype: 'companies-panel-settings'
			,renderTo: 'companies-panel-settings-div'
		}]
	});
	Companies.page.Settings.superclass.constructor.call(this,config);
};
Ext.extend(Companies.page.Settings,MODx.Component);
Ext.reg('companies-page-settings',Companies.page.Settings);

Companies.panel.Settings = function(config) {
	config = config || {};
	Ext.apply(config,{
		border: false
		,deferredRender: true
		,baseCls: 'modx-formpanel'
		,items: [{
			html: '<h2>'+_('companies') + ' :: ' + _('company_settings')+'</h2>'
			,border: false
			,cls: 'modx-page-header container'
		},{
			xtype: 'modx-tabs'
			,bodyStyle: 'padding: 5px'
			,defaults: { border: false ,autoHeight: true }
			,border: true
			,hideMode: 'offsets'
			,stateful: true
			,stateId: 'companies-settings-tabpanel'
			,stateEvents: ['tabchange']
			,getState:function() {return { activeTab:this.items.indexOf(this.getActiveTab())};}
			,items: [{
				title: _('company_user_positions')
				,deferredRender: true
				,items: [{
					html: '<p>'+_('company_user_positions_intro')+'</p>'
					,border: false
					,bodyCssClass: 'panel-desc'
					,bodyStyle: 'margin-bottom: 10px'
				},{
					xtype: 'companies-grid-position'
				}]
			}]
		}]
	});
	Companies.panel.Settings.superclass.constructor.call(this,config);
};
Ext.extend(Companies.panel.Settings,MODx.Panel);
Ext.reg('companies-panel-settings',Companies.panel.Settings);