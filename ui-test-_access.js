const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		TestObjectID: inputData,
	};
};

Object.entries({
	OLSKNarrow: '.OLSKNarrow',
	
	OLSKNarrowToolbar: '.OLSKNarrowToolbar',
	
	OLSKNarrowForm: '.OLSKNarrowForm',
	OLSKNarrowFilterField: '.OLSKNarrowFilterField',

	OLSKNarrowBody: '.OLSKNarrowBody',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('OLSKNarrow_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKNarrow', function () {
		browser.assert.elements(OLSKNarrow, 1);
	});

	it('shows OLSKNarrowToolbar', function () {
		browser.assert.elements(OLSKNarrowToolbar, 1);
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

	it('shows OLSKNarrowForm', function () {
		browser.assert.elements(OLSKNarrowForm, 1);
	});

	it('shows OLSKNarrowFilterField', function () {
		browser.assert.elements(OLSKNarrowFilterField, 1);
	});

	it('shows OLSKNarrowBody', function () {
		browser.assert.elements(OLSKNarrowBody, 1);
	});

	it('shows OLSKCollection', function () {
		browser.assert.elements('.OLSKCollection', 1);
	});

	context('OLSKNarrowFilterFieldClearButton', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKNarrowFilterFieldClearButton: false,
			});
		});

		it('hides OLSKInputWrapper', function () {
			browser.assert.elements('.OLSKInputWrapper', 0);
		});
		
	});

});
