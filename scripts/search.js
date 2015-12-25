searchData = [];

function addCategoryExpandAndCollapseEventListener() {
  $(".category > a").on('click', function() {
    $(this).siblings().find('.glyphicon').toggleClass('glyphicon-chevron-down');
    $(this).siblings().find('.glyphicon').toggleClass('glyphicon-chevron-right');
    $(this).siblings().last().toggle('blind');
  });
}

// Get slug string
function getSlug(text) {
  return text.
        toLowerCase().
        replace(/ /g,'-').
        replace(/[^\w-]+/g,'');
}

// Add additional attribute to data
function enhanceData(data) {
  for (var i in data) {
    data[i].slug = getSlug(data[i].text);
    data[i].selector = $('#word-' + data[i].slug);
    data[i].childSelector = data[i].selector.children().last();
    data[i].keywords = data[i].text;
    if (data[i].related) {
      data[i].keywords += ' ' + data[i].related;
    }
  }
  return data;
}

function buildCategoryTree(data) {
  var tree = {};

  data.forEach(function(entry) {
    if (!tree[entry.slug]) {
      tree[entry.slug] = [];
    }
    if (!tree[entry.parent]) {
      tree[entry.parent] = [];
    }
    tree[entry.parent].push(entry);
  });
  return tree;
}

function createSearchIndex(data) {
  var index = lunr(function () {
    this.field('keywords');
    this.ref('slug');
  });

  data.forEach(function(entry) {
    index.add(entry);
  });
  return index;
}

function initializeSearchData(data, callback) {
  data = enhanceData(data);
  callback(createSearchIndex(data), buildCategoryTree(data));
}

function expandOne(selector) {
  selector.show();
  selector.children().last().show();
  if (selector.hasClass('category')) {
    selector.children().find('.glyphicon').addClass('glyphicon-chevron-down');
    selector.children().find('.glyphicon').removeClass('glyphicon-chevron-right');
  }
}

function expandChildren(selector) {
  selector.find(" .category, .main-category").each(function() {
    expandOne($(this));
  });

  selector.find(" .keyword").each(function() {
    $(this).show();
  });
}

function hideNotInResults(word, results, categoryTree) {
  var selector = word.selector;
  var childSelector = word.childSelector;
  var isInResults = (results.indexOf(word.slug) > -1);

  var isChildInResults = false;
  categoryTree[word.slug].forEach(function(child) {
    isChildInResults |= hideNotInResults(child, results, categoryTree);
  });

  if (selector) {
    if (isInResults) {
      // If this word is in results, expand everything
      expandChildren(selector);
      expandOne(selector);
    } else {
      if (isChildInResults) {
        // If this word is not in results but its child is then show this
        selector.show();
        childSelector.show();
      } else {
        // Otherwise, hide the whole tree
        selector.hide();
        childSelector.hide();
      }
    }
  }

  return isInResults | isChildInResults;
}

function getBaseWord(index, text) {
  // Use lunr.js stemmer to get base word
  return index.pipeline.run(lunr.tokenizer([text]))[0];
}

function highlightInResults(word, tokens, index, categoryTree) {
  var selector = word.selector;

  if (word.text) {
    // Split text into tokens
    var wordTokens = word.text.trim().split(' ');
    wordTokens.forEach(function(token) {
      // Get base word of each token
      var baseToken = getBaseWord(index, token);
      var isExistInPrefix = false;
      // Check if this a prefix of result token
      tokens.forEach(function(resultToken) {
        isExistInPrefix |= token.toLowerCase().startsWith(resultToken);
      });

      // Highlight
      if (tokens.indexOf(baseToken) > -1 || isExistInPrefix) {
        selector.find('.label-text').addBack('.label-text').highlight(token, { wordsOnly: true });
      }
    });
  }

  // Also highlight its children
  categoryTree[word.slug].forEach(function(child) {
    highlightInResults(child, tokens, index, categoryTree);
  });
}

function compileSearchDirectives() {
  // Render directives using angular.js
  var searchDirectives = angular.module('searchDirectives', []);
  searchDirectives.
    directive('mainCategory', function () {
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: true,
        templateUrl: 'search/main-category.html',
        link: function(scope, element, attrs) {
          scope.text = attrs.text;
          scope.slug = getSlug(attrs.text);
          searchData.push({
            text: attrs.text,
            parent: "",
            type: "main-category"
          });
        }
      };
    }).
    directive('category', function () {
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: true,
        templateUrl: 'search/category.html',
        link: function(scope, element, attrs) {
          scope.text = attrs.text;
          scope.slug = getSlug(attrs.text);
          scope.$parent.$parent.$watch('slug', function() {
            searchData.push({
              text: attrs.text,
              related: attrs.related,
              parent: scope.$parent.$parent.slug,
              type: "category"
            });
          });
        }
      };
    }).
    directive('keyword', function () {
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: true,
        templateUrl: 'search/keyword.html',
        link: function(scope, element, attrs) {
          scope.text = attrs.text;
          scope.slug = getSlug(attrs.text);
          scope.$parent.$parent.$watch('slug', function() {
            searchData.push({
              text: attrs.text,
              related: attrs.related,
              parent: scope.$parent.$parent.slug,
              type: "keyword"
            });
          });
        }
      };
    }).
    directive('reference', function () {
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: true,
        templateUrl: 'search/reference.html',
        link: function(scope, element, attrs) {
          scope.text = attrs.text;
          scope.src = attrs.src;
          scope.type = attrs.type;
        }
      };
    });
}

function handleSearchEvent(index, categoryTree) {
  $('#search-box').keyup(function() {
    var query = $(this).val();
    expandChildren($(document));
    $(document).unhighlight();
    if (query !== '') {
      // Do OR search
      var queryTokens = query.trim().split(' ');
      var tokens = index.pipeline.run(lunr.tokenizer(query));

      // Combine search results for each token
      var results = [];
      queryTokens.forEach(function(token) {
        var result = index.search(token);
        result.forEach(function(entry) {
          results.push(entry.ref);
        });
      });

      // Hide keyword not in results
      hideNotInResults({ slug: "" }, results, categoryTree);
      // Highlight keyword in results
      highlightInResults({ slug: "" }, tokens, index, categoryTree);
    }
  });
}

compileSearchDirectives();

$(document).ready(function() {

  // Wait for 20ms to let angular finish compiling directives
  setTimeout(function() {
    addCategoryExpandAndCollapseEventListener();
    initializeSearchData(searchData, handleSearchEvent);

    $('.close-link').click( function(e) {
      e.preventDefault();
    });
  }, 20);

});


