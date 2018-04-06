function excerpt_of_string(description, tgt) {
  var index = description.indexOf(tgt);
  var startIndex = index-15;
  var endIndex = Math.min(description.length, index + tgt.length + 15);
  return description.substring(0, endIndex);
}
