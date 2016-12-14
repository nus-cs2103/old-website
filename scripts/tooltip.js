var definitions = {
};

$('tooltip').each(function() {
    var term = $(this).text();
    var title = definitions[term];
    $(this).attr('title', title);
    $(this).tooltip();
});
