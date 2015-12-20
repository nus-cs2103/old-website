


function fetchSearchData(callback) {
  $.getJSON('../contents/search-data.json', function(data) {
    callback(data);
  });
}

function buildCategoryTree(data) {
  var adjacencyList = {};
  var parent;
  for (i in data) {
    parent = data[i].parent;
    if (adjacencyList[parent] == null) {
      adjacencyList[parent] = [];
    }
    adjacencyList[parent].push(data[i]);
  }
  return adjacencyList;
}

function constructSearch() {
  fetchSearchData(function(data) {
    var categoryTree = buildCategoryTree(data);

    // First level categories
    var mainCategories = categoryTree[""];
    var length = mainCategories.length;
    var firstColumnLength = Math.trunc(length/2);
    var secondColumnLength = length - firstColumnLength;

    var firstColumnCategories = mainCategories.slice(0, firstColumnLength);
    var secondColumnCategories = mainCategories.slice(firstColumnLength, length);
    
  });
}

$(document).ready(function() {

  constructSearch();
});