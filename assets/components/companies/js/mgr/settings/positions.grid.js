Companies.grid.Status = function(config) {
	config = config || {};

	this.exp = new Ext.grid.RowExpander({
		expandOnDblClick: false
		,tpl : new Ext.Template('<p class="desc">{description}</p>')
		,renderer : function(v, p, record){return record.data.description != '' && record.data.description != null ? '<div class="x-grid3-row-expander">&#160;</div>' : '&#160;';}
	});
	this.dd = function(grid) {
		this.dropTarget = new Ext.dd.DropTarget(grid.container, {
			ddGroup : 'dd',
			copy:false,
			notifyDrop : function(dd, e, data) {
				var store = grid.store.data.items;
				var target = store[dd.getDragData(e).rowIndex].id;
				var source = store[data.rowIndex].id;
				if (target != source) {
					dd.el.mask(_('loading'),'x-mask-loading');
					MODx.Ajax.request({
						url: Companies.config.connector_url
						,params: {
							action: config.action || 'mgr/settings/position/sort'
							,source: source
							,target: target
						}
						,listeners: {
							success: {fn:function(r) {dd.el.unmask();grid.refresh();},scope:grid}
							,failure: {fn:function(r) {dd.el.unmask();},scope:grid}
						}
					});
				}
			}
		});
	};

	Ext.applyIf(config,{
		id: 'companies-grid-position'
		,url: Companies.config.connector_url
		,baseParams: {
			action: 'mgr/settings/position/getlist'
		}
		,fields: ['id','name','description','color','email_user','email_manager','subject_user','subject_manager','body_user','body_manager','active','final','fixed','rank','editable']
		,autoHeight: true
		,paging: true
		,remoteSort: true
		,save_action: 'mgr/settings/position/updatefromgrid'
		,autosave: true
		,plugins: this.exp
		,columns: [this.exp
			,{header: _('id'),dataIndex: 'id',width: 50}
			,{header: _('name'),dataIndex: 'name',width: 150, editor: {xtype: 'textfield', allowBlank: false}}
//			,{header: _('ms2_color'),dataIndex: 'color',renderer: this.renderColor, width: 50}
//			,{header: _('ms2_email_user'),dataIndex: 'email_user',width: 50, renderer: this.renderBoolean}
//			,{header: _('ms2_email_manager'),dataIndex: 'email_manager',width: 50, renderer: this.renderBoolean}
//			,{header: _('ms2_active'),dataIndex: 'active',width: 50, editor: {xtype: 'combo-boolean', renderer: 'boolean'}}
//			,{header: _('ms2_position_final'),dataIndex: 'final',width: 50, editor: {xtype: 'combo-boolean', renderer: 'boolean'}}
//			,{header: _('ms2_position_fixed'),dataIndex: 'fixed',width: 50, editor: {xtype: 'combo-boolean', renderer: 'boolean'}}
		]
		,tbar: [{
			text: _('ms2_btn_create')
			,handler: this.createStatus
			,scope: this
		}]
		,ddGroup: 'dd'
		,enableDragDrop: true
		,listeners: {render: {fn: this.dd, scope: this}}
	});
	Companies.grid.Status.superclass.constructor.call(this,config);
};
Ext.extend(Companies.grid.Status,MODx.grid.Grid,{
	windows: {}

	,getMenu: function() {
		var m = [];
		m.push({
			text: _('ms2_menu_update')
			,handler: this.updateStatus
		});
		if (this.menu.record.editable) {
			m.push('-');
			m.push({
				text: _('ms2_menu_remove')
				,handler: this.removeStatus
			});
		}
		this.addContextMenuItem(m);
	}

	,renderColor: function(value) {
		return '<div style="width: 30px; height: 20px; border-radius: 3px; background: #' + value + '">&nbsp;</div>'
	}

	,renderBoolean: function(value) {
		if (value == 1) {return _('yes');}
		else {return _('no');}
	}

	,createStatus: function(btn,e) {
		if (!this.windows.createStatus) {
			this.windows.createStatus = MODx.load({
				xtype: 'companies-window-position-create'
				,fields: this.getStatusFields('create')
				,listeners: {
					success: {fn:function() { this.refresh(); },scope:this}
				}
			});
		}
		this.windows.createStatus.fp.getForm().reset();
		this.windows.createStatus.fp.getForm().setValues({color:'000000'});
		this.windows.createStatus.show(e.target);
	}

	,updateStatus: function(btn,e) {
		if (!this.menu.record || !this.menu.record.id) return false;
		var r = this.menu.record;

		if (!this.windows.updateStatus) {
			this.windows.updateStatus = MODx.load({
				xtype: 'companies-window-position-update'
				,record: r
				,fields: this.getStatusFields('update')
				,listeners: {
					success: {fn:function() { this.refresh(); },scope:this}
				}
			});
		}
		this.windows.updateStatus.fp.getForm().reset();
		this.windows.updateStatus.show(e.target);
		this.windows.updateStatus.fp.getForm().setValues(r);
	}

	,removeStatus: function(btn,e) {
		if (!this.menu.record) return false;

		MODx.msg.confirm({
			title: _('ms2_menu_remove') + '"' + this.menu.record.name + '"'
			,text: _('ms2_menu_remove_confirm')
			,url: this.config.url
			,params: {
				action: 'mgr/settings/position/remove'
				,id: this.menu.record.id
			}
			,listeners: {
				success: {fn:function(r) {this.refresh();}, scope:this}
			}
		});
	}

	,getStatusFields: function(type) {
		return [
			{xtype: 'hidden',name: 'id', id: 'companies-position-id-'+type}
			,{xtype: 'hidden',name: 'color',id: 'companies-newposition-color-'+type}
			,{xtype: 'textfield',fieldLabel: _('ms2_name'), name: 'name', allowBlank: false, anchor: '99%', id: 'companies-position-name-'+type}
			,{xtype: 'colorpalette', fieldLabel: _('ms2_color'), id: 'companies-position-colorpalette-'+type
				,listeners: {
					select: function(palette, setColor) {
						Ext.getCmp('companies-newposition-color-'+type).setValue(setColor)
					}
					,beforerender: function(palette) {
						var color = Ext.getCmp('companies-newposition-color-'+type).value;
						if (color != 'undefined') {
							palette.value = color;
						}
					}
				}
			}
			,{xtype: 'xcheckbox', fieldLabel: _('ms2_email_user'),name: 'email_user', id: 'companies-position-email_user-'+type
				,listeners: {
					check: {fn: function(r) { this.handleStatusFields('user-'+type);},scope:this }
					,afterrender: {fn: function(r) { this.handleStatusFields('user-'+type);},scope:this }
				}
				,style: 'height: 30px;'
			}
			,{xtype: 'textfield', fieldLabel: _('ms2_subject_user'),name: 'subject_user',id: 'companies-position-subject_user-'+type,anchor: '99%'}
			,{xtype: 'companies-combo-chunk',fieldLabel: _('ms2_body_user'), name: 'body_user',hiddenName: 'body_user',id: 'companies-position-body_user-'+type, anchor: '99%'}

			,{xtype: 'xcheckbox',fieldLabel: _('ms2_email_manager'),name: 'email_manager',id: 'companies-position-email_manager-'+type
				,listeners: {
					check: {fn: function(r) { this.handleStatusFields('manager-'+type);},scope:this }
					,afterrender: {fn: function(r) { this.handleStatusFields('manager-'+type);},scope:this }
				}
				,style: 'height: 30px;'
			}
			,{xtype: 'textfield',fieldLabel: _('ms2_subject_manager'),name: 'subject_manager',id: 'companies-position-subject_manager-'+type,anchor: '99%'}
			,{xtype: 'companies-combo-chunk',fieldLabel: _('ms2_body_manager'),name: 'body_manager',hiddenName: 'body_manager',id: 'companies-position-body_manager-'+type, anchor: '99%'}
			,{xtype: 'textarea', fieldLabel: _('ms2_description'), name: 'description', anchor: '99%', id: 'companies-position-description-'+type}
			,{xtype: 'checkboxgroup'
				,fieldLabel: _('ms2_options')
				,columns: 1
				,items: [
					{xtype: 'xcheckbox', boxLabel: _('ms2_active'), name: 'active', id: 'companies-position-active-'+type}
					,{xtype: 'xcheckbox', boxLabel: _('ms2_position_final'), description: _('ms2_position_final_help'), name: 'final', id: 'companies-position-final-'+type}
					,{xtype: 'xcheckbox', boxLabel: _('ms2_position_fixed'), description: _('ms2_position_fixed_help'), name: 'fixed', id: 'companies-position-fixed-'+type}
				]
			}
		];
	}

	,handleStatusFields: function(v) {
		var el = Ext.getCmp('companies-position-email_'+v);
		var subject = Ext.getCmp('companies-position-subject_'+v);
		var body = Ext.getCmp('companies-position-body_'+v);
		if (el.checked) {
			subject.allowBlank = false;
			body.allowBlank = false;
			subject.enable().show();
			body.enable().show();
		}
		else {
			subject.allowBlank = true;
			body.allowBlank = true;
			subject.hide().disable();
			body.hide().disable();
		}
	}

	,beforeDestroy: function() {
		if (this.rendered) {
			this.dropTarget.destroy();
		}
		Companies.grid.Status.superclass.beforeDestroy.call(this);
	}
});
Ext.reg('companies-grid-position',Companies.grid.Status);




