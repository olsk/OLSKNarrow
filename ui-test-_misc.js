const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		TestObjectID: inputData,
	};
};

describe('OLSKNarrow_Misc', function () {

	describe('OLSKNarrow', function test_OLSKNarrow () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKNarrowClass: 'alfa',
			});
		});
		
		it('classes OLSKViewportMaster', function () {
			return browser.assert.hasClass(OLSKNarrow, 'OLSKViewportMaster');
		});
		
		it('classes OLSKCommonEdgeRight', function () {
			return browser.assert.hasClass(OLSKNarrow, 'OLSKCommonEdgeRight');
		});
		
		it('classes OLSKNarrowClass', function () {
			return browser.assert.hasClass(OLSKNarrow, 'alfa');
		});

		context('focus OLSKNarrowFilterField', function() {

			before(function () {
				return browser.assert.hasNoClass(OLSKNarrow, 'OLSKNarrowFocused');
			});

			before(function () {
				return browser.fire(OLSKNarrowFilterField, 'focus');
			});
			
			it('classes OLSKNarrowFocused', function() {
				return browser.assert.hasClass(OLSKNarrow, 'OLSKNarrowFocused');
			});

		});

		context('blur OLSKNarrowFilterField', function() {

			before(function () {
				return browser.assert.hasClass(OLSKNarrow, 'OLSKNarrowFocused');
			});

			before(function () {
				return browser.fire(OLSKNarrowFilterField, 'blur');
				// return browser.fire('#TestInputAlternative', 'focus');
			});

			it('classes OLSKNarrowFocused', function() {
				return browser.assert.hasNoClass(OLSKNarrow, 'OLSKNarrowFocused');
			});

		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				return browser.assert.hasNoClass(OLSKNarrow, 'OLSKMobileViewInactive');
			});

			before(function () {
				return browser.assert.attribute(OLSKNarrow, 'aria-hidden', null);
			});
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKMobileViewInactive: true,
				});
			});

			it('classes OLSKMobileViewInactive', function () {
				return browser.assert.hasClass(OLSKNarrow, 'OLSKMobileViewInactive');
			});

			it('sets aria-hidden', function () {
				return browser.assert.attribute(OLSKNarrow, 'aria-hidden', 'true');
			});
		
		});

		context('OLSKCollectionDispatchArrow', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKCollectionItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
					OLSKCollectionItemsLocus: JSON.stringify(uItem('alfa')),
				});
			});

			context('focused', function() {

				before(function () {
					return browser.fire(OLSKNarrowFilterField, 'focus');
				});
				
				before(function () {
					return browser.assert.text('#TestOLSKCollectionDispatchArrow', '0');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				});

				it.skip('sends OLSKCollectionDispatchArrow', function () {
					browser.assert.text('#TestOLSKCollectionDispatchArrow', '1');
					browser.assert.text('#TestOLSKCollectionDispatchArrowData', JSON.stringify(uItem('bravo')));
				});

			});

			context('not focused', function() {

				before(function() {
					return browser.OLSKVisit(kDefaultRoute, {
						OLSKCollectionItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
						OLSKCollectionItemsLocus: JSON.stringify(uItem('alfa')),
					});
				});

				before(function () {
					return browser.fire('#TestInputAlternative', 'focus');
				});
				
				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				});

				it('sends no OLSKCollectionDispatchArrow', function () {
					return browser.assert.text('#TestOLSKCollectionDispatchArrow', '0');
				});

			});
		
		});
	
	});

	describe('OLSKNarrowToolbar', function test_OLSKNarrowToolbar () {
		
		it('classes OLSKMobileViewHeader', function () {
			return browser.assert.hasClass(OLSKNarrowToolbar, 'OLSKMobileViewHeader');
		});

		it('classes OLSKToolbar', function () {
			return browser.assert.hasClass(OLSKNarrowToolbar, 'OLSKToolbar');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			return browser.assert.hasClass(OLSKNarrowToolbar, 'OLSKCommonEdgeBottom');
		});

		it('binds OLSKNarrowToolbarHead', function () {
			return browser.assert.text('.OLSKNarrowToolbar #TestOLSKNarrowToolbarHead', 'TestOLSKNarrowToolbarHead');
		});

		it('binds OLSKNarrowToolbarTail', function () {
			return browser.assert.text('.OLSKNarrowToolbar #TestOLSKNarrowToolbarTail', 'TestOLSKNarrowToolbarTail');
		});
	
	});

	describe('OLSKNarrowForm', function test_OLSKNarrowForm() {
		
		it('classes OLSKToolbarFlexible', function () {
			return browser.assert.hasClass(OLSKNarrowForm, 'OLSKToolbarFlexible');
		});
	
	});

	describe('OLSKNarrowFilterField', function test_OLSKNarrowFilterField() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKNarrowFilterText: 'alfa',
				OLSKNarrowFilterFieldClass: 'bravo',
				OLSKNarrowFilterFieldPlaceholderText: 'charlie',
			});
		});

		it('binds OLSKNarrowFilterText', function () {
			return browser.assert.input(OLSKNarrowFilterField, 'alfa');
		});

		it('sets OLSKInputWrapperValue', function () {
			return browser.assert.elements('.OLSKInputWrapperClearButton', 1);
		});
		
		it('classes OLSKDecorInput', function () {
			return browser.assert.hasClass(OLSKNarrowFilterField, 'OLSKDecorInput');
		});
		
		it('classes OLSKNarrowFilterFieldClass', function () {
			return browser.assert.hasClass(OLSKNarrowFilterField, 'bravo');
		});

		it('binds OLSKNarrowFilterFieldPlaceholderText', function () {
			return browser.assert.attribute(OLSKNarrowFilterField, 'placeholder', 'charlie');
		});

		it('sets autofocus', function () {
			return browser.assert.attribute(OLSKNarrowFilterField, 'autofocus', null);
		});
			
		context('input', function () {
		
			before(function () {
				browser.assert.text('#TestOLSKNarrowDispatchFilter', '0');
				browser.assert.text('#TestOLSKNarrowDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill(OLSKNarrowFilterField, 'bravo');
			});

			it('sends OLSKNarrowDispatchFilter', function () {
				browser.assert.text('#TestOLSKNarrowDispatchFilter', '1');
				browser.assert.text('#TestOLSKNarrowDispatchFilterData', 'bravo');
			});
		
		});

		context('clear', function () {

			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('sends OLSKNarrowDispatchFilter', function () {
				browser.assert.text('#TestOLSKNarrowDispatchFilter', '2');
				browser.assert.text('#TestOLSKNarrowDispatchFilterData', '');
			});
		
		});
			
		context('submit', function () {

			const item = Math.random().toString();
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute);
			});

			before(function () {
				return browser.assert.text('#TestOLSKNarrowDispatchSubmit', '0');
			});

			before(function () {
				return browser.fill(OLSKNarrowFilterField, item);
			});

			before(function () {
				return browser.fire(OLSKNarrowForm, 'submit');
			});

			it('sends OLSKNarrowDispatchSubmit', function () {
				return browser.assert.text('#TestOLSKNarrowDispatchSubmit', '1');
			});
		
		});

		context('OLSKNarrowFilterFieldAutofocus', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKNarrowFilterFieldAutofocus: true,
				});
			});

			it('sets autofocus', function () {
				return browser.assert.attribute(OLSKNarrowFilterField, 'autofocus', '');
			});

		});

	});

	describe('OLSKNarrowBody', function test_OLSKNarrowBody () {
		
		it('binds OLSKNarrowMain', function () {
			return browser.assert.text('.OLSKNarrowBody #TestOLSKNarrowMain', 'TestOLSKNarrowMain');
		});
	
		it('binds OLSKNarrowBodyTail', function () {
			return browser.assert.text('.OLSKNarrowBody #TestOLSKNarrowBodyTail', 'TestOLSKNarrowBodyTail');
		});
	
	});

	describe('OLSKCollectionItem', function test_OLSKCollectionItem() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKCollectionItems: JSON.stringify([uItem()]),
			});
		});
		
		it('sets OLSKCollectionItem', function () {
			return browser.assert.text('.OLSKCollectionItem .TestListItemChild', uItem().TestObjectID);
		});
		
	});

	describe('OLSKCollectionItemsLocus', function test_OLSKCollectionItemsLocus() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKCollectionItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
				OLSKCollectionItemsLocus: JSON.stringify(uItem('bravo')),
			});
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
			browser.assert.hasClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});
		
	});

});
