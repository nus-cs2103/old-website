


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

function addKeyword(parentSelector, keyword) {
  var listSelector = $('<li></li>');
  var selector = $('<div class="keyword"></div>');
  var titleSelector = $('<a href="#"></a>');
  var paperclipSelector = $('<span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span>');
  var textSelector = $(document.createTextNode(' ' + keyword.text));
  var emptySelector = $('<span class="glyphicon glyphicon-none" aria-hidden="true"></span>');

  titleSelector.append(paperclipSelector);
  titleSelector.append(textSelector);
  titleSelector.append('<br/>');
  titleSelector.append(emptySelector);

  selector.append(titleSelector);

  referenceList = keyword.references;
  var i, reference;
  for(i in referenceList) {
    reference = referenceList[i];
    selector.append('<a href="' + reference.hyperlink + 
                    '" class="reference"><span class="label label-' + reference.type + '"> ' + 
                    reference.text + ' </span></a> &nbsp');
  }

  listSelector.append(selector);

  parentSelector.append(listSelector);
}

function addCategory(parentSelector, category) {
  var listSelector = $('<li class="category category-expanded"></li>');
  var selector = $('<a href="#"></a>');
  var expandedSelector = $('<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>');
  var textSelector = $(document.createTextNode(' ' + category.text));

  selector.append(expandedSelector);
  selector.append(textSelector);

  listSelector.append(selector);
  parentSelector.append(listSelector);
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
    if (categoryTree[category.slug] == null) {
      addKeyword(parentSelector, category);
    } else {
      addCategory(parentSelector, category);
    }
  } else {
    addMainCategory(parentSelector, category);
  }

  var selector = $("<ul></ul>");
  selector.addClass('category-list nav');
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