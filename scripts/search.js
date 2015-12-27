
function addCategoryExpandAndCollapseEventListener() {
  $(".category > a").on('click', function() {
    $(this).find('.glyphicon').toggleClass('glyphicon-triangle-bottom');
    $(this).find('.glyphicon').toggleClass('glyphicon-triangle-right');
    $(this).siblings().last().toggle('blind');
  });
}

// Get list of words in text
function getWords(text) {
  return text.trim().match(/[a-z0-9']+/gi);
}

// Get slug string
function getSlug(text) {
  return text.
        toLowerCase().
        replace(/ /g,'-').
        replace(/[^\w-]+/g,'');
}

// Add additional attributes to data
function enhanceData(data) {
  for (var i in data) {
    data[i].cleanText = getWords(data[i].text).join(' ');
    data[i].slug = getSlug(data[i].text);
    data[i].selector = $('#word-' + data[i].slug);
    data[i].childSelector = data[i].selector.children().last();
    data[i].keywords = data[i].cleanText;
    if (data[i].related) {
      data[i].keywords += ' ' + getWords(data[i].related).join(' ');
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
  // Create search index
  var index = lunr(function () {
    this.field('keywords');
    this.ref('slug');
  });

  // Input data to search index
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
    selector.children().first().find('.glyphicon').addClass('glyphicon-triangle-bottom');
    selector.children().first().find('.glyphicon').removeClass('glyphicon-triangle-right');
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
    var wordTokens = getWords(word.text);
    wordTokens.forEach(function(token) {
      // Get base word of each token
      var baseToken = getBaseWord(index, token);

      // Highlight
      if (tokens.indexOf(baseToken) > -1) {
        selector.find('.label-text').addBack('.label-text').highlight(token);
      }
    });
  }

  // Also highlight its children
  categoryTree[word.slug].forEach(function(child) {
    highlightInResults(child, tokens, index, categoryTree);
  });
}

function compileSearchDirectives(callback) {
  searchData = [];
  // Render directives using angular.js
  var searchDirectives = angular.module('searchDirectives', []);
  searchDirectives.
    directive('mainCategory', function () {
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: true,
        templateUrl: 'search-main-category-partial.html',
        link: function(scope, element, attrs) {
          // Start linking
          scope.$emit('linking');
          scope.text = attrs.text;
          scope.slug = getSlug(attrs.text);
          scope.label = attrs.label;
          scope.type = attrs.type;
          scope.href = attrs.href;
          
          searchData.push({
            text: attrs.text,
            parent: "",
            type: "main-category"
          });
          // Linking complete
          scope.$emit('complete');
        }
      };
    }).
    directive('category', function () {
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: true,
        templateUrl: 'search-category-partial.html',
        link: function(scope, element, attrs) {
          // Start linking
          scope.$emit('linking');
          scope.text = attrs.text;
          scope.slug = getSlug(attrs.text);

          scope.$parent.$parent.$watch('slug', function() {
            searchData.push({
              text: attrs.text,
              related: attrs.related,
              parent: scope.$parent.$parent.slug,
              type: "category"
            });
            // Linking complete
            scope.$emit('complete');
          });
        }
      };
    }).
    directive('keyword', function () {
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        templateUrl: 'search-keyword-partial.html',
        link: function(scope, element, attrs) {
          // Start linking
          scope.$emit('linking');
          scope.text = attrs.text;
          scope.href = attrs.href;
          scope.slug = getSlug(attrs.text);

          scope.$parent.$parent.$watch('slug', function() {
            searchData.push({
              text: attrs.text,
              related: attrs.related,
              parent: scope.$parent.$parent.slug,
              type: "keyword"
            });
            // Linking complete
            scope.$emit('complete');
          });
        }
      };
    });

  var linkingCount = 0;
  searchDirectives.run(function($rootScope) {
    $rootScope.$on('linking', function() {
      linkingCount++;
    });
    $rootScope.$on('complete', function() {
      linkingCount--;
      // When all linking is complete, call callback function
      if (linkingCount == 0) callback(searchData);
    });
  });
}

function searchText(query, index, categoryTree) {
  // Reset previous search
  expandChildren($(document));
  $(document).unhighlight();

  if (query == '') {
    return;
  }
  // Do OR search
  var queryTokens = getWords(query);
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

function addSearchEventListener(index, categoryTree) {
  var timeoutReference;

  $('#search-box').keyup(function(e) {
    var query = $(this).val();

    // When an activity occurs, clear activity timeout
    if (timeoutReference) {
      clearTimeout(timeoutReference);
    }

    if (query == '' || e.which == 13 || e.which == 32) { // If empty query or enter key or space key pressed
      searchText(query, index, categoryTree);

    } else { // If no activity in 0.5s, search current text
      timeoutReference = setTimeout(function() {
                           searchText(query, index, categoryTree);
                         }, 500);
    }
  });
}

compileSearchDirectives(function(searchData) {
  // After compiling search directives complete, process data
  initializeSearchData(searchData, addSearchEventListener);

  // Add expand and collapse event listener
  addCategoryExpandAndCollapseEventListener();

  // Prevent default when linking to #
  $('.close-link').click( function(e) {
    e.preventDefault();
  });

  // Prepend horizontal line on every category list
  $('.category > .category-list').prepend("<div class='separator'></div>");
});
