const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		TestObjectID: inputData,
	};
};

Object.entries({
	OLSKMasterList: '.OLSKMasterList',
	
	OLSKMasterListToolbar: '.OLSKMasterListToolbar',
	
	OLSKMasterListForm: '.OLSKMasterListForm',
	OLSKMasterListFilterField: '.OLSKMasterListFilterField',

	OLSKMasterListBody: '.OLSKMasterListBody',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('OLSKMasterList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements(OLSKMasterList, 1);
	});

	it('shows OLSKMasterListToolbar', function () {
		browser.assert.elements(OLSKMasterListToolbar, 1);
	});

	it('shows OLSKToolbar', function () {
		browser.assert.elements('.OLSKToolbar', 1);
	});

	it('shows OLSKInputWrapper', function () {
		browser.assert.elements('.OLSKInputWrapper', 1);
	});

	it('shows OLSKInputWrapper', function () {
		browser.assert.elements('.OLSKInputWrapper', 1);
	});

	it('shows OLSKMasterListForm', function () {
		browser.assert.elements(OLSKMasterListForm, 1);
	});

	it('shows OLSKMasterListFilterField', function () {
		browser.assert.elements(OLSKMasterListFilterField, 1);
	});

	it('shows OLSKMasterListBody', function () {
		browser.assert.elements(OLSKMasterListBody, 1);
	});

	it('shows OLSKCollection', function () {
		browser.assert.elements('.OLSKCollection', 1);
	});

	context('OLSKMasterListFilterFieldClearButton', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKMasterListFilterFieldClearButton: false,
			});
		});

		it('hides OLSKInputWrapper', function () {
			browser.assert.elements('.OLSKInputWrapper', 0);
		});
		
	});

});
