var definitions = {
};

var count = 0;
$('tooltip').each(function() {
    var term = $(this).text();
    var title = definitions[term];
    var id = String(count++);
    $(this).attr('id', id);
    $(this).tooltip({
        items: '#' + id,
        content: title
    });
});