Companies.window.CreateStatus = function(config) {
	config = config || {};
	this.ident = config.ident || 'mecitem'+Ext.id();
	Ext.applyIf(config,{
		title: _('ms2_menu_create')
		,id: this.ident
		,width: 600
		,autoHeight: true
		,labelAlign: 'left'
		,labelWidth: 180
		,url: Companies.config.connector_url
		,action: 'mgr/settings/position/create'
		,fields: config.fields
		,keys: [{key: Ext.EventObject.ENTER,shift: true,fn: function() {this.submit() },scope: this}]
	});
	Companies.window.CreateStatus.superclass.constructor.call(this,config);
};
Ext.extend(Companies.window.CreateStatus,MODx.Window);
Ext.reg('companies-window-position-create',Companies.window.CreateStatus);


Companies.window.UpdateStatus = function(config) {
	config = config || {};
	this.ident = config.ident || 'meuitem'+Ext.id();
	Ext.applyIf(config,{
		title: _('ms2_menu_update')
		,id: this.ident
		,width: 600
		,autoHeight: true
		,labelAlign: 'left'
		,labelWidth: 180
		,url: Companies.config.connector_url
		,action: 'mgr/settings/position/update'
		,fields: config.fields
		,keys: [{key: Ext.EventObject.ENTER,shift: true,fn: function() {this.submit() },scope: this}]
	});
	Companies.window.UpdateStatus.superclass.constructor.call(this,config);
};
Ext.extend(Companies.window.UpdateStatus,MODx.Window);
Ext.reg('companies-window-position-update',Companies.window.UpdateStatus);