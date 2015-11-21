Companies.page.Home = function (config) {
	config = config || {};
	Ext.applyIf(config, {
		components: [{
			xtype: 'companies-panel-home', renderTo: 'companies-panel-home-div'
		}]
	});
	Companies.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(Companies.page.Home, MODx.Component);
Ext.reg('companies-page-home', Companies.page.Home);