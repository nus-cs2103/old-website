
function fetchSearchData() {
  $.getJSON('../contents/search-data.json', function(data) {
    
  });
}

$(document).ready(function() {

  fetchSearchData();
});