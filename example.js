import getSelectionRangeFromElm from 'get-selection-range-from-elm';

const range = getSelectionRangeFromElm(document.querySelector('#foo'));

console.log('range is set if selection is within the element #foo');
console.log(range.startContainer);
