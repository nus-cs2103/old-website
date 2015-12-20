


function fetchSearchData(callback) {
  $.getJSON('../contents/search-data.json', function(data) {
    callback(data);
  });
}

function buildCategoryTree(data) {
  var adjacencyList = {};
  var parent, i;
  for (i in data) {
    parent = data[i].parent;
    if (adjacencyList[parent] == null) {
      adjacencyList[parent] = [];
    }
    adjacencyList[parent].push(data[i]);
  }
  return adjacencyList;
}

function addMainCategories(selector, category) {
  selector.append("<h2>" + category.text + "</h2>");
}

function displaySubcategory(selector, categoryTree, category) {
  
}

function displayCategories(selector, categoryTree, categories) {
  var i;
  for (i in categories) {
    addMainCategories(selector, categories[i]);
    var subcategoriesSelector = $("<ul></ul>");
    selector.append(subcategoriesSelector);
    displaySubcategory(subcategoriesSelector, categoryTree, categories[i]);
  }
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

    displayCategories($(".keyword-group-column:eq(0)"), categoryTree, firstColumnCategories);
    displayCategories($(".keyword-group-column:eq(1)"), categoryTree, secondColumnCategories);
    
  });
}

$(document).ready(function() {

  constructSearch();
});