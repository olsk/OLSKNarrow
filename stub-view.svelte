<script>
const inputData = Object.assign({
	OLSKMasterListItems: [],
	OLSKMasterListFilterText: '',
	OLSKMasterListItemAccessibilitySummaryFunction (inputData) {
		return inputData.TestObjectID.repeat(2);
	},
	OLSKResultsDispatchClick: (function  () {}),
	OLSKMasterListDispatchArrow: (function  (inputData) {
		window.TestOLSKMasterListDispatchArrow.innerHTML = parseInt(window.TestOLSKMasterListDispatchArrow.innerHTML) + 1;
		window.TestOLSKMasterListDispatchArrowData.innerHTML = JSON.stringify(inputData);
	}),
	OLSKMasterListDispatchFilter: (function  (inputData) {
		window.TestOLSKMasterListDispatchFilter.innerHTML = parseInt(window.TestOLSKMasterListDispatchFilter.innerHTML) + 1;
		window.TestOLSKMasterListDispatchFilterData.innerHTML = inputData;
	}),
	OLSKMasterListDispatchSubmit: (function  () {
		window.TestOLSKMasterListDispatchSubmit.innerHTML = parseInt(window.TestOLSKMasterListDispatchSubmit.innerHTML) + 1;
	}),
}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
	if (['OLSKMasterListItems', 'OLSKMasterListItemSelected', 'OLSKMasterListFilterFieldClearButton', 'OLSKMasterListFilterFieldAutofocus'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	if (e[0] === 'OLSKMasterListItemSelected') {
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
	let:OLSKResultsListItem
	>
	<em slot="OLSKMasterListToolbarHead" id="TestOLSKMasterListToolbarHead">TestOLSKMasterListToolbarHead</em>
	<em slot="OLSKMasterListToolbarTail" id="TestOLSKMasterListToolbarTail">TestOLSKMasterListToolbarTail</em>
	<em id="TestOLSKMasterListMain">TestOLSKMasterListMain</em>
	<div slot="OLSKMasterListItem" class="TestListItemChild">{ OLSKResultsListItem.TestObjectID }</div>
	<em slot="OLSKMasterListBodyTail" id="TestOLSKMasterListBodyTail">TestOLSKMasterListBodyTail</em>
</Module>

