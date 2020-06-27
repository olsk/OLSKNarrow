const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		TestObjectID: inputData,
	};
};

Object.entries({
	OLSKMasterList: '.OLSKMasterList',
	
	OLSKMasterListToolbar: '.OLSKMasterListToolbar',
	
	OLSKMasterListFilterField: '.OLSKMasterListFilterField',

	OLSKMasterListBody: '.OLSKMasterListBody',
	OLSKMasterListItem: '.OLSKMasterListItem',
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

	it('shows OLSKMasterListFilterField', function () {
		browser.assert.elements(OLSKMasterListFilterField, 1);
	});

	it('shows OLSKMasterListBody', function () {
		browser.assert.elements(OLSKMasterListBody, 1);
	});

	it('shows OLSKResults', function () {
		browser.assert.elements('.OLSKResults', 1);
	});

	it('hides OLSKMasterListItem', function () {
		browser.assert.elements(OLSKMasterListItem, 0);
	});

	context('OLSKMasterListItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKMasterListItems: JSON.stringify([uItem()]),
			});
		});

		it('shows OLSKMasterListItem', function () {
			browser.assert.elements(OLSKMasterListItem, 1);
		});
		
	});

});
