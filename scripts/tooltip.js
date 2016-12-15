// Maps a string to a definition (in the form of a HTML string)
var definitions = {
};

// Maps a string to a list of aliases
var aliases = {
}

for (let term in aliases) {
    let definition = definitions[term];
    let values = aliases[term];
    for (let i in values) {
        alias = values[i];
        definitions[alias] = definition;
    }
}

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
