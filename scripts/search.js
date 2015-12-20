


function fetchSearchData(callback) {
  $.getJSON('../contents/search-data.json', function(data) {
    callback(data);
  });
}

function buildKeywordTree(data) {
  var adjacencyList = {};
  var parent;
  for (i in data) {
    parent = data[i].parent;
    if (adjacencyList[parent] == null) {
      adjacencyList[parent] = [];
    }
    adjacencyList[parent].push(data[i]);
  }

  console.log(adjacencyList);
}

function constructSearch() {
  fetchSearchData(function(data) {
    buildKeywordTree(data);
  });
}

$(document).ready(function() {

  constructSearch();
});