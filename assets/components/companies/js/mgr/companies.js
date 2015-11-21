var Companies = function (config) {
	config = config || {};
	Companies.superclass.constructor.call(this, config);
};
Ext.extend(Companies, Ext.Component, {
	page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('companies', Companies);

Companies = new Companies();