Companies.panel.Home = function (config) {
	config = config || {};
	Ext.apply(config, {
		baseCls: 'modx-formpanel',
		layout: 'anchor',
		/*
		 stateful: true,
		 stateId: 'companies-panel-home',
		 stateEvents: ['tabchange'],
		 getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
		 */
		hideMode: 'offsets',
		items: [{
			html: '<h2>' + _('companies') + '</h2>',
			cls: '',
			style: {margin: '15px 0'}
		}, {
			xtype: 'modx-tabs',
			defaults: {border: false, autoHeight: true},
			border: true,
			hideMode: 'offsets',
			items: [{
				title: _('companies'),
				layout: 'anchor',
				items: [{
					html: _('companies_intro_msg'),
					cls: 'panel-desc',
				}, {
					xtype: 'companies-grid-items',
					cls: 'main-wrapper',
				}]
			}]
		}]
	});
	Companies.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(Companies.panel.Home, MODx.Panel);
Ext.reg('companies-panel-home', Companies.panel.Home);
