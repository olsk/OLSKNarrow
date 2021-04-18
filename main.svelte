<script>
export let OLSKCollectionSortFunction;
export let _OLSKCollectionDispatchKey;
export let OLSKCollectionChunkFunction = null;
export let OLSKCollectionChunkKeySortFunction = null;
export let OLSKCollectionItemClass = '';

export let OLSKNarrowFilterText;
export let OLSKCollectionItems;
export let OLSKCollectionItemsLocus = null;
export let OLSKCollectionItemAccessibilitySummaryFunction;
export let OLSKCollectionDispatchClick;
export let OLSKCollectionDispatchArrow;
export let OLSKCollectionDispatchStash = null;
export let OLSKNarrowDispatchFilter;
export let OLSKNarrowDispatchSubmit = null;

export let OLSKMobileViewInactive = false;

export let OLSKNarrowClass = '';

export let OLSKNarrowFilterFieldClass = '';
export let OLSKNarrowFilterFieldPlaceholderText = '';
export let OLSKNarrowFilterFieldClearButton = true;
export let OLSKNarrowFilterFieldAutofocus = false;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

export const modPublic = {};

const mod = {

	// VALUE

	_ValueFilterFieldFocused: false,

	// DATA

	DataIsFocused () {
		return document.activeElement === document.querySelector('.OLSKNarrowFilterField');
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// INTERFACE

	InterfaceFilterFieldDidInput (event) {
		OLSKNarrowDispatchFilter(this.value);
	},

	InterfaceFormDidSubmit (event) {
		event.preventDefault();

		OLSKNarrowDispatchSubmit && OLSKNarrowDispatchSubmit();
	},

	// MESSAGE

	OLSKInputWrapperDispatchClear () {
		OLSKNarrowDispatchFilter('');
	},

	// SETUP

	SetupEverything () {
		mod.SetupFilterFieldEventListeners();
	},

	SetupFilterFieldEventListeners () {
		document.querySelector('.OLSKNarrowFilterField').addEventListener('focus', function () {
			mod._ValueFilterFieldFocused = true;
		});

		document.querySelector('.OLSKNarrowFilterField').addEventListener('blur', function () {
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
		
		const element = document.querySelector('.OLSKCollectionItemLocus');

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

<div class="OLSKNarrow OLSKViewportMaster OLSKCommonEdgeRight { OLSKNarrowClass }" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } class:OLSKNarrowFocused={ mod._ValueFilterFieldFocused } aria-hidden={ OLSKMobileViewInactive ? true : null }>

<header class="OLSKNarrowToolbar OLSKMobileViewHeader OLSKToolbar OLSKCommonEdgeBottom">
	<slot name="OLSKNarrowToolbarHead"></slot>
	
	{#if OLSKNarrowFilterFieldClearButton }
	<form class="OLSKNarrowForm OLSKToolbarFlexible" on:submit={ mod.InterfaceFormDidSubmit }>
		<OLSKInputWrapper OLSKInputWrapperValue={ OLSKNarrowFilterFieldClearButton ? OLSKNarrowFilterText : '' } OLSKInputWrapperDispatchClear={ mod.OLSKInputWrapperDispatchClear } >
			<input class="OLSKNarrowFilterField { OLSKNarrowFilterFieldClass } OLSKDecorInput" placeholder={ OLSKNarrowFilterFieldPlaceholderText || OLSKLocalized('OLSKNarrowFilterFieldText') } autofocus={ OLSKNarrowFilterFieldAutofocus } bind:value={ OLSKNarrowFilterText } on:input={ mod.InterfaceFilterFieldDidInput } />
		</OLSKInputWrapper>
	</form>
	{:else}
		<input class="OLSKNarrowFilterField { OLSKNarrowFilterFieldClass } OLSKDecorInput" placeholder={ OLSKNarrowFilterFieldPlaceholderText || OLSKLocalized('OLSKNarrowFilterFieldText') } autofocus={ OLSKNarrowFilterFieldAutofocus } bind:value={ OLSKNarrowFilterText } on:input={ mod.InterfaceFilterFieldDidInput } />
	{/if}
	
	<slot name="OLSKNarrowToolbarTail"></slot>
</header>

<section class="OLSKNarrowBody">
	<slot></slot>

	<OLSKCollection
		bind:this={ modPublic._OLSKCollection }

		OLSKCollectionItems={ OLSKCollectionItems }
		OLSKCollectionItemsLocus={ OLSKCollectionItemsLocus }
		OLSKCollectionIgnoreKeyboard={ !mod.DataIsFocused() }
		OLSKCollectionItemClass={ OLSKCollectionItemClass }

		OLSKCollectionSortFunction={ OLSKCollectionSortFunction }
		_OLSKCollectionDispatchKey={ _OLSKCollectionDispatchKey }
		OLSKCollectionChunkFunction={ OLSKCollectionChunkFunction }
		OLSKCollectionChunkKeySortFunction={ OLSKCollectionChunkKeySortFunction }

		OLSKCollectionItemAccessibilitySummaryFunction={ OLSKCollectionItemAccessibilitySummaryFunction }

		OLSKCollectionDispatchClick={ OLSKCollectionDispatchClick }
		OLSKCollectionDispatchArrow={ OLSKCollectionDispatchArrow }
		OLSKCollectionDispatchStash={ OLSKCollectionDispatchStash }

		let:OLSKCollectionItem={ item }
		>
		<div slot="OLSKCollectionItem">
			{#if $$slots.OLSKCollectionItem}
				<slot name="OLSKCollectionItem" OLSKCollectionItem={ item }></slot>	
			{/if}
		</div>
		<div slot="OLSKCollectionEmpty">
			{#if $$slots.OLSKCollectionEmpty}
				<slot name="OLSKCollectionEmpty"></slot>	
			{/if}
		</div>
	</OLSKCollection>

	<slot name="OLSKNarrowBodyTail"></slot>
</section>

</div>
