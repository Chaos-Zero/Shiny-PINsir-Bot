  function getFirstWord(str) {
  let spaceIndex = str.indexOf(" ");
  return spaceIndex === -1 ? str : str.substr(0, spaceIndex);
}
