
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

function getParentList(data) {
  var parentList = {};
  for (i in data) {
    parentList[data[i].slug] = data[i].parent;
  }
  return parentList;
}

function addKeyword(parentSelector, keyword) {
  var listSelector = $('<li id=slug-"' + keyword.slug + '"></li>');
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
  var listSelector = $('<li id="slug-' + category.slug + '" class="category category-expanded"></li>');
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
  // not a main category if parent is unordered list
  if (parentSelector.is("ul")) {
    // keyword if references not empty
    if (category.references != null) {
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

  if (parentSelector.is("ul")) {
    selector.children().first().addClass('first-category');
  }
}

function displayCategories(selector, categoryTree, categories) {
  var i;
  for (i in categories) {
    displayCategory(selector, categoryTree, categories[i]);
  }
}

function addCategoryExpandAndCollapseEventListener() {
  $(".category").on('click', function() {
    $(this).children().find('.glyphicon').toggleClass('glyphicon-chevron-down');
    $(this).children().find('.glyphicon').toggleClass('glyphicon-chevron-right');
    $(this).next().toggle('blind');
  });
}

function expandAll() {
  $(".category").each(function() {
    $(this).children().find('.glyphicon').addClass('glyphicon-chevron-down');
    $(this).children().find('.glyphicon').removeClass('glyphicon-chevron-right');
    $(this).next().show();
  });
}

function collapseAll() {
  $(".category").each(function() {
    $(this).children().find('.glyphicon').removeClass('glyphicon-chevron-down');
    $(this).children().find('.glyphicon').addClass('glyphicon-chevron-right');
    $(this).next().hide();
  });
}

function expandBySlug(slug, parentList) {
  if (slug == "") return;
  expandBySlug(parentList[slug], parentList);
  var selector = $('#slug-'+slug);
  selector.children().find('.glyphicon').addClass('glyphicon-chevron-down');
  selector.children().find('.glyphicon').removeClass('glyphicon-chevron-right');
  selector.next().show();
}

function createSearchIndex(data) {
  var index = lunr(function () {
    this.field('keywords');
    this.ref('slug');
  });

  index.pipeline.remove(index.stemmer)

  for (var i in data) {
    keywords = '';
    if (data[i].alias != null) {
      keywords = data[i].alias.join(' ');
    }
    keywords += ' ' + data[i].text;

    data[i].keywords = keywords;

    index.add(data[i]);
  }

  return index;
}

function constructSearch(callback) {
  fetchSearchData(function(data) {
    var categoryTree = buildCategoryTree(data);
    var parentList = getParentList(data);

    // First level categories
    var mainCategories = categoryTree[""];
    var length = mainCategories.length;
    var firstColumnLength = Math.trunc((length+1)/2);
    var secondColumnLength = length - firstColumnLength;

    var firstColumnCategories = mainCategories.slice(0, firstColumnLength);
    var secondColumnCategories = mainCategories.slice(firstColumnLength, length);

    displayCategories($(".keyword-group-column:eq(0)"), categoryTree, firstColumnCategories);
    displayCategories($(".keyword-group-column:eq(1)"), categoryTree, secondColumnCategories);
    
    addCategoryExpandAndCollapseEventListener();
    collapseAll();

    callback(createSearchIndex(data), parentList);
  });
}

$(document).ready(function() {

  constructSearch(function(index, parentList) {

    $('#search-box').keyup(function() {
      var query = $(this).val();
      collapseAll();
      if (query !== '') {
        // perform search
        var results = index.search(query);
        for(i in results) {
          console.log(results[i].ref);
          expandBySlug(results[i].ref, parentList);
        }
      }
    });
  });

});