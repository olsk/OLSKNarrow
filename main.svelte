<script>
export let OLSKCollectionSortFunction;
export let _OLSKCollectionDispatchKey;

export let OLSKMasterListFilterText;
export let OLSKCollectionItems;
export let OLSKCollectionItemsLocus = null;
export let OLSKCollectionItemAccessibilitySummaryFunction;
export let OLSKCollectionDispatchClick;
export let OLSKCollectionDispatchArrow;
export let OLSKMasterListDispatchFilter;
export let OLSKMasterListDispatchSubmit = null;

export let OLSKMobileViewInactive = false;

export let OLSKMasterListClass = '';

export let OLSKMasterListFilterFieldClass = '';
export let OLSKMasterListFilterFieldPlaceholderText = '';
export let OLSKMasterListFilterFieldClearButton = true;
export let OLSKMasterListFilterFieldAutofocus = false;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec'

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

	InterfaceFormDidSubmit (event) {
		event.preventDefault();

		OLSKMasterListDispatchSubmit && OLSKMasterListDispatchSubmit();
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
		document.querySelector('.OLSKMasterListFilterField').addEventListener('focus', function () {
			mod._ValueFilterFieldFocused = true;
		});

		document.querySelector('.OLSKMasterListFilterField').addEventListener('blur', function () {
			mod._ValueFilterFieldFocused = false;
		});
	},

	// LIFECYCLE

	LifecycleComponentDidMount () {
		mod.SetupEverything();
	},

	LifecycleComponentDidUpdate () {
		if (OLSK_SPEC_UI()) {
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
import OLSKCollection from 'OLSKCollection';
</script>

<div class="OLSKMasterList OLSKViewportMaster OLSKCommonEdgeRight { OLSKMasterListClass }" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } class:OLSKMasterListFocused={ mod._ValueFilterFieldFocused } aria-hidden={ OLSKMobileViewInactive ? true : null }>

<header class="OLSKMasterListToolbar OLSKMobileViewHeader OLSKToolbar OLSKCommonEdgeBottom">
	<slot name="OLSKMasterListToolbarHead"></slot>
	
	{#if OLSKMasterListFilterFieldClearButton }
	<form class="OLSKMasterListForm OLSKToolbarFlexible" on:submit={ mod.InterfaceFormDidSubmit }>
		<OLSKInputWrapper OLSKInputWrapperValue={ OLSKMasterListFilterFieldClearButton ? OLSKMasterListFilterText : '' } OLSKInputWrapperDispatchClear={ mod.OLSKInputWrapperDispatchClear } >
			<input class="OLSKMasterListFilterField { OLSKMasterListFilterFieldClass } OLSKDecorInput" placeholder={ OLSKMasterListFilterFieldPlaceholderText || OLSKLocalized('OLSKMasterListFilterFieldText') } autofocus={ OLSKMasterListFilterFieldAutofocus } bind:value={ OLSKMasterListFilterText } on:input={ mod.InterfaceFilterFieldDidInput } />
		</OLSKInputWrapper>
	</form>
	{:else}
		<input class="OLSKMasterListFilterField { OLSKMasterListFilterFieldClass } OLSKDecorInput" placeholder={ OLSKMasterListFilterFieldPlaceholderText || OLSKLocalized('OLSKMasterListFilterFieldText') } autofocus={ OLSKMasterListFilterFieldAutofocus } bind:value={ OLSKMasterListFilterText } on:input={ mod.InterfaceFilterFieldDidInput } />
	{/if}
	
	<slot name="OLSKMasterListToolbarTail"></slot>
</header>

<section class="OLSKMasterListBody">
	<slot></slot>

	<OLSKCollection
		OLSKCollectionItems={ OLSKCollectionItems }
		OLSKCollectionItemsLocus={ OLSKCollectionItemsLocus }
		OLSKCollectionIgnoreKeyboard={ !mod.DataIsFocused() }

		OLSKCollectionSortFunction={ OLSKCollectionSortFunction }
		_OLSKCollectionDispatchKey={ _OLSKCollectionDispatchKey }

		OLSKCollectionItemAccessibilitySummaryFunction={ OLSKCollectionItemAccessibilitySummaryFunction }

		OLSKCollectionDispatchClick={ OLSKCollectionDispatchClick }
		OLSKCollectionDispatchArrow={ OLSKCollectionDispatchArrow }

		let:OLSKCollectionItem={ item }
		>
		<div slot="OLSKCollectionItem">
			{#if $$slots.OLSKCollectionItem}
				<slot name="OLSKCollectionItem" OLSKCollectionItem={ item }></slot>	
			{/if}
		</div>
	</OLSKCollection>

	<slot name="OLSKMasterListBodyTail"></slot>
</section>

</div>
