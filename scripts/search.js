

function fetchSearchData(callback) {
  $.getJSON('../contents/search-data.json', function(data) {
    callback(data);
  });
}

function convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

function insertSlugToData(data) {
  for (var i in data) {
    if (data[i].slug == null) {
      data[i].slug = convertToSlug(data[i].text.trim());
    }
  }
  return data;
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
  var listSelector = $('<li class="keyword" id="word-' + keyword.slug + '"></li>');
  var selector = $('<div class="references"></div>');
  var titleSelector = $('<a href="#" class="close-link label-text"></a>');
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
                    '" class="reference"><span class="label label-' + reference.type + '">' + 
                    reference.text + '</span></a> &nbsp');
  }

  listSelector.append(selector);

  parentSelector.append(listSelector);
}

function addCategory(parentSelector, category) {
  var listSelector = $('<li id="word-' + category.slug + '" class="word category"></li>');
  var selector = $('<a href="#" class="close-link label-text"></a>');
  var expandedSelector = $('<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>');
  var textSelector = $(document.createTextNode(' ' + category.text));

  selector.append(expandedSelector);
  selector.append(textSelector);

  listSelector.append(selector);
  parentSelector.append(listSelector);
}

function addMainCategory(parentSelector, category) {
  var selector = $('<h2 id="word-' + category.slug + '" class="label-text"></h2>');
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
  if (parentSelector.is("ul") && category.references == null) {
    // only add on category
    selector.append($("<div class='separator'></div>"));
  }
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

function addCategoryExpandAndCollapseEventListener() {
  $(".category").on('click', function() {
    $(this).children().find('.glyphicon').toggleClass('glyphicon-chevron-down');
    $(this).children().find('.glyphicon').toggleClass('glyphicon-chevron-right');
    $(this).next().toggle('blind');
  });
}

function expandAndShow(parentSelector) {
  var selector;
  if (parentSelector != null) {
    selector = $(parentSelector).next();
  } else {
    selector = $(document);
  }
  selector.find(" .category").each(function() {
    $(this).children().find('.glyphicon').addClass('glyphicon-chevron-down');
    $(this).children().find('.glyphicon').removeClass('glyphicon-chevron-right');
    $(this).show();
    $(this).next().show();
  });

  selector.find(" .keyword").each(function() {
    $(this).show();
  })

  selector.find(" .main-category").each(function() {
    $(this).show();
    $(this).next().show();
  })
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
    var data = insertSlugToData(data);
    var categoryTree = buildCategoryTree(data);

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

    callback(createSearchIndex(data), categoryTree);
  });
}

function showInResults(slug, results, categoryTree) {

  var selector = $('#word-' + slug);
  var i;
  var isInResults = (results.indexOf(slug) > -1);

  var isChildInResults = false;
  var children = categoryTree[slug];
  for(i in children) {
    isChildInResults |= showInResults(children[i].slug, results, categoryTree);
  }

  if (isInResults) {
    selector.show();
    expandAndShow('#word-' + slug);
    selector.next().show();
    selector.children().find('.glyphicon').addClass('glyphicon-chevron-down');
    selector.children().find('.glyphicon').removeClass('glyphicon-chevron-right');
  } else {
    if (isChildInResults) {
      selector.show();
      selector.next().show();
    } else {
      selector.hide();
      selector.next().hide();
    }
  }

  return isInResults | isChildInResults;
}

function getBaseWord(index, text) {
  return index.pipeline.run(lunr.tokenizer([text]))[0];
}

function highlightInResults(word, tokens, index, categoryTree) {

  var selector = $('#word-' + word.slug);

  if (selector.is(":visible")) {
    if (word.slug !== '') {
      var wordTokens = word.text.trim().split(' ');
      wordTokens.forEach(function(token) {
        var baseToken = getBaseWord(index, token);
        if (tokens.indexOf(baseToken) > -1) {
          selector.find('.label-text').addBack('.label-text').highlight(token, { wordsOnly: true });
        } else {
          var existInPrefix = false;
          tokens.forEach(function(resultToken) {
            existInPrefix |= token.toLowerCase().startsWith(resultToken);
          });
          if (existInPrefix) {
            selector.find('.label-text').addBack('.label-text').highlight(token, { wordsOnly: true });
          }
        }
      });
    }
  }

  if (categoryTree[word.slug]) {
    categoryTree[word.slug].forEach(function(child) {
      highlightInResults(child, tokens, index, categoryTree);
    });
  }
}

$(document).ready(function() {

  constructSearch(function(index, categoryTree) {

    $('#search-box').keyup(function() {
      var query = $(this).val();
      expandAndShow();
      $(document).unhighlight();
      if (query !== '') {
        var queryList = query.trim().split(' ');
        var tokens = index.pipeline.run(lunr.tokenizer(query));

        var results, i, j;
        var combinedResults = [];
        for (i in queryList) {
          results = index.search(queryList[i]);
          for (j in results) {
            combinedResults.push(results[j].ref);
          }
        }
        showInResults("", combinedResults, categoryTree);
        highlightInResults({ slug: "" }, tokens, index, categoryTree);
      }
    });

    $('.close-link').click( function(e) {
      e.preventDefault();
    });
  });  

});