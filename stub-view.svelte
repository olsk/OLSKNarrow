<script>
const inputData = Object.assign({
	OLSKCollectionSortFunction: (function () {}),
	_OLSKCollectionDispatchKey: (function () {}),
	
	OLSKMasterListItems: [],
	OLSKMasterListFilterText: '',
	OLSKCollectionItemAccessibilitySummaryFunction (inputData) {
		return inputData.TestObjectID.repeat(2);
	},
	OLSKResultsDispatchClick: (function  () {}),
	OLSKResultsDispatchArrow: (function  (inputData) {
		window.TestOLSKResultsDispatchArrow.innerHTML = parseInt(window.TestOLSKResultsDispatchArrow.innerHTML) + 1;
		window.TestOLSKResultsDispatchArrowData.innerHTML = JSON.stringify(inputData);
	}),
	OLSKMasterListDispatchFilter: (function  (inputData) {
		window.TestOLSKMasterListDispatchFilter.innerHTML = parseInt(window.TestOLSKMasterListDispatchFilter.innerHTML) + 1;
		window.TestOLSKMasterListDispatchFilterData.innerHTML = inputData;
	}),
	OLSKMasterListDispatchSubmit: (function  () {
		window.TestOLSKMasterListDispatchSubmit.innerHTML = parseInt(window.TestOLSKMasterListDispatchSubmit.innerHTML) + 1;
	}),
}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
	if (['OLSKMasterListItems', 'OLSKCollectionItemsLocus', 'OLSKMasterListFilterFieldClearButton', 'OLSKMasterListFilterFieldAutofocus'].includes(e[0])) {
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
	<em slot="OLSKMasterListToolbarHead" id="TestOLSKMasterListToolbarHead">TestOLSKMasterListToolbarHead</em>
	<em slot="OLSKMasterListToolbarTail" id="TestOLSKMasterListToolbarTail">TestOLSKMasterListToolbarTail</em>
	<em id="TestOLSKMasterListMain">TestOLSKMasterListMain</em>
	<div slot="OLSKCollectionItem" class="TestListItemChild">{ OLSKCollectionItem.TestObjectID }</div>
	<em slot="OLSKMasterListBodyTail" id="TestOLSKMasterListBodyTail">TestOLSKMasterListBodyTail</em>
</Module>

