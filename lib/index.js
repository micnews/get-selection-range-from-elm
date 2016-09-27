module.exports = elm => {
  const selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const {startContainer: start, endContainer: end} = range;
  return elm.contains(start) && elm.contains(end) ? range : null;
};
