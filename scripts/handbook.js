for (var i in sections) {
    var section = sections[i];
    $('#' + section).load(section + '.html #fragment');
}

$('a').click(function() {
    var adjustment = 73;
    var speed = 1;
    var header = this.hash;
    $('html,body').animate({
        scrollTop: $(header).offset().top - adjustment
    }, speed);
});