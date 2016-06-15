module.exports = elm => {
  const selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const {startContainer: start, endContainer: end} = range;
  const {width, height} = range.getBoundingClientRect();
  return elm.contains(start) && elm.contains(end) && width > 0 && height > 0
    ? range : null;
};
