import test from 'tapava';
import getSelectionRangeFromElm from './lib/index';

const setNewSelectionRange = (startElm, startPosition, endElm, endPosition) => {
  const selection = window.getSelection();
  selection.removeAllRanges();
  const range = document.createRange();
  range.setStart(startElm, startPosition);
  range.setEnd(endElm, endPosition);
  selection.addRange(range);
};

test('no selection', t => {
  const elm = document.body.appendChild(document.createElement('div'));
  const actual = getSelectionRangeFromElm(elm);
  const expected = null;
  t.is(actual, expected);
});

test('selection, not within elm', t => {
  const elm1 = document.body.appendChild(document.createElement('div'));
  const elm2 = document.body.appendChild(document.createElement('div'));
  setNewSelectionRange(elm2, 0, elm2, 0);
  const actual = getSelectionRangeFromElm(elm1);
  const expected = null;
  t.is(actual, expected);
});

test('selection, within elm & no size', t => {
  const elm = document.body.appendChild(document.createElement('div'));
  setNewSelectionRange(elm, 0, elm, 0);
  const actual = getSelectionRangeFromElm(elm);
  const expectedContainer = elm;
  const expectedStartOffset = 0;
  const expectedEndOffset = 0;
  t.is(actual.startContainer, expectedContainer);
  t.is(actual.endContainer, expectedContainer);
  t.is(actual.startOffset, expectedStartOffset);
  t.is(actual.endOffset, expectedEndOffset);
});

test('selection, within elm & with size', t => {
  const elm = document.body.appendChild(document.createTextNode('beep boop'));
  setNewSelectionRange(elm, 0, elm, 3);
  const actual = getSelectionRangeFromElm(elm);
  const expectedContainer = elm;
  const expectedStartOffset = 0;
  const expectedEndOffset = 3;
  t.is(actual.startContainer, expectedContainer);
  t.is(actual.endContainer, expectedContainer);
  t.is(actual.startOffset, expectedStartOffset);
  t.is(actual.endOffset, expectedEndOffset);
});

test('selection, startContainer within elm but not endContainer', t => {
  const elm = document.body.appendChild(document.createElement('div'));
  const startChild = elm.appendChild(document.createElement('div'));
  const endChild = elm.appendChild(document.createElement('div'));
  setNewSelectionRange(startChild, 0, endChild, 0);
  const actual = getSelectionRangeFromElm(startChild);
  const expected = null;
  t.is(actual, expected);
});

test('selection, endContainer within elm but not startContainer', t => {
  const elm = document.body.appendChild(document.createElement('div'));
  const startChild = elm.appendChild(document.createElement('div'));
  const endChild = elm.appendChild(document.createElement('div'));
  setNewSelectionRange(startChild, 0, endChild, 0);
  const actual = getSelectionRangeFromElm(endChild);
  const expected = null;
  t.is(actual, expected);
});

test.onFinish(window.close);
