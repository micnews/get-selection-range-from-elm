module.exports = elm => {
  const selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);

  const startContainer = range.startContainer;
  const endContainer = range.endContainer;

  return elm.contains(startContainer) && elm.contains(endContainer)
    ? range : null;
};
