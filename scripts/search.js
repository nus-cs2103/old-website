


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

function addCategory(selector, category) {
  selector.append("<li>" + category.text + "</li>");
}

function addMainCategory(parentSelector, category) {
  var selector = $('<h2></h2>');
  var starSelector = $('<span class="glyphicon glyphicon-star" aria-hidden="true"></span>');
  var textSelector = $(document.createTextNode(' ' + category.text));
  
  selector.append(starSelector);
  selector.append(textSelector);
  selector.addClass('main-category');

  parentSelector.append(selector);
}

function displayCategory(parentSelector, categoryTree, category) {
  if (parentSelector.is("ul")) {
    addCategory(parentSelector, category);
  } else {
    addMainCategory(parentSelector, category);
  }

  var selector = $("<ul></ul>");
  parentSelector.append(selector);

  var i;
  var categories = categoryTree[category.slug];
  for (i in categories) {
    displayCategory(selector, categoryTree, categories[i]);
  }
}

function displayCategories(selector, categoryTree, categories) {
  var i;
  for (i in categories) {
    displayCategory(selector, categoryTree, categories[i]);
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