<script>
export let OLSKMasterListFilterText;
export let OLSKMasterListItems;
export let OLSKMasterListItemSelected = null;
export let OLSKMasterListItemAccessibilitySummaryFor;
export let OLSKMasterListDispatchClick;
export let OLSKMasterListDispatchArrow;
export let OLSKMasterListDispatchFilter;

export let OLSKMobileViewInactive = false;

export let OLSKMasterListClass = '';

export let OLSKMasterListFilterFieldClass = '';
export let OLSKMasterListFilterFieldPlaceholderText = '';
export let OLSKMasterListFilterFieldClearButton = true;
export let OLSKMasterListFilterFieldAutofocus = false;

export let OLSKMasterItemClass = '';

export let OLSKResultsIgnoreKeyboard = false;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

const mod = {

	// VALUE

	_ValueFilterFieldFocused: false,

	// DATA

	DataIsFocused () {
		return document.activeElement === document.querySelector('.OLSKMasterListFilterField');
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// INTERFACE

	InterfaceFilterFieldDidInput (event) {
		OLSKMasterListDispatchFilter(this.value);
	},

	// MESSAGE

	OLSKInputWrapperDispatchClear () {
		OLSKMasterListDispatchFilter('');
	},

	// SETUP

	SetupEverything () {
		mod.SetupFilterFieldEventListeners();
	},

	SetupFilterFieldEventListeners () {
		setTimeout(function () {
			document.querySelector('.OLSKMasterListFilterField').addEventListener('focus', function () {
				mod._ValueFilterFieldFocused = true;
			});

			document.querySelector('.OLSKMasterListFilterField').addEventListener('blur', function () {
				mod._ValueFilterFieldFocused = false;
			});
		}, 100);
	},

	// LIFECYCLE

	LifecycleComponentDidMount () {
		mod.SetupEverything();
	},

	LifecycleComponentDidUpdate () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			return;
		}

		if (mod.DataIsMobile()) {
			return;
		}
		
		const element = document.querySelector('.OLSKResultsListItemSelected');

		if (!element) {
			return;
		}
		
		element.scrollIntoView({
			block: 'nearest',
			inline: 'nearest',
		});
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleComponentDidMount);

import { afterUpdate } from 'svelte';
afterUpdate(mod.LifecycleComponentDidUpdate);

import OLSKInputWrapper from 'OLSKInputWrapper';
import OLSKResults from 'OLSKResults';
</script>

<div class="OLSKMasterList OLSKViewportMaster { OLSKMasterListClass }" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } class:OLSKMasterListFocused={ mod._ValueFilterFieldFocused } aria-hidden={ OLSKMobileViewInactive ? true : null }>

<header class="OLSKMasterListToolbar OLSKMobileViewHeader OLSKToolbar">
	<slot name="OLSKMasterListToolbarHead"></slot>

	<OLSKInputWrapper OLSKInputWrapperValue={ OLSKMasterListFilterFieldClearButton ? OLSKMasterListFilterText : '' } OLSKInputWrapperDispatchClear={ mod.OLSKInputWrapperDispatchClear } >
		<input class="OLSKMasterListFilterField OLSKMobileSafariRemoveDefaultInputStyle { OLSKMasterListFilterFieldClass }" placeholder={ OLSKMasterListFilterFieldPlaceholderText || OLSKLocalized('OLSKMasterListFilterFieldText') } autofocus={ OLSKMasterListFilterFieldAutofocus } bind:value={ OLSKMasterListFilterText } on:input={ mod.InterfaceFilterFieldDidInput } />
	</OLSKInputWrapper>
	
	<slot name="OLSKMasterListToolbarTail"></slot>
</header>

<section class="OLSKMasterListBody OLSKMobileViewBody">
	<OLSKResults
		OLSKResultsListItems={ OLSKMasterListItems }
		OLSKResultsListItemSelected={ OLSKMasterListItemSelected }
		OLSKResultsDispatchClick={ OLSKMasterListDispatchClick }
		OLSKResultsDispatchArrow={ (inputData) => mod.DataIsFocused() && OLSKMasterListDispatchArrow(inputData) }
		let:OLSKResultsListItem={ item }
		OLSKResultsIgnoreKeyboard={ OLSKResultsIgnoreKeyboard }
		>
		<div class="OLSKMasterListItem { OLSKMasterItemClass }" aria-label={ OLSKMasterListItemAccessibilitySummaryFor(item) } role="button">
			<slot OLSKResultsListItem={ item }></slot>
		</div>
	</OLSKResults>

	<slot name="OLSKMasterListBodyTail"></slot>
</section>

</div>
