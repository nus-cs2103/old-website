for (var i in sections) {
    var section = sections[i];
    $.ajax({
        type: 'GET',
        async: false,
        url: 'contents/handbook-' + section + '.html',
        error: function() {
        },
        success: function(data) {
            $('#handbook-' + section).html(data);
        }
    });
}