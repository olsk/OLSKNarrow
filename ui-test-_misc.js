const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		TestObjectID: inputData,
	};
};

describe('OLSKMasterList_Misc', function () {

	describe('OLSKMasterList', function test_OLSKMasterList () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('classes OLSKViewportMaster', function () {
			browser.assert.hasClass(OLSKMasterList, 'OLSKViewportMaster');
		});
		
		it('classes OLSKMasterListClass', function () {
			browser.assert.hasClass(OLSKMasterList, 'TestClass');
		});

		context('focus OLSKMasterListFilterField', function() {

			before(function () {
				browser.assert.hasNoClass(OLSKMasterList, 'OLSKMasterListFocused');
			});

			before(function () {
				return browser.query(OLSKMasterListFilterField).focus();
			});
			
			it('classes OLSKMasterListFocused', function() {
				browser.assert.hasClass(OLSKMasterList, 'OLSKMasterListFocused');
			});

		});

		context('blur OLSKMasterListFilterField', function() {

			before(function () {
				browser.assert.hasClass(OLSKMasterList, 'OLSKMasterListFocused');
			});

			before(function () {
				return browser.query('#TestInputAlternative').focus();
			});

			it('classes OLSKMasterListFocused', function() {
				browser.assert.hasNoClass(OLSKMasterList, 'OLSKMasterListFocused');
			});

		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				browser.assert.hasNoClass(OLSKMasterList, 'OLSKMobileViewInactive');
			});

			before(function () {
				browser.assert.attribute(OLSKMasterList, 'aria-hidden', null);
			});
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKMobileViewInactive: true,
				});
			});

			it('classes OLSKMobileViewInactive', function () {
				browser.assert.hasClass(OLSKMasterList, 'OLSKMobileViewInactive');
			});

			it('sets aria-hidden', function () {
				browser.assert.attribute(OLSKMasterList, 'aria-hidden', 'true');
			});
		
		});

		context('OLSKResultsDispatchArrow', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKMasterListItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
					OLSKMasterListItemSelected: JSON.stringify(uItem('alfa')),
				});
			});

			context('keydown ArrowUp', function() {

				before(function () {
					return browser.query('.OLSKMasterListFilterField').focus();
				});
				
				before(function () {
					browser.assert.text('#TestOLSKMasterListDispatchArrow', '0');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				});

				it('sends OLSKMasterListDispatchArrow', function () {
					browser.assert.text('#TestOLSKMasterListDispatchArrow', '1');
					browser.assert.text('#TestOLSKMasterListDispatchArrowData', JSON.stringify(uItem('bravo')));
				});

			});
		
		});
	
	});

	describe('OLSKMasterListToolbar', function test_OLSKMasterListToolbar () {
		
		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(OLSKMasterListToolbar, 'OLSKMobileViewHeader');
		});

		it('binds OLSKMasterListToolbarHead', function () {
			browser.assert.text('.OLSKMasterListToolbar #TestOLSKMasterListToolbarHead', 'TestOLSKMasterListToolbarHead');
		});

		it('binds OLSKMasterListToolbarTail', function () {
			browser.assert.text('.OLSKMasterListToolbar #TestOLSKMasterListToolbarTail', 'TestOLSKMasterListToolbarTail');
		});
	
	});

	describe('OLSKMasterListFilterField', function test_OLSKMasterListFilterField() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKMasterListFilterText: 'alfa',
			});
		});

		it('binds OLSKMasterListFilterText', function () {
			browser.assert.input(OLSKMasterListFilterField, 'alfa');
		});

		it('sets OLSKInputWrapperValue', function () {
			browser.assert.elements('.OLSKInputWrapperClearButton', 1);
		});
			
		context('input', function () {
		
			before(function () {
				browser.assert.text('#TestOLSKMasterListDispatchFilter', '0');
				browser.assert.text('#TestOLSKMasterListDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill(OLSKMasterListFilterField, 'bravo');
			});

			it('sends OLSKMasterListDispatchFilter', function () {
				browser.assert.text('#TestOLSKMasterListDispatchFilter', '1');
				browser.assert.text('#TestOLSKMasterListDispatchFilterData', 'bravo');
			});
		
		});

		context('clear', function () {

			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('sends OLSKMasterListDispatchFilter', function () {
				browser.assert.text('#TestOLSKMasterListDispatchFilter', '2');
				browser.assert.text('#TestOLSKMasterListDispatchFilterData', '');
			});
		
		});

	});

	describe('OLSKMasterListBody', function test_OLSKMasterListBody () {
		
		it('classes OLSKMobileViewBody', function () {
			browser.assert.hasClass(OLSKMasterListBody, 'OLSKMobileViewBody');
		});
	
	});

	describe('OLSKMasterListItem', function test_OLSKMasterListItem() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKMasterListItems: JSON.stringify([uItem()]),
			});
		});

		it('sets aria-label', function () {
			browser.assert.attribute('.OLSKMasterListItem', 'aria-label', uItem().TestObjectID.repeat(2));
		});
		
		it('sets role', function () {
			browser.assert.attribute('.OLSKMasterListItem', 'role', 'button');
		});
		
		it('sets OLSKResultsListItem', function () {
			browser.assert.text('.OLSKResultsListItem .TestListItem', uItem().TestObjectID.repeat(3));
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestOLSKMasterListDispatchClick', '0');
				browser.assert.text('#TestOLSKMasterListDispatchClickData', 'undefined');
			});
			
			before(function () {
				return browser.click('.OLSKMasterListItem');
			});

			it('sends OLSKMasterListDispatchClick', function () {
				browser.assert.text('#TestOLSKMasterListDispatchClick', '1');
				browser.assert.text('#TestOLSKMasterListDispatchClickData', JSON.stringify(uItem()));
			});
		
		});
		
	});

	describe('OLSKMasterListItemSelected', function test_OLSKMasterListItemSelected() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKMasterListItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
				OLSKMasterListItemSelected: JSON.stringify(uItem('bravo')),
			});
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});
		
	});

});
