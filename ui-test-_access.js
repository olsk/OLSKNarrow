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
	return global[e.shift()] = e.pop();
});

describe('OLSKNarrow_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKNarrow', function () {
		return browser.assert.elements(OLSKNarrow, 1);
	});

	it('shows OLSKNarrowToolbar', function () {
		return browser.assert.elements(OLSKNarrowToolbar, 1);
	});

	it('shows OLSKToolbar', function () {
		return browser.assert.elements('.OLSKToolbar', 1);
	});

	it('shows OLSKInputWrapper', function () {
		return browser.assert.elements('.OLSKInputWrapper', 1);
	});

	it('shows OLSKInputWrapper', function () {
		return browser.assert.elements('.OLSKInputWrapper', 1);
	});

	it('shows OLSKNarrowForm', function () {
		return browser.assert.elements(OLSKNarrowForm, 1);
	});

	it('shows OLSKNarrowFilterField', function () {
		return browser.assert.elements(OLSKNarrowFilterField, 1);
	});

	it('shows OLSKNarrowBody', function () {
		return browser.assert.elements(OLSKNarrowBody, 1);
	});

	it('shows OLSKCollection', function () {
		return browser.assert.elements('.OLSKCollection', 1);
	});

	context('OLSKNarrowFilterFieldClearButton', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKNarrowFilterFieldClearButton: false,
			});
		});

		it('hides OLSKInputWrapper', function () {
			return browser.assert.elements('.OLSKInputWrapper', 0);
		});
		
	});

});
