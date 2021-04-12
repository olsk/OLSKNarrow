<script>
const inputData = Object.assign({
	OLSKCollectionSortFunction: (function () {}),
	_OLSKCollectionDispatchKey: (function () {}),
	
	OLSKCollectionItems: [],
	OLSKNarrowFilterText: '',
	OLSKCollectionItemAccessibilitySummaryFunction (inputData) {
		return inputData.TestObjectID.repeat(2);
	},
	OLSKCollectionDispatchClick: (function  () {}),
	OLSKCollectionDispatchArrow: (function  (inputData) {
		window.TestOLSKCollectionDispatchArrow.innerHTML = parseInt(window.TestOLSKCollectionDispatchArrow.innerHTML) + 1;
		window.TestOLSKCollectionDispatchArrowData.innerHTML = JSON.stringify(inputData);
	}),
	OLSKNarrowDispatchFilter: (function  (inputData) {
		window.TestOLSKNarrowDispatchFilter.innerHTML = parseInt(window.TestOLSKNarrowDispatchFilter.innerHTML) + 1;
		window.TestOLSKNarrowDispatchFilterData.innerHTML = inputData;
	}),
	OLSKNarrowDispatchSubmit: (function  () {
		window.TestOLSKNarrowDispatchSubmit.innerHTML = parseInt(window.TestOLSKNarrowDispatchSubmit.innerHTML) + 1;
	}),
}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
	if (['OLSKCollectionItems', 'OLSKCollectionItemsLocus', 'OLSKNarrowFilterFieldClearButton', 'OLSKNarrowFilterFieldAutofocus'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	if (e[0] === 'OLSKCollectionItemsLocus') {
		e[1] = coll[0][1].filter(function (item) {
			return item.TestObjectID === e[1].TestObjectID;
		}).shift();
	}

	return e;
})));

import Module from './main.svelte';
</script>

<Module
	{ ...inputData }
	let:OLSKCollectionItem
	>
	<em slot="OLSKNarrowToolbarHead" id="TestOLSKNarrowToolbarHead">TestOLSKNarrowToolbarHead</em>
	<em slot="OLSKNarrowToolbarTail" id="TestOLSKNarrowToolbarTail">TestOLSKNarrowToolbarTail</em>
	<em id="TestOLSKNarrowMain">TestOLSKNarrowMain</em>
	<div slot="OLSKCollectionItem" class="TestListItemChild">{ OLSKCollectionItem.TestObjectID }</div>
	<em slot="OLSKNarrowBodyTail" id="TestOLSKNarrowBodyTail">TestOLSKNarrowBodyTail</em>
</Module>

