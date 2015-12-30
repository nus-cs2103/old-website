for (var i in sections) {
    var currentSection = sections[i].split(' ');
    var htmlFile = currentSection[0];
    var section = currentSection[1];

    $.ajax({
        type: 'GET',
        async: false,
        url: htmlFile + '.html',
        error: function() {
        },
        success: function(data) {
            $('#' + section).html(data);
        }
    });
}
$('#modal').remove();
$('#overlay').remove();


$('a').click(function() {
    var adjustment = 73;
    var speed = 1;
    var header = this.hash;
    $('html,body').animate({
        scrollTop: $(header).offset().top - adjustment
    }, speed);
});
